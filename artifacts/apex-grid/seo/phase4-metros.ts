/**
 * Phase 4 metro corpus.
 *
 * These records are the Census BPS final annual 2025 "MSA Units Ann"
 * Metro / Micro Code 2 records ranked 151 through 200 by Total descending
 * after applying the reviewed eligibility footprint used by Phases 1-3.
 * Alaska and territories are excluded, as are all earlier phase records.
 */

export const PHASE4_SOURCE_URL =
  "https://www.census.gov/construction/bps/xls/cbsaannual_202599.xls";
export const PHASE4_SHEET = "MSA Units Ann";

export type Phase4Metro = {
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
  AL: "Alabama", AR: "Arkansas", CA: "California", CT: "Connecticut",
  GA: "Georgia", IA: "Iowa", IL: "Illinois", IN: "Indiana", LA: "Louisiana",
  MA: "Massachusetts", MD: "Maryland", MI: "Michigan", MN: "Minnesota",
  MO: "Missouri", NC: "North Carolina", NE: "Nebraska", NH: "New Hampshire", NM: "New Mexico",
  NV: "Nevada", OH: "Ohio", OR: "Oregon", PA: "Pennsylvania", SD: "South Dakota",
  TN: "Tennessee", TX: "Texas", UT: "Utah", VA: "Virginia", WA: "Washington",
  WI: "Wisconsin",
};

const seeds: MetroSeed[] = [
  ["Jonesboro, AR", 27860, 1017, "Jonesboro", "AR"],
  ["Staunton-Stuarts Draft, VA", 44420, 995, "Staunton", "VA"],
  ["Amarillo, TX", 11100, 994, "Amarillo", "TX"],
  ["Cedar Rapids, IA", 16300, 987, "Cedar Rapids", "IA"],
  ["Rapid City, SD", 39660, 958, "Rapid City", "SD"],
  ["Eau Claire, WI", 20740, 946, "Eau Claire", "WI"],
  ["Medford, OR", 32780, 944, "Medford", "OR"],
  ["Cleveland, TN", 17420, 938, "Cleveland", "TN"],
  ["Odessa, TX", 36220, 921, "Odessa", "TX"],
  ["Johnson City, TN", 27740, 915, "Johnson City", "TN"],
  ["Champaign-Urbana, IL", 16580, 913, "Champaign", "IL"],
  ["Winchester, VA-WV", 49020, 904, "Winchester", "VA"],
  ["Kenosha, WI", 28450, 892, "Kenosha", "WI"],
  ["Vallejo, CA", 46700, 881, "Vallejo", "CA"],
  ["Lansing-East Lansing, MI", 29620, 861, "Lansing", "MI"],
  ["Harrisonburg, VA", 25500, 847, "Harrisonburg", "VA"],
  ["Las Cruces, NM", 29740, 833, "Las Cruces", "NM"],
  ["Evansville, IN", 21780, 825, "Evansville", "IN"],
  ["Columbia, MO", 17860, 825, "Columbia", "MO"],
  ["Yuba City, CA", 49700, 821, "Yuba City", "CA"],
  ["St. Cloud, MN", 41060, 787, "St. Cloud", "MN"],
  ["Merced, CA", 32900, 780, "Merced", "CA"],
  ["Elkhart-Goshen, IN", 21140, 777, "Elkhart", "IN"],
  ["South Bend-Mishawaka, IN-MI", 43780, 751, "South Bend", "IN"],
  ["Akron, OH", 10420, 751, "Akron", "OH"],
  ["Rochester, MN", 40340, 734, "Rochester", "MN"],
  ["Oshkosh-Neenah, WI", 36780, 682, "Oshkosh", "WI"],
  ["Racine-Mount Pleasant, WI", 39540, 667, "Racine", "WI"],
  ["Duluth, MN-WI", 20260, 647, "Duluth", "MN"],
  ["Canton-Massillon, OH", 15940, 643, "Canton", "OH"],
  ["Manchester-Nashua, NH", 31700, 632, "Manchester", "NH"],
  ["Hinesville, GA", 25980, 630, "Hinesville", "GA"],
  ["Barnstable Town, MA", 12700, 630, "Barnstable", "MA"],
  ["Joplin, MO-KS", 27900, 620, "Joplin", "MO"],
  ["Columbus, GA-AL", 17980, 605, "Columbus", "GA"],
  ["Davenport-Moline-Rock Island, IA-IL", 19340, 595, "Davenport", "IA"],
  ["Dothan, AL", 20020, 590, "Dothan", "AL"],
  ["Morristown, TN", 34100, 589, "Morristown", "TN"],
  ["Reading, PA", 39740, 582, "Reading", "PA"],
  ["Carson City, NV", 16180, 573, "Carson City", "NV"],
  ["Sioux City, IA-NE-SD", 43580, 559, "Sioux City", "IA"],
  ["Dalton, GA", 19140, 550, "Dalton", "GA"],
  ["Lake Charles, LA", 29340, 546, "Lake Charles", "LA"],
  ["Tyler, TX", 46340, 543, "Tyler", "TX"],
  ["Lebanon, PA", 30140, 542, "Lebanon", "PA"],
  ["Rocky Mount, NC", 40580, 536, "Rocky Mount", "NC"],
  ["Monroe, LA", 33740, 530, "Monroe", "LA"],
  ["Waterbury-Shelton, CT", 47930, 513, "Waterbury", "CT"],
  ["Macon-Bibb County, GA", 31420, 511, "Macon", "GA"],
  ["Hanford-Corcoran, CA", 25260, 507, "Hanford", "CA"],
];

