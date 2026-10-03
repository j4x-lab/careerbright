import { createTranslator } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getLocaleMessages } from "@/i18n/messages";
import { SiteFooter, SiteNav } from "@/components/site-chrome";
import { getRole, getScenariosForRole } from "@/lib/discovery";
import { isRoleReleased } from "@/lib/releases";
import { notFound } from "next/navigation";
import { SeriesPlayer } from "./series-player";

/* Role series route (/series/[roleId]): all of a role's micro-scenarios
   played back-to-back with a final score. Pass is avg >= 70 — the same bar
   as the LMS quizzes — and the series can be retried until passed.
   Locked roles get the lock panel, same as the scenario route. */

export default async function SeriesPage({ params }: { params: Promise<{ locale: string; roleId: string }> }) {
  const { locale, roleId } = await params;
  const role = getRole(roleId);
  if (!role) notFound();
  const scenarios = getScenariosForRole(role.id);
  const released = await isRoleReleased(role.id);
  const t = await createTranslator({
    locale,
    namespace: "series",
    messages: getLocaleMessages(locale),
  });
  if (scenarios.length === 0 || !released) {
    return (
      <main id="konten" tabIndex={-1} className="overflow-x-clip bg-paper text-ink">
        <a href="#konten" className="skip-link">{t("skip")}</a>
        <SiteNav />
        <section className="hero-light relative overflow-hidden pt-[140px]">
          <div className="relative mx-auto max-w-3xl px-4 pb-10">
            <Link href={`/role/${role.id}`} className="font-mono text-[12px] text-muted underline decoration-line underline-offset-4 hover:text-ink">{t("back")}</Link>
            <h1 className="mt-4 max-w-[22ch] text-3xl font-extrabold leading-[1.06] tracking-tight md:text-5xl">
              {role.title}
            </h1>
            <div className="panel mt-8 p-6 md:p-8" role="status">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                {t("lockedTitle")}
              </p>
              <p className="mt-3 max-w-[56ch] text-[15px] leading-relaxed text-soft">
                {t("lockedBody")}
              </p>
              <Link href={`/role/${role.id}`} className="link-more mt-4 inline-flex min-h-[44px] items-center">
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
          <Link href={`/role/${role.id}`} className="font-mono text-[12px] text-muted underline decoration-line underline-offset-4 hover:text-ink">{t("back")}</Link>
          <p className="eyebrow-light mt-6">{t("seriesLabel", { n: scenarios.length })}</p>
          <h1 className="mt-3 max-w-[18ch] text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
            {role.title}
          </h1>
        </div>
      </section>
      <div className="mx-auto max-w-3xl px-4 pb-20 md:pb-28">
        <SeriesPlayer roleId={role.id} scenarios={scenarios} backHref={`/role/${role.id}`} />
      </div>
      <SiteFooter />
    </main>
  );
}
