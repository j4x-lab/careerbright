"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

export interface CodeTest {
  name: string;
  input: unknown;
  expected: unknown;
}

// Browser JS lab: user implements solve(input). Tested locally against cases.
// NOTE (prod): graded execution moves to E2B sandbox server-side. This demo
// runs learner code on-device — never eval untrusted third-party code here.
// Premium assessment instrument: white card, ink frame, designed run header,
// light editor with cobalt focus, decisive per-test verdict rows.
export function CodeLab({
  id,
  starter,
  tests,
}: {
  id: string;
  starter: string;
  tests: CodeTest[];
}) {
  const t = useTranslations("lab");
  const [code, setCode] = useState(starter);
  const [results, setResults] = useState<{ name: string; pass: boolean; got: string }[] | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const outRef = useRef<HTMLUListElement>(null);

  // Send focus to the verdict list; run results used to be colour-only.
  useEffect(() => {
    if (results) outRef.current?.focus();
  }, [results]);

  function run() {
    setErr(null);
    try {
      const fn = new Function(`${code}\nreturn typeof solve === "function" ? solve : null;`)() as
        | ((input: unknown) => unknown)
        | null;
      if (!fn) throw new Error(t("needSolve"));
      const out = tests.map((tt) => {
        let got: unknown;
        try {
          got = fn(tt.input);
        } catch (e) {
          return { name: tt.name, pass: false, got: `error: ${e instanceof Error ? e.message : "?"}` };
        }
        const pass = JSON.stringify(got) === JSON.stringify(tt.expected);
        return { name: tt.name, pass, got: JSON.stringify(got) };
      });
      setResults(out);
      const passed = out.filter((r) => r.pass).length;
      localStorage.setItem(`cb-lab-${id}`, String(Math.round((passed / tests.length) * 100)));
    } catch (e) {
      setErr(e instanceof Error ? e.message : t("codeError"));
    }
  }

  const passed = results?.filter((r) => r.pass).length ?? 0;

  return (
    <div className="overflow-hidden rounded-card border-2 border-ink bg-card shadow-[0_24px_64px_-32px_rgba(10,17,40,0.35)]">
      <div className="flex flex-wrap items-center gap-3 border-b border-line bg-paper px-4 py-3 md:px-5">
        <span aria-hidden className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full border border-line bg-card" />
          <span className="h-2.5 w-2.5 rounded-full border border-line bg-card" />
          <span className="h-2.5 w-2.5 rounded-full bg-brand-700" />
        </span>
        <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-brand-700">
          {t("header", { count: tests.length })}
        </span>
        <button
          onClick={run}
          className="ml-auto inline-flex min-h-[44px] items-center justify-center rounded-btn bg-brand-700 px-6 py-3 font-mono text-xs font-bold text-white shadow-[0_14px_30px_-12px_rgba(29,78,216,0.65)] transition hover:bg-brand-800 active:translate-y-[1px]"
        >
          {t("run")}
        </button>
      </div>
      <div className="border-b border-line bg-card">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck={false}
          rows={10}
          aria-label={t("editor")}
          className="min-h-[240px] w-full resize-y bg-card p-4 font-mono text-[13px] leading-relaxed text-ink outline-none placeholder:text-muted focus:bg-brand-50/40 md:p-5"
        />
      </div>
      {err && (
        <p role="alert" className="border-b border-danger/30 bg-danger-bg px-4 py-3 font-mono text-xs font-bold text-danger md:px-5">
          <span aria-hidden>✗ </span>{err}
        </p>
      )}
      {results && (
        <ul
          ref={outRef}
          tabIndex={-1}
          role="status"
          aria-live="polite"
          aria-label={t("resultsLabel")}
          className="space-y-2 bg-card px-4 py-4 outline-none md:px-5"
        >
          {results.map((r) => (
            <li
              key={r.name}
              className={`flex min-h-[44px] items-center gap-3 rounded-btn border-2 px-3 py-2.5 font-mono text-xs ${
                r.pass ? "border-ok bg-ok-bg text-ink" : "border-danger bg-danger-bg text-ink"
              }`}
            >
              <span
                aria-hidden
                className={`flex h-6 w-6 flex-none items-center justify-center rounded-[8px] text-[11px] font-bold text-white ${
                  r.pass ? "bg-ok" : "bg-danger"
                }`}
              >
                {r.pass ? "✓" : "✗"}
              </span>
              <span className="min-w-0 flex-1 truncate font-bold">
                <span className="sr-only">{r.pass ? t("testPass") : t("testFail")}: </span>
                {r.name} <span className="font-normal text-muted">→ {r.got}</span>
              </span>
            </li>
          ))}
          <li
            className={`rounded-btn border-2 px-4 py-3 font-mono text-xs font-extrabold ${
              passed === tests.length ? "border-ok bg-ok-bg text-ink" : "border-line bg-paper text-ink"
            }`}
          >
            <span aria-hidden className={passed === tests.length ? "text-ok" : "text-brand-700"}>
              {passed === tests.length ? "✓ " : "● "}
            </span>
            <span className="sr-only">{passed === tests.length ? t("allPassSr") : t("someFailSr")}: </span>
            {t("summary", { p: passed, n: tests.length })} — {passed === tests.length ? t("donePass") : t("doneFix")}
          </li>
        </ul>
      )}
    </div>
  );
}
