// LSP Assessor — sessions, APL-02 verification, rubric scoring → credential.bNSPIssue
import { createTranslator } from "next-intl";
import { getLocaleMessages } from "@/i18n/messages";
import { PX, PHOTOS } from "@/lib/visual";
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
      {/* Shift work is the assessor's reality — the caption says so, and the
          photo shows the hour this actually gets scheduled at. */}
      <figure className="photo-cine mt-8 aspect-[21/9]">
        <img
          src={PX(PHOTOS.nightJKT, 1600)}
          alt={t("photoAlt")}
          loading="lazy"
          decoding="async"
          sizes="(max-width: 1024px) 100vw, 1200px"
          className="h-full w-full object-cover"
        />
        <figcaption className="photo-cap">
          <span>{t("photoCap")}</span>
          <span className="opacity-70">Pexels</span>
        </figcaption>
      </figure>
    </OpsShell>
  );
}