const slugify = (value: string) => value
  .normalize("NFKD")
  .replace(/\p{M}/gu, "")
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-|-$/g, "");

const planningLenses = [
  "Begin with a defined project brief that records occupancy, alteration limits, existing evidence, and the current filing questions for the responsible authority.",
  "An existing-condition record should distinguish verified dimensions, owner-provided information, field observations, and assumptions before engineering decisions are made.",
  "A durable permit path joins the scope narrative, drawing index, design criteria, calculations, and revision history instead of treating each file as an isolated deliverable.",
  "Early coordination should expose interfaces among architecture, structure, building systems, utilities, and site work before a change reaches several disciplines.",
  "Before design begins, identify decision ownership, missing inputs, document milestones, and the questions that require project-specific professional judgment.",
];
const coordinationLenses = [
  "Trace each load, equipment connection, opening, and clearance to a drawing location and to the calculation or field evidence supporting that decision.",
  "Review scale, dimensions, equipment schedules, details, and field evidence in the background set; a polished PDF does not supply a missing design basis.",
  "Use a comment matrix to separate an engineering revision from an owner decision, a missing record, a discipline handoff, and an interpretation question for the authority.",
  "Constructability improves when clearances, access, sequencing, support conditions, and interfaces are checked across disciplines rather than in isolation.",
  "Document control should identify the governing revision, preserve superseded assumptions, and show how a change affects connected drawings and calculations.",
];
const documentationLenses = [
  "The issued package should explain assumptions, criteria, scope boundaries, and unresolved items in language a reviewer and builder can both follow.",
  "Calculations are reviewable when they expose inputs, methods, combinations, checks, and conclusions rather than presenting an unexplained result.",
  "Pair notes and schedules with the sheets they govern so the written scope can be checked against the illustrated work and equipment information.",
  "A correction response should quote the original issue, identify the changed document, and state the technical resolution without implying automatic approval.",
  "A responsible record distinguishes owner information, observed conditions, design decisions, and information that still needs confirmation.",
];
const deliveryLenses = [
  "A practical delivery sequence is intake, evidence review, criteria confirmation, design, interdisciplinary check, controlled issue, and response support.",
  "Schedule discussions should identify dependencies and review cycles rather than promise a universal turnaround for an unknown scope.",
  "The next useful action is a focused intake with address, drawings, photographs or measurements, equipment data, prior comments, and requested deliverables.",
  "Quality control benefits from a final cross-check of sheet references, calculations, schedules, professional responsibility, and file naming before submission.",
  "A project-specific proposal should describe inclusions, exclusions, assumptions, and client decisions so the engineering work remains legible through construction.",
];

export const PHASE4_METROS: Phase4Metro[] = seeds.map((seed, index) => {
  const [metroName, cbsaCode, permitTotal2025, representativeCity, representativeState] = seed;
  return {
    slug: slugify(metroName),
    metroName,
    cbsaCode,
    metroCode: 2,
    permitTotal2025,
    rank: index + 151,
    representativeCity,
    representativeState: stateNames[representativeState] ?? representativeState,
    sourceUrl: PHASE4_SOURCE_URL,
    editorial: {
      planningLens: planningLenses[index % planningLenses.length],
      coordinationLens: coordinationLenses[(index + 1) % coordinationLenses.length],
      documentationLens: documentationLenses[(index + 2) % documentationLenses.length],
      deliveryLens: deliveryLenses[(index + 3) % deliveryLenses.length],
    },
  };
});

export const PHASE4_SERVICE_SLUGS = [
  "permit-guide",
  "structural-engineering",
  "mep-engineering",
  "pe-stamp",
  "plan-check-corrections",
  "energy-compliance",
  "engineering-calculations",
] as const;

export type Phase4ServiceSlug = (typeof PHASE4_SERVICE_SLUGS)[number];

if (
  PHASE4_METROS.length !== 50
  || new Set(PHASE4_METROS.map((metro) => metro.cbsaCode)).size !== 50
  || new Set(PHASE4_METROS.map((metro) => metro.slug)).size !== 50
  || PHASE4_METROS.some((metro) => metro.rank < 151 || metro.rank > 200)
  || PHASE4_METROS.some((metro) => /\bAK\b|Alaska|Puerto Rico|Virgin Islands|Guam/i.test(metro.metroName))
) {
  throw new Error("Phase 4 metro corpus must contain exactly 50 unique eligible CBSA records ranked 151-200");
}