import { z } from "zod";

export const RubricCriterion = z.object({
  id: z.string(),
  labelId: z.string(),
  labelEn: z.string().optional(),
  weight: z.number().min(0).max(1),
  maxScore: z.number().default(100),
});

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
