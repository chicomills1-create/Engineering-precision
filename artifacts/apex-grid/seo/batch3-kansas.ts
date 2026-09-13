import type { Batch2StateExpansion } from "./batch2-core-service-types";

const coreServices = [
  "structural-engineering",
  "mep-engineering",
  "civil-engineering",
  "energy-compliance",
  "pe-stamped-drawings",
] as const;

type KansasLocal = {
  slug: string;
  name: string;
  county: string;
  ahj: string;
  ahjUrl: string;
  utility: string;
  utilityUrl: string;
  environmental: string;
  environmentalUrl: string;
  conditions: string;
  focus: string;
  projectTypes: string;
  localCode: string;
};

const sourcesFor = (p: KansasLocal) => [
  { label: `${p.ahj} permit and development information`, url: p.ahjUrl },
  { label: "Kansas State Fire Marshal building-code information", url: "https://www.ksfm.ks.gov/building-codes" },
  { label: "Kansas State Board of Technical Professions", url: "https://www.ksbtp.ks.gov/" },
  { label: `${p.utility} official utility information`, url: p.utilityUrl },
  { label: `${p.environmental} official environmental information`, url: p.environmentalUrl },
  { label: "FEMA National Flood Hazard Layer", url: "https://msc.fema.gov/portal/home" },
];

const serviceInfo = {
  "structural-engineering": {
    noun: "structural engineering",
    title: "Structural Engineering",
    code: "Gravity, lateral, existing-building, and foundation work should identify the locally adopted model code or ordinance, wind and snow criteria, risk category, load combinations, and any special inspection requirements.",
    sections: [
      ["Existing framing is evidence, not an assumption", "Field measurements, prior permit drawings, exposed connections, and selective demolition help distinguish the documented building from the building that is actually carrying load. That record is particularly important when an addition or ADU changes roof, floor, or foundation loads."],
      ["Kansas wind, snow, and soil decisions", "Open-country wind, severe thunderstorms, occasional tornado effects, frost depth, and the difference between engineered fill, alluvium, and expansive clay can change the foundation and attachment details. Survey and geotechnical recommendations should be reconciled with the architectural elevations."],
      ["A reviewable load path", "Plans, details, calculations, and observation notes should show how new openings, rooftop equipment, porches, retaining walls, and lateral bracing transfer forces to reliable supports. Corrections from the building official should be answered by revision clouds and a tracked response, not by an unrecorded field change."],
    ],
  },
  "mep-engineering": {
    noun: "mechanical, electrical, and plumbing engineering",
    title: "MEP Engineering",
    code: "The MEP set should state the applicable adopted mechanical, plumbing, electrical, fuel-gas, fire, and energy requirements accepted by the local AHJ, including occupancy, ventilation, emergency power, accessibility, and service calculations.",
    sections: [
      ["Utility capacity is an early design input", "The proposed service, transformer location, water meter, sanitary connection, gas availability, and fire-flow information should be confirmed with the named utility before equipment is sized. A utility letter is not a substitute for an AHJ permit, and a permit drawing should not promise capacity that has not been assigned."],
      ["Kansas extremes need coordinated systems", "Hot summers, winter freezes, wind-driven rain, and rapid temperature swings affect heat-pump selection, condensate, freeze protection, ventilation, roof penetrations, and control sequences. Rural or edge-of-town sites may also need a private well, lagoon, or septic professional."],
      ["Occupied-building coordination", "Tenant improvements, additions, and ADUs often expose undersized panels, low water pressure, shared exhaust, or inaccessible shutoffs. Riser diagrams, equipment schedules, lighting controls, and shutdown plans should be coordinated with the architectural life-safety sheets before submittal."],
    ],
  },
  "civil-engineering": {
    noun: "civil engineering",
    title: "Civil Engineering",
    code: "Site documents should identify the applicable city or county development ordinance, drainage and erosion-control standards, floodplain rules, utility standards, right-of-way permits, and any Kansas construction-stormwater coverage triggered by disturbance.",
    sections: [
      ["Drainage follows the watershed", "A site plan should connect the survey, drainage areas, proposed grades, outlet, detention or infiltration measure, easements, and maintenance responsibility. A FEMA map is a screening source; the local floodplain administrator and current topographic survey control the parcel decision."],
      ["Clay, alluvium, and construction access", "Kansas sites can move from stable upland soils to compressible alluvium or shrink-swell clay over a short distance. Cut-and-fill limits, retaining walls, pavement sections, erosion controls, and finished-floor elevations should use site-specific geotechnical and survey information."],
      ["Public frontage and utility conflicts", "Curb cuts, sidewalks, fire lanes, ditches, utility crossings, and temporary traffic control can involve a second public agency even when the building permit is local. The civil package should preserve accessible routes and show who owns and maintains each drainage or utility feature."],
    ],
  },
  "energy-compliance": {
    noun: "energy-compliance engineering",
    title: "Energy-Compliance Engineering",
    code: "The compliance record should name the code or ordinance edition accepted for the permit, selected prescriptive or performance path, envelope values, HVAC and lighting inputs, service-water assumptions, and commissioning obligations.",
    sections: [
      ["Kansas code path follows the jurisdiction", "Kansas does not provide one uniform local permit workflow. The building official may use a locally adopted code edition or state fire-code framework, so the energy forms and alteration provisions should be confirmed with the AHJ before modeling."],
      ["Heating and cooling are both real loads", "Cold winters, hot humid summers, solar exposure, infiltration, snow on roofs, and shoulder-season swings make envelope continuity, air sealing, equipment controls, and ventilation important. Model inputs should match the actual floor area, occupancy schedule, and equipment schedule."],
      ["Compliance survives substitutions", "Window changes, heat-pump substitutions, lighting revisions, and added rooftop equipment can invalidate a form or model. The design team should preserve the calculation record, update the permit set, and document functional testing instead of treating approval as the end of energy coordination."],
    ],
  },
  "pe-stamped-drawings": {
    noun: "PE-stamped drawing coordination",
    title: "PE-Stamped Drawings",
    code: "A responsible Kansas PE determines whether the defined discipline requires a seal and identifies the applicable code edition, local amendments, existing-building provisions, special inspections, and deferred or delegated design items.",
    sections: [
      ["The seal follows a defined scope", "A PE needs the survey, existing conditions, geotechnical information, equipment data, architectural scope, and agency comments needed to exercise professional judgment. A stamp is not a promise of approval, a construction authorization, or a replacement for another discipline's review."],
      ["Local review records belong with the set", "The named building official, planning office, fire authority, utility, floodplain administrator, and environmental agency may each ask different questions. A responsibility matrix keeps sealed engineering separate from contractor, architect, utility-owner, and specialty-subconsultant work."],
      ["Corrections and construction changes", "Plan-check comments should be logged, answered in the responsible PE's discipline, and reflected in a clearly identified revision. RFIs, substitutions, concealed conditions, and delegated components require the PE to decide whether observation, calculation, or a revised sealed sheet is appropriate."],
    ],
  },
} as const;

