import type {
  Batch2CoreServicePage,
  Batch2CoreServiceSlug,
  Batch2StateExpansion,
} from "./batch2-core-service-types";

type Source = { label: string; url: string };

const stateSources: Source[] = [
  { label: "New Jersey Uniform Construction Code", url: "https://www.nj.gov/dca/codes/" },
  { label: "NJDEP stormwater program", url: "https://dep.nj.gov/stormwater/" },
  { label: "NJDEP Flood Hazard Area Control Act", url: "https://dep.nj.gov/wlm/flood-hazard-area-control-act/" },
  { label: "New Jersey Board of Professional Engineers", url: "https://www.njconsumeraffairs.gov/pem" },
];

const newarkSources: Source[] = [
  { label: "Newark Engineering and Building", url: "https://www.newarknj.gov/departments/engineering" },
  { label: "Newark planning and zoning", url: "https://www.newarknj.gov/government/departments/planning" },
  { label: "Newark water and sewer", url: "https://www.newarknj.gov/departments/water-sewer" },
  { label: "Newark economic and housing development", url: "https://www.newarknj.gov/government/departments/economic-housing-development" },
  { label: "PSE&G construction and renovation", url: "https://nj.pseg.com/constructionandrenovation" },
];
const jerseyCitySources: Source[] = [
  { label: "Jersey City Division of Construction Code", url: "https://www.jerseycitynj.gov/cityhall/HousingAndDevelopment/constructioncode" },
  { label: "Jersey City city planning", url: "https://www.jerseycitynj.gov/cityhall/HousingAndDevelopment/cityplanning" },
  { label: "Jersey City Municipal Utilities Authority", url: "https://www.jcmua.com/" },
  { label: "Jersey City public works", url: "https://www.jerseycitynj.gov/cityhall/DPW" },
];
const patersonSources: Source[] = [
  { label: "Paterson construction code", url: "https://www.patersonnj.gov/department/index.php?structureid=18" },
  { label: "Paterson planning and zoning", url: "https://www.patersonnj.gov/department/index.php?structureid=21" },
  { label: "Paterson public works", url: "https://www.patersonnj.gov/department/index.php?structureid=26" },
  { label: "Passaic Valley Sewerage Commission", url: "https://www.pvsc.com/" },
];
const edisonSources: Source[] = [
  { label: "Edison Township construction", url: "https://www.edisonnj.org/government/departments/construction/" },
  { label: "Edison Township planning and zoning", url: "https://www.edisonnj.org/government/departments/planning/" },
  { label: "Edison Township public works", url: "https://www.edisonnj.org/government/departments/public_works/" },
  { label: "Middlesex County engineering", url: "https://www.middlesexcountynj.gov/government/departments/department-of-infrastructure-management/engineering" },
];
const trentonSources: Source[] = [
  { label: "Trenton construction office", url: "https://www.trentonnj.org/390/Construction-Office" },
  { label: "Trenton planning division", url: "https://www.trentonnj.org/389/Planning-Division" },
  { label: "Trenton Water Works", url: "https://www.trentonnj.org/370/Trenton-Water-Works" },
  { label: "Trenton public works", url: "https://www.trentonnj.org/371/Public-Works" },
];

const newarkStructural: Batch2CoreServicePage = {
  serviceSlug: "structural-engineering",
  title: "Newark structural engineering for adaptive reuse",
  description: "Structural design for Newark openings, additions, and adaptive reuse, coordinated with older masonry, flood exposure, and UCC review.",
  h1: "Structural Engineering for Newark, New Jersey",
  kicker: "Verified load paths for Newark’s dense building stock",
  lede: "Newark structural work starts with probes, permit history, and a real load path through masonry, wood framing, and new openings—not a generic urban detail.",
  permitAuthority: "Newark Engineering and Building is the local construction contact; zoning, fire, historic, right-of-way, and utility decisions can be separate. Confirm the responsible subcode official for the address.",
  codeContext: "Apply the current New Jersey UCC and adopted subcodes confirmed by Newark, with flood, existing-building, accessibility, and historic requirements screened before drawings are finalized.",
  localConditions: "Passaic River and tidal-influenced lowlands, dense urban fill, older brick rowhouses, combined sewers, and constrained staging can alter foundations and temporary works.",
  projectTypes: "Rowhouse openings, downtown adaptive reuse, university-area alterations, commercial infill, and additions or ADUs where Newark zoning permits them.",
  sections: [
    { heading: "Investigating Newark’s existing frame", body: "Brick bearing walls, shallow foundations, altered storefronts, wood joists, and undocumented rooftop equipment are common reasons to expose rather than assume. Record bearing lines, cracks, anchors, and prior permits before sizing a transfer beam or addition." },
    { heading: "River lowlands and connected agencies", body: "A Passaic-area parcel may need flood-elevation and finished-floor coordination alongside Newark review. Dense fill, groundwater, street trees, utilities, and adjacent party walls should be reconciled with survey and geotechnical information before excavation." },
    { heading: "Answering a Newark plan check", body: "A useful correction response names the cited UCC issue, revised sheet, calculation, and field limitation. Coordinate beam pockets, fire-rated penetrations, shoring, and MEP openings instead of revising an isolated structural detail." },
  ],
  permitSteps: [
    "Confirm Newark jurisdiction, occupancy, current UCC subcodes, flood and historic triggers, and whether zoning or right-of-way approvals precede construction intake.",
    "Obtain a survey, targeted framing and foundation observations, geotechnical recommendations where warranted, flood information, and loads for new rooftop or mechanical work.",
    "Coordinate foundations, party-wall protection, connections, shoring, special inspections, fire separations, and MEP penetrations with the complete permit set.",
    "Log each Newark correction, cloud changed sheets, update calculations, and have the responsible PE review the coordinated resubmission.",
  ],
  faqs: [
    { question: "What should a Newark rowhouse investigation include?", answer: "It should document accessible framing, bearing walls, foundation type, prior alterations, cracks, party-wall conditions, and the limits of observation before new loads are assigned." },
    { question: "Does Passaic River proximity change a Newark foundation design?", answer: "It can. Flood elevations, groundwater, fill, scour or erosion exposure, and the proposed finished floor should be checked against official flood and geotechnical information." },
    { question: "How should Newark structural comments be returned?", answer: "Use a numbered matrix tied to revised sheets and calculations, explain unresolved field assumptions, and coordinate every structural change with architecture, fire, civil, and MEP drawings." },
  ],
  sources: [...newarkSources, ...stateSources],
};

const newarkMep: Batch2CoreServicePage = {
  serviceSlug: "mep-engineering",
  title: "Newark MEP engineering for adaptive reuse and additions",
  description: "Newark HVAC, electrical, plumbing, and ventilation design for older buildings, tenant work, additions, and ADUs where allowed.",
  h1: "MEP Engineering for Newark, New Jersey",
  kicker: "Service capacity and healthy building coordination",
  lede: "Newark MEP design connects old risers and constrained utility rooms to the actual occupancy, ventilation, energy, and fire strategy reviewed by the city.",
  permitAuthority: "Newark Engineering and Building coordinates construction-code intake, while Newark water and sewer, fire, zoning, historic, and utility providers may issue separate requirements.",
  codeContext: "Confirm the current New Jersey mechanical, electrical, plumbing, energy, fire, and rehabilitation subcodes with the Newark enforcing agency for the occupancy and alteration scope.",
  localConditions: "Compact lots, older service equipment, combined sewer areas, humid summers, winter heating, flood-sensitive basements, and active streets affect routing and shutdown planning.",
  projectTypes: "Downtown tenant improvements, multifamily rehabilitation, restaurant conversions, rowhouse additions, and permitted accessory dwelling or accessory-use work.",
  sections: [
    { heading: "Tracing Newark’s existing systems", body: "Field-trace service entrances, panels, risers, domestic-water branches, sanitary connections, shafts, and combustion equipment. A new tenant or ADU can expose spare-capacity assumptions that old labels do not support." },
    { heading: "Air, water, and basement constraints", body: "Ventilation, filtration, condensate, backflow protection, flood-resistant equipment placement, and sewer connections need details suited to the actual floor elevations. Coordinate Newark Water and Sewer information with utility correspondence rather than estimating capacity." },
    { heading: "A coordinated correction record", body: "If plan check changes panel load, exhaust, sprinkler interfaces, or plumbing risers, revise the affected schedules, calculations, architectural fire separations, and energy documents together. A narrative alone does not show the revised installation." },
  ],
  permitSteps: [
    "Identify the Newark enforcing agency, occupancy, current mechanical, electrical, plumbing, energy, and fire paths, plus any historic or flood review.",
    "Field-verify equipment and shafts and request written electric, gas, water, sewer, and fire-flow information for the proposed use.",
    "Lay out Newark equipment, risers, ventilation, condensate, controls, flood protection, shutdown phases, clearances, and service access as one coordinated system.",
    "Return numbered comments with revised schedules, calculations, risers, details, and utility correspondence in one dated Newark response.",
  ],
  faqs: [
    { question: "Can an old Newark electrical service support a second dwelling?", answer: "Only a project load calculation and provider or AHJ information can establish that. An existing panel label is not evidence of available capacity." },
    { question: "What MEP issue is common in Newark basement alterations?", answer: "Low elevations can affect sanitary backflow, condensate, equipment location, flood protection, and access. Those conditions should be surveyed and coordinated before final routing." },
    { question: "When should a Newark HVAC change trigger an energy revision?", answer: "When the equipment, controls, ventilation, or distribution changes an energy input, update the applicable compliance documents and the connected MEP and architectural sheets." },
  ],
  sources: [...newarkSources, ...stateSources],
};

