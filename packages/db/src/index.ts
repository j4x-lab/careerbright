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
    // Deep stub: property access is safe (so adapters/routers can import
    // at build time); only actual method calls reject.
    const err = () =>
      Promise.reject(
        new Error("DATABASE_URL is not set — database offline (set it and run seed).")
      );
    const deep: ProxyHandler<object> = {
      get(_t, prop) {
        if (prop === "$disconnect" || prop === "$connect") return async () => {};
        if (prop === "then" || typeof prop === "symbol") return undefined;
        // Return a callable stub that is also chainable (prisma.user.findMany())
        const fn = (..._a: unknown[]) => err();
        return new Proxy(fn, deep);
      },
      apply: () => err(),
    };
    return new Proxy({}, deep) as unknown as PrismaClient;
  }
  const adapter = new PrismaPg({ connectionString });
  return new PrismaClient({ adapter });
}

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
