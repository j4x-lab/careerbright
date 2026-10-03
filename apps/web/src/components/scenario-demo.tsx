"use client";

import { useEffect, useState } from "react";
import { useTrack } from "./track-picker";

/*
 * Clickable scenario demo (LANDING §22): situation → options →
 * consequence → CTA. No backend; all state local. Consequence is
 * announced via an aria-live region. Switching tracks resets.
 */

export function ScenarioDemo() {
  const { data } = useTrack();
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    setSelected(null);
  }, [data.id]);

  return (
    <div className="overflow-hidden rounded-card border border-line bg-card">
      <div className="border-b border-line bg-paper px-6 py-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
          Contoh — {data.short}: situasi
        </p>
        <p className="mt-2 text-xl font-extrabold tracking-tight">
          {data.scenarioTitle}
        </p>
        <p className="mt-1 text-sm leading-relaxed text-soft">
          {data.scenarioDesc}
        </p>
      </div>
      <div className="p-6">
        <ul className="grid grid-cols-2 gap-2">
          {data.constraints.map(([k, v]) => (
            <li
              key={k}
              className="rounded-btn border border-line bg-paper px-3.5 py-2.5"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-faint">
                {k}
              </p>
              <p className="tnum mt-0.5 text-[13px] font-extrabold">{v}</p>
            </li>
          ))}
        </ul>
        <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
          Buat keputusanmu
        </p>
        <div className="mt-2.5 grid gap-2" role="group" aria-label="Pilihan keputusan">
          {data.options.map((o, i) => (
            <button
              key={o}
              type="button"
              onClick={() => setSelected(i)}
              aria-pressed={selected === i}
              className={`rounded-btn border px-4 py-3 text-left text-sm font-bold transition ${
                selected === i
                  ? "border-ink bg-ink text-white"
                  : "border-line bg-paper hover:border-ink"
              }`}
            >
              {o}
            </button>
          ))}
        </div>
        <div aria-live="polite">
          {selected !== null && (
            <div className="mt-4 rounded-btn border border-signal/40 bg-signal/10 px-4 py-3">
              <p className="text-[13px] leading-relaxed text-soft">
                <strong className="text-ink">Akibatnya:</strong>{" "}
                {data.consequences[selected]}
              </p>
              <p className="mt-1 font-mono text-[11px] leading-relaxed text-faint">
                Begini cara RolePath melatih pengambilan keputusan profesional.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <a
                  href="/auth/daftar"
                  className="btn-amber mt-0 px-5 py-2.5 text-[13px]"
                >
                  {data.simSoon ? "Daftar akses awal" : "Coba Simulasi Penuh"}
                </a>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="btn-ghost px-5 py-2.5 text-[13px]"
                >
                  Coba lagi
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
