import type { Batch2StateExpansion, Batch2CoreServiceSlug } from "./batch2-core-service-types";

type Metro = { slug: string; name: string; county: string; ahj: string; ahjSource: { label: string; url: string }; utility: string; conditions: string; projects: string; local: string };
type Seed = { slug: Batch2CoreServiceSlug; label: string; focus: string; angles: [string, string, string] };

const stateSources = [
  { label: "Delaware State Fire Marshal building code", url: "https://statefiremarshal.delaware.gov/building-code/" },
  { label: "Delaware DNREC stormwater", url: "https://dnrec.delaware.gov/water/stormwater/" },
  { label: "Delaware DNREC flood planning", url: "https://dnrec.delaware.gov/water/floodplains/" },
  { label: "Delaware professional engineer board", url: "https://dpr.delaware.gov/boards/engineers/" },
];
const metros: Metro[] = [
  { slug: "wilmington", name: "Wilmington", county: "New Castle County", ahj: "City of Wilmington Department of Licenses and Inspections", ahjSource: { label: "Wilmington Licenses and Inspections", url: "https://www.wilmingtonde.gov/government/city-departments/license-inspection-review" }, utility: "Wilmington Water, Artesian Water, Delmarva Power, and the City Department of Public Works", conditions: "Christina River and Brandywine Creek flood exposure, urban fill, older rowhomes, steep ravines, winter freeze-thaw, and dense overhead and underground utilities", projects: "rowhouse rehabilitation, Riverfront adaptive reuse, multifamily additions, ADUs where zoning permits, and commercial tenant improvements", local: "Wilmington zoning, historic-area and floodplain review, and Delaware State Fire Prevention Regulations" },
  { slug: "dover", name: "Dover", county: "Kent County", ahj: "City of Dover Department of Planning and Inspections", ahjSource: { label: "City of Dover Planning and Inspections", url: "https://www.cityofdover.com/Planning-Inspections" }, utility: "City of Dover water and wastewater, Chesapeake Utilities, and Delmarva Power", conditions: "flat Coastal Plain grades, sandy and silty soils, shallow groundwater, St. Jones River drainage, hurricane rainfall, and occasional snow or ice", projects: "state-capitol offices, suburban additions, accessory dwellings, small industrial buildings, and infill near downtown", local: "Dover zoning, subdivision and drainage standards, floodplain requirements, and Delaware State Fire Prevention Regulations" },
  { slug: "newark", name: "Newark", county: "New Castle County", ahj: "City of Newark Planning and Development Department", ahjSource: { label: "Newark Planning and Development", url: "https://www.newarkde.gov/163/Planning-Development" }, utility: "City of Newark water and wastewater, Delmarva Power, and Chesapeake Utilities", conditions: "Piedmont-to-Coastal-Plain transition, rolling slopes, clay and weathered rock, student-area density, creek floodplains, and heavy rain", projects: "student housing, Main Street fit-outs, university-adjacent additions, ADUs, and neighborhood redevelopment", local: "Newark zoning and site-plan review, University-area coordination where applicable, and Delaware State Fire Prevention Regulations" },
  { slug: "middletown", name: "Middletown", county: "New Castle County", ahj: "Town of Middletown Planning and Zoning Department", ahjSource: { label: "Middletown Planning and Zoning", url: "https://middletown.delaware.gov/departments/planning-zoning/" }, utility: "Town of Middletown water and sewer, Artesian Water, and Delmarva Power", conditions: "rapidly developing Coastal Plain, low-gradient drainage, variable fill, shallow groundwater, summer thunderstorms, and coastal wind", projects: "new subdivisions, townhouse additions, retail shells, residential additions, and accessory dwelling feasibility", local: "Middletown zoning, subdivision, stormwater and utility review, and Delaware State Fire Prevention Regulations" },
  { slug: "new-castle", name: "New Castle", county: "New Castle County", ahj: "New Castle County Department of Land Use", ahjSource: { label: "New Castle County Land Use", url: "https://www.newcastlede.gov/210/Land-Use" }, utility: "New Castle County sewer service, Artesian Water, Delmarva Power, and county Public Works", conditions: "Delaware River and tidal-marsh flooding, historic masonry, soft alluvial soils, flat drainage, salt exposure, and hurricane-driven rain", projects: "historic district work, airport-area commercial buildings, riverfront renovations, ADUs, and additions on older foundations", local: "New Castle County Unified Development Code, historic or coastal review where applicable, and Delaware State Fire Prevention Regulations" },
];

