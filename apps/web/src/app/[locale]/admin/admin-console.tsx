"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

/*
 * Admin console — the operations that used to require raw SQL.
 *
 * Two ledgers (accounts, catalog) and one composer (skills), deliberately not
 * a 3-up card grid. Every mutation invalidates its own list so the ledger
 * reflects the change without a reload.
 */

type Stats = {
  users: number;
  staff: number;
  sessions: number;
  courses: number;
  published: number;
};

const ROLES = [
  "STUDENT",
  "INSTRUCTOR",
  "ADMIN",
  "LSP_ASSESSOR",
  "EMPLOYER",
  "UNIVERSITY",
] as const;

const STATUSES = ["DRAFT", "PUBLISHED", "ARCHIVED"] as const;

function useFlash() {
  const [msg, setMsg] = useState<{ kind: "ok" | "err"; text: string } | null>(null);
  return {
    msg,
    node: msg ? (
      <p
        role={msg.kind === "err" ? "alert" : "status"}
        className={`mt-3 rounded-btn border px-4 py-3 text-sm font-semibold ${
          msg.kind === "err"
            ? "border-danger/30 bg-danger-bg text-danger"
            : "border-ok/25 bg-ok-bg text-ok"
        }`}
      >
        {msg.text}
      </p>
    ) : null,
    ok: (text: string) => setMsg({ kind: "ok", text }),
    err: (text: string) => setMsg({ kind: "err", text }),
  };
}

