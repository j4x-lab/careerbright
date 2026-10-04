"use client";

import { useState } from "react";
import type { RubricCriterion } from "@/lib/missions";

/* Q2: dual-mode rubric authoring — Guided builder OR raw JSON, chosen in dashboard.
 * Mode toggle is local state; onSubmit emits the canonical RubricCriterion[]. */

export function RubricBuilder({
  initial,
  onChange,
}: {
  initial?: RubricCriterion[];
  onChange: (rubric: RubricCriterion[]) => void;
}) {
  const [mode, setMode] = useState<"guided" | "json">("guided");
  const [rows, setRows] = useState<RubricCriterion[]>(
    initial ?? [{ id: "kualitas", labelId: "", weight: 1 }],
  );
  const [raw, setRaw] = useState(() => JSON.stringify(initial ?? [], null, 2));
  const [error, setError] = useState<string | null>(null);

  function emitGuided(next: RubricCriterion[]) {
    setRows(next);
    setError(null);
    onChange(next);
  }

  function emitJson(text: string) {
    setRaw(text);
    try {
      const parsed = JSON.parse(text) as RubricCriterion[];
      if (!Array.isArray(parsed)) throw new Error("Harus array");
      onChange(parsed);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "JSON tidak valid");
    }
  }

  const total = rows.reduce((a, r) => a + (Number(r.weight) || 0), 0);

  return (
    <div className="panel p-6">
      <div className="flex gap-2" role="tablist" aria-label="Mode rubrik">
        {(["guided", "json"] as const).map((m) => (
          <button
            key={m}
            type="button"
            role="tab"
            aria-selected={mode === m}
            onClick={() => setMode(m)}
            className={`chip min-h-[44px] ${mode === m ? "!border-ink !bg-ink !text-white" : ""}`}
          >
            {m === "guided" ? "Guided builder" : "Raw JSON"}
          </button>
        ))}
      </div>

      {mode === "guided" ? (
        <div className="mt-4 grid gap-3">
          {rows.map((r, i) => (
            <div key={i} className="grid gap-2 md:grid-cols-[1fr_2fr_1fr_auto]">
              <input
                value={r.id}
                onChange={(e) => emitGuided(rows.map((x, j) => (j === i ? { ...x, id: e.target.value } : x)))}
                placeholder="id (mis. analisis-data)"
                className="field font-mono !text-[13px]"
              />
              <input
                value={r.labelId}
                onChange={(e) => emitGuided(rows.map((x, j) => (j === i ? { ...x, labelId: e.target.value } : x)))}
                placeholder="Label Indonesia"
                className="field"
              />
              <input
                type="number"
                min={0}
                max={1}
                step={0.05}
                value={r.weight}
                onChange={(e) => emitGuided(rows.map((x, j) => (j === i ? { ...x, weight: Number(e.target.value) } : x)))}
                className="field font-mono"
                aria-label={`Bobot kriteria ${i + 1}`}
              />
              <button
                type="button"
                onClick={() => emitGuided(rows.filter((_, j) => j !== i))}
                className="chip min-h-[44px]"
                disabled={rows.length <= 1}
              >
                Hapus
              </button>
            </div>
          ))}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => emitGuided([...rows, { id: `kriteria-${rows.length + 1}`, labelId: "", weight: 0 }])}
              className="btn-ghost px-5 py-2.5 text-[13px]"
            >
              + Kriteria
            </button>
            <p className={`font-mono text-[11px] ${Math.abs(total - 1) < 0.01 ? "text-ok" : "text-danger"}`}>
              Total bobot: {total.toFixed(2)} (harus 1.00)
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-4">
          <textarea
            value={raw}
            onChange={(e) => emitJson(e.target.value)}
            rows={10}
            spellCheck={false}
            className="field font-mono !text-[13px]"
            placeholder='[{"id":"analisis","labelId":"Ketepatan analisis","weight":0.5}]'
          />
          {error ? (
            <p role="alert" className="mt-2 text-sm text-danger">{error}</p>
          ) : (
            <p className="mt-2 font-mono text-[11px] text-muted">JSON valid — tersambung ke misi.</p>
          )}
        </div>
      )}
    </div>
  );
}
