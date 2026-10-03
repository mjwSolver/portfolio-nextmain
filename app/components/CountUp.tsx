"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

/** Counts from 0 to `value` once, the first time it scrolls into view. */
export default function CountUp({ value, decimals = 0 }: { value: number; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView || reduced) return;
    const controls = animate(0, value, {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        el.textContent = v.toFixed(decimals);
      },
    });
    return () => controls.stop();
  }, [inView, reduced, value, decimals]);

  // Server render shows the final value, so no-JS and reduced-motion users see it as-is.
  return (
    <span ref={ref} className="tabular-nums">
      {value.toFixed(decimals)}
    </span>
  );
}
