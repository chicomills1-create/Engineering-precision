import type { CityData, StateData } from "./types";
import { htmlShell, SITE } from "./shell";
import { LICENSING_COVERAGE_STATEMENT, PROJECT_JURISDICTION_NOTE } from "../src/lib/licensing";

export interface DirectoryCity {
  slug: string;
  name: string;
  pop?: number;
  populationYear?: number;
  populationSource?: string;
  populationDataset?: "ACS 5-year" | "Population Estimates Program";
  populationStatus?: "verified-positive" | "confirmed-zero" | "unavailable";
  populationEvidenceNote?: string;
  geoid?: string;
  designation?: string;
  lat?: number;
  lng?: number;
}

export interface LocationVertical {
  slug: "architecture" | "general-contracting";
  name: string;
  shortName: string;
  providerName: string;
  kicker: string;
  serviceType: string;
  coverageStates: readonly string[];
  stateCredentials: Readonly<Record<string, string>>;
  scope: readonly string[];
  projectTypes: readonly string[];
  coreUrl: string;
}

export const LOCATION_VERTICALS: readonly LocationVertical[] = [
  {
    slug: "architecture",
    name: "Architectural Design",
    shortName: "Architecture",
    providerName: "Apex Grid Engineering",
    kicker: "Integrated Architecture · Engineering · Permitting",
    serviceType: "Commercial architectural design and permit-ready construction documents",
    coverageStates: [
      "alabama",
      "arizona",
      "california",
      "florida",
      "illinois",
      "louisiana",
      "texas",
      "washington",
    ],
    stateCredentials: {
      alabama: "Architect-of-record and firm authorization are confirmed from current Alabama board records before proposal.",
      arizona: "Architect-of-record and firm authorization are confirmed from current Arizona board records before proposal.",
      california: "Architect-of-record and firm authorization are confirmed from current California board records before proposal.",
      florida: "Architect-of-record and firm authorization are confirmed from current Florida board records before proposal.",
      illinois: "Architect-of-record and firm authorization are confirmed from current Illinois board records before proposal.",
      louisiana: "Architect-of-record and firm authorization are confirmed from current Louisiana board records before proposal.",
      texas: "Architect-of-record and firm authorization are confirmed from current Texas board records before proposal.",
      washington: "Architect-of-record and firm authorization are confirmed from current Washington board records before proposal.",
    },
    scope: [
      "Programming, feasibility, and space planning",
      "Concept and schematic architectural design",
      "Code, occupancy, egress, and accessibility coordination",
      "Permit-ready architectural construction documents",
      "Tenant-improvement and renovation design",
      "Coordination with structural, MEP, and civil engineering",
      "Plan-check response and construction administration",
    ],
    projectTypes: [
      "Commercial tenant improvements",
      "Office, banking, and financial facilities",
      "Retail and restaurant build-outs",
      "Healthcare and professional offices",
      "Industrial and warehouse facilities",
      "Multifamily and mixed-use projects",
      "Renovations, additions, and adaptive reuse",
    ],
    coreUrl: "/services/architecture",
  },
  {
    slug: "general-contracting",
    name: "General Contracting",
    shortName: "General Contracting",
    providerName: "Phoenix Construction & Management, Inc.",
    kicker: "PCM · Apex Grid Construction Delivery Branch",
    serviceType: "Commercial general contracting and construction management",
    coverageStates: ["arizona", "california", "washington"],
    stateCredentials: {
      arizona: "PCM holds Arizona contractor license ROC 337911.",
      california: "PCM holds California contractor license 815136.",
      washington: "PCM holds Washington contractor license PHOENCI783J2.",
    },
    scope: [
      "General contracting and construction management",
      "Pre-construction planning and constructability review",
      "Budget development and cost estimating",
      "Schedule development and monitoring",
      "Commercial tenant-improvement delivery",
      "Occupied-facility renovation and phased construction",
      "Program management and multi-site rollouts",
    ],
    projectTypes: [
      "Commercial tenant improvements",
      "Banking and financial facilities",
      "Office and corporate interiors",
      "Retail and customer-facing facilities",
      "Building renovations and capital improvements",
      "Occupied-site and phased construction",
      "Multi-location rollout programs",
    ],
    coreUrl: "/partners/phoenix-construction-management/",
  },
] as const;

const esc = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const breadcrumb = (items: { name: string; href?: string }[]) =>
  `<nav class="breadcrumb container">${items
    .map((item) => (item.href ? `<a href="${esc(item.href)}">${esc(item.name)}</a>` : esc(item.name)))
    .join("<span>/</span>")}</nav>`;

