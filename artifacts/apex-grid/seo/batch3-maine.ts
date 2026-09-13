import type { Batch2StateExpansion, Batch2CoreServiceSlug } from "./batch2-core-service-types";

type Metro = { slug: string; name: string; county: string; ahj: string; source: { label: string; url: string }; utility: string; conditions: string; projects: string; local: string };
type Seed = { slug: Batch2CoreServiceSlug; label: string; focus: string; angles: [string, string, string] };

const stateSources = [
  { label: "Maine Uniform Building and Energy Code", url: "https://www.maine.gov/dps/fmo/building-codes" },
  { label: "Maine DEP stormwater", url: "https://www.maine.gov/dep/land/stormwater/" },
  { label: "Maine flood information", url: "https://www.maine.gov/dacf/flood" },
  { label: "Maine professional engineer licensing", url: "https://www.maine.gov/pfr/professionallicensing/professions/engineers" },
];
const metros: Metro[] = [
  { slug: "portland", name: "Portland", county: "Cumberland County", ahj: "City of Portland Inspections Division", source: { label: "Portland Inspections Division", url: "https://www.portlandmaine.gov/269/Inspections-Division" }, utility: "Portland Water District, Central Maine Power, Unitil gas, and Portland Public Works", conditions: "Casco Bay surge and salt exposure, ledge, glacial till, older wood and masonry, steep streets, freeze-thaw, heavy snow, and intense rain", projects: "Old Port tenant improvements, multifamily rehabilitation, ADUs where permitted, island or peninsula additions, and adaptive reuse", local: "Portland Land Use Code, historic-preservation or shoreland review where applicable, and Maine's adopted building and energy code" },
  { slug: "lewiston", name: "Lewiston", county: "Androscoggin County", ahj: "City of Lewiston Code Enforcement Department", source: { label: "Lewiston Code Enforcement", url: "https://www.lewistonmaine.gov/288/Code-Enforcement" }, utility: "Auburn Water District, Central Maine Power, Summit Natural Gas, and Lewiston Public Works", conditions: "Androscoggin River floodplain, steep mill-district slopes, glacial till and ledge, aging brick mill buildings, freeze-thaw, and significant snow load", projects: "mill conversions, downtown storefronts, two-family renovations, residential additions, and small manufacturing fit-outs", local: "Lewiston zoning, floodplain and site-plan review, and Maine's adopted building and energy code" },
  { slug: "bangor", name: "Bangor", county: "Penobscot County", ahj: "City of Bangor Code Enforcement Office", source: { label: "Bangor Code Enforcement", url: "https://www.bangormaine.gov/173/Code-Enforcement" }, utility: "Bangor Water District, Versant Power, Summit Natural Gas, and Bangor Public Works", conditions: "Penobscot River flood exposure, frost depth, glacial soils, ledge, very cold winters, heavy snow, ice, and forest-edge drainage", projects: "downtown rehabilitation, medical and campus buildings, detached ADUs, snow-sensitive additions, and commercial conversions", local: "Bangor Land Development Code, floodplain and site-plan procedures, and Maine's adopted building and energy code" },
  { slug: "south-portland", name: "South Portland", county: "Cumberland County", ahj: "City of South Portland Planning and Development Department", source: { label: "South Portland Planning and Development", url: "https://www.southportland.org/departments/planning-development/" }, utility: "Portland Water District, Central Maine Power, Unitil, and South Portland Public Works", conditions: "Casco Bay and Fore River coastal flooding, salt and wind exposure, shallow ledge, compact lots, winter snow, and petroleum or industrial legacy constraints", projects: "waterfront commercial work, Knightville mixed use, coastal additions, ADUs, and industrial tenant improvements", local: "South Portland zoning, shoreland and flood review, site-plan standards, and Maine's adopted building and energy code" },
  { slug: "augusta", name: "Augusta", county: "Kennebec County", ahj: "City of Augusta Code Enforcement Office", source: { label: "Augusta Code Enforcement", url: "https://www.augustamaine.gov/288/Code-Enforcement" }, utility: "Kennebec Water District, Central Maine Power, Summit Natural Gas, and Augusta Public Works", conditions: "Kennebec River floodplain, variable alluvial soils, frost and ledge, cold winters, snow drifting, and rural-to-urban drainage transitions", projects: "state-government offices, riverfront rehabilitation, neighborhood additions, accessory dwellings, and small commercial sites", local: "Augusta zoning, floodplain and site-plan processes, and Maine's adopted building and energy code" },
];

