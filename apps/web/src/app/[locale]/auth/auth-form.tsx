"use client";

import { useId, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { authClient } from "@/lib/auth-client";
import { LOCAL } from "@/lib/visual";

/* Cerah v2 — split auth: brand panel + form card. */

export function AuthForm({ mode }: { mode: "in" | "up" }) {
  const t = useTranslations("auth");
  const router = useRouter();
  const uid = useId();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [okMsg, setOkMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  // Hand-building the locale prefix (``/${locale === "id" ? "" : locale}/…``)
  // is what produced the earlier /id/… and /undefined/… breakage. Let
  // next-intl derive it from the active locale, and route on the client so
  // server components re-read the session cookie instead of being served a
  // cached shell.
  function goToDashboard() {
    router.replace("/dashboard");
    router.refresh();
  }

  async function emailSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setOkMsg(null);
    setErr(null);
    try {
      if (mode === "up") {
        const res = await authClient.signUp.email({ email, password, name });
        if (res.error) throw new Error(res.error.message ?? t("failGeneric"));
        setOkMsg(t("okSignup"));
      } else {
        const res = await authClient.signIn.email({ email, password });
        if (res.error) throw new Error(res.error.message ?? t("failGeneric"));
        setOkMsg(t("okSignin"));
      }
      goToDashboard();
    } catch (e) {
      setErr(e instanceof Error ? e.message : t("failGeneric"));
    } finally {
      setBusy(false);
    }
  }

  async function sendOtp() {
    setBusy(true);
    setOkMsg(null);
    setErr(null);
    try {
      const res = await authClient.phoneNumber.sendOtp({ phoneNumber: phone });
      if (res?.error) throw new Error(res.error.message ?? t("failGeneric"));
      setOtpSent(true);
      setOkMsg(t("otpSent"));
    } catch (e) {
      setErr(e instanceof Error ? e.message : t("failGeneric"));
    } finally {
      setBusy(false);
    }
  }

  async function verifyOtp() {
    setBusy(true);
    setOkMsg(null);
    setErr(null);
    try {
      const res = await authClient.phoneNumber.verify({ phoneNumber: phone, code });
      if (res?.error) throw new Error(res.error.message ?? t("failOtp"));
      goToDashboard();
    } catch (e) {
      setErr(e instanceof Error ? e.message : t("failGeneric"));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="grid min-h-[100dvh] bg-paper text-ink md:grid-cols-2">
      {/* brand panel */}
      <div className="hero-light relative hidden overflow-hidden border-r border-line md:block">
        <div className="relative flex h-full flex-col justify-between p-10">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-700 font-mono text-[13px] font-bold text-white">SB</span>
            <span className="text-[15px] font-extrabold tracking-tight">Career <span className="text-brand-700">SuperBright</span></span>
          </Link>
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
        <Link href="/" className="link-more">{t("back")}</Link>
        <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.2em] text-brand-700">
          {mode === "up" ? t("modeUp") : t("modeIn")}
        </p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight md:text-4xl">
          {mode === "up" ? t("titleUp") : t("titleIn")}
        </h1>

        {/* One live region for failure, one for success. Both announce, and
            they never share a style, so "signed in" can't read as an error. */}
        <p role="alert" aria-live="assertive" className="empty:hidden">
          {err && (
            <span className="mt-4 block rounded-btn border border-danger/30 bg-danger-bg px-4 py-3 text-sm font-semibold text-danger">
              {err}
            </span>
          )}
        </p>

        <form onSubmit={emailSubmit} className="panel mt-6 grid gap-4 p-5 md:p-6" noValidate>
          {mode === "up" && (
            <p className="grid gap-2 text-sm">
              <label htmlFor={`${uid}-name`} className="font-semibold">{t("lblName")}</label>
              <input id={`${uid}-name`} name="name" required value={name}
                onChange={(e) => setName(e.target.value)} placeholder={t("phName")}
                className="field" autoComplete="name" />
            </p>
          )}
          <p className="grid gap-2 text-sm">
            <label htmlFor={`${uid}-email`} className="font-semibold">{t("lblEmail")}</label>
            <input id={`${uid}-email`} name="email" type="email" required value={email}
              onChange={(e) => setEmail(e.target.value)} placeholder={t("phEmail")}
              className="field" autoComplete="email" />
          </p>
          <p className="grid gap-2 text-sm">
            <label htmlFor={`${uid}-password`} className="font-semibold">
              {t("lblPass")}
              <span className="ml-1.5 font-mono text-[11px] font-normal text-muted">{t("passHint")}</span>
            </label>
            <input id={`${uid}-password`} name="password" type="password" required minLength={8}
              value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder={t("phPass")} className="field"
              autoComplete={mode === "up" ? "new-password" : "current-password"} />
          </p>
          <button disabled={busy} className="btn-primary mt-1 min-h-[48px] justify-center px-5 text-sm disabled:opacity-50">
            {mode === "up" ? t("ctaUp") : t("ctaIn")}
          </button>
          <p className="text-center font-mono text-[11px] text-faint">
            {mode === "up" ? t("hasAccount") : t("noAccount")}{" "}
            <Link href={mode === "up" ? "/auth/masuk" : "/auth/daftar"} className="font-bold text-brand-700 underline underline-offset-4">
              {mode === "up" ? t("ctaIn") : t("ctaUp")}
            </Link>
          </p>
        </form>

        <div className="panel-warm mt-4 p-5 md:p-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">{t("otpTitle")}</p>
          <div className="mt-3 grid gap-4">
            <p className="grid gap-2 text-sm">
              <label htmlFor={`${uid}-phone`} className="font-semibold">{t("lblPhone")}</label>
              <input id={`${uid}-phone`} name="phone" type="tel" value={phone}
                onChange={(e) => setPhone(e.target.value)} placeholder="+62…" className="field" autoComplete="tel" />
            </p>
            {!otpSent ? (
              <button onClick={sendOtp} disabled={busy || !phone}
                className="btn-ghost min-h-[48px] justify-center px-5 text-sm disabled:opacity-50">
                {t("otpSend")}
              </button>
            ) : (
              <>
                <p className="grid gap-2 text-sm">
                  <label htmlFor={`${uid}-code`} className="font-semibold">{t("lblCode")}</label>
                  <input id={`${uid}-code`} name="code" value={code}
                    onChange={(e) => setCode(e.target.value)} placeholder={t("phCode")}
                    inputMode="numeric" className="field" />
                </p>
                <button onClick={verifyOtp} disabled={busy || !code}
                  className="btn-primary min-h-[48px] justify-center px-5 text-sm disabled:opacity-50">
                  {t("otpVerify")}
                </button>
              </>
            )}
          </div>
        </div>

        <p role="status" aria-live="polite" className="empty:hidden">
          {okMsg && (
            <span className="mt-4 block rounded-btn border border-ok/30 bg-ok-bg px-4 py-3 text-sm font-semibold text-ok">
              {okMsg}
            </span>
          )}
        </p>
      </div>
    </div>
  );
}
