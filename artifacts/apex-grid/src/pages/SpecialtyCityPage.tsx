import { useParams } from "wouter";
import { useMemo } from "react";

/**
 * Dynamic specialty × city page: /specialties/:specialty/:city/:state/
 *
 * Serves all engineering specialty × city combinations dynamically.
 * Example: /specialties/pe-stamping/austin/texas/
 *
 * 6 specialties × 19,355 cities = 116,130 URLs
 */

interface SpecialtyInfo {
  name: string;
  title: string;
  description: string;
  edge: string;
  services: string[];
}

const SPECIALTIES: Record<string, SpecialtyInfo> = {
  "pe-stamping": {
    name: "PE Stamping",
    title: "Professional Engineer Stamping Services",
    description:
      "Licensed Professional Engineer stamp and seal services for construction documents in 49 states. We review and stamp MEP, structural, and civil drawings prepared by your team — or engineer and stamp the full package ourselves. New designs, existing drawings needing a seal, and multi-state rollouts where one PE firm covers every jurisdiction. Fast turnaround stamping with proper engineering review behind every seal, because our license rides on every sheet.",
    edge:
      "A stamp without engineering review behind it is a liability, not a service. Every set we seal gets a real licensed-PE review against the applicable code — which is why building departments accept our drawings the first time.",
    services: [
      "Drawing review and seal: PE stamp for MEP, structural, and civil plan sets in 49 states",
      "Multi-state coverage: one firm stamps your rollout in every licensed jurisdiction",
      "Existing designs: seal and certify drawings prepared by unlicensed designers or out-of-state firms",
      "Structural calculations: stamped calcs packages for permits, plan check, and record",
      "Fast turnaround: review-to-seal in days, not weeks, with 24-hour quote response",
    ],
  },
  "plan-check-corrections": {
    name: "Plan Check Corrections",
    title: "Plan Check Corrections Engineering",
    description:
      "Expert response to building department plan check comments — corrections, recalculations, and resubmittal packages that clear review fast. We interpret reviewer comments, revise MEP and structural drawings, provide the supporting calculations reviewers demand, and coordinate resubmittals with the AHJ. Stalled permits get moving again: most correction packages turn around in days, and our responses are written in the language plan reviewers speak.",
    edge:
      "Plan check comments are a negotiation, and most engineers lose it by arguing instead of answering. We read what the reviewer actually needs, give them exactly that — calcs, details, code citations — and get the permit issued.",
    services: [
      "Comment response: point-by-point written responses with revised drawings and calcs",
      "MEP corrections: mechanical, electrical, and plumbing revisions to satisfy reviewers",
      "Structural corrections: recalculations, connection redesigns, and detailing fixes",
      "Code research: cited code sections, interpretations, and alternate-means requests",
      "Resubmittal management: coordinated packages, reviewer follow-up, and permit pickup support",
    ],
  },
  "title-24-compliance": {
    name: "Title 24 Compliance",
    title: "California Title 24 Energy Compliance",
    description:
      "California Title 24, Part 6 energy compliance — calculations, reports, and documentation for nonresidential and high-rise residential projects statewide. EnergyPro modeling, envelope, lighting, and mechanical compliance forms (NRCC/NRCA), acceptance testing coordination, and commissioning documentation. New construction, alterations, and additions — engineered by a team that works Title 24 daily and knows exactly what California plan reviewers require.",
    edge:
      "Title 24 rejects more permit applications than any other single California requirement. We model, document, and pre-check compliance before submittal — so the energy forms sail through instead of stalling your permit.",
    services: [
      "Energy modeling: EnergyPro performance and prescriptive compliance for nonresidential",
      "Compliance forms: NRCC, NRCA, and NRCV documentation packages for permit submittal",
      "Lighting: indoor/outdoor lighting power, controls, and daylighting compliance",
      "Mechanical: HVAC efficiency, economizers, and acceptance test requirements",
      "Alterations: tenant improvement and addition compliance scoped to the work area",
    ],
  },
  "feasibility-study": {
    name: "Feasibility Study",
    title: "Engineering Feasibility Studies",
    description:
      "Pre-acquisition and pre-design engineering feasibility studies — the technical due diligence that protects your investment before you commit capital. Site capacity analysis, utility availability and service upgrades, zoning and code constraints, structural assessment of existing buildings, and order-of-magnitude engineering budgets. Go/no-go answers with real engineering behind them, delivered fast enough to meet your contingency deadlines.",
    edge:
      "The cheapest engineering is the study that kills a bad deal before you buy it. Our feasibility work has saved clients millions in unbuildable sites — and green-lit great ones with the utility and code homework already done.",
    services: [
      "Site capacity: utility availability, service sizes, and upgrade requirements",
      "Code and zoning: setbacks, height, FAR, parking, and use constraints",
      "Existing buildings: structural condition, MEP capacity, and adaptive-reuse potential",
      "Budget engineering: order-of-magnitude MEP/structural costs for pro forma input",
      "Risk register: red flags, long-lead items, and permitting timeline estimates",
    ],
  },
  "permit-expediting": {
    name: "Permit Expediting",
    title: "Permit Expediting Services",
    description:
      "End-to-end permit expediting — we manage your project through the building department from submittal to issuance. Application preparation, plan routing, reviewer coordination, comment tracking, and agency clearances (planning, fire, health, public works). We know the submittal requirements, the review sequences, and the people — in jurisdictions across all 49 licensed states — and we keep your permit moving while you run the project.",
    edge:
      "Permits die in handoffs — between agencies, between reviewers, between revisions. We own the whole chain: one accountable expeditor tracking every comment, every clearance, every signature until the permit is in your hand.",
    services: [
      "Submittal management: complete application packages, forms, and plan routing",
      "Reviewer coordination: direct follow-up with plan checkers across all disciplines",
      "Agency clearances: planning, fire, health, public works, and utility sign-offs",
      "Comment tracking: organized responses, revision scheduling, and resubmittal",
      "Timeline management: realistic permit schedules with proactive bottleneck removal",
    ],
  },
  "energy-code-compliance": {
    name: "Energy Code Compliance",
    title: "Energy Code Compliance Engineering",
    description:
      "Commercial energy code compliance in every state — IECC, ASHRAE 90.1, and state amendments from New York's NYCECC to Washington's WSEC. COMcheck and performance-path documentation, envelope, lighting, and mechanical compliance, and commissioning support. New construction and major renovations, engineered alongside your MEP design so compliance is built in — not bolted on at permit time.",
    edge:
      "Energy code is the last thing designers think about and the first thing that fails plan check. We integrate compliance into the MEP design from schematic phase, so the COMcheck passes and the permit issues without a redesign cycle.",
    services: [
      "COMcheck documentation: envelope, lighting, and mechanical compliance reports",
      "ASHRAE 90.1: performance-path modeling and prescriptive compliance",
      "State amendments: NYCECC, WSEC, and other state-specific energy code variants",
      "Lighting and controls: power density, daylighting, and control-sequence compliance",
      "Commissioning: Cx specifications, functional testing support, and documentation",
    ],
  },
};

