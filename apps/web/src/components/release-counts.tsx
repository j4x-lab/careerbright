import { Suspense } from "react";
import { createTranslator } from "next-intl";
import { getLocaleMessages } from "@/i18n/messages";
import { ROLES, getScenariosForRole } from "@/lib/discovery";
import { getReleasedRoleIds } from "@/lib/releases";

/*
 * Release-count sentences (jobsSub, ctaNote). Their numbers come from the
 * DB gate, so each is its own async island behind Suspense: the surrounding
 * hero / final-CTA sections stream without waiting. Server-only (pg gate).
 */

async function Counts({ locale }: { locale: string }) {
  const released = await getReleasedRoleIds();
  const playable = ROLES.filter(
    (r) => getScenariosForRole(r.id).length > 0 && released.has(r.id)
  ).length;
  return { total: ROLES.length, playable, soon: ROLES.length - playable };
}

async function JobsSubTextInner({ locale }: { locale: string }) {
  const t = await createTranslator({
    locale,
    namespace: "landing",
    messages: getLocaleMessages(locale),
  });
  const c = await Counts({ locale });
  return (
    <p className="mt-4 max-w-[42ch] text-[15px] leading-relaxed text-soft">
      {t("jobsSub", c)}
    </p>
  );
}

export function JobsSubText({ locale }: { locale: string }) {
  return (
    <Suspense
      fallback={
        <p aria-hidden className="mt-4 max-w-[42ch]">
          <span className="block h-4 w-full animate-pulse rounded bg-cream" />
          <span className="mt-2 block h-4 w-2/3 animate-pulse rounded bg-cream" />
        </p>
      }
    >
      <JobsSubTextInner locale={locale} />
    </Suspense>
  );
}

async function CtaNoteTextInner({ locale }: { locale: string }) {
  const t = await createTranslator({
    locale,
    namespace: "landing",
    messages: getLocaleMessages(locale),
  });
  const c = await Counts({ locale });
  return (
    <p className="relative mt-5 max-w-[56ch] font-mono text-[11px] leading-relaxed text-white/85">
      {t("ctaNote", c)}
    </p>
  );
}

export function CtaNoteText({ locale }: { locale: string }) {
  return (
    <Suspense
      fallback={
        <p
          aria-hidden
          className="relative mt-5 h-4 w-2/3 animate-pulse rounded bg-white/20"
        />
      }
    >
      <CtaNoteTextInner locale={locale} />
    </Suspense>
  );
}
