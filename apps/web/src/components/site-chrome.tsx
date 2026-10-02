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
    <div className="bg-ink2 text-white">
      <div className="mx-auto flex h-9 w-full max-w-7xl items-center justify-between gap-4 px-4 font-mono text-[11px]">
        <p className="flex min-w-0 items-center gap-2 text-white/80">
          <IdFlag />
          <span className="truncate">
            <strong className="font-bold text-amber-300">Bangga Buatan Indonesia</strong>
            <span className="hidden sm:inline"> · Konteks Indonesia · Data di Jakarta · QRIS / GoPay / VA</span>
            <span className="sm:hidden"> · Data di Jakarta</span>
          </span>
        </p>
        <nav aria-label="Tautan wilayah" className="hidden flex-none items-center gap-4 text-white/60 md:flex">
          <a href="#organisasi" className="transition hover:text-white">Untuk Kampus</a>
          <a href="#organisasi" className="transition hover:text-white">Untuk Perusahaan</a>
          <a href="/id/verify/contoh" className="transition hover:text-white">Verifikasi</a>
          <span className="rounded-md border border-white/15 px-2 py-0.5 text-white/80">ID / EN</span>
        </nav>
        <span className="flex-none text-white/60 md:hidden">ID / EN</span>
      </div>
    </div>
  );
}

