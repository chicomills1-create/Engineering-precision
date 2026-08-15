import { Link } from "wouter";
import { ArrowRight, Shield, Star, Flag, Award, FileCheck, Users } from "lucide-react";
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
                  alt="Jeremy Mills, Founder & CEO of Apex Grid Engineering, U.S. Air Force veteran"
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
              </div>
              <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mt-4">Jeremy Mills · Founder &amp; CEO</div>
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
                — Jeremy, Founder &amp; CEO · USAF Veteran
              </footer>
            </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Mission statement */}
      <section className="py-24 bg-card border-y border-border">
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
              <div className="bg-background p-8">
                <Shield className="w-6 h-6 text-primary mb-4" />
                <div className="font-bold mb-2">UFC &amp; ATFP Design</div>
                <p className="text-sm text-muted-foreground">Unified Facilities Criteria compliance, standoff analysis, and structural hardening.</p>
              </div>
              <div className="bg-background p-8">
                <Star className="w-6 h-6 text-primary mb-4" />
                <div className="font-bold mb-2">Mission-Critical MEP</div>
                <p className="text-sm text-muted-foreground">Resilient power, redundant cooling, and secure communications infrastructure.</p>
              </div>
              <div className="bg-background p-8">
                <Flag className="w-6 h-6 text-primary mb-4" />
                <div className="font-bold mb-2">Veteran-Led Delivery</div>
                <p className="text-sm text-muted-foreground">Disabled-veteran leadership that understands the mission and the chain of command.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bidding advantage */}
      <section className="py-24 bg-background">
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
            <div className="bg-card p-8">
              <Award className="w-6 h-6 text-primary mb-4" />
              <div className="font-bold mb-2">Teaming &amp; Subcontracting</div>
              <p className="text-sm text-muted-foreground">Prime contractors carry small-business subcontracting goals that veteran-owned design partners help meet.</p>
            </div>
            <div className="bg-card p-8">
              <FileCheck className="w-6 h-6 text-primary mb-4" />
              <div className="font-bold mb-2">Government-Grade Documentation</div>
              <p className="text-sm text-muted-foreground">Submittal packages built for reviewers who check everything — clean, complete, and on schedule.</p>
            </div>
            <div className="bg-card p-8">
              <Users className="w-6 h-6 text-primary mb-4" />
              <div className="font-bold mb-2">We Speak the Language</div>
              <p className="text-sm text-muted-foreground">UFC criteria, ATFP provisions, and installation processes aren't foreign to us — they're familiar ground.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-card border-t border-border text-center">
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

const PAGE_META = {
  title: "Military & Defense Engineering | Veteran-Owned Firm | Apex Grid",
  description: "Veteran-owned engineering firm led by a disabled U.S. Air Force veteran. UFC and ATFP design, mission-critical MEP, and permit-ready documents for military and defense facilities.",
  path: "/military",
};
