import { htmlShell, SITE } from "./shell";

export const AUDIENCE_RESOURCE_AUTHOR =
  "Jeremy Mills, CEO & Founder, Apex Grid Engineering — USAF Veteran";

export interface AudienceResourceHub {
  slug: "architects" | "contractors" | "developers" | "property-managers";
  audience: string;
  title: string;
  description: string;
  intro: string;
  relatedResources: Array<{ label: string; href: string }>;
  sections: Array<{ heading: string; paragraphs: string[]; bullets?: string[] }>;
  faqs: Array<{ question: string; answer: string }>;
}

const link = (href: string, label: string) => `<a href="${href}">${label}</a>`;

export const AUDIENCE_RESOURCE_HUBS: AudienceResourceHub[] = [
  {
    slug: "architects",
    audience: "Architects",
    title: "Engineering Resources for Architects and Design Teams",
    description: "Practical engineering resources for architects: scope coordination, existing conditions, permit sets, and clear handoffs from Apex Grid Engineering now.",
    intro: "I built this resource hub around the moments when an architectural concept becomes a coordinated, buildable package. My goal is to help you identify engineering inputs early, without pretending that one checklist replaces project judgment.",
    relatedResources: [
      { label: "Phase 0 engineering project resources", href: "/resources/phase-0/" },
      { label: "When do you need a structural engineer?", href: "/resources/structural/when-do-you-need-a-structural-engineer/" },
      { label: "Engineering answers library", href: "/answers/" },
      { label: "Engineering for architects", href: "/for-architects/" },
      { label: "Request an estimate", href: "/estimate/" },
    ],
    sections: [
      { heading: "Start with a shared scope", paragraphs: [
        "Before I price or schedule engineering, I want to understand the building type, project phase, jurisdiction, disciplines involved, and the decisions your team has already made. A short scope narrative plus the latest drawings is often more useful than a generic square-footage assumption.",
        `Use the ${link("/resources/phase-0/", "Phase 0 engineering resources")} to organize knowns, open decisions, and source documents. For broader orientation, the ${link("/answers/", "engineering answers library")} covers common structural, MEP, civil, and permitting questions.`,
      ], bullets: ["Name the deliverable and review milestone", "Mark existing conditions that still need verification", "Record who owns unresolved design decisions"] },
      { heading: "Coordinate the handoff", paragraphs: [
        "I look for interfaces: ceiling zones, shafts, equipment clearances, structure-to-envelope details, site utilities, and energy or accessibility documentation. Early interface notes reduce the chance that a late engineering change quietly becomes an architectural redesign.",
        `See how Apex Grid supports ${link("/for-architects/", "architects")} and send the project context through the ${link("/estimate/", "estimate request")} when you are ready for a scoped conversation.`,
      ] },
    ],
    faqs: [
      { question: "What should an architect send for an initial engineering review?", answer: "Send the current drawings, project address and jurisdiction, building use, proposed scope, schedule, known existing-condition information, and any owner or authority comments already received. I will identify gaps rather than assume them." },
      { question: "Can Apex Grid work from schematic design drawings?", answer: "Yes, when the requested scope and design decisions are clear enough to define the next deliverable. Early work is scoped to the information available and may identify field verification or later design inputs." },
      { question: "Does an engineering review replace the architect's coordination role?", answer: "No. I coordinate the engineering scope and interfaces assigned to Apex Grid; the architect, owner, contractor, and other consultants retain their respective project responsibilities." },
      { question: "Who controls the permit approval decision?", answer: "The authority having jurisdiction controls its requirements, interpretation, review, and approval decision. Engineering documents are prepared for the agreed scope and applicable project information without promising a particular outcome." },
      { question: "Where can I learn about common engineering questions?", answer: "Start with the Resources hub, the Phase 0 collection, and the Answers library. They provide general orientation; project-specific conclusions require review of the actual scope and records." },
    ],
  },
  {
    slug: "contractors",
    audience: "Contractors",
    title: "Engineering Resources for Contractors in the Field",
    description: "Field-ready engineering resources for contractors covering RFI decisions, existing conditions, coordination records, and permit responses from Apex Grid.",
    intro: "I know contractors need engineering responses that connect to the field, not abstract commentary. This hub focuses on documenting conditions, assigning decisions, and giving the design team a clean record to evaluate.",
    relatedResources: [
      { label: "Phase 0 engineering project resources", href: "/resources/phase-0/" },
      { label: "How to respond to plan-check comments", href: "/resources/permit/responding-to-city-comments/" },
      { label: "Engineering answers library", href: "/answers/" },
      { label: "Engineering for contractors", href: "/for-contractors/" },
      { label: "Request an estimate", href: "/estimate/" },
    ],
    sections: [
      { heading: "Turn field conditions into usable inputs", paragraphs: [
        "A useful RFI or site report states what was observed, where it was observed, what the issued documents show, and what decision is needed. Photos with orientation, dimensions, marked-up sheets, and a concise question let me evaluate the engineering issue without guessing.",
        `The ${link("/resources/phase-0/", "Phase 0 project resources")} offer repeatable ways to track evidence and assumptions. The ${link("/answers/", "Answers library")} is a starting point for general questions, not a substitute for a project response.`,
      ], bullets: ["Reference the sheet, detail, gridline, or area", "Separate observed facts from proposed fixes", "Identify schedule and sequencing constraints"] },
      { heading: "Keep responses coordinated", paragraphs: [
        "A structural change can affect MEP routing, fire protection, architecture, or civil work. I recommend routing the proposed solution through the responsible design team before installation and keeping superseded sketches out of the active field set.",
        `Review the support available for ${link("/for-contractors/", "contractors")} and use the ${link("/estimate/", "estimate CTA")} to describe an upcoming response, correction, or design-assist need.`,
      ] },
    ],
    faqs: [
      { question: "What makes a contractor RFI useful to an engineer?", answer: "Include the exact location, relevant issued sheets, the observed condition, clear photos and dimensions, the conflict or question, and the requested decision date. Distinguish what is verified from what is proposed." },
      { question: "Can Apex Grid approve a field change immediately?", answer: "A field change requires review of the actual condition, design intent, affected disciplines, and professional responsibility. I will not treat an informal message as approval or direct installation without the appropriate documented response." },
      { question: "Should a contractor send the full drawing set?", answer: "Send the current set and identify the relevant sheets, details, and revisions. Providing the complete context is helpful when interfaces may be affected, but a focused index makes review faster." },
      { question: "Does an engineering response guarantee inspection approval?", answer: "No. The inspector and authority having jurisdiction control inspection and approval. A response addresses the reviewed engineering question within its stated scope and does not promise a particular outcome." },
      { question: "How do I request help with a plan-check correction?", answer: "Send the complete comment notice, current and prior submittals, relevant calculations or drawings, project address, and your proposed response context through the estimate request. I will help define what engineering review is needed." },
    ],
  },
  {
    slug: "developers",
    audience: "Developers",
    title: "Engineering Resources for Developers Planning Projects",
    description: "Developer-focused engineering resources for feasibility, due diligence, scope decisions, and coordinated design planning from Apex Grid Engineering now.",
    intro: "I created this hub for development decisions that happen before a complete construction set exists. Good early engineering does not remove uncertainty; it identifies which uncertainties matter, who can resolve them, and when.",
    relatedResources: [
      { label: "Phase 0 engineering project resources", href: "/resources/phase-0/" },
      { label: "How much does structural engineering cost?", href: "/resources/structural/structural-engineering-cost/" },
      { label: "Engineering answers library", href: "/answers/" },
      { label: "Engineering for developers", href: "/for-developers/" },
      { label: "Request an estimate", href: "/estimate/" },
    ],
    sections: [
      { heading: "Use engineering to de-risk decisions", paragraphs: [
        "At feasibility, I separate confirmed site information from assumptions about existing structures, utilities, drainage, soils, occupancy, and jurisdictional review. That distinction helps an owner decide what investigation belongs in the next budget or milestone.",
        `The ${link("/resources/phase-0/", "Phase 0 collection")} provides a practical record structure, while the ${link("/answers/", "Answers library")} explains common engineering concepts in plain language.`,
      ], bullets: ["Define the decision the investigation must support", "Identify missing surveys, reports, and as-builts", "Keep jurisdictional questions with the authority that decides them"] },
      { heading: "Plan the design handoff", paragraphs: [
        "A useful engineering engagement defines deliverables, assumptions, coordination boundaries, review milestones, and the information the team must provide. That makes proposals comparable without inventing a universal rate or schedule.",
        `See the development perspective on ${link("/for-developers/", "Apex Grid for developers")} and use the ${link("/estimate/", "estimate request")} to share the site and program context.`,
      ] },
    ],
    faqs: [
      { question: "What engineering information helps at development feasibility?", answer: "Useful inputs include the site address, proposed use and scale, available survey and geotechnical records, existing drawings, known utility or drainage constraints, jurisdictional questions, and the decision the study must inform." },
      { question: "Can an early review confirm that a site is buildable?", answer: "An early review can identify constraints and investigation needs, but it cannot guarantee feasibility or entitlement. Buildability depends on the actual site, program, records, design, and decisions by applicable authorities." },
      { question: "How should a developer compare engineering proposals?", answer: "Compare the defined deliverables, assumptions, exclusions, coordination responsibilities, review milestones, site-visit needs, and requested inputs—not just a headline fee or a generic unit rate." },
      { question: "Does Apex Grid provide local permitting guarantees?", answer: "No. I can help organize engineering documentation and identify questions for the authority having jurisdiction, but the authority controls its current requirements, interpretation, review, and approval." },
      { question: "What should I include in an estimate request?", answer: "Include the project location, program, current documents, desired milestone, known constraints, requested disciplines, and a practical description of the decision or deliverable you need next." },
    ],
  },
  {
    slug: "property-managers",
    audience: "Property Managers",
    title: "Engineering Resources for Property Managers and Owners",
    description: "Practical engineering resources for property managers handling repairs, tenant improvements, records, and existing-building decisions with Apex Grid today.",
    intro: "I built this hub for the operational side of existing buildings: a reported condition, a tenant request, a repair decision, or a capital improvement that needs a defensible next step. Clear records help me distinguish urgent evidence from assumptions.",
    relatedResources: [
      { label: "Phase 0 engineering project resources", href: "/resources/phase-0/" },
      { label: "When do you need a structural engineer?", href: "/resources/structural/when-do-you-need-a-structural-engineer/" },
      { label: "Engineering answers library", href: "/answers/" },
      { label: "Engineering for property managers", href: "/for-property-managers/" },
      { label: "Request an estimate", href: "/estimate/" },
    ],
    sections: [
      { heading: "Document the building before the decision", paragraphs: [
        "For an existing property, send the address, affected area, photos, dates, observed symptoms, available plans, maintenance history, and the question the owner needs answered. If there is a safety concern, follow your established emergency and facility procedures first.",
        `The ${link("/resources/phase-0/", "Phase 0 resources")} can help organize an existing-condition record. For general orientation, review the ${link("/answers/", "Answers library")} and the existing-building topics in Resources.`,
      ], bullets: ["Record when and where the condition was observed", "Preserve reports, photos, and prior repair records", "Separate temporary controls from permanent design work"] },
      { heading: "Coordinate tenant and capital work", paragraphs: [
        "Tenant improvements often touch structure, electrical capacity, HVAC, plumbing, life safety, accessibility, and civil interfaces. I recommend defining the affected systems and review milestone before promising a tenant a particular layout, date, or approval.",
        `Learn about ${link("/for-property-managers/", "Apex Grid for property managers")} and send the building context through the ${link("/estimate/", "estimate CTA")} for a scoped review.`,
      ] },
    ],
    faqs: [
      { question: "What records should a property manager gather first?", answer: "Gather the property address, affected location, dated photos, observed symptoms, maintenance or incident history, available as-builts, prior reports, tenant scope, and any notices or comments from the authority or insurer." },
      { question: "Can a photo review replace a site visit?", answer: "Sometimes photos and records are enough for an initial triage, but uncertain or concealed existing conditions may require field verification. I will identify what evidence is needed for the requested conclusion." },
      { question: "Can a property manager promise a tenant that work will be approved?", answer: "No. Approval depends on the final scope, documents, responsible professionals, and the authority having jurisdiction. Keep tenant commitments conditional until those reviews are complete." },
      { question: "How should urgent building concerns be handled?", answer: "Follow the property's emergency, safety, and facility procedures first, including contacting appropriate emergency or maintenance personnel. Engineering review supports decisions but is not an emergency-response replacement." },
      { question: "What does an estimate request need for tenant improvement work?", answer: "Share the building address, tenant use, proposed layout or scope, available plans, affected systems, desired milestone, and known landlord or jurisdictional requirements. I can then help define the engineering scope." },
    ],
  },
];

