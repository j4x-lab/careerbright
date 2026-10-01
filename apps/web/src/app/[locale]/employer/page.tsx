// Employer — search skill profiles by SKKNI/KKNI, verify via /verify/[id]
export default function EmployerDashboard() {
  return (
    <main className="mx-auto min-h-[100dvh] max-w-7xl bg-ink-950 px-4 py-10">
      <a href="/" className="link-more">
        ← Beranda
      </a>
      <h1 className="mt-4 text-3xl font-bold tracking-tight">Employer</h1>
      <p className="mt-2 max-w-[60ch] text-sm leading-relaxed text-zinc-400">
        Cari profil skill terverifikasi berdasarkan SKKNI/KKNI/peran, verifikasi kredensial, pasang lowongan.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {[
          ["Cari talenta", "Filter KKNI 5–7 · 7 kategori peran · kesiapan AI ≥ 75."],
          ["Verifikasi 1-klik", "Pindai QR di CV → buka /verify/[id] → lihat SKKNI + status BNSP."],
          ["Pasang lowongan", "Targetkan kota Wave 1: Jakarta, Surabaya, Bandung."],
        ].map(([h, d]) => (
          <div key={h} className="rounded-2xl border border-white/10 bg-ink-900 p-6">
            <p className="font-semibold">{h}</p>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">{d}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-5">
        <a href="/id/verify/contoh" className="btn-primary group px-6 py-3 text-sm">
          Coba Verifikasi
          <span className="btn-island">↗</span>
        </a>
      </div>
    </main>
  );
}
