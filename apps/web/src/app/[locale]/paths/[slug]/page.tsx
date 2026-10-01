const PATHS: Record<string, { title: string; kkni: number; weeks: number; salary: string; milestones: { t: string; skkni: string }[] }> = {
  "junior-accountant": {
    title: "Akuntan Junior (Fokus Pajak)",
    kkni: 6, weeks: 24, salary: "IDR 6–9 jt/bln",
    milestones: [
      { t: "Dasar Akuntansi Keuangan", skkni: "M.691090.001.01" },
      { t: "Pajak Badan & e-Faktur", skkni: "M.691090.005.01" },
      { t: "Pelaporan PSAK/IFRS", skkni: "M.691090.007.01" },
      { t: "Capstone: SPT Klien Mock", skkni: "Portofolio + Asesmen AI" },
    ],
  },
};

export default async function PathPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = PATHS[slug] ?? {
    title: slug, kkni: 6, weeks: 16, salary: "IDR 6–15 jt/bln",
    milestones: [{ t: "Milestone 1", skkni: "SKKNI-xxx" }],
  };
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">Learning Path · KKNI Level {p.kkni}</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">{p.title}</h1>
      <p className="mt-2 font-mono text-sm text-zinc-400">{p.salary} · {p.weeks} minggu</p>
      <ol className="mt-8 space-y-3">
        {p.milestones.map((m, i) => (
          <li key={m.t} className="flex items-center justify-between rounded-2xl border border-white/10 bg-ink-900 p-5">
            <div>
              <p className="font-mono text-[11px] text-zinc-500">Fase {i + 1} · {m.skkni}</p>
              <p className="mt-1 font-semibold">{m.t}</p>
            </div>
            <span className="rounded-full border border-white/15 px-3 py-1 font-mono text-[11px] text-zinc-300">🏆 Badge</span>
          </li>
        ))}
      </ol>
    </main>
  );
}
