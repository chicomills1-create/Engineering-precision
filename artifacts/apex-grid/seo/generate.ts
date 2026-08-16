/** Generates static SEO pages into public/locations/ and rebuilds sitemap.xml.
 * Run: pnpm --filter @workspace/apex-grid run seo:generate
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { StateData, CityData } from "./types";
import { SERVICES, type ServiceDef } from "./services";
import { htmlShell, SITE } from "./shell";
import { BLOG_POSTS, type BlogPost } from "./blog";
import { CLIENT_PAGES, WHO_WE_WORK_WITH_HUB, type ClientPage } from "./client-pages";
import { PROJECT_TYPE_PAGES, PROJECT_TYPES_HUB, type ProjectTypePage } from "./project-type-pages";
import { EXISTING_BUILDING_PAGES, EXISTING_BUILDING_HUB, type ExistingBuildingPage } from "./existing-building-pages";
import { PERMIT_PAGES, PERMIT_HUB, type PermitPage } from "./permit-pages";
import { INDUSTRY_DISCIPLINE_PAGES, getIndustryDisciplineUrl, type IndustryDisciplinePage } from "./industry-discipline-pages";
import { LOCATION_SERVICE_PAGES, type LocationServicePage } from "./location-service-pages";
import { SOLUTION_PAGES, type SolutionPage } from "./solutions-pages";
import { GUIDE_PAGES, GUIDES_HUB, type GuidePage } from "./guides-pages";
import { DISCIPLINE_HUBS, type DisciplineHub, type DisciplineSubpage } from "./discipline-pages";
import { MISC_PAGES, type MiscPage } from "./misc-pages";
import { STRUCTURAL_EXTENDED_PAGES, type StructuralExtendedPage } from "./structural-extended-pages";
import { TITLE_24_HUB, TITLE_24_PAGES, type Title24Page } from "./title-24-pages";
import { PROJECTS_HUB, PROJECT_CATEGORY_PAGES, type ProjectCategoryPage } from "./projects-pages";
import { STATIC_STANDALONE_PAGES, type StaticPageDef } from "./static-pages";
import { DISCIPLINES, type DisciplineDef } from "./disciplines";
import { ALL_INDUSTRIES } from "../src/data/industries";
import { RESOURCE_ARTICLES, RESOURCE_DISCIPLINES, disciplineOf, resourceUrl, type ResourceArticle, type ResourceDiscipline } from "./resources";
import { GLOSSARY_TERMS, sortedGlossaryTerms, glossaryByLetter, type GlossaryTerm } from "./glossary";

/** Lightweight city-directory entry sourced from US Census population estimates. */
interface DirectoryCity {
  slug: string;
  name: string;
  pop: number;
}
type CityDirectory = Record<string, DirectoryCity[]>; // stateSlug -> cities

function loadDirectory(): CityDirectory {
  const p = path.join(__dirname, "cities-directory.json");
  if (!fs.existsSync(p)) return {};
  return JSON.parse(fs.readFileSync(p, "utf8")) as CityDirectory;
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC = path.resolve(__dirname, "../public");
const OUT = path.join(PUBLIC, "locations");

/** States where Apex Grid is NOT licensed — no pages are generated for these
 * (the site markets "licensed in 49 states"; claiming licensed services in an
 * unlicensed state would be a misrepresentation). */
const UNLICENSED_STATES = new Set(["alaska"]);

async function loadStates(): Promise<StateData[]> {
  const dir = path.join(__dirname, "states");
  const files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".ts") && !UNLICENSED_STATES.has(f.replace(/\.ts$/, "")));
  const states: StateData[] = [];
  for (const f of files) {
    const mod = await import(path.join(dir, f));
    const val = Object.values(mod)[0] as StateData;
    states.push(val);
  }
  return states.sort((a, b) => a.name.localeCompare(b.name));
}

async function loadCities(): Promise<CityData[]> {
  const dir = path.join(__dirname, "cities");
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".ts"));
  const cities: CityData[] = [];
  for (const f of files) {
    const mod = await import(path.join(dir, f));
    const val = Object.values(mod)[0] as CityData;
    cities.push(val);
  }
  return cities.sort((a, b) => a.name.localeCompare(b.name));
}
const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

/** Slugs go into URLs/paths — restrict to safe charset. */
function assertSlug(slug: string) {
  if (!/^[a-z0-9-]+$/.test(slug)) throw new Error(`Invalid slug: ${slug}`);
}

/** Non-HTML data fields must not contain markup. */
function assertNoMarkup(state: StateData) {
  const flat = JSON.stringify(state);
  if (/<\s*(script|iframe|img|svg|style)/i.test(flat)) {
    throw new Error(`State ${state.slug} contains disallowed markup`);
  }
}

function breadcrumb(items: { name: string; href?: string }[]): string {
  return `<nav class="breadcrumb container">${items
    .map((i) => (i.href ? `<a href="${esc(i.href)}">${esc(i.name)}</a>` : esc(i.name)))
    .join(`<span>/</span>`)}</nav>`;
}

function breadcrumbSchema(items: { name: string; href?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((i, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: i.name,
      ...(i.href ? { item: `${SITE}${i.href}` } : {}),
    })),
  };
}

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Apex Grid Engineering",
  url: SITE,
  email: "info@apexgrideng.com",
  telephone: "+1-480-490-0064",
  address: {
    "@type": "PostalAddress",
    streetAddress: "22475 E Quintero Rd",
    addressLocality: "Queen Creek",
    addressRegion: "AZ",
    postalCode: "85142",
    addressCountry: "US",
  },
};

function servicePage(state: StateData, svc: ServiceDef, allStates: StateData[]): string {
  const url = `/locations/${state.slug}/${svc.slug}/`;
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Service Areas", href: "/locations/" },
    { name: state.name, href: `/locations/${state.slug}/` },
    { name: svc.shortName },
  ];
  const otherSvcs = SERVICES.filter((x) => x.slug !== svc.slug);
  const nearby = allStates.filter((s) => s.slug !== state.slug).slice(0, 8);
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: state.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  const svcSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${svc.name} in ${state.name}`,
    provider: { "@type": "ProfessionalService", name: "Apex Grid Engineering", url: SITE },
    areaServed: { "@type": "State", name: state.name },
    serviceType: svc.name,
  };

  const body = `
${breadcrumb(crumbs)}
<section class="hero"><div class="container">
  <p class="kicker">${esc(state.name)} · Licensed Professional Engineering</p>
  <h1>${esc(svc.h1)} <span class="dim">in ${esc(state.name)}</span></h1>
  <p class="lede">${esc(svc.intro)}</p>
</div></section>

<section class="block"><div class="container">
  <h2>${esc(svc.shortName)} Engineering for <em>${esc(state.name)}</em> Conditions</h2>
  <div class="prose"><p>${esc(state.narratives[svc.narrativeKey])}</p></div>
</div></section>

<section class="block"><div class="container">
  <h2>${esc(state.name)} <em>Code &amp; Design</em> Snapshot</h2>
  <div class="statgrid">
    <div class="cell"><div class="k">Building Code</div><div class="v">${esc(state.buildingCode.name)}</div></div>
    <div class="cell"><div class="k">Commercial Energy Code</div><div class="v">${esc(state.energyCode.commercial)}</div></div>
    <div class="cell"><div class="k">Climate Zone(s)</div><div class="v">${esc(state.climate.zones)}</div></div>
    <div class="cell"><div class="k">Seismic</div><div class="v">${esc(state.structural.seismic)}</div></div>
    <div class="cell"><div class="k">Wind</div><div class="v">${esc(state.structural.wind)}</div></div>
    <div class="cell"><div class="k">Snow</div><div class="v">${esc(state.structural.snow)}</div></div>
  </div>
  <p class="note">Code adoptions change on multi-year cycles and many states allow local amendments. Data reflects our research as of ${new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })} — we verify the governing edition with your permitting jurisdiction at project kickoff.</p>
</div></section>

<section class="block"><div class="container">
  <h2>Scope of <em>Services</em></h2>
  <ul class="scope">${svc.scope.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>
</div></section>

<section class="block"><div class="container">
  <h2>Permitting &amp; Licensure in <em>${esc(state.abbrev)}</em></h2>
  <div class="grid2">
    <div class="card"><div class="label">Permitting Landscape</div><p>${esc(state.permitting)}</p></div>
    <div class="card"><div class="label">PE Licensure — ${esc(state.licensure.board)}</div><p>${esc(state.licensure.notes)}</p></div>
  </div>
  <div style="margin-top:20px" class="card"><div class="label">Market Context</div><p>${esc(state.marketNotes)}</p><p style="margin-top:10px">Key markets: ${esc(state.metros.join(", "))}.</p></div>
</div></section>

<section class="block"><div class="container faq">
  <h2>${esc(state.name)} <em>FAQs</em></h2>
  ${state.faqs.map((f) => `<details><summary>${esc(f.q)}</summary><div class="a">${esc(f.a)}</div></details>`).join("")}
</div></section>

<section class="block"><div class="container">
  <h2>Related <em>Services &amp; Locations</em></h2>
  <div class="linkrow" style="margin-bottom:16px">${otherSvcs
    .map((o) => `<a href="/locations/${state.slug}/${o.slug}/">${esc(o.name)} in ${esc(state.name)}</a>`)
    .join("")}</div>
  <div class="linkrow">${nearby
    .map((n) => `<a href="/locations/${n.slug}/${svc.slug}/">${esc(svc.shortName)} in ${esc(n.name)}</a>`)
    .join("")}</div>
</div></section>

<section class="ctaband"><div class="container">
  <h2>Start Your ${esc(state.name)} Project</h2>
  <p>With a team of licensed PEs and 20+ engineers on staff, we're ready to take on projects of any size — and we turn quotes around fast. Send us your scope and get a clear proposal: deliverables, timeline, and fee.</p>
  <a class="cta" href="/contact">Request a Proposal</a>
</div></section>`;

  return htmlShell({
    title: svc.metaTitle(state),
    description: svc.metaDescription(state),
    canonical: `${SITE}${url}`,
    schemaJson: [orgSchema, svcSchema, faqSchema, breadcrumbSchema(crumbs)],
    body,
  });
}

/** Non-HTML data fields must not contain markup. */
function assertNoMarkupCity(city: CityData) {
  const flat = JSON.stringify(city);
  if (/<\s*(script|iframe|img|svg|style)/i.test(flat)) {
    throw new Error(`City ${city.slug} contains disallowed markup`);
  }
}
function statePage(state: StateData, cities: CityData[]): string {
  const stateCities = cities.filter((c) => c.stateSlug === state.slug);
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Service Areas", href: "/locations/" },
    { name: state.name },
  ];
  const body = `
${breadcrumb(crumbs)}
<section class="hero"><div class="container">
  <p class="kicker">Service Area</p>
  <h1>Engineering Services <span class="dim">in ${esc(state.name)}</span></h1>
  <p class="lede">MEP, structural, civil, and energy-compliance engineering for ${esc(state.name)} projects — designed to the ${esc(state.buildingCode.baseCode)} and the realities of ${esc(state.metros.slice(0, 3).join(", "))} permitting.</p>
</div></section>
<section class="block"><div class="container">
  <h2>Services in <em>${esc(state.name)}</em></h2>
  <div class="grid2">
  ${SERVICES.map(
    (s) => `<a class="card" href="/locations/${state.slug}/${s.slug}/"><div class="label">${esc(s.shortName)}</div><h3>${esc(s.name)} in ${esc(state.name)}</h3><p>${esc(s.intro)}</p></a>`,
  ).join("")}
  </div>
</div></section>
<section class="block"><div class="container">
  <h2>${esc(state.name)} <em>Design Environment</em></h2>
  <div class="statgrid">
    <div class="cell"><div class="k">Building Code</div><div class="v">${esc(state.buildingCode.name)}</div></div>
    <div class="cell"><div class="k">Energy Code</div><div class="v">${esc(state.energyCode.commercial)}</div></div>
    <div class="cell"><div class="k">Climate</div><div class="v">${esc(state.climate.zones)}</div></div>
    <div class="cell"><div class="k">Key Markets</div><div class="v">${esc(state.metros.join(", "))}</div></div>
  </div>
  <div class="prose" style="margin-top:24px"><p>${esc(state.buildingCode.notes)}</p><p>${esc(state.marketNotes)}</p></div>
</div></section>
${
  stateCities.length
    ? `<section class="block"><div class="container">
  <h2>${esc(state.name)} <em>City Pages</em></h2>
  <div class="grid2">
  ${stateCities
    .map(
      (c) => `<a class="card" href="/locations/${state.slug}/${c.slug}/"><div class="label">${esc(c.county)}</div><h3>Engineering Services in ${esc(c.name)}</h3><p>Permits through ${esc(c.ahj.office)} · ${esc(c.codes.building.split(",")[0].split("(")[0].trim())}</p></a>`,
    )
    .join("")}
  </div>
</div></section>`
    : ""
}
<section class="ctaband"><div class="container">
  <h2>Build in ${esc(state.name)} with Apex Grid</h2>
  <p>${esc(state.permitting)}</p>
  <a class="cta" href="/contact">Request a Proposal</a>
</div></section>`;

  return htmlShell({
    title: `Engineering Services in ${esc(state.name)} | MEP, Structural, Civil, Energy | Apex Grid`,
    description: `Licensed MEP, structural, civil, and energy-compliance engineering in ${esc(state.name)}. Serving ${state.metros.slice(0, 4).join(", ")} under the ${state.buildingCode.baseCode}.`,
    canonical: `${SITE}/locations/${state.slug}/`,
    schemaJson: [orgSchema, breadcrumbSchema(crumbs)],
    body,
  });
}

function hubPage(states: StateData[], cities: CityData[]): string {
  const crumbs = [{ name: "Home", href: "/" }, { name: "Service Areas" }];
  const body = `
${breadcrumb(crumbs)}
<section class="hero"><div class="container">
  <p class="kicker">Nationwide Coverage</p>
  <h1>Service <span class="dim">Areas</span></h1>
  <p class="lede">Apex Grid provides MEP, structural, civil, and energy-compliance engineering across 49 states through multi-state PE licensure — backed by over 15 years of expertise. Every state page below covers the adopted codes, climate drivers, and permitting landscape that shape design there.</p>
</div></section>
<section class="block"><div class="container">
  <h2>Major <em>Metro Markets</em></h2>
  <div class="grid3">
  ${cities
    .map(
      (c) => `<a class="card" href="/locations/${c.stateSlug}/${c.slug}/"><div class="label">${esc(c.county)}</div><h3>${esc(c.name)}</h3><p>${esc(c.codes.building.split(",")[0].split("(")[0].trim())} · ${esc(c.utilities.electric.split("—")[0].split("(")[0].trim())}</p></a>`,
    )
    .join("")}
  </div>
</div></section>
<section class="block"><div class="container">
  <h2>Choose a <em>State</em></h2>
  <div class="grid3">
  ${states
    .map(
      (s) => `<a class="card" href="/locations/${s.slug}/"><div class="label">${esc(s.abbrev)}</div><h3>${esc(s.name)}</h3><p>${esc(s.energyCode.commercial.split(";")[0].split(" — ")[0])} · ${esc(s.climate.zones.split(";")[0].split("(")[0].trim())}</p></a>`,
    )
    .join("")}
  </div>
</div></section>
<section class="ctaband"><div class="container">
  <h2>Don't See Your Jurisdiction?</h2>
  <p>Our team of licensed PEs and 20+ engineers works city-by-city, with fast quote turnaround on every request. Tell us where your project is and we'll confirm licensure and local code requirements in one call.</p>
  <a class="cta" href="/contact">Contact Us</a>
</div></section>`;

  return htmlShell({
    title: "Service Areas | Engineering Services in 49 States | Apex Grid",
    description:
      "Apex Grid Engineering provides licensed MEP, structural, civil, and energy code compliance services across 49 US states. Find your state's codes and requirements.",
    canonical: `${SITE}/locations/`,
    schemaJson: [orgSchema, breadcrumbSchema(crumbs)],
    body,
  });
}

/** Lightweight service-area page for a Census-listed city without curated data.
 * Inherits verified state-level code/climate facts; never invents city-specific claims. */
function cityLitePage(state: StateData, city: DirectoryCity, siblings: DirectoryCity[], curated: CityData[]): string {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Service Areas", href: "/locations/" },
    { name: state.name, href: `/locations/${state.slug}/` },
    { name: city.name },
  ];
  const idx = siblings.findIndex((c) => c.slug === city.slug);
  const nearby = siblings.filter((_, i) => i !== idx && Math.abs(i - idx) <= 5).slice(0, 10);
  const curatedInState = curated.filter((c) => c.stateSlug === state.slug);
  const popStr = city.pop.toLocaleString("en-US");
  const svcSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Engineering Services in ${city.name}, ${state.abbrev}`,
    provider: { "@type": "ProfessionalService", name: "Apex Grid Engineering", url: SITE },
    areaServed: { "@type": "City", name: `${city.name}, ${state.abbrev}` },
    serviceType: "Architectural, MEP, structural, civil, and energy-compliance design",
  };
  const body = `
${breadcrumb(crumbs)}
<section class="hero"><div class="container">
  <p class="kicker">${esc(state.name)} Service Area</p>
  <h1>Engineering Services <span class="dim">in ${esc(city.name)}, ${esc(state.abbrev)}</span></h1>
  <p class="lede">Licensed MEP, structural, civil, and energy-compliance engineering for ${esc(city.name)} projects (pop. ${popStr}) — designed to the ${esc(state.buildingCode.baseCode)} and permitted with the local jurisdiction. We confirm ${esc(city.name)}'s governing code editions and any local amendments with the permit office at project kickoff.</p>
</div></section>
<section class="block"><div class="container">
  <h2>Services for <em>${esc(city.name)}</em> Projects</h2>
  <div class="grid2">
  ${SERVICES.map(
    (s) => `<a class="card" href="/locations/${state.slug}/${s.slug}/"><div class="label">${esc(s.shortName)}</div><h3>${esc(s.name)} in ${esc(state.name)}</h3><p>${esc(s.intro)}</p></a>`,
  ).join("")}
  </div>
</div></section>
<section class="block"><div class="container">
  <h2>${esc(state.name)} <em>Design Environment</em></h2>
  <div class="statgrid">
    <div class="cell"><div class="k">Building Code (statewide)</div><div class="v">${esc(state.buildingCode.name)}</div></div>
    <div class="cell"><div class="k">Commercial Energy Code</div><div class="v">${esc(state.energyCode.commercial)}</div></div>
    <div class="cell"><div class="k">Climate Zone(s)</div><div class="v">${esc(state.climate.zones)}</div></div>
    <div class="cell"><div class="k">Seismic</div><div class="v">${esc(state.structural.seismic)}</div></div>
    <div class="cell"><div class="k">Wind</div><div class="v">${esc(state.structural.wind)}</div></div>
    <div class="cell"><div class="k">Snow</div><div class="v">${esc(state.structural.snow)}</div></div>
  </div>
  <p class="note">${esc(city.name)} may enforce local amendments on top of the statewide baseline. We verify the governing editions and amendments with the ${esc(city.name)} permitting authority before design begins.</p>
</div></section>
<section class="block"><div class="container">
  <h2>Permitting &amp; Licensure in <em>${esc(state.abbrev)}</em></h2>
  <div class="grid2">
    <div class="card"><div class="label">Permitting Landscape</div><p>${esc(state.permitting)}</p></div>
    <div class="card"><div class="label">PE Licensure — ${esc(state.licensure.board)}</div><p>${esc(state.licensure.notes)}</p></div>
  </div>
</div></section>
<section class="block"><div class="container">
  <h2>More <em>${esc(state.name)} Locations</em></h2>
  <div class="linkrow">${curatedInState
    .map((c) => `<a href="/locations/${state.slug}/${c.slug}/">${esc(c.name)}</a>`)
    .join("")}${nearby
    .map((n) => `<a href="/locations/${state.slug}/${n.slug}/">${esc(n.name)}</a>`)
    .join("")}<a href="/locations/${state.slug}/">${esc(state.name)} (statewide)</a></div>
</div></section>
<section class="ctaband"><div class="container">
  <h2>Build in ${esc(city.name)} with Apex Grid</h2>
  <p>With licensed PEs, an in-house architect, and 20+ engineers on staff, we take on ${esc(city.name)} projects of any size — with fast quote turnaround on every request.</p>
  <a class="cta" href="/contact">Request a Proposal</a>
</div></section>`;

  return htmlShell({
    title: `Engineering Services in ${city.name}, ${state.abbrev} | MEP, Structural, Civil | Apex Grid`,
    description: `Licensed MEP, structural, civil, and energy-compliance engineering serving ${city.name}, ${state.abbrev} under the ${state.buildingCode.baseCode}. Fast quotes, permit-ready documents.`,
    canonical: `${SITE}/locations/${state.slug}/${city.slug}/`,
    schemaJson: [orgSchema, svcSchema, breadcrumbSchema(crumbs)],
    body,
  });
}

