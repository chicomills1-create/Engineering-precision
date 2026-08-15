import { Link } from "wouter";
import { ArrowRight, ChevronRight, FileCheck, Layers, ShieldCheck, Zap } from "lucide-react";
import heroBg from "@assets/generated_images/hero-bg2.webp";
import { useEffect, useState } from "react";
import { usePageMeta } from "@/lib/seo";

export default function Home() {
  usePageMeta(PAGE_META);

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const stats = [
    { label: "Disciplines Under One Roof", value: "4" },
    { label: "Typical Quote Turnaround", value: "12-24hr" },
    { label: "States Licensed", value: "49" },
    { label: "Initial Review Response", value: "12-24hr" }
  ];

  const processes = [
    { id: "01", title: "Project Review", desc: "We ingest your plans, assess jurisdictional constraints, and identify clash risks before drawing a single line." },
    { id: "02", title: "System Strategy", desc: "Value-engineering the approach. We design systems that are robust but won't break the construction budget." },
    { id: "03", title: "Coordination", desc: "Rigorous internal modeling. Structural beams won't intersect mechanical ducts. Everything fits." },
    { id: "04", title: "Permit Ready", desc: "You receive sealed, code-compliant construction documents that authorities approve." }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[100dvh] flex items-center pt-20 pb-32 overflow-hidden bg-background">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-background/60 mix-blend-multiply z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-background/60 z-10" />
          {/* Subtle red tint overlay for mood */}
          <div className="absolute inset-0 bg-primary/5 mix-blend-color z-10" />
          {heroBg && (
            <img 
              src={heroBg} 
              alt="Engineering building structure" 
              className="w-full h-full object-cover opacity-60"
              style={{ transform: `translateY(${scrollY * 0.2}px)` }}
            />
          )}
        </div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-20 mt-16">
          <div className="max-w-5xl">
            <div className="flex items-center gap-4 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="w-12 h-[2px] bg-primary"></div>
              <span className="font-mono text-sm tracking-widest text-primary uppercase font-bold">
                Permit-Ready Engineering
              </span>
            </div>
            
            <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-display font-bold leading-[1.05] tracking-tighter mb-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150 fill-mode-both">
              <span className="block text-white">De-Risk Your</span>
              <span className="block text-muted-foreground italic font-medium">Build.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-foreground/80 max-w-2xl mb-12 leading-relaxed border-l-4 border-primary pl-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-both">
              From concept to approved permit. We deliver integrated Architecture, Structural, MEP, and Civil design that passes review and practically builds itself.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500 fill-mode-both">
              <Link 
                href="/contact" 
                className="h-16 px-10 bg-primary text-white font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-3 rounded-[2px] hover:bg-primary/90 transition-all group hover:shadow-[0_0_30px_rgba(184,0,0,0.3)]"
              >
                Start Your Project
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/portfolio" 
                className="h-16 px-10 bg-transparent border border-white/20 text-white font-bold text-sm uppercase tracking-wider flex items-center justify-center rounded-[2px] hover:bg-white/5 transition-colors"
              >
                View Portfolio
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="py-12 bg-card border-y border-border relative z-30">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-border/50">
            {stats.map((stat, i) => (
              <div key={i} className="px-4 text-center">
                <div className="text-4xl md:text-5xl font-display font-bold text-white mb-2">{stat.value}</div>
                <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Apex Grid */}
      <section className="py-32 bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="font-mono text-xs tracking-widest text-primary uppercase">Why Apex Grid</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 leading-tight">
                Not a Drafting Service. <br />
                <span className="text-muted-foreground">A True Engineering Partner.</span>
              </h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  A design is only as good as the contractor's ability to build it. We don't just produce drawings; we engineer solutions that make sense in the field.
                </p>
                <p>
                  Every project is led by a licensed Professional Engineer. No opaque outsourcing chains, no endless RFI loops. We stamp what we design, and we stand behind every calculation.
                </p>
              </div>
              <ul className="mt-10 space-y-4">
                {[
                  "In-house PE stamps in 49 states",
                  "Clash-free multi-discipline coordination",
                  "Practical, value-engineered detailing"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <ShieldCheck className="w-3 h-3 text-primary" />
                    </div>
                    <span className="font-medium text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6 pt-12">
                <div className="bg-card p-8 border border-border group hover:border-primary/50 transition-colors">
                  <Layers className="w-8 h-8 text-primary mb-6" />
                  <h3 className="font-display font-bold text-xl mb-3">Integrated Focus</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">Architecture, structural, MEP, and civil designed in harmony.</p>
                </div>
                <div className="bg-card p-8 border border-border group hover:border-primary/50 transition-colors">
                  <Zap className="w-8 h-8 text-primary mb-6" />
                  <h3 className="font-display font-bold text-xl mb-3">Rapid Turnaround</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">Systematic workflows that beat standard industry timelines.</p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-card p-8 border border-border group hover:border-primary/50 transition-colors">
                  <FileCheck className="w-8 h-8 text-primary mb-6" />
                  <h3 className="font-display font-bold text-xl mb-3">Permit Ready</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">Documents explicitly detailed for stringent municipal review.</p>
                </div>
                <div className="bg-primary p-8 border border-primary text-white">
                  <h3 className="font-display font-bold text-xl mb-3">Guaranteed Value</h3>
                  <p className="text-sm text-white/80 leading-relaxed mb-6">We will meet or beat any equivalent firm's proposal.</p>
                  <Link href="/contact" className="text-xs uppercase tracking-widest font-bold flex items-center gap-2 group">
                    Get a Quote <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Breakdown */}
      <section className="py-32 bg-card border-t border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Core Disciplines</h2>
            <p className="text-lg text-muted-foreground">Comprehensive engineering expertise under a single, accountable roof.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
            {[
              { num: "01", name: "MEP Design & Engineering", desc: "High-efficiency Mechanical, Electrical, and Plumbing systems. Title 24 compliance built in.", link: "/services/mep" },
              { num: "02", name: "Structural Design", desc: "Rigorous frameworks from high-rise commercial to complex seismic retrofits.", link: "/services/structural" },
              { num: "03", name: "Civil Engineering", desc: "Site feasibility, grading, drainage, and utilities designed for optimal constructability.", link: "/services/civil" },
              { num: "04", name: "Building Assessments", desc: "Independent engineering judgment, forensic analysis, and due diligence reporting.", link: "/services/assessments" },
              { num: "05", name: "Architectural Design", desc: "In-house architectural design — concept through permit-ready documents, coordinated with engineering from day one.", link: "/services/architecture" }
            ].map((srv) => (
              <Link key={srv.num} href={srv.link} className="group bg-background p-12 hover:bg-secondary transition-colors relative overflow-hidden flex flex-col justify-between min-h-[360px]">
                <div className="text-7xl font-display font-bold text-border group-hover:text-primary/10 transition-colors mb-8">
                  {srv.num}
                </div>
                <div>
                  <h3 className="text-2xl font-display font-bold mb-4 text-foreground group-hover:text-primary transition-colors">{srv.name}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-8">{srv.desc}</p>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-primary font-bold">
                  View Discipline <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy / The Three Lenses */}
      <section className="py-32 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">The Three Lenses</h2>
              <p className="text-muted-foreground text-lg">
                Every line we draw must pass our internal quality mandate. If it fails one of these three criteria, it doesn't leave our office.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border border-border p-10 relative overflow-hidden group hover:border-primary/50 transition-colors bg-card">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -z-10 group-hover:scale-150 transition-transform duration-500" />
              <h3 className="text-xl font-display font-bold mb-4">1. Safe & Enduring</h3>
              <p className="text-muted-foreground leading-relaxed">Structurally sound, highly efficient, and designed to perform flawlessly for the lifecycle of the building.</p>
            </div>
            <div className="border border-border p-10 relative overflow-hidden group hover:border-primary/50 transition-colors bg-card">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -z-10 group-hover:scale-150 transition-transform duration-500" />
              <h3 className="text-xl font-display font-bold mb-4">2. Buildable</h3>
              <p className="text-muted-foreground leading-relaxed">No abstract theory. We detail components so contractors understand them instantly, eliminating costly RFIs.</p>
            </div>
            <div className="border border-border p-10 relative overflow-hidden group hover:border-primary/50 transition-colors bg-card">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -z-10 group-hover:scale-150 transition-transform duration-500" />
              <h3 className="text-xl font-display font-bold mb-4">3. Code Compliant</h3>
              <p className="text-muted-foreground leading-relaxed">Pre-engineered for the specific municipality's requirements to breeze through plan check without heavy redlines.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-32 bg-secondary border-y border-border">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-16 text-center">How We Work</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {processes.map((step, idx) => (
              <div key={step.id} className="relative">
                {idx < processes.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-12 right-0 h-[1px] bg-border z-0">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-border" />
                  </div>
                )}
                <div className="relative z-10 w-12 h-12 bg-background border-2 border-primary rounded-full flex items-center justify-center font-display font-bold text-lg mb-6 shadow-[0_0_15px_rgba(184,0,0,0.2)]">
                  {step.id}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing / Final CTA */}
      <section className="py-32 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl md:text-7xl font-display font-bold mb-8">
              Engineering Value.
            </h2>
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
              We beat most firm quotes — guaranteed. Get a comprehensive, multi-discipline engineering proposal for your project with an initial review response and a full proposal typically within 12–24 hours. No pressure, no endless follow-up emails. Just solid numbers.
            </p>
            <div className="flex justify-center">
              <Link 
                href="/contact" 
                className="h-16 px-12 bg-primary text-white font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-3 rounded-[2px] hover:bg-primary/90 transition-all group shadow-[0_0_40px_rgba(184,0,0,0.4)]"
              >
                Request a Proposal
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const PAGE_META = {
  title: "Apex Grid Engineering | Architecture, MEP, Structural & Civil Design",
  description: "Full-service design firm: architectural design, MEP, structural, and civil/site engineering plus Title 24 energy compliance for commercial, industrial, and healthcare projects.",
  path: "/",
};
