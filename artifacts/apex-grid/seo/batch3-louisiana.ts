import type {
  Batch2CoreServicePage,
  Batch2CoreServiceSlug,
  Batch2StateExpansion,
} from "./batch2-core-service-types";

type LouisianaMetro = {
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
const louisianaCode = {
  label: "Louisiana Office of State Uniform Construction Code",
  url: "https://www.doa.la.gov/doa/ocb/",
};
const louisianaEnvironment = {
  label: "Louisiana Department of Environmental Quality stormwater",
  url: "https://deq.louisiana.gov/page/storm-water",
};
const louisianaCoastal = {
  label: "Louisiana Coastal Protection and Restoration Authority",
  url: "https://coastal.la.gov/",
};
const louisianaFlood = { label: "FEMA flood maps", url: "https://msc.fema.gov/portal/home" };
const louisianaMetros: LouisianaMetro[] = [
  {
    slug: "new-orleans",
    name: "New Orleans",
    county: "Orleans Parish",
    authority: "City of New Orleans Safety and Permits",
    authorityUrl: "https://www.nola.gov/next/safety-and-permits/",
    planning: "New Orleans City Planning Commission",
    planningUrl: "https://www.nola.gov/next/city-planning/",
    utility: "Sewerage and Water Board of New Orleans",
    utilityUrl: "https://www.swbno.org/",
    conditions: "New Orleans’ low subsiding ground, high water table, intense rainfall, hurricane wind and surge exposure, soft deltaic soils, salt air, and historic masonry make elevation, corrosion, drainage, and existing-condition checks central.",
    localReview: "Safety and Permits may be joined by the City Planning Commission, historic-district, resilience, floodplain, fire, right-of-way, and Sewerage and Water Board reviews; Jefferson and St. Bernard parish parcels follow other AHJs.",
  },
  {
    slug: "baton-rouge",
    name: "Baton Rouge",
    county: "East Baton Rouge Parish",
    authority: "City-Parish of Baton Rouge Department of Development",
    authorityUrl: "https://www.brla.gov/165/Permits",
    planning: "East Baton Rouge Parish Planning Commission",
    planningUrl: "https://www.brla.gov/158/Planning-Commission",
    utility: "East Baton Rouge Parish Department of Environmental Services",
    utilityUrl: "https://www.brla.gov/235/Environmental-Services",
    conditions: "Baton Rouge’s loess and clay soils, flat-to-rolling drainage divides, intense rainfall, heat and humidity, flood-prone tributaries, and hurricane wind exposure affect foundations, stormwater, envelope, and utility planning.",
    localReview: "The City-Parish Department of Development and Planning Commission may be joined by floodplain, drainage, fire, right-of-way, environmental, and parish utility reviewers; Livingston or Ascension parish sites are separate.",
  },
  {
    slug: "shreveport",
    name: "Shreveport",
    county: "Caddo Parish",
    authority: "City of Shreveport Permits and Inspections",
    authorityUrl: "https://www.shreveportla.gov/196/Permits",
    planning: "City of Shreveport Metropolitan Planning Commission",
    planningUrl: "https://www.shreveportla.gov/189/Metropolitan-Planning-Commission",
    utility: "City of Shreveport Department of Water and Sewerage",
    utilityUrl: "https://www.shreveportla.gov/195/Water-Sewerage",
    conditions: "Shreveport’s Red River and bayou flood exposure, flat alluvial and clay soils, hot humid summers, severe thunderstorms, occasional ice, and established industrial corridors shape grading, foundations, and utility capacity.",
    localReview: "Permits and Inspections, the Metropolitan Planning Commission, floodplain, fire, public works, and Shreveport water and sewerage can have separate roles; Bossier Parish and Bossier City use other processes.",
  },
  {
    slug: "lafayette",
    name: "Lafayette",
    county: "Lafayette Parish",
    authority: "City of Lafayette Development and Planning",
    authorityUrl: "https://www.lafayettela.gov/DP",
    planning: "Lafayette Consolidated Government Planning and Zoning Commission",
    planningUrl: "https://www.lafayettela.gov/DP/Planning",
    utility: "Lafayette Utilities System",
    utilityUrl: "https://www.lus.org/",
    conditions: "Lafayette’s flat Acadiana prairie, high groundwater, clay and alluvial soils, intense rainfall, hurricane and tropical-storm exposure, subsidence, and bayou and drainage-channel networks make finished elevation and outfall decisions important.",
    localReview: "Lafayette Development and Planning may coordinate planning, floodplain, drainage, fire, right-of-way, environmental, and Lafayette Utilities System review; adjacent parish jurisdictions have separate authority.",
  },
  {
    slug: "lake-charles",
    name: "Lake Charles",
    county: "Calcasieu Parish",
    authority: "City of Lake Charles Permit Center",
    authorityUrl: "https://www.cityoflakecharles.com/department/index.php?structureid=18",
    planning: "City of Lake Charles Planning and Development",
    planningUrl: "https://www.cityoflakecharles.com/department/index.php?structureid=19",
    utility: "City of Lake Charles Water Division",
    utilityUrl: "https://www.cityoflakecharles.com/department/index.php?structureid=27",
    conditions: "Lake Charles’ Gulf-coast wind and surge exposure, very heavy rain, flat lowlands, soft soils, high groundwater, salt-laden air, petrochemical and industrial interfaces, and hurricane recovery history drive resilient design and careful utility coordination.",
    localReview: "The Permit Center and Planning and Development may be joined by floodplain, fire, public works, environmental, industrial, and Lake Charles water reviews; Calcasieu Parish sites outside the city follow another route.",
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
    focus: "hurricane-aware load paths and existing-building assessment",
    projectTypes: "Raised residential additions and ADUs, historic masonry renovations, hurricane repairs, industrial buildings, rooftop equipment, schools, and commercial shells.",
    code: "The Louisiana State Uniform Construction Code and local AHJ confirm the applicable adopted IBC/IRC edition, amendments, wind and flood criteria, existing-building provisions, special inspections, and resilience requirements. The calculations should identify the actual criteria.",
    sections: [
      ["Existing buildings after weather and time", "New openings, roof repairs, elevated additions, and ADUs often meet undocumented framing, corrosion, prior storm damage, or settlement. Measured conditions and permit records should separate verified construction from assumptions."],
      ["Coastal and delta foundations", "Soft deltaic or alluvial soils, high groundwater, subsidence, fill, scour, and flood-elevation constraints change footing, pile, connection, and retaining questions. Survey, geotechnical input, and flood data should be reconciled."],
      ["Continuous wind and flood load paths", "Plans and calculations should show roof-to-foundation connections, uplift, lateral resistance, elevated construction, openings, temporary support, and special inspections. Plan-check corrections should be coordinated with civil and MEP changes."],
    ],
    steps: [
      "Confirm the Louisiana parcel with the named AHJ, planning or historic status, flood map, elevation information, and storm or repair records before fixing the structural scope.",
      "Record framing, foundation, corrosion, soil, elevation, equipment, and demolition evidence for the responsible engineer, identifying conditions that require field verification.",
      "Coordinate structural sheets with civil drainage, finished elevations, flood openings, MEP penetrations, fire access, wind-resistant envelope details, and special inspections.",
      "Answer each plan-check comment by sheet and calculation through the AHJ, issuing a controlled revision when field discovery or a storm-repair change alters the load path.",
    ],
    faqs: [
      ["When does a Louisiana ADU need structural engineering?", "New foundations or piles, elevated construction, bearing-wall changes, roof and tie-down work, flood openings, unusual soil, or storm-damaged framing can require engineering. The AHJ and responsible engineer determine the scope."],
      ["Why are Lake Charles and Shreveport structural assumptions different?", "Lake Charles adds Gulf wind, surge, salt air, high groundwater, and soft soil concerns; Shreveport has Red River and bayou flooding, alluvial or clay ground, and different wind and ice exposures. A city swap is not a site analysis."],
      ["How should storm-repair plan-check comments be answered?", "Document existing damage, proposed repair limits, code and flood assumptions, revised details, and any field observations. Return a numbered response through the AHJ and re-evaluate connected systems."],
    ],
  },
  {
    serviceSlug: "mep-engineering",
    name: "MEP Engineering",
    focus: "humid-climate systems, resilient utilities, and occupied work",
    projectTypes: "New Orleans restaurants and renovations, Baton Rouge offices, Lafayette homes and ADUs, Lake Charles industrial work, hospitals, schools, and storm-recovery projects.",
    code: "The AHJ confirms Louisiana-adopted mechanical, plumbing, electrical, fuel-gas, fire, energy, and flood-related provisions. Equipment schedules, ventilation, service calculations, water and sewer, controls, emergency power, and life safety should agree.",
    sections: [
      ["Utility capacity and resilience", "Sewerage and Water Board, parish utilities, electric providers, fire officials, and industrial owners answer different connection and shutdown questions. Service, backflow, floodproofing, generator, and recovery assumptions should be address-specific."],
      ["Latent loads, corrosion, and flooding", "Louisiana cooling and dehumidification loads, wind-driven rain, salt air, high groundwater, flood exposure, and long outage risk affect equipment location, condensate, controls, emergency power, and corrosion protection."],
      ["Plan check for occupied buildings", "Risers, one-lines, equipment clearances, flood elevations, penetrations, grease waste, ventilation, access, and controls should be coordinated after each comment and equipment substitution, especially in restaurants and industrial spaces."],
    ],
    steps: [
      "Open the building and occupancy or storm-repair intake with the local AHJ and identify fire, health, floodplain, utility, right-of-way, and industrial reviews.",
      "Request address-specific electric, water, sewer, fire-flow, backflow, flood, and shutdown information from the named utility and fire contacts before sizing systems.",
      "Coordinate feeders, risers, ventilation, condensate, grease or process waste, elevated equipment, ADU connections, controls, emergency power, and penetrations.",
      "Return numbered MEP corrections through the AHJ and retain revised calculations, utility letters, substitutions, flood-resilience details, commissioning, and inspection records.",
    ],
    faqs: [
      ["What can limit MEP design for a Louisiana ADU?", "Existing service, sewer and water elevations, ventilation, hot-water capacity, flood elevation, generator or outage requirements, and the local permit path can all change the design. A detached ADU should not assume the main house service is adequate."],
      ["Why is New Orleans MEP work especially coordination-heavy?", "Low elevation, high groundwater, intense rain, combined or legacy drainage context, historic buildings, humidity, corrosion, and utility shutdown constraints bring multiple agency and maintenance interfaces into a small footprint."],
      ["How should a plan-check correction involving flood protection be handled?", "Revise the equipment elevation, access, piping, electrical, flood openings, or controls as applicable, cross-check structural and civil sheets, and submit a numbered response through the AHJ rather than treating flood measures as a note only."],
    ],
  },
  {
    serviceSlug: "civil-engineering",
    name: "Civil Engineering",
    focus: "low-elevation grading, drainage, flood, and utility design",
    projectTypes: "Residential additions and ADUs, elevated homes, subdivisions, industrial yards, commercial redevelopment, storm-recovery work, and public frontage improvements.",
    code: "Local parish and municipal drainage, zoning, subdivision, floodplain, right-of-way, erosion, utility, and coastal requirements apply alongside Louisiana DEQ stormwater and CPRA context where relevant. Plans should identify outfall, elevation, design storm, and maintenance responsibility.",
    sections: [
      ["Outfalls in a flat watershed", "Bayous, canals, pumps, ditches, storm sewers, and river or coastal receiving waters do not have interchangeable capacity. Survey, drainage areas, tailwater, flood maps, easements, and owner requirements should be current."],
      ["Finished elevations are project controls", "A new ADU, driveway, patio, or addition can redirect water into a crawlspace, neighbor, street, or pump system. Finished floors, accessible routes, flood openings, retaining edges, erosion controls, and utility profiles should be one coordinated surface."],
      ["Coastal and industrial interfaces", "Salt air, subsidence, process yards, utility corridors, public frontage, and construction dewatering can add environmental and maintenance obligations. Record drawings and locates need field confirmation before final profiles."],
    ],
    steps: [
      "Confirm the Louisiana city or parish, zoning, flood zone, base-flood or elevation information, watershed, disturbance, frontage, and utility service area.",
      "Prepare a current survey and drainage narrative, then obtain outfall, pump or canal, utility, fire-access, flood, coastal, and right-of-way information from the responsible owners.",
      "Coordinate grading, detention or conveyance, finished floors, ADU access, flood openings, erosion control, utility profiles, retaining, and building foundations.",
      "Track local, DEQ, flood, coastal, utility, and right-of-way corrections in one log and revise calculations, maintenance notes, and as-built elevation requirements.",
    ],
    faqs: [
      ["Can a Louisiana ADU avoid civil review?", "An interior conversion may have little civil scope, but a detached ADU, new impervious area, elevated foundation, floodplain, driveway, sewer tie, or local drainage rule can trigger review. The AHJ decides from the site."],
      ["What controls an Acadiana or coastal outfall?", "The receiving canal, bayou, pump or storm system, tailwater, flood and coastal conditions, local ordinance, easements, erosion requirements, and maintenance responsibility control it—not the nearest open ditch."],
      ["Why can a floodplain correction change the building plans?", "A revised elevation or drainage route can affect foundations, stairs, accessible paths, flood openings, utilities, equipment, and structural connections. Civil revisions should be checked with architecture, structure, and MEP."],
    ],
  },
  {
    serviceSlug: "energy-compliance",
    name: "Energy Compliance",
    focus: "Louisiana warm-humid and resilient building-code documentation",
    projectTypes: "Commercial shells, New Orleans renovations, multifamily buildings, residential additions and ADUs, schools, medical spaces, industrial support areas, and storm-recovery work.",
    code: "The Louisiana Office of State Uniform Construction Code and local AHJ identify the adopted energy-code edition, amendments, residential or commercial method, and alteration provisions. The record should state envelope, glazing, lighting, HVAC, service-water, controls, and flood or resilience assumptions.",
    sections: [
      ["The permit route establishes the method", "Occupancy, alteration or repair scope, conditioned area, and local intake determine forms and analysis. Architectural sections, lighting schedules, HVAC selections, and storm-repair limits must match the chosen Louisiana route."],
      ["Humidity and recovery are code coordination issues", "High latent loads, infiltration, roof exposure, wind-driven rain, salt air, flood recovery, outages, and generator operation affect systems and envelope details. A coastal hotel, inland clinic, and ADU need different operating assumptions."],
      ["Corrections with field consequences", "Air sealing, insulation continuity, controls, equipment substitutions, dehumidification, and functional tests should remain traceable when a reviewer asks for changes or a storm-recovery construction sequence evolves."],
    ],
    steps: [
      "Ask the AHJ and Louisiana Office of State Uniform Construction Code which energy edition, amendment, method, forms, occupancy, and alteration or repair provisions apply.",
      "Collect envelope, glazing, lighting, HVAC, ventilation, dehumidification, service-water, controls, schedules, utility, and recovery assumptions from the design team.",
      "Reconcile the compliance record with structural openings, MEP selections, flood elevations, wind-driven-rain details, historic limits, and ADU or addition boundaries.",
      "Return numbered energy corrections through the AHJ and retain revised forms, model inputs, substitutions, controls sequences, commissioning, and field-verification records.",
    ],
    faqs: [
      ["Is a Louisiana ADU always a new-building energy analysis?", "The adopted method, conditioned area, repair or alteration scope, relationship to the existing home, and AHJ determine the documentation. Confirm the route before modeling."],
      ["Does energy compliance guarantee storm resilience or savings?", "No. It tests specified code inputs and methods. Actual energy use and storm performance also depend on construction, maintenance, operation, flood, wind, equipment, and occupant conditions."],
      ["How should a plan checker’s energy correction be documented?", "Tie the comment to the form, model, envelope, and MEP sheets, identify changed assumptions, and coordinate the revision. Keep utility incentives and resilience claims separate from the code response."],
    ],
  },
  {
    serviceSlug: "pe-stamped-drawings",
    name: "PE-Stamped Drawings",
    focus: "defined engineering responsibility for Louisiana approvals",
    projectTypes: "Structural and civil site packages, MEP systems, hurricane repairs, commercial additions, ADUs where engineering is required, industrial work, and public improvements.",
    code: "The responsible Louisiana PE defines discipline and accepted scope under applicable practice rules and the AHJ checklist. Documents should identify state and local code assumptions, flood and wind evidence, existing-building limits, inspections, delegated design, and specialty work.",
    sections: [
      ["A seal needs coastal and site evidence", "Survey, elevations, geotechnical information, existing conditions, storm or corrosion records, utility correspondence, equipment data, and the owner’s program let the PE make professional judgment. A stamp cannot replace missing facts."],
      ["Many Louisiana agency handoffs", "A package may touch Safety and Permits, planning or historic review, fire, floodplain, drainage, utilities, DEQ, CPRA, and industrial owners. The drawing index should identify which sheets answer each handoff."],
      ["Corrections through recovery and construction", "Plan-check comments, RFIs, substitutions, demolition discoveries, storm repairs, and delegated work can change the accepted design. Controlled revisions and field observations keep superseded documents out of the work."],
    ],
    steps: [
      "Identify the Louisiana city or parish AHJ, planning, fire, flood, drainage, utility, coastal, environmental, and historic handoffs and obtain the applicable checklists.",
      "Assemble survey, elevation, geotechnical, existing-condition, architecture, equipment, utility, storm, and owner records before the responsible PE defines accepted scope.",
      "Submit authenticated sheets through the named city or parish process, separating specialty, utility-owner, contractor, and delegated-design documents from the PE’s work.",
      "Track corrections, inspections, RFIs, substitutions, storm-repair discoveries, and field changes; the responsible PE evaluates scope changes and issues controlled revisions.",
    ],
    faqs: [
      ["Does a Louisiana PE stamp replace a flood or building permit?", "No. It communicates responsibility for a defined engineering scope. The local AHJ and separate floodplain, fire, drainage, utility, coastal, DEQ, and historic authorities retain their decisions."],
      ["Can a PE stamp a hurricane-repair or ADU package from photographs?", "The responsible PE determines whether the record is adequate. Existing framing, corrosion, foundation, elevation, soil, utility, flood, and connection conditions may require measurements, openings, survey, or other evidence."],
      ["What follows plan-check comments on sealed drawings?", "The responsible PE evaluates affected sheets and calculations, coordinates changes with civil, architecture, MEP, and agency inputs, submits a numbered response, and controls the revision used in construction."],
    ],
  },
];

function sourcesFor(metro: LouisianaMetro) {
  return [
    { label: metro.authority, url: metro.authorityUrl },
    { label: metro.planning, url: metro.planningUrl },
    { label: louisianaCode.label, url: louisianaCode.url },
    { label: louisianaEnvironment.label, url: louisianaEnvironment.url },
    { label: louisianaCoastal.label, url: louisianaCoastal.url },
    { label: louisianaFlood.label, url: louisianaFlood.url },
    { label: metro.utility, url: metro.utilityUrl },
  ];
}
function makeServices(metro: LouisianaMetro): Batch2CoreServicePage[] {
  return profiles.map((profile) => ({
    serviceSlug: profile.serviceSlug,
    title: `${metro.name} ${profile.name} for Louisiana Permits`,
    description: `${profile.name} for ${metro.name} and ${metro.county}, coordinated with ${metro.authority}, ${metro.utility}, and local flood, wind, soil, and drainage conditions.`,
    h1: `${profile.name} for ${metro.name} Projects`,
    kicker: `${metro.name} ${profile.focus}`,
    lede: `${metro.name} projects must respond to ${metro.conditions.toLowerCase()} This ${profile.name.toLowerCase()} scope connects those facts to the responsible AHJ, utility owners, and a documented correction workflow.`,
    permitAuthority: `${metro.authority} is the primary local permit contact. ${metro.localReview} The responsible Louisiana PE confirms discipline responsibility and the documents accepted for this project.`,
    codeContext: profile.code,
    localConditions: metro.conditions,
    projectTypes: profile.projectTypes,
    sections: profile.sections.map(([heading, body], index) => ({
      heading: `${metro.name}: ${heading}`,
      body: `${body} ${index === 0 ? metro.localReview : index === 1 ? `The relevant utility is ${metro.utility}; coastal context is provided by ${louisianaCoastal.label}.` : `Comments should be returned through ${metro.authority}, with DEQ, flood, coastal, and utility decisions preserved separately.`}`,
    })),
    permitSteps: profile.steps.map((step) => `${step} For this ${metro.name} parcel, coordinate the handoff with ${metro.authority}.`),
    faqs: profile.faqs.map(([question, answer]) => ({
      question: `${metro.name}: ${question}`,
      answer: `${answer} ${metro.localReview}`,
    })),
    sources: sourcesFor(metro),
  }));
}

const louisianaBatch3: Batch2StateExpansion = {
  stateSlug: "louisiana",
  stateName: "Louisiana",
  stateAbbrev: "LA",
  hub: {
    title: "Louisiana Engineering Services for Flood- and Wind-Aware Permits",
    description: "Locally specific structural, MEP, civil, energy-compliance, and PE-stamped drawing support for Louisiana building and site projects.",
    h1: "Engineering for Louisiana’s Delta, River, and Gulf Conditions",
    kicker: "Louisiana permit and design coordination",
    lede: "Louisiana projects move through municipal or parish building, planning, flood, drainage, utility, fire, and environmental reviews, with the State Uniform Construction Code and coastal agencies providing statewide context. A useful engineering package starts with the address, elevation, receiving system, adopted code, and actual building condition.",
    sections: [
      { heading: "State code with local and parish review", body: "The Louisiana Office of State Uniform Construction Code provides statewide code resources, but the responsible city or parish administers permits, inspections, zoning, floodplain, drainage, fire, and public-way reviews. Coastal, DEQ, utility, and historic agencies can add separate decisions." },
      { heading: "Subsidence, soft ground, floods, and hurricanes", body: "New Orleans and coastal southwest Louisiana face low subsiding ground, high water, surge, salt air, soft soils, and hurricane wind; Baton Rouge, Lafayette, and Shreveport add clay, alluvial, bayou, river, and intense-rainfall conditions. Finished elevations, drainage, foundations, envelope, and utilities should reflect the site." },
      { heading: "A resilient correction workflow", body: "ADUs, additions, storm repairs, historic renovations, and industrial work benefit from current survey and elevation records, utility correspondence, a stated code path, and a controlled correction log. Each response should be coordinated across structure, civil, MEP, energy, and flood interfaces." },
      { heading: "Coastal and construction-water approvals", body: "In coastal parishes, a building permit does not by itself resolve a Coastal Use Permit or CPRA consistency question. A project that clears, fills, dewaters, crosses a canal, or discharges stormwater may also need LDEQ construction-stormwater coverage and an owner’s drainage or pump authorization. The design record should identify the receiving water, elevation datum, temporary controls, maintenance party, and agency sequence before site work begins." },
    ],
    faqs: [
      { question: "Who reviews a Louisiana building project?", answer: "The city or parish responsible for the parcel administers its local permit and inspections. The state code office, floodplain, fire, drainage, utilities, DEQ, CPRA, and historic authorities may have separate roles." },
      { question: "What conditions should a Louisiana design team check?", answer: "Subsidence, soft or alluvial soils, high groundwater, flood and storm surge, hurricane wind, salt air, intense rainfall, bayous and pumps, industrial interfaces, and existing storm damage can affect design. Site evidence should be scoped accordingly." },
      { question: "How should plan-check corrections be managed?", answer: "Keep the AHJ comments, numbered response, revised sheets and calculations, flood and utility decisions, inter-discipline checks, and field follow-up in one controlled record. This is critical when an addition or storm repair changes elevations or existing framing." },
    ],
    sources: [
      { label: "Louisiana Office of State Uniform Construction Code", url: "https://www.doa.la.gov/doa/ocb/" },
      { label: "Louisiana Department of Environmental Quality stormwater", url: "https://deq.louisiana.gov/page/storm-water" },
      { label: "Louisiana Coastal Protection and Restoration Authority", url: "https://coastal.la.gov/" },
      { label: "FEMA flood maps", url: "https://msc.fema.gov/portal/home" },
    ],
  },
  metros: louisianaMetros.map((metro) => ({
    slug: metro.slug,
    name: metro.name,
    county: metro.county,
    services: makeServices(metro),
  })),
};

export { louisianaBatch3 };
export default louisianaBatch3;