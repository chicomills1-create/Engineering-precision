import { Link } from "wouter";
import { ArrowRight, Stamp, PencilRuler, Calculator, BadgeCheck, Timer, ShieldCheck } from "lucide-react";
import heroBg from "@assets/generated_images/hero-bg2.webp";
import { useJsonLd, usePageMeta } from "@/lib/seo";
import { APEX_GRID_BUSINESS_SCHEMA } from "@/lib/business-schema";
import { LicensingCoverage } from "@/components/LicensingCoverage";

/**
 * Homepage — problem-first. Visitor has a problem (needs a stamp, needs a
 * design, needs numbers). Lead with the problem, offer the fix, give the
 * price. No methodology lessons.
 */
const NEEDS = [
  {
    icon: Stamp,
    title: "Plans need a PE stamp?",
    body: "Send us your drawings. A licensed PE reviews and seals them.",
    cta: "Stamp my plans",
  },
  {
    icon: PencilRuler,
    title: "Need engineering design?",
    body: "Structural, MEP, civil — designed from the ground up, ready for permit.",
    cta: "Design my project",
  },
  {
    icon: Calculator,
    title: "Need calculations?",
    body: "Load calcs, energy calcs, Title 24 — the numbers your permit needs.",
    cta: "Run the numbers",
  },
];

const FACTS = [
  { value: "Veteran-owned", label: "U.S. Air Force veteran-led" },
  { value: "49 states", label: "Licensed across the U.S." },
  { value: "15+ years", label: "Engineering experience" },
  { value: "20+ engineers", label: "On the team" },
  { value: "10+ PEs", label: "Licensed professionals" },
];

const SERVICES = [
  { name: "PE Stamp & Sealing", href: "/pe-stamp" },
  { name: "Structural Engineering", href: "/services/structural" },
  { name: "MEP Engineering", href: "/services/mep" },
  { name: "Civil Engineering", href: "/services/civil" },
  { name: "Building Assessments", href: "/services/assessments" },
  { name: "Architectural Design", href: "/services/architecture" },
];