const newarkCivil: Batch2CoreServicePage = {
  serviceSlug: "civil-engineering",
  title: "Newark civil engineering for urban drainage and infill",
  description: "Newark grading, drainage, utility, access, and flood coordination for infill, rehabilitation, and small residential additions.",
  h1: "Civil Engineering for Newark, New Jersey",
  kicker: "Survey-based plans for streets, sewers, and receiving water",
  lede: "Newark civil plans must show how a tight parcel reaches public utilities and receives runoff while preserving access, flood information, and constructible grades.",
  permitAuthority: "Newark Engineering and Building is distinct from Newark Planning and Zoning, Public Works, Water and Sewer, county review, NJDEP, and utility or right-of-way authorities.",
  codeContext: "Confirm Newark site-plan, zoning, stormwater, flood-hazard, soil-erosion, frontage, and New Jersey UCC triggers for the parcel and amount of disturbance.",
  localConditions: "Impervious urban blocks, combined-sewer constraints, river lowlands, shallow groundwater, contaminated or filled ground, alleys, and narrow construction access affect civil decisions.",
  projectTypes: "Infill buildings, courtyard work, adaptive reuse sites, parking changes, residential additions, and ADUs or accessory structures where zoning allows.",
  sections: [
    { heading: "Surveying the Newark public edge", body: "Show parcel limits, curb grades, alleys, inlets, utility covers, easements, accessible routes, fire access, and the actual receiving connection. A conceptual line to the nearest sewer is not a utility plan." },
    { heading: "Runoff in a combined-sewer city", body: "Roof and paving changes should be checked against Newark drainage requirements, NJDEP stormwater rules, outfall ownership, and available records. Flood elevations and groundwater can control finished floors and infiltration assumptions." },
    { heading: "Small scopes still need civil coordination", body: "An addition or ADU can add impervious area, alter a driveway, reduce fire access, cross an easement, or increase sewer flow. Put those changes on the plan and respond to each engineering comment with revised contours or profiles." },
  ],
  permitSteps: [
    "Map Newark zoning, engineering, public-works, Water and Sewer, county, NJDEP, flood, soil-erosion, and right-of-way requirements for the address.",
    "Verify survey datum, existing utilities, drainage areas, outfall ownership, flood information, groundwater or soil assumptions, and finished-floor elevations.",
    "Prepare coordinated grading, drainage, utility, fire-access, accessible-route, erosion, and maintenance plans tied to the building footprint.",
    "Revise contours, profiles, calculations, details, and agency records for each Newark correction before resubmission.",
  ],
  faqs: [
    { question: "Can a Newark infill site use an existing sewer connection without study?", answer: "Not automatically. Connection size, ownership, invert, downstream conditions, proposed flow, and Newark or utility requirements should be verified." },
    { question: "When does a Newark addition need a drainage review?", answer: "A review may be needed when roof area, paving, grades, access, flood exposure, easements, or the receiving sewer changes, even without a subdivision." },
    { question: "Who decides whether Newark stormwater work needs NJDEP review?", answer: "The applicable municipal and NJDEP thresholds and the project disturbance or discharge control that determination; cite the current official checklist rather than assuming an exemption." },
  ],
  sources: [...newarkSources, ...stateSources],
};

const newarkEnergy: Batch2CoreServicePage = {
  serviceSlug: "energy-compliance",
  title: "Newark energy compliance for dense urban renovations",
  description: "Newark energy documentation for envelope, HVAC, lighting, and additions coordinated with the New Jersey energy subcode.",
  h1: "Energy Compliance for Newark, New Jersey",
  kicker: "Envelope and equipment records for urban alterations",
  lede: "Newark energy compliance depends on the alteration category and the real existing envelope, not a copied worksheet for a rowhouse or commercial shell.",
  permitAuthority: "Newark Engineering and Building confirms the local intake and current UCC energy path; zoning, historic, fire, and utility reviews remain separate.",
  codeContext: "Use the current New Jersey UCC energy subcode and approved compliance method confirmed for the occupancy, rehabilitation scope, and Newark permit submission.",
  localConditions: "Party walls, compact façades, shaded urban canyons, damp basements, older windows, rooftop equipment, and flood-sensitive lower levels can affect the documented assemblies.",
  projectTypes: "Rowhouse renovations, downtown tenant improvements, multifamily envelope work, additions, and ADUs where Newark zoning and the building code permit them.",
  sections: [
    { heading: "Existing envelopes in Newark", body: "Document masonry, party walls, windows, roof assemblies, air barriers, insulation access, and basement moisture conditions. A historic or constrained façade may require a different compliance strategy than a new infill wall." },
    { heading: "Energy inputs must match MEP", body: "Heating and cooling equipment, outdoor air, lighting power, controls, service water, glazing, and penetrations should agree across the modeled record and permit drawings. Flood-sensitive equipment needs a coordinated location and protection detail." },
    { heading: "Correction responses that can be built", body: "For a Newark comment, cite the provision or method, identify the changed input, revise the form and affected architectural or MEP sheet, and state any field verification needed before installation." },
  ],
  permitSteps: [
    "Ask Newark to confirm the current energy subcode, climate and alteration inputs, accepted forms, and whether historic or rehabilitation review changes the route.",
    "Collect verified wall, roof, window, air-sealing, HVAC, ventilation, lighting, controls, and service-water information from the coordinated design.",
    "Cross-check modeled assemblies and equipment against structure, penetrations, flood conditions, fire separations, and field responsibilities.",
    "Answer every energy correction with its citation, revised input or form, and cross-referenced drawing change in the Newark resubmission.",
  ],
  faqs: [
    { question: "Does replacing Newark rowhouse windows decide the entire energy path?", answer: "No. The alteration category, affected assemblies, HVAC and lighting scope, and current AHJ direction determine the required documentation." },
    { question: "How can a party wall be represented in Newark energy documents?", answer: "Use the selected compliance method and verified existing assembly, clearly identifying assumptions and any inaccessible condition instead of assigning an unsupported insulation value." },
    { question: "Can a Newark energy form be submitted before HVAC schedules are final?", answer: "Only if the accepted method and AHJ allow it; energy inputs must ultimately agree with the equipment, controls, ventilation, and construction drawings." },
  ],
  sources: [...newarkSources, ...stateSources],
};

const newarkStamped: Batch2CoreServicePage = {
  serviceSlug: "pe-stamped-drawings",
  title: "Newark PE-stamped drawings for accountable permit sets",
  description: "Newark sealed engineering documents with defined scope, field evidence, UCC coordination, and correction tracking.",
  h1: "PE-Stamped Drawings for Newark, New Jersey",
  kicker: "Defined professional scope for Newark review",
  lede: "A Newark sealed set should identify the parcel, discipline, evidence, calculations, and limitations reviewed by the responsible professional; a seal is not a promise of approval.",
  permitAuthority: "Newark Engineering and Building decides construction-code acceptance within its jurisdiction. Newark Planning and Zoning, fire, historic, utility, county, and environmental agencies may retain separate authority.",
  codeContext: "State the applicable New Jersey UCC subcodes, occupancy, existing-building route, flood or historic triggers, discipline boundary, and required seal format before issuance.",
  localConditions: "Party walls, filled ground, river lowlands, utility congestion, occupied renovations, and adjacent public ways make the record of observations especially important.",
  projectTypes: "Structural alteration sets, civil utility plans, MEP tenant documents, energy-related engineering, additions, and permitted ADU work requiring professional responsibility.",
  sections: [
    { heading: "What a Newark sealed record establishes", body: "The drawing index should identify the Newark parcel, design criteria, source survey, observed existing conditions, calculations, exclusions, and sheets independently reviewed. State what remains subject to field verification." },
    { heading: "Interfaces beyond the seal", body: "Flood, soil, utility, historic, fire, and right-of-way information may come from other qualified parties or agencies. Coordinate those inputs without implying that one PE seal replaces their approvals." },
    { heading: "Managing Newark revisions", body: "A dated comment matrix should connect each correction, substitution, RFI, and field discovery to the affected sheet and responsible review. Reissue a sealed sheet when the defined technical scope changes." },
  ],
  permitSteps: [
    "Identify Newark’s enforcing office, occupancy, current UCC route, discipline limits, outside reviews, and the seal requirements applicable to the drawings.",
    "Assemble survey, field observations, soils, flood, utility, calculations, design criteria, and consultant boundaries for the specific Newark scope.",
    "Have the responsible New Jersey PE review notes, details, schedules, calculations, and coordination with architecture, fire, civil, and MEP work.",
    "Route Newark corrections and construction changes back to that professional and issue revised sealed sheets only for reviewed changes.",
  ],
  faqs: [
    { question: "Does a Newark PE seal replace a zoning approval?", answer: "No. The seal addresses the defined professional scope; Newark zoning, construction, fire, historic, utility, and other agencies retain their own decisions." },
    { question: "What if Newark’s existing conditions cannot be fully opened?", answer: "The responsible professional should identify the observation limit, use conservative and supportable assumptions, and state what must be verified during construction." },
    { question: "Are contractor substitutions covered by a Newark seal?", answer: "Not automatically. A substitution affecting sealed work should be evaluated by the responsible professional and documented through the applicable revision or response process." },
  ],
  sources: [...newarkSources, ...stateSources],
};

const jerseyCityStructural: Batch2CoreServicePage = {
  serviceSlug: "structural-engineering",
  title: "Jersey City structural engineering for waterfront sites",
  description: "Structural design for Jersey City towers, brownfield reuse, and additions with filled ground, flood exposure, wind, and dense utility coordination.",
  h1: "Structural Engineering for Jersey City, New Jersey",
  kicker: "Load paths for filled waterfront blocks and older buildings",
  lede: "Jersey City structural design must distinguish tower, brownfield, and low-rise conditions while tracking wind, flood elevation, foundation evidence, and occupied-neighbor risks.",
  permitAuthority: "Jersey City Division of Construction Code is the local construction authority; Planning, zoning, fire, historic, public works, JCMUA, county, and waterfront agencies may have separate reviews.",
  codeContext: "Confirm the current New Jersey UCC subcodes, high-rise or rehabilitation provisions, flood requirements, zoning envelope, and Jersey City intake requirements for the address.",
  localConditions: "Hudson River and Newark Bay surge, filled waterfront soils, high groundwater, salt exposure, wind, deep foundations, and narrow rights-of-way shape the structural record.",
  projectTypes: "High-rise fit-outs, mixed-use conversions, brownfield redevelopment, waterfront additions, podium alterations, and ADUs only where zoning and building conditions allow.",
  sections: [
    { heading: "Existing structure in Jersey City", body: "Tower slabs, podium transfers, old rowhouses, industrial frames, and prior façade or MEP openings require different investigations. Verify load paths, fire-rated assemblies, anchors, and construction sequencing before adding equipment or floor area." },
    { heading: "Filled ground and flood elevation", body: "Foundation design should use project-specific geotechnical information, groundwater observations, flood data, and adjacent-building constraints. Salt exposure and flood-resistant material decisions should be coordinated with civil and envelope details." },
    { heading: "Responding to city review", body: "Tie each Division of Construction Code comment to a revised calculation, connection, detail, or structural note. In a dense block, shoring, vibration, party walls, egress openings, and MEP penetrations belong in the response record." },
  ],
  permitSteps: [
    "Confirm Jersey City jurisdiction, occupancy, current UCC and high-rise provisions, flood and zoning triggers, and any historic or waterfront review.",
    "Obtain survey, geotechnical data, existing-structure observations, flood elevations, adjacent-condition information, and rooftop or equipment loads.",
    "Coordinate foundations, transfers, anchors, shoring, special inspections, fire assemblies, construction sequencing, and discipline penetrations.",
    "Track every Jersey City correction in a dated matrix, revise connected calculations, and obtain responsible-PE review before resubmission.",
  ],
  faqs: [
    { question: "Why is filled ground important to a Jersey City addition?", answer: "Variable fill, groundwater, settlement, and nearby foundations can affect footing feasibility, underpinning, excavation, and the load path; geotechnical evidence should control." },
    { question: "Do waterfront Jersey City projects use a single flood elevation?", answer: "No. The applicable flood map, datum, site elevation, building use, and current code provisions must be checked for the parcel and design." },
    { question: "How should a Jersey City high-rise tenant comment be answered?", answer: "Show the affected floor or shaft, calculation or equipment load, fire and egress coordination, and revised sheet rather than answering only in general notes." },
  ],
  sources: [...jerseyCitySources, ...stateSources],
};

