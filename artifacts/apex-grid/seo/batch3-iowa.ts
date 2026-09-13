import type {
  Batch2CoreServicePage,
  Batch2CoreServiceSlug,
  Batch2StateExpansion,
} from "./batch2-core-service-types";

type IowaMetro = {
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
      "Iowa renovations commonly encounter older masonry, farm or industrial structures, wood framing, and undocumented alterations. A new opening, rooftop unit, porch, basement, or residential addition should be traced from diaphragm and connections through foundations, with field observations separated from assumptions.",
    sectionB:
      "Loess, glacial till, alluvium, expansive clay, frost, high groundwater, river flooding, straight-line wind, and tornado exposure can all affect the structural solution. Foundation drainage, frost depth, retaining surcharge, flood elevation, and construction sequencing should be coordinated with geotechnical advice.",
    sectionC:
      "For plan check, identify the reviewer’s issue, applicable Iowa or local provision, revised sheet or calculation, and inspection hold point. ADUs and residential additions use the same record because concentrated loads, egress changes, and new openings can affect the existing house even when the footprint is small.",
    stepA: "Confirm the city or county AHJ, applicable Iowa or locally adopted code edition and amendments, occupancy, risk category, wind and snow criteria, flood status, and whether an ADU or addition changes the existing-building scope.",
    stepB: "Document framing, foundations, soil and groundwater, frost protection, wind or tornado-resistant details, flood elevation, and construction sequencing with the architect, surveyor, and geotechnical consultant.",
    stepC: "Coordinate sealed structural plans, calculations, special inspections, shoring, and deferred designs before submitting the complete local building package.",
    faqA: "When does an Iowa addition need structural investigation?",
    faqB: "How are Iowa wind, snow, and flood conditions reflected in design?",
    faqC: "What belongs in an Iowa structural plan-check response?",
  },
  "mep-engineering": {
    label: "MEP Engineering",
    focus: "mechanical, electrical, plumbing, ventilation, and utility coordination",
    sectionA:
      "Iowa MEP design starts with the actual occupancy, service territory, existing equipment, utility capacity, and operating schedule. Electric demand, gas pressure, water and sewer capacity, backflow, grease waste, fire service, and emergency power should be confirmed with the responsible utility and AHJ.",
    sectionB:
      "Humid summers, cold winters, freeze risk, severe thunderstorms, tornado sheltering, river-valley flooding, and agricultural dust can affect heating, cooling, filtration, ventilation, equipment placement, and controls. Restaurants, schools, healthcare, industrial, and multifamily uses each need different life-safety and exhaust coordination.",
    sectionC:
      "Track building, fire, health, utility, and energy comments in one revision log and update risers, load calculations, schedules, and controls together. An ADU or residential addition should be checked for panel capacity, heat-pump or gas service, domestic-water and sewer loading, ventilation, and the existing home’s service.",
    stepA: "Verify occupancy, AHJ, utility providers, available electric and gas service, water pressure, sewer point, fire-protection threshold, and applicable Iowa mechanical, plumbing, electrical, fire, and energy provisions.",
    stepB: "Coordinate equipment clearances, ventilation, combustion or heat-pump details, panel schedules, fixture demand, sanitary loads, accessible maintenance, emergency power, and moisture control.",
    stepC: "Obtain utility and fire responses, reconcile them with MEP sheets, submit the coordinated package, and preserve final schedules, substitutions, and commissioning assumptions.",
    faqA: "Which Iowa utility facts affect MEP permit drawings?",
    faqB: "How do Iowa humidity, cold, and severe weather affect MEP design?",
    faqC: "How should Iowa MEP plan-check revisions be recorded?",
  },
  "civil-engineering": {
    label: "Civil Engineering",
    focus: "grading, drainage, utilities, access, erosion, and site permitting",
    sectionA:
      "An Iowa civil set should tie the survey, building pad, accessible route, fire access, utility profiles, drainage network, and public frontage together. Building approval does not necessarily approve stormwater, erosion, floodplain, right-of-way, sanitary, or utility work, so the city, county, and state review map should be established early.",
    sectionB:
      "Heavy rain, snowmelt, loess and glacial soils, high groundwater, flashy tributaries, river floodplains, and freeze-thaw can control detention, infiltration, outfalls, and finished floors. Iowa DNR construction-stormwater coverage and local drainage criteria should be screened by disturbance and receiving-water conditions.",
    sectionC:
      "Correction responses should show revised contours, pipe profiles, drainage calculations, access grades, flood elevations, or maintenance notes. An ADU, detached garage, or residential addition can change roof runoff, sewer loading, fire access, impervious area, and floodplain compliance even without a subdivision.",
    stepA: "Identify the city or county development route, watershed, floodplain, disturbance threshold, frontage, utility providers, soil or groundwater concerns, and right-of-way obligations.",
    stepB: "Prepare survey-based grading, drainage, utility, fire-access, erosion, finished-floor, and snow-storage plans with infiltration, detention, and downstream assumptions identified.",
    stepC: "Route the package through planning, engineering, stormwater, Iowa DNR or local erosion, fire, and utility reviews, then record accepted revisions and as-built information.",
    faqA: "Which Iowa agencies may review a civil site package?",
    faqB: "Why can an Iowa infill lot need flood or detention analysis?",
    faqC: "How is an Iowa ADU included in site and utility review?",
  },
  "energy-compliance": {
    label: "Energy Compliance",
    focus: "envelope, HVAC, lighting, service water, and code documentation",
    sectionA:
      "Iowa energy documentation should identify the current state or local code adoption, submittal route, occupancy, and alteration or addition category before selecting a compliance method. The report must agree with envelope assemblies, windows, lighting controls, HVAC schedules, and service-water details on the permit drawings.",
    sectionB:
      "Cold winters, humid summers, cloud cover, wind-driven rain, snow, and freeze-thaw make air sealing, moisture-safe assemblies, equipment controls, ventilation, and heat recovery project-specific. Flood-prone or rural sites may also require equipment elevation, backup power, and service continuity to be considered outside the energy model.",
    sectionC:
      "Use one versioned model, form set, and comment matrix so plan-check corrections remain tied to the architectural and MEP revisions. An ADU or residential addition should be screened for the applicable alteration trigger and connected HVAC or service effects rather than treated as automatically exempt.",
    stepA: "Identify the AHJ, current Iowa or local energy-code edition, climate inputs, occupancy, alteration category, and prescriptive or performance compliance route.",
    stepB: "Collect verified assemblies, fenestration, lighting, HVAC, controls, service-water, and utility inputs from the coordinated team and reconcile them with the permit drawings.",
    stepC: "Submit the energy forms or report, answer comments by input and sheet, and retain final equipment, controls, and functional-testing assumptions for closeout.",
    faqA: "Which Iowa energy-code route applies to a project?",
    faqB: "What Iowa climate factors belong in an energy analysis?",
    faqC: "Does an Iowa addition automatically avoid energy documentation?",
  },
  "pe-stamped-drawings": {
    label: "PE-Stamped Drawings",
    focus: "responsible-charge documentation, sealed calculations, and permit coordination",
    sectionA:
      "An Iowa PE seal represents responsibility for a defined engineering scope and does not replace architectural, survey, geotechnical, utility, fire, or contractor information. The record should identify the parcel, discipline, observed conditions, design criteria, applicable Iowa and local requirements, and boundaries with other professionals.",
    sectionB:
      "Floodplain, high groundwater, loess or expansive clay, wind and tornado exposure, snow, freeze-thaw, and older industrial construction may require investigation before a PE accepts responsibility. A seal is not a promise of permit approval or proof that every concealed condition is known.",
    sectionC:
      "For plan check, issue a dated comment matrix with clouded revisions and an updated calculation index, then have the responsible PE evaluate substitutions, RFIs, and field conditions. The same record supports an ADU or residential addition where foundations, utilities, drainage, service, or load paths change.",
    stepA: "Map the parcel to the responsible AHJ and list code editions, discipline boundaries, site investigations, utility letters, flood checks, and special inspections.",
    stepB: "Assemble verified existing conditions, calculations, design criteria, drawings, notes, and exclusions so the Iowa PE can exercise independent professional judgment.",
    stepC: "Submit signed and sealed discipline documents through the AHJ’s stated channel, then document every correction, substitution, RFI, observation, and final field change.",
    faqA: "What does an Iowa PE review before sealing drawings?",
    faqB: "Does an Iowa PE seal guarantee permit approval?",
    faqC: "How should a sealed Iowa revision be issued after plan check?",
  },
};

