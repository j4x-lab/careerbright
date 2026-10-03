import { createTranslator } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getLocaleMessages } from "@/i18n/messages";
import { PX, PHOTOS } from "@/lib/visual";

export default async function VerifyPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale, id } = await params;
  const messages = getLocaleMessages(locale);
  const t = await createTranslator({ locale, namespace: "verify", messages });
  const c = await createTranslator({ locale, namespace: "common", messages });
  return (
    <main className="hero-light relative min-h-[100dvh] overflow-hidden px-4 py-16">
      <div className="relative mx-auto max-w-3xl">
        <div className="text-center">
          <Link href="/" className="font-mono text-[12px] text-muted underline decoration-line underline-offset-4 hover:text-ink">
            {c("home")}
          </Link>
        </div>
        <div className="glass-light mx-auto mt-10 max-w-md p-6 text-left md:p-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-signal-strong">
            {t("title")}
          </p>
          <h1 className="tnum mt-3 break-all font-mono text-lg font-bold">credential:{id}</h1>
          <p className="mt-3 max-w-[52ch] text-sm leading-relaxed text-soft">
            {t("body")}
          </p>
          <div className="mt-6 rounded-card border border-ok/25 bg-ok-bg p-4">
            <p className="text-sm font-bold text-ok">{t("status")}</p>
            <p className="tnum mt-1.5 font-mono text-xs text-soft">SKKNI: M.691090.005.01 · KKNI 6</p>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="rounded-full border border-line bg-paper px-3 py-2 font-mono text-[11px] text-soft">OB 3.0 ✓</span>
            <span className="rounded-full border border-line bg-paper px-3 py-2 font-mono text-[11px] text-soft">VC 2.0 ✓</span>
            <span className="rounded-full border border-line px-3 py-2 font-mono text-[11px] text-faint">{t("bnspSoon")}</span>
          </div>
          <Link href="/auth/daftar" className="btn-amber mt-6 w-full justify-center">{t("cta")}</Link>
        </div>

        {/* The destination this code points at. Placed after the credential,
            not above it: the proof comes first, the promise second. */}
        <figure className="photo-cine mx-auto mt-12 max-w-2xl aspect-[21/9]">
          <img
            src={PX(PHOTOS.wisudaID, 1400)}
            alt={t("photoAlt")}
            loading="lazy"
            decoding="async"
            sizes="(max-width: 768px) 100vw, 672px"
            className="h-full w-full object-cover"
          />
          <figcaption className="photo-cap">
            <span>{t("photoCap")}</span>
            <span className="opacity-70">Pexels</span>
          </figcaption>
        </figure>
      </div>
    </main>
  );
}
