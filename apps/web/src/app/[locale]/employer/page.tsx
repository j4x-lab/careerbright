// Employer — search skill profiles by SKKNI/KKNI, verify via /verify/[id]
import { createTranslator } from "next-intl";
import { requireRole } from "@/server/guard";
import { Link } from "@/i18n/navigation";
import { getLocaleMessages } from "@/i18n/messages";
import { PX, PHOTOS } from "@/lib/visual";
import { OpsShell } from "@/components/ops-shell";

const CARDS = ["c1", "c2", "c3"] as const;

export default async function EmployerDashboard({ params }: { params: Promise<{ locale: string }> }) {
  await requireRole(["EMPLOYER", "ADMIN"]);
  const { locale } = await params;
  const t = await createTranslator({
    locale,
    namespace: "employer",
    messages: getLocaleMessages(locale),
  });
  return (
    <OpsShell locale={locale} eyebrow={t("eyebrow")} title={t("title")} desc={t("desc")}>
      {/* Ledger, not three equal cards: the three capabilities read as a
          sequence of commitments, each with its own weight. */}
      <ol className="border-t border-line">
        {CARDS.map((k, i) => (
          <li
            key={k}
            className="grid gap-x-8 gap-y-2 border-b border-line py-6 transition-colors duration-300 hover:bg-brand-50/60 md:grid-cols-12 md:items-baseline md:px-2"
          >
            <p aria-hidden className="tnum font-mono text-[13px] font-bold tracking-[0.12em] text-brand-700 md:col-span-2">
              {String(i + 1).padStart(2, "0")}
            </p>
            <h2 className="text-[17px] font-extrabold leading-snug tracking-tight text-ink md:col-span-4 md:text-[19px]">
              {t(`${k}h`)}
            </h2>
            <p className="max-w-[56ch] text-[15px] leading-relaxed text-soft md:col-span-6">
              {t(`${k}d`)}
            </p>
          </li>
        ))}
      </ol>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <Link href="/verify/contoh" className="btn-primary group min-h-[52px] px-6 text-[15px]">
          {t("cta")} <span className="btn-island" aria-hidden>↗</span>
        </Link>
      </div>

      {/* Scrim + caption bar, never text straight onto the photo (visual.ts
          rule 7). The photo closes the argument: people decide, not software. */}
      <figure className="photo-cine mt-10 aspect-[21/9]">
        <img
          src={PX(PHOTOS.meetingDiverse, 1600)}
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