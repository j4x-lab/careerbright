"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

/* Cerah v2 chrome — midnight utility bar + floating pill nav + mega footer.
   Single-line nav ≤72px, search entry to /id/katalog, WA CTA.
   Landing anchors use /#… form so they resolve from any route. */

function IdFlag({ label }: { label: string }) {
  return (
    <svg width="18" height="12" viewBox="0 0 18 12" aria-label={label} role="img">
      <rect width="18" height="6" fill="#E70011" />
      <rect y="6" width="18" height="6" fill="#FFFFFF" />
      <rect width="18" height="12" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
    </svg>
  );
}

export function IdNoticeBar() {
  const t = useTranslations("nav");
  const c = useTranslations("common");
  return (
    <div className="border-b border-line bg-card">
      <div className="mx-auto flex h-11 w-full max-w-7xl items-center justify-between gap-4 px-4 font-mono text-[12px]">
        <p className="flex min-w-0 items-center gap-2 text-soft">
          <IdFlag label={t("flag")} />
          <span className="truncate">
            <strong className="font-bold text-signal-strong">{t("madeIn")}</strong>
            <span className="hidden sm:inline"> · {t("dataJakarta")}</span>
            <span className="sm:hidden"> · {t("dataJakarta")}</span>
          </span>
        </p>
        <nav aria-label={t("region")} className="hidden flex-none items-center gap-4 text-muted md:flex">
          <a href="/#siap" className="transition hover:text-ink">{t("forCampus")}</a>
          <a href="/#siap" className="transition hover:text-ink">{t("forEmployers")}</a>
          <a href="/id/verify/contoh" className="transition hover:text-ink">{t("verify")}</a>
          <span className="rounded-md border border-line px-2 py-1 text-soft">{c("langToggle")}</span>
        </nav>
        <span className="flex-none text-muted md:hidden">{c("langToggle")}</span>
      </div>
    </div>
  );
}

const NAV_LINKS = [
  { key: "roles", href: "/#pekerjaan" },
  { key: "howItWorks", href: "/#cara-kerja" },
] as const;

