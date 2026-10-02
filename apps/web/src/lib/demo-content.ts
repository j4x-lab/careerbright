import type { Mcq } from "@/components/assess/mcq-quiz";
import type { CodeTest } from "@/components/assess/code-lab";

export interface DemoLesson {
  slug: string;
  no: number;
  title: string;
  skkni: string;
  body: string[];
  quiz?: Mcq[];
  lab?: { starter: string; tests: CodeTest[] };
}

export interface DemoCourse {
  slug: string;
  title: string;
  path: string;
  lessons: DemoLesson[];
}

export const DEMO_COURSES: Record<string, DemoCourse> = {
  "js-dasar-analis": {
    slug: "js-dasar-analis",
    title: "JavaScript Dasar untuk Analis",
    path: "ai-engineer",
    lessons: [
      {
        slug: "variabel-tipe",
        no: 1,
        title: "Variabel, Tipe Data & Array",
        skkni: "J.620100.001.01",
        body: [
          "Deklarasikan data dengan const (tetap) dan let (berubah). Hindari var di kode modern.",
          "Tipe inti: number, string, boolean, null, undefined, object, array. Cek dengan typeof.",
          "Array adalah senjata analis: map untuk transformasi, filter untuk seleksi, reduce untuk agregasi.",
          "Contoh: const bersih = data.filter((x) => x.nilai != null).map((x) => x.nilai);",
        ],
        quiz: [
          {
            q: "Metode array apa yang tepat untuk menjumlahkan seluruh nilai?",
            options: ["map", "filter", "reduce", "forEach"],
            answer: 2,
            explain: "reduce melipat array menjadi satu nilai — ideal untuk agregasi seperti total dan rata-rata.",
          },
          {
            q: "Apa hasil typeof null di JavaScript?",
            options: ['"null"', '"object"', '"undefined"', '"boolean"'],
            answer: 1,
            explain: "typeof null mengembalikan 'object' — quirk historis JS yang wajib dihafal analis.",
          },
        ],
      },
      {
        slug: "fungsi-total",
        no: 2,
        title: "Lab: Fungsi Total Penjualan",
        skkni: "J.620100.003.01",
        body: [
          "Tulis function solve(input) yang menerima array angka dan mengembalikan totalnya.",
          "Abaikan nilai yang bukan number (null, undefined, string).",
          "Contoh: solve([10, null, 20]) mengembalikan 30.",
        ],
        lab: {
          starter: `function solve(input) {\n  // TODO: jumlahkan hanya number\n  return 0;\n}`,
          tests: [
            { name: "dasar", input: [10, 20, 30], expected: 60 },
            { name: "abaikan null", input: [10, null, 20], expected: 30 },
            { name: "kosong", input: [], expected: 0 },
          ],
        },
      },
    ],
  },
  "cv-siap-lamar": {
    slug: "cv-siap-lamar",
    title: "CV Satu Halaman Siap Lamar",
    path: "siap-kerja",
    lessons: [
      {
        slug: "struktur-30-detik",
        no: 1,
        title: "Struktur CV yang Dibaca HR dalam 30 Detik",
        skkni: "KARIR-CV-01",
        body: [
          "Satu halaman untuk fresh graduate: nama, kontak, headline, pendidikan, pengalaman, skill.",
          "Tulis angka, bukan sifat: “kelola kas Rp5 jt/hari tanpa selisih” mengalahkan “pekerja keras”.",
          "Pakai foto formal terbaru dan email profesional (nama, bukan nickname).",
        ],
        quiz: [
          {
            q: "Berapa halaman ideal CV fresh graduate?",
            options: ["Satu halaman", "Dua halaman", "Tiga halaman", "Bebas, makin tebal makin bagus"],
            answer: 0,
            explain: "HR memindai puluhan CV — satu halaman padat menang atas tiga halaman encer.",
          },
          {
            q: "Bullet pengalaman mana yang paling kuat?",
            options: [
              "Pekerja keras, jujur, dan bisa kerja tim",
              "Kelola kas Rp5 jt/hari selama 6 bulan tanpa selisih",
              "Berpengalaman di bidang terkait",
              "Mampu bekerja di bawah tekanan",
            ],
            answer: 1,
            explain: "Angka + durasi + hasil bisa diverifikasi. Sifat tanpa bukti diabaikan HR.",
          },
        ],
      },
      {
        slug: "portofolio-publik",
        no: 2,
        title: "Portofolio superbright.id/u/kamu",
        skkni: "KARIR-PF-01",
        body: [
          "HR hampir selalu klik link portofolio — isi minimal: 1 proyek, 1 sertifikat, daftar skill.",
          "Ceritakan tiap proyek dengan rumus Masalah → Aksi → Hasil.",
          "Perbarui profil setiap selesai satu jalur, bukan setahun sekali.",
        ],
        quiz: [
          {
            q: "Rumus cerita proyek yang paling meyakinkan?",
            options: [
              "Masalah → Aksi → Hasil",
              "Hasil → Aksi → Masalah",
              "Aksi → Masalah → Hasil",
              "Ceritakan seadanya saja",
            ],
            answer: 0,
            explain: "Masalah memberi konteks, aksi menunjukkan skill, hasil membuktikan dampak.",
          },
          {
            q: "Isi minimal profil publik yang layak dilamar?",
            options: [
              "1 proyek + 1 sertifikat + daftar skill",
              "Foto profil yang bagus",
              "Bio panjang dan motto hidup",
              "Daftar semua hobi",
            ],
            answer: 0,
            explain: "HR butuh bukti kerja dalam 1 menit: proyek, sertifikat, skill.",
          },
        ],
      },
    ],
  },
  "interview-pertama": {
    slug: "interview-pertama",
    title: "Interview HR Pertama Tanpa Panik",
    path: "siap-kerja",
    lessons: [
      {
        slug: "ceritakan-dirimu",
        no: 1,
        title: "Jawab “Ceritakan Dirimu” dalam 2 Menit",
        skkni: "KARIR-IV-01",
        body: [
          "Pakai rumus Sekarang → Latar → Bukti → Target: siapa kamu, latar, satu bukti, kenapa peran ini.",
          "Jangan bacakan CV — HR sudah membacanya. Tambahkan yang tidak tertulis.",
          "Latihan dengan timer sampai pas 2 menit, tidak kurang tidak lebih.",
        ],
        quiz: [
          {
            q: "Urutan jawaban “ceritakan dirimu” yang tepat?",
            options: [
              "Sekarang → Latar → Bukti → Target",
              "Target → Bukti → Latar → Sekarang",
              "Latar → Sekarang → Target → Bukti",
              "Mulai dari SD sampai sekarang",
            ],
            answer: 0,
            explain: "Buka dengan posisi sekarang, tutup dengan alasan melamar peran ini.",
          },
          {
            q: "Durasi ideal jawaban perkenalan diri?",
            options: ["Sekitar 2 menit", "Sekitar 10 menit", "Secepat mungkin", "Sampai HR memotong"],
            answer: 0,
            explain: "Dua menit cukup untuk 4 poin tanpa membuat HR bosan.",
          },
        ],
      },
      {
        slug: "gaji-dan-jebakan",
        no: 2,
        title: "Gaji Pertama & Pertanyaan Jebakan",
        skkni: "KARIR-IV-02",
        body: [
          "Riset dulu gaji pasar dari lowongan sejenis di kotamu sebelum menyebut angka.",
          "Jawab dengan rentang (“7–9 juta, terbuka diskusi”), bukan angka mati.",
          "Untuk “apa kekuranganmu?”: sebut satu kekurangan nyata + cara kamu mengatasinya.",
        ],
        quiz: [
          {
            q: "Cara terbaik menjawab ekspektasi gaji?",
            options: [
              "Sebut rentang berdasarkan riset pasar",
              "Sebut angka setinggi mungkin",
              "“Terserah perusahaan saja”",
              "Rahasiakan sampai diterima",
            ],
            answer: 0,
            explain: "Rentang menunjukkan kamu riset pasar tapi fleksibel bernegosiasi.",
          },
          {
            q: "Jawaban terbaik untuk “apa kekuranganmu?”",
            options: [
              "“Saya perfeksionis” tanpa contoh",
              "Kekurangan nyata + cara mengatasinya",
              "“Saya tidak punya kekurangan”",
              "Menyebut 5 kekurangan sekaligus",
            ],
            answer: 1,
            explain: "HR menilai kejujuran dan kemauan berkembang, bukan kesempurnaan.",
          },
        ],
      },
    ],
  },
  "digital-marketing-umkm": {
    slug: "digital-marketing-umkm",
    title: "Digital Marketing untuk UMKM",
    path: "umkm-digital-entrepreneur",
    lessons: [
      {
        slug: "pelanggan-di-mana",
        no: 1,
        title: "Pelangganmu Ada di Mana?",
        skkni: "BISNIS-MKT-01",
        body: [
          "Pelanggan UMKM Indonesia hidup di Shopee, TikTok, dan WhatsApp — pilih SATU kanal dulu.",
          "Foto asli daganganmu mengalahkan foto stok: pembeli menilai kejujuran.",
          "Konsistensi mengalahkan viral: 1 konten/hari selama 30 hari lebih kuat dari 1 konten meledak.",
        ],
        quiz: [
          {
            q: "Langkah pertama marketing UMKM dengan tim kecil?",
            options: [
              "Fokus satu kanal selama 30 hari",
              "Buka akun di semua platform sekaligus",
              "Langsung pasang iklan besar",
              "Tunggu sampai punya tim konten",
            ],
            answer: 0,
            explain: "Satu kanal yang hidup mengalahkan lima kanal yang mati.",
          },
          {
            q: "Konten apa yang paling dipercaya pembeli UMKM?",
            options: [
              "Foto dan video asli dagangan",
              "Foto stok yang estetik",
              "Kutipan motivasi",
              "Meme lucu",
            ],
            answer: 0,
            explain: "Pembeli menilai kejujuran: produk asli, proses asli, pemilik asli.",
          },
        ],
      },
      {
        slug: "iklan-pertama",
        no: 2,
        title: "Iklan Pertama Rp50 Ribu",
        skkni: "BISNIS-MKT-02",
        body: [
          "Satu iklan, satu tujuan: chat WhatsApp masuk — bukan like, bukan follow.",
          "Targetkan radius kotamu dulu, jangan seluruh Indonesia.",
          "Ukur biaya per chat. Iklan yang boncos 3 hari berturut-turut: matikan, ganti foto.",
        ],
        quiz: [
          {
            q: "Metrik sukses iklan pertama UMKM?",
            options: [
              "Biaya per chat yang masuk",
              "Jumlah like",
              "Jumlah follower baru",
              "Komentar positif",
            ],
            answer: 0,
            explain: "Chat = calon pembeli. Like tidak membayar sewa warung.",
          },
          {
            q: "Kapan mematikan iklan yang boncos?",
            options: [
              "Setelah 3 hari tanpa chat",
              "Setelah 1 jam",
              "Jangan pernah, sayang modalnya",
              "Setelah sebulan",
            ],
            answer: 0,
            explain: "Tiga hari cukup untuk menilai satu kreativitas dengan budget kecil.",
          },
        ],
      },
    ],
  },
  "keuangan-gaji-bulanan": {
    slug: "keuangan-gaji-bulanan",
    title: "Atur Gaji Bulanan Tanpa Bocor",
    path: "siap-kerja",
    lessons: [
      {
        slug: "aturan-kos",
        no: 1,
        title: "Aturan 50-30-20 Versi Anak Kos",
        skkni: "HIDUP-FIN-01",
        body: [
          "50% kebutuhan (kos, makan, transport), 30% keinginan, 20% tabungan — sesuaikan, bukan hafalkan.",
          "Bayar diri sendiri dulu: autodebet tabungan di tanggal gajian, bukan sisa akhir bulan.",
          "Target dana darurat: 3x pengeluaran bulanan, simpan terpisah dari rekening harian.",
        ],
        quiz: [
          {
            q: "Kapan waktu terbaik menabung dari gaji?",
            options: [
              "Tanggal gajian via autodebet",
              "Akhir bulan dari sisa",
              "Saat ada bonus saja",
              "Saat ingat saja",
            ],
            answer: 0,
            explain: "Sisa akhir bulan hampir selalu nol. Autodebet memaksa diri membayar masa depan dulu.",
          },
          {
            q: "Target dana darurat yang sehat?",
            options: [
              "3x pengeluaran bulanan",
              "Setengah gaji",
              "Rp1 juta cukup",
              "Tidak perlu, ada paylater",
            ],
            answer: 0,
            explain: "Tiga bulan memberi napas saat PHK atau sakit tanpa berutang.",
          },
        ],
      },
      {
        slug: "waspada-pinjol",
        no: 2,
        title: "Waspada Pinjol & Scam",
        skkni: "HIDUP-FIN-02",
        body: [
          "Pinjol legal terdaftar di OJK — cek daftarnya sebelum meminjam, jangan dari iklan.",
          "Jangan pernah berikan OTP ke siapa pun, termasuk yang mengaku bank atau polisi.",
          "Terima transfer mencurigakan? Jangan teruskan — verifikasi VA dan lapor, bukan panik.",
        ],
        quiz: [
          {
            q: "Sebelum meminjam dari pinjol, wajib cek apa?",
            options: [
              "Terdaftar di OJK atau tidak",
              "Iklannya meyakinkan atau tidak",
              "Testimoni di media sosial",
              "Bunganya 0% atau tidak",
            ],
            answer: 0,
            explain: "Pinjol ilegal menagih dengan teror. Daftar legalitas OJK adalah filter pertama.",
          },
          {
            q: "Seseorang menelepon mengaku bank dan meminta OTP. Respons tepat?",
            options: [
              "Tolak dan tutup telepon, lalu hubungi bank resmi",
              "Berikan, karena dia tahu datamu",
              "Minta dia menunggu lalu transfer dulu",
              "Blokir tanpa verifikasi apa pun",
            ],
            answer: 0,
            explain: "Bank tidak pernah meminta OTP. Verifikasi lewat kanal resmi bank.",
          },
        ],
      },
    ],
  },
  "kerja-kantor-indonesia": {
    slug: "kerja-kantor-indonesia",
    title: "Etika Kantor Indonesia",
    path: "siap-kerja",
    lessons: [
      {
        slug: "atasan-hierarki",
        no: 1,
        title: "Hierarki & Komunikasi dengan Atasan",
        skkni: "WORK-ID-01",
        body: [
          "Beri kabar sebelum ditanya: update singkat tiap sore mengalahkan laporan panik tiap krisis.",
          "Dapat tugas mustahil? Jawab “siap, supaya selesai kapan yang paling prioritas?” — bukan diam.",
          "Kritik sampaikan privat + bawa solusi; pujian sampaikan terbuka.",
        ],
        quiz: [
          {
            q: "Atasan memberi tugas yang mustahil selesai hari ini. Respons terbaik?",
            options: [
              "Terima lalu tanya prioritas dan deadline realistis",
              "Diam dan lembur tanpa kabar",
              "Langsung tolak mentah-mentah",
              "Lempar ke rekan kerja",
            ],
            answer: 0,
            explain: "Atasan butuh informasi untuk mengatur ulang prioritas — beri dia data, bukan drama.",
          },
          {
            q: "Di mana menyampaikan kritik ke rekan kerja?",
            options: [
              "Privat, dengan solusi",
              "Di grup WhatsApp kantor",
              "Saat makan siang bersama",
              "Lewat status media sosial",
            ],
            answer: 0,
            explain: "Kritik privat menjaga muka; solusi menunjukkan niat membantu.",
          },
        ],
      },
      {
        slug: "meeting-feedback",
        no: 2,
        title: "Meeting & Feedback",
        skkni: "WORK-ID-02",
        body: [
          "Datang 5 menit lebih awal dengan catatan dan satu pertanyaan — itu sudah setengah nilai meeting.",
          "Terima feedback dengan rumus: dengar → minta contoh → buat rencana perbaikan.",
          "Antar generasi beda gaya: senior hargai proses, junior hargai kecepatan — sesuaikan bahasamu.",
        ],
        quiz: [
          {
            q: "Persiapan meeting yang paling dihargai atasan?",
            options: [
              "Datang awal dengan catatan dan pertanyaan",
              "Datang tepat waktu tanpa persiapan",
              "Membawa camilan untuk semua",
              "Duduk paling depan",
            ],
            answer: 0,
            explain: "Pertanyaan bagus menunjukkan kamu membaca materi dan berpikir.",
          },
          {
            q: "Menerima feedback pedas yang benar. Respons tepat?",
            options: [
              "Dengar, minta contoh konkret, buat rencana",
              "Bela diri seketika",
              "Menangis lalu cuti",
              "Balik mengkritik pemberi feedback",
            ],
            answer: 0,
            explain: "Contoh konkret mengubah emosi jadi data yang bisa diperbaiki.",
          },
        ],
      },
    ],
  },
};
