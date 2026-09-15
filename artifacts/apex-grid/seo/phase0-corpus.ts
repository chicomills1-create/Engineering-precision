/**
 * Confirmed Phase 0 editorial corpus.
 *
 * These records are deliberately jurisdiction-neutral unless a record includes
 * an official state board link.  They are not a substitute for project intake,
 * an AHJ determination, or a responsible engineer's independent review.
 */

export type Phase0Faq = { question: string; answer: string };
export type Phase0AeoSection = { heading: string; body: string; bullets?: string[] };
export type Phase0AeoLink = { label: string; href: string };

export type Phase0AeoPage = {
  slug: string;
  title: string;
  description: string;
  h1: string;
  answer: string;
  faqs: Phase0Faq[];
  topic: string;
  /** Optional deep-dive content is reserved for intentionally bespoke answer records. */
  sections?: Phase0AeoSection[];
  serviceHref?: string;
  extraLinks?: Phase0AeoLink[];
  founderNote?: string;
};

export const PHASE0_AEO_PAGES: Phase0AeoPage[] = [
  ["do-i-need-a-structural-engineer", "Do I Need a Structural Engineer? | Apex Grid", "When a project changes a load path, affects life safety, or needs sealed structural documents, a licensed structural engineer should define and document the work.", "When should I hire a structural engineer?", "Call a structural engineer before removing a load-bearing wall, adding a story or equipment load, altering foundations, investigating distress, or submitting structural documents for permit. The engineer confirms the existing conditions, design loads, applicable code path, and documents that can be responsibly sealed.", "Structural Engineering"],
  ["what-is-a-pe-stamp", "What Is a PE Stamp? | Apex Grid Engineering", "A PE stamp identifies professional responsibility for engineering work that a licensed professional engineer has reviewed, performed, and is authorized to seal.", "What does a PE stamp mean?", "A PE stamp is not a rubber-stamp service or a guarantee of approval. It identifies the licensed engineer who takes professional responsibility for defined engineering documents after reviewing the basis, calculations, drawings, and jurisdictional requirements. The responsible engineer and the applicable board rules control whether a document may be sealed.", "Professional Engineering"],
  ["what-is-mep-engineering", "What Is MEP Engineering? | Apex Grid", "MEP engineering coordinates mechanical, electrical, and plumbing systems with the building design, applicable codes, equipment, utilities, and permit documents.", "What is MEP engineering?", "MEP engineering is the design and documentation of mechanical, electrical, and plumbing systems for a defined project. It can include HVAC loads and distribution, electrical power and lighting, plumbing and gas systems, controls, equipment coordination, and code-compliance documentation. The exact scope depends on the building, jurisdiction, and responsible professionals.", "MEP Engineering"],
  ["how-much-does-mep-engineering-cost", "How Much Does MEP Engineering Cost? | Apex Grid", "MEP engineering fees depend on discipline scope, building complexity, existing conditions, coordination, deliverables, jurisdiction, and schedule—not a universal published price.", "How much does MEP engineering cost?", "There is no responsible universal MEP engineering price. Fee depends on the systems and disciplines involved, building size and occupancy, new versus existing conditions, equipment and utility information, modeling or calculations, permit deliverables, coordination, site work, and revision scope. A useful proposal states deliverables and assumptions rather than hiding scope behind a per-square-foot number.", "MEP Engineering"],
  ["how-much-does-a-pe-stamp-cost", "How Much Does a PE Stamp Cost? | Apex Grid", "A PE seal is part of responsible engineering work; its cost depends on the scope, review, design, calculations, coordination, and jurisdictional requirements.", "How much does a PE stamp cost?", "A PE stamp should not be priced as a detached signature. The fee reflects the engineering the responsible professional must perform or independently review, the records and field evidence required, the disciplines and deliverables, coordination, revisions, and applicable board or AHJ requirements. A low standalone price can hide missing engineering responsibility and is not a safe basis for a permit submission.", "Professional Engineering"],
  ["how-long-does-plan-check-take", "How Long Does Plan Check Take? | Apex Grid", "Plan-check duration depends on the authority, submittal completeness, queue, project type, review cycles, corrections, and applicant actions; it is not a universal promise.", "How long does plan check take?", "There is no universal plan-check duration. Separate engineering production, applicant intake, the AHJ's completeness review, substantive plan review, correction response, resubmittal, and any interagency review. The authority's published target or statutory window may describe one step and does not guarantee approval or total permit time.", "Plan Check"],
  ["what-are-engineering-calculations-for-a-permit", "What Are Engineering Calculations for a Permit? | Apex Grid", "Permit engineering calculations document the loads, assumptions, methods, and checks supporting a proposed structural, MEP, civil, or energy design.", "What are engineering calculations for a permit?", "Engineering calculations for a permit are the technical record behind a design: they translate project inputs into load checks, equipment sizing, capacity evaluations, drainage or utility analysis, energy results, or other required evidence. They are coordinated with the drawings and reviewed by the responsible engineer; the AHJ decides what it requires and whether the package is acceptable.", "Engineering Calculations"],
  ["what-is-title-24", "What Is Title 24? California Building Standards | Apex Grid", "Title 24 is California's compilation of building standards; Part 6 contains the California Energy Code and its compliance documentation requirements.", "What is Title 24?", "California Title 24 is the California Code of Regulations title containing the state's building standards. For commercial energy work, Title 24 Part 6 is the California Energy Code. The applicable edition, project type, alteration rules, forms, and local submission requirements must be confirmed for the project rather than inferred from a general summary.", "Energy Compliance"],
  ["title-24-vs-iecc", "Title 24 vs. IECC: What Is the Difference? | Apex Grid", "Title 24 Part 6 is California's state energy code, while the IECC is a model code adopted and amended by jurisdictions; the applicable edition and path control.", "What is the difference between Title 24 and the IECC?", "Title 24 Part 6 is California's energy standard and compliance framework. The IECC is a model energy code that states and local jurisdictions may adopt with amendments, sometimes alongside an ASHRAE compliance path. They are not interchangeable labels: identify the project's state, AHJ, adopted edition, climate data, and required documentation before selecting a method.", "Energy Compliance"],
  ["what-is-a-plan-check-correction", "What Is a Plan-Check Correction? | Apex Grid", "A plan-check correction is an AHJ comment identifying missing, unclear, inconsistent, or noncompliant information in a submitted permit package.", "What is a plan-check correction?", "A plan-check correction is part of the authority's review record. It may request clarification, a drawing change, a calculation, a code explanation, or action by another project participant. A sound response preserves the exact comment, assigns responsibility, revises the affected documents when needed, and avoids treating a response letter as a guarantee of approval.", "Plan Check"],
  ["risks-of-buying-pe-stamps-fiverr-upwork", "Risks of Buying PE Stamps on Fiverr or Upwork | Apex Grid", "Buying an isolated PE stamp through a marketplace can create licensing, professional-responsibility, document-integrity, permit, insurance, and life-safety risks.", "What are the risks of buying PE stamps on Fiverr or Upwork?", "A PE seal is not a commodity or a shortcut around engineering review. An anonymous marketplace transaction may leave unclear who designed the work, whether the engineer is licensed and authorized for the project, whether the design basis was verified, and who accepts responsible charge. It can lead to rejected permits, disciplinary exposure, uninsured errors, unsafe construction, and costly redesign. Hire a responsible professional for defined engineering work instead of purchasing an isolated signature.", "Professional Engineering"],
  ["how-does-energy-code-compliance-work", "How Does Energy Code Compliance Work? | Apex Grid", "Energy compliance matches the adopted code path, project inputs, and documentation to the jurisdiction's required submittal.", "How does commercial energy-code compliance work?", "The design team identifies the adopted energy code and compliance path, gathers envelope, lighting, HVAC, controls, and operating inputs, performs the required calculations or model, and coordinates the report with the permit drawings. The AHJ determines whether the submitted documentation is complete and acceptable.", "Energy Compliance"],
  ["what-documents-does-a-pe-need", "What Documents Does a PE Need? | Apex Grid", "A responsible engineer needs enough project, site, existing-condition, and design information to independently evaluate the requested scope.", "What does a professional engineer need to start?", "Send the project address, scope, current architectural background, existing drawings, photographs or field measurements, equipment data, survey or geotechnical information where relevant, schedule, AHJ comments, and any prior calculations. The engineer decides what evidence is sufficient and what requires verification.", "Professional Engineering"],
  ["can-an-engineer-seal-another-engineers-drawings", "Can an Engineer Seal Another Engineer's Drawings? | Apex Grid", "A seal requires independent professional responsibility; it is not a stamp-for-hire endorsement of unchanged work.", "Can a PE seal another engineer's drawings?", "Not as a simple unchanged stamp. A PE must independently review or perform the engineering, verify the design basis, coordinate the documents, and determine whether accepting responsibility is allowed and appropriate under the applicable board rules and AHJ process.", "Professional Engineering"],
  ["what-is-responsible-charge", "What Is Responsible Charge in Engineering? | Apex Grid", "Responsible charge means the engineer has the professional control and knowledge required to direct, review, and take responsibility for the work within the authorized scope.", "What does responsible charge mean for engineering documents?", "Responsible charge is a professional relationship, not merely a signature. The engineer must have sufficient knowledge of the project, direct or review the engineering work as required, comply with board rules, and accept responsibility only for work within the engineer's competence, authorization, and jurisdictional authority.", "Professional Engineering"],
  ["what-is-a-permit-ready-engineering-package", "What Is a Permit-Ready Engineering Package? | Apex Grid", "A permit-ready package coordinates the defined engineering drawings, calculations, notes, forms, and supporting documents required for a particular AHJ submission.", "What is included in a permit-ready engineering package?", "A package may include discipline drawings, calculations, schedules, specifications, energy documents, product information, professional seals, response forms, and coordination notes. The exact checklist, file format, signatures, and supporting materials come from the AHJ and project scope; permit-ready never means approval is guaranteed.", "Permit Engineering"],
  ["when-does-a-pe-need-a-site-visit", "When Does a PE Need a Site Visit? | Apex Grid", "A site visit is considered when direct observation is needed to resolve existing conditions, distress, access, measurements, or professional responsibility questions.", "When does a professional engineer need to visit a site?", "A PE may need a site visit for structural distress, uncertain or concealed conditions, complex modifications, forensic work, high-consequence decisions, or inadequate photographs and measurements. A remote workflow can be appropriate when reliable records and field evidence answer the engineering question; the responsible engineer decides.", "Professional Engineering"],
  ["what-is-engineer-of-record", "What Is an Engineer of Record? | Apex Grid", "The engineer of record is the professional engineer identified as responsible for the defined engineering documents and scope under the applicable rules.", "What does an engineer of record do?", "An engineer of record establishes or accepts responsibility for a defined engineering scope, directs or reviews the work, coordinates relevant documents, and signs or seals eligible deliverables when authorized. The role does not transfer an AHJ's authority or make the engineer responsible for unrelated design or construction work.", "Professional Engineering"],
  ["what-is-a-code-compliance-review", "What Is a Code Compliance Review? | Apex Grid", "A code compliance review checks the defined design against the adopted provisions and documents the assumptions, exceptions, calculations, and unresolved authority questions.", "What happens in a code compliance review?", "The reviewer identifies the governing code edition and scope, checks relevant life-safety and engineering criteria, traces design inputs to drawings and calculations, records exceptions or alternative methods, and flags decisions owned by the AHJ or another discipline. The review is project-specific and does not replace the authority's official plan review.", "Code Compliance"],
].map(([slug, title, description, h1, answer, topic]) => ({
  slug,
  title,
  description,
  h1,
  answer,
  topic,
  faqs: [
    { question: `What is the short answer about ${topic.toLowerCase()}?`, answer },
    { question: `What information does ${topic.toLowerCase()} depend on?`, answer: `The answer depends on the project scope, governing jurisdiction, current records, design inputs, and the responsible professional's independent review. ${answer}` },
    { question: `Does this guarantee permit approval?`, answer: "No. Engineering documents support a defined project scope, while the authority having jurisdiction controls its interpretation, completeness decision, review queue, and approval." },
    { question: "What should I send for an initial review?", answer: "Send the project address, plain-language scope, current drawings, existing-condition records, relevant calculations or comments, schedule, and the authority or code information already available. The responsible engineer will identify gaps." },
  ],
})) satisfies Phase0AeoPage[];