export function audienceResourceHubPage(page: AudienceResourceHub): string {
  const url = `/resources/${page.slug}/`;
  const crumbs = [{ name: "Home", href: "/" }, { name: "Resources", href: "/resources/" }, { name: page.audience }];
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: page.faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) };
  const body = `
${crumbs.map((crumb, i) => i === crumbs.length - 1 ? `<span>${crumb.name}</span>` : `<a href="${crumb.href}">${crumb.name}</a>`).join(" / ")}
<section class="hero"><div class="container"><p class="kicker">${page.audience} resource hub</p><h1>${page.audience} Engineering Resources</h1><p class="lede">${page.intro}</p><p class="byline">By ${AUDIENCE_RESOURCE_AUTHOR}</p></div></section>
${page.sections.map((section) => `<section class="block"><div class="container"><h2>${section.heading}</h2>${section.paragraphs.map((p) => `<p>${p}</p>`).join("")}${section.bullets ? `<ul>${section.bullets.map((b) => `<li>${b}</li>`).join("")}</ul>` : ""}</div></section>`).join("")}
<section class="block recommended-resources"><div class="container"><h2>Recommended resources</h2><ul>${page.relatedResources.map((resource) => `<li><a href="${resource.href}">${resource.label}</a></li>`).join("")}</ul></div></section>
<section class="block faq"><div class="container"><h2>Frequently Asked Questions</h2>${page.faqs.map((faq) => `<details><summary>${faq.question}</summary><div class="a">${faq.answer}</div></details>`).join("")}</div></section>
<section class="ctaband"><div class="container"><h2>Need a scoped engineering conversation?</h2><p>Share the project context and I will help identify the next useful engineering step.</p><a class="cta" href="/estimate/">Request an Estimate</a></div></section>`;
  return htmlShell({
    title: page.title,
    description: page.description,
    canonical: `${SITE}${url}`,
    schemaJson: [
      faqSchema,
      { "@context": "https://schema.org", "@type": "CollectionPage", name: page.title, description: page.description, url: `${SITE}${url}`, isPartOf: { "@type": "WebSite", name: "Apex Grid Engineering", url: SITE } },
      { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: crumbs.map((crumb, i) => ({ "@type": "ListItem", position: i + 1, name: crumb.name, ...(crumb.href ? { item: `${SITE}${crumb.href}` } : {}) })) },
    ],
    body,
  });
}