function buildService(local: IowaMetro, serviceSlug: Batch2CoreServiceSlug): Batch2CoreServicePage {
  const g = guidance[serviceSlug];
  return {
    serviceSlug,
    title: `${local.name} ${g.label} for Iowa Permitted Projects`,
    description: `${g.label} for ${local.name} projects, coordinated with ${local.ahj}, Iowa code requirements, local utilities, and ${local.conditions}.`,
    h1: `${g.label} for ${local.name} Projects`,
    kicker: `${local.name} ${g.label.toLowerCase()} and plan review`,
    lede: `${local.name} work needs ${g.focus} grounded in ${local.conditions}. This service path connects ${local.ahj} intake, local agency interfaces, correction workflow, and practical project types without promising an approval outcome.`,
    permitAuthority: `${local.ahj} is the principal local authority for the described jurisdiction; county, fire, floodplain, public-works, health, environmental, and utility reviews may be separate. The responsible Iowa professional confirms the permit and seal scope.`,
    codeContext: `Iowa and local jurisdictions publish current building, residential, energy, fire, mechanical, plumbing, electrical, stormwater, and land-use requirements through their applicable review paths. Confirm the edition, amendments, transition rules, and checklist with ${local.ahj}; ${local.review}.`,
    localConditions: `${local.conditions} ${local.utilities}`,
    projectTypes: `${local.projects} The same coordinated process can cover an ADU, detached accessory structure, or residential addition when its structure, energy, utilities, drainage, access, or occupancy affects the property.`,
    sections: [
      { heading: `${local.name}: ${g.label} scope and existing conditions`, body: `${local.distinct} ${g.sectionA}` },
      { heading: `${local.name} climate, soils, and agency interfaces`, body: `${local.utilities} ${g.sectionB}` },
      { heading: `Plan-check corrections for ${local.name} projects`, body: `${local.review} ${g.sectionC}` },
    ],
    permitSteps: [
      `Confirm the local route with ${local.ahj}: ${g.stepA}`,
      `Verify Iowa site and utility facts before submittal: ${g.stepB}`,
      `Submit the coordinated package and preserve agency records: ${g.stepC}`,
      `Return ${local.name} corrections in a dated matrix, cloud revised sheets, and carry every changed calculation, schedule, utility response, and field assumption into the permit revision.`,
    ],
    faqs: [
      { question: `${local.name}: ${g.faqA}`, answer: `${g.focus[0].toUpperCase() + g.focus.slice(1)} must follow the actual parcel, observed conditions, project scope, and ${local.ahj} checklist. ${local.review}` },
      { question: `${local.name}: ${g.faqB}`, answer: `The design team selects criteria from current Iowa and local requirements, official site data, and professional judgment; ${local.conditions} can change the assumptions. A plan review or seal is not a guarantee of approval or construction performance.` },
      { question: `${local.name}: ${g.faqC}`, answer: `Cite the reviewer’s issue, revised sheet or calculation, and any open field or agency dependency. For an ADU or residential addition, keep the response tied to the existing building, utility, drainage, and occupancy interfaces.` },
    ],
    sources: local.sources,
  };
}

