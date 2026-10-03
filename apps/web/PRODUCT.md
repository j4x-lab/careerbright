# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: Indonesian S1/D3 fresh graduates deciding on a career direction. Situation: they know job titles (e.g. Data Analyst, Social Media Specialist, HRBP) but not day-to-day work, tools, or trade-offs. Job: explore many roles fast (10 roles in an hour), experience the pressure of the job via short simulations, then commit to one path.

Secondary (supported, not primary): enrolled learners working through paths/courses (jalur, belajar with MCQ + CodeLab); instructors, admin, employer, university, and LSP operators using dashboard shells; visitors verifying credentials at `/verify/[id]`.

## Product Purpose

Career SuperBright is a discovery-first career simulator for Indonesia: high-fidelity role profiles (Day in the Life timeline, Myth vs Reality, tool stack, anonymized deliverables) plus 3-minute interactive micro-scenarios (chat/email context, A/B/C/D decisions, immediate Optimal/Risky/Poor trade-off analysis with practitioner debrief).

Why it exists: title illusion (choosing by prestige/salary without knowing the work) plus high friction of legacy platforms (40-hour course before seeing the job). Success means breadth and play, per PRD: >4 unique role pages per session, >50% scenario play rate after viewing a role, micro-scenario completion in <3 minutes.

## Positioning

High-breadth, low-friction discovery a course marketplace cannot truthfully copy: dozens of roles explorable in one sitting through timelines and artifacts, then playable 3-minute pressure decisions with Indonesian practitioner debriefs. SKKNI-aligned paths and verifiable OB3/VC credentials exist as supporting depth, not the differentiator.

## Operating Context

Core workflow: Kenali (Discover) → Simulasikan (Simulate) → Temukan (Decide). Catalog filtered by Industry, Major (Jurusan), and Work Style (introvert/extrovert-friendly, client-facing vs internal). Role detail is tabbed (Snapshot/Timeline, Tools/Deliverables, Micro-Scenarios); scenario player is inbox/Slack context → decision buttons → result overlay.

Product runs as `apps/web` (Next.js 15 App Router, React 19, TS strict, Tailwind v4) in the `careerbright` Turborepo. Locales `id`/`en`, default `id`, `localePrefix: as-needed`; routes live under `src/app/[locale]/` with locale-less `/api/*` and public `/verify/[id]` pages. Dictionaries in `messages/id.json` + `messages/en.json`. Amounts in integer IDR; SKKNI codes on milestones/credentials; AI confidence <0.7 routes to human review. Data via `@careerbright/db` (Prisma + Postgres driver adapter); auth via Better Auth (email + phone OTP, OTP send is console.log stub — WA Business API is Phase 2).

## Capabilities and Constraints

Confirmed: locale-correct landing (asymmetric split hero, search entry, role index, stats with source/vintage), role catalog + role detail, micro-scenario player, katalog (kursus + jalur with category/kind/konteks filters), 5 paths + 6 demo courses with MCQ quiz and CodeLab, student/instructor/admin/employer/university/LSP dashboards, Midtrans Snap upgrade + webhook, verify page, masuk/daftar auth, tRPC + Better Auth wiring.

Constraints: every user-visible string bilingual by dictionary (no hardcoded English role names on Indonesian pages); no fabricated testimonials, customers, benchmarks, pricing, or statistics — every stat carries source and vintage; imagery self-hosted under `public/images` (remote IDs verified before reference); OTP is stubbed; `DATABASE_URL` (Neon pooled, `sslmode=require`) required for DB/seed; verify with `typecheck` + `build` + `test/smoke.ts`. Open decisions: Phase 2 deep workplace tasks (artifact generation) scope; WA Business API for OTP; which additional roles/scenarios get authored next.

## Brand Commitments

Name: Career SuperBright (`@careerbright/web`). Voice: concrete Indonesian — real roles, real SKKNI codes, real figures; no "Elevate/Seamless/Unleash/Next-Gen". Visual authority lives in root `DESIGN.md` (light-OS: paper `#F6F7F9`, cobalt `#1D4ED8`, hairline rules, Space Grotesk display + Plus Jakarta Sans body + Roboto Mono metadata; no Inter, no serif, no pure black, no emojis). Existing assets and copy in repo are binding; nothing invented during init.

## Evidence on Hand

- `CareerSB-PRD.md` — discovery-first PRD (50+ roles, roles.json / micro_scenarios.json schemas, MVP metrics).
- `CHANGELOG.md` — v0.1.0 frozen baseline through v0.4.0 locale/a11y/motion hardening.
- `DESIGN.md` (repo root, inherited) — authoritative visual contract as built.
- `apps/web/messages/id.json`, `apps/web/messages/en.json` — bilingual dictionaries.
- `apps/web/public/images/` — self-hosted compressed crops; `src/lib/visual.ts` verified remote IDs.
- `packages/db/prisma/schema.sql` + `schema.prisma` + `seed.sql` — SKKNI seed and dual AppUser vs Better Auth User models.

Absences future work must not fabricate: no real testimonials, case studies, press, hiring outcomes, or salary benchmarks checked in — do not invent them.

## Product Principles

1. Breadth before depth: let a student rule ten roles out in an hour before asking for forty hours on one.
2. Show the job, not the title: timelines, tools, deliverables, and trade-offs over prestige and salary talk.
3. Simulate pressure cheaply: three minutes, one decision, immediate debrief beats another explainer page.
4. Proof over promise: SKKNI codes, sources with vintage, and verifiable credentials; never invented social proof.
5. Bilingual and concrete by default: every string through the dictionary, every claim tied to an Indonesian workplace real.

## Accessibility & Inclusion

Committed standard: WCAG 2.2 AA behavior already in code — 44px minimum targets (52px hero CTAs), skip link to `<main id="konten">`, labelled auth fields with separate live regions, quiz/lab verdicts via `role=status`/`role=alert` (no colour-only meaning), mobile nav closes on Escape with focus restore, marquee pauses on hover/focus (WCAG 2.2.2), `prefers-reduced-motion` collapses to authored rest frames, `scroll-mt-32` anchor clearance under fixed nav.
