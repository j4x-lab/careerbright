import { Suspense } from "react";
import { createTranslator } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getLocaleMessages } from "@/i18n/messages";
import { SiteFooter, SiteNav } from "@/components/site-chrome";
import { RoleCatalog } from "./role-catalog";
import { ROLES, getScenariosForRole } from "@/lib/discovery";
import { getReleasedRoleIds } from "@/lib/releases";

/* Role directory (PRD §4.2 /roles): search plus category filter. Industry,
   Major and Work-Style filters are specified by the PRD but the roles.json
   schema carries no major/work-style field, so shipping filter UI for them
   would be decoration over nothing. Search + category is what the data
   supports today. */

async function CatalogGate() {
/* Locked-but-scenario-backed roles render with a lock badge; the role
   page itself enforces the gate. Awaiting here would hold the hero —
   so the catalog streams behind a skeleton instead. */
  const released = await getReleasedRoleIds();
  const lockedIds = ROLES.filter(
    (r) => getScenariosForRole(r.id).length > 0 && !released.has(r.id)
  ).map((r) => r.id);
  return <RoleCatalog lockedIds={lockedIds} />;
}

export default async function RolesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await createTranslator({
    locale,
    namespace: "roles",
    messages: getLocaleMessages(locale),
  });
  return (
    <main id="konten" tabIndex={-1} className="overflow-x-clip bg-paper text-ink">
      <a href="#konten" className="skip-link">{t("skip")}</a>
      <SiteNav />
      <section className="hero-light relative overflow-hidden pt-[140px]">
        <div className="relative mx-auto max-w-7xl px-4 pb-10">
          <Link href="/" className="font-mono text-[12px] text-muted underline decoration-line underline-offset-4 hover:text-ink">{t("back")}</Link>
          <p className="eyebrow-light mt-6">{t("eyebrow")}</p>
          <h1 className="mt-3 max-w-[18ch] text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
            {t("title")}
          </h1>
          <p className="mt-3 max-w-[56ch] text-[15px] leading-relaxed text-soft">
            {t("sub")}
          </p>
        </div>
      </section>
      <div className="mx-auto max-w-7xl px-4 py-10 md:py-12">
        <div className="-mt-16 relative z-10">
          <Suspense
            fallback={
              <div aria-hidden className="panel space-y-3 p-6 md:p-7">
                <div className="h-12 animate-pulse rounded-btn bg-cream" />
                <div className="flex gap-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="h-9 w-24 animate-pulse rounded-full bg-cream" />
                  ))}
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="h-40 animate-pulse rounded-card bg-cream" />
                  ))}
                </div>
              </div>
            }
          >
            <CatalogGate />
          </Suspense>
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}
