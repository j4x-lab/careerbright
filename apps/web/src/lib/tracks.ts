/*
 * Track datasets — single source of truth for the role picker.
 *
 * Event = full thread (brief, scenario, JobSim demo, portfolio, interview).
 * Marketing / Data / Desain = honest brief-level content (labeled "pengenalan"
 * in UI): missions, capabilities, sample questions, example artifacts.
 * Nothing here claims a full JobSim exists outside Event.
 */

export type TrackId = "event" | "marketing" | "data" | "desain";

export type CapLevel = "Berkembang" | "Mulai" | "Perlu latihan";

export interface TrackData {
  id: TrackId;
  name: string;
  short: string;
  badge: string;
  mission: string;
  signal: string;
  salary: string;
  family: string;
  level: string;
  briefQuestions: string[];
  tools: string[];
  anatomy: [string, string][];
  scenarioTitle: string;
  scenarioDesc: string;
  constraints: [string, string][];
  options: string[];
  simDay: string;
  simMetrics: [string, string][];
  simAlert: string;
  simSoon: boolean;
  readiness: [string, number][];
  nextRec: string;
  consequences: string[];
  caps: [string, CapLevel, string][];
  portfolioProject: string;
  portfolioRole: string;
  portfolioArtifacts: [string, string][];
  portfolioTags: string[];
  interviewTeknis: string[];
  interviewKasus: string;
}

export const TRACK_ORDER: TrackId[] = ["event", "marketing", "data", "desain"];

export const INTERVIEW_UMUM = [
  "Ceritakan tentang dirimu.",
  "Kenapa tertarik dengan peran ini?",
];

export const INTERVIEW_BEHAVIORAL = [
  "Ceritakan stakeholder tersulit yang pernah kamu hadapi.",
];

