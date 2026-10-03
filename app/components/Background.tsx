import Image from "next/image";
import Link from "next/link";
import { asset, site } from "@/lib/data";
import CountUp from "./CountUp";
import Section from "./Section";

export default function Background() {
  const { education: edu, recognition } = site;

  return (
    <Section id="background" title="Education and awards">
      <div className="pad grid grid-cols-1 gap-12 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-10">
        <div>
          <p className="font-mono text-xs text-muted">{edu.period}</p>
          <h3 className="mt-2 text-xl font-medium tracking-tight">{edu.school}</h3>
          <p className="mt-1 text-sm text-muted">{edu.major}</p>

          <p className="mt-8 flex items-baseline gap-2">
            <span className="bg-gradient-to-r from-primary-dark to-data bg-clip-text text-6xl font-medium tracking-tight text-transparent">
              <CountUp value={Number(edu.gpa)} decimals={2} />
            </span>
            <span className="text-muted">GPA out of {edu.gpa_scale}, cum laude</span>
          </p>

          <p className="mt-8 text-pretty leading-relaxed">
            {edu.description}{" "}
            <Link
              href="/project/knee-osteoarthritis-nasnetmobile"
              className="font-medium text-primary-dark underline decoration-primary/40 underline-offset-4 hover:decoration-primary-dark"
            >
              Read about the thesis
            </Link>
            .
          </p>
        </div>

        <ul className="space-y-6">
          {recognition.map((r, i) => (
            <li key={r.title} className="group flex gap-5">
              <div
                className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-white shadow-[0_8px_20px_-12px_rgba(15,42,68,0.4)] transition-transform duration-500 ease-out-expo group-hover:scale-110 ${i % 2 ? "group-hover:rotate-3" : "group-hover:-rotate-3"}`}
              >
                <Image src={asset(r.image_file)} alt="" fill sizes="4rem" className="object-cover" />
              </div>
              <div className="min-w-0">
                <p className="font-medium leading-snug">{r.title}</p>
                <p className="mt-1 text-pretty text-sm text-muted">{r.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
