import { Reveal } from "@/components/reveal";

const ROLES: { slug: string; id: string; salary: string; weeks: number; hot: boolean; img?: string; alt?: string }[] = [
  { slug: "ai-engineer", id: "AI Engineer", salary: "12–25 jt", weeks: 24, hot: true, img: "https://picsum.photos/seed/sb-ai-lab/800/450?grayscale", alt: "Ruang kerja insinyur AI" },
  { slug: "soc-analyst", id: "Analis SOC", salary: "8–18 jt", weeks: 20, hot: true },
  { slug: "ehs-specialist", id: "Spesialis EHS", salary: "7–15 jt", weeks: 20, hot: true, img: "https://picsum.photos/seed/sb-field-safety/800/450?grayscale", alt: "Inspeksi keselamatan lapangan" },
  { slug: "junior-accountant", id: "Akuntan Junior", salary: "6–9 jt", weeks: 24, hot: false },
  { slug: "it-project-manager", id: "IT Project Manager", salary: "10–25 jt", weeks: 16, hot: false },
  { slug: "mining-coordinator", id: "Koordinator Tambang", salary: "7–14 jt", weeks: 16, hot: false, img: "https://picsum.photos/seed/sb-mine-site/800/450?grayscale", alt: "Operasi site tambang" },
  { slug: "performance-marketer", id: "Performance Marketer", salary: "6–15 jt", weeks: 12, hot: false },
  { slug: "b2b-sales", id: "B2B Sales", salary: "7–15 jt", weeks: 8, hot: false },
];

const SKKNI_ROWS = [
  ["J.620100.001.01", "Menganalisis Tools", "AI Engineer · Analis SOC"],
  ["M.691090.005.01", "PPh, PPN & e-Faktur", "Akuntan Junior"],
  ["M.70MKT00.012.1", "Media Sosial & Aplikasi Daring", "Performance Marketer"],
  ["SKKNI-K3-U2", "HIRADC & Investigasi Insiden", "Spesialis EHS"],
];

const OUTCOMES = [
  ["87 → Kompeten", "Skor AI naik 34 poin dalam 6 minggu. Umpan balik per rubrik, bukan sekadar angka.", "Rani · Akuntansi UNPAD"],
  ["Badge ke-4 → dipanggil interview", "Rekruter memverifikasi badge via QR di CV. Tanpa surat lamaran generik.", "Dimas · SI UI"],
  ["BNSP di semester 7", "Upgrade LSP dari dasbor, uji di TUK, sertifikat terverifikasi nasional.", "Sinta · K3 UGM"],
];

