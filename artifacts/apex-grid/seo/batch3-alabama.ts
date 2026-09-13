import type {
  Batch2CoreServicePage,
  Batch2CoreServiceSlug,
  Batch2StateExpansion,
} from "./batch2-core-service-types";

type AlabamaMetro = {
  slug: string;
  name: string;
  county: string;
  authority: string;
  authorityUrl: string;
  planning: string;
  planningUrl: string;
  utility: string;
  utilityUrl: string;
  environment: string;
  environmentUrl: string;
  conditions: string;
  localReview: string;
};

const alabamaCode = {
  label: "Alabama Building Commission and locally adopted building ordinances",
  url: "https://abc.alabama.gov/",
};
const alabamaFlood = {
  label: "FEMA flood maps",
  url: "https://msc.fema.gov/portal/home",
};
const alabamaMetros: AlabamaMetro[] = [
  {
    slug: "birmingham",
    name: "Birmingham",
    county: "Jefferson County",
    authority: "City of Birmingham Department of Planning, Engineering and Permits",
    authorityUrl: "https://www.birminghamal.gov/government/departments/planning-engineering-permits",
    planning: "Birmingham Department of Planning, Engineering and Permits zoning and plan review",
    planningUrl: "https://www.birminghamal.gov/government/departments/planning-engineering-permits",
    utility: "Birmingham Water Works Board",
    utilityUrl: "https://www.bwwb.org/",
    environment: "Alabama Department of Environmental Management stormwater program",
    environmentUrl: "https://adem.alabama.gov/programs/water/stormwater.cnt",
    conditions: "Birmingham’s Valley-and-Ridge terrain, cherty residual soils, steep cuts, flashier urban drainage, and older masonry and steel building stock can change the design assumptions from one block to the next.",
    localReview: "Birmingham’s permit review is commonly joined by zoning, right-of-way, historic-district, floodplain, fire, and Birmingham Water Works coordination, so the parcel and scope should be confirmed before drawings are finalized.",
  },
  {
    slug: "huntsville",
    name: "Huntsville",
    county: "Madison County",
    authority: "City of Huntsville Building Permits and Inspections",
    authorityUrl: "https://www.huntsvilleal.gov/development/building-permits/",
    planning: "City of Huntsville Planning Department",
    planningUrl: "https://www.huntsvilleal.gov/development/planning/",
    utility: "Huntsville Utilities",
    utilityUrl: "https://www.hsvutil.org/",
    environment: "Alabama Department of Environmental Management stormwater program",
    environmentUrl: "https://adem.alabama.gov/programs/water/stormwater.cnt",
    conditions: "Huntsville’s limestone valleys, karst features, sinkhole-sensitive drainage, growing Research Park development, intense summer thunderstorms, and occasional tornado winds make survey, geotechnical, and utility verification important.",
    localReview: "A Huntsville parcel may pass through Building Permits and Inspections, Planning, Engineering, fire, floodplain, and Huntsville Utilities review; Madison County and surrounding municipalities use separate routes.",
  },
  {
    slug: "mobile",
    name: "Mobile",
    county: "Mobile County",
    authority: "City of Mobile Building Services",
    authorityUrl: "https://www.cityofmobile.org/government/departments/building-services/",
    planning: "City of Mobile Urban Development Department",
    planningUrl: "https://www.cityofmobile.org/government/departments/urban-development/",
    utility: "Mobile Area Water and Sewer System",
    utilityUrl: "https://www.mawss.com/",
    environment: "Alabama Department of Environmental Management coastal and stormwater programs",
    environmentUrl: "https://adem.alabama.gov/programs/coastal/",
    conditions: "Mobile’s low coastal grades, high water table, heavy rainfall, hurricane wind and surge exposure, salt-laden air, and soft Gulf Coastal Plain soils affect foundations, drainage, corrosion protection, and finished-floor decisions.",
    localReview: "Mobile projects may require Building Services, Urban Development, floodplain, right-of-way, fire, MAWSS, and coastal or environmental coordination; the exact parcel controls whether county or city procedures apply.",
  },
  {
    slug: "montgomery",
    name: "Montgomery",
    county: "Montgomery County",
    authority: "City of Montgomery Department of Permitting and Inspections",
    authorityUrl: "https://www.montgomeryal.gov/government/departments/planning",
    planning: "City of Montgomery Planning Department",
    planningUrl: "https://www.montgomeryal.gov/government/departments/planning",
    utility: "Montgomery Water Works and Sanitary Sewer Board",
    utilityUrl: "https://www.mwwssb.com/",
    environment: "Alabama Department of Environmental Management stormwater program",
    environmentUrl: "https://adem.alabama.gov/programs/water/stormwater.cnt",
    conditions: "Montgomery’s rolling Coastal Plain transition, clayey and sandy soils, heat, severe thunderstorms, occasional tornadoes, and flood-prone Alabama River and creek corridors influence grading, envelope, and foundation choices.",
    localReview: "Montgomery permit coordination can combine Permitting and Inspections, Planning, Engineering, floodplain, fire, right-of-way, and Montgomery Water Works review; unincorporated county work follows a different authority.",
  },
  {
    slug: "tuscaloosa",
    name: "Tuscaloosa",
    county: "Tuscaloosa County",
    authority: "City of Tuscaloosa Department of Inspection Services",
    authorityUrl: "https://www.tuscaloosa.com/government/departments/inspection-services",
    planning: "City of Tuscaloosa Planning and Zoning",
    planningUrl: "https://www.tuscaloosa.com/government/departments/planning",
    utility: "The Water and Sewer Board of the City of Tuscaloosa",
    utilityUrl: "https://www.tuscaloosawater.org/",
    environment: "Alabama Department of Environmental Management stormwater program",
    environmentUrl: "https://adem.alabama.gov/programs/water/stormwater.cnt",
    conditions: "Tuscaloosa’s Black Warrior River floodplain, red-clay slopes, expansive local soils, university-area infill, hot humid summers, and severe storm exposure make drainage and existing-condition checks especially consequential.",
    localReview: "Inspection Services, Planning and Zoning, Engineering, floodplain, fire, right-of-way, and the Tuscaloosa water and sewer board may each affect a city project; county parcels need their own intake.",
  },
];

