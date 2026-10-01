import { DEMO_COURSES } from "@/lib/demo-content";
import { McqQuiz } from "@/components/assess/mcq-quiz";
import { CodeLab } from "@/components/assess/code-lab";
import { notFound } from "next/navigation";

// Lesson viewer — demo content works offline; DB-backed lessons in Phase 2.
export default async function BelajarPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = DEMO_COURSES[slug];
  if (!course) notFound();

  return (
    <main className="mx-auto min-h-[100dvh] max-w-3xl bg-ink-950 px-4 py-10">
      <a href="/#jalur" className="link-more">
        ← Semua jalur
      </a>
      <p className="mt-6 inline-block rounded-full border border-white/10 px-3 py-1 font-mono text-[11px] text-zinc-400">
        Kursus demo · {course.lessons.length} pelajaran
      </p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">{course.title}</h1>
      <div className="photo-cine mt-6 aspect-[21/9] rounded-2xl border border-white/10">
        <img
          src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1050&auto=format&fit=crop"
          alt="Mahasiswa menulis catatan belajar dengan laptop di meja"
          loading="lazy"
          decoding="async"
          sizes="(max-width: 768px) 100vw, 768px"
          className="h-full w-full object-cover"
        />
        <p className="absolute bottom-3 left-4 font-mono text-[11px] text-zinc-200">
          superbright · lab bahasa indonesia
        </p>
      </div>
      <div className="mt-10 space-y-4">
        {course.lessons.map((l) => (
          <article key={l.slug} className="rounded-2xl border border-white/10 bg-ink-900 p-6 md:p-8">
            <p className="font-mono text-[11px] text-accent">
              Pelajaran {l.no} · {l.skkni}
            </p>
            <h2 className="mt-2 text-xl font-bold tracking-tight">{l.title}</h2>
            <div className="mt-4 space-y-2.5">
              {l.body.map((p, i) => (
                <p key={i} className="max-w-[65ch] text-sm leading-relaxed text-zinc-300">
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
    </main>
  );
}
