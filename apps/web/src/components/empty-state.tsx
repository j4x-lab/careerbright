import type { ComponentType, ReactNode } from "react";

/*
 * Composed empty states — never a bare "No data" line.
 *
 * The art is inline SVG rather than a stock photo or a remote placeholder:
 * it stays on-palette (cobalt + hairlines + the shape-lock radii), it never
 * 404s, it costs no request, and each composition shows the *shape* of what
 * belongs in the slot so the reader knows how to populate it.
 *
 * All geometry is drawn in the live design tokens, so the art follows the
 * theme instead of hardcoding a second palette.
 */

type Art = "ledger" | "search";

function LedgerArt() {
  return (
    <svg viewBox="0 0 260 170" fill="none" aria-hidden="true" className="h-[148px] w-[226px] shrink-0">
      {/* the container the rows will live in */}
      <rect
        x="30" y="10" width="200" height="132" rx="16"
        fill="var(--color-paper)" stroke="var(--color-line)" strokeWidth="1.5"
      />
      {/* header band: a cobalt kicker over a muted label */}
      <path d="M30 40h200" stroke="var(--color-line)" strokeWidth="1.5" />
      <rect x="46" y="22" width="44" height="7" rx="3.5" fill="var(--color-brand-700)" />
      <rect x="172" y="23" width="42" height="5" rx="2.5" fill="var(--color-muted)" opacity="0.32" />
      {/* row one — the shape a populated row takes */}
      <rect x="46" y="56" width="108" height="9" rx="4.5" fill="var(--color-brand-700)" opacity="0.24" />
      <rect x="46" y="71" width="70" height="6" rx="3" fill="var(--color-muted)" opacity="0.2" />
      <path d="M30 92h200" stroke="var(--color-line)" strokeWidth="1" />
      {/* row two — the shape an empty row leaves behind */}
      <rect x="46" y="106" width="86" height="9" rx="4.5" fill="var(--color-muted)" opacity="0.14" />
      <path d="M30 128h152" stroke="var(--color-line)" strokeWidth="1" strokeDasharray="3 5" />
      {/* the add affordance, in the slot's own corner */}
      <circle cx="200" cy="118" r="16" fill="var(--color-brand-700)" />
      <path d="M194 118h12M200 112v12" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

function SearchArt() {
  return (
    <svg viewBox="0 0 260 170" fill="none" aria-hidden="true" className="h-[148px] w-[226px] shrink-0">
      {/* result rows fading out — implies "the list is there, the match isn't" */}
      <rect x="22" y="26" width="164" height="14" rx="7" fill="var(--color-muted)" opacity="0.22" />
      <rect x="22" y="50" width="124" height="14" rx="7" fill="var(--color-muted)" opacity="0.15" />
      <rect x="22" y="74" width="148" height="14" rx="7" fill="var(--color-muted)" opacity="0.09" />
      <rect x="22" y="112" width="96" height="10" rx="5" fill="var(--color-line)" />
      <rect x="22" y="128" width="64" height="10" rx="5" fill="var(--color-line)" />
      {/* magnifier, cobalt, breaking the frame of the list */}
      <circle
        cx="178" cy="82" r="42"
        fill="var(--color-card)" stroke="var(--color-brand-700)" strokeWidth="3.5"
      />
      <path
        d="M207 111l24 24"
        stroke="var(--color-brand-700)" strokeWidth="8" strokeLinecap="round"
      />
      <path d="M162 82h32" stroke="var(--color-brand-700)" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

const ART: Record<Art, ComponentType> = {
  ledger: LedgerArt,
  search: SearchArt,
};

export function EmptyState({
  art = "ledger",
  title,
  hint,
  action,
}: {
  art?: Art;
  title: string;
  hint: string;
  action?: ReactNode;
}) {
  const Art = ART[art];
  return (
    <div className="flex flex-col items-center gap-6 rounded-card border border-dashed border-line bg-card px-6 py-12 text-center md:py-14">
      <Art />
      <div className="max-w-[48ch]">
        <p className="text-[17px] font-extrabold tracking-tight text-ink md:text-[19px]">{title}</p>
        <p className="mt-2 text-sm leading-relaxed text-soft">{hint}</p>
      </div>
      {action}
    </div>
  );
}