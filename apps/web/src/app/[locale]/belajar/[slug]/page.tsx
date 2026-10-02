import { createTranslator } from "next-intl";
import { getLocaleMessages } from "@/i18n/messages";
import { getCourse } from "@/lib/curriculum";
import { recommendNext } from "@/lib/catalog";
import { PX, PHOTOS } from "@/lib/visual";
import { McqQuiz } from "@/components/assess/mcq-quiz";
import { CodeLab } from "@/components/assess/code-lab";
import { SiteFooter, SiteNav } from "@/components/site-chrome";
import { notFound } from "next/navigation";

/* Course detail per PRD §53 (course object), §11 (learning experience),
   §27 (governance). Lessons below unchanged — demo works offline.
   Photography: local-ID only, see src/lib/visual.ts.
   UI copy + course meta from the belajar dictionary namespace. */

const COURSE_PHOTO_ID: Record<string, number> = {
  "js-dasar-analis": PHOTOS.analystJKT,
  "cv-siap-lamar": PHOTOS.campusSmile,
  "interview-pertama": PHOTOS.meetingDiverse,
  "digital-marketing-umkm": PHOTOS.studyJKT,
  "keuangan-gaji-bulanan": PHOTOS.analystJKT,
  "kerja-kantor-indonesia": PHOTOS.meetingRoomAsia,
};

export default async function BelajarPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const t = await createTranslator({
    locale,
    namespace: "belajar",
    messages: getLocaleMessages(locale),
  });
  const course = getCourse(slug, locale);
  if (!course) notFound();
  const rec = recommendNext(slug, locale);
  const meta = (t.raw(`meta.${slug}`) as { level: string; duration: string; skills: string[]; project: string; updated: string } | undefined) ?? {
    level: t("metaDefaultLevel"),
    duration: t("metaDefaultDuration", { n: course.lessons.length }),
    skills: [t("metaDefaultSkills")],
    project: t("metaDefaultProject"),
    updated: t("metaDefaultUpdated"),
  };
  const experience = t.raw("experience") as string[];
  const photoAlt = t.has(`photoAlt.${slug}`)
    ? t(`photoAlt.${slug}`)
    : t("photoAltDefault");

  return (
    <main className="overflow-x-clip bg-paper text-ink">
      <a href="#konten" className="skip-link">{t("skip")}</a>
      <SiteNav />

      {/* Course header — light */}
      <section className="hero-light relative overflow-hidden pt-[140px]">
        <div id="konten" className="relative mx-auto max-w-7xl px-4 pb-12">
          <a href="/#pekerjaan" className="font-mono text-[12px] text-muted underline decoration-line underline-offset-4 hover:text-ink py-2">{t("back")}</a>
          <p className="mt-6 font-mono text-xs text-muted">
            {meta.level} · {meta.duration} · {t("langName")} · {t("cert")} · {t("proj")}
          </p>
          <h1 className="mt-4 max-w-[20ch] text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">{course.title}</h1>
          <p className="mt-3 max-w-[60ch] text-[15px] leading-relaxed text-soft">
            {t("sub")}
          </p>
          <p className="mt-3 font-mono text-[12px] text-faint">{t("byline", { u: meta.updated })}</p>

          <figure className="photo-cine mt-8 aspect-[21/9]">
              <img
                src={PX(COURSE_PHOTO_ID[slug] ?? PHOTOS.analystJKT, 1400)}
                alt={photoAlt}
                loading="lazy"
                decoding="async"
                sizes="(max-width: 1024px) 100vw, 1200px"
                className="h-full w-full object-cover"
              />
            <figcaption className="photo-cap text-[12px]">
              <span>{t("caption")}</span>
              <span className="opacity-70">Pexels</span>
            </figcaption>
          </figure>

          <div className="mt-4 grid items-start gap-4 lg:grid-cols-2">
            <div className="rounded-card border border-signal/25 bg-signal-soft p-6">
              <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-signal-strong">{t("outcomeLabel")}</p>
              <p className="mt-2 text-[15px] font-extrabold leading-relaxed tracking-tight">{meta.project}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {meta.skills.map((s) => (
                  <span key={s} className="chip font-mono !text-xs">{s}</span>
                ))}
              </div>
            </div>
            <div className="panel p-6">
              <p className="text-sm leading-relaxed text-soft">
                <strong className="font-semibold text-ink">{t("methodLabel")}</strong>
                {experience.join(" → ")}
              </p>
              <p className="mt-3 rounded-input bg-paper px-3.5 py-2.5 text-sm text-soft">
                {t("stuckPre")}<strong className="text-ink">{t("stuckBrand")}</strong>{t("stuckPost")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Lessons (unchanged behavior) */}
      <section className="mx-auto max-w-3xl px-4 py-10 md:py-12">
        <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">{t("lessonsTitle", { n: course.lessons.length })}</h2>
        <div className="mt-6 space-y-6">
          {course.lessons.map((l) => (
            <article key={l.slug} className="panel p-6 md:p-8">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="card-num tnum">{String(l.no).padStart(2, "0")}</span>
                <p className="font-mono text-[12px] text-brand-700">
                  {l.skkni}
                </p>
              </div>
              <h3 className="mt-2 text-2xl font-bold tracking-tight">{l.title}</h3>
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
          <div className="mt-6 rounded-card border-2 border-brand-700 bg-brand-50 p-6">
            <p className="text-lg font-bold tracking-tight">{t("recTitle", { title: rec.item.title })}</p>
            <p className="mt-1 text-sm text-soft">{rec.reason}</p>
            <a href={rec.item.href} className="btn-primary mt-4 px-5 py-3 text-sm">
              {t("next")}
              <span className="btn-island !h-6 !w-6 text-xs" aria-hidden>↗</span>
            </a>
          </div>
        )}
      </section>
      <SiteFooter />
    </main>
  );
}
