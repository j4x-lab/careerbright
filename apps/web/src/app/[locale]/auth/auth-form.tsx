"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export function AuthForm({ mode }: { mode: "in" | "up" }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const input = "field";

  async function emailSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    try {
      if (mode === "up") {
        const res = await authClient.signUp.email({ email, password, name });
        if (res.error) throw new Error(res.error.message ?? "Gagal mendaftar");
        setMsg("Pendaftaran berhasil. Mengalihkan…");
      } else {
        const res = await authClient.signIn.email({ email, password });
        if (res.error) throw new Error(res.error.message ?? "Gagal masuk");
        setMsg("Berhasil masuk. Mengalihkan…");
      }
      window.location.href = "/id/dashboard";
    } catch (err) {
      setMsg(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setBusy(false);
    }
  }

  async function sendOtp() {
    setBusy(true);
    setMsg(null);
    try {
      const res = await authClient.phoneNumber.sendOtp({ phoneNumber: phone });
      if (res?.error) throw new Error(res.error.message ?? "Gagal kirim OTP");
      setOtpSent(true);
      setMsg("Kode OTP dikirim (dev: lihat log server).");
    } catch (err) {
      setMsg(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setBusy(false);
    }
  }

  async function verifyOtp() {
    setBusy(true);
    setMsg(null);
    try {
      const res = await authClient.phoneNumber.verify({ phoneNumber: phone, code });
      if (res?.error) throw new Error(res.error.message ?? "OTP salah");
      window.location.href = "/id/dashboard";
    } catch (err) {
      setMsg(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-14">
      <a href="/" className="link-more">
        ← Beranda
      </a>
      <h1 className="mt-4 text-2xl font-semibold tracking-tight">
        {mode === "up" ? "Daftar gratis" : "Masuk"}
      </h1>
      <form onSubmit={emailSubmit} className="mt-6 grid gap-3 rounded-2xl border border-ink/10 bg-card p-5">
        {mode === "up" && (
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nama lengkap" className={input} />
        )}
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" className={input} />
        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Kata sandi (min 8)" type="password" minLength={8} className={input} />
        <button disabled={busy} className="btn-primary justify-center px-5 py-2.5 text-sm disabled:opacity-50">
          {mode === "up" ? "Buat akun" : "Masuk"}
        </button>
      </form>

      <div className="mt-4 rounded-2xl border border-ink/10 bg-card p-5">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">atau via WhatsApp / SMS OTP</p>
        <div className="mt-3 grid gap-3">
          <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+62…" className={input} />
          {!otpSent ? (
            <button onClick={sendOtp} disabled={busy || !phone} className="btn-ghost justify-center px-5 py-2.5 text-sm disabled:opacity-50">
              Kirim kode
            </button>
          ) : (
            <>
              <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Kode 6 digit" inputMode="numeric" className={input} />
              <button onClick={verifyOtp} disabled={busy || !code} className="btn-primary justify-center px-5 py-2.5 text-sm disabled:opacity-50">
                Verifikasi & masuk
              </button>
            </>
          )}
        </div>
      </div>
      {msg && <p className="mt-4 text-sm text-soft">{msg}</p>}
    </div>
  );
}
