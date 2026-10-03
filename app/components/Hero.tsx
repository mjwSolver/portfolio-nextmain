import { ArrowRight } from "lucide-react";
import { site } from "@/lib/data";
import HeroVisual from "./HeroVisual";
import { GitHubIcon, LinkedInIcon } from "./Icons";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

export default function Hero() {
  const { personal_info: p } = site;

  return (
    <section id="top" className="container-page pb-16 pt-32 sm:pt-36 lg:pb-24 lg:pt-44">
      <div className="grid items-center gap-14 lg:grid-cols-[1.08fr_1fr] lg:gap-12">
        <div>
          <p
            className="rise mb-8 inline-flex items-center gap-2.5 rounded-full border border-line bg-white/70 py-1.5 pl-2 pr-4 text-sm text-muted backdrop-blur"
            style={delay(0)}
          >
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping-slow rounded-full bg-data" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-data" />
            </span>
            <span>
              <span className="font-medium text-ink">Now</span> · {p.status}
            </span>
          </p>

          <h1>
            <span className="rise mb-5 block font-mono text-sm tracking-tight text-muted" style={delay(80)}>
              {p.name} — {p.title}
            </span>
            <span
              className="rise block text-balance text-[2.75rem] font-semibold leading-[1.02] tracking-[-0.035em] sm:text-6xl lg:text-[4.25rem]"
              style={delay(160)}
            >
              Data science,
              <br />
              shipped as{" "}
              <span className="bg-gradient-to-r from-primary-dark via-primary to-bridge bg-clip-text text-transparent">
                software.
              </span>
            </span>
          </h1>

          <p className="rise mt-7 max-w-xl text-pretty text-lg leading-relaxed text-muted" style={delay(260)}>
            {p.bio}
          </p>

          <div className="rise mt-10 flex flex-wrap items-center gap-3" style={delay(360)}>
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-white shadow-[0_10px_30px_-10px_rgba(11,19,36,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-dark"
            >
              See selected work
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-white/80 px-6 py-3.5 text-sm font-medium text-ink backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300"
            >
              Get in touch
            </a>
            <span className="mx-1 hidden h-6 w-px bg-line sm:block" aria-hidden="true" />
            <a
              href={p.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="grid h-12 w-12 place-items-center rounded-full border border-line bg-white/80 text-ink transition-all duration-300 hover:-translate-y-0.5 hover:text-primary-dark"
            >
              <GitHubIcon />
            </a>
            <a
              href={p.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="grid h-12 w-12 place-items-center rounded-full border border-line bg-white/80 text-ink transition-all duration-300 hover:-translate-y-0.5 hover:text-primary-dark"
            >
              <LinkedInIcon />
            </a>
          </div>
        </div>

        <HeroVisual />
      </div>

      <dl className="rise mt-20 grid grid-cols-2 gap-y-8 border-t border-line pt-10 md:grid-cols-4" style={delay(500)}>
        {p.stats.map((s, i) => (
          <div key={s.label} className={i > 0 ? "md:border-l md:border-line md:pl-8" : ""}>
            <dt className="order-2 mt-1 text-sm text-muted">{s.label}</dt>
            <dd className="text-3xl font-semibold tracking-tight tabular-nums sm:text-4xl">{s.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
