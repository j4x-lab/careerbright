import { createTranslator } from "next-intl";
import { getLocaleMessages } from "@/i18n/messages";
import { Reveal } from "@/components/reveal";
import { SiteFooter, SiteNav } from "@/components/site-chrome";
import { LOCAL } from "@/lib/visual";

/*
 * Career SuperBright landing — concise build per MASTERPLAN V2.1 + LANDING V2.
 *
 * Design read: concise consumer landing for Indonesian students /
 * fresh grads, calm trust-first language, Tailwind v4 +
 * Jakarta Sans + Plex Mono, restrained purposeful motion.
 * Dials: VARIANCE 6 / MOTION 4 / DENSITY 3.
 *
 * No usecase / real-case content on this page: generic method preview,
 * role rows, and honesty badges only. Per-role depth lives in
 * lib/tracks.ts + track-picker/track-panels/scenario-demo (dormant,
 * reserved for future /roles/* pages). No fake testimonials anywhere.
 * Anchors: #konten #masalah #pekerjaan #cara-kerja #siap.
 * Shape lock v2: buttons 14px · cards 24px · media 20px · inputs 12px.
 * Copy comes from the landing dictionary namespace.
 */

const WAVE2 = [
  "Junior Accountant",
  "Software Engineer",
  "Cybersecurity Analyst",
];

