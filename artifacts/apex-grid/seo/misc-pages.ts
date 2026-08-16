/** Standalone static SEO pages — capabilities, government contracting, trust pages.
 *  Each renders as a single static HTML file at its canonical URL.
 */

export interface MiscPage {
  slug: string;           // URL: /{slug}/
  title: string;
  description: string;
  h1: string;
  kicker: string;
  lede: string;
  sections: { heading: string; content: string; bullets?: string[] }[];
  ctaHeading: string;
  ctaText: string;
}

export const MISC_PAGES: MiscPage[] = [
  {
    slug: "capabilities",
    title: "Engineering Capabilities | Apex Grid Engineering",
    description: "Apex Grid Engineering capabilities statement — structural, MEP, civil, and geotechnical engineering for commercial, industrial, multifamily, and government projects. Licensed in 49 states.",
    h1: "Engineering Capabilities",
    kicker: "Capabilities",
    lede: "Apex Grid Engineering is a multi-discipline engineering firm providing structural, mechanical, electrical, plumbing, civil, and geotechnical engineering for commercial, industrial, multifamily, and government clients. We are licensed in 49 states, led by a Service-Disabled Veteran-Owned Small Business (SDVOSB), and staffed by 20+ licensed professional engineers across all disciplines.",
    sections: [
      {
        heading: "Core Engineering Disciplines",
        content: "Apex Grid delivers engineering across six technical disciplines — all under one contract, coordinated by a single project team.",
        bullets: [
          "Structural Engineering — new construction, modifications, seismic, foundations, inspections",
          "Mechanical Engineering — HVAC, kitchen exhaust, make-up air, industrial ventilation",
          "Electrical Engineering — service design, one-lines, load studies, solar, EV, emergency power",
          "Plumbing Engineering — domestic water, sanitary, gas, grease interceptors, medical gas",
          "Civil Engineering — site grading, drainage, parking, utilities, stormwater, ADA",
          "Geotechnical Engineering — soil investigations, foundation recommendations, pavement design",
        ],
      },
      {
        heading: "Firm Overview",
        content: "Apex Grid Engineering is headquartered in Queen Creek, Arizona.",
        bullets: [
          "Licensed in 49 states — one firm for multi-market clients",
          "15+ years of combined engineering experience",
          "20+ licensed professional engineers on staff",
          "Service-Disabled Veteran-Owned Small Business (SDVOSB) — eligible for federal set-asides",
          "Registered with SAM.gov — UEI and CAGE code on file",
          "Experience with UFC, GSA, FHWA, and federal engineering documentation standards",
          "Multi-discipline coordination under one contract — no separate consultant management",
          "National project delivery — we work remotely with architects, contractors, and owners nationwide",
        ],
      },
      {
        heading: "Project Types Served",
        content: "We engineer across a broad range of building and site project types.",
        bullets: [
          "Commercial — office, retail, restaurant, medical, mixed-use",
          "Industrial — manufacturing, warehouse, distribution, processing",
          "Multifamily — apartments, condominiums, mixed-use residential",
          "Government and Military — federal facilities, VA, DoD, installations",
          "Institutional — schools, universities, healthcare facilities",
          "Infrastructure — parking structures, site development, utilities",
          "New construction, tenant improvements, renovations, and existing-building modifications",
          "Permit engineering, plan check response, and construction-phase support",
        ],
      },
      {
        heading: "NAICS Codes",
        content: "Apex Grid Engineering performs work under the following NAICS codes.",
        bullets: [
          "541330 — Engineering Services",
          "541310 — Architectural Services (engineering coordination)",
          "237310 — Highway, Street, and Bridge Construction (civil infrastructure)",
          "237990 — Other Heavy and Civil Engineering Construction",
          "236220 — Commercial and Institutional Building Construction (engineering support)",
        ],
      },
      {
        heading: "Quality and Delivery Standards",
        content: "Our engineering process is built around first-cycle permit approval and professional accountability.",
        bullets: [
          "PE-stamped drawings from engineers licensed in the project state",
          "Internal QA/QC review before every permit submittal",
          "Permit packages prepared for first-cycle approval — complete, organized, and code-cited",
          "Plan check comment response included in scope of work",
          "Responsive communication — project updates and RFI responses within one business day",
          "Expedited delivery available for time-sensitive projects",
        ],
      },
      {
        heading: "Past Performance — Project Categories",
        content: "Apex Grid has provided engineering services on the following project categories.",
        bullets: [
          "Commercial tenant improvements — retail, restaurant, office, medical",
          "Industrial facility engineering — manufacturing and warehouse",
          "Multifamily new construction and renovation",
          "Federal and military facility engineering — UFC, GSA standards",
          "Seismic retrofit engineering — California mandatory programs",
          "Infrastructure engineering — parking, utilities, site development",
          "MEP engineering for restaurants, healthcare, and hospitality",
          "Civil and geotechnical engineering for commercial land development",
        ],
      },
    ],
    ctaHeading: "Request a Capabilities Statement or Proposal",
    ctaText: "Contact Apex Grid Engineering to request a formal capabilities statement, teaming introduction, or project proposal.",
  },
  {
    slug: "government-contracting",
    title: "Government Contracting Engineering | SDVOSB | Apex Grid Engineering",
    description: "Apex Grid Engineering is an SDVOSB-eligible multi-discipline engineering firm serving federal, state, and local government clients — SAM.gov registered, experienced in UFC and federal documentation standards.",
    h1: "Government Engineering and Federal Contracting",
    kicker: "Government Contracting",
    lede: "Apex Grid Engineering provides engineering support to federal agencies, military installations, and government contractors as a Service-Disabled Veteran-Owned Small Business (SDVOSB). We are SAM.gov registered, experienced in UFC and federal engineering standards, and structured to support government contracting as a prime or engineering subconsultant.",
    sections: [
      {
        heading: "SDVOSB Status and Federal Set-Aside Eligibility",
        content: "Apex Grid Engineering is led by a Service-Disabled Veteran — Jeremy Mills, co-founder and CEO, USAF disabled veteran — and is eligible for federal SDVOSB set-aside contracts.",
        bullets: [
          "SDVOSB-eligible — Service-Disabled Veteran-Owned Small Business",
          "Registered in SAM.gov — active registration with UEI and CAGE code",
          "Eligible for SDVOSB set-aside contracts under FAR and VAAR",
          "Eligible for VA SDVOSB set-asides through the Veterans First Contracting Program",
          "Small business under applicable NAICS size standards",
          "Veteran-led firm with direct understanding of military facility requirements",
        ],
      },
      {
        heading: "Federal and Military Engineering Experience",
        content: "Apex Grid engineering teams have experience with federal documentation standards and military construction requirements.",
        bullets: [
          "UFC (Unified Facilities Criteria) engineering design compliance",
          "GSA design standards and federal facility documentation",
          "FHWA engineering standards for federally funded transportation projects",
          "EISA energy compliance for federal facilities",
          "Buy American Build America (BABA) awareness in engineering documentation",
          "Davis-Bacon wage awareness in engineering scopes",
          "Federal project certification and PE sign-off requirements",
          "Prime-subconsultant engineering teaming for federal contracts",
        ],
      },
      {
        heading: "Engineering Services for Government Clients",
        content: "We provide multi-discipline engineering across the full federal facility project lifecycle.",
        bullets: [
          "Structural engineering for federal and military facility renovation and new construction",
          "MEP engineering for federal buildings — mechanical, electrical, plumbing",
          "Civil site engineering for government facility site improvements",
          "Geotechnical investigation for federal construction",
          "Engineering for public works projects — federally and locally funded",
          "Design-build engineering support for government design-build contracts",
          "Construction-phase engineering support and RFI response",
          "Permit coordination with installation facilities management offices",
        ],
      },
      {
        heading: "Teaming and Subcontracting",
        content: "Apex Grid is structured to team with prime contractors and larger engineering firms pursuing government work.",
        bullets: [
          "Engineering subconsultant for AE firms pursuing government design contracts",
          "Engineering subcontractor for general contractors on government construction",
          "SDVOSB teaming partner for small business set-aside requirements",
          "National coverage — licensed in 49 states for multi-installation contracts",
          "Fast onboarding for active government contract pursuit",
          "Teaming agreement execution and technical proposal support",
        ],
      },
      {
        heading: "Contact for Government Work",
        content: "To discuss government contracting opportunities, teaming arrangements, or capability inquiries, contact Apex Grid Engineering directly.",
        bullets: [
          "SAM.gov registration available on request",
          "CAGE code and UEI available for teaming and contract vehicles",
          "Formal capabilities statement available on request",
          "NAICS 541330 and related codes — engineering services",
          "Contact: Jeremy Mills, Co-Founder and CEO",
          "Phone: 480-490-0064 | Online: apexgrideng.com/contact/",
        ],
      },
    ],
    ctaHeading: "Contact Apex Grid for Government Engineering",
    ctaText: "Reach out to discuss federal contracting, teaming, or engineering support for your government project.",
  },
  {
    slug: "engineering-process",
    title: "Our Engineering Process | How We Work | Apex Grid Engineering",
    description: "How Apex Grid Engineering handles projects from first contact through permit — our process for structural, MEP, civil, and geotechnical engineering projects.",
    h1: "Our Engineering Process",
    kicker: "How We Work",
    lede: "Apex Grid Engineering follows a consistent, transparent process on every project — from the initial scope review through permit-ready deliverables and plan check support. Here's how we work.",
    sections: [
      {
        heading: "Step 1: Project Review and Proposal",
        content: "Every project starts with a review of the available project information — architectural plans, existing drawings, scope description, and jurisdiction. We evaluate the engineering scope, identify any missing information, and respond with a fee proposal within one business day.",
        bullets: [
          "Send us your drawings or scope description — PDF is sufficient",
          "We review the scope and identify all disciplines required",
          "We flag any missing information that affects the scope or fee",
          "We respond with a detailed fee proposal within one business day",
          "Proposals include scope, deliverables, schedule, and fee",
        ],
      },
      {
        heading: "Step 2: Project Kickoff and Information Gathering",
        content: "Once authorized, we kick off the project by confirming the complete information package — architectural plans, existing drawings, equipment schedules, geotechnical report, and jurisdiction requirements.",
        bullets: [
          "We confirm the complete information package at kickoff",
          "We identify outstanding information that is on the critical path",
          "We coordinate with your architect, contractor, or owner representative",
          "We confirm the permit target date and schedule engineering to meet it",
          "We assign the engineering team across all required disciplines",
        ],
      },
      {
        heading: "Step 3: Engineering Design",
        content: "Engineering design begins with the available information and proceeds through analysis, calculations, and drawing production — with coordination across disciplines and with the architectural team.",
        bullets: [
          "Structural analysis, MEP load calculations, and civil design proceed concurrently",
          "Multi-discipline coordination — we resolve conflicts between disciplines internally",
          "We communicate structural and MEP coordination needs to the architect",
          "Engineering calculations are developed in parallel with drawing production",
          "We use current building codes for the project jurisdiction",
        ],
      },
      {
        heading: "Step 4: Internal QA/QC Review",
        content: "Before any permit submittal, our engineering documents go through internal quality review — a second engineer checks calculations, drawings are verified for consistency, and the permit package is confirmed as complete.",
        bullets: [
          "Second-engineer review of calculations and drawing accuracy",
          "Drawing-to-calculation consistency check",
          "Code compliance review for the jurisdiction and occupancy",
          "Permit package completeness review — all required sheets and notes",
          "Multi-discipline coordination review before submittal",
        ],
      },
      {
        heading: "Step 5: Permit Submittal and Plan Check Support",
        content: "We deliver the permit package ready for submittal — organized, complete, and stamped. When the building department issues comments, we respond to them efficiently as part of the project scope.",
        bullets: [
          "PE-stamped permit packages delivered in the jurisdiction's preferred format",
          "Electronic submittals in PDF format for online permitting",
          "Plan check comment response included in standard project scope",
          "Technical response letters, revised drawings, and calculations as needed",
          "We communicate directly with the building department on technical issues when required",
        ],
      },
      {
        heading: "Step 6: Construction Phase Support",
        content: "After permit issuance, we remain available for construction-phase engineering — RFI responses, field change engineering, and supplemental drawings when conditions in the field differ from the permit set.",
        bullets: [
          "RFI response for engineering questions during construction",
          "Field change engineering for unexpected conditions",
          "Supplemental calculations and revised drawings for changed scope",
          "Material substitution engineering review",
          "Construction observation when required by permit or owner",
        ],
      },
    ],
    ctaHeading: "Start Your Project",
    ctaText: "Send us your drawings or project description and we'll respond with a proposal within one business day.",
  },
  {
    slug: "quality-control",
    title: "Engineering Quality Control | Apex Grid Engineering",
    description: "How Apex Grid Engineering ensures the quality of structural, MEP, civil, and geotechnical engineering — our QA/QC process, peer review practices, and professional standards.",
    h1: "Engineering Quality Control",
    kicker: "Quality",
    lede: "Engineering quality control is how we catch errors before they reach the building department or the field. Every Apex Grid permit package goes through structured internal review — calculations checked by a second engineer, drawings verified for consistency and completeness, and the permit package reviewed for code compliance before it leaves our office.",
    sections: [
      {
        heading: "Why QA/QC Matters",
        content: "Engineering errors are far more expensive when discovered at plan check or — worse — during construction. A plan check comment adds weeks and resubmittal fees. A construction error can require demolition and rebuild. Our QA/QC process catches problems internally before they become your problems.",
        bullets: [
          "Errors caught internally cost hours — errors at plan check cost weeks",
          "Complete, well-organized permit packages reduce comment volume significantly",
          "First-cycle permit approval is the standard we engineer to",
          "Coordination errors caught in-house prevent field RFIs and costly changes",
          "Professional liability is protected by rigorous internal review",
        ],
      },
      {
        heading: "Our QA/QC Process",
        content: "Every Apex Grid permit submittal follows the same QA/QC workflow regardless of project size.",
        bullets: [
          "Calculations reviewed by a second licensed engineer before drawing production",
          "Drawing accuracy verified against calculations — member sizes, connections, loads",
          "Drawing completeness review — all required sheets, notes, and details present",
          "Code compliance check against the applicable building code edition for the jurisdiction",
          "Multi-discipline coordination review — structural vs. MEP conflicts resolved before submittal",
          "PE review and stamp by the engineer of record",
          "Final package review for organization and formatting",
        ],
      },
      {
        heading: "Professional Engineering Standards",
        content: "All engineering at Apex Grid is performed and certified by licensed Professional Engineers in the project jurisdiction.",
        bullets: [
          "PE-stamped drawings from engineers licensed in the project state",
          "Responsible charge — the PE who stamps the work was directly involved in engineering it",
          "We do not issue cursory review stamps on work we did not engineer",
          "All calculations reference applicable code sections and design standards",
          "We use current building code editions — not outdated editions",
          "Engineering is consistent with AISC, ACI, NDS, ASCE 7, and other applicable standards",
        ],
      },
      {
        heading: "Plan Check Performance",
        content: "Our permit packages are designed for clean first-cycle review — and when comments are issued, we respond quickly.",
        bullets: [
          "Permit packages prepared specifically for first-cycle approval",
          "Common plan check comments anticipated and addressed proactively",
          "Plan check response typically delivered within one to two weeks of comment receipt",
          "Technical response letters address each comment directly",
          "Revised drawings issued with cloud markups on all changes",
          "We track plan check cycle history to improve over time",
        ],
      },
      {
        heading: "Continuous Improvement",
        content: "We track plan check performance across jurisdictions and project types to continuously improve our first-cycle approval rate.",
        bullets: [
          "Plan check comment tracking across jurisdictions",
          "Recurring comment patterns addressed in engineering checklists",
          "Jurisdiction-specific requirements updated as AHJ standards change",
          "Post-project review for projects with significant plan check cycles",
          "Engineering process improvements documented and implemented firm-wide",
        ],
      },
    ],
    ctaHeading: "Request Engineering With Rigorous QA/QC",
    ctaText: "Send us your project and experience the difference a quality-first engineering process makes.",
  },
  {
    slug: "professional-engineering",
    title: "Professional Engineering | What It Means | Apex Grid Engineering",
    description: "What professional engineering means — PE licensing, responsible charge, engineering ethics, and why the PE stamp on your drawings matters.",
    h1: "Professional Engineering at Apex Grid",
    kicker: "Professional Engineering",
    lede: "Professional engineering is a licensed profession — only engineers who have passed national examinations, accumulated qualifying experience, and obtained state licensure can sign and seal engineering documents for public use. At Apex Grid, every permit drawing is produced under the direct supervision of and stamped by a Licensed Professional Engineer.",
    sections: [
      {
        heading: "What Makes Engineering Professional",
        content: "The term 'Professional Engineer' (PE) has a specific legal meaning — it refers to engineers who have earned state licensure by meeting education, experience, and examination requirements.",
        bullets: [
          "PE licensure requires passing the Fundamentals of Engineering (FE) exam",
          "Four or more years of qualifying experience under a licensed PE",
          "Passing the Principles and Practice of Engineering (PE) exam in the relevant discipline",
          "State board licensure in each state where engineering work is performed",
          "Continuing education to maintain active licensure",
          "Only PEs can legally sign and seal engineering documents for commercial permits",
        ],
      },
      {
        heading: "The PE Stamp and What It Certifies",
        content: "When a PE stamps an engineering document, they are certifying that the engineering meets applicable codes and standards — and accepting professional, legal, and ethical responsibility for that certification.",
        bullets: [
          "The PE stamp certifies that the engineering meets applicable codes",
          "The PE accepts professional liability for the stamped work",
          "Building departments require PE stamps as a condition of permit",
          "The PE must be licensed in the state where the work is performed",
          "Stamping work the PE did not directly supervise is an ethics violation",
          "Apex Grid PE stamps are issued only by engineers licensed in the project state",
        ],
      },
      {
        heading: "Apex Grid's Licensed Engineers",
        content: "Apex Grid Engineering maintains PE licenses across six engineering disciplines in all 49 states where we practice.",
        bullets: [
          "Structural engineering PEs — licensed across 49 states",
          "Mechanical engineering PEs — HVAC and fire protection",
          "Electrical engineering PEs — power distribution and specialty systems",
          "Civil engineering PEs — site development and infrastructure",
          "Plumbing engineering PEs — domestic water and specialty systems",
          "Geotechnical engineering PEs — soil investigation and foundation design",
          "We confirm license coverage for each project's jurisdiction before accepting the work",
        ],
      },
      {
        heading: "Engineering Ethics",
        content: "Licensed Professional Engineers are bound by codes of ethics that prioritize public safety, honesty, and competence.",
        bullets: [
          "Engineers hold public safety as the paramount professional obligation",
          "Engineers practice only within their area of competence",
          "Engineers do not misrepresent their qualifications or work",
          "Engineers do not sign work they did not supervise — responsible charge is required",
          "Engineers report known violations of engineering safety",
          "Apex Grid's engineering ethics are non-negotiable — we will not stamp work we did not engineer",
        ],
      },
      {
        heading: "Why This Matters for Your Project",
        content: "Working with a firm that takes professional engineering seriously protects you — from permit problems, from field errors, and from liability.",
        bullets: [
          "PE-stamped drawings from engineers who actually did the engineering",
          "Responsible charge on every project — the stamping PE was directly involved",
          "Engineering that stands behind plan check scrutiny",
          "Professional liability insurance covering the engineering work",
          "A firm you can call back if something goes wrong in the field",
        ],
      },
    ],
    ctaHeading: "Work With Professional Engineers Who Take It Seriously",
    ctaText: "Contact Apex Grid Engineering for PE-stamped engineering on your next project.",
  },
];
