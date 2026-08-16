import { Link } from "wouter";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { usePageMeta } from "@/lib/seo";

export type AudienceKey = "architects" | "contractors" | "developers" | "property-managers";

interface AudienceDef {
  slug: string;
  meta: { title: string; description: string };
  kicker: string;
  h1: [string, string]; // [main, dimmed]
  lede: string;
  painTitle: string;
  pains: { title: string; desc: string }[];
  deliverTitle: string;
  delivers: { title: string; desc: string }[];
  workflowTitle: string;
  workflow: { step: string; desc: string }[];
  ctaTitle: string;
  ctaBody: string;
  ctaLabel: string;
}

const AUDIENCES: Record<AudienceKey, AudienceDef> = {
  architects: {
    slug: "/for-architects",
    meta: {
      title: "MEP & Structural Engineering for Architects | Apex Grid",
      description:
        "A consulting engineering partner built for architects: coordinated MEP, structural, and civil design, clean Revit/CAD backgrounds, fast RFI turnaround, and permit-ready stamped documents in 49 states.",
    },
    kicker: "For Architects",
    h1: ["An Engineering Partner That", "Protects Your Design Intent"],
    lede:
      "You've seen what a disengaged consultant does to a project: late backgrounds, ductwork that collides with your ceiling design, structural surprises at 90% CDs. Apex Grid works the way architects need consultants to work — responsive, coordinated, and invested in the design.",
    painTitle: "What Slows Architects Down",
    pains: [
      { title: "Slow consultant turnaround", desc: "Waiting a week for a load letter or an RFI response stalls your whole document set. We commit to fast response times and communicate schedule honestly." },
      { title: "Uncoordinated systems", desc: "MEP and structural designed in silos create clashes your team has to catch. Our disciplines sit under one roof and coordinate before drawings reach you." },
      { title: "Design intent casualties", desc: "Exposed structure, tight plenums, and feature ceilings die when engineers won't iterate. We treat your design intent as a constraint, not an inconvenience." },
      { title: "Multi-state licensing gaps", desc: "A client takes you to a new state and your usual engineer isn't licensed there. We carry PE licensure in 49 states, so your team doesn't have to re-qualify consultants per project." },
    ],
    deliverTitle: "What You Get From Apex Grid",
    delivers: [
      { title: "All disciplines, one contract", desc: "MEP, structural, and civil engineering coordinated internally — one point of contact, one coordinated model, fewer clashes in your set." },
      { title: "Clean, timely backgrounds", desc: "Revit and CAD deliverables that drop into your workflow, issued on the schedule we agreed to." },
      { title: "Code research you can lean on", desc: "We track code adoptions and amendments across 49 states and flag jurisdiction-specific issues early, before they become redesign." },
      { title: "Permit-ready stamped documents", desc: "Complete, checked, PE-stamped sets that move through plan review with minimal comments." },
    ],
    workflowTitle: "How We Plug Into Your Process",
    workflow: [
      { step: "SD / Concept", desc: "Early system narratives, structural framing options, and rough utility loads so your concept is buildable from day one." },
      { step: "DD", desc: "Coordinated single-line diagrams, equipment sizing, and framing plans aligned to your evolving floor plans." },
      { step: "CD", desc: "Fully coordinated, stamped construction documents with specs — checked against your architectural set before issue." },
      { step: "CA", desc: "Submittal review, RFI responses, and site visits that keep the contractor building what was designed." },
    ],
    ctaTitle: "Bring Us Your Next Project",
    ctaBody: "Send us the floor plans and project location — we'll return a clear fee proposal with scope, deliverables, and schedule, fast.",
    ctaLabel: "Request a Proposal",
  },
  contractors: {
    slug: "/for-contractors",
    meta: {
      title: "Engineering for General Contractors & Design-Build | Apex Grid",
      description:
        "Design-build and design-assist engineering for GCs: fast permit sets, value engineering that holds up in plan review, deferred submittals, and stamped MEP, structural, and civil documents in 49 states.",
    },
    kicker: "For General Contractors",
    h1: ["Engineering That Moves at", "Construction Speed"],
    lede:
      "For a GC, engineering is a schedule item. Every week waiting on a permit set or a deferred submittal is a week of general conditions burn. Apex Grid engineers to construction reality — fast permit documents, buildable details, and honest answers when you call.",
    painTitle: "What Costs Contractors Money",
    pains: [
      { title: "Permit sets that stall", desc: "Incomplete or uncoordinated documents rack up plan-review comments and resubmittal cycles. Our sets are checked and complete before they leave the office." },
      { title: "Over-engineered designs", desc: "Conservative sizing and redundant systems inflate your bid and burn the budget. We design to code, not to fear — and we'll defend the numbers in review." },
      { title: "Deferred submittal bottlenecks", desc: "Racking, canopies, equipment anchorage — deferred submittals show up mid-construction and need stamps yesterday. We turn them fast." },
      { title: "Engineers who won't pick up the phone", desc: "When the inspector is standing in front of you, you need an answer today. Our engineers are reachable and respond like the schedule matters — because it does." },
    ],
    deliverTitle: "What You Get From Apex Grid",
    delivers: [
      { title: "Design-build partnership", desc: "We work directly under GCs on design-build and design-assist deliveries, engineering to your means, methods, and budget from the first sketch." },
      { title: "Fast, permit-ready documents", desc: "PE-stamped MEP, structural, and civil sets built to clear plan review with minimal comments — in any of 49 states." },
      { title: "Real value engineering", desc: "VE that reduces cost without triggering redesign or review flags: right-sized equipment, efficient framing, practical routing." },
      { title: "Construction-phase backup", desc: "RFI responses, field revisions, deferred submittals, and letters for the inspector — turned around on construction timelines." },
    ],
    workflowTitle: "How We Work With Your Team",
    workflow: [
      { step: "Preconstruction", desc: "Budget-level system narratives and structural approaches so your estimate is grounded in a real design." },
      { step: "Permit Package", desc: "Complete stamped documents scoped to what the jurisdiction actually requires — nothing missing, nothing extra." },
      { step: "Buyout Support", desc: "Performance specs and equipment schedules that let your subs bid apples-to-apples." },
      { step: "Construction", desc: "Fast RFI turnaround, field-change letters, and deferred submittal stamps that keep inspections moving." },
    ],
    ctaTitle: "Get a Number You Can Bid With",
    ctaBody: "Send us the scope and location. We'll turn a clear engineering fee proposal around fast — deliverables, schedule, and cost.",
    ctaLabel: "Request a Proposal",
  },
  developers: {
    slug: "/for-developers",
    meta: {
      title: "Engineering for Real Estate Developers | Apex Grid",
      description:
        "Feasibility-to-permit engineering for developers: due-diligence assessments, utility and entitlement support, right-sized MEP and structural design, and one engineering partner across a 49-state portfolio.",
    },
    kicker: "For Developers",
    h1: ["De-Risk the Deal.", "Then Deliver It."],
    lede:
      "Development is a risk business, and engineering surprises are among the most expensive risks there are: an undersized electrical service, an unbuildable soil condition, an energy code that kills the pro forma. Apex Grid gets engineering answers into your deal early — and carries the project through permit.",
    painTitle: "Where Deals Get Hurt",
    pains: [
      { title: "Surprises after close", desc: "Service upgrades, structural deficiencies, and code triggers discovered post-acquisition come straight out of your returns. Our due-diligence assessments surface them before you commit." },
      { title: "Pro formas built on guesses", desc: "Without early engineering input, construction budgets carry padding — or worse, gaps. We give you real system concepts and loads at the feasibility stage." },
      { title: "Permits pacing the pro forma", desc: "Every month in entitlement and plan review costs carry. Complete, jurisdiction-aware documents shorten the review cycle." },
      { title: "A new consultant in every market", desc: "Portfolio growth shouldn't mean re-vetting engineers city by city. One firm, 49 states, consistent deliverables." },
    ],
    deliverTitle: "What You Get From Apex Grid",
    delivers: [
      { title: "Due-diligence assessments", desc: "Building condition and systems assessments during your inspection period — what's at end of life, what code will trigger, what it costs to fix." },
      { title: "Feasibility engineering", desc: "Utility load estimates, structural feasibility, and site engineering input while the deal is still being shaped." },
      { title: "Right-sized design", desc: "MEP, structural, and civil design tuned to the asset strategy — build-to-sell, build-to-hold, or reposition." },
      { title: "Portfolio consistency", desc: "The same engineering team, standards, and responsiveness on every project, in whichever of 49 states the next deal lands." },
    ],
    workflowTitle: "From LOI to Certificate of Occupancy",
    workflow: [
      { step: "Due Diligence", desc: "Systems and structural assessments inside your inspection window, with cost exposure quantified." },
      { step: "Feasibility", desc: "Concept-level engineering that firms up the construction budget and flags entitlement issues." },
      { step: "Design & Permit", desc: "Full stamped design packages, coordinated across disciplines, built for the local jurisdiction." },
      { step: "Construction", desc: "CA support that protects the design — submittals, RFIs, and field issues resolved fast." },
    ],
    ctaTitle: "Put Engineering on Your Side of the Table",
    ctaBody: "Tell us about the deal — asset type, location, and timeline. We'll scope the engineering and give you a number fast.",
    ctaLabel: "Request a Proposal",
  },
  "property-managers": {
    slug: "/for-property-managers",
    meta: {
      title: "Engineering for Property Managers & Building Owners | Apex Grid",
      description:
        "Engineering support for property and facility managers: tenant improvement design, building assessments, capital planning input, equipment replacement engineering, and fast stamped documents in 49 states.",
    },
    kicker: "For Property & Facility Managers",
    h1: ["An Engineer on Call for", "Every Building You Run"],
    lede:
      "Managing buildings means a constant stream of engineering questions: a tenant build-out that needs permit drawings, an aging rooftop unit, a structural crack the owner is asking about. Apex Grid gives property managers one responsive engineering partner for all of it.",
    painTitle: "What Lands on Your Desk",
    pains: [
      { title: "Tenant improvements on a deadline", desc: "The lease is signed and the tenant wants keys. TI permit drawings are our bread and butter — fast, complete, and coordinated." },
      { title: "Aging equipment decisions", desc: "Repair or replace? Like-for-like or upgrade? We give you engineering answers with real numbers, not a contractor's sales pitch." },
      { title: "Owner and insurance questions", desc: "Structural concerns, code compliance questions, and insurance-driven assessments need a licensed PE's answer in writing. We provide it." },
      { title: "Capital planning blind spots", desc: "Budget season without system condition data is guesswork. Our building assessments turn deferred maintenance into a prioritized plan." },
    ],
    deliverTitle: "What You Get From Apex Grid",
    delivers: [
      { title: "TI design and permitting", desc: "Stamped MEP and structural drawings for tenant build-outs, sized to the space and matched to the base building." },
      { title: "Building assessments", desc: "Condition assessments of MEP and structural systems with remaining-life estimates and budget-grade replacement costs." },
      { title: "Replacement engineering", desc: "Design and specifications for equipment replacements — RTUs, boilers, panels, roofs-as-structure — that keep bids honest." },
      { title: "One partner, whole portfolio", desc: "Licensed in 49 states, so a portfolio that spans markets still gets one phone number and one standard of work." },
    ],
    workflowTitle: "How Engagements Typically Run",
    workflow: [
      { step: "Call Us", desc: "Describe the issue — a TI, an assessment, a failing system, an owner question. We scope it on the call." },
      { step: "Fast Proposal", desc: "A clear fee and schedule, usually within days, sized to the task — no bloated minimums." },
      { step: "Site & Design", desc: "We field-verify, design, and deliver stamped documents or a written assessment." },
      { step: "Follow-Through", desc: "Bid support, contractor questions, and permit follow-up until the work is done." },
    ],
    ctaTitle: "Get an Engineer You Can Actually Reach",
    ctaBody: "One building or a whole portfolio — tell us what you're dealing with and we'll respond with a scope and fee, fast.",
    ctaLabel: "Request a Proposal",
  },
};

