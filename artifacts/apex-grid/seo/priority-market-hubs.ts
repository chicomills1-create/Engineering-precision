import { htmlShell, SITE } from "./shell";

export const PRIORITY_MARKET_AUTHOR =
  "Jeremy Mills, CEO & Founder, Apex Grid Engineering — USAF Veteran";

export interface PriorityMarketHub {
  stateSlug: "california" | "virginia";
  stateName: "California" | "Virginia";
  slug: string;
  market: string;
  title: string;
  description: string;
  intro: string;
  context: string;
  planningNotes: string[];
  relatedLinks: Array<{ label: string; href: string }>;
  faqs: Array<{ question: string; answer: string }>;
}

export const PRIORITY_MARKET_HUBS: PriorityMarketHub[] = [
  {
    stateSlug: "california",
    stateName: "California",
    slug: "orange-county",
    market: "Orange County",
    title: "Orange County Engineering Services & Planning | Apex Grid",
    description: "Plan structural, MEP, civil, and energy-code scopes for Orange County projects with practical, jurisdiction-aware guidance from Apex Grid Engineering.",
    intro: "I use this Orange County hub to help owners and project teams define the engineering scope before drawings move too far. The county includes many separate cities and review authorities, so I start with the project address, actual jurisdiction, building use, and current records rather than assuming one countywide permit path.",
    context: "Orange County work can range from coastal renovations and existing-building improvements to inland commercial tenant improvements, multifamily projects, restaurants, and industrial facilities. The useful engineering questions change with the site, occupancy, construction type, existing systems, and city. I separate verified project facts from early assumptions and identify which items need confirmation by the authority having jurisdiction.",
    planningNotes: [
      "Confirm the city, unincorporated area, and responsible reviewing authority",
      "Identify the building use, construction type, project phase, and requested disciplines",
      "Collect existing drawings, surveys, reports, utility information, and prior comments",
      "Coordinate structural, MEP, civil, accessibility, and energy-code interfaces",
      "Keep coastal, geotechnical, drainage, and utility conclusions project-specific",
    ],
    relatedLinks: [
      { label: "California engineering locations", href: "/locations/california/" },
      { label: "Orange County structural engineering", href: "/locations/california/orange-county/structural-engineering/" },
      { label: "Orange County MEP engineering", href: "/locations/california/orange-county/mep-engineering/" },
      { label: "Engineering resources for developers", href: "/resources/developers/" },
      { label: "Request an engineering estimate", href: "/estimate/" },
    ],
    faqs: [
      { question: "Does Orange County have one engineering permit authority?", answer: "No. Incorporated cities generally administer their own reviews, while county agencies may serve unincorporated areas or specific functions. I confirm the project address and responsible authority before defining permit-document requirements." },
      { question: "What should I send for an Orange County engineering estimate?", answer: "Send the address, current drawings, intended use, scope narrative, requested disciplines, schedule, existing reports, and any comments already issued. I use those records to identify missing inputs instead of filling gaps with assumptions." },
      { question: "Can Apex Grid support structural and MEP coordination together?", answer: "Yes, when those disciplines are part of the agreed scope. I define interfaces such as equipment support, penetrations, shafts, ceiling space, utilities, and existing-system capacity so responsibilities are clear." },
      { question: "Are coastal requirements the same throughout Orange County?", answer: "No. Coastal exposure, flood mapping, soils, local overlays, and review procedures depend on the parcel and jurisdiction. Those conditions require project-specific verification rather than a countywide conclusion." },
      { question: "Who decides whether an Orange County project is approved?", answer: "The applicable authority having jurisdiction controls its requirements, interpretation, review, and approval. Engineering documents address the agreed scope but cannot promise a particular permit outcome." },
    ],
  },
  {
    stateSlug: "california",
    stateName: "California",
    slug: "bay-area",
    market: "San Francisco Bay Area",
    title: "San Francisco Bay Area Engineering Services | Apex Grid",
    description: "Scope structural, MEP, civil, and energy engineering for Bay Area projects with jurisdiction-aware planning and coordination from Apex Grid Engineering.",
    intro: "I treat the San Francisco Bay Area as a regional coordination problem, not one permitting market. A project in San Francisco, Oakland, San Jose, or another Bay Area community can have different authority procedures, existing-building conditions, utility constraints, and local amendments. I begin with the exact address and the decision the engineering work needs to support.",
    context: "Bay Area projects often combine constrained sites, existing structures, seismic considerations, energy requirements, dense utility interfaces, and multiple consultant responsibilities. Those factors do not produce one universal design answer. I organize the work around verified records, discipline boundaries, field information, and the current requirements confirmed for the specific jurisdiction.",
    planningNotes: [
      "Verify the city, county, reviewing departments, and project-specific code path",
      "Gather existing drawings, surveys, geotechnical information, and utility records",
      "Define seismic, structural, MEP, civil, and energy responsibilities by deliverable",
      "Identify existing conditions that require field verification before design",
      "Coordinate permit comments and revisions through one current document set",
    ],
    relatedLinks: [
      { label: "California engineering locations", href: "/locations/california/" },
      { label: "San Francisco structural engineering", href: "/locations/california/san-francisco/structural-engineering/" },
      { label: "San Jose engineering", href: "/locations/california/san-jose/" },
      { label: "Oakland engineering", href: "/locations/california/oakland/" },
      { label: "Request an engineering estimate", href: "/estimate/" },
    ],
    faqs: [
      { question: "Is the Bay Area one permitting jurisdiction?", answer: "No. Each project must be tied to its actual city, county, and reviewing agencies. I confirm that authority structure before relying on a submittal procedure or local requirement." },
      { question: "What records help with an existing Bay Area building?", answer: "Useful records include current and archived drawings, prior permits, structural or geotechnical reports, equipment schedules, utility information, site photos, and a clear description of the proposed change." },
      { question: "Does every Bay Area project need seismic engineering?", answer: "Seismic design criteria apply through the governing code, but the required analysis and documentation depend on the structure, alteration, equipment, site, and scope. The actual project must be reviewed before drawing a conclusion." },
      { question: "Can engineering begin before every existing condition is known?", answer: "Sometimes, if the deliverable and assumptions are explicit. I identify unresolved conditions and the field verification or records needed before those assumptions can support final design." },
      { question: "Who controls Bay Area permit approval?", answer: "The authority having jurisdiction makes approval decisions. I prepare and coordinate the agreed engineering scope and respond to review comments without promising an outcome controlled by the authority." },
    ],
  },
  {
    stateSlug: "california",
    stateName: "California",
    slug: "inland-empire",
    market: "Inland Empire",
    title: "Inland Empire Engineering Services & Planning | Apex Grid",
    description: "Plan structural, MEP, civil, and site engineering for Inland Empire facilities with practical, jurisdiction-aware guidance from Apex Grid Engineering.",
    intro: "I built this Inland Empire hub for teams planning commercial, industrial, logistics, multifamily, and existing-building work across Riverside and San Bernardino Counties. Because the region spans many cities and unincorporated areas, the first step is identifying the site, authority, building use, and engineering decision—not applying a generic regional checklist.",
    context: "Large sites, warehouse and manufacturing uses, tenant improvements, equipment changes, utility capacity, drainage, soils, and heat can all affect Inland Empire projects. The significance of each issue depends on the parcel and proposed work. I define the required disciplines, source information, coordination points, and unknowns before treating a concept as a permit or construction scope.",
    planningNotes: [
      "Confirm whether the project is city- or county-reviewed and identify utility providers",
      "Document occupancy, operations, equipment, storage, and process requirements",
      "Coordinate site civil work with building, structural, and MEP decisions",
      "Verify existing electrical, HVAC, plumbing, roof, and structural capacity",
      "Treat drainage, geotechnical, seismic, and fire-review conditions as site-specific",
    ],
    relatedLinks: [
      { label: "California engineering locations", href: "/locations/california/" },
      { label: "Riverside engineering", href: "/locations/california/riverside/" },
      { label: "San Bernardino engineering", href: "/locations/california/san-bernardino/" },
      { label: "Industrial engineering services", href: "/industries/industrial/" },
      { label: "Request an engineering estimate", href: "/estimate/" },
    ],
    faqs: [
      { question: "Which authority reviews an Inland Empire project?", answer: "It depends on the address. A city may lead the review, while county, fire, utility, flood-control, or other agencies may also have roles. I identify those interfaces for the actual site." },
      { question: "What should an industrial project team provide first?", answer: "Provide the address, site and building plans, use and occupancy, process narrative, equipment list, utility loads, storage information, requested deliverable, and any existing reports or agency comments." },
      { question: "Can existing warehouse systems support a new tenant?", answer: "That requires review. Existing structural, electrical, HVAC, plumbing, fire-protection, and site capacity must be compared with the proposed tenant loads and operations rather than assumed from building size alone." },
      { question: "Are drainage and soils consistent across the Inland Empire?", answer: "No. Flood hazards, drainage infrastructure, soil conditions, faults, and grading history vary by parcel. Civil and geotechnical conclusions need site-specific records and investigation." },
      { question: "Can Apex Grid promise a permit schedule?", answer: "No. I can define engineering milestones and respond to comments, but review timing and approval remain under the applicable authorities and depend on the completeness and complexity of the project." },
    ],
  },
  {
    stateSlug: "virginia",
    stateName: "Virginia",
    slug: "northern-virginia",
    market: "Northern Virginia",
    title: "Northern Virginia Engineering Services | Apex Grid",
    description: "Coordinate structural, MEP, civil, and federal-project engineering scopes across Northern Virginia with practical planning from Apex Grid Engineering.",
    intro: "I use this Northern Virginia hub to frame engineering work across a region with counties, independent cities, federal facilities, dense redevelopment, and widely different project types. The label is useful for regional navigation, but the engineering scope still begins with a specific address, authority, use, and set of project records.",
    context: "Northern Virginia work may involve commercial interiors, multifamily buildings, mission-critical facilities, government projects, existing-building renovations, and site improvements. A project may also involve owner standards, federal criteria, utility coordination, or security procedures in addition to local review. I keep those requirements tied to the actual contract and jurisdiction instead of treating them as universal regional rules.",
    planningNotes: [
      "Identify the county or independent city and every reviewing authority",
      "Separate local code review from federal, owner, or agency criteria",
      "Define structural, MEP, civil, security, and specialty-consultant interfaces",
      "Gather existing records and identify conditions requiring field verification",
      "Coordinate current drawings, calculations, comments, and revision ownership",
    ],
    relatedLinks: [
      { label: "Virginia engineering locations", href: "/locations/virginia/" },
      { label: "Alexandria engineering", href: "/locations/virginia/alexandria/" },
      { label: "Manassas engineering", href: "/locations/virginia/manassas/" },
      { label: "Federal engineering services", href: "/industries/federal/" },
      { label: "Request an engineering estimate", href: "/estimate/" },
    ],
    faqs: [
      { question: "Is Northern Virginia one permit jurisdiction?", answer: "No. Counties and independent cities administer their own processes, and other agencies may participate. I confirm the project address and authority structure before defining submittal requirements." },
      { question: "Can local and federal requirements both apply?", answer: "They can, depending on the owner, site, funding, facility, and contract. The team must identify which criteria govern and who reviews each part instead of assuming federal criteria replace every local requirement." },
      { question: "What helps define a Northern Virginia engineering scope?", answer: "Send the address, owner and facility context, current drawings, project use, requested disciplines, applicable owner or agency criteria, schedule, security constraints, and existing reports or comments." },
      { question: "Can Apex Grid support an existing-building renovation?", answer: "Yes, when the requested disciplines and deliverables are defined. Existing conditions may require records review, field verification, testing, or investigation before final design conclusions are appropriate." },
      { question: "Who controls project approval in Northern Virginia?", answer: "The applicable local, state, federal, or owner reviewing entity controls its own decision. Engineering work addresses the agreed scope but does not guarantee an approval or review duration." },
    ],
  },
  {
    stateSlug: "virginia",
    stateName: "Virginia",
    slug: "arlington",
    market: "Arlington",
    title: "Arlington, Virginia Engineering Services | Apex Grid",
    description: "Plan structural, MEP, civil, and existing-building engineering for Arlington, Virginia projects with coordinated guidance from Apex Grid Engineering today.",
    intro: "I created this Arlington, Virginia hub for project teams working in a dense, largely built-out county where renovations, tenant improvements, multifamily work, commercial projects, and site constraints often intersect. I start with the property, existing records, proposed use, and exact engineering deliverable.",
    context: "Arlington projects can involve occupied buildings, limited access, neighboring structures, utility coordination, transportation interfaces, phased construction, and existing systems with incomplete records. Those conditions require disciplined verification and coordination. I identify assumptions, missing evidence, consultant boundaries, and authority questions early so they remain visible through design and review.",
    planningNotes: [
      "Confirm Arlington County review pathways and project-specific agency interfaces",
      "Collect existing drawings, prior permits, surveys, reports, and field information",
      "Define tenant, landlord, owner, architect, contractor, and engineer responsibilities",
      "Coordinate structural modifications with MEP routing and equipment support",
      "Plan access, phasing, occupied-building, utility, and site constraints explicitly",
    ],
    relatedLinks: [
      { label: "Virginia engineering locations", href: "/locations/virginia/" },
      { label: "Northern Virginia engineering", href: "/locations/virginia/northern-virginia/" },
      { label: "Alexandria engineering", href: "/locations/virginia/alexandria/" },
      { label: "Engineering resources for architects", href: "/resources/architects/" },
      { label: "Request an engineering estimate", href: "/estimate/" },
    ],
    faqs: [
      { question: "What should I send for an Arlington engineering estimate?", answer: "Send the property address, current and existing drawings, proposed use and scope, requested disciplines, target milestone, site photos, available reports, and any Arlington County comments already issued." },
      { question: "Can engineering proceed when existing drawings are incomplete?", answer: "Sometimes, but missing records must be addressed through stated assumptions, field verification, selective investigation, or other evidence appropriate to the requested conclusion. I will not represent an unknown condition as verified." },
      { question: "How are structural and MEP changes coordinated in a tenant improvement?", answer: "I identify interfaces such as openings, equipment loads, curbs, shafts, ceiling space, utility capacity, and routing. The final coordination responsibilities depend on the agreed disciplines and project team." },
      { question: "Does a prior Arlington permit establish current approval?", answer: "No. Prior records are useful evidence, but the current project must follow the requirements and review decisions applicable to its own scope and submittal." },
      { question: "Who controls Arlington County approval?", answer: "Arlington County and any other applicable reviewing entities control their requirements, review, timing, and approval decisions. Engineering documents support the agreed scope without promising an outcome." },
    ],
  },
];