function blogPostPage(post: BlogPost): string {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog/" },
    { name: post.title },
  ];
  const dateStr = new Date(post.date + "T12:00:00Z").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Organization", name: "Apex Grid Engineering", url: SITE },
    publisher: { "@type": "Organization", name: "Apex Grid Engineering", url: SITE },
    mainEntityOfPage: `${SITE}/blog/${post.slug}/`,
  };
  const others = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);
  const body = `
${breadcrumb(crumbs)}
<section class="hero"><div class="container">
  <p class="kicker">${esc(post.tag)} · ${esc(dateStr)} · ${post.minutes} min read</p>
  <h1>${esc(post.title)}</h1>
  <p class="lede">${esc(post.description)}</p>
</div></section>
<section class="block"><div class="container"><div class="prose">${post.html}</div></div></section>
<section class="block"><div class="container">
  <h2>More from the <em>Blog</em></h2>
  <div class="grid3">
  ${others
    .map((p) => `<a class="card" href="/blog/${p.slug}/"><div class="label">${esc(p.tag)}</div><h3>${esc(p.title)}</h3><p>${esc(p.description)}</p></a>`)
    .join("")}
  </div>
</div></section>
<section class="ctaband"><div class="container">
  <h2>Have a Project in Mind?</h2>
  <p>Architectural, MEP, structural, and civil design under one roof — licensed in 49 states, with fast quote turnaround.</p>
  <a class="cta" href="/contact">Request a Proposal</a>
</div></section>`;
  return htmlShell({
    title: `${post.title} | Apex Grid Engineering Blog`,
    description: post.description,
    canonical: `${SITE}/blog/${post.slug}/`,
    schemaJson: [orgSchema, articleSchema, breadcrumbSchema(crumbs)],
    body,
  });
}

function blogIndexPage(): string {
  const crumbs = [{ name: "Home", href: "/" }, { name: "Blog" }];
  const sorted = [...BLOG_POSTS].sort((a, b) => b.date.localeCompare(a.date));
  const body = `
${breadcrumb(crumbs)}
<section class="hero"><div class="container">
  <p class="kicker">Insights &amp; Guidance</p>
  <h1>The Apex Grid <span class="dim">Blog</span></h1>
  <p class="lede">Practical engineering guidance on codes, permitting, coordination, and multi-state design — written by the team that stamps the drawings.</p>
</div></section>
<section class="block"><div class="container">
  <div class="grid2">
  ${sorted
    .map(
      (p) =>
        `<a class="card" href="/blog/${p.slug}/"><div class="label">${esc(p.tag)} · ${esc(new Date(p.date + "T12:00:00Z").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }))}</div><h3>${esc(p.title)}</h3><p>${esc(p.description)}</p></a>`,
    )
    .join("")}
  </div>
</div></section>
<section class="ctaband"><div class="container">
  <h2>Questions About Your Jurisdiction?</h2>
  <p>We track code adoptions across 49 states. Tell us where you're building and we'll confirm what applies.</p>
  <a class="cta" href="/contact">Contact Us</a>
</div></section>`;
  return htmlShell({
    title: "Blog | Engineering, Codes & Permitting Insights | Apex Grid",
    description:
      "Practical articles on building codes, energy compliance, MEP coordination, structural design, and multi-state permitting from Apex Grid Engineering.",
    canonical: `${SITE}/blog/`,
    schemaJson: [orgSchema, breadcrumbSchema(crumbs)],
    body,
  });
}

