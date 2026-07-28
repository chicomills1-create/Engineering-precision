/** Generates static SEO pages into public/locations/ and rebuilds sitemap.xml.
 * Run: pnpm --filter @workspace/apex-grid run seo:generate
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { StateData, CityData } from "./types";
import { SERVICES, type ServiceDef } from "./services";
import { htmlShell, SITE } from "./shell";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC = path.resolve(__dirname, "../public");
const OUT = path.join(PUBLIC, "locations");

async function loadStates(): Promise<StateData[]> {
  const dir = path.join(__dirname, "states");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".ts"));
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

function writeSitemap(states: StateData[], cities: CityData[]) {
  const today = new Date().toISOString().slice(0, 10);
  const core = [
    ["/", "1.0", "weekly"],
    ["/services", "0.9", "monthly"],
    ["/services/mep", "0.8", "monthly"],
    ["/services/structural", "0.8", "monthly"],
    ["/services/civil", "0.8", "monthly"],
    ["/services/assessments", "0.8", "monthly"],
    ["/portfolio", "0.8", "monthly"],
    ["/industries", "0.7", "monthly"],
    ["/resources", "0.7", "weekly"],
    ["/about", "0.6", "monthly"],
    ["/team", "0.6", "monthly"],
    ["/contact", "0.7", "monthly"],
  ];
  const urls: string[] = core.map(
    ([p, pr, cf]) => `  <url><loc>${SITE}${p}</loc><changefreq>${cf}</changefreq><priority>${pr}</priority></url>`,
  );
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
  }
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`;
  fs.writeFileSync(path.join(PUBLIC, "sitemap.xml"), xml);
}

async function main() {
  const states = await loadStates();
  const cities = await loadCities();
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
  }
  writeSitemap(states, cities);
  console.log(`Generated ${pages} pages for ${states.length} states and ${cities.length} cities + sitemap.xml`);
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
