"use client";

import { useEffect, useState } from "react";

/*
 * Rubber-duck review (with Duck):
 * Q: "Does an enterprise buyer trust this in 10 seconds?"
 * A: No — old nav hid the PT entity, no data-residency, no SKKNI proof above fold.
 * Fix: persistent ID notice bar + PT footer + compliance strip under hero.
 * Q: "Is 'Bangga Buatan Indonesia' just a slogan?"
 * A: It must be verifiable: SKKNI codes, TUK cities, Jakarta DB region,
 *    QRIS/GoPay/VA, ID/EN, WA support. So the notice lists proof, not praise.
 * Q: "Microsoft-style or campus-style?"
 * A: Microsoft: utility strip, flat nav 64px, static logo row, 4-col solutions,
 *    spec table, sitemap footer. No marquee, no sticky-stack, no HOT pills.
 * Fix pass 2026-10-01 (duck audit #2): notice bar reworded to PRD2 vocab
 * (Konteks Indonesia, no SKKNI), footer links point at real anchors.
 * Fix pass 2026-10-01 (duck audit #3): use-case-first framing, Kasus section
 * with professional visuals, trimmed intros, student-warm microcopy.
 * Fix pass 2026-10-01 (duck audit #4): decluttered (featured verify panel,
 * trimmed), Svaroski-subtle motion (no blur, ≤600ms), all-local Pexels visuals.
 */

function IdFlag() {
  return (
    <svg width="18" height="12" viewBox="0 0 18 12" aria-label="Bendera Indonesia" role="img">
      <rect width="18" height="6" fill="#E70011" />
      <rect y="6" width="18" height="6" fill="#FFFFFF" />
      <rect width="18" height="12" fill="none" stroke="rgba(12,17,29,0.2)" strokeWidth="1" />
    </svg>
  );
}

export function IdNoticeBar() {
  return (
    <div className="border-b border-line bg-brand-50">
      <div className="mx-auto flex h-8 w-full max-w-7xl items-center justify-between gap-4 px-4 font-mono text-[11px]">
        <p className="flex min-w-0 items-center gap-2 text-soft">
          <IdFlag />
          <span className="truncate">
            <strong className="font-bold text-ink">Bangga Buatan Indonesia</strong>
            <span className="hidden sm:inline"> · Konteks Indonesia · Data di Jakarta · QRIS / GoPay / VA</span>
            <span className="sm:hidden"> · Data di Jakarta</span>
          </span>
        </p>
        <nav aria-label="Tautan wilayah" className="hidden flex-none items-center gap-4 text-muted md:flex">
          <a href="#organisasi" className="transition hover:text-ink">Untuk Kampus</a>
          <a href="#organisasi" className="transition hover:text-ink">Untuk Perusahaan</a>
          <a href="/id/verify/contoh" className="transition hover:text-ink">Verifikasi</a>
          <span className="text-faint">ID / EN</span>
        </nav>
        <span className="flex-none text-muted md:hidden">ID / EN</span>
      </div>
    </div>
  );
}

