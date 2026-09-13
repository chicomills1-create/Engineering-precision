import type {
  Batch2CoreServicePage,
  Batch2CoreServiceSlug,
  Batch2StateExpansion,
} from "./batch2-core-service-types";

type IdahoMetro = {
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
      "Idaho projects need a traceable load path from roof and floor diaphragms through connections and foundations, especially when a new opening, snow-loaded roof, solar array, or residential addition meets older framing. Existing-condition photographs and selective exposure should be separated from assumptions in the calculation record.",
    sectionB:
      "Alluvial Boise Valley soils, frost, expansive or collapsible materials, mountain snow, wind, and Idaho’s seismic hazard can change foundation and lateral design. The structural scope should coordinate geotechnical recommendations, retaining surcharge, drainage, and finished-floor elevations rather than treating the parcel as uniformly competent.",
    sectionC:
      "For plan check, answer each correction with the reviewer’s exact issue, a revised sheet or calculation, and a field-verification note when necessary. ADUs and residential additions use the same disciplined workflow because new concentrated loads, egress openings, and utility penetrations can affect the existing building.",
    stepA: "Confirm the city or county AHJ, adopted Idaho code edition and amendments, occupancy, risk category, snow, wind, and seismic criteria, including whether an ADU or addition changes the alteration scope.",
    stepB: "Verify framing, foundations, soil information, snow drift, retaining conditions, flood or wildfire constraints, and construction sequencing with the architect, surveyor, and geotechnical professional.",
    stepC: "Coordinate calculations, special inspections, shoring, deferred designs, and structural sheets before sending the complete package to the local building official.",
    faqA: "When does an Idaho addition need a structural observation?",
    faqB: "How are Idaho snow and seismic conditions reflected in a design?",
    faqC: "What is a useful response to Idaho structural plan-check comments?",
  },
  "mep-engineering": {
    label: "MEP Engineering",
    focus: "mechanical, electrical, plumbing, ventilation, and utility coordination",
    sectionA:
      "MEP design in Idaho starts with the actual service territory, altitude, occupancy, equipment schedule, and existing infrastructure. Electrical capacity, gas pressure, domestic-water pressure, fire flow, sewer point, and backflow requirements belong in written utility coordination rather than a generic allowance.",
    sectionB:
      "Boise’s hot-dry summers and inversion episodes, northern Idaho cold, mountain altitude, winter freeze risk, and wildfire smoke can affect heating, cooling, outdoor air, filtration, intake placement, and controls. Equipment derating and freeze protection should be checked against the site elevation and operating schedule.",
    sectionC:
      "Keep building, fire, utility, and energy comments in one revision log, and update risers, load calculations, schedules, and sequences together. An ADU or residential addition should be evaluated for panel capacity, heat-pump or gas service, domestic-water demand, sewer loading, and ventilation without assuming it is a stand-alone permit.",
    stepA: "Verify occupancy, elevation, utility providers, available electric and gas service, water pressure, sewer capacity, fire-protection threshold, and the adopted mechanical, plumbing, electrical, and energy provisions.",
    stepB: "Coordinate equipment clearances, ventilation, combustion or heat-pump details, panel schedules, domestic-water demand, sanitary loads, maintenance access, and wildfire-smoke filtration where appropriate.",
    stepC: "Obtain written utility and fire responses, reconcile them with the MEP sheets, then preserve the final schedules, substitutions, and commissioning assumptions for plan check and closeout.",
    faqA: "Which Idaho utility facts most affect an MEP package?",
    faqB: "Does Idaho elevation change mechanical equipment sizing?",
    faqC: "How should an Idaho MEP correction cycle be documented?",
  },
  "civil-engineering": {
    label: "Civil Engineering",
    focus: "grading, drainage, utilities, access, erosion, and site permitting",
    sectionA:
      "An Idaho civil set should connect the survey, building pad, accessible route, fire lane, utility profiles, irrigation or drainage ditches, and receiving system. Building approval does not necessarily cover local grading, floodplain, right-of-way, erosion, water-right, or utility approvals, so the parcel’s agencies need to be listed at kickoff.",
    sectionB:
      "Snowmelt, cloudbursts, shallow groundwater, alluvial fans, expansive soils, steep mountain grades, and downstream floodways can control detention, infiltration, outfalls, and winter stabilization. Idaho Department of Environmental Quality and local stormwater requirements should be checked when disturbance or discharge crosses their thresholds.",
    sectionC:
      "Plan-check responses should show the changed contour, pipe profile, drainage calculation, or maintenance note and explain why adjacent lots and access remain protected. For an ADU, detached garage, or residential addition, the civil review must still account for sewer, water, fire access, roof runoff, snow storage, and existing easements.",
    stepA: "Map the parcel to the city or county development route, watershed, floodplain, disturbance threshold, frontage, utility providers, irrigation facilities, and right-of-way requirements.",
    stepB: "Prepare survey-based grading, drainage, utility, fire-access, erosion, and snow-storage plans with soil infiltration and finished-floor assumptions identified.",
    stepC: "Route the package to planning, engineering, stormwater, fire, and utility reviewers, then record the accepted revisions, maintenance responsibility, and as-built elevations.",
    faqA: "Which Idaho agencies can review a site plan?",
    faqB: "Why can a small Idaho lot need detailed drainage design?",
    faqC: "How should an Idaho ADU be included in civil review?",
  },
  "energy-compliance": {
    label: "Energy Compliance",
    focus: "envelope, HVAC, lighting, service water, and code documentation",
    sectionA:
      "Idaho energy documentation is tied to the current state-adopted code edition, local enforcement process, occupancy, and alteration category. The chosen compliance method should match envelope assemblies, windows, lighting controls, equipment schedules, and service-water details on the permit drawings.",
    sectionB:
      "Cold winters, hot Boise summers, mountain solar exposure, snow cover, dry air, and wildfire smoke create different envelope and HVAC decisions across Idaho. Air sealing, thermal bridges, heat-pump low-temperature operation, ventilation, filtration, and controls should be explicit design inputs.",
    sectionC:
      "A versioned model and comment matrix prevent plan-check corrections from drifting away from the architectural and MEP revision. An ADU or residential addition should be screened for the local energy trigger and connected-system effects instead of being declared exempt without checking the AHJ’s current guidance.",
    stepA: "Identify the AHJ, current Idaho energy-code edition, climate data, occupancy, alteration category, and prescriptive or performance route before modeling.",
    stepB: "Collect verified assemblies, fenestration, lighting, HVAC, controls, service-water, and utility inputs from the coordinated design team.",
    stepC: "Submit the energy forms or report with the building set, answer comments by input and sheet, and retain final equipment and functional-testing assumptions for closeout.",
    faqA: "What controls the energy-code route for an Idaho project?",
    faqB: "How do Idaho climate zones affect compliance documentation?",
    faqC: "Does an Idaho residential addition always need a new energy model?",
  },
  "pe-stamped-drawings": {
    label: "PE-Stamped Drawings",
    focus: "responsible-charge documentation, sealed calculations, and permit coordination",
    sectionA:
      "An Idaho PE seal represents responsibility for a defined engineering scope and cannot substitute for missing survey, geotechnical, utility, or architectural information. The package should state the parcel, discipline, existing-condition evidence, design criteria, applicable code, and boundaries with specialty or contractor design.",
    sectionB:
      "The responsible professional may need to consider seismicity, heavy snow, wind, wildfire, floodplain, expansive or alluvial soils, freeze protection, and mountain elevation before accepting a scope. A seal does not promise approval or establish that every field condition has been verified.",
    sectionC:
      "Use a dated comment-response matrix for plan check, cloud revisions, and obtain the responsible PE’s review of substitutions, RFIs, and changed field conditions. The same record works for an ADU or residential addition when the project changes foundation, service, drainage, retaining, or load paths.",
    stepA: "List the AHJ, current code editions, discipline boundaries, site investigations, utility letters, flood or wildfire checks, and special inspections in the project intake.",
    stepB: "Assemble verified existing conditions, calculations, design criteria, drawings, notes, and exclusions so the Idaho PE can exercise independent professional judgment.",
    stepC: "Submit the signed and sealed documents through the AHJ’s stated channel, then log each correction, substitution, RFI, observation, and final record drawing.",
    faqA: "What should be assembled before an Idaho PE seals a set?",
    faqB: "Does a stamped Idaho drawing guarantee permit approval?",
    faqC: "How are Idaho sealed revisions issued after plan check?",
  },
};

