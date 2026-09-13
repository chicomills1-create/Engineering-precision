import type {
  Batch2CoreServicePage,
  Batch2CoreServiceSlug,
  Batch2StateExpansion,
} from "./batch2-core-service-types";

type ColoradoMetro = {
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
      "A field-verified load path is especially important where a new opening, rooftop unit, solar array, or residential addition meets older framing. The calculation narrative should distinguish observed conditions from assumptions and identify the connection, diaphragm, and footing details that the reviewer can check.",
    sectionB:
      "Colorado’s elevation changes and freeze-thaw cycles make drainage at foundations part of structural risk management. A geotechnical recommendation, expansive-soil observation, frost depth, retaining-wall surcharge, and finished-floor elevation should be reconciled before the structural set is sealed.",
    sectionC:
      "Plan-check corrections should be answered in a numbered response matrix: cite the comment, show the revised sheet or calculation, and call out any field observation. ADU and residential-addition work benefits from the same process because a small footprint can still create differential settlement, snow drift, or diaphragm discontinuities.",
    stepA: "Confirm the parcel jurisdiction, adopted building-code edition, occupancy, risk category, snow and wind criteria, and whether an ADU or addition changes the existing-building scope.",
    stepB: "Document framing, foundations, soils, snow drift zones, and any wildland-urban-interface or floodplain constraints with the architect, surveyor, and geotechnical consultant.",
    stepC: "Coordinate the permit sheets, calculations, special-inspection notes, temporary shoring, and contractor deferred-design items before submitting the structural package.",
    faqA: "When does a Colorado addition need a structural site visit?",
    faqB: "How are Colorado snow and seismic assumptions selected?",
    faqC: "How should structural plan-check corrections be returned?",
  },
  "mep-engineering": {
    label: "MEP Engineering",
    focus: "mechanical, electrical, plumbing, ventilation, and utility coordination",
    sectionA:
      "The mechanical and electrical design should begin with the actual occupancy, altitude, utility service, and equipment schedule rather than a generic square-foot allowance. Gas pressure, transformer capacity, domestic-water pressure, fire service, and sanitary availability are address-specific conversations with the serving utilities.",
    sectionB:
      "Cold nights, dry air, high solar gain, and elevation can change heating capacity, ventilation correction factors, combustion-air details, and freeze protection. Mountain snow, wildfire smoke, and summer cooling loads also affect intake locations, filtration, emergency power, and controls.",
    sectionC:
      "For plan check, maintain one comment log across building, fire, utility, and energy reviewers, then revise risers, load calculations, schedules, and control sequences together. The same workflow covers an ADU or residential addition when a new panel, service, bath group, heat pump, or sewer connection affects the existing home.",
    stepA: "Verify the occupancy, altitude, utility territories, available electric and gas service, water pressure, sewer point, fire-protection threshold, and adopted mechanical, plumbing, electrical, and energy provisions.",
    stepB: "Coordinate equipment clearances, ventilation, combustion or heat-pump provisions, panel schedules, domestic-water demand, sanitary load, and accessible maintenance routes with the architectural set.",
    stepC: "Submit utility requests and the coordinated MEP package, preserving written capacity responses and any fire-department or public-works requirements for the review record.",
    faqA: "What utility information does a Colorado MEP plan need?",
    faqB: "Does altitude change an MEP design in Colorado?",
    faqC: "How are MEP review corrections tracked?",
  },
  "civil-engineering": {
    label: "Civil Engineering",
    focus: "grading, drainage, utilities, access, erosion, and site permitting",
    sectionA:
      "The civil plan must connect the topographic survey, building pad, accessible route, fire access, utility profiles, and receiving drainage system. Colorado municipalities commonly separate building intake from grading, stormwater, right-of-way, and erosion review, so one accepted plan does not establish every site approval.",
    sectionB:
      "Short intense storms, snowmelt, steep grades, expansive or collapsible soils, and downstream floodplain constraints can control a small redevelopment. Detention, infiltration, water-quality treatment, construction-phase erosion control, and winter stabilization should be based on the named receiving system and local criteria.",
    sectionC:
      "A useful correction response overlays the reviewer’s concern on the plan, identifies the revised detail, and confirms that grading still works around an ADU, detached garage, or residential addition. Utility locates and record drawings are evidence to verify, not permission to assume an abandoned or private line is clear.",
    stepA: "Confirm the city or county development-review route, disturbance limit, floodplain panel, watershed, zoning frontage, utility providers, and right-of-way obligations for the parcel.",
    stepB: "Build the survey-based grading, drainage, utility, fire-access, erosion, and snow-storage concept, including soil infiltration limits and finished-floor elevations.",
    stepC: "Send the civil set to the named planning, engineering, stormwater, and utility reviewers; log corrections and issue an as-built and maintenance record at closeout.",
    faqA: "Who reviews Colorado site drainage besides the building department?",
    faqB: "What makes a Colorado infill grading plan difficult?",
    faqC: "Can the same civil workflow cover an ADU site plan?",
  },
  "energy-compliance": {
    label: "Energy Compliance",
    focus: "envelope, HVAC, lighting, service water, and code documentation",
    sectionA:
      "Colorado energy compliance is jurisdiction-sensitive: the applicable local code, adopted model edition, amendments, and permitted alteration path must be identified before selecting a prescriptive or performance method. The report should match the architectural envelope, equipment schedules, lighting controls, and service-water details actually submitted.",
    sectionB:
      "High-altitude solar exposure, cold winter design temperatures, dry air, snow on roofs, and summer cooling in lower-elevation metros affect envelope and HVAC decisions. Airtightness, thermal-bridge details, heat-pump operation, ventilation, and wildfire-smoke filtration deserve explicit coordination rather than a generic efficiency claim.",
    sectionC:
      "Plan-check corrections are easiest when the model, compliance forms, equipment schedules, and revised drawings share a version number. Residential additions and ADUs should be evaluated for the local alteration trigger and connected-system effects instead of being treated as automatically exempt or automatically new construction.",
    stepA: "Identify the AHJ, adopted energy-code edition, climate data, occupancy, alteration or addition category, and compliance path before modeling.",
    stepB: "Collect envelope assemblies, window data, lighting layouts, HVAC capacities, controls, service-water equipment, and utility information from the coordinated design team.",
    stepC: "Submit the selected compliance forms or report with the permit set, answer reviewer comments by input and sheet, and preserve the final equipment and commissioning assumptions.",
    faqA: "Which Colorado energy code applies to a project?",
    faqB: "How does altitude affect Colorado energy documentation?",
    faqC: "Are ADUs and residential additions automatically outside energy review?",
  },
  "pe-stamped-drawings": {
    label: "PE-Stamped Drawings",
    focus: "responsible-charge documentation, sealed calculations, and permit coordination",
    sectionA:
      "A Colorado seal belongs to a defined engineering scope and responsible professional, not to a generic plan package. The record should identify the parcel, discipline, existing-condition evidence, adopted code, design criteria, and boundaries between engineering, architecture, geotechnical, survey, fire, and contractor design.",
    sectionB:
      "Mountain snow, wind exposure, seismic design category, expansive soils, wildfire, floodplain, and utility constraints may require project-specific investigation before a PE accepts responsibility. A seal does not replace a survey, geotechnical report, utility commitment, or AHJ determination.",
    sectionC:
      "For correction rounds, issue a comment-response matrix with revised sheets and clouded calculations, then obtain the responsible professional’s review of substitutions and field changes. That process is equally appropriate for an ADU or residential addition when the work changes service, foundation, retaining, or load paths.",
    stepA: "Map the parcel to the responsible AHJ and list the disciplines, code editions, site investigations, utility letters, and special inspections required by its checklist.",
    stepB: "Assemble verified existing conditions, design criteria, calculations, drawings, notes, and scope exclusions so the Colorado PE can exercise independent professional judgment.",
    stepC: "Submit the signed and sealed discipline package through the AHJ’s stated channel, then document each correction, substitution, RFI, and final field observation.",
    faqA: "What does a Colorado PE need before sealing drawings?",
    faqB: "Does a PE stamp guarantee permit approval in Colorado?",
    faqC: "How are sealed drawing revisions handled after plan check?",
  },
};

