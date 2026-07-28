import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import mepBg from "@assets/generated_images/mep-bg.jpg";
import structuralBg from "@assets/generated_images/structural-bg.jpg";
import civilBg from "@assets/generated_images/civil-bg.jpg";
import assessmentBg from "@assets/generated_images/assessment-bg.jpg";

const services = [
  {
    id: "mep",
    num: "01",
    title: "MEP Design & Engineering",
    desc: "Coordinated mechanical, electrical, and plumbing design — plus Title 24 and energy code compliance — so your building systems are clear on paper, buildable on site, and ready for review.",
    bg: mepBg,
  },
  {
    id: "structural",
    num: "02",
    title: "Structural Design & Engineering",
    desc: "Practical structural engineering for buildings — including ADUs, additions, seismic retrofits, and inspections — focused on safety, constructability, and clear documentation.",
    bg: structuralBg,
  },
  {
    id: "civil",
    num: "03",
    title: "Civil Engineering",
    desc: "Site feasibility to grading plan — we document decisions clearly so water drains, utilities run, and the ground is shaped to support what's being built.",
    bg: civilBg,
  },
  {
    id: "assessments",
    num: "04",
    title: "Building Assessments",
    desc: "Independent judgment and reporting when conditions change, damage is suspected, or verification is required.",
    bg: assessmentBg,
  },
];

export default function Services() {
  return (
    <div className="flex flex-col">
      <section className="relative pt-40 pb-24 overflow-hidden bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-px bg-primary" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
              Capabilities
            </span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight leading-[1.05]">
            One Firm.
            <br />
            <span className="text-muted-foreground italic">
              Four Lines Of Service.
            </span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-foreground/80 border-l-2 border-primary pl-6">
            MEP design, structural and civil engineering, and building
            assessments — so you don't have to coordinate multiple firms to get
            one project across the line.
          </p>
        </div>
      </section>

      <section className="pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid md:grid-cols-2 gap-6">
          {services.map((s) => (
            <Link
              key={s.id}
              href={`/services/${s.id}`}
              className="group relative overflow-hidden border border-border bg-card hover:border-primary/60 transition-colors"
            >
              <div className="absolute inset-0">
                <img
                  src={s.bg}
                  alt={s.title}
                  className="w-full h-full object-cover opacity-20 group-hover:opacity-30 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/40" />
              </div>
              <div className="relative p-10 md:p-12 flex flex-col min-h-[340px]">
                <span className="font-display text-6xl font-bold text-primary/40 group-hover:text-primary transition-colors">
                  {s.num}
                </span>
                <h2 className="mt-6 font-display text-2xl md:text-3xl font-bold tracking-tight">
                  {s.title}
                </h2>
                <p className="mt-4 text-sm md:text-base text-foreground/70 leading-relaxed flex-1">
                  {s.desc}
                </p>
                <span className="mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-primary">
                  Explore Discipline
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="border border-border bg-card p-12 md:p-16 text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
              Fewer Handoffs. Clearer Responsibility.
            </h2>
            <p className="mt-6 max-w-2xl mx-auto text-foreground/70">
              When one firm owns coordination from site layout through MEP and
              structural design to permit-ready drawings, you get fewer
              surprises and a single point of accountability.
            </p>
            <Link
              href="/contact"
              className="mt-10 inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 font-mono text-sm uppercase tracking-[0.2em] hover:bg-primary/90 transition-colors"
            >
              Contact Us Today
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
