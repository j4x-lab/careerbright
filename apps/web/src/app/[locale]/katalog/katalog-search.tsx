"use client";

import { useMemo, useState } from "react";
import { searchCatalog, type CatalogCategory, type CatalogItem, type CatalogKind } from "@/lib/catalog";

/* Cerah v2 — command-bar search + card grid v2. */

const CATEGORIES: (CatalogCategory | "Semua")[] = ["Semua", "Teknologi", "Karier", "Bisnis", "Indonesia"];
const KINDS: { v: CatalogKind | "Semua"; label: string }[] = [
  { v: "Semua", label: "Semua" },
  { v: "kursus", label: "Kursus" },
  { v: "jalur", label: "Jalur" },
];

function Badge({ label }: { label: CatalogItem["badge"] }) {
  const verified = label === "SuperBright Verified";
  return (
    <span
      className={`rounded-full px-2.5 py-1 font-mono text-[10px] font-bold ${
        verified ? "bg-brand-50 text-brand-700" : "bg-cream text-muted"
      }`}
    >
      {verified ? "✓ Verified" : label}
    </span>
  );
}

export function KatalogSearch() {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState<CatalogCategory | "Semua">("Semua");
  const [kind, setKind] = useState<CatalogKind | "Semua">("Semua");
  const [konteksOnly, setKonteksOnly] = useState(false);

  const results = useMemo(() => searchCatalog(q, category, kind, konteksOnly), [q, category, kind, konteksOnly]);

  return (
    <div>
      <div className="panel overflow-hidden">
        <div className="border-b border-line bg-paper px-5 py-4 md:px-6">
          <label htmlFor="cari" className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-700">
            Cari peran, jalur, atau kursus
          </label>
          <div className="relative mt-2.5">
            <span aria-hidden className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-faint">⌕</span>
            <input
              id="cari"
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Contoh: Data Analyst, Akuntan, Barber…"
              className="field !pl-11 !py-3.5 !text-[15px]"
              autoComplete="off"
            />
          </div>
        </div>
        <div className="px-5 py-4 md:px-6">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                aria-pressed={category === c}
                className={`chip transition ${category === c ? "chip-on" : "hover:border-ink"}`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="mt-2.5 flex flex-wrap items-center gap-2">
            {KINDS.map((k) => (
              <button
                key={k.v}
                onClick={() => setKind(k.v)}
                aria-pressed={kind === k.v}
                className={`rounded-[10px] border px-3 py-1.5 font-mono text-[11px] transition ${
                  kind === k.v ? "border-brand-700 bg-brand-50 font-bold text-brand-700" : "border-line bg-paper text-soft hover:border-ink"
                }`}
              >
                {k.label}
              </button>
            ))}
            <button
              onClick={() => setKonteksOnly(!konteksOnly)}
              aria-pressed={konteksOnly}
              className={`rounded-[10px] border px-3 py-1.5 font-mono text-[11px] transition ${
                konteksOnly ? "border-brand-700 bg-brand-50 font-bold text-brand-700" : "border-line bg-paper text-soft hover:border-ink"
              }`}
            >
              Konteks ID ✓
            </button>
          </div>
        </div>
      </div>

      <p className="tnum mt-6 font-mono text-[12px] text-muted" role="status">
        {results.length} hasil{ q.trim() && <> untuk “{q.trim()}”</>}
      </p>

      {results.length === 0 ? (
        <div className="panel-warm mt-4 border-dashed p-10 text-center">
          <p className="text-lg font-extrabold tracking-tight">Tidak ketemu yang cocok</p>
          <p className="mx-auto mt-2 max-w-[44ch] text-sm text-soft">
            Coba kata kunci lebih pendek (“pajak”, “CV”, “data”) atau reset filter di atas.
          </p>
          <button
            onClick={() => { setQ(""); setCategory("Semua"); setKind("Semua"); setKonteksOnly(false); }}
            className="btn-ghost mt-5 px-5 py-2.5 text-[13px]"
          >
            Reset pencarian
          </button>
        </div>
      ) : (
        <ul className="mt-4 grid gap-4 md:grid-cols-2">
          {results.map((r) => (
            <li key={`${r.kind}-${r.slug}`}>
              <a href={r.href} className="spot flex h-full flex-col rounded-[24px] border border-line bg-white p-6 md:p-7">
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-lg bg-ink px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-white">
                    {r.kind === "kursus" ? "Kursus" : "Jalur"}
                  </span>
                  <Badge label={r.badge} />
                </div>
                <p className="mt-3 text-lg font-extrabold tracking-tight">{r.title}</p>
                <p className="mt-1 flex-1 text-sm leading-relaxed text-soft">{r.desc}</p>
                <div className="mt-4 flex items-center justify-between border-t border-line pt-3.5">
                  <p className="tnum font-mono text-[11px] text-muted">{r.category} · {r.level}</p>
                  <span aria-hidden className="font-mono text-[13px] text-brand-700">→</span>
                </div>
                <p className="tnum mt-1 font-mono text-[11px] text-faint">{r.meta}</p>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