const metros: IowaMetro[] = [
  {
    slug: "des-moines",
    name: "Des Moines",
    county: "Polk County",
    ahj: "City of Des Moines Community Development Department",
    conditions: "Des Moines and Raccoon River floodplains, loess and glacial soils, steep ravines, high groundwater in low areas, humid summers, winter snow, and severe thunderstorms",
    utilities: "Des Moines Water Works, MidAmerican Energy, the city engineering and stormwater groups, and Polk County drainage authorities can affect utility and site design.",
    review: "Des Moines building, zoning, engineering, stormwater, floodplain, and right-of-way reviews are scope-specific; surrounding Polk County jurisdictions have separate requirements.",
    distinct: "Des Moines infill frequently combines older neighborhoods, ravines, river terraces, basement additions, and redevelopment near the confluence of the Raccoon and Des Moines rivers.",
    projects: "urban infill, basement and porch additions, downtown tenant improvements, ADUs, flood-aware redevelopment, and light-industrial conversions",
    sources: [
      { label: "Des Moines development services", url: "https://www.dsm.city/departments/development_services/permit_development_center/index.php" },
      { label: "Des Moines permit development center", url: "https://www.dsm.city/departments/engineering/permit_development/index.php" },
      { label: "Des Moines Engineering", url: "https://www.dsm.city/departments/engineering/index.php" },
      { label: "Des Moines stormwater advisory", url: "https://www.dsm.city/boards_commissions/stormwater_infrastructure_advisory.php" },
      { label: "Iowa building code licensing", url: "https://dial.iowa.gov/licenses/building" },
    ],
  },
  {
    slug: "cedar-rapids",
    name: "Cedar Rapids",
    county: "Linn County",
    ahj: "City of Cedar Rapids Community Development Department",
    conditions: "Cedar River floodplain, alluvial and glacial soils, high groundwater, cold winters, humid summers, freeze-thaw, and severe river and thunderstorm events",
    utilities: "Cedar Rapids Water Pollution Control, Cedar Rapids Water Division, Alliant Energy, city engineering, and Linn County drainage or road authorities may each control an interface.",
    review: "Cedar Rapids building, zoning, floodplain, stormwater, and public-works processes should be confirmed for the parcel; Linn County governs unincorporated locations.",
    distinct: "Cedar Rapids rebuilding and infill work often requires flood-elevation discipline alongside older industrial buildings, riverfront redevelopment, and phased public-infrastructure improvements.",
    projects: "river-corridor redevelopment, industrial renovations, neighborhood additions, ADUs, downtown tenant improvements, and flood-resilient commercial work",
    sources: [
      { label: "Cedar Rapids Community Development", url: "https://www.cedar-rapids.org/local_government/departments_a_-_f/community_development/index.php" },
      { label: "Cedar Rapids building services", url: "https://www.cedar-rapids.org/local_government/departments_a_-_f/building_services/index.php" },
      { label: "Cedar Rapids Public Works", url: "https://www.cedar-rapids.org/local_government/departments_g_-_v/public_works/index.php" },
      { label: "Cedar Rapids right-of-way and stormwater services", url: "https://www.cedar-rapids.org/local_government/departments_g_-_v/public_works/right_of_way_permits.php" },
      { label: "Iowa building code licensing", url: "https://dial.iowa.gov/licenses/building" },
    ],
  },
  {
    slug: "davenport",
    name: "Davenport",
    county: "Scott County",
    ahj: "City of Davenport Community and Economic Development Department",
    conditions: "Mississippi River floodplain, bluff and loess slopes, alluvial soils, high groundwater, humid summers, winter ice and snow, and severe storms",
    utilities: "Davenport Public Works, Davenport sewer and water utilities, MidAmerican Energy, and Mississippi River or Scott County drainage and transportation authorities may be involved.",
    review: "Davenport’s building, zoning, floodplain, grading, stormwater, and public-works reviews are parcel-specific; Scott County and Bettendorf have distinct authorities.",
    distinct: "Davenport sites may shift from river-bottom floodplain to steep bluff neighborhoods, creating retaining, erosion, accessible-route, and utility-elevation questions within a short distance.",
    projects: "bluff-side additions, riverfront redevelopment, historic masonry renovations, ADUs, warehouse reuse, and neighborhood commercial fit-outs",
    sources: [
      { label: "Davenport Community and Economic Development", url: "https://www.davenportiowa.com/government/departments/community_economic_development" },
      { label: "Davenport building and land development", url: "https://www.davenportiowa.com/our_community/building_land_development" },
      { label: "Davenport engineering and capital projects", url: "https://www.davenportiowa.com/government/departments/engineering___capital_projects" },
      { label: "Davenport building permit inquiry", url: "https://www.davenportiowa.com/our_community/building_land_development/building_permit_inquiry" },
      { label: "Iowa building code licensing", url: "https://dial.iowa.gov/licenses/building" },
    ],
  },
  {
    slug: "iowa-city",
    name: "Iowa City",
    county: "Johnson County",
    ahj: "City of Iowa City Neighborhood and Development Services",
    conditions: "Iowa River floodplain, loess and residual soils, rolling grades, high groundwater, humid summers, cold winters, freeze-thaw, and intense rainfall",
    utilities: "Iowa City Utilities, MidAmerican Energy, city engineering and stormwater, and Johnson County roads or watershed authorities may require separate coordination.",
    review: "Iowa City publishes building, zoning, floodplain, stormwater, historic-preservation, and development-review requirements; Johnson County governs addresses outside the city.",
    distinct: "Iowa City’s university and historic neighborhoods combine infill density, river flood considerations, older utilities, accessible-route constraints, and preservation review.",
    projects: "university-area tenant improvements, historic additions, ADUs, river-corridor work, small multifamily buildings, and neighborhood commercial renovations",
    sources: [
      { label: "Iowa City Neighborhood and Development Services", url: "https://www.icgov.org/government/departments/neighborhood-and-development-services" },
      { label: "Iowa City building permits", url: "https://www.icgov.org/government/departments/neighborhood-and-development-services/building-permits" },
      { label: "Iowa City Engineering", url: "https://www.icgov.org/government/departments/engineering" },
      { label: "Iowa City stormwater", url: "https://www.icgov.org/government/departments/engineering/stormwater" },
      { label: "Iowa building code licensing", url: "https://dial.iowa.gov/licenses/building" },
    ],
  },
  {
    slug: "sioux-city",
    name: "Sioux City",
    county: "Woodbury County",
    ahj: "City of Sioux City Community Development Department",
    conditions: "Missouri River floodplain, steep loess bluffs, variable alluvium, high prairie wind, cold winters, snow, freeze-thaw, and severe thunderstorms",
    utilities: "Sioux City Engineering and Public Works, Sioux City Utilities, MidAmerican Energy, and Woodbury County drainage or highway authorities may control separate site interfaces.",
    review: "Sioux City’s building, zoning, floodplain, grading, stormwater, and public-works requirements apply within city limits; Woodbury County uses a different route outside them.",
    distinct: "Sioux City’s river-bottom industrial areas and loess bluff neighborhoods have sharply different foundation, drainage, access, flood, and retaining requirements.",
    projects: "riverfront industrial work, bluff-side additions, agricultural processing buildings, ADUs, downtown renovations, and warehouse conversions",
    sources: [
      { label: "Sioux City Community Development", url: "https://sioux-city.org/31/Community" },
      { label: "Sioux City building services", url: "https://sioux-city.org/" },
      { label: "Sioux City Public Works", url: "https://sioux-city.org/" },
      { label: "Sioux City engineering", url: "https://sioux-city.org/" },
      { label: "Iowa building code licensing", url: "https://dial.iowa.gov/licenses/building" },
    ],
  },
];