function buildService(local: IdahoMetro, serviceSlug: Batch2CoreServiceSlug): Batch2CoreServicePage {
  const g = guidance[serviceSlug];
  return {
    serviceSlug,
    title: `${local.name} ${g.label} for Idaho Permitted Projects`,
    description: `${g.label} for ${local.name} projects, coordinated with ${local.ahj}, Idaho code requirements, local utilities, and ${local.conditions}.`,
    h1: `${g.label} for ${local.name} Projects`,
    kicker: `${local.name} ${g.label.toLowerCase()} and plan review`,
    lede: `${local.name} work calls for ${g.focus} grounded in ${local.conditions}. This service path connects ${local.ahj} requirements with plan-check corrections and the project types that are common in ${local.name}.`,
    permitAuthority: `${local.ahj} is the principal local authority for the described jurisdiction; county, fire, floodplain, public-works, environmental, and utility reviews may be separate. The responsible Idaho professional confirms the permit and seal scope.`,
    codeContext: `Idaho’s state building-code adoption and local ordinances establish the baseline, while cities and counties publish their own current checklists, amendments, land-use, fire, stormwater, and utility requirements. Confirm the edition and transition rules with ${local.ahj}; ${local.review}.`,
    localConditions: `${local.conditions} ${local.utilities}`,
    projectTypes: `${local.projects} An ADU, detached accessory building, or residential addition can use this same coordinated process when structure, energy, utilities, grading, access, or occupancy are affected.`,
    sections: [
      { heading: `${local.name}: ${g.label} scope and existing conditions`, body: `${local.distinct} ${g.sectionA}` },
      { heading: `${local.name} climate, soils, and agency interfaces`, body: `${local.utilities} ${g.sectionB}` },
      { heading: `Plan-check corrections for ${local.name} projects`, body: `${local.review} ${g.sectionC}` },
    ],
    permitSteps: [
      `Confirm the local route with ${local.ahj}: ${g.stepA}`,
      `Verify Idaho site and utility facts before submittal: ${g.stepB}`,
      `Submit the coordinated set and preserve agency records: ${g.stepC}`,
      `Return ${local.name} corrections in a dated matrix, cloud revised sheets, and make sure every changed calculation, schedule, utility response, and field assumption is carried into the permit revision.`,
    ],
    faqs: [
      { question: `${local.name}: ${g.faqA}`, answer: `${g.focus[0].toUpperCase() + g.focus.slice(1)} must follow the actual parcel, observed conditions, project scope, and ${local.ahj} checklist. ${local.review}` },
      { question: `${local.name}: ${g.faqB}`, answer: `The design team selects criteria from the adopted code, official site data, and professional judgment; ${local.conditions} can change the assumptions. A plan review or seal is not a guarantee of approval or construction performance.` },
      { question: `${local.name}: ${g.faqC}`, answer: `Cite each comment, identify the revised sheet or calculation, and record any unresolved field or agency dependency. For an ADU or residential addition, keep the response tied to the existing building, utility, drainage, and occupancy interfaces.` },
    ],
    sources: local.sources,
  };
}

