"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export interface CodeTest {
  name: string;
  input: unknown;
  expected: unknown;
}

// Browser JS lab: user implements solve(input). Tested locally against cases.
// NOTE (prod): graded execution moves to E2B sandbox server-side. This demo
// runs learner code on-device — never eval untrusted third-party code here.
// Light exercise inset: paper surface inside the white lesson panel.
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
    <div className="overflow-hidden rounded-card border border-line bg-paper">
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <span className="font-mono text-xs text-faint">{t("header", { count: tests.length })}</span>
        <button
          onClick={run}
          className="rounded-btn bg-brand-700 px-5 py-2.5 font-mono text-xs font-bold text-white transition hover:bg-brand-900 active:translate-y-[1px]"
        >
          {t("run")}
        </button>
      </div>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        spellCheck={false}
        rows={10}
        aria-label={t("editor")}
        className="min-h-[240px] w-full border-b border-line bg-card p-4 font-mono text-[13px] leading-relaxed text-ink outline-none"
      />
      {err && <p className="border-b border-line px-4 py-3 font-mono text-xs text-danger">{err}</p>}
      {results && (
        <ul className="px-4 py-3 font-mono text-xs">
          {results.map((r) => (
            <li key={r.name} className={r.pass ? "text-ok" : "text-danger"}>
              {r.pass ? "✓" : "✗"} {r.name} → {r.got}
            </li>
          ))}
          <li className="mt-2 text-muted">
            {t("summary", { p: passed, n: tests.length })} — {passed === tests.length ? t("donePass") : t("doneFix")}
          </li>
        </ul>
      )}
    </div>
  );
}
