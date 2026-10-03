import { site } from "@/lib/data";
import { DragBars, McpPlayground } from "./BuildingVisuals";
import Section from "./Section";

const TOYS = [DragBars, McpPlayground];

export default function Building() {
  const items = site.personal_info.currently_building;

  return (
    <Section id="building" title="Currently building">
      <div className="pad grid grid-cols-1 gap-6 md:grid-cols-2">
        {items.map((item, i) => {
          const Toy = TOYS[i];
          return (
            <article key={item.title} className="surface flex flex-col p-2">
              <div className="px-5 pb-6 pt-5">
                <p className="flex items-center gap-2 text-sm text-muted">
                  <span className="relative flex h-2 w-2" aria-hidden="true">
                    <span className="absolute inline-flex h-full w-full animate-ping-slow rounded-full bg-data" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-data" />
                  </span>
                  In progress
                </p>
                <h3 className="mt-3 text-xl font-medium tracking-tight">{item.title}</h3>
                <p className="mt-0.5 text-sm text-primary-dark">{item.context}</p>
                <p className="mt-3 max-w-md text-pretty text-muted">{item.description}</p>
              </div>
              <div className="mt-auto rounded-[1.4rem] bg-white">
                <Toy />
              </div>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
