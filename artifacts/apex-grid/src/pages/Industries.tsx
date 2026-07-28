import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import industriesBg from "@assets/generated_images/industries-bg.webp";

export default function Industries() {
  const sectors = [
    { name: "Healthcare", desc: "OSHPD compliance, medical gas, negative pressure isolation rooms, and resilient power for clinics and hospitals." },
    { name: "Data Centers", desc: "N+1 cooling redundancy, high-density power distribution, and pre-action fire suppression." },
    { name: "Tenant Improvement", desc: "Rapid turnaround structural and MEP modifications for retail, office, and restaurant build-outs." },
    { name: "Industrial / Warehouse", desc: "Tilt-up concrete structures, high-bay lighting, and large-scale ventilation." },
    { name: "Multifamily Residential", desc: "Optimized structural framing and highly efficient centralized or distributed MEP systems." },
    { name: "Retail & Hospitality", desc: "Brand-compliant aesthetic integration, commercial kitchens, and guest comfort systems." },
    { name: "Education", desc: "DSA compliance, laboratory ventilation, and campus-wide utility infrastructure." },
    { name: "Life Science", desc: "Clean rooms, fume hood exhaust, specialized lab gas systems, and vibration-sensitive structural design." },
    { name: "Government & Civic", desc: "High-security structural hardening, ATFP compliance, and stringent energy mandates." }
  ];

  return (
    <div className="flex flex-col">
      <section className="relative pt-40 pb-32 overflow-hidden bg-background">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-background/80 mix-blend-multiply z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" />
          {industriesBg && (
            <img 
              src={industriesBg} 
              alt="Commercial buildings" 
              className="w-full h-full object-cover opacity-40"
            />
          )}
        </div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-20">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-8">
              Sector <span className="text-muted-foreground">Expertise</span>
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed">
              Engineering isn't one-size-fits-all. Different industries require entirely different code knowledge and design philosophies. We bring specialized experience to the sectors below.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-card">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {sectors.map((sector, idx) => (
              <div key={idx} className="bg-background p-10 hover:bg-secondary/50 transition-colors group">
                <div className="w-12 h-[2px] bg-primary mb-6 transition-all group-hover:w-16" />
                <h3 className="text-2xl font-display font-bold mb-4">{sector.name}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {sector.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-secondary border-t border-border text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-display font-bold mb-8">Don't see your sector?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
            Our engineering fundamentals apply universally. If you have a specialized facility, reach out to discuss our relevant capabilities.
          </p>
          <Link 
            href="/contact" 
            className="inline-flex h-14 px-8 bg-primary text-white font-bold text-sm uppercase tracking-wider items-center justify-center gap-3 rounded-[2px] hover:bg-primary/90 transition-colors"
          >
            Discuss Your Project <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}