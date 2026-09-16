/** Who We Work With — client and partner audience pages. */

import { LICENSING_COVERAGE_STATEMENT, PROJECT_JURISDICTION_NOTE } from "../src/lib/licensing";

export interface ClientPage {
  slug: string;
  title: string;
  description: string;
  h1: string;
  kicker: string;
  lede: string;
  sections: { heading: string; body: string }[];
  relatedLinks?: { label: string; href: string }[];
  faqs?: { question: string; answer: string }[];
  cta: string;
  ctaHref: string;
}

export const CLIENT_PAGES: ClientPage[] = [
  {
    slug: "architects",
    title: "Engineering Services for Architects | Structural, MEP & Civil | Apex Grid",
    description: "Apex Grid partners with architectural firms as a full-service engineering consultant — structural, MEP, civil, and geotechnical in one coordinated team.",
    h1: "Engineering Services for Architectural Firms",
    kicker: "Engineering Partner for Architects",
    lede: "We work with architectural firms as a seamlessly integrated engineering partner — structural, MEP, civil, and geotechnical under one roof, coordinated to your design and your schedule.",
    sections: [
      {
        heading: "What Architects Need From an Engineering Partner",
        body: "Architects need engineering consultants who understand design intent, respond quickly, and deliver coordinated documents that pass plan check the first time. That means clear communication, Revit and CAD coordination, timely responses to plan check comments, and engineering that holds up under scrutiny from any jurisdiction in the country.",
      },
      {
        heading: "Structural Engineering for Architects",
        body: "We design structural systems that work with your architecture — not against it. Column grids, shear wall locations, and structural depths are coordinated with your floor plates and ceiling conditions. Structural calculations, permit drawings, and plan check response support are coordinated within the project team; responsible credentials and any sealing role are confirmed per project.",
      },
      {
        heading: "MEP Engineering for Architects",
        body: "Mechanical, electrical, and plumbing engineering coordinated through one team means fewer RFIs, faster drawing production, and a complete permit package. We cover commercial HVAC, lighting, power distribution, plumbing systems, specialty exhaust, and energy code compliance (ASHRAE 90.1, Title 24, IECC).",
      },
      {
        heading: "Civil and Geotechnical Engineering",
        body: "Site civil engineering — grading, drainage, stormwater, parking, utilities, and ADA site compliance — and geotechnical coordination for foundation design. We support entitlement submissions, site plan approvals, and permit-ready civil packages.",
      },
      {
        heading: "CAD/Revit Coordination",
        body: "We work in your preferred format — Revit BIM coordination, AutoCAD, or PDF-based workflows. Structural and MEP models are coordinated with the architectural model to flag clashes before they become field problems.",
      },
      {
        heading: "PE Review, Sealing, and Plan Check Support",
        body: "Where authorized for the project, the responsible engineer reviews and seals the documents within their scope and stands behind that work. When plan check comments come in, we respond directly — calculations, code citations, and revised drawings. We track comment status and keep the submittal moving.",
      },
    ],
    cta: "Send Us Your Architectural Set",
    ctaHref: "/contact",
  },

  {
    slug: "general-contractors",
    title: "Engineering Services for General Contractors | Apex Grid Engineering",
    description: "Engineering support for GCs — structural modifications, field condition resolution, MEP changes, permit revisions, RFI responses, and design-build support.",
    h1: "Engineering Support for General Contractors",
    kicker: "Engineering Support for GCs",
    lede: "We work directly with general contractors on structural modifications, existing building conditions, equipment support, MEP changes, and design-build packages — with the fast turnaround that construction schedules require.",
    sections: [
      {
        heading: "Structural Modifications in the Field",
        body: "Field conditions rarely match the drawings. When structural elements need modification — a beam is in the wrong location, an existing footing isn't where the drawings say, or a wall opening needs to be larger — we provide structural solutions fast. We review the field condition, design the modification, and produce revised drawings for the inspector.",
      },
      {
        heading: "Existing Building Engineering",
        body: "GCs frequently work in existing buildings without complete drawings. We work with contractor-provided field measurements, photos, and exploratory opening information to engineer modifications without requiring a full set of existing drawings. Practical engineering for real-world construction conditions.",
      },
      {
        heading: "Rooftop Equipment and Structural Support",
        body: "RTU replacements, generator pads, solar mounting structures, equipment curbs — we size structural supports, design equipment anchorage, and produce the structural calculations and details required for the mechanical permit.",
      },
      {
        heading: "MEP Changes and Permit Revisions",
        body: "When mechanical, electrical, or plumbing scope changes during construction — due to equipment substitutions, field conditions, or owner changes — we update the engineering documents and produce revised drawings for permit revision or as-built documentation.",
      },
      {
        heading: "RFI Response and Plan Check Support",
        body: "We respond to structural and MEP RFIs and provide supporting documentation for plan check comments. Our engineers are available by phone and email for rapid responses to time-sensitive construction questions.",
      },
      {
        heading: "Design-Build Engineering",
        body: "For design-build projects, we integrate directly into the GC's delivery model — providing early schematic engineering to support bid packages, coordinating with the GC team through design development, and delivering permit-ready documents on the project schedule.",
      },
    ],
    cta: "Send Us Your Project Scope",
    ctaHref: "/contact",
  },

  {
    slug: "developers",
    title: "Engineering Services for Real Estate Developers | Apex Grid",
    description: "Integrated engineering support for real estate developers — predevelopment feasibility, full-service design through permit, and national multi-site capability.",
    h1: "Engineering Services for Real Estate Developers",
    kicker: "Engineering for Developers",
        lede: "From site feasibility and predevelopment analysis through permit-ready construction documents, we provide developers with integrated structural, MEP, civil, and geotechnical engineering for commercial, multifamily, and industrial projects where project-specific credentials and authorization are verified.",
    sections: [
      {
        heading: "Predevelopment and Feasibility",
        body: "Before a site is under contract, engineering data matters. We provide predevelopment engineering support — geotechnical parameters, structural system concepts, MEP infrastructure assessment, utility capacity analysis, and site feasibility reviews — to inform acquisition decisions and project pro formas.",
      },
      {
        heading: "Site Development and Civil Engineering",
        body: "Civil engineering for site development: grading, stormwater management, utility design, parking layout, ADA compliance, and jurisdictional approvals. We coordinate with civil and environmental consultants and deliver site plans that support entitlement and permitting.",
      },
      {
        heading: "Structural Systems for New Construction",
        body: "Structural engineering from schematic through permit — foundation systems, structural framing, lateral design, and coordination with the architectural team. We work in every structural material: concrete, steel, wood frame, CMU, and mixed systems.",
      },
      {
        heading: "MEP Infrastructure",
        body: "Mechanical, electrical, and plumbing systems engineering for commercial and multifamily development. We design systems for operational efficiency, code compliance, and long-term maintainability — with early coordination of utility connections and infrastructure capacity.",
      },
      {
        heading: "Multifamily and Mixed-Use",
        body: "Multifamily, mixed-use, and podium construction require close coordination between structural, MEP, and the architectural team. Our selected experience includes projects in multiple states; availability and responsible-professional credentials are confirmed for each new scope.",
      },
      {
        heading: "Portfolio-Scale and Multi-Site Support",
        body: "For developers with active portfolios, we provide consistent engineering support across multiple projects and markets — applying proven systems, coordinated drawing standards, and a single engineering relationship that understands your development approach.",
      },
    ],
    cta: "Tell Us About Your Development",
    ctaHref: "/contact",
  },

  {
    slug: "property-managers",
    title: "Engineering Services for Property Management Companies | Apex Grid",
    description: "Structural assessments, capital improvement engineering, HVAC replacement, electrical upgrades, and repair design for property management firms and building owners.",
    h1: "Engineering Support for Property Managers",
    kicker: "Engineering for Property Management",
    lede: "Property managers need engineering partners who respond quickly, understand the operational realities of managed buildings, and deliver practical solutions — not over-engineered complexity. We provide the structural assessments, system evaluations, and capital improvement engineering that keeps portfolios performing.",
    sections: [
      {
        heading: "Structural Assessments and Condition Reports",
        body: "Periodic structural condition assessments document the state of a building's structural system — identifying deficiencies, prioritizing repairs, and providing capital planning data. We produce written reports with findings, photos, repair recommendations, and cost guidance that property managers can act on and share with owners.",
      },
      {
        heading: "Capital Improvement Engineering",
        body: "Capital improvements — roof replacements, HVAC system upgrades, parking lot reconstruction, electrical service upgrades — require engineering documentation for permit and contractor bidding. We produce the engineering documents needed to bid, permit, and execute capital projects across your portfolio.",
      },
      {
        heading: "HVAC Replacement Engineering",
        body: "Replacing rooftop units in an existing building requires structural review of rooftop framing, mechanical design for the new system, and permit documentation. We coordinate the structural and mechanical scope so the replacement permit is complete and the rooftop can actually support the new equipment.",
      },
      {
        heading: "Electrical Capacity and Upgrade Engineering",
        body: "Aging electrical systems in older commercial buildings frequently need assessment and upgrading to support modern tenants. Load analysis, service upgrade design, panel replacement, and EV charging infrastructure are all engineering services we provide for property managers.",
      },
      {
        heading: "Building Repair Design",
        body: "Structural repairs — cracked concrete, foundation movement, framing damage, water infiltration — require engineering design and permit documentation before a contractor can fix them properly. We evaluate existing conditions, design the repair, and produce permit-ready documents.",
      },
      {
        heading: "Emergency Response",
        body: "When a structural or systems issue requires immediate engineering assessment — storm damage, vehicle impact, post-earthquake inspection, or sudden failure — we prioritize response. We understand that unoccupied, red-tagged, or damaged buildings have real financial consequences.",
      },
    ],
    cta: "Tell Us About Your Property",
    ctaHref: "/contact",
  },

  {
    slug: "design-build",
    title: "Engineering for Design-Build Teams | Apex Grid Engineering",
    description: "Integrated structural, MEP, civil, and geotechnical engineering for design-build contractors and firms — from early bid support through permit-ready documents.",
    h1: "Engineering for Design-Build Teams",
    kicker: "Design-Build Engineering Partner",
    lede: "Design-build delivery compresses timelines and demands engineering partners who integrate early, communicate constantly, and deliver documents on construction schedules. We provide structural, MEP, civil, and geotechnical engineering that keeps design-build projects moving.",
    sections: [
      {
        heading: "Early Bid Support and Schematic Engineering",
        body: "Winning a design-build bid requires credible engineering. We provide schematic-level structural and MEP engineering to support competitive bids — system concepts, preliminary sizing, and cost-informing documentation that helps design-build contractors submit with confidence.",
      },
      {
        heading: "Constructability-Driven Design",
        body: "Design-build projects benefit when engineers think like builders. We design structural and MEP systems with construction sequence, material availability, and subcontractor capabilities in mind. Less re-engineering in the field means a faster project.",
      },
      {
        heading: "Integrated Coordination",
        body: "On design-build projects, structural and MEP engineering must be fully coordinated with each other and with the construction team — not handed off as a finished product. We participate in design coordination meetings, respond to field questions, and issue revised documents quickly when conditions require it.",
      },
      {
        heading: "Permit Documentation",
        body: "We produce complete, permit-ready engineering packages — structural calculations and drawings, MEP design documents, civil plans — on schedules that support the design-build delivery model. PE-stamped, jurisdiction-specific, and ready for submittal.",
      },
    ],
    cta: "Send Us Your Design-Build Scope",
    ctaHref: "/contact",
  },

  {
    slug: "property-owners",
    title: "Engineering Services for Property Owners | Apex Grid Engineering",
    description: "Not sure what you need from a structural or MEP engineer? We explain when engineering is required, what to expect, and how to get started.",
    h1: "Engineering Services for Property Owners",
    kicker: "Engineering for Building Owners",
    lede: "Most property owners haven't worked directly with an engineering firm before. We'll explain what you need, why you need it, and what the process looks like — in plain language, without unnecessary complexity.",
    sections: [
      {
        heading: "When Do You Need an Engineer?",
        body: "You need a structural or MEP engineer when you're making changes to your building that affect its structural system or its mechanical, electrical, or plumbing systems — and when the city requires engineering documents as part of the building permit. Common triggers: removing a wall, adding onto the building, replacing HVAC equipment, upgrading electrical service, or making any change that requires a permit.",
      },
      {
        heading: "What Drawings Do You Need?",
        body: "The permit-required drawings depend on the scope of your project. A wall removal might require a one-page structural detail sheet. A full renovation might require structural plans, MEP plans, and an architectural set. We'll tell you exactly what your project needs before you commit to anything.",
      },
      {
        heading: "What Does a Site Visit Accomplish?",
        body: "A site visit by an engineer is used to verify existing conditions that can't be determined from drawings or photos alone. Not every project requires one — but when it does, the engineer documents what's actually in the building so the design is based on real conditions rather than assumptions.",
      },
      {
        heading: "What Is a Structural Report?",
        body: "A structural report is a written engineering document that describes the condition of a building's structural system — what was observed, what (if any) deficiencies exist, what repairs are recommended, and what the risk level is. Property owners often need structural reports for insurance claims, sale due diligence, or before starting a renovation.",
      },
      {
        heading: "How Does the Permit Process Work?",
        body: "For projects requiring a permit, you (or your contractor) submit engineering drawings and calculations to the local building department. A plan reviewer checks the documents against the applicable codes. If approved, the permit is issued and construction can begin. The engineering firm responds to any plan check comments. An inspector visits during construction to verify the work matches the approved drawings.",
      },
      {
        heading: "What Information Do We Need to Start?",
        body: "To give you a proposal, we need: the project address, a description of what you want to do, and any existing drawings you have. That's it. We'll review what you have and tell you exactly what engineering is needed and what it will cost.",
      },
    ],
    cta: "Tell Us What You're Planning",
    ctaHref: "/contact",
  },

  {
    slug: "government-contractors",
    title: "Engineering Support for Government Contractors | Apex Grid",
    description: "Structural, MEP, civil, and geotechnical engineering for federal contractors working on DoD, VA, and civilian agency facilities — UFC-compliant, PE-stamped, schedule-driven.",
    h1: "Engineering Support for Government Contractors",
    kicker: "Engineering for Federal Contractors",
    lede: "We provide structural, MEP, civil, and geotechnical engineering for government contractors on military facilities, federal agency buildings, and veteran service facilities — UFC-compliant engineering delivered on federal project timelines.",
    sections: [
      {
        heading: "DoD and Military Facility Engineering",
        body: "Military facility projects — admin buildings, maintenance facilities, barracks, hangars, vehicle maintenance, storage, and infrastructure — require engineering that meets UFC (Unified Facilities Criteria) standards. Our team is familiar with UFC requirements for structural, mechanical, electrical, and plumbing systems on DoD projects.",
      },
      {
        heading: "VA and Federal Civilian Agency Projects",
        body: "VA medical center projects, federal office buildings, courthouses, and civilian agency facilities involve complex MEP requirements, accessibility standards, and project delivery requirements. We have experience with the documentation and coordination demands of federal facility projects.",
      },
      {
        heading: "Existing Facility Renovations",
        body: "Federal contractors frequently work in existing facilities — updating MEP systems, modifying structural elements, adding new spaces within existing buildings. We provide the engineering assessment and design documents needed to execute renovations in occupied or partially occupied federal facilities.",
      },
      {
        heading: "Design-Build and IDIQ Support",
        body: "Many federal facility projects are delivered through design-build or IDIQ contracts. We provide engineering support for federal design-build bids and ongoing IDIQ task orders — from early schematic support through permit-ready final documents.",
      },
      {
        heading: "Project-specific Federal Support",
        body: "Federal facilities exist in every state. For each pursuit, project availability is confirmed only after the responsible individual's license, firm authorization, discipline, and AHJ requirements are verified; teaming may be appropriate for scopes outside that evidence.",
      },
    ],
    cta: "Contact Us About Your Federal Project",
    ctaHref: "/contact",
  },

  {
    slug: "facility-managers",
    title: "Engineering Support for Facility Managers | Apex Grid Engineering",
    description: "Structural assessments, capital improvement engineering, MEP system evaluations, and repair design for facility management teams.",
    h1: "Engineering Support for Facility Managers",
    kicker: "Engineering for Facility Management",
    lede: "Facility managers need engineering responses that match the operational tempo of the buildings they manage — fast, practical, and coordinated with the maintenance and construction teams already on-site.",
    sections: [
      {
        heading: "Existing Facility Engineering",
        body: "Most facility management engineering involves existing buildings — modifying systems, evaluating conditions, replacing equipment, or responding to failures. We specialize in existing building engineering: documenting what's there, evaluating what it can support, and designing practical solutions.",
      },
      {
        heading: "Capital Improvement Planning",
        body: "Facility managers responsible for capital planning need engineering data to support budget decisions. We provide condition assessments, system evaluations, and capital improvement scoping documents that inform multi-year capital plans with engineering-backed cost estimates.",
      },
      {
        heading: "Equipment Replacement Engineering",
        body: "HVAC replacement, electrical system upgrades, plumbing system modifications, and generator installations all require engineering documentation for permit. We coordinate the structural and MEP scope so replacement projects get permitted without delays.",
      },
      {
        heading: "Energy and Systems Analysis",
        body: "Energy code compliance studies, lighting upgrade engineering, HVAC optimization, and electrical load analysis for facilities undergoing sustainability upgrades. We help facility managers identify opportunities and produce the engineering documentation to execute them.",
      },
      {
        heading: "Emergency Structural Assessment",
        body: "When a structural or building systems issue requires immediate professional assessment — storm damage, equipment failure, unusual cracking, or occupant safety concerns — we prioritize rapid response and clear professional guidance.",
      },
    ],
    cta: "Contact Us About Your Facility",
    ctaHref: "/contact",
  },

  {
    slug: "real-estate-investors",
    title: "Engineering Services for Real Estate Investors | Apex Grid",
    description: "Due diligence engineering, condition assessments, renovation design, and adaptive reuse engineering for real estate investors and investment groups.",
    h1: "Engineering Services for Real Estate Investors",
    kicker: "Engineering for Real Estate Investment",
    lede: "Real estate investors need engineering that supports decisions — not just documents. We provide the assessments, feasibility analysis, and design engineering that inform acquisitions, drive capital planning, and execute value-add projects.",
    sections: [
      {
        heading: "Due Diligence and Condition Assessment",
        body: "Before closing on a commercial property, a structural condition assessment and MEP systems review identifies risks that affect purchase price, renovation budget, and project timeline. We produce written reports with findings, deficiency documentation, and cost impact guidance that informs negotiation and underwriting.",
      },
      {
        heading: "Renovation and Value-Add Engineering",
        body: "Value-add real estate strategies — repositioning a building, upgrading systems, expanding usable space, changing the occupancy — require engineering. We provide the structural, MEP, and civil engineering needed to execute renovation scopes efficiently and get permits approved.",
      },
      {
        heading: "Adaptive Reuse",
        body: "Converting an existing building from one use to another — office to residential, industrial to commercial, retail to healthcare — involves structural, MEP, and sometimes civil engineering. We evaluate existing conditions, analyze what can be reused, and design the systems needed for the new occupancy.",
      },
      {
        heading: "Development Engineering",
        body: "For investors moving into ground-up development, we provide full-service engineering: geotechnical, civil, structural, and MEP from predevelopment through permit. A single engineering relationship across all disciplines reduces coordination friction and keeps the schedule.",
      },
      {
        heading: "Portfolio Engineering Support",
        body: "Investors with multiple assets across multiple markets benefit from a single engineering firm that understands their portfolio — consistent documentation standards, preferred design approaches, and institutional knowledge that doesn't have to be rebuilt for every project.",
      },
    ],
    cta: "Tell Us About Your Investment",
    ctaHref: "/contact",
  },

  {
    slug: "multi-site-clients",
    title: "Engineering for Multi-Site & Portfolio Clients | Apex Grid",
    description: "Consistent, coordinated engineering support for retail chains, restaurant groups, healthcare networks, property managers, and national contractors with multi-location portfolios.",
    h1: "Engineering Support Across Multiple Properties and Projects",
    kicker: "Multi-Site & Portfolio Engineering",
    lede: "Organizations managing multiple locations need engineering partners who can scale — applying consistent standards, coordinated documentation, and national licensure to every site in the portfolio.",
    sections: [
      {
        heading: "Consistent Engineering Standards Across Locations",
        body: "Multi-site clients benefit from engineering that applies consistent standards — the same structural system preferences, the same MEP equipment selections, the same drawing standards — across every location. This reduces construction variability, simplifies bidding, and makes operations more predictable.",
      },
      {
        heading: "Licensed in 49 states",
        body: `${LICENSING_COVERAGE_STATEMENT} ${PROJECT_JURISDICTION_NOTE} A national portfolio client can work with a single engineering firm regardless of where individual sites are located. No need to find a new local engineer for every market.`,
      },
      {
        heading: "Retail and Restaurant Chains",
        body: "Prototype rollout engineering — adapting a standard design to site-specific conditions, local codes, and individual building constraints — is a service we provide to retail and restaurant groups expanding to new markets.",
      },
      {
        heading: "Healthcare Networks and Medical Groups",
        body: "Healthcare organizations opening or expanding clinic locations, urgent care centers, or medical office buildings across multiple markets can rely on consistent MEP engineering — same healthcare-specific mechanical standards, same electrical distribution approach, applied to every location.",
      },
      {
        heading: "Property Management Portfolios",
        body: "Property managers responsible for engineering across a portfolio of commercial assets benefit from a standing engineering relationship — one firm that knows the assets, the clients, and the operational context, available for capital improvement projects, emergency assessments, and lease-driven TI support.",
      },
    ],
    cta: "Tell Us About Your Portfolio",
    ctaHref: "/contact",
  },
  {
    slug: "builders",
    title: "Engineering Services for Builders | Apex Grid Engineering",
    description: "Structural, MEP, civil, and geotechnical engineering support for builders planning coordinated new construction, additions, and repeatable projects.",
    h1: "Engineering Support for Builders",
    kicker: "Engineering for Builders",
    lede: "I help builders define the engineering work behind a buildable project before assumptions reach pricing, permitting, or the field. The right scope depends on the site, building type, delivery method, jurisdiction, and project team.",
    sections: [
      {
        heading: "Define the Project Before Design Advances",
        body: "I start with the project address, intended use, available survey and soils information, architectural concept, utility context, delivery plan, and the decisions your team needs from engineering. Separating confirmed inputs from open questions creates a more defensible basis for scope, fee, and schedule.",
      },
      {
        heading: "Coordinate Structure, Systems, and Site Work",
        body: "Building design can involve structural framing, foundations, HVAC, electrical distribution, plumbing, grading, drainage, utilities, and geotechnical recommendations. I help identify the interfaces assigned to Apex Grid and the information that must come from the architect, builder, owner, specialty consultants, and authority having jurisdiction.",
      },
      {
        heading: "Support Repeatable Building Programs",
        body: "For builders using standard plans or recurring building types, I review what can remain consistent and what must be evaluated for each site. Local loads, soils, utilities, energy requirements, amendments, and responsible-professional authorization can change the engineering even when the program looks similar.",
      },
      {
        heading: "Prepare for Permit and Construction Handoffs",
        body: "A useful handoff identifies the intended deliverables, design assumptions, coordination milestones, deferred items, and known field-verification needs. Permit acceptance and construction outcomes remain subject to the completed design, site conditions, contractor execution, and authority review.",
      },
    ],
    relatedLinks: [
      { label: "Engineering project types", href: "/project-types/" },
      { label: "New-construction engineering", href: "/project-types/new-construction/" },
      { label: "Engineering services", href: "/services/" },
      { label: "Who Apex Grid works with", href: "/who-we-work-with/" },
    ],
    faqs: [
      { question: "What should a builder provide for an engineering estimate?", answer: "Share the project location, intended use, current drawings, site records, requested disciplines, delivery method, target milestone, and known jurisdictional requirements. I will identify missing inputs rather than price from unsupported assumptions." },
      { question: "Can one engineering package be reused on multiple building sites?", answer: "Some design standards may be repeatable, but each site can have different loads, soils, utilities, codes, amendments, and authorization requirements. Reuse must be evaluated for the actual location and scope." },
      { question: "Who controls permit approval for a builder's project?", answer: "The authority having jurisdiction controls its interpretation, review, and approval. I prepare the agreed engineering scope from available project information and respond to review comments within that scope." },
      { question: "When should a builder involve engineering?", answer: "Early involvement is useful when structural systems, site constraints, utilities, equipment, or permit requirements affect layout and cost. The appropriate timing depends on which decision the engineering work must support." },
    ],
    cta: "Request a Builder Project Estimate",
    ctaHref: "/estimate/",
  },
  {
    slug: "owner-representatives",
    title: "Engineering Support for Owner Representatives | Apex Grid",
    description: "Independent engineering scope, coordination, and document support for owner representatives managing design, procurement, and construction decisions.",
    h1: "Engineering Support for Owner Representatives",
    kicker: "Engineering for Owner Representatives",
    lede: "I help owner representatives turn program goals, existing records, consultant inputs, and project constraints into a defined engineering scope. My role is to make responsibilities and decisions clear without replacing the authority of the owner, design professionals, contractor, or jurisdiction.",
    sections: [
      {
        heading: "Translate Owner Priorities Into Engineering Scope",
        body: "An owner representative often has to reconcile budget, operations, schedule, risk, and procurement requirements before a complete design exists. I help document the requested outcome, affected systems, available evidence, review milestones, and engineering deliverables needed for the next owner decision.",
      },
      {
        heading: "Create Comparable Procurement Inputs",
        body: "Engineering proposals are easier to compare when they share a clear basis: disciplines, deliverables, assumptions, exclusions, site visits, existing-condition responsibilities, coordination boundaries, and comment-response expectations. I can review the available package and identify questions that should be resolved before selection.",
      },
      {
        heading: "Maintain a Traceable Decision Record",
        body: "Owner-side coordination benefits from a written record of what was observed, what remains unverified, who owns each decision, and which document is current. That record helps prevent preliminary comments, superseded sketches, or unapproved alternatives from being treated as final direction.",
      },
      {
        heading: "Review Project-Specific Responsibility",
        body: "Licensure, firm authorization, sealing responsibility, and jurisdictional requirements are confirmed for the actual project and discipline before commitment. I do not treat a general capability statement as proof that every scope can be performed in every location.",
      },
    ],
    relatedLinks: [
      { label: "Engineering procurement information", href: "/procurement/" },
      { label: "Submit an RFP or RFQ package", href: "/procurement/submit-rfp-rfq/" },
      { label: "Engineering process", href: "/engineering-process/" },
      { label: "Who Apex Grid works with", href: "/who-we-work-with/" },
    ],
    faqs: [
      { question: "What can an owner representative send for an initial review?", answer: "Send the project location, owner objectives, current drawings and reports, procurement schedule, requested disciplines, known constraints, and the decision or deliverable the owner needs next." },
      { question: "Can Apex Grid help define an engineering RFP scope?", answer: "Yes. I can review available project information and identify disciplines, deliverables, assumptions, coordination points, and unresolved inputs that should be addressed in the solicitation." },
      { question: "Does owner-side engineering review replace the engineer of record?", answer: "No. Advisory or scope review does not transfer the professional responsibility assigned to the engineer of record or other project participants. Responsibilities must be stated for the specific engagement." },
      { question: "How are jurisdictional requirements handled?", answer: "The authority having jurisdiction controls its current requirements and approval decisions. I identify known questions and verify project-specific professional authorization before committing to regulated work." },
    ],
    cta: "Request an Owner-Side Engineering Estimate",
    ctaHref: "/estimate/",
  },
  {
    slug: "construction-managers",
    title: "Engineering Support for Construction Managers | Apex Grid",
    description: "Engineering coordination support for construction managers handling existing conditions, RFIs, submittals, field changes, and permit documentation.",
    h1: "Engineering Support for Construction Managers",
    kicker: "Engineering for Construction Management",
    lede: "I support construction managers by turning project questions into reviewable engineering inputs. Clear location references, current documents, verified field evidence, and an explicit decision request help the responsible design team respond without guessing.",
    sections: [
      {
        heading: "Organize Existing-Condition Evidence",
        body: "When field conditions differ from the issued documents, I need the exact location, current sheet references, dimensions, oriented photos, observed materials, access limitations, and the question requiring review. The construction manager can improve response quality by separating verified observations from proposed solutions.",
      },
      {
        heading: "Route RFIs and Submittals to the Right Discipline",
        body: "A field issue may affect structure, HVAC, electrical, plumbing, architecture, fire protection, civil work, or several disciplines at once. I help define the engineering interface and document which parties must coordinate before a response is treated as construction direction.",
      },
      {
        heading: "Control Revisions and Superseded Information",
        body: "Schedule pressure makes document control critical. Responses should identify the governing drawings, affected details, assumptions, and whether a formal revision or permit resubmittal is required. Preliminary discussions and superseded sketches should not remain in the active field set.",
      },
      {
        heading: "Plan Around Review Dependencies",
        body: "Response timing depends on the quality of the record, complexity of the issue, affected disciplines, site access, responsible-professional review, and jurisdictional process. I define the needed inputs and review path rather than promise a universal turnaround.",
      },
    ],
    relatedLinks: [
      { label: "Contractor engineering resources", href: "/resources/contractors/" },
      { label: "Construction RFI support", href: "/engineering-intent/construction-rfi-submittal-support/" },
      { label: "Engineering for general contractors", href: "/who-we-work-with/general-contractors/" },
      { label: "Who Apex Grid works with", href: "/who-we-work-with/" },
    ],
    faqs: [
      { question: "What information should accompany a construction RFI?", answer: "Include the exact location, current drawing references, verified condition, clear photos and dimensions, affected work, schedule context, and the specific decision requested. Identify proposed solutions separately from observed facts." },
      { question: "Can a construction manager authorize an engineering field change?", answer: "Authorization depends on the contracts and assigned professional responsibilities. Engineering changes require review by the responsible parties and should not be inferred from an informal discussion." },
      { question: "When does a field response require revised permit documents?", answer: "That depends on the nature of the change and the authority having jurisdiction. The design team should evaluate whether calculations, drawings, deferred-submittal records, or a formal permit revision are required." },
      { question: "Does Apex Grid promise a fixed RFI turnaround?", answer: "No. Timing depends on complete inputs, issue complexity, affected disciplines, field verification, professional review, and current workload. I will identify missing information and the practical review path." },
    ],
    cta: "Request a Construction Support Estimate",
    ctaHref: "/estimate/",
  },
  {
    slug: "portfolio-clients",
    title: "Engineering Support for Property Portfolios | Apex Grid",
    description: "Consistent engineering records, condition review, repair design, and capital-project support for teams managing portfolios of existing properties.",
    h1: "Engineering Support for Portfolio Clients",
    kicker: "Engineering for Property Portfolios",
    lede: "I help portfolio teams apply a consistent engineering process across existing properties without pretending every asset has the same conditions. Shared intake standards and decision records make site-specific work easier to scope, compare, and prioritize.",
    sections: [
      {
        heading: "Standardize Intake Across Existing Assets",
        body: "A portfolio program benefits from one repeatable intake: property address, building use and age, affected area, observed condition, available drawings, prior reports, maintenance history, photographs, and the business decision the review must support. Consistent inputs make differences between properties more visible.",
      },
      {
        heading: "Support Capital Planning With Defined Evidence",
        body: "Condition observations can inform repair planning and capital priorities when limitations are clear. I distinguish visual observations, available records, calculations, concealed conditions, and items requiring further investigation so the owner can use the work for the decision it was prepared to support.",
      },
      {
        heading: "Coordinate Repairs and System Replacements",
        body: "Portfolio projects may involve structural repairs, rooftop equipment, electrical capacity, plumbing changes, drainage, tenant improvements, accessibility, or permit corrections. I define the assigned engineering scope and interfaces for each property rather than applying one generic solution across the portfolio.",
      },
      {
        heading: "Preserve Site-Specific Accountability",
        body: "Standards can be shared, but conclusions remain tied to the actual property, records, jurisdiction, and responsible professionals. Each engagement confirms location-specific scope, authorization, and deliverables before work proceeds.",
      },
    ],
    relatedLinks: [
      { label: "Property-manager resources", href: "/resources/property-managers/" },
      { label: "Engineering for facility managers", href: "/who-we-work-with/facility-managers/" },
      { label: "Engineering for property owners", href: "/who-we-work-with/property-owners/" },
      { label: "Who Apex Grid works with", href: "/who-we-work-with/" },
    ],
    faqs: [
      { question: "How should a portfolio team request engineering across several properties?", answer: "Use a consistent property intake, then identify the specific condition, decision, records, and requested deliverable at each site. I can help separate shared program standards from property-specific engineering." },
      { question: "Can one condition assessment represent an entire portfolio?", answer: "No. A review is limited to the assets, areas, records, and conditions actually evaluated. Sampling can support a defined program decision only when its limits are explicit." },
      { question: "Can Apex Grid rank portfolio repairs by urgency?", answer: "Engineering observations can help identify condition significance and investigation needs within the agreed scope. Owners must combine that information with operations, occupancy, budget, and other professional advice." },
      { question: "Are engineering standards identical in every portfolio market?", answer: "No. Codes, amendments, climate loads, site conditions, utilities, and professional authorization vary. Shared standards still require project-specific review." },
    ],
    cta: "Request a Portfolio Engineering Estimate",
    ctaHref: "/estimate/",
  },
  {
    slug: "national-accounts",
    title: "Engineering Support for National Accounts | Apex Grid",
    description: "Program-level engineering coordination for national account teams managing recurring projects, vendors, standards, and site-specific requirements.",
    h1: "Engineering Support for National Accounts",
    kicker: "Engineering for National Programs",
    lede: "I help national account teams create a consistent engineering intake and coordination process while preserving the site-specific review each project requires. The goal is clearer scope and records across markets, not unsupported claims of identical coverage everywhere.",
    sections: [
      {
        heading: "Create a Program-Level Engineering Playbook",
        body: "A useful program defines project types, decision owners, standard source documents, expected deliverables, naming conventions, review milestones, escalation paths, and record retention. I help identify where engineering fits within that process and which inputs remain site-specific.",
      },
      {
        heading: "Adapt Standards to Each Location",
        body: "Prototype plans, preferred equipment, and standard details can improve consistency, but local loads, existing conditions, utilities, codes, amendments, permit procedures, and responsible-professional requirements still control the actual engineering approach. Each assignment receives its own scope review.",
      },
      {
        heading: "Coordinate Vendors and Project Teams",
        body: "National programs often involve owners, account managers, architects, contractors, equipment vendors, landlords, and local reviewers. I define the engineering interfaces assigned to Apex Grid and document unresolved dependencies so a vendor assumption does not silently become a design decision.",
      },
      {
        heading: "Report on Work Without Overstating Coverage",
        body: "Program reporting can track intake status, missing information, review milestones, and deliverables. Availability, discipline, licensure, firm authorization, and sealing responsibility are verified for each project before commitment rather than inferred from the size of the overall program.",
      },
    ],
    relatedLinks: [
      { label: "Engineering for multi-site clients", href: "/who-we-work-with/multi-site-clients/" },
      { label: "Engineering capabilities", href: "/capabilities/" },
      { label: "Licensing and project coverage", href: "/licensing/" },
      { label: "Who Apex Grid works with", href: "/who-we-work-with/" },
    ],
    faqs: [
      { question: "What is the difference between a national account and a multi-site project?", answer: "A national account usually adds program governance, recurring procurement, standard records, vendor coordination, and reporting across projects. Each individual site still requires its own engineering scope and authorization review." },
      { question: "Can Apex Grid use one standard design in every state?", answer: "Not without project-specific review. Site conditions, adopted codes, amendments, loads, utilities, equipment, and professional authorization can require changes even when a prototype is consistent." },
      { question: "How should a national account start an engineering program?", answer: "Start with representative project types, expected annual volume, locations, current standards, source documents, participating vendors, desired deliverables, and the internal decisions the engineering process must support." },
      { question: "Does a national program guarantee availability in every market?", answer: "No. I confirm capacity, discipline, responsible-professional licensure, firm authorization, and jurisdictional requirements for each assignment before Apex Grid commits." },
    ],
    cta: "Request a National Program Estimate",
    ctaHref: "/estimate/",
  },
];

/** Hub page data */
export const WHO_WE_WORK_WITH_HUB = {
  title: "Engineering Partners for Architects, Contractors & Developers | Apex Grid",
  description: "Apex Grid provides integrated engineering services to architects, general contractors, developers, property managers, facility managers, and government contractors.",
  h1: "Engineering Partnerships Built Around Your Projects",
  lede: "The right engineering partner understands your role in the project — and delivers what you need, in the format you need it, on the schedule you're working to.",
};
