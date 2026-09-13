import type { Batch2StateExpansion, Batch2CoreServiceSlug } from "./batch2-core-service-types";

type Metro = { slug: string; name: string; county: string; ahj: string; source: { label: string; url: string }; utility: string; conditions: string; projects: string; local: string };
type Seed = { slug: Batch2CoreServiceSlug; label: string; focus: string; angles: [string, string, string] };

const stateSources = [
  { label: "Maryland building codes administration", url: "https://www.dllr.state.md.us/labor/buildcode/" },
  { label: "Maryland Department of Environment stormwater", url: "https://mde.maryland.gov/programs/Water/StormwaterManagementProgram/Pages/index.aspx" },
  { label: "Maryland flood risk information", url: "https://mde.maryland.gov/programs/Water/StormwaterManagementProgram/Pages/floodplainmanagement.aspx" },
  { label: "Maryland professional engineer licensing", url: "https://www.dllr.state.md.us/license/pe/" },
];
const metros: Metro[] = [
  { slug: "baltimore", name: "Baltimore", county: "Baltimore City", ahj: "Baltimore City Department of Housing and Community Development, Permits and Inspections", source: { label: "Baltimore City permits and inspections", url: "https://dhcd.baltimorecity.gov/permits" }, utility: "Baltimore City Department of Public Works, Baltimore Gas and Electric, and Baltimore City fire and utility divisions", conditions: "Chesapeake Bay and harbor surge, Patapsco flood exposure, urban fill, rowhouse party walls, steep neighborhoods, summer thunderstorms, and winter freeze-thaw", projects: "rowhouse rehabilitation, Harbor-area adaptive reuse, multifamily additions, ADUs where zoning permits, and restaurant or office tenant improvements", local: "Baltimore City zoning and building regulations, historic or waterfront review where applicable, and Maryland building-code adoptions" },
  { slug: "bethesda", name: "Bethesda", county: "Montgomery County", ahj: "Montgomery County Department of Permitting Services", source: { label: "Montgomery County permitting services", url: "https://www.montgomerycountymd.gov/DPS/" }, utility: "Washington Suburban Sanitary Commission, Pepco, Washington Gas, and Montgomery County Department of Transportation", conditions: "rolling Piedmont terrain, clay and weathered rock, dense redevelopment, stream valleys, summer downpours, wind, and occasional snow", projects: "mixed-use corridor redevelopment, detached ADUs, suburban additions, medical offices, and high-density tenant fit-outs", local: "Montgomery County zoning and site-plan review, WSSC and right-of-way requirements, and Maryland building-code adoptions" },
  { slug: "columbia", name: "Columbia", county: "Howard County", ahj: "Howard County Department of Inspections, Licenses and Permits", source: { label: "Howard County inspections and permits", url: "https://www.howardcountymd.gov/Departments/Inspections-Licenses-and-Permits" }, utility: "Howard County utilities, Baltimore Gas and Electric, Washington Gas, and Howard County Department of Public Works", conditions: "rolling clay and saprolite, wooded stream corridors, planned-community easements, intense summer rainfall, wind, and freeze-thaw", projects: "planned-community additions, village-center fit-outs, ADUs, schools, and residential renovations near stream buffers", local: "Howard County zoning, environmental-site-design and stormwater review, and Maryland building-code adoptions" },
  { slug: "frederick", name: "Frederick", county: "Frederick County", ahj: "Frederick County Division of Construction Inspection", source: { label: "Frederick County construction inspection", url: "https://www.frederickcountymd.gov/219/Construction-Inspection" }, utility: "City of Frederick or Frederick County utilities, Potomac Edison, Washington Gas, and county Public Works", conditions: "Catoctin and Piedmont slopes, limestone and karst, clay soils, Monocacy floodplain, rural-to-urban drainage, thunderstorms, and winter snow", projects: "historic downtown buildings, suburban additions, farm-to-commercial conversions, ADUs, and industrial or warehouse work", local: "Frederick County zoning, forest or environmental review where applicable, floodplain and site-plan requirements, and Maryland building-code adoptions" },
  { slug: "annapolis", name: "Annapolis", county: "Anne Arundel County", ahj: "Anne Arundel County Inspections and Permits", source: { label: "Anne Arundel County inspections and permits", url: "https://www.aacounty.org/departments/inspections-and-permits" }, utility: "Anne Arundel County utilities, Annapolis or county Public Works, BGE, and Washington Gas", conditions: "Chesapeake Bay tidal surge, coastal and creek flooding, shoreline erosion, variable fill, high humidity, hurricanes, and winter freeze-thaw", projects: "historic Annapolis work, waterfront additions, detached ADUs, restaurants, marinas, and coastal residential renovations", local: "Anne Arundel County zoning, critical-area and stormwater review, shoreline permits where applicable, and Maryland building-code adoptions" },
];