const metros: IdahoMetro[] = [
  {
    slug: "boise",
    name: "Boise",
    county: "Ada County",
    ahj: "City of Boise Planning and Development Services",
    conditions: "Treasure Valley alluvial soils, shallow groundwater in some corridors, hot-dry summers, inversion and wildfire smoke, winter snow, and Boise River floodplain exposure",
    utilities: "Boise City Department of Public Works, Boise WaterShed, Idaho Power, Intermountain Gas, and local irrigation districts may each control a project interface.",
    review: "Boise’s adopted building and zoning codes, hillside and floodplain rules, stormwater standards, and development-review checklists are address-specific; Ada County governs unincorporated parcels.",
    distinct: "Boise infill often works around irrigation laterals, mature cottonwoods, alley utilities, river terraces, and older unreinforced residential or commercial construction.",
    projects: "North End additions, downtown tenant improvements, river-corridor work, detached ADUs, warehouse conversions, and multifamily infill",
    sources: [
      { label: "City of Boise Planning and Development Services", url: "https://www.cityofboise.org/departments/planning-and-development-services/" },
      { label: "Boise building permits", url: "https://www.cityofboise.org/departments/planning-and-development-services/building/building-permits/" },
      { label: "Boise Public Works development", url: "https://www.cityofboise.org/departments/public-works/" },
      { label: "Boise Public Works", url: "https://www.cityofboise.org/departments/public-works/" },
      { label: "Idaho Division of Occupational and Professional Licenses", url: "https://dopl.idaho.gov/" },
    ],
  },
  {
    slug: "meridian",
    name: "Meridian",
    county: "Ada County",
    ahj: "City of Meridian Community Development",
    conditions: "rapid Treasure Valley growth, compressible and alluvial soils, irrigation facilities, hot summers, winter inversions, snow, and localized stormwater ponding",
    utilities: "Meridian Public Works, Suez or local water and sewer service areas, Idaho Power, Intermountain Gas, and irrigation entities require address-specific coordination.",
    review: "Meridian’s building, subdivision, zoning, engineering, and public-works standards apply within the city; Ada County and adjacent municipalities have separate submission routes.",
    distinct: "Meridian’s expanding subdivisions and commercial corridors place new utility capacity, subdivision drainage, school-area traffic, and phased public improvements beside older rural parcels.",
    projects: "subdivision homes, neighborhood ADUs, retail shells, office tenant improvements, industrial flex buildings, and residential additions",
    sources: [
      { label: "Meridian Community Development", url: "https://meridiancity.org/developmentservices" },
      { label: "Meridian building services", url: "https://meridiancity.org/developmentservices/building" },
      { label: "Meridian Public Works", url: "https://meridiancity.org/publicworks" },
      { label: "Meridian development engineering standards", url: "https://meridiancity.org/developmentservices/engineering" },
      { label: "Idaho Division of Occupational and Professional Licenses", url: "https://dopl.idaho.gov/" },
    ],
  },
  {
    slug: "nampa",
    name: "Nampa",
    county: "Canyon County",
    ahj: "City of Nampa Development Services",
    conditions: "Canyon County alluvium and variable groundwater, hot dry summers, winter freeze, irrigation canals, agricultural-to-urban conversion, and flood risk near the Boise and Nampa rivers",
    utilities: "City of Nampa water and wastewater, Idaho Power, Intermountain Gas, irrigation districts, and Canyon County highway or drainage authorities may be involved.",
    review: "Nampa’s development-services and engineering requirements are separate from Canyon County’s unincorporated process; the current local building, subdivision, stormwater, and right-of-way checklists control.",
    distinct: "Nampa projects frequently convert irrigated agricultural parcels into neighborhoods or industrial sites, making canal crossings, access, phasing, and water or sewer capacity central design questions.",
    projects: "industrial expansions, infill homes, ADUs, irrigation-adjacent additions, warehouse sites, and small commercial renovations",
    sources: [
      { label: "City of Nampa Development Services", url: "https://www.cityofnampa.us/166/Development-Services" },
      { label: "Nampa building permits", url: "https://www.cityofnampa.us/169/Building" },
      { label: "Nampa Public Works", url: "https://www.cityofnampa.us/158/Public-Works" },
      { label: "Nampa engineering standards", url: "https://www.cityofnampa.us/173/Engineering" },
      { label: "Idaho Division of Occupational and Professional Licenses", url: "https://dopl.idaho.gov/" },
    ],
  },
  {
    slug: "idaho-falls",
    name: "Idaho Falls",
    county: "Bonneville County",
    ahj: "City of Idaho Falls Community Development Services",
    conditions: "Snake River Plain basalt and alluvial soils, cold winters, substantial snow, freeze-thaw, irrigation and canal crossings, and Snake River floodplain considerations",
    utilities: "Idaho Falls Power, Idaho Falls water and wastewater, Intermountain Gas, irrigation entities, and Bonneville County roads or drainage agencies can affect the site plan.",
    review: "Idaho Falls publishes local building, land-use, engineering, floodplain, and utility processes; Bonneville County is the separate authority for unincorporated sites.",
    distinct: "Idaho Falls redevelopment often combines cold-climate envelope demands with basalt excavation, river or canal setbacks, and public utility coordination in an established grid.",
    projects: "cold-climate additions, downtown tenant improvements, detached ADUs, medical offices, industrial buildings, and river-area redevelopment",
    sources: [
      { label: "Idaho Falls Community Development", url: "https://www.idahofallsidaho.gov/31/Community" },
      { label: "Idaho Falls building permits", url: "https://www.idahofallsidaho.gov/269/Building-Services" },
      { label: "Idaho Falls Public Works", url: "https://www.idahofallsidaho.gov/255/Public-Works" },
      { label: "Idaho Falls utilities", url: "https://www.idahofallsidaho.gov/" },
      { label: "Idaho Division of Occupational and Professional Licenses", url: "https://dopl.idaho.gov/" },
    ],
  },
  {
    slug: "coeur-d-alene",
    name: "Coeur d'Alene",
    county: "Kootenai County",
    ahj: "City of Coeur d’Alene Community Planning Department",
    conditions: "snowy northern Idaho winters, glacial and lakebed soils, steep wooded slopes, wildfire exposure, rain-on-snow runoff, and Lake Coeur d’Alene watershed constraints",
    utilities: "City of Coeur d’Alene water and wastewater, Avista Utilities, Kootenai County utilities, stormwater facilities, and lake or shoreline agencies may have separate requirements.",
    review: "Coeur d’Alene’s building, planning, shoreline, hillside, stormwater, and fire processes must be checked for the parcel; Kootenai County reviews addresses outside the city.",
    distinct: "Coeur d’Alene sites can shift from a level downtown grid to wooded slopes and lake-influenced drainage, where snow storage, tree retention, wildfire access, and shoreline protection intersect.",
    projects: "lake-area additions, hillside homes, downtown renovations, ADUs, hospitality improvements, and small multifamily buildings",
    sources: [
      { label: "Coeur d’Alene Community Planning", url: "https://www.cdaid.org/government/departments/planning/" },
      { label: "Coeur d’Alene building services", url: "https://www.cdaid.org/government/departments/building-services/" },
      { label: "Coeur d’Alene engineering", url: "https://www.cdaid.org/government/departments/streets-and-engineering/" },
      { label: "Coeur d’Alene public works", url: "https://www.cdaid.org/government/committees/general-servicespublic-works/" },
      { label: "Idaho Division of Occupational and Professional Licenses", url: "https://dopl.idaho.gov/" },
    ],
  },
];