type Profile = {
  serviceSlug: Batch2CoreServiceSlug;
  label: string;
  focus: string;
  projectTypes: string;
  codeContext: string;
  sectionOne: [string, string];
  sectionTwo: [string, string];
  sectionThree: [string, string];
  steps: [string, string, string, string];
  faqs: [[string, string], [string, string], [string, string]];
};

const profiles: Profile[] = [
  {
    serviceSlug: "structural-engineering",
    label: "Structural Engineering",
    focus: "load paths, existing-building investigation, and additions",
    projectTypes: "Residential additions and ADUs, porch and deck work, church and school renovations, warehouse alterations, tenant improvements, and new commercial shells.",
    codeContext: "The applicable locally adopted building ordinance and referenced IBC/IRC edition must be confirmed with the AHJ. The structural set should identify wind criteria, risk category, existing-building provisions, special inspections, and any Alabama local amendments actually used.",
    sectionOne: ["Existing framing before new loads", "Measured walls, footings, roof framing, and prior alterations are the starting evidence for an addition or ADU. The responsible engineer should distinguish observed conditions from assumptions and resolve discrepancies before sizing a new beam or connection.",
    ],
    sectionTwo: ["Foundations on Alabama ground", "Clay, sand, karst, fill, or coastal groundwater can produce very different bearing and settlement behavior. A footing, retaining wall, or residential addition should reconcile survey elevations, geotechnical recommendations when warranted, drainage, and neighboring foundations.",
    ],
    sectionThree: ["A reviewable load path", "Plans, details, calculations, demolition limits, temporary support notes, and special-inspection assignments should tell the plan checker how roof, floor, lateral, and foundation forces reach the ground without relying on undocumented field interpretation.",
    ],
    steps: [
      "Confirm the parcel with the named Alabama AHJ, zoning/planning office, flood information, and the existing permit record before fixing the addition, ADU, alteration, or new-building scope.",
      "Document measured framing, foundation exposures, soil or fill evidence, equipment loads, and demolition limits; send unresolved field conditions to the responsible engineer and architect.",
      "Coordinate the structural sheets with civil drainage, fire access, MEP penetrations, energy work, and any special-inspection or deferred-submittal items before submission.",
      "Log the AHJ plan-check comments, issue a numbered response and revised detail set, and require a responsible-engineer review when demolition or construction exposes a different load path.",
    ],
    faqs: [
      ["Does an Alabama ADU always need structural drawings?", "Not every ADU has the same submission requirement. New foundations, altered bearing walls, roof changes, openings, stairs, or unusual site conditions can require engineering; the local building official and responsible engineer determine the scope."],
      ["When is geotechnical input useful for a Birmingham or Huntsville addition?", "New footings, retaining walls, steep cuts, karst or sinkhole concerns, uncontrolled fill, and uncertain existing foundations are common reasons to seek geotechnical input. A small interior alteration may not need it."],
      ["How are plan-check corrections handled?", "Comments are mapped to sheets and calculations, answered by the responsible design professional, and resubmitted through the AHJ’s process. A field change that affects the load path should not be treated as closed by a generic response."],
    ],
  },
  {
    serviceSlug: "mep-engineering",
    label: "MEP Engineering",
    focus: "mechanical, electrical, plumbing, and utility coordination",
    projectTypes: "Restaurant and retail fit-outs, medical offices, multifamily additions, ADU utility extensions, industrial and distribution buildings, schools, and occupied-building renovations.",
    codeContext: "The AHJ confirms the applicable locally adopted mechanical, plumbing, electrical, fuel-gas, fire, and energy provisions and referenced editions. Equipment schedules, ventilation, service calculations, water demand, controls, and life-safety interfaces should agree across the permit set.",
    sectionOne: ["Utility capacity before equipment selection", "The local water/sewer utility, electric provider, and fire reviewer may each control a different interface. Service letters, meter information, grease or process waste, fire-flow data, and shutdown constraints should inform the design instead of being inferred from a neighboring property.",
    ],
    sectionTwo: ["Warm-humid operation", "Alabama cooling and latent loads, rain, outdoor-air requirements, corrosion near Mobile, and outage planning affect equipment and controls. Kitchens, clinics, labs, ADUs, and occupied additions need schedules and ventilation assumptions tied to their actual use.",
    ],
    sectionThree: ["Coordination through plan check", "Risers, one-lines, equipment clearances, penetrations, access, condensate, backflow, and emergency power should be checked against architecture and structure. A clear comment log makes substitutions and correction responses traceable after the first review.",
    ],
    steps: [
      "Open the building and occupancy intake with the named AHJ, then identify fire, health, utility, floodplain, and right-of-way reviews that could change the MEP scope.",
      "Request address-specific electric, water, sewer, and fire-flow information from the listed utility or fire authority and record service limitations before equipment schedules are locked.",
      "Coordinate ventilation, condensate, grease or process waste, feeders, risers, penetrations, controls, and ADU or addition tie-ins with architectural and structural sheets.",
      "Respond to each plan-check correction through the AHJ, preserving revised calculations, equipment substitutions, utility correspondence, commissioning obligations, and inspection notes.",
    ],
    faqs: [
      ["What changes MEP design for an Alabama residential addition or ADU?", "New load, service capacity, hot-water demand, ventilation, sewer connection, flood elevation, and the local permit route can all change the design. Existing service should be verified rather than assumed adequate."],
      ["Why is Mobile MEP coordination different from Huntsville work?", "Mobile’s coastal humidity, salt air, high water table, hurricane exposure, and surge considerations affect equipment placement and corrosion choices, while Huntsville may raise karst drainage and growing-campus utility issues."],
      ["What is the useful response to an MEP plan-check correction?", "Identify the comment, revise the affected drawing or calculation, cross-check every related discipline, and return a numbered response through the responsible AHJ. A field substitution needs the same review when it changes loads or code assumptions."],
    ],
  },
  {
    serviceSlug: "civil-engineering",
    label: "Civil Engineering",
    focus: "grading, stormwater, utilities, and access",
    projectTypes: "Residential additions and ADUs, infill lots, subdivisions, parking and warehouse sites, institutional expansions, commercial redevelopment, and right-of-way improvements.",
    codeContext: "Local subdivision, zoning, drainage, floodplain, erosion, right-of-way, and utility standards apply with Alabama environmental permits where disturbance triggers them. The civil package should identify the receiving system, design storm, maintenance responsibility, and applicable local criteria.",
    sectionOne: ["A site plan follows the receiving watershed", "Impervious cover, outlet capacity, downstream flooding, floodway status, and construction disturbance determine more than a generic detention detail. Existing inlets, streams, ditches, easements, and neighboring grades need field and record verification.",
    ],
    sectionTwo: ["Grading around occupied neighborhoods", "An addition or ADU can redirect runoff toward a basement, crawlspace, alley, or adjacent lot. Finished-floor elevations, accessible routes, retaining edges, erosion controls, utility crossings, and construction access should be shown as one coordinated surface.",
    ],
    sectionThree: ["Utility and public-frontage evidence", "Record drawings and utility locates are useful but do not prove as-built depth or alignment. Water, sewer, electric, fire access, curb cuts, sidewalks, and maintenance access should be reconciled with the survey before the civil plan enters review.",
    ],
    steps: [
      "Confirm the city or county parcel, zoning, flood map, watershed, disturbance boundary, public frontage, and utility service area before selecting the civil review path.",
      "Prepare a current survey and drainage narrative, then obtain utility, outfall, fire-access, and right-of-way information from the named agencies and owners.",
      "Coordinate grading, detention or infiltration, erosion control, finished floors, ADU/addition access, utility profiles, and landscape or tree constraints with the building set.",
      "Track civil, stormwater, erosion, and right-of-way comments in one correction log; revise calculations, sheets, maintenance notes, and as-built requirements before closeout.",
    ],
    faqs: [
      ["Can a small Alabama ADU bypass civil review?", "An interior project may have little civil scope, but a detached ADU, new driveway, grading, sewer connection, floodplain site, or added impervious area can trigger local drainage or utility review. The jurisdiction decides from the site and disturbance."],
      ["What controls an Alabama outfall?", "The local drainage ordinance, receiving channel or system, downstream capacity, floodplain and floodway conditions, easements, environmental permit conditions, and maintenance responsibility control it—not the nearest ditch alone."],
      ["Why are plan-check corrections often iterative?", "A grade change can affect a wall, finished floor, accessible route, utility profile, detention volume, and building foundation. Each correction should be checked across those interfaces before a revised plan is returned."],
    ],
  },
  {
    serviceSlug: "energy-compliance",
    label: "Energy Compliance",
    focus: "envelope, HVAC, lighting, and documented code pathways",
    projectTypes: "Commercial shells, tenant improvements, multifamily buildings, residential additions and ADUs, schools, medical spaces, and industrial support areas.",
    codeContext: "Alabama does not provide one single permit path for every municipality; the AHJ identifies its adopted energy provisions, edition, amendments, and residential or commercial method. The compliance record should state envelope, lighting, HVAC, service-water, controls, and alteration assumptions.",
    sectionOne: ["Compliance starts with the local permit record", "Occupancy, alteration category, conditioned floor area, and the city or county’s adopted method establish the forms and calculations. Architectural sections and MEP schedules must match the selected compliance path rather than a generic national template.",
    ],
    sectionTwo: ["Humidity, heat, and real operating schedules", "Cooling and latent loads, infiltration, roof exposure, controls, plug loads, and ventilation affect Alabama buildings differently from a dry climate. Mobile adds coastal corrosion and wind-driven-rain concerns; inland sites add severe-storm and outage considerations.",
    ],
    sectionThree: ["Corrections and field verification", "The owner, architect, contractor, and engineer should assign control sequences, insulation continuity, air sealing, lighting controls, and functional tests. Plan-check responses should preserve the model inputs and explain equipment substitutions instead of silently changing them.",
    ],
    steps: [
      "Ask the responsible AHJ which Alabama energy edition, local amendment, residential or commercial method, forms, and alteration provisions apply to the address and occupancy.",
      "Collect envelope assemblies, glazing, lighting schedules, HVAC equipment, ventilation, service water, controls, operating hours, and utility information from the coordinated design team.",
      "Reconcile the energy documents with structural openings, MEP equipment, ADU or addition boundaries, fire requirements, and any flood or wind-driven-rain envelope decisions.",
      "Return numbered energy corrections through the AHJ and retain revised forms, model files, equipment substitutions, control sequences, and field verification or commissioning records.",
    ],
    faqs: [
      ["Does an Alabama addition or ADU automatically use a new-building energy path?", "Not necessarily. The adopted local code, project size, alteration scope, conditioned area, and whether the work is residential or commercial determine the documentation. The AHJ should confirm the path before modeling."],
      ["Can a model guarantee lower utility bills?", "No. A compliance calculation tests specified weather, schedules, envelope, equipment, and controls against a code method. Occupant behavior, maintenance, rates, and construction quality affect actual use."],
      ["How should energy plan-check comments be answered?", "Tie each comment to the applicable form, calculation, drawing, and field responsibility; revise all affected disciplines and identify changed assumptions in the response. Keep voluntary utility incentives separate from code compliance."],
    ],
  },
  {
    serviceSlug: "pe-stamped-drawings",
    label: "PE-Stamped Drawings",
    focus: "defined professional responsibility and permit-ready coordination",
    projectTypes: "Structural alterations, civil site plans, MEP packages, commercial additions, residential additions and ADUs where engineering is required, and public or industrial improvements.",
    codeContext: "A responsible Alabama PE defines the discipline and scope accepted under applicable engineering-practice rules and the AHJ checklist. The package should identify adopted local codes, existing-building assumptions, special inspections, deferred design, and documents prepared by other qualified parties.",
    sectionOne: ["A seal follows evidence and scope", "Survey, geotechnical information, existing conditions, utility correspondence, equipment data, and the owner’s program give the PE a basis for professional judgment. A seal is not a substitute for missing site facts or another discipline’s responsibility.",
    ],
    sectionTwo: ["Alabama jurisdiction boundaries", "City and county building officials, planning, fire, utilities, stormwater, floodplain, and environmental agencies may each receive part of a project. The drawing index should make clear which sheets answer each handoff and which approvals remain separate.",
    ],
    sectionThree: ["The correction record continues through construction", "A PE should review plan-check comments, substitutions, RFIs, demolition discoveries, and delegated-design interfaces within the accepted scope. Revised sealed documents and observation records should be controlled so field crews do not rely on superseded sheets.",
    ],
    steps: [
      "Identify the parcel’s Alabama AHJ, planning, fire, utility, flood, stormwater, and environmental handoffs and obtain each applicable checklist before assigning the PE scope.",
      "Assemble survey, geotechnical, existing-condition, architectural, equipment, utility, and owner records; the responsible PE then determines which discipline documents can be accepted.",
      "Route the authenticated set through the named city or county process, keeping specialty, contractor, utility-owner, and delegated-design documents clearly outside or inside the defined scope.",
      "Track plan-check comments, inspections, RFIs, substitutions, and field conditions; the responsible PE evaluates scope changes and issues revisions when the accepted design changes.",
    ],
    faqs: [
      ["Does an Alabama PE stamp replace the city or county permit?", "No. The seal communicates professional responsibility for a defined scope; the city or county AHJ and separate fire, utility, floodplain, stormwater, and environmental authorities still decide their approvals."],
      ["Can a PE stamp an ADU or residential addition from photographs alone?", "The PE determines whether the available record is adequate. Existing framing, foundation, soil, utility, flood, and connection conditions may require measured verification, opening observations, survey, or other supporting information."],
      ["What should happen after a plan-check correction?", "The responsible PE reviews the comment and affected design, coordinates any architectural or utility changes, submits a numbered response and controlled revision, and records whether the correction changes the accepted scope."],
    ],
  },
];

