"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export interface Mcq {
  q: string;
  options: string[];
  answer: number;
  explain: string;
}

// Offline MCQ quiz with instant rubric-style feedback. Persists best score locally.
// Light exercise inset: paper surface inside the white lesson panel, cobalt actions.
export function McqQuiz({ id, questions, passing = 70 }: { id: string; questions: Mcq[]; passing?: number }) {
  const t = useTranslations("quiz");
  const [picked, setPicked] = useState<Record<number, number>>({});
  const [done, setDone] = useState(false);
  const [best, setBest] = useState<number | null>(null);
  const key = `cb-mcq-${id}`;

  useEffect(() => {
    const v = localStorage.getItem(key);
    if (v) setBest(Number(v));
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
      localStorage.setItem(key, String(nb));
      return nb;
    });
  }

  function retry() {
    setPicked({});
    setDone(false);
  }

  return (
    <div className="rounded-card border border-line bg-paper p-5">
      <div className="flex items-center justify-between">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-faint">
          {t("header", { count: questions.length, passing })}
        </p>
        {best !== null && <p className="font-mono text-xs text-brand-700">{t("best", { score: best })}</p>}
      </div>
      <div className="mt-4 space-y-5">
        {questions.map((q, i) => (
          <div key={i}>
            <p className="text-sm font-medium text-ink">
              {i + 1}. {q.q}
            </p>
            <div className="mt-2 grid gap-2" role="radiogroup" aria-label={t("question", { n: i + 1 })}>
              {q.options.map((op, j) => {
                const sel = picked[i] === j;
                const correct = done && j === q.answer;
                const wrong = done && sel && j !== q.answer;
                return (
                  <button
                    key={j}
                    role="radio"
                    aria-checked={sel}
                    disabled={done}
                    onClick={() => setPicked((p) => ({ ...p, [i]: j }))}
                    className={`rounded-xl border px-3 py-3 text-left text-sm transition active:translate-y-[1px] ${
                      correct
                        ? "border-ok bg-ok-bg text-ink"
                        : wrong
                          ? "border-danger bg-danger-bg text-ink"
                          : sel
                            ? "border-brand-700 bg-brand-50 text-ink"
                            : "border-line bg-card text-soft hover:border-brand-600 hover:text-ink"
                    }`}
                  >
                    {op}
                  </button>
                );
              })}
            </div>
            {done && <p className="mt-2 text-xs leading-relaxed text-muted">{q.explain}</p>}
          </div>
        ))}
      </div>
      {!done ? (
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            onClick={finish}
            disabled={!allAnswered}
            className="btn-primary disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
          >
            {t("submit")}
          </button>
          <p className="font-mono text-xs text-faint" aria-live="polite">
            {t("progress", { a: answered, b: questions.length })}
          </p>
        </div>
      ) : (
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <p className={`font-mono text-sm ${score >= passing ? "text-ok" : "text-danger"}`}>
            {t("score", { s: score })} — {score >= passing ? t("pass") : t("fail")}
          </p>
          <button
            onClick={retry}
            className="rounded-btn border border-line bg-card px-5 py-2.5 text-sm font-semibold text-soft transition hover:border-brand-700 hover:text-brand-700 active:translate-y-[1px]"
          >
            {t("retry")}
          </button>
        </div>
      )}
    </div>
  );
}
