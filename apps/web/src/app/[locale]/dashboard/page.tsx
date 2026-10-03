// Student dashboard — real session and real numbers.
//
// Previously every figure here was hardcoded mock ("62%", "7 / 14 badges"),
// so signing in landed you on a page that ignored who you were. It now reads
// the signed-in learner and reports what is actually true, including zeroes.
//
// Layout follows DESIGN.md: a 7/5 bento for the headline numbers, ledgers for
// everything else. No four-equal-tile row, no 3-up card grid.
import { createTranslator } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getLocaleMessages } from "@/i18n/messages";
import { EmptyState } from "@/components/empty-state";
import { getMySnapshot } from "@/lib/my-snapshot";
import { requireRole } from "@/server/guard";

export default async function StudentDashboard({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const session = await requireRole(["STUDENT"]);
  const me = session.user as { email?: string | null };
  const snap = await getMySnapshot(me.email ?? "");

  const t = await createTranslator({
    locale,
    namespace: "dashboard",
    messages: getLocaleMessages(locale),
  });

  const progress = snap.activePath?.progress ?? 0;

  return (
    <main id="konten" tabIndex={-1} className="bg-paper text-ink">
      <a href="#konten" className="skip-link">{t("skip")}</a>

      <section className="hero-light border-b border-line pt-[120px] md:pt-[144px]">
        <div className="mx-auto max-w-7xl px-4 pb-10">
          <p className="eyebrow-light">{t("eyebrow")}</p>
          <h1 className="font-nova mt-3 max-w-[24ch] text-4xl font-bold leading-[1.06] tracking-[-0.02em] md:text-5xl">
            {t("hello", { name: snap.displayName })}
          </h1>
          <p className="mt-4 max-w-[58ch] text-[15px] leading-relaxed text-soft">
            {t("sub")}
          </p>
          <p className="mt-5 font-mono text-[11px] leading-relaxed text-muted">
            {t("meta", { since: snap.memberSince, sessions: snap.sessions })}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
        {/* ── Bento: one dominant figure, two supporting ───────────── */}
        <section aria-label={t("progressLabel")}>
          <h2 className="sr-only">{t("progressLabel")}</h2>
          <div className="grid gap-x-8 gap-y-10 md:grid-cols-12">
            <div className="border-t-2 border-brand-700 pt-6 md:col-span-7">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                {t("sActivePath")}
              </p>
              {snap.activePath ? (
                <>
                  <p className="font-nova mt-3 text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-[1.08] tracking-[-0.02em]">
                    {snap.activePath.titleId}
                  </p>
                  <p
                    aria-hidden
                    className="tnum mt-5 font-nova text-[clamp(3rem,7vw,5rem)] font-bold leading-[0.94] tracking-[-0.03em] text-brand-700"
                  >
                    {progress}%
                  </p>
                  <div
                    className="bar-track mt-4"
                    role="progressbar"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={progress}
                    aria-valuetext={`${progress}%`}
                    aria-label={t("progressLabel")}
                  >
                    <div className="bar-fill" style={{ transform: `scaleX(${progress / 100})` }} />
                  </div>
                  <p className="mt-3 font-mono text-[11px] text-muted">
                    {t("pathStatus", { status: snap.activePath.status })}
                  </p>
                </>
              ) : (
                <>
                  <p className="font-nova mt-3 text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold leading-[1.08] tracking-[-0.02em]">
                    {t("noPathYet")}
                  </p>
                  <Link
                    href="/roles"
                    className="btn-primary mt-6 min-h-[52px] px-7 text-[15px]"
                  >
                    {t("browsePaths")}
                    <span className="btn-island btn-island-dark" aria-hidden>↗</span>
                  </Link>
                </>
              )}
            </div>

            <dl className="contents">
              <div className="border-t border-line pt-6 md:col-span-5">
                <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                  {t("sEnrolled")}
                </dt>
                <dd className="tnum mt-2 font-nova text-[clamp(1.75rem,3vw,2.5rem)] font-bold leading-none tracking-[-0.03em]">
                  {snap.enrolledPaths}
                </dd>
                <p className="mt-2 text-[13px] text-muted">{t("sEnrolledSub")}</p>
              </div>
              <div className="border-t border-line pt-6 md:col-span-5">
                <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                  {t("sCredentials")}
                </dt>
                <dd className="tnum mt-2 font-nova text-[clamp(1.75rem,3vw,2.5rem)] font-bold leading-none tracking-[-0.03em]">
                  {snap.credentials}
                </dd>
                <p className="mt-2 text-[13px] text-muted">{t("sCredentialsSub")}</p>
              </div>
            </dl>
          </div>
        </section>

        {/* ── Ledger: what is actually finished ───────────────────── */}
        <section aria-labelledby="dash-finished" className="mt-14">
          <div className="flex flex-wrap items-baseline justify-between gap-3 border-t border-line pt-6">
            <h2 id="dash-finished" className="font-nova text-2xl font-bold tracking-[-0.02em] md:text-3xl">
              {t("finishedTitle")}
            </h2>
            <p className="max-w-[44ch] text-[13px] leading-relaxed text-muted">
              {t("finishedSub")}
            </p>
          </div>

          {snap.finishedMilestones > 0 ? (
            <ol className="mt-5 border-b border-line">
              {Array.from({ length: snap.finishedMilestones }).map((_, i) => (
                <li
                  key={i}
                  className="grid gap-x-8 gap-y-1 border-t border-line py-4 md:grid-cols-12 md:items-baseline md:px-2"
                >
                  <p className="tnum font-mono text-[12px] font-bold text-brand-700 md:col-span-2">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="font-bold md:col-span-6">{t("completedItem")}</p>
                  <p className="font-mono text-[11px] text-muted md:col-span-4 md:text-right">
                    {t("doneBadge")}
                  </p>
                </li>
              ))}
            </ol>
          ) : (
            <div className="mt-5">
              <EmptyState art="ledger" title={t("emptyTitle")} hint={t("emptyHint")} />
            </div>
          )}
        </section>

        {/* ── Keep exploring ────────────────────────────────────────
            The old credential-wallet and BNSP-upgrade panels belonged to the
            retired certification product. The PRD product ends the loop at
            discovery: more roles, more scenarios. */}
        <section aria-labelledby="dash-more" className="mt-14 pb-6">
          <div className="relative overflow-hidden rounded-card bg-brand-700 px-6 py-10 md:px-12 md:py-14">
            <div aria-hidden className="grid-ink pointer-events-none absolute inset-0" />
            <p className="relative font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-white/70">
              {t("moreEyebrow")}
            </p>
            <p className="font-nova relative mt-4 max-w-[24ch] text-[clamp(1.5rem,3vw,2.25rem)] font-bold leading-[1.08] tracking-[-0.02em] text-white">
              {t("moreTitle")}
            </p>
            <p className="relative mt-4 max-w-[52ch] text-[15px] leading-relaxed text-white/90">
              {t("moreSub")}
            </p>
            <div className="relative mt-8">
              <Link href="/roles" className="inline-flex min-h-[52px] items-center gap-2.5 rounded-btn bg-white px-7 text-[15px] font-extrabold text-brand-700 transition hover:bg-paper active:translate-y-[1px]">
                {t("browsePaths")}
                <span className="btn-island btn-island-dark" aria-hidden>
                  ↗
                </span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}