// Enterprise top bar — Microsoft-style: flat, 64px, single line, no pill.
export function SiteNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-50">
        <IdNoticeBar />
        <header className="border-b border-line bg-white/90 backdrop-blur-xl">
          <nav
            aria-label="Navigasi utama"
            className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-6 px-4"
          >
            <a href="/" className="flex-none text-[15px] font-extrabold tracking-tight text-ink">
              SUPER<span className="text-brand-700">BRIGHT</span>
              <span className="ml-2 hidden font-mono text-[10px] font-normal tracking-[0.18em] text-muted lg:inline">
                INDONESIA
              </span>
            </a>
            <div className="hidden items-center gap-6 text-[13.5px] font-medium text-soft lg:flex">
              <a href="#tujuan" className="transition hover:text-ink">Tujuan</a>
              <a href="#jalur" className="transition hover:text-ink">Jalur</a>
              <a href="#kasus" className="transition hover:text-ink">Kasus</a>
              <a href="#konteks" className="transition hover:text-ink">Konteks ID</a>
              <a href="#ai" className="transition hover:text-ink">Bright AI</a>
              <a href="#harga" className="transition hover:text-ink">Harga</a>
            </div>
            <div className="flex flex-none items-center gap-2">
              <a
                href="/id/auth/masuk"
                className="hidden px-3 py-2 text-[13.5px] font-medium text-soft transition hover:text-ink sm:block"
              >
                Masuk
              </a>
              <a href="/id/auth/daftar" className="btn-primary group px-4 py-2.5 text-[13px]">
                Mulai Gratis
                <span className="btn-island !h-6 !w-6 text-xs">↗</span>
              </a>
              <button
                onClick={() => setOpen(!open)}
                aria-expanded={open}
                aria-label={open ? "Tutup menu" : "Buka menu"}
                className="relative flex h-9 w-9 items-center justify-center rounded-[10px] border border-line bg-white lg:hidden"
              >
                <span className={`absolute h-px w-4 bg-ink transition-all duration-300 ${open ? "rotate-45" : "-translate-y-[3px]"}`} />
                <span className={`absolute h-px w-4 bg-ink transition-all duration-300 ${open ? "-rotate-45" : "translate-y-[3px]"}`} />
              </button>
            </div>
          </nav>
        </header>
      </div>

      {open && (
        <div className="fixed inset-0 z-40 bg-white/95 backdrop-blur-2xl lg:hidden">
          <div className="flex min-h-[100dvh] flex-col justify-center gap-2 px-8 pt-24">
            {[
              ["Tujuan", "#tujuan"],
              ["Jalur", "#jalur"],
              ["Kasus", "#kasus"],
              ["Konteks ID", "#konteks"],
              ["Bright AI", "#ai"],
              ["Harga", "#harga"],
              ["Masuk", "/id/auth/masuk"],
            ].map(([label, href], i) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                style={{ animationDelay: `${100 + i * 60}ms` }}
                className="hero-enter text-3xl font-bold tracking-tight text-ink"
              >
                {label}
              </a>
            ))}
            <a href="/id/auth/daftar" onClick={() => setOpen(false)} className="btn-primary group mt-6 w-max px-5 py-3.5">
              Mulai Gratis
              <span className="btn-island">↗</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
}

const FOOTER_COLS: [string, [string, string][]][] = [
  ["Belajar", [["Katalog Jalur", "#jalur"], ["Konteks Indonesia", "#konteks"], ["Bright AI", "#ai"], ["Komunitas Kota", "#organisasi"]]],
  ["Bukti", [["Skill Graph", "#ai"], ["Portofolio Publik", "#bukti"], ["Sertifikat", "#bukti"], ["Verifikasi Publik", "/id/verify/contoh"]]],
  ["Organisasi", [["Bisnis", "#harga"], ["Pemerintah & ASN", "#organisasi"], ["Kampus", "#organisasi"], ["Instruktur", "#harga"]]],
  ["Perusahaan", [["Tentang", "#konten"], ["Karier", "#konten"], ["Kontak WA", "#organisasi"], ["Status Layanan", "#konten"]]],
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-10 md:grid-cols-6">
          <div className="md:col-span-2">
            <p className="text-[15px] font-extrabold tracking-tight">
              SUPER<span className="text-brand-700">BRIGHT</span>
            </p>
            <p className="mt-3 max-w-[36ch] text-[13px] leading-relaxed text-muted">
              Dari Belajar Jadi Bisa. Platform skill praktis konteks Indonesia untuk
              pelajar, profesional, UMKM, ASN, dan perusahaan.
            </p>
            <p className="mt-4 flex items-center gap-2 font-mono text-[11px] text-muted">
              <IdFlag /> Buatan Indonesia · ID / EN
            </p>
          </div>
          {FOOTER_COLS.map(([h, links]) => (
            <nav key={h} aria-label={h}>
              <p className="text-[13px] font-bold">{h}</p>
              <ul className="mt-3 space-y-2 text-[13px] text-soft">
                {links.map(([l, href]) => (
                  <li key={l}>
                    <a href={href} className="transition hover:text-ink">{l}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 md:flex-row md:items-center md:justify-between">
          <p className="max-w-[70ch] font-mono text-[11px] leading-relaxed text-faint">
            PT Career SuperBright Indonesia · Jakarta Selatan, DKI Jakarta · Data di region Jakarta ·
            Pembayaran QRIS / GoPay / VA / Kartu · Dukungan WhatsApp ID/EN
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