const NAV_LINKS: [string, string][] = [
  ["Tujuan", "#tujuan"],
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
                ? "mx-auto max-w-6xl rounded-2xl border border-white/12 bg-ink2/85 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)] backdrop-blur-2xl"
                : "border-b border-white/10 bg-ink2/95 backdrop-blur-xl"
            }`}
          >
            <nav aria-label="Navigasi utama" className="mx-auto flex h-[68px] w-full max-w-7xl items-center justify-between gap-4 px-4">
              <a href="/" className="flex flex-none items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 font-mono text-[13px] font-bold text-white shadow-lg">
                  SB
                </span>
                <span className="text-[15px] font-extrabold tracking-tight text-white">
                  SUPER<span className="text-amber-300">BRIGHT</span>
                </span>
                <span className="hidden font-mono text-[10px] tracking-[0.2em] text-white/40 xl:inline">ID</span>
              </a>
              <div className="hidden items-center gap-1 text-[13.5px] font-medium text-white/70 lg:flex">
                {NAV_LINKS.map(([label, href]) => (
                  <a key={href + label} href={href} className="rounded-lg px-3 py-2 transition hover:bg-white/8 hover:text-white">
                    {label}
                  </a>
                ))}
              </div>
              <div className="flex flex-none items-center gap-2">
                <a
                  href="/id/katalog"
                  className="hidden items-center gap-2 rounded-xl border border-white/12 bg-white/6 px-3.5 py-2 font-mono text-[12px] text-white/60 transition hover:border-white/25 hover:text-white md:flex"
                >
                  <span aria-hidden>⌕</span> Cari skill…
                  <kbd className="rounded-md border border-white/15 px-1.5 py-0.5 text-[10px]">/</kbd>
                </a>
                <a href="/id/auth/masuk" className="hidden px-3 py-2 text-[13.5px] font-medium text-white/70 transition hover:text-white sm:block">
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
                  className="relative flex h-9 w-9 items-center justify-center rounded-[12px] border border-white/15 bg-white/6 lg:hidden"
                >
                  <span className={`absolute h-px w-4 bg-white transition-all duration-300 ${open ? "rotate-45" : "-translate-y-[3px]"}`} />
                  <span className={`absolute h-px w-4 bg-white transition-all duration-300 ${open ? "-rotate-45" : "translate-y-[3px]"}`} />
                </button>
              </div>
            </nav>
          </header>
        </div>
      </div>

      {open && (
        <div className="hero-dark fixed inset-0 z-40 lg:hidden">
          <div className="grid-dark absolute inset-0" aria-hidden />
          <div className="relative flex min-h-[100dvh] flex-col justify-center gap-1 px-8 pt-28">
            {[...NAV_LINKS, ["Masuk", "/id/auth/masuk"] as [string, string]].map(([label, href], i) => (
              <a
                key={href + label}
                href={href}
                onClick={() => setOpen(false)}
                style={{ animationDelay: `${80 + i * 55}ms` }}
                className="hero-enter border-b border-white/8 py-3 text-3xl font-bold tracking-tight text-white"
              >
                {label}
              </a>
            ))}
            <div className="mt-4 flex gap-3">
              <a href="/id/katalog" onClick={() => setOpen(false)} className="btn-dark flex-1 justify-center">
                Cari skill
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
  ["Belajar", [["Katalog Jalur", "#jalur"], ["Kasus Nyata", "#kasus"], ["Konteks Indonesia", "#konteks"], ["Bright AI", "#ai"]]],
  ["Bukti", [["Skill Graph", "#ai"], ["Portofolio Publik", "#bukti"], ["Sertifikat", "#bukti"], ["Verifikasi Publik", "/id/verify/contoh"]]],
  ["Organisasi", [["Bisnis", "#harga"], ["Pemerintah & ASN", "#organisasi"], ["Kampus", "#organisasi"], ["Instruktur", "#harga"]]],
  ["Perusahaan", [["Tentang", "#konten"], ["Karier", "#konten"], ["Kontak WA", "#organisasi"], ["Status Layanan", "#konten"]]],
];

export function SiteFooter() {
  return (
    <footer className="hero-dark relative overflow-hidden text-white">
      <div className="aurora-blob" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-16">
        <div className="glass-dark flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between md:p-8">
          <div>
            <p className="eyebrow-dark">Mulai malam ini · 15 menit</p>
            <p className="mt-2 max-w-[28ch] text-2xl font-bold leading-tight md:text-3xl">
              Tujuan → belajar → bangun → bisa.
            </p>
          </div>
          <div className="flex w-full max-w-md flex-col gap-2 sm:flex-row">
            <input placeholder="Nomor WhatsApp · 08xx" className="field field-dark" type="tel" aria-label="Nomor WhatsApp" />
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
                SUPER<span className="text-amber-300">BRIGHT</span>
              </span>
            </p>
            <p className="mt-3 max-w-[36ch] text-[13px] leading-relaxed text-white/60">
              Dari Belajar Jadi Bisa. Skill praktis konteks Indonesia untuk pelajar,
              profesional, UMKM, ASN, dan perusahaan.
            </p>
            <p className="mt-4 flex items-center gap-2 font-mono text-[11px] text-white/50">
              <IdFlag /> Buatan Indonesia · ID / EN · v0.2
            </p>
          </div>
          {FOOTER_COLS.map(([h, links]) => (
            <nav key={h} aria-label={h}>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">{h}</p>
              <ul className="mt-3 space-y-2 text-[13px] text-white/70">
                {links.map(([l, href]) => (
                  <li key={l}>
                    <a href={href} className="transition hover:text-amber-300">{l}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="max-w-[70ch] font-mono text-[11px] leading-relaxed text-white/40">
            PT Career SuperBright Indonesia · Jakarta Selatan, DKI Jakarta · Data di region Jakarta ·
            QRIS / GoPay / VA / Kartu · Dukungan WhatsApp ID/EN
          </p>
          <nav aria-label="Legal" className="flex flex-none flex-wrap gap-x-5 gap-y-2 text-[12px] text-white/50">
            <a href="/id/verify/contoh" className="transition hover:text-white">Privasi</a>
            <a href="/id/verify/contoh" className="transition hover:text-white">Syarat</a>
            <a href="/id/verify/contoh" className="transition hover:text-white">Verifikasi</a>
            <span className="font-mono text-[11px] text-white/30">© 2026</span>
          </nav>
        </div>
      </div>
    </footer>
  );
}
