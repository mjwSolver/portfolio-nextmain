"use client";

import { MotionConfig } from "motion/react";

/** Global motion defaults: honor the OS "reduce motion" setting everywhere. */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </MotionConfig>
  );
}
