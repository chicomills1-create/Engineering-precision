import type { Batch2CoreServicePage, Batch2StateExpansion } from "./batch2-core-service-types";

const stateSources = [
  { label: "Oklahoma Uniform Building Code Commission", url: "https://oklahoma.gov/oubcc.html" },
  { label: "Oklahoma DEQ wastewater and stormwater", url: "https://oklahoma.gov/deq/divisions/water-quality/wastewater-stormwater.html" },
  { label: "Oklahoma Water Resources Board floodplain management", url: "https://oklahoma.gov/owrb/floodplain-management.html" },
  { label: "FEMA flood maps", url: "https://www.fema.gov/flood-maps" },
  { label: "Oklahoma State Board of Licensure for Professional Engineers and Land Surveyors", url: "https://oklahoma.gov/service/linkout/pels/professional-engineer.html" },
];

const okcSources = [
  { label: "Oklahoma City Development Services", url: "https://www.okc.gov/Government/Departments/Development-Services" },
  { label: "Oklahoma City Planning Department", url: "https://www.okc.gov/Government/Departments/Planning" },
  { label: "Oklahoma City Public Works", url: "https://www.okc.gov/Government/Departments/Public-Works" },
  { label: "Oklahoma City Utilities", url: "https://www.okc.gov/Government/Departments/Utilities" },
  { label: "Oklahoma Gas and Electric builders", url: "https://www.oge.com/wps/portal/oge/business/builders" },
];
const tulsaSources = [
  { label: "Tulsa permits and inspections", url: "https://www.cityoftulsa.org/government/departments/development-services/permits-and-inspections/" },
  { label: "Tulsa planning and development", url: "https://www.cityoftulsa.org/government/departments/development-services/planning/" },
  { label: "Tulsa engineering services", url: "https://www.cityoftulsa.org/government/departments/public-works/engineering-services/" },
  { label: "Tulsa stormwater", url: "https://www.cityoftulsa.org/government/departments/public-works/stormwater/" },
  { label: "City of Tulsa water and sewer", url: "https://www.cityoftulsa.org/government/departments/water-and-sewer/" },
  { label: "Public Service Company of Oklahoma", url: "https://www.psoklahoma.com/" },
];
const normanSources = [
  { label: "Norman Development Services", url: "https://www.normanok.gov/development-services" },
  { label: "Norman planning and community development", url: "https://www.normanok.gov/your-government/departments/planning-and-community-development" },
  { label: "Norman Public Works", url: "https://www.normanok.gov/your-government/departments/public-works" },
  { label: "Norman Public Works stormwater interface", url: "https://www.normanok.gov/your-government/departments/public-works" },
  { label: "Norman Utilities", url: "https://www.normanok.gov/your-government/departments/utilities" },
  { label: "Oklahoma Electric Cooperative", url: "https://www.okcoop.org/" },
];
const edmondSources = [
  { label: "Edmond permit submissions and inspections", url: "https://www.edmondok.gov/191/Permit-Submissions" },
  { label: "Edmond planning", url: "https://www.edmondok.gov/194/Planning" },
  { label: "Edmond engineering", url: "https://www.edmondok.gov/274/Engineering" },
  { label: "Edmond electric utility", url: "https://www.edmondok.gov/224/Edmond-Electric" },
  { label: "Edmond utility services", url: "https://www.edmondok.gov/254/Utility-Services" },
];
const lawtonSources = [
  { label: "Lawton Development Services and permits", url: "https://www.lawtonok.gov/273/License-Permits" },
  { label: "Lawton planning", url: "https://www.lawtonok.gov/246/Planning" },
  { label: "Lawton Public Works", url: "https://www.lawtonok.gov/243/Public-Works" },
  { label: "Lawton utility services", url: "https://www.lawtonok.gov/516/Utility-Services" },
  { label: "Public Service Company of Oklahoma", url: "https://www.psoklahoma.com/" },
];

const okcStructural: Batch2CoreServicePage = {
  serviceSlug: "structural-engineering",
  title: "Oklahoma City structural engineering for additions and infill",
  description: "Structural design for Oklahoma City remodels, additions, shelters, and commercial alterations, coordinated with local review.",
  h1: "Structural Engineering in Oklahoma City, Oklahoma",
  kicker: "Verified load paths for Oklahoma City buildings",
  lede: "Oklahoma City structural work begins with the existing frame, the proposed change, and the site evidence that connects them. Wind, clay, flood exposure, and construction sequencing are addressed in the design record.",
  permitAuthority: "The City of Oklahoma City Development Services Department handles building permit review inside the city. Planning, Public Works, fire, floodplain, utility, and county reviews can have separate authority.",
  codeContext: "Confirm the current OUBCC-adopted building and residential provisions, city amendments, occupancy, wind criteria, and special-inspection requirements with Oklahoma City before finalizing calculations.",
  localConditions: "North Canadian River and tributary flood areas, flat grades, variable expansive clay, intense summer storms, tornado wind, hail, and freeze events can change foundation and connection decisions.",
  projectTypes: "House additions, ADUs, storm-shelter interfaces, downtown tenant improvements, warehouse alterations, rooftop equipment, and opening infill.",
  sections: [
    { heading: "Existing Oklahoma City framing is design evidence", body: "A new opening or addition should be based on measured framing, foundation exposure, permit history, and observed connections. Older masonry, tract construction, and undocumented remodels are not interchangeable assumptions. The calculations should identify what was observed, what remains uncertain, and which construction hold point resolves it." },
    { heading: "River, clay, and wind conditions meet at the foundation", body: "A parcel near the North Canadian River or a tributary may need flood-elevation coordination in addition to ordinary footing design. Expansive soil, wind uplift, roof equipment, and tornado-resistant continuity should be carried through the architectural and MEP penetrations, not left as generic notes." },
    { heading: "Plan-check corrections need traceable engineering", body: "For an Oklahoma City comment, identify the cited provision, revised calculation, changed detail, and affected sheet. If an ADU changes egress, fire separation, or an existing bearing wall, show those consequences in the same response instead of answering only the new room." },
  ],
  permitSteps: [
    "Confirm the Oklahoma City address, occupancy, adopted code path, flood screening, wind criteria, and required structural submittal documents.",
    "Obtain survey and soil information, expose existing framing where needed, and record roof, equipment, addition, and shelter loads.",
    "Coordinate foundations, collectors, anchors, openings, fire-rated penetrations, shoring, and inspection notes with the complete permit set.",
    "Return each correction in a dated matrix, cloud revised sheets, update calculations, and preserve the accepted field and inspection record.",
  ],
  faqs: [
    { question: "Does an Oklahoma City addition always need new footing calculations?", answer: "Not always. Existing capacity, new reactions, soil evidence, setbacks, and the city checklist determine whether the footing is verified, modified, or newly designed." },
    { question: "Can Oklahoma City wind design be copied from a nearby house?", answer: "No. Exposure, roof geometry, openings, site grade, and the adopted criteria must be evaluated for the actual parcel and proposed work." },
    { question: "Who accepts a structural correction response?", answer: "Oklahoma City’s reviewer decides permit acceptance. The engineer documents a defined technical scope and does not promise approval or construction performance." },
  ],
  sources: [...okcSources, ...stateSources],
};

const okcMep: Batch2CoreServicePage = {
  serviceSlug: "mep-engineering",
  title: "Oklahoma City MEP engineering for heat, service, and occupancy",
  description: "Oklahoma City HVAC, plumbing, electrical, and ventilation design tied to occupancy, utility data, and permit corrections.",
  h1: "MEP Engineering for Oklahoma City Projects",
  kicker: "HVAC, plumbing, and electrical coordination",
  lede: "Oklahoma City MEP documents must fit the use of the building, summer peak conditions, existing service, and the local review path. Utility correspondence informs capacity; it does not replace engineering calculations.",
  permitAuthority: "Development Services is the Oklahoma City building-review authority, while fire, utilities, Public Works, health, and floodplain reviewers may control related parts of the project.",
  codeContext: "Establish the current OUBCC mechanical, plumbing, electrical, energy, fire, and accessibility provisions and Oklahoma City amendments before sizing equipment or issuing schedules.",
  localConditions: "Hot humid summers, winter freezes, severe thunderstorms, tornado sheltering, dust, flood-prone equipment locations, and changing utility service loads are relevant design inputs.",
  projectTypes: "Restaurants, tenant improvements, schools, multifamily work, commercial kitchens, ADUs, residential additions, and equipment replacement.",
  sections: [
    { heading: "Start MEP design with the Oklahoma City occupancy", body: "A restaurant exhaust system, a classroom ventilation system, and a dwelling addition do not share the same assumptions. Document occupant load, outside air, exhaust makeup, equipment access, condensate, and controls against the actual architectural plan and the fire strategy." },
    { heading: "Utility and storm interfaces belong in the set", body: "Oklahoma Gas and Electric service information, water and sewer points, fire-flow requirements, and Public Works constraints should support panel schedules, risers, and equipment selection. Place electrical or mechanical equipment above identified flood concerns where the site review requires it." },
    { heading: "A coordinated correction is more than a narrative", body: "When Oklahoma City asks for a larger panel, a revised exhaust rate, or a protected penetration, update the load calculation, riser, schedule, energy documentation, and architectural detail together. ADU and addition work should show its effect on the existing service." },
  ],
  permitSteps: [
    "Confirm occupancy, current adopted mechanical, plumbing, electrical, energy, and fire provisions, and the Oklahoma City review checklist.",
    "Field-check existing panels and equipment and request written electric, water, sewer, and fire-flow information from the applicable providers.",
    "Coordinate loads, risers, shafts, clearances, controls, condensate, ventilation, shutdowns, and accessible maintenance routes.",
    "Log each reviewer comment and resubmit revised schedules, calculations, risers, details, and utility correspondence as one controlled package.",
  ],
  faqs: [
    { question: "Does an Oklahoma City ADU need an electrical capacity check?", answer: "Potentially. The added HVAC, water heating, cooking, and general loads should be compared with the existing service and the AHJ’s required documents." },
    { question: "Can OG&E availability establish a building service size?", answer: "No. Provider information describes the available connection; the design still needs project load calculations, distribution, protection, and equipment coordination." },
    { question: "How should an MEP correction be returned?", answer: "Name the comment, cite the applicable requirement, identify revised sheets and calculations, and flag any unresolved utility, field, or fire dependency." },
  ],
  sources: [...okcSources, ...stateSources],
};