export default async function LandingPage({ locale }: { locale: string }) {
  const t = await createTranslator({
    locale,
    namespace: "landing",
    messages: getLocaleMessages(locale),
  });
  const DEMAND_STATS: [string, string][] = [
    [t("stat1v"), t("stat1l")],
    [t("stat2v"), t("stat2l")],
    [t("stat3v"), t("stat3l")],
  ];
  const WAVE1 = [
    { name: "Digital Marketing Specialist", mission: t("w1dmM"), caps: ["Performance Ads", "Marketing Analytics", "Live Commerce"], signal: t("w1dmS"), salary: t("w1dmPay") },
    { name: "Data Analyst", mission: t("w1daM"), caps: ["SQL & Spreadsheets", "Dashboarding", "Insight Storytelling"], signal: t("w1daS"), salary: t("w1daPay") },
    { name: "UI/UX Designer", mission: t("w1uxM"), caps: ["UX Research", "Figma & Design System", "Usability Testing"], signal: t("w1uxS"), salary: t("w1uxPay") },
  ];
  const STEPS: [string, string][] = [
    [t("step1t"), t("step1d")],
    [t("step2t"), t("step2d")],
    [t("step3t"), t("step3d")],
    [t("step4t"), t("step4d")],
    [t("step5t"), t("step5d")],
  ];
  return (
    <main className="overflow-x-clip bg-paper text-ink">
      <a href="#konten" className="skip-link">
        {t("skip")}
      </a>
      <SiteNav />

      {/* ── HERO · THE JOB ─────────────────────────────────── */}
      <section className="hero-light relative overflow-hidden pt-[132px]">
        <div className="grid-light absolute inset-0" aria-hidden />
        <div
          id="konten"
          className="relative mx-auto grid w-full max-w-7xl scroll-mt-32 items-center gap-12 px-4 pb-12 pt-6 lg:grid-cols-2"
        >
          <div>
            <p className="hero-enter hero-enter-1 eyebrow-light">
              {t("heroEyebrow")}
            </p>
            <h1 className="hero-enter hero-enter-2 mt-5 max-w-[20ch] text-4xl font-extrabold leading-[1.04] tracking-tight md:text-6xl">
              {t("heroTitle")}
            </h1>
            <p className="hero-enter hero-enter-3 mt-5 max-w-[48ch] text-[15px] leading-relaxed text-soft md:text-base">
              {t("heroSub")}
            </p>
            <div className="hero-enter hero-enter-3 mt-7 flex flex-wrap items-center gap-3">
              <a href="#pekerjaan" className="btn-amber group">
                {t("heroCta1")}
                <span className="btn-island btn-island-dark" aria-hidden>
                  ↗
                </span>
              </a>
              <a href="#cara-kerja" className="btn-ghost">
                {t("heroCta2")}
              </a>
            </div>
            <p className="hero-enter hero-enter-4 mt-6 font-mono text-[11px] leading-relaxed text-faint">
              {t("heroFlavor")}
            </p>
          </div>

          {/* Hero visual — generic method preview, no real case */}
          <div className="hero-enter hero-enter-4">
            <div className="glass-light overflow-hidden">
              <div className="flex items-center gap-2 border-b border-line px-5 py-3.5">
                <span className="live-dot" aria-hidden />
                <span className="font-mono text-[11px] text-muted">
                  {t("methodLabel")}
                </span>
              </div>
              <ol className="divide-y divide-line">
                {[
                  ["01", t("m1t"), t("m1d")],
                  ["02", t("m2t"), t("m2d")],
                  ["03", t("m3t"), t("m3d")],
                ].map(([n, tt, d]) => (
                  <li key={n} className="flex gap-4 px-5 py-4">
                    <span className="tnum mt-0.5 font-mono text-[11px] font-bold text-brand-700">
                      {n}
                    </span>
                    <span>
                      <span className="block text-[14px] font-extrabold tracking-tight">
                        {tt}
                      </span>
                      <span className="mt-0.5 block text-[13px] leading-relaxed text-soft">
                        {d}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
              <div className="border-t border-line bg-paper px-5 py-3">
                <a href="#cara-kerja" className="link-more">
                  {t("methodLink")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── THE PROBLEM ──────────────────────────────────── */}
      <section
        id="masalah"
        className="mx-auto max-w-7xl scroll-mt-28 px-4 py-16 md:py-24"
      >
        <Reveal>
          <h2 className="max-w-[22ch] text-4xl font-extrabold md:text-5xl">
            {t("probTitle")}
          </h2>
          <p className="mt-3 max-w-[60ch] text-[15px] leading-relaxed text-soft">
            {t("probSub")}
          </p>
        </Reveal>
        <div className="mt-9 grid gap-4 md:grid-cols-2">
          <Reveal>
            <div className="panel h-full p-6 md:p-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
                {t("probLeftLabel")}
              </p>
              <p className="mt-2 text-2xl font-extrabold tracking-tight">
                {t("probQuote")}
              </p>
              <p className="mt-2 font-mono text-[11px] leading-relaxed text-faint">
                {t("probLeftCap")}
              </p>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="panel h-full p-6 md:p-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
                {t("probRightLabel")}
              </p>
              <ul className="mt-3 grid grid-cols-2 gap-2">
                {[t("task1"), t("task2"), t("task3"), t("task4"), t("task5"), t("task6")].map((x) => (
                  <li key={x} className="chip justify-center !text-[12px]">
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
        <Reveal delay={120}>
          <figure className="photo-cine mt-4 aspect-[21/9]">
            <img
              src={LOCAL.diskusiWide}
              alt={t("probPhotoAlt")}
              loading="lazy"
              decoding="async"
              sizes="(max-width: 768px) 100vw, 1120px"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <figcaption className="photo-cap">
              <span>{t("probPhotoCap")}</span>
              <span className="opacity-70">Pexels</span>
            </figcaption>
          </figure>
        </Reveal>
      </section>

      {/* ── 01 · DEMAND PROOF ────────────────────────────── */}
      <section
        id="pekerjaan"
        className="mx-auto max-w-7xl scroll-mt-32 px-4 pt-16 md:pt-24 pb-10 md:pb-12"
      >
        <Reveal>
          <h2 className="max-w-[22ch] text-4xl font-extrabold md:text-5xl">
            {t("jobsTitle")}
          </h2>
          <p className="mt-3 max-w-[62ch] text-[15px] leading-relaxed text-soft">
            {t("jobsSub")}
          </p>
        </Reveal>
        <dl className="mt-8 grid gap-6 border-y border-line py-7 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-line">
          {DEMAND_STATS.map(([v, l]) => (
            <Reveal
              key={l}
              className="sm:px-8 sm:first:pl-0 sm:last:pr-0"
            >
              <dt className="tnum font-mono text-2xl font-extrabold tracking-tight md:text-3xl">
                {v}
              </dt>
              <dd className="mt-1 text-[12px] leading-snug text-muted">{l}</dd>
            </Reveal>
          ))}
        </dl>
      </section>

      {/* ── 02 · FEATURED EXAMPLE (full-bleed band) ─────────── */}
      <section
        id="contoh-event"
        className="scroll-mt-28 border-y border-line bg-card"
      >
        <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
        {/* Contoh 1 dari 4 — the single playable spotlight */}
        <Reveal>
          <div className="overflow-hidden rounded-card border-2 border-ink bg-paper">
            <div className="grid gap-3 px-6 py-5 md:grid-cols-12 md:items-center">
              <div className="md:col-span-4">
                <p className="inline-block rounded-full bg-signal/15 px-2.5 py-0.5 font-mono text-[10px] font-bold text-signal-strong">
                  {t("eventBadge")}
                </p>
                <p className="mt-2 text-[15px] font-extrabold tracking-tight">
                  Event &amp; Brand Activation Supervisor
                </p>
                <p className="mt-1 text-[13px] leading-relaxed text-soft">
                  {t("eventMission")}
                </p>
              </div>
              <ul
                className="flex flex-wrap gap-1.5 md:col-span-4"
                aria-label={t("eventCapsLabel")}
              >
                {["Campaign Planning", "Vendor Management", "Crisis Management"].map((c) => (
                  <li key={c} className="chip !text-[12px]">
                    {c}
                  </li>
                ))}
              </ul>
              <div className="md:col-span-4 md:text-right">
                <p className="font-mono text-[11px] leading-relaxed text-muted">
                  {t("eventSignal")}
                </p>
                <a href="/id/auth/daftar" className="link-more mt-1.5 inline-block">
                  {t("eventCta")}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
        </div>
      </section>

      {/* ── 03 · ROLE INDEX ────────────────────────────────── */}
      <section
        id="semua-peran"
        className="mx-auto max-w-7xl scroll-mt-28 px-4 pt-12 md:pt-16 pb-16 md:pb-24"
      >
        {/* Wave-1 rows — list, not twin cards */}
        <Reveal>
          <div className="overflow-hidden rounded-card border border-line bg-card">
            <p className="border-b border-line bg-paper px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              {t("waveBand")}
            </p>
            <ul className="divide-y divide-line">
              {WAVE1.map((row) => (
                <li
                  key={row.name}
                  className="grid gap-3 px-6 py-5 md:grid-cols-12 md:items-center"
                >
                  <div className="md:col-span-4">
                    <p className="text-[15px] font-extrabold tracking-tight">
                      {row.name}
                    </p>
                    <p className="mt-1 text-[13px] leading-relaxed text-soft">
                      {row.mission}
                    </p>
                  </div>
                  <ul
                    className="flex flex-wrap gap-1.5 md:col-span-4"
                    aria-label={`${t("capsLabel")} ${row.name}`}
                  >
                    {row.caps.map((c) => (
                      <li key={c} className="chip !text-[12px]">
                        {c}
                      </li>
                    ))}
                  </ul>
                  <div className="md:col-span-4 md:text-right">
                    <p className="font-mono text-[11px] leading-relaxed text-muted">
                      {row.signal}
                    </p>
                    <p className="tnum mt-0.5 font-mono text-[12px] font-bold text-brand-700">
                      {row.salary}
                    </p>
                    <a
                      href="/id/auth/daftar"
                      className="link-more mt-1.5 inline-block"
                    >
                      {t("earlyCta")}
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-4 flex flex-col gap-2 rounded-card border border-dashed border-line bg-paper px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-soft">
              <strong className="text-ink">{t("soon")}</strong>{" "}
              {WAVE2.join(" · ")}
            </p>
            <a href="/id/auth/daftar" className="link-more flex-none">
              {t("earlyCta")}
            </a>
          </div>
          <p className="mt-4 font-mono text-[11px] leading-relaxed text-faint">
            {t("sources")}
          </p>
        </Reveal>
        <Reveal delay={120}>
          <figure className="photo-cine mt-4 aspect-[21/9]">
            <img
              src={LOCAL.kantorJakarta}
              alt={t("jobsPhotoAlt")}
              loading="lazy"
              decoding="async"
              sizes="(max-width: 768px) 100vw, 1120px"
              className="h-full w-full object-cover"
            />
            <figcaption className="photo-cap">
              <span>{t("jobsPhotoCap")}</span>
              <span className="opacity-70">Pexels</span>
            </figcaption>
          </figure>
        </Reveal>
      </section>

      {/* ── HOW ROLEPATH WORKS ───────────────────────────────── */}
      <section
        id="cara-kerja"
        className="mx-auto max-w-7xl scroll-mt-28 px-4 py-16 md:py-24"
      >
        <Reveal>
          <h2 className="max-w-[22ch] text-4xl font-extrabold md:text-5xl">
            {t("stepsTitle")}
          </h2>
        </Reveal>
        <ol className="mt-9 grid gap-x-6 gap-y-7 border-t border-line pt-7 sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map(([st, d], i) => (
            <Reveal key={st} delay={i * 60}>
              <li>
                <p className="tnum font-mono text-sm font-bold text-brand-700">
                  {st}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-soft">{d}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* ── 08 · FINAL CTA ───────────────────────────────────── */}
      <section id="siap" className="scroll-mt-28 border-t border-line bg-card">
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
          <Reveal>
            <h2 className="max-w-[22ch] text-4xl font-extrabold md:text-5xl">
              {t("ctaTitle")}
            </h2>
            <p className="mt-3 max-w-[60ch] text-[15px] leading-relaxed text-soft">
              {t("ctaSub")}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href="#pekerjaan" className="btn-amber group">
                {t("cta1")}
                <span className="btn-island btn-island-dark" aria-hidden>
                  ↗
                </span>
              </a>
              <a href="/id/auth/daftar" className="btn-ghost">
                {t("cta2")}
              </a>
            </div>
            <p className="mt-4 font-mono text-[11px] leading-relaxed text-faint">
              {t("ctaNote")}
            </p>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
