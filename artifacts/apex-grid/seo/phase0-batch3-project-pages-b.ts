import type { Phase0AeoPage } from "./phase0-corpus";

const FOUNDER_NOTE =
  "I'm Jeremy Mills, CEO & Founder of Apex Grid Engineering and a U.S. Air Force veteran. Apex Grid is veteran-owned; I'm not a PE, and this perspective does not replace the responsible engineer's judgment.";

export const PHASE0_BATCH3_PROJECT_PAGES_B: Phase0AeoPage[] = [
  {
    slug: "kitchen-remodel-structural-engineering",
    title: "Kitchen Remodel Structural Engineering | Apex Grid",
    description:
      "Planning a kitchen remodel? Learn when structural engineering is needed for wall openings, beams, supports, new loads, drawings, and a responsible permit path.",
    h1: "When does a kitchen remodel need structural engineering?",
    answer:
      "A residential kitchen remodel needs structural engineering when the work changes a load-bearing wall, creates a larger opening, moves a post or beam, adds concentrated equipment, changes floor or roof support, or alters a lateral element. The responsible engineer evaluates the existing framing and foundation, designs the changed load path, and prepares the calculations or drawings required for the defined project and authority review. Cabinets and finishes alone do not automatically require structural design, but a contractor’s visual assumption is not a substitute for checking concealed support.",
    topic: "Kitchen Remodel Structural Engineering",
    serviceHref: "/services/structural",
    founderNote: FOUNDER_NOTE,
    sections: [
      {
        heading: "Separate the finish plan from the structural question",
        body:
          "Most kitchens include many changes that are architectural or trade coordination, but the structural question begins when framing, supports, loads, or foundations change. I ask homeowners to mark proposed walls, openings, posts, appliances, ceiling changes, and any removed support on the current plan so the responsible engineer can focus on the actual load path rather than guessing from cabinet layouts.",
        bullets: [
          "Identify walls, posts, beams, joists, rafters, and foundations affected by the remodel",
          "Mark new openings, widened openings, removed partitions, and relocated supports",
          "List concentrated equipment, masonry, stone, tanks, or suspended loads",
          "Separate architectural, electrical, plumbing, mechanical, and structural responsibilities",
        ],
      },
      {
        heading: "Openings and supports require a complete load path",
        body:
          "A wide opening between a kitchen and living area may need a beam, header, frame, posts, or another support arrangement. The beam is only one part of the design: the engineer also checks bearing, connections, deflection, load transfer below, lateral continuity, and the foundation receiving the reaction. Existing framing above and below must be verified before a detail is treated as construction-ready.",
        bullets: [
          "Trace floor, roof, wall, and transfer loads above each proposed opening",
          "Check beam or header strength, deflection, bearing, and connection details",
          "Evaluate posts, point reactions, crawlspace, slab, and foundation support",
          "Coordinate the structural solution with ceilings, cabinets, utilities, and finishes",
        ],
      },
      {
        heading: "Existing conditions can change the design",
        body:
          "Remodeled houses often contain undocumented alterations, concealed damage, irregular framing, or support lines that do not match the original plan. I recommend photographs, measurements, prior permits, and exposed-condition information before the responsible engineer commits to assumptions. A site visit or targeted opening may be appropriate when the evidence cannot establish the framing, connections, or foundation condition.",
        bullets: [
          "Provide current plans, photos, framing information, and the home's alteration history",
          "Record cracking, water damage, settlement, corrosion, or prior unapproved work",
          "Identify areas hidden by finishes and conditions that cannot be verified remotely",
          "Confirm which dimensions and materials are measured, documented, or assumed",
        ],
      },
      {
        heading: "Coordinate the permit package before construction",
        body:
          "The final deliverable may be a structural detail, calculations, a report, or a coordinated permit drawing set, depending on the scope and authority. The engineer owns the accepted engineering work; the architect or designer owns their documents, the contractor owns means and methods, and the authority controls its review. Keep approved structural revisions aligned with the kitchen plan before demolition begins.",
        bullets: [
          "Confirm the current authority checklist and required structural deliverables",
          "Coordinate structural sheets with architectural, electrical, plumbing, and mechanical plans",
          "State assumptions, exclusions, field verification, and revision responsibilities in writing",
          "Do not treat a preliminary sketch, contractor opinion, or permit submission as approval",
        ],
      },
    ],
    extraLinks: [
      { label: "Arizona engineering locations", href: "/locations/arizona/" },
      { label: "Find nearby engineering markets", href: "/metros/" },
      { label: "Residential structural engineering services", href: "/services/structural" },
      { label: "Load-bearing wall removal guide", href: "/answers/load-bearing-wall-removal/" },
    ],
    faqs: [
      {
        question: "Does replacing kitchen cabinets require a structural engineer?",
        answer:
          "Cabinet replacement alone does not automatically require structural engineering. Engineering may become relevant when the remodel changes walls, openings, posts, beams, floors, roofs, foundations, or concentrated loads. The project documents and existing conditions determine the responsible scope.",
      },
      {
        question: "Does removing a kitchen wall always require a beam?",
        answer:
          "No. The existing load path may support a beam, header, post-and-beam frame, or another arrangement, and some walls may not carry the loads assumed by the homeowner. The responsible engineer verifies framing, supports, connections, and the foundation before selecting a solution.",
      },
      {
        question: "What should I send for a kitchen remodel review?",
        answer:
          "Send the address, current and proposed plans, photos of both sides of affected walls, spaces above and below, framing or permit records, appliance information, and any history of alterations or distress. The engineer will identify what still needs field verification.",
      },
      {
        question: "Will kitchen structural drawings guarantee permit approval?",
        answer:
          "No. Engineering documents support the defined submission, but the authority having jurisdiction controls its checklist, interpretation, review, comments, and approval decision. Architectural and trade documents may also be required for the complete permit package.",
      },
    ],
  },
  {
    slug: "church-school-engineering-projects",
    title: "Church & School Engineering Projects Guide | Apex Grid",
    description:
      "Planning church or school work? Learn how engineering addresses occupied assembly spaces, phasing, existing conditions, building systems, and permits.",
    h1: "What engineering does a church or school project need?",
    answer:
      "Church and school projects need engineering that fits an occupied assembly or education facility, not a generic commercial checklist. Depending on the work, the team may evaluate existing structure, additions, accessibility interfaces, HVAC and electrical capacity, plumbing, fire and life-safety coordination, site drainage, acoustics, and phased construction. The responsible professionals define their disciplines and deliverables from the actual building, proposed use, authority requirements, and construction plan while the owner coordinates safety and operations for people using the facility.",
    topic: "Church and School Engineering Projects",
    serviceHref: "/services/structural",
    founderNote: FOUNDER_NOTE,
    sections: [
      {
        heading: "Start with occupancy, operations, and the project decision",
        body:
          "A sanctuary, classroom wing, gymnasium, cafeteria, auditorium, and administrative area can have different structural and building-system demands. I ask the owner to describe the rooms affected, the work being proposed, the schedule, and how the facility will operate during construction so the responsible team can define an engineering scope that respects both the building and its users.",
        bullets: [
          "Map worship, classroom, assembly, kitchen, gym, office, and support spaces",
          "Identify additions, renovations, equipment, seating, partitions, and special events",
          "Document occupied areas, access restrictions, school calendars, and phased work",
          "Separate owner operations, life-safety planning, design, and contractor responsibilities",
        ],
      },
      {
        heading: "Existing buildings need evidence before new work",
        body:
          "Older institutional buildings may have additions, altered roof lines, undocumented openings, masonry or wood framing, and systems installed over several projects. The engineer needs current drawings, surveys where relevant, photographs, prior permits, equipment records, and information about distress or prior work. I prefer naming uncertainty early rather than carrying an unverified assumption through a phased permit set.",
        bullets: [
          "Verify framing, foundations, roof systems, walls, and connections in affected areas",
          "Locate utilities, shafts, equipment, penetrations, and previous alterations",
          "Record cracking, settlement, water intrusion, corrosion, and inaccessible conditions",
          "Identify survey, geotechnical, testing, or specialty input needed for the decision",
        ],
      },
      {
        heading: "Phasing and coordination belong in the deliverables",
        body:
          "A project can be technically sound and still fail operationally if documents ignore temporary conditions, access, shutdowns, or work boundaries. The design team should coordinate structural, MEP, civil, architectural, fire, and accessibility interfaces and identify what is permanent versus temporary. Contractors plan means and methods unless temporary engineering is specifically assigned in writing.",
        bullets: [
          "Coordinate shutdowns, egress routes, temporary protection, and work-area boundaries",
          "Show permanent loads, openings, supports, equipment, and required connections",
          "Align structural, mechanical, electrical, plumbing, civil, and fire documents",
          "State who designs temporary conditions, inspections, testing, and construction sequencing",
        ],
      },
      {
        heading: "Permit review is project-specific and authority-led",
        body:
          "The permit package may include calculations, drawings, schedules, narratives, energy documents, accessibility information, and forms from several responsible disciplines. The authority determines its submission and review requirements; the engineer does not promise approval. I recommend a controlled sheet index and comment log so phased revisions do not leave stale plans, mismatched equipment, or unresolved responsibility at the next submission.",
        bullets: [
          "Obtain the current authority checklist and adopted code information",
          "Maintain a coordinated sheet index, revision record, and comment response log",
          "Identify professional seals and responsibility by discipline and document",
          "Keep construction, owner operations, inspections, and authority decisions distinct",
        ],
      },
    ],
    extraLinks: [
      { label: "Arizona engineering locations", href: "/locations/arizona/" },
      { label: "Find nearby engineering markets", href: "/metros/" },
      { label: "Structural engineering services", href: "/services/structural" },
      { label: "School renovation engineering context", href: "/engineering-intent/school-renovation-engineering/" },
    ],
    faqs: [
      {
        question: "Does every church or school project need structural engineering?",
        answer:
          "Not every maintenance task requires structural design, but additions, structural alterations, new concentrated loads, roof or framing changes, foundations, and many permit scopes can require engineering. The project drawings and authority requirements determine the responsible scope.",
      },
      {
        question: "Can a school stay occupied during construction?",
        answer:
          "That is an owner, design, contractor, and authority coordination question rather than a universal engineering answer. Phasing may address temporary protection, access, shutdowns, egress, and work boundaries, but the responsible project team must evaluate the actual facility and operations.",
      },
      {
        question: "What documents help begin an institutional project review?",
        answer:
          "Provide the address, existing and proposed plans, room and occupancy information, site or survey records, prior permits, equipment data, photos, schedule constraints, and any authority comments. The team will identify missing evidence and discipline-specific deliverables.",
      },
      {
        question: "Does an engineer manage school or church construction?",
        answer:
          "Engineering design and construction management are different scopes. The engineer prepares or reviews the defined technical work, while the owner and contractor manage operations, means and methods, safety planning, procurement, and installation unless separate written services assign additional responsibilities.",
      },
    ],
  },
  {
    slug: "swimming-pool-structural-engineering",
    title: "Swimming Pool Structural Engineering Guide | Apex Grid",
    description:
      "Planning a swimming pool? Learn how structural engineering addresses the pool shell, soil, water, retaining conditions, decks, equipment, and permits.",
    h1: "When does a swimming pool need structural engineering?",
    answer:
      "A swimming pool project may need structural engineering for the pool shell, retaining walls, elevated or supported decks, nearby foundations, complex excavation, unusual soil or groundwater, equipment supports, or changes that affect an existing building. The design must consider water pressure, soil pressure, uplift, drainage, settlement, reinforcement, joints, and the way construction interacts with adjacent property and structures. A pool contractor’s standard detail may be useful information, but it does not replace project-specific evaluation when conditions fall outside that detail or the authority requires engineered documents.",
    topic: "Swimming Pool Structural Engineering",
    serviceHref: "/services/structural",
    founderNote: FOUNDER_NOTE,
    sections: [
      {
        heading: "The pool is a structure in a site system",
        body:
          "A pool shell holds water while soil and groundwater act outside it, and the surrounding deck, grade, walls, fences, and buildings can change the forces. I ask for the pool geometry, elevations, section details, property information, nearby foundations, and excavation limits so the responsible engineer can evaluate the shell and its interfaces rather than reviewing a shape in isolation.",
        bullets: [
          "Define pool dimensions, depth changes, walls, steps, ledges, and deck elevations",
          "Locate nearby homes, retaining walls, utilities, slopes, and property boundaries",
          "Identify groundwater, drainage, soil, access, and excavation constraints",
          "Separate pool construction, landscape, geotechnical, civil, and structural responsibilities",
        ],
      },
      {
        heading: "Soil, water, and uplift drive the analysis",
        body:
          "The engineer may evaluate internal water pressure, external soil pressure, groundwater, buoyancy, surcharge, settlement, and the reinforcement or support needed for the actual site. Drainage and dewatering assumptions must be buildable and maintainable. I would not treat a generic wall thickness as a complete answer when soil, slope, water, or adjacent loads are uncertain.",
        bullets: [
          "Establish soil and groundwater information appropriate to the project conditions",
          "Check shell strength, reinforcement, joints, supports, and serviceability",
          "Evaluate uplift, empty-pool conditions, drainage, and water-control assumptions",
          "Consider surcharge from buildings, vehicles, grades, walls, and temporary excavation",
        ],
      },
      {
        heading: "Adjacent construction can change the risk",
        body:
          "Excavating near an existing foundation, property line, slope, or utility can create temporary and permanent concerns that are not solved by the pool shell calculation alone. The structural package should identify interfaces, but contractors remain responsible for construction means and methods unless temporary support is specifically designed or reviewed. Site observations and specialty studies may be needed when records are incomplete.",
        bullets: [
          "Document existing foundations, walls, slabs, slopes, utilities, and drainage",
          "Coordinate excavation limits, shoring, underpinning, access, and neighbor protection",
          "Identify equipment pads, covers, walls, decks, and other concentrated supports",
          "State when survey, geotechnical, civil, waterproofing, or specialty review is needed",
        ],
      },
      {
        heading: "Permit documents should match the actual scope",
        body:
          "A pool submission can involve structural drawings, calculations, site plans, grading or drainage information, equipment and electrical documents, safety requirements, and authority forms. The exact checklist varies by project and location. I recommend coordinating the complete set, naming assumptions and exclusions, and keeping revisions controlled so a pool design is not submitted with an outdated grade, equipment layout, or support condition.",
        bullets: [
          "Confirm the current authority checklist and required structural documents",
          "Coordinate pool, site, grading, drainage, equipment, electrical, and architectural plans",
          "Show design assumptions, field-verification limits, and responsibility by discipline",
          "Do not promise permit approval or treat contractor installation as engineering review",
        ],
      },
    ],
    extraLinks: [
      { label: "Arizona engineering locations", href: "/locations/arizona/" },
      { label: "Find nearby engineering markets", href: "/metros/" },
      { label: "Structural engineering services", href: "/services/structural" },
      { label: "Retaining wall engineering guide", href: "/answers/retaining-wall/" },
    ],
    faqs: [
      {
        question: "Does an in-ground pool always need a structural engineer?",
        answer:
          "Not every pool has the same engineering requirement. The shell system, soil, groundwater, slope, nearby structures, excavation, authority checklist, and manufacturer or contractor design determine whether project-specific structural work is required. The responsible engineer and authority control that determination.",
      },
      {
        question: "Can a pool contractor provide all structural design?",
        answer:
          "A contractor or manufacturer may provide standard details or delegated design, but those materials do not automatically address unusual soil, groundwater, adjacent foundations, retaining conditions, or local submission requirements. The project team should identify who is responsible for eligible engineering work.",
      },
      {
        question: "Is pool equipment part of structural engineering?",
        answer:
          "Equipment may create structural loads or require pads, supports, anchors, penetrations, or vibration coordination. Mechanical and electrical design remain separate disciplines unless explicitly included, and the engineer should state exactly which equipment support questions are within scope.",
      },
      {
        question: "What information should I provide for pool engineering?",
        answer:
          "Provide the site address, pool and deck plans, elevations and sections, property and foundation information, soil or groundwater records, photos, utility and access constraints, equipment data, and the authority checklist if available. The engineer will identify remaining verification needs.",
      },
    ],
  },
  {
    slug: "guest-house-casita-engineering",
    title: "Guest House & Casita Engineering Guide | Apex Grid",
    description:
      "Planning a guest house or Arizona casita? Learn how engineering addresses detached foundations, framing, utilities, additions, design, and permits safely.",
    h1: "What engineering does a guest house or casita need?",
    answer:
      "A guest house or casita project needs engineering based on its actual structure, site, connection to other buildings, and intended use. The scope can include foundations, floor and roof framing, lateral resistance, retaining or grading interfaces, utility penetrations, detached or attached connections, and any site-built porch or covered space. In Arizona, “casita” is commonly used for a guest accommodation, but the word alone does not determine whether a project is an accessory dwelling unit, guest suite, addition, or another use. The authority and responsible design professionals decide the applicable requirements from the project facts.",
    topic: "Guest House and Casita Engineering",
    serviceHref: "/services/structural",
    founderNote: FOUNDER_NOTE,
    sections: [
      {
        heading: "Define the casita before choosing the engineering scope",
        body:
          "I ask whether the proposed space is detached, attached, connected by a breezeway, or inside an existing building, and how the owner plans to use it. A bedroom, guest suite, office, workshop, and independent dwelling can create different architectural, structural, utility, and authority questions. The term casita is useful locally, but it is not a substitute for a written project description.",
        bullets: [
          "Describe location, size, stories, rooms, occupancy, and relationship to the main home",
          "Identify detached, attached, breezeway, conversion, and existing-building conditions",
          "Mark porches, patios, shade structures, pools, retaining walls, and site changes",
          "Separate land-use, architecture, structural, civil, MEP, and owner decisions",
        ],
      },
      {
        heading: "Design the detached or connected load path",
        body:
          "The responsible engineer evaluates the new foundation, slab or crawlspace, walls, floor, roof, openings, connections, and lateral system for the proposed geometry and site criteria. An attached guest house also needs a careful look at the interface between old and new construction. I recommend current architectural plans and site information before anyone assumes that a small footprint means a simple structure.",
        bullets: [
          "Coordinate foundation type, soil assumptions, grading, drainage, and settlement concerns",
          "Design gravity and lateral elements, connections, openings, and concentrated reactions",
          "Evaluate movement and load transfer where new work touches the existing home",
          "Include site walls, covered spaces, equipment supports, or other structural scope explicitly",
        ],
      },
      {
        heading: "Arizona terminology does not replace local verification",
        body:
          "A casita may be described differently by homeowners, designers, and authorities, and requirements can vary by jurisdiction and project facts. I do not invent a universal Arizona rule from the label. The owner should obtain the current official instructions and coordinate the applicable use, setbacks, utilities, fire, energy, accessibility, and permit questions with the appropriate professionals.",
        bullets: [
          "Confirm the project address, authority, current checklist, and adopted code information",
          "Gather survey, site, utility, drainage, flood, and soil records when relevant",
          "Clarify whether the structure is a dwelling, guest suite, office, or another use",
          "Record questions owned by the authority, architect, civil, MEP, or structural engineer",
        ],
      },
      {
        heading: "Deliverables should be coordinated before submission",
        body:
          "The engineering deliverable may include calculations, foundation and framing plans, details, schedules, notes, and eligible sealed documents for the accepted scope. The architect or designer coordinates the overall plan set, the contractor controls construction means and methods, and the authority controls review. I recommend a single current background and a revision log so the casita package does not separate utilities, openings, or structural supports.",
        bullets: [
          "Provide complete current architectural plans, elevations, sections, and site information",
          "Coordinate structural sheets with civil, architectural, MEP, energy, and fire documents",
          "State assumptions, exclusions, field verification, seals, and revision responsibilities",
          "Keep permit review, construction observation, and contractor work distinct from design",
        ],
      },
    ],
    extraLinks: [
      { label: "Arizona engineering locations", href: "/locations/arizona/" },
      { label: "Find nearby engineering markets", href: "/metros/" },
      { label: "Residential structural engineering services", href: "/services/structural" },
      { label: "ADU plan engineering context", href: "/answers/adu-plan-engineering-cost/" },
    ],
    faqs: [
      {
        question: "Is a casita the same as an ADU?",
        answer:
          "Not necessarily. Casita is commonly used for a guest accommodation, while an accessory dwelling unit is a defined use under applicable local rules. The actual use, connection to the home, site, plans, and authority determination control the project classification.",
      },
      {
        question: "Does a detached guest house need structural engineering?",
        answer:
          "Many new detached structures require structural design for foundations, framing, lateral resistance, connections, and site conditions, but the exact scope depends on the project and authority. The responsible engineer defines the documents that can be prepared and sealed for the accepted work.",
      },
      {
        question: "Can an existing garage become a casita?",
        answer:
          "A conversion may require evaluation of the existing slab, foundations, openings, framing, moisture conditions, and new loads, along with non-structural design and authority questions. Existing plans are useful evidence but do not establish current conditions or approval by themselves.",
      },
      {
        question: "What should I send before asking about guest-house engineering?",
        answer:
          "Send the address, proposed use, site plan, floor plans, elevations, sections, relationship to the main home, photos, survey or soil information if available, utility concept, and any authority comments. The team can then identify the missing architectural, civil, MEP, and structural inputs.",
      },
    ],
  },
  {
    slug: "manufactured-modular-home-engineering",
    title: "Manufactured & Modular Home Engineering | Apex Grid",
    description:
      "Planning a manufactured or modular home? Learn how engineering covers foundations, anchorage, transport, additions, site work, and permit coordination.",
    h1: "What engineering does a manufactured or modular home need?",
    answer:
      "Manufactured and modular homes need engineering that coordinates the factory-built unit with its foundation, anchorage, site, utilities, transport, installation, and any site-built additions. The required work depends on the home's certification and manufacturer documents, the support system, wind or seismic and other project criteria, site conditions, connection details, and the authority's submission process. A factory drawing or installation manual is important evidence, but it may not address a custom foundation, unusual site, porch, garage, retaining condition, or alteration outside the approved unit.",
    topic: "Manufactured and Modular Home Engineering",
    serviceHref: "/services/structural",
    founderNote: FOUNDER_NOTE,
    sections: [
      {
        heading: "Start with the unit, foundation, and site together",
        body:
          "The factory-built portion is only one part of the engineering question. I ask for the model and configuration, manufacturer drawings, transport dimensions, foundation concept, site plan, grades, soil information, and proposed additions so the responsible engineer can trace loads from the home through supports and anchors into the ground. A generic foundation sketch may not fit the actual site or unit.",
        bullets: [
          "Identify manufactured or modular classification, model, modules, and approved documents",
          "Coordinate foundation, piers, slabs, crawlspaces, anchors, straps, and connections",
          "Record site grades, soil, groundwater, wind or seismic inputs, and access constraints",
          "Separate factory design, site engineering, civil work, installation, and owner scope",
        ],
      },
      {
        heading: "Anchorage and support are project-specific",
        body:
          "The engineer may need to evaluate gravity reactions, uplift, sliding, lateral transfer, bearing, settlement, and the connection between the unit and its support system. Modular sections also need coordinated connections at module interfaces. I would not assume that a manufacturer detail resolves a site-built porch, garage, retaining wall, elevated support, or altered opening unless those conditions are included in the reviewed documents.",
        bullets: [
          "Verify support spacing, bearing, connection hardware, anchors, and load transfer",
          "Evaluate uplift, lateral forces, overturning, settlement, and foundation capacity",
          "Coordinate module-to-module and home-to-addition interfaces where applicable",
          "Identify decks, stairs, porches, garages, shade structures, and equipment supports",
        ],
      },
      {
        heading: "Installation boundaries need to be explicit",
        body:
          "Transportation, lifting, set, blocking, anchorage installation, utility connection, and field adjustments involve several parties. The contractor or installer controls means and methods unless engineering or observation is specifically assigned, while the responsible engineer defines the accepted design scope. I recommend recording field conditions and changes rather than quietly modifying a factory detail during installation.",
        bullets: [
          "Confirm who is responsible for transport, lifting, setting, blocking, and temporary support",
          "Coordinate installer instructions with the current foundation and anchorage documents",
          "Document field changes, damaged components, substitutions, and unresolved conditions",
          "State inspection, observation, testing, and repair responsibilities before work begins",
        ],
      },
      {
        heading: "Coordinate the complete permit and site package",
        body:
          "A submission may combine manufacturer or certification documents with foundation plans, anchorage details, site and grading information, utility plans, architectural documents, and authority forms. The applicable checklist depends on the project location and classification. I recommend a controlled package that identifies each discipline, current revision, supporting evidence, and any items the authority or manufacturer must confirm.",
        bullets: [
          "Obtain the current authority checklist and manufacturer or certification records",
          "Coordinate structural, civil, architectural, MEP, utility, and site documents",
          "Identify professional responsibility, seals, assumptions, exclusions, and field limits",
          "Do not promise approval or treat factory documentation as a universal site approval",
        ],
      },
    ],
    extraLinks: [
      { label: "Texas engineering locations", href: "/locations/texas/" },
      { label: "Find nearby engineering markets", href: "/metros/" },
      { label: "Structural engineering services", href: "/services/structural" },
      { label: "Permit-ready engineering package", href: "/answers/what-is-a-permit-ready-engineering-package/" },
    ],
    faqs: [
      {
        question: "Are manufactured and modular homes engineered the same way?",
        answer:
          "They can involve different documents, certification paths, module connections, foundations, and authority processes. The project classification, manufacturer records, site conditions, proposed alterations, and local requirements determine the responsible engineering scope.",
      },
      {
        question: "Does a manufactured home always need a new foundation design?",
        answer:
          "Not every installation has the same foundation scope, but support, anchorage, soil, site grades, loads, and installation conditions must be matched to the actual home and authority requirements. A standard detail should not be assumed to fit a different site or configuration.",
      },
      {
        question: "Can I add a porch or garage to a manufactured home?",
        answer:
          "Site-built additions need their own coordinated design and connection review, and they may affect the home, foundation, utilities, drainage, or lateral system. The responsible engineer and other design professionals define what is included rather than extending a factory document automatically.",
      },
      {
        question: "What records should I provide for a modular-home review?",
        answer:
          "Provide the model and module drawings, installation or foundation documents, certification information, site plan, proposed additions, photos, survey or soil records, utility information, and authority checklist. The engineer will identify what must be verified in the field.",
      },
    ],
  },
];
