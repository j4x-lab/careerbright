import { DEMO_COURSES, type DemoCourse, type DemoLesson } from "./demo-content";
import enMessages from "../../messages/en.json";

/* Locale-aware curriculum. ID renders straight from DEMO_COURSES
   (no dictionary needed); EN overlays translated fields from the
   curriculum namespace, keeping structure/answers/code from base
   so indices and test fixtures can never drift. */

interface ENQuiz { q?: string; options?: string[]; explain?: string }
interface ENLab { starter?: string; tests?: { name?: string }[] }
interface ENLesson { title?: string; body?: string[]; quiz?: ENQuiz[]; lab?: ENLab }
interface ENCourse { title?: string; lessons?: ENLesson[] }
interface ENCurriculum {
  courses: Record<string, ENCourse>;
  catalogDesc: Record<string, string>;
  catalogLevel: Record<string, string>;
  catalogMetaLessons: string;
  recSame: string;
  recTop: string;
}

const EN = (enMessages as unknown as { curriculum: ENCurriculum }).curriculum;

function mergeLesson(l: DemoLesson, el?: ENLesson): DemoLesson {
  if (!el) return l;
  return {
    ...l,
    title: el.title ?? l.title,
    body: el.body ?? l.body,
    quiz: l.quiz?.map((q, j) => ({ ...q, ...(el.quiz?.[j] ?? {}) })),
    lab: l.lab
      ? {
          ...l.lab,
          starter: el.lab?.starter ?? l.lab.starter,
          tests: l.lab.tests.map((tt, k) => ({ ...tt, name: el.lab?.tests?.[k]?.name ?? tt.name })),
        }
      : undefined,
  };
}

export function getCourse(slug: string, locale: string): DemoCourse {
  const base = DEMO_COURSES[slug];
  if (!base || locale !== "en") return base;
  const ec = EN.courses[slug];
  if (!ec) return base;
  return {
    ...base,
    title: ec.title ?? base.title,
    lessons: base.lessons.map((l, i) => mergeLesson(l, ec.lessons?.[i])),
  };
}

export function getCourses(locale: string): Record<string, DemoCourse> {
  if (locale !== "en") return DEMO_COURSES;
  const out: Record<string, DemoCourse> = {};
  for (const slug of Object.keys(DEMO_COURSES)) out[slug] = getCourse(slug, locale);
  return out;
}

export function curriculumText() {
  return EN;
}
