import { htmlShell, SITE } from "./shell";
import { APEX_GRID_BUSINESS_SCHEMA } from "../src/lib/business-schema";

/**
 * Food processing plant engineering sector (seo/food-processing-tier).
 * Hub + 50 state hubs + city pages + AEO answers, all rendered by
 * seo/generate.ts into public/food-processing-design/ and
 * public/answers/food-processing-TOPIC/, with sitemap-food-processing.xml.
 */

export const FOOD_PROCESSING_AUTHOR =
  "Jeremy Mills, CEO & Founder, Apex Grid Engineering — USAF Veteran";

export type FoodFacilityFocus =
  | "meat"
  | "poultry"
  | "dairy"
  | "produce"
  | "beverage"
  | "frozen"
  | "seafood"
  | "grain"
  | "snack"
  | "mixed";

export interface FoodProcessingState {
  slug: string;
  name: string;
  postal: string;
  tagline: string;
  sectors: string[];
  agRegions: string[];
  facts: string[];
  facilityFocus: FoodFacilityFocus;
  climateNote: string;
  codeNote: string;
  faqExtra: Array<{ q: string; a: string }>;
}

export interface FoodProcessingCity {
  slug: string;
  name: string;
  stateSlug: string;
  stateName: string;
  hook: string;
  fact: string;
  focus: FoodFacilityFocus;
}

export interface FoodProcessingAnswerSection {
  heading: string;
  body: string;
  bullets?: string[];
}

export interface FoodProcessingAnswer {
  slug: string;
  title: string;
  description: string;
  h1: string;
  lede: string;
  sections: FoodProcessingAnswerSection[];
  faqs: Array<{ question: string; answer: string }>;
  related: string[];
}

export function foodProcessingHubUrl(): string {
  return "/food-processing-design/";
}
export function foodProcessingStateUrl(state: { slug: string }): string {
  return `/food-processing-design/${state.slug}/`;
}
export function foodProcessingCityUrl(
  state: { slug: string },
  city: { slug: string },
): string {
  return `/food-processing-design/${state.slug}/${city.slug}/`;
}
export function foodProcessingAnswerUrl(answer: { slug: string }): string {
  return `/answers/${answer.slug}/`;
}

const esc = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const focusLabel: Record<FoodFacilityFocus, string> = {
  meat: "meat and beef processing",
  poultry: "poultry processing",
  dairy: "dairy processing",
  produce: "produce and fresh-food processing",
  beverage: "beverage and bottling",
  frozen: "frozen-food processing and cold storage",
  seafood: "seafood processing",
  grain: "grain, milling, and bakery",
  snack: "snack and prepared-food manufacturing",
  mixed: "diversified food manufacturing",
};

