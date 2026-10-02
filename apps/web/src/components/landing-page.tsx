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
    <main className="overflow-x-clip bg-parchment text-espresso">
      <a href="#konten" className="skip-link">
        {t("skip")}
      </a>
      <SiteNav />

      {/* ── HERO · THE JOB ─────────────────────────────────── */}
      <section className="nova-hero relative overflow-hidden pt-[120px] md:pt-[144px]">
        <div className="grid-light absolute inset-0" aria-hidden />
        <div
          id="konten"
          className="relative mx-auto grid w-full max-w-7xl scroll-mt-32 items-center gap-14 px-4 pb-20 pt-8 md:pb-28 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16"
        >
          <div>
            <p className="hero-enter hero-enter-1 eyebrow-nova flex items-center gap-3">
              <span aria-hidden className="inline-block h-[2px] w-8 flex-none bg-ember" />
              {t("heroEyebrow")}
            </p>
            <h1 className="hero-enter hero-enter-2 font-nova mt-6 max-w-[16ch] text-[clamp(3rem,9vw,6rem)] font-bold leading-[0.95] tracking-[-0.02em]">
              {t("heroTitle")}
            </h1>
            <p className="hero-enter hero-enter-3 mt-6 max-w-[46ch] text-base leading-relaxed text-bark md:text-lg">
              {t("heroSub")}
            </p>
            <div className="hero-enter hero-enter-3 mt-8 flex flex-wrap items-center gap-4">
              <a href="#pekerjaan" className="btn-ember group min-h-[52px] px-7 text-[15px]">
                {t("heroCta1")}
                <span className="btn-island btn-island-dark" aria-hidden>
                  ↗
                </span>
              </a>
              <a href="#cara-kerja" className="btn-ember-ghost min-h-[52px] px-7">
                {t("heroCta2")}
              </a>
            </div>
            <p className="hero-enter hero-enter-4 mt-8 max-w-[52ch] border-t border-dune pt-5 font-mono text-[11px] leading-relaxed text-sand">
              {t("heroFlavor")}
            </p>
          </div>

          {/* Hero visual — generic method preview, no real case */}
          <div className="hero-enter hero-enter-4 relative">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-3 rounded-card border border-ember/15"
            />
            <div className="glass-light relative overflow-hidden">
              <div className="flex items-center gap-2.5 border-b border-dune bg-card px-5 py-4 md:px-6">
                <span className="live-dot" aria-hidden />
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-espresso">
                  {t("methodLabel")}
                </span>
                <span aria-hidden className="ml-auto flex gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-dune" />
                  <span className="h-2 w-2 rounded-full bg-dune" />
                  <span className="h-2 w-2 rounded-full bg-ember-bright" />
                </span>
              </div>
              <ol className="divide-y divide-dune">
                {[
                  ["01", t("m1t"), t("m1d")],
                  ["02", t("m2t"), t("m2d")],
                  ["03", t("m3t"), t("m3d")],
                ].map(([n, tt, d]) => (
                  <li key={n} className="flex gap-5 px-5 py-5 md:px-6 md:py-6">
                    <span className="tnum mt-0.5 font-mono text-[13px] font-bold text-ember">
                      {n}
                    </span>
                    <span>
                      <span className="block text-[16px] font-extrabold tracking-tight text-espresso">
                        {tt}
                      </span>
                      <span className="mt-1 block max-w-[44ch] text-[13px] leading-relaxed text-bark">
                        {d}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
              <div className="border-t border-dune bg-parchment px-5 py-2 md:px-6">
                <a href="#cara-kerja" className="link-more inline-flex min-h-[44px] items-center">
                  {t("methodLink")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ROLE TICKER (kinetic band, constructive motion) ─── */}
      <div className="overflow-hidden border-y border-dune bg-card py-4" role="presentation">
        <div className="marquee-track items-center font-mono text-[12px] font-bold uppercase tracking-[0.18em] text-bark">
          {[0, 1].map((dup) => (
            <div key={dup} aria-hidden={dup === 1} className="flex flex-none items-center gap-8 pr-8">
              {["Digital Marketing Specialist", "Data Analyst", "UI/UX Designer", "Junior Accountant", "Software Engineer", "Cybersecurity Analyst"].map((r) => (
                <span key={r} className="flex flex-none items-center gap-8">
                  {r}
                  <span aria-hidden className="text-[10px] text-ember">◆</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── THE PROBLEM ──────────────────────────────────── */}
      <section
        id="masalah"
        className="mx-auto max-w-7xl scroll-mt-28 px-4 py-20 md:py-32"
      >
        <Reveal>
          <div aria-hidden className="mb-7 h-1 w-12 bg-ember" />
          <h2 className="font-nova max-w-[20ch] text-[2.5rem] font-bold leading-[1.02] tracking-[-0.02em] md:text-6xl">
            {t("probTitle")}
          </h2>
          <p className="mt-5 max-w-[58ch] text-base leading-relaxed text-bark md:text-lg">
            {t("probSub")}
          </p>
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <Reveal>
            <div className="panel h-full p-8 md:p-10">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-sand">
                {t("probLeftLabel")}
              </p>
              <p className="mt-4 text-[1.75rem] font-extrabold leading-[1.08] tracking-tight md:text-4xl">
                {t("probQuote")}
              </p>
              <p className="mt-4 font-mono text-[11px] leading-relaxed text-sand">
                {t("probLeftCap")}
              </p>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="panel h-full p-8 md:p-10">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-sand">
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
          <div aria-hidden className="mb-7 h-1 w-12 bg-ember" />
          <h2 className="font-nova max-w-[20ch] text-[2.5rem] font-bold leading-[1.02] tracking-[-0.02em] md:text-6xl">
            {t("jobsTitle")}
          </h2>
          <p className="mt-5 max-w-[58ch] text-base leading-relaxed text-bark md:text-lg">
            {t("jobsSub")}
          </p>
        </Reveal>
        <dl className="mt-10 grid gap-8 border-y border-dune py-8 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-dune md:py-10">
          {DEMAND_STATS.map(([v, l]) => (
            <Reveal
              key={l}
              className="sm:px-8 sm:first:pl-0 sm:last:pr-0"
            >
              <dt className="tnum font-nova text-4xl font-bold tracking-[-0.02em] text-espresso md:text-5xl">
                {v}
              </dt>
              <dd className="mt-2 max-w-[28ch] text-[13px] leading-snug text-sand">{l}</dd>
            </Reveal>
          ))}
        </dl>
      </section>

      {/* ── 02 · FEATURED EXAMPLE (full-bleed band) ─────────── */}
      <section
        id="contoh-event"
        className="scroll-mt-28 border-y border-dune bg-card"
      >
        <div className="mx-auto max-w-7xl px-4 py-14 md:py-20">
        {/* Contoh 1 dari 4 — the single playable spotlight */}
        <Reveal>
          <div className="overflow-hidden rounded-card border-2 border-ink bg-parchment">
            <div className="grid gap-4 px-6 py-6 md:grid-cols-12 md:items-center md:gap-6 md:px-10 md:py-8">
              <div className="md:col-span-4">
                <p className="inline-block rounded-full bg-signal/15 px-3 py-1 font-mono text-[11px] font-bold text-signal-strong">
                  {t("eventBadge")}
                </p>
                <p className="font-nova mt-3 text-2xl font-bold leading-tight tracking-[-0.02em] md:text-[1.75rem]">
                  Event &amp; Brand Activation Supervisor
                </p>
                <p className="mt-2 max-w-[40ch] text-[15px] leading-relaxed text-bark">
                  {t("eventMission")}
                </p>
              </div>
              <ul
                className="flex flex-wrap content-center gap-1.5 md:col-span-4"
                aria-label={t("eventCapsLabel")}
              >
                {["Campaign Planning", "Vendor Management", "Crisis Management"].map((c) => (
                  <li key={c} className="chip !text-[12px]">
                    {c}
                  </li>
                ))}
              </ul>
              <div className="md:col-span-4 md:text-right">
                <p className="max-w-[36ch] font-mono text-[11px] leading-relaxed text-sand md:ml-auto">
                  {t("eventSignal")}
                </p>
                <a href="/id/auth/daftar" className="btn-ember mt-4 min-h-[52px] md:mt-5">
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
        className="mx-auto max-w-7xl scroll-mt-28 px-4 pb-20 pt-14 md:pb-32 md:pt-20"
      >
        {/* Wave-1 rows — list, not twin cards */}
        <Reveal>
          <div className="overflow-hidden rounded-card border border-dune bg-card">
            <p className="border-b border-dune bg-parchment px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.18em] text-sand md:px-10">
              {t("waveBand")}
            </p>
            <ul className="divide-y divide-dune">
              {WAVE1.map((row, i) => (
                <li
                  key={row.name}
                  className="grid gap-4 px-6 py-7 md:grid-cols-12 md:items-center md:gap-6 md:px-10"
                >
                  <div className="md:col-span-4">
                    <p aria-hidden className="tnum font-mono text-[12px] font-bold tracking-[0.14em] text-sand">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-1.5 text-lg font-extrabold tracking-tight md:text-xl">
                      {row.name}
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-bark">
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
                    <p className="font-mono text-[11px] leading-relaxed text-sand">
                      {row.signal}
                    </p>
                    <p className="tnum mt-1 font-mono text-[12px] font-bold text-forest">
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
          <div className="mt-5 flex flex-col gap-2 rounded-card border border-dashed border-dune bg-parchment px-6 py-5 sm:flex-row sm:items-center sm:justify-between md:px-10">
            <p className="text-sm text-bark">
              <strong className="text-espresso">{t("soon")}</strong>{" "}
              {WAVE2.join(" · ")}
            </p>
            <a href="/id/auth/daftar" className="link-more inline-flex min-h-[44px] flex-none items-center">
              {t("earlyCta")}
            </a>
          </div>
          <p className="mt-4 font-mono text-[11px] leading-relaxed text-sand">
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
        className="mx-auto max-w-7xl scroll-mt-28 px-4 py-20 md:py-32"
      >
        <Reveal>
          <div aria-hidden className="mb-7 h-1 w-12 bg-ember" />
          <h2 className="font-nova max-w-[20ch] text-[2.5rem] font-bold leading-[1.02] tracking-[-0.02em] md:text-6xl">
            {t("stepsTitle")}
          </h2>
        </Reveal>
        <ol className="mt-12 grid gap-x-6 gap-y-9 border-t border-dune pt-8 sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map(([st, d], i) => (
            <Reveal key={st} delay={i * 60}>
              <li>
                <p aria-hidden className="tnum text-4xl font-extrabold tracking-tight text-ember/15 md:text-5xl">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="mt-3 text-[15px] font-extrabold leading-snug tracking-tight text-espresso">
                  {st}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-bark">{d}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* ── 08 · FINAL CTA ───────────────────────────────────── */}
      <section id="siap" className="scroll-mt-28 border-t border-dune bg-card">
        <div className="mx-auto max-w-7xl px-4 py-20 md:py-32">
          <Reveal>
            <div aria-hidden className="mb-7 h-1 w-12 bg-ember" />
            <h2 className="font-nova max-w-[20ch] text-[2.5rem] font-bold leading-[1.02] tracking-[-0.02em] md:text-6xl">
              {t("ctaTitle")}
            </h2>
            <p className="mt-5 max-w-[58ch] text-base leading-relaxed text-bark md:text-lg">
              {t("ctaSub")}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href="#pekerjaan" className="btn-ember group min-h-[52px] px-7 text-[15px]">
                {t("cta1")}
                <span className="btn-island btn-island-dark" aria-hidden>
                  ↗
                </span>
              </a>
              <a href="/id/auth/daftar" className="btn-ember-ghost min-h-[52px] px-7">
                {t("cta2")}
              </a>
            </div>
            <p className="mt-5 font-mono text-[11px] leading-relaxed text-sand">
              {t("ctaNote")}
            </p>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
