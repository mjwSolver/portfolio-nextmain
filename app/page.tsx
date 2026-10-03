import { site } from "@/lib/data";
import Background from "./components/Background";
import Building from "./components/Building";
import Contact from "./components/Contact";
import ExperienceTimeline from "./components/ExperienceTimeline";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import LogoStrip from "./components/LogoStrip";
import Navbar from "./components/Navbar";
import ProjectShowcase from "./components/ProjectShowcase";
import Section from "./components/Section";
import Skills from "./components/Skills";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="frame">
        <Hero />
        <LogoStrip />
        <Building />
        <Section id="work" title="Projects">
          <ProjectShowcase projects={site.projects} />
        </Section>
        <ExperienceTimeline />
        <Skills />
        <Background />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
