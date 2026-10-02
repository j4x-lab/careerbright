"use client";

import { useEffect, useState } from "react";

/* Cerah v2 chrome — midnight utility bar + floating pill nav + mega footer.
   Single-line nav ≤72px, search entry to /id/katalog, WA CTA. */

function IdFlag() {
  return (
    <svg width="18" height="12" viewBox="0 0 18 12" aria-label="Bendera Indonesia" role="img">
      <rect width="18" height="6" fill="#E70011" />
      <rect y="6" width="18" height="6" fill="#FFFFFF" />
      <rect width="18" height="12" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
    </svg>
  );
}

export function IdNoticeBar() {
  return (
    <div className="border-b border-line bg-white">
      <div className="mx-auto flex h-9 w-full max-w-7xl items-center justify-between gap-4 px-4 font-mono text-[11px]">
        <p className="flex min-w-0 items-center gap-2 text-soft">
          <IdFlag />
          <span className="truncate">
            <strong className="font-bold text-amber-700">Bangga Buatan Indonesia</strong>
            <span className="hidden sm:inline"> · Konteks Indonesia · Data di Jakarta · QRIS / GoPay / VA</span>
            <span className="sm:hidden"> · Data di Jakarta</span>
          </span>
        </p>
        <nav aria-label="Tautan wilayah" className="hidden flex-none items-center gap-4 text-muted md:flex">
          <a href="#organisasi" className="transition hover:text-ink">Untuk Kampus</a>
          <a href="#organisasi" className="transition hover:text-ink">Untuk Perusahaan</a>
          <a href="/id/verify/contoh" className="transition hover:text-ink">Verifikasi</a>
          <span className="rounded-md border border-line px-2 py-0.5 text-soft">ID / EN</span>
        </nav>
        <span className="flex-none text-muted md:hidden">ID / EN</span>
      </div>
    </div>
  );
}

const NAV_LINKS: [string, string][] = [
  ["Peran", "#peran"],
  ["Jalur", "#jalur"],
  ["Kasus", "#kasus"],
  ["Bright AI", "#ai"],
  ["Bukti", "#bukti"],
  ["Harga", "#harga"],
];

