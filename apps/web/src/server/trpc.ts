import { initTRPC } from "@trpc/server";
import { z } from "zod";

const t = initTRPC.create();

export const router = t.router;
export const publicProcedure = t.procedure;
export const idSlug = z.string().min(3).max(80).regex(/^[a-z0-9-]+$/);