/**
 * Apex SEO/AEO Batch 1. Unlike the confirmed starter records above, these
 * records carry a project-specific deep dive and a deliberately relevant
 * service route. Keep the generic starter records unchanged: their generated
 * sections and /services/ link are part of the established Phase 0 contract.
 */
export const PHASE0_BATCH1_AEO_PAGES: Phase0AeoPage[] = [
  {
    slug: "load-bearing-wall-removal",
    title: "Load-Bearing Wall Removal Guide | Apex Grid Engineering",
    description: "Do you need engineering to remove a load-bearing wall? Review the load path, replacement support, temporary-work coordination, and permit documents for scope.",
    h1: "Do I need a structural engineer to remove a load-bearing wall?",
    answer: "Removing a load-bearing wall requires a structural engineer to identify what the wall supports, design the replacement beam or frame and its end supports, and document how the load reaches the foundation. The existing framing, floor and roof loads, openings, utilities, and construction sequence must be verified before a responsible engineer can define the permit documents.",
    topic: "Load-Bearing Wall Removal",
    serviceHref: "/services/structural",
    founderNote: "I'm Jeremy Mills, CEO & Founder of Apex Grid Engineering and a U.S. Air Force veteran. Apex Grid is veteran-owned; I'm not a PE, and this perspective does not replace the responsible engineer's judgment.",
    sections: [
      {
        heading: "Start with the load path, not the opening width",
        body: "A wall can carry floor, roof, lateral, or transfer loads even when it looks like a partition. In an intake conversation, I ask clients to show what is above and below the wall so the responsible engineer can trace framing, bearing points, posts, beams, joists, rafters, foundations, and any offset or discontinuity that could change the force path.",
        bullets: ["Identify supported floors, roofs, walls, and concentrated reactions", "Verify framing direction, member sizes, spans, and bearing conditions", "Check posts, footings, crawlspaces, basements, and slab support below", "Separate structural scope from plumbing, electrical, fire, and architectural work"],
      },
      {
        heading: "The replacement support is a system",
        body: "A beam calculation alone does not describe the complete design. The engineer evaluates beam strength and deflection, posts or frame members, connections, lateral restraint, bearing, and the foundation or support condition receiving the reaction. Material availability and the desired clear opening can affect the feasible arrangement.",
        bullets: ["Beam or header size, material, span, and serviceability", "Post geometry and connection details at each end", "Bearing length, crushing, eccentricity, and load transfer", "Foundation reactions and any required footing or reinforcement work"],
      },
      {
        heading: "Construction sequence matters",
        body: "Temporary shoring is part of the risk discussion, but its means and methods remain a construction responsibility unless specifically included in the engineering scope. The permit set should make the permanent design clear and identify assumptions or temporary-work boundaries so demolition does not begin from an unverified sketch.",
        bullets: ["Document existing conditions before demolition", "Coordinate shoring, sequencing, access, and utility isolation with the contractor", "Keep approved structural revisions aligned with architectural plans", "Do not infer permit approval from a beam schedule or preliminary opinion"],
      },
    ],
    extraLinks: [{ label: "Structural engineering services", href: "/services/structural" }],
    faqs: [
      { question: "Can I tell whether a wall is load-bearing from a floor plan?", answer: "A floor plan can provide clues, but it usually does not establish the complete load path. Framing direction, supports below, roof conditions, alterations, and concealed construction should be verified by the responsible structural engineer." },
      { question: "Does removing the wall always require a beam?", answer: "Not always. A beam, header, post-and-beam frame, or another support arrangement may be appropriate depending on the loads, span, supports, and design constraints. The structural design determines the replacement system." },
      { question: "Who designs temporary shoring during wall removal?", answer: "The contractor is generally responsible for safe means and methods, while the engineer may need to design or review temporary shoring when it is included in the agreed scope or needed for a specific condition. The roles and limits should be stated before work starts." },
      { question: "What should I send for a wall-removal review?", answer: "Send the address, proposed opening and architectural plans, photos of both sides and the spaces above and below, framing or as-built records, foundation information, and any prior alterations. The engineer will identify what still requires field verification." },
    ],
  },
  {
    slug: "home-addition-second-story",
    title: "Home Addition & Second-Story Engineering | Apex Grid",
    description: "Do you need engineering for a home addition or second story? Review existing foundations, framing, lateral resistance, and the new load path for design.",
    h1: "Do I need a structural engineer for a home addition or second story?",
    answer: "A home addition or second story requires an engineer to evaluate the existing structure and design the new gravity and lateral load paths. The result depends on the existing foundation and framing, proposed geometry and loads, connections between old and new construction, site information, and the documents required for the project.",
    topic: "Home Addition and Second Story Engineering",
    serviceHref: "/services/structural",
    founderNote: "I'm Jeremy Mills, CEO & Founder of Apex Grid Engineering and a U.S. Air Force veteran. Apex Grid is veteran-owned; I'm not a PE, and this perspective does not replace the responsible engineer's judgment.",
    sections: [
      {
        heading: "Evaluate the existing house before adding load",
        body: "The proposed story or room addition is not designed in isolation. I ask clients to gather existing plans, field measurements, photographs, framing direction, member conditions, foundation geometry, settlement evidence, and prior alterations so the responsible engineer can establish whether the current structure can receive new reactions and how uncertainty must be resolved.",
        bullets: ["Map existing floor, roof, wall, and foundation framing", "Locate concentrated reactions and discontinuous or altered supports", "Record cracking, settlement, water damage, corrosion, or other distress", "Confirm which dimensions and materials are measured versus assumed"],
      },
      {
        heading: "Design new and existing load paths together",
        body: "A second story adds gravity loads and can change wind or seismic demands, while a side addition can introduce differential movement and new foundation reactions. The design coordinates new beams, walls, diaphragms, collectors, hold-downs, connections, footings, and interfaces with the architectural layout rather than treating each detail as a standalone component.",
        bullets: ["New floor and roof loads, bearing lines, and transfer conditions", "Lateral-force-resisting elements and continuity at the addition joint", "Foundation capacity, footing enlargement, underpinning, or new support options", "Connection details for compatible movement and construction tolerances"],
      },
      {
        heading: "Coordination controls downstream surprises",
        body: "Architectural, structural, geotechnical, energy, mechanical, and permitting inputs can affect the design. A responsible package identifies the adopted code basis and required investigations, coordinates openings and equipment, and records exclusions instead of assuming that a general home-addition diagram answers every site condition.",
        bullets: ["Current architectural backgrounds and proposed room layouts", "Survey, soil, flood, or other site information when relevant", "HVAC, plumbing, electrical, and equipment impacts on framing", "A revision record when owner or contractor changes affect the structure"],
      },
    ],
    extraLinks: [{ label: "Existing-building structural services", href: "/services/structural" }],
    faqs: [
      { question: "Can an existing foundation support a second story?", answer: "It cannot be determined from the number of stories alone. Foundation dimensions, soil, existing loads, condition, reinforcement, proposed reactions, and the applicable design criteria must be evaluated by the responsible engineer." },
      { question: "Does a second story need a separate lateral design?", answer: "The addition must be evaluated as part of the building's complete lateral system. The engineer determines how new diaphragms, walls, frames, collectors, and connections interact with the existing structure." },
      { question: "Will an addition always require underpinning?", answer: "No. Underpinning is one possible response when existing support is inadequate or a new load cannot be transferred safely, but the appropriate solution depends on the verified structure, soil, reactions, and proposed geometry." },
      { question: "What records help start an addition review?", answer: "Provide existing and proposed plans, sections and elevations, foundation or as-built records, site photos, information about prior remodels or distress, and any survey or geotechnical material. Missing records may require field investigation." },
    ],
  },
  {
    slug: "engineered-deck-drawings",
    title: "Engineered Deck Drawings & Plans | Apex Grid Engineering",
    description: "Do you need engineered deck drawings? Learn what to show for load paths, connections, ledger or freestanding support, stairs, guards, and footings.",
    h1: "Do I need engineered deck drawings?",
    answer: "Engineered deck drawings should show the deck's layout, design loads, beams, joists, posts, footings, connections, ledger or freestanding support, stairs, guards, and the assumptions that make the load path understandable. The responsible engineer tailors the package to the existing building, site, materials, and authority requirements.",
    topic: "Engineered Deck Drawings",
    serviceHref: "/services/structural",
    founderNote: "I'm Jeremy Mills, CEO & Founder of Apex Grid Engineering and a U.S. Air Force veteran. Apex Grid is veteran-owned; I'm not a PE, and this perspective does not replace the responsible engineer's judgment.",
    sections: [
      {
        heading: "Draw the complete deck load path",
        body: "A deck package should let a reviewer follow loads from decking and framing through joists, beams, posts, connections, and footings or other supports. I look for a clear attachment or freestanding-support story in the intake materials; where a deck attaches to a house, a ledger line on a plan is not proof that the building can accept the connection.",
        bullets: ["Plan, elevations, sections, member sizes, spans, and spacing", "Beam-to-post and post-to-footing load transfer", "Ledger, rim, flashing, fastener, and house-framing assumptions", "Lateral connection or bracing details where part of the design"],
      },
      {
        heading: "Site and use conditions change the details",
        body: "Height, stairs, guard geometry, drainage, soil, frost or exposure criteria, occupancy, and proximity to property or other structures affect the design and coordination. A freestanding deck may need a different foundation and lateral strategy than one relying on an existing wall.",
        bullets: ["Footing size and depth based on verified soil and project criteria", "Stair stringers, landings, guards, handrails, and attachment points", "Surface drainage, post durability, and separation from the building", "Snow, wind, seismic, or other project-specific load inputs"],
      },
      {
        heading: "A drawing set is more than a stamped detail",
        body: "The final deliverable may include calculations, notes, details, schedules, and a seal when the responsible engineer accepts the eligible work. Product instructions, site work, construction means, and authority review remain separate responsibilities and should be coordinated rather than implied by a generic deck template.",
        bullets: ["Current architectural or site background and deck dimensions", "Photos of the attachment wall, rim, foundation, and existing framing", "Manufacturer data for proprietary connectors or support systems", "Clear assumptions, exclusions, and field-verification notes"],
      },
    ],
    extraLinks: [{ label: "Structural design services", href: "/services/structural" }],
    faqs: [
      { question: "Can a deck be designed from a sketch alone?", answer: "A sketch can communicate the concept, but the engineer may need dimensions, height, framing, attachment conditions, soil or foundation information, site photos, and product data before preparing responsible drawings." },
      { question: "Is a ledger connection always acceptable?", answer: "No. The existing wall, rim or floor framing, fasteners, moisture detailing, loads, and available access must support the proposed connection. A freestanding design may be more appropriate for some conditions." },
      { question: "Do engineered deck drawings include stairs and guards?", answer: "They should identify the structural scope and interfaces for stairs, guards, and handrails when those items are part of the requested design. Architectural and authority requirements still need confirmation for the project." },
      { question: "Does an engineering drawing guarantee a deck permit?", answer: "No. The authority having jurisdiction controls its checklist, interpretation, review, and decision. The drawings should be coordinated to the current project scope and available records." },
    ],
  },
  {
    slug: "pe-stamp-adu-plans",
    title: "PE Stamp for ADU Plans: Scope | Apex Grid Engineering",
    description: "Do you need a PE stamp for ADU plans? Learn how structural scope, independent review, existing conditions, and authority requirements shape a seal responsibly.",
    h1: "Do I need a PE stamp for ADU plans?",
    answer: "A PE stamp for ADU plans is not a detached signature for an entire drawing set. It represents a responsible engineer's work on an identified engineering scope—often structural calculations and drawings—after reviewing the ADU design, existing conditions, loads, foundations, and project requirements and determining that sealing is appropriate.",
    topic: "PE Stamp for ADU Plans",
    serviceHref: "/services/california-adu-structural-engineering",
    founderNote: "I'm Jeremy Mills, CEO & Founder of Apex Grid Engineering and a U.S. Air Force veteran. Apex Grid is veteran-owned; I'm not a PE, and this perspective does not replace the responsible engineer's judgment.",
    sections: [
      {
        heading: "Define the discipline and document boundary",
        body: "I do not treat a requested seal as a commodity or as a label for every sheet. An ADU plan set can contain architectural, structural, energy, civil, MEP, survey, and other work. The responsible PE determines which eligible engineering documents can be accepted within the applicable authorization and competence.",
        bullets: ["Identify the exact sheets, calculations, and engineering discipline", "Separate design by others from work accepted by the responsible engineer", "Confirm the project location, authority process, and applicable board rules", "State whether existing-building evaluation or site work is included"],
      },
      {
        heading: "Independent review is the substance of the seal",
        body: "If another person prepared the ADU drawings, the engineer must have enough information and control to independently evaluate the engineering basis. That can require current backgrounds, field evidence, calculations, structural details, design criteria, foundation information, and coordination with the architect or designer; a quick visual scan is not automatically an independent review.",
        bullets: ["Check loads, load paths, member capacities, connections, and foundations", "Reconcile the structural set with architectural dimensions and openings", "Verify assumptions about existing construction and concealed conditions", "Document revisions, limitations, unresolved questions, and professional decisions"],
      },
      {
        heading: "Use official requirements for the actual project",
        body: "ADU requirements and submission checklists vary by authority and can change. The project team should obtain the current official instructions, then ask the responsible engineer what evidence is needed before a seal can be considered. A seal supports the defined work; it does not guarantee completeness or approval.",
        bullets: ["Current ADU plan set and authority checklist", "Site address, survey or property information, and existing records", "Photos, measurements, prior permits, and alteration history", "Requested deliverables, schedule, and any review comments"],
      },
    ],
    extraLinks: [{ label: "ADU structural engineering service", href: "/services/california-adu-structural-engineering" }],
    faqs: [
      { question: "Can a PE stamp every sheet in an ADU plan set?", answer: "Not automatically. The seal applies only to eligible engineering work for which the engineer accepts responsibility; architectural, survey, geotechnical, MEP, and other disciplines may require their own responsible professionals." },
      { question: "Can a PE stamp ADU plans drawn by someone else?", answer: "Possibly, but not as an unchanged stamp-for-hire transaction. The engineer must independently review or perform the relevant engineering, verify the basis and records, and determine whether accepting responsibility is permitted and appropriate." },
      { question: "Does an ADU PE stamp guarantee approval?", answer: "No. The authority having jurisdiction controls its required documents, review, interpretation, and approval decision. The responsible engineer controls only the accepted engineering scope." },
      { question: "What should I provide before asking about an ADU seal?", answer: "Provide the project address, complete current plan set, structural calculations if any, existing-condition records, site and foundation information, authority comments or checklist, and the specific sheets or engineering scope that need review." },
    ],
  },
  {
    slug: "garage-conversion",
    title: "Garage Conversion Engineering | Apex Grid Engineering",
    description: "Do you need engineering for a garage conversion? Review openings, floor elevation, foundations, lateral walls, loads, and existing connections before design.",
    h1: "Do I need structural engineering for a garage conversion?",
    answer: "A garage conversion needs a project-specific review of the existing slab and foundation, wall and roof framing, garage-door opening, new windows or doors, floor elevation, moisture exposure, and any change in loads or lateral resistance. The engineer documents only the structural scope supported by verified records and the proposed architectural design.",
    topic: "Garage Conversion Engineering",
    serviceHref: "/services/structural",
    founderNote: "I'm Jeremy Mills, CEO & Founder of Apex Grid Engineering and a U.S. Air Force veteran. Apex Grid is veteran-owned; I'm not a PE, and this perspective does not replace the responsible engineer's judgment.",
    sections: [
      {
        heading: "The garage is an existing structure, not a blank room",
        body: "Conversion design starts by understanding how the garage carries roof and lateral loads and how its slab, stem walls, footings, and framing were built. I ask clients for photos, measurements, exposed edges, and evidence of settlement or water intrusion when construction records are incomplete, so the responsible engineer can evaluate the existing structure.",
        bullets: ["Record slab elevation, cracks, joints, drainage, and visible foundation conditions", "Verify wall, roof, header, and connection framing around the garage opening", "Identify prior additions, alterations, damage, and concealed-condition limits", "Coordinate floor and wall interfaces with the existing dwelling"],
      },
      {
        heading: "Openings and floor changes can move loads",
        body: "Replacing an overhead door with a wall, windows, or a new entry can require new framing and anchorage. Raising or replacing a floor can affect foundation height, moisture detailing, wall bracing, stairs, and connections. The structural design must follow each changed load path instead of assuming a cosmetic infill.",
        bullets: ["Design infill framing and support at the former garage opening", "Evaluate new headers, posts, shear elements, and hold-down or anchorage needs", "Coordinate floor framing or slab work with existing foundations and thresholds", "Check new equipment, storage, roof, and partition loads"],
      },
      {
        heading: "Coordinate non-structural requirements without claiming them",
        body: "A conversion can also involve energy, ventilation, plumbing, electrical, fire, accessibility, and land-use questions. Those requirements belong to the appropriate disciplines and authority; structural engineering should identify interfaces and assumptions without presenting a generic answer as a local approval determination.",
        bullets: ["Current architectural conversion plans and occupancy assumptions", "Site and existing-building records needed for engineering", "MEP and envelope changes that add penetrations or equipment", "A coordinated response record for any authority comments"],
      },
    ],
    extraLinks: [{ label: "Existing-building structural services", href: "/services/structural" }],
    faqs: [
      { question: "Does a garage conversion always need a new foundation?", answer: "No. The appropriate foundation response depends on the existing construction, proposed floor and wall changes, loads, soil and moisture conditions, and the project's design criteria. The engineer evaluates the actual structure." },
      { question: "Is filling the garage door opening structural work?", answer: "It can be. The infill may need to transfer roof or lateral loads and connect to existing walls, slab, and foundation. The required framing and anchorage depend on the verified load path." },
      { question: "Can I convert a garage using the original plans?", answer: "Original plans are useful evidence but do not establish current conditions or show later alterations. The responsible engineer compares them with field records and the proposed conversion before relying on them." },
      { question: "What should I send for a garage conversion review?", answer: "Send existing and proposed plans, photos inside and outside, garage-door and roof framing information, slab and foundation details, records of prior work or damage, and the requested conversion scope." },
    ],
  },
  {
    slug: "retaining-wall",
    title: "Retaining Wall Engineering | Apex Grid Engineering",
    description: "Do you need retaining wall engineering? Review geometry, soil, water, surcharge, drainage, stability, foundation support, and construction assumptions.",
    h1: "Do I need structural engineering for a retaining wall?",
    answer: "A retaining wall needs engineering that evaluates lateral earth pressure, water, surcharge, sliding, overturning, bearing, structural strength, drainage, and overall stability for the actual geometry and soil conditions. The drawings and calculations must identify assumptions about backfill, groundwater, adjacent loads, foundations, and construction.",
    topic: "Retaining Wall Engineering",
    serviceHref: "/services/civil",
    founderNote: "I'm Jeremy Mills, CEO & Founder of Apex Grid Engineering and a U.S. Air Force veteran. Apex Grid is veteran-owned; I'm not a PE, and this perspective does not replace the responsible engineer's judgment.",
    sections: [
      {
        heading: "Soil and water are design inputs",
        body: "Wall height alone is not enough to select a section. I ask for soil strength and unit weight, backfill slope, groundwater, drainage, frost or exposure criteria, nearby structures, and construction access because those inputs affect pressures and support conditions; a geotechnical report or other site evidence may be needed before the engineer can accept assumptions.",
        bullets: ["Wall height, embedment, batter, geometry, and exposed faces", "Backfill properties, slope, compaction, and groundwater assumptions", "Surface drainage, weeps, drains, filters, outlets, and maintenance", "Adjacent foundations, vehicles, buildings, property limits, and other surcharge"],
      },
      {
        heading: "Check internal and external stability",
        body: "A retaining wall design checks the wall components and how the whole system interacts with the soil. Stem, footing, reinforcement, connections, and facing must work with sliding, overturning, bearing, settlement, and global stability checks; drainage details matter because water pressure can change the result materially.",
        bullets: ["Sliding, overturning, bearing pressure, and settlement", "Stem, toe, heel, counterfort, tie, or modular-system strength", "Global or compound stability where site geometry warrants it", "Construction joints, reinforcement development, and durability details"],
      },
      {
        heading: "Construction and property interfaces need clarity",
        body: "Excavation, temporary support, neighbor protection, utility conflicts, and access can be separate engineering or contractor responsibilities. The package should identify those boundaries and avoid assuming a wall design authorizes work on another property or resolves an authority's grading, drainage, easement, or land-use decision.",
        bullets: ["Current survey or site plan with grades and property constraints", "Geotechnical recommendations or documented basis for soil assumptions", "Utility, excavation, access, and temporary-support coordination", "Details for inspection, drainage outlets, and unresolved field conditions"],
      },
    ],
    extraLinks: [{ label: "Civil engineering services", href: "/services/civil" }],
    faqs: [
      { question: "Can a retaining wall be designed from its height alone?", answer: "No. Height is only one input. Soil, water, surcharge, geometry, foundation support, drainage, and overall site stability can change the design substantially." },
      { question: "Does drainage eliminate retaining-wall water pressure?", answer: "A designed drainage system can manage water when it is constructible, maintained, and connected to an appropriate outlet, but it should not be treated as an unverified assumption. The engineer documents the water-control basis and residual design condition." },
      { question: "Who is responsible for temporary excavation support?", answer: "Temporary works and means and methods are typically the contractor's responsibility unless specifically designed or reviewed under the engineering scope. The project team should resolve the boundary before excavation." },
      { question: "What information starts a retaining-wall review?", answer: "Provide a surveyed site plan or reliable dimensions, wall geometry, grades, nearby structures and loads, soil or geotechnical information, drainage concept, property constraints, and photographs of existing conditions." },
    ],
  },
  {
    slug: "structural-letter-solar-panels",
    title: "Structural Solar Panel Letter | Apex Grid Engineering",
    description: "Do you need a structural letter for solar panels? Learn what to document about equipment, attachments, roof framing, loads, assumptions, and limits clearly.",
    h1: "Do I need a structural letter for solar panels?",
    answer: "A structural letter for solar panels should identify the roof or supporting structure reviewed, the photovoltaic equipment and attachment or ballast system, applicable load inputs, observed or documented conditions, analysis performed, and limitations. A letter is appropriate only when its defined scope gives the responsible engineer enough evidence to support the stated conclusion; it is not a universal shortcut to a seal or approval.",
    topic: "Structural Solar Panel Letters",
    serviceHref: "/services/structural",
    founderNote: "I'm Jeremy Mills, CEO & Founder of Apex Grid Engineering and a U.S. Air Force veteran. Apex Grid is veteran-owned; I'm not a PE, and this perspective does not replace the responsible engineer's judgment.",
    sections: [
      {
        heading: "Identify the roof and solar system",
        body: "The review needs more than a panel count. I look for the module and rail layout, attachment spacing, ballast weights, inverter and equipment locations, roof zones, existing framing, roof age or condition, and proposed installation method so the responsible engineer can identify the loads and connections that require review.",
        bullets: ["Current roof plan, framing plan, and equipment layout", "Panel, rail, attachment, ballast, and manufacturer data", "Roof sheathing, joists or rafters, beams, trusses, and support lines", "Existing rooftop equipment, penetrations, repairs, and access conditions"],
      },
      {
        heading: "Evaluate added and redistributed forces",
        body: "Solar arrays can add dead load and create uplift, sliding, attachment, concentrated, maintenance, or equipment forces. The engineer traces those forces through fasteners or ballast, roof sheathing and framing, connections, and foundations or other supports while accounting for the actual roof geometry and design criteria.",
        bullets: ["Dead load, uplift, lateral, seismic, and attachment forces as applicable", "Local sheathing and member capacity at attachment points", "Load distribution, transfers, blocking, and connection details", "Roof condition and water-intrusion risks outside the structural calculation"],
      },
      {
        heading: "State what the letter does and does not say",
        body: "A letter should distinguish observation from analysis, identify records relied upon, state exclusions, and avoid conclusions broader than the reviewed system. Electrical interconnection, fire, roofing, utility, and authority requirements may need separate review; the letter cannot promise an agency decision.",
        bullets: ["Date, address, system description, and documents reviewed", "Analysis methods, assumptions, field observations, and unresolved limitations", "Defined conclusion tied to the reviewed array and supporting structure", "Separate responsibility for electrical, roofing, fire, utility, and permit decisions"],
      },
    ],
    extraLinks: [{ label: "Structural engineering services", href: "/services/structural" }],
    faqs: [
      { question: "Can a panel count support a structural letter?", answer: "No. The engineer typically needs the array layout, attachment or ballast information, roof framing and condition records, equipment data, and project-specific load criteria before defining a responsible conclusion." },
      { question: "Does a structural solar letter cover electrical approval?", answer: "No. A structural letter addresses its defined structural scope. Electrical design, interconnection, roofing, fire, utility, and authority requirements remain separate matters unless explicitly assigned to qualified professionals." },
      { question: "Is a site visit always required for rooftop solar review?", answer: "Not always. Reliable drawings, photographs, measurements, and installation records may support some reviews, while uncertain framing, roof condition, concealed attachments, or high-consequence conditions can require direct observation. The responsible engineer decides." },
      { question: "Does a solar structural letter guarantee permit acceptance?", answer: "No. The authority controls its submission checklist, interpretation, review, and decision. The letter should state its evidence, scope, and limitations clearly." },
    ],
  },
  {
    slug: "structural-home-inspection",
    title: "Structural Home Inspection | Apex Grid Engineering",
    description: "Do you need a structural home inspection? Learn how an engineer documents visible conditions, scope, limitations, and useful next steps for review.",
    h1: "Do I need a structural home inspection?",
    answer: "A structural home inspection by an engineer is a defined evaluation of visible or otherwise accessible structural conditions, such as framing, foundations, settlement indicators, moisture-related damage, alterations, and load-path concerns. The engineer reports observations, analysis or recommendations included in scope, and limitations rather than treating a limited inspection as a guarantee about concealed construction or every home system.",
    topic: "Structural Home Inspection",
    serviceHref: "/services/assessments",
    founderNote: "I'm Jeremy Mills, CEO & Founder of Apex Grid Engineering and a U.S. Air Force veteran. Apex Grid is veteran-owned; I'm not a PE, and this perspective does not replace the responsible engineer's judgment.",
    sections: [
      {
        heading: "Define the question before the site visit",
        body: "Homeowners may need different answers: whether cracking appears structural, whether a remodel altered a load path, what a roof sag suggests, or what further testing is needed. I ask clients to name the decision they need to make so the scope can identify areas, records, access limits, and whether the deliverable is an observation letter, report, repair concept, or design package.",
        bullets: ["Address, age, construction type, and history of additions or repairs", "Specific symptoms, dates, photographs, and changes noticed by occupants", "Areas to access, safety limits, crawlspace or attic conditions, and exclusions", "Requested deliverable and decisions the report is meant to support"],
      },
      {
        heading: "Observation is not the same as opening every assembly",
        body: "An inspection can document accessible framing, foundations, connections, distress patterns, drainage clues, and apparent alterations, but finishes and soil can conceal important conditions. The report should distinguish observed facts, owner-provided information, engineering interpretation, and recommendations for openings, testing, survey, or specialist input.",
        bullets: ["Map cracks, deflection, settlement, corrosion, rot, and water evidence", "Photograph locations with scale and orientation where practical", "Compare visible conditions with available plans and alteration history", "Identify inaccessible or unverified areas instead of filling gaps with assumptions"],
      },
      {
        heading: "A useful report connects findings to next steps",
        body: "Recommendations may range from monitoring and maintenance coordination to targeted exposure, repair design, drainage work, or a broader structural analysis. The engineer should avoid diagnosing non-structural systems outside scope and should state when a contractor, geotechnical professional, architect, or other specialist is needed.",
        bullets: ["Separate urgent safety observations from longer-term investigation", "Tie recommendations to the evidence and the uncertainty remaining", "Describe repair concepts without implying final construction documents", "Coordinate any follow-up design with current conditions and authority requirements"],
      },
    ],
    extraLinks: [{ label: "Structural assessment services", href: "/services/assessments" }],
    faqs: [
      { question: "Is an engineer's structural inspection the same as a home inspection?", answer: "No. A general home inspection and a structural engineering evaluation have different scopes and deliverables. The engagement should state which structural questions are being addressed and which building systems or concealed conditions are outside scope." },
      { question: "Can an inspection confirm there are no structural problems?", answer: "A limited inspection cannot guarantee that no problem exists, especially where conditions are concealed or inaccessible. A responsible report states what was observed, what was not inspected, and what follow-up is warranted." },
      { question: "Will the inspection report include repair drawings?", answer: "Only if repair design is included as a separate or expanded scope. An observation report may recommend next steps without providing construction documents or a sealed repair design." },
      { question: "What should I send before a structural inspection?", answer: "Send the address, concern history, photos, prior inspection or repair records, plans or permits, remodel information, and access constraints. Clear symptoms and records help the engineer define a useful site scope." },
    ],
  },
  {
    slug: "architect-stamp-vs-pe-stamp",
    title: "Architect Stamp vs. PE Stamp | Apex Grid Engineering",
    description: "Do you need an architect stamp or PE stamp? Learn how discipline, scope, authorization, and project rules determine responsibility for each document accurately.",
    h1: "Do I need an architect stamp or a PE stamp?",
    answer: "An architect stamp and a PE stamp identify different professional responsibilities, not interchangeable approval labels. An architect generally takes responsibility for eligible architectural work within the architect's authorization, while a PE takes responsibility for eligible engineering work within the engineer's discipline, competence, and authority; the project documents and applicable rules determine the required roles.",
    topic: "Architect Stamp Versus PE Stamp",
    serviceHref: "/services/architecture",
    founderNote: "I'm Jeremy Mills, CEO & Founder of Apex Grid Engineering and a U.S. Air Force veteran. Apex Grid is veteran-owned; I'm not a PE, and this perspective does not replace the responsible engineer's judgment.",
    sections: [
      {
        heading: "Match the seal to the professional scope",
        body: "A building set can combine architecture, structural engineering, MEP engineering, civil work, survey, fire protection, and specialty design. I explain the distinction this way: the title block and seal should make responsibility legible, because an architect's seal does not replace structural calculations and a PE seal does not assume responsibility for architectural design or every sheet.",
        bullets: ["Identify the design discipline and deliverable for each sheet", "Assign architecture, structural, MEP, civil, survey, and specialty scope explicitly", "Confirm the professional's authorization and competence for the work", "Coordinate interdependent documents without merging professional responsibility"],
      },
      {
        heading: "A shared project still needs separate accountability",
        body: "The architect and engineers coordinate a project, but coordination does not make one professional responsible for another's work. Each responsible professional reviews the information needed for their scope, resolves interfaces, and seals only documents for which they can accept professional responsibility under applicable rules.",
        bullets: ["Architecture: building organization, materials, code coordination, and design scope", "Structural PE: load paths, member design, connections, foundations, and structural criteria", "MEP professionals: building systems, equipment, utilities, controls, and related documentation", "Civil or specialty professionals: site, drainage, survey, geotechnical, or other defined work"],
      },
      {
        heading: "Ask the authority what its submission requires",
        body: "Seal requirements vary by project type, location, discipline, and authority process. A general comparison cannot decide whether a document must be signed by an architect, PE, both, or another qualified professional. Obtain the current official checklist and then define the responsible scope with the design team.",
        bullets: ["Current authority checklist and adopted code basis", "Sheet index showing discipline ownership and signatures", "Written scope, assumptions, exclusions, and coordination responsibilities", "A controlled record of revisions and comments affecting sealed work"],
      },
    ],
    extraLinks: [{ label: "Architectural design services", href: "/services/architecture" }],
    faqs: [
      { question: "Can an architect stamp structural drawings?", answer: "A title or profession does not by itself answer that question. The document must be within the professional's authorized discipline, competence, and applicable rules; structural engineering work may require a responsible PE or other specifically qualified professional." },
      { question: "Can a PE stamp architectural drawings?", answer: "A PE seal is not a substitute for architectural responsibility. The responsible professional and authority requirements determine which architectural documents need an architect or another qualified design professional." },
      { question: "Do all sheets in a coordinated set need the same stamp?", answer: "No. Sheet responsibility depends on discipline and project scope. A coordinated set can carry separate professional seals and should clearly identify who is responsible for each eligible document." },
      { question: "How do I determine which seal my project needs?", answer: "Start with the project type, location, authority checklist, document scope, and discipline boundaries. The architect and responsible engineers should coordinate the answer rather than relying on a generic stamp comparison." },
    ],
  },
  {
    slug: "engineer-stamping-someone-elses-drawings",
    title: "Stamping Someone Else's Drawings | Apex Grid Engineering",
    description: "Do you need an engineer to stamp someone else's drawings? Learn why independent review, design evidence, scope, and applicable rules matter before signing.",
    h1: "Do I need an engineer to stamp someone else's drawings?",
    answer: "An engineer should not place an unchanged stamp on someone else's drawings as a shortcut. The engineer must independently review or perform the engineering, verify the design basis and existing conditions to a level appropriate for the scope, coordinate revisions, and decide whether accepting responsibility is allowed and professionally appropriate under the applicable rules.",
    topic: "Engineer Review of Another Person's Drawings",
    serviceHref: "/services/structural",
    founderNote: "I'm Jeremy Mills, CEO & Founder of Apex Grid Engineering and a U.S. Air Force veteran. Apex Grid is veteran-owned; I'm not a PE, and this perspective does not replace the responsible engineer's judgment.",
    sections: [
      {
        heading: "The question is responsibility, not permission to sign",
        body: "A drawing may be prepared by a designer, architect, contractor, drafter, or another engineer, but authorship alone does not transfer engineering responsibility. I do not treat a signature request as a substitute for the records and review needed by the responsible engineer to identify what was evaluated, what was changed, and what remains outside the accepted scope.",
        bullets: ["Name the original source, revision, and intended use of the drawings", "Define the engineering discipline, sheets, calculations, and deliverables", "Confirm project location, applicable authority process, and professional authorization", "Identify design-by-others, delegated-design, and construction responsibilities"],
      },
      {
        heading: "Independent review needs evidence",
        body: "The depth of review follows the risk and complexity of the work, but it must be more than a visual glance. Current backgrounds, calculations, dimensions, field observations, equipment or product data, soil information, and authority comments may all be necessary to verify the design basis and coordinate a responsible conclusion.",
        bullets: ["Reperform or check governing load, capacity, deflection, and stability calculations", "Verify load paths, connections, foundations, and critical details", "Compare drawings, schedules, calculations, and existing-condition evidence", "Record review comments, revisions, unresolved assumptions, and limitations"],
      },
      {
        heading: "A responsible engineer can decline or narrow scope",
        body: "If records are inadequate, work is outside competence, the design cannot be verified, or the applicable rules do not permit the proposed arrangement, the engineer should not accept the responsibility merely because a signature is requested. The result may be a redesign, a limited review with explicit boundaries, more investigation, or no seal.",
        bullets: ["Do not market an isolated signature or guaranteed approval", "Use a written scope and review record before relying on a seal", "Coordinate changes with the original design team and authority as needed", "Preserve professional boundaries for architecture, construction, survey, and specialty work"],
      },
    ],
    extraLinks: [{ label: "Structural engineering services", href: "/services/structural" }],
    faqs: [
      { question: "Can an engineer stamp a drawing after only checking dimensions?", answer: "No. Dimension checking alone does not establish independent engineering responsibility. The engineer must review or perform the relevant design to an appropriate depth and determine whether sealing is justified." },
      { question: "Does changing a few notes make someone else's drawing the engineer's work?", answer: "No. Minor edits do not automatically transfer responsibility for the underlying design. The engineer documents the actual review, design decisions, revisions, and scope accepted." },
      { question: "What if the original engineer is unavailable?", answer: "Unavailability does not make a signature transferable. A new engineer must obtain enough records to independently evaluate the work, redesign or investigate as needed, and determine whether accepting responsibility is permitted." },
      { question: "What should I provide for an independent drawing review?", answer: "Provide the complete current drawing set, calculations, source files when relevant, site and existing-condition records, design criteria, product or equipment data, authority comments, and a clear statement of the requested scope." },
    ],
  },
];

