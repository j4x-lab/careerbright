import { TRPCError } from "@trpc/server";
import { Pool } from "pg";
import { z } from "zod";
import { protectedProcedure, router } from "../trpc";
import { getSession } from "../guard";
import { GeminiError, generateRoleDraft } from "../nim";

/*
 * Admin operations.
 *
 * These run on a plain pg Pool rather than Prisma for the same reason auth
 * does: `prisma generate` cannot run on this platform, so every Prisma-backed
 * procedure is dead here. pg needs no native engine.
 *
 * Domain mapping used below:
 *   "roles"   -> the `role` column on the Better Auth `user` table.
 *   "courses" -> the Course catalog (Tier 3 depth content, kept as drafts).
 * The old SKKNI skill-unit procedures were deleted with the BNSP domain:
 * the PRD product issues no SKKNI credentials, so CompetencyUnit rows are
 * seed data, not something an operator authors here.
 *
 * Every procedure is gated on an ADMIN session. `courses.create` in the
 * sibling router was a publicProcedure, i.e. anonymous callers could create
 * courses; that is closed in index.ts.
 */

const pool = new Pool({
  connectionString: process.env.DATABASE_URL ?? "",
  max: 5,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 10_000,
});

const ROLES = [
  "STUDENT",
  "INSTRUCTOR",
  "ADMIN",
  "LSP_ASSESSOR",
  "EMPLOYER",
  "UNIVERSITY",
] as const;

async function requireAdmin() {
  const session = await getSession();
  // TRPCError, not Error: a plain throw becomes an opaque 500 and hides the
  // real reason. FORBIDDEN maps to 403 so a signed-in non-admin gets an
  // honest answer instead of a server-error page.
  if (!session) throw new TRPCError({ code: "UNAUTHORIZED", message: "Sign in required" });
  if ((session.user.role ?? "STUDENT") !== "ADMIN") {
    throw new TRPCError({ code: "FORBIDDEN", message: "Admin role required" });
  }
  return session;
}

const adminProcedure = protectedProcedure.use(async ({ next }) => {
  await requireAdmin();
  return next();
});

export const adminRouter = router({
  /** Every account with its role — the promote/demote worklist. */
  users: adminProcedure.query(async () => {
    const { rows } = await pool.query(
      `select id, email, name, role, "emailVerified", "createdAt"
         from "user"
        order by "createdAt" desc`
    );
    return rows;
  }),

  stats: adminProcedure.query(async () => {
    const { rows } = await pool.query(`
      select
        (select count(*)::int from "user")                    as users,
        (select count(*)::int from "user" where role <> 'STUDENT') as staff,
        (select count(*)::int from session)                   as sessions,
        (select count(*)::int from "Course")                  as courses,
        (select count(*)::int from "Course" where status = 'PUBLISHED') as published
    `);
    return rows[0];
  }),

  /** Promote or demote. This is the operation that used to need raw SQL. */
  setRole: adminProcedure
    .input(
      z.object({
        userId: z.string().min(1),
        role: z.enum(ROLES),
      })
    )
    .mutation(async ({ input }) => {
      // Refuse to remove the last admin. Without this, demoting the only
      // ADMIN locks everyone out of the tool that promotes people — and the
      // only recovery is hand-written SQL against the live table.
      if (input.role !== "ADMIN") {
        const { rows: remaining } = await pool.query(
          `select count(*)::int as n from "user" where role = 'ADMIN' and id <> $1`,
          [input.userId]
        );
        if ((remaining[0]?.n ?? 0) === 0) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Cannot demote the last remaining admin",
          });
        }
      }
      const { rows } = await pool.query(
        `update "user" set role = $1, "updatedAt" = now()
          where id = $2
          returning id, email, role`,
        [input.role, input.userId]
      );
      if (rows.length === 0) {
        throw new TRPCError({ code: "NOT_FOUND", message: "No such row" });
      }
      return rows[0];
    }),

  /* AI content generator (PRD: "The Scalability Engine"). Staff type a job
     title; Gemini returns a validated role + scenarios draft for human
     review. Publication stays manual (copy the JSON into the repo and
     commit) so every addition keeps a reviewer and a git history. */
  generateDraft: adminProcedure
    .input(z.object({ jobTitle: z.string().min(3).max(80) }))
    .mutation(async ({ input }) => {
      try {
        return await generateRoleDraft(input.jobTitle);
      } catch (e) {
        if (e instanceof GeminiError) {
          const code =
            e.code === "NO_KEY" ? "PRECONDITION_FAILED" : "BAD_GATEWAY";
          throw new TRPCError({ code, message: e.message });
        }
        throw e;
      }
    }),

  courses: adminProcedure.query(async () => {
    const { rows } = await pool.query(
      `select id, slug, "titleId", "titleEn", status, "createdAt", "updatedAt"
         from "Course"
        order by "updatedAt" desc`
    );
    return rows;
  }),

  createCourse: adminProcedure
    .input(
      z.object({
        slug: z
          .string()
          .min(3)
          .max(64)
          .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug must be kebab-case"),
        titleId: z.string().min(3).max(160),
        titleEn: z.string().min(3).max(160).optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { rows } = await pool.query(
        `insert into "Course" (id, slug, "titleId", "titleEn", status, "createdAt", "updatedAt")
         values (gen_random_uuid()::text, $1, $2, $3, 'DRAFT', now(), now())
         returning id, slug, "titleId", "titleEn", status`,
        [input.slug, input.titleId, input.titleEn ?? null]
      );
      return rows[0];
    }),

  setCourseStatus: adminProcedure
    .input(
      z.object({
        id: z.string().min(1),
        status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]),
      })
    )
    .mutation(async ({ input }) => {
      const { rows } = await pool.query(
        `update "Course" set status = $1, "updatedAt" = now()
          where id = $2
          returning id, slug, status`,
        [input.status, input.id]
      );
      if (rows.length === 0) {
        throw new TRPCError({ code: "NOT_FOUND", message: "No such row" });
      }
      return rows[0];
    }),

});

export type AdminRouter = typeof adminRouter;