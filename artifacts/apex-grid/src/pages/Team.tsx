import { useJsonLd, usePageMeta } from "@/lib/seo";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import jeremyImg from "@assets/generated_images/jeremy-mills.webp";
import jasonLuhnImg from "@assets/generated_images/jason-luhn.webp";
import angelImg from "@assets/file_00000000b85c8230ad55cc8b03100eea_1788058580363.png";

/**
 * Team — simple cards. Jeremy Mills = Founder & CEO (NOT a PE).
 * The #construction-delivery anchor is linked from the site nav/footer — keep it.
 */
const LEADERS = [
  {
    name: "Jeremy Mills",
    role: "Founder & CEO · U.S. Air Force Veteran",
    image: jeremyImg,
    bio: "Founded Apex Grid on mission-first discipline — accountability, clear communication, no excuses.",
  },
  {
    name: "Jason Luhn, PE",
    role: "Chief Operating Officer · Professional Engineer",
    image: jasonLuhnImg,
    bio: "The firm's technical anchor. Sets the engineering standard across every discipline.",
  },
  {
    name: "Angel Endres",
    role: "Chief People Officer",
    image: angelImg,
    bio: "Leads the people and culture behind the firm — 15+ years of HR leadership.",
  },
];

const ENGINEERS = [
  { name: "Grant Meaux", role: "Principal · MEP Engineer (PE)" },
  { name: "Jason Luhn", role: "Principal · Structural Engineer (PE)" },
  { name: "Travis Airola", role: "Principal · Civil & Structural Engineer (PE)" },
  { name: "Sevdalina Petkova", role: "Principal · Structural Engineer (PE)" },
  { name: "Jorge Fuentes", role: "Principal · Civil & Structural Engineer (PE)" },
  { name: "Eric Culver", role: "Principal · Professional Engineer (PE)" },
  { name: "Shan Fernando", role: "Head of Engineering" },
];

const PCM_TEAM = [
  { name: "Molly Zbojniewicz", role: "Founding Partner · Client Relations" },
  { name: "Rick Coleman, AIA, LEED", role: "Partner · Pre-Construction Services" },
  { name: "Tom Bell", role: "Project Executive" },
  { name: "Doug Brown", role: "Project Executive" },
];

export default function Team() {
  usePageMeta(PAGE_META);
  useJsonLd(TEAM_SCHEMA);

  return (
    <div className="flex flex-col">
      <section className="relative pt-40 pb-24 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-8 text-white">
              The <span className="text-primary">Team</span>
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed border-l-4 border-primary pl-6">
              20+ engineers. 10+ licensed PEs. One accountable team.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 bg-card border-y border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-12 text-white">Leadership</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {LEADERS.map((person) => (
                <article key={person.name} className="bg-background border border-border rounded-sm overflow-hidden">
                  <div className="aspect-[4/5] bg-secondary overflow-hidden">
                    <img
                      src={person.image}
                      alt={`${person.name} — ${person.role}`}
                      className="w-full h-full object-cover object-top"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-display font-bold text-white">{person.name}</h3>
                    <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.12em] leading-relaxed text-primary">
                      {person.role}
                    </p>
                    <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{person.bio}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Engineering principals */}
      <section className="py-20 bg-background border-b border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-white">Engineering principals</h2>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
              Licensed PEs who own the technical work — from scoping through final submission.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {ENGINEERS.map((person) => (
                <div key={person.name} className="bg-card border border-border p-6 rounded-sm">
                  <h3 className="text-lg font-display font-bold text-white">{person.name}</h3>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-primary">{person.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PCM — construction delivery (anchor linked from site nav/footer) */}
      <section id="construction-delivery" className="py-20 bg-card border-b border-border scroll-mt-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-white">
              Construction delivery <span className="text-muted-foreground">— PCM</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
              Phoenix Construction &amp; Management — our construction delivery branch,
              carrying coordination from engineering through field execution.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PCM_TEAM.map((person) => (
                <div key={person.name} className="bg-background border border-border p-6 rounded-sm">
                  <h3 className="text-lg font-display font-bold text-white">{person.name}</h3>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-primary">{person.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-background text-center">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-white">
            Put the team on your project
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Send us your scope. Clear proposal, fast turnaround.
          </p>
          <Link
            href="/estimate"
            className="inline-flex h-14 px-10 bg-primary text-white font-bold text-sm uppercase tracking-wider items-center justify-center gap-3 rounded-sm hover:bg-primary/90 transition-colors"
          >
            Get My Price <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

const PAGE_META = {
  title: "Our Team | Apex Grid Engineering",
  description: "Meet the Apex Grid Engineering team — founder-led, 20+ engineers, 10+ licensed PEs, plus our PCM construction delivery branch.",
  path: "/team",
};

const TEAM_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: PAGE_META.title,
  description: PAGE_META.description,
  mainEntity: {
    "@type": "Organization",
    name: "Apex Grid Engineering",
    employee: [
      {
        "@type": "Person",
        name: "Jeremy Mills",
        jobTitle: "Founder & CEO",
        worksFor: { "@type": "Organization", name: "Apex Grid Engineering" },
      },
      {
        "@type": "Person",
        name: "Jason Luhn",
        jobTitle: "Chief Operating Officer, Professional Engineer",
        worksFor: { "@type": "Organization", name: "Apex Grid Engineering" },
      },
    ],
  },
};