const breadcrumbSchema = (items: { name: string; href?: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    ...(item.href ? { item: `${SITE}${item.href}` } : {}),
  })),
});

export function verticalCityUrl(vertical: LocationVertical, stateSlug: string, citySlug: string): string {
  return `/${vertical.slug}/locations/${stateSlug}/${citySlug}/`;
}

export function verticalStateUrl(vertical: LocationVertical, stateSlug: string): string {
  return `/${vertical.slug}/locations/${stateSlug}/`;
}

export function verticalAvailableInState(vertical: LocationVertical, stateSlug: string): boolean {
  return vertical.coverageStates.includes(stateSlug);
}

export function verticalsForState(stateSlug: string): LocationVertical[] {
  return LOCATION_VERTICALS.filter((vertical) => verticalAvailableInState(vertical, stateSlug));
}

function cityPopulation(city: DirectoryCity): string {
  return city.pop ? `, a municipality of approximately ${city.pop.toLocaleString("en-US")} residents` : "";
}

function cityDesignation(city: DirectoryCity): string {
  return city.designation ? `${city.name} is identified by the U.S. Census Bureau as a ${city.designation.toLowerCase()}` : `${city.name} is an incorporated municipality`;
}

function nearbyCities(city: DirectoryCity, siblings: DirectoryCity[]): DirectoryCity[] {
  if (Number.isFinite(city.lat) && Number.isFinite(city.lng)) {
    return siblings
      .filter((item) => item.slug !== city.slug && Number.isFinite(item.lat) && Number.isFinite(item.lng))
      .map((item) => ({
        city: item,
        distance: Math.hypot((item.lat ?? 0) - (city.lat ?? 0), (item.lng ?? 0) - (city.lng ?? 0)),
      }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 10)
      .map(({ city: item }) => item);
  }
  const index = siblings.findIndex((item) => item.slug === city.slug);
  return siblings.filter((_, itemIndex) => itemIndex !== index && Math.abs(itemIndex - index) <= 5).slice(0, 10);
}

function providerSchema(vertical: LocationVertical) {
  if (vertical.slug === "general-contracting") {
    return {
      "@type": "Organization",
      name: vertical.providerName,
      alternateName: "PCM",
      url: `${SITE}${vertical.coreUrl}`,
      parentOrganization: {
        "@type": "Organization",
        name: "Apex Grid Engineering",
        url: SITE,
      },
    };
  }
  return {
    "@type": "Organization",
    name: "Apex Grid Engineering",
    url: SITE,
  };
}

function cityFaqs(vertical: LocationVertical, state: StateData, city: DirectoryCity) {
  const credential = vertical.stateCredentials[state.slug];
  if (vertical.slug === "architecture") {
    return [
      {
        q: `Does Apex Grid provide architectural design in ${city.name}, ${state.abbrev}?`,
        a: `Yes. ${credential} Apex Grid provides architectural planning, design, construction documents, and engineering coordination for qualifying ${city.name} projects. The team confirms the governing local requirements and architect-of-record scope before work begins.`,
      },
      {
        q: `Can Apex Grid coordinate architecture and engineering for a ${city.name} project?`,
        a: `Yes. Architectural, structural, MEP, civil, and energy-code teams can coordinate one permit-ready package. That integrated approach reduces discipline conflicts and gives the ${city.name} reviewing jurisdiction a more consistent set of documents.`,
      },
      {
        q: `Which building code applies to architectural work in ${city.name}?`,
        a: `${state.name}'s researched statewide baseline is ${state.buildingCode.baseCode}. ${city.name} may enforce local amendments or a different adoption schedule, so Apex Grid verifies the current code, zoning, accessibility, and submittal requirements with the local jurisdiction at project kickoff.`,
      },
    ];
  }
  return [
    {
      q: `Does PCM provide general contracting in ${city.name}, ${state.abbrev}?`,
      a: `PCM is Apex Grid's construction delivery branch. ${credential} Project availability and the exact local permit, insurance, and contracting requirements are confirmed before a proposal is issued for work in ${city.name}.`,
    },
    {
      q: `Can Apex Grid handle design and construction for a ${city.name} project?`,
      a: `Yes, when the project scope and jurisdiction allow it. Apex Grid can coordinate architecture and engineering with PCM's pre-construction, budgeting, scheduling, construction management, and field delivery services under one organization.`,
    },
    {
      q: `What types of construction does PCM perform in ${city.name}?`,
      a: `PCM focuses on commercial tenant improvements, banking and financial facilities, occupied-building renovations, capital improvements, and multi-location rollout programs. The team reviews each ${city.name} scope for fit, local requirements, schedule, and budget before contracting.`,
    },
  ];
}

function serviceSchema(vertical: LocationVertical, state: StateData, city?: DirectoryCity) {
  const areaServed = city
    ? { "@type": "City", name: `${city.name}, ${state.abbrev}` }
    : { "@type": "State", name: state.name };
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: city ? `${vertical.name} in ${city.name}, ${state.abbrev}` : `${vertical.name} in ${state.name}`,
    serviceType: vertical.serviceType,
    provider: providerSchema(vertical),
    areaServed,
  };
}

