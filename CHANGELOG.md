# Changelog — Career SuperBright

## v0.1.0 — Light-OS Foundation (2026-10-02)

Baseline release frozen before full v0.2 redesign. This is the stable reference point.

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
