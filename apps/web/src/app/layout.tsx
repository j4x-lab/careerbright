import type { Metadata } from "next";
import type { ReactNode } from "react";
import localFont from "next/font/local";
import "./globals.css";

// Jakarta Light concept: Plus Jakarta Sans (400–800) + IBM Plex Mono —
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

const plex = localFont({
  src: [
    { path: "../../public/fonts/IBMPlexMono-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/IBMPlexMono-Medium.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/IBMPlexMono-SemiBold.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-plex",
  display: "swap",
  fallback: ["ui-monospace", "SFMono-Regular", "monospace"],
});

export const metadata: Metadata = {
  title: "SuperBright — Mau Jadi Apa Setelah Lulus?",
  description:
    "Pilih peran impianmu. Ikuti jalur selaras SKKNI, kerjakan asesmen yang dinilai AI sampai portofolio dan sertifikat terverifikasi.",
  metadataBase: new URL("https://careerbright.id"),
  openGraph: {
    title: "SuperBright — Mau Jadi Apa Setelah Lulus?",
    description:
      "Pilih peran, ikuti jalur SKKNI, bangun portofolio, raih sertifikat terverifikasi.",
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
