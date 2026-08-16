/** Standalone static pages: engineering-reports and HTML sitemap. */

export interface StaticPageDef {
  slug: string;
  dir: string; // output directory relative to public/
  title: string;
  description: string;
  h1: string;
  kicker: string;
  lede: string;
  sections: { heading: string; content: string; bullets?: string[] }[];
  ctaHeading: string;
  ctaText: string;
}

export const STATIC_STANDALONE_PAGES: StaticPageDef[] = [
  {
    slug: "engineering-reports",
    dir: "engineering-reports",
    title: "Professional Engineering Reports | Apex Grid Engineering",
    description:
      "PE-authored engineering reports for existing buildings, structural assessments, condition evaluations, geotechnical investigations, and permit-required documentation.",
    h1: "Professional Engineering Reports",
    kicker: "Engineering Documentation",
    lede:
      "Apex Grid produces formal engineering reports — signed and sealed by licensed professional engineers — for existing building evaluations, structural assessments, geotechnical investigations, and permit-required documentation.",
    sections: [
      {
        heading: "Structural Condition Reports",
        content:
          "Structural condition reports document the observed state of a building's structural systems — framing, foundations, connections, and load-bearing elements — and identify deficiencies, damage, or items requiring repair or further investigation.",
        bullets: [
          "Existing building structural assessments",
          "Framing and foundation condition documentation",
          "Crack and damage evaluation reports",
          "Settlement and deflection assessment",
          "Capital improvement prioritization reports",
          "Pre-purchase due diligence structural reports",
        ],
      },
      {
        heading: "Assessment and Evaluation Reports",
        content:
          "Assessment reports are commonly required by building departments, lenders, property managers, and development teams to document existing conditions before renovation, sale, or occupancy change.",
        bullets: [
          "Existing building condition assessments",
          "Seismic vulnerability assessments",
          "Load capacity evaluation reports",
          "Change-of-occupancy structural evaluations",
          "Roof capacity evaluation for new equipment",
          "Field verification reports",
        ],
      },
      {
        heading: "Geotechnical Reports",
        content:
          "Geotechnical engineering reports document subsurface conditions, soil bearing capacity, and foundation recommendations based on soil borings, laboratory testing, and site reconnaissance.",
        bullets: [
          "Geotechnical investigation reports",
          "Foundation recommendation reports",
          "Pavement design geotechnical reports",
          "Retaining wall geotechnical parameters",
          "Earthwork and compaction recommendations",
          "Seismic site classification reports",
        ],
      },
      {
        heading: "Permit-Required Engineering Reports",
        content:
          "Some jurisdictions require a separate engineering report — in addition to drawings and calculations — before issuing a building permit. Apex Grid produces these as standalone documents or as part of a full permit package.",
        bullets: [
          "City-required structural reports for remodels",
          "Special inspection programs",
          "Structural observation reports",
          "Post-repair engineering certifications",
          "Deferred submittal engineering documentation",
        ],
      },
      {
        heading: "What We Need to Start",
        content:
          "Most engineering reports begin with existing drawings or field information. When drawings are unavailable, we work with contractor photos, dimensions, and site reconnaissance to document existing conditions.",
        bullets: [
          "Existing architectural or structural drawings (if available)",
          "Contractor or owner photographs of the area in question",
          "Field dimensions and measurements",
          "Description of the concern or purpose of the report",
          "Building address and jurisdiction",
        ],
      },
    ],
    ctaHeading: "Request an Engineering Report",
    ctaText:
      "Send us your project details and we'll provide a fee proposal within one business day. Most engineering reports are completed within 5–10 business days of receiving the required information.",
  },
];
