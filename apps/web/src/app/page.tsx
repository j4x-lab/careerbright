import LandingPage from "@/components/landing-page";

/* Locale-less root: always default locale (id). /en + /id render via [locale]/page. */

export default function HomePage() {
  return <LandingPage locale="id" />;
}
