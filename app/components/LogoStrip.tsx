import Image from "next/image";
import { asset, site } from "@/lib/data";
import { cn } from "@/lib/utils";
import LogoPhysics from "./LogoPhysics";

type Logo = {
  file: string;
  name: string;
  width?: number;
  height?: number;
  /** Show the name next to the mark (icon-only logos). */
  label?: boolean;
  /** White artwork that needs inverting on a light background. */
  invert?: boolean;
  /** Height in px for wordmarks that need more room to stay legible. */
  display_height?: number;
};

function Row({
  logos,
  label,
  duration,
  reverse,
}: {
  logos: Logo[];
  label: string;
  duration: string;
  reverse?: boolean;
}) {
  return (
    <div className="marquee-row overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <ul
        aria-label={label}
        className="marquee-track flex w-max items-center"
        style={
          {
            "--marquee-duration": duration,
            "--marquee-direction": reverse ? "reverse" : "normal",
          } as React.CSSProperties
        }
      >
        {[0, 1].map((copy) =>
          logos.map((logo) => {
            const wordmark = logo.label === false;
            return (
              <li key={`${copy}-${logo.file}`} aria-hidden={copy === 1 ? true : undefined} className="shrink-0 px-3">
                <button
                  type="button"
                  data-logo
                  tabIndex={copy === 1 ? -1 : undefined}
                  aria-label={`${logo.name}: click to knock it off the strip`}
                  className="flex cursor-pointer items-center gap-2.5 rounded-full px-4 py-1 text-[15px] font-medium text-muted opacity-75 grayscale transition duration-300 hover:text-ink hover:opacity-100 hover:grayscale-0 active:scale-95"
                >
                  <Image
                    src={asset(logo.file)}
                    alt={wordmark ? logo.name : ""}
                    width={logo.width ?? 24}
                    height={logo.height ?? 24}
                    className={cn("w-auto", wordmark ? "h-[22px]" : "h-6", logo.invert && "invert")}
                    style={logo.display_height ? { height: logo.display_height } : undefined}
                  />
                  {!wordmark && logo.name}
                </button>
              </li>
            );
          }),
        )}
      </ul>
    </div>
  );
}

/** Two drifting rows: where I've worked and studied, then the tools I use. Pauses on hover; click a logo to knock it off. */
export default function LogoStrip() {
  const { org_logos, tech_logos } = site.personal_info;

  return (
    <section aria-label="Organisations and tools" className="py-6">
      <LogoPhysics>
        <div className="space-y-4">
          <Row logos={org_logos} label="Organisations I have worked or studied with" duration="45s" />
          <Row logos={tech_logos} label="Tools I use" duration="55s" reverse />
        </div>
      </LogoPhysics>
    </section>
  );
}