const jerseyCityMep: Batch2CoreServicePage = {
  serviceSlug: "mep-engineering",
  title: "Jersey City MEP engineering for high-rise fit-outs",
  description: "Jersey City MEP design for high-rise fit-outs, mixed-use conversions, additions, and permitted ADUs with utility and flood coordination.",
  h1: "MEP Engineering for Jersey City, New Jersey",
  kicker: "High-rise systems, utility capacity, and flood-aware routing",
  lede: "Jersey City MEP work has to fit existing risers, vertical transportation, utility service, life-safety systems, and flood or salt conditions for the actual occupancy.",
  permitAuthority: "Jersey City Division of Construction Code reviews the UCC scope, with fire, zoning, Planning, JCMUA, public works, county, and utility reviews potentially separate.",
  codeContext: "Confirm New Jersey mechanical, electrical, plumbing, energy, fire, high-rise, accessibility, and flood provisions with the local enforcing agency before equipment is selected.",
  localConditions: "Tall buildings, limited shafts, high groundwater, salt air, constrained curb access, older utility rooms, and shared domestic or fire systems affect design and phasing.",
  projectTypes: "Office and residential fit-outs, restaurant conversions, mixed-use rehabilitation, waterfront additions, central-plant modifications, and zoning-compliant accessory dwellings.",
  sections: [
    { heading: "Jersey City risers and capacity", body: "Survey panels, transformers, domestic-water risers, sanitary stacks, fire pumps, ventilation shafts, and controls before connecting a new tenant. A building’s nominal service size does not prove spare capacity at the proposed floor." },
    { heading: "Flood-aware equipment and routing", body: "Locate critical equipment, backflow devices, condensate, electrical distribution, and controls using verified elevations and flood criteria. Coordinate JCMUA connection information with fire and energy requirements instead of treating the basement as an unrestricted equipment room." },
    { heading: "High-rise corrections in one record", body: "A ventilation, load, or fire-interface comment can affect shaft dimensions, structure, acoustics, energy forms, and egress. Revise the riser, schedule, calculation, and linked architectural sheets together." },
  ],
  permitSteps: [
    "Confirm Jersey City’s UCC, high-rise, energy, fire, and occupancy paths, then identify JCMUA, public-works, utility, and flood interfaces.",
    "Field-trace existing risers and request written electric, gas, water, sewer, fire-flow, and central-system information for the proposed scope.",
    "Coordinate equipment, shafts, ventilation, controls, condensate, flood protection, clearances, shutdowns, and maintenance access with all disciplines.",
    "Return numbered Jersey City comments with updated loads, risers, schedules, calculations, and provider correspondence.",
  ],
  faqs: [
    { question: "Can a Jersey City tenant improvement assume riser capacity from a landlord letter?", answer: "A letter can provide useful information, but the design still needs project loads, verified connection points, and AHJ or utility requirements." },
    { question: "What changes when MEP equipment is below a Jersey City flood elevation?", answer: "The design may need elevation, protection, anchorage, materials, access, and emergency-operation decisions consistent with current flood and code requirements." },
    { question: "Does an ADU in Jersey City use the same MEP review as a tower fit-out?", answer: "No. The occupancy, zoning route, existing service, fire separation, and local checklist determine its documents; do not transfer a high-rise assumption to a dwelling." },
  ],
  sources: [...jerseyCitySources, ...stateSources],
};

const jerseyCityCivil: Batch2CoreServicePage = {
  serviceSlug: "civil-engineering",
  title: "Jersey City civil engineering for waterfront sites",
  description: "Civil plans for Jersey City grading, flood elevations, public frontage, utilities, access, and redevelopment review.",
  h1: "Civil Engineering for Jersey City, New Jersey",
  kicker: "Flood-conscious site and utility coordination",
  lede: "A Jersey City civil package must connect a dense parcel to public streets, JCMUA systems, drainage, fire access, and flood information without hiding the grade constraints.",
  permitAuthority: "Jersey City Planning and Division of Construction Code are separate from JCMUA, Public Works, Hudson County, NJDEP, flood, and right-of-way authorities.",
  codeContext: "Screen Jersey City zoning, site-plan, stormwater, flood-hazard, soil-erosion, frontage, utility, and New Jersey UCC requirements for the proposed disturbance.",
  localConditions: "Waterfront surge, filled ground, shallow groundwater, nearly flat grades, limited curb cuts, combined or regional sewer interfaces, and dense utility corridors control site design.",
  projectTypes: "Brownfield redevelopment, tower and podium sites, parking changes, waterfront additions, mixed-use conversions, and small residential accessory work where permitted.",
  sections: [
    { heading: "A parcel-to-street record", body: "Use a current survey to show curb and sidewalk grades, easements, utility structures, fire access, accessible routes, flood datum, proposed finished floors, and the actual public connection. A site plan should not infer a drainage route from a nearby inlet." },
    { heading: "Water, soil, and public systems", body: "Filled soils and high groundwater can limit infiltration and influence excavation, retaining, and utility bedding. Coordinate JCMUA capacity and connection criteria with stormwater, flood, NJDEP, and county or waterfront conditions." },
    { heading: "Residential changes are not invisible", body: "An addition or ADU may change roof runoff, parking, access, utilities, and finished-floor relationships. Document those effects even when a project does not create a new lot or public street." },
  ],
  permitSteps: [
    "Confirm Jersey City Planning, Engineering, JCMUA, Public Works, county, NJDEP, flood, soil-erosion, and right-of-way review thresholds.",
    "Verify survey datum, flood information, groundwater or soil assumptions, existing utilities, easements, outfalls, finished floors, and receiving-system ownership.",
    "Prepare grading, drainage, utility, fire-access, accessible-route, frontage, erosion, and maintenance details coordinated with the building set.",
    "Respond to each Jersey City correction with revised contours, profiles, calculations, utility notes, and a clear agency dependency.",
  ],
  faqs: [
    { question: "Does a Jersey City rooftop addition require civil work?", answer: "It may if drainage, finished-floor or flood information, access, utility service, or public-way conditions change; the local scope checklist controls." },
    { question: "Can filled Jersey City ground be assumed infiltrating?", answer: "No. Infiltration, groundwater, contamination, and fill characteristics require project-specific evidence and an accepted stormwater approach." },
    { question: "Who reviews a Jersey City sewer connection?", answer: "JCMUA and other applicable municipal, county, NJDEP, or utility authorities may review different aspects; identify ownership and connection requirements from current official records." },
  ],
  sources: [...jerseyCitySources, ...stateSources],
};

const jerseyCityEnergy: Batch2CoreServicePage = {
  serviceSlug: "energy-compliance",
  title: "Jersey City energy compliance for high-rise alterations",
  description: "Jersey City energy documentation for glazing, envelope, HVAC, lighting, controls, and flood-aware equipment coordination.",
  h1: "Energy Compliance for Jersey City, New Jersey",
  kicker: "Coordinated energy records for towers and conversions",
  lede: "Jersey City energy work must classify the alteration and reconcile tower envelope limits, shared systems, high-rise ventilation, and the current New Jersey energy subcode.",
  permitAuthority: "Jersey City Division of Construction Code confirms the UCC energy path; Planning, historic, fire, utility, and flood authorities may impose separate conditions.",
  codeContext: "Use the current New Jersey UCC energy subcode and an AHJ-accepted method for the specific occupancy, alteration category, high-rise system, and permit submission.",
  localConditions: "High glazing ratios, tower curtain walls, shaded streets, shared central plants, salt air, flood-sensitive lower floors, and limited façade access affect inputs.",
  projectTypes: "High-rise tenant improvements, mixed-use conversions, curtain-wall alterations, apartment renovations, additions, and permitted ADU or accessory-use work.",
  sections: [
    { heading: "Envelope evidence in a Jersey City tower", body: "Identify curtain-wall, slab-edge, spandrel, window, roof, air-barrier, and party-wall conditions that the selected method actually models. A tenant fit-out should not silently change the base-building envelope assumptions." },
    { heading: "Shared HVAC and controls", body: "Energy documents should agree with central-plant capacity, ventilation, heat recovery, lighting, controls, service water, and equipment locations. Flood or salt exposure can affect where equipment and electrical controls are placed." },
    { heading: "Plan-check corrections with traceability", body: "When a reviewer changes glazing, lighting, HVAC, or control inputs, cite the requirement, update the form or model, revise MEP and architectural sheets, and note the responsibility for field verification." },
  ],
  permitSteps: [
    "Confirm Jersey City’s current energy subcode, accepted method, alteration category, high-rise inputs, climate data, and required forms.",
    "Collect verified envelope, glazing, shared-system, HVAC, ventilation, lighting, service-water, and control information from the base building and fit-out design.",
    "Cross-check energy inputs against flood elevations, fire separations, structural penetrations, equipment schedules, and architectural details.",
    "Submit a numbered response to every energy correction with its citation, changed input, updated form, and affected Jersey City drawing.",
  ],
  faqs: [
    { question: "Does a Jersey City tenant fit-out remodel the whole tower energy model?", answer: "Not necessarily. The applicable alteration path and scope determine the required boundary, but base-building systems and affected loads must still be represented accurately." },
    { question: "How do shared central systems affect Jersey City compliance?", answer: "Their capacity, controls, ventilation, metering, and proposed tenant loads should agree across the energy record and MEP drawings; a generic equipment efficiency value is insufficient." },
    { question: "Can a Jersey City energy correction ignore a curtain-wall change?", answer: "No. A changed window, spandrel, shading, or air-barrier assumption should flow through the selected method and every affected architectural and mechanical detail." },
  ],
  sources: [...jerseyCitySources, ...stateSources],
};