const okcCivil: Batch2CoreServicePage = {
  serviceSlug: "civil-engineering",
  title: "Oklahoma City civil engineering for drainage and site permits",
  description: "Site civil plans for Oklahoma City grading, stormwater, utilities, access, flood screening, and right-of-way coordination.",
  h1: "Civil Engineering for Oklahoma City Sites",
  kicker: "Grading, drainage, and utility evidence",
  lede: "An Oklahoma City civil package explains how the building pad, accessible route, fire access, utilities, and runoff reach approved public or private systems. Building approval alone does not authorize every site improvement.",
  permitAuthority: "Oklahoma City Development Services reviews development submissions with Public Works engineering and other agencies. Planning, right-of-way, floodplain, utility, and county responsibilities depend on the address and scope.",
  codeContext: "Use the current city development standards, stormwater requirements, OUBCC provisions, and DEQ construction-stormwater triggers; confirm thresholds and checklists with the local reviewers.",
  localConditions: "Flat prairie grades, expansive soil, short intense storms, North Canadian River drainage, localized ponding, impervious infill, and erodible outfalls affect site design.",
  projectTypes: "Infill lots, commercial parking, industrial redevelopment, ADUs, additions, driveway changes, detention work, and utility extensions.",
  sections: [
    { heading: "A survey-based Oklahoma City site plan", body: "Show parcel limits, easements, contours, existing inlets, utilities, fire access, accessible paths, finished floors, and the receiving drainage system. A useful plan distinguishes surveyed facts from assumed utility locations and records who owns each connection." },
    { heading: "Stormwater and flood review are separate decisions", body: "Oklahoma City stormwater review, FEMA mapping, OWRB information, and DEQ construction coverage address different questions. A small addition can redirect roof runoff, while a larger infill site may need detention, erosion controls, an outfall agreement, or finished-floor evidence." },
    { heading: "Civil corrections protect the field result", body: "Respond to comments with revised contours, pipe profiles, calculations, inlet details, erosion notes, and maintenance responsibilities. If an ADU removes parking or changes a water or sewer route, show that change rather than treating the accessory building as a standalone object." },
  ],
  permitSteps: [
    "Verify the Oklahoma City jurisdiction, zoning and frontage rules, flood status, stormwater threshold, right-of-way needs, and utility review path.",
    "Collect survey control, utility locates, finished-floor data, soil or infiltration evidence, outfall ownership, and downstream constraints.",
    "Coordinate grading, detention or infiltration, accessible routes, fire access, utility profiles, erosion controls, and the building elevations.",
    "Answer every city or agency comment with revised plans, calculations, details, and a clearly assigned long-term maintenance responsibility.",
  ],
  faqs: [
    { question: "Can an Oklahoma City addition drain to the street without analysis?", answer: "Not automatically. Frontage grades, city stormwater requirements, downstream capacity, easements, and the changed impervious area control the acceptable discharge." },
    { question: "Does a city building permit approve a private outfall?", answer: "No. Stormwater, right-of-way, utility, floodplain, and drainage authorities can require separate approvals or agreements." },
    { question: "What should an Oklahoma City ADU site review include?", answer: "Check setbacks, access, parking, water and sewer, roof runoff, finished floor, fire route, easements, impervious area, and any flood or utility trigger." },
  ],
  sources: [...okcSources, ...stateSources],
};

const okcEnergy: Batch2CoreServicePage = {
  serviceSlug: "energy-compliance",
  title: "Oklahoma City energy compliance for additions and tenant work",
  description: "Energy-code documentation for Oklahoma City envelopes, HVAC, lighting, water heating, and alteration permits.",
  h1: "Energy Compliance for Oklahoma City, Oklahoma",
  kicker: "Climate-responsive envelope and systems documentation",
  lede: "Oklahoma City energy compliance is a coordinated record of the adopted path, alteration scope, envelope assemblies, equipment, lighting, and controls. The report should agree with what the permit drawings can actually build.",
  permitAuthority: "Oklahoma City Development Services identifies the local submittal path; the current OUBCC adoption and city forms determine which energy documentation is appropriate for the project.",
  codeContext: "Confirm the effective Oklahoma energy provisions, climate inputs, residential or commercial method, alteration category, and local checklist before modeling or completing compliance forms.",
  localConditions: "High cooling demand, humid summer air, solar exposure, hail and wind, winter ice, air-sealing needs, and flood-sensitive equipment locations affect the modeled assemblies and systems.",
  projectTypes: "Residential additions, detached ADUs, tenant improvements, shell buildings, roof replacements, HVAC changes, and lighting renovations.",
  sections: [
    { heading: "The modeled Oklahoma City envelope must be buildable", body: "Roof and wall insulation, fenestration, air barrier continuity, shading, slab edges, and penetrations should match the architectural details. A generic assembly can produce a compliant-looking report while leaving the contractor without a workable transition at an addition." },
    { heading: "Cooling and controls connect energy to MEP", body: "Equipment efficiency, sizing, outdoor air, thermostats, lighting controls, service water, and condensate assumptions need one coordinated source. Oklahoma City heat and humidity make an unverified equipment substitution particularly likely to change the compliance result." },
    { heading: "Plan-check changes require a new input trail", body: "If a reviewer changes glazing, insulation, lighting power, or HVAC equipment, identify the affected input, revise the form or model, and update the linked sheet. An ADU is not automatically exempt; classify its connection and alteration scope." },
  ],
  permitSteps: [
    "Confirm the current OUBCC energy provisions, Oklahoma City forms, climate data, occupancy, and alteration route with Development Services.",
    "Collect final envelope assemblies, windows, shading, HVAC, lighting, water-heating, controls, and service inputs from the coordinated design.",
    "Check modeled values against architectural details, equipment schedules, structural penetrations, and installation notes before submission.",
    "Return energy comments with the cited requirement, revised input or form, and references to every affected architectural and MEP sheet.",
  ],
  faqs: [
    { question: "Is an Oklahoma City residential addition automatically exempt from energy documentation?", answer: "No. The size, alteration category, connected systems, and current local direction determine the required path." },
    { question: "Does energy compliance guarantee lower Oklahoma City utility bills?", answer: "No. Weather, construction quality, equipment operation, controls, occupants, and maintenance affect actual use." },
    { question: "What if the specified HVAC unit changes after review?", answer: "Recheck the applicable inputs and schedules, coordinate the substitution with MEP and architectural documents, and issue the required permit revision." },
  ],
  sources: [...okcSources, ...stateSources],
};

const okcPe: Batch2CoreServicePage = {
  serviceSlug: "pe-stamped-drawings",
  title: "Oklahoma City PE-stamped drawings for defined permit scopes",
  description: "Oklahoma City sealed engineering documents with verified site facts, clear discipline limits, and correction tracking.",
  h1: "PE-Stamped Drawings in Oklahoma City, Oklahoma",
  kicker: "Responsible-charge documentation for local review",
  lede: "A PE-stamped Oklahoma City package should identify the parcel evidence, design criteria, discipline scope, assumptions, and exclusions. A seal is not a substitute for city approval, survey, geotechnical work, or utility authorization.",
  permitAuthority: "Oklahoma City Development Services retains building approval authority. Planning, Public Works, fire, floodplain, utilities, and county or state agencies can retain separate decisions outside the defined professional scope.",
  codeContext: "The responsible professional confirms the current OUBCC adoption, Oklahoma City amendments, occupancy, design criteria, inspection requirements, and applicable Oklahoma professional practice rules. For sealing and authentication, check the current guidance of the Oklahoma State Board of Licensure for Professional Engineers and Land Surveyors; a seal remains limited to the responsible professional’s scope.",
  localConditions: "Tornado and wind exposure, expansive clay, river and creek flood concerns, heat, freeze events, aging infrastructure, and active urban construction can limit reliance on unverified assumptions.",
  projectTypes: "Structural alterations, MEP packages, civil site work, industrial changes, ADUs, additions, tenant improvements, and permit resubmissions.",
  sections: [
    { heading: "A seal follows evidence and scope", body: "The drawing index should identify the Oklahoma City address, observed conditions, survey and soil inputs, code criteria, calculations, discipline boundary, and exclusions. Existing framing or utility capacity that was not verified should be labeled as an assumption or limitation." },
    { heading: "City review has multiple handoffs", body: "Development Services, Planning, Public Works, fire, floodplain, OG&E, and specialty reviewers may each request different information. The sealed scope can support a response, but it does not authorize a right-of-way cut, floodplain fill, service connection, or construction outside that scope." },
    { heading: "Corrections and RFIs remain controlled", body: "Use a dated matrix for reviewer comments, substitutions, RFIs, and field discoveries. The responsible PE evaluates changed load paths, equipment, grades, and details, then issues a revised sealed sheet only where the professional scope actually changes." },
  ],
  permitSteps: [
    "Identify the Oklahoma City checklist, occupancy, current code path, discipline boundary, required authentication, and separate agency reviews.",
    "Assemble survey, field observations, soil and flood information, utility records, calculations, architectural coordination, and consultant exclusions.",
    "Have the responsible Oklahoma professional review the complete coordinated drawings, schedules, notes, details, and calculations before submission.",
    "Map each correction or construction change to the affected calculation and sheet, then issue controlled revisions through the local process.",
  ],
  faqs: [
    { question: "Does an Oklahoma City PE seal guarantee permit approval?", answer: "No. It communicates responsibility for a defined engineering scope; the city and other authorities retain their review decisions." },
    { question: "Can sealed drawings confirm hidden existing conditions?", answer: "Only to the extent supported by observation and evidence. The responsible professional must disclose limitations instead of presenting an unverified condition as fact." },
    { question: "Are contractor substitutions automatically covered by the seal?", answer: "No. A substitution affecting the sealed work needs evaluation by the responsible professional and a documented revision or acceptance within the defined scope." },
  ],
  sources: [...okcSources, ...stateSources],
};

const tulsaStructural: Batch2CoreServicePage = {
  serviceSlug: "structural-engineering",
  title: "Tulsa structural engineering for river, hill, and infill projects",
  description: "Tulsa structural design for additions, historic alterations, commercial interiors, and new work with local site evidence.",
  h1: "Structural Engineering in Tulsa, Oklahoma",
  kicker: "Load paths for Tulsa’s varied terrain",
  lede: "Tulsa structural design changes between Arkansas River lowlands, older neighborhoods, and the Osage or Cherokee hill country. Field observations, soil information, wind, and flood coordination set the scope.",
  permitAuthority: "The City of Tulsa Development Services Department reviews city building permits. Planning, Public Works, floodplain, fire, utility, historic, and county authorities may have separate reviews.",
  codeContext: "Confirm the current OUBCC code adoption, Tulsa amendments and checklists, occupancy, wind and foundation criteria, and any historic or floodplain requirements before sealing a design.",
  localConditions: "Arkansas River and creek floodplains, rolling hills, expansive clay, flash flooding, tornado wind, intense rain, and aging masonry or wood framing affect Tulsa structures.",
  projectTypes: "Historic commercial rehabilitation, hillside additions, ADUs, river-area tenant work, industrial conversions, retaining interfaces, and neighborhood infill.",
  sections: [
    { heading: "Tulsa existing buildings need selective investigation", body: "A downtown masonry wall, a mid-century residence, and a hillside addition have different load paths and records. Document probes, cracks, prior openings, roof reactions, and foundation evidence before relying on an existing element for new work." },
    { heading: "Flood and slope information changes structural details", body: "The Arkansas River and local creek maps can influence finished-floor and material decisions, while rolling grades and clay can affect retaining, stepped footings, and drainage. Structural details should align with Tulsa Public Works and the site civil elevations." },
    { heading: "Historic and residential corrections must stay coordinated", body: "A Tulsa correction response should name the reviewer, provision, revised calculation, and drawing. For an ADU or addition, show impacts to egress, fire separation, existing foundations, roof drainage, and service penetrations rather than issuing a generic standard detail." },
  ],
  permitSteps: [
    "Confirm the Tulsa address, zoning or historic overlay, occupancy, current code, flood status, wind criteria, and permit checklist.",
    "Gather survey, geotechnical evidence, framing observations, retaining geometry, roof and equipment loads, and existing permit information.",
    "Coordinate foundations, connections, openings, shoring, fire-rated penetrations, flood-resistant materials, and inspection requirements.",
    "Return Tulsa comments in a dated matrix with clouded details, updated calculations, and unresolved field or agency dependencies identified.",
  ],
  faqs: [
    { question: "Does a Tulsa hillside addition use the same footing detail as a flat lot?", answer: "Not by default. Grade changes, retaining, soil, drainage, loads, and the local review record determine the appropriate foundation design." },
    { question: "Does Tulsa flood mapping affect structural work outside a mapped floodplain?", answer: "The map is an important screening source, but site drainage, creek proximity, finished-floor conditions, and local direction can still affect the design." },
    { question: "Who decides whether Tulsa structural corrections are accepted?", answer: "The applicable Tulsa reviewer decides acceptance; the engineer provides a traceable technical response without promising a permit outcome." },
  ],
  sources: [...tulsaSources, ...stateSources],
};

