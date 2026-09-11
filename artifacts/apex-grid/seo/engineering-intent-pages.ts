/** Canonical, non-location commercial engineering intent pages. */
export type EngineeringIntentPage = {
  slug: string;
  title: string;
  description: string;
  h1: string;
  answer: string;
  kicker: string;
  sections: { heading: string; body: string }[];
  faqs: { q: string; a: string }[];
  phrases: string[];
  audience: string;
  overlap: string;
};

export const ENGINEERING_INTENT_PAGES: EngineeringIntentPage[] = [
  {
    slug: "fast-turnaround-engineering",
    title: "Fast-Turnaround Engineering Support Services | Apex Grid",
    description: "Accelerated engineering scheduling for permit, construction, and assessment needs, subject to scope, records, access, jurisdiction, and availability.",
    h1: "Fast-Turnaround Engineering Support",
    kicker: "Accelerated Scheduling",
    answer: "Fast-turnaround engineering starts with a defined scope, available project records, and a realistic review path. Apex Grid can assess structural, MEP, civil, and building-support requests for accelerated scheduling when engineer availability, site access, jurisdiction requirements, and project complexity allow.",
    sections: [
      { heading: "A practical accelerated workflow", body: "We clarify the deliverable, review available drawings and photographs, identify jurisdictional requirements, then propose a scope and sequence. Scheduling is subject to records, site access, review complexity, and engineer availability; no completion or approval timing is guaranteed." },
      { heading: "Where this helps", body: "Contractors, owners, architects, and property managers may need an engineer for a permit response, field issue, design decision, or assessment without waiting for a conventional project cycle. We explain what can be reviewed remotely and what requires a site visit." },
    ],
    faqs: [
      { q: "Can you guarantee a fast engineering turnaround?", a: "No. Accelerated scheduling is considered case by case and depends on scope, records, access, jurisdiction, and engineer availability." },
      { q: "What should I send first?", a: "Send the project address, desired deliverable, drawings or photos, relevant correspondence, schedule constraint, and the permitting or construction contact." },
    ],
    phrases: ["expedited engineering services", "urgent engineering review", "rapid engineering support"],
    audience: "Owners, contractors, architects, and property managers",
    overlap: "Distinct workflow intent; does not duplicate permit or assessment service pages.",
  },
  {
    slug: "permit-correction-engineering",
    title: "Permit Correction Engineering Services | Apex Grid",
    description: "Engineering support for permit comments and correction cycles, including response coordination, revised drawings, calculations, and jurisdiction-aware documentation.",
    h1: "Permit Correction Engineering",
    kicker: "Permit Responses",
    answer: "Permit correction engineering translates plan-review comments into coordinated drawing, calculation, and response updates. Apex Grid reviews the correction notice and available design records, identifies the responsible discipline, and develops a documented response subject to the authority’s requirements and engineer availability.",
    sections: [
      { heading: "From comments to coordinated responses", body: "A correction cycle may involve code references, missing calculations, drawing coordination, details, or clarification. We organize the comments, confirm the design basis, and identify which revisions or supporting documents are appropriate." },
      { heading: "Information that keeps review focused", body: "A complete correction notice, prior submittal, architectural background, engineering sheets, jurisdiction forms, and reviewer contact reduce avoidable rework. We do not promise approval or first-pass acceptance." },
    ],
    faqs: [
      { q: "Do you respond to building department corrections?", a: "We can review correction comments and, when within scope, prepare engineering revisions, calculations, and response support for the applicable jurisdiction." },
      { q: "Will corrected plans be approved?", a: "Approval remains with the authority having jurisdiction. Outcomes depend on the project, adopted codes, comments, and the reviewing authority." },
    ],
    phrases: ["permit plan check corrections", "engineering response to permit comments", "permit resubmittal engineer"],
    audience: "Owners, architects, contractors, and permit coordinators",
    overlap: "Expands permit correction workflow; deeper than general permit engineering.",
  },
  {
    slug: "pe-stamped-plans-calculations",
    title: "PE-Stamped Plans and Calculations Services | Apex Grid",
    description: "Professional engineering plan and calculation packages prepared for defined scopes, with licensure and stamping requirements confirmed for the project jurisdiction.",
    h1: "PE-Stamped Plans and Calculations",
    kicker: "Engineering Deliverables",
    answer: "A PE-stamped package typically combines signed and sealed drawings, supporting calculations, design criteria, and discipline coordination for a defined project scope. Apex Grid first confirms the responsible discipline, jurisdictional requirements, available basis documents, and whether a qualified engineer can perform the work.",
    sections: [
      { heading: "What a package may include", body: "Depending on the scope, deliverables can include structural plans, MEP design documents, load calculations, equipment schedules, details, and a calculation narrative. The responsible engineer determines what is appropriate rather than applying a one-size-fits-all package." },
      { heading: "A clear path to a usable package", body: "Provide the project address, use and occupancy, existing drawings, proposed plans, applicable reviewer direction, and requested discipline. Stamping and sealing are handled only where the responsible engineer has the required authority and sufficient basis." },
    ],
    faqs: [
      { q: "Can any drawing be PE-stamped?", a: "No. A responsible engineer must review the basis, perform or verify the design, and meet applicable jurisdictional requirements before signing and sealing eligible documents." },
      { q: "Do you provide calculations with plans?", a: "When calculations are part of the agreed scope, they are coordinated with the plans and design criteria." },
    ],
    phrases: ["signed and sealed engineering plans", "professional engineer calculations", "stamped structural drawings"],
    audience: "Owners, architects, contractors, and permit applicants",
    overlap: "Package-focused intent distinct from discipline and permit hubs.",
  },
  {
    slug: "structural-engineering-letters",
    title: "Structural Engineering Letters for Buildings | Apex Grid",
    description: "Structural engineering letters for defined observations, design questions, and documentation needs, supported by records, photographs, and site review when required.",
    h1: "Structural Engineering Letters",
    kicker: "Written Engineering Opinions",
    answer: "A structural engineering letter documents a qualified engineer’s opinion for a defined question, such as observed damage, a proposed alteration, or a load concern. The engineer establishes the scope and evidence needed; a letter is not a substitute for drawings, calculations, or a site visit when those are required.",
    sections: [
      { heading: "Define the question first", body: "Useful letters identify the property, observed condition or proposed work, requested conclusion, limitations, and recipient. Photographs, prior reports, drawings, and a site visit may be needed to support the opinion." },
      { heading: "Letters for real project decisions", body: "Owners and contractors may need documentation for a repair decision, tenant improvement, equipment placement, insurer discussion, or permit question. The final format and level of investigation depend on the facts." },
    ],
    faqs: [
      { q: "Can a structural letter clear any building condition?", a: "No. The conclusion is limited to the question, evidence, and investigation defined by the responsible engineer." },
      { q: "Do structural letters require a site visit?", a: "Some do and some do not. The need depends on the condition, requested opinion, records, and engineer’s professional judgment." },
    ],
    phrases: ["engineer letter for structural condition", "structural letter report", "licensed engineer opinion letter"],
    audience: "Owners, property managers, contractors, and insurers",
    overlap: "Specific written deliverable; not a duplicate of broad existing-building assessments.",
  },
  {
    slug: "construction-rfi-submittal-support",
    title: "Construction RFI and Submittal Engineering | Apex Grid",
    description: "Engineering support for construction RFIs, submittals, substitutions, and field coordination with clear records, assumptions, and responsible-discipline review.",
    h1: "Construction RFI and Submittal Engineering",
    kicker: "Construction Support",
    answer: "Engineering RFI and submittal support helps resolve construction questions with a traceable review of drawings, specifications, field information, and proposed products. Apex Grid can define a response workflow for structural, MEP, civil, or coordination questions subject to project records and responsible-engineer availability.",
    sections: [
      { heading: "Support that respects the record", body: "A useful response identifies the question, contract documents, proposed change, design impact, and assumptions. Substitutions and field changes may require revised calculations, sketches, or formal design documents rather than a short email." },
      { heading: "Built for project teams", body: "Contractors, construction managers, architects, and owners can send an RFI log, relevant sheets, specification sections, product data, photographs, and requested response date. We clarify when a site observation or jurisdiction contact is needed." },
    ],
    faqs: [
      { q: "Can you answer construction RFIs?", a: "We can review defined engineering RFIs and submittals when the project record and responsible discipline are available." },
      { q: "Do submittal reviews change the design?", a: "A submittal review may identify a design impact. Any required revision or approval path is determined from the project documents and scope." },
    ],
    phrases: ["engineering RFI response", "submittal review engineer", "construction engineering support"],
    audience: "General contractors, construction managers, architects, and owners",
    overlap: "Construction-delivery support distinct from design and permit pages.",
  },
  {
    slug: "failed-inspection-correction-engineering",
    title: "Failed Inspection Correction Engineering | Apex Grid",
    description: "Engineering support after a failed building inspection, including documentation review, field-condition assessment, corrective details, and resubmittal support.",
    h1: "Failed Inspection Correction Engineering",
    kicker: "Inspection Resolution",
    answer: "Failed inspection correction engineering begins with the inspection notice, approved documents, and current field condition. Apex Grid can identify whether the issue calls for clarification, repair details, revised calculations, or coordination with the authority, with scope and timing subject to access, records, jurisdiction, and engineer availability.",
    sections: [
      { heading: "Diagnose before redesigning", body: "The inspection result may reflect an installation difference, missing documentation, an unsafe condition, or an inspector’s request for clarification. Reviewing the approved set and photographs helps separate these paths and prevents unsupported assumptions." },
      { heading: "Documentation for the next step", body: "Depending on the issue, deliverables may include a field observation, engineering letter, corrective detail, revised plan, calculation, or response narrative. Final acceptance remains with the inspecting authority." },
    ],
    faqs: [
      { q: "Can an engineer fix a failed inspection?", a: "An engineer may document the condition or develop appropriate corrective engineering, but the inspector or authority determines whether the correction passes." },
      { q: "What should I send after a failed inspection?", a: "Send the failed inspection report, approved plans, photos, project address, permit number, work completed, and the requested correction date." },
    ],
    phrases: ["inspection failure engineer", "engineering for failed building inspection", "inspection correction plans"],
    audience: "Contractors, owners, and permit coordinators",
    overlap: "Post-inspection correction intent distinct from pre-submittal permit engineering.",
  },
  {
    slug: "engineering-due-diligence",
    title: "Pre-Acquisition Engineering Due Diligence | Apex Grid",
    description: "Engineering due diligence for commercial property acquisition, covering visible conditions, documents, risks, likely capital needs, and scope limitations.",
    h1: "Pre-Acquisition Engineering Due Diligence",
    kicker: "Acquisition Review",
    answer: "Pre-acquisition engineering due diligence gives buyers a disciplined view of a property’s observed condition, available records, systems, and apparent engineering risks before a transaction decision. Apex Grid defines the review scope, coordinates access, and separates observed facts from items requiring further investigation.",
    sections: [
      { heading: "A decision-oriented review", body: "A review can consider structural systems, site and drainage observations, MEP equipment, life-safety coordination, permits, deferred maintenance, and apparent capital concerns. It is not a warranty or an exhaustive destructive investigation unless specifically scoped." },
      { heading: "Useful diligence inputs", body: "Provide the property address, access rules, plans, prior assessments, maintenance records, equipment schedules, known issues, transaction timeline, and requested report format. Site access and records materially affect conclusions." },
    ],
    faqs: [
      { q: "Is engineering due diligence a property inspection?", a: "It is a scoped engineering review, not necessarily a code inspection, warranty, or exhaustive investigation. The engagement defines what is observed and reported." },
      { q: "Can due diligence estimate repair costs?", a: "The report can identify apparent repair or capital needs; cost opinions require a defined basis and are not guaranteed estimates." },
    ],
    phrases: ["commercial property engineering due diligence", "building acquisition engineering review", "property condition engineer"],
    audience: "Developers, investors, lenders, and property owners",
    overlap: "Transaction-stage assessment distinct from general existing-building pages.",
  },
  {
    slug: "urgent-building-assessment",
    title: "Urgent Building Assessment After an Event | Apex Grid",
    description: "Post-event building assessment support for defined structural or building concerns, subject to safe access, scope, jurisdiction, and engineer availability.",
    h1: "Urgent and Post-Event Building Assessment",
    kicker: "Post-Event Evaluation",
    answer: "A post-event building assessment documents visible conditions after an event such as impact, water intrusion, wind, fire, or seismic activity. Apex Grid can evaluate a defined concern when safe access, useful records, appropriate scope, and qualified engineer availability align; the assessment is not a promise of emergency availability.",
    sections: [
      { heading: "Safety and scope come first", body: "Do not enter an unsafe area. Share photographs from a safe location, event details, prior plans, and the authority or insurer contact. The engineer determines whether a site observation, temporary stabilization advice, letter, or deeper investigation is appropriate." },
      { heading: "Clear limits for post-event work", body: "An assessment records observed conditions at a point in time. Hidden damage, inaccessible areas, and changing conditions may require additional investigation. Authorities and emergency responders remain responsible for safety directives." },
    ],
    faqs: [
      { q: "Are post-event assessments available immediately?", a: "Availability is not guaranteed. Scheduling depends on safety, location, scope, access, jurisdiction, and qualified engineer availability." },
      { q: "Can an assessment confirm a building is safe?", a: "Only a defined professional evaluation can address the requested concern, and no limited assessment can guarantee the absence of hidden conditions." },
    ],
    phrases: ["storm damage structural assessment", "urgent building engineer", "post-disaster building assessment"],
    audience: "Owners, insurers, facility managers, and public agencies",
    overlap: "Post-event urgency and availability language distinguish this from routine assessments.",
  },
  {
    slug: "value-engineering-design-optimization",
    title: "Value Engineering and Design Optimization | Apex Grid",
    description: "Engineering-led value analysis for constructability, system selection, material efficiency, coordination, and lifecycle priorities without unsupported savings promises.",
    h1: "Value Engineering and Design Optimization",
    kicker: "Design Efficiency",
    answer: "Value engineering compares viable design and construction choices against performance, code, schedule, constructability, and lifecycle priorities. Apex Grid can review a defined design to identify coordination improvements or alternatives while documenting assumptions; outcomes depend on project constraints and are not guaranteed savings.",
    sections: [
      { heading: "Optimization beyond lowest first cost", body: "A useful workshop may evaluate spans, framing, equipment selections, routing, materials, phasing, access, maintenance, and procurement. Recommendations must preserve required performance and remain compatible with the authority’s review path." },
      { heading: "Bring a design basis", body: "Share drawings, specifications, budget or procurement constraint, performance criteria, schedule, and known owner priorities. We identify opportunities and tradeoffs rather than promising a fixed percentage reduction." },
    ],
    faqs: [
      { q: "Does value engineering guarantee savings?", a: "No. Value engineering identifies options and tradeoffs; actual cost, schedule, and lifecycle results depend on the project and market." },
      { q: "Can optimization change approved plans?", a: "Potentially. A material design change may require revised documents, professional review, and authority approval." },
    ],
    phrases: ["engineering value analysis", "design optimization engineer", "constructability engineering review"],
    audience: "Owners, developers, architects, and contractors",
    overlap: "Decision and optimization intent distinct from discipline design pages.",
  },
  {
    slug: "as-built-existing-condition-documentation",
    title: "As-Built and Existing-Condition Documentation | Apex Grid",
    description: "Engineering documentation of existing building conditions using available records, field observations, measurements, and defined deliverables.",
    h1: "As-Built and Existing-Condition Documentation",
    kicker: "Existing Conditions",
    answer: "As-built and existing-condition documentation records what is known about a building or site through available drawings, field observations, measurements, photographs, and agreed assumptions. Apex Grid defines the level of detail, discipline, and verification needed for renovation, maintenance, permitting, or property decisions.",
    sections: [
      { heading: "Match documentation to the next decision", body: "A renovation may need measured backgrounds and system locations; an owner may need a targeted condition record; a permit may need discipline-specific drawings. Existing documentation is not automatically an as-built certification." },
      { heading: "Field and record-based inputs", body: "Provide prior plans, access windows, survey information, equipment lists, photographs, known changes, and desired CAD or PDF format. Areas that cannot be observed are identified as limitations." },
    ],
    faqs: [
      { q: "Are as-built drawings guaranteed to show every condition?", a: "No. Documentation is limited by access, records, measurement scope, concealed conditions, and the agreed level of verification." },
      { q: "Can existing-condition drawings support a permit?", a: "They may support design and permitting when coordinated with the proposed scope and jurisdictional requirements." },
    ],
    phrases: ["existing condition drawings", "commercial as-built documentation", "measured building drawings"],
    audience: "Owners, architects, contractors, and facility teams",
    overlap: "Documentation deliverable complements, but does not duplicate, existing-building evaluation.",
  },
  {
    slug: "deferred-submittal-engineering",
    title: "Deferred Submittal Engineering Packages | Apex Grid",
    description: "Deferred submittal engineering for defined specialty scopes, with calculations, drawings, coordination, and jurisdiction requirements reviewed before preparation.",
    h1: "Deferred Submittal Engineering",
    kicker: "Permit Coordination",
    answer: "Deferred submittal engineering develops a later package for an identified specialty scope while coordinating it with the permitted design and authority requirements. Apex Grid confirms the deferred item, design criteria, responsible discipline, project records, and submittal process before preparing eligible drawings or calculations.",
    sections: [
      { heading: "Coordinate the deferred item", body: "A package may involve equipment supports, specialty systems, delegated design, or other scope identified by the permitted documents. The deferred package must address interfaces, loads, clearances, code basis, and the authority’s requested format." },
      { heading: "Inputs that prevent coordination gaps", body: "Send the permit set, deferred-submittal list, specifications, product data, delegated-design criteria, structural or MEP backgrounds, and jurisdiction correspondence. The original design team and reviewing authority may retain required responsibilities." },
    ],
    faqs: [
      { q: "What is a deferred submittal?", a: "It is a later submission for an identified portion of permitted work, subject to the applicable code, permit documents, and authority process." },
      { q: "Will a deferred package be accepted automatically?", a: "No. The authority reviews the package, and acceptance depends on project-specific requirements and coordination." },
    ],
    phrases: ["deferred submittal engineer", "deferred permit package", "delegated design engineering"],
    audience: "Contractors, architects, specialty trades, and owners",
    overlap: "Specific later-phase permit package distinct from general permit engineering.",
  },
  {
    slug: "engineer-of-record-transition",
    title: "Engineer of Record Transition and Takeover | Apex Grid",
    description: "Engineering transition support for owners and contractors changing project responsibility, with records, scope, jurisdiction, and responsible-engineer review.",
    h1: "Engineer of Record Transition Support",
    kicker: "Project Continuity",
    answer: "Engineer-of-record transition support helps a project team understand records, open decisions, design responsibility, and jurisdictional steps when engineering responsibility changes. Apex Grid can review a defined takeover scope, but a new responsible engineer must independently establish a sufficient basis before accepting professional obligations.",
    sections: [
      { heading: "A documented handoff", body: "A transition review can inventory drawings, calculations, RFIs, submittals, permits, field changes, unresolved comments, and design assumptions. Missing records or changed conditions may require investigation, redesign, or coordination with the authority." },
      { heading: "Takeover is not a rubber stamp", body: "A responsible engineer cannot simply adopt another professional’s work without appropriate review. Share the complete project file, current status, jurisdiction correspondence, construction observations, and requested role." },
    ],
    faqs: [
      { q: "Can a new engineer take over another engineer’s plans?", a: "A new responsible engineer must independently review the work and determine what can be accepted, revised, or reissued under applicable professional and jurisdictional requirements." },
      { q: "What records are needed for a transition?", a: "Provide signed plans and calculations, revisions, RFIs, submittals, permit comments, field reports, contracts or role descriptions, and current project status." },
    ],
    phrases: ["engineer of record replacement", "engineering project takeover", "responsible engineer transition"],
    audience: "Owners, developers, contractors, and project managers",
    overlap: "Responsibility-transition intent not covered by general services or permit pages.",
  },
];

