"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

/* Cerah v2 chrome — utility bar + floating pill nav + mega footer.
   Every route is written locale-less; next-intl's Link adds the prefix that
   localePrefix "as-needed" requires, so /en/** never links back into /id/**.
   Landing anchors use {pathname:"/",hash} so they resolve from any route. */

const HOME_HASH = (hash: string) => ({ pathname: "/", hash }) as const;

function IdFlag({ label }: { label: string }) {
  return (
    <svg width="18" height="12" viewBox="0 0 18 12" aria-label={label} role="img">
      <rect width="18" height="6" fill="#E70011" />
      <rect y="6" width="18" height="6" fill="#FFFFFF" />
      <rect width="18" height="12" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
    </svg>
  );
}

/** Real locale switch: same route, other language. Keeps the hash. */
function LocaleSwitch({ className }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("common");
  const [hash, setHash] = useState("");
  useEffect(() => {
    const read = () => setHash(window.location.hash);
    read();
    window.addEventListener("hashchange", read);
    return () => window.removeEventListener("hashchange", read);
  }, []);
  const alt = locale === routing.defaultLocale ? "en" : routing.defaultLocale;
  return (
    <Link
      href={hash ? { pathname, hash } : pathname}
      locale={alt}
      hrefLang={alt}
      className={className}
    >
      <span aria-hidden>{alt.toUpperCase()}</span>
      <span className="sr-only">{t("langSwitchLabel", { lang: alt.toUpperCase() })}</span>
    </Link>
  );
}

export function IdNoticeBar() {
  const t = useTranslations("nav");
  const c = useTranslations("common");
  return (
    <div className="border-b border-line/60 bg-paper">
      <div className="mx-auto flex h-9 w-full max-w-7xl items-center justify-between gap-4 px-4 font-mono text-[11px]">
        <p className="flex min-w-0 items-center gap-2 text-faint">
          <IdFlag label={t("flag")} />
          <span className="truncate">
            <span className="font-medium text-muted">{t("madeIn")}</span> · {t("dataJakarta")}
          </span>
        </p>
        <nav aria-label={t("region")} className="hidden flex-none items-center gap-5 text-faint md:flex">
          <Link href={HOME_HASH("#siap")} className="py-2 transition hover:text-ink">{t("forCampus")}</Link>
          <Link href={HOME_HASH("#siap")} className="py-2 transition hover:text-ink">{t("forEmployers")}</Link>
          <Link href="/verify/contoh" className="py-2 transition hover:text-ink">{t("verify")}</Link>
          <LocaleSwitch className="rounded-btn px-2 py-1 text-faint transition hover:bg-cream hover:text-ink" />
        </nav>
        <LocaleSwitch className="flex-none rounded-btn px-2 py-1 text-faint transition hover:bg-cream hover:text-ink md:hidden" />
      </div>
    </div>
  );
}

const NAV_LINKS = [
  { key: "roles", href: HOME_HASH("#pekerjaan") },
  { key: "howItWorks", href: HOME_HASH("#cara-kerja") },
] as const;