const tulsaMep: Batch2CoreServicePage = {
  serviceSlug: "mep-engineering",
  title: "Tulsa MEP engineering for occupancy and utility coordination",
  description: "Tulsa HVAC, plumbing, electrical, and ventilation design coordinated with local utilities and building review.",
  h1: "MEP Engineering for Tulsa, Oklahoma",
  kicker: "Systems design for heat, hills, and changing uses",
  lede: "Tulsa MEP documents need to reflect the occupancy, existing service, hot summers, winter freezes, and the actual utility territory. A correction to one system can affect fire, energy, structure, and civil work.",
  permitAuthority: "Tulsa Development Services is the local building path. Tulsa Public Works, TMUA, PSO, fire, health, floodplain, and zoning reviewers may impose separate requirements.",
  codeContext: "Establish the effective OUBCC mechanical, plumbing, electrical, energy, fire, and accessibility provisions and Tulsa forms before preparing final schedules and calculations.",
  localConditions: "High summer cooling demand, winter ice, severe storms, creek and river flooding, hilly sites, dust, and older utility infrastructure inform MEP selection and routing.",
  projectTypes: "Restaurants, medical or office interiors, multifamily alterations, ADUs, residential additions, industrial spaces, and rooftop equipment replacement.",
  sections: [
    { heading: "Occupancy determines Tulsa system design", body: "Kitchen exhaust, healthcare ventilation, apartment domestic water, and a single-family addition require different load and life-safety records. Tie equipment access, makeup air, controls, condensate, combustion, and shutdowns to the actual use and architectural plan." },
    { heading: "TMUA and PSO information must be current", body: "Water and sewer points from the Tulsa Metropolitan Utility Authority and electric-service information from PSO can inform risers and capacity checks. Public Works and floodplain data can also affect equipment placement, utility crossings, and finished-floor decisions." },
    { heading: "Plan-check changes travel across disciplines", body: "A revised Tulsa exhaust rate or panel size can change shafts, roof structure, energy inputs, fire separation, and service clearances. Record the comment and update every affected drawing. An ADU should show water, sewer, electrical, HVAC, and separation consequences." },
  ],
  permitSteps: [
    "Confirm Tulsa occupancy, current code provisions, energy forms, fire thresholds, zoning constraints, and the Development Services checklist.",
    "Field-verify panels and equipment and obtain TMUA, PSO, fire-flow, water-pressure, sewer, and other provider information needed for the scope.",
    "Coordinate risers, equipment, shafts, filtration, condensate, controls, clearances, access, flood exposure, and shutdown sequencing.",
    "Resubmit a numbered response with revised loads, schedules, risers, details, calculations, and utility correspondence.",
  ],
  faqs: [
    { question: "Can a Tulsa ADU share the existing house utilities?", answer: "Possibly, but electrical, water, sewer, HVAC, fire separation, and service capacity must be checked against the AHJ and utility requirements." },
    { question: "Does a PSO service letter replace an electrical load calculation?", answer: "No. The letter informs available service; the engineer still documents demand, distribution, protection, equipment, and coordination." },
    { question: "What makes a Tulsa MEP correction complete?", answer: "It identifies the reviewer comment, requirement, revised calculation or schedule, affected sheet, and any remaining utility, fire, or field dependency." },
  ],
  sources: [...tulsaSources, ...stateSources],
};

const tulsaCivil: Batch2CoreServicePage = {
  serviceSlug: "civil-engineering",
  title: "Tulsa civil engineering for drainage, access, and utilities",
  description: "Tulsa civil plans connecting grading, stormwater, floodplain, frontage, access, and utilities to local development review.",
  h1: "Civil Engineering for Tulsa Sites",
  kicker: "River, creek, and hillside site coordination",
  lede: "A Tulsa civil plan must show how a project fits its street, drainage basin, utilities, and receiving system. The Arkansas River, local creeks, rolling grades, and infill constraints make parcel-specific survey evidence important.",
  permitAuthority: "Tulsa Development Services and Public Works share local development interfaces, with planning, floodplain, TMUA, fire, right-of-way, county, and state environmental responsibilities depending on the project.",
  codeContext: "Confirm Tulsa development and stormwater standards, OUBCC site-related provisions, DEQ construction coverage triggers, floodplain requirements, and the applicable review thresholds.",
  localConditions: "Flash storms, Arkansas River and creek floodplains, rolling grades, expansive clay, erosion, older storm systems, and increasing impervious area affect Tulsa civil work.",
  projectTypes: "Neighborhood infill, commercial parking, hillside lots, ADUs, additions, industrial redevelopment, detention, and utility extensions.",
  sections: [
    { heading: "Tulsa civil work starts at the property edge", body: "The survey-based plan should identify contours, alleys, sidewalks, easements, inlets, utilities, fire access, accessible routes, finished floors, and the ownership of each connection. A nearby drainage feature is not proof of capacity or legal discharge." },
    { heading: "Creek and river review is not just a building question", body: "FEMA and OWRB information supports flood screening, while Tulsa Public Works addresses local drainage and frontage. A project may need finished-floor evidence, detention, erosion protection, utility elevation coordination, or a separate right-of-way authorization." },
    { heading: "ADU and infill changes remain visible", body: "A small Tulsa ADU can alter parking, driveway slope, roof runoff, sewer demand, and fire access. Respond to comments with revised contours, profiles, calculations, easement notes, and maintenance responsibilities instead of omitting site effects." },
  ],
  permitSteps: [
    "Confirm Tulsa zoning, frontage, floodplain, stormwater, right-of-way, fire-access, and utility thresholds for the exact parcel.",
    "Verify survey datum, existing drainage, easements, utility locations, outfall ownership, finished floors, soil assumptions, and downstream constraints.",
    "Coordinate grading, detention or infiltration, access, accessible routes, fire lanes, utility profiles, erosion controls, and building elevations.",
    "Return each agency comment with revised plans, calculations, details, and an identified owner for long-term drainage maintenance.",
  ],
  faqs: [
    { question: "Can a Tulsa roof drain discharge toward an alley?", answer: "Only after checking local grading, public-way, drainage, easement, and downstream requirements for the parcel." },
    { question: "Does a Tulsa building permit approve a detention facility?", answer: "No. Stormwater, floodplain, public-works, environmental, and maintenance approvals can be separate from building review." },
    { question: "When does a Tulsa ADU need civil coordination?", answer: "When it changes impervious area, drainage, access, parking, utilities, finished floor, easements, or flood exposure, even if the building is small." },
  ],
  sources: [...tulsaSources, ...stateSources],
};

const tulsaEnergy: Batch2CoreServicePage = {
  serviceSlug: "energy-compliance",
  title: "Tulsa energy compliance for humid summers and renovations",
  description: "Tulsa energy documentation for envelope, HVAC, lighting, controls, and alteration review.",
  h1: "Energy Compliance for Tulsa, Oklahoma",
  kicker: "Envelope and equipment documentation for local review",
  lede: "Tulsa energy compliance ties the selected Oklahoma method to the actual renovation, envelope, HVAC, lighting, and service-water design. The report should remain consistent with city permit sheets and construction details.",
  permitAuthority: "Tulsa Development Services determines the local submittal route; OUBCC adoption and Tulsa forms establish the code and documentation context for the project.",
  codeContext: "Confirm the current Oklahoma energy-code edition, commercial or residential method, climate data, alteration treatment, and Tulsa checklist before modeling assemblies or systems.",
  localConditions: "Humid cooling seasons, solar gain, wind-driven rain, hail, tornado exposure, winter freezes, and older building envelopes can affect energy inputs and detailing.",
  projectTypes: "Historic renovations, tenant improvements, residential additions, ADUs, shell work, roof assemblies, lighting upgrades, and HVAC replacement.",
  sections: [
    { heading: "Tulsa envelope documentation follows the alteration", body: "Existing masonry, wood framing, roof recoveries, new windows, and additions each create different continuity details. Show insulation, air barrier, vapor or moisture control, fenestration, shading, and penetrations in a way that matches the modeled assemblies." },
    { heading: "Humidity makes HVAC coordination material", body: "Cooling capacity, latent performance, ventilation, filtration, controls, condensate, and equipment efficiency should agree between the energy record and MEP schedules. A new room or ADU can change zoning and connected loads without changing the whole building shell." },
    { heading: "Correction responses need reproducible inputs", body: "When Tulsa requests a revised window, wall, lighting, or equipment input, identify the changed value and update the form or model plus every affected sheet. Do not claim savings or approval from code compliance alone." },
  ],
  permitSteps: [
    "Confirm Tulsa’s current energy path, OUBCC provisions, climate inputs, alteration category, and Development Services forms.",
    "Collect verified wall, roof, window, shading, HVAC, lighting, water-heating, control, and service information from the design team.",
    "Reconcile modeled inputs with architectural details, MEP schedules, structural penetrations, and manufacturer requirements.",
    "Answer comments with citations, revised inputs or forms, and drawing references that let the reviewer and contractor follow the change.",
  ],
  faqs: [
    { question: "Is a Tulsa ADU automatically outside energy review?", answer: "No. Connected systems, conditioned area, alteration category, and the current local path determine the required documentation." },
    { question: "Does a Tulsa energy report guarantee operating savings?", answer: "No. Weather, workmanship, equipment, controls, occupants, and maintenance determine actual consumption." },
    { question: "What should happen when Tulsa changes an HVAC selection?", answer: "Recheck the applicable energy inputs, update the MEP schedule and forms, and submit a coordinated revision when the permitted scope changes." },
  ],
  sources: [...tulsaSources, ...stateSources],
};