export function priorityMarketHubUrl(page: PriorityMarketHub): string {
  return `/locations/${page.stateSlug}/${page.slug}/`;
}

export function priorityMarketHubPage(page: PriorityMarketHub): string {
  const url = priorityMarketHubUrl(page);
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Locations", href: "/locations/" },
    { name: page.stateName, href: `/locations/${page.stateSlug}/` },
    { name: page.market },
  ];
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
  const body = `
<nav class="breadcrumbs">${crumbs.map((crumb, index) => index === crumbs.length - 1 ? `<span>${crumb.name}</span>` : `<a href="${crumb.href}">${crumb.name}</a>`).join(" / ")}</nav>
<section class="hero"><div class="container"><p class="kicker">Priority market engineering</p><h1>${page.market} Engineering Services</h1><p class="lede">${page.intro}</p><p class="byline">By ${PRIORITY_MARKET_AUTHOR}</p></div></section>
<section class="block"><div class="container"><h2>Plan for the actual project and jurisdiction</h2><p>${page.context}</p><p>I do not use a regional page to claim that every service is available under every condition. Professional engineering services depend on the project jurisdiction, discipline, applicable licensure, scope, and team. The estimate process is where I confirm what Apex Grid can responsibly support.</p></div></section>
<section class="block"><div class="container"><h2>Information to organize before engineering begins</h2><ul>${page.planningNotes.map((note) => `<li>${note}</li>`).join("")}</ul><p>Clear source documents make uncertainty easier to manage. When records conflict, I keep the conflict visible and identify the verification needed instead of selecting the most convenient assumption.</p></div></section>
<section class="block"><div class="container"><h2>Coordinate scope, records, and review</h2><p>I recommend one current drawing set, a written scope matrix, and a record of open decisions. Permit comments should be tracked to the sheet, calculation, or response that resolves them. Field changes should return to the responsible design team before they are treated as approved work.</p><p>Engineering is most useful when each deliverable supports a defined decision: feasibility, design development, permit review, pricing, construction, or an existing-condition response. I will help identify the next appropriate step without inventing a universal fee, schedule, or approval promise.</p></div></section>
<section class="block recommended-resources"><div class="container"><h2>Related engineering pages</h2><ul>${page.relatedLinks.map((link) => `<li><a href="${link.href}">${link.label}</a></li>`).join("")}</ul></div></section>
<section class="block faq"><div class="container"><h2>Frequently Asked Questions</h2>${page.faqs.map((faq) => `<details><summary>${faq.question}</summary><div class="a">${faq.answer}</div></details>`).join("")}</div></section>
<section class="ctaband"><div class="container"><h2>Need an engineering scope for a project in ${page.market}?</h2><p>Share the address, current documents, requested disciplines, and the decision your team needs to make.</p><a class="cta" href="/estimate/">Request an Estimate</a></div></section>`;
  return htmlShell({
    title: page.title,
    description: page.description,
    canonical: `${SITE}${url}`,
    schemaJson: [
      faqSchema,
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: page.title,
        description: page.description,
        url: `${SITE}${url}`,
        isPartOf: { "@type": "WebSite", name: "Apex Grid Engineering", url: SITE },
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: crumbs.map((crumb, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: crumb.name,
          ...(crumb.href ? { item: `${SITE}${crumb.href}` } : {}),
        })),
      },
    ],
    body,
  });
}