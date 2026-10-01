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
    <main className="mx-auto max-w-3xl px-4 py-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
        Kursus demo · {course.lessons.length} pelajaran
      </p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight">{course.title}</h1>
      <div className="mt-8 space-y-10">
        {course.lessons.map((l) => (
          <article key={l.slug} className="border-t border-white/10 pt-6">
            <p className="font-mono text-[11px] text-zinc-500">
              Pelajaran {l.no} · {l.skkni}
            </p>
            <h2 className="mt-1 text-xl font-bold tracking-tight">{l.title}</h2>
            <div className="mt-3 space-y-2">
              {l.body.map((p, i) => (
                <p key={i} className="text-sm leading-relaxed text-zinc-300">
                  {p}
                </p>
              ))}
            </div>
            {l.quiz && (
              <div className="mt-4">
                <McqQuiz id={`${slug}-${l.slug}`} questions={l.quiz} />
              </div>
            )}
            {l.lab && (
              <div className="mt-4">
                <CodeLab id={`${slug}-${l.slug}`} starter={l.lab.starter} tests={l.lab.tests} />
              </div>
            )}
          </article>
        ))}
      </div>
    </main>
  );
}