PHASE0_AEO_PAGES.push(...PHASE0_BATCH1_AEO_PAGES);

export type Phase0ServicePage = {
  slug: string;
  path: string;
  title: string;
  description: string;
  h1: string;
  answer: string;
  sections: Array<{ heading: string; body: string; bullets?: string[] }>;
  faqs: Phase0Faq[];
};

export const PHASE0_SERVICE_PAGES: Phase0ServicePage[] = [
  {
    slug: "engineering-calculations",
    path: "/services/engineering-calculations/",
    title: "Engineering Calculations Services | Apex Grid Engineering",
    description: "Permit-ready structural, MEP, civil, and energy engineering calculations prepared and reviewed for the defined project scope and AHJ requirements.",
    h1: "Engineering Calculations for Permit and Design Decisions",
    answer: "Engineering calculations turn project inputs into traceable design evidence. Apex Grid can evaluate structural, mechanical, electrical, plumbing, civil, and energy calculation scopes when the jurisdiction, records, and responsible engineer are confirmed.",
    sections: [
      { heading: "Calculation scope follows the design question", body: "A useful calculation package starts with the decision the project must support: member capacity, foundation loads, HVAC sizing, electrical service demand, drainage, equipment anchorage, energy compliance, or a correction response. The engineer identifies the applicable code edition, load criteria, assumptions, and information still needed before performing the work.", bullets: ["Gravity, lateral, wind, seismic, and foundation calculations", "HVAC load, equipment, electrical service, and distribution calculations", "Civil grading, drainage, utility, and stormwater calculations", "Energy compliance calculations and model documentation", "Revised calculations tied to plan-check comments or permit changes"] },
      { heading: "Inputs and professional review", body: "Calculations are only as defensible as the drawings, dimensions, equipment data, soil information, climate inputs, and existing-condition evidence behind them. The responsible engineer independently checks the design basis, coordinates the calculations with the drawings, and determines whether a site visit, survey, geotechnical report, or additional investigation is required.", bullets: ["Current architectural and engineering backgrounds", "Project address and adopted code information", "Equipment schedules, loads, and manufacturer data", "Existing drawings, photographs, measurements, and field reports", "AHJ checklist, correction notice, or required calculation format"] },
      { heading: "Deliverables and boundaries", body: "The deliverable may be a calculation book, calculation sheets, design narrative, marked-up background, or coordinated permit set depending on the proposal. A calculation package is not a promise of approval, a substitute for an AHJ review, or a stamp-for-hire service; the engineer seals only eligible work for which professional responsibility is accepted.", bullets: ["Traceable assumptions and load combinations", "Calculations coordinated to sheets and details", "Professional seal where authorized and required", "A response matrix when calculations address comments", "Clear exclusions for survey, testing, construction, or other specialists"] },
    ],
    faqs: [
      { question: "Can Apex Grid prepare calculations from a PDF plan set?", answer: "Sometimes. A PDF may support a narrow scope, but the responsible engineer may need editable backgrounds, field measurements, equipment data, survey, geotechnical information, or other records before accepting responsibility." },
      { question: "Are calculations the same as a PE stamp?", answer: "No. Calculations are engineering evidence; a PE seal represents professional responsibility for eligible work after the engineer performs or independently reviews it under applicable rules." },
      { question: "Will calculations guarantee permit approval?", answer: "No. The AHJ controls its requirements, interpretation, review, and decision. A coordinated calculation package helps the reviewer trace the design basis." },
      { question: "Can calculations answer plan-check comments?", answer: "They can support a response when the comment requires engineering analysis. The response must still address the exact comment and coordinate any revised drawings or other discipline actions." },
    ],
  },
  {
    slug: "energy-compliance",
    path: "/services/energy-compliance/",
    title: "Commercial Energy Compliance Services | Apex Grid",
    description: "Commercial energy-code compliance documentation, modeling, and plan-check coordination aligned to the adopted code path and project inputs.",
    h1: "Commercial Energy Code Compliance Services",
    answer: "Energy compliance is a coordinated design and documentation process. Apex Grid identifies the adopted code path, evaluates envelope and building-system inputs, prepares the required calculations or model, and coordinates the result with permit documents.",
    sections: [
      { heading: "Choose the adopted compliance path", body: "The applicable energy code, edition, amendments, project type, alteration status, climate data, and AHJ submittal checklist determine the path. Prescriptive, trade-off, and performance methods have different inputs and documentation; a state code page or model-code summary does not replace confirmation with the permitting authority.", bullets: ["Code edition and local amendment confirmation", "Prescriptive, trade-off, or performance method selection", "New construction, addition, alteration, and change-of-use review", "Envelope, HVAC, lighting, service-water, and controls coordination", "Forms, reports, schedules, and supporting calculations for submission"] },
      { heading: "Inputs that make the result reliable", body: "The energy record follows the actual design rather than a generic building description. We coordinate wall and roof assemblies, glazing, lighting power, HVAC equipment, ventilation, controls, operating schedules, and utility or owner requirements with the current architectural and MEP set. Missing or changing inputs are documented as risks.", bullets: ["Climate zone and project geometry", "Assembly and fenestration performance data", "Equipment capacities, efficiencies, controls, and schedules", "Lighting layouts, power densities, and daylight controls", "Owner decisions and product data that affect compliance"] },
      { heading: "Review support without an approval promise", body: "A complete compliance package gives the plan reviewer a traceable path from construction documents to the selected method and results. If comments arrive, the response maps the issue to the affected input, calculation, schedule, or drawing. The AHJ remains responsible for interpreting and accepting the submission.", bullets: ["Energy reports and compliance forms", "Model assumptions and output review", "Coordination with architectural and MEP revisions", "Comment responses with controlled document revisions", "Explicit handoffs for commissioning, testing, or utility programs"] },
    ],
    faqs: [
      { question: "Does every commercial project need an energy report?", answer: "Many jurisdictions require energy documentation, but the form and scope depend on the adopted code, project type, alteration rules, and AHJ checklist. Confirm the current requirement for the project." },
      { question: "Can an energy model be completed before the design is final?", answer: "A preliminary model can inform decisions, but final compliance documentation needs the current design inputs and must be coordinated with the submitted drawings." },
      { question: "Does an energy report replace MEP design?", answer: "No. Energy documentation evaluates a compliance path; it does not replace mechanical, electrical, plumbing, controls, commissioning, or architectural responsibilities." },
      { question: "Can Apex Grid respond to an energy plan-check comment?", answer: "Yes, when the scope, records, jurisdiction, and responsible engineer align. The response may require revised calculations, model inputs, schedules, drawings, or a question for the AHJ." },
    ],
  },
];

