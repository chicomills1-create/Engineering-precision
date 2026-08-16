import type { Industry } from "./types";

export const CLUSTER2_INDUSTRIES: Industry[] = [
  {
    slug: "data-center-engineering",
    name: "Data Centers",
    cluster: 2,
    title: "Data Center Engineering Services | Mission-Critical MEP Design",
    meta: "Mission-critical data center engineering. Specializing in N+1 cooling redundancy, high-density power distribution, and pre-action fire suppression.",
    h1: "Data Center & Critical Facility Engineering Services",
    h2: "Maximizing Uptime through Redundant, Resilient MEP Infrastructure",
    cardBlurb:
      "Concurrently maintainable MEP and structural design for enterprise, colocation, and edge data centers built for continuous uptime.",
    intro: [
      "Data centers convert every watt of IT load into heat, and the engineering discipline that manages that energy flow determines whether a facility meets its uptime commitments. Our integrated teams design cooling, power, and structural systems around measurable targets: rack density in kW per cabinet, PUE goals, and the redundancy topology the operator has contracted to deliver. We coordinate mechanical, electrical, and fire protection scopes concurrently so single points of failure are engineered out rather than discovered during commissioning.",
      "A multi-discipline firm is decisive on these projects because the electrical room, the cooling plant, the raised-floor structure, and the site utility feeds are interdependent. Switchgear heat loads drive room HVAC; generator yards drive civil grading and fuel storage; heavy battery and CRAH loads drive slab and roof framing. By keeping structural, MEP, civil, and geotechnical work under one roof, we resolve those interfaces early and produce coordinated, permit-ready documents that survive rigorous Level 1 through Level 5 commissioning.",
    ],
    specialties: [
      {
        heading: "N+1, 2N, and Concurrent Maintainability Cooling Architecture",
        body:
          "We architect cooling to a defined redundancy tier so any component can fail or be serviced without dropping IT load. Depending on density we deploy hot-aisle/cold-aisle containment, in-row DX, chilled-water CRAH systems, or rear-door heat exchangers, with the plant sized on ASHRAE TC 9.9 thermal guidelines and psychrometric analysis of the operator's temperature and humidity envelope. N+1 adds a redundant unit per capacity block; 2N mirrors the entire distribution path; concurrent maintainability requires dual paths so isolation valves, dual pumps, and A/B piping allow maintenance under full load. We run CFD airflow modeling to eliminate hot spots and verify supply-air distribution at the rack face before construction.",
      },
      {
        heading: "High-Density Power Distribution & Medium Voltage Substations",
        body:
          "Power design begins at the utility service and steps down through medium-voltage substations, unit substations, and switchgear to PDUs and busway at the rack. We perform load calculations to NEC Article 220, short-circuit and coordination studies, and arc-flash analysis per IEEE 1584 and NFPA 70E so protective devices are selectively coordinated and labeled. Redundancy is delivered through A/B feeds, static transfer switches, and paralleling gear tying utility, generator, and UPS sources. One-line diagrams document the full topology from service entrance to critical load, and we size generators and automatic transfer schemes for step-load acceptance during utility loss without disturbing the IT bus.",
      },
      {
        heading: "Pre-Action Fire Suppression & Very Early Smoke Detection Apparatus (VESDA)",
        body:
          "Electronics and water demand a suppression strategy that prevents accidental discharge. We design double-interlock pre-action sprinkler systems per NFPA 13 so piping stays dry until both an air-sampling detector and a sprinkler operate, protecting hardware from nuisance events. Aspirating VESDA detection to NFPA 72 draws air continuously to identify combustion at the incipient stage, well before conventional spot detectors alarm. For high-value white space we evaluate clean-agent systems to NFPA 2001. Detection, suppression, HVAC shutdown, and damper control are integrated so a confirmed alarm sequences the mechanical systems, notifies the EPO scheme, and preserves an auditable cause-and-effect matrix for the AHJ.",
      },
    ],
    disciplines: [
      {
        name: "Structural Engineering",
        href: "/services/structural",
        body: [
          "Data hall structures carry unusually heavy and concentrated loads: PDUs, busway, overhead cable trays, CRAH units, and battery rooms all impose demands that ordinary commercial framing does not anticipate. We design raised-access floor systems, reinforced slabs, and roof framing to support rooftop condensers and screening while meeting seismic and wind provisions of ASCE 7. Equipment anchorage and vibration isolation are engineered so rotating and switching gear stay within tolerance and remain operational after a design seismic event.",
        ],
        highlights: [
          "Raised-access floor and reinforced slab design for concentrated equipment loads",
          "Roof framing for rooftop chillers, condensers, and equipment screens",
          "Seismic anchorage and bracing of switchgear, UPS, and battery racks per ASCE 7",
          "Generator yard and fuel tank support structures",
        ],
      },
      {
        name: "MEP Engineering",
        href: "/services/mep",
        body: [
          "MEP is the heart of a data center. We design the redundant cooling plant, medium- and low-voltage power distribution, UPS and generator systems, building management controls, and grounding and bonding for sensitive electronics. Every system is coordinated to a redundancy tier and documented in one-line diagrams, piping schematics, and sequences of operation that support a full commissioning program from factory witness testing through integrated systems testing.",
        ],
        highlights: [
          "Chilled-water, DX, and containment cooling plant design to ASHRAE TC 9.9",
          "UPS, generator, ATS, and paralleling switchgear coordination",
          "Short-circuit, coordination, and arc-flash studies per IEEE 1584",
          "Signal reference grid, grounding, and bonding for electronics",
          "BMS/DCIM integration and detailed sequences of operation",
        ],
      },
      {
        name: "Civil Engineering",
        href: "/services/civil",
        body: [
          "Site work supports the campus utilities and resilience the mission demands. We design grading, stormwater management, utility routing, redundant service entrances, generator and fuel yards, and secure access and setbacks. Drainage and detention are engineered to keep critical equipment above flood elevations and to protect the site during extreme rainfall.",
        ],
        highlights: [
          "Site grading, paving, and stormwater detention design",
          "Redundant utility and fiber entrance routing",
          "Generator, fuel storage, and cooling-tower yard layout",
          "Flood mitigation and critical-equipment elevation planning",
        ],
      },
      {
        name: "Geotechnical Engineering",
        body: [
          "Heavy, vibration-sensitive equipment and large generator yards require reliable subsurface data. We recommend foundation systems, bearing capacities, and settlement limits appropriate for concentrated loads, and evaluate soil conditions for buried fuel and utility infrastructure.",
        ],
        highlights: [
          "Subsurface investigation and foundation recommendations",
          "Bearing capacity and settlement analysis for heavy equipment pads",
          "Seismic site classification for ASCE 7 design",
          "Evaluation for buried fuel tanks and utility trenches",
        ],
      },
    ],
    facilityTypes: [
      "Enterprise data centers",
      "Colocation and multi-tenant facilities",
      "Hyperscale campuses",
      "Edge and micro data centers",
      "Network operations centers",
      "Telecommunications carrier hotels",
      "Modular and containerized deployments",
      "Disaster recovery sites",
    ],
    projectTypes: [
      "New ground-up construction",
      "Capacity expansions and phased buildout",
      "White-space fit-outs within shell buildings",
      "Infrastructure upgrades and redundancy retrofits",
      "Adaptive reuse of industrial buildings",
    ],
    deliverables: [
      "Permit-ready sealed MEP and structural drawings",
      "Electrical one-line diagrams and load calculations",
      "Short-circuit, coordination, and arc-flash study reports",
      "Cooling load and CFD airflow analysis packages",
      "Fire protection and cause-and-effect matrices",
      "Equipment anchorage and seismic bracing details",
      "Commissioning support and integrated systems test scripts",
      "RFI responses and construction administration",
    ],
    compliance: [
      {
        code: "TIA-942",
        desc: "Defines the rated infrastructure classifications for data center telecommunications, power, cooling, and site that we design toward to meet an operator's availability target.",
      },
      {
        code: "Uptime Institute Tier Standard",
        desc: "Establishes Tier I–IV topology requirements for redundancy and concurrent maintainability that inform our distribution architecture.",
      },
      {
        code: "ASHRAE TC 9.9",
        desc: "Provides the thermal guidelines and recommended temperature/humidity envelopes we use to size cooling systems for IT equipment.",
      },
      {
        code: "NFPA 75 / NFPA 76",
        desc: "Govern fire protection of information technology and telecommunications equipment spaces, driving construction, detection, and suppression choices.",
      },
      {
        code: "NFPA 70 (NEC)",
        desc: "The National Electrical Code governs load calculations, overcurrent protection, and grounding for all power distribution we design.",
      },
      {
        code: "ASCE 7",
        desc: "Supplies the seismic, wind, and load provisions used to design structures and anchor critical equipment.",
      },
    ],
    cta: "Upload your rack density targets, redundancy tier, and site drawings and our data center team will return a coordinated scope and fee proposal.",
  },
  {
    slug: "industrial-warehouse-engineering",
    name: "Industrial & Warehouse",
    cluster: 2,
    title: "Industrial & Warehouse Engineering | Tilt-Up Structural Design",
    meta: "Scalable engineering solutions for logistics hubs and manufacturing plants. Experts in tilt-up concrete structures and industrial ventilation.",
    h1: "Industrial Manufacturing & Logistics Warehouse Engineering",
    h2: "High-Volume, Structural Integrity for Modern Supply Chains",
    cardBlurb:
      "Tilt-up and structural steel design, high-bay electrical, and large-volume ventilation for distribution centers and manufacturing plants.",
    intro: [
      "Modern distribution and manufacturing facilities are engineering-intensive despite their simple appearance. Long clear spans, tall clear heights, heavy floor loads from racking and forklifts, and large roof areas that must resist wind uplift all demand rigorous structural analysis. Our teams design tilt-up concrete and structural steel systems, slab-on-grade floors engineered for point and uniform loads, and building envelopes that meet energy code while accommodating the throughput and automation the operation requires.",
      "Because industrial buildings are dominated by the interaction of structure, floor slab, site, and power, an integrated firm delivers real value. Racking layouts drive slab joint and reinforcement design; dock and truck court geometry drives civil grading and pavement; automation and high-bay lighting drive electrical capacity. Coordinating these disciplines from the start prevents costly conflicts, and our permit-ready documents give general contractors and design-build partners a clean path through plan review and construction.",
    ],
    specialties: [
      {
        heading: "Tilt-Up Concrete Structural Engineering & Floor Slab Design",
        body:
          "Tilt-up construction casts wall panels on the slab and lifts them into place, so panel design, lifting stresses, and bracing are as critical as in-place loads. We design panels to ACI 318 and the ACI 551 tilt-up guide, checking reinforcement for casting, lifting, and erection stresses as well as wind and seismic demands per ASCE 7. Floor slabs are engineered for the actual duty: forklift axle loads, rack post base plates, and seismic separation. We apply ACI 302 for slab thickness, joint spacing, and subgrade modulus, and coordinate with the racking vendor so post loads, seismic bracing, and slab reinforcement work together rather than in conflict.",
      },
      {
        heading: "High-Bay LED Lighting & Automated Electrical Infrastructure",
        body:
          "High-clear-height warehouses need lighting and power designed for both energy efficiency and the electrical demands of automation. We design high-bay LED layouts with photometric analysis to hit target foot-candles at the floor and in aisles while meeting ASHRAE 90.1 and IECC lighting power density limits, integrating occupancy and daylight controls. Power distribution is sized to NEC Article 220 for conveyor systems, automated storage and retrieval, battery charging rooms, and future tenant flexibility. We coordinate service capacity, panel locations, and busway or feeder routing so that automation retrofits are supported without a costly service upgrade, and provide one-line diagrams and panel schedules for permitting.",
      },
      {
        heading: "High-Volume Low-Speed (HVLS) & Large-Scale Facility Ventilation",
        body:
          "Large enclosed volumes require deliberate ventilation strategy for worker comfort, code compliance, and process needs. We size mechanical ventilation and HVLS fan systems using ASHRAE 62.1 outdoor-air rates and destratification analysis to move heat off the roof and mix conditioned air through tall spaces. Where processes generate contaminants, welding fumes, or heat, we design local and general exhaust and make-up air to maintain safe conditions. Fan placement and airflow modeling prevent short-circuiting and drafts across pick lines. We also coordinate smoke and heat venting where required by the IBC and IFC for high-piled combustible storage, tying mechanical, fire protection, and life-safety systems together.",
      },
    ],
    disciplines: [
      {
        name: "Structural Engineering",
        href: "/services/structural",
        body: [
          "We design the primary structure that defines industrial buildings: tilt-up concrete panels or structural steel frames, long-span roof systems, mezzanines, and the slab-on-grade floor. Analysis addresses wind uplift on large roofs, seismic demands, forklift and racking loads on the slab, and equipment support. Our documents include panel reinforcement, lift and brace design, connection details, and slab jointing tailored to the racking configuration.",
        ],
        highlights: [
          "Tilt-up panel and structural steel frame design to ACI 318 and AISC 360",
          "Long-span roof and joist systems with wind uplift analysis",
          "Slab-on-grade design for forklift and rack post loads per ACI 302",
          "Mezzanine, pit, and equipment support framing",
          "Seismic bracing of racking and building systems per ASCE 7",
        ],
      },
      {
        name: "MEP Engineering",
        href: "/services/mep",
        body: [
          "MEP scope covers high-bay lighting and controls, power distribution for automation and charging, large-volume ventilation, high-piled storage smoke control, and the fire protection design basis. We size electrical service and distribution for present and future automation loads and design ventilation and any process HVAC for the building's use and occupancy.",
        ],
        highlights: [
          "High-bay LED photometric design and lighting controls",
          "Power distribution for conveyors, ASRS, and battery charging",
          "Large-volume and HVLS ventilation per ASHRAE 62.1",
          "Smoke and heat venting coordination for high-piled storage",
          "Plumbing, compressed air, and process utility rough-in",
        ],
      },
      {
        name: "Civil Engineering",
        href: "/services/civil",
        body: [
          "We design the site to handle heavy truck traffic and large impervious areas. Scope includes truck court and dock apron pavement, grading, stormwater detention, utility service, and fire access. Pavement sections are engineered for repeated trailer loading, and drainage is designed to keep dock areas and yards clear during storms.",
        ],
        highlights: [
          "Heavy-duty truck court and dock apron pavement design",
          "Grading, stormwater detention, and water-quality treatment",
          "Utility service routing and fire lane layout",
          "Trailer parking and site circulation design",
        ],
      },
      {
        name: "Geotechnical Engineering",
        body: [
          "Slab performance and foundation design depend on subgrade conditions. We evaluate soils for slab-on-grade support, subgrade modulus, and settlement, and provide foundation recommendations for panels, columns, and heavy equipment pads.",
        ],
        highlights: [
          "Subsurface exploration and subgrade modulus determination",
          "Slab-on-grade support and settlement analysis",
          "Foundation recommendations for tilt-up panels and columns",
          "Pavement subgrade and compaction recommendations",
        ],
      },
    ],
    facilityTypes: [
      "Distribution and fulfillment centers",
      "Bulk and high-cube warehouses",
      "Light and heavy manufacturing plants",
      "Cross-dock and freight terminals",
      "Automated storage and retrieval facilities",
      "Flex industrial and last-mile depots",
      "Assembly and light-industrial buildings",
      "Industrial condominiums",
    ],
    projectTypes: [
      "New ground-up construction",
      "Building expansions and additions",
      "Tenant improvements and rack fit-outs",
      "Automation and process retrofits",
      "Adaptive reuse of existing industrial space",
    ],
    deliverables: [
      "Permit-ready sealed structural and MEP drawings",
      "Tilt-up panel reinforcement, lift, and brace calculations",
      "Slab-on-grade design and joint layout packages",
      "Electrical one-line diagrams and panel schedules",
      "Photometric lighting studies",
      "High-piled storage and ventilation coordination documents",
      "Foundation and pavement design recommendations",
      "RFI responses and construction administration support",
    ],
    compliance: [
      {
        code: "IBC",
        desc: "The International Building Code governs occupancy classification, construction type, and high-piled storage provisions that shape structural and life-safety design.",
      },
      {
        code: "ASCE 7",
        desc: "Provides the wind, seismic, snow, and load combinations used to design the primary structure and large roof areas.",
      },
      {
        code: "ACI 318 / ACI 551",
        desc: "Govern reinforced concrete and tilt-up wall panel design, including lifting and erection stress checks.",
      },
      {
        code: "ACI 302",
        desc: "Guides slab-on-grade thickness, jointing, and construction for the heavy floor loads of racking and material handling.",
      },
      {
        code: "IFC / NFPA 13",
        desc: "The International Fire Code and NFPA 13 set requirements for high-piled combustible storage sprinkler density, smoke venting, and access.",
      },
      {
        code: "ASHRAE 90.1 / IECC",
        desc: "Establish envelope, lighting power density, and mechanical efficiency limits our designs must satisfy for energy code compliance.",
      },
    ],
    cta: "Share your building footprint, clear height, and racking plan and we'll return a coordinated structural and MEP scope with a fee estimate.",
  },
  {
    slug: "cold-storage-food-processing-engineering",
    name: "Cold Storage & Food Processing",
    cluster: 2,
    title: "Cold Storage & Food Processing Engineering | Low-Temp Envelope",
    meta: "Engineering services for cold chains and food manufacturing. Low-temperature thermal envelopes, industrial refrigeration, and hygienic process design.",
    h1: "Cold Storage, Blast Freezer & Food Processing Engineering",
    h2: "Precision Temperature Controls & Sanitizable Structural Frameworks",
    cardBlurb:
      "Low-temperature envelope, frost-heave slab, industrial refrigeration, and sanitary process design for cold chain and food manufacturing.",
    intro: [
      "Cold storage and food processing facilities push engineering to extremes that ordinary commercial buildings never see. Sustained temperatures from cooler ranges down to blast-freezer lows create continuous vapor drive, condensation, and frost-heave risk that the envelope, slab, and mechanical systems must be engineered to control. Every discipline is affected: insulated panels, vapor barriers, underslab heating, refrigeration, and sanitary drainage all have to work together, or the building will sweat, ice up, or heave.",
      "An integrated firm is essential here because a mistake in one discipline shows up as a failure in another. A vapor barrier detail is a structural, envelope, and mechanical concern at once; an underfloor heating system is both a slab and a mechanical scope; washdown and hygienic finishes drive plumbing, drainage, and structural detailing. We coordinate refrigeration, structure, plumbing, and civil design from the outset and produce permit-ready documents that also anticipate food-safety inspection and refrigeration commissioning.",
    ],
    specialties: [
      {
        heading: "Low-Temperature Thermal Envelope & Vapor Barrier Engineering",
        body:
          "In freezer and cooler spaces the dominant physics is vapor drive from warm, humid outside air toward cold interiors. We engineer the thermal envelope with insulated metal panels sized by thermal calculation to hold interior setpoints while limiting energy use and preventing surface condensation. A continuous, warm-side vapor barrier is detailed at every penetration, joint, and transition because a single breach lets moisture migrate, freeze, and degrade insulation. We coordinate panel R-values, dew-point analysis, and door and dock-seal details, and address the structural attachment of heavy panels. Envelope decisions are made alongside the refrigeration load to keep the building tight, dry, and thermally stable across seasonal swings.",
      },
      {
        heading: "Underfloor Heated Slab Design to Prevent Frost Heave",
        body:
          "A freezer slab held below freezing will draw heat from the soil until the subgrade freezes, expands, and heaves the floor, cracking it over time. We design underslab frost-protection systems, glycol loops or electric heating cables embedded beneath the insulation, with control zones and monitoring to keep subgrade temperatures safely above freezing. The slab itself is engineered for heavy forklift, pallet-rack, and mobile-racking loads while accommodating thermal contraction. Insulation, heating layout, vapor retarder, and reinforcement are detailed as one integrated assembly. We coordinate the heating loop with the mechanical scope and the reinforcement and jointing with the structural scope so the finished floor stays flat, crack-controlled, and heave-free.",
      },
      {
        heading: "Food-Safety Compliant Washdown & Process Piping Infrastructure",
        body:
          "Food processing areas are washed down frequently and must drain, sanitize, and resist corrosion. We design plumbing and process piping for hot and cold sanitation water, clean-in-place systems, and process utilities using materials and joints suited to sanitary service. Trench and slot drains are sloped and located to clear water quickly, and floors are detailed for hygienic finishes and coving that meet FDA and USDA sanitary construction expectations. We size grease and solids interceptors where processing generates them, and coordinate hose stations, floor drains, and equipment connections. Structural and plumbing details are developed together so embedded drains and depressions integrate cleanly with slab reinforcement.",
      },
    ],
    disciplines: [
      {
        name: "Structural Engineering",
        href: "/services/structural",
        body: [
          "We design structure that supports heavy refrigerated loads and the demanding envelope. Scope includes framing for insulated panel walls and roofs, rooftop or penthouse refrigeration equipment support, freezer slabs with frost protection, and mezzanines. Special attention goes to thermal movement, corrosion-resistant detailing in wet areas, and seismic bracing of tall storage racks per ASCE 7.",
        ],
        highlights: [
          "Framing and attachment for insulated metal panel envelopes",
          "Freezer slab-on-grade with underslab insulation and heating integration",
          "Refrigeration equipment and penthouse support structures",
          "Seismic bracing of high-density and mobile racking",
          "Corrosion-resistant detailing for washdown environments",
        ],
      },
      {
        name: "MEP Engineering",
        href: "/services/mep",
        body: [
          "MEP scope centers on industrial refrigeration and the systems that support it. We design or coordinate ammonia or CO2 refrigeration and DX systems, evaporators, condensers, and controls, along with dock heating, dehumidification, sanitary plumbing, and process utilities. Electrical distribution supports compressors, defrost, and heavy motor loads, and we address machinery-room ventilation and detection required by refrigeration safety codes.",
        ],
        highlights: [
          "Industrial refrigeration and DX system design and coordination",
          "Refrigeration load calculations and evaporator/condenser sizing",
          "Machinery-room ventilation and gas detection per ASHRAE 15/IIAR 2",
          "Sanitary and process plumbing with CIP support",
          "Power distribution for compressors, defrost, and dock equipment",
        ],
      },
      {
        name: "Civil Engineering",
        href: "/services/civil",
        body: [
          "Site design supports refrigerated truck traffic and the utilities the plant demands. We design dock aprons, grading, stormwater management, process and sanitary sewer connections, and high-volume water service for washdown and refrigeration. Wastewater pretreatment coordination is addressed where processing loads the sanitary system.",
        ],
        highlights: [
          "Refrigerated dock apron and truck court pavement",
          "High-capacity water service for washdown and process",
          "Sanitary sewer and pretreatment coordination",
          "Grading and stormwater detention design",
        ],
      },
      {
        name: "Geotechnical Engineering",
        body: [
          "Freezer subgrades and heavy racking loads require careful geotechnical evaluation. We assess soils for slab support, settlement, and frost susceptibility, and provide foundation recommendations that account for underslab heating and heavy point loads.",
        ],
        highlights: [
          "Subsurface exploration and frost-susceptibility evaluation",
          "Slab support and settlement analysis for freezer floors",
          "Foundation recommendations for heavy racking and equipment",
          "Groundwater and drainage assessment beneath slabs",
        ],
      },
    ],
    facilityTypes: [
      "Refrigerated distribution warehouses",
      "Blast freezers and freezer storage",
      "Cooler and chill storage",
      "Food and beverage processing plants",
      "Meat, poultry, and seafood processing",
      "Dairy and produce packing facilities",
      "Cold-chain fulfillment centers",
      "Controlled-atmosphere storage",
    ],
    projectTypes: [
      "New ground-up construction",
      "Freezer and cooler additions",
      "Refrigeration and process retrofits",
      "Conversion of dry warehouse to refrigerated space",
      "Adaptive reuse and facility expansions",
    ],
    deliverables: [
      "Permit-ready sealed structural, MEP, and plumbing drawings",
      "Thermal envelope and dew-point calculation packages",
      "Underslab frost-protection and slab design details",
      "Refrigeration load and equipment sizing calculations",
      "Machinery-room ventilation and detection documentation",
      "Sanitary drainage and process piping layouts",
      "Foundation and subgrade recommendations",
      "RFI responses and refrigeration commissioning support",
    ],
    compliance: [
      {
        code: "IBC",
        desc: "The International Building Code sets occupancy, construction type, and life-safety requirements for refrigerated and processing occupancies.",
      },
      {
        code: "ASHRAE 15",
        desc: "The Safety Standard for Refrigeration Systems governs machinery-room ventilation, relief, and detection for refrigeration installations.",
      },
      {
        code: "IIAR 2",
        desc: "Sets safe design and installation standards for closed-circuit ammonia refrigeration systems, which drive machinery-room and safety design.",
      },
      {
        code: "FDA / USDA Sanitary Construction",
        desc: "Federal food-safety expectations for cleanable surfaces, drainage, and finishes that shape our plumbing and structural detailing.",
      },
      {
        code: "ASCE 7",
        desc: "Provides the seismic, wind, and load provisions used to design structure and brace high-density storage.",
      },
      {
        code: "IECC / ASHRAE 90.1",
        desc: "Establish envelope and mechanical efficiency requirements that inform insulation, panel, and system selections.",
      },
    ],
    cta: "Send us your temperature setpoints, storage volumes, and site plan and our cold-storage team will scope the envelope, refrigeration, and structure with a fee estimate.",
  },
  {
    slug: "self-storage-facility-engineering",
    name: "Self-Storage",
    cluster: 2,
    title: "Self-Storage Engineering Firm | Single & Multi-Story Systems",
    meta: "Efficient engineering designs for multi-story and single-story self-storage assets. Optimized light-gauge framing and zoned climate controls.",
    h1: "Single-Story & Multi-Story Self-Storage Facility Engineering",
    h2: "Maximizing Net Rentable Square Footage with Optimized Structural Framing",
    cardBlurb:
      "Value-engineered light-gauge and structural framing, zoned climate control, and site development for single- and multi-story self-storage.",
    intro: [
      "Self-storage is a returns-driven asset class where every structural and mechanical decision either adds or subtracts from net rentable square footage and construction cost. Column spacing, framing selection, and corridor width directly affect the unit mix a developer can lease, while climate-control strategy affects both first cost and operating expense. Our engineering approach treats the building as a leasing machine: efficient framing, tight envelopes, and right-sized mechanical systems that support the pro forma without over-engineering.",
      "Because these projects hinge on the interaction of structure, envelope, mechanical zoning, and site development, an integrated firm keeps the design lean and coordinated. Multi-story facilities add elevator, life-safety, and lateral-system demands; single-story facilities are dominated by site work and phasing. We design structural, MEP, and civil scopes together and deliver permit-ready documents that move quickly through plan review, which matters on schedule-sensitive developments built in phases.",
    ],
    specialties: [
      {
        heading: "Economical Structural Framing Systems for Heavy Storage Loads",
        body:
          "Self-storage floors carry unpredictable, densely packed live loads, so we design to realistic storage occupancy loading rather than generic office values, applying the IBC and ASCE 7 load provisions for the use. We compare framing systems, load-bearing light-gauge steel, structural steel, or concrete, to optimize column spacing for the desired unit mix and to control cost. For multi-story buildings we design the lateral force-resisting system, gravity framing, and floor assemblies to balance strength, deflection, and fire rating. Roof framing is checked for wind uplift and snow. The goal is a value-engineered structure that supports the leasing plan while satisfying code, using the lightest efficient system for the loads present.",
      },
      {
        heading: "High-Efficiency HVAC Zoning for Climate-Controlled Units",
        body:
          "Climate-controlled space commands higher rents but must be conditioned economically. We design zoned HVAC that maintains temperature and humidity within the ranges tenants expect while minimizing installed tonnage and energy. Load calculations follow ACCA Manual N and ASHRAE fundamentals, accounting for the low internal gains and high envelope influence typical of storage buildings. Dehumidification is prioritized because moisture control, not just temperature, protects stored goods and the building. We zone by floor and orientation, select equipment sized to actual loads, and design ventilation to code minimums to avoid over-conditioning. Controls are kept simple and robust for unattended operation, and the envelope is coordinated with the mechanical design to reduce load.",
      },
      {
        heading: "Civil Engineering, Site Development & Phased Construction Design",
        body:
          "Single-story drive-up facilities are largely a civil exercise, and multi-story sites still depend on efficient site design. We design grading, drive aisles sized for truck and vehicle circulation, stormwater detention and water-quality treatment, utilities, and ADA-compliant access. Many self-storage developments are built in phases to match lease-up, so we plan grading, drainage, and utility infrastructure to support later phases without rework. Fire access and hydrant coverage are designed per the IFC. Pavement is sized for the light-to-moderate traffic the use generates. Coordinated civil and structural documents keep the site, building pads, and utilities aligned across each construction phase.",
      },
    ],
    disciplines: [
      {
        name: "Structural Engineering",
        href: "/services/structural",
        body: [
          "We design the primary structure with cost efficiency as a core objective. Scope covers foundations, gravity and lateral systems for multi-story buildings, load-bearing light-gauge or structural steel framing, floor assemblies with appropriate fire ratings, and roof framing. Column grids are optimized for unit layout, and all systems are designed to realistic storage loads per the IBC and ASCE 7.",
        ],
        highlights: [
          "Foundation and slab design for single- and multi-story facilities",
          "Load-bearing light-gauge steel and structural steel framing",
          "Lateral force-resisting system design for multi-story buildings",
          "Fire-rated floor and roof assembly design",
          "Column grid optimization for unit mix and rentable area",
        ],
      },
      {
        name: "MEP Engineering",
        href: "/services/mep",
        body: [
          "MEP scope is intentionally efficient: zoned climate control for conditioned units, right-sized electrical service, LED lighting with occupancy controls throughout corridors, and life-safety systems including fire alarm and, where required, sprinklers. For multi-story buildings we design elevator power, egress lighting, and emergency systems. Plumbing is limited to restrooms and drainage but detailed for code compliance.",
        ],
        highlights: [
          "Zoned HVAC and dehumidification for climate-controlled units",
          "Right-sized electrical service and panel design",
          "LED corridor and unit lighting with occupancy controls",
          "Fire alarm and sprinkler design where required",
          "Elevator power and emergency egress lighting",
        ],
      },
      {
        name: "Civil Engineering",
        href: "/services/civil",
        body: [
          "Civil design is central to self-storage. We design site grading, drive aisles, stormwater detention and treatment, utility service, fire access, and ADA parking and routes. For phased developments we plan infrastructure so later phases connect without disturbing operating buildings.",
        ],
        highlights: [
          "Site grading and drive-aisle circulation design",
          "Stormwater detention and water-quality treatment",
          "Utility service and fire hydrant coverage per IFC",
          "Phased site infrastructure planning",
          "ADA parking, access routes, and site accessibility",
        ],
      },
      {
        name: "Geotechnical Engineering",
        body: [
          "Foundation and pavement design rely on subsurface data. We evaluate soils for footing bearing, slab support, and settlement, and provide pavement subgrade recommendations for drive aisles and parking.",
        ],
        highlights: [
          "Subsurface exploration and bearing capacity determination",
          "Foundation and slab-on-grade recommendations",
          "Settlement analysis for multi-story loads",
          "Pavement subgrade and compaction recommendations",
        ],
      },
    ],
    facilityTypes: [
      "Single-story drive-up storage",
      "Multi-story climate-controlled facilities",
      "Mixed climate-controlled and drive-up sites",
      "Boat and RV storage",
      "Portable storage and container yards",
      "Wine and specialty conditioned storage",
      "Mixed-use retail and storage buildings",
      "Adaptive reuse storage conversions",
    ],
    projectTypes: [
      "New ground-up construction",
      "Phased multi-building developments",
      "Facility expansions and additional buildings",
      "Adaptive reuse of retail or industrial buildings",
      "Climate-control and system upgrades",
    ],
    deliverables: [
      "Permit-ready sealed structural, MEP, and civil drawings",
      "Structural framing and foundation calculation packages",
      "HVAC load calculations and zoning layouts",
      "Electrical one-line diagrams and panel schedules",
      "Site grading, drainage, and utility plans",
      "Fire access and life-safety coordination documents",
      "Phasing plans for multi-building developments",
      "RFI responses and construction administration support",
    ],
    compliance: [
      {
        code: "IBC",
        desc: "The International Building Code governs occupancy classification, construction type, and fire-resistance requirements for storage buildings.",
      },
      {
        code: "ASCE 7",
        desc: "Supplies the storage live loads, seismic, wind, and snow provisions used to design efficient structural systems.",
      },
      {
        code: "IFC / NFPA 13",
        desc: "The International Fire Code and NFPA 13 govern fire access, hydrant coverage, and sprinkler requirements based on building size and occupancy.",
      },
      {
        code: "ADA / ANSI A117.1",
        desc: "Set accessibility requirements for parking, routes, restrooms, and units that our site and building designs must meet.",
      },
      {
        code: "IECC / ASHRAE 90.1",
        desc: "Establish envelope, lighting, and mechanical efficiency limits that drive our energy-efficient design for conditioned space.",
      },
      {
        code: "AISI S100",
        desc: "The North American cold-formed steel specification governs the load-bearing light-gauge framing frequently used for storage structures.",
      },
    ],
    cta: "Upload your site plan and target unit mix and we'll return a value-engineered structural, MEP, and civil scope with a fee estimate.",
  },
  {
    slug: "telecommunications-engineering",
    name: "Telecommunications",
    cluster: 2,
    title: "Telecommunications Infrastructure Engineering | Structural Analysis",
    meta: "Engineering services for telecom infrastructure. Tower structural analysis, equipment shelter MEP, and resilient backup DC power distribution.",
    h1: "Telecommunications Infrastructure Engineering Services",
    h2: "Supporting Next-Gen Networks with Resilient Structural & Power Design",
    cardBlurb:
      "Tower and mount structural analysis, equipment shelter climate control, and resilient DC power for wireless and network infrastructure.",
    intro: [
      "Telecommunications infrastructure must keep networks online through wind, ice, seismic events, and utility outages, so its engineering is defined by structural reliability and power resilience. Whether the site is a self-support tower, a monopole, a rooftop mount, or a ground shelter, the loads from antennas and appurtenances change with every carrier upgrade, and every modification requires a fresh structural analysis. Our teams evaluate existing structures, design new ones, and engineer the power and climate systems that keep radios and baseband equipment operating continuously.",
      "An integrated firm serves this industry well because a single site combines structural analysis, electrical distribution, backup power, HVAC, grounding, and site civil work. Adding equipment to a tower affects loading, foundation demand, shelter power, and cooling all at once. We coordinate structural, MEP, and civil scopes and deliver sealed analyses and permit-ready drawings that satisfy carriers, tower owners, and local jurisdictions, supporting both new builds and the constant cycle of collocations and upgrades.",
    ],
    specialties: [
      {
        heading: "Tower, Monopole, and Rooftop Mount Structural Loading Analysis",
        body:
          "Every antenna addition or swap changes the wind and ice loading on a supporting structure, and code requires that the structure be re-analyzed. We perform structural loading analysis on self-support and guyed towers, monopoles, and rooftop and building mounts to the TIA-222 standard, evaluating wind, ice, and combined load cases for the site's wind speed and ice thickness. For rooftop installations we analyze the existing building structure to confirm it can carry the new mounts and loads, and design reinforcement where needed. We produce sealed structural analysis reports, mount and reinforcement designs, and foundation checks that tower owners and carriers require before construction proceeds.",
      },
      {
        heading: "Equipment Shelter Climate Control & Environmental Zoning",
        body:
          "Radios, baseband units, and batteries generate heat and must stay within a defined temperature range to remain reliable, so shelter and cabinet cooling is a core scope. We size HVAC or free-cooling economizer systems to the equipment heat load, with redundancy and lead-lag control so a single unit failure does not overheat the site. Where batteries are present we design ventilation to control hydrogen and maintain battery temperature for full capacity. Environmental zoning separates heat-generating equipment from battery and control areas, and controls provide high-temperature alarms tied to the network monitoring system. Systems are designed for unattended operation and long service intervals typical of remote telecom sites.",
      },
      {
        heading: "Resilient DC Power Distribution & Uninterruptible Power Supply (UPS) Systems",
        body:
          "Telecom equipment runs on -48V DC and cannot tolerate interruption, so power design centers on continuous DC distribution with battery reserve and generator backup. We design rectifier plants, DC distribution, battery strings sized to the required reserve time, and the transfer scheme from utility to generator, all coordinated to NEC requirements and telecom practice. AC support loads and any UPS-backed equipment are sized and coordinated as well. Grounding and bonding follow NEC and telecom standards to protect equipment from lightning and transients, with a documented ground system tying towers, shelters, and equipment together. One-line diagrams and load calculations document the full DC and AC power topology.",
      },
    ],
    disciplines: [
      {
        name: "Structural Engineering",
        href: "/services/structural",
        body: [
          "Structural work is central to telecom sites. We analyze and design towers, monopoles, and mounts to TIA-222, evaluate existing rooftop and building structures for new antenna loads, design mount reinforcement, and provide foundation analysis and design. Every analysis addresses the wind and ice load cases for the specific site and carrier loading configuration.",
        ],
        highlights: [
          "Tower, monopole, and mount analysis and design to TIA-222",
          "Rooftop and building structural analysis for antenna loads",
          "Mount and structural reinforcement design",
          "Foundation analysis and design for towers and shelters",
          "Sealed structural analysis reports for carriers and owners",
        ],
      },
      {
        name: "MEP Engineering",
        href: "/services/mep",
        body: [
          "MEP scope delivers the power and cooling that keep sites online. We design DC power plants, battery systems, generator and transfer schemes, shelter and cabinet HVAC, grounding and bonding, lighting, and any fire detection required. Systems are sized for continuous, unattended operation with redundancy and remote alarms.",
        ],
        highlights: [
          "-48V DC rectifier plant and distribution design",
          "Battery reserve sizing and generator/ATS coordination",
          "Shelter and cabinet HVAC with economizer free cooling",
          "Grounding, bonding, and lightning protection per NEC",
          "Electrical one-line diagrams and load calculations",
        ],
      },
      {
        name: "Civil Engineering",
        href: "/services/civil",
        body: [
          "Site civil design supports compound access, drainage, and utilities. We design equipment compound grading, access drives, stormwater management, and utility service routing, along with erosion control for often-remote sites. Compound layout supports the tower, shelter, generator, and future collocation.",
        ],
        highlights: [
          "Equipment compound grading and layout",
          "Access drive and site circulation design",
          "Stormwater management and erosion control",
          "Utility and fiber service routing",
        ],
      },
      {
        name: "Geotechnical Engineering",
        body: [
          "Tower foundations depend on subsurface conditions and are governed by strict deflection and overturning limits. We evaluate soils for foundation bearing, uplift, and lateral resistance, and provide recommendations for drilled piers, mats, or shallow foundations supporting towers and shelters.",
        ],
        highlights: [
          "Subsurface exploration for tower and shelter foundations",
          "Bearing, uplift, and lateral resistance evaluation",
          "Drilled pier and mat foundation recommendations",
          "Seismic site classification for TIA-222 and ASCE 7",
        ],
      },
    ],
    facilityTypes: [
      "Self-support and guyed towers",
      "Monopoles and stealth structures",
      "Rooftop and building-mounted antenna sites",
      "Equipment shelters and prefabricated buildings",
      "Outdoor equipment cabinet sites",
      "Small-cell and DAS nodes",
      "Central offices and switch facilities",
      "Fiber huts and network aggregation sites",
    ],
    projectTypes: [
      "New tower and shelter construction",
      "Collocations and antenna modifications",
      "Structural reinforcement and upgrades",
      "Power and HVAC capacity upgrades",
      "Rooftop and small-cell deployments",
    ],
    deliverables: [
      "Sealed tower and mount structural analysis reports",
      "Permit-ready structural, MEP, and civil drawings",
      "Foundation analysis and design packages",
      "DC and AC power one-line diagrams and load calculations",
      "HVAC and battery ventilation design documents",
      "Grounding and lightning protection details",
      "Site compound grading and utility plans",
      "RFI responses and construction administration support",
    ],
    compliance: [
      {
        code: "TIA-222",
        desc: "The Structural Standard for Antenna Supporting Structures governs tower, monopole, and mount analysis for wind, ice, and combined loads.",
      },
      {
        code: "NFPA 70 (NEC)",
        desc: "The National Electrical Code governs DC and AC power distribution, grounding, bonding, and battery installations we design.",
      },
      {
        code: "ASCE 7",
        desc: "Provides wind, ice, and seismic load parameters used together with TIA-222 and for building and foundation design.",
      },
      {
        code: "IBC",
        desc: "The International Building Code governs shelters, equipment buildings, and rooftop structural modifications for local permitting.",
      },
      {
        code: "ATIS / Telcordia GR-standards",
        desc: "Telecommunications industry practices for DC power, grounding, and environmental design that inform reliable, standards-based systems.",
      },
      {
        code: "NFPA 76",
        desc: "Addresses fire protection of telecommunications facilities, guiding detection and life-safety design in switch and central-office spaces.",
      },
    ],
    cta: "Send us your current and proposed antenna loading and site details and we'll return a structural analysis and coordinated engineering scope with a fee estimate.",
  },
];
