import { site } from "@/lib/data";
import { cn } from "@/lib/utils";
import Pill from "./Pill";
import Section from "./Section";

const DOT: Record<string, string> = {
  data: "bg-data",
  strategy: "bg-strategy",
  software: "bg-software",
};

export default function Skills() {
  const { pillars } = site.personal_info;

  return (
    <Section id="skills" title="Skills">
      <div className="pad grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-10">
        {pillars.map((pillar) => (
          <div key={pillar.id}>
            <h3 className="flex items-center gap-2.5 text-lg font-medium">
              <span className={cn("h-2.5 w-2.5 rounded-full", DOT[pillar.id])} aria-hidden="true" />
              {pillar.name}
            </h3>
            <ul className="mt-5 space-y-2">
              {pillar.capabilities.map((c) => (
                <li key={c} className="text-pretty leading-snug">
                  {c}
                </li>
              ))}
            </ul>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${pillar.name} tools`}>
              {pillar.tools.map((t) => (
                <Pill key={t}>{t}</Pill>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
