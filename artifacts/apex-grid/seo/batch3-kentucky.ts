import type {
  Batch2CoreServicePage,
  Batch2CoreServiceSlug,
  Batch2StateExpansion,
} from "./batch2-core-service-types";

type KentuckyMetro = {
  slug: string;
  name: string;
  county: string;
  authority: string;
  authorityUrl: string;
  planning: string;
  planningUrl: string;
  utility: string;
  utilityUrl: string;
  conditions: string;
  localReview: string;
};
const kentuckyCode = {
  label: "Kentucky Department of Housing, Buildings and Construction",
  url: "https://dhbc.ky.gov/",
};
const kentuckyEnergy = {
  label: "Kentucky Energy and Environment Cabinet",
  url: "https://eec.ky.gov/Pages/default.aspx",
};
const kentuckyFlood = { label: "FEMA flood maps", url: "https://msc.fema.gov/portal/home" };
const kentuckyMetros: KentuckyMetro[] = [
  {
    slug: "louisville",
    name: "Louisville",
    county: "Jefferson County",
    authority: "Louisville Metro Government Develop Louisville",
    authorityUrl: "https://louisvilleky.gov/government/develop-louisville",
    planning: "Louisville Metro Planning and Design Services",
    planningUrl: "https://louisvilleky.gov/government/planning-design",
    utility: "Louisville Water Company",
    utilityUrl: "https://www.louisvillewater.com/",
    conditions: "Louisville’s Ohio River floodplain, karst and sinkhole-sensitive limestone, rolling clay sites, dense older building stock, humid summers, freeze-thaw, and severe wind events make existing conditions and drainage highly parcel-specific.",
    localReview: "Develop Louisville and Planning and Design Services may be joined by Louisville Metro Public Works, MSD, fire, floodplain, historic, and Louisville Water review; nearby Oldham or Bullitt County sites use different AHJs.",
  },
  {
    slug: "lexington",
    name: "Lexington",
    county: "Fayette County",
    authority: "Lexington-Fayette Urban County Government Division of Building Inspection",
    authorityUrl: "https://www.lexingtonky.gov/government/departments/planning-and-preservation/building-permits",
    planning: "Lexington-Fayette Division of Planning",
    planningUrl: "https://www.lexingtonky.gov/government/departments/planning-and-preservation",
    utility: "Lexington-Fayette Urban County Government Water Quality Management",
    utilityUrl: "https://www.lexingtonky.gov/government/departments/environmental-quality-and-public-works/water-quality",
    conditions: "Lexington’s Bluegrass karst, shallow limestone, rolling pasture-to-infill sites, sinkhole and stormwater sensitivity, humid heat, winter ice, and horse-country drainage constraints affect foundations and site design.",
    localReview: "Lexington’s unified government handles building and planning through separate divisions, with water quality, fire, flood, right-of-way, and historic or agricultural-area review as applicable.",
  },
  {
    slug: "bowling-green",
    name: "Bowling Green",
    county: "Warren County",
    authority: "City of Bowling Green Department of Neighborhood and Community Services",
    authorityUrl: "https://www.bgky.org/planning",
    planning: "City-County Planning Commission of Warren County",
    planningUrl: "https://www.warrenpc.org/",
    utility: "Bowling Green Municipal Utilities",
    utilityUrl: "https://www.bgmu.com/",
    conditions: "Bowling Green’s karst limestone, sinkhole potential, rolling terrain, growing industrial and university areas, hot humid summers, winter freeze-thaw, and Barren River drainage shape civil and structural assumptions.",
    localReview: "Bowling Green and the Warren County planning commission can involve building, zoning, stormwater, fire, floodplain, utilities, and industrial-site review; county parcels need the proper jurisdictional intake.",
  },
  {
    slug: "owensboro",
    name: "Owensboro",
    county: "Daviess County",
    authority: "City of Owensboro Engineering and Inspections",
    authorityUrl: "https://www.owensboroky.gov/government/departments/engineering",
    planning: "Owensboro Metropolitan Planning Commission",
    planningUrl: "https://www.ompc.org/",
    utility: "Owensboro Municipal Utilities",
    utilityUrl: "https://www.omu.org/",
    conditions: "Owensboro’s Ohio River and floodplain exposure, flat alluvial soils, industrial redevelopment, high groundwater, humid heat, winter ice, and severe thunderstorms influence elevations, foundations, and utility routes.",
    localReview: "Owensboro Engineering and Inspections, OMPC, fire, floodplain, right-of-way, environmental, and Owensboro Municipal Utilities may have distinct roles in a city project.",
  },
  {
    slug: "covington",
    name: "Covington",
    county: "Kenton County",
    authority: "City of Covington Inspection and Permits",
    authorityUrl: "https://www.covingtonky.gov/government/departments/inspection-permits",
    planning: "Kenton County Planning Commission",
    planningUrl: "https://www.kcpc.org/",
    utility: "Northern Kentucky Water District",
    utilityUrl: "https://www.nkywater.org/",
    conditions: "Covington’s steep Ohio River hills, urban fill, landslide-prone slopes, combined-sewer context, flood exposure, older masonry, winter ice, and dense Cincinnati-area utilities make small changes technically consequential.",
    localReview: "Covington Inspection and Permits coordinates with Kenton County Planning, public works, SD1, fire, floodplain, historic, and Northern Kentucky Water District interests; neighboring cities have their own offices.",
  },
];

