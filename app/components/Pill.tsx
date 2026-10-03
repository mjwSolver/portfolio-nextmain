"use client";

import { motion } from "motion/react";

/** A tool name you can poke: it lifts on hover and squishes on press. */
export default function Pill({ children }: { children: React.ReactNode }) {
  return (
    <motion.li
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.88, rotate: -4 }}
      transition={{ type: "spring", stiffness: 500, damping: 15 }}
      className="cursor-default select-none rounded-full bg-white/80 px-3 py-1 text-sm shadow-[0_1px_2px_rgba(15,42,68,0.06)]"
    >
      {children}
    </motion.li>
  );
}
