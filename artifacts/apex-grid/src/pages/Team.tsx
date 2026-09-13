import { useJsonLd, usePageMeta } from "@/lib/seo";
import { Link } from "wouter";
import { useEffect } from "react";
import jasonImg from "@assets/generated_images/jason-mitchell.webp";
import jamesImg from "@assets/IMG_5014_1787872200800.jpg";
import shanWellesley24Img from "@assets/image_(2)_1788051232762.png";
import shanWellesley32Img from "@assets/image_(1)_1788051232852.png";
import shanLawrenceImg from "@assets/image_1788051232867.png";
import {
  DraftingCompass,
  Zap,
  Waves,
  ClipboardCheck,
  Layers,
  Stamp,
  PenTool,
  ArrowRight,
} from "lucide-react";
import { LICENSING_COVERAGE_STATEMENT, PROJECT_JURISDICTION_NOTE } from "@/lib/licensing";

const STATS = [
  { value: "Multi-discipline", label: "Engineering Team" },
  { value: LICENSING_COVERAGE_STATEMENT, label: PROJECT_JURISDICTION_NOTE },
  { value: "4", label: "Core Disciplines Coordinated" },
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
    lead: "Architecture support subject to credential verification",
    body: "Full architectural design — concept, space planning, and permit-ready construction documents — coordinated with engineering. The responsible architect, firm authorization, discipline, and authority having jurisdiction are confirmed for each project.",
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
    lead: "PE support subject to project-specific verification",
    body: "Where professional engineering services are engaged, the responsible individual license, firm authorization, discipline, and authority having jurisdiction are verified before any review, seal, or stamp. Availability and delivery arrangements are confirmed in the project scope.",
    scope: ["Plan review & sealing when authorized", "Jurisdiction correspondence", "Project-specific credential review"],
  },
];

