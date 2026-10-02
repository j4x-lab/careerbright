// University — cohort analytics, curriculum→SKKNI gap map, export
export default function UniversityDashboard() {
  return (
    <main className="mx-auto min-h-[100dvh] max-w-7xl bg-paper px-4 py-10">
      <a href="/" className="link-more">
        ← Beranda
      </a>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight">Universitas</h1>
      <p className="mt-2 max-w-[60ch] text-sm leading-relaxed text-soft">
        Analitik kohort, peta kesenjangan kurikulum → SKKNI, dan ekspor kelulusan.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {[
          ["412", "Mahasiswa aktif · 3 prodi"],
          ["68%", "Cakupan SKKNI kurikulum"],
          ["23", "Lulusan tersertifikasi BNSP"],
        ].map(([v, d]) => (
          <div key={d} className="rounded-2xl border border-ink/10 bg-card p-6">
            <p className="tnum font-mono text-3xl font-bold">{v}</p>
            <p className="mt-1 text-sm text-soft">{d}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