function buildService(local: ColoradoMetro, serviceSlug: Batch2CoreServiceSlug): Batch2CoreServicePage {
  const g = guidance[serviceSlug];
  return {
    serviceSlug,
    title: `${local.name} ${g.label} for Colorado Permitted Projects`,
    description: `${g.label} for ${local.name} work, coordinated with ${local.ahj}, Colorado code requirements, local utilities, and ${local.conditions}.`,
    h1: `${g.label} for ${local.name} Projects`,
    kicker: `${local.name} ${g.label.toLowerCase()} and permit coordination`,
    lede: `${local.name} projects need ${g.focus} that reflect ${local.conditions}. This page describes a site-specific path through ${local.ahj}, including plan-check corrections and practical coverage for ${local.projects}.`,
    permitAuthority: `${local.ahj} is the principal local review authority for the described jurisdiction; county, special-district, fire, floodplain, public-works, and utility reviews may be separate. The responsible Colorado professional confirms the applicable permit and seal scope.`,
    codeContext: `Colorado jurisdictions adopt and amend model building, residential, energy, fire, plumbing, mechanical, electrical, stormwater, and land-use requirements through their current local code publications. The project team must confirm the edition, transition provisions, and amendments used by ${local.ahj}; ${local.review}.`,
    localConditions: `${local.conditions} ${local.utilities}`,
    projectTypes: `${local.projects} The same coordinated process can cover an ADU, detached accessory structure, or residential addition when its foundation, utilities, energy scope, drainage, or occupancy affects the existing property.`,
    sections: [
      { heading: `${local.name}: ${g.label} scope and existing conditions`, body: `${local.distinct} ${g.sectionA}` },
      { heading: `${local.name} site, climate, and agency interfaces`, body: `${local.utilities} ${g.sectionB}` },
      { heading: `Plan-check corrections for ${local.name} projects`, body: `${local.review} ${g.sectionC}` },
    ],
    permitSteps: [
      `Start with ${local.ahj}: ${g.stepA}`,
      `Coordinate local facts before submittal: ${g.stepB}`,
      `Submit the discipline package and preserve agency records: ${g.stepC}`,
      `Return ${local.name} plan-check corrections in a dated response matrix, cloud revised sheets, and confirm that every changed calculation, schedule, utility response, and field assumption is carried into the permit revision.`,
    ],
    faqs: [
      { question: `${local.name}: ${g.faqA}`, answer: `${g.focus[0].toUpperCase() + g.focus.slice(1)} must be matched to the actual parcel, scope, observed conditions, and ${local.ahj} checklist. ${local.review}` },
      { question: `${local.name}: ${g.faqB}`, answer: `The design team selects project criteria from the adopted code, official site data, and professional judgment; ${local.conditions} can change the assumptions. A permit or seal is not a guarantee of approval or construction performance.` },
      { question: `${local.name}: ${g.faqC}`, answer: `Use a numbered response that cites the reviewer’s comment, revised sheet or calculation, and unresolved field item. For an ADU or residential addition, keep the correction tied to the existing building, utility, drainage, and occupancy interfaces rather than creating a separate doorway process.` },
    ],
    sources: local.sources,
  };
}