function sourcesFor(metro: AlabamaMetro) {
  return [
    { label: metro.authority, url: metro.authorityUrl },
    { label: metro.planning, url: metro.planningUrl },
    { label: alabamaCode.label, url: alabamaCode.url },
    { label: metro.environment, url: metro.environmentUrl },
    { label: alabamaFlood.label, url: alabamaFlood.url },
  ];
}

function makeServices(metro: AlabamaMetro): Batch2CoreServicePage[] {
  return profiles.map((profile) => ({
    serviceSlug: profile.serviceSlug,
    title: `${metro.name} ${profile.label} for Alabama Permitted Projects`,
    description: `${profile.label} for ${metro.name} and ${metro.county}, coordinated with ${metro.authority} and the site conditions of ${metro.name}.`,
    h1: `${profile.label} for ${metro.name} Projects`,
    kicker: `${metro.name} ${profile.focus}`,
    lede: `${metro.name} projects need engineering that fits ${metro.conditions.toLowerCase()} ${profile.label.toLowerCase()} should use verified site information, the applicable local review path, and a correction record rather than a one-size-fits-all drawing set.`,
    permitAuthority: `${metro.authority} is the primary building or permit contact for work inside its jurisdiction. ${metro.localReview} The responsible Alabama PE confirms discipline responsibility and the documents the AHJ will accept.`,
    codeContext: profile.codeContext,
    localConditions: metro.conditions,
    projectTypes: profile.projectTypes,
    sections: [
      { heading: `${metro.name}: ${profile.sectionOne[0]}`, body: `${profile.sectionOne[1]} ${metro.localReview}` },
      { heading: `${metro.name}: ${profile.sectionTwo[0]}`, body: `${profile.sectionTwo[1]} In ${metro.name}, ${metro.conditions.toLowerCase()}` },
      { heading: `${metro.name}: ${profile.sectionThree[0]}`, body: `${profile.sectionThree[1]} The named AHJ’s correction process should control the final response, not an assumed statewide workflow.` },
    ],
    permitSteps: profile.steps.map((step) => `${step} For ${metro.name}, coordinate this step with ${metro.authority}.`),
    faqs: profile.faqs.map(([question, answer]) => ({
      question: `${metro.name}: ${question}`,
      answer: `${answer} ${metro.localReview}`,
    })),
    sources: sourcesFor(metro),
  }));
}

