import { useParams } from "wouter";
import { useMemo } from "react";

/**
 * Dynamic local service × city page: /services-local/:service/:city/:state/
 *
 * Serves all engineering discipline × city combinations dynamically.
 * Example: /services-local/hvac-engineering/austin/texas/
 *
 * 15 services × 19,355 cities = 290,325 URLs
 */

interface LocalServiceInfo {
  name: string;
  title: string;
  description: string;
  edge: string;
  services: string[];
}

const LOCAL_SERVICES: Record<string, LocalServiceInfo> = {
  "electrical-engineering": {
    name: "Electrical Engineering",
    title: "Electrical Engineering Services",
    description:
      "Licensed electrical engineering for commercial, industrial, and institutional buildings — power distribution, lighting, and life-safety systems designed to NEC and local amendments. Service sizing and utility coordination, panel schedules and one-lines, emergency and standby power, and arc-flash and short-circuit studies. From tenant improvements to ground-up facilities, our PEs deliver permit-ready electrical drawings in 49 states.",
    edge:
      "Electrical is the system everything else depends on — undersize it and the whole building suffers. We size services for real loads plus growth, coordinate with utilities early, and engineer power quality that keeps sensitive equipment running.",
    services: [
      "Power distribution: service sizing, switchgear, panelboards, and branch circuiting",
      "Lighting: interior/exterior design, controls, and energy-code compliance",
      "Emergency power: generators, UPS, automatic transfer, and NEC 700/701 systems",
      "Studies: short-circuit, coordination, and arc-flash analysis",
      "Low voltage: fire alarm, access control, and communications rough-in coordination",
    ],
  },
  "plumbing-engineering": {
    name: "Plumbing Engineering",
    title: "Plumbing Engineering Services",
    description:
      "Licensed plumbing engineering for commercial and institutional buildings — domestic water, sanitary waste, storm drainage, and specialty systems. Water heater and booster pump sizing, grease waste and interceptors for food service, medical gas and lab waste for healthcare, and rainwater and condensate design. Code-compliant, water-efficient systems with PE-stamped drawings in 49 states.",
    edge:
      "Plumbing failures are the most expensive kind — water goes everywhere and shuts buildings down. We engineer proper slopes, venting, and backflow protection from the start, and size water heating for actual peak demand, not catalog optimism.",
    services: [
      "Domestic water: distribution, water heating, booster pumps, and backflow prevention",
      "Sanitary waste: drainage, venting, grease interceptors, and lift stations",
      "Storm drainage: roof drainage, site piping, and retention coordination",
      "Specialty: medical gas, lab waste, compressed air, and process piping",
      "Fixture and efficiency: water-conserving design and code compliance documentation",
    ],
  },
  "hvac-engineering": {
    name: "HVAC Engineering",
    title: "HVAC Engineering Services",
    description:
      "Licensed HVAC engineering for commercial, healthcare, and industrial buildings — heating, cooling, and ventilation designed for comfort, efficiency, and code compliance. Load calculations per ACCA Manual N and ASHRAE, VAV and VRF system design, dedicated outdoor air systems, and controls sequences that actually work. Energy modeling, Title 24 and IECC compliance, and commissioning support — PE-stamped in 49 states.",
    edge:
      "Most HVAC complaints trace to design shortcuts — undersized ventilation, bad zoning, controls nobody commissioned. We engineer the full system including sequences of operation, then verify it in the field, so the building performs like the model says it should.",
    services: [
      "Load calculations: ACCA Manual N and ASHRAE-based heating and cooling loads",
      "System design: VAV, VRF, DOAS, chilled water, and packaged equipment selection",
      "Ventilation: ASHRAE 62.1 compliance, demand-control, and energy recovery",
      "Controls: sequences of operation, BAS integration, and point lists",
      "Energy: modeling, Title 24/IECC documentation, and utility incentive support",
    ],
  },
  "fire-protection-engineering": {
    name: "Fire Protection Engineering",
    title: "Fire Protection Engineering Services",
    description:
      "Licensed fire protection engineering — sprinkler, standpipe, fire alarm, and special-hazard suppression design per NFPA. Hydraulic calculations, ESFR and in-rack design for storage, clean-agent and pre-action systems for sensitive occupancies, and fire alarm with voice evacuation. Fire marshal submittals, AHJ coordination, and acceptance-test support — PE-stamped in 49 states.",
    edge:
      "Fire protection is the system that has to work perfectly exactly once — during the worst day of the building's life. We engineer to NFPA with real hydraulic calculations (not rules of thumb) and coordinate with the fire marshal before submittal, so approval is a formality.",
    services: [
      "Sprinklers: wet, dry, pre-action, and ESFR design with hydraulic calculations",
      "Standpipes and pumps: system design, pump sizing, and water supply analysis",
      "Fire alarm: detection, notification, voice evacuation, and monitoring",
      "Special hazards: clean-agent, kitchen hood, and industrial suppression systems",
      "AHJ coordination: fire marshal submittals, plan review responses, and testing support",
    ],
  },
  "energy-modeling": {
    name: "Energy Modeling",
    title: "Energy Modeling Services",
    description:
      "Whole-building energy modeling for code compliance, LEED, and design optimization — ASHRAE 90.1 Appendix G baseline and proposed models. Title 24 compliance modeling, IECC performance path documentation, and utility incentive modeling. We model early enough to influence design: envelope options, HVAC alternatives, and lighting scenarios with real payback analysis — delivered by licensed engineers in 49 states.",
    edge:
      "Energy models are usually built to check a box after design is done — when it's too late to matter. We model during schematic design, when changing the glazing ratio or the HVAC system still costs nothing, and hand you decisions backed by numbers.",
    services: [
      "Code compliance: ASHRAE 90.1, Title 24, and IECC performance-path modeling",
      "LEED: energy prerequisite and credit modeling with documentation",
      "Design optimization: envelope, HVAC, and lighting scenario analysis",
      "Utility incentives: savings calculations and program submittal support",
      "Calibration: existing-building modeling for retrofit investment decisions",
    ],
  },
  "commissioning-engineering": {
    name: "Commissioning Engineering",
    title: "Building Commissioning Services",
    description:
      "Third-party building commissioning — verifying that HVAC, electrical, plumbing, and envelope systems perform as designed. Commissioning plans and specifications, functional performance testing, controls verification, and issues-log management through warranty. New construction, retro-commissioning of existing buildings, and LEED enhanced commissioning — by licensed engineers in 49 states.",
    edge:
      "Buildings rarely perform like their drawings promise — controls get overridden, sequences get simplified, and nobody notices until the utility bills arrive. Commissioning catches the gap between design intent and installed reality, and we stay engaged until every issue is closed.",
    services: [
      "New construction commissioning: plans, specs, testing, and turnover verification",
      "Retro-commissioning: existing-building investigation and low-cost tune-ups",
      "Functional testing: HVAC, lighting controls, and domestic hot water verification",
      "LEED commissioning: fundamental and enhanced commissioning documentation",
      "Monitoring-based: ongoing performance tracking and fault detection support",
    ],
  },
  "structural-analysis": {
    name: "Structural Analysis",
    title: "Structural Analysis Services",
    description:
      "Licensed structural analysis for new and existing buildings — gravity and lateral system design, capacity evaluation, and forensic-level investigation. Steel, concrete, masonry, and timber analysis per IBC, ASCE 7, AISC, ACI, and NDS. New equipment loads, change-of-use verification, damage assessment, and peer-review-grade calculation packages — PE-stamped in 49 states.",
    edge:
      "Structural analysis is where conservative assumptions cost real money — oversized members, unnecessary retrofits. We analyze what's actually there (and what it's actually carrying) with field-verified data, so you pay for the structure you need, not the one someone guessed at.",
    services: [
      "New design: gravity and lateral analysis for steel, concrete, masonry, and wood",
      "Existing capacity: floor-load verification, equipment additions, and change-of-use",
      "Lateral analysis: wind and seismic evaluation per ASCE 7",
      "Connection design: moment frames, braced frames, and collector detailing",
      "Calculation packages: stamped calcs for permits, plan check, and record",
    ],
  },
  "seismic-retrofit": {
    name: "Seismic Retrofit",
    title: "Seismic Retrofit Engineering",
    description:
      "Licensed seismic retrofit engineering for vulnerable buildings — unreinforced masonry, soft-story wood frame, non-ductile concrete, and tilt-up. ASCE 41 evaluation, FEMA P-807 and P-58 retrofit design, and voluntary and mandatory program compliance (including California's URM and soft-story ordinances). Phased retrofit packages for occupied buildings — PE-stamped in 49 states.",
    edge:
      "Seismic retrofit is risk engineering — you're buying down the probability of collapse and business interruption. We quantify the risk, target the deficiencies that matter most, and phase the work so tenants stay and the building keeps earning while it gets safer.",
    services: [
      "Seismic evaluation: ASCE 41 Tier 1-3 assessments and deficiency identification",
      "URM retrofit: wall anchorage, diaphragm ties, and parapet bracing",
      "Soft-story retrofit: moment frames, cantilever columns, and plywood shear walls",
      "Concrete and tilt-up: collector upgrades, diaphragm strengthening, and anchorage",
      "Program compliance: mandatory retrofit ordinance engineering and documentation",
    ],
  },
  "building-envelope": {
    name: "Building Envelope",
    title: "Building Envelope Engineering",
    description:
      "Building envelope engineering — keeping water out, air controlled, and energy in. Wall assembly design, air barrier continuity, waterproofing and flashing details, and fenestration specification. Forensic investigation of leaks and failures, hygrothermal analysis for condensation risk, and envelope commissioning for new construction — by licensed engineers in 49 states.",
    edge:
      "Envelope failures are the most litigated defect in construction — and almost always trace to details, not materials. We engineer the transitions (window-to-wall, roof-to-wall, below-grade) where buildings actually leak, and verify continuity in the field.",
    services: [
      "Wall assemblies: rain-screen, barrier, and mass-wall design with air barrier continuity",
      "Waterproofing: below-grade, plaza, and flashing details for leak-free performance",
      "Fenestration: window, curtain-wall, and storefront specification and review",
      "Forensics: leak investigation, moisture mapping, and repair design",
      "Hygrothermal analysis: condensation risk modeling and assembly verification",
    ],
  },
  "lighting-design": {
    name: "Lighting Design",
    title: "Lighting Design Services",
    description:
      "Architectural lighting design for commercial, hospitality, healthcare, and exterior environments — layered lighting that serves architecture, brand, and human comfort. Photometric calculations, fixture specification, and lighting controls per ASHRAE 90.1 and Title 24. Circadian and wellness lighting, facade and landscape illumination, and dark-sky compliance — engineered in 49 states.",
    edge:
      "Lighting is the most visible engineering in the building — everyone experiences it, nobody credits the engineer when it's right. We design for how spaces feel at 9pm, not just foot-candle minimums, while hitting energy code without compromise.",
    services: [
      "Interior lighting: layered design, fixture selection, and photometric layouts",
      "Controls: occupancy, daylight harvesting, and scene control per energy code",
      "Exterior and site: parking, facade, landscape, and dark-sky compliant design",
      "Specialty: hospitality, healthcare, and circadian/wellness lighting",
      "Energy: Title 24 and ASHRAE 90.1 lighting power and controls compliance",
    ],
  },
  "power-systems": {
    name: "Power Systems",
    title: "Power Systems Engineering",
    description:
      "Power systems engineering for facilities with critical or heavy electrical demands — medium-voltage distribution, substations, and on-site generation. Load flow, short-circuit, and coordination studies; arc-flash analysis and labeling; power quality investigation and harmonic mitigation. Utility interconnection, paralleling switchgear, and microgrid-ready design — PE-stamped in 49 states.",
    edge:
      "Power systems engineering is insurance against the catastrophic — the fault that cascades, the outage that costs millions. We study the system before it fails, coordinate protection so faults stay local, and engineer redundancy where downtime is unacceptable.",
    services: [
      "Medium voltage: distribution design, substations, and switchgear specification",
      "Studies: load flow, short-circuit, coordination, and arc-flash analysis",
      "Power quality: harmonic analysis, mitigation, and sensitive-load protection",
      "Generation: paralleling gear, standby plants, and microgrid-ready infrastructure",
      "Utility: interconnection applications, metering, and service coordination",
    ],
  },
  "building-controls": {
    name: "Building Controls",
    title: "Building Controls Engineering",
    description:
      "Building automation and controls engineering — sequences of operation, DDC panel design, and BAS integration that make HVAC and lighting actually perform. Open-protocol design (BACnet), point lists and network architecture, controls specifications with enforceable sequences, and commissioning of control systems. New construction and controls retrofits — engineered in 49 states.",
    edge:
      "Controls are where good mechanical design goes to die — value-engineered sequences, overridden setpoints, and systems fighting themselves. We write sequences a contractor can actually implement, specify open protocols to avoid lock-in, and commission until the building behaves.",
    services: [
      "Sequences of operation: detailed, implementable control sequences for all HVAC",
      "BAS design: DDC architecture, point lists, and network topology",
      "Specifications: open-protocol (BACnet) specs that prevent vendor lock-in",
      "Integration: lighting, metering, and third-party system integration",
      "Retro-commissioning: controls tune-ups and sequence rewrites for existing buildings",
    ],
  },
  "water-systems": {
    name: "Water Systems",
    title: "Water Systems Engineering",
    description:
      "Potable water systems engineering — domestic distribution, water heating plants, booster systems, and backflow protection for commercial and institutional buildings. Legionella risk management per ASHRAE Guideline 12, hot-water recirculation design, water-efficiency planning, and well and treatment systems for sites without municipal service — PE-stamped in 49 states.",
    edge:
      "Water systems fail quietly — scalding, stagnation, Legionella — until they fail loudly. We engineer temperature control, recirculation, and backflow protection as health and safety systems, not afterthoughts, and document water management plans that satisfy AHJs and insurers.",
    services: [
      "Domestic distribution: piping design, pressure zones, and booster pump systems",
      "Water heating: plant sizing, recirculation, and temperature control",
      "Backflow: cross-connection control and device specification per code",
      "Legionella: water management plans per ASHRAE Guideline 12",
      "Treatment: filtration, softening, and disinfection for well and municipal supplies",
    ],
  },
  "wastewater-systems": {
    name: "Wastewater Systems",
    title: "Wastewater Systems Engineering",
    description:
      "Wastewater engineering for sites beyond the municipal sewer — septic systems, aerobic treatment units, and decentralized wastewater plants for commercial developments. Percolation and soil analysis coordination, drain-field and mound design, pump stations and force mains, and permitting through health departments and environmental agencies — PE-stamped in 49 states.",
    edge:
      "Wastewater permitting is where rural commercial projects stall — health departments want proof the system works for decades. We engineer conservative, maintainable systems with real soil data behind them, and manage the permit process until the approval is in hand.",
    services: [
      "Onsite systems: septic, aerobic treatment, and drain-field design",
      "Soil and perc: test coordination and system sizing from field data",
      "Pump stations: lift stations, force mains, and grinder pump systems",
      "Commercial: grease waste, high-strength waste, and pretreatment design",
      "Permitting: health department and environmental agency submittals",
    ],
  },
  "stormwater-management": {
    name: "Stormwater Management",
    title: "Stormwater Management Engineering",
    description:
      "Stormwater engineering for development — detention, retention, water quality, and floodplain compliance. Hydrologic and hydraulic modeling, underground detention and infiltration systems, bioretention and green infrastructure, and NPDES/SWPPP compliance for construction. Municipal stormwater permit packages and AHJ coordination — PE-stamped in 49 states.",
    edge:
      "Stormwater is the permit gate for nearly every site plan — and the design that gets value-engineered first. We engineer systems that satisfy the municipality, protect downstream properties, and fit the site budget, with calculations that survive plan-check scrutiny.",
    services: [
      "Detention design: ponds, underground vaults, and infiltration systems",
      "Water quality: bioretention, swales, and treatment train design",
      "Modeling: hydrologic/hydraulic analysis per local criteria",
      "SWPPP: construction stormwater pollution prevention plans and NPDES compliance",
      "Floodplain: CLOMR/LOMR support and flood-resistant site design",
    ],
  },
};

function slugToCity(slug: string): string {
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function slugToState(slug: string): string {
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

export default function ServiceLocalCityPage() {
  const params = useParams();
  const itemSlug = params.service as string;
  const citySlug = params.city as string;
  const stateSlug = params.state as string;

  const item = LOCAL_SERVICES[itemSlug];
  const city = useMemo(() => slugToCity(citySlug || ''), [citySlug]);
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
          <a href="/industries" className="hover:underline">Services</a> {' > '}
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