const iowaBatch3: Batch2StateExpansion = {
  stateSlug: "iowa",
  stateName: "Iowa",
  stateAbbrev: "IA",
  hub: {
    title: "Iowa Engineering Services for Local Permit Review",
    description: "Iowa structural, MEP, civil, energy-compliance, and PE-stamped drawing support coordinated with local AHJs, state code resources, river and soil conditions, utilities, and project-specific professional judgment.",
    h1: "Engineering for Iowa’s River, Bluff, and Prairie Sites",
    kicker: "Iowa permit and design coordination",
    lede: "Iowa projects move through city, county, state, fire, floodplain, stormwater, utility, and right-of-way processes that vary by address. A responsible engineering package starts with the local AHJ and current code publication, then incorporates survey, soils, flood, utility, weather, and existing-building information for the actual scope.",
    sections: [
      { heading: "State resources and local administration", body: "Iowa state building-code resources provide a baseline, while cities and counties administer many permits and add zoning, fire, engineering, floodplain, stormwater, historic, and utility requirements. Des Moines, Cedar Rapids, Davenport, Iowa City, and Sioux City have distinct review paths, and a county parcel may use a different AHJ entirely." },
      { heading: "Rivers, loess, and severe weather matter", body: "Mississippi, Missouri, Iowa, Cedar, Des Moines, and Raccoon River systems create different flood and groundwater questions. Loess, glacial till, alluvium, expansive clay, bluff slopes, frost, snow, humidity, tornadoes, straight-line wind, and intense rainfall can affect every discipline." },
      { heading: "A correction-ready project record", body: "Identify the code edition, AHJ checklist, discipline boundaries, site investigations, utility responses, and a numbered plan-check response before submittal. ADUs and residential additions should remain within this coordinated workflow when they alter structure, energy, utilities, grading, drainage, access, or occupancy." },
      { heading: "Iowa sanitary and private-wastewater approvals follow the site", body: "A city building permit does not by itself authorize a sanitary connection, private well, or private sewage-disposal system. The city utility, county environmental health office, Iowa Department of Natural Resources, and any downstream sewer authority may each have a handoff. Confirm available capacity, connection elevations, pretreatment or grease requirements, well setbacks, septic soil information, and easements before civil and plumbing documents are issued." },
    ],
    faqs: [
      { question: "Does Iowa have one permit office for every project?", answer: "No. Iowa state code information is a starting point, but the city or county generally administers local building and development review. Fire, floodplain, stormwater, historic, right-of-way, health, and utilities can add separate reviews." },
      { question: "What Iowa conditions should be checked before engineering?", answer: "Confirm the jurisdiction and code edition, survey, soil and groundwater, floodplain and finished-floor needs, drainage, wind and snow, severe-weather exposure, utility capacity, environmental history, and occupancy or alteration scope." },
      { question: "How should Iowa plan-check corrections be handled?", answer: "Use a dated response matrix naming the reviewer comment, response, revised sheet or calculation, and unresolved field or agency item. Approval is not guaranteed; changed conditions and reviewer direction can require additional professional work." },
    ],
    sources: [
      { label: "Iowa building code licensing", url: "https://dial.iowa.gov/licenses/building" },
      { label: "Iowa engineering licensing board", url: "https://plb.iowa.gov/board/engineering" },
      { label: "Iowa DNR construction stormwater", url: "https://www.iowadnr.gov/Environmental-Protection/Water-Quality/NPDES-Storm-Water" },
      { label: "Iowa Department of Natural Resources", url: "https://www.iowadnr.gov/" },
    ],
  },
  metros: [],
};

iowaBatch3.metros = metros.map((local) => ({
  slug: local.slug,
  name: local.name,
  county: local.county,
  services: serviceSlugs.map((serviceSlug) => buildService(local, serviceSlug)),
}));

export { iowaBatch3 };
export default iowaBatch3;