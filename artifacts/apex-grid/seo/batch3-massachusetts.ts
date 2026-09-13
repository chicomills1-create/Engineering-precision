import type { Batch2StateExpansion } from "./batch2-core-service-types";

const coreServices = ["structural-engineering", "mep-engineering", "civil-engineering", "energy-compliance", "pe-stamped-drawings"] as const;
type MassachusettsLocal = {
  slug: string; name: string; county: string; ahj: string; ahjUrl: string; utility: string; utilityUrl: string;
  environmental: string; environmentalUrl: string; conditions: string; focus: string; projectTypes: string; localCode: string;
};

const sourcesFor = (p: MassachusettsLocal) => [
  { label: `${p.ahj} permitting and inspection information`, url: p.ahjUrl },
  { label: "Massachusetts 10th edition building code and 780 CMR", url: "https://www.mass.gov/info-details/780-cmr-10th-edition" },
  { label: "Massachusetts Board of Registration of Professional Engineers", url: "https://www.mass.gov/orgs/board-of-registration-of-professional-engineers-and-land-surveyors" },
  { label: `${p.utility} official utility information`, url: p.utilityUrl },
  { label: `${p.environmental} official environmental information`, url: p.environmentalUrl },
  { label: "FEMA National Flood Hazard Layer", url: "https://msc.fema.gov/portal/home" },
];

const serviceInfo = {
  "structural-engineering": {
    noun: "structural engineering", title: "Structural Engineering",
    code: "Structural documents should identify the effective 780 CMR edition, Massachusetts amendments, existing-building provisions, risk category, snow and wind criteria, seismic design category, load combinations, and special-inspection responsibilities.",
    sections: [
      ["Old fabric needs measured decisions", "Boston-area triple-deckers, mill buildings, brownstones, and coastal homes rarely match an assumed framing diagram. Field measurements, probes, archival drawings, and selective demolition should establish the actual load path before an addition, dormer, rooftop unit, or ADU is detailed."],
      ["Snow, wind, seismic, and coastal exposure", "Nor'easters, heavy snow and drifting, wind-driven rain, occasional coastal surge, and New England freeze-thaw can govern attachments and foundations. Soft marine or river deposits, fill, ledge, and variable glacial soils make a geotechnical recommendation more useful than a generic bearing value."],
      ["Correction responses preserve the record", "A Massachusetts building official may return structural comments alongside zoning, historic, fire, or special-inspection questions. The response should identify the revised sheet, calculation, code section, and field assumption; a concealed condition requires a responsible-professional decision before work continues."],
    ],
  },
  "mep-engineering": {
    noun: "mechanical, electrical, and plumbing engineering", title: "MEP Engineering",
    code: "The MEP package should state the applicable 780 CMR, Massachusetts mechanical, plumbing, electrical, energy, fire, and accessibility provisions, as well as the occupancy, ventilation, emergency-power, sprinkler, and utility assumptions accepted by the AHJ.",
    sections: [
      ["Utility coordination in older neighborhoods", "Eversource or municipal electric and gas capacity, water service size, sewer connection, fire-flow, and transformer or vault clearances should be confirmed early. A dense Boston block, mill campus, or suburban addition may have shared services that are not apparent from a site walk."],
      ["Heating, humidity, and electrification", "Cold winters, humid summers, heat-pump defrost, snow protection, indoor-air-quality requirements, and electrification upgrades affect panel capacity, refrigerant routing, condensate, ventilation, and envelope interfaces. Historic and coastal envelopes require careful moisture detailing."],
      ["Life safety and occupied buildings", "Restaurants, laboratories, healthcare, student housing, and ADUs have different exhaust, makeup-air, domestic-water, fire-alarm, accessibility, and shutdown needs. Riser diagrams and equipment schedules should be coordinated with the fire department and utility responses before plan check."],
    ],
  },
  "civil-engineering": {
    noun: "civil engineering", title: "Civil Engineering",
    code: "Site work should identify the local zoning and subdivision rules, Massachusetts Stormwater Handbook and DEP requirements, wetlands or riverfront jurisdiction, floodplain provisions, utility standards, public-way permits, and construction-stormwater obligations.",
    sections: [
      ["Stormwater is a site-specific permit question", "A Massachusetts site plan needs a defensible survey, watershed and outfall narrative, recharge or detention approach, easements, maintenance assignment, and floodplain check. A FEMA map starts the inquiry; local conservation and planning authorities can require additional wetland, riverfront, or coastal evidence."],
      ["Ledged ground and saturated fill", "Glacial till, shallow ledge, urban fill, peat, and coastal or river deposits can alternate across one parcel. Grading, infiltration, retaining walls, pavement, utility trenches, and finished-floor elevations should follow current geotechnical and groundwater information."],
      ["Public way, wetlands, and construction phasing", "Curb cuts, sidewalks, street trees, bicycle facilities, utility crossings, erosion controls, and temporary traffic changes can involve the municipality, conservation commission, DPW, and MassDOT. The plan should show accessible routes and distinguish permanent drainage from construction controls."],
    ],
  },
  "energy-compliance": {
    noun: "energy-compliance engineering", title: "Energy-Compliance Engineering",
    code: "The compliance package should name the current Massachusetts stretch-energy-code pathway where applicable, 780 CMR energy provisions, chosen prescriptive or performance method, envelope, HVAC, lighting, service-water, air-leakage, and testing assumptions.",
    sections: [
      ["The adopted path depends on the community and project", "Massachusetts municipalities may participate in specialized energy-code pathways, and project type or transition rules affect the required forms. Confirm the community's current adoption and the building official's submission checklist rather than importing a neighboring city's model."],
      ["Cold-climate envelope coordination", "Heating degree days, wind-driven rain, ice dams, freeze-thaw, summer humidity, and coastal salt exposure make continuous insulation, air control, vapor strategy, windows, ventilation, and heat-pump controls consequential. The model must match architecture and mechanical schedules."],
      ["Test results and substitutions matter", "Blower-door, duct, lighting-control, commissioning, and envelope evidence can be required at different stages. A revised window, heat pump, roof assembly, or occupancy schedule should trigger an energy review before the permit set is treated as final."],
    ],
  },
  "pe-stamped-drawings": {
    noun: "PE-stamped drawing coordination", title: "PE-Stamped Drawings",
    code: "The responsible Massachusetts PE determines the engineering scope and seal requirements, then identifies the effective 780 CMR edition, local amendments, energy pathway, existing-building provisions, special inspections, and deferred design items.",
    sections: [
      ["A Massachusetts seal is professional responsibility", "The PE needs reliable survey, field, geotechnical, architectural, equipment, and agency information before accepting defined responsibility. A stamp does not promise approval, replace an architect or land surveyor, or authorize work outside the sealed discipline."],
      ["One project can have many reviewers", "The building department, planning or zoning board, conservation commission, fire department, DPW, utility, historic commission, and state agency may each review a part of the same project. A scope matrix and source register show which documents answer which authority's question."],
      ["Plan check through closeout", "Corrections should be tracked by reviewer and sheet, with code responses and revised calculations kept together. Substitutions, RFIs, concealed framing, and delegated components require the responsible PE to decide whether observation, a calculation, or a revised seal is appropriate."],
    ],
  },
} as const;

