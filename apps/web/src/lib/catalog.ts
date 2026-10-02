import { DEMO_COURSES } from "./demo-content";
import { curriculumText, getCourse, getCourses } from "./curriculum";

/* Catalog index for §29 Search/Discovery + §30 Recommendations + §26 badges.
   Derived from DEMO_COURSES so search always matches real content. */

export type CatalogKind = "kursus" | "jalur";
export type CatalogCategory = "Teknologi" | "Karier" | "Bisnis" | "Indonesia";

export interface CatalogItem {
  kind: CatalogKind;
  slug: string;
  title: string;
  desc: string;
  category: CatalogCategory;
  level: string;
  meta: string;
  badge: "SuperBright Verified" | "Community";
  konteksID: boolean;
  href: string;
}

const COURSE_CATEGORY: Record<string, { category: CatalogCategory; desc: string; konteksID: boolean }> = {
  "js-dasar-analis": {
    category: "Teknologi",
    desc: "JavaScript untuk analis: array, fungsi, dan agregasi data.",
    konteksID: true,
  },
  "cv-siap-lamar": {
    category: "Karier",
    desc: "CV satu halaman + portofolio publik siap lamar.",
    konteksID: true,
  },
  "interview-pertama": {
    category: "Karier",
    desc: "Perkenalan 2 menit, gaji pertama, pertanyaan jebakan.",
    konteksID: true,
  },
  "digital-marketing-umkm": {
    category: "Bisnis",
    desc: "Pilih kanal, konten jujur, iklan pertama Rp50 ribu.",
    konteksID: true,
  },
  "keuangan-gaji-bulanan": {
    category: "Indonesia",
    desc: "Budget 50-30-20 versi kos + waspada pinjol dan scam.",
    konteksID: true,
  },
  "kerja-kantor-indonesia": {
    category: "Indonesia",
    desc: "Hierarki, meeting, dan feedback di kantor Indonesia.",
    konteksID: true,
  },
};

const COURSE_LEVEL: Record<string, string> = {
  "js-dasar-analis": "Pemula–Menengah",
  "cv-siap-lamar": "Semua level",
  "interview-pertama": "Semua level",
  "digital-marketing-umkm": "Pemula",
  "keuangan-gaji-bulanan": "Semua level",
  "kerja-kantor-indonesia": "Semua level",
};

const PATH_INDEX: CatalogItem[] = [
  {
    kind: "jalur",
    slug: "frontend-developer",
    title: "Become a Frontend Developer",
    desc: "HTML ke deployment + website bisnis Indonesia asli.",
    category: "Teknologi",
    level: "Pemula → Siap kerja",
    meta: "4–6 bln · IDR 8–25 jt",
    badge: "SuperBright Verified",
    konteksID: true,
    href: "/id/paths/frontend-developer",
  },
  {
    kind: "jalur",
    slug: "siap-kerja",
    title: "Fresh Graduate Siap Lamar",
    desc: "CV, portofolio, interview, etika kantor dalam 4 minggu.",
    category: "Karier",
    level: "Fresh graduate",
    meta: "4 minggu · Tawaran pertama",
    badge: "SuperBright Verified",
    konteksID: true,
    href: "/id/paths/siap-kerja",
  },
  {
    kind: "jalur",
    slug: "umkm-digital-entrepreneur",
    title: "UMKM Digital Entrepreneur",
    desc: "10 modul + strategi digital UMKM kopi fiktif.",
    category: "Bisnis",
    level: "Semua level",
    meta: "10 modul · Fleksibel",
    badge: "SuperBright Verified",
    konteksID: true,
    href: "/id/paths/umkm-digital-entrepreneur",
  },
  {
    kind: "jalur",
    slug: "data-analyst",
    title: "Data Analyst Path",
    desc: "Excel ke Power BI + proyek e-commerce Indonesia.",
    category: "Teknologi",
    level: "Pemula → Siap kerja",
    meta: "7 modul · IDR 7–18 jt",
    badge: "SuperBright Verified",
    konteksID: true,
    href: "/id/paths/data-analyst",
  },
  {
    kind: "jalur",
    slug: "junior-accountant",
    title: "Akuntan Junior (Fokus Pajak)",
    desc: "Akuntansi, e-Faktur, dan capstone SPT klien mock.",
    category: "Bisnis",
    level: "KKNI 6",
    meta: "24 minggu · IDR 6–9 jt",
    badge: "SuperBright Verified",
    konteksID: true,
    href: "/id/paths/junior-accountant",
  },
];