export function SiteNav() {
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
                ? "mx-auto max-w-6xl rounded-2xl border border-line bg-white/85 shadow-[0_20px_60px_-24px_rgba(10,15,30,0.25)] backdrop-blur-2xl"
                : "border-b border-line bg-white/90 backdrop-blur-xl"
            }`}
          >
            <nav aria-label="Navigasi utama" className="mx-auto flex h-[68px] w-full max-w-7xl items-center justify-between gap-4 px-4">
              <a href="/" className="flex flex-none items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 font-mono text-[13px] font-bold text-white shadow-lg">
                  SB
                </span>
                <span className="text-[15px] font-extrabold tracking-tight text-ink">
                  SUPER<span className="text-brand-700">BRIGHT</span>
                </span>
                <span className="hidden font-mono text-[10px] tracking-[0.2em] text-faint xl:inline">ID</span>
              </a>
              <div className="hidden items-center gap-1 text-[13.5px] font-medium text-soft lg:flex">
                {NAV_LINKS.map(([label, href]) => (
                  <a key={href + label} href={href} className="rounded-lg px-3 py-2 transition hover:bg-paper hover:text-ink">
                    {label}
                  </a>
                ))}
              </div>
              <div className="flex flex-none items-center gap-2">
                <a
                  href="/id/katalog"
                  className="hidden items-center gap-2 rounded-xl border border-line bg-paper px-3.5 py-2 font-mono text-[12px] text-muted transition hover:border-ink hover:text-ink md:flex"
                >
                  <span aria-hidden>⌕</span> Cari peran…
                  <kbd className="rounded-md border border-line bg-white px-1.5 py-0.5 text-[10px]">/</kbd>
                </a>
                <a href="/id/auth/masuk" className="hidden px-3 py-2 text-[13.5px] font-medium text-soft transition hover:text-ink sm:block">
                  Masuk
                </a>
                <a href="/id/auth/daftar" className="btn-amber group px-4 py-2.5 text-[13px]">
                  Mulai Gratis
                  <span className="btn-island btn-island-dark !h-6 !w-6 text-xs">↗</span>
                </a>
                <button
                  onClick={() => setOpen(!open)}
                  aria-expanded={open}
                  aria-label={open ? "Tutup menu" : "Buka menu"}
                  className="relative flex h-9 w-9 items-center justify-center rounded-[12px] border border-line bg-paper lg:hidden"
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
            {[...NAV_LINKS, ["Masuk", "/id/auth/masuk"] as [string, string]].map(([label, href], i) => (
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
                Cari peran
              </a>
              <a href="/id/auth/daftar" onClick={() => setOpen(false)} className="btn-amber group flex-1 justify-center">
                Mulai Gratis <span className="btn-island btn-island-dark">↗</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const FOOTER_COLS: [string, [string, string][]][] = [
  ["Peran", [["Katalog Peran", "#peran"], ["Kasus Nyata", "#kasus"], ["Konteks Indonesia", "#konteks"], ["Bright AI", "#ai"]]],
  ["Bukti", [["Skill Graph", "#ai"], ["Portofolio Publik", "#bukti"], ["Sertifikat", "#bukti"], ["Verifikasi Publik", "/id/verify/contoh"]]],
  ["Organisasi", [["Bisnis", "#harga"], ["Pemerintah & ASN", "#organisasi"], ["Kampus", "#organisasi"], ["Instruktur", "#harga"]]],
  ["Perusahaan", [["Tentang", "#konten"], ["Karier", "#konten"], ["Kontak WA", "#organisasi"], ["Status Layanan", "#konten"]]],
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-white">
      <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-16">
        <div className="panel-warm flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between md:p-8">
          <div>
            <p className="eyebrow-light">Mulai malam ini · 15 menit</p>
            <p className="mt-2 max-w-[28ch] text-2xl font-bold leading-tight tracking-tight md:text-3xl">
              Peran → jalur → bukti → bisa.
            </p>
          </div>
          <div className="flex w-full max-w-md flex-col gap-2 sm:flex-row">
            <input placeholder="Nomor WhatsApp · 08xx" className="field" type="tel" aria-label="Nomor WhatsApp" />
            <a href="/id/auth/daftar" className="btn-amber flex-none justify-center px-5">
              Mulai Gratis
            </a>
          </div>
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-6">
          <div className="md:col-span-2">
            <p className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 font-mono text-[13px] font-bold text-white">
                SB
              </span>
              <span className="text-[15px] font-extrabold tracking-tight">
                SUPER<span className="text-brand-700">BRIGHT</span>
              </span>
            </p>
            <p className="mt-3 max-w-[36ch] text-[13px] leading-relaxed text-soft">
              Mau jadi apa setelah lulus? Pilih peran, ikuti jalur selaras SKKNI
              sampai portofolio dan sertifikat terverifikasi.
            </p>
            <p className="mt-4 flex items-center gap-2 font-mono text-[11px] text-muted">
              <IdFlag /> Buatan Indonesia · ID / EN · v0.2
            </p>
          </div>
          {FOOTER_COLS.map(([h, links]) => (
            <nav key={h} aria-label={h}>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">{h}</p>
              <ul className="mt-3 space-y-2 text-[13px] text-soft">
                {links.map(([l, href]) => (
                  <li key={l}>
                    <a href={href} className="transition hover:text-brand-700">{l}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 md:flex-row md:items-center md:justify-between">
          <p className="max-w-[70ch] font-mono text-[11px] leading-relaxed text-faint">
            PT Career SuperBright Indonesia · Jakarta Selatan, DKI Jakarta · Data di region Jakarta ·
            QRIS / GoPay / VA / Kartu · Dukungan WhatsApp ID/EN
          </p>
          <nav aria-label="Legal" className="flex flex-none flex-wrap gap-x-5 gap-y-2 text-[12px] text-muted">
            <a href="/id/verify/contoh" className="transition hover:text-ink">Privasi</a>
            <a href="/id/verify/contoh" className="transition hover:text-ink">Syarat</a>
            <a href="/id/verify/contoh" className="transition hover:text-ink">Verifikasi</a>
            <span className="font-mono text-[11px] text-faint">© 2026</span>
          </nav>
        </div>
      </div>
    </footer>
  );
}
