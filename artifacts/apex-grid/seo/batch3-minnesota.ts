import type { Batch2StateExpansion } from "./batch2-core-service-types";

const coreServices = ["structural-engineering", "mep-engineering", "civil-engineering", "energy-compliance", "pe-stamped-drawings"] as const;
type MinnesotaLocal = {
  slug: string; name: string; county: string; ahj: string; ahjUrl: string; utility: string; utilityUrl: string;
  environmental: string; environmentalUrl: string; conditions: string; focus: string; projectTypes: string; localCode: string;
};

const sourcesFor = (p: MinnesotaLocal) => [
  { label: `${p.ahj} official building and development information`, url: p.ahjUrl },
  { label: "Minnesota Department of Labor and Industry building codes", url: "https://www.dli.mn.gov/business/building-codes-and-laws" },
  { label: "Minnesota Board of Architecture, Engineering, Land Surveying, Landscape Architecture, Geoscience and Interior Design", url: "https://mn.gov/aelslag/" },
  { label: `${p.utility} official utility information`, url: p.utilityUrl },
  { label: `${p.environmental} official environmental information`, url: p.environmentalUrl },
  { label: "FEMA National Flood Hazard Layer", url: "https://msc.fema.gov/portal/home" },
];

const serviceInfo = {
  "structural-engineering": {
    noun: "structural engineering", title: "Structural Engineering",
    code: "Structural documents should identify the effective Minnesota State Building Code edition and amendments, snow and ice loads, wind, seismic criteria, frost depth, risk category, existing-building provisions, and special-inspection needs.",
    sections: [
      ["Cold-climate existing conditions", "Older Minneapolis and St. Paul housing, lakefront cabins, downtown masonry, and industrial buildings often conceal altered framing, settlement, or water damage. Field verification, permit history, probes, and selective demolition should precede decisions about a new opening, rooftop load, addition, or ADU."],
      ["Snow, frost, soils, and freeze-thaw", "Deep frost, snow drift, ice, wind, spring heave, soft lake or river deposits, and glacial till affect foundations, roof attachments, retaining walls, and exterior stairs. A geotechnical recommendation and current elevations should be reconciled with the structural load path."],
      ["Plan review and field changes", "Minnesota building officials may coordinate structural comments with zoning, energy, floodplain, or historic review. Each response should identify the revised sheet and calculation; concealed rot, unexpected footing depth, or a contractor substitution needs a responsible-professional decision before proceeding."],
    ],
  },
  "mep-engineering": {
    noun: "mechanical, electrical, and plumbing engineering", title: "MEP Engineering",
    code: "The MEP set should state the Minnesota code editions and amendments for mechanical, plumbing, electrical, energy, fuel gas, fire protection, ventilation, accessibility, occupancy, and emergency power accepted by the AHJ.",
    sections: [
      ["Service capacity before equipment selection", "Xcel Energy or a municipal utility, water and sewer owner, fire-flow source, transformer location, and gas or electric service constraints should be contacted before a high-load renovation is finalized. Records from an adjacent property are not proof of capacity."],
      ["Systems must survive Minnesota seasons", "Very cold winter design, summer humidity, snow blockage, freeze protection, ventilation heat recovery, combustion air, condensate, and roof penetrations all affect the MEP design. Rural edges may also require well, septic, or private utility coordination."],
      ["Occupied buildings and life safety", "Restaurants, clinics, laboratories, multifamily buildings, and ADUs have different exhaust, makeup-air, domestic-water, sprinkler, fire-alarm, accessibility, and shutdown needs. Equipment schedules and risers should match the architectural and fire review package."],
    ],
  },
  "civil-engineering": {
    noun: "civil engineering", title: "Civil Engineering",
    code: "Civil documents should identify the city or county development ordinance, Minnesota Stormwater Manual and MPCA permit requirements, watershed or drainage-district rules, floodplain provisions, utility standards, right-of-way permits, and erosion-control obligations.",
    sections: [
      ["Snowmelt and stormwater share the site", "A Minnesota civil plan should tie survey elevations, drainage areas, inlets, snow-storage areas, infiltration or detention, outlet protection, maintenance, and floodplain status together. Spring runoff can expose a weak grading concept even when a summer inspection looks dry."],
      ["Glacial ground is not uniform", "Sandy outwash, clay till, peat, fill, shallow bedrock, and lake or river deposits can vary across a parcel. Geotechnical information should guide infiltration, pavement, retaining walls, utility trenches, finished floors, and construction dewatering."],
      ["Right-of-way and construction phasing", "Sidewalks, curb cuts, trails, alleys, hydrants, utility crossings, street trees, and winter erosion controls can bring public works, watershed, or county review into a building project. Show accessible routes and keep temporary sediment controls distinct from the permanent drainage system."],
    ],
  },
  "energy-compliance": {
    noun: "energy-compliance engineering", title: "Energy-Compliance Engineering",
    code: "The compliance record should name the effective Minnesota energy-code edition and amendments, selected prescriptive or performance method, climate-zone inputs, envelope, HVAC, lighting, service-water, air-sealing, and testing assumptions.",
    sections: [
      ["Minnesota code is a statewide framework with local intake", "The Department of Labor and Industry publishes the state code while local building officials administer permits and may apply local zoning, historic, floodplain, or utility requirements. Confirm the edition and forms accepted for the project's transition date and alteration scope."],
      ["Heating dominates, but summer design matters", "Cold winters, shoulder-season swings, summer humidity, solar gain, ice dams, air leakage, and ventilation heat recovery affect both modeled performance and durability. Envelope and mechanical schedules should use the same window, insulation, infiltration, and control assumptions."],
      ["Compliance is carried into commissioning", "Heat pumps, boilers, controls, lighting, ventilation, and envelope substitutions can change the result after plan approval. Preserve the model or worksheets, update affected forms, and assign functional testing rather than treating the permit review as the final energy check."],
    ],
  },
  "pe-stamped-drawings": {
    noun: "PE-stamped drawing coordination", title: "PE-Stamped Drawings",
    code: "The responsible Minnesota PE determines engineering responsibility and seal needs, then documents the effective Minnesota code edition, local amendments, existing-building provisions, energy path, special inspections, and delegated or deferred design.",
    sections: [
      ["Professional responsibility begins with site facts", "A PE needs current survey, geotechnical, existing-condition, architectural, utility, equipment, and agency information before accepting responsibility. A seal is not a guarantee of approval, a construction authorization, or a replacement for architectural, land-surveying, or specialty scope."],
      ["One Minnesota project can have several reviewers", "The local building department, planning office, fire authority, watershed district, utility, county, and state environmental agencies may review different portions. A responsibility matrix and source register keep each response attached to the authority that requested it."],
      ["A correction log protects construction", "Plan-check comments, revised calculations, RFI decisions, substitutions, concealed conditions, and delegated components should be logged against the sealed set. The responsible PE determines when observation or a revised sheet is required before the contractor continues."],
    ],
  },
} as const;