function buildCatalog(locale: string): CatalogItem[] {
  const en = locale === "en";
  const EN = curriculumText();
  const courses = Object.values(DEMO_COURSES).map((c) => {
    const lc = getCourse(c.slug, locale);
    const extra = COURSE_CATEGORY[c.slug] ?? {
      category: "Teknologi" as CatalogCategory,
      desc: c.title,
      konteksID: false,
    };
    return {
      kind: "kursus" as const,
      slug: c.slug,
      title: lc.title,
      desc: en ? (EN.catalogDesc[c.slug] ?? extra.desc) : extra.desc,
      category: extra.category,
      level: en ? (EN.catalogLevel[c.slug] ?? COURSE_LEVEL[c.slug] ?? "Semua level") : (COURSE_LEVEL[c.slug] ?? "Semua level"),
      meta: en
        ? EN.catalogMetaLessons.replace("{n}", String(lc.lessons.length))
        : `${lc.lessons.length} pelajaran · Gratis`,
      badge: "SuperBright Verified" as const,
      konteksID: extra.konteksID,
      href: `/id/belajar/${c.slug}`,
    };
  });
  const paths = PATH_INDEX.map((p) => {
    if (!en) return p;
    const ep = (EN as unknown as { pathData: Record<string, Partial<CatalogItem>> }).pathData[p.slug];
    if (!ep) return p;
    return { ...p, title: ep.title ?? p.title, desc: ep.desc ?? p.desc, level: (ep.level as CatalogItem["level"]) ?? p.level, meta: ep.meta ?? p.meta };
  });
  return [...courses, ...paths];
}

export const CATALOG: CatalogItem[] = buildCatalog("id");

export function searchCatalog(q: string, category: CatalogCategory | "Semua", kind: CatalogKind | "Semua", konteksOnly: boolean, locale = "id"): CatalogItem[] {
  const needle = q.trim().toLowerCase();
  return buildCatalog(locale).filter((item) => {
    if (category !== "Semua" && item.category !== category) return false;
    if (kind !== "Semua" && item.kind !== kind) return false;
    if (konteksOnly && !item.konteksID) return false;
    if (!needle) return true;
    return `${item.title} ${item.desc} ${item.category}`.toLowerCase().includes(needle);
  });
}

/* §30-style rule demo: next course in the same path, else next course overall. */
export function recommendNext(courseSlug: string, locale = "id"): { item: CatalogItem; reason: string } | null {
  const courses = getCourses(locale);
  const course = courses[courseSlug];
  if (!course) return null;
  const siblings = Object.values(courses).filter((c) => c.path === course.path && c.slug !== courseSlug);
  const picked = siblings[0] ?? Object.values(courses).find((c) => c.slug !== courseSlug);
  if (!picked) return null;
  const item = buildCatalog(locale).find((i) => i.kind === "kursus" && i.slug === picked.slug);
  if (!item) return null;
  if (locale === "en") {
    const EN = curriculumText();
    return {
      item,
      reason:
        siblings.length > 0
          ? EN.recSame.replace("{t}", course.title)
          : EN.recTop.replace("{t}", course.title),
    };
  }
  return {
    item,
    reason:
      siblings.length > 0
        ? `Satu jalur dengan ${course.title} — lanjutkan momentumnya.`
        : `Pelengkap ${course.title} yang paling diambil learner lain.`,
  };
}
