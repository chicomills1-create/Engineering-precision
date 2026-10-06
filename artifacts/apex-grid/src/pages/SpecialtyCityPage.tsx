import { useParams } from "wouter";
import { useMemo, useEffect } from "react";

/**
 * Dynamic specialty × city page: /specialties/:specialty/:city/:state/
 *
 * Serves all engineering specialty × city combinations dynamically.
 * Example: /specialties/pe-stamping/austin/texas/
 *
 * 15 specialties × 19,355 cities = 290,325 URLs
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
  "structural-peer-review": {
    name: "Structural Peer Review",
    title: "Structural Peer Review Services",
    description:
      "Independent structural peer review by licensed PEs — a second set of expert eyes on structural designs before they become expensive field problems. Design-criteria verification, load-path and lateral-system review, connection and detailing checks, and constructability assessment. Required by many jurisdictions for complex structures and valued by owners who want risk off the table — available in 49 states.",
    edge:
      "Peer review isn't criticism — it's cheap insurance. Finding a load-path gap or a connection detail that doesn't work costs a few hours at a desk; finding it after the steel is up costs a fortune. We review like we're signing it, because our professional judgment is on the line too.",
    services: [
      "Design review: criteria, codes, and load verification against the structural drawings",
      "Lateral systems: wind and seismic load-path and detailing review",
      "Connections: moment-frame, braced-frame, and collector connection checks",
      "Constructability: detailing review for buildability and trade coordination",
      "Report: stamped review letters and comment resolution for AHJs and owners",
    ],
  },
  "mep-peer-review": {
    name: "MEP Peer Review",
    title: "MEP Peer Review Services",
    description:
      "Independent MEP peer review by licensed engineers — verifying mechanical, electrical, and plumbing designs for code compliance, coordination, and performance before construction. System sizing verification, controls-sequence review, energy-code compliance checks, and cross-discipline coordination assessment. The quality gate sophisticated owners require — in 49 states.",
    edge:
      "MEP systems are where buildings fail quietly — oversized equipment short-cycling, controls fighting each other, ventilation that never met code. A peer review catches the design-stage errors that become decade-long operating costs, for a fraction of the price.",
    services: [
      "System sizing: load-calc verification and equipment selection review",
      "Controls: sequence-of-operation review for implementability and performance",
      "Energy code: Title 24, IECC, and ASHRAE 90.1 compliance verification",
      "Coordination: cross-discipline clash and routing review",
      "Report: stamped findings with prioritized corrective recommendations",
    ],
  },
  "code-consulting": {
    name: "Code Consulting",
    title: "Building Code Consulting Services",
    description:
      "Building code consulting by licensed engineers — navigating IBC, IECC, NEC, NFPA, and local amendments without the guesswork. Code-path analysis, alternate-means-and-methods requests, occupancy and egress studies, and AHJ negotiation support. When the code is ambiguous or the project is unusual, we find the compliant path that keeps the project moving — in 49 states.",
    edge:
      "Code officials respect engineers who speak their language — chapter and verse, with the analysis to back it up. We don't argue code; we document it, propose compliant alternatives, and get to yes with the AHJ while your schedule stays intact.",
    services: [
      "Code analysis: IBC, IECC, NEC, and NFPA compliance pathfinding",
      "Alternate methods: AMMR submittals and performance-based compliance",
      "Occupancy and egress: studies, occupant-load analysis, and exiting plans",
      "AHJ negotiation: plan-check response strategy and meeting representation",
      "Due diligence: code-risk assessment for acquisitions and developments",
    ],
  },
  "accessibility-compliance": {
    name: "Accessibility Compliance",
    title: "ADA Accessibility Compliance Services",
    description:
      "ADA and accessibility compliance engineering — making buildings genuinely accessible, not just technically permitted. ADA Standards and FHA compliance review, CASp-style deficiency surveys, path-of-travel and restroom upgrade design, and Title III barrier-removal planning. Lawsuit-risk reduction for owners and real usability for occupants — in 49 states.",
    edge:
      "Accessibility lawsuits don't target bad actors — they target measurable barriers. We survey like a plaintiff's expert would, prioritize fixes by risk and cost, and engineer upgrades that satisfy the standards and actually work for people with disabilities.",
    services: [
      "Surveys: ADA deficiency identification and prioritized remediation plans",
      "Restroom design: compliant layouts, fixtures, and clearances",
      "Path of travel: entries, ramps, parking, and circulation upgrades",
      "Plan review: accessibility compliance check of new-construction drawings",
      "Barrier removal: Title III readily-achievable planning and cost opinions",
    ],
  },
  "leed-certification": {
    name: "LEED Certification",
    title: "LEED Certification Consulting",
    description:
      "LEED certification consulting and energy prerequisite engineering — guiding projects to Certified, Silver, Gold, or Platinum. Credit strategy and feasibility analysis, energy modeling for EA credits, commissioning coordination, and LEED documentation management. We engineer the MEP and energy systems that earn the points, not just the paperwork — in 49 states.",
    edge:
      "LEED points are cheapest when they're designed in, not bolted on. We run the credit strategy during schematic design — when energy, water, and materials decisions still cost nothing — and engineer the systems that make certification a natural outcome, not a rescue mission.",
    services: [
      "Credit strategy: feasibility, scorecard development, and certification roadmaps",
      "Energy: modeling, commissioning, and EA prerequisite/credit documentation",
      "MEP engineering: systems designed to earn energy and IEQ credits",
      "Documentation: LEED Online submittal preparation and review responses",
      "Existing buildings: LEED O+M certification and recertification support",
    ],
  },
  "net-zero-design": {
    name: "Net Zero Design",
    title: "Net Zero Energy Design Services",
    description:
      "Net-zero-energy building design — engineering buildings that produce as much energy as they consume. Load-reduction-first MEP design, envelope optimization, all-electric system strategies, and on-site renewable sizing (solar PV, geothermal). Energy modeling to prove the zero balance, utility interconnection coordination, and monitoring-based verification — by licensed engineers in 49 states.",
    edge:
      "Net zero is a math problem with a construction budget — and the math only works if efficiency comes before renewables. We drive loads down first (envelope, HVAC, lighting), then size the solar array for what's left, so the zero-energy target survives value engineering.",
    services: [
      "Load reduction: envelope, HVAC, and lighting optimization for minimal EUI",
      "All-electric design: heat-pump systems, induction, and fossil-fuel elimination",
      "Renewable sizing: solar PV array design and production modeling",
      "Energy modeling: zero-energy balance proof and EUI targeting",
      "Verification: metering, monitoring, and performance-period support",
    ],
  },
  "envelope-commissioning": {
    name: "Envelope Commissioning",
    title: "Building Envelope Commissioning",
    description:
      "Building enclosure commissioning (BECx) — verifying the air barrier, waterproofing, and thermal envelope perform as designed. Enclosure commissioning plans, submittal and mockup review, field testing (blower-door, water-spray, infrared), and construction observation. NIBS Guideline 3-based process for new construction and major renovations — in 49 states.",
    edge:
      "The envelope is the building's largest system and the least tested — until it leaks. We test the air barrier and waterproofing while they're still accessible, witness the details that drawings can't fully describe, and document an enclosure that performs for decades.",
    services: [
      "BECx plans: enclosure commissioning specifications and test protocols",
      "Mockup review: performance mockup design review and test witnessing",
      "Field testing: air-barrier, water-penetration, and thermographic testing",
      "Observation: critical-detail inspections during enclosure construction",
      "Documentation: enclosure commissioning reports for LEED and owner turnover",
    ],
  },
  "forensic-engineering": {
    name: "Forensic Engineering",
    title: "Forensic Engineering Investigation",
    description:
      "Forensic engineering investigation of building failures — structural distress, water intrusion, MEP system failures, and construction defects. Field investigation, non-destructive testing coordination, failure-mechanism analysis, and repair-design engineering. Expert documentation for insurance claims and litigation support — by licensed PEs in 49 states.",
    edge:
      "Forensic work demands engineering judgment under adversarial scrutiny — every conclusion has to survive the other side's expert. We investigate methodically, document relentlessly, and opine only where the evidence supports it, which is why our findings hold up.",
    services: [
      "Failure investigation: structural, envelope, and MEP failure analysis",
      "Field testing: NDT coordination, moisture mapping, and load testing",
      "Cause determination: failure-mechanism analysis with documented evidence",
      "Repair design: engineered remediation and restoration drawings",
      "Documentation: reports suitable for insurance and legal proceedings",
    ],
  },
  "expert-witness": {
    name: "Expert Witness",
    title: "Engineering Expert Witness Services",
    description:
      "Licensed PE expert-witness services for construction litigation — standard-of-care opinions, defect analysis, and delay and cost evaluation. Deposition and trial testimony, expert reports meeting jurisdictional requirements, and case consultation from filing through verdict. Our experts are practicing design engineers, not professional witnesses — credible because we do the work we opine about, in 49 states.",
    edge:
      "Juries and judges can tell the difference between a hired gun and a working engineer. Our experts stamp buildings for a living — the same judgment we apply to your case is the judgment building departments trust every day, and that credibility shows on the stand.",
    services: [
      "Standard of care: professional-negligence opinions by practicing PEs",
      "Defect analysis: construction-defect investigation and repair-cost opinions",
      "Reports: expert disclosures meeting federal and state requirements",
      "Testimony: deposition and trial testimony with demonstrative support",
      "Consultation: case strategy, document review, and rebuttal analysis",
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

  // Thin programmatic page (specialties-t2 only): noindexed to conserve crawl
  // budget (2026-10-06). specialties t1 (pe-stamping etc.) stays indexable.
  const isThinSpecialty = new Set(["structural-peer-review", "mep-peer-review", "code-consulting", "accessibility-compliance", "leed-certification", "net-zero-design", "envelope-commissioning", "forensic-engineering", "expert-witness"]).has(specialtySlug);
  useEffect(() => {
    if (!isThinSpecialty) return;
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex,follow";
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
    };
  }, [isThinSpecialty]);
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
