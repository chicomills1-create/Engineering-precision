import { useParams } from "wouter";
import { useMemo, useEffect } from "react";

/**
 * Dynamic project type × city page: /projects/:project/:city/:state/
 *
 * Serves all project type × city combinations dynamically.
 * Example: /projects/tenant-improvement/austin/texas/
 *
 * 16 project types × 19,355 cities = 309,680 URLs
 */

interface ProjectInfo {
  name: string;
  title: string;
  description: string;
  edge: string;
  services: string[];
}

const PROJECTS: Record<string, ProjectInfo> = {
  "new-construction": {
    name: "New Construction",
    title: "New Construction Engineering",
    description:
      "Full MEP and structural engineering for ground-up new construction — from schematic design through permit and construction administration. Complete drawing packages: architectural coordination, structural framing and foundations, mechanical, electrical, plumbing, and fire protection designed as one integrated system. Energy modeling, Title 24 and IECC compliance, and commissioning support from a single accountable engineering team — PE-stamped in 49 states.",
    edge:
      "New construction is where integrated engineering pays for itself — every clash caught on paper saves ten in the field. We design MEP and structural as one coordinated model, so your building goes up once, on budget, and passes inspection the first time.",
    services: [
      "Full MEP design: mechanical, electrical, plumbing, and fire protection from SD through CD",
      "Structural engineering: foundations, framing, and lateral systems for all construction types",
      "Energy compliance: Title 24, IECC, and ASHRAE 90.1 modeling and documentation",
      "Permit packages: stamped drawings, calculations, and AHJ submittal coordination",
      "Construction administration: submittal review, RFI responses, and field observation",
    ],
  },
  "renovation": {
    name: "Renovation",
    title: "Building Renovation Engineering",
    description:
      "Engineering for building renovations — occupied and unoccupied, partial and full-building. As-built documentation, structural assessment of existing framing, and MEP systems designed to thread through existing construction. Code-trigger analysis (what the renovation triggers and what it doesn't), ADA upgrade scoping, and phased packages that keep tenants operating — with PE stamps in 49 states.",
    edge:
      "Renovations are archaeology with a deadline — you don't know what's behind the wall until you open it. We front-load investigation and design MEP routing with contingency paths, so surprises become change orders you already priced, not schedule killers.",
    services: [
      "As-built documentation: field verification, laser-scan coordination, and existing-conditions drawings",
      "Structural assessment: capacity checks, retrofit design, and selective demolition engineering",
      "MEP retrofit: systems designed to integrate with and upgrade existing infrastructure",
      "Code analysis: trigger evaluation, ADA scoping, and energy-code upgrade paths",
      "Phasing: occupied-building packages with interim life-safety and utility cutover plans",
    ],
  },
  "tenant-improvement": {
    name: "Tenant Improvement",
    title: "Tenant Improvement Engineering",
    description:
      "Fast-turn MEP engineering for tenant improvements — office, retail, restaurant, and medical build-outs. Demolition plans, new HVAC distribution tied to base-building systems, lighting and power for tenant layouts, and plumbing for restrooms, break rooms, and specialty uses. Landlord work-letter coordination, base-building constraint analysis, and permit sets turned in days — PE-stamped in 49 states.",
    edge:
      "TI schedules are measured in weeks and leases start on fixed dates. Our TI playbook — base-building system verification, prototype details, and 24-hour quote turnaround — gets your space permitted and built before the rent clock runs out.",
    services: [
      "HVAC: distribution redesign, VAV reconfiguration, and base-building tie-ins",
      "Electrical: lighting, power, panel schedules, and low-voltage coordination",
      "Plumbing: restroom cores, break rooms, and specialty fixture rough-in",
      "Fire protection: sprinkler head relocation, fire alarm device adds, and tenant separations",
      "Permits: fast-turn plan sets, landlord approvals, and AHJ submittals",
    ],
  },
  "building-addition": {
    name: "Building Addition",
    title: "Building Addition Engineering",
    description:
      "Structural and MEP engineering for building additions — item expansions, horizontal wings, and infill construction. Structural analysis of the existing building's capacity to carry new loads, foundation design for the addition, and seismic separation or integration detailing. MEP systems extended or upgraded to serve the new area, utility capacity verification, and code analysis for the combined building — PE-stamped in 49 states.",
    edge:
      "An addition is only as good as the building it attaches to. We investigate the existing structure first — capacity, foundations, lateral system — then engineer the addition to work with what you have, not against it.",
    services: [
      "Structural: existing-capacity analysis, new foundations, and addition framing",
      "Seismic: separation joints or integrated lateral design per code",
      "MEP extension: HVAC, electrical, and plumbing sized for the combined building",
      "Utility verification: service capacity checks and upgrade engineering",
      "Code: occupancy, egress, and energy analysis for the enlarged building",
    ],
  },
  "adu-accessory-dwelling": {
    name: "ADU / Accessory Dwelling",
    title: "ADU Engineering Services",
    description:
      "Engineering for accessory dwelling units — detached backyard cottages, garage conversions, basement units, and attached additions. Structural design for new ADU construction, MEP systems sized for compact living, and utility connections (separate or shared meters, sewer tie-ins, panel upgrades). California and multi-state ADU code expertise, fire-separation detailing, and permit packages tuned for fast ADU approval — PE-stamped in 49 states.",
    edge:
      "ADUs are small projects with outsized permitting friction. We engineer the details AHJs flag — fire separation, utility connections, energy compliance — into the first submittal, so your unit gets approved in one round instead of three.",
    services: [
      "Structural: foundation and framing design for detached and attached ADUs",
      "MEP: compact HVAC, electrical, and plumbing systems for small footprints",
      "Utilities: sewer tie-ins, water service, panel upgrades, and metering strategy",
      "Energy: Title 24 and IECC compliance documentation for ADU permits",
      "Conversions: garage and basement structural assessment and retrofit design",
    ],
  },
  "commercial-remodel": {
    name: "Commercial Remodel",
    title: "Commercial Remodel Engineering",
    description:
      "Engineering for commercial remodels — repositioning aging buildings for new tenants, new uses, and new market rents. Facade and entry upgrades, lobby renovations, MEP system modernization, and structural modifications for new openings and loads. Change-of-occupancy engineering, ADA path-of-travel upgrades, and energy retrofits that cut operating costs — with PE stamps in 49 states.",
    edge:
      "A remodel has to earn its keep — every dollar of engineering should show up in rent or sale price. We target the upgrades with real ROI: facades that lease space, MEP that cuts utility bills, and structural changes that unlock new uses.",
    services: [
      "Facade and lobby: structural support for new storefronts, canopies, and entries",
      "MEP modernization: HVAC replacement, lighting retrofits, and control upgrades",
      "Change of occupancy: code analysis and upgrade engineering for new uses",
      "ADA: path-of-travel, restroom, and entry upgrades scoped to the remodel trigger",
      "Energy retrofits: envelope, lighting, and HVAC improvements with payback analysis",
    ],
  },
  "historic-renovation": {
    name: "Historic Renovation",
    title: "Historic Building Renovation Engineering",
    description:
      "Engineering for historic and landmark buildings — adaptive upgrades that respect original fabric. Structural assessment and seismic retrofit of unreinforced masonry, vintage steel, and timber framing. MEP systems threaded through historic construction with minimal visual impact, Secretary of the Interior Standards compliance, and coordination with preservation commissions — PE-stamped in 49 states.",
    edge:
      "Historic buildings have two clients: the owner and history. We engineer modern performance — seismic safety, efficient MEP, accessibility — while preserving the character-defining features that make the building worth saving, and we document it for the preservation board.",
    services: [
      "Structural assessment: capacity analysis of historic framing, masonry, and foundations",
      "Seismic retrofit: URM wall anchorage, diaphragm upgrades, and foundation ties",
      "MEP integration: concealed routing, minimal-impact distribution, and system upgrades",
      "Preservation compliance: Standards-conformant engineering and commission documentation",
      "Adaptive systems: modern HVAC, electrical, and plumbing fitted to historic constraints",
    ],
  },
  "adaptive-reuse": {
    name: "Adaptive Reuse",
    title: "Adaptive Reuse Engineering",
    description:
      "Engineering for adaptive reuse — warehouses to offices, churches to venues, industrial to residential. Change-of-occupancy code analysis, structural evaluation for new loading and uses, and MEP systems designed for buildings that were never meant to have them. Floor-loading verification, egress and accessibility upgrades, and creative structural solutions that preserve character while meeting modern code — PE-stamped in 49 states.",
    edge:
      "Adaptive reuse is the highest-value engineering there is — you're manufacturing leasable space out of someone else's obsolete building. We find the structural and MEP paths that make the pro forma work, from floor capacity to the cheapest compliant egress solution.",
    services: [
      "Change of occupancy: full code analysis and upgrade scoping for the new use",
      "Structural evaluation: floor-load capacity, lateral system, and retrofit design",
      "MEP design: new systems threaded through existing structure with minimal demolition",
      "Egress and ADA: stair, elevator, and accessibility upgrades for the new occupancy",
      "Historic and character: engineering that preserves value-adding original features",
    ],
  },
  "ground-up-construction": {
    name: "Ground-Up Construction",
    title: "Ground-Up Construction Engineering",
    description:
      "Complete engineering for ground-up construction — empty lot to certificate of occupancy. Geotechnical coordination and foundation design, full structural framing, and integrated MEP systems designed around your program. Site civil engineering (grading, drainage, utilities), permit expediting through plan check, and construction administration through closeout — one engineering team accountable for everything below and above grade, PE-stamped in 49 states.",
    edge:
      "Ground-up is a blank check for coordination — or coordination failures. We run one integrated design process across civil, structural, and MEP, so the foundation knows about the plumbing, the structure knows about the ductwork, and nothing gets discovered with a jackhammer.",
    services: [
      "Foundations: geotechnical coordination, spread footings, piers, and mat slabs",
      "Structural: complete framing design for steel, concrete, masonry, and wood",
      "MEP: integrated mechanical, electrical, plumbing, and fire protection design",
      "Site civil: grading, stormwater, utilities, and paving design",
      "Permits and CA: full submittal packages, plan-check responses, and field support",
    ],
  },
  "design-build": {
    name: "Design-Build",
    title: "Design-Build Engineering",
    description:
      "Engineering for design-build delivery — fast-tracked, contractor-led, and single-point accountable. Early bridging documents and performance specs, design-assist MEP coordination with trade partners, and permit packages released in phases to keep construction moving. Structural and MEP design optimized for constructability and trade pricing, with PE stamps in 49 states.",
    edge:
      "Design-build lives or dies on trust between the engineer and the builder. We design for how it actually gets built — trade-friendly details, early release packages, and real-time coordination — because in design-build, the schedule is the contract.",
    services: [
      "Bridging documents: performance specs and SD-level design for design-build procurement",
      "Design-assist: MEP coordination with mechanical, electrical, and plumbing trades",
      "Phased releases: early foundation, steel, and MEP packages for fast-track starts",
      "Constructability: details optimized for field installation and trade pricing",
      "Permits: phased submittals and AHJ coordination on compressed schedules",
    ],
  },
  "fast-track-construction": {
    name: "Fast-Track Construction",
    title: "Fast-Track Construction Engineering",
    description:
      "Engineering for fast-track delivery — overlapping design and construction on aggressive schedules. Early-release structural and foundation packages, phased MEP design that follows procurement, and permit submittals sequenced to keep the critical path moving. Long-lead equipment coordination, design decisions made at construction speed, and PE-stamped packages in 49 states.",
    edge:
      "Fast-track means designing the building while it's being built — which only works if the engineer can make decisions at field speed. We staff fast-track projects for responsiveness: same-day RFI turns, phased releases, and zero engineering-caused delays.",
    services: [
      "Early release: foundation, steel, and site packages ahead of full CDs",
      "Phased MEP: equipment-first design sequenced to procurement lead times",
      "Permit sequencing: submittals timed to construction phases, not drawing completion",
      "Long-lead coordination: early equipment selection and rough-in design",
      "Field responsiveness: rapid RFI, submittal, and change-order engineering",
    ],
  },
  "phased-construction": {
    name: "Phased Construction",
    title: "Phased Construction Engineering",
    description:
      "Engineering for phased construction — multi-building campuses, occupied renovations, and staged developments built over years. Master-plan MEP infrastructure sized for ultimate buildout, phase-by-phase permit packages, and interim conditions engineered for safety and operations between phases. Utility and structural capacity planning that prevents phase-one decisions from blocking phase three — PE-stamped in 49 states.",
    edge:
      "Phased projects fail when phase one paints phase three into a corner. We engineer the end state first — ultimate utility capacity, structural provisions, MEP backbone — then phase the drawings so each stage stands alone and sets up the next.",
    services: [
      "Master planning: ultimate-buildout MEP and structural capacity engineering",
      "Phase packages: standalone permit sets for each construction phase",
      "Interim conditions: temporary utilities, life safety, and egress between phases",
      "Infrastructure: central plants, electrical distribution, and site utilities sized for full buildout",
      "Coordination: phase-interface detailing and as-built updating across phases",
    ],
  },
  "shell-buildout": {
    name: "Shell Buildout",
    title: "Shell Building Engineering",
    description:
      "Engineering for shell buildings and speculative development — core-and-shell delivery ready for tenant improvements. Base-building structural design, shell MEP (main distribution, central HVAC, base electrical service), and demising provisions for future tenants. Landlord/tenant demarcation engineering, shell permit packages, and TI-ready infrastructure that leases space faster — PE-stamped in 49 states.",
    edge:
      "A shell building is a product, and the product is leasability. We engineer shells with generous power, flexible HVAC zoning, and clean demising points — so tenant improvements are cheap, fast, and never require base-building surgery.",
    services: [
      "Base building structure: framing, foundations, and lateral systems for shell delivery",
      "Shell MEP: main distribution, central plants, and base-building electrical service",
      "Demising: tenant separation, future TI rough-in, and metering provisions",
      "Core elements: lobbies, restrooms, elevators, and common-area systems",
      "Shell permits: base-building plan sets and phased TI permit strategy",
    ],
  },
  "core-and-shell": {
    name: "Core and Shell",
    title: "Core and Shell Engineering",
    description:
      "Engineering for core-and-shell delivery — developer-built base buildings with tenant-finished interiors. Structural design for the full building, core MEP systems (central HVAC, main electrical, base plumbing), and item transportation coordination. Tenant criteria documents, base-building commissioning, and the engineering demarcation that keeps landlord and tenant scopes clean — PE-stamped in 49 states.",
    edge:
      "Core-and-shell disputes almost always trace to blurry demarcation. We engineer crisp landlord/tenant boundaries — documented in the tenant criteria and the drawings — so TI contractors know exactly where their scope starts and change orders stay rare.",
    services: [
      "Structural: complete core-and-shell framing and foundation design",
      "Core MEP: central systems, main distribution, and base-building controls",
      "Tenant criteria: engineering exhibits defining landlord vs. tenant scope",
      "Vertical transportation: elevator and escalator coordination and machine-room design",
      "Commissioning: base-building systems testing and TI interface verification",
    ],
  },
  "interior-fit-out": {
    name: "Interior Fit-Out",
    title: "Interior Fit-Out Engineering",
    description:
      "MEP engineering for interior fit-outs — corporate offices, flagship retail, restaurants, and medical suites built inside existing shells. Demolition and new distribution design, lighting and power for branded interiors, and specialty systems (commercial kitchens, medical gases, data rooms). Base-building coordination, after-hours construction phasing, and permit sets that move at retail speed — PE-stamped in 49 states.",
    edge:
      "Fit-outs are where brand meets building — and the building always has opinions. We verify base-building capacity before design starts, engineer around existing constraints, and deliver permit sets fast enough for grand-opening dates that don't move.",
    services: [
      "Distribution design: HVAC, power, and lighting for new interior layouts",
      "Demolition plans: engineered demo with structural verification and MEP safing",
      "Specialty systems: kitchens, medical gases, data rooms, and feature lighting",
      "Base-building tie-ins: capacity verification and landlord coordination",
      "Fast permits: accelerated plan sets for fixed opening dates",
    ],
  },
  "building-expansion": {
    name: "Building Expansion",
    title: "Building Expansion Engineering",
    description:
      "Engineering for building expansions — growing facilities without disrupting operations. Horizontal and item expansion structural design, MEP capacity analysis and system extensions, and utility service upgrades for increased loads. Occupied-building phasing, temporary utility and life-safety provisions, and code analysis for the expanded facility — with PE stamps in 49 states.",
    edge:
      "Expanding an operating building is surgery on a patient that can't go under anesthesia. We engineer the expansion around live operations — phased cutovers, temporary systems, and construction sequencing that keeps your business running while it grows.",
    services: [
      "Capacity analysis: structural, MEP, and utility evaluation for expansion loads",
      "Structural: new framing tied to existing, foundation design, and lateral integration",
      "MEP extension: system expansions, equipment upsizing, and distribution redesign",
      "Occupied phasing: interim life safety, temporary utilities, and cutover sequencing",
      "Code: egress, accessibility, and energy analysis for the expanded building",
    ],
  },
};

