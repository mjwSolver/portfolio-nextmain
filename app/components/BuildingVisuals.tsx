"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Hand, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Drag-the-bars dashboard                                             */
/* ------------------------------------------------------------------ */

const LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
const START = [42, 58, 50, 72, 64, 84];
const clamp = (v: number) => Math.max(6, Math.min(100, v));

/** A small revenue chart whose bars can be dragged; the total and average follow. */
export function DragBars() {
  const [values, setValues] = useState(START);
  const [dragging, setDragging] = useState<number | null>(null);
  const [touched, setTouched] = useState(false);
  const areaRef = useRef<HTMLDivElement>(null);

  const avg = values.reduce((a, b) => a + b, 0) / values.length;
  const total = values.reduce((a, b) => a + b, 0) * 12;

  const setAt = (i: number, v: number) => {
    setTouched(true);
    setValues((vs) => vs.map((x, j) => (j === i ? clamp(Math.round(v)) : x)));
  };

  const fromPointer = (i: number, clientY: number) => {
    const r = areaRef.current?.getBoundingClientRect();
    if (!r) return;
    setAt(i, ((r.bottom - clientY) / r.height) * 100);
  };

  return (
    <div className="flex h-64 flex-col p-5">
      <div className="flex items-baseline justify-between">
        <p className="text-sm text-muted">
          Revenue, first half
          <span className="ml-2 font-mono text-base font-medium tabular-nums text-ink">${total.toLocaleString()}k</span>
        </p>
        <button
          type="button"
          onClick={() => setValues(START)}
          className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs text-muted transition-colors hover:bg-canvas hover:text-ink"
        >
          <RotateCcw size={12} aria-hidden="true" /> Reset
        </button>
      </div>

      <div ref={areaRef} className="relative mt-5 flex flex-1 items-end gap-2.5">
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 z-10 border-t-2 border-dashed border-emerald-500/70"
          animate={{ bottom: `${avg}%` }}
          transition={{ type: "spring", stiffness: 260, damping: 26 }}
        >
          <span className="absolute -top-5 right-0 rounded-full bg-emerald-50 px-1.5 font-mono text-[10px] text-emerald-700">
            avg {Math.round(avg * 12)}k
          </span>
        </motion.div>

        {values.map((v, i) => (
          <div key={LABELS[i]} className="flex h-full flex-1 flex-col justify-end">
            <motion.div
              role="slider"
              tabIndex={0}
              aria-label={`${LABELS[i]} revenue`}
              aria-valuemin={6}
              aria-valuemax={100}
              aria-valuenow={v}
              onPointerDown={(e) => {
                e.currentTarget.setPointerCapture(e.pointerId);
                setDragging(i);
                fromPointer(i, e.clientY);
              }}
              onPointerMove={(e) => dragging === i && fromPointer(i, e.clientY)}
              onPointerUp={() => setDragging(null)}
              onKeyDown={(e) => {
                if (e.key === "ArrowUp" || e.key === "ArrowRight") setAt(i, v + 5);
                if (e.key === "ArrowDown" || e.key === "ArrowLeft") setAt(i, v - 5);
              }}
              animate={{ height: `${v}%`, scaleX: dragging === i ? 1.08 : 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 32 }}
              className={cn(
                "relative w-full cursor-ns-resize touch-none rounded-xl bg-gradient-to-t from-primary to-emerald-400 transition-shadow",
                dragging === i && "shadow-[0_10px_25px_-8px_rgba(14,165,233,0.7)]",
              )}
            >
              <span className="absolute inset-x-2 top-1.5 h-1 rounded-full bg-white/60" aria-hidden="true" />
            </motion.div>
            <span className="mt-2 text-center font-mono text-[10px] text-muted">{LABELS[i]}</span>
          </div>
        ))}

        <AnimatePresence>
          {!touched && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, y: [0, -6, 0] }}
              exit={{ opacity: 0 }}
              transition={{ y: { repeat: Infinity, duration: 1.6, ease: "easeInOut" } }}
              aria-hidden="true"
              className="pointer-events-none absolute left-[55%] top-2 z-20 inline-flex items-center gap-1.5 rounded-full bg-ink px-2.5 py-1 text-[11px] font-medium text-white shadow-lg"
            >
              <Hand size={12} /> Drag a bar
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* MCP playground                                                      */
/* ------------------------------------------------------------------ */

const TOOLS = [
  { name: "query_db", result: "248 rows" },
  { name: "summarize", result: "3 key points" },
  { name: "make_chart", result: "chart.png" },
] as const;

type Packet = { id: number; tool: (typeof TOOLS)[number] };
type LogLine = { id: number; dir: "→" | "←"; text: string };

/** Click a tool: a request travels from the agent to the MCP server and back. */
export function McpPlayground() {
  const reduced = useReducedMotion();
  const [packets, setPackets] = useState<Packet[]>([]);
  const [log, setLog] = useState<LogLine[]>([{ id: 0, dir: "←", text: "server ready, 3 tools" }]);
  const [hits, setHits] = useState(0);
  const nextId = useRef(1);

  const push = (dir: LogLine["dir"], text: string) =>
    setLog((l) => [...l, { id: nextId.current++, dir, text }].slice(-3));

  const call = (tool: (typeof TOOLS)[number]) => {
    push("→", `tools/call ${tool.name}`);
    if (reduced) {
      push("←", tool.result);
      return;
    }
    const id = nextId.current++;
    setPackets((p) => [...p, { id, tool }]);
    setTimeout(() => setHits((h) => h + 1), 550);
  };

  const land = (p: Packet) => {
    setPackets((ps) => ps.filter((x) => x.id !== p.id));
    push("←", p.tool.result);
  };

  return (
    <div className="flex min-h-64 flex-col p-5">
      {/* the wire */}
      <div className="relative h-20">
        <div className="absolute inset-x-[22px] top-1/2 border-t-2 border-dashed border-slate-200" aria-hidden="true" />

        <Node label="Agent" className="left-0" tone="software" />
        <Node label="MCP server" className="right-0" tone="data" pulseKey={hits} />

        {/* packets travel between the two node centres */}
        <div className="absolute inset-x-[22px] top-1/2">
        {packets.map((p) => (
          <motion.span
            key={p.id}
            aria-hidden="true"
            className="absolute top-0 z-10 -ml-2 -mt-2 h-4 w-4 rounded-full shadow-[0_0_12px_rgba(14,165,233,0.8)]"
            initial={{ left: "0%", y: 0, backgroundColor: "#0ea5e9" }}
            animate={{
              left: ["0%", "100%", "0%"],
              y: [0, -22, 0, 22, 0],
              backgroundColor: ["#0ea5e9", "#0ea5e9", "#10b981", "#10b981"],
            }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
            onAnimationComplete={() => land(p)}
          />
        ))}
        </div>
      </div>

      <div className="mb-4 mt-3 flex flex-wrap gap-2">
        {TOOLS.map((tool) => (
          <motion.button
            key={tool.name}
            type="button"
            whileTap={{ scale: 0.92 }}
            onClick={() => call(tool)}
            className="rounded-full bg-primary-light px-3 py-1.5 font-mono text-xs font-medium text-primary-dark transition-colors hover:bg-sky-200"
          >
            {tool.name}()
          </motion.button>
        ))}
      </div>

      <div
        className="mt-auto flex h-[4.75rem] flex-col justify-end overflow-hidden rounded-2xl bg-canvas px-3 py-2 font-mono text-[11px] leading-5"
        aria-live="polite"
      >
        <AnimatePresence initial={false} mode="popLayout">
          {log.map((l) => (
            <motion.div
              key={l.id}
              layout="position"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 34 }}
              className="flex shrink-0 gap-2"
            >
              <span className={l.dir === "→" ? "text-primary-dark" : "text-emerald-600"}>{l.dir}</span>
              <span className={l.dir === "→" ? "text-ink" : "text-muted"}>{l.text}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Node({
  label,
  className,
  tone,
  pulseKey,
}: {
  label: string;
  className: string;
  tone: "data" | "software";
  pulseKey?: number;
}) {
  return (
    <div className={cn("absolute top-1/2 z-20 -translate-y-1/2", className)}>
      <span className="relative grid h-11 w-11 place-items-center">
        {pulseKey ? (
          <motion.span
            key={pulseKey}
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-emerald-400"
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: 1.9, opacity: 0 }}
            transition={{ duration: 0.6 }}
          />
        ) : null}
        <span
          className={cn(
            "relative h-11 w-11 rounded-full",
            tone === "software"
              ? "bg-gradient-to-br from-sky-300 to-primary"
              : "bg-gradient-to-br from-emerald-300 to-data",
          )}
        />
      </span>
      <span className="absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap text-[11px] font-medium text-muted">
        {label}
      </span>
    </div>
  );
}
