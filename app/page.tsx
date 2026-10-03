import data from "./data.json";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProjectCatalog from "./components/ProjectCatalog";
import SectionHeading from "./components/SectionHeading";
import Reveal from "./components/Reveal";
import { Award, GraduationCap, Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "./components/Icons";

export default function Home() {
  const { personal_info, projects, experience, recognition, education } = data;

  return (
    <div className="relative min-h-screen text-ink">
      <Navbar />

      <main>
        {/* Hero Section */}
        <Hero />

        {/* Tech Logos Marquee */}
        <section className="border-y border-line bg-white/50 py-7 backdrop-blur-sm overflow-hidden" aria-label="Technologies">
          <div className="container-page mask-fade-x overflow-hidden">
            <div className="flex w-max items-center gap-12 animate-marquee">
              {[...personal_info.tech_logos, ...personal_info.tech_logos, ...personal_info.tech_logos].map((logo, idx) => (
                <div key={idx} className="flex items-center gap-3 grayscale opacity-70 transition hover:grayscale-0 hover:opacity-100">
                  <img
                    src={`/assets/${encodeURIComponent(logo.file)}`}
                    alt={logo.name}
                    className="h-7 w-auto object-contain max-w-[110px]"
                    loading="lazy"
                  />
                  <span className="font-mono text-xs uppercase tracking-wider text-muted hidden sm:inline">{logo.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 01 Expertise Section */}
        <section id="expertise" className="container-page py-24 scroll-mt-20">
          <SectionHeading
            index="01"
            eyebrow="Expertise"
            title={
              <>
                End-to-end craft across{" "}
                <span className="bg-gradient-to-r from-primary-dark via-primary to-bridge bg-clip-text text-transparent">
                  data & software.
                </span>
              </>
            }
            description="From raw warehouse tables and deep-learning training scripts to production-grade interfaces users rely on daily."
          />

          <div className="grid gap-8 lg:grid-cols-2">
            {personal_info.pillars.map((pillar, i) => (
              <Reveal key={pillar.id} delay={i * 120}>
                <div className="flex h-full flex-col justify-between rounded-3xl border border-line bg-white/80 p-8 shadow-sm backdrop-blur transition hover:shadow-md">
                  <div>
                    <span className="inline-block rounded-full bg-primary-light px-3 py-1 font-mono text-xs font-semibold text-primary-dark uppercase tracking-wider mb-4">
                      {pillar.eyebrow}
                    </span>
                    <h3 className="text-2xl font-semibold tracking-tight text-ink mb-4">{pillar.title}</h3>
                    <ul className="space-y-2.5 mb-6 text-muted">
                      {pillar.capabilities.map((cap, cIdx) => (
                        <li key={cIdx} className="flex items-start gap-2.5 text-sm leading-relaxed">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="border-t border-line/70 pt-5">
                    <p className="font-mono text-xs uppercase tracking-wider text-muted mb-3">Core Stack</p>
                    <div className="flex flex-wrap gap-2">
                      {pillar.tools.map((tool) => (
                        <span key={tool} className="rounded-full border border-line bg-slate-50/80 px-3 py-1 text-xs font-medium text-slate-700">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Complementary Skills / Also */}
          {personal_info.also && personal_info.also.length > 0 && (
            <Reveal delay={240}>
              <div className="mt-8 rounded-2xl border border-dashed border-line bg-white/40 p-6 flex flex-wrap items-center justify-between gap-4">
                <span className="font-mono text-xs uppercase tracking-wider text-muted">Strategy & Execution:</span>
                <div className="flex flex-wrap gap-2">
                  {personal_info.also.map((item) => (
                    <span key={item} className="rounded-full bg-slate-100/90 px-3 py-1 text-xs font-medium text-slate-600">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          )}
        </section>

        {/* 02 Work / Projects Section */}
        <section id="work" className="container-page py-24 scroll-mt-20">
          <SectionHeading
            index="02"
            eyebrow="Selected Work"
            title="Curated Engineering & Research"
            description="A selection of machine learning research papers, production platforms, and software applications."
          />

          {/* Currently Building Callout */}
          {personal_info.currently_building && personal_info.currently_building.length > 0 && (
            <div className="mb-14 grid gap-6 md:grid-cols-2">
              {personal_info.currently_building.map((item, bIdx) => (
                <Reveal key={bIdx} delay={bIdx * 100}>
                  <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-white via-white to-sky-50/40 p-6 shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="relative flex h-2 w-2" aria-hidden="true">
                        <span className="absolute inline-flex h-full w-full animate-ping-slow rounded-full bg-primary" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                      </span>
                      <span className="font-mono text-xs uppercase tracking-wider text-primary-dark font-semibold">Active Focus</span>
                      <span className="text-xs text-muted">· {item.context}</span>
                    </div>
                    <h4 className="text-lg font-semibold text-ink mb-2">{item.title}</h4>
                    <p className="text-sm text-muted leading-relaxed">{item.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          )}

          {/* Interactive Project Catalog */}
          <ProjectCatalog projects={projects} />
        </section>

        {/* 03 Experience Section */}
        <section id="experience" className="container-page py-24 scroll-mt-20">
          <SectionHeading
            index="03"
            eyebrow="Career"
            title="Professional Journey"
            description="Track record across enterprise consulting, mobile engineering programs, and international study."
          />

          <div className="relative space-y-8 before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-line md:before:left-4">
            {experience.map((exp, eIdx) => (
              <Reveal key={eIdx} delay={eIdx * 120}>
                <div className="relative pl-10 md:pl-12">
                  <span className="absolute left-1.5 top-1.5 h-4 w-4 -translate-x-1/2 rounded-full border-4 border-canvas bg-primary md:left-2" />
                  <div className="rounded-3xl border border-line bg-white/80 p-8 shadow-sm backdrop-blur">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <h4 className="text-xl font-bold text-ink">{exp.company}</h4>
                      <span className="font-mono text-xs text-muted">{exp.period}</span>
                    </div>
                    <p className="text-sm font-medium text-primary-dark mb-4">{exp.role}</p>
                    <p className="text-sm leading-relaxed text-muted mb-6">{exp.description}</p>

                    {exp.stack && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {exp.stack.map((tech) => (
                          <span key={tech} className="rounded-md border border-line bg-slate-50 px-2.5 py-0.5 text-xs text-slate-600">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    {exp.images && exp.images.length > 0 && (
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                        {exp.images.map((img, i) => (
                          <div key={i} className="group relative overflow-hidden rounded-xl border border-line bg-slate-100 aspect-[16/10]">
                            <img
                              src={`/assets/${encodeURIComponent(img)}`}
                              alt={exp.company}
                              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                              loading="lazy"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* 04 About & Background Section */}
        <section id="about" className="container-page py-24 scroll-mt-20">
          <SectionHeading
            index="04"
            eyebrow="Background"
            title="Education & Key Wins"
            description="Academic foundations, international scholarships, and national competitions."
          />

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Education Card */}
            <Reveal className="lg:col-span-1">
              <div className="h-full rounded-3xl border border-line bg-white/80 p-8 shadow-sm backdrop-blur flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-primary-dark mb-4">
                    <GraduationCap size={22} />
                    <span className="font-mono text-xs uppercase tracking-wider font-semibold">Education</span>
                  </div>
                  <h4 className="text-xl font-bold text-ink mb-1">{education.school}</h4>
                  <p className="text-sm text-primary font-medium mb-4">{education.major}</p>
                  <p className="font-mono text-xs text-muted mb-6">{education.period}</p>
                  <p className="text-sm leading-relaxed text-muted mb-6">{education.description}</p>
                </div>
                <div className="border-t border-line pt-4 grid grid-cols-2 gap-4">
                  <div>
                    <span className="block font-mono text-[11px] uppercase tracking-wider text-muted">GPA</span>
                    <span className="text-2xl font-bold text-ink">{education.gpa} <span className="text-xs font-normal text-muted">/ {education.gpa_scale}</span></span>
                  </div>
                  <div>
                    <span className="block font-mono text-[11px] uppercase tracking-wider text-muted">Status</span>
                    <span className="text-2xl font-bold text-data">{education.status}</span>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Recognition & Awards Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
              {recognition.map((item, idx) => (
                <Reveal key={idx} delay={idx * 80}>
                  <div className="flex h-full flex-col justify-between rounded-2xl border border-line bg-white/80 p-6 shadow-sm backdrop-blur">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="rounded-full bg-amber-50 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-award uppercase tracking-wider">
                          {item.type}
                        </span>
                        <Award size={16} className="text-award" />
                      </div>
                      <h5 className="text-base font-bold text-ink mb-2">{item.title}</h5>
                      <p className="text-xs leading-relaxed text-muted mb-4">{item.description}</p>
                    </div>
                    {item.image_file && (
                      <div className="overflow-hidden rounded-xl border border-line bg-slate-50 h-32 w-full mt-2">
                        <img
                          src={`/assets/${encodeURIComponent(item.image_file)}`}
                          alt={item.title}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Contact / Footer Section */}
        <footer id="contact" className="border-t border-line bg-white/70 py-16 backdrop-blur">
          <div className="container-page flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-primary font-semibold mb-1">Let&apos;s Connect</p>
              <h3 className="text-2xl font-bold text-ink">{personal_info.name}</h3>
              <p className="text-sm text-muted mt-1">{personal_info.headline}</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${personal_info.email}`}
                className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-white transition hover:bg-primary-dark"
              >
                <Mail size={16} />
                <span>{personal_info.email}</span>
              </a>
              <a
                href={personal_info.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white text-ink transition hover:border-slate-400"
              >
                <GitHubIcon />
              </a>
              <a
                href={personal_info.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white text-ink transition hover:border-slate-400"
              >
                <LinkedInIcon />
              </a>
            </div>
          </div>
          <div className="container-page mt-12 border-t border-line/60 pt-6 text-center font-mono text-xs text-muted">
            © {new Date().getFullYear()} {personal_info.name} · Built with Next.js & Tailwind CSS
          </div>
        </footer>
      </main>
    </div>
  );
}
