import type {
  Batch2CoreServicePage,
  Batch2CoreServiceSlug,
  Batch2StateExpansion,
} from "./batch2-core-service-types";

type IndianaMetro = {
  slug: string;
  name: string;
  county: string;
  ahj: string;
  conditions: string;
  utilities: string;
  review: string;
  projects: string;
  distinct: string;
  sources: Array<{ label: string; url: string }>;
};

type Guidance = {
  label: string;
  focus: string;
  sectionA: string;
  sectionB: string;
  sectionC: string;
  stepA: string;
  stepB: string;
  stepC: string;
  faqA: string;
  faqB: string;
  faqC: string;
};

const serviceSlugs: Batch2CoreServiceSlug[] = [
  "structural-engineering",
  "mep-engineering",
  "civil-engineering",
  "energy-compliance",
  "pe-stamped-drawings",
];

const guidance: Record<Batch2CoreServiceSlug, Guidance> = {
  "structural-engineering": {
    label: "Structural Engineering",
    focus: "gravity, lateral, foundation, and existing-building decisions",
    sectionA:
      "Indiana renovations often encounter masonry bearing walls, aging industrial steel, wood framing, and undocumented alterations. A new opening, rooftop unit, porch, or residential addition should be traced from diaphragm and connection through footing, with observed conditions clearly separated from assumed framing.",
    sectionB:
      "Glacial till, compressible alluvium, expansive clay, high groundwater, freeze-thaw, straight-line wind, tornado exposure, and moderate seismic criteria can all affect the structural solution. Foundation drainage, frost protection, flood elevation, retaining surcharge, and construction sequencing should be coordinated with geotechnical advice.",
    sectionC:
      "Plan-check responses should identify the Indiana code section or local comment, revised sheet and calculation, and any inspection hold point. ADU and residential-addition work belongs in the same workflow because concentrated loads, egress changes, and new openings can affect the original house.",
    stepA: "Confirm the Indiana Department of Homeland Security code edition adopted by the AHJ, occupancy, risk category, wind and seismic criteria, flood status, and whether an ADU or addition triggers existing-building provisions.",
    stepB: "Record framing, foundations, soil and groundwater information, frost protection, tornado or wind-resistance details, and construction sequencing with the architect, surveyor, and geotechnical consultant.",
    stepC: "Coordinate the sealed structural plans, calculations, special inspections, shoring, and deferred designs before submitting the local building package.",
    faqA: "When does an Indiana addition justify structural investigation?",
    faqB: "How are Indiana wind, snow, and seismic criteria selected?",
    faqC: "What should an Indiana structural correction response contain?",
  },
  "mep-engineering": {
    label: "MEP Engineering",
    focus: "mechanical, electrical, plumbing, ventilation, and utility coordination",
    sectionA:
      "Indiana MEP design needs the actual occupancy, utility territory, service size, equipment schedule, and existing conditions. Electric demand, gas pressure, water and sewer capacity, backflow, grease waste, fire service, and emergency power are address-specific interfaces that should be documented before the permit set is finalized.",
    sectionB:
      "Hot humid summers, cold winters, freeze risk, severe thunderstorms, tornado sheltering, and river-valley flooding affect ventilation, humidity control, heating, cooling, outdoor-air intakes, emergency power, and equipment placement. Healthcare, restaurant, industrial, and multifamily uses need different exhaust, controls, and life-safety coordination.",
    sectionC:
      "Track building, fire, health, utility, and energy corrections in one matrix and update risers, load calculations, schedules, and control sequences together. For an ADU or residential addition, check panel capacity, heat-pump or gas service, domestic-water and sewer loading, ventilation, and the existing home’s service rather than assuming a separate system.",
    stepA: "Verify occupancy, AHJ, utility providers, available electric and gas service, water pressure, sewer point, fire-protection threshold, and applicable Indiana mechanical, plumbing, electrical, fire, and energy requirements.",
    stepB: "Coordinate equipment clearances, ventilation, combustion or heat-pump details, panel schedules, fixture demand, sanitary loads, accessible maintenance, emergency power, and moisture control.",
    stepC: "Obtain utility and fire responses, reconcile them with the MEP sheets, submit the coordinated package, and preserve final schedules, substitutions, and commissioning assumptions.",
    faqA: "Which Indiana utility facts affect MEP permit drawings?",
    faqB: "How do Indiana humidity and severe-weather risks affect MEP design?",
    faqC: "How should MEP plan-check revisions be recorded?",
  },
  "civil-engineering": {
    label: "Civil Engineering",
    focus: "grading, drainage, utilities, access, erosion, and site permitting",
    sectionA:
      "Indiana civil documents connect the survey, building pad, accessible route, fire access, utility profiles, drainage network, and public frontage. A building permit does not necessarily approve stormwater, erosion control, floodplain, right-of-way, sanitary, or utility work, so the local and county review map should be established early.",
    sectionB:
      "Heavy rain, flashy tributaries, glacial soils, high groundwater, karst in parts of southern Indiana, freeze-thaw, and river floodplains can control detention, infiltration, outfalls, and finished floors. IDEM construction-stormwater coverage and local drainage ordinances should be screened by disturbance and receiving-water conditions.",
    sectionC:
      "A correction response should show revised contours, pipe profiles, water-quality or detention calculations, access grades, and maintenance responsibility. An ADU, detached garage, or residential addition may still change roof runoff, sewer loading, fire access, impervious area, and floodplain compliance.",
    stepA: "Identify the city or county development route, watershed, floodplain, disturbance threshold, frontage, utility providers, soil or karst concerns, and right-of-way obligations.",
    stepB: "Prepare survey-based grading, drainage, utility, fire-access, erosion, and finished-floor plans with infiltration, detention, and downstream assumptions identified.",
    stepC: "Route the package through planning, engineering, stormwater, IDEM or local erosion, fire, and utility reviews, then record accepted revisions and as-built information.",
    faqA: "Which Indiana agencies may review a civil site package?",
    faqB: "Why can an Indiana infill lot need detention or flood analysis?",
    faqC: "How is an Indiana ADU included in site and utility review?",
  },
  "energy-compliance": {
    label: "Energy Compliance",
    focus: "envelope, HVAC, lighting, service water, and code documentation",
    sectionA:
      "Indiana energy documentation should identify the current state-adopted energy-code edition, local submittal requirements, occupancy, and alteration or addition category before choosing a compliance route. The report must agree with envelope assemblies, windows, lighting controls, HVAC schedules, and service-water details in the permit drawings.",
    sectionB:
      "Indiana’s humid summers, cold heating season, cloud cover, wind-driven rain, and freeze-thaw make air sealing, moisture-safe assemblies, equipment controls, ventilation, and heat recovery project-specific decisions. Flood-prone sites may also need equipment elevation and service continuity considered apart from energy modeling.",
    sectionC:
      "Use one versioned model, form set, and comment matrix so plan-check corrections are traceable to the architectural and MEP revision. An ADU or residential addition should be screened for the applicable alteration trigger and connected HVAC or service effects, not treated as automatically exempt.",
    stepA: "Identify the AHJ, state-adopted Indiana energy-code edition, climate inputs, occupancy, alteration category, and prescriptive or performance compliance route.",
    stepB: "Collect verified assemblies, fenestration, lighting, HVAC, controls, service-water, and utility inputs from the project team and reconcile them with the architectural and MEP drawings.",
    stepC: "Submit the energy forms or report, answer comments by input and sheet, and retain final equipment, controls, and functional-testing assumptions for closeout.",
    faqA: "Which Indiana energy-code route applies to a project?",
    faqB: "What Indiana climate factors belong in an energy analysis?",
    faqC: "Does an Indiana addition automatically avoid energy documentation?",
  },
  "pe-stamped-drawings": {
    label: "PE-Stamped Drawings",
    focus: "responsible-charge documentation, sealed calculations, and permit coordination",
    sectionA:
      "An Indiana PE seal represents responsibility for a defined engineering scope and does not replace architectural, survey, geotechnical, utility, fire, or contractor information. The record should identify the parcel, discipline, observed conditions, design criteria, Indiana code context, and boundaries with other professionals.",
    sectionB:
      "Floodplain, high groundwater, expansive or karst soils, wind and tornado exposure, freeze-thaw, river conditions, and industrial existing construction may require investigation before a PE accepts responsibility. A seal is not a promise of permit approval or evidence that every concealed condition has been verified.",
    sectionC:
      "For plan check, issue a dated comment matrix with clouded revisions and an updated calculation index, then have the responsible PE evaluate substitutions, RFIs, and field conditions. The same record supports an ADU or residential addition where foundations, utilities, drainage, service, or load paths change.",
    stepA: "Map the parcel to the responsible AHJ and list Indiana code editions, discipline boundaries, site investigations, utility letters, flood checks, and special inspections.",
    stepB: "Assemble verified existing conditions, calculations, design criteria, drawings, notes, and exclusions so the Indiana PE can exercise independent professional judgment.",
    stepC: "Submit signed and sealed discipline documents through the stated AHJ channel, then document every correction, substitution, RFI, observation, and final field change.",
    faqA: "What does an Indiana PE review before sealing drawings?",
    faqB: "Does an Indiana PE seal guarantee permit approval?",
    faqC: "How should a sealed Indiana revision be issued after plan check?",
  },
};