const alabamaBatch3: Batch2StateExpansion = {
  stateSlug: "alabama",
  stateName: "Alabama",
  stateAbbrev: "AL",
  hub: {
    title: "Alabama Engineering Services for Locally Permitted Projects",
    description: "Research-informed structural, MEP, civil, energy-compliance, and PE-stamped drawing support for Alabama projects, matched to the responsible city or county AHJ.",
    h1: "Engineering for Alabama’s Distinct Building Conditions",
    kicker: "Alabama permit and design coordination",
    lede: "Alabama has no single permit counter for every project: municipalities and counties administer their own building, zoning, flood, utility, and site reviews, while the Alabama Building Commission and environmental agencies provide important statewide context. Engineering should begin with the parcel, adopted local code, and actual ground and climate conditions.",
    sections: [
      { heading: "Local adoption controls the permit path", body: "The Alabama Building Commission is a statewide reference point, but the city or county AHJ determines the adopted building, residential, energy, fire, and site provisions for the parcel. Planning, right-of-way, floodplain, utility, and fire reviews can be separate from building intake." },
      { heading: "From karst and red clay to the Gulf Coast", body: "North Alabama limestone and sinkhole-sensitive ground, Birmingham’s steep residual terrain, inland clay and sand, and Mobile’s soft coastal soils and high water table create materially different foundation and drainage questions. Heat, severe thunderstorms, tornado winds, hurricanes, storm surge, and river flooding should be addressed with current survey and flood information." },
      { heading: "A usable correction workflow", body: "A disciplined package records existing conditions, code assumptions, agency handoffs, utility capacity, and open decisions. Each plan-check comment should map to a revised sheet or calculation, with the responsible professional reviewing changes that affect an addition, ADU, site, or occupied building." },
      { heading: "Land disturbance and public-frontage handoffs", body: "A project that disturbs soil, changes a driveway, or works in a public right-of-way may need more than a building permit. Alabama Department of Environmental Management stormwater coverage, a local MS4 erosion review, Alabama Department of Transportation access approval, and water or sewer service commitments can each affect the site plan. Confirm the disturbance boundary, outfall, frontage, and utility owner before civil and architectural documents are locked." },
    ],
    faqs: [
      { question: "Does Alabama have one statewide building permit office?", answer: "No. The responsible municipality or county administers the project permit and may apply locally adopted codes and processes. State agencies and utility or environmental owners can have separate authority." },
      { question: "What Alabama conditions deserve early engineering attention?", answer: "The site may involve karst or sinkholes, steep residual soils, expansive clay, soft coastal soils, high groundwater, river or coastal flooding, hurricanes, tornadoes, and intense rainfall. Survey, geotechnical, and flood checks should be scoped to the site." },
      { question: "How should an Alabama plan-check response be managed?", answer: "Use the responsible AHJ’s correction process, answer each comment by sheet and calculation, coordinate related disciplines, and issue controlled revisions. A generic response does not close an altered field condition or change in scope." },
    ],
    sources: [
      { label: "Alabama Building Commission", url: "https://abc.alabama.gov/" },
      { label: "Alabama Department of Environmental Management stormwater", url: "https://adem.alabama.gov/programs/water/stormwater.cnt" },
      { label: "Alabama Department of Environmental Management coastal program", url: "https://adem.alabama.gov/programs/coastal/" },
      { label: "FEMA flood maps", url: "https://msc.fema.gov/portal/home" },
    ],
  },
  metros: alabamaMetros.map((metro) => ({
    slug: metro.slug,
    name: metro.name,
    county: metro.county,
    services: makeServices(metro),
  })),
};

export { alabamaBatch3 };
export default alabamaBatch3;