import type { Metadata } from "next";
import type { ReactNode } from "react";
import localFont from "next/font/local";
import { NextIntlClientProvider, type AbstractIntlMessages } from "next-intl";
import idMessages from "../../messages/id.json";
import "./globals.css";

// Jakarta Light concept: Plus Jakarta Sans (400–800) + Roboto Mono variable —
// both self-hosted, zero Google Fonts downloads (offline/Termux-safe).
const jakarta = localFont({
  src: [
    { path: "../../public/fonts/PlusJakartaSans-Regular.ttf", weight: "400", style: "normal" },
    { path: "../../public/fonts/PlusJakartaSans-Medium.ttf", weight: "500", style: "normal" },
    { path: "../../public/fonts/PlusJakartaSans-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../../public/fonts/PlusJakartaSans-Bold.ttf", weight: "700", style: "normal" },
    { path: "../../public/fonts/PlusJakartaSans-ExtraBold.ttf", weight: "800", style: "normal" },
  ],
  variable: "--font-jakarta",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "-apple-system", "sans-serif"],
});

const robotoMono = localFont({
  src: [
    { path: "../../public/fonts/RobotoMono-Variable.woff2", weight: "100 700", style: "normal" },
  ],
  variable: "--font-roboto-mono",
  display: "swap",
  fallback: ["ui-monospace", "SFMono-Regular", "monospace"],
});

const grotesk = localFont({
  src: [
    { path: "../../public/fonts/SpaceGrotesk-Variable.woff2", weight: "300 700", style: "normal" },
  ],
  variable: "--font-grotesk",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Career SuperBright — Coba Contoh Kerja 30 Hari Sebelum Lulus",
  description:
    "Lihat 4 pilihan peran. 1 contoh Event bisa dicoba penuh 30 hari. 3 lainnya masih pengenalan.",
  metadataBase: new URL("https://careerbright.id"),
  openGraph: {
    title: "Career SuperBright — Don't just learn about the job. Practice doing it.",
    description:
      "Try a 30-day work example before graduating. 1 Event demo playable, 3 intros.",
    type: "website",
    locale: "id_ID",
  },
  twitter: { card: "summary_large_image" },
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='8' fill='%231D4ED8'/%3E%3Ctext x='16' y='22' text-anchor='middle' font-family='monospace' font-size='16' font-weight='bold' fill='%23ffffff'%3ESB%3C/text%3E%3C/svg%3E",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${jakarta.variable} ${robotoMono.variable} ${grotesk.variable}`}
    >
      <body className="min-h-[100dvh] bg-paper text-ink antialiased">
        <NextIntlClientProvider locale="id" messages={idMessages as unknown as AbstractIntlMessages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
