import { useJsonLd, usePageMeta } from "@/lib/seo";
import { Link } from "wouter";
import { useEffect } from "react";
import jasonImg from "@assets/generated_images/jason-mitchell.webp";
import jamesImg from "@assets/IMG_5014_1787872200800.jpg";
import {
  DraftingCompass,
  Zap,
  Waves,
  ClipboardCheck,
  Layers,
  Stamp,
  PenTool,
} from "lucide-react";

const STATS = [
  { value: "20+", label: "Engineers on Staff" },
  { value: "49", label: "States with PE Licensure" },
  { value: "4", label: "Core Disciplines In-House" },
  { value: "12-24hr", label: "Typical Quote Turnaround" },
];

const GROUPS = [
  {
    icon: DraftingCompass,
    title: "Structural Practice",
    lead: "Led by licensed Structural PEs",
    body: "Gravity and lateral system design for steel, concrete, masonry, and wood structures. This group owns load path resolution, foundation design, seismic and wind analysis, and structural peer review.",
    scope: ["New structures & additions", "Seismic / wind / snow analysis", "Foundation & retaining design"],
  },
  {
    icon: PenTool,
    title: "Architectural Design Studio",
    lead: "Registered architects with multi-state licensure",
    body: "Full architectural design — concept, space planning, and permit-ready construction documents — produced in the same office as the engineering, so the architecture and the systems behind it never fall out of sync.",
    scope: ["Concept & schematic design", "Construction documents", "Code & accessibility compliance"],
  },
  {
    icon: Zap,
    title: "MEP Design Team",
    lead: "Mechanical, Electrical & Plumbing engineers",
    body: "Full building-systems design — HVAC load calculations and equipment selection, power distribution and lighting, plumbing and gas systems — coordinated in a single model so systems never fight the structure.",
    scope: ["HVAC design & load calcs", "Power, lighting & low voltage", "Plumbing, piping & gas"],
  },
  {
    icon: Waves,
    title: "Civil & Site Group",
    lead: "Site development engineers",
    body: "Everything outside the building footprint: grading and drainage design, stormwater management, utility routing, and the site plans jurisdictions require before a building permit moves.",
    scope: ["Grading & drainage plans", "Stormwater management", "Utility coordination"],
  },
  {
    icon: ClipboardCheck,
    title: "Energy & Code Compliance",
    lead: "Energy analysts & code specialists",
    body: "Dedicated specialists who keep current on every adopted state code — IECC, ASHRAE 90.1, and state programs like California Title 24 — and produce the compliance documentation reviewers accept the first time.",
    scope: ["IECC / ASHRAE 90.1 compliance", "Title 24 & state programs", "ComCheck / ResCheck documentation"],
  },
  {
    icon: Layers,
    title: "Drafting & Production",
    lead: "BIM & CAD production staff",
    body: "The team that turns engineering into legible, explicit, buildable construction documents. Every sheet passes an internal QA standard before it reaches a permit counter or a job trailer.",
    scope: ["Revit / BIM modeling", "Construction document QA", "Fast-turnaround revisions"],
  },
  {
    icon: Stamp,
    title: "Licensed Professional Engineers",
    lead: "In-house PEs, licensed in 49 states",
    body: "Every project is reviewed and stamped by our in-house Professional Engineers — never outsourced. Multi-state licensure means one firm can carry your project anywhere in the country.",
    scope: ["Plan review & stamping", "Jurisdiction correspondence", "Multi-state licensure management"],
  },
];

