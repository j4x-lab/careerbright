// Cerah v2 — student dashboard app-shell: sidebar + progress + wallet + upgrade.
import { createTranslator } from "next-intl";
import { getLocaleMessages } from "@/i18n/messages";
import { UpgradeButton } from "./upgrade-button";

const STAT_KEYS = ["s1", "s2", "s3", "s4"] as const;
const STAT_WIDTHS = ["62%", "80%", "50%", "78%"];

const NAV = [
  { key: "navLearn", href: "/id/dashboard", on: true },
  { key: "navPath", href: "/id/paths/junior-accountant", on: false },
  { key: "navAssess", href: "/id/belajar/js-dasar-analis", on: false },
  { key: "navWallet", href: "/id/verify/contoh", on: false },
  { key: "navSettings", href: "/id/auth/masuk", on: false },
] as const;

const BADGES = ["Keu-01", "Pajak-05", "Lapor-07", "Capstone"];

export default async function StudentDashboard({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await createTranslator({
    locale,
    namespace: "dashboard",
    messages: getLocaleMessages(locale),
  });
  const c = await createTranslator({
    locale,
    namespace: "common",
    messages: getLocaleMessages(locale),
  });
  return (
    <main className="min-h-[100dvh] bg-paper px-4 py-8 text-ink md:px-8">
      <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-[240px_1fr]">
        {/* sidebar */}
        <aside className="panel hidden h-fit gap-1 p-3 lg:grid">
          <a href="/" className="flex items-center gap-2 px-2 py-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-700 font-mono text-[12px] font-bold text-white">SB</span>
            <span className="text-[14px] font-extrabold tracking-tight">Career <span className="text-brand-700">SuperBright</span></span>
          </a>
          {NAV.map(({ key, href, on }) => (
            <a key={key} href={href} aria-current={on ? "page" : undefined}
              className={`px-3.5 py-2.5 text-[13.5px] font-semibold transition ${on ? "shell-active" : "rounded-xl text-soft hover:bg-paper"}`}>
              {t(key)}
            </a>
          ))}
          <div className="mt-2 rounded-card border border-signal/40 bg-signal/10 p-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-signal-strong">{t("sideTitle")}</p>
            <p className="tnum mt-1 font-mono text-lg font-bold">{t("sidePrice")}</p>
            <p className="mt-1 text-[12px] text-soft">{t("sideDesc")}</p>
          </div>
        </aside>

        <div className="min-w-0">
          <a href="/" className="link-more">{c("home")}</a>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-700">{t("eyebrow")}</p>
              <h1 className="mt-2 text-3xl font-extrabold tracking-tight md:text-4xl">{t("title")}</h1>
              <p className="mt-2 max-w-[60ch] text-sm leading-relaxed text-soft">
                {t("sub")}
              </p>
            </div>
            <span className="flex items-center gap-2 rounded-full border border-line bg-card px-3.5 py-2 font-mono text-[11px] text-soft">
              <span className="live-dot" aria-hidden /> {t("sync")}
            </span>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {STAT_KEYS.map((k, i) => (
              <div key={k} className="panel p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">{t(`${k}t`)}</p>
                <p className="tnum mt-2 text-xl font-extrabold tracking-tight">{t(`${k}v`)}</p>
                <div className="bar-track mt-3"><div className="bar-fill" style={{ width: STAT_WIDTHS[i] }} /></div>
                <p className="mt-2 text-xs text-muted">{t(`${k}s`)}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-12">
            <div className="panel overflow-hidden lg:col-span-7">
              <div className="bg-brand-700 px-6 py-4 text-white">
                <p className="text-[15px] font-extrabold">{t("contTitle")}</p>
                <p className="mt-0.5 text-[13px] text-white/75">{t("contSub")}</p>
              </div>
              <div className="p-6">
                <div className="bar-track"><div className="bar-fill" style={{ width: "62%" }} /></div>
                <p className="tnum mt-2 font-mono text-[11px] text-muted">{t("contMeta")}</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a href="/id/belajar/js-dasar-analis" className="btn-primary group px-6 py-3 text-sm">
                    {t("contCta1")} <span className="btn-island !h-7 !w-7 text-sm">→</span>
                  </a>
                  <a href="/id/paths/junior-accountant" className="btn-ghost px-6 py-3 text-sm">{t("contCta2")}</a>
                </div>
              </div>
            </div>
            <div className="rounded-card border-2 border-ink bg-card p-6 lg:col-span-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-signal-strong">{t("upEyebrow")}</p>
              <p className="mt-2 text-lg font-extrabold tracking-tight">{t("upTitle")}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-soft">
                {t("upBody")}
              </p>
              <p className="tnum mt-3 font-mono text-2xl font-bold text-signal-strong">
                {t("price")} <span className="text-xs font-normal text-faint">{t("perOnce")}</span>
              </p>
              <div className="mt-4"><UpgradeButton learningPathId="junior-accountant" priceLabel={t("price")} /></div>
            </div>
          </div>

          <div className="panel mt-4 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[15px] font-extrabold">{t("walletTitle")}</p>
                <p className="mt-1 text-sm text-soft">{t("walletSub")}</p>
              </div>
              <a href="/id/verify/contoh" className="link-more hidden sm:block">{t("walletLink")}</a>
            </div>
            <div className="mt-4 flex gap-2.5 overflow-x-auto pb-1">
              {BADGES.map((b) => (
                <span key={b} className="flex-none rounded-full border border-line bg-paper px-4 py-3 font-mono text-xs text-soft">
                  ◆ {b} · <span className="font-bold text-ok">{t("valid")}</span>
                </span>
              ))}
              <span className="flex flex-none items-center rounded-full border border-dashed border-line px-4 py-3 font-mono text-xs text-faint">
                {t("locked")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