function makeServices(p: MinnesotaLocal) {
  return coreServices.map((serviceSlug) => {
    const info = serviceInfo[serviceSlug];
    return {
      serviceSlug,
      title: `${p.name}, Minnesota ${info.title} for ${p.focus}`,
      description: `${info.title} for ${p.name}, Minnesota projects, coordinated with ${p.ahj}, Minnesota code, ${p.utility}, and the local realities of ${p.conditions}.`,
      h1: `${info.title} for ${p.name}, Minnesota Projects`,
      kicker: `${p.name} ${info.title.toLowerCase()} and permit coordination`,
      lede: `${p.name} work combines ${p.conditions} with a city-specific review record. ${info.title} begins with verified existing and site conditions, then aligns ${p.focus} with ${p.ahj}, ${p.utility}, and the responsible professional.`,
      permitAuthority: `${p.ahj} is the primary local building or development authority for this address. Planning, fire, watershed, floodplain, utility, environmental, and right-of-way reviews can be separate. The responsible Minnesota PE and AHJ determine the discipline, seal, and submission requirements.`,
      codeContext: `${info.code} Confirm ${p.localCode} and the current intake checklist with ${p.ahj}; a statewide code page does not answer address-specific zoning, flood, utility, or local submission questions.`,
      localConditions: `${p.name} and ${p.county} require attention to ${p.conditions}. Verify those conditions with current survey, geotechnical, floodplain, utility, and agency records rather than importing assumptions from another Minnesota community.`,
      projectTypes: `${p.projectTypes} ADUs, residential additions, tenant improvements, and small commercial work should be screened for occupancy, energy, fire, existing-service, zoning, and winter-construction impacts before documents are finalized.`,
      sections: info.sections.map(([heading, body]) => ({ heading: `${p.name}: ${heading}`, body: `${body} For ${p.focus}, coordinate this issue with ${p.ahj}, ${p.utility}, and ${p.environmental}; the local record controls.` })),
      permitSteps: [
        `Confirm the ${p.name} address, ${p.ahj} jurisdiction, ${p.localCode}, occupancy, and applicable zoning, fire, watershed, floodplain, environmental, utility, and right-of-way handoffs before fixing the ${info.noun} scope.`,
        `Reconcile ${p.focus}, measured conditions, ${p.utility} capacity information, and ${p.environmental} requirements with architectural and engineering sheets, including winter and snow-management constraints.`,
        `Submit the ${info.title.toLowerCase()} package through the named AHJ path, carrying ${p.conditions} and any ADU or residential-addition interfaces into schedules, calculations, and details.`,
        `Track plan-check corrections by reviewer and sheet, return a coordinated response to ${p.ahj}, and document inspections, substitutions, concealed conditions, and closeout rather than assuming approval.`,
      ],
      faqs: [
        { question: `Which authority reviews ${p.name} ${info.title.toLowerCase()}?`, answer: `${p.ahj} handles the primary local record, while ${p.county}, fire, watershed, floodplain, utility, environmental, or right-of-way authorities may review related work. Confirm the address-specific path before filing.` },
        { question: `What does an ${p.name} ADU or residential addition need before plan check?`, answer: `Verify zoning and occupancy, existing framing and services, Minnesota code and energy triggers, fire and accessibility impacts, ${p.conditions}, and the current ${p.ahj} checklist. The responsible professional determines whether PE documents or a seal are appropriate.` },
        { question: `How should Minnesota plan-check corrections be handled?`, answer: `Map each comment to a sheet, calculation, code response, or agency document; submit a coordinated revision and preserve the response log. A changed field condition or substitution should be escalated to the responsible professional before proceeding.` },
      ],
      sources: sourcesFor(p),
    };
  });
}

