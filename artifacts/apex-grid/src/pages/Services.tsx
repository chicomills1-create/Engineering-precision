import { ArrowRight, Check } from "lucide-react";
import { Link } from "wouter";
import project2 from "@assets/generated_images/project-2.jpg";

export default function Services() {
  const disciplines = [
    {
      id: "01",
      name: "MEP Engineering",
      description: "Mechanical, Electrical, and Plumbing design engineered for maximum operational efficiency and rigorous code compliance across commercial, industrial, and multi-family residential sectors.",
      features: [
        "HVAC Load Calculations & Design",
        "Power Distribution & Lighting Layout",
        "Plumbing & Piping Systems",
        "Title 24 Compliance Documentation"
      ]
    },
    {
      id: "02",
      name: "Structural Engineering",
      description: "Robust structural frameworks designed to withstand dynamic loads. We optimize material usage without compromising safety or architectural vision.",
      features: [
        "Seismic Retrofitting & Analysis",
        "Foundation & Retaining Wall Design",
        "Steel, Concrete & Timber Framing",
        "Peer Review & Plan Check Support"
      ]
    },
    {
      id: "03",
      name: "Civil & Site Design",
      description: "Comprehensive site planning that bridges the gap between raw land and vertical construction. We handle the groundwork so your project starts on solid footing.",
      features: [
        "Grading & Drainage Plans",
        "Stormwater Management (SWPPP)",
        "Utility Infrastructure Layout",
        "Erosion Control Plans"
      ]
    },
    {
      id: "04",
      name: "Fire Protection",
      description: "Life safety systems engineered to meet NFPA standards and local fire marshal requirements. Precise hydraulic calculations ensure reliable performance.",
      features: [
        "Sprinkler System Layout",
        "Fire Alarm & Detection Systems",
        "Hydraulic Calculations",
        "Code Consulting & Variance Requests"
      ]
    },
    {
      id: "05",
      name: "Energy & Title 24",
      description: "Navigating complex energy codes to deliver compliant, sustainable building envelopes and systems that pass municipal review the first time.",
      features: [
        "Energy Modeling",
        "Daylighting Analysis",
        "Sustainability Certifications (LEED)",
        "Commissioning Support"
      ]
    },
    {
      id: "06",
      name: "Architectural Support",
      description: "We act as an extension of your architectural team, providing technical drafting and detailing support to bring conceptual designs into the construction document phase.",
      features: [
        "BIM Coordination (Revit)",
        "Construction Document Production",
        "As-Built Documentation",
        "3D Clash Detection"
      ]
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="pt-32 pb-20 bg-background border-b border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center gap-4 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="w-12 h-[1px] bg-primary"></div>
            <span className="font-mono text-sm tracking-widest text-primary uppercase">
              Disciplines
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150 fill-mode-both">
            Engineering <br/><span className="text-muted-foreground">Excellence</span>
          </h1>
          <p className="text-xl text-foreground/80 max-w-3xl leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-both">
            From initial site assessment to final MEP coordination, we offer a complete suite of engineering services. Our integrated approach ensures systems work together seamlessly, reducing field conflicts and change orders.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <div className="space-y-24">
              {disciplines.map((discipline, idx) => (
                <div key={discipline.id} className="relative">
                  <div className="absolute -left-4 top-0 text-8xl font-display font-bold text-white/5 -z-10 leading-none">
                    {discipline.id}
                  </div>
                  <h2 className="text-3xl font-display font-bold mb-6 pt-4">{discipline.name}</h2>
                  <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                    {discipline.description}
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {discipline.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="hidden lg:block relative">
              <div className="sticky top-32">
                <div className="aspect-[3/4] bg-background border border-border relative overflow-hidden">
                  {project2 ? (
                    <img src={project2} alt="MEP Visualization" className="w-full h-full object-cover opacity-60 mix-blend-screen" />
                  ) : (
                    <div className="w-full h-full bg-secondary/30" />
                  )}
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
                  <div className="absolute bottom-8 left-8 right-8 p-6 bg-background/90 backdrop-blur border border-border">
                    <p className="font-mono text-xs uppercase tracking-widest text-primary mb-2">Technical Rigor</p>
                    <p className="text-sm">Our models are clash-detected and coordinated to LOD 400 standards, ensuring what we draw can actually be built.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-background border-t border-border text-center">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-display mb-8">Need a multi-discipline proposal?</h2>
          <Link 
            href="/contact" 
            className="inline-flex h-14 px-8 bg-primary text-primary-foreground font-bold text-sm uppercase tracking-wider items-center justify-center gap-3 rounded-[2px] hover:bg-primary/90 transition-all group"
          >
            Contact Engineering Team
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
