import { z } from "zod";
import { prisma } from "@careerbright/db";
import { publicProcedure, router } from "../trpc";

export const pathsRouter = router({
  list: publicProcedure
    .input(z.object({ category: z.string().optional() }).default({}))
    .query(async ({ input }) =>
      prisma.learningPath.findMany({
        where: input.category ? { category: input.category as never } : undefined,
        orderBy: { estimatedWeeks: "asc" },
        include: { milestones: { orderBy: { order: "asc" } } },
      })
    ),
  bySlug: publicProcedure.input(z.object({ slug: z.string() })).query(({ input }) =>
    prisma.learningPath.findUnique({
      where: { slug: input.slug },
      include: { milestones: { orderBy: { order: "asc" } } },
    })
  ),
});

export const coursesRouter = router({
  list: publicProcedure.query(() =>
    prisma.course.findMany({ orderBy: { updatedAt: "desc" }, include: { modules: true } })
  ),
  create: publicProcedure
    .input(z.object({ slug: z.string().min(3), titleId: z.string().min(3), titleEn: z.string().optional() }))
    .mutation(({ input }) => prisma.course.create({ data: input })),
});

export const appRouter = router({
  paths: pathsRouter,
  courses: coursesRouter,
});

export type AppRouter = typeof appRouter;
