"use client";

import { useEffect, useState } from "react";

// Floating island nav — detached pill, glass, hamburger morph to X on mobile.
export function SiteNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open ]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
        <nav
          aria-label="Navigasi utama"
          className="flex h-14 w-full max-w-3xl items-center justify-between rounded-full border border-white/10 bg-ink-950/80 py-2 pl-5 pr-2 backdrop-blur-xl"
        >
          <a href="/" className="font-mono text-[13px] font-bold tracking-tight">
            SUPER<span className="text-accent">BRIGHT</span>
            <span className="ml-2 hidden text-[10px] font-normal tracking-[0.22em] text-zinc-500 sm:inline">
              CAREER
            </span>
          </a>
          <div className="hidden items-center gap-6 text-[13px] text-zinc-400 md:flex">
            <a href="#jalur" className="transition hover:text-white">
              Jalur
            </a>
            <a href="#penilaian-ai" className="transition hover:text-white">
              Penilaian AI
            </a>
            <a href="#skkni" className="transition hover:text-white">
              SKKNI
            </a>
            <a href="#harga" className="transition hover:text-white">
              Harga
            </a>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/id/auth/masuk"
              className="hidden px-3 py-2 text-[13px] text-zinc-400 transition hover:text-white sm:block"
            >
              Masuk
            </a>
            <a
              href="/id/auth/daftar"
              className="btn-primary group px-5 py-2.5 text-[13px]"
            >
              Mulai Gratis
              <span className="btn-island !h-6 !w-6 text-xs">↗</span>
            </a>
            <button
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-label={open ? "Tutup menu" : "Buka menu"}
              className="relative flex h-9 w-9 items-center justify-center rounded-full border border-white/10 md:hidden"
            >
              <span
                className={`absolute h-px w-4 bg-white transition-all duration-300 ${
                  open ? "rotate-45" : "-translate-y-[3px]"
                }`}
              />
              <span
                className={`absolute h-px w-4 bg-white transition-all duration-300 ${
                  open ? "-rotate-45" : "translate-y-[3px]"
                }`}
              />
            </button>
          </div>
        </nav>
      </header>

      {open && (
        <div className="fixed inset-0 z-40 bg-ink-950/90 backdrop-blur-3xl md:hidden">
          <div className="flex min-h-[100dvh] flex-col justify-center gap-2 px-8">
            {[
              ["Jalur", "#jalur"],
              ["Penilaian AI", "#penilaian-ai"],
              ["SKKNI", "#skkni"],
              ["Harga", "#harga"],
              ["Masuk", "/id/auth/masuk"],
            ].map(([label, href], i) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                style={{ animationDelay: `${100 + i * 70}ms` }}
                className="hero-enter text-4xl font-bold tracking-tighter text-white"
              >
                {label}
              </a>
            ))}
            <a
              href="/id/auth/daftar"
              onClick={() => setOpen(false)}
              className="btn-primary group mt-6 w-max px-6 py-3.5"
            >
              Mulai Gratis
              <span className="btn-island">↗</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-xs text-zinc-500">
            CAREER SUPER<span className="text-accent">BRIGHT</span> © 2026
          </p>
          <p className="mt-2 max-w-[52ch] text-[13px] leading-relaxed text-zinc-500">
            Jalur berbasis peran, selaras SKKNI/KKNI, dinilai AI per rubrik. Kredensial
            terverifikasi untuk rekruter.
          </p>
        </div>
        <nav aria-label="Tautan legal" className="flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-zinc-400">
          <a href="/id/paths/ai-engineer" className="transition hover:text-white">
            Jalur
          </a>
          <a href="/id/verify/contoh" className="transition hover:text-white">
            Verifikasi
          </a>
          <a href="/id/dashboard" className="transition hover:text-white">
            Dasbor
          </a>
          <span className="font-mono text-[11px] text-zinc-600">SKKNI · OB 3.0 · W3C VC 2.0</span>
        </nav>
      </div>
    </footer>
  );
}
