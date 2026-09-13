import type { Batch2StateExpansion } from "./batch2-core-service-types";

const coreServices = ["structural-engineering", "mep-engineering", "civil-engineering", "energy-compliance", "pe-stamped-drawings"] as const;
type HawaiiLocal = {
  slug: string; name: string; county: string; ahj: string; ahjUrl: string; utility: string; utilityUrl: string;
  environmental: string; environmentalUrl: string; conditions: string; focus: string; projectTypes: string; localCode: string;
};

const sourcesFor = (p: HawaiiLocal) => [
  { label: `${p.ahj} official permitting and development information`, url: p.ahjUrl },
  { label: "Hawaii State Building Code Council", url: "https://dbedt.hawaii.gov/hcda/building-code/" },
  { label: "Hawaii Professional and Vocational Licensing engineering board", url: "https://cca.hawaii.gov/pvl/boards/engineer/" },
  { label: `${p.utility} official utility information`, url: p.utilityUrl },
  { label: `${p.environmental} official environmental information`, url: p.environmentalUrl },
  { label: "FEMA National Flood Hazard Layer", url: "https://msc.fema.gov/portal/home" },
];

const serviceInfo = {
  "structural-engineering": {
    noun: "structural engineering", title: "Structural Engineering",
    code: "Structural documents should identify the effective Hawaii State Building Code and county amendments, risk category, hurricane wind, seismic, corrosion, load combinations, existing-building provisions, and special-inspection responsibilities.",
    sections: [
      ["Island construction needs direct observation", "Salt air, termites, prior unpermitted alterations, lava-rock foundations, aging plantation or coastal buildings, and difficult material logistics make photographs alone unreliable. Field measurements, probes, archival records, and a clear existing-condition log should precede a new opening, addition, rooftop load, or ADU."],
      ["Wind, seismic, water, and corrosion", "Hurricane wind and rain, high seismic exposure, tsunami and coastal inundation, volcanic ash or gases, steep slopes, and salt-laden air affect load paths, connectors, roofs, foundations, and durability. Soil, lava flow, fill, groundwater, and drainage conditions should be evaluated for the actual island site."],
      ["Plan check and construction changes", "County building review can occur alongside planning, fire, flood, SMA, shoreline, wastewater, and utility questions. Comments should be answered by sheet and code topic; concealed corrosion, unexpected lava or footing conditions, and substitutions should return to the responsible PE before work continues."],
    ],
  },
  "mep-engineering": {
    noun: "mechanical, electrical, and plumbing engineering", title: "MEP Engineering",
    code: "The MEP package should state the effective Hawaii and county-adopted mechanical, plumbing, electrical, energy, fire, accessibility, and public-health provisions, along with occupancy, ventilation, emergency power, and utility assumptions.",
    sections: [
      ["Island utility capacity is a design constraint", "Hawaiian Electric, Kauai Island Utility Cooperative, Maui Electric, county water departments, sewer agencies, and private wastewater systems each have address-specific capacity and connection requirements. Equipment selection should follow a written utility inquiry, not a mainland assumption about service size or redundancy."],
      ["Trade winds, humidity, and salt air", "Warm-humid air, trade winds, wind-driven rain, salt corrosion, high solar gain, volcanic vog, and limited mechanical replacement inventory affect ventilation, filtration, heat pumps, condensate, corrosion protection, roof penetrations, and controls. Island elevation changes can create different design temperatures in a short distance."],
      ["Life safety in remote and occupied buildings", "Hotels, restaurants, clinics, multifamily buildings, and ADUs have distinct exhaust, makeup-air, domestic-water, fire, accessibility, emergency-power, and shutdown needs. Equipment schedules, risers, utility letters, and fire review should agree before the county plan set is submitted."],
    ],
  },
  "civil-engineering": {
    noun: "civil engineering", title: "Civil Engineering",
    code: "Civil documents should identify county zoning and subdivision rules, Hawaii Department of Health and county stormwater requirements, shoreline or SMA and floodplain triggers, grading and erosion standards, water and wastewater approvals, and any state or county right-of-way permit.",
    sections: [
      ["Rainfall changes quickly across an island", "A civil plan should connect survey, drainage areas, intensity assumptions, outfalls, detention or infiltration, easements, maintenance, and flood or shoreline status. A FEMA map is only a starting point; county floodplain, DLNR, SMA, stream, and coastal processes may add review."],
      ["Lava, steep slopes, and sensitive waters", "Basalt, ʻaʻā and pāhoehoe lava, shallow soils, perched groundwater, steep cuts, erosion, and coral or coastal deposits can affect foundations, infiltration, retaining walls, utilities, and roads. Geotechnical, watershed, and environmental information should be matched to the island and elevation."],
      ["Access, shoreline, and public infrastructure", "Driveways, fire apparatus, narrow roads, utility crossings, drainage channels, shoreline setbacks, construction staging, and imported materials can involve different county and state authorities. Plans should preserve accessible routes and distinguish temporary erosion measures from permanent drainage and landscaping."],
    ],
  },
  "energy-compliance": {
    noun: "energy-compliance engineering", title: "Energy-Compliance Engineering",
    code: "The compliance record should identify the effective Hawaii energy-code edition and county adoption, chosen prescriptive or performance route, envelope, HVAC, lighting, service-water, solar-readiness, air-leakage, and testing assumptions.",
    sections: [
      ["Hawaii code still meets county intake", "The Hawaii State Building Code Council provides a statewide framework while counties administer permits and may have amendments, special districts, SMA reviews, and different forms. Confirm the effective edition and pathway with the county AHJ before modeling an addition, ADU, or alteration."],
      ["Cooling and moisture are not the whole climate story", "Trade-wind ventilation, solar exposure, humidity, vog, salt air, high-elevation nights, hurricane rain, and hot-water demand affect envelope, shading, heat-pump, filtration, controls, and photovoltaic coordination. A model should use island-specific weather and actual operating schedules."],
      ["Equipment availability and commissioning", "A late substitution may have different efficiency, refrigerant, electrical, corrosion, or controls characteristics. Preserve the compliance worksheets, update the permit record, and assign functional testing; code documentation and an optional utility or renewable incentive are separate questions."],
    ],
  },
  "pe-stamped-drawings": {
    noun: "PE-stamped drawing coordination", title: "PE-Stamped Drawings",
    code: "The responsible Hawaii PE determines engineering responsibility and seal needs, then documents the effective state and county code, wind and seismic criteria, coastal or flood overlays, special inspections, existing-building provisions, and deferred design.",
    sections: [
      ["A seal requires island-specific evidence", "A PE needs current survey, field observations, geotechnical and lava or slope information, utility responses, equipment data, and agency correspondence before accepting responsibility. A stamp is not a guarantee, construction authorization, or substitute for an architect, land surveyor, contractor, or specialty consultant."],
      ["County and state agency interfaces", "The county building and planning offices may be joined by fire, water, wastewater, shoreline or SMA, DLNR, DOH, utility, floodplain, and public-works reviewers. A scope matrix identifies which sheets answer each authority and where a separate professional's responsibility begins."],
      ["Correction log through construction", "Comments, revised calculations, RFIs, material substitutions, corrosion or concealed conditions, and delegated components should be tracked against the sealed set. The responsible PE decides whether a site observation, calculation, or revised sealed sheet is needed before work proceeds."],
    ],
  },
} as const;

