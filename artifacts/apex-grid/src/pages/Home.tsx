import { Link } from "wouter";
import {
  ArrowRight,
  ArrowDownRight,
  ArrowUpRight,
  Building2,
  ChevronRight,
  ClipboardCheck,
  FileCheck,
  Layers,
  ShieldCheck,
  Users,
  Zap,
} from "lucide-react";
import heroBg from "@assets/generated_images/hero-bg2.webp";
import { useJsonLd, usePageMeta } from "@/lib/seo";
import { APEX_GRID_BUSINESS_SCHEMA } from "@/lib/business-schema";
import { motion, useScroll, useTransform } from "framer-motion";

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }
};

export default function Home() {
  usePageMeta(PAGE_META);
  useJsonLd(APEX_GRID_BUSINESS_SCHEMA);

  const { scrollY } = useScroll();
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
      label: "For Architects",
      title: "Protect the design intent.",
      desc: "Bring structural, MEP, and civil coordination into the room early, without adding another layer of project management.",
      href: "/for-architects",
      icon: Users,
    },
    {
      label: "For Contractors",
      title: "Keep the field moving.",
      desc: "Get practical, permit-ready answers when RFIs, deferred submittals, or plan-check comments threaten the schedule.",
      href: "/for-contractors",
      icon: ClipboardCheck,
    },
    {
      label: "For Developers",
      title: "Make every market repeatable.",
      desc: "Use one accountable engineering partner across your portfolio, with consistent standards from feasibility through permit.",
      href: "/for-developers",
      icon: Building2,
    },
    {
      label: "For Property Managers",
      title: "Make the next decision clear.",
      desc: "Turn building conditions, capital planning questions, and tenant improvements into an actionable engineering path.",
      href: "/for-property-managers",
      icon: ShieldCheck,
    },
  ];

  const processes = [
    { id: "01", title: "Project Review", desc: "We ingest your plans, assess jurisdictional constraints, and identify clash risks before drawing a single line." },
    { id: "02", title: "System Strategy", desc: "Value-engineering the approach. We design systems that are robust but won't break the construction budget." },
    { id: "03", title: "Coordination", desc: "Rigorous internal modeling. Structural beams won't intersect mechanical ducts. Everything fits." },
    { id: "04", title: "Permit Ready", desc: "You receive sealed, code-compliant construction documents that authorities approve." }
  ];

  return (
    <div className="flex flex-col overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[100svh] flex items-center justify-center pt-28 pb-24 sm:pt-24 sm:pb-28 overflow-hidden bg-background">
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y: yHeroBg }}
        >
          {/* Subtle noise and gradients */}
          <div className="absolute inset-0 bg-background/80 mix-blend-multiply z-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/60 to-background z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/20 to-background/90 z-10" />
          <div className="absolute inset-0 bg-grid-white bg-[size:48px_48px] z-20" />
          
          {/* Red glow */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] z-10 mix-blend-screen" />
          
          {heroBg && (
            <img 
              src={heroBg} 
              alt="Engineering building structure" 
              className="w-full h-full object-cover opacity-50 grayscale contrast-125"
            />
          )}
        </motion.div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-30">
          <motion.div 
            className="max-w-6xl mx-auto flex flex-col items-center text-center px-1"
            style={{ opacity: opacityHeroText }}
          >
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 64 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="w-px bg-gradient-to-b from-transparent via-primary to-primary mb-8"
            />
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex items-center gap-4 mb-8"
            >
              <span className="font-mono text-xs tracking-[0.3em] text-primary uppercase font-bold">
                Apex Grid Engineering
              </span>
            </motion.div>
            
            <motion.h1 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-[8rem] font-display font-bold leading-[0.95] tracking-tighter mb-8 sm:mb-10 flex flex-col items-center"
            >
              <motion.span variants={fadeUp} className="block text-white">
                De-Risk
              </motion.span>
              <motion.span variants={fadeUp} className="block text-white flex flex-col md:flex-row items-center md:gap-8">
                <span className="italic font-light text-muted-foreground/60 md:tracking-normal">Your</span> Build.
              </motion.span>
            </motion.h1>
            
            <p className="text-base sm:text-lg md:text-2xl text-foreground/75 max-w-3xl mb-9 sm:mb-12 leading-relaxed font-light">
              Need stamped plans or engineering support to keep a commercial project moving? Coordinate structural, MEP, civil, and building assessments through one accountable, PE-led team.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center w-full sm:w-auto max-w-md sm:max-w-none">
              <Link 
                href="/request-proposal?utm_source=website&utm_medium=organic&utm_campaign=homepage_hero"
                className="w-full sm:w-auto h-16 px-6 sm:px-10 bg-primary text-white font-bold text-xs sm:text-sm uppercase tracking-[0.15em] flex items-center justify-center gap-3 rounded-none hover:bg-primary/90 transition-all group relative overflow-hidden"
              >
                <div className="absolute inset-0 w-full h-full bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                <span className="relative z-10 flex items-center gap-3 whitespace-nowrap">
                  Request a Proposal
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link 
                href="/portfolio" 
                className="w-full sm:w-auto h-16 px-6 sm:px-10 bg-transparent border border-white/20 text-white font-bold text-xs sm:text-sm uppercase tracking-[0.15em] flex items-center justify-center rounded-none hover:border-white/60 hover:bg-white/5 transition-colors whitespace-nowrap"
              >
                View Portfolio
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30"
        >
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Scroll</span>
          <div className="w-px h-12 bg-white/20 relative overflow-hidden">
            <motion.div 
              animate={{ y: [-48, 48] }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-primary to-transparent"
            />
          </div>
        </motion.div>
      </section>

      {/* Proof strip */}
      <section className="border-y border-white/10 bg-background relative z-30">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/10">
          {stats.map((stat, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="p-5 sm:p-8 md:p-12 lg:p-16 text-center group hover:bg-white/[0.02] transition-colors relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out" />
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-3 sm:mb-4 tracking-tighter group-hover:text-primary transition-colors duration-500">{stat.value}</div>
              <div className="text-[10px] sm:text-xs md:text-sm font-mono uppercase tracking-[0.08em] sm:tracking-[0.1em] md:tracking-[0.2em] text-muted-foreground group-hover:text-white transition-colors duration-500">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Audience routing */}
      <section className="py-24 md:py-32 bg-secondary/20 border-b border-white/5 relative">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14 md:mb-20">
            <div className="max-w-3xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-px bg-primary" />
                <span className="font-mono text-xs tracking-widest text-primary uppercase font-bold">Built around your role</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-display font-bold leading-[1.05] tracking-tight">
                The right support for the work in front of you.
              </h2>
            </div>
            <p className="max-w-md text-lg text-muted-foreground leading-relaxed font-light">
              Different project roles carry different risks. Start with the path that sounds like your day-to-day.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/10 border border-white/10">
            {audiences.map((audience, i) => (
              <motion.div
                key={audience.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-background group"
              >
                <Link href={audience.href} className="flex flex-col h-full p-7 sm:p-9 md:p-12 hover:bg-secondary/50 transition-colors">
                  <div className="flex items-start justify-between gap-6 mb-12">
                    <audience.icon className="w-8 h-8 text-primary" strokeWidth={1.5} />
                    <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </div>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-primary uppercase font-bold mb-4">{audience.label}</span>
                  <h3 className="text-2xl md:text-3xl font-display font-bold mb-4 group-hover:text-primary transition-colors">{audience.title}</h3>
                  <p className="text-muted-foreground leading-relaxed font-light">{audience.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Three divisions */}
      <section className="py-24 md:py-32 bg-background relative z-20">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-4xl mb-16 md:mb-24"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-px bg-primary" />
              <span className="font-mono text-xs tracking-widest text-primary uppercase font-bold">One Organization · Three Divisions</span>
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.1] tracking-tight">
              From <span className="text-muted-foreground/40 italic font-light">design</span> to delivery.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[
              { num: "01", title: "Engineering", desc: "PE-stamped structural, commercial MEP, civil, and building-assessment services engineered for constructability and plan-check approval.", href: "/services/mep", cta: "Explore Engineering" },
              { num: "02", title: "Architecture", desc: "Concept, space planning, and permit-ready architectural documents coordinated directly with the engineering team.", href: "/services/architecture", cta: "Explore Architecture" },
              { num: "03", title: "Contracting", desc: "Construction delivery, pre-construction planning, and field execution through Phoenix Construction & Management (PCM).", href: "/team#construction-delivery", cta: "Meet PCM" },
            ].map((division, i) => (
              <motion.div
                key={division.num}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="group relative h-full"
              >
                  <Link href={division.href} className="block h-full bg-secondary/30 border border-white/5 p-7 sm:p-10 md:p-14 hover:bg-secondary/60 transition-all duration-500 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/[0.05] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-12 md:mb-16">
                      <span className="text-5xl md:text-6xl font-display font-bold text-white/10 group-hover:text-primary transition-colors duration-500">{division.num}</span>
                      <ArrowDownRight className="w-8 h-8 text-muted-foreground group-hover:text-primary group-hover:-rotate-45 transition-all duration-500" />
                    </div>
                    
                    <h3 className="text-3xl font-display font-bold mb-6 text-white group-hover:text-primary transition-colors">{division.title}</h3>
                    <p className="text-lg text-muted-foreground leading-relaxed mb-12 flex-grow">{division.desc}</p>
                    
                    <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.2em] text-white font-bold group-hover:text-primary transition-colors">
                      {division.cta} <ChevronRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Apex Grid */}
      <section className="py-24 md:py-32 bg-secondary/20 border-y border-white/5 relative">
        <div className="absolute inset-0 bg-grid-white opacity-30 bg-[size:64px_64px] pointer-events-none" />
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            <div className="lg:col-span-5 lg:sticky lg:top-32 h-fit">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-px bg-primary" />
                <span className="font-mono text-xs tracking-widest text-primary uppercase font-bold">The Apex Advantage</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 leading-[1.1] tracking-tight">
                Not a Drafting Service.<br/>
                <span className="text-muted-foreground/50 italic font-light">A True Partner.</span>
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed mb-10 font-light">
                From commercial MEP design in Arizona to California Title 24 compliance and PE-stamped structural packages, we engineer solutions that make sense in the field.
              </p>
              <div className="space-y-5 font-mono text-sm tracking-wide">
                {[
                  "In-house PE stamps in 49 states",
                  "Clash-free multi-discipline coordination",
                  "Practical, value-engineered detailing"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { icon: Layers, title: "Integrated Focus", desc: "Architecture, structural, MEP, and civil designed in perfect harmony to avoid clash." },
                { icon: Zap, title: "Rapid Turnaround", desc: "Systematic workflows that consistently beat standard industry timelines." },
                { icon: FileCheck, title: "Permit Ready", desc: "Documents explicitly detailed for stringent municipal review processes." },
                { icon: ShieldCheck, title: "PE-Led", desc: "Every project is led by a licensed Professional Engineer who stands by the code." }
              ].map((feature, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`bg-background p-10 border border-white/5 hover:border-primary/30 transition-colors group ${i === 1 ? 'sm:mt-12' : ''} ${i === 3 ? 'sm:-mt-12' : ''}`}
                >
                  <feature.icon className="w-10 h-10 text-primary mb-8 group-hover:scale-110 transition-transform duration-500" strokeWidth={1.5} />
                  <h3 className="font-display font-bold text-2xl mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed font-light">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Breakdown */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-6">
                Core Disciplines.
              </h2>
              <p className="text-xl text-muted-foreground font-light leading-relaxed">
                PE-stamped structural, MEP, civil, assessment, and architectural expertise under a single accountable roof.
              </p>
            </div>
            <Link href="/services" className="font-mono text-xs tracking-widest text-primary uppercase font-bold flex items-center gap-3 hover:text-white transition-colors group shrink-0">
              View All Services
              <div className="w-8 h-px bg-primary group-hover:bg-white transition-colors group-hover:translate-x-2 duration-300" />
            </Link>
          </div>

          <div className="border-t border-white/10">
            {[
              { num: "01", name: "Commercial MEP Design", desc: "Mechanical, electrical, and plumbing systems for Arizona and nationwide projects, with California Title 24 compliance.", link: "/services/mep" },
              { num: "02", name: "PE-Stamped Structural", desc: "Permit-ready structural calculations and drawings from commercial buildings to complex seismic retrofits.", link: "/services/structural" },
              { num: "03", name: "Civil Engineering", desc: "Site feasibility, grading, drainage, and utilities designed for optimal constructability.", link: "/services/civil" },
              { num: "04", name: "Building Assessments", desc: "Independent engineering judgment, forensic analysis, and due diligence reporting.", link: "/services/assessments" },
              { num: "05", name: "Architectural Design", desc: "In-house architectural design — concept through permit-ready documents, coordinated with engineering.", link: "/services/architecture" }
            ].map((srv, i) => (
              <motion.div
                key={srv.num}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link 
                  href={srv.link} 
                  className="group flex flex-col md:flex-row md:items-center py-10 border-b border-white/5 hover:border-primary/40 transition-colors relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-primary/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out" />
                  
                  <div className="relative z-10 flex flex-col md:flex-row md:items-center w-full gap-6 md:gap-12 pl-4 md:pl-8">
                    <span className="text-4xl md:text-5xl font-display font-bold text-white/10 group-hover:text-primary transition-colors w-24">
                      {srv.num}
                    </span>
                    <h3 className="text-2xl md:text-4xl font-display font-bold flex-1 group-hover:text-white transition-colors">
                      {srv.name}
                    </h3>
                    <p className="text-muted-foreground md:max-w-md font-light text-lg">
                      {srv.desc}
                    </p>
                    <div className="hidden md:flex w-12 h-12 rounded-full border border-white/10 items-center justify-center group-hover:border-primary group-hover:bg-primary transition-colors shrink-0 mr-8">
                      <ArrowRight className="w-5 h-5 text-white/50 group-hover:text-white group-hover:-rotate-45 transition-all duration-300" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy / The Three Lenses */}
      <section className="py-24 md:py-32 bg-secondary/30 relative overflow-hidden border-y border-white/5">
        <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
        
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <span className="font-mono text-xs tracking-widest text-primary uppercase font-bold mb-6 block">Our Mandate</span>
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 tracking-tight">The Three Lenses</h2>
            <p className="text-xl text-muted-foreground font-light leading-relaxed">
              Every line we draw must pass our internal quality mandate. If it fails one of these criteria, it doesn't leave our office.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
            {[
              { title: "Safe & Enduring", desc: "Structurally sound, highly efficient, and designed to perform flawlessly for the lifecycle of the building." },
              { title: "Buildable", desc: "No abstract theory. We detail components so contractors understand them instantly, eliminating costly RFIs." },
              { title: "Code Compliant", desc: "Pre-engineered for the specific municipality's requirements to breeze through plan check without heavy redlines." }
            ].map((lens, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="bg-background p-12 md:p-16 hover:bg-secondary/50 transition-colors group text-center relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="text-primary font-mono text-6xl font-light opacity-30 mb-8 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">0{i+1}</div>
                  <h3 className="text-2xl font-display font-bold mb-6">{lens.title}</h3>
                  <p className="text-muted-foreground font-light leading-relaxed">{lens.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mb-24 flex flex-col md:flex-row md:items-center gap-8">
            <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight">Execution Plan</h2>
            <div className="hidden md:block flex-1 h-px bg-white/10" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
            <div className="hidden md:block absolute top-6 left-0 w-full h-px bg-white/10 z-0" />
            
            {processes.map((step, idx) => (
              <motion.div 
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="relative z-10 group"
              >
                <div className="w-12 h-12 bg-background border border-primary text-primary flex items-center justify-center font-mono text-sm font-bold mb-8 shadow-[0_0_20px_rgba(220,38,38,0.15)] group-hover:shadow-[0_0_30px_rgba(220,38,38,0.4)] group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  {step.id}
                </div>
                <h3 className="text-2xl font-display font-bold mb-4 group-hover:text-primary transition-colors">{step.title}</h3>
                <p className="text-muted-foreground font-light leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing / Final CTA */}
      <section className="py-24 md:py-40 bg-primary relative overflow-hidden text-center text-white">
        <div className="absolute inset-0 bg-grid-white opacity-20 bg-[size:32px_32px] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto flex flex-col items-center"
          >
            <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-8 tracking-tighter drop-shadow-2xl">
              Get a clear next step.
            </h2>
            <p className="text-lg md:text-2xl text-white/90 font-light mb-12 leading-relaxed max-w-3xl drop-shadow-md">
              Share the scope, location, and discipline for a live project. We’ll review the request and typically respond within 12–24 hours for most standard inquiries.
            </p>
            <Link 
              href="/request-proposal?utm_source=website&utm_medium=organic&utm_campaign=homepage_proposal"
              className="w-full max-w-sm h-16 px-6 md:px-14 bg-white text-primary font-bold text-xs sm:text-sm uppercase tracking-[0.16em] md:tracking-[0.2em] flex items-center justify-center gap-4 rounded-none hover:bg-white/90 transition-all group shadow-[0_0_40px_rgba(0,0,0,0.5)] hover:scale-105 duration-300"
            >
              Request a Proposal
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

const PAGE_META = {
  title: "PE-Stamped MEP & Structural Engineering | Apex Grid",
  description: "PE-stamped structural, commercial MEP, civil, and building-assessment engineering from Arizona, with Title 24 and municipal plan-check support.",
  path: "/",
};
