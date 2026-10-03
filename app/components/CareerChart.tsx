"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";

type Lane = { id: string; name: string };
type Item = {
  id: string;
  kind: string;
  lanes: string[];
  from?: number;
  to?: number | null;
  at?: number;
  short: string;
  title: string;
  period: string;
  detail: string;
  href: string;
  /** For items spanning several lanes: what the work involves in each lane. */
  roles?: Record<string, string>;
};

type Props = {
  lanes: Lane[];
  items: Item[];
  /** Decimal year, e.g. 2026.75. Computed on the server so it's stable across hydration. */
  now: number;
};

const START = 2023.5;
const LANE_H = 5.5; // rem
const BAR_TOP = 2.4; // rem from lane top
const BAR_H = 2.5; // rem
const STEP_MS = 4500;

const LANE_TONE: Record<string, { bar: string; barActive: string; dot: string; label: string }> = {
  data: { bar: "bg-emerald-100 text-emerald-900", barActive: "bg-emerald-200", dot: "bg-data", label: "text-emerald-700" },
  strategy: { bar: "bg-amber-100 text-amber-900", barActive: "bg-amber-200", dot: "bg-strategy", label: "text-amber-700" },
  software: { bar: "bg-sky-100 text-sky-900", barActive: "bg-sky-200", dot: "bg-software", label: "text-primary-dark" },
};

function linkLabel(href: string) {
  if (href.startsWith("/project")) return "Read about the project";
  if (href === "#background") return "See education and awards";
  return "See experience";
}

