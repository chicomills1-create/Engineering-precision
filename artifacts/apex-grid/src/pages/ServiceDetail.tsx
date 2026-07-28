import { Link, useParams } from "wouter";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import mepBg from "@assets/generated_images/mep-bg.jpg";
import structuralBg from "@assets/generated_images/structural-bg.jpg";
import civilBg from "@assets/generated_images/civil-bg.jpg";
import assessmentBg from "@assets/generated_images/assessment-bg.jpg";
import NotFound from "./not-found";

const servicesData = {
  "mep": {
    title: "MEP Design & Engineering",
    bg: mepBg,
    desc: "Mechanical, Electrical, and Plumbing systems engineered for operational efficiency, occupant comfort, and stringent code compliance. We also handle full Title 24 energy compliance modeling in-house.",
    deliverables: ["HVAC Load Calcs (Title 24)", "Power Distribution Single-Lines", "Plumbing Isometric Risers", "Lighting Photometrics", "Equipment Schedules"],
    process: "We start by analyzing the building envelope and intended use. From there, we design right-sized mechanical systems, efficient electrical distribution, and reliable plumbing networks that fit within your architectural constraints without clashes."
  },
  "structural": {
    title: "Structural Design & Engineering",
    bg: structuralBg,
    desc: "From new commercial builds to complex seismic retrofits and ADUs. We engineer robust, material-optimized frameworks that satisfy the most rigorous municipal peer reviews.",
    deliverables: ["Foundation Plans", "Framing Layouts (Steel/Wood/Concrete)", "Seismic & Wind Calcs", "Retaining Wall Details", "Connection Details"],
    process: "Our structural team models the physical loads and environmental stressors specific to your site. We prioritize constructable details—using standard materials and straightforward connections wherever possible to save contractors time and money."
  },
  "civil": {
    title: "Civil Engineering",
    bg: civilBg,
    desc: "Site feasibility, precise grading, and intelligent stormwater management. We bridge the critical gap between raw land and vertical construction.",
    deliverables: ["Site Plans", "Grading & Drainage Plans", "SWPPP / Erosion Control", "Utility Connections", "Street Improvement Plans"],
    process: "Civil engineering dictates how the building interacts with the earth. We focus heavily on precise topographical grading to balance cut/fill, and we design stormwater systems that satisfy environmental regulations without consuming valuable site square footage."
  },
  "assessments": {
    title: "Building Assessments",
    bg: assessmentBg,
    desc: "Independent engineering judgment for property transactions, renovations, and forensic analysis. We tell you exactly what you're buying or building on.",
    deliverables: ["Structural Condition Reports", "MEP Life Expectancy Analysis", "Seismic Risk Assessments", "Feasibility Studies", "Code Violation Reviews"],
    process: "Our licensed engineers conduct exhaustive on-site inspections backed by historical plan reviews. We deliver actionable, plain-English reports outlining immediate hazards, required upgrades, and estimated lifespans of critical building systems."
  }
};

export default function ServiceDetail() {
  const params = useParams();
  const serviceId = params.id as keyof typeof servicesData;
  const service = servicesData[serviceId];

  if (!service) return <NotFound />;

  return (
    <div className="flex flex-col">
      {/* Hero Header */}
      <section className="relative pt-40 pb-32 overflow-hidden bg-background">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-background/80 mix-blend-multiply z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent z-10" />
          {service.bg && (
            <img 
              src={service.bg} 
              alt={service.title} 
              className="w-full h-full object-cover opacity-50"
            />
          )}
        </div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-20">
          <div className="max-w-4xl">
            <Link href="/" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors mb-8">
              Services <ArrowRight className="w-3 h-3" />
            </Link>
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-8">
              {service.title}
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed border-l-4 border-primary pl-6">
              {service.desc}
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-16">
            
            {/* Main Content */}
            <div className="space-y-16">
              <div>
                <h2 className="text-3xl font-display font-bold mb-6 border-b border-border pb-4">Our Approach</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {service.process}
                </p>
              </div>
              
              <div>
                <h2 className="text-3xl font-display font-bold mb-8 border-b border-border pb-4">Standard Deliverables</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 bg-background p-4 border border-border">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                      <span className="font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar CTA */}
            <div className="relative">
              <div className="sticky top-32 bg-background border border-primary/20 p-8 shadow-[0_0_20px_rgba(184,0,0,0.05)]">
                <h3 className="font-display font-bold text-2xl mb-4">Need {service.title} for your project?</h3>
                <p className="text-muted-foreground mb-8 text-sm">
                  Send us your architectural plans or project narrative. We provide fixed-fee engineering proposals within 24 hours.
                </p>
                <ul className="space-y-3 mb-8 text-sm font-medium">
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-primary rounded-full" /> Nationwide Licensure</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-primary rounded-full" /> In-House PE Stamp</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-primary rounded-full" /> Guaranteed Pricing</li>
                </ul>
                <Link 
                  href="/contact" 
                  className="flex h-14 bg-primary text-white font-bold text-sm uppercase tracking-wider items-center justify-center w-full hover:bg-primary/90 transition-colors"
                >
                  Request Proposal
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}