function makeServices(p: MassachusettsLocal) {
  return coreServices.map((serviceSlug) => {
    const info = serviceInfo[serviceSlug];
    return {
      serviceSlug,
      title: `${p.name} ${info.title} for ${p.focus}`,
      description: `${info.title} for ${p.name} renovations, additions, and new construction, coordinated with ${p.ahj}, Massachusetts code, ${p.utility}, and the site's ${p.conditions}.`,
      h1: `${info.title} for ${p.name} Projects`,
      kicker: `${p.name} ${info.title.toLowerCase()} and permit coordination`,
      lede: `${p.name} work pairs ${p.conditions} with a defined local review route. ${info.title} uses verified existing conditions and agency information to coordinate ${p.focus} with the responsible professional and the actual permit record.`,
      permitAuthority: `${p.ahj} is the primary building or development authority for this ${p.name} address. Conservation, zoning, historic, fire, utility, floodplain, and state-agency reviews can be separate. The responsible Massachusetts PE and AHJ determine the discipline, seal, and submission requirements for the scope.`,
      codeContext: `${info.code} For this address, confirm ${p.localCode} with ${p.ahj}; 780 CMR and a state webpage do not replace the community's current checklist or board decision.`,
      localConditions: `${p.name} and ${p.county} require attention to ${p.conditions}. Verify those conditions with a current survey, geotechnical report, flood or wetland record, utility response, and agency correspondence.`,
      projectTypes: `${p.projectTypes} ADUs, residential additions, tenant improvements, and adaptive-reuse work should be screened for zoning, historic, conservation, occupancy, fire, energy, and existing-service triggers before the discipline package is assembled.`,
      sections: info.sections.map(([heading, body]) => ({ heading: `${p.name}: ${heading}`, body: `${body} For ${p.focus}, coordinate this decision with ${p.ahj}, ${p.utility}, and ${p.environmental}; nearby work or a generic city checklist is not evidence for this parcel.` })),
      permitSteps: [
        `Confirm the ${p.name} address, ${p.ahj} jurisdiction, ${p.localCode}, occupancy, and applicable zoning, historic, conservation, fire, floodplain, and utility handoffs before fixing the ${info.noun} scope.`,
        `Reconcile ${p.focus}, measured conditions, ${p.utility} capacity information, and ${p.environmental} requirements with the architectural and engineering sheets.`,
        `Submit the ${info.title.toLowerCase()} documents through the named AHJ path, carrying ${p.conditions} and any ADU or residential-addition interfaces into calculations, schedules, and details.`,
        `Log plan-check corrections by authority and sheet, return a coordinated response to ${p.ahj}, and document inspections, substitutions, concealed conditions, and closeout instead of assuming approval.`,
      ],
      faqs: [
        { question: `Who reviews ${p.name} ${info.title.toLowerCase()}?`, answer: `${p.ahj} handles the primary local review, while ${p.county}, the fire department, conservation commission, utility, historic authority, or a state agency may control related work. Confirm the address-specific path before filing.` },
        { question: `How should an ADU or addition in ${p.name} be screened?`, answer: `Verify zoning and occupancy, existing structure and utilities, 780 CMR and energy-code triggers, fire and accessibility impacts, ${p.conditions}, and the current ${p.ahj} checklist. The responsible professional decides whether a PE document or seal is appropriate.` },
        { question: `How should a team answer Massachusetts plan-check corrections?`, answer: `Map every comment to a revised sheet, calculation, code response, or agency document; preserve the response log and coordinate all disciplines. A changed field condition or substitution should be sent to the responsible professional before proceeding.` },
      ],
      sources: sourcesFor(p),
    };
  });
}