export type PeStateSource = { boardUrl: string; lookupUrl: string };

/** Official state board landing pages and official license-verification pages. */
export const PE_STATE_SOURCE_LINKS: Record<string, PeStateSource> = {
  alabama: { boardUrl: "https://pels.alabama.gov/", lookupUrl: "https://pels.alabama.gov/licensees/" },
  arizona: { boardUrl: "https://btr.az.gov/", lookupUrl: "https://azbtr.com/license-search/" },
  arkansas: { boardUrl: "https://www.pels.arkansas.gov/", lookupUrl: "https://www.pels.arkansas.gov/verify-license" },
  california: { boardUrl: "https://www.bpelsg.ca.gov/", lookupUrl: "https://www.dca.ca.gov/consumers/check_license.shtml" },
  colorado: { boardUrl: "https://dpo.colorado.gov/Engineering", lookupUrl: "https://apps.colorado.gov/dora/licensing/Lookup/LicenseLookup.aspx" },
  connecticut: { boardUrl: "https://portal.ct.gov/DPH/Practitioner-Licensing--Investigations/Professional-Licensing/Engineering", lookupUrl: "https://www.elicense.ct.gov/Lookup/LicenseLookup.aspx" },
  delaware: { boardUrl: "https://dpr.delaware.gov/boards/professional-engineers/", lookupUrl: "https://delpros.delaware.gov/Lookup/LicenseLookup.aspx" },
  florida: { boardUrl: "https://fbpe.org/", lookupUrl: "https://fbpe.org/license-holders/licensee-search/" },
  georgia: { boardUrl: "https://pels.georgia.gov/", lookupUrl: "https://verify.sos.ga.gov/verification/" },
  hawaii: { boardUrl: "https://cca.hawaii.gov/pvl/boards/engineer/", lookupUrl: "https://cca.hawaii.gov/pvl/lookup/" },
  idaho: { boardUrl: "https://ibol.idaho.gov/IBOL/BoardPage.aspx?Bureau=PELS", lookupUrl: "https://ibol.idaho.gov/IBOL/LookupLicense.aspx" },
  illinois: { boardUrl: "https://idfpr.illinois.gov/profs/Professions/Engineer.html", lookupUrl: "https://online-dfpr.micropact.com/lookup/licenselookup.aspx" },
  indiana: { boardUrl: "https://www.in.gov/pla/professions/engineers-board/", lookupUrl: "https://mylicense.in.gov/everification/" },
  iowa: { boardUrl: "https://engineer.iowa.gov/", lookupUrl: "https://ibplicense.iowa.gov/PublicPortal/IowaLicenseSearch" },
  kansas: { boardUrl: "https://www.ksbpe.ks.gov/", lookupUrl: "https://www.ksbpe.ks.gov/verify-a-license" },
  kentucky: { boardUrl: "https://ky.gov/agencies/BEKPELS/Pages/default.aspx", lookupUrl: "https://oop.ky.gov/active_licenses.aspx" },
  louisiana: { boardUrl: "https://lsbpe.lapels.com/", lookupUrl: "https://lsbpe.lapels.com/verify-a-license/" },
  maine: { boardUrl: "https://www.maine.gov/pfr/professionallicensing/professions/engineers", lookupUrl: "https://www.pfr.maine.gov/ALMSOnline/ALMSQuery/SearchIndividual.aspx" },
  maryland: { boardUrl: "https://www.dllr.state.md.us/license/pe/", lookupUrl: "https://www.dllr.state.md.us/cgi-bin/ElectronicLicensing/Lookup/lookup.cgi" },
  massachusetts: { boardUrl: "https://www.mass.gov/orgs/board-of-registration-of-professional-engineers-and-land-surveyors", lookupUrl: "https://www.mass.gov/how-to/check-a-professional-engineers-license" },
  michigan: { boardUrl: "https://www.michigan.gov/lara/bureau-list/bpl/occ/engineering", lookupUrl: "https://aca-prod.accela.com/MILARA/GeneralProperty/PropertyLookUp.aspx" },
  minnesota: { boardUrl: "https://mn.gov/aelslagid/", lookupUrl: "https://mn.gov/aelslagid/license-search/" },
  mississippi: { boardUrl: "https://pepls.ms.gov/", lookupUrl: "https://pepls.ms.gov/verify/" },
  missouri: { boardUrl: "https://pr.mo.gov/boards/eng/", lookupUrl: "https://pr.mo.gov/licensee-search.asp" },
  montana: { boardUrl: "https://boards.bsd.dli.mt.gov/engineers-and-land-surveyors/", lookupUrl: "https://ebiz.mt.gov/POL/" },
  nebraska: { boardUrl: "https://nrec.nebraska.gov/engineers/", lookupUrl: "https://nrec.nebraska.gov/licensee-search" },
  nevada: { boardUrl: "https://nvbpels.org/", lookupUrl: "https://nvbpels.org/license-lookup/" },
  "new-hampshire": { boardUrl: "https://www.opi.nh.gov/professional-licensure/", lookupUrl: "https://www.opi.nh.gov/verification" },
  "new-jersey": { boardUrl: "https://www.njconsumeraffairs.gov/eng/", lookupUrl: "https://www.njconsumeraffairs.gov/verify" },
  "new-mexico": { boardUrl: "https://rld.nm.gov/boards-and-commissions/individual-boards-and-commissions/engineers-and-surveyors/", lookupUrl: "https://rldonline.nm.gov/lookup" },
  "new-york": { boardUrl: "https://dos.ny.gov/land-surveying-and-engineering", lookupUrl: "https://appext20.dos.ny.gov/lcns_public/lcns_public.php" },
  "north-carolina": { boardUrl: "https://www.ncbels.org/", lookupUrl: "https://www.ncbels.org/licensee-search/" },
  "north-dakota": { boardUrl: "https://ndpelsboard.org/", lookupUrl: "https://ndpelsboard.org/licensees/" },
  ohio: { boardUrl: "https://peps.ohio.gov/", lookupUrl: "https://elicense.ohio.gov/oh_verifylicense" },
  oklahoma: { boardUrl: "https://ok.gov/pe/", lookupUrl: "https://ok.gov/pe/license-lookup" },
  oregon: { boardUrl: "https://www.oregon.gov/osbeels/", lookupUrl: "https://www.oregon.gov/osbeels/Pages/license-verification.aspx" },
  pennsylvania: { boardUrl: "https://www.dos.pa.gov/ProfessionalLicensing/BoardsCommissions/Engineers/Pages/default.aspx", lookupUrl: "https://www.dos.pa.gov/ProfessionalLicensing/Verify-a-Professional/Pages/default.aspx" },
  "rhode-island": { boardUrl: "https://crb.ri.gov/professional-engineers-land-surveyors", lookupUrl: "https://crb.ri.gov/verify" },
  "south-carolina": { boardUrl: "https://llr.sc.gov/eng/", lookupUrl: "https://llr.sc.gov/lookup/" },
  "south-dakota": { boardUrl: "https://dps.sd.gov/licensing/professional-engineers", lookupUrl: "https://dps.sd.gov/licensing/verify" },
  tennessee: { boardUrl: "https://www.tn.gov/commerce/regboards/architects-engineers.html", lookupUrl: "https://apps.tn.gov/ae/" },
  texas: { boardUrl: "https://engineers.texas.gov/", lookupUrl: "https://engineers.texas.gov/roster/" },
  utah: { boardUrl: "https://dopl.utah.gov/professional-licensing/", lookupUrl: "https://dopl.utah.gov/license-lookup/" },
  vermont: { boardUrl: "https://sos.vermont.gov/opr/boards/engineering/", lookupUrl: "https://sos.vermont.gov/opr/verification/" },
  virginia: { boardUrl: "https://www.dpor.virginia.gov/Boards/APELS", lookupUrl: "https://www.dpor.virginia.gov/LicenseLookup" },
  washington: { boardUrl: "https://dol.wa.gov/professional-licenses/engineers-and-land-surveyors", lookupUrl: "https://fortress.wa.gov/dol/solar/Account/LawfulPresence/LicenseLookup.aspx" },
  "west-virginia": { boardUrl: "https://wvpebd.gov/", lookupUrl: "https://wvpebd.gov/license-verification" },
  wisconsin: { boardUrl: "https://dsps.wi.gov/Pages/Professions/ProfessionalEngineer/Default.aspx", lookupUrl: "https://license.wi.gov/" },
  wyoming: { boardUrl: "https://engineersandsurveyors.wyo.gov/", lookupUrl: "https://online.wyo.gov/complaint/lookup" },
};