const jerseyCityStamped: Batch2CoreServicePage = {
  serviceSlug: "pe-stamped-drawings",
  title: "Jersey City PE-stamped drawings for dense urban approvals",
  description: "Jersey City sealed engineering sets defining discipline scope, waterfront evidence, code coordination, and revisions.",
  h1: "PE-Stamped Drawings for Jersey City, New Jersey",
  kicker: "Responsible-charge documentation for complex urban sites",
  lede: "A Jersey City seal should identify the exact parcel, discipline, design criteria, evidence, and limitations reviewed; it does not replace a city, utility, flood, or zoning decision.",
  permitAuthority: "Jersey City Division of Construction Code retains construction approval, with Planning, fire, JCMUA, public works, county, historic, and waterfront agencies operating within their own authorities.",
  codeContext: "Document the current New Jersey UCC path, occupancy, high-rise or rehabilitation provisions, flood and zoning triggers, discipline boundary, and applicable New Jersey seal requirements.",
  localConditions: "Filled waterfront soils, high groundwater, neighboring towers, shared systems, public-way constraints, and occupied construction make consultant boundaries and field evidence material.",
  projectTypes: "Tower fit-outs, structural alterations, civil redevelopment packages, MEP modifications, additions, and zoning-compliant residential accessory projects.",
  sections: [
    { heading: "Scope and evidence for Jersey City", body: "List the address, survey, flood and geotechnical inputs, existing-condition observations, calculations, sheets, exclusions, and professional discipline. Distinguish verified facts from information supplied by an owner or contractor." },
    { heading: "Separating agency responsibilities", body: "A PE can coordinate JCMUA, utility, flood, public-works, fire, and planning information without presenting a seal as approval from those authorities. Record unresolved dependencies on the cover or response matrix." },
    { heading: "Sealed revisions after plan check", body: "For each Jersey City comment, identify the affected sheet and technical decision. Review substitutions, RFIs, and field discoveries through the responsible professional and reissue only the scope that changed." },
  ],
  permitSteps: [
    "Identify Jersey City’s enforcing authority, occupancy, current UCC route, high-rise or flood triggers, discipline limits, and seal format.",
    "Assemble survey, soils, flood, utility, field, design-criteria, calculation, and consultant-boundary records for the address.",
    "Have the responsible PE review the coordinated drawings, notes, schedules, calculations, and interfaces with fire, architecture, civil, and MEP work.",
    "Route Jersey City corrections and construction changes through that professional and issue revised sealed sheets when technically required.",
  ],
  faqs: [
    { question: "Does a Jersey City PE seal approve a waterfront site plan?", answer: "No. The seal identifies responsibility for a defined engineering scope; city, planning, utility, flood, county, and environmental authorities decide their own approvals." },
    { question: "What should a Jersey City sealed set say about flood data?", answer: "It should identify the source, datum, design assumption, finished-floor relationship, limitations, and any separate flood or environmental review needed for the scope." },
    { question: "Can a base-building engineer’s seal cover a tenant alteration?", answer: "Only if that professional has reviewed and accepted responsibility for the defined alteration. Scope, discipline, and revision responsibility should be explicit." },
  ],
  sources: [...jerseyCitySources, ...stateSources],
};

const patersonStructural: Batch2CoreServicePage = {
  serviceSlug: "structural-engineering",
  title: "Paterson structural engineering for mills and older housing",
  description: "Paterson structural design for historic mills, masonry housing, and additions coordinated with river flood and steep urban grades.",
  h1: "Structural Engineering for Paterson, New Jersey",
  kicker: "Masonry, mill, and flood-aware structural records",
  lede: "Paterson structural work begins by separating historic mill fabric, old masonry, and later alterations before a new opening, floor, or residential addition is designed.",
  permitAuthority: "Paterson construction code is the local UCC contact; planning, historic, zoning, fire, engineering, public works, county, and flood reviews may be separate.",
  codeContext: "Confirm current New Jersey UCC subcodes, rehabilitation and historic requirements, flood provisions, occupancy, and Paterson plan-review procedure for the address.",
  localConditions: "Passaic River floodplain, steep urban grades, old mill masonry, dense fill, freeze-thaw, combined sewers, and narrow access can control foundations and temporary works.",
  projectTypes: "Historic mill reuse, multifamily rehabilitation, storefront conversions, rowhouse additions, river-area redevelopment, and ADUs where zoning permits.",
  sections: [
    { heading: "Reading Paterson’s old masonry", body: "Mill walls, heavy timber, brick arches, irregular foundations, and infilled openings need observation of cracks, bearing, connections, and moisture damage. Historic fabric may constrain strengthening details and construction access." },
    { heading: "River and grade transitions", body: "Passaic flood information, steep streets, retaining conditions, groundwater, and freeze-thaw should be coordinated with survey and geotechnical records. A neighboring wall or low floor can make an apparently small addition a temporary-works project." },
    { heading: "A correction record for older buildings", body: "Paterson comments should cite the revised calculation, detail, historic interface, and construction note. Carry beam pockets, egress openings, fire separations, and MEP penetrations through the complete resubmission." },
  ],
  permitSteps: [
    "Confirm Paterson jurisdiction, occupancy, current UCC route, historic and flood triggers, zoning, and whether county or public-way review is needed.",
    "Document framing, masonry, foundation, retaining, flood, soil, and adjacent-building conditions with survey and appropriate field or geotechnical evidence.",
    "Coordinate strengthening, shoring, connections, egress openings, fire-rated construction, special inspections, and discipline penetrations.",
    "Answer each Paterson correction in a dated matrix, revise calculations and sheets, and obtain responsible-PE review before resubmission.",
  ],
  faqs: [
    { question: "Can Paterson mill masonry be evaluated from historic drawings alone?", answer: "No. Historic drawings help establish context, but current wall condition, connections, loads, moisture, and alterations require field evidence within the professional scope." },
    { question: "Does a Paterson river parcel always need a new foundation?", answer: "The need depends on added loads, existing capacity, flood and groundwater conditions, soil information, and the project’s foundation or elevation changes." },
    { question: "What makes an older Paterson addition difficult to coordinate?", answer: "Irregular framing, party walls, egress and fire separation, constrained staging, utility penetrations, and a changed drainage or flood relationship can all cross discipline boundaries." },
  ],
  sources: [...patersonSources, ...stateSources],
};

const patersonMep: Batch2CoreServicePage = {
  serviceSlug: "mep-engineering",
  title: "Paterson MEP engineering for mill reuse and housing",
  description: "Paterson HVAC, electrical, plumbing, and ventilation design for mill conversions, multifamily work, and residential additions.",
  h1: "MEP Engineering for Paterson, New Jersey",
  kicker: "Modern systems in historic and river-adjacent buildings",
  lede: "Paterson MEP design has to fit new life-safety and comfort systems through old mills, rowhouses, and compact utility corridors while respecting the actual occupancy.",
  permitAuthority: "Paterson construction code handles local UCC intake; planning, fire, historic, public works, water or sewer providers, county, and utility reviews may be separate.",
  codeContext: "Confirm current New Jersey mechanical, electrical, plumbing, energy, fire, rehabilitation, accessibility, and flood provisions with the Paterson enforcing official.",
  localConditions: "High-ceiling mills, old service entrances, combined sewer constraints, humid summers, winter freeze, flood-sensitive basements, and limited shafts affect routing and phasing.",
  projectTypes: "Mill tenant improvements, multifamily rehabilitation, restaurants, storefront work, rowhouse additions, and ADUs where Paterson zoning allows them.",
  sections: [
    { heading: "Tracing systems through Paterson buildings", body: "Verify electrical services, old risers, water pressure, sanitary stacks, boiler rooms, exhaust paths, and available shafts. Mill reuse often exposes abandoned equipment and undocumented penetrations that affect fire and energy documents." },
    { heading: "Plumbing and ventilation at low floors", body: "River proximity and low basements make backflow, condensate, equipment elevation, combustion safety, and sewer connection details important. Coordinate public-works and sewer information with field elevations rather than copying a typical detail." },
    { heading: "Plan-check corrections without fragments", body: "A revised exhaust fan can change shaft fire rating, roof structure, energy inputs, and noise details. Answer Paterson comments with updated schedules, risers, load calculations, and linked architectural or structural sheets." },
  ],
  permitSteps: [
    "Confirm Paterson occupancy and current mechanical, electrical, plumbing, energy, fire, rehabilitation, and flood review paths.",
    "Field-trace existing systems and request electric, gas, water, sewer, and fire-flow information from the applicable providers or authority.",
    "Resolve Paterson equipment rooms, shafts, exhaust, condensate, flood protection, controls, clearances, shutdown sequencing, and service access on the coordinated set.",
    "Return numbered Paterson corrections with revised risers, schedules, calculations, details, and utility correspondence.",
  ],
  faqs: [
    { question: "Why can a Paterson mill conversion need new service calculations?", answer: "New occupancy, cooking, ventilation, sprinklers, electric equipment, and domestic-water demand can exceed legacy assumptions even when an old service remains energized." },
    { question: "What should be checked before using an old Paterson boiler room?", answer: "Verify equipment condition, combustion air, venting, clearances, fuel service, flood exposure, access, and the current code path with the responsible disciplines." },
    { question: "Can a Paterson correction response leave the fire-rated shaft unchanged?", answer: "Only if the revised system truly leaves the shaft and penetrations unchanged. Any affected fire, structural, energy, or architectural detail should be updated." },
  ],
  sources: [...patersonSources, ...stateSources],
};

const patersonCivil: Batch2CoreServicePage = {
  serviceSlug: "civil-engineering",
  title: "Paterson civil engineering for river corridors",
  description: "Paterson civil plans for grading, flood coordination, utilities, access, erosion, and redevelopment around the Passaic River.",
  h1: "Civil Engineering for Paterson, New Jersey",
  kicker: "River, retaining, and public-street coordination",
  lede: "Paterson civil work connects old parcels and steep streets to public drainage, sewer, fire access, and flood information with survey-based grades.",
  permitAuthority: "Paterson construction and planning reviews are distinct from Public Works, county engineering, Passaic Valley Sewerage Commission, NJDEP, flood, and right-of-way authorities.",
  codeContext: "Screen Paterson zoning, site-plan, stormwater, flood-hazard, soil-erosion, frontage, utility, and New Jersey UCC requirements for the scope and disturbance.",
  localConditions: "Passaic River floodplain, steep grades, dense fill, old retaining walls, constrained combined sewers, narrow streets, and freeze-thaw affect drainage and access.",
  projectTypes: "Mill redevelopment, multifamily rehabilitation, storefront conversions, hillside additions, residential ADUs where allowed, and river-area site work.",
  sections: [
    { heading: "Surveying Paterson’s steep public edge", body: "Record curb and sidewalk grades, retaining, alleys, inlets, manholes, easements, fire access, accessible routes, and flood datum. An apparent lot-level drainage fix can send water toward a lower neighbor or public street." },
    { heading: "Passaic flood and receiving systems", body: "Finished floors, outfalls, groundwater, sewer capacity, erosion, and maintenance need to be checked against official flood and utility information. Do not infer a PVSC or municipal connection from a nearby cover." },
    { heading: "Addition-scale civil obligations", body: "A new roof, driveway, ADU, retaining wall, or patio can change runoff, access, sewer flow, and easements. Show the changes and answer each Paterson engineering comment with revised profiles, contours, and details." },
  ],
  permitSteps: [
    "Confirm Paterson planning, engineering, Public Works, sewer, county, NJDEP, flood, soil-erosion, and right-of-way requirements for the address.",
    "Verify survey control, retaining and slope conditions, flood elevation, utilities, outfalls, sewer ownership, finished floors, easements, and soil assumptions.",
    "Coordinate grading, drainage, retaining, fire access, accessible routes, utilities, erosion controls, and maintenance notes with the building package.",
    "Resubmit revised Paterson contours, profiles, calculations, details, and utility records for every agency correction.",
  ],
  faqs: [
    { question: "Can a Paterson hillside addition drain toward the existing street inlet?", answer: "Only after grades, inlet ownership, capacity, right-of-way rules, erosion, and downstream conditions are verified with the responsible authorities." },
    { question: "Does a Paterson ADU need a sewer-flow review?", answer: "It may when occupancy, fixtures, connection, or site grades change. The local and sewer-agency checklist determines the required analysis." },
    { question: "What does a Passaic flood comment belong to?", answer: "The response should identify the cited flood source or requirement, datum and elevation, affected grading or building sheet, and any separate NJDEP or local review." },
  ],
  sources: [...patersonSources, ...stateSources],
};