function buildService(local: IndianaMetro, serviceSlug: Batch2CoreServiceSlug): Batch2CoreServicePage {
  const g = guidance[serviceSlug];
  return {
    serviceSlug,
    title: `${local.name} ${g.label} for Indiana Permitted Projects`,
    description: `${g.label} for ${local.name} projects, coordinated with ${local.ahj}, Indiana code requirements, local utilities, and ${local.conditions}.`,
    h1: `${g.label} for ${local.name} Projects`,
    kicker: `${local.name} ${g.label.toLowerCase()} and plan review`,
    lede: `${local.name} work needs ${g.focus} grounded in ${local.conditions}. This page connects ${local.ahj} intake, official local interfaces, correction workflow, and practical project types without promising an approval outcome.`,
    permitAuthority: `${local.ahj} is the principal local authority for the described jurisdiction; county, fire, floodplain, public-works, health, environmental, and utility reviews may be separate. The responsible Indiana professional confirms the permit and seal scope.`,
    codeContext: `Indiana’s state-adopted building, residential, fire, mechanical, plumbing, electrical, and energy provisions are administered through the applicable local and state review path. Confirm the current edition, amendments, transition rules, and local checklist with ${local.ahj}; ${local.review}.`,
    localConditions: `${local.conditions} ${local.utilities}`,
    projectTypes: `${local.projects} The same coordinated process can cover an ADU, detached accessory structure, or residential addition when its structure, energy, utilities, drainage, access, or occupancy affects the property.`,
    sections: [
      { heading: `${local.name}: ${g.label} scope and existing conditions`, body: `${local.distinct} ${g.sectionA}` },
      { heading: `${local.name} climate, soils, and agency interfaces`, body: `${local.utilities} ${g.sectionB}` },
      { heading: `Plan-check corrections for ${local.name} projects`, body: `${local.review} ${g.sectionC}` },
    ],
    permitSteps: [
      `Confirm the route with ${local.ahj}: ${g.stepA}`,
      `Verify local site and utility facts before submittal: ${g.stepB}`,
      `Submit the coordinated package and preserve agency records: ${g.stepC}`,
      `Return ${local.name} corrections in a dated matrix, cloud revised sheets, and carry every changed calculation, schedule, utility response, and field assumption into the permit revision.`,
    ],
    faqs: [
      { question: `${local.name}: ${g.faqA}`, answer: `${g.focus[0].toUpperCase() + g.focus.slice(1)} must follow the actual parcel, observed conditions, project scope, and ${local.ahj} checklist. ${local.review}` },
      { question: `${local.name}: ${g.faqB}`, answer: `The design team selects criteria from the adopted Indiana requirements, official site data, and professional judgment; ${local.conditions} can change the assumptions. A plan review or seal is not a guarantee of approval or construction performance.` },
      { question: `${local.name}: ${g.faqC}`, answer: `Cite the reviewer’s issue, revised sheet or calculation, and any open field or agency dependency. For an ADU or residential addition, keep the response tied to the existing building, utility, drainage, and occupancy interfaces.` },
    ],
    sources: local.sources,
  };
}