function slugToCity(slug: string): string {
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function slugToState(slug: string): string {
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

export default function ProjectCityPage() {
  const params = useParams();
  const itemSlug = params.project as string;
  const citySlug = params.city as string;
  const stateSlug = params.state as string;

  const item = PROJECTS[itemSlug];
  const city = useMemo(() => slugToCity(citySlug || ''), [citySlug]);

  // Thin programmatic page: noindexed to conserve crawl budget (2026-10-06).
  // Page stays live for users; X-Robots-Tag is also set server-side.
  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex,follow";
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
    };
  }, []);
  const state = useMemo(() => slugToState(stateSlug || ''), [stateSlug]);

  if (!item || !city || !state) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
          <p>The requested item engineering page could not be found.</p>
        </div>
      </div>
    );
  }

  const pageTitle = `${item.title} in ${city}, ${state} | Apex Grid`;
  const metaDescription = `${item.description} ${item.name} engineering services in ${city}, ${state} with 49-state PE licensure and 24-hour quotes.`;

  return (
    <div className="min-h-screen bg-white">
      {/* SEO meta would be handled by react-helmet or similar */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <nav className="text-sm text-gray-500 mb-6">
          <a href="/" className="hover:underline">Home</a> {' > '}
          <a href="/industries" className="hover:underline">Project Types</a> {' > '}
          <span>{item.name}</span> {' > '}
          <span>{city}, {state}</span>
        </nav>

        <h1 className="text-4xl font-bold mb-6">
          {item.title} in {city}, {state}
        </h1>

        <p className="text-lg text-gray-700 mb-8">
          {metaDescription}
        </p>

        <div className="prose max-w-none mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            {item.name} Engineering Services in {city}
          </h2>
          <p className="mb-4">
            Apex Grid Engineering delivers {item.name.toLowerCase()} engineering services
            in {city}, {state} for developers, owners, and general contractors building in
            one of the highest-growth sectors in construction. Our 49-state PE licensure
            means one engineering partner for your entire portfolio — no sourcing a new
            firm every time you enter a new market.
          </p>
          <p className="mb-4">
            {item.description}
          </p>
          <p className="mb-4">
            {item.edge}
          </p>

          <h2 className="text-2xl font-semibold mb-4 mt-8">
            Why {item.name} Developers Choose Apex Grid
          </h2>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>49-State Licensure:</strong> One firm, one contract, every market. Scale your {item.name.toLowerCase()} pipeline without re-procuring engineering.</li>
            <li><strong>24-Hour Quotes:</strong> Pricing in 12-24 hours so your pro forma and schedule never wait on engineering.</li>
            <li><strong>Sector Fluency:</strong> We speak your industry's language — from redundancy tiers to cleanroom classes to interconnection queues.</li>
            <li><strong>Permit-Ready Drawings:</strong> Stamped plan sets tuned to {city}'s building department and {state} code amendments.</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4 mt-8">
            {item.name} Engineering in {city}, {state}: What We Deliver
          </h2>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            {item.services.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
            <h3 className="text-xl font-semibold mb-3">Get Your {city} {item.name} Project Engineered</h3>
            <p className="mb-4">
              Send us your project address and basis of design. We'll have a quote back
              in 24 hours and permit-ready drawings on your schedule.
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
            Professional engineering services for {item.name.toLowerCase()} projects
            in {city} and surrounding areas.
          </p>
        </div>
      </main>
    </div>
  );
}