function makeServices(p: HawaiiLocal) {
  return coreServices.map((serviceSlug) => {
    const info = serviceInfo[serviceSlug];
    return {
      serviceSlug,
      title: `${p.name} ${info.title} for ${p.focus}`,
      description: `${info.title} for ${p.name} projects, coordinated with ${p.ahj}, Hawaii code, ${p.utility}, and the island-specific realities of ${p.conditions}.`,
      h1: `${info.title} for ${p.name} Projects`,
      kicker: `${p.name} ${info.title.toLowerCase()} and permit coordination`,
      lede: `${p.name} projects pair ${p.conditions} with a county and, sometimes, state-agency review path. ${info.title} starts with verified site and existing-building facts, then coordinates ${p.focus} with ${p.utility}, ${p.environmental}, and the responsible professional.`,
      permitAuthority: `${p.ahj} is the primary local building or development authority for this ${p.name} address. Planning, fire, SMA or shoreline, floodplain, water, wastewater, environmental, and utility reviews can be separate. The responsible Hawaii PE and AHJ determine discipline, seal, and submission requirements.`,
      codeContext: `${info.code} Confirm ${p.localCode} with ${p.ahj} at intake; the State Building Code Council page does not replace county amendments, agency decisions, or an address-specific checklist.`,
      localConditions: `${p.name} and ${p.county} require attention to ${p.conditions}. Verify those facts with current survey, geotechnical, flood, shoreline, utility, water, and environmental records rather than importing mainland or neighboring-island assumptions.`,
      projectTypes: `${p.projectTypes} ADUs, residential additions, tenant improvements, and small commercial work should be screened for zoning, occupancy, fire, energy, SMA, wastewater, utility, and existing-condition triggers before documents are finalized.`,
      sections: info.sections.map(([heading, body]) => ({ heading: `${p.name}: ${heading}`, body: `${body} For ${p.focus}, coordinate the decision with ${p.ahj}, ${p.utility}, and ${p.environmental}; another island's permit record is not evidence for this site.` })),
      permitSteps: [
        `Confirm the ${p.name} address, ${p.ahj} jurisdiction, ${p.localCode}, occupancy, and applicable county, fire, flood, shoreline or SMA, water, wastewater, utility, and environmental handoffs before fixing the ${info.noun} scope.`,
        `Reconcile ${p.focus}, field conditions, ${p.utility} capacity information, and ${p.environmental} requirements with the architectural and engineering sheets, including hurricane, coastal, and construction-access constraints.`,
        `Submit the ${info.title.toLowerCase()} package through the named AHJ path, carrying ${p.conditions} and any ADU or residential-addition interfaces into schedules, calculations, details, and agency forms.`,
        `Log plan-check corrections by authority and sheet, return a coordinated response to ${p.ahj}, and document inspections, substitutions, concealed island conditions, and closeout rather than assuming approval.`,
      ],
      faqs: [
        { question: `Which office reviews ${p.name} ${info.title.toLowerCase()}?`, answer: `${p.ahj} handles the primary local record, while ${p.county}, fire, water, wastewater, shoreline or SMA, floodplain, environmental, and utility authorities may review related work. Confirm the address-specific path before filing.` },
        { question: `How should an ADU or residential addition in ${p.name} be screened?`, answer: `Verify zoning and occupancy, existing framing and utilities, state and county code and energy triggers, fire and accessibility impacts, ${p.conditions}, water or wastewater capacity, and the current ${p.ahj} checklist. The responsible professional decides whether PE documents or a seal are appropriate.` },
        { question: `How should Hawaii plan-check corrections be handled?`, answer: `Map every comment to a revised sheet, calculation, code response, or agency document; preserve the response log and coordinate all disciplines. A changed field condition, material substitution, corrosion discovery, or agency condition should reach the responsible professional before proceeding.` },
      ],
      sources: sourcesFor(p),
    };
  });
}