/** Top-level, content-rich discipline page (e.g. /structural-engineering/). */
function disciplinePage(d: DisciplineDef): string {
  const url = `/${d.slug}/`;
  const crumbs = [{ name: "Home", href: "/" }, { name: d.name }];
  const others = DISCIPLINES.filter((x) => x.slug !== d.slug);
  const svcSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: d.name,
    serviceType: d.name,
    provider: { "@type": "ProfessionalService", name: "Apex Grid Engineering", url: SITE },
    areaServed: { "@type": "Country", name: "United States" },
    url: `${SITE}${url}`,
    description: d.metaDescription,
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: d.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  const body = `
${breadcrumb(crumbs)}
<section class="hero"><div class="container">
  <p class="kicker">${esc(d.kicker)}</p>
  <h1>${esc(d.h1)}</h1>
  <p class="lede">${esc(d.lede)}</p>
</div></section>

${d.sections
  .map(
    (s) => `<section class="block"><div class="container">
  <h2>${esc(s.heading)}</h2>
  <div class="prose">${s.paragraphs.map((p) => `<p>${esc(p)}</p>`).join("")}</div>
</div></section>`,
  )
  .join("\n")}

<section class="block"><div class="container">
  <h2>What You <em>Receive</em></h2>
  <div class="grid2">${d.deliverables
    .map((x) => `<div class="card"><div class="label">Deliverable</div><h3>${esc(x.title)}</h3><p>${esc(x.desc)}</p></div>`)
    .join("")}</div>
</div></section>

<section class="block"><div class="container">
  <h2>Common <em>Project Types</em></h2>
  <ul class="scope">${d.useCases.map((u) => `<li>${esc(u)}</li>`).join("")}</ul>
</div></section>

<section class="block"><div class="container faq">
  <h2>${esc(d.shortName)} Engineering <em>FAQs</em></h2>
  ${d.faqs.map((f) => `<details><summary>${esc(f.q)}</summary><div class="a">${esc(f.a)}</div></details>`).join("")}
</div></section>

<section class="block"><div class="container">
  <h2>Related <em>Disciplines &amp; Resources</em></h2>
  <div class="linkrow" style="margin-bottom:16px">${others
    .map((o) => `<a href="/${o.slug}/">${esc(o.name)}</a>`)
    .join("")}</div>
  <div class="linkrow"><a href="/services">All Services</a><a href="/locations/">Service Areas (49 States)</a><a href="/blog/">Engineering Blog</a><a href="/portfolio">Portfolio</a></div>
</div></section>

<section class="ctaband"><div class="container">
  <h2>Put a Licensed ${esc(d.shortName)} Engineer on Your Project</h2>
  <p>Send us your backgrounds or a project description. With licensed PEs in 49 states and 20+ engineers on staff, we return a fixed-fee proposal — deliverables, timeline, and fee — typically within 12–24 hours.</p>
  <a class="cta" href="/contact">Request a Proposal</a>
</div></section>`;

  return htmlShell({
    title: d.metaTitle,
    description: d.metaDescription,
    canonical: `${SITE}${url}`,
    schemaJson: [orgSchema, svcSchema, faqSchema, breadcrumbSchema(crumbs)],
    body,
  });
}
function writeSitemap(states: StateData[], cities: CityData[], directory: CityDirectory) {
  const today = new Date().toISOString().slice(0, 10);
  const core = [
    ["/", "1.0", "weekly"],
    ["/services", "0.9", "monthly"],
    ["/services/mep", "0.8", "monthly"],
    ["/services/structural", "0.8", "monthly"],
    ["/services/civil", "0.8", "monthly"],
    ["/services/assessments", "0.8", "monthly"],
    ["/services/architecture", "0.8", "monthly"],
    ...DISCIPLINES.map((d) => [`/${d.slug}/`, "0.9", "monthly"] as [string, string, string]),
    ["/portfolio", "0.8", "monthly"],
    ["/industries", "0.7", "monthly"],
    ["/military", "0.7", "monthly"],
    ["/resources", "0.7", "weekly"],
    ["/about", "0.6", "monthly"],
    ["/team", "0.6", "monthly"],
    ["/contact", "0.7", "monthly"],
    ["/for-architects", "0.8", "monthly"],
    ["/for-contractors", "0.8", "monthly"],
    ["/for-developers", "0.8", "monthly"],
    ["/for-property-managers", "0.8", "monthly"],
  ];
  const urls: string[] = core.map(
    ([p, pr, cf]) => `  <url><loc>${SITE}${p}</loc><changefreq>${cf}</changefreq><priority>${pr}</priority></url>`,
  );
  for (const ind of ALL_INDUSTRIES) {
    urls.push(`  <url><loc>${SITE}/industries/${ind.slug}</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>`);
  }
  urls.push(`  <url><loc>${SITE}/locations/</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>`);
  for (const s of states) {
    urls.push(`  <url><loc>${SITE}/locations/${s.slug}/</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.6</priority></url>`);
    for (const svc of SERVICES) {
      urls.push(`  <url><loc>${SITE}/locations/${s.slug}/${svc.slug}/</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`);
    }
    for (const c of cities.filter((c) => c.stateSlug === s.slug)) {
      urls.push(`  <url><loc>${SITE}/locations/${s.slug}/${c.slug}/</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`);
      for (const svc of SERVICES) {
        urls.push(`  <url><loc>${SITE}/locations/${s.slug}/${c.slug}/${svc.slug}/</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`);
      }
    }
    const curatedSlugs = new Set(cities.filter((c) => c.stateSlug === s.slug).map((c) => c.slug));
    for (const d of directory[s.slug] ?? []) {
      if (curatedSlugs.has(d.slug)) continue;
      urls.push(`  <url><loc>${SITE}/locations/${s.slug}/${d.slug}/</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.5</priority></url>`);
    }
  }
  urls.push(`  <url><loc>${SITE}/blog/</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>`);
  for (const p of BLOG_POSTS) {
    urls.push(`  <url><loc>${SITE}/blog/${p.slug}/</loc><lastmod>${p.date}</lastmod><changefreq>yearly</changefreq><priority>0.6</priority></url>`);
  }
  // Resources
  urls.push(`  <url><loc>${SITE}/resources/</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>`);
  for (const d of RESOURCE_DISCIPLINES) {
    urls.push(`  <url><loc>${SITE}/resources/${d.slug}/</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`);
  }
  for (const a of RESOURCE_ARTICLES) {
    urls.push(`  <url><loc>${SITE}${resourceUrl(a)}</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`);
  }
  // Who We Work With
  urls.push(`  <url><loc>${SITE}/who-we-work-with/</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>`);
  for (const cp of CLIENT_PAGES) {
    urls.push(`  <url><loc>${SITE}/who-we-work-with/${cp.slug}/</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`);
  }
  // Project Types
  urls.push(`  <url><loc>${SITE}/project-types/</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>`);
  for (const pt of PROJECT_TYPE_PAGES) {
    urls.push(`  <url><loc>${SITE}/project-types/${pt.slug}/</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`);
  }
  // Existing Building Engineering
  urls.push(`  <url><loc>${SITE}/existing-building-engineering/</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>`);
  for (const eb of EXISTING_BUILDING_PAGES) {
    urls.push(`  <url><loc>${SITE}/existing-building-engineering/${eb.slug}/</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`);
  }
  // Permit Engineering
  urls.push(`  <url><loc>${SITE}/permit-engineering/</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>`);
  for (const pp of PERMIT_PAGES) {
    urls.push(`  <url><loc>${SITE}/permit-engineering/${pp.slug}/</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`);
  }
  // Industry × Discipline pages
  for (const idp of INDUSTRY_DISCIPLINE_PAGES) {
    const url = getIndustryDisciplineUrl(idp);
    urls.push(`  <url><loc>${SITE}${url}</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>`);
  }
  // Location × Service pages
  for (const lsp of LOCATION_SERVICE_PAGES) {
    urls.push(`  <url><loc>${SITE}/locations/${lsp.stateSlug}/${lsp.citySlug}/${lsp.serviceSlug}/</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`);
  }
  // Solutions hub + individual pages
  urls.push(`  <url><loc>${SITE}/solutions/</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>`);
  urls.push(`  <url><loc>${SITE}/government/</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>`);
  for (const sp of SOLUTION_PAGES) {
    urls.push(`  <url><loc>${SITE}/${sp.dir}/${sp.slug}/</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`);
  }
  // Engineering Glossary hub + individual pages
  urls.push(`  <url><loc>${SITE}/engineering-glossary/</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>`);
  for (const gt of GLOSSARY_TERMS) {
    urls.push(`  <url><loc>${SITE}/engineering-glossary/${gt.slug}/</loc><lastmod>${today}</lastmod><changefreq>yearly</changefreq><priority>0.6</priority></url>`);
  }
  // Guides hub + individual pages
  urls.push(`  <url><loc>${SITE}/guides/</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>`);
  for (const gp of GUIDE_PAGES) {
    urls.push(`  <url><loc>${SITE}/guides/${gp.slug}/</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`);
  }
  // Structural extended subpages
  for (const sp of STRUCTURAL_EXTENDED_PAGES) {
    urls.push(`  <url><loc>${SITE}/structural-engineering/${sp.slug}/</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>`);
  }
  // Title 24 hub + subpages
  urls.push(`  <url><loc>${SITE}/title-24/</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.9</priority></url>`);
  for (const tp of TITLE_24_PAGES) {
    urls.push(`  <url><loc>${SITE}/title-24/${tp.slug}/</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>`);
  }
  // Projects hub + category pages
  urls.push(`  <url><loc>${SITE}/projects/</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>`);
  for (const cat of PROJECT_CATEGORY_PAGES) {
    urls.push(`  <url><loc>${SITE}/projects/${cat.slug}/</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`);
  }
  // Static standalone pages
  for (const sp of STATIC_STANDALONE_PAGES) {
    urls.push(`  <url><loc>${SITE}/${sp.dir}/</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>`);
  }
  // HTML sitemap
  urls.push(`  <url><loc>${SITE}/sitemap/</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.3</priority></url>`);
  // Discipline hub + subservice pages
  for (const hub of DISCIPLINE_HUBS) {
    urls.push(`  <url><loc>${SITE}/${hub.slug}/</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.9</priority></url>`);
    for (const sp of hub.subpages) {
      urls.push(`  <url><loc>${SITE}/${hub.slug}/${sp.slug}/</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>`);
    }
  }
  // Misc standalone pages
  for (const mp of MISC_PAGES) {
    urls.push(`  <url><loc>${SITE}/${mp.slug}/</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>`);
  }
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`;
  fs.writeFileSync(path.join(PUBLIC, "sitemap.xml"), xml);
}

// ─── Resource Articles ─────────────────────────────────────────────────────

function resourceArticlePage(article: ResourceArticle): string {
  const disc = disciplineOf(article);
  const url = resourceUrl(article);
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Resources", href: "/resources/" },
    { name: disc.name, href: `/resources/${disc.slug}/` },
    { name: article.h1 },
  ];
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.h1,
    description: article.description,
    author: { "@type": "Organization", name: "Apex Grid Engineering", url: SITE },
    publisher: { "@type": "Organization", name: "Apex Grid Engineering", url: SITE },
    mainEntityOfPage: `${SITE}${url}`,
  };
  const others = RESOURCE_ARTICLES.filter((a) => a.slug !== article.slug && a.tag === article.tag).slice(0, 3);
  const fallbacks = RESOURCE_ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 3 - others.length);
  const related = [...others, ...fallbacks].slice(0, 3);
  const body = `
${breadcrumb(crumbs)}
<section class="hero"><div class="container">
  <p class="kicker">${esc(article.tag)} · ${article.minutes} min read</p>
  <h1>${esc(article.h1)}</h1>
  <p class="lede">${esc(article.description)}</p>
</div></section>
<section class="block"><div class="container"><div class="prose">${article.html}</div></div></section>
${related.length ? `<section class="block"><div class="container">
  <h2>More from <em>Resources</em></h2>
  <div class="grid3">
  ${related.map((a) => `<a class="card" href="${resourceUrl(a)}"><div class="label">${esc(a.tag)}</div><h3>${esc(a.h1)}</h3><p>${esc(a.description)}</p></a>`).join("")}
  </div>
</div></section>` : ""}
<section class="ctaband"><div class="container">
  <h2>Have a Project in Mind?</h2>
  <p>Integrated structural, MEP, civil, and geotechnical engineering — licensed in 49 states. Send us your scope and get a clear proposal within 24 hours.</p>
  <a class="cta" href="/contact">Request a Proposal</a>
</div></section>`;
  return htmlShell({
    title: article.title,
    description: article.description,
    canonical: `${SITE}${url}`,
    schemaJson: [orgSchema, articleSchema, breadcrumbSchema(crumbs)],
    body,
  });
}

/** Category index page at /resources/{discipline}/ listing all articles in that discipline. */
function resourceDisciplinePage(disc: ResourceDiscipline): string {
  const articles = RESOURCE_ARTICLES.filter((a) => a.tag === disc.tag);
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Resources", href: "/resources/" },
    { name: disc.name },
  ];
  const otherDiscs = RESOURCE_DISCIPLINES.filter((d) => d.slug !== disc.slug);
  const body = `
${breadcrumb(crumbs)}
<section class="hero"><div class="container">
  <p class="kicker">Engineering Knowledge Center</p>
  <h1>${esc(disc.name)} <span class="dim">Resources</span></h1>
  <p class="lede">${esc(disc.blurb)} ${articles.length} guides written by the licensed engineers who do the work.</p>
</div></section>
<section class="block"><div class="container">
  <div class="grid2">
  ${articles.map((a) => `<a class="card" href="${resourceUrl(a)}"><div class="label">${esc(a.tag)} · ${a.minutes} min</div><h3>${esc(a.h1)}</h3><p>${esc(a.description)}</p></a>`).join("")}
  </div>
</div></section>
<section class="block"><div class="container">
  <h2>Browse Other <em>Topics</em></h2>
  <div class="linkrow">${otherDiscs.map((d) => `<a href="/resources/${d.slug}/">${esc(d.name)} Resources</a>`).join("")}<a href="/resources/">All Resources</a></div>
</div></section>
<section class="ctaband"><div class="container">
  <h2>Ready to Start Your Project?</h2>
  <p>Licensed structural, MEP, civil, and geotechnical engineering in 49 states — with fast quote turnaround.</p>
  <a class="cta" href="/contact">Request a Proposal</a>
</div></section>`;
  return htmlShell({
    title: `${disc.name} Engineering Resources & Guides | Apex Grid Engineering`,
    description: `${disc.blurb} Practical ${disc.name.toLowerCase()} guides written by licensed professional engineers at Apex Grid Engineering.`,
    canonical: `${SITE}/resources/${disc.slug}/`,
    schemaJson: [orgSchema, breadcrumbSchema(crumbs)],
    body,
  });
}
function resourcesHubPage(): string {
  const crumbs = [{ name: "Home", href: "/" }, { name: "Resources" }];
  const body = `
${breadcrumb(crumbs)}
<section class="hero"><div class="container">
  <p class="kicker">Engineering Knowledge Center</p>
  <h1>Engineering <span class="dim">Resources</span></h1>
  <p class="lede">Practical answers to the questions architects, contractors, property owners, and developers ask most — ${RESOURCE_ARTICLES.length} guides across structural, MEP, civil, geotechnical, and permit engineering, written by licensed engineers who do the work.</p>
</div></section>
${RESOURCE_DISCIPLINES.map((disc) => {
  const articles = RESOURCE_ARTICLES.filter((a) => a.tag === disc.tag);
  if (!articles.length) return "";
  return `
<section class="block"><div class="container">
  <h2>${esc(disc.name)} <em>Guides</em></h2>
  <p class="note" style="margin-bottom:16px">${esc(disc.blurb)} <a href="/resources/${disc.slug}/">View all ${articles.length} ${esc(disc.name)} guides →</a></p>
  <div class="grid2">
  ${articles.map((a) => `<a class="card" href="${resourceUrl(a)}"><div class="label">${esc(a.tag)} · ${a.minutes} min</div><h3>${esc(a.h1)}</h3><p>${esc(a.description)}</p></a>`).join("")}
  </div>
</div></section>`;
}).join("")}
<section class="ctaband"><div class="container">
  <h2>Ready to Start Your Project?</h2>
  <p>Licensed structural, MEP, civil, and geotechnical engineering in 49 states — with fast quote turnaround.</p>
  <a class="cta" href="/contact">Request a Proposal</a>
</div></section>`;
  return htmlShell({
    title: "Engineering Resources & Guides | Apex Grid Engineering",
    description: "Practical engineering guides on structural, MEP, civil, geotechnical, and permit topics — written by licensed professional engineers at Apex Grid Engineering.",
    canonical: `${SITE}/resources/`,
    schemaJson: [orgSchema, breadcrumbSchema(crumbs)],
    body,
  });
}

// ─── Who We Work With ──────────────────────────────────────────────────────

function clientPage(page: ClientPage): string {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Who We Work With", href: "/who-we-work-with/" },
    { name: page.h1 },
  ];
  const svcSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.h1,
    provider: { "@type": "ProfessionalService", name: "Apex Grid Engineering", url: SITE },
    serviceType: "Engineering Consulting",
  };
  const others = CLIENT_PAGES.filter((p) => p.slug !== page.slug).slice(0, 4);
  const body = `
${breadcrumb(crumbs)}
<section class="hero"><div class="container">
  <p class="kicker">${esc(page.kicker)}</p>
  <h1>${esc(page.h1)}</h1>
  <p class="lede">${esc(page.lede)}</p>
</div></section>
${page.sections.map((s) => `
<section class="block"><div class="container">
  <h2>${esc(s.heading)}</h2>
  <div class="prose"><p>${esc(s.body)}</p></div>
</div></section>`).join("")}
<section class="block"><div class="container">
  <h2>Other <em>Clients We Serve</em></h2>
  <div class="grid2">
  ${others.map((p) => `<a class="card" href="/who-we-work-with/${p.slug}/"><div class="label">Engineering For</div><h3>${esc(p.h1)}</h3><p>${esc(p.lede.slice(0, 120))}…</p></a>`).join("")}
  </div>
</div></section>
<section class="ctaband"><div class="container">
  <h2>Start Working With Apex Grid</h2>
  <p>Licensed in 49 states, 20+ engineers on staff, 12–24 hour quote turnaround. Tell us about your project and we'll respond fast.</p>
  <a class="cta" href="${esc(page.ctaHref)}">${esc(page.cta)}</a>
</div></section>`;
  return htmlShell({
    title: page.title,
    description: page.description,
    canonical: `${SITE}/who-we-work-with/${page.slug}/`,
    schemaJson: [orgSchema, svcSchema, breadcrumbSchema(crumbs)],
    body,
  });
}

function whoWeWorkWithHubPage(): string {
  const crumbs = [{ name: "Home", href: "/" }, { name: "Who We Work With" }];
  const hub = WHO_WE_WORK_WITH_HUB;
  const body = `
${breadcrumb(crumbs)}
<section class="hero"><div class="container">
  <p class="kicker">Our Clients & Partners</p>
  <h1>${esc(hub.h1)}</h1>
  <p class="lede">${esc(hub.lede)}</p>
</div></section>
<section class="block"><div class="container">
  <h2>Choose <em>Your Role</em></h2>
  <div class="grid2">
  ${CLIENT_PAGES.map((p) => `<a class="card" href="/who-we-work-with/${p.slug}/"><div class="label">${esc(p.kicker)}</div><h3>${esc(p.h1)}</h3><p>${esc(p.lede.slice(0, 130))}…</p></a>`).join("")}
  </div>
</div></section>
<section class="ctaband"><div class="container">
  <h2>Not Sure Where to Start?</h2>
  <p>Tell us about your project and we'll take it from there — clear proposal, fast turnaround, licensed engineers in 49 states.</p>
  <a class="cta" href="/contact">Contact Us</a>
</div></section>`;
  return htmlShell({
    title: hub.title,
    description: hub.description,
    canonical: `${SITE}/who-we-work-with/`,
    schemaJson: [orgSchema, breadcrumbSchema(crumbs)],
    body,
  });
}

// ─── Project Type Pages ────────────────────────────────────────────────────

function projectTypePage(page: ProjectTypePage): string {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Project Types", href: "/project-types/" },
    { name: page.h1 },
  ];
  const svcSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.h1,
    provider: { "@type": "ProfessionalService", name: "Apex Grid Engineering", url: SITE },
    serviceType: page.h1,
  };
  const others = PROJECT_TYPE_PAGES.filter((p) => p.slug !== page.slug)
    .filter((p) => page.relatedSlugs.includes(p.slug) || true)
    .slice(0, 4);
  const body = `
${breadcrumb(crumbs)}
<section class="hero"><div class="container">
  <p class="kicker">${esc(page.kicker)}</p>
  <h1>${esc(page.h1)}</h1>
  <p class="lede">${esc(page.lede)}</p>
</div></section>
<section class="block"><div class="container">
  <h2>Engineering <em>Disciplines Involved</em></h2>
  <ul class="scope">${page.disciplines.map((d) => `<li>${esc(d)}</li>`).join("")}</ul>
</div></section>
<section class="block"><div class="container">
  <h2>What This <em>Scope Includes</em></h2>
  <ul class="scope">${page.topics.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
</div></section>
<section class="block"><div class="container">
  <h2>Related <em>Project Types</em></h2>
  <div class="grid2">
  ${others.map((p) => `<a class="card" href="/project-types/${p.slug}/"><div class="label">${esc(p.kicker)}</div><h3>${esc(p.h1)}</h3><p>${esc(p.lede.slice(0, 120))}…</p></a>`).join("")}
  </div>
</div></section>
<section class="ctaband"><div class="container">
  <h2>Start Your Project</h2>
  <p>Licensed structural, MEP, civil, and geotechnical engineering in 49 states — with fast quote turnaround. Send us your scope and get a clear proposal.</p>
  <a class="cta" href="/contact">Request a Proposal</a>
</div></section>`;
  return htmlShell({
    title: page.title,
    description: page.description,
    canonical: `${SITE}/project-types/${page.slug}/`,
    schemaJson: [orgSchema, svcSchema, breadcrumbSchema(crumbs)],
    body,
  });
}

function projectTypesHubPage(): string {
  const crumbs = [{ name: "Home", href: "/" }, { name: "Project Types" }];
  const hub = PROJECT_TYPES_HUB;
  const body = `
${breadcrumb(crumbs)}
<section class="hero"><div class="container">
  <p class="kicker">Engineering by Project Stage</p>
  <h1>${esc(hub.h1)}</h1>
  <p class="lede">${esc(hub.lede)}</p>
</div></section>
<section class="block"><div class="container">
  <div class="grid2">
  ${PROJECT_TYPE_PAGES.map((p) => `<a class="card" href="/project-types/${p.slug}/"><div class="label">${esc(p.kicker)}</div><h3>${esc(p.h1)}</h3><p>${esc(p.lede.slice(0, 130))}…</p></a>`).join("")}
  </div>
</div></section>
<section class="ctaband"><div class="container">
  <h2>Ready to Get Started?</h2>
  <p>Tell us what stage your project is in and we'll match the right engineering services to your scope and schedule.</p>
  <a class="cta" href="/contact">Request a Proposal</a>
</div></section>`;
  return htmlShell({
    title: hub.title,
    description: hub.description,
    canonical: `${SITE}/project-types/`,
    schemaJson: [orgSchema, breadcrumbSchema(crumbs)],
    body,
  });
}

// ─── Existing Building Pages ───────────────────────────────────────────────

function existingBuildingPage(page: ExistingBuildingPage): string {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Existing Building Engineering", href: "/existing-building-engineering/" },
    { name: page.h1 },
  ];
  const svcSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.h1,
    provider: { "@type": "ProfessionalService", name: "Apex Grid Engineering", url: SITE },
    serviceType: page.h1,
  };
  const others = EXISTING_BUILDING_PAGES.filter((p) => p.slug !== page.slug).slice(0, 4);
  const body = `
${breadcrumb(crumbs)}
<section class="hero"><div class="container">
  <p class="kicker">${esc(page.kicker)}</p>
  <h1>${esc(page.h1)}</h1>
  <p class="lede">${esc(page.lede)}</p>
</div></section>
<section class="block"><div class="container">
  <h2>Scope of <em>Services</em></h2>
  <ul class="scope">${page.topics.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
  ${page.note ? `<p class="note" style="margin-top:20px">${esc(page.note)}</p>` : ""}
</div></section>
<section class="block"><div class="container">
  <h2>Related <em>Existing Building Services</em></h2>
  <div class="grid2">
  ${others.map((p) => `<a class="card" href="/existing-building-engineering/${p.slug}/"><div class="label">${esc(p.kicker)}</div><h3>${esc(p.h1)}</h3><p>${esc(p.lede.slice(0, 120))}…</p></a>`).join("")}
  </div>
</div></section>
<section class="ctaband"><div class="container">
  <h2>Tell Us About Your Building</h2>
  <p>Send us what you have — drawings, photos, or just a description. We'll tell you what engineering is needed and how much it costs. Fast quotes, no runaround.</p>
  <a class="cta" href="/contact">Request a Proposal</a>
</div></section>`;
  return htmlShell({
    title: page.title,
    description: page.description,
    canonical: `${SITE}/existing-building-engineering/${page.slug}/`,
    schemaJson: [orgSchema, svcSchema, breadcrumbSchema(crumbs)],
    body,
  });
}

function existingBuildingHubPage(): string {
  const crumbs = [{ name: "Home", href: "/" }, { name: "Existing Building Engineering" }];
  const hub = EXISTING_BUILDING_HUB;
  const body = `
${breadcrumb(crumbs)}
<section class="hero"><div class="container">
  <p class="kicker">Existing Building Engineering</p>
  <h1>${esc(hub.h1)}</h1>
  <p class="lede">${esc(hub.lede)}</p>
</div></section>
<section class="block"><div class="container">
  <div class="grid2">
  ${EXISTING_BUILDING_PAGES.map((p) => `<a class="card" href="/existing-building-engineering/${p.slug}/"><div class="label">${esc(p.kicker)}</div><h3>${esc(p.h1)}</h3><p>${esc(p.lede.slice(0, 130))}…</p></a>`).join("")}
  </div>
</div></section>
<section class="ctaband"><div class="container">
  <h2>Send Us What You Have</h2>
  <p>No drawings? No problem. Send photos, measurements, and a project description. We'll review what you have and tell you what engineering is needed.</p>
  <a class="cta" href="/contact">Contact Us</a>
</div></section>`;
  return htmlShell({
    title: hub.title,
    description: hub.description,
    canonical: `${SITE}/existing-building-engineering/`,
    schemaJson: [orgSchema, breadcrumbSchema(crumbs)],
    body,
  });
}

// ─── Permit Engineering Pages ──────────────────────────────────────────────

function permitPage(page: PermitPage): string {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Permit Engineering", href: "/permit-engineering/" },
    { name: page.h1 },
  ];
  const svcSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.h1,
    provider: { "@type": "ProfessionalService", name: "Apex Grid Engineering", url: SITE },
    serviceType: "Permit Engineering",
  };
  const others = PERMIT_PAGES.filter((p) => p.slug !== page.slug).slice(0, 4);
  const body = `
${breadcrumb(crumbs)}
<section class="hero"><div class="container">
  <p class="kicker">${esc(page.kicker)}</p>
  <h1>${esc(page.h1)}</h1>
  <p class="lede">${esc(page.lede)}</p>
</div></section>
<section class="block"><div class="container">
  <h2>What This <em>Service Includes</em></h2>
  <ul class="scope">${page.topics.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
  ${page.note ? `<p class="note" style="margin-top:20px">${esc(page.note)}</p>` : ""}
</div></section>
<section class="block"><div class="container">
  <h2>Related <em>Permit Services</em></h2>
  <div class="grid2">
  ${others.map((p) => `<a class="card" href="/permit-engineering/${p.slug}/"><div class="label">${esc(p.kicker)}</div><h3>${esc(p.h1)}</h3><p>${esc(p.lede.slice(0, 120))}…</p></a>`).join("")}
  </div>
</div></section>
<section class="ctaband"><div class="container">
  <h2>Ready to Submit for Permit?</h2>
  <p>We produce complete, PE-stamped permit packages and support the submittal through final approval. Fast turnaround, 49-state licensure.</p>
  <a class="cta" href="/contact">Request a Proposal</a>
</div></section>`;
  return htmlShell({
    title: page.title,
    description: page.description,
    canonical: `${SITE}/permit-engineering/${page.slug}/`,
    schemaJson: [orgSchema, svcSchema, breadcrumbSchema(crumbs)],
    body,
  });
}

function permitHubPage(): string {
  const crumbs = [{ name: "Home", href: "/" }, { name: "Permit Engineering" }];
  const hub = PERMIT_HUB;
  const body = `
${breadcrumb(crumbs)}
<section class="hero"><div class="container">
  <p class="kicker">Permit Engineering Services</p>
  <h1>${esc(hub.h1)}</h1>
  <p class="lede">${esc(hub.lede)}</p>
</div></section>
<section class="block"><div class="container">
  <div class="grid2">
  ${PERMIT_PAGES.map((p) => `<a class="card" href="/permit-engineering/${p.slug}/"><div class="label">${esc(p.kicker)}</div><h3>${esc(p.h1)}</h3><p>${esc(p.lede.slice(0, 130))}…</p></a>`).join("")}
  </div>
</div></section>
<section class="ctaband"><div class="container">
  <h2>Need Engineering for a Permit?</h2>
  <p>Licensed in 49 states. PE-stamped structural, MEP, and civil engineering for building permits — complete packages delivered on your schedule.</p>
  <a class="cta" href="/contact">Request a Proposal</a>
</div></section>`;
  return htmlShell({
    title: hub.title,
    description: hub.description,
    canonical: `${SITE}/permit-engineering/`,
    schemaJson: [orgSchema, breadcrumbSchema(crumbs)],
    body,
  });
}

// ─── Industry × Discipline Pages ──────────────────────────────────────────

function industryDisciplinePage(page: IndustryDisciplinePage): string {
  const url = getIndustryDisciplineUrl(page);
  // Build breadcrumb from segments
  const crumbs: { name: string; href?: string }[] = [{ name: "Home", href: "/" }, { name: "Industries", href: "/industries/" }];
  if (page.segments.length > 2) {
    // sub-industry path: e.g. ["healthcare","hospitals","mep-engineering"]
    crumbs.push({ name: toTitle(page.segments[1]), href: `/industries/${page.segments[0]}/` });
  } else {
    crumbs.push({ name: toTitle(page.segments[0]), href: `/industries/${page.industrySlug}/` });
  }
  crumbs.push({ name: page.disciplineLabel });

  // Related pages: same industry, different discipline
  const siblings = INDUSTRY_DISCIPLINE_PAGES.filter(
    (p) => p.industrySlug === page.industrySlug && p !== page,
  ).slice(0, 4);

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.h1,
    description: page.description,
    provider: { "@type": "Organization", name: "Apex Grid Engineering", url: SITE },
    url: `${SITE}${url}`,
    areaServed: { "@type": "Country", name: "United States" },
  };

  const body = `
${breadcrumb(crumbs)}
<section class="hero"><div class="container">
  <p class="kicker">${esc(page.kicker)}</p>
  <h1>${esc(page.h1)}</h1>
  <p class="lede">${esc(page.lede)}</p>
</div></section>

<section class="block"><div class="container">
  <h2>What We <em>Engineer</em></h2>
  <ul class="scope">
    ${page.topics.map((t) => `<li>${esc(t)}</li>`).join("\n    ")}
  </ul>
</div></section>

<section class="block"><div class="container">
  <h2>Why Apex Grid for <em>${esc(page.disciplineLabel)}</em>?</h2>
  <div class="grid2">
    <div class="card"><div class="label">Licensed in 49 States</div><p>Our engineers hold PE licensure across the continental US, so your project can start without waiting on out-of-state licensing delays.</p></div>
    <div class="card"><div class="label">20+ Engineers On Staff</div><p>Structural, MEP, civil, and geotech disciplines under one roof means coordinated deliverables and no finger-pointing between firms.</p></div>
    <div class="card"><div class="label">Fast Turnaround</div><p>We quote within 24 hours and structure deliverable milestones around your permit or construction schedule — not ours.</p></div>
    <div class="card"><div class="label">15+ Years of Project Experience</div><p>Across hundreds of commercial, industrial, healthcare, and government projects — we've seen the permitting challenges your project will face.</p></div>
  </div>
</div></section>

${siblings.length ? `<section class="block"><div class="container">
  <h2>More <em>Engineering Services</em> for This Sector</h2>
  <div class="grid2">
  ${siblings.map((s) => `<a class="card" href="${getIndustryDisciplineUrl(s)}"><div class="label">${esc(s.kicker)}</div><h3>${esc(s.h1)}</h3><p>${esc(s.lede.slice(0, 120))}…</p></a>`).join("")}
  </div>
  <div class="linkrow" style="margin-top:20px"><a href="/industries/${esc(page.industrySlug)}/">Back to ${esc(toTitle(page.industrySlug))} Engineering</a></div>
</div></section>` : ""}

<section class="ctaband"><div class="container">
  <h2>Start Your Project</h2>
  <p>Licensed PEs, 20+ engineers, and fast proposals. Send us your scope and get a clear quote: deliverables, schedule, and fee — usually within 24 hours.</p>
  <a class="cta" href="/contact">Request a Proposal</a>
</div></section>`;

  return htmlShell({
    title: page.title,
    description: page.description,
    canonical: `${SITE}${url}`,
    schemaJson: [orgSchema, pageSchema, breadcrumbSchema(crumbs)],
    body,
  });
}

/** Convert a slug like "military-defense" → "Military Defense" for display */
function toTitle(slug: string): string {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

// ─── Location × Service Pages ─────────────────────────────────────────────

function locationServicePage(page: LocationServicePage): string {
  const url = `/locations/${page.stateSlug}/${page.citySlug}/${page.serviceSlug}/`;
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Locations", href: "/locations/" },
    { name: page.stateName, href: `/locations/${page.stateSlug}/` },
    { name: page.cityName, href: `/locations/${page.stateSlug}/${page.citySlug}/` },
    { name: toTitle(page.serviceSlug) },
  ];
  const relatedLinks = page.relatedServiceSlugs
    .slice(0, 3)
    .map((s) => `<a href="/locations/${page.stateSlug}/${page.citySlug}/${s}/">${toTitle(s)}</a>`)
    .join(" · ");
  const body = `
    <div class="hero hero--page">
      <div class="hero-inner">
        <div class="kicker">${esc(page.kicker)}</div>
        <h1>${esc(page.h1)}</h1>
        <p class="lede">${esc(page.lede)}</p>
        <a class="btn btn--primary" href="/contact/">Request a Proposal</a>
      </div>
    </div>

    ${breadcrumb(crumbs)}

    <section class="section section--white">
      <div class="container container--narrow">
        <h2>What We Engineer</h2>
        <ul class="check-list">
          ${page.topics.map((t) => `<li>${esc(t)}</li>`).join("\n          ")}
        </ul>
      </div>
    </section>

    <section class="section section--light">
      <div class="container container--narrow">
        <h2>Local Engineering Context</h2>
        <dl class="detail-list">
          <dt>Authority Having Jurisdiction</dt><dd>${esc(page.ahj)}</dd>
          <dt>Building Code</dt><dd>${esc(page.buildingCode)}</dd>
          <dt>Energy Code</dt><dd>${esc(page.energyCode)}</dd>
          <dt>Local Market</dt><dd>${esc(page.marketNote)}</dd>
          <dt>Climate &amp; Engineering Conditions</dt><dd>${esc(page.climateNote)}</dd>
        </dl>
      </div>
    </section>

    <section class="section section--white">
      <div class="container container--narrow">
        <h2>About Apex Grid Engineering</h2>
        <p>Apex Grid Engineering is a multi-discipline engineering firm licensed in 49 states and headquartered in Queen Creek, Arizona. We provide structural, MEP, civil, and geotechnical engineering for commercial, industrial, multifamily, and government clients — with 15+ years of experience and 20+ licensed engineers on staff.</p>
        <p>We work from architectural PDFs, CAD files, or field measurements, and we're set up to turn projects around on compressed schedules when the situation calls for it.</p>
        ${relatedLinks ? `<p>Related services in ${esc(page.cityName)}: ${relatedLinks}</p>` : ""}
      </div>
    </section>

    <section class="section section--dark cta-band">
      <div class="container">
        <h2>Ready to Start in ${esc(page.cityName)}?</h2>
        <p>Send us your drawings or describe your project and we'll respond within one business day.</p>
        <a class="btn btn--primary" href="/contact/">Get a Proposal</a>
        <a class="btn btn--secondary" href="tel:+14804900064">480-490-0064</a>
      </div>
    </section>`;

  const svcSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Apex Grid Engineering",
    "description": page.lede,
    "url": `${SITE}${url}`,
    "telephone": "+14804900064",
    "address": { "@type": "PostalAddress", "addressLocality": "Queen Creek", "addressRegion": "AZ", "postalCode": "85142" },
    "areaServed": { "@type": "City", "name": page.cityName },
    "serviceType": toTitle(page.serviceSlug),
  };

  return htmlShell({
    title: page.title,
    description: page.lede,
    canonical: `${SITE}${url}`,
    schemaJson: [svcSchema, breadcrumbSchema(crumbs)],
    body,
  });
}

// ─── Solution Pages ────────────────────────────────────────────────────────

function solutionPage(page: SolutionPage): string {
  const url = `/${page.dir}/${page.slug}/`;
  const dirLabel = page.dir === "solutions" ? "Solutions" : "Government Engineering";
  const dirHref = `/${page.dir}/`;
  const crumbs = [
    { name: "Home", href: "/" },
    { name: dirLabel, href: dirHref },
    { name: page.h1 },
  ];
  const relatedLinks = page.relatedSlugs
    .slice(0, 4)
    .map((s) => `<a class="card" href="/solutions/${s}/"><h3>${toTitle(s).replace(/Engineering$/, "").trim()}</h3></a>`)
    .join("\n          ");
  const body = `
    <div class="hero hero--page">
      <div class="hero-inner">
        <div class="kicker">${esc(page.kicker)}</div>
        <h1>${esc(page.h1)}</h1>
        <p class="lede">${esc(page.lede)}</p>
        <a class="btn btn--primary" href="/contact/">Request Engineering Support</a>
      </div>
    </div>

    ${breadcrumb(crumbs)}

    <section class="section section--white">
      <div class="container container--narrow">
        <h2>What This Engineering Scope Covers</h2>
        <ul class="check-list">
          ${page.topics.map((t) => `<li>${esc(t)}</li>`).join("\n          ")}
        </ul>
      </div>
    </section>

    <section class="section section--light">
      <div class="container container--narrow">
        <h2>How Apex Grid Handles This</h2>
        <p>Apex Grid Engineering is a multi-discipline firm licensed in 49 states — we engineer ${esc(page.category.toLowerCase())} scopes as a standalone service or as part of a coordinated structural, MEP, civil, and geotechnical package. Our engineers have direct experience with this type of work across commercial, industrial, multifamily, government, and military projects.</p>
        <p>We work from architectural PDFs, contractor sketches, or existing CAD files and produce stamped engineering documents, permit drawings, and calculations that building departments accept the first time.</p>
        <h3>Get Started</h3>
        <p>Send us a brief description of your project or attach your drawings. We'll review the scope and respond with a proposal within one business day.</p>
        <a class="btn btn--primary" href="/contact/">Send Project Details</a>
      </div>
    </section>

    ${relatedLinks ? `
    <section class="section section--white">
      <div class="container">
        <h2>Related Engineering Solutions</h2>
        <div class="card-grid card-grid--4">
          ${relatedLinks}
        </div>
      </div>
    </section>` : ""}

    <section class="section section--dark cta-band">
      <div class="container">
        <h2>Ready to Move Forward?</h2>
        <p>PE-stamped engineering documents, delivered on your schedule, from engineers who've solved this problem before.</p>
        <a class="btn btn--primary" href="/contact/">Get a Proposal</a>
        <a class="btn btn--secondary" href="tel:+14804900064">480-490-0064</a>
      </div>
    </section>`;

  const spSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Apex Grid Engineering",
    "description": page.lede,
    "url": `${SITE}${url}`,
    "telephone": "+14804900064",
    "address": { "@type": "PostalAddress", "addressLocality": "Queen Creek", "addressRegion": "AZ", "postalCode": "85142" },
    "serviceType": page.category,
  };

  return htmlShell({
    title: page.title,
    description: page.lede,
    canonical: `${SITE}${url}`,
    schemaJson: [spSchema, breadcrumbSchema(crumbs)],
    body,
  });
}

function solutionsHubPage(): string {
  const categories = [...new Set(SOLUTION_PAGES.filter((p) => p.dir === "solutions").map((p) => p.category))];
  const body = `
    <div class="hero hero--page">
      <div class="hero-inner">
        <div class="kicker">Engineering Solutions</div>
        <h1>Engineering Solutions for Common Construction Problems</h1>
        <p class="lede">PE-stamped engineering for the structural, MEP, electrical, plumbing, civil, and geotechnical problems that come up on commercial, industrial, and residential projects — described in plain terms, engineered properly.</p>
        <a class="btn btn--primary" href="/contact/">Talk to an Engineer</a>
      </div>
    </div>

    ${breadcrumb([{ name: "Home", href: "/" }, { name: "Solutions" }])}

    ${categories.map((cat) => {
      const catPages = SOLUTION_PAGES.filter((p) => p.dir === "solutions" && p.category === cat);
      return `
    <section class="section section--white">
      <div class="container">
        <h2>${esc(cat)}</h2>
        <div class="card-grid card-grid--3">
          ${catPages.map((p) => `<a class="card" href="/solutions/${p.slug}/"><div class="label">${esc(p.kicker)}</div><h3>${esc(p.h1)}</h3><p>${esc(p.lede.slice(0, 110))}…</p></a>`).join("\n          ")}
        </div>
      </div>
    </section>`;
    }).join("")}

    <section class="section section--dark cta-band">
      <div class="container">
        <h2>Don't See Your Problem?</h2>
        <p>We engineer across all disciplines — describe your project and we'll tell you how we can help.</p>
        <a class="btn btn--primary" href="/contact/">Ask an Engineer</a>
      </div>
    </section>`;

  return htmlShell({
    title: "Engineering Solutions | Structural, MEP, Civil & Geotechnical | Apex Grid",
    description: "Engineering solutions for common construction problems — structural, MEP, electrical, plumbing, civil, and geotechnical. PE-stamped drawings and calculations from licensed engineers.",
    canonical: `${SITE}/solutions/`,
    schemaJson: [],
    body,
  });
}

function governmentHubPage(): string {
  const govPages = SOLUTION_PAGES.filter((p) => p.dir === "government");
  const body = `
    <div class="hero hero--page">
      <div class="hero-inner">
        <div class="kicker">Government Engineering</div>
        <h1>Engineering for Government and Federal Facilities</h1>
        <p class="lede">Apex Grid Engineering provides structural, MEP, civil, and geotechnical engineering for federal facilities, military installations, and public works projects — following UFC design criteria, GSA standards, and federal documentation requirements.</p>
        <a class="btn btn--primary" href="/contact/">Request a Proposal</a>
      </div>
    </div>

    ${breadcrumb([{ name: "Home", href: "/" }, { name: "Government Engineering" }])}

    <section class="section section--white">
      <div class="container">
        <div class="card-grid card-grid--2">
          ${govPages.map((p) => `<a class="card" href="/government/${p.slug}/"><div class="label">${esc(p.kicker)}</div><h3>${esc(p.h1)}</h3><p>${esc(p.lede.slice(0, 130))}…</p></a>`).join("\n          ")}
        </div>
      </div>
    </section>

    <section class="section section--dark cta-band">
      <div class="container">
        <h2>Licensed in 49 States. Ready for Federal Work.</h2>
        <p>Apex Grid Engineering — SDVOSB-eligible, multi-discipline, and experienced in UFC and federal engineering documentation standards.</p>
        <a class="btn btn--primary" href="/contact/">Start a Conversation</a>
      </div>
    </section>`;

  return htmlShell({
    title: "Government & Federal Facility Engineering | Apex Grid Engineering",
    description: "Structural, MEP, civil, and geotechnical engineering for federal facilities, military installations, and public works projects. UFC criteria, GSA standards, and EISA compliance.",
    canonical: `${SITE}/government/`,
    schemaJson: [],
    body,
  });
}

const CATEGORY_LABEL: Record<GlossaryTerm["category"], string> = {
  structural: "Structural Engineering",
  mep: "MEP Engineering",
  civil: "Civil Engineering",
  geotech: "Geotechnical Engineering",
  permit: "Permitting & Codes",
  general: "General Engineering",
};
function guidePage(page: GuidePage): string {
  const url = `/guides/${page.slug}/`;
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Engineering Guides", href: "/guides/" },
    { name: page.h1 },
  ];
  const sectionsHtml = page.sections
    .map(
      (s) => `
    <section class="section section--white">
      <div class="container container--narrow">
        <h2>${esc(s.heading)}</h2>
        <ul class="check-list">
          ${s.points.map((p) => `<li>${esc(p)}</li>`).join("\n          ")}
        </ul>
      </div>
    </section>`,
    )
    .join("");

  const body = `
    <div class="hero hero--page">
      <div class="hero-inner">
        <div class="kicker">${esc(page.kicker)}</div>
        <h1>${esc(page.h1)}</h1>
        <p class="lede">${esc(page.shortAnswer)}</p>
        <a class="btn btn--primary" href="${esc(page.ctaHref)}">${esc(page.ctaText)}</a>
      </div>
    </div>

    ${breadcrumb(crumbs)}

    ${sectionsHtml}

    <section class="section section--dark cta-band">
      <div class="container">
        <h2>Ready to Get Started?</h2>
        <p>Send us your project details and we'll respond with a proposal within one business day.</p>
        <a class="btn btn--primary" href="${esc(page.ctaHref)}">${esc(page.ctaText)}</a>
        <a class="btn btn--secondary" href="tel:+14804900064">480-490-0064</a>
      </div>
    </section>`;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.sections.flatMap((s) =>
      s.points.map((p) => ({
        "@type": "Question",
        name: s.heading,
        acceptedAnswer: { "@type": "Answer", text: p },
      })),
    ).slice(0, 10),
  };

  return htmlShell({
    title: page.title,
    description: page.description,
    canonical: `${SITE}${url}`,
    schemaJson: [faqSchema, breadcrumbSchema(crumbs)],
    body,
  });
}

function guidesHubPage(): string {
  const categories: Record<string, GuidePage[]> = {};
  for (const p of GUIDE_PAGES) {
    const cat = p.kicker.split(" · ")[0];
    if (!categories[cat]) categories[cat] = [];
    categories[cat].push(p);
  }
  const body = `
    <div class="hero hero--page">
      <div class="hero-inner">
        <div class="kicker">Engineering Guides</div>
        <h1>${esc(GUIDES_HUB.h1)}</h1>
        <p class="lede">${esc(GUIDES_HUB.lede)}</p>
        <a class="btn btn--primary" href="/contact/">Talk to an Engineer</a>
      </div>
    </div>

    ${breadcrumb([{ name: "Home", href: "/" }, { name: "Engineering Guides" }])}

    ${Object.entries(categories).map(([cat, pages]) => `
    <section class="section section--white">
      <div class="container">
        <h2>${esc(cat)}</h2>
        <div class="card-grid card-grid--3">
          ${pages.map((p) => `<a class="card" href="/guides/${p.slug}/"><div class="label">${esc(p.kicker)}</div><h3>${esc(p.h1)}</h3><p>${esc(p.shortAnswer.slice(0, 110))}…</p></a>`).join("\n          ")}
        </div>
      </div>
    </section>`).join("")}

    <section class="section section--dark cta-band">
      <div class="container">
        <h2>Have a Question Not Covered Here?</h2>
        <p>We engineer across every building discipline — ask us anything about your project.</p>
        <a class="btn btn--primary" href="/contact/">Ask an Engineer</a>
      </div>
    </section>`;

  return htmlShell({
    title: GUIDES_HUB.title,
    description: GUIDES_HUB.description,
    canonical: `${SITE}/guides/`,
    schemaJson: [],
    body,
  });
}

// ─── Structural Extended Subpage Renderer ────────────────────────────────

function structuralExtendedPage(page: StructuralExtendedPage): string {
  const url = `/structural-engineering/${page.slug}/`;
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Structural Engineering", href: "/structural-engineering/" },
    { name: page.h1 },
  ];
  const body = `
    <div class="hero hero--page">
      <div class="hero-inner">
        <div class="kicker">${esc(page.kicker)}</div>
        <h1>${esc(page.h1)}</h1>
        <p class="lede">${esc(page.lede)}</p>
        <a class="btn btn--primary" href="/contact/">Request Engineering Support</a>
      </div>
    </div>
    ${breadcrumb(crumbs)}
    <section class="section section--white">
      <div class="container container--narrow">
        <h2>What This Engineering Scope Covers</h2>
        <ul class="check-list">
          ${page.topics.map((t) => `<li>${esc(t)}</li>`).join("\n          ")}
        </ul>
      </div>
    </section>
    <section class="section section--light">
      <div class="container container--narrow">
        <h2>Why Work With Apex Grid</h2>
        <p>Apex Grid Engineering is a multi-discipline firm licensed in 49 states — headquartered in Queen Creek, Arizona. We provide ${esc(page.h1.toLowerCase())} as a standalone service or coordinated with MEP, civil, and geotechnical engineering under one contract. Our engineers produce PE-stamped permit packages and respond to plan check comments as part of the scope.</p>
        <a class="btn btn--primary" href="/contact/">${esc(page.ctaText)}</a>
      </div>
    </section>
    <section class="section section--dark cta-band">
      <div class="container">
        <h2>Ready to Move Forward?</h2>
        <p>PE-stamped structural engineering, on your schedule, from engineers who've done this before.</p>
        <a class="btn btn--primary" href="/contact/">Get a Proposal</a>
        <a class="btn btn--secondary" href="tel:+14804900064">480-490-0064</a>
      </div>
    </section>`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Apex Grid Engineering",
    "description": page.lede,
    "url": `${SITE}${url}`,
    "telephone": "+14804900064",
    "serviceType": page.h1,
  };
  return htmlShell({ title: page.title, description: page.description, canonical: `${SITE}${url}`, schemaJson: [schema, breadcrumbSchema(crumbs)], body });
}

// ─── Title 24 Renderers ───────────────────────────────────────────────────

function title24HubPage(): string {
  const url = `/title-24/`;
  const crumbs = [{ name: "Home", href: "/" }, { name: "Title 24 Compliance" }];
  const subpageCards = TITLE_24_PAGES.map(
    (p) =>
      `<a class="card" href="/title-24/${p.slug}/"><h3>${esc(p.h1)}</h3><p>${esc(p.lede.slice(0, 120))}…</p></a>`,
  ).join("\n          ");
  const body = `
    <div class="hero hero--page">
      <div class="hero-inner">
        <div class="kicker">${esc(TITLE_24_HUB.kicker)}</div>
        <h1>${esc(TITLE_24_HUB.h1)}</h1>
        <p class="lede">${esc(TITLE_24_HUB.lede)}</p>
        <a class="btn btn--primary" href="/contact/">Request Title 24 Compliance Support</a>
      </div>
    </div>
    ${breadcrumb(crumbs)}
    <section class="section section--white">
      <div class="container container--narrow">
        <h2>What Title 24 Covers</h2>
        <p>${esc(TITLE_24_HUB.intro)}</p>
        <ul class="check-list">
          ${TITLE_24_HUB.topics.map((t) => `<li>${esc(t)}</li>`).join("\n          ")}
        </ul>
      </div>
    </section>
    <section class="section section--light">
      <div class="container">
        <h2>Title 24 Services</h2>
        <div class="card-grid card-grid--2">
          ${subpageCards}
        </div>
      </div>
    </section>
    <section class="section section--dark cta-band">
      <div class="container">
        <h2>Need Title 24 Compliance for a California Project?</h2>
        <p>Send us your project details — we respond with a fee proposal within one business day.</p>
        <a class="btn btn--primary" href="/contact/">Contact Us</a>
        <a class="btn btn--secondary" href="tel:+14804900064">480-490-0064</a>
      </div>
    </section>`;
  const schema = { "@context": "https://schema.org", "@type": "ProfessionalService", "name": "Apex Grid Engineering", "description": TITLE_24_HUB.lede, "url": `${SITE}${url}`, "telephone": "+14804900064", "areaServed": "California", "serviceType": "Title 24 Energy Compliance" };
  return htmlShell({ title: TITLE_24_HUB.title, description: TITLE_24_HUB.description, canonical: `${SITE}${url}`, schemaJson: [schema, breadcrumbSchema(crumbs)], body });
}

function title24SubpagePage(page: Title24Page): string {
  const url = `/title-24/${page.slug}/`;
  const crumbs = [{ name: "Home", href: "/" }, { name: "Title 24", href: "/title-24/" }, { name: page.h1 }];
  const body = `
    <div class="hero hero--page">
      <div class="hero-inner">
        <div class="kicker">${esc(page.kicker)}</div>
        <h1>${esc(page.h1)}</h1>
        <p class="lede">${esc(page.lede)}</p>
        <a class="btn btn--primary" href="/contact/">Get Compliance Support</a>
      </div>
    </div>
    ${breadcrumb(crumbs)}
    <section class="section section--white">
      <div class="container container--narrow">
        <h2>What This Covers</h2>
        <p>${esc(page.intro)}</p>
        <ul class="check-list">
          ${page.topics.map((t) => `<li>${esc(t)}</li>`).join("\n          ")}
        </ul>
      </div>
    </section>
    <section class="section section--light">
      <div class="container container--narrow">
        <h2>How Apex Grid Helps</h2>
        <p>Apex Grid produces Title 24 compliance documentation as part of a full MEP engineering package or as a standalone compliance service. Our engineers are familiar with California's compliance software (CBECC-Com and CBECC-Res), coordinate with the mechanical, electrical, and architectural design, and respond to plan-check comments on compliance issues.</p>
        <a class="btn btn--primary" href="/contact/">${esc(page.ctaText)}</a>
      </div>
    </section>
    <section class="section section--dark cta-band">
      <div class="container">
        <h2>California Project Ready to Move Forward?</h2>
        <p>We respond within one business day with a fee proposal.</p>
        <a class="btn btn--primary" href="/contact/">Contact Us</a>
        <a class="btn btn--secondary" href="tel:+14804900064">480-490-0064</a>
      </div>
    </section>`;
  const schema = { "@context": "https://schema.org", "@type": "ProfessionalService", "name": "Apex Grid Engineering", "description": page.lede, "url": `${SITE}${url}`, "telephone": "+14804900064", "areaServed": "California", "serviceType": page.h1 };
  return htmlShell({ title: page.title, description: page.description, canonical: `${SITE}${url}`, schemaJson: [schema, breadcrumbSchema(crumbs)], body });
}

// ─── Projects Portfolio Renderers ─────────────────────────────────────────

function projectsHubPage(): string {
  const url = `/projects/`;
  const crumbs = [{ name: "Home", href: "/" }, { name: "Projects" }];
  const catCards = PROJECT_CATEGORY_PAGES.map(
    (p) =>
      `<a class="card" href="/projects/${p.slug}/"><h3>${esc(p.h1)}</h3><p>${esc(p.disciplines.join(", "))}</p></a>`,
  ).join("\n          ");
  const body = `
    <div class="hero hero--page">
      <div class="hero-inner">
        <div class="kicker">${esc(PROJECTS_HUB.kicker)}</div>
        <h1>${esc(PROJECTS_HUB.h1)}</h1>
        <p class="lede">${esc(PROJECTS_HUB.lede)}</p>
        <a class="btn btn--primary" href="/contact/">Start Your Project</a>
      </div>
    </div>
    ${breadcrumb(crumbs)}
    <section class="section section--white">
      <div class="container container--narrow">
        <p>${esc(PROJECTS_HUB.intro)}</p>
      </div>
    </section>
    <section class="section section--light">
      <div class="container">
        <h2>Project Experience by Category</h2>
        <div class="card-grid card-grid--3">
          ${catCards}
        </div>
      </div>
    </section>
    <section class="section section--dark cta-band">
      <div class="container">
        <h2>Tell Us About Your Project</h2>
        <p>Send us your drawings, RFP, or project description and we'll respond with a fee proposal within one business day.</p>
        <a class="btn btn--primary" href="/contact/">Contact Us</a>
        <a class="btn btn--secondary" href="tel:+14804900064">480-490-0064</a>
      </div>
    </section>`;
  const schema = { "@context": "https://schema.org", "@type": "CollectionPage", "name": PROJECTS_HUB.h1, "description": PROJECTS_HUB.lede, "url": `${SITE}${url}`, "publisher": { "@type": "Organization", "name": "Apex Grid Engineering", "url": SITE } };
  return htmlShell({ title: PROJECTS_HUB.title, description: PROJECTS_HUB.description, canonical: `${SITE}${url}`, schemaJson: [schema, breadcrumbSchema(crumbs)], body });
}

function projectCategoryPage(cat: ProjectCategoryPage): string {
  const url = `/projects/${cat.slug}/`;
  const crumbs = [{ name: "Home", href: "/" }, { name: "Projects", href: "/projects/" }, { name: cat.h1 }];
  const body = `
    <div class="hero hero--page">
      <div class="hero-inner">
        <div class="kicker">${esc(cat.kicker)}</div>
        <h1>${esc(cat.h1)}</h1>
        <p class="lede">${esc(cat.lede)}</p>
        <a class="btn btn--primary" href="/contact/">Discuss Your Project</a>
      </div>
    </div>
    ${breadcrumb(crumbs)}
    <section class="section section--white">
      <div class="container container--narrow">
        <h2>Types of Projects</h2>
        <ul class="check-list">
          ${cat.projectTypes.map((t) => `<li>${esc(t)}</li>`).join("\n          ")}
        </ul>
        ${cat.note ? `<p class="note"><em>${esc(cat.note)}</em></p>` : ""}
      </div>
    </section>
    <section class="section section--light">
      <div class="container container--narrow">
        <h2>Engineering Disciplines</h2>
        <p>This project category involves: ${esc(cat.disciplines.join(", "))}. Apex Grid provides these as coordinated multi-discipline services or as individual discipline engagements depending on project scope.</p>
        <a class="btn btn--primary" href="/contact/">Send Us Your Project</a>
      </div>
    </section>
    <section class="section section--dark cta-band">
      <div class="container">
        <h2>Ready to Work Together?</h2>
        <p>We respond within one business day with a fee proposal. No project too large or too small.</p>
        <a class="btn btn--primary" href="/contact/">Contact Us</a>
        <a class="btn btn--secondary" href="tel:+14804900064">480-490-0064</a>
      </div>
    </section>`;
  const schema = { "@context": "https://schema.org", "@type": "ProfessionalService", "name": "Apex Grid Engineering", "description": cat.lede, "url": `${SITE}${url}`, "telephone": "+14804900064", "serviceType": cat.h1 };
  return htmlShell({ title: cat.title, description: cat.description, canonical: `${SITE}${url}`, schemaJson: [schema, breadcrumbSchema(crumbs)], body });
}

// ─── Static Standalone Page Renderer ─────────────────────────────────────

function staticStandalonePage(page: StaticPageDef): string {
  const url = `/${page.dir}/`;
  const crumbs = [{ name: "Home", href: "/" }, { name: page.h1 }];
  const sectionsHtml = page.sections
    .map(
      (s) => `
    <section class="section section--white">
      <div class="container container--narrow">
        <h2>${esc(s.heading)}</h2>
        <p>${esc(s.content)}</p>
        ${s.bullets ? `<ul class="check-list">${s.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>` : ""}
      </div>
    </section>`,
    )
    .join("");
  const body = `
    <div class="hero hero--page">
      <div class="hero-inner">
        <div class="kicker">${esc(page.kicker)}</div>
        <h1>${esc(page.h1)}</h1>
        <p class="lede">${esc(page.lede)}</p>
        <a class="btn btn--primary" href="/contact/">Contact Us</a>
      </div>
    </div>
    ${breadcrumb(crumbs)}
    ${sectionsHtml}
    <section class="section section--dark cta-band">
      <div class="container">
        <h2>${esc(page.ctaHeading)}</h2>
        <p>${esc(page.ctaText)}</p>
        <a class="btn btn--primary" href="/contact/">Get in Touch</a>
        <a class="btn btn--secondary" href="tel:+14804900064">480-490-0064</a>
      </div>
    </section>`;
  const schema = { "@context": "https://schema.org", "@type": "WebPage", "name": page.h1, "description": page.description, "url": `${SITE}${url}`, "publisher": { "@type": "Organization", "name": "Apex Grid Engineering", "url": SITE } };
  return htmlShell({ title: page.title, description: page.description, canonical: `${SITE}${url}`, schemaJson: [schema, breadcrumbSchema(crumbs)], body });
}

// ─── HTML Sitemap Renderer ────────────────────────────────────────────────

function htmlSitemapPage(): string {
  const url = `/sitemap/`;
  const body = `
    <div class="hero hero--page">
      <div class="hero-inner">
        <div class="kicker">Navigation</div>
        <h1>Site Map</h1>
        <p class="lede">A complete index of Apex Grid Engineering's pages, organized by section.</p>
      </div>
    </div>
    <section class="section section--white">
      <div class="container">
        <div class="sitemap-grid">
          <div class="sitemap-col">
            <h2>Engineering Services</h2>
            <ul>
              <li><a href="/structural-engineering/">Structural Engineering</a></li>
              <li><a href="/mep-engineering/">MEP Engineering</a></li>
              <li><a href="/mechanical-engineering/">Mechanical Engineering</a></li>
              <li><a href="/electrical-engineering/">Electrical Engineering</a></li>
              <li><a href="/plumbing-engineering/">Plumbing Engineering</a></li>
              <li><a href="/civil-engineering/">Civil Engineering</a></li>
              <li><a href="/geotechnical-engineering/">Geotechnical Engineering</a></li>
              <li><a href="/title-24/">California Title 24</a></li>
              <li><a href="/permit-engineering/">Permit Engineering</a></li>
              <li><a href="/existing-building-engineering/">Existing Buildings</a></li>
              <li><a href="/engineering-reports/">Engineering Reports</a></li>
            </ul>
            <h2>Industries</h2>
            <ul>
              <li><a href="/industries/">All Industries</a></li>
              <li><a href="/industries/healthcare/">Healthcare</a></li>
              <li><a href="/industries/multifamily/">Multifamily</a></li>
              <li><a href="/industries/restaurants/">Restaurants</a></li>
              <li><a href="/industries/industrial-warehouse/">Industrial &amp; Warehouse</a></li>
              <li><a href="/industries/data-centers/">Data Centers</a></li>
              <li><a href="/industries/retail/">Retail</a></li>
              <li><a href="/industries/government/">Government</a></li>
              <li><a href="/industries/military-defense/">Military &amp; Defense</a></li>
              <li><a href="/industries/renewable-energy/">Solar &amp; Renewable Energy</a></li>
              <li><a href="/industries/commercial-office/">Commercial Office</a></li>
              <li><a href="/industries/hospitality/">Hospitality</a></li>
              <li><a href="/industries/education/">Education</a></li>
              <li><a href="/industries/life-science/">Life Science</a></li>
              <li><a href="/industries/senior-living/">Senior Living</a></li>
              <li><a href="/industries/cold-storage/">Cold Storage</a></li>
            </ul>
          </div>
          <div class="sitemap-col">
            <h2>Who We Work With</h2>
            <ul>
              <li><a href="/who-we-work-with/">All Partners</a></li>
              <li><a href="/who-we-work-with/architects/">Architects</a></li>
              <li><a href="/who-we-work-with/general-contractors/">General Contractors</a></li>
              <li><a href="/who-we-work-with/developers/">Developers</a></li>
              <li><a href="/who-we-work-with/property-managers/">Property Managers</a></li>
              <li><a href="/who-we-work-with/government-contractors/">Government Contractors</a></li>
            </ul>
            <h2>Project Types</h2>
            <ul>
              <li><a href="/project-types/">All Project Types</a></li>
              <li><a href="/project-types/new-construction/">New Construction</a></li>
              <li><a href="/project-types/tenant-improvements/">Tenant Improvements</a></li>
              <li><a href="/project-types/renovations/">Renovations</a></li>
              <li><a href="/project-types/adaptive-reuse/">Adaptive Reuse</a></li>
            </ul>
            <h2>Projects</h2>
            <ul>
              <li><a href="/projects/">Project Experience</a></li>
              <li><a href="/projects/structural/">Structural Projects</a></li>
              <li><a href="/projects/mep/">MEP Projects</a></li>
              <li><a href="/projects/civil/">Civil Projects</a></li>
              <li><a href="/projects/government/">Government Projects</a></li>
              <li><a href="/projects/military/">Military Projects</a></li>
              <li><a href="/projects/healthcare/">Healthcare Projects</a></li>
              <li><a href="/projects/multifamily/">Multifamily Projects</a></li>
              <li><a href="/projects/industrial/">Industrial Projects</a></li>
            </ul>
            <h2>Resources</h2>
            <ul>
              <li><a href="/resources/">Engineering Resources</a></li>
              <li><a href="/blog/">Blog</a></li>
              <li><a href="/guides/">Engineering Guides</a></li>
              <li><a href="/engineering-glossary/">Engineering Glossary</a></li>
            </ul>
          </div>
          <div class="sitemap-col">
            <h2>Key Locations</h2>
            <ul>
              <li><a href="/locations/">All Service Areas</a></li>
              <li><a href="/locations/arizona/">Arizona</a></li>
              <li><a href="/locations/california/">California</a></li>
              <li><a href="/locations/texas/">Texas</a></li>
              <li><a href="/locations/florida/">Florida</a></li>
              <li><a href="/locations/virginia/">Virginia</a></li>
              <li><a href="/locations/north-carolina/">North Carolina</a></li>
              <li><a href="/locations/arizona/phoenix/">Phoenix</a></li>
              <li><a href="/locations/arizona/scottsdale/">Scottsdale</a></li>
              <li><a href="/locations/california/los-angeles/">Los Angeles</a></li>
              <li><a href="/locations/california/san-diego/">San Diego</a></li>
              <li><a href="/locations/texas/dallas/">Dallas</a></li>
              <li><a href="/locations/texas/houston/">Houston</a></li>
              <li><a href="/locations/texas/austin/">Austin</a></li>
              <li><a href="/locations/florida/miami/">Miami</a></li>
              <li><a href="/locations/virginia/northern-virginia/">Northern Virginia</a></li>
            </ul>
            <h2>About &amp; Company</h2>
            <ul>
              <li><a href="/about/">About Apex Grid</a></li>
              <li><a href="/military/">Military &amp; Veterans</a></li>
              <li><a href="/capabilities/">Capabilities</a></li>
              <li><a href="/government-contracting/">Government Contracting</a></li>
              <li><a href="/professional-engineering/">Professional Engineering</a></li>
              <li><a href="/quality-control/">Quality Control</a></li>
              <li><a href="/engineering-process/">Our Process</a></li>
              <li><a href="/contact/">Contact Us</a></li>
              <li><a href="/intake-requirements/">Intake Requirements</a></li>
            </ul>
          </div>
        </div>
      </div>
    </section>`;
  const schema = { "@context": "https://schema.org", "@type": "WebPage", "name": "Site Map | Apex Grid Engineering", "url": `${SITE}${url}`, "publisher": { "@type": "Organization", "name": "Apex Grid Engineering", "url": SITE } };
  return htmlShell({ title: "Site Map | Apex Grid Engineering", description: "Complete index of Apex Grid Engineering pages — engineering services, industries, locations, resources, and company information.", canonical: `${SITE}${url}`, schemaJson: [schema], body });
}

// ─── Discipline Hub + Subpage Renderers ───────────────────────────────────

function disciplineHubPage(hub: DisciplineHub): string {
  const url = `/${hub.slug}/`;
  const crumbs = [{ name: "Home", href: "/" }, { name: hub.h1 }];
  const subpageCards = hub.subpages
    .map(
      (sp) =>
        `<a class="card" href="/${hub.slug}/${sp.slug}/"><div class="label">${esc(sp.kicker)}</div><h3>${esc(sp.h1)}</h3><p>${esc(sp.lede.slice(0, 120))}…</p></a>`,
    )
    .join("\n          ");

  const body = `
    <div class="hero hero--page">
      <div class="hero-inner">
        <div class="kicker">${esc(hub.kicker)}</div>
        <h1>${esc(hub.h1)}</h1>
        <p class="lede">${esc(hub.lede)}</p>
        <a class="btn btn--primary" href="/contact/">Request Engineering Support</a>
      </div>
    </div>

    ${breadcrumb(crumbs)}

    <section class="section section--white">
      <div class="container container--narrow">
        <h2>What We Engineer</h2>
        <p>${esc(hub.intro)}</p>
        <ul class="check-list">
          ${hub.capabilities.map((c) => `<li>${esc(c)}</li>`).join("\n          ")}
        </ul>
      </div>
    </section>

    <section class="section section--light">
      <div class="container">
        <h2>${esc(hub.h1)} Services</h2>
        <div class="card-grid card-grid--3">
          ${subpageCards}
        </div>
      </div>
    </section>

    <section class="section section--white">
      <div class="container container--narrow">
        <h2>About Apex Grid Engineering</h2>
        <p>Apex Grid Engineering is a multi-discipline firm licensed in 49 states — headquartered in Queen Creek, Arizona, with 20+ licensed professional engineers across structural, MEP, civil, and geotechnical disciplines. We provide ${esc(hub.h1.toLowerCase())} as a standalone service or as part of a coordinated multi-discipline package.</p>
        <p>We work from architectural PDFs, contractor sketches, or existing CAD files and produce stamped engineering documents and permit packages that building departments accept. One business day turnaround on fee proposals.</p>
        <a class="btn btn--primary" href="/contact/">Get a Proposal</a>
      </div>
    </section>

    <section class="section section--dark cta-band">
      <div class="container">
        <h2>Ready to Start?</h2>
        <p>Send us your drawings or describe your project — we respond with a fee proposal within one business day.</p>
        <a class="btn btn--primary" href="/contact/">Contact Us</a>
        <a class="btn btn--secondary" href="tel:+14804900064">480-490-0064</a>
      </div>
    </section>`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Apex Grid Engineering",
    "description": hub.lede,
    "url": `${SITE}${url}`,
    "telephone": "+14804900064",
    "address": { "@type": "PostalAddress", "addressLocality": "Queen Creek", "addressRegion": "AZ", "postalCode": "85142" },
    "serviceType": hub.h1,
  };

  return htmlShell({
    title: hub.title,
    description: hub.description,
    canonical: `${SITE}${url}`,
    schemaJson: [schema, breadcrumbSchema(crumbs)],
    body,
  });
}

function disciplineSubpagePage(hub: DisciplineHub, sp: DisciplineSubpage): string {
  const url = `/${hub.slug}/${sp.slug}/`;
  const crumbs = [
    { name: "Home", href: "/" },
    { name: hub.h1, href: `/${hub.slug}/` },
    { name: sp.h1 },
  ];
  const otherSubpages = hub.subpages.filter((s) => s.slug !== sp.slug).slice(0, 4);
  const relatedLinks = otherSubpages
    .map((s) => `<a class="card" href="/${hub.slug}/${s.slug}/"><h3>${esc(s.h1)}</h3></a>`)
    .join("\n          ");

  const body = `
    <div class="hero hero--page">
      <div class="hero-inner">
        <div class="kicker">${esc(sp.kicker)}</div>
        <h1>${esc(sp.h1)}</h1>
        <p class="lede">${esc(sp.lede)}</p>
        <a class="btn btn--primary" href="/contact/">Request Engineering Support</a>
      </div>
    </div>

    ${breadcrumb(crumbs)}

    <section class="section section--white">
      <div class="container container--narrow">
        <h2>What This Engineering Scope Covers</h2>
        <ul class="check-list">
          ${sp.scope.map((s) => `<li>${esc(s)}</li>`).join("\n          ")}
        </ul>
      </div>
    </section>

    <section class="section section--light">
      <div class="container container--narrow">
        <h2>What You Get</h2>
        <ul class="check-list">
          ${sp.deliverables.map((d) => `<li>${esc(d)}</li>`).join("\n          ")}
        </ul>
      </div>
    </section>

    <section class="section section--white">
      <div class="container container--narrow">
        <h2>How Apex Grid Handles This</h2>
        <p>Apex Grid Engineering is a multi-discipline firm licensed in 49 states. We provide ${esc(sp.h1.toLowerCase())} as a standalone service or coordinated with structural, MEP, civil, and geotechnical engineering under one contract. Our engineers produce PE-stamped permit packages that building departments accept — and we respond to plan check comments as part of the scope.</p>
        <a class="btn btn--primary" href="/contact/">Send Your Project Details</a>
      </div>
    </section>

    ${relatedLinks ? `
    <section class="section section--light">
      <div class="container">
        <h2>More ${esc(hub.h1)} Services</h2>
        <div class="card-grid card-grid--4">
          ${relatedLinks}
        </div>
      </div>
    </section>` : ""}

    <section class="section section--dark cta-band">
      <div class="container">
        <h2>Ready to Move Forward?</h2>
        <p>PE-stamped engineering, on your schedule, from engineers who've done this before.</p>
        <a class="btn btn--primary" href="/contact/">Get a Proposal</a>
        <a class="btn btn--secondary" href="tel:+14804900064">480-490-0064</a>
      </div>
    </section>`;

  const svcSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Apex Grid Engineering",
    "description": sp.lede,
    "url": `${SITE}${url}`,
    "telephone": "+14804900064",
    "address": { "@type": "PostalAddress", "addressLocality": "Queen Creek", "addressRegion": "AZ", "postalCode": "85142" },
    "serviceType": sp.h1,
  };

  return htmlShell({
    title: sp.title,
    description: sp.description,
    canonical: `${SITE}${url}`,
    schemaJson: [svcSchema, breadcrumbSchema(crumbs)],
    body,
  });
}

function miscPage(page: MiscPage): string {
  const url = `/${page.slug}/`;
  const crumbs = [{ name: "Home", href: "/" }, { name: page.h1 }];
  const sectionsHtml = page.sections
    .map(
      (s) => `
    <section class="section section--white">
      <div class="container container--narrow">
        <h2>${esc(s.heading)}</h2>
        <p>${esc(s.content)}</p>
        ${s.bullets ? `<ul class="check-list">${s.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>` : ""}
      </div>
    </section>`,
    )
    .join("");

  const body = `
    <div class="hero hero--page">
      <div class="hero-inner">
        <div class="kicker">${esc(page.kicker)}</div>
        <h1>${esc(page.h1)}</h1>
        <p class="lede">${esc(page.lede)}</p>
        <a class="btn btn--primary" href="/contact/">Contact Us</a>
      </div>
    </div>

    ${breadcrumb(crumbs)}
    ${sectionsHtml}

    <section class="section section--dark cta-band">
      <div class="container">
        <h2>${esc(page.ctaHeading)}</h2>
        <p>${esc(page.ctaText)}</p>
        <a class="btn btn--primary" href="/contact/">Get in Touch</a>
        <a class="btn btn--secondary" href="tel:+14804900064">480-490-0064</a>
      </div>
    </section>`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": page.h1,
    "description": page.description,
    "url": `${SITE}${url}`,
    "publisher": { "@type": "Organization", "name": "Apex Grid Engineering", "url": SITE },
  };

  return htmlShell({
    title: page.title,
    description: page.description,
    canonical: `${SITE}${url}`,
    schemaJson: [schema, breadcrumbSchema(crumbs)],
    body,
  });
}

async function main() {
  const states = await loadStates();
  const cities = await loadCities();
  const directory = loadDirectory();
  const serviceSlugs = new Set(SERVICES.map((s) => s.slug));
  for (const s of states) {
    assertSlug(s.slug);
    assertNoMarkup(s);
  }
  for (const c of cities) {
    assertSlug(c.slug);
    assertNoMarkupCity(c);
    if (serviceSlugs.has(c.slug)) throw new Error(`City slug collides with a service slug: ${c.slug}`);
    if (!states.some((s) => s.slug === c.stateSlug)) throw new Error(`City ${c.slug} references unknown state: ${c.stateSlug}`);
  }
  fs.rmSync(OUT, { recursive: true, force: true });
  fs.mkdirSync(OUT, { recursive: true });
  fs.writeFileSync(path.join(OUT, "index.html"), hubPage(states, cities));
  let pages = 1;
  for (const s of states) {
    const sdir = path.join(OUT, s.slug);
    fs.mkdirSync(sdir, { recursive: true });
    fs.writeFileSync(path.join(sdir, "index.html"), statePage(s, cities));
    pages++;
    for (const svc of SERVICES) {
      const dir = path.join(sdir, svc.slug);
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(path.join(dir, "index.html"), servicePage(s, svc, states));
      pages++;
    }
    for (const c of cities.filter((c) => c.stateSlug === s.slug)) {
      const cdir = path.join(sdir, c.slug);
      fs.mkdirSync(cdir, { recursive: true });
      fs.writeFileSync(path.join(cdir, "index.html"), cityPage(s, c, cities));
      pages++;
      for (const svc of SERVICES) {
        const dir = path.join(cdir, svc.slug);
        fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(path.join(dir, "index.html"), cityServicePage(s, c, svc, cities));
        pages++;
      }
    }
    // Census-derived lightweight city pages (skip curated cities & reserved slugs)
    const curatedSlugs = new Set(cities.filter((c) => c.stateSlug === s.slug).map((c) => c.slug));
    const dirCities = (directory[s.slug] ?? []).filter((d) => !curatedSlugs.has(d.slug) && !serviceSlugs.has(d.slug));
    for (const d of dirCities) {
      assertSlug(d.slug);
      const cdir = path.join(sdir, d.slug);
      fs.mkdirSync(cdir, { recursive: true });
      fs.writeFileSync(path.join(cdir, "index.html"), cityLitePage(s, d, dirCities, cities));
      pages++;
    }
  }
  // Top-level discipline pages
  for (const d of DISCIPLINES) {
    assertSlug(d.slug);
    const ddir = path.join(PUBLIC, d.slug);
    fs.rmSync(ddir, { recursive: true, force: true });
    fs.mkdirSync(ddir, { recursive: true });
    fs.writeFileSync(path.join(ddir, "index.html"), disciplinePage(d));
    pages++;
  }
  // Blog
  const blogDir = path.join(PUBLIC, "blog");
  fs.rmSync(blogDir, { recursive: true, force: true });
  fs.mkdirSync(blogDir, { recursive: true });
  fs.writeFileSync(path.join(blogDir, "index.html"), blogIndexPage());
  pages++;
  for (const p of BLOG_POSTS) {
    assertSlug(p.slug);
    const pdir = path.join(blogDir, p.slug);
    fs.mkdirSync(pdir, { recursive: true });
    fs.writeFileSync(path.join(pdir, "index.html"), blogPostPage(p));
    pages++;
  }
  // Resources / Knowledge Center
  const resourcesDir = path.join(PUBLIC, "resources");
  fs.rmSync(resourcesDir, { recursive: true, force: true });
  fs.mkdirSync(resourcesDir, { recursive: true });
  fs.writeFileSync(path.join(resourcesDir, "index.html"), resourcesHubPage());
  pages++;
  for (const disc of RESOURCE_DISCIPLINES) {
    assertSlug(disc.slug);
    const ddir = path.join(resourcesDir, disc.slug);
    fs.mkdirSync(ddir, { recursive: true });
    fs.writeFileSync(path.join(ddir, "index.html"), resourceDisciplinePage(disc));
    pages++;
  }
  for (const article of RESOURCE_ARTICLES) {
    assertSlug(article.slug);
    const adir = path.join(resourcesDir, disciplineOf(article).slug, article.slug);
    fs.mkdirSync(adir, { recursive: true });
    fs.writeFileSync(path.join(adir, "index.html"), resourceArticlePage(article));
    pages++;
  }

  // Who We Work With
  const wwwDir = path.join(PUBLIC, "who-we-work-with");
  fs.rmSync(wwwDir, { recursive: true, force: true });
  fs.mkdirSync(wwwDir, { recursive: true });
  fs.writeFileSync(path.join(wwwDir, "index.html"), whoWeWorkWithHubPage());
  pages++;
  for (const cp of CLIENT_PAGES) {
    assertSlug(cp.slug);
    const cdir = path.join(wwwDir, cp.slug);
    fs.mkdirSync(cdir, { recursive: true });
    fs.writeFileSync(path.join(cdir, "index.html"), clientPage(cp));
    pages++;
  }

  // Project Types
  const ptDir = path.join(PUBLIC, "project-types");
  fs.rmSync(ptDir, { recursive: true, force: true });
  fs.mkdirSync(ptDir, { recursive: true });
  fs.writeFileSync(path.join(ptDir, "index.html"), projectTypesHubPage());
  pages++;
  for (const pt of PROJECT_TYPE_PAGES) {
    assertSlug(pt.slug);
    const pdir = path.join(ptDir, pt.slug);
    fs.mkdirSync(pdir, { recursive: true });
    fs.writeFileSync(path.join(pdir, "index.html"), projectTypePage(pt));
    pages++;
  }

  // Existing Building Engineering
  const ebDir = path.join(PUBLIC, "existing-building-engineering");
  fs.rmSync(ebDir, { recursive: true, force: true });
  fs.mkdirSync(ebDir, { recursive: true });
  fs.writeFileSync(path.join(ebDir, "index.html"), existingBuildingHubPage());
  pages++;
  for (const eb of EXISTING_BUILDING_PAGES) {
    assertSlug(eb.slug);
    const edir = path.join(ebDir, eb.slug);
    fs.mkdirSync(edir, { recursive: true });
    fs.writeFileSync(path.join(edir, "index.html"), existingBuildingPage(eb));
    pages++;
  }

  // Permit Engineering
  const peDir = path.join(PUBLIC, "permit-engineering");
  fs.rmSync(peDir, { recursive: true, force: true });
  fs.mkdirSync(peDir, { recursive: true });
  fs.writeFileSync(path.join(peDir, "index.html"), permitHubPage());
  pages++;
  for (const pp of PERMIT_PAGES) {
    assertSlug(pp.slug);
    const pdir = path.join(peDir, pp.slug);
    fs.mkdirSync(pdir, { recursive: true });
    fs.writeFileSync(path.join(pdir, "index.html"), permitPage(pp));
    pages++;
  }

  // Industry × Discipline pages
  const indDisciplineDir = path.join(PUBLIC, "industries");
  // Don't wipe the whole /industries dir — the React SPA may also serve routes
  // under it. Instead write only the sub-paths we own.
  for (const idp of INDUSTRY_DISCIPLINE_PAGES) {
    const segments = idp.segments;
    const dir = path.join(indDisciplineDir, ...segments);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "index.html"), industryDisciplinePage(idp));
    pages++;
  }

  // Location × Service pages (non-curated cities + new service slugs)
  for (const lsp of LOCATION_SERVICE_PAGES) {
    assertSlug(lsp.stateSlug);
    assertSlug(lsp.citySlug);
    assertSlug(lsp.serviceSlug);
    const dir = path.join(OUT, lsp.stateSlug, lsp.citySlug, lsp.serviceSlug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "index.html"), locationServicePage(lsp));
    pages++;
  }

  // Guides pages
  const guidesDir = path.join(PUBLIC, "guides");
  fs.rmSync(guidesDir, { recursive: true, force: true });
  fs.mkdirSync(guidesDir, { recursive: true });
  fs.writeFileSync(path.join(guidesDir, "index.html"), guidesHubPage());
  pages++;
  for (const gp of GUIDE_PAGES) {
    assertSlug(gp.slug);
    const dir = path.join(guidesDir, gp.slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "index.html"), guidePage(gp));
    pages++;
  }

  // Solutions pages
  const solutionsDir = path.join(PUBLIC, "solutions");
  fs.rmSync(solutionsDir, { recursive: true, force: true });
  fs.mkdirSync(solutionsDir, { recursive: true });
  fs.writeFileSync(path.join(solutionsDir, "index.html"), solutionsHubPage());
  pages++;
  const governmentDir = path.join(PUBLIC, "government");
  fs.rmSync(governmentDir, { recursive: true, force: true });
  fs.mkdirSync(governmentDir, { recursive: true });
  fs.writeFileSync(path.join(governmentDir, "index.html"), governmentHubPage());
  pages++;
  for (const sp of SOLUTION_PAGES) {
    assertSlug(sp.slug);
    assertSlug(sp.dir);
    const dir = path.join(PUBLIC, sp.dir, sp.slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "index.html"), solutionPage(sp));
    pages++;
  }

  // Engineering Glossary pages
  const glossaryDir = path.join(PUBLIC, "engineering-glossary");
  fs.rmSync(glossaryDir, { recursive: true, force: true });
  fs.mkdirSync(glossaryDir, { recursive: true });
  fs.writeFileSync(path.join(glossaryDir, "index.html"), glossaryHubPage());
  pages++;
  for (const gt of GLOSSARY_TERMS) {
    assertSlug(gt.slug);
    const dir = path.join(glossaryDir, gt.slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "index.html"), glossaryPage(gt));
    pages++;
  }

  // Structural extended subpages (additional spec-slug pages under /structural-engineering/)
  const structuralHubDir = path.join(PUBLIC, "structural-engineering");
  for (const sp of STRUCTURAL_EXTENDED_PAGES) {
    assertSlug(sp.slug);
    const spDir = path.join(structuralHubDir, sp.slug);
    if (!fs.existsSync(spDir)) fs.mkdirSync(spDir, { recursive: true });
    fs.writeFileSync(path.join(spDir, "index.html"), structuralExtendedPage(sp));
    pages++;
  }

  // Title 24 hub + subpages
  const title24Dir = path.join(PUBLIC, "title-24");
  fs.rmSync(title24Dir, { recursive: true, force: true });
  fs.mkdirSync(title24Dir, { recursive: true });
  fs.writeFileSync(path.join(title24Dir, "index.html"), title24HubPage());
  pages++;
  for (const tp of TITLE_24_PAGES) {
    assertSlug(tp.slug);
    const tpDir = path.join(title24Dir, tp.slug);
    fs.mkdirSync(tpDir, { recursive: true });
    fs.writeFileSync(path.join(tpDir, "index.html"), title24SubpagePage(tp));
    pages++;
  }

  // Projects portfolio hub + category pages
  const projectsDir = path.join(PUBLIC, "projects");
  fs.rmSync(projectsDir, { recursive: true, force: true });
  fs.mkdirSync(projectsDir, { recursive: true });
  fs.writeFileSync(path.join(projectsDir, "index.html"), projectsHubPage());
  pages++;
  for (const cat of PROJECT_CATEGORY_PAGES) {
    assertSlug(cat.slug);
    const catDir = path.join(projectsDir, cat.slug);
    fs.mkdirSync(catDir, { recursive: true });
    fs.writeFileSync(path.join(catDir, "index.html"), projectCategoryPage(cat));
    pages++;
  }

  // Static standalone pages (engineering-reports, etc.)
  for (const sp of STATIC_STANDALONE_PAGES) {
    const spDir = path.join(PUBLIC, sp.dir);
    fs.rmSync(spDir, { recursive: true, force: true });
    fs.mkdirSync(spDir, { recursive: true });
    fs.writeFileSync(path.join(spDir, "index.html"), staticStandalonePage(sp));
    pages++;
  }

  // HTML sitemap page
  const sitemapPageDir = path.join(PUBLIC, "sitemap");
  fs.rmSync(sitemapPageDir, { recursive: true, force: true });
  fs.mkdirSync(sitemapPageDir, { recursive: true });
  fs.writeFileSync(path.join(sitemapPageDir, "index.html"), htmlSitemapPage());
  pages++;

  // Discipline hub + subservice pages
  for (const hub of DISCIPLINE_HUBS) {
    assertSlug(hub.slug);
    const hubDir = path.join(PUBLIC, hub.slug);
    fs.rmSync(hubDir, { recursive: true, force: true });
    fs.mkdirSync(hubDir, { recursive: true });
    fs.writeFileSync(path.join(hubDir, "index.html"), disciplineHubPage(hub));
    pages++;
    for (const sp of hub.subpages) {
      assertSlug(sp.slug);
      const spDir = path.join(hubDir, sp.slug);
      fs.mkdirSync(spDir, { recursive: true });
      fs.writeFileSync(path.join(spDir, "index.html"), disciplineSubpagePage(hub, sp));
      pages++;
    }
  }

  // Misc standalone pages (capabilities, government-contracting, trust pages)
  for (const mp of MISC_PAGES) {
    assertSlug(mp.slug);
    const mpDir = path.join(PUBLIC, mp.slug);
    fs.rmSync(mpDir, { recursive: true, force: true });
    fs.mkdirSync(mpDir, { recursive: true });
    fs.writeFileSync(path.join(mpDir, "index.html"), miscPage(mp));
    pages++;
  }

  writeSitemap(states, cities, directory);
  const dirCount = Object.values(directory).reduce((a, v) => a + v.length, 0);
  const disciplineSubpageCount = DISCIPLINE_HUBS.reduce((a, h) => a + h.subpages.length, 0);
  console.log(`Generated ${pages} pages: ${states.length} states, ${cities.length} curated cities, ~${dirCount} directory cities, ${BLOG_POSTS.length} blog posts, ${RESOURCE_ARTICLES.length} resource articles, ${CLIENT_PAGES.length} client pages, ${PROJECT_TYPE_PAGES.length} project-type pages, ${EXISTING_BUILDING_PAGES.length} existing-building pages, ${PERMIT_PAGES.length} permit pages, ${INDUSTRY_DISCIPLINE_PAGES.length} industry×discipline pages, ${LOCATION_SERVICE_PAGES.length} location×service pages, ${SOLUTION_PAGES.length} solution pages, ${GLOSSARY_TERMS.length} glossary pages, ${GUIDE_PAGES.length} guide pages, ${DISCIPLINE_HUBS.length} discipline hubs + ${disciplineSubpageCount} subpages, ${MISC_PAGES.length} misc pages, ${STRUCTURAL_EXTENDED_PAGES.length} structural-extended subpages, ${1 + TITLE_24_PAGES.length} title-24 pages, ${1 + PROJECT_CATEGORY_PAGES.length} project pages, ${STATIC_STANDALONE_PAGES.length} standalone pages, 1 sitemap page + sitemap.xml`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

function cityServicePage(state: StateData, city: CityData, svc: ServiceDef, siblingCities: CityData[]): string {
  const url = `/locations/${state.slug}/${city.slug}/${svc.slug}/`;
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Service Areas", href: "/locations/" },
    { name: state.name, href: `/locations/${state.slug}/` },
    { name: city.name, href: `/locations/${state.slug}/${city.slug}/` },
    { name: svc.shortName },
  ];
  const otherSvcs = SERVICES.filter((x) => x.slug !== svc.slug);
  const nearby = siblingCities.filter((c) => c.slug !== city.slug).slice(0, 8);
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: city.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  const svcSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${svc.name} in ${city.name}, ${state.abbrev}`,
    provider: { "@type": "ProfessionalService", name: "Apex Grid Engineering", url: SITE },
    areaServed: { "@type": "City", name: `${city.name}, ${state.abbrev}` },
    serviceType: svc.name,
  };

  const body = `
${breadcrumb(crumbs)}
<section class="hero"><div class="container">
  <p class="kicker">${esc(city.name)}, ${esc(state.abbrev)} · Licensed Professional Engineering</p>
  <h1>${esc(svc.h1)} <span class="dim">in ${esc(city.name)}</span></h1>
  <p class="lede">${esc(svc.intro)}</p>
</div></section>

<section class="block"><div class="container">
  <h2>${esc(svc.shortName)} Engineering for <em>${esc(city.name)}</em> Projects</h2>
  <div class="prose"><p>${esc(city.narratives[svc.narrativeKey])}</p></div>
</div></section>

<section class="block"><div class="container">
  <h2>${esc(city.name)} <em>Permitting &amp; Code</em> Snapshot</h2>
  <div class="statgrid">
    <div class="cell"><div class="k">Permit Office (AHJ)</div><div class="v">${esc(city.ahj.office)}</div></div>
    <div class="cell"><div class="k">Building Code</div><div class="v">${esc(city.codes.building)}</div></div>
    <div class="cell"><div class="k">Commercial Energy Code</div><div class="v">${esc(city.codes.energy)}</div></div>
    <div class="cell"><div class="k">Electric Utility</div><div class="v">${esc(city.utilities.electric)}</div></div>
    <div class="cell"><div class="k">County</div><div class="v">${esc(city.county)}</div></div>
    <div class="cell"><div class="k">Design Climate</div><div class="v">${esc(city.climateNotes)}</div></div>
  </div>
  <p class="note">Code adoptions and local amendments change on multi-year cycles. Data reflects our research as of ${new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })} — we verify the governing editions with ${esc(city.ahj.office)} at project kickoff.</p>
</div></section>

<section class="block"><div class="container">
  <h2>Scope of <em>Services</em></h2>
  <ul class="scope">${svc.scope.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>
</div></section>

<section class="block"><div class="container">
  <h2>Working with <em>${esc(city.ahj.office)}</em></h2>
  <div class="grid2">
    <div class="card"><div class="label">Plan Review Process</div><p>${esc(city.ahj.process)}</p></div>
    <div class="card"><div class="label">Local Amendments</div><p>${esc(city.codes.amendments)}</p></div>
  </div>
  <div style="margin-top:20px" class="grid2">
    <div class="card"><div class="label">Utility Coordination</div><p>${esc(city.utilities.notes)}</p></div>
    <div class="card"><div class="label">${esc(city.name)} Market Context</div><p>${esc(city.marketNotes)}</p></div>
  </div>
</div></section>

<section class="block"><div class="container faq">
  <h2>${esc(city.name)} <em>FAQs</em></h2>
  ${city.faqs.map((f) => `<details><summary>${esc(f.q)}</summary><div class="a">${esc(f.a)}</div></details>`).join("")}
</div></section>

<section class="block"><div class="container">
  <h2>Related <em>Services &amp; Locations</em></h2>
  <div class="linkrow" style="margin-bottom:16px">${otherSvcs
    .map((o) => `<a href="/locations/${state.slug}/${city.slug}/${o.slug}/">${esc(o.name)} in ${esc(city.name)}</a>`)
    .join("")}</div>
  <div class="linkrow" style="margin-bottom:16px">${nearby
    .map((n) => `<a href="/locations/${n.stateSlug}/${n.slug}/${svc.slug}/">${esc(svc.shortName)} in ${esc(n.name)}</a>`)
    .join("")}</div>
  <div class="linkrow"><a href="/locations/${state.slug}/${svc.slug}/">${esc(svc.shortName)} in ${esc(state.name)} (statewide)</a><a href="/locations/${state.slug}/">All ${esc(state.name)} services</a></div>
</div></section>

<section class="ctaband"><div class="container">
  <h2>Start Your ${esc(city.name)} Project</h2>
  <p>With a team of licensed PEs and 20+ engineers on staff, we're ready to take on projects of any size — and we turn quotes around fast. Send us your scope and get a clear proposal: deliverables, timeline, and fee.</p>
  <a class="cta" href="/contact">Request a Proposal</a>
</div></section>`;

  return htmlShell({
    title: `${svc.name} in ${city.name}, ${state.abbrev} | Licensed PE Firm | Apex Grid`,
    description: `Licensed ${svc.name.toLowerCase()} for ${city.name}, ${state.abbrev} commercial projects. Permits through ${city.ahj.office}; designed to the ${city.codes.building.split(",")[0].split("(")[0].trim()} with local amendments.`,
    canonical: `${SITE}${url}`,
    schemaJson: [orgSchema, svcSchema, faqSchema, breadcrumbSchema(crumbs)],
    body,
  });
}

function cityPage(state: StateData, city: CityData, siblingCities: CityData[]): string {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Service Areas", href: "/locations/" },
    { name: state.name, href: `/locations/${state.slug}/` },
    { name: city.name },
  ];
  const nearby = siblingCities.filter((c) => c.slug !== city.slug);
  const body = `
${breadcrumb(crumbs)}
<section class="hero"><div class="container">
  <p class="kicker">${esc(city.county)} · ${esc(state.name)}</p>
  <h1>Engineering Services <span class="dim">in ${esc(city.name)}</span></h1>
  <p class="lede">MEP, structural, civil, and energy-compliance engineering for ${esc(city.name)} projects — permitted through ${esc(city.ahj.office)} and designed to the city's adopted codes and amendments.</p>
</div></section>
<section class="block"><div class="container">
  <h2>Services in <em>${esc(city.name)}</em></h2>
  <div class="grid2">
  ${SERVICES.map(
    (s) => `<a class="card" href="/locations/${state.slug}/${city.slug}/${s.slug}/"><div class="label">${esc(s.shortName)}</div><h3>${esc(s.name)} in ${esc(city.name)}</h3><p>${esc(s.intro)}</p></a>`,
  ).join("")}
  </div>
</div></section>
<section class="block"><div class="container">
  <h2>${esc(city.name)} <em>Design Environment</em></h2>
  <div class="statgrid">
    <div class="cell"><div class="k">Permit Office (AHJ)</div><div class="v">${esc(city.ahj.office)}</div></div>
    <div class="cell"><div class="k">Building Code</div><div class="v">${esc(city.codes.building)}</div></div>
    <div class="cell"><div class="k">Energy Code</div><div class="v">${esc(city.codes.energy)}</div></div>
    <div class="cell"><div class="k">Electric Utility</div><div class="v">${esc(city.utilities.electric)}</div></div>
  </div>
  <div class="prose" style="margin-top:24px"><p>${esc(city.codes.amendments)}</p><p>${esc(city.marketNotes)}</p></div>
</div></section>
<section class="block"><div class="container">
  <h2>More <em>Locations</em></h2>
  <div class="linkrow">${nearby
    .map((n) => `<a href="/locations/${n.stateSlug}/${n.slug}/">${esc(n.name)}</a>`)
    .join("")}<a href="/locations/${state.slug}/">${esc(state.name)} (statewide)</a></div>
</div></section>
<section class="ctaband"><div class="container">
  <h2>Build in ${esc(city.name)} with Apex Grid</h2>
  <p>${esc(city.ahj.process)}</p>
  <a class="cta" href="/contact">Request a Proposal</a>
</div></section>`;

  return htmlShell({
    title: `Engineering Services in ${city.name}, ${state.abbrev} | MEP, Structural, Civil, Energy | Apex Grid`,
    description: `Licensed MEP, structural, civil, and energy-compliance engineering in ${city.name}, ${state.abbrev}. Permitting through ${city.ahj.office} under the ${city.codes.building.split(",")[0].split("(")[0].trim()}.`,
    canonical: `${SITE}/locations/${state.slug}/${city.slug}/`,
    schemaJson: [orgSchema, breadcrumbSchema(crumbs)],
    body,
  });
}

function glossaryHubPage(): string {
  const crumbs = [{ name: "Home", href: "/" }, { name: "Engineering Glossary" }];
  const byLetter = glossaryByLetter();
  const letters = Object.keys(byLetter).sort();

  const letterNav = letters
    .map((l) => `<a href="#letter-${l}" style="border:1px solid var(--border);background:var(--card);padding:8px 14px;font-family:'Space Grotesk';font-weight:700;font-size:14px">${l}</a>`)
    .join("");

  const sections = letters
    .map((l) => {
      const terms = byLetter[l];
      const cards = terms
        .map(
          (t) =>
            `<a class="card" href="/engineering-glossary/${t.slug}/"><div class="label">${esc(CATEGORY_LABEL[t.category])}</div><h3>${esc(t.term)}</h3><p>${esc(t.definition.slice(0, 100))}…</p></a>`,
        )
        .join("");
      return `<div id="letter-${l}" style="margin-bottom:48px">
  <h2 style="font-size:36px;border-bottom:2px solid var(--primary);padding-bottom:12px;margin-bottom:20px">${l}</h2>
  <div class="grid3">${cards}</div>
</div>`;
    })
    .join("\n");

  const totalTerms = GLOSSARY_TERMS.length;

  const body = `
${breadcrumb(crumbs)}
<section class="hero"><div class="container">
  <p class="kicker">Reference · ${totalTerms}+ Terms</p>
  <h1>Engineering <span class="dim">Glossary</span></h1>
  <p class="lede">Plain-language definitions for structural, MEP, civil, geotechnical, and permitting terms used in commercial and industrial engineering — written by licensed professional engineers.</p>
</div></section>

<section class="block"><div class="container">
  <h2>Browse <em>by Letter</em></h2>
  <div class="linkrow" style="margin-bottom:32px">${letterNav}</div>
  ${sections}
</div></section>

<section class="ctaband"><div class="container">
  <h2>Questions About Your Project?</h2>
  <p>If you encountered a term that isn't in the glossary, or have engineering questions specific to your project, our team of licensed PEs is happy to help.</p>
  <a class="cta" href="/contact">Talk to an Engineer</a>
</div></section>`;

  return htmlShell({
    title: "Engineering Glossary | Structural, MEP, Civil & Code Terms | Apex Grid",
    description: `Definitions for ${totalTerms}+ structural, MEP, civil, geotechnical, and permitting engineering terms — written by licensed professional engineers at Apex Grid.`,
    canonical: `${SITE}/engineering-glossary/`,
    schemaJson: [orgSchema, breadcrumbSchema(crumbs)],
    body,
  });
}

function glossaryPage(term: GlossaryTerm): string {
  const url = `/engineering-glossary/${term.slug}/`;
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Engineering Glossary", href: "/engineering-glossary/" },
    { name: term.term },
  ];
  const categoryLabel = CATEGORY_LABEL[term.category];

  const relatedTermLinks = term.relatedTerms
    .slice(0, 6)
    .map((s) => {
      const found = GLOSSARY_TERMS.find((t) => t.slug === s);
      const label = found ? found.term : s;
      return `<a href="/engineering-glossary/${s}/">${esc(label)}</a>`;
    })
    .join("");

  const relatedServiceLinks = term.relatedServices
    .map((rs) => `<a class="card" href="${esc(rs.href)}"><div class="label">${esc(categoryLabel)}</div><h3>${esc(rs.label)}</h3></a>`)
    .join("");

  const definitionSchema = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: term.term,
    description: term.definition,
    inDefinedTermSet: `${SITE}/engineering-glossary/`,
  };

  const body = `
${breadcrumb(crumbs)}
<section class="hero"><div class="container">
  <p class="kicker">${esc(categoryLabel)} · Engineering Glossary</p>
  <h1>${esc(term.term)}</h1>
  <p class="lede">${esc(term.definition)}</p>
</div></section>

<section class="block"><div class="container">
  <h2>What Engineers Mean by <em>${esc(term.term)}</em></h2>
  <div class="prose"><p>${esc(term.extended)}</p></div>
</div></section>

${relatedServiceLinks ? `<section class="block"><div class="container">
  <h2>Related <em>Engineering Services</em></h2>
  <div class="grid2">${relatedServiceLinks}</div>
