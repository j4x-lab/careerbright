import { createTranslator } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getLocaleMessages } from "@/i18n/messages";
import { Reveal } from "@/components/reveal";
import { LOCAL } from "@/lib/visual";
import { ROLES, getScenariosForRole } from "@/lib/discovery";
import { getReleasedRoleIds } from "@/lib/releases";

/*
 * Landing role index — the heavy island. It awaits the release gate, so it
 * lives behind a Suspense boundary in landing-page.tsx: hero, demand proof
 * and the ticker stream immediately while this fills in. Never import this
 * from a client component (pg-backed gate).
 */

export async function RoleIndex({ locale }: { locale: string }) {
  const t = await createTranslator({
    locale,
    namespace: "landing",
    messages: getLocaleMessages(locale),
  });
  const released = await getReleasedRoleIds();
  const hasPlayable = (id: string) =>
    getScenariosForRole(id).length > 0 && released.has(id);
  const PLAYABLE_ROLES = ROLES.filter((r) => hasPlayable(r.id));
  const COMING_SOON_ROLES = ROLES.filter((r) => !hasPlayable(r.id));
  return (
    <section
      id="semua-peran"
      className="mx-auto max-w-7xl scroll-mt-32 px-4 pb-20 pt-14 md:pb-32 md:pt-20"
    >
      {/* Wave-1 rows — list, not twin cards */}
      <Reveal>
        <div className="overflow-hidden rounded-card border border-line bg-card">
          <p className="border-b border-line bg-paper px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted md:px-10">
            {t("waveBand", { n: PLAYABLE_ROLES.length })}
          </p>
          <ul className="divide-y divide-line">
            <li
              className="grid gap-4 px-6 py-7 md:grid-cols-12 md:items-center md:gap-6 md:px-10"
            >
              <div className="md:col-span-4">
                <p aria-hidden className="tnum font-mono text-[12px] font-bold tracking-[0.14em] text-muted">
                  01
                </p>
                <h3 className="mt-1.5 text-lg font-extrabold tracking-tight md:text-xl">
                  {t("roleEvent")}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-soft">
                  {t("eventMission")}
                </p>
              </div>
              <ul
                className="flex flex-wrap content-center gap-1.5 md:col-span-4"
                aria-label={t("eventCapsLabel")}
              >
                {[t("capsEv1"), t("capsEv2"), t("capsEv3")].map((c) => (
                  <li key={c} className="chip !text-[12px]">
                    {c}
                  </li>
                ))}
              </ul>
              <div className="md:col-span-4 md:text-right">
                <p className="font-mono text-[11px] leading-relaxed text-muted">
                  {t("eventSignal")}
                </p>
                <Link
                  href="/auth/daftar"
                  className="link-more mt-2 inline-flex min-h-[44px] items-center"
                >
                  {t("eventCta")}
                </Link>
              </div>
            </li>
            {PLAYABLE_ROLES.map((row, i) => (
              <li
                key={row.id}
                className="grid gap-4 px-6 py-7 md:grid-cols-12 md:items-center md:gap-6 md:px-10"
              >
                <div className="md:col-span-4">
                  <p aria-hidden className="tnum font-mono text-[12px] font-bold tracking-[0.14em] text-muted">
                    {String(i + 2).padStart(2, "0")}
                  </p>
                  <h3 className="mt-1.5 text-lg font-extrabold tracking-tight md:text-xl">
                    {row.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-soft">
                    {row.shortDescription}
                  </p>
                </div>
                <ul
                  className="flex flex-wrap content-center gap-1.5 md:col-span-4"
                  aria-label={`${t("capsLabel")} ${row.title}`}
                >
                  {row.tools.slice(0, 3).map((c) => (
                    <li key={c} className="chip !text-[12px]">
                      {c}
                    </li>
                  ))}
                </ul>
                <div className="md:col-span-4 md:text-right">
                  <p className="font-mono text-[11px] leading-relaxed text-muted">
                    {t("scenariosCount", { n: getScenariosForRole(row.id).length })}
                  </p>
                  <Link
                    href={`/role/${row.id}`}
                    className="link-more mt-2 inline-flex min-h-[44px] items-center"
                  >
                    {t("playCta")}
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <Reveal delay={80}>
        <div className="mt-5 flex flex-col gap-2 rounded-card border border-dashed border-line bg-paper px-6 py-5 sm:flex-row sm:items-center sm:justify-between md:px-10">
          <p className="text-sm text-soft">
            <strong className="text-ink">{t("soon")}</strong>{" "}
            {COMING_SOON_ROLES.map((r) => r.title).join(" · ")}
          </p>
          <Link href="/auth/daftar" className="link-more inline-flex min-h-[44px] flex-none items-center">
            {t("earlyCta")}
          </Link>
        </div>
        <p className="mt-4 font-mono text-[11px] leading-relaxed text-muted">
          {t("sources")}
        </p>
      </Reveal>
      <Reveal delay={120}>
        <figure className="photo-cine mt-6 aspect-[21/9]">
          <img
            src={LOCAL.kantorJakarta}
            alt={t("jobsPhotoAlt")}
            loading="lazy"
            decoding="async"
            sizes="(max-width: 768px) 100vw, 1120px"
            className="h-full w-full object-cover"
          />
          <figcaption className="photo-cap">
            <span>{t("jobsPhotoCap")}</span>
            <span className="opacity-70">Pexels</span>
          </figcaption>
        </figure>
      </Reveal>
    </section>
  );
}

/* Skeleton shown while the gate resolves — same footprint as the band
   header plus a few rows, so the page does not jump when content lands. */
export function RoleIndexSkeleton() {
  return (
    <div
      aria-hidden
      className="mx-auto max-w-7xl scroll-mt-32 px-4 pb-20 pt-14 md:pb-32 md:pt-20"
    >
      <div className="overflow-hidden rounded-card border border-line bg-card">
        <div className="border-b border-line bg-paper px-6 py-3.5 md:px-10">
          <div className="h-4 w-56 animate-pulse rounded bg-cream" />
        </div>
        <ul className="divide-y divide-line">
          {Array.from({ length: 4 }).map((_, i) => (
            <li key={i} className="grid gap-4 px-6 py-7 md:grid-cols-12 md:px-10">
              <div className="space-y-2 md:col-span-4">
                <div className="h-5 w-2/3 animate-pulse rounded bg-cream" />
                <div className="h-4 w-full animate-pulse rounded bg-cream" />
              </div>
              <div className="flex gap-1.5 md:col-span-4">
                <div className="h-6 w-20 animate-pulse rounded-full bg-cream" />
                <div className="h-6 w-20 animate-pulse rounded-full bg-cream" />
              </div>
              <div className="md:col-span-4 md:text-right">
                <div className="h-4 w-32 animate-pulse rounded bg-cream md:ml-auto" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
