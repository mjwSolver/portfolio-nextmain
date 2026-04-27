import data from "../../data.json";
import Link from "next/link";

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const decodedTitle = decodeURIComponent(slug);
  const project = data.projects.find(p => p.title === decodedTitle);

  if (!project) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '2rem' }}>Project not found</h2>
        <Link href="/" className="btn primary-btn">Back to Home</Link>
      </div>
    );
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Data Science': return 'emerald';
      case 'Software': return 'sky';
      case 'Certification': return 'amber';
      default: return 'slate';
    }
  };

  const color = getCategoryColor(project.category);

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '6rem 2rem' }}>
      <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, color: 'var(--text-muted)', textDecoration: 'none', marginBottom: '4rem', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.1em' }}>
        ← Back to Home
      </Link>
      
      <div style={{ background: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(15px)', borderRadius: '2rem', padding: '4rem', border: '1px solid rgba(255, 255, 255, 0.5)', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)' }}>
        <div style={{ marginBottom: '4rem' }}>
          <span className={`tag bg-${color}`} style={{ padding: '0.5rem 1.25rem', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '2rem' }}>
            {project.category}
          </span>
          <h1 style={{ fontSize: '4.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '2rem', lineHeight: 1.1 }}>
            {project.title}
          </h1>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            {project.tags.map(tag => (
              <span key={tag} className={`tag bg-${color}`} style={{ background: 'white', color: `var(--${color})`, border: '1px solid #e2e8f0' }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div style={{ background: '#f1f5f9', padding: '3rem', borderRadius: '2rem', marginBottom: '4rem', boxShadow: 'inset 0 2px 4px 0 rgba(0,0,0,0.05)' }}>
          <img 
            src={`/assets/${encodeURIComponent(project.image_file)}`} 
            alt={project.title} 
            style={{ width: '100%', height: 'auto', maxHeight: '600px', objectFit: 'contain', borderRadius: '1rem', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
          />
        </div>

        <div style={{ maxWidth: '800px' }}>
          <h3 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1.5rem' }}>Project Overview</h3>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '4rem' }}>
            {project.description}
          </p>
        </div>

        {project.link && (
          <div style={{ padding: '4rem', borderRadius: '2.5rem', background: `rgba(var(--${color}-rgb, 14, 165, 233), 0.05)`, border: '1px solid rgba(0,0,0,0.05)', textAlign: 'center' }}>
            <h3 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1.5rem' }}>External Resources</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', maxWidth: '500px', margin: '0 auto 2.5rem auto' }}>
              Explore the full publication or external repository to see the complete work and research behind this project.
            </p>
            <a 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`btn primary-btn`}
              style={{ background: `var(--${color}, #0ea5e9)`, padding: '1rem 3rem', fontSize: '1.1rem' }}
            >
              Open Official Resource
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
