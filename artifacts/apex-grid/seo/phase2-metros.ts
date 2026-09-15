/**
 * Phase 2 metro corpus.
 *
 * These records are the Census BPS final annual 2025 "MSA Units Ann"
 * Metro / Micro Code 2 records ranked 51 through 100 by Total descending.
 * The corpus excludes Alaska and territories and therefore intersects the
 * same reviewed eligibility footprint as Phase 1.  The representative
 * city is only a readable label for the Census record; it does not assert a
 * local office, project, county, or authority fact.
 */

export const PHASE2_SOURCE_URL =
  "https://www.census.gov/construction/bps/xls/cbsaannual_202599.xls";
export const PHASE2_SHEET = "MSA Units Ann";

export type Phase2Metro = {
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
  AL: "Alabama", AZ: "Arizona", AR: "Arkansas", CA: "California", CO: "Colorado",
  CT: "Connecticut", FL: "Florida", GA: "Georgia", IN: "Indiana", KS: "Kansas",
  KY: "Kentucky", LA: "Louisiana", ME: "Maine", MD: "Maryland", MA: "Massachusetts",
  MI: "Michigan", MO: "Missouri", NC: "North Carolina", NE: "Nebraska",
  NM: "New Mexico", NV: "Nevada", NY: "New York", OH: "Ohio", OK: "Oklahoma", OR: "Oregon",
  RI: "Rhode Island", SC: "South Carolina", TN: "Tennessee", TX: "Texas",
  UT: "Utah", VA: "Virginia", WA: "Washington", WI: "Wisconsin",
};

