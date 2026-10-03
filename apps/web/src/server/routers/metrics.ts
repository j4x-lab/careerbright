import { TRPCError } from "@trpc/server";
import { Pool } from "pg";
import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../trpc";
import { getSession } from "../guard";

/*
 * PRD §9 product metrics for the discovery tier.
 *
 * Two procedures:
 *   log    — public. The client fires it on role views, scenario starts and
 *            scenario completions. Strictly validated (event enum, bounded
 *            ids, duration ceiling); carries no PII. Rate-limiting is a
 *            documented follow-up, not implemented here.
 *   report — ADMIN only. Trailing-30-day aggregates:
 *              Exploration Breadth  = avg distinct roles viewed per session
 *              Scenario Play Rate   = sessions completing ≥1 scenario /
 *                                     sessions viewing ≥1 role
 *              Completion Velocity  = median ms from scenario start to verdict
 *            AI Latency and Portfolio Export have no underlying flow yet (no
 *            AI evaluation, no portfolio export), so they are reported as
 *            uninstrumented rather than invented.
 */

const pool = new Pool({
  connectionString: process.env.DATABASE_URL ?? "",
  max: 5,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 10_000,
});

const LogInput = z.object({
  event: z.enum(["role_view", "scenario_start", "scenario_complete"]),
  roleId: z.string().min(1).max(64).optional(),
  scenarioId: z.string().min(1).max(64).optional(),
  durationMs: z.number().int().min(0).max(3_600_000).optional(),
  verdict: z.enum(["Optimal", "Risky", "Fatal"]).optional(),
  sessionKey: z.string().min(8).max(64),
});

const metricsReport = async () => {
  const { rows } = await pool.query(
    `with windowed as (
       select * from "MetricEvent"
        where "createdAt" >= now() - interval '30 days'
     ),
     viewers as (
       select "sessionKey", count(distinct "roleId")::int as roles
         from windowed where "event" = 'role_view' group by "sessionKey"
     ),
     completers as (
       select distinct "sessionKey" from windowed where "event" = 'scenario_complete'
     ),
     velocity as (
       select percentile_cont(0.5) within group (order by "durationMs")::int as ms
         from windowed where "event" = 'scenario_complete' and "durationMs" is not null
     )
     select
       (select count(*)::int from viewers)                                   as viewer_sessions,
       (select coalesce(round(avg(roles), 1), 0)::float from viewers)        as breadth,
       (select count(*)::int from completers)                                as completer_sessions,
       (select count(*)::int from windowed where "event" = 'scenario_complete') as completions,
       (select count(*)::int from windowed where "event" = 'scenario_start')    as starts,
       (select ms from velocity)                                             as velocity_ms`
  );
  const r = rows[0] ?? {};
  const viewers = r.viewer_sessions ?? 0;
  const completers = r.completer_sessions ?? 0;
  return {
    viewerSessions: viewers,
    breadth: r.breadth ?? 0,
    completerSessions: completers,
    completions: r.completions ?? 0,
    starts: r.starts ?? 0,
    playRate: viewers > 0 ? Math.round((completers / viewers) * 1000) / 10 : 0,
    velocityMs: r.velocity_ms ?? null,
  };
};

export const metricsRouter = router({
  log: publicProcedure.input(LogInput).mutation(async ({ input, ctx }) => {
    const session =
      typeof ctx.session === "function" ? await ctx.session() : null;
    await pool.query(
      `insert into "MetricEvent"
         (id, "event", "roleId", "scenarioId", "durationMs", verdict, "userId", "sessionKey")
       values (gen_random_uuid()::text, $1, $2, $3, $4, $5, $6, $7)`,
      [
        input.event,
        input.roleId ?? null,
        input.scenarioId ?? null,
        input.durationMs ?? null,
        input.verdict ?? null,
        (session?.user as { id?: string } | undefined)?.id ?? null,
        input.sessionKey,
      ]
    );
    return { ok: true as const };
  }),

  report: protectedProcedure.use(async ({ next }) => {
    const session = await getSession();
    if (!session) {
      throw new TRPCError({ code: "UNAUTHORIZED", message: "Sign in required" });
    }
    if ((session.user.role ?? "STUDENT") !== "ADMIN") {
      throw new TRPCError({ code: "FORBIDDEN", message: "Admin role required" });
    }
    return next();
  }).query(metricsReport),
});