const idahoBatch3: Batch2StateExpansion = {
  stateSlug: "idaho",
  stateName: "Idaho",
  stateAbbrev: "ID",
  hub: {
    title: "Idaho Engineering Services for Local Permit Review",
    description: "Idaho structural, MEP, civil, energy-compliance, and PE-stamped drawing support coordinated with city and county AHJs, utilities, and the state building-code framework.",
    h1: "Engineering for Idaho’s Valley, River, and Mountain Sites",
    kicker: "Idaho permit and design coordination",
    lede: "Idaho’s state code adoption provides an important baseline, but local cities and counties control many building, zoning, fire, floodplain, stormwater, utility, and development-review details. The correct engineering path starts by identifying the parcel’s AHJ and documenting climate, soil, utility, and environmental facts for that site.",
    sections: [
      { heading: "State code adoption meets local administration", body: "The Idaho Building Code Board publishes state adoption information, while local building officials administer permits and local governments add land-use, fire, engineering, stormwater, and utility requirements. Boise, Meridian, Nampa, Idaho Falls, and Coeur d’Alene are not interchangeable review paths, and county jurisdiction must be checked for each address." },
      { heading: "Idaho conditions are not uniform", body: "Treasure Valley alluvium and irrigation systems differ from Snake River Plain basalt, northern lakebed soils, and mountain slopes. Snow, freeze-thaw, wildfire, seismic hazard, rain-on-snow runoff, floodplains, inversions, hot summers, and wildfire smoke can affect structural, civil, MEP, and energy decisions." },
      { heading: "One coordinated correction record", body: "A useful package identifies the code edition, AHJ checklist, professional scope, survey and soils evidence, utility responses, and a comment-by-comment revision log. ADUs and residential additions should be incorporated into that same record when they change foundation, service, energy, drainage, access, or occupancy." },
      { heading: "Idaho water rights and utility capacity need their own handoff", body: "A city building approval does not create a water right or guarantee sewer capacity. Idaho Department of Water Resources records, irrigation entities, the city utility, and Idaho Department of Environmental Quality requirements can matter when a project changes a connection, well, septic system, irrigation lateral, or discharge. Confirm the provider’s service area, pressure and fire-flow data, easements, backflow requirements, and any onsite-wastewater authorization before final civil and MEP documents." },
    ],
    faqs: [
      { question: "Does Idaho use one permit office for every project?", answer: "No. Idaho provides a state building-code framework, but a city or county generally administers the local building and development review. Fire, floodplain, utilities, right-of-way, environmental, and irrigation entities may have additional authority." },
      { question: "What Idaho facts should be verified before design?", answer: "Verify the AHJ and code edition, survey, soil and groundwater conditions, snow and wind exposure, seismic criteria, wildfire and floodplain status, utility capacity, irrigation or shoreline constraints, and project occupancy or alteration scope." },
      { question: "How should Idaho plan-check corrections be organized?", answer: "Use a dated matrix naming each reviewer comment, response, revised sheet or calculation, and open dependency. Keep ADU and addition corrections connected to the existing building and site rather than treating them as an unsupported shortcut." },
    ],
    sources: [
      { label: "Idaho Division of Occupational and Professional Licenses", url: "https://dopl.idaho.gov/" },
      { label: "Idaho professional licensing information", url: "https://dopl.idaho.gov/" },
      { label: "Idaho Department of Environmental Quality stormwater permits", url: "https://www.deq.idaho.gov/permits/water-quality-permits-certifications/stormwater-permits/" },
      { label: "Idaho Office of Emergency Management flood hazards", url: "https://ioem.idaho.gov/hazards/flood/" },
    ],
  },
  metros: [],
};

idahoBatch3.metros = metros.map((local) => ({
  slug: local.slug,
  name: local.name,
  county: local.county,
  services: serviceSlugs.map((serviceSlug) => buildService(local, serviceSlug)),
}));

export { idahoBatch3 };
export default idahoBatch3;