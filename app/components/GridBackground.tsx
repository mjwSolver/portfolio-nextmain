"use client";

import { useEffect, useRef } from "react";

/**
 * Fixed page backdrop: soft blue and green light, plus a dot matrix that is
 * only visible in a circle around the pointer (hidden on touch screens).
 * Pointer moves write two CSS variables (no React re-renders).
 */
export default function GridBackground() {
  const spotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = spotRef.current;
    if (!el) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduced.matches) return;

    let frame = 0;
    let x = 0;
    let y = 0;
    const apply = () => {
      el.style.setProperty("--x", `${x}px`);
      el.style.setProperty("--y", `${y}px`);
      frame = 0;
    };
    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      el.style.opacity = "1";
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const onLeave = () => {
      el.style.opacity = "0";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: [
            "radial-gradient(46rem 30rem at 10% -8%, rgba(14,165,233,0.13), transparent 70%)",
            "radial-gradient(40rem 28rem at 95% 4%, rgba(16,185,129,0.10), transparent 70%)",
          ].join(","),
        }}
      />
      <div
        ref={spotRef}
        className="bg-dot-matrix absolute inset-0 opacity-0 transition-opacity duration-500"
        style={
          {
            "--dot-color": "rgba(71,105,140,0.5)",
            maskImage: "radial-gradient(240px circle at var(--x, -999px) var(--y, -999px), black 20%, transparent 72%)",
            WebkitMaskImage:
              "radial-gradient(240px circle at var(--x, -999px) var(--y, -999px), black 20%, transparent 72%)",
          } as React.CSSProperties
        }
      />
    </div>
  );
}