const focusSystems: Record<FoodFacilityFocus, string[]> = {
  meat: [
    "USDA-FSIS-inspected process areas with sanitary design throughout",
    "Ammonia refrigeration for blast chilling, coolers, and freezers",
    "High-volume steam and hot-water systems for sanitation and rendering",
    "NEMA 4X washdown electrical and sloped-to-drain epoxy floors",
    "Blood, offal, and wastewater pretreatment coordination",
  ],
  poultry: [
    "USDA-FSIS-inspected slaughter and further-processing lines",
    "Ammonia/CO2 cascade refrigeration for chillers and freezers",
    "Scald, sanitation, and CIP hot-water systems",
    "Washdown-rated electrical, FRP walls, and hygienic drainage",
    "Feather, offal, and high-strength wastewater handling",
  ],
  dairy: [
    "Pasteurization, separation, and CIP process utility design",
    "Glycol and ammonia refrigeration for milk cooling and cold storage",
    "Clean steam and hot-water generation for sanitation cycles",
    "Sanitary stainless process piping and hygienic floor drainage",
    "Condensate recovery and boiler-feed water treatment",
  ],
  produce: [
    "Hydro-cooling, cold rooms, and ripening-room refrigeration",
    "Wash and flume water systems with treatment and reuse",
    "High-humidity ventilation and condensation control",
    "Food-grade washdown construction and chemical-resistant finishes",
    "Rapid pre-cool and cold-chain dock design",
  ],
  beverage: [
    "Process water treatment, CIP, and clean-steam systems",
    "Glycol chilling for fermentation, carbonation, and cold fill",
    "Compressed air (oil-free) for blow-mold and packaging lines",
    "High-speed bottling line power, controls, and conveyor layouts",
    "Wastewater pretreatment for high-BOD bottling effluent",
  ],
  frozen: [
    "Ammonia or CO2 low-temp refrigeration for blast freezing",
    "Freezer warehouse envelope, insulated panels, and vapor barriers",
    "Defrost, underfloor heating, and dock-door air management",
    "ESFR fire protection coordinated with freezer construction",
    "Backup power and refrigeration redundancy for product protection",
  ],
  seafood: [
    "Ice production, chilled seawater, and cold-chain refrigeration",
    "Corrosion-resistant construction for salt-air and washdown zones",
    "Odor control ventilation and process wastewater pretreatment",
    "FDA seafood HACCP facility layout and temperature control points",
    "Blast freezing and cold-storage dock design",
  ],
  grain: [
    "Dust collection, explosion venting, and classified electrical areas",
    "Ingredient handling, conveying, and bulk storage systems",
    "Oven and fryer exhaust, makeup air, and heat recovery",
    "Allergen-segregated process zones and sanitation design",
    "Pneumatic conveying compressed-air systems",
  ],
  snack: [
    "Fryer and oven exhaust with grease-rated ventilation",
    "Seasoning, coating, and packaging line utilities",
    "Allergen control zoning and washdown-capable construction",
    "Compressed air and process cooling for packaging lines",
    "Odor abatement and wastewater pretreatment",
  ],
  mixed: [
    "Flexible process utility corridors sized for tenant changeover",
    "Washdown-rated electrical and hygienic drainage throughout",
    "Scalable refrigeration, steam, and compressed-air capacity",
    "Food-grade finishes adaptable across product categories",
    "Phased expansion planning so capacity can grow with demand",
  ],
};

const speedVariants: string[] = [
  "Processors adding capacity are usually racing a contract start date or a seasonal harvest window. Our fast-track approach overlaps design packages with procurement and early site work, so refrigeration pads, utility mains, and structural steel move while final process details are still being coordinated — without losing the sanitary detailing that FDA and USDA reviewers check first.",
  "In food processing, schedule is a business weapon: a plant that starts up one quarter earlier captures the contract. We run fast-track delivery by releasing early bid packages for long-lead equipment — ammonia compressors, boilers, switchgear — while process lines are finalized in parallel, keeping the critical path on equipment delivery rather than drawing production.",
  "Food companies expand when demand forces it, which means engineering has to move at the speed of the business. Our phased design releases let contractors mobilize on site improvements and building shell while process-specific MEP is still being detailed, compressing the timeline between approved concept and first production run.",
  "Every month a new line sits idle is revenue a processor never recovers. We structure food-plant engineering around long-lead procurement: refrigeration systems, electrical gear, and process equipment are specified first, foundations and utility rough-in follow, and the building closes around equipment that is already on order.",
];

function breadcrumbs(items: Array<{ name: string; href?: string }>): string {
  return `<nav class="breadcrumbs">${items
    .map((item, i) =>
      i === items.length - 1
        ? `<span>${esc(item.name)}</span>`
        : `<a href="${esc(item.href ?? "/")}">${esc(item.name)}</a>`,
    )
    .join(" / ")}</nav>`;
}

function faqSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

function faqBlock(faqs: Array<{ question: string; answer: string }>): string {
  return `<section class="block faq"><div class="container"><h2>Frequently Asked Questions</h2>${faqs
    .map(
      (f) =>
        `<details><summary>${esc(f.question)}</summary><div class="a"><p>${esc(f.answer)}</p></div></details>`,
    )
    .join("")}</div></section>`;
}

