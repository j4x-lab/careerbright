import { DEMO_COURSES } from "@/lib/demo-content";
import { recommendNext } from "@/lib/catalog";
import { PX, PHOTOS } from "@/lib/visual";
import { McqQuiz } from "@/components/assess/mcq-quiz";
import { CodeLab } from "@/components/assess/code-lab";
import { notFound } from "next/navigation";

/* Course detail per PRD §53 (course object), §11 (learning experience),
   §27 (governance). Lessons below unchanged — demo works offline.
   Photography: local-ID only, see src/lib/visual.ts. */

const COURSE_META: Record<string, { level: string; duration: string; skills: string[]; project: string; updated: string }> = {
  "js-dasar-analis": {
    level: "Pemula–Menengah",
    duration: "6 jam · 2 pelajaran",
    skills: ["JavaScript", "Array", "Fungsi", "Agregasi data"],
    project: "Fungsi total penjualan yang lolos 3 uji otomatis.",
    updated: "Okt 2026 · v1.0",
  },
  "cv-siap-lamar": {
    level: "Semua level",
    duration: "3 jam · 2 pelajaran",
    skills: ["CV", "Portofolio", "Personal branding"],
    project: "CV satu halaman + profil publik siap lamar.",
    updated: "Okt 2026 · v1.0",
  },
  "interview-pertama": {
    level: "Semua level",
    duration: "3 jam · 2 pelajaran",
    skills: ["Interview HR", "Negosiasi gaji", "Komunikasi"],
    project: "Simulasi interview 2 menit yang dinilai AI.",
    updated: "Okt 2026 · v1.0",
  },
  "digital-marketing-umkm": {
    level: "Pemula",
    duration: "4 jam · 2 pelajaran",
    skills: ["Marketplace", "Konten", "Iklan budget kecil"],
    project: "Rencana iklan Rp50 ribu dengan target chat.",
    updated: "Okt 2026 · v1.0",
  },
  "keuangan-gaji-bulanan": {
    level: "Semua level",
    duration: "3 jam · 2 pelajaran",
    skills: ["Budgeting", "Dana darurat", "Anti-scam"],
    project: "Budget 50-30-20 + autodebet pertamamu.",
    updated: "Okt 2026 · v1.0",
  },
  "kerja-kantor-indonesia": {
    level: "Semua level",
    duration: "3 jam · 2 pelajaran",
    skills: ["Hierarki", "Meeting", "Feedback"],
    project: "Simulasi respons tugas mustahil + feedback pedas.",
    updated: "Okt 2026 · v1.0",
  },
};

const EXPERIENCE = ["Video singkat", "Bacaan", "Kuis", "Praktik langsung", "Proyek nyata", "Asesmen", "Sertifikat"];

