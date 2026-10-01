"use client";

import { useEffect, useState } from "react";

export interface Mcq {
  q: string;
  options: string[];
  answer: number;
  explain: string;
}

// Offline MCQ quiz with instant rubric-style feedback. Persists best score locally.
export function McqQuiz({ id, questions, passing = 70 }: { id: string; questions: Mcq[]; passing?: number }) {
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

  function finish() {
    setDone(true);
    setBest((b) => {
      const nb = b === null ? score : Math.max(b, score);
      localStorage.setItem(key, String(nb));
      return nb;
    });
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-ink-900 p-5">
      <div className="flex items-center justify-between">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">
          Kuis · {questions.length} soal · Lulus {passing}
        </p>
        {best !== null && <p className="font-mono text-[11px] text-accent">Terbaik: {best}</p>}
      </div>
      <div className="mt-4 space-y-5">
        {questions.map((q, i) => (
          <div key={i}>
            <p className="text-sm font-medium">
              {i + 1}. {q.q}
            </p>
            <div className="mt-2 grid gap-2">
              {q.options.map((op, j) => {
                const sel = picked[i] === j;
                const show = done && (j === q.answer || (sel && sel !== (j === q.answer)));
                const correct = done && j === q.answer;
                const wrong = done && sel && j !== q.answer;
                return (
                  <button
                    key={j}
                    disabled={done}
                    onClick={() => setPicked((p) => ({ ...p, [i]: j }))}
                    className={`rounded-xl border px-3 py-2 text-left text-sm transition active:translate-y-[1px] ${
                      correct
                        ? "border-accent bg-accent/10"
                        : wrong
                          ? "border-action bg-action/10"
                          : sel
                            ? "border-white/40"
                            : "border-white/10 hover:border-white/30"
                    }${show ? "" : ""}`}
                  >
                    {op}
                  </button>
                );
              })}
            </div>
            {done && <p className="mt-2 text-xs leading-relaxed text-zinc-400">{q.explain}</p>}
          </div>
        ))}
      </div>
      {!done ? (
        <button
          onClick={finish}
          className="mt-5 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-ink-950 transition active:translate-y-[1px]"
        >
          Kumpulkan
        </button>
      ) : (
        <p className={`mt-5 font-mono text-sm ${score >= passing ? "text-accent" : "text-action"}`}>
          Skor: {score} — {score >= passing ? "Kompeten ✓" : "Belum kompeten — ulangi"}
        </p>
      )}
    </div>
  );
}
