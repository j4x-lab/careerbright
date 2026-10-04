import { z } from "zod";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL ?? "",
  max: 5,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 10_000,
});

// GET /api/missions/review?status=NEEDS_HUMAN_REVIEW — human review queue.
export async function GET(req: Request) {
  const url = new URL(req.url);
  const status = url.searchParams.get("status") ?? "NEEDS_HUMAN_REVIEW";
  const { rows } = await pool.query(
    `select ma.id as "attemptId", ma.score, ma.confidence, ma."submittedAt", m.slug as "missionSlug", m."titleId" as "missionTitle", af."feedbackId", af."criterionScores" from "MissionAttempt" ma join "Mission" m on m.id=ma."missionId" left join "AIFeedback" af on af."attemptId"=ma.id where ma.status=$1 order by ma."submittedAt" asc limit 100`,
    [status],
  );
  return Response.json(rows);
}

const Override = z.object({
  attemptId: z.string(),
  score: z.number().min(0).max(100),
  feedbackId: z.string().min(1).max(5000),
  reviewerId: z.string().min(1),
  approve: z.boolean().default(true),
});

// POST /api/missions/review — LSP_ASSESSOR/ADMIN override → GRADED + PortfolioEntry.
export async function POST(req: Request) {
  const body = Override.parse(await req.json());
  await pool.query(`update "AIFeedback" set status=$1, "reviewedBy"=$2, "reviewedAt"=now(), "feedbackId"=$3 where "attemptId"=$4`, [
    body.approve ? "HUMAN_APPROVED" : "HUMAN_OVERRIDDEN",
    body.reviewerId,
    body.feedbackId,
    body.attemptId,
  ]);
  await pool.query(`update "MissionAttempt" set status='GRADED', score=$1, "reviewedAt"=now() where id=$2`, [body.score, body.attemptId]);

  let portfolioId: string | null = null;
  if (body.approve && body.score >= 70) {
    const a = await pool.query(`select "missionId", "userId" from "MissionAttempt" where id=$1`, [body.attemptId]);
    const row = a.rows[0];
    if (row) {
      const m = await pool.query(`select "titleId","briefId","skkniUnitCode",rubric from "Mission" where id=$1`, [row.missionId]);
      const mission = m.rows[0];
      const arts = await pool.query(`select mode, content, metadata, "order" from "SubmissionArtifact" where "attemptId"=$1 order by "order" asc`, [body.attemptId]);
      const revs = await pool.query(`select "revisionNum","noteId","createdAt" from "Revision" where "attemptId"=$1 order by "revisionNum" asc`, [body.attemptId]);
      const ins = await pool.query(
        `insert into "PortfolioEntry" (id,"userId","missionId","attemptId","briefSnapshot",artifacts,"rubricSnapshot","aiFeedback",revisions,"isPublic") values (gen_random_uuid()::text,$1,$2,$3,$4::jsonb,$5::jsonb,$6::jsonb,$7::jsonb,$8::jsonb,true) on conflict ("attemptId") do update set artifacts=$5::jsonb, revisions=$8::jsonb returning id`,
        [
          row.userId,
          row.missionId,
          body.attemptId,
          JSON.stringify({ titleId: mission?.titleId, briefId: mission?.briefId, skkniUnitCode: mission?.skkniUnitCode }),
          JSON.stringify(arts.rows),
          JSON.stringify(mission?.rubric ?? []),
          JSON.stringify({ score: body.score, feedbackId: body.feedbackId, human: true }),
          JSON.stringify(revs.rows),
        ],
      );
      portfolioId = ins.rows[0]?.id ?? null;
    }
  }
  return Response.json({ ok: true, portfolioId });
}
