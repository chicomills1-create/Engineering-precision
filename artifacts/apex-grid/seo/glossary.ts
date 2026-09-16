/**
 * Engineering Glossary data — 80+ terms at /engineering-glossary/{slug}/
 * Categories: structural | mep | civil | geotech | permit | general
 */

export interface GlossaryTerm {
  slug: string;
  term: string;
  category: "structural" | "mep" | "civil" | "geotech" | "permit" | "general";
  /** 1–2 sentence plain-language definition shown in the hero */
  definition: string;
  /** 3–6 sentence extended explanation for the body */
  extended: string;
  /** slugs of related glossary terms */
  relatedTerms: string[];
  /** display labels for related services with URL paths */
  relatedServices: { label: string; href: string }[];
  /** Contextual answer links rendered inside the explanatory content section. */
  answerLinks?: { label: string; href: string }[];
}

export const GLOSSARY_TERMS: GlossaryTerm[] = [

  // ─── ACRONYMS / CODES ────────────────────────────────────────────────────

  {
    slug: "ahj",
    term: "AHJ (Authority Having Jurisdiction)",
    category: "permit",
    definition: "The Authority Having Jurisdiction (AHJ) is the organization, office, or individual responsible for enforcing code requirements and approving equipment, materials, and installations. On most commercial projects the AHJ is the local building department, but it can also be a fire marshal, state agency, or federal authority.",
    extended: "The AHJ interprets which edition of the building code applies to a project, reviews permit applications, performs inspections, and issues the certificate of occupancy. Different systems on the same project can have different AHJs — the local building department for structural and MEP work, the fire marshal for suppression systems, and a state health department for a medical facility. When the AHJ issues plan-check comments, the engineer of record must respond with code citations or design revisions. Understanding the AHJ's preferences and the adopted code edition is one of the first steps Apex Grid takes on any new project.",
    relatedTerms: ["ibc", "plan-check", "certificate-of-occupancy", "pe"],
    relatedServices: [
      { label: "Permit Engineering", href: "/permit-engineering/" },
      { label: "Engineering Services by State", href: "/locations/" },
    ],
  },

  {
    slug: "atfp",
    term: "ATFP (Antiterrorism/Force Protection)",
    category: "general",
    definition: "Antiterrorism/Force Protection (ATFP) refers to design measures required on U.S. military and federal facilities to protect occupants from blast, ballistic, and vehicle-borne threats. ATFP requirements are governed by the Unified Facilities Criteria (UFC) and must be incorporated into the structural, site, and MEP engineering.",
    extended: "The primary ATFP UFC is UFC 4-010-01, which establishes standoff distances, glazing performance, structural hardening criteria, and progressive collapse prevention requirements for new and renovated DoD facilities. Structural engineers must evaluate blast loads, design reinforced wall and roof systems, and in some cases coordinate with blast consultants for high-consequence facilities. ATFP requirements heavily influence site planning — setbacks, bollard placement, and vehicle barrier systems are all part of the force protection envelope. Apex Grid has experience designing to UFC ATFP criteria for military and federal government clients.",
    relatedTerms: ["ufc", "pe", "ibc"],
    relatedServices: [
      { label: "Government Engineering", href: "/government/" },
      { label: "Structural Engineering", href: "/services/structural" },
    ],
  },

  {
    slug: "bim",
    term: "BIM (Building Information Modeling)",
    category: "general",
    definition: "Building Information Modeling (BIM) is a process for creating and managing digital representations of a building's physical and functional characteristics. BIM models contain geometry plus data — materials, specifications, system properties — enabling coordination across disciplines before construction begins.",
    extended: "BIM allows structural, MEP, civil, and architectural teams to work in a federated 3D model, detecting clashes between ductwork, piping, beams, and walls before they become field conflicts. Software platforms like Revit, Navisworks, and BIM 360 are commonly used on larger commercial and government projects. Many owners, GCs, and design-build teams now require BIM as a contract deliverable. Even when a project does not require a full BIM model, the underlying coordination principles — routing MEP around structure, verifying equipment clearances — apply to every project Apex Grid engineers.",
    relatedTerms: ["mep", "pe", "rfi"],
    relatedServices: [
      { label: "MEP Engineering", href: "/services/mep" },
      { label: "Structural Engineering", href: "/services/structural" },
    ],
  },

  {
    slug: "cmu",
    term: "CMU (Concrete Masonry Unit)",
    category: "structural",
    definition: "A Concrete Masonry Unit (CMU) is a precast hollow or solid concrete block used in walls and partitions throughout commercial and industrial construction. CMU walls can be load-bearing or non-load-bearing, and can be reinforced with rebar grouted into the cells to resist lateral and axial loads.",
    extended: "Reinforced CMU is commonly used for tilt-up building infill panels, exterior walls of retail and warehouse buildings, fire-rated shaft enclosures, and retaining walls. The structural design of CMU follows ACI 530, the Building Code Requirements and Specification for Masonry Structures. Key design decisions include the size of the CMU cell, the spacing and size of vertical rebar, horizontal joint reinforcement, and the grout mix. Cutting openings in existing CMU walls requires engineering to verify the existing wall capacity, design the lintel, and detail the jamb reinforcement — work Apex Grid regularly performs on tenant improvement and renovation projects.",
    relatedTerms: ["lintel", "shear-wall", "ibc"],
    relatedServices: [
      { label: "Structural Engineering", href: "/services/structural" },
      { label: "Existing-Building Engineering", href: "/existing-building-engineering/" },
    ],
  },

  {
    slug: "dsa",
    term: "DSA (Division of the State Architect)",
    category: "permit",
    definition: "The Division of the State Architect (DSA) is a California state agency that acts as the AHJ for structural, fire-and-life-safety, and accessibility compliance on K–12 schools, community colleges, and state-owned buildings in California. DSA plan review and inspection requirements are more stringent than standard building department procedures.",
    extended: "Unlike a typical local building department, DSA requires project-specific inspection programs, special inspection agencies, and in some cases a full-time project inspector on site during critical construction phases. All engineering submittals to DSA must be prepared by a California-licensed PE or Structural Engineer. DSA maintains a separate code framework called the California Building Code (Title 24 Parts 1 and 2) with additional requirements for educational facilities. Engineers working on California school projects must be familiar with DSA's submittal formats, deferred submittal requirements, and field change procedures.",
    relatedTerms: ["ahj", "ibc", "title-24", "pe"],
    relatedServices: [
      { label: "Permit Engineering", href: "/permit-engineering/" },
      { label: "Engineering Services in California", href: "/locations/california/" },
    ],
  },

  {
    slug: "hvac",
    term: "HVAC (Heating, Ventilation & Air Conditioning)",
    category: "mep",
    definition: "HVAC stands for Heating, Ventilation, and Air Conditioning — the systems that control temperature, humidity, air quality, and air movement inside a building. HVAC engineering encompasses load calculations, equipment selection, duct and piping design, and energy code compliance.",
    extended: "A commercial HVAC system design starts with a cooling load and heating load calculation (Manual J for residential, ASHRAE methods for commercial) that determines how much heating and cooling the space needs under design conditions. The engineer then selects equipment — rooftop units, chillers, heat pumps, VRF systems — and designs the duct distribution, outside air intake, exhaust, and controls. HVAC systems must comply with ASHRAE 62.1 for ventilation, ASHRAE 90.1 or Title 24 for energy efficiency, and local mechanical codes. Apex Grid provides HVAC engineering where project-specific credentials and authorization are verified.",
    relatedTerms: ["vav", "vrf", "rtu", "mep", "ashrae", "make-up-air"],
    relatedServices: [
      { label: "MEP Engineering", href: "/services/mep" },
      { label: "Mechanical Engineering", href: "/services/mep" },
    ],
  },

  {
    slug: "ibc",
    term: "IBC (International Building Code)",
    category: "permit",
    definition: "The International Building Code (IBC) is the model building code published by the International Code Council (ICC) that most U.S. states and municipalities adopt as the basis for their commercial building code. It establishes minimum requirements for structural design, fire protection, means of egress, accessibility, and material standards.",
    extended: "The IBC is updated on a three-year cycle; current widely-adopted editions include IBC 2018 and IBC 2021, though individual states may adopt earlier or later editions and add local amendments. The IBC references dozens of other standards — ASCE 7 for loads, ACI 318 for concrete, AISC 360 for steel, NDS for wood, and ASHRAE 90.1 for energy. Understanding which edition of the IBC a jurisdiction has adopted — and what amendments apply — is essential before beginning structural, MEP, or civil design. Apex Grid verifies the governing code edition and amendments with the AHJ at the start of every project.",
    relatedTerms: ["ahj", "asce-7", "nec", "iecc", "pe"],
    relatedServices: [
      { label: "Permit Engineering", href: "/permit-engineering/" },
      { label: "Engineering Services by State", href: "/locations/" },
    ],
  },

  {
    slug: "iecc",
    term: "IECC (International Energy Conservation Code)",
    category: "permit",
    definition: "The International Energy Conservation Code (IECC) is the model energy code published by the ICC that establishes minimum efficiency requirements for the building envelope, HVAC systems, lighting, and water heating in commercial and residential construction. Most states adopt the IECC or their own equivalent, such as California's Title 24.",
    extended: "The IECC is updated on the same three-year cycle as the IBC and is adopted independently by each state — meaning a 2021 IBC state might still enforce IECC 2018. Commercial buildings must meet Chapter 5 (commercial energy efficiency) of the IECC, which sets prescriptive or performance-based requirements for insulation, fenestration, HVAC equipment efficiency, and lighting power density. Energy compliance often requires calculation documentation — COMcheck for prescriptive compliance, or whole-building energy modeling for performance paths. Apex Grid's engineers produce the required energy compliance submittals as part of MEP and energy-code engagements.",
    relatedTerms: ["title-24", "ashrae", "hvac", "ibc"],
    relatedServices: [
      { label: "MEP Engineering", href: "/services/mep" },
      { label: "Energy Compliance", href: "/services/mep" },
    ],
  },

  {
    slug: "mep",
    term: "MEP (Mechanical, Electrical & Plumbing)",
    category: "mep",
    definition: "MEP refers to the three primary building systems engineering disciplines: Mechanical (HVAC), Electrical (power distribution, lighting), and Plumbing (domestic water, sanitary, gas). On most commercial projects all three disciplines must be engineered, permitted, and coordinated together.",
    extended: "MEP systems must fit within the available floor-to-floor height, coordinate around structural framing, and reach every area of the building while meeting code. An MEP engineer sizes the mechanical equipment, determines duct and pipe routing, designs the electrical service and distribution, and sizes all plumbing systems. MEP drawings are reviewed by the AHJ as part of the building permit. On complex projects, BIM coordination sessions ensure that MEP systems don't clash with structural elements or each other. Apex Grid provides integrated MEP engineering as a complete package or individual disciplines, depending on the project scope.",
    relatedTerms: ["hvac", "nec", "vav", "vrf", "mep", "panel-schedule", "one-line-diagram"],
    relatedServices: [
      { label: "MEP Engineering", href: "/services/mep" },
      { label: "Tenant Improvement MEP", href: "/services/mep" },
    ],
  },

  {
    slug: "nec",
    term: "NEC (National Electrical Code / NFPA 70)",
    category: "mep",
    definition: "The National Electrical Code (NEC), formally known as NFPA 70, is the standard for safe electrical installation in the United States. It is adopted by most states and municipalities as the governing code for electrical design, wiring methods, overcurrent protection, and grounding.",
    extended: "The NEC covers everything from conductor ampacity and conduit fill to panel board ratings, grounding electrode systems, and special occupancy requirements. Articles in the NEC address specific conditions: Article 220 covers load calculations, Article 230 covers services, Article 250 covers grounding, and Articles 500–590 cover hazardous locations and special systems. Electrical engineers use the NEC to size service entrances, select overcurrent protection, design distribution equipment, and verify code compliance for lighting, power, and emergency systems. Like the IBC, the NEC is updated every three years and states may adopt different editions — verifying the adopted NEC edition is standard Apex Grid practice.",
    relatedTerms: ["panel-schedule", "one-line-diagram", "ibc", "load-calculation"],
    relatedServices: [
      { label: "Electrical Engineering", href: "/services/mep" },
      { label: "MEP Engineering", href: "/services/mep" },
    ],
  },

  {
    slug: "pe",
    term: "PE (Professional Engineer)",
    category: "permit",
    definition: "A Professional Engineer (PE) is a licensed engineer who has met the education, experience, and examination requirements to practice engineering and legally sign and seal engineering documents. Only a licensed PE can stamp the structural, MEP, civil, and geotechnical drawings that building departments require.",
    extended: "Licensure is state-specific — a PE licensed in Arizona must obtain a separate license to practice in California, though most states participate in comity agreements that streamline the process. For Apex Grid projects, the responsible individual's current license, firm authorization, discipline, and AHJ requirements are verified before any seal or stamp is contemplated. The PE's stamp on a set of drawings is a legal representation that the engineer has reviewed the design and accepts professional responsibility for it. Unlicensed persons cannot legally perform or represent engineering services in most states.",
    relatedTerms: ["ahj", "permit-drawings", "ibc", "plan-check"],
    relatedServices: [
      { label: "Permit Engineering", href: "/permit-engineering/" },
      { label: "Engineering Services by State", href: "/locations/" },
    ],
  },

  {
    slug: "rfi",
    term: "RFI (Request for Information)",
    category: "permit",
    definition: "A Request for Information (RFI) is a formal written question submitted by a contractor to the design team during construction, asking for clarification on the drawings, specifications, or project requirements. RFIs are a standard part of the construction administration process.",
    extended: "RFIs arise when the contractor encounters a condition not fully addressed in the construction documents — a conflict between structural and MEP drawings, a missing dimension, or an unclear specification. The design engineer reviews the RFI and issues a written response, which may include a revised detail, a clarification, or direction to proceed per the drawings. RFI responses become part of the project record and can have cost or schedule implications. Apex Grid's engineers respond to RFIs promptly as part of construction administration services, helping keep projects on track and avoiding costly field changes.",
    relatedTerms: ["pe", "plan-check", "permit-drawings"],
    relatedServices: [
      { label: "Permit Engineering", href: "/permit-engineering/" },
      { label: "Engineering Services", href: "/services/" },
    ],
  },

  {
    slug: "rtu",
    term: "RTU (Rooftop Unit)",
    category: "mep",
    definition: "A Rooftop Unit (RTU) is a packaged HVAC system mounted on a building's roof that contains all heating, cooling, and ventilation components in a single enclosure. RTUs are the most common HVAC system type for low-rise commercial buildings such as retail, office, and light industrial.",
    extended: "RTUs connect to the building's duct system through a roof curb opening, supplying conditioned air and returning room air for reconditioning. From a structural perspective, an RTU replacement or new installation requires an engineer to verify that the roof structure can support the equipment weight (often 500–2,000+ lbs), design the structural curb or dunnage, and confirm that the roof deck or framing is adequate. From an MEP perspective, the engineer sizes the RTU for the cooling and heating loads, selects the appropriate efficiency, and designs the duct connections. Apex Grid provides both the structural and mechanical engineering required for RTU projects.",
    relatedTerms: ["hvac", "vav", "mep", "live-load"],
    relatedServices: [
      { label: "MEP Engineering", href: "/services/mep" },
      { label: "Structural Engineering", href: "/services/structural" },
    ],
  },

  {
    slug: "title-24",
    term: "Title 24 (California Building Standards Code)",
    category: "permit",
    definition: "Title 24 refers to the California Code of Regulations Title 24, which contains the California Building Standards Code — including energy efficiency requirements (Part 6) that are often stricter than the national IECC. Any building constructed or altered in California must comply with the applicable Title 24 parts.",
    extended: "Title 24 Part 6 (the California Energy Code) sets prescriptive and performance requirements for the building envelope, HVAC, lighting, water heating, and electrical systems. The California Energy Commission (CEC) updates Part 6 on roughly a three-year cycle; the 2022 edition introduced requirements for heat pump water heaters, EV charging infrastructure, and solar-ready provisions in many building types. Compliance is demonstrated through a T24 energy analysis report prepared by a qualified analyst using CEC-approved software. Apex Grid's MEP engineers produce Title 24 compliance documentation for commercial and multifamily projects throughout California.",
    relatedTerms: ["iecc", "hvac", "mep", "ibc", "ashrae"],
    relatedServices: [
      { label: "MEP Engineering", href: "/services/mep" },
      { label: "Engineering Services in California", href: "/locations/california/" },
    ],
  },

  {
    slug: "ufc",
    term: "UFC (Unified Facilities Criteria)",
    category: "general",
    definition: "Unified Facilities Criteria (UFC) are the design and construction standards published by the U.S. Department of Defense that govern military construction and renovation projects for all branches of service. UFC documents replace earlier separate Army, Navy, Air Force, and Marine Corps design manuals.",
    extended: "There are hundreds of UFC documents covering everything from site planning (UFC 3-201-01) and structural engineering (UFC 3-301-01) to MEP systems (UFC 3-400-series), antiterrorism/force protection (UFC 4-010-01), and specialized facilities such as aircraft hangars, laboratories, and ammunition storage. UFC 3-301-01 governs structural design and references ASCE 7 loads with military-specific modifications. UFC 3-501-01 governs electrical engineering. Projects on military installations require the design team to follow applicable UFCs in addition to local codes, which often results in more stringent design requirements. Apex Grid designs to UFC criteria for government and military project clients.",
    relatedTerms: ["atfp", "ibc", "pe", "asce-7"],
    relatedServices: [
      { label: "Government Engineering", href: "/government/" },
      { label: "Military Engineering", href: "/military" },
    ],
  },

  {
    slug: "ups",
    term: "UPS (Uninterruptible Power Supply)",
    category: "mep",
    definition: "An Uninterruptible Power Supply (UPS) is an electrical device that provides emergency power to connected loads immediately upon loss of normal utility power, without any interruption. UPS systems protect critical equipment — servers, medical devices, mission-critical controls — from momentary outages and power quality problems.",
    extended: "UPS systems range from small single-phase units under a workstation to large three-phase systems serving entire data center rooms. The electrical engineer must size the UPS based on the connected load (in kVA or kW), the required backup runtime, and the efficiency characteristics of the selected system. Structural engineers must confirm that the floor can support the weight of large UPS systems, which can exceed several thousand pounds. For data centers and mission-critical facilities, UPS systems are often arranged in N+1 or 2N redundancy configurations to ensure continuous power even during UPS maintenance. Apex Grid engineers UPS systems as part of critical facility MEP packages.",
    relatedTerms: ["mep", "nec", "one-line-diagram", "panel-schedule"],
    relatedServices: [
      { label: "Electrical Engineering", href: "/services/mep" },
      { label: "Data Center Engineering", href: "/industries/" },
    ],
  },

  {
    slug: "vav",
    term: "VAV (Variable Air Volume)",
    category: "mep",
    definition: "Variable Air Volume (VAV) is an HVAC distribution system where a central air handling unit supplies conditioned air at a constant temperature, and VAV terminal units at each zone vary the volume of airflow to match the zone's heating or cooling load. VAV systems are common in medium and large commercial office buildings.",
    extended: "Each VAV box contains a motorized damper and a controller that modulates airflow between a minimum (required for ventilation) and a maximum (design cooling or heating capacity) based on a room thermostat signal. Reheat VAV boxes add a small heating coil — usually hot water or electric — to warm the supply air when cooling loads are low. VAV systems are more energy-efficient than constant-volume systems because the supply fan can reduce speed when zone loads decrease. The engineer must design the central AHU, the duct distribution network, and size each VAV box for the zone load and minimum outdoor air requirements per ASHRAE 62.1.",
    relatedTerms: ["hvac", "vrf", "rtu", "mep", "ashrae"],
    relatedServices: [
      { label: "MEP Engineering", href: "/services/mep" },
      { label: "Mechanical Engineering", href: "/services/mep" },
    ],
  },

  {
    slug: "vrf",
    term: "VRF (Variable Refrigerant Flow)",
    category: "mep",
    definition: "Variable Refrigerant Flow (VRF) is an HVAC system technology that uses refrigerant as the heat transfer medium, circulating it directly between one or more outdoor condensing units and multiple indoor fan coil units throughout the building. VRF systems are known for their flexibility, individual zone control, and high energy efficiency.",
    extended: "A heat-recovery VRF system can simultaneously heat some zones and cool others by transferring heat energy between zones, making it especially efficient for interior zones with different load profiles. VRF is popular for multi-tenant commercial buildings, hotels, and mixed-use projects where individual zone control and tenant sub-metering are desirable. The refrigerant piping runs from the outdoor unit through a branch circuit controller to each indoor unit, requiring careful routing to stay within manufacturer length and elevation limits. Design considerations include refrigerant charge calculations, ventilation for enclosed mechanical spaces, and coordination with the structural engineer for outdoor unit placement.",
    relatedTerms: ["hvac", "vav", "rtu", "mep"],
    relatedServices: [
      { label: "MEP Engineering", href: "/services/mep" },
      { label: "Mechanical Engineering", href: "/services/mep" },
    ],
    answerLinks: [
      { label: "how engineers design a VRF system", href: "/answers/vrf-system-engineering-design/" },
      { label: "how VRF cost compares with traditional HVAC", href: "/answers/vrf-vs-traditional-hvac-cost/" },
    ],
  },

  // ─── STRUCTURAL TERMS ────────────────────────────────────────────────────

  {
    slug: "allowable-bearing-pressure",
    term: "Allowable Bearing Pressure",
    category: "geotech",
    definition: "Allowable bearing pressure is the maximum load per unit area that a soil or rock formation can support beneath a foundation without experiencing excessive settlement or shear failure. It is determined by the geotechnical engineer based on soil boring data, laboratory testing, and engineering analysis.",
    extended: "The allowable bearing pressure accounts for a factor of safety — typically 2–3 — applied to the ultimate bearing capacity of the soil. It is expressed in pounds per square foot (psf) or kips per square foot (ksf) and is one of the primary recommendations in a geotechnical report. The structural engineer uses the allowable bearing pressure to size spread footings, grade beams, and mat foundations. Soft clays, loose sands, and expansive soils typically have lower allowable bearing pressures, requiring larger footings or deeper foundations. Apex Grid coordinates geotechnical report findings with structural foundation design on every project.",
    relatedTerms: ["foundation", "footing", "soil-boring", "settlement", "expansive-soil", "grade-beam"],
    relatedServices: [
      { label: "Geotechnical Engineering", href: "/services/structural" },
      { label: "Structural Engineering", href: "/services/structural" },
    ],
  },

  {
    slug: "anchor-bolt",
    term: "Anchor Bolt",
    category: "structural",
    definition: "An anchor bolt is a threaded steel fastener embedded in concrete that attaches structural elements — sill plates, column base plates, equipment bases — to the foundation or slab below. Anchor bolts must be designed to resist the tension, shear, and combined forces transferred at the connection.",
    extended: "Cast-in-place anchor bolts are set in wet concrete using a template before the pour; post-installed anchors are drilled and grouted or mechanically expanded into hardened concrete. The design of anchor bolts follows ACI 318 Appendix D (or Chapter 17 in recent editions), which accounts for concrete breakout, steel tensile failure, and pullout. Seismic and high-wind zones require larger or more numerous anchors, and the concrete edge distance and anchor spacing are critical to achieving full capacity. Equipment anchorage — securing RTUs, generators, transformers, and other mechanical/electrical equipment — is a common scope for Apex Grid's structural engineers.",
    relatedTerms: ["foundation", "footing", "seismic-load", "asce-7"],
    relatedServices: [
      { label: "Structural Engineering", href: "/services/structural" },
      { label: "Equipment Anchorage", href: "/services/structural" },
    ],
  },

  {
    slug: "beam",
    term: "Beam",
    category: "structural",
    definition: "A beam is a horizontal structural member that carries loads primarily through bending, spanning between supports such as columns, walls, or other beams. Beams transfer floor, roof, and wall loads to their supports and must be designed for bending moment, shear force, and deflection.",
    extended: "Beams can be made from steel, reinforced concrete, wood, or engineered lumber such as LVL or glulam. The critical design checks are flexural (bending) strength, shear strength, and serviceability deflection limits. For steel beams, AISC 360 governs; for wood beams, the NDS applies; for concrete beams, ACI 318 is the standard. In renovation projects, existing beams must be evaluated for their capacity to carry new loads — a task that often requires field verification of the beam size and connections. Apex Grid engineers new and replacement beams for commercial, industrial, and multifamily projects.",
    relatedTerms: ["column", "joist", "lintel", "dead-load", "live-load"],
    relatedServices: [
      { label: "Structural Engineering", href: "/services/structural" },
      { label: "Existing-Building Engineering", href: "/existing-building-engineering/" },
    ],
  },

  {
    slug: "braced-frame",
    term: "Braced Frame",
    category: "structural",
    definition: "A braced frame is a structural system that resists lateral forces — wind and seismic — through diagonal steel members arranged in a vertical truss pattern within a bay of the building frame. Braced frames are one of the primary lateral force resisting systems for steel buildings.",
    extended: "Common braced frame configurations include X-bracing, chevron (inverted-V) bracing, single-diagonal bracing, and eccentric braced frames (EBFs). In seismic design, special concentrically braced frames (SCBF) and buckling-restrained braced frames (BRBF) are designed to yield in compression without buckling, providing ductile energy dissipation. The structural engineer must design the brace members, connections, columns, and beams in the braced bay to resist the design lateral forces. The location of braced frames must be coordinated with the architect because they occupy full bays and limit openings in those walls. Apex Grid's structural engineers design braced frame systems for new and retrofit applications.",
    relatedTerms: ["moment-frame", "shear-wall", "lateral-load-resisting-system", "seismic-load", "wind-load"],
    relatedServices: [
      { label: "Structural Engineering", href: "/services/structural" },
    ],
  },

  {
    slug: "column",
    term: "Column",
    category: "structural",
    definition: "A column is a vertical structural member that carries compressive loads from floors, roofs, and beams down to the foundation. Columns must be designed for axial compression, bending (if loads are eccentric), and in seismic zones, combined axial and lateral forces.",
    extended: "Columns are made from steel, reinforced concrete, wood, or composite materials. Steel wide-flange columns (W-shapes) are common in commercial steel-frame buildings; reinforced concrete columns are used in concrete frame construction; wood posts appear in light-frame and some medium commercial structures. The engineer checks column capacity for buckling (using the effective length), combined axial and bending interaction, and connection design at the top and bottom. In multistory buildings, columns carry accumulated loads from every floor above, so lower-level columns require larger sections. Apex Grid sizes and details columns for new buildings, additions, and renovation projects.",
    relatedTerms: ["beam", "foundation", "dead-load", "live-load", "moment-frame"],
    relatedServices: [
      { label: "Structural Engineering", href: "/services/structural" },
    ],
  },

  {
    slug: "dead-load",
    term: "Dead Load",
    category: "structural",
    definition: "Dead load is the permanent, static weight of all building materials and fixed equipment that a structural system must support — including the structure itself, the floor and roof deck, finishes, mechanical equipment, and partitions. Dead loads do not change over the life of the building.",
    extended: "Dead loads are carefully calculated by the structural engineer using material unit weights — steel is approximately 490 pcf, normal-weight concrete is 150 pcf, wood is 35–50 pcf, and gypsum board is about 2.3 psf per layer. Dead loads are combined with live loads, wind loads, seismic loads, and snow loads in the load combinations required by ASCE 7 and the IBC to determine the design forces on every structural element. Accurately estimating dead loads is important because underestimating them can lead to insufficient structural members, while significantly overestimating them increases costs. Apex Grid's structural engineers calculate dead loads for every discipline's equipment as part of integrated design coordination.",
    relatedTerms: ["live-load", "wind-load", "seismic-load", "asce-7"],
    relatedServices: [
      { label: "Structural Engineering", href: "/services/structural" },
    ],
  },

  {
    slug: "diaphragm",
    term: "Diaphragm",
    category: "structural",
    definition: "A structural diaphragm is a horizontal or nearly horizontal structural element — typically a floor deck or roof deck — that acts like a deep beam to collect and transfer lateral wind and seismic forces to the vertical lateral force resisting elements such as shear walls, braced frames, or moment frames.",
    extended: "For a floor or roof deck to function as a diaphragm, the deck must be properly connected to the framing members below it, and the collectors, chords, and drag struts that frame the diaphragm must be designed to carry the diaphragm forces into the vertical resisting elements. Concrete slabs are typically rigid diaphragms; steel deck with or without concrete fill, and wood structural panels, can be designed as either rigid or flexible depending on the relative stiffness of the vertical resisting system. Diaphragm design is a critical part of seismic and wind load analysis — a diaphragm that is not properly designed or connected can cause catastrophic failure in a major seismic event.",
    relatedTerms: ["shear-wall", "moment-frame", "braced-frame", "seismic-load", "wind-load"],
    relatedServices: [
      { label: "Structural Engineering", href: "/services/structural" },
      { label: "Seismic Engineering", href: "/services/structural" },
    ],
  },

  {
    slug: "expansive-soil",
    term: "Expansive Soil",
    category: "geotech",
    definition: "Expansive soils are clay-rich soils that swell significantly when wetted and shrink when dried, exerting uplift pressures on foundations and slabs that can cause severe structural damage if not properly addressed in design. They are common in arid and semi-arid climates across the western and southwestern United States.",
    extended: "The potential for expansion is measured by the plasticity index (PI) and expansion index (EI) from laboratory tests. High-expansion soils can exert uplift pressures of several thousand psf — far exceeding the weight of a typical light-frame structure. Mitigation strategies include deepening foundations to extend below the active moisture zone, pre-wetting and compacting the subgrade, replacing expansive soil with non-expansive fill, or using post-tensioned slabs designed to resist the differential movement. The geotechnical report will classify the expansion potential and specify mitigation measures. Apex Grid engineers foundations and slabs to match the geotechnical engineer's recommendations for expansive soil conditions.",
    relatedTerms: ["soil-boring", "allowable-bearing-pressure", "foundation", "settlement"],
    relatedServices: [
      { label: "Geotechnical Engineering", href: "/services/structural" },
      { label: "Structural Engineering", href: "/services/structural" },
    ],
  },

  {
    slug: "footing",
    term: "Footing",
    category: "structural",
    definition: "A footing is a structural element at the base of a column, wall, or pier that spreads the structural load over a sufficient area of soil to keep bearing pressures within the allowable limits recommended by the geotechnical engineer. Footings are typically reinforced concrete pads or strips.",
    extended: "Spread footings are used under individual columns; continuous strip footings run under load-bearing walls; combined footings support two or more closely spaced columns. The structural engineer sizes footings based on the column or wall loads, the allowable bearing pressure from the geotechnical report, and the depth required to reach adequate bearing material and avoid frost heave. Reinforcing is designed to resist the bending and shear forces from the soil bearing pressure acting on the bottom of the footing. In seismic design, footings must also be connected by grade beams to prevent differential movement during an earthquake. Apex Grid designs footings for commercial, industrial, and government projects.",
    relatedTerms: ["foundation", "grade-beam", "allowable-bearing-pressure", "soil-boring"],
    relatedServices: [
      { label: "Structural Engineering", href: "/services/structural" },
    ],
  },

  {
    slug: "foundation",
    term: "Foundation",
    category: "structural",
    definition: "A foundation is the structural system that transfers all building loads — dead, live, wind, and seismic — into the supporting soil or rock. Foundations are classified as shallow (spread footings, mat) or deep (piles, drilled piers) based on their depth and load transfer mechanism.",
    extended: "The selection of a foundation type depends on the structural loads, the geotechnical conditions (bearing capacity, settlement potential, depth to competent material), and the site constraints. Shallow foundations are most economical when competent soil is near the surface; deep foundations are required when soft or compressible soils extend to significant depth. The geotechnical report provides bearing pressure recommendations, pile capacity estimates, and settlement predictions that guide the structural engineer's foundation design. Foundation design must also account for seismic base shear, overturning moments from lateral loads, and uplift from wind or seismic forces. Apex Grid's structural engineers design all foundation types for commercial and government projects.",
    relatedTerms: ["footing", "grade-beam", "mat-foundation", "pier", "soil-boring", "allowable-bearing-pressure"],
    relatedServices: [
      { label: "Structural Engineering", href: "/services/structural" },
      { label: "Geotechnical Engineering", href: "/services/structural" },
    ],
  },

  {
    slug: "grade-beam",
    term: "Grade Beam",
    category: "structural",
    definition: "A grade beam is a horizontal reinforced concrete beam constructed at grade level (at or just below the ground surface) that connects foundation piers or piles and carries wall loads to the deep foundation elements. Grade beams also tie isolated footings together to prevent differential movement under seismic loads.",
    extended: "In deep foundation systems, the grade beam spans between drilled piers or driven piles, carrying load from the wall or columns above and distributing it to the foundation elements below. In shallow foundation systems, grade beams between spread footings are required by seismic design codes to prevent footings from spreading apart or rotating during a seismic event. Grade beams are reinforced at both top and bottom to resist the bending forces from the loads above and the soil reactions below. The structural engineer sizes the grade beam for flexure and shear and details the reinforcement to ensure continuity with the footing or pile cap. Apex Grid designs grade beams for seismic-zone projects as a standard part of foundation engineering.",
    relatedTerms: ["foundation", "footing", "pier", "mat-foundation", "seismic-load"],
    relatedServices: [
      { label: "Structural Engineering", href: "/services/structural" },
    ],
  },

  {
    slug: "holdown",
    term: "Holdown (Hold-Down)",
    category: "structural",
    definition: "A holdown is a metal connector that anchors the end post of a shear wall to the foundation or to the framing below, resisting the uplift tension force that develops when a shear wall is subjected to lateral wind or seismic loads. Without holdowns, a shear wall can overturn rather than resist the lateral force.",
    extended: "When a shear wall resists a lateral force, it acts like a lever arm — one end wants to lift up in tension while the other end is in compression. The holdown, typically a steel strap or bracket with anchor bolts into the concrete and structural screws or bolts into the wood post, resists this uplift force. Holdown capacity must equal or exceed the calculated uplift demand from the lateral load analysis. In multi-story wood-frame buildings, holdowns must be stacked vertically from floor to floor and connected through the floor framing to develop continuous load paths. Apex Grid designs holdown systems for wood-frame shear walls in commercial and residential projects.",
    relatedTerms: ["shear-wall", "anchor-bolt", "diaphragm", "seismic-load", "wind-load"],
    relatedServices: [
      { label: "Structural Engineering", href: "/services/structural" },
    ],
  },

  {
    slug: "joist",
    term: "Joist",
    category: "structural",
    definition: "A joist is a repetitive, closely spaced horizontal framing member that supports the floor deck or roof deck and transfers loads to beams, girders, or bearing walls. Joists can be solid wood, engineered lumber (LVL, TJI), open-web steel bar joists, or light-gauge metal.",
    extended: "Wood joists are common in residential and light commercial construction; steel bar joists (manufactured to SJI standards) span efficiently over long distances in industrial and commercial buildings; engineered wood I-joists offer high strength-to-weight ratios for floor framing. The joist must be designed for bending strength, shear strength, and deflection limits — total deflection under live load typically limited to L/360 for floors and L/240 for roofs. Lateral bracing at the top chord and bridging at the bottom chord prevent joist rotation. In renovation projects, joists must be evaluated for their capacity to carry new loads, including HVAC equipment or rooftop solar panels.",
    relatedTerms: ["beam", "truss", "dead-load", "live-load"],
    relatedServices: [
      { label: "Structural Engineering", href: "/services/structural" },
      { label: "Existing-Building Engineering", href: "/existing-building-engineering/" },
    ],
  },

  {
    slug: "lateral-load-resisting-system",
    term: "Lateral Force Resisting System (LFRS)",
    category: "structural",
    definition: "The Lateral Force Resisting System (LFRS) is the collection of structural elements — shear walls, moment frames, braced frames, diaphragms, and their connections — that work together to resist wind and seismic forces acting horizontally on a building. A properly designed LFRS transfers these forces from the roof and floors to the foundation.",
    extended: "Every building must have a complete and continuous LFRS in two orthogonal directions. The diaphragm collects lateral forces and delivers them to vertical elements (shear walls, frames, or braces), which carry the forces down to the foundation. The path of forces through the LFRS must be complete and uninterrupted — a break in the load path is a common cause of structural failure in earthquakes. The type of LFRS selected (shear walls for wood or masonry buildings, moment frames for open-plan steel buildings, braced frames for industrial structures) affects architectural planning because the resisting elements require specific locations and configurations.",
    relatedTerms: ["shear-wall", "moment-frame", "braced-frame", "diaphragm", "seismic-load"],
    relatedServices: [
      { label: "Structural Engineering", href: "/services/structural" },
      { label: "Seismic Engineering", href: "/services/structural" },
    ],
  },

  {
    slug: "lintel",
    term: "Lintel",
    category: "structural",
    definition: "A lintel is a horizontal structural member that spans over a door, window, or wall opening and carries the loads from the structure above down to the jambs (sides) of the opening. Lintels can be steel angles, built-up beams, reinforced concrete, or reinforced masonry.",
    extended: "The lintel must be designed to carry the tributary load from the wall and floor or roof structure above, accounting for the arching action in masonry walls (which reduces the load on the lintel) or the full accumulated load in non-masonry walls. Steel angle lintels are common over openings in CMU walls; built-up wood headers are the standard for wood-frame construction; reinforced masonry bond beams serve as lintels in CMU construction. Bearing length on each side of the opening must be sufficient to distribute the lintel reaction into the wall without crushing the bearing material. When a wall opening is added to an existing building, the structural engineer must assess the existing conditions, design an appropriate lintel, and detail the temporary shoring required during construction.",
    relatedTerms: ["beam", "cmu", "dead-load", "live-load"],
    relatedServices: [
      { label: "Structural Engineering", href: "/services/structural" },
      { label: "Existing-Building Engineering", href: "/existing-building-engineering/" },
    ],
  },

  {
    slug: "live-load",
    term: "Live Load",
    category: "structural",
    definition: "Live load is the variable, non-permanent load on a structure caused by occupants, furniture, equipment, and stored materials — anything that can be moved in or out of the building. Live loads are specified by the building code based on occupancy type and must be combined with dead, wind, and seismic loads in structural design.",
    extended: "The IBC and ASCE 7 specify minimum uniformly distributed live loads for common occupancies: 50 psf for office space, 100 psf for retail and public assembly areas, 250 psf for heavy storage, and so on. The structural engineer selects the governing live load for each area of the building and uses it to size floors, beams, columns, and foundations. Live load reduction is permitted by ASCE 7 for large tributary areas because the probability that the full live load acts on a large area simultaneously is low. Concentrated live loads — from machinery, heavy equipment, or point loads from partitions — must be checked separately in addition to the uniform live load.",
    relatedTerms: ["dead-load", "wind-load", "seismic-load", "asce-7", "beam"],
    relatedServices: [
      { label: "Structural Engineering", href: "/services/structural" },
    ],
  },

  {
    slug: "mat-foundation",
    term: "Mat Foundation",
    category: "structural",
    definition: "A mat (or raft) foundation is a thick reinforced concrete slab that covers the entire building footprint and supports all columns and walls. Mat foundations spread loads over the maximum available area, making them suitable for sites with low bearing capacity, variable soil conditions, or heavily loaded structures.",
    extended: "Mat foundations are especially useful when individual spread footings would be so large that they would overlap or when differential settlement between footings is a concern. The mat can be designed as a uniform-thickness slab or with thickened pedestals under heavy columns. Analysis must account for soil-structure interaction — the soil pressure is not uniform but varies depending on the relative stiffness of the mat and the soil. Mat foundations are commonly used for multi-story buildings on poor soils, industrial facilities with heavy point loads, and structures where a uniform floor slab at grade serves both structural and functional purposes.",
    relatedTerms: ["foundation", "footing", "grade-beam", "allowable-bearing-pressure", "settlement"],
    relatedServices: [
      { label: "Structural Engineering", href: "/services/structural" },
      { label: "Geotechnical Engineering", href: "/services/structural" },
    ],
  },

  {
    slug: "moment-frame",
    term: "Moment Frame",
    category: "structural",
    definition: "A moment frame is a structural system that resists lateral wind and seismic forces through the bending stiffness of beams and columns connected with rigid (moment-resisting) connections. Unlike braced frames, moment frames do not require diagonal bracing, allowing open floor plans and large window areas.",
    extended: "In a moment frame, the beam-to-column connections are designed to transfer bending moment — not just shear — between members. This rigidity allows the frame to resist lateral loads through frame action (the deformation of the beams and columns in double curvature). Special Moment Frames (SMF) are designed and detailed to provide ductile behavior in seismic events, with carefully designed connection zones that allow yielding to absorb seismic energy. Moment frames are common in steel office buildings, open-plan commercial spaces, and industrial structures where shear walls or braced frames would obstruct the space. The connections in seismic moment frames require careful detailing and typically inspection during construction.",
    relatedTerms: ["braced-frame", "shear-wall", "lateral-load-resisting-system", "seismic-load", "wind-load"],
    relatedServices: [
      { label: "Structural Engineering", href: "/services/structural" },
      { label: "Seismic Engineering", href: "/services/structural" },
    ],
  },

  {
    slug: "pier",
    term: "Pier (Drilled Pier / Caisson)",
    category: "structural",
    definition: "A drilled pier (also called a caisson or drilled shaft) is a deep foundation element formed by drilling a cylindrical hole into the ground, placing a reinforcing cage, and filling with concrete. Piers transfer structural loads through weak soils to deeper, competent bearing strata or through skin friction along the shaft.",
    extended: "Drilled piers are used when competent bearing material is too deep for spread footings to be economical, when the soil has high expansion potential that would cause damage to shallow foundations, or when extremely heavy column loads require deep load transfer. Pier diameter typically ranges from 12 inches to several feet, and depth can exceed 100 feet in challenging soil conditions. The geotechnical engineer specifies the required tip elevation, design skin friction, and end bearing capacity. Structural engineers size the reinforcing cage and design the pile cap connecting the pier to the structure above. Apex Grid coordinates pier design with the geotechnical report findings on every deep foundation project.",
    relatedTerms: ["foundation", "grade-beam", "allowable-bearing-pressure", "soil-boring"],
    relatedServices: [
      { label: "Structural Engineering", href: "/services/structural" },
      { label: "Geotechnical Engineering", href: "/services/structural" },
    ],
  },

  {
    slug: "retaining-wall",
    term: "Retaining Wall",
    category: "structural",
    definition: "A retaining wall is a structure designed to hold back soil, rock, or other material on one side while providing a vertical or near-vertical face on the other side. Retaining walls must be designed to resist the lateral earth pressure, surcharge loads, hydrostatic pressure, and in seismic zones, dynamic earth pressure.",
    extended: "Common retaining wall types include cantilever walls (the most common engineered type), gravity walls, counterfort walls for tall heights, and mechanically stabilized earth (MSE) walls using reinforced backfill. The structural engineer calculates the active and passive earth pressures using soil parameters from the geotechnical report and designs the wall for overturning, sliding, bearing capacity, and internal structural capacity. Drainage behind the wall is critical — water pressure can more than double the design lateral force. Building departments typically require engineered drawings and calculations for retaining walls over 4 feet in height. Apex Grid provides retaining wall engineering for commercial site development and civil projects.",
    relatedTerms: ["foundation", "soil-boring", "drainage", "seismic-load"],
    relatedServices: [
      { label: "Structural Engineering", href: "/services/structural" },
      { label: "Civil Engineering", href: "/services/civil" },
    ],
  },

  {
    slug: "seismic-design-category",
    term: "Seismic Design Category (SDC)",
    category: "structural",
    definition: "The Seismic Design Category (SDC) is a classification (A through F) assigned to a building based on its geographic seismic hazard, occupancy category (risk category), and soil site class. The SDC determines which seismic design requirements, detailing provisions, and lateral force resisting system options apply to the building.",
    extended: "SDC A and B apply to low seismic hazard areas with minimal design requirements; SDC C through F apply to areas with progressively higher seismic hazard. Higher SDCs require more stringent detailing, more ductile lateral systems (such as Special Moment Frames or Special Shear Walls), more comprehensive seismic analysis, and greater redundancy. The site class (based on soil type — Class A is hard rock, Class E is soft soil) amplifies the ground motion for softer soils, which can push a project into a higher SDC. Apex Grid's structural engineers determine the SDC for every project early in design, as it drives fundamental decisions about the lateral force resisting system.",
    relatedTerms: ["shear-wall", "moment-frame", "braced-frame", "seismic-load", "asce-7"],
    relatedServices: [
      { label: "Structural Engineering", href: "/services/structural" },
      { label: "Seismic Engineering", href: "/services/structural" },
    ],
  },

  {
    slug: "seismic-load",
    term: "Seismic Load",
    category: "structural",
    definition: "Seismic load is the inertial force exerted on a building during an earthquake, caused by the acceleration of the building mass due to ground motion. Seismic loads are horizontal forces (and in some cases vertical) that the lateral force resisting system must resist without collapse.",
    extended: "The magnitude of seismic loads depends on the building's mass, its stiffness and period, the site's mapped acceleration values (Ss and S1 from ASCE 7), the soil site class, and the building's Seismic Design Category and Risk Category. ASCE 7 provides equivalent lateral force, modal response spectrum, and response history analysis procedures for determining seismic design forces. Seismic forces are applied at each floor level proportional to the story weight and height. Unlike wind loads, seismic forces depend on the building's own weight — heavier buildings attract larger seismic forces, which is one reason lightweight construction can be advantageous in high-seismic regions.",
    relatedTerms: ["seismic-design-category", "wind-load", "asce-7", "shear-wall", "lateral-load-resisting-system"],
    relatedServices: [
      { label: "Structural Engineering", href: "/services/structural" },
      { label: "Seismic Engineering", href: "/services/structural" },
    ],
  },

  {
    slug: "settlement",
    term: "Settlement",
    category: "geotech",
    definition: "Settlement is the vertical downward movement of a foundation or soil mass under load, caused by compression of the soil or consolidation of fine-grained soils over time. Differential settlement — uneven settlement across a building footprint — is typically more damaging than uniform settlement.",
    extended: "Immediate (elastic) settlement occurs quickly as load is applied; consolidation settlement in fine-grained soils like clays occurs slowly over months or years as excess pore water pressure dissipates. The geotechnical report estimates total and differential settlement under the design loads. Structural engineers use these estimates to evaluate whether the structural system can tolerate the predicted movements without cracking, tilting, or binding of doors and windows. Mitigation measures include increasing footing size to reduce bearing pressure, using a mat foundation, deepening foundations to reach more competent soil, or ground improvement. Apex Grid coordinates geotechnical settlement predictions with structural design.",
    relatedTerms: ["allowable-bearing-pressure", "mat-foundation", "foundation", "soil-boring", "expansive-soil"],
    relatedServices: [
      { label: "Geotechnical Engineering", href: "/services/structural" },
      { label: "Structural Engineering", href: "/services/structural" },
    ],
  },

  {
    slug: "shear-wall",
    term: "Shear Wall",
    category: "structural",
    definition: "A shear wall is a vertical structural element — typically plywood-sheathed wood framing, reinforced concrete, or reinforced masonry — that resists horizontal (shear) forces from wind and seismic loads in the plane of the wall. Shear walls are the primary lateral force resisting system for wood-frame and masonry buildings.",
    extended: "A wood structural panel shear wall works by transferring lateral forces through the plywood or OSB sheathing into the framing, with nailing patterns specifically designed to develop the required shear capacity. The shear capacity of the wall depends on the panel thickness, nail size and spacing, and the blocking or framing the nails connect to. At the ends of shear walls, holdowns resist the overturning tension force, while compression posts carry the overturning compression force. In concrete and masonry shear wall buildings, the walls are reinforced with horizontal and vertical rebar to carry the shear forces. Apex Grid's structural engineers design shear walls for all building types across all seismic and wind zones.",
    relatedTerms: ["holdown", "diaphragm", "lateral-load-resisting-system", "seismic-load", "wind-load"],
    relatedServices: [
      { label: "Structural Engineering", href: "/services/structural" },
    ],
  },

  {
    slug: "slab",
    term: "Slab-on-Grade",
    category: "structural",
    definition: "A slab-on-grade (SOG) is a concrete floor slab placed directly on prepared subgrade, used as the ground floor for commercial, industrial, and residential buildings. Slab thickness, reinforcing, and joint layout must be designed to resist the applied loads and control cracking.",
    extended: "Slab-on-grade thickness and reinforcing depend on the floor live loads, vehicle loads (forklift, truck), the soil subgrade support (modulus of subgrade reaction from the geotechnical report), and the shrinkage-crack control requirements. Unreinforced slabs rely on contraction joints to control cracking; wire mesh or rebar controls crack width but does not prevent cracking; post-tensioned slabs use prestress to reduce crack risk and can span longer without joints. In expansive soil areas, the slab must be designed to resist uplift forces or detailed to move with the soil without structural distress. Apex Grid designs slabs-on-grade for warehouses, industrial facilities, retail spaces, and multifamily ground floors.",
    relatedTerms: ["foundation", "expansive-soil", "dead-load", "live-load"],
    relatedServices: [
      { label: "Structural Engineering", href: "/services/structural" },
    ],
  },

  {
    slug: "soil-boring",
    term: "Soil Boring",
    category: "geotech",
    definition: "A soil boring is a subsurface investigation technique in which a drilling rig advances a hollow rod into the ground to collect soil samples and measure soil resistance at regular intervals. The data from soil borings is analyzed by the geotechnical engineer to characterize the soil profile, determine bearing capacities, and identify any problematic conditions.",
    extended: "Standard Penetration Tests (SPT) are conducted within the boring by counting the number of hammer blows required to drive a split-spoon sampler 12 inches — the N-value indicates relative soil density. Undisturbed tube samples are collected from fine-grained soils for laboratory consolidation and shear strength testing. The depth and number of borings depends on the project size, load levels, and variability of soil conditions; most commercial sites require 3–8 borings to an adequate depth. The geotechnical engineer assembles the boring data into a geotechnical report with foundation recommendations, bearing pressures, and site-specific seismic site class determination. Apex Grid coordinates project scope and boring locations with the geotechnical subconsultant.",
    relatedTerms: ["allowable-bearing-pressure", "settlement", "expansive-soil", "foundation"],
    relatedServices: [
      { label: "Geotechnical Engineering", href: "/services/structural" },
    ],
  },

  {
    slug: "truss",
    term: "Truss",
    category: "structural",
    definition: "A truss is a structural assembly of individual members arranged in a triangulated pattern that together act to span distances greater than a single beam of similar depth could economically achieve. Trusses carry loads primarily through axial tension and compression forces in their members.",
    extended: "Wood roof trusses are manufactured off-site and are the dominant roof framing system for residential and light commercial construction. Steel bar joists are open-web trusses common in industrial, retail, and commercial buildings. The efficiency of trusses comes from triangulation — each panel is a triangle, which is a rigid geometric shape. The top chord carries compression, the bottom chord carries tension, and the webs carry shear as a combination of tension and compression. The engineer must verify that panel point loads align with the truss joints, since out-of-panel loads create bending in the top chord that standard truss designs do not account for. Installing heavy HVAC equipment on a roof framed with light wood trusses requires engineering review.",
    relatedTerms: ["joist", "beam", "dead-load", "live-load"],
    relatedServices: [
      { label: "Structural Engineering", href: "/services/structural" },
      { label: "Existing-Building Engineering", href: "/existing-building-engineering/" },
    ],
  },

  {
    slug: "wind-load",
    term: "Wind Load",
    category: "structural",
    definition: "Wind load is the force exerted on a building by wind pressure, acting as positive pressure on windward faces and negative (suction) pressure on leeward faces, roofs, and sidewalls. Wind loads must be resisted by the building's lateral force resisting system and the connections of the exterior cladding to the structure.",
    extended: "ASCE 7 Chapter 27 provides the main wind force resisting system (MWFRS) procedures for determining design wind pressures on buildings. The wind pressure depends on the site's basic wind speed (from regional maps in ASCE 7), the building's exposure category (terrain roughness), the height and geometry of the building, and the occupancy Risk Category. Wind loads include positive pressure on the windward wall, suction on the leeward wall and sidewalls, and uplift on flat or low-slope roofs. Components and cladding (C&C) wind pressures used for windows, wall panels, and roof coverings are often higher than MWFRS pressures. Apex Grid engineers lateral systems, roof attachments, and cladding connections for wind loads across all exposure zones.",
    relatedTerms: ["seismic-load", "dead-load", "asce-7", "shear-wall", "lateral-load-resisting-system"],
    relatedServices: [
      { label: "Structural Engineering", href: "/services/structural" },
    ],
  },

  // ─── MEP TERMS ──────────────────────────────────────────────────────────

  {
    slug: "ashrae",
    term: "ASHRAE (American Society of Heating, Refrigerating and Air-Conditioning Engineers)",
    category: "mep",
    definition: "ASHRAE is the professional society that publishes the standards governing HVAC, refrigeration, building energy performance, and indoor air quality used throughout the engineering and construction industry. Key ASHRAE standards include 62.1 (ventilation), 90.1 (energy efficiency), and 55 (thermal comfort).",
    extended: "ASHRAE 62.1 specifies minimum outside air ventilation rates for commercial buildings and is referenced by the IBC and most mechanical codes as the ventilation standard. ASHRAE 90.1 is the model energy standard for commercial buildings adopted in most states not using Title 24, setting efficiency minimums for HVAC, lighting, and the building envelope. ASHRAE Standard 55 defines the conditions for acceptable thermal comfort in occupied spaces. ASHRAE also publishes the Handbook of Fundamentals and HVAC Applications, which are the primary engineering references for load calculations, duct design, and system selection. Apex Grid's mechanical engineers apply ASHRAE standards on all commercial HVAC projects.",
    relatedTerms: ["hvac", "vav", "iecc", "title-24", "mep"],
    relatedServices: [
      { label: "MEP Engineering", href: "/services/mep" },
    ],
  },

  {
    slug: "domestic-water",
    term: "Domestic Water System",
    category: "mep",
    definition: "The domestic water system in a building is the network of pipes that delivers potable cold water from the utility main or well to all plumbing fixtures, and the hot water system that heats and distributes hot water throughout the building. Plumbing engineers design the domestic water system for adequate pressure, flow, and water quality.",
    extended: "The domestic water system includes the service entrance and meter, backflow preventers, pressure reducing valves (if utility pressure exceeds 80 psi), the cold water distribution piping, water heaters or a central hot water plant, hot water distribution piping, and a hot water recirculation system for larger buildings. Pipe sizing is based on the fixture unit method (per the applicable plumbing code — IPC, UPC, or state equivalent) to ensure adequate flow and pressure at all fixtures under peak demand. Water heater sizing accounts for the number of fixtures, the peak hourly demand, and the recovery rate. In healthcare, laboratory, and food service facilities, additional treatment (softening, filtration, or purification) may be required. Apex Grid designs domestic water systems where project-specific credentials and authorization are verified.",
    relatedTerms: ["mep", "sanitary-riser", "medical-gas"],
    relatedServices: [
      { label: "Plumbing Engineering", href: "/services/mep" },
      { label: "MEP Engineering", href: "/services/mep" },
    ],
  },

  {
    slug: "grease-exhaust",
    term: "Grease Exhaust (Kitchen Exhaust Hood)",
    category: "mep",
    definition: "Grease exhaust systems capture cooking effluent — grease-laden air, heat, steam, and combustion products — from commercial cooking equipment and exhaust it to the outside. Proper design is required by the mechanical code and fire code to prevent grease accumulation, reduce fire risk, and provide adequate ventilation for kitchen workers.",
    extended: "Grease exhaust hoods must be sized to capture the airflow from the cooking equipment below, with capture velocities determined by the type of cooking and hood geometry per NFPA 96 and the mechanical code. The exhaust duct must be constructed from 16-gauge steel with continuous liquid-tight welded seams (not just sealed joints), must be accessible for cleaning, and must be pitched to drain grease back to the hood. Make-up air must be supplied to replace the exhausted air without causing negative pressure in the kitchen. Fire suppression systems are required within the hood and duct. Apex Grid engineers kitchen exhaust systems for restaurants, institutional kitchens, and commercial food service tenant improvements.",
    relatedTerms: ["make-up-air", "hvac", "mep"],
    relatedServices: [
      { label: "MEP Engineering", href: "/services/mep" },
      { label: "Restaurant Engineering", href: "/services/mep" },
    ],
  },

  {
    slug: "load-calculation",
    term: "Load Calculation (HVAC)",
    category: "mep",
    definition: "An HVAC load calculation determines the amount of heating and cooling energy required to maintain a building's interior at design temperatures under peak weather conditions. Load calculations are the fundamental basis for HVAC system sizing and must be performed by a mechanical engineer before equipment can be selected.",
    extended: "The cooling load calculation accounts for heat gain through the building envelope (walls, roof, glass), solar gain through windows, internal heat gains from occupants, lighting, and equipment, and outdoor air ventilation loads. The heating load calculation accounts for heat loss through the building envelope and the energy required to heat outdoor ventilation air. ASHRAE methods (CLTD, RTS, or HB) are used for commercial buildings; the Manual J procedure is used for residential. Undersized equipment leads to uncomfortable spaces; oversized equipment short-cycles, reducing efficiency and humidity control. Building permit submittals for HVAC often require a load calculation report. Apex Grid performs load calculations as the foundation of all mechanical engineering work.",
    relatedTerms: ["hvac", "vav", "vrf", "rtu", "ashrae"],
    relatedServices: [
      { label: "MEP Engineering", href: "/services/mep" },
      { label: "Mechanical Engineering", href: "/services/mep" },
    ],
  },

  {
    slug: "make-up-air",
    term: "Make-Up Air (MUA)",
    category: "mep",
    definition: "Make-up air (MUA) is supply air introduced into a space to replace air that has been exhausted, maintaining neutral or slightly positive pressure in the building. Without adequate make-up air, exhaust systems draw inadequate airflow, create negative pressure problems, and can cause back-drafting of combustion appliances.",
    extended: "In commercial kitchens, large volumes of air exhausted through the grease hood must be replaced by a make-up air unit, which may supply heated, cooled, or unconditioned outside air depending on the climate and owner's preference. The mechanical engineer balances the exhaust and supply quantities, determines where make-up air should be introduced (short-circuit protection is important in kitchens), and selects equipment accordingly. In lab and healthcare environments, 100% outside air systems require equal make-up air. ASHRAE 62.1 and the IMC specify how make-up air must be distributed to avoid thermal discomfort or short-circuiting. Apex Grid designs make-up air systems for restaurants, laboratories, industrial facilities, and commercial kitchens.",
    relatedTerms: ["grease-exhaust", "hvac", "vav", "ashrae"],
    relatedServices: [
      { label: "MEP Engineering", href: "/services/mep" },
      { label: "Kitchen Ventilation", href: "/services/mep" },
    ],
  },

  {
    slug: "medical-gas",
    term: "Medical Gas System",
    category: "mep",
    definition: "Medical gas systems distribute piped oxygen, medical air, nitrous oxide, vacuum, and other specialty gases throughout healthcare facilities to patient care areas. Medical gas systems are life-safety systems regulated by NFPA 99 and must be designed, installed, and tested by certified personnel.",
    extended: "The primary medical gases are oxygen (O2) for respiratory support, medical air (oil-free compressed air) for equipment, nitrous oxide (N2O) for anesthesia, nitrogen (N2) for surgical tools, and waste anesthetic gas disposal (WAGD). Each gas has its own color-coded piping, dedicated shutoffs, and alarm system. NFPA 99 defines the health care facility categories (Category 1, 2, 3, 4) and the design and testing requirements for each. Medical gas outlets, source equipment, master alarm panels, and zone valve boxes all require specific design and installation. Apex Grid engineers medical gas systems for hospitals, ambulatory surgery centers, dental offices, and medical office buildings, coordinating with ASSE 6010-certified medical gas verifiers.",
    relatedTerms: ["mep", "domestic-water", "hvac"],
    relatedServices: [
      { label: "Healthcare MEP Engineering", href: "/services/mep" },
      { label: "MEP Engineering", href: "/services/mep" },
    ],
  },

  {
    slug: "one-line-diagram",
    term: "One-Line Diagram (Single-Line Diagram)",
    category: "mep",
    definition: "A one-line diagram (also called a single-line diagram) is a simplified electrical drawing that uses single lines to represent multi-conductor circuits and standard symbols to show electrical components — service entrance, transformers, switchboards, panels, and large equipment — and their interconnections. It is the primary electrical drawing used for permit submittals, utility coordination, and construction.",
    extended: "The one-line diagram shows the complete power distribution system from the utility service entrance through the main switchboard, distribution panels, sub-panels, and motor control centers to all major loads. Component ratings — ampacity, interrupting capacity, voltage — are shown for each device. The structural engineer and contractor use the one-line to understand the scope and routing of main feeders. Utility companies review the one-line diagram when approving service entrance applications and utility interconnections. Code compliance for fault current ratings, selective coordination, and ground fault protection can be verified on the one-line. Apex Grid produces one-line diagrams as standard deliverables on all electrical engineering projects.",
    relatedTerms: ["panel-schedule", "nec", "mep", "load-calculation"],
    relatedServices: [
      { label: "Electrical Engineering", href: "/services/mep" },
      { label: "MEP Engineering", href: "/services/mep" },
    ],
  },

  {
    slug: "panel-schedule",
    term: "Panel Schedule",
    category: "mep",
    definition: "A panel schedule is an electrical drawing or table that lists all circuit breakers in a panelboard, showing the circuit number, breaker size, connected load description, and calculated current for each circuit. Panel schedules are required on all electrical permit submittals and are essential for load balancing and code compliance verification.",
    extended: "The electrical engineer creates the panel schedule by assigning each load (lighting, receptacles, equipment, HVAC) to a circuit, sizing the breaker to protect the conductor, and verifying that the total connected load and demand load do not exceed the panelboard's bus ampacity. NEC Article 408 governs panelboard construction, and NEC 220 provides the load calculation methods for sizing feeders and panels. The panel schedule also shows the phase assignment for each circuit, allowing the engineer to balance loads across the three phases. Space planning considerations — how many spare breakers are needed, whether a larger main breaker is needed for future loads — are part of the design. Apex Grid produces panel schedules for all commercial and government electrical projects.",
    relatedTerms: ["one-line-diagram", "nec", "load-calculation", "mep"],
    relatedServices: [
      { label: "Electrical Engineering", href: "/services/mep" },
      { label: "MEP Engineering", href: "/services/mep" },
    ],
  },

  {
    slug: "sanitary-riser",
    term: "Sanitary Riser (Plumbing Riser Diagram)",
    category: "mep",
    definition: "A sanitary riser diagram is a schematic drawing showing the vertical arrangement of plumbing waste and vent pipes through a multi-story building, depicting how each fixture group connects to the building drain and ultimately to the sanitary sewer. Riser diagrams are required on permit submittals for multi-story commercial and residential buildings.",
    extended: "The riser diagram shows the drain, waste, and vent (DWV) pipe sizes, slopes, cleanout locations, and the path of the main building drain to the sewer. It allows the plumbing engineer and inspector to verify that venting is properly arranged to maintain trap seal and prevent sewer gas entry, that pipes are sized for the fixture unit loading, and that the pipe routing is practical given the building structure. In tall buildings, offsets in waste stacks must be engineered to prevent excessive negative pressure in the stack. Apex Grid's plumbing engineers produce sanitary riser diagrams for all multi-story MEP projects.",
    relatedTerms: ["mep", "domestic-water", "stormwater"],
    relatedServices: [
      { label: "Plumbing Engineering", href: "/services/mep" },
      { label: "MEP Engineering", href: "/services/mep" },
    ],
  },

  // ─── CIVIL TERMS ─────────────────────────────────────────────────────────

  {
    slug: "compaction",
    term: "Compaction (Soil Compaction)",
    category: "geotech",
    definition: "Soil compaction is the process of mechanically increasing the density of soil by reducing void space, improving its load-bearing capacity, reducing settlement potential, and increasing resistance to erosion. Compaction is specified as a percentage of maximum dry density determined by a Proctor test and is verified by a compaction testing agency during construction.",
    extended: "The geotechnical engineer specifies the required compaction level for fills and subgrades — typically 90–95% of the modified Proctor maximum dry density for structural fills under pavements and foundations. The contractor uses rollers, vibratory plates, or rammers to achieve the specified density, and a testing agency performs nuclear density gauge or sand cone tests to verify compliance. Over-compaction can be a problem in native soils adjacent to foundations; under-compaction leads to settlement and pavement failure. Compaction testing is particularly important in earthwork for large grading projects, parking lots, and structural fill under slabs-on-grade. Apex Grid coordinates with the geotechnical engineer and testing agency on all civil and grading projects.",
    relatedTerms: ["soil-boring", "grading", "foundation", "settlement"],
    relatedServices: [
      { label: "Civil Engineering", href: "/services/civil" },
      { label: "Geotechnical Engineering", href: "/services/structural" },
    ],
  },

  {
    slug: "drainage",
    term: "Drainage (Site Drainage)",
    category: "civil",
    definition: "Site drainage is the engineered system of graded surfaces, swales, inlets, pipes, and detention or retention facilities that collects and conveys stormwater runoff from a developed site to an approved outfall. Proper drainage design prevents flooding, erosion, and property damage while complying with local stormwater regulations.",
    extended: "Site drainage design begins with hydrology — calculating the runoff from the site for the design storm event (typically the 10-year or 100-year storm, depending on jurisdiction). The civil engineer designs swales, channels, inlets, and underground storm sewer pipes to convey the design flow without overtopping. Detention basins temporarily store runoff and release it slowly to limit peak flows to pre-development rates, which is typically required by local stormwater management ordinances. Retention ponds permanently store runoff for infiltration or evaporation. Low Impact Development (LID) techniques — bioretention, permeable pavement, green roofs — reduce runoff through infiltration and evapotranspiration. Apex Grid designs site drainage systems for commercial, industrial, and multifamily development.",
    relatedTerms: ["stormwater", "grading", "compaction"],
    relatedServices: [
      { label: "Civil Engineering", href: "/services/civil" },
    ],
  },

  {
    slug: "grading",
    term: "Grading (Site Grading)",
    category: "civil",
    definition: "Grading is the earthwork process of reshaping the ground surface of a site to achieve design elevations, establish drainage patterns, prepare subgrades for foundations and pavements, and create a buildable platform. A grading plan shows existing and proposed contours, cut and fill areas, and drainage patterns.",
    extended: "The civil engineer designs the grading plan by setting finish floor elevations, establishing positive drainage away from buildings (minimum 2% slope per IBC), and designing the transitions between the building pad and adjacent hardscape, landscaping, and streets. Cut-and-fill volumes are balanced where possible to minimize hauling costs — a cut/fill balance analysis shows whether the site generates excess material (requiring export) or a deficit (requiring import). Grading near property lines, in floodplains, or on slopes exceeding 2:1 requires additional analysis and may trigger retaining wall engineering. The geotechnical engineer provides earthwork recommendations — compaction specifications, suitability of on-site materials for fill, and expansion potential of the native soils. Apex Grid prepares grading plans as part of civil site development packages.",
    relatedTerms: ["drainage", "stormwater", "compaction", "retaining-wall"],
    relatedServices: [
      { label: "Civil Engineering", href: "/services/civil" },
    ],
  },

  {
    slug: "stormwater",
    term: "Stormwater Management",
    category: "civil",
    definition: "Stormwater management encompasses the planning, design, and permitting of systems that control the quantity and quality of rainfall runoff from developed sites. Local and state regulations require stormwater management plans that limit runoff rates, treat pollutants, and protect downstream waterways.",
    extended: "New development typically disturbs natural drainage patterns and increases imperviousness, generating more runoff at faster rates than pre-development conditions. Stormwater management regulations require developers to maintain or restore pre-development runoff rates through detention, retention, or LID measures. In many jurisdictions, water quality treatment is also required — removing sediment, nutrients, oil, and grease through bioretention cells, constructed wetlands, filtration systems, or vegetated swales. NPDES construction general permits from the EPA require stormwater pollution prevention plans (SWPPPs) for most sites over one acre. Apex Grid prepares stormwater management plans and SWPPPs where project-specific credentials and authorization are verified.",
    relatedTerms: ["drainage", "grading", "compaction"],
    relatedServices: [
      { label: "Civil Engineering", href: "/services/civil" },
    ],
  },

  // ─── ADDITIONAL PERMIT/CODE TERMS ──────────────────────────────────────

  {
    slug: "asce-7",
    term: "ASCE 7 (Minimum Design Loads and Associated Criteria)",
    category: "structural",
    definition: "ASCE 7 is the American Society of Civil Engineers standard that specifies the minimum loads — dead, live, wind, snow, seismic, flood, and other hazards — that structural engineers must use in designing buildings and other structures in the United States. It is referenced by the IBC and virtually all U.S. building codes.",
    extended: "ASCE 7 provides the load maps, load combination equations, and analysis procedures for each load type. Chapter 2 covers load combinations; Chapter 7 covers snow loads; Chapters 26–31 cover wind loads for the main wind force resisting system and components; Chapters 11–23 cover seismic design. The seismic hazard maps in ASCE 7 are derived from USGS probabilistic seismic hazard models and define the ground motion parameters Ss and S1 used to determine the Seismic Design Category. ASCE 7 is updated on a six-year cycle (most recently 2022); the edition adopted depends on the local IBC edition. Apex Grid's structural engineers apply the governing edition of ASCE 7 on every project.",
    relatedTerms: ["ibc", "seismic-load", "wind-load", "dead-load", "live-load", "seismic-design-category"],
    relatedServices: [
      { label: "Structural Engineering", href: "/services/structural" },
    ],
  },

  {
    slug: "certificate-of-occupancy",
    term: "Certificate of Occupancy (CO)",
    category: "permit",
    definition: "A Certificate of Occupancy (CO) is a document issued by the local building department confirming that a building has been constructed or altered in compliance with the approved plans and applicable codes, and that it is safe for its intended occupancy. A CO is required before a building can legally be occupied.",
    extended: "To obtain a CO, the building must pass all required inspections — structural framing, rough MEP, energy, fire, and final. Any items found deficient during inspection (correction items) must be remedied before the CO is issued. For tenant improvements, a CO (or sometimes a Certificate of Final Inspection) is issued for the specific space. Temporary COs can be issued for portions of a building while other areas remain under construction. Apex Grid's engineers respond to plan-check corrections and support the inspection process to help clients reach CO as efficiently as possible.",
    relatedTerms: ["ahj", "plan-check", "pe", "ibc"],
    relatedServices: [
      { label: "Permit Engineering", href: "/permit-engineering/" },
    ],
  },

  {
    slug: "permit-drawings",
    term: "Permit Drawings (Construction Documents)",
    category: "permit",
    definition: "Permit drawings are the set of engineering drawings — structural, MEP, civil, and sometimes architectural — prepared by licensed professionals and submitted to the building department for plan review as part of the building permit application. They must contain enough detail for the AHJ to verify code compliance and for the contractor to build from.",
    extended: "Permit drawings include cover sheets with code summary information, site plans, floor plans, structural framing plans and details, MEP floor plans and schedules, and civil grading and utility plans. The drawings must be signed and stamped by licensed PEs in the applicable disciplines. The level of detail required varies by project type and jurisdiction — simple tenant improvements may require only a few sheets, while a new commercial building can require hundreds. After plan review, the AHJ issues plan-check comments; the engineer revises the drawings to address comments and resubmits for approval. Apex Grid produces permit-ready drawing sets where the responsible professional's license, firm authorization, discipline, and AHJ requirements are verified.",
    relatedTerms: ["ahj", "pe", "plan-check", "rfi"],
    relatedServices: [
      { label: "Permit Engineering", href: "/permit-engineering/" },
    ],
  },

  {
    slug: "plan-check",
    term: "Plan Check (Plan Review)",
    category: "permit",
    definition: "Plan check (or plan review) is the process by which the building department or a third-party plan review agency examines the submitted engineering drawings and calculations for compliance with the adopted building code before issuing a building permit. The plan check results in either approval, conditional approval, or a list of corrections that must be addressed.",
    extended: "Plan checkers review structural calculations against the IBC and ASCE 7, MEP drawings against the NEC and mechanical/plumbing codes, and energy compliance documentation against the IECC or Title 24. Complex or large projects may take weeks to months for plan check; minor tenant improvements can be approved over the counter the same day in some jurisdictions. When plan check comments are issued, the engineer of record must respond in writing to each comment, either making the requested revision or providing a code citation justifying the original design. Multiple rounds of plan check are common for complex projects. Apex Grid's engineers are experienced in responding to plan-check comments efficiently to minimize permit delays.",
    relatedTerms: ["ahj", "pe", "ibc", "permit-drawings", "certificate-of-occupancy"],
    relatedServices: [
      { label: "Permit Engineering", href: "/permit-engineering/" },
    ],
  },


  // ─── ADDITIONAL TERMS ───────────────────────────────────────────────────

  {
    slug: "baba",
    term: "BABA (Build America, Buy America Act)",
    category: "general",
    definition: "The Build America, Buy America Act (BABA) requires that iron, steel, manufactured products, and construction materials used in federally funded infrastructure projects be produced in the United States. It applies to grants and financial assistance administered through the Infrastructure Investment and Jobs Act of 2021.",
    extended: "BABA expanded existing Buy America requirements to new federal program areas, including transportation, water infrastructure, broadband, and other federally assisted projects. For engineering projects on federal facilities or receiving federal funding, the design team and contractor must track product origins and obtain waivers for any non-domestic materials. Waivers are available on a project-specific, product-specific, or categorical basis when domestic products are not available, are not in sufficient quantity, or would be unreasonably costly. BABA compliance is increasingly important for public works projects and government facility engineering. Apex Grid's government project experience includes coordination of Buy America requirements with contractors.",
    relatedTerms: ["ufc", "atfp", "pe"],
    relatedServices: [
      { label: "Government Engineering", href: "/government/" },
    ],
  },

  {
    slug: "cad",
    term: "CAD (Computer-Aided Design)",
    category: "general",
    definition: "Computer-Aided Design (CAD) is the use of software to create, modify, and document engineering drawings and models. CAD replaced manual drafting and is the standard tool for producing permit drawings, construction documents, and coordination drawings across all engineering disciplines.",
    extended: "Two-dimensional CAD (AutoCAD, MicroStation) produces flat plans, sections, and details — the format most commonly used for permit submissions. Three-dimensional CAD and BIM software (Revit, Navisworks) add geometry, data, and clash detection capabilities. Engineers use CAD to produce structural framing plans, MEP floor plans, civil grading and utility plans, and all associated details and schedules. The CAD file format (.DWG, .DXF, .RVT) is significant because other project team members and contractors need to work with the files during coordination and construction. Apex Grid delivers CAD files in formats appropriate to each project's coordination and construction team requirements.",
    relatedTerms: ["bim", "permit-drawings", "rfi"],
    relatedServices: [
      { label: "Permit Engineering", href: "/permit-engineering/" },
      { label: "Engineering Services", href: "/services/" },
    ],
  },

  {
    slug: "bearing-capacity",
    term: "Bearing Capacity",
    category: "geotech",
    definition: "Bearing capacity is the maximum load per unit area that a soil or rock mass can support before shear failure occurs. Geotechnical engineers determine both the ultimate bearing capacity (the failure load) and the allowable bearing capacity (the safe working load, which includes a factor of safety) for foundation design.",
    extended: "Ultimate bearing capacity is calculated using classical soil mechanics equations (Terzaghi, Meyerhof, Hansen) that account for soil cohesion, friction angle, foundation geometry, depth, and groundwater conditions. The allowable bearing capacity — which governs foundation sizing — typically applies a factor of safety of 2–3 to the ultimate value. Soil with higher friction angle and cohesion (dense sands, stiff clays, rock) have higher bearing capacities; loose sands, soft clays, and organic soils have low bearing capacities and may require deep foundations or ground improvement. Settlement analysis supplements bearing capacity calculations — a soil may have adequate bearing capacity but still experience unacceptable settlement under load.",
    relatedTerms: ["allowable-bearing-pressure", "soil-boring", "foundation", "settlement"],
    relatedServices: [
      { label: "Geotechnical Engineering", href: "/services/structural" },
      { label: "Structural Engineering", href: "/services/structural" },
    ],
  },

  {
    slug: "chilled-water-system",
    term: "Chilled Water System",
    category: "mep",
    definition: "A chilled water system is a central HVAC cooling approach in which a chiller plant produces chilled water (typically 44–45°F supply) that is pumped to air handling units and fan coil units throughout the building to absorb heat from the space. Chilled water systems are common in large commercial, institutional, and campus facilities.",
    extended: "The chilled water system consists of the chiller (which removes heat from the water using a refrigeration cycle), the chilled water pump, the distribution piping, and the cooling coils in the air handling units or fan coil units. A companion condenser water system (cooling tower + condenser water pumps) rejects the heat from the chiller to the outdoor air. Chilled water systems offer energy efficiency advantages for large buildings and provide a centralized maintenance point. The mechanical engineer sizes the chiller, cooling coils, and pumping system using building cooling loads and system design temperatures. Apex Grid engineers chilled water systems for hospitals, universities, large office buildings, and government facilities.",
    relatedTerms: ["hvac", "vav", "load-calculation", "mep"],
    relatedServices: [
      { label: "MEP Engineering", href: "/services/mep" },
      { label: "Mechanical Engineering", href: "/services/mep" },
    ],
  },

  {
    slug: "change-of-occupancy",
    term: "Change of Occupancy",
    category: "permit",
    definition: "A change of occupancy occurs when a building or space is converted from one use classification to another — for example, converting a warehouse to a fitness center, or an office to a healthcare clinic. Building codes require a change-of-occupancy review to verify that the building meets the requirements of the new use.",
    extended: "Under the IBC, each occupancy group (A for assembly, B for business, I for institutional, M for mercantile, S for storage, etc.) has different requirements for fire protection, structural loads, means of egress, ventilation, and accessibility. When a building changes from one group to another, the AHJ evaluates whether the existing construction meets the requirements for the new occupancy — often triggering upgrades to sprinklers, electrical service, accessible routes, and structural systems. A change of occupancy permit typically requires engineering drawings and calculations demonstrating compliance. Apex Grid evaluates existing buildings for change-of-occupancy compliance and provides the required structural, MEP, and civil engineering.",
    relatedTerms: ["ibc", "ahj", "pe", "plan-check"],
    relatedServices: [
      { label: "Existing-Building Engineering", href: "/existing-building-engineering/" },
      { label: "Permit Engineering", href: "/permit-engineering/" },
    ],
  },

  {
    slug: "collector",
    term: "Collector / Drag Strut",
    category: "structural",
    definition: "A collector (also called a drag strut) is a structural element — typically a beam, chord, or reinforced slab region — that collects lateral forces from the diaphragm and drags (transfers) them to a shear wall, braced frame, or moment frame below. Collectors are critical elements in the seismic and wind load path.",
    extended: "When a shear wall does not extend the full length of a diaphragm, a collector must span from the wall end to the edges of the diaphragm to gather the forces that cannot be directly transferred. Collectors must be designed for both tension and compression forces, and their connections to the diaphragm and to the vertical resisting element must be detailed for the full collector force. In wood-frame construction, collectors are typically doubled top plates with metal connector straps; in steel-frame construction, beams act as collectors with moment or shear connections. Collector design is often one of the most demanding aspects of seismic detailing for irregular or large diaphragm buildings.",
    relatedTerms: ["diaphragm", "shear-wall", "lateral-load-resisting-system", "seismic-load"],
    relatedServices: [
      { label: "Structural Engineering", href: "/services/structural" },
    ],
  },

  {
    slug: "detention-basin",
    term: "Detention Basin",
    category: "civil",
    definition: "A detention basin is a stormwater management facility that temporarily stores runoff from a developed site during a rain event and releases it slowly to downstream waterways at a controlled rate, limiting peak flows to pre-development levels. Unlike retention ponds, detention basins are designed to drain completely between storm events.",
    extended: "Detention basins are required by local stormwater ordinances when development increases the impervious area of a site, which accelerates and increases runoff. The civil engineer performs hydrologic and hydraulic analysis to size the basin — calculating the storage volume needed to absorb the design storm peak inflow and the outlet structure orifice to control the release rate. Detention basins can be above-ground (dry ponds, wet ponds) or underground (proprietary modular systems under parking lots). Maintenance is critical — accumulated sediment reduces basin capacity over time. Apex Grid designs detention basins as part of civil stormwater management packages for commercial and industrial development.",
    relatedTerms: ["stormwater", "drainage", "grading"],
    relatedServices: [
      { label: "Civil Engineering", href: "/services/civil" },
    ],
  },

  {
    slug: "energy-recovery-ventilator",
    term: "Energy Recovery Ventilator (ERV / HRV)",
    category: "mep",
    definition: "An Energy Recovery Ventilator (ERV) or Heat Recovery Ventilator (HRV) is a mechanical ventilation device that transfers heat and moisture (ERV) or heat only (HRV) between the outgoing exhaust air stream and the incoming outdoor air stream, reducing the energy required to condition outdoor ventilation air.",
    extended: "ASHRAE 90.1 and some Title 24 editions require energy recovery on HVAC systems that exhaust large volumes of air — above threshold airflow rates and in climate zones where the energy savings justify the added cost. ERVs use a total energy wheel or plate heat exchanger to transfer 60–80% of the heat (and moisture for ERVs) from the exhaust air to the incoming outdoor air. HRVs transfer only sensible heat, making them more suitable for cold climates where indoor humidity control is important. The mechanical engineer evaluates whether energy recovery is required by code and designs the ERV/HRV into the air handling system. Apex Grid includes energy recovery analysis in all commercial HVAC designs where code requirements or energy goals warrant it.",
    relatedTerms: ["hvac", "ashrae", "make-up-air", "load-calculation"],
    relatedServices: [
      { label: "MEP Engineering", href: "/services/mep" },
    ],
  },

  {
    slug: "impervious-surface",
    term: "Impervious Surface",
    category: "civil",
    definition: "An impervious surface is any paved or covered ground surface — roofs, parking lots, roads, sidewalks — that prevents rainfall from infiltrating into the soil, causing it to run off as stormwater instead. The percentage of impervious surface on a site drives stormwater volume, peak flow rates, and water quality requirements.",
    extended: "Replacing natural land cover with impervious surfaces is one of the primary causes of increased stormwater runoff from development. Municipal stormwater programs and development ordinances typically regulate the maximum impervious cover allowed, require stormwater management for any increase in impervious area, and may charge stormwater utility fees based on impervious area. Civil engineers calculate the pre-development and post-development impervious percentages as part of the stormwater management analysis. Low Impact Development (LID) approaches — bioretention, permeable pavement, green roofs — reduce effective impervious cover by allowing infiltration. Apex Grid accounts for impervious surface calculations in all civil site development projects.",
    relatedTerms: ["stormwater", "detention-basin", "drainage", "grading"],
    relatedServices: [
      { label: "Civil Engineering", href: "/services/civil" },
    ],
  },

  {
    slug: "post-tensioned-concrete",
    term: "Post-Tensioned Concrete",
    category: "structural",
    definition: "Post-tensioned (PT) concrete is a form of prestressed concrete in which high-strength steel tendons are tensioned after the concrete has cured, placing the concrete in compression and dramatically improving its ability to span long distances and resist cracking. PT slabs and beams are common in parking structures, high-rise floors, and slabs-on-grade in expansive soil areas.",
    extended: "In unbonded post-tensioned construction (the most common in buildings), monostrand tendons — a single 0.5-inch diameter strand coated with grease and wrapped in plastic sheathing — run through the concrete slab or beam and are anchored at the slab edges. After curing, a hydraulic jack pulls each strand to a design stress (typically 175–180 ksi) and it is locked off at the anchorage. The prestress force keeps the concrete in compression, effectively eliminating tensile cracking and allowing longer spans with shallower sections. Post-tensioned slabs-on-grade are used in expansive soil areas because the prestress can resist the uplift forces from soil expansion better than conventional reinforced slabs. PT design requires specialized detailing knowledge and experienced engineers.",
    relatedTerms: ["slab", "foundation", "dead-load", "live-load"],
    relatedServices: [
      { label: "Structural Engineering", href: "/services/structural" },
    ],
    answerLinks: [
      { label: "the post-tensioned concrete design process and cost drivers", href: "/answers/post-tensioned-concrete-design-cost/" },
    ],
  },

  {
    slug: "tilt-up",
    term: "Tilt-Up Construction",
    category: "structural",
    definition: "Tilt-up construction is a method of building construction in which concrete wall panels are cast horizontally on the building's floor slab and then lifted (tilted up) into place by a crane. Tilt-up is the dominant construction method for single-story industrial, warehouse, and big-box retail buildings in the western and southwestern United States.",
    extended: "Tilt-up panels are cast on the floor slab with embed plates, lifting inserts, and brace inserts cast in. After the panels reach design strength (typically 28 days), a crane attaches to the lifting hardware and tilts the panels to vertical, where they are braced temporarily until the roof is constructed. The structural engineer designs the panel for the lifting stresses, the in-place gravity and lateral loads, and the connections to the foundation and roof diaphragm. Openings in panels require jamb and header reinforcing to transfer loads around the opening. Tilt-up buildings are economical and fast to construct, but require careful coordination between the structural engineer, the tilt-up contractor, and the crane crew. Apex Grid has extensive tilt-up structural engineering experience across the Sun Belt.",
    relatedTerms: ["shear-wall", "diaphragm", "anchor-bolt", "slab"],
    relatedServices: [
      { label: "Structural Engineering", href: "/services/structural" },
    ],
  },

  {
    slug: "tenant-improvement",
    term: "Tenant Improvement (TI)",
    category: "general",
    definition: "A tenant improvement (TI) is a construction project that modifies an existing commercial space to suit a new tenant's specific requirements. TI projects range from cosmetic updates to full gut-and-rebuild renovations and typically require engineering drawings and permits for structural, MEP, and any change-of-occupancy work.",
    extended: "Engineering requirements for a TI depend on the scope: opening or removing walls may require structural engineering to verify load paths and design headers; adding or relocating HVAC, plumbing, or electrical systems requires MEP engineering; a change of occupancy (e.g., converting retail to restaurant) triggers code compliance review across all disciplines. TI projects have tight schedules driven by tenant move-in dates and landlord delivery commitments, making fast turnaround on engineering drawings critical. Apex Grid regularly provides TI engineering packages — structural, MEP, or both — across retail, restaurant, medical office, industrial, and office occupancies, with permit-ready deliverables produced on compressed timelines.",
    relatedTerms: ["change-of-occupancy", "mep", "permit-drawings", "ibc"],
    relatedServices: [
      { label: "MEP Engineering", href: "/services/mep" },
      { label: "Permit Engineering", href: "/permit-engineering/" },
    ],
  },

  {
    slug: "seismic-retrofit",
    term: "Seismic Retrofit",
    category: "structural",
    definition: "A seismic retrofit is a structural modification of an existing building to improve its ability to resist earthquake forces, reducing the risk of damage or collapse during a seismic event. Retrofit measures typically add new lateral force resisting elements — shear walls, braced frames, moment frames — or strengthen existing connections and foundations.",
    extended: "Seismic retrofits are triggered by mandatory programs (such as Los Angeles's soft-story ordinance requiring retrofit of pre-1978 wood-frame apartments), voluntary upgrades, change-of-occupancy reviews, or building assessments following an earthquake. Common retrofit strategies include adding plywood shear walls, installing steel moment frames or braced frames, strengthening soft-story columns with steel jackets, and improving foundation connections. The structural engineer performs a seismic evaluation following ASCE 41 (Seismic Evaluation and Retrofit of Existing Buildings) to quantify the deficiencies and design the retrofit scope. Apex Grid provides seismic evaluation and retrofit engineering for commercial, industrial, multifamily, and government buildings.",
    relatedTerms: ["shear-wall", "moment-frame", "braced-frame", "seismic-design-category", "seismic-load"],
    relatedServices: [
      { label: "Structural Engineering", href: "/services/structural" },
      { label: "Existing-Building Engineering", href: "/existing-building-engineering/" },
    ],
  },

  {
    slug: "construction-administration",
    term: "Construction Administration (CA)",
    category: "general",
    definition: "Construction administration (CA) is the phase of engineering services in which the engineer of record supports the construction process — reviewing submittals, responding to RFIs, conducting site observations, and issuing field engineering decisions. CA ensures the building is constructed in conformance with the permit drawings and engineering intent.",
    extended: "During CA, the structural and MEP engineers review contractor submittals (shop drawings, product data, samples) to verify that the proposed materials and fabricated assemblies conform to the design intent. RFIs from the contractor are answered in writing, providing clarifications or design changes as needed. Site visits allow the engineer to observe critical construction activities — reinforcing before concrete pours, structural connections, MEP rough-in — and issue field reports. Requests for Information and Requests for Clarification are formally tracked. CA services are often required by the building department as a condition of permit and are strongly advisable on any project where field conditions may differ from design assumptions. Apex Grid provides CA services on projects where clients need engineering support through construction.",
    relatedTerms: ["rfi", "permit-drawings", "pe", "plan-check"],
    relatedServices: [
      { label: "Engineering Services", href: "/services/" },
    ],
  },

  {
    slug: "accessibility",
    term: "Accessibility (ADA / CBC Accessibility)",
    category: "permit",
    definition: "Accessibility in buildings refers to design requirements that ensure people with disabilities can approach, enter, and use facilities. The Americans with Disabilities Act (ADA) and the IBC Accessibility chapter establish minimum standards for accessible routes, ramps, parking, restrooms, doors, counters, and signage.",
    extended: "The ADA Accessibility Guidelines (ADAAG) and IBC Chapter 11 set dimensional requirements for accessible paths of travel, door widths (minimum 32 inches clear), ramp slopes (1:12 maximum), restroom fixture clearances, parking stall dimensions, and reach ranges for controls and equipment. New construction must be fully accessible; alterations must improve accessibility in the altered area and may trigger path-of-travel requirements connecting the altered area to accessible building entrances and facilities. In California, the California Building Code Chapter 11B adds additional state-specific accessibility requirements beyond the ADA. A change of occupancy or major renovation often requires a full accessibility assessment. Apex Grid's engineers design and review accessible routes and facilities as part of permit engineering, TI, and existing-building engineering scopes.",
    relatedTerms: ["change-of-occupancy", "ibc", "plan-check", "certificate-of-occupancy"],
    relatedServices: [
      { label: "Permit Engineering", href: "/permit-engineering/" },
      { label: "Existing-Building Engineering", href: "/existing-building-engineering/" },
    ],
  },

  {
    slug: "ev-charging",
    term: "EV Charging (Electric Vehicle Charging Infrastructure)",
    category: "mep",
    definition: "EV charging infrastructure provides electrical power to charge plug-in electric vehicles and includes the EVSE (Electric Vehicle Supply Equipment), the branch circuit wiring, and the electrical service capacity to support the charging loads. Many jurisdictions now require EV-ready or EV-capable infrastructure as a condition of new construction permits.",
    extended: "EV charging is classified by Level 1 (120V, 1.4–1.9 kW — slow overnight charging), Level 2 (208–240V, 7–22 kW — the most common commercial and residential EVSE), and Level 3 / DC Fast Charging (up to 350 kW — rapid charging for commercial fleets and public stations). The electrical engineer sizes the dedicated circuits, selects the appropriate EVSE, and verifies that the electrical service and distribution equipment have sufficient capacity for the added EV load. California Title 24 and many state energy codes require EV-ready conduit and panel capacity for new residential and commercial construction. Fleet charging for warehouses, bus depots, and municipal facilities requires careful load management to avoid costly demand charges. Apex Grid engineers EV charging systems for all commercial, multifamily, and government project types.",
    relatedTerms: ["nec", "panel-schedule", "one-line-diagram", "mep"],
    relatedServices: [
      { label: "Electrical Engineering", href: "/services/mep" },
      { label: "MEP Engineering", href: "/services/mep" },
    ],
  },

  {
    slug: "generator",
    term: "Emergency Generator (Standby Power)",
    category: "mep",
    definition: "An emergency or standby generator is a diesel or natural gas fueled engine-generator set that provides backup electrical power when the normal utility supply fails. Life-safety systems — emergency lighting, fire alarm, elevators, critical equipment — require backup power in many occupancies under the NEC and IBC.",
    extended: "The NEC Article 700 governs emergency systems (required by code for life safety), Article 701 covers legally required standby systems, and Article 702 covers optional standby systems. The electrical engineer sizes the generator based on the connected emergency and standby loads, designs the automatic transfer switch (ATS) that switches from utility to generator power, and coordinates the fuel supply system. Structural engineers must design the generator pad and anchorage, and acoustical considerations often drive placement and enclosure design. Generators must be tested regularly under load per NFPA 110. For healthcare, data center, and mission-critical facilities, N+1 generator redundancy and paralleling switchgear are standard design practice. Apex Grid engineers generator systems across all commercial and government facility types.",
    relatedTerms: ["ups", "one-line-diagram", "panel-schedule", "nec", "anchor-bolt"],
    relatedServices: [
      { label: "Electrical Engineering", href: "/services/mep" },
      { label: "MEP Engineering", href: "/services/mep" },
    ],
  },

  {
    slug: "solar-pv",
    term: "Solar PV (Photovoltaic) System",
    category: "mep",
    definition: "A solar photovoltaic (PV) system converts sunlight directly into electricity using semiconductor panels (modules), an inverter to convert DC to AC power, and electrical interconnection equipment. Commercial solar PV systems are engineered by electrical engineers for interconnection with the building's electrical system and for structural attachment to the roof or ground.",
    extended: "The electrical engineer designs the PV array layout, strings the modules to match inverter input voltage windows, designs the DC and AC wiring, selects the inverter type (string, central, or microinverter), and designs the utility interconnection per the NEC Article 690 and the local utility's interconnection requirements. The structural engineer evaluates the roof framing for the added dead load of the panels and racking, and designs the attachment hardware and waterproofing details. Many states and utilities now require anti-islanding protection, interconnection studies, and Permission to Operate (PTO) from the utility before a solar system can be activated. Apex Grid provides structural and electrical engineering for rooftop and ground-mount commercial solar PV systems.",
    relatedTerms: ["nec", "one-line-diagram", "dead-load", "anchor-bolt"],
    relatedServices: [
      { label: "Electrical Engineering", href: "/services/mep" },
      { label: "Structural Engineering", href: "/services/structural" },
    ],
  },

  {
    slug: "storm-drain",
    term: "Storm Drain System",
    category: "civil",
    definition: "A storm drain system is the network of inlets, pipes, and channels that collects surface runoff from streets, parking lots, and developed areas and conveys it to detention facilities, retention basins, or natural water bodies. Storm drain design ensures adequate capacity for design storm events while managing water quality.",
    extended: "Storm drain systems include curb inlets, area drains, catch basins, underground pipes (typically reinforced concrete pipe or HDPE), manholes, and the outlet structure at the point of discharge. The civil engineer calculates the peak runoff from each drainage area using the Rational Method or continuous simulation models, then sizes the pipes to convey the design flow within allowable depth and velocity limits. Minimum slopes prevent sediment deposition; maximum velocities prevent pipe erosion. Outfalls to natural waterways require evaluation for erosion protection and may require a floodplain permit. Storm drain construction typically falls under the civil permit, and systems discharging to public right-of-way require review and approval by the local public works department.",
    relatedTerms: ["drainage", "stormwater", "grading", "detention-basin"],
    relatedServices: [
      { label: "Civil Engineering", href: "/services/civil" },
    ],
  },

];

