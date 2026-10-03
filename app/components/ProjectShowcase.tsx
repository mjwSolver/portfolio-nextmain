"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/data";
import { asset, toneOf } from "@/lib/ui";
import { cn } from "@/lib/utils";

export default function ProjectShowcase({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState(0);
  const current = projects[active];

  return (
    <div className="pad grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      <ul className="space-y-1">
        {projects.map((project, i) => {
          const tone = toneOf(project.category);
          const isActive = i === active;
          return (
            <li key={project.slug}>
              <Link
                href={`/project/${project.slug}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className="relative isolate flex items-center gap-4 rounded-2xl px-4 py-4"
              >
                {isActive && (
                  <motion.span
                    layoutId="project-active"
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 hidden rounded-2xl bg-white shadow-[0_10px_30px_-18px_rgba(15,42,68,0.35)] md:block"
                    transition={{ type: "spring", stiffness: 380, damping: 36 }}
                  />
                )}

                <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-xl bg-white shadow-sm md:hidden">
                  <Image src={asset(project.image_file)} alt="" fill sizes="5rem" className="object-cover object-top" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-2.5">
                    <span className={cn("h-2 w-2 shrink-0 rounded-full", tone.dot)}>
                      <span className="sr-only">{project.category} project:</span>
                    </span>
                    <span className="truncate text-lg font-medium">{project.title}</span>
                  </p>
                  <p className="mt-0.5 line-clamp-2 text-sm text-muted md:pl-[1.125rem]">{project.subtitle}</p>
                </div>

                <ArrowRight
                  size={18}
                  aria-hidden="true"
                  className={cn(
                    "shrink-0 text-muted transition-[opacity,transform] duration-300",
                    isActive ? "md:translate-x-0 md:opacity-100" : "md:-translate-x-1 md:opacity-0",
                  )}
                />
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="hidden md:block">
        <div className="sticky top-24">
          <div className="surface p-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.35rem] bg-white">
              {projects.map((project, i) => (
                <Image
                  key={project.slug}
                  src={asset(project.image_file)}
                  alt={i === active ? `${project.title}: ${project.subtitle}` : ""}
                  fill
                  sizes="(min-width: 76rem) 40rem, 55vw"
                  className={cn(
                    "object-cover object-top transition-[opacity,transform] duration-700 ease-out-expo",
                    i === active ? "scale-100 opacity-100" : "scale-[1.03] opacity-0",
                  )}
                />
              ))}
            </div>
          </div>

          <div className="mt-6 min-h-[9rem] px-2">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.slug}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25 }}
              >
                <p className="line-clamp-3 text-pretty text-muted">{current.description}</p>
                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium">
                  <Link
                    href={`/project/${current.slug}`}
                    className="text-primary-dark underline decoration-primary/40 underline-offset-4 hover:decoration-primary-dark"
                  >
                    Open project page
                  </Link>
                  {current.link && (
                    <a
                      href={current.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-primary-dark underline decoration-primary/40 underline-offset-4 hover:decoration-primary-dark"
                    >
                      {current.link_label}
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