export type Phase0Playbook = {
  slug: string;
  city: string;
  state: string;
  title: string;
  focus: string;
  sources: Array<{ label: string; url: string }>;
};

export const PHASE0_PLAN_CHECK_PLAYBOOKS: Phase0Playbook[] = [
  ["phoenix-plan-check-correction-playbook", "Phoenix", "Arizona", "municipal permit intake and correction routing", "Start with the city permit record and identify whether the comment belongs to building, planning, fire, grading, or a utility review.", "https://www.phoenix.gov/pdd", "https://www.phoenix.gov/pdd/onlineservices"],
  ["dallas-plan-check-correction-playbook", "Dallas", "Texas", "multi-discipline resubmittal coordination", "Keep the correction matrix aligned to the submitted drawing index, revision convention, and each affected discipline.", "https://dallascityhall.com/departments/sustainabledevelopment/buildinginspection/Pages/default.aspx", "https://developdallas.dallascityhall.com/"],
  ["denver-plan-check-correction-playbook", "Denver", "Colorado", "review comments, revisions, and applicant actions", "Separate engineering revisions from zoning, fire, landmark, and applicant actions before preparing the response package.", "https://www.denvergov.org/Government/Agencies-Departments-Offices/Agencies-Departments-Offices-Directory/Community-Planning-and-Development", "https://www.denvergov.org/AccelaCitizenAccess"],
  ["houston-plan-check-correction-playbook", "Houston", "Texas", "portal records and coordinated document responses", "Preserve the reviewer notice, permit record, current plans, and upload instructions before changing a calculation or sheet.", "https://www.houstonpermittingcenter.org/", "https://www.houstonpermittingcenter.org/online-permitting"],
  ["atlanta-plan-check-correction-playbook", "Atlanta", "Georgia", "discipline ownership and resubmittal traceability", "Map each comment to the responsible design professional and do not treat a city comment as resolved until the referenced revision is coordinated.", "https://www.atlantaga.gov/government/departments/city-planning/office-of-buildings", "https://aca-prod.accela.com/Atlanta_GA/Default.aspx"],
  ["chicago-plan-check-correction-playbook", "Chicago", "Illinois", "building permit corrections and code-basis records", "Use the official permit record and current code resources to distinguish a document correction from a design change or separate city review.", "https://www.chicago.gov/city/en/depts/bldgs.html", "https://www.chicago.gov/city/en/depts/bldgs/provdrs/permits.html"],
  ["los-angeles-plan-check-correction-playbook", "Los Angeles", "California", "plan check response and code-source coordination", "Keep the correction response tied to the plan-check cycle, applicable code edition, revised sheets, and any separate agency dependency.", "https://www.ladbs.org/", "https://www.ladbs.org/services/plan-check"],
  ["miami-plan-check-correction-playbook", "Miami", "Florida", "permit comments, hurricane design inputs, and revision control", "Confirm the project jurisdiction and design inputs before revising structural or MEP documents; coastal or wind assumptions must be project-specific.", "https://www.miami.gov/Permits-Construction", "https://www.miami.gov/Permits-Construction/Permits"],
  ["seattle-plan-check-correction-playbook", "Seattle", "Washington", "correction response evidence and permit portal workflow", "Organize reviewer comments, supporting calculations, drawings, energy documents, and unresolved applicant actions into a controlled response set.", "https://www.seattle.gov/sdci", "https://www.seattle.gov/sdci/permits"],
  ["boston-plan-check-correction-playbook", "Boston", "Massachusetts", "permit review handoffs and responsible design scope", "Identify building, zoning, fire, accessibility, and engineering handoffs so the response addresses the right authority without inventing a local determination.", "https://www.boston.gov/departments/inspectional-services", "https://www.boston.gov/departments/inspectional-services/how-get-permit"],
].map(([slug, city, state, focus, angle, source1, source2]) => ({
  slug,
  city,
  state,
  title: `${city} Plan Check Correction Playbook | Apex Grid`,
  focus,
  sources: [{ label: `${city} official building or development information`, url: source1 }, { label: `${city} official permit information`, url: source2 }, { label: "International Code Council — I-Codes", url: "https://www.iccsafe.org/products-and-services/i-codes/" }],
  // The angle is intentionally retained as a separate field while keeping the
  // exported shape small for the renderer.
  ...({ angle } as { angle: string }),
})) as Array<Phase0Playbook & { angle: string }>;