const patersonEnergy: Batch2CoreServicePage = {
  serviceSlug: "energy-compliance",
  title: "Paterson energy compliance for historic rehabilitation",
  description: "Paterson energy documentation for masonry, mills, multifamily rehabilitation, HVAC, lighting, and additions under the New Jersey energy subcode.",
  h1: "Energy Compliance for Paterson, New Jersey",
  kicker: "Practical energy records for old masonry and mills",
  lede: "Paterson energy compliance must classify the rehabilitation and document what can actually be changed in a mill, rowhouse, or multifamily building.",
  permitAuthority: "Paterson construction code confirms the local UCC energy path; planning, historic, fire, utility, and flood reviews may set additional conditions.",
  codeContext: "Use the current New Jersey UCC energy subcode and accepted compliance method for the occupancy, alteration category, rehabilitation limits, and Paterson intake.",
  localConditions: "Thick masonry, historic windows, high-ceiling industrial shells, damp lower levels, shaded streets, old boilers, and flood-sensitive equipment affect assemblies and inputs.",
  projectTypes: "Historic mill reuse, rowhouse renovation, multifamily envelope work, storefront conversions, additions, and zoning-compliant ADUs.",
  sections: [
    { heading: "Documenting old Paterson assemblies", body: "Identify masonry thickness, windows, roof and floor assemblies, air leakage, insulation access, and moisture conditions. Historic retention or hazardous-material constraints may limit an otherwise simple insulation detail." },
    { heading: "Equipment has to match the building", body: "Energy forms should agree with mill-height spaces, ventilation, heating plant, cooling, lighting, controls, service water, and flood-aware equipment placement. Coordinate fire and structural penetrations with the modeled assemblies." },
    { heading: "Corrections for rehabilitation scopes", body: "When Paterson requests a revised U-value, window, HVAC, or lighting input, cite the applicable route, update forms and construction details, and state where an existing condition still needs field confirmation." },
  ],
  permitSteps: [
    "Confirm Paterson’s current energy subcode, rehabilitation or historic alteration category, accepted method, forms, and required coordination.",
    "Collect verified masonry, window, roof, floor, air-sealing, HVAC, ventilation, lighting, controls, and service-water data.",
    "Check energy inputs against fire-rated construction, structural penetrations, equipment schedules, flood conditions, and architectural details.",
    "Answer each Paterson energy correction with its citation, changed input or form, revised sheet, and field-responsibility note.",
  ],
  faqs: [
    { question: "Can a Paterson historic mill use the same envelope path as new construction?", answer: "Not necessarily. The accepted method and alteration or historic constraints determine which existing and proposed assemblies must be documented." },
    { question: "How should a thick Paterson masonry wall be entered?", answer: "Use verified dimensions and the selected method’s treatment of existing masonry, while identifying inaccessible or moisture-sensitive conditions rather than inventing insulation." },
    { question: "Does replacing a Paterson boiler require energy resubmission?", answer: "It can when equipment efficiency, fuel, controls, distribution, ventilation, or loads change. Update the affected compliance and MEP records together." },
  ],
  sources: [...patersonSources, ...stateSources],
};

const patersonStamped: Batch2CoreServicePage = {
  serviceSlug: "pe-stamped-drawings",
  title: "Paterson PE-stamped drawings for rehabilitation permits",
  description: "Paterson sealed engineering documents defining historic-building scope, river and soil evidence, and correction responsibility.",
  h1: "PE-Stamped Drawings for Paterson, New Jersey",
  kicker: "Clear professional responsibility for old-building work",
  lede: "A Paterson sealed package should make the historic, flood, structural, civil, or MEP scope legible without suggesting that a seal guarantees construction-code approval.",
  permitAuthority: "Paterson construction code decides its UCC review; planning, historic, fire, Public Works, sewer, county, flood, and environmental agencies retain separate responsibilities.",
  codeContext: "Identify current New Jersey UCC subcodes, occupancy, rehabilitation and historic triggers, flood criteria, discipline boundaries, and the applicable professional seal format.",
  localConditions: "Mill masonry, older rowhouses, river elevations, steep grades, filled ground, occupied renovation, and constrained public access make scope limits significant.",
  projectTypes: "Mill conversions, multifamily rehabilitation, structural openings, civil river-site packages, MEP upgrades, additions, and permitted ADU work.",
  sections: [
    { heading: "A Paterson scope that can be audited", body: "List the address, existing-condition observations, survey and soil sources, flood information, calculations, code path, sheets, exclusions, and professional discipline. Mark assumptions that need opening or field confirmation." },
    { heading: "Historic and agency interfaces", body: "A PE may coordinate historic, fire, utility, sewer, flood, and planning records, but the sealed engineering scope should not claim those authorities’ identities or approvals. Preserve their comments and conditions separately." },
    { heading: "Responsible revisions", body: "Use a Paterson comment matrix for plan-check corrections, substitutions, RFIs, and discovered masonry or foundation conditions. The responsible PE should decide whether the sealed scope or sheets change." },
  ],
  permitSteps: [
    "Identify Paterson’s enforcing office, occupancy, UCC and rehabilitation path, historic or flood triggers, discipline boundary, and seal requirements.",
    "Assemble survey, observations, masonry or framing evidence, soil and flood data, utility records, calculations, and consultant boundaries.",
    "Have the responsible New Jersey PE review the coordinated drawings, details, notes, schedules, calculations, and historic or fire interfaces.",
    "Route Paterson corrections and field changes back through that professional and issue revised sealed sheets for changed technical scope.",
  ],
  faqs: [
    { question: "Does a Paterson PE seal approve a historic conversion?", answer: "No. It identifies responsibility for a defined professional scope. Paterson and separate planning, historic, fire, utility, flood, and environmental authorities decide their reviews." },
    { question: "How are unknown mill conditions handled in a sealed set?", answer: "State the observation limits, design assumptions, required probes or verification, and the process for a field condition that differs from the record." },
    { question: "Can one Paterson seal cover structural and civil work?", answer: "Only when the responsible professional is qualified and accepting responsibility for both defined disciplines as required. Discipline scope should be explicit rather than implied." },
  ],
  sources: [...patersonSources, ...stateSources],
};

const edisonStructural: Batch2CoreServicePage = {
  serviceSlug: "structural-engineering",
  title: "Edison structural engineering for additions and infill",
  description: "Structural design for Edison additions, warehouses, and multifamily work with variable soils, drainage, and township review.",
  h1: "Structural Engineering for Edison, New Jersey",
  kicker: "Verified foundations for changing suburban sites",
  lede: "Edison structural design should test the assumptions behind a familiar suburban building, especially when an addition, warehouse conversion, or ADU changes loads and drainage.",
  permitAuthority: "Edison Township Building Department is the local construction contact; zoning, planning, Public Works, Middlesex County, utilities, and flood agencies may review separate issues.",
  codeContext: "Confirm current New Jersey UCC subcodes, occupancy, alteration provisions, zoning setbacks, flood requirements, and Edison permit documentation before final design.",
  localConditions: "Raritan lowlands, glacial and alluvial soils, high groundwater, snow, humid summers, large parcels, and phased suburban access can affect foundations and temporary works.",
  projectTypes: "Office and warehouse conversions, multifamily work, detached additions, commercial infill, residential ADUs where allowed, and rooftop equipment.",
  sections: [
    { heading: "Existing Edison framing is not generic", body: "Tract framing, tilt-up or warehouse systems, prior tenant openings, rooftop units, and additions require different observations. Verify load paths, foundations, slab conditions, and connections before using a standard detail." },
    { heading: "Soil, drainage, and new load paths", body: "Glacial or alluvial variability, groundwater, floodplain edges, and new grading can affect footing elevations, retaining, slab support, and uplift. Coordinate geotechnical, civil, and finished-floor information with the structural criteria." },
    { heading: "Township correction control", body: "Tie each Edison comment to a revised calculation, plan, section, or connection. A small addition can alter headers, diaphragm continuity, egress, fire separation, MEP openings, and roof drainage at once." },
  ],
  permitSteps: [
    "Confirm Edison jurisdiction, occupancy, current UCC subcodes, zoning and setback constraints, flood criteria, and any county or public-way review.",
    "Obtain survey, framing and foundation observations, soil or groundwater recommendations, flood information, equipment loads, and construction-sequence needs.",
    "Coordinate foundations, connections, retaining, shoring, openings, special inspections, fire separations, and civil grades in one permit set.",
    "Track Edison comments, cloud revisions, update connected calculations, and obtain responsible-PE review before resubmission.",
  ],
  faqs: [
    { question: "Does an Edison detached addition need geotechnical information?", answer: "The scope depends on loads, soil variability, fill, groundwater, flood exposure, and the AHJ or professional’s needed evidence; a neighboring lot is not a substitute." },
    { question: "Why can a warehouse conversion need structural review?", answer: "New occupancy, storage or equipment loads, roof units, openings, fire protection, and altered diaphragms can change the original design assumptions." },
    { question: "What should an Edison correction matrix identify?", answer: "It should identify the township comment, code or checklist reference, revised drawing or calculation, unresolved field dependency, and the professional responsible for the technical response." },
  ],
  sources: [...edisonSources, ...stateSources],
};

