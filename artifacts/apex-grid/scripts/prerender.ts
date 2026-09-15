import fs from "node:fs";
import path from "node:path";
import { ALL_INDUSTRIES } from "../src/data/industries/index";
import { writeNormalizedInternalLinkReport } from "../seo/generate";
import {
  assertRouteOwnership,
  REACT_PRERENDER_ROUTES,
  REACT_PRERENDER_SERVICE_ROUTES,
} from "../seo/route-ownership";

const root = path.resolve(import.meta.dirname, "..");
const sourceTemplate = fs.readFileSync(path.join(root, "index.html"), "utf8");
const distRoot = path.join(root, "dist/public");
const distTemplate = fs.readFileSync(path.join(distRoot, "index.html"), "utf8");
const site = (process.env.VITE_SITE_URL ?? "https://apexgrideng.com").replace(/\/$/, "");

const routeMeta: Record<string, [string, string]> = {
  "/": ["PE-Stamped MEP & Structural Engineering | Apex Grid", "PE-stamped structural, commercial MEP, civil, and building-assessment engineering from Arizona, with Title 24 and municipal plan-check support."],
  "/about": ["About Apex Grid Engineering | Integrated Engineering Firm", "Apex Grid Engineering coordinates engineering, architecture, and general contracting support, with regulated scope confirmed for each project jurisdiction."],
  "/contact": ["Contact Us | Request an Engineering Proposal | Apex Grid", "Start your project with Apex Grid Engineering. Request a proposal for architectural, MEP, structural, or civil design services — initial review response typically within 12-24 hours for most standard requests."],
  "/estimate": ["Instant Ballpark Estimator | Apex Grid Engineering", "Get an instant, non-binding ballpark estimate for your engineering project. Preconstruction intake for MEP, Structural, Civil, and more."],
  "/for-architects": ["MEP & Structural Engineering for Architects | Apex Grid", "Coordinated MEP, structural, and civil design support for architects, with deliverables and signing requirements confirmed for each project jurisdiction."],
  "/for-contractors": ["Construction Engineering Support for Contractors | Apex Grid", "Responsive MEP, structural, civil, and architectural engineering support for contractors, including coordinated permit documents, RFIs, submittals, and field-ready solutions."],
  "/for-developers": ["Engineering for Developers | Feasibility to Permit | Apex Grid", "Engineering support for developers from due diligence and feasibility through coordinated, permit-ready MEP, structural, civil, and architectural documents."],
  "/for-property-managers": ["Engineering for Property Managers | Apex Grid", "Practical engineering support for property managers, including building assessments, repair planning, code requirements, and coordinated design services."],
  "/industries": ["Industries We Serve | Apex Grid Engineering", "Explore engineering services tailored to healthcare, military and defense, commercial, industrial, civic, education, and other facility types."],
  "/services": ["Services | Architecture, MEP, Structural, Civil | Apex Grid", "Explore our architectural design, MEP engineering, structural design, civil/site design, and Title 24 energy compliance services — from HVAC load calcs to seismic retrofitting."],
  "/portfolio": ["Engineering Project Portfolio | Apex Grid Engineering", "Explore Apex Grid Engineering work across commercial structural, civil, MEP, architecture, and building-assessment projects."],
  "/military": ["Military & Defense Engineering | Veteran-Led Firm | Apex Grid", "Veteran-led engineering firm shaped by U.S. Air Force Aerospace Medical Service and Operation Iraqi Freedom experience. UFC and ATFP design, mission-critical MEP, and permit-ready documents for military and defense facilities."],
  "/resources": ["Engineering Resources & Answers | Apex Grid Engineering", "Answer-first guides on structural, MEP, civil, geotechnical, PE stamping, Title 24, and municipal plan-check requirements."],
  "/team": ["Apex Grid Engineering Team | Licensed Professionals", "Meet the Apex Grid Engineering team delivering coordinated architecture, MEP, structural, civil, and construction services."],
  "/capabilities": ["Firm Capabilities | Engineering Services, NAICS Codes & Licensure | Apex Grid", "Capabilities reference for procurement officers and prime contractors covering disciplines, markets, NAICS codes, software, codes, and project-specific credential verification."],
  "/privacy": ["Privacy Policy | Apex Grid Engineering", "How Apex Grid Engineering collects, uses, and protects information submitted through its website."],
  "/terms": ["Terms of Use | Apex Grid Engineering", "Terms governing use of the Apex Grid Engineering website and project inquiry process."],
};

