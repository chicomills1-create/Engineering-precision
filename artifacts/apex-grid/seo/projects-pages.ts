/** Projects/portfolio hub and discipline-specific project experience pages. Spec pages 190–200. */

export interface ProjectCategoryPage {
  slug: string;
  title: string;
  description: string;
  h1: string;
  kicker: string;
  lede: string;
  projectTypes: string[];
  disciplines: string[];
  note?: string; // Optional disclaimer for sensitive categories
  // Optional substantive sections (Wave B thin-content expansion, 2026-10-19).
  // Rendered by projectCategoryPage() only when present; faqs also emit
  // matching FAQPage JSON-LD from the same data.
  detailSections?: { heading: string; body: string }[];
  faqs?: { question: string; answer: string }[];
}

export const PROJECTS_HUB = {
  title: "Engineering Projects & Experience | Apex Grid Engineering",
  description:
    "Apex Grid Engineering project experience across structural, MEP, civil, geotechnical, healthcare, multifamily, industrial, government, and military sectors.",
  h1: "Engineering Project Experience",
  kicker: "Our Work",
  lede:
    "Apex Grid Engineering is licensed in 49 states — every U.S. state except Alaska. Engineering stamping and licensure are confirmed for each project jurisdiction. Below is an overview of project experience organized by discipline and industry.",
  intro:
    "We are a multi-discipline firm. Our engineers have worked on everything from small commercial remodels to large-scale government and healthcare facilities. While we cannot publish confidential project details, the categories below represent types of projects we actively support.",
};

