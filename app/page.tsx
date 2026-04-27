import data from "./data.json";
import Link from "next/link";

export default function Home() {
  const { personal_info, projects, experience, achievements, education } = data;

  const groupedProjects = projects.reduce((acc, project) => {
    const category = project.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(project);
    return acc;
  }, {} as Record<string, typeof projects>);

  const categories = ["Data Science", "Software", "Certification"];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Data Science': return 'emerald';
      case 'Software': return 'sky';
      case 'Certification': return 'amber';
      default: return 'slate';
    }
  };

  return (
    <div className="portfolio-container">
      <nav className="navbar">
        <div className="nav-content">
          <Link href="/" className="nav-logo">MJW.</Link>
          <div className="nav-links">
            <a href="#active">Building</a>
            <a href="#experience">Experience</a>
            <a href="#projects">Projects</a>
            <a href="#skills">Skills</a>
          </div>
        </div>
      </nav>

      <header className="hero-section">
        <div>
          <h1 className="name-title">{personal_info.name}</h1>
          <h2 className="role-subtitle">{personal_info.title}</h2>
          <p className="bio-text">{personal_info.bio}</p>
          <div className="social-links">
            <a href={personal_info.linkedin} target="_blank" rel="noopener noreferrer" className="btn primary-btn">LinkedIn</a>
            <a href={personal_info.github} target="_blank" rel="noopener noreferrer" className="btn secondary-btn">GitHub</a>
            <a href={`mailto:${personal_info.email}`} className="btn outline-btn">Email Me</a>
          </div>
        </div>
      </header>

      {/* Tech Logo Marquee */}
      <div className="logo-marquee-container">
        <div className="logo-marquee">
          {[...personal_info.tech_logos, ...personal_info.tech_logos, ...personal_info.tech_logos].map((logo, index) => (
            <img 
              key={index} 
              src={`/assets/${encodeURIComponent(logo)}`} 
              alt={logo.split('.')[0]} 
              className="marquee-logo" 
            />
          ))}
        </div>
      </div>

      <section id="active" className="section-padding" style={{ background: 'rgba(14, 165, 233, 0.03)', borderRadius: '3rem', padding: '4rem 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--primary)', letterSpacing: '0.2em' }}>Active Focus</span>
          <h3 style={{ fontSize: '2.5rem', fontWeight: 800, marginTop: '0.5rem' }}>Currently Building</h3>
        </div>
        <div className="active-projects-grid">
          {personal_info.currently_building.map((proj, index) => (
            <div key={index} className="active-project-card">
              <div className="pulse-dot"></div>
              <h4 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>{proj.title}</h4>
              <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>{proj.context}</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{proj.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="experience" className="section-padding">
        <h3 className="section-title">Professional Journey</h3>
        <div className="experience-timeline">
          {experience.map((exp, index) => (
            <div key={index} className="experience-item">
              <div className="exp-dot"></div>
              <div className="exp-content">
                <span className="exp-period">{exp.period}</span>
                <h4 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.25rem' }}>{exp.company}</h4>
                <h5 style={{ fontSize: '1.1rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '1.5rem' }}>{exp.role}</h5>
                <p style={{ marginBottom: '1.5rem' }}>{exp.description}</p>
                
                {exp.images && exp.images.length > 0 && (
                  <div className="exp-gallery">
                    {exp.images.map((img, i) => (
                      <img 
                        key={i} 
                        src={`/assets/${encodeURIComponent(img)}`} 
                        alt={exp.company} 
                        className="exp-img"
                      />
                    ))}
                  </div>
                )}
                
                <span className="tag bg-sky" style={{ marginTop: '1.5rem' }}>{exp.category}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="education" className="section-padding">
        <h3 className="section-title">Education</h3>
        <div className="education-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <h4 style={{ fontSize: '1.75rem', fontWeight: 800 }}>{education.school}</h4>
            <span style={{ fontWeight: 700, color: 'var(--primary)' }}>{education.period}</span>
          </div>
          <h5 style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>{education.major}</h5>
          <div className="edu-stats">
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>Grade</span>
              <span style={{ fontSize: '2rem', fontWeight: 800 }}>{education.score}</span>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>Status</span>
              <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--emerald)' }}>{education.status}</span>
            </div>
          </div>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>{education.description}</p>
        </div>
      </section>

      <section className="section-padding">
        <h3 className="section-title">Key Wins</h3>
        <div className="projects-grid">
          {achievements.map((win, index) => (
            <div key={index} className="project-card">
              <div className="project-image-container">
                <img src={`/assets/${encodeURIComponent(win.image_file)}`} alt={win.title} className="project-image" />
              </div>
              <div className="project-info">
                <span className="tag bg-amber" style={{ marginBottom: '1rem' }}>Achievement</span>
                <h4 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>{win.title}</h4>
                <p style={{ color: 'var(--text-muted)' }}>{win.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="projects">
        {categories.map((category) => {
          const categoryProjects = groupedProjects[category];
          if (!categoryProjects || categoryProjects.length === 0) return null;
          const color = getCategoryColor(category);

          return (
            <div key={category} className="section-padding">
              <h3 className="section-title">{category}</h3>
              <div className="projects-grid">
                {categoryProjects.map((project, index) => (
                  <div key={index} className="project-card">
                    <div className="project-image-container">
                      <img src={`/assets/${encodeURIComponent(project.image_file)}`} alt={project.title} className="project-image" />
                    </div>
                    <div className="project-info">
                      <span className={`tag text-${color}`} style={{ paddingLeft: 0, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{project.category}</span>
                      <h4 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1rem' }}>{project.title}</h4>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem', flexGrow: 1 }}>{project.description}</p>
                      
                      <div style={{ marginBottom: '2rem' }}>
                        {project.tags.map(tag => (
                          <span key={tag} className={`tag bg-${color}`}>{tag}</span>
                        ))}
                      </div>
                      
                      <Link 
                        href={`/project/${encodeURIComponent(project.title)}`}
                        className={`btn secondary-btn text-${color}`}
                        style={{ width: '100%', textAlign: 'center', borderColor: 'currentColor', marginTop: 'auto' }}
                      >
                        View Project Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      <section id="skills" className="section-padding">
        <h3 className="section-title">Technical Toolbox</h3>
        <div className="skills-grid">
          {Object.entries(personal_info.skills).map(([category, skills]) => (
            <div key={category} className="skill-category">
              <h4 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.5rem', borderBottom: '2px solid var(--primary-light)', display: 'inline-block', paddingBottom: '0.5rem' }}>{category}</h4>
              <div>
                {(skills as string[]).map(skill => (
                  <span key={skill} className="skill-pill">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer">
        <p style={{ fontWeight: 800 }}>© 2025 {personal_info.name}</p>
        <p style={{ marginTop: '0.5rem' }}>Crafted with Next.js & Tailwind v4</p>
      </footer>
    </div>
  );
}
