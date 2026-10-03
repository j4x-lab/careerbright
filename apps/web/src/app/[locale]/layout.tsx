import type { Metadata } from "next";
import type { ReactNode } from "react";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Providers } from "@/trpc/client";

export const metadata: Metadata = {
  title: {
    default: "Career SuperBright — Latihan Kerja Nyata",
    template: "%s · Career SuperBright",
  },
  description:
    "Latihan kerja nyata buat mahasiswa tingkat akhir. Tanpa kuis, tanpa sertifikat pajangan.",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Caches the resolved locale so the root layout's getLocale() reads it
  // without touching headers — keeps these routes statically prerendered.
  setRequestLocale(locale);
  return <Providers>{children}</Providers>;
}
