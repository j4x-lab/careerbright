import { Pool } from "pg";

/*
 * Wave release gate — server-only (pg Pool, never import from client
 * components; the admin dashboard reads it through tRPC admin.releases).
 *
 * A missing RoleRelease row means LOCKED, so newly committed roles and
 * scenarios stay dark until an admin flips them in the dashboard.
 *
 * Offline fallback: when the DB is unreachable (no DATABASE_URL, offline
 * build), degrade to DEFAULT_RELEASED_ROLE_IDS — the 25 launched Wave-1
 * roles keep working and everything new stays locked. Same contract as
 * the @careerbright/db deep stub: never throw at import, only degrade
 * on query.
 */

const pool = new Pool({
  connectionString: process.env.DATABASE_URL ?? "",
  max: 3,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 8_000,
});

/** The 25 launched Wave-1 roles. Mirrors seed.sql / seed.ts. */
export const DEFAULT_RELEASED_ROLE_IDS: string[] = [
  "social-media-specialist",
  "hr-business-partner",
  "frontend-developer",
  "associate-product-manager",
  "data-analyst",
  "ui-ux-designer",
  "account-executive",
  "management-trainee",
  "teller-bank",
  "backend-developer",
  "qa-engineer",
  "copywriter",
  "operations-executive",
  "devops-engineer",
  "graphic-designer",
  "seo-specialist",
  "hr-recruiter",
  "credit-analyst",
  "mobile-developer",
  "network-engineer",
  "cybersecurity-analyst",
  "motion-designer",
  "procurement-staff",
  "financial-planner",
  "retail-store-supervisor",
];

/** Release-set cache: admin flips are rare, page views are not. A short
    TTL keeps every render off the database round-trip while bounding
    staleness after a toggle to seconds (setRelease also revalidates the
    affected paths). The in-flight promise dedupes concurrent renders. */
const CACHE_TTL_MS = 30_000;
let cached: { at: number; value: Set<string> } | null = null;
let inflight: Promise<Set<string>> | null = null;

async function fetchReleased(): Promise<Set<string>> {
  try {
    const { rows } = await pool.query(
      `select "roleId" from "RoleRelease" where released = true`
    );
    return new Set((rows as { roleId: string }[]).map((r) => r.roleId));
  } catch {
    return new Set(DEFAULT_RELEASED_ROLE_IDS);
  }
}

/** Role ids whose scenarios are playable right now. */
export async function getReleasedRoleIds(): Promise<Set<string>> {
  if (cached && Date.now() - cached.at < CACHE_TTL_MS) return cached.value;
  if (!inflight) {
    inflight = fetchReleased().finally(() => {
      inflight = null;
    });
  }
  const value = await inflight;
  cached = { at: Date.now(), value };
  return value;
}

/** True when this role's scenarios may be played. */
export async function isRoleReleased(roleId: string): Promise<boolean> {
  return (await getReleasedRoleIds()).has(roleId);
}
