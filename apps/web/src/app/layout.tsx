import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Plus_Jakarta_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

// Light OS system: Jakarta Sans display + body (designed for Indonesian,
// legible on cheap Androids), Plex Mono for codes + figures. No serif.
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});
const plex = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "SuperBright — Dari Belajar Jadi Bisa",
  description:
    "Pilih tujuanmu: dapat kerja, naik level, mulai usaha. Kuasai skill praktis konteks Indonesia dengan Bright AI, sampai portofolio dan sertifikat terverifikasi.",
  metadataBase: new URL("https://careerbright.id"),
  openGraph: {
    title: "SuperBright — Dari Belajar Jadi Bisa",
    description:
      "Skill praktis konteks Indonesia: jalur tujuan, Bright AI, proyek nyata, portofolio publik, sertifikat terverifikasi.",
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
      className={`${jakarta.variable} ${plex.variable}`}
    >
      <body className="min-h-[100dvh] bg-paper text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
