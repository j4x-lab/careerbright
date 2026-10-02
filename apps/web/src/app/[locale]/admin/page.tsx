// Admin Dashboard — KPIs, catalog, users, LSP partners, payments reconciliation.
import { createTranslator } from "next-intl";
import { getLocaleMessages } from "@/i18n/messages";
import { OpsShell, StatCard } from "@/components/ops-shell";

const KPIS = ["k1", "k2", "k3", "k4"] as const;

export default async function AdminDashboard({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await createTranslator({
    locale,
    namespace: "admin",
    messages: getLocaleMessages(locale),
  });
  return (
    <OpsShell locale={locale} eyebrow={t("eyebrow")} title={t("title")} desc={t("desc")}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {KPIS.map((k) => (
          <StatCard key={k} t={t(`${k}t`)} v={t(`${k}v`)} s={t(`${k}s`)} />
        ))}
      </div>
      <div className="panel-warm mt-4 border-dashed p-8 text-center">
        <p className="text-[15px] font-extrabold">{t("modTitle")}</p>
        <p className="mx-auto mt-1 max-w-[52ch] text-sm text-soft">
          {t("modBody")}
        </p>
      </div>
    </OpsShell>
  );
}
