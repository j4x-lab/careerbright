"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { searchCatalog, type CatalogCategory, type CatalogItem, type CatalogKind } from "@/lib/catalog";

/* Cerah v2 — command-bar search + card grid v2. */

const CATEGORIES: (CatalogCategory | "Semua")[] = ["Semua", "Teknologi", "Karier", "Bisnis", "Indonesia"];
const CAT_KEYS = ["catAll", "catTech", "catCareer", "catBiz", "catId"] as const;
const KINDS: { v: CatalogKind | "Semua"; key: string }[] = [
  { v: "Semua", key: "kindAll" },
  { v: "kursus", key: "kindCourse" },
  { v: "jalur", key: "kindPath" },
];

function Badge({ label }: { label: CatalogItem["badge"] }) {
  const t = useTranslations("katalog");
  const verified = label === "SuperBright Verified";
  return (
    <span
      className={`rounded-full px-2.5 py-1 font-mono text-[10px] font-bold ${
        verified ? "bg-brand-50 text-brand-700" : "bg-cream text-muted"
      }`}
    >
      {verified ? t("verifiedBadge") : t("community")}
    </span>
  );
}

export function KatalogSearch() {
  const t = useTranslations("katalog");
  const locale = useLocale();
  const [q, setQ] = useState("");
  const [category, setCategory] = useState<CatalogCategory | "Semua">("Semua");
  const [kind, setKind] = useState<CatalogKind | "Semua">("Semua");
  const [konteksOnly, setKonteksOnly] = useState(false);

  const catLabel: Record<string, string> = {
    Semua: t("catAll"),
    Teknologi: t("catTech"),
    Karier: t("catCareer"),
    Bisnis: t("catBiz"),
    Indonesia: t("catId"),
  };

  const results = useMemo(() => searchCatalog(q, category, kind, konteksOnly, locale), [q, category, kind, konteksOnly, locale]);

  return (
    <div>
      <div className="panel overflow-hidden">
        <div className="border-b border-line bg-paper px-5 py-4 md:px-6">
          <label htmlFor="cari" className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-700">
            {t("searchLabel")}
          </label>
          <div className="relative mt-2.5">
            <span aria-hidden className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-faint">⌕</span>
            <input
              id="cari"
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t("searchPh")}
              className="field !pl-11 !py-3.5 !text-[15px]"
              autoComplete="off"
            />
          </div>
        </div>
        <div className="px-5 py-4 md:px-6">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c, i) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                aria-pressed={category === c}
                className={`chip min-h-[44px] transition ${category === c ? "chip-on" : "hover:border-ink"}`}
              >
                {t(CAT_KEYS[i])}
              </button>
            ))}
          </div>
          <div className="mt-2.5 flex flex-wrap items-center gap-2">
            {KINDS.map((k) => (
              <button
                key={k.v}
                onClick={() => setKind(k.v)}
                aria-pressed={kind === k.v}
                className={`inline-flex min-h-[44px] items-center rounded-full border px-4 font-mono text-[12px] transition ${
                  kind === k.v ? "border-brand-700 bg-brand-50 font-bold text-brand-700" : "border-line bg-paper text-soft hover:border-ink"
                }`}
              >
                {t(k.key)}
              </button>
            ))}
            <button
              onClick={() => setKonteksOnly(!konteksOnly)}
              aria-pressed={konteksOnly}
                className={`inline-flex min-h-[44px] items-center rounded-full border px-4 font-mono text-[12px] transition ${
                konteksOnly ? "border-brand-700 bg-brand-50 font-bold text-brand-700" : "border-line bg-paper text-soft hover:border-ink"
              }`}
            >
              {t("konteks")}
            </button>
          </div>
        </div>
      </div>

      <p className="tnum mt-6 font-mono text-[12px] text-muted" role="status">
        {t("results", { n: results.length })}{q.trim() && <> {t("resultsFor", { q: q.trim() })}</>}
      </p>

      {results.length === 0 ? (
        <div className="panel-warm mt-4 border-dashed p-10 text-center">
          <p className="text-lg font-extrabold tracking-tight">{t("emptyTitle")}</p>
          <p className="mx-auto mt-2 max-w-[44ch] text-sm text-soft">
            {t("emptyHint")}
          </p>
          <button
            onClick={() => { setQ(""); setCategory("Semua"); setKind("Semua"); setKonteksOnly(false); }}
            className="btn-ghost mt-5 min-h-[44px] px-5 py-2.5 text-[13px]"
          >
            {t("resetBtn")}
          </button>
        </div>
      ) : (
        <ul className="mt-4 grid gap-4 md:grid-cols-2">
          {results.map((r) => (
            <li key={`${r.kind}-${r.slug}`}>
              <Link href={r.href} className="spot flex h-full flex-col rounded-card border border-line bg-card p-6 md:p-7">
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full border border-line bg-paper px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-soft">
                    {r.kind === "kursus" ? t("kindCourse") : t("kindPath")}
                  </span>
                  <Badge label={r.badge} />
                </div>
                <p className="mt-3 text-lg font-extrabold tracking-tight">{r.title}</p>
                <p className="mt-1 flex-1 text-sm leading-relaxed text-soft">{r.desc}</p>
                <div className="mt-4 flex items-center justify-between border-t border-line pt-3.5">
                  <p className="tnum font-mono text-[11px] text-muted">{catLabel[r.category] ?? r.category} · {r.level}</p>
                  <span aria-hidden className="font-mono text-[13px] text-brand-700">→</span>
                </div>
                <p className="tnum mt-1 font-mono text-[11px] text-faint">{r.meta}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