export default function Team() {
  usePageMeta(PAGE_META);
  useJsonLd(TEAM_SCHEMA);
  useEffect(() => {
    const targetId = window.location.hash.replace(/^#/, "");
    if (!["construction-delivery", "shan-portfolio"].includes(targetId)) return;
    window.requestAnimationFrame(() => {
      document.getElementById(targetId)?.scrollIntoView({ block: "start" });
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
              A multifaceted organization spanning Engineering, Architecture, and General Contracting — with construction delivery through PCM.
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
              Our clients can coordinate the build lifecycle across Engineering, Architecture, and General Contracting. Responsible professionals and project delivery arrangements are confirmed for each scope.
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

      <section id="engineering-team" className="py-24 bg-card border-y border-border scroll-mt-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mb-16">
            <span className="font-mono text-xs uppercase tracking-widest text-primary mb-4 block">Engineering Leadership</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">The People <span className="text-muted-foreground">Behind the Work</span></h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              A senior engineering team built to move projects from scope to coordinated deliverables, with any responsible professional and sealing role confirmed per project.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {ENGINEERING_TEAM.map((person) => (
              <article key={person.name} className="group border border-border bg-background">
                <div className="relative aspect-[4/5] overflow-hidden bg-[#111]">
                  <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
                    <div className="absolute h-[72%] w-[72%] rounded-full border border-primary/20" />
                    <img
                      src="/logo.svg"
                      alt=""
                      className="relative w-[58%] opacity-20 transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                  <img
                    src={person.image}
                    alt={`${person.name}, ${person.role} at Apex Grid Engineering`}
                    className="relative z-10 h-full w-full object-contain object-bottom transition-transform duration-500 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                </div>
                <div className="border-t border-border p-5">
                  <h3 className="text-xl font-display font-bold">{person.name}</h3>
                  <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.12em] leading-relaxed text-primary">
                    {person.role}
                  </p>
                  {person.name === "Shan Fernando" && (
                    <Link
                      href="/team#shan-portfolio"
                      className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-foreground/80 transition-colors hover:text-primary"
                      data-testid="link-shan-portfolio"
                    >
                      View selected structural work
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>

          <div id="shan-portfolio" className="mt-24 scroll-mt-24" data-testid="shan-portfolio">
            <div className="max-w-3xl mb-12">
              <span className="font-mono text-xs uppercase tracking-widest text-primary mb-4 block">Head of Engineering · Selected Work</span>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                Shan Fernando <span className="text-muted-foreground">Structural Portfolio</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Selected multifamily structural design work led by Shan Fernando, Head of Engineering, across Massachusetts residential projects.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {SHAN_PORTFOLIO.map((project) => (
                <article key={project.title} className="group border border-border bg-background overflow-hidden" data-testid={`shan-portfolio-project-${project.slug}`}>
                  <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
                    <img
                      src={project.image}
                      alt={`${project.title}, ${project.location}`}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between gap-3">
                      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/80">{project.location}</span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-primary-foreground bg-primary px-2 py-1">{project.floorArea}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-display font-bold leading-tight mb-2">{project.title}</h3>
                    <p className="text-sm text-primary font-medium mb-5">{project.subtitle}</p>
                    <ul className="space-y-2 border-t border-border pt-5">
                      {project.scope.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
                          <span className="text-primary mt-[2px]" aria-hidden="true">▸</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
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
                Architecture support and permit-ready documentation are coordinated with Apex Grid's structural, MEP, and civil engineering scopes. Responsible architect credentials and authorization are verified per project.
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
                     Jason Mitchell is a native of Rochester, New York. He holds a Professional Degree of Architecture with Honors from the Illinois Institute of Technology in Chicago, Illinois. Any architect-of-record role, state license, and firm authorization must be verified against current official records for the specific project.
                  </p>
                  <p>
                    With 17 years of experience, Jason has actively participated in projects throughout the world, ranging from single-family residential to multi-billion-dollar commercial developments. Beyond design, his background includes roles in construction and in various development capacities.
                  </p>
                  <p>
                     Jason has been appointed to numerous development, political, charitable, and philanthropic boards. He supports architectural coordination for projects in markets where the responsible professional's current credentials and AHJ requirements have been verified.
                  </p>
                </div>
              </article>
              <article className="bg-background border border-border p-8">
                <div className="aspect-[4/5] bg-secondary border border-border mb-8 overflow-hidden">
                  <img
                    src={jamesImg}
                     alt="James Spencer, architecture professional"
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                </div>
                 <span className="font-mono text-xs uppercase tracking-widest text-primary mb-4 block">Architecture Professional · Credentials Verified Per Project</span>
                <h3 className="text-3xl font-display font-bold mb-6">James Spencer</h3>
                <div className="space-y-5 text-muted-foreground leading-relaxed">
                  <p>
                     James Spencer supports Apex Grid's architectural practice. Any registered-architect credential, NCARB status, and project role must be confirmed from current official records before reliance.
                  </p>
                  <p>
                     James may support projects where the responsible architect's current state license, firm authorization, discipline, and AHJ requirements have been verified.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-border">
                  {["Project-specific state verification", "Firm authorization", "AHJ requirements"].map((state) => (
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
            Send us your scope and get a clear proposal fast — deliverables, timeline, and fee. Any size job across our coverage area. {LICENSING_COVERAGE_STATEMENT} {PROJECT_JURISDICTION_NOTE}
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
  title: "Our Engineering & Architecture Team | Project-specific credential verification | Apex Grid",
  description: "Meet Apex Grid Engineering's executive, architecture, and engineering team, including Chief People Officer Angel Endres, architecture professionals, and the PCM construction delivery branch. Credentials and authorization are confirmed per project.",
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
        jobTitle: "Architecture Professional (credentials verified per project)",
        worksFor: { "@type": "Organization", name: "Apex Grid Engineering" },
        knowsAbout: ["Architecture", "Project-specific credential verification", "AHJ coordination"],
      },
      {
        "@type": "Person",
        name: "Shan Fernando",
        jobTitle: "Head of Engineering",
        worksFor: { "@type": "Organization", name: "Apex Grid Engineering" },
        knowsAbout: ["Structural engineering", "Multifamily residential buildings", "Gravity and lateral load analysis", "Finite element modelling"],
      },
      {
        "@type": "Person",
        name: "Angel Endres",
        jobTitle: "Chief People Officer",
        worksFor: { "@type": "Organization", name: "Apex Grid Engineering" },
        knowsAbout: [
          "Human resources leadership",
          "SHRM principles",
          "Engineering-industry HR compliance",
          "Employee relations",
          "Talent acquisition",
          "Organizational development",
        ],
      },
    ],
  },
};

const ENGINEERING_TEAM = [
  {
    name: "Grant Meaux",
    role: "Principal | MEP Professional Engineer (PE)",
    image: "/images/team/grant-meaux.webp",
  },
  {
    name: "Jason Luhn",
    role: "Chief Operating Officer | Principal Structural Professional Engineer (PE)",
    image: "/images/team/jason-luhn.webp",
  },
  {
    name: "Travis Airola",
    role: "Principal | Civil & Structural Professional Engineer (PE)",
    image: "/images/team/travis-airola.webp",
  },
  {
    name: "Sevdalina Petkova",
    role: "Principal | Structural Professional Engineer (PE)",
    image: "/images/team/sevdalina-petkova.webp",
  },
  {
    name: "Jorge Fuentes",
    role: "Principal | Civil & Structural Engineer, PE",
    image: "/images/team/jorge-fuentes.webp",
  },
  {
    name: "Eric Culver",
    role: "Principal | Professional Engineer (PE)",
    image: "/images/team/eric-culver.webp",
  },
  {
    name: "Shan Fernando",
    role: "Head of Engineering",
    image: "/images/team/shan-fernando.webp",
  },
];

const SHAN_PORTFOLIO = [
  {
    slug: "wellesley-24-unit-apartment",
    title: "Proposed 5-Storey Apartment Building",
    subtitle: "24-unit luxury apartment building with basement",
    location: "Wellesley, Massachusetts",
    floorArea: "50,000 SF",
    image: shanLawrenceImg,
    scope: [
      "Steel–concrete composite transfer floor above parking",
      "Strip foundations designed for site soil and structural loads",
      "Finite element modelling with gravity and lateral analysis",
      "Structural plans, sections, elevations, and construction details",
    ],
  },
  {
    slug: "wellesley-32-unit-apartment",
    title: "Proposed Apartment Building",
    subtitle: "32-unit residential building overlooking Sprague Fields",
    location: "Wellesley, Massachusetts",
    floorArea: "70,000 SF",
    image: shanWellesley32Img,
    scope: [
      "Massing configured to preserve open space beside neighbouring homes",
      "Composite transfer floor aligned with parking and apartment walls",
      "Finite element modelling under gravity and lateral loads",
      "Strip foundation design",
    ],
  },
  {
    slug: "lawrence-luxury-apartments",
    title: "6-Story Luxury Apartment Building",
    subtitle: "New addition retaining an existing two-storey structure",
    location: "Lawrence, Massachusetts",
    floorArea: "30,000 SF",
    image: shanWellesley24Img,
    scope: [
      "Composite transfer structure for the proposed addition",
      "Wood-framed residential floor design",
      "Finite element modelling and structural analysis",
      "Design integrated with the retained existing structure",
    ],
  },
];

const PCM_TEAM = [
  {
    name: "Molly Zbojniewicz",
    role: "Founding Partner · Client Relations",
    bio: "Molly brings 30 years of experience in commercial construction and client leadership, leading client relationships, pre-construction coordination, contract administration, and consultant coordination.",
  },
  {
    name: "Rick Coleman, AIA, LEED",
    role: "Partner · Pre-Construction Services",
    bio: "Rick brings more than 25 years in architecture, construction management, and real estate development. Any architect-of-record role or license reliance is subject to current credential, firm-authorization, discipline, and AHJ verification for the project. He leads pre-construction planning, budgeting, scheduling, approvals, and project management.",
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