</div></section>` : ""}

${relatedTermLinks ? `<section class="block"><div class="container">
  <h2>Related <em>Glossary Terms</em></h2>
  <div class="linkrow">${relatedTermLinks}</div>
</div></section>` : ""}

<section class="block"><div class="container">
  <h2>Browse the <em>Full Glossary</em></h2>
  <p class="prose" style="color:var(--muted);margin-bottom:20px">Apex Grid Engineering maintains this glossary as a resource for architects, contractors, developers, and property owners who encounter unfamiliar engineering terminology on their projects.</p>
  <a class="cta" href="/engineering-glossary/" style="display:inline-block">View All Engineering Terms</a>
</div></section>

<section class="ctaband"><div class="container">
  <h2>Have a Project That Involves ${esc(term.term)}?</h2>
  <p>Apex Grid's licensed PEs provide ${esc(categoryLabel.toLowerCase())} services across 49 states — with fast quote turnaround and permit-ready documents.</p>
  <a class="cta" href="/contact">Request a Proposal</a>
</div></section>`;

  return htmlShell({
    title: `${term.term} | Engineering Glossary | Apex Grid`,
    description: `${term.definition.slice(0, 155)}`,
    canonical: `${SITE}${url}`,
    schemaJson: [orgSchema, definitionSchema, breadcrumbSchema(crumbs)],
    body,
  });
}
