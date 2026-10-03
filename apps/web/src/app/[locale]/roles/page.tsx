import { createTranslator } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getLocaleMessages } from "@/i18n/messages";
import { RoleCatalog } from "./role-catalog";

/* Role directory (PRD §4.2 /roles): search plus category filter. Industry,
   Major and Work-Style filters are specified by the PRD but the roles.json
   schema carries no major/work-style field, so shipping filter UI for them
   would be decoration over nothing. Search + category is what the data
   supports today. */

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
          <RoleCatalog />
        </div>
      </div>
    </main>
  );
}
