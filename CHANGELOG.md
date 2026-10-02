# Changelog — Career SuperBright

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
