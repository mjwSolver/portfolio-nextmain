"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { Check, Loader2, Play, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";

/* ---------- sample data and chart geometry (viewBox 400 x 190) ---------- */

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const ACTUAL = [420, 455, 440, 510, 495, 560, 548, 610];
const MAX_H = MONTHS.length - ACTUAL.length; // 4 forecast months
const LAST = ACTUAL.length - 1;

const xOf = (i: number) => 20 + i * (360 / 11);
const yOf = (v: number) => 162 - ((v - 380) / 340) * 140;

function noise(seed: number, i: number) {
  const x = Math.sin(seed * 12.9898 + i * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

function forecast(seed: number) {
  return Array.from({ length: MAX_H }, (_, i) => {
    const v = ACTUAL[LAST] + 22 * (i + 1) + (noise(seed, i) - 0.5) * 50;
    const spread = 10 + i * 11;
    return { v, lo: v - spread, hi: v + spread };
  });
}

const line = (pts: [number, number][]) => pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
const actualPts: [number, number][] = ACTUAL.map((v, i) => [xOf(i), yOf(v)]);
const actualPath = line(actualPts);
const areaPath = `${actualPath} L${xOf(LAST)} 170 L${xOf(0)} 170 Z`;

/** Always 4 segments; months past the horizon collapse onto the last shown point so `d` can morph. */
function forecastPaths(seed: number, h: number) {
  const f = forecast(seed);
  const at = (i: number) => f[Math.min(i, h - 1)];
  const mid: [number, number][] = [[xOf(LAST), yOf(ACTUAL[LAST])]];
  const hi: [number, number][] = [[xOf(LAST), yOf(ACTUAL[LAST])]];
  const lo: [number, number][] = [];
  for (let i = 0; i < MAX_H; i++) {
    const x = xOf(LAST + 1 + Math.min(i, h - 1));
    mid.push([x, yOf(at(i).v)]);
    hi.push([x, yOf(at(i).hi)]);
    lo.push([x, yOf(at(i).lo)]);
  }
  const band = `${line(hi)} ${lo
    .reverse()
    .map(([x, y]) => `L${x.toFixed(1)} ${y.toFixed(1)}`)
    .join(" ")} Z`;
  return { mid: line(mid), band, values: f.slice(0, h) };
}

/* ---------- code cells ---------- */

type Token = [className: string, text: string];

function codeLines(h: number): Token[][] {
  return [
    [
      ["text-ink", "df "],
      ["text-muted", "= "],
      ["text-sky-600", "snowflake"],
      ["text-muted", "."],
      ["text-ink", "query"],
      ["text-muted", "("],
      ["text-emerald-600", '"fin.revenue"'],
      ["text-muted", ")"],
    ],
    [
      ["text-ink", "model "],
      ["text-muted", "= "],
      ["text-sky-600", "Forecaster"],
      ["text-muted", "(h="],
      ["h", String(h)],
      ["text-muted", ").fit(df)"],
    ],
    [
      ["text-ink", "app"],
      ["text-muted", "."],
      ["text-ink", "publish"],
      ["text-muted", "(model.predict())"],
    ],
  ];
}

const TOTAL_CHARS = codeLines(4).flat().reduce((n, [, t]) => n + t.length, 0);

/** The first `typed` characters of the cells, plus which line the caret is on. */
function typedCells(lines: Token[][], typed: number) {
  let left = typed;
  let caretLine = -1;
  const out = lines.map((tokens, li) =>
    tokens.map(([cls, text]): Token => {
      const take = Math.max(0, Math.min(text.length, left));
      left -= text.length;
      if (left <= 0 && caretLine === -1) caretLine = li;
      return [cls, text.slice(0, take)];
    }),
  );
  return { out, caretLine };
}

/* ---------- component ---------- */

type Phase = "typing" | "running" | "done";

export default function HeroNotebook() {
  const reduced = useReducedMotion();
  const [typedState, setTyped] = useState(0);
  const [phaseState, setPhase] = useState<Phase>("typing");
  const typed = reduced ? TOTAL_CHARS : typedState;
  const phase: Phase = reduced && phaseState === "typing" ? "done" : phaseState;
  const [h, setH] = useState(4);
  const [seed, setSeed] = useState(1);
  const [runs, setRuns] = useState(1);
  const [hover, setHover] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // Type the cells in once, then "execute" them. Reduced motion skips straight to the result.
  useEffect(() => {
    if (reduced) return;
    let n = 0;
    let done: ReturnType<typeof setTimeout>;
    const id = setInterval(() => {
      n += 1;
      setTyped(n);
      if (n >= TOTAL_CHARS) {
        clearInterval(id);
        setPhase("running");
        done = setTimeout(() => setPhase("done"), 650);
      }
    }, 24);
    return () => {
      clearInterval(id);
      clearTimeout(done);
    };
  }, [reduced]);

  const run = () => {
    if (phase !== "done") return;
    setPhase("running");
    setTimeout(() => {
      setSeed((s) => s + 1);
      setRuns((r) => r + 1);
      setPhase("done");
    }, reduced ? 0 : 650);
  };

  // Gentle 3D tilt toward the pointer (mouse only).
  const rx = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });
  const onTilt = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduced || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 6);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 6);
  };
  const resetTilt = () => {
    rx.set(0);
    ry.set(0);
  };

  const { mid, band, values } = forecastPaths(seed, h);
  const shown = phase === "done" || runs > 1;
  const lines = codeLines(h);
  const lastIndex = LAST + h;

  const onChartMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const vx = ((e.clientX - r.left) / r.width) * 400;
    setHover(Math.max(0, Math.min(lastIndex, Math.round((vx - 20) / (360 / 11)))));
  };

  const hoverValue = hover === null ? null : hover <= LAST ? ACTUAL[hover] : values[hover - LAST - 1]?.v;

  const { out: cells, caretLine } = typedCells(lines, typed);

  return (
    <div className="relative isolate mx-auto w-full max-w-xl lg:max-w-none" style={{ perspective: 1200 }}>
      <div
        aria-hidden="true"
        className="absolute -inset-y-8 -inset-x-2 -z-10 rounded-[3rem] opacity-80 blur-2xl sm:-inset-8"
        style={{
          background:
            "radial-gradient(60% 60% at 70% 25%, rgba(14,165,233,0.28), transparent 70%), radial-gradient(50% 50% at 20% 90%, rgba(16,185,129,0.22), transparent 70%)",
        }}
      />

      <motion.figure
        onPointerMove={onTilt}
        onPointerLeave={resetTilt}
        style={{ rotateX: rx, rotateY: ry }}
        className="rise surface overflow-hidden"
        aria-label="Interactive example: a notebook that queries Snowflake, fits a revenue forecast and publishes it"
      >
        {/* window chrome */}
        <div className="flex items-center justify-between px-5 py-3.5">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </div>
          <span className="font-mono text-[11px] text-muted">revenue_forecast.ipynb</span>
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 font-mono text-[10px] font-medium transition-colors",
              phase === "running" ? "bg-emerald-50 text-emerald-700" : "bg-primary-light text-primary-dark",
            )}
          >
            {phase === "running" ? <Loader2 size={10} className="animate-spin" /> : null}
            {phase === "running" ? "running" : "py 3.12"}
          </span>
        </div>

        {/* code cells */}
        <div className="space-y-1 px-5 pb-3 font-mono text-[12px] leading-relaxed sm:text-[13px]" aria-hidden="true">
          {cells.map((tokens, li) => (
            <div key={li} className="flex gap-3 whitespace-nowrap">
              <span className="w-7 select-none text-slate-400">
                [{phase === "running" ? "*" : phase === "typing" ? " " : (runs - 1) * 3 + li + 1}]
              </span>
              <span>
                {tokens.map(([cls, part], ti) => {
                  if (!part) return null;
                  if (cls === "h") {
                    return (
                      <motion.span
                        key={`h-${part}`}
                        initial={{ backgroundColor: "rgba(16,185,129,0.35)" }}
                        animate={{ backgroundColor: "rgba(16,185,129,0)" }}
                        transition={{ duration: 0.8 }}
                        className="rounded px-0.5 font-semibold text-emerald-700"
                      >
                        {part}
                      </motion.span>
                    );
                  }
                  return (
                    <span key={ti} className={cls}>
                      {part}
                    </span>
                  );
                })}
                {phase === "typing" && caretLine === li && (
                  <span className="ml-px inline-block h-[1.05em] w-[7px] translate-y-[2px] bg-primary" />
                )}
              </span>
            </div>
          ))}
        </div>

        {/* controls */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-5 pb-4">
          <motion.button
            type="button"
            onClick={run}
            disabled={phase !== "done"}
            whileTap={{ scale: 0.94 }}
            className="inline-flex h-8 items-center gap-1.5 rounded-full bg-ink px-3.5 text-xs font-medium text-white transition-colors hover:bg-primary-dark disabled:opacity-60"
          >
            <Play size={12} className="fill-current" aria-hidden="true" />
            Run again
          </motion.button>
          <label className="flex items-center gap-2.5 text-xs text-muted">
            Forecast horizon
            <input
              type="range"
              min={1}
              max={MAX_H}
              step={1}
              value={h}
              onChange={(e) => setH(Number(e.target.value))}
              className="w-24 cursor-pointer accent-emerald-500"
            />
            <span className="w-14 font-mono tabular-nums text-ink">
              {h} {h === 1 ? "month" : "mo"}
            </span>
          </label>
        </div>

        {/* chart */}
        <div className="mx-3 mb-3 rounded-3xl bg-canvas/80 px-3 pb-3 pt-4">
          <div className="mb-2 flex items-center justify-between px-2">
            <span className="text-xs font-medium text-ink">Monthly revenue, sample data</span>
            <span className="flex items-center gap-3 font-mono text-[10px] text-muted">
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-3 rounded-full bg-primary" /> actual
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-3 rounded-full bg-data" /> forecast
              </span>
            </span>
          </div>

          <div className="relative">
            <svg
              ref={svgRef}
              viewBox="0 0 400 190"
              className="h-auto w-full touch-none"
              onPointerMove={onChartMove}
              onPointerLeave={() => setHover(null)}
              role="img"
              aria-label={`Sample revenue chart with a ${h}-month forecast`}
            >
              <defs>
                <linearGradient id="nb-area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
                </linearGradient>
              </defs>

              {[40, 75, 110, 145].map((y) => (
                <line key={y} x1="12" x2="388" y1={y} y2={y} stroke="#dbe4ec" strokeDasharray="2 4" />
              ))}

              {shown && (
                <g key={runs}>
                  <path d={areaPath} fill="url(#nb-area)" className="rise" style={{ "--d": "300ms" } as React.CSSProperties} />
                  <path
                    d={actualPath}
                    pathLength={1}
                    fill="none"
                    stroke="#0ea5e9"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="draw"
                  />
                  {ACTUAL.map((v, i) => (
                    <circle
                      key={i}
                      cx={xOf(i)}
                      cy={yOf(v)}
                      r="3"
                      fill="#fff"
                      stroke="#0ea5e9"
                      strokeWidth="2"
                      className="pop"
                      style={{ "--d": `${200 + i * 80}ms`, transformOrigin: `${xOf(i)}px ${yOf(v)}px` } as React.CSSProperties}
                    />
                  ))}
                </g>
              )}

              {shown && (
                <g className="pop" style={{ "--d": "900ms", transformOrigin: `${xOf(LAST)}px ${yOf(ACTUAL[LAST])}px` } as React.CSSProperties}>
                  <motion.path
                    animate={{ d: band }}
                    initial={false}
                    transition={{ type: "spring", stiffness: 160, damping: 22 }}
                    fill="#10b981"
                    fillOpacity="0.14"
                  />
                  <motion.path
                    animate={{ d: mid }}
                    initial={false}
                    transition={{ type: "spring", stiffness: 160, damping: 22 }}
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2.5"
                    strokeDasharray="5 5"
                    strokeLinecap="round"
                  />
                  <motion.circle
                    animate={{ cx: xOf(lastIndex), cy: yOf(values[h - 1].v) }}
                    initial={false}
                    transition={{ type: "spring", stiffness: 160, damping: 22 }}
                    r="4"
                    fill="#10b981"
                  />
                </g>
              )}

              {hover !== null && hoverValue != null && (
                <g pointerEvents="none">
                  <line x1={xOf(hover)} x2={xOf(hover)} y1="16" y2="170" stroke="#0f2a44" strokeOpacity="0.25" />
                  <circle
                    cx={xOf(hover)}
                    cy={yOf(hoverValue)}
                    r="5"
                    fill={hover <= LAST ? "#0ea5e9" : "#10b981"}
                    stroke="#fff"
                    strokeWidth="2"
                  />
                </g>
              )}

              {MONTHS.map((m, i) => (
                <text key={m} x={xOf(i)} y="186" textAnchor="middle" className="fill-slate-400 font-mono" fontSize="9">
                  {m[0]}
                </text>
              ))}
            </svg>

            {hover !== null && hoverValue != null && (
              <div
                className="pointer-events-none absolute top-0 -translate-x-1/2 rounded-lg bg-ink px-2 py-1 font-mono text-[10px] text-white shadow-lg"
                style={{ left: `${(xOf(hover) / 400) * 100}%` }}
              >
                {MONTHS[hover]} · ${Math.round(hoverValue)}k{hover > LAST ? " forecast" : ""}
              </div>
            )}
          </div>
        </div>
      </motion.figure>

      {/* draggable status chips: fidget toys that spring back */}
      <AnimatePresence>
        {shown && (
          <>
            <Chip key={`a-${runs}`} className="-top-5 right-6" delay={0.2} tone="data" icon={<Check size={12} />}>
              Model validated
            </Chip>
            <Chip key={`b-${runs}`} className="-bottom-5 left-6" delay={0.45} tone="software" icon={<Rocket size={12} />}>
              App published
            </Chip>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function Chip({
  children,
  className,
  delay,
  tone,
  icon,
}: {
  children: React.ReactNode;
  className: string;
  delay: number;
  tone: "data" | "software";
  icon: React.ReactNode;
}) {
  return (
    <motion.div
      drag
      dragSnapToOrigin
      dragElastic={0.5}
      dragTransition={{ bounceStiffness: 400, bounceDamping: 18 }}
      whileDrag={{ scale: 1.08, rotate: -3, cursor: "grabbing" }}
      whileHover={{ y: -2 }}
      initial={{ opacity: 0, y: 8, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay, type: "spring", stiffness: 300, damping: 20 }}
      aria-hidden="true"
      className={cn(
        "absolute z-10 hidden cursor-grab touch-none select-none items-center gap-2 rounded-full bg-white py-1.5 pl-1.5 pr-3.5 text-xs font-medium shadow-[0_10px_30px_-10px_rgba(15,42,68,0.35)] sm:flex",
        className,
      )}
    >
      <span
        className={cn(
          "grid h-6 w-6 place-items-center rounded-full",
          tone === "data" ? "bg-emerald-50 text-emerald-600" : "bg-primary-light text-primary-dark",
        )}
      >
        {icon}
      </span>
      {children}
    </motion.div>
  );
}
