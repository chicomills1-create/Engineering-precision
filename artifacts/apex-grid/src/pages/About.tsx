import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { SITE_URL, useJsonLd, usePageMeta } from "@/lib/seo";
import officeImg from "@assets/generated_images/office.webp";
import jeremyImg from "@assets/generated_images/jeremy-mills.webp";
import jasonLuhnImg from "@assets/generated_images/jason-luhn.webp";
import angelImg from "@assets/file_00000000b85c8230ad55cc8b03100eea_1788058580363.png";
import { LICENSING_COVERAGE_STATEMENT } from "@/lib/licensing";

/**
 * About — human and simple. Who we are, why we exist, the people.
 * Jeremy Mills is Founder & CEO (NOT a PE) — stated plainly.
 */
export default function About() {
  usePageMeta(PAGE_META);
  useJsonLd(JEREMY_PERSON_SCHEMA);

  return (
    <div className="flex flex-col">
      <section className="relative pt-40 pb-32 overflow-hidden bg-background">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-background/80 mix-blend-multiply z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" />
          {officeImg && (
            <img
              src={officeImg}
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover opacity-30"
            />
          )}
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-20">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-8 text-white">
              About Apex Grid
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed border-l-4 border-primary pl-6">
              Engineering drawings should solve problems in the field, not create them.
              That's why we exist.
            </p>
          </div>
        </div>
      </section>

      {/* The story — plain */}
      <section className="py-24 bg-card border-y border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 max-w-6xl mx-auto">
            <div className="text-lg text-muted-foreground leading-relaxed space-y-6">
              <p>
                Apex Grid Engineering was founded by Jeremy Mills, a U.S. Air Force veteran
                who served in Aerospace Medical Service and deployed to Iraq. He built the
                firm the way the military runs a mission — checked twice, delivered on time,
                no excuses.
              </p>
              <p>
                We're a veteran-owned engineering firm with 20+ engineers and 10+ licensed
                PEs across structural, MEP, civil, and architecture. {LICENSING_COVERAGE_STATEMENT}
              </p>
              <p>
                One firm, one point of contact. You tell us the problem — we design it,
                stamp it, or run the numbers, and get you a price fast.
              </p>
            </div>

            <div className="border border-border bg-background p-6 sm:p-10 rounded-sm h-fit">
              <h3 className="font-display font-bold text-2xl mb-8 text-white">By the numbers</h3>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                {[
                  ["Licensed in 49 states", "Every state except Alaska"],
                  ["12–24 hr", "Quote turnaround"],
                  ["15+ years", "Engineering experience"],
                  ["10+ PEs", "Licensed professionals"],
                ].map(([value, label]) => (
                  <div key={label} className="min-w-0">
                    <div className="mb-2 break-words font-display text-3xl font-bold leading-tight text-primary sm:text-4xl">{value}</div>
                    <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership — simple cards */}
      <section className="py-24 bg-background border-b border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-center text-white">Leadership</h2>
            <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-16">
              Founder-led. The people who answer for the work.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-card border border-border p-8 rounded-sm">
                <div className="aspect-[4/5] bg-secondary border border-border mb-8 overflow-hidden rounded-sm">
                  <img
                    src={jeremyImg}
                    alt="Jeremy Mills, Founder and CEO of Apex Grid Engineering"
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-2xl font-display font-bold mb-1 text-white">Jeremy Mills</h3>
                <div className="font-mono text-xs uppercase tracking-widest text-primary mb-6">Founder &amp; CEO · U.S. Air Force Veteran</div>
                <p className="text-muted-foreground leading-relaxed">
                  Jeremy founded Apex Grid on mission-first discipline: accountability,
                  clear communication, and delivering for clients the way you deliver
                  for your unit — no excuses, no surprises.
                </p>
                <Link
                  href="/military"
                  className="inline-flex items-center gap-2 mt-6 text-sm font-bold text-primary hover:underline underline-offset-4"
                >
                  His service story <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="bg-card border border-border p-8 rounded-sm">
                <div className="aspect-[4/5] bg-secondary border border-border mb-8 overflow-hidden rounded-sm">
                  <img
                    src={jasonLuhnImg}
                    alt="Jason Luhn, PE — Chief Operating Officer of Apex Grid Engineering"
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-2xl font-display font-bold mb-1 text-white">Jason Luhn, PE</h3>
                <div className="font-mono text-xs uppercase tracking-widest text-primary mb-6">Chief Operating Officer · Professional Engineer</div>
                <p className="text-muted-foreground leading-relaxed">
                  Jason is the firm's technical anchor. A licensed Professional Engineer,
                  he sets the engineering standard across every discipline — constructable
                  drawings, code-first design, documents that pass review the first time.
                </p>
              </div>
              <div className="bg-card border border-border p-8 rounded-sm">
                <div className="aspect-[4/5] bg-secondary border border-border mb-8 overflow-hidden rounded-sm">
                  <img
                    src={angelImg}
                    alt="Angel Endres, Chief People Officer of Apex Grid Engineering"
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-2xl font-display font-bold mb-1 text-white">Angel Endres</h3>
                <div className="font-mono text-xs uppercase tracking-widest text-primary mb-6">Chief People Officer</div>
                <p className="text-muted-foreground leading-relaxed">
                  Angel leads the people and culture behind the firm — 15+ years of HR
                  leadership, including deep experience in the engineering industry.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-card text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-display font-bold mb-6 text-white">Work with us</h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10">
            Tell us the problem. We'll give you a price and a plan — fast.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/estimate"
              className="inline-flex h-14 px-8 bg-primary text-white font-bold text-sm uppercase tracking-wider items-center justify-center gap-3 rounded-sm hover:bg-primary/90 transition-colors"
            >
              Get My Price <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/team"
              className="inline-flex h-14 px-8 border border-border text-foreground font-bold text-sm uppercase tracking-wider items-center justify-center gap-3 rounded-sm hover:border-primary/50 transition-colors"
            >
              Meet the Team <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

const JEREMY_PERSON_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/military#jeremy`,
  name: "Jeremy Mills",
  alternateName: ["Chico Mills", "Pastor Jeremy Mills", "Pastor Chico Mills"],
  url: `${SITE_URL}/military`,
  mainEntityOfPage: { "@id": `${SITE_URL}/military#jeremy` },
  jobTitle: "Founder and Chief Executive Officer",
  description:
    "Founder and CEO of Apex Grid Engineering, U.S. Air Force veteran, and Founder and Senior Pastor of 16:3 Faith.",
  worksFor: { "@id": `${SITE_URL}/#business` },
  affiliation: {
    "@type": "Organization",
    name: "16:3 Faith",
    url: "https://163faith.com",
  },
};

const PAGE_META = {
  title: "About Our Engineering Firm | Apex Grid Engineering",
  description: "Apex Grid Engineering — veteran-owned engineering firm with 20+ engineers and 10+ PEs. Structural, MEP, civil, and architectural design, licensed in 49 states.",
  path: "/about",
};
