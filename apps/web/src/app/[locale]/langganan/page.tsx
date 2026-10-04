"use client";

import { useState } from "react";
import { SUBSCRIPTION_ANNUAL, SUBSCRIPTION_MONTHLY, SUBSCRIPTION_SEMESTER, formatIDR } from "@careerbright/payments";

/* /langganan — Rp69rb/bln + paket semester/tahunan (Exec Summary §3) + invite kampus. */

const TIERS = [
  { id: "MONTHLY", label: "Bulanan", price: SUBSCRIPTION_MONTHLY, days: 30 },
  { id: "SEMESTER", label: "Semester (hemat)", price: SUBSCRIPTION_SEMESTER, days: 180 },
  { id: "ANNUAL", label: "Tahunan (paling hemat)", price: SUBSCRIPTION_ANNUAL, days: 365 },
] as const;

export default function LanggananPage() {
  const [tier, setTier] = useState<(typeof TIERS)[number]["id"]>("MONTHLY");
  const [email, setEmail] = useState("");
  const [invite, setInvite] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function checkout() {
    setBusy(true);
    setMsg(null);
    try {
      const res = await fetch("/api/subscriptions/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: email || "pending-auth", tier, customerEmail: email || undefined, campusInviteCode: invite || undefined }),
      });
      const json = (await res.json()) as { free?: boolean; license?: string; snapToken?: string; price?: number; error?: string };
      if (!res.ok) throw new Error(json.error ?? "Checkout gagal");
      if (json.free) {
        setMsg(`Aktif via lisensi kampus: ${json.license}`);
        return;
      }
      setMsg(`Snap token: ${json.snapToken} — selesaikan pembayaran Rp${(json.price ?? 0).toLocaleString("id-ID")}.`);
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Gagal");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main id="konten" className="mx-auto max-w-3xl px-4 pb-20 pt-[120px]">
      <p className="eyebrow-light">Langganan mahasiswa</p>
      <h1 className="font-nova mt-3 text-3xl font-bold md:text-5xl">Bukti kesiapan kerja seharga sekali nongkrong.</h1>
      <div className="mt-8 grid gap-3">
        {TIERS.map((t) => (
          <button
            key={t.id}
            type="button"
            aria-pressed={tier === t.id}
            onClick={() => setTier(t.id)}
            className={`panel p-5 text-left ${tier === t.id ? "!border-ink" : ""}`}
          >
            <span className="font-bold">{t.label}</span>
            <span className="font-nova ml-3 text-2xl font-bold">{formatIDR(t.price)}</span>
            <span className="ml-2 font-mono text-[11px] text-muted">{t.days} hari</span>
          </button>
        ))}
      </div>
      <div className="mt-6 grid gap-3">
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email (untuk receipt)" className="field" type="email" />
        <input value={invite} onChange={(e) => setInvite(e.target.value)} placeholder="Kode invite kampus (opsional — gratis bila valid)" className="field font-mono" />
        <button onClick={checkout} disabled={busy} className="btn-primary min-h-[52px] px-7">
          {busy ? "Memproses…" : "Bayar via Midtrans"}
        </button>
        {msg && <p className="text-sm">{msg}</p>}
      </div>
    </main>
  );
}