const metros: IndianaMetro[] = [
  {
    slug: "indianapolis",
    name: "Indianapolis",
    county: "Marion County",
    ahj: "City of Indianapolis and Marion County Department of Metropolitan Development",
    conditions: "White River and Fall Creek floodplains, glacial and alluvial soils, high groundwater in low areas, humid summers, freeze-thaw, severe storms, and urban combined or separated drainage interfaces",
    utilities: "Citizens Energy Group, AES Indiana, Indianapolis DPW, and the Indianapolis Office of Sustainability or stormwater programs can affect utility and site design.",
    review: "Indianapolis and Marion County use a consolidated development-services path for many permits, but zoning, floodplain, DPW, fire, health, and utility requirements remain scope-specific.",
    distinct: "Indianapolis projects range from historic urban neighborhoods and alley-loaded additions to former industrial parcels where environmental history, flood elevation, and utility capacity matter.",
    projects: "urban infill, historic-home additions, downtown tenant improvements, ADUs, warehouse conversions, and neighborhood commercial renovations",
    sources: [
      { label: "Indianapolis permit applications", url: "https://www.indy.gov/activity/apply-for-a-permit" },
      { label: "Indianapolis plan review", url: "https://www.indy.gov/activity/plan-review" },
      { label: "Indianapolis Department of Public Works", url: "https://www.indy.gov/activity/department-of-public-works" },
      { label: "Indiana DHS code enforcement", url: "https://www.in.gov/dhs/fire-and-building-safety/code-enforcement/" },
      { label: "Citizens Energy Group", url: "https://www.citizensenergygroup.com/" },
    ],
  },
  {
    slug: "fort-wayne",
    name: "Fort Wayne",
    county: "Allen County",
    ahj: "City of Fort Wayne Community Development and Neighborhood Code",
    conditions: "three-river floodplain and drainage basins, glacial till, high groundwater, humid continental seasons, freeze-thaw, severe thunderstorms, and flat-site ponding",
    utilities: "Fort Wayne City Utilities, Indiana Michigan Power, NIPSCO gas service areas, Allen County drainage, and the city’s right-of-way group may review separate interfaces.",
    review: "Fort Wayne’s building, zoning, engineering, floodplain, and stormwater requirements should be checked with the city; Allen County governs sites outside municipal limits.",
    distinct: "Fort Wayne’s convergence of the St. Joseph, St. Marys, and Maumee rivers makes finished floors, outfalls, detention, and emergency access unusually important even on apparently level parcels.",
    projects: "river-basin infill, industrial expansions, neighborhood additions, ADUs, medical offices, and retail redevelopment",
    sources: [
      { label: "Fort Wayne Community Development", url: "https://www.cityoffortwayne.org/community-development.html" },
      { label: "Fort Wayne building permits", url: "https://www.cityoffortwayne.org/building-services.html" },
      { label: "Fort Wayne City Utilities", url: "https://www.cityoffortwayne.org/publicworks/utilities.html" },
      { label: "Fort Wayne engineering", url: "https://www.cityoffortwayne.org/publicworks/engineering.html" },
      { label: "Indiana DHS code enforcement", url: "https://www.in.gov/dhs/fire-and-building-safety/code-enforcement/" },
    ],
  },
  {
    slug: "evansville",
    name: "Evansville",
    county: "Vanderburgh County",
    ahj: "City of Evansville Department of Metropolitan Development",
    conditions: "Ohio River floodplain, loess and alluvial soils, karst-sensitive areas, hot humid summers, freeze-thaw, severe storms, and high groundwater near low terraces",
    utilities: "Evansville Water and Sewer Utility, CenterPoint Energy, CenterPoint or local electric service, and Vanderburgh County drainage or highway authorities can affect design.",
    review: "Evansville’s development, floodplain, zoning, building, and public-works requirements differ from Vanderburgh County’s unincorporated process; confirm the parcel and current checklists.",
    distinct: "Evansville work often balances river flood elevations with older masonry neighborhoods, industrial reuse, karst-sensitive ground, and constrained utility corridors.",
    projects: "riverfront redevelopment, industrial conversions, historic additions, ADUs, restaurant fit-outs, and small warehouse improvements",
    sources: [
      { label: "Evansville city departments", url: "https://evansville.in.gov/city/departments/" },
      { label: "Evansville building and development offices", url: "https://evansville.in.gov/city/departments/" },
      { label: "Evansville Water and Sewer Utility", url: "https://evansville.in.gov/city/departments/" },
      { label: "Evansville engineering", url: "https://evansville.in.gov/city/departments/" },
      { label: "Indiana DHS code enforcement", url: "https://www.in.gov/dhs/fire-and-building-safety/code-enforcement/" },
    ],
  },
  {
    slug: "south-bend",
    name: "South Bend",
    county: "St. Joseph County",
    ahj: "City of South Bend Department of Community Investment and Building Department",
    conditions: "St. Joseph River floodplain, glacial soils, lake-effect snow, high groundwater, freeze-thaw, severe storms, and older combined-sewer or drainage infrastructure",
    utilities: "South Bend Venues Parks and Arts interfaces aside, site work typically coordinates with the city’s public works, wastewater, water, and engineering functions, along with Indiana Michigan Power or NIPSCO.",
    review: "South Bend’s building, zoning, floodplain, sewer, and neighborhood review paths are address-specific; St. Joseph County and Mishawaka have separate authorities.",
    distinct: "South Bend’s older neighborhoods and former industrial corridors can combine river setbacks, buried infrastructure, lake-effect snow, redevelopment incentives, and masonry or brownfield investigation.",
    projects: "Notre Dame-area improvements, river-corridor infill, historic-home additions, ADUs, industrial reuse, and mixed-use tenant work",
    sources: [
      { label: "South Bend Building Department", url: "https://southbendin.gov/department/community-investment/" },
      { label: "South Bend Community Investment", url: "https://southbendin.gov/department/community-investment/" },
      { label: "South Bend Engineering", url: "https://southbendin.gov/department/public-works/engineering/" },
      { label: "South Bend Public Works", url: "https://southbendin.gov/department/public-works/engineering/" },
      { label: "Indiana DHS code enforcement", url: "https://www.in.gov/dhs/fire-and-building-safety/code-enforcement/" },
    ],
  },
  {
    slug: "bloomington",
    name: "Bloomington",
    county: "Monroe County",
    ahj: "City of Bloomington Planning and Transportation Department",
    conditions: "karst and limestone terrain, wooded rolling grades, clay and residual soils, intense rain, freeze-thaw, severe storms, and watershed or sinkhole sensitivity",
    utilities: "City of Bloomington Utilities, Duke Energy, Monroe County drainage and highway authorities, and the city’s stormwater and transportation reviews can affect the site.",
    review: "Bloomington’s planning, building, engineering, stormwater, and environmental processes should be confirmed for the parcel; Monroe County governs outside city limits.",
    distinct: "Bloomington’s hills and limestone geology make grading, retaining, infiltration, sinkhole screening, tree protection, and accessible routes central to even modest residential or campus-adjacent work.",
    projects: "campus-area additions, hillside homes, ADUs, historic renovations, small multifamily buildings, and neighborhood commercial fit-outs",
    sources: [
      { label: "Bloomington Planning and Transportation", url: "https://bloomington.in.gov/planning" },
      { label: "Bloomington building permits", url: "https://bloomington.in.gov/planning" },
      { label: "Bloomington Engineering", url: "https://bloomington.in.gov/engineering" },
      { label: "Bloomington Utilities", url: "https://bloomington.in.gov/utilities" },
      { label: "Indiana DHS code enforcement", url: "https://www.in.gov/dhs/fire-and-building-safety/code-enforcement/" },
    ],
  },
];