const seeds: Seed[] = [
  { slug: "structural-engineering", label: "Structural Engineering", focus: "load paths, existing masonry or framing, foundations, wind, snow, and additions", angles: ["Measured conditions, party walls, prior alterations, and foundation exposures are essential before changing a Maryland building.", "Flood elevations, clay or karst, fill, coastal corrosion, wind, and occasional snow create site-specific foundation and connection choices.", "The plan-check record should tie each correction to a revised detail, calculation, and coordinated architectural or MEP interface."] },
  { slug: "mep-engineering", label: "MEP Engineering", focus: "HVAC, electrical service, plumbing, ventilation, controls, utility capacity, and life-safety interfaces", angles: ["Occupancy, equipment, existing shafts, service traces, and utility data establish the MEP basis for a Maryland project.", "Humid summers, flood exposure, clay drainage, coastal salt, and winter conditions affect equipment, condensate, corrosion, ventilation, and controls.", "A correction response should identify changed schedules, plans, calculations, and testing responsibilities instead of leaving an uncoordinated markup."] },
  { slug: "civil-engineering", label: "Civil Engineering", focus: "survey, grading, stormwater, erosion and sediment control, utilities, access, and flood or critical-area review", angles: ["Maryland civil design begins with survey, parcel and easement records, receiving waters, public frontage, and the actual disturbance area.", "Chesapeake Bay tributaries, stream valleys, karst or clay, floodplains, steep grades, and intense rain make environmental-site-design decisions local.", "When plan review returns comments, revised drainage maps, profiles, computations, erosion controls, and maintenance duties should move together."] },
  { slug: "energy-compliance", label: "Energy Compliance", focus: "Maryland energy-code documentation, envelope, HVAC, lighting, service water, and controls", angles: ["The Maryland energy path depends on the adopted state or local code, occupancy, alteration category, and the AHJ's current forms.", "Humid cooling, air sealing, moisture, roof exposure, controls, and winter heating assumptions should reflect the actual Maryland site and equipment.", "Energy corrections belong with the affected envelope, architectural, HVAC, lighting, and controls sheets in one coordinated resubmittal."] },
  { slug: "pe-stamped-drawings", label: "PE-Stamped Drawings", focus: "professional responsibility, seal scope, calculations, code analysis, and agency coordination", angles: ["A Maryland PE seal applies to a defined discipline and scope supported by current site, utility, survey, and code information.", "Flood, critical-area, karst, coastal, existing-masonry, or specialty-equipment conditions can require additional evidence before responsibility is accepted.", "The responsible PE evaluates plan-check corrections, delegated design, substitutions, and RFIs; a seal does not authorize unreviewed changes."] },
];

function build(m: Metro, s: Seed) {
  const sections = [
    { heading: `${m.name} ${s.label} design basis`, body: `${s.angles[0]} In ${m.name}, ${m.ahj} records and field observations should be reconciled before documents are fixed. This is particularly important for ${m.projects}.` },
    { heading: `${m.name} conditions and agency interfaces`, body: `${s.angles[1]} Coordinate current survey, geotechnical, flood, utility, and environmental information with ${m.local}. The receiving authority, not a neighboring project, controls the applicable path.` },
    { heading: `${m.name} plan-check correction workflow`, body: `${s.angles[2]} Number the comment, identify the changed sheet or calculation, coordinate all disciplines, and resubmit a dated response through ${m.ahj}.` },
  ];
  return {
    serviceSlug: s.slug, title: `${m.name} ${s.label} for ${m.projects}`, description: `${s.label} for ${m.name} projects with ${m.ahj} coordination, Maryland code context, utility interfaces, and local physical conditions.`,
    h1: `${s.label} for ${m.name} Projects`, kicker: `${m.name} ${s.label.toLowerCase()} and permit coordination`,
    lede: `${s.label} in ${m.name} addresses ${s.focus}. Documents should fit ${m.ahj}, the applicable county or city process, Maryland requirements, and the actual parcel.`,
    permitAuthority: `${m.ahj} administers the named building review for this address. Zoning, fire, public works, stormwater, critical-area, historic, utility, and environmental agencies may have separate roles; the responsible Maryland PE determines seal scope.`,
    codeContext: `${m.local}. Confirm the current Maryland building, energy, mechanical, plumbing, fire, and local amendment provisions, plus project transition rules, before submission.`,
    localConditions: `${m.conditions}. Current survey, geotechnical, flood, utility, and environmental records should support design inputs.`,
    projectTypes: m.projects,
    sections,
    permitSteps: [
      `Confirm the parcel, occupancy, applicable Maryland code edition and amendments, and local checklist with ${m.ahj}.`,
      `Collect survey, field, utility, flood, soil, environmental, equipment, and owner information for ${m.projects}; coordinate with ${m.utility}.`,
      `Coordinate ${s.focus} with architecture, fire/life safety, accessibility, stormwater, and construction phasing before submission.`,
      `Number every ${m.ahj} correction, revise affected plans or calculations, and preserve the response, inspection, testing, and closeout record.`,
    ],
    faqs: [
      { question: `What should a ${s.label.toLowerCase()} kickoff verify in ${m.name}?`, answer: `Verify the address, occupancy, current Maryland code path, local checklist, existing conditions, and ${s.focus}. The scope may require survey, geotechnical, utility, flood, critical-area, or specialty information.` },
      { question: `How do ${m.conditions} affect ${s.label.toLowerCase()}?`, answer: `They change design assumptions and sequencing. The responsible professional should test them against current site and agency records rather than copy assumptions from another Maryland community.` },
      { question: `How should ${m.ahj} plan-check comments be answered?`, answer: `Log the cited requirement, revise every affected document, coordinate disciplines, and submit a dated response through ${m.ahj}. The AHJ decides acceptance and a PE evaluates technical changes.` },
    ],
    sources: [m.source, ...stateSources],
  };
}

