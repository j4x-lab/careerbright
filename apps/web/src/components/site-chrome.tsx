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
          <Link href="/roles" className="py-2 transition hover:text-ink">{t("roles")}</Link>
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

  // Lock the real scroller. `body` is the document scroller here, and the
  // panel itself is the only thing that should scroll while it is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Escape closes and returns focus to the control that opened it; Tab is
  // trapped inside the dialog so focus can't wander onto the page behind.
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const FOCUSABLE =
      'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      const items = [...panel.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
        (el) => el.offsetParent !== null
      );
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === first || !panel.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    // Move focus into the dialog once it exists.
    const first = panel?.querySelector<HTMLElement>(FOCUSABLE);
    first?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Leaving the lg breakpoint while open would otherwise leave an invisible
  // dialog mounted (and the body scroll-locked) with no toggle to close it.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

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
                  href="/roles"
                  className="hidden min-h-[44px] items-center gap-2 rounded-btn px-3 py-3 text-[13px] font-semibold text-muted transition hover:text-ink md:flex"
                >
                  <svg aria-hidden viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="7" cy="7" r="5" /><path d="m11 11 3 3" /></svg> {t("searchRoles")}
                </Link>
                <Link href="/auth/masuk" className="hidden min-h-[44px] items-center px-3 py-3 text-[14px] font-semibold text-muted transition hover:text-ink sm:flex">
                  {t("login")}
                </Link>
                <Link href={HOME_HASH("#pekerjaan")} className="btn-amber group min-h-[44px] whitespace-nowrap px-3.5 py-3 text-[13px] font-extrabold sm:px-5 sm:text-[14px]">
                  {t("exploreRoles")}
                  <span className="btn-island btn-island-dark hidden !h-6 !w-6 text-xs min-[420px]:inline-flex" aria-hidden><svg viewBox="0 0 12 12" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9 9 3M4 3h5v5" /></svg></span>
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
          role="dialog"
          aria-modal="true"
          aria-label={t("mainNav")}
          /* Sits under the header (z-40 vs z-50) so the close control stays
             reachable, and starts below it rather than behind it. */
          className="menu-panel fixed inset-x-0 bottom-0 top-[104px] z-40 bg-paper lg:hidden"
        >
          <nav
            aria-label={t("mainNav")}
            className="flex h-full flex-col justify-center gap-1 overflow-y-auto px-7 pb-8 pt-6"
          >
            {[
              ...NAV_LINKS.map(({ key, href }) => ({ label: t(key), href })),
              { label: t("login"), href: "/auth/masuk" as const },
            ].map(({ label, href }, i, arr) => {
              const isAccount = i === arr.length - 1;
              return (
                <Link
                  key={String(label) + i}
                  href={href}
                  onClick={() => setOpen(false)}
                  /* Visible by default. The old markup relied on .hero-enter,
                     which is opacity:0 until a CSS animation runs — inside a
                     dialog that is a bet on motion actually playing. */
                  style={{ ["--i" as string]: i }}
                  className={`menu-item ${
                    isAccount
                      ? "py-4 text-lg font-bold text-muted"
                      : "py-2 text-[40px] font-extrabold leading-[1.05] tracking-[-0.03em] text-ink"
                  }`}
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
              <Link href="/roles" onClick={() => setOpen(false)} className="btn-ghost min-h-[52px] flex-1 justify-center text-[15px]">
                {t("searchCta")}
              </Link>
              <Link href={HOME_HASH("#pekerjaan")} onClick={() => setOpen(false)} className="btn-amber group min-h-[52px] flex-1 justify-center text-[15px]">
                {t("exploreRoles")} <span className="btn-island btn-island-dark" aria-hidden><svg viewBox="0 0 12 12" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9 9 3M4 3h5v5" /></svg></span>
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
  { headKey: "colAccount", links: [{ key: "linkLogin", href: "/auth/masuk" as const }, { key: "linkSignup", href: "/auth/daftar" as const }, { key: "linkRoles", href: "/roles" as const }] },
] as const;

export function SiteFooter() {
  const t = useTranslations("footer");
  const nc = useTranslations("nav");
  return (
    <footer className="relative overflow-hidden border-t border-line bg-card">
      <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-16">
        <div className="mt-2 grid gap-10 md:grid-cols-6">
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
            <Link href="/roles" className="inline-flex min-h-[44px] items-center transition hover:text-muted">{t("linkRoles")}</Link>
            <span className="font-mono text-[11px] text-faint">© 2026</span>
          </nav>
        </div>
      </div>
    </footer>
  );
}
