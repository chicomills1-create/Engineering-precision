/**
 * Phase 1 metro corpus.
 *
 * The records below are transcribed from the Census BPS final annual 2025
 * workbook, sheet "MSA Units Ann".  Only Metro / Micro Code 2 records were
 * retained. Ineligible and non-state records are not included; multi-state
 * records are eligible when their named area intersects the reviewed service footprint
 * in Apex Grid's reviewed service area.
 */

export const PHASE1_SOURCE_URL =
  "https://www.census.gov/construction/bps/xls/cbsaannual_202599.xls";
export const PHASE1_SHEET = "MSA Units Ann";

export type Phase1Metro = {
  slug: string;
  metroName: string;
  cbsaCode: number;
  metroCode: 2;
  permitTotal2025: number;
  rank: number;
  representativeCity: string;
  representativeState: string;
  sourceUrl: string;
  editorial: {
    planningLens: string;
    coordinationLens: string;
    documentationLens: string;
    deliveryLens: string;
  };
};

type MetroSeed = [
  metroName: string,
  cbsaCode: number,
  permitTotal2025: number,
  representativeCity: string,
  representativeState: string,
];

const stateNames: Record<string, string> = {
  AL: "Alabama", AZ: "Arizona", CA: "California", CO: "Colorado", DE: "Delaware",
  FL: "Florida", GA: "Georgia", IA: "Iowa", ID: "Idaho", IL: "Illinois",
  IN: "Indiana", KS: "Kansas", KY: "Kentucky", LA: "Louisiana", MA: "Massachusetts",
  MD: "Maryland", MI: "Michigan", MN: "Minnesota", MO: "Missouri", MS: "Mississippi",
  NC: "North Carolina", NE: "Nebraska", NH: "New Hampshire", NJ: "New Jersey",
  NV: "Nevada", NY: "New York", OH: "Ohio", OK: "Oklahoma", OR: "Oregon",
  PA: "Pennsylvania", SC: "South Carolina", TN: "Tennessee", TX: "Texas",
  UT: "Utah", VA: "Virginia", WA: "Washington", WI: "Wisconsin",
};

const seeds: MetroSeed[] = [
  ["Dallas-Fort Worth-Arlington, TX", 19100, 66179, "Dallas", "TX"],
  ["Houston-Pasadena-The Woodlands, TX", 26420, 65075, "Houston", "TX"],
  ["New York-Newark-Jersey City, NY-NJ", 35620, 44444, "New York", "NY"],
  ["Phoenix-Mesa-Chandler, AZ", 38060, 39699, "Phoenix", "AZ"],
  ["Atlanta-Sandy Springs-Roswell, GA", 12060, 33670, "Atlanta", "GA"],
  ["Orlando-Kissimmee-Sanford, FL", 36740, 27845, "Orlando", "FL"],
  ["Los Angeles-Long Beach-Anaheim, CA", 31080, 27242, "Los Angeles", "CA"],
  ["Miami-Fort Lauderdale-West Palm Beach, FL", 33100, 23453, "Miami", "FL"],
  ["Charlotte-Concord-Gastonia, NC-SC", 16740, 22233, "Charlotte", "NC"],
  ["Nashville-Davidson--Murfreesboro--Franklin, TN", 34980, 19203, "Nashville", "TN"],
  ["Washington-Arlington-Alexandria, DC-VA-MD-WV", 47900, 17990, "Washington", "VA"],
  ["North Port-Bradenton-Sarasota, FL", 35840, 17642, "North Port", "FL"],
  ["Raleigh-Cary, NC", 39580, 17543, "Raleigh", "NC"],
  ["Denver-Aurora-Centennial, CO", 19740, 15948, "Denver", "CO"],
  ["Riverside-San Bernardino-Ontario, CA", 40140, 15937, "Riverside", "CA"],
  ["Chicago-Naperville-Elgin, IL-IN", 16980, 15778, "Chicago", "IL"],
  ["Columbus, OH", 18140, 15757, "Columbus", "OH"],
  ["Seattle-Tacoma-Bellevue, WA", 42660, 15659, "Seattle", "WA"],
  ["Minneapolis-St. Paul-Bloomington, MN-WI", 33460, 14516, "Minneapolis", "MN"],
  ["Las Vegas-Henderson-North Las Vegas, NV", 29820, 14466, "Las Vegas", "NV"],
  ["Cape Coral-Fort Myers, FL", 15980, 13547, "Cape Coral", "FL"],
  ["Jacksonville, FL", 27260, 13455, "Jacksonville", "FL"],
  ["Philadelphia-Camden-Wilmington, PA-NJ-DE-MD", 37980, 12900, "Philadelphia", "PA"],
  ["Indianapolis-Carmel-Greenwood, IN", 26900, 11463, "Indianapolis", "IN"],
  ["Sacramento-Roseville-Folsom, CA", 40900, 10689, "Sacramento", "CA"],
  ["San Antonio-New Braunfels, TX", 41700, 10546, "San Antonio", "TX"],
  ["Boston-Cambridge-Newton, MA-NH", 14460, 10072, "Boston", "MA"],
  ["Kansas City, MO-KS", 28140, 9893, "Kansas City", "MO"],
  ["Boise City, ID", 14260, 9438, "Boise", "ID"],
  ["Detroit-Warren-Dearborn, MI", 19820, 8805, "Detroit", "MI"],
  ["Oklahoma City, OK", 36420, 8576, "Oklahoma City", "OK"],
  ["Portland-Vancouver-Hillsboro, OR-WA", 38900, 8318, "Portland", "OR"],
  ["Greenville-Anderson-Greer, SC", 24860, 8255, "Greenville", "SC"],
  ["Lakeland-Winter Haven, FL", 29460, 8236, "Lakeland", "FL"],
  ["Knoxville, TN", 28940, 7855, "Knoxville", "TN"],
  ["San Francisco-Oakland-Fremont, CA", 41860, 7750, "San Francisco", "CA"],
  ["Salt Lake City-Murray, UT", 41620, 7702, "Salt Lake City", "UT"],
  ["Provo-Orem-Lehi, UT", 39340, 7304, "Provo", "UT"],
  ["McAllen-Edinburg-Mission, TX", 32580, 7301, "McAllen", "TX"],
  ["Cincinnati, OH-KY-IN", 17140, 7264, "Cincinnati", "OH"],
  ["Madison, WI", 31540, 6947, "Madison", "WI"],
  ["Myrtle Beach-Conway-North Myrtle Beach, SC", 34820, 6511, "Myrtle Beach", "SC"],
  ["Omaha, NE-IA", 36540, 6377, "Omaha", "NE"],
  ["Des Moines-West Des Moines, IA", 19780, 6249, "Des Moines", "IA"],
  ["Louisville-Jefferson County, KY-IN", 31140, 6103, "Louisville", "KY"],
  ["Durham-Chapel Hill, NC", 20500, 6100, "Durham", "NC"],
  ["Columbia, SC", 17900, 6070, "Columbia", "SC"],
  ["St. Louis, MO-IL", 41180, 6066, "St. Louis", "MO"],
  ["Baltimore-Columbia-Towson, MD", 12580, 5799, "Baltimore", "MD"],
  ["Pittsburgh, PA", 38300, 5797, "Pittsburgh", "PA"],
];