const marylandBatch3: Batch2StateExpansion = {
  stateSlug: "maryland", stateName: "Maryland", stateAbbrev: "MD",
  hub: {
    title: "Maryland Engineering Services for Permitted Building Projects",
    description: "Maryland structural, MEP, civil, energy-compliance, and PE-stamped drawing support grounded in local AHJ, Chesapeake, flood, soil, and climate conditions.",
    h1: "Engineering for Maryland’s Bay, Piedmont, and City Sites", kicker: "Maryland permitting and design coordination",
    lede: "Maryland code adoption is statewide in important respects, but Baltimore City and each county administer building, zoning, stormwater, utilities, critical-area, flood, and site review through local channels. A useful permit package identifies the address-specific AHJ and maintains a correction record across disciplines.",
    sections: [
      { heading: "State code and local agencies", body: "Maryland building-code and energy requirements, state amendments, and any locally adopted amendments interact with Baltimore City, Montgomery, Howard, Frederick, and Anne Arundel County procedures. Local zoning, fire, public works, stormwater, critical-area, historic, utility, and environmental authorities can have separate checklists and decisions." },
      { heading: "Bay, rivers, soils, and storms", body: "Chesapeake Bay and tidal-creek surge, Patapsco and other river floodplains, Piedmont slopes, clay, fill, karst, stream buffers, humid cooling, hurricanes, and winter weather influence structural, MEP, civil, and energy design. Current MDE, FEMA, survey, geotechnical, and utility information is essential." },
      { heading: "ADUs and residential additions need integrated review", body: "An ADU or residential addition can alter egress, fire separation, structure, service capacity, HVAC, sewer, grading, stormwater, critical-area setbacks, and energy documentation. It should be developed as a coordinated permit scope and carry plan-check corrections through all affected sheets." },
      { heading: "MDE, Critical Area, and utility handoffs", body: "A Maryland project may require MDE stormwater or floodplain coordination, Critical Area Commission rules near Chesapeake Bay tidal waters, and a separate capacity or relocation response from WSSC, Baltimore City utilities, BGE, Pepco, or a county provider. The local AHJ does not automatically resolve those parallel decisions; their conditions should be reflected in the civil, architectural, MEP, and correction-response records." },
    ],
    faqs: [
      { question: "Does Maryland have one permitting authority?", answer: "No. State code provisions work alongside Baltimore City and county or municipal AHJs. The address controls the local building, zoning, stormwater, utility, flood, critical-area, and inspection path." },
      { question: "What is the Maryland plan-check correction workflow?", answer: "Record each cited comment, revise affected drawings and calculations, coordinate the disciplines, and submit a dated response through the named AHJ. The authority decides acceptance, while the responsible PE evaluates technical revisions." },
      { question: "Are Maryland ADUs exempt from engineering and energy review?", answer: "Not automatically. Zoning, occupancy, existing conditions, structure, fire separation, utilities, stormwater, flood or critical-area exposure, and the adopted code determine the needed documents." },
    ],
    sources: stateSources,
  },
  metros: metros.map((m) => ({ slug: m.slug, name: m.name, county: m.county, services: seeds.map((s) => build(m, s)) })),
};
export { marylandBatch3 };
export default marylandBatch3;