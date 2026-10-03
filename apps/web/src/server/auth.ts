import { betterAuth } from "better-auth";
import { phoneNumber } from "better-auth/plugins";
import { Pool } from "pg";

/*
 * Better Auth runs on its built-in Kysely adapter over a plain pg Pool — not
 * on Prisma. Reason: `prisma generate` must fetch Prisma's schema-engine from
 * binaries.prisma.sh, which is unreachable from this machine (Termux/Android,
 * ECONNRESET), so a Prisma client simply cannot be generated here. Kysely needs
 * no native engine, so auth works anywhere Node runs. `pg` is a plain JS driver,
 * so nothing platform-specific is involved.
 *
 * The auth tables (user / session / account / verification) are created by
 * packages/db/prisma/schema.sql, which stays the single source of truth for DDL.
 */

const connectionString = process.env.DATABASE_URL;
const baseURL = process.env.BETTER_AUTH_URL ?? "http://localhost:3000";

// Build-safe: never throw at import time (Next imports this while collecting
// page data, and `next build` runs without env). Only the first query fails.
// NEXT_PHASE is set during `next build` prerender: session-gated pages import
// this module while generating static pages, so skip the Pool there — otherwise
// Better Auth tries to validate the schema against Neon at build time and logs
// "Could not validate the database schema" even though the build succeeds.
const isBuildPhase = process.env.NEXT_PHASE === "phase-production-build";
const pool =
  connectionString && !isBuildPhase
    ? new Pool({
        connectionString,
        max: 5,
        // Neon pooled endpoints recycle idle clients; don't let the pool hang on.
        idleTimeoutMillis: 30_000,
        connectionTimeoutMillis: 10_000,
      })
    : null;

/*
 * Origin rules.
 *
 * Better Auth rejects any request whose Origin is not trusted, and BETTER_AUTH_URL
 * alone pins that to a single host. So signing in over the LAN address Next
 * prints at startup (`http://192.168.x.x:3000`), or over 127.0.0.1, failed with
 * INVALID_ORIGIN even though the credentials were correct.
 *
 * `trustedOrigins` accepts a function, which lets the rule stay strict where it
 * matters: in production only the configured base URL is trusted, plus anything
 * explicitly listed. The loopback/private-range relaxation is development-only,
 * because a dev server is reachable on whatever address the network hands it.
 */
const PRIVATE_DEV_HOST =
  /^(localhost|127(\.\d+){3}|0\.0\.0\.0|\[::1\]|10\.\d+\.\d+\.\d+|192\.168\.\d+\.\d+|172\.(1[6-9]|2\d|3[01])\.\d+\.\d+)$/;

function isDevPrivateOrigin(origin: string): boolean {
  if (process.env.NODE_ENV === "production") return false;
  try {
    const url = new URL(origin);
    return url.protocol === "http:" && PRIVATE_DEV_HOST.test(url.hostname);
  } catch {
    return false;
  }
}

// Escape hatch for hosts we did not anticipate: a tunnel, a staging domain.
const extraOrigins = (process.env.BETTER_AUTH_TRUSTED_ORIGINS ?? "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

export const auth = betterAuth({
  ...(pool ? { database: pool } : {}),
  baseURL,
  trustedOrigins: (request) => {
    const list = [baseURL, ...extraOrigins];
    // `request` is optional in the type and genuinely absent on some paths.
    const origin = request?.headers?.get?.("origin");
    if (origin && isDevPrivateOrigin(origin)) list.push(origin);
    return list;
  },
  emailAndPassword: { enabled: true, minPasswordLength: 8 },
  plugins: [
    phoneNumber({
      sendOTP: async ({ phoneNumber, code }) => {
        // Phase 1 stub: log OTP. Phase 2 → WhatsApp Business API sender.
        console.log(`[auth:otp] ${phoneNumber} → ${code}`);
      },
    }),
  ],
  user: {
    additionalFields: {
      role: { type: "string", defaultValue: "STUDENT", required: false },
    },
  },
});

export type Session = typeof auth.$Infer.Session;