/**
 * Keyword → glossary term slug mapping.
 * Keys are lower-case words that appear in page slugs, categories, or discipline labels.
 * Values are ordered arrays of term slugs to consider — earlier entries are preferred.
 */
const GLOSSARY_KEYWORD_MAP: Record<string, string[]> = {
  // Structural sub-topics
  lintel:           ["lintel", "beam", "cmu", "dead-load"],
  header:           ["lintel", "beam", "dead-load"],
  wall:             ["shear-wall", "lintel", "cmu"],
  opening:          ["lintel", "beam", "shear-wall"],
  masonry:          ["cmu", "lintel", "anchor-bolt"],
  cmu:              ["cmu", "lintel", "shear-wall"],
  beam:             ["beam", "dead-load", "live-load", "column"],
  replacement:      ["beam", "dead-load", "live-load"],
  removal:          ["beam", "column", "shear-wall", "dead-load"],
  rooftop:          ["rtu", "dead-load", "seismic-load", "wind-load"],
  rtu:              ["rtu", "hvac", "dead-load", "seismic-load"],
  hvac:             ["hvac", "vav", "vrf", "rtu"],
  solar:            ["dead-load", "wind-load", "asce-7", "seismic-load"],
  "solar-pv":       ["solar-pv", "dead-load", "wind-load"],
  mezzanine:        ["live-load", "beam", "column", "dead-load"],
  platform:         ["dead-load", "live-load", "beam", "anchor-bolt"],
  generator:        ["generator", "anchor-bolt", "seismic-load", "dead-load"],
  transformer:      ["anchor-bolt", "seismic-load", "nec"],
  bess:             ["anchor-bolt", "seismic-load", "dead-load"],
  battery:          ["seismic-load", "anchor-bolt", "dead-load"],
  carport:          ["dead-load", "wind-load", "seismic-load"],
  canopy:           ["dead-load", "wind-load", "asce-7"],
  parking:          ["dead-load", "wind-load", "asce-7"],
  occupancy:        ["change-of-occupancy", "ibc", "ahj"],
  settlement:       ["settlement", "allowable-bearing-pressure", "soil-boring"],
  foundation:       ["foundation", "footing", "allowable-bearing-pressure", "settlement"],
  footing:          ["footing", "foundation", "allowable-bearing-pressure"],
  crack:            ["settlement", "foundation", "expansive-soil"],
  report:           ["pe", "ibc", "ahj", "permit-drawings"],
  structural:       ["ibc", "asce-7", "pe", "shear-wall"],
  seismic:          ["seismic-load", "seismic-design-category", "asce-7"],
  retrofit:         ["seismic-retrofit", "seismic-load", "seismic-design-category"],
  // MEP
  mep:              ["mep", "hvac", "nec", "ibc"],
  electrical:       ["nec", "one-line-diagram", "panel-schedule", "mep"],
  mechanical:       ["hvac", "ashrae", "load-calculation", "mep"],
  plumbing:         ["domestic-water", "sanitary-riser", "mep"],
  restaurant:       ["grease-exhaust", "make-up-air", "hvac", "mep"],
  kitchen:          ["grease-exhaust", "make-up-air", "mep"],
  exhaust:          ["grease-exhaust", "make-up-air", "hvac"],
  grease:           ["grease-exhaust", "make-up-air", "hvac"],
  makeup:           ["make-up-air", "grease-exhaust", "hvac"],
  fitness:          ["hvac", "load-calculation", "ashrae"],
  gym:              ["hvac", "load-calculation", "mep"],
  medical:          ["medical-gas", "hvac", "mep", "ashrae"],
  multifamily:      ["mep", "nec", "iecc"],
  ev:               ["ev-charging", "nec", "mep"],
  energy:           ["iecc", "ashrae", "title-24"],
  tenant:           ["tenant-improvement", "mep", "ibc"],
  improvement:      ["tenant-improvement", "ibc", "mep"],
  // Civil
  civil:            ["drainage", "grading", "stormwater", "retaining-wall"],
  drainage:         ["drainage", "stormwater", "grading"],
  grading:          ["grading", "drainage", "compaction"],
  stormwater:       ["stormwater", "drainage", "grading"],
  retaining:        ["retaining-wall", "drainage", "foundation"],
  paving:           ["grading", "drainage", "compaction"],
  site:             ["grading", "drainage", "stormwater"],
  // Geotechnical
  geotech:          ["soil-boring", "allowable-bearing-pressure", "settlement"],
  geotechnical:     ["soil-boring", "allowable-bearing-pressure", "settlement"],
  soil:             ["soil-boring", "compaction", "allowable-bearing-pressure"],
  compaction:       ["compaction", "grading", "soil-boring"],
  // Permit / code
  permit:           ["ahj", "pe", "ibc", "permit-drawings"],
  code:             ["ibc", "ahj", "pe"],
  // Industry keywords
  healthcare:       ["medical-gas", "hvac", "mep", "ashrae"],
  hospital:         ["medical-gas", "hvac", "mep"],
  warehouse:        ["dead-load", "live-load", "hvac", "ibc"],
  industrial:       ["dead-load", "live-load", "mep", "ibc"],
  retail:           ["hvac", "mep", "ibc", "tenant-improvement"],
  office:           ["hvac", "mep", "vav", "ibc"],
  "data-center":    ["ups", "nec", "hvac", "mep"],
  military:         ["ufc", "atfp", "pe", "asce-7"],
  government:       ["ufc", "pe", "ibc", "asce-7"],
  defense:          ["ufc", "atfp", "pe"],
  education:        ["dsa", "ibc", "mep"],
  school:           ["dsa", "ibc", "mep"],
  hospitality:      ["hvac", "mep", "ibc"],
  hotel:            ["hvac", "mep", "ibc"],
};