function assertVerticalHtml(html: string, canonical: string, requiresFaq = false): void {
  const h1Count = (html.match(/<h1(?:\s|>)/g) ?? []).length;
  if (h1Count !== 1) throw new Error(`Expected one H1 for ${canonical}; found ${h1Count}`);
  if (!html.includes(`<link rel="canonical" href="${canonical}"`)) {
    throw new Error(`Missing canonical for ${canonical}`);
  }
  if (!html.includes('"@type":"Service"') || !html.includes('"@type":"BreadcrumbList"')) {
    throw new Error(`Missing required schema for ${canonical}`);
  }
  if (requiresFaq && (!html.includes('"@type":"FAQPage"') || !html.includes("<details>"))) {
    throw new Error(`Missing visible FAQ/schema pair for ${canonical}`);
  }
}

export function verticalCityPage(
  vertical: LocationVertical,
  state: StateData,
  city: DirectoryCity,
  siblings: DirectoryCity[],
  curatedCity?: CityData,
  indexable = Boolean(curatedCity),
): string {
  if (!verticalAvailableInState(vertical, state.slug)) {
    throw new Error(`${vertical.name} is not enabled for ${state.name}`);
  }
  const canonicalPath = verticalCityUrl(vertical, state.slug, city.slug);
  const canonical = `${SITE}${canonicalPath}`;
  const crumbs = [
    { name: "Home", href: "/" },
    { name: vertical.shortName, href: `/${vertical.slug}/` },
    { name: "Locations", href: `/${vertical.slug}/locations/` },
    { name: state.name, href: verticalStateUrl(vertical, state.slug) },
    { name: city.name },
  ];
  const faqs = cityFaqs(vertical, state, city);
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
  const nearby = nearbyCities(city, siblings);
  const localCode = curatedCity?.codes.building ?? state.buildingCode.name;
  const localOffice = curatedCity?.ahj.office ?? `${city.name} permitting jurisdiction`;
  const localContext = curatedCity
    ? `${curatedCity.ahj.process} ${curatedCity.marketNotes}`
    : `${cityDesignation(city)}${cityPopulation(city)}. Apex Grid uses ${state.name}'s verified code and permitting baseline for early planning, then confirms ${city.name}'s current amendments and submittal requirements directly with the local jurisdiction before design or construction begins.`;
  const siblingVertical = LOCATION_VERTICALS.find(
    (item) => item.slug !== vertical.slug && verticalAvailableInState(item, state.slug),
  );
  const title =
    vertical.slug === "architecture"
      ? `Architectural Design in ${city.name}, ${state.abbrev} | Apex Grid`
      : `General Contractor in ${city.name}, ${state.abbrev} | PCM by Apex Grid`;
  const description =
    vertical.slug === "architecture"
      ? `Architectural design in ${city.name}, ${state.abbrev}: planning, permit documents, code coordination, and integrated engineering from Apex Grid.`
      : `Commercial general contracting in ${city.name}, ${state.abbrev} through PCM, Apex Grid's construction delivery branch. Pre-construction through field execution.`;
  const body = `
${breadcrumb(crumbs)}
<section class="hero"><div class="container">
  <p class="kicker">${esc(vertical.kicker)}</p>
  <h1>${esc(vertical.name)} <span class="dim">in ${esc(city.name)}, ${esc(state.abbrev)}</span></h1>
  <p class="lede">${esc(
    vertical.slug === "architecture"
      ? `Apex Grid coordinates commercial architecture with structural, MEP, civil, and energy-code disciplines for permit-ready ${city.name} projects.`
      : `Phoenix Construction & Management (PCM), Apex Grid's construction delivery branch, provides commercial pre-construction, general contracting, and construction management for qualifying ${city.name} projects.`,
  )}</p>