function ctaBand(heading: string, copy: string): string {
  return `<section class="ctaband"><div class="container"><h2>${esc(heading)}</h2><p>${esc(copy)}</p><a class="cta" href="/estimate/">Request an Estimate</a></div></section>`;
}

function breadcrumbSchema(items: Array<{ name: string; href?: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.href ? { item: `${SITE}${item.href}` } : {}),
    })),
  };
}

function licensingFooter(): string {
  return `<section class="block"><div class="container"><p class="fineprint">Apex Grid Engineering is licensed in 49 states — every U.S. state except Alaska. Engineering stamping and licensure are confirmed for each project jurisdiction. USDA and FDA compliance review is coordinated with the plant's regulatory consultants and the authority having jurisdiction.</p></div></section>`;
}

/** ── Hub ─────────────────────────────────────────────────────────────── */
export function foodProcessingHubPage(
  states: FoodProcessingState[],
  answers: FoodProcessingAnswer[],
): string {
  const url = foodProcessingHubUrl();
  const faqs = [
    {
      question: "What engineering disciplines does a food processing plant need?",
      answer:
        "A food plant needs coordinated mechanical (process refrigeration, HVAC, plumbing), electrical (washdown-rated power, lighting, controls), structural (equipment loads, mezzanines, cold-storage construction), and civil (site, utilities, wastewater pretreatment) engineering — plus process utility design for steam, compressed air, and CIP systems that general commercial engineers rarely handle.",
    },
    {
      question: "Do food processing plants need USDA or FDA approval of the engineering?",
      answer:
        "Meat, poultry, and egg processing plants operate under USDA FSIS inspection, which reviews facility layout, sanitation, and water supply as part of the grant of inspection. Most other food plants fall under FDA's Current Good Manufacturing Practice (21 CFR Part 110/117), enforced through inspections rather than pre-approval. Engineering documents support both paths with sanitary design, proper zoning, and documented utilities.",
    },
    {
      question: "How fast can a food processing plant be designed?",
      answer:
        "Speed depends on scope and equipment lead times, but fast-track delivery is standard for this sector: long-lead refrigeration, boilers, and switchgear are specified first while site and shell packages release in parallel. A realistic aggressive schedule runs design and early construction in overlap rather than sequence — talk to us with your target production date and we will tell you honestly what fits.",
    },
    {
      question: "Does Apex Grid stamp food plant drawings in my state?",
      answer:
        "Apex Grid Engineering is licensed in 49 states — every U.S. state except Alaska — and professional seals are applied by licensed engineers for each project jurisdiction. Tell us the plant location and scope and we will confirm coverage before proposal.",
    },
  ];
  const stateCards = states
    .map(
      (s) =>
        `<a class="card" href="${foodProcessingStateUrl(s)}"><div class="label">${esc(s.postal)}</div><h3>${esc(s.name)}</h3><p>${esc(s.tagline)}</p></a>`,
    )
    .join("");
  const answerLinks = answers
    .map(
      (a) =>
        `<li><a href="${foodProcessingAnswerUrl(a)}">${esc(a.h1)}</a></li>`,
    )
    .join("");
  const body = `
${breadcrumbs([{ name: "Home", href: "/" }, { name: "Food Processing Plant Design" }])}
<section class="hero"><div class="container"><p class="kicker">Food processing plant engineering · 49 states</p><h1>Food Processing Plant Engineering &amp; Design</h1><p class="lede">MEP-intensive engineering for food and beverage plants: process refrigeration, steam and CIP utilities, washdown-rated electrical, sanitary drainage, and fast-track delivery for processors racing to add capacity. Designed for FDA and USDA compliance from the first sketch.</p><p class="byline">By ${esc(FOOD_PROCESSING_AUTHOR)}</p></div></section>
<section class="block"><div class="container"><h2>Engineered for how food plants actually run</h2><p>Food processing is one of the most MEP-intensive building types there is. A plant lives or dies on its process utilities: ammonia or CO2 refrigeration holding product at temperature around the clock, steam and hot water feeding sanitation and CIP cycles, oil-free compressed air driving packaging lines, and washdown-rated electrical surviving daily chemical cleaning. We design all of it as one coordinated system — not as separate trades that meet for the first time in the field.</p><p>Regulatory reality shapes every decision. USDA-inspected meat and poultry plants need sanitary facility design that stands up to FSIS review; FDA-regulated plants need Current Good Manufacturing Practice (21 CFR Part 110/117) baked into layout, materials, and zoning. We design to both, and we coordinate with your food-safety team so the building supports the HACCP plan instead of fighting it.</p></div></section>
<section class="block"><div class="container"><h2>Systems we design for food plants</h2><ul>${[
    "Process refrigeration: ammonia, CO2, and glycol systems for blast chilling, coolers, freezers, and cold storage",
    "Steam, condensate, and hot-water systems for cooking, sanitation, and CIP",
    "Washdown-rated electrical: NEMA 4X enclosures, sealed lighting, hygienic cable routing",
    "Sloped-to-drain floors, trench drains, and sanitary plumbing with backflow protection",
    "Oil-free compressed air (ISO 8573) for food-contact and packaging applications",
    "Ventilation and pressure zoning: positive-pressure ready-to-eat areas, controlled raw zones",
    "Fire protection including ESFR systems for cold-storage warehouses",
    "Wastewater pretreatment coordination for high-BOD process effluent",
  ]
    .map((s) => `<li>${esc(s)}</li>`)
    .join("")}</ul></div></section>
<section class="block"><div class="container"><h2>Built for speed: fast-track food plant delivery</h2><p>${esc(speedVariants[0])}</p><p>That speed never comes at the expense of the details inspectors check: sanitary welds, coved floor-wall junctions, sealed penetrations, and documented utility capacities are designed in from the start, because rework during a USDA or FDA walkthrough costs more time than doing it right once.</p></div></section>
<section class="block"><div class="container"><h2>Food processing engineering by state</h2><p>Select a state for the local food industry picture — production sectors, agricultural regions, and the engineering systems those plants demand.</p><div class="cards">${stateCards}</div></div></section>
<section class="block"><div class="container"><h2>Food plant engineering answers</h2><ul>${answerLinks}</ul><p>Related: <a href="/answers/food-processing-plant-design/">Food processing plant design</a> · <a href="/answers/food-processing-plant-engineering/">Food processing plant engineering</a> · <a href="/answers/seafood-processing-design/">Seafood processing design</a> · <a href="/industries/cold-storage-food-processing-engineering/">Cold storage &amp; food processing engineering</a> · <a href="/services/mep/">MEP engineering</a></p></div></section>
${faqBlock(faqs)}
${ctaBand("Adding food processing capacity?", "Send us your project location, target production date, and process description. We will scope the MEP and structural engineering and give you an honest fast-track timeline.")}
${licensingFooter()}`;
  return htmlShell({
    title: "Food Processing Plant Engineering & Design | Apex Grid",
    description:
      "MEP engineering for food processing plants: ammonia/CO2 refrigeration, steam and CIP utilities, washdown electrical, sanitary drainage, and fast-track delivery. Licensed in 49 states.",
    canonical: `${SITE}${url}`,
    schemaJson: [
      APEX_GRID_BUSINESS_SCHEMA,
      faqSchema(faqs),
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Food Processing Plant Engineering & Design",
        description:
          "MEP-intensive engineering for food and beverage processing plants across 49 states.",
        url: `${SITE}${url}`,
        isPartOf: { "@type": "WebSite", name: "Apex Grid Engineering", url: SITE },
      },
      breadcrumbSchema([
        { name: "Home", href: "/" },
        { name: "Food Processing Plant Design" },
      ]),
    ],
    body,
  });
}