const SERVICE_LINKS = [
  { name: "MEP Engineering", href: "/services/mep" },
  { name: "Structural Design", href: "/services/structural" },
  { name: "Civil Engineering", href: "/services/civil" },
  { name: "Building Assessments", href: "/services/assessments" },
  { name: "Architectural Design", href: "/services/architecture" },
];

const OTHER_AUDIENCES: { key: AudienceKey; label: string }[] = [
  { key: "architects", label: "For Architects" },
  { key: "contractors", label: "For Contractors" },
  { key: "developers", label: "For Developers" },
  { key: "property-managers", label: "For Property Managers" },
];

export default function Audience({ audience }: { audience: AudienceKey }) {
  const a = AUDIENCES[audience];
  usePageMeta({ title: a.meta.title, description: a.meta.description, path: a.slug });

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative pt-40 pb-24 bg-background overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-4xl">
            <p className="text-xs font-mono uppercase tracking-[0.25em] text-primary mb-6">{a.kicker}</p>
            <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight mb-8">
              {a.h1[0]} <span className="text-muted-foreground">{a.h1[1]}</span>
            </h1>
            <p className="text-lg md:text-2xl text-foreground/80 leading-relaxed mb-10">{a.lede}</p>
            <Link
              href="/contact"
              className="inline-flex h-14 px-8 bg-primary text-white font-bold text-sm uppercase tracking-wider items-center justify-center gap-3 rounded-[2px] hover:bg-primary/90 transition-colors"
            >
              {a.ctaLabel} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Pain points */}
      <section className="py-24 bg-card border-y border-border">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-12">{a.painTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {a.pains.map((p) => (
              <div key={p.title} className="border border-border bg-background p-8 rounded-[2px]">
                <h3 className="font-display font-semibold text-lg mb-3">{p.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-12">{a.deliverTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {a.delivers.map((d) => (
              <div key={d.title} className="flex gap-4">
                <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-1" />
                <div>
                  <h3 className="font-display font-semibold text-lg mb-2">{d.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{d.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="py-24 bg-card border-y border-border">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-12">{a.workflowTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {a.workflow.map((w, i) => (
              <div key={w.step} className="border-t-2 border-primary pt-6">
                <div className="text-xs font-mono text-muted-foreground mb-2">0{i + 1}</div>
                <h3 className="font-display font-semibold mb-3">{w.step}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Internal links */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-display font-bold mb-6">Services We Provide</h2>
              <ul className="space-y-3">
                {SERVICE_LINKS.map((s) => (
                  <li key={s.href}>
                    <Link href={s.href} className="text-foreground/80 hover:text-primary transition-colors inline-flex items-center gap-2">
                      <ArrowRight className="w-4 h-4 text-primary" /> {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-display font-bold mb-6">Who We Work With</h2>
              <ul className="space-y-3">
                {OTHER_AUDIENCES.filter((o) => o.key !== audience).map((o) => (
                  <li key={o.key}>
                    <Link href={AUDIENCES[o.key].slug} className="text-foreground/80 hover:text-primary transition-colors inline-flex items-center gap-2">
                      <ArrowRight className="w-4 h-4 text-primary" /> {o.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/portfolio" className="text-foreground/80 hover:text-primary transition-colors inline-flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-primary" /> See Our Portfolio
                  </Link>
                </li>
                <li>
                  <a href="/locations/" className="text-foreground/80 hover:text-primary transition-colors inline-flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-primary" /> Service Areas (49 States)
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-card border-t border-border">
        <div className="container mx-auto px-4 md:px-8 text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">{a.ctaTitle}</h2>
          <p className="text-lg text-muted-foreground mb-10 leading-relaxed">{a.ctaBody}</p>
          <Link
            href="/contact"
            className="inline-flex h-14 px-8 bg-primary text-white font-bold text-sm uppercase tracking-wider items-center justify-center gap-3 rounded-[2px] hover:bg-primary/90 transition-colors"
          >
            {a.ctaLabel} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
