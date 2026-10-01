import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "CareerBright — Siap Kerja, Siap Bersaing",
  description:
    "Platform kesiapan karier AI untuk mahasiswa Indonesia. Jalur berbasis peran, selaras SKKNI/KKNI, dinilai AI.",
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