const seeds: Seed[] = [
  { slug: "structural-engineering", label: "Structural Engineering", focus: "load paths, foundations, snow, wind, frost, existing buildings, and additions", angles: ["Measured framing, masonry, footing, and prior-alteration information is especially important in Maine's older building stock.", "Frost depth, ledge, glacial or alluvial soils, heavy snow, and coastal corrosion alter foundation and connection decisions.", "A correction log ties every plan-check response to the revised detail or calculation and keeps field changes under responsible professional review."] },
  { slug: "mep-engineering", label: "MEP Engineering", focus: "heating, ventilation, plumbing, electrical capacity, controls, and winter maintainability", angles: ["Occupancy and equipment schedules, service traces, combustion-air needs, and winter operating plans establish a practical Maine MEP basis.", "Cold temperatures, snow, salt, freeze protection, ventilation, and legacy fuel or utility infrastructure shape equipment and routing decisions.", "A coordinated response to code comments identifies changed schedules, plans, controls, and commissioning responsibilities rather than relying on an isolated markup."] },
  { slug: "civil-engineering", label: "Civil Engineering", focus: "survey, grading, drainage, stormwater, erosion, utilities, access, and flood or shoreland interfaces", angles: ["Maine site design starts with survey, ledge, frost, shoreland or flood status, public frontage, and utility records before fixing disturbance limits.", "Glacial soils, alluvial river margins, steep cuts, snow storage, salt, and short intense storms make drainage and erosion phasing site-specific.", "Plan-check responses should revise contours, profiles, calculations, erosion notes, and maintenance duties together so construction can follow the accepted design."] },
  { slug: "energy-compliance", label: "Energy Compliance", focus: "Maine energy-code documentation, cold-climate envelope, heating, ventilation, lighting, and controls", angles: ["The Maine energy path depends on occupancy, alteration scope, adopted code edition, and the AHJ's current forms or checklist.", "Long heating seasons, wind, ice, snow, moisture, and coastal exposure make air sealing, thermal bridges, equipment selection, and controls consequential.", "When an AHJ returns an energy comment, revise the model or forms alongside envelope, HVAC, lighting, and architectural details in the same response cycle."] },
  { slug: "pe-stamped-drawings", label: "PE-Stamped Drawings", focus: "professional responsibility, discipline boundaries, seal requirements, calculations, and review coordination", angles: ["A Maine PE seal should follow a defined scope supported by verified conditions, code analysis, calculations, and the professional's direct review.", "Heavy snow, frost, ledge, flood, salt, older structures, and specialty systems can require survey, geotechnical, utility, or field evidence before sealing.", "The responsible PE evaluates each plan-check correction, substitution, and RFI; a sealed sheet cannot authorize unreviewed construction changes."] },
];

function fill(value: string, m: Metro, s: Seed) {
  return value.replaceAll("{city}", m.name).replaceAll("{ahj}", m.ahj).replaceAll("{conditions}", m.conditions).replaceAll("{projects}", m.projects).replaceAll("{utility}", m.utility).replaceAll("{local}", m.local).replaceAll("{focus}", s.focus);
}
function makeService(m: Metro, s: Seed) {
  const sections = [
    [`${m.name} ${s.label} basis`, `${s.angles[0]} In ${m.name}, ${m.ahj} records and field observations should be reconciled before the design is fixed. This is a practical control for ${m.projects}.`],
    [`${m.name} conditions and interfaces`, `${s.angles[1]} Current survey, geotechnical, flood, utility, and owner information should support the assumptions. Maine code, local land-use rules, and the actual receiving authority remain controlling.`],
    [`${m.name} plan-check workflow`, `${s.angles[2]} Number the comment, identify the affected sheet or calculation, coordinate the revision across disciplines, and resubmit through ${m.ahj}.`],
  ];
  const qs = [`What should a ${s.label.toLowerCase()} kickoff verify in ${m.name}?`, `How do ${m.conditions} affect ${s.label.toLowerCase()}?`, `How should ${m.ahj} corrections be documented?`];
  const ans = [
    `Verify the address, occupancy, current Maine code edition, local checklist, existing conditions, and ${s.focus}. The scope may require survey, geotechnical, utility, flood, or specialty information.`,
    `Those conditions change design assumptions and construction sequencing; they should be tested against current site information instead of copied from another Maine community.`,
    `Log the cited requirement, revise all affected plans or calculations, and submit one dated coordinated response. The AHJ decides acceptance and the responsible PE controls technical changes.`,
  ];
  return {
    serviceSlug: s.slug, title: `${m.name} ${s.label} for ${m.projects}`, description: `${s.label} for ${m.name} projects with ${m.ahj} coordination, Maine code context, utility interfaces, and cold-climate site analysis.`,
    h1: `${s.label} for ${m.name} Projects`, kicker: `${m.name} ${s.label.toLowerCase()} and permitting`,
    lede: `${s.label} in ${m.name} addresses ${s.focus}. The documents should fit ${m.ahj}, local review, and the physical conditions of the specific parcel.`,
    permitAuthority: `${m.ahj} administers the named local review for this address. Planning, fire, shoreland, floodplain, public works, utility, and environmental agencies can have parallel authority; the responsible Maine PE determines seal scope.`,
    codeContext: `${m.local}. Confirm the current Maine Uniform Building and Energy Code, state amendments, local provisions, and project transition rules with the AHJ.`,
    localConditions: `${m.conditions}. Site observations and current agency records should support design inputs.`,
    projectTypes: m.projects,
    sections: sections.map(([heading, body]) => ({ heading, body })),
    permitSteps: [
      `Confirm the parcel, occupancy, current Maine code and energy requirements, and local checklist with ${m.ahj}.`,
      `Collect survey, field, utility, frost, snow, ledge, flood, equipment, and owner information for ${m.projects}; coordinate with ${m.utility}.`,
      `Coordinate ${s.focus} with architecture, fire/life safety, accessibility, site work, and construction phasing before submission.`,
      `Number every ${m.ahj} correction, revise affected documents, and preserve the response, inspection, testing, and closeout record.`,
    ],
    faqs: qs.map((question, i) => ({ question, answer: ans[i] })),
    sources: [m.source, ...stateSources],
  };
}