export default function Team() {
  usePageMeta(PAGE_META);
  useJsonLd(TEAM_SCHEMA);
  useEffect(() => {
    if (window.location.hash !== "#construction-delivery") return;
    window.requestAnimationFrame(() => {
      document.getElementById("construction-delivery")?.scrollIntoView({ block: "start" });
    });
  }, []);

  return (
    <div className="flex flex-col">
      <section className="relative pt-40 pb-24 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-8">
              The <span className="text-primary">Team</span>
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed border-l-4 border-primary pl-6">
              A multifaceted organization spanning Engineering, Architecture, and General Contracting — with more than 20 engineers on staff and construction delivery through PCM.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-card border-y border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="text-5xl font-display font-bold text-primary mb-2">{s.value}</div>
                <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">How We're Organized</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our clients can keep the full build lifecycle under one accountable organization: Engineering, Architecture, and General Contracting. Every design group below works under the direct review of our in-house Professional Engineers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {GROUPS.map((g) => (
              <div key={g.title} className="bg-card border border-border p-8 flex flex-col group hover:border-primary/50 transition-colors">
                <g.icon className="w-8 h-8 text-primary mb-6" />
                <h3 className="text-xl font-bold uppercase tracking-wide mb-1">{g.title}</h3>
                <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-5">{g.lead}</div>
                <p className="text-muted-foreground leading-relaxed mb-6 flex-1">{g.body}</p>
                <ul className="space-y-2 border-t border-border pt-5">
                  {g.scope.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-foreground/80">
                      <span className="text-primary mt-[2px]">▸</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture team */}
      <section className="py-24 bg-card border-t border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-3xl mb-16">
              <span className="font-mono text-xs uppercase tracking-widest text-primary mb-4 block">Architectural Design Studio</span>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Architecture <span className="text-muted-foreground">Leadership</span></h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our registered architects bring design leadership and permit-ready documentation to the same coordinated team as Apex Grid's structural, MEP, and civil engineers.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <article className="bg-background border border-border p-8">
                <div className="aspect-[4/5] bg-secondary border border-border mb-8 overflow-hidden">
                  <img
                    src={jasonImg}
                    alt="Jason Mitchell, Lead Architect at Apex Grid Engineering"
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                </div>
                <span className="font-mono text-xs uppercase tracking-widest text-primary mb-4 block">Lead Architect</span>
                <h3 className="text-3xl font-display font-bold mb-6">Jason Mitchell</h3>
                <div className="space-y-5 text-muted-foreground leading-relaxed">
                  <p>
                    Jason Mitchell is a native of Rochester, New York. He holds a Professional Degree of Architecture with Honors from the Illinois Institute of Technology in Chicago, Illinois, and is a licensed architect in Florida, California, Louisiana, Texas, Alabama, and Illinois.
                  </p>
                  <p>
                    With 17 years of experience, Jason has actively participated in projects throughout the world, ranging from single-family residential to multi-billion-dollar commercial developments. Beyond design, his background includes roles in construction and in various development capacities.
                  </p>
                  <p>
                    Jason has been appointed to numerous development, political, charitable, and philanthropic boards. He currently leads our architectural work across the Los Angeles, Miami, and Houston markets.
                  </p>
                </div>
              </article>
              <article className="bg-background border border-border p-8">
                <div className="aspect-[4/5] bg-secondary border border-border mb-8 overflow-hidden">
                  <img
                    src={jamesImg}
                    alt="James Spencer, Registered Architect and NCARB certificate holder"
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                </div>
                <span className="font-mono text-xs uppercase tracking-widest text-primary mb-4 block">Registered Architect · NCARB</span>
                <h3 className="text-3xl font-display font-bold mb-6">James Spencer</h3>
                <div className="space-y-5 text-muted-foreground leading-relaxed">
                  <p>
                    James Spencer is a registered architect and NCARB certificate holder supporting Apex Grid's architectural practice.
                  </p>
                  <p>
                    James is licensed to practice architecture in California, Arizona, Texas, and Washington, extending the team's architectural coverage across key project markets.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-border">
                  {["California", "Arizona", "Texas", "Washington"].map((state) => (
                    <span key={state} className="px-3 py-1.5 bg-secondary text-xs font-bold uppercase tracking-wider text-foreground">
                      {state}
                    </span>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section id="construction-delivery" className="py-24 bg-card border-t border-border scroll-mt-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-3xl mb-16">
              <span className="font-mono text-xs uppercase tracking-widest text-primary mb-4 block">Apex Grid Construction Delivery Branch</span>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">PCM <span className="text-muted-foreground">Team</span></h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Phoenix Construction &amp; Management keeps its established PCM identity while serving as Apex Grid Engineering's construction delivery branch. This team extends our coordinated service from engineering and pre-construction through field execution.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
              {PCM_TEAM.map((person) => (
                <article key={person.name} className="bg-background p-8">
                  <span className="font-mono text-xs uppercase tracking-widest text-primary mb-4 block">{person.role}</span>
                  <h3 className="text-2xl font-display font-bold mb-4">{person.name}</h3>
                  <p className="text-muted-foreground leading-relaxed">{person.bio}</p>
                </article>
              ))}
            </div>
            <div className="mt-10">
              <a
                href="/partners/phoenix-construction-management/"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
              >
                View the PCM branch profile <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-background border-t border-border">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Put the Team on Your Project
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Send us your scope and get a clear proposal fast — deliverables, timeline, and fee. Any size job, across 49 states.
          </p>
          <Link
            href="/contact"
            className="inline-flex h-14 px-10 bg-primary text-primary-foreground font-semibold items-center justify-center rounded-[2px] hover:bg-primary/90 transition-colors"
          >
            Request a Quote
          </Link>
        </div>
      </section>
    </div>
  );
}

const PAGE_META = {
  title: "Our Engineering & Architecture Team | PEs in 49 States | Apex Grid",
  description: "Meet Apex Grid Engineering's architecture and engineering team, including registered architects Jason Mitchell and James Spencer, plus the PCM construction delivery branch.",
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
    subOrganization: {
      "@type": "Contractor",
      name: "Phoenix Construction & Management, Inc.",
      alternateName: "PCM",
      description: "Apex Grid Engineering's construction delivery branch",
    },
    employee: [
      {
        "@type": "Person",
        name: "Jason Mitchell",
        jobTitle: "Lead Architect",
        worksFor: { "@type": "Organization", name: "Apex Grid Engineering" },
      },
      {
        "@type": "Person",
        name: "James Spencer",
        jobTitle: "Registered Architect",
        hasCredential: { "@type": "EducationalOccupationalCredential", credentialCategory: "NCARB Certificate" },
        worksFor: { "@type": "Organization", name: "Apex Grid Engineering" },
        knowsAbout: ["Architecture", "California architecture", "Arizona architecture", "Texas architecture", "Washington architecture"],
      },
    ],
  },
};

const PCM_TEAM = [
  {
    name: "Molly Zbojniewicz",
    role: "Founding Partner · Client Relations",
    bio: "Molly brings 30 years of experience in commercial construction and client leadership, leading client relationships, pre-construction coordination, contract administration, and consultant coordination.",
  },
  {
    name: "Rick Coleman, AIA, LEED",
    role: "Partner · Pre-Construction Services",
    bio: "Rick is a licensed architect with more than 25 years in architecture, construction management, and real estate development. He leads pre-construction planning, budgeting, scheduling, approvals, and project management.",
  },
  {
    name: "Tom Bell",
    role: "Project Executive",
    bio: "Tom brings extensive tenant-improvement and general-construction experience for financial institutions and retail environments, focusing on project management, schedule and budget oversight, and quality control.",
  },
  {
    name: "Doug Brown",
    role: "Project Executive",
    bio: "Doug brings more than 27 years of commercial construction experience, specializing in tenant improvements and commercial renovations. He leads execution, field coordination, budgeting, and client relations.",
  },
];
