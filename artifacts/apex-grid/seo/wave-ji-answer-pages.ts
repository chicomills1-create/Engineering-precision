import type { Phase0AeoPage } from "./phase0-corpus";

const founderNote = "I'm Jeremy Mills, CEO & Founder of Apex Grid Engineering and a U.S. Air Force veteran. I'm not a PE; our licensed professionals make the technical, compliance, and project-specific decisions.";

export const WAVE_JI_ANSWER_PAGES: Phase0AeoPage[] = [
  {
    slug: "king-county-wa-engineering-permit-guide",
    title: "How Does Engineering Permitting Work in Unincorporated King County, WA?",
    description: "Unincorporated King County projects permit through the Department of Local Services Permitting Division, with critical areas review, county stormwater standards, and seismic design for the Seattle fault zone.",
    h1: "How Does Engineering Permitting Work in Unincorporated King County, WA?",
    answer: "Direct answer: building projects in unincorporated King County — the rural and island areas outside city limits, from the Snoqualmie Valley to Vashon Island — permit through the King County Department of Local Services, Permitting Division. The county path is shaped by three things that surprise first-time builders: a rigorous Critical Areas Ordinance covering wetlands, streams, steep slopes, and landslide hazard areas; the county's own stormwater design manual, which governs drainage on nearly every project; and seismic design in one of the highest-hazard zones in the state, near the Seattle fault and within the Cascadia subduction zone's reach. The parcel's location decides the AHJ — inside Seattle, Bellevue, or another city, you permit with that city; outside all city boundaries, it is a county project.\n\nThe critical areas review is the defining feature of a King County submittal. A large share of unincorporated parcels touch a regulated feature — a wetland or its buffer, a stream with its required setback, a steep slope, a coal-mine hazard area in the Issaquah uplands, or a seismic hazard area. The county requires the applicant to identify these features, usually with a critical areas report prepared by qualified professionals, and to show avoidance or mitigation before the building permit advances. This is not a box to check late in design; a wetland buffer or landslide hazard setback can move a building footprint, shrink a developable area, or trigger a variance process. Smart teams order the critical areas reconnaissance before they fall in love with a site plan.\n\nStormwater is the second gate. King County's Surface Water Design Manual sets the drainage standard for unincorporated projects, and the county takes it seriously — flow control, water quality treatment, and conveyance sized for the manual's design storms. On rural lots this often means engineered dispersion, detention, or infiltration systems designed by a civil engineer, with soils testing to confirm infiltration rates. Where the lot drains toward Lake Sammamish, the Sammamish River, or other sensitive receiving waters, the requirements tighten. The drainage design is sealed civil work, and the county's reviewers know their manual cold.\n\nSeismic and geotechnical demands round out the engineering. The county sits in a high seismic design category — structures are engineered for the Seattle fault scenario and the broader Cascadia risk, with site-specific geotechnical investigation standard practice on slopes, in liquefaction-prone lowlands, and on fill. Many rural parcels also need on-site septic designed to Public Health standards and reviewed through the health department's separate track, plus well or water-district coordination. Fire access, shoreline permits along Puget Sound and the lakes, and grading permits each add their own review threads. The county decides what is approved, so the engineering team designs to the county's manuals and ordinances from day one — a set drawn for a city standard will come back with corrections.",
    directAnswer: "Unincorporated King County projects permit through the Department of Local Services Permitting Division, with critical areas review (wetlands, streams, steep slopes), the county Surface Water Design Manual for drainage, high-seismic structural design, and often septic and shoreline tracks. Inside any city boundary, you permit with that city instead.",
    topic: "Washington Engineering",
    serviceHref: "/services/civil/",
    sections: [
      {
        heading: "Critical Areas: The Review That Moves Footprints",
        body: "The Critical Areas Ordinance is the first thing an engineer checks on a King County parcel, because it can override everything else on the site plan. Wetlands and streams carry buffers measured in tens to hundreds of feet depending on the resource rating; steep slopes and landslide hazard areas restrict grading and foundation placement; erosion hazard areas along the bluffs and ravines limit disturbance. The county's review asks for delineation, classification, and a mitigation sequence — avoid, minimize, then compensate — documented by qualified specialists.\n\nFor the structural and civil engineer, the practical consequence is that the building envelope is smaller than the lot lines suggest. A five-acre rural parcel can lose half its usable area to buffers and setbacks, and the remaining envelope must still accommodate the septic drainfield reserve area, the stormwater facility, fire turnaround, and access. The geotechnical investigation has to speak to slope stability where landslide hazards are mapped, and foundations near steep slopes get setback and drainage conditions. Projects that start with a critical areas reconnaissance and a pre-application meeting with the county move; projects that discover the wetland at 90 percent design do not.",
      },
      {
        heading: "Stormwater, Septic, and the Rural Utility Reality",
        body: "On an unincorporated lot, the civil engineer is effectively the utility department. Stormwater must be managed on site per the county manual — roof and driveway runoff collected, treated, and dispersed or detained so post-development flows match the manual's targets. Infiltration is preferred where soils allow, which means the geotechnical boring program should include infiltration testing early; discovering tight glacial till at the end of design forces a redesign to detention. The county reviews the drainage report, calculations, and details as a core part of the permit, not an accessory.\n\nWastewater is the parallel track: most unincorporated parcels are on septic, and the septic design goes through Public Health with its own soil, sizing, and reserve-area requirements. The drainfield and its 100-percent reserve area consume prime flat ground — the same ground the stormwater facility and the building want. Coordinating these three — building, septic, stormwater — on a constrained rural lot is the central civil puzzle of a King County project, and it is why the site plan should be drawn around the constraints rather than fitted to them afterward.",
      },
    ],
    faqs: [
      {
        question: "How do I know if my project is in unincorporated King County or inside a city?",
        answer: "Check the parcel against the county's parcel viewer or zoning map — the county's iMap tool shows jurisdiction directly. If the parcel is outside every city's boundary, it is unincorporated and permits through the Department of Local Services Permitting Division. Annexation boundaries shift, so verify rather than assuming based on a mailing address.",
      },
      {
        question: "What triggers a critical areas review in King County?",
        answer: "Any regulated feature on or near the parcel — wetlands, streams, lakes, steep slopes, landslide or erosion hazard areas, seismic hazard areas, or coal-mine hazard areas. The county requires identification and assessment of these features with the permit application, typically through reports by qualified professionals, and the review can impose buffers, setbacks, and mitigation before the building permit is approved.",
      },
      {
        question: "Does King County have its own stormwater manual?",
        answer: "Yes. The King County Surface Water Design Manual governs drainage design for unincorporated projects, covering flow control, water quality treatment, and conveyance. Civil engineers design to this manual — not a neighboring city's standards — and the county reviews drainage reports and calculations as a central part of the permit.",
      },
      {
        question: "Do I need a geotechnical report for a King County building permit?",
        answer: "The county routinely requires geotechnical investigation on slopes, in mapped landslide or seismic hazard areas, on fill, and where infiltration-based stormwater design is proposed. Even where not explicitly required, the structural engineer needs soils data for foundation design in the county's high seismic zone. Order borings and infiltration testing early — late geotechnical surprises are the most common cause of rural project redesigns.",
      },
    ],
    extraLinks: [
      { label: "County vs. city plan check: which applies?", href: "/answers/county-plan-check-vs-city-plan-check/" },
      { label: "What is a geotechnical report?", href: "/answers/geotechnical-report-explained/" },
      { label: "How do you respond to plan check corrections?", href: "/answers/how-to-respond-to-plan-check-corrections/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "pierce-county-wa-engineering-permit-guide",
    title: "How Does Engineering Permitting Work in Unincorporated Pierce County, WA?",
    description: "Unincorporated Pierce County permits through Planning & Public Works, with lahar hazard planning near Mount Rainier, Puyallup River floodplain rules, and county stormwater standards.",
    h1: "How Does Engineering Permitting Work in Unincorporated Pierce County, WA?",
    answer: "Direct answer: projects in unincorporated Pierce County — the areas outside Tacoma, Puyallup, Lakewood, and the other cities — permit through Pierce County Planning & Public Works. The county's review is shaped by hazards few other jurisdictions combine: volcanic lahar risk from Mount Rainier in the Puyallup and Carbon river valleys, extensive floodplain along the Puyallup River system, landslide-prone bluffs, and a county stormwater manual that governs drainage on virtually every project. Inside any city boundary, you permit with that city; outside them, the county holds the pen.\n\nThe lahar hazard is Pierce County's signature engineering consideration. The valleys draining Mount Rainier — the Puyallup, Carbon, and White river corridors — sit in mapped lahar hazard zones, and the county's development regulations address building in these areas with disclosure, siting, and design expectations. Evacuation route planning is part of the county's emergency framework for valley communities like Orting. For the design team, this means hazard-area identification on the site plan, awareness of how the county treats critical facilities in hazard zones, and honest conversations with owners about risk — the engineering does not eliminate the hazard, it works within the county's adopted framework for it.\n\nFloodplain administration is the second major thread. The Puyallup River and its tributaries put large areas of the valley floor in mapped flood hazard areas, and the county administers floodplain development standards — elevation of the lowest floor, flood-resistant materials and methods below the design flood elevation, and restrictions on floodway encroachment. A floodplain development review runs alongside the building permit, and elevation certificates document compliance. Sites near the river need a survey-grounded understanding of the flood maps before the foundation type is chosen; a slab-on-grade decision made without the flood data will not survive review.\n\nStormwater and critical areas complete the picture. The county's stormwater management manual sets the drainage standard — flow control, treatment, and conveyance — with soils testing to support infiltration designs. Wetlands, streams, and steep slopes fall under the county's critical areas protections with buffers and setbacks that shape the site plan. Many unincorporated parcels are on septic with health-department review, and wildland-urban interface concerns in the eastern county add defensible-space and access considerations. The county's reviewers apply their own manuals, so a set engineered to Tacoma's standards will draw corrections — design to the county that actually issues the permit.",
    directAnswer: "Unincorporated Pierce County permits through Planning & Public Works, with lahar hazard planning in the Rainier river valleys, Puyallup River floodplain standards, county stormwater manual drainage design, and critical areas protections. City parcels permit with their city; the county's manuals govern everywhere else.",
    topic: "Washington Engineering",
    serviceHref: "/services/civil/",
    sections: [
      {
        heading: "Lahar Zones and Floodplains: Designing Inside Mapped Hazards",
        body: "Building in a lahar hazard zone or a floodplain does not mean building is prohibited — it means the design acknowledges the hazard on the record. In the valley corridors, the county's framework expects hazard disclosure, careful siting of critical facilities, and coordination with evacuation planning. The structural engineer's role is to design a sound building for its everyday loads while the site planning respects the hazard mapping; the county's review checks that the hazard was identified and addressed, not wished away.\n\nIn the floodplain, the engineering is more prescriptive: lowest-floor elevation relative to the design flood elevation, flood openings in enclosed areas below that elevation, materials and equipment that tolerate inundation, and no-rise analysis where floodway work is proposed. The civil engineer coordinates the floodplain development review with the building permit, and the surveyor's elevation certificate becomes a permanent project document. The common failure is sequencing — discovering the floodplain designation after the foundation is designed. Pull the flood maps and the lahar hazard mapping at project kickoff, not at permit submittal.",
      },
      {
        heading: "Stormwater, Septic, and Rural Lots",
        body: "Pierce County's stormwater manual drives the civil design: runoff from new impervious surface must be controlled for flow and treated for water quality, with the manual's design storms and facility sizing methods. On rural lots this typically means dispersion, infiltration, or detention designed around tested soils — glacial till is common and infiltrates poorly, so the geotechnical program should include infiltration testing before the drainage concept is locked. The county reviews the drainage report as a core permit element.\n\nSeptic systems serve most unincorporated parcels, reviewed through the health department's separate track with soil evaluation, sizing, and reserve-area requirements. The drainfield, its reserve, the stormwater facility, the well or water service, and the building all compete for the flattest, best-drained ground — on a one-acre lot with a wetland buffer and a steep slope, that competition gets real. The site plan that wins county approval is the one drawn around the constraints first, with the building fitted into what remains.",
      },
    ],
    faqs: [
      {
        question: "What is a lahar hazard zone and does it affect my Pierce County project?",
        answer: "A lahar is a volcanic mudflow; the river valleys draining Mount Rainier — including the Puyallup, Carbon, and White corridors — are mapped lahar hazard areas. If your parcel is in or near one, the county's development framework addresses hazard disclosure, siting, and emergency planning. Check the county's hazard mapping at project start so the site plan and owner expectations reflect it.",
      },
      {
        question: "How does Pierce County regulate building in the floodplain?",
        answer: "The county administers floodplain development standards for mapped flood hazard areas: elevation of the lowest floor above the design flood elevation, flood-resistant construction below it, and restrictions on floodway encroachment. A floodplain development review runs with the building permit, and elevation certificates document compliance.",
      },
      {
        question: "Which stormwater manual applies in unincorporated Pierce County?",
        answer: "The county's own stormwater management manual governs drainage design for unincorporated projects — flow control, water quality treatment, and conveyance per the manual's methods. Design to the county manual from the start; a set drawn to a neighboring city's standards will come back with corrections.",
      },
      {
        question: "Do I permit with the county or the city near Tacoma and Puyallup?",
        answer: "The parcel's jurisdiction decides: inside Tacoma, Puyallup, Lakewood, or any other incorporated city, you permit with that city. Outside all city boundaries, Pierce County Planning & Public Works is the AHJ. Verify with the county's parcel records — mailing addresses near cities are often unincorporated county.",
      },
    ],
    extraLinks: [
      { label: "County vs. city plan check: which applies?", href: "/answers/county-plan-check-vs-city-plan-check/" },
      { label: "FEMA floodplain development guide", href: "/answers/fema-floodplain-development-guide/" },
      { label: "How long does plan check take?", href: "/answers/how-long-does-plan-check-take/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "snohomish-county-wa-engineering-permit-guide",
    title: "How Does Engineering Permitting Work in Unincorporated Snohomish County, WA?",
    description: "Unincorporated Snohomish County permits through Planning & Development Services, with landslide hazard review, critical areas protections, and county drainage standards shaped by Puget Sound watersheds.",
    h1: "How Does Engineering Permitting Work in Unincorporated Snohomish County, WA?",
    answer: "Direct answer: projects in unincorporated Snohomish County — outside Everett, Marysville, Lynnwood, and the other cities — permit through Snohomish County Planning & Development Services (PDS). The county's review is defined by its terrain: steep ravines and bluffs with mapped landslide hazards, streams and wetlands under critical areas protections, and drainage that ultimately reaches Puget Sound, the Snohomish River, or the Stillaguamish. The 2014 SR 530 landslide near Oso permanently raised the county's — and every design team's — attention to slope stability. Inside any city, you permit with that city; in the unincorporated county, PDS is the AHJ.\n\nLandslide hazard review is the county's most consequential gate for hillside and ravine parcels. The county maps landslide hazard areas and requires geotechnical assessment where development is proposed in or near them — slope stability analysis, setbacks from the top and toe of slopes, drainage control so the project does not add water to an unstable slope, and sometimes ongoing monitoring conditions. The geotechnical engineer of record carries real responsibility here: the county expects a licensed professional's analysis and recommendations, and the structural design follows the geotechnical constraints on foundation type, retaining systems, and grading limits. This is not a jurisdiction to value-engineer the soils report out of.\n\nCritical areas protections layer over the slopes. Wetlands, streams with their buffers, and fish and wildlife habitat corridors are common on the county's rural and suburban parcels, and the county requires identification, rating, and mitigation sequencing before the building permit moves. A stream buffer can easily be wider than the buildable remainder of a small lot, which is why the critical areas reconnaissance belongs at due diligence, not at design development. The county's reviewers are thorough on buffer averaging and mitigation proposals — vague promises do not pass.\n\nDrainage design follows the county's adopted stormwater manual, with flow control and water quality treatment sized per the manual's methods and soils testing to support infiltration claims. Many unincorporated parcels use septic systems reviewed through the health district, and shoreline permits apply along Puget Sound, Port Susan, and the rivers. Seismic design reflects the county's high hazard zone — the South Whidbey Island fault and the broader Cascadia risk. The county decides what is approved, so the engineering team works to PDS checklists, the county drainage manual, and the county's critical areas code from the first sketch.",
    directAnswer: "Unincorporated Snohomish County permits through Planning & Development Services, with landslide hazard geotechnical review on slopes, critical areas protections for wetlands and streams, county stormwater manual drainage, and high-seismic structural design. City parcels permit with their city.",
    topic: "Washington Engineering",
    serviceHref: "/services/structural/",
    sections: [
      {
        heading: "Slope Stability: The Geotechnical Gate",
        body: "On any parcel touching a mapped landslide hazard area — ravine lots, bluff-top properties, hillside acreage — the geotechnical investigation is the project. The county expects the geotechnical engineer to characterize the slope, analyze stability under static and seismic conditions, and set the rules the rest of the design obeys: building setbacks from slope crest and toe, grading limits, retaining wall requirements, and surface and subsurface drainage design that keeps water out of the slide mass. Foundations near slopes may require deep systems bearing below potential failure surfaces.\n\nThe county's review of the geotechnical report is substantive, and peer review or additional analysis can be required on complex slopes. For the owner, the honest message is that some slopes should not carry the project as first imagined — the geotechnical findings may shrink the footprint, push the building to the flatter portion of the lot, or recommend against the purchase entirely. That finding, delivered early, is worth more than any design heroics later. After Oso, nobody in this county treats slope review as paperwork.",
      },
      {
        heading: "Drainage, Septic, and Shoreline Threads",
        body: "The civil design centers on the county drainage manual: collect, treat, and control runoff per the manual's facility sizing, with infiltration testing where dispersion or infiltration is proposed. Glacial soils vary wildly across the county — outwash that drains beautifully in one area, tight till a mile away — so the infiltration testing has to be site-specific, not assumed from the neighbor's lot. The drainage report, calculations, and details are core permit documents.\n\nSeptic review runs through the health district on unincorporated parcels without sewer, with soil evaluation and reserve-area requirements that compete for usable ground alongside the stormwater facility and the building. Shoreline permits add a separate track along Puget Sound and the major rivers, with their own setbacks and mitigation expectations. Each thread has its own reviewer and its own timeline, and the building permit waits for all of them — the project schedule should be built on the slowest track, not the fastest.",
      },
    ],
    faqs: [
      {
        question: "Does Snohomish County require a geotechnical report on hillside lots?",
        answer: "Where a parcel is in or near a mapped landslide hazard area, the county requires geotechnical assessment addressing slope stability, setbacks, grading, and drainage. Even outside mapped areas, steep parcels routinely trigger the requirement. Engage the geotechnical engineer at due diligence — the findings shape the entire site plan.",
      },
      {
        question: "What are the stream and wetland buffer rules in Snohomish County?",
        answer: "The county's critical areas regulations set buffers based on the resource rating — wider for high-value wetlands and fish-bearing streams. Buffers are measured from the delineated edge and restrict clearing, grading, and building. A critical areas report by qualified professionals documents the resources and any proposed buffer modifications with mitigation.",
      },
      {
        question: "How does stormwater design work in unincorporated Snohomish County?",
        answer: "Drainage is designed to the county's adopted stormwater manual — flow control, water quality treatment, and conveyance sized per the manual's methods. Infiltration-based designs need site-specific soils testing. The drainage report is a central permit document reviewed against the county manual.",
      },
      {
        question: "I live near Everett but outside city limits — who is my AHJ?",
        answer: "Unincorporated pockets around Everett, Marysville, Lynnwood, and other cities are common, and they permit through Snohomish County PDS, not the nearby city. Verify jurisdiction with the county's parcel records before designing — the mailing address does not determine the AHJ.",
      },
    ],
    extraLinks: [
      { label: "County vs. city plan check: which applies?", href: "/answers/county-plan-check-vs-city-plan-check/" },
      { label: "What is a geotechnical report?", href: "/answers/geotechnical-report-explained/" },
      { label: "How is a geotechnical settlement analysis done?", href: "/answers/geotechnical-settlement-analysis-explained/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "spokane-county-wa-engineering-permit-guide",
    title: "How Does Engineering Permitting Work in Unincorporated Spokane County, WA?",
    description: "Unincorporated Spokane County permits through the Building & Planning Department, with aquifer protection over the Spokane Valley-Rathdrum Prairie Aquifer, wildfire planning, and snow-load structural design.",
    h1: "How Does Engineering Permitting Work in Unincorporated Spokane County, WA?",
    answer: "Direct answer: projects in unincorporated Spokane County — outside the cities of Spokane, Spokane Valley, Liberty Lake, and the smaller towns — permit through the Spokane County Building & Planning Department. Eastern Washington's conditions drive the engineering: the Spokane Valley-Rathdrum Prairie Aquifer beneath much of the urban area brings critical aquifer recharge area protections that restrict certain uses and demand spill and stormwater controls; wildfire risk shapes the urban-wildland fringe; snow loads govern roof design; and the Spokane River corridor adds floodplain and shoreline review. Inside any city, you permit with that city; outside them, the county is the AHJ.\n\nAquifer protection is the county's distinctive regulatory layer. The Spokane Valley-Rathdrum Prairie Aquifer is the region's sole-source drinking water supply, and the county's critical aquifer recharge area regulations manage development over it — restrictions on uses with contamination risk, requirements for stormwater treatment before infiltration, and careful handling of fuels and chemicals during and after construction. For the civil engineer, this means stormwater design that treats runoff before it reaches the ground, and for the owner it means certain commercial uses face a harder path over the aquifer. The protections are not optional and not negotiable at the counter.\n\nWildfire and snow define the structural and site design. The county's wildland-urban interface areas — the wooded fringes around the cities, the West Plains, Mount Spokane's foothills — call for defensible space, ember-resistant construction details, and reliable emergency access with turnarounds the fire district will actually approve. Snow loads in the county are real and elevation-dependent; roof structures are engineered for the ground snow load at the site's elevation, with drifting considered at parapets and valleys. Basalt bedrock near the surface in many areas simplifies foundations but complicates excavation and septic — rock that bears beautifully is rock that resists the backhoe.\n\nThe Spokane River, Latah Creek, and their tributaries bring floodplain and shoreline jurisdiction to corridor parcels, with elevation and setback requirements administered through the county. Stormwater follows the county's adopted manual, and many unincorporated parcels rely on septic with health-district review. The county's reviewers work from their own codes and manuals, so the design team builds the submittal to Spokane County's standards — a west-side set will draw corrections on aquifer, snow, and wildfire provisions it never considered.",
    directAnswer: "Unincorporated Spokane County permits through Building & Planning, with aquifer recharge protections over the Spokane Valley-Rathdrum Prairie Aquifer, wildfire planning on the urban fringe, elevation-based snow loads, and river-corridor floodplain review. City parcels permit with their city.",
    topic: "Washington Engineering",
    serviceHref: "/services/structural/",
    sections: [
      {
        heading: "Building Over a Sole-Source Aquifer",
        body: "The aquifer rules change what the civil engineer is allowed to do with water. Infiltration is encouraged in principle — the aquifer recharges through the valley's permeable soils — but runoff must be treated before it infiltrates, and some land uses with spill risk are restricted or prohibited in the recharge area. Fueling, vehicle maintenance, and chemical storage get scrutiny; construction-phase spill prevention is part of the approved plans, not an afterthought. Drywells, common in the valley, are designed as treatment-and-disposal systems under the county's standards.\n\nFor commercial and industrial projects, the aquifer review can be the long pole: use restrictions, secondary containment, and monitoring expectations are set before the building permit advances. Residential projects feel it mainly in stormwater design and in the prohibition on practices that threaten groundwater. The county coordinates with the health district and state environmental regulators on the most sensitive sites — the design team should identify aquifer-area status at due diligence and shape the use and the drainage concept around it.",
      },
      {
        heading: "Snow, Fire, and Rock: The Structural Realities",
        body: "Snow load design in Spokane County is elevation-driven engineering, not a single number — the ground snow load climbs with elevation toward Mount Spokane and the eastern ridges, and the structural engineer designs roofs for the site-specific load with drift accumulation at steps, parapets, and valleys. Unbalanced and sliding snow cases matter on the county's common gable and shed roofs. The building official checks the snow load basis on the structural drawings, so the design criteria need to be stated and sourced, not assumed.\n\nWildfire planning affects the fringe subdivisions and rural parcels: defensible space around structures, ignition-resistant exterior materials and venting, and driveways and turnarounds that meet fire district access standards. On basalt sites, the geotechnical story is usually good news for bearing and bad news for excavation — shallow rock means spread footings on solid material but also rock excavation for utilities, septic, and stormwater facilities. The soils report should address excavatability alongside bearing so the site work budget reflects reality.",
      },
    ],
    faqs: [
      {
        question: "What are the aquifer protection rules in Spokane County?",
        answer: "Over the Spokane Valley-Rathdrum Prairie Aquifer's critical recharge area, the county restricts uses with groundwater contamination risk and requires stormwater treatment before infiltration, spill prevention during construction, and careful handling of fuels and chemicals. Check whether your parcel is in the recharge area at due diligence — it shapes both the allowed use and the civil design.",
      },
      {
        question: "How are snow loads determined in Spokane County?",
        answer: "By site elevation and location — ground snow loads increase toward Mount Spokane and the higher ridges. The structural engineer designs for the site-specific load including drift, unbalanced, and sliding cases. The snow load basis must be shown on the structural drawings for plan review.",
      },
      {
        question: "Does Spokane County have wildfire building requirements?",
        answer: "Wildland-urban interface areas call for defensible space, ember-resistant construction details, and fire-district-approved emergency access. The requirements concentrate on the wooded fringes and rural parcels; confirm your parcel's status with the county and the fire district early.",
      },
      {
        question: "Who permits my project near Spokane Valley or Liberty Lake?",
        answer: "Inside the city limits of Spokane, Spokane Valley, Liberty Lake, or any town, you permit with that city. In the unincorporated county between and around them, Spokane County Building & Planning is the AHJ. Verify with county parcel records — the urban area has many unincorporated pockets.",
      },
    ],
    extraLinks: [
      { label: "County vs. city plan check: which applies?", href: "/answers/county-plan-check-vs-city-plan-check/" },
      { label: "How is snow load calculated for roof design?", href: "/answers/asce-7-snow-load-design/" },
      { label: "What is a geotechnical report?", href: "/answers/geotechnical-report-explained/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "clark-county-wa-engineering-permit-guide",
    title: "How Does Engineering Permitting Work in Unincorporated Clark County, WA?",
    description: "Unincorporated Clark County permits through Community Development, with Columbia River floodplain rules, critical areas protections, county stormwater standards, and growth-management urban holding areas.",
    h1: "How Does Engineering Permitting Work in Unincorporated Clark County, WA?",
    answer: "Direct answer: projects in unincorporated Clark County — outside Vancouver, Camas, Washougal, Battle Ground, and the smaller cities — permit through Clark County Community Development. The county's review reflects its position on the Columbia River across from Portland: floodplain administration along the Columbia and its tributaries, critical areas protections for wetlands and streams, a county stormwater manual, and Washington's Growth Management Act framework with urban growth areas that determine where urban-density development can occur. Inside any city, you permit with that city; outside them, the county holds the pen.\n\nThe Growth Management Act shapes what can be built where. Urban-density development belongs inside the urban growth area boundary; rural lands outside it carry larger minimum lot sizes, limits on extending urban services, and protections for resource lands. For the design team, the first question is not just jurisdiction but growth-area status — a parcel's zoning, allowed density, and even whether public sewer is available all flow from it. Projects that assume urban services on rural land stall; projects designed for the parcel's actual designation move.\n\nFloodplain and shoreline review concentrate along the Columbia River, the Lewis and Washougal rivers, and Lacamas Lake. Mapped flood hazard areas bring elevation requirements, flood-resistant construction below the design flood elevation, and floodway restrictions; shoreline permits add a separate track with setbacks and habitat considerations. The county administers both, and corridor parcels need survey-grounded flood data before foundation decisions are made. Landslide hazard areas on the steeper terrain and the Columbia Gorge fringe require geotechnical assessment with slope stability analysis and drainage design that keeps water out of slide masses.\n\nStormwater follows the county's adopted manual — flow control, water quality treatment, and conveyance per the manual's methods, with site-specific infiltration testing where infiltration is proposed. Wetlands and streams fall under critical areas protections with buffers that shape the site plan. Seismic design reflects the county's high hazard zone, near the Portland Hills fault system and within Cascadia's reach. Many unincorporated parcels use septic with health-department review. The county's reviewers apply county codes and manuals throughout, so the submittal is built to Clark County's standards from day one.",
    directAnswer: "Unincorporated Clark County permits through Community Development, with growth-area status determining density and services, Columbia River floodplain and shoreline review, critical areas protections, county stormwater manual drainage, and high-seismic design. City parcels permit with their city.",
    topic: "Washington Engineering",
    serviceHref: "/services/civil/",
    sections: [
      {
        heading: "Growth Areas, Rural Lands, and What the Zoning Really Allows",
        body: "Washington's Growth Management Act is not abstract policy in Clark County — it is the document that decides whether your parcel gets urban sewer or a septic system, whether the density pencils, and whether the county will even accept the application as drawn. Inside the urban growth area, urban zoning, public services, and the county's urban development standards apply; outside it, rural zoning with larger lots, on-site systems, and resource-land protections govern. The comprehensive plan designation and the zoning must agree with the proposal, and rezones or comprehensive plan amendments are multi-month legislative processes, not permit corrections.\n\nFor engineers, the practical work starts with a jurisdiction and designation check: confirm the parcel is unincorporated county, confirm the growth-area status, confirm the zoning allows the use at the proposed density, and confirm sewer and water availability in writing. A surprising number of stalled projects trace to one of these four being assumed rather than verified. The county's pre-application process exists precisely to surface these issues before design dollars are spent — use it.",
      },
      {
        heading: "Floodplains, Slopes, and Stormwater on the Columbia's North Bank",
        body: "The Columbia River floodplain is the county's highest-consequence review area: elevation of the lowest floor, flood-resistant materials and methods below the design flood elevation, restrictions on floodway encroachment, and elevation certificates documenting compliance. Tributary floodplains and the shoreline jurisdiction add their own setbacks and habitat review. The civil engineer coordinates floodplain development review with the building permit, and the structural engineer designs foundations for the flood conditions — a standard slab where the flood data demands elevation will not survive review.\n\nStormwater design per the county manual handles the rest of the water: flow control and treatment sized for the manual's design storms, with infiltration testing on site-specific soils. Steep-slope parcels get geotechnical assessment for stability, setbacks, and drainage. Wetlands and streams carry buffers under the critical areas code. Each of these reviews can move a footprint or shrink a yield — the site plan that respects them from the first sketch is the one that gets approved without redesign.",
      },
    ],
    faqs: [
      {
        question: "What is the urban growth area and why does it matter in Clark County?",
        answer: "Under Washington's Growth Management Act, the urban growth area boundary separates land planned for urban densities and services from rural and resource lands. Inside it, urban zoning and public sewer and water are available; outside it, larger lots, septic systems, and rural standards apply. Your parcel's status determines density, services, and design standards — verify it before designing.",
      },
      {
        question: "How does Clark County regulate Columbia River floodplain development?",
        answer: "Mapped flood hazard areas carry elevation requirements for the lowest floor, flood-resistant construction below the design flood elevation, and floodway encroachment restrictions, administered through floodplain development review alongside the building permit. Shoreline permits add a separate track along the river with setbacks and habitat considerations.",
      },
      {
        question: "Which stormwater manual applies in unincorporated Clark County?",
        answer: "The county's adopted stormwater manual governs drainage design — flow control, water quality treatment, and conveyance per the manual's methods, with site-specific infiltration testing where infiltration is proposed. Design to the county manual; neighboring-city standards will draw corrections.",
      },
      {
        question: "Do landslide hazards affect Clark County permits?",
        answer: "Steeper terrain and Gorge-fringe parcels can fall in mapped landslide hazard areas, triggering geotechnical assessment of slope stability, setbacks from slope crest and toe, grading limits, and drainage design. Engage the geotechnical engineer at due diligence on any hillside parcel.",
      },
    ],
    extraLinks: [
      { label: "County vs. city plan check: which applies?", href: "/answers/county-plan-check-vs-city-plan-check/" },
      { label: "FEMA floodplain development guide", href: "/answers/fema-floodplain-development-guide/" },
      { label: "How do you respond to plan check corrections?", href: "/answers/how-to-respond-to-plan-check-corrections/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "multnomah-county-or-engineering-permit-guide",
    title: "How Does Engineering Permitting Work in Unincorporated Multnomah County, OR?",
    description: "Unincorporated Multnomah County permits through Land Use Planning, covering Sauvie Island, Corbett, and rural east county — with floodplain, landslide, and farm-forest zoning distinct from Portland's process.",
    h1: "How Does Engineering Permitting Work in Unincorporated Multnomah County, OR?",
    answer: "Direct answer: the parts of Multnomah County outside Portland, Gresham, Troutdale, Fairview, and Wood Village — Sauvie Island, Corbett and the Gorge corridor, the farmlands and forests of east county — permit through Multnomah County Land Use Planning. This is a county of jurisdictional islands: most of the population lives in cities, and the unincorporated areas are rural, agricultural, or resource lands with their own zoning, their own floodplain and hazard overlays, and a review culture oriented toward land use as much as building code. Inside any city, you permit with that city; in the unincorporated pockets, the county is the AHJ.\n\nThe defining feature of a Multnomah County project is that land use comes first. Much of unincorporated east county is exclusive farm use or forest zoning, where dwellings and non-resource uses face strict state-driven tests — the county applies Oregon's farm and forest land rules, and a proposal that a city would treat as a routine permit can require a land use decision with findings, notice, and appeal rights. Floodplain overlays along the Sandy River, the Columbia, and Multnomah Channel add elevation and development standards; landslide hazard areas on the West Hills fringe and the Gorge bluffs trigger geotechnical review. The building permit waits for the land use decision — sequencing the two correctly is the single most important project-management task.\n\nSauvie Island deserves its own note: the island's farmland, wildlife area, and flood-prone lowlands sit largely in the floodplain, with the Multnomah County Drainage District managing the levee and pump systems that keep the island dry. Building on the island means floodplain development standards, elevation requirements, and coordination with drainage district infrastructure — the levees are not scenery, they are the reason the land is usable. Septic systems and wells serve most island and rural parcels, with county environmental health review.\n\nStormwater in the unincorporated county follows the county's standards, with water quality treatment protecting the Sandy, the Columbia sloughs, and the streams that feed them. Seismic design reflects the Portland Hills fault zone and the Cascadia subduction risk — one of the highest hazard settings in the state. Wildfire concerns touch the Gorge corridor and the forested east. The county's reviewers work from the county zoning code and state land use law, a different universe from Portland's title-based process — the design team staffs and sequences the project for a land-use-first county review, not a city building-permit review.",
    directAnswer: "Unincorporated Multnomah County — Sauvie Island, Corbett, rural east county — permits through County Land Use Planning, where farm-forest zoning and land use decisions precede building permits, with floodplain, landslide, and drainage-district coordination. City parcels permit with their city under entirely different processes.",
    topic: "Oregon Engineering",
    serviceHref: "/services/architecture/",
    sections: [
      {
        heading: "Land Use First: Farm, Forest, and Floodplain Zoning",
        body: "In the unincorporated county, the zoning question dominates everything downstream. Exclusive farm use and forest zones carry state-mandated protections: new dwellings must satisfy the applicable farm-dwelling tests, non-farm uses need conditional or special approvals with findings, and partitions of resource land face minimum lot sizes measured in tens of acres. The county's land use planners administer these rules under Oregon's statewide planning goals, and their decisions can be appealed to the state land use board — a level of process most building-permit applicants never encounter.\n\nThe floodplain overlay compounds the zoning: along the Sandy River, the Columbia, and the sloughs, elevation standards, flood-resistant construction, and floodway restrictions apply on top of the base zoning. On Sauvie Island, the drainage district's levee system adds an infrastructure partner — building near levees and pump stations means coordinating with the district that maintains them. The engineering team maps every overlay — zoning, floodplain, landslide hazard, drainage district — before the first site sketch, because each one can veto a footprint the others allow.",
      },
      {
        heading: "Septic, Wells, Stormwater, and Gorge-Corridor Hazards",
        body: "Rural parcels run on wells and septic, with the county's environmental health program reviewing on-site systems — soil evaluation, sizing, and reserve areas on ground that must also accommodate the building, the stormwater facilities, and the required setbacks. On small rural lots with floodplain or stream buffers, fitting all of this together is the central site-planning puzzle, and it is solved on paper before it is solved with a backhoe.\n\nStormwater design protects the county's sensitive receiving waters — treatment for water quality is non-negotiable where runoff reaches the Sandy, the sloughs, or the Columbia. In the Gorge corridor around Corbett, landslide hazards on the bluffs and wildfire risk in the forested slopes add geotechnical and defensible-space dimensions. Seismic design for the Portland Hills fault and Cascadia governs the structural work throughout the county. The county approves what the county's codes allow — a design imported from a Portland or Gresham project will need re-engineering for county land use law, not just a new title block.",
      },
    ],
    faqs: [
      {
        question: "How is permitting in unincorporated Multnomah County different from Portland?",
        answer: "Portland administers its own title-based building and zoning process for parcels inside city limits. The unincorporated county — Sauvie Island, Corbett, rural east county — goes through County Land Use Planning under the county zoning code and Oregon's farm-forest land use law, where land use decisions often precede building permits. They are different processes with different rules, timelines, and appeal rights.",
      },
      {
        question: "Can I build a home on farm-zoned land in Multnomah County?",
        answer: "Exclusive farm use zoning allows dwellings only under the applicable state farm-dwelling tests, which the county administers strictly. Non-farm dwellings and other uses require land use approvals with findings. Engage a land use professional before purchasing or designing — the zoning answer determines whether the project exists at all.",
      },
      {
        question: "What is the drainage district's role on Sauvie Island?",
        answer: "The Multnomah County Drainage District operates the levees and pump stations that protect the island from flooding. Building on the island means floodplain development standards plus coordination with district infrastructure — setbacks from levees, awareness of interior drainage, and elevation requirements all apply.",
      },
      {
        question: "Do landslide hazards affect east county projects?",
        answer: "The West Hills fringe, the Gorge bluffs near Corbett, and steep ravines can fall in landslide hazard areas, triggering geotechnical assessment of stability, setbacks, grading limits, and drainage. Order the geotechnical work at due diligence on any sloped parcel.",
      },
    ],
    extraLinks: [
      { label: "County vs. city plan check: which applies?", href: "/answers/county-plan-check-vs-city-plan-check/" },
      { label: "OKC vs. county: a jurisdiction comparison", href: "/answers/oklahoma-city-vs-oklahoma-county-permit-review/" },
      { label: "FEMA floodplain development guide", href: "/answers/fema-floodplain-development-guide/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "washington-county-or-engineering-permit-guide",
    title: "How Does Engineering Permitting Work in Unincorporated Washington County, OR?",
    description: "Unincorporated Washington County — including urban areas like Aloha and Bethany — permits through Land Use & Transportation, with Clean Water Services stormwater rules and Tualatin watershed protections.",
    h1: "How Does Engineering Permitting Work in Unincorporated Washington County, OR?",
    answer: "Direct answer: unincorporated Washington County permits through the county's Department of Land Use & Transportation — and here is what surprises newcomers: much of the county's urban area is unincorporated. Communities like Aloha, Bethany, Cedar Mill, Garden Home, and Rock Creek sit outside any city boundary, so urban subdivisions, apartments, and commercial projects permit with the county, not a city. The county's review blends urban development standards with watershed protections for the Tualatin River system, administered in partnership with Clean Water Services. Inside Hillsboro, Beaverton, Tigard, or another city, you permit with that city; in the large unincorporated areas between them, the county is the AHJ.\n\nClean Water Services (CWS) is the co-regulator every design team must know. CWS provides sanitary sewer and stormwater management across urban Washington County, and its design and construction standards govern stormwater facilities, erosion control, and sanitary connections for development — including development permitted by the county. The county building permit and the CWS service-provider review run as parallel tracks: the county checks zoning, building code, and transportation, while CWS checks that the stormwater and sewer design meets its standards. A project approved by one but not the other does not get built. The civil engineer's drainage design lives primarily in the CWS world — water quality treatment, hydromodification management, and facility sizing per CWS standards.\n\nThe Tualatin River watershed sets the environmental bar. Vegetated corridors along streams and wetlands carry protections under CWS and county rules, with widths and mitigation expectations that shape site plans in the urban unincorporated areas — a surprising amount of suburban Washington County is laced with protected corridors. Floodplain along the Tualatin and its tributaries adds elevation and development standards. The county's transportation review is substantive too: the county maintains the arterial system serving the unincorporated areas, and frontage improvements, access management, and traffic impact analysis are standard on larger projects.\n\nSeismic design reflects the Portland Hills fault zone and Cascadia risk, and landslide hazards on the steeper terrain — the Cooper Mountain and Bull Mountain slopes, the West Hills fringe — trigger geotechnical review. The county's community development code is detailed and prescriptive; the design team works to the county code and the CWS standards as a matched set. A set engineered for a neighboring city's process will need reworking — not because the engineering is wrong, but because the reviewers, checklists, and standards are different.",
    directAnswer: "Unincorporated Washington County — including urban Aloha, Bethany, and Cedar Mill — permits through Land Use & Transportation, with Clean Water Services co-reviewing stormwater and sewer, Tualatin watershed corridor protections, and county transportation standards. City parcels permit with their city.",
    topic: "Oregon Engineering",
    serviceHref: "/services/civil/",
    sections: [
      {
        heading: "The County-CWS Partnership: Two Reviewers, One Project",
        body: "The most important thing to understand about a Washington County project is that approval is a two-key system. The county's Land Use & Transportation department reviews land use, building code, grading, and transportation; Clean Water Services reviews stormwater management, erosion control, and sanitary sewer as the service provider. Neither defers to the other, and their standards are separate documents the design team must satisfy simultaneously. The pre-application process should include both — discovering the CWS requirements after the county permit is submitted is a classic schedule-killer.\n\nFor the civil engineer, CWS standards drive the drainage design: water quality facilities sized per CWS methods, flow control addressing hydromodification in the Tualatin watershed, vegetated corridor protections with required widths and planting standards, and erosion and sediment control during construction that CWS inspects in the field. Sanitary connections, pump station requirements where gravity does not work, and system development charges are all in the CWS track. The county track handles the building, the grading permit, the transportation improvements, and the land use approvals. Staff the project for both from day one.",
      },
      {
        heading: "Corridors, Floodplains, and Urban Unincorporated Density",
        body: "The vegetated corridor protections are the site-planning constraint that most often surprises suburban developers: streams and wetlands threading through Aloha, Bethany, and the other urban unincorporated areas carry protected corridors with widths, native planting requirements, and development restrictions. These corridors cannot be piped or paved over by right — the site plan works around them, and density calculations must account for the unbuildable corridor area. Wetland delineations and corridor assessments belong at due diligence.\n\nFloodplain along the Tualatin River and tributaries like Beaverton Creek and Rock Creek adds elevation standards and floodway restrictions on corridor parcels. Transportation review covers frontage improvements to county standards, access spacing on arterials, and traffic analysis for larger projects — the county builds and maintains this road network, and it collects its improvements through development. Seismic and landslide review apply on the sloped terrain at the urban fringe. The county's code rewards design teams that read it early and punishes those who assume the neighboring city's rules transfer.",
      },
    ],
    faqs: [
      {
        question: "Is Aloha in a city or unincorporated Washington County?",
        answer: "Aloha is unincorporated — it sits outside any city boundary, so projects there permit through Washington County Land Use & Transportation, not a city. The same is true for Bethany, Cedar Mill, Garden Home, Rock Creek, and other urban unincorporated communities. Verify jurisdiction with the county's parcel records; the urban feel does not make it a city.",
      },
      {
        question: "What does Clean Water Services review on my project?",
        answer: "As the sanitary and stormwater service provider for urban Washington County, CWS reviews stormwater management design, erosion and sediment control, vegetated corridor protections, and sanitary sewer connections against its design and construction standards. Its review runs parallel to the county's building permit — both must approve.",
      },
      {
        question: "What are vegetated corridors in Washington County?",
        answer: "Protected vegetated areas along streams and wetlands, regulated under CWS and county rules, with required widths, native vegetation standards, and development restrictions. They shape site plans throughout the urban unincorporated areas — delineate them at due diligence, not at final design.",
      },
      {
        question: "How does transportation review work for county projects?",
        answer: "The county reviews access, frontage improvements, and traffic impacts against its transportation standards, since it maintains the arterial network serving unincorporated areas. Larger projects typically provide traffic analysis and construct frontage improvements to county specifications.",
      },
    ],
    extraLinks: [
      { label: "County vs. city plan check: which applies?", href: "/answers/county-plan-check-vs-city-plan-check/" },
      { label: "How long does plan check take?", href: "/answers/how-long-does-plan-check-take/" },
      { label: "How do you respond to plan check corrections?", href: "/answers/how-to-respond-to-plan-check-corrections/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "clackamas-county-or-engineering-permit-guide",
    title: "How Does Engineering Permitting Work in Unincorporated Clackamas County, OR?",
    description: "Unincorporated Clackamas County permits through the Department of Transportation & Development, with wildfire recovery review in the Santiam corridor, Clackamas River floodplain rules, and rural zoning.",
    h1: "How Does Engineering Permitting Work in Unincorporated Clackamas County, OR?",
    answer: "Direct answer: unincorporated Clackamas County — outside Oregon City, Lake Oswego, Milwaukie, Happy Valley, and the other cities — permits through the county's Department of Transportation & Development, which handles planning, zoning, and building. The county spans Portland's southern suburbs, the farmlands of the Willamette Valley floor, and the forested Cascades foothills up the Clackamas River and Santiam corridors, so the engineering review shifts dramatically with geography: suburban stormwater and transportation in the north, farm-forest zoning and wildfire planning in the east. Inside any city, you permit with that city; in the unincorporated areas, the county is the AHJ.\n\nWildfire is the county's defining recent hazard. The 2020 Riverside Fire burned through the Santiam corridor communities, and rebuilding in the fire footprint — along with new development in the county's mapped wildfire hazard areas — brings defensible space requirements, ignition-resistant construction standards, and emergency access review into the permit. The county coordinates wildfire planning with the state forestry department and local fire districts. For the design team, this means the exterior material palette, venting details, deck construction, and driveway turnarounds are permit-review items, not just good practice — and in the burn scar areas, geotechnical and hazard-tree assessment can precede the building design.\n\nThe Clackamas River corridor adds floodplain and water-quality review: mapped flood hazard areas with elevation and construction standards, plus protections for the river system that supplies drinking water to much of the county. Landslide hazards on the foothill slopes trigger geotechnical assessment. Farm and forest zoning across the rural county applies Oregon's resource-land rules — dwellings and non-resource uses face the state's farm-forest tests, administered through county land use decisions that precede building permits.\n\nStormwater in the urban unincorporated north follows county standards with water quality treatment protecting the Willamette and Clackamas watersheds; transportation review covers frontage and access on the county road system. Seismic design reflects the Portland Hills fault zone and Cascadia risk throughout the county. Septic and wells serve the rural areas with county environmental health review. The county's reviewers work from the county zoning and development code — a Portland or Milwaukie project set will need re-engineering for county land use law and the county's hazard overlays.",
    directAnswer: "Unincorporated Clackamas County permits through Transportation & Development, with wildfire standards in the Santiam corridor and hazard areas, Clackamas River floodplain review, farm-forest zoning in the rural county, and suburban stormwater and transportation standards in the north. City parcels permit with their city.",
    topic: "Oregon Engineering",
    serviceHref: "/services/structural/",
    sections: [
      {
        heading: "Rebuilding and Building in Wildfire Country",
        body: "In the county's wildfire hazard areas — the Santiam corridor, the Clackamas River canyon communities, the forested foothills — the permit review treats fire as a design load. Defensible space zones around structures, ignition-resistant roofing, siding, and decking, ember-resistant venting, and exterior features that do not trap embers are reviewed against the applicable wildfire standards. Driveways must provide fire apparatus access and turnarounds the fire district will sign off on; on steep or long driveways, that requirement alone can reshape the site plan.\n\nIn the 2020 burn scar, additional layers apply: hazard-tree assessment, slope stability review where fire removed the vegetation holding foothill soils, and debris and hazardous-material clearance before rebuilding. The county's process for fire-affected properties has included streamlined and fee-adjusted tracks at various points — confirm the current program with the county rather than assuming. For new development in mapped hazard areas outside the burn scar, the wildfire review is a standard part of the land use and building permit, and the design team addresses it in the drawings, not in a narrative promise.",
      },
      {
        heading: "Rivers, Slopes, and the Rural-Urban Split",
        body: "The Clackamas River system concentrates the county's floodplain review: elevation of the lowest floor, flood-resistant construction below the design flood elevation, and floodway restrictions on corridor parcels, plus water-quality protections for the drinking-water watershed. Tributary streams and wetlands carry buffers under the county's resource protections. On the foothill slopes, landslide hazard areas trigger geotechnical assessment — stability analysis, setbacks, grading limits, and drainage design.\n\nThe rural county runs on Oregon's farm and forest zoning: dwellings must satisfy the applicable resource-land tests, and non-resource uses need land use approvals with findings and appeal rights. Septic and wells serve these areas through county environmental health review. In the urban unincorporated north — the areas around Happy Valley, Oak Grove, Jennings Lodge — the review looks suburban: county stormwater standards, transportation frontage and access, and the county's urban development code. One county, two engineering worlds — the design team staffs for the geography of the parcel, not the name on the county seal.",
      },
    ],
    faqs: [
      {
        question: "What wildfire standards apply to building in Clackamas County?",
        answer: "In mapped wildfire hazard areas, the review addresses defensible space, ignition-resistant exterior materials and venting, and fire apparatus access with approved turnarounds. In the 2020 Riverside Fire footprint, hazard-tree, slope stability, and debris clearance reviews can precede building design. Confirm current county programs for fire-affected properties before designing.",
      },
      {
        question: "How does the county regulate Clackamas River floodplain development?",
        answer: "Mapped flood hazard areas carry elevation requirements, flood-resistant construction standards below the design flood elevation, and floodway encroachment restrictions, plus watershed protections for the drinking-water supply. Floodplain review runs with the building permit on corridor parcels.",
      },
      {
        question: "Can I build on forest-zoned land in Clackamas County?",
        answer: "Forest and farm zones apply Oregon's resource-land rules: dwellings must meet the applicable tests, and non-resource uses require land use approvals with findings. These are land use decisions with notice and appeal rights that precede the building permit — resolve the zoning question before the engineering.",
      },
      {
        question: "Who permits projects near Happy Valley or Oak Grove?",
        answer: "Happy Valley is an incorporated city — inside its limits, you permit with the city. Adjacent unincorporated areas like Oak Grove and Jennings Lodge permit through Clackamas County. Verify the exact boundary with county parcel records; the urbanized area crosses city limits repeatedly.",
      },
    ],
    extraLinks: [
      { label: "Wildfire rebuild structural standards", href: "/answers/boulder-wildfire-rebuild-structural-standards/" },
      { label: "County vs. city plan check: which applies?", href: "/answers/county-plan-check-vs-city-plan-check/" },
      { label: "FEMA floodplain development guide", href: "/answers/fema-floodplain-development-guide/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "marion-county-or-engineering-permit-guide",
    title: "How Does Engineering Permitting Work in Unincorporated Marion County, OR?",
    description: "Unincorporated Marion County permits through Community Development, covering Salem's fringe, Willamette Valley farmland, and the Santiam Canyon — with farm zoning, floodplain, and wildfire review.",
    h1: "How Does Engineering Permitting Work in Unincorporated Marion County, OR?",
    answer: "Direct answer: unincorporated Marion County — outside Salem, Keizer, Woodburn, Silverton, Stayton, and the smaller cities — permits through Marion County Community Development, which administers planning, building inspection, and code enforcement. The county is the agricultural heart of the Willamette Valley wrapped around a mid-size metro, plus the Santiam Canyon gateway to the Cascades: the review runs from exclusive farm use zoning on the valley floor to wildfire and landslide planning in the canyon. Inside any city, you permit with that city; in the unincorporated areas, the county holds the pen.\n\nFarm zoning dominates the valley floor. Large areas of unincorporated Marion County are exclusive farm use, where Oregon's resource-land rules strictly limit dwellings and non-farm uses — new homes must satisfy the applicable farm-dwelling tests, and commercial or industrial proposals need land use approvals with findings, notice, and appeal rights. The county administers these decisions before any building permit is considered. For design teams used to suburban jurisdictions, the adjustment is real: the land use attorney and the planner lead, and the engineer's site plan must fit inside what the zoning allows, not the other way around.\n\nThe Santiam Canyon — Detroit, Gates, Mill City, Lyons, Mehama — adds the wildfire dimension. The 2020 Santiam Fire devastated canyon communities, and rebuilding and new development there move through wildfire hazard review: defensible space, ignition-resistant construction, emergency access, and in the burn footprint, hazard-tree and slope stability assessment. The North Santiam River corridor brings floodplain administration with elevation and construction standards. Landslide hazards on the canyon slopes trigger geotechnical review.\n\nThe Willamette River and its tributaries — the Santiam, the Pudding, Mill Creek — put valley-floor parcels in mapped floodplains with elevation and flood-resistant construction requirements. Stormwater follows county standards protecting the Willamette watershed. Septic and wells serve the rural county through environmental health review. Seismic design reflects the Cascadia subduction zone and crustal fault risk across the valley. The county's reviewers apply the county code and state land use law — a Salem city project set does not transfer without re-engineering for county jurisdiction.",
    directAnswer: "Unincorporated Marion County permits through Community Development, with exclusive farm use zoning across the valley floor, Santiam Canyon wildfire and floodplain review, and county stormwater and building standards. City parcels permit with their city under different rules.",
    topic: "Oregon Engineering",
    serviceHref: "/services/architecture/",
    sections: [
      {
        heading: "Farm Zoning: The Land Use Gate",
        body: "On the valley floor, the zoning map is mostly green — exclusive farm use — and that color controls the project. Oregon's farm-land protections mean a dwelling on EFU land must qualify under the applicable farm-dwelling provisions: farm-operator dwellings, non-farm dwellings under strict tests, accessory farm dwellings, each with its own findings. Lot divisions face large minimums. Non-farm uses — from event venues to rural industry — require conditional use or similar land use approvals with public notice and potential appeals to the state land use board.\n\nThe engineering consequence is sequencing: the land use decision comes first, and the site plan, access design, and utility planning must conform to the conditions of approval, not just the building code. Setbacks from farm operations, compatibility findings, and limits on the non-farm footprint all shape the drawings. Teams that engage land use counsel and the county planners before spending on engineering avoid the most expensive mistake in the rural county — a full design for a use the zoning never allowed.",
      },
      {
        heading: "Canyon Hazards and Valley Water",
        body: "In the Santiam Canyon, the permit review treats wildfire as a primary design consideration: defensible space around structures, ignition-resistant roofs, siding, decks, and vents, and driveways built for fire apparatus access with turnarounds the fire district approves. Rebuilding in the 2020 fire footprint adds hazard-tree assessment, burned-slope stability review, and infrastructure restoration coordination — the canyon's water systems, roads, and utilities were themselves fire-damaged, and the building permit depends on services being available.\n\nOn the valley floor, water is the hazard: the Willamette, Santiam, and Pudding river floodplains carry elevation requirements, flood-resistant construction standards, and floodway restrictions, administered through floodplain development review with the building permit. Stormwater design per county standards protects the watershed's water quality. Seismic design for Cascadia governs structures countywide. The county approves projects that satisfy its code and the state's land use framework — the design team reads both before drawing.",
      },
    ],
    faqs: [
      {
        question: "Can I build a house on farm-zoned land in Marion County?",
        answer: "Exclusive farm use land allows dwellings only under the applicable state farm-dwelling provisions, which the county administers strictly, with findings for each category. Non-farm dwellings face difficult tests. Resolve the zoning question with the county planners — and usually land use counsel — before any engineering begins.",
      },
      {
        question: "What is required to rebuild in the Santiam Canyon fire area?",
        answer: "Wildfire hazard review applies: defensible space, ignition-resistant construction, and fire apparatus access. In the 2020 fire footprint, expect hazard-tree assessment, slope stability review on burned slopes, and coordination on restored water, road, and utility services. Confirm current county programs for fire-affected properties.",
      },
      {
        question: "How does Marion County handle Willamette River floodplain building?",
        answer: "Mapped flood hazard areas require elevation of the lowest floor above the design flood elevation, flood-resistant construction below it, and floodway encroachment restrictions, reviewed through floodplain development administration alongside the building permit.",
      },
      {
        question: "Do I permit with Salem or the county near the city edge?",
        answer: "Inside Salem's city limits — including Keizer, its separate city — you permit with that city. In the unincorporated areas around them, Marion County Community Development is the AHJ. The boundary is irregular; verify with county parcel records.",
      },
    ],
    extraLinks: [
      { label: "Wildfire rebuild structural standards", href: "/answers/boulder-wildfire-rebuild-structural-standards/" },
      { label: "County vs. city plan check: which applies?", href: "/answers/county-plan-check-vs-city-plan-check/" },
      { label: "FEMA floodplain development guide", href: "/answers/fema-floodplain-development-guide/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "lane-county-or-engineering-permit-guide",
    title: "How Does Engineering Permitting Work in Unincorporated Lane County, OR?",
    description: "Unincorporated Lane County permits through the Land Management Division, from Eugene's fringe to the McKenzie corridor and the coast — with floodplain, wildfire, and coastal hazard review.",
    h1: "How Does Engineering Permitting Work in Unincorporated Lane County, OR?",
    answer: "Direct answer: unincorporated Lane County — outside Eugene, Springfield, Cottage Grove, Florence, and the smaller cities — permits through the county's Land Management Division. The county stretches from the Willamette Valley floor over the Cascades to the Pacific coast, so one county contains three engineering worlds: valley farmland and floodplain, the fire-scarred McKenzie River corridor, and the coastal dunes, tsunami zones, and floodplains around Florence. Inside any city, you permit with that city; across the vast unincorporated county, Land Management is the AHJ.\n\nThe McKenzie River corridor defines the county's wildfire review. The 2020 Holiday Farm Fire burned from the Cascades to the valley, destroying the communities of Blue River and Nimrod, and rebuilding there moves through wildfire hazard planning: defensible space, ignition-resistant construction, emergency access, plus hazard-tree and burned-slope stability assessment. The McKenzie is also a drinking-water source and a wild and scenic river corridor, so rebuilding and new development navigate floodplain, riparian, and water-quality protections alongside the fire review. The county coordinates with state forestry, the fire districts, and water providers — the permit depends on services being restored and available.\n\nThe coast adds tsunami and dune hazards. Around Florence and the unincorporated coast, tsunami inundation mapping affects siting and emergency planning for certain occupancies, coastal dunes carry development restrictions and stabilization requirements, and floodplains along the Siuslaw River and coastal lakes bring elevation and construction standards. Septic systems near the dunes and the high water table need designs suited to the soils — standard systems do not work everywhere on the coast, and the county's on-site program reviews accordingly.\n\nThe valley floor brings farm and forest zoning under Oregon's resource-land rules, Willamette River floodplain administration, and stormwater standards protecting the watershed. Seismic design countywide reflects the Cascadia subduction zone — and on the coast, the tsunami risk that comes with it. The county's reviewers apply the Lane County code and state land use law across all three geographies; a Eugene city project set does not transfer to the county without re-engineering for the county's jurisdiction, overlays, and hazard reviews.",
    directAnswer: "Unincorporated Lane County permits through the Land Management Division across valley, Cascades, and coast — with McKenzie corridor wildfire rebuilding review, coastal tsunami and dune hazards, valley farm zoning and floodplain administration, and Cascadia seismic design. City parcels permit with their city.",
    topic: "Oregon Engineering",
    serviceHref: "/services/civil/",
    sections: [
      {
        heading: "The McKenzie Corridor: Rebuilding After the Holiday Farm Fire",
        body: "In the fire footprint — Blue River, Nimrod, the McKenzie corridor communities — the building permit is the last step in a longer sequence. Hazard trees must be assessed and removed, burned slopes evaluated for stability and debris-flow risk, and water, power, and road access restored or confirmed. The county's wildfire review then applies to the structure itself: defensible space zones, ignition-resistant roofing, siding, decking, and venting, and driveways designed for fire apparatus access with approved turnarounds.\n\nThe river adds its own jurisdiction: the McKenzie's floodplain brings elevation and construction standards, riparian corridor protections limit disturbance near the water, and as a municipal water source, water-quality protections constrain stormwater and septic design. Rebuilding a riverfront home means satisfying the fire review, the floodplain review, and the riparian protections simultaneously — the site plan that threads all three is drawn with the county planners early, not submitted as a surprise. Confirm the county's current programs for fire-affected properties; streamlined and adjusted tracks have applied at various points since 2020.",
      },
      {
        heading: "Coast, Valley Floor, and Cascadia Seismic",
        body: "On the coast, the engineering starts with the hazard maps: tsunami inundation zones affecting siting and evacuation planning, dune areas with stabilization and development restrictions, and Siuslaw floodplains with elevation and flood-resistant construction standards. Septic design on dunes and high-water-table soils needs systems matched to the conditions — sand filters, pressure distribution, or other alternatives the county's on-site program approves. Wells and water systems face saltwater-intrusion awareness near the ocean.\n\nOn the valley floor, farm and forest zoning applies Oregon's resource-land rules — dwellings under the applicable tests, non-resource uses through land use approvals — and the Willamette floodplain brings the county's floodplain administration. Throughout the county, structures are designed for the Cascadia subduction zone: the seismic design category reflects one of the highest hazard settings in the country, and on the coast, the earthquake-tsunami pairing shapes emergency planning for occupied buildings. The county approves what satisfies its code — the design team engineers for the geography of the parcel, valley, mountains, or coast.",
      },
    ],
    faqs: [
      {
        question: "What is required to rebuild in the Holiday Farm Fire area?",
        answer: "Expect wildfire hazard review — defensible space, ignition-resistant construction, fire apparatus access — plus hazard-tree and burned-slope assessment, and confirmation of restored water, power, and road services. The McKenzie's floodplain, riparian, and water-quality protections apply alongside the fire review. Check the county's current programs for fire-affected properties.",
      },
      {
        question: "How do tsunami zones affect building near Florence?",
        answer: "Tsunami inundation mapping informs siting, emergency planning, and design considerations for certain occupancies on the unincorporated coast. Dune areas carry stabilization and development restrictions, and Siuslaw floodplains add elevation and construction standards. Review the hazard maps with the county at due diligence.",
      },
      {
        question: "Can septic systems work on the Oregon coast dunes?",
        answer: "Standard gravity septic often does not suit dune sands and high water tables. The county's on-site wastewater program reviews alternative systems — such as sand filters or pressure distribution — matched to the soils. A site-specific soil evaluation determines what the parcel supports.",
      },
      {
        question: "Does Lane County use the same process as Eugene?",
        answer: "No. Inside Eugene or Springfield, you permit with that city under its process. In the unincorporated county — the valley fringe, the McKenzie corridor, the coast — the county's Land Management Division administers the Lane County code and state land use law, a different review with different overlays and hazard requirements.",
      },
    ],
    extraLinks: [
      { label: "Eugene Willamette River floodplain elevation design", href: "/answers/eugene-willamette-floodplain-elevation-design/" },
      { label: "Wildfire rebuild structural standards", href: "/answers/boulder-wildfire-rebuild-structural-standards/" },
      { label: "County vs. city plan check: which applies?", href: "/answers/county-plan-check-vs-city-plan-check/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "ada-county-id-engineering-permit-guide",
    title: "How Does Engineering Permitting Work in Unincorporated Ada County, ID?",
    description: "Unincorporated Ada County permits through Development Services, with Boise foothills wildfire and alluvial-fan flooding, irrigation district coordination, and ACHD road review.",
    h1: "How Does Engineering Permitting Work in Unincorporated Ada County, ID?",
    answer: "Direct answer: unincorporated Ada County — outside Boise, Meridian, Eagle, Kuna, and Star — permits through Ada County Development Services. The county wraps Idaho's largest metro, so the review blends suburban development standards on the valley floor with foothills hazard planning to the north: wildfire in the Boise foothills, alluvial-fan flooding where canyons meet the valley, expansive and collapsible soils in pockets, and snow loads that climb with elevation. Inside any city, you permit with that city; in the unincorporated county, Development Services is the AHJ — with the Ada County Highway District (ACHD) as a powerful co-reviewer on anything touching a road.\n\nACHD is the institution outsiders underestimate. This single highway district owns and maintains nearly all the roads in the county — city streets included — so driveway approaches, frontage improvements, access management, and traffic impact requirements run through ACHD review on county and city projects alike. For a county project, the building permit and the ACHD review are parallel tracks: the county checks zoning and building code while ACHD checks that the access, drainage in the right-of-way, and any required improvements meet its standards and policies. The civil engineer designs the site's transportation interface to ACHD requirements from the start — approach widths, spacing, sight distance, and stormwater handling at the road.\n\nThe Boise foothills define the hazard review. Wildland-urban interface standards apply in the foothills — defensible space, ignition-resistant construction, and emergency access — and alluvial fans below the foothill canyons carry flood and debris-flow risk that the county addresses through floodplain and hazard review. The foothill soils include expansive clays and collapsible soils in areas, so geotechnical investigation guides foundation design: a slab that works on the valley floor may need rethinking where the soils move. Higher-elevation parcels add snow-load structural design.\n\nIrrigation is the valley-floor institution to respect: the Boise Project and local canal companies deliver irrigation water through a network of canals and laterals, and development near or over these facilities requires coordination — setbacks, crossings, piping agreements, and delivery obligations run with the land. The Boise River floodplain brings elevation and construction standards on corridor parcels. Septic systems serve the rural county through the health district's review. The county's reviewers apply the Ada County code with ACHD, irrigation, and health-district coordination — a design imported from another state will need re-engineering for these Treasure Valley institutions.",
    directAnswer: "Unincorporated Ada County permits through Development Services, with ACHD co-reviewing all road access and frontage, Boise foothills wildfire and alluvial-fan hazard planning, irrigation district coordination on the valley floor, and elevation-based snow loads. City parcels permit with their city, still under ACHD roads.",
    topic: "Idaho Engineering",
    serviceHref: "/services/civil/",
    sections: [
      {
        heading: "ACHD and Irrigation: The Two Co-Reviewers",
        body: "The Ada County Highway District's jurisdiction over the road network makes it a reviewer on virtually every project with access or frontage work: approach permits, access spacing on arterials and collectors, frontage improvement requirements, and traffic impact analysis for larger developments. ACHD's standards and policies are their own document set, separate from the county's development code, and the district's review runs on its own timeline — the building permit does not moot an unapproved approach. Early coordination, ideally at pre-application with both the county and ACHD, keeps the access design from becoming a late-stage redesign.\n\nIrrigation facilities are the second coordination layer on the valley floor. Canals, laterals, and drains cross countless parcels, operated by irrigation districts and canal companies with easements and operating requirements: setbacks from the facilities, engineered crossings where access or utilities pass over them, and preservation of delivery to downstream users. Building over or relocating an irrigation facility without the operator's approval is a non-starter — identify every facility on and adjacent to the parcel at due diligence, get the operator's requirements in writing, and design around them.",
      },
      {
        heading: "Foothills Hazards, Soils, and Snow",
        body: "The Boise foothills concentrate the county's hazard review: wildland-urban interface standards for defensible space, ignition-resistant exteriors, and fire apparatus access; alluvial-fan flood and debris-flow evaluation where canyons discharge onto the valley; and geotechnical investigation of the foothill soils, where expansive and collapsible soils demand foundation designs matched to the ground — pier systems, stiffened slabs, or over-excavation per the geotechnical engineer's recommendations. Grading on the foothill slopes gets review for stability and drainage.\n\nSnow loads are elevation-dependent: valley-floor roofs carry the base design load, while parcels climbing toward the foothill ridges and the higher eastern county design for greater ground snow loads with drift considered at steps and valleys. The structural drawings state the snow-load basis for plan review. On the valley floor, the Boise River floodplain adds elevation and flood-resistant construction standards on corridor parcels, and stormwater design follows county standards protecting the river. Septic review through the health district covers the rural county. Each geography — valley, foothills, river corridor — has its own engineering signature, and the county reviews for the one the parcel actually sits in.",
      },
    ],
    faqs: [
      {
        question: "What is ACHD and why does it review my project?",
        answer: "The Ada County Highway District owns and maintains nearly all public roads in the county, including streets inside the cities. Any project with driveway access, frontage work, or traffic impacts goes through ACHD review for approaches, access management, improvements, and traffic analysis — parallel to the county or city building permit.",
      },
      {
        question: "How do irrigation canals affect development in Ada County?",
        answer: "Irrigation districts and canal companies operate canals, laterals, and drains across the valley floor with easements and operating requirements. Development near them needs the operator's coordination — setbacks, engineered crossings, and preserved deliveries. Identify all facilities at due diligence and get requirements in writing before designing.",
      },
      {
        question: "What are the wildfire requirements in the Boise foothills?",
        answer: "Wildland-urban interface areas call for defensible space, ignition-resistant construction materials and details, and fire apparatus access the fire district approves. Alluvial fans below foothill canyons add flood and debris-flow review. Confirm your parcel's hazard status with the county early.",
      },
      {
        question: "Do snow loads vary across Ada County?",
        answer: "Yes — ground snow loads increase with elevation from the valley floor toward the foothills and the higher eastern county. The structural engineer designs for the site-specific load including drift cases, and the snow-load basis is shown on the drawings for plan review.",
      },
    ],
    extraLinks: [
      { label: "Boise snow load roof design", href: "/answers/boise-snow-load-roof-design/" },
      { label: "County vs. city plan check: which applies?", href: "/answers/county-plan-check-vs-city-plan-check/" },
      { label: "What are expansive soil foundation solutions?", href: "/answers/expansive-soil-foundation-solutions/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "deschutes-county-or-engineering-permit-guide",
    title: "How Does Engineering Permitting Work in Unincorporated Deschutes County, OR?",
    description: "Unincorporated Deschutes County permits through Community Development, with high-desert snow loads, wildland-urban interface fire standards, volcanic soils, and septic-dominated rural development.",
    h1: "How Does Engineering Permitting Work in Unincorporated Deschutes County, OR?",
    answer: "Direct answer: unincorporated Deschutes County — outside Bend, Redmond, Sisters, and La Pine — permits through the county's Community Development Department. High-desert Central Oregon sets the engineering agenda: significant snow loads, especially toward the Cascades; wildland-urban interface fire standards across the forested county; volcanic soils — pumice and ash — with low bearing capacity and lava tubes that complicate foundations; and rural development served overwhelmingly by septic systems and wells. Inside any city, you permit with that city; in the vast unincorporated county, Community Development is the AHJ.\n\nSnow load design is the structural headline. Ground snow loads in Deschutes County are among the highest for populated areas in Oregon, climbing steeply with elevation from the valley floor toward Mount Bachelor, Sisters, and the Cascade foothills — and the county's unincorporated communities sit at elevations where the design snow load dominates the structural design. Roofs are engineered for the site-specific ground snow load with drift accumulation at steps, parapets, and valleys, plus unbalanced and sliding snow cases. The building official checks the snow-load basis on the structural drawings, and the county's adopted maps and any site-specific studies settle disputes. Under-designing snow in Central Oregon is not a correction — it is a collapse risk.\n\nWildfire is the year-round planning reality. The county's wildland-urban interface — essentially the forested two-thirds of the county, including Sunriver, Black Butte Ranch, and the subdivisions between Bend and the Cascades — carries defensible space requirements, ignition-resistant construction standards, and emergency access review coordinated with the fire districts. Recent fire history keeps the review substantive: the county and the districts treat the WUI standards as life-safety provisions, not landscaping suggestions.\n\nVolcanic soils add the geotechnical twist: pumice and ash deposits with low bearing capacity, highly variable depth to competent material, and lava tubes and caves that can undermine foundations — the geotechnical investigation must address bearing, settlement, and voids, and foundation designs follow its recommendations rather than prescriptive defaults. Septic systems dominate rural development, reviewed through the county's on-site program with soil evaluations that the volcanic soils complicate. The Deschutes River and its tributaries bring floodplain and riparian review on corridor parcels. The county's reviewers apply the Deschutes County code across all of it — a Willamette Valley project set, with its light snow loads and sedimentary soils, does not transfer.",
    directAnswer: "Unincorporated Deschutes County permits through Community Development, with elevation-driven snow loads among Oregon's highest, wildland-urban interface fire standards, volcanic-soil geotechnical review for bearing and lava tubes, and septic-based rural development. City parcels permit with their city.",
    topic: "Oregon Engineering",
    serviceHref: "/services/structural/",
    sections: [
      {
        heading: "Snow Country Structural Design",
        body: "In Deschutes County, the ground snow load is not a footnote — it is the governing load case for most roofs. The design value rises with elevation and exposure, and the structural engineer works from the county's adopted snow-load maps and any site-specific data, designing for balanced, unbalanced, drift, and sliding snow. Drift at parapets, rooftop units, and valley intersections concentrates loads far above the uniform value; sliding snow from upper roofs pounds lower ones. The structural drawings must state the ground snow load, exposure, and thermal factors used, because the plan reviewer verifies the basis, not just the member sizes.\n\nConstruction-phase snow matters too: a framed roof before sheathing, or a partially loaded structure in a November storm, sees conditions the final design never intended. The contractor's means and methods should account for snow during erection, and the engineer of record's field observation program watches the critical stages. For owners, the honest message is that Central Oregon roofs cost more than valley roofs — the lumber, the connections, and the engineering all scale with the snow, and value-engineering the structure is the wrong place to save.",
      },
      {
        heading: "Fire, Lava Rock, and Septic: The Site Realities",
        body: "The wildland-urban interface review shapes the site plan and the exterior design: defensible space zones with vegetation management, ignition-resistant roofing, siding, decking, and venting, and driveways and turnarounds built for fire apparatus access that the fire district signs off on. In the forested subdivisions, the fire district is effectively a co-reviewer — its access and water-supply requirements can move a driveway, widen a turnaround, or require a water storage tank. Design for the district's standards from the first site sketch.\n\nBelow grade, the volcanic geology rules: pumice and ash soils with low bearing capacity mean the geotechnical engineer sets the foundation system — wider footings, deeper bearing, or engineered fill per the report — and investigates for lava tubes, caves, and voids that could compromise bearing. Standard prescriptive footings from the valley do not apply where the soils report says otherwise. Septic design through the county's on-site program must suit the volcanic soils and the high-desert water table, with system types matched to the site evaluation. The Deschutes River corridor adds floodplain and riparian protections. Every one of these reviews can reshape the project — the due-diligence package for a Deschutes County parcel includes the snow-load elevation, the WUI status, the geotechnical findings, and the septic feasibility before the design begins.",
      },
    ],
    faqs: [
      {
        question: "How are snow loads determined in Deschutes County?",
        answer: "By site elevation and location per the county's adopted snow-load maps — loads climb steeply toward the Cascades and are among the highest for populated Oregon. The structural engineer designs for the site-specific ground snow load including drift, unbalanced, and sliding cases, and the basis is shown on the drawings for plan review.",
      },
      {
        question: "What are the wildfire building requirements in Deschutes County?",
        answer: "Wildland-urban interface areas require defensible space, ignition-resistant exterior materials and venting, and fire apparatus access with district-approved turnarounds. The fire districts co-review access and water supply — design to their standards from the start.",
      },
      {
        question: "Do lava tubes really affect foundations in Deschutes County?",
        answer: "Yes — the county's volcanic geology includes lava tubes, caves, and voids, along with low-bearing pumice and ash soils. The geotechnical investigation addresses bearing capacity, settlement, and subsurface voids, and the foundation design follows the report's recommendations rather than prescriptive defaults.",
      },
      {
        question: "How does septic work in rural Deschutes County?",
        answer: "Most unincorporated parcels use on-site septic reviewed through the county's on-site wastewater program, with soil evaluations determining the suitable system type for the volcanic soils. Septic feasibility — soils, setbacks, reserve area — belongs in due diligence, not after the site plan is final.",
      },
    ],
    extraLinks: [
      { label: "How is snow load calculated for roof design?", href: "/answers/asce-7-snow-load-design/" },
      { label: "Wildfire rebuild structural standards", href: "/answers/boulder-wildfire-rebuild-structural-standards/" },
      { label: "What is a geotechnical report?", href: "/answers/geotechnical-report-explained/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
];
