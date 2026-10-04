import { z } from "zod";
import { Pool } from "pg";
import {
  buildJudgePrompt,
  buildReflectionPrompt,
  consensus,
  needsHumanReview,
  serializeArtifacts,
  weightedScore,
} from "@careerbright/ai";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL ?? "",
  max: 5,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 10_000,
});

const Artifact = z.object({
  mode: z.enum(["DOCUMENT", "SPREADSHEET", "IMAGE", "LINK", "CODE"]),
  content: z.string().min(1).max(50000),
  order: z.number().optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

const Body = z.object({
  missionSlug: z.string().min(1),
  userId: z.string().min(1),
  artifacts: z.array(Artifact).min(1).max(10),
  noteId: z.string().max(2000).optional(),
});

// POST /api/missions/submit — create attempt (or new revision) + AI grade via judge-v1.
// Q3: maxRevisions is configurable per mission (Mission.maxRevisions).
// Q4: reflection is AI-generated per mission (buildReflectionPrompt).
export async function POST(req: Request) {
  const body = Body.parse(await req.json());

  const m = await pool.query(`select * from "Mission" where slug = $1 limit 1`, [body.missionSlug]);
  const mission = m.rows[0];
  if (!mission || mission.status !== "PUBLISHED") {
    return Response.json({ error: "Mission not found or not published" }, { status: 404 });
  }

  // Find open attempt or create new one.
  const open = await pool.query(
    `select * from "MissionAttempt" where "missionId" = $1 and "userId" = $2 and status in ('IN_PROGRESS','AI_REVIEWED','NEEDS_HUMAN_REVIEW','REVISED') order by "attemptNum" desc limit 1`,
    [mission.id, body.userId],
  );
  let attempt = open.rows[0] as Record<string, unknown> | undefined;
  let isRevision = false;

  if (!attempt) {
    const ins = await pool.query(
      `insert into "MissionAttempt" (id, "missionId", "userId", "attemptNum", status, "startedAt") values (gen_random_uuid()::text, $1, $2, 1, 'SUBMITTED', now()) returning *`,
      [mission.id, body.userId],
    );
    attempt = ins.rows[0];
  } else {
    // Count revisions used.
    const rc = await pool.query(`select count(*)::int as n from "Revision" where "attemptId" = $1`, [attempt.id]);
    const used = rc.rows[0]?.n ?? 0;
    const maxRev = Number(mission.maxRevisions ?? 3);
    if (used >= maxRev && attempt.status !== "IN_PROGRESS") {
      return Response.json({ error: `Batas revisi tercapai (${maxRev}x). Hubungi asesor.` }, { status: 400 });
    }
    isRevision = used > 0 || attempt.status !== "IN_PROGRESS";
    await pool.query(`update "MissionAttempt" set status='SUBMITTED', "submittedAt"=now() where id=$1`, [attempt.id]);
    if (isRevision) {
      await pool.query(
        `insert into "Revision" (id, "attemptId", "revisionNum", "noteId") values (gen_random_uuid()::text, $1, $2, $3)`,
        [attempt.id, used + 1, body.noteId ?? null],
      );
    }
  }

  const attemptId = String(attempt!.id);

  // Store artifacts.
  for (let i = 0; i < body.artifacts.length; i++) {
    const a = body.artifacts[i];
    await pool.query(
      `insert into "SubmissionArtifact" (id, "attemptId", mode, content, metadata, "order") values (gen_random_uuid()::text, $1,$2,$3,$4::jsonb,$5)`,
      [attemptId, a.mode, a.content, JSON.stringify(a.metadata ?? {}), a.order ?? i],
    );
  }

  // Build judge prompt from rubric + serialized artifacts.
  let rubric: { id: string; labelId: string; labelEn?: string; weight: number; maxScore: number }[];
  try {
    const raw = (typeof mission.rubric === "string" ? JSON.parse(mission.rubric) : mission.rubric) as {
      id: string; labelId: string; labelEn?: string; weight: number; maxScore?: number;
    }[];
    rubric = (Array.isArray(raw) ? raw : []).map((r) => ({ ...r, maxScore: r.maxScore ?? 100 }));
  } catch {
    rubric = [];
  }
  const submission = serializeArtifacts(
    body.artifacts.map((a) => ({ mode: a.mode, content: a.content, order: a.order })),
  );
  const prompt = buildJudgePrompt({
    rubric,
    submission,
    contextId: `mission:${mission.slug}:attempt:${String(attempt!.attemptNum ?? 1)}`,
    language: "id",
  });

  // Call ensemble: GPT-4o + Claude + local fallback.
  // If no keys, use deterministic local heuristic so the loop stays usable offline.
  const results = await callJudgeEnsemble(prompt, rubric, submission);
  const { confidence } = consensus(results);
  const score = weightedScore(results.flat(), rubric);
  const feedbackId = results.flat().map((r) => `${r.criterionId}: ${r.feedbackId} (${r.score})`).join("\n") || "Menunggu penilaian.";

  const reflectionPrompt = buildReflectionPrompt({
    missionTitleId: String(mission.titleId),
    missionBriefId: String(mission.briefId),
    score,
    feedbackId,
    language: "id",
  });
  const reflection = await callReflection(reflectionPrompt, score);

  const status = needsHumanReview(confidence) ? "NEEDS_HUMAN_REVIEW" : "AI_REVIEWED";
  await pool.query(
    `insert into "AIFeedback" (id, "attemptId", "criterionScores", "consensusScore", confidence, "feedbackId", "reflectionId", "promptVersion", status)
     values (gen_random_uuid()::text, $1, $2::jsonb, $3, $4, $5, $6, 'judge-v1', $7)
     on conflict ("attemptId") do update set "criterionScores"=$2::jsonb, "consensusScore"=$3, confidence=$4, "feedbackId"=$5, "reflectionId"=$6, status=$7`,
    [attemptId, JSON.stringify(results.flat()), score, confidence, feedbackId, reflection, status],
  );
  await pool.query(`update "MissionAttempt" set status=$1, score=$2, confidence=$3, "reviewedAt"=now() where id=$4`, [
    status,
    score,
    confidence,
    attemptId,
  ]);

  // Auto-grade when confident and passing (>=70): create PortfolioEntry.
  let portfolioId: string | null = null;
  if (status === "AI_REVIEWED" && score >= 70) {
    await pool.query(`update "MissionAttempt" set status='GRADED' where id=$1`, [attemptId]);
    const arts = await pool.query(`select mode, content, metadata, "order" from "SubmissionArtifact" where "attemptId"=$1 order by "order" asc`, [attemptId]);
    const revs = await pool.query(`select "revisionNum", "noteId", "createdAt" from "Revision" where "attemptId"=$1 order by "revisionNum" asc`, [attemptId]);
    const ins = await pool.query(
      `insert into "PortfolioEntry" (id, "userId", "missionId", "attemptId", "briefSnapshot", artifacts, "rubricSnapshot", "aiFeedback", revisions, "reflectionId", "isPublic")
       values (gen_random_uuid()::text, $1,$2,$3,$4::jsonb,$5::jsonb,$6::jsonb,$7::jsonb,$8::jsonb,$9,true)
       on conflict ("attemptId") do update set artifacts=$5::jsonb, revisions=$8::jsonb, "aiFeedback"=$7::jsonb
       returning id`,
      [
        body.userId,
        mission.id,
        attemptId,
        JSON.stringify({ titleId: mission.titleId, briefId: mission.briefId, skkniUnitCode: mission.skkniUnitCode }),
        JSON.stringify(arts.rows),
        JSON.stringify(rubric),
        JSON.stringify({ score, confidence, feedbackId }),
        JSON.stringify(revs.rows),
        reflection,
      ],
    );
    portfolioId = ins.rows[0]?.id ?? null;
  }

  return Response.json({ attemptId, score, confidence, status, portfolioId, isRevision });
}

type JudgeRow = { criterionId: string; score: number; feedbackId: string; confidence: number };

async function callJudgeEnsemble(
  prompt: string,
  rubric: { id: string; labelId: string }[],
  submission: string,
): Promise<JudgeRow[][]> {
  const out: JudgeRow[][] = [];
  const openaiKey = process.env.OPENAI_API_KEY;
  const anthropicKey = process.env.ANTHROPIC_API_KEY;

  if (openaiKey) {
    try {
      const r = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${openaiKey}` },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 1200,
          temperature: 0.2,
        }),
      });
      if (r.ok) {
        const j = (await r.json()) as { choices?: { message?: { content?: string } }[] };
        const parsed = tryParseJudge(j.choices?.[0]?.message?.content ?? "", rubric);
        if (parsed.length) out.push(parsed);
      }
    } catch {
      /* fall through to local */
    }
  }

  if (anthropicKey) {
    try {
      const r = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": anthropicKey,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-3-5-haiku-latest",
          max_tokens: 1200,
          messages: [{ role: "user", content: prompt }],
        }),
      });
      if (r.ok) {
        const j = (await r.json()) as { content?: { text?: string }[] };
        const parsed = tryParseJudge(j.content?.[0]?.text ?? "", rubric);
        if (parsed.length) out.push(parsed);
      }
    } catch {
      /* fall through */
    }
  }

  // Local heuristic fallback — deterministic, keyless, always available.
  out.push(localHeuristic(rubric, submission));
  return out;
}

function tryParseJudge(text: string, rubric: { id: string }[]): JudgeRow[] {
  try {
    const m = text.match(/\[[\s\S]*\]/);
    if (!m) return [];
    const arr = JSON.parse(m[0]) as JudgeRow[];
    if (!Array.isArray(arr)) return [];
    return arr
      .filter((r) => rubric.some((c) => c.id === r.criterionId))
      .map((r) => ({
        criterionId: String(r.criterionId),
        score: Math.min(100, Math.max(0, Number(r.score) || 0)),
        feedbackId: String(r.feedbackId ?? "").slice(0, 1000),
        confidence: Math.min(1, Math.max(0, Number(r.confidence) || 0.6)),
      }));
  } catch {
    return [];
  }
}

function localHeuristic(rubric: { id: string; labelId: string }[], submission: string): JudgeRow[] {
  // Scores on length/structure signals — clearly marked as low-confidence so
  // human review stays in the loop until real keys are configured.
  const len = submission.length;
  const hasStructure = /#{1,3}\s|\n\s*[-*]\s|\n\s*\d+\.\s/.test(submission) ? 8 : 0;
  const hasNumbers = /\d+\s*(%|rp|jt|rb|x|hari|minggu|bulan)/i.test(submission) ? 7 : 0;
  const base = Math.min(78, 52 + Math.min(18, Math.floor(len / 400)) + hasStructure + hasNumbers);
  return rubric.map((c) => ({
    criterionId: c.id,
    score: Math.min(100, base + (c.id.length % 5)),
    feedbackId: "Penilaian otomatis lokal (tanpa API key) — minta review asesor untuk nilai final.",
    confidence: 0.55,
  }));
}

async function callReflection(prompt: string, score: number): Promise<string> {
  const key = process.env.OPENAI_API_KEY;
  if (key) {
    try {
      const r = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 400,
          temperature: 0.5,
        }),
      });
      if (r.ok) {
        const j = (await r.json()) as { choices?: { message?: { content?: string } }[] };
        const t = j.choices?.[0]?.message?.content?.slice(0, 1500);
        if (t) return t;
      }
    } catch {
      /* fallback */
    }
  }
  const level = score >= 85 ? "sangat baik" : score >= 70 ? "baik dan layak portofolio" : "awal yang bagus — revisi akan menaikkan nilaimu";
  return `Refleksi: (1) Bagian mana dari misimu yang paling menyerupai pekerjaan nyata? (2) Satu hal yang akan kamu perbaiki dari feedback di atas? (3) Bukti apa yang ingin kamu tambahkan agar portofoliomu ${level}?`;
}