export default function Home() {
  usePageMeta(PAGE_META);
  useJsonLd(APEX_GRID_BUSINESS_SCHEMA);

  return (
    <div className="flex flex-col overflow-x-hidden">
      {/* Hero — the problem, the fix, the price */}
      <section className="relative min-h-[92dvh] flex items-center justify-center pt-24 pb-20 overflow-hidden bg-background">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-background/85 mix-blend-multiply z-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/70 to-background z-10" />
          {heroBg && (
            <img
              src={heroBg}
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover opacity-60 grayscale contrast-125"
            />
          )}
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-30">
          <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
            <span className="font-mono text-[10px] sm:text-xs tracking-[0.3em] text-primary uppercase font-bold mb-8">
              Apex Grid Engineering
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.95] tracking-tighter mb-6 text-white">
              What do you need<br />fixed?
            </h1>
            <p className="text-lg md:text-2xl text-foreground/80 max-w-2xl mb-12 leading-relaxed font-light">
              Best price. Fastest turnaround. Tap what you need — get your number in under a minute.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-4xl">
              {NEEDS.map((need) => (
                <Link
                  key={need.title}
                  href="/estimate"
                  className="group flex flex-col items-center bg-card/90 backdrop-blur border border-border hover:border-primary transition-colors p-8 rounded-sm focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none min-h-[220px] justify-center"
                >
                  <need.icon className="w-10 h-10 text-primary mb-5 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                  <div className="text-xl font-display font-bold text-white mb-2">{need.title}</div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">{need.body}</p>
                  <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-primary">
                    {need.cta}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              ))}
            </div>

            <Link
              href="/estimate"
              className="mt-10 inline-flex h-16 px-10 bg-primary text-white font-bold text-sm uppercase tracking-[0.15em] items-center justify-center gap-3 rounded-sm hover:bg-primary/90 transition-colors focus-visible:ring-4 focus-visible:ring-primary/50"
            >
              Get My Price Now
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Trust facts — stated directly */}
      <section className="border-y border-white/10 bg-card" aria-label="Why Apex Grid">
        <div className="grid grid-cols-2 lg:grid-cols-5 divide-x divide-y lg:divide-y-0 divide-white/10">
          {FACTS.map((fact) => (
            <div key={fact.label} className="p-8 md:p-10 text-center">
              <div className="text-3xl md:text-4xl font-display font-bold text-white mb-2 tracking-tight">{fact.value}</div>
              <div className="text-[10px] md:text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground">{fact.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Speed + price promise */}
      <section className="py-20 md:py-28 bg-background border-b border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-6 mb-8">
              <div className="flex items-center gap-3">
                <BadgeCheck className="w-6 h-6 text-primary" />
                <span className="text-white font-bold">Best price</span>
              </div>
              <div className="w-px h-8 bg-border" />
              <div className="flex items-center gap-3">
                <Timer className="w-6 h-6 text-primary" />
                <span className="text-white font-bold">Fastest turnaround</span>
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-white mb-6">
              Tap-tap-tap. <span className="text-muted-foreground italic font-light">There's your price.</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              Answer a few quick questions about your project and get a ballpark range on the spot.
              No sales call required. Quotes back within 12–24 hours.
            </p>
            <Link
              href="/estimate"
              className="inline-flex h-16 px-10 bg-primary text-white font-bold text-sm uppercase tracking-[0.15em] items-center justify-center gap-3 rounded-sm hover:bg-primary/90 transition-colors focus-visible:ring-4 focus-visible:ring-primary/50"
            >
              Start My Estimate
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* What we do — plain list of tap cards */}
      <section className="py-20 md:py-28 bg-secondary/20 border-b border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-white mb-6">
              What we do
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Structural, MEP, civil, and architecture — coordinated through one accountable,
              PE-led and veteran-led team. We engineer solutions that clear plan-check and
              make sense in the field. Already have drawings? We stamp those too.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {SERVICES.map((s) => (
              <Link
                key={s.name}
                href={s.href}
                className="group flex items-center justify-between bg-card border border-border hover:border-primary/60 p-6 rounded-sm transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
              >
                <span className="text-foreground font-bold text-lg group-hover:text-white transition-colors">{s.name}</span>
                <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <LicensingCoverage />

      {/* Veteran-led, plain spoken */}
      <section className="py-20 md:py-28 bg-background border-b border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <ShieldCheck className="w-10 h-10 text-primary mx-auto mb-6" strokeWidth={1.5} />
            <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-white mb-6">
              Veteran-owned. Mission-driven.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              A PE-led, veteran-led team. Founded by a U.S. Air Force veteran — we run
              engineering the way the military runs a mission: checked twice, delivered
              on time, no excuses.
            </p>
            <Link
              href="/about"
              className="inline-flex h-14 px-8 border border-border text-white font-bold text-xs uppercase tracking-wider items-center justify-center gap-3 rounded-sm hover:border-primary/50 transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
            >
              Meet the Firm
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-28 md:py-36 bg-primary relative overflow-hidden text-center text-white">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto flex flex-col items-center">
            <h2 className="text-5xl md:text-6xl font-display font-bold mb-6 tracking-tighter">
              Got a project? Let's fix it.
            </h2>
            <p className="text-lg md:text-xl text-white/90 font-light mb-10 max-w-xl">
              Get your ballpark price in under a minute — or send us your plans and we'll take it from there.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link
                href="/estimate"
                className="h-16 px-10 bg-white text-primary font-bold text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-3 rounded-sm hover:bg-white/90 transition-colors focus-visible:ring-4 focus-visible:ring-white/50 focus-visible:outline-none"
              >
                Get My Price
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="h-16 px-10 border-2 border-white/60 text-white font-bold text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-3 rounded-sm hover:bg-white/10 transition-colors focus-visible:ring-4 focus-visible:ring-white/50 focus-visible:outline-none"
              >
                Send Us Your Plans
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const PAGE_META = {
  title: "PE-Stamped MEP & Structural Engineering | Apex Grid",
  description: "Need plans stamped, engineering designed, or calculations run? Veteran-owned engineering firm licensed in 49 states. Best price, fastest turnaround — get your ballpark in under a minute.",
  path: "/",
};
