"use client";

import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

/*
 * PRD §9 instrumentation. Fires one validated MetricEvent per mount into the
 * public metrics.log procedure — no PII, just the event, the content ids, and
 * a random client-generated session key so anonymous visits group into
 * sessions without fingerprinting.
 */

const SID_KEY = "sb-sid";

export function getSessionKey(): string {
  if (typeof window === "undefined") return "ssr";
  try {
    let sid = window.localStorage.getItem(SID_KEY);
    if (!sid || sid.length < 8) {
      sid =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.floor(Math.random() * 1e9)}`;
      window.localStorage.setItem(SID_KEY, sid);
    }
    return sid;
  } catch {
    return "unavailable";
  }
}

// React StrictMode mounts effects twice in dev; the set keeps the double
// mount from double-counting a single visit.
const fired = new Set<string>();

export function LogVisit({
  event,
  roleId,
  scenarioId,
}: {
  event: "role_view" | "scenario_start";
  roleId?: string;
  scenarioId?: string;
}) {
  const trpc = useTRPC();
  const log = useMutation(trpc.metrics.log.mutationOptions());
  useEffect(() => {
    const key = `${event}:${roleId ?? ""}:${scenarioId ?? ""}:${window.location.pathname}`;
    if (fired.has(key)) return;
    fired.add(key);
    log.mutate({
      event,
      ...(roleId ? { roleId } : {}),
      ...(scenarioId ? { scenarioId } : {}),
      sessionKey: getSessionKey(),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
