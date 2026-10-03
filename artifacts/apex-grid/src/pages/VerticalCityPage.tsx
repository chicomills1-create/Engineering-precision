import { useParams } from "wouter";
import { useMemo } from "react";

/**
 * Dynamic vertical × city page: /verticals/:vertical/:city/:state/
 *
 * Serves all Tier 1 industry vertical × city combinations dynamically.
 * Example: /verticals/data-center/austin/texas/
 *
 * 10 verticals × 19,355 cities = 193,550 URLs
 */

interface VerticalInfo {
  name: string;
  title: string;
  description: string;
  edge: string;
  services: string[];
}

const VERTICALS: Record<string, VerticalInfo> = {
  "data-center": {
    name: "Data Center",
    title: "Data Center Engineering",
    description:
      "MEP and structural engineering for data center facilities — hyperscale campuses, colocation halls, and edge deployments. Power distribution design for UPS systems, switchgear lineups, and generator farms with N, N+1, and 2N redundancy. Precision cooling via CRAH/CRAC units, chilled water plants, and direct-to-chip liquid cooling. Clean-agent fire suppression, very-early smoke detection, and structural design for raised-floor loading, all stamped for permits in 49 states.",
    edge:
      "Data center schedules are measured in megawatts and months, not years. Our engineers design concurrently with your procurement — releasing power and cooling packages while the building shell is still in permitting — so construction never waits on drawings.",
    services: [
      "Electrical distribution: utility service, switchgear, UPS, PDUs, and busway for IT loads from 1 MW to 200+ MW",
      "Cooling systems: chilled water plants, CRAH/CRAC layout, containment, and liquid-cooling ready infrastructure",
      "Generator and fuel systems: emergency power, day-tank and bulk fuel storage, paralleling gear",
      "Fire protection: clean-agent suppression, pre-action sprinklers, VESDA detection, and smoke control",
      "Structural: raised-access flooring loads, equipment anchorage, seismic bracing, and roof-mounted equipment",
    ],
  },
  "semiconductor": {
    name: "Semiconductor",
    title: "Semiconductor Facility Engineering",
    description:
      "Specialized MEP engineering for semiconductor manufacturing and fab support facilities. ISO Class 3–8 cleanroom HVAC with precise temperature, humidity, and pressurization cascades. Process utilities including ultrapure water (UPW), bulk and specialty gases, process vacuum, and chemical distribution. Vibration-sensitive structural design for lithography bays, ESD controls, and airborne molecular contamination (AMC) mitigation — with PE stamping across all 49 states.",
    edge:
      "Fabs live or die on yield, and yield lives or dies on environmental control. We engineer the invisible — particle counts, vibration criteria, chemical purity — that keeps tools running and wafers moving.",
    services: [
      "Cleanroom HVAC: recirculation air handlers, FFU coverage, pressurization cascades, and makeup air systems",
      "Process utilities: UPW, process cooling water, bulk gases, specialty gas, chemicals, and process vacuum",
      "Vibration and structural: VC-curve criteria, isolated slabs, tool pedestals, and cleanroom subfab structure",
      "Electrical: tool power distribution, emergency power for critical tools, and power quality",
      "Life safety: toxic gas monitoring, exhaust abatement, HPM storage, and hazardous materials compliance",
    ],
  },
  "life-sciences": {
    name: "Life Sciences",
    title: "Life Sciences Facility Engineering",
    description:
      "Engineering for life sciences and research laboratory facilities — wet labs, dry labs, vivariums, and R&D suites. Lab HVAC with precise temperature, humidity, and pressure control, 100% outside-air systems, and fume hood exhaust with heat recovery. Vivarium barrier design, BSL-2 and BSL-3 containment, medical and lab gas distribution, and flexible lab planning that adapts as research programs evolve. 49-state PE licensure for multi-campus portfolios.",
    edge:
      "Research programs change faster than buildings do. We design lab infrastructure with spare capacity and flexible zoning, so a chemistry lab can become a biology suite without tearing the building apart.",
    services: [
      "Lab HVAC: constant and variable-volume systems, pressurization control, and energy-efficient heat recovery",
      "Fume hoods and exhaust: ducted hoods, snorkels, canopy exhaust, and effluent treatment",
      "Lab gases: compressed air, vacuum, natural gas, DI water, and specialty lab gas distribution",
      "Vivarium and containment: barrier facilities, cage wash, BSL-2/BSL-3 suites, and autoclave support",
      "Electrical and plumbing: bench power, emergency circuits, acid waste, and lab-grade water systems",
    ],
  },
  "biotech": {
    name: "Biotech",
    title: "Biotech Facility Engineering",
    description:
      "Engineering for biotechnology manufacturing and process development — cGMP production suites, pilot plants, and fill-finish operations. Bioprocess utilities including water-for-injection (WFI), clean steam, process gases, and CIP systems. Cold-chain warehousing, fermentation and cell-culture support, single-use and stainless process layouts, and classified cleanroom environments designed around your process flow. Stamped engineering in all 49 states.",
    edge:
      "Biotech timelines are driven by clinical milestones and investor capital, not construction convenience. We fast-track engineering packages — releasing long-lead utility and cleanroom scopes first — to keep your program on the critical path.",
    services: [
      "cGMP cleanrooms: ISO 5–8 suites, gowning, airlocks, and pressure cascades for aseptic processing",
      "Bioprocess utilities: WFI, clean steam, process chilled water, compressed process air, and CIP",
      "Cold chain: 2–8°C and -20°C/-80°C storage, walk-in chambers, and temperature mapping support",
      "Process support: fermentation utilities, cell-culture HVAC, and single-use suite infrastructure",
      "Validation-ready design: documentation packages, commissioning support, and turnover to CQV teams",
    ],
  },
  "pharmaceutical": {
    name: "Pharmaceutical",
    title: "Pharmaceutical Facility Engineering",
    description:
      "Engineering for pharmaceutical manufacturing, packaging, and distribution — designed around FDA expectations and cGMP compliance. Classified cleanroom environments for solid-dose, sterile, and potent-compound operations. Containment engineering for HPAPIs, dust collection and explosion protection, validated HVAC with full redundancy, and warehouse design for controlled substances and temperature-sensitive inventory. PE-stamped drawings accepted by building departments in 49 states.",
    edge:
      "Pharma facilities get inspected as hard as they get built. We design with the audit in mind — documented pressure cascades, validated environmental controls, and cleanable, maintainable systems that stand up to FDA scrutiny.",
    services: [
      "Sterile and solid-dose suites: classified cleanrooms, isolators, RABS support, and gowning flows",
      "Containment: potent-compound handling, downflow booths, dust extraction, and ATEX-rated areas",
      "Validated HVAC: redundant air handlers, continuous monitoring points, and alarm integration",
      "Utilities: WFI, clean steam, process gases, and validated compressed air systems",
      "Warehousing: temperature-controlled storage, cold chain, and DEA-compliant secure areas",
    ],
  },
  "aerospace": {
    name: "Aerospace",
    title: "Aerospace Facility Engineering",
    description:
      "Engineering for aerospace manufacturing, assembly, and test facilities. High-bay structural design for crane loads and large airframe components, clean assembly environments, and propulsion test cells. Hangar MEP including specialized ventilation, fuel systems, and fire protection for aircraft storage. Secure engineering areas, precision environmental control for composites curing, and IT infrastructure for engineering teams — stamped in 49 states.",
    edge:
      "Aerospace programs pivot between prototypes and production runs constantly. We engineer high-bay facilities with flexible crane coverage, reconfigurable utilities, and floor capacity that handles whatever the next airframe demands.",
    services: [
      "High-bay structures: crane girders, long-span framing, and heavy floor loading for airframe work",
      "Clean assembly: controlled environments for avionics, composites layup, and precision assembly",
      "Test cells: structural and MEP design for engine and component test facilities",
      "Hangar systems: ventilation, fueling, fire suppression, and aircraft-grade electrical",
      "Secure areas: access-controlled engineering zones, shielded rooms, and redundant power",
    ],
  },
  "defense": {
    name: "Defense",
    title: "Defense Facility Engineering",
    description:
      "Engineering for defense contractors and secure government-adjacent facilities. SCIF-adjacent engineering support, TEMPEST-aware design coordination, and secure power and communications infrastructure. Blast-resistant structural design, progressive collapse considerations, and DoD Unified Facilities Criteria (UFC) compliance. Controlled-access MEP zoning, electromagnetic shielding coordination, and redundant systems for mission-critical operations — with 49-state PE stamping.",
    edge:
      "Defense work demands both engineering rigor and operational discretion. Our team designs to UFC and ICD standards while keeping schedules tight — secure facilities delivered without the bureaucratic drag.",
    services: [
      "Secure facilities: SCIF support spaces, access control integration, and secure MEP zoning",
      "Blast and progressive collapse: UFC-compliant structural design for antiterrorism standards",
      "Resilient power: redundant utility feeds, generators, UPS, and microgrid-ready infrastructure",
      "Shielding coordination: EM shielding, grounding, and TEMPEST-aware electrical design",
      "Life safety: mass notification, secure egress, and fire protection for classified areas",
    ],
  },
  "battery-storage": {
    name: "Battery Storage",
    title: "Battery Energy Storage Engineering",
    description:
      "Engineering for battery energy storage systems (BESS) — utility-scale installations, commercial behind-the-meter projects, and hybrid solar-plus-storage sites. NFPA 855 fire protection design, thermal runaway mitigation, explosion control, and hazardous materials setbacks. Structural foundations for containerized and building-integrated systems, medium-voltage interconnection, inverter and transformer pads, and thermal management — stamped for AHJs in 49 states.",
    edge:
      "BESS permitting is where projects stall — fire marshals want NFPA 855 proof and utilities want interconnection studies yesterday. We engineer the documentation package that gets both signed off the first time.",
    services: [
      "Fire protection: NFPA 855 compliance, suppression, explosion venting, and thermal runaway spacing",
      "Electrical interconnection: medium-voltage design, inverters, transformers, and utility coordination",
      "Structural and civil: equipment foundations, container anchorage, grading, and stormwater",
      "Thermal management: HVAC for battery enclosures, ventilation, and temperature monitoring",
      "Permitting: AHJ submittals, fire marshal review packages, and utility interconnection support",
    ],
  },
  "microgrid": {
    name: "Microgrid",
    title: "Microgrid Engineering",
    description:
      "Design engineering for microgrid systems — solar-plus-storage, CHP, and islandable resilient power for campuses, hospitals, and critical facilities. Generation sizing and dispatch strategy, microgrid controllers and switchgear, critical-load panel design, and utility interconnection agreements. Seamless islanding and resynchronization, black-start capability, and integration with existing building systems — engineered and stamped in 49 states.",
    edge:
      "A microgrid is only as good as its worst outage. We engineer for the day the grid fails — sizing, controls, and fuel autonomy that keep critical loads running through multi-day events, not just flickers.",
    services: [
      "System design: generation mix, storage sizing, load analysis, and dispatch strategy",
      "Controls and switchgear: microgrid controllers, automatic transfer, and islanding schemes",
      "Interconnection: utility applications, protection studies, and net-metering coordination",
      "Critical loads: panel design, load shedding sequences, and life-safety integration",
      "Resilience planning: outage modeling, fuel autonomy, and black-start design",
    ],
  },
  "ev-charging": {
    name: "EV Charging",
    title: "EV Charging Station Engineering",
    description:
      "Engineering for EV charging infrastructure — DC fast-charging hubs, fleet depots, workplace charging, and NEVI corridor sites. Electrical service upgrades, load calculations, and panel schedules for 150–350 kW dispensers. Site civil design including ADA-accessible charging stalls, lighting, drainage, and striping. Utility coordination, transformer sizing, and rapid multi-site permitting — with PE stamps accepted in all 49 states.",
    edge:
      "Charging networks win on speed to market. Our prototype site plans adapt to local codes in days, and our utility coordination playbook keeps transformer lead times from killing your rollout schedule.",
    services: [
      "Electrical: service upgrades, load calculations, switchgear, and dispenser circuiting",
      "Utility coordination: new service applications, transformer sizing, and meter requirements",
      "Site civil: grading, ADA stalls, lighting photometrics, drainage, and striping plans",
      "Fleet depots: high-count charger layouts, managed charging, and depot power infrastructure",
      "Permitting: plan sets, electrical calcs, and AHJ submittals tuned for fast approval",
    ],
  },
};

