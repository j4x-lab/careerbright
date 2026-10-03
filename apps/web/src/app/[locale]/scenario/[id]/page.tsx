import { createTranslator } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getLocaleMessages } from "@/i18n/messages";
import { SiteFooter, SiteNav } from "@/components/site-chrome";
import { getScenario } from "@/lib/discovery";
import { isRoleReleased } from "@/lib/releases";
import { notFound } from "next/navigation";
import { ScenarioPlayer } from "./scenario-player";

/* Micro-scenario player route (PRD §4.4 /scenario/[id]). The scenario payload
   carries its roleId, so the back link always returns to the owning role.
   Unreleased roles are blocked here too — the player is the last gate, so a
   direct URL can never open a locked wave. */

export default async function ScenarioPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale, id } = await params;
  const scenario = getScenario(id);
  if (!scenario) notFound();
  const released = await isRoleReleased(scenario.roleId);
  const t = await createTranslator({
    locale,
    namespace: "scenario",
    messages: getLocaleMessages(locale),
  });
  if (!released) {
    return (
      <main id="konten" tabIndex={-1} className="overflow-x-clip bg-paper text-ink">
        <a href="#konten" className="skip-link">{t("skip")}</a>
        <SiteNav />
        <section className="hero-light relative overflow-hidden pt-[140px]">
          <div className="relative mx-auto max-w-3xl px-4 pb-10">
            <Link href={`/role/${scenario.roleId}`} className="font-mono text-[12px] text-muted underline decoration-line underline-offset-4 hover:text-ink">{t("back")}</Link>
            <h1 className="mt-4 max-w-[22ch] text-3xl font-extrabold leading-[1.06] tracking-tight md:text-5xl">
              {scenario.title}
            </h1>
            <div className="panel mt-8 p-6 md:p-8" role="status">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                {t("lockedTitle")}
              </p>
              <p className="mt-3 max-w-[56ch] text-[15px] leading-relaxed text-soft">
                {t("lockedBody")}
              </p>
              <Link href={`/role/${scenario.roleId}`} className="link-more mt-4 inline-flex min-h-[44px] items-center">
                {t("viewRole")}
              </Link>
            </div>
          </div>
        </section>
        <SiteFooter />
      </main>
    );
  }
  return (
    <main id="konten" tabIndex={-1} className="overflow-x-clip bg-paper text-ink">
      <a href="#konten" className="skip-link">{t("skip")}</a>
      <SiteNav />
      <section className="hero-light relative overflow-hidden pt-[140px]">
        <div className="relative mx-auto max-w-3xl px-4 pb-10">
          <Link href={`/role/${scenario.roleId}`} className="font-mono text-[12px] text-muted underline decoration-line underline-offset-4 hover:text-ink">{t("back")}</Link>
          <h1 className="mt-4 max-w-[22ch] text-3xl font-extrabold leading-[1.06] tracking-tight md:text-5xl">
            {scenario.title}
          </h1>
        </div>
      </section>
      <div className="mx-auto max-w-3xl px-4 pb-20 md:pb-28">
        <ScenarioPlayer scenario={scenario} backHref={`/role/${scenario.roleId}`} />
      </div>
      <SiteFooter />
    </main>
  );
}
