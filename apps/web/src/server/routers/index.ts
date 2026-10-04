import { Pool } from "pg";
import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../trpc";
import { adminRouter } from "./admin";
import { metricsRouter } from "./metrics";
import { missionsRouter } from "./missions";

/*
 * Catalog reads.
 *
 * These were Prisma-backed, which made them permanently fail here: `prisma
 * generate` cannot run on this platform, so `prisma.learningPath.findMany`
 * rejected on every call. They now run on a plain pg Pool, same as auth and the
 * admin router — no native engine, so they work anywhere Node runs.
 *
 * Prisma is still exported by @careerbright/db for environments where it can be
 * generated; nothing on the request path depends on it any more.
 */

const pool = new Pool({
  connectionString: process.env.DATABASE_URL ?? "",
  max: 5,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 10_000,
});

const pathsRouter = router({
  list: publicProcedure
    .input(z.object({ category: z.string().optional() }).default({}))
    .query(async ({ input }) => {
      const { rows } = input.category
        ? await pool.query(
            `select * from "LearningPath" where category = $1 order by "estimatedWeeks" asc`,
            [input.category]
          )
        : await pool.query(`select * from "LearningPath" order by "estimatedWeeks" asc`);
      return rows;
    }),

  bySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const path = await pool.query(`select * from "LearningPath" where slug = $1`, [
        input.slug,
      ]);
      if (path.rows.length === 0) return null;
      // `order` is a reserved word, so it needs quoting as an identifier.
      const milestones = await pool.query(
        `select * from "LearningPathMilestone" where "learningPathId" = $1 order by "order" asc`,
        [path.rows[0].id]
      );
      return { ...path.rows[0], milestones: milestones.rows };
    }),
});

const coursesRouter = router({
  list: publicProcedure.query(async () => {
    const { rows } = await pool.query(
      `select c.*,
              (select count(*)::int from "Module" m where m."courseId" = c.id) as "moduleCount"
         from "Course" c
        order by c."updatedAt" desc`
    );
    return rows;
  }),

  // Was publicProcedure: any anonymous visitor could create courses.
  create: protectedProcedure
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
});

export const appRouter = router({
  paths: pathsRouter,
  courses: coursesRouter,
  admin: adminRouter,
  metrics: metricsRouter,
  missions: missionsRouter,
});

export type AppRouter = typeof appRouter;