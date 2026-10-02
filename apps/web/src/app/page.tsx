import { Reveal } from "@/components/reveal";
import { SiteNav, SiteFooter } from "@/components/site-chrome";
import { PX } from "@/lib/visual";

/*
 * Design read: B2C+B2B+B2G education platform landing for Indonesian learners 18+,
 * with a friendly-practical Microsoft-trustworthy language, leaning toward Fluent-inspired Tailwind + Jakarta Sans + minimal motion.
 * Dials: VARIANCE 4 / MOTION 3 / DENSITY 5.
 * Aligned to CAREERBRIGHT_MASTER_PLAN2.md: goal-first (§28), 7 pillars (§6), paths (§9),
 * Indonesia Context Layer (§10), Bright AI (§13-14), skill/career/portfolio/prove (§15-19), pricing (§34).
 * Brand: "Dari Belajar Jadi Bisa." Friendly, not LMS-academic.
 * Shape lock: buttons 12px · cards 20px · media 16px · inputs 10px. Cobalt locked.
 * Eyebrows: 3 total (hero, pillars, certificates).
 */

/* Photography: local-ID only, see src/lib/visual.ts (verified IDs, guide). */

/* §28 Discovery — 6 goals, bento 2+4 (avoids 3-equal-cards ban) */
const GOALS = [
  { h: "Dapat Kerja Baru", d: "CV, portofolio, interview, tes teknis.", m: "Rina · 22 · fresh graduate", big: true },
  { h: "Naikkan Skill", d: "Level terukur per skill, bukan jam nonton.", m: "Frontend Lv 3", big: true },
  { h: "Mulai Usaha", d: "UMKM digital end-to-end.", m: "10 modul", big: false },
  { h: "Kuasai Teknologi", d: "Web, AI, data, cloud.", m: "50+ kursus inti", big: false },
  { h: "Jadi Leader", d: "Manajemen, komunikasi, negosiasi.", m: "Simulasi workplace", big: false },
  { h: "Tumbuh Pribadi", d: "Finansial, produktivitas, literasi.", m: "Bahasa Indonesia", big: false },
];

/* §6 seven pillars — 4+3 grid */
const PILLARS = [
  { h: "Learn", d: "Belajar lewat kasus nyata industri." },
  { h: "Practice", d: "Kuis, simulasi, latihan hands-on." },
  { h: "Build", d: "Proyek nyata. Bukan sekadar nonton." },
  { h: "Prove", d: "Asesmen + sertifikat terverifikasi." },
  { h: "Work", d: "Magang, freelance, pekerjaan." },
  { h: "Connect", d: "Komunitas kota + mentor." },
  { h: "Local Context", d: "Bisnis, birokrasi, budaya Indonesia." },
];

/* §9 paths */
const FE_PATH = [
  ["Beginner", "HTML → CSS → JavaScript"],
  ["Intermediate", "TypeScript → React → API → Git"],
  ["Advanced", "Testing → Arsitektur → Deployment"],
  ["Portofolio", "Website bisnis Indonesia asli"],
  ["Karier", "CV → Interview → Tes teknis"],
];
const UMKM_PATH = ["Bisnis dasar", "Riset pelanggan", "Branding", "Marketplace", "Sosmed", "Iklan digital", "Akuntansi", "Pajak dasar", "AI bisnis", "Analitik"];

/* Verified-200 SimpleIcons slugs (checked 2026-10-01). Logo-only wall. */
const HIRING: [string, string][] = [
  ["gojek", "Gojek"],
  ["grab", "Grab"],
  ["shopee", "Shopee"],
  ["bukalapak", "Bukalapak"],
  ["blibli", "Blibli"],
  ["tiktok", "TikTok"],
  ["google", "Google"],
  ["apple", "Apple"],
  ["samsung", "Samsung"],
  ["googlecloud", "Google Cloud"],
];
/* Campus/partner monograms (invented marks, not plain wordmarks).
   label = full name, mark = 2-letter monogram (explicit, never sliced). */
