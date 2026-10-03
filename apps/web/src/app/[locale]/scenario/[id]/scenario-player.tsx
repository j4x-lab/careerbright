"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { MicroScenario } from "@/lib/discovery";

/* Micro-scenario player (PRD §4.4): context panel (simulated inbox thread),
   decision panel (options A–D), result overlay with the verdict
   (Optimal / Risky / Fatal) plus the practitioner debrief. The verdict is
   announced through a live region, not colour alone. */

const VERDICT_STYLE: Record<string, string> = {
  Optimal: "border-ok/25 bg-ok-bg text-ok",
  Risky: "border-signal/40 bg-signal/10 text-signal-strong",
  Fatal: "border-danger/30 bg-danger-bg text-danger",
};

export function ScenarioPlayer({ scenario, backHref }: { scenario: MicroScenario; backHref: string }) {
  const t = useTranslations("scenario");
  const [selected, setSelected] = useState<string | null>(null);

  const picked = scenario.options.find((o) => o.id === selected) ?? null;
  const verdict = picked ? t(`result${picked.type}` as "resultOptimal" | "resultRisky" | "resultFatal") : null;
  const verdictBody = picked
    ? picked.type === "Optimal"
      ? scenario.feedback.Optimal
      : scenario.feedback.Fatal
    : null;

  return (
    <div className="overflow-hidden rounded-card border border-line bg-card">
      {/* Context panel — the simulated thread that frames the decision */}
      <div className="border-b border-line bg-paper px-6 py-5 md:px-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
          {t("contextLabel")} · {scenario.context.sender} · {scenario.context.time}
        </p>
        <p className="mt-3 max-w-[62ch] text-[16px] font-bold leading-relaxed tracking-tight text-ink">
          {scenario.context.message}
        </p>
      </div>

      <div className="p-6 md:p-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
          {t("decideLabel")}
        </p>
        <div className="mt-3 grid gap-2" role="group" aria-label={t("decideLabel")}>
          {scenario.options.map((o) => (
            <button
              key={o.id}
              type="button"
              onClick={() => setSelected(o.id)}
              aria-pressed={selected === o.id}
              className={`flex min-h-[52px] items-start gap-3 rounded-btn border px-4 py-3 text-left transition ${
                selected === o.id
                  ? "border-ink bg-ink text-white"
                  : "border-line bg-paper text-ink hover:border-ink"
              }`}
            >
              <span aria-hidden className="tnum mt-0.5 font-mono text-[12px] font-bold">
                {o.id}
              </span>
              <span className="text-sm font-bold leading-relaxed">{o.text}</span>
              <span className="sr-only">{t("optionLabel", { id: o.id })}</span>
            </button>
          ))}
        </div>

        <div aria-live="polite">
          {picked && (
            <div className={`mt-5 rounded-btn border px-5 py-4 ${VERDICT_STYLE[picked.type]}`}>
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em]">
                {verdict}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink">{verdictBody}</p>
              <p className="mt-4 border-t border-line/60 pt-3 text-sm leading-relaxed text-soft">
                <strong className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                  {t("practitionerLabel")} —{" "}
                </strong>
                {scenario.feedback.PractitionerQuote}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="btn-ghost px-5 py-2.5 text-[13px]"
                >
                  {t("retry")}
                </button>
                <Link href={backHref} className="link-more inline-flex min-h-[44px] items-center">
                  {t("viewRole")}
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