export const TRACKS: Record<TrackId, TrackData> = {
  event: {
    id: "event",
    name: "Event & Brand Activation Supervisor",
    short: "Event",
    badge: "Bisa dimainkan penuh",
    mission:
      "Merencanakan dan mengeksekusi program aktivasi merek — contoh proyek: Rp500M, 30 hari, 5.000 pengunjung.",
    signal: "Simulasi penuh live · JobSim 30 hari",
    salary: "Mid Rp8–15 jt",
    family: "Marketing",
    level: "Supervisor · Mid",
    briefQuestions: [
      "Vendor mana yang dipilih?",
      "Bagaimana menangani perubahan budget?",
      "Apa yang dilakukan saat produksi telat?",
      "Kapan masalah dieskalasi ke klien?",
      "Bagaimana mengelola ekspektasi klien?",
    ],
    tools: [
      "Brand Manager",
      "Vendor produksi",
      "Client",
      "Tim lapangan",
      "HRD / rekruter",
      "Spreadsheet budget",
      "Run-of-show",
      "Floor plan",
      "Timeline produksi",
    ],
    anatomy: [
      ["Situasi", "Vendor LED utama mengabari pengiriman mundur 2 hari."],
      ["Keputusan", "Kamu memilih: ganti vendor + negosiasi darurat."],
      ["Konsekuensi", "Tambahan biaya Rp8M — budget kontingensi menipis."],
      ["Feedback", "Jadwal selamat, risiko finansial naik. Berikut yang terlewat…"],
    ],
    scenarioTitle: "Pengiriman LED utama tertunda",
    scenarioDesc:
      "Event 2.500 orang tidak bisa pindah jadwal. Klien mengharapkan produksi sesuai rencana awal.",
    constraints: [
      ["Sisa budget", "Rp18M"],
      ["Waktu", "48 jam"],
      ["Vendor cadangan", "Tersedia"],
      ["Ekspektasi klien", "Tetap penuh"],
    ],
    options: [
      "Cari vendor pengganti",
      "Negosiasi pengiriman darurat",
      "Ubah setup + eskalasi ke klien",
    ],
    simDay: "Contoh — Event: demo hari 28/30",
    simMetrics: [
      ["Budget", "Rp482M / Rp500M"],
      ["Pengunjung", "Target 5.000"],
      ["Tim", "18 anggota"],
    ],
    simAlert:
      "Keterlambatan LED yang kamu tangani di hari ke-12 mengubah opsi setup malam ini. Tinjau situasinya.",
    simSoon: false,
    readiness: [
      ["Role Understanding", 86],
      ["Practical Capability", 61],
      ["Job Simulation", 68],
      ["Portfolio", 54],
      ["Interview", 43],
    ],
    nextRec: "Selesaikan Vendor Crisis Simulation.",
    consequences: [
      "Timeline selamat, tapi budget kontingensi habis 80%. Vendor baru belum teruji.",
      "Vendor setuju kirim darurat +Rp12M. Margin budget tipis — potong elemen lain.",
      "Klien maklum tapi ekspektasi turun. Tim lembur ubah rencana 48 jam.",
    ],
    caps: [
      ["Campaign Planning", "Berkembang", "1 simulasi · latihan: concept sprint"],
      ["Audience Understanding", "Berkembang", "1 tugas · latihan: riset segmen"],
      ["Activation Concept", "Mulai", "0 bukti · latihan: concept sprint"],
      ["Event Planning", "Berkembang", "1 tugas · latihan: run-of-show"],
      ["Budget Management", "Mulai", "0 bukti · latihan: skenario potong 20%"],
      ["Vendor Management", "Perlu latihan", "0 bukti · latihan: simulasi krisis"],
      ["Project Management", "Berkembang", "1 tugas · latihan: timeline 30 hari"],
      ["Team Coordination", "Mulai", "0 bukti · latihan: team briefing"],
      ["Client Communication", "Berkembang", "1 simulasi · latihan: laporan klien"],
      ["Crisis Management", "Perlu latihan", "0 bukti · latihan: simulasi krisis"],
      ["Event Execution", "Mulai", "0 bukti · latihan: gladi on-site"],
      ["Campaign Measurement", "Mulai", "0 bukti · latihan: laporan metrik"],
    ],
    portfolioProject: "Beverage Brand Activation",
    portfolioRole: "Supervisor",
    portfolioArtifacts: [
      ["Strategi kampanye", "Campaign Planning"],
      ["Rencana budget", "Budget Management"],
      ["Evaluasi vendor", "Vendor Management"],
      ["Timeline produksi", "Project Management"],
      ["Respons krisis", "Crisis Management"],
      ["Laporan kampanye", "Measurement"],
    ],
    portfolioTags: [
      "Campaign Planning",
      "Budget Management",
      "Vendor Management",
      "Crisis Management",
    ],
    interviewTeknis: [
      "Bagaimana kamu mengelola vendor event?",
      "Bagaimana kamu mengendalikan budget aktivasi?",
      "Bagaimana kamu menangani perubahan dari klien?",
    ],
    interviewKasus:
      "Budget event-mu dipotong 20%. Apa yang kamu ubah — dan kenapa?",
  },
  marketing: {
    id: "marketing",
    name: "Digital Marketing Specialist",
    short: "Marketing",
    badge: "Masih pengenalan",
    mission: "Tumbuhkan permintaan lewat kanal digital yang terukur.",
    signal: "72.511 lowongan sales & marketing — #1 nasional",
    salary: "Junior Rp5–15 jt",
    family: "Marketing",
    level: "Spesialis · Junior",
    briefQuestions: [
      "Channel mana yang didahulukan?",
      "Bagaimana membagi budget iklan?",
      "Kapan campaign layak di-scale up?",
      "Bagaimana membaca penurunan CTR?",
      "Kapan laporan dikirim ke atasan?",
    ],
    tools: [
      "Brand Manager",
      "Tim kreatif",
      "Marketplace",
      "Meta Ads",
      "Google Ads",
      "GA4",
      "Spreadsheet",
      "WA Broadcast",
    ],
    anatomy: [
      ["Situasi", "CPC naik 35% di hari ke-9, ROAS turun di bawah 3."],
      ["Keputusan", "Kamu memilih: geser 40% budget ke kreator affiliate."],
      ["Konsekuensi", "Reach turun 2 hari — biaya per order membaik."],
      ["Feedback", "Efisiensi pulih, volume perlu dikejar. Berikut yang terlewat…"],
    ],
    scenarioTitle: "CPC naik, ROAS turun di minggu kedua",
    scenarioDesc:
      "Kampanye 250rb reach tidak bisa berhenti — target order bulanan tetap.",
    constraints: [
      ["Sisa budget", "Rp36M"],
      ["Waktu", "5 hari"],
      ["Kreator affiliate", "Siap"],
      ["Target ROAS", "≥ 4"],
    ],
    options: [
      "Geser budget ke affiliate",
      "Refresh kreatif + retargeting",
      "Potong audiens + naikkan bid",
    ],
    simDay: "Contoh — Marketing: alur simulasi",
    simMetrics: [
      ["Budget", "Rp96M / Rp120M"],
      ["ROAS", "Target 4,2x"],
      ["Audiens", "250rb reach"],
    ],
    simAlert:
      "Kenaikan CPC yang kamu tangani di hari ke-9 mengubah opsi scale-up malam ini. Angka contoh.",
    simSoon: true,
    readiness: [
      ["Role Understanding", 74],
      ["Practical Capability", 52],
      ["Job Simulation", 35],
      ["Portfolio", 48],
      ["Interview", 41],
    ],
    nextRec: "Selesaikan simulasi alokasi budget.",
    consequences: [
      "Order pulih dalam 3 hari, tapi reach anjlok sementara.",
      "CTR naik 1,8 poin — butuh 2 hari testing.",
      "ROAS kembali ≥ 4, volume order turun 15%.",
    ],
    caps: [
      ["Performance Ads", "Berkembang", "1 simulasi · latihan: alokasi budget"],
      ["SEO & Konten", "Mulai", "0 bukti · latihan: riset keyword"],
      ["Marketing Analytics", "Berkembang", "1 tugas · latihan: baca dashboard"],
      ["Live Commerce", "Mulai", "0 bukti · latihan: run live 1 jam"],
      ["Email & CRM", "Mulai", "0 bukti · latihan: broadcast WA"],
      ["Budget Iklan", "Perlu latihan", "0 bukti · latihan: skenario potong 30%"],
    ],
    portfolioProject: "Kampanye Peluncuran Produk",
    portfolioRole: "Specialist",
    portfolioArtifacts: [
      ["Rencana media", "Performance Ads"],
      ["Kalender konten 30 hari", "SEO & Konten"],
      ["Laporan iklan mingguan", "Marketing Analytics"],
      ["Sesi live commerce", "Live Commerce"],
      ["Hasil ROAS 4,2x", "Measurement"],
    ],
    portfolioTags: [
      "Performance Ads",
      "Marketing Analytics",
      "Live Commerce",
      "Budget Iklan",
    ],
    interviewTeknis: [
      "Bagaimana kamu membagi budget antar channel?",
      "CTR turun 2 minggu — apa yang kamu cek dulu?",
      "Bagaimana kamu mengukur keberhasilan kampanye?",
    ],
    interviewKasus:
      "Budget ads-mu dipotong 30%. Channel apa yang dipertahankan — dan kenapa?",
  },
  data: {
    id: "data",
    name: "Data Analyst",
    short: "Data",
    badge: "Masih pengenalan",
    mission: "Ubah data mentah jadi keputusan bisnis.",
    signal: "Dicari bank, e-commerce, logistik, pemerintahan",
    salary: "Junior Rp6–15 jt",
    family: "Teknologi",
    level: "Analis · Junior",
    briefQuestions: [
      "Data mana yang jadi sumber kebenaran?",
      "Bagaimana menangani data kotor?",
      "Metrik apa yang dilaporkan dulu?",
      "Kapan insight perlu validasi ulang?",
      "Bagaimana menyampaikan temuan ke non-teknis?",
    ],
    tools: [
      "Product Manager",
      "Tim Data",
      "User Bisnis",
      "SQL",
      "Spreadsheet",
      "Metabase",
      "dbt",
      "Dokumen metrik",
    ],
    anatomy: [
      ["Situasi", "Angka dashboard beda dengan laporan finance selisih 8%."],
      ["Keputusan", "Kamu memilih: telusuri lineage + bekukan dashboard."],
      ["Konsekuensi", "Keputusan promo tertunda 1 hari — kepercayaan data terjaga."],
      ["Feedback", "Integritas menang, kecepatan kalah. Berikut yang terlewat…"],
    ],
    scenarioTitle: "Angka dashboard selisih dengan finance",
    scenarioDesc:
      "Promo 3 divisi menunggu angka final — tidak bisa pakai dua versi kebenaran.",
    constraints: [
      ["Baris data", "120rb"],
      ["Waktu", "2 hari"],
      ["Akses warehouse", "Penuh"],
      ["Toleransi selisih", "< 1%"],
    ],
    options: [
      "Audit query + lineage",
      "Bangun ulang model data",
      "Pakai angka finance sementara",
    ],
    simDay: "Contoh — Data: alur simulasi",
    simMetrics: [
      ["Dataset", "120rb baris"],
      ["Dashboard", "6 chart"],
      ["Stakeholder", "3 divisi"],
    ],
    simAlert:
      "Perubahan skema sumber data di hari ke-11 mengubah definisi metrik malam ini. Angka contoh.",
    simSoon: true,
    readiness: [
      ["Role Understanding", 78],
      ["Practical Capability", 55],
      ["Job Simulation", 38],
      ["Portfolio", 51],
      ["Interview", 44],
    ],
    nextRec: "Selesaikan audit lineage.",
    consequences: [
      "Ketemu join ganda — angka final dalam 2 hari.",
      "Model bersih tapi promo mundur seminggu.",
      "Cepat rilis, tapi dashboard kehilangan kepercayaan.",
    ],
    caps: [
      ["SQL & Spreadsheets", "Berkembang", "1 tugas · latihan: join 3 tabel"],
      ["Pembersihan Data", "Mulai", "0 bukti · latihan: tangani duplikat"],
      ["Dashboarding", "Berkembang", "1 tugas · latihan: bangun 6 chart"],
      ["Statistik Dasar", "Mulai", "0 bukti · latihan: baca distribusi"],
      ["Insight Storytelling", "Mulai", "0 bukti · latihan: tulis 1 insight"],
      ["Presentasi Data", "Perlu latihan", "0 bukti · latihan: presentasi 5 menit"],
    ],
    portfolioProject: "Dashboard Retensi Pelanggan",
    portfolioRole: "Analyst",
    portfolioArtifacts: [
      ["Query SQL final", "SQL"],
      ["Model data bersih", "Data Cleaning"],
      ["Dashboard 6 chart", "Dashboarding"],
      ["Deck insight", "Storytelling"],
      ["Rekomendasi promo", "Measurement"],
    ],
    portfolioTags: ["SQL", "Dashboarding", "Storytelling", "Statistik Dasar"],
    interviewTeknis: [
      "Bagaimana kamu memvalidasi query-mu?",
      "Data kotor 20% — dibuang atau diperbaiki?",
      "Bagaimana menjelaskan churn ke tim marketing?",
    ],
    interviewKasus:
      "Angka dashboard-mu beda dengan finance 8%. Langkah pertamamu apa — dan kenapa?",
  },
  desain: {
    id: "desain",
    name: "UI/UX Designer",
    short: "Desain",
    badge: "Masih pengenalan",
    mission: "Rancang pengalaman produk yang mudah & menyenangkan.",
    signal: "Portofolio = mata uang rekrutmen 2026",
    salary: "Junior Rp6–18 jt",
    family: "Teknologi",
    level: "Desainer · Junior",
    briefQuestions: [
      "Siapa user utamanya?",
      "Riset apa yang dilakukan dulu?",
      "Kapan wireframe cukup baik?",
      "Bagaimana menangani revisi stakeholder?",
      "Kapan desain siap handoff?",
    ],
    tools: [
      "Product Manager",
      "Developer",
      "User",
      "Figma",
      "Design System",
      "Maze",
      "Prototype",
      "Playbook testing",
    ],
    anatomy: [
      ["Situasi", "40% responden gagal checkout di testing ronde 2."],
      ["Keputusan", "Kamu memilih: sederhanakan form + tambah opsi COD."],
      ["Konsekuensi", "Satu sprint revisi — rilis mundur 1 minggu."],
      ["Feedback", "Konversi naik, timeline mundur. Berikut yang terlewat…"],
    ],
    scenarioTitle: "40% user gagal checkout",
    scenarioDesc:
      "Rilis 24 layar menunggu hasil testing — tidak bisa rilis dengan kegagalan sebesar ini.",
    constraints: [
      ["Layar", "24"],
      ["Responden", "12 user"],
      ["Waktu revisi", "1 sprint"],
      ["Target SUS", "≥ 80"],
    ],
    options: [
      "Sederhanakan form checkout",
      "Tambah panduan + error jelas",
      "Ulangi testing 5 user",
    ],
    simDay: "Contoh — Desain: alur simulasi",
    simMetrics: [
      ["Layar", "24 screen"],
      ["Skor SUS", "Target 80"],
      ["Responden", "12 user"],
    ],
    simAlert:
      "Hasil testing ronde 2 mengubah prioritas revisi sprint ini. Angka contoh.",
    simSoon: true,
    readiness: [
      ["Role Understanding", 76],
      ["Practical Capability", 50],
      ["Job Simulation", 36],
      ["Portfolio", 57],
      ["Interview", 42],
    ],
    nextRec: "Selesaikan testing 5 user.",
    consequences: [
      "Checkout naik 22%, rilis mundur 1 sprint.",
      "Gagal turun 15%, form tetap panjang.",
      "Temuan tajam, rilis mundur 2 sprint.",
    ],
    caps: [
      ["UX Research", "Berkembang", "1 tugas · latihan: wawancara 3 user"],
      ["Wireframing", "Mulai", "0 bukti · latihan: alur 5 layar"],
      ["Figma & Design System", "Berkembang", "1 tugas · latihan: komponen tombol"],
      ["Prototyping", "Mulai", "0 bukti · latihan: prototype klik"],
      ["Usability Testing", "Mulai", "0 bukti · latihan: uji 5 user"],
      ["Handoff Developer", "Perlu latihan", "0 bukti · latihan: tulis spek 1 layar"],
    ],
    portfolioProject: "Redesain Alur Checkout",
    portfolioRole: "Designer",
    portfolioArtifacts: [
      ["Ringkasan riset", "UX Research"],
      ["Wireframe 5 layar", "Wireframing"],
      ["Prototype Figma", "Prototyping"],
      ["Hasil testing", "Usability Testing"],
      ["Skor SUS 82", "Measurement"],
    ],
    portfolioTags: ["UX Research", "Figma", "Prototyping", "Usability Testing"],
    interviewTeknis: [
      "Bagaimana kamu memulai riset untuk fitur baru?",
      "Stakeholder minta yang berlawanan dengan hasil riset?",
      "Bagaimana kamu tahu desainmu berhasil?",
    ],
    interviewKasus:
      "40% user gagal checkout di testing. Apa yang kamu ubah dulu — dan kenapa?",
  },
};