export const NEAR_ME_ENGINEERING_PAGE: EngineeringIntentPage = {
  slug: "engineering-near-me",
  title: "Engineering Firm Near Me for Commercial Project Support",
  description: "Find commercial structural, MEP, civil, PE, and permit engineering support near your search location, with jurisdiction and site access reviewed.",
  h1: "Commercial Engineering Firm Near Me",
  kicker: "Search by Project Need",
  answer: "“Near me” engineering results depend on the searcher’s actual location and do not by themselves establish an office or local availability. Apex Grid reviews jurisdiction, licensure, remote production needs, site-visit requirements, records, and qualified engineer availability before proposing commercial engineering support.",
  sections: [
    { heading: "What near-me engineering can mean", body: "Searchers may be looking for a commercial engineer, structural engineer, MEP engineer, civil engineer, professional or PE engineer, permit engineer, or engineer for stamped plans. These needs can share one intake path; the responsible discipline and project jurisdiction determine the appropriate review." },
    { heading: "Remote plans versus a site visit", body: "Plan production and calculation review may be performed from project records when appropriate. A site visit depends on location, safe access, scope, scheduling, and qualified engineer availability. A search result is not a promise of a nearby office, immediate availability, or coverage everywhere." },
    { heading: "Confirm the right service area", body: "Use the verified state and city service-area links below to review applicable local information. Apex Grid does not create local presence claims from a search phrase; jurisdiction, licensure, and project-specific requirements are confirmed during intake." },
  ],
  faqs: [
    { q: "Does Apex Grid have an engineering office near me?", a: "This page does not represent local offices. Search results depend on your actual location; ask us to review the project jurisdiction and whether remote work or a site visit is appropriate." },
    { q: "Can I hire a structural, MEP, or civil engineer near me?", a: "We can review those commercial engineering needs through one intake path, subject to discipline, project records, jurisdiction, licensure, site access, and qualified engineer availability." },
    { q: "Can you provide PE-stamped plans near me?", a: "A responsible engineer must confirm the project scope, jurisdictional authority, records, and basis for signing and sealing. Stamping is not automatic from a location-based inquiry." },
    { q: "How do I find the right permit engineer?", a: "Send the permit jurisdiction, correction notice or submittal requirements, existing plans, requested deliverable, and project address so the appropriate discipline and review path can be assessed." },
  ],
  phrases: ["engineering firm near me", "commercial engineer near me", "structural engineer near me", "MEP engineer near me", "civil engineer near me", "professional engineer near me", "PE engineer near me", "permit engineer near me", "engineer for stamped plans near me"],
  audience: "Commercial property owners, contractors, architects, developers, and facility teams",
  overlap: "One canonical near-me hub consolidates proximity synonyms; no duplicate city or discipline near-me pages.",
};