const tulsaPe: Batch2CoreServicePage = {
  serviceSlug: "pe-stamped-drawings",
  title: "Tulsa PE-stamped drawings for accountable permit review",
  description: "Tulsa sealed engineering packages that state scope, site evidence, agency boundaries, and correction controls.",
  h1: "PE-Stamped Drawings in Tulsa, Oklahoma",
  kicker: "Clear professional scope for Tulsa submissions",
  lede: "A Tulsa sealed set should explain what the responsible professional reviewed, which site facts support the design, and where other authorities retain decisions. It should not imply a universal stamping service or guaranteed approval.",
  permitAuthority: "Tulsa Development Services retains building review authority; Planning, Public Works, fire, floodplain, TMUA, PSO, historic, and county agencies may control separate aspects.",
  codeContext: "Identify the applicable OUBCC adoption, Tulsa amendments, occupancy, flood and soil criteria, inspection requirements, discipline limits, and Oklahoma professional practice obligations. Use the Oklahoma State Board of Licensure for Professional Engineers and Land Surveyors for current licensure and sealing or authentication guidance.",
  localConditions: "River and creek flood concerns, rolling terrain, expansive clay, tornado wind, older structures, active infill, and utility constraints require evidence before responsibility is accepted.",
  projectTypes: "Structural and MEP permits, civil site packages, tenant improvements, ADUs, additions, industrial changes, and correction resubmissions.",
  sections: [
    { heading: "Define the Tulsa sealed scope", body: "List the address, drawing index, code path, design criteria, survey and geotechnical basis, field observations, calculations, exclusions, and consultant interfaces. A seal should not turn an owner-provided assumption about hidden framing or capacity into a verified fact." },
    { heading: "Multiple Tulsa authorities remain in the record", body: "Development Services, Planning, Public Works, fire, floodplain, TMUA, PSO, and historic reviewers may each ask for material information. A PE package can coordinate those inputs while leaving utility authorization, right-of-way work, and planning decisions with the proper authority." },
    { heading: "Corrections require professional control", body: "Maintain a numbered matrix for comments, substitutions, RFIs, and field conditions. The responsible PE evaluates changes to loads, grades, systems, and details, then identifies the revised calculation and sealed sheet rather than silently relying on an old issue." },
  ],
  permitSteps: [
    "Identify Tulsa’s local checklist, occupancy, code edition, discipline boundary, authentication requirements, and separate agency handoffs.",
    "Assemble reliable survey, soil, flood, utility, field, architectural, calculation, and consultant records with stated limitations.",
    "Review the coordinated drawings, schedules, notes, details, and calculations under the responsible professional’s Oklahoma scope.",
    "Route every technical correction and field substitution through that professional and issue dated controlled revisions.",
  ],
  faqs: [
    { question: "Does a Tulsa PE seal replace floodplain or utility approval?", answer: "No. It communicates responsibility for a defined scope; Tulsa, floodplain, utility, fire, planning, and other authorities retain their decisions." },
    { question: "Can a Tulsa PE seal drawings based only on a listing photo?", answer: "The professional must exercise independent judgment and identify what evidence is adequate. A photo alone may not verify concealed framing, soil, or service conditions." },
    { question: "How should Tulsa post-review changes be issued?", answer: "Map each comment or field change to the affected calculation and sheet, coordinate disciplines, and issue a dated revision within the professional’s defined scope." },
  ],
  sources: [...tulsaSources, ...stateSources],
};

const normanStructural: Batch2CoreServicePage = {
  serviceSlug: "structural-engineering",
  title: "Norman structural engineering for additions and campus-area work",
  description: "Norman structural design for residential additions, ADUs, commercial interiors, and storm-related repairs.",
  h1: "Structural Engineering in Norman, Oklahoma",
  kicker: "Evidence-led design for Norman load paths",
  lede: "Norman structural projects need a clear connection between existing construction, proposed loads, soil and drainage evidence, and the city review record. University-area infill and neighborhood additions often conceal prior changes.",
  permitAuthority: "The City of Norman Development Services Division handles local building review. Planning, Public Works, utilities, fire, floodplain, and Cleveland County matters can be separate.",
  codeContext: "Confirm OUBCC adoption, Norman amendments and checklists, occupancy, wind, foundation, shelter, and special-inspection requirements before completing the structural set.",
  localConditions: "Little River and Canadian River drainage, expansive soils, prairie wind, tornadoes, hot humid summers, drought cycles, and flash storms affect foundations and connections.",
  projectTypes: "University-area remodels, detached ADUs, additions, safe-room interfaces, multifamily work, research spaces, and commercial fit-outs.",
  sections: [
    { heading: "Norman existing conditions deserve a measured record", body: "Older homes, rental conversions, campus-area buildings, and previous porch or room additions can have discontinuous framing. Record probes, bearing lines, foundation steps, roof changes, and existing openings before sizing a new beam or relying on an old wall." },
    { heading: "Soil and drainage affect more than footings", body: "Expansive soil, variable fill, river drainage, and intense storms can influence movement, retaining, finished floors, and the protection of structural penetrations. Tie the structural assumptions to Norman Public Works grades and the actual civil and flood information." },
    { heading: "Norman comments should show the changed load path", body: "A correction answer should identify the code issue, calculation, connection, and sheet. For a storm shelter, ADU, or addition, include egress, fire separation, foundation, roof, and existing-building effects rather than treating the scope as a detached detail." },
  ],
  permitSteps: [
    "Verify the Norman address, occupancy, current OUBCC path, flood screening, wind criteria, shelter requirements, and review checklist.",
    "Collect survey, soil or geotechnical information, foundation and framing observations, roof loads, and existing permit records.",
    "Coordinate foundations, beams, anchors, shelter interfaces, penetrations, shoring, fire protection, and inspection notes with the full set.",
    "Respond in a dated correction matrix with revised calculations and clouded sheets, preserving open field questions for inspection.",
  ],
  faqs: [
    { question: "Does a Norman addition always require a new geotechnical report?", answer: "The needed evidence depends on the site, existing information, loads, soil risk, and local review direction; an assumption should not be treated as a report." },
    { question: "How can flash storms affect Norman structural work?", answer: "Drainage and finished-floor conditions can affect foundations, retaining, erosion, and the protection of lower-level or exterior structural elements." },
    { question: "Does a Norman structural seal guarantee approval?", answer: "No. The professional addresses a defined design scope while Norman reviewers retain permit decisions." },
  ],
  sources: [...normanSources, ...stateSources],
};

const normanMep: Batch2CoreServicePage = {
  serviceSlug: "mep-engineering",
  title: "Norman MEP engineering for homes, research, and tenant work",
  description: "Norman mechanical, electrical, and plumbing design coordinated with occupancy, utilities, energy, and local review.",
  h1: "MEP Engineering for Norman, Oklahoma",
  kicker: "Right-sized systems for Norman buildings",
  lede: "Norman MEP engineering starts with how the building is used and how the existing utility service is configured. Heat, humidity, winter freeze, storm exposure, and the city checklist shape the drawings.",
  permitAuthority: "Norman Development Services reviews the building package; Norman Utilities, Public Works, fire, health, floodplain, and the electric provider may review related work separately.",
  codeContext: "Establish current OUBCC mechanical, plumbing, electrical, energy, fire, and accessibility requirements and Norman forms before issuing final risers or schedules.",
  localConditions: "Hot humid summers, winter freezes, tornado and hail exposure, smoke or dust, river drainage, and changing residential or research occupancy loads matter to system selection.",
  projectTypes: "Campus-area interiors, laboratories, restaurants, ADUs, home additions, multifamily renovations, and small commercial buildings.",
  sections: [
    { heading: "Norman MEP design follows occupancy and phasing", body: "A lab or restaurant cannot use a dwelling assumption for exhaust and makeup air. Document outside air, equipment, controls, service access, domestic water, sanitary demand, and shutdown sequencing against the real use and construction phase." },
    { heading: "Utility data supports, but does not replace, calculations", body: "Norman Utilities and Oklahoma Electric Cooperative information can establish connection points, pressure, and available service. The engineering record still needs panel demand, water and sewer loads, fire-flow coordination, equipment schedules, and flood-aware routing." },
    { heading: "Additions and ADUs can expose hidden capacity limits", body: "A new Norman dwelling or room can alter service size, HVAC zoning, water heating, sewer loading, and fire separation. When a reviewer changes one of these, revise risers, schedules, load calculations, energy forms, and architectural details together." },
  ],
  permitSteps: [
    "Confirm Norman occupancy, adopted code path, energy forms, fire review, utility territory, and Development Services checklist.",
    "Field-verify panels, equipment, water and sewer connections, and obtain provider information relevant to the proposed loads.",
    "Coordinate risers, equipment clearances, outside air, condensate, controls, shutdowns, accessible maintenance, and flood exposure.",
    "Return numbered corrections with revised schedules, calculations, risers, details, and provider correspondence in one issue.",
  ],
  faqs: [
    { question: "Can a Norman addition use an existing panel without review?", answer: "The existing panel and service must be evaluated against added heating, cooling, water-heating, cooking, and general loads and the local submission requirements." },
    { question: "Does Norman water availability prove sewer capacity?", answer: "No. Water and sewer connection conditions, flow, ownership, and project demand need separate verification." },
    { question: "What belongs in a Norman MEP correction response?", answer: "Identify the comment and requirement, show each revised calculation, schedule, riser, detail, and note any unresolved utility, fire, or field item." },
  ],
  sources: [...normanSources, ...stateSources],
};

