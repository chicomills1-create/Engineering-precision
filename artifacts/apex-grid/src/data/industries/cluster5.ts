import type { Industry } from "./types";

export const CLUSTER5_INDUSTRIES: Industry[] = [
  {
    slug: "multifamily-residential-engineering",
    name: "Multifamily Residential",
    cluster: 5,
    title: "Multifamily Residential Engineering | High-Density Structures",
    meta: "Structural framing and energy-efficient MEP design for multifamily projects. Cost-optimized solutions for apartments, condos, and student housing.",
    h1: "Multifamily Housing, Apartment & Condo Development Engineering",
    h2: "Value-Engineered Structural Framing & Cost-Effective MEP Systems",
    cardBlurb:
      "Integrated structural and MEP engineering for apartments, condos, and student housing—value-engineered to protect the pro forma from schematic design through certificate of occupancy.",
    intro: [
      "Multifamily development lives and dies on cost per unit, and every framing decision compounds across hundreds of dwelling units. We approach apartment, condominium, and student-housing projects as repeatable systems: gravity framing tuned to the unit module, lateral systems sized for the seismic design category and wind exposure, and MEP distribution that respects the plumbing wall, demising wall, and corridor. The goal is a coordinated document set a contractor builds without RFIs eroding margin.",
      "Because multifamily folds structural, mechanical, electrical, plumbing, and civil scope into one permit package, an integrated firm eliminates the coordination gaps that inflate change orders. We align shear walls with plumbing chases, size the electrical service to the actual connected load, and coordinate the podium transfer with the underground utilities. One team sealing structural and MEP under a single QA process means fewer clashes at framing and a design that clears IBC accessibility, fire-separation, and energy review.",
    ],
    specialties: [
      {
        heading:
          "Mid-Rise and High-Rise Structural Concrete and Light-Gauge Steel Design",
        body:
          "We engineer the full spectrum of multifamily construction, from Type V wood-frame walk-ups to five-over-one podium projects and concrete high-rises. Above the podium, cold-formed steel and light-gauge bearing walls follow AISI S100 and S240, with the post-tensioned or reinforced concrete transfer slab designed to ACI 318 to carry discontinuous shear walls and columns. Lateral systems—shear walls, moment frames, or dual systems—are analyzed under ASCE 7 for the seismic design category and wind exposure, with drift, torsional irregularity, and overturning checked. We optimize slab depth, tendon layout, and rebar to hold cost down while meeting deflection and vibration serviceability.",
      },
      {
        heading:
          "High-Efficiency Centralized vs. Distributed Mechanical Plant Configurations",
        body:
          "Choosing between a centralized plant and distributed unit-level equipment drives both first cost and operating expense across the asset's life. We model both approaches against the pro forma: central chilled-water or VRF systems with corridor-fed distribution versus in-unit heat pumps, mini-splits, or packaged terminal units. Load calculations follow ACCA Manual J and ASHRAE 90.1 or the IECC paths, with ventilation to ASHRAE 62.1 and 62.2 for dwelling-unit air quality. Domestic hot water is evaluated as central plant with recirculation versus point-of-use, with a metering strategy letting owners sub-meter. The result is a mechanical basis of design tied to measurable energy performance.",
      },
      {
        heading:
          "Acoustically-Isolated Utility Runs & Code-Compliant Life Safety Systems",
        body:
          "Sound transmission complaints are the most common post-occupancy issue in multifamily housing, so we engineer partitions, floor-ceiling assemblies, and utility routing to meet IBC minimum STC and IIC ratings—typically 50 and above—using resilient channels, isolation hangers, and offset penetrations. Plumbing risers and waste stacks are wrapped to control flow noise, and mechanical equipment is spring- or neoprene-isolated. Life-safety design covers NFPA 13 or 13R sprinklers, NFPA 72 fire alarm with unit smoke and CO detection, and IBC fire and smoke barriers at demising and corridor walls. Egress, travel distance, and emergency lighting are coordinated to clear plan check first-round.",
      },
    ],
    disciplines: [
      {
        name: "Structural Engineering",
        href: "/services/structural",
        body: [
          "Our structural team designs the gravity and lateral systems that make multifamily construction economical at scale. We handle wood-frame, cold-formed steel, structural steel, and cast-in-place or post-tensioned concrete, and we specialize in the podium transfer that lets residential framing sit over parking or retail. Foundations follow the geotechnical report—spread footings, mats, or deep foundations—and every lateral system is checked against ASCE 7 seismic and wind demands for drift, irregularities, and overturning.",
        ],
        highlights: [
          "Five-over-one podium and transfer slabs (ACI 318)",
          "Light-gauge and wood-frame bearing walls (AISI S240, NDS)",
          "Post-tensioned podium and slab optimization",
          "Shear wall and moment-frame analysis (ASCE 7)",
          "Deflection and floor-vibration checks",
        ],
      },
      {
        name: "MEP Engineering",
        href: "/services/mep",
        body: [
          "We design MEP systems tuned to the repetitive unit module and the shared building infrastructure. Electrical covers service and metering, unit panels, house loads, EV-ready parking, and lighting to energy-code power allowances. Mechanical covers unit HVAC selection, corridor pressurization, and ventilation to ASHRAE 62.1/62.2. Plumbing covers domestic water sizing, drain-waste-vent stacks, gas distribution, and central or distributed hot-water systems—coordinated with the structural chases so risers stack cleanly floor to floor.",
        ],
        highlights: [
          "Electrical service, metering, and demand-load studies",
          "Unit HVAC and central/distributed plant selection",
          "Domestic water, DWV, and hot-water recirculation",
          "EV-ready parking and lighting power allowances",
          "Ventilation and corridor pressurization (ASHRAE 62)",
        ],
      },
      {
        name: "Civil Engineering",
        href: "/services/civil",
        body: [
          "Civil scope ties the building to the site and the municipality's requirements. We prepare grading and drainage plans, on-site stormwater management, utility connections for water, sewer, and gas, and the fire-access and parking layout many multifamily approvals hinge on. Stormwater design addresses detention, water quality, and NPDES permitting, and we coordinate site utilities with the building's points of connection so underground work sequences correctly with the podium pour.",
        ],
        highlights: [
          "Grading, drainage, and erosion-control plans",
          "Stormwater detention and water-quality BMPs",
          "Domestic, fire, and sanitary utility connections",
          "Fire-lane, ADA parking, and site-access layout",
          "NPDES/SWPPP permitting support",
        ],
      },
      {
        name: "Geotechnical Engineering",
        body: [
          "Geotechnical input governs the foundation strategy and the podium's bearing conditions. We coordinate subsurface investigation and interpret the report to establish allowable bearing pressures, settlement limits, seismic site class, and liquefaction potential where applicable. For projects on expansive soils, poor bearing strata, or high water tables, we integrate deep-foundation or ground-improvement recommendations into the structural design so transfer loads are carried safely and settlement stays in tolerance.",
        ],
        highlights: [
          "Subsurface investigation coordination",
          "Bearing capacity and settlement assessment",
          "Seismic site classification (ASCE 7)",
          "Deep-foundation and ground-improvement integration",
          "Expansive-soil and groundwater mitigation",
        ],
      },
    ],
    facilityTypes: [
      "Garden-style apartment communities",
      "Five-over-one podium mid-rise apartments",
      "High-rise residential towers",
      "For-sale condominium developments",
      "Student housing and dormitories",
      "Build-to-rent townhomes",
      "Mixed-use residential over retail",
      "Affordable and LIHTC housing",
      "Independent living apartments",
    ],
    projectTypes: [
      "Ground-up new construction",
      "Value-engineering and design-assist",
      "Renovation and unit repositioning",
      "Adaptive reuse of office or commercial buildings",
      "Building additions and expansions",
    ],
    deliverables: [
      "Permit-ready sealed structural drawings",
      "Gravity and lateral calculation packages",
      "MEP construction documents and specifications",
      "Electrical service and demand-load studies",
      "Energy-code compliance (COMcheck/Title 24)",
      "Post-tension and podium transfer packages",
      "Life-safety and fire-protection drawings",
      "RFI responses and CA support",
    ],
    compliance: [
      {
        code: "IBC",
        desc: "The building code governs construction type, occupancy separation, fire ratings, and egress.",
      },
      {
        code: "ASCE 7",
        desc: "Minimum Design Loads sets the seismic, wind, snow, and live-load demands for gravity and lateral systems.",
      },
      {
        code: "ACI 318",
        desc: "The concrete code governs design of podium slabs, post-tensioned decks, and foundations.",
      },
      {
        code: "IECC / ASHRAE 90.1",
        desc: "The energy code sets envelope, HVAC, lighting, and hot-water efficiency requirements via prescriptive or performance paths.",
      },
      {
        code: "IPC / IMC",
        desc: "The Plumbing and Mechanical Codes govern fixture units, DWV sizing, gas piping, and ventilation rates.",
      },
      {
        code: "NFPA 13 / 13R",
        desc: "These sprinkler standards define suppression coverage and hydraulic design for residential occupancies by height and construction type.",
      },
      {
        code: "ICC A117.1",
        desc: "The accessibility standard, with the Fair Housing Act, governs accessible unit design, clearances, and route requirements.",
      },
    ],
    cta: "Upload your unit plans and target construction type, and our team will return a coordinated structural and MEP scope with a fixed fee for your multifamily project.",
  },
  {
    slug: "senior-living-assisted-care-engineering",
    name: "Senior Living & Assisted Care",
    cluster: 5,
    title: "Senior Living Engineering | Life-Safety & Standby Power",
    meta: "Comprehensive engineering for senior living and assisted care facilities. Compliant with licensing bodies, emergency standby power, and accessible design.",
    h1: "Senior Living, Memory Care & Assisted Care Facility Engineering",
    h2: "Licensing-Driven Life-Safety Design with Resilient Resident Comfort Systems",
    cardBlurb:
      "Life-safety-driven structural and MEP engineering for independent living, assisted care, and memory care—built around standby power, accessibility, and the resident-comfort systems that licensing bodies scrutinize.",
    intro: [
      "Senior living straddles hospitality and institutional care, and its engineering reflects that dual mandate. An independent-living wing may be residential occupancy, while assisted living and skilled nursing trigger institutional life-safety requirements, standby power for vital loads, and the survey scrutiny of state licensing agencies. We navigate this mixed-occupancy reality from the outset—setting the occupancy classifications, smoke-compartment strategy, and defend-in-place approach so the design satisfies both the building code and the operator's licensing pathway.",
      "Because resident safety depends on systems that must keep working during power loss and emergencies, cross-discipline coordination is non-negotiable. We integrate the structural frame, the standby generator and emergency distribution, the nurse-call and wandering-mitigation low-voltage systems, and the HVAC that holds memory-care and therapeutic spaces within tight comfort bands. One accountable team means generator sizing matches the actual life-safety loads, smoke barriers align with the structure, and accessibility features clear inspection—reducing survey findings.",
    ],
    specialties: [
      {
        heading:
          "Emergency Standby Generator Power for Vital Care Equipment Loads",
        body:
          "Continuity of power is a licensing requirement in care settings, so we size standby and emergency power to the facility's true critical load. Depending on occupancy classification, the design follows NFPA 110 and the NEC Article 700/701/702 branch structure separating life-safety, critical, and optional-standby loads. We calculate connected and demand loads for egress lighting, fire alarm, elevators, refrigerated medication storage, medical equipment, and HVAC serving vulnerable residents, then specify the generator, transfer switches, and fuel storage with runtime meeting the AHJ. Load banks, selective coordination, and testing provisions are built into the documents so commissioning and the licensing survey go smoothly.",
      },
      {
        heading:
          "Specialized Nurse-Call, Low-Voltage Security, and Wandering Mitigation Systems",
        body:
          "Care facilities depend on low-voltage systems that structural and MEP design must accommodate, so we coordinate pathways, power, and equipment rooms for the full technology stack. Nurse-call systems are laid out to UL 1069 with devices at beds, bathrooms, and common areas, integrated with the facility's response workflow. Memory-care and secured units require wandering-mitigation and elopement control—door controllers, tag readers, and delayed-egress or access-controlled hardware coordinated with NFPA 101 special-locking-arrangement provisions. We also engineer access control, video surveillance, and structured cabling, providing conditioned space, standby power, and grounding for the head-end equipment.",
      },
      {
        heading:
          "Universal Accessibility (ADA/FHA) & Therapeutic Space Climate Engineering",
        body:
          "Accessibility in senior living goes beyond minimum code, so we design to the ADA Standards, ICC A117.1, and the Fair Housing Act while accommodating walkers, wheelchairs, and lifts throughout resident and common areas. Roll-in showers, reinforced grab-bar backing, accessible route grades, and clearance-driven fixture layouts are coordinated between structural blocking and plumbing. On comfort, we engineer HVAC for therapeutic and clinical spaces to hold tight temperature and humidity ranges that protect frail residents, using zoning, ASHRAE 62.1 ventilation rates, and quiet, draft-free distribution. Enhanced filtration and pressure relationships for soiled-utility and treatment rooms are provided where licensing requires.",
      },
    ],
    disciplines: [
      {
        name: "Structural Engineering",
        href: "/services/structural",
        body: [
          "Our structural engineers design senior-living frames that support institutional life-safety features and heavy equipment while remaining cost-effective—framing for smoke-compartment barriers, elevator and lift shafts, generator pads and fuel systems, and roof-mounted mechanical units. Systems range from wood and light-gauge framing for single-story cottages to concrete and steel for multi-story campuses, all designed to ASCE 7 and the governing material code with foundations set by the geotechnical report.",
        ],
        highlights: [
          "Framing for smoke barriers and fire-rated assemblies",
          "Elevator, lift, and equipment-support structures",
          "Generator pad and rooftop mechanical support",
          "Grab-bar and casework blocking coordination",
          "Lateral design (ASCE 7) for the site seismic category",
        ],
      },
      {
        name: "MEP Engineering",
        href: "/services/mep",
        body: [
          "MEP is the core of care-facility engineering. Electrical centers on the essential electrical system—normal, standby, and emergency branches—plus nurse-call and low-voltage infrastructure. Mechanical delivers zoned, filtered, quiet HVAC that holds comfort in resident rooms and tighter conditions in clinical spaces. Plumbing covers domestic hot water with anti-scald control, roll-in shower and accessible-fixture rough-in, and clinical fixtures where the care level requires, all coordinated with life-safety and standby power.",
        ],
        highlights: [
          "Essential electrical system (NEC 700/701/702)",
          "Generator and ATS sizing (NFPA 110)",
          "Zoned, filtered HVAC for resident and clinical spaces",
          "Anti-scald hot water and accessible fixtures",
          "Nurse-call and low-voltage pathway coordination",
        ],
      },
      {
        name: "Civil Engineering",
        href: "/services/civil",
        body: [
          "Civil design supports safe, accessible, resilient campuses. We lay out accessible parking, drop-off and ambulance access, and fire-lane geometry, and grade the site so accessible routes stay within ADA slope limits. Stormwater management, utility service for water, sewer, and gas, and generator fuel-delivery access are coordinated with the site plan. Where campuses phase over time, we plan utilities and grading to support future buildings without rework.",
        ],
        highlights: [
          "Accessible route grading within ADA slope limits",
          "Ambulance, drop-off, and fire-lane access",
          "Stormwater detention and water-quality BMPs",
          "Water, sewer, gas, and fuel-delivery service",
          "Phased campus grading and utility planning",
        ],
      },
      {
        name: "Geotechnical Engineering",
        body: [
          "Geotechnical findings shape foundations and site preparation for care campuses, which often combine single-story and multi-story elements. We coordinate the subsurface investigation and apply its recommendations for allowable bearing, settlement control, and seismic site class, with special attention to differential settlement between building wings. Where soils are expansive or bearing is marginal, we integrate ground improvement or deep foundations so the structure and its life-safety systems stay stable over the asset's long operating life.",
        ],
        highlights: [
          "Subsurface investigation coordination",
          "Bearing capacity and differential-settlement control",
          "Seismic site classification (ASCE 7)",
          "Ground-improvement and deep-foundation recommendations",
          "Expansive-soil and groundwater mitigation",
        ],
      },
    ],
    facilityTypes: [
      "Independent living apartment communities",
      "Assisted living residences",
      "Memory care and secured dementia units",
      "Skilled nursing facilities",
      "Continuing care retirement communities (CCRC)",
      "Adult day-care and respite centers",
      "Rehabilitation and therapy wings",
      "Congregate and supportive housing",
    ],
    projectTypes: [
      "Ground-up new construction",
      "Renovation and unit modernization",
      "Building additions and campus expansion",
      "Tenant improvement and level-of-care conversion",
      "Adaptive reuse into senior housing",
    ],
    deliverables: [
      "Permit-ready sealed structural drawings",
      "Structural calculation packages",
      "MEP construction documents and specifications",
      "Standby-power load studies and one-line diagrams",
      "Generator and ATS sizing calculations",
      "Life-safety and smoke-compartment plans",
      "Accessibility (ADA/FHA) documentation",
      "RFI responses and CA support",
    ],
    compliance: [
      {
        code: "NFPA 101",
        desc: "The Life Safety Code governs egress, smoke compartmentation, defend-in-place, and special locking arrangements.",
      },
      {
        code: "NFPA 110",
        desc: "The standby-power standard defines generator classes, transfer time, fuel supply, and testing for the essential electrical system.",
      },
      {
        code: "NEC (NFPA 70)",
        desc: "Articles 700, 701, and 702 organize life-safety, critical, and optional-standby branches with selective coordination.",
      },
      {
        code: "IBC",
        desc: "The building code sets occupancy classification, fire-resistance ratings, and construction type for mixed residential and institutional uses.",
      },
      {
        code: "ADA / ICC A117.1",
        desc: "Accessibility standards govern routes, clearances, roll-in showers, and grab-bar provisions for residents using mobility aids.",
      },
      {
        code: "ASHRAE 62.1 / 170",
        desc: "These ventilation standards set outdoor-air rates and, for clinical care, pressure relationships and filtration for treatment and soiled-utility spaces.",
      },
      {
        code: "UL 1069",
        desc: "The nurse-call standard governs design and performance of resident call systems within the low-voltage infrastructure.",
      },
    ],
    cta: "Upload your floor plans, care model, and licensing pathway, and our engineers will return a coordinated life-safety, standby-power, and MEP scope with a fixed fee.",
  },
];
