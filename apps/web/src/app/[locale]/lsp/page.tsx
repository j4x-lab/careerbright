// LSP Assessor — sessions, APL-02 verification, rubric scoring → credential.bNSPIssue
export default function LspDashboard() {
  return (
    <main className="mx-auto min-h-[100dvh] max-w-7xl bg-ink-950 px-4 py-10">
      <a href="/" className="link-more">
        ← Beranda
      </a>
      <h1 className="mt-4 text-3xl font-bold tracking-tight">LSP Asesor</h1>
      <p className="mt-2 max-w-[60ch] text-sm leading-relaxed text-zinc-400">
        Sesi TUK dan online proctoring, verifikasi APL-02, penilaian rubrik SKKNI.
      </p>
      <div className="mt-8 overflow-hidden rounded-2xl border border-white/10">
        <div className="grid gap-px bg-white/10 sm:grid-cols-3">
          {[
            ["6 sesi", "Terjadwal minggu ini"],
            ["14 berkas", "APL-02 menunggu verifikasi"],
            ["0,74", "Rata-rata keyakinan AI antrean"],
          ].map(([v, d]) => (
            <div key={d} className="bg-ink-900 p-6">
              <p className="tnum font-mono text-2xl font-bold">{v}</p>
              <p className="mt-1 text-sm text-zinc-400">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
