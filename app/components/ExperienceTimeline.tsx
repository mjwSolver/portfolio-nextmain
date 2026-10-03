import Image from "next/image";
import { asset, site, toneOf } from "@/lib/data";
import { cn } from "@/lib/utils";
import CareerChart from "./CareerChart";
import Section from "./Section";

/** Current date as a decimal year. Evaluated at build time for the static page. */
function decimalYear(date = new Date()) {
  return date.getFullYear() + date.getMonth() / 12 + date.getDate() / 365;
}

export default function ExperienceTimeline() {
  const { timeline, experience } = site;

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
                <p className="font-mono text-xs text-muted">{exp.period}</p>
                <h3 className="mt-2 text-xl font-medium tracking-tight">{exp.company}</h3>
                <p className={cn("mt-1 text-sm font-medium", tone.text)}>{exp.role}</p>
              </div>

              <div>
                <p className="max-w-2xl text-pretty leading-relaxed">{exp.description}</p>
                <p className="mt-3 text-sm text-muted">Tools: {exp.stack.join(", ")}</p>

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
