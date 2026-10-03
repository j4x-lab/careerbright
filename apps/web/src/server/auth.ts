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

// Build-safe: never throw at import time (Next imports this while collecting
// page data, and `next build` runs without env). Only the first query fails.
const pool = connectionString
  ? new Pool({
      connectionString,
      max: 5,
      // Neon pooled endpoints recycle idle clients; don't let the pool hang on.
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 10_000,
    })
  : null;

export const auth = betterAuth({
  ...(pool ? { database: pool } : {}),
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