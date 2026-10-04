"use client";

import { useState } from "react";
import type { ArtifactMode, Mission } from "@/lib/missions";

/* Multimode workspace (Exec Summary step 02): DOCUMENT / SPREADSHEET / IMAGE / LINK / CODE.
 * Free storage: text/code/links inline; images via /api/uploads/artifact (local public/uploads). */

type Artifact = { mode: ArtifactMode; content: string; order: number };

export function MissionWorkspace({ mission, userId }: { mission: Mission; userId: string }) {
  const [artifacts, setArtifacts] = useState<Artifact[]>([{ mode: "DOCUMENT", content: "", order: 0 }]);
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ score: number; confidence: number; status: string; portfolioId: string | null } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const allowed = mission.deliverableSpec.modes as ArtifactMode[];

  function setArt(i: number, patch: Partial<Artifact>) {
    setArtifacts((prev) => prev.map((a, j) => (j === i ? { ...a, ...patch } : a)));
  }

  async function uploadImage(i: number, file: File) {
    const form = new FormData();
    form.append("file", file);
    form.append("userId", userId);
    form.append("missionSlug", mission.slug);
    const res = await fetch("/api/uploads/artifact", { method: "POST", body: form });
    const json = (await res.json()) as { url?: string; error?: string };
    if (!res.ok) throw new Error(json.error ?? "Upload gagal");
    setArt(i, { mode: "IMAGE", content: json.url ?? "" });
  }

  async function submit() {
    setBusy(true);
    setError(null);
    try {
      const payload = artifacts.filter((a) => a.content.trim().length > 0);
      if (payload.length < (mission.deliverableSpec.minArtifacts ?? 1)) {
        throw new Error(`Minimal ${mission.deliverableSpec.minArtifacts ?? 1} artifact terisi.`);
      }
      const res = await fetch("/api/missions/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ missionSlug: mission.slug, userId, artifacts: payload, noteId: note || undefined }),
      });
      const json = (await res.json()) as { error?: string } & NonNullable<typeof result> & { attemptId: string };
      if (!res.ok) throw new Error(json.error ?? "Submit gagal");
      setResult({ score: json.score, confidence: json.confidence, status: json.status, portfolioId: json.portfolioId });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Submit gagal");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="grid gap-6">
      {artifacts.map((a, i) => (
        <fieldset key={i} className="panel p-6">
          <legend className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            Output {i + 1}
          </legend>
          <div className="flex flex-wrap gap-2">
            {allowed.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setArt(i, { mode: m })}
                aria-pressed={a.mode === m}
                className={`chip min-h-[44px] ${a.mode === m ? "!border-ink !bg-ink !text-white" : ""}`}
              >
                {m}
              </button>
            ))}
            {artifacts.length > 1 && (
              <button
                type="button"
                onClick={() => setArtifacts((prev) => prev.filter((_, j) => j !== i))}
                className="chip min-h-[44px]"
              >
                Hapus
              </button>
            )}
          </div>
          {a.mode === "IMAGE" ? (
            <div className="mt-4">
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) uploadImage(i, f).catch((err) => setError(err instanceof Error ? err.message : "Upload gagal"));
                }}
                className="field"
              />
              <input
                type="url"
                value={a.content.startsWith("/uploads") ? "" : a.content}
                onChange={(e) => setArt(i, { content: e.target.value })}
                placeholder="atau tempel URL gambar / Figma / Canva / Sheets…"
                className="field mt-2"
              />
              {a.content && (
                <p className="mt-2 font-mono text-[11px] text-muted">
                  Tersimpan: {a.content}
                </p>
              )}
            </div>
          ) : a.mode === "LINK" ? (
            <input
              type="url"
              value={a.content}
              onChange={(e) => setArt(i, { content: e.target.value })}
              placeholder="https://… (repo, Sheets, Looker, Figma, Drive)"
              className="field mt-4"
            />
          ) : (
            <textarea
              value={a.content}
              onChange={(e) => setArt(i, { content: e.target.value })}
              rows={a.mode === "CODE" ? 12 : 8}
              placeholder={
                a.mode === "CODE"
                  ? "Tempel patch / snippet / link repo + penjelasan…"
                  : a.mode === "SPREADSHEET"
                    ? "Tempel CSV / tabel / link Sheets + penjelasan model…"
                    : "Tulis dokumenmu di sini (brief, analisis, PRD, rencana)…"
              }
              className={`field mt-4 ${a.mode === "CODE" ? "font-mono !text-[13px]" : ""}`}
            />
          )}
        </fieldset>
      ))}

      <button
        type="button"
        onClick={() => setArtifacts((prev) => [...prev, { mode: allowed[0] ?? "DOCUMENT", content: "", order: prev.length }])}
        className="btn-ghost min-h-[44px] px-5 text-sm"
      >
        + Tambah output
      </button>

      <label className="block">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
          Catatan revisi (opsional)
        </span>
        <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Apa yang kamu perbaiki dari feedback sebelumnya?" className="field mt-2" />
      </label>

      <div>
        <button type="button" onClick={submit} disabled={busy} className="btn-primary min-h-[52px] px-7 text-[15px]">
          {busy ? "Menilai…" : "Kirim untuk dinilai AI"}
        </button>
      </div>

      <div aria-live="polite">
        {error && (
          <p role="alert" className="rounded-btn border border-danger/30 bg-danger-bg px-5 py-4 text-sm text-danger">
            {error}
          </p>
        )}
        {result && (
          <div className="rounded-btn border border-line bg-card px-5 py-4">
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em]">
              Skor {result.score} · Confidence {result.confidence} · {result.status}
            </p>
            <p className="mt-2 text-sm leading-relaxed">
              {result.status === "NEEDS_HUMAN_REVIEW"
                ? "AI belum yakin — asesormu akan mereview manual. Sambil menunggu, tulis refleksi dan siapkan revisi."
                : result.score >= 70
                  ? "Lolos! Portofolio terverifikasi dibuat otomatis."
                  : "Belum lolos — baca feedback, perbaiki karya, kirim revisi."}
            </p>
            {result.portfolioId && (
              <p className="mt-2 text-sm">
                <a href={`/portofolio/${userId}`} className="link-more">Lihat portofolio →</a>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
