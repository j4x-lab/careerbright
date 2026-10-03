import { Pool } from "pg";
import { requireRole } from "@/server/guard";

/*
 * The signed-in student's own numbers.
 *
 * Deliberately not Prisma: `prisma generate` cannot run on this platform, so a
 * Prisma-backed read would throw at request time. pg needs no native engine.
 *
 * Returns zeros rather than throwing when the domain rows are missing — a
 * brand-new account has no AppUser row yet, and the dashboard has to render
 * honestly ("nothing here yet") instead of pretending the learner has progress.
 */

const pool = new Pool({
  connectionString: process.env.DATABASE_URL ?? "",
  max: 5,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 10_000,
});

export type MySnapshot = {
  memberSince: string;
  sessions: number;
  emailVerified: boolean;
  appUserId: string | null;
  displayName: string;
  enrolledPaths: number;
  finishedMilestones: number;
  credentials: number;
  activePath: { titleId: string; progress: number; status: string } | null;
};

export async function getMySnapshot(email: string): Promise<MySnapshot> {
  const { rows } = await pool.query(
    `select
       (select "createdAt" from "user" where email = $1)          as member_since,
       (select count(*)::int from session s
          join "user" u on u.id = s."userId" where u.email = $1)    as sessions,
       (select "emailVerified" from "user" where email = $1)        as email_verified,
       (select coalesce(u.name, u.email) from "user" u where u.email = $1) as display_name,
       (select id from "AppUser" where email = $1)                 as app_user_id`,
    [email]
  );
  const r = rows[0] ?? {};

  // Domain counts hang off AppUser. Absent for a fresh account, so default 0.
  let enrolled = 0;
  let finished = 0;
  let credentials = 0;
  let activePath: { titleId: string; progress: number; status: string } | null = null;
  if (r.app_user_id) {
    const d = await pool.query(
      `select
         (select count(*)::int from "UserLearningPath" where "userId" = $1) as enrolled,
         (select count(*)::int from "UserLearningPath"
           where "userId" = $1 and "completedAt" is not null)                as finished,
         (select count(*)::int from "Credential" where "userId" = $1)       as credentials,
         (select json_build_object('titleId', lp."titleId", 'progress', p.progress, 'status', p.status)
            from "UserLearningPath" p
            join "LearningPath" lp on lp.id = p."learningPathId"
           where p."userId" = $1
           order by p."startedAt" desc
           limit 1)                                                         as active_path`,
      [r.app_user_id]
    );
    enrolled = d.rows[0]?.enrolled ?? 0;
    finished = d.rows[0]?.finished ?? 0;
    credentials = d.rows[0]?.credentials ?? 0;
    activePath = d.rows[0]?.active_path ?? null;
  }

  return {
    memberSince: r.member_since ? new Date(r.member_since).toISOString().slice(0, 10) : "—",
    sessions: r.sessions ?? 0,
    emailVerified: Boolean(r.email_verified),
    appUserId: r.app_user_id ?? null,
    displayName: r.display_name ?? email,
    enrolledPaths: enrolled,
    finishedMilestones: finished,
    credentials,
    activePath,
  };
}