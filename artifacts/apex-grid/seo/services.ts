import type { StateData } from "./types";
import { ELECTRICAL_SCOPE, STAMPING_SCOPE } from "./city-depth-pages";

export interface ServiceDef {
  slug: string;
  name: string; // display name
  shortName: string;
  /** H1 pattern gets " in {State}" appended */
  h1: string;
  metaTitle: (s: StateData) => string;
  metaDescription: (s: StateData) => string;
  /** Which state data sections this service page emphasizes */
  narrativeKey: keyof StateData["narratives"];
  scope: string[]; // scope-of-work bullets (service-generic)
  intro: string; // service-generic positioning sentence
}

export const SERVICES: ServiceDef[] = [
  {
    slug: "mep-engineering",
    name: "MEP Engineering",
    shortName: "MEP",
    h1: "MEP Engineering",
    metaTitle: (s) => `Best MEP Engineer in ${s.name} | Fast Turnaround | Apex Grid Engineering`,
    metaDescription: (s) =>
      `Licensed MEP engineering for ${s.name} commercial projects. HVAC, electrical, and plumbing design engineered for ${s.climate.zones.split(";")[0].split("(")[0].trim()} climate conditions and ${s.abbrev} code requirements.`,
    narrativeKey: "mep",
    scope: [
      "HVAC load calculations and system design",
      "Electrical power distribution and one-line diagrams",
      "Lighting design and controls (interior and site)",
      "Plumbing, gas piping, and medical gas systems",
      "Energy modeling and code compliance documentation",
      "Equipment selection with local climate derating",
    ],
    intro:
      "Coordinated mechanical, electrical, and plumbing design — engineered as one system, stamped by licensed professionals, and documented for fast permit approval.",
  },
  {
    slug: "structural-engineering",
    name: "Structural Engineering",
    shortName: "Structural",
    h1: "Structural Engineering",
    metaTitle: (s) => `Best Structural Engineer in ${s.name} | Fast Turnaround | Apex Grid Engineering`,
    metaDescription: (s) =>
      `Structural engineering for ${s.name}: new design, retrofits, and assessments engineered for ${s.abbrev} seismic, wind, and snow requirements under the adopted ${s.buildingCode.baseCode.split(" with")[0]}.`,
    narrativeKey: "structural",
    scope: [
      "Gravity and lateral system design (steel, concrete, masonry, wood)",
      "Foundation design coordinated with geotechnical reports",
      "Seismic evaluation and retrofit design",
      "Wind and snow load analysis per adopted code",
      "Structural observation and construction administration",
      "Tenant improvement and equipment anchorage calculations",
    ],
    intro:
      "Structural systems designed to the loads your state actually imposes — gravity, seismic, wind, and snow — with drawings built to get approved the first time.",
  },
  {
    slug: "civil-engineering",
    name: "Civil & Site Engineering",
    shortName: "Civil",
    h1: "Civil & Site Engineering",
    metaTitle: (s) => `Best Civil Engineer in ${s.name} | Fast Turnaround | Apex Grid Engineering`,
    metaDescription: (s) =>
      `Civil and site engineering for ${s.name} development: grading, drainage, stormwater management, and utility design aligned with ${s.abbrev} jurisdiction standards and permitting.`,
    narrativeKey: "civil",
    scope: [
      "Site grading and earthwork design",
      "Stormwater management (retention, detention, water quality)",
      "Utility routing and connection design",
      "Erosion control and SWPPP documentation",
      "ADA site accessibility and paving design",
      "Entitlement support and agency coordination",
    ],
    intro:
      "Site engineering that clears local review — grading, drainage, and utilities designed to each jurisdiction's published standards from day one.",
  },
  {
    slug: "energy-code-compliance",
    name: "Energy Code Compliance",
    shortName: "Energy",
    h1: "Energy Code Compliance",
    metaTitle: (s) =>
      s.abbrev === "CA"
        ? `Best Title 24 Energy Consultant in California | Fast Turnaround | Apex Grid Engineering`
        : `Best Energy Engineer in ${s.name} | Fast Turnaround | Apex Grid Engineering`,
    metaDescription: (s) =>
      `Commercial energy code compliance in ${s.name}: ${s.energyCode.commercial.split(";")[0]}. Compliance documentation, energy modeling, and plan-check support from licensed engineers.`,
    narrativeKey: "energy",
    scope: [
      "COMcheck / prescriptive compliance documentation",
      "Whole-building performance energy modeling",
      "Envelope, mechanical, and lighting compliance coordination",
      "Plan-check comment resolution with the AHJ",
      "Above-code and incentive program analysis",
      "Title 24 Part 6 documentation (California projects)",
    ],
    intro:
      "Energy compliance handled as engineering, not paperwork — documentation matched to the exact code edition your permitting jurisdiction enforces.",
  },
  {
    // Depth-wave service (Wave 1): no hand-written narratives exist for this
    // slug — generate.ts composes city/state editorial from the researched
    // records via city-depth-pages.ts (utility, energy code, AHJ, climate).
    slug: "electrical-engineering",
    name: "Electrical Engineering",
    shortName: "Electrical",
    h1: "Electrical Engineering",
    metaTitle: (s) => `Best Electrical Engineer in ${s.name} | Fast Turnaround | Apex Grid Engineering`,
    metaDescription: (s) =>
      `Licensed electrical engineering for ${s.name} commercial projects: service sizing, power distribution, and lighting design documented for ${s.energyCode.commercial.split(";")[0]} compliance and local utility requirements.`,
    narrativeKey: "electrical",
    scope: ELECTRICAL_SCOPE,
    intro:
      "Electrical systems sized and documented for the utility territory and energy code your project actually sits in — load calculations, distribution, and lighting engineered as one coordinated set.",
  },
  {
    // Depth-wave service (Wave 1): city/state editorial composed from the
    // licensure record + city AHJ record via city-depth-pages.ts. Review in
    // responsible charge before sealing is the standing house position.
    slug: "pe-stamping",
    name: "PE Stamping & Sealing",
    shortName: "PE Stamping",
    h1: "PE Stamping & Sealing",
    metaTitle: (s) => `PE Stamping & Sealing in ${s.name} | Licensed Review & Seal | Apex Grid Engineering`,
    metaDescription: (s) =>
      `PE stamping and sealing for ${s.name} projects: drawings and calculations reviewed in responsible charge by licensed engineers and sealed for submittal under ${s.licensure.board}.`,
    narrativeKey: "stamping",
    scope: STAMPING_SCOPE,
    intro:
      "Review-and-seal by the licensed engineer of record — scope defined, design basis reviewed, and engineering verified in responsible charge before any seal is applied.",
  },
];
