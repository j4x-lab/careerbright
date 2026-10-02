"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";

/* Cerah v2 — split auth: brand panel + form card. */

export function AuthForm({ mode }: { mode: "in" | "up" }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

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
    <div className="grid min-h-[100dvh] bg-paper text-ink md:grid-cols-2">
      {/* brand panel */}
      <div className="hero-light relative hidden overflow-hidden border-r border-line md:block">
        <div className="relative flex h-full flex-col justify-between p-10">
          <a href="/" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-700 font-mono text-[13px] font-bold text-white">SB</span>
            <span className="text-[15px] font-extrabold tracking-tight">SUPER<span className="text-brand-700">BRIGHT</span></span>
          </a>
          <div>
            <p className="eyebrow-light">Mau jadi apa setelah lulus?</p>
            <p className="mt-3 max-w-[20ch] text-4xl font-extrabold leading-[1.05] tracking-tight">
              Malam ini 15 menit. Bulan depan portofolio.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-4 border-t border-line pt-6">
              {[["25+", "peran"], ["7", "kategori"], ["ID/EN", "bilingual"]].map(([v, l]) => (
                <div key={l}>
                  <p className="tnum font-mono text-xl font-bold text-brand-700">{v}</p>
                  <p className="mt-0.5 font-mono text-[11px] text-muted">{l}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="font-mono text-[11px] text-faint">Data di Jakarta · QRIS / GoPay / VA · WA ID/EN</p>
        </div>
      </div>

      {/* form */}
      <div className="mx-auto flex w-full max-w-md flex-col justify-center px-5 py-12">
        <a href="/" className="link-more">← Beranda</a>
        <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.2em] text-brand-700">
          {mode === "up" ? "Gratis selamanya untuk dasar" : "Selamat datang kembali"}
        </p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight md:text-4xl">
          {mode === "up" ? "Daftar gratis" : "Masuk"}
        </h1>
        <form onSubmit={emailSubmit} className="panel mt-6 grid gap-3 p-5 md:p-6">
          {mode === "up" && (
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nama lengkap" className="field" autoComplete="name" />
          )}
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" className="field" autoComplete="email" />
          <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Kata sandi (min 8)" type="password" minLength={8} className="field" autoComplete={mode === "up" ? "new-password" : "current-password"} />
          <button disabled={busy} className="btn-primary justify-center px-5 py-3 text-sm disabled:opacity-50">
            {mode === "up" ? "Buat akun gratis" : "Masuk"}
          </button>
          <p className="text-center font-mono text-[11px] text-faint">
            {mode === "up" ? "Sudah punya akun? " : "Belum punya akun? "}
            <a href={mode === "up" ? "/id/auth/masuk" : "/id/auth/daftar"} className="font-bold text-brand-700 underline underline-offset-4">
              {mode === "up" ? "Masuk" : "Daftar gratis"}
            </a>
          </p>
        </form>

        <div className="panel-warm mt-4 p-5 md:p-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">atau via WhatsApp / SMS OTP</p>
          <div className="mt-3 grid gap-3">
            <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+62…" className="field" autoComplete="tel" />
            {!otpSent ? (
              <button onClick={sendOtp} disabled={busy || !phone} className="btn-ghost justify-center px-5 py-3 text-sm disabled:opacity-50">
                Kirim kode
              </button>
            ) : (
              <>
                <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Kode 6 digit" inputMode="numeric" className="field" />
                <button onClick={verifyOtp} disabled={busy || !code} className="btn-primary justify-center px-5 py-3 text-sm disabled:opacity-50">
                  Verifikasi & masuk
                </button>
              </>
            )}
          </div>
        </div>
        {msg && <p role="status" className="mt-4 rounded-[14px] border border-line bg-white px-4 py-3 text-sm text-soft">{msg}</p>}
      </div>
    </div>
  );
}
