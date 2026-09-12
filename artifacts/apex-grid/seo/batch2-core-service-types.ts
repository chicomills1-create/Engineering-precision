export const BATCH2_CORE_SERVICE_SLUGS = [
  "structural-engineering",
  "mep-engineering",
  "civil-engineering",
  "energy-compliance",
  "pe-stamped-drawings",
] as const;

export type Batch2CoreServiceSlug = (typeof BATCH2_CORE_SERVICE_SLUGS)[number];

export interface Batch2Faq {
  question: string;
  answer: string;
}

export interface Batch2Section {
  heading: string;
  body: string;
}

export interface Batch2CoreServicePage {
  serviceSlug: Batch2CoreServiceSlug;
  title: string;
  description: string;
  h1: string;
  kicker: string;
  lede: string;
  permitAuthority: string;
  codeContext: string;
  localConditions: string;
  projectTypes: string;
  sections: Batch2Section[];
  permitSteps: string[];
  faqs: Batch2Faq[];
  sources: Array<{ label: string; url: string }>;
}

export interface Batch2Metro {
  slug: string;
  name: string;
  county: string;
  services: Batch2CoreServicePage[];
}

export interface Batch2StateExpansion {
  stateSlug: string;
  stateName: string;
  stateAbbrev: string;
  hub: {
    title: string;
    description: string;
    h1: string;
    kicker: string;
    lede: string;
    sections: Batch2Section[];
    faqs: Batch2Faq[];
    sources: Array<{ label: string; url: string }>;
  };
  metros: Batch2Metro[];
}