const slugify = (value: string) => value
  .normalize("NFKD")
  .replace(/\p{M}/gu, "")
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-|-$/g, "");

const planningLenses = [
  "Start with a disciplined project brief: occupancy, alteration boundary, existing records, and the authority's current submittal checklist.",
  "The useful first move is an existing-condition record that separates verified dimensions from assumptions before design decisions are made.",
  "A strong permit path connects the scope narrative, drawing index, design criteria, calculations, and revision history instead of treating them as separate files.",
  "Early coordination should identify interfaces among architecture, structure, building systems, utilities, and site work before a late drawing change propagates.",
  "The design team should establish decision ownership, information gaps, and review milestones before committing to a document set.",
];
const coordinationLenses = [
  "Coordination is most reliable when each load, equipment connection, opening, and clearance can be traced to both a drawing location and a calculation input.",
  "Review the background set for scale, dimensions, equipment schedules, details, and field evidence; a polished PDF does not resolve missing design basis.",
  "A comment matrix can distinguish an engineering revision from an owner decision, a missing record, and a question that only the authority can answer.",
  "Constructability improves when the engineer checks clearances, access, sequencing, support conditions, and interfaces rather than designing each discipline in isolation.",
  "Document control matters: identify the governing revision, preserve superseded assumptions, and show how a change affects connected drawings and calculations.",
];
const documentationLenses = [
  "The final package should explain assumptions, applicable criteria, scope boundaries, and unresolved items in language a reviewer and builder can follow.",
  "Calculations are useful when they expose inputs, methods, combinations, checks, and conclusions instead of presenting an unexplained output.",
  "A coordinated submission pairs notes and schedules with the sheets they govern, making it easier to verify that the written scope matches the illustrated work.",
  "Revision responses should quote the original issue, identify the changed document, and state the technical resolution without implying that approval is automatic.",
  "A responsible record makes clear which information came from the owner, which was observed, which was designed, and which still needs confirmation.",
];
const deliveryLenses = [
  "A practical delivery sequence is intake, evidence review, criteria confirmation, design, interdisciplinary check, controlled issue, and response support.",
  "Schedule conversations should identify dependencies and review cycles rather than promise a universal turnaround for an unknown scope.",
  "The next useful action is a focused intake: project address, drawings, photographs or measurements, equipment data, prior comments, and requested deliverables.",
  "Quality control benefits from a final cross-check of sheet references, calculations, schedules, professional responsibility, and file naming before submission.",
  "A project-specific proposal should describe inclusions, exclusions, assumptions, and client decisions so the engineering work remains legible through construction.",
];

export const PHASE1_METROS: Phase1Metro[] = seeds.map((seed, index) => {
  const [metroName, cbsaCode, permitTotal2025, representativeCity, representativeState] = seed;
  const stateName = stateNames[representativeState] ?? representativeState;
  return {
    slug: slugify(metroName),
    metroName,
    cbsaCode,
    metroCode: 2,
    permitTotal2025,
    rank: index + 1,
    representativeCity,
    representativeState: stateName,
    sourceUrl: PHASE1_SOURCE_URL,
    editorial: {
      planningLens: planningLenses[index % planningLenses.length],
      coordinationLens: coordinationLenses[(index + 1) % coordinationLenses.length],
      documentationLens: documentationLenses[(index + 2) % documentationLenses.length],
      deliveryLens: deliveryLenses[(index + 3) % deliveryLenses.length],
    },
  };
});

export const PHASE1_SERVICE_SLUGS = [
  "permit-guide",
  "structural-engineering",
  "mep-engineering",
  "pe-stamp",
  "plan-check-corrections",
  "energy-compliance",
  "engineering-calculations",
] as const;

export type Phase1ServiceSlug = (typeof PHASE1_SERVICE_SLUGS)[number];

if (PHASE1_METROS.length !== 50 || new Set(PHASE1_METROS.map((metro) => metro.cbsaCode)).size !== 50) {
  throw new Error("Phase 1 metro corpus must contain exactly 50 unique CBSA records");
}