export function SiteNav() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Escape closes the overlay and returns focus to the control that opened it.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    panelRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-50">
        <IdNoticeBar />
        <div className={`transition-all duration-500 ${scrolled ? "px-3 pt-2" : "px-0 pt-0"}`}>
          <header
            className={`transition-all duration-500 ${
              scrolled
                ? "mx-auto max-w-6xl rounded-card border border-line bg-card shadow-[0_24px_70px_-24px_rgba(10,17,40,0.38)]"
                : "border-b border-transparent bg-paper/80 backdrop-blur-xl"
            }`}
          >
            <nav aria-label={t("mainNav")} className="mx-auto flex h-[68px] w-full max-w-7xl items-center justify-between gap-3 px-4">
              <Link href="/" className="flex min-w-0 flex-none items-center gap-2.5 py-2">
                <span className="flex h-11 w-11 items-center justify-center rounded-btn bg-brand-700 font-mono text-[14px] font-extrabold text-white shadow-[0_10px_24px_-10px_rgba(29,78,216,0.7)] ring-1 ring-brand-800/20">
                  CS
                </span>
                <span className="hidden text-[16px] font-extrabold tracking-[-0.02em] text-ink min-[420px]:inline">
                  Career <span className="text-brand-700">SuperBright</span>
                </span>
              </Link>
              <div className="hidden items-center gap-1 text-[14px] font-semibold text-soft lg:flex">
                {NAV_LINKS.map(({ key, href }) => (
                  <Link key={href.hash + key} href={href} className="rounded-btn px-4 py-3 transition hover:bg-cream hover:text-ink">
                    {t(key)}
                  </Link>
                ))}
              </div>
              <div className="flex flex-none items-center gap-2">
                <Link
                  href="/katalog"
                  className="hidden min-h-[44px] items-center gap-2 rounded-btn px-3 py-3 text-[13px] font-semibold text-muted transition hover:text-ink md:flex"
                >
                  <span aria-hidden>⌕</span> {t("searchRoles")}
                </Link>
                <Link href="/auth/masuk" className="hidden min-h-[44px] items-center px-3 py-3 text-[14px] font-semibold text-muted transition hover:text-ink sm:flex">
                  {t("login")}
                </Link>
                <Link href={HOME_HASH("#pekerjaan")} className="btn-amber group min-h-[44px] whitespace-nowrap px-3.5 py-3 text-[13px] font-extrabold sm:px-5 sm:text-[14px]">
                  {t("exploreRoles")}
                  <span className="btn-island btn-island-dark hidden !h-6 !w-6 text-xs min-[420px]:inline-flex">↗</span>
                </Link>
                <button
                  ref={toggleRef}
                  onClick={() => setOpen(!open)}
                  aria-expanded={open}
                  aria-controls="site-menu"
                  aria-label={open ? t("closeMenu") : t("openMenu")}
                  className="relative flex h-11 w-11 flex-none items-center justify-center rounded-btn border border-line bg-card lg:hidden"
                >
                  <span className={`absolute h-0.5 w-4 rounded-full bg-ink transition-all duration-300 ${open ? "rotate-45" : "-translate-y-[3px]"}`} />
                  <span className={`absolute h-0.5 w-4 rounded-full bg-ink transition-all duration-300 ${open ? "-rotate-45" : "translate-y-[3px]"}`} />
                </button>
              </div>
            </nav>
          </header>
        </div>
      </div>

      {open && (
        <div
          id="site-menu"
          ref={panelRef}
          className="fixed inset-0 z-40 bg-paper lg:hidden"
        >
          <nav aria-label={t("mainNav")} className="relative flex min-h-[100dvh] flex-col justify-center gap-2 overflow-y-auto px-8 pb-10 pt-32">
            {[...NAV_LINKS.map(({ key, href }) => ({ label: t(key), href })), { label: t("login"), href: "/auth/masuk" as const }].map(({ label, href }, i, arr) => {
              const isAccount = i === arr.length - 1;
              return (
                <Link
                  key={String(label) + i}
                  href={href}
                  onClick={() => setOpen(false)}
                  style={{ animationDelay: `${80 + i * 55}ms` }}
                  className={
                    isAccount
                      ? "hero-enter py-4 text-lg font-bold text-muted"
                      : "hero-enter py-2 text-[40px] font-extrabold leading-[1.05] tracking-[-0.03em] text-ink"
                  }
                >
                  {!isAccount && (
                    <span aria-hidden className="mr-3 align-super font-mono text-[11px] font-bold tracking-[0.2em] text-brand-700">
                      0{i + 1}
                    </span>
                  )}
                  {label}
                </Link>
              );
            })}
            <div className="mt-6 flex gap-3">
              <Link href="/katalog" onClick={() => setOpen(false)} className="btn-ghost min-h-[52px] flex-1 justify-center text-[15px]">
                {t("searchCta")}
              </Link>
              <Link href={HOME_HASH("#pekerjaan")} onClick={() => setOpen(false)} className="btn-amber group min-h-[52px] flex-1 justify-center text-[15px]">
                {t("exploreRoles")} <span className="btn-island btn-island-dark">↗</span>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}

const FOOTER_COLS = [
  { headKey: "colProduct", links: [{ key: "linkExplore", href: HOME_HASH("#pekerjaan") }, { key: "linkHow", href: HOME_HASH("#cara-kerja") }, { key: "linkStart", href: HOME_HASH("#siap") }] },
  { headKey: "colAccount", links: [{ key: "linkLogin", href: "/auth/masuk" as const }, { key: "linkSignup", href: "/auth/daftar" as const }, { key: "linkVerify", href: "/verify/contoh" as const }] },
] as const;

export function SiteFooter() {
  const t = useTranslations("footer");
  const nc = useTranslations("nav");
  return (
    <footer className="relative overflow-hidden border-t border-line bg-card">
      <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-16">
        <div className="panel-warm flex flex-col gap-8 p-8 md:flex-row md:items-center md:justify-between md:p-12">
          <div className="max-w-xl">
            <p className="eyebrow-light">{t("ctaEyebrow")}</p>
            <p className="mt-3 text-[32px] font-extrabold leading-[1.02] tracking-[-0.03em] text-ink md:text-5xl">
              {t("ctaTitle")}
            </p>
          </div>
          <div className="flex w-full max-w-md flex-col gap-3 sm:flex-row sm:items-center md:w-auto md:flex-none md:flex-col md:items-stretch lg:flex-row lg:items-center">
            <Link href="/auth/daftar" className="btn-amber min-h-[52px] flex-none justify-center px-7 py-4 text-[15px] font-extrabold">
              {t("ctaButton")}
            </Link>
            <p className="max-w-[32ch] font-mono text-[12px] leading-relaxed text-muted">
              {t("ctaNote")}
            </p>
          </div>
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-6">
          <div className="md:col-span-2">
            <p className="flex items-center gap-2.5">
              <span className="flex h-11 w-11 items-center justify-center rounded-btn bg-brand-700 font-mono text-[14px] font-extrabold text-white shadow-[0_10px_24px_-10px_rgba(29,78,216,0.7)]">
                CS
              </span>
              <span className="text-[16px] font-extrabold tracking-[-0.02em] text-ink">
                Career <span className="text-brand-700">SuperBright</span>
              </span>
            </p>
            <p className="mt-4 max-w-[36ch] text-[14px] leading-relaxed text-soft">
              {t("tagline")}
            </p>
            <p className="mt-5 flex items-center gap-2 font-mono text-[11px] text-faint">
              <IdFlag label={nc("flag")} /> {t("madeLine")}
            </p>
          </div>
          {FOOTER_COLS.map(({ headKey, links }) => (
            <nav key={headKey} aria-label={t(headKey)}>
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-muted">{t(headKey)}</p>
              <ul className="mt-4 space-y-1 text-[15px] font-medium text-soft">
                {links.map(({ key, href }) => (
                  <li key={key}>
                    <Link href={href} className="block py-2 pr-4 transition hover:text-brand-700">{t(key)}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-14 flex flex-col gap-3 border-t border-line/70 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="max-w-[70ch] font-mono text-[11px] leading-relaxed text-faint">
            {t("legalLine")}
          </p>
          <nav aria-label={t("legal")} className="flex flex-none flex-wrap items-center gap-x-5 gap-y-2 text-[12px] text-faint">
            <Link href="/verify/contoh" className="inline-flex min-h-[44px] items-center transition hover:text-muted">{t("privacy")}</Link>
            <Link href="/verify/contoh" className="inline-flex min-h-[44px] items-center transition hover:text-muted">{t("terms")}</Link>
            <Link href="/verify/contoh" className="inline-flex min-h-[44px] items-center transition hover:text-muted">{t("verify")}</Link>
            <span className="font-mono text-[11px] text-faint">© 2026</span>
          </nav>
        </div>
      </div>
    </footer>
  );
}