function slugToCity(slug: string): string {
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function slugToState(slug: string): string {
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

export default function SpecialtyCityPage() {
  const params = useParams();
  const specialtySlug = params.specialty as string;
  const citySlug = params.city as string;
  const stateSlug = params.state as string;

  const specialty = SPECIALTIES[specialtySlug];
  const city = useMemo(() => slugToCity(citySlug || ''), [citySlug]);
  const state = useMemo(() => slugToState(stateSlug || ''), [stateSlug]);

  if (!specialty || !city || !state) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
          <p>The requested specialty engineering page could not be found.</p>
        </div>
      </div>
    );
  }

  const pageTitle = `${specialty.title} in ${city}, ${state} | Apex Grid`;
  const metaDescription = `${specialty.description} ${specialty.name} services in ${city}, ${state} with 49-state PE licensure and 24-hour quotes.`;

  return (
    <div className="min-h-screen bg-white">
      {/* SEO meta would be handled by react-helmet or similar */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <nav className="text-sm text-gray-500 mb-6">
          <a href="/" className="hover:underline">Home</a> {' > '}
          <a href="/services" className="hover:underline">Services</a> {' > '}
          <span>{specialty.name}</span> {' > '}
          <span>{city}, {state}</span>
        </nav>

        <h1 className="text-4xl font-bold mb-6">
          {specialty.title} in {city}, {state}
        </h1>

        <p className="text-lg text-gray-700 mb-8">
          {metaDescription}
        </p>

        <div className="prose max-w-none mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            {specialty.name} Services in {city}
          </h2>
          <p className="mb-4">
            Apex Grid Engineering provides {specialty.name.toLowerCase()} services in
            {city}, {state} for owners, developers, architects, contractors, and design
            teams. Licensed in 49 states, we bring the same rigorous engineering and
            responsive service to a single local project or a national program.
          </p>
          <p className="mb-4">
            {specialty.description}
          </p>
          <p className="mb-4">
            {specialty.edge}
          </p>

          <h2 className="text-2xl font-semibold mb-4 mt-8">
            Why Teams Choose Apex Grid for {specialty.name}
          </h2>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>49-State Licensure:</strong> Licensed PEs covering {specialty.name.toLowerCase()} work in every market you operate.</li>
            <li><strong>24-Hour Quotes:</strong> Scope and pricing back in 12-24 hours — no waiting weeks to start.</li>
            <li><strong>Specialist Depth:</strong> {specialty.name} is a dedicated practice for us, not a side service — you get people who do this every day.</li>
            <li><strong>Responsive Delivery:</strong> Direct communication, fast turnarounds, and documentation tuned for {city} reviewers.</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4 mt-8">
            {specialty.name} in {city}, {state}: What We Deliver
          </h2>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            {specialty.services.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
            <h3 className="text-xl font-semibold mb-3">Get {specialty.name} Help in {city}</h3>
            <p className="mb-4">
              Tell us what you need — drawings to stamp, comments to clear, a permit to
              push, or a project to evaluate. Quote back in 24 hours.
            </p>
            <a
              href="/estimate"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
            >
              Send Us Your Project
            </a>
          </div>
        </div>

        <div className="border-t pt-8 mt-12">
          <p className="text-sm text-gray-500">
            Apex Grid Engineering PLLC is licensed in 49 states, including {state}.
            Professional {specialty.name.toLowerCase()} services in {city} and
            surrounding areas.
          </p>
        </div>
      </main>
    </div>
  );
}
