"use client";

import { INTERVIEW_BEHAVIORAL, INTERVIEW_UMUM } from "@/lib/tracks";
import type { CapLevel } from "@/lib/tracks";
import { TrackCta, useTrack } from "./track-picker";

/*
 * Per-track section bodies. Labels follow the duck copy pattern:
 * "Contoh — {Short}: ..." so non-Event tracks never masquerade
 * as the full thread. Styling mirrors the previous static blocks.
 */

function levelClass(level: CapLevel) {
  return level === "Perlu latihan"
    ? "bg-signal/15 text-signal-strong"
    : level === "Mulai"
      ? "bg-brand-50 text-brand-700"
      : "bg-ok-bg text-ok";
}

export function TrackBrief() {
  const { data } = useTrack();
  return (
    <div className="grid gap-0 md:grid-cols-2">
      <div className="border-b border-line p-6 md:border-b-0 md:border-r md:p-8">
        <p className="text-[13px] font-extrabold uppercase tracking-wide">
          5 keputusan yang kamu pegang
        </p>
        <ul className="mt-3 space-y-3">
          {data.briefQuestions.map((d, i) => (
            <li key={d} className="flex items-start gap-3">
              <span className="card-num">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-sm leading-relaxed text-soft">{d}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-6 md:p-8">
        <p className="text-[13px] font-extrabold uppercase tracking-wide">
          Orang dan alat yang kamu pakai
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {data.tools.map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
        </div>
        <p className="mt-5 rounded-btn bg-brand-50 px-4 py-3 text-[13px] leading-relaxed text-soft">
          <strong className="text-ink">Kenapa ini penting:</strong> ijazah tak
          menjelaskan kerja harian.
        </p>
      </div>
    </div>
  );
}

export function TrackSimHeader() {
  const { data } = useTrack();
  return (
    <>
      <p className="font-mono text-[11px] text-muted">{data.simDay}</p>
      <p className="tnum font-mono text-[11px] font-bold text-brand-700">
        {data.simSoon ? "Menyusul" : "██████████████░░ 87%"}
      </p>
    </>
  );
}

export function TrackSimMetrics() {
  const { data } = useTrack();
  return (
    <>
      {data.simMetrics.map(([k, v]) => (
        <div
          key={k}
          className="rounded-btn border border-line bg-paper px-3.5 py-3"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-faint">
            {k}
          </p>
          <p className="tnum mt-0.5 text-[13px] font-extrabold">{v}</p>
        </div>
      ))}
    </>
  );
}

export function TrackSimAlert() {
  const { data } = useTrack();
  return (
    <p className="mt-5 rounded-btn border border-signal/40 bg-signal/10 px-4 py-3 text-[13px] leading-relaxed text-soft">
      <strong className="text-ink">Alert:</strong> {data.simAlert}
    </p>
  );
}

export function TrackCaps() {
  const { data } = useTrack();
  return (
    <>
      <p className="mt-2 font-mono text-[11px] leading-relaxed text-muted">
        Contoh — {data.short}: {data.caps.length} hal yang kamu latih.
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {data.caps.map(([name, level, next]) => (
          <div
            key={name}
            className="h-full rounded-card border border-line bg-card p-5"
          >
            <div className="flex items-center justify-between gap-2">
              <p className="text-[14px] font-extrabold tracking-tight">{name}</p>
              <span
                className={`flex-none rounded-full px-2.5 py-1 font-mono text-[10px] font-bold ${levelClass(level)}`}
              >
                {level}
              </span>
            </div>
            <p className="mt-2 font-mono text-[11px] leading-relaxed text-muted">
              {next}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

export function TrackPortfolio() {
  const { data } = useTrack();
  return (
    <article className="panel h-full p-6 md:p-8">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
        Contoh portofolio · {data.short}: {data.portfolioRole}
      </p>
      <p className="mt-2 text-2xl font-extrabold tracking-tight">
        {data.portfolioProject}
      </p>
      <ul className="mt-5 space-y-0 rounded-2xl border border-line">
        {data.portfolioArtifacts.map(([a, c], i) => (
          <li
            key={a}
            className={`flex items-center justify-between gap-3 px-5 py-3.5 ${i > 0 ? "border-t border-line" : ""}`}
          >
            <span className="text-sm font-bold">{a}</span>
            <span className="flex-none font-mono text-[11px] text-muted">{c}</span>
          </li>
        ))}
      </ul>
      <div className="mt-5 flex flex-wrap gap-2">
        {data.portfolioTags.map((c) => (
          <span
            key={c}
            className="rounded-full bg-ink px-3 py-1.5 font-mono text-[11px] font-bold text-white"
          >
            {c}
          </span>
        ))}
      </div>
    </article>
  );
}

export function TrackInterviewGroups() {
  const { data } = useTrack();
  const groups: [string, string[]][] = [
    ["Umum", INTERVIEW_UMUM],
    [`Contoh — ${data.short}: teknis peran`, data.interviewTeknis],
    ["Sikap", INTERVIEW_BEHAVIORAL],
    ["Studi kasus", [data.interviewKasus]],
  ];
  return (
    <>
      {groups.map(([g, qs]) => (
        <div key={g} className="panel-warm p-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
            {g}
          </p>
          <ul className="mt-2 space-y-1.5">
            {qs.map((q) => (
              <li key={q} className="text-[14px] font-bold leading-snug">
                “{q}”
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}

export function TrackKasus() {
  const { data } = useTrack();
  return (
    <>
      <p className="font-mono text-[11px] text-soft">
        Contoh — {data.short}: latihan studi kasus · feedback AI
      </p>
      <p className="mt-2 text-xl font-extrabold tracking-tight">
        {data.interviewKasus}
      </p>
    </>
  );
}

export function TrackReadiness() {
  const { data } = useTrack();
  return (
    <div className="panel h-full p-6 md:p-8">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
        Contoh kesiapan peran · {data.short}
      </p>
      <p className="mt-1 text-xl font-extrabold tracking-tight">{data.name}</p>
      <div className="mt-5 space-y-4">
        {data.readiness.map(([k, v]) => (
          <div key={k}>
            <div className="flex justify-between text-[13px]">
              <span className="font-bold">{k}</span>
              <span className="tnum font-mono text-[11px] font-bold text-brand-700">
                {v}%
              </span>
            </div>
            <div className="bar-track mt-1.5">
              <div className="bar-fill" style={{ width: `${v}%` }} />
            </div>
          </div>
        ))}
      </div>
      <p className="mt-5 rounded-btn bg-brand-50 px-4 py-3 text-[13px] text-soft">
        <strong className="text-ink">Langkah berikutnya:</strong> {data.nextRec}
      </p>
      <p className="mt-3 font-mono text-[11px] leading-relaxed text-faint">
        Angka contoh — indikator belajar, bukan jaminan kerja.
      </p>
    </div>
  );
}

export function HeroBrief() {
  const { data } = useTrack();
  return (
    <div className="glass-light overflow-hidden">
      <div className="flex items-center gap-2 border-b border-line px-5 py-3.5">
        <span className="live-dot" aria-hidden />
        <span className="font-mono text-[11px] text-muted">
          Contoh brief — {data.short}
        </span>
        <span className="ml-auto flex-none rounded-md bg-brand-50 px-2 py-0.5 font-mono text-[11px] font-bold text-brand-700">
          {data.badge}
        </span>
      </div>
      <div className="px-5 py-4">
        <p className="text-[15px] font-extrabold tracking-tight">{data.name}</p>
        <p className="mt-0.5 font-mono text-[11px] text-muted">
          {data.family} · {data.level}
        </p>
        <ul
          className="mt-3 flex flex-wrap gap-1.5"
          aria-label={`Kapabilitas inti ${data.short}`}
        >
          {data.caps.slice(0, 3).map(([n]) => (
            <li key={n} className="chip !text-[12px]">
              {n}
            </li>
          ))}
        </ul>
        <div className="mt-3 rounded-btn border border-signal/40 bg-signal/10 px-4 py-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-faint">
            Situasi contoh
          </p>
          <p className="mt-1 text-[13px] font-bold leading-snug">
            {data.scenarioTitle}
          </p>
        </div>
        <TrackCta
          track={data.id}
          href="#brief"
          className="link-more mt-3 inline-block"
        >
          Lihat contoh lengkap →
        </TrackCta>
      </div>
      <div className="border-t border-line bg-paper px-5 py-3">
        <p className="font-mono text-[11px] leading-relaxed text-muted">
          {data.mission}
        </p>
      </div>
    </div>
  );
}