function makeServices(p: KansasLocal) {
  return coreServices.map((serviceSlug) => {
    const info = serviceInfo[serviceSlug];
    const steps = [
      `Open the ${p.ahj} record for the ${p.name} address, confirm the jurisdiction and ${p.localCode}, and identify planning, fire, floodplain, utility, and environmental handoffs before fixing the ${info.noun} scope.`,
      `Reconcile ${p.focus}, survey and existing-condition evidence, the ${p.utility} service information, and the ${p.environmental} requirements with the architectural and discipline drawings.`,
      `Submit the ${info.title.toLowerCase()} package through the named AHJ path, keeping ${p.conditions} visible in calculations, schedules, details, and any ADU or residential-addition sheets.`,
      `Log plan-check corrections by sheet and code topic, return a responsible-professional response to ${p.ahj}, and record inspections, substitutions, field conditions, and closeout documents rather than assuming approval.`,
    ];
    return {
      serviceSlug,
      title: `${p.name} ${info.title} for ${p.focus}`,
      description: `Locally coordinated ${info.noun} for ${p.name} projects, with ${p.ahj} review, ${p.conditions}, utility interfaces, and Kansas permit requirements addressed in the actual project record.`,
      h1: `${info.title} for ${p.name} Projects`,
      kicker: `${p.name} ${info.title.toLowerCase()} and permit coordination`,
      lede: `${p.name} projects combine ${p.conditions} with a distinct ${p.ahj} review path. ${info.title} begins with verified site and existing-building facts, then coordinates the permit package with ${p.utility}, ${p.environmental}, and the responsible design professional.`,
      permitAuthority: `${p.ahj} is the primary local permit and development authority for this ${p.name} location. County, fire, floodplain, utility, environmental, and right-of-way reviews can be separate. The responsible Kansas PE and the AHJ determine discipline, seal, and submission requirements for the actual scope.`,
      codeContext: `${info.code} For this location, confirm ${p.localCode} with ${p.ahj} at intake; a state reference or neighboring city's checklist does not establish the requirements for this parcel.`,
      localConditions: `${p.name} and ${p.county} require attention to ${p.conditions}. These are design inputs to verify through current survey, geotechnical, utility, flood, and agency records rather than blanket assumptions.`,
      projectTypes: `${p.projectTypes} ADUs, residential additions, tenant improvements, and small commercial alterations can use the same coordinated intake, but their occupancy, utility, fire, and review triggers must be evaluated separately.`,
      sections: info.sections.map(([heading, body]) => ({
        heading: `${p.name}: ${heading}`,
        body: `${body} At ${p.name}, coordinate this question with ${p.ahj} and the ${p.utility} interface; ${p.focus} makes the decision especially material.`,
      })),
      permitSteps: steps,
      faqs: [
        { question: `Which office reviews ${p.name} ${info.title.toLowerCase()}?`, answer: `${p.ahj} handles the primary local record, while ${p.county} and separate fire, floodplain, utility, or environmental authorities may review related work. Confirm the address-specific path before submission.` },
        { question: `How should an ${p.name} ADU or residential addition enter plan check?`, answer: `Treat it as a real scope change: verify zoning and occupancy, existing utilities and foundations, ${p.conditions}, energy and life-safety impacts, and the current ${p.ahj} checklist. Any required PE work is determined by the responsible professional and AHJ.` },
        { question: `What happens after ${p.ahj} sends corrections?`, answer: `The design team should map each comment to a sheet, calculation, code response, or missing agency document, then submit a coordinated revision. Field work that changes the reviewed condition should be escalated to the responsible professional before proceeding.` },
      ],
      sources: sourcesFor(p),
    };
  });
}

