import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Career SuperBright — Lulus Kuliah, Langsung Siap Kerja",
  description:
    "Pilih peran impianmu. Selesaikan jalur selaras SKKNI/KKNI, dinilai AI per rubrik, dan bawa pulang kredensial terverifikasi rekruter.",
  metadataBase: new URL("https://careerbright.id"),
  openGraph: {
    title: "Career SuperBright — Lulus Kuliah, Langsung Siap Kerja",
    description:
      "Jalur berbasis peran, selaras SKKNI/KKNI, dinilai AI. Badge OB 3.0 + VC + upgrade BNSP.",
    type: "website",
    locale: "id_ID",
  },
  twitter: { card: "summary_large_image" },
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='8' fill='%230c0e12'/%3E%3Ctext x='16' y='22' text-anchor='middle' font-family='monospace' font-size='16' font-weight='bold' fill='%2300d4ff'%3ESB%3C/text%3E%3C/svg%3E",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className="min-h-[100dvh] bg-ink-950 text-zinc-100 antialiased">
        {children}
      </body>
    </html>
  );
}
