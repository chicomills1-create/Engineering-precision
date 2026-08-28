import { Link } from "wouter";
import { ArrowRight, Download, Shield, Zap, Layers, HardHat, Building2, FileCheck, Award, Globe } from "lucide-react";
import { useJsonLd, usePageMeta } from "@/lib/seo";
import { APEX_GRID_BUSINESS_SCHEMA } from "@/lib/business-schema";

export default function Capabilities() {
  usePageMeta(PAGE_META);
  useJsonLd(APEX_GRID_BUSINESS_SCHEMA);
  useJsonLd(CAPABILITIES_BREADCRUMB_SCHEMA);

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative pt-40 pb-32 overflow-hidden bg-background border-b border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-3 border border-primary/60 bg-primary/10 px-4 py-2 mb-8">
              <FileCheck className="w-4 h-4 text-primary" />
              <span className="font-mono text-xs uppercase tracking-widest text-primary">Capabilities Statement</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-8">
              Firm <span className="text-primary">Capabilities</span>
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed border-l-4 border-primary pl-6 mb-12">
              A single reference for procurement officers, contracting officers, and prime contractors — every discipline, market, license, and identifier in one place.
            </p>
            <a
              href="/capabilities-statement.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 px-8 bg-primary text-white font-bold text-sm uppercase tracking-wider items-center justify-center gap-3 rounded-[2px] hover:bg-primary/90 transition-colors"
            >
              <Download className="w-4 h-4" />
              Download Capabilities Statement
            </a>
          </div>
        </div>
      </section>

      {/* Company Snapshot */}
      <section className="py-20 bg-card border-b border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-[1px] bg-primary" />
              <span className="font-mono text-xs uppercase tracking-widest text-primary">Company Overview</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-10">About Apex Grid Engineering</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-4 text-foreground/80 leading-relaxed">
                <p>
                  Apex Grid Engineering is a multidisciplinary engineering and architecture firm headquartered in Queen Creek, Arizona. We deliver PE-stamped structural engineering, commercial MEP design, civil engineering, building assessments, and geotechnical coordination under one roof.
                </p>
                <p>
                  The firm is led by Jeremy Mills, a U.S. Air Force veteran who served in Aerospace Medical Service and deployed to Iraq in support of Operation Iraqi Freedom. That service background defines how the firm operates: documented processes, zero tolerance for "close enough," and drawings that survive the full government QA cycle.
                </p>
                <p>
                  Apex Grid is PE-licensed in 49 states and supports projects across Arizona, California, New Mexico, and nationwide. Our permit-ready work includes municipal plan-check navigation and California Title 24 coordination where applicable.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-px bg-border">
                {SNAPSHOT.map(({ label, value }) => (
                  <div key={label} className="bg-background p-6">
                    <div className="text-3xl font-display font-bold text-primary mb-2">{value}</div>
                    <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Disciplines */}
      <section className="py-20 bg-background border-b border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-[1px] bg-primary" />
              <span className="font-mono text-xs uppercase tracking-widest text-primary">Core Disciplines</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-10">PE-Stamped Engineering &amp; Design Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
              {DISCIPLINES.map(({ icon: Icon, title, body, deliverables }) => (
                <div key={title} className="bg-card p-8">
                  <Icon className="w-6 h-6 text-primary mb-4" />
                  <div className="font-display font-bold text-lg mb-3">{title}</div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{body}</p>
                  <ul className="space-y-1">
                    {deliverables.map((d) => (
                      <li key={d} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <span className="text-primary mt-[2px] shrink-0">▸</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Markets / Industries */}
      <section className="py-20 bg-card border-b border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-[1px] bg-primary" />
              <span className="font-mono text-xs uppercase tracking-widest text-primary">Markets Served</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-10">Industries &amp; Client Types</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-px bg-border mb-12">
              {MARKETS.map((name) => (
                <div key={name} className="bg-background p-5 flex items-center gap-3">
                  <span className="text-primary text-lg leading-none shrink-0">▸</span>
                  <span className="text-sm text-foreground">{name}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-[1px] bg-primary" />
              <span className="font-mono text-xs uppercase tracking-widest text-primary">Client Types</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-px bg-border">
              {CLIENT_TYPES.map((name) => (
                <div key={name} className="bg-background p-5 flex items-center gap-3">
                  <span className="text-primary text-lg leading-none shrink-0">▸</span>
                  <span className="text-sm text-foreground">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Project Types */}
      <section className="py-20 bg-background border-b border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-[1px] bg-primary" />
              <span className="font-mono text-xs uppercase tracking-widest text-primary">Project Types</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-10">Representative Project Types</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-px bg-border">
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

      {/* Project Phases */}
      <section className="py-20 bg-card border-b border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-[1px] bg-primary" />
              <span className="font-mono text-xs uppercase tracking-widest text-primary">Project Phases</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-10">Service Phases</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
              {PROJECT_PHASES.map(({ phase, desc }) => (
                <div key={phase} className="bg-background p-8">
                  <div className="font-mono text-xs uppercase tracking-widest text-primary mb-3">{phase}</div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Software */}
      <section className="py-20 bg-background border-b border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-[1px] bg-primary" />
              <span className="font-mono text-xs uppercase tracking-widest text-primary">Technology</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-10">Software Platforms</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-px bg-border">
              {SOFTWARE.map(({ name, category }) => (
                <div key={name} className="bg-card p-6">
                  <div className="font-bold text-sm text-foreground mb-1">{name}</div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{category}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Codes & Standards */}
      <section className="py-20 bg-card border-b border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-[1px] bg-primary" />
              <span className="font-mono text-xs uppercase tracking-widest text-primary">Codes &amp; Standards</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-10">Codes &amp; Standards We Design To</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
              {CODES.map((code) => (
                <div key={code} className="bg-background px-6 py-4 flex items-start gap-3">
                  <span className="text-primary mt-[3px] shrink-0 font-mono text-xs">✓</span>
                  <span className="text-sm text-foreground">{code}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Licensing */}
      <section className="py-20 bg-background border-b border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-[1px] bg-primary" />
              <span className="font-mono text-xs uppercase tracking-widest text-primary">Licensing</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">PE Licensure — 49 States</h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-3xl">
              Apex Grid engineers hold Professional Engineer licenses across 49 U.S. states, enabling us to stamp and seal construction documents for projects in nearly every jurisdiction in the country.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
              {LICENSING_HIGHLIGHTS.map(({ label, value }) => (
                <div key={label} className="bg-card px-8 py-6">
                  <div className="font-mono text-xs uppercase tracking-widest text-primary mb-2">{label}</div>
                  <div className="text-foreground">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* NAICS Codes */}
      <section className="py-20 bg-card border-b border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-[1px] bg-primary" />
              <span className="font-mono text-xs uppercase tracking-widest text-primary">Federal Contracting</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">NAICS Codes</h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl">
              Use the following NAICS codes when issuing solicitations, setting up procurement vehicles, or registering Apex Grid as a subcontractor.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-px bg-border">
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

      {/* Veteran Ownership */}
      <section className="py-20 bg-background border-b border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-[1px] bg-primary" />
              <span className="font-mono text-xs uppercase tracking-widest text-primary">Ownership &amp; Socioeconomic</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-10">Veteran-Owned &amp; Operated</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
              <div className="bg-card p-8 md:col-span-2">
                <Shield className="w-6 h-6 text-primary mb-4" />
                <div className="font-bold text-lg mb-3">Service-Disabled Veteran-Owned Small Business (SDVOSB)</div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Apex Grid Engineering is majority-owned and operated by Jeremy Mills, a service-disabled U.S. Air Force veteran. This status is relevant for set-aside contracts, evaluation preference programs, and subcontracting plans that include veteran-owned participation goals.
                </p>
              </div>
              <div className="bg-card p-8">
                <Award className="w-6 h-6 text-primary mb-4" />
                <div className="font-bold text-lg mb-3">Small Business</div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Apex Grid qualifies as a small business under applicable SBA size standards for the engineering services NAICS codes listed above.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact / Download CTA */}
      <section className="py-32 bg-card border-t border-border text-center">
        <div className="container mx-auto px-4">
          <Globe className="w-10 h-10 text-primary mx-auto mb-6" />
          <h2 className="text-4xl font-display font-bold mb-6">Ready to Vet Our Firm?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
            Download our one-page capabilities statement for your procurement file, or reach out directly to discuss a specific solicitation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/capabilities-statement.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 px-8 bg-primary text-white font-bold text-sm uppercase tracking-wider items-center justify-center gap-3 rounded-[2px] hover:bg-primary/90 transition-colors"
            >
              <Download className="w-4 h-4" />
              Capabilities Statement
            </a>
            <Link
              href="/contact"
              className="inline-flex h-14 px-8 border border-border bg-background text-foreground font-bold text-sm uppercase tracking-wider items-center justify-center gap-3 rounded-[2px] hover:bg-white/5 transition-colors"
            >
              Contact Us <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

const SNAPSHOT = [
  { label: "States Licensed", value: "49" },
  { label: "Years of Experience", value: "15+" },
  { label: "Core Disciplines", value: "4" },
  { label: "Quote Turnaround", value: "12–24hr" },
];

const CAPABILITIES_BREADCRUMB_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://apexgrideng.com/" },
    { "@type": "ListItem", position: 2, name: "Capabilities", item: "https://apexgrideng.com/capabilities/" },
  ],
};

const DISCIPLINES = [
  {
    icon: Building2,
    title: "Architecture",
    body: "Full architectural design, space programming, and permit-ready construction documents for commercial, government, and military facilities.",
    deliverables: [
      "Schematic Design (SD)",
      "Design Development (DD)",
      "Construction Documents (CD)",
      "Permit Application Packages",
      "As-Built Documentation",
    ],
  },
  {
    icon: Zap,
    title: "MEP Engineering",
    body: "Mechanical, electrical, and plumbing systems engineered to IBC, NFPA, and DoD standards — from basic HVAC to mission-critical power infrastructure.",
    deliverables: [
      "Electrical One-Lines & Panel Schedules",
      "HVAC Load Calculations & Duct Layouts",
      "Plumbing Riser Diagrams & Fixture Schedules",
      "Fire Alarm (NFPA 72) Layouts",
      "Emergency Power & Generator Systems",
    ],
  },
  {
    icon: Layers,
    title: "Structural Engineering",
    body: "Lateral and gravity structural systems for all building types, including blast-resistant and force-protection design for government and military facilities.",
    deliverables: [
      "Foundation Design & Geotechnical Coordination",
      "Gravity & Lateral Load Analysis",
      "Structural Steel, Concrete, CMU & Wood Framing",
      "Seismic & Wind Drift Analysis",
      "Progressive Collapse & Blast-Resistant Design",
    ],
  },
  {
    icon: HardHat,
    title: "Civil Engineering",
    body: "Site grading, drainage, utilities, and infrastructure design from entitlement through construction administration — including military installation work.",
    deliverables: [
      "Grading & Drainage Plans",
      "Stormwater Pollution Prevention Plans (SWPPP)",
      "Utility Coordination (wet & dry)",
      "Traffic Impact Studies",
      "Erosion Control & BMP Design",
    ],
  },
];

const MARKETS = [
  "Commercial Office & Mixed-Use",
  "Industrial & Manufacturing",
  "Healthcare & Medical",
  "Retail & Hospitality",
  "Education & Higher Ed",
  "Government & Municipal",
  "Military & Defense (DoD)",
  "Data Centers & Mission-Critical",
  "Religious & Institutional",
  "Multi-Family Residential",
  "Sports & Recreation",
  "Tenant Improvement & Renovation",
];

const CLIENT_TYPES = [
  "Architecture Firms",
  "General Contractors",
  "Real Estate Developers",
  "Federal Government Agencies",
  "State & Local Government",
  "Department of Defense / Military",
  "Department of Veterans Affairs",
  "Healthcare Organizations",
  "REITs & Property Managers",
  "Owner-Builders",
  "Prime Contractors (Teaming)",
  "Design-Build Teams",
];

const PROJECT_TYPES = [
  "New Ground-Up Construction",
  "Tenant Improvement (TI)",
  "Adaptive Reuse & Renovation",
  "Addition & Expansion",
  "Seismic Retrofit",
  "Infrastructure Upgrades",
  "Mission-Critical Facilities",
  "Secure Operations Centers (SOC/EOC)",
  "Military Installation Projects",
  "Peer Review & Third-Party Engineering",
  "Building Assessment & Condition Survey",
  "Code Compliance & ADA Remediation",
];

const PROJECT_PHASES = [
  {
    phase: "Pre-Design",
    desc: "Feasibility studies, building assessments, condition surveys, code compliance reviews, and project programming to define scope before design begins.",
  },
  {
    phase: "Design & Permit",
    desc: "Schematic design, design development, construction documents, and permit application packages engineered for first-pass approval.",
  },
  {
    phase: "Construction Administration",
    desc: "RFI responses, submittal review, field observations, punch-list support, and as-built documentation through project close-out.",
  },
];

const SOFTWARE = [
  { name: "Revit", category: "BIM / Architecture" },
  { name: "AutoCAD", category: "Drafting" },
  { name: "ETABS", category: "Structural Analysis" },
  { name: "RISA-3D", category: "Structural Analysis" },
  { name: "RAM Structural", category: "Structural Analysis" },
  { name: "eQUEST", category: "Energy Modeling" },
  { name: "Trane Trace", category: "HVAC Load Calc" },
  { name: "SketchUp", category: "Architectural Modeling" },
  { name: "Bluebeam Revu", category: "Document Review" },
  { name: "Procore", category: "Project Management" },
  { name: "Civil 3D", category: "Civil Engineering" },
  { name: "StormCAD", category: "Drainage Modeling" },
];

const CODES = [
  "International Building Code (IBC) — current adopted edition",
  "International Fire Code (IFC)",
  "National Electrical Code (NEC / NFPA 70)",
  "NFPA 72 — National Fire Alarm & Signaling Code",
  "NFPA 13 — Standard for the Installation of Sprinkler Systems",
  "NFPA 101 — Life Safety Code",
  "ADA Standards for Accessible Design",
  "Architectural Barriers Act (ABA) Accessibility Standards",
  "ASHRAE 90.1 — Energy Standard for Buildings",
  "ASCE 7 — Minimum Design Loads for Buildings",
  "ACI 318 — Building Code for Structural Concrete",
  "AISC 360 / 341 — Structural Steel Design & Seismic Provisions",
  "UFC 1-200-02 — High Performance & Sustainable Building Requirements",
  "UFC 4-010-01 — DoD Minimum Antiterrorism Standards for Buildings",
  "Unified Facilities Criteria (UFC) — all applicable series",
  "State-specific amendments (adopted per jurisdiction)",
];

const LICENSING_HIGHLIGHTS = [
  { label: "PE Jurisdictions", value: "49 U.S. states" },
  { label: "Disciplines Licensed", value: "Structural, MEP, Civil Engineering" },
  { label: "Architecture Licensure", value: "Licensed Architect on staff" },
  { label: "DoD Design Authority", value: "UFC-qualified engineering team" },
];

const NAICS_CODES = [
  { code: "541330", title: "Engineering Services" },
  { code: "541310", title: "Architectural Services" },
  { code: "237310", title: "Highway, Street & Bridge Construction" },
  { code: "237990", title: "Other Heavy Civil Engineering Construction" },
  { code: "236220", title: "Commercial & Institutional Building Construction" },
  { code: "541620", title: "Environmental Consulting Services" },
];

const PAGE_META = {
  title: "Firm Capabilities | Engineering Services, NAICS Codes & Licensure | Apex Grid",
  description: "Complete capabilities reference for procurement officers and prime contractors — disciplines, markets, NAICS codes, 49-state PE licensure, software, codes, and veteran ownership status.",
  path: "/capabilities",
};