const metros: ColoradoMetro[] = [
  {
    slug: "denver",
    name: "Denver",
    county: "Denver County",
    ahj: "City and County of Denver Community Planning and Development",
    conditions: "Front Range freeze-thaw, expansive and variable urban fill, intense summer cloudbursts, snow drift, and localized floodplain exposure",
    utilities: "Denver Water, Xcel Energy, Denver wastewater and storm drainage, and Denver’s green-infrastructure and right-of-way requirements can affect the design.",
    review: "Denver’s 2022 adopted building and fire code and its site, zoning, stormwater, and green-building review paths should be checked for the parcel.",
    distinct: "Denver infill commonly combines narrow lots, alley access, basement excavations, party-wall conditions, and redevelopment near the South Platte and Cherry Creek.",
    projects: "urban infill, basement underpinning, alley-loaded ADUs, mixed-use tenant improvements, and residential additions",
    sources: [
      { label: "Denver Community Planning and Development", url: "https://www.denvergov.org/Community/Neighborhoods/CPD-Planning" },
      { label: "Denver building codes and policies", url: "https://www.denvergov.org/My-Property/Remodeling-and-Construction/Building-Codes-Policies-Guides" },
      { label: "Denver stormwater and floodplain", url: "https://www.denvergov.org/Government/Make-a-Payment/Stormwater" },
      { label: "Colorado Division of Housing building codes", url: "https://cdola.colorado.gov/building-codes" },
      { label: "Denver Water planning and development information", url: "https://www.denverwater.org/your-water/water-supply-and-planning" },
    ],
  },
  {
    slug: "colorado-springs",
    name: "Colorado Springs",
    county: "El Paso County",
    ahj: "City of Colorado Springs Planning and Development Department",
    conditions: "Pikes Peak foothill slopes, decomposed granite and expansive soils, high wind exposure, intense hail, snow, wildfire interface, and flash-flood channels",
    utilities: "Colorado Springs Utilities controls electric, gas, water, and wastewater coordination; stormwater and regional flood-control reviews can be separate from building intake.",
    review: "Colorado Springs publishes its adopted building-code, land-use, stormwater, and hillside or wildfire review requirements; El Paso County is a different AHJ outside city limits.",
    distinct: "Colorado Springs sites can move rapidly from level urban blocks to rocky foothill grades, with wildfire defensible-space and drainage decisions affecting otherwise small additions.",
    projects: "hillside additions, military-adjacent commercial work, detached ADUs, multifamily renovations, and small industrial buildings",
    sources: [
      { label: "Colorado Springs Planning and Development", url: "https://coloradosprings.gov/planning-and-development" },
      { label: "Colorado Springs planning and development", url: "https://coloradosprings.gov/planning-and-development" },
      { label: "Colorado Springs stormwater enterprise", url: "https://coloradosprings.gov/stormwater" },
      { label: "Colorado Springs Utilities", url: "https://www.csu.org/" },
      { label: "Colorado Division of Housing building codes", url: "https://cdola.colorado.gov/building-codes" },
    ],
  },
  {
    slug: "fort-collins",
    name: "Fort Collins",
    county: "Larimer County",
    ahj: "City of Fort Collins Community Development and Neighborhood Services",
    conditions: "Cache la Poudre alluvial soils, high groundwater pockets, cold winters, hail and wind, irrigation ditches, and river and stormwater flood exposure",
    utilities: "Fort Collins Utilities, Platte River Power Authority, Coloradoan water and sewer systems, and the city’s development-review and stormwater standards shape utility and civil design.",
    review: "Fort Collins uses locally published building, land-use, stormwater, and sustainability requirements in addition to Colorado code adoption; Larimer County reviews unincorporated parcels.",
    distinct: "Fort Collins redevelopment often crosses historic irrigation infrastructure and mature neighborhoods while the city’s efficiency and low-impact-development expectations affect site and energy decisions.",
    projects: "Old Town tenant improvements, irrigation-adjacent additions, student housing, ADUs, industrial flex buildings, and neighborhood infill",
    sources: [
      { label: "Fort Collins building services", url: "https://www.fcgov.com/building/" },
      { label: "Fort Collins development review", url: "https://www.fcgov.com/developmentreview/" },
      { label: "Fort Collins Utilities development", url: "https://www.fcgov.com/utilities/" },
      { label: "Fort Collins stormwater", url: "https://www.fcgov.com/utilities/what-we-do/stormwater" },
      { label: "Colorado Division of Housing building codes", url: "https://cdola.colorado.gov/building-codes" },
    ],
  },
  {
    slug: "aurora",
    name: "Aurora",
    county: "Arapahoe, Adams, and Douglas Counties",
    ahj: "City of Aurora Community Development Department",
    conditions: "expansive Front Range clay, broad flat-to-rolling development, severe hail and wind, snow, prairie drainage, and South Platte and Sand Creek flood exposure",
    utilities: "Aurora Water, Xcel Energy, regional wastewater partners, and city stormwater and transportation standards govern many new-development and infill interfaces.",
    review: "Aurora’s building, zoning, civil, fire, and water-review checklists are parcel-specific; county authorities and neighboring municipalities govern addresses outside city jurisdiction.",
    distinct: "Aurora’s large jurisdiction spans older neighborhoods, greenfield corridors, and airport-influenced development, so utility capacity and regional drainage can matter as much as the building footprint.",
    projects: "airport-area warehouses, master-planned housing, garage conversions, ADUs, retail shells, and multifamily amenity additions",
    sources: [
      { label: "Aurora Community Development", url: "https://www.auroragov.org/city_hall/departments/planning___development_services" },
      { label: "Aurora building permits", url: "https://www.auroragov.org/business_services/building_division" },
      { label: "Aurora Water development", url: "https://www.auroragov.org/residents/water" },
      { label: "Aurora development center", url: "https://www.auroragov.org/business_services/development_center" },
      { label: "Colorado Division of Housing building codes", url: "https://cdola.colorado.gov/building-codes" },
    ],
  },
  {
    slug: "lakewood",
    name: "Lakewood",
    county: "Jefferson County",
    ahj: "City of Lakewood Planning and Development",
    conditions: "foothill-to-plains grade changes, gravel and clay fill, snow and wind, hail, wildfire edges near the hogback, and drainage toward Bear Creek and the South Platte",
    utilities: "Denver Water, Consolidated Mutual Water, Xcel Energy, Jefferson County drainage partners, and Lakewood right-of-way standards can all affect a project.",
    review: "Lakewood’s building and land-development requirements must be paired with Jefferson County records and any floodplain, watershed, or access review applicable to the address.",
    distinct: "Lakewood’s older ranch neighborhoods and west-side slopes create frequent transitions between remodels, retaining walls, mature trees, and regional trail or creek drainage constraints.",
    projects: "ranch-house additions, basement remodels, west-side retaining walls, ADUs, retail conversions, and light-industrial improvements",
    sources: [
      { label: "Lakewood Planning and Development", url: "https://www.lakewoodco.gov/Planning-and-Building" },
      { label: "Lakewood building services", url: "https://www.lakewoodco.gov/Planning-and-Building/Building-and-Construction-Services" },
      { label: "Lakewood development engineering", url: "https://www.lakewoodco.gov/Planning-and-Building/Development-Services/Engineering-Services" },
      { label: "Denver Water planning and development information", url: "https://www.denverwater.org/your-water/water-supply-and-planning" },
      { label: "Colorado Division of Housing building codes", url: "https://cdola.colorado.gov/building-codes" },
    ],
  },
];

