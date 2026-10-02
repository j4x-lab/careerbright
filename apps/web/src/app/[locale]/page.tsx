import LandingPage from "@/components/landing-page";

export default async function LocaleHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <LandingPage locale={locale} />;
}
