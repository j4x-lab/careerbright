import { Reveal } from "@/components/reveal";
import { SiteNav, SiteFooter } from "@/components/site-chrome";
import { PX } from "@/lib/visual";

/*
 * Jakarta Light concept — full light mode, Plus Jakarta Sans + Plex Mono self-hosted.
 * Role-first: hero role question → 7-category role chooser → pillars → kasus →
 * peran paths (Akuntan + UMKM) → konteks light band → AI → bukti → pricing → CTA.
 * Anchors: #peran #jalur #kasus #konteks #ai #bukti #harga #organisasi #konten
 * Shape lock v2: buttons 14px · cards 24px · media 20px · inputs 12px.
 */

const ROLES = [
  { h: "Tech & Digital", d: "Data Analyst · SOC Analyst · selaras SKKNI, 4–6 bulan.", m: "Jalur: Data Analyst", salary: "IDR 7–18 jt", href: "/id/paths/data-analyst", big: true },
  { h: "Keuangan & Akuntansi", d: "Akuntan Junior (Pajak) · SKKNI M.691090, KKNI 6, 24 minggu.", m: "Jalur: Akuntan Junior", salary: "IDR 6–9 jt", href: "/id/paths/junior-accountant", big: true },
  { h: "Marketing & Kreatif", d: "Performance Marketing · SKKNI 124/2022, live commerce.", m: "10 modul · fleksibel", salary: "IDR 6–12 jt", href: "/id/paths/umkm-digital-entrepreneur", big: false },
  { h: "Sales & BD", d: "B2B Sales · Partnerships · Account Management.", m: "Simulasi pitching", salary: "IDR 5–12 jt+", href: "/id/katalog", big: false },
  { h: "Manajemen Proyek", d: "IT PM · Digital PM · CAPM → PMP/PSM.", m: "Kampus & perusahaan", salary: "IDR 8–20 jt", href: "/id/katalog", big: false },
  { h: "Green & ESG", d: "EHS/HSE · ESG Analyst · energi terbarukan.", m: "Demand +54%", salary: "IDR 7–15 jt", href: "/id/katalog", big: false },
  { h: "Mining & Energi", d: "Mining Coordinator · HSE · geoteknik.", m: "Nikel & alat berat", salary: "IDR 8–18 jt", href: "/id/katalog", big: false },
];

const PILLARS = [
  { n: "01", h: "Learn", d: "Kasus nyata industri Indonesia, bukan teori impor." },
  { n: "02", h: "Practice", d: "Kuis, lab kode, simulasi yang dinilai otomatis." },
  { n: "03", h: "Build", d: "Proyek portofolio — e-commerce, dashboard, SPT." },
  { n: "04", h: "Prove", d: "Asesmen AI + sertifikat terverifikasi QR." },
  { n: "05", h: "Work", d: "Magang, freelance, dan jalur rekrutmen." },
  { n: "06", h: "Connect", d: "Komunitas kota + mentor praktisi." },
  { n: "07", h: "Local Context", d: "QRIS, pajak, hierarki, regulasi — ber-tanggal." },
];

const ACC_PATH = [
  ["Fase 1", "Dasar Akuntansi Keuangan", "Video · Kuis"],
  ["Fase 2", "Pajak Badan & e-Faktur", "Simulasi e-Faktur"],
  ["Fase 3", "Pelaporan PSAK/IFRS", "Studi kasus"],
  ["Capstone", "SPT Klien Mock + Asesmen AI", "Portofolio"],
];
const UMKM_PATH = ["Bisnis dasar", "Riset pelanggan", "Branding", "Marketplace", "Sosmed", "Iklan digital", "Akuntansi", "Pajak dasar", "AI bisnis", "Analitik"];

const HIRING: [string, string][] = [
  ["gojek", "Gojek"], ["grab", "Grab"], ["shopee", "Shopee"], ["bukalapak", "Bukalapak"],
  ["blibli", "Blibli"], ["tiktok", "TikTok"], ["google", "Google"], ["apple", "Apple"],
  ["samsung", "Samsung"], ["googlecloud", "Google Cloud"],
];

