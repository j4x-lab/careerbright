# AGENTS.md — CareerBright (SuperBright)

Turborepo + npm workspaces (`apps/*`, `packages/*`). Single app: `apps/web` (Next.js 15 App Router, React 19, TS strict, Tailwind v4). Packages are imported from TS source (`main: ./src/index.ts`), never built.

## Commands (run from repo root)

Root scripts are thin proxies — prefer them over `npx`/`turbo` directly:

- `npm run dev` / `npm run build` / `npm run lint` / `npm run typecheck` → forwarded to `@careerbright/web`
- `npm run db:generate` / `npm run db:push` / `npm run db:seed` → forwarded to `@careerbright/db`
- Keyless logic check (no DB/keys needed): `node test/smoke.ts` — covers `payments` (IDR format, Midtrans sig), `ai` (judge consensus), `credentials` (OB3 builders)
- No unit-test runner, no CI workflows, no lint beyond `next lint`. Verify with `typecheck` + `build` + `test/smoke.ts`.

Termux/Android quirks (do not "fix" these):

- `apps/web` invokes Next/TS via node directly (`node ../../node_modules/next/dist/bin/next ...`), not `next` binary — keep it.
- `packages/db` invokes Prisma via `node ../../node_modules/prisma/build/index.js ...` — Prisma engines can't load here.
- `next.config.ts`: `webpack.cache = false` in dev, `outputFileTracingRoot` set to monorepo root, `transpilePackages: ["@careerbright/db"]`.
- Lingering dev servers: `bash scripts/kill-dev.sh` (proc/cmdline sweep, no `pkill`/`lsof`).

## Database — SQL is source of truth

- `packages/db/prisma/schema.sql` mirrors `schema.prisma` (enums as TEXT). Apply manually: `psql "$DATABASE_URL" -f packages/db/prisma/schema.sql` (then `seed.sql`). Keep both files in sync when changing models.
- Client uses driver adapter (`PrismaPg`, no query-engine binary) in `packages/db/src/index.ts`. Import `{ prisma }` from `@careerbright/db`.
- Missing `DATABASE_URL` does NOT throw at import (deep stub so `next build` passes); it rejects only on first query. Never add top-level throws there.
- Two user models coexist intentionally: `AppUser` (domain: role, NIK, LSP/learning state) vs `User`/`Session`/`Account`/`Verification` (Better Auth tables). Don't merge them.

## App wiring that agents miss

- i18n: `next-intl`, locales `id`/`en`, `defaultLocale: "id"`, `localePrefix: "as-needed"` (`src/i18n/routing.ts`). Middleware matcher excludes `api|_next|.*\..*`. Dictionaries in `apps/web/messages/{id,en}.json`. Routes live under `src/app/[locale]/` (admin, dashboard, instructor, employer, university, lsp, katalog, paths, belajar, verify, auth) plus locale-less `/api/*` and `/verify/[id]`-style public pages — check both trees.
- Auth: `src/server/auth.ts` — Better Auth + `prismaAdapter` + `phoneNumber` plugin. OTP `sendOTP` is a `console.log` stub (WA Business API is Phase 2). `emailAndPassword` min length 8.
- Payments split is load-bearing: `@careerbright/payments` (client-safe: `formatIDR`, `snapJsUrl`) vs `@careerbright/payments/server` (`verifyMidtransSignature`, `createSnapTransaction` — `node:crypto`, secret keys). Never import `/server` from client components (`upgrade-button.tsx` vs `api/payments/snap/route.ts` + `api/webhooks/midtrans/route.ts` show the pattern).
- `formatIDR` uses `id-ID` locale (non-breaking space in `Rp 1.250.000`) — assert accordingly, don't "normalize" it.
- Env: copy `.env.example` → `.env`. Only `DATABASE_URL` (+ `BETTER_AUTH_SECRET`, 32+ chars) needed for local dev/seed; Midtrans/Mux/AI/Resend/WA keys optional until that integration is touched. Neon pooled URL, `sslmode=require`.

## Conventions

- Specs: `FEATURE.md` (product PRD) + `MASTERPLAN.md` (build plan: 7 role categories, SKKNI/KKNI, OB3/VC2/CLR credentials, LSP upgrade flow) are vision docs; `CHANGELOG.md` v0.1.0 is the frozen implemented baseline — trust code + CHANGELOG over MASTERPLAN when they conflict (e.g. current UI is light-OS: cobalt `#1D4ED8` / paper `#F6F7F9`, not the MASTERPLAN dark-editorial theme).
- Bilingual content: `titleId`/`titleEn` (and `...Id`/`...En`) pairs everywhere; IDR amounts as integers; SKKNI codes on milestones/credentials; confidence `< 0.7` → human review (`SubmissionStatus.NEEDS_HUMAN_REVIEW`).