export const PROJECT_CATEGORY_PAGES: ProjectCategoryPage[] = [
  {
    slug: "structural",
    title: "Structural Engineering Projects | Apex Grid Engineering",
    description:
      "Structural engineering project experience across commercial, multifamily, industrial, healthcare, and government sectors.",
    h1: "Structural Engineering Projects",
    kicker: "Project Experience",
    lede:
      "Apex Grid's structural engineers have completed projects ranging from load-bearing wall removals in single-story commercial buildings to full structural systems for new multifamily and industrial construction.",
    projectTypes: [
      "New commercial construction structural systems",
      "Multifamily wood-frame and podium structures",
      "Industrial warehouse and manufacturing structural",
      "Tenant improvement structural modifications",
      "Existing building structural assessments and repairs",
      "Seismic retrofit for existing buildings",
      "Equipment support and anchorage",
      "Rooftop HVAC structural review",
      "Foundation design for varied soil conditions",
      "Structural peer review",
    ],
    disciplines: ["Structural Engineering"],
  },
  {
    slug: "mep",
    title: "MEP Engineering Projects | Apex Grid Engineering",
    description:
      "MEP engineering project experience across commercial, restaurant, healthcare, multifamily, and industrial sectors.",
    h1: "MEP Engineering Projects",
    kicker: "Project Experience",
    lede:
      "Apex Grid's MEP engineers have completed integrated mechanical, electrical, and plumbing projects across a wide range of commercial and institutional building types — from small restaurant TIs to large multifamily and healthcare facilities.",
    projectTypes: [
      "Commercial tenant improvement MEP",
      "Restaurant and food service MEP systems",
      "Healthcare and medical facility MEP",
      "Multifamily MEP infrastructure",
      "Industrial and warehouse MEP",
      "HVAC system replacements and upgrades",
      "Electrical service upgrades and EV charging",
      "Emergency and standby power systems",
      "Kitchen exhaust and make-up air systems",
      "Plumbing and gas systems",
    ],
    disciplines: ["Mechanical Engineering", "Electrical Engineering", "Plumbing Engineering"],
  },
  {
    slug: "civil",
    title: "Civil Engineering Projects | Apex Grid Engineering",
    description:
      "Civil engineering project experience including site development, grading, drainage, parking lots, and utility coordination.",
    h1: "Civil Engineering Projects",
    kicker: "Project Experience",
    lede:
      "Apex Grid's civil engineers have supported site development across commercial, industrial, and government applications — from small parking lot improvements to full site development packages for new construction.",
    projectTypes: [
      "Commercial site development packages",
      "Grading and drainage plans",
      "Parking lot design and expansion",
      "Stormwater management systems",
      "Civil utility design and coordination",
      "ADA site accessibility improvements",
      "Turn lane and roadway improvements",
      "Site expansion and redevelopment",
      "Industrial site civil engineering",
      "Federal and government site improvements",
    ],
    disciplines: ["Civil Engineering"],
    detailSections: [
      {
        heading: "Scope of Work",
        body: "Civil scope starts with the site as it is: existing grades, drainage patterns, utilities, easements, and access. We establish what the jurisdiction will ask about — floodplain, setbacks, frontage improvements — then design the grading, stormwater, and utility systems that let the building program work on that ground, whether it is a greenfield pad, an infill redevelopment, or an expansion of an operating site.",
      },
      {
        heading: "Typical Deliverables",
        body: "A civil package typically includes a grading and drainage plan, stormwater management and detention design with supporting hydrology calculations, water and sewer utility plans, erosion and sediment control, and paving and ADA-accessible route details. Deliverables are sealed by a licensed civil PE and formatted to the jurisdiction's civil plan checklist, so the first submittal is complete.",
      },
      {
        heading: "Codes and Standards",
        body: "Civil design answers to the local stormwater manual and public works standards first — detention, water quality, and discharge rules are municipal, not national. Layered on those are the building code and local amendments for site work, AASHTO guidance where roadway or turn-lane improvements are involved, ADA and PROWAG criteria for accessible routes, and FEMA floodplain rules where the site touches a mapped flood hazard area.",
      },
      {
        heading: "Coordination and Permitting",
        body: "Civil sits between everyone: the architect's building footprint, the structural engineer's foundation elevations, the MEP engineer's utility demands, and the utility providers who must accept the connections. We coordinate tap approvals, easement questions, and off-site improvement requirements with the jurisdiction early, because a utility conflict found at plan check is a redesign — and found at construction, it is a delay claim.",
      },
      {
        heading: "Design Risks We Manage",
        body: "The recurring civil risks are drainage that works on paper but ponds in the field, detention sized for the wrong storm event, and utility inverts that do not clear each other. We manage them with conservative hydrology, invert checks at every crossing, and finished-floor elevations set with freeboard above the design storm — cheap decisions at design time, expensive ones after paving.",
      },
    ],
    faqs: [
      {
        question: "Do you design stormwater detention for small sites?",
        answer: "Yes — and small sites are where detention is hardest, because the required volume competes with parking and building area. We use underground detention, oversized pipe storage, and other approaches the jurisdiction allows, sized from the local stormwater manual's release-rate rules.",
      },
      {
        question: "What does the jurisdiction review in a civil plan set?",
        answer: "Grading, drainage, stormwater calculations, utility connections, erosion control, and accessible routes — usually against a published civil checklist. Our sets are assembled to that checklist, with the hydrology report and utility information included in the first submittal.",
      },
    ],
  },
  {
    slug: "geotechnical",
    title: "Geotechnical Engineering Projects | Apex Grid Engineering",
    description:
      "Geotechnical engineering project experience including soil borings, geotechnical reports, foundation recommendations, and pavement design.",
    h1: "Geotechnical Engineering Projects",
    kicker: "Project Experience",
    lede:
      "Apex Grid's geotechnical engineers have supported projects requiring subsurface investigation, foundation recommendations, pavement design, and settlement analysis across commercial, multifamily, and government sectors.",
    projectTypes: [
      "Commercial building geotechnical investigations",
      "Multifamily development geotechnical reports",
      "Parking lot and pavement geotechnical analysis",
      "Retaining wall geotechnical parameters",
      "Expansive soil evaluation and mitigation",
      "Settlement analysis for existing structures",
      "Foundation recommendations for new construction",
      "Earthwork and compaction specifications",
      "Government and federal facility geotechnical",
      "Site characterization for adaptive reuse",
    ],
    disciplines: ["Geotechnical Engineering"],
    detailSections: [
      {
        heading: "Scope of Work",
        body: "Geotechnical scope is the ground truth under a project: borings or test pits logged by engineers, laboratory testing of the recovered samples, and an analysis that turns soil data into design parameters. The work is scaled to the structure — a light commercial pad and a multi-story building on problem soils get different investigation densities, but both get recommendations a structural engineer can design to.",
      },
      {
        heading: "Typical Deliverables",
        body: "The core deliverable is a sealed geotechnical report: boring logs, laboratory results, bearing capacity and settlement estimates, foundation recommendations — shallow, deep, or ground-improved — lateral earth pressures for retaining design, pavement section recommendations, and earthwork specifications covering fill placement, compaction, and moisture control. Where construction follows, we provide observation during grading and foundation work.",
      },
      {
        heading: "Codes and Standards",
        body: "Geotechnical practice is anchored by the building code's soils chapter — IBC Chapter 18 requires a geotechnical investigation for most commercial structures and sets the report contents — applied through ASTM standards for the field and laboratory work itself, including D1586 (standard penetration test), D420 (site characterization), and D698 and D1557 (compaction). Local amendments and known hazard mapping — expansive soil, liquefaction, flood — shape the scope further.",
      },
      {
        heading: "Coordination and Permitting",
        body: "The geotechnical report is an input to nearly every other discipline: structural designs the foundations to it, civil grades and paves over it, and the contractor prices earthwork from it. We coordinate boring locations with the civil design so utilities and detention do not land where data is needed, and we stay engaged through construction — because the excavation always reveals something the borings could not.",
      },
      {
        heading: "Design Risks We Manage",
        body: "The expensive geotechnical surprises are expansive clays that heave slabs, undocumented fill that settles unevenly, and groundwater higher than dry-season borings suggested. We manage them by testing for swell potential where the geology calls for it, probing suspect fill, and setting drainage and foundation details that assume seasonal water — not the water table on the day of the boring.",
      },
    ],
    faqs: [
      {
        question: "How many borings does a project need?",
        answer: "Enough to characterize the soils across the building footprint and the site improvements — a pattern scaled to the structure's size and the site's variability. The building code and local practice set minimum expectations; heterogeneous sites need more. We scope the count in the proposal so there are no surprises.",
      },
      {
        question: "Can a geotechnical report from a previous project be reused?",
        answer: "Sometimes as background, rarely as the design basis. Soil data ages well geologically but not contractually: the earlier report was prepared for a different structure, owner, and standard of care. We review prior reports during scoping and say plainly whether new borings are needed.",
      },
    ],
  },
  {
    slug: "multifamily",
    title: "Multifamily Engineering Projects | Apex Grid Engineering",
    description:
      "Multifamily engineering project experience — structural, MEP, and civil engineering for apartments, townhomes, and mixed-use residential.",
    h1: "Multifamily Engineering Projects",
    kicker: "Project Experience",
    lede:
      "Apex Grid provides full multi-discipline engineering for multifamily developments — structural framing, MEP systems, civil site development, and geotechnical investigations — as a coordinated package or as individual disciplines.",
    projectTypes: [
      "Garden-style apartment structural and MEP",
      "Podium building structural systems",
      "Wood-frame multifamily structural engineering",
      "Multifamily MEP infrastructure",
      "Townhome structural engineering",
      "Multifamily civil site development",
      "Multifamily electrical service and EV charging",
      "Domestic water and plumbing systems",
      "HVAC and ventilation for units and common areas",
      "Adaptive reuse to multifamily",
    ],
    disciplines: ["Structural Engineering", "MEP Engineering", "Civil Engineering"],
    detailSections: [
      {
        heading: "Scope of Work",
        body: "Multifamily scope is repetition with variation: the same unit types stacked and repeated, but every stack carries structure, plumbing, ventilation, and egress that must land in the same place on every floor. We engineer the full package — wood-frame or podium structure, unit and common-area MEP, site civil, and the geotechnical basis — as one coordinated set, because a shaft moved on floor three is a change on every floor.",
      },
      {
        heading: "Typical Deliverables",
        body: "Deliverables include structural framing plans and calculations for the wood, steel, or concrete podium system; MEP plans covering unit HVAC, plumbing risers, and electrical distribution and service sizing; amenity and common-area systems; and the civil and geotechnical packages for the site. Sets are sealed per discipline and coordinated so unit layouts, shafts, and structure agree across the whole building.",
      },
      {
        heading: "Codes and Standards",
        body: "Multifamily design works under the IBC for the building and the energy and ventilation codes that govern the units: the IECC or the adopted state energy code, ASHRAE 62.2 for dwelling-unit ventilation, NFPA 13 or 13R sprinkler criteria, and accessibility under the Fair Housing Act and local amendments. Sound and fire separation between units — rated assemblies and corridor requirements — shape the details from the first floor plan.",
      },
      {
        heading: "Coordination and Permitting",
        body: "The architect's unit plans drive everything, and our coordination job is keeping structure, shafts, and systems inside them as the design develops. We coordinate early on podium drainage and utility entries, on meter banks and EV charging counts for the electrical service, and on the accessibility and energy documentation the permit set must carry — the items plan reviewers ask for first.",
      },
      {
        heading: "Design Risks We Manage",
        body: "The classic multifamily risks are plumbing risers that miss their stacks, dryer and bath exhaust routes that cannot be built as drawn, and podium transfer conditions discovered late. We manage them with stacked wet-wall discipline from schematic design, exhaust routing checked against the framing direction, and the podium transfer structure designed before the framing above it is detailed.",
      },
    ],
    faqs: [
      {
        question: "Do you engineer both podium and garden-style projects?",
        answer: "Yes. Garden-style work is wood framing over slabs with distributed site systems; podium work adds a concrete or steel transfer level, structured parking interfaces, and denser MEP. The coordination discipline is the same — the podium simply has more disciplines converging on one level.",
      },
      {
        question: "Can you take over a multifamily project mid-design?",
        answer: "Yes — usually at a discipline gap or a plan-check stall. We start with a review of the existing set against the permit checklist, identify what is missing or uncoordinated, and scope the completion work before we stamp anything.",
      },
    ],
  },
  {
    slug: "commercial",
    title: "Commercial Engineering Projects | Apex Grid Engineering",
    description:
      "Commercial engineering project experience — structural, MEP, and civil for office, retail, restaurant, hospitality, and industrial projects.",
    h1: "Commercial Engineering Projects",
    kicker: "Project Experience",
    lede:
      "Apex Grid's commercial engineering experience spans office, retail, restaurant, hospitality, fitness, and industrial projects — from single-space tenant improvements to full building engineering packages.",
    projectTypes: [
      "Office building structural and MEP engineering",
      "Retail and shopping center structural",
      "Restaurant MEP and structural engineering",
      "Hotel and hospitality MEP systems",
      "Fitness and recreation facility engineering",
      "Industrial and warehouse structural",
      "Data center structural and MEP",
      "Commercial tenant improvement structural and MEP",
      "Mixed-use development engineering",
      "Brewery and specialty commercial facility engineering",
    ],
    disciplines: ["Structural Engineering", "MEP Engineering", "Civil Engineering"],
    detailSections: [
      {
        heading: "Scope of Work",
        body: "Commercial scope ranges from a single tenant improvement to a ground-up office or retail building, and the engineering follows the lease and the shell condition as much as the architecture. We engineer structure, MEP, and civil for new buildings, expansions, and tenant work — including the base-building upgrades (service capacity, rooftop structure, exhaust routes) that tenant spaces depend on.",
      },
      {
        heading: "Typical Deliverables",
        body: "A commercial package typically includes structural calculations and drawings, coordinated mechanical, electrical, and plumbing plans, COMcheck or the adopted energy-code compliance documentation, and civil site plans where the work touches the site. For tenant improvements, the deliverable is a permit set scoped to the space plus base-building verification — existing capacity confirmed before new load is added.",
      },
      {
        heading: "Codes and Standards",
        body: "Commercial work is designed to the IBC and its referenced standards: ASCE 7 for loads, ASHRAE 90.1 or the IECC commercial provisions for energy, NFPA 70 for electrical design, and the mechanical and plumbing codes adopted by the jurisdiction. Restaurants and assembly uses add their own layers — commercial kitchen exhaust and grease provisions, occupant-load-driven egress — that we resolve in the first code review, not at plan check.",
      },
      {
        heading: "Coordination and Permitting",
        body: "Commercial schedules are lease-driven, so coordination runs on the tenant's clock. We coordinate with the architect and the landlord's base-building team on capacity and criteria, with kitchen and specialty equipment vendors on real loads and connections, and with the jurisdiction through pre-application conversations where the use is new to the building. The goal is a permit set the tenant's contractor can price without allowances.",
      },
      {
        heading: "Design Risks We Manage",
        body: "The recurring commercial risks are existing services too small for the new use, rooftop equipment the existing structure cannot carry, and kitchen exhaust with no legal route to the roof. Each is a survey question before it is a design problem: we verify service capacity, rooftop framing, and chase routes during scoping, while the lease can still absorb the answer.",
      },
    ],
    faqs: [
      {
        question: "How fast can a tenant improvement set be turned around?",
        answer: "Standard tenant improvement scopes move in weeks once existing conditions are confirmed. The schedule risk is rarely drafting — it is discovering capacity problems late, which is why our scoping includes verification of the base-building systems the space depends on.",
      },
      {
        question: "Do you work for landlords or tenants?",
        answer: "Both. Landlords engage us for base-building upgrades, capacity studies, and shell packages; tenants and their architects engage us for the improvement sets. The engineering questions are the same — what exists, what the new use demands, and what the jurisdiction will require to connect the two.",
      },
    ],
  },
  {
    slug: "government",
    title: "Government Engineering Experience | Apex Grid Engineering",
    description:
      "Government facility engineering experience — structural, MEP, and civil engineering for federal agencies, GSA projects, and public facilities.",
    h1: "Government Engineering Experience",
    kicker: "Project Experience",
    lede:
      "Apex Grid supports government contractors and federal agencies on facility renovation, site improvement, and MEP upgrade projects. Any socioeconomic certification, size status, or set-aside eligibility must be confirmed from current SBA and SAM.gov records for the pursuit.",
    projectTypes: [
      "Federal facility structural renovations",
      "Government building MEP upgrades",
      "Federal site civil improvements",
      "GSA and public building engineering",
      "Emergency power and generator installations",
      "Electrical switchgear replacement engineering",
      "Parking lot and site improvement engineering",
      "HVAC and mechanical system replacements",
      "Plumbing upgrades and infrastructure",
      "Geotechnical support for federal construction",
    ],
    disciplines: ["Structural Engineering", "MEP Engineering", "Civil Engineering", "Geotechnical Engineering"],
    note: "Apex Grid does not publish project-specific federal facility details without client authorization.",
  },
  {
    slug: "military",
    title: "Military Engineering Experience | Apex Grid Engineering",
    description:
      "Military and defense facility engineering experience — structural, MEP, civil, and geotechnical for DoD projects and base facility renovations.",
    h1: "Military and Defense Engineering Experience",
    kicker: "Project Experience",
    lede:
      "Apex Grid supports prime contractors and design-build teams working on military facility renovations, site improvements, and MEP upgrades. Current professional credentials and any procurement classifications must be confirmed from official records for the pursuit.",
    projectTypes: [
      "Dormitory and barracks renovation engineering",
      "Facility structural renovation and repair",
      "MEP upgrades and system replacements",
      "Site and parking improvement civil engineering",
      "Geotechnical investigations for base expansion",
      "Electrical service upgrades and switchgear replacement",
      "HVAC and mechanical system engineering",
      "Structural assessments of aging military facilities",
      "Recreation area and site improvement engineering",
      "UFC-compliant structural and MEP design",
    ],
    disciplines: ["Structural Engineering", "MEP Engineering", "Civil Engineering", "Geotechnical Engineering"],
    note: "We publish only project information authorized for public disclosure. Project-specific military details are not included here.",
  },
  {
    slug: "healthcare",
    title: "Healthcare Engineering Projects | Apex Grid Engineering",
    description:
      "Healthcare facility engineering project experience — structural, MEP, mechanical, and electrical for hospitals, clinics, medical offices, and outpatient facilities.",
    h1: "Healthcare Engineering Projects",
    kicker: "Project Experience",
    lede:
      "Healthcare facilities require engineering that accounts for infection control, equipment loads, emergency power, ventilation pressure relationships, and high-reliability systems. Apex Grid provides structural and MEP engineering for a range of healthcare facility types.",
    projectTypes: [
      "Medical office building structural and MEP",
      "Outpatient clinic MEP systems",
      "Urgent care facility engineering",
      "Dental office MEP engineering",
      "Behavioral health facility structural and MEP",
      "Hospital equipment structural support",
      "Healthcare HVAC ventilation design",
      "Emergency power and generator systems",
      "Medical gas coordination",
      "Healthcare tenant improvement structural and MEP",
    ],
    disciplines: ["Structural Engineering", "MEP Engineering"],
    detailSections: [
      {
        heading: "Scope of Work",
        body: "Healthcare scope is systems engineering under clinical constraint: ventilation that maintains pressure relationships, power that cannot fail, plumbing that controls infection risk, and structure that carries imaging and equipment loads — often inside facilities that stay occupied during the work. We engineer medical offices, clinics, outpatient and behavioral health facilities, and hospital support spaces, from tenant improvements to ground-up buildings.",
      },
      {
        heading: "Typical Deliverables",
        body: "Deliverables include mechanical design to ASHRAE 170 ventilation rates with documented pressure relationships, electrical design covering the essential electrical system, plumbing and medical gas coordination, and structural design for equipment, shielding, and rooftop units. Sets are prepared for the reviewing authorities the project answers to — local plan review and, where the facility type requires it, state healthcare facility review.",
      },
      {
        heading: "Codes and Standards",
        body: "Healthcare design is governed by the FGI Guidelines as adopted by the jurisdiction, applied through NFPA 99 for health care facilities and their risk categories, NFPA 101 for life safety, and ASHRAE 170 for ventilation of health care facilities. The building code's occupancy provisions and state licensure rules for the facility type set the frame. We confirm the adopted editions and the review path at scoping, because they differ by state and facility.",
      },
      {
        heading: "Coordination and Permitting",
        body: "Healthcare coordination runs through infection control and operations as much as through the design team. We coordinate with the architect and clinical planners on room functions — which drive the ventilation and power requirements — with equipment vendors on imaging and procedural loads, and with the facility's infection control team on phasing and interim measures where work occurs in occupied buildings.",
      },
      {
        heading: "Design Risks We Manage",
        body: "The serious healthcare risks are pressure relationships lost between design and balancing, essential power branches loaded past their intent, and shutdowns the facility cannot grant. We manage them by designing ventilation that can actually be balanced as drawn, loading the essential branches conservatively and documenting them, and phasing the work around shutdown windows the facility confirms in writing.",
      },
    ],
    faqs: [
      {
        question: "Does a medical office build-out need healthcare-level engineering?",
        answer: "It depends on the services provided, not the name on the door. A general medical office is usually designed as a business occupancy with standard systems; add surgery, imaging, or certain procedures and the FGI and NFPA 99 requirements engage. We classify the facility correctly at scoping — over-designing wastes money, and under-designing fails review.",
      },
      {
        question: "Can you engineer work in an occupied hospital or clinic?",
        answer: "Yes. Occupied healthcare work is a phasing and infection-control exercise as much as a design one. We design the tie-ins, shutdown sequences, and temporary systems with the facility team, and the permit set documents the phasing so review and construction agree on how the building stays safe throughout.",
      },
    ],
  },
  {
    slug: "industrial",
    title: "Industrial Engineering Projects | Apex Grid Engineering",
    description:
      "Industrial engineering project experience — structural, MEP, and civil for warehouses, manufacturing, distribution, and specialty industrial facilities.",
    h1: "Industrial Engineering Projects",
    kicker: "Project Experience",
    lede:
      "Industrial facilities demand engineering that handles heavy equipment loads, process ventilation, high-bay structural systems, and specialized utilities. Apex Grid supports warehouse, manufacturing, distribution, and specialty industrial clients where project-specific credentials and authorization are verified.",
    projectTypes: [
      "Warehouse structural engineering",
      "Manufacturing facility structural design",
      "Mezzanine and equipment platform engineering",
      "Industrial HVAC and ventilation design",
      "Process exhaust and make-up air systems",
      "High-bay lighting electrical engineering",
      "Industrial electrical load studies",
      "Equipment anchorage and support",
      "Industrial civil site development",
      "Distribution center engineering",
    ],
    disciplines: ["Structural Engineering", "MEP Engineering", "Civil Engineering"],
    detailSections: [
      {
        heading: "Scope of Work",
        body: "Industrial scope is load-driven: racking, cranes, process equipment, and trucks set the numbers, and the building is engineered around them. We provide structural design for high-bay and heavy-floor facilities, MEP for process and comfort systems, and civil for truck courts and heavy-duty pavement — for warehouses, manufacturing, distribution, and specialty industrial buildings, new and retrofit.",
      },
      {
        heading: "Typical Deliverables",
        body: "Deliverables include structural framing and foundation design for equipment and rack loads, slab design for forklift traffic and rack post loads, mezzanine and equipment platform engineering, process exhaust and make-up air design, electrical load studies and distribution for machinery, and civil packages for truck courts, dock areas, and heavy pavement sections. Equipment anchorage calculations are included where the jurisdiction requires them.",
      },
      {
        heading: "Codes and Standards",
        body: "Industrial design applies the IBC and ASCE 7 with the load cases that govern industrial buildings — storage, crane, and equipment loads — plus FM Global data sheets where the owner's insurer requires them, NFPA standards for the stored commodities and processes, including high-piled storage, and the access and platform requirements the design must satisfy. Energy compliance follows the adopted IECC or ASHRAE 90.1 path for the conditioned portions.",
      },
      {
        heading: "Coordination and Permitting",
        body: "Industrial coordination starts with the process layout and the equipment list — real loads, real connections, real exhaust — and we coordinate with the owner's operations team and equipment vendors before the structure is sized. Dock equipment, racking vendors, and the fire protection designer all feed the same set; our job is making the building, the systems, and the commodity classification agree before permit.",
      },
      {
        heading: "Design Risks We Manage",
        body: "The expensive industrial risks are slabs that crack under rack posts because the subgrade or joint layout was guessed, exhaust systems undersized for the actual process, and commodity classifications that change the fire protection after the shell is designed. We manage them with geotechnical-based slab design, process loads confirmed in writing from the vendors, and the storage classification locked with the owner at scoping.",
      },
    ],
    faqs: [
      {
        question: "Can you engineer a mezzanine or equipment platform in an existing warehouse?",
        answer: "Yes — mezzanines are a common retrofit scope. We verify the existing slab and footings for the new column loads, design the platform and its lateral system, and document the egress and fire protection implications, so the permit set covers the change the mezzanine creates.",
      },
      {
        question: "Do you design for high-piled storage permits?",
        answer: "We engineer the building side of high-piled storage — structure, and coordination with the fire protection design the commodity classification requires. The storage permit itself runs through the fire authority; our drawings and calculations give that review the building information it needs.",
      },
    ],
  },
];
