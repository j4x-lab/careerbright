import { PX, PHOTOS } from "@/lib/visual";

/* Learning-path detail per PRD §9 (paths), §5 (goal-first), §16 (career map).
   Photography: local-ID only, see src/lib/visual.ts. */

interface PathStage {
  name: string;
  items: string;
  formats: string;
}

interface PathData {
  title: string;
  goal: string;
  desc: string;
  weeks: string;
  level: string;
  salary: string;
  photo: number;
  alt: string;
  caption: string;
  stages: PathStage[];
  skills: string[];
  project: string;
  career: string[];
  context: string;
}

const PATHS: Record<string, PathData> = {
  "frontend-developer": {
    title: "Become a Frontend Developer",
    goal: "“Saya ingin jadi frontend developer.”",
    desc: "Dari nol sampai siap lamar: HTML ke deployment, satu website bisnis Indonesia asli, lalu persiapan karier.",
    weeks: "4–6 bulan · 5 jam/minggu",
    level: "Pemula → Siap kerja",
    salary: "IDR 8–25 jt",
    photo: PHOTOS.analystJKT,
    alt: "Analis muda bekerja dengan laptop di kantor Jakarta",
    caption: "Kerja ala profesional — dari hari pertama",
    stages: [
      { name: "Beginner", items: "HTML → CSS → JavaScript", formats: "Video · Bacaan · Kuis" },
      { name: "Intermediate", items: "TypeScript → React → API → Git", formats: "Lab kode · Simulasi" },
      { name: "Advanced", items: "Testing → Arsitektur → Performance → Deployment", formats: "Proyek · Review AI" },
      { name: "Portofolio", items: "Website bisnis Indonesia asli + studi kasus", formats: "Proyek fiktif · Tanpa afiliasi" },
      { name: "Karier", items: "CV → Interview → Tes teknis", formats: "Simulator HR · Teknis" },
    ],
    skills: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Git", "REST API", "Testing"],
    project: "Website company profile + toko online untuk UMKM fiktif Bandung.",
    career: ["CV + LinkedIn", "Portofolio superbright.id/u/kamu", "Simulasi interview HR", "Tes teknis + pembahasan AI"],
    context: "Contoh lokal: QRIS checkout, ongkir antar-pulau, katalog Bahasa Indonesia.",
  },
  "umkm-digital-entrepreneur": {
    title: "UMKM Digital Entrepreneur",
    goal: "“Saya ingin usaha saya go digital.”",
    desc: "Sepuluh modul dari riset pelanggan sampai analitik — berakhir di strategi digital lengkap untuk usaha fiktif.",
    weeks: "10 modul · fleksibel",
    level: "Semua level",
    salary: "Omzet, bukan gaji",
    photo: PHOTOS.studyJKT,
    alt: "Mahasiswi mempelajari materi bisnis di Jakarta",
    caption: "Belajar bisnis sambil jalan — malam hari pun bisa",
    stages: [
      { name: "Fondasi", items: "Bisnis dasar → Riset pelanggan → Branding", formats: "Video · Template" },
      { name: "Jualan", items: "Marketplace → Sosmed → Iklan digital", formats: "Studi kasus · Praktik" },
      { name: "Keuangan", items: "Akuntansi → Pajak dasar → Analitik", formats: "Spreadsheet · Kuis" },
      { name: "Proyek akhir", items: "Strategi digital UMKM kopi Bandung fiktif", formats: "Presentasi · Review mentor" },
    ],
    skills: ["Branding", "Marketplace", "Iklan digital", "Akuntansi", "Pajak dasar", "Analitik"],
    project: "Dokumen strategi digital lengkap: positioning, kanal, budget iklan, target 90 hari.",
    career: ["Portofolio strategi", "Simulasi pitching ke investor", "Komunitas UMKM kota"],
    context: "Regulasi halal, perizinan, dan pajak UMKM Indonesia — selalu ada tanggal berlakunya.",
  },
  "data-analyst": {
    title: "Data Analyst Path",
    goal: "“Saya ingin kerja sebagai Data Analyst.”",
    desc: "Perjalanan Rina (§55): Excel ke Power BI, proyek e-commerce Indonesia, sertifikat skill, siap lamar.",
    weeks: "7 modul · 4–5 bulan",
    level: "Pemula → Siap kerja",
    salary: "IDR 7–18 jt",
    photo: PHOTOS.teamAsia,
    alt: "Tim bisnis Asia berdiskusi di kantor modern",
    caption: "Analisis dipresentasikan, bukan disimpan",
    stages: [
      { name: "Fondasi", items: "Excel → SQL → Statistika", formats: "Video · Latihan dataset" },
      { name: "Tools", items: "Python → Visualisasi → Power BI", formats: "Lab kode · Proyek" },
      { name: "Proyek", items: "Analisis penjualan e-commerce Indonesia", formats: "Dataset publik · Dashboard" },
      { name: "Karier", items: "Sertifikat → Portofolio → Interview sim", formats: "Verifikasi publik" },
    ],
    skills: ["Excel", "SQL", "Statistika", "Python", "Visualisasi", "Power BI"],
    project: "Dashboard Power BI + rekomendasi promo dari data transaksi 3 bulan.",
    career: ["Sertifikat Data Analytics", "Portofolio otomatis terisi", "Simulasi interview HR"],
    context: "Dataset lokal: transaksi e-commerce, UMKM, pariwisata Indonesia.",
  },
  "siap-kerja": {
    title: "Fresh Graduate Siap Lamar",
    goal: "“Saya ingin dapat panggilan interview.”",
    desc: "Empat minggu dari CV berantakan ke lamaran lengkap: CV, portofolio, interview, lalu lamar.",
    weeks: "4 minggu · 3 jam/minggu",
    level: "Fresh graduate",
    salary: "Tawaran pertama",
    photo: PHOTOS.campusSmile,
    alt: "Mahasiswa tersenyum di depan gedung kampus",
    caption: "Dari kampus ke kantor — satu lamaran sekali jalan",
    stages: [
      { name: "CV", items: "CV satu halaman + email profesional", formats: "Template · Kuis" },
      { name: "Portofolio", items: "superbright.id/u/kamu: proyek + sertifikat", formats: "Link publik" },
      { name: "Interview", items: "Perkenalan 2 menit + gaji + jebakan", formats: "Simulator HR" },
      { name: "Workplace", items: "Hierarki + meeting + feedback", formats: "Skenario ID" },
      { name: "Lamar", items: "Apply + follow-up WA yang sopan", formats: "Checklist" },
    ],
    skills: ["CV", "Portofolio", "Interview", "LinkedIn", "Etika kantor"],
    project: "Paket lamaran lengkap: CV + profil publik + rekaman simulasi.",
    career: ["CV lolos screening", "Portofolio terverifikasi", "Simulasi interview", "Etika hari pertama"],
    context: "Gaji pasar per kota, etika WA ke HRD, hierarki kantor Indonesia.",
  },
  "junior-accountant": {
    title: "Akuntan Junior (Fokus Pajak)",
    goal: "“Saya ingin kerja di kantor akuntan.”",
    desc: "Akuntansi keuangan ke SPT: e-Faktur, PPh, dan capstone SPT klien mock dengan asesmen AI.",
    weeks: "24 minggu",
    level: "KKNI 6",
    salary: "IDR 6–9 jt/bln",
    photo: PHOTOS.nightJKT,
    alt: "Profesional muda bekerja malam hari di kantor Jakarta",
    caption: "Tutup buku tepat waktu — setiap bulan",
    stages: [
      { name: "Fase 1", items: "Dasar Akuntansi Keuangan", formats: "Video · Kuis" },
      { name: "Fase 2", items: "Pajak Badan & e-Faktur", formats: "Simulasi e-Faktur" },
      { name: "Fase 3", items: "Pelaporan PSAK/IFRS", formats: "Studi kasus" },
      { name: "Capstone", items: "SPT Klien Mock + Asesmen AI", formats: "Portofolio" },
    ],
    skills: ["Akuntansi", "PPh", "e-Faktur", "PSAK"],
    project: "SPT tahunan klien mock lengkap dengan kertas kerja.",
    career: ["Sertifikat skill", "Portofolio kertas kerja", "Simulasi interview"],
    context: "Aturan pajak mencantumkan tanggal berlaku dan direview saat berubah.",
  },
};

