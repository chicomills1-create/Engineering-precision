import { Link } from "wouter";
import { ArrowRight, ChevronRight } from "lucide-react";
import heroBg from "@assets/generated_images/hero-bg.jpg";
import project1 from "@assets/generated_images/project-1.jpg";

export default function Home() {
  const services = [
    {
      id: "01",
      title: "MEP Engineering",
      desc: "Mechanical, Electrical, and Plumbing systems optimized for efficiency, occupant comfort, and rigorous code compliance.",
    },
    {
      id: "02",
      title: "Structural Design",
      desc: "Robust frameworks engineered to withstand dynamic loads, ensuring structural integrity for commercial and industrial facilities.",
    },
    {
      id: "03",
      title: "Civil & Site",
      desc: "Comprehensive site grading, utility layout, and stormwater management designed for optimal constructability.",
    },
    {
      id: "04",
      title: "Title 24 & Energy",
      desc: "Precision energy modeling and compliance documentation to meet stringent state and federal sustainability mandates.",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-background/80 mix-blend-multiply z-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background z-10" />
          {heroBg && (
            <img 
              src={heroBg} 
              alt="Engineering blueprint" 
              className="w-full h-full object-cover opacity-30"
            />
          )}
        </div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-20">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-[1px] bg-primary"></div>
              <span className="font-mono text-sm tracking-widest text-primary uppercase">
                Licensed Nationwide
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display leading-[1.1] tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both">
              <span className="block text-white">Engineered For</span>
              <span className="block text-muted-foreground">Execution.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mb-12 leading-relaxed border-l-2 border-border pl-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150 fill-mode-both">
              The engineering partner architecture firms and contractors trust. 
              We deliver precise, code-compliant drawings that authorities approve and builders can execute.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-both">
              <Link 
                href="/contact" 
                className="h-14 px-8 bg-primary text-primary-foreground font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-3 rounded-[2px] hover:bg-primary/90 transition-all group"
              >
                Start a Project
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/services" 
                className="h-14 px-8 bg-transparent border border-white/20 text-white font-bold text-sm uppercase tracking-wider flex items-center justify-center rounded-[2px] hover:bg-white/5 transition-colors"
              >
                View Disciplines
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-32 bg-background border-t border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-display mb-6">Integrated Disciplines</h2>
              <p className="text-muted-foreground text-lg">
                A single point of truth for comprehensive building engineering. We coordinate across disciplines to eliminate clashes before they reach the field.
              </p>
            </div>
            <Link href="/services" className="group flex items-center gap-2 text-primary font-medium hover:text-primary/80 transition-colors uppercase tracking-widest text-sm">
              All Services <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
            {services.map((service) => (
              <Link key={service.id} href="/services" className="group bg-background p-10 md:p-16 hover:bg-card transition-colors flex flex-col justify-between min-h-[320px] relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 text-7xl font-display font-bold text-white/5 group-hover:text-primary/10 transition-colors">
                  {service.id}
                </div>
                <div>
                  <h3 className="text-2xl font-display font-bold mb-4 group-hover:text-primary transition-colors">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed max-w-md">
                    {service.desc}
                  </p>
                </div>
                <div className="mt-12 flex items-center gap-2 text-sm font-bold text-white/40 group-hover:text-primary transition-colors uppercase tracking-widest">
                  Explore <ChevronRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Project */}
      <section className="py-32 bg-card border-t border-border relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="aspect-[4/3] bg-background border border-border relative z-10 overflow-hidden">
                {project1 ? (
                  <img src={project1} alt="Commercial Building Structure" className="w-full h-full object-cover opacity-80" />
                ) : (
                  <div className="w-full h-full bg-secondary/50" />
                )}
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
              </div>
              {/* Decorative drafting lines */}
              <div className="absolute -top-4 -left-4 w-8 h-8 border-t border-l border-primary/50" />
              <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b border-r border-primary/50" />
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-[1px] bg-primary"></div>
                <span className="font-mono text-xs tracking-widest text-primary uppercase">
                  Featured Case Study
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-display mb-6">Nexus Commercial Tower</h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Full-stack structural and MEP engineering for a 42-story mixed-use facility. Our integrated approach reduced material costs by 14% while exceeding seismic code requirements.
              </p>
              
              <ul className="space-y-4 mb-12 border-l border-border pl-6">
                <li className="flex flex-col">
                  <span className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Scope</span>
                  <span className="font-medium">Structural, MEP, Title 24</span>
                </li>
                <li className="flex flex-col">
                  <span className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Location</span>
                  <span className="font-medium">Seattle, CA</span>
                </li>
              </ul>
              
              <Link 
                href="/projects" 
                className="inline-flex items-center gap-3 text-white font-bold uppercase tracking-wider text-sm hover:text-primary transition-colors group"
              >
                <span className="border-b-2 border-primary pb-1">View All Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-display font-bold text-primary-foreground mb-8">
            Ready to Build?
          </h2>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-12">
            Submit your project details for a comprehensive engineering proposal. We review plans within 24 hours.
          </p>
          <Link 
            href="/contact" 
            className="inline-flex h-16 px-10 bg-background text-foreground font-bold text-sm uppercase tracking-wider items-center justify-center gap-3 rounded-[2px] hover:bg-card transition-all group shadow-2xl"
          >
            Request a Proposal
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
