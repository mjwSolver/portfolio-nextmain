import { ArrowRight } from "lucide-react";
import { site } from "@/lib/data";
import HeroNotebook from "./HeroNotebook";
import { GitHubIcon, LinkedInIcon } from "./Icons";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

export default function Hero() {
  const { personal_info: p } = site;

  return (
    <section id="top" className="pad pb-16 pt-14 sm:pt-20 lg:pb-24 lg:pt-24">
      <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[1fr_1.05fr] lg:gap-12">
        <div>
          <h1>
            <span className="sr-only">
              {p.name}, {p.title}.{" "}
            </span>
            <span
              className="rise block text-balance text-[2.75rem] font-medium leading-[1.02] tracking-[-0.035em] sm:text-6xl lg:text-[4.25rem]"
              style={delay(0)}
            >
              Data science,
              <br />
              shipped as{" "}
              <span className="bg-gradient-to-r from-primary-dark via-primary to-data bg-clip-text text-transparent">
                software.
              </span>
            </span>
          </h1>

          <p className="rise mt-7 max-w-xl text-pretty text-lg leading-relaxed text-muted" style={delay(100)}>
            {p.bio}
          </p>

          <div className="rise mt-9 flex flex-wrap items-center gap-2.5" style={delay(200)}>
            <a
              href="#work"
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-ink px-6 font-medium text-white shadow-[0_10px_30px_-10px_rgba(15,42,68,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-dark"
            >
              See projects
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
            <a
              href="#contact"
              className="inline-flex h-12 items-center rounded-full bg-white/80 px-6 font-medium shadow-[0_1px_2px_rgba(15,42,68,0.06)] backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
            >
              Get in touch
            </a>
            <a
              href={p.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="grid h-12 w-12 place-items-center rounded-full bg-white/80 shadow-[0_1px_2px_rgba(15,42,68,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:text-primary-dark"
            >
              <GitHubIcon />
            </a>
            <a
              href={p.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="grid h-12 w-12 place-items-center rounded-full bg-white/80 shadow-[0_1px_2px_rgba(15,42,68,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:text-primary-dark"
            >
              <LinkedInIcon />
            </a>
          </div>
        </div>

        <HeroNotebook />
      </div>
    </section>
  );
}