// Intent-specific depth is kept in the page definitions (not the renderer) so
// each page answers a different buying question and can be audited independently.
const RETAINED_DEPTH: Record<string, { heading: string; body: string }[]> = {
  "structural-engineering-letters": [
    { heading: "When a letter is the right deliverable", body: "A letter fits a defined professional question: an observed crack, an equipment load concern, a repair recommendation, or a response to an owner, insurer, contractor, or authority. It is not a shortcut around drawings and calculations when the proposed work changes a load path. Clarifying the recipient and decision prevents a letter from being used outside its intended scope." },
    { heading: "Evidence the engineer evaluates", body: "The review may compare photographs, measurements, prior reports, architectural backgrounds, structural drawings, permit records, maintenance history, and a site observation. Concealed conditions and inaccessible areas remain limitations. The engineer identifies which facts are observed, reported by others, inferred, or still unresolved." },
    { heading: "Letter deliverables and exclusions", body: "A deliverable can include a signed letter, annotated photographs, a concise condition narrative, assumptions, limitations, and recommendations for monitoring or further design. It does not automatically include repair drawings, destructive testing, code certification, or a warranty. Those items are separately evaluated when the facts require them." },
    { heading: "How buyers choose the scope", body: "Choose a targeted letter when the decision is narrow and evidence is adequate. Choose an assessment or repair design when multiple systems, concealed conditions, or construction changes are involved. Send the recipient’s question verbatim, the deadline, records, photographs, and any requested format so the engineer can define a defensible scope." },
  ],
  "construction-rfi-submittal-support": [
    { heading: "When RFI support adds value", body: "RFI support is appropriate when a field question, drawing conflict, substitution, or product submittal needs a responsible engineering interpretation. The best request identifies the exact sheet, specification section, proposed condition, and decision needed. A vague request to review an entire project delays the decision and can conceal a design change." },
    { heading: "A traceable review process", body: "The engineer compares the RFI with the current issued set, design criteria, specifications, calculations, photographs, and relevant trade information. The response records assumptions and identifies whether the answer is clarification, no-impact confirmation, revised detail, calculation, or a design change requiring formal documents." },
    { heading: "Typical construction deliverables", body: "Deliverables may include an RFI response, submittal disposition comments, annotated sheet, sketch, substitution comparison, load check, equipment support detail, or revised calculation. They do not transfer means-and-methods, sequencing, safety, procurement, or installation verification responsibilities from the contractor." },
    { heading: "Decision criteria for project teams", body: "Ask who owns the design, who can authorize a change, whether the authority must see a revision, and how the response enters the project record. Provide the RFI log number, latest documents, product data, field photographs, requested date, and consequences of waiting. A response should be coordinated before work proceeds on an affected condition." },
  ],
  "value-engineering-design-optimization": [
    { heading: "When to run value analysis", body: "Value analysis can be useful during concept design, permit design, procurement, or construction when cost, lead time, constructability, or maintenance concerns emerge. Earlier review usually leaves more options, while later review must account for contracts, approvals, purchased equipment, and work already installed." },
    { heading: "How alternatives are compared", body: "An engineering comparison considers performance, safety, code, energy, durability, maintenance access, procurement risk, installation labor, schedule, and lifecycle implications. The lowest initial cost is not automatically the best value. Each alternative should state its assumptions, interfaces, exclusions, and effects on other disciplines." },
    { heading: "Optimization deliverables", body: "A scoped engagement may produce an options matrix, basis-of-design comparison, constructability memo, coordination markup, alternate detail, revised calculation, or recommendation for further design. Cost opinions require an identified basis and are not guaranteed savings. The owner and project team decide whether to adopt an option." },
    { heading: "Buyer questions before approving an option", body: "Confirm the fixed performance criteria, budget signal, procurement status, warranty needs, authority review path, and decision date. Ask whether the recommendation affects structure, MEP capacity, energy compliance, fire-life-safety coordination, or maintenance. Provide the current drawings, specifications, estimates, and known constraints rather than requesting generic cost cutting." },
  ],
  "deferred-submittal-engineering": [
    { heading: "Confirm the deferred scope", body: "A deferred submittal starts with the permitted documents and the authority’s identification of what may be submitted later. Confirm whether the item is delegated design, specialty engineering, equipment support, or a coordinated system. A contractor’s preference alone does not make work eligible for deferred submission." },
    { heading: "Interfaces and design criteria", body: "The engineer reviews design loads, anchorage, clearances, access, equipment data, architectural interfaces, structural capacity, MEP connections, and applicable specifications. Missing criteria can require coordination with the original design team, manufacturer, contractor, or authority before calculations are prepared." },
    { heading: "Deferred package deliverables", body: "Depending on the item, deliverables include sealed specialty drawings, calculations, connection details, equipment schedules, installation criteria, coordination notes, and a response matrix. The package identifies assumptions and interfaces so the reviewer can understand how it fits the approved design." },
    { heading: "Submission and construction decisions", body: "Before procurement or installation, confirm who submits the package, which signatures and seals are required, whether the authority permits work to proceed, and how changes are recorded. A deferred package does not guarantee acceptance or eliminate the need for field coordination and inspection." },
  ],
  "engineer-of-record-transition": [
    { heading: "When a transition is warranted", body: "Transition support helps when ownership, design responsibility, personnel, or delivery method changes while drawings, calculations, RFIs, and permit records remain active. It can also expose whether the requested role is a peer review, completion effort, limited advisory role, or assumption of professional responsibility." },
    { heading: "Build a project record inventory", body: "Request issued and signed documents, calculation files, revisions, specifications, RFIs, submittals, correction notices, field reports, inspection results, contracts, and open decisions. A document register marks missing or conflicting information. Current site conditions should be compared with the latest design before responsibility is accepted." },
    { heading: "Transition deliverables", body: "A scoped review may produce a gap register, responsibility matrix, assumptions log, design-status memorandum, comment disposition, field-verification plan, or reissued engineering documents. The new engineer decides what can be relied upon, what must be recalculated, and what requires a new site observation." },
    { heading: "Choosing a responsible path", body: "Ask whether the project needs continuity, design completion, correction response, construction support, or a full replacement engineer of record. Clarify authority notifications, contract boundaries, seal requirements, and schedule dependencies. A transition is not a rubber stamp and does not automatically adopt another professional’s work." },
  ],
  "engineering-near-me": [
    { heading: "Start with the actual project location", body: "A near-me query reflects the searcher’s device or stated location, not a verified Apex Grid office or local-pack eligibility. The useful intake begins with the project address, state, authority, discipline, occupancy, requested document, and whether anyone must observe the property. Search proximity alone cannot establish service availability." },
    { heading: "Remote production and site visits differ", body: "Drawings, calculations, correction responses, and document reviews may be possible from records and photographs when the responsible engineer finds the basis adequate. A site visit depends on safe access, travel, scope, scheduling, jurisdiction, and qualified engineer availability. A remote review must not be described as a site observation." },
    { heading: "Compare the right engineering fit", body: "Commercial engineer, structural engineer, MEP engineer, civil engineer, PE, permit engineer, and stamped-plan searches describe different deliverables. Compare discipline experience, project records, jurisdictional requirements, and responsibility for signing and sealing—not only distance. The authority having jurisdiction determines submission requirements." },
    { heading: "What to send with a near-me inquiry", body: "Include the project address, requested outcome, permit or inspection correspondence, drawings, photographs, measurements, access constraints, jurisdiction, schedule, and recipient. Ask whether the work can be remote, whether a site visit is required, and which verified service-area information applies. The linked city and state pages are informational, not branch-office claims." },
  ],
};
const RETAINED_FAQS: Record<string, { q: string; a: string }[]> = {
  "structural-engineering-letters": [
    { q: "Who can rely on a structural engineering letter?", a: "The named recipient and project team may rely on its defined opinion and limitations; other uses require the responsible engineer’s review." },
    { q: "When is a letter not enough?", a: "A permit alteration, concealed condition, broad assessment, or repair may require drawings, calculations, testing, or a site investigation." },
  ],
  "construction-rfi-submittal-support": [
    { q: "What makes an RFI ready for engineering review?", a: "Include the RFI number, current sheets, specification, proposed condition, product data, photographs, and the decision requested." },
    { q: "Does an RFI response authorize construction?", a: "Not by itself. The contract team must follow its authorization, safety, quality, and document-control procedures." },
  ],
  "value-engineering-design-optimization": [
    { q: "Does value engineering mean reducing design quality?", a: "No. Alternatives are compared against required performance, code, durability, coordination, lifecycle, and owner priorities." },
    { q: "Who approves a value-engineering alternate?", a: "The owner and project team approve adoption, while the responsible engineer verifies the design and any authority submission needs." },
  ],
  "deferred-submittal-engineering": [
    { q: "Who identifies a deferred submittal?", a: "The permit documents and authority process identify eligible deferred scope; the contractor or supplier cannot create eligibility alone." },
    { q: "Can work start before deferred approval?", a: "Only if the permit and authority process allow it; the engineering package does not authorize work by itself." },
  ],
  "engineer-of-record-transition": [
    { q: "Does transition support automatically transfer professional responsibility?", a: "No. A new responsible engineer independently reviews the record and determines what obligations can be accepted." },
    { q: "What if the prior engineer’s files are incomplete?", a: "The gap may require field verification, recalculation, redesign, or a limited scope rather than adoption of undocumented work." },
  ],
  "engineering-near-me": [
    { q: "Do near-me results prove a local Apex Grid office exists?", a: "No. Organic results reflect search location and do not establish an office, local-pack eligibility, or site-visit availability." },
    { q: "Can near-me engineering be completed remotely?", a: "Some plan and document work can be remote when the records are adequate; the responsible engineer determines whether a site visit is needed." },
  ],
};
for (const page of ENGINEERING_INTENT_PAGES) {
  if (RETAINED_DEPTH[page.slug]) {
    page.sections.push(...RETAINED_DEPTH[page.slug]);
    page.sections.push(
      { heading: "Common failure modes to avoid", body: `For this ${page.h1.toLowerCase()} engagement, the most common avoidable failure is asking for a conclusion before identifying the decision, recipient, and evidence. Other risks include relying on superseded drawings, omitting a field change, treating a clarification as a design revision, or assuming an authority will accept an unstated basis. A clear request names exclusions and records what remains unknown.` },
      { heading: "Final intake checklist", body: `Before requesting ${page.h1.toLowerCase()}, assemble the project address, jurisdiction, current drawings or records, photographs, correspondence, requested format, recipient, access constraints, and schedule context. Explain what has already been reviewed and what outcome is needed. This lets the responsible engineer separate a document review from a site observation, calculation, design package, or authority response and recommend the narrowest defensible scope.` },
      { heading: "How the result is used", body: `The completed ${page.h1.toLowerCase()} should be routed to the person who requested it and kept with the current project record. Before relying on it, confirm that the described condition, product, drawing revision, jurisdiction, and recipient still match the project. If any material fact changes, pause and ask whether an update, additional observation, revised calculation, or new submission is needed. This discipline keeps a useful engineering deliverable from being reused for a different condition. Keep superseded versions clearly marked and record who accepted the next decision, when, and on what evidence.` },
    );
    if (RETAINED_FAQS[page.slug]) page.faqs.push(...RETAINED_FAQS[page.slug]);
  }
}
if (RETAINED_DEPTH[NEAR_ME_ENGINEERING_PAGE.slug]) {
  NEAR_ME_ENGINEERING_PAGE.sections.push(...RETAINED_DEPTH[NEAR_ME_ENGINEERING_PAGE.slug]);
  NEAR_ME_ENGINEERING_PAGE.sections.push(
    { heading: "Common failure modes to avoid", body: "A location phrase can mislead a buyer into assuming an office, immediate site visit, or jurisdictional qualification. Avoid that error by confirming the project address, authority, requested discipline, and deliverable before comparing providers. Organic proximity results are not proof of a branch or local-pack eligibility." },
    { heading: "Final intake checklist", body: "Send the address, drawings, photographs, permit correspondence, access rules, jurisdiction, schedule context, requested recipient, and whether remote work is acceptable. Explain what must be observed directly. The engineer can then distinguish document production from site work and identify whether a verified service-area page is relevant." },
  );
  NEAR_ME_ENGINEERING_PAGE.faqs.push(...RETAINED_FAQS[NEAR_ME_ENGINEERING_PAGE.slug]);
}