type Profile = {
  serviceSlug: Batch2CoreServiceSlug;
  name: string;
  focus: string;
  projectTypes: string;
  code: string;
  sections: [[string, string], [string, string], [string, string]];
  steps: [string, string, string, string];
  faqs: [[string, string], [string, string], [string, string]];
};
const profiles: Profile[] = [
  {
    serviceSlug: "structural-engineering",
    name: "Structural Engineering",
    focus: "existing-building assessment and load-path design",
    projectTypes: "Bluegrass additions and ADUs, historic masonry alterations, porch work, multifamily renovations, industrial buildings, schools, and commercial shells.",
    code: "The Kentucky DHBC code framework and the responsible local building official establish the applicable adopted edition, amendments, wind and snow criteria, existing-building provisions, and special inspections. Calculations should identify the actual criteria.",
    sections: [
      ["Existing masonry and additions", "Louisville and Covington alterations often meet older masonry, timber, steel, and filled sites, while Lexington additions may encounter rural-to-infill transitions. Measured conditions and prior permits should separate verified framing from assumed framing."],
      ["Karst, slope, and river ground", "Bluegrass limestone, sinkholes, clay, alluvium, urban fill, and steep Ohio Valley slopes create different footing and retaining questions. Geotechnical information, drainage, and neighboring foundations should be reconciled when the scope warrants."],
      ["Plan-check clarity", "A permit reviewer needs a continuous gravity and lateral load path through plans, details, calculations, demolition, temporary support, and special-inspection notes. Corrections should identify every related architectural or civil change."],
    ],
    steps: [
      "Confirm the Kentucky parcel with the named AHJ, planning and historic status, flood information, and existing permits before fixing the structural scope for an addition, ADU, or new building.",
      "Measure framing and foundation conditions and record soil, slope, equipment, and demolition evidence for the responsible engineer.",
      "Coordinate structural sheets with civil drainage, retaining, MEP penetrations, fire access, energy work, and special-inspection assignments.",
      "Answer each AHJ plan-check comment by drawing and calculation, and issue a controlled revision when construction reveals a different load path.",
    ],
    faqs: [
      ["When does a Kentucky ADU need structural engineering?", "New footings, bearing-wall changes, roof or stair work, unusual connections, retaining conditions, and uncertain existing construction can require engineering. The local official and responsible engineer determine the scope."],
      ["Are Lexington and Covington foundation assumptions alike?", "No. Lexington’s Bluegrass karst and shallow limestone differ from Covington’s steep hills, urban fill, and older retaining conditions. Parcel-specific survey and geotechnical evidence matter."],
      ["What is a complete structural correction response?", "Map each comment to a revised sheet or calculation, coordinate connected disciplines, return the jurisdiction’s required response, and re-evaluate field discoveries rather than closing them with a generic note."],
    ],
  },
  {
    serviceSlug: "mep-engineering",
    name: "MEP Engineering",
    focus: "building systems, utility capacity, and occupied renovations",
    projectTypes: "Louisville tenant improvements, Lexington medical and university work, Bowling Green industrial buildings, ADU service extensions, restaurants, schools, and multifamily additions.",
    code: "The local AHJ confirms Kentucky-adopted mechanical, plumbing, electrical, fuel-gas, fire, and energy provisions and their editions. Equipment, ventilation, demand, water and sewer, controls, and life-safety interfaces must agree across the set.",
    sections: [
      ["Utility owners answer different questions", "Louisville Water, Lexington water-quality staff, BGMU, OMU, or Northern Kentucky Water District do not answer electric, fire-flow, sewer, and shutdown questions in the same way. Address-specific correspondence should precede final equipment schedules."],
      ["Humid summers and icy winters", "Cooling and latent loads, winter freeze protection, ice, severe storms, older utility corridors, and occupied shutdowns affect HVAC, piping, controls, and emergency power. An ADU or restaurant cannot inherit an office assumption."],
      ["One coordinated correction set", "Risers, one-lines, clearances, penetrations, condensate, grease waste, backflow, access, and controls should be rechecked after every reviewer comment and equipment substitution."],
    ],
    steps: [
      "Open the building and occupancy intake with the local Kentucky AHJ and identify fire, health, flood, utility, right-of-way, and historic reviews that affect systems.",
      "Request service, water, sewer, fire-flow, meter, and shutdown information from the named utility and fire contacts before sizing equipment.",
      "Coordinate feeders, risers, ventilation, condensate, grease or process waste, ADU tie-ins, controls, equipment access, and penetrations.",
      "Return numbered MEP corrections through the AHJ and retain revised calculations, utility correspondence, substitutions, controls, and inspection or commissioning records.",
    ],
    faqs: [
      ["What can limit MEP scope for a Kentucky ADU?", "Existing electric service, water pressure, sewer route, hot-water capacity, ventilation, flood or slope conditions, and the local permit route can all limit an ADU. The existing house service should be verified."],
      ["Why does Covington need early utility coordination?", "Steep urban hills, older corridors, combined-sewer context, flood exposure, and dense Cincinnati-area infrastructure can make a seemingly small connection or equipment replacement consequential."],
      ["How should a plan checker’s MEP correction be handled?", "Identify the comment, revise affected plans and calculations, cross-check other disciplines, and submit a numbered response. A substitution that changes load, ventilation, or life safety needs the same review."],
    ],
  },
  {
    serviceSlug: "civil-engineering",
    name: "Civil Engineering",
    focus: "Kentucky grading, drainage, utilities, and access",
    projectTypes: "Residential additions and ADUs, karst-sensitive lots, subdivisions, commercial redevelopment, industrial yards, institutional expansions, and sidewalks or curb work.",
    code: "Local zoning, subdivision, stormwater, floodplain, erosion, right-of-way, sewer, and utility standards govern the site package, with Kentucky environmental permits as applicable. The plans should identify the watershed, outfall, design storm, and maintenance party.",
    sections: [
      ["Receiving systems matter", "An Ohio River floodplain, Bluegrass sinkhole area, Barren River basin, or urban combined-sewer setting creates different outlet and detention questions. Survey, drainage areas, easements, and downstream conditions should be current."],
      ["Residential work is still site work", "A new ADU, driveway, patio, or addition can redirect runoff to a basement, slope, neighbor, alley, or street. Finished floors, retaining edges, accessible routes, erosion protection, and utility profiles belong together."],
      ["Public frontage and utility evidence", "Record drawings and utility locates do not prove depth or alignment. Water, sewer, electric, fire access, curb cuts, sidewalks, and construction staging need reconciliation with survey and agency standards."],
    ],
    steps: [
      "Confirm the Kentucky jurisdiction, zoning, floodplain, watershed, disturbance, frontage, and utility service area before selecting the civil submittal path.",
      "Prepare a current survey and drainage narrative, then obtain outfall, utility, fire-access, sewer, and right-of-way information from the responsible agencies.",
      "Coordinate grading, detention or infiltration, erosion control, finished floors, ADU access, retaining, utility profiles, and building foundations.",
      "Track local, utility, stormwater, flood, and right-of-way corrections in one log and revise calculations, maintenance notes, and as-built requirements.",
    ],
    faqs: [
      ["Can a Kentucky addition avoid civil review?", "An interior alteration may have little civil scope, but new impervious area, an ADU, driveway, floodplain, retaining wall, slope, or sewer connection can trigger local review. The jurisdiction decides."],
      ["What controls an Ohio Valley outfall?", "Receiving-system capacity, floodplain and floodway conditions, local stormwater rules, easements, erosion requirements, and maintenance responsibility control the outfall—not the closest ditch."],
      ["Why can a grading correction require structural changes?", "A revised grade can move the foundation, finished floor, retaining wall, accessible route, utility profile, and detention volume. Civil corrections should be checked with structural and architectural sheets."],
    ],
  },
  {
    serviceSlug: "energy-compliance",
    name: "Energy Compliance",
    focus: "Kentucky code documentation for efficient, durable buildings",
    projectTypes: "Commercial shells, historic and modern tenant improvements, multifamily buildings, residential additions and ADUs, schools, clinics, and industrial support areas.",
    code: "The AHJ and Kentucky DHBC identify the applicable energy-code edition, amendments, commercial or residential method, and alteration provisions. The record should state envelope, glazing, lighting, HVAC, water-heating, controls, and schedule assumptions.",
    sections: [
      ["Start with occupancy and alteration scope", "The local permit intake establishes forms and analysis. Architectural sections, lighting schedules, and HVAC equipment must match the chosen Kentucky method, especially where an older building or historic exterior limits envelope changes."],
      ["Four-season performance", "Kentucky designs balance humid cooling, winter heat, ice, infiltration, roof exposure, controls, and severe storms. Louisville river conditions, Lexington karst sites, and Covington masonry retrofits each create different implementation questions."],
      ["Corrections are not just paperwork", "Air sealing, insulation continuity, controls, equipment substitutions, and field verification should remain traceable when a reviewer asks for clarification or a contractor changes a selection."],
    ],
    steps: [
      "Ask the AHJ and Kentucky DHBC which energy edition, amendment, method, forms, occupancy, and alteration provisions apply to the address.",
      "Collect envelope, glazing, lighting, HVAC, ventilation, service-water, controls, schedules, and utility assumptions from the coordinated design team.",
      "Reconcile the compliance record with structural openings, MEP selections, historic or flood constraints, and ADU or addition boundaries.",
      "Return numbered corrections through the AHJ and retain revised forms, model inputs, substitutions, control sequences, and field-testing records.",
    ],
    faqs: [
      ["Is a Kentucky ADU always a new-building energy analysis?", "The adopted method, conditioned area, alteration scope, and relationship to the existing home determine the documentation. Confirm the route with the AHJ before modeling."],
      ["Does energy compliance guarantee savings?", "No. Compliance tests specified weather, schedules, envelope, equipment, and controls. Occupants, maintenance, construction, rates, and operation determine actual utility use."],
      ["How should a historic-building energy correction be documented?", "Tie comments to the selected code path, forms, sections, model, and MEP sheets, explain any approved envelope limitation, and coordinate revisions rather than silently changing assumptions."],
    ],
  },
  {
    serviceSlug: "pe-stamped-drawings",
    name: "PE-Stamped Drawings",
    focus: "defined professional responsibility for Kentucky permit packages",
    projectTypes: "Structural and civil documents, MEP systems, commercial additions, ADUs where engineering is required, industrial work, and public or utility-facing improvements.",
    code: "The responsible Kentucky PE defines the accepted discipline and scope under applicable practice rules and the AHJ checklist. Sheets should identify local code assumptions, site evidence, existing-building limits, inspections, delegated design, and specialty work.",
    sections: [
      ["A Kentucky seal needs a defensible record", "Survey, geotechnical information, existing conditions, utility correspondence, equipment data, and the owner’s program allow professional judgment. Missing information should be listed as an open decision, not hidden by a stamp."],
      ["Multiple local handoffs", "A package can touch city or urban-county building officials, planning, fire, MSD or water utilities, floodplain, stormwater, historic, and environmental reviewers. The index should make each responsibility visible."],
      ["Plan check through construction", "Comments, RFIs, substitutions, demolition discoveries, and delegated work can change the accepted design. Controlled revisions and field records keep the contractor and AHJ aligned."],
    ],
    steps: [
      "Identify the parcel’s Kentucky AHJ, planning, fire, utility, flood, stormwater, historic, and environmental handoffs and obtain the applicable checklists.",
      "Assemble survey, geotechnical, existing-condition, architecture, equipment, utility, and owner records before the responsible PE defines the accepted scope.",
      "Submit authenticated sheets through the named city, county, or urban-county process, separating specialty and utility-owner documents from the PE’s work.",
      "Track comments, inspections, RFIs, substitutions, and field changes; the responsible PE evaluates design or scope changes and issues controlled revisions.",
    ],
    faqs: [
      ["Does a Kentucky PE stamp replace a local permit?", "No. It communicates responsibility for a defined engineering scope. The local building official and separate fire, floodplain, stormwater, historic, utility, and environmental authorities still decide their approvals."],
      ["Can a PE stamp an addition from owner sketches alone?", "The responsible PE decides whether the record is adequate. Existing framing, foundation, soil, utility, flood, and connection conditions may require survey, measurements, openings, or other evidence."],
      ["What follows a correction on sealed drawings?", "The responsible PE evaluates affected design and calculations, coordinates related changes, submits a numbered response through the AHJ, and controls the revision used for construction."],
    ],
  },
];

