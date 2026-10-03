import Image from "next/image";
import { asset, site, toneOf } from "@/lib/data";
import { cn } from "@/lib/utils";
import CareerChart from "./CareerChart";
import LogoTile from "./LogoTile";
import Section from "./Section";

/** Current date as a decimal year. Evaluated at build time for the static page. */
function decimalYear(date = new Date()) {
  return date.getFullYear() + date.getMonth() / 12 + date.getDate() / 365;
}

export default function ExperienceTimeline() {
  const { timeline, experience } = site;
  const toolLogo = new Map(site.personal_info.tech_logos.map((t) => [t.name, t.file]));
  // SwiftUI ships with Swift, so it shares the Swift mark.
  toolLogo.set("SwiftUI", toolLogo.get("Swift") ?? "");

  return (
    <Section id="experience" title="Experience">
      <div className="pad">
        <CareerChart lanes={timeline.lanes} items={timeline.items} now={decimalYear()} />
      </div>

      <ol className="pad mt-16 space-y-12">
        {experience.map((exp) => {
          const tone = toneOf(exp.category);
          return (
            <li key={exp.company} className="grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-10">
              <div>
                <div className="flex items-start gap-4">
                  <LogoTile logo={exp.logo} size="lg" />
                  <div className="min-w-0">
                    <p className="font-mono text-xs text-muted">{exp.period}</p>
                    <h3 className="mt-1 text-xl font-medium tracking-tight">{exp.company}</h3>
                    <p className={cn("mt-1 text-sm font-medium", tone.text)}>{exp.role}</p>
                  </div>
                </div>
              </div>

              <div>
                <p className="max-w-2xl text-pretty leading-relaxed">{exp.description}</p>
                <ul className="mt-4 flex flex-wrap gap-2" aria-label={`Tools used at ${exp.company}`}>
                  {exp.stack.map((tool) => {
                    const file = toolLogo.get(tool) || undefined;
                    return (
                      <li
                        key={tool}
                        className="inline-flex items-center gap-1.5 rounded-full bg-white/80 py-1 pl-2 pr-3 text-sm shadow-[0_1px_2px_rgba(15,42,68,0.06)]"
                      >
                        {file ? (
                          <Image src={asset(file)} alt="" width={16} height={16} className="h-4 w-4 object-contain" />
                        ) : (
                          <span className="mx-1 h-1.5 w-1.5 rounded-full bg-slate-300" aria-hidden="true" />
                        )}
                        {tool}
                      </li>
                    );
                  })}
                </ul>

                {exp.images.length > 0 && (
                  <div className="mt-6 flex gap-3">
                    {exp.images.map((img, j) => (
                      <div
                        key={img}
                        className={cn(
                          "relative aspect-[4/3] w-1/2 max-w-52 overflow-hidden rounded-2xl bg-white shadow-[0_10px_30px_-15px_rgba(15,42,68,0.35)] transition-transform duration-500 ease-out-expo hover:scale-[1.04]",
                          j % 2 ? "hover:rotate-2" : "hover:-rotate-2",
                        )}
                      >
                        <Image
                          src={asset(img)}
                          alt={`${exp.company}: ${img.replace(/\.\w+$/, "")}`}
                          fill
                          sizes="13rem"
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