const OUTCOMES = [
  { n: "Rina · 22", r: "Data Analyst · Jakarta", q: "Dari Excel ke dashboard Power BI dalam 5 bulan. Portofolio diverifikasi, lolos screening pertama.", s: "IDR 9 jt" },
  { n: "Dimas · 24", r: "Frontend Dev · Bandung", q: "Tidak lagi tutorial-hell. Satu website UMKM fiktif + tes teknis lolos.", s: "IDR 12 jt" },
  { n: "Sari · 27", r: "UMKM Owner · Surabaya", q: "Iklan Rp50 ribu pertama menghasilkan 40 chat. Sekarang punya playbook sendiri.", s: "+63% chat" },
];

export default function HomePage() {
  return (
    <main className="overflow-x-clip bg-paper text-ink">
      <a href="#konten" className="skip-link">Lewati ke konten</a>
      <SiteNav />

      {/* ── 1 · HERO LIGHT ────────────────────────────────── */}
      <section className="hero-light relative overflow-hidden pt-[140px]">
        <div className="aurora-blob opacity-60" aria-hidden />
        <div className="grid-light absolute inset-0" aria-hidden />
        <div id="konten" className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-4 pb-14 pt-6 lg:grid-cols-2">
          <div>
            <p className="hero-enter hero-enter-1 eyebrow-light">
              SKKNI · KKNI · Dinilai AI
            </p>
            <h1 className="hero-enter hero-enter-2 mt-5 max-w-[14ch] text-5xl font-extrabold leading-[1.02] tracking-tight md:text-7xl">
              Mau jadi apa <span className="text-brand-700">setelah lulus?</span>
            </h1>
            <p className="hero-enter hero-enter-3 mt-5 max-w-[48ch] text-[15px] leading-relaxed text-soft md:text-base">
              Pilih peran impianmu. Ikuti jalur selaras SKKNI, kerjakan asesmen yang dinilai AI.
            </p>
            <div className="hero-enter hero-enter-3 mt-7 flex flex-wrap items-center gap-3">
              <a href="#peran" className="btn-amber group">
                Pilih Peranmu
                <span className="btn-island btn-island-dark" aria-hidden>↗</span>
              </a>
              <a href="#pilar" className="btn-ghost">Lihat Cara Kerja</a>
            </div>
            <dl className="hero-enter hero-enter-4 mt-9 grid grid-cols-3 gap-6 border-t border-line pt-6">
              {[
                ["25+", "peran siap dilamar"],
                ["4–6 bln", "nol → siap lamar"],
                ["7", "kategori peran SKKNI"],
              ].map(([v, l]) => (
                <div key={l}>
                  <dt className="tnum font-mono text-2xl font-bold text-ink md:text-3xl">{v}</dt>
                  <dd className="mt-1 text-[12px] leading-snug text-muted">{l}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="hero-enter hero-enter-4">
            <div className="glass-light overflow-hidden" role="img" aria-label="Konsol SuperBright: Bright AI menjelaskan JOIN, skor 87, siap terbit">
              <div className="flex items-center gap-2 border-b border-line px-5 py-3.5">
                <span className="live-dot" aria-hidden />
                <span className="font-mono text-[11px] text-muted">SuperBright Console · live</span>
                <span className="ml-auto hidden gap-2 font-mono text-[11px] sm:flex">
                  <span className="rounded-md bg-amber-400/20 px-2 py-0.5 text-amber-700">Bright AI</span>
                  <span className="px-2 py-0.5 text-faint">Jalur</span>
                  <span className="px-2 py-0.5 text-faint">Portofolio</span>
                </span>
              </div>
              <div className="grid sm:grid-cols-5">
                <div className="border-b border-line p-5 sm:col-span-3 sm:border-b-0 sm:border-r">
                  <p className="font-mono text-xs text-muted">bright-ai · “Saya tidak mengerti JOIN.”</p>
                  <p className="mt-2.5 rounded-2xl border border-line bg-paper p-3.5 text-[13px] leading-relaxed text-soft">
                    Anggap SQL JOIN seperti saringan kopi: dua tabel masuk, satu hasil keluar.
                    Lanjutan: SQL dasar · 12 mnt · lab otomatis.
                  </p>
                  <div className="mt-5 space-y-3.5">
                    {[["SQL", "86%"], ["Excel", "78%"], ["Power BI", "64%"]].map(([k, v]) => (
                      <div key={k}>
                        <div className="flex justify-between font-mono text-[11px]">
                          <span className="text-muted">{k}</span>
                          <span className="tnum font-bold text-amber-700">{v}</span>
                        </div>
                        <div className="bar-track mt-1.5"><div className="bar-fill bar-fill-amber" style={{ width: v }} /></div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-5 sm:col-span-2">
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">Skill berikutnya</p>
                  <p className="mt-2 text-[15px] font-bold">Dasbor Power BI</p>
                  <p className="mt-1 font-mono text-[11px] leading-relaxed text-muted">Jalur Data Analyst · 4–6 bulan</p>
                  <p className="tnum mt-3 font-mono text-4xl font-bold text-brand-700">87</p>
                  <p className="mt-1 text-[13px] font-semibold text-ok">KOMPETEN · QR siap</p>
                  <a href="#ai" className="mt-4 inline-block font-mono text-[12px] text-brand-700 underline decoration-brand-700/30 underline-offset-4 hover:text-brand-600">
                    Lihat cara AI menilai →
                  </a>
                </div>
              </div>
            </div>
            <p className="mt-3 text-center font-mono text-[11px] text-faint">
              Skor live dari lab demo · tanpa kartu kredit
            </p>
          </div>
        </div>

        {/* marquee */}
        <div className="relative border-t border-line bg-white">
          <div className="marquee-mask overflow-hidden py-4">
            <div className="marquee-track items-center gap-10 pr-10" aria-hidden>
              {[...HIRING, ...HIRING].map(([slug, name], i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={slug + i} src={`https://cdn.simpleicons.org/${slug}/0A0F1E`} alt="" width={24} height={24} loading="lazy" className="opacity-40" title={name} />
              ))}
            </div>
          </div>
          <p className="sr-only">Skill yang dipakai di perusahaan seperti {HIRING.map(([, n]) => n).join(", ")}</p>
        </div>
      </section>

      {/* ── 2 · PERAN ─────────────────────────────────────── */}
      <section id="peran" className="mx-auto max-w-7xl scroll-mt-32 px-4 py-16 md:py-24">
        <Reveal>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Mulai dari peran</p>
          <h2 className="mt-3 max-w-[20ch] text-4xl font-extrabold md:text-5xl">Halo, mau jadi apa?</h2>
          <p className="mt-3 max-w-[60ch] text-[15px] leading-relaxed text-soft">
            Bukan “kursus apa?” tapi “mau jadi siapa?” Pilih peran — kami susun jalur, proyek, dan bukti sampai siap.
          </p>
        </Reveal>
        <div className="mt-9 grid grid-cols-1 gap-4 md:grid-cols-12">
          {ROLES.map((g, i) => (
            <Reveal key={g.h} delay={(i % 4) * 60} className={g.big ? "md:col-span-6" : "md:col-span-4"}>
              <a href={g.href} className={`spot group flex h-full flex-col justify-between overflow-hidden rounded-[24px] border border-line p-6 md:p-7 ${g.big ? "bg-ink text-white" : "bg-white"}`}>
                <div>
                  <p className={`card-num ${g.big ? "!bg-white/10 !text-amber-300" : ""}`}>{g.salary}</p>
                  <p className={`mt-3 text-xl font-extrabold tracking-tight ${g.big ? "text-white" : "group-hover:text-brand-700"}`}>{g.h}</p>
                  <p className={`mt-1.5 text-sm leading-relaxed ${g.big ? "text-white/60" : "text-soft"}`}>{g.d}</p>
                </div>
                <p className={`mt-5 font-mono text-[11px] ${g.big ? "text-white/45" : "text-muted"}`}>{g.m} →</p>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── 3 · PILLARS ───────────────────────────────────── */}
      <section id="pilar" className="scroll-mt-28 border-y border-line bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
          <Reveal>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Cara kerja</p>
            <h2 className="mt-3 max-w-[24ch] text-4xl font-extrabold md:text-5xl">Learning → Skills → Projects → Career.</h2>
          </Reveal>
          <ol className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.slice(0, 4).map((s, i) => (
              <Reveal key={s.h} delay={i * 55}>
                <li className="spot h-full rounded-[24px] border border-line bg-paper p-6">
                  <p className="card-num">{s.n}</p>
                  <p className="mt-3 text-lg font-extrabold tracking-tight">{s.h}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-soft">{s.d}</p>
                </li>
              </Reveal>
            ))}
          </ol>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {PILLARS.slice(4).map((s, i) => (
              <Reveal key={s.h} delay={i * 55}>
                <div className="spot h-full rounded-[24px] border border-dashed border-line bg-paper p-6">
                  <p className="card-num">{s.n}</p>
                  <p className="mt-3 text-[15px] font-extrabold">{s.h}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-soft">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4 · KASUS ─────────────────────────────────────── */}
      <section id="kasus" className="mx-auto max-w-7xl scroll-mt-28 px-4 py-16 md:py-24">
        <Reveal>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Kasus nyata</p>
          <h2 className="mt-3 max-w-[22ch] text-4xl font-extrabold md:text-5xl">Bukan nonton video. Kerjakan kasus nyata.</h2>
          <p className="mt-3 max-w-[62ch] text-[15px] leading-relaxed text-soft">
            Skenario dari lingkungan kerja profesional Indonesia. Perusahaan fiktif, skill asli.
            Tiap kasus 1–2 minggu — bisa dicicil malam hari.
          </p>
        </Reveal>
        <Reveal delay={80}>
          <figure className="photo-cine mt-8 aspect-[21/8]">
            <img src={PX(7845344, 1600)} alt="Tim bisnis Asia berdiskusi di kantor modern" loading="lazy" decoding="async" sizes="(max-width: 1024px) 100vw, 1200px" className="h-full w-full object-cover" />
            <figcaption className="photo-cap"><span>Kolaborasi lintas divisi — seperti di kantor sungguhan</span><span className="opacity-70">Pexels</span></figcaption>
          </figure>
        </Reveal>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {[
            { img: 34961614, alt: "Analis muda bekerja dengan laptop di kantor Jakarta", tag: "Data Analyst · SQL + Power BI · 2 minggu", h: "Lonjakan retur di marketplace", d: "Analisis 3 bulan transaksi, temukan pola retur, sajikan dashboard dan rekomendasi promo." },
            { img: 36617340, alt: "Mahasiswa akuntansi mempelajari laporan keuangan di Jakarta", tag: "Akuntansi · Excel + e-Faktur · 2 minggu", h: "Tutup buku akhir bulan UMKM", d: "Rapikan pembukuan warung kopi, hitung PPh, hasilkan laporan laba rugi siap pajak." },
          ].map((c, i) => (
            <Reveal key={c.h} delay={i * 80}>
              <article className="spot group h-full overflow-hidden rounded-[24px] border border-line bg-white">
                <div className="photo-cine !rounded-none aspect-[16/8]">
                  <img src={PX(c.img, 900)} alt={c.alt} loading="lazy" decoding="async" sizes="(max-width: 1024px) 100vw, 560px" className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" />
                </div>
                <div className="p-6 md:p-7">
                  <p className="font-mono text-[11px] text-muted">{c.tag}</p>
                  <p className="mt-2 text-xl font-extrabold tracking-tight">{c.h}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-soft">{c.d}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal delay={100}>
          <article className="spot group mt-4 grid overflow-hidden rounded-[24px] border border-ink bg-ink text-white sm:grid-cols-5">
            <div className="photo-cine !rounded-none min-h-[220px] sm:col-span-2 sm:min-h-full">
              <img src={PX(7869341, 800)} alt="Presentasi hasil kerja di depan tim yang beragam" loading="lazy" decoding="async" sizes="(max-width: 640px) 100vw, 480px" className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" />
            </div>
            <div className="p-6 sm:col-span-3 sm:p-9">
              <p className="eyebrow-dark">Workplace sim · dinilai Bright AI</p>
              <p className="mt-3 text-2xl font-extrabold tracking-tight">Presentasi ke manajemen yang skeptis</p>
              <p className="mt-2 max-w-[52ch] text-sm leading-relaxed text-white/60">Sampaikan temuanmu, terima feedback pedas, revisi dan coba lagi. Dinilai: komunikasi, profesionalisme, solusi.</p>
              <a href="#ai" className="mt-5 inline-flex items-center gap-2 rounded-[14px] bg-amber-400 px-5 py-3 text-sm font-bold text-ink transition hover:bg-amber-300">Coba simulator →</a>
            </div>
          </article>
        </Reveal>
      </section>

      {/* ── 5 · JALUR ─────────────────────────────────────── */}
      <section id="jalur" className="mx-auto max-w-7xl scroll-mt-28 px-4 py-16 md:py-24">
        <Reveal>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Jalur per peran</p>
          <h2 className="mt-3 max-w-[24ch] text-4xl font-extrabold md:text-5xl">Jalur jelas, proyek Indonesia asli.</h2>
          <p className="mt-3 max-w-[62ch] text-[15px] text-soft">Setiap peran punya jalur berakhir di portofolio dan persiapan karier — bukan sekadar tontonan.</p>
        </Reveal>
        <div className="mt-9 grid items-start gap-4 lg:grid-cols-2">
          <Reveal>
            <div className="panel overflow-hidden">
              <div className="flex items-center justify-between bg-ink px-6 py-4 text-white">
                <span className="text-[15px] font-extrabold">Akuntan Junior (Fokus Pajak)</span>
                <span className="rounded-full bg-amber-400/15 px-3 py-1 font-mono text-[11px] text-amber-300">24 minggu</span>
              </div>
              {ACC_PATH.map(([stage, items, fmt], i) => (
                <div key={stage} className={`flex items-start gap-4 px-6 py-4 ${i > 0 ? "border-t border-line" : ""}`}>
                  <span className="card-num mt-0.5">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <p className="text-[14px] font-extrabold">{stage}</p>
                    <p className="mt-0.5 text-[13px] text-soft">{items}</p>
                    <p className="mt-1 font-mono text-[11px] text-faint">{fmt}</p>
                  </div>
                </div>
              ))}
              <div className="border-t border-line bg-paper px-6 py-4">
                <a href="/id/paths/junior-accountant" className="link-more">Lihat silabus lengkap →</a>
              </div>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="panel overflow-hidden">
              <div className="flex items-center justify-between border-b border-line bg-brand-50 px-6 py-4">
                <span className="text-[15px] font-extrabold">UMKM Digital Entrepreneur</span>
                <span className="rounded-full bg-white px-3 py-1 font-mono text-[11px] text-brand-700">10 modul</span>
              </div>
              <div className="flex flex-wrap gap-2 px-6 py-5">
                {UMKM_PATH.map((m) => (
                  <span key={m} className="chip">{m}</span>
                ))}
              </div>
              <div className="border-t border-line px-6 py-5">
                <p className="text-[13px] text-soft"><strong className="text-ink">Proyek akhir:</strong> strategi digital lengkap untuk UMKM kopi Bandung fiktif.</p>
                <figure className="photo-cine mt-4 aspect-[21/9]">
                  <img src={PX(35548840, 1200)} alt="Siswa belajar di kelas, Pandeglang, Banten" loading="lazy" decoding="async" sizes="(max-width: 1024px) 100vw, 560px" className="h-full w-full object-cover" />
                  <figcaption className="photo-cap"><span>Belajar bisnis sambil jalan</span><span className="opacity-70">Pexels</span></figcaption>
                </figure>
              </div>
            </div>
          </Reveal>
        </div>
        <Reveal delay={120}>
          <a href="/id/katalog" className="link-more mt-8 inline-block">Pilih peranmu di Katalog →</a>
        </Reveal>
      </section>

      {/* ── 6 · KONTEKS (light band) ───────────────────────── */}
      <section id="konteks" className="relative scroll-mt-28 overflow-hidden border-y border-line bg-white">
        <div className="relative mx-auto max-w-7xl px-4 py-16 md:py-24">
          <Reveal>
            <p className="eyebrow-light">Konteks Indonesia</p>
            <h2 className="mt-3 max-w-[22ch] text-4xl font-extrabold tracking-tight md:text-5xl">Global diajarkan, Indonesia dijelaskan.</h2>
            <p className="mt-3 max-w-[54ch] text-[15px] text-soft">Lapisan konteks di tiap peran: pembayaran lokal, regulasi ber-tanggal, hierarki, kasus nyata.</p>
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-8 rounded-[24px] border border-line bg-paper p-6 md:p-7">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="text-base font-extrabold tracking-tight">Product Management — Indonesian Market</p>
                <p className="font-mono text-[11px] text-faint">Lapisan konteks · 8 modul</p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {["Perilaku konsumen", "QRIS & VA", "Regulasi", "Marketplace lokal", "Hierarki bisnis", "Riset user ID", "Pricing lokal", "Studi kasus ID"].map((t) => (
                  <span key={t} className="chip">{t}</span>
                ))}
              </div>
            </div>
          </Reveal>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["01", "Pemerintahan", "Kementerian, APBN, pengadaan, ASN digital."],
              ["02", "Workplace ID", "Hierarki, meeting, feedback, etiket kantor."],
              ["03", "Bisnis ID", "UMKM, pajak dasar, perizinan, halal."],
              ["04", "Budaya & Harian", "Keuangan pribadi, scam online, data pribadi."],
            ].map(([n, h, d], i) => (
              <Reveal key={h} delay={i * 60}>
                <div className="h-full rounded-[24px] border border-line bg-paper p-6">
                  <p className="font-mono text-xs font-bold text-brand-700">{n}</p>
                  <p className="mt-2 text-[15px] font-extrabold tracking-tight">{h}</p>
                  <p className="mt-1 text-[13px] leading-relaxed text-soft">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7 · AI ────────────────────────────────────────── */}
      <section id="ai" className="mx-auto max-w-7xl scroll-mt-28 px-4 py-16 md:py-24">
        <div className="grid items-start gap-5 lg:grid-cols-2">
          <Reveal>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Bright AI</p>
            <h2 className="mt-3 max-w-[18ch] text-4xl font-extrabold md:text-5xl">Tutor, simulator, perencana.</h2>
            <p className="mt-3 max-w-[52ch] text-[15px] text-soft">Menjelaskan materi, memberi hint, menilai tugas, simulasi interview HR — terikat materi, bukan chatbot bebas.</p>
            <div className="mt-7 space-y-3">
              <div className="panel-warm p-5">
                <p className="font-mono text-[11px] text-faint">Interview simulator · HR</p>
                <p className="mt-1.5 text-[15px] font-extrabold">“Ceritakan project e-commerce terakhirmu.”</p>
                <p className="mt-1 text-[13px] text-soft">AI menilai: struktur jawaban, metrik, sikap. Skor + saran perbaikan dalam 30 detik.</p>
              </div>
              <div className="panel-warm p-5">
                <p className="font-mono text-[11px] text-faint">Workplace simulator</p>
                <p className="mt-1.5 text-[15px] font-extrabold">“Atasan minta lembur mustahil hari ini. Responsmu?”</p>
                <p className="mt-1 text-[13px] text-soft">Dijelaskan: komunikasi, profesionalisme, risiko, alternatif yang sopan.</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="panel p-6 md:p-8">
              <div className="flex items-center justify-between">
                <p className="font-mono text-[11px] text-soft">Skill graph · Data Analytics</p>
                <span className="flex items-center gap-1.5 rounded-full bg-ok-bg px-2.5 py-1 font-mono text-[11px] font-bold text-ok"><span className="live-dot" /> live</span>
              </div>
              <div className="mt-5 space-y-4">
                {[["Excel", "Mahir", "86%"], ["SQL", "Menengah", "78%"], ["Power BI", "Menengah", "64%"], ["Python", "Menengah", "58%"], ["Interview", "Pemula", "34%"]].map(([k, lv, v]) => (
                  <div key={k}>
                    <div className="flex justify-between text-[13px]">
                      <span className="font-bold">{k} <span className="ml-1 font-mono text-[11px] font-normal text-muted">{lv}</span></span>
                      <span className="tnum font-mono text-[11px] font-bold text-brand-700">{v}</span>
                    </div>
                    <div className="bar-track mt-1.5"><div className="bar-fill" style={{ width: v }} /></div>
                  </div>
                ))}
              </div>
              <p className="mt-5 rounded-[14px] bg-brand-50 px-4 py-3 text-[13px] text-soft"><strong className="text-ink">Rekomendasi:</strong> dasbor retur marketplace — dataset 3 bulan, estimasi 2 minggu.</p>
              <a href="/id/belajar/js-dasar-analis" className="btn-primary mt-5 w-full justify-center">Coba Lab Demo</a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 8 · BUKTI + OUTCOMES ──────────────────────────── */}
      <section id="bukti" className="scroll-mt-28 border-y border-line bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
          <Reveal>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Bukti, bukan janji</p>
            <h2 className="mt-3 max-w-[24ch] text-4xl font-extrabold md:text-5xl">Portofolio publik + sertifikat terverifikasi.</h2>
          </Reveal>
          <div className="mt-9 grid items-start gap-4 lg:grid-cols-2">
            <Reveal>
              <div className="panel-warm p-6 md:p-8">
                <p className="font-mono text-[11px] text-faint">superbright.id/u/rina</p>
                <p className="mt-1 text-xl font-extrabold tracking-tight">Rina · Data Analyst Path</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["Excel", "SQL", "Python", "Power BI", "Simulasi interview ✓"].map((s) => (
                    <span key={s} className="chip font-mono !text-[11px]">{s}</span>
                  ))}
                </div>
                <p className="mt-4 text-[13px] text-soft"><strong className="text-ink">Proyek:</strong> analisis penjualan e-commerce Indonesia + dashboard Power BI + rekomendasi promo.</p>
                <figure className="photo-cine mt-5 aspect-[21/9]">
                  <img src={PX(29343927, 1400)} alt="Wisudawan Indonesia merayakan kelulusan" loading="lazy" decoding="async" sizes="(max-width: 1024px) 100vw, 560px" className="h-full w-full object-cover" />
                  <figcaption className="photo-cap"><span>Wisuda — dari belajar jadi bisa</span><span className="opacity-70">Pexels</span></figcaption>
                </figure>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="rounded-[24px] border-2 border-brand-700 bg-brand-50 p-6 md:p-8">
                <div className="flex items-center justify-between">
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-brand-700">Verifikasi publik</p>
                  <span className="rounded-full bg-emerald-500/15 px-3 py-1 font-mono text-[11px] font-bold text-emerald-700">✓ Valid</span>
                </div>
                <p className="tnum mt-3 font-mono text-2xl font-bold tracking-tight">SB-2026-FE-8F39K2</p>
                <p className="mt-1 font-mono text-[11px] text-muted">superbright.id/verify/SB-2026-FE-8F39K2</p>
                <dl className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line">
                  {[["Peserta", "Rina · privat opsional"], ["Program", "Data Analyst Path"], ["Penerbit", "SuperBright Verified"], ["Status", "Terverifikasi ✓"]].map(([k, v]) => (
                    <div key={k} className="bg-white px-4 py-3.5">
                      <dt className="font-mono text-[11px] text-faint">{k}</dt>
                      <dd className="mt-0.5 text-[13px] font-bold">{v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-5 flex gap-2">
                  {["OB 3.0 ✓", "VC 2.0 ✓", "QR siap"].map((b) => (
                    <span key={b} className="rounded-[10px] border border-line bg-white px-3 py-1.5 font-mono text-[11px] text-soft">{b}</span>
                  ))}
                </div>
                <a href="/id/verify/contoh" className="btn-primary mt-5 w-full justify-center">Cek halaman verifikasi</a>
              </div>
            </Reveal>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {OUTCOMES.map((o, i) => (
              <Reveal key={o.n} delay={i * 70}>
                <figure className="spot h-full rounded-[24px] border border-line bg-paper p-6">
                  <blockquote className="text-[14px] leading-relaxed text-ink">“{o.q}”</blockquote>
                  <figcaption className="mt-4 flex items-center justify-between border-t border-line pt-4">
                    <div>
                      <p className="text-[13px] font-extrabold">{o.n}</p>
                      <p className="font-mono text-[11px] text-muted">{o.r}</p>
                    </div>
                    <span className="tnum rounded-lg bg-ok-bg px-2.5 py-1 font-mono text-[11px] font-bold text-ok">{o.s}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9 · PRICING + FAQ ──────────────────────────────── */}
      <section id="harga" className="mx-auto max-w-6xl scroll-mt-28 px-4 py-16 md:py-24">
        <Reveal>
          <p className="text-center font-mono text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Harga</p>
          <h2 className="mx-auto mt-3 max-w-[20ch] text-center text-4xl font-extrabold md:text-5xl">Transparan dalam Rupiah.</h2>
          <p className="mx-auto mt-3 max-w-[54ch] text-center text-[15px] text-soft">QRIS · Virtual Account · E-wallet · Kartu. Invoice untuk kampus & perusahaan.</p>
        </Reveal>
        <div className="mt-9 grid items-stretch gap-4 md:grid-cols-3">
          <Reveal className="h-full">
            <div className="panel-warm flex h-full flex-col p-7">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">Gratis</p>
              <p className="tnum mt-2 font-mono text-4xl font-bold">Rp0</p>
              <p className="mt-1 font-mono text-[11px] text-muted">selamanya · tanpa kartu</p>
              <ul className="mt-5 flex-1 space-y-2.5 text-sm text-soft">
                <li>✓ Kursus pilihan + komunitas kota</li>
                <li>✓ Bright AI dasar</li>
                <li>✓ Sertifikat dasar + QR</li>
              </ul>
              <a href="/id/auth/daftar" className="btn-ghost mt-6 justify-center">Mulai Gratis</a>
            </div>
          </Reveal>
          <Reveal delay={80} className="h-full">
            <div className="relative flex h-full flex-col rounded-[24px] border-2 border-ink bg-ink p-7 text-white shadow-[0_32px_80px_-24px_rgba(6,10,19,0.6)]">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-amber-400 px-3.5 py-1 font-mono text-[11px] font-bold text-ink">PALING DIPILIH</span>
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-amber-300">SuperBright Plus</p>
              <p className="tnum mt-2 font-mono text-4xl font-bold">Rp99<span className="text-lg text-white/50">rb</span><span className="text-sm font-normal text-white/50">/bln</span></p>
              <p className="mt-1 font-mono text-[11px] text-white/45">atau Rp990rb/tahun · hemat 2 bulan</p>
              <ul className="mt-5 flex-1 space-y-2.5 text-sm text-white/75">
                <li>✓ Semua kursus + semua jalur</li>
                <li>✓ Bright AI penuh + proyek dinilai</li>
                <li>✓ Sertifikat Pro + tools karier</li>
                <li>✓ Prioritas review mentor</li>
              </ul>
              <a href="/id/auth/daftar" className="btn-amber mt-6 justify-center">Mulai Gratis 7 hari</a>
            </div>
          </Reveal>
          <Reveal delay={140} className="h-full">
            <div className="panel-warm flex h-full flex-col p-7">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">Bisnis · Gov · Kampus</p>
              <p className="tnum mt-2 font-mono text-4xl font-bold">Custom</p>
              <p className="mt-1 font-mono text-[11px] text-muted">per-seat / lisensi tahunan</p>
              <ul className="mt-5 flex-1 space-y-2.5 text-sm text-soft">
                <li>✓ Dashboard cohorts + analitik SKKNI</li>
                <li>✓ Pelatihan ASN & internal</li>
                <li>✓ Invoice + PKS + onboarding</li>
              </ul>
              <a href="#organisasi" className="btn-ghost mt-6 justify-center">Hubungi Sales</a>
            </div>
          </Reveal>
        </div>
        <div className="mx-auto mt-8 grid max-w-4xl gap-3 md:grid-cols-2">
          {[
            ["Apakah benar gratis?", "Ya — kursus pilihan, komunitas, dan sertifikat dasar gratis selamanya. Plus membuka semua jalur + AI penuh."],
            ["Bagaimana pembayaran?", "QRIS, GoPay, VA bank, kartu via Midtrans/Xendit. Semua invoice tersedia di dashboard."],
          ].map(([q, a]) => (
            <Reveal key={q}>
              <div className="rounded-[20px] border border-line bg-white p-5">
                <p className="text-[14px] font-extrabold">{q}</p>
                <p className="mt-1.5 text-[13px] leading-relaxed text-soft">{a}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-center font-mono text-[11px] text-muted">Harga peluncuran — nominal final dikonfirmasi sebelum penagihan pertama.</p>
      </section>

      {/* ── 10 · CTA ──────────────────────────────────────── */}
      <section id="organisasi" className="mx-auto max-w-7xl scroll-mt-28 px-4 pb-20">
        <Reveal>
          <div className="panel overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="photo-cine !rounded-none min-h-[260px]">
                <img src={PX(34961765, 1200)} alt="Profesional muda bekerja malam hari di kantor Jakarta" loading="lazy" decoding="async" sizes="(max-width: 768px) 100vw, 560px" className="h-full w-full object-cover" />
              </div>
              <div className="p-7 md:p-10">
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Untuk kamu & organisasimu</p>
                <h2 className="mt-3 text-3xl font-extrabold leading-tight md:text-4xl">Malam ini 15 menit. Bulan depan portofolio.</h2>
                <p className="mt-3 max-w-[46ch] text-[14px] leading-relaxed text-soft">
                  Seperti Rina, 22: target Data Analyst, 7 modul, 1 proyek e-commerce, siap lamar.
                  Kampus & perusahaan dapat dashboard cohorts + invoice.
                </p>
                <label htmlFor="wa" className="mt-6 block text-[13px] font-bold">Nomor WhatsApp</label>
                <div className="mt-2 flex flex-col gap-2 sm:flex-row">
                  <input id="wa" type="tel" placeholder="08xx xxxx xxxx" className="field" autoComplete="tel" />
                  <a href="/id/auth/daftar" className="btn-primary flex-none justify-center px-6">Mulai Gratis</a>
                </div>
                <p className="mt-3 font-mono text-[11px] leading-relaxed text-faint">Data di Jakarta · Profil, sertifikat, dan aktivitas bisa privat.</p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <SiteFooter />
    </main>
  );
}