assertRouteOwnership();
const missingRouteMetadata = REACT_PRERENDER_ROUTES.filter((route) => !routeMeta[route]);
if (missingRouteMetadata.length > 0) {
  throw new Error(`React prerender routes are missing metadata: ${missingRouteMetadata.join(", ")}`);
}
const undeclaredRoutes = Object.keys(routeMeta).filter(
  (route) => !REACT_PRERENDER_ROUTES.includes(route as (typeof REACT_PRERENDER_ROUTES)[number]),
);
if (undeclaredRoutes.length > 0) {
  throw new Error(`React prerender routes are missing ownership declarations: ${undeclaredRoutes.join(", ")}`);
}

const routes = [
  ...REACT_PRERENDER_ROUTES,
  ...REACT_PRERENDER_SERVICE_ROUTES,
  ...ALL_INDUSTRIES.map((industry) => `/industries/${industry.slug}/`),
];

function esc(value: string) {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

function metadata(route: string): [string, string] {
  if (routeMeta[route]) return routeMeta[route];
  const industry = ALL_INDUSTRIES.find((item) => `/industries/${item.slug}/` === route);
  if (industry) return [industry.title, industry.meta];
  const id = route.split("/").pop()!;
  const names: Record<string, string> = { mep: "MEP Design & Engineering", structural: "Structural Design & Engineering", civil: "Civil Engineering", assessments: "Building Assessments", architecture: "Architectural Design" };
  return [`${names[id] ?? "Engineering Service"} | Apex Grid`, `Apex Grid Engineering provides ${names[id]?.toLowerCase() ?? "commercial engineering"} with coordinated, permit-ready deliverables.`];
}

function documentFor(template: string, route: string, body: string): string {
  const [title, description] = metadata(route);
  const canonical = `${site}${route === "/" ? "/" : route}`;
  const schema = JSON.stringify({ "@context": "https://schema.org", "@type": "WebPage", name: title, description, url: canonical });
  return template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${esc(description)}" />`)
    .replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${esc(title)}" />`)
    .replace(/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${esc(description)}" />`)
    .replace(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${canonical}" />`)
    .replace(/<meta name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${esc(title)}" />`)
    .replace(/<meta name="twitter:description"[^>]*>/, `<meta name="twitter:description" content="${esc(description)}" />`)
    .replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${canonical}" />`)
    .replace(/<div id="root"><\/div>/, `<div id="root">${body}</div>`)
    .replace(/<script type="module" src="[^"]+"><\/script>/, `<script type="application/ld+json">${schema}</script>\n    <script type="module" src="/src/main.tsx"></script>`);
}

const ssr = await import("../.prerender/ssr.js");
const outputs: string[] = [];
for (const route of routes) {
  const body = ssr.renderRoute(route);
  const relative = route === "/" ? "" : route.replace(/^\/|\/$/g, "");
  for (const [base, template] of [[path.join(root, "public"), sourceTemplate], [distRoot, distTemplate]] as const) {
    const target = path.join(base, relative, "index.html");
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, documentFor(template, route, body));
  }
  outputs.push(route);
}

// Industry aliases are redirect-only stubs; they never contain a duplicate body.
const aliases: Record<string, string> = { agriculture: "agriculture-cannabis-facility-engineering", aviation: "aviation-hangar-engineering", cannabis: "agriculture-cannabis-facility-engineering", "cold-storage": "cold-storage-food-processing-engineering", "commercial-office": "commercial-office-engineering", "data-centers": "data-center-engineering", education: "educational-facility-engineering", "ev-automotive": "ev-charging-automotive-engineering", government: "government-civic-engineering", healthcare: "healthcare-engineering", hospitality: "retail-hospitality-engineering", "industrial-warehouse": "industrial-warehouse-engineering", "life-science": "life-science-cleanroom-engineering", "military-defense": "military-defense-engineering", multifamily: "multifamily-residential-engineering", parking: "parking-structure-engineering", "religious-worship": "religious-worship-facility-engineering", "renewable-energy": "solar-renewable-energy-engineering", restaurants: "restaurant-food-service-engineering", retail: "retail-hospitality-engineering", "senior-living": "senior-living-assisted-care-engineering", "student-housing": "multifamily-residential-engineering", telecommunications: "telecommunications-engineering" };
for (const [alias, canonical] of Object.entries(aliases)) {
  const html = `<!doctype html><html><head><meta http-equiv="refresh" content="0;url=/industries/${canonical}/"><link rel="canonical" href="${site}/industries/${canonical}/"><meta name="robots" content="noindex"></head><body><a href="/industries/${canonical}/">Continue to the canonical industry page</a></body></html>`;
  for (const base of [path.join(root, "public"), distRoot]) {
    const target = path.join(base, "industries", alias, "index.html");
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, html);
  }
}
const report = { generatedAt: "deterministic", routes: outputs, aliases, count: outputs.length };
fs.writeFileSync(path.join(root, "seo", "prerender-manifest.json"), JSON.stringify(report, null, 2) + "\n");
writeNormalizedInternalLinkReport();
console.log(`Prerendered ${outputs.length} React routes`);