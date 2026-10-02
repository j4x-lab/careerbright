import { getTranslations } from "next-intl/server";

export default async function NotFound() {
  const t = await getTranslations("notfound");
  return (
    <main className="flex min-h-[100dvh] items-center justify-center bg-paper px-4 text-center text-ink">
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-700">{t("code")}</p>
        <h1 className="mx-auto mt-4 max-w-[16ch] text-4xl font-semibold tracking-tight md:text-5xl">
          {t("title")}
        </h1>
        <p className="mx-auto mt-3 max-w-[48ch] text-sm leading-relaxed text-soft">
          {t("body")}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-5">
          <a href="/" className="btn-primary group px-6 py-3 text-sm">
            {t("home")}
            <span className="btn-island" aria-hidden>
              ↗
            </span>
          </a>
          <a href="/#pekerjaan" className="link-more">
            {t("roles")}
          </a>
        </div>
      </div>
    </main>
  );
}
