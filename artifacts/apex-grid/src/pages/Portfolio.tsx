import { Link } from "wouter";
import project1 from "@assets/generated_images/project-1.jpg";
import project2 from "@assets/generated_images/project-2.jpg";
import project3 from "@assets/generated_images/project-3.jpg";
import portfolioBg from "@assets/generated_images/portfolio-bg.jpg";

export default function Portfolio() {
  const projects = [
    {
      id: 1,
      title: "Nexus Commercial Tower",
      category: "Mixed-Use High Rise",
      services: "Structural, MEP",
      image: project1,
      location: "Seattle, WA",
      description: "A 42-story tower requiring advanced seismic structural engineering and highly efficient HVAC routing through constrained plenum spaces."
    },
    {
      id: 2,
      title: "Veridian Data Center",
      category: "Industrial / Tech",
      services: "MEP, Fire Protection",
      image: project2,
      location: "Ashburn, VA",
      description: "Mission-critical MEP design featuring N+1 redundancy, advanced cooling distribution, and pre-action fire suppression systems."
    },
    {
      id: 3,
      title: "Highland Medical Campus",
      category: "Healthcare",
      services: "Civil, Structural",
      image: project3,
      location: "Denver, CO",
      description: "Complete site engineering including complex retaining walls, stormwater routing, and structural design for the main hospital wing."
    },
    {
      id: 4,
      title: "Aero Logistics Hub",
      category: "Industrial Warehouse",
      services: "Structural, Title 24",
      image: null,
      location: "Reno, NV",
      description: "A 500,000 sq ft logistics facility utilizing tilt-up concrete construction. Optimized for rapid deployment and energy efficiency."
    }
  ];

  return (
    <div className="flex flex-col">
      <section className="relative pt-40 pb-32 overflow-hidden bg-background border-b border-border">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-background/80 mix-blend-multiply z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" />
          {portfolioBg && (
            <img 
              src={portfolioBg} 
              alt="Engineering Portfolio" 
              className="w-full h-full object-cover opacity-40"
            />
          )}
        </div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-20">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-8">
              Proven <span className="text-muted-foreground">Execution</span>
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed max-w-2xl">
              We engineer structures that stand and systems that work. Review our selected portfolio of permitted, built projects across the country.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-card">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {projects.map((project) => (
              <div key={project.id} className="group cursor-pointer">
                <div className="aspect-[4/3] mb-6 overflow-hidden bg-background border border-border relative">
                  {project.image ? (
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100 mix-blend-lighten"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground font-mono text-sm uppercase tracking-widest bg-secondary/50">
                      Documentation Pending
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-background/90 backdrop-blur px-3 py-1 border border-primary/50 text-xs font-mono text-primary uppercase tracking-wider">
                    {project.category}
                  </div>
                </div>
                
                <h3 className="text-3xl font-display font-bold mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-4 text-xs font-mono uppercase tracking-widest text-foreground/60 p-4 border border-border bg-background">
                  <div className="flex flex-col gap-1 w-1/2">
                    <span className="text-muted-foreground/50">Services</span>
                    <span className="text-primary font-bold">{project.services}</span>
                  </div>
                  <div className="w-[1px] h-8 bg-border"></div>
                  <div className="flex flex-col gap-1">
                    <span className="text-muted-foreground/50">Location</span>
                    <span>{project.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-32 bg-background border-t border-border">
        <div className="container mx-auto px-4 md:px-8 text-center max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-8">We let our drawings do the talking.</h2>
          <p className="text-lg text-muted-foreground mb-10">
            For specific project examples relevant to your industry, please reach out. We maintain an extensive archive of permitted construction documents we can share under NDA.
          </p>
          <Link 
            href="/contact" 
            className="inline-flex h-14 px-8 border-2 border-primary text-primary font-bold text-sm uppercase tracking-wider items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all"
          >
            Request Full Case Studies
          </Link>
        </div>
      </section>
    </div>
  );
}