const seeds: Seed[] = [
  { slug: "structural-engineering", label: "Structural Engineering", focus: "load paths, existing framing, foundations, wind, snow, and additions", angles: ["A measured record of masonry, timber, steel, and prior alterations separates verified conditions from assumptions.", "Soils, flood elevations, corrosion, and Delaware wind and snow criteria are reconciled before sizing foundations or connections.", "Plan-check corrections are logged against drawings and calculations so a revised detail does not conflict with architecture or MEP."] },
  { slug: "mep-engineering", label: "MEP Engineering", focus: "HVAC, electrical service, plumbing, ventilation, controls, and utility interfaces", angles: ["Occupancy, equipment schedules, service capacity, and field-traced shafts establish a realistic Delaware MEP basis.", "Humidity, freeze protection, shallow groundwater, and coastal or river exposure affect routing, equipment, condensate, and corrosion decisions.", "Each correction from the AHJ is answered in a numbered matrix with the revised schedule, plan, calculation, or narrative identified."] },
  { slug: "civil-engineering", label: "Civil Engineering", focus: "survey, grading, stormwater, erosion, utilities, access, and floodplain coordination", angles: ["The site plan joins parcel, public frontage, utilities, outfall, and disturbance limits before a building footprint is treated as final.", "Flat Coastal Plain drainage, Piedmont slopes, alluvial soils, shallow groundwater, and flood storage drive Delaware-specific grading choices.", "Revised drainage areas, profiles, erosion notes, and maintenance responsibilities should accompany every plan-check response."] },
  { slug: "energy-compliance", label: "Energy Compliance", focus: "Delaware energy-code documentation, envelope, HVAC, lighting, controls, and alterations", angles: ["The applicable Delaware energy route is selected with occupancy, alteration scope, adopted edition, and the local reviewer.", "Heating, humid summers, wind exposure, moisture, roof solar load, and equipment schedules make local inputs more useful than a generic model.", "A correction changes the coordinated permit record: forms, envelope details, equipment schedules, and controls are revised together."] },
  { slug: "pe-stamped-drawings", label: "PE-Stamped Drawings", focus: "professional responsibility, seals, calculations, scope boundaries, and AHJ coordination", angles: ["A Delaware PE seal applies to a defined discipline and site scope, supported by field, survey, utility, and code information.", "Flood, soft soils, coastal wind, existing masonry, or specialty systems may require information before the responsible PE accepts a scope.", "Corrections and RFIs are evaluated by the responsible PE; a seal is not permission for unreviewed substitutions or field changes."] },
];

function text(s: string, m: Metro, seed: Seed) {
  return s.replaceAll("{city}", m.name).replaceAll("{ahj}", m.ahj).replaceAll("{county}", m.county).replaceAll("{utility}", m.utility).replaceAll("{conditions}", m.conditions).replaceAll("{projects}", m.projects).replaceAll("{local}", m.local).replaceAll("{focus}", seed.focus);
}
function page(m: Metro, s: Seed) {
  const bodies = [
    `${text(s.angles[0], m, s)} In {city}, the {ahj} record and measured conditions should be assembled before design decisions are fixed.`,
    `${text(s.angles[1], m, s)} This is especially relevant to {projects}; the team should confirm current survey, geotechnical, flood, and utility information.`,
    `${text(s.angles[2], m, s)} The response should preserve the accepted scope while routing technical changes through the responsible Delaware professional.`,
  ];
  const questions = [
    `What is the first ${s.label.toLowerCase()} check for {projects} in {city}?`,
    `How do {conditions} affect ${s.label.toLowerCase()}?`,
    `How should {ahj} plan-check comments be answered?`,
  ];
  const answers = [
    `Start with the address, {ahj} intake, current Delaware code and amendments, and verified existing conditions. The actual {focus} scope determines whether survey, geotechnical, utility, flood, or specialty information is needed.`,
    `They affect assumptions that cannot be selected from a statewide average. The responsible professional reconciles {conditions} with the project record, applicable code, and the receiving authority's requirements.`,
    `Log each cited correction, identify the affected sheet or calculation, issue one coordinated revision, and resubmit through {ahj}. Approval remains the AHJ's decision and is not guaranteed by engineering preparation.`,
  ];
  return {
    serviceSlug: s.slug, title: `${m.name} ${s.label} for ${m.projects}`, description: `${s.label} for ${m.name} projects, with ${m.ahj} coordination, Delaware code context, utility review, and site-specific conditions.`,
    h1: `${s.label} for ${m.name} Projects`, kicker: `${m.name} ${s.label.toLowerCase()} and permit coordination`,
    lede: `${s.label} in ${m.name} addresses ${s.focus}. The design record should match ${m.ahj}, local land-use review, Delaware requirements, and the site's physical constraints.`,
    permitAuthority: `${m.ahj} is the local authority named for this ${m.name} address. Fire, zoning, planning, public works, floodplain, environmental, and utility reviews may be parallel; the responsible Delaware PE determines the professional scope and seal.`,
    codeContext: `${m.local}. Confirm the current Delaware State Fire Prevention Regulations, adopted building and energy provisions, local amendments, and transition rules at intake.`,
    localConditions: `${m.conditions}. These conditions require current site and utility information rather than a generic Delaware assumption.`,
    projectTypes: m.projects,
    sections: bodies.map((body, i) => ({ heading: [`${m.name} ${s.label} design basis`, `${m.name} local conditions and interfaces`, `${m.name} plan-check correction workflow`][i], body: text(body, m, s) })),
    permitSteps: [
      text(`Confirm the parcel, occupancy, applicable Delaware code edition, and local checklist with {ahj}.`, m, s),
      text(`Collect survey, field, utility, flood, soil, equipment, and owner information for {projects}; coordinate with {utility}.`, m, s),
      text(`Coordinate the ${s.focus} package with architecture, fire/life safety, access, and construction phasing before submission.`, m, s),
      text(`Number every {ahj} correction, revise the affected documents, and preserve the response, inspection, testing, and closeout record.`, m, s),
    ],
    faqs: questions.map((q, i) => ({ question: text(q, m, s), answer: text(answers[i], m, s) })),
    sources: [m.ahjSource, ...stateSources],
  };
}

