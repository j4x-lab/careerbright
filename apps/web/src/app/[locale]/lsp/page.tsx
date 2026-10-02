// LSP Assessor — sessions, APL-02 verification, rubric scoring → credential.bNSPIssue
import { createTranslator } from "next-intl";
import { getLocaleMessages } from "@/i18n/messages";
import { OpsShell, StatCard } from "@/components/ops-shell";

const STATS = ["s1", "s2", "s3"] as const;

export default async function LspDashboard({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await createTranslator({
    locale,
    namespace: "lsp",
    messages: getLocaleMessages(locale),
  });
  return (
    <OpsShell locale={locale} eyebrow={t("eyebrow")} title={t("title")} desc={t("desc")}>
      <div className="grid gap-4 sm:grid-cols-3">
        {STATS.map((k) => (
          <StatCard key={k} t={t(`${k}t`)} v={t(`${k}v`)} s={t(`${k}s`)} />
        ))}
      </div>
    </OpsShell>
  );
}