const indianaBatch3: Batch2StateExpansion = {
  stateSlug: "indiana",
  stateName: "Indiana",
  stateAbbrev: "IN",
  hub: {
    title: "Indiana Engineering Services for Local Permit Review",
    description: "Indiana structural, MEP, civil, energy-compliance, and PE-stamped drawing support coordinated with state code resources, local AHJs, utilities, floodplain conditions, and site-specific professional judgment.",
    h1: "Engineering for Indiana’s River, Glacial, and Urban Sites",
    kicker: "Indiana permit and design coordination",
    lede: "Indiana’s statewide building-safety framework does not eliminate local differences in zoning, stormwater, floodplain, utilities, fire review, right-of-way, and plan-check intake. Engineering should begin with the exact city or county AHJ, current code and amendment information, verified site conditions, and a clearly bounded professional scope.",
    sections: [
      { heading: "State code, local review", body: "The Indiana Department of Homeland Security publishes building-safety and code-enforcement information, while local departments administer many permit and development steps. Indianapolis, Fort Wayne, Evansville, South Bend, Bloomington, and their counties have different portals, ordinances, floodplain processes, utility owners, and correction practices; the parcel controls." },
      { heading: "Water, soil, and weather are project inputs", body: "River floodplains, glacial till, alluvium, clay, karst, high groundwater, lake-effect snow, humid summers, freeze-thaw, tornadoes, and severe thunderstorms can affect structural, civil, MEP, and energy design. Survey, geotechnical, environmental, flood, utility, and existing-condition information should be current for the site." },
      { heading: "Keep corrections connected to the project", body: "Use a discipline responsibility matrix, current code record, utility and agency log, and numbered response to plan-check comments. ADUs and residential additions should be handled within that same structural, energy, civil, MEP, and occupancy workflow when they change existing conditions; they should not be thin standalone doorway pages." },
      { heading: "IDEM stormwater and utility connections are distinct handoffs", body: "Indiana Department of Environmental Management construction-stormwater coverage, a city or county MS4 review, and a sanitary or water connection approval are not replaced by a building permit. Before civil sheets are finalized, confirm disturbance limits, receiving waters, outfall ownership, erosion controls, sewer availability, water-meter requirements, and utility easements. Preserve those written agency and utility responses with the grading, drainage, plumbing, and site-access package." },
    ],
    faqs: [
      { question: "Does Indiana have one permit office for every building project?", answer: "No. State building-safety information comes from Indiana DHS, but a city or county generally administers local building and development review. Fire, floodplain, stormwater, health, right-of-way, and utility authorities can add separate requirements." },
      { question: "What Indiana site information belongs in an engineering kickoff?", answer: "Confirm jurisdiction and current code edition, survey, soils and groundwater, floodplain, drainage, wind and seismic criteria, severe-weather considerations, utility capacity, environmental history, and occupancy or alteration scope. The responsible professional determines needed investigations." },
      { question: "How should Indiana plan-check comments be answered?", answer: "Use a dated matrix naming the reviewer comment, response, revised sheet or calculation, and any unresolved field or agency item. Approval is not guaranteed, and changed conditions or reviewer direction may require another professional revision." },
    ],
    sources: [
      { label: "Indiana DHS building and fire safety code enforcement", url: "https://www.in.gov/dhs/fire-and-building-safety/code-enforcement/" },
      { label: "Indiana Professional Licensing Agency engineers", url: "https://www.in.gov/pla/professions/engineering-home" },
      { label: "Indiana Department of Environmental Management stormwater", url: "https://www.in.gov/idem/stormwater/" },
      { label: "Indiana floodplain information", url: "https://www.in.gov/dnr/water/" },
    ],
  },
  metros: [],
};

indianaBatch3.metros = metros.map((local) => ({
  slug: local.slug,
  name: local.name,
  county: local.county,
  services: serviceSlugs.map((serviceSlug) => buildService(local, serviceSlug)),
}));

export { indianaBatch3 };
export default indianaBatch3;