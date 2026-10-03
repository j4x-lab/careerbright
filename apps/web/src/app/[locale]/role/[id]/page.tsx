import { createTranslator } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getLocaleMessages } from "@/i18n/messages";
import { SiteFooter, SiteNav } from "@/components/site-chrome";
import { getRole, getScenariosForRole } from "@/lib/discovery";
import { notFound } from "next/navigation";

/* Role detail (PRD §4.3 /role/[id]): hero profile, then three anchored
   sections standing in for the sticky-tab spec — Snapshot & Timeline (myth vs
   reality + 9-to-5 timeline), Tools, and the role's Micro-Scenarios with a
   "Play Scenario" CTA each. Deliverable previews are omitted: the schema has
   no deliverables field, and a blurred fake asset would be worse than none. */

export default async function RolePage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale, id } = await params;
  const role = getRole(id);
  if (!role) notFound();
  const scenarios = getScenariosForRole(role.id);
  const t = await createTranslator({
    locale,
    namespace: "role",
    messages: getLocaleMessages(locale),
  });
  return (
    <main id="konten" tabIndex={-1} className="overflow-x-clip bg-paper text-ink">
      <a href="#konten" className="skip-link">{t("skip")}</a>
      <SiteNav />
      <section className="hero-light relative overflow-hidden pt-[140px]">
        <div className="relative mx-auto max-w-7xl px-4 pb-10">
          <Link href="/roles" className="font-mono text-[12px] text-muted underline decoration-line underline-offset-4 hover:text-ink">{t("back")}</Link>
          <p className="eyebrow-light mt-6">{role.category}</p>
          <h1 className="mt-3 max-w-[18ch] text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
            {role.title}
          </h1>
          <p className="mt-3 max-w-[52ch] text-[15px] font-bold leading-relaxed text-signal-strong">
            {role.shortDescription}
          </p>
          <nav aria-label={role.title} className="mt-6 flex flex-wrap gap-2">
            {[
              ["#snapshot", t("timelineTitle")],
              ["#tools", t("toolsTitle")],
              ["#scenarios", t("scenariosTitle")],
            ].map(([href, label]) => (
              <a key={href} href={href} className="chip min-h-[44px] transition hover:border-ink">
                {label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 md:py-12">
        {/* ── Snapshot & timeline ─────────────────────────────── */}
        <section id="snapshot" aria-label={t("timelineTitle")} className="scroll-mt-32 border-t border-line pt-8">
          <div className="grid gap-5 md:grid-cols-12">
            <div className="panel h-full p-8 md:col-span-6 md:p-10">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                {t("mythTitle")}
              </p>
              <p className="mt-4 text-[1.4rem] font-extrabold leading-[1.12] tracking-tight">
                {role.mythVsReality.myth}
              </p>
            </div>
            <div className="panel h-full p-8 md:col-span-6 md:p-10">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                {t("realityTitle")}
              </p>
              <p className="mt-4 text-[1.4rem] font-extrabold leading-[1.12] tracking-tight">
                {role.mythVsReality.reality}
              </p>
            </div>
          </div>
          <ol className="panel mt-5 overflow-hidden">
            {role.timeline.map((entry, i) => (
              <li key={`${entry.time}-${i}`} className={`grid gap-2 px-6 py-4 sm:grid-cols-[auto_1fr] sm:items-baseline sm:gap-4 ${i > 0 ? "border-t border-line" : ""}`}>
                <span className="tnum font-mono text-[12px] font-bold text-brand-700">{entry.time}</span>
                <p className="text-[14px] leading-relaxed text-soft">{entry.event}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ── Tools ───────────────────────────────────────────── */}
        <section id="tools" aria-label={t("toolsTitle")} className="mt-14 scroll-mt-32 border-t border-line pt-8">
          <h2 className="font-nova max-w-[22ch] text-3xl font-bold tracking-[-0.02em] md:text-4xl">
            {t("toolsTitle")}
          </h2>
          <ul className="mt-6 flex flex-wrap gap-2">
            {role.tools.map((tool) => (
              <li key={tool} className="chip !text-[13px]">
                {tool}
              </li>
            ))}
          </ul>
        </section>

        {/* ── Micro-scenarios ─────────────────────────────────── */}
        <section id="scenarios" aria-label={t("scenariosTitle")} className="mt-14 scroll-mt-32 border-t border-line pt-8">
          <h2 className="font-nova max-w-[22ch] text-3xl font-bold tracking-[-0.02em] md:text-4xl">
            {t("scenariosTitle")}
          </h2>
          <p className="mt-3 max-w-[56ch] text-[15px] leading-relaxed text-soft">
            {t("scenariosSub")}
          </p>
          {scenarios.length === 0 ? (
            <p className="mt-6 text-sm text-soft">{t("noScenarios")}</p>
          ) : (
            <ul className="mt-6 border-b border-line">
              {scenarios.map((s) => (
                <li key={s.id} className="grid gap-x-8 gap-y-2 border-t border-line py-5 transition-colors duration-300 hover:bg-brand-50/60 md:grid-cols-12 md:items-center md:px-2">
                  <p className="tnum font-mono text-[12px] text-muted md:col-span-7">
                    {s.context.sender} · {s.context.time}
                  </p>
                  <p className="text-[16px] font-extrabold tracking-tight md:col-span-3 md:order-first md:text-lg">
                    {s.title}
                  </p>
                  <div className="md:col-span-2 md:text-right">
                    <Link href={`/scenario/${s.id}`} className="link-more inline-flex min-h-[44px] items-center">
                      {t("playCta")}
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
      <SiteFooter />
    </main>
  );
}
