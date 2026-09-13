import type {
  Batch2CoreServicePage,
  Batch2CoreServiceSlug,
  Batch2StateExpansion,
} from "./batch2-core-service-types";

type ArkansasMetro = {
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

const arkansasCode = {
  label: "Arkansas Department of Health Arkansas Fire Prevention Code resources",
  url: "https://www.healthy.arkansas.gov/programs-services/topics/arkansas-fire-prevention-code",
};
const arkansasStormwater = {
  label: "Arkansas Department of Energy and Environment stormwater",
  url: "https://www.adeq.state.ar.us/water/permits/stormwater/",
};
const arkansasFlood = { label: "FEMA flood maps", url: "https://msc.fema.gov/portal/home" };
const arkansasMetros: ArkansasMetro[] = [
  {
    slug: "little-rock",
    name: "Little Rock",
    county: "Pulaski County",
    authority: "City of Little Rock Development Services",
    authorityUrl: "https://www.littlerock.gov/city-administration/city-departments/development-services/",
    planning: "City of Little Rock Planning and Development",
    planningUrl: "https://www.littlerock.gov/city-administration/city-departments/planning-and-development/",
    utility: "Central Arkansas Water",
    utilityUrl: "https://carkw.com/",
    conditions: "Little Rock’s Arkansas River and Fourche Bottom flood exposure, rolling Ouachita foothills, expansive and variable clay, intense thunderstorms, and established neighborhoods create close ties between drainage, foundations, and redevelopment.",
    localReview: "Little Rock Development Services may coordinate planning, floodplain, fire, right-of-way, stormwater, and Central Arkansas Water matters; North Little Rock and unincorporated Pulaski County use different AHJs.",
  },
  {
    slug: "fayetteville",
    name: "Fayetteville",
    county: "Washington County",
    authority: "City of Fayetteville Development Services",
    authorityUrl: "https://www.fayetteville-ar.gov/272/Development-Services",
    planning: "City of Fayetteville Planning Division",
    planningUrl: "https://www.fayetteville-ar.gov/186/Planning",
    utility: "Fayetteville Water and Sewer",
    utilityUrl: "https://www.fayetteville-ar.gov/246/Water-Sewer",
    conditions: "Fayetteville’s Ozark limestone and karst, hilly sites, rapid university-area growth, flash runoff, winter freeze-thaw, and occasional severe wind make subsurface and access assumptions particularly site-specific.",
    localReview: "Fayetteville Development Services and Planning may be joined by stormwater, fire, floodplain, right-of-way, and water/sewer reviewers; Washington County parcels are not on the city’s permit path.",
  },
  {
    slug: "fort-smith",
    name: "Fort Smith",
    county: "Sebastian County",
    authority: "City of Fort Smith Building Services",
    authorityUrl: "https://www.fortsmithar.gov/departments/development-services/building-services",
    planning: "City of Fort Smith Planning Department",
    planningUrl: "https://www.fortsmithar.gov/departments/development-services/planning",
    utility: "Fort Smith Utility Department",
    utilityUrl: "https://www.fortsmithar.gov/departments/utility",
    conditions: "Fort Smith’s Arkansas River valley, alluvial and clay soils, industrial redevelopment, large summer storms, freeze-thaw cycles, and tornado exposure affect site drainage, pavement, foundations, and utility capacity.",
    localReview: "Building Services, Planning, Engineering, fire, floodplain, and Fort Smith utilities can have distinct reviews; Sebastian County and the Oklahoma side of the metro are separate jurisdictions.",
  },
  {
    slug: "jonesboro",
    name: "Jonesboro",
    county: "Craighead County",
    authority: "City of Jonesboro Community Development",
    authorityUrl: "https://www.jonesboro.org/department/index.php?structureid=16",
    planning: "City of Jonesboro Metropolitan Area Planning Commission",
    planningUrl: "https://www.jonesboro.org/department/index.php?structureid=15",
    utility: "City Water and Light of Jonesboro",
    utilityUrl: "https://www.jonesboro.org/department/index.php?structureid=13",
    conditions: "Jonesboro’s flat-to-gently rolling Delta-edge terrain, low-lying drainage, soft and shrink-swell soils, fast commercial growth, winter freezes, and spring severe storms make detention and utility coordination important.",
    localReview: "Jonesboro Community Development and the Metropolitan Area Planning Commission may coordinate building, subdivision, drainage, fire, flood, and City Water and Light questions for a city parcel.",
  },
  {
    slug: "bentonville",
    name: "Bentonville",
    county: "Benton County",
    authority: "City of Bentonville Building Safety",
    authorityUrl: "https://www.bentonvillear.com/263/Building-Safety",
    planning: "City of Bentonville Community Development",
    planningUrl: "https://www.bentonvillear.com/256/Community-Development",
    utility: "Bentonville Water Utilities",
    utilityUrl: "https://www.bentonvillear.com/178/Water-Utilities",
    conditions: "Bentonville’s Ozark karst and chert, steepening development sites, rapid corporate and residential growth, localized flash flooding, ice and freeze-thaw, and major roadway expansion complicate grading and utility interfaces.",
    localReview: "Bentonville Building Safety and Community Development coordinate zoning, subdivision, stormwater, traffic, fire, floodplain, and Bentonville Water Utilities requirements; Benton County sites follow another intake.",
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
    focus: "load-path design and existing-building investigation",
    projectTypes: "Ozark hillside additions, ADUs, porch and deck work, retail conversions, industrial alterations, schools, and new commercial buildings.",
    code: "The AHJ identifies the adopted Arkansas building or residential code edition, local amendments, wind and snow criteria, existing-building provisions, and special-inspection requirements. Calculations should state the criteria actually used.",
    sections: [
      ["Existing conditions in growing neighborhoods", "Measured framing, foundation exposure, prior permits, and demolition limits are especially important where a Fayetteville or Bentonville addition meets older construction or a commercial shell."],
      ["Karst, clay, and river-valley foundations", "Ozark limestone and chert, sinkhole-sensitive ground, Delta-edge clay, alluvial deposits, and fill do not share one bearing assumption. Geotechnical input, drainage, and neighboring foundation movement should be evaluated when the scope warrants it."],
      ["Corrections that preserve the load path", "A reviewer should be able to follow gravity and lateral forces through plans, details, calculations, temporary support, and special-inspection notes. A plan-check response must also address related architectural and civil changes."],
    ],
    steps: [
      "Confirm the address with the named Arkansas AHJ, planning office, flood map, and existing permit record before fixing the structural scope for a new building, addition, or ADU.",
      "Record framing, footing, soil, slope, equipment, and demolition evidence, distinguishing field observations from assumptions for the responsible engineer.",
      "Coordinate beams, openings, lateral bracing, foundations, grading, MEP penetrations, fire access, and special inspections with the complete permit set.",
      "Answer each plan-check comment by sheet and calculation through the AHJ, issuing a controlled revision when demolition or field conditions change the design.",
    ],
    faqs: [
      ["What can trigger structural engineering for an Arkansas ADU?", "New footings, bearing-wall openings, roof changes, stairs, retaining conditions, unusual soil, and connections to an existing house can trigger engineering or additional documentation. The AHJ and responsible engineer decide from the actual scope."],
      ["Are Fayetteville and Bentonville foundations interchangeable?", "No. Both have Ozark ground, but slope, karst, fill, drainage, and neighboring development vary by parcel. A local geotechnical recommendation or field verification may be appropriate."],
      ["How should structural plan-check comments be closed?", "Map each correction to the affected drawing or calculation, coordinate other disciplines, submit the AHJ’s required response, and re-evaluate any field condition that changes the original load path."],
    ],
  },
  {
    serviceSlug: "mep-engineering",
    name: "MEP Engineering",
    focus: "utility capacity and building-system coordination",
    projectTypes: "Northwest Arkansas retail and office fit-outs, hospitals, restaurants, ADU service extensions, industrial buildings, schools, and occupied additions.",
    code: "The responsible AHJ confirms Arkansas-adopted mechanical, plumbing, electrical, fuel-gas, fire, and energy provisions. Equipment, ventilation, electrical demand, water and sewer loads, controls, and fire interfaces must remain consistent across the submission.",
    sections: [
      ["Utility evidence before schedules", "Central Arkansas Water, local city utilities, electric providers, and fire officials answer different capacity questions. A permit set should not infer transformer, sewer, fire-flow, or grease capacity from a nearby building."],
      ["Climate and occupancy are design inputs", "Arkansas heat and humidity, winter freezes, ice, severe storms, process loads, and occupied-building shutdowns affect HVAC, piping, controls, and emergency power. Restaurant, clinic, ADU, and warehouse assumptions are not interchangeable."],
      ["Correction responses across disciplines", "Risers, one-lines, equipment clearances, penetrations, condensate, grease waste, access, and controls should be rechecked after every reviewer comment or equipment substitution."],
    ],
    steps: [
      "Open the building and occupancy record with the local AHJ and identify fire, health, floodplain, utility, and right-of-way reviews before selecting systems.",
      "Request address-specific service, meter, water, sewer, fire-flow, and shutdown information from the named utility and fire contacts.",
      "Coordinate feeders, risers, ventilation, condensate, grease or process waste, ADU tie-ins, penetrations, controls, and equipment access with architecture and structure.",
      "Return a numbered plan-check response through the AHJ and preserve revised calculations, utility correspondence, substitutions, commissioning, and inspection obligations.",
    ],
    faqs: [
      ["What MEP issue is common in a new Arkansas ADU?", "The existing electrical service, water pressure, sewer route, ventilation, hot-water capacity, and location in a flood or steep-drainage area should be verified. A detached ADU may need a different utility arrangement than an interior conversion."],
      ["Why do Northwest Arkansas projects need utility conversations early?", "Rapid growth can make transformer, water, sewer, fire-flow, and roadway capacity project-specific. Bentonville or Fayetteville records are not a guarantee for the next parcel."],
      ["What makes a useful MEP correction response?", "Identify the reviewer comment, revise the affected plans and calculations, check related disciplines, and state equipment or control changes. A field substitution that changes load or ventilation needs the same discipline review."],
    ],
  },
  {
    serviceSlug: "civil-engineering",
    name: "Civil Engineering",
    focus: "grading, watershed, utilities, and public frontage",
    projectTypes: "Residential additions and ADUs, Ozark hillside development, subdivisions, retail sites, industrial yards, institutional expansions, and roadway or sidewalk improvements.",
    code: "City and county zoning, subdivision, drainage, floodplain, erosion, right-of-way, and utility standards govern the site package. ADEQ stormwater coverage may be a separate obligation based on disturbance and receiving waters.",
    sections: [
      ["Watershed-specific grading", "An Arkansas River, Fourche, Ozark creek, Delta ditch, or local detention system presents different outfall and downstream questions. Survey, hydrology, flood information, easements, and maintenance responsibility should be current."],
      ["Small additions can change drainage", "A detached ADU, new driveway, patio, or addition can send water toward a crawlspace, neighbor, street, or karst opening. Finished floors, accessible routes, retaining edges, and erosion controls belong on one coordinated surface."],
      ["Records are not utility locates", "City record drawings, locates, potholes, and field observations answer different questions. Water, sewer, electric, fire access, curb cuts, sidewalks, and construction staging should be checked against survey and agency standards."],
    ],
    steps: [
      "Confirm the parcel’s city or county, zoning, floodplain, watershed, disturbance area, road frontage, and utility service area before selecting the civil submittal path.",
      "Prepare a current survey and drainage narrative, then request outfall, utility, fire-access, and right-of-way information from the responsible agencies.",
      "Coordinate grading, detention or infiltration, erosion control, finished floors, ADU access, utility profiles, and retaining conditions with the building documents.",
      "Track city, county, ADEQ, stormwater, and right-of-way corrections in one log and revise calculations, sheets, maintenance notes, and as-built requirements before closeout.",
    ],
    faqs: [
      ["Does a small residential addition need civil engineering in Arkansas?", "Not always. New impervious area, a driveway, detached ADU, floodplain, steep slope, retaining wall, sewer extension, or local drainage rule can create civil scope; the AHJ decides from the site."],
      ["What determines a Bentonville or Fayetteville outfall?", "The receiving watershed, downstream capacity, local ordinance, flood conditions, easements, erosion requirements, and maintenance responsibility determine it. A convenient nearby ditch is not automatically an approved outlet."],
      ["Why can one grading correction affect the building permit?", "Changing a grade can move the foundation, finished floor, accessible route, retaining wall, utility profile, and detention volume. The revised civil response should be cross-checked with structural and architectural sheets."],
    ],
  },
  {
    serviceSlug: "energy-compliance",
    name: "Energy Compliance",
    focus: "Arkansas code documentation for envelope and systems",
    projectTypes: "Commercial shells, Northwest Arkansas offices and retail, multifamily buildings, residential additions and ADUs, schools, medical projects, and industrial support spaces.",
    code: "The local AHJ confirms the applicable Arkansas energy-code edition, amendments, residential or commercial method, and existing-building provisions. The documentation should identify envelope, glazing, lighting, HVAC, service-water, controls, and operating assumptions.",
    sections: [
      ["The AHJ establishes the method", "Occupancy, alteration category, conditioned area, and local intake determine the forms and analysis. Architectural sections, lighting schedules, and MEP equipment must match the selected Arkansas compliance route."],
      ["Freeze and heat both matter", "Arkansas projects balance humid cooling, winter heating, ice, infiltration, roof exposure, controls, and severe-storm operation. A mountain-site schedule and a river-valley warehouse schedule should not be copied."],
      ["A transparent correction record", "Model inputs, air sealing, insulation continuity, controls, equipment substitutions, and field verification should remain traceable when a plan checker asks for clarification or the contractor changes a selection."],
    ],
    steps: [
      "Ask the local AHJ which Arkansas energy edition, amendment, method, forms, occupancy, and alteration provisions apply to the address.",
      "Collect envelope assemblies, glazing, lighting, HVAC, ventilation, water heating, controls, schedules, and utility assumptions from the coordinated design.",
      "Reconcile energy documents with openings, MEP equipment, fire requirements, ADU or addition boundaries, and roof or flood-resilience decisions.",
      "Return numbered energy corrections through the AHJ and retain revised forms, model inputs, equipment substitutions, sequences, and field-testing records.",
    ],
    faqs: [
      ["Is an Arkansas ADU always modeled as a new building?", "The adopted local method and code provisions, conditioned area, alteration scope, and relationship to the existing house determine the documentation. Confirm the path with the AHJ rather than assuming."],
      ["Does compliance modeling predict a utility bill?", "No. It tests documented weather, schedules, envelope, equipment, controls, and method assumptions. Occupants, maintenance, rates, and construction quality determine actual performance."],
      ["How are energy corrections coordinated?", "Tie each comment to the applicable form, model, and drawing, then check architectural and MEP revisions together. Voluntary utility incentives should remain separate from the permit-code response."],
    ],
  },
  {
    serviceSlug: "pe-stamped-drawings",
    name: "PE-Stamped Drawings",
    focus: "defined engineering responsibility for Arkansas reviews",
    projectTypes: "Structural and civil packages, MEP systems, commercial additions, ADUs where engineering is required, industrial work, and public-facing site improvements.",
    code: "The responsible Arkansas PE defines the discipline and scope accepted under applicable practice rules and the AHJ checklist. Documents should identify local code assumptions, site evidence, existing-building limits, special inspections, and delegated or specialty work.",
    sections: [
      ["A seal follows project evidence", "Survey, geotechnical information, existing conditions, utility correspondence, equipment data, and the owner’s program let the PE make a professional judgment. Missing records should be identified, not hidden by a seal."],
      ["Separate city, county, and agency handoffs", "A Little Rock, Fayetteville, Fort Smith, Jonesboro, or Bentonville package can touch planning, fire, utilities, floodplain, stormwater, and ADEQ. The index should show which sheets answer each handoff."],
      ["Corrections continue into construction", "Plan-check comments, RFIs, substitutions, demolition discoveries, and delegated design can change the accepted work. Controlled revisions and field records keep contractors from relying on superseded documents."],
    ],
    steps: [
      "Identify the parcel’s Arkansas AHJ, planning, fire, utility, flood, stormwater, and environmental handoffs and obtain the applicable checklists.",
      "Assemble survey, geotechnical, existing-condition, architecture, equipment, utility, and owner records before the responsible PE defines the accepted discipline scope.",
      "Submit authenticated sheets through the named city or county process, separating utility-owner, specialty, contractor, and delegated-design documents from the PE’s scope.",
      "Track plan-check comments, inspections, RFIs, substitutions, and field changes; the responsible PE evaluates changes and issues revisions when scope or design changes.",
    ],
    faqs: [
      ["Does an Arkansas PE seal approve an entire project?", "No. It communicates responsibility for a defined engineering scope. City or county building officials and fire, utility, floodplain, stormwater, and environmental authorities retain their own decisions."],
      ["Can a residential addition be sealed without a site visit?", "The responsible PE decides whether records are adequate. Existing framing, foundation, soil, utility, flood, and connection conditions may require measurements, openings, survey, or other supporting information."],
      ["What happens when the AHJ returns stamped drawings with corrections?", "The responsible PE evaluates every affected sheet and calculation, coordinates changes, returns a numbered response through the AHJ, and controls the revision so field work follows the accepted documents."],
    ],
  },
];

function sourcesFor(metro: ArkansasMetro) {
  return [
    { label: metro.authority, url: metro.authorityUrl },
    { label: metro.planning, url: metro.planningUrl },
    { label: arkansasCode.label, url: arkansasCode.url },
    { label: arkansasStormwater.label, url: arkansasStormwater.url },
    { label: arkansasFlood.label, url: arkansasFlood.url },
    { label: metro.utility, url: metro.utilityUrl },
  ];
}
function makeServices(metro: ArkansasMetro): Batch2CoreServicePage[] {
  return profiles.map((profile) => ({
    serviceSlug: profile.serviceSlug,
    title: `${metro.name} ${profile.name} for Arkansas Permits`,
    description: `${profile.name} for ${metro.name} and ${metro.county}, coordinated with ${metro.authority}, ${metro.utility}, and the local site conditions.`,
    h1: `${profile.name} for ${metro.name} Projects`,
    kicker: `${metro.name} ${profile.focus}`,
    lede: `${metro.name} work must respond to ${metro.conditions.toLowerCase()} This ${profile.name.toLowerCase()} scope uses address-specific agency information and a documented plan-check path instead of a copied city page.`,
    permitAuthority: `${metro.authority} is the primary city permit contact. ${metro.localReview} The responsible Arkansas PE confirms professional scope and the documents accepted for the project.`,
    codeContext: profile.code,
    localConditions: metro.conditions,
    projectTypes: profile.projectTypes,
    sections: profile.sections.map(([heading, body], index) => ({
      heading: `${metro.name}: ${heading}`,
      body: `${body} ${index === 0 ? metro.localReview : index === 1 ? `The relevant utility is ${metro.utility}; the environmental reference is ${arkansasStormwater.label}.` : `Plan-check responses should be filed with ${metro.authority}, with related agency comments tracked separately.`}`,
    })),
    permitSteps: profile.steps.map((step) => `${step} For this ${metro.name} parcel, the handoff is coordinated with ${metro.authority}.`),
    faqs: profile.faqs.map(([question, answer]) => ({
      question: `${metro.name}: ${question}`,
      answer: `${answer} ${metro.localReview}`,
    })),
    sources: sourcesFor(metro),
  }));
}

const arkansasBatch3: Batch2StateExpansion = {
  stateSlug: "arkansas",
  stateName: "Arkansas",
  stateAbbrev: "AR",
  hub: {
    title: "Arkansas Engineering Services for Local Permit Review",
    description: "Locally informed structural, MEP, civil, energy-compliance, and PE-stamped drawing support for Arkansas building and site projects.",
    h1: "Engineering for Arkansas River Valleys and Ozark Growth",
    kicker: "Arkansas permit and design coordination",
    lede: "Arkansas projects move through city or county building, planning, flood, utility, fire, and stormwater processes, with state code and environmental resources providing context. Engineering assumptions should follow the parcel’s AHJ and physical setting, from Ozark karst to Arkansas River and Delta-edge flood conditions.",
    sections: [
      { heading: "One state reference does not mean one permit counter", body: "Arkansas code and fire-prevention resources provide an important baseline, but local building officials and planning offices administer permits and may add zoning, subdivision, floodplain, right-of-way, utility, and fire review. The city or county must be identified before selecting forms." },
      { heading: "Karst, clay, flood, and severe weather", body: "Northwest Arkansas limestone, chert, and steep slopes differ from Fort Smith’s river valley, Jonesboro’s low drainage, and Little Rock’s river and foothill conditions. Humidity, freeze-thaw, ice, tornado winds, and intense rainfall affect envelope, site, foundation, and utility decisions." },
      { heading: "Additions and corrections need a record", body: "ADUs, residential additions, infill, and occupied commercial work benefit from measured existing conditions, utility evidence, a clear code path, and a correction log. Each reviewer comment should be answered by the responsible professional and coordinated across disciplines." },
      { heading: "Highway access is a separate approval", body: "A site plan along an Arkansas state route may need an Arkansas Department of Transportation driveway, drainage, or right-of-way review in addition to the city or county permit. The access location, sight distance, culvert, sidewalk, utility crossing, and construction traffic plan should be checked against the highway boundary before grading and building documents are finalized. Local fire access and the state-road decision should remain coordinated but separately documented." },
    ],
    faqs: [
      { question: "Who issues an Arkansas building permit?", answer: "The responsible city or county AHJ handles its own permit process; Arkansas state code and fire resources do not replace that local intake. Planning, flood, utilities, fire, and stormwater agencies can have separate roles." },
      { question: "What physical conditions should an Arkansas design team check?", answer: "Karst and sinkholes, chert, clay and alluvial soils, steep grades, river and creek flooding, intense rainfall, tornado winds, ice, and freeze-thaw may affect the project. The appropriate survey, geotechnical, and flood evidence depends on the site." },
      { question: "How should local correction workflows be documented?", answer: "Keep the AHJ’s comments, a numbered response, revised sheets and calculations, inter-discipline checks, and field follow-up in one controlled record. This is especially important when an ADU or addition reveals different existing construction." },
    ],
    sources: [
      { label: "Arkansas Fire Prevention Code and state code resources", url: "https://www.healthy.arkansas.gov/programs-services/topics/arkansas-fire-prevention-code" },
      { label: "Arkansas Department of Energy and Environment stormwater", url: "https://www.adeq.state.ar.us/water/permits/stormwater/" },
      { label: "Arkansas Geological Survey", url: "https://www.geology.arkansas.gov/" },
      { label: "FEMA flood maps", url: "https://msc.fema.gov/portal/home" },
    ],
  },
  metros: arkansasMetros.map((metro) => ({
    slug: metro.slug,
    name: metro.name,
    county: metro.county,
    services: makeServices(metro),
  })),
};

export { arkansasBatch3 };
export default arkansasBatch3;