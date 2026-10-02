"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { TRACKS, TRACK_ORDER } from "@/lib/tracks";
import type { TrackId } from "@/lib/tracks";

/*
 * Shared track state — one picker, every section follows.
 * localStorage-persisted ("sb-track"), SSR-safe (read on mount only).
 * Same-page CTAs use TrackCta so a click both selects the track
 * and scrolls to the section; signup links stay plain anchors.
 */

const KEY = "sb-track";

const Ctx = createContext<{ track: TrackId; setTrack: (t: TrackId) => void }>({
  track: "event",
  setTrack: () => {},
});

export function TrackProvider({ children }: { children: ReactNode }) {
  const [track, setTrackState] = useState<TrackId>("event");

  useEffect(() => {
    try {
      const v = window.localStorage.getItem(KEY);
      if (v === "event" || v === "marketing" || v === "data" || v === "desain") {
        setTrackState(v);
      }
    } catch {
      /* storage unavailable — stay on default */
    }
  }, []);

  const setTrack = (t: TrackId) => {
    setTrackState(t);
    try {
      window.localStorage.setItem(KEY, t);
    } catch {
      /* storage unavailable — state still updates */
    }
  };

  return <Ctx.Provider value={{ track, setTrack }}>{children}</Ctx.Provider>;
}

export function useTrack() {
  const c = useContext(Ctx);
  return { ...c, data: TRACKS[c.track] };
}

export function TrackTabs() {
  const { track, setTrack } = useTrack();
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="font-mono text-[11px] text-muted">Lihat untuk peran:</span>
      <div role="tablist" aria-label="Pilih peran" className="flex flex-wrap gap-1.5">
        {TRACK_ORDER.map((id) => {
          const active = id === track;
          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setTrack(id)}
              className={
                active
                  ? "rounded-full bg-ink px-3.5 py-1.5 font-mono text-[11px] font-bold text-white"
                  : "chip"
              }
            >
              {TRACKS[id].short}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function TrackCta({
  track,
  href,
  className,
  children,
}: {
  track: TrackId;
  href: string;
  className?: string;
  children: ReactNode;
}) {
  const { setTrack } = useTrack();
  return (
    <a href={href} className={className} onClick={() => setTrack(track)}>
      {children}
    </a>
  );
}