/** ── State hub ───────────────────────────────────────────────────────── */
export function foodProcessingStatePage(
  state: FoodProcessingState,
  cities: FoodProcessingCity[],
  answers: FoodProcessingAnswer[],
  speedIdx: number,
): string {
  const url = foodProcessingStateUrl(state);
  const systems = focusSystems[state.facilityFocus];
  const k = (speedIdx * 4) % answers.length;
  const relatedAnswers = [...answers.slice(k), ...answers.slice(0, k)].slice(0, 4);
  const faqs = [
    ...state.faqExtra.map((f) => ({ question: f.q, answer: f.a })),
    {
      question: `How do I start a food processing plant engineering project in ${state.name}?`,
      answer: `Send the site address, the products and processes planned, target production volumes and dates, and any existing drawings. We confirm jurisdiction and licensing, then scope the MEP, structural, and civil work with a fast-track schedule option built around your production date.`,
    },
    {
      question: "Can Apex Grid stamp drawings in " + state.name + "?",
      answer:
        "Apex Grid Engineering is licensed in 49 states — every U.S. state except Alaska — and seals are applied by licensed engineers for the project jurisdiction. Confirm your plant location when you request an estimate and we will verify coverage.",
    },
  ];
  const cityCards = cities
    .map(
      (c) =>
        `<a class="card" href="${foodProcessingCityUrl(state, c)}"><h3>${esc(c.name)}</h3><p>${esc(c.hook)}</p></a>`,
    )
    .join("");
  const body = `
${breadcrumbs([
  { name: "Home", href: "/" },
  { name: "Food Processing Plant Design", href: foodProcessingHubUrl() },
  { name: state.name },
])}
<section class="hero"><div class="container"><p class="kicker">Food processing engineering · ${esc(state.name)}</p><h1>Food Processing Plant Engineering in ${esc(state.name)}</h1><p class="lede">${esc(state.tagline)}</p><p class="byline">By ${esc(FOOD_PROCESSING_AUTHOR)}</p></div></section>
<section class="block"><div class="container"><h2>The ${esc(state.name)} food industry</h2><p>${esc(state.facts[0])}</p><p>${esc(state.facts[1])}</p>${state.facts[2] ? `<p>${esc(state.facts[2])}</p>` : ""}<p><strong>Key production sectors:</strong> ${state.sectors.map(esc).join("; ")}. <strong>Agricultural regions:</strong> ${state.agRegions.map(esc).join("; ")}.</p></div></section>
<section class="block"><div class="container"><h2>Engineering systems for ${esc(focusLabel[state.facilityFocus])} facilities</h2><p>${esc(state.climateNote)}</p><ul>${systems.map((s) => `<li>${esc(s)}</li>`).join("")}</ul><p>${esc(state.codeNote)}</p></div></section>
<section class="block"><div class="container"><h2>Fast-track delivery for ${esc(state.name)} processors</h2><p>${esc(speedVariants[speedIdx % speedVariants.length])}</p></div></section>
<section class="block"><div class="container"><h2>Food processing cities in ${esc(state.name)}</h2><div class="cards">${cityCards}</div></div></section>
<section class="block"><div class="container"><h2>Related engineering answers</h2><ul>${relatedAnswers
    .map((a) => `<li><a href="${foodProcessingAnswerUrl(a)}">${esc(a.h1)}</a></li>`)
    .join("")}</ul><p>Also see: <a href="/services/mep/">MEP engineering</a> · <a href="/answers/ammonia-refrigeration-design/">Ammonia refrigeration design</a> · <a href="/answers/food-plant-process-refrigeration-design/">Food plant process refrigeration</a></p></div></section>
${faqBlock(faqs)}
${ctaBand(`Building a food plant in ${state.name}?`, "Tell us the location, products, and target production date. We will scope the engineering and lay out a fast-track path to startup.")}
${licensingFooter()}`;
  return htmlShell({
    title: `Food Processing Plant Engineering in ${state.name} | Apex Grid`,
    description: `MEP engineering for food processing plants in ${state.name}: ${state.sectors.slice(0, 3).join(", ")}. Process refrigeration, steam, washdown electrical, sanitary design.`,
    canonical: `${SITE}${url}`,
    schemaJson: [
      APEX_GRID_BUSINESS_SCHEMA,
      faqSchema(faqs),
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: `Food Processing Plant Engineering in ${state.name}`,
        description: state.tagline,
        url: `${SITE}${url}`,
        isPartOf: { "@type": "WebSite", name: "Apex Grid Engineering", url: SITE },
      },
      breadcrumbSchema([
        { name: "Home", href: "/" },
        { name: "Food Processing Plant Design", href: foodProcessingHubUrl() },
        { name: state.name },
      ]),
    ],
    body,
  });
}

