import Reveal from "./Reveal";

type SectionHeadingProps = {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "split";
};

export default function SectionHeading({ index, eyebrow, title, description, align = "split" }: SectionHeadingProps) {
  return (
    <Reveal
      className={
        align === "split"
          ? "mb-12 grid gap-6 md:mb-16 md:grid-cols-[1fr_minmax(0,24rem)] md:items-end md:gap-12"
          : "mb-12 max-w-2xl md:mb-16"
      }
    >
      <div>
        <p className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-muted">
          <span className="text-primary-dark">{index}</span>
          <span className="h-px w-8 bg-line" aria-hidden="true" />
          {eyebrow}
        </p>
        <h2 className="text-balance text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl md:text-[2.75rem]">
          {title}
        </h2>
      </div>
      {description && <p className="text-pretty leading-relaxed text-muted md:pb-1">{description}</p>}
    </Reveal>
  );
}
