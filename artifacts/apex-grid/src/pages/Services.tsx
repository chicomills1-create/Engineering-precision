import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import mepBg from "@assets/generated_images/mep-bg.webp";
import structuralBg from "@assets/generated_images/structural-bg.webp";
import civilBg from "@assets/generated_images/civil-bg.webp";
import assessmentBg from "@assets/generated_images/assessment-bg.webp";
import architectureBg from "@assets/generated_images/architecture-bg.webp";
import { usePageMeta } from "@/lib/seo";

/**
 * Services index — problem-first. Each card names the problem the visitor
 * has, what we do about it, and one tap to get a price.
 */
const services = [
  {
    id: "mep",
    num: "01",
    problem: "Building systems not coordinated?",
    title: "MEP Design & Engineering",
    fix: "Mechanical, electrical, and plumbing designed to work together — plus Title 24 — so nothing collides in the field.",
    bg: mepBg,
  },
  {
    id: "structural",
    num: "02",
    problem: "Need it to stand up — and pass plan check?",
    title: "Structural Design & Engineering",
    fix: "Practical structural design for buildings, ADUs, additions, and retrofits. Safe, buildable, clearly documented.",
    bg: structuralBg,
  },
  {
    id: "civil",
    num: "03",
    problem: "Raw land that needs to become a site?",
    title: "Civil Engineering",
    fix: "Grading, drainage, and utilities — so water drains, utilities run, and the ground is ready to build on.",
    bg: civilBg,
  },
  {
    id: "assessments",
    num: "04",
    problem: "Not sure what you're dealing with?",
    title: "Building Assessments",
    fix: "Independent engineering judgment when conditions change, damage is suspected, or you need verification.",
    bg: assessmentBg,
  },
  {
    id: "architecture",
    num: "05",
    problem: "Need the design, not just the engineering?",
    title: "Architectural Design",
    fix: "Full architectural design — concept through permit-ready documents — coordinated with our engineers from day one.",
    bg: architectureBg,
  },
];

export default function Services() {
  usePageMeta(PAGE_META);

  return (
    <div className="flex flex-col">
      <section className="relative pt-40 pb-24 overflow-hidden bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] text-white">
            What's the problem?<br />
            <span className="text-muted-foreground italic font-light">We'll fix it.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-foreground/80 border-l-2 border-primary pl-6">
            Tap a problem below. Every one of them ends the same way — a clear price,
            a fast turnaround, and drawings that pass plan check.
          </p>
        </div>
      </section>

      <section className="pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid md:grid-cols-2 gap-6">
          {services.map((s) => (
            <Link
              key={s.id}
              href={`/services/${s.id}`}
              className="group relative overflow-hidden border border-border bg-card hover:border-primary/60 transition-colors rounded-sm focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
            >
              <div className="absolute inset-0">
                <img
                  src={s.bg}
                  alt=""
                  aria-hidden="true"
                  className="w-full h-full object-cover opacity-20 group-hover:opacity-30 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/40" />
              </div>
              <div className="relative p-10 md:p-12 flex flex-col min-h-[340px]">
                <span className="font-display text-6xl font-bold text-primary/40 group-hover:text-primary transition-colors">
                  {s.num}
                </span>
                <p className="mt-6 text-primary font-bold text-lg">{s.problem}</p>
                <h2 className="mt-2 font-display text-2xl md:text-3xl font-bold tracking-tight text-white">
                  {s.title}
                </h2>
                <p className="mt-4 text-sm md:text-base text-foreground/70 leading-relaxed flex-1">
                  {s.fix}
                </p>
                <span className="mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-primary">
                  Get my price
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="border border-border bg-card p-12 md:p-16 text-center rounded-sm">
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-white">
              Not sure which one you need?
            </h2>
            <p className="mt-6 max-w-2xl mx-auto text-foreground/70">
              Tap through the estimator — it figures out what you need and gives you
              a ballpark price in under a minute.
            </p>
            <Link
              href="/estimate"
              className="mt-10 inline-flex h-16 items-center gap-3 bg-primary text-white px-10 font-bold text-sm uppercase tracking-[0.15em] hover:bg-primary/90 transition-colors rounded-sm focus-visible:ring-4 focus-visible:ring-primary/50 focus-visible:outline-none"
            >
              Start My Estimate
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

const PAGE_META = {
  title: "Engineering Services | MEP, Structural, Civil, Architecture | Apex Grid",
  description: "What's the problem? MEP design, structural engineering, civil/site work, building assessments, and architectural design — clear prices, fast turnaround, drawings that pass plan check.",
  path: "/services",
};
