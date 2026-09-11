import fs from "node:fs";
import path from "node:path";

export type OutputPipeline = "react-prerender" | "seo-generator";

export const REACT_PRERENDER_ROUTES = [
  "/",
  "/about",
  "/contact",
  "/for-architects",
  "/for-contractors",
  "/for-developers",
  "/for-property-managers",
  "/industries",
  "/services",
  "/portfolio",
  "/military",
  "/resources",
  "/team",
  "/capabilities",
  "/privacy",
  "/terms",
] as const;

/**
 * Top-level index routes emitted by seo/generate.ts. Child pages beneath these
 * routes are also generator-owned unless listed in REACT_OWNED_SHARED_ROUTES.
 */
export const SEO_GENERATOR_FIXED_INDEX_ROUTES = [
  "/locations",
  "/blog",
  "/who-we-work-with",
  "/project-types",
  "/existing-building-engineering",
  "/permit-engineering",
  "/guides",
  "/engineering-intent",
  "/solutions",
  "/government",
  "/engineering-glossary",
  "/title-24",
  "/projects",
  "/sitemap",
] as const;

/**
 * Routes that both pipelines historically emitted. These are now exclusively
 * React-owned; the SEO generator may manage children without replacing the hub.
 */
export const REACT_OWNED_SHARED_ROUTES = ["/resources", "/capabilities"] as const;

export const REACT_PRERENDER_SERVICE_ROUTES = [
  "/services/mep",
  "/services/structural",
  "/services/civil",
  "/services/assessments",
  "/services/architecture",
] as const;

export function assertNoConflictingOutputOwners(
  outputs: Readonly<Record<OutputPipeline, readonly string[]>>,
): void {
  const claimedBy = new Map<string, OutputPipeline>();
  for (const pipeline of ["react-prerender", "seo-generator"] as const) {
    for (const route of outputs[pipeline]) {
      const normalized = route === "/" ? route : route.replace(/\/+$/, "");
      const existing = claimedBy.get(normalized);
      if (existing && existing !== pipeline) {
        throw new Error(
          `Route output ownership conflict: ${normalized} is claimed by ${existing} and ${pipeline}`,
        );
      }
      claimedBy.set(normalized, pipeline);
    }
  }
}

export function assertRouteOwnership(): void {
  assertNoConflictingOutputOwners({
    "react-prerender": REACT_PRERENDER_ROUTES,
    "seo-generator": SEO_GENERATOR_FIXED_INDEX_ROUTES,
  });

  for (const route of REACT_OWNED_SHARED_ROUTES) {
    if (!REACT_PRERENDER_ROUTES.includes(route)) {
      throw new Error(`React-owned shared route is not prerendered: ${route}`);
    }
    if (SEO_GENERATOR_FIXED_INDEX_ROUTES.includes(route)) {
      throw new Error(`React-owned shared route is still claimed by the SEO generator: ${route}`);
    }
  }
}

/**
 * Removes generated descendants without changing a React-owned hub file.
 * If the hub does not exist, this leaves it absent.
 */
export function resetGeneratedChildrenPreservingHub(hubDir: string): void {
  const hubPath = path.join(hubDir, "index.html");
  const hubHtml = fs.existsSync(hubPath) ? fs.readFileSync(hubPath) : undefined;

  fs.rmSync(hubDir, { recursive: true, force: true });
  fs.mkdirSync(hubDir, { recursive: true });

  if (hubHtml !== undefined) {
    fs.writeFileSync(hubPath, hubHtml);
  }
}