import { useParams } from "wouter";
import { useMemo } from "react";

/**
 * Dynamic building type × city page: /buildings/:building/:city/:state/
 *
 * Serves all building type × city combinations dynamically.
 * Example: /buildings/hospital/austin/texas/
 *
 * 10 building types × 19,355 cities = 193,550 URLs
 */

interface BuildingInfo {
  name: string;
  title: string;
  description: string;
  edge: string;
  services: string[];
}

const BUILDINGS: Record<string, BuildingInfo> = {
  "data-center-building": {
    name: "Data Center Building",
    title: "Data Center Building Engineering",
    description:
      "Structural and base-building MEP engineering for data center shells and core-and-shell delivery. Long-span structural framing for column-free white space, roof loading for cooling equipment, and slab design for heavy electrical gear. Base-building power and cooling infrastructure sized for phased tenant fit-out, shell permitting packages, and landlord/tenant demarcation engineering — stamped for 49-state construction.",
    edge:
      "The building is the easy part; the building that accepts any tenant's fit-out is the hard part. We engineer data center shells with oversized structure, spare electrical capacity, and flexible cooling connections so your asset leases to anyone.",
    services: [
      "Structural: long-span framing, roof equipment loads, and slab design for switchgear and UPS",
      "Base-building electrical: service entrance, main-tie-main switchgear, and tenant distribution",
      "Shell HVAC: ventilation, pressurization, and cooling connections for future white-space buildout",
      "Fire protection: shell sprinkler, fire alarm backbone, and smoke control for high-bay spaces",
      "Site and civil: grading, stormwater, generator yards, and fuel storage coordination",
    ],
  },
  "hospital": {
    name: "Hospital",
    title: "Hospital Engineering",
    description:
      "MEP and structural engineering for acute-care hospitals — new towers, bed expansions, and occupied renovations. OSHPD/HCAI-style seismic and plan-review rigor applied in every state, medical gas systems (oxygen, medical air, vacuum, WAGD), emergency power per NEC Articles 700/701/702, and infection-control HVAC with airborne isolation rooms. OR and imaging suite engineering, nurse-call and code-blue infrastructure, all stamped by licensed PEs in 49 states.",
    edge:
      "Hospitals never close, so we engineer like it. Our phased renovation packages keep ORs, EDs, and ICUs fully operational while construction happens overhead — with ICRA barriers and interim life-safety measures built into every drawing set.",
    services: [
      "Medical gas: oxygen, medical air, vacuum, nitrous, and WAGD distribution with zone valves and alarms",
      "Emergency power: generator plants, automatic transfer, and branch circuiting per NEC 700/701",
      "HVAC: OR laminar flow, isolation rooms, pharmacy compounding, and airborne infection control",
      "Structural: seismic design, equipment anchorage, and vibration control for sensitive imaging",
      "Life safety: fire alarm, voice evacuation, smoke control, and defend-in-place egress strategies",
    ],
  },
  "healthcare-facility": {
    name: "Healthcare Facility",
    title: "Healthcare Facility Engineering",
    description:
      "Engineering for outpatient healthcare — medical office buildings, ambulatory surgery centers, imaging centers, and specialty clinics. Procedure-room HVAC, medical gas for surgery suites, lead-lined and RF-shielded imaging rooms, and exam-room MEP designed for patient throughput. ADA and FGI Guidelines compliance, dental and veterinary variants, and fast-turn tenant improvements — PE-stamped in all 49 states.",
    edge:
      "Outpatient margins depend on throughput and uptime. We design clinic MEP for fast room turnover, quiet operation, and minimal maintenance disruption — the infrastructure behind a schedule that actually runs on time.",
    services: [
      "Surgery and procedure suites: HVAC, medical gas, and electrical for ASCs and procedure rooms",
      "Imaging: MRI RF shielding coordination, CT/X-ray lead lining, and chilled water for equipment",
      "Exam and treatment: plumbing, HVAC, and power layouts optimized for patient flow",
      "Dental and specialty: compressed air, vacuum, and water systems for dental operatories",
      "Tenant improvement: fast-track clinic buildouts with minimal disruption to operating practices",
    ],
  },
  "university-building": {
    name: "University Building",
    title: "University Building Engineering",
    description:
      "Engineering for higher-education facilities — classroom buildings, teaching labs, residence halls, and student life centers. Lecture-hall acoustics and AV-integrated MEP, residence-hall plumbing and fire protection, research-lab ventilation, and central-plant connections. Phased construction around academic calendars, ADA and Title IX facility compliance, and capital-project engineering that survives value-engineering — stamped in 49 states.",
    edge:
      "Universities build on academic calendars, not construction calendars. We sequence design and permitting around semester breaks and summer windows, so buildings open when students arrive — not a semester late.",
    services: [
      "Classroom and lecture: HVAC for high occupant density, acoustics, and AV power/data integration",
      "Residence halls: dwelling-unit plumbing, fire protection, laundry, and common-area MEP",
      "Teaching labs: fume hoods, lab gases, and flexible bench utilities for STEM programs",
      "Central utilities: chilled water, steam, and electrical connections to campus plants",
      "Phased delivery: occupied-renovation sequencing, swing space, and summer-window construction",
    ],
  },
  "industrial-facility": {
    name: "Industrial Facility",
    title: "Industrial Facility Engineering",
    description:
      "Engineering for heavy industrial facilities — process plants, fabrication shops, and heavy manufacturing. Crane-served high-bay structures, heavy floor slabs for process equipment, and dust collection and process ventilation. Hazardous-materials storage and handling, explosion-protected electrical areas, compressed air and process utilities, and rail/truck dock infrastructure — stamped for industrial AHJs in 49 states.",
    edge:
      "Industrial buildings take abuse that would destroy a commercial structure. We design for the real loads — impact, vibration, chemical exposure, and 24/7 thermal cycling — so the facility outlasts the process it houses.",
    services: [
      "Heavy structures: crane girders, braced frames, equipment mezzanines, and machinery foundations",
      "Process utilities: compressed air, process water, steam, natural gas, and dust collection",
      "Hazardous areas: classified electrical, ventilation, spill containment, and fire protection",
      "High-bay MEP: heating, ventilation, high-bay lighting, and make-up air for process exhaust",
      "Site: truck courts, rail spurs, heavy-duty paving, and industrial stormwater",
    ],
  },
  "manufacturing-facility": {
    name: "Manufacturing Facility",
    title: "Manufacturing Facility Engineering",
    description:
      "Engineering for light and mid-size manufacturing — production lines, assembly plants, food processing, and packaging operations. Production-floor MEP with process power, compressed air loops, and process cooling. Food-grade washdown areas, USDA/FDA-adjacent design, clean packaging rooms, and office/warehouse integration. Flexible utility distribution for line reconfiguration — PE-stamped in all 49 states.",
    edge:
      "Production lines change; the building shouldn't have to. We distribute power, air, and process utilities on modular grids with spare capacity, so retooling a line is a weekend project, not a capital project.",
    services: [
      "Production MEP: process power, compressed air, process cooling, and exhaust for lines",
      "Food processing: washdown-rated electrical, floor drains, and sanitary design details",
      "Clean packaging: controlled environments, dust control, and product-protection HVAC",
      "Office and support: break rooms, QA labs, and shipping/receiving integrated with production",
      "Reconfigurable utilities: overhead busway, quick-connect air drops, and spare panel capacity",
    ],
  },
  "warehouse": {
    name: "Warehouse",
    title: "Warehouse and Distribution Engineering",
    description:
      "Engineering for warehouses and distribution centers — from last-mile infill to million-square-foot logistics hubs. ESFR sprinkler design, high-bay LED lighting with controls, and dock-door MEP including levelers and seals. Racking structural coordination, superflat floor slabs, cross-dock material handling power, and office-to-warehouse ratios tuned for labor — stamped in 49 states.",
    edge:
      "Distribution buildings are machines for moving boxes, and the engineering has to keep up with the automation. We coordinate structure, sprinklers, and power around your racking and conveyor layouts from day one — not as an afterthought.",
    services: [
      "Fire protection: ESFR sprinklers, fire pump design, and rack-storage commodity classification",
      "High-bay systems: LED lighting with daylight and occupancy controls, and destratification fans",
      "Dock infrastructure: door equipment power, dock seals, levelers, and trailer restraint circuits",
      "Structural: racking coordination, slab design for rack loads, and tilt-up panel engineering",
      "Office and amenity: break rooms, restrooms, and office HVAC integrated with the warehouse",
    ],
  },
  "multifamily-building": {
    name: "Multifamily Building",
    title: "Multifamily Building Engineering",
    description:
      "Engineering for multifamily residential — condominiums, townhomes, and mixed-use podium developments. Dwelling-unit MEP with individual metering, acoustic separation between units, and fire-rated assemblies. Podium structural design, parking-garage ventilation, amenity-space engineering, and envelope coordination for durability. For-sale product expertise including HOA turnover documentation — stamped in 49 states.",
    edge:
      "For-sale multifamily gets scrutinized by HOAs, attorneys, and warranty inspectors for years after turnover. We engineer with defensible details — proper waterproofing, acoustic assemblies, and documented systems — that hold up long after the last unit sells.",
    services: [
      "Dwelling units: plumbing, HVAC, electrical, and individual metering for condos and townhomes",
      "Podium and parking: post-tensioned podiums, garage ventilation, and waterproofing details",
      "Acoustics and fire: STC-rated assemblies, fire separation, and sprinkler design",
      "Amenities: clubhouses, pools, fitness, and outdoor MEP for resident spaces",
      "Mixed-use: retail base building with residential above, including separate metering and egress",
    ],
  },
  "apartment-building": {
    name: "Apartment Building",
    title: "Apartment Building Engineering",
    description:
      "Engineering for rental apartment communities — garden-style, mid-rise, and wrap developments. Unit MEP standardized for repeatability, central vs. individual HVAC strategies, and domestic hot water systems sized for morning peaks. Leasing-office and amenity engineering, site lighting and security power, and value-engineered systems that protect NOI — PE-stamped across 49 states.",
    edge:
      "Rental developers live on cost per unit and speed to lease-up. We standardize unit MEP into repeatable packages that cut design time, simplify bidding, and keep the per-door budget exactly where your pro forma needs it.",
    services: [
      "Unit systems: standardized HVAC, plumbing, and electrical packages for repeatable construction",
      "Hot water: central plant vs. individual heaters, recirculation, and peak-demand sizing",
      "Garden and mid-rise: breezeway, wrap, and podium configurations with efficient MEP routing",
      "Amenities and leasing: clubhouse, pool equipment, fitness, and model-unit engineering",
      "Site: lighting photometrics, security power, irrigation, and EV-ready parking",
    ],
  },
  "hotel-building": {
    name: "Hotel Building",
    title: "Hotel Building Engineering",
    description:
      "Engineering for hotels and hospitality — select-service, full-service, and resorts. Guestroom MEP with VRF or PTAC systems, stacked plumbing risers, and acoustic separation. Fire alarm with voice evacuation, commercial kitchen and laundry MEP, pool and spa systems, and brand-standard compliance for major flags. Fast-track delivery for PIP renovations and new builds — stamped in 49 states.",
    edge:
      "Hotel brands reject drawings that miss their standards, and every rejection costs weeks. We design to Marriott, Hilton, Hyatt, and IHG brand requirements from the first submittal — so approvals come back clean.",
    services: [
      "Guestrooms: VRF/PTAC HVAC, stacked risers, low-flow plumbing, and acoustic assemblies",
      "Life safety: fire alarm, voice evacuation, sprinklers, and smoke control for high-rise",
      "Food and beverage: commercial kitchen MEP, grease waste, and bar/restaurant support",
      "Pool and spa: dehumidification, pool equipment, and sauna/steam systems",
      "Brand compliance: engineering to major-flag standards, PIP renovations, and prototype adaptation",
    ],
  },
};

