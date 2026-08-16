/** Shared types for the 24 industry hub pages. */

export interface IndustryDiscipline {
  /** Discipline name, e.g. "Structural Engineering" */
  name: string;
  /** Internal link to the matching service page, if one exists (e.g. "/services/structural") */
  href?: string;
  /** 1–2 substantive paragraphs of industry-specific scope for this discipline */
  body: string[];
  /** Short bullet highlights of concrete scope items */
  highlights: string[];
}

export interface IndustrySpecialty {
  /** H3 heading, verbatim from the SEO blueprint */
  heading: string;
  /** ~90–130 words of real technical content under this heading */
  body: string;
}

export interface ComplianceStandard {
  /** Code / standard shorthand, e.g. "NFPA 99", "UFC 4-010-01" */
  code: string;
  /** One-sentence explanation of what it governs and how we design to it */
  desc: string;
}

export interface Industry {
  /** URL slug under /industries/, e.g. "healthcare-engineering" */
  slug: string;
  /** Short display name for nav/cards, e.g. "Healthcare" */
  name: string;
  /** Cluster id 1–6 */
  cluster: 1 | 2 | 3 | 4 | 5 | 6;
  /** <title> tag */
  title: string;
  /** Meta description */
  meta: string;
  /** H1, verbatim from blueprint */
  h1: string;
  /** H2 subheading, verbatim from blueprint */
  h2: string;
  /** Short card blurb for the /industries grid (1–2 sentences) */
  cardBlurb: string;
  /** 2 intro paragraphs (~70–100 words each) under the H1/H2 */
  intro: string[];
  /** The three H3 specialty sections from the blueprint */
  specialties: IndustrySpecialty[];
  /** Per-discipline scope: Structural, MEP, Civil, Geotechnical (in that order) */
  disciplines: IndustryDiscipline[];
  /** Facility sub-types we engineer in this industry (6–10 items) */
  facilityTypes: string[];
  /** Project types: new construction, renovation, TI, expansion etc. (4–6 items) */
  projectTypes: string[];
  /** Deliverables (6–9 items) */
  deliverables: string[];
  /** Industry-specific compliance standards (4–7 items) */
  compliance: ComplianceStandard[];
  /** Industry-specific CTA sentence shown above the contact button */
  cta: string;
}

export interface IndustryCluster {
  id: 1 | 2 | 3 | 4 | 5 | 6;
  name: string;
}

export const INDUSTRY_CLUSTERS: IndustryCluster[] = [
  { id: 1, name: "Critical & Institutional" },
  { id: 2, name: "Industrial & Logistics" },
  { id: 3, name: "Advanced Tech & Energy" },
  { id: 4, name: "Commercial & Retail" },
  { id: 5, name: "Residential & Living" },
  { id: 6, name: "Infrastructure & Specialty" },
];