function slugToCity(slug: string): string {
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function slugToState(slug: string): string {
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

export default function VerticalCityPage() {
  const params = useParams();
  const verticalSlug = params.vertical as string;
  const citySlug = params.city as string;
  const stateSlug = params.state as string;

  const vertical = VERTICALS[verticalSlug];
  const city = useMemo(() => slugToCity(citySlug || ''), [citySlug]);
  const state = useMemo(() => slugToState(stateSlug || ''), [stateSlug]);

  if (!vertical || !city || !state) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
          <p>The requested vertical engineering page could not be found.</p>
        </div>
      </div>
    );
  }

  const pageTitle = `${vertical.title} in ${city}, ${state} | Apex Grid`;
  const metaDescription = `${vertical.description} ${vertical.name} engineering services in ${city}, ${state} with 49-state PE licensure and 24-hour quotes.`;

  return (
    <div className="min-h-screen bg-white">
      {/* SEO meta would be handled by react-helmet or similar */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <nav className="text-sm text-gray-500 mb-6">
          <a href="/" className="hover:underline">Home</a> {' > '}
          <a href="/industries" className="hover:underline">Industries</a> {' > '}
          <span>{vertical.name}</span> {' > '}
          <span>{city}, {state}</span>
        </nav>

        <h1 className="text-4xl font-bold mb-6">
          {vertical.title} in {city}, {state}
        </h1>

        <p className="text-lg text-gray-700 mb-8">
          {metaDescription}
        </p>

        <div className="prose max-w-none mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            {vertical.name} Engineering Services in {city}
          </h2>
          <p className="mb-4">
            Apex Grid Engineering delivers {vertical.name.toLowerCase()} engineering services
            in {city}, {state} for developers, owners, and general contractors building in
            one of the highest-growth sectors in construction. Our 49-state PE licensure
            means one engineering partner for your entire portfolio — no sourcing a new
            firm every time you enter a new market.
          </p>
          <p className="mb-4">
            {vertical.description}
          </p>
          <p className="mb-4">
            {vertical.edge}
          </p>

          <h2 className="text-2xl font-semibold mb-4 mt-8">
            Why {vertical.name} Developers Choose Apex Grid
          </h2>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>49-State Licensure:</strong> One firm, one contract, every market. Scale your {vertical.name.toLowerCase()} pipeline without re-procuring engineering.</li>
            <li><strong>24-Hour Quotes:</strong> Pricing in 12-24 hours so your pro forma and schedule never wait on engineering.</li>
            <li><strong>Sector Fluency:</strong> We speak your industry's language — from redundancy tiers to cleanroom classes to interconnection queues.</li>
            <li><strong>Permit-Ready Drawings:</strong> Stamped plan sets tuned to {city}'s building department and {state} code amendments.</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4 mt-8">
            {vertical.name} Engineering in {city}, {state}: What We Deliver
          </h2>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            {vertical.services.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
            <h3 className="text-xl font-semibold mb-3">Get Your {city} {vertical.name} Project Engineered</h3>
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
            Professional engineering services for {vertical.name.toLowerCase()} projects
            in {city} and surrounding areas.
          </p>
        </div>
      </main>
    </div>
  );
}
