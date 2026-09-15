"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { ExternalLink, Eye, X, ArrowUpRight } from "lucide-react";

export interface Project {
  title: string;
  category: string;
  description: string;
  tags: string[];
  link?: string;
  image_file: string;
}

interface ProjectCatalogProps {
  projects: Project[];
}

const CATEGORY_STYLES: Record<string, { badge: string; accent: string }> = {
  "Data Science": { badge: "bg-emerald", accent: "var(--emerald)" },
  "Software": { badge: "bg-sky", accent: "var(--primary)" },
  "Certification": { badge: "bg-amber", accent: "var(--amber)" },
};

export default function ProjectCatalog({ projects }: ProjectCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories = ["All", "Data Science", "Software", "Certification"];

  const filteredProjects = selectedCategory === "All"
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  return (
    <div className="section-padding">
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "3rem" }}>
        <h3 className="section-title" style={{ marginBottom: "1.5rem" }}>Curated Engineering & Data Work</h3>
        
        {/* Animated Category Filter Pills */}
        <div 
          style={{ 
            display: "inline-flex", 
            gap: "0.5rem", 
            padding: "0.4rem", 
            background: "rgba(241, 245, 249, 0.8)", 
            backdropFilter: "blur(8px)", 
            borderRadius: "9999px",
            border: "1px solid rgba(226, 232, 240, 0.8)",
            boxShadow: "inset 0 1px 2px rgba(0, 0, 0, 0.04)"
          }}
        >
          {categories.map((category) => {
            const isActive = selectedCategory === category;
            const count = category === "All" ? projects.length : projects.filter(p => p.category === category).length;
            
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                style={{
                  position: "relative",
                  padding: "0.5rem 1.1rem",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  color: isActive ? "#0f172a" : "#64748b",
                  transition: "color 0.2s ease",
                  borderRadius: "9999px",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  outline: "none"
                }}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeFilterPill"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    style={{
                      position: "absolute",
                      inset: 0,
                      backgroundColor: "#ffffff",
                      borderRadius: "9999px",
                      boxShadow: "0 2px 8px rgba(15, 23, 42, 0.08)",
                      zIndex: 0
                    }}
                  />
                )}
                <span style={{ position: "relative", zIndex: 1 }}>{category}</span>
                <span 
                  style={{ 
                    position: "relative", 
                    zIndex: 1, 
                    fontSize: "0.7rem", 
                    opacity: isActive ? 0.9 : 0.6,
                    padding: "0.1rem 0.4rem",
                    borderRadius: "999px",
                    background: isActive ? "rgba(14, 165, 233, 0.1)" : "rgba(100, 116, 139, 0.1)",
                    color: isActive ? "var(--primary)" : "inherit"
                  }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Animated Projects Grid */}
      <motion.div 
        layout
        className="projects-grid"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => {
            const style = CATEGORY_STYLES[project.category] || { badge: "bg-sky", accent: "var(--primary)" };

            return (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                whileHover={{ y: -6 }}
                className="project-card"
                style={{ cursor: "pointer", display: "flex", flexDirection: "column" }}
              >
                <div 
                  className="project-image-container"
                  onClick={() => setActiveModalProject(project)}
                  style={{ position: "relative", overflow: "hidden" }}
                >
                  <img 
                    src={`/assets/${encodeURIComponent(project.image_file)}`} 
                    alt={project.title} 
                    className="project-image"
                    loading="lazy"
                  />
                  <div 
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "rgba(15, 23, 42, 0.25)",
                      backdropFilter: "blur(2px)",
                      opacity: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5rem",
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: "0.85rem",
                      transition: "opacity 0.2s ease"
                    }}
                    className="hover-overlay"
                  >
                    <Eye size={18} /> Quick Inspect
                  </div>
                </div>

                <div className="project-info" style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                    <span 
                      style={{ 
                        fontSize: "0.72rem", 
                        fontWeight: 700, 
                        textTransform: "uppercase", 
                        letterSpacing: "0.1em",
                        color: style.accent 
                      }}
                    >
                      {project.category}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveModalProject(project);
                      }}
                      title="Quick Inspect"
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "var(--text-muted)",
                        padding: "0.25rem",
                        display: "flex",
                        alignItems: "center"
                      }}
                    >
                      <Eye size={16} />
                    </button>
                  </div>

                  <h4 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: "0.75rem", lineHeight: 1.3 }}>
                    {project.title}
                  </h4>
                  
                  <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", marginBottom: "1.25rem", flexGrow: 1, lineHeight: 1.6 }}>
                    {project.description}
                  </p>
                  
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.5rem" }}>
                    {project.tags.map((tag) => (
                      <span key={tag} className={`tag ${style.badge}`} style={{ fontSize: "0.7rem", padding: "0.2rem 0.6rem" }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div style={{ display: "flex", gap: "0.5rem", marginTop: "auto" }}>
                    <button
                      onClick={() => setActiveModalProject(project)}
                      className="btn secondary-btn"
                      style={{ 
                        flex: 1, 
                        textAlign: "center", 
                        fontSize: "0.85rem", 
                        padding: "0.6rem 1rem", 
                        display: "inline-flex", 
                        alignItems: "center", 
                        justifyContent: "center",
                        gap: "0.4rem" 
                      }}
                    >
                      <Eye size={14} /> Quick View
                    </button>

                    <Link 
                      href={`/project/${encodeURIComponent(project.title)}`}
                      className="btn primary-btn"
                      style={{ 
                        padding: "0.6rem 0.9rem", 
                        fontSize: "0.85rem", 
                        display: "inline-flex", 
                        alignItems: "center", 
                        justifyContent: "center" 
                      }}
                      title="Full Case Study"
                    >
                      <ArrowUpRight size={16} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Interactive Modal / Quick Inspect Dialog */}
      <AnimatePresence>
        {activeModalProject && (
          <div 
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "1.5rem"
            }}
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalProject(null)}
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(15, 23, 42, 0.6)",
                backdropFilter: "blur(8px)"
              }}
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "760px",
                maxHeight: "90vh",
                overflowY: "auto",
                background: "#ffffff",
                borderRadius: "1.5rem",
                padding: "2rem",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                border: "1px solid rgba(226, 232, 240, 0.8)",
                zIndex: 10000
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
                <div>
                  <span 
                    style={{ 
                      fontSize: "0.75rem", 
                      fontWeight: 800, 
                      textTransform: "uppercase", 
                      letterSpacing: "0.15em",
                      color: CATEGORY_STYLES[activeModalProject.category]?.accent || "var(--primary)"
                    }}
                  >
                    {activeModalProject.category}
                  </span>
                  <h3 style={{ fontSize: "1.75rem", fontWeight: 800, marginTop: "0.25rem", color: "var(--text-main)" }}>
                    {activeModalProject.title}
                  </h3>
                </div>

                <button
                  onClick={() => setActiveModalProject(null)}
                  style={{
                    border: "none",
                    background: "rgba(241, 245, 249, 0.8)",
                    cursor: "pointer",
                    padding: "0.5rem",
                    borderRadius: "999px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--text-muted)"
                  }}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Media Preview */}
              <div 
                style={{ 
                  borderRadius: "1rem", 
                  overflow: "hidden", 
                  background: "#f8fafc", 
                  border: "1px solid #e2e8f0", 
                  marginBottom: "1.5rem",
                  maxHeight: "380px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <img 
                  src={`/assets/${encodeURIComponent(activeModalProject.image_file)}`}
                  alt={activeModalProject.title}
                  style={{ width: "100%", height: "auto", maxHeight: "380px", objectFit: "contain" }}
                />
              </div>

              {/* Description & Technical Breakdown */}
              <div style={{ marginBottom: "1.5rem" }}>
                <h5 style={{ fontSize: "0.85rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "0.5rem" }}>
                  Overview & Engineering Scope
                </h5>
                <p style={{ color: "var(--text-main)", fontSize: "1rem", lineHeight: 1.7 }}>
                  {activeModalProject.description}
                </p>
              </div>

              {/* Tags */}
              <div style={{ marginBottom: "2rem" }}>
                <h5 style={{ fontSize: "0.85rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "0.5rem" }}>
                  Technologies & Core Competencies
                </h5>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {activeModalProject.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className={`tag ${CATEGORY_STYLES[activeModalProject.category]?.badge || "bg-sky"}`}
                      style={{ fontSize: "0.8rem", padding: "0.3rem 0.8rem" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", gap: "1rem", borderTop: "1px solid #e2e8f0", paddingTop: "1.25rem" }}>
                <Link
                  href={`/project/${encodeURIComponent(activeModalProject.title)}`}
                  className="btn primary-btn"
                  style={{ flex: 1, textAlign: "center", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}
                >
                  Deep-Dive Case Study <ExternalLink size={16} />
                </Link>
                {activeModalProject.link && (
                  <a
                    href={activeModalProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn secondary-btn"
                    style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
                  >
                    Repository / Demo <ExternalLink size={16} />
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
