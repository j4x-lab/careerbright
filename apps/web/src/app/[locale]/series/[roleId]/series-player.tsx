"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { useMutation } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { Link } from "@/i18n/navigation";
import { LogVisit, getSessionKey } from "@/components/log-visit";
import type { MicroScenario } from "@/lib/discovery";
import { VERDICT_STYLE } from "../../scenario/[id]/scenario-player";

/* Series player: a role's scenarios back-to-back with scoring.
   Optimal = 100, Risky = 50, Fatal = 0; series score is the rounded
   average, pass at >= 70 (same bar as the LMS quizzes). Retry until
   passed; best score lives in localStorage per role. Each answer is
   logged as its own scenario_complete event, so existing metrics keep
   working with no schema change. */

const POINTS: Record<string, number> = { Optimal: 100, Risky: 50, Fatal: 0 };
const PASS = 70;

type Pick = { optionId: string; type: keyof typeof POINTS; ms: number };

export function SeriesPlayer({
  roleId,
  scenarios,
  backHref,
}: {
  roleId: string;
  scenarios: MicroScenario[];
  backHref: string;
}) {
  const t = useTranslations("series");
  const trpc = useTRPC();
  const log = useMutation(trpc.metrics.log.mutationOptions());
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [picks, setPicks] = useState<Pick[]>([]);
  const [best, setBest] = useState<number | null>(() => {
    try {
      const v = window.localStorage.getItem(`sb-series-best-${roleId}`);
      return v === null ? null : Number(v);
    } catch {
      return null;
    }
  });
  const qStart = useRef<number>(0);
  if (qStart.current === 0 && typeof performance !== "undefined") {
    qStart.current = performance.now();
  }

  const done = picks.length === scenarios.length;
  const scenario = scenarios[Math.min(idx, scenarios.length - 1)];

  function choose(id: string) {
    if (picked !== null || done) return;
    const opt = scenario.options.find((o) => o.id === id);
    if (!opt) return;
    const ms = Math.max(
      0,
      Math.min(3_600_000, Math.round(performance.now() - qStart.current))
    );
    setPicked(id);
    setPicks((p) => [...p, { optionId: id, type: opt.type as keyof typeof POINTS, ms }]);
    log.mutate({
      event: "scenario_complete",
      roleId,
      scenarioId: scenario.id,
      durationMs: ms,
      verdict: opt.type,
      sessionKey: getSessionKey(),
    });
  }

  function next() {
    setPicked(null);
    setIdx((i) => i + 1);
    qStart.current = performance.now();
  }

  function retry() {
    setIdx(0);
    setPicked(null);
    setPicks([]);
    qStart.current = performance.now();
  }

  if (done) {
    const total = picks.reduce((s, p) => s + POINTS[p.type], 0);
    const score = Math.round(total / picks.length);
    const passed = score >= PASS;
    if (passed && (best === null || score > best)) {
      setBest(score);
      try {
        window.localStorage.setItem(`sb-series-best-${roleId}`, String(score));
      } catch {
        /* private mode — score still shows, just not remembered */
      }
    }
    const shownBest = passed ? Math.max(score, best ?? 0) : best;
    return (
      <div className="overflow-hidden rounded-card border border-line bg-card">
        <div className="border-b border-line bg-paper px-6 py-5 md:px-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
            {t("scoreLabel")}
          </p>
          <p className="tnum font-nova mt-2 text-5xl font-bold tracking-[-0.02em] md:text-6xl">
            {score}
          </p>
          <p
            role="status"
            className={`mt-3 inline-block rounded-full border px-3 py-1 font-mono text-[11px] font-bold ${
              passed
                ? "border-ok/25 bg-ok-bg text-ok"
                : "border-danger/30 bg-danger-bg text-danger"
            }`}
          >
            {passed ? t("pass") : t("fail")}
          </p>
          {shownBest !== null && (
            <p className="mt-2 font-mono text-[11px] text-muted">
              {t("best", { s: shownBest })}
            </p>
          )}
        </div>
        <ul className="divide-y divide-line">
          {scenarios.map((s, i) => {
            const pk = picks[i];
            return (
              <li key={s.id} className="flex items-center justify-between gap-4 px-6 py-4 md:px-8">
                <div className="min-w-0">
                  <p className="tnum font-mono text-[11px] text-muted">
                    {t("question", { a: i + 1, b: scenarios.length })}
                  </p>
                  <p className="truncate text-[15px] font-bold tracking-tight">{s.title}</p>
                </div>
                <p
                  className={`flex-none rounded-full border px-2.5 py-1 font-mono text-[11px] font-bold ${
                    VERDICT_STYLE[pk.type]
                  }`}
                >
                  +{POINTS[pk.type]}
                </p>
              </li>
            );
          })}
        </ul>
        <div className="flex flex-wrap gap-3 border-t border-line bg-paper px-6 py-5 md:px-8">
          {!passed && (
            <button
              type="button"
              onClick={retry}
              className="btn-primary min-h-[52px] flex-1 justify-center px-7 text-[15px]"
            >
              {t("retry")}
            </button>
          )}
          <Link
            href={backHref}
            className={`inline-flex min-h-[52px] items-center justify-center rounded-btn px-7 text-[15px] font-bold transition ${
              passed
                ? "btn-primary flex-1"
                : "border-[1.5px] border-line text-ink hover:border-ink"
            }`}
          >
            {t("viewRole")}
          </Link>
        </div>
      </div>
    );
  }

  const opt = scenario.options.find((o) => o.id === picked) ?? null;
  return (
    <div className="overflow-hidden rounded-card border border-line bg-card">
      <div className="border-b border-line bg-paper px-6 py-5 md:px-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
          {t("question", { a: idx + 1, b: scenarios.length })} · {scenario.context.sender} · {scenario.context.time}
        </p>
        <p className="mt-1 font-mono text-[13px] font-extrabold tracking-tight text-ink">
          {scenario.title}
        </p>
        <p className="mt-3 max-w-[62ch] text-[16px] font-bold leading-relaxed tracking-tight text-ink">
          {scenario.context.message}
        </p>
      </div>
      <div className="p-6 md:p-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
          {t("decide")}
        </p>
        <div className="mt-3 grid gap-2" role="group" aria-label={t("decide")}>
          <LogVisit event="scenario_start" roleId={roleId} scenarioId={scenario.id} />
          {scenario.options.map((o) => {
            const active = picked === null || picked === o.id;
            return (
              <button
                key={o.id}
                type="button"
                disabled={picked !== null}
                onClick={() => choose(o.id)}
                className={`flex min-h-[52px] items-center gap-3 rounded-btn border px-4 py-3 text-left text-[15px] transition ${
                  active
                    ? "border-line bg-paper hover:border-ink"
                    : "border-line bg-paper opacity-40"
                }`}
              >
                <span className="tnum flex-none font-mono text-[12px] font-bold text-brand-700">
                  {o.id}
                </span>
                <span className="font-semibold">{o.text}</span>
              </button>
            );
          })}
        </div>
        {opt && (
          <div
            role="status"
            className={`mt-5 rounded-btn border px-4 py-4 ${VERDICT_STYLE[opt.type]}`}
          >
            <p className="flex items-center justify-between gap-3 font-mono text-[12px] font-bold">
              <span>
                {t(`result${opt.type}` as "resultOptimal" | "resultRisky" | "resultFatal")}
              </span>
              <span className="tnum">+{POINTS[opt.type]}</span>
            </p>
            <p className="mt-2 max-w-[62ch] text-[14px] font-semibold leading-relaxed">
              {opt.type === "Optimal" ? scenario.feedback.Optimal : scenario.feedback.Fatal}
            </p>
            <p className="mt-3 border-t border-current/20 pt-3 text-[13px] leading-relaxed opacity-90">
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.14em]">
                {t("practitionerLabel")}
              </span>
              <span className="mt-1 block italic">
                “{scenario.feedback.PractitionerQuote}”
              </span>
            </p>
            <button
              type="button"
              onClick={next}
              className="btn-primary mt-4 min-h-[52px] w-full justify-center px-7 text-[15px]"
            >
              {idx + 1 === scenarios.length ? t("finish") : t("next")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
