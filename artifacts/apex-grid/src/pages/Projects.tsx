import { Link } from "wouter";
import project1 from "@assets/generated_images/project-1.jpg";
import project2 from "@assets/generated_images/project-2.jpg";
import project3 from "@assets/generated_images/project-3.jpg";

export default function Projects() {
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
      <section className="pt-32 pb-20 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-primary"></div>
            <span className="font-mono text-sm tracking-widest text-primary uppercase">
              Portfolio
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-8">
            Selected <br/><span className="text-muted-foreground">Works</span>
          </h1>
        </div>
      </section>

      <section className="py-20 bg-card border-t border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {projects.map((project) => (
              <div key={project.id} className="group cursor-pointer">
                <div className="aspect-[4/3] mb-6 overflow-hidden bg-background border border-border relative">
                  {project.image ? (
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground font-mono text-sm uppercase tracking-widest">
                      Documentation Pending
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-background/90 backdrop-blur px-3 py-1 border border-border text-xs font-mono text-primary uppercase tracking-wider">
                    {project.category}
                  </div>
                </div>
                
                <h3 className="text-2xl font-display font-bold mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-4 text-xs font-mono uppercase tracking-widest text-foreground/60">
                  <div className="flex flex-col gap-1">
                    <span className="text-muted-foreground/50">Services</span>
                    <span className="text-primary">{project.services}</span>
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
          <h2 className="text-3xl md:text-5xl font-display mb-8">We let our drawings do the talking.</h2>
          <p className="text-lg text-muted-foreground mb-10">
            For specific project examples relevant to your industry, please reach out. We maintain an extensive archive of permitted construction documents.
          </p>
          <Link 
            href="/contact" 
            className="inline-flex h-14 px-8 border-2 border-primary text-primary font-bold text-sm uppercase tracking-wider items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all"
          >
            Request Case Studies
          </Link>
        </div>
      </section>
    </div>
  );
}
