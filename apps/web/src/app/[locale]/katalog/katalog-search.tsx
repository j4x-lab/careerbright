"use client";

import { useMemo, useState } from "react";
import { searchCatalog, type CatalogCategory, type CatalogItem, type CatalogKind } from "@/lib/catalog";

/* §29 Search/Discovery — client filter over the real catalog index. */

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
      className={`rounded-md px-2 py-0.5 font-mono text-[10px] font-bold ${
        verified ? "bg-brand-50 text-brand-700" : "bg-paper text-muted"
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
      <div className="rounded-[20px] border border-line bg-white p-5">
        <label htmlFor="cari" className="text-[13px] font-bold">Cari kursus, skill, atau jalur</label>
        <input
          id="cari"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Contoh: interview, pajak, React…"
          className="field mt-2"
          autoComplete="off"
        />
        <div className="mt-4 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              aria-pressed={category === c}
              className={`rounded-[10px] border px-3 py-1.5 text-[13px] font-medium transition ${
                category === c ? "border-brand-700 bg-brand-50 text-brand-700" : "border-line bg-paper text-soft"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {KINDS.map((k) => (
            <button
              key={k.v}
              onClick={() => setKind(k.v)}
              aria-pressed={kind === k.v}
              className={`rounded-[10px] border px-3 py-1.5 font-mono text-[11px] transition ${
                kind === k.v ? "border-brand-700 bg-brand-50 text-brand-700" : "border-line bg-paper text-soft"
              }`}
            >
              {k.label}
            </button>
          ))}
          <button
            onClick={() => setKonteksOnly(!konteksOnly)}
            aria-pressed={konteksOnly}
            className={`rounded-[10px] border px-3 py-1.5 font-mono text-[11px] transition ${
              konteksOnly ? "border-brand-700 bg-brand-50 text-brand-700" : "border-line bg-paper text-soft"
            }`}
          >
            Konteks ID ✓
          </button>
        </div>
      </div>

      <p className="tnum mt-6 font-mono text-[12px] text-muted" role="status">
        {results.length} hasil{ q.trim() && <> untuk “{q.trim()}”</>}
      </p>

      {results.length === 0 ? (
        <div className="mt-4 rounded-[20px] border border-dashed border-line bg-white p-10 text-center">
          <p className="text-[15px] font-bold">Tidak ketemu yang cocok</p>
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
              <a href={r.href} className="spot flex h-full flex-col rounded-[20px] border border-line bg-white p-6">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
                    {r.kind === "kursus" ? "Kursus" : "Jalur"} · {r.category}
                  </span>
                  <Badge label={r.badge} />
                </div>
                <p className="mt-2 text-[16px] font-bold">{r.title}</p>
                <p className="mt-1 flex-1 text-sm leading-relaxed text-soft">{r.desc}</p>
                <p className="tnum mt-3 font-mono text-[11px] text-muted">{r.level} · {r.meta}</p>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