export default function CareerChart({ lanes, items, now }: Props) {
  // Start on the current role, then loop through the history in order.
  const [index, setIndex] = useState(items.length - 1);
  const [paused, setPaused] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [focused, setFocused] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const inView = useInView(rootRef, { amount: 0.4 });
  const reducedMotion = useReducedMotion() ?? false;
  const scrollerRef = useRef<HTMLDivElement>(null);

  const active = items[index];
  const running = !paused && !hovering && !focused && inView && !reducedMotion;

  // On narrow screens the chart scrolls sideways; start at the present.
  useEffect(() => {
    const el = scrollerRef.current;
    if (el && el.scrollWidth > el.clientWidth) el.scrollLeft = el.scrollWidth;
  }, []);

  const end = Math.max(2027, now + 0.15);
  const range = end - START;
  const pct = (year: number) => `${((Math.max(year, START) - START) / range) * 100}%`;
  const laneIndex = (id: string) => lanes.findIndex((l) => l.id === id);
  const delayFor = (year: number) => ({ "--d": `${300 + ((year - START) / range) * 1000}ms` }) as React.CSSProperties;

  const years: number[] = [];
  for (let y = Math.ceil(START); y < end; y++) years.push(y);

  return (
    <figure
      ref={rootRef}
      aria-label="Timeline of my work in data science, strategy and software engineering"
    >
      <div
        ref={scrollerRef}
        className="-mx-5 overflow-x-auto pb-2 pr-5 sm:mx-0 sm:pr-0"
        onMouseLeave={() => setHovering(false)}
      >
        <div className="grid min-w-[42rem] grid-cols-[7.5rem_1fr] sm:min-w-[46rem] sm:grid-cols-[11rem_1fr]">
          {/* lane names, pinned while the plot scrolls on small screens */}
          <div className="sticky left-0 z-10 bg-canvas/90 pl-5 backdrop-blur sm:bg-transparent sm:pl-0 sm:backdrop-blur-none">
            {lanes.map((lane) => (
              <div
                key={lane.id}
                className="flex items-center gap-2.5 pr-3 text-sm font-medium leading-tight sm:text-[15px]"
                style={{ height: `${LANE_H}rem`, paddingTop: `${BAR_TOP - 0.6}rem` }}
              >
                <span className={cn("h-2.5 w-2.5 shrink-0 rounded-full", LANE_TONE[lane.id].dot)} aria-hidden="true" />
                {lane.name}
              </div>
            ))}
          </div>

          {/* plot */}
          <div className="relative" style={{ height: `${lanes.length * LANE_H}rem` }}>
            {lanes.map((lane, i) => (
              <div
                key={lane.id}
                aria-hidden="true"
                className="absolute inset-x-0 rounded-2xl bg-white/50"
                style={{ top: `${i * LANE_H + 0.2}rem`, height: `${LANE_H - 0.4}rem` }}
              />
            ))}

            {years.map((y) => (
              <div key={y} aria-hidden="true" className="absolute inset-y-0" style={{ left: pct(y) }}>
                <div className="h-full border-l border-dashed border-slate-300/60" />
                <span className="absolute left-0 top-full mt-2 -translate-x-1/2 font-mono text-xs text-muted">{y}</span>
              </div>
            ))}

            <div aria-hidden="true" className="absolute inset-y-0" style={{ left: pct(now) }}>
              <div className="h-full border-l-2 border-ink/80" />
              <span className="absolute left-0 top-full mt-2 -translate-x-1/2 text-xs font-semibold">Today</span>
            </div>

            {items.map((item, i) => {
              const first = laneIndex(item.lanes[0]);
              const last = laneIndex(item.lanes[item.lanes.length - 1]);
              const isActive = i === index;
              const tone = LANE_TONE[item.lanes[0]];
              const handlers = {
                onMouseEnter: () => {
                  setHovering(true);
                  setIndex(i);
                },
                onFocus: () => {
                  setFocused(true);
                  setIndex(i);
                },
                onBlur: () => setFocused(false),
              };

              if (item.kind === "point" && item.at !== undefined) {
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    {...handlers}
                    className={cn(
                      "pop absolute flex -translate-x-full flex-row-reverse items-center gap-2 rounded-full py-1 pl-2.5 pr-1 text-sm font-medium transition-opacity duration-500",
                      !isActive && "opacity-55",
                    )}
                    style={{ left: pct(item.at), top: `${first * LANE_H + 0.45}rem`, marginLeft: "0.6rem", ...delayFor(item.at) }}
                  >
                    <span className="relative flex h-3.5 w-3.5">
                      {isActive && <span className={cn("absolute inset-0 animate-ping-slow rounded-full", tone.dot)} />}
                      <span className={cn("relative h-3.5 w-3.5 rounded-full ring-4 ring-canvas", tone.dot)} />
                    </span>
                    <span className="whitespace-nowrap">{item.short}</span>
                  </a>
                );
              }

              const from = item.from ?? START;
              const to = item.to ?? now;
              const multi = item.lanes.length > 1;
              const roles = item.roles;
              const top = first * LANE_H + BAR_TOP;
              const height = (last - first) * LANE_H + BAR_H;

              const bar = (
                <a
                  key={item.id}
                  href={item.href}
                  aria-label={multi ? `${item.title}, ${item.period}` : undefined}
                  {...handlers}
                  className={cn(
                    "grow-x absolute flex items-center overflow-hidden whitespace-nowrap px-3 text-sm font-medium transition-[background-color,opacity,box-shadow] duration-500",
                    multi ? "rounded-[1.25rem] bg-ink text-white" : cn("rounded-full", tone.bar, isActive && tone.barActive),
                    isActive ? "shadow-[0_0_0_3px_white,0_0_0_4px_rgba(15,42,68,0.3)]" : "opacity-55",
                  )}
                  style={{
                    left: pct(from),
                    width: `calc(${pct(to)} - ${pct(from)})`,
                    top: `${top}rem`,
                    height: `${height}rem`,
                    ...delayFor(from),
                  }}
                >
                  {multi && roles ? (
                    <span className="absolute inset-x-4 top-0 bottom-0">
                      {item.lanes.map((laneId, li) => (
                        <span
                          key={laneId}
                          className="absolute inset-x-0 flex items-center gap-2"
                          style={{ top: `${li * LANE_H}rem`, height: `${BAR_H}rem` }}
                        >
                          <span className={cn("h-2 w-2 shrink-0 rounded-full", LANE_TONE[laneId].dot)} aria-hidden="true" />
                          <span className="line-clamp-2 whitespace-normal leading-tight">{roles[laneId]}</span>
                        </span>
                      ))}
                    </span>
                  ) : (
                    <span className="truncate">{item.short}</span>
                  )}
                </a>
              );

              if (!multi) return bar;
              return (
                <Fragment key={item.id}>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "pop absolute whitespace-nowrap text-sm font-semibold transition-opacity duration-500",
                      !isActive && "opacity-55",
                    )}
                    style={{ left: pct(from), top: `${first * LANE_H + 0.55}rem`, ...delayFor(from) }}
                  >
                    {item.short}
                  </span>
                  {bar}
                </Fragment>
              );
            })}
          </div>
        </div>
        <div className="h-8" aria-hidden="true" />
      </div>

      <figcaption className="mt-4 flex gap-4 sm:ml-[11rem]">
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? "Play timeline" : "Pause timeline"}
          className={cn(
            "-mt-[0.4rem] grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white text-ink shadow-[0_1px_3px_rgba(15,42,68,0.12)] transition-colors hover:bg-primary-light",
            reducedMotion && "hidden",
          )}
        >
          {paused ? <Play size={13} className="translate-x-px" /> : <Pause size={13} />}
        </button>

        <div className="min-w-0 max-w-2xl flex-1">
          <div className="flex items-center gap-3">
            <div className="h-1 flex-1 overflow-hidden rounded-full bg-white" aria-hidden="true">
              {!reducedMotion && (
                <div
                  key={index}
                  className="h-full origin-left rounded-full bg-gradient-to-r from-primary to-data"
                  style={{
                    animation: `progress ${STEP_MS}ms linear forwards`,
                    animationPlayState: running ? "running" : "paused",
                  }}
                  onAnimationEnd={() => setIndex((i) => (i + 1) % items.length)}
                />
              )}
            </div>
            <span className="font-mono text-xs tabular-nums text-muted">
              {index + 1}/{items.length}
            </span>
          </div>

          <div className="mt-4 min-h-[7.5rem]" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25 }}
              >
                <p className="flex flex-wrap items-baseline gap-x-3">
                  <span className="text-lg font-medium">{active.title}</span>
                  <span className={cn("text-sm font-medium", LANE_TONE[active.lanes[0]].label)}>{active.period}</span>
                </p>
                <p className="mt-1 text-pretty text-muted">{active.detail}</p>
                <a
                  href={active.href}
                  className="mt-2 inline-block text-sm font-medium text-primary-dark underline decoration-primary/40 underline-offset-4 hover:decoration-primary-dark"
                >
                  {linkLabel(active.href)}
                </a>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </figcaption>
    </figure>
  );
}