export default async function PathPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = PATHS[slug] ?? PATHS["frontend-developer"];

  return (
    <main className="overflow-x-clip bg-paper text-ink">
      <a href="#konten" className="skip-link">Lewati ke konten</a>

      {/* Header split v2: dark goal-first + glass enroll card */}
      <section className="hero-dark relative overflow-hidden pt-[140px] text-white">
        <div className="aurora-blob" aria-hidden />
        <div id="konten" className="relative mx-auto grid max-w-7xl items-start gap-8 px-4 pb-12 pt-2 md:pb-14 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <a href="/#jalur" className="font-mono text-[12px] text-white/50 underline decoration-white/25 underline-offset-4 hover:text-white">← Katalog jalur</a>
            <p className="eyebrow-dark mt-6">Learning Path · {p.level}</p>
            <h1 className="mt-4 max-w-[18ch] text-4xl font-extrabold leading-[1.05] md:text-6xl">{p.title}</h1>
            <p className="mt-3 max-w-[30ch] text-[15px] font-bold text-amber-200">{p.goal}</p>
            <p className="mt-2 max-w-[52ch] text-[15px] leading-relaxed text-white/60">{p.desc}</p>
            <p className="tnum mt-4 font-mono text-[13px] text-white/45">{p.salary} · {p.weeks}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href="/id/auth/daftar" className="btn-amber group">
                Mulai Gratis
                <span className="btn-island btn-island-dark" aria-hidden>↗</span>
              </a>
              <a href="/id/belajar/js-dasar-analis" className="btn-dark">Coba Lab Demo</a>
            </div>
          </div>
          <aside className="lg:col-span-2">
            <div className="glass-dark p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/45">Yang kamu dapat</p>
              <ul className="mt-3 space-y-2.5 text-sm text-white/75">
                <li>✓ {p.stages.length} tahap terstruktur</li>
                <li>✓ {p.skills.length} skill terukur di Skill Graph</li>
                <li>✓ 1 proyek portofolio + sertifikat QR</li>
                <li>✓ Simulasi interview + Bright AI</li>
              </ul>
              <p className="mt-4 rounded-[12px] bg-amber-400/12 px-3.5 py-2.5 font-mono text-[11px] text-amber-300">Gratis mulai · Plus untuk sertifikat</p>
            </div>
          </aside>
        </div>
      </section>

      {/* Hero visual: learner in context */}
      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <figure className="photo-cine aspect-[21/8]">
              <img src={PX(p.photo, 1600)} alt={p.alt} loading="lazy" decoding="async" sizes="(max-width: 1024px) 100vw, 1200px" className="h-full w-full object-cover" />
            <figcaption className="photo-cap">
              <span>{p.caption}</span>
              <span className="opacity-70">Pexels</span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Stages timeline */}
      <section className="mx-auto max-w-7xl px-4 py-14 md:py-16">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Silabus</p>
        <h2 className="mt-3 max-w-[22ch] text-3xl font-extrabold md:text-4xl">Tahapan yang jelas, bukan daftar video.</h2>
        <ol className="panel mt-8 overflow-hidden">
          {p.stages.map((s, i) => (
            <li key={s.name} className={`grid gap-2 px-6 py-4 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-4 ${i > 0 ? "border-t border-line" : ""}`}>
              <span className="card-num tnum">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <p className="text-[14px] font-bold">{s.name}</p>
                <p className="mt-0.5 truncate text-[13px] text-muted">{s.items}</p>
              </div>
              <span className="font-mono text-[11px] text-faint">{s.formats}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* Skills + career prep */}
      <section className="border-y border-line bg-white">
        <div className="mx-auto grid max-w-7xl items-start gap-4 px-4 py-14 md:py-16 lg:grid-cols-2">
          <div className="rounded-[20px] border border-line bg-paper p-5 md:p-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">Skill yang diukur</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {p.skills.map((s) => (
                <span key={s} className="rounded-[10px] border border-line bg-white px-3 py-1.5 text-[13px] font-medium">{s}</span>
              ))}
            </div>
            <p className="mt-4 text-[13px] text-soft"><strong className="text-ink">Proyek:</strong> {p.project}</p>
          </div>
          <div className="rounded-[20px] border border-line bg-paper p-5 md:p-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">Siap kerja</p>
            <ul className="mt-3 space-y-2.5 text-sm text-soft">
              {p.career.map((c) => (
                <li key={c} className="flex gap-3">
                  <span aria-hidden className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-md bg-brand-50 font-mono text-[11px] font-bold text-brand-700">✓</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ID context + certificate */}
      <section className="mx-auto max-w-7xl px-4 py-14 md:py-16">
        <div className="grid items-start gap-4 lg:grid-cols-2">
          <div className="rounded-[20px] border-2 border-brand-700 bg-brand-50 p-5 md:p-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand-700">Konteks Indonesia</p>
            <p className="mt-2 text-sm leading-relaxed text-soft">{p.context}</p>
          </div>
          <div className="rounded-[20px] border border-line bg-white p-5 md:p-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">Sertifikat</p>
            <p className="mt-2 text-sm font-bold">Professional Program · terverifikasi publik + QR</p>
            <p className="mt-1 font-mono text-[11px] text-muted">Hierarki: Course → Skill → Professional → Partner</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a href="/id/auth/daftar" className="btn-primary group px-5">
                Mulai Gratis
                <span className="btn-island" aria-hidden>↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
