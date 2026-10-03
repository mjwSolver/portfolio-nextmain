import Image from "next/image";
import { asset, site } from "@/lib/data";
import { cn } from "@/lib/utils";

type Logo = {
  file: string;
  name: string;
  width?: number;
  height?: number;
  /** Show the name next to the mark (icon-only logos). */
  label?: boolean;
  /** White artwork that needs inverting on a light background. */
  invert?: boolean;
};

function Row({ logos, label, duration, reverse }: { logos: Logo[]; label: string; duration: string; reverse?: boolean }) {
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
              <li
                key={`${copy}-${logo.file}`}
                aria-hidden={copy === 1 ? true : undefined}
                className="flex shrink-0 items-center gap-2.5 px-7 text-[15px] font-medium text-muted opacity-75 grayscale transition duration-300 hover:text-ink hover:opacity-100 hover:grayscale-0"
              >
                <Image
                  src={asset(logo.file)}
                  alt={wordmark ? logo.name : ""}
                  width={logo.width ?? 24}
                  height={logo.height ?? 24}
                  className={cn("w-auto", wordmark ? "h-[22px]" : "h-6", logo.invert && "invert")}
                />
                {!wordmark && logo.name}
              </li>
            );
          }),
        )}
      </ul>
    </div>
  );
}

/** Two drifting rows: where I've worked and studied, then the tools I use. Pauses on hover. */
export default function LogoStrip() {
  const { org_logos, tech_logos } = site.personal_info;

  return (
    <section aria-label="Organisations and tools" className="space-y-5 py-6">
      <Row logos={org_logos} label="Organisations I have worked or studied with" duration="45s" />
      <Row logos={tech_logos} label="Tools I use" duration="55s" reverse />
    </section>
  );
}