export default async function BelajarPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = DEMO_COURSES[slug];
  if (!course) notFound();
  const rec = recommendNext(slug);
  const meta = COURSE_META[slug] ?? {
    level: "Semua level",
    duration: `${course.lessons.length} pelajaran`,
    skills: ["Skill praktis"],
    project: "Proyek portofolio di akhir kursus.",
    updated: "Okt 2026 · v1.0",
  };

  return (
    <main className="overflow-x-clip bg-paper pt-[96px] text-ink">
      <a href="#konten" className="skip-link">Lewati ke konten</a>

      {/* Course header */}
      <section className="border-b border-line bg-white">
        <div id="konten" className="mx-auto max-w-7xl px-4 py-10 md:py-12">
          <a href="/#jalur" className="link-more">← Katalog</a>
          <div className="mt-6 flex flex-wrap gap-2">
            {[meta.level, meta.duration, "Bahasa Indonesia", "Sertifikat ✓", "Proyek ✓"].map((c) => (
              <span key={c} className="rounded-lg border border-line bg-paper px-3 py-1.5 font-mono text-[11px] text-soft">{c}</span>
            ))}
          </div>
          <h1 className="mt-4 max-w-[20ch] text-3xl font-bold leading-tight md:text-5xl">{course.title}</h1>
          <p className="mt-3 max-w-[60ch] text-[15px] leading-relaxed text-soft">
            Belajar sambil membangun: tiap pelajaran berakhir di kuis atau lab yang dinilai otomatis.
          </p>
          <p className="mt-3 font-mono text-[11px] text-faint">Tim SuperBright · Terverifikasi · Diperbarui {meta.updated}</p>

          <figure className="mt-8 overflow-hidden rounded-[20px] border border-line bg-card">
            <div className="photo-cine aspect-[21/9]">
              <img
                src={PX(PHOTOS.analystJKT, 1400)}
                alt="Analis muda bekerja dengan laptop di kantor Jakarta"
                loading="lazy"
                decoding="async"
                sizes="(max-width: 1024px) 100vw, 1200px"
                className="h-full w-full object-cover"
              />
            </div>
            <figcaption className="flex flex-wrap items-center justify-between gap-2 bg-white px-5 py-3 font-mono text-[11px]">
              <span className="text-soft">Belajar seperti ritme kerja — fokus, praktik, selesai</span>
              <span className="text-faint">Foto: Pexels</span>
            </figcaption>
          </figure>

          <div className="mt-4 grid items-start gap-4 lg:grid-cols-2">
            <div className="rounded-[20px] border-2 border-brand-700 bg-brand-50 p-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand-700">Yang akan kamu bangun</p>
              <p className="mt-2 text-sm font-bold leading-relaxed">{meta.project}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {meta.skills.map((s) => (
                  <span key={s} className="rounded-[10px] border border-line bg-white px-3 py-1.5 font-mono text-[11px] text-soft">{s}</span>
                ))}
              </div>
            </div>
            <div className="rounded-[20px] border border-line bg-white p-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">Isi kursus</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {EXPERIENCE.map((e) => (
                  <li key={e} className="flex items-center gap-2 rounded-[10px] border border-line bg-paper px-3 py-1.5 text-[13px] text-soft">
                    <span aria-hidden className="font-mono text-[11px] font-bold text-brand-700">✓</span>{e}
                  </li>
                ))}
              </ul>
              <p className="mt-3 rounded-[10px] bg-paper px-3 py-2.5 text-[13px] text-soft">
                Stuck? Tanya <strong className="text-ink">Bright AI</strong> — terikat materi, bukan chatbot bebas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Lessons (unchanged behavior) */}
      <section className="mx-auto max-w-3xl px-4 py-10 md:py-12">
        <h2 className="text-2xl font-bold md:text-3xl">Pelajaran · {course.lessons.length}</h2>
        <div className="mt-6 space-y-4">
          {course.lessons.map((l) => (
            <article key={l.slug} className="rounded-[20px] border border-line bg-white p-6 md:p-8">
              <p className="font-mono text-[11px] text-brand-700">
                Pelajaran {l.no} · {l.skkni}
              </p>
              <h3 className="mt-2 text-xl font-bold tracking-tight">{l.title}</h3>
              <div className="mt-4 space-y-2.5">
                {l.body.map((p, i) => (
                  <p key={i} className="max-w-[65ch] text-sm leading-relaxed text-soft">
                    {p}
                  </p>
                ))}
              </div>
              {l.quiz && (
                <div className="mt-6">
                  <McqQuiz id={`${slug}-${l.slug}`} questions={l.quiz} />
                </div>
              )}
              {l.lab && (
                <div className="mt-6">
                  <CodeLab id={`${slug}-${l.slug}`} starter={l.lab.starter} tests={l.lab.tests} />
                </div>
              )}
            </article>
          ))}
        </div>

        {/* §30 Recommendation — rule demo over the real catalog */}
        {rec && (
          <div className="mt-6 rounded-[20px] border-2 border-brand-700 bg-brand-50 p-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand-700">Rekomendasi untukmu</p>
            <p className="mt-2 text-[16px] font-bold">{rec.item.title}</p>
            <p className="mt-1 text-sm text-soft">{rec.reason}</p>
            <a href={rec.item.href} className="btn-primary mt-4 px-5 py-2.5 text-[13px]">
              Lanjut Belajar
              <span className="btn-island !h-6 !w-6 text-xs" aria-hidden>↗</span>
            </a>
          </div>
        )}
      </section>
    </main>
  );
}