const delawareBatch3: Batch2StateExpansion = {
  stateSlug: "delaware", stateName: "Delaware", stateAbbrev: "DE",
  hub: {
    title: "Delaware Engineering Services for Permitted Building Projects",
    description: "Locally informed structural, MEP, civil, energy-compliance, and PE-stamped drawing support for Delaware projects.",
    h1: "Engineering for Delaware’s Coastal Plain, Cities, and River Towns", kicker: "Delaware permitting and design coordination",
    lede: "Delaware uses statewide fire-prevention and building-code frameworks, while cities, towns, and New Castle County administer land use, building, drainage, utilities, and flood review through different channels. A project record should identify the actual AHJ and carry plan-check corrections through every affected discipline.",
    sections: [
      { heading: "State requirements meet local administration", body: "The Delaware State Fire Marshal publishes the state building-code and fire-prevention framework, including current state amendments and adopted provisions. Wilmington, Dover, Newark, Middletown, and New Castle County still apply their own zoning, site, utility, right-of-way, local amendment, and inspection procedures; an address-specific checklist controls." },
      { heading: "Water, soil, wind, and flood matter", body: "Coastal Plain groundwater, flat drainage, Delaware River and tidal flooding, Christina and Brandywine watersheds, Piedmont slopes, variable fill, hurricane rainfall, and winter freeze shape civil, structural, MEP, and energy decisions. DNREC and FEMA information should be current for the parcel." },
      { heading: "Additions and ADUs stay integrated", body: "An ADU or residential addition can affect egress, fire separation, structure, HVAC, electrical capacity, sewer, grading, and energy compliance. Treating it as a small doorway page or isolated discipline can create avoidable corrections; one coordinated package is more useful." },
      { heading: "DNREC, DelDOT, and utility handoffs", body: "A Delaware site may move from municipal or county plan review to DNREC stormwater and sediment-control coverage, DelDOT approval for work affecting a state-maintained road, and a separate water, sewer, or electric capacity decision. The civil and building teams should preserve each agency's conditions in the permit matrix so an outfall, curb cut, service upgrade, or floodplain response is not assumed approved by another authority." },
    ],
    faqs: [
      { question: "Does Delaware have one building permit office?", answer: "No. State code and fire-prevention requirements interact with municipal or county intake. Wilmington, Dover, Newark, Middletown, and New Castle County have distinct AHJ and land-use routes." },
      { question: "What is a good Delaware plan-check correction workflow?", answer: "Record the citation and reviewer, revise every affected sheet or calculation, coordinate the disciplines, and resubmit a dated response through the named AHJ. The reviewer—not the engineer—decides whether the correction is accepted." },
      { question: "Do Delaware ADUs need the same review as additions?", answer: "The scope controls. Both can trigger zoning, building, fire, structural, MEP, sewer, site, and energy requirements, so the local checklist and existing conditions should be confirmed before design." },
    ],
    sources: stateSources,
  },
  metros: metros.map((m) => ({ slug: m.slug, name: m.name, county: m.county, services: seeds.map((s) => page(m, s)) })),
};
export { delawareBatch3 };
export default delawareBatch3;