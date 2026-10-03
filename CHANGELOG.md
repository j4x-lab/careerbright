# Changelog — Career SuperBright

## v0.4.0 — Locale-Correct Routing + A11y/Motion Hardening (2026-10-03)

### Nova/ember landing direction, then back to cobalt
- Concept pass: ember theme tokens (cream/espresso/ember/forest), Space Grotesk
  variable display face, role-ticker marquee, editorial hero, ruled stats,
  bento event band, ember CTA climax
- Recomposed onto the cobalt light-OS so the current UI language is preserved:
  legal 44px targets, unified `scroll-mt: 32` for anchor clearance under the
  fixed nav
- `LANDING.MD` (scratch concept doc) removed once its decisions landed

### Locale-correct navigation (`src/i18n/navigation.ts`)
- All internal hrefs are locale-less and resolved by next-intl's `Link`, so
  `/en/**` no longer links back into Indonesian
- Notice-bar language toggle is functional: same route + hash, `hrefLang`,
  sr-only label — replaces inert "ID / EN" text
- Root layout reads `getLocale()` so `<html lang>` is correct on `/en/*`;
  locale layout calls `setRequestLocale()` to keep routes prerendered
- Unknown path slugs 404 instead of silently serving another path

### Accessibility
- Labelled auth fields with `required`/min-length surfaced; success and error
  moved into separate live regions; post-auth redirect honours the locale
- Quiz and lab verdicts announce via `role=status`/`role=alert` with sr-only
  pass/fail text (no colour-only ticks); the lab focuses its results list
- Mobile nav overlay closes on Escape and restores focus; decorative glyphs
  marked `aria-hidden`; interactive targets ≥44px
- Skip links target `<main id="konten" tabIndex={-1}>`, not an inner hero wrapper
- `Reveal` accepts `as` so revealed list items are not wrapped in a `<div>`

### Motion
- `prefers-reduced-motion` now collapses each animation onto its authored rest
  frame instead of a blanket `0.01ms`: progress bars no longer rest at
  `scaleX(0)` and the marquee no longer parks on the aria-hidden duplicate
- `will-change` only while a reveal is pending, never at rest
- WCAG 2.2.2: the logo marquee pauses on hover and keyboard focus

## v0.3.0 — Premium-Bold + Section Rhythm (2026-10-03)

- Premium-bold redesign: fluid display type, cobalt rule kickers, escalated
  stats spotlight and role index, timeline steps, 52px CTA pairs