const normanCivil: Batch2CoreServicePage = {
  serviceSlug: "civil-engineering",
  title: "Norman civil engineering for drainage and neighborhood infill",
  description: "Norman grading, stormwater, access, utility, flood, and erosion coordination for local development review.",
  h1: "Civil Engineering for Norman, Oklahoma Sites",
  kicker: "Site plans that connect pad, street, and drainage",
  lede: "Norman civil work ties a building to its lot, accessible route, fire access, utility network, and receiving drainage. River corridors, prairie runoff, and infill constraints make a small parcel deserving of a real site review.",
  permitAuthority: "Norman Development Services and Public Works administer local development interfaces; Planning, Utilities, fire, floodplain, county, and DEQ matters can be separate.",
  codeContext: "Confirm Norman development and stormwater standards, OUBCC site provisions, DEQ construction-stormwater triggers, floodplain information, and review thresholds for the parcel.",
  localConditions: "Little River and Canadian River drainage, flat prairie, expansive soils, flash storms, drought cycles, erodible channels, and growing impervious area influence grading.",
  projectTypes: "Neighborhood infill, university-area additions, detached ADUs, commercial parking, small subdivisions, drainage retrofits, and utility work.",
  sections: [
    { heading: "Norman site plans distinguish facts from assumptions", body: "Show survey control, contours, easements, rights-of-way, existing utilities, sidewalks, fire access, finished floors, inlets, and the downstream system. Utility records and field locates should be identified separately from a line drawn from an old plan." },
    { heading: "Drainage review follows the receiving system", body: "Norman Public Works, flood mapping, OWRB information, and DEQ construction coverage answer different questions. A new driveway or ADU can change roof runoff and access, while larger work may need detention, erosion controls, an outfall agreement, or flood elevation data." },
    { heading: "Correction responses preserve maintainable infrastructure", body: "Return revised contours, profiles, calculations, erosion details, finished-floor elevations, and maintenance assignments. If an addition reduces parking or crosses an easement, show that conflict and its resolution in the site package." },
  ],
  permitSteps: [
    "Confirm Norman zoning, frontage, flood, stormwater, right-of-way, fire-access, utility, and erosion-review requirements.",
    "Verify survey datum, existing drainage, utility locations, easements, outfall ownership, soils, finished floors, and downstream constraints.",
    "Coordinate grading, detention or infiltration, accessible routes, fire access, utility profiles, erosion controls, and building elevations.",
    "Answer Norman or agency comments with revised plans, calculations, details, and an explicit maintenance responsibility.",
  ],
  faqs: [
    { question: "Does a Norman ADU require a full subdivision drainage study?", answer: "Not necessarily, but its roof, paving, access, utilities, finished floor, and flood or stormwater effects still need the review required for that parcel." },
    { question: "Can a Norman site use an existing storm inlet without checking it?", answer: "No. Ownership, condition, capacity, elevation, and the city’s connection requirements must be verified." },
    { question: "Does Norman building approval authorize erosion-control work?", answer: "No. Site, stormwater, DEQ, right-of-way, and environmental requirements can require separate documentation or coverage." },
  ],
  sources: [...normanSources, ...stateSources],
};

const normanEnergy: Batch2CoreServicePage = {
  serviceSlug: "energy-compliance",
  title: "Norman energy compliance for additions and occupied buildings",
  description: "Norman energy documentation for envelope assemblies, HVAC, lighting, water heating, and local plan review.",
  h1: "Energy Compliance for Norman, Oklahoma",
  kicker: "Connected energy documentation for real alterations",
  lede: "Norman energy work is strongest when the selected Oklahoma compliance method, alteration scope, envelope details, and MEP schedules describe the same building. A worksheet cannot cure a mismatched construction set.",
  permitAuthority: "Norman Development Services identifies the local submittal process, while OUBCC adoption and the current city forms govern the applicable energy documentation.",
  codeContext: "Confirm the effective OUBCC energy provisions, climate inputs, residential or commercial method, alteration classification, and Norman checklist before preparing the analysis.",
  localConditions: "Humid summer cooling, solar gain, tornado and hail exposure, winter freezes, wind-driven rain, and older campus or neighborhood envelopes affect the modeled inputs.",
  projectTypes: "University-area renovations, home additions, ADUs, tenant improvements, HVAC replacements, roof work, lighting upgrades, and small commercial shells.",
  sections: [
    { heading: "The Norman envelope record follows the construction detail", body: "Document roof and wall insulation, windows, air sealing, slab edges, shading, moisture transitions, and penetrations for the actual addition or renovation. Existing wall assumptions should be supported by field evidence or clearly labeled as limitations." },
    { heading: "System inputs need Norman occupancy context", body: "Cooling, ventilation, filtration, lighting controls, service water, and equipment efficiency change with use and operating schedule. Tie each input to the MEP schedules and make sure a new ADU or conditioned addition is not omitted from the connected load." },
    { heading: "Plan-check corrections should be reproducible", body: "If Norman changes a window, insulation value, lighting allowance, or HVAC selection, identify the revised input, update the report or form, and cross-reference changed sheets. Code compliance does not promise utility savings or approval." },
  ],
  permitSteps: [
    "Confirm Norman’s current energy-code route, OUBCC edition, climate data, alteration category, and required submittal forms.",
    "Collect verified assemblies, fenestration, shading, HVAC, lighting, water-heating, controls, and service information.",
    "Reconcile every modeled input with architectural details, MEP schedules, structural penetrations, and procurement constraints.",
    "Return corrections with the cited requirement, revised forms or inputs, and a coordinated list of affected drawings.",
  ],
  faqs: [
    { question: "Is a Norman addition exempt because the existing house is older?", answer: "No. The alteration category, scope, connected systems, and current AHJ direction determine the applicable documentation." },
    { question: "Does the Norman energy method predict a utility bill?", answer: "No. It documents the selected code-compliance method; weather, occupants, operation, construction, and maintenance determine actual use." },
    { question: "What if a Norman contractor proposes different insulation?", answer: "Compare the substitution with the approved inputs and details, then update the energy and construction record when the change affects compliance." },
  ],
  sources: [...normanSources, ...stateSources],
};

const normanPe: Batch2CoreServicePage = {
  serviceSlug: "pe-stamped-drawings",
  title: "Norman PE-stamped drawings for defined engineering responsibility",
  description: "Norman sealed engineering documents with parcel evidence, discipline boundaries, and accountable correction records.",
  h1: "PE-Stamped Drawings in Norman, Oklahoma",
  kicker: "A documented professional scope for Norman review",
  lede: "A Norman sealed package should make its assumptions, observed conditions, calculations, and discipline limits visible. It should coordinate the city and utility path without claiming that a professional seal replaces review or authorization.",
  permitAuthority: "Norman Development Services retains building approval; Planning, Public Works, Utilities, fire, floodplain, county, and DEQ authorities retain decisions within their jurisdictions.",
  codeContext: "Identify current OUBCC provisions, Norman amendments, occupancy, design criteria, inspection requirements, professional scope, and authentication expectations before issuance. Check the Oklahoma State Board of Licensure for Professional Engineers and Land Surveyors for current licensure and sealing guidance.",
  localConditions: "Expansive prairie soils, river drainage, flash storms, tornado wind, older buildings, campus construction, and utility capacity questions require project-specific evidence.",
  projectTypes: "Structural additions, MEP alterations, civil site sets, ADUs, storm shelters, tenant improvements, and correction packages.",
  sections: [
    { heading: "Norman responsibility begins with a record", body: "State the parcel, survey, soil and flood basis, existing-condition observations, code criteria, calculations, sheet index, exclusions, and consultant interfaces. The responsible professional should distinguish a field observation from an owner’s unverified description." },
    { heading: "Local decisions remain distributed", body: "Development Services, Planning, Public Works, Utilities, fire, floodplain, and DEQ may each control a different part of the project. A sealed engineering scope can coordinate information but cannot authorize a utility connection, erosion discharge, or land-use change." },
    { heading: "Corrections and field changes need a return path", body: "Keep a dated response matrix for comments, RFIs, substitutions, and discovered conditions. The responsible PE evaluates whether changed foundations, loads, grades, systems, or details require a new calculation or sealed sheet." },
  ],
  permitSteps: [
    "Confirm Norman’s checklist, occupancy, current code path, discipline boundary, authentication requirements, and separate agency reviews.",
    "Assemble survey, soil, flood, utility, field, architectural, calculation, and consultant information, marking limitations explicitly.",
    "Review coordinated plans, details, notes, schedules, and calculations under the responsible professional’s defined Oklahoma scope.",
    "Route every plan-check comment and construction change through that professional and issue controlled dated revisions.",
  ],
  faqs: [
    { question: "Does a Norman PE seal guarantee a permit?", answer: "No. It communicates professional responsibility for a defined scope; Norman and other authorities retain approval decisions." },
    { question: "Can sealed Norman drawings rely on unverified utility locations?", answer: "The professional should identify the limitation and obtain appropriate records or field evidence before relying on the location for design." },
    { question: "How are Norman corrections documented?", answer: "Map each comment to its requirement, calculation, revised sheet, and any unresolved field or agency dependency, then submit the controlled response." },
  ],
  sources: [...normanSources, ...stateSources],
};

const edmondStructural: Batch2CoreServicePage = {
  serviceSlug: "structural-engineering",
  title: "Edmond structural engineering for suburban additions and growth",
  description: "Edmond structural design for additions, ADUs, retail work, and expanding suburban sites with local conditions in view.",
  h1: "Structural Engineering in Edmond, Oklahoma",
  kicker: "Load-path design for Edmond growth",
  lede: "Edmond structural work must account for the actual tract or infill building, not a neighboring prototype. Expansive clay, rolling grades, storm channels, wind, and new rooftop loads can all affect the permit set.",
  permitAuthority: "The City of Edmond Planning and Development Department administers local development and building paths. Engineering, utilities, fire, floodplain, and county reviews can be distinct.",
  codeContext: "Confirm current OUBCC provisions, Edmond amendments and checklists, occupancy, wind, foundation, accessibility, and inspection requirements before completing design.",
  localConditions: "Rolling prairie, expansive clay, localized flood channels, rapid growth, hot summers, hail, tornadoes, ice, and intense rain affect Edmond foundations and connections.",
  projectTypes: "Suburban additions, detached ADUs, retail centers, office work, residential remodels, rooftop equipment, and utility-intensive commercial buildings.",
  sections: [
    { heading: "Edmond tract construction is not a universal detail", body: "Verify framing, truss reactions, slab or crawlspace conditions, previous openings, and foundation geometry for the property. A new addition can encounter different fill or grading from the original house, especially where a subdivision lot has been reworked." },
    { heading: "Grades, clay, and storms influence continuity", body: "Expansive clay and rolling grades affect footing steps, retaining, movement joints, and drainage. Edmond engineering information and survey elevations should be coordinated with roof runoff, equipment supports, and the lateral load path." },
    { heading: "A correction response should preserve the buildable set", body: "Name the Edmond comment, revise the calculation and detail, and update the architectural or MEP sheet affected by the change. For an ADU or addition, show fire separation, egress, foundation, and existing-service penetrations in the same record." },
  ],
  permitSteps: [
    "Confirm Edmond jurisdiction, zoning path, occupancy, current code, wind and soil criteria, flood screening, and the local checklist.",
    "Collect survey, soil evidence, existing framing and foundation observations, roof and equipment loads, and prior permit information.",
    "Coordinate foundations, hold-downs, openings, retaining, shoring, penetrations, fire separation, and inspection notes with the full design.",
    "Track Edmond comments in a dated matrix, issue clouded revisions, and retain unresolved field items for inspection or clarification.",
  ],
  faqs: [
    { question: "Can an Edmond addition use the original tract foundation assumptions?", answer: "Only after the existing and proposed loads, soil, grade, and foundation evidence support that conclusion; nearby houses are not sufficient proof." },
    { question: "Why can an Edmond ADU affect structural design?", answer: "Its foundation, roof, utility penetrations, fire separation, egress, and relationship to the existing house can create new loads and connections." },
    { question: "Does Edmond plan review accept a generic wind detail?", answer: "The submitted design must address the applicable site and building criteria and respond to the reviewer’s requested evidence." },
  ],
  sources: [...edmondSources, ...stateSources],
};