const edisonMep: Batch2CoreServicePage = {
  serviceSlug: "mep-engineering",
  title: "Edison MEP engineering for office and warehouse work",
  description: "Edison MEP design for suburban conversions, multifamily work, and additions with utility, fire, water, sewer, and energy coordination.",
  h1: "MEP Engineering for Edison, New Jersey",
  kicker: "Utility and equipment planning for changing occupancies",
  lede: "Edison MEP documentation should establish service capacity, water and sewer facts, ventilation, and equipment access before a suburban conversion is drawn as plug-and-play.",
  permitAuthority: "Edison Building Department handles local construction-code intake; Planning, Public Works, Middlesex County, fire, utility, and flood reviews may be distinct.",
  codeContext: "Confirm the New Jersey mechanical, electrical, plumbing, energy, fire, accessibility, and rehabilitation provisions adopted for the Edison occupancy and alteration.",
  localConditions: "Large sites can hide long utility runs, high groundwater, flood-prone lowlands, winter heating demand, summer cooling loads, and phased occupied access.",
  projectTypes: "Office-to-commercial conversions, warehouses, multifamily renovations, additions, detached ADUs where zoning permits, and rooftop equipment replacements.",
  sections: [
    { heading: "Capacity before Edison equipment schedules", body: "Verify service equipment, transformer or feeder information, water pressure, sewer connection, fire-flow, gas availability, shafts, and controls. A large parcel’s utility availability does not prove capacity at the building." },
    { heading: "Suburban routing and weather", body: "Coordinate long site utilities, condensate, freeze protection, outdoor-air intakes, roof access, flood-aware equipment locations, and maintenance paths. Include the actual occupancy rather than borrowing a warehouse or office load." },
    { heading: "Additions and ADUs change systems", body: "An Edison addition can change panel demand, water and sewer flow, HVAC zoning, egress, fire separation, and energy forms. Draw those interfaces so plan check can evaluate one coherent system." },
  ],
  permitSteps: [
    "Confirm Edison’s UCC, fire, energy, occupancy, zoning, flood, utility, and county review paths for the proposed use.",
    "Field-trace existing systems and obtain written electric, gas, water, sewer, and fire-flow information from the applicable providers.",
    "Coordinate loads, risers, ventilation, equipment clearances, condensate, controls, flood protection, shutdowns, and accessible maintenance.",
    "Answer Edison corrections with revised schedules, load calculations, risers, details, and utility correspondence tied to the comment numbers.",
  ],
  faqs: [
    { question: "Can an Edison office conversion reuse warehouse electrical capacity?", answer: "Only after the proposed demand, distribution, emergency systems, utility data, and AHJ requirements are checked; service size alone is not a capacity study." },
    { question: "What should an Edison ADU utility review consider?", answer: "Panel and service load, water pressure, sewer flow and connection, HVAC, fire separation, access, and the current zoning and construction-code route should all be evaluated." },
    { question: "Why include flood information in Edison MEP drawings?", answer: "Lowland or groundwater conditions can affect equipment elevation, electrical protection, backflow, condensate, and service routing even when the building is inland." },
  ],
  sources: [...edisonSources, ...stateSources],
};

const edisonCivil: Batch2CoreServicePage = {
  serviceSlug: "civil-engineering",
  title: "Edison civil engineering for drainage and redevelopment",
  description: "Edison grading, stormwater, utility, fire-access, and flood coordination for suburban infill and commercial conversions.",
  h1: "Civil Engineering for Edison, New Jersey",
  kicker: "Parcel-scale drainage and utility evidence",
  lede: "Edison civil design looks beyond a broad parcel boundary to drainage, frontage, utilities, fire access, and the receiving system that a new building will actually use.",
  permitAuthority: "Edison Planning and Building are distinct from Public Works, Middlesex County engineering, utility providers, NJDEP, flood, and right-of-way authorities.",
  codeContext: "Confirm Edison zoning and site-plan rules, stormwater and soil-erosion thresholds, flood-hazard requirements, county frontage rules, utilities, and UCC site interfaces.",
  localConditions: "Raritan lowlands, alluvial or glacial soils, high groundwater, wooded drainage paths, large parking fields, and phased access affect grading and outfall design.",
  projectTypes: "Warehouse and office conversions, commercial infill, multifamily additions, detached ADUs where permitted, parking changes, and redevelopment parcels.",
  sections: [
    { heading: "Surveying a large Edison parcel", body: "Show drainage divides, wetlands or flood constraints as applicable, curb cuts, swales, inlets, manholes, easements, fire routes, accessible paths, utility corridors, and the receiving outfall. Large acreage does not remove the need for accurate control." },
    { heading: "Stormwater and groundwater decisions", body: "High groundwater and variable soils affect infiltration, detention, outlet protection, and construction sequencing. Check current NJDEP and municipal thresholds against disturbance, impervious area, and discharge rather than using a generic suburban exemption." },
    { heading: "Residential scope can affect civil systems", body: "An ADU, addition, driveway, or patio can redirect roof water, change parking and fire access, cross an easement, or increase sewer demand. Document those impacts and the proposed maintenance responsibility." },
  ],
  permitSteps: [
    "Map Edison Planning, Building, Public Works, Middlesex County, utility, NJDEP, flood, soil-erosion, and right-of-way requirements for the parcel.",
    "Verify survey control, utilities, drainage areas, outfall ownership, flood and wetland information, groundwater or infiltration assumptions, and finished floors.",
    "Prepare grading, stormwater, utility, fire-access, accessible-route, erosion, frontage, and maintenance plans coordinated with the building package.",
    "Revise Edison contours, profiles, calculations, details, and agency conditions for each correction before resubmission.",
  ],
  faqs: [
    { question: "Does a large Edison site always have an acceptable outfall?", answer: "No. Ownership, invert, capacity, easements, downstream conditions, and municipal or NJDEP requirements must be verified for the actual connection." },
    { question: "When can Edison groundwater change the civil design?", answer: "It can affect infiltration, detention, pipe bedding, basement drainage, retaining, and construction sequencing; use site evidence and the accepted review criteria." },
    { question: "Does an Edison addition need stormwater calculations?", answer: "The required analysis depends on disturbance, impervious change, drainage, flood, and local thresholds. Confirm the current checklist rather than assuming the work is exempt." },
  ],
  sources: [...edisonSources, ...stateSources],
};

const edisonEnergy: Batch2CoreServicePage = {
  serviceSlug: "energy-compliance",
  title: "Edison energy compliance for suburban conversions",
  description: "Edison energy documentation for envelope, HVAC, lighting, controls, and service water coordinated with the New Jersey energy subcode.",
  h1: "Energy Compliance for Edison, New Jersey",
  kicker: "Right-sized energy records for changing suburban buildings",
  lede: "Edison energy work should classify the actual alteration and keep the envelope, equipment, lighting, controls, and utility assumptions synchronized through plan check.",
  permitAuthority: "Edison Building Department confirms the local UCC energy route; Planning, fire, Public Works, utilities, county, and flood authorities may impose separate conditions.",
  codeContext: "Use the current New Jersey UCC energy subcode, accepted compliance method, climate inputs, and alteration category confirmed for the Edison project.",
  localConditions: "Large roof areas, office or warehouse shells, exposed additions, summer humidity, winter heating, parking-canopy shade, and groundwater or flood-sensitive equipment affect inputs.",
  projectTypes: "Office or warehouse conversions, multifamily improvements, commercial infill, additions, rooftop equipment, and detached ADUs where permitted.",
  sections: [
    { heading: "Classifying Edison’s existing shell", body: "Document roof, wall, glazing, slab, air barrier, insulation, loading doors, and conditioned boundaries. An office conversion inside a warehouse is not automatically represented by the old use or by a new-building default." },
    { heading: "Equipment, lighting, and controls", body: "Energy inputs should match actual heating and cooling zones, ventilation, filtration, lighting power, service water, controls, and equipment schedules. Coordinate rooftop penetrations, roof loading, and lowland or flood-sensitive equipment locations." },
    { heading: "A correction path that survives construction", body: "Cite the Edison comment or subcode route, change the affected input, update forms and drawings, and identify the field evidence needed. Keep the energy, MEP, architectural, and equipment records aligned." },
  ],
  permitSteps: [
    "Confirm Edison’s current energy subcode, accepted method, alteration category, climate inputs, forms, and any commercial or residential distinction.",
    "Collect verified assemblies, glazing, HVAC, ventilation, lighting, controls, service-water, utility, and equipment data from the proposed design.",
    "Cross-check the analysis against structural penetrations, flood conditions, fire separations, architectural details, and procurement responsibilities.",
    "Answer Edison energy corrections with citations, revised forms or model inputs, and clearly referenced drawing changes.",
  ],
  faqs: [
    { question: "Does an Edison warehouse conversion use its existing energy classification?", answer: "The proposed occupancy and alteration scope control the route. Existing envelope and equipment may be credited only as permitted by the accepted method and evidence." },
    { question: "Can an Edison ADU copy the main house energy inputs?", answer: "Not without checking its envelope, conditioned area, HVAC, glazing, controls, and connection to the existing systems under the applicable path." },
    { question: "What happens if Edison plan check changes a roof unit?", answer: "Recheck loads, efficiency, controls, energy forms, structural support, penetrations, and MEP schedules, then issue one coordinated revision." },
  ],
  sources: [...edisonSources, ...stateSources],
};

const edisonStamped: Batch2CoreServicePage = {
  serviceSlug: "pe-stamped-drawings",
  title: "Edison PE-stamped drawings for coordinated site work",
  description: "Edison sealed engineering packages defining scope, soil and drainage evidence, UCC coordination, and plan-check revisions.",
  h1: "PE-Stamped Drawings for Edison, New Jersey",
  kicker: "Professional responsibility for suburban complexity",
  lede: "An Edison sealed set should state exactly what was reviewed, from a building alteration to a drainage or utility plan, without implying guaranteed approval.",
  permitAuthority: "Edison Building Department decides its construction review; Planning, Public Works, Middlesex County, utilities, flood, environmental, and fire authorities retain separate responsibilities.",
  codeContext: "Identify current New Jersey UCC subcodes, occupancy, alteration path, zoning and flood triggers, discipline boundaries, and the seal format applicable to the Edison submission.",
  localConditions: "Large parcels, long utility runs, variable soils, high groundwater, drainage easements, phased occupancy, and changing commercial uses make source records important.",
  projectTypes: "Commercial conversions, additions, civil site plans, structural packages, MEP work, stormwater documents, and zoning-compliant accessory dwellings.",
  sections: [
    { heading: "An Edison record with defined limits", body: "Identify the address, survey and geotechnical sources, observed existing conditions, code criteria, calculations, drawing list, consultant boundaries, and exclusions. Separate verified utility facts from owner-provided information." },
    { heading: "County, utility, and flood interfaces", body: "A PE seal does not replace Middlesex County frontage, utility capacity, NJDEP stormwater, flood, or municipal planning decisions. Carry each dependency into the drawings and response matrix without overstating professional identity." },
    { heading: "Revisions after Edison comments", body: "Track each correction, substitution, RFI, and field change against the sheet and calculation affected. The responsible PE determines whether the sealed technical scope changes and what must be reissued." },
  ],
  permitSteps: [
    "Identify Edison’s enforcing office, occupancy, current UCC route, zoning and flood triggers, discipline boundary, county interfaces, and seal requirements.",
    "Assemble survey, soil, drainage, flood, utility, field, calculation, design-criteria, and consultant-boundary records for the address.",
    "Have the responsible New Jersey PE review the coordinated drawings, details, schedules, calculations, and interfaces before submission.",
    "Route Edison corrections and construction changes through that professional and issue revised sealed sheets when the reviewed scope changes.",
  ],
  faqs: [
    { question: "Does an Edison PE seal establish stormwater approval?", answer: "No. It identifies responsibility for the defined engineering work; Edison, NJDEP, county, utility, flood, and other authorities decide their own requirements." },
    { question: "What evidence is useful for an Edison commercial conversion?", answer: "Current survey, existing-condition observations, utility correspondence, soil or groundwater information, occupancy and load data, and a clear record of prior alterations." },
    { question: "Can an Edison PE seal cover a contractor’s unreviewed field change?", answer: "No. A change affecting the professional scope should be evaluated, documented, and reissued or accepted through the responsible professional’s process." },
  ],
  sources: [...edisonSources, ...stateSources],
};

