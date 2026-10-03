import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  title?: string;
  description?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
};

export default function Section({ id, title, description, className, children }: SectionProps) {
  return (
    <section id={id} className={cn("relative py-16 sm:py-24", className)}>
      {title && (
        <div className="pad mb-10 sm:mb-12">
          <h2 className="text-3xl font-medium tracking-[-0.02em] sm:text-4xl">{title}</h2>
          {description && <p className="mt-3 max-w-2xl text-pretty text-lg text-muted">{description}</p>}
        </div>
      )}
      {children}
    </section>
  );
}
