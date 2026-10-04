"use client";

import { useState } from "react";
import { RubricBuilder } from "@/components/mission/rubric-builder";
import type { RubricCriterion } from "@/lib/missions";

/* /kontributor — Contributor studio (Exec Summary: ekonomi contributor).
 * Q2: rubric mode can be chosen: guided builder (default) or raw JSON — toggle lives in RubricBuilder. */

const MODES = ["DOCUMENT", "SPREADSHEET", "IMAGE", "LINK", "CODE"] as const;

export default function ContributorPage() {
  const [form, setForm] = useState({
    slug: "",
    roleId: "social-media-specialist",
    titleId: "",
    briefId: "",
    skkniUnitCode: "",
    difficulty: 2,
    estimatedMin: 120,
    maxRevisions: 3,
    deliverableModes: ["DOCUMENT"] as string[],
  });
  const [rubric, setRubric] = useState<RubricCriterion[]>([{ id: "kualitas", labelId: "", weight: 1 }]);
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit() {
    setBusy(true);
    setMsg(null);
    try {
      const res = await fetch("/api/trpc/missions.create?batch=1", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          "0": {
            json: {
              ...form,
              deliverableSpec: { modes: form.deliverableModes, minArtifacts: 1 },
              rubricGuided: rubric,
              kkniLevel: 5,
            },
          },
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(JSON.stringify(json).slice(0, 500));
      setMsg("Misi terkirim ke kurasi. Admin/LSP akan mereview sebelum publish. Komisi Rp500–1000 per verified completion bila lolos.");
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Gagal");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main id="konten" className="mx-auto max-w-4xl px-4 pb-20 pt-[120px]">
      <p className="eyebrow-light">Ekonomi contributor</p>
      <h1 className="font-nova mt-3 text-3xl font-bold md:text-5xl">Ubah pengalaman industrimu jadi misi.</h1>
      <p className="mt-3 max-w-[62ch] text-sm leading-relaxed text-soft">
        Tulis brief + deliverable + rubrik. Kurasi oleh admin sebelum publish. Dibayar per verified completion — bukan views.
      </p>

      <div className="mt-8 grid gap-4">
        <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="slug (kebab-case)" className="field font-mono" />
        <input value={form.titleId} onChange={(e) => setForm({ ...form, titleId: e.target.value })} placeholder="Judul misi" className="field" />
        <textarea value={form.briefId} onChange={(e) => setForm({ ...form, briefId: e.target.value })} rows={6} placeholder="Brief realistis (konteks Indonesia, deliverable jelas)…" className="field" />
        <div className="grid gap-3 md:grid-cols-2">
          <input value={form.roleId} onChange={(e) => setForm({ ...form, roleId: e.target.value })} placeholder="roleId" className="field" />
          <input value={form.skkniUnitCode} onChange={(e) => setForm({ ...form, skkniUnitCode: e.target.value })} placeholder="Kode SKKNI" className="field" />
          <label className="flex items-center gap-2 text-sm">Estimasi (mnt)
            <input type="number" value={form.estimatedMin} onChange={(e) => setForm({ ...form, estimatedMin: Number(e.target.value) })} className="field" />
          </label>
          <label className="flex items-center gap-2 text-sm">Maks revisi (configurable)
            <input type="number" min={0} max={10} value={form.maxRevisions} onChange={(e) => setForm({ ...form, maxRevisions: Number(e.target.value) })} className="field" />
          </label>
        </div>
        <fieldset>
          <legend className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">Mode output</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {MODES.map((m) => (
              <button
                key={m}
                type="button"
                aria-pressed={form.deliverableModes.includes(m)}
                onClick={() =>
                  setForm((f) => ({
                    ...f,
                    deliverableModes: f.deliverableModes.includes(m)
                      ? f.deliverableModes.filter((x) => x !== m)
                      : [...f.deliverableModes, m],
                  }))
                }
                className={`chip min-h-[44px] ${form.deliverableModes.includes(m) ? "!border-ink !bg-ink !text-white" : ""}`}
              >
                {m}
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="mt-6">
        <RubricBuilder initial={rubric} onChange={setRubric} />
      </div>

      <button onClick={submit} disabled={busy} className="btn-primary mt-6 min-h-[52px] px-7">
        {busy ? "Mengirim…" : "Kirim ke kurasi"}
      </button>
      {msg && <p className="mt-4 text-sm">{msg}</p>}
    </main>
  );
}
