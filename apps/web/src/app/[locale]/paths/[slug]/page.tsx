import { createTranslator } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getLocaleMessages } from "@/i18n/messages";
import { PX, PHOTOS } from "@/lib/visual";
import { SiteFooter, SiteNav } from "@/components/site-chrome";
import { notFound } from "next/navigation";

/* Learning-path detail per PRD §9 (paths), §5 (goal-first), §16 (career map).
   Photography: local-ID only, see src/lib/visual.ts.
   Path content + UI copy from the paths dictionary namespace. */

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
  alt: string;
  caption: string;
  stages: PathStage[];
  skills: string[];
  project: string;
  career: string[];
  context: string;
}

const PATH_PHOTO: Record<string, number> = {
  "frontend-developer": PHOTOS.analystJKT,
  "umkm-digital-entrepreneur": PHOTOS.studyJKT,
  "data-analyst": PHOTOS.teamAsia,
  "siap-kerja": PHOTOS.campusSmile,
  "junior-accountant": PHOTOS.nightJKT,
};

export default async function PathPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const t = await createTranslator({
    locale,
    namespace: "paths",
    messages: getLocaleMessages(locale),
  });
  // A URL must not describe content it isn't serving.
  if (!t.has(`data.${slug}`)) notFound();
  const p = t.raw(`data.${slug}`) as PathData;

  return (
    <main id="konten" tabIndex={-1} className="overflow-x-clip bg-paper text-ink">
      <a href="#konten" className="skip-link">{t("skip")}</a>
      <SiteNav />

      {/* Header split: light role-first + enroll card */}
      <section className="hero-light relative overflow-hidden pt-[140px]">
        <div className="relative mx-auto grid max-w-7xl items-start gap-8 px-4 pb-12 pt-2 md:pb-14 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <Link href={{ pathname: "/", hash: "#pekerjaan" }} className="font-mono text-[12px] text-muted underline decoration-line underline-offset-4 hover:text-ink">{t("back")}</Link>
            <p className="eyebrow-light mt-6">{t("eyebrow", { level: p.level })}</p>
            <h1 className="mt-4 max-w-[18ch] text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">{p.title}</h1>
            <p className="mt-3 max-w-[30ch] text-[15px] font-bold text-signal-strong">{p.goal}</p>
            <p className="mt-2 max-w-[52ch] text-[15px] leading-relaxed text-soft">{p.desc}</p>
            <p className="tnum mt-4 font-mono text-[13px] text-muted">{p.salary} · {p.weeks}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link href="/auth/daftar" className="btn-amber group">
                {t("startFree")}
                <span className="btn-island btn-island-dark" aria-hidden>↗</span>
              </Link>
              <Link href="/belajar/js-dasar-analis" className="btn-ghost">{t("tryLab")}</Link>
            </div>
          </div>
          <aside className="lg:col-span-2">
            <div className="glass-light p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">{t("enrollTitle")}</p>
              <ul className="mt-3 space-y-2.5 text-sm text-soft">
                <li><span aria-hidden>✓ </span>{t("stageCount", { n: p.stages.length })}</li>
                <li><span aria-hidden>✓ </span>{t("skillCount", { n: p.skills.length })}</li>
                <li><span aria-hidden>✓ </span>{t("certLine")}</li>
                <li><span aria-hidden>✓ </span>{t("simLine")}</li>
              </ul>
              <p className="mt-4 rounded-input bg-signal/20 px-3.5 py-2.5 font-mono text-[11px] text-signal-strong">{t("freeNote")}</p>
            </div>
          </aside>
        </div>
      </section>

      {/* Hero visual: learner in context */}
      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <figure className="photo-cine aspect-[21/8]">
              <img src={PX(PATH_PHOTO[slug] ?? PHOTOS.analystJKT, 1600)} alt={p.alt} loading="lazy" decoding="async" sizes="(max-width: 1024px) 100vw, 1200px" className="h-full w-full object-cover" />
            <figcaption className="photo-cap">
              <span>{p.caption}</span>
              <span className="opacity-70">Pexels</span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Stages timeline */}
      <section className="mx-auto max-w-7xl px-4 py-14 md:py-16">
        <p className="eyebrow-light">{t("syllabus")}</p>
        <h2 className="mt-3 max-w-[22ch] text-3xl font-extrabold md:text-4xl">{t("stagesTitle")}</h2>
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
      <section className="border-y border-line bg-card">
        <div className="mx-auto grid max-w-7xl items-start gap-4 px-4 py-14 md:py-16 lg:grid-cols-2">
          <div className="rounded-card border border-line bg-paper p-5 md:p-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">{t("skillsTitle")}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {p.skills.map((s) => (
                <span key={s} className="chip !text-[13px]">{s}</span>
              ))}
            </div>
            <p className="mt-4 text-[13px] text-soft"><strong className="text-ink">{t("projectLabel")}</strong> {p.project}</p>
          </div>
          <div className="rounded-card border border-line bg-paper p-5 md:p-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">{t("careerTitle")}</p>
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
          <div className="rounded-card border-2 border-brand-700 bg-brand-50 p-5 md:p-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand-700">{t("contextTitle")}</p>
            <p className="mt-2 text-sm leading-relaxed text-soft">{p.context}</p>
          </div>
          <div className="rounded-card border border-line bg-card p-5 md:p-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">{t("certTitle")}</p>
            <p className="mt-2 text-sm font-bold">{t("certLine1")}</p>
            <p className="mt-1 font-mono text-[11px] text-muted">{t("certLine2")}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/auth/daftar" className="btn-primary group px-5">
                {t("startFree")}
                <span className="btn-island" aria-hidden>↗</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