const edmondMep: Batch2CoreServicePage = {
  serviceSlug: "mep-engineering",
  title: "Edmond MEP engineering for efficient suburban buildings",
  description: "Edmond HVAC, plumbing, electrical, and ventilation design tied to local utility and permit coordination.",
  h1: "MEP Engineering for Edmond, Oklahoma",
  kicker: "Service and system coordination for Edmond",
  lede: "Edmond MEP design starts with occupancy, existing service, summer cooling, winter protection, and the utility records for the parcel. Clear schedules and risers help local reviewers see how new work connects to old.",
  permitAuthority: "Edmond Planning and Development leads local building review; Edmond Electric, utility services, engineering, fire, floodplain, and county entities may review related work.",
  codeContext: "Confirm the current OUBCC mechanical, plumbing, electrical, energy, fire, and accessibility provisions, plus Edmond forms and utility requirements.",
  localConditions: "High cooling demand, ice and freezes, hail and tornado exposure, rolling grades, localized drainage, and rapid residential and commercial growth influence MEP routing.",
  projectTypes: "Retail, offices, detached ADUs, home additions, multifamily work, restaurants, and equipment replacements.",
  sections: [
    { heading: "Edmond MEP schedules should describe the real use", body: "Office ventilation, restaurant exhaust, dwelling loads, and retail service have different assumptions. Show occupancy, outdoor air, equipment access, condensate, controls, domestic-water demand, and shutdown needs in coordination with the floor plan." },
    { heading: "Edmond Electric and water records support capacity", body: "Provider information should establish service points and known constraints, while engineering calculates panel demand, water and sewer loading, equipment, fire-flow interfaces, and protection. Coordinate utility and equipment locations with grades and localized drainage." },
    { heading: "Residential additions are not isolated from the house", body: "An Edmond ADU or addition can alter service size, HVAC zoning, water heating, sewer, fire separation, and energy documentation. A plan-check change to one system should trigger a linked review of the riser, schedule, architectural detail, and compliance form." },
  ],
  permitSteps: [
    "Confirm Edmond occupancy, code path, energy forms, fire thresholds, utility territory, and Planning and Development submittal requirements.",
    "Field-check existing panels and equipment and request current electric, water, sewer, pressure, and fire-flow information as applicable.",
    "Coordinate loads, risers, shafts, equipment, clearances, condensate, controls, accessible service, and flood or drainage interfaces.",
    "Return numbered corrections with revised calculations, schedules, risers, details, forms, and utility records.",
  ],
  faqs: [
    { question: "Does Edmond Electric confirm that an addition can use the existing service?", answer: "Provider information is useful, but the design still needs a project load calculation and the AHJ’s required service, protection, and equipment documentation." },
    { question: "Can an Edmond ADU share the main house HVAC?", answer: "The zoning, capacity, controls, duct routing, fire separation, energy path, and local review requirements determine whether that arrangement is appropriate." },
    { question: "What if a plan-check change alters an Edmond panel schedule?", answer: "Update the load calculation, panel and riser schedules, equipment coordination, energy inputs, and any affected architectural or fire details." },
  ],
  sources: [...edmondSources, ...stateSources],
};

const edmondCivil: Batch2CoreServicePage = {
  serviceSlug: "civil-engineering",
  title: "Edmond civil engineering for growth-area grading and drainage",
  description: "Edmond site civil plans for grading, stormwater, access, utilities, flood screening, and suburban development review.",
  h1: "Civil Engineering for Edmond, Oklahoma Sites",
  kicker: "Grading and utility plans for changing neighborhoods",
  lede: "Edmond civil design connects a building pad and driveway to the public street, utility network, drainage route, and maintenance obligations. Rapid development makes current survey and utility evidence more useful than a neighboring plan.",
  permitAuthority: "Edmond engineering and Planning and Development coordinate local site and building review. Utilities, fire, floodplain, right-of-way, and county authorities can retain separate responsibilities.",
  codeContext: "Confirm Edmond development standards, stormwater and drainage requirements, OUBCC site provisions, DEQ construction coverage triggers, and the parcel’s flood screening.",
  localConditions: "Rolling prairie grades, expansive clay, rapid impervious growth, localized channels, intense storms, erosion, and drought cycles influence Edmond site work.",
  projectTypes: "Retail pads, residential infill, detached ADUs, additions, driveways, office sites, utility extensions, and drainage improvements.",
  sections: [
    { heading: "Edmond grading begins with the lot and frontage", body: "Show contours, easements, sidewalks, curb or ditch conditions, existing inlets, utilities, fire access, accessible routes, finished floors, and the intended outfall. Distinguish survey evidence from utility information that still needs field verification." },
    { heading: "Stormwater must follow the site’s receiving system", body: "Edmond engineering, state stormwater requirements, FEMA mapping, and local drainage records address different parts of the review. An ADU or new driveway can change runoff and access; larger work may need detention, erosion controls, or maintenance documentation." },
    { heading: "Correction details should be usable after construction", body: "Respond with revised contours, profiles, calculations, outlet protection, erosion notes, utility details, and maintenance assignments. Do not treat grading, fire access, or roof runoff as incidental because the building footprint is small." },
  ],
  permitSteps: [
    "Confirm Edmond zoning, frontage, stormwater, flood, right-of-way, fire-access, utility, and erosion-review thresholds for the address.",
    "Verify survey control, existing drainage, easements, utilities, outfall ownership, finished floors, soil assumptions, and downstream capacity.",
    "Coordinate grading, detention or infiltration, accessible paths, fire access, utility profiles, erosion controls, and building elevations.",
    "Return each Edmond correction with revised plans, calculations, details, and an identified party responsible for maintenance.",
  ],
  faqs: [
    { question: "Does an Edmond addition always require detention?", answer: "Not always. The parcel, impervious change, drainage standards, outfall, and local threshold determine what site documentation is required." },
    { question: "Can an Edmond driveway cross a drainage swale without review?", answer: "No. Grade, culvert, access, erosion, right-of-way, and downstream effects should be checked with the applicable authority." },
    { question: "Does Edmond building approval cover stormwater construction?", answer: "No. Development engineering, stormwater, right-of-way, flood, utility, and environmental requirements may be separate." },
  ],
  sources: [...edmondSources, ...stateSources],
};

const edmondEnergy: Batch2CoreServicePage = {
  serviceSlug: "energy-compliance",
  title: "Edmond energy compliance for new rooms and commercial fit-outs",
  description: "Edmond energy documentation coordinated with envelope, HVAC, lighting, water heating, and local permit review.",
  h1: "Energy Compliance for Edmond, Oklahoma",
  kicker: "A coordinated record for Edmond’s hot summers",
  lede: "Edmond energy compliance should describe the actual addition, tenant scope, envelope, equipment, lighting, and controls under the current Oklahoma path. Concise forms are useful only when their inputs match the drawings.",
  permitAuthority: "Edmond Planning and Development identifies the local submittal route; OUBCC adoption and Edmond forms determine the current energy documentation.",
  codeContext: "Confirm the effective Oklahoma energy requirements, climate data, residential or commercial method, alteration category, and local checklist before preparing the analysis.",
  localConditions: "Strong summer cooling demand, solar gain, hail and wind, winter ice, air leakage, and changing suburban construction details affect compliance inputs.",
  projectTypes: "New rooms, detached ADUs, retail fit-outs, office renovations, HVAC replacements, roof work, lighting upgrades, and home additions.",
  sections: [
    { heading: "Edmond envelope inputs belong to the detail set", body: "Wall and roof insulation, windows, shading, air barriers, slab edges, roof penetrations, and addition transitions should be documented as constructed. A neighboring tract’s assembly is not evidence for a different renovation." },
    { heading: "Equipment and controls need one source of truth", body: "Cooling loads, ventilation, efficiency, lighting controls, water heating, and thermostats should match MEP schedules and the selected compliance method. An Edmond ADU may add conditioned area and equipment even where its shell resembles the existing house." },
    { heading: "Corrections should update the record, not only the form", body: "When Edmond requests a different assembly, window, lighting value, or HVAC input, revise the report and the affected architectural or MEP detail. Compliance documents do not guarantee savings, approval, or field performance." },
  ],
  permitSteps: [
    "Confirm Edmond’s current OUBCC energy path, climate inputs, alteration classification, and Planning and Development forms.",
    "Collect verified envelope, fenestration, shading, HVAC, lighting, service-water, controls, and utility inputs.",
    "Cross-check modeled values against details, schedules, structural penetrations, product data, and actual procurement constraints.",
    "Answer each comment with a cited requirement, revised input or form, and a list of coordinated drawing changes.",
  ],
  faqs: [
    { question: "Is an Edmond detached ADU outside energy compliance?", answer: "No. Its conditioned area, connection to the house, alteration classification, and current local direction determine the required documentation." },
    { question: "Does Edmond energy compliance promise a lower bill?", answer: "No. Occupancy, weather, construction quality, equipment operation, controls, and maintenance determine actual energy use." },
    { question: "What should happen if an Edmond window changes after submission?", answer: "Recheck the applicable inputs and details, coordinate the revision with the architectural set, and resubmit the required documentation." },
  ],
  sources: [...edmondSources, ...stateSources],
};

const edmondPe: Batch2CoreServicePage = {
  serviceSlug: "pe-stamped-drawings",
  title: "Edmond PE-stamped drawings for local engineering review",
  description: "Edmond sealed engineering packages that define professional scope, parcel evidence, and controlled corrections.",
  h1: "PE-Stamped Drawings in Edmond, Oklahoma",
  kicker: "Defined responsibility for Edmond permits",
  lede: "A PE-stamped Edmond package should make design criteria, observed conditions, calculations, exclusions, and agency interfaces legible. A seal supports a defined professional scope; it does not promise city approval or utility acceptance.",
  permitAuthority: "Edmond Planning and Development retains local building and development decisions. Engineering, utilities, fire, floodplain, right-of-way, and county authorities can control separate requirements.",
  codeContext: "Identify current OUBCC adoption, Edmond amendments, occupancy, wind and soil criteria, inspection requirements, discipline boundaries, and professional authentication expectations. The Oklahoma State Board of Licensure for Professional Engineers and Land Surveyors is the current source for licensure and sealing guidance.",
  localConditions: "Growth-area grading, expansive clay, rolling terrain, storm channels, heat, hail, tornado exposure, and changing utility infrastructure require parcel-specific evidence.",
  projectTypes: "Structural additions, MEP packages, civil sites, ADUs, commercial interiors, retail work, and permit correction sets.",
  sections: [
    { heading: "The Edmond sealed record states what was reviewed", body: "Identify the address, survey, soil and drainage basis, field observations, code criteria, calculations, drawing index, assumptions, and exclusions. Existing framing, utility capacity, or drainage ownership should not be presented as verified without supporting evidence." },
    { heading: "Engineering does not collapse separate approvals", body: "Edmond Planning and Development, engineering, utilities, fire, floodplain, right-of-way, and county reviewers may ask for distinct documents. The professional scope can coordinate the package while leaving planning, service, and public-way decisions to the proper authority." },
    { heading: "Controlled revisions protect responsibility", body: "Use a dated matrix for plan-check comments, substitutions, RFIs, and field discoveries. The responsible PE evaluates changed foundations, equipment, loads, grades, or connections and identifies which sealed sheets and calculations must be reissued." },
  ],
  permitSteps: [
    "Identify Edmond’s checklist, occupancy, code route, discipline limits, authentication requirements, and separate agency handoffs.",
    "Assemble survey, field, soil, flood, utility, architectural, calculation, and consultant records with limitations clearly stated.",
    "Review the full coordinated drawings, details, schedules, notes, and calculations under the responsible Oklahoma professional scope.",
    "Route every technical correction and field change through that professional and issue dated, controlled revisions.",
  ],
  faqs: [
    { question: "Does an Edmond PE seal replace the city engineering review?", answer: "No. It identifies responsibility for a defined scope; Edmond and other authorities retain their own review and approval decisions." },
    { question: "Can an Edmond sealed package assume a subdivision utility is available?", answer: "No. Capacity, connection point, ownership, and current provider information must support the assumption or it should be identified as unresolved." },
    { question: "How are Edmond sealed corrections returned?", answer: "Map each comment to the requirement, calculation, revised sheet, and remaining dependency, then issue controlled revisions through the applicable review path." },
  ],
  sources: [...edmondSources, ...stateSources],
};

