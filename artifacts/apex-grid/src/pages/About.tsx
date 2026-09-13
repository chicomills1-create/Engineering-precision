import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { SITE_URL, useJsonLd, usePageMeta } from "@/lib/seo";
import officeImg from "@assets/generated_images/office.webp";
import jeremyImg from "@assets/generated_images/jeremy-mills.webp";
import jasonLuhnImg from "@assets/generated_images/jason-luhn.webp";
import angelImg from "@assets/file_00000000b85c8230ad55cc8b03100eea_1788058580363.png";
import { LicensingCoverage } from "@/components/LicensingCoverage";
import { LICENSING_COVERAGE_STATEMENT, PROJECT_JURISDICTION_NOTE } from "@/lib/licensing";

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
              alt="Engineering Office" 
              className="w-full h-full object-cover opacity-30"
            />
          )}
        </div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-20">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-8">
              Firm <span className="text-muted-foreground">Story</span>
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed border-l-4 border-primary pl-6">
              Apex Grid Engineering was founded on a simple premise: engineering drawings should solve problems in the field, not create them.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-card border-y border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <div className="text-lg text-muted-foreground leading-relaxed space-y-6">
              <p>
                Apex Grid is a multifaceted organization built around three connected capabilities: Engineering, Architecture, and General Contracting. We support owners, architects, developers, and contractors in multiple markets, subject to project-specific professional and firm authorization.
              </p>
              <p>
                As an integrated design firm—housing Structural, MEP, Civil, and Architectural services under one roof—we eliminate the friction of coordinating between disconnected consultants. Through Phoenix Construction &amp; Management (PCM), our construction delivery branch also carries that coordination into pre-construction and field execution.
              </p>
              <p>
                We are not an outsourced drafting service. {LICENSING_COVERAGE_STATEMENT} {PROJECT_JURISDICTION_NOTE}
              </p>
            </div>
            
            <div className="bg-background p-10 border border-border">
              <h3 className="font-display font-bold text-2xl mb-8">By The Numbers</h3>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-5xl font-display font-bold text-primary mb-2">Licensed in 49 states</div>
                  <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Every State Except Alaska</div>
                </div>
                <div>
                  <div className="text-5xl font-display font-bold text-primary mb-2">12-24hr</div>
                  <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Initial Review Response</div>
                </div>
                <div>
                  <div className="text-5xl font-display font-bold text-primary mb-2">15</div>
                  <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Years of Expertise</div>
                </div>
                <div>
                  <div className="text-5xl font-display font-bold text-primary mb-2">4</div>
                  <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Core Disciplines</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <LicensingCoverage />

      <section className="py-24 bg-background border-y border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mb-14">
            <span className="font-mono text-xs tracking-widest text-primary uppercase">
              Apex Grid Advantage
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mt-4 mb-6">
              Why Top Developers Choose Apex Grid
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our PEs take on jobs directly, so technical leadership is present
              from scoping through final submission—not added only at the end.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
            <div className="bg-card p-8">
              <h3 className="text-2xl font-display font-bold mb-4">
                Direct PE Accountability
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                When a regulated scope requires a seal, the responsible
                professional, applicable license, firm authorization,
                discipline, and AHJ requirements are confirmed before the
                project is accepted.
              </p>
            </div>
            <div className="bg-card p-8">
              <h3 className="text-2xl font-display font-bold mb-4">
                Unmatched Engineering Scale
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                With a powerful internal roster of multi-discipline engineering team, we
                provide senior-level oversight without the project delays
                typical of smaller boutique firms.
              </p>
            </div>
            <div className="bg-card p-8">
              <h3 className="text-2xl font-display font-bold mb-4">
                Nationwide Agility, Regional Mastery
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {LICENSING_COVERAGE_STATEMENT} {PROJECT_JURISDICTION_NOTE}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-card border-y border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mb-14">
            <span className="font-mono text-xs tracking-widest text-primary uppercase">Apex Grid Organization</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mt-4 mb-6">Three capabilities. <span className="text-muted-foreground">One accountable team.</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
            {[
              ["Engineering", "Structural, MEP, civil, and assessment services designed for code compliance and constructability."],
              ["Architecture", "Concept through permit-ready documents, coordinated directly with the engineering team."],
              ["General Contracting", "Construction delivery through Phoenix Construction & Management (PCM), our construction branch."],
            ].map(([title, description]) => (
              <div key={title} className="bg-background p-8">
                <h3 className="text-2xl font-display font-bold mb-4">{title}</h3>
                <p className="text-muted-foreground leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Executive leadership */}
      <section className="py-32 bg-background border-b border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-center">Executive Leadership</h2>
            <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-16">
              Apex Grid Engineering is founder-led, operationally disciplined, and built around the people and standards that make accountable delivery possible.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
              <div className="bg-card p-10">
                <div className="aspect-[4/5] bg-secondary border border-border mb-8 overflow-hidden">
                  <img
                    src={jeremyImg}
                    alt="Jeremy Mills, Founder & CEO of Apex Grid Engineering"
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                </div>
                <div className="w-12 h-[2px] bg-primary mb-6" />
                <h3 className="text-2xl font-display font-bold mb-1">
                  <Link href="/military" className="hover:text-primary transition-colors">
                    Jeremy Mills
                  </Link>
                </h3>
                <div className="font-mono text-xs uppercase tracking-widest text-primary mb-6">Founder &amp; CEO · U.S. Air Force Veteran</div>
                <p className="text-muted-foreground leading-relaxed">
                  Jeremy leads Apex Grid with the same mission-first discipline he developed in uniform. As an Aerospace Medical Service Journeyman who deployed to Iraq in support of Operation Iraqi Freedom, he built the firm around accountability, clear communication, and delivering for clients the way you deliver for your unit — no excuses, no surprises.
                </p>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                  Outside Apex Grid, Jeremy is also the Founder and Senior Pastor of{" "}
                  <a
                    href="https://163faith.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary hover:underline underline-offset-4"
                  >
                    16:3 Faith
                  </a>
                  , a separate faith-centered community focused on Scripture, prayer, and daily discipleship.
                </p>
                <Link
                  href="/military"
                  className="inline-flex items-center gap-2 mt-6 text-sm font-bold text-primary hover:underline underline-offset-4"
                >
                  Jeremy’s leadership profile <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="bg-card p-10">
                <div className="aspect-[4/5] bg-secondary border border-border mb-8 overflow-hidden">
                  <img
                    src={jasonLuhnImg}
                    alt="Jason Luhn, PE — Chief Operating Officer of Apex Grid Engineering"
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                </div>
                <div className="w-12 h-[2px] bg-primary mb-6" />
                <h3 className="text-2xl font-display font-bold mb-1">Jason Luhn, PE</h3>
                <div className="font-mono text-xs uppercase tracking-widest text-primary mb-6">Chief Operating Officer · Professional Engineer</div>
                <p className="text-muted-foreground leading-relaxed">
                  Jason is the firm's operational and technical anchor. A licensed Professional Engineer, he runs the firm's day-to-day operations and sets the engineering standard across every discipline — insisting on constructable drawings, code-first design, and documents that pass review the first time.
                </p>
              </div>
              <div className="bg-card p-10">
                <div className="aspect-[4/5] bg-secondary border border-border mb-8 overflow-hidden">
                  <img
                    src={angelImg}
                    alt="Angel Endres, Chief People Officer of Apex Grid Engineering"
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                </div>
                <div className="w-12 h-[2px] bg-primary mb-6" />
                <h3 className="text-2xl font-display font-bold mb-1">Angel Endres</h3>
                <div className="font-mono text-xs uppercase tracking-widest text-primary mb-6">Chief People Officer · SHRM Professional</div>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Angel is a seasoned Human Resources executive with more than 15 years of HR leadership experience, including five years as an HR Director in the engineering field.
                  </p>
                  <p>
                    She strengthens the people, culture, and organizational infrastructure behind Apex Grid's continued growth, with expertise in talent acquisition, employee development, performance management, compliance, workplace investigations, and leadership development.
                  </p>
                  <p>
                    Her award-recognized work in engineering-industry HR compliance and SHRM-informed professional practice makes her a strategic partner to executive leadership.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-16 text-center">Our Methodology</h2>
            
            <div className="space-y-16">
              <div className="grid grid-cols-1 md:grid-cols-[100px_1fr] gap-6 group">
                <div className="text-5xl font-display font-bold text-border group-hover:text-primary transition-colors">01</div>
                <div>
                  <h3 className="text-2xl font-bold mb-3 uppercase tracking-wide">Code-First Compliance</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    We begin every project by establishing the exact parameters dictated by local jurisdictions. We don't guess at requirements; we engineer to the letter of the code, drastically reducing permitting delays.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-[100px_1fr] gap-6 group">
                <div className="text-5xl font-display font-bold text-border group-hover:text-primary transition-colors">02</div>
                <div>
                  <h3 className="text-2xl font-bold mb-3 uppercase tracking-wide">Cross-Discipline Coordination</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Because we house Architecture, Structural, MEP, and Civil under one roof, we identify clashes in the model, not in the field. Our integrated approach ensures mechanical ducts don't fight structural beams.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-[100px_1fr] gap-6 group">
                <div className="text-5xl font-display font-bold text-border group-hover:text-primary transition-colors">03</div>
                <div>
                  <h3 className="text-2xl font-bold mb-3 uppercase tracking-wide">Constructable Drawings</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    A beautifully engineered system means nothing if the contractor can't interpret the plans. We pride ourselves on producing the most legible, explicit, and practical construction documents in the industry.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities CTA */}
      <section className="py-20 bg-card border-t border-border text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-bold mb-4">Procurement &amp; Government Clients</h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Contracting officers and prime contractors can review our full capabilities reference — disciplines, NAICS codes, licensing coverage, and downloadable capabilities statement.
          </p>
          <Link
            href="/capabilities"
            className="inline-flex h-12 px-8 bg-primary text-white font-bold text-sm uppercase tracking-wider items-center justify-center gap-3 rounded-[2px] hover:bg-primary/90 transition-colors"
          >
            View Firm Capabilities <ArrowRight className="w-4 h-4" />
          </Link>
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
  description: "Meet Apex Grid Engineering — a multidisciplinary design firm delivering precise, code-compliant architectural, MEP, structural, and civil design solutions.",
  path: "/about",
};
