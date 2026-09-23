import { Link, useParams } from "wouter";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { ALL_INDUSTRIES } from "@/data/industries";
import mepBg from "@assets/generated_images/mep-bg.webp";
import structuralBg from "@assets/generated_images/structural-bg.webp";
import civilBg from "@assets/generated_images/civil-bg.webp";
import assessmentBg from "@assets/generated_images/assessment-bg.webp";
import architectureBg from "@assets/generated_images/architecture-bg.webp";
import NotFound from "./not-found";
import { usePageMeta, useJsonLd, SITE_URL } from "@/lib/seo";

/**
 * Per-service page — problem-first. The problem, the fix, what you get,
 * one tap to a price. No methodology lessons.
 */
const servicesData = {
  "mep": {
    title: "MEP Design & Engineering",
    bg: mepBg,
    problem: "Uncoordinated MEP drawings are the #1 source of RFIs, change orders, and schedule delays.",
    fix: "We engineer clash-free, coordinated mechanical, electrical, and plumbing systems from day one — modeled around the structure, ready for review. Title 24 handled too.",
    youGet: [
      "Coordinated HVAC, electrical, and plumbing design",
      "Load calculations and equipment selection",
      "Title 24 energy compliance documentation",
      "Drawings built to clear plan check",
    ],
  },
  "structural": {
    title: "Structural Design & Engineering",
    bg: structuralBg,
    problem: "A structural design is useless if it spends months stuck in plan check.",
    fix: "We prepare clean, complete structural packages with the reviewer in mind — coordinated with MEP and civil, sealed by a licensed PE where required.",
    youGet: [
      "New builds, additions, ADUs, and retrofits",
      "Foundation and retaining wall design",
      "Seismic and wind analysis",
      "PE-stamped drawings where required",
    ],
  },
  "civil": {
    title: "Civil Engineering",
    bg: civilBg,
    problem: "Poor grading or undersized utilities can stall a project before the foundation is poured.",
    fix: "We handle the site work — grading, drainage, stormwater, utilities — so the land is ready for vertical construction.",
    youGet: [
      "Site grading and drainage plans",
      "Stormwater management",
      "Utility sizing and routing",
      "Permit-ready site documents",
    ],
  },
  "assessments": {
    title: "Building Assessments",
    bg: assessmentBg,
    problem: "Buying, renovating, or troubleshooting a building? You need facts, not assumptions.",
    fix: "Independent engineering judgment — plain-English reporting on condition, capacity, and what it will cost to fix.",
    youGet: [
      "Condition reports with capital planning",
      "MEP equipment life-expectancy analysis",
      "Structural and seismic risk review",
      "Clear, actionable recommendations",
    ],
  },
  "architecture": {
    title: "Architectural Design",
    bg: architectureBg,
    problem: "Bouncing between an architect and separate engineers means delays and redesign at every handoff.",
    fix: "Our architectural team designs alongside our engineers from the first sketch — beautiful, buildable, and coordinated before it ever reaches plan check.",
    youGet: [
      "Concept and schematic design",
      "Permit-ready construction documents",
      "Code and accessibility compliance",
      "Designed with engineering, not handed off to it",
    ],
  }
};

const servicePageMeta: Record<string, { title: string; description: string }> = {
  mep: {
    title: "MEP Design & Engineering | Apex Grid Engineering",
    description: "Coordinated mechanical, electrical, and plumbing engineering — plus Title 24. Clear prices, fast turnaround, drawings that pass plan check.",
  },
  structural: {
    title: "Structural Design & Engineering | Apex Grid Engineering",
    description: "Practical structural design for buildings, ADUs, additions, and retrofits — PE-stamped where required. Get your price in under a minute.",
  },
  civil: {
    title: "Civil Engineering | Apex Grid Engineering",
    description: "Grading, drainage, stormwater, and utility coordination — permit-ready site documents. Best price, fastest turnaround.",
  },
  assessments: {
    title: "Building Assessments | Apex Grid Engineering",
    description: "Independent engineering assessments — condition reports, MEP life-expectancy, seismic risk. Facts, not assumptions.",
  },
  architecture: {
    title: "Architectural Design | Apex Grid Engineering",
    description: "Architectural design coordinated with engineering from day one — concept through permit-ready documents.",
  },
};

