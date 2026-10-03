import { site } from "@/lib/data";

export default function Footer({ topHref = "#top" }: { topHref?: string }) {
  return (
    <footer className="frame">
      <div className="pad flex items-center justify-between gap-4 pb-10 text-sm text-muted">
        <p>
          © {new Date().getFullYear()} {site.personal_info.name}
        </p>
        <a href={topHref} className="transition-colors hover:text-ink">
          Back to top
        </a>
      </div>
    </footer>
  );
}
