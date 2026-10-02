"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { authClient } from "@/lib/auth-client";
import { LOCAL } from "@/lib/visual";

/* Cerah v2 — split auth: brand panel + form card. */

export function AuthForm({ mode }: { mode: "in" | "up" }) {
  const t = useTranslations("auth");
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
        if (res.error) throw new Error(res.error.message ?? t("failGeneric"));
        setMsg(t("okSignup"));
      } else {
        const res = await authClient.signIn.email({ email, password });
        if (res.error) throw new Error(res.error.message ?? t("failGeneric"));
        setMsg(t("okSignin"));
      }
      window.location.href = "/id/dashboard";
    } catch (err) {
      setMsg(err instanceof Error ? err.message : t("failGeneric"));
    } finally {
      setBusy(false);
    }
  }

  async function sendOtp() {
    setBusy(true);
    setMsg(null);
    try {
      const res = await authClient.phoneNumber.sendOtp({ phoneNumber: phone });
      if (res?.error) throw new Error(res.error.message ?? t("failGeneric"));
      setOtpSent(true);
      setMsg(t("otpSent"));
    } catch (err) {
      setMsg(err instanceof Error ? err.message : t("failGeneric"));
    } finally {
      setBusy(false);
    }
  }

  async function verifyOtp() {
    setBusy(true);
    setMsg(null);
    try {
      const res = await authClient.phoneNumber.verify({ phoneNumber: phone, code });
      if (res?.error) throw new Error(res.error.message ?? t("failOtp"));
      window.location.href = "/id/dashboard";
    } catch (err) {
      setMsg(err instanceof Error ? err.message : t("failGeneric"));
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
            <span className="text-[15px] font-extrabold tracking-tight">Career <span className="text-brand-700">SuperBright</span></span>
          </a>
          <div>
            <p className="eyebrow-light">{t("panelEyebrow")}</p>
            <p className="mt-3 max-w-[20ch] text-4xl font-extrabold leading-[1.05] tracking-tight">
              {t("panelTitle")}
            </p>
            <figure className="photo-cine mt-6 aspect-[16/10]">
              <img
                src={LOCAL.timKopi}
                alt={t("photoAlt")}
                loading="lazy"
                decoding="async"
                sizes="(max-width: 1024px) 100vw, 560px"
                className="h-full w-full object-cover"
              />
              <figcaption className="photo-cap">
                <span>{t("photoCap")}</span>
                <span className="opacity-70">Pexels</span>
              </figcaption>
            </figure>
            <div className="mt-6 grid grid-cols-3 gap-4 border-t border-line pt-6">
              {[[t("stat1v"), t("stat1l")], [t("stat2v"), t("stat2l")], [t("stat3v"), t("stat3l")]].map(([v, l]) => (
                <div key={l}>
                  <p className="tnum font-mono text-xl font-bold text-brand-700">{v}</p>
                  <p className="mt-0.5 font-mono text-[11px] text-muted">{l}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="font-mono text-[11px] text-faint">{t("panelFoot")}</p>
        </div>
      </div>

      {/* form */}
      <div className="mx-auto flex w-full max-w-md flex-col justify-center px-5 py-12">
        <a href="/" className="link-more">{t("back")}</a>
        <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.2em] text-brand-700">
          {mode === "up" ? t("modeUp") : t("modeIn")}
        </p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight md:text-4xl">
          {mode === "up" ? t("titleUp") : t("titleIn")}
        </h1>
        <form onSubmit={emailSubmit} className="panel mt-6 grid gap-3 p-5 md:p-6">
          {mode === "up" && (
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder={t("phName")} className="field" autoComplete="name" />
          )}
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t("phEmail")} type="email" className="field" autoComplete="email" />
          <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder={t("phPass")} type="password" minLength={8} className="field" autoComplete={mode === "up" ? "new-password" : "current-password"} />
          <button disabled={busy} className="btn-primary justify-center px-5 py-3 text-sm disabled:opacity-50">
            {mode === "up" ? t("ctaUp") : t("ctaIn")}
          </button>
          <p className="text-center font-mono text-[11px] text-faint">
            {mode === "up" ? t("hasAccount") : t("noAccount")}{" "}
            <a href={mode === "up" ? "/id/auth/masuk" : "/id/auth/daftar"} className="font-bold text-brand-700 underline underline-offset-4">
              {mode === "up" ? t("ctaIn") : t("ctaUp")}
            </a>
          </p>
        </form>

        <div className="panel-warm mt-4 p-5 md:p-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">{t("otpTitle")}</p>
          <div className="mt-3 grid gap-3">
            <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+62…" className="field" autoComplete="tel" />
            {!otpSent ? (
              <button onClick={sendOtp} disabled={busy || !phone} className="btn-ghost justify-center px-5 py-3 text-sm disabled:opacity-50">
                {t("otpSend")}
              </button>
            ) : (
              <>
                <input value={code} onChange={(e) => setCode(e.target.value)} placeholder={t("phCode")} inputMode="numeric" className="field" />
                <button onClick={verifyOtp} disabled={busy || !code} className="btn-primary justify-center px-5 py-3 text-sm disabled:opacity-50">
                  {t("otpVerify")}
                </button>
              </>
            )}
          </div>
        </div>
        {msg && <p role="status" className="mt-4 rounded-btn border border-line bg-card px-4 py-3 text-sm text-soft">{msg}</p>}
      </div>
    </div>
  );
}
