"use client";

import { useState } from "react";

export interface CodeTest {
  name: string;
  input: unknown;
  expected: unknown;
}

// Browser JS lab: user implements solve(input). Tested locally against cases.
// NOTE (prod): graded execution moves to E2B sandbox server-side. This demo
// runs learner code on-device — never eval untrusted third-party code here.
export function CodeLab({
  id,
  starter,
  tests,
}: {
  id: string;
  starter: string;
  tests: CodeTest[];
}) {
  const [code, setCode] = useState(starter);
  const [results, setResults] = useState<{ name: string; pass: boolean; got: string }[] | null>(null);
  const [err, setErr] = useState<string | null>(null);

  function run() {
    setErr(null);
    try {
      const fn = new Function(`${code}\nreturn typeof solve === "function" ? solve : null;`)() as
        | ((input: unknown) => unknown)
        | null;
      if (!fn) throw new Error("Definisikan function solve(input) { … }");
      const out = tests.map((t) => {
        let got: unknown;
        try {
          got = fn(t.input);
        } catch (e) {
          return { name: t.name, pass: false, got: `error: ${e instanceof Error ? e.message : "?"}` };
        }
        const pass = JSON.stringify(got) === JSON.stringify(t.expected);
        return { name: t.name, pass, got: JSON.stringify(got) };
      });
      setResults(out);
      const passed = out.filter((r) => r.pass).length;
      localStorage.setItem(`cb-lab-${id}`, String(Math.round((passed / tests.length) * 100)));
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Kode error");
    }
  }

  const passed = results?.filter((r) => r.pass).length ?? 0;

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-ink-900">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <span className="font-mono text-[11px] text-zinc-500">lab — javascript · {tests.length} test</span>
        <button
          onClick={run}
          className="rounded-full bg-accent px-4 py-1.5 font-mono text-[11px] font-bold text-ink-950 transition active:translate-y-[1px]"
        >
          ▶ Jalankan
        </button>
      </div>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        spellCheck={false}
        rows={10}
        className="w-full bg-ink-950 p-4 font-mono text-[13px] leading-relaxed text-zinc-200 outline-none"
      />
      {err && <p className="border-t border-white/10 px-4 py-3 font-mono text-xs text-action">{err}</p>}
      {results && (
        <ul className="border-t border-white/10 px-4 py-3 font-mono text-xs">
          {results.map((r) => (
            <li key={r.name} className={r.pass ? "text-accent" : "text-action"}>
              {r.pass ? "✓" : "✗"} {r.name} → {r.got}
            </li>
          ))}
          <li className="mt-2 text-zinc-400">
            {passed}/{tests.length} lolos — {passed === tests.length ? "Kompeten ✓" : "perbaiki solve()"}
          </li>
        </ul>
      )}
    </div>
  );
}
