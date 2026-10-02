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
 * Visual language: PREMIUM-BOLD — big confident display type, strong
 * contrast, dramatic whitespace, one hero element per viewport.
 * Dials: VARIANCE 8 / MOTION 5 / DENSITY 4.
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
      <section className="hero-light relative overflow-hidden pt-[120px] md:pt-[144px]">
        <div className="grid-light absolute inset-0" aria-hidden />
        <div
          id="konten"
          className="relative mx-auto grid w-full max-w-7xl scroll-mt-32 items-start gap-10 px-4 pb-16 pt-8 md:pb-20 lg:grid-cols-12 lg:gap-8"
        >
          <div className="lg:col-span-5">
            <p className="hero-enter hero-enter-1 eyebrow-light flex items-center gap-3">
              <span aria-hidden className="inline-block h-[2px] w-8 flex-none bg-brand-700" />
              {t("heroEyebrow")}
            </p>
            <h1 className="hero-enter hero-enter-2 font-nova mt-6 max-w-[22ch] text-[clamp(2.25rem,5vw,4rem)] font-bold leading-[1.04] tracking-[-0.02em]">
              {t("heroTitle")}
            </h1>
            <p className="hero-enter hero-enter-3 mt-6 max-w-[46ch] text-base leading-relaxed text-soft md:text-lg">
              {t("heroSub")}
            </p>
            <div className="hero-enter hero-enter-3 mt-8 flex flex-wrap items-center gap-4">
              <a href="#pekerjaan" className="btn-amber group min-h-[52px] px-7 text-[15px]">
                {t("heroCta1")}
                <span className="btn-island btn-island-dark" aria-hidden>
                  ↗
                </span>
              </a>
              <a href="#cara-kerja" className="link-more inline-flex min-h-[44px] items-center">
                {t("heroCta2")}
              </a>
            </div>
            <p className="hero-enter hero-enter-4 mt-8 max-w-[52ch] border-t border-line pt-5 font-mono text-[11px] leading-relaxed text-muted">
              {t("heroFlavor")}
            </p>
          </div>

          {/* Hero visual — generic method preview, no real case */}
          <div className="hero-enter hero-enter-4 relative lg:col-span-6 lg:col-start-7 lg:mt-10">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-3 rounded-card border border-brand-700/15"
            />
            <div className="glass-light relative overflow-hidden">
              <div className="flex items-center gap-2.5 border-b border-line bg-card px-5 py-4 md:px-6">
                <span className="live-dot" aria-hidden />
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-ink">
                  {t("methodLabel")}
                </span>
                <span aria-hidden className="ml-auto flex gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-cream" />
                  <span className="h-2 w-2 rounded-full bg-cream" />
                  <span className="h-2 w-2 rounded-full bg-signal" />
                </span>
              </div>
              <ol className="divide-y divide-line">
                {[
                  ["01", t("m1t"), t("m1d")],
                  ["02", t("m2t"), t("m2d")],
                  ["03", t("m3t"), t("m3d")],
                ].map(([n, tt, d]) => (
                  <li key={n} className="flex gap-5 px-5 py-5 md:px-6 md:py-6">
                    <span className="tnum mt-0.5 font-mono text-[13px] font-bold text-brand-700">
                      {n}
                    </span>
                    <span>
                      <span className="block text-[16px] font-extrabold tracking-tight text-ink">
                        {tt}
                      </span>
                      <span className="mt-1 block max-w-[44ch] text-[13px] leading-relaxed text-soft">
                        {d}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
              <div className="border-t border-line bg-paper px-5 py-2 md:px-6">
                <a href="#cara-kerja" className="link-more inline-flex min-h-[44px] items-center">
                  {t("methodLink")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ROLE TICKER (kinetic band, constructive motion) ─── */}
      <div className="overflow-hidden border-y border-line bg-card py-4" role="presentation">
        <div className="marquee-track items-center font-mono text-[12px] font-bold uppercase tracking-[0.18em] text-soft">
          {[0, 1].map((dup) => (
            <div key={dup} aria-hidden={dup === 1} className="flex flex-none items-center gap-8 pr-8">
              {["Digital Marketing Specialist", "Data Analyst", "UI/UX Designer", "Junior Accountant", "Software Engineer", "Cybersecurity Analyst"].map((r) => (
                <span key={r} className="flex flex-none items-center gap-8">
                  {r}
                  <span aria-hidden className="text-[10px] text-brand-700">◆</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── THE PROBLEM ──────────────────────────────────── */}
      <section
        id="masalah"
        className="mx-auto max-w-7xl scroll-mt-32 px-4 py-20 md:py-32"
      >
        <Reveal>
          <div aria-hidden className="mb-7 h-1 w-12 bg-brand-700" />
          <h2 className="font-nova max-w-[22ch] text-4xl font-bold leading-[1.04] tracking-[-0.02em] md:text-5xl">
            {t("probTitle")}
          </h2>
          <p className="mt-5 max-w-[58ch] text-base leading-relaxed text-soft md:text-lg">
            {t("probSub")}
          </p>
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <div className="panel h-full p-8 md:p-10">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                {t("probLeftLabel")}
              </p>
              <p className="mt-4 text-[1.75rem] font-extrabold leading-[1.08] tracking-tight md:text-4xl">
                {t("probQuote")}
              </p>
              <p className="mt-4 font-mono text-[11px] leading-relaxed text-muted">
                {t("probLeftCap")}
              </p>
            </div>
          </Reveal>
          <Reveal delay={80} className="md:col-span-5">
            <div className="panel h-full p-8 md:p-10">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                {t("probRightLabel")}
              </p>
              <ul className="mt-5 grid grid-cols-2 gap-2">
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
          <figure className="photo-cine mt-6 aspect-[21/9]">
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
        className="mx-auto max-w-7xl scroll-mt-32 px-4 pb-12 pt-20 md:pb-16 md:pt-32"
      >
        <Reveal>
          <div aria-hidden className="mb-7 h-1 w-12 bg-brand-700" />
          <h2 className="font-nova max-w-[22ch] text-4xl font-bold leading-[1.04] tracking-[-0.02em] md:text-5xl">
            {t("jobsTitle")}
          </h2>
          <p className="mt-5 max-w-[58ch] text-base leading-relaxed text-soft md:text-lg">
            {t("jobsSub")}
          </p>
        </Reveal>
        <dl className="mt-10 grid gap-8 sm:grid-cols-3">
          {DEMAND_STATS.map(([v, l]) => (
            <Reveal
              key={l}
              className="border-t-2 border-brand-700 pt-5"
            >
              <dt className="tnum font-nova text-4xl font-bold tracking-[-0.02em] text-ink md:text-5xl">
                {v}
              </dt>
              <dd className="mt-2 max-w-[28ch] text-[13px] leading-snug text-muted">{l}</dd>
            </Reveal>
          ))}
        </dl>
      </section>

      {/* ── 02 · FEATURED EXAMPLE (full-bleed band) ─────────── */}
      <section
        id="contoh-event"
        className="scroll-mt-32 border-y border-line bg-card"
      >
        <div className="mx-auto max-w-7xl px-4 py-14 md:py-20">
        {/* Contoh 1 dari 4 — the single playable spotlight */}
        <Reveal>
          <div className="overflow-hidden rounded-card border-2 border-ink bg-paper">
            <div className="grid gap-4 px-6 py-6 md:grid-cols-12 md:items-center md:gap-6 md:px-10 md:py-8">
              <div className="md:col-span-5">
                <p className="inline-block rounded-full bg-signal/15 px-3 py-1 font-mono text-[11px] font-bold text-signal-strong">
                  {t("eventBadge")}
                </p>
                <p className="font-nova mt-3 text-2xl font-bold leading-tight tracking-[-0.02em] md:text-3xl">
                  Event &amp; Brand Activation Supervisor
                </p>
                <p className="mt-2 max-w-[40ch] text-[15px] leading-relaxed text-soft">
                  {t("eventMission")}
                </p>
              </div>
              <ul
                className="flex flex-wrap content-center gap-1.5 md:col-span-3"
                aria-label={t("eventCapsLabel")}
              >
                {["Campaign Planning", "Vendor Management", "Crisis Management"].map((c) => (
                  <li key={c} className="chip !text-[12px]">
                    {c}
                  </li>
                ))}
              </ul>
              <div className="md:col-span-4 md:text-right">
                <p className="max-w-[36ch] font-mono text-[11px] leading-relaxed text-muted md:ml-auto">
                  {t("eventSignal")}
                </p>
                <a href="/id/auth/daftar" className="btn-primary mt-4 min-h-[52px] md:mt-5">
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
        className="mx-auto max-w-7xl scroll-mt-32 px-4 pb-20 pt-14 md:pb-32 md:pt-20"
      >
        {/* Wave-1 rows — list, not twin cards */}
        <Reveal>
          <div className="overflow-hidden rounded-card border border-line bg-card">
            <p className="border-b border-line bg-paper px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted md:px-10">
              {t("waveBand")}
            </p>
            <ul className="divide-y divide-line">
              {WAVE1.map((row, i) => (
                <li
                  key={row.name}
                  className="grid gap-4 px-6 py-7 md:grid-cols-12 md:items-center md:gap-6 md:px-10"
                >
                  <div className="md:col-span-4">
                    <p aria-hidden className="tnum font-mono text-[12px] font-bold tracking-[0.14em] text-muted">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-1.5 text-lg font-extrabold tracking-tight md:text-xl">
                      {row.name}
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-soft">
                      {row.mission}
                    </p>
                  </div>
                  <ul
                    className="flex flex-wrap content-center gap-1.5 md:col-span-4"
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
                    <p className="tnum mt-1 font-mono text-[12px] font-bold text-brand-700">
                      {row.salary}
                    </p>
                    <a
                      href="/id/auth/daftar"
                      className="link-more mt-2 inline-flex min-h-[44px] items-center"
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
          <div className="mt-5 flex flex-col gap-2 rounded-card border border-dashed border-line bg-paper px-6 py-5 sm:flex-row sm:items-center sm:justify-between md:px-10">
            <p className="text-sm text-soft">
              <strong className="text-ink">{t("soon")}</strong>{" "}
              {WAVE2.join(" · ")}
            </p>
            <a href="/id/auth/daftar" className="link-more inline-flex min-h-[44px] flex-none items-center">
              {t("earlyCta")}
            </a>
          </div>
          <p className="mt-4 font-mono text-[11px] leading-relaxed text-muted">
            {t("sources")}
          </p>
        </Reveal>
        <Reveal delay={120}>
          <figure className="photo-cine mt-6 aspect-[21/9]">
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
        className="mx-auto max-w-7xl scroll-mt-32 px-4 py-20 md:py-32"
      >
        <Reveal>
          <div aria-hidden className="mb-7 h-1 w-12 bg-brand-700" />
          <h2 className="font-nova max-w-[22ch] text-4xl font-bold leading-[1.04] tracking-[-0.02em] md:text-5xl">
            {t("stepsTitle")}
          </h2>
        </Reveal>
        <ol className="mt-12 grid gap-x-6 gap-y-9 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map(([st, d], i) => (
            <Reveal key={st} delay={i * 60}>
              <li>
                <p aria-hidden className="tnum text-4xl font-extrabold tracking-tight text-brand-700/15 md:text-5xl">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="mt-3 text-[15px] font-extrabold leading-snug tracking-tight text-ink">
                  {st}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-soft">{d}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* ── 08 · FINAL CTA ───────────────────────────────────── */}
      <section id="siap" className="scroll-mt-32">
        <div className="mx-auto max-w-7xl px-4 py-20 md:py-32">
          <Reveal>
            <div className="relative overflow-hidden rounded-card bg-brand-700 px-6 py-12 md:p-16">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-2xl"
              />
              <div aria-hidden className="mb-7 h-1 w-12 bg-white/60" />
              <h2 className="font-nova relative max-w-[22ch] text-4xl font-bold leading-[1.04] tracking-[-0.02em] text-white md:text-5xl">
                {t("ctaTitle")}
              </h2>
              <p className="relative mt-5 max-w-[58ch] text-base leading-relaxed text-white/90 md:text-lg">
                {t("ctaSub")}
              </p>
              <div className="relative mt-8 flex flex-wrap items-center gap-4">
                <a href="#pekerjaan" className="inline-flex min-h-[52px] items-center gap-2.5 rounded-btn bg-white px-7 text-[15px] font-extrabold text-brand-700 transition hover:bg-paper active:translate-y-[1px]">
                  {t("cta1")}
                  <span className="btn-island btn-island-dark" aria-hidden>
                    ↗
                  </span>
                </a>
                <a href="/id/auth/daftar" className="inline-flex min-h-[52px] items-center rounded-btn border-[1.5px] border-white/50 px-7 text-[15px] font-bold text-white transition hover:bg-white/10 active:translate-y-[1px]">
                  {t("cta2")}
                </a>
              </div>
              <p className="relative mt-5 font-mono text-[11px] leading-relaxed text-white/85">
                {t("ctaNote")}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
