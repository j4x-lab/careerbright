const roles = [
  { slug: "ai-engineer", id: "AI Engineer", en: "AI Engineer", salary: "IDR 12–25 jt", weeks: 24, kkni: 6, demand: "Sangat tinggi" },
  { slug: "soc-analyst", id: "Analis SOC", en: "SOC Analyst", salary: "IDR 8–18 jt", weeks: 20, kkni: 6, demand: "Sangat tinggi" },
  { slug: "ehs-specialist", id: "Spesialis EHS", en: "EHS Specialist", salary: "IDR 7–15 jt", weeks: 20, kkni: 6, demand: "Sangat tinggi" },
  { slug: "junior-accountant", id: "Akuntan Junior", en: "Junior Accountant", salary: "IDR 6–9 jt", weeks: 24, kkni: 6, demand: "Tinggi" },
  { slug: "it-project-manager", id: "IT Project Manager", en: "IT Project Manager", salary: "IDR 10–25 jt", weeks: 16, kkni: 6, demand: "Tinggi" },
  { slug: "mining-coordinator", id: "Koordinator Tambang", en: "Mining Coordinator", salary: "IDR 7–14 jt", weeks: 16, kkni: 5, demand: "Tinggi" },
  { slug: "performance-marketer", id: "Performance Marketer", en: "Performance Marketer", salary: "IDR 6–15 jt", weeks: 12, kkni: 5, demand: "Tinggi" },
  { slug: "b2b-sales", id: "B2B Sales", en: "B2B Sales", salary: "IDR 7–15 jt+", weeks: 8, kkni: 5, demand: "Tinggi" },
];

export default function HomePage() {
  return (
    <main className="mx-auto max-w-7xl px-4 pb-24">
      <nav className="flex h-16 items-center justify-between border-b border-white/10">
        <span className="font-mono text-sm font-bold tracking-tight">
          CAREER<span className="text-accent">BRIGHT</span>
        </span>
        <div className="flex items-center gap-3">
          <a href="/id/auth/masuk" className="text-sm text-zinc-400 hover:text-white">
            Masuk
          </a>
          <a
            href="#roles"
            className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-ink-950 transition active:translate-y-[1px] active:scale-[0.98]"
          >
            Mulai Gratis
          </a>
        </div>
      </nav>

      <section className="grid gap-10 pt-16 md:grid-cols-5 md:pt-24">
        <div className="md:col-span-3 md:pt-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
            SKKNI · KKNI · Dinilai AI
          </p>
          <h1 className="mt-4 max-w-[16ch] text-4xl leading-[1.05] font-bold tracking-tighter md:text-6xl">
            Mau jadi apa setelah lulus?
          </h1>
          <p className="mt-5 max-w-[52ch] text-base leading-relaxed text-zinc-400">
            Pilih peran impianmu. Ikuti jalur selaras SKKNI, kerjakan asesmen yang
            dinilai AI, dan kumpulkan kredensial yang bisa diverifikasi pemberi kerja.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#roles"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink-950 transition hover:bg-accent active:translate-y-[1px] active:scale-[0.98]"
            >
              Pilih Peranmu
            </a>
            <a
              href="#cara"
              className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-zinc-200 transition hover:border-accent hover:text-white active:translate-y-[1px] active:scale-[0.98]"
            >
              Cara kerja
            </a>
          </div>
        </div>
        <div className="md:col-span-2">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-ink-900">
            <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-2 font-mono text-[11px] text-zinc-500">lab — python</span>
            </div>
            <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed text-zinc-300">
{`def nilai_asesmen(submisi):
    hasil = jalankan_test(submisi)
    return juri_ai.nilai(
        hasil, rubrik="SKKNI-J.620100"
    )

# ✓ 12/12 test lolos
# Skor: 87 — Kompeten`}
            </pre>
          </div>
        </div>
      </section>

      <section id="roles" className="pt-20">
        <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Pilih peranmu</h2>
        <p className="mt-2 max-w-[60ch] text-sm leading-relaxed text-zinc-400">
          Setiap jalur memetakan unit kompetensi SKKNI, estimasi waktu, dan rentang
          gaji awal di kota besar Indonesia.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {roles.map((r) => (
            <a
              key={r.slug}
              href={`/id/paths/${r.slug}`}
              className="group rounded-2xl border border-white/10 bg-ink-900 p-5 transition hover:border-accent/60 active:translate-y-[1px]"
            >
              <p className="font-semibold tracking-tight group-hover:text-accent">{r.id}</p>
              <p className="font-mono text-[11px] text-zinc-500">{r.en}</p>
              <dl className="mt-4 space-y-1.5 font-mono text-xs text-zinc-400">
                <div className="flex justify-between"><dt>Gaji</dt><dd className="text-zinc-200">{r.salary}</dd></div>
                <div className="flex justify-between"><dt>Durasi</dt><dd className="text-zinc-200">{r.weeks} minggu</dd></div>
                <div className="flex justify-between"><dt>KKNI</dt><dd className="text-zinc-200">Level {r.kkni}</dd></div>
                <div className="flex justify-between"><dt>Permintaan</dt><dd className="text-accent">{r.demand}</dd></div>
              </dl>
            </a>
          ))}
        </div>
      </section>

      <section id="cara" className="grid gap-8 pt-20 md:grid-cols-3">
        {[
          ["01 — Belajar", "Kursus + lab per milestone, tiap milestone memetakan 1 unit SKKNI."],
          ["02 — Dinilai AI", "Kode dieksekusi sandbox, simulasi soft-skill multi-agen, umpan balik per rubrik."],
          ["03 — Bersertifikat", "Badge OB 3.0 + VC tiap milestone. Upgrade ke sertifikat BNSP via LSP di dasbor."],
        ].map(([t, d]) => (
          <div key={t} className="border-t border-white/10 pt-4">
            <p className="font-mono text-xs text-accent">{t}</p>
            <p className="mt-2 text-sm leading-relaxed text-zinc-300">{d}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
