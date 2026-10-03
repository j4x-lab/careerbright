import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// Driver adapter (no query-engine binary) — runs on Android/Termux, serverless, edge.
// Documented form: PrismaPg takes { connectionString } directly.
//
// Build-safe: never throw at import time (Next `collecting page data`
// imports routers during `next build` with no env). Only throw on first
// actual query when DATABASE_URL is missing.
const connectionString = process.env.DATABASE_URL;

function createClient(): PrismaClient {
  if (!connectionString) {
    return offlineClient(
      "DATABASE_URL is not set — database offline (set it and run seed)."
    );
  }
  try {
    const adapter = new PrismaPg({ connectionString });
    return new PrismaClient({ adapter });
  } catch (err) {
    // `new PrismaClient` throws when the client was never generated — which is
    // the normal state wherever `prisma generate` cannot run (no engine binary,
    // no network to binaries.prisma.sh). Left unhandled it propagates out of the
    // import and 500s any page that transitively touches the DB, before that
    // page's own try/catch can degrade. Degrade the same way as a missing URL so
    // callers keep their designed offline/empty state.
    const msg = err instanceof Error ? err.message : String(err);
    console.warn(
      `[db] Prisma client unavailable, falling back to offline stub: ${msg}`
    );
    return offlineClient(
      "Prisma client is not generated — run `npm run db:generate`."
    );
  }
}

/** Deep stub: property access is safe at import time; only calls reject. */
function offlineClient(reason: string): PrismaClient {
  const err = () => Promise.reject(new Error(reason));
  const deep: ProxyHandler<object> = {
    get(_t, prop) {
      if (prop === "$disconnect" || prop === "$connect") return async () => {};
      if (prop === "then" || typeof prop === "symbol") return undefined;
      const fn = (..._a: unknown[]) => err();
      return new Proxy(fn, deep);
    },
    apply: () => err(),
  };
  return new Proxy({}, deep) as unknown as PrismaClient;
}

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
