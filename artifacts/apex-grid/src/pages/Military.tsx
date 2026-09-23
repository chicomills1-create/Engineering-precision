import { Link } from "wouter";
import { ArrowRight, Flag, ShieldCheck } from "lucide-react";
import militaryBg from "@assets/generated_images/military-hero.jpg";
import jeremyImg from "@assets/generated_images/jeremy-mills.webp";
import { usePageMeta } from "@/lib/seo";

/**
 * Military — simple and proud. Jeremy's service, what veteran-led means
 * for the work, and a direct CTA. No procurement manual.
 */
const BRANCHES = [
  { name: "U.S. Army", abbr: "ARMY", seal: "/images/military/army.svg" },
  { name: "U.S. Navy", abbr: "USN", seal: "/images/military/navy.svg" },
  { name: "U.S. Air Force", abbr: "USAF", seal: "/images/military/air-force.svg" },
  { name: "U.S. Marine Corps", abbr: "USMC", seal: "/images/military/marines.svg" },
  { name: "U.S. Coast Guard", abbr: "USCG", seal: "/images/military/coast-guard.svg" },
  { name: "U.S. Space Force", abbr: "USSF", seal: "/images/military/space-force.svg" },
];

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
            aria-hidden="true"
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        <div className="container mx-auto px-4 md:px-8 relative z-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 border border-primary/60 bg-primary/10 px-4 py-2 mb-8 rounded-sm">
              <Flag className="w-4 h-4 text-primary" />
              <span className="font-mono text-xs uppercase tracking-widest text-primary">Veteran-owned &amp; operated</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-8 text-white">
              We served.<br />Now we engineer.
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed border-l-4 border-primary pl-6">
              Apex Grid was founded by a U.S. Air Force veteran who deployed to Iraq.
              Service isn't a marketing line — it's how we work.
            </p>
          </div>
        </div>
      </section>

      {/* Jeremy's story — short */}
      <section className="py-24 bg-background border-b border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-5xl mx-auto md:grid md:grid-cols-[300px_1fr] md:gap-12 md:items-start">
            <div className="mb-10 md:mb-0">
              <div className="aspect-[4/5] bg-secondary border border-border overflow-hidden rounded-sm">
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
              <span className="font-mono text-xs uppercase tracking-widest text-primary mb-6 block">From our CEO</span>
              <blockquote className="border-l-4 border-primary pl-8 space-y-5">
                <p className="text-xl leading-relaxed text-foreground/90">
                  "I enlisted in the Air Force straight out of high school and served as an
                  Aerospace Medical Service Journeyman. I deployed to Iraq, where readiness
                  and taking care of the mission weren't abstract ideas — they were the work.
                </p>
                <p className="text-lg leading-relaxed text-foreground/80">
                  I built Apex Grid the same way: every calculation checked, every drawing
                  gets a second set of eyes, and we don't call it done until it survives
                  scrutiny. The Air Force didn't let us say 'close enough' — neither do we."
                </p>
                <footer className="pt-2 text-sm text-muted-foreground font-mono uppercase tracking-widest">
                  — Jeremy Mills, USAF Veteran
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* What veteran-led means — 3 simple points */}
      <section className="py-24 bg-card border-b border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-12 text-white text-center">
              What veteran-led means for your project
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { title: "Checked twice", body: "Every calculation and drawing passes internal QA before it leaves our office." },
                { title: "On time, every time", body: "Mission-first scheduling. We answer when the inspector is waiting." },
                { title: "No excuses", body: "One accountable team from scope to permit. If it's wrong, we own it and fix it." },
              ].map((item) => (
                <div key={item.title} className="bg-background border border-border p-8 rounded-sm text-center">
                  <ShieldCheck className="w-8 h-8 text-primary mx-auto mb-4" strokeWidth={1.5} />
                  <div className="font-display font-bold text-xl mb-3 text-white">{item.title}</div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Every branch */}
      <section className="py-24 bg-background border-b border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-white">Every branch. Every mission.</h2>
            <p className="text-lg text-muted-foreground mb-14 max-w-2xl mx-auto">
              We support all branches of the U.S. Armed Forces, the DoD, and the VA —
              and we're honored to do it.
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

      {/* CTA */}
      <section className="py-28 bg-card text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-display font-bold mb-6 text-white">Got a project? Let's talk.</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
            Military, government, or commercial — tell us what you need fixed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/estimate"
              className="inline-flex h-14 px-8 bg-primary text-white font-bold text-sm uppercase tracking-wider items-center justify-center gap-3 rounded-sm hover:bg-primary/90 transition-colors"
            >
              Get My Price <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-14 px-8 border border-border text-foreground font-bold text-sm uppercase tracking-wider items-center justify-center gap-3 rounded-sm hover:border-primary/50 transition-colors"
            >
              Contact Us <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

const PAGE_META = {
  title: "Veteran-Owned Engineering Firm | U.S. Air Force Veteran-Led | Apex Grid",
  description: "Apex Grid Engineering is veteran-owned and operated — founded by a U.S. Air Force veteran. Mission-first engineering: checked twice, delivered on time, no excuses.",
  path: "/military",
};