const lawtonStructural: Batch2CoreServicePage = {
  serviceSlug: "structural-engineering",
  title: "Lawton structural engineering for foothill and resilient buildings",
  description: "Lawton structural design for additions, military-adjacent facilities, downtown work, and industrial alterations.",
  h1: "Structural Engineering in Lawton, Oklahoma",
  kicker: "Load paths for Lawton’s foothills and high winds",
  lede: "Lawton structural design must reconcile rocky or expansive ground, steep drainage, high wind, heat, and existing construction. A clear field record helps separate ordinary assumptions from site-specific decisions.",
  permitAuthority: "The City of Lawton Development Services Department handles local building review. Planning, Public Works, utilities, fire, floodplain, county, and military or federal owners may have separate authority.",
  codeContext: "Confirm the current OUBCC adoption, Lawton amendments and checklists, occupancy, wind, foundation, fire, accessibility, and inspection provisions before issuing the design.",
  localConditions: "Wichita Mountain foothills, rocky and expansive soils, steep drainage, drought, intense rain, high wind, tornadoes, heat, and flash flooding can govern structural details.",
  projectTypes: "Military-adjacent facilities, hillside additions, ADUs, downtown rehabilitation, industrial work, commercial upgrades, and shelter interfaces.",
  sections: [
    { heading: "Lawton ground conditions change the structural starting point", body: "Rock outcrops, fill, expansive pockets, and sloping sites should be documented before selecting a footing or retaining approach. Existing downtown masonry and industrial frames also need observation of connections, deterioration, and prior penetrations." },
    { heading: "Wind, heat, and drainage cross the load path", body: "High wind uplift, tornado exposure, roof equipment, steep runoff, and flash flooding affect anchors, collectors, foundations, finished floors, and material choices. Coordinate structural assumptions with Lawton Public Works grades and the civil drainage record." },
    { heading: "Lawton corrections should resolve construction decisions", body: "Identify each Development Services comment, cited requirement, revised calculation, connection, and inspection hold point. For an ADU or addition, show the interface with the existing foundation, fire separation, egress, utilities, and roof drainage." },
  ],
  permitSteps: [
    "Confirm the Lawton address, ownership and jurisdiction, occupancy, current code, wind and soil criteria, flood screening, and checklist.",
    "Obtain survey, geotechnical or rock information, framing and foundation observations, roof loads, retaining geometry, and existing records.",
    "Coordinate foundations, anchors, lateral systems, openings, retaining, shoring, fire-rated penetrations, and special inspections.",
    "Return Lawton corrections in a dated matrix with clouded details, revised calculations, and field-dependent items clearly assigned.",
  ],
  faqs: [
    { question: "Does a Lawton foothill addition always require rock excavation?", answer: "The geotechnical and field record, proposed loads, grade, and local review determine the investigation and foundation scope; it should not be assumed either way." },
    { question: "How does Lawton wind affect an accessory building?", answer: "Exposure, roof geometry, openings, anchorage, and continuity should be evaluated for the actual parcel and structure under the applicable criteria." },
    { question: "Can a Lawton PE promise structural permit approval?", answer: "No. The professional is responsible for a defined design scope while Lawton and other authorities retain approval decisions." },
  ],
  sources: [...lawtonSources, ...stateSources],
};

const lawtonMep: Batch2CoreServicePage = {
  serviceSlug: "mep-engineering",
  title: "Lawton MEP engineering for heat, freeze, and service limits",
  description: "Lawton HVAC, plumbing, electrical, and ventilation design coordinated with local utilities and Development Services.",
  h1: "MEP Engineering for Lawton, Oklahoma",
  kicker: "Practical systems for Lawton occupancy and climate",
  lede: "Lawton MEP work must fit high summer heat, winter freezes, windblown dust, the actual occupancy, and the available utility service. Equipment schedules and risers should show how an addition or retrofit connects to existing conditions.",
  permitAuthority: "Lawton Development Services is the local building path; Public Works, utilities, fire, floodplain, health, county, and facility owners can impose separate requirements.",
  codeContext: "Confirm the current OUBCC mechanical, plumbing, electrical, energy, fire, and accessibility provisions, Lawton forms, and utility requirements before finalizing systems.",
  localConditions: "Extreme heat, winter freezes, dust, high wind, drought, intense rain, foothill grades, and flash-flood exposure affect equipment, controls, routing, and service access.",
  projectTypes: "Military-adjacent work, industrial buildings, downtown interiors, homes, ADUs, additions, restaurants, and resilient commercial upgrades.",
  sections: [
    { heading: "Lawton systems should follow the facility’s actual use", body: "Industrial exhaust, restaurant makeup air, office ventilation, and dwelling loads require separate calculations. Record occupancy, outside air, equipment access, combustion, condensate, controls, domestic water, and shutdown sequencing rather than using a generic schedule." },
    { heading: "Service information and site exposure affect equipment", body: "Lawton utility records and PSO information should support electrical, gas, water, sewer, and fire-flow coordination. Public Works grades and flood screening can change equipment elevations, utility crossings, condensate discharge, and accessible maintenance routes." },
    { heading: "A correction must travel through connected documents", body: "If Lawton requests a new panel, exhaust rate, equipment location, or protection detail, update calculations, risers, schedules, energy forms, structure, and fire coordination. An ADU or addition should show its added load rather than assuming spare capacity." },
  ],
  permitSteps: [
    "Confirm Lawton occupancy, current code path, energy forms, fire review, utility territory, flood screening, and Development Services checklist.",
    "Field-verify equipment and panels and obtain current electric, gas, water, sewer, pressure, and fire-flow information as applicable.",
    "Coordinate equipment, risers, ventilation, filtration, condensate, controls, clearances, flood exposure, shutdowns, and maintenance access.",
    "Answer every comment with revised load calculations, schedules, risers, details, forms, and provider correspondence.",
  ],
  faqs: [
    { question: "Does a Lawton addition automatically have spare electrical capacity?", answer: "No. Added HVAC, water heating, cooking, and general loads must be compared with the existing service and required provider and AHJ documents." },
    { question: "Can a Lawton ADU use the existing sewer without checking?", answer: "Connection ownership, capacity, flow, and local utility requirements must be verified for the proposed occupancy and fixtures." },
    { question: "What if Lawton changes an equipment location during review?", answer: "Recheck clearances, loads, structure, ventilation, condensate, energy inputs, fire separation, and accessible service, then issue coordinated revisions." },
  ],
  sources: [...lawtonSources, ...stateSources],
};

const lawtonCivil: Batch2CoreServicePage = {
  serviceSlug: "civil-engineering",
  title: "Lawton civil engineering for foothill drainage and resilient sites",
  description: "Lawton grading, drainage, utilities, access, flood screening, and erosion plans for local development review.",
  h1: "Civil Engineering for Lawton, Oklahoma Sites",
  kicker: "Site evidence for slopes, outfalls, and access",
  lede: "Lawton civil design must show how a pad, driveway, fire route, utilities, and runoff work on rocky or expansive ground and through steep drainage. A building permit is not a universal site authorization.",
  permitAuthority: "Lawton Development Services and Public Works provide local development interfaces; Planning, utilities, fire, floodplain, county, and DEQ agencies can review separate aspects.",
  codeContext: "Confirm Lawton development and drainage standards, OUBCC provisions, DEQ construction-stormwater triggers, floodplain data, right-of-way rules, and the local checklist.",
  localConditions: "Wichita Mountain foothill grades, rocky and expansive soils, drought cycles, intense storms, flash flooding, erosion, and constrained outfalls shape Lawton civil work.",
  projectTypes: "Hillside additions, military-adjacent sites, downtown rehabilitation, industrial yards, ADUs, access changes, and drainage retrofits.",
  sections: [
    { heading: "Lawton site plans need accurate grade and ownership data", body: "Show survey control, contours, rock or soil observations, easements, utilities, streets, fire access, accessible routes, finished floors, and the receiving drainage system. Confirm whether an outfall, ditch, culvert, or utility is public, private, or merely shown on an old plan." },
    { heading: "Foothill runoff and flash flooding require a receiving-system check", body: "Steep grades can concentrate water rapidly, while rock and clay limit infiltration. Coordinate Public Works, FEMA and OWRB flood information, erosion controls, finished floors, utility crossings, and DEQ requirements according to project size and disturbance." },
    { heading: "Small Lawton projects still change site behavior", body: "An ADU, driveway, patio, or addition can redirect roof water, consume fire access, add sewer demand, or cross an easement. Return revisions with contours, profiles, calculations, outlet protection, access details, and maintenance ownership." },
  ],
  permitSteps: [
    "Confirm Lawton zoning, frontage, grading, flood, stormwater, right-of-way, fire-access, utility, and erosion requirements for the parcel.",
    "Verify survey datum, slopes, rock or soil assumptions, existing drainage, utilities, easements, outfall ownership, and finished floors.",
    "Coordinate grading, retaining, detention or infiltration, accessible routes, fire access, utility profiles, erosion controls, and building elevations.",
    "Respond to every city or agency comment with revised plans, calculations, details, and a clear long-term maintenance assignment.",
  ],
  faqs: [
    { question: "Can Lawton hillside runoff be sent to the nearest ditch?", answer: "Only after ownership, capacity, grade, erosion, right-of-way, and downstream requirements are checked with the applicable authority." },
    { question: "Does a Lawton ADU always need a detention basin?", answer: "No. The site area, impervious change, drainage route, local threshold, and receiving system determine the required treatment." },
    { question: "Does Lawton building approval authorize a floodplain or outfall change?", answer: "No. Floodplain, public works, right-of-way, environmental, utility, and stormwater authorizations can be separate." },
  ],
  sources: [...lawtonSources, ...stateSources],
};