export function AdminConsole() {
  const t = useTranslations("admin");
  const trpc = useTRPC();
  const qc = useQueryClient();
  const flash = useFlash();

  const users = useQuery(trpc.admin.users.queryOptions());
  const stats = useQuery(trpc.admin.stats.queryOptions());
  const courses = useQuery(trpc.admin.courses.queryOptions());

  const invalidate = (...keys: unknown[]) =>
    keys.forEach((k) => qc.invalidateQueries({ queryKey: k as string[] }));

  const setRole = useMutation(
    trpc.admin.setRole.mutationOptions({
      onSuccess: (u) => {
        invalidate(trpc.admin.users.queryKey(), trpc.admin.stats.queryKey());
        flash.ok(t("roleSaved", { email: u.email, role: u.role }));
      },
      onError: () => flash.err(t("errRole")),
    })
  );

  const setCourseStatus = useMutation(
    trpc.admin.setCourseStatus.mutationOptions({
      onSuccess: (c) => {
        invalidate(trpc.admin.courses.queryKey(), trpc.admin.stats.queryKey());
        flash.ok(t("statusSaved", { slug: c.slug, status: c.status }));
      },
      onError: () => flash.err(t("errRole")),
    })
  );

  const [slug, setSlug] = useState("");
  const [titleId, setTitleId] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const createCourse = useMutation(
    trpc.admin.createCourse.mutationOptions({
      onSuccess: (c) => {
        setSlug(""); setTitleId(""); setTitleEn("");
        invalidate(trpc.admin.courses.queryKey(), trpc.admin.stats.queryKey());
        flash.ok(t("courseCreated", { slug: c.slug }));
      },
      onError: (e) => flash.err(`${t("errRole")} ${e.message}`),
    })
  );

  const s = stats.data as Stats | undefined;
  /* Inventory KPIs only — every number is a live COUNT(*) from the database.
     The PRD §9 product metrics (activation rate, scenario completion, AI
     latency, portfolio export) are not instrumented yet, so this surface
     refuses to display them rather than inventing percentages. */
  const kpis: [string, string | number, string][] = s
    ? [
        [t("kUsers"), s.users, t("kUsersSub")],
        [t("kStaff"), s.staff, t("kStaffSub")],
        [t("kCourses"), s.courses, t("kCoursesSub", { n: s.published })],
        [t("kSessions"), s.sessions, t("kSessionsSub")],
      ]
    : [];

  return (
    <div className="space-y-10">
      {/* ── Numbers: a 7/5 bento, not four equal tiles ─────────────── */}
      <section aria-label={t("kpiLabel")}>
        <div className="grid gap-x-8 gap-y-8 md:grid-cols-12">
          {kpis.length === 0
            ? Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  aria-hidden
                  className={`h-[92px] animate-pulse rounded-card bg-cream ${i === 0 ? "md:col-span-7" : "md:col-span-5"}`}
                />
              ))
            : kpis.map(([label, value, sub], i) => (
                <div
                  key={label}
                  className={`border-t pt-5 ${
                    i === 0
                      ? "border-t-2 border-brand-700 md:col-span-7"
                      : "border-line md:col-span-5"
                  }`}
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">{label}</p>
                  <p
                    className={`tnum mt-2 font-nova font-bold tracking-[-0.03em] text-ink ${
                      i === 0 ? "text-[clamp(2.5rem,6vw,4rem)] leading-none" : "text-[clamp(1.6rem,3vw,2.25rem)] leading-none"
                    }`}
                  >
                    {value}
                  </p>
                  <p className="mt-2 max-w-[34ch] text-[13px] leading-snug text-muted">{sub}</p>
                </div>
              ))}
        </div>
      </section>

      {/* ── Accounts: promote / demote ─────────────────────────────── */}
      <section aria-labelledby="admin-users">
        <div className="flex flex-wrap items-baseline justify-between gap-3 border-t border-line pt-6">
          <h2 id="admin-users" className="font-nova text-2xl font-bold tracking-[-0.02em] md:text-3xl">
            {t("usersTitle")}
          </h2>
          <p className="max-w-[46ch] text-[13px] leading-relaxed text-muted">{t("usersSub")}</p>
        </div>

        {users.isLoading ? (
          <ul className="mt-5 space-y-2" aria-hidden>
            {Array.from({ length: 4 }).map((_, i) => (
              <li key={i} className="h-16 animate-pulse rounded-card bg-cream" />
            ))}
          </ul>
        ) : users.data && users.data.length > 0 ? (
          <ul className="mt-5 border-b border-line">
            {users.data.map((u) => (
              <li
                key={u.id}
                className="grid gap-x-8 gap-y-3 border-t border-line py-4 transition-colors duration-300 hover:bg-brand-50/60 md:grid-cols-12 md:items-center md:px-2"
              >
                <div className="md:col-span-5">
                  <p className="truncate font-bold">{u.name ?? "—"}</p>
                  <p className="tnum truncate font-mono text-[12px] text-muted">{u.email}</p>
                </div>
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint md:col-span-3">
                  {new Date(u.createdAt).toISOString().slice(0, 10)}
                </p>
                <div className="md:col-span-4 md:text-right">
                  <label className="sr-only" htmlFor={`role-${u.id}`}>
                    {t("roleFor", { email: u.email })}
                  </label>
                  <select
                    id={`role-${u.id}`}
                    className="field min-h-[44px] w-auto md:ml-auto"
                    value={u.role}
                    disabled={setRole.isPending}
                    onChange={(e) =>
                      setRole.mutate({
                        userId: u.id,
                        role: e.target.value as (typeof ROLES)[number],
                      })
                    }
                  >
                    {ROLES.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-5 text-sm text-soft">{t("noUsers")}</p>
        )}
      </section>

      {/* ── Catalog ───────────────────────────────────────────────── */}
      <section aria-labelledby="admin-courses">
        <div className="flex flex-wrap items-baseline justify-between gap-3 border-t border-line pt-6">
          <h2 id="admin-courses" className="font-nova text-2xl font-bold tracking-[-0.02em] md:text-3xl">
            {t("coursesTitle")}
          </h2>
          <p className="max-w-[46ch] text-[13px] leading-relaxed text-muted">{t("coursesSub")}</p>
        </div>

        <form
          className="panel mt-5 p-5 md:p-6"
          onSubmit={(e) => {
            e.preventDefault();
            createCourse.mutate({
              slug,
              titleId,
              ...(titleEn ? { titleEn } : {}),
            });
          }}
        >
          <div className="grid gap-4 md:grid-cols-12">
            <label className="grid gap-2 text-sm md:col-span-3">
              {t("slugLabel")}
              <input
                name="slug" required value={slug} onChange={(e) => setSlug(e.target.value)}
                placeholder="contoh: akuntansi-dasar" className="field"
              />
            </label>
            <label className="grid gap-2 text-sm md:col-span-4">
              {t("titleIdLabel")}
              <input
                name="titleId" required value={titleId} onChange={(e) => setTitleId(e.target.value)}
                placeholder="contoh: Akuntansi Dasar" className="field"
              />
            </label>
            <label className="grid gap-2 text-sm md:col-span-3">
              {t("titleEnLabel")}
              <input
                name="titleEn" value={titleEn} onChange={(e) => setTitleEn(e.target.value)}
                placeholder={t("titleEnPh")} className="field"
              />
            </label>
            <div className="flex items-end md:col-span-2">
              <button
                type="submit" disabled={createCourse.isPending}
                className="btn-primary min-h-[44px] w-full justify-center text-sm disabled:opacity-50"
              >
                {createCourse.isPending ? t("saving") : t("createCourse")}
              </button>
            </div>
          </div>
        </form>

        {courses.data && courses.data.length > 0 ? (
          <ul className="mt-5 border-b border-line">
            {courses.data.map((c) => (
              <li
                key={c.id}
                className="grid gap-x-8 gap-y-3 border-t border-line py-4 transition-colors duration-300 hover:bg-brand-50/60 md:grid-cols-12 md:items-center md:px-2"
              >
                <p className="font-mono text-[12px] text-muted md:col-span-3">/{c.slug}</p>
                <p className="font-bold md:col-span-5">{c.titleId}</p>
                <div className="md:col-span-4 md:text-right">
                  <label className="sr-only" htmlFor={`st-${c.id}`}>
                    {t("statusFor", { slug: c.slug })}
                  </label>
                  <select
                    id={`st-${c.id}`}
                    className="field min-h-[44px] w-auto md:ml-auto"
                    value={c.status}
                    disabled={setCourseStatus.isPending}
                    onChange={(e) =>
                      setCourseStatus.mutate({
                        id: c.id,
                        status: e.target.value as (typeof STATUSES)[number],
                      })
                    }
                  >
                    {STATUSES.map((x) => (
                      <option key={x} value={x}>
                        {x}
                      </option>
                    ))}
                  </select>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-5 text-sm text-soft">{t("noCourses")}</p>
        )}
      </section>

      {flash.node}
    </div>
  );
}