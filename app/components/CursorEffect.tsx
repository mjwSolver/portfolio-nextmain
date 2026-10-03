"use client";

import { useEffect, useRef } from "react";

/**
 * Soft spotlight that trails the pointer behind the content.
 *
 * Previous version called setState on every mousemove AND every animation
 * frame (≈60 React re-renders/s, forever) and painted a 600px blurred,
 * blend-mode layer above the whole page. This version:
 *  - never re-renders (refs + direct transform writes)
 *  - only runs rAF while the glow is catching up, then sleeps
 *  - sits behind content and is skipped on touch / reduced-motion devices
 */
export default function CursorEffect() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reduced.matches) return;

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 3 };
    const current = { ...target };
    let frame = 0;

    const tick = () => {
      current.x += (target.x - current.x) * 0.12;
      current.y += (target.y - current.y) * 0.12;
      el.style.transform = `translate3d(${current.x - 300}px, ${current.y - 300}px, 0)`;

      if (Math.abs(target.x - current.x) > 0.5 || Math.abs(target.y - current.y) > 0.5) {
        frame = requestAnimationFrame(tick);
      } else {
        frame = 0;
      }
    };

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      el.style.opacity = "1";
      if (!frame) frame = requestAnimationFrame(tick);
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
    <div
      ref={glowRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 -z-10 h-[600px] w-[600px] rounded-full opacity-0 transition-opacity duration-700 will-change-transform"
      style={{
        background: "radial-gradient(circle, rgba(14,165,233,0.13) 0%, rgba(14,165,233,0.05) 35%, transparent 65%)",
      }}
    />
  );
}
