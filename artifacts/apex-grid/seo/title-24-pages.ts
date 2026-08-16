/** Title 24 energy compliance pages (California-specific). Spec pages 066–068. */

export interface Title24Page {
  slug: string;
  title: string;
  description: string;
  h1: string;
  kicker: string;
  lede: string;
  intro: string;
  topics: string[];
  ctaText: string;
}

export const TITLE_24_HUB = {
  title: "California Title 24 Energy Compliance | Apex Grid Engineering",
  description:
    "California Title 24 energy compliance engineering for commercial, multifamily, and residential projects. PE-reviewed compliance documentation and permit packages.",
  h1: "California Title 24 Energy Compliance",
  kicker: "Energy Code Compliance",
  lede:
    "Apex Grid provides Title 24 energy compliance engineering for California commercial, multifamily, and residential projects — coordinating mechanical, electrical, and envelope performance to meet the latest California Energy Code requirements.",
  intro:
    "Title 24 is California's Building Energy Efficiency Standards. Every new building and most renovations require a Title 24 energy compliance report before the building department will issue permits. Apex Grid's engineers produce compliant documentation as part of a full MEP package or as a standalone compliance service.",
  topics: [
    "Commercial building energy compliance reports",
    "Residential and multifamily Title 24 compliance",
    "Mechanical (HVAC) compliance coordination",
    "Lighting power density and controls compliance",
    "Envelope performance and U-values",
    "Whole-building energy modeling",
    "Prescriptive and performance compliance paths",
    "CEPE (California Energy Permit Express) coordination",
    "Plan check response and comment resolution",
    "Coordination with architectural and MEP engineering",
  ],
};

export const TITLE_24_PAGES: Title24Page[] = [
  {
    slug: "commercial",
    title: "Commercial Title 24 Compliance | Apex Grid Engineering",
    description:
      "Commercial Title 24 energy compliance reports and engineering for California offices, retail, restaurants, healthcare, and industrial projects.",
    h1: "Commercial Title 24 Compliance",
    kicker: "California Energy Code",
    lede:
      "Commercial projects in California require Title 24 energy compliance documentation before permits are issued. Apex Grid produces compliant reports coordinated with the mechanical, electrical, and architectural design — covering HVAC performance, lighting power density, and envelope requirements.",
    intro:
      "Commercial Title 24 compliance covers all non-residential building occupancies in California — office, retail, restaurant, warehouse, healthcare, industrial, and mixed-use. Requirements include HVAC efficiency, lighting power density limits, lighting controls, and building envelope performance.",
    topics: [
      "Office and commercial office building compliance",
      "Restaurant and food service Title 24",
      "Retail and shopping center compliance",
      "Warehouse and industrial energy compliance",
      "Healthcare and medical office Title 24",
      "Hotel and hospitality energy compliance",
      "HVAC equipment efficiency verification",
      "Lighting power density and control requirements",
      "Envelope and glazing performance",
      "Plan check response for Title 24 comments",
    ],
    ctaText: "Send Your California Commercial Project",
  },
  {
    slug: "residential",
    title: "Residential Title 24 Compliance | Apex Grid Engineering",
    description:
      "Residential Title 24 energy compliance for California single-family, multifamily, and addition projects. CF1R, CF2R, and CF3R documentation.",
    h1: "Residential Title 24 Compliance",
    kicker: "California Energy Code",
    lede:
      "Residential projects in California — new homes, additions, alterations, and multifamily buildings — require Title 24 energy compliance documentation. Apex Grid produces CF1R compliance reports, coordinates with mechanical engineers on HVAC sizing, and resolves plan check comments.",
    intro:
      "Residential Title 24 compliance applies to single-family homes, accessory dwelling units, multifamily buildings (up to three stories), and residential additions. The standards address insulation, windows, HVAC equipment, water heating, and lighting. Compliance is documented on CF1R forms submitted with building permits.",
    topics: [
      "Single-family home Title 24 compliance reports",
      "Multifamily residential energy compliance",
      "Accessory dwelling unit (ADU) compliance",
      "Building addition and alteration compliance",
      "CF1R, CF2R, and CF3R documentation",
      "Insulation, window, and envelope requirements",
      "HVAC sizing and efficiency coordination",
      "Water heating compliance",
      "Solar-ready and EV-ready requirements",
      "Plan check comment resolution",
    ],
    ctaText: "Send Your California Residential Project",
  },
];
