"use client";

import { useState } from "react";
import { snapJsUrl } from "@careerbright/payments";

declare global {
  interface Window {
    snap?: { pay: (token: string, opts?: object) => void };
  }
}

function loadSnap(): Promise<void> {
  if (window.snap) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = snapJsUrl();
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Snap.js failed to load"));
    document.body.appendChild(s);
  });
}

// Paid LSP-upgrade checkout. Disabled gracefully when backend has no keys/DB.
export function UpgradeButton({ learningPathId, priceLabel }: { learningPathId: string; priceLabel: string }) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function checkout() {
    setBusy(true);
    setErr(null);
    try {
      const res = await fetch("/api/payments/snap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ learningPathId }),
      });
      if (!res.ok) throw new Error("Checkout belum tersedia (gateway/DB offline)");
      const { snapToken } = (await res.json()) as { snapToken: string };
      await loadSnap();
      window.snap?.pay(snapToken);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Checkout gagal");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <button
        onClick={checkout}
        disabled={busy}
        className="rounded-full bg-action px-5 py-2.5 text-sm font-semibold text-white transition active:translate-y-[1px] disabled:opacity-50"
      >
        {busy ? "Memproses…" : `Upgrade — ${priceLabel}`}
      </button>
      {err && <p className="mt-2 text-sm text-action">{err}</p>}
    </div>
  );
}