const trentonStructural: Batch2CoreServicePage = {
  serviceSlug: "structural-engineering",
  title: "Trenton structural engineering for rowhouses and civic reuse",
  description: "Trenton structural design for historic rehabilitation, additions, and adaptive reuse with river flood and older masonry conditions.",
  h1: "Structural Engineering for Trenton, New Jersey",
  kicker: "Older building load paths for the state-capital city",
  lede: "Trenton structural work must reconcile older masonry and wood framing with river and tributary flood information, occupied phasing, and the proposed new use.",
  permitAuthority: "Trenton Construction Office handles local UCC intake; planning, zoning, historic, fire, Public Works, county, utilities, and flood agencies may review separately.",
  codeContext: "Confirm current New Jersey UCC subcodes, rehabilitation and historic provisions, occupancy, flood criteria, and Trenton submission requirements for the address.",
  localConditions: "Delaware and Assunpink flood exposure, urban fill, old masonry, wood framing, combined sewers, constrained lots, snow, and occupied renovation affect structural choices.",
  projectTypes: "State-capital-area rehabilitation, historic rowhouses, adaptive reuse, neighborhood commercial work, residential additions, and ADUs where zoning allows.",
  sections: [
    { heading: "Trenton’s existing load paths", body: "Rowhouses, civic buildings, and converted commercial spaces can contain altered openings, shallow foundations, heavy masonry, and undocumented roof loads. Field observations should establish what remains continuous before a new beam or floor is added." },
    { heading: "Delaware and Assunpink interfaces", body: "Flood elevations, groundwater, filled ground, retaining, and finished-floor decisions should be coordinated with survey, geotechnical, and official flood information. Protect adjacent occupied buildings and public ways during excavation." },
    { heading: "Plan-check corrections for adaptive reuse", body: "Tie each Trenton comment to the affected calculation, wall section, connection, and fire or MEP interface. A changed occupancy can alter loads, egress openings, vibration, and construction sequence at the same time." },
  ],
  permitSteps: [
    "Confirm Trenton jurisdiction, occupancy, current UCC route, historic and flood triggers, zoning, county, and public-way requirements.",
    "Obtain survey, framing and foundation observations, geotechnical or flood information, roof and equipment loads, adjacent-condition records, and sequencing needs.",
    "Coordinate foundations, strengthening, connections, shoring, special inspections, fire separation, egress, and MEP penetrations.",
    "Log Trenton corrections, revise connected calculations and sheets, and have the responsible PE review the resubmission.",
  ],
  faqs: [
    { question: "How can an Assunpink flood question affect a Trenton addition?", answer: "It can affect finished floor, foundation, materials, access, utilities, and the civil-structural interface. Use the parcel’s official elevation and current requirements." },
    { question: "Can a Trenton rowhouse share a new beam with its neighbor?", answer: "Only after ownership, party-wall condition, bearing, fire separation, construction access, and professional design responsibilities are established." },
    { question: "Why does adaptive reuse change structural review?", answer: "New occupancy loads, vibration, equipment, egress, fire resistance, and openings may differ from the original use and must be checked together." },
  ],
  sources: [...trentonSources, ...stateSources],
};

const trentonMep: Batch2CoreServicePage = {
  serviceSlug: "mep-engineering",
  title: "Trenton MEP engineering for occupied rehabilitation",
  description: "Trenton MEP design for rowhouses, civic-area rehabilitation, adaptive reuse, additions, and permitted ADUs with utility coordination.",
  h1: "MEP Engineering for Trenton, New Jersey",
  kicker: "Phased systems planning for older Trenton buildings",
  lede: "Trenton MEP documents should make old risers, occupied shutdowns, sewer constraints, ventilation, and the proposed use legible to the Construction Office.",
  permitAuthority: "Trenton Construction Office coordinates UCC intake; Trenton Water Works, Public Works, planning, fire, county, utilities, and flood reviewers can have separate roles.",
  codeContext: "Confirm current New Jersey mechanical, electrical, plumbing, energy, fire, rehabilitation, accessibility, and flood provisions with Trenton for the actual occupancy.",
  localConditions: "Older service equipment, compact rowhouses, combined sewer areas, winter heating, humid summers, low river-adjacent floors, and occupied phasing affect the design.",
  projectTypes: "Occupied residential renovation, neighborhood commercial work, civic-area tenant improvements, adaptive reuse, additions, and ADUs where permitted.",
  sections: [
    { heading: "Field-tracing Trenton services", body: "Record panels, service entrances, water pressure, sanitary stacks, boiler or furnace rooms, shafts, exhaust routes, and controls before proposing new loads. A phased project needs a shutdown and temporary-service plan as well as final schedules." },
    { heading: "Low floors and shared utilities", body: "Flood or groundwater exposure can affect equipment elevation, backflow, condensate, and electrical protection. Coordinate Trenton Water Works and sewer information with fire, energy, and accessibility details." },
    { heading: "Corrections during occupied work", body: "A comment on ventilation, service, or fire separation may affect structure, energy, phasing, and egress. Return a complete response with revised risers, schedules, calculations, and temporary or permanent conditions." },
  ],
  permitSteps: [
    "Confirm Trenton’s UCC, occupancy, rehabilitation, fire, energy, zoning, flood, utility, and phased-construction review paths.",
    "Field-verify existing equipment and request electric, gas, water, sewer, and fire-flow information from the responsible providers or authorities.",
    "Coordinate loads, risers, ventilation, controls, condensate, equipment elevations, clearances, shutdowns, and maintenance access.",
    "Answer Trenton corrections with numbered revisions to schedules, risers, calculations, details, and utility or phasing records.",
  ],
  faqs: [
    { question: "Can Trenton Water Works information replace a plumbing calculation?", answer: "No. Provider information establishes available service facts; the design still documents fixture demand, pressure, distribution, sanitary flow, and code coordination." },
    { question: "What should a Trenton occupied renovation show about shutdowns?", answer: "Identify affected systems, temporary service, sequencing, access, life-safety continuity, and the parties responsible for verifying existing conditions." },
    { question: "Does a Trenton ADU automatically share the house HVAC?", answer: "Not necessarily. Loads, zoning, ventilation, fire separation, equipment capacity, controls, and the AHJ’s route determine whether shared or separate systems are appropriate." },
  ],
  sources: [...trentonSources, ...stateSources],
};

const trentonCivil: Batch2CoreServicePage = {
  serviceSlug: "civil-engineering",
  title: "Trenton civil engineering for river-aware neighborhood work",
  description: "Trenton grading, drainage, utilities, access, flood, and public-way coordination for rehabilitation and additions.",
  h1: "Civil Engineering for Trenton, New Jersey",
  kicker: "Survey-based plans for rivers, alleys, and public utilities",
  lede: "Trenton civil design must connect small urban parcels to streets, sewers, utilities, and fire access while recognizing Delaware and Assunpink flood conditions.",
  permitAuthority: "Trenton planning and Construction Office are separate from Public Works, Trenton Water Works, Mercer County engineering, NJDEP, flood, and right-of-way authorities.",
  codeContext: "Confirm Trenton zoning, site-plan, stormwater, flood-hazard, soil-erosion, frontage, utility, and UCC requirements for the disturbance and proposed use.",
  localConditions: "River and tributary flood exposure, urban fill, combined sewers, narrow alleys, low finished floors, constrained lots, and older utility mapping affect civil design.",
  projectTypes: "Historic rowhouses, adaptive reuse, civic-area rehabilitation, neighborhood commercial work, additions, ADUs where zoning allows, and parking or access changes.",
  sections: [
    { heading: "A Trenton parcel-to-street survey", body: "Show curb and alley grades, inlets and manholes, utility covers, easements, fire access, accessible routes, flood datum, finished floors, and the proposed receiving connection. Small lots leave little room for an unverified assumption." },
    { heading: "Rivers, sewers, and runoff", body: "Roof and paving changes should be tested against Trenton drainage, Water Works and sewer information, NJDEP stormwater and flood requirements, and downstream conditions. Low floors may require civil, structural, and MEP coordination." },
    { heading: "Additions need a complete site record", body: "An ADU, porch, driveway, or rear addition can alter roof drainage, parking, access, sewer flow, easements, and flood exposure. Show those changes and assign maintenance or protection responsibilities." },
  ],
  permitSteps: [
    "Map Trenton planning, Construction Office, Public Works, Water Works, Mercer County, NJDEP, flood, soil-erosion, and right-of-way requirements.",
    "Verify survey datum, flood information, utilities, sewer ownership and inverts, drainage areas, outfalls, finished floors, easements, and soil assumptions.",
    "Tie Jersey City contours and profiles to the building footprint, utility crossings, fire route, accessible frontage, erosion details, and long-term maintenance notes.",
    "Return revised Trenton contours, profiles, calculations, details, and agency conditions for every correction.",
  ],
  faqs: [
    { question: "Does a Trenton rear addition need a new site survey?", answer: "A current survey is often needed when grades, utilities, flood relationship, easements, access, or drainage change; the project checklist and professional scope control the extent." },
    { question: "Can a low Trenton lot rely on infiltration?", answer: "Not without verified soils, groundwater, flood, separation, and an accepted stormwater method. Urban fill and low elevations can make infiltration unsuitable." },
    { question: "Who reviews a Trenton public-way drainage change?", answer: "Trenton Public Works and other municipal, county, NJDEP, utility, or flood authorities may have separate responsibilities; identify the owner and review path for the specific frontage." },
  ],
  sources: [...trentonSources, ...stateSources],
};

