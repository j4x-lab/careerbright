import { TRPCError, initTRPC } from "@trpc/server";
import { z } from "zod";
import type { Session } from "./auth";

export type TRPCContext = {
  /** Resolved per request in the fetch adapter; absent for in-process callers. */
  session?: () => Promise<Session | null>;
};

const t = initTRPC.context<TRPCContext>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

/*
 * Requires a signed-in session. Used for anything a visitor must not reach —
 * notably `courses.create`, which was a publicProcedure and therefore callable
 * anonymously. Throwing TRPCError keeps the failure a clean 401 for the client
 * instead of an unhandled throw.
 *
 * `ctx.session` is optional so `appRouter.createCaller({})` still works for
 * in-process callers that only touch public procedures (the instructor page
 * does this). A missing resolver therefore means "no session", never "allow".
 */
export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  const session = typeof ctx.session === "function" ? await ctx.session() : null;
  if (!session) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Sign in required" });
  }
  return next({ ctx: { ...ctx, session } });
});

export const idSlug = z.string().min(3).max(80).regex(/^[a-z0-9-]+$/);
