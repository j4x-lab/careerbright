// Admin Console — accounts & roles, course catalog.
// Server component: it gates on the session, then hands rendering to the client
// console which owns the mutations.
import { createTranslator } from "next-intl";
import { getLocaleMessages } from "@/i18n/messages";
import { EmptyState } from "@/components/empty-state";
import { OpsShell } from "@/components/ops-shell";
import { requireRole } from "@/server/guard";
import { AdminConsole } from "./admin-console";

export default async function AdminDashboard({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const session = await requireRole(["ADMIN"]);
  const t = await createTranslator({
    locale,
    namespace: "admin",
    messages: getLocaleMessages(locale),
  });
  const me = session.user as { name?: string | null; email?: string | null };

  return (
    <OpsShell locale={locale} eyebrow={t("eyebrow")} title={t("title")} desc={t("desc")}>
      {/* Identifies who is acting — an admin surface without an actor is a
          shared anonymous terminal. */}
      <p className="mt-5 border-l-2 border-brand-700 pl-4 font-mono text-[12px] text-muted">
        {t("signedInAs", { name: me.name ?? me.email ?? "—" })}
      </p>

      <div className="mt-8">
        <AdminConsole />
      </div>

      <div className="mt-12">
        <EmptyState art="ledger" title={t("modTitle")} hint={t("modBody")} />
      </div>
    </OpsShell>
  );
}
