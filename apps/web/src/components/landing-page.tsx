import { createTranslator } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getLocaleMessages } from "@/i18n/messages";
import { Reveal } from "@/components/reveal";
import { SiteFooter, SiteNav } from "@/components/site-chrome";
import { LOCAL } from "@/lib/visual";

/*
 * Career SuperBright landing — the anti-slop pass.
 *
 * Design read: concise consumer landing for Indonesian students /
 * fresh grads. Light-OS cobalt on paper, one idea per viewport, hairline
 * structure instead of stacked cards. Dials: VARIANCE 8 / MOTION 6 /
 * DENSITY 4.
 *
 * Rules this layout holds itself to (and why):
 * - One primary CTA in the hero. The "how it works" route lives on the
 *   method panel instead of a second button competing beside it.
 * - No 3-equal-column feature rows and no 5-up step grid. The demand proof
 *   is a 7/5 bento with one dominant figure; the five steps are a ledger
 *   with a number rail — both read as editorial, not as a template.
 * - Section headers change shape (rule-rail · right-aligned · numbered)
 *   so four consecutive bands don't repeat one header template.
 * - Nothing overlaps. The hero photo is a block in its own inline box —
 *   type-height punctuation above 640px, its own band below it.
 * - Every role name and capability chip is localized. Hardcoded English
 *   job titles were leaking onto the Indonesian page.
 * - Numbers stay real and attributed: Kemnaker 2025, Jobstreet 2026,
 *   SNBT 2026, NACE Winter 2026. No round-number inflation.
 *
 * No usecase / real-case content on this page: generic method preview,
 * role rows, and honesty badges only. Per-role depth lives in
 * lib/tracks.ts + track-picker/track-panels/scenario-demo (dormant,
 * reserved for future /roles/* pages). No fake testimonials anywhere.
 * Anchors: #konten #masalah #pekerjaan #semua-peran #cara-kerja #siap.
 * Shape lock v2: buttons 14px · cards 24px · media 20px · inputs 12px.
 * Copy comes from the landing dictionary namespace.
 */

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
  const HERO_FACTS: [string, string][] = [
    [t("heroFact1k"), t("heroFact1v")],
    [t("heroFact2k"), t("heroFact2v")],
    [t("heroFact3k"), t("heroFact3v")],
  ];
  const WAVE1 = [
    { name: t("roleDm"), mission: t("w1dmM"), caps: [t("capsDm1"), t("capsDm2"), t("capsDm3")], signal: t("w1dmS"), salary: t("w1dmPay") },
    { name: t("roleDa"), mission: t("w1daM"), caps: [t("capsDa1"), t("capsDa2"), t("capsDa3")], signal: t("w1daS"), salary: t("w1daPay") },
    { name: t("roleUx"), mission: t("w1uxM"), caps: [t("capsUx1"), t("capsUx2"), t("capsUx3")], signal: t("w1uxS"), salary: t("w1uxPay") },
  ];
  const WAVE2 = [t("roleJa"), t("roleSe"), t("roleCa")];
  const TICKER = [t("roleDm"), t("roleDa"), t("roleUx"), ...WAVE2];
  /* PRD 3-step value prop (Discover → Simulate → Decide). The old 5-step
     "siap kerja" ladder described the retired course model, not discovery. */
  const STEPS: [string, string, string][] = [
    ["01", t("value1t"), t("value1d")],
    ["02", t("value2t"), t("value2d")],
    ["03", t("value3t"), t("value3d")],
  ];
  return (
    <main id="konten" tabIndex={-1} className="overflow-x-clip bg-paper text-ink">
      <a href="#konten" className="skip-link">
        {t("skip")}
      </a>
      <SiteNav />

      {/* ── HERO · THE JOB ─────────────────────────────────── */}
      <section className="hero-light relative overflow-hidden pt-[120px] md:pt-[144px]">
        <div
          className="relative mx-auto grid w-full max-w-7xl items-start gap-10 px-4 pb-16 pt-8 md:pb-20 lg:grid-cols-12 lg:gap-8"
        >
          <div className="lg:col-span-5">
            <p className="hero-enter hero-enter-1 eyebrow-light flex items-center gap-3">
              <span aria-hidden className="inline-block h-[2px] w-8 flex-none bg-brand-700" />
              {t("heroEyebrow")}
            </p>

            {/* Inline image typography: the photo is a block box in its own
                inline-level slot — type-height punctuation above `sm`, its
                own full-width band below it. It never overlaps the type.
                alt="" on purpose: the heading's meaning is carried entirely
                by the two text segments, and a sentence of alt text inside an
                h1 would poison screen-reader heading navigation. */}
            <h1 className="hero-enter hero-enter-2 font-nova mt-6 text-[clamp(2.25rem,5vw,4rem)] font-bold leading-[1.04] tracking-[-0.02em] md:max-w-[26ch]">
              {t("heroTitleA")}{" "}
              <span className="mx-auto my-5 block aspect-[16/9] w-full overflow-hidden rounded-media align-middle sm:mx-[0.16em] sm:my-0 sm:inline-flex sm:h-[0.92em] sm:w-[1.42em] sm:aspect-auto">
                <img
                  src={LOCAL.timKopi}
                  alt=""
                  width={640}
                  height={360}
                  fetchPriority="high"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </span>{" "}
              {t("heroTitleB")}
            </h1>

            <p className="hero-enter hero-enter-3 mt-6 max-w-[46ch] text-base leading-relaxed text-soft md:text-lg">
              {t("heroSub")}
            </p>

            {/* One primary action. Everything else on this page is a link
                into the content below, not a competing button. */}
            <div className="hero-enter hero-enter-3 mt-8">
              <a href="#pekerjaan" className="btn-amber group min-h-[52px] px-7 text-[15px]">
                {t("heroCta1")}
                <span className="btn-island btn-island-dark" aria-hidden>
                  <svg viewBox="0 0 12 12" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9 9 3M4 3h5v5" /></svg>
                </span>
              </a>
            </div>

            {/* In-hero search (PRD §4.1): plain GET form so it works without
                JS; the catalog reads ?q= as its initial query. */}
            <form
              action={locale === "id" ? "/roles" : `/${locale}/roles`}
              method="get"
              className="hero-enter hero-enter-4 mt-6"
              role="search"
            >
              <label htmlFor="hero-cari" className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-700">
                {t("heroSearchLabel")}
              </label>
              <div className="relative mt-2.5 flex gap-2">
                <div className="relative min-w-0 flex-1">
                  <svg aria-hidden viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-faint"><circle cx="7" cy="7" r="5" /><path d="m11 11 3 3" /></svg>
                  <input
                    id="hero-cari"
                    name="q"
                    type="search"
                    placeholder={t("heroSearchPh")}
                    className="field !pl-11 !py-3.5 !text-[15px]"
                    autoComplete="off"
                  />
                </div>
                <button type="submit" className="btn-primary min-h-[52px] flex-none px-6 text-sm">
                  {t("heroSearchCta")}
                </button>
              </div>
            </form>

            {/* Role categories (PRD §4.1): four plain links into the directory. */}
            <ul className="hero-enter hero-enter-4 mt-5 flex flex-wrap gap-2">
              {[
                [t("heroCatTech"), "Tech & Product"],
                [t("heroCatCreative"), "Creative & Marketing"],
                [t("heroCatBiz"), "Business & Operations"],
                [t("heroCatFinance"), "Finance & Banking"],
              ].map(([label, cat]) => (
                <li key={label}>
                  <Link href={`/roles?q=${encodeURIComponent(cat)}`} className="chip min-h-[44px] transition hover:border-ink">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Proof strip: what is actually inside, honestly scoped.
                Hairline-ruled instead of three chip-cards. */}
            <dl className="hero-enter hero-enter-4 mt-9 grid grid-cols-3 gap-x-4 gap-y-5 border-t border-line pt-6">
              {HERO_FACTS.map(([k, v]) => (
                <div key={k}>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                    {k}
                  </dt>
                  <dd className="mt-1.5 text-[13px] font-bold leading-snug text-ink">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Hero visual — generic method preview, no real case */}
          <div className="hero-enter hero-enter-4 relative lg:col-span-6 lg:col-start-7 lg:mt-10">
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
              {/* Cascade, not a simultaneous mount: each row arrives on its
                  own beat so the list reads as a sequence of decisions. */}
              <ol className="divide-y divide-line">
                {[
                  ["01", t("m1t"), t("m1d")],
                  ["02", t("m2t"), t("m2d")],
                  ["03", t("m3t"), t("m3d")],
                ].map(([n, tt, d], i) => (
                  <li
                    key={n}
                    className="hero-enter flex gap-5 px-5 py-5 md:px-6 md:py-6"
                    style={{ animationDelay: `${340 + i * 90}ms` }}
                  >
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
      <div className="marquee-band overflow-hidden border-y border-line bg-card py-4" role="presentation">
        <div className="marquee-track items-center font-mono text-[12px] font-bold uppercase tracking-[0.18em] text-soft">
          {[0, 1].map((dup) => (
            <div key={dup} aria-hidden={dup === 1} className="flex flex-none items-center gap-8 pr-8">
              {TICKER.map((r) => (
                <span key={r} className="flex flex-none items-center gap-8">
                  {r}
                  <svg aria-hidden width="8" height="8" viewBox="0 0 8 8" className="flex-none text-brand-700"><rect x="1.6" y="1.6" width="4.8" height="4.8" transform="rotate(45 4 4)" fill="currentColor" /></svg>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── THE PROBLEM ────────────────────────────────────
          Header treatment 1/3: cobalt rule-rail in the margin, title and
          standfirst offset into a 7/5 split. */}
      <section
        id="masalah"
        className="mx-auto max-w-7xl scroll-mt-32 px-4 py-20 md:py-32"
      >
        <Reveal>
          <div className="grid gap-6 md:grid-cols-12 md:gap-8">
            <div className="rule-rail md:col-span-7">
              <h2 className="font-nova max-w-[20ch] text-4xl font-bold leading-[1.04] tracking-[-0.02em] md:text-5xl">
                {t("probTitle")}
              </h2>
            </div>
            <p className="max-w-[46ch] self-end text-[15px] leading-relaxed text-soft md:col-span-5 md:text-base">
              {t("probSub")}
            </p>
          </div>
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

      {/* ── DEMAND PROOF ───────────────────────────────────
          Header treatment 2/3: numbered mono index sitting on the title's
          baseline, title right-aligned against the standfirst. */}
      <section
        id="pekerjaan"
        className="mx-auto max-w-7xl scroll-mt-32 px-4 pb-12 pt-20 md:pb-16 md:pt-32"
      >
        <Reveal>
          <div className="border-t border-line pt-8">
            <div className="grid gap-6 md:grid-cols-12 md:items-end md:gap-8">
              <div className="md:col-span-5">
                <p aria-hidden className="tnum font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-brand-700">
                  01
                </p>
                <p className="mt-4 max-w-[42ch] text-[15px] leading-relaxed text-soft">
                  {t("jobsSub")}
                </p>
              </div>
              <h2 className="font-nova max-w-[22ch] text-[32px] font-bold leading-[1.06] tracking-[-0.02em] md:col-span-7 md:text-right md:text-[40px]">
                {t("jobsTitle")}
              </h2>
            </div>
          </div>
        </Reveal>

        {/* Bento, not three equal columns: one dominant figure on a heavy
            cobalt rule, two supporting figures on hairlines. */}
        <dl className="mt-12 grid gap-x-8 gap-y-10 md:grid-cols-12">
          {DEMAND_STATS.map(([v, l], i) => (
            <Reveal
              key={l}
              delay={i * 90}
              className={
                i === 0
                  ? "border-t-2 border-brand-700 pt-6 md:col-span-7 md:row-span-2"
                  : "border-t border-line pt-6 md:col-span-5"
              }
            >
              <dt
                className={`tnum font-nova font-bold tracking-[-0.03em] text-ink ${
                  i === 0
                    ? "text-[clamp(3rem,7vw,5.5rem)] leading-[0.94]"
                    : "text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.05]"
                }`}
              >
                {v}
              </dt>
              <dd
                className={`mt-3 leading-snug text-muted ${
                  i === 0 ? "max-w-[38ch] text-[14px]" : "max-w-[30ch] text-[13px]"
                }`}
              >
                {l}
              </dd>
            </Reveal>
          ))}
        </dl>
      </section>

      {/* ── FEATURED EXAMPLE (full-bleed band) ───────────────
          The band IS the surface — the old build framed a bordered card
          inside a bordered band, which is nesting for decoration. */}
      <section
        id="contoh-event"
        className="scroll-mt-32 border-y border-line bg-card"
      >
        <div className="mx-auto max-w-7xl px-4 py-14 md:py-20">
          {/* Contoh 1 dari 4 — the single playable spotlight */}
          <Reveal>
            <div className="grid gap-6 md:grid-cols-12 md:items-center md:gap-8">
              <div className="md:col-span-5">
                <p className="inline-block rounded-full bg-signal/15 px-3 py-1 font-mono text-[11px] font-bold text-signal-strong">
                  {t("eventBadge")}
                </p>
                <h3 className="font-nova mt-4 text-2xl font-bold leading-tight tracking-[-0.02em] md:text-3xl">
                  {t("roleEvent")}
                </h3>
                <p className="mt-3 max-w-[40ch] text-[15px] leading-relaxed text-soft">
                  {t("eventMission")}
                </p>
              </div>
              <ul
                className="flex flex-wrap content-center gap-1.5 md:col-span-3"
                aria-label={t("eventCapsLabel")}
              >
                {[t("capsEv1"), t("capsEv2"), t("capsEv3")].map((c) => (
                  <li key={c} className="chip !text-[12px]">
                    {c}
                  </li>
                ))}
              </ul>
              <div className="border-t border-line pt-5 md:col-span-4 md:border-0 md:pt-0 md:text-right">
                <p className="max-w-[36ch] font-mono text-[11px] leading-relaxed text-muted md:ml-auto">
                  {t("eventSignal")}
                </p>
                <Link href="/auth/daftar" className="btn-primary mt-4 min-h-[52px] md:mt-5">
                  {t("eventCta")}
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── ROLE INDEX ───────────────────────────────────────
          Rows, not cards: a ledger of three intro roles under one band
          label, each name a real h3. */}
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
                    <h3 className="mt-1.5 text-lg font-extrabold tracking-tight md:text-xl">
                      {row.name}
                    </h3>
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
                    <Link
                      href="/auth/daftar"
                      className="link-more mt-2 inline-flex min-h-[44px] items-center"
                    >
                      {t("earlyCta")}
                    </Link>
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
            <Link href="/auth/daftar" className="link-more inline-flex min-h-[44px] flex-none items-center">
              {t("earlyCta")}
            </Link>
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

      {/* ── HOW IT WORKS (PRD 3-step value prop) ────────────────
          Header treatment 3/3: index and title on one baseline. The ledger
          below carries the three steps; each title is a real h3 so the page
          keeps a heading outline instead of bold <p>s. */}
      <section
        id="cara-kerja"
        className="mx-auto max-w-7xl scroll-mt-32 px-4 py-20 md:py-32"
      >
        <Reveal>
          <div className="border-t border-line pt-8">
            <div className="grid gap-5 md:grid-cols-12 md:items-baseline md:gap-8">
              <h2 className="font-nova max-w-[20ch] text-[32px] font-bold leading-[1.06] tracking-[-0.02em] md:col-span-7 md:text-[40px]">
                <span aria-hidden className="tnum mr-4 align-super font-mono text-[13px] font-bold tracking-[0.2em] text-brand-700">
                  02
                </span>
                {t("valueEyebrow")}
              </h2>
            </div>
          </div>
        </Reveal>

        <ol className="mt-12 border-b border-line">
          {STEPS.map(([n, st, d], i) => (
            <Reveal
              as="li"
              key={n}
              delay={i * 60}
              className="group grid gap-x-8 gap-y-2 border-t border-line py-7 transition-colors duration-300 hover:bg-brand-50/60 md:grid-cols-12 md:items-baseline md:px-2"
            >
              <p className="tnum font-mono text-[13px] font-bold tracking-[0.12em] text-brand-700 md:col-span-2">
                {n}
              </p>
              <h3 className="text-[17px] font-extrabold leading-snug tracking-tight text-ink md:col-span-4 md:text-[19px]">
                {st}
              </h3>
              <p className="max-w-[52ch] text-[15px] leading-relaxed text-soft md:col-span-6">
                {d}
              </p>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────── */}
      <section id="siap" className="scroll-mt-32">
        <div className="mx-auto max-w-7xl px-4 py-20 md:py-32">
          <Reveal>
            <div className="relative overflow-hidden rounded-card bg-brand-700 px-6 py-12 md:p-16">
              {/* Ruled hairlines instead of a blurred glow orb: structure
                  reads as craft, blur reads as filler. */}
              <div aria-hidden className="grid-ink pointer-events-none absolute inset-0" />
              <p aria-hidden className="relative font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-white/70">
                03
              </p>
              <h2 className="font-nova relative mt-5 max-w-[22ch] text-[32px] font-bold leading-[1.06] tracking-[-0.02em] text-white md:text-[40px]">
                {t("ctaTitle")}
              </h2>
              <p className="relative mt-5 max-w-[52ch] text-[15px] leading-relaxed text-white/90">
                {t("ctaSub")}
              </p>
              <div className="relative mt-8 flex flex-wrap items-center gap-4">
                <a href="#pekerjaan" className="inline-flex min-h-[52px] items-center gap-2.5 rounded-btn bg-white px-7 text-[15px] font-extrabold text-brand-700 transition hover:bg-paper active:translate-y-[1px]">
                  {t("cta1")}
                  <span className="btn-island btn-island-dark" aria-hidden>
                    <svg viewBox="0 0 12 12" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9 9 3M4 3h5v5" /></svg>
                  </span>
                </a>
                <Link href="/auth/daftar" className="inline-flex min-h-[52px] items-center rounded-btn border-[1.5px] border-white/50 px-7 text-[15px] font-bold text-white transition hover:bg-white/10 active:translate-y-[1px]">
                  {t("cta2")}
                </Link>
              </div>
              <p className="relative mt-5 max-w-[56ch] font-mono text-[11px] leading-relaxed text-white/85">
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
