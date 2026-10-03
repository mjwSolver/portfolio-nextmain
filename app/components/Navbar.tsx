"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Expertise", id: "expertise" },
  { label: "Work", id: "work" },
  { label: "Experience", id: "experience" },
  { label: "About", id: "about" },
] as const;

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [active, setActive] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Scroll-spy via IntersectionObserver (no layout reads on every scroll event).
  useEffect(() => {
    if (!isHome) return;
    const sections = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(
      (el): el is HTMLElement => el !== null,
    );

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));

    // Clear highlight while in the hero.
    const hero = document.getElementById("top");
    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setActive("");
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    if (hero) heroObserver.observe(hero);

    return () => {
      observer.disconnect();
      heroObserver.disconnect();
    };
  }, [isHome]);

  // Elevated style once the page is scrolled; passive + rAF-free boolean.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const href = (id: string) => (isHome ? `#${id}` : `/#${id}`);

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4">
      <nav
        aria-label="Primary"
        className={cn(
          "mx-auto flex max-w-5xl items-center justify-between gap-2 rounded-full border py-2 pl-2 pr-2 backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-500",
          scrolled || open
            ? "border-line bg-white/80 shadow-[0_8px_30px_-12px_rgba(11,19,36,0.18)]"
            : "border-transparent bg-white/40",
        )}
      >
        <Link
          href={isHome ? "#top" : "/"}
          className="group flex items-center gap-2.5 rounded-full py-1 pl-1 pr-3"
          onClick={() => setOpen(false)}
        >
          <span className="relative grid h-8 w-8 place-items-center rounded-full bg-ink font-mono text-[11px] font-semibold tracking-tight text-white transition-transform duration-500 ease-out-expo group-hover:rotate-[-8deg]">
            MJ
            <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-primary" />
          </span>
          <span className="hidden text-sm font-semibold tracking-tight sm:inline">Marcell J. Wiradinata</span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = active === link.id;
            return (
              <li key={link.id}>
                <a
                  href={href(link.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "relative isolate block rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300",
                    isActive ? "text-ink" : "text-muted hover:text-ink",
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full bg-primary-light/80"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-1.5">
          <a
            href={href("contact")}
            className="hidden rounded-full bg-ink px-4 py-2 text-sm font-medium text-white transition-colors duration-300 hover:bg-primary-dark sm:inline-block"
          >
            Get in touch
          </a>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full text-ink transition-colors hover:bg-ink/5 md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="mx-auto mt-2 max-w-5xl origin-top rounded-3xl border border-line bg-white/95 p-2 shadow-[0_20px_40px_-20px_rgba(11,19,36,0.25)] backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col">
              {[...NAV_LINKS, { label: "Contact", id: "contact" }].map((link) => (
                <li key={link.id}>
                  <a
                    href={href(link.id)}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center justify-between rounded-2xl px-4 py-3 text-base font-medium transition-colors hover:bg-canvas",
                      active === link.id ? "text-primary-dark" : "text-ink",
                    )}
                  >
                    {link.label}
                    <span className="font-mono text-xs text-muted">#{link.id}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
