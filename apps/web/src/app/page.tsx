import { Reveal } from "@/components/reveal";
import { SiteNav, SiteFooter } from "@/components/site-chrome";
import { Magnetic, StackDim } from "@/components/motion";

/*
 * Design read: consumer landing for ID college students,
 * dark editorial cinematic, Tailwind v4 + Geist + restrained motion.
 * Dials: VARIANCE 8 / MOTION 6 / DENSITY 4.
 * Shape lock: buttons pill · cards rounded-2xl · media rounded-xl · inputs 8px.
 * Accent lock: cyan #00D4FF everywhere · coral only for HOT/upgrade.
 */

const IMG = (id: string, w: number) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=${w}&auto=format&fit=crop`;

const BENTO = [
  {
    slug: "ai-engineer",
    title: "AI Engineer",
    salary: "IDR 12–25 jt",
    weeks: 24,
    kkni: 7,
    hot: true,
    img: IMG("1555066931-4365d14bab8c", 1200),
    alt: "Layar kode gelap di lab AI — jalur AI Engineer",
    span: "md:col-span-7",
    aspect: "aspect-[16/10]",
  },
  {
    slug: "soc-analyst",
    title: "Analis SOC",
    salary: "IDR 8–18 jt",
    weeks: 20,
    kkni: 6,
    hot: true,
    img: IMG("1550751827-4bd374c3f58b", 800),
    alt: "Pusat operasi keamanan siber — jalur Analis SOC",
    span: "md:col-span-5",
    aspect: "aspect-[16/10]",
  },
  {
    slug: "ehs-specialist",
    title: "Spesialis EHS",
    salary: "IDR 7–15 jt",
    weeks: 20,
    kkni: 6,
    hot: true,
    img: IMG("1581091226825-a6a2a5aee158", 800),
    alt: "Insinyur perempuan dengan APD di laboratorium — jalur EHS",
    span: "md:col-span-4",
    aspect: "aspect-[4/3]",
  },
  {
    slug: "mining-coordinator",
    title: "Koordinator Tambang",
    salary: "IDR 7–14 jt",
    weeks: 16,
    kkni: 5,
    hot: false,
    img: IMG("1541888946425-d81bb19240f5", 800),
    alt: "Operasi alat berat di site proyek — jalur Koordinator Tambang",
    span: "md:col-span-4",
    aspect: "aspect-[4/3]",
  },
  {
    slug: "performance-marketer",
    title: "Performance Marketer",
    salary: "IDR 6–15 jt",
    weeks: 12,
    kkni: 5,
    hot: false,
    img: IMG("1460925895917-afdab827c52f", 800),
    alt: "Dasbor analitik performa di laptop — jalur Performance Marketer",
    span: "md:col-span-4",
    aspect: "aspect-[4/3]",
  },
];

const RUBRIK = [
  { t: "Ketepatan Teknis", s: 92, d: "12/12 uji lolos · kompleksitas O(n).", w: "92%" },
  { t: "Kelengkapan Bukti", s: 84, d: "Kurang satu tangkapan bukti uji manual.", w: "84%" },
  { t: "Komunikasi Profesional", s: 88, d: "Penjelasan lugas, nada siap-klien.", w: "88%" },
];

const SKKNI_GROUPS = [
  {
    h: "Teknologi",
    items: [
      ["J.620100.001.01", "Menganalisis Tools"],
      ["J.620100.003.01", "Menulis Kode Aman"],
    ],
  },
  {
    h: "Keuangan",
    items: [["M.691090.005.01", "PPh, PPN & e-Faktur"]],
  },
  {
    h: "Keberlanjutan",
    items: [["SKKNI-K3-U2", "HIRADC & Investigasi Insiden"]],
  },
];

const OUTCOMES = [
  {
    h: "Skor AI naik 34 poin dalam 6 minggu",
    d: "Umpan balik per rubrik, bukan satu angka misterius. Rani tahu persis apa yang harus diperbaiki.",
    who: "Rani · Akuntansi UNPAD",
  },
  {
    h: "Badge ke-4, langsung dipanggil interview",
    d: "Rekruter memindai QR di CV dan melihat bukti SKKNI. Tanpa surat lamaran generik.",
    who: "Dimas · Sistem Informasi UI",
  },
  {
    h: "BNSP di semester 7",
    d: "Upgrade dari dasbor, uji di TUK, sertifikat terverifikasi nasional. Dua kredensial dalam satu profil.",
    who: "Sinta · K3 UGM",
  },
];

const LOGOS = ["SKKNI", "KKNI", "BNSP", "QRIS", "TUK", "OB3.0", "VC2.0"];

export default function HomePage() {
  return (
    <main className="grain overflow-x-clip bg-ink-950 text-zinc-100">
      <a href="#konten" className="skip-link">
        Lewati ke konten
      </a>
      <SiteNav />

      {/* ── 1 · HERO — full-bleed, bottom-left ─────────── */}
      <section className="relative flex min-h-[100dvh] items-end overflow-hidden border-b border-white/10">
        <div className="absolute inset-0" aria-hidden>
          <img
            src={IMG("1477959858617-67f85cf4f1df", 2000)}
            alt=""
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover opacity-40"
            style={{ filter: "grayscale(1) contrast(1.1) brightness(0.85)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/55 to-ink-950/25" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-950/70 via-transparent to-transparent" />
        </div>
        <div className="hero-glow" aria-hidden />

        <div id="konten" className="relative mx-auto grid w-full max-w-7xl gap-10 px-4 pb-14 pt-28 md:grid-cols-12 md:items-end md:pb-20">
          <div className="md:col-span-7">
            <p className="hero-enter hero-enter-1 font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
              SKKNI-Native · AI-Graded
            </p>
            <h1 className="hero-enter hero-enter-2 mt-4 max-w-[14ch] text-5xl font-bold leading-[1.02] tracking-tighter md:text-6xl">
              Lulus kuliah, langsung <em className="text-accent not-italic underline decoration-accent/40 underline-offset-8">siap kerja</em>.
            </h1>
            <p className="hero-enter hero-enter-3 mt-5 max-w-[46ch] text-base leading-relaxed text-zinc-400">
              Pilih peran impianmu, selesaikan jalur selaras SKKNI, dan bawa pulang kredensial terverifikasi.
            </p>
            <div className="hero-enter hero-enter-4 mt-8 flex flex-wrap items-center gap-5">
              <Magnetic>
                <a href="/id/auth/daftar" className="btn-primary group">
                  Mulai Gratis
                  <span className="btn-island" aria-hidden>
                    ↗
                  </span>
                </a>
              </Magnetic>
              <a href="/id/belajar/js-dasar-analis" className="link-more">
                Coba Lab Demo →
              </a>
            </div>
            <p className="hero-enter hero-enter-4 mt-5 font-mono text-[11px] text-zinc-500">
              Gratis · Tanpa kartu kredit · Jakarta — Makassar
            </p>
          </div>

          <div className="hero-enter hero-enter-3 md:col-span-5">
            <div className="bezel">
              <div className="bezel-inner">
                <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
                  <span className="live-dot" aria-hidden />
                  <span className="font-mono text-[11px] text-zinc-400">penilaian-ai · live</span>
                  <span className="ml-auto font-mono text-[11px] text-zinc-600">0.91 keyakinan</span>
                </div>
                <div className="p-5">
                  <p className="font-mono text-xs text-zinc-500">submisi · spt_tahunan.py</p>
                  <p className="mt-1 font-mono text-sm text-zinc-100">12/12 uji lolos · 0,8 dtk</p>
                  <div className="mt-4 space-y-3">
                    {[
                      ["Ketepatan hitung", "92%"],
                      ["Kelengkapan berkas", "84%"],
                      ["Kepatuhan prosedur", "88%"],
                    ].map(([k, v]) => (
                      <div key={k}>
                        <div className="flex justify-between font-mono text-[11px]">
                          <span className="text-zinc-400">{k}</span>
                          <span className="tnum text-accent">{v}</span>
                        </div>
                        <div className="bar-track mt-1.5">
                          <div className="bar-fill" style={{ width: v }} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 rounded-lg border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 font-mono text-[11px] text-emerald-300">
                    KOMPETEN (87) — siap diajukan ke wallet
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2 · TRUST — logo-only marquee (once per page) ── */}
      <section aria-label="Didukung kerangka nasional" className="border-b border-white/10 py-8">
        <div className="marquee-mask overflow-hidden">
          <div className="marquee-track items-center gap-12 pr-12">
            {[...LOGOS, ...LOGOS].map((logo, i) => (
              <span key={`${logo}-${i}`} aria-hidden={i >= LOGOS.length} className="flex items-center gap-3">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <circle cx="12" cy="12" r="10" stroke="#3f3f46" strokeWidth="1.5" />
                  <text x="12" y="15.5" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="#a1a1aa">
                    {logo.slice(0, 1)}
                  </text>
                </svg>
                <span className="font-mono text-sm tracking-wide text-zinc-400">{logo}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3 · ROLE BENTO — asymmetric 12-col ─────────── */}
      <section id="jalur" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-24 md:py-36">
        <Reveal>
          <h2 className="max-w-[20ch] text-3xl font-bold tracking-tight md:text-5xl">
            Mau jadi apa setelah lulus? Tinggal pilih.
          </h2>
          <p className="mt-4 max-w-[60ch] text-[15px] leading-relaxed text-zinc-400">
            Setiap jalur memetakan gaji awal, durasi, dan level KKNI. Lima unggulan di bawah — sisanya di arsip.
          </p>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-12">
          {BENTO.map((r, i) => (
            <Reveal key={r.slug} delay={(i % 3) * 80} className={r.span}>
              <a
                href={`/id/paths/${r.slug}`}
                className="spot group block h-full overflow-hidden rounded-2xl border border-white/10 bg-ink-900"
              >
                <div className={`photo-cine ${r.aspect}`}>
                  <img
                    src={r.img}
                    alt={r.alt}
                    loading="lazy"
                    decoding="async"
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                  />
                  {r.hot && (
                    <span className="absolute left-3 top-3 rounded-full bg-action px-2.5 py-1 font-mono text-[10px] font-bold text-white">
                      HOT
                    </span>
                  )}
                  <span className="absolute bottom-3 left-4 font-mono text-[11px] text-zinc-200">
                    KKNI {r.kkni} · {r.weeks} minggu
                  </span>
                </div>
                <div className="flex items-baseline justify-between gap-3 p-5">
                  <p className="text-lg font-semibold tracking-tight transition group-hover:text-accent">{r.title}</p>
                  <p className="tnum flex-none font-mono text-xs text-zinc-400">{r.salary}</p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
        <Reveal delay={120}>
          <a href="/id/paths/ai-engineer" className="link-more mt-8 inline-block">
            Lihat 20+ jalur di semua 7 kategori →
          </a>
        </Reveal>
      </section>

      {/* ── 4 · AI DEMO — the one split ────────────────── */}
      <section id="penilaian-ai" className="scroll-mt-20 border-y border-white/10 bg-ink-900/40">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-24 md:grid-cols-2 md:items-center md:py-36">
          <Reveal>
            <h2 className="max-w-[18ch] text-3xl font-bold tracking-tight md:text-4xl">
              Dinilai seperti asesor manusia. Lengkap dengan alasannya.
            </h2>
            <ol className="mt-8 space-y-5">
              {[
                ["Ensemble 3 model", "Tiap rubrik dinilai tiga evaluator independen, lalu dikonsensus. Bukan satu skor misterius."],
                ["Ambang keyakinan 0,7", "Di bawah itu, submisi otomatis masuk antrean review manusia."],
                ["Sandbox + anti-plagiarisme", "Kode dieksekusi terisolasi. Kemiripan AST dideteksi."],
              ].map(([h, d], i) => (
                <li key={h} className="flex gap-4">
                  <span className="tnum font-mono text-sm text-accent">0{i + 1}</span>
                  <div>
                    <p className="text-[15px] font-semibold">{h}</p>
                    <p className="mt-1 max-w-[52ch] text-sm leading-relaxed text-zinc-400">{d}</p>
                  </div>
                </li>
              ))}
            </ol>
            <a href="/id/belajar/js-dasar-analis" className="link-more mt-8 inline-block">
              Coba Lab Demo →
            </a>
          </Reveal>
          <Reveal delay={120}>
            <div className="bezel">
              <div className="bezel-inner space-y-4 p-5">
                {RUBRIK.map((r) => (
                  <div key={r.t} className="rounded-xl border border-white/10 bg-ink-950 p-5">
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="text-sm font-semibold">{r.t}</p>
                      <p className="tnum font-mono text-2xl font-bold text-accent">{r.s}</p>
                    </div>
                    <div className="bar-track mt-3">
                      <div className="bar-fill" style={{ width: r.w }} />
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-zinc-400">{r.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 5 · SKKNI — grouped clusters, no divide-y ──── */}
      <section id="skkni" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-24 md:py-36">
        <Reveal>
          <h2 className="max-w-[22ch] text-3xl font-bold tracking-tight md:text-4xl">
            Tiap milestone memetakan satu unit SKKNI resmi.
          </h2>
          <p className="mt-4 max-w-[60ch] text-[15px] leading-relaxed text-zinc-400">
            Bukan kursus generik. Badge yang kamu kumpulkan adalah bukti kompetensi yang diakui LSP di seluruh Indonesia.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {SKKNI_GROUPS.map((g, gi) => (
            <Reveal key={g.h} delay={gi * 80}>
              <div className="h-full rounded-2xl border border-white/10 bg-ink-900 p-6">
                <p className="text-sm font-semibold">{g.h}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {g.items.map(([code, title]) => (
                    <div key={code} className="rounded-lg border border-white/10 bg-ink-950 px-3 py-2.5">
                      <p className="font-mono text-[11px] text-accent">{code}</p>
                      <p className="mt-1 text-[13px] text-zinc-200">{title}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={100}>
          <div className="photo-cine mt-4 aspect-[21/8] rounded-2xl border border-white/10">
            <img
              src={IMG("1552664730-d307ca884978", 1600)}
              alt="Pelatihan vokasi di tempat uji kompetensi — peserta berdiskusi mengelilingi meja"
              loading="lazy"
              decoding="async"
              sizes="(max-width: 768px) 100vw, 1200px"
              className="h-full w-full object-cover"
            />
            <p className="absolute bottom-4 left-5 font-mono text-[11px] text-zinc-200">
              TUK · tempat uji kompetensi — Jakarta · Surabaya · Bandung
            </p>
          </div>
        </Reveal>
      </section>

      {/* ── 6 · OUTCOMES — sticky stack ────────────────── */}
      <section className="border-y border-white/10 bg-ink-900/40">
        <div className="mx-auto max-w-4xl px-4 py-24 md:py-36">
          <Reveal>
            <h2 className="text-center text-3xl font-bold tracking-tight md:text-5xl">
              Yang sudah melewatinya
            </h2>
          </Reveal>
          <div className="mt-12">
            <StackDim>
            {OUTCOMES.map((o, i) => (
              <div key={o.h} data-stack-card className="stack-card sticky flex min-h-[52dvh] items-center justify-center" style={{ top: `${96 + i * 20}px` }}>
                <figure data-stack-inner className="stack-frame w-full p-8 md:p-12">
                  <span className="tnum font-mono text-xs text-accent">0{i + 1} / 03</span>
                  <blockquote className="mt-3 max-w-[26ch] text-2xl font-bold leading-[1.1] tracking-tight md:text-4xl">
                    “{o.h}”
                  </blockquote>
                  <p className="mt-4 max-w-[52ch] text-sm leading-relaxed text-zinc-400">{o.d}</p>
                  <figcaption className="mt-5 font-mono text-xs text-zinc-500">{o.who}</figcaption>
                </figure>
              </div>
            ))}
            </StackDim>
          </div>
        </div>
      </section>

      {/* ── 7 · PRICING ────────────────────────────────── */}
      <section id="harga" className="mx-auto max-w-5xl scroll-mt-20 px-4 py-24 md:py-36">
        <Reveal>
          <h2 className="text-center text-3xl font-bold tracking-tight md:text-4xl">Gratis dulu. Upgrade kalau siap.</h2>
        </Reveal>
        <div className="mt-10 grid items-stretch gap-4 md:grid-cols-2">
          <Reveal className="h-full">
            <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-ink-900 p-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-500">Gratis</p>
              <p className="tnum mt-3 font-mono text-4xl font-bold">Rp0</p>
              <ul className="mt-6 flex-1 space-y-2.5 text-sm leading-relaxed text-zinc-300">
                <li>Semua jalur + lab + kuis</li>
                <li>Asesmen AI + umpan balik rubrik</li>
                <li>Badge OB 3.0 + QR verifikasi</li>
                <li>Dompet kredensial + share LinkedIn</li>
              </ul>
              <a href="/id/auth/daftar" className="btn-ghost mt-8 justify-center">
                Mulai Gratis
              </a>
            </div>
          </Reveal>
          <Reveal delay={100} className="h-full">
            <div className="flex h-full flex-col rounded-2xl border border-accent/40 bg-ink-900 p-8 shadow-[0_0_60px_-20px_rgba(0,212,255,0.4)]">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">BNSP via LSP</p>
              <p className="tnum mt-3 font-mono text-4xl font-bold">
                Rp1,25 jt<span className="text-base font-normal text-zinc-500">+</span>
              </p>
              <ul className="mt-6 flex-1 space-y-2.5 text-sm leading-relaxed text-zinc-300">
                <li>Semua yang ada di Gratis</li>
                <li>Uji kompetensi di TUK / online proctoring</li>
                <li>Sertifikat BNSP terverifikasi nasional</li>
                <li>Aktivasi sekali klik dari dasbor</li>
              </ul>
              <a href="/id/dashboard" className="btn-primary btn-accent group mt-8 justify-center">
                Mulai Gratis
                <span className="btn-island" aria-hidden>
                  ↗
                </span>
              </a>
              <p className="mt-3 text-center font-mono text-[11px] text-zinc-500">upgrade BNSP di dalam dasbor</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 8 · CTA ────────────────────────────────────── */}
      <section className="relative overflow-hidden border-t border-white/10">
        <div className="hero-glow" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 py-24 text-center md:py-36">
          <Reveal>
            <h2 className="mx-auto max-w-[18ch] text-4xl font-bold leading-[1.05] tracking-tighter md:text-6xl">
              Semester ini upgrade skill. Semester depan dipanggil kerja.
            </h2>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
              <Magnetic strength={14}>
                <a href="/id/auth/daftar" className="btn-primary btn-accent group px-7 py-4 text-[15px]">
                  Mulai Gratis
                  <span className="btn-island" aria-hidden>
                    ↗
                  </span>
                </a>
              </Magnetic>
            </div>
            <p className="mt-5 font-mono text-[11px] text-zinc-500">chat WhatsApp · support ID/EN · Jakarta — Makassar</p>
          </Reveal>
        </div>
        <SiteFooter />
      </section>
    </main>
  );
}
