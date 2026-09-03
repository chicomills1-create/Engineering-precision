import { Link } from "wouter";
import { ArrowRight, ChevronRight, FileCheck, Layers, ShieldCheck, ArrowDownRight, Building2, HardHat, Briefcase, Key } from "lucide-react";
import heroBg from "@assets/generated_images/hero-bg2.webp";
import project1 from "@assets/generated_images/project-1.webp";
import project2 from "@assets/generated_images/project-2.webp";
import project3 from "@assets/generated_images/project-3.webp";
import { useJsonLd, usePageMeta } from "@/lib/seo";
import { APEX_GRID_BUSINESS_SCHEMA } from "@/lib/business-schema";
import { MotionConfig, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }
};

export default function Home() {
  usePageMeta(PAGE_META);
  useJsonLd(APEX_GRID_BUSINESS_SCHEMA);

  const { scrollY } = useScroll();
  const prefersReducedMotion = useReducedMotion();
  const yHeroBg = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacityHeroText = useTransform(scrollY, [0, 600], [1, 0]);

  const stats = [
    { label: "States with licensing coverage", value: "49" },
    { label: "Typical quote turnaround", value: "12–24h" },
    { label: "Integrated divisions", value: "3" },
    { label: "PE-led project work", value: "100%" }
  ];

  const audiences = [
    {
      id: "architects",
      title: "For Architects",
      icon: Briefcase,
      href: "/for-architects",
      headline: "Protect Your Design Intent",
      description: "Clean Revit/CAD backgrounds, fast RFI turnaround, and coordinated MEP/structural design that won't ruin your exposed ceilings.",
    },
    {
      id: "contractors",
      title: "For General Contractors",
      icon: HardHat,
      href: "/for-contractors",
      headline: "Move at Construction Speed",
      description: "Fast permit documents, buildable details, and deferred submittals on your schedule. We answer the phone when the inspector is waiting.",
    },
    {
      id: "developers",
      title: "For Developers",
      icon: Building2,
      href: "/for-developers",
      headline: "De-Risk the Deal",
      description: "Due-diligence assessments, feasibility engineering, and consistent execution across your 49-state portfolio.",
    },
    {
      id: "property-managers",
      title: "For Property Managers",
      icon: Key,
      href: "/for-property-managers",
      headline: "An Engineer On Call",
      description: "Tenant improvement design, aging equipment decisions, and whole-portfolio support with a single phone call.",
    }
  ];

  const portfolioHighlights = [
    {
      title: "Kestrel Point Tower",
      sector: "Mixed-Use High Rise",
      location: "Seattle, WA",
      image: project1,
      stats: [{ label: "Scale", value: "850K sq ft" }, { label: "Cooling", value: "1,200 Tons" }]
    },
    {
      title: "Bluewire Data Campus",
      sector: "Mission Critical",
      location: "Ashburn, VA",
      image: project2,
      stats: [{ label: "Power", value: "32 MW" }, { label: "Uptime", value: "Tier III" }]
    },
    {
      title: "Saguaro Gate Campus",
      sector: "Healthcare",
      location: "Queen Creek, AZ",
      image: project3,
      stats: [{ label: "Site Area", value: "14 Acres" }, { label: "Beds", value: "85" }]
    }
  ];

  return (
    <MotionConfig reducedMotion="user">
    <div className="flex flex-col overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[100dvh] flex items-center justify-center pt-24 pb-20 overflow-hidden bg-background">
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y: prefersReducedMotion ? 0 : yHeroBg }}
        >
          <div className="absolute inset-0 bg-background/85 mix-blend-multiply z-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/70 to-background z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/30 to-background/90 z-10" />
          <div className="absolute inset-0 bg-grid-white bg-[size:64px_64px] z-20" />
          
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] z-10 mix-blend-screen pointer-events-none" />
          
          {heroBg && (
            <img 
              src={heroBg} 
              alt="Engineering building structure" 
              className="w-full h-full object-cover opacity-60 grayscale contrast-125"
            />
          )}
        </motion.div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-30">
          <motion.div 
            className="max-w-6xl mx-auto flex flex-col items-center text-center"
            style={{ opacity: prefersReducedMotion ? 1 : opacityHeroText }}
          >
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 80 }}
              transition={{ duration: 1, delay: 0.1 }}
              className="w-px bg-gradient-to-b from-transparent via-primary to-primary mb-8"
            />
            
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex items-center gap-4 mb-8"
            >
              <span className="font-mono text-[10px] sm:text-xs tracking-[0.3em] text-primary uppercase font-bold">
                Apex Grid Engineering
              </span>
            </motion.div>
            
            <motion.h1 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="text-6xl md:text-8xl lg:text-[9rem] font-display font-bold leading-[0.9] tracking-tighter mb-8 flex flex-col items-center"
            >
              <motion.span variants={fadeUp} className="block text-white drop-shadow-xl">
                De-Risk
              </motion.span>
              <motion.span variants={fadeUp} className="block text-white flex flex-col md:flex-row items-center md:gap-8 drop-shadow-xl">
                <span className="italic font-light text-muted-foreground/70 md:tracking-tight">Your</span> Build.
              </motion.span>
            </motion.h1>
            
            <p className="text-lg md:text-2xl text-foreground/80 max-w-3xl mb-12 leading-relaxed font-light">
              Coordinate structural, MEP, civil, and architecture through one accountable, PE-led and veteran-led team. We engineer solutions that clear plan-check and make sense in the field.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto">
              <Link
                href="/request-proposal?utm_source=website&utm_medium=organic&utm_campaign=homepage_hero"
                className="w-full sm:w-auto h-16 px-10 bg-primary text-white font-bold text-sm uppercase tracking-[0.15em] flex items-center justify-center gap-3 rounded-sm hover:bg-primary/90 transition-all group relative overflow-hidden focus-visible:ring-4 focus-visible:ring-primary/50"
              >
                <div className="absolute inset-0 w-full h-full bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                <span className="relative z-10 flex items-center gap-3 whitespace-nowrap">
                  Request a Proposal
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link 
                href="/portfolio" 
                className="w-full sm:w-auto h-16 px-10 bg-black/40 backdrop-blur-md border border-white/20 text-white font-bold text-sm uppercase tracking-[0.15em] flex items-center justify-center rounded-sm hover:border-white/60 hover:bg-white/10 transition-colors whitespace-nowrap focus-visible:ring-2 focus-visible:ring-white/50"
              >
                View Portfolio
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Proof strip */}
      <section className="border-y border-white/10 bg-card relative z-30">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/10">
          {stats.map((stat, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-8 md:p-12 text-center group hover:bg-white/[0.02] transition-colors relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out" />
              <div className="text-4xl md:text-5xl font-display font-bold text-white mb-3 tracking-tighter group-hover:text-primary transition-colors duration-300">{stat.value}</div>
              <div className="text-[10px] md:text-xs font-mono uppercase tracking-[0.15em] md:tracking-[0.2em] text-muted-foreground group-hover:text-white transition-colors duration-300">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Audiences Routing */}
      <section className="py-24 md:py-32 bg-background relative border-b border-border">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-grid-white opacity-20 bg-[size:48px_48px] pointer-events-none [mask-image:linear-gradient(to_left,white,transparent)]" />
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-3xl mb-16 md:mb-24">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-px bg-primary" />
              <span className="font-mono text-xs tracking-widest text-primary uppercase font-bold">Who We Serve</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-[1.1] tracking-tight text-white mb-6">
              Engineering Built for <br />
              <span className="text-muted-foreground italic font-light">Your Delivery Model.</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
              We don't force a one-size-fits-all approach. Our deliverables, communication cadence, and engineering focus adapt to what matters most for your role in the project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {audiences.map((audience, i) => (
              <motion.div
                key={audience.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <Link
                  href={audience.href}
                  className="group flex flex-col h-full bg-card border border-border p-8 md:p-10 hover:border-primary/40 hover:bg-secondary/40 transition-all duration-300 rounded-sm focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none overflow-hidden relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="flex items-center justify-between mb-8 relative z-10">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                        <audience.icon className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                      </div>
                      <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase font-bold group-hover:text-primary transition-colors">
                        {audience.title}
                      </span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>

                  <div className="relative z-10 flex-grow">
                    <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-4 group-hover:text-white transition-colors">
                      {audience.headline}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {audience.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Representative Portfolio */}
      <section className="py-24 md:py-32 bg-secondary/30 border-b border-border overflow-hidden">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-px bg-primary" />
                <span className="font-mono text-xs tracking-widest text-primary uppercase font-bold">Proven Execution</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight text-white">
                Engineered to Build.
              </h2>
            </div>
            <Link href="/portfolio" className="font-mono text-xs tracking-widest text-primary uppercase font-bold flex items-center gap-3 hover:text-white transition-colors group shrink-0 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none p-2 -m-2 rounded-sm">
              View Full Portfolio
              <div className="w-8 h-px bg-primary group-hover:bg-white transition-colors group-hover:translate-x-2 duration-300" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {portfolioHighlights.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="group flex flex-col bg-card border border-border rounded-sm overflow-hidden hover:border-primary/30 transition-colors"
              >
                <div className="aspect-[4/3] relative overflow-hidden bg-background">
                  {project.image && (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-primary mb-2">
                      <span>{project.location}</span>
                      <span className="w-1 h-1 bg-white/30 rounded-full"></span>
                      <span className="text-white/70">{project.sector}</span>
                    </div>
                    <h3 className="text-2xl font-display font-bold text-white group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-2 divide-x divide-border border-t border-border bg-card">
                  {project.stats.map((stat, idx) => (
                    <div key={idx} className="p-4 md:p-6 text-center">
                      <div className="text-lg md:text-xl font-display font-bold text-white mb-1">{stat.value}</div>
                      <div className="text-[9px] uppercase tracking-widest text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Three divisions & Core Disciplines */}
      <section className="py-24 md:py-32 bg-background relative z-20">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center max-w-4xl mx-auto mb-20 md:mb-24"
          >
            <div className="flex justify-center items-center gap-4 mb-6">
              <div className="w-8 h-px bg-primary" />
              <span className="font-mono text-xs tracking-widest text-primary uppercase font-bold">One Organization · Three Divisions</span>
              <div className="w-8 h-px bg-primary" />
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-bold leading-[1.1] tracking-tight mb-8">
              From <span className="text-muted-foreground/50 italic font-light">design</span> to delivery.
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
              PE-stamped engineering, coordinated architectural design, and integrated construction delivery through a single accountable partner.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-24">
            {[
              { num: "01", title: "Engineering", desc: "PE-stamped structural, commercial MEP, civil, and assessment services engineered for constructability and plan-check approval.", href: "/services/mep", cta: "Explore Engineering" },
              { num: "02", title: "Architecture", desc: "Concept, space planning, and permit-ready architectural documents coordinated directly with the engineering team.", href: "/services/architecture", cta: "Explore Architecture" },
              { num: "03", title: "General Contractor", desc: "Construction delivery, pre-construction planning, and field execution through our construction team.", href: "/team#construction-delivery", cta: "Explore Contracting" },
            ].map((division, i) => (
              <motion.div
                key={division.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative h-full"
              >
                <Link href={division.href} className="block h-full bg-card border border-border p-10 md:p-12 hover:border-primary/40 hover:bg-secondary/40 transition-all duration-300 rounded-sm focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none overflow-hidden">
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-12">
                      <span className="text-4xl md:text-5xl font-display font-bold text-white/10 group-hover:text-primary transition-colors duration-300">{division.num}</span>
                      <ArrowDownRight className="w-6 h-6 text-muted-foreground group-hover:text-primary group-hover:-rotate-45 transition-all duration-300" />
                    </div>
                    
                    <h3 className="text-2xl font-display font-bold mb-4 text-white group-hover:text-primary transition-colors">{division.title}</h3>
                    <p className="text-muted-foreground leading-relaxed mb-10 flex-grow">{division.desc}</p>
                    
                    <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.2em] text-white font-bold group-hover:text-primary transition-colors">
                      {division.cta} <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Core Disciplines List */}
          <div className="border-t border-border pt-20">
            <h3 className="text-2xl font-display font-bold mb-10 text-center">Core Disciplines</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-8 max-w-5xl mx-auto">
              {[
                { name: "Commercial MEP Design", link: "/services/mep" },
                { name: "PE-Stamped Structural", link: "/services/structural" },
                { name: "Civil Engineering", link: "/services/civil" },
                { name: "Building Assessments", link: "/services/assessments" },
                { name: "Architectural Design", link: "/services/architecture" },
                { name: "Title 24 Compliance", link: "/mep-engineering/", static: true }
              ].map((srv, i) => {
                const className = "group flex items-center justify-between p-4 border border-transparent hover:border-border hover:bg-secondary/40 rounded-sm transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none";
                const content = (
                  <>
                    <span className="text-foreground/90 font-medium group-hover:text-white transition-colors">{srv.name}</span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-primary transition-all" />
                  </>
                );

                return srv.static ? (
                  <a key={i} href={srv.link} className={className}>{content}</a>
                ) : (
                  <Link key={i} href={srv.link} className={className}>{content}</Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* The Apex Advantage (Why Us) */}
      <section className="py-24 md:py-32 bg-secondary/20 border-y border-border relative">
        <div className="absolute inset-0 bg-grid-white opacity-20 bg-[size:64px_64px] pointer-events-none" />
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-px bg-primary" />
                <span className="font-mono text-xs tracking-widest text-primary uppercase font-bold">The Apex Advantage</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-8 leading-[1.1] tracking-tight">
                Not a Drafting Service.<br/>
                <span className="text-muted-foreground/50 italic font-light">A True Partner.</span>
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 font-light">
                Every line we draw must pass our internal quality mandate. If it fails one of these criteria, it doesn't leave our office.
              </p>

              <Link
                href="/about"
                className="inline-flex h-14 px-8 bg-card border border-border text-white font-bold text-xs uppercase tracking-wider items-center justify-center gap-3 rounded-sm hover:border-primary/50 hover:bg-secondary transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
              >
                Learn About The Firm
              </Link>
            </div>
            
            <div className="lg:col-span-7 grid grid-cols-1 gap-6">
              {[
                { icon: ShieldCheck, title: "Safe & Enduring", desc: "Structurally sound, highly efficient, and designed to perform flawlessly for the lifecycle of the building." },
                { icon: Layers, title: "Buildable & Practical", desc: "No abstract theory. We detail components so contractors understand them instantly, eliminating costly RFIs." },
                { icon: FileCheck, title: "Code Compliant", desc: "Pre-engineered for the specific municipality's requirements to breeze through plan check without heavy redlines." }
              ].map((feature, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-card p-8 md:p-10 border border-border hover:border-primary/30 transition-colors group flex flex-col md:flex-row gap-6 md:gap-8 rounded-sm"
                >
                  <div className="shrink-0 w-16 h-16 rounded-full bg-secondary/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <feature.icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-500" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-2xl mb-3 text-white">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed font-light">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 md:py-40 bg-primary relative overflow-hidden text-center text-white">
        <div className="absolute inset-0 bg-grid-white opacity-20 bg-[size:32px_32px] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto flex flex-col items-center"
          >
            <span className="font-mono text-xs tracking-[0.2em] text-white/70 uppercase font-bold mb-6">Take Action</span>
            <h2 className="text-5xl md:text-7xl font-display font-bold mb-8 tracking-tighter drop-shadow-2xl">
              Get a clear next step.
            </h2>
            <p className="text-lg md:text-2xl text-white/90 font-light mb-12 leading-relaxed max-w-2xl drop-shadow-md">
              Share the scope, location, and discipline for a live project. We typically review and respond within 12–24 hours.
            </p>
            <Link 
              href="/request-proposal?utm_source=website&utm_medium=organic&utm_campaign=homepage_proposal"
              className="h-16 px-10 md:px-14 bg-white text-primary font-bold text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-4 rounded-sm hover:bg-white/90 transition-all group shadow-[0_0_40px_rgba(0,0,0,0.5)] hover:scale-105 duration-300 focus-visible:ring-4 focus-visible:ring-white/50 focus-visible:outline-none"
            >
              Request a Proposal
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
    </MotionConfig>
  );
}

const PAGE_META = {
  title: "PE-Stamped MEP & Structural Engineering | Apex Grid",
  description: "PE-stamped structural, commercial MEP, civil, and building-assessment engineering from Arizona, with Title 24 and municipal plan-check support.",
  path: "/",
};