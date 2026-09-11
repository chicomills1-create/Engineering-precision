/** Permit & Professional Engineering ecosystem pages. */

export interface PermitPage {
  slug: string;
  title: string;
  description: string;
  h1: string;
  kicker: string;
  lede: string;
  topics: string[];
  note?: string;
}

export const PERMIT_PAGES: PermitPage[] = [
  {
    slug: "pe-stamped-drawings",
    title: "PE-Stamped Engineering Drawings | Apex Grid Engineering",
    description: "PE-stamped structural, MEP, and civil drawings from licensed professional engineers — not a stamp-for-hire service, but engineering reviewed and sealed by the engineer of record.",
    h1: "Professionally Reviewed and Sealed Engineering Drawings",
    kicker: "PE-Stamped Engineering Documents",
    lede: "A PE stamp represents an engineer's professional review and responsibility for the work — not a bureaucratic formality. Our engineers review, design, calculate, and seal their own work. We do not stamp work we haven't engineered.",
    topics: [
      "Structural PE-stamped drawings and calculations",
      "Mechanical PE-stamped drawings",
      "Electrical PE-stamped drawings",
      "Plumbing PE-stamped drawings",
      "Civil PE-stamped site drawings",
      "Multi-discipline permit packages",
      "Project-specific PE licensure review for your jurisdiction",
      "Digital and wet-stamped documents",
    ],
    note: "Apex Grid does not offer PE stamps as a stand-alone service. Where authorized for a project, the responsible licensed engineer designs, calculates, reviews, and seals work within the applicable scope and takes professional responsibility for those documents.",
  },
  {
    slug: "plan-check-responses",
    title: "Engineering Plan-Check Responses and Revisions | Apex Grid",
    description: "Plan check comment responses, revised calculations, and updated drawings for structural, MEP, and civil permit submittals — from the same engineers who produced the original documents.",
    h1: "Engineering Plan-Check Responses and Revisions",
    kicker: "Plan Check Response Engineering",
    lede: "Plan check comment responses require the same engineering rigor as the original submittal. Our engineers respond to plan check comments with revised calculations, code-specific citations, and updated drawings — from the same team that produced the original permit package.",
    topics: [
      "Structural plan check comment responses",
      "MEP plan check comment responses",
      "Civil plan check comment responses",
      "Revised calculations with code citations",
      "Updated drawings per plan check corrections",
      "Response letter preparation",
      "Jurisdiction-specific code interpretation",
      "Accelerated response for time-sensitive permits",
    ],
  },
  {
    slug: "city-comments",
    title: "Engineering Responses to City Permit Comments | Apex Grid",
    description: "Written engineering responses to city building department plan check comments — calculations, code references, and revised drawings as required.",
    h1: "Engineering Responses to City Permit Comments",
    kicker: "City Permit Comment Responses",
    lede: "City plan check comments are a normal part of the permitting process. Our engineering team drafts formal written responses, provides supporting calculations and code references, and issues revised drawings for the authority's review; approval remains with that authority.",
    topics: [
      "Formal written response to each plan check comment",
      "Supporting structural calculations",
      "Code section references and interpretations",
      "Revised drawing sheets",
      "Coordination with architect on combined responses",
      "Tracking comment status through the jurisdiction's review process",
      "Jurisdiction-specific requirements confirmed during intake",
    ],
  },
  {
    slug: "permit-revisions",
    title: "Engineering Permit Revisions | Apex Grid Engineering",
    description: "Engineering revisions to approved or submitted permit documents — scope changes, field conditions, contractor substitutions, and design modifications during construction.",
    h1: "Engineering Permit Revisions",
    kicker: "Permit Revision Engineering",
    lede: "Construction rarely proceeds exactly as designed. When scope changes, field conditions require modification, or equipment substitutions affect the engineering, we issue revised permit documents — quickly, so construction doesn't stop.",
    topics: [
      "Revised structural drawings for field condition changes",
      "MEP revisions for equipment substitutions",
      "As-built documentation for permit finalization",
      "Engineer-of-record sign-off on contractor-proposed modifications",
      "Revised calculations for scope changes",
      "Permit revision package preparation",
      "Coordination with building department on revision procedures",
    ],
  },
  {
    slug: "engineering-calculations",
    title: "Engineering Calculations for Permit Submittals | Apex Grid",
    description: "Structural, mechanical, electrical, and civil calculations for building permits — produced by licensed professional engineers and formatted for jurisdiction review.",
    h1: "Engineering Calculations for Permit Submittals",
    kicker: "PE Engineering Calculations",
    lede: "Engineering calculations are the mathematical backbone of every permit submittal — they demonstrate to the plan reviewer that the proposed design complies with applicable codes and can handle the required loads and demands.",
    topics: [
      "Structural calculations — gravity and lateral loads",
      "Seismic and wind load analysis",
      "Foundation design calculations",
      "Mechanical load calculations for HVAC",
      "Electrical load calculations and service sizing",
      "Energy code compliance calculations",
      "Hydraulic calculations for plumbing and fire protection coordination",
      "Jurisdiction-specific calculation formats",
    ],
  },
];

export const PERMIT_HUB = {
  title: "Permit Engineering & PE Drawings | Apex Grid Engineering",
  description: "Project-specific PE-stamped engineering drawings, calculations, plan check responses, and permit revisions for structural, MEP, and civil building permits, subject to jurisdiction and engineer review.",
  h1: "Permit-Ready Engineering Drawings and Calculations",
  lede: "Many commercial building permits require engineering documentation — drawings, calculations, and professional review by appropriately licensed engineers. After project scope, discipline, jurisdiction, and engineer availability are confirmed, we can produce a defined permit package and support jurisdiction review; approval remains with the authority.",
};