const hawaiiBatch3: Batch2StateExpansion = {
  stateSlug: "hawaii", stateName: "Hawaii", stateAbbrev: "HI",
  hub: {
    title: "Hawaii Engineering Services for Island Building and Permit Projects",
    description: "Hawaii structural, MEP, civil, energy-compliance, and PE-stamped drawing support coordinated with county AHJs, state agencies, utilities, shoreline and flood reviews, and island-specific physical conditions.",
    h1: "Engineering for Hawaii’s Islands, Counties, and Coastal Conditions",
    kicker: "Hawaii building, site, energy, and professional-engineering coordination",
    lede: "Hawaii uses a state building-code framework administered through county permit departments and layered agency reviews. The actual island, county, shoreline or SMA status, utility, water and wastewater service, slope, wind, seismic, and coastal record should be established before an engineering package is promised.",
    sections: [
      { heading: "State framework, county decisions", body: "The Hawaii State Building Code Council publishes statewide code information, but Honolulu, Hawaii, Maui, and Kauai counties administer permits, zoning, flood, public works, utilities, and special overlays through different offices. A county checklist and agency map are essential for the parcel." },
      { heading: "Island conditions drive design", body: "Hurricane wind and rain, high seismic exposure, tsunami and coastal inundation, salt corrosion, termites, volcanic terrain and vog, wildfire in dry areas, steep slopes, lava, intense localized rain, and limited utility capacity all affect scope. Survey, geotechnical, flood, shoreline, water, wastewater, and environmental records should be current." },
      { heading: "A coordinated correction loop", body: "Building, planning, fire, SMA or shoreline, water, wastewater, environmental, and utility comments need one response record. ADUs and residential additions require real checks of existing services, occupancy, site constraints, and county review; they should not be thin separate doorway pages or automatic approvals." },
      { heading: "Water and wastewater capacity can control feasibility", body: "A county water-meter availability response, fire-flow check, sewer lateral review, or Department of Health wastewater decision can change an island project's density, fixture count, fire protection, and construction sequence. Private wastewater or cesspool work follows a separate health pathway from county building approval. The design team should preserve those letters, connection conditions, and agency corrections with the permit record before promising an ADU or addition." },
    ],
    faqs: [
      { question: "Does Hawaii have one permit office for all islands?", answer: "No. County departments administer building and development permits, and state or county agencies may separately review water, wastewater, shoreline or SMA, flood, environmental, fire, and public-way matters. The island and parcel determine the route." },
      { question: "Which physical conditions should a Hawaii project verify?", answer: "Wind, seismic, coastal inundation and tsunami exposure, salt air, corrosion, termites, slope and lava, wildfire in dry areas, volcanic conditions, intense rain, water or wastewater capacity, and local soils may all matter. Current site and agency evidence controls the design." },
      { question: "Who decides whether a Hawaii PE seal is needed?", answer: "The responsible Hawaii PE evaluates the engineering scope and professional responsibility, while the county AHJ identifies its submission requirements. Discipline, responsible charge, seal format, and project boundaries should be established before filing." },
    ],
    sources: [
      { label: "Hawaii State Building Code Council", url: "https://dbedt.hawaii.gov/hcda/building-code/" },
      { label: "Hawaii professional engineering licensing board", url: "https://cca.hawaii.gov/pvl/boards/engineer/" },
      { label: "Hawaii Department of Health Clean Water Branch", url: "https://health.hawaii.gov/cwb/" },
      { label: "Hawaii DLNR Commission on Water Resource Management", url: "https://dlnr.hawaii.gov/cwrm/" },
      { label: "FEMA National Flood Hazard Layer", url: "https://msc.fema.gov/portal/home" },
    ],
  },
  metros: [
    { slug: "honolulu", name: "Honolulu", county: "City and County of Honolulu", ahj: "City and County of Honolulu Department of Planning and Permitting", ahjUrl: "https://www.honolulu.gov/dpp", utility: "Hawaiian Electric and Honolulu Board of Water Supply", utilityUrl: "https://www.hawaiianelectric.com/", environmental: "Hawaii Department of Land and Natural Resources Office of Conservation and Coastal Lands", environmentalUrl: "https://dlnr.hawaii.gov/occl/", conditions: "dense coastal and valley development, hurricane wind and rain, high seismic exposure, salt air, tsunami and flood zones, steep volcanic slopes, and limited urban staging", focus: "transit-oriented infill, Waikiki and Kakaako renovations, and resilient residential additions", projectTypes: "condominium alterations, ADUs, hillside additions, hospitality fit-outs, mixed-use towers, and coastal commercial work", localCode: "Honolulu county building, zoning, shoreline, flood, SMA, water, fire, and DPP permit requirements" },
    { slug: "hilo", name: "Hilo", county: "Hawaii County", ahj: "County of Hawaii Department of Public Works Building Division", ahjUrl: "https://www.hawaiicounty.gov/departments/public-works/building-division", utility: "Hawaii Electric Light", utilityUrl: "https://www.hawaiianelectric.com/about-us/hawaii-electric-light", environmental: "Hawaii County Department of Environmental Management", environmentalUrl: "https://www.hawaiicounty.gov/departments/environmental-management", conditions: "very high rainfall, tsunami and coastal inundation, volcanic soils and lava, vog and corrosion, steep watershed transitions, and rural water or wastewater constraints", focus: "downtown rehabilitation, university and healthcare growth, and rain-resilient neighborhood work", projectTypes: "ADUs, residential additions, small hotels, medical offices, agricultural support buildings, and downtown adaptive reuse", localCode: "Hawaii County building, zoning, flood, SMA, water, wastewater, environmental, and public-works requirements" },
    { slug: "kailua-kona", name: "Kailua-Kona", county: "Hawaii County", ahj: "County of Hawaii Department of Public Works Building Division", ahjUrl: "https://www.hawaiicounty.gov/departments/public-works/building-division", utility: "Hawaii Electric Light and West Hawaii sewer and water utilities", utilityUrl: "https://www.hawaiianelectric.com/about-us/hawaii-electric-light", environmental: "Hawaii County Planning Department", environmentalUrl: "https://www.hawaiicounty.gov/departments/planning", conditions: "dry leeward climate with wildfire exposure, lava flows, strong solar gain, salt air, Kona winds, seismic and tsunami exposure, and limited groundwater or sewer capacity", focus: "resort and visitor-industry renovation, leeward infill, and water-conscious housing", projectTypes: "resort rooms, ADUs, solar and energy retrofits, restaurants, medical offices, villas, and small commercial additions", localCode: "Hawaii County zoning, building, SMA, fire, flood, water, wastewater, and planning requirements for the Kona district" },
    { slug: "kahului", name: "Kahului", county: "Maui County", ahj: "Maui County Department of Public Works Development Services Administration", ahjUrl: "https://www.mauicounty.gov/123/Development-Services-Administration", utility: "Maui Electric and County of Maui Department of Water Supply", utilityUrl: "https://www.mauielectric.com/", environmental: "Maui County Department of Planning", environmentalUrl: "https://www.mauicounty.gov/131/Planning-Department", conditions: "coastal plain flooding, hurricane and trade-wind exposure, salt corrosion, drought and wildfire risk, volcanic slopes, intense rain events, and constrained water capacity", focus: "airport and industrial redevelopment, post-fire resilience, and central Maui housing", projectTypes: "workforce-housing additions, ADUs, industrial tenant improvements, hotels, retail, civic buildings, and water-efficient site work", localCode: "Maui County building, zoning, SMA, flood, fire, water, wildfire, and development-services requirements" },
    { slug: "lihue", name: "Lihue", county: "Kauai County", ahj: "County of Kauai Department of Public Works Building Division", ahjUrl: "https://www.kauai.gov/Government/Departments/Public-Works/Building-Division", utility: "Kauai Island Utility Cooperative and County of Kauai Department of Water", utilityUrl: "https://kiuc.coop/", environmental: "Kauai County Planning Department", environmentalUrl: "https://www.kauai.gov/Government/Departments/Planning", conditions: "extreme rainfall and flash flooding, steep volcanic watersheds, coastal surge and tsunami, salt air, landslide potential, and island logistics", focus: "civic and airport-area growth, resilient housing, and east-side commercial adaptation", projectTypes: "ADUs, residential additions, visitor lodging, agricultural support buildings, retail, and small institutional projects", localCode: "Kauai County building, zoning, flood, SMA, water, wastewater, fire, and public-works requirements" },
  ].map((p) => ({ ...p, services: makeServices(p) })),
};

export { hawaiiBatch3 };
export default hawaiiBatch3;