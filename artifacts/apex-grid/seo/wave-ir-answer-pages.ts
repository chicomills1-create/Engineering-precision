import type { Phase0AeoPage } from "./phase0-corpus";

const founderNote = "I'm Jeremy Mills, CEO & Founder of Apex Grid Engineering and a U.S. Air Force veteran. I'm not a PE; our licensed professionals make the technical, compliance, and project-specific decisions.";

export const WAVE_IR_ANSWER_PAGES: Phase0AeoPage[] = [
  {
    slug: "what-drawings-need-engineer-stamp-pennsylvania",
    title: "What Construction Drawings Need a PE Stamp in Pennsylvania?",
    description: "Pennsylvania's UCC decides which building drawings need a PE stamp; Philadelphia and Pittsburgh add their own plan review layers. Here is what needs sealing.",
    h1: "What Construction Drawings Need a PE Stamp in Pennsylvania?",
    answer: "The answer: In Pennsylvania, any drawing that involves engineering design — structural, mechanical, electrical, plumbing, civil site work, and geotechnical recommendations — must be stamped by a Pennsylvania-licensed professional engineer. The Pennsylvania Uniform Construction Code (UCC) requires sealed construction documents for commercial buildings, and the engineer of record must hold an active Pennsylvania PE license and be in responsible charge of the work.\\n\\nThe core stamped drawing sets are structural (foundation plans, framing plans, sections, and details), mechanical (HVAC load calculations, duct layouts, equipment schedules), electrical (panel schedules, one-line diagrams, lighting and power plans), and plumbing (riser diagrams, fixture layouts, water and sanitary calculations). Civil site drawings — grading, stormwater management, erosion and sediment control — carry the civil PE's seal. Projects with challenging soils add a geotechnical report whose foundation recommendations the structural engineer translates into the foundation drawings. Anything involving life safety — fire protection layouts, smoke control, egress structural elements — lands in the stamped column.\\n\\nPennsylvania's UCC sets the statewide baseline, but the big cities run their own show. Philadelphia's Department of Licenses and Inspections (L&I) operates eCLIPSE electronic plan review with zoning review running alongside building plan check; historic district overlays and the Philadelphia amendments to the International Building Code change submittal requirements. Pittsburgh's Department of Permits, Licenses, and Inspections (PLI) runs its own review with hillside and floodplain overlays that matter on the city's steep terrain. Outside the cities, townships and boroughs enforce the UCC through third-party inspection agencies or in-house staff — and some smaller municipalities require stamped drawings for projects the state code might otherwise leave to prescriptive paths.\\n\\nThe gray areas are where owners get surprised. Interior commercial renovations that move no structural elements may go through with architectural drawings alone — until the reviewer spots a new rooftop unit, a relocated sprinkler main, or a changed egress path, and then the MEP sets need stamps. Residential decks and retaining walls often trigger the stamp requirement by height or by local amendment even when the homeowner assumed a prescriptive path. When in doubt, confirm with the authority having jurisdiction before bidding the work, because a missing seal discovered at plan check restarts the review clock.",
    directAnswer: "Pennsylvania's UCC requires a Pennsylvania-licensed PE to stamp all engineering drawings — structural, MEP, civil, and fire protection — for commercial buildings. Philadelphia L&I and Pittsburgh PLI add city-specific plan review layers and local amendments on top of the state code.",
    topic: "PE Stamping by State",
    serviceHref: "/services/structural/",
    sections: [
      {
        heading: "Drawing Sets That Require a Stamp in Pennsylvania",
        body: "Pennsylvania's Uniform Construction Code requires sealed construction documents wherever engineering design is involved. That covers structural drawings for every commercial building — foundations, floor and roof framing, lateral systems, connections, and details. Mechanical drawings need a stamp whenever HVAC systems are designed rather than selected from prescriptive tables: load calculations, ductwork, equipment schedules, and controls. Electrical drawings carry a seal for panel schedules, one-line diagrams, fault current calculations, and lighting and power layouts on commercial work. Plumbing drawings are stamped for riser diagrams, drainage and vent sizing, and water service calculations.\\n\\nCivil site drawings — site layout, grading, stormwater management, erosion and sediment control plans — require a Pennsylvania civil PE's seal, and Pennsylvania's stormwater rules make the civil set one of the most scrutinized packages in the submittal. Fire protection drawings for sprinkler and alarm systems are engineered and stamped. Apex Grid Engineering assigns Pennsylvania-licensed engineers in responsible charge for each discipline on your project, so every sealed sheet traces to the licensed professional who actually directed that design — the standard the state board enforces.",
      },
      {
        heading: "Pennsylvania-Specific Stamp Triggers",
        body: "The UCC is the statewide trigger: commercial construction, additions, and change-of-occupancy projects need sealed drawings as a matter of code. Philadelphia layers its own triggers through L&I — zoning review for use and dimensional compliance runs parallel to building plan check, and projects in historic districts or with special overlays face additional review boards. The Philadelphia amendments to the International Building Code mean a drawing set sealed to the base code can still draw corrections.\\n\\nPittsburgh's PLI review adds hillside development and floodplain overlays that frequently trigger supplemental geotechnical and civil drawings on the city's slopes. Across the rest of the state, the UCC is enforced locally — townships and boroughs use third-party agencies or municipal staff, and local amendments can lower the threshold at which stamped drawings are required. Snow load design is a Pennsylvania constant: the structural drawings must show the ground snow load and the design assumptions, because reviewers from Erie to the Poconos check it. The engineer confirms the municipality, the applicable UCC edition, and local amendments before design starts.",
      },
      {
        heading: "Pennsylvania Drawing Checklist Before Sealing",
        body: "Use this checklist before your Pennsylvania permit set is sealed:\\n\\n• Engineer of record holds an active Pennsylvania PE license, verifiable on the state board roster\\n• Seal shows name, Pennsylvania license number, and date on every sealed sheet\\n• Responsible charge is genuine: the sealing engineer directed the design decisions\\n• UCC edition and local amendments identified for the specific municipality\\n• Philadelphia projects: eCLIPSE submittal format and zoning review coordinated with building plan check\\n• Pittsburgh projects: hillside and floodplain overlays checked for supplemental drawing needs\\n• Snow loads, wind speeds, and seismic design category stated on the structural drawings\\n• Stormwater management and erosion control drawings sealed by the civil PE\\n• Fire protection and life-safety systems engineered and stamped where required",
      },
    ],
    faqs: [
      {
        question: "Does Philadelphia require anything different from the rest of Pennsylvania?",
        answer: "Yes. Philadelphia's Department of Licenses and Inspections runs its own electronic plan review through eCLIPSE, applies Philadelphia amendments to the building code, and runs zoning review in parallel with building plan check. Historic district overlays add another review layer. Your engineer must design to the Philadelphia amendments, not just the base UCC.",
      },
      {
        question: "Who enforces the building code outside Pennsylvania's big cities?",
        answer: "The UCC is enforced at the municipal level — townships and boroughs administer it through in-house staff or contracted third-party inspection agencies. Requirements can vary: some municipalities demand stamped drawings for smaller projects than the state code minimums. Always confirm the local threshold before assuming a prescriptive path.",
      },
      {
        question: "Do residential projects in Pennsylvania need stamped drawings?",
        answer: "It depends on scope and municipality. Conventional light-frame homes often follow prescriptive code paths, but engineered elements — tall retaining walls, non-conventional framing, additions with structural changes, and projects on steep or floodplain lots — trigger the stamp requirement. Many townships set their own thresholds, so check locally.",
      },
      {
        question: "Can an out-of-state engineer stamp my Pennsylvania drawings?",
        answer: "Only after obtaining a Pennsylvania PE license. Pennsylvania offers comity licensure for engineers licensed elsewhere, but the seal cannot go on Pennsylvania drawings until the Pennsylvania license is active. Working under a Pennsylvania-licensed engineer in responsible charge is the compliant path while licensure is pending.",
      },
    ],
    extraLinks: [
      { label: "What does the plan check corrections process involve?", href: "/answers/plan-check-corrections-process-explained/" },
      { label: "How do freeze-thaw and snow loads shape Pennsylvania engineering?", href: "/answers/pennsylvania-freeze-thaw-snow-engineering/" },
      { label: "When does an architect's stamp differ from a PE stamp?", href: "/answers/architect-stamp-vs-pe-stamp/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "what-drawings-need-engineer-stamp-delaware",
    title: "What Building Drawings Need an Engineer Stamp in Delaware?",
    description: "Delaware runs plan review through its three counties, and Sussex County's coastal flood zones add drawing requirements. Learn which sets need a PE seal.",
    h1: "What Building Drawings Need an Engineer Stamp in Delaware?",
    answer: "The answer: In Delaware, drawings involving structural, mechanical, electrical, plumbing, or civil engineering must be stamped by a Delaware-licensed professional engineer in responsible charge of the work. Commercial buildings, additions, and most non-prescriptive residential work need sealed construction documents, and the seal must show the engineer's name, Delaware PE number, and date.\\n\\nThe stamped sets are the familiar core: structural drawings (foundations, framing, lateral systems, details), mechanical (HVAC design, load calculations, duct layouts), electrical (service and distribution, panel schedules, one-line diagrams), and plumbing (risers, drainage sizing, water service). Civil site drawings — grading, stormwater, erosion and sediment control — carry the civil PE's seal. Delaware's flat coastal plain makes stormwater management and floodplain compliance central to nearly every site package, and the drawings must show finished floor elevations relative to the base flood elevation where flood zones apply.\\n\\nDelaware's three counties each run their own land-use and building review. New Castle County's Department of Land Use handles the state's densest development corridor along I-95, with subdivision and site plan review layered on building permits. Kent County runs a smaller-volume review centered on Dover. Sussex County — the beach county — is where the coastal drawing requirements bite: FEMA flood zones, DNREC coastal zone regulations, and dune and wetland protections add elevation certificates, breakaway wall details, and flood-resistant construction notes to the drawing set. A beach house in Sussex needs a fundamentally different structural package than a warehouse in New Castle.\\n\\nGray areas cluster around small commercial tenant fit-outs and residential additions. A simple interior office renovation with no structural or MEP changes may permit without stamped engineering — but add a rooftop unit, move a demising wall with the sprinkler system, or change the occupancy, and the stamped sets come back into play. Delaware's small size means reviewers know the local contractors and the local soil conditions; submittals that ignore the county's expectations get corrected fast.",
    directAnswer: "Delaware requires a Delaware-licensed PE to stamp structural, MEP, and civil drawings for commercial construction. New Castle, Kent, and Sussex counties each run their own plan review, with Sussex County adding coastal flood-zone requirements like elevated foundations near the beaches.",
    topic: "PE Stamping by State",
    serviceHref: "/services/structural/",
    sections: [
      {
        heading: "Drawing Sets That Require a Stamp in Delaware",
        body: "Delaware's building codes, adopted statewide and enforced at the county level, require sealed drawings wherever engineering judgment is exercised. Structural sets — foundation plans, floor and roof framing, wind and lateral detailing, connection schedules — need the PE seal on commercial projects and on residential work beyond prescriptive limits. Mechanical drawings are stamped when HVAC systems are engineered: load calculations, equipment selection, duct design, and ventilation for the occupancy. Electrical drawings carry the seal for service sizing, distribution, panel schedules, and emergency systems. Plumbing sets are stamped for engineered drainage, vent, and water systems.\\n\\nThe civil site package is a Delaware staple: grading plans, stormwater management per state sediment and stormwater regulations, and erosion control during construction. On coastal and floodplain sites, the drawings must document base flood elevations, finished floor elevations, and flood-resistant construction details. Fire protection systems are engineered and stamped. Apex Grid Engineering assigns Delaware-licensed engineers in responsible charge for each discipline, so every sealed sheet reflects the licensed professional who directed the work — the responsible-charge standard Delaware's board requires.",
      },
      {
        heading: "Delaware-Specific Stamp Triggers",
        body: "The county is the trigger map in Delaware. New Castle County's Department of Land Use runs plan review for the Wilmington-to-Newark corridor with its own subdivision, land development, and building permit processes — commercial projects there move through a layered review where the site plan and the building permit are coordinated but separate tracks. Kent County's review is leaner but follows the same state codes. Sussex County is the special case: the beach towns and the inland bays sit in FEMA flood zones where the structural drawings must show breakaway walls, elevated foundations, and flood-resistant materials, and DNREC's coastal programs add environmental review that shapes the civil drawings.\\n\\nWind design matters statewide — Delaware's coastal exposure puts the whole state in meaningful wind territory, and the structural drawings state the wind speed and exposure used in design. The other Delaware constant is water: high water tables and poor drainage soils mean foundation and site drawings get close reviewer attention. The engineer confirms the county, the flood zone status, and any DNREC jurisdiction before the drawing list is finalized.",
      },
      {
        heading: "Delaware Drawing Checklist Before Sealing",
        body: "Use this checklist before your Delaware permit set is sealed:\\n\\n• Engineer of record holds an active Delaware PE license, verifiable on the state board roster\\n• Seal shows name, Delaware license number, and date on every sealed sheet\\n• Responsible charge is genuine: the sealing engineer directed the design decisions\\n• County review path confirmed: New Castle Land Use, Kent, or Sussex requirements\\n• Flood zone status checked; base flood elevation and finished floor elevations on the drawings\\n• Sussex coastal projects: breakaway walls, elevated foundations, and flood-resistant details shown\\n• Stormwater management and erosion control per Delaware sediment and stormwater regulations\\n• Wind speed and exposure category stated on the structural drawings",
      },
    ],
    faqs: [
      {
        question: "Do I need stamped drawings for a beach house in Sussex County?",
        answer: "Almost certainly. Sussex County's coastal flood zones require elevated foundations, breakaway walls, and flood-resistant construction details that go well beyond prescriptive residential paths. The structural and civil drawings need a Delaware PE seal, and DNREC coastal review may add environmental conditions to the site package.",
      },
      {
        question: "Who reviews building plans in Delaware?",
        answer: "The three counties: New Castle County's Department of Land Use, Kent County, and Sussex County each run building plan review and permitting. There is no single statewide building department — the county is your authority having jurisdiction, with state agencies like DNREC layered on for coastal and environmental matters.",
      },
      {
        question: "Can an out-of-state engineer stamp my Delaware drawings?",
        answer: "Only after obtaining a Delaware PE license. Delaware offers comity for engineers licensed in other states, but the seal cannot be applied to Delaware drawings until the Delaware license is active. The compliant interim path is working under a Delaware-licensed engineer in responsible charge.",
      },
      {
        question: "Do small commercial renovations in Delaware need stamped drawings?",
        answer: "It depends on scope. A cosmetic tenant fit-out with no structural, MEP, or occupancy changes may permit without engineering. Once you touch the structure, add or relocate mechanical or electrical systems, modify sprinklers, or change the occupancy classification, stamped drawings are typically required.",
      },
    ],
    extraLinks: [
      { label: "What do Delaware coastal flood engineering requirements cover?", href: "/answers/delaware-coastal-flood-engineering-requirements/" },
      { label: "How does plan check resubmittal work?", href: "/answers/how-does-plan-check-resubmittal-work/" },
      { label: "Can a PE stamp drawings in another state?", href: "/answers/can-a-pe-stamp-drawings-in-another-state/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "what-drawings-need-engineer-stamp-maryland",
    title: "What Construction Drawings Need an Engineer Stamp in Maryland?",
    description: "Maryland counties run their own plan review with local amendments, and the Eastern Shore adds coastal wind rules. See which drawings need a PE seal here.",
    h1: "What Construction Drawings Need an Engineer Stamp in Maryland?",
    answer: "The answer: In Maryland, any drawing involving engineering design — structural, mechanical, electrical, plumbing, fire protection, or civil site work — must be stamped by a Maryland-licensed professional engineer in responsible charge. Commercial construction documents need sealed drawings as a matter of code, and the seal must show the engineer's name, Maryland PE number, and date.\\n\\nThe stamped sets break down by discipline. Structural drawings cover foundations, framing, lateral systems, and details, with the seismic and wind design parameters stated on the cover sheet. Mechanical drawings include HVAC load calculations, ductwork, equipment schedules, and ventilation design. Electrical drawings cover service and distribution, panel schedules, one-line diagrams, and emergency and life-safety systems. Plumbing drawings include riser diagrams, drainage and vent sizing, and water service calculations. Civil site drawings — grading, stormwater management, sediment control — carry the civil PE's seal, and in Maryland the stormwater package is one of the most heavily reviewed parts of any submittal.\\n\\nMaryland is a county-driven state: each county runs its own permitting with local amendments layered on the state-adopted codes. Montgomery County's Department of Permitting Services (DPS) runs a rigorous electronic review for the DC-suburb corridor; Prince George's County DPIE runs its own parallel process; Baltimore County and Howard County each have distinct checklists and review cultures. On the Eastern Shore and around the Chesapeake Bay, coastal wind provisions change the structural package — the drawings must address the wind speeds and exposure for waterfront sites. Historic districts in Annapolis, Baltimore, and Frederick add design review that can send drawings back for architectural coordination before engineering is even checked.\\n\\nThe gray areas tend to involve renovations and small commercial work. A straightforward office tenant fit-out with no structural changes and only minor MEP adjustments may permit with limited engineering — but Maryland counties are thorough reviewers, and a relocated sprinkler main, a new rooftop unit, or an occupancy change pulls the full stamped MEP sets back in. Residential additions beyond prescriptive limits, decks above certain heights, and retaining walls generally need seals. Confirm the county's threshold early, because each county sets its own.",
    directAnswer: "Maryland requires a Maryland-licensed PE to stamp all engineering drawings — structural, MEP, civil, and fire protection. Each county runs its own plan review with local amendments, and Eastern Shore and Chesapeake waterfront projects add coastal wind detailing to the structural package.",
    topic: "PE Stamping by State",
    serviceHref: "/services/structural/",
    sections: [
      {
        heading: "Drawing Sets That Require a Stamp in Maryland",
        body: "Maryland's adopted building codes require sealed construction documents wherever engineering design is performed. Structural drawings — foundation plans, floor and roof framing, lateral force-resisting systems, connection details — need the PE seal on commercial work and on residential projects beyond prescriptive scope. Mechanical drawings are stamped for engineered HVAC: load calculations, equipment selection, duct layouts, and ventilation rates for the occupancy. Electrical drawings carry the seal for service sizing, distribution design, panel schedules, fault current analysis, and emergency systems. Plumbing sets are stamped for engineered sanitary, storm, and water systems.\\n\\nCivil site drawings are a Maryland centerpiece: grading, stormwater management under the state's stormwater regulations, and sediment and erosion control during construction all require the civil PE's seal. Maryland's stormwater rules are among the strictest in the region, and the drawings must show environmental site design practices, not just detention ponds. Fire protection drawings for sprinklers and alarms are engineered and stamped. Apex Grid Engineering assigns Maryland-licensed engineers in responsible charge for each discipline, so every sealed sheet traces to the licensed professional who directed the design.",
      },
      {
        heading: "Maryland-Specific Stamp Triggers",
        body: "The county is everything in Maryland. Montgomery County DPS applies county amendments and runs one of the most demanding electronic reviews in the state — incomplete stormwater or energy documentation gets bounced before structural review even starts. Prince George's County DPIE runs its own review track with county-specific checklists. Baltimore County, Howard County, Anne Arundel County, and Frederick County each layer local amendments on the state code, and the applicable amendments change the drawing content the reviewer expects to see.\\n\\nThe Eastern Shore and the Chesapeake Bay waterfront add the coastal trigger: structural drawings must show the design wind speed, exposure category, and wind-borne debris provisions for sites in the wind-borne debris region, and floodplain construction must document elevations and flood-resistant details. Around the Bay, critical area regulations can add environmental conditions to the civil site package. The engineer confirms the county, the local amendments, the flood zone, and the wind-borne debris region status before the drawing list is set — Maryland reviewers check all four.",
      },
      {
        heading: "Maryland Drawing Checklist Before Sealing",
        body: "Use this checklist before your Maryland permit set is sealed:\\n\\n• Engineer of record holds an active Maryland PE license, verifiable on the state board roster\\n• Seal shows name, Maryland license number, and date on every sealed sheet\\n• Responsible charge is genuine: the sealing engineer directed the design decisions\\n• County review path and local amendments confirmed: Montgomery DPS, Prince George's DPIE, Baltimore County, or other\\n• Stormwater management and sediment control per Maryland regulations, sealed by the civil PE\\n• Wind speed, exposure, and wind-borne debris provisions stated for coastal and Bay-front sites\\n• Flood zone elevations and flood-resistant construction details where applicable\\n• Energy code compliance documentation included for the applicable code cycle",
      },
    ],
    faqs: [
      {
        question: "Why does Maryland plan review vary so much by county?",
        answer: "Maryland adopts statewide codes but lets each county administer permitting with local amendments. Montgomery County DPS, Prince George's County DPIE, Baltimore County, and the others each run their own electronic review, checklists, and amendment packages. The same building in Montgomery County versus Anne Arundel County faces different submittal requirements.",
      },
      {
        question: "Do waterfront projects on the Chesapeake Bay need special drawings?",
        answer: "Yes. Bay-front and Eastern Shore sites fall under coastal wind provisions — the structural drawings must show the design wind speed, exposure category, and wind-borne debris protection for glazing. Floodplain sites need elevation documentation, and critical area rules can add environmental conditions to the civil package.",
      },
      {
        question: "How strict is Maryland stormwater review?",
        answer: "Very. Maryland's stormwater regulations emphasize environmental site design, and county reviewers scrutinize the civil drawings closely. The stormwater management plan is frequently the longest pole in the plan review tent — engage the civil engineer early and design the stormwater approach before the site layout is locked.",
      },
      {
        question: "Can an out-of-state engineer stamp my Maryland drawings?",
        answer: "Only after obtaining a Maryland PE license. Maryland offers comity licensure, but the seal cannot go on Maryland drawings until the Maryland license is active. Working under a Maryland-licensed engineer in responsible charge is the compliant interim path.",
      },
    ],
    extraLinks: [
      { label: "What do Maryland coastal wind engineering requirements involve?", href: "/answers/maryland-coastal-wind-engineering-requirements/" },
      { label: "What do ASCE 7 wind load provisions require?", href: "/answers/asce-7-wind-load-provisions/" },
      { label: "How long does plan check take?", href: "/answers/how-long-does-plan-check-take/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "what-drawings-need-engineer-stamp-virginia",
    title: "What Construction Drawings Need an Engineer Stamp in Virginia?",
    description: "Virginia's USBC sets the baseline, but Northern Virginia counties demand full site-plan drawing packages. Learn which sets need a PE seal in Virginia.",
    h1: "What Construction Drawings Need an Engineer Stamp in Virginia?",
    answer: "The answer: In Virginia, drawings involving structural, mechanical, electrical, plumbing, or civil engineering must be stamped by a Virginia-licensed professional engineer in responsible charge, under the Virginia Uniform Statewide Building Code (USBC). Commercial buildings need sealed construction documents, and the seal must show the engineer's name, Virginia PE number, and date.\\n\\nThe stamped drawing sets are structural (foundations, framing, lateral systems, details with wind and seismic parameters stated), mechanical (HVAC loads, ductwork, equipment schedules, ventilation), electrical (service, distribution, panel schedules, one-line diagrams, emergency systems), and plumbing (risers, drainage and vent sizing, water service). Fire protection drawings for sprinkler and alarm systems are engineered and stamped. But in Virginia, the site plan package is often as big a deliverable as the building: grading, stormwater management, erosion and sediment control, and VDOT entrance and roadway work all carry the civil PE's seal.\\n\\nNorthern Virginia is where the drawing list grows. Fairfax County, Loudoun County, Prince William County, and Arlington run detailed site plan and subdivision review in parallel with building permits — the site plan goes through its own review track with public facilities, transportation, and stormwater conditions before the building permit is even filed. VDOT controls entrances on state-maintained roads, which covers most arterials, so the civil drawings include VDOT-compliant entrance design and sometimes turn-lane or signal work. Virginia DEQ's stormwater program (VSMP) adds state-level stormwater permitting to the local site plan. A commercial project in Fairfax or Loudoun typically needs a full engineered site plan package sealed months before the building drawings are submitted.\\n\\nGray areas include small tenant fit-outs and residential additions. A cosmetic office renovation with no structural or MEP changes may permit without new engineering — but Virginia's counties are meticulous reviewers, and new rooftop equipment, sprinkler modifications, or occupancy changes trigger stamped MEP sets. Residential work beyond prescriptive limits — tall retaining walls, non-conventional framing, steep-slope lots in the western counties — needs seals. Confirm the county's site plan thresholds early, because Northern Virginia's are lower than most owners expect.",
    directAnswer: "Virginia's USBC requires a Virginia-licensed PE to stamp structural, MEP, fire protection, and civil drawings. Northern Virginia counties add a full engineered site-plan package — grading, stormwater, VDOT entrances — reviewed and approved on its own track before the building permit.",
    topic: "PE Stamping by State",
    serviceHref: "/services/structural/",
    sections: [
      {
        heading: "Drawing Sets That Require a Stamp in Virginia",
        body: "Virginia's Uniform Statewide Building Code requires sealed construction documents wherever engineering design is exercised. Structural drawings — foundation plans, floor and roof framing, lateral force-resisting systems, connection schedules — need the PE seal, with wind speed, exposure, and seismic design category stated on the drawings. Mechanical drawings are stamped for engineered HVAC: load calculations, equipment selection, duct design, and ventilation. Electrical drawings carry the seal for service and distribution design, panel schedules, one-line diagrams, and life-safety systems. Plumbing sets are stamped for engineered drainage, vent, and water systems.\\n\\nThe civil site package is the Virginia signature deliverable: site layout, grading, stormwater management under Virginia DEQ's VSMP program, erosion and sediment control, and VDOT entrance and off-site roadway improvements — all sealed by the civil PE. In Northern Virginia, this package goes through county site plan review as a standalone approval with conditions that then govern the building permit. Fire protection systems are engineered and stamped. Apex Grid Engineering assigns Virginia-licensed engineers in responsible charge for each discipline, so every sealed sheet belongs to the licensed professional who directed that design.",
      },
      {
        heading: "Virginia-Specific Stamp Triggers",
        body: "The USBC sets the statewide baseline, but the county sets the real drawing list. Fairfax County's site plan process is famously thorough — the engineered site plan, with grading, stormwater, landscaping, and transportation conditions, is approved before building permits issue, and the building drawings must conform to the approved site plan. Loudoun County and Prince William County run similar parallel tracks. VDOT is the other Virginia trigger: entrances on state roads need VDOT permits with engineered entrance design, sight-distance documentation, and sometimes turn lanes or signal modifications.\\n\\nVirginia DEQ's stormwater program adds state permitting on top of county review for land-disturbing activities, and the erosion and sediment control drawings are reviewed against state standards. In the western counties, steep slopes and karst geology can trigger supplemental geotechnical drawings. The engineer confirms the county, VDOT jurisdiction over the road frontage, and VSMP applicability before scoping the drawing packages — in Northern Virginia, the site plan scope decision comes first and the building scope follows.",
      },
      {
        heading: "Virginia Drawing Checklist Before Sealing",
        body: "Use this checklist before your Virginia permit set is sealed:\\n\\n• Engineer of record holds an active Virginia PE license, verifiable on the state board roster\\n• Seal shows name, Virginia license number, and date on every sealed sheet\\n• Responsible charge is genuine: the sealing engineer directed the design decisions\\n• USBC edition and county amendments identified for the specific locality\\n• Northern Virginia projects: site plan approval track scoped and sequenced ahead of the building permit\\n• VDOT entrance design and permits addressed for state-road frontage\\n• Stormwater management per Virginia DEQ VSMP requirements, sealed by the civil PE\\n• Wind speed, exposure, and seismic design category stated on the structural drawings",
      },
    ],
    faqs: [
      {
        question: "What is the difference between site plan approval and a building permit in Northern Virginia?",
        answer: "They are separate review tracks. Counties like Fairfax and Loudoun approve an engineered site plan — grading, stormwater, transportation, landscaping — with binding conditions first, and the building permit is then reviewed for conformance to the approved site plan. The site plan package is typically sealed and submitted months before the building drawings.",
      },
      {
        question: "When does VDOT get involved in my project?",
        answer: "Whenever your site takes access from a state-maintained road, which includes most arterials and many collectors in Virginia. VDOT requires an engineered entrance design with sight-distance analysis and may require turn lanes, signal modifications, or off-site improvements. Your civil engineer coordinates the VDOT permit alongside the county site plan.",
      },
      {
        question: "Do residential additions in Virginia need stamped drawings?",
        answer: "Beyond prescriptive code limits, yes. Conventional light-frame additions often follow prescriptive paths, but structural changes, non-conventional framing, tall retaining walls, and steep-slope or floodplain sites trigger engineered and sealed drawings. Each county sets its own thresholds — Northern Virginia counties tend to require engineering sooner.",
      },
      {
        question: "Can an out-of-state engineer stamp my Virginia drawings?",
        answer: "Only after obtaining a Virginia PE license. Virginia offers comity licensure, but the seal cannot be applied until the Virginia license is active. Working under a Virginia-licensed engineer in responsible charge is the compliant path while licensure is pending.",
      },
    ],
    extraLinks: [
      { label: "What do Virginia seismic and wind engineering requirements cover?", href: "/answers/virginia-seismic-wind-engineering-requirements/" },
      { label: "What does a geotechnical report explain?", href: "/answers/geotechnical-report-explained/" },
      { label: "How do I read structural drawings?", href: "/answers/how-to-read-structural-drawings/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "what-drawings-need-engineer-stamp-west-virginia",
    title: "Which Drawings Need an Engineer Stamp in West Virginia?",
    description: "West Virginia's mined land and steep slopes make geotechnical drawings central to the permit set. Learn which drawing sets need a PE seal before you build.",
    h1: "Which Drawings Need an Engineer Stamp in West Virginia?",
    answer: "The answer: In West Virginia, drawings involving structural, mechanical, electrical, plumbing, or civil engineering must be stamped by a West Virginia-licensed professional engineer in responsible charge. Commercial construction documents need sealed drawings under the state-adopted building codes, and the seal must show the engineer's name, West Virginia PE number, and date.\\n\\nThe stamped sets are structural (foundations, framing, lateral systems, details), mechanical (HVAC design, load calculations, ductwork, ventilation), electrical (service and distribution, panel schedules, one-line diagrams), and plumbing (risers, drainage sizing, water service). Civil site drawings — grading, stormwater, erosion control — carry the civil PE's seal. Fire protection systems are engineered and stamped. What distinguishes a West Virginia drawing set from a flat-state package is the geotechnical component: the foundation drawings must respond to a geotechnical report that addresses the site's actual ground conditions, and on mined or steep sites that report drives the entire structural design.\\n\\nMine subsidence is the West Virginia-specific trigger that reshapes drawing sets. Large parts of the state sit over historic underground mines, and structures over or near mine voids need geotechnical investigation — borings, mine void analysis, subsidence risk assessment — documented in drawings that show mitigation: deep foundations to competent strata below the mine zone, grouting programs, or articulated foundations designed to tolerate movement. Steep slopes add another layer: hillside sites need geotechnical slope-stability analysis reflected in grading plans, retaining wall drawings, and foundation details. Floodplain sites along the state's rivers need elevation documentation, and WVDEP stormwater and erosion rules shape the civil package.\\n\\nGray areas center on small commercial and residential work in the state's many small municipalities. Some towns have limited plan review staff and defer heavily to the state code — but that does not waive the seal requirement where the code calls for engineering. Residential additions on mined or hillside lots routinely need geotechnical and structural seals even when the homeowner expected a simple permit. Confirm mine-map status and municipal requirements early: a subsidence investigation ordered after the drawings are done is the most expensive kind.",
    directAnswer: "West Virginia requires a West Virginia-licensed PE to stamp structural, MEP, and civil drawings for commercial work. Mined land adds geotechnical subsidence drawings — deep foundations or mine void grouting — and steep slopes add slope-stability analysis to the permit set.",
    topic: "PE Stamping by State",
    serviceHref: "/services/structural/",
    sections: [
      {
        heading: "Drawing Sets That Require a Stamp in West Virginia",
        body: "West Virginia's adopted building codes require sealed construction documents wherever engineering design is performed. Structural drawings — foundation plans, floor and roof framing, lateral systems, connection details — need the PE seal on commercial projects, with wind and snow parameters stated for the site elevation. Mechanical drawings are stamped for engineered HVAC: load calculations, equipment selection, duct layouts, and ventilation. Electrical drawings carry the seal for service sizing, distribution, panel schedules, and emergency systems. Plumbing sets are stamped for engineered sanitary, storm, and water systems.\\n\\nThe civil site package — grading, stormwater management, erosion and sediment control — requires the civil PE's seal and is reviewed against WVDEP requirements. The geotechnical report is the drawing set's foundation: boring logs, bearing recommendations, and subsidence or slope analysis that the structural engineer converts into foundation plans, retaining wall details, and grading notes. On mined sites, the drawings show the mitigation explicitly — pile depths to competent rock, grouting extents, or movement-tolerant detailing — because the reviewer checks the drawings against the geotechnical recommendations. Fire protection systems are engineered and stamped. Apex Grid Engineering assigns West Virginia-licensed engineers in responsible charge for each discipline, so every sealed sheet traces to the licensed professional who directed the work.",
      },
      {
        heading: "West Virginia-Specific Stamp Triggers",
        body: "Mine subsidence is the defining West Virginia trigger. The state's mining maps identify areas undermined by historic coal operations, and building over or adjacent to mine voids requires geotechnical investigation and engineered mitigation shown on the drawings. Reviewers in mining counties expect to see the subsidence analysis and the corresponding foundation design — deep foundations bearing below the mine horizon, mine void grouting programs, or structural systems detailed to accommodate ground movement. A foundation designed as if the ground were intact will not survive plan review on a mined site.\\n\\nSteep terrain is the second trigger: West Virginia's ridges and hollows mean many commercial sites need slope-stability analysis, engineered retaining walls, and hillside grading plans with geotechnical sign-off. Floodplain development along the Kanawha, Monongahela, Ohio, and their tributaries adds elevation certificates and flood-resistant construction details. WVDEP's stormwater and erosion control rules govern the civil drawings for land-disturbing activities. The engineer checks mining maps, slope conditions, and floodplain status before scoping the drawing set — in West Virginia, the ground investigation comes before the architecture is finalized.",
      },
      {
        heading: "West Virginia Drawing Checklist Before Sealing",
        body: "Use this checklist before your West Virginia permit set is sealed:\\n\\n• Engineer of record holds an active West Virginia PE license, verifiable on the state board roster\\n• Seal shows name, West Virginia license number, and date on every sealed sheet\\n• Responsible charge is genuine: the sealing engineer directed the design decisions\\n• Mining maps checked; subsidence investigation and mitigation drawings completed for mined sites\\n• Geotechnical report addresses slopes, bearing strata, and groundwater for the specific site\\n• Deep foundation, grouting, or movement-tolerant details shown where mine voids exist\\n• Slope-stability analysis and engineered retaining walls for hillside sites\\n• Floodplain elevations and flood-resistant details where applicable",
      },
    ],
    faqs: [
      {
        question: "What is mine subsidence and why does it change my drawings?",
        answer: "Historic underground coal mining left voids beneath large areas of West Virginia. If those voids collapse, the ground above settles — sometimes dramatically. Building over mined land requires geotechnical investigation of the mine voids and engineered mitigation on the drawings: foundations bearing on competent strata below the mines, grouting to fill voids, or structures detailed to tolerate movement.",
      },
      {
        question: "How do I know if my site is over old mines?",
        answer: "West Virginia maintains mining maps showing historic underground operations. Your geotechnical engineer reviews these maps, conducts borings to confirm conditions, and documents the findings. This investigation should happen during due diligence — before the building design is finalized — because the results can change the foundation system entirely.",
      },
      {
        question: "Do small towns in West Virginia require stamped drawings?",
        answer: "The state-adopted building codes set the seal requirements, and they apply regardless of municipality size. Some small towns have limited review staff, but that does not waive the engineering requirements — and building over mines or on steep slopes triggers engineered drawings in any jurisdiction. Confirm requirements with the local authority having jurisdiction.",
      },
      {
        question: "Can an out-of-state engineer stamp my West Virginia drawings?",
        answer: "Only after obtaining a West Virginia PE license. The state offers comity licensure, but the seal cannot be applied until the West Virginia license is active. Working under a West Virginia-licensed engineer in responsible charge is the compliant interim path.",
      },
    ],
    extraLinks: [
      { label: "What does mine subsidence mitigation design involve?", href: "/answers/mine-subsidence-mitigation-design/" },
      { label: "What do West Virginia mine subsidence engineering requirements cover?", href: "/answers/west-virginia-mine-subsidence-engineering/" },
      { label: "What does a geotechnical report explain?", href: "/answers/geotechnical-report-explained/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "what-drawings-need-engineer-stamp-north-carolina",
    title: "What Building Drawings Need an Engineer Stamp in North Carolina?",
    description: "North Carolina's coast adds wind-borne debris and CAMA rules to the drawing set. Learn which drawings need a PE seal, from the Outer Banks to Charlotte.",
    h1: "What Building Drawings Need an Engineer Stamp in North Carolina?",
    answer: "The answer: In North Carolina, drawings involving structural, mechanical, electrical, plumbing, or civil engineering must be stamped by a North Carolina-licensed professional engineer in responsible charge. Commercial buildings need sealed construction documents under the North Carolina State Building Code, and the seal must show the engineer's name, North Carolina PE number, and date.\\n\\nThe stamped sets are structural (foundations, framing, lateral systems, details with wind and seismic parameters), mechanical (HVAC loads, ductwork, equipment schedules), electrical (service, distribution, panel schedules, one-line diagrams), and plumbing (risers, drainage sizing, water service). Civil site drawings — grading, stormwater, erosion control — carry the civil PE's seal. Fire protection systems are engineered and stamped. From the mountains to the coast, the structural drawings must state the design wind speed and exposure — and on the coast, that line on the cover sheet carries more weight than anywhere else in the state.\\n\\nThe North Carolina coast is where the drawing set transforms. The Outer Banks, the Crystal Coast, and the southeastern beaches sit in the wind-borne debris region: the structural drawings must show impact-resistant glazing or shutters, the building envelope details must address wind-driven rain, and elevated foundations with breakaway walls are standard in the flood zones. CAMA — the Coastal Area Management Act — adds state coastal review that shapes the civil site drawings: dune protection, wetland buffers, and oceanfront setbacks appear as conditions the drawings must satisfy. Hurricane history is written into the expectations — reviewers on the coast check the wind detailing with the memory of every storm that has hit those counties.\\n\\nInland, the triggers are more conventional but still real. Charlotte, Raleigh, and the Triad run thorough municipal plan review with local amendments; the mountain counties add snow loads and steep-slope geotechnical requirements; the Piedmont's clay soils shape foundation drawings. Gray areas include residential additions and small commercial upfits — prescriptive paths exist, but coastal sites, floodplains, and structural changes pull projects into engineered and sealed territory quickly. Confirm the wind-borne debris region boundary for the specific site early, because it changes the glazing specification and the structural details.",
    directAnswer: "North Carolina requires a North Carolina-licensed PE to stamp structural, MEP, and civil drawings for commercial work. Coastal projects add wind-borne debris detailing, impact-resistant glazing, elevated foundations with breakaway walls, plus the state-mandated CAMA coastal review to the drawing set.",
    topic: "PE Stamping by State",
    serviceHref: "/services/structural/",
    sections: [
      {
        heading: "Drawing Sets That Require a Stamp in North Carolina",
        body: "North Carolina's State Building Code requires sealed construction documents wherever engineering design is performed. Structural drawings — foundation plans, floor and roof framing, lateral force-resisting systems, connection details — need the PE seal, with the design wind speed, exposure category, and seismic design category stated on the drawings. Mechanical drawings are stamped for engineered HVAC: load calculations, equipment selection, duct design, and ventilation rates. Electrical drawings carry the seal for service and distribution design, panel schedules, one-line diagrams, and emergency systems. Plumbing sets are stamped for engineered drainage, vent, and water systems.\\n\\nCivil site drawings — grading, stormwater management, erosion and sediment control — require the civil PE's seal and follow both municipal and state requirements. On the coast, the structural package expands: wind-borne debris protection notes, impact-resistant opening schedules, continuous load path details from roof to foundation, and breakaway wall and elevated foundation details in flood zones. Fire protection systems are engineered and stamped. Apex Grid Engineering assigns North Carolina-licensed engineers in responsible charge for each discipline, so every sealed sheet belongs to the licensed professional who directed the design.",
      },
      {
        heading: "North Carolina-Specific Stamp Triggers",
        body: "The coast is the dominant North Carolina trigger. Sites in the wind-borne debris region — the Outer Banks, the Crystal Coast, Wilmington and the southeastern beaches — require the structural drawings to show debris-impact protection for all glazed openings: impact-rated windows and doors or engineered shutter systems, with product approvals documented. The continuous load path from roof covering through walls to the foundation must be detailed explicitly; coastal reviewers check the uplift connectors, the sheathing nailing, and the foundation anchorage as a system, not as isolated details. Elevated construction in FEMA flood zones adds breakaway wall details and elevation certificates to the package.\\n\\nCAMA adds the regulatory layer: the Coastal Area Management Act governs oceanfront setbacks, dune protection, and estuarine buffers, and the civil site drawings must reflect CAMA permit conditions. Inland, Charlotte-Mecklenburg, Raleigh, Durham, and the Triad cities run full municipal plan review with local amendments, while the mountain counties add snow load and landslide-prone slope requirements. The engineer confirms the wind-borne debris region status, the flood zone, and CAMA jurisdiction for the site before finalizing the drawing list — on the coast, those three answers define the structural package.",
      },
      {
        heading: "North Carolina Drawing Checklist Before Sealing",
        body: "Use this checklist before your North Carolina permit set is sealed:\\n\\n• Engineer of record holds an active North Carolina PE license, verifiable on the state board roster\\n• Seal shows name, North Carolina license number, and date on every sealed sheet\\n• Responsible charge is genuine: the sealing engineer directed the design decisions\\n• Wind speed, exposure category, and wind-borne debris region status stated on the structural drawings\\n• Coastal projects: impact-resistant glazing schedule and continuous load path details shown\\n• Flood zone elevations, breakaway walls, and elevation certificates where applicable\\n• CAMA permit conditions reflected in the civil site drawings for coastal sites\\n• Stormwater management and erosion control per state and municipal requirements",
      },
    ],
    faqs: [
      {
        question: "What is the wind-borne debris region in North Carolina?",
        answer: "It is the coastal area where the building code requires glazed openings to resist impacts from wind-borne debris during hurricanes — essentially impact-rated windows and doors or engineered shutters. The Outer Banks, Crystal Coast, and southeastern beaches fall in this region. Your structural drawings must show the debris protection for every opening, and the reviewer verifies it.",
      },
      {
        question: "What is CAMA and how does it affect my drawings?",
        answer: "The Coastal Area Management Act is North Carolina's coastal development law. It sets oceanfront setbacks, protects dunes and wetlands, and requires permits for development in areas of environmental concern. The civil site drawings must reflect CAMA permit conditions — setbacks, buffers, and dune protections appear as binding drawing notes.",
      },
      {
        question: "Do I need stamped drawings for a beach house on the Outer Banks?",
        answer: "On the North Carolina coast, residential work in flood zones and the wind-borne debris region almost always requires engineered and sealed drawings — elevated foundations, breakaway walls, impact glazing, and continuous load path detailing go well beyond prescriptive residential paths. Confirm with the county, but plan on full engineering.",
      },
      {
        question: "Can an out-of-state engineer stamp my North Carolina drawings?",
        answer: "Only after obtaining a North Carolina PE license. The state offers comity licensure, but the seal cannot be applied until the North Carolina license is active. Working under a North Carolina-licensed engineer in responsible charge is the compliant path while licensure is pending.",
      },
    ],
    extraLinks: [
      { label: "What do North Carolina hurricane and seismic engineering requirements cover?", href: "/answers/north-carolina-hurricane-seismic-engineering/" },
      { label: "How is hurricane glazing designed?", href: "/answers/hurricane-glazing-design/" },
      { label: "What do ASCE 7 wind load provisions require?", href: "/answers/asce-7-wind-load-provisions/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "what-drawings-need-engineer-stamp-south-carolina",
    title: "What Drawings Need a Licensed Engineer Stamp in South Carolina?",
    description: "South Carolina pairs coastal wind rules with the Southeast's highest seismic zone near Charleston. See which drawings need a PE seal in the Palmetto State.",
    h1: "What Drawings Need a Licensed Engineer Stamp in South Carolina?",
    answer: "The answer: In South Carolina, drawings involving structural, mechanical, electrical, plumbing, or civil engineering must be stamped by a South Carolina-licensed professional engineer in responsible charge. Commercial construction documents need sealed drawings under the state-adopted building codes, and the seal must show the engineer's name, South Carolina PE number, and date.\\n\\nThe stamped sets are structural (foundations, framing, lateral systems, details with wind and seismic parameters stated), mechanical (HVAC loads, ductwork, equipment schedules), electrical (service, distribution, panel schedules, one-line diagrams), and plumbing (risers, drainage sizing, water service). Civil site drawings — grading, stormwater, erosion control — carry the civil PE's seal. Fire protection systems are engineered and stamped. What makes a South Carolina drawing set distinctive is that the structural drawings must simultaneously address hurricane wind and meaningful seismic forces — a combination few states demand.\\n\\nThe Lowcountry is where both triggers converge. Charleston sits in the highest seismic design category in the Southeast — a legacy of the 1886 earthquake — so the structural drawings must show the seismic design category, the lateral system, and the seismic detailing, even as the same drawings address coastal wind speeds, wind-borne debris protection for openings, and elevated flood-zone construction. The sea islands and the Grand Strand add dune protection and OCRM (Ocean and Coastal Resource Management) coastal review that shapes the civil site drawings. Hurricane Hugo's legacy lives in the review culture: coastal reviewers check the continuous load path and the opening protection with long memories.\\n\\nUpstate and Midlands projects face a more conventional review — Greenville, Spartanburg, Columbia, and the Charlotte-border counties run municipal plan check with the state codes — but the seismic requirements still apply statewide at varying levels, and the structural drawings state the seismic design category everywhere. Gray areas include small commercial upfits and residential additions: prescriptive paths exist, but coastal wind zones, floodplains, and the seismic detailing requirements pull projects into sealed engineering sooner than owners expect. Confirm the wind-borne debris region and the seismic design category for the site early — together they define the structural package.",
    directAnswer: "South Carolina requires a South Carolina-licensed PE to stamp structural, MEP, and civil drawings for commercial work. The Lowcountry adds a rare combination: the Southeast's highest seismic design category near Charleston plus coastal wind-borne debris protection, OCRM review, and flood-zone detailing.",
    topic: "PE Stamping by State",
    serviceHref: "/services/structural/",
    sections: [
      {
        heading: "Drawing Sets That Require a Stamp in South Carolina",
        body: "South Carolina's adopted building codes require sealed construction documents wherever engineering design is performed. Structural drawings — foundation plans, floor and roof framing, lateral force-resisting systems, connection details — need the PE seal, with the wind speed, exposure category, seismic design category, and wind-borne debris region status stated on the drawings. Mechanical drawings are stamped for engineered HVAC: load calculations, equipment selection, duct design, and ventilation. Electrical drawings carry the seal for service and distribution design, panel schedules, one-line diagrams, and emergency systems. Plumbing sets are stamped for engineered drainage, vent, and water systems.\\n\\nCivil site drawings — grading, stormwater management, erosion and sediment control — require the civil PE's seal. In the Lowcountry, the structural package expands with seismic detailing for the Charleston-area design categories, impact-resistant opening schedules in the wind-borne debris region, continuous load path details, and breakaway wall and elevated foundation details in flood zones. Fire protection systems are engineered and stamped. Apex Grid Engineering assigns South Carolina-licensed engineers in responsible charge for each discipline, so every sealed sheet belongs to the licensed professional who directed the design.",
      },
      {
        heading: "South Carolina-Specific Stamp Triggers",
        body: "Charleston's seismic zone is the trigger most owners do not expect. The 1886 Charleston earthquake puts the Lowcountry in the highest seismic design category in the Southeast, and the structural drawings must show the seismic design category, the lateral system selected for it, and the detailing the category requires — special inspection requirements follow. This sits alongside the coastal wind triggers: the wind-borne debris region along the coast requires impact protection for glazed openings, and the structural drawings show the opening schedule with product approvals. Few states ask the structural drawings to do both jobs at once; South Carolina's coast does.\\n\\nOCRM coastal review adds the regulatory layer for beachfront and critical-area sites: setbacks, dune protection, and wetland buffers appear as conditions on the civil site drawings. Inland, the Upstate and Midlands run standard municipal review — Greenville, Columbia, Charleston, and Myrtle Beach each administer the state codes with local processes — but the seismic design category still appears on structural drawings statewide. The engineer confirms the seismic design category, the wind-borne debris region status, the flood zone, and OCRM jurisdiction before the drawing list is finalized.",
      },
      {
        heading: "South Carolina Drawing Checklist Before Sealing",
        body: "Use this checklist before your South Carolina permit set is sealed:\\n\\n• Engineer of record holds an active South Carolina PE license, verifiable on the state board roster\\n• Seal shows name, South Carolina license number, and date on every sealed sheet\\n• Responsible charge is genuine: the sealing engineer directed the design decisions\\n• Seismic design category, lateral system, and seismic detailing stated on the structural drawings\\n• Wind speed, exposure, and wind-borne debris region status stated for coastal sites\\n• Impact-resistant glazing schedule and continuous load path details where required\\n• Flood zone elevations, breakaway walls, and elevation certificates where applicable\\n• OCRM coastal conditions reflected in the civil site drawings for beachfront sites",
      },
    ],
    faqs: [
      {
        question: "Why does Charleston have seismic requirements?",
        answer: "The 1886 Charleston earthquake — one of the most damaging in U.S. history — puts the Lowcountry in the highest seismic design category in the Southeast. Structural drawings near Charleston must show the seismic design category, the lateral system, and the required seismic detailing, alongside the coastal wind design. The two hazards are designed together.",
      },
      {
        question: "What is OCRM and how does it affect coastal drawings?",
        answer: "The Office of Ocean and Coastal Resource Management regulates development in South Carolina's coastal zone. Beachfront setbacks, dune protection, and critical-area buffers become binding conditions reflected on the civil site drawings. OCRM review runs alongside the local building permit for coastal sites.",
      },
      {
        question: "Do I need impact windows on the South Carolina coast?",
        answer: "In the wind-borne debris region — which covers the coast including Charleston, the sea islands, and the Grand Strand — glazed openings need debris-impact protection: impact-rated windows and doors or engineered shutters. The structural drawings include an opening schedule documenting the protection, and reviewers verify it.",
      },
      {
        question: "Can an out-of-state engineer stamp my South Carolina drawings?",
        answer: "Only after obtaining a South Carolina PE license. The state offers comity licensure, but the seal cannot be applied until the South Carolina license is active. Working under a South Carolina-licensed engineer in responsible charge is the compliant path while licensure is pending.",
      },
    ],
    extraLinks: [
      { label: "What do Charleston seismic and wind engineering requirements cover?", href: "/answers/south-carolina-charleston-seismic-wind-engineering/" },
      { label: "How is hurricane glazing designed?", href: "/answers/hurricane-glazing-design/" },
      { label: "Can an engineer seal another engineer's drawings?", href: "/answers/can-an-engineer-seal-another-engineers-drawings/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "what-drawings-need-engineer-stamp-georgia",
    title: "What Construction Drawings Need an Engineer Stamp in Georgia?",
    description: "Georgia's red clay soils shape foundation drawings statewide, and Atlanta adds its own amendments. Learn which drawing sets need a PE seal in Georgia.",
    h1: "What Construction Drawings Need an Engineer Stamp in Georgia?",
    answer: "The answer: In Georgia, drawings involving structural, mechanical, electrical, plumbing, or civil engineering must be stamped by a Georgia-licensed professional engineer in responsible charge. Commercial construction documents need sealed drawings under the state-adopted building codes, and the seal must show the engineer's name, Georgia PE number, and date.\\n\\nThe stamped sets are structural (foundations, framing, lateral systems, details with wind and seismic parameters), mechanical (HVAC loads, ductwork, equipment schedules), electrical (service, distribution, panel schedules, one-line diagrams), and plumbing (risers, drainage sizing, water service). Civil site drawings — grading, stormwater, erosion control — carry the civil PE's seal. Fire protection systems are engineered and stamped. The thread running through every Georgia structural set is the soil: the foundation drawings must respond to a geotechnical report, because Georgia's red clay does not forgive generic foundations.\\n\\nRed clay — the micaceous silts and clayey soils underlying much of Georgia — is the state-specific trigger that reshapes foundation drawings. These soils vary in bearing capacity, can be moisture-sensitive, and demand site-specific geotechnical recommendations that the structural engineer translates into footing sizes, pier depths, or slab designs shown explicitly on the foundation plans. Atlanta adds its own layer: the city's amendments to the state codes and its thorough plan review mean the drawing set must address Atlanta-specific requirements, from energy to stormwater. On the coast, Savannah, Tybee Island, and the Golden Isles add wind-borne debris provisions and flood-zone construction to the structural package.\\n\\nGray areas include small commercial renovations and residential additions. A cosmetic tenant fit-out with no structural or MEP changes may permit without new engineering — but Georgia's reviewers are attentive, and new rooftop equipment, sprinkler modifications, or occupancy changes bring the stamped MEP sets back. Residential work on red clay beyond prescriptive limits needs engineered foundations with seals; the geotechnical report is the document that decides. Confirm the municipality's amendments and the site's soils early, because both change the drawing list.",
    directAnswer: "Georgia requires a Georgia-licensed PE to stamp structural, MEP, and civil drawings for commercial work. The state's red clay soils make geotechnical-driven foundation drawings essential, Atlanta adds its own city amendments, and the coast adds wind-borne debris protection and flood-zone detailing.",
    topic: "PE Stamping by State",
    serviceHref: "/services/structural/",
    sections: [
      {
        heading: "Drawing Sets That Require a Stamp in Georgia",
        body: "Georgia's adopted building codes require sealed construction documents wherever engineering design is performed. Structural drawings — foundation plans, floor and roof framing, lateral force-resisting systems, connection details — need the PE seal, with wind speed, exposure, and seismic design category stated. Mechanical drawings are stamped for engineered HVAC: load calculations, equipment selection, duct design, and ventilation. Electrical drawings carry the seal for service and distribution design, panel schedules, one-line diagrams, and emergency systems. Plumbing sets are stamped for engineered drainage, vent, and water systems.\\n\\nCivil site drawings — grading, stormwater management, erosion and sediment control — require the civil PE's seal and follow Georgia's stormwater and erosion rules, which reviewers enforce closely given the state's red clay runoff characteristics. The foundation drawings deserve special attention: they must show the geotechnical report's recommendations translated into construction — footing bearing elevations, pier depths, undercut and replacement extents, or post-tensioned slab details — because reviewers check the drawings against the report. Fire protection systems are engineered and stamped. Apex Grid Engineering assigns Georgia-licensed engineers in responsible charge for each discipline, so every sealed sheet belongs to the licensed professional who directed the design.",
      },
      {
        heading: "Georgia-Specific Stamp Triggers",
        body: "Red clay is the defining Georgia trigger. The micaceous silts and clayey soils across the Piedmont and much of the state have variable bearing capacity and moisture sensitivity, so the geotechnical investigation is not a formality — it determines the foundation system, and the foundation drawings must show that system explicitly. Shallow footings, deep piers, or engineered slabs each appear on the drawings with the report's parameters noted; a generic foundation detail on red clay draws corrections. Atlanta layers city amendments on the state codes, and the city's plan review expects the drawing set to address those amendments directly, from energy compliance documentation to stormwater specifics.\\n\\nThe coast adds the wind trigger: Savannah, Tybee Island, Brunswick, and the Golden Isles fall in wind-borne debris and flood-zone territory, where the structural drawings show impact-resistant openings, continuous load paths, and elevated construction details. Statewide, the erosion and sediment control drawings get close review — Georgia's red clay erodes readily, and the civil package must show the control measures in detail. The engineer confirms the municipality's amendments, the geotechnical findings, and the coastal wind and flood status before finalizing the drawing list.",
      },
      {
        heading: "Georgia Drawing Checklist Before Sealing",
        body: "Use this checklist before your Georgia permit set is sealed:\\n\\n• Engineer of record holds an active Georgia PE license, verifiable on the state board roster\\n• Seal shows name, Georgia license number, and date on every sealed sheet\\n• Responsible charge is genuine: the sealing engineer directed the design decisions\\n• Geotechnical report completed; foundation drawings reflect its recommendations explicitly\\n• Atlanta projects: city amendments identified and addressed in the drawing set\\n• Wind speed, exposure, and seismic design category stated on the structural drawings\\n• Coastal projects: wind-borne debris protection and flood-zone construction details shown\\n• Erosion and sediment control drawings detailed for Georgia's erodible soils",
      },
    ],
    faqs: [
      {
        question: "Why does Georgia red clay matter for my foundation drawings?",
        answer: "Georgia's red clay — micaceous silts and clayey soils — has variable bearing capacity and reacts to moisture changes. The geotechnical report determines whether the site needs shallow footings, deep piers, soil replacement, or an engineered slab, and the foundation drawings must show that specific system. Generic foundation details on red clay get corrected at plan review.",
      },
      {
        question: "Does Atlanta have different requirements from the rest of Georgia?",
        answer: "Yes. Atlanta adopts the state codes with city amendments and runs its own thorough plan review. The drawing set must address the Atlanta amendments — energy, stormwater, and building code provisions — not just the base state code. Confirm the applicable amendment package with the city's review staff early.",
      },
      {
        question: "Do coastal Georgia projects need special structural drawings?",
        answer: "Yes. Savannah, Tybee Island, and the Golden Isles face wind-borne debris requirements and FEMA flood zones. The structural drawings show impact-resistant openings, continuous load paths from roof to foundation, and elevated construction with breakaway walls where flood zones apply.",
      },
      {
        question: "Can an out-of-state engineer stamp my Georgia drawings?",
        answer: "Only after obtaining a Georgia PE license. Georgia offers comity licensure, but the seal cannot be applied until the Georgia license is active. Working under a Georgia-licensed engineer in responsible charge is the compliant path while licensure is pending.",
      },
    ],
    extraLinks: [
      { label: "What do Georgia wind and seismic engineering requirements cover?", href: "/answers/georgia-wind-seismic-engineering-requirements/" },
      { label: "What does a geotechnical report explain?", href: "/answers/geotechnical-report-explained/" },
      { label: "How long does plan check take?", href: "/answers/how-long-does-plan-check-take/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
];
