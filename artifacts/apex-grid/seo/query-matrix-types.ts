/** Query Matrix Tier 1 cluster pages — one authoritative page per keyword cluster. */

export interface QueryMatrixPage {
  /** URL path segments, e.g. "mep-engineering/speed/alabama" */
  slug: string;
  /** Full canonical URL, e.g. "/mep-engineering/speed/alabama/" */
  canonical: string;
  title: string;
  description: string;
  h1: string;
  kicker: string;
  /** Direct AEO answer (2-4 sentences) */
  answer: string;
  /** Alias for answer, for Phase0AeoPage compat */
  directAnswer: string;
  sections: Array<{ heading: string; body: string; bullets?: string[] }>;
  faqs: Array<{ question: string; answer: string }>;
  links: Array<{ label: string; href: string }>;
  topic: string;
  discipline: string;
  modifierType: string;
  geo: string;
  queryCount: number;
}