export default function ServiceDetail() {
  const params = useParams();
  const serviceId = params.id as keyof typeof servicesData;
  const service = servicesData[serviceId];
  const meta = servicePageMeta[serviceId];

  usePageMeta(
    meta
      ? { ...meta, path: `/services/${serviceId}` }
      : { title: "Engineering Services | Apex Grid Engineering", description: "Integrated architecture, MEP, structural, and civil engineering.", path: "/services" }
  );

  useJsonLd({
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service?.title ?? "Engineering Services",
    "description": service?.fix ?? "",
    "provider": {
      "@type": "Organization",
      "@id": "https://apexgrideng.com/#service",
      "name": "Apex Grid Engineering",
      "url": "https://apexgrideng.com/",
    },
    "url": `${SITE_URL || "https://apexgrideng.com"}/services/${serviceId}`,
    "areaServed": "United States",
    "serviceType": service?.title ?? "Engineering",
  });

  if (!service) return <NotFound />;

  return (
    <div className="flex flex-col">
      {/* Problem → fix hero */}
      <section className="relative pt-40 pb-28 overflow-hidden bg-background border-b border-border">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-background/80 mix-blend-multiply z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" />
          {service.bg && (
            <img
              src={service.bg}
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover opacity-50"
            />
          )}
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-20">
          <div className="max-w-3xl">
            <Link href="/services" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors mb-8">
              All services <ArrowRight className="w-3 h-3" />
            </Link>
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-8 text-white">
              {service.title}
            </h1>
            <p className="text-xl md:text-2xl text-primary font-bold leading-relaxed border-l-4 border-primary pl-6 mb-6">
              {service.problem}
            </p>
            <p className="text-lg text-foreground/80 leading-relaxed max-w-2xl">
              {service.fix}
            </p>
            <p className="text-lg text-foreground/80 leading-relaxed max-w-2xl mt-4">
              <strong className="text-white">Turnaround:</strong> most standard scopes move from kickoff to sealed drawings in weeks, not months — and your quote lands within 12–24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* What you get + price CTA */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-16 max-w-6xl mx-auto">

            <div>
              <h2 className="text-3xl font-display font-bold mb-10 text-white flex items-center gap-4">
                <span className="w-12 h-1 bg-primary inline-block"></span>
                What you get
              </h2>
              <ul className="space-y-5">
                {service.youGet.map((item) => (
                  <li key={item} className="flex items-start gap-4 text-lg text-foreground/90">
                    <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <div className="sticky top-32 bg-background border border-border p-8 rounded-sm">
                <div className="w-12 h-1 bg-primary mb-6"></div>
                <h3 className="font-display font-bold text-2xl mb-4 text-white">Get your price</h3>
                <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
                  Answer a few quick questions and get a ballpark range in under a minute.
                  Quote back within 12–24 hours.
                </p>
                <Link
                  href="/estimate"
                  className="flex h-14 bg-primary text-white font-bold text-sm uppercase tracking-wider items-center justify-center w-full hover:bg-primary/90 transition-colors rounded-sm focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                >
                  Start My Estimate
                </Link>
                <Link
                  href="/contact"
                  className="mt-4 flex h-14 border border-border text-foreground font-bold text-sm uppercase tracking-wider items-center justify-center w-full hover:border-primary/50 transition-colors rounded-sm"
                >
                  Send Us Your Plans
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Industries we serve */}
      <section className="py-16 bg-background border-t border-border">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <h2 className="text-2xl font-display font-bold mb-4 text-white">Industries we serve</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl">
            {service.title} scoped for the codes, systems, and review agencies of your sector.
          </p>
          <div className="flex flex-wrap gap-3">
            {ALL_INDUSTRIES.map((industry) => (
              <Link
                key={industry.slug}
                href={`/industries/${industry.slug}/`}
                className="px-4 py-2 border border-border text-sm text-foreground/80 hover:text-primary hover:border-primary/50 transition-colors rounded-sm"
              >
                {industry.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
