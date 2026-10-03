/**
 * Hero illustration: a notebook-style panel that tells the "data → model →
 * product" story. Pure SVG + CSS keyframes (server component, zero JS).
 */
const X = [20, 52.7, 85.5, 118.2, 150.9, 183.6, 216.4, 249.1, 281.8, 314.5, 347.3, 380];
const ACTUAL = [130, 118, 124, 102, 108, 88, 92, 74];
const FORECAST = [74, 64, 57, 47, 38];
const SPREAD = [0, 7, 12, 16, 20];

const pts = (ys: number[], offset = 0) => ys.map((y, i) => `${X[i + offset]} ${y}`).join(" L");
const actualPath = `M${pts(ACTUAL)}`;
const areaPath = `${actualPath} L${X[ACTUAL.length - 1]} 170 L${X[0]} 170 Z`;
const forecastPath = `M${pts(FORECAST, 7)}`;
const bandPath =
  `M${pts(FORECAST.map((y, i) => y - SPREAD[i]), 7)} L` +
  FORECAST.map((y, i) => `${X[7 + i]} ${y + SPREAD[i]}`)
    .reverse()
    .join(" L") +
  " Z";

const MONTHS = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

const CODE: { n: number; parts: [string, string][] }[] = [
  {
    n: 1,
    parts: [
      ["text-ink", "df "],
      ["text-muted", "= "],
      ["text-sky-600", "snowflake"],
      ["text-muted", "."],
      ["text-ink", "query"],
      ["text-muted", "("],
      ["text-emerald-600", '"fin.revenue"'],
      ["text-muted", ")"],
    ],
  },
  {
    n: 2,
    parts: [
      ["text-ink", "model "],
      ["text-muted", "= "],
      ["text-sky-600", "Forecaster"],
      ["text-muted", "(h="],
      ["text-amber-600", "6"],
      ["text-muted", ")."],
      ["text-ink", "fit"],
      ["text-muted", "(df)"],
    ],
  },
  {
    n: 3,
    parts: [
      ["text-ink", "app"],
      ["text-muted", "."],
      ["text-ink", "publish"],
      ["text-muted", "(model."],
      ["text-ink", "predict"],
      ["text-muted", "())"],
    ],
  },
];

