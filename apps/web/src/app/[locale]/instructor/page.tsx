// Instructor Dashboard — backend: course.*, assessment.*, submission.review, payout.*
import { createTranslator } from "next-intl";
import { requireRole } from "@/server/guard";
import { getLocaleMessages } from "@/i18n/messages";
import { appRouter } from "@/server/routers";
import { CreateCourseForm } from "./create-course-form";
import { EmptyState } from "@/components/empty-state";
import { OpsShell } from "@/components/ops-shell";

export default async function InstructorDashboard({ params }: { params: Promise<{ locale: string }> }) {
  await requireRole(["INSTRUCTOR", "ADMIN"]);
  const { locale } = await params;
  const t = await createTranslator({
    locale,
    namespace: "instructor",
    messages: getLocaleMessages(locale),
  });
  let courses: { id: string; slug: string; titleId: string; status: string }[] = [];
  let dbOnline = true;
  try {
    const caller = appRouter.createCaller({});
    courses = await caller.courses.list();
  } catch {
    dbOnline = false;
  }

  return (
    <OpsShell locale={locale} eyebrow={t("eyebrow")} title={t("title")} desc={t("desc")}>
      {!dbOnline && (
        <p className="panel-warm mt-0 p-4 text-sm text-soft">
          {t("dbOff")}
        </p>
      )}
      <div className="panel mt-4 p-5 md:p-6"><CreateCourseForm /></div>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {courses.map((c) => (
          <div key={c.id} className="spot panel p-5">
            <p className="font-extrabold">{c.titleId}</p>
            <p className="mt-1 font-mono text-[11px] text-muted">/{c.slug} · {c.status}</p>
          </div>
        ))}
      </div>
      {courses.length === 0 && dbOnline && (
        <div className="mt-4">
          <EmptyState art="ledger" title={t("emptyTitle")} hint={t("empty")} />
        </div>
      )}
    </OpsShell>
  );
}
