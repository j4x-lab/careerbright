// Jakarta Light shell for ops dashboards — light header + panel cards.
import type { ReactNode } from "react";
import { createTranslator } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getLocaleMessages } from "@/i18n/messages";

export async function OpsShell({
  locale, eyebrow, title, desc, children,
}: { locale: string; eyebrow: string; title: string; desc: string; children: ReactNode }) {
  const c = await createTranslator({
    locale,
    namespace: "common",
    messages: getLocaleMessages(locale),
  });
  return (
    <main className="min-h-[100dvh] bg-paper text-ink">
      <section className="hero-light relative overflow-hidden border-b border-line pt-[140px]">
        <div className="relative mx-auto max-w-7xl px-4 pb-10">
          <Link href="/" className="font-mono text-[12px] text-muted underline decoration-line underline-offset-4 hover:text-ink">{c("home")}</Link>
          <p className="eyebrow-light mt-6">{eyebrow}</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight md:text-5xl">{title}</h1>
          <p className="mt-3 max-w-[62ch] text-[14px] leading-relaxed text-soft">{desc}</p>
        </div>
      </section>
      <div className="mx-auto max-w-7xl px-4 py-8">{children}</div>
    </main>
  );
}

export function StatCard({ t, v, s }: { t: string; v: string; s: string }) {
  return (
    <div className="panel p-5 md:p-6">
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">{t}</p>
      <p className="tnum mt-2 font-mono text-2xl font-bold tracking-tight">{v}</p>
      <p className="mt-1 text-xs text-muted">{s}</p>
    </div>
  );
}
