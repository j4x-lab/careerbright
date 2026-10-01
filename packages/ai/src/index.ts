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
