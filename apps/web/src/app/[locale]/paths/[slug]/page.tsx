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

const PATH_ART: Record<string, { img: string; alt: string }> = {
  "junior-accountant": {
    img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1200&auto=format&fit=crop",
    alt: "Kalkulator dan dokumen pajak di atas meja — jalur Akuntan Junior",
  },
};

export default async function PathPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const art = PATH_ART[slug] ?? {
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop",
    alt: "Tim mahasiswa berkolaborasi mengelilingi laptop — gambaran jalur",
  };
  const p = PATHS[slug] ?? {
    title: slug, kkni: 6, weeks: 16, salary: "IDR 6–15 jt/bln",
    milestones: [{ t: "Milestone 1", skkni: "SKKNI-xxx" }],
  };
  return (
    <main className="mx-auto min-h-[100dvh] max-w-5xl bg-ink-950 px-4 py-10">
      <a href="/#jalur" className="link-more">
        ← Semua jalur
      </a>
      <p className="mt-6 inline-block rounded-full border border-white/10 px-3 py-1 font-mono text-[11px] text-zinc-400">
        Learning Path · KKNI Level {p.kkni}
      </p>
      <h1 className="mt-4 max-w-[20ch] text-3xl font-bold tracking-tight md:text-5xl">{p.title}</h1>
      <p className="tnum mt-3 font-mono text-sm text-zinc-400">
        {p.salary} · {p.weeks} minggu · {p.milestones.length} fase
      </p>

      <div className="photo-cine mt-8 aspect-[21/8] rounded-2xl border border-white/10">
        <img
          src={art.img}
          alt={art.alt}
          loading="lazy"
          decoding="async"
          sizes="(max-width: 768px) 100vw, 1024px"
          className="h-full w-full object-cover"
        />
        <p className="absolute bottom-4 left-5 font-mono text-[11px] text-zinc-200">
          {p.milestones.length} fase · tiap fase = 1 badge SKKNI
        </p>
      </div>

      <ol className="mt-6 space-y-3">
        {p.milestones.map((m, i) => (
          <li
            key={m.t}
            className="spot flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-ink-900 p-5"
          >
            <div className="flex gap-4">
              <span className="tnum flex h-9 w-9 flex-none items-center justify-center rounded-full border border-white/10 font-mono text-xs text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="font-mono text-[11px] text-zinc-500">Fase {i + 1} · {m.skkni}</p>
                <p className="mt-1 font-semibold">{m.t}</p>
              </div>
            </div>
            <span className="flex-none rounded-full border border-white/15 px-3 py-1.5 font-mono text-[11px] text-zinc-300">
              Badge
            </span>
          </li>
        ))}
      </ol>

      <div className="mt-6 flex flex-wrap items-center gap-5">
        <a href="/id/auth/daftar" className="btn-primary group px-6 py-3.5 text-sm">
          Mulai Gratis
          <span className="btn-island">↗</span>
        </a>
        <a href="/id/belajar/js-dasar-analis" className="link-more">
          Coba Lab Demo →
        </a>
      </div>
    </main>
  );
}