const trentonEnergy: Batch2CoreServicePage = {
  serviceSlug: "energy-compliance",
  title: "Trenton energy compliance for rowhouses and adaptive reuse",
  description: "Trenton energy documentation for older masonry, civic-area rehabilitation, HVAC, lighting, and additions under the New Jersey energy subcode.",
  h1: "Energy Compliance for Trenton, New Jersey",
  kicker: "Coordinated energy records for older urban buildings",
  lede: "Trenton energy compliance depends on the proposed alteration path and the real limits of an older envelope, not a generic worksheet for every rowhouse or conversion.",
  permitAuthority: "Trenton Construction Office confirms the UCC energy path; planning, historic, fire, utilities, Public Works, and flood reviews may add separate conditions.",
  codeContext: "Apply the current New Jersey UCC energy subcode and accepted method for the occupancy, rehabilitation category, addition, and Trenton submission requirements.",
  localConditions: "Masonry party walls, old windows, damp basements, shaded streets, aging boilers, low river-adjacent floors, and tight mechanical routes affect energy inputs.",
  projectTypes: "Rowhouse renovation, adaptive reuse, civic-area tenant work, multifamily rehabilitation, additions, and zoning-compliant ADUs.",
  sections: [
    { heading: "Recording Trenton’s existing envelope", body: "Identify masonry, party walls, windows, roof and floor assemblies, air leakage, insulation access, and moisture. An older envelope may need a carefully bounded compliance method rather than an invented assembly." },
    { heading: "Energy and MEP must agree", body: "Heating, cooling, ventilation, lighting, controls, service water, and equipment locations should match the drawings and actual occupancy. Coordinate roof and wall penetrations, fire separations, and flood-aware equipment decisions." },
    { heading: "Plan-check responses for additions", body: "For each Trenton comment, cite the applicable route, change the affected form or model input, revise the architectural or MEP detail, and identify any existing condition that remains subject to field verification." },
  ],
  permitSteps: [
    "Confirm Trenton’s current energy subcode, accepted method, rehabilitation or addition category, climate inputs, forms, and historic or flood interfaces.",
    "Collect verified envelope, glazing, HVAC, ventilation, lighting, controls, service-water, and equipment data from the coordinated design.",
    "Cross-check inputs against fire-rated assemblies, structural penetrations, equipment schedules, flood conditions, and field installation notes.",
    "Answer every Trenton energy correction with a citation, revised form or input, affected sheet, and responsibility for remaining verification.",
  ],
  faqs: [
    { question: "Does a Trenton rowhouse addition use the existing house’s energy path?", answer: "The alteration category, affected envelope and systems, occupancy, and accepted compliance method determine the documents; existing conditions must be represented accurately." },
    { question: "How should an old Trenton basement affect energy coordination?", answer: "Moisture, air leakage, insulation, equipment elevation, combustion, and flood or backflow conditions should be addressed across the energy, architectural, and MEP records." },
    { question: "What if a Trenton plan check changes window area?", answer: "Update the applicable energy input or form and coordinate the revised glazing, shading, envelope, HVAC load, and architectural details before resubmission." },
  ],
  sources: [...trentonSources, ...stateSources],
};

const trentonStamped: Batch2CoreServicePage = {
  serviceSlug: "pe-stamped-drawings",
  title: "Trenton PE-stamped drawings for accountable rehabilitation",
  description: "Trenton sealed engineering sets defining historic, flood, utility, UCC, and plan-check responsibilities for local permits.",
  h1: "PE-Stamped Drawings for Trenton, New Jersey",
  kicker: "Defined professional scope for occupied older buildings",
  lede: "A Trenton sealed set should identify the address, discipline, evidence, calculations, and limitations reviewed by the responsible professional—not promise approval.",
  permitAuthority: "Trenton Construction Office makes its construction-code decision, while planning, historic, fire, Public Works, Water Works, Mercer County, flood, and environmental agencies retain separate authority.",
  codeContext: "State the applicable New Jersey UCC subcodes, occupancy, rehabilitation route, flood and historic triggers, discipline boundary, and seal format before issuance.",
  localConditions: "Older masonry, rowhouse party walls, river and tributary flood exposure, urban fill, occupied phasing, narrow public ways, and aging utilities make evidence and boundaries important.",
  projectTypes: "Adaptive reuse, rowhouse and multifamily rehabilitation, structural alterations, civil site plans, MEP upgrades, additions, and permitted ADU work.",
  sections: [
    { heading: "What a Trenton sealed set should identify", body: "List the address, survey and field sources, soil and flood criteria, existing-condition limits, calculations, drawing index, code route, exclusions, and responsible discipline. Do not present owner or contractor assumptions as verified facts." },
    { heading: "Separate professional and agency decisions", body: "Coordinate Trenton Water Works, Public Works, historic, fire, county, flood, utility, and planning information, but preserve each authority’s decision and conditions rather than treating one PE seal as a universal approval." },
    { heading: "Corrections and field changes", body: "Use a dated matrix linking each Trenton comment, substitution, RFI, and field observation to a sheet or calculation. The responsible PE determines whether a technical change requires a revised sealed document." },
  ],
  permitSteps: [
    "Identify Trenton’s enforcing office, occupancy, UCC and rehabilitation path, flood or historic triggers, discipline limits, and applicable seal requirements.",
    "Assemble survey, field observations, masonry or framing evidence, soil, flood, utility, calculations, and consultant-boundary records.",
    "Have the responsible New Jersey PE review coordinated notes, details, schedules, calculations, and interfaces with architecture, fire, civil, and MEP work.",
    "Send Trenton comment responses and field discoveries back to the responsible professional, issuing a revised seal only when the reviewed technical scope warrants it.",
  ],
  faqs: [
    { question: "Does a Trenton PE seal substitute for a historic review?", answer: "No. It identifies responsibility for the defined professional work; Trenton and other historic, planning, fire, utility, flood, and environmental authorities decide their reviews." },
    { question: "What should a Trenton sealed set say about flood assumptions?", answer: "Identify the official source, datum, design elevation or criterion, affected materials and systems, limitations, and any separate flood review needed for the parcel." },
    { question: "Who reviews a field condition in a Trenton occupied renovation?", answer: "The responsible professional evaluates changes within the sealed scope, while the Construction Office determines whether a permit revision or additional agency review is required." },
  ],
  sources: [...trentonSources, ...stateSources],
};

const newJerseyBatch4: Batch2StateExpansion = {
  stateSlug: "new-jersey",
  stateName: "New Jersey",
  stateAbbrev: "NJ",
  hub: {
    title: "New Jersey Engineering Services for Local UCC Review",
    description: "Site-specific structural, MEP, civil, energy, and PE documentation for New Jersey permits, flood conditions, utilities, and plan-check corrections.",
    h1: "Engineering for New Jersey’s Cities, Rivers, and Coastal Sites",
    kicker: "New Jersey UCC and local-agency coordination",
    lede: "New Jersey’s Uniform Construction Code creates a statewide framework, but the enforcing agency, utilities, counties, NJDEP, flood authorities, and local planning decisions remain address-specific.",
    sections: [
      { heading: "The UCC is statewide; permit administration is local", body: "The Department of Community Affairs publishes the UCC framework and subcode information. A municipal enforcing agency then reviews the address-specific construction scope, while zoning, planning, fire, historic, county, and right-of-way decisions may follow separate routes." },
      { heading: "Rivers, coast, fill, and groundwater change the record", body: "Tidal surge, river floodplains, dense fill, shallow groundwater, steep grades, combined sewers, snow, wind, and humid summers vary across New Jersey. Survey, geotechnical, FEMA, NJDEP, and utility evidence should establish design criteria rather than a statewide assumption." },
      { heading: "NJDEP, utilities, and public works are parallel reviews", body: "Stormwater, Flood Hazard Area, wetlands, soil-erosion, and environmental requirements can apply beside local construction review. Water and sewer agencies, electric utilities, county engineering, transit, and public works may each control a separate connection or protection decision." },
      { heading: "Additions and ADUs need one coordinated correction record", body: "A residential addition or ADU can change egress, fire separation, foundations, energy forms, service capacity, HVAC, sewer, drainage, access, and flood resilience. Carry each comment through the affected drawings, calculations, and agency correspondence." },
      { heading: "Roadway access can require a transportation handoff", body: "A parcel on a state highway may need New Jersey Department of Transportation access, drainage, utility-opening, or construction-stage review in addition to the municipal construction permit. First identify whether the frontage is state, county, or municipal; the owner controls driveway geometry, sight distance, sidewalk, traffic protection, and restoration conditions. NJDOT approval does not replace zoning, flood, NJDEP, or UCC review, and a municipal permit does not authorize work in a state right-of-way. Keep written access conditions with the survey, civil plans, and phasing documents when plan-check revisions change the frontage." },
    ],
    faqs: [
      { question: "Does New Jersey have one permit office for every project?", answer: "No. A municipal enforcing agency administers construction review under the UCC, while zoning, planning, fire, historic, county, NJDEP, flood, utility, and right-of-way authorities may have separate jurisdiction." },
      { question: "What should be checked before designing a New Jersey addition?", answer: "Confirm the address and AHJ, current UCC subcodes, occupancy and alteration route, survey, soils and groundwater, flood and wetlands status, utility and sewer capacity, zoning, access, and any historic or coastal trigger." },
      { question: "Does a New Jersey PE seal guarantee approval?", answer: "No. A seal identifies professional responsibility for a defined scope. The enforcing agency and other reviewing authorities decide approval and may require separate technical, environmental, utility, flood, or historic documentation." },
    ],
    sources: stateSources,
  },
  metros: [
    { slug: "newark", name: "Newark", county: "Essex County", services: [newarkStructural, newarkMep, newarkCivil, newarkEnergy, newarkStamped] },
    { slug: "jersey-city", name: "Jersey City", county: "Hudson County", services: [jerseyCityStructural, jerseyCityMep, jerseyCityCivil, jerseyCityEnergy, jerseyCityStamped] },
    { slug: "paterson", name: "Paterson", county: "Passaic County", services: [patersonStructural, patersonMep, patersonCivil, patersonEnergy, patersonStamped] },
    { slug: "edison", name: "Edison", county: "Middlesex County", services: [edisonStructural, edisonMep, edisonCivil, edisonEnergy, edisonStamped] },
    { slug: "trenton", name: "Trenton", county: "Mercer County", services: [trentonStructural, trentonMep, trentonCivil, trentonEnergy, trentonStamped] },
  ],
};

export { newJerseyBatch4 };
export default newJerseyBatch4;