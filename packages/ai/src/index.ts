import { z } from "zod";

export const RubricCriterion = z.object({
  id: z.string(),
  labelId: z.string(),
  labelEn: z.string().optional(),
  weight: z.number().min(0).max(1),
  maxScore: z.number().default(100),
});

export type RubricCriterion = z.infer<typeof RubricCriterion>;

export const JudgeResult = z.object({
  criterionId: z.string(),
  score: z.number().min(0).max(100),
  feedbackId: z.string(),
  feedbackEn: z.string().optional(),
  confidence: z.number().min(0).max(1),
});

export type JudgeResult = z.infer<typeof JudgeResult>;

// LLM-as-Judge ensemble: GPT-4o + Claude + local fallback.
// Consensus = weighted mean; confidence < 0.7 → NEEDS_HUMAN_REVIEW.
export function consensus(results: JudgeResult[][]): { score: number; confidence: number } {
  const flat = results.flat();
  if (!flat.length) return { score: 0, confidence: 0 };
  const score = flat.reduce((a, r) => a + r.score, 0) / flat.length;
  const confidence = flat.reduce((a, r) => a + r.confidence, 0) / flat.length;
  return { score: Math.round(score * 10) / 10, confidence: Math.round(confidence * 100) / 100 };
}

export const PROMPT_VERSION = "judge-v1";
export const REFLECTION_PROMPT_VERSION = "reflect-v1";

export function buildJudgePrompt(args: {
  rubric: RubricCriterion[];
  submission: string;
  contextId: string;
  language?: "id" | "en";
}): string {
  const lang = args.language ?? "id";
  const criteria = args.rubric
    .map((c, i) => `${i + 1}. [${c.id}] ${lang === "id" ? c.labelId : (c.labelEn ?? c.labelId)} (bobot ${c.weight})`)
    .join("\n");
  return [
    `Anda adalah asesor kompetensi SKKNI. Nilai submisi berikut secara objektif per kriteria (0–100).`,
    `Konteks: ${args.contextId}`,
    `Rubrik:\n${criteria}`,
    `Submisi:\n${args.submission.slice(0, 4000)}`,
    `Kembalikan JSON: [{criterionId, score, feedbackId, confidence}].`,
    `Versi prompt: ${PROMPT_VERSION}`,
  ].join("\n\n");
}

export type ArtifactInput = { mode: string; content: string; order?: number };

// Serialize multimode artifacts (DOCUMENT/SPREADSHEET/IMAGE/LINK/CODE) into
// a single text block for the judge. Images/links keep URL + caption;
// code/docs are truncated to stay within prompt budget.
export function serializeArtifacts(artifacts: ArtifactInput[], maxChars = 6000): string {
  const sorted = [...artifacts].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const parts = sorted.map((a, i) => {
    const body = a.content.length > 1500 ? `${a.content.slice(0, 1500)}\n…(dipotong)` : a.content;
    return `--- Artifact ${i + 1} [${a.mode}] ---\n${body}`;
  });
  const out = parts.join("\n\n");
  return out.length > maxChars ? `${out.slice(0, maxChars)}\n…(dipotong)` : out;
}

// Weighted score from per-criterion results + rubric weights.
export function weightedScore(
  results: JudgeResult[],
  rubric: RubricCriterion[],
): number {
  if (!results.length) return 0;
  const w = new Map(rubric.map((r) => [r.id, r.weight]));
  let num = 0;
  let den = 0;
  for (const r of results) {
    const weight = w.get(r.criterionId) ?? 1 / results.length;
    num += r.score * weight;
    den += weight;
  }
  if (den === 0) return 0;
  return Math.round((num / den) * 10) / 10;
}

// Q4: AI-generated reflection prompt per mission (called after grading).
export function buildReflectionPrompt(args: {
  missionTitleId: string;
  missionBriefId: string;
  score: number;
  feedbackId: string;
  language?: "id" | "en";
}): string {
  const lang = args.language ?? "id";
  if (lang === "en") {
    return [
      `You are a career reflection coach. The learner just completed "${args.missionTitleId}" with score ${args.score}.`,
      `Brief: ${args.missionBriefId.slice(0, 800)}`,
      `Feedback: ${args.feedbackId.slice(0, 800)}`,
      `Write 3 short reflection prompts (max 25 words each) that help the learner connect this mission to real work, name one improvement, and plan the next revision.`,
      `Return JSON: {prompts: string[], draftId: string, draftEn: string}.`,
      `Version: ${REFLECTION_PROMPT_VERSION}`,
    ].join("\n\n");
  }
  return [
    `Anda adalah coach refleksi karier. Peserta baru menyelesaikan "${args.missionTitleId}" dengan skor ${args.score}.`,
    `Brief: ${args.missionBriefId.slice(0, 800)}`,
    `Feedback: ${args.feedbackId.slice(0, 800)}`,
    `Tulis 3 pertanyaan refleksi singkat (maks 25 kata tiap butir) yang membantu peserta menghubungkan misi ini ke dunia kerja nyata, menyebut satu perbaikan, dan merencanakan revisi berikutnya.`,
    `Kembalikan JSON: {prompts: string[], draftId: string, draftEn: string}.`,
    `Versi: ${REFLECTION_PROMPT_VERSION}`,
  ].join("\n\n");
}

export function needsHumanReview(confidence: number) {
  return confidence < 0.7;
}