const kansasBatch3: Batch2StateExpansion = {
  stateSlug: "kansas",
  stateName: "Kansas",
  stateAbbrev: "KS",
  hub: {
    title: "Kansas Engineering Services for Local Permit and Building Projects",
    description: "Kansas structural, MEP, civil, energy-compliance, and PE-stamped drawing support coordinated with the city, county, utility, floodplain, and environmental authorities responsible for each address.",
    h1: "Engineering Grounded in Kansas Places and Permit Paths",
    kicker: "Kansas building, site, and professional-engineering coordination",
    lede: "Kansas has important statewide professional and fire-code frameworks, but building, zoning, stormwater, utility, and floodplain administration remains highly local. A project record should identify the actual AHJ, adopted code, soils, weather exposure, utility service, and plan-check route before design commitments are made.",
    sections: [
      { heading: "Local adoption is the starting point", body: "The Kansas State Fire Marshal publishes building-code information and local governments administer many permits and development standards. Wichita, Johnson County communities, Kansas City, Topeka, and Lawrence do not share one checklist; the parcel's city and county control the initial jurisdiction and handoffs." },
      { heading: "Plains weather meets varied ground and water", body: "Severe thunderstorms, tornado and straight-line wind exposure, winter freeze-thaw, snow, expansive clay, alluvial soils, rolling terrain, and river floodplains can all affect a design. Current survey, geotechnical, FEMA, drainage, and utility records are more useful than a statewide generic assumption." },
      { heading: "A complete review record avoids rework", body: "A useful package connects zoning, occupancy, architecture, engineering, utility correspondence, erosion and floodplain decisions, and the responsible professional's corrections log. ADUs and residential additions deserve the same careful jurisdiction and existing-condition check as larger work, not a thin doorway page." },
      { heading: "Construction stormwater and utility-locate handoffs", body: "A project disturbing an applicable acreage threshold may need Kansas Department of Health and Environment NPDES coverage, a Notice of Intent, a stormwater pollution prevention plan, and local erosion-control approval before earthwork. Kansas One Call ticketing is a separate locate process, not proof that private lines are mapped. The civil team should coordinate both tracks with the AHJ, utility owners, contractor, and inspection record." },
    ],
    faqs: [
      { question: "Does Kansas have one building department for every project?", answer: "No. Local cities and counties administer building, zoning, site, and utility reviews under their own adopted ordinances and processes. The Kansas State Fire Marshal is an important statewide source, but the address-specific AHJ controls the permit path." },
      { question: "Are Kansas foundations affected by more than frost?", answer: "Yes. Frost and freeze-thaw interact with expansive clay, fill, alluvium, groundwater, drainage, and slope. A geotechnical professional and the responsible engineer should evaluate the actual site rather than relying on a statewide foundation shortcut." },
      { question: "Who decides whether engineering documents need a Kansas PE seal?", answer: "The responsible Kansas PE evaluates the engineering scope under the applicable professional-practice rules, while the local AHJ identifies its submission requirements. Scope, responsible charge, discipline, and electronic-document questions should be confirmed for the project." },
    ],
    sources: [
      { label: "Kansas State Fire Marshal building codes", url: "https://www.ksfm.ks.gov/building-codes" },
      { label: "Kansas State Board of Technical Professions", url: "https://www.ksbtp.ks.gov/" },
      { label: "Kansas Department of Health and Environment stormwater", url: "https://www.kdhe.ks.gov/1094/Stormwater" },
      { label: "Kansas Division of Emergency Management floodplain", url: "https://www.kansastag.gov/kdem" },
      { label: "FEMA National Flood Hazard Layer", url: "https://msc.fema.gov/portal/home" },
    ],
  },
  metros: [
    { slug: "wichita", name: "Wichita", county: "Sedgwick County", ahj: "City of Wichita Metropolitan Area Building and Construction Department", ahjUrl: "https://www.wichita.gov/524/Building-Safety", utility: "Wichita Public Works & Utilities", utilityUrl: "https://www.wichita.gov/601/Public-Works-Utilities", environmental: "Sedgwick County Environmental Resources", environmentalUrl: "https://www.sedgwickcounty.org/environment/", conditions: "Arkansas River floodplain questions, flat-to-gently rolling prairie grades, expansive soils, intense thunderstorms, and hot summer cooling loads", focus: "riverfront infill, aircraft-industry and warehouse conversions, and east-side residential growth", projectTypes: "single-family additions, detached ADUs, aircraft and industrial tenant improvements, neighborhood commercial shells, and river-corridor redevelopment", localCode: "Wichita’s currently adopted building, zoning, floodplain, and development standards" },
    { slug: "overland-park", name: "Overland Park", county: "Johnson County", ahj: "City of Overland Park Planning and Development Services", ahjUrl: "https://www.opkansas.org/city-services/planning-development/permits/", utility: "Johnson County Wastewater and Evergy", utilityUrl: "https://www.jocogov.org/department/wastewater", environmental: "Johnson County Stormwater Management", environmentalUrl: "https://www.jocogov.org/department/stormwater-management", conditions: "rolling upland terrain, clay and weathered shale, fast-growing subdivisions, intense rainfall, and the Turkey Creek and Indian Creek drainage systems", focus: "suburban infill, office-to-medical conversions, and Johnson County growth corridors", projectTypes: "basement remodels, additions and ADUs, medical-office fit-outs, retail pads, multifamily amenities, and subdivision infrastructure", localCode: "Overland Park’s adopted building code, Unified Development Ordinance, stormwater standards, and current permit checklists" },
    { slug: "kansas-city", name: "Kansas City", county: "Wyandotte County", ahj: "Unified Government of Wyandotte County and Kansas City Kansas Development Services", ahjUrl: "https://www.wycokck.org/Departments/Neighborhood-Resource-Center/Building-Permits", utility: "BPU of Kansas City", utilityUrl: "https://www.bpu.com/", environmental: "Unified Government Stormwater Management", environmentalUrl: "https://www.wycokck.org/Departments/Public-Works/Stormwater", conditions: "bluff and ravine terrain, expansive clay and shale, Missouri River floodplain exposure, dense utility corridors, and severe wind and rain", focus: "urban infill, industrial logistics, and older housing near the river and Argentine", projectTypes: "historic-house additions, ADUs, warehouse conversions, logistics sites, neighborhood retail, and multifamily rehabilitation", localCode: "Unified Government building, zoning, floodplain, right-of-way, and stormwater requirements in effect for the parcel" },
    { slug: "topeka", name: "Topeka", county: "Shawnee County", ahj: "City of Topeka Development Services", ahjUrl: "https://www.topeka.org/departments/development-services/", utility: "City of Topeka Utilities", utilityUrl: "https://www.topeka.org/departments/utilities/", environmental: "Shawnee County Emergency Management", environmentalUrl: "https://www.shawneecounty.org/189/Emergency-Management", conditions: "Kansas River floodplain and levee questions, loess and alluvial soils, freeze-thaw, wind exposure, and aging water and sewer infrastructure", focus: "state-government-area renovations, river corridor resilience, and established-neighborhood additions", projectTypes: "porches and additions, ADUs, public and institutional renovations, small industrial work, downtown tenant improvements, and infill housing", localCode: "Topeka’s adopted building, zoning, floodplain, utility, and development-services requirements" },
    { slug: "lawrence", name: "Lawrence", county: "Douglas County", ahj: "City of Lawrence Planning and Development Services", ahjUrl: "https://lawrenceks.org/pds/", utility: "City of Lawrence Municipal Services and Utilities", utilityUrl: "https://lawrenceks.org/mso/", environmental: "Kansas Department of Health and Environment", environmentalUrl: "https://www.kdhe.ks.gov/1094/Stormwater", conditions: "Kansas River and Wakarusa watershed drainage, rolling loess terrain, limestone and clay transitions, older neighborhoods, and high-performance renovation interest", focus: "university-adjacent infill, downtown adaptive reuse, and watershed-sensitive growth", projectTypes: "student-housing additions, detached ADUs, historic commercial rehabilitation, neighborhood infill, civic renovations, and small laboratory or office work", localCode: "Lawrence development code, adopted building standards, floodplain and stormwater rules, and the current PDS submittal requirements" },
  ].map((p) => ({ ...p, services: makeServices(p) })),
};

export { kansasBatch3 };
export default kansasBatch3;