const maineBatch3: Batch2StateExpansion = {
  stateSlug: "maine", stateName: "Maine", stateAbbrev: "ME",
  hub: {
    title: "Maine Engineering Services for Permitted Building Projects",
    description: "Maine structural, MEP, civil, energy-compliance, and PE-stamped drawing support for cold-climate, coastal, river, and inland projects.",
    h1: "Engineering for Maine’s Coastal and Working Communities", kicker: "Maine permitting and design coordination",
    lede: "Maine's Uniform Building and Energy Code provides a statewide framework, but local code-enforcement offices and planning boards administer permits, zoning, site, shoreland, flood, and utility review differently. A durable project record names the AHJ, verifies cold-climate conditions, and tracks every plan-check correction.",
    sections: [
      { heading: "State code with local review", body: "The Maine Department of Public Safety publishes the Uniform Building and Energy Code framework and its current state amendments. Portland, Lewiston, Bangor, South Portland, Augusta, and other municipalities apply local zoning, site-plan, historic, shoreland, flood, local-amendment, and inspection processes that must be checked by address." },
      { heading: "Cold, wet, coastal, and rocky sites", body: "Heavy snow, frost, ice, ledge, glacial and alluvial soils, river flooding, coastal surge, salt, and short intense storms shape foundations, envelopes, utilities, grading, and construction sequencing. Maine DEP, municipal records, FEMA information, survey, and geotechnical evidence should be current." },
      { heading: "ADUs and additions are coordinated scopes", body: "An ADU or residential addition can change snow and structural loads, egress, fire separation, heating, ventilation, electrical service, septic or sewer, grading, and energy documentation. It should move through one integrated local review rather than a thin doorway page." },
      { heading: "Shoreland, DEP, and winter utility coordination", body: "A coastal or riverfront Maine project may need municipal shoreland or flood review alongside Maine DEP stormwater requirements, while Portland Water District, Bangor Water District, Central Maine Power, Versant Power, or another local provider evaluates service and relocation constraints. The permit set should carry those written conditions into grading, frost protection, equipment access, snow storage, and construction phasing instead of treating utility approval as automatic." },
    ],
    faqs: [
      { question: "Does Maine use one permitting office statewide?", answer: "No. The state code framework is administered through local code-enforcement and planning authorities. The municipality, parcel, occupancy, and any shoreland, flood, historic, or site triggers determine the actual path." },
      { question: "How should Maine plan-check corrections be returned?", answer: "Number each comment, cite the changed drawing or calculation, coordinate disciplines, and submit a dated response through the named AHJ. The AHJ controls acceptance; a responsible PE reviews technical revisions." },
      { question: "Do Maine ADUs and additions avoid energy or structural review?", answer: "Not automatically. Existing conditions, local zoning, occupancy, structure, heating, egress, utilities, snow, frost, and the adopted code path determine the required documents." },
    ],
    sources: stateSources,
  },
  metros: metros.map((m) => ({ slug: m.slug, name: m.name, county: m.county, services: seeds.map((s) => makeService(m, s)) })),
};
export { maineBatch3 };
export default maineBatch3;