</div></section>

<section class="block"><div class="container">
  <h2>Direct answer: can Apex Grid help in <em>${esc(city.name)}</em>?</h2>
  <div class="prose">
    <p>${esc(vertical.stateCredentials[state.slug])} ${esc(
      vertical.slug === "architecture"
        ? `The team can deliver architectural design and coordinate the engineering package for commercial work in ${city.name}, subject to a project-specific scope and local requirements review.`
        : `PCM can evaluate commercial construction opportunities in ${city.name}; every proposal confirms local licensing, permitting, insurance, and project-delivery requirements before contracting.`,
    )}</p>
  </div>
</div></section>

<section class="block"><div class="container">
  <h2>${esc(city.name)} <em>Code &amp; Delivery Context</em></h2>
  <div class="statgrid">
    <div class="cell"><div class="k">Verified Coverage</div><div class="v">${esc(vertical.stateCredentials[state.slug])}</div></div>
    <div class="cell"><div class="k">Planning Baseline</div><div class="v">${esc(localCode)}</div></div>
    <div class="cell"><div class="k">Local Authority</div><div class="v">${esc(localOffice)}</div></div>
    <div class="cell"><div class="k">State Climate</div><div class="v">${esc(state.climate.zones)}</div></div>
  </div>
  <div class="prose" style="margin-top:24px"><p>${esc(localContext)}</p></div>
  <p class="note">Local codes, amendments, zoning rules, contractor requirements, and permit processes change. Apex Grid verifies the governing requirements for the exact site and scope before work begins.</p>
</div></section>

