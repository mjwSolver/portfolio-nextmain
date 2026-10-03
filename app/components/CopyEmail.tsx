"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Copy } from "lucide-react";

const PARTICLES = 12;
const COLORS = ["#0ea5e9", "#10b981", "#38bdf8", "#34d399"];

export default function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const [burst, setBurst] = useState(0);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(t);
  }, [copied]);

  const copy = () =>
    navigator.clipboard?.writeText(email).then(
      () => {
        setCopied(true);
        setBurst((b) => b + 1);
      },
      () => {},
    );

  return (
    <motion.button
      type="button"
      onClick={copy}
      whileTap={{ scale: 0.94 }}
      className="relative inline-flex h-12 items-center gap-2 rounded-full bg-white/80 px-5 font-medium shadow-[0_1px_2px_rgba(15,42,68,0.06)] transition-colors duration-300 hover:bg-white"
    >
      {copied ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
      <span aria-live="polite">{copied ? "Copied" : "Copy email"}</span>

      {/* small celebration burst */}
      <AnimatePresence>
        {burst > 0 && copied && (
          <span key={burst} aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2">
            {Array.from({ length: PARTICLES }, (_, i) => {
              const angle = (i / PARTICLES) * Math.PI * 2;
              const dist = 34 + (i % 3) * 10;
              return (
                <motion.span
                  key={i}
                  className="absolute -ml-1 -mt-1 h-2 w-2 rounded-full"
                  style={{ backgroundColor: COLORS[i % COLORS.length] }}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{ x: Math.cos(angle) * dist, y: Math.sin(angle) * dist, opacity: 0, scale: 0.4 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                />
              );
            })}
          </span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
