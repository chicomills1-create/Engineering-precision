/** Standalone static pages: engineering-reports and HTML sitemap. */

export interface StaticPageDef {
  slug: string;
  dir: string; // output directory relative to public/
  title: string;
  description: string;
  h1: string;
  kicker: string;
  lede: string;
  sections: { heading: string; content: string; bullets?: string[] }[];
  ctaHeading: string;
  ctaText: string;
  sitemapCategory?: "core" | "solutions";
  schemaJson?: Record<string, unknown>[];
  showFounderByline?: boolean;
  /** Optional raw-HTML support paragraph rendered after the sections (added 2026-11-03, own-name carrier cure). */
  supportHtml?: string;
  relatedLinks?: { href: string; label: string }[];
  ctaHref?: string;
  /** Optional card groups rendered after the sections (companies hub). */
  groups?: {
    heading: string;
    intro?: string;
    entries: { name: string; href: string; blurb: string; note?: string }[];
  }[];
}

export const STATIC_STANDALONE_PAGES: StaticPageDef[] = [
  {
    slug: "procurement",
    dir: "procurement",
    sitemapCategory: "core",
    title: "Procurement Vendor Information | Apex Grid Engineering",
    description:
      "Vendor information for procurement teams evaluating Apex Grid Engineering, with capability, qualification, coverage, teaming, and project-intake resources.",
    h1: "Procurement Vendor Information",
    kicker: "Vendor Qualification Resources",
    lede:
      "This page gives procurement teams one place to evaluate Apex Grid Engineering, locate current qualification resources, and identify the project information needed for a scoped response.",
    showFounderByline: true,
    sections: [
      {
        heading: "My Founder Perspective",
        content:
          "I want procurement teams to be able to separate verified company information from assumptions. This page points to available records and resources for capability review, licensing and service coverage, public-sector coordination, and project intake. Project-specific availability, authorization, and discipline requirements still need confirmation before award.",
      },
      {
        heading: "Start With the Current Capabilities Record",
        content:
          "Use the Apex Grid capabilities page and downloadable capability statement as the starting point for company qualifications, service categories, and procurement review. Those resources should be checked with the solicitation and any project-specific qualification requirements rather than treated as a substitute for them.",
        bullets: [
          "Company capability and service overview",
          "Downloadable capability statement",
          "Engineering, architecture, and construction-delivery resources",
          "Public-sector and teaming information",
        ],
      },
      {
        heading: "Confirm Coverage for the Specific Project",
        content:
          "Licensing and service coverage depend on the project location, discipline, scope, responsible professional, and authority having jurisdiction. Procurement teams should use the current coverage page as an initial reference and request project-specific confirmation before relying on a qualification statement.",
        bullets: [
          "Project state and local jurisdiction",
          "Required professional disciplines",
          "Anticipated permit or agency review path",
          "Firm and responsible-professional requirements",
        ],
      },
      {
        heading: "Information That Supports a Responsive Review",
        content:
          "A clear procurement request helps us determine whether the opportunity fits our services and whether the requested schedule and deliverables can be supported. The most useful package identifies the buyer, project, location, scope, disciplines, due date, selection process, and available technical documents.",
        bullets: [
          "Solicitation or reference number and issuing organization",
          "Project name, address, and jurisdiction",
          "Requested disciplines, deliverables, and procurement method",
          "Submission deadline, anticipated schedule, and selection criteria",
          "Plans, specifications, exhibits, addenda, or existing reports",
          "Required forms, certifications, insurance, or contract terms",
        ],
      },
      {
        heading: "Teaming and Subconsultant Evaluation",
        content:
          "For teaming requests, identify the prime contractor or lead consultant, the exact scope being considered for Apex Grid, the project location, the proposal deadline, and any mandatory qualification criteria. We evaluate each opportunity against available staff, relevant disciplines, schedule, contracting requirements, and project-specific authorization.",
      },
      {
        heading: "Request Project-Specific Vendor Information",
        content:
          "If the solicitation requires information not contained in the public resources linked here, send the requirement with the project details. We will confirm what can be provided for that opportunity rather than presenting a general company statement as project-specific proof.",
      },
    ],
    relatedLinks: [
      { href: "/procurement/submit-rfp-rfq/", label: "Submit an RFP or RFQ package" },
      { href: "/capabilities", label: "Review Apex Grid capabilities" },
      { href: "/capabilities-statement.html", label: "Open the capabilities statement" },
      { href: "/licensing-service-coverage/", label: "Check licensing and service coverage" },
      { href: "/government/", label: "Review government project support" },
      { href: "/government-contracting/", label: "Explore government contracting services" },
      { href: "/military", label: "Read about veteran-led service" },
    ],
    ctaHeading: "Send the Project Requirements",
    ctaText:
      "Share the solicitation, scope, location, disciplines, schedule, and available documents so Apex Grid can evaluate the opportunity and prepare a project-specific response.",
    ctaHref: "/procurement/submit-rfp-rfq/",
    schemaJson: [
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": "https://apexgrideng.com/procurement/#faq",
        mainEntity: [
          {
            "@type": "Question",
            name: "Where should procurement teams start when evaluating Apex Grid?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Start with the Apex Grid capabilities page and downloadable capability statement, then compare those resources with the solicitation’s project-specific qualification requirements.",
            },
          },
          {
            "@type": "Question",
            name: "How should licensing and service coverage be confirmed?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Confirm coverage for the project location, discipline, scope, responsible professional, and authority having jurisdiction before award. The public coverage page is an initial reference, not project-specific authorization.",
            },
          },
          {
            "@type": "Question",
            name: "What information helps Apex Grid review a procurement opportunity?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Provide the issuing organization, solicitation number, project location, requested disciplines and deliverables, submission deadline, schedule, selection criteria, and available plans, specifications, exhibits, or addenda.",
            },
          },
          {
            "@type": "Question",
            name: "What should a teaming request include?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Identify the prime contractor or lead consultant, the proposed Apex Grid scope, project location, proposal deadline, schedule, and mandatory qualification or contracting requirements.",
            },
          },
          {
            "@type": "Question",
            name: "Can procurement teams request project-specific vendor documents?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Send the solicitation requirement with the project details so Apex Grid can confirm which current documents can be provided for that specific opportunity.",
            },
          },
        ],
      },
    ],
  },
  {
    slug: "jeremy-mills",
    dir: "jeremy-mills",
    sitemapCategory: "core",
    title: "Jeremy “Chico” Mills | Apex Grid Engineering CEO",
    description:
      "Jeremy “Chico” Mills is Founder and CEO of Apex Grid Engineering, a U.S. Air Force veteran, and Founder and Senior Pastor of 16:3 Faith.",
    h1: "Jeremy “Chico” Mills",
    kicker: "Founder & CEO",
    lede:
      "Jeremy “Chico” Mills is the Founder and CEO of Apex Grid Engineering. He also serves as Founder and Senior Pastor of 16:3 Faith.",
    sections: [
      {
        heading: "Who Is Jeremy Mills?",
        content:
          "Jeremy Mills is the Founder and CEO of Apex Grid Engineering. He leads the firm’s growth, client service, and mission-driven operating culture as it delivers integrated engineering, architecture, and construction support where project-specific credentials and authorization are verified.",
      },
      {
        heading: "Military Service and Leadership",
        content:
          "Jeremy served in the United States Air Force as an Aerospace Medical Service Journeyman with the 60th Medical Operations Squadron and deployed to Iraq in support of Operation Iraqi Freedom. He applies that experience through disciplined processes, documented accountability, and a mission-first standard for client work.",
      },
      {
        heading: "Pastor Jeremy Mills",
        content:
          "Outside Apex Grid, Jeremy is the Founder and Senior Pastor of 16:3 Faith, a separate faith-centered community focused on Scripture, prayer, and daily discipleship. He is also known publicly as Pastor Jeremy Mills and Pastor Jeremy “Chico” Mills.",
      },
      {
        heading: "Building a National Platform",
        content:
          "Jeremy’s stated direction for Apex Grid is to build a nationally recognized, founder-led platform that can coordinate engineering, architecture, and construction delivery at scale. The company’s public claims remain tied to documented capabilities, licenses, staff, and completed work.",
      },
      {
        heading: "Is Jeremy “Chico” Mills the Same Person as Jeremy Mills?",
        content:
          "Yes. Jeremy “Chico” Mills and Jeremy Mills refer to the same person. Apex Grid’s official founder profile uses Jeremy “Chico” Mills so search engines, AI answer systems, clients, teaming partners, and procurement professionals can connect both names to one verified profile.",
      },
      {
        heading: "What Is Jeremy Mills’ Role at Apex Grid?",
        content:
          "Jeremy Mills is the Founder and Chief Executive Officer of Apex Grid Engineering. Apex Grid is the professional-services firm he leads; the company’s engineering, architecture, and construction capabilities are documented separately through its service, team, capabilities, and project pages.",
      },
    ],
    ctaHeading: "Work With Apex Grid Engineering",
    ctaText:
      "Connect with Apex Grid about engineering, architecture, construction delivery, teaming, or public-sector opportunities.",
    schemaJson: [
      {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        "@id": "https://apexgrideng.com/jeremy-mills/#profile",
        url: "https://apexgrideng.com/jeremy-mills/",
        name: "Jeremy “Chico” Mills",
        mainEntity: { "@id": "https://apexgrideng.com/jeremy-mills/#person" },
      },
      {
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": "https://apexgrideng.com/jeremy-mills/#person",
        name: "Jeremy Mills",
        alternateName: ["Jeremy “Chico” Mills", "Pastor Jeremy Mills", "Pastor Jeremy “Chico” Mills"],
        url: "https://apexgrideng.com/jeremy-mills/",
        sameAs: ["https://www.linkedin.com/in/chicomills", "https://www.crunchbase.com/person/jeremy-mills-6be4"],
        mainEntityOfPage: { "@id": "https://apexgrideng.com/jeremy-mills/#profile" },
        jobTitle: "Founder and Chief Executive Officer",
        description:
          "Founder and CEO of Apex Grid Engineering, U.S. Air Force veteran, and Founder and Senior Pastor of 16:3 Faith.",
        worksFor: { "@id": "https://apexgrideng.com/#business" },
        affiliation: {
          "@type": "Organization",
          name: "16:3 Faith",
          url: "https://163faith.com",
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": "https://apexgrideng.com/jeremy-mills/#faq",
        mainEntity: [
          {
            "@type": "Question",
            name: "Is Jeremy “Chico” Mills the same person as Jeremy Mills?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Jeremy “Chico” Mills and Jeremy Mills refer to the same person. Jeremy “Chico” Mills is the Founder and CEO of Apex Grid Engineering.",
            },
          },
          {
            "@type": "Question",
            name: "What is Jeremy Mills' role at Apex Grid?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Jeremy Mills is the Founder and Chief Executive Officer of Apex Grid Engineering.",
            },
          },
          {
            "@type": "Question",
            name: "Who founded Apex Grid Engineering?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Jeremy “Chico” Mills founded Apex Grid Engineering and serves as its Chief Executive Officer.",
            },
          },
        ],
      },
    ],
  },
  {
    slug: "engineering-reports",
    dir: "engineering-reports",
    title: "Professional Engineering Reports | Apex Grid Engineering",
    description:
      "PE-authored engineering reports for existing buildings, structural assessments, condition evaluations, geotechnical investigations, and permit-required documentation.",
    h1: "Professional Engineering Reports",
    kicker: "Engineering Documentation",
    lede:
      "Apex Grid produces formal engineering reports — signed and sealed by licensed professional engineers — for existing building evaluations, structural assessments, geotechnical investigations, and permit-required documentation.",
    sections: [
      {
        heading: "Structural Condition Reports",
        content:
          "Structural condition reports document the observed state of a building's structural systems — framing, foundations, connections, and load-bearing elements — and identify deficiencies, damage, or items requiring repair or further investigation.",
        bullets: [
          "Existing building structural assessments",
          "Framing and foundation condition documentation",
          "Crack and damage evaluation reports",
          "Settlement and deflection assessment",
          "Capital improvement prioritization reports",
          "Pre-purchase due diligence structural reports",
        ],
      },
      {
        heading: "Assessment and Evaluation Reports",
        content:
          "Assessment reports are commonly required by building departments, lenders, property managers, and development teams to document existing conditions before renovation, sale, or occupancy change.",
        bullets: [
          "Existing building condition assessments",
          "Seismic vulnerability assessments",
          "Load capacity evaluation reports",
          "Change-of-occupancy structural evaluations",
          "Roof capacity evaluation for new equipment",
          "Field verification reports",
        ],
      },
      {
        heading: "Geotechnical Reports",
        content:
          "Geotechnical engineering reports document subsurface conditions, soil bearing capacity, and foundation recommendations based on soil borings, laboratory testing, and site reconnaissance.",
        bullets: [
          "Geotechnical investigation reports",
          "Foundation recommendation reports",
          "Pavement design geotechnical reports",
          "Retaining wall geotechnical parameters",
          "Earthwork and compaction recommendations",
          "Seismic site classification reports",
        ],
      },
      {
        heading: "Permit-Required Engineering Reports",
        content:
          "Some jurisdictions require a separate engineering report — in addition to drawings and calculations — before issuing a building permit. Apex Grid produces these as standalone documents or as part of a full permit package.",
        bullets: [
          "City-required structural reports for remodels",
          "Special inspection programs",
          "Structural observation reports",
          "Post-repair engineering certifications",
          "Deferred submittal engineering documentation",
        ],
      },
      {
        heading: "What We Need to Start",
        content:
          "Most engineering reports begin with existing drawings or field information. When drawings are unavailable, we work with contractor photos, dimensions, and site reconnaissance to document existing conditions.",
        bullets: [
          "Existing architectural or structural drawings (if available)",
          "Contractor or owner photographs of the area in question",
          "Field dimensions and measurements",
          "Description of the concern or purpose of the report",
          "Building address and jurisdiction",
        ],
      },
    ],
    ctaHeading: "Request an Engineering Report",
    ctaText:
      "Send us your project details and we'll provide a fee proposal within one business day. Most engineering reports are completed within 5–10 business days of receiving the required information.",
  },
  {
    slug: "companies",
    dir: "companies",
    sitemapCategory: "core",
    title: "Our Companies | Apex Grid Engineering",
    description:
      "The family of companies founded by Jeremy Mills: the operating brands of Apex Grid Engineering PLLC — engineering, PE stamping, and software services — plus affiliated companies under common founder ownership.",
    h1: "Our Companies",
    kicker: "Apex Grid Engineering PLLC",
    lede:
      "One founder, one operating family. Apex Grid Engineering PLLC is the flagship engineering firm and the parent of the operating brands below; alongside it stand the affiliated companies Jeremy Mills founded under their own names.",
    showFounderByline: true,
    sections: [
      {
        heading: "How the Family Is Organized",
        content:
          "Apex Grid Engineering PLLC operates its service brands directly: DraftSignal Digital, Seal Anvil, Stamp Forge, DueFluent, SpecReady, CatalogIQ, RuleCurrent, and RingAnvil trade under the flagship. Torch Engineering, Engides, 163 Faith, Kairobot, and Paired are separate affiliated companies under the same founder ownership — each runs under its own name, and each is linked below so clients, partners, and search systems can connect the family accurately.",
      },
    ],
    supportHtml:
      'Learn about the network that powers <a href="/">the Apex Grid Engineering platform</a>.',
    groups: [
      {
        heading: "Operating Brands of Apex Grid Engineering PLLC",
        intro:
          "These brands trade under Apex Grid Engineering PLLC, the flagship engineering firm founded by Jeremy Mills.",
        entries: [
          {
            name: "DraftSignal Digital",
            href: "https://draftsignaldigital.com/",
            blurb: "Search visibility and SEO/AEO programs for engineering firms.",
            note: "SiteWatch, DraftSignal's website-monitoring service, is a DraftSignal product line.",
          },
          {
            name: "Seal Anvil",
            href: "https://sealanvil.com/",
            blurb: "PE stamp and seal service for engineering plans — send drawings, get them stamped.",
          },
          {
            name: "Stamp Forge",
            href: "https://stampforgeeng.com/",
            blurb: "PE stamp guides and answers — how sealing works, state by state.",
          },
          {
            name: "DueFluent",
            href: "https://duefluent.com/",
            blurb: "Invoice follow-up subscriptions for small businesses — your invoices, our follow-through.",
          },
          {
            name: "SpecReady",
            href: "https://specreadyhq.com/",
            blurb: "Capability statements and SOQ packages prepared for firms pursuing public and private work.",
          },
          {
            name: "CatalogIQ",
            href: "https://catalogiqhq.com/",
            blurb: "E-commerce catalog software and product-listing services.",
          },
          {
            name: "RuleCurrent",
            href: "https://rulecurrent.com/",
            blurb: "Permit and code-currency services that keep project requirements current.",
          },
          {
            name: "RingAnvil",
            href: "https://ringanvil.com/",
            blurb: "AI call answering and lead follow-up for trades businesses.",
          },
        ],
      },
      {
        heading: "Affiliated Companies",
        intro:
          "Separate companies founded by Jeremy Mills and operated alongside the flagship — each under its own name, sharing one founder.",
        entries: [
          {
            name: "Torch Engineering",
            href: "https://torchengineering.com/",
            blurb: "Engineering firm — structural, MEP, and civil design with PE stamping.",
          },
          {
            name: "Engides",
            href: "https://engides.com/",
            blurb: "Engineering firm — agile MEP, structural, and civil design.",
          },
          {
            name: "163 Faith",
            href: "https://163faith.com/",
            blurb: "Faith-centered community and music platform.",
          },
          {
            name: "Kairobot",
            href: "https://kairobot.ai/",
            blurb: "AI search engine.",
          },
          {
            name: "Paired",
            href: "https://pairedart.com/",
            blurb: "Artist marketplace connecting artists and buyers of original art.",
          },
        ],
      },
    ],
    relatedLinks: [
      { href: "/about", label: "About Apex Grid Engineering" },
      { href: "/jeremy-mills/", label: "Jeremy Mills — Founder & CEO" },
      { href: "/team", label: "Meet the Team" },
    ],
    ctaHeading: "Work With the Flagship",
    ctaText:
      "Engineering, architecture, and construction-delivery work starts with Apex Grid Engineering. Send the project and we will route it to the right team.",
    schemaJson: [
      {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Organization",
            "@id": "https://apexgrideng.com/#business",
            name: "Apex Grid Engineering",
            legalName: "Apex Grid Engineering PLLC",
            url: "https://apexgrideng.com/",
            founder: { "@id": "https://apexgrideng.com/jeremy-mills/#person" },
            subOrganization: [
              {
                "@type": "Organization",
                name: "DraftSignal Digital",
                url: "https://draftsignaldigital.com/",
                description: "Search visibility and SEO/AEO programs for engineering firms.",
              },
              {
                "@type": "Organization",
                name: "Seal Anvil",
                url: "https://sealanvil.com/",
                description: "PE stamp and seal service for engineering plans.",
              },
              {
                "@type": "Organization",
                name: "Stamp Forge",
                url: "https://stampforgeeng.com/",
                description: "PE stamp guides and answers — how sealing works, state by state.",
              },
              {
                "@type": "Organization",
                name: "DueFluent",
                url: "https://duefluent.com/",
                description: "Invoice follow-up subscriptions for small businesses.",
              },
              {
                "@type": "Organization",
                name: "SpecReady",
                url: "https://specreadyhq.com/",
                description: "Capability statements and SOQ packages for firms pursuing public and private work.",
              },
              {
                "@type": "Organization",
                name: "CatalogIQ",
                url: "https://catalogiqhq.com/",
                description: "E-commerce catalog software and product-listing services.",
              },
              {
                "@type": "Organization",
                name: "RuleCurrent",
                url: "https://rulecurrent.com/",
                description: "Permit and code-currency services that keep project requirements current.",
              },
              {
                "@type": "Organization",
                name: "RingAnvil",
                url: "https://ringanvil.com/",
                description: "AI call answering and lead follow-up for trades businesses.",
              },
            ],
          },
          {
            "@type": "Person",
            "@id": "https://apexgrideng.com/jeremy-mills/#person",
            name: "Jeremy Mills",
            alternateName: "Jeremy “Chico” Mills",
            jobTitle: "Founder & CEO",
            url: "https://apexgrideng.com/jeremy-mills/",
            sameAs: ["https://www.linkedin.com/in/chicomills", "https://www.crunchbase.com/person/jeremy-mills-6be4"],
            worksFor: { "@id": "https://apexgrideng.com/#business" },
            founderOf: [
              { "@id": "https://apexgrideng.com/#business" },
              { "@type": "Organization", name: "Torch Engineering", url: "https://torchengineering.com/" },
              { "@type": "Organization", name: "Engides", url: "https://engides.com/" },
              { "@type": "Organization", name: "163 Faith", url: "https://163faith.com/" },
              { "@type": "Organization", name: "Kairobot", url: "https://kairobot.ai/" },
              { "@type": "Organization", name: "Paired", url: "https://pairedart.com/" },
            ],
          },
        ],
      },
    ],
  },
];
