"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

export interface Mcq {
  q: string;
  options: string[];
  answer: number;
  explain: string;
}

// Offline MCQ quiz with instant rubric-style feedback. Persists best score locally.
// Premium assessment instrument: white card, ink frame, cobalt header cue,
// decisive option states, climactic submit, prominent progress anchor.
export function McqQuiz({ id, questions, passing = 70 }: { id: string; questions: Mcq[]; passing?: number }) {
  const t = useTranslations("quiz");
  const [picked, setPicked] = useState<Record<number, number>>({});
  const [done, setDone] = useState(false);
  const [best, setBest] = useState<number | null>(null);
  const key = `cb-mcq-${id}`;
  const summaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const v = localStorage.getItem(key);
      if (v !== null) {
        const n = Number(v);
        if (Number.isFinite(n)) setBest(n);
      }
    } catch {
      /* private-mode storage: best score stays unpersisted */
    }
  }, [key]);

  const score = Math.round(
    (questions.filter((q, i) => picked[i] === q.answer).length / Math.max(1, questions.length)) * 100
  );
  const answered = questions.filter((_, i) => picked[i] !== undefined).length;
  const allAnswered = answered === questions.length;

  function finish() {
    if (!allAnswered) return;
    setDone(true);
    setBest((b) => {
      const nb = b === null ? score : Math.max(b, score);
      try {
        localStorage.setItem(key, String(nb));
      } catch {
        /* private-mode storage: best score stays unpersisted */
      }
      return nb;
    });
  }

  function retry() {
    setPicked({});
    setDone(false);
  }

  // Native radio arrow-key behavior for the button-based options:
  // Arrow keys move selection within the question, Home/End jump.
  function onOptionKeys(e: React.KeyboardEvent<HTMLDivElement>, qi: number) {
    const order = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Home", "End"];
    if (!order.includes(e.key)) return;
    e.preventDefault();
    const n = questions[qi]?.options.length ?? 0;
    if (n === 0) return;
    const cur = picked[qi] ?? 0;
    let next = cur;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (cur + 1) % n;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = (cur + n - 1) % n;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = n - 1;
    setPicked((p) => ({ ...p, [qi]: next }));
    e.currentTarget.querySelectorAll<HTMLButtonElement>('[role="radio"]')[next]?.focus();
  }

  // Move focus to the verdict so the result is the next thing a keyboard or
  // screen-reader user lands on — the grade used to exist only in colour.
  useEffect(() => {
    if (done) summaryRef.current?.focus();
  }, [done]);

  return (
    <div className="rounded-card border-2 border-ink bg-card p-5 shadow-[0_24px_64px_-32px_rgba(10,17,40,0.35)] md:p-7">
      <div aria-hidden className="mb-5 h-1 w-12 bg-brand-700" />
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-brand-700">
          {t("header", { count: questions.length, passing })}
        </p>
        {best !== null && (
          <p className="rounded-full border border-brand-700/20 bg-brand-50 px-3 py-1 font-mono text-xs font-bold text-brand-700">
            {t("best", { score: best })}
          </p>
        )}
      </div>

      {/* Progress anchor: the hierarchy anchor of the widget */}
      <div className="mt-4 rounded-btn border border-line bg-paper px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <p className="font-mono text-xs font-bold text-ink" aria-live="polite">
            {t("progress", { a: answered, b: questions.length })}
          </p>
          <p aria-hidden className="tnum font-mono text-xs font-bold text-brand-700">
            {Math.round((answered / Math.max(1, questions.length)) * 100)}%
          </p>
        </div>
        <div
          className="bar-track mt-2"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round((answered / Math.max(1, questions.length)) * 100)}
          aria-valuetext={t("progress", { a: answered, b: questions.length })}
          aria-label={t("progressBar")}
        >
          <div
            className="bar-fill"
            style={{ transform: `scaleX(${answered / Math.max(1, questions.length)})` }}
          />
        </div>
      </div>

      <div className="mt-5 space-y-6">
        {questions.map((q, i) => {
          const explainId = `cb-explain-${id}-${i}`;
          const qId = `cb-q-${id}-${i}`;
          return (
          <div key={i}>
            <p id={qId} className="text-[15px] font-extrabold leading-snug tracking-tight text-ink">
              <span aria-hidden className="card-num mr-2 align-middle">
                {i + 1}
              </span>
              {q.q}
            </p>
            <div
              className="mt-3 grid gap-2"
              role="radiogroup"
              aria-labelledby={qId}
              onKeyDown={(e) => !done && onOptionKeys(e, i)}
            >
              {q.options.map((op, j) => {
                const sel = picked[i] === j;
                const correct = done && j === q.answer;
                const wrong = done && sel && j !== q.answer;
                return (
                  <button
                    key={j}
                    type="button"
                    role="radio"
                    aria-checked={sel}
                    disabled={done}
                    aria-describedby={done ? explainId : undefined}
                    onClick={() => setPicked((p) => ({ ...p, [i]: j }))}
                    className={`flex min-h-[48px] w-full items-center gap-3 rounded-btn border-2 px-4 py-3.5 text-left text-sm transition active:translate-y-[1px] ${
                      correct
                        ? "border-ok bg-ok-bg font-bold text-ink shadow-[0_10px_24px_-14px_rgba(4,120,87,0.7)]"
                        : wrong
                          ? "border-danger bg-danger-bg font-bold text-ink"
                          : sel
                            ? "border-brand-700 bg-brand-50 font-bold text-ink shadow-[0_14px_28px_-14px_rgba(29,78,216,0.65)]"
                            : "border-line bg-card font-semibold text-soft hover:border-brand-700 hover:bg-brand-50/60 hover:text-ink"
                    } ${done ? "disabled:cursor-default" : "cursor-pointer"}`}
                  >
                    <span
                      aria-hidden
                      className={`flex h-7 w-7 flex-none items-center justify-center rounded-[10px] font-mono text-xs font-bold ${
                        correct
                          ? "bg-ok text-white"
                          : wrong
                            ? "bg-danger text-white"
                            : sel
                              ? "bg-brand-700 text-white"
                              : "border border-line bg-paper text-muted"
                      }`}
                    >
                      {correct ? "✓" : wrong ? "✗" : String.fromCharCode(65 + j)}
                    </span>
                    <span className="min-w-0 flex-1 leading-snug">{op}</span>
                    {/* The mark is now announced, not decoration. */}
                    {correct && (
                      <span className="tnum flex-none font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-ok">
                        <span aria-hidden>✓ </span>{t("correctMark")}
                      </span>
                    )}
                    {wrong && (
                      <span className="tnum flex-none font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-danger">
                        <span aria-hidden>✗ </span>{t("wrongMark")}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            {done && (
              <p id={explainId} className="mt-2 rounded-input border border-line bg-paper px-3 py-2 text-xs leading-relaxed text-muted">
                {q.explain}
              </p>
            )}
          </div>
        );
        })}
      </div>
      {!done ? (
        <div className="mt-6 flex flex-col gap-3 border-t border-line pt-5 sm:flex-row sm:items-center">
          <button
            onClick={finish}
            disabled={!allAnswered}
            className="btn-primary min-h-[48px] w-full justify-center px-7 sm:w-auto disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
          >
            {t("submit")}
          </button>
          <p className="font-mono text-xs font-bold text-muted sm:ml-auto" aria-hidden>
            {Math.round((answered / Math.max(1, questions.length)) * 100)}%
          </p>
        </div>
      ) : (
        <div className="mt-6 flex flex-col gap-3 border-t border-line pt-5 sm:flex-row sm:items-center">
          <div
            ref={summaryRef}
            tabIndex={-1}
            role="status"
            aria-live="polite"
            className={`rounded-btn border-2 px-4 py-3 font-mono text-sm font-extrabold ${
              score >= passing ? "border-ok bg-ok-bg text-ink" : "border-danger bg-danger-bg text-ink"
            }`}
          >
            <span aria-hidden className={score >= passing ? "text-ok" : "text-danger"}>
              {score >= passing ? "✓ " : "✗ "}
            </span>
            {t("score", { s: score })} — {score >= passing ? t("pass") : t("fail")}
          </div>
          <button
            onClick={retry}
            className="inline-flex min-h-[48px] items-center justify-center rounded-btn px-4 py-3 text-sm font-semibold text-muted underline decoration-line underline-offset-4 transition hover:text-brand-700 sm:ml-auto"
          >
            {t("retry")}
          </button>
        </div>
      )}
    </div>
  );
}
