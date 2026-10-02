import type { Metadata } from "next";
import type { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { getLocaleMessages } from "@/i18n/messages";
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
  return (
    <NextIntlClientProvider locale={locale} messages={getLocaleMessages(locale)}>
      <Providers>{children}</Providers>
    </NextIntlClientProvider>
  );
}