const massachusettsBatch3: Batch2StateExpansion = {
  stateSlug: "massachusetts", stateName: "Massachusetts", stateAbbrev: "MA",
  hub: {
    title: "Massachusetts Engineering Services for Code, Site, and Permit Review",
    description: "Locally specific structural, MEP, civil, energy-compliance, and PE-stamped drawing coordination for Massachusetts projects, including community code pathways, conservation review, utilities, and coastal or winter conditions.",
    h1: "Engineering for Massachusetts Communities and Existing Buildings",
    kicker: "Massachusetts code, permit, and professional-engineering coordination",
    lede: "Massachusetts projects use the statewide building-code framework but move through community building officials, zoning boards, conservation commissions, fire departments, utilities, and sometimes state agencies. The useful starting point is the exact address, community energy-code status, existing fabric, and site-water record.",
    sections: [
      { heading: "One state code, many municipal gates", body: "780 CMR and Massachusetts amendments provide a common building-code framework, while municipalities administer permits and may participate in distinct energy-code pathways. Boston, Cambridge, Worcester, Springfield, and Lowell each have different intake, zoning, historic, utility, and public-way interfaces." },
      { heading: "New England exposure is not generic", body: "Snow and ice, nor'easter wind, coastal surge, salt air, freeze-thaw, ledge, glacial soils, urban fill, wetlands, and river corridors can all change the design. Current survey, geotechnical, flood, wetland, and utility records should support the assumptions." },
      { heading: "Plan check includes the correction loop", body: "A complete package keeps zoning, conservation, fire, utility, energy, accessibility, and engineering responses coordinated. ADUs and residential additions need a real existing-condition and occupancy review; they should not be separated into thin doorway pages or treated as automatic approvals." },
      { heading: "Electric-service upgrades are a separate handoff", body: "A Massachusetts electrification, laboratory, or multifamily project may need an Eversource, National Grid, or municipal-lighting service review for transformer space, feeder capacity, metering, gas retirement, and interconnection. That utility decision is separate from 780 CMR plan approval. The design team should carry the utility application, municipal public-way work, fire-access implications, and revised load letter into the permit correction log." },
    ],
    faqs: [
      { question: "Does 780 CMR mean every Massachusetts community uses the same permit process?", answer: "No. 780 CMR establishes the statewide code framework, but each community administers permits and may add zoning, historic, conservation, public-way, utility, and local energy-code steps. Confirm the address-specific AHJ and current edition." },
      { question: "When do conservation or flood questions join a building permit?", answer: "Wetlands, riverfront, coastal, floodplain, drainage, or disturbance conditions can trigger local conservation or other environmental review. The building official and conservation authority determine the applicable path using current site information." },
      { question: "Who decides whether a Massachusetts project needs a PE seal?", answer: "The responsible Massachusetts PE evaluates the engineering scope and professional-practice requirements, while the AHJ identifies what it wants submitted. Discipline, responsible charge, seal format, and project boundaries should be settled before filing." },
    ],
    sources: [
      { label: "Massachusetts 780 CMR 10th edition", url: "https://www.mass.gov/info-details/780-cmr-10th-edition" },
      { label: "Massachusetts Board of Professional Engineers", url: "https://www.mass.gov/orgs/board-of-registration-of-professional-engineers-and-land-surveyors" },
      { label: "Massachusetts Department of Environmental Protection wetlands", url: "https://www.mass.gov/orgs/massachusetts-department-of-environmental-protection" },
      { label: "Massachusetts Stormwater Handbook", url: "https://www.mass.gov/guides/massachusetts-stormwater-handbook-and-stormwater-standards" },
      { label: "FEMA National Flood Hazard Layer", url: "https://msc.fema.gov/portal/home" },
    ],
  },
  metros: [
    { slug: "boston", name: "Boston", county: "Suffolk County", ahj: "City of Boston Inspectional Services Department", ahjUrl: "https://www.boston.gov/departments/inspectional-services", utility: "Eversource Energy", utilityUrl: "https://www.eversource.com/", environmental: "Boston Conservation Commission", environmentalUrl: "https://www.boston.gov/departments/environment/conservation-commission", conditions: "dense historic fabric, coastal and tidal flood exposure, urban fill, salt air, snow, nor'easter wind, and constrained utility corridors", focus: "downtown adaptive reuse, neighborhood infill, and waterfront resilience", projectTypes: "triple-decker additions, ADUs, historic storefronts, lab and office fit-outs, multifamily renovations, and rooftop equipment", localCode: "Boston’s current building, zoning, landmark, flood-resilience, energy, and ISD submission requirements" },
    { slug: "worcester", name: "Worcester", county: "Worcester County", ahj: "City of Worcester Division of Inspectional Services", ahjUrl: "https://www.worcesterma.gov/inspectional-services", utility: "National Grid Massachusetts", utilityUrl: "https://www.nationalgridus.com/ma-home", environmental: "Massachusetts Department of Environmental Protection", environmentalUrl: "https://www.mass.gov/orgs/massachusetts-department-of-environmental-protection", conditions: "hilly glacial terrain, ledge and till, heavy snow, freeze-thaw, older mill buildings, and headwater drainage", focus: "canal-district redevelopment, healthcare and university expansion, and neighborhood rehabilitation", projectTypes: "mill conversions, ADUs, porch and foundation repairs, medical offices, small manufacturers, and institutional additions", localCode: "Worcester’s adopted zoning, building, stormwater, historic, energy, and inspectional-services requirements" },
    { slug: "springfield", name: "Springfield", county: "Hampden County", ahj: "City of Springfield Office of Consumer Affairs and Licensing / Building Division", ahjUrl: "https://www.springfield-ma.gov/ocall/building", utility: "Eversource Energy", utilityUrl: "https://www.eversource.com/", environmental: "Connecticut River Stormwater Committee", environmentalUrl: "https://www.springfield-ma.gov/dpw/stormwater", conditions: "Connecticut River floodplain, urban fill, soft alluvial deposits, winter snow, aging utility systems, and severe summer rainfall", focus: "river-valley redevelopment, Main Street reuse, and neighborhood housing repair", projectTypes: "residential additions and ADUs, historic commercial interiors, schools, warehouse reuse, community facilities, and flood-aware site work", localCode: "Springfield’s building, zoning, floodplain, stormwater, historic, and building-division procedures" },
    { slug: "cambridge", name: "Cambridge", county: "Middlesex County", ahj: "City of Cambridge Inspectional Services Department", ahjUrl: "https://www.cambridgema.gov/inspection", utility: "City of Cambridge Water Department and Eversource", utilityUrl: "https://www.cambridgema.gov/Water", environmental: "Cambridge Community Development Department floodplain and environmental review", environmentalUrl: "https://www.cambridgema.gov/CDD", conditions: "dense urban infill, shallow groundwater and fill, Charles River flood exposure, strict public-way constraints, snow, and heat-island effects", focus: "research-lab conversions, university-adjacent housing, and net-zero-oriented infill", projectTypes: "ADUs and additions, laboratories, life-science tenant improvements, multifamily retrofits, restaurants, and historic homes", localCode: "Cambridge zoning, building, energy, flood-resilience, historic, utility, and public-way requirements" },
    { slug: "lowell", name: "Lowell", county: "Middlesex County", ahj: "City of Lowell Inspectional Services Department", ahjUrl: "https://www.lowellma.gov/179/Inspectional-Services", utility: "Lowell Regional Water Utility and National Grid", utilityUrl: "https://www.lowellma.gov/376/Water-Utility", environmental: "Massachusetts Department of Environmental Protection", environmentalUrl: "https://www.mass.gov/orgs/massachusetts-department-of-environmental-protection", conditions: "Merrimack and Concord river floodplains, historic mill masonry, urban fill, snow and ice, and old combined utility infrastructure", focus: "canal and mill rehabilitation, downtown housing, and river-corridor adaptation", projectTypes: "mill apartments, storefronts, ADUs, residential additions, small industrial fit-outs, and civic renovations", localCode: "Lowell’s adopted building, zoning, historic-district, floodplain, stormwater, energy, and inspectional-services rules" },
  ].map((p) => ({ ...p, services: makeServices(p) })),
};

export { massachusettsBatch3 };
export default massachusettsBatch3;