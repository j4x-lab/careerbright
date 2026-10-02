import type { ReactNode } from "react";
import { createTranslator } from "next-intl";
import { getLocaleMessages } from "@/i18n/messages";
import { KatalogSearch } from "./katalog-search";

/* Cerah v2 — katalog header with dark band. */

export default async function KatalogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await createTranslator({
    locale,
    namespace: "katalog",
    messages: getLocaleMessages(locale),
  });
  return (
    <main className="overflow-x-clip bg-paper text-ink">
      <a href="#konten" className="skip-link">{t("skip")}</a>
      <section className="hero-light relative overflow-hidden pt-[140px]">
        <div className="relative mx-auto max-w-7xl px-4 pb-10">
          <a href="/" className="font-mono text-[12px] text-muted underline decoration-line underline-offset-4 hover:text-ink">{t("back")}</a>
          <p className="eyebrow-light mt-6">{t("eyebrow")}</p>
          <h1 id="konten" className="mt-3 max-w-[18ch] text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
            {t.rich("title", { b: (chunks: ReactNode) => <span className="text-brand-700">{chunks}</span> })}
          </h1>
          <p className="mt-3 max-w-[56ch] text-[15px] leading-relaxed text-soft">
            {t("sub")}
          </p>
        </div>
      </section>
      <div className="mx-auto max-w-7xl px-4 py-10 md:py-12">
        <div className="-mt-16 relative z-10">
          <KatalogSearch />
        </div>
      </div>
    </main>
  );
}