const minnesotaBatch3: Batch2StateExpansion = {
  stateSlug: "minnesota", stateName: "Minnesota", stateAbbrev: "MN",
  hub: {
    title: "Minnesota Engineering Services for Building, Site, and Energy Review",
    description: "Minnesota structural, MEP, civil, energy-compliance, and PE-stamped drawing coordination grounded in the state code, local AHJ, winter conditions, watershed requirements, and actual utility records.",
    h1: "Engineering for Minnesota’s Winter and Watershed Conditions",
    kicker: "Minnesota code, permit, and professional-engineering coordination",
    lede: "Minnesota's statewide building-code framework is administered through local building departments that also coordinate zoning, fire, floodplain, watershed, utility, and public-way reviews. A useful project record starts with the exact jurisdiction, code edition, winter design inputs, existing conditions, and watershed.",
    sections: [
      { heading: "State code, local administration", body: "The Minnesota Department of Labor and Industry publishes the state building-code framework, while cities and counties receive permits and administer local development standards. Minneapolis, St. Paul, Rochester, Duluth, and Bloomington each have different portals, overlays, utility interfaces, and review sequences." },
      { heading: "Winter is a structural and civil issue", body: "Deep frost, snow and ice, freeze-thaw, spring runoff, cold-weather construction, lake or river deposits, glacial till, peat, and urban fill all affect design. Current survey, geotechnical, floodplain, watershed, and utility sources should support project assumptions." },
      { heading: "Corrections are part of the service", body: "A reviewable package connects zoning, occupancy, energy, drainage, fire, utilities, engineering calculations, and construction changes. ADUs and residential additions need a real existing-condition assessment and correction workflow, not a generic promise or a separate thin doorway." },
      { heading: "Watershed and construction-stormwater permits", body: "A Minnesota earth-disturbance project can require MPCA construction-stormwater coverage, a stormwater pollution prevention plan, and a local watershed-district or municipality permit before grading. Nine Mile Creek, Ramsey-Washington, and other watershed authorities may review volume, infiltration, wetlands, and maintenance separately from the building official. The civil package should reconcile those comments with winter erosion controls, utility locates, and the contractor's inspection record." },
    ],
    faqs: [
      { question: "Does Minnesota's statewide code eliminate local review differences?", answer: "No. The Department of Labor and Industry publishes the state code, while local authorities administer building and development permits and may add zoning, watershed, floodplain, historic, utility, and right-of-way requirements. Confirm the parcel's AHJ and current edition." },
      { question: "Why do snow and frost affect more than foundations?", answer: "Snow drift and ice affect roofs and attachments; frost and freeze-thaw affect pavements, utilities, stairs, and footings; spring runoff affects grading and erosion. The appropriate engineer uses site, climate, and geotechnical evidence for the scope." },
      { question: "Who determines whether Minnesota engineering documents need a PE seal?", answer: "The responsible Minnesota PE evaluates professional responsibility and the engineering scope, while the local AHJ states what it expects in the permit package. Discipline, responsible charge, seal method, and project boundaries should be confirmed before filing." },
    ],
    sources: [
      { label: "Minnesota Department of Labor and Industry building codes", url: "https://www.dli.mn.gov/business/building-codes-and-laws" },
      { label: "Minnesota AELSLAG licensing board", url: "https://mn.gov/aelslag/" },
      { label: "Minnesota Pollution Control Agency stormwater", url: "https://www.pca.state.mn.us/business-with-us/stormwater" },
      { label: "Minnesota Department of Natural Resources floodplain information", url: "https://www.dnr.state.mn.us/waters/watermgmt_section/floodplain/index.html" },
      { label: "FEMA National Flood Hazard Layer", url: "https://msc.fema.gov/portal/home" },
    ],
  },
  metros: [
    { slug: "minneapolis", name: "Minneapolis", county: "Hennepin County", ahj: "City of Minneapolis Community Planning and Economic Development", ahjUrl: "https://www.minneapolismn.gov/government/departments/cped/", utility: "CenterPoint Energy and Xcel Energy", utilityUrl: "https://www.xcelenergy.com/", environmental: "Minneapolis Surface Waters and Sewers", environmentalUrl: "https://www.minneapolismn.gov/government/departments/public-works/surface-water-sewers/", conditions: "dense urban infill, glacial and urban fill, Mississippi and chain-of-lakes flood questions, deep frost, snow, and aging combined utility corridors", focus: "North Loop and neighborhood adaptive reuse, housing additions, and transit-oriented infill", projectTypes: "duplex conversions, ADUs, porches and additions, restaurants, warehouse-to-office work, and multifamily renovations", localCode: "Minneapolis adopted building, zoning, stormwater, floodplain, energy, and CPED permit requirements" },
    { slug: "saint-paul", name: "Saint Paul", county: "Ramsey County", ahj: "City of Saint Paul Department of Safety and Inspections", ahjUrl: "https://www.stpaul.gov/departments/safety-inspections", utility: "Xcel Energy and Saint Paul Regional Water Services", utilityUrl: "https://www.stpaul.gov/departments/saint-paul-regional-water-services", environmental: "Ramsey-Washington Metro Watershed District", environmentalUrl: "https://rwmwd.org/", conditions: "Mississippi and Como watershed drainage, bluff and ravine terrain, clay and fill, deep frost, snow, historic housing, and older sewers", focus: "historic neighborhoods, Highland Park reinvestment, and river-edge redevelopment", projectTypes: "historic-home additions, ADUs, multifamily rehabs, institutional work, storefronts, and river-corridor sites", localCode: "Saint Paul zoning, building, historic, stormwater, floodplain, utility, and DSI submittal requirements" },
    { slug: "rochester", name: "Rochester", county: "Olmsted County", ahj: "City of Rochester Community Development", ahjUrl: "https://www.rochestermn.gov/government/departments/community-development", utility: "Rochester Public Utilities", utilityUrl: "https://www.rpu.org/", environmental: "Olmsted County Environmental Resources", environmentalUrl: "https://www.olmstedcounty.gov/residents/soil-water-resources", conditions: "rolling karst-influenced terrain, cold winters, flash runoff, sinkhole and groundwater questions, and rapid healthcare-campus growth", focus: "medical-campus expansion, downtown housing, and suburban infill", projectTypes: "medical offices, ADUs, residential additions, laboratories, small industrial buildings, and subdivision improvements", localCode: "Rochester adopted building, zoning, stormwater, floodplain, utility, and community-development standards" },
    { slug: "duluth", name: "Duluth", county: "St. Louis County", ahj: "City of Duluth Construction Services and Inspections", ahjUrl: "https://duluthmn.gov/inspections/", utility: "Minnesota Power and Duluth Public Works", utilityUrl: "https://duluthmn.gov/public-works/", environmental: "Minnesota Pollution Control Agency", environmentalUrl: "https://www.pca.state.mn.us/", conditions: "steep Lake Superior bluff terrain, heavy lake-effect snow, freeze-thaw, wind exposure, clay and rock cuts, and coastal erosion or flood questions", focus: "hillside infill, port and industrial reuse, and lakefront resilience", projectTypes: "steep-lot additions, ADUs, port warehouses, institutional retrofits, hillside retaining work, and lakefront commercial projects", localCode: "Duluth building, hillside, stormwater, floodplain, shoreline, zoning, and construction-services requirements" },
    { slug: "bloomington", name: "Bloomington", county: "Hennepin County", ahj: "City of Bloomington Community Development Department", ahjUrl: "https://www.bloomingtonmn.gov/cd", utility: "Bloomington Public Works and Xcel Energy", utilityUrl: "https://www.bloomingtonmn.gov/pw", environmental: "Nine Mile Creek Watershed District", environmentalUrl: "https://www.ninemilecreek.org/", conditions: "airport-adjacent development, sandy and clay soils, Nine Mile Creek drainage, deep frost, snow, and major commercial redevelopment", focus: "airport-area hospitality, office redevelopment, and creek-sensitive commercial infill", projectTypes: "hotel renovations, ADUs, office conversions, retail pads, multifamily additions, and industrial tenant improvements", localCode: "Bloomington zoning, building, stormwater, airport-area, floodplain, utility, and community-development requirements" },
  ].map((p) => ({ ...p, services: makeServices(p) })),
};

export { minnesotaBatch3 };
export default minnesotaBatch3;