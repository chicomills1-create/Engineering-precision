/**
 * Phase 3 metro corpus.
 *
 * These records are the Census BPS final annual 2025 "MSA Units Ann"
 * Metro / Micro Code 2 records ranked 101 through 150 by Total descending.
 * The corpus uses the same reviewed eligibility footprint as Phases 1 and 2:
 * Alaska and territories are excluded, as are records outside that footprint.
 */

export const PHASE3_SOURCE_URL =
  "https://www.census.gov/construction/bps/xls/cbsaannual_202599.xls";
export const PHASE3_SHEET = "MSA Units Ann";

export type Phase3Metro = {
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
  AL: "Alabama", CA: "California", CO: "Colorado", CT: "Connecticut",
  DE: "Delaware", GA: "Georgia", ID: "Idaho", IL: "Illinois", IN: "Indiana",
  IA: "Iowa", KY: "Kentucky", LA: "Louisiana", MA: "Massachusetts",
  MD: "Maryland", MI: "Michigan", MN: "Minnesota", MS: "Mississippi",
  NC: "North Carolina", ND: "North Dakota", NJ: "New Jersey", NY: "New York",
  OH: "Ohio", OR: "Oregon", PA: "Pennsylvania", SC: "South Carolina",
  TN: "Tennessee", TX: "Texas", VA: "Virginia", VT: "Vermont", WA: "Washington",
  WI: "Wisconsin",
};

const seeds: MetroSeed[] = [
  ["Syracuse, NY", 45060, 2041, "Syracuse", "NY"],
  ["Burlington, NC", 15500, 2027, "Burlington", "NC"],
  ["Boulder, CO", 14500, 2001, "Boulder", "CO"],
  ["Gainesville, GA", 23580, 1996, "Gainesville", "GA"],
  ["Dayton-Kettering-Beavercreek, OH", 19430, 1986, "Dayton", "OH"],
  ["Allentown-Bethlehem-Easton, PA-NJ", 10900, 1974, "Allentown", "PA"],
  ["Sherman-Denison, TX", 43300, 1881, "Sherman", "TX"],
  ["Bremerton-Silverdale-Port Orchard, WA", 14740, 1780, "Bremerton", "WA"],
  ["Rochester, NY", 40380, 1750, "Rochester", "NY"],
  ["Coeur dAlene, ID", 17660, 1705, "Coeur d'Alene", "ID"],
  ["New Orleans-Metairie, LA", 35380, 1694, "New Orleans", "LA"],
  ["Worcester, MA", 49340, 1690, "Worcester", "MA"],
  ["Olympia-Lacey-Tumwater, WA", 36500, 1669, "Olympia", "WA"],
  ["Fort Wayne, IN", 23060, 1641, "Fort Wayne", "IN"],
  ["Hagerstown-Martinsburg, MD-WV", 25180, 1624, "Hagerstown", "MD"],
  ["Atlantic City-Hammonton, NJ", 12100, 1613, "Atlantic City", "NJ"],
  ["Oxnard-Thousand Oaks-Ventura, CA", 37100, 1609, "Oxnard", "CA"],
  ["York-Hanover, PA", 49620, 1589, "York", "PA"],
  ["Auburn-Opelika, AL", 12220, 1581, "Auburn", "AL"],
  ["Jackson, MS", 27140, 1568, "Jackson", "MS"],
  ["Idaho Falls, ID", 26820, 1540, "Idaho Falls", "ID"],
  ["Hartford-West Hartford-East Hartford, CT", 25540, 1504, "Hartford", "CT"],
  ["Fargo, ND-MN", 22020, 1498, "Fargo", "ND"],
  ["Buffalo-Cheektowaga, NY", 15380, 1484, "Buffalo", "NY"],
  ["Bowling Green, KY", 14540, 1470, "Bowling Green", "KY"],
  ["Salem, OR", 41420, 1426, "Salem", "OR"],
  ["Green Bay, WI", 24580, 1413, "Green Bay", "WI"],
  ["Warner Robins, GA", 47580, 1357, "Warner Robins", "GA"],
  ["Midland, TX", 33260, 1322, "Midland", "TX"],
  ["Greenville, NC", 24780, 1285, "Greenville", "NC"],
  ["Athens-Clarke County, GA", 12020, 1278, "Athens", "GA"],
  ["Iowa City, IA", 26980, 1266, "Iowa City", "IA"],
  ["Appleton, WI", 11540, 1264, "Appleton", "WI"],
  ["Dover, DE", 20100, 1261, "Dover", "DE"],
  ["Bloomington, IN", 14020, 1261, "Bloomington", "IN"],
  ["Burlington-South Burlington, VT", 15540, 1258, "Burlington", "VT"],
  ["Modesto, CA", 33700, 1205, "Modesto", "CA"],
  ["Harrisburg-Carlisle, PA", 25420, 1201, "Harrisburg", "PA"],
  ["Trenton-Princeton, NJ", 45940, 1164, "Trenton", "NJ"],
  ["Hammond, LA", 25220, 1163, "Hammond", "LA"],
  ["Abilene, TX", 10180, 1160, "Abilene", "TX"],
  ["Kingsport-Bristol, TN-VA", 28700, 1156, "Kingsport", "TN"],
  ["Mobile, AL", 33660, 1102, "Mobile", "AL"],
  ["Slidell-Mandeville-Covington, LA", 43640, 1096, "Slidell", "LA"],
  ["Ann Arbor, MI", 11460, 1088, "Ann Arbor", "MI"],
  ["Pinehurst-Southern Pines, NC", 38240, 1077, "Pinehurst", "NC"],
  ["Montgomery, AL", 33860, 1073, "Montgomery", "AL"],
  ["Chambersburg, PA", 16540, 1033, "Chambersburg", "PA"],
  ["Shreveport-Bossier City, LA", 43340, 1029, "Shreveport", "LA"],
  ["New Haven, CT", 35300, 1020, "New Haven", "CT"],
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

export const PHASE3_METROS: Phase3Metro[] = seeds.map((seed, index) => {
  const [metroName, cbsaCode, permitTotal2025, representativeCity, representativeState] = seed;
  return {
    slug: slugify(metroName),
    metroName,
    cbsaCode,
    metroCode: 2,
    permitTotal2025,
    rank: index + 101,
    representativeCity,
    representativeState: stateNames[representativeState] ?? representativeState,
    sourceUrl: PHASE3_SOURCE_URL,
    editorial: {
      planningLens: planningLenses[index % planningLenses.length],
      coordinationLens: coordinationLenses[(index + 1) % coordinationLenses.length],
      documentationLens: documentationLenses[(index + 2) % documentationLenses.length],
      deliveryLens: deliveryLenses[(index + 3) % deliveryLenses.length],
    },
  };
});

export const PHASE3_SERVICE_SLUGS = [
  "permit-guide",
  "structural-engineering",
  "mep-engineering",
  "pe-stamp",
  "plan-check-corrections",
  "energy-compliance",
  "engineering-calculations",
] as const;

export type Phase3ServiceSlug = (typeof PHASE3_SERVICE_SLUGS)[number];

if (
  PHASE3_METROS.length !== 50
  || new Set(PHASE3_METROS.map((metro) => metro.cbsaCode)).size !== 50
  || new Set(PHASE3_METROS.map((metro) => metro.slug)).size !== 50
  || PHASE3_METROS.some((metro) => metro.rank < 101 || metro.rank > 150)
  || PHASE3_METROS.some((metro) => /\bAK\b|Alaska/i.test(metro.metroName))
) {
  throw new Error("Phase 3 metro corpus must contain exactly 50 unique eligible CBSA records ranked 101-150");
}