export function SiteNav() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
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
                ? "mx-auto max-w-6xl rounded-2xl border border-line bg-card/85 shadow-[0_20px_60px_-24px_rgba(10,17,40,0.25)] backdrop-blur-2xl"
                : "border-b border-line bg-card/90 backdrop-blur-xl"
            }`}
          >
            <nav aria-label={t("mainNav")} className="mx-auto flex h-[68px] w-full max-w-7xl items-center justify-between gap-4 px-4">
              <a href="/" className="flex flex-none items-center gap-2.5 py-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-700 font-mono text-[13px] font-bold text-white shadow-lg">
                  CS
                </span>
                <span className="hidden text-[15px] font-extrabold tracking-tight text-ink min-[420px]:inline">
                  Career <span className="text-brand-700">SuperBright</span>
                </span>
                <span className="hidden font-mono text-[10px] tracking-[0.2em] text-faint xl:inline">ID</span>
              </a>
              <div className="hidden items-center gap-1 text-[13.5px] font-medium text-soft lg:flex">
                {NAV_LINKS.map(({ key, href }) => (
                  <a key={href + key} href={href} className="rounded-lg px-3 py-3 transition hover:bg-paper hover:text-ink">
                    {t(key)}
                  </a>
                ))}
              </div>
              <div className="flex flex-none items-center gap-2">
                <a
                  href="/id/katalog"
                  className="hidden items-center gap-2 rounded-xl border border-line bg-paper px-3.5 py-3 font-mono text-[13px] text-muted transition hover:border-ink hover:text-ink md:flex"
                >
                  <span aria-hidden>⌕</span> {t("searchRoles")}
                  <kbd className="rounded-md border border-line bg-card px-1.5 py-1 text-[11px]">/</kbd>
                </a>
                <a href="/id/auth/masuk" className="hidden px-3 py-3 text-[13.5px] font-medium text-soft transition hover:text-ink sm:block">
                  {t("login")}
                </a>
                <a href="/#pekerjaan" className="btn-amber group px-4 py-3 text-[13px]">
                  {t("exploreRoles")}
                  <span className="btn-island btn-island-dark !h-6 !w-6 text-xs">↗</span>
                </a>
                <button
                  onClick={() => setOpen(!open)}
                  aria-expanded={open}
                  aria-label={open ? t("closeMenu") : t("openMenu")}
                  className="relative flex h-11 w-11 flex-none items-center justify-center rounded-input border border-line bg-paper lg:hidden"
                >
                  <span className={`absolute h-px w-4 bg-ink transition-all duration-300 ${open ? "rotate-45" : "-translate-y-[3px]"}`} />
                  <span className={`absolute h-px w-4 bg-ink transition-all duration-300 ${open ? "-rotate-45" : "translate-y-[3px]"}`} />
                </button>
              </div>
            </nav>
          </header>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-40 bg-paper lg:hidden">
          <div className="relative flex min-h-[100dvh] flex-col justify-center gap-1 px-8 pt-28">
            {[...NAV_LINKS.map(({ key, href }) => ({ label: t(key), href })), { label: t("login"), href: "/id/auth/masuk" }].map(({ label, href }, i) => (
              <a
                key={href + label}
                href={href}
                onClick={() => setOpen(false)}
                style={{ animationDelay: `${80 + i * 55}ms` }}
                className="hero-enter border-b border-line py-3 text-3xl font-bold tracking-tight text-ink"
              >
                {label}
              </a>
            ))}
            <div className="mt-4 flex gap-3">
              <a href="/id/katalog" onClick={() => setOpen(false)} className="btn-ghost flex-1 justify-center">
                {t("searchCta")}
              </a>
              <a href="/#pekerjaan" onClick={() => setOpen(false)} className="btn-amber group flex-1 justify-center">
                {t("exploreRoles")} <span className="btn-island btn-island-dark">↗</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const FOOTER_COLS = [
  { headKey: "colProduct", links: [{ key: "linkExplore", href: "/#pekerjaan" }, { key: "linkHow", href: "/#cara-kerja" }, { key: "linkStart", href: "/#siap" }] },
  { headKey: "colAccount", links: [{ key: "linkLogin", href: "/id/auth/masuk" }, { key: "linkSignup", href: "/id/auth/daftar" }, { key: "linkVerify", href: "/id/verify/contoh" }] },
] as const;

export function SiteFooter() {
  const t = useTranslations("footer");
  const nc = useTranslations("nav");
  const c = useTranslations("common");
  return (
    <footer className="relative overflow-hidden border-t border-line bg-card">
      <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-16">
        <div className="panel-warm flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between md:p-8">
          <div>
            <p className="eyebrow-light">{t("ctaEyebrow")}</p>
            <p className="mt-2 max-w-[28ch] text-2xl font-bold leading-tight tracking-tight md:text-3xl">
              {t("ctaTitle")}
            </p>
          </div>
          <div className="flex w-full max-w-md flex-col gap-2 sm:flex-row sm:items-center">
            <a href="/id/auth/daftar" className="btn-amber flex-none justify-center px-5">
              {t("ctaButton")}
            </a>
            <p className="font-mono text-[11px] leading-relaxed text-muted">
              {t("ctaNote")}
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-6">
          <div className="md:col-span-2">
            <p className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-700 font-mono text-[13px] font-bold text-white">
                CS
              </span>
              <span className="text-[15px] font-extrabold tracking-tight">
                Career <span className="text-brand-700">SuperBright</span>
              </span>
            </p>
            <p className="mt-3 max-w-[36ch] text-[13px] leading-relaxed text-soft">
              {t("tagline")}
            </p>
            <p className="mt-4 flex items-center gap-2 font-mono text-[11px] text-muted">
              <IdFlag label={nc("flag")} /> {t("madeLine")}
            </p>
          </div>
          {FOOTER_COLS.map(({ headKey, links }) => (
            <nav key={headKey} aria-label={t(headKey)}>
              <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-faint">{t(headKey)}</p>
              <ul className="mt-3 space-y-2 text-[13px] text-soft">
                {links.map(({ key, href }) => (
                  <li key={key}>
                    <a href={href} className="transition hover:text-brand-700 px-3 py-1">{t(key)}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 md:flex-row md:items-center md:justify-between">
          <p className="max-w-[70ch] font-mono text-[12px] leading-relaxed text-faint">
            {t("legalLine")}
          </p>
          <nav aria-label={t("legal")} className="flex flex-none flex-wrap gap-x-5 gap-y-2 text-[12px] text-muted">
            <a href="/id/verify/contoh" className="transition hover:text-ink px-3 py-1">{t("privacy")}</a>
            <a href="/id/verify/contoh" className="transition hover:text-ink px-3 py-1">{t("terms")}</a>
            <a href="/id/verify/contoh" className="transition hover:text-ink px-3 py-1">{t("verify")}</a>
            <span className="font-mono text-[12px] text-faint">© 2026</span>
          </nav>
        </div>
      </div>
    </footer>
  );
}
