"use client";

import { useEffect, useRef, type ReactNode, type MouseEvent } from "react";

/**
 * Magnetic — subtle pointer physics on CTAs (transform only, GPU-safe).
 * Disabled under prefers-reduced-motion. No useState per-frame.
 */
export function Magnetic({
  children,
  strength = 10,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const raf = useRef(0);

  function onMove(e: MouseEvent) {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
    const y = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    });
  }

  function onLeave() {
    const el = ref.current;
    if (!el) return;
    cancelAnimationFrame(raf.current);
    el.style.transition = "transform 0.5s cubic-bezier(0.32,0.72,0,1)";
    el.style.transform = "translate(0,0)";
    window.setTimeout(() => {
      if (ref.current) ref.current.style.transition = "";
    }, 500);
  }

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`inline-block will-change-transform ${className}`}
      style={{ transition: "transform 0.15s ease-out" }}
    >
      {children}
    </div>
  );
}

/**
 * StackDim — Awwwards-style sticky stack: cards behind shrink + dim
 * as the next card arrives. IntersectionObserver only (no scroll listeners),
 * transform/opacity only, reduced-motion collapses to static.
 */
export function StackDim({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cards = Array.from(root.querySelectorAll<HTMLElement>("[data-stack-card]"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = cards.findIndex((c) => c === entry.target);
          if (idx < 0) return;
          // Dim all cards above the one entering
          cards.forEach((c, i) => {
            const inner = c.querySelector<HTMLElement>("[data-stack-inner]");
            if (!inner) return;
            if (entry.isIntersecting && i < idx) {
              inner.style.transform = "scale(0.94)";
              inner.style.opacity = "0.55";
              inner.style.filter = "brightness(0.7)";
            } else if (i === idx || !entry.isIntersecting) {
              // recompute: a card is dimmed if any later card is visible
              const anyLaterVisible = cards.slice(i + 1).some((later) => {
                const r = later.getBoundingClientRect();
                return r.top < window.innerHeight * 0.7;
              });
              if (!anyLaterVisible) {
                inner.style.transform = "";
                inner.style.opacity = "";
                inner.style.filter = "";
              }
            }
          });
        });
      },
      { threshold: 0.4 }
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  return <div ref={ref}>{children}</div>;
}
