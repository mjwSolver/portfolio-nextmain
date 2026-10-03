import { Mail } from "lucide-react";
import { site } from "@/lib/data";
import CopyEmail from "./CopyEmail";
import { GitHubIcon, LinkedInIcon } from "./Icons";
import Section from "./Section";

export default function Contact() {
  const p = site.personal_info;

  return (
    <Section id="contact">
      <div className="pad">
        <div
          className="relative isolate overflow-hidden rounded-[2.5rem] px-6 py-16 text-center sm:px-12 sm:py-20"
          style={{
            background:
              "radial-gradient(60% 80% at 15% 0%, rgba(14,165,233,0.22), transparent 70%), radial-gradient(60% 80% at 90% 100%, rgba(16,185,129,0.2), transparent 70%), rgba(255,255,255,0.7)",
          }}
        >
          <h2 className="text-3xl font-medium tracking-[-0.02em] sm:text-5xl">Let&apos;s talk</h2>
          <p className="mx-auto mt-4 max-w-md text-pretty text-lg text-muted">
            Email is the best way to reach me. I&apos;m based in {p.location}.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-2.5">
            <a
              href={`mailto:${p.email}`}
              className="inline-flex h-12 items-center gap-2 rounded-full bg-ink px-6 font-medium text-white shadow-[0_10px_30px_-10px_rgba(15,42,68,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-dark"
            >
              <Mail size={17} aria-hidden="true" />
              {p.email}
            </a>
            <CopyEmail email={p.email} />
          </div>
          <div className="mt-6 flex items-center justify-center gap-6 text-sm font-medium text-muted">
            <a href={p.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-ink">
              <LinkedInIcon size={16} /> LinkedIn
            </a>
            <a href={p.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-ink">
              <GitHubIcon size={16} /> GitHub
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}
