import type { Phase0AeoPage } from "./phase0-corpus";

const FOUNDER_NOTE =
  "I'm Jeremy Mills, CEO & Founder of Apex Grid Engineering and a U.S. Air Force veteran. Apex Grid is veteran-owned; I'm not a PE, and this perspective does not replace the responsible engineer's judgment.";

export const PHASE0_BATCH3_PROJECT_PAGES_A: Phase0AeoPage[] = [
  {
    slug: "new-custom-home-engineering",
    title: "New Custom Home Engineering | Apex Grid Engineering",
    description:
      "Planning a custom home? Learn when structural engineering is needed, what drawings and calculations include, and how the permit process coordinates the team.",
    h1: "What engineering does a new custom home need?",
    answer:
      "New custom home engineering turns an architectural concept into a coordinated, buildable structure. The responsible engineer evaluates the site and design, establishes gravity and lateral load paths, designs foundations, framing, connections, and other assigned systems, and prepares calculations and permit drawings. The right scope depends on the house geometry, materials, soil and site information, wind, seismic or snow criteria, local submission requirements, and which professionals are responsible for architecture, civil, geotechnical, energy, and MEP work.",
    topic: "New Custom Home Engineering",
    serviceHref: "/services/structural",
    founderNote: FOUNDER_NOTE,
    sections: [
      {
        heading: "Begin with the site and architectural concept",
        body:
          "A custom home is not a stock plan with a new front elevation. I start by asking for the site address, survey information, architectural plans, grading concept, desired materials, and any geotechnical or authority information already available. The responsible engineer then decides which design criteria and investigations are adequate, where the building bears, and what site constraints may change the foundation or framing approach.",
        bullets: [
          "Current plans, sections, elevations, roof geometry, and opening schedule",
          "Survey, grades, property constraints, utilities, and site access information",
          "Soil, groundwater, slope, flood, wind, seismic, or snow data when relevant",
          "Material choices, large openings, cantilevers, equipment, and unusual loads",
        ],
      },
      {
        heading: "Trace the complete structural load path",
        body:
          "The deliverable should let the project team follow loads from the roof and floors through walls, beams, posts, connections, and foundations into the supporting soil. I pay particular attention to transfers created by open living spaces, tall windows, split levels, garages, roof offsets, and heavy finishes. A beautiful rendering does not establish a safe load path; calculations and details must be coordinated with what will actually be built.",
        bullets: [
          "Foundation type, footing dimensions, retaining conditions, and bearing assumptions",
          "Floor and roof framing, shear walls, diaphragms, collectors, and hold-downs",
          "Beams, posts, headers, moment connections, and concentrated reactions",
          "Serviceability, drift, deflection, durability, and construction tolerances",
        ],
      },
      {
        heading: "Define the engineering package and boundaries",
        body:
          "A custom-home package may include structural plans, schedules, sections, details, calculations, notes, and eligible sealed documents, but it does not automatically include every discipline. Civil drainage, geotechnical recommendations, architectural design, energy compliance, MEP systems, survey, and specialty work have separate responsibilities. I recommend a sheet index and written scope so the owner knows which professional owns each decision and which assumptions still need confirmation.",
        bullets: [
          "Structural drawings and calculations coordinated to the current architecture",
          "Written assumptions, exclusions, design criteria, and field-verification notes",
          "Separate civil, geotechnical, architectural, energy, MEP, and survey deliverables",
          "A revision record when the owner, architect, or contractor changes the design",
        ],
      },
      {
        heading: "Coordinate review before construction starts",
        body:
          "The permit process belongs to the authority having jurisdiction, not to the engineer alone. The team submits the documents the authority requires, answers comments through controlled revisions, and keeps architectural and engineering files aligned. I tell owners not to release construction from an early concept set: changes to room layouts, openings, roof loads, grading, or equipment can invalidate details and require the responsible engineer to review the change.",
        bullets: [
          "Confirm the current authority checklist and adopted code basis",
          "Coordinate permit sheets, calculations, forms, and professional signatures",
          "Track comments, responses, revised sheets, and superseded documents",
          "Verify that contractor questions return to the current approved design",
        ],
      },
    ],
    extraLinks: [
      { label: "Structural engineering services", href: "/services/structural" },
      { label: "Arizona engineering locations", href: "/locations/arizona/" },
      { label: "Metro engineering service hubs", href: "/metros/" },
      { label: "What documents does a PE need?", href: "/answers/what-documents-does-a-pe-need/" },
    ],
    faqs: [
      {
        question: "Does every custom home need structural engineering?",
        answer:
          "The required scope depends on the house, site, materials, jurisdiction, and authority checklist. A responsible engineer should determine whether structural drawings, calculations, foundation design, or other engineering documents are required rather than relying on the phrase custom home alone.",
      },
      {
        question: "What does custom-home structural engineering deliver?",
        answer:
          "Depending on the agreed scope, the package can include structural plans, foundation and framing details, schedules, calculations, notes, and eligible sealed documents. The responsible engineer defines the deliverables and coordinates them with the architect and authority requirements.",
      },
      {
        question: "Can an architect provide all of the custom-home engineering?",
        answer:
          "Architecture and engineering are related but separate professional scopes. The project may need a responsible structural engineer, civil or geotechnical professional, MEP designer, surveyor, or other qualified specialist. The project team should assign responsibility by discipline and authority requirement.",
      },
      {
        question: "What should I send before requesting a custom-home review?",
        answer:
          "Send the address, current architectural plans, survey and grading information, soil or geotechnical records, desired materials, prior authority comments, schedule, and unusual design features. The engineer will identify what still needs verification.",
      },
    ],
  },
  {
    slug: "adu-engineering-plans",
    title: "ADU Engineering & Plans Guide | Apex Grid Engineering",
    description:
      "Need ADU engineering and plans? Learn how attached, detached, and converted units affect structure, deliverables, existing conditions, and permit coordination.",
    h1: "What engineering and plans does an ADU need?",
    answer:
      "ADU engineering and plans depend on whether the unit is attached, detached, converted from an existing space, or built from a manufactured or modular system. The responsible engineer evaluates the proposed loads, foundations, framing, lateral resistance, connections, openings, utilities and equipment interfaces, and the existing building where applicable. A useful package coordinates structural documents with architecture and the authority's current checklist without treating a PE seal as a substitute for independent engineering or approval.",
    topic: "ADU Engineering and Plans",
    serviceHref: "/services/california-adu-structural-engineering",
    founderNote: FOUNDER_NOTE,
    sections: [
      {
        heading: "Separate the ADU configuration first",
        body:
          "I ask whether the ADU is attached to the main house, detached in the yard, converted from a garage or other space, or supplied as a system with manufacturer documents. Each configuration creates different questions about foundations, fire and property interfaces, existing framing, lateral continuity, utilities, and construction access. The responsible engineer uses the actual plans and site evidence instead of assuming that every ADU follows one standard detail.",
        bullets: [
          "Attached addition, detached structure, garage conversion, or interior conversion",
          "Existing foundation, slab, framing, roof, openings, and alteration history",
          "Site plan, grades, setbacks, utilities, drainage, and access constraints",
          "Manufacturer drawings and installation requirements for a modular or panelized system",
        ],
      },
      {
        heading: "Design the new and existing load paths",
        body:
          "For a new ADU, the engineer designs the path from roof and floor loads through framing, connections, walls, and foundations. For an attached or converted unit, the engineer also evaluates how the new work meets the existing building and whether openings, floor changes, posts, or equipment alter the original system. I want the plans to identify assumptions about concealed conditions so field verification is not confused with a guess.",
        bullets: [
          "Footings, slabs, stem walls, anchors, posts, beams, and bearing conditions",
          "Floor and roof framing, shear walls, diaphragms, collectors, and connections",
          "New openings, infill, stairs, balconies, decks, and concentrated equipment loads",
          "Existing-condition limits, inspection needs, and required exposure or measurement",
        ],
      },
      {
        heading: "Make the plan set useful to the permit team",
        body:
          "ADU plans commonly involve architecture, structure, energy, civil, MEP, survey, and sometimes geotechnical or fire-related work. The engineering package should identify its sheet ownership, design criteria, calculations, details, notes, and eligible professional seal while leaving each other discipline with its own responsibility. I recommend comparing the complete coordinated set with the current authority checklist before submission, because a structural drawing cannot answer every ADU requirement.",
        bullets: [
          "Structural plans, foundation details, framing schedules, and calculations",
          "Architectural backgrounds, dimensions, openings, and room layouts kept current",
          "Separate energy, civil, MEP, survey, fire, and land-use documents as required",
          "Sheet index, revision control, assumptions, exclusions, and submission forms",
        ],
      },
      {
        heading: "Avoid the shortcut of an isolated stamp",
        body:
          "A PE seal communicates responsibility for defined engineering work; it is not a product that can be added to an unchanged plan set. If another person prepared the drawings, the responsible engineer needs enough records to independently review or redesign the eligible work and decide whether accepting responsibility is permitted. I tell owners to ask exactly which sheets and calculations are covered, who owns revisions, and what the authority—not the engineer—must approve.",
        bullets: [
          "Identify the professional discipline and exact sheets within the requested scope",
          "Provide current plans, calculations, site evidence, and authority comments",
          "Document independent review, revisions, assumptions, and unresolved conditions",
          "Keep permit approval, construction means, and non-engineering work separate",
        ],
      },
    ],
    extraLinks: [
      { label: "California ADU structural engineering service", href: "/services/california-adu-structural-engineering" },
      { label: "PE stamp scope for ADU plans", href: "/answers/pe-stamp-adu-plans/" },
      { label: "ADU plan engineering cost factors", href: "/answers/adu-plan-engineering-cost/" },
      { label: "California engineering locations", href: "/locations/california/" },
    ],
    faqs: [
      {
        question: "Do ADU plans always need a structural engineer?",
        answer:
          "The answer depends on the configuration, design, existing conditions, materials, jurisdiction, and current authority checklist. An engineer should determine the structural scope and documents needed rather than assuming that an ADU is either always exempt or always identical to another project.",
      },
      {
        question: "Can one ADU plan set work in every state?",
        answer:
          "A generic plan set cannot establish the applicable code, loads, professional authorization, site criteria, or authority submission requirements in every location. The responsible project team must adapt the design and documents to the actual jurisdiction and verified conditions.",
      },
      {
        question: "Can a PE stamp ADU plans prepared by someone else?",
        answer:
          "Only after determining that the eligible engineering can be independently reviewed or performed and that accepting responsibility is permitted and appropriate. An unchanged signature is not a substitute for calculations, existing-condition evidence, coordination, and professional judgment.",
      },
      {
        question: "What should I provide for an ADU engineering review?",
        answer:
          "Provide the address, complete architectural plans, site plan, existing drawings and photos, foundation and framing records, soil or survey information, manufacturer documents, authority checklist or comments, and the specific permit submission requested.",
      },
    ],
  },
  {
    slug: "basement-finish-structural-plans",
    title: "Basement Finish Structural Plans Guide | Apex Grid",
    description:
      "Finishing a basement? Learn when structural plans are needed for beams, posts, stairs, openings, slabs, foundations, moisture, and permit coordination.",
    h1: "When does a basement finish need structural plans?",
    answer:
      "A basement finish needs structural plans when the work changes a load path, removes or adds support, alters stairs or openings, modifies foundations or slabs, adds significant equipment, or requires engineering documents for the permit. Even when most work is interior, existing beams, posts, bearing walls, floor framing, settlement, moisture, and drainage can affect what is safe to change. The responsible engineer defines the structural scope from current plans, field evidence, and the proposed layout.",
    topic: "Basement Finish Structural Plans",
    serviceHref: "/services/structural",
    founderNote: FOUNDER_NOTE,
    sections: [
      {
        heading: "Map what the basement already supports",
        body:
          "I do not treat a basement as an empty floor waiting for partitions. It may contain posts, beams, bearing walls, footings, braced frames, utilities, and floor or roof support that the finished layout must preserve. Before plans are prepared, the responsible engineer may need dimensions, framing direction, photographs, exposed foundation conditions, prior alteration records, and information about cracking, settlement, water, or low clearances.",
        bullets: [
          "Locate beams, posts, bearing walls, footings, and framing above",
          "Record slab elevations, foundation walls, cracks, joints, and visible distress",
          "Document stairs, window wells, exterior doors, and existing openings",
          "Mark plumbing, electrical, HVAC, ducts, and equipment that constrain framing",
        ],
      },
      {
        heading: "Identify changes that make engineering necessary",
        body:
          "A finish project can become structural when a wall is removed, a post is relocated, an opening is widened, a stair is changed, or a new beam or support is introduced. Raising a floor, cutting a slab, adding a masonry or tile load, or suspending heavy equipment can also change reactions. I ask clients to show both the proposed room plan and the construction they want removed or added so the engineer can follow each changed load path.",
        bullets: [
          "Removed or relocated bearing walls, posts, beams, and support lines",
          "New headers, stairs, egress openings, window wells, and foundation penetrations",
          "Slab cuts, lowered floors, underpinning, or new footings",
          "Heavy partitions, masonry, storage, mechanical equipment, or suspended loads",
        ],
      },
      {
        heading: "Coordinate structural plans with other scopes",
        body:
          "Structural plans do not replace the basement's architectural, moisture, energy, electrical, plumbing, mechanical, fire, or egress review. The package can show structural interfaces and assumptions, while the appropriate professionals and authority address their own requirements. A useful drawing set may include a foundation plan, framing plan, sections, details, calculations, notes, and eligible seal, but the exact deliverables follow the agreed scope and current checklist.",
        bullets: [
          "Dimensioned architectural layout with room uses and proposed finishes",
          "Foundation, framing, beam, post, stair, and opening details within scope",
          "Moisture, drainage, ventilation, egress, fire, and MEP coordination points",
          "Written assumptions, exclusions, field verification, and revision control",
        ],
      },
      {
        heading: "Permit review is a coordinated handoff",
        body:
          "The authority having jurisdiction decides what the basement permit requires and whether the submission is acceptable. The owner or design team submits the current coordinated package, responds to comments, and keeps revisions synchronized. I caution against starting demolition from a concept plan: a concealed footing, undocumented post, water problem, or change in finished-floor elevation can require the responsible engineer to revisit the design before work proceeds.",
        bullets: [
          "Confirm the authority's current checklist and adopted code information",
          "Submit matching architectural, structural, MEP, and supporting documents",
          "Track plan-check comments, responses, revisions, and superseded sheets",
          "Coordinate field discoveries and contractor questions with the responsible team",
        ],
      },
    ],
    extraLinks: [
      { label: "Existing-building structural services", href: "/services/structural" },
      { label: "What documents does a PE need?", href: "/answers/what-documents-does-a-pe-need/" },
      { label: "When does a PE need a site visit?", href: "/answers/when-does-a-pe-need-a-site-visit/" },
      { label: "Colorado engineering locations", href: "/locations/colorado/" },
    ],
    faqs: [
      {
        question: "Does finishing a basement always require structural plans?",
        answer:
          "No. The need depends on the proposed work, existing structure, local submission requirements, and whether the project changes support, openings, foundations, slabs, stairs, or loads. The authority and responsible design professionals determine the required documents.",
      },
      {
        question: "Can I remove a basement post if it is in the way?",
        answer:
          "Do not remove it based on appearance or a floor-plan assumption. The post may support beams, floors, roofs, or concentrated reactions. A responsible engineer must trace the load path and design any replacement beam, frame, posts, footings, or other support before demolition.",
      },
      {
        question: "Can a basement finish use the original house plans?",
        answer:
          "Original plans can be useful, but they do not prove current conditions after alterations, settlement, repairs, or concealed changes. The engineer compares the records with photographs, measurements, and any needed field verification before relying on them.",
      },
      {
        question: "What should I send for basement structural planning?",
        answer:
          "Send the address, existing and proposed plans, photographs of the basement and framing, foundation records, information about posts and beams, stair and opening changes, moisture history, equipment loads, and any permit comments already received.",
      },
    ],
  },
  {
    slug: "deck-patio-cover-pergola-engineering",
    title: "Deck, Patio Cover & Pergola Engineering | Apex Grid",
    description:
      "Planning a patio cover or pergola? Learn how roof uplift, posts, footings, attachments, drainage, and permit documents differ from a deck design safely.",
    h1: "When does a patio cover or pergola need engineering?",
    answer:
      "Patio cover and pergola engineering focuses on the overhead structure, its connections, posts, foundations, wind uplift, drainage, and relationship to the house or other supports. A deck may share some beams, joists, stairs, and footing questions, but a roofed cover introduces uplift, diaphragm, rafter, sheathing, waterproofing, and attachment issues that should not be hidden inside a generic deck detail. The responsible engineer defines the permit package from the actual geometry, materials, site, and authority requirements.",
    topic: "Deck, Patio Cover and Pergola Engineering",
    serviceHref: "/services/structural",
    founderNote: FOUNDER_NOTE,
    sections: [
      {
        heading: "Start with the cover type and support strategy",
        body:
          "I ask whether the patio cover or pergola is attached to the house, freestanding, supported by existing columns, or part of a larger deck. A solid roof, slatted pergola, retractable system, and shade structure can transfer different gravity and uplift forces. The responsible engineer needs the layout, elevations, roof or slat geometry, materials, attachment method, and support conditions before selecting a design approach.",
        bullets: [
          "Attached ledger or wall connection versus independent posts and footings",
          "Solid roof, open rafters, slats, screens, retractable cover, or panels",
          "Span, height, cantilever, post spacing, beam layout, and clearances",
          "Roofing, gutters, drainage, lighting, fans, heaters, and other equipment",
        ],
      },
      {
        heading: "Design for uplift, gravity, and weather exposure",
        body:
          "A patio cover is not only a vertical-weight problem. Wind can lift the roof, pull on fasteners, rack the frame, and transfer concentrated forces into posts, footings, and the existing house. I want the design to show how those forces travel through rafters or beams, connections, columns, anchors, and foundations. Exposure, roof shape, nearby buildings, and site criteria can change the result.",
        bullets: [
          "Rafters, beams, purlins, sheathing, slats, and serviceability checks",
          "Uplift, lateral, diaphragm, bracing, and connection-force paths",
          "Post bases, anchors, footing size, embedment, and soil assumptions",
          "Drainage, flashing, waterproofing interfaces, durability, and maintenance",
        ],
      },
      {
        heading: "Keep the deck comparison bounded",
        body:
          "Decks and roofed covers can share posts, beams, stairs, and footings, but they are not interchangeable design packages. A deck primarily carries people, finishes, and its own framing, while a cover adds roof loads, uplift, weathering, and attachment demands; a pergola may be open but still create significant lateral or uplift forces. I keep those scopes visible so a deck drawing is not misrepresented as a patio-cover design.",
        bullets: [
          "Deck joists, guards, stairs, ledgers, and freestanding support",
          "Patio-cover rafters, roof assembly, uplift ties, and house interface",
          "Pergola slats, shade loads, bracing, posts, and anchorage",
          "Separate details for shared supports, changes in elevation, and drainage",
        ],
      },
      {
        heading: "Coordinate drawings before permit submission",
        body:
          "A permit package may need plans, elevations, sections, foundation details, connection details, calculations, product information, and eligible sealed documents, but the exact checklist belongs to the authority. Architecture, site drainage, electrical, lighting, roofing, and construction means and methods remain separate scopes unless expressly included. I recommend freezing the geometry before review because changing post locations or roof materials can alter the reactions and connections.",
        bullets: [
          "Dimensioned site and architectural backgrounds with property constraints",
          "Current manufacturer data for connectors, covers, anchors, and roofing",
          "A sheet index showing structural, architectural, electrical, and site ownership",
          "Revision tracking for owner changes, comments, and field conditions",
        ],
      },
    ],
    extraLinks: [
      { label: "Structural engineering services", href: "/services/structural" },
      { label: "Engineered deck drawings guide", href: "/answers/engineered-deck-drawings/" },
      { label: "Engineered deck drawing cost and scope", href: "/answers/engineered-deck-drawing-cost/" },
      { label: "Arizona engineering locations", href: "/locations/arizona/" },
    ],
    faqs: [
      {
        question: "Is a pergola the same as a patio cover for engineering?",
        answer:
          "No. A pergola may be open, while a patio cover may have a solid roof, but both can create gravity, lateral, and uplift forces. The engineer evaluates the actual slats, roof, connections, posts, foundations, exposure, and authority requirements.",
      },
      {
        question: "Can a deck drawing be reused for a patio cover?",
        answer:
          "Not automatically. A roofed cover adds rafters or beams, roof and weather loads, uplift, attachment, drainage, and often different connection demands. The responsible engineer must review the changed system and define any revised or additional drawings.",
      },
      {
        question: "Does an attached patio cover need a ledger?",
        answer:
          "Not necessarily. An attached design might use a ledger, wall framing, posts, or another support arrangement. The existing wall, framing, waterproofing, loads, fasteners, and access determine whether the proposed connection is appropriate.",
      },
      {
        question: "What should I send for patio-cover engineering?",
        answer:
          "Send the address, site and house plans, cover dimensions and elevations, roof or slat materials, attachment concept, post and footing locations, photos of the existing wall or deck, manufacturer data, and any authority checklist or comments.",
      },
    ],
  },
  {
    slug: "retaining-wall-design-process",
    title: "Retaining Wall Design Process | Apex Grid Engineering",
    description:
      "Designing a retaining wall? Follow the homeowner design process from site geometry and soil inputs through drainage, stability, drawings, and permit review.",
    h1: "How does the retaining wall design process work?",
    answer:
      "A retaining wall design process starts with the site geometry and the decision the wall must support, then gathers soil, groundwater, surcharge, drainage, property, and construction information before selecting and analyzing a wall system. The responsible engineer checks external stability, internal strength, foundation support, movement, and relevant global conditions, then prepares drawings and calculations for the defined scope. A homeowner-friendly process explains assumptions and handoffs clearly without treating a concept sketch, wall height, or generic block detail as a permit-ready design.",
    topic: "Retaining Wall Design Process",
    serviceHref: "/services/civil",
    founderNote: FOUNDER_NOTE,
    sections: [
      {
        heading: "Describe the site before choosing a wall",
        body:
          "I begin with why the wall is needed and what the finished grades must be, not with a favorite block or a wall-height rule of thumb. The engineer needs a reliable site plan, wall alignment, top and bottom grades, property limits, nearby foundations, access, utilities, drainage routes, and photographs. A survey, geotechnical report, or field verification may be necessary when the geometry or soil conditions are uncertain.",
        bullets: [
          "Wall length, height, embedment, slopes, corners, steps, and transitions",
          "Top and bottom grades, adjacent foundations, driveways, fences, and property lines",
          "Soil, groundwater, drainage, backfill, compaction, and erosion information",
          "Utilities, excavation access, temporary support, easements, and neighbor interfaces",
        ],
      },
      {
        heading: "Turn design inputs into a stable system",
        body:
          "The wall type follows the site and the forces, not the other way around. The engineer may evaluate a gravity, cantilever, segmental, tied, or other system and compare how its stem, footing, reinforcement, connections, and drainage perform. I want the design basis to state the surcharge, water-control assumption, soil parameters, and construction limits so a homeowner can understand why a selected system is appropriate for the actual property.",
        bullets: [
          "Lateral earth pressure, surcharge, groundwater, and seismic or exposure criteria",
          "Sliding, overturning, bearing, settlement, and structural strength checks",
          "Global or compound stability when slopes or neighboring conditions warrant it",
          "Wall materials, reinforcement, anchors, drainage, filters, outlets, and maintenance",
        ],
      },
      {
        heading: "Make drainage and construction part of the design",
        body:
          "Water is a design input and a long-term maintenance issue, not a footnote. The package should explain the drainage path, filter or drain materials, outlets, surface runoff, and what happens if the system is blocked or not maintained. Excavation, temporary shoring, neighbor protection, utilities, and contractor means and methods may be separate responsibilities; I recommend recording those boundaries before anyone digs.",
        bullets: [
          "Behind-wall drains, weeps, filters, outlets, and accessible maintenance points",
          "Surface grading, swales, downspouts, irrigation, and discharge locations",
          "Excavation limits, temporary support, utility protection, and site access",
          "Inspection points, sequencing assumptions, compaction, and field changes",
        ],
      },
      {
        heading: "Deliver drawings that match the permit question",
        body:
          "A retaining-wall package may include a site plan, elevations, sections, wall and footing details, drainage notes, calculations, specifications, and eligible sealed documents. Civil, structural, geotechnical, survey, grading, land-use, and authority responsibilities vary by project, so the engineer should state the accepted discipline and limits. The owner or design team then submits the coordinated documents, responds to comments, and obtains the authority's decision.",
        bullets: [
          "Dimensioned plans, grades, sections, details, materials, and reinforcement schedules",
          "Calculations and assumptions that match the wall shown on the drawings",
          "Survey, geotechnical, grading, drainage, and property documents where required",
          "Comment responses, revision clouds, field verification, and construction boundaries",
        ],
      },
    ],
    extraLinks: [
      { label: "Civil engineering services", href: "/services/civil" },
      { label: "Retaining wall engineering guide", href: "/answers/retaining-wall/" },
      { label: "Retaining wall engineering cost factors", href: "/answers/retaining-wall-engineering-cost/" },
      { label: "Arizona engineering locations", href: "/locations/arizona/" },
    ],
    faqs: [
      {
        question: "Can I design a retaining wall from its height?",
        answer:
          "No. Height is only one input. Soil, water, surcharge, geometry, slope, foundation support, drainage, materials, property constraints, and construction conditions can materially change the wall system and its required checks.",
      },
      {
        question: "Does a retaining wall design include geotechnical engineering?",
        answer:
          "Not automatically. Geotechnical work may provide soil strength, groundwater, bearing, settlement, or global-stability information, while a structural or civil engineer designs the assigned wall and site components. The proposal should identify which professional supplies each input.",
      },
      {
        question: "Who is responsible for retaining-wall excavation support?",
        answer:
          "Temporary support and construction means and methods are commonly the contractor's responsibility unless they are specifically designed or reviewed under a written engineering scope. Property, utility, and neighbor-protection obligations should be resolved before excavation.",
      },
      {
        question: "What should a homeowner provide for wall design?",
        answer:
          "Provide the address, site plan or survey, wall alignment and grades, nearby structures and loads, soil or geotechnical information, drainage concept, property constraints, photographs, access limits, and any authority comments or permit checklist.",
      },
    ],
  },
];