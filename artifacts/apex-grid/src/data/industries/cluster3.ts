import type { Industry } from "./types";

export const CLUSTER3_INDUSTRIES: Industry[] = [
  {
    slug: "life-science-cleanroom-engineering",
    name: "Life Science",
    cluster: 3,
    title: "Life Science & Clean Room Engineering | Specialized Lab MEP",
    meta: "Specialized engineering for biotech and pharmaceutical spaces. Clean room design, laboratory gas piping, and vibration-sensitive structural engineering.",
    h1: "Life Science, Biotech & Pharmaceutical Laboratory Engineering",
    h2: "Ultra-Precise Environmental Controls for Sensitive Scientific Research",
    cardBlurb:
      "Integrated MEP and structural engineering for cleanrooms, GMP suites, and research laboratories where environmental precision defines the science.",
    intro: [
      "Life science facilities demand tolerances ordinary buildings never confront: single-digit particle counts, temperature stability within a fraction of a degree, cascading pressurization, and slabs quiet enough for electron microscopy. A cleanroom or GMP suite is a coordinated system of airflow, containment, structural stiffness, and utility distribution that must hold setpoints continuously while operators, product, and materials move through airlocks and gowning sequences.",
      "Meeting those requirements requires the mechanical, electrical, plumbing, structural, and geotechnical scopes to be resolved together. Air-change rates drive duct sizing, which drives ceiling depth and framing, which interacts with instrument vibration criteria and in turn shapes foundation design. As an integrated firm we design these interactions as a single problem, delivering permit-ready packages calibrated to ISO 14644 classifications, cGMP expectations, and the applicable building and mechanical codes."
    ],
    specialties: [
      {
        heading: "ISO-Classified Clean Room Ventilation & HEPA Filtration Systems",
        body:
          "We design cleanroom air systems to ISO 14644-1 classifications, translating the target class into air-change rates, unidirectional or non-unidirectional airflow, and terminal HEPA or ULPA coverage. Fan-filter units or ducted terminal filters are selected against ceiling coverage ratios and challenged to IEST-RP-CC034 leak-test criteria. Pressurization cascades are modeled so cleaner spaces hold positive differentials, typically 5 to 15 Pa between adjacent classifications, with airlocks and interlocked doors preserving the gradient. Recovery-time analysis confirms the room returns to classification after a disturbance. Mechanical selections address latent load, low relative-humidity setpoints, and the reheat needed for tight temperature control, coordinated with ASHRAE 170 and mechanical-code exhaust and make-up air requirements."
      },
      {
        heading: "Specialized Laboratory Gas Piping & Fume Hood Exhaust Infrastructure",
        body:
          "Lab and process gas distribution is engineered under NFPA 55 and NFPA 45, with cylinder quantities checked against maximum allowable quantities per control area. We specify point-of-use regulators, purge and vacuum-break provisions, seismic bracing, and material compatibility for high-purity, corrosive, or pyrophoric gases. Fume hood exhaust is sized to maintain 80 to 120 fpm average face velocity, ducted in corrosion-resistant materials, and manifolded or dedicated by chemical segregation. Exhaust stacks are located using ANSI/AIHA Z9.5 dilution and re-entrainment criteria so plumes clear intakes. VAV hood controls, snorkels, and emergency ventilation integrate with the building automation and life-safety interlocks."
      },
      {
        heading: "Vibration-Isolated Structural Slabs for Precision Instrumentation",
        body:
          "Electron microscopes, mass spectrometers, and metrology tools impose vibration limits far below normal occupancy thresholds, often expressed as VC curves (VC-A through VC-E) in micro-inches per second. We evaluate ambient floor velocity, then design slabs and framing to meet the instrument criteria, using thickened slabs-on-grade, isolated inertia bases, or independent foundations decoupled from the building. Analysis addresses footfall response, rotating-equipment forcing frequencies, and natural frequencies to avoid resonance, typically keeping floor frequencies above 8 to 12 Hz for sensitive zones. Where existing structures are reused, we model added stiffness and mass and place mechanical equipment so pumps, air handlers, and chillers do not transmit unacceptable energy into research floors."
      }
    ],
    disciplines: [
      {
        name: "Structural Engineering",
        href: "/services/structural",
        body: [
          "Structural design for life science facilities balances heavy MEP loading, tall interstitial ceilings, and stringent vibration criteria. We size framing for rooftop and interstitial dead loads, walkable ceilings, and dense utility racks, while tuning floor stiffness to the VC vibration class each research zone requires.",
          "We also detail penetrations, pads, and supports so seismic bracing per ASCE 7 and mechanical anchorage do not compromise cleanroom envelopes or containment barriers."
        ],
        highlights: [
          "Floor vibration analysis to VC-A through VC-E criteria",
          "Framing for interstitial and rooftop mechanical loads",
          "Isolated inertia bases and independent instrument foundations",
          "Seismic anchorage of tanks, gas systems, and equipment per ASCE 7"
        ]
      },
      {
        name: "MEP Engineering",
        href: "/services/mep",
        body: [
          "MEP is the heart of a life science project. We design cleanroom air systems, humidity and temperature control, pressurization cascades, and HEPA distribution alongside process cooling, WFI or lab-water systems, and specialty gas piping.",
          "Electrical scope covers redundant power for critical loads, standby distribution, and building-automation integration for continuous environmental monitoring and alarming."
        ],
        highlights: [
          "ISO 14644 cleanroom airflow and HEPA/ULPA layouts",
          "Room pressurization cascades and airlock interlocks",
          "NFPA 55/45 gas piping and fume hood exhaust design",
          "Redundant power, standby generation, and BAS monitoring",
          "Tight temperature/humidity control with reheat"
        ]
      },
      {
        name: "Civil Engineering",
        href: "/services/civil",
        body: [
          "Civil scope supports campus utility demand, chemical and hazardous-materials handling, and process-waste management. We design site grading, stormwater controls, and utility services sized for high mechanical and process loads, with spill containment and neutralization where regulated effluent is generated.",
          "We coordinate loading docks, gas and cryogenic yard layouts, and emergency-vehicle access to keep operations and deliveries flowing safely."
        ],
        highlights: [
          "Site utilities sized for high process and cooling demand",
          "Stormwater management and NPDES-compliant controls",
          "Chemical spill containment and pH neutralization",
          "Cryogenic and bulk-gas yard site planning"
        ]
      },
      {
        name: "Geotechnical Engineering",
        body: [
          "Geotechnical work establishes the foundation and slab support parameters that vibration-sensitive facilities depend on. We evaluate subgrade stiffness, settlement potential, and dynamic soil response so that instrument foundations and slabs-on-grade achieve their target performance.",
          "Recommendations cover allowable bearing, modulus of subgrade reaction, and mitigation of expansive or compressible soils that could disturb precision floors."
        ],
        highlights: [
          "Subsurface exploration and settlement analysis",
          "Modulus of subgrade reaction for precision slabs",
          "Dynamic soil response for vibration-critical zones",
          "Foundation recommendations for isolated equipment bases"
        ]
      }
    ],
    facilityTypes: [
      "Biotech and pharmaceutical research laboratories",
      "cGMP manufacturing and fill-finish suites",
      "ISO-classified cleanrooms and gowning suites",
      "BSL-2 and BSL-3 containment laboratories",
      "Vivarium and animal research facilities",
      "Analytical and QC laboratories",
      "Cell and gene therapy production spaces",
      "Metrology and precision-instrument labs"
    ],
    projectTypes: [
      "New laboratory and manufacturing construction",
      "Lab and cleanroom tenant improvements",
      "GMP suite fit-outs and renovations",
      "Facility expansions and process line additions",
      "Adaptive reuse of commercial shells into lab space"
    ],
    deliverables: [
      "Permit-ready, PE-sealed MEP and structural drawings",
      "Cleanroom airflow and pressurization calculations",
      "HVAC load, humidity, and reheat calculation packages",
      "Gas piping and fume-hood exhaust design and specs",
      "Floor vibration analysis reports (VC criteria)",
      "Electrical one-line diagrams and standby power studies",
      "Equipment anchorage and seismic bracing details",
      "RFI responses and construction-administration support"
    ],
    compliance: [
      {
        code: "ISO 14644-1",
        desc: "Classifies cleanroom air cleanliness by particle concentration, setting the airborne particle limits our ventilation and filtration design must achieve."
      },
      {
        code: "ASHRAE 170",
        desc: "Governs ventilation of health care and related laboratory spaces, informing air-change rates, pressurization, and filtration for controlled environments."
      },
      {
        code: "NFPA 55",
        desc: "Regulates compressed gases and cryogenic fluids, controlling cylinder quantities, storage, and piping that we design for high-purity and hazardous gases."
      },
      {
        code: "NFPA 45",
        desc: "Establishes fire protection for laboratories using chemicals, driving fume hood, ventilation, and hazardous-material control-area design."
      },
      {
        code: "ANSI/AIHA Z9.5",
        desc: "Sets laboratory ventilation standards including fume hood face velocity and exhaust stack dilution to prevent re-entrainment at air intakes."
      },
      {
        code: "IBC / ASCE 7",
        desc: "Provides the structural, seismic, and wind design basis, including equipment anchorage and load combinations for laboratory buildings."
      }
    ],
    cta:
      "Upload your cleanroom, lab, or GMP suite drawings and we'll return a scope and fee proposal calibrated to your ISO classification and process requirements."
  },
  {
    slug: "solar-renewable-energy-engineering",
    name: "Solar & Renewable Energy",
    cluster: 3,
    title: "Renewable Energy Engineering | Solar PV Structural Analysis",
    meta: "Clean energy engineering services. Specializing in rooftop/carport solar structural analysis, BESS, and utility interconnection.",
    h1: "Commercial Solar PV & Renewable Energy Engineering",
    h2: "Accelerating Decarbonization with Advanced Structural & Electrical Design",
    cardBlurb:
      "Structural and electrical engineering for rooftop, ground-mount, and carport PV, battery storage, and utility interconnection on commercial projects.",
    intro: [
      "Commercial solar and storage projects live at the intersection of structural loading and electrical power engineering. Every array adds dead load, wind uplift, and in some regions seismic demand to a roof or racking system, while the electrical design must convert, aggregate, and deliver power safely to the point of interconnection. Small errors in either scope surface late as failed plan checks, rejected interconnection applications, or roofs that cannot carry the added load, all of which erode a project's economics.",
      "We resolve the structural and electrical questions together so an array is sited where the roof or soil can support it and where the conductors, inverters, and switchgear can be routed efficiently. Our packages document wind and load appraisals to ASCE 7, PV electrical design to the National Electrical Code, and the coordination required for battery storage and utility interconnection. The result is a permit-ready, sealed design that survives both the building department and the utility's engineering review."
    ],
    specialties: [
      {
        heading: "Rooftop, Ground-Mount, and Carport PV Structural Load Appraisals",
        body:
          "Every mounting type imposes distinct structural demands we quantify under ASCE 7. For rooftop arrays we evaluate added dead load, wind uplift on modules and racking using roof zone pressure coefficients, and ballast or attachment forces, then verify existing framing and connections have capacity or design reinforcement. Ground-mount systems are analyzed for wind and, where governing, seismic and snow loads, with pile or footing embedment sized from geotechnical parameters. Carport canopies are treated as free-standing open structures with elevated wind exposure. We produce stamped appraisal letters and connection details, address roof-membrane compatibility, and confirm deflection and load combinations satisfy the IBC so reviewers can approve the array without requalification."
      },
      {
        heading: "Battery Energy Storage Systems (BESS) Integration & Thermal Management",
        body:
          "Battery storage design begins with siting and separation under NFPA 855 and UL 9540, including the large-scale fire test data of UL 9540A that governs unit spacing, enclosure ratings, and deflagration or explosion-control provisions. We coordinate equipment pads and anchorage, size the thermal management needed to hold cell temperatures within manufacturer limits, and design ventilation and gas detection for hazard mitigation. On the electrical side we integrate storage with the PV and building distribution, size DC and AC conductors and protection, and configure the power control system so combined PV-plus-storage output stays within interconnection limits. Fire-service access, signage, and emergency shutdown coordination round out a package that satisfies building and fire authorities."
      },
      {
        heading: "Medium-Voltage Distribution & Utility Interconnection Coordination",
        body:
          "Larger systems require medium-voltage collection and formal interconnection engineering. We design MV feeders, pad-mount transformers, and switchgear, and prepare the one-line diagrams, protection settings, and equipment ratings utilities require for review. Interconnection scope includes fault-current and voltage studies, anti-islanding and protective-relay coordination, and compliance with IEEE 1547 for distributed-resource interconnection plus the utility's specific requirements. We size conductors and overcurrent protection to the NEC, address rapid shutdown and labeling, and coordinate metering and revenue points. Where export limits apply, we specify the controls that keep the plant within its approved operating envelope, producing a package that moves efficiently through utility engineering."
      }
    ],
    disciplines: [
      {
        name: "Structural Engineering",
        href: "/services/structural",
        body: [
          "Structural engineering carries the weight of a solar project, literally. We analyze existing roof framing for added PV dead load and wind uplift, design attachment and ballast schemes, and reinforce members where capacity falls short.",
          "For ground-mount and carport systems we design racking foundations, moment connections, and lateral systems using ASCE 7 wind, seismic, and snow provisions, delivering sealed appraisals and connection details."
        ],
        highlights: [
          "Roof capacity analysis for added PV load and uplift",
          "Ballast and attachment design with membrane coordination",
          "Ground-mount pile and footing structural design",
          "Carport canopy lateral and connection design",
          "Sealed structural appraisal letters for permitting"
        ]
      },
      {
        name: "MEP Engineering",
        href: "/services/mep",
        body: [
          "The electrical scope covers the full PV power path: module string sizing, inverter selection, DC and AC conductor and overcurrent design, and point-of-interconnection engineering, all to the National Electrical Code.",
          "We prepare one-line diagrams, rapid-shutdown and labeling design, and the thermal management and detection systems that battery storage requires for safe operation."
        ],
        highlights: [
          "PV string sizing and inverter/DC-AC design per NEC",
          "One-line diagrams and overcurrent protection",
          "Rapid shutdown and PV labeling compliance",
          "BESS thermal management and gas detection",
          "Interconnection and revenue-metering coordination"
        ]
      },
      {
        name: "Civil Engineering",
        href: "/services/civil",
        body: [
          "Civil engineering shapes the site for ground-mount arrays and equipment yards. We design grading, access roads, and drainage that route stormwater around rows and inverter pads while controlling erosion during and after construction.",
          "We also address stormwater permitting, equipment pad siting, and site security fencing and access needed for utility-scale installations."
        ],
        highlights: [
          "Grading and drainage for array fields and pads",
          "Access road and equipment yard site design",
          "Erosion control and stormwater permitting",
          "Equipment pad siting and site security layout"
        ]
      },
      {
        name: "Geotechnical Engineering",
        body: [
          "Geotechnical investigation drives foundation design for ground-mount and carport structures. We evaluate soil strength, corrosivity, frost depth, and groundwater to recommend pile embedment, uplift and lateral capacities, and appropriate foundation types.",
          "Soil corrosivity and resistivity testing informs both foundation coatings and the electrical grounding design."
        ],
        highlights: [
          "Subsurface exploration for pile and footing design",
          "Lateral and uplift capacity recommendations",
          "Frost-depth and groundwater evaluation",
          "Soil resistivity and corrosivity for grounding"
        ]
      }
    ],
    facilityTypes: [
      "Commercial and industrial rooftop PV arrays",
      "Utility-scale and community ground-mount solar",
      "Solar carport and canopy structures",
      "Battery energy storage installations",
      "Solar-plus-storage microgrids",
      "Warehouse and distribution-center rooftops",
      "Agricultural and land-based solar sites",
      "EV-charging and solar-integrated facilities"
    ],
    projectTypes: [
      "New ground-mount and carport construction",
      "Rooftop PV additions to existing buildings",
      "Battery storage additions and retrofits",
      "System expansions and repowering",
      "Interconnection upgrades and reconfiguration"
    ],
    deliverables: [
      "PE-sealed structural appraisal letters and details",
      "Wind, snow, and seismic load calculation packages",
      "Electrical one-line and three-line diagrams",
      "PV string sizing and voltage-drop calculations",
      "BESS siting, separation, and hazard-mitigation plans",
      "Utility interconnection application packages",
      "Foundation and pile design recommendations",
      "RFI responses and construction-administration support"
    ],
    compliance: [
      {
        code: "ASCE 7",
        desc: "Defines wind, snow, and seismic loads for solar arrays and racking, forming the basis of our structural load appraisals."
      },
      {
        code: "NEC (NFPA 70)",
        desc: "Governs PV and energy-storage electrical design, including conductor sizing, overcurrent protection, grounding, and rapid shutdown."
      },
      {
        code: "NFPA 855",
        desc: "Sets installation requirements for stationary energy storage, including separation, ventilation, and fire-protection provisions we design to."
      },
      {
        code: "UL 9540 / 9540A",
        desc: "Certifies energy-storage systems and provides the large-scale fire-test data that drives BESS spacing and enclosure requirements."
      },
      {
        code: "IEEE 1547",
        desc: "Standardizes interconnection of distributed energy resources, guiding our anti-islanding, voltage, and protection coordination for utility approval."
      },
      {
        code: "IBC",
        desc: "Provides the structural and permitting framework, including load combinations and connection requirements for rooftop and site-mounted arrays."
      }
    ],
    cta:
      "Send us your roof plans or site layout and we'll return a scope and fee proposal covering structural appraisal, PV electrical design, and interconnection."
  },
  {
    slug: "ev-charging-automotive-engineering",
    name: "EV Charging & Automotive",
    cluster: 3,
    title: "EV Charging Station Engineering | Fleet Electrification Power",
    meta: "Commercial EV infrastructure and automotive facility engineering. DC fast-charger load studies and dealership MEP design.",
    h1: "EV Infrastructure & Automotive Facility Engineering",
    h2: "Preparing Automotive Facilities & Fleets for High-Output Electrification",
    cardBlurb:
      "Electrical, structural, and civil engineering for DC fast-charging sites, fleet depots, and automotive dealerships and service facilities.",
    intro: [
      "Electrifying transportation puts unprecedented demand on the electrical service. A single bank of DC fast chargers can require more power than an entire small commercial building, and fleet depots charging dozens of vehicles overnight can push existing services well past their limits. Getting these projects built means engineering the load study, service upgrade, and utility coordination correctly the first time, then supporting them with the structural and civil design that charger canopies, equipment pads, and site circulation require.",
      "Automotive facilities, from franchise dealerships to heavy-duty service centers, carry their own engineering demands: high-bay service bays, lifts and compressed-air systems, exhaust ventilation, and increasingly their own charging infrastructure. As an integrated firm we align the electrical, structural, civil, and geotechnical scopes so charging equipment, service capacity, and site layout are designed as one coordinated package that clears both the building department and the serving utility."
    ],
    specialties: [
      {
        heading: "DC Fast-Charging Power Distribution & Electrical Load Studies",
        body:
          "DC fast-charging design starts with a load study that establishes demand, diversity, and future capacity so the electrical service and distribution are sized correctly. We calculate connected and demand loads per NEC Article 220 and apply the EV-specific provisions of Article 625, including load-management systems that allow more chargers on a given service. Design covers medium- or low-voltage service, pad-mount transformers, switchgear, and feeder routing to charger dispensers, with fault-current and voltage-drop analysis confirming equipment ratings and performance at the far dispensers. We coordinate utility service upgrades early, prepare one-line diagrams and panel schedules, and address metering, disconnects, and the grounding and surge protection that high-power power-electronics equipment requires for reliable operation."
      },
      {
        heading: "Fleet Electrification Infrastructure & Grid Interconnection",
        body:
          "Fleet depots concentrate large charging loads that must be phased and managed. We model charging schedules and vehicle dwell times to right-size the service, then apply managed-charging and power-sharing strategies to flatten demand and reduce utility upgrade costs. Design addresses the make-ready infrastructure, including trenching, conduit, and stub-ups sized for future charger counts so capacity scales without rework. Where on-site generation, solar, or battery storage participate, we integrate them into the distribution and interconnection design and coordinate protection and export controls with the utility. Deliverables include load studies, one-lines, site electrical plans, and the interconnection documentation utilities require to approve services that may reach several megawatts."
      },
      {
        heading: "Dealership, Service Bay, and Maintenance Facility MEP Engineering",
        body:
          "Automotive dealerships and service centers combine showroom, office, parts, and heavy service environments, each with distinct MEP needs. Service bays require vehicle-exhaust extraction, compressed-air distribution, oil and lubricant delivery, and floor drainage with oil-water separators coordinated with plumbing code. We design HVAC that separates conditioned showroom air from bay ventilation, size electrical for lifts, welders, and diagnostic equipment, and provide the lighting levels service work demands. Structural scope supports lift loads, mezzanines, and equipment, while charging infrastructure for inventory and customer vehicles is integrated into the same service. The result is a coordinated package addressing IBC occupancy separations, ventilation rates, and the specialized systems that keep an automotive operation running."
      }
    ],
    disciplines: [
      {
        name: "Structural Engineering",
        href: "/services/structural",
        body: [
          "Structural scope covers charger canopies, equipment pads, and the framing that supports service-facility loads. We design canopy foundations and lateral systems for wind and seismic demand and detail housekeeping pads and anchorage for transformers and switchgear.",
          "In service facilities we engineer for vehicle-lift reactions, mezzanine loads, and heavy equipment, and design bollard and barrier protection at charging stalls."
        ],
        highlights: [
          "Charger canopy foundation and lateral design",
          "Transformer and switchgear pad and anchorage",
          "Vehicle-lift and mezzanine load framing",
          "Bollard and impact-protection design at stalls"
        ]
      },
      {
        name: "MEP Engineering",
        href: "/services/mep",
        body: [
          "Electrical is the primary discipline for EV projects: load studies, service and feeder sizing, one-line development, and load-management design per NEC Articles 220 and 625.",
          "For automotive facilities we add service-bay ventilation and vehicle-exhaust systems, compressed-air and lubricant distribution, oil-water separation, and HVAC that separates showroom from shop environments."
        ],
        highlights: [
          "EV load studies and NEC 625 charging design",
          "Service upgrades, one-lines, and panel schedules",
          "Managed charging and power-sharing strategies",
          "Vehicle-exhaust and service-bay ventilation",
          "Compressed-air, lubricant, and oil-water systems"
        ]
      },
      {
        name: "Civil Engineering",
        href: "/services/civil",
        body: [
          "Civil engineering organizes the site for charging and vehicle flow. We design grading and paving for charger stalls, drive-through fast-charging lanes, and truck circulation, along with drainage and ADA-accessible routes.",
          "We coordinate make-ready trenching and conduit, transformer pad siting, and stormwater management for expanded impervious areas."
        ],
        highlights: [
          "Site layout for charging stalls and vehicle circulation",
          "Grading, paving, and ADA accessible routing",
          "Make-ready trenching and conduit coordination",
          "Stormwater management and drainage design"
        ]
      },
      {
        name: "Geotechnical Engineering",
        body: [
          "Geotechnical work supports canopy foundations, equipment pads, and heavy pavements. We evaluate subgrade strength, settlement, and frost depth to recommend foundation types and pavement sections for truck and vehicle traffic.",
          "Recommendations address bearing and lateral resistance for canopy footings and deep foundations required by site soils."
        ],
        highlights: [
          "Subsurface exploration and bearing recommendations",
          "Pavement section design for vehicle and truck loads",
          "Foundation design for canopies and equipment pads",
          "Frost-depth and settlement evaluation"
        ]
      }
    ],
    facilityTypes: [
      "DC fast-charging and public charging stations",
      "Fleet and transit charging depots",
      "Franchise automobile dealerships",
      "Vehicle service and maintenance centers",
      "Truck stops and highway charging plazas",
      "Rideshare and last-mile delivery hubs",
      "Municipal and government fleet yards",
      "Multifamily and workplace charging installations"
    ],
    projectTypes: [
      "New charging-station and depot construction",
      "Charging additions to existing sites",
      "Dealership and service-facility renovations",
      "Service and electrical capacity expansions",
      "Make-ready and phased charging buildouts"
    ],
    deliverables: [
      "EV electrical load studies and demand calculations",
      "PE-sealed electrical and structural drawings",
      "One-line diagrams and panel schedules",
      "Utility service-upgrade coordination packages",
      "Charger-canopy and equipment-pad structural details",
      "Site electrical, grading, and drainage plans",
      "Make-ready conduit and trenching plans",
      "RFI responses and construction-administration support"
    ],
    compliance: [
      {
        code: "NEC Article 625",
        desc: "Covers electric-vehicle power-transfer systems, governing charger circuits, load management, and disconnecting means in our EV designs."
      },
      {
        code: "NEC Article 220",
        desc: "Establishes load-calculation methods that drive our service and feeder sizing for charging and automotive electrical systems."
      },
      {
        code: "IBC / ASCE 7",
        desc: "Provides structural, wind, and seismic design for charger canopies, equipment pads, and automotive facility framing."
      },
      {
        code: "IMC",
        desc: "Sets mechanical ventilation requirements including vehicle-exhaust removal and outdoor-air rates for service bays and repair garages."
      },
      {
        code: "IPC / UPC",
        desc: "Governs plumbing including oil-water separators, floor drainage, and interceptors required in automotive service environments."
      },
      {
        code: "ADA / ICC A117.1",
        desc: "Requires accessible charging stalls and routes, which we incorporate into site layout and clearance design."
      }
    ],
    cta:
      "Share your site plan or facility drawings and we'll return a scope and fee proposal covering EV load studies, service coordination, and site design."
  },
  {
    slug: "agriculture-cannabis-facility-engineering",
    name: "Agriculture & Cannabis",
    cluster: 3,
    title: "Controlled Environment Agriculture (CEA) Engineering | Cannabis",
    meta: "Engineering services for commercial greenhouses and indoor grow spaces. Specializing in high-density cultivation HVAC and extraction room safety.",
    h1: "Controlled Environment Agriculture (CEA) & Cannabis Facility Engineering",
    h2: "Maximizing Crop Yields through High-Performance Cultivation Infrastructure",
    cardBlurb:
      "Integrated MEP, structural, and civil engineering for indoor grow rooms, greenhouses, and cannabis processing and extraction facilities.",
    intro: [
      "Controlled environment agriculture pushes buildings to hold conditions that ordinary occupancies never sustain: high plant transpiration loads, tight temperature and humidity bands through day and night cycles, elevated CO2 enrichment, and lighting densities that dump enormous heat into the space. A grow room's yield and its resistance to mold and pathogens depend directly on how well the mechanical, electrical, and plumbing systems manage latent load, airflow, and irrigation water, making MEP the decisive discipline in cultivation design.",
      "Cannabis facilities add a regulatory layer, particularly where solvent-based extraction introduces hazardous locations that demand rigorous electrical classification and code coordination. We engineer cultivation, processing, and extraction spaces as an integrated package so dehumidification, power density, fertigation, and hazardous-area classification all work together. Our sealed drawings and calculations satisfy the building, mechanical, electrical, and fire codes that authorities apply to these fast-evolving facility types."
    ],
    specialties: [
      {
        heading: "High-Density Dehumidification & Precision HVAC Zoning for Indoor Grow Rooms",
        body:
          "Indoor cultivation generates latent loads that dwarf a room's sensible load because mature plants transpire most of the water they receive. We calculate transpiration-driven moisture removal, often several pints per light per day, and size dedicated dehumidification and cooling to hold vapor-pressure-deficit targets through lights-on and lights-off cycles. HVAC is zoned by growth stage so veg, flower, and drying rooms maintain independent temperature, humidity, and CO2 setpoints, with controls sequenced to prevent condensation on surfaces during transitions. We address the sensible heat rejected by high-intensity lighting, integrate CO2 enrichment safely with ventilation and detection, and select equipment for the continuous, high-hour-of-operation duty these rooms impose, all designed to the mechanical code and ASHRAE load-calculation methods."
      },
      {
        heading: "Automated Fertigation Plumbing & Water Reclamation Systems",
        body:
          "Fertigation systems deliver nutrient-dosed water on precise schedules, requiring plumbing engineered for flow, pressure, and backflow protection. We design supply, dosing, and distribution piping to the plumbing code, including reduced-pressure backflow assemblies that isolate nutrient solutions from the potable supply. Drainage and condensate collection are sized to capture the substantial water grow rooms shed, and we design reclamation and treatment where growers recirculate runoff to cut water use and manage nutrient discharge. Trench drains, floor slopes, and cleanable finishes support sanitation, while chemical storage and mixing areas receive containment and appropriate ventilation. The design balances agronomic requirements with code-mandated cross-connection control and any regulated wastewater or nutrient-discharge limits the site must meet."
      },
      {
        heading: "Class 1 Division 1 (C1D1) Hazardous Extraction Space Code Coordination",
        body:
          "Solvent-based extraction using butane, propane, or ethanol creates flammable atmospheres that trigger hazardous-location classification. We coordinate the C1D1 or C1D2 electrical area classification per NEC Article 500, specify explosion-proof or purged equipment, and design the exhaust ventilation, gas detection, and interlocks that limit accumulation and shut down equipment on alarm. Design follows NFPA 30 for flammable liquids and the applicable provisions of the fire and building codes governing hazardous-material quantities and control areas, including whether a listed extraction booth or a built rated room is used. We address egress, fire separation, emergency power to detection and exhaust, and pressure or deflagration relief where required, producing a coordinated package that a fire marshal and building official can approve."
      }
    ],
    disciplines: [
      {
        name: "Structural Engineering",
        href: "/services/structural",
        body: [
          "Structural scope supports the heavy mechanical loads, vertical racking, and rooftop equipment cultivation facilities require. We design framing for dense HVAC and dehumidifier loads, multi-tier grow racks, and irrigation-tank weights.",
          "For greenhouses and headhouses we address wind and snow loading on lightweight structures, and we design equipment platforms, mezzanines, and anchorage for processing and extraction rooms."
        ],
        highlights: [
          "Framing for rooftop HVAC and dehumidification loads",
          "Vertical grow-rack and mezzanine structural design",
          "Greenhouse wind and snow load analysis",
          "Equipment anchorage for extraction and processing"
        ]
      },
      {
        name: "MEP Engineering",
        href: "/services/mep",
        body: [
          "MEP drives cultivation performance. We design high-capacity dehumidification, zoned HVAC by growth stage, CO2 enrichment and detection, and the high-density electrical distribution that grow lighting demands.",
          "Plumbing scope covers fertigation, backflow protection, condensate capture, and reclamation, while extraction spaces receive hazardous-area electrical classification, exhaust, and gas detection."
        ],
        highlights: [
          "Latent-load HVAC and high-capacity dehumidification",
          "Zoned climate control by growth stage",
          "High-density electrical for grow lighting",
          "Fertigation plumbing and backflow protection",
          "C1D1 electrical classification and gas detection"
        ]
      },
      {
        name: "Civil Engineering",
        href: "/services/civil",
        body: [
          "Civil engineering supports site utilities, water supply and discharge, and expanded impervious areas for cultivation campuses. We design grading, drainage, and stormwater controls and coordinate high water-demand services.",
          "Where nutrient-laden runoff or process wastewater is regulated, we design containment and treatment approaches and coordinate discharge permitting."
        ],
        highlights: [
          "Site utilities sized for high water demand",
          "Grading, drainage, and stormwater management",
          "Process-wastewater containment and treatment",
          "Site access and security layout for licensed sites"
        ]
      },
      {
        name: "Geotechnical Engineering",
        body: [
          "Geotechnical investigation establishes foundation and slab support for heavy cultivation equipment and racking. We evaluate subgrade strength and settlement to recommend slab and foundation designs for concentrated loads.",
          "Recommendations cover bearing capacity, subgrade preparation, and moisture considerations for the wet, high-humidity floor environments cultivation creates."
        ],
        highlights: [
          "Subsurface exploration and bearing analysis",
          "Slab-on-grade support for heavy racking loads",
          "Settlement evaluation under concentrated equipment",
          "Subgrade and moisture recommendations"
        ]
      }
    ],
    facilityTypes: [
      "Indoor cultivation and grow rooms",
      "Commercial and research greenhouses",
      "Vertical-farming and CEA production facilities",
      "Cannabis processing and drying rooms",
      "Solvent and CO2 extraction laboratories",
      "Post-harvest, packaging, and storage areas",
      "Nursery and propagation rooms",
      "Warehouse conversions to cultivation use"
    ],
    projectTypes: [
      "New cultivation and processing construction",
      "Warehouse and building conversions to grow use",
      "Extraction and processing tenant improvements",
      "Facility expansions and canopy additions",
      "Adaptive reuse of industrial shells"
    ],
    deliverables: [
      "PE-sealed MEP and structural drawings",
      "HVAC latent-load and dehumidification calculations",
      "Electrical one-line diagrams and load calculations",
      "Fertigation and plumbing design and specs",
      "Hazardous-area classification drawings for extraction",
      "Gas detection, exhaust, and interlock design",
      "Structural framing and equipment-anchorage details",
      "RFI responses and construction-administration support"
    ],
    compliance: [
      {
        code: "NEC Article 500",
        desc: "Governs classification of hazardous locations, guiding the C1D1/C1D2 electrical design for solvent-based extraction spaces."
      },
      {
        code: "NFPA 30",
        desc: "Regulates flammable and combustible liquids, controlling storage, ventilation, and layout for extraction operations using solvents."
      },
      {
        code: "IMC / ASHRAE",
        desc: "Sets ventilation and load-calculation methods for the high latent loads, CO2 enrichment, and dehumidification of grow rooms."
      },
      {
        code: "IPC / UPC",
        desc: "Governs plumbing including backflow prevention for fertigation and drainage for high-runoff cultivation environments."
      },
      {
        code: "IFC",
        desc: "Establishes fire-code hazardous-material quantities and control-area limits that shape extraction and storage room design."
      },
      {
        code: "IBC / ASCE 7",
        desc: "Provides structural, seismic, and wind design for cultivation buildings, racking, and rooftop mechanical equipment."
      }
    ],
    cta:
      "Upload your cultivation or extraction facility drawings and we'll return a scope and fee proposal covering climate-control MEP, fertigation, and hazardous-area code coordination."
  }
];