const CAMPUSES: [string, string][] = [["UI", "UI"], ["UGM", "UG"], ["ITB", "IT"], ["UNPAD", "UN"]];

export default function HomePage() {
  return (
    <main className="overflow-x-clip bg-paper pt-[96px] text-ink">
      <a href="#konten" className="skip-link">Lewati ke konten</a>
      <SiteNav />

      {/* ── 1 · HERO — kept layout, PRD2 copy ── */}
      <section className="relative overflow-hidden border-b border-line bg-white">
        <div className="hero-glow" aria-hidden />
        <div id="konten" className="relative mx-auto grid w-full max-w-7xl items-center gap-10 px-4 pb-12 pt-12 md:pt-16 lg:grid-cols-2">
          <div>
            <p className="hero-enter hero-enter-1 font-mono text-[11px] uppercase tracking-[0.18em] text-brand-700">
              Belajar. Berkembang. Jadi Lebih Bright.
            </p>
            <h1 className="hero-enter hero-enter-2 mt-4 max-w-[15ch] text-4xl font-bold leading-[1.04] md:text-6xl">
              Dari Belajar Jadi Bisa.
            </h1>
            <p className="hero-enter hero-enter-3 mt-4 max-w-[46ch] text-[15px] leading-relaxed text-soft">
              Pilih tujuanmu, kuasai skill praktis konteks Indonesia, sampai portofolio.
            </p>
            <div className="hero-enter hero-enter-3 mt-6 flex flex-wrap items-center gap-3">
              <a href="/id/auth/daftar" className="btn-primary group">
                Mulai Gratis
                <span className="btn-island" aria-hidden>↗</span>
              </a>
              <a href="#tujuan" className="btn-ghost">Pilih Tujuan</a>
            </div>
          </div>

          <div className="hero-enter hero-enter-4">
            <div className="panel" role="img" aria-label="Pratinjau konsol SuperBright: Bright AI menjelaskan API, skor 87, siap terbit">
              <div className="flex items-center gap-2 border-b border-line px-4 py-3">
                <span className="live-dot" aria-hidden />
                <span className="font-mono text-[11px] text-soft">SuperBright Console</span>
                <span className="ml-auto hidden gap-2 font-mono text-[11px] sm:flex">
                  <span className="rounded-md bg-brand-50 px-2 py-0.5 text-brand-700">Bright AI</span>
                  <span className="px-2 py-0.5 text-faint">Jalur</span>
                  <span className="px-2 py-0.5 text-faint">Portofolio</span>
                </span>
              </div>
              <div className="grid gap-0 sm:grid-cols-5">
                <div className="border-b border-line p-5 sm:col-span-3 sm:border-b-0 sm:border-r">
                  <p className="font-mono text-xs text-muted">bright-ai · “Saya tidak mengerti API.”</p>
                  <p className="mt-2 rounded-xl border border-line bg-paper p-3 text-[13px] leading-relaxed text-soft">
                    Anggap API seperti kasir restoran: kamu pesan, dapur proses, kasir antar. Pelajaran terkait: REST API · 12 mnt.
                  </p>
                  <div className="mt-4 space-y-3">
                    {[["JavaScript", "92%"], ["TypeScript", "74%"], ["React", "61%"]].map(([k, v]) => (
                      <div key={k}>
                        <div className="flex justify-between font-mono text-[11px]">
                          <span className="text-muted">{k}</span>
                          <span className="tnum font-bold text-brand-700">{v}</span>
                        </div>
                        <div className="bar-track mt-1.5"><div className="bar-fill" style={{ width: v }} /></div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-5 sm:col-span-2">
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">Skill berikutnya</p>
                  <p className="mt-2 text-[15px] font-bold">Automated testing</p>
                  <p className="mt-1 font-mono text-[11px] leading-relaxed text-muted">Rekomendasi dari Skill Graph · 4–6 bulan</p>
                  <p className="tnum mt-3 font-mono text-3xl font-bold text-ok">87</p>
                  <p className="mt-1 text-[13px] font-medium">KOMPETEN · QR siap</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative border-t border-line">
          <dl className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-6 md:grid-cols-4">
            {[
              ["50–100", "kursus inti saat peluncuran"],
              ["4–6 bln", "dari nol sampai siap lamar"],
              ["7", "pilar: Learn → Konteks ID"],
              ["ID / EN", "Indonesia dulu, Inggris siap"],
            ].map(([v, l]) => (
              <div key={l}>
                <dt className="tnum font-mono text-2xl font-bold">{v}</dt>
                <dd className="mt-1 text-[13px] text-muted">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── 2 · GOAL-FIRST (§28) — bento 2 large + 4 small ── */}
      <section id="tujuan" className="mx-auto max-w-7xl scroll-mt-28 px-4 py-16 md:py-20">
        <Reveal>
          <h2 className="max-w-[24ch] text-3xl font-bold md:text-4xl">Halo, mau jadi apa?</h2>
          <p className="mt-3 max-w-[60ch] text-[15px] leading-relaxed text-soft">Bukan “kursus apa?” tapi “mau mencapai apa?” Pilih tujuan, kami susun jalurnya.</p>
        </Reveal>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-12">
          {GOALS.map((g, i) => (
            <Reveal key={g.h} delay={(i % 4) * 60} className={g.big ? "md:col-span-6" : "md:col-span-3"}>
              <a href="#jalur" className={`spot group flex h-full flex-col justify-between overflow-hidden rounded-[20px] border border-line p-6 ${g.big ? "bg-brand-50" : "bg-white"}`}>
                <div>
                  <p className="text-[16px] font-bold group-hover:text-brand-700">{g.h}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-soft">{g.d}</p>
                </div>
                <p className="mt-4 font-mono text-[11px] text-muted">{g.m} →</p>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── 3 · 7 PILLARS (§6) — 4+3 enterprise grid ── */}
      <section id="pilar" className="scroll-mt-28 border-y border-line bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-20">
          <Reveal>
            <p className="font-mono text-xs font-medium text-brand-700">Cara kerja</p>
            <h2 className="mt-3 max-w-[26ch] text-3xl font-bold md:text-4xl">Learning → Skills → Projects → Career.</h2>
          </Reveal>
          <div className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-[20px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.slice(0, 4).map((s, i) => (
              <Reveal key={s.h} delay={i * 50} className="bg-white">
                <div className="h-full bg-white p-6">
                  <p className="tnum font-mono text-xs font-bold text-brand-700">0{i + 1}</p>
                  <p className="mt-2 text-[15px] font-bold">{s.h}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-soft">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-px grid grid-cols-1 gap-px overflow-hidden rounded-[20px] border border-line bg-line sm:grid-cols-3">
            {PILLARS.slice(4).map((s, i) => (
              <Reveal key={s.h} delay={i * 50} className="bg-white">
                <div className="h-full bg-white p-6">
                  <p className="tnum font-mono text-xs font-bold text-brand-700">0{i + 5}</p>
                  <p className="mt-2 text-[15px] font-bold">{s.h}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-soft">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4 · KASUS NYATA — use cases from real professional work, not video lessons ── */}
      <section id="kasus" className="mx-auto max-w-7xl scroll-mt-28 px-4 py-16 md:py-20">
        <Reveal>
          <h2 className="max-w-[24ch] text-3xl font-bold md:text-4xl">Bukan nonton video. Kerjakan kasus nyata.</h2>
          <p className="mt-3 max-w-[60ch] text-[15px] leading-relaxed text-soft">Skenario dari lingkungan kerja profesional Indonesia. Perusahaan fiktif, skill asli. Tiap kasus 1–2 minggu, bisa dicicil malam hari.</p>
        </Reveal>
        <Reveal delay={80}>
          <figure className="mt-8 overflow-hidden rounded-[20px] border border-line bg-card">
            <div className="photo-cine aspect-[21/8]">
              <img src={PX(7845344, 1600)} alt="Tim bisnis Asia berdiskusi di kantor modern" loading="lazy" decoding="async" sizes="(max-width: 1024px) 100vw, 1200px" className="h-full w-full object-cover" />
            </div>
            <figcaption className="flex flex-wrap items-center justify-between gap-2 bg-white px-5 py-3 font-mono text-[11px]">
              <span className="text-soft">Kolaborasi lintas divisi — seperti di kantor sungguhan</span>
              <span className="text-faint">Foto: Pexels</span>
            </figcaption>
          </figure>
        </Reveal>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <Reveal>
            <article className="spot group h-full overflow-hidden rounded-[20px] border border-line bg-white">
              <div className="photo-cine aspect-[16/8]">
                <img src={PX(34961614, 900)} alt="Analis muda bekerja dengan laptop di kantor Jakarta" loading="lazy" decoding="async" sizes="(max-width: 1024px) 100vw, 560px" className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]" />
              </div>
              <div className="p-6">
                <p className="font-mono text-[11px] text-muted">Data Analyst · SQL + Power BI · 2 minggu</p>
                <p className="mt-2 text-[16px] font-bold">Lonjakan retur di marketplace</p>
                <p className="mt-1.5 text-sm leading-relaxed text-soft">Analisis 3 bulan transaksi, temukan pola retur, sajikan dashboard dan rekomendasi promo ke tim.</p>
              </div>
            </article>
          </Reveal>
          <Reveal delay={80}>
            <article className="spot group h-full overflow-hidden rounded-[20px] border border-line bg-white">
              <div className="photo-cine aspect-[16/8]">
                <img src={PX(36617340, 900)} alt="Mahasiswa akuntansi mempelajari laporan keuangan di Jakarta" loading="lazy" decoding="async" sizes="(max-width: 1024px) 100vw, 560px" className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]" />
              </div>
              <div className="p-6">
                <p className="font-mono text-[11px] text-muted">Akuntansi · Excel + e-Faktur · 2 minggu</p>
                <p className="mt-2 text-[16px] font-bold">Tutup buku akhir bulan UMKM</p>
                <p className="mt-1.5 text-sm leading-relaxed text-soft">Rapikan pembukuan warung kopi, hitung PPh, hasilkan laporan laba rugi siap pajak.</p>
              </div>
            </article>
          </Reveal>
        </div>
        <Reveal delay={120}>
          <article className="spot group mt-4 grid overflow-hidden rounded-[20px] border border-line bg-white sm:grid-cols-5">
            <div className="photo-cine min-h-[200px] sm:col-span-2 sm:min-h-full">
              <img src={PX(7869341, 800)} alt="Presentasi hasil kerja di depan tim yang beragam" loading="lazy" decoding="async" sizes="(max-width: 640px) 100vw, 480px" className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]" />
            </div>
            <div className="p-6 sm:col-span-3 sm:p-8">
              <p className="font-mono text-[11px] text-muted">Workplace sim · dinilai Bright AI</p>
              <p className="mt-2 text-[16px] font-bold">Presentasi ke manajemen yang skeptis</p>
              <p className="mt-1.5 max-w-[52ch] text-sm leading-relaxed text-soft">Sampaikan temuanmu, terima feedback pedas, revisi dan coba lagi. Dinilai: komunikasi, profesionalisme, solusi.</p>
              <a href="#ai" className="link-more mt-4 inline-block">Coba simulator →</a>
            </div>
          </article>
        </Reveal>
      </section>

      {/* ── 5 · PATHS (§9) — Frontend + UMKM consoles ── */}
      <section id="jalur" className="mx-auto max-w-7xl scroll-mt-28 px-4 py-16 md:py-20">
        <Reveal>
          <h2 className="max-w-[26ch] text-3xl font-bold md:text-4xl">Jalur terstruktur, proyek Indonesia asli.</h2>
          <p className="mt-3 max-w-[62ch] text-[15px] text-soft">Setiap jalur berakhir di portofolio dan persiapan karier, bukan sekadar tontonan.</p>
        </Reveal>
        <div className="mt-8 grid items-start gap-4 lg:grid-cols-2">
          <Reveal>
            <div className="panel overflow-hidden !rounded-[20px] !shadow-none">
              <div className="flex items-center justify-between border-b border-line px-5 py-3">
                <span className="text-[14px] font-bold">Become a Frontend Developer</span>
                <span className="font-mono text-[11px] text-faint">4–6 bln</span>
              </div>
              {FE_PATH.map(([stage, items], i) => (
                <div key={stage} className={`px-5 py-3.5 ${i > 0 ? "border-t border-line" : ""}`}>
                  <p className="font-mono text-[11px] font-bold text-brand-700">{stage}</p>
                  <p className="mt-0.5 text-[13px] text-soft">{items}</p>
                </div>
              ))}
              <div className="border-t border-line bg-paper px-5 py-3">
                <a href="/id/paths/frontend-developer" className="link-more">Lihat silabus lengkap →</a>
              </div>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="panel overflow-hidden !rounded-[20px] !shadow-none">
              <div className="flex items-center justify-between border-b border-line px-5 py-3">
                <span className="text-[14px] font-bold">UMKM Digital Entrepreneur</span>
                <span className="font-mono text-[11px] text-faint">10 modul</span>
              </div>
              <div className="flex flex-wrap gap-2 px-5 py-4">
                {UMKM_PATH.map((m) => (
                  <span key={m} className="rounded-[10px] border border-line bg-paper px-3 py-1.5 text-[13px] text-soft">{m}</span>
                ))}
              </div>
              <div className="border-t border-line px-5 py-4">
                <p className="text-[13px] text-soft"><strong className="text-ink">Proyek akhir:</strong> strategi digital lengkap untuk UMKM kopi Bandung fiktif.</p>
                <figure className="mt-4 overflow-hidden rounded-2xl border border-line">
                  <div className="photo-cine aspect-[21/9]">
                    <img src={PX(35548840, 1200)} alt="Siswa belajar di kelas, Pandeglang, Banten" loading="lazy" decoding="async" sizes="(max-width: 1024px) 100vw, 560px" className="h-full w-full object-cover" />
                  </div>
                </figure>
              </div>
            </div>
          </Reveal>
        </div>
        <Reveal delay={120}>
          <a href="/id/katalog" className="link-more mt-8 inline-block">
            Cari 6 kursus + 5 jalur di Katalog →
          </a>
        </Reveal>
      </section>

      {/* ── 6 · INDONESIA CONTEXT (§10) + CATEGORIES (§7-8) — stacked, breaks split run ── */}
      <section id="konteks" className="scroll-mt-28 border-y border-line bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-20">
          <Reveal>
            <h2 className="max-w-[22ch] text-3xl font-bold md:text-4xl">Global diajarkan, Indonesia dijelaskan.</h2>
            <p className="mt-3 max-w-[52ch] text-[15px] text-soft">Lapisan konteks di tiap kursus: pembayaran lokal, regulasi, hierarki, kasus nyata.</p>
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-8 rounded-[20px] border border-line bg-paper p-5 md:p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="text-sm font-bold">Product Management — Indonesian Market</p>
                <p className="font-mono text-[11px] text-muted">Lapisan konteks · 8 modul</p>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {["Perilaku konsumen", "QRIS & VA", "Regulasi", "Marketplace lokal", "Hierarki bisnis", "Riset user ID", "Pricing lokal", "Studi kasus ID"].map((t) => (
                  <span key={t} className="rounded-[10px] border border-line bg-white px-3 py-1.5 text-[13px] text-soft">{t}</span>
                ))}
              </div>
            </div>
          </Reveal>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Pemerintahan", "Cara kerja kementerian, APBN, pengadaan, ASN digital."],
              ["Workplace ID", "Hierarki, budaya meeting, feedback, etiket kantor."],
              ["Bisnis ID", "UMKM, pajak dasar, perizinan, halal, supply chain."],
              ["Budaya & Harian", "Keuangan pribadi, scam online, data pribadi, parenting digital."],
            ].map(([h, d], i) => (
              <Reveal key={h} delay={i * 60}>
                <div className="h-full rounded-[20px] border border-line bg-paper p-5">
                  <p className="tnum font-mono text-xs font-bold text-brand-700">0{i + 1}</p>
                  <p className="mt-2 text-[14px] font-bold">{h}</p>
                  <p className="mt-1 text-[13px] leading-relaxed text-soft">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={100}>
            <figure className="mt-4 overflow-hidden rounded-[20px] border border-line bg-card">
              <div className="photo-cine aspect-[21/8]">
                <img src={PX(34961765, 1200)} alt="Profesional muda bekerja malam hari di kantor Jakarta" loading="lazy" decoding="async" sizes="(max-width: 1024px) 100vw, 1200px" className="h-full w-full object-cover" />
              </div>
              <figcaption className="flex flex-wrap items-center justify-between gap-2 bg-white px-5 py-3 font-mono text-[11px]">
                <span className="text-soft">Belajar malam hari — ritme profesional muda Jakarta</span>
                <span className="text-faint">Foto: Pexels</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* ── 7 · BRIGHT AI (§13-14) + SKILL/CAREER (§15-16) ── */}
      <section id="ai" className="mx-auto max-w-7xl scroll-mt-28 px-4 py-16 md:py-20">
        <div className="grid items-start gap-4 lg:grid-cols-2">
          <Reveal>
            <h2 className="max-w-[20ch] text-3xl font-bold md:text-4xl">Bright AI: tutor, simulator, perencana.</h2>
            <p className="mt-3 max-w-[52ch] text-[15px] text-soft">Menjelaskan materi, memberi hint, menilai tugas, simulasi interview.</p>
            <div className="mt-6 space-y-3">
              <div className="rounded-[14px] border border-line bg-white p-4">
                <p className="font-mono text-[11px] text-faint">Interview simulator · HR</p>
                <p className="mt-1.5 text-sm font-bold">“Ceritakan project e-commerce terakhirmu.”</p>
                <p className="mt-1 text-[13px] text-soft">AI menilai: struktur jawaban, metrik, sikap. Skor + saran perbaikan.</p>
              </div>
              <div className="rounded-[14px] border border-line bg-white p-4">
                <p className="font-mono text-[11px] text-faint">Workplace simulator</p>
                <p className="mt-1.5 text-sm font-bold">“Atasan minta lembur mustahil hari ini. Responsmu?”</p>
                <p className="mt-1 text-[13px] text-soft">Dijelaskan: komunikasi, profesionalisme, risiko, alternatif.</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="panel p-5 md:p-6">
              <p className="font-mono text-[11px] text-soft">Skill graph · Frontend Development</p>
              <div className="mt-4 space-y-3">
                {[["JavaScript", "Advanced", "92%"], ["TypeScript", "Intermediate", "74%"], ["React", "Intermediate", "61%"], ["Git", "Intermediate", "58%"], ["API", "Beginner", "34%"]].map(([k, lv, v]) => (
                  <div key={k}>
                    <div className="flex justify-between text-[13px]">
                      <span className="font-bold">{k} <span className="ml-1 font-mono text-[11px] font-normal text-muted">{lv}</span></span>
                      <span className="tnum font-mono text-[11px] text-brand-700">{v}</span>
                    </div>
                    <div className="bar-track mt-1.5"><div className="bar-fill" style={{ width: v }} /></div>
                  </div>
                ))}
              </div>
              <p className="mt-4 rounded-[10px] bg-brand-50 px-3 py-2.5 text-[13px] text-soft"><strong className="text-ink">Rekomendasi:</strong> automated testing — proyek dashboard keuangan.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 8 · PROVE: portfolio + certificates (§17-19) ── */}
      <section id="bukti" className="scroll-mt-28 border-y border-line bg-white">
        <div className="mx-auto grid max-w-7xl items-start gap-4 px-4 py-16 md:py-20 lg:grid-cols-2">
          <Reveal>
            <p className="font-mono text-xs font-medium text-brand-700">Bukti, bukan janji</p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">Portofolio publik + sertifikat terverifikasi.</h2>
            <div className="mt-6 rounded-[20px] border border-line bg-paper p-5">
              <p className="font-mono text-[11px] text-faint">superbright.id/u/rina</p>
              <p className="mt-1 text-[15px] font-bold">Rina · Data Analyst Path</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {["Excel", "SQL", "Python", "Power BI", "Simulasi interview ✓"].map((s) => (
                  <span key={s} className="rounded-[10px] border border-line bg-white px-3 py-1.5 font-mono text-[11px] text-soft">{s}</span>
                ))}
              </div>
              <p className="mt-3 text-[13px] text-soft"><strong className="text-ink">Proyek:</strong> analisis penjualan e-commerce Indonesia + dashboard Power BI.</p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="rounded-[20px] border-2 border-brand-700 bg-brand-50 p-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand-700">Verifikasi</p>
              <p className="tnum mt-2 font-mono text-xl font-bold">SB-2026-FE-8F39K2</p>
              <p className="mt-1 font-mono text-[11px] text-muted">superbright.id/verify/SB-2026-FE-8F39K2</p>
              <dl className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line">
                {[["Peserta", "Rina · privat opsional"], ["Program", "Data Analyst Path"], ["Penerbit", "SuperBright Verified"], ["Status", "Terverifikasi ✓"]].map(([k, v]) => (
                  <div key={k} className="bg-white px-4 py-3">
                    <dt className="font-mono text-[11px] text-faint">{k}</dt>
                    <dd className="mt-0.5 text-[13px] font-bold">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-3 font-mono text-[11px] leading-relaxed text-muted">Hierarki: Course → Skill → Professional → Partner. Penerbit pihak ketiga selalu disebut eksplisit.</p>
            </div>
          </Reveal>
        </div>
        <div className="mx-auto max-w-7xl px-4 pb-16 md:pb-20">
          <Reveal delay={120}>
            <figure className="overflow-hidden rounded-[20px] border border-line bg-card">
              <div className="photo-cine aspect-[21/9]">
                <img src={PX(29343927, 1400)} alt="Wisudawan Indonesia merayakan kelulusan" loading="lazy" decoding="async" sizes="(max-width: 1024px) 100vw, 1200px" className="h-full w-full object-cover" />
              </div>
              <figcaption className="flex flex-wrap items-center justify-between gap-2 bg-white px-5 py-3 font-mono text-[11px]">
                <span className="text-soft">Wisuda — dari belajar jadi bisa</span>
                <span className="text-faint">Foto: Pexels</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* ── 9 · HIRING LOGOS — company hunting, logo-only ── */}
      <section aria-label="Perusahaan yang memakai skill ini" className="border-b border-line bg-paper">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <Reveal>
            <p className="text-center font-mono text-[11px] uppercase tracking-[0.16em] text-muted">Skill yang dipakai di perusahaan seperti</p>
          </Reveal>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-9 gap-y-4">
            {HIRING.map(([slug, name]) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={slug} src={`https://cdn.simpleicons.org/${slug}/0C111D`} alt={name} title={name} width={26} height={26} loading="lazy" className="opacity-75 transition hover:opacity-100" />
            ))}
          </div>
          <p className="mt-5 text-center font-mono text-[11px] text-faint">Logo milik masing-masing perusahaan · ditampilkan untuk tujuan edukasi, tanpa afiliasi</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {CAMPUSES.map(([label, mark]) => (
              <span key={label} className="flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2">
                <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden><circle cx="12" cy="12" r="10" fill="#1D4ED8" /><text x="12" y="15.5" textAnchor="middle" fontSize="7.5" fontFamily="monospace" fontWeight="bold" fill="#fff">{mark}</text></svg>
                <span className="font-mono text-[12px] text-soft">{label}</span>
              </span>
            ))}
            <span className="font-mono text-[11px] text-faint">+ Komunitas kota: JKT · BDG · SBY · YGY · MDN</span>
          </div>
        </div>
      </section>

      {/* ── 10 · PRICING (§34-35) ── */}
      <section id="harga" className="mx-auto max-w-6xl scroll-mt-28 px-4 py-16 md:py-20">
        <Reveal>
          <h2 className="text-center text-3xl font-bold md:text-4xl">Harga transparan dalam Rupiah.</h2>
          <p className="mx-auto mt-3 max-w-[54ch] text-center text-[15px] text-soft">QRIS · Virtual Account · E-wallet · Kartu. Invoice untuk kampus & perusahaan.</p>
        </Reveal>
        <div className="mt-8 grid items-stretch gap-4 md:grid-cols-3">
          <Reveal className="h-full">
            <div className="flex h-full flex-col rounded-[20px] border border-line bg-white p-7">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">Gratis</p>
              <p className="tnum mt-2 font-mono text-3xl font-bold">Rp0</p>
              <ul className="mt-5 flex-1 space-y-2.5 text-sm text-soft">
                <li>Kursus pilihan + komunitas</li>
                <li>Bright AI dasar</li>
                <li>Sertifikat dasar</li>
              </ul>
              <a href="/id/auth/daftar" className="btn-ghost mt-6 justify-center">Mulai Gratis</a>
            </div>
          </Reveal>
          <Reveal delay={80} className="h-full">
            <div className="flex h-full flex-col rounded-[20px] border-2 border-brand-700 bg-brand-50 p-7">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-brand-700">SuperBright Plus</p>
              <p className="tnum mt-2 font-mono text-3xl font-bold">Rp99 rb<span className="text-sm font-normal text-muted">/bln</span></p>
              <ul className="mt-5 flex-1 space-y-2.5 text-sm text-soft">
                <li>Semua kursus + jalur</li>
                <li>Bright AI penuh + proyek</li>
                <li>Sertifikat + tools karier</li>
              </ul>
              <a href="/id/auth/daftar" className="btn-primary mt-6 justify-center">Mulai Gratis</a>
            </div>
          </Reveal>
          <Reveal delay={140} className="h-full">
            <div className="flex h-full flex-col rounded-[20px] border border-line bg-white p-7">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">Bisnis · Gov · Kampus</p>
              <p className="tnum mt-2 font-mono text-3xl font-bold">Custom</p>
              <ul className="mt-5 flex-1 space-y-2.5 text-sm text-soft">
                <li>Kursus per-seat / lisensi</li>
                <li>Pelatihan ASN & internal</li>
                <li>Invoice + PKS</li>
              </ul>
              <a href="#organisasi" className="btn-ghost mt-6 justify-center">Hubungi Sales</a>
            </div>
          </Reveal>
        </div>
        <p className="mt-6 text-center font-mono text-[11px] text-muted">Harga peluncuran — nominal final dikonfirmasi sebelum penagihan pertama.</p>
      </section>

      {/* ── 11 · CTA + journey (§55 Rina) ── */}
      <section id="organisasi" className="scroll-mt-28 border-t border-line bg-white">
        <div className="mx-auto grid max-w-7xl items-center gap-6 px-4 py-16 md:grid-cols-2 md:py-20">
          <Reveal>
            <h2 className="max-w-[18ch] text-3xl font-bold leading-tight md:text-5xl">Tujuan → belajar → bangun → bisa.</h2>
            <p className="mt-3 max-w-[48ch] text-[15px] text-soft">Seperti Rina, 22: target Data Analyst, 7 modul, 1 proyek e-commerce, siap lamar.</p>
          </Reveal>
          <Reveal delay={100}>
            <div className="panel p-5 md:p-6">
              <label htmlFor="wa" className="text-[13px] font-bold">Nomor WhatsApp</label>
              <p className="mt-1 text-[12px] text-muted">Contoh: 0812xxxxxxx. Kami kirim tautan aktivasi.</p>
              <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                <input id="wa" type="tel" placeholder="08xx" className="field" autoComplete="tel" />
                <a href="/id/auth/daftar" className="btn-primary flex-none justify-center px-5">Mulai Gratis</a>
              </div>
              <p className="mt-3 font-mono text-[11px] leading-relaxed text-faint">Data di Jakarta · Privasi terkontrol: profil, sertifikat, dan aktivitas bisa privat.</p>
            </div>
          </Reveal>
        </div>
        <SiteFooter />
      </section>
    </main>
  );
}
