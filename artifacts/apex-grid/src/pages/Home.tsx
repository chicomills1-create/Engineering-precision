import { Link } from "wouter";
import { ArrowRight, Stamp, PencilRuler, Calculator, BadgeCheck, Timer, ShieldCheck } from "lucide-react";
import heroBg from "@assets/generated_images/hero-bg2.webp";
import { useJsonLd, usePageMeta } from "@/lib/seo";
import { APEX_GRID_BUSINESS_SCHEMA } from "@/lib/business-schema";
import { LicensingCoverage } from "@/components/LicensingCoverage";
import { PlanDropZone } from "@/components/PlanDropZone";

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
    need: "pe-review-sealing",
  },
  {
    icon: PencilRuler,
    title: "Need engineering design?",
    body: "Structural, MEP, civil — designed from the ground up, ready for permit.",
    cta: "Design my project",
    need: "calculations-stamped-drawings",
  },
  {
    icon: Calculator,
    title: "Need calculations?",
    body: "Load calcs, energy calcs, Title 24 — the numbers your permit needs.",
    cta: "Run the numbers",
    need: "engineering-calculations",
  },
];

const FACTS = [
  { value: "Veteran-owned", label: "U.S. Air Force veteran-led" },
  { value: "49 states", label: "Licensed across the U.S." },
  { value: "15+ years", label: "Engineering experience" },
  { value: "20+ engineers", label: "On the team" },
  { value: "10+ PEs", label: "Licensed professionals" },
  { value: "5.0★", label: "Google rating" },
];

const SERVICES = [
  { name: "PE Stamp & Sealing", href: "/pe-stamp" },
  { name: "Structural Engineering", href: "/services/structural" },
  { name: "MEP Engineering", href: "/services/mep" },
  { name: "Civil Engineering", href: "/services/civil" },
  { name: "Building Assessments", href: "/services/assessments" },
  { name: "Architectural Design", href: "/services/architecture" },
];

const GOOGLE_REVIEWS_URL = "https://www.google.com/maps/search/?api=1&query=Apex+Grid+Engineering+PLLC+Queen+Creek+AZ";

const REVIEWS = [
  {
    name: "Nayon Iovino",
    role: "Google review",
    quote:
      "Great costumer service. Speedy work with quality. I strongly recommend!",
  },
  {
    name: "Griffin Phillips",
    role: "Google review",
    quote:
      "Apex was great to work with! We had a project that required both structural and MEP engineering and they got us taken care of promptly! They will definitely be getting our next projects.",
  },
  {
    name: "James Wadlund",
    role: "Google review",
    quote:
      "I had an issue at my home that required an engineer to draw plans and stamp them. Most firms turned me down, but not APEX Grid. Jeremy Mills was fantastic to work with. Honestly some of the best communication I've received from a business in years.",
  },
  {
    name: "Ammad Riaz",
    role: "Google review",
    quote:
      "Jeremy is a great communicator. I trust him on projects to be responsive until the job is done. I would definitely consider him for engineering projects!",
  },
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
              Permit-ready engineering.<br />Stamped in days, not months.
            </h1>
            <p className="text-lg md:text-2xl text-foreground/80 max-w-2xl mb-12 leading-relaxed font-light">
              Plans stamped, designs engineered, permits cleared — best price, fastest turnaround. Tap what you need, or send your drawings and get your number in under a minute.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-4xl">
              {NEEDS.map((need) => (
                <Link
                  key={need.title}
                  href={`/estimate?need=${need.need}`}
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

      {/* Send us your plans — the GC transaction */}
      <section className="py-20 md:py-28 bg-background border-b border-border" aria-label="Send us your plans">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <span className="font-mono text-[10px] sm:text-xs tracking-[0.3em] text-primary uppercase font-bold">
                Skip the form. Send the drawings.
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-white mt-4 mb-4">
                Send us your plans.
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Drop your drawings below — a licensed PE reviews them and your quote lands in 12–24 hours.
              </p>
            </div>
            <PlanDropZone />
          </div>
        </div>
      </section>

      {/* Trust facts — stated directly */}
      <section className="border-y border-white/10 bg-card" aria-label="Why Apex Grid">
        <div className="grid grid-cols-2 lg:grid-cols-6 divide-x divide-y lg:divide-y-0 divide-white/10">
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

      {/* Google Reviews — What clients say */}
      <section className="py-20 md:py-28 bg-background border-b border-border" aria-label="Google reviews">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-6">
              <svg width="32" height="32" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-white">
                Google Reviews
              </h2>
            </div>
            <div className="flex items-center justify-center gap-2 mb-6" aria-label="Rated 5.0 out of 5 on Google">
              <span className="text-[#FBBC05] text-xl tracking-tight" aria-hidden="true">★★★★★</span>
              <span className="text-sm text-muted-foreground font-medium">5.0 on Google</span>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Real reviews from real clients on Google.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {REVIEWS.map((r) => (
              <figure
                key={r.name}
                className="bg-card border border-border hover:border-primary/60 p-8 rounded-sm flex flex-col transition-colors"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[#FBBC05] text-lg" aria-hidden="true">★★★★★</span>
                </div>
                <blockquote className="text-foreground/90 leading-relaxed mb-6 flex-1">
                  &ldquo;{r.quote}&rdquo;
                </blockquote>
                <figcaption className="flex items-center gap-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" className="flex-shrink-0">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                  <div>
                    <div className="text-white font-bold">{r.name}</div>
                    <div className="text-sm text-muted-foreground">{r.role}</div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="text-center mt-10">
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
            >
              View all reviews on Google
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-28 md:py-36 bg-primary relative overflow-hidden text-center text-white">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto flex flex-col items-center">
            <h2 className="text-5xl md:text-6xl font-display font-bold mb-6 tracking-tighter">
              Got a project? Let's build it.
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