export default function HomePage() {
  return (
    <main className="overflow-x-clip bg-ink-950 text-zinc-100">
      {/* ── 1 · HERO ─────────────────────────────── */}
      <section className="relative min-h-[100dvh] border-b border-white/10">
        <div className="absolute inset-0" aria-hidden>
          <img
            src="https://picsum.photos/seed/sb-campus-night/1600/900?grayscale"
            alt=""
            loading="eager"
            className="h-full w-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-950/70 via-ink-950/55 to-ink-950" />
          <div className="absolute inset-0 bg-accent/10 mix-blend-overlay" />
        </div>
        <div className="hero-glow" aria-hidden />
        <nav className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <span className="font-mono text-sm font-bold tracking-tight">
            SUPER<span className="text-accent">BRIGHT</span>
            <span className="ml-2 hidden font-mono text-[10px] font-normal tracking-[0.22em] text-zinc-500 sm:inline">CAREER</span>
          </span>
          <div className="flex items-center gap-4">
            <span className="hidden font-mono text-[11px] text-zinc-500 sm:inline">ID / EN</span>
            <a href="/id/auth/masuk" className="text-sm text-zinc-400 hover:text-white">Masuk</a>
            <a href="#roles" className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-ink-950 transition active:translate-y-[1px]">
              Mulai Gratis
            </a>
          </div>
        </nav>
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 pb-16 pt-10 md:grid-cols-12 md:pt-16">
          <div className="md:col-span-7 md:self-end">
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
                SKKNI · KKNI · AI-graded — Built for Indonesian students
              </p>
              <h1 className="mt-4 max-w-[14ch] text-5xl font-bold leading-[1.02] tracking-tighter md:text-7xl">
                Lulus kuliah, langsung siap kerja.
              </h1>
              <p className="mt-5 max-w-[48ch] text-base leading-relaxed text-zinc-400">
                Pilih peran impianmu. Selesaikan jalur selaras SKKNI, dinilai AI per
                rubrik, dan bawa pulang kredensial yang bisa diverifikasi rekruter.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#roles" className="rounded-full bg-white px-7 py-3 text-sm font-semibold text-ink-950 transition hover:bg-accent active:translate-y-[1px]">
                  Pilih Peranmu
                </a>
                <a href="/id/belajar/js-dasar-analis" className="rounded-full border border-white/15 px-7 py-3 text-sm font-semibold transition hover:border-accent active:translate-y-[1px]">
                  Coba Lab Demo
                </a>
              </div>
            </Reveal>
          </div>
          <div className="md:col-span-5">
            <Reveal delay={120}>
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-ink-900/90">
                <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                  <span className="ml-2 font-mono text-[11px] text-zinc-500">penilaian-ai — live</span>
                </div>
                <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed text-zinc-300">
{`submisi: spt_tahunan.py
uji: 12/12 lolos · 0,8 dtk

rubrik SKKNI-M.691090.005.01
├ ketepatan hitung ..... 92
├ kelengkapan berkas ... 84
└ kepatuhan prosedur ... 88

keputusan: KOMPETEN (87)
keyakinan AI: 0.91 ✓`}
                </pre>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 2 · TRUST ────────────────────────────── */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <p className="text-center font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-500">
            Selaras dengan kerangka nasional
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {["SKKNI · 194 skema", "KKNI · Level 1–9", "BNSP · LSP mitra", "QRIS · GoPay · VA", "Jakarta · SBY · BDG"].map((t) => (
              <span key={t} className="font-mono text-sm text-zinc-300">{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3 · ROLE BENTO ───────────────────────── */}
      <section id="roles" className="mx-auto max-w-7xl px-4 py-20 md:py-28">
        <Reveal>
          <h2 className="max-w-[20ch] text-3xl font-bold tracking-tight md:text-5xl">
            Mau jadi apa setelah lulus? Tinggal pilih.
          </h2>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ROLES.map((r, i) => (
            <Reveal key={r.slug} delay={(i % 4) * 70}>
              <a
                href={`/id/paths/${r.slug}`}
                className={`group block h-full overflow-hidden rounded-2xl border border-white/10 bg-ink-900 transition hover:border-accent/60 active:translate-y-[1px] ${
                  i === 0 ? "lg:col-span-2 lg:row-span-1" : ""
                }`}
              >
                {r.img && (
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img src={r.img} alt={r.alt ?? r.id} loading="lazy" className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-transparent to-transparent" />
                    <div className="absolute inset-0 bg-accent/15 mix-blend-overlay" />
                  </div>
                )}
                <div className="p-5">
                <div className="flex items-start justify-between">
                  <p className="text-lg font-semibold tracking-tight group-hover:text-accent">{r.id}</p>
                  {r.hot && (
                    <span className="rounded-full bg-action/15 px-2.5 py-1 font-mono text-[10px] text-action">
                      HOT 2025
                    </span>
                  )}
                </div>
                <dl className="mt-4 space-y-1.5 font-mono text-xs text-zinc-400">
                  <div className="flex justify-between"><dt>Gaji awal</dt><dd className="text-zinc-100">IDR {r.salary}</dd></div>
                  <div className="flex justify-between"><dt>Durasi</dt><dd className="text-zinc-100">{r.weeks} minggu</dd></div>
                </dl>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── 4 · AI DEMO SPLIT ────────────────────── */}
      <section className="border-y border-white/10 bg-ink-900/40">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 md:grid-cols-2 md:py-28">
          <Reveal>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Dinilai AI seperti asesor manusia. Lengkap dengan alasannya.
            </h2>
            <ul className="mt-6 space-y-3 text-sm leading-relaxed text-zinc-300">
              <li><span className="font-mono text-accent">01 — </span>Ensemble 3 model menilai tiap rubrik, bukan satu skor misterius.</li>
              <li><span className="font-mono text-accent">02 — </span>Keyakinan di bawah 0,7 otomatis masuk antrean review manusia.</li>
              <li><span className="font-mono text-accent">03 — </span>Kode dieksekusi di sandbox. Plagiarisme terdeteksi via AST.</li>
              <li><span className="font-mono text-accent">04 — </span>Simulasi soft-skill multi-agen: klien, manajer, stakeholder sulit.</li>
            </ul>
            <a href="/id/belajar/js-dasar-analis" className="mt-6 inline-block font-mono text-sm text-accent underline-offset-4 hover:underline">
              Coba lab demo tanpa daftar →
            </a>
          </Reveal>
          <Reveal delay={120}>
            <div className="grid gap-4">
              {[
                ["Ketepatan Teknis", 92, "Semua test lolos, kompleksitas O(n)."],
                ["Kelengkapan Bukti", 84, "Kurang screenshot bukti uji manual."],
                ["Komunikasi Profesional", 88, "Penjelasan lugas, nada klien-ready."],
              ].map(([t, s, d]) => (
                <div key={t as string} className="rounded-2xl border border-white/10 bg-ink-950 p-5">
                  <div className="flex items-baseline justify-between">
                    <p className="text-sm font-semibold">{t}</p>
                    <p className="font-mono text-2xl font-bold text-accent">{s}</p>
                  </div>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-accent" style={{ width: `${s}%` }} />
                  </div>
                  <p className="mt-2 text-xs text-zinc-400">{d}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 5 · SKKNI MAP ────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:py-28">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <Reveal>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Tiap milestone = 1 unit SKKNI resmi.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                Bukan kursus generik. Setiap badge yang kamu kumpulkan memetakan
                kode kompetensi yang diakui industri dan LSP di seluruh Indonesia.
              </p>
              <div className="relative mt-6 aspect-[16/10] overflow-hidden rounded-2xl border border-white/10">
                <img
                  src="https://picsum.photos/seed/sb-workshop-detail/640/400?grayscale"
                  alt="Detail workshop industri"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-accent/15 mix-blend-overlay" />
                <p className="absolute bottom-3 left-4 font-mono text-[11px] text-zinc-200">TUK · tempat uji kompetensi</p>
              </div>
            </Reveal>
          </div>
          <div className="md:col-span-8">
            <div className="divide-y divide-white/10 border-y border-white/10">
              {SKKNI_ROWS.map(([code, title, roles], i) => (
                <Reveal key={code} delay={i * 60}>
                  <div className="grid gap-1 py-4 sm:grid-cols-12 sm:items-center">
                    <p className="font-mono text-xs text-accent sm:col-span-4">{code}</p>
                    <p className="text-sm font-medium sm:col-span-5">{title}</p>
                    <p className="font-mono text-[11px] text-zinc-500 sm:col-span-3 sm:text-right">{roles}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 6 · OUTCOMES STICKY STACK ────────────── */}
      <section className="border-y border-white/10 bg-ink-900/40">
        <div className="mx-auto max-w-4xl px-4 py-20 md:py-28">
          <Reveal>
            <h2 className="text-center text-3xl font-bold tracking-tight md:text-4xl">
              Yang sudah melewatinya
            </h2>
          </Reveal>
          <div className="mt-10">
            {OUTCOMES.map(([h, d, who], i) => (
              <div key={h} className="stack-card sticky flex min-h-[46dvh] items-center justify-center" style={{ top: `${88 + i * 16}px` }}>
                <figure className="w-full rounded-3xl border border-white/10 bg-ink-950 p-8 shadow-2xl md:p-10">
                  <blockquote className="max-w-[28ch] text-2xl font-bold leading-tight tracking-tight md:text-3xl">
                    “{h}”
                  </blockquote>
                  <p className="mt-4 max-w-[52ch] text-sm leading-relaxed text-zinc-400">{d}</p>
                  <figcaption className="mt-4 font-mono text-xs text-accent">{who}</figcaption>
                </figure>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7 · PRICING ──────────────────────────── */}
      <section className="mx-auto max-w-5xl px-4 py-20 md:py-28">
        <Reveal>
          <h2 className="text-center text-3xl font-bold tracking-tight md:text-4xl">Gratis dulu. Upgrade kalau siap.</h2>
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-3xl border border-white/10 bg-ink-900 p-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-500">Gratis</p>
              <p className="mt-3 font-mono text-4xl font-bold">Rp0</p>
              <ul className="mt-6 space-y-2.5 text-sm text-zinc-300">
                <li>Semua jalur + lab + kuis</li>
                <li>Asesmen AI + umpan balik rubrik</li>
                <li>Badge OB 3.0 + VC + QR verifikasi</li>
                <li>Dompet kredensial + share LinkedIn</li>
              </ul>
              <a href="/id/auth/daftar" className="mt-8 block rounded-full bg-white px-6 py-3 text-center text-sm font-semibold text-ink-950 transition hover:bg-accent active:translate-y-[1px]">
                Daftar Gratis
              </a>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="h-full rounded-3xl border border-accent/40 bg-ink-900 p-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">BNSP via LSP</p>
              <p className="mt-3 font-mono text-4xl font-bold">Rp1,25 jt<span className="text-base text-zinc-500">+</span></p>
              <ul className="mt-6 space-y-2.5 text-sm text-zinc-300">
                <li>Semua yang ada di Gratis</li>
                <li>Uji kompetensi di TUK / online proctoring</li>
                <li>Sertifikat BNSP terverifikasi nasional</li>
                <li>Aktivasi sekali klik dari dasbor</li>
              </ul>
              <a href="/id/dashboard" className="mt-8 block rounded-full bg-action px-6 py-3 text-center text-sm font-semibold text-white transition active:translate-y-[1px]">
                Upgrade di Dasbor
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 8 · CTA + FOOTER ─────────────────────── */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-20 text-center md:py-28">
          <Reveal>
            <h2 className="mx-auto max-w-[18ch] text-4xl font-bold leading-tight tracking-tighter md:text-6xl">
              Semester ini upgrade skill. Semester depan dipanggil kerja.
            </h2>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href="/id/auth/daftar" className="rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-ink-950 transition hover:brightness-110 active:translate-y-[1px]">
                Mulai Gratis Sekarang
              </a>
            </div>
            <p className="mt-4 font-mono text-[11px] text-zinc-500">chat WhatsApp · support ID/EN · Jakarta — Makassar</p>
          </Reveal>
        </div>
        <footer className="border-t border-white/10">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 sm:flex-row">
            <span className="font-mono text-xs text-zinc-500">
              CAREER SUPER<span className="text-accent">BRIGHT</span> © 2026
            </span>
            <span className="font-mono text-[11px] text-zinc-600">SKKNI-native · OB 3.0 · W3C VC 2.0</span>
          </div>
        </footer>
      </section>
    </main>
  );
}