function slugToCity(slug: string): string {
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function slugToState(slug: string): string {
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

export default function BuildingCityPage() {
  const params = useParams();
  const buildingSlug = params.building as string;
  const citySlug = params.city as string;
  const stateSlug = params.state as string;

  const building = BUILDINGS[buildingSlug];
  const city = useMemo(() => slugToCity(citySlug || ''), [citySlug]);
  const state = useMemo(() => slugToState(stateSlug || ''), [stateSlug]);

  if (!building || !city || !state) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
          <p>The requested building engineering page could not be found.</p>
        </div>
      </div>
    );
  }

  const pageTitle = `${building.title} in ${city}, ${state} | Apex Grid`;
  const metaDescription = `${building.description} ${building.name} engineering services in ${city}, ${state} with 49-state PE licensure and 24-hour quotes.`;

  return (
    <div className="min-h-screen bg-white">
      {/* SEO meta would be handled by react-helmet or similar */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <nav className="text-sm text-gray-500 mb-6">
          <a href="/" className="hover:underline">Home</a> {' > '}
          <a href="/services" className="hover:underline">Services</a> {' > '}
          <span>{building.name}</span> {' > '}
          <span>{city}, {state}</span>
        </nav>

        <h1 className="text-4xl font-bold mb-6">
          {building.title} in {city}, {state}
        </h1>

        <p className="text-lg text-gray-700 mb-8">
          {metaDescription}
        </p>

        <div className="prose max-w-none mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            {building.name} Engineering Services in {city}
          </h2>
          <p className="mb-4">
            Apex Grid Engineering delivers {building.name.toLowerCase()} engineering services
            in {city}, {state} for owners, developers, architects, and general contractors.
            From ground-up construction to complex renovations, our 49-state PE licensure
            covers your project wherever your portfolio takes you.
          </p>
          <p className="mb-4">
            {building.description}
          </p>
          <p className="mb-4">
            {building.edge}
          </p>

          <h2 className="text-2xl font-semibold mb-4 mt-8">
            Why Owners Choose Apex Grid for {building.name} Projects
          </h2>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>49-State Licensure:</strong> One engineering partner for your entire {building.name.toLowerCase()} portfolio, in every market.</li>
            <li><strong>24-Hour Quotes:</strong> Engineering pricing in 12-24 hours — keep your acquisition and development timelines moving.</li>
            <li><strong>Building-Type Fluency:</strong> We know the systems, codes, and details that make {building.name.toLowerCase()} projects work — and the traps that sink them.</li>
            <li><strong>Permit-Ready Drawings:</strong> Stamped plan sets coordinated for {city}'s building department and {state} amendments.</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4 mt-8">
            {building.name} Engineering in {city}, {state}: What We Deliver
          </h2>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            {building.services.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
            <h3 className="text-xl font-semibold mb-3">Get Your {city} {building.name} Project Engineered</h3>
            <p className="mb-4">
              Send us your project address and drawings or concept plans. We'll have a
              quote back in 24 hours and permit-ready engineering on your schedule.
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
            Professional engineering services for {building.name.toLowerCase()} projects
            in {city} and surrounding areas.
          </p>
        </div>
      </main>
    </div>
  );
}