type ResourceSeed = [string, string, string, string, string];

const RESOURCE_SEEDS: ResourceSeed[] = [
  ["permit-intake-checklist", "Permit Intake Checklist for Engineering Teams", "intake", "A complete intake separates a project question from the documents needed to answer it.", "address, scope, authority, current drawings, schedule, and prior review records"],
  ["engineering-scope-letter", "How to Write an Engineering Scope Letter", "scope", "A scope letter makes responsibility, assumptions, deliverables, and exclusions visible before production begins.", "discipline boundaries, deliverable format, review cycles, site work, and owner decisions"],
  ["drawing-index-coordination", "Drawing Index Coordination for Permit Sets", "coordination", "A drawing index is a simple control that helps reviewers and project teams identify the complete current package.", "sheet numbers, revisions, discipline ownership, linked calculations, and superseded documents"],
  ["calculation-cover-sheet", "What a Calculation Cover Sheet Should Identify", "calculations", "A calculation cover sheet gives the reader a map of the design basis before the technical pages begin.", "project identity, code basis, criteria, assumptions, software, and responsible engineer"],
  ["existing-condition-photo-log", "Existing-Condition Photo Logs for Engineering", "existing", "A disciplined photo log turns visual field evidence into a traceable project record.", "location labels, direction, scale, date, access limits, and conditions needing verification"],
  ["field-measurement-protocol", "Field Measurement Protocol for Existing Buildings", "existing", "Field measurements should answer a defined engineering question and identify uncertainty rather than imply that every condition is known.", "control dimensions, member sizes, elevations, access, tolerances, and follow-up openings"],
  ["equipment-submittal-review", "Engineering Review of Equipment Submittals", "mep", "Equipment data should be checked against the loads, supports, connections, utilities, controls, and energy documents it affects.", "weight, capacity, power, airflow, clearances, mounting, and substitutions"],
  ["rooftop-equipment-structural-review", "Rooftop Equipment Structural Review", "structural", "Rooftop equipment review follows the load path from unit and curb through framing, connections, and supporting elements.", "operating and seismic loads, curb geometry, framing, access, vibration, and waterproofing handoff"],
  ["beam-opening-engineering-inputs", "Inputs for Beam and Wall-Opening Engineering", "structural", "An opening design needs enough information to trace loads above the opening into supports and foundations below.", "span, tributary area, wall construction, supports, floor levels, foundation, and temporary works handoff"],
  ["foundation-design-inputs", "Foundation Design Inputs for Permit Engineering", "structural", "Foundation design should state the soil, load, drainage, frost, seismic, and constructability information on which it relies.", "geotechnical recommendations, reactions, groundwater, frost, settlement, and excavation limits"],
  ["retaining-wall-engineering-inputs", "Retaining Wall Engineering Inputs", "civil", "Retaining wall calculations depend on soil, water, surcharge, geometry, drainage, and construction assumptions.", "height, backfill, surcharge, groundwater, drainage, global stability, and adjacent property limits"],
  ["grading-plan-review", "How to Review a Grading Plan", "civil", "A grading-plan review traces existing and proposed elevations through drainage, access, utilities, and adjacent-property constraints.", "contours, spot elevations, drainage arrows, ADA routes, utilities, and erosion controls"],
  ["stormwater-calculation-records", "Stormwater Calculation Records for Site Design", "civil", "Stormwater records explain the hydrology, assumptions, controls, routing, and maintenance obligations behind a site design.", "drainage area, rainfall data, impervious area, storage, discharge, water quality, and maintenance"],
  ["utility-coordination-matrix", "Utility Coordination Matrix for Civil Projects", "civil", "A utility matrix prevents a civil plan from treating provider decisions as if they were engineering assumptions.", "provider, point of connection, capacity, easement, service request, conflicts, and approval owner"],
  ["hvac-load-calculation-inputs", "HVAC Load Calculation Inputs", "mep", "HVAC sizing should be based on project geometry, envelope, schedules, ventilation, and equipment assumptions rather than rule-of-thumb capacity.", "climate data, orientation, assemblies, occupancy, ventilation, internal gains, and zoning"],
  ["ventilation-compliance-review", "Ventilation Compliance Review for Building Projects", "mep", "Ventilation review connects occupancy, outdoor air, exhaust, pressure relationships, controls, and the drawings that show them.", "occupancy, outdoor air method, exhaust, filtration, controls, shafts, and commissioning handoffs"],
  ["electrical-service-sizing", "Electrical Service Sizing Calculation Inputs", "mep", "Service sizing requires a coordinated load inventory and the applicable utility and electrical-code criteria.", "connected loads, demand, motors, continuous loads, EV charging, emergency systems, and utility data"],
  ["plumbing-fixture-unit-review", "Plumbing Fixture Unit Review", "mep", "Plumbing sizing begins with a fixture inventory, demand method, pressure, routing, and authority-specific requirements.", "fixture counts, demand method, pressure, pipe routing, hot water, sanitary, and specialty systems"],
  ["energy-envelope-documentation", "Energy Envelope Documentation Checklist", "energy", "Envelope documentation should let a reviewer trace assemblies, openings, thermal performance, and construction notes to the selected compliance path.", "wall and roof assemblies, glazing, air barrier, insulation, thermal bridges, and details"],
  ["lighting-power-compliance", "Lighting Power Compliance Documentation", "energy", "Lighting compliance depends on the current fixture schedule, space types, controls, and the adopted calculation method.", "area types, fixture wattage, controls, daylight, exterior lighting, and schedule coordination"],
  ["energy-model-quality-control", "Energy Model Quality-Control Review", "energy", "A model quality-control review tests whether geometry, schedules, systems, and outputs still match the construction documents.", "geometry, zoning, schedules, systems, unmet loads, reports, and revision tracking"],
  ["plan-check-comment-log", "Plan-Check Comment Log Template and Method", "review", "A comment log is most useful when each item has an owner, disposition, evidence, revision, and remaining dependency.", "comment number, sheet, discipline, action, response, revision, and open question"],
  ["permit-resubmittal-quality-control", "Permit Resubmittal Quality-Control Review", "review", "A resubmittal check looks beyond the response letter to the whole coordinated package that the reviewer will actually receive.", "revision clouds, stale notes, schedules, calculations, forms, file names, and portal requirements"],
  ["responsible-engineer-transition", "Responsible Engineer Transition Checklist", "professional", "A change in responsible engineering requires a documented handoff and independent review rather than a signature exchange.", "scope, records, open decisions, field evidence, prior reliance, authority notice, and professional acceptance"],
];

export type Phase0ResourcePage = {
  slug: string;
  title: string;
  category: string;
  answer: string;
  checklist: string;
  track: string;
};

export const PHASE0_RESOURCE_PAGES: Phase0ResourcePage[] = RESOURCE_SEEDS.flatMap((seed) =>
  ["design", "review", "delivery"].map((track) => ({
    slug: `${seed[0]}-${track}`,
    title: `${seed[1]}: ${track === "design" ? "Design Inputs" : track === "review" ? "Review Method" : "Delivery Records"}`,
    category: seed[2],
    answer: `${seed[3]} This ${track} perspective focuses on ${seed[4]}.`,
    checklist: `${seed[4]}; the governing code or AHJ checklist; current architectural and engineering backgrounds; assumptions that need confirmation; and a record of unresolved decisions.`,
    track,
  })),
);

export const PHASE0_RESOURCE_COUNT = PHASE0_RESOURCE_PAGES.length;