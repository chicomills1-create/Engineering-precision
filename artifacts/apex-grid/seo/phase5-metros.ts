/**
 * Phase 5 metro corpus: the next 50 highest-permit eligible Census Metro Code 2
 * records after removing every CBSA already used in Phases 1–4.
 */
import { PHASE4_METROS } from "./phase4-metros";

export const PHASE5_SOURCE_URL =
  "https://www.census.gov/construction/bps/xls/cbsaannual_202599.xls";
export const PHASE5_SHEET = "MSA Units Ann";

export type Phase5Metro = {
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
  AL: "Alabama", AR: "Arkansas", CA: "California", CO: "Colorado",
  CT: "Connecticut", FL: "Florida", GA: "Georgia", IA: "Iowa",
  IL: "Illinois", IN: "Indiana", KS: "Kansas", KY: "Kentucky",
  MA: "Massachusetts", MD: "Maryland", ME: "Maine", MI: "Michigan",
  MN: "Minnesota", MO: "Missouri", NM: "New Mexico", NY: "New York",
  OH: "Ohio", OK: "Oklahoma", OR: "Oregon", PA: "Pennsylvania",
  SC: "South Carolina", WA: "Washington", WI: "Wisconsin", WV: "West Virginia",
};

const seeds: MetroSeed[] = [
  ["Santa Fe, NM", 42140, 495, "Santa Fe", "NM"],
  ["Elizabethtown, KY", 21060, 491, "Elizabethtown", "KY"],
  ["Kalamazoo-Portage, MI", 28020, 487, "Kalamazoo", "MI"],
  ["Corvallis, OR", 18700, 484, "Corvallis", "OR"],
  ["Gettysburg, PA", 23900, 476, "Gettysburg", "PA"],
  ["Ithaca, NY", 27060, 471, "Ithaca", "NY"],
  ["Santa Cruz-Watsonville, CA", 42100, 470, "Santa Cruz", "CA"],
  ["Lewiston-Auburn, ME", 30340, 453, "Lewiston", "ME"],
  ["Muskegon-Norton Shores, MI", 34740, 451, "Muskegon", "MI"],
  ["Flint, MI", 22420, 444, "Flint", "MI"],
  ["Norwich-New London-Willimantic, CT", 35980, 440, "New London", "CT"],
  ["Lexington Park, MD", 30500, 439, "Lexington Park", "MD"],
  ["Kingston, NY", 28740, 434, "Kingston", "NY"],
  ["Decatur, AL", 19460, 406, "Decatur", "AL"],
  ["Florence-Muscle Shoals, AL", 22520, 400, "Florence", "AL"],
  ["Ames, IA", 11180, 392, "Ames", "IA"],
  ["Janesville-Beloit, WI", 27500, 388, "Janesville", "WI"],
  ["Springfield, OH", 44220, 387, "Springfield", "OH"],
  ["Lawrence, KS", 29940, 377, "Lawrence", "KS"],
  ["Rockford, IL", 40420, 377, "Rockford", "IL"],
  ["Mount Vernon-Anacortes, WA", 34580, 373, "Mount Vernon", "WA"],
  ["Niles, MI", 35660, 372, "Niles", "MI"],
  ["Napa, CA", 34900, 364, "Napa", "CA"],
  ["Sumter, SC", 44940, 358, "Sumter", "SC"],
  ["Mankato, MN", 31860, 356, "Mankato", "MN"],
  ["Wausau, WI", 48140, 348, "Wausau", "WI"],
  ["Rome, GA", 40660, 330, "Rome", "GA"],
  ["Muncie, IN", 34620, 328, "Muncie", "IN"],
  ["Glens Falls, NY", 24020, 327, "Glens Falls", "NY"],
  ["Hot Springs, AR", 26300, 326, "Hot Springs", "AR"],
  ["Sandusky, OH", 41780, 325, "Sandusky", "OH"],
  ["Springfield, MA", 44140, 318, "Springfield", "MA"],
  ["State College, PA", 44300, 314, "State College", "PA"],
  ["Huntington-Ashland, WV-KY-OH", 26580, 309, "Huntington", "WV"],
  ["Longview-Kelso, WA", 31020, 308, "Longview", "WA"],
  ["Grants Pass, OR", 24420, 293, "Grants Pass", "OR"],
  ["Amherst Town-Northampton, MA", 11200, 291, "Amherst", "MA"],
  ["Michigan City-La Porte, IN", 33140, 291, "Michigan City", "IN"],
  ["Youngstown-Warren, OH", 49660, 286, "Youngstown", "OH"],
  ["Bloomington, IL", 14010, 269, "Bloomington", "IL"],
  ["Redding, CA", 39820, 254, "Redding", "CA"],
  ["Sebastian-Vero Beach-West Vero Corridor, FL", 42680, 252, "Sebastian", "FL"],
  ["Erie, PA", 21500, 243, "Erie", "PA"],
  ["Springfield, IL", 44100, 235, "Springfield", "IL"],
  ["Peoria, IL", 37900, 234, "Peoria", "IL"],
  ["Pueblo, CO", 39380, 226, "Pueblo", "CO"],
  ["Saginaw, MI", 40980, 210, "Saginaw", "MI"],
  ["Jefferson City, MO", 27620, 206, "Jefferson City", "MO"],
  ["Salisbury, MD", 41540, 205, "Salisbury", "MD"],
  ["Lawton, OK", 30020, 201, "Lawton", "OK"],
];

const slugify = (value: string) => value
  .normalize("NFKD")
  .replace(/\p{M}/gu, "")
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-|-$/g, "");

export const PHASE5_METROS: Phase5Metro[] = seeds.map((seed, index) => {
  const [metroName, cbsaCode, permitTotal2025, representativeCity, representativeState] = seed;
  return {
    slug: slugify(metroName),
    metroName,
    cbsaCode,
    metroCode: 2,
    permitTotal2025,
    rank: index + 201,
    representativeCity,
    representativeState: stateNames[representativeState] ?? representativeState,
    sourceUrl: PHASE5_SOURCE_URL,
    editorial: PHASE4_METROS[index].editorial,
  };
});

export const PHASE5_SERVICE_SLUGS = [
  "permit-guide",
  "structural-engineering",
  "mep-engineering",
  "pe-stamp",
  "plan-check-corrections",
  "energy-compliance",
  "engineering-calculations",
] as const;

export type Phase5ServiceSlug = (typeof PHASE5_SERVICE_SLUGS)[number];

if (
  PHASE5_METROS.length !== 50
  || new Set(PHASE5_METROS.map((metro) => metro.cbsaCode)).size !== 50
  || new Set(PHASE5_METROS.map((metro) => metro.slug)).size !== 50
  || PHASE5_METROS.some((metro) => metro.rank < 201 || metro.rank > 250)
  || PHASE5_METROS.some((metro) => /(?:,|-)\s*(?:AK|PR)(?:-|$)|Alaska|Puerto Rico|Virgin Islands|Guam/i.test(metro.metroName))
) {
  throw new Error("Phase 5 metro corpus must contain exactly 50 unique eligible CBSA records ranked 201-250");
}