/**
 * Return 2–4 glossary terms relevant to a page, derived from keyword hints
 * (typically the page slug words + category/discipline words, all lowercased).
 * Falls back to ibc + pe if no hints match.
 */
export function relatedGlossaryTerms(hints: string[]): GlossaryTerm[] {
  const termMap = new Map(GLOSSARY_TERMS.map((t) => [t.slug, t]));
  const seen = new Set<string>();
  const results: GlossaryTerm[] = [];

  for (const hint of hints) {
    const candidates = GLOSSARY_KEYWORD_MAP[hint] ?? [];
    for (const slug of candidates) {
      if (!seen.has(slug) && termMap.has(slug)) {
        seen.add(slug);
        results.push(termMap.get(slug)!);
        if (results.length >= 4) return results;
      }
    }
  }

  // Fallback: ensure at least 2 terms
  for (const fallback of ["ibc", "pe", "ahj", "asce-7"]) {
    if (results.length >= 2) break;
    if (!seen.has(fallback) && termMap.has(fallback)) {
      seen.add(fallback);
      results.push(termMap.get(fallback)!);
    }
  }

  return results;
}

/** Return all glossary terms sorted alphabetically by slug */
export function sortedGlossaryTerms(): GlossaryTerm[] {
  return [...GLOSSARY_TERMS].sort((a, b) => a.slug.localeCompare(b.slug));
}

/** Group terms by first letter for an alphabetical index */
export function glossaryByLetter(): Record<string, GlossaryTerm[]> {
  const result: Record<string, GlossaryTerm[]> = {};
  for (const term of sortedGlossaryTerms()) {
    const letter = term.term[0].toUpperCase();
    if (!result[letter]) result[letter] = [];
    result[letter].push(term);
  }
  return result;
}