const lawtonEnergy: Batch2CoreServicePage = {
  serviceSlug: "energy-compliance",
  title: "Lawton energy compliance for heat-exposed buildings",
  description: "Lawton energy documentation for hot-climate envelopes, equipment, lighting, controls, and alteration permits.",
  h1: "Energy Compliance for Lawton, Oklahoma",
  kicker: "Hot-climate code documentation for Lawton",
  lede: "Lawton energy compliance connects the current Oklahoma method to the actual shell, HVAC, lighting, service water, and alteration scope. High cooling loads and exposed sites make coordination between report and construction details essential.",
  permitAuthority: "Lawton Development Services identifies the local submittal path; OUBCC adoption and current Lawton forms control the applicable energy documentation.",
  codeContext: "Confirm the effective Oklahoma energy provisions, climate data, residential or commercial method, alteration category, and Lawton checklist before preparing the analysis.",
  localConditions: "Extreme summer heat, solar exposure, dust, high wind, hail, winter freezes, wind-driven rain, and flood-sensitive equipment locations affect inputs and details.",
  projectTypes: "Industrial upgrades, commercial interiors, home additions, ADUs, downtown renovations, HVAC replacement, roof work, and lighting projects.",
  sections: [
    { heading: "Lawton envelope details must handle exposure", body: "Roof and wall insulation, fenestration, air sealing, shading, thermal bridges, penetrations, and moisture transitions should match the selected assemblies and the actual exposed site. A generic hot-climate value is not a construction detail." },
    { heading: "Heat makes system coordination visible", body: "Cooling efficiency, sizing, ventilation, filtration, controls, lighting, water heating, and condensate assumptions should agree across the energy report and MEP set. A new Lawton addition or ADU may add a separate zone and service load." },
    { heading: "Corrections should update both compliance and construction", body: "If Lawton changes an assembly, window, lighting allowance, or equipment selection, update the form or model and linked architectural and MEP sheets. The analysis documents code compliance; it does not promise savings, comfort, or approval." },
  ],
  permitSteps: [
    "Confirm Lawton’s current OUBCC energy provisions, climate inputs, occupancy, alteration route, and Development Services forms.",
    "Collect verified envelope, fenestration, shading, HVAC, lighting, service-water, controls, and utility information.",
    "Compare each modeled input with architectural details, equipment schedules, structural penetrations, product data, and field constraints.",
    "Return comments with the cited provision, revised form or input, and a coordinated list of affected drawing changes.",
  ],
  faqs: [
    { question: "Is a Lawton addition exempt from energy documentation because it is small?", answer: "Not automatically. Scope, conditioned area, alteration category, connected systems, and the current AHJ direction determine the path." },
    { question: "Does Lawton energy compliance guarantee cooling performance?", answer: "No. Weather, sizing, installation, controls, envelope quality, occupants, and maintenance affect actual performance." },
    { question: "What if a Lawton equipment substitution has a different efficiency?", answer: "Recheck the applicable compliance inputs and MEP schedules, coordinate the changed details, and submit a revision when the permitted design changes." },
  ],
  sources: [...lawtonSources, ...stateSources],
};

const lawtonPe: Batch2CoreServicePage = {
  serviceSlug: "pe-stamped-drawings",
  title: "Lawton PE-stamped drawings for defined local scopes",
  description: "Lawton sealed engineering documents with site evidence, professional boundaries, and controlled plan-check revisions.",
  h1: "PE-Stamped Drawings in Lawton, Oklahoma",
  kicker: "Accountable scope for Lawton engineering review",
  lede: "A Lawton sealed package should state what the responsible professional reviewed, what remains outside scope, and how foothill, utility, flood, and existing-condition facts support the design. A seal is not a permit guarantee.",
  permitAuthority: "Lawton Development Services retains building decisions; Planning, Public Works, utilities, fire, floodplain, county, DEQ, and facility owners may retain separate authority.",
  codeContext: "Identify current OUBCC provisions, Lawton amendments, occupancy, wind and soil criteria, inspection requirements, discipline limits, and professional authentication expectations. Check the Oklahoma State Board of Licensure for Professional Engineers and Land Surveyors before issuing sealed sheets.",
  localConditions: "Rocky and expansive ground, steep drainage, flash flooding, heat, high wind, aging buildings, industrial interfaces, and utility constraints require project-specific evidence.",
  projectTypes: "Structural and MEP permits, civil site packages, hillside additions, ADUs, industrial changes, military-adjacent work, and correction resubmissions.",
  sections: [
    { heading: "Lawton sealed work begins with boundaries", body: "State the address, survey and soil basis, flood information, field observations, code criteria, calculations, sheet list, assumptions, exclusions, and consultant interfaces. Do not represent a rock condition, hidden footing, or utility capacity as verified without evidence." },
    { heading: "Lawton approvals remain distributed", body: "Development Services, Public Works, Planning, fire, floodplain, utilities, DEQ, county, and an owner or facility authority can each control a decision. A sealed scope coordinates engineering information but does not authorize a public-way cut or land-use change." },
    { heading: "Corrections and field discoveries need a professional return path", body: "Maintain a dated matrix for comments, substitutions, RFIs, and discoveries. The responsible PE decides whether a revised load, grade, equipment, foundation, or connection changes the calculation and requires a new sealed sheet." },
  ],
  permitSteps: [
    "Identify Lawton’s checklist, occupancy, code path, discipline boundary, authentication requirements, and each separate agency handoff.",
    "Assemble survey, geotechnical or rock, flood, utility, field, architectural, calculation, and consultant information with limitations.",
    "Review coordinated drawings, details, schedules, notes, and calculations under the responsible professional’s Oklahoma scope.",
    "Route every correction and field change through that professional and issue dated controlled revisions for changed scope.",
  ],
  faqs: [
    { question: "Does a Lawton PE seal replace Public Works or utility approval?", answer: "No. It establishes responsibility for a defined professional scope; city, public works, utility, fire, flood, and environmental authorities retain their decisions." },
    { question: "Can a Lawton PE seal a package with unknown rock conditions?", answer: "The professional must use appropriate evidence and clearly state limitations; unknown conditions should not be presented as confirmed site facts." },
    { question: "How should Lawton sealed plan-check changes be issued?", answer: "Tie each comment to the requirement, calculation, revised sheet, and unresolved dependency, then issue controlled revisions within the defined scope." },
  ],
  sources: [...lawtonSources, ...stateSources],
};

const oklahomaBatch4: Batch2StateExpansion = {
  stateSlug: "oklahoma",
  stateName: "Oklahoma",
  stateAbbrev: "OK",
  hub: {
    title: "Oklahoma Engineering Services for Local Permit Review",
    description: "Oklahoma structural, MEP, civil, energy, and PE-stamped drawing support for city-specific code, site, utility, and plan-check coordination.",
    h1: "Engineering for Oklahoma’s Prairie, River, and Foothill Sites",
    kicker: "State code resources with local review discipline",
    lede: "Oklahoma projects combine OUBCC code resources with city or county building, zoning, stormwater, floodplain, fire, utility, and right-of-way decisions. A durable record starts with the actual address and carries every correction through coordinated documents.",
    sections: [
      { heading: "Oklahoma code is a starting point, not one permit path", body: "The Oklahoma Uniform Building Code Commission publishes the statewide code framework, while each local authority sets its submission process, amendments, zoning checks, inspection path, and related development requirements. For professional seals, the Oklahoma State Board of Licensure for Professional Engineers and Land Surveyors supplies current licensure and authentication guidance. Confirm the current code and checklist with the AHJ for the parcel." },
      { heading: "Prairie, river, clay, and foothill conditions vary by address", body: "Tornado wind, hail, hot summers, winter ice, expansive clay, rocky ground, intense rainfall, flash flooding, river corridors, and localized channels can affect structure, envelope, MEP, grading, and equipment placement. Survey, soil, flood, and utility evidence should control assumptions." },
      { heading: "ADUs, additions, and shelters remain coordinated scopes", body: "An ADU or addition can change egress, fire separation, foundations, HVAC and electrical capacity, sewer and water demand, grading, impervious area, and energy documentation. A storm shelter or safe-room interface also needs its own code and structural review; it is not an automatic permit shortcut." },
      { heading: "State and federal sources inform local handoffs", body: "Oklahoma DEQ stormwater information, OWRB floodplain resources, and FEMA maps support environmental and flood screening, but they do not replace city, county, utility, or public-works decisions. Building approval alone does not authorize a discharge, fill, outfall, or service connection." },
      { heading: "Driveways, state highways, and access permits", body: "A site plan that adds or relocates a driveway, modifies a sidewalk, crosses a ditch, or connects to a state route can require a transportation or right-of-way handoff separate from the building permit. The city or county public-works office may control local frontage, sight distance, drainage at the curb, pavement restoration, and construction access. Where a project touches an Oklahoma Department of Transportation facility, ODOT access and utility-crossing requirements may apply instead. Confirm the road owner, fire-apparatus route, traffic-control plan, and utility crossing before civil grades are treated as final; local building approval does not authorize public-way construction." },
    ],
    faqs: [
      { question: "Does Oklahoma have one permit office for every engineering project?", answer: "No. OUBCC provides code resources, while the city or county AHJ administers local building and development review. Fire, floodplain, stormwater, utility, health, environmental, and right-of-way reviews may be separate." },
      { question: "What should be checked before designing an Oklahoma addition?", answer: "Confirm the jurisdiction and code edition, survey, soil and drainage conditions, flood status, wind and heat inputs, utility capacity, occupancy, alteration scope, and any zoning or fire trigger." },
      { question: "How should Oklahoma plan-check corrections be handled?", answer: "Use a dated matrix naming each reviewer comment, cited requirement, response, revised sheet or calculation, and unresolved field or agency item. A professional response does not guarantee approval." },
    ],
    sources: stateSources,
  },
  metros: [
    { slug: "oklahoma-city", name: "Oklahoma City", county: "Oklahoma County", services: [okcStructural, okcMep, okcCivil, okcEnergy, okcPe] },
    { slug: "tulsa", name: "Tulsa", county: "Tulsa County", services: [tulsaStructural, tulsaMep, tulsaCivil, tulsaEnergy, tulsaPe] },
    { slug: "norman", name: "Norman", county: "Cleveland County", services: [normanStructural, normanMep, normanCivil, normanEnergy, normanPe] },
    { slug: "edmond", name: "Edmond", county: "Oklahoma County", services: [edmondStructural, edmondMep, edmondCivil, edmondEnergy, edmondPe] },
    { slug: "lawton", name: "Lawton", county: "Comanche County", services: [lawtonStructural, lawtonMep, lawtonCivil, lawtonEnergy, lawtonPe] },
  ],
};

export { oklahomaBatch4 };
export default oklahomaBatch4;