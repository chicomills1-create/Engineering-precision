/** Construction partner profiles sourced from partner-provided qualifications packages. */

export interface PartnerPage {
  slug: string;
  title: string;
  description: string;
  h1: string;
  kicker: string;
  lede: string;
  companyName: string;
  location: string;
  website: string;
  phone: string;
  highlights: { value: string; label: string }[];
  services: string[];
  sectors: string[];
  leadership: { name: string; role: string; bio: string }[];
  experience: {
    title: string;
    detail: string;
  }[];
  licenses: string[];
  certifications: string[];
}

export const PARTNER_PAGES: PartnerPage[] = [
  {
    slug: "phoenix-construction-management",
    title: "Phoenix Construction & Management | Apex Grid Engineering Partner",
    description:
      "Meet Phoenix Construction & Management, Apex Grid Engineering's construction delivery partner for commercial tenant improvements, banking facilities, rollouts, and building renovations.",
    h1: "Phoenix Construction & Management",
    kicker: "Apex Grid Construction Partner · PCM",
    lede:
      "When a project needs both coordinated engineering and experienced construction delivery, Apex Grid works with Phoenix Construction & Management (PCM) — a California-based general contractor and construction-management firm with deep commercial, banking, and tenant-improvement experience.",
    companyName: "Phoenix Construction & Management, Inc.",
    location: "Los Angeles, California",
    website: "https://www.phoenixcm.net",
    phone: "310-414-1800",
    highlights: [
      { value: "24+", label: "Years serving California" },
      { value: "105+", label: "Bank branches renovated" },
      { value: "$50M+", label: "Banking work in six years" },
      { value: "WBE", label: "Women Business Enterprise" },
    ],
    services: [
      "General contracting",
      "Construction management",
      "Program management and national rollouts",
      "Budget development and cost estimating",
      "Schedule development and monitoring",
      "Plan, design, and constructability reviews",
      "On-site inspection and reporting",
    ],
    sectors: [
      "Banking and financial services",
      "Commercial tenant improvements",
      "Building owners and property management",
      "Real estate development",
      "Government",
      "Insurance",
      "Entertainment",
      "Law firms",
    ],
    leadership: [
      {
        name: "Molly Zbojniewicz",
        role: "Founding Partner · Client Relations",
        bio:
          "Molly brings 30 years of experience in commercial construction and client leadership, including senior roles with McClier (AECOM), Koll Construction, and Tishman Construction. She leads client relationships, pre-construction coordination, contract administration, and consultant coordination.",
      },
      {
        name: "Rick Coleman, AIA, LEED",
        role: "Partner · Pre-Construction Services",
        bio:
          "Rick is a licensed architect with more than 25 years in architecture, construction management, and real estate development. He leads pre-construction planning, budgeting, scheduling, approvals, and project management.",
      },
      {
        name: "Tom Bell",
        role: "Project Executive",
        bio:
          "Tom brings extensive tenant-improvement and general-construction experience for financial institutions and retail environments. He focuses on project management, schedule and budget oversight, and quality control.",
      },
      {
        name: "Doug Brown",
        role: "Project Executive",
        bio:
          "Doug brings more than 27 years of commercial construction experience, specializing in tenant improvements and commercial renovations with project budgets up to $21 million. He leads execution, field coordination, budgeting, and client relations.",
      },
    ],
    experience: [
      {
        title: "US Bank Branch Modernizations",
        detail:
          "97 locations across Northern and Southern California, with occupied branches running simultaneously and coordination across multiple landlords.",
      },
      {
        title: "US Bank Network Equipment Room Upgrades",
        detail:
          "32 locations across California, including permitting in multiple municipalities, site-survey support, design coordination, and bank-vendor coordination.",
      },
      {
        title: "Union Bank / U.S. Bank Branch Decommissions",
        detail:
          "A 21-site Southern California program with simultaneous project execution, site-specific requirements, and coordination of bank vendors.",
      },
      {
        title: "Commercial Tenant Improvements",
        detail:
          "Representative work includes the Los Angeles County Ballot Processing Center, JLL's Los Angeles corporate headquarters, Platinum Equity's corporate headquarters, and Los Angeles Athletic Club renovations.",
      },
      {
        title: "Building Renovations and Capital Improvements",
        detail:
          "Representative work includes lobby renovations, exterior terrace repositioning, clubhouse and pool-deck upgrades, and improvements to occupied commercial properties.",
      },
    ],
    licenses: [
      "California contractor license 815136",
      "Arizona contractor license ROC 337911",
      "Washington contractor license PHOENCI783J2",
    ],
    certifications: [
      "Women Business Enterprise (WBE)",
      "California Department of Transportation WBE firm ID 35009",
    ],
  },
];