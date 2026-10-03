// Employer — search skill profiles by SKKNI/KKNI, verify via /verify/[id]
import { createTranslator } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getLocaleMessages } from "@/i18n/messages";
import { OpsShell } from "@/components/ops-shell";

const CARDS = ["c1", "c2", "c3"] as const;

export default async function EmployerDashboard({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await createTranslator({
    locale,
    namespace: "employer",
    messages: getLocaleMessages(locale),
  });
  return (
    <OpsShell locale={locale} eyebrow={t("eyebrow")} title={t("title")} desc={t("desc")}>
      <div className="grid gap-4 md:grid-cols-3">
        {CARDS.map((k) => (
          <div key={k} className="spot panel p-6">
            <p className="text-[15px] font-extrabold">{t(`${k}h`)}</p>
            <p className="mt-2 text-sm leading-relaxed text-soft">{t(`${k}d`)}</p>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <Link href="/verify/contoh" className="btn-primary group px-6 py-3 text-sm">
          {t("cta")} <span className="btn-island">↗</span>
        </Link>
      </div>
    </OpsShell>
  );
}
