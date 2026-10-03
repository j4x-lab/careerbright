import { createTranslator } from "next-intl";
import { Link } from "@/i18n/navigation";
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
   UI copy + course meta from the belajar dictionary namespace.
   Visual language: PREMIUM-BOLD to match the landing — big confident
   display type, strong contrast, dramatic whitespace, one hero element
   per viewport (the outcome card up top, the recommendation at close).
   Dials: VARIANCE 8 / MOTION 5 / DENSITY 4. */

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
    <main id="konten" tabIndex={-1} className="overflow-x-clip bg-paper text-ink">
      <a href="#konten" className="skip-link">{t("skip")}</a>
      <SiteNav />

      {/* Course header — premium-bold: display H1, meta strip, outcome card as hero */}
      <section className="hero-light relative overflow-hidden pt-[120px] md:pt-[144px]">
        <div aria-hidden className="grid-light absolute inset-0" />
        <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-8 md:pb-20">
          <Link href={{ pathname: "/", hash: "#pekerjaan" }} className="inline-flex min-h-[44px] items-center font-mono text-[12px] text-muted underline decoration-line underline-offset-4 hover:text-ink">{t("back")}</Link>
          <p className="hero-enter hero-enter-1 eyebrow-light mt-8 flex items-center gap-3">
            <span aria-hidden className="inline-block h-[2px] w-8 flex-none bg-brand-700" />
            {meta.level}
          </p>
          <h1 className="hero-enter hero-enter-2 mt-6 max-w-[16ch] text-[clamp(2.5rem,7vw,4.5rem)] font-extrabold leading-[1.0] tracking-tight">{course.title}</h1>
          <p className="hero-enter hero-enter-3 mt-6 max-w-[52ch] text-base leading-relaxed text-soft md:text-lg">
            {t("sub")}
          </p>
          <p className="hero-enter hero-enter-3 mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-line pt-5 font-mono text-[12px] text-muted">
            <span>{meta.duration}</span>
            <span aria-hidden className="text-faint">·</span>
            <span>{t("langName")}</span>
            <span aria-hidden className="text-faint">·</span>
            <span>{t("cert")}</span>
            <span aria-hidden className="text-faint">·</span>
            <span>{t("proj")}</span>
          </p>
          <p className="hero-enter hero-enter-4 mt-4 font-mono text-[11px] leading-relaxed text-faint">{t("byline", { u: meta.updated })}</p>

          <figure className="photo-cine hero-enter hero-enter-4 mt-10 aspect-[21/9]">
              <img
                src={PX(COURSE_PHOTO_ID[slug] ?? PHOTOS.analystJKT, 1400)}
                alt={photoAlt}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                sizes="(max-width: 1024px) 100vw, 1200px"
                className="h-full w-full object-cover"
              />
            <figcaption className="photo-cap text-[12px]">
              <span>{t("caption")}</span>
              <span className="opacity-70">Pexels</span>
            </figcaption>
          </figure>

          <div className="mt-6 grid items-stretch gap-5 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="rounded-card border-2 border-signal/60 bg-signal-soft p-7 shadow-[0_24px_64px_-32px_rgba(180,83,9,0.35)] md:p-10">
              <p className="flex items-center gap-3 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-signal-strong">
                <span aria-hidden className="live-dot-amber live-dot" />
                {t("outcomeLabel")}
              </p>
              <p className="mt-4 max-w-[38ch] text-xl font-extrabold leading-snug tracking-tight md:text-2xl">{meta.project}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {meta.skills.map((s) => (
                  <span key={s} className="chip bg-card font-mono !text-xs">{s}</span>
                ))}
              </div>
            </div>
            <div className="panel flex flex-col justify-center p-6 md:p-8">
              <p className="text-sm leading-relaxed text-soft">
                <strong className="font-semibold text-ink">{t("methodLabel")}</strong>
                {experience.join(" → ")}
              </p>
              <p className="mt-4 rounded-input bg-paper px-3.5 py-2.5 text-[13px] leading-relaxed text-muted">
                {t("stuckPre")}<strong className="text-ink">{t("stuckBrand")}</strong>{t("stuckPost")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Lessons (unchanged behavior) */}
      <section className="mx-auto max-w-3xl px-4 py-16 md:py-24">
        <h2 className="max-w-[18ch] text-4xl font-extrabold leading-[1.05] tracking-tight md:text-5xl">{t("lessonsTitle", { n: course.lessons.length })}</h2>
        <div aria-hidden className="mt-6 h-[3px] w-16 bg-signal" />
        <div className="mt-10 space-y-10 md:mt-12 md:space-y-14">
          {course.lessons.map((l) => (
            <article key={l.slug} className="panel p-7 md:p-10">
              <div className="flex items-center gap-4">
                <span className="card-num tnum">{String(l.no).padStart(2, "0")}</span>
                <span aria-hidden className="h-px flex-1 bg-ink/10" />
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-brand-700">
                  {l.skkni}
                </p>
              </div>
              <h3 className="mt-4 text-[1.65rem] font-extrabold leading-tight tracking-tight md:text-4xl">{l.title}</h3>
              <div className="mt-5 space-y-3">
                {l.body.map((p, i) => (
                  <p key={i} className="max-w-[65ch] text-[15px] leading-relaxed text-soft md:text-base">
                    {p}
                  </p>
                ))}
              </div>
              {l.quiz && (
                <div className="mt-10 border-t-2 border-ink/10 pt-8 md:pt-10">
                  <McqQuiz id={`${slug}-${l.slug}`} questions={l.quiz} />
                </div>
              )}
              {l.lab && (
                <div className="mt-10 border-t-2 border-ink/10 pt-8 md:pt-10">
                  <CodeLab id={`${slug}-${l.slug}`} starter={l.lab.starter} tests={l.lab.tests} />
                </div>
              )}
            </article>
          ))}
        </div>

        {/* §30 Recommendation — rule demo over the real catalog */}
        {rec && (
          <div className="relative mt-16 overflow-hidden rounded-card border-2 border-signal/60 bg-signal-soft p-8 shadow-[0_24px_64px_-32px_rgba(180,83,9,0.4)] md:mt-24 md:p-12">
            <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-signal/15" />
            <p className="relative max-w-[24ch] text-2xl font-extrabold leading-tight tracking-tight md:text-4xl">{t("recTitle", { title: rec.item.title })}</p>
            <p className="relative mt-3 max-w-[52ch] text-[15px] leading-relaxed text-soft md:text-base">{rec.reason}</p>
            <Link href={rec.item.href} className="btn-amber group relative mt-8 min-h-[52px] px-7 text-[15px]">
              {t("next")}
              <span className="btn-island btn-island-dark !h-6 !w-6 text-xs" aria-hidden>↗</span>
            </Link>
          </div>
        )}
      </section>
      <SiteFooter />
    </main>
  );
}