function sourcesFor(metro: KentuckyMetro) {
  return [
    { label: metro.authority, url: metro.authorityUrl },
    { label: metro.planning, url: metro.planningUrl },
    { label: kentuckyCode.label, url: kentuckyCode.url },
    { label: kentuckyEnergy.label, url: kentuckyEnergy.url },
    { label: kentuckyFlood.label, url: kentuckyFlood.url },
    { label: metro.utility, url: metro.utilityUrl },
  ];
}
function makeServices(metro: KentuckyMetro): Batch2CoreServicePage[] {
  return profiles.map((profile) => ({
    serviceSlug: profile.serviceSlug,
    title: `${metro.name} ${profile.name} for Kentucky Permits`,
    description: `${profile.name} for ${metro.name} and ${metro.county}, coordinated with ${metro.authority}, ${metro.utility}, and the local terrain and climate.`,
    h1: `${profile.name} for ${metro.name} Projects`,
    kicker: `${metro.name} ${profile.focus}`,
    lede: `${metro.name} work must respond to ${metro.conditions.toLowerCase()} This ${profile.name.toLowerCase()} page connects those conditions to the actual local review path and correction workflow.`,
    permitAuthority: `${metro.authority} is the primary local permit contact. ${metro.localReview} The responsible Kentucky PE confirms discipline responsibility and the documents accepted for this project.`,
    codeContext: profile.code,
    localConditions: metro.conditions,
    projectTypes: profile.projectTypes,
    sections: profile.sections.map(([heading, body], index) => ({
      heading: `${metro.name}: ${heading}`,
      body: `${body} ${index === 0 ? metro.localReview : index === 1 ? `The relevant utility is ${metro.utility}; Kentucky environmental context is maintained by ${kentuckyEnergy.label}.` : `Comments should be returned through ${metro.authority} with related agency decisions preserved.`}`,
    })),
    permitSteps: profile.steps.map((step) => `${step} For this ${metro.name} parcel, coordinate the handoff with ${metro.authority}.`),
    faqs: profile.faqs.map(([question, answer]) => ({
      question: `${metro.name}: ${question}`,
      answer: `${answer} ${metro.localReview}`,
    })),
    sources: sourcesFor(metro),
  }));
}

