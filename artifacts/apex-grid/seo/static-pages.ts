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
}

export const STATIC_STANDALONE_PAGES: StaticPageDef[] = [
  {
    slug: "jeremy-mills",
    dir: "jeremy-mills",
    sitemapCategory: "core",
    title: "Jeremy Mills (Chico Mills) | Apex Grid Engineering CEO",
    description:
      "Jeremy “Chico” Mills is Founder and CEO of Apex Grid Engineering, a U.S. Air Force veteran, and Founder and Senior Pastor of 16:3 Faith.",
    h1: "Jeremy “Chico” Mills",
    kicker: "Founder & CEO",
    lede:
      "Jeremy Mills, also known as Chico Mills, leads Apex Grid Engineering and serves as Founder and Senior Pastor of 16:3 Faith.",
    sections: [
      {
        heading: "Who Is Jeremy Mills?",
        content:
          "Jeremy Mills is the Founder and CEO of Apex Grid Engineering. He leads the firm’s growth, client service, and mission-driven operating culture as it delivers integrated engineering, architecture, and construction support nationwide.",
      },
      {
        heading: "Military Service and Leadership",
        content:
          "Jeremy served in the United States Air Force as an Aerospace Medical Service Journeyman with the 60th Medical Operations Squadron and deployed to Iraq in support of Operation Iraqi Freedom. He applies that experience through disciplined processes, documented accountability, and a mission-first standard for client work.",
      },
      {
        heading: "Pastor Jeremy Mills",
        content:
          "Outside Apex Grid, Jeremy is the Founder and Senior Pastor of 16:3 Faith, a separate faith-centered community focused on Scripture, prayer, and daily discipleship. He is also known publicly as Pastor Jeremy Mills and Pastor Chico Mills.",
      },
      {
        heading: "Building a National Platform",
        content:
          "Jeremy’s stated direction for Apex Grid is to build a nationally recognized, founder-led platform that can coordinate engineering, architecture, and construction delivery at scale. The company’s public claims remain tied to documented capabilities, licenses, staff, and completed work.",
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
        name: "Jeremy Mills (Chico Mills)",
        mainEntity: { "@id": "https://apexgrideng.com/jeremy-mills/#person" },
      },
      {
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": "https://apexgrideng.com/jeremy-mills/#person",
        name: "Jeremy Mills",
        alternateName: ["Chico Mills", "Pastor Jeremy Mills", "Pastor Chico Mills"],
        url: "https://apexgrideng.com/jeremy-mills/",
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
];
