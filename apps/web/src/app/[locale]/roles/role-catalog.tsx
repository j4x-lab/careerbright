"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { EmptyState } from "@/components/empty-state";
import {
  ROLE_CATEGORIES,
  getScenariosForRole,
  searchRoles,
  type RoleCategory,
} from "@/lib/discovery";

/* Role directory — search plus one category filter row. Cards carry the role
   title, industry, one-sentence real job description, tool count and scenario
   count. Salary ranges and Major/Work-Style filters are intentionally absent:
   the PRD schema has no salary field and no major/work-style field, and those
   numbers must come from real market data, not invention. */

const CAT_KEYS: Record<RoleCategory | "Semua", string> = {
  Semua: "catAll",
  "Tech & Product": "catTech",
  "Creative & Marketing": "catCreative",
  "Business & Operations": "catBiz",
  "Finance & Banking": "catFinance",
  "Future & AI": "catFuture",
};

export function RoleCatalog({ lockedIds = [] }: { lockedIds?: string[] }) {
  return (
    <Suspense>
      <RoleCatalogInner lockedIds={lockedIds} />
    </Suspense>
  );
}

function RoleCatalogInner({ lockedIds }: { lockedIds: string[] }) {
  const t = useTranslations("roles");
  const initialQ = useSearchParams().get("q") ?? "";
  const [q, setQ] = useState(initialQ);
  const [category, setCategory] = useState<RoleCategory | "Semua">("Semua");

  const results = useMemo(
    () => searchRoles({ q, category }),
    [q, category]
  );

  return (
    <div>
      <div className="panel overflow-hidden">
        <div className="border-b border-line bg-paper px-5 py-4 md:px-6">
          <label htmlFor="cari-peran" className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-700">
            {t("searchLabel")}
          </label>
          <div className="relative mt-2.5">
            <svg aria-hidden viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-faint"><circle cx="7" cy="7" r="5" /><path d="m11 11 3 3" /></svg>
            <input
              id="cari-peran"
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
            {(["Semua", ...ROLE_CATEGORIES] as const).map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                aria-pressed={category === c}
                className={`chip min-h-[44px] transition ${category === c ? "chip-on" : "hover:border-ink"}`}
              >
                {t(CAT_KEYS[c])}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="tnum mt-6 font-mono text-[12px] text-muted" role="status">
        {t("results", { n: results.length })}
      </p>

      {results.length === 0 ? (
        <div className="mt-4">
          <EmptyState
            art="search"
            title={t("emptyTitle")}
            hint={t("emptyHint")}
            action={
              <button
                onClick={() => { setQ(""); setCategory("Semua"); }}
                className="btn-ghost min-h-[44px] px-5 py-2.5 text-[13px]"
              >
                {t("resetBtn")}
              </button>
            }
          />
        </div>
      ) : (
        <ul className="mt-4 grid gap-4 md:grid-cols-2">
          {results.map((r) => (
            <li key={r.id}>
              <Link href={`/role/${r.id}`} className="spot flex h-full flex-col rounded-card border border-line bg-card p-6 md:p-7">
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full border border-line bg-paper px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-soft">
                    {r.category}
                  </span>
                  <span className="flex items-center gap-2 font-mono text-[11px] text-muted">
                    {lockedIds.includes(r.id) && getScenariosForRole(r.id).length > 0 && (
                      <span className="rounded-full border border-dashed border-line bg-paper px-2 py-0.5 font-bold uppercase tracking-[0.12em]">
                        {t("lockedBadge")}
                      </span>
                    )}
                    {t("scenariosCount", { n: getScenariosForRole(r.id).length })}
                  </span>
                </div>
                <p className="mt-3 text-lg font-extrabold tracking-tight">{r.title}</p>
                <p className="mt-1 flex-1 text-sm leading-relaxed text-soft">{r.shortDescription}</p>
                <div className="mt-4 flex items-center justify-between border-t border-line pt-3.5">
                  <p className="tnum font-mono text-[11px] text-muted">
                    {t("toolsCount", { n: r.tools.length })}
                  </p>
                  <svg aria-hidden viewBox="0 0 16 16" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="flex-none text-brand-700"><path d="M2.5 8h11M9.5 4l4 4-4 4" /></svg>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
