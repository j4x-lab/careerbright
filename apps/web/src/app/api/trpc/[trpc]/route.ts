import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "@/server/routers";
import { getSession } from "@/server/guard";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function handler(req: Request) {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    // Session is resolved per request, never cached: an admin mutation and a
    // student query can share a batch, and each must see its own cookie.
    createContext: () => ({ session: getSession }),
  });
}

export { handler as GET, handler as POST };