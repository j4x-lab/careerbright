import { TRPCError } from "@trpc/server";
import { Pool } from "pg";
import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../trpc";
import { getSession } from "../guard";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL ?? "",
  max: 5,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 10_000,
});

const RubricCriterion = z.object({
  id: z.string().min(1).max(64),
  labelId: z.string().min(1).max(200),
  labelEn: z.string().max(200).optional(),
  weight: z.number().min(0).max(1),
  maxScore: z.number().min(1).max(100).default(100),
});

const DeliverableSpec = z.object({
  modes: z.array(z.enum(["DOCUMENT", "SPREADSHEET", "IMAGE", "LINK", "CODE"])).min(1),
  minArtifacts: z.number().min(1).max(10).default(1),
  constraints: z.string().max(2000).optional(),
});

async function requireAdminOrContributor() {
  const session = await getSession();
  if (!session) throw new TRPCError({ code: "UNAUTHORIZED" });
  const role = (session.user as { role?: string }).role ?? "STUDENT";
  if (!["ADMIN", "CONTRIBUTOR", "INSTRUCTOR", "LSP_ASSESSOR"].includes(role)) {
    throw new TRPCError({ code: "FORBIDDEN", message: "Contributor role required" });
  }
  return session;
}

export const missionsRouter = router({
  list: publicProcedure
    .input(
      z
        .object({
          roleId: z.string().optional(),
          q: z.string().optional(),
          status: z.string().optional().default("PUBLISHED"),
        })
        .default({}),
    )
    .query(async ({ input }) => {
      try {
        let sql = `select * from "Mission" where status = $1`;
        const params: unknown[] = [input.status ?? "PUBLISHED"];
        if (input.roleId) {
          sql += ` and "roleId" = $2`;
          params.push(input.roleId);
        }
        sql += ` order by "publishedAt" desc nulls last, "createdAt" desc limit 100`;
        const { rows } = await pool.query(sql, params as string[]);
        let out = rows;
        if (input.q) {
          const q = input.q.toLowerCase();
          out = rows.filter(
            (r) =>
              String(r.titleId ?? "").toLowerCase().includes(q) ||
              String(r.slug ?? "").toLowerCase().includes(q) ||
              String(r.skkniUnitCode ?? "").toLowerCase().includes(q),
          );
        }
        return out;
      } catch {
        return [];
      }
    }),

  bySlug: publicProcedure.input(z.object({ slug: z.string() })).query(async ({ input }) => {
    try {
      const { rows } = await pool.query(`select * from "Mission" where slug = $1 limit 1`, [input.slug]);
      return rows[0] ?? null;
    } catch {
      return null;
    }
  }),

  myAttempts: protectedProcedure
    .input(z.object({ missionId: z.string() }).optional())
    .query(async ({ ctx, input }) => {
      const userId = (ctx.session?.user as { id?: string })?.id;
      if (!userId) return [];
      try {
        const sql = input?.missionId
          ? `select ma.*, m.slug as "missionSlug", m."titleId" as "missionTitle" from "MissionAttempt" ma join "Mission" m on m.id = ma."missionId" where ma."userId" = $1 and ma."missionId" = $2 order by ma."attemptNum" desc`
          : `select ma.*, m.slug as "missionSlug", m."titleId" as "missionTitle" from "MissionAttempt" ma join "Mission" m on m.id = ma."missionId" where ma."userId" = $1 order by ma."startedAt" desc limit 50`;
        const params = input?.missionId ? [userId, input.missionId] : [userId];
        const { rows } = await pool.query(sql, params);
        return rows;
      } catch {
        return [];
      }
    }),

  myPortfolio: protectedProcedure.query(async ({ ctx }) => {
    const userId = (ctx.session?.user as { id?: string })?.id;
    if (!userId) return [];
    try {
      const { rows } = await pool.query(
        `select pe.*, m.slug as "missionSlug", m."titleId" as "missionTitle", m."skkniUnitCode" from "PortfolioEntry" pe join "Mission" m on m.id = pe."missionId" where pe."userId" = $1 order by pe."publishedAt" desc`,
        [userId],
      );
      return rows;
    } catch {
      return [];
    }
  }),

  // Contributor: dual-mode rubric authoring (Q2) — guided fields OR raw JSON, chosen in dashboard.
  create: protectedProcedure
    .input(
      z.object({
        slug: z.string().min(3).max(80).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
        roleId: z.string().min(1),
        titleId: z.string().min(3).max(160),
        titleEn: z.string().max(160).optional(),
        briefId: z.string().min(20).max(10000),
        briefEn: z.string().max(10000).optional(),
        deliverableSpec: DeliverableSpec,
        rubricJson: z.string().max(10000).optional(),
        rubricGuided: z.array(RubricCriterion).optional(),
        skkniUnitCode: z.string().min(1).max(64),
        kkniLevel: z.number().min(1).max(9).default(5),
        difficulty: z.number().min(1).max(5).default(1),
        estimatedMin: z.number().min(5).max(1440).default(60),
        maxRevisions: z.number().min(0).max(10).default(3),
      }),
    )
    .mutation(async ({ input }) => {
      await requireAdminOrContributor();
      let rubric: z.infer<typeof RubricCriterion>[];
      if (input.rubricGuided && input.rubricGuided.length > 0) {
        rubric = input.rubricGuided;
      } else if (input.rubricJson) {
        try {
          const parsed = JSON.parse(input.rubricJson);
          rubric = z.array(RubricCriterion).parse(parsed);
        } catch {
          throw new TRPCError({ code: "BAD_REQUEST", message: "rubricJson invalid" });
        }
      } else {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Provide rubricGuided or rubricJson" });
      }
      const totalW = rubric.reduce((a, r) => a + r.weight, 0);
      if (Math.abs(totalW - 1) > 0.01) {
        throw new TRPCError({ code: "BAD_REQUEST", message: `Rubric weights must sum to 1 (got ${totalW})` });
      }
      try {
        const { rows } = await pool.query(
          `insert into "Mission" (id, slug, "roleId", "titleId", "titleEn", "briefId", "briefEn", "deliverableSpec", rubric, "skkniUnitCode", "kkniLevel", difficulty, "estimatedMin", "maxRevisions", status, "createdAt", "updatedAt")
           values (gen_random_uuid()::text, $1,$2,$3,$4,$5,$6,$7::jsonb,$8::jsonb,$9,$10,$11,$12,$13,'CURATION_PENDING',now(),now())
           returning id, slug, status`,
          [
            input.slug,
            input.roleId,
            input.titleId,
            input.titleEn ?? null,
            input.briefId,
            input.briefEn ?? null,
            JSON.stringify(input.deliverableSpec),
            JSON.stringify(rubric),
            input.skkniUnitCode,
            input.kkniLevel,
            input.difficulty,
            input.estimatedMin,
            input.maxRevisions,
          ],
        );
        return rows[0];
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        if (msg.includes("duplicate") || msg.includes("unique")) {
          throw new TRPCError({ code: "CONFLICT", message: "Slug already exists" });
        }
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: msg });
      }
    }),

  setStatus: protectedProcedure
    .input(z.object({ id: z.string(), status: z.enum(["DRAFT", "CURATION_PENDING", "PUBLISHED", "ARCHIVED"]) }))
    .mutation(async ({ input }) => {
      const session = await requireAdminOrContributor();
      const role = (session.user as { role?: string }).role ?? "STUDENT";
      if (input.status === "PUBLISHED" && role !== "ADMIN" && role !== "LSP_ASSESSOR") {
        throw new TRPCError({ code: "FORBIDDEN", message: "Only ADMIN/LSP can publish" });
      }
      const { rows } = await pool.query(
        `update "Mission" set status = $1, "updatedAt" = now(), "publishedAt" = case when $1='PUBLISHED' then coalesce("publishedAt", now()) else "publishedAt" end where id = $2 returning id, slug, status`,
        [input.status, input.id],
      );
      if (!rows[0]) throw new TRPCError({ code: "NOT_FOUND" });
      return rows[0];
    }),

  curationQueue: protectedProcedure.query(async () => {
    await requireAdminOrContributor();
    try {
      const { rows } = await pool.query(
        `select m.*, c."displayName" as "authorName" from "Mission" m left join "Contributor" c on c.id = m."authorId" where m.status = 'CURATION_PENDING' order by m."createdAt" asc`,
      );
      return rows;
    } catch {
      return [];
    }
  }),
});

export type MissionsRouter = typeof missionsRouter;
