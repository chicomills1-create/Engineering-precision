import type { Industry } from "./types";

export const CLUSTER4_INDUSTRIES: Industry[] = [
  {
    slug: "tenant-improvement-engineering",
    name: "Tenant Improvement",
    cluster: 4,
    title: "Commercial Tenant Improvement (TI) Engineering | Rapid MEP",
    meta: "Fast-turnaround engineering modifications for commercial fit-outs. Fast-track structural and MEP solutions for retail, office, and dining reconfigurations.",
    h1: "Commercial Tenant Improvement (TI) Engineering Services",
    h2: "Agile, Accurate Structural & MEP Retrofits for Tenant Fit-Outs",
    cardBlurb:
      "Fast-track structural and MEP engineering for commercial fit-outs, tie-ins to base-building systems, and permit-ready TI packages across office, retail, and dining spaces.",
    intro: [
      "Tenant improvement projects live and die by schedule: once a lease is signed, every day of vacancy is lost rent. Yet the engineering underneath a fit-out is rarely simple. Existing conditions are often undocumented, base-building capacity is finite, and structure was designed for a prior use. A team that surveys conditions and coordinates structural, MEP, and code in one pass avoids the back-and-forth that stalls a TI.",
      "Apex Grid engineers TI work as a single coordinated package. We verify panel and duct capacity before committing loads, evaluate the structure before cutting openings, and align every drawing with the governing code edition and the landlord's design criteria. The result is a permit-ready set that reviewers approve on the first pass and contractors can build without RFIs stacking up.",
    ],
    specialties: [
      {
        heading:
          "Rapid-Turnaround Mechanical, Electrical, and Plumbing Space Modifications",
        body: "TI MEP work begins with verifying what the base building can deliver. We check circuit capacity against the panel schedule and NEC Article 220 load calculations before adding branch circuits, transformers, or dedicated equipment feeds. Mechanically, we confirm existing VAV or rooftop unit tonnage and duct static pressure can serve the new layout, resizing distribution and rebalancing zones under ASHRAE 62.1 ventilation rates. Plumbing modifications trace back to existing waste, vent, and water stubs, with IPC or UPC fixture-unit calculations for drain slope and supply sizing. Every modification is documented against as-found conditions.",
      },
      {
        heading:
          "Structural Openings, Demolition Appraisals, and Storefront Reconfigurations",
        body: "Cutting a new opening in an existing floor, wall, or storefront requires understanding the original load path. We field-verify framing, review available drawings, and analyze gravity and lateral demands under IBC and ASCE 7 before specifying headers, needle beams, or supplemental columns. Demolition appraisals identify bearing versus partition walls, whether shear elements are affected, and what temporary shoring protects the structure. Storefront reconfigurations involve new glazing loads, wind pressures, and connection back to existing framing. We provide sealed calculations and framing details for confident demolition and rebuild.",
      },
      {
        heading:
          "Local Code & Landlord Guideline Alignment across Office and Retail Assets",
        body: "A TI must satisfy two overlapping rulebooks: the jurisdiction's adopted codes and the landlord's design criteria. We confirm the governing IBC edition, occupancy classification, and change-of-occupancy triggers that require accessibility upgrades under the ADA Standards and IBC Chapter 11, or fire-alarm and sprinkler modifications under NFPA 13 and NFPA 72. Energy compliance is documented against the adopted energy code, typically IECC or ASHRAE 90.1. We also design to the landlord's criteria for tie-in points, submetering, roof penetrations, and after-hours HVAC. Aligning both up front prevents redesign during plan review.",
      },
    ],
    disciplines: [
      {
        name: "Structural Engineering",
        href: "/services/structural",
        body: [
          "TI structural scope means working within an existing frame, not designing a new one. We evaluate floor capacity for new equipment, file rooms, or assembly loads; design openings in slabs and walls; and detail connections that transfer load into the existing gravity and lateral systems without overstressing them.",
          "Where documentation is missing, we field-verify member sizes and material and check reserve capacity before adding demand. Sealed calculations accompany each modification.",
        ],
        highlights: [
          "Floor load evaluations for new equipment, storage, and assembly uses",
          "New openings in slabs, roofs, and demising walls with header design",
          "Rooftop unit and screen-wall support framing and connections",
          "Temporary shoring plans for demolition sequencing",
          "Existing-condition field verification and reserve-capacity checks",
        ],
      },
      {
        name: "MEP Engineering",
        href: "/services/mep",
        body: [
          "MEP is the core of most TIs. We reconfigure HVAC zoning and distribution to match the new plan, add or relocate circuits and panels within available capacity, and modify plumbing for new restrooms, break rooms, or process equipment.",
          "Designs are coordinated with base-building systems and submetering so utility billing, controls, and after-hours operation function as the landlord intends.",
        ],
        highlights: [
          "HVAC zoning, VAV reconfiguration, and duct redesign to ASHRAE 62.1",
          "Panel and circuit load studies per NEC Article 220",
          "Lighting layouts and controls compliant with the adopted energy code",
          "Plumbing modifications with IPC/UPC fixture-unit sizing",
          "Fire alarm and sprinkler tie-ins per NFPA 72 and NFPA 13",
        ],
      },
      {
        name: "Civil Engineering",
        href: "/services/civil",
        body: [
          "Most interior TIs need no civil work, but ground-floor and end-cap tenants often do. New exterior doors, patios, trash enclosures, grease-interceptor access, or ADA path-of-travel upgrades trigger site design.",
          "We handle accessibility routes, minor grading and drainage at new entries, and coordination with the property's existing utilities so exterior modifications integrate cleanly with the base site.",
        ],
        highlights: [
          "ADA accessible route and parking upgrades at tenant entries",
          "Site drainage and grading at new patios or service areas",
          "Utility service connections and grease-interceptor coordination",
          "Trash enclosure and equipment pad site details",
        ],
      },
      {
        name: "Geotechnical Engineering",
        body: [
          "Geotechnical involvement in TI work is limited but occasionally decisive. When a tenant adds heavy equipment, a mezzanine, or a new exterior slab, we confirm that existing foundations and subgrade can carry the added load.",
          "For any new footing or slab-on-grade extension, we coordinate bearing-capacity and settlement expectations so the structural design reflects real soil behavior rather than assumed values.",
        ],
        highlights: [
          "Bearing-capacity confirmation for added equipment or mezzanine loads",
          "Subgrade evaluation for new exterior slabs and pads",
          "Coordination of allowable bearing pressures with structural design",
        ],
      },
    ],
    facilityTypes: [
      "Corporate and professional office suites",
      "Inline retail and shopping-center spaces",
      "End-cap and pad restaurant build-outs",
      "Medical and dental office fit-outs",
      "Fitness and studio spaces",
      "Salon, spa, and personal-service suites",
      "Warehouse and flex-space office conversions",
      "Coworking and shared-workspace layouts",
    ],
    projectTypes: [
      "First-generation tenant build-outs (shell to finished)",
      "Second-generation fit-outs and reconfigurations",
      "Interior renovations and refreshes",
      "Change-of-occupancy conversions",
      "Suite combinations and demising",
    ],
    deliverables: [
      "Permit-ready, PE-sealed TI drawing sets",
      "Structural calculations for openings and added loads",
      "MEP load studies and panel schedules",
      "HVAC zoning and ventilation compliance documentation",
      "Energy code compliance forms (COMcheck / Title 24 as applicable)",
      "Existing-conditions survey and demolition plans",
      "RFI responses and construction administration support",
    ],
    compliance: [
      {
        code: "IBC",
        desc: "The International Building Code governs occupancy classification, egress, and change-of-use provisions that determine what upgrades a TI must include.",
      },
      {
        code: "ADA Standards / IBC Ch. 11",
        desc: "Federal accessibility standards and IBC Chapter 11 dictate accessible routes, restrooms, and reach ranges that fit-outs must meet or upgrade toward.",
      },
      {
        code: "IECC / ASHRAE 90.1",
        desc: "The adopted energy code sets envelope, lighting-power-density, and HVAC efficiency requirements documented for every TI permit.",
      },
      {
        code: "IPC / UPC",
        desc: "The plumbing code establishes fixture counts and drain, waste, and vent sizing for restrooms, break rooms, and process fixtures added during a fit-out.",
      },
      {
        code: "NFPA 13 / NFPA 72",
        desc: "Sprinkler and fire-alarm standards govern the head relocations and device modifications required when partitions and ceilings change.",
      },
      {
        code: "NEC (NFPA 70)",
        desc: "The National Electrical Code governs branch-circuit sizing, panel capacity, and grounding for all electrical modifications in the tenant space.",
      },
    ],
    cta: "Upload your lease outline drawings and landlord criteria, and our team will return a same-week scope and fee review to keep your tenant improvement on schedule.",
  },
  {
    slug: "commercial-office-engineering",
    name: "Commercial Office",
    cluster: 4,
    title: "Commercial Office Building Engineering | Core & Shell MEP",
    meta: "Scalable engineering designs for corporate offices and commercial real estate. Innovative core-and-shell designs configured for future tenant adaptation.",
    h1: "Core-and-Shell & Tenant-Ready Commercial Office Engineering",
    h2: "Sustainable, Adaptive Working Environments Built to Lower Operating Costs",
    cardBlurb:
      "Core-and-shell structural and MEP engineering for corporate offices, designed with flexible floor plates and efficient HVAC that adapt to future tenants and lower operating costs.",
    intro: [
      "A commercial office building is a long-term asset that must serve tenants no one has met yet. Core-and-shell engineering has to anticipate a wide range of future fit-outs, provide enough distributed capacity for high-density workspaces, and do it all without over-building the base systems and destroying the pro forma. The balance between flexibility and cost is an engineering problem as much as a design one, and it demands structural, mechanical, and electrical systems that were coordinated from the first sketch.",
      "Apex Grid designs office cores and shells for adaptability and operating efficiency. We size structure for realistic future loads, we plan HVAC and electrical distribution so tenant improvements tie in cleanly at predictable points, and we target energy performance that lowers utility costs and supports leasing. By coordinating disciplines around the leasable floor plate, we help owners deliver a building that shows well to prospective tenants and continues to perform economically across decades of changing use.",
    ],
    specialties: [
      {
        heading:
          "Flexible Floor Plates Configured for Seamless Future Workspace Reconfiguration",
        body: "Flexibility starts in the structure. We favor longer, column-free spans and consistent bay spacing so tenants can lay out open floors, private offices, or hybrid plans without fighting the grid. Floor systems are designed to a live load and partition allowance under ASCE 7 that supports dense occupancy and future file or storage zones, and we address floor vibration using AISC Design Guide 11 criteria so walking and equipment don't create perceptible motion. Vertical shafts, riser locations, and knock-out panels are planned so future stairs, supplemental risers, or interconnecting floor openings can be added economically. The goal is a floor plate that accepts tomorrow's tenant without structural surprises.",
      },
      {
        heading:
          "Energy-Efficient VAV & VRF HVAC Systems with Decentralized Air Controls",
        body: "Office HVAC must balance first cost, tenant control, and operating efficiency. We evaluate variable-air-volume systems with central air handlers against variable-refrigerant-flow systems with distributed zoning, sizing each with load models and ASHRAE 62.1 ventilation and 90.1 efficiency criteria. VAV designs use pressure-independent boxes, demand-controlled ventilation, and airside economizers to cut fan and cooling energy; VRF designs offer decentralized zone control and simultaneous heating and cooling for varied exposures. Either way, we plan capacity and tie-in points so tenant improvements add zones without overloading the base plant, and we integrate the building automation system so operators can trend, schedule, and optimize performance across the whole asset.",
      },
      {
        heading:
          "Integrated Telecommunications, Power, and Enterprise Lighting Infrastructures",
        body: "Modern offices run on connectivity and power density that legacy buildings never anticipated. We design electrical distribution with spare capacity and clean tie-in points so tenant panels and dedicated equipment feeds install predictably, all sized per NEC Article 220. Telecom and low-voltage pathways—main and intermediate distribution frame rooms, riser conduits, and cable tray—are laid out to structured-cabling standards so IT vendors can build to any tenant's requirements. Lighting is designed to the adopted energy code's lighting-power-density limits with networked controls, daylight harvesting, and occupancy sensing that reduce load. Together these systems give the base building the digital and electrical backbone that today's tenants expect.",
      },
    ],
    disciplines: [
      {
        name: "Structural Engineering",
        href: "/services/structural",
        body: [
          "The office structure defines leasing flexibility. We design efficient gravity systems—composite steel or post-tensioned concrete—for long spans and shallow depths, and lateral systems sized for wind and seismic demand under ASCE 7.",
          "Floor vibration, future opening allowances, and rooftop mechanical support are all built into the base design so tenant improvements rarely need structural intervention.",
        ],
        highlights: [
          "Long-span composite steel or post-tensioned concrete floor framing",
          "Lateral system design for wind and seismic per ASCE 7",
          "Floor vibration control to AISC Design Guide 11",
          "Rooftop mechanical dunnage and screen support",
          "Planned knock-out zones for future stairs and floor openings",
        ],
      },
      {
        name: "MEP Engineering",
        href: "/services/mep",
        body: [
          "MEP defines the building's operating cost and tenant appeal. We design central or distributed HVAC with efficient controls, size electrical service and distribution with spare tenant capacity, and plan plumbing cores and restrooms for the projected occupancy.",
          "Base-building fire alarm, life-safety, and standby systems are engineered to serve any future tenant layout without redesign.",
        ],
        highlights: [
          "VAV or VRF HVAC design to ASHRAE 62.1 and 90.1",
          "Electrical service, distribution, and tenant metering",
          "Building automation and demand-controlled ventilation",
          "Fire alarm and mass-notification per NFPA 72",
          "Domestic water, sanitary cores, and restroom design",
        ],
      },
      {
        name: "Civil Engineering",
        href: "/services/civil",
        body: [
          "Office sites must handle parking, access, drainage, and stormwater within the entitlement envelope. We design grading, utility connections, and fire-access routes, and integrate the building with surrounding circulation.",
          "Stormwater management is designed to local and NPDES requirements, with detention and water-quality features sized for the impervious area the development creates.",
        ],
        highlights: [
          "Site grading, paving, and parking layout",
          "Stormwater detention and water-quality design to NPDES",
          "Domestic, fire, and sanitary utility connections",
          "Fire-access and accessible-route design",
        ],
      },
      {
        name: "Geotechnical Engineering",
        body: [
          "Foundation design for mid- and high-rise office structures depends on subsurface conditions. We coordinate the geotechnical investigation to establish allowable bearing pressures, settlement limits, and any need for deep foundations under concentrated column and core loads.",
          "Seismic site class and lateral earth pressures from the report feed directly into the structural and below-grade design.",
        ],
        highlights: [
          "Bearing capacity and settlement analysis for column and core loads",
          "Shallow versus deep foundation recommendations",
          "Seismic site classification for ASCE 7 design",
          "Lateral earth pressures for below-grade and retaining elements",
        ],
      },
    ],
    facilityTypes: [
      "Multi-tenant corporate office towers",
      "Suburban low-rise office buildings",
      "Build-to-suit corporate headquarters",
      "Mixed-use office-over-retail podiums",
      "Medical office buildings (MOB)",
      "Flex and creative-office conversions",
      "Coworking and enterprise campus buildings",
    ],
    projectTypes: [
      "New core-and-shell construction",
      "Base-building repositioning and modernization",
      "Speculative and build-to-suit fit-outs",
      "Vertical and horizontal expansion",
      "Adaptive reuse to office occupancy",
    ],
    deliverables: [
      "PE-sealed core-and-shell structural drawings",
      "Structural calculation packages and lateral analysis",
      "MEP design drawings and specifications",
      "Electrical one-line diagrams and load calculations",
      "HVAC load models and energy code compliance documentation",
      "Site civil and stormwater plans",
      "RFI responses and construction administration support",
    ],
    compliance: [
      {
        code: "IBC",
        desc: "The International Building Code governs occupancy, egress, height and area, and fire-resistance requirements for business-occupancy office buildings.",
      },
      {
        code: "ASCE 7",
        desc: "Minimum Design Loads establishes the wind, seismic, snow, and live loads that size the office structural and lateral systems.",
      },
      {
        code: "ASHRAE 90.1",
        desc: "The energy standard sets envelope, HVAC, and lighting efficiency baselines that base-building systems must meet for code and certification.",
      },
      {
        code: "ASHRAE 62.1",
        desc: "The ventilation standard defines minimum outdoor-air rates that drive air-handler sizing and demand-controlled ventilation design.",
      },
      {
        code: "NFPA 72",
        desc: "The fire alarm and signaling code governs detection, notification, and mass-notification systems serving all building tenants.",
      },
      {
        code: "NEC (NFPA 70)",
        desc: "The National Electrical Code governs service sizing, distribution, grounding, and tenant metering throughout the office building.",
      },
    ],
    cta: "Share your massing, floor plates, or existing base-building drawings, and we'll deliver a coordinated scope and fee review for an adaptable, cost-efficient office asset.",
  },
  {
    slug: "retail-hospitality-engineering",
    name: "Retail & Hospitality",
    cluster: 4,
    title: "Retail & Hospitality Engineering | Aesthetic MEP Integration",
    meta: "Structural and MEP engineering for hotels, resorts, and major retail spaces. Concealed systems, architectural integration, and premium guest comfort.",
    h1: "Retail Centers & Luxury Hospitality Facility Engineering",
    h2: "Elegant Aesthetic Integration Combined with Seamless Facility Infrastructure",
    cardBlurb:
      "Structural and MEP engineering for hotels, resorts, and retail centers—concealed systems, quiet mechanical plant, and lighting that protects the brand's design intent.",
    intro: [
      "In retail and hospitality, the guest experience is the product, and engineering has to serve it invisibly. Diffusers, sprinkler heads, and lighting must disappear into the architecture; mechanical plant must be silent in occupied spaces; and every system has to hold up to heavy public use while never intruding on the brand concept. Achieving that requires disciplines that coordinate tightly around the ceiling, the wall, and the finish—resolving conflicts on paper long before they become visible defects in a flagship store or a five-star lobby.",
      "Apex Grid engineers retail and hospitality projects with aesthetic integration as a design constraint, not an afterthought. We route MEP to preserve clean ceilings and sightlines, we locate and isolate equipment to protect guestrooms and dining rooms from noise and vibration, and we design lighting and power layouts flexible enough to support merchandising changes and events. The outcome is infrastructure that performs reliably under demanding occupancy while remaining exactly where the guest never notices it.",
    ],
    specialties: [
      {
        heading:
          "Invisible MEP Systems Configured to Maintain Brand Concept Integrity",
        body: "Concealing MEP in premium spaces is a coordination discipline. We ceiling-coordinate ductwork, piping, conduit, and sprinkler mains against architectural reflected ceiling plans so linear diffusers, slot supplies, and flush-mount devices land exactly on the design grid. Fire-sprinkler layouts are planned early with the fire-protection contractor to place concealed and recessed heads per NFPA 13 without cluttering feature ceilings. Return air is handled through architectural grilles or plenum strategies that avoid visible grilles in guest sightlines. Where exposed structure is part of the concept, we detail routing and supports to look intentional. This upfront coordination prevents the field conflicts and visible patches that undermine a carefully designed retail or hospitality environment.",
      },
      {
        heading:
          "Multizone Guest Comfort Systems & Sound-Attenuated Mechanical Plant Layouts",
        body: "Comfort and quiet define hospitality. We design multizone HVAC—fan-coil, VRF, or four-pipe systems—so guestrooms, suites, lobbies, and dining venues each hold independent setpoints under ASHRAE 62.1 ventilation rates and 55 comfort criteria. Acoustic performance is engineered deliberately: mechanical rooms are located and constructed to control noise transfer, equipment is set on spring or neoprene vibration isolators, duct silencers and lined transitions manage airborne noise, and terminal units are selected to meet target NC criteria in occupied spaces. Guestroom-to-guestroom and corridor sound isolation is coordinated with the architect's STC assemblies so mechanical penetrations don't defeat the wall ratings. The result is comfort that guests feel and quiet they never have to think about.",
      },
      {
        heading:
          "Decorative Architectural Illumination & Flexible Power Layouts",
        body: "Lighting sells retail and sets the mood in hospitality, so we design it as both an aesthetic and technical system. Layered schemes combine ambient, accent, and decorative fixtures with dimming and scene control tuned for merchandising, dining, and event modes, all within the adopted energy code's lighting-power-density limits. Feature and decorative fixtures are coordinated for support, driver location, and access. On the power side, we distribute flexible floor boxes, poke-throughs, and reconfigurable circuits so displays, kiosks, and event layouts can change without electrical rework, sized per NEC Article 220. Emergency and egress lighting is integrated discreetly to satisfy life-safety requirements without disrupting the designed atmosphere.",
      },
    ],
    disciplines: [
      {
        name: "Structural Engineering",
        href: "/services/structural",
        body: [
          "Retail and hospitality structures range from big-box shells to multistory hotels. We design gravity and lateral systems under ASCE 7, accommodate large storefront glazing and open lobbies, and support heavy feature elements—chandeliers, canopies, green walls, and rooftop amenities.",
          "Openings for atriums, escalators, and interconnecting stairs are engineered into the frame so signature spaces are structurally sound and visually open.",
        ],
        highlights: [
          "Gravity and lateral framing for retail shells and hotel towers",
          "Storefront, curtain-wall, and canopy support design",
          "Feature-element support (chandeliers, signage, green walls)",
          "Atrium, escalator, and interconnecting-stair openings",
          "Rooftop pool, deck, and amenity structural support",
        ],
      },
      {
        name: "MEP Engineering",
        href: "/services/mep",
        body: [
          "MEP carries the guest experience. We design concealed, quiet multizone HVAC; layered architectural lighting with scene control; flexible power for displays and events; and domestic hot water sized for peak hospitality demand.",
          "Life-safety systems—fire alarm, sprinklers, and emergency power—are integrated to meet code while staying visually unobtrusive.",
        ],
        highlights: [
          "Multizone HVAC (fan-coil, VRF, four-pipe) with acoustic isolation",
          "Architectural and decorative lighting with dimming and scene control",
          "Flexible power distribution and floor-box layouts per NEC",
          "Central domestic hot water and recirculation for guest demand",
          "Concealed sprinkler and fire-alarm integration per NFPA 13 and 72",
        ],
      },
      {
        name: "Civil Engineering",
        href: "/services/civil",
        body: [
          "Guest arrival and site experience are engineered. We design parking, porte-cochere and drop-off geometry, service and delivery access, and pedestrian circulation, along with grading and utility connections.",
          "Stormwater is managed to local and NPDES standards, and site features like fountains, pools, and landscape drainage are coordinated with the overall grading design.",
        ],
        highlights: [
          "Porte-cochere, drop-off, and valet circulation geometry",
          "Parking, service access, and loading-dock design",
          "Stormwater detention and water-quality to NPDES",
          "Site utility connections and fire-access routing",
        ],
      },
      {
        name: "Geotechnical Engineering",
        body: [
          "Foundation strategy depends on the site and structure type. We coordinate subsurface investigation to define bearing capacity and settlement for retail slabs and multistory hotel foundations.",
          "For sites with pools, water features, or expansive soils, we align the geotechnical recommendations with structural design to control differential settlement beneath sensitive finishes.",
        ],
        highlights: [
          "Bearing capacity and settlement for slabs and tower foundations",
          "Shallow versus deep foundation recommendations",
          "Seismic site classification for ASCE 7 design",
          "Subgrade and soil coordination beneath pools and water features",
        ],
      },
    ],
    facilityTypes: [
      "Full-service and luxury hotels",
      "Resorts, spas, and destination properties",
      "Boutique and lifestyle hotels",
      "Regional malls and lifestyle retail centers",
      "Flagship and anchor retail stores",
      "Mixed-use retail-and-residential podiums",
      "Restaurants and bars within hospitality venues",
      "Conference, ballroom, and event facilities",
    ],
    projectTypes: [
      "New hotel and retail-center construction",
      "Brand-standard renovations and repositioning",
      "Tenant fit-outs within retail centers",
      "Amenity and food-and-beverage expansions",
      "Adaptive reuse to hospitality or retail",
    ],
    deliverables: [
      "PE-sealed structural drawings and calculations",
      "Coordinated MEP design drawings and specifications",
      "Acoustic and vibration-isolation details for mechanical plant",
      "Electrical one-line diagrams and lighting-control documentation",
      "Energy code compliance and lighting-power-density calculations",
      "Site civil and stormwater plans",
      "RFI responses and construction administration support",
    ],
    compliance: [
      {
        code: "IBC",
        desc: "The International Building Code governs occupancy, egress, and fire-resistance requirements for mercantile, assembly, and residential-hotel occupancies.",
      },
      {
        code: "ASCE 7",
        desc: "Minimum Design Loads defines the wind, seismic, and live loads governing retail shells, hotel towers, and feature-element supports.",
      },
      {
        code: "NFPA 13",
        desc: "The sprinkler standard governs head placement and coverage that must be coordinated with feature ceilings to remain visually concealed.",
      },
      {
        code: "ASHRAE 62.1 / 55",
        desc: "Ventilation and thermal-comfort standards set outdoor-air rates and comfort criteria for guestrooms, lobbies, and dining venues.",
      },
      {
        code: "IECC / ASHRAE 90.1",
        desc: "The energy code caps lighting power density and sets HVAC efficiency, shaping the layered lighting and mechanical designs.",
      },
      {
        code: "ADA Standards",
        desc: "Federal accessibility standards govern accessible guestrooms, routes, and public accommodations across retail and hospitality spaces.",
      },
    ],
    cta: "Send us your architectural concept and reflected ceiling plans, and we'll return a scope and fee review for infrastructure that disappears into your brand's design.",
  },
  {
    slug: "restaurant-food-service-engineering",
    name: "Restaurants & Food Service",
    cluster: 4,
    title: "Restaurant Engineering | Kitchen Ventilation & Plumbing",
    meta: "High-performance restaurant engineering. Expert design for commercial kitchen ventilation, grease interceptors, and high-volume utility links.",
    h1: "Commercial Kitchen & Restaurant Infrastructure Engineering",
    h2: "Fast-Track Mechanical and Plumbing Systems for Demanding Food Venues",
    cardBlurb:
      "Fast-track MEP engineering for restaurants and commercial kitchens—code-compliant hood ventilation, grease waste and interceptors, and high-capacity utility connections.",
    intro: [
      "Restaurants are among the most mechanically and plumbing-intensive spaces in commercial construction. A commercial kitchen concentrates high heat, grease-laden exhaust, heavy gas and electrical loads, and demanding drainage into a small footprint, all governed by strict health and fire codes. Get the ventilation, make-up air, or grease waste wrong and the space fails inspection, runs uncomfortably, or shuts down. Speed matters too, because restaurant operators are paying rent while the build-out crawls toward opening day.",
      "Apex Grid engineers restaurant infrastructure for both code compliance and fast-track delivery. We size exhaust hoods and make-up air to balance the kitchen, design grease waste and interceptors that satisfy the health department, and coordinate the gas, electrical, and water upgrades a busy kitchen demands. Working the mechanical, plumbing, and electrical disciplines together—against the plumbing, mechanical, and fire codes from day one—produces a permit-ready package that keeps the buildout moving toward opening.",
    ],
    specialties: [
      {
        heading:
          "High-Performance Hood Ventilation, Grease Exhaust & Make-Up Air Systems",
        body: "Kitchen ventilation is a balanced system, not just an exhaust fan. We size Type I grease hoods to capture and contain effluent per NFPA 96 and IMC requirements, selecting exhaust volumes based on appliance duty and hood style, then routing grease ducts with proper slope, clearances, and cleanouts to a listed rooftop exhaust fan. Make-up air is engineered to replace exhausted air—typically tempered—so the kitchen stays slightly negative to the dining room without starving the appliances or slamming doors. We integrate demand-control ventilation where appropriate to cut energy, and coordinate the required fire-suppression system per UL 300 with the hood, gas shutoff, and building fire alarm so the whole assembly passes inspection as one system.",
      },
      {
        heading:
          "Code-Compliant Plumbing, Grease Interceptors, and Drainage Planning",
        body: "Restaurant plumbing has to handle grease, high volumes, and health-department scrutiny. We size the sanitary system and grease interceptor—hydromechanical or gravity—per the IPC or UPC and local sewer-authority rules, locating it for access and pump-out while keeping food-prep waste separated from sanitary. Floor drains, floor sinks, and indirect waste receptors are laid out for dishwashers, ice machines, prep sinks, and steam equipment with proper air gaps to prevent contamination. Domestic hot water is sized for peak dish and sanitation demand, often with booster heaters at the dish machine. Gas piping is sized per the fuel-gas code for the connected appliance load, with shutoffs coordinated to the hood suppression system.",
      },
      {
        heading:
          "Fast-Track Utility Inflow Conversions for Gas, Electric, and Water Infrastructure",
        body: "A space converting to restaurant use rarely has the incoming utilities a kitchen needs. We evaluate existing gas service and meter capacity against the connected appliance load and coordinate upsizing with the utility when demand exceeds supply. Electrical service is checked against kitchen equipment, refrigeration, HVAC, and exhaust loads through an NEC Article 220 calculation, with panel, transformer, or service upgrades identified early. Domestic water supply is verified for fixture-unit demand and simultaneous peak use. Because these utility upgrades carry the longest lead times, we flag them at the outset and coordinate with the landlord and utility so the permit and construction schedule isn't held hostage by an undersized incoming service.",
      },
    ],
    disciplines: [
      {
        name: "Structural Engineering",
        href: "/services/structural",
        body: [
          "Restaurant structural scope centers on supporting heavy equipment and rooftop mechanical. We design or verify support for rooftop exhaust fans, make-up air units, and condensing units, and detail roof openings for grease-duct penetrations with proper framing.",
          "Interior work may include new openings, walk-in cooler pads, and support for pizza ovens or other concentrated loads within existing framing.",
        ],
        highlights: [
          "Rooftop support and dunnage for exhaust and make-up air units",
          "Roof opening framing for grease-duct penetrations",
          "Equipment pads and support for walk-ins and heavy ovens",
          "New openings and header design for kitchen and dining layouts",
        ],
      },
      {
        name: "MEP Engineering",
        href: "/services/mep",
        body: [
          "MEP is the heart of restaurant engineering. We design kitchen exhaust and tempered make-up air, dining-room HVAC and comfort, grease and sanitary plumbing, high-demand domestic hot water, gas distribution, and the electrical service for the full equipment package.",
          "The hood fire-suppression, gas shutoff, and fire-alarm interfaces are coordinated so the life-safety systems function and inspect as an integrated whole.",
        ],
        highlights: [
          "Type I hood exhaust and tempered make-up air per NFPA 96 / IMC",
          "Grease and sanitary plumbing with interceptor sizing per IPC/UPC",
          "Gas piping sized to appliance load per the fuel-gas code",
          "Electrical load studies and equipment power per NEC Article 220",
          "Hood suppression, gas shutoff, and fire-alarm integration",
        ],
      },
      {
        name: "Civil Engineering",
        href: "/services/civil",
        body: [
          "Freestanding and pad restaurants need site engineering. We design grease-interceptor access, sanitary and water connections, drive-through geometry, trash and grease-bin enclosures, and parking with accessible routing.",
          "Site grading and stormwater are designed to local and NPDES standards, coordinated with the building's utility connections and outdoor dining areas.",
        ],
        highlights: [
          "Exterior grease interceptor access and sanitary connections",
          "Drive-through lane and stacking geometry",
          "Trash, grease-bin, and utility enclosure design",
          "Site grading, drainage, and stormwater to NPDES",
        ],
      },
      {
        name: "Geotechnical Engineering",
        body: [
          "For freestanding restaurants, we coordinate subsurface investigation to establish bearing capacity and settlement for slab-on-grade and foundations, and to guide pavement section design for drive-through and parking areas.",
          "Where an existing tenant space adds heavy walk-ins or equipment on grade, we confirm the subgrade and slab can carry the concentrated loads.",
        ],
        highlights: [
          "Bearing capacity and settlement for slabs and foundations",
          "Pavement section design for drive-through and parking",
          "Subgrade evaluation for heavy walk-in and equipment loads",
          "Seismic site classification for ASCE 7 design",
        ],
      },
    ],
    facilityTypes: [
      "Full-service and fine-dining restaurants",
      "Quick-service and fast-casual concepts",
      "Drive-through and pad-site restaurants",
      "Ghost kitchens and commissary facilities",
      "Bars, breweries, and tasting rooms",
      "Cafes, bakeries, and coffee shops",
      "Food-hall and food-court vendor stalls",
      "Hotel and venue banquet kitchens",
    ],
    projectTypes: [
      "New freestanding restaurant construction",
      "Restaurant tenant improvements and fit-outs",
      "Change-of-occupancy kitchen conversions",
      "Kitchen renovations and equipment upgrades",
      "Concept remodels and rebranding",
    ],
    deliverables: [
      "Permit-ready, PE-sealed MEP drawing sets",
      "Kitchen exhaust and make-up air calculations",
      "Grease-interceptor and plumbing fixture-unit sizing",
      "Gas and electrical load studies",
      "Hood fire-suppression coordination documentation",
      "Energy code compliance documentation",
      "Structural support details for rooftop equipment",
      "RFI responses and construction administration support",
    ],
    compliance: [
      {
        code: "NFPA 96",
        desc: "The standard for commercial cooking ventilation governs grease hood, duct, and exhaust design and the clearances and cleanouts we detail.",
      },
      {
        code: "UL 300",
        desc: "The kitchen fire-suppression standard governs the wet-chemical system that must be coordinated with the hood, gas shutoff, and fire alarm.",
      },
      {
        code: "IMC",
        desc: "The International Mechanical Code establishes exhaust rates, make-up air, and duct requirements for commercial kitchen ventilation systems.",
      },
      {
        code: "IPC / UPC",
        desc: "The plumbing code governs grease-waste separation, interceptor sizing, indirect waste, and drainage for food-service fixtures.",
      },
      {
        code: "IFGC / NFPA 54",
        desc: "The fuel-gas code governs sizing and installation of gas piping serving the connected commercial cooking appliance load.",
      },
      {
        code: "FDA Food Code",
        desc: "The adopted food code and local health rules drive finish, drainage, and equipment coordination for sanitary, inspectable kitchens.",
      },
    ],
    cta: "Upload your kitchen equipment schedule and floor plan, and we'll deliver a fast-track scope and fee review to get your restaurant permitted and open on time.",
  },
];