const kentuckyBatch3: Batch2StateExpansion = {
  stateSlug: "kentucky",
  stateName: "Kentucky",
  stateAbbrev: "KY",
  hub: {
    title: "Kentucky Engineering Services for Local Permit Review",
    description: "Locally specific structural, MEP, civil, energy-compliance, and PE-stamped drawing support for Kentucky projects.",
    h1: "Engineering for Kentucky’s River, Karst, and Bluegrass Sites",
    kicker: "Kentucky permit and design coordination",
    lede: "Kentucky projects pass through city, county, or urban-county building and planning processes, with state code resources and separate water, sewer, flood, fire, and environmental reviews. The design path should start with the parcel and its actual ground, river, slope, and building conditions.",
    sections: [
      { heading: "State code context and local administration", body: "The Kentucky Department of Housing, Buildings and Construction provides code and building-safety resources, while local officials administer project intake and inspections. Planning, historic, fire, floodplain, stormwater, utility, and public-works reviews can be separate." },
      { heading: "Karst, slopes, rivers, and four seasons", body: "Bluegrass limestone and sinkholes, Ohio River alluvium and floodplains, steep Northern Kentucky hills, clay and urban fill, humid summers, winter ice, freeze-thaw, and severe storms can alter foundation, drainage, envelope, and access decisions." },
      { heading: "A correction workflow that carries into construction", body: "Residential additions, ADUs, historic alterations, and commercial infill benefit from measured conditions, utility evidence, a stated code path, and a controlled comment log. Each response should be checked across disciplines and updated when field conditions change." },
      { heading: "Highway, sewer, and karst review can converge", body: "A Kentucky project on a state route or near a karst-sensitive drainage system may need a Kentucky Transportation Cabinet access or right-of-way decision, a local MS4 or sanitary-sewer capacity response, and Kentucky Division of Water coverage beyond the building permit. Driveway sight distance, culverts, utility crossings, sinkhole protections, and downstream maintenance should be settled before a civil plan is treated as final." },
    ],
    faqs: [
      { question: "Who reviews a Kentucky building project?", answer: "The parcel determines whether a city, county, or urban-county official is the building AHJ. Kentucky state resources do not replace local planning, building, fire, flood, utility, or environmental reviews." },
      { question: "What site conditions are important in Kentucky?", answer: "Karst and sinkholes, shallow limestone, clay, alluvium, urban fill, steep slopes, river flooding, winter ice, freeze-thaw, and severe storms may affect design. The appropriate survey, geotechnical, and flood work is site-specific." },
      { question: "How should plan-check corrections be managed?", answer: "Keep the AHJ comments, numbered response, revised sheets and calculations, inter-discipline checks, and field follow-up in a controlled record. This prevents a small addition or ADU correction from being isolated from grading or utilities." },
    ],
    sources: [
      { label: "Kentucky Department of Housing, Buildings and Construction", url: "https://dhbc.ky.gov/" },
      { label: "Kentucky Energy and Environment Cabinet", url: "https://eec.ky.gov/Pages/default.aspx" },
      { label: "Kentucky Geological Survey", url: "https://www.uky.edu/KGS/" },
      { label: "FEMA flood maps", url: "https://msc.fema.gov/portal/home" },
    ],
  },
  metros: kentuckyMetros.map((metro) => ({
    slug: metro.slug,
    name: metro.name,
    county: metro.county,
    services: makeServices(metro),
  })),
};

export { kentuckyBatch3 };
export default kentuckyBatch3;