const seeds: MetroSeed[] = [
  ["San Jose-Sunnyvale-Santa Clara, CA", 41940, 5570, "San Jose", "CA"],
  ["Deltona-Daytona Beach-Ormond Beach, FL", 19660, 5412, "Deltona", "FL"],
  ["Savannah, GA", 42340, 5371, "Savannah", "GA"],
  ["Tulsa, OK", 46140, 5154, "Tulsa", "OK"],
  ["Port St. Lucie, FL", 38940, 4853, "Port St. Lucie", "FL"],
  ["Winston-Salem, NC", 49180, 4699, "Winston-Salem", "NC"],
  ["Tucson, AZ", 46060, 4658, "Tucson", "AZ"],
  ["Huntsville, AL", 26620, 4519, "Huntsville", "AL"],
  ["Spartanburg, SC", 43900, 4359, "Spartanburg", "SC"],
  ["Baton Rouge, LA", 12940, 4314, "Baton Rouge", "LA"],
  ["Grand Rapids-Wyoming-Kentwood, MI", 24340, 4267, "Grand Rapids", "MI"],
  ["Birmingham, AL", 13820, 4219, "Birmingham", "AL"],
  ["Cleveland, OH", 17410, 4174, "Cleveland", "OH"],
  ["Lafayette-West Lafayette, IN", 29200, 4058, "Lafayette", "IN"],
  ["Virginia Beach-Chesapeake-Norfolk, VA-NC", 47260, 3953, "Virginia Beach", "VA"],
  ["Greensboro-High Point, NC", 24660, 3830, "Greensboro", "NC"],
  ["Gainesville, FL", 23540, 3674, "Gainesville", "FL"],
  ["Ogden, UT", 36260, 3599, "Ogden", "UT"],
  ["Fresno, CA", 23420, 3518, "Fresno", "CA"],
  ["Wildwood-The Villages, FL", 48680, 3516, "Wildwood", "FL"],
  ["Portland-South Portland, ME", 38860, 3487, "Portland", "ME"],
  ["Bridgeport-Stamford-Danbury, CT", 14860, 3478, "Bridgeport", "CT"],
  ["Memphis, TN-MS-AR", 32820, 3298, "Memphis", "TN"],
  ["Asheville, NC", 11700, 3238, "Asheville", "NC"],
  ["Spokane-Spokane Valley, WA", 44060, 3172, "Spokane", "WA"],
  ["Little Rock-North Little Rock-Conway, AR", 30780, 3142, "Little Rock", "AR"],
  ["Hickory-Lenoir-Morganton, NC", 25860, 3136, "Hickory", "NC"],
  ["Wichita, KS", 48620, 3111, "Wichita", "KS"],
  ["Milwaukee-Waukesha, WI", 33340, 3105, "Milwaukee", "WI"],
  ["Punta Gorda, FL", 39460, 3015, "Punta Gorda", "FL"],
  ["Greeley, CO", 24540, 2993, "Greeley", "CO"],
  ["Chattanooga, TN-GA", 16860, 2958, "Chattanooga", "TN"],
  ["Reno, NV", 39900, 2951, "Reno", "NV"],
  ["Providence-Warwick, RI-MA", 39300, 2894, "Providence", "RI"],
  ["Lubbock, TX", 31180, 2869, "Lubbock", "TX"],
  ["Albuquerque, NM", 10740, 2830, "Albuquerque", "NM"],
  ["Tallahassee, FL", 45220, 2742, "Tallahassee", "FL"],
  ["Naples-Marco Island, FL", 34940, 2736, "Naples", "FL"],
  ["Brownsville-Harlingen, TX", 15180, 2702, "Brownsville", "TX"],
  ["Daphne-Fairhope-Foley, AL", 19300, 2665, "Daphne", "AL"],
  ["Stockton-Lodi, CA", 44700, 2522, "Stockton", "CA"],
  ["Kennewick-Richland, WA", 28420, 2431, "Kennewick", "WA"],
  ["Lincoln, NE", 30700, 2402, "Lincoln", "NE"],
  ["Lexington-Fayette, KY", 30460, 2327, "Lexington", "KY"],
  ["Kiryas Joel-Poughkeepsie-Newburgh, NY", 28880, 2220, "Kiryas Joel", "NY"],
  ["Corpus Christi, TX", 18580, 2116, "Corpus Christi", "TX"],
  ["Fayetteville, NC", 22180, 2105, "Fayetteville", "NC"],
  ["Lafayette, LA", 29180, 2063, "Lafayette", "LA"],
  ["El Paso, TX", 21340, 2050, "El Paso", "TX"],
  ["Albany-Schenectady-Troy, NY", 10580, 2047, "Albany", "NY"],
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

export const PHASE2_METROS: Phase2Metro[] = seeds.map((seed, index) => {
  const [metroName, cbsaCode, permitTotal2025, representativeCity, representativeState] = seed;
  return {
    slug: slugify(metroName),
    metroName,
    cbsaCode,
    metroCode: 2,
    permitTotal2025,
    rank: index + 51,
    representativeCity,
    representativeState: stateNames[representativeState] ?? representativeState,
    sourceUrl: PHASE2_SOURCE_URL,
    editorial: {
      planningLens: planningLenses[index % planningLenses.length],
      coordinationLens: coordinationLenses[(index + 1) % coordinationLenses.length],
      documentationLens: documentationLenses[(index + 2) % documentationLenses.length],
      deliveryLens: deliveryLenses[(index + 3) % deliveryLenses.length],
    },
  };
});

export const PHASE2_SERVICE_SLUGS = [
  "permit-guide",
  "structural-engineering",
  "mep-engineering",
  "pe-stamp",
  "plan-check-corrections",
  "energy-compliance",
  "engineering-calculations",
] as const;

export type Phase2ServiceSlug = (typeof PHASE2_SERVICE_SLUGS)[number];

if (
  PHASE2_METROS.length !== 50
  || new Set(PHASE2_METROS.map((metro) => metro.cbsaCode)).size !== 50
  || new Set(PHASE2_METROS.map((metro) => metro.slug)).size !== 50
  || PHASE2_METROS.some((metro) => metro.rank < 51 || metro.rank > 100)
  || PHASE2_METROS.some((metro) => /\bAK\b|Alaska/i.test(metro.metroName))
) {
  throw new Error("Phase 2 metro corpus must contain exactly 50 unique eligible CBSA records ranked 51-100");
}