import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { asset, getProject, site, toneOf } from "@/lib/data";
import { cn } from "@/lib/utils";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Section from "../../components/Section";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return site.projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
    openGraph: { title: project.title, description: project.subtitle, images: [asset(project.image_file)] },
  };
}

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const tone = toneOf(project.category);
  const index = site.projects.findIndex((p) => p.slug === slug);
  const next = site.projects[(index + 1) % site.projects.length];

  return (
    <>
      <Navbar />
      <main id="top" className="frame">
        <section className="relative isolate">
          <div className="pad pb-12 pt-10 sm:pt-14">
            <Link
              href="/#work"
              className="group inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-ink"
            >
              <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-0.5" />
              Back to projects
            </Link>

            <h1
              className="rise mt-10 max-w-3xl text-balance text-4xl font-medium leading-[1.08] tracking-[-0.03em] sm:text-5xl"
              style={delay(0)}
            >
              {project.title}
            </h1>
            <p className="rise mt-4 flex max-w-2xl gap-2.5 text-pretty text-lg text-muted" style={delay(80)}>
              <span className={cn("mt-[0.55rem] h-2.5 w-2.5 shrink-0 rounded-full", tone.dot)}>
                <span className="sr-only">{project.category} project:</span>
              </span>
              {project.subtitle}
            </p>
          </div>
        </section>

        <Section>
          <div className="pad py-8">
            <div
              className="rise surface relative aspect-[16/10] overflow-hidden"
              style={delay(160)}
            >
              <Image
                src={asset(project.image_file)}
                alt={`${project.title}: ${project.subtitle}`}
                fill
                preload
                sizes="(min-width: 76rem) 71rem, 100vw"
                className="object-contain p-4 sm:p-8"
              />
            </div>
          </div>
        </Section>

        <Section>
          <div className="grid grid-cols-1 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
            <div className="pad pb-2 pt-8 md:py-10">
              <h2 className="text-xl font-medium">About the project</h2>
              <p className="mt-2 text-sm text-muted">{project.tags.join(", ")}</p>
            </div>
            <div className="pad pb-10 pt-2 md:py-10">
              <p className="max-w-2xl text-pretty text-lg leading-relaxed">{project.description}</p>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 font-medium text-white transition-colors duration-300 hover:bg-primary-dark"
                >
                  {project.link_label}
                  <ArrowUpRight size={17} aria-hidden="true" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              )}
            </div>
          </div>
        </Section>

        <Section>
          <Link
            href={`/project/${next.slug}`}
            className="group mx-5 flex items-center justify-between gap-6 rounded-[1.75rem] bg-white/70 px-6 py-8 shadow-[0_1px_2px_rgba(15,42,68,0.06)] transition-colors hover:bg-white sm:mx-10 sm:px-8"
          >
            <span>
              <span className="block text-sm text-muted">Next project</span>
              <span className="mt-1 block text-2xl font-medium tracking-tight">{next.title}</span>
            </span>
            <ArrowRight
              size={20}
              aria-hidden="true"
              className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </Section>
      </main>
      <Footer />
    </>
  );
}
