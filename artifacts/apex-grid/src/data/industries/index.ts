import type { Industry } from "./types";
import { INDUSTRY_CLUSTERS } from "./types";
import { CLUSTER1_INDUSTRIES } from "./cluster1";
import { CLUSTER2_INDUSTRIES } from "./cluster2";
import { CLUSTER3_INDUSTRIES } from "./cluster3";
import { CLUSTER4_INDUSTRIES } from "./cluster4";
import { CLUSTER5_INDUSTRIES } from "./cluster5";
import { CLUSTER6_INDUSTRIES } from "./cluster6";

export type { Industry, IndustryCluster } from "./types";
export { INDUSTRY_CLUSTERS } from "./types";

export const ALL_INDUSTRIES: Industry[] = [
  ...CLUSTER1_INDUSTRIES,
  ...CLUSTER2_INDUSTRIES,
  ...CLUSTER3_INDUSTRIES,
  ...CLUSTER4_INDUSTRIES,
  ...CLUSTER5_INDUSTRIES,
  ...CLUSTER6_INDUSTRIES,
];

const bySlug = new Map(ALL_INDUSTRIES.map((i) => [i.slug, i]));

/** Priority sectors shown on the main Industries page before the full directory. */
export const FEATURED_INDUSTRY_SLUGS = [
  "healthcare-engineering",
  "military-defense-engineering",
  "government-civic-engineering",
  "educational-facility-engineering",
  "data-center-engineering",
  "industrial-warehouse-engineering",
  "life-science-cleanroom-engineering",
  "tenant-improvement-engineering",
  "commercial-office-engineering",
  "retail-hospitality-engineering",
  "multifamily-residential-engineering",
  "aviation-hangar-engineering",
] as const;

export const FEATURED_INDUSTRIES = FEATURED_INDUSTRY_SLUGS
  .map((slug) => bySlug.get(slug))
  .filter((industry): industry is Industry => Boolean(industry));

export function getIndustry(slug: string): Industry | undefined {
  return bySlug.get(slug);
}

/** Industries grouped by cluster, in cluster order. */
export const INDUSTRIES_BY_CLUSTER = INDUSTRY_CLUSTERS.map((cluster) => ({
  cluster,
  industries: ALL_INDUSTRIES.filter((i) => i.cluster === cluster.id),
}));
