import { Link } from "wouter";
import { ArrowRight, Shield, Star, Flag, Award, FileCheck, Users, Building2, Zap, HardHat, Layers } from "lucide-react";
import militaryBg from "@assets/generated_images/military-hero.jpg";
import jeremyImg from "@assets/generated_images/jeremy-mills.webp";
import { usePageMeta } from "@/lib/seo";

export default function Military() {
  usePageMeta(PAGE_META);

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative pt-40 pb-32 overflow-hidden bg-background">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-background/85 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent z-10" />
          <img
            src={militaryBg}
            alt=""
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        <div className="container mx-auto px-4 md:px-8 relative z-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 border border-primary/60 bg-primary/10 px-4 py-2 mb-8">
              <Flag className="w-4 h-4 text-primary" />
              <span className="font-mono text-xs uppercase tracking-widest text-primary">Veteran-Owned &amp; Operated</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-8">
              We Support Our <span className="text-primary">Troops</span>
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed border-l-4 border-primary pl-6">
              Apex Grid Engineering is led by a disabled U.S. Air Force veteran. Service isn't a marketing line for us — it's where our discipline, accountability, and mission-first mindset come from.
            </p>
          </div>
        </div>
      </section>

      {/* Jeremy's story */}
      <section className="py-24 bg-background border-b border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-5xl mx-auto md:grid md:grid-cols-[300px_1fr] md:gap-12 md:items-start">
            <div className="mb-10 md:mb-0">
              <div className="aspect-[4/5] bg-secondary border border-border overflow-hidden">
                <img
                  src={jeremyImg}
                  alt="Jeremy Mills, Co-Founder & CEO of Apex Grid Engineering, U.S. Air Force veteran"
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
              </div>
              <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mt-4">Jeremy Mills · Co-Founder &amp; CEO</div>
            </div>
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-primary mb-6 block">A Note from our CEO</span>
              <blockquote className="border-l-4 border-primary pl-8 space-y-5">
                <p className="text-xl leading-relaxed text-foreground/90">
                  "I enlisted in the United States Air Force straight out of high school and spent the better part of a decade maintaining aircraft and systems where a checklist skipped or a torque spec missed could end a mission — or worse. That kind of accountability gets into your bones.
                </p>
                <p className="text-lg leading-relaxed text-foreground/80">
                  When I transitioned out as a disabled veteran and eventually founded Apex Grid, I brought the same mindset to engineering documents: every calculation gets checked, every drawing gets a second set of eyes, and we don't call something done until it can survive scrutiny. The Air Force didn't let us say 'close enough,' and neither do we.
                </p>
                <p className="text-lg leading-relaxed text-foreground/80">
                  Serving military clients and veteran-owned businesses isn't a niche for us — it's personal. We know what's at stake, and we're honored to bring our service-driven standards to every project that crosses our desk."
                </p>
                <footer className="pt-2 text-sm text-muted-foreground font-mono uppercase tracking-widest">
                  — Jeremy, Co-Founder &amp; CEO · USAF Veteran
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Every Branch */}
      <section className="py-24 bg-[#0b1423] border-b border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-5xl mx-auto text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-8 h-[1px] bg-primary" />
              <span className="font-mono text-xs uppercase tracking-widest text-primary">Who We Serve</span>
              <div className="w-8 h-[1px] bg-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Every Branch. Every Mission.</h2>
            <p className="text-lg text-muted-foreground mb-14 max-w-2xl mx-auto">
              Apex Grid supports all branches of the U.S. Armed Forces, the Department of Defense, and the Department of Veterans Affairs across the full spectrum of facilities.
            </p>
            <div className="flex flex-wrap justify-center gap-10 md:gap-14">
              {BRANCHES.map(({ name, abbr, seal }) => (
                <div key={name} className="flex flex-col items-center gap-3">
                  <div
                    className="w-[72px] h-[72px] rounded-full flex items-center justify-center overflow-hidden"
                    style={{
                      background: "radial-gradient(circle at 40% 35%, #243552 0%, #111e30 50%, #080f1c 100%)",
                      boxShadow: "0 0 0 1.5px rgba(180,150,60,0.55), 0 0 0 3.5px rgba(0,0,0,0.8), 0 0 0 5px rgba(180,150,60,0.2)",
                    }}
                  >
                    <img
                      src={seal}
                      alt={name + " seal"}
                      className="w-[52px] h-[52px] object-contain"
                      style={{ filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.7))" }}
                      loading="lazy"
                    />
                  </div>
                  <div className="text-center">
                    <div className="font-mono text-[9px] uppercase tracking-[0.15em] text-primary/80 mb-0.5">{abbr}</div>
                    <div className="text-[11px] font-medium text-foreground/70 leading-tight max-w-[80px]">{name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission statement */}
      <section className="py-24 bg-background border-b border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                From the Flight Line to the <span className="text-primary">Drafting Table</span>
              </h2>
              <p className="text-lg text-foreground/80 leading-relaxed mb-6">
                Our CEO's Air Force service shaped how this firm runs: clear chains of responsibility, checklists that get followed, documentation that holds up to inspection, and zero tolerance for "close enough." We are proud to put those values to work for the military community, and we love doing design work for military organizations.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our engineers design to Department of Defense requirements, including Unified Facilities Criteria (UFC), ATFP standoff and progressive-collapse provisions, secure and mission-critical facility standards, and federal energy mandates. From installation support facilities to reserve centers, armories, and defense-contractor sites, we deliver permit-ready documents engineered to meet government review standards.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-px bg-border">
              <div className="bg-card p-8">
                <Shield className="w-6 h-6 text-primary mb-4" />
                <div className="font-bold mb-2">UFC &amp; ATFP Design</div>
                <p className="text-sm text-muted-foreground">Unified Facilities Criteria compliance, standoff analysis, and structural hardening.</p>
              </div>
              <div className="bg-card p-8">
                <Star className="w-6 h-6 text-primary mb-4" />
                <div className="font-bold mb-2">Mission-Critical MEP</div>
                <p className="text-sm text-muted-foreground">Resilient power, redundant cooling, and secure communications infrastructure.</p>
              </div>
              <div className="bg-card p-8">
                <Flag className="w-6 h-6 text-primary mb-4" />
                <div className="font-bold mb-2">Veteran-Led Delivery</div>
                <p className="text-sm text-muted-foreground">Disabled-veteran leadership that understands the mission and the chain of command.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Engineering Services — per discipline */}
      <section className="py-24 bg-card border-b border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-[1px] bg-primary" />
              <span className="font-mono text-xs uppercase tracking-widest text-primary">Engineering Services</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Full-Service Engineering. One Firm.</h2>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
              A single contract, a single point of accountability — across all four disciplines of design from programming through construction administration.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
              {DISCIPLINES.map(({ icon: Icon, title, body }) => (
                <div key={title} className="bg-background p-8">
                  <Icon className="w-6 h-6 text-primary mb-4" />
                  <div className="font-display font-bold text-lg mb-3">{title}</div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Facility Types */}
      <section className="py-24 bg-background border-b border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-[1px] bg-primary" />
              <span className="font-mono text-xs uppercase tracking-widest text-primary">Facility Types</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">From the Flight Line to the Barracks</h2>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
              Apex Grid has the technical depth to design the full range of military facility types — from basic utilities to classified environments.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-px bg-border">
              {FACILITY_TYPES.map((name) => (
                <div key={name} className="bg-card p-5 flex items-center gap-3">
                  <span className="text-primary text-lg leading-none shrink-0">▸</span>
                  <span className="text-sm text-foreground">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DoD Standards */}
      <section className="py-24 bg-card border-b border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-[1px] bg-primary" />
              <span className="font-mono text-xs uppercase tracking-widest text-primary">DoD Standards</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Engineered to the Standard the Mission Demands</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6 max-w-3xl">
              Military facilities operate under Unified Facilities Criteria — the DoD's comprehensive technical requirements for planning, design, construction, and operation. Apex Grid designs to UFC standards across all disciplines, including antiterrorism force protection requirements that civilian firms often lack the experience to navigate.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-12 max-w-3xl">
              We understand that military projects demand more than building-code compliance. They demand operational continuity, security integration, resilience against defined threat categories, and documentation standards that survive the full government QA process.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
              {DOD_STANDARDS.map((standard) => (
                <div key={standard} className="bg-background px-6 py-4 flex items-start gap-3">
                  <span className="text-primary mt-[3px] shrink-0 font-mono text-xs">✓</span>
                  <span className="text-sm text-foreground">{standard}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* NAICS Codes */}
      <section className="py-24 bg-background border-b border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-[1px] bg-primary" />
              <span className="font-mono text-xs uppercase tracking-widest text-primary">Federal Contracting</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Primary NAICS Codes</h2>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
              Contracting officers can use the following NAICS codes when issuing solicitations or setting up procurement vehicles that include Apex Grid.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-px bg-border">
              {NAICS_CODES.map(({ code, title }) => (
                <div key={code} className="bg-card p-6">
                  <div className="font-mono text-xl font-bold text-primary mb-2">{code}</div>
                  <div className="text-sm text-foreground">{title}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bidding advantage */}
      <section className="py-24 bg-card border-b border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              A Stronger Position on <span className="text-primary">Government Bids</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Because Apex Grid is owned and led by a service-disabled veteran, partnering with us can strengthen your position on government pursuits — many federal and state solicitations give evaluation credit for veteran-owned participation on the project team, where program eligibility requirements are met.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
            <div className="bg-background p-8">
              <Award className="w-6 h-6 text-primary mb-4" />
              <div className="font-bold mb-2">Teaming &amp; Subcontracting</div>
              <p className="text-sm text-muted-foreground">Prime contractors carry small-business subcontracting goals that veteran-owned design partners help meet.</p>
            </div>
            <div className="bg-background p-8">
              <FileCheck className="w-6 h-6 text-primary mb-4" />
              <div className="font-bold mb-2">Government-Grade Documentation</div>
              <p className="text-sm text-muted-foreground">Submittal packages built for reviewers who check everything — clean, complete, and on schedule.</p>
            </div>
            <div className="bg-background p-8">
              <Users className="w-6 h-6 text-primary mb-4" />
              <div className="font-bold mb-2">We Speak the Language</div>
              <p className="text-sm text-muted-foreground">UFC criteria, ATFP provisions, and installation processes aren't foreign to us — they're familiar ground.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-background border-t border-border text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-display font-bold mb-8">Discuss a Military or Defense Project</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
            Installation support facilities, reserve centers, armories, defense-contractor sites — tell us the mission and we'll bring the engineering.
          </p>
          <Link
            href="/contact"
            className="inline-flex h-14 px-8 bg-primary text-white font-bold text-sm uppercase tracking-wider items-center justify-center gap-3 rounded-[2px] hover:bg-primary/90 transition-colors"
          >
            Discuss a Military Project <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

const BRANCHES = [
  { name: "Dept. of Defense",   abbr: "DoD",  seal: "/images/military/dod.svg"         },
  { name: "U.S. Army",          abbr: "ARMY", seal: "/images/military/army.svg"        },
  { name: "U.S. Navy",          abbr: "USN",  seal: "/images/military/navy.svg"        },
  { name: "U.S. Air Force",     abbr: "USAF", seal: "/images/military/air-force.svg"   },
  { name: "U.S. Marine Corps",  abbr: "USMC", seal: "/images/military/marines.svg"     },
  { name: "U.S. Coast Guard",   abbr: "USCG", seal: "/images/military/coast-guard.svg" },
  { name: "U.S. Space Force",   abbr: "USSF", seal: "/images/military/space-force.svg" },
  { name: "Veterans Affairs",   abbr: "VA",   seal: "/images/military/va.svg"          },
];

const DISCIPLINES = [
  {
    icon: Building2,
    title: "Architecture",
    body: "Full architectural design, space programming, and construction documents for military and government facilities — including secure, classified, and mission-critical spaces.",
  },
  {
    icon: Zap,
    title: "MEP Engineering",
    body: "Mechanical, electrical, and plumbing systems engineered to DoD standards: redundant power, mission-critical cooling, UFC-compliant lighting, and hardened utility infrastructure.",
  },
  {
    icon: Layers,
    title: "Structural Engineering",
    body: "Blast-resistant and force-protection structural design, progressive collapse prevention, and UFC-compliant structural analysis for all building types and threat categories.",
  },
  {
    icon: HardHat,
    title: "Civil Engineering",
    body: "Site development, grading, drainage, access roads, perimeter hardening, force-protection standoff layout, and utility coordination for military installations.",
  },
];

const FACILITY_TYPES = [
  "Administrative & HQ Buildings",
  "Maintenance & Operations Facilities",
  "Secure Operations Centers (SOC / EOC)",
  "Power & Utility Infrastructure",
  "Barracks & Dormitory Housing",
  "Hangars & Flight-Line Support",
  "Training & Academic Buildings",
  "Medical & Dental Clinics",
  "SCIF / Sensitive Compartmented Facilities",
  "Warehouses & Supply Chain Facilities",
  "Fitness & Recreation Centers",
  "Mission-Critical Electrical Systems",
];

const DOD_STANDARDS = [
  "Unified Facilities Criteria (UFC) — all applicable series",
  "DoD Minimum Antiterrorism Standards for Buildings (UFC 4-010-01)",
  "High-performance and sustainable building (UFC 1-200-02 / LEED Silver)",
  "ATFP Force Protection design and standoff analysis",
  "National Electrical Code (NEC) and NFPA 72 / 101",
  "ADA / Architectural Barriers Act (ABA) accessibility compliance",
  "NFPA 13 fire suppression for military occupancies",
  "IBC / IFC with applicable DoD amendments",
];

const NAICS_CODES = [
  { code: "541330", title: "Engineering Services" },
  { code: "541310", title: "Architectural Services" },
  { code: "237310", title: "Highway, Street & Bridge Construction" },
  { code: "237990", title: "Other Heavy Civil Engineering" },
  { code: "236220", title: "Commercial & Institutional Building Construction" },
  { code: "541620", title: "Environmental Consulting Services" },
];

const PAGE_META = {
  title: "Military & Defense Engineering | Veteran-Owned Firm | Apex Grid",
  description: "Veteran-owned engineering firm led by a disabled U.S. Air Force veteran. UFC and ATFP design, mission-critical MEP, and permit-ready documents for military and defense facilities.",
  path: "/military",
};