export default function HeroVisual() {
  return (
    <div className="relative isolate mx-auto w-full max-w-lg lg:max-w-none">
      {/* glow */}
      <div
        aria-hidden="true"
        className="absolute -inset-6 -z-10 rounded-[3rem] opacity-70 blur-2xl"
        style={{
          background:
            "radial-gradient(60% 60% at 70% 30%, rgba(14,165,233,0.25), transparent 70%), radial-gradient(50% 50% at 20% 90%, rgba(16,185,129,0.18), transparent 70%)",
        }}
      />

      <figure
        className="rise overflow-hidden rounded-4xl border border-white/80 bg-white/80 shadow-[0_30px_80px_-30px_rgba(11,19,36,0.35)] ring-1 ring-line backdrop-blur-xl"
        style={{ "--d": "250ms" } as React.CSSProperties}
        aria-label="Illustration: a notebook querying Snowflake, fitting a forecast model and publishing it to an app"
      >
        {/* window chrome */}
        <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </div>
          <span className="font-mono text-[11px] text-muted">revenue_forecast.ipynb</span>
          <span className="rounded-full bg-primary-light px-2 py-0.5 font-mono text-[10px] font-medium text-primary-dark">
            py 3.12
          </span>
        </div>

        {/* code cells */}
        <div className="space-y-1.5 px-5 pb-3 pt-4 font-mono text-[12px] leading-relaxed sm:text-[13px]">
          {CODE.map((line, i) => (
            <div
              key={line.n}
              className="fade-in flex gap-3 whitespace-nowrap"
              style={{ "--d": `${600 + i * 260}ms` } as React.CSSProperties}
            >
              <span className="select-none text-slate-400">[{line.n}]</span>
              <span>
                {line.parts.map(([cls, txt], j) => (
                  <span key={j} className={cls}>
                    {txt}
                  </span>
                ))}
                {i === CODE.length - 1 && (
                  <span className="caret ml-0.5 inline-block h-[1.05em] w-[7px] translate-y-[2px] bg-primary" />
                )}
              </span>
            </div>
          ))}
        </div>

        {/* chart */}
        <div className="mx-3 mb-3 rounded-3xl bg-canvas/80 px-3 pb-3 pt-4 ring-1 ring-line">
          <div className="mb-2 flex items-center justify-between px-2">
            <span className="text-xs font-medium text-ink">Monthly revenue</span>
            <span className="flex items-center gap-3 font-mono text-[10px] text-muted">
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-3 rounded-full bg-primary" /> actual
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-3 rounded-full bg-data" /> forecast
              </span>
            </span>
          </div>

          <svg viewBox="0 0 400 190" className="h-auto w-full" role="presentation">
            <defs>
              <linearGradient id="hero-area" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
              </linearGradient>
            </defs>

            {[40, 75, 110, 145].map((y) => (
              <line key={y} x1="12" x2="388" y1={y} y2={y} stroke="#e2e9f1" strokeDasharray="2 4" />
            ))}

            <line x1={X[7]} x2={X[7]} y1="20" y2="170" stroke="#94a3b8" strokeOpacity="0.5" strokeDasharray="3 3" />
            <text x={X[7] + 6} y="28" className="fill-slate-400 font-mono" fontSize="9">
              today
            </text>

            <path d={areaPath} fill="url(#hero-area)" className="fade-in" style={{ "--d": "1300ms" } as React.CSSProperties} />
            <path
              d={actualPath}
              pathLength={1}
              fill="none"
              stroke="#0ea5e9"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="draw"
              style={{ "--d": "900ms" } as React.CSSProperties}
            />

            <path d={bandPath} fill="#10b981" fillOpacity="0.12" className="fade-in" style={{ "--d": "2100ms" } as React.CSSProperties} />
            <path
              d={forecastPath}
              fill="none"
              stroke="#10b981"
              strokeWidth="2.5"
              strokeDasharray="5 5"
              strokeLinecap="round"
              className="fade-in"
              style={{ "--d": "2000ms" } as React.CSSProperties}
            />

            {ACTUAL.map((y, i) => (
              <circle
                key={i}
                cx={X[i]}
                cy={y}
                r="3"
                fill="#fff"
                stroke="#0ea5e9"
                strokeWidth="2"
                className="fade-in"
                style={{ "--d": `${1000 + i * 90}ms` } as React.CSSProperties}
              />
            ))}

            <g className="fade-in" style={{ "--d": "2300ms" } as React.CSSProperties}>
              <circle cx={X[11]} cy={FORECAST[4]} r="9" fill="#10b981" fillOpacity="0.15" />
              <circle cx={X[11]} cy={FORECAST[4]} r="4" fill="#10b981" />
            </g>

            {MONTHS.map((m, i) => (
              <text key={i} x={X[i]} y="186" textAnchor="middle" className="fill-slate-400 font-mono" fontSize="9">
                {m}
              </text>
            ))}
          </svg>
        </div>
      </figure>

      {/* floating chips */}
      <div
        className="rise absolute -left-3 top-24 hidden items-center gap-2 rounded-full border border-line bg-white/95 py-1.5 pl-1.5 pr-3.5 shadow-lg shadow-slate-900/5 sm:flex lg:-left-10"
        style={{ "--d": "1500ms" } as React.CSSProperties}
        aria-hidden="true"
      >
        <span className="grid h-6 w-6 place-items-center rounded-full bg-primary-light font-mono text-[10px] font-semibold text-primary-dark">
          DS
        </span>
        <span className="font-mono text-[11px] text-ink">model → validated</span>
      </div>
      <div
        className="rise absolute -right-3 bottom-10 hidden items-center gap-2 rounded-full border border-line bg-white/95 py-1.5 pl-1.5 pr-3.5 shadow-lg shadow-slate-900/5 sm:flex lg:-right-8"
        style={{ "--d": "2400ms" } as React.CSSProperties}
        aria-hidden="true"
      >
        <span className="grid h-6 w-6 place-items-center rounded-full bg-emerald-50 font-mono text-[10px] font-semibold text-emerald-700">
          SE
        </span>
        <span className="font-mono text-[11px] text-ink">app → shipped</span>
      </div>
    </div>
  );
}
