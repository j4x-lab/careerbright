export type ArtifactMode = "DOCUMENT" | "SPREADSHEET" | "IMAGE" | "LINK" | "CODE";

export type RubricCriterion = {
  id: string;
  labelId: string;
  labelEn?: string;
  weight: number;
  maxScore?: number;
};

export type Mission = {
  id: string;
  slug: string;
  roleId: string;
  titleId: string;
  titleEn?: string | null;
  briefId: string;
  briefEn?: string | null;
  deliverableSpec: { modes: ArtifactMode[]; minArtifacts?: number; constraints?: string };
  rubric: RubricCriterion[];
  skkniUnitCode: string;
  kkniLevel: number;
  difficulty: number;
  estimatedMin: number;
  maxRevisions: number;
  status: string;
  publishedAt?: string | null;
};

export type MissionArtifactInput = {
  mode: ArtifactMode;
  content: string;
  order?: number;
  metadata?: Record<string, unknown>;
};

export const ARTIFACT_MODES: { value: ArtifactMode; labelId: string }[] = [
  { value: "DOCUMENT", labelId: "Dokumen" },
  { value: "SPREADSHEET", labelId: "Spreadsheet" },
  { value: "IMAGE", labelId: "Gambar" },
  { value: "LINK", labelId: "Tautan" },
  { value: "CODE", labelId: "Kode" },
];

export function parseMissionRow(row: Record<string, unknown>): Mission {
  const parseJson = (v: unknown, fb: never) => {
    if (Array.isArray(v) || (v && typeof v === "object")) return v as never;
    if (typeof v === "string") {
      try {
        return JSON.parse(v) as never;
      } catch {
        return fb;
      }
    }
    return fb;
  };
  return {
    id: String(row.id),
    slug: String(row.slug),
    roleId: String(row.roleId),
    titleId: String(row.titleId),
    titleEn: (row.titleEn as string | null) ?? null,
    briefId: String(row.briefId),
    briefEn: (row.briefEn as string | null) ?? null,
    deliverableSpec: parseJson(row.deliverableSpec, { modes: ["DOCUMENT"] } as never) as Mission["deliverableSpec"],
    rubric: parseJson(row.rubric, [] as never) as RubricCriterion[],
    skkniUnitCode: String(row.skkniUnitCode),
    kkniLevel: Number(row.kkniLevel ?? 5),
    difficulty: Number(row.difficulty ?? 1),
    estimatedMin: Number(row.estimatedMin ?? 60),
    maxRevisions: Number(row.maxRevisions ?? 3),
    status: String(row.status ?? "DRAFT"),
    publishedAt: (row.publishedAt as string | null) ?? null,
  };
}

// Static fallback so /misi renders even when DATABASE_URL is unset (build-safe).
// Full catalog lives in missions-catalog.ts (54 missions, 1 per profession).
// Re-exported here to keep existing imports (`@/lib/missions`) working.
export { MISSIONS_CATALOG as MISSIONS_FALLBACK } from "./missions-catalog";
