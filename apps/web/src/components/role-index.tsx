import { createTranslator } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getLocaleMessages } from "@/i18n/messages";
import { LOCAL } from "@/lib/visual";
import { ROLES, ROLE_CATEGORIES, type RoleCategory } from "@/lib/discovery";
import { MISSIONS_CATALOG } from "@/lib/missions-catalog";
import { ROLE_META, formatSalaryRange } from "@/lib/role-meta";
import { ProfessionCard } from "@/components/mission/profession-card";

/*
 * Landing profession section — parent/intro/filter/search, NOT a full dump.
 *
 * The old layout rendered every profession at once (54 rows). Now:
 *   1. Intro: counts (professions × missions ready).
 *   2. Search: plain GET form → /misi?q= (works without JS).
 *   3. Parents: 5 category cards (name, profession count, salary band,
 *      popular count) → /misi?kategori=.
 *   4. Preview: 6 popular professions with mission CTAs.
 *   5. CTA band: full catalog → /misi.
 * The full 54-card grid lives on /misi only.
 */

const CAT_LABEL_KEY: Record<RoleCategory, string> = {
  "Tech & Product": "heroCatTech",
  "Creative & Marketing": "heroCatCreative",
  "Business & Operations": "heroCatBiz",
  "Finance & Banking": "heroCatFinance",
  "Future & AI": "heroCatFuture",
};