const coloradoBatch3: Batch2StateExpansion = {
  stateSlug: "colorado",
  stateName: "Colorado",
  stateAbbrev: "CO",
  hub: {
    title: "Colorado Engineering Services for Local Permit Review",
    description: "Colorado structural, MEP, civil, energy-compliance, and PE-stamped drawing support grounded in local AHJ requirements, Front Range conditions, and project-specific professional judgment.",
    h1: "Engineering for Colorado’s Varied Building Conditions",
    kicker: "Colorado permit and design coordination",
    lede: "Colorado does not have one universal local permit path: municipalities and counties adopt code editions, amendments, land-use rules, stormwater standards, and utility processes for their jurisdictions. A useful engineering package starts with the parcel, current AHJ publications, survey and site evidence, and the responsible professional’s scope.",
    sections: [
      { heading: "State framework, local adoption", body: "The Colorado Division of Housing publishes state building-code information and local governments administer most building permits. Denver, Colorado Springs, Fort Collins, Aurora, Lakewood, and their counties can differ in adopted editions, amendments, energy requirements, fire review, floodplain process, and plan-check portals; confirm the address before design decisions are fixed." },
      { heading: "Elevation, water, and wildfire change the design", body: "Front Range and mountain projects may face snow drift, high wind, hail, seismic effects, expansive or decomposed soils, steep slopes, freeze-thaw, flash flooding, wildfire exposure, and high-altitude equipment corrections. Survey, geotechnical, floodplain, utility, and defensible-space information should be current and tied to the actual site." },
      { heading: "A correction-ready path", body: "Organize the permit record around the named AHJ, discipline responsibilities, code edition, design criteria, utility responses, and an indexed response to plan-check comments. ADUs and residential additions belong in that same coordinated workflow when they affect structure, energy, utilities, drainage, occupancy, or access; they should not be split into thin doorway pages." },
      { heading: "Water supply and wastewater are separate Colorado decisions", body: "A building permit does not establish a water right, well permit, augmentation plan, or wastewater capacity. Colorado Division of Water Resources records, the local water or sanitation district, and the AHJ may each require different documentation before a connection, septic system, or change of use proceeds. Confirm tap availability, meter location, fire-flow obligations, sewer elevation, and any well or onsite-wastewater authorization early, then carry the written responses into civil and MEP sheets." },
    ],
    faqs: [
      { question: "Does Colorado have one building department for every project?", answer: "No. Colorado provides statewide code and professional-regulation information, while a city or county generally administers the building and land-use review for its parcel. Fire, floodplain, utilities, right-of-way, and stormwater authorities may add separate reviews." },
      { question: "What Colorado site facts should be confirmed before engineering begins?", answer: "Confirm the jurisdiction and code edition, survey, soils and groundwater, snow and wind exposure, seismic criteria, floodplain, wildfire or defensible-space status, utilities, access, and the project’s occupancy and alteration scope. The responsible professional decides which investigations are necessary." },
      { question: "How should Colorado plan-check comments be handled?", answer: "Use a dated comment matrix that identifies the reviewer, response, revised sheet or calculation, and remaining field or agency dependency. A permit response is not a guarantee of approval; changed conditions, substitutions, and AHJ direction can require further professional review." },
    ],
    sources: [
      { label: "Colorado Division of Housing building codes", url: "https://cdola.colorado.gov/building-codes" },
      { label: "Colorado Department of Regulatory Agencies engineering board", url: "https://dpo.colorado.gov/Engineers" },
      { label: "Colorado Water Quality Control Division stormwater", url: "https://cdphe.colorado.gov/wqcd/stormwater" },
      { label: "Colorado Division of Homeland Security and Emergency Management flood information", url: "https://dhsem.colorado.gov/hazard-mitigation/flood" },
    ],
  },
  metros: [],
};

coloradoBatch3.metros = metros.map((local) => ({
  slug: local.slug,
  name: local.name,
  county: local.county,
  services: serviceSlugs.map((serviceSlug) => buildService(local, serviceSlug)),
}));

export { coloradoBatch3 };
export default coloradoBatch3;