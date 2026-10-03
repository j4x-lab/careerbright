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
    staleness after a toggle to seconds (setRelease busts the cache and
    revalidates the affected paths). The in-flight promise dedupes
    concurrent renders. */
const CACHE_TTL_MS = 30_000;
let cached: { at: number; value: Set<string> } | null = null;
let inflight: Promise<Set<string>> | null = null;

/** Drop the cached set. Called by admin.setRelease in the same process so
    a flip is visible on the very next render instead of at TTL expiry. */
export function bustReleasesCache(): void {
  cached = null;
}

async function queryReleased(): Promise<Set<string>> {
  const { rows } = await pool.query(
    `select "roleId" from "RoleRelease" where released = true`
  );
  return new Set((rows as { roleId: string }[]).map((r) => r.roleId));
}

/* Cold databases (sleeping Neon compute) can take 10s+ to answer. Never
   make the page wait for that: after RACE_TIMEOUT_MS the render proceeds
   with the baked-in Wave-1 set, which is correct unless an admin flipped
   something within the last seconds — and that path busts the cache. */
const RACE_TIMEOUT_MS = 1_500;

function timeoutFallback(): Promise<Set<string>> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(new Set(DEFAULT_RELEASED_ROLE_IDS)), RACE_TIMEOUT_MS);
  });
}

/** Role ids whose scenarios are playable right now. */
export async function getReleasedRoleIds(): Promise<Set<string>> {
  if (cached && Date.now() - cached.at < CACHE_TTL_MS) return cached.value;
  if (!inflight) {
    inflight = (async () => {
      try {
        const value = await Promise.race([queryReleased(), timeoutFallback()]);
        cached = { at: Date.now(), value };
        return value;
      } catch {
        return new Set(DEFAULT_RELEASED_ROLE_IDS);
      } finally {
        inflight = null;
      }
    })();
  }
  return inflight;
}

/** True when this role's scenarios may be played. */
export async function isRoleReleased(roleId: string): Promise<boolean> {
  return (await getReleasedRoleIds()).has(roleId);
}
