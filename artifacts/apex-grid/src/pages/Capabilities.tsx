import { Link } from "wouter";
import { ArrowRight, Download, ShieldCheck } from "lucide-react";
import { useJsonLd, usePageMeta } from "@/lib/seo";
import { APEX_GRID_BUSINESS_SCHEMA } from "@/lib/business-schema";
import { LICENSING_COVERAGE_STATEMENT } from "@/lib/licensing";

/**
 * Capabilities — plain language. What we can do, who we do it for,
 * and what procurement officers need. No dense procurement prose.
 */
const DISCIPLINES = [
  {
    title: "Structural Engineering",
    body: "New buildings, additions, ADUs, retrofits — gravity and lateral design that passes review.",
  },
  {
    title: "MEP Engineering",
    body: "HVAC, electrical, plumbing — coordinated building systems, Title 24 included.",
  },
  {
    title: "Civil Engineering",
    body: "Grading, drainage, stormwater, utilities — the site work jurisdictions require.",
  },
  {
    title: "Architectural Design",
    body: "Concept through permit-ready documents, designed alongside our engineers.",
  },
  {
    title: "PE Stamping & Sealing",
    body: "Licensed PE review and sealing of new and existing designs, where authorized.",
  },
  {
    title: "Building Assessments",
    body: "Condition reports, MEP life-expectancy, seismic risk — facts before you buy or build.",
  },
];

const PROJECT_TYPES = [
  "New ground-up construction",
  "Tenant improvements",
  "Additions & expansions",
  "ADUs & residential",
  "Seismic retrofits",
  "Healthcare & medical",
  "Data centers & mission-critical",
  "Military & government facilities",
  "Multi-family residential",
];

const NAICS_CODES = [
  { code: "541330", title: "Engineering Services" },
  { code: "541310", title: "Architectural Services" },
  { code: "236220", title: "Commercial & Institutional Building Construction" },
  { code: "237990", title: "Other Heavy Civil Engineering Construction" },
];

export default function Capabilities() {
  usePageMeta(PAGE_META);
  useJsonLd(APEX_GRID_BUSINESS_SCHEMA);
  useJsonLd(CAPABILITIES_BREADCRUMB_SCHEMA);

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative pt-40 pb-28 overflow-hidden bg-background border-b border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-8 text-white">
              What we can do
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed border-l-4 border-primary pl-6 mb-10">
              Six disciplines, one firm, one point of contact. {LICENSING_COVERAGE_STATEMENT}
            </p>
            <a
              href="/capabilities-statement.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 px-8 bg-primary text-white font-bold text-sm uppercase tracking-wider items-center justify-center gap-3 rounded-sm hover:bg-primary/90 transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
            >
              <Download className="w-4 h-4" />
              Download Capabilities Statement
            </a>
          </div>
        </div>
      </section>

      {/* Disciplines — plain language */}
      <section className="py-20 bg-card border-b border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-10 text-white">Disciplines</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {DISCIPLINES.map((d) => (
                <div key={d.title} className="bg-background border border-border p-8 rounded-sm">
                  <div className="font-display font-bold text-lg mb-3 text-white">{d.title}</div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{d.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Project types */}
      <section className="py-20 bg-background border-b border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-10 text-white">Project types</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-px bg-border rounded-sm overflow-hidden">
              {PROJECT_TYPES.map((name) => (
                <div key={name} className="bg-card p-5 flex items-center gap-3">
                  <span className="text-primary text-lg leading-none shrink-0">▸</span>
                  <span className="text-sm text-foreground">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Procurement quick facts */}
      <section className="py-20 bg-card border-b border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <ShieldCheck className="w-6 h-6 text-primary" />
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white">For procurement teams</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
              <div className="bg-background border border-border p-8 rounded-sm">
                <div className="font-bold text-lg mb-2 text-white">Veteran-owned & led</div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Founded and led by a U.S. Air Force veteran. Confirm any current SBA certification
                  status in the official registry before relying on a socioeconomic designation.
                </p>
              </div>
              <div className="bg-background border border-border p-8 rounded-sm">
                <div className="font-bold text-lg mb-2 text-white">Licensing</div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {LICENSING_COVERAGE_STATEMENT} Responsible professional credentials are
                  verified for each project before any regulated work is proposed.
                </p>
              </div>
            </div>
            <h3 className="text-xl font-display font-bold mb-6 text-white">NAICS codes</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-sm overflow-hidden">
              {NAICS_CODES.map(({ code, title }) => (
                <div key={code} className="bg-background p-6">
                  <div className="font-mono text-2xl font-bold text-primary mb-2">{code}</div>
                  <div className="text-sm text-foreground">{title}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-background text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-display font-bold mb-6 text-white">Need a price?</h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10">
            Get a ballpark in under a minute — or send your scope for a formal proposal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/estimate"
              className="inline-flex h-14 px-8 bg-primary text-white font-bold text-sm uppercase tracking-wider items-center justify-center gap-3 rounded-sm hover:bg-primary/90 transition-colors"
            >
              Get My Price <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/request-proposal"
              className="inline-flex h-14 px-8 border border-border text-foreground font-bold text-sm uppercase tracking-wider items-center justify-center gap-3 rounded-sm hover:border-primary/50 transition-colors"
            >
              Request a Proposal <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

const CAPABILITIES_BREADCRUMB_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://apexgrideng.com/" },
    { "@type": "ListItem", position: 2, name: "Capabilities", item: "https://apexgrideng.com/capabilities/" },
  ],
};

const PAGE_META = {
  title: "Firm Capabilities | Engineering Services & NAICS Codes | Apex Grid",
  description: "What Apex Grid Engineering can do: structural, MEP, civil, architecture, PE stamping, and assessments — plus NAICS codes and procurement facts.",
  path: "/capabilities",
};