/** ── City page ───────────────────────────────────────────────────────── */
export function foodProcessingCityPage(
  state: FoodProcessingState,
  city: FoodProcessingCity,
  answers: FoodProcessingAnswer[],
  speedIdx: number,
): string {
  const url = foodProcessingCityUrl(state, city);
  const systems = focusSystems[city.focus].slice(0, 4);
  const k = (speedIdx * 3 + 1) % answers.length;
  const relatedAnswers = [...answers.slice(k), ...answers.slice(0, k)].slice(0, 3);
  const faqs = [
    {
      question: `Why is ${city.name} a food processing location?`,
      answer: city.fact,
    },
    {
      question: `What engineering does a ${focusLabel[city.focus]} facility need in ${city.name}?`,
      answer: `The core MEP scope covers ${systems[0].charAt(0).toLowerCase() + systems[0].slice(1)}, plus ${systems[1].charAt(0).toLowerCase() + systems[1].slice(1)}. Sanitary construction, proper zoning between raw and finished areas, and documented utility capacity support FDA or USDA review.`,
    },
    {
      question: `How fast can engineering move for a ${city.name} food plant?`,
      answer: `Fast-track delivery is built for this: long-lead refrigeration, boilers, and switchgear are specified first while site and shell packages release in parallel. Share your target production date and we will map an honest schedule to it.`,
    },
  ];
  const body = `
${breadcrumbs([
  { name: "Home", href: "/" },
  { name: "Food Processing Plant Design", href: foodProcessingHubUrl() },
  { name: state.name, href: foodProcessingStateUrl(state) },
  { name: city.name },
])}
<section class="hero"><div class="container"><p class="kicker">Food processing engineering · ${esc(city.name)}, ${esc(state.postal)}</p><h1>Food Processing Plant Engineering in ${esc(city.name)}, ${esc(state.name)}</h1><p class="lede">${esc(city.hook)}</p><p class="byline">By ${esc(FOOD_PROCESSING_AUTHOR)}</p></div></section>
<section class="block"><div class="container"><h2>Why ${esc(city.name)}</h2><p>${esc(city.fact)}</p><p>For ${esc(state.name)} processors, ${esc(city.name)} offers the combination that matters: access to raw product, labor, utilities, and transportation in one place. We engineer plants here for ${esc(focusLabel[city.focus])} — and for the expansions and retrofits that keep existing facilities competitive.</p></div></section>
<section class="block"><div class="container"><h2>Engineering focus for ${esc(city.name)} plants</h2><ul>${systems.map((s) => `<li>${esc(s)}</li>`).join("")}</ul><p>${esc(state.climateNote)}</p></div></section>
<section class="block"><div class="container"><h2>Fast-track delivery</h2><p>${esc(speedVariants[speedIdx % speedVariants.length])}</p><p>More on ${esc(state.name)}: <a href="${foodProcessingStateUrl(state)}">food processing engineering in ${esc(state.name)}</a> · <a href="${foodProcessingHubUrl()}">national food plant engineering</a></p></div></section>
<section class="block"><div class="container"><h2>Related answers</h2><ul>${relatedAnswers
    .map((a) => `<li><a href="${foodProcessingAnswerUrl(a)}">${esc(a.h1)}</a></li>`)
    .join("")}</ul></div></section>
${faqBlock(faqs)}
${ctaBand(`Food plant project in ${city.name}?`, "Send the site, products, and target dates. We will scope the MEP and structural engineering for your plant.")}
${licensingFooter()}`;
  return htmlShell({
    title: `Food Processing Plant Engineering in ${city.name}, ${state.name} | Apex Grid`,
    description: `MEP engineering for ${focusLabel[city.focus]} facilities in ${city.name}, ${state.name}: refrigeration, steam, washdown electrical, sanitary design.`,
    canonical: `${SITE}${url}`,
    schemaJson: [
      APEX_GRID_BUSINESS_SCHEMA,
      faqSchema(faqs),
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: `Food Processing Plant Engineering in ${city.name}, ${state.name}`,
        description: city.hook,
        url: `${SITE}${url}`,
        provider: { "@type": "Organization", name: "Apex Grid Engineering", url: SITE },
        areaServed: { "@type": "City", name: `${city.name}, ${state.name}` },
      },
      breadcrumbSchema([
        { name: "Home", href: "/" },
        { name: "Food Processing Plant Design", href: foodProcessingHubUrl() },
        { name: state.name, href: foodProcessingStateUrl(state) },
        { name: city.name },
      ]),
    ],
    body,
  });
}