<section class="block"><div class="container">
  <h2>${esc(vertical.shortName)} <em>Services</em></h2>
  <ul class="scope">${vertical.scope.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>
</div></section>

<section class="block"><div class="container">
  <h2>Common <em>Project Types</em></h2>
  <div class="grid2">${vertical.projectTypes
    .map((item) => `<div class="card"><div class="label">${esc(city.name)}</div><h3>${esc(item)}</h3></div>`)
    .join("")}</div>
</div></section>

<section class="block"><div class="container faq">
  <h2>${esc(city.name)} ${esc(vertical.shortName)} <em>FAQs</em></h2>
  ${faqs.map((faq) => `<details><summary>${esc(faq.q)}</summary><div class="a">${esc(faq.a)}</div></details>`).join("")}
</div></section>

<section class="block"><div class="container">
  <h2>Related <em>Apex Grid Services &amp; Locations</em></h2>
  <div class="linkrow" style="margin-bottom:16px">
    <a href="/locations/${state.slug}/${city.slug}/">Engineering services in ${esc(city.name)}</a>
    <a href="${esc(vertical.coreUrl)}">${esc(vertical.shortName)} capabilities</a>
    ${indexable && siblingVertical ? `<a href="${verticalCityUrl(siblingVertical, state.slug, city.slug)}">${esc(siblingVertical.name)} in ${esc(city.name)}</a>` : ""}
  </div>
  <div class="linkrow">${nearby
    .map((item) => `<a href="${verticalCityUrl(vertical, state.slug, item.slug)}">${esc(vertical.shortName)} in ${esc(item.name)}</a>`)
    .join("")}<a href="${verticalStateUrl(vertical, state.slug)}">All ${esc(state.name)} locations</a></div>
</div></section>

<section class="ctaband"><div class="container">
  <h2>Discuss Your ${esc(city.name)} Project</h2>
  <p>Send Apex Grid the site, project type, and intended scope. The team will confirm fit, local requirements, deliverables, schedule, and fee before work begins.</p>
  <a class="cta" href="/contact">Request a Proposal</a>
</div></section>`;

  const html = htmlShell({
    title,
    description,
    canonical,
    schemaJson: [serviceSchema(vertical, state, city), faqSchema, breadcrumbSchema(crumbs)],
    body,
    robots: indexable ? "index,follow" : "noindex,follow",
  });
  assertVerticalHtml(html, canonical, true);
  return html;
}

export function verticalStatePage(
  vertical: LocationVertical,
  state: StateData,
  cities: DirectoryCity[],
): string {
  const canonicalPath = verticalStateUrl(vertical, state.slug);
  const canonical = `${SITE}${canonicalPath}`;
  const crumbs = [
    { name: "Home", href: "/" },
    { name: vertical.shortName, href: `/${vertical.slug}/` },
    { name: "Locations", href: `/${vertical.slug}/locations/` },
    { name: state.name },
  ];
  const body = `
${breadcrumb(crumbs)}
<section class="hero"><div class="container">
  <p class="kicker">${esc(vertical.kicker)} · ${esc(state.name)}</p>
  <h1>${esc(vertical.name)} <span class="dim">in ${esc(state.name)}</span></h1>
  <p class="lede">${esc(vertical.stateCredentials[state.slug])} Explore ${cities.length.toLocaleString("en-US")} incorporated ${state.name} service areas below.</p>
</div></section>
<section class="block"><div class="container">
  <h2>${esc(state.name)} <em>Coverage &amp; Planning Baseline</em></h2>
  <div class="statgrid">
    <div class="cell"><div class="k">Credential</div><div class="v">${esc(vertical.stateCredentials[state.slug])}</div></div>
    <div class="cell"><div class="k">Building Code Baseline</div><div class="v">${esc(state.buildingCode.name)}</div></div>
    <div class="cell"><div class="k">Energy Code</div><div class="v">${esc(state.energyCode.commercial)}</div></div>
    <div class="cell"><div class="k">Key Markets</div><div class="v">${esc(state.metros.join(", "))}</div></div>
  </div>
  <div class="prose" style="margin-top:24px"><p>${esc(state.permitting)}</p><p>${esc(state.marketNotes)}</p></div>
</div></section>
<section class="block"><div class="container">
  <h2>Choose a <em>${esc(state.name)} City</em></h2>
  <div class="grid3">${cities
    .map(
      (city) =>
        `<a class="card" href="${verticalCityUrl(vertical, state.slug, city.slug)}"><div class="label">${esc(city.designation ?? "Municipality")}</div><h3>${esc(vertical.shortName)} in ${esc(city.name)}</h3><p>Project-specific local requirements are verified before work begins.</p></a>`,
    )
    .join("")}</div>
</div></section>
<section class="ctaband"><div class="container">
  <h2>Start a ${esc(state.name)} Project</h2>
  <p>Send the location and scope. Apex Grid will confirm service fit, jurisdictional requirements, schedule, and fee.</p>
  <a class="cta" href="/contact">Request a Proposal</a>
</div></section>`;
  const html = htmlShell({
    title: `${vertical.name} in ${state.name} | Apex Grid`,
    description: `${vertical.name} across ${state.name}. ${vertical.stateCredentials[state.slug]} Explore city service areas, project types, and delivery capabilities.`,
    canonical,
    schemaJson: [serviceSchema(vertical, state), breadcrumbSchema(crumbs)],
    body,
  });
  assertVerticalHtml(html, canonical);
  return html;
}

export function verticalHubPage(
  vertical: LocationVertical,
  states: StateData[],
  cityCountByState: Readonly<Record<string, number>>,
): string {
  const canonical = `${SITE}/${vertical.slug}/locations/`;
  const coverageStates = states.filter((state) => verticalAvailableInState(vertical, state.slug));
  const totalCities = coverageStates.reduce((total, state) => total + (cityCountByState[state.slug] ?? 0), 0);
  const crumbs = [
    { name: "Home", href: "/" },
    { name: vertical.shortName, href: `/${vertical.slug}/` },
    { name: "Locations" },
  ];
  const body = `
${breadcrumb(crumbs)}
<section class="hero"><div class="container">
  <p class="kicker">${esc(vertical.kicker)}</p>
  <h1>${esc(vertical.name)} <span class="dim">Service Areas</span></h1>
  <p class="lede">Explore ${totalCities.toLocaleString("en-US")} incorporated-city service areas across the states where Apex Grid's supplied professional or contractor credentials support this regulated service.</p>
</div></section>
<section class="block"><div class="container">
  <h2>Verified <em>State Coverage</em></h2>
  <div class="grid3">${coverageStates
    .map(
      (state) =>
        `<a class="card" href="${verticalStateUrl(vertical, state.slug)}"><div class="label">${esc(state.abbrev)} · ${(cityCountByState[state.slug] ?? 0).toLocaleString("en-US")} cities</div><h3>${esc(vertical.name)} in ${esc(state.name)}</h3><p>${esc(vertical.stateCredentials[state.slug])}</p></a>`,
    )
    .join("")}</div>
</div></section>
<section class="block"><div class="container">
  <h2>One Organization, <em>Three Connected Divisions</em></h2>
  <div class="grid3">
    <a class="card" href="/locations/"><div class="label">Engineering</div><h3>Engineering Service Areas</h3><p>${LICENSING_COVERAGE_STATEMENT} ${PROJECT_JURISDICTION_NOTE}</p></a>
    <a class="card" href="/architecture/locations/"><div class="label">Architecture</div><h3>Architectural Design Service Areas</h3><p>Planning, design, permit documents, and direct engineering coordination.</p></a>
    <a class="card" href="/general-contracting/locations/"><div class="label">PCM Construction Delivery</div><h3>General Contracting Service Areas</h3><p>Pre-construction, construction management, and commercial field delivery.</p></a>
  </div>
</div></section>
<section class="ctaband"><div class="container">
  <h2>Don't See Your Project Location?</h2>
  <p>Contact Apex Grid with the site and scope. The team will confirm credential coverage and the appropriate delivery path before offering regulated services.</p>
  <a class="cta" href="/contact">Confirm Project Coverage</a>
</div></section>`;
  const html = htmlShell({
    title: `${vertical.name} Service Areas | Apex Grid`,
    description: `Explore verified ${vertical.name.toLowerCase()} service areas from Apex Grid, including state and city pages, capabilities, project types, and local planning guidance.`,
    canonical,
    schemaJson: [
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: `${vertical.name} Service Areas`,
        url: canonical,
        about: vertical.serviceType,
      },
      breadcrumbSchema(crumbs),
    ],
    body,
  });
  const h1Count = (html.match(/<h1(?:\s|>)/g) ?? []).length;
  if (h1Count !== 1 || !html.includes(`<link rel="canonical" href="${canonical}"`)) {
    throw new Error(`Invalid vertical hub: ${canonical}`);
  }
  return html;
}

export function verticalLandingPage(vertical: LocationVertical): string {
  const canonical = `${SITE}/${vertical.slug}/`;
  const crumbs = [{ name: "Home", href: "/" }, { name: vertical.shortName }];
  const body = `
${breadcrumb(crumbs)}
<section class="hero"><div class="container">
  <p class="kicker">${esc(vertical.kicker)}</p>
  <h1>${esc(vertical.name)} <span class="dim">by Apex Grid</span></h1>
  <p class="lede">${esc(
    vertical.slug === "architecture"
      ? "Commercial architectural design coordinated from concept through permit-ready documents with Apex Grid's structural, MEP, civil, and energy-code teams."
      : "Commercial general contracting, construction management, pre-construction, and rollout delivery through Phoenix Construction & Management (PCM), Apex Grid's construction delivery branch.",
  )}</p>
</div></section>
<section class="block"><div class="container">
  <h2>Integrated <em>${esc(vertical.shortName)}</em></h2>
  <ul class="scope">${vertical.scope.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>
</div></section>
<section class="block"><div class="container">
  <h2>Common <em>Project Types</em></h2>
  <div class="grid2">${vertical.projectTypes
    .map((item) => `<div class="card"><div class="label">${esc(vertical.shortName)}</div><h3>${esc(item)}</h3></div>`)
    .join("")}</div>
</div></section>
<section class="block"><div class="container">
  <h2>Find a <em>Service Area</em></h2>
  <p class="prose" style="color:var(--muted);margin-bottom:24px">Browse states and incorporated cities where the supplied professional or contractor credentials support this regulated service.</p>
  <a class="cta" href="/${vertical.slug}/locations/" style="display:inline-block">Browse ${esc(vertical.shortName)} Locations</a>
</div></section>
<section class="ctaband"><div class="container">
  <h2>Bring the Full Build Team Together</h2>
  <p>Apex Grid connects engineering, architecture, and construction delivery under one organization, with credential and jurisdiction checks completed before regulated work begins.</p>
  <a class="cta" href="/contact">Request a Proposal</a>
</div></section>`;
  const html = htmlShell({
    title: `${vertical.name} | Integrated Design & Delivery | Apex Grid`,
    description:
      vertical.slug === "architecture"
        ? "Commercial architectural design from concept through permit-ready documents, coordinated with Apex Grid engineering under one accountable organization."
        : "Commercial general contracting and construction management through PCM, Apex Grid's construction delivery branch. Pre-construction through field execution.",
    canonical,
    schemaJson: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: vertical.name,
        serviceType: vertical.serviceType,
        provider: providerSchema(vertical),
      },
      breadcrumbSchema(crumbs),
    ],
    body,
  });
  assertVerticalHtml(html, canonical);
  return html;
}