- Long roles section split into three movements (#pekerjaan stats,
  #contoh-event band, #semua-peran index)
- Premium-bold course pages: display heroes, chapter lockups, quiz and lab
  instruments with progress meter and verdict states
- Chrome: quiet notice bar, decisive nav states, footer CTA climax

## v0.2.1 — Light-OS Restoration + i18n + Self-Hosted Visuals (2026-10-03)

Patch release on the v0.2 line. Restores the light-OS design language across
the whole site and finishes English i18n coverage.

### Design tokens (`globals.css`)
- Single light-OS system: cobalt scale, signal amber family, ok/danger
  feedback, paper → card → paper-inset surfaces (no theme inversion)
- Removed dead/duplicate tokens (accent, brand-950/100, navy inverters)
- Shape lock as radius tokens (btn 14px · card 24px · media 20px · input 12px)
- All CSS literals converted to `var()` references

### i18n (all pages, `messages/id.json` + `messages/en.json`)
- Deterministic locale resolution (explicit messages, no middleware dependence)
- Full EN coverage incl. curriculum mirror (lessons, quizzes, catalog, paths)
- Roboto Mono variable replaces IBM Plex Mono for `font-mono`

### Visuals (`public/images/`)
- Self-hosted compressed crops (~9x smaller, offline-safe): Jakarta towers,
  street-snack discussion (top band), café independence-day crew
- Per-course heroes, per-path photos, signup panel art, #pekerjaan banner
- 21/9 container refinement (zero-crop fit)

## v0.2.0 — Midnight Paper Redesign (2026-10-02)

Full-site redesign on all aspects, built on frozen v0.1.0 baseline.

### Design system v2 (`globals.css`)
- New language “Midnight Paper”: dark cinematic hero (`#060A13` + aurora + grid) → warm paper body (`#FAF8F3`)
- Accents: Iris `#4F46E5` primary, Amber `#F59E0B` signal on dark, Mint ok; cobalt lock retired
- Shape lock v2: buttons 14px · cards 24px · media 20px · inputs 12px · pills full
- New utilities: `.glass-dark`, `.aurora-blob`, `.grid-dark`, `.photo-cap`, `.panel-warm`, `.shell-*`, `.chip`, `.field-dark`, `.btn-amber`, `.btn-dark`

### Landing (`app/page.tsx`, 10 sections)
- Dark hero with live console (Bright AI + skill bars + skor 87) + stats + logo marquee
- Goals bento v2 (2 dark feature + 4 light, salary chips), pillars 4+3 v2, kasus editorial + dark workplace-sim card
- Jalur consoles (dark FE timeline + UMKM chips), dark Konteks band, AI split + live skill graph, Bukti (portfolio + verify card + 3 outcome testimonials), pricing (Plus highlighted dark) + FAQ, photo CTA panel

### Chrome (`site-chrome.tsx`)
- Midnight notice bar, floating pill nav on scroll (glass dark), search entry to katalog, dark mobile overlay, dark mega footer with glass CTA + v0.2 mark

### Katalog / Learning / Verify
- Katalog: dark search band overlapping card, kind pills, v2 result cards with arrow + meta
- Paths: dark goal-first header + glass enroll card, photo-cap visuals, numbered silabus
- Belajar: dark course header, amber project panel, glass experience panel
- Verify: dark glass credential card + amber CTA

### Dashboards / Auth
- Student dashboard: app-shell (sidebar + 4 progress stat cards + dark continue + dark BNSP upgrade + wallet)
- New shared `OpsShell` (dark header + panels) for admin/instructor/employer/university/LSP
- Auth: split screen (dark brand panel + form card + OTP), cross-links masuk/daftar

### Verified
- `typecheck` clean, `next build` green (all 18 routes), `test/smoke.ts` passes
- Anchors preserved (`#tujuan #jalur #kasus #konteks #ai #bukti #harga #organisasi #konten`), no API/backend changes

## v0.1.0 — Light-OS Foundation (2026-10-02)

Baseline release frozen before v0.2 redesign. Stable reference point.

### Included
- Light-OS landing (`apps/web/src/app/page.tsx`): hero + console, goal-first bento, 7 pillars, kasus nyata, jalur FE + UMKM, konteks Indonesia, Bright AI + skill graph, portfolio + verify, hiring logos, pricing IDR, WA CTA
- Design system: cobalt lock `#1D4ED8`, paper `#F6F7F9`, shape lock (btn 12 / card 20 / media 16 / input 10), Jakarta Sans + Plex Mono, reveal + hero cascade, `prefers-reduced-motion`
- Site chrome: ID notice bar (Bangga Buatan Indonesia), 64px nav, mobile overlay, 4-col footer + PT entity
- Katalog search (`/id/katalog`): unified kursus + jalur, category/kind/konteks filters
- Learning: 5 paths (`/id/paths/[slug]`), 6 demo courses (`/id/belajar/[slug]`) with MCQ + CodeLab, recommendation rule
- Dashboards: student (`/dashboard` + LSP upgrade via Midtrans), instructor, admin, employer, university, LSP
- Verify (`/verify/[id]`), auth (masuk/daftar email + phone OTP), tRPC + Better Auth stub, Midtrans Snap + webhook
- Packages: `db` (Prisma + SKKNI seed), `ai` (judge prompts), `credentials` (OB3/VC builders), `payments` (Midtrans), `notify`, `ui`
- Docs: `FEATURE.md` (PRD full), `MASTERPLAN.md` (7 roles, SKKNI, AI assessment, OB3/VC2/CLR)

### Verified
- `npm run build --workspace=@careerbright/web` passes (Next.js 15)
- All photography local-ID Pexels IDs verified 200 (see `src/lib/visual.ts`)

### Tag
- `v0.1.0` → commit `cc41bcb`
