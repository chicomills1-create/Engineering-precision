import { useParams } from "wouter";
import { useMemo, useEffect } from "react";

/**
 * Dynamic vertical × city page: /verticals/:vertical/:city/:state/
 *
 * Serves all Tier 1 industry vertical × city combinations dynamically.
 * Example: /verticals/data-center/austin/texas/
 *
 * 24 verticals × 19,355 cities = 464,520 URLs
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
  "healthcare": {
    name: "Healthcare",
    title: "Healthcare Facility Engineering",
    description:
      "MEP and structural engineering for the full healthcare spectrum — hospitals, outpatient clinics, surgery centers, behavioral health, and medical office buildings. Medical gas distribution (oxygen, medical air, vacuum, WAGD), emergency power per NEC Articles 700/701/702, and infection-control HVAC with isolation rooms and pressure relationships that protect patients. OSHPD/HCAI-grade seismic and plan-review rigor applied in every state, with phased occupied-renovation engineering that keeps facilities running during construction. PE-stamped drawings accepted by AHJs in all 49 states.",
    edge:
      "Healthcare construction happens inside buildings that never close. We engineer ICRA barriers, interim life-safety measures, and phased MEP cutovers into every package — so the ED stays open, the ORs stay sterile, and your schedule survives the real world.",
    services: [
      "Medical gas systems: oxygen, medical air, vacuum, nitrous, and WAGD with zone valves and alarms",
      "Emergency power: generator plants, automatic transfer switches, and critical branch circuiting",
      "HVAC: isolation rooms, OR airflow, pharmacy compounding, and airborne infection control",
      "Structural: seismic design, equipment anchorage, and vibration control for imaging suites",
      "Life safety: fire alarm, voice evacuation, smoke control, and defend-in-place egress design",
    ],
  },
  "education": {
    name: "Education",
    title: "Education Facility Engineering",
    description:
      "Engineering for K-12 schools, universities, and training facilities — new campuses, classroom wings, STEM labs, and occupied summer renovations. Classroom acoustics and daylighting that support learning, high-efficiency HVAC sized for real occupancy schedules, and security vestibules with access control integration. Gymnasium and auditorium structures, commercial kitchens for school nutrition programs, and technology infrastructure for 1:1 device environments — with PE stamps in all 49 states.",
    edge:
      "School construction lives on a 10-week summer clock. We release permit and bid packages on academic-calendar timing, engineer summer-only utility cutovers, and design occupied-building phasing that keeps classes in session and contractors moving.",
    services: [
      "HVAC: high-efficiency systems, demand-control ventilation, and classroom acoustics",
      "Electrical: classroom power, LED lighting, emergency egress, and technology backbone",
      "Plumbing: restroom groups, science lab rough-in, and commercial kitchen support",
      "Structural: gym and auditorium framing, storm shelters, and seismic upgrades",
      "Security and access: vestibule design, access control, camera rough-in, and mass notification",
    ],
  },
  "hospitality": {
    name: "Hospitality",
    title: "Hospitality Engineering",
    description:
      "Engineering for hotels, resorts, and hospitality developments — new builds, flag conversions, and PIP-driven renovations. Guest-room MEP with quiet HVAC and reliable hot water, lobby and amenity spaces with architectural lighting integration, and commercial kitchens engineered for real throughput. Pool and spa systems, laundry facilities, parking structures, and brand-standard compliance for major flags — stamped engineering in 49 states.",
    edge:
      "Hotel renovations happen over occupied floors. We sequence MEP riser replacements floor-by-floor, engineer after-hours cutovers that keep guests sleeping, and deliver PIP packages that satisfy the flag inspector and the general manager alike.",
    services: [
      "Guest-room MEP: quiet fan-coil and VRF systems, plumbing stacks, and reliable domestic hot water",
      "Commercial kitchens: grease exhaust, makeup air, gas distribution, and health-code compliance",
      "Pool and spa: natatorium dehumidification, pool equipment, and aquatic safety systems",
      "Electrical: emergency power, lighting design, EV charging, and brand-standard compliance",
      "Structural: podium and tower framing, amenity decks, and renovation structural assessments",
    ],
  },
  "multifamily": {
    name: "Multifamily",
    title: "Multifamily Residential Engineering",
    description:
      "Engineering for apartment communities, condominiums, and mixed-use residential — garden-style, mid-rise, and high-rise. Unit MEP with individual metering, corridor ventilation and pressurization, and amenity spaces engineered like hospitality. Podium structures, parking garage ventilation, fire protection for Type III and Type V construction, and energy-code compliance that protects your pro forma — PE-stamped in 49 states.",
    edge:
      "Multifamily margins live in the details — one extra plumbing stack per unit times 300 units is real money. We value-engineer MEP distribution for repeatability across unit plans while keeping acoustic and energy performance where residents feel it.",
    services: [
      "Unit MEP: stacked plumbing, individual HVAC, sub-metering, and electrical distribution",
      "Corridor and garage systems: ventilation, pressurization, and CO monitoring",
      "Fire protection: sprinkler design for Type III/V, standpipes, and fire alarm",
      "Structural: podium slabs, wood-frame engineering, and lateral design for wind and seismic",
      "Energy compliance: envelope coordination, lighting, and Title 24 / IECC documentation",
    ],
  },
  "senior-living": {
    name: "Senior Living",
    title: "Senior Living Engineering",
    description:
      "Engineering for independent living, assisted living, and memory care communities. Resident-room MEP designed for comfort and accessibility, nurse-call and wander-management infrastructure, and commercial kitchens serving dining programs. Emergency power for life-safety and resident comfort loads, gentle lighting design for aging eyes, and HVAC zoning that keeps memory-care wings secure and comfortable — with PE stamps in 49 states.",
    edge:
      "Senior living is healthcare-adjacent hospitality — residents notice everything. We engineer quiet systems, glare-free lighting, and fail-safe emergency power, because comfort and reliability are the product your residents are buying.",
    services: [
      "Resident MEP: quiet HVAC, accessible plumbing fixtures, and individual climate control",
      "Life-safety systems: nurse call, wander management, fire alarm, and emergency power",
      "Dining and kitchen: commercial kitchens, servery support, and dining-room HVAC",
      "Lighting: circadian-friendly design, wayfinding, and fall-prevention illumination",
      "Structural: wood-frame and podium engineering, plus renovation assessments for conversions",
    ],
  },
  "student-housing": {
    name: "Student Housing",
    title: "Student Housing Engineering",
    description:
      "Engineering for purpose-built student housing — off-campus apartments, residence halls, and mixed-use student developments. High-density unit MEP with individual metering and robust finishes, amenity spaces (fitness, study, social) engineered for heavy use, and parking structures with EV readiness. Fast-track delivery for August move-in deadlines, durable systems that survive student wear, and energy performance that keeps operating costs down — stamped in 49 states.",
    edge:
      "Student housing has exactly one non-negotiable: August. We engineer to the academic calendar — releasing packages for summer construction sprints, designing systems that commission in weeks, and building durability in so turnover season doesn't eat your maintenance budget.",
    services: [
      "Unit MEP: high-density plumbing, individual HVAC, metering, and robust fixture selection",
      "Amenity engineering: fitness ventilation, study lounges, pools, and social spaces",
      "Electrical: high-capacity distribution, lighting, access control, and Wi-Fi backbone",
      "Fire protection: sprinkler and alarm design for dense residential occupancy",
      "Structural: podium and mid-rise framing, amenity decks, and parking structures",
    ],
  },
  "industrial": {
    name: "Industrial",
    title: "Industrial Facility Engineering",
    description:
      "MEP and structural engineering for industrial buildings — warehouses, flex space, light manufacturing, and distribution. Clear-height structural design, dock and grade-door coordination, ESFR fire protection, and power distribution sized for real tenant loads. Tilt-up and PEMB structures, truck-court civil design, and speculative shells engineered for fast tenant improvements — PE-stamped in 49 states.",
    edge:
      "Industrial buildings lease on speed and flexibility. We engineer speculative shells with oversized power, generous clear heights, and demising-ready MEP — so your building signs tenants while competitors are still in plan check.",
    services: [
      "Structural: tilt-up panels, PEMB frames, long-span joists, and heavy floor loading",
      "Fire protection: ESFR sprinklers, fire pumps, and rack-storage protection",
      "Electrical: service sizing for tenant loads, dock power, and lighting to IES levels",
      "Site civil: truck courts, trailer parking, drainage, and dock-equipment coordination",
      "HVAC: warehouse ventilation, office conditioning, and process exhaust rough-in",
    ],
  },
  "logistics": {
    name: "Logistics",
    title: "Logistics Facility Engineering",
    description:
      "Engineering for logistics and supply-chain facilities — regional distribution hubs, cross-dock terminals, and last-mile depots. High-bay structures with leveler and restraint coordination, ESFR sprinkler systems for high-piled storage, and yard design for tractor-trailer circulation. Conveyor and sortation power, fleet EV charging infrastructure, and automation-ready electrical distribution — stamped for 49-state deployment.",
    edge:
      "Logistics buildings are machines for moving freight. We engineer the full machine — dock equipment, yard flow, automation power, and charging — so your throughput numbers work on day one, not after a retrofit.",
    services: [
      "Dock systems: levelers, restraints, seals, and dock-door power and controls",
      "Fire protection: ESFR systems, in-rack sprinklers, and high-piled storage compliance",
      "Electrical: sortation power, conveyor distribution, and fleet charging infrastructure",
      "Structural: high-bay framing, mezzanines, and rack-anchorage engineering",
      "Site: truck courts, trailer staging, fuel islands, and stormwater management",
    ],
  },
  "distribution-center": {
    name: "Distribution Center",
    title: "Distribution Center Engineering",
    description:
      "Engineering for large-format distribution centers — 500,000+ SF fulfillment and bulk-distribution facilities. 40-foot clear-height structures, robotic and AS/RS-ready floor flatness, and power distribution for automation at scale. ESFR fire protection with smoke and heat venting, massive truck courts with 190-foot depths, and employee amenity areas — with PE stamps accepted by AHJs in all 49 states.",
    edge:
      "Modern distribution centers are half warehouse, half data center — automation draws serious power and generates serious heat. We engineer the electrical backbone and thermal management that let robots and people work the same floor.",
    services: [
      "Structural: 40-ft clear heights, super-flat floors, and racking-anchorage design",
      "Automation power: AS/RS, robotics, and conveyor electrical distribution",
      "Fire protection: ESFR, smoke/heat vents, and fire pump systems for high-piled storage",
      "HVAC: destratification, office conditioning, and battery-charging ventilation",
      "Site civil: deep truck courts, rail spurs, trailer parking, and drainage",
    ],
  },
  "manufacturing": {
    name: "Manufacturing",
    title: "Manufacturing Facility Engineering",
    description:
      "Engineering for manufacturing plants — discrete assembly, process manufacturing, and advanced production facilities. Heavy structural design for cranes, presses, and process equipment; process utilities including compressed air, process water, and specialty gases. Production-floor HVAC with makeup air and exhaust balance, dust collection and fume extraction, and electrical distribution for production lines — stamped in 49 states.",
    edge:
      "Manufacturing engineering is production engineering — every design decision lands on throughput. We coordinate utilities to your process flow, engineer crane and equipment loads into the structure from day one, and phase construction so lines keep running.",
    services: [
      "Process utilities: compressed air, process water, gases, vacuum, and chemical distribution",
      "Structural: crane girders, equipment foundations, mezzanines, and vibration isolation",
      "HVAC: makeup air, process exhaust, dust collection, and production-floor ventilation",
      "Electrical: production-line power, MCCs, emergency power, and power quality",
      "Life safety: hazardous materials compliance, fire protection, and emergency egress",
    ],
  },
  "cold-storage": {
    name: "Cold Storage",
    title: "Cold Storage Engineering",
    description:
      "Engineering for refrigerated warehouses and cold-chain facilities — freezer, cooler, and multi-temp distribution. Ammonia and CO2 refrigeration systems, insulated metal panel envelopes with vapor barriers, and underfloor heating to prevent frost heave. Blast freezing, tempering rooms, dock refrigeration, and backup power that protects inventory through outages — PE-stamped in 49 states.",
    edge:
      "Cold storage fails at the envelope and the power feed — one warm dock door or one dead compressor and product is lost. We engineer redundant refrigeration, sealed thermal envelopes, and emergency power sized for the full cooling load.",
    services: [
      "Refrigeration: ammonia, CO2, and synthetic systems with redundancy and controls",
      "Envelope: insulated panels, vapor barriers, and thermal-break detailing",
      "Structural: frost-heave protection, underfloor heat, and rack-loading design",
      "Electrical: emergency power for full refrigeration load and dock equipment",
      "Fire protection: dry and pre-action systems rated for freezer environments",
    ],
  },
  "food-processing": {
    name: "Food Processing",
    title: "Food Processing Facility Engineering",
    description:
      "Engineering for food and beverage manufacturing — USDA/FDA-inspected plants, commercial bakeries, beverage bottling, and protein processing. Sanitary design with washdown-rated MEP, food-grade process utilities (steam, chilled water, compressed air), and floor drainage engineered for sanitation. Refrigeration, ammonia safety compliance (PSM/RMP), and production-floor HVAC that controls condensation and airborne contamination — stamped in 49 states.",
    edge:
      "Food plants get audited by inspectors who can shut you down. We design to USDA and FDA expectations from the first sketch — sloped floors to drains, sealed penetrations, washdown-rated everything — so your plant passes inspection and stays in production.",
    services: [
      "Sanitary MEP: washdown-rated electrical, sloped drainage, and sealed penetrations",
      "Process utilities: culinary steam, chilled water, food-grade air, and CIP systems",
      "Refrigeration: ammonia/CO2 systems with PSM/RMP compliance and safety controls",
      "HVAC: condensation control, positive-pressure packaging rooms, and odor control",
      "Structural: equipment platforms, mezzanines, and vibration isolation for processing lines",
    ],
  },
  "cannabis": {
    name: "Cannabis",
    title: "Cannabis Facility Engineering",
    description:
      "Engineering for licensed cannabis cultivation, extraction, and processing facilities. Cultivation HVAC with precise VPD control, dehumidification, and odor mitigation; extraction rooms with C1D1/C1D2 hazardous-location electrical and ventilation. CO2 enrichment, irrigation and fertigation utilities, security infrastructure per state regulations, and energy systems designed around cultivation's heavy electrical loads — stamped in 49 states where licensed.",
    edge:
      "Cannabis facilities are equal parts greenhouse, laboratory, and fortress — and regulators inspect all three. We engineer the environmental precision your crop needs, the hazardous-location safety your extraction demands, and the security infrastructure your license requires.",
    services: [
      "Cultivation HVAC: dehumidification, VPD control, and multi-zone environmental systems",
      "Extraction safety: C1D1/C1D2 electrical, ventilation, and gas detection",
      "Odor control: carbon filtration, negative-pressure design, and exhaust treatment",
      "Electrical: high-capacity service for lighting loads, backup power, and metering",
      "Security and compliance: camera rough-in, access control, and state-regulation layouts",
    ],
  },
  "solar": {
    name: "Solar",
    title: "Solar Project Engineering",
    description:
      "Engineering for solar developments — utility-scale farms, commercial rooftop arrays, and carport canopies. Structural analysis of roof and ground-mount capacity, ballasted and attached racking design, and electrical engineering for inverters, combiners, and medium-voltage interconnection. Geotechnical coordination for driven piles, drainage and access-road civil design, and AHJ permit packages — with PE stamps in 49 states.",
    edge:
      "Solar projects die in interconnection queues and structural surprises. We front-load the engineering that matters — roof capacity verification, utility coordination, and permit-ready plan sets — so your project moves from PPA to permission to build without rework.",
    services: [
      "Structural: roof load analysis, racking design, and foundation engineering for ground-mount",
      "Electrical: string design, inverter and combiner layouts, and MV interconnection",
      "Utility coordination: interconnection applications, studies, and meter requirements",
      "Civil: grading, drainage, access roads, and erosion control for solar farms",
      "Permitting: structural calcs, electrical plans, and AHJ submittal packages",
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