export async function RoleIndex({ locale }: { locale: string }) {
  const t = await createTranslator({
    locale,
    namespace: "landing",
    messages: getLocaleMessages(locale),
  });
  const missionRoles = new Set(MISSIONS_CATALOG.map((m) => m.roleId));
  const ready = ROLES.filter((r) => missionRoles.has(r.id)).length;

  const cats = ROLE_CATEGORIES.map((cat) => {
    const roles = ROLES.filter((r) => r.category === cat);
    const metas = roles.map((r) => ROLE_META[r.id]).filter(Boolean);
    const lo = metas.length ? Math.min(...metas.map((m) => m!.salaryMin)) : 0;
    const hi = metas.length ? Math.max(...metas.map((m) => m!.salaryMax)) : 0;
    const popular = roles.filter((r) => ROLE_META[r.id]?.popular).length;
    const withMission = roles.filter((r) => missionRoles.has(r.id)).length;
    return { cat, roles, lo, hi, popular, withMission };
  });

  const popularRoles = ROLES.filter((r) => ROLE_META[r.id]?.popular).slice(0, 6);
  const byRole = new Map(MISSIONS_CATALOG.map((m) => [m.roleId, m] as const));

  return (
    <section
      id="semua-peran"
      className="mx-auto max-w-7xl scroll-mt-32 px-4 pb-20 pt-14 md:pb-32 md:pt-20"
    >
      {/* ── Intro ── */}
      <div className="border-t-2 border-brand-700 pt-6">
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-brand-700">
          {t("profEyebrow")}
        </p>
        <div className="mt-3 grid gap-5 md:grid-cols-12 md:items-end">
          <h2 className="font-nova max-w-[22ch] text-[32px] font-bold leading-[1.06] tracking-[-0.02em] md:col-span-7 md:text-[40px]">
            {t("profTitle")}
          </h2>
          <p className="max-w-[42ch] text-[15px] leading-relaxed text-soft md:col-span-5">
            {t("profSub", { total: ROLES.length, ready })}
          </p>
        </div>
      </div>

      {/* ── Search (filter before browse) ── */}
      <form
        action={locale === "id" ? "/misi" : `/${locale}/misi`}
        method="get"
        role="search"
        className="mt-8"
      >
        <label htmlFor="prof-cari" className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-700">
          {t("profSearchLabel")}
        </label>
        <div className="relative mt-2.5 flex gap-2">
          <div className="relative min-w-0 flex-1">
            <svg aria-hidden viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-faint"><circle cx="7" cy="7" r="5" /><path d="m11 11 3 3" /></svg>
            <input
              id="prof-cari"
              name="q"
              type="search"
              placeholder={t("profSearchPh")}
              className="field !pl-11 !py-3.5 !text-[15px]"
              autoComplete="off"
            />
          </div>
          <button type="submit" className="btn-primary min-h-[52px] flex-none px-6 text-sm">
            {t("profSearchCta")}
          </button>
        </div>
      </form>

      {/* ── Parents: 5 category cards ── */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {cats.map(({ cat, roles, lo, hi, popular, withMission }) => (
          <Link
            key={cat}
            href={`/misi?kategori=${encodeURIComponent(cat)}`}
            className="panel group flex min-h-[44px] flex-col p-5 transition hover:border-ink"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
              {t("profCatLabel")}
            </p>
            <p className="font-nova mt-1.5 text-[17px] font-bold leading-snug">
              {t(CAT_LABEL_KEY[cat] as "heroCatTech")}
            </p>
            <p className="tnum mt-2 font-nova text-2xl font-bold text-brand-700">
              {roles.length}
              <span className="ml-1.5 align-middle font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-muted">
                {t("profRolesUnit")}
              </span>
            </p>
            {lo > 0 && (
              <p className="mt-1 text-[13px] font-bold">{formatSalaryRange(lo, hi)}</p>
            )}
            <p className="mt-1 font-mono text-[11px] leading-relaxed text-muted">
              {t("profCatMeta", { mission: withMission, popular })}
            </p>
            <span className="link-more mt-auto inline-flex min-h-[44px] items-center pt-2">
              {t("profExplore")}
            </span>
          </Link>
        ))}
      </div>

      {/* ── Preview: popular six ── */}
      <div className="mt-12">
        <div className="flex flex-wrap items-baseline justify-between gap-3 border-t border-line pt-6">
          <h3 className="font-nova text-2xl font-bold tracking-[-0.02em]">
            {t("profPopularLabel")}
          </h3>
          <Link href="/misi" className="link-more inline-flex min-h-[44px] items-center">
            {t("profViewAll", { n: ROLES.length })}
          </Link>
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {popularRoles.map((role) => (
            <ProfessionCard key={role.id} role={role} mission={byRole.get(role.id) ?? null} />
          ))}
        </div>
      </div>

      {/* ── CTA band ── */}
      <div className="relative mt-10 overflow-hidden rounded-card bg-brand-700 px-6 py-10 md:px-12">
        <div aria-hidden className="grid-ink pointer-events-none absolute inset-0" />
        <p className="relative font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-white/70">
          {t("profCtaEyebrow")}
        </p>
        <p className="font-nova relative mt-3 max-w-[26ch] text-2xl font-bold leading-tight text-white md:text-3xl">
          {t("profCtaTitle", { n: ROLES.length })}
        </p>
        <Link
          href="/misi"
          className="relative mt-6 inline-flex min-h-[52px] items-center gap-2.5 rounded-btn bg-white px-7 text-[15px] font-extrabold text-brand-700 transition hover:bg-paper"
        >
          {t("profCtaButton")}
        </Link>
      </div>

      <p className="mt-4 font-mono text-[11px] leading-relaxed text-muted">
        {t("profSalaryNote")}
      </p>
      <figure className="photo-cine mt-6 aspect-[21/9]">
        <img
          src={LOCAL.kantorJakarta}
          alt={t("jobsPhotoAlt")}
          loading="lazy"
          decoding="async"
          sizes="(max-width: 768px) 100vw, 1120px"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <figcaption className="photo-cap">
          <span>{t("jobsPhotoCap")}</span>
          <span className="opacity-70">Pexels</span>
        </figcaption>
      </figure>
    </section>
  );
}

/* Skeleton keeps the new footprint: header + search + 5 parents + preview. */
export function RoleIndexSkeleton() {
  return (
    <div aria-hidden className="mx-auto max-w-7xl scroll-mt-32 px-4 pb-20 pt-14 md:pb-32 md:pt-20">
      <div className="border-t-2 border-brand-700 pt-6">
        <div className="h-4 w-40 animate-pulse rounded bg-cream" />
        <div className="mt-3 h-10 w-2/3 animate-pulse rounded bg-cream" />
      </div>
      <div className="mt-8 h-[52px] animate-pulse rounded-btn bg-cream" />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-44 animate-pulse rounded-card bg-cream" />
        ))}
      </div>
    </div>
  );
}