/** ── AEO answer ──────────────────────────────────────────────────────── */
export function foodProcessingAnswerPage(
  answer: FoodProcessingAnswer,
  allAnswers: FoodProcessingAnswer[],
): string {
  const url = foodProcessingAnswerUrl(answer);
  const related = answer.related
    .map((slug) => allAnswers.find((a) => a.slug === slug))
    .filter((a): a is FoodProcessingAnswer => Boolean(a))
    .slice(0, 4);
  const sections = answer.sections
    .map(
      (s) => `<section class="block"><div class="container"><h2>${esc(s.heading)}</h2><p>${esc(s.body).replace(/\n\n/g, "</p><p>")}</p>${
        s.bullets ? `<ul>${s.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>` : ""
      }</div></section>`,
    )
    .join("");
  const body = `
${breadcrumbs([
  { name: "Home", href: "/" },
  { name: "Food Processing Plant Design", href: foodProcessingHubUrl() },
  { name: "Answers" },
])}
<section class="hero"><div class="container"><p class="kicker">Food plant engineering answer</p><h1>${esc(answer.h1)}</h1><p class="lede">${esc(answer.lede)}</p><p class="byline">By ${esc(FOOD_PROCESSING_AUTHOR)}</p></div></section>
${sections}
<section class="block"><div class="container"><h2>Related food plant answers</h2><ul>${related
    .map((a) => `<li><a href="${foodProcessingAnswerUrl(a)}">${esc(a.h1)}</a></li>`)
    .join("")}<li><a href="${foodProcessingHubUrl()}">Food processing plant engineering hub</a></li></ul><p>Also: <a href="/services/mep/">MEP engineering</a> · <a href="/answers/food-plant-process-refrigeration-design/">Food plant process refrigeration</a></p></div></section>
${faqBlock(answer.faqs)}
${ctaBand("Have a food plant project?", "Send us the location, products, and target production date for an engineering scope and estimate.")}
${licensingFooter()}`;
  return htmlShell({
    title: answer.title,
    description: answer.description,
    canonical: `${SITE}${url}`,
    schemaJson: [
      APEX_GRID_BUSINESS_SCHEMA,
      faqSchema(answer.faqs),
      {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: answer.h1,
        description: answer.description,
        url: `${SITE}${url}`,
        author: { "@type": "Person", name: "Jeremy Mills" },
        publisher: { "@type": "Organization", name: "Apex Grid Engineering", url: SITE },
      },
      breadcrumbSchema([
        { name: "Home", href: "/" },
        { name: "Food Processing Plant Design", href: foodProcessingHubUrl() },
        { name: "Answers" },
      ]),
    ],
    body,
  });
}
