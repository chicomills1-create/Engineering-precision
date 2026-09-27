import type { Phase0AeoPage } from "./phase0-corpus";

const founderNote = "I'm Jeremy Mills, CEO & Founder of Apex Grid Engineering and a U.S. Air Force veteran. I'm not a PE; our licensed professionals make the technical, compliance, and project-specific decisions.";

export const WAVE_IU_ANSWER_PAGES: Phase0AeoPage[] = [
  {
    slug: "what-drawings-need-engineer-stamp-nebraska",
    title: "What Drawings Need an Engineer Stamp in Nebraska for Permits?",
    description: "Nebraska requires a Nebraska-licensed PE to stamp commercial structural drawings. Learn which drawing sets need a seal and how Omaha and Lincoln review works.",
    h1: "What Drawings Need an Engineer Stamp in Nebraska for Permits?",
    answer: "In Nebraska, the drawings that need an engineer stamp are the structural drawings for most commercial, multi-family, educational, assembly, and institutional buildings — plus the mechanical, electrical, and plumbing drawings serving those same occupancies. The stamp must come from a professional engineer licensed by the Nebraska Board of Engineers and Architects who was in responsible charge of the design, and it carries the engineer’s name, Nebraska license number, and the date of sealing. Small single-family homes and genuine agricultural buildings are generally exempt from the stamp requirement under Nebraska law.\n\nA Nebraska permit set that requires engineering typically includes four drawing groups. The structural set shows the foundation plan, floor and roof framing, the lateral force-resisting system, connection details, and the design criteria the building is based on — wind speed, snow load, seismic design category, and soil bearing values. The mechanical, electrical, and plumbing sets show the systems serving the building: HVAC layouts and calculations, power distribution and lighting, and plumbing isometrics sized to the code. The civil set covers site grading, drainage, utilities, and access. On commercial and institutional projects the architectural drawings are usually sealed by a Nebraska-licensed architect working alongside the engineers, with each discipline sealing only the work it actually controlled.\n\nNebraska-specific triggers go beyond the drawing list. Omaha’s Planning Department and Lincoln’s Building and Safety division each run their own plan review with local amendments, so the same building in Omaha and Lincoln can face different submittal checklists. Nebraska sits in tornado alley, and the structural drawings must show the design wind speed and the components-and-cladding pressures for the envelope — reviewers check those numbers against the adopted maps. Eastern Nebraska’s loess soils can collapse when wetted, so the geotechnical report drives the foundation design and the reviewer verifies the foundation matches the report. And critically, Nebraska’s licensing law sets the stamp threshold by occupancy and size, not by whether the local county enforces a building code — in rural counties with minimal or no plan review, stamped drawings are still legally required for covered buildings, and lenders and insurers will ask for them.\n\nThe gray areas are where Nebraska projects stall. Agricultural buildings are exempt from the stamp requirement, but the exemption covers genuine farm use — a machine shed converted to an event venue or commercial storage loses the exemption, and the building department can require stamped drawings retroactively. Delegated components such as pre-engineered metal buildings, trusses, and curtain wall still need an engineer of record for the overall structure plus sealed submittals from the delegated designer. When in doubt, the Nebraska board’s test is responsible charge: if engineering decisions shaped the building, a licensed engineer should have sealed them.",
    directAnswer: "In Nebraska, structural drawings for commercial, multi-family, educational, assembly, and institutional buildings need a Nebraska-licensed PE stamp, along with the MEP drawings serving those occupancies. Single-family homes and genuine agricultural buildings are generally exempt. Apex Grid Engineering assigns Nebraska-licensed engineers as engineers of record on every Nebraska project.",
    topic: "PE Stamping by State",
    serviceHref: "/services/structural/",
    sections: [
      {
        heading: "Drawing Sets That Require a Stamp in Nebraska",
        body: "The structural set is the core of every stamped Nebraska permit package. It includes the foundation plan with footing sizes and reinforcement, floor and roof framing plans, the lateral force-resisting system with shear wall or braced-frame schedules, connection and anchorage details, and a design criteria summary stating the wind speed, ground snow load, seismic design category, and allowable soil bearing pressure. The reviewer’s first pass checks that the criteria on the cover sheet match the adopted code for the jurisdiction — a set drawn to the wrong wind speed or snow load earns corrections before the reviewer reads a single detail.\n\nThe MEP and civil sets complete the package. Mechanical drawings show HVAC equipment layouts, ductwork, ventilation calculations, and energy code compliance; electrical drawings show power distribution, lighting, and panel schedules; plumbing drawings show waste, vent, and water piping sized to the code. The civil set covers grading, stormwater drainage, utility connections, and accessible site access. Each set is sealed by the licensed engineer in responsible charge of that discipline — the structural engineer does not seal the electrical drawings, and the reviewer will reject a set where the seals don’t match the work.",
      },
      {
        heading: "Nebraska-Specific Stamp Triggers",
        body: "Omaha and Lincoln run the state’s two largest plan reviews, and their amendments differ. Omaha’s Planning Department reviews commercial submittals against city amendments layered on the adopted International Building Code, while Lincoln’s Building and Safety division applies its own amendment package — the engineer confirms the authority having jurisdiction before drawing, because the applicable amendments change the structural and energy inputs. Both cities expect electronic submittals with complete, coordinated discipline sets.\n\nThe engineering triggers are Nebraska’s wind and soils. Tornado-alley wind speeds govern the lateral design and the envelope: the structural drawings state the ultimate design wind speed, the exposure category, and the components-and-cladding pressures, and the reviewer verifies them against the adopted maps. Eastern Nebraska’s loess and expansive soils make the geotechnical investigation the foundation of the structural design — drilled piers, over-excavation, or post-tensioned slabs per the report’s recommendations. In rural counties with no building department, the stamp threshold still applies on paper: occupancy and size trigger the licensed-design requirement regardless of local enforcement.",
      },
      {
        heading: "Nebraska Drawing Checklist Before Sealing",
        body: "Use this checklist before your Nebraska permit set is sealed:\n\n• Engineer of record holds an active Nebraska PE license, verifiable on the Board of Engineers and Architects roster\n• Seal shows name, Nebraska license number, and date on every sealed sheet\n• Responsible charge is genuine: the sealing engineer directed the engineering decisions\n• Design wind speed, exposure category, and components-and-cladding pressures stated on the structural drawings\n• Geotechnical report addresses loess and expansive soils; foundation matches the report’s recommendations\n• Ground snow load shown per the jurisdiction’s adopted values\n• Authority having jurisdiction confirmed: Omaha, Lincoln, or the applicable city or county\n• Agricultural exemption verified as genuine farm use before relying on it",
      },
    ],
    faqs: [
      {
        question: "Are farm buildings exempt from engineer stamps in Nebraska?",
        answer: "Nebraska law generally exempts agricultural buildings from the licensed-design requirement, but the exemption is narrow: it covers genuine farm use such as barns, machine sheds, and grain storage. A farm building converted to commercial storage, an event venue, or any assembly use loses the exemption, and the building department can require stamped drawings retroactively. Lenders and insurers also frequently require an engineer’s involvement regardless of the exemption.",
      },
      {
        question: "Can an out-of-state engineer stamp my Nebraska drawings?",
        answer: "Only after obtaining a Nebraska license. Nebraska offers comity for engineers licensed in other states who meet the board’s qualifications, but the stamp cannot go on Nebraska drawings until the Nebraska license is active. Working under a Nebraska-licensed engineer in responsible charge is the compliant path while licensure is pending.",
      },
      {
        question: "What wind speed do Nebraska structural drawings use?",
        answer: "The design wind speed comes from the adopted code’s wind maps for the specific site, and Nebraska’s tornado-alley location puts much of the state in high-wind territory. The structural drawings must state the ultimate design wind speed, the exposure category, and the components-and-cladding pressures for the envelope. The plan reviewer checks these values against the adopted maps — understated wind numbers are a common source of structural corrections.",
      },
      {
        question: "Do I need stamped drawings if my Nebraska county has no building department?",
        answer: "For covered occupancies, yes. Nebraska’s licensing law ties the stamp requirement to the building’s occupancy and size, not to whether the county runs plan review. In rural counties with minimal or no enforcement, the stamped drawings are still legally required for commercial, assembly, educational, and multi-family buildings — and lenders, insurers, and future buyers will expect to see them.",
      },
    ],
    extraLinks: [
      { label: "How are expansive soil foundations designed?", href: "/answers/expansive-soil-foundation-solutions/" },
      { label: "How are tornado safe rooms designed?", href: "/answers/tornado-safe-room-design/" },
      { label: "How is the plan check corrections process explained?", href: "/answers/plan-check-corrections-process-explained/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "what-drawings-need-engineer-stamp-kansas",
    title: "What Drawings Need an Engineer Stamp in Kansas for Permits?",
    description: "Kansas requires a Kansas-licensed PE to stamp commercial structural drawings. Learn which sets need a seal, plus Wichita review and tornado-alley wind rules.",
    h1: "What Drawings Need an Engineer Stamp in Kansas for Permits?",
    answer: "In Kansas, the drawings that need an engineer stamp are the structural drawings for most commercial, multi-family, educational, assembly, and institutional buildings — along with the mechanical, electrical, and plumbing drawings serving those occupancies. The stamp must come from a professional engineer licensed by the Kansas State Board of Technical Professions who was in responsible charge of the design, showing the engineer’s name, Kansas license number, and the date. Single-family homes and bona fide agricultural buildings are generally exempt from the stamp requirement.\n\nA Kansas permit set that requires engineering is organized by discipline. The structural set carries the foundation plan, framing plans, the lateral force-resisting system, connection details, and the design criteria summary — wind speed, snow load, seismic design category, and soil bearing values stated on the cover sheet. The mechanical set shows HVAC layouts, ventilation calculations, and energy compliance; the electrical set shows power, lighting, and panel schedules; the plumbing set shows piping sized to the code. The civil set handles grading, drainage, utilities, and site access. Architectural drawings on these projects are typically sealed by a Kansas-licensed architect, with each design professional sealing only the work under their responsible charge.\n\nKansas-specific triggers start with who reviews the set. Wichita’s Metropolitan Area Building and Construction Department (MABCD) runs plan review for Wichita and much of Sedgwick County; the Kansas City, Kansas Unified Government, Overland Park, Olathe, and Topeka each run their own review with local amendments — the engineer confirms the authority having jurisdiction first, because the amendments change the submittal. Kansas sits deep in tornado alley with some of the highest design wind speeds in the nation, and the structural drawings must show the wind speed, exposure category, and envelope pressures. Schools and emergency facilities frequently trigger ICC 500 storm shelter requirements, which add a dedicated shelter drawing and detailing package. The Kansas City metro’s expansive clays make the geotechnical report the basis of the foundation design.\n\nThe gray areas catch Kansas owners off guard. The agricultural exemption covers genuine farm buildings — convert a barn to a wedding venue or commercial shop and the exemption falls away. Additions and change-of-occupancy projects trigger stamped drawings even when the original building predates the requirement, because the altered structure must meet the current code. Delegated systems — pre-engineered metal buildings, wood trusses, fire suppression — need sealed submittals from the delegated designer coordinated under the engineer of record. Rural counties with limited enforcement don’t erase the licensing law: covered buildings need licensed design on paper regardless.",
    directAnswer: "In Kansas, structural drawings for commercial, multi-family, educational, assembly, and institutional buildings need a Kansas-licensed PE stamp, plus the MEP drawings for those occupancies. Single-family homes and genuine farm buildings are generally exempt. Apex Grid Engineering assigns Kansas-licensed engineers as engineers of record on every Kansas project.",
    topic: "PE Stamping by State",
    serviceHref: "/services/structural/",
    sections: [
      {
        heading: "Drawing Sets That Require a Stamp in Kansas",
        body: "The structural set anchors the Kansas permit package: foundation plan with footing and pier schedules, floor and roof framing, lateral system schedules for shear walls or braced frames, anchorage and connection details, and the design criteria block listing wind speed, ground snow load, seismic design category, and soil bearing pressure. Kansas reviewers check the criteria block first — tornado-alley wind numbers and the correct snow load for the jurisdiction must be on the cover sheet before the details get read.\n\nThe MEP and civil sets follow the same discipline-seal rule. Mechanical drawings carry equipment layouts, ductwork, ventilation rates, and energy code documentation; electrical drawings carry service, distribution, lighting, and panel schedules; plumbing drawings carry water, waste, and vent piping with fixture counts. Civil drawings show grading, stormwater management, utility extensions, and accessible routes. Storm shelter designs, where triggered, add a sealed shelter plan with ICC 500 detailing. Each set bears the seal of the Kansas-licensed engineer who controlled that discipline’s work.",
      },
      {
        heading: "Kansas-Specific Stamp Triggers",
        body: "The review authority sets the submittal rules. MABCD’s review covers Wichita and unincorporated Sedgwick County with its amendment package; the Unified Government of Wyandotte County and Kansas City, Kansas runs its own; Johnson County’s cities — Overland Park, Olathe, Lenexa — each apply local amendments; Topeka and Lawrence run theirs. A project straddling a city limit can face two different checklists, so the engineer verifies jurisdiction parcel by parcel.\n\nThe engineering triggers are wind, shelters, and soils. Kansas design wind speeds rank among the nation’s highest, and the structural drawings must state the ultimate wind speed, exposure, and components-and-cladding pressures — the reviewer verifies them against the adopted maps. Educational occupancies and designated emergency facilities often require ICC 500 storm shelters, a separate sealed design package within the set. The Kansas City metro’s expansive clays demand drilled piers or engineered slabs per the geotechnical report, and the reviewer checks the foundation against the report. The Nemaha Ridge seismic zone is mapped but low — the seismic design category still goes on the cover sheet.",
      },
      {
        heading: "Kansas Drawing Checklist Before Sealing",
        body: "Use this checklist before your Kansas permit set is sealed:\n\n• Engineer of record holds an active Kansas license with the State Board of Technical Professions\n• Seal shows name, Kansas license number, and date on every sealed sheet\n• Responsible charge is genuine: the sealing engineer directed the engineering decisions\n• Design wind speed, exposure category, and envelope pressures stated on the structural drawings\n• Storm shelter package included where the occupancy triggers ICC 500\n• Geotechnical report addresses expansive clays; foundation matches the report\n• Ground snow load per the jurisdiction’s adopted values\n• Authority having jurisdiction confirmed: MABCD, Unified Government, or the applicable city",
      },
    ],
    faqs: [
      {
        question: "Does Kansas require storm shelters in schools?",
        answer: "Many Kansas jurisdictions require ICC 500 storm shelters for new school construction and for designated emergency facilities, driven by the state’s tornado exposure. The shelter is a dedicated sealed design package — shelter plan, structural detailing for the design wind speed and debris impact, ventilation, and emergency provisions. Your engineer should confirm the trigger during programming, because adding a shelter at plan check is expensive.",
      },
      {
        question: "What is the MABCD?",
        answer: "The Metropolitan Area Building and Construction Department is the consolidated building department serving Wichita and much of Sedgwick County, Kansas. It runs building plan review, permitting, and inspections under a unified code with local amendments. Projects in the MABCD area submit through its electronic review system rather than through separate city and county departments.",
      },
      {
        question: "Can an out-of-state engineer stamp my Kansas drawings?",
        answer: "Only after obtaining Kansas licensure. Kansas offers comity for engineers licensed in other states who meet the board’s qualifications, but the stamp cannot go on Kansas drawings until the Kansas license is active. Working under a Kansas-licensed engineer in responsible charge is the compliant path while licensure is pending.",
      },
      {
        question: "Do rural Kansas counties require stamped drawings?",
        answer: "Kansas licensing law ties the stamp requirement to occupancy and size, not to the county’s enforcement resources. In rural counties with limited or no plan review, covered buildings — commercial, assembly, educational, multi-family — still legally require licensed design, and lenders and insurers will ask for the sealed drawings even when no reviewer does.",
      },
    ],
    extraLinks: [
      { label: "How are tornado safe rooms designed?", href: "/answers/tornado-safe-room-design/" },
      { label: "How is wind load versus seismic load designed?", href: "/answers/wind-load-vs-seismic-load-design/" },
      { label: "How is the plan check corrections process explained?", href: "/answers/plan-check-corrections-process-explained/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "what-drawings-need-engineer-stamp-oklahoma",
    title: "What Drawings Need an Engineer Stamp in Oklahoma for Permits?",
    description: "Oklahoma requires an Oklahoma-licensed PE to stamp commercial structural drawings. Learn which sets need a seal, plus OKC and Tulsa review and tornado rules.",
    h1: "What Drawings Need an Engineer Stamp in Oklahoma for Permits?",
    answer: "In Oklahoma, the drawings that need an engineer stamp are the structural drawings for most commercial, multi-family, educational, assembly, and institutional buildings — together with the mechanical, electrical, and plumbing drawings serving those occupancies. The stamp must come from a professional engineer licensed by the Oklahoma State Board of Licensure for Professional Engineers and Land Surveyors who was in responsible charge of the design, bearing the engineer’s name, Oklahoma license number, and the date. Single-family dwellings and bona fide agricultural buildings are generally exempt.\n\nAn Oklahoma permit set breaks into sealed discipline groups. The structural set shows the foundation plan, floor and roof framing, the lateral force-resisting system, connection and anchorage details, and the design criteria — wind speed, snow load, seismic design category, and soil bearing values on the cover sheet. The mechanical set covers HVAC layouts, ventilation calculations, and energy compliance; the electrical set covers service, distribution, lighting, and panels; the plumbing set covers water, waste, and vent piping. The civil set addresses grading, drainage, utilities, and site access. Architecture on these projects is typically sealed by an Oklahoma-licensed architect, and each design professional seals only the work performed under their responsible charge.\n\nOklahoma-specific triggers are dominated by the sky. The state sees more tornadoes per square mile than anywhere else in the country, and the structural drawings must show the design wind speed, exposure category, and components-and-cladding pressures verified against the adopted maps. Schools and public safety facilities frequently require FEMA P-361 / ICC 500 storm shelters — a separate sealed package with debris-impact detailing. Oklahoma City, Tulsa, Norman, and Broken Arrow each run their own plan review with local amendments, so the engineer confirms the authority having jurisdiction before design. The state’s expansive clays drive pier or engineered-slab foundations per the geotechnical report, and Oklahoma’s updated seismic maps — reflecting induced seismicity — mean the seismic design category on the cover sheet gets real reviewer attention.\n\nGray areas center on use and delegation. The agricultural exemption ends where commercial use begins: a barn converted to retail, storage rental, or an event venue needs stamped drawings for the new occupancy. Oilfield and industrial accessory structures often surprise owners — occupancy and size, not industry, set the threshold. Delegated components like pre-engineered metal buildings, trusses, and fire protection need sealed submittals coordinated under the engineer of record. Change-of-occupancy renovations trigger current-code structural review even when the shell predates the requirement.",
    directAnswer: "In Oklahoma, structural drawings for commercial, multi-family, educational, assembly, and institutional buildings need an Oklahoma-licensed PE stamp, along with the MEP drawings for those occupancies. Single-family homes and genuine agricultural buildings are generally exempt. Apex Grid Engineering assigns Oklahoma-licensed engineers as engineers of record on every Oklahoma project.",
    topic: "PE Stamping by State",
    serviceHref: "/services/structural/",
    sections: [
      {
        heading: "Drawing Sets That Require a Stamp in Oklahoma",
        body: "The structural set is the heart of the Oklahoma package: foundation plan with pier or footing schedules, framing plans, lateral system schedules, holdown and anchorage details, and the design criteria block with wind speed, ground snow load, seismic design category, and bearing pressure. Oklahoma reviewers read the criteria block against the adopted maps first — tornado-alley wind speeds and the current seismic design category must be stated correctly before the details matter.\n\nMEP and civil sets complete the submittal under the same seal discipline. Mechanical drawings show equipment, ductwork, ventilation, and energy documentation; electrical drawings show service through branch panels, lighting, and fault-current data; plumbing drawings show domestic water, sanitary, and vent systems. Civil drawings cover site grading, detention, utilities, and accessible access. Where storm shelters are triggered, the sealed shelter package — plan, sections, debris-impact detailing, ventilation — rides with the structural set. Every sealed sheet traces to the licensed engineer who controlled that work.",
      },
      {
        heading: "Oklahoma-Specific Stamp Triggers",
        body: "Plan review follows the site. Oklahoma City’s Development Services, Tulsa’s permitting office, Norman, Broken Arrow, and Edmond each run their own review with local amendments — the engineer verifies the jurisdiction because the amendment package changes structural and energy inputs. The state’s tornado climatology is the defining trigger: design wind speeds are high statewide, envelope pressures are checked closely, and safe-room requirements attach to schools and emergency facilities as a matter of local policy in many jurisdictions.\n\nSoils and seismic complete the Oklahoma picture. Expansive clays across the central corridor require the foundation to follow the geotechnical report — drilled piers to stable strata or engineered slabs — and the reviewer cross-checks the foundation plan against the report. Oklahoma’s seismic maps were updated to account for induced seismicity, so the seismic design category is a live design input, not a formality; the lateral system and detailing follow from it. In rural counties with thin enforcement, the licensing threshold still applies on paper for covered occupancies.",
      },
      {
        heading: "Oklahoma Drawing Checklist Before Sealing",
        body: "Use this checklist before your Oklahoma permit set is sealed:\n\n• Engineer of record holds an active Oklahoma PE license, verifiable on the board roster\n• Seal shows name, Oklahoma license number, and date on every sealed sheet\n• Responsible charge is genuine: the sealing engineer directed the engineering decisions\n• Design wind speed, exposure category, and components-and-cladding pressures on the structural drawings\n• Seismic design category per the current maps, with the lateral system to match\n• Storm shelter package included where schools or emergency facilities trigger it\n• Geotechnical report addresses expansive clays; foundation matches the report\n• Authority having jurisdiction confirmed: Oklahoma City, Tulsa, or the applicable city or county",
      },
    ],
    faqs: [
      {
        question: "Does Oklahoma require tornado shelters in new schools?",
        answer: "Many Oklahoma jurisdictions require storm shelters meeting FEMA P-361 / ICC 500 criteria for new school construction and public safety facilities. The shelter design is a sealed package — floor plan, structural sections, debris-impact and wind-pressure detailing, ventilation, and emergency lighting. Confirm the trigger during programming: retrofitting a shelter into a permitted design is one of the costliest plan-check surprises.",
      },
      {
        question: "How does Oklahoma’s seismicity affect structural drawings?",
        answer: "Oklahoma’s seismic design maps were updated to reflect induced seismicity, raising the seismic design category in parts of the state. The structural drawings must state the seismic design category for the site, and the lateral system, connection detailing, and nonstructural anchorage follow from it. Reviewers check the category against the current maps — an outdated assumption earns a structural correction.",
      },
      {
        question: "Can an out-of-state engineer stamp my Oklahoma drawings?",
        answer: "Only after obtaining Oklahoma licensure. Oklahoma offers comity for engineers licensed in other states who meet the board’s qualifications, but the stamp cannot go on Oklahoma drawings until the Oklahoma license is active. Working under an Oklahoma-licensed engineer in responsible charge is the compliant path while licensure is pending.",
      },
      {
        question: "Are Oklahoma oilfield buildings exempt from engineer stamps?",
        answer: "Not automatically. Oklahoma’s threshold turns on occupancy, size, and use — not on industry. An oilfield office, shop, or occupied support building that meets the commercial thresholds needs stamped drawings like any other commercial building. Genuine agricultural exemptions don’t stretch to cover industrial or commercial operations.",
      },
    ],
    extraLinks: [
      { label: "How are tornado safe rooms designed?", href: "/answers/tornado-safe-room-design/" },
      { label: "How are expansive soil foundations designed?", href: "/answers/expansive-soil-foundation-solutions/" },
      { label: "How are someone else’s drawings stamped?", href: "/answers/engineer-stamping-someone-elses-drawings/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "what-drawings-need-engineer-stamp-new-mexico",
    title: "What Drawings Need an Engineer Stamp in New Mexico for Permits?",
    description: "New Mexico requires a New Mexico-licensed PE for commercial structural drawings. Learn which sets need a seal, plus adobe code rules and tribal land review.",
    h1: "What Drawings Need an Engineer Stamp in New Mexico for Permits?",
    answer: "In New Mexico, the drawings that need an engineer stamp are the structural drawings for most commercial, multi-family, educational, assembly, and institutional buildings — plus the mechanical, electrical, and plumbing drawings serving those occupancies. The stamp must come from a professional engineer licensed by the New Mexico Board of Licensure for Professional Engineers and Professional Surveyors who was in responsible charge of the design, showing the engineer’s name, New Mexico license number, and the date. Single-family homes and genuine agricultural buildings are generally exempt, though adobe and earthen construction has its own code path described below.\n\nA New Mexico permit set that requires engineering is organized by discipline. The structural set shows the foundation plan, framing plans, the lateral force-resisting system, connection details, and the design criteria — wind speed, snow load, seismic design category, and soil bearing values stated on the cover sheet. The mechanical, electrical, and plumbing sets show the building’s systems: HVAC layouts and calculations, power distribution and lighting, and plumbing sized to the code. The civil set covers grading, drainage, utilities, and site access. Architecture on these projects is typically sealed by a New Mexico-licensed architect, and each design professional seals only the work performed under their responsible charge.\n\nNew Mexico-specific triggers start with adobe. The New Mexico Earthen Building Materials Code governs adobe, rammed earth, and compressed earth block construction — the structural drawings must show wall thickness, bond beam and lintel detailing, moisture protection, and the engineering analysis the earthen code requires, and reviewers in Santa Fe, Taos, and Albuquerque check it closely. The second trigger is jurisdiction: on tribal land — the Navajo Nation, Pueblo lands, and Apache reservations — the state building code does not apply. The tribal authority is the authority having jurisdiction with its own engineering requirements and review process, and a PE stamp is typically still required by the tribe; the engineer coordinates directly with the tribal engineering or public works department. Albuquerque, Santa Fe, Las Cruces, and Rio Rancho each run their own city review with amendments for projects on non-tribal land.\n\nThe gray areas are pure New Mexico. A conventional wood-frame home may be exempt while an adobe home of the same size needs engineered drawings under the earthen code — construction type, not just size, sets the threshold. Straw-bale and other alternative systems need engineered details even when the occupancy looks residential. Projects near reservation boundaries need a jurisdiction determination before design: state-licensed engineers seal the drawings, but the tribal AHJ sets the submittal rules. And northern New Mexico’s snow loads versus the southern desert’s wind and expansive soils mean the design criteria block changes completely across the state.",
    directAnswer: "In New Mexico, structural drawings for commercial, multi-family, educational, assembly, and institutional buildings need a New Mexico-licensed PE stamp, plus the MEP drawings for those occupancies. Adobe and earthen construction follows the Earthen Building Materials Code, and tribal land answers to the tribal authority. Apex Grid Engineering assigns New Mexico-licensed engineers as engineers of record on every New Mexico project.",
    topic: "PE Stamping by State",
    serviceHref: "/services/structural/",
    sections: [
      {
        heading: "Drawing Sets That Require a Stamp in New Mexico",
        body: "The structural set carries the New Mexico permit package: foundation plan, framing plans, lateral system schedules, connection and anchorage details, and the design criteria block — wind speed, ground snow load, seismic design category, and soil bearing pressure. For earthen construction the set adds the adobe-specific detailing the Earthen Building Materials Code requires: wall thickness and coursing, concrete bond beams, lintel schedules, stem-wall and moisture-barrier details, and roof-to-wall anchorage. Reviewers in adobe country check these details against the earthen code chapter by chapter.\n\nThe MEP and civil sets follow standard discipline sealing. Mechanical drawings show HVAC layouts, ventilation calculations, and energy code compliance; electrical drawings show service, distribution, and lighting; plumbing drawings show water, waste, and vent piping. Civil drawings address grading, drainage for monsoon-season runoff, utilities, and access. On tribal land the drawing content is similar but the submittal goes to the tribal engineering department under tribal requirements — the engineer confirms the tribal checklist before the first sheet, because it differs from the state and city checklists.",
      },
      {
        heading: "New Mexico-Specific Stamp Triggers",
        body: "Adobe and pueblo-style construction is the signature trigger. The Earthen Building Materials Code sets structural requirements for adobe, rammed earth, and compressed earth block — minimum wall thicknesses, lateral design, bond beams, and foundation moisture protection — and the structural drawings must demonstrate compliance the way a wood-frame set demonstrates IBC compliance. Santa Fe’s historic districts add design review on top of building plan check, and the structural drawings must satisfy both.\n\nTribal jurisdiction is the second trigger. The Navajo Nation, the Pueblos, and the Apache reservations exercise sovereignty over construction on tribal land: the state code and the city permit process do not apply, and the tribal authority — often a tribal engineering, housing, or public works department — sets the requirements, reviews the drawings, and typically requires a licensed PE stamp. The engineer’s first task on a tribal-land project is a jurisdiction meeting, not a calculation. Elsewhere, Albuquerque’s Planning Department, Santa Fe, Las Cruces, and Rio Rancho each run city review with local amendments, and the Rio Grande rift’s seismicity plus the north-south snow-load split shape the structural inputs.",
      },
      {
        heading: "New Mexico Drawing Checklist Before Sealing",
        body: "Use this checklist before your New Mexico permit set is sealed:\n\n• Engineer of record holds an active New Mexico PE license, verifiable on the board roster\n• Seal shows name, New Mexico license number, and date on every sealed sheet\n• Responsible charge is genuine: the sealing engineer directed the engineering decisions\n• Earthen construction: Earthen Building Materials Code detailing shown and checked\n• Tribal land: tribal authority having jurisdiction confirmed and tribal checklist obtained\n• Design wind speed, snow load, and seismic design category per the site — not a statewide assumption\n• Monsoon-season drainage addressed on the civil drawings\n• Authority having jurisdiction confirmed: tribal department, Albuquerque, Santa Fe, or the applicable city or county",
      },
    ],
    faqs: [
      {
        question: "Do adobe homes need an engineer stamp in New Mexico?",
        answer: "Often yes, even when a comparable wood-frame home would be exempt. The New Mexico Earthen Building Materials Code imposes structural requirements on adobe, rammed earth, and compressed earth block — wall thickness, bond beams, lintels, moisture protection — that must be shown on engineered drawings. Many jurisdictions require a licensed engineer’s structural drawings for earthen construction regardless of the residential exemption that covers conventional framing.",
      },
      {
        question: "Who permits construction on tribal land in New Mexico?",
        answer: "The tribal authority — not the state or the county. The Navajo Nation, each Pueblo, and the Apache reservations have their own engineering, housing, or public works departments that set requirements, review drawings, and issue approvals. State building codes don’t apply on tribal land, but the tribal AHJ typically still requires drawings stamped by a licensed PE. Start with a jurisdiction meeting before design.",
      },
      {
        question: "Can an out-of-state engineer stamp my New Mexico drawings?",
        answer: "Only after obtaining New Mexico licensure. New Mexico offers comity for engineers licensed in other states who meet the board’s qualifications, but the stamp cannot go on New Mexico drawings until the New Mexico license is active. Working under a New Mexico-licensed engineer in responsible charge is the compliant path while licensure is pending.",
      },
      {
        question: "What is the New Mexico Earthen Building Materials Code?",
        answer: "It is the state code chapter governing adobe, rammed earth, pressed earth block, and related earthen construction. It sets structural rules — wall thickness minimums, lateral design, bond beam and lintel requirements, foundation and moisture protection — that the structural drawings must satisfy. Plan reviewers in Santa Fe, Taos, and Albuquerque enforce it as closely as the structural chapters of the base code.",
      },
    ],
    extraLinks: [
      { label: "How is adobe structure engineering done?", href: "/answers/adobe-structure-engineering/" },
      { label: "How are seismic design categories explained?", href: "/answers/seismic-design-categories-explained/" },
      { label: "How are energy code compliance paths explained?", href: "/answers/energy-code-compliance-paths-explained/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "what-drawings-need-engineer-stamp-montana",
    title: "What Drawings Need an Engineer Stamp in Montana for Permits?",
    description: "Montana requires a Montana-licensed PE for commercial structural drawings. Learn which sets need a seal, plus snow-load rules and rural county requirements.",
    h1: "What Drawings Need an Engineer Stamp in Montana for Permits?",
    answer: "In Montana, the drawings that need an engineer stamp are the structural drawings for most commercial, multi-family, educational, assembly, and institutional buildings — along with the mechanical, electrical, and plumbing drawings serving those occupancies. The stamp must come from a professional engineer licensed by the Montana Board of Professional Engineers and Professional Land Surveyors who was in responsible charge of the design, showing the engineer’s name, Montana license number, and the date. Single-family homes and bona fide agricultural buildings are generally exempt.\n\nA Montana permit set that requires engineering follows the discipline structure. The structural set shows the foundation plan, framing plans, the lateral force-resisting system, connection details, and the design criteria — wind speed, ground snow load, seismic design category, and soil bearing values on the cover sheet. The mechanical set covers HVAC layouts, ventilation, and energy compliance; the electrical set covers service, distribution, and lighting; the plumbing set covers water, waste, and vent piping. The civil set handles grading, drainage, utilities, and access. Architecture on these projects is typically sealed by a Montana-licensed architect, with each professional sealing only the work under their responsible charge.\n\nMontana-specific triggers start with what the counties don’t do. Many of Montana’s rural counties have minimal or no building departments — but the state licensing law still requires stamped drawings for covered occupancies on paper, regardless of local enforcement. A commercial building in a county with no plan review still legally needs licensed design, and the bank, the insurer, and the eventual buyer will all ask for the sealed set. Where cities do review — Billings, Missoula, Bozeman, Great Falls, Helena — each applies the state building code with local amendments. The structural inputs swing wildly across the state: mountain jurisdictions carry heavy ground snow loads with drift analysis, while the eastern plains are lighter; western Montana around Helena and the Yellowstone region carries real seismic design categories that the structural drawings must address.\n\nThe gray areas are Montana’s way of life. Ranch buildings are exempt as agricultural structures, but a barn converted to a wedding venue, brewery, or retail space becomes an assembly or commercial occupancy that needs stamped drawings — the exemption follows the use, not the building. Remote lodges, outfitter facilities, and workforce housing in counties without review still trigger the licensing threshold by occupancy and size. Delegated components — trusses, pre-engineered buildings, fire protection — need sealed submittals under the engineer of record even when no plan reviewer asks for them.",
    directAnswer: "In Montana, structural drawings for commercial, multi-family, educational, assembly, and institutional buildings need a Montana-licensed PE stamp, plus the MEP drawings for those occupancies. The requirement applies on paper even in rural counties with no building department. Apex Grid Engineering assigns Montana-licensed engineers as engineers of record on every Montana project.",
    topic: "PE Stamping by State",
    serviceHref: "/services/structural/",
    sections: [
      {
        heading: "Drawing Sets That Require a Stamp in Montana",
        body: "The structural set is the critical package in Montana because the loads vary so much by site. It includes the foundation plan, framing plans, lateral system schedules, connection details, and the design criteria block — and in Montana that block does heavy lifting: ground snow load per the jurisdiction or a site-specific study, seismic design category for western sites, design wind speed, and soil bearing pressure. Mountain reviewers check snow-load drift and sliding-snow provisions; plains reviewers check wind and expansive soils. A criteria block borrowed from another county’s project is the fastest route to corrections.\n\nThe MEP and civil sets complete the submittal. Mechanical drawings show heating systems sized for Montana winters, ventilation, and energy compliance; electrical drawings show service, distribution, and lighting; plumbing drawings show water, waste, and vent systems with freeze protection. Civil drawings address grading, snow storage and drainage, well and septic coordination where municipal utilities don’t reach, and access. Each set is sealed by the Montana-licensed engineer in responsible charge of that discipline.",
      },
      {
        heading: "Montana-Specific Stamp Triggers",
        body: "The enforcement gap is Montana’s defining trigger. State law requires licensed design for covered occupancies whether or not the county enforces a building code — in the many rural counties with no building department, compliance lives on paper: the sealed drawings, the engineer’s calculations, and the owner’s file. Lenders financing commercial construction in these counties routinely require stamped drawings as a loan condition, and insurers do the same. Building without them risks a stop-work order if the county does assert jurisdiction, plus uninsurable exposure.\n\nThe physical triggers are snow and seismic. Montana’s adopted snow-load maps — supplemented by site-specific studies in mountain terrain — produce some of the widest load ranges in the country; the structural drawings must show the ground snow load, flat-roof snow load, and drift provisions the design used. Western Montana’s seismic hazard, from the Helena area to the Yellowstone region, puts projects in seismic design categories that drive the lateral system and detailing. The cities that do run full review — Billings, Missoula, Bozeman, Great Falls, Helena — each layer local amendments onto the state code.",
      },
      {
        heading: "Montana Drawing Checklist Before Sealing",
        body: "Use this checklist before your Montana permit set is sealed:\n\n• Engineer of record holds an active Montana PE license, verifiable on the board roster\n• Seal shows name, Montana license number, and date on every sealed sheet\n• Responsible charge is genuine: the sealing engineer directed the engineering decisions\n• Ground snow load, drift, and sliding-snow provisions per the jurisdiction or site-specific study\n• Seismic design category stated and the lateral system detailed to match\n• Design wind speed and exposure category on the structural drawings\n• Rural counties: sealed set retained on paper even where no plan review occurs\n• Authority having jurisdiction confirmed: city building department or county — and lender requirements checked",
      },
    ],
    faqs: [
      {
        question: "Do I need an engineer stamp if my Montana county has no building department?",
        answer: "For covered occupancies, yes — on paper. Montana’s licensing law ties the stamp requirement to occupancy and size, not to county enforcement. Many rural counties have no building department, but commercial, assembly, educational, and multi-family buildings there still legally require licensed design. Lenders and insurers almost always require the sealed drawings as a condition of financing or coverage.",
      },
      {
        question: "How do Montana snow loads affect structural drawings?",
        answer: "Dramatically. Montana’s ground snow loads range from moderate on the eastern plains to very heavy in mountain jurisdictions, with drift, sliding snow, and unbalanced loading the reviewer expects to see analyzed. The structural drawings must state the ground snow load, the flat-roof snow load, and the drift provisions — ideally from the jurisdiction’s adopted values or a site-specific study, never borrowed from a different county.",
      },
      {
        question: "Can an out-of-state engineer stamp my Montana drawings?",
        answer: "Only after obtaining Montana licensure. Montana offers comity for engineers licensed in other states who meet the board’s qualifications, but the stamp cannot go on Montana drawings until the Montana license is active. Working under a Montana-licensed engineer in responsible charge is the compliant path while licensure is pending.",
      },
      {
        question: "Does Montana require seismic design?",
        answer: "Yes, where the maps say so. Western Montana — including the Helena area and the Yellowstone region — falls in seismic design categories that require engineered lateral systems and prescribed detailing. The structural drawings must state the seismic design category and show the lateral system and connections the category requires. Eastern Montana’s seismic demand is lower, but the category still goes on the cover sheet.",
      },
    ],
    extraLinks: [
      { label: "How are seismic design categories explained?", href: "/answers/seismic-design-categories-explained/" },
      { label: "How is wind load versus seismic load designed?", href: "/answers/wind-load-vs-seismic-load-design/" },
      { label: "How is the plan check corrections process explained?", href: "/answers/plan-check-corrections-process-explained/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "what-drawings-need-engineer-stamp-idaho",
    title: "What Drawings Need an Engineer Stamp in Idaho for Permits?",
    description: "Idaho requires an Idaho-licensed PE to stamp commercial structural drawings. Learn which sets need a seal, plus Boise review and eastern Idaho seismic rules.",
    h1: "What Drawings Need an Engineer Stamp in Idaho for Permits?",
    answer: "In Idaho, the drawings that need an engineer stamp are the structural drawings for most commercial, multi-family, educational, assembly, and institutional buildings — together with the mechanical, electrical, and plumbing drawings serving those occupancies. The stamp must come from a professional engineer licensed by the Idaho Board of Licensure of Professional Engineers and Professional Land Surveyors who was in responsible charge of the design, bearing the engineer’s name, Idaho license number, and the date. Single-family homes and bona fide agricultural buildings are generally exempt.\n\nAn Idaho permit set that requires engineering is built by discipline. The structural set shows the foundation plan, framing plans, the lateral force-resisting system, connection and anchorage details, and the design criteria — wind speed, ground snow load, seismic design category, and soil bearing values stated on the cover sheet. The mechanical set shows HVAC layouts, ventilation calculations, and energy compliance; the electrical set shows service, distribution, lighting, and panels; the plumbing set shows water, waste, and vent piping sized to the code. The civil set covers grading, drainage, utilities, and site access. Architecture on these projects is typically sealed by an Idaho-licensed architect, each professional sealing only the work under their responsible charge.\n\nIdaho-specific triggers split the state in two. Eastern Idaho — Idaho Falls, Rexburg, the Yellowstone gateway communities — sits in one of the highest seismic hazard zones in the interior West, and the structural drawings must show the seismic design category with the lateral system and detailing to match; reviewers there read the seismic provisions first. The Boise metro — Boise’s Planning and Development Services, Meridian, Nampa, Caldwell — runs the state’s highest-volume review with local amendments, while Coeur d’Alene and Twin Falls run their own. Snow loads swing from the mountain resorts to the Snake River Plain, and the drawings must carry the jurisdiction’s adopted values with drift analysis where the terrain demands it. In Idaho’s many rural counties with thin or no plan review, the licensing threshold still applies on paper for covered occupancies — the sealed set is legally required whether or not a reviewer asks for it.\n\nGray areas follow Idaho’s growth. Agricultural exemptions cover genuine farm buildings, not the event barn, brewery, or storage-condo conversion — change the use and the stamp requirement attaches. Accessory commercial buildings on rural parcels still trigger the threshold by occupancy and size. Delegated components — trusses, pre-engineered metal buildings, fire suppression — need sealed submittals coordinated under the engineer of record. And resort-area projects face design review overlays on top of building plan check, with the structural drawings satisfying both.",
    directAnswer: "In Idaho, structural drawings for commercial, multi-family, educational, assembly, and institutional buildings need an Idaho-licensed PE stamp, along with the MEP drawings for those occupancies. Eastern Idaho’s seismic hazard makes the seismic design category a first-order input. Apex Grid Engineering assigns Idaho-licensed engineers as engineers of record on every Idaho project.",
    topic: "PE Stamping by State",
    serviceHref: "/services/structural/",
    sections: [
      {
        heading: "Drawing Sets That Require a Stamp in Idaho",
        body: "The structural set does the heaviest work in Idaho. It includes the foundation plan with footing and pier schedules, framing plans, lateral system schedules, holdown and anchorage details, and the design criteria block — seismic design category, design wind speed, ground snow load with drift provisions, and soil bearing pressure. In eastern Idaho the seismic detailing — special moment frames, special shear walls, or braced frames with the prescribed connections — is the package the reviewer scrutinizes; in the mountain jurisdictions the snow-load analysis gets equal attention.\n\nThe MEP and civil sets round out the submittal under discipline sealing. Mechanical drawings carry equipment layouts, ductwork, ventilation rates, and energy documentation; electrical drawings carry service through branch panels, lighting, and panel schedules; plumbing drawings carry domestic water, sanitary, and vent systems. Civil drawings show grading, stormwater handling for spring runoff and winter snowmelt, utilities, and access — including well and septic coordination on rural sites. Every sealed sheet traces to the Idaho-licensed engineer who controlled that discipline’s work.",
      },
      {
        heading: "Idaho-Specific Stamp Triggers",
        body: "Seismic hazard is Idaho’s signature trigger. The eastern counties near Yellowstone sit in high seismic design categories — the structural drawings must state the category, show the site-specific ground motion values, and detail the lateral system accordingly, and the geotechnical investigation addresses liquefaction where the soils indicate it. The Boise metro’s review is volume-driven: Boise PDS, Meridian, and Nampa expect complete electronic submittals, and incomplete sets recycle to the back of the queue.\n\nSnow loads are the second trigger. Mountain jurisdictions adopt ground snow loads many times the Snake River Plain values, with drift, sliding snow, and unbalanced load analysis the reviewer expects. The engineer uses the specific jurisdiction’s adopted values — a Boise number doesn’t work in the mountains. The third trigger is the rural enforcement gap: in counties with minimal or no building departments, covered buildings still need licensed design on paper, and lenders and insurers require the sealed set as a financing condition.",
      },
      {
        heading: "Idaho Drawing Checklist Before Sealing",
        body: "Use this checklist before your Idaho permit set is sealed:\n\n• Engineer of record holds an active Idaho PE license, verifiable on the board roster\n• Seal shows name, Idaho license number, and date on every sealed sheet\n• Responsible charge is genuine: the sealing engineer directed the engineering decisions\n• Seismic design category and site ground motion values on the structural cover sheet\n• Ground snow load, drift, and sliding-snow provisions per the jurisdiction’s adopted values\n• Geotechnical report addresses liquefaction and soils; foundation matches the report\n• Rural counties: sealed set retained on paper even where no plan review occurs\n• Authority having jurisdiction confirmed: Boise PDS, Meridian, or the applicable city or county",
      },
    ],
    faqs: [
      {
        question: "Why is eastern Idaho a high seismic zone?",
        answer: "Eastern Idaho sits near the Yellowstone volcanic system and the Basin and Range fault network, producing some of the highest seismic design categories in the interior West. Structures there need engineered lateral systems — special moment frames, shear walls, or braced frames — with the connection detailing the seismic design category requires. The structural drawings must state the category and the ground motion values the design is based on.",
      },
      {
        question: "Do I need stamped drawings in rural Idaho counties?",
        answer: "For covered occupancies, yes. Idaho’s licensing threshold follows occupancy and size, not the county’s enforcement budget. Many rural counties have minimal or no plan review, but commercial, assembly, educational, and multi-family buildings there still legally require licensed design — and lenders and insurers will demand the sealed drawings regardless.",
      },
      {
        question: "Can an out-of-state engineer stamp my Idaho drawings?",
        answer: "Only after obtaining Idaho licensure. Idaho offers comity for engineers licensed in other states who meet the board’s qualifications, but the stamp cannot go on Idaho drawings until the Idaho license is active. Working under an Idaho-licensed engineer in responsible charge is the compliant path while licensure is pending.",
      },
      {
        question: "How do Idaho snow loads vary by location?",
        answer: "Enormously. The Snake River Plain carries moderate ground snow loads while mountain jurisdictions adopt values many times higher, with drift, sliding snow, and unbalanced loading analysis required. Each jurisdiction adopts its own values — the engineer verifies the numbers for the specific site, and the reviewer checks them against the local amendments.",
      },
    ],
    extraLinks: [
      { label: "How are seismic design categories explained?", href: "/answers/seismic-design-categories-explained/" },
      { label: "How is drilled pier design done?", href: "/answers/drilled-pier-design/" },
      { label: "How is the plan check corrections process explained?", href: "/answers/plan-check-corrections-process-explained/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "what-drawings-need-engineer-stamp-wyoming",
    title: "What Drawings Need an Engineer Stamp in Wyoming for Permits?",
    description: "Wyoming requires a Wyoming-licensed PE for commercial structural drawings. Learn which sets need a seal, plus high-wind rules and rural county requirements.",
    h1: "What Drawings Need an Engineer Stamp in Wyoming for Permits?",
    answer: "In Wyoming, the drawings that need an engineer stamp are the structural drawings for most commercial, multi-family, educational, assembly, and institutional buildings — plus the mechanical, electrical, and plumbing drawings serving those occupancies. The stamp must come from a professional engineer licensed by the Wyoming Board of Professional Engineers and Professional Land Surveyors who was in responsible charge of the design, showing the engineer’s name, Wyoming license number, and the date. Single-family homes and bona fide agricultural buildings are generally exempt.\n\nA Wyoming permit set that requires engineering is organized by discipline. The structural set shows the foundation plan, framing plans, the lateral force-resisting system, connection and anchorage details, and the design criteria — wind speed, ground snow load, seismic design category, and soil bearing values on the cover sheet. The mechanical set covers HVAC layouts, ventilation, and energy compliance; the electrical set covers service, distribution, lighting, and panels; the plumbing set covers water, waste, and vent piping. The civil set addresses grading, drainage, utilities, and site access. Architecture on these projects is typically sealed by a Wyoming-licensed architect, with each professional sealing only the work performed under their responsible charge.\n\nWyoming-specific triggers start with the wind. The state’s exposed high plains — especially along the I-80 corridor — produce some of the highest design wind speeds in the country, and the structural drawings must state the ultimate wind speed, exposure category, and components-and-cladding pressures; reviewers check them against the adopted maps as a matter of routine. Cheyenne, Casper, Laramie, Gillette, and Rock Springs each run their own plan review with local amendments. Bentonite and other expansive soils across the state make the geotechnical report the basis of foundation design — drilled piers or engineered slabs per the report. Snow loads run from the plains to the mountain jurisdictions, each with adopted values the drawings must carry. And in Wyoming’s rural counties with minimal enforcement, the licensing threshold still applies on paper: covered buildings legally need stamped drawings whether or not a county reviewer asks for them.\n\nThe gray areas track Wyoming’s industries. Ranch and farm buildings are exempt as agricultural structures, but convert one to an event venue, retail space, or workforce housing and the commercial threshold attaches. Energy and mining support buildings are judged by occupancy and size, not by industry — an occupied shop or office needs stamped drawings like any commercial building. Delegated components such as pre-engineered metal buildings and trusses need sealed submittals coordinated under the engineer of record, and change-of-occupancy renovations trigger current-code structural review.",
    directAnswer: "In Wyoming, structural drawings for commercial, multi-family, educational, assembly, and institutional buildings need a Wyoming-licensed PE stamp, along with the MEP drawings for those occupancies. The state’s extreme wind speeds make the wind design a first-order structural input. Apex Grid Engineering assigns Wyoming-licensed engineers as engineers of record on every Wyoming project.",
    topic: "PE Stamping by State",
    serviceHref: "/services/structural/",
    sections: [
      {
        heading: "Drawing Sets That Require a Stamp in Wyoming",
        body: "The structural set leads the Wyoming package because wind governs so much of the design. It includes the foundation plan, framing plans, lateral system schedules, anchorage and connection details, and the design criteria block — ultimate wind speed, exposure category, components-and-cladding pressures, ground snow load, seismic design category, and soil bearing pressure. Wyoming reviewers verify the wind numbers against the adopted maps first; an understated wind speed is the most common structural correction in the state.\n\nThe MEP and civil sets follow under discipline sealing. Mechanical drawings show heating systems built for Wyoming winters, ventilation, and energy compliance; electrical drawings show service, distribution, lighting, and panels; plumbing drawings show water, waste, and vent systems with freeze protection detailed. Civil drawings cover grading, drainage for snowmelt and summer storms, utilities, and access — with well and septic coordination where municipal services don’t reach. Each set bears the seal of the Wyoming-licensed engineer who controlled that discipline.",
      },
      {
        heading: "Wyoming-Specific Stamp Triggers",
        body: "Wind is Wyoming’s defining trigger. The high plains’ exposure and the terrain-accelerated winds along the I-80 corridor drive design wind speeds to the top of the national range, and the structural drawings must show the speed, the exposure, and the envelope pressures the cladding and roofing are designed for. The lateral system — shear walls, braced frames, or moment frames — follows from the wind demand, and the anchorage details get close reviewer attention.\n\nSoils and snow complete the picture. Expansive bentonite soils require foundations designed to the geotechnical report — typically drilled piers to stable strata — and the reviewer cross-checks the foundation plan against the report’s recommendations. Snow loads vary from the plains to the mountain jurisdictions, each with adopted values plus drift analysis where terrain demands it. The cities that run full review — Cheyenne, Casper, Laramie, Gillette, Rock Springs — layer local amendments onto the state code, while the rural counties’ thin enforcement doesn’t erase the on-paper licensing requirement for covered occupancies.",
      },
      {
        heading: "Wyoming Drawing Checklist Before Sealing",
        body: "Use this checklist before your Wyoming permit set is sealed:\n\n• Engineer of record holds an active Wyoming PE license, verifiable on the board roster\n• Seal shows name, Wyoming license number, and date on every sealed sheet\n• Responsible charge is genuine: the sealing engineer directed the engineering decisions\n• Ultimate wind speed, exposure category, and components-and-cladding pressures on the structural drawings\n• Geotechnical report addresses expansive bentonite soils; foundation matches the report\n• Ground snow load and drift provisions per the jurisdiction’s adopted values\n• Rural counties: sealed set retained on paper even where no plan review occurs\n• Authority having jurisdiction confirmed: Cheyenne, Casper, or the applicable city or county",
      },
    ],
    faqs: [
      {
        question: "How does Wyoming’s wind affect structural drawings?",
        answer: "Wyoming’s high-plains exposure produces some of the highest design wind speeds in the country, and wind typically governs the lateral design. The structural drawings must state the ultimate design wind speed, the exposure category, and the components-and-cladding pressures for the envelope — roofing, siding, glazing, and their attachments. Reviewers verify these values against the adopted maps, and the lateral system and anchorage detailing follow from them.",
      },
      {
        question: "Do I need stamped drawings in rural Wyoming?",
        answer: "For covered occupancies, yes — on paper. Wyoming’s licensing threshold follows occupancy and size, not county enforcement. Rural counties with minimal or no plan review still legally require licensed design for commercial, assembly, educational, and multi-family buildings, and lenders and insurers will require the sealed drawings as a condition of financing or coverage.",
      },
      {
        question: "Can an out-of-state engineer stamp my Wyoming drawings?",
        answer: "Only after obtaining Wyoming licensure. Wyoming offers comity for engineers licensed in other states who meet the board’s qualifications, but the stamp cannot go on Wyoming drawings until the Wyoming license is active. Working under a Wyoming-licensed engineer in responsible charge is the compliant path while licensure is pending.",
      },
      {
        question: "What are Wyoming’s bentonite soil issues?",
        answer: "Bentonite is a highly expansive clay found across Wyoming that swells dramatically when wetted, exerting uplift forces that can destroy conventional shallow foundations. The geotechnical report typically requires drilled piers to stable strata or specially engineered slabs, and the structural drawings must reflect the report’s recommendations — the plan reviewer checks the foundation against the report.",
      },
    ],
    extraLinks: [
      { label: "How is wind load versus seismic load designed?", href: "/answers/wind-load-vs-seismic-load-design/" },
      { label: "How are expansive soil foundations designed?", href: "/answers/expansive-soil-foundation-solutions/" },
      { label: "How are someone else’s drawings stamped?", href: "/answers/engineer-stamping-someone-elses-drawings/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "what-drawings-need-engineer-stamp-oregon",
    title: "What Drawings Need an Engineer Stamp in Oregon for Permits?",
    description: "Oregon requires an Oregon-licensed PE for commercial structural drawings. Learn which sets need a seal, plus OSSC drawing rules and Cascadia seismic design.",
    h1: "What Drawings Need an Engineer Stamp in Oregon for Permits?",
    answer: "In Oregon, the drawings that need an engineer stamp are the structural drawings for most commercial, multi-family, educational, assembly, and institutional buildings — along with the mechanical, electrical, and plumbing drawings serving those occupancies. The stamp must come from a professional engineer licensed by the Oregon State Board of Examiners for Engineering and Land Surveying (OSBEELS) who was in responsible charge of the design, showing the engineer’s name, Oregon license number, and the date. Single-family homes and bona fide agricultural buildings are generally exempt, though Oregon’s structural code still reaches further into residential construction than many states’.\n\nAn Oregon permit set that requires engineering is built around the Oregon Structural Specialty Code (OSSC). The structural set shows the foundation plan, framing plans, the lateral force-resisting system, connection details, and — distinctively — the code-mandated design information: seismic design category, design wind speed, ground snow load, flood design data, and soil bearing values stated on the construction documents. The mechanical, electrical, and plumbing sets show the building’s systems with Oregon Energy Efficiency Specialty Code compliance documented. The civil set covers grading, stormwater, utilities, and access. Architecture on these projects is typically sealed by an Oregon-licensed architect, each professional sealing only the work under their responsible charge.\n\nOregon-specific triggers are written into the OSSC itself. The code requires the construction documents to identify the design criteria — the reviewer checks the seismic design category, wind speed, snow load, and flood data on the drawings before the details are read. The OSSC’s special-inspection chapter requires a statement of special inspections identifying the work requiring continuous or periodic inspection, and structural observation requirements attach to defined structure types — the engineer of record names the observation scope on the drawings. Cascadia subduction-zone seismicity makes the seismic design category a first-order input across western Oregon, with site-specific ground motion and liquefaction analysis the geotechnical report must address. Portland’s Bureau of Development Services, Eugene, Salem, Bend, and Medford each run their own review with local amendments.\n\nThe gray areas are where Oregon’s thoroughness surprises owners. The statement of special inspections is a design deliverable, not a contractor form — omitting it stalls the permit. Structural observation is a separate OSSC requirement from special inspection, and confusing the two draws corrections. Seismic anchorage of nonstructural components — mechanical equipment, ceilings, cladding — needs engineered detailing on high-seismic sites. And Oregon’s energy code is among the nation’s strictest: the compliance documentation must match the drawings exactly, or the energy reviewer holds the set.",
    directAnswer: "In Oregon, structural drawings for commercial, multi-family, educational, assembly, and institutional buildings need an Oregon-licensed PE stamp, plus the MEP drawings for those occupancies. The OSSC requires design criteria, special-inspection statements, and structural observation on the drawings. Apex Grid Engineering assigns Oregon-licensed engineers as engineers of record on every Oregon project.",
    topic: "PE Stamping by State",
    serviceHref: "/services/structural/",
    sections: [
      {
        heading: "Drawing Sets That Require a Stamp in Oregon",
        body: "The structural set is Oregon’s most code-prescribed drawing package. Beyond foundation and framing plans, lateral system schedules, and connection details, the OSSC requires the construction documents to state the design criteria: seismic design category, basic design wind speed, ground snow load, flood design data, allowable soil bearing pressure, and the lateral system. The set also carries the statement of special inspections — listing each type of work requiring special inspection and whether it is continuous or periodic — and the structural observation program where the code requires it. Reviewers treat missing code-required drawing information as an incomplete submittal.\n\nThe MEP and civil sets complete the package under discipline sealing. Mechanical drawings show HVAC, ventilation, and Oregon Energy Efficiency Specialty Code compliance forms; electrical drawings show service, distribution, and lighting; plumbing drawings show water, waste, and vent systems. Civil drawings address grading, stormwater management under Oregon’s stringent water-quality rules, utilities, and access. Each set is sealed by the Oregon-licensed engineer in responsible charge of that discipline — the seals must match the work.",
      },
      {
        heading: "Oregon-Specific Stamp Triggers",
        body: "The OSSC drawing requirements are the trigger owners least expect. The code mandates specific information on the construction documents — design loads, seismic and wind criteria, flood data, special-inspection statements — and plan reviewers in Portland, Eugene, Salem, Bend, and Medford enforce the list literally. A structurally complete set that omits the statement of special inspections or the design criteria block comes back for correction before structural review even begins.\n\nCascadia seismicity is the engineering trigger. Western Oregon’s subduction-zone hazard drives high seismic design categories, site-specific ground motion studies for defined site classes, and liquefaction and lateral-spread analysis in the geotechnical report. The lateral system — special moment frames, special shear walls, or braced frames — and its connection detailing follow from the category, and nonstructural component anchorage is engineered, not assumed. The Oregon Energy Efficiency Specialty Code is the third trigger: envelope, lighting, and mechanical compliance documented to one of the strictest energy codes in the country, coordinated exactly with the drawings.",
      },
      {
        heading: "Oregon Drawing Checklist Before Sealing",
        body: "Use this checklist before your Oregon permit set is sealed:\n\n• Engineer of record holds an active Oregon PE license, verifiable on the OSBEELS roster\n• Seal shows name, Oregon license number, and date on every sealed sheet\n• Responsible charge is genuine: the sealing engineer directed the engineering decisions\n• OSSC-required design criteria on the drawings: seismic category, wind speed, snow load, flood data\n• Statement of special inspections included, with continuous versus periodic inspection identified\n• Structural observation program defined where the OSSC requires it\n• Nonstructural component anchorage detailed for the seismic design category\n• Oregon energy code compliance documented and matched to the drawings",
      },
    ],
    faqs: [
      {
        question: "What does the Oregon Structural Specialty Code require on structural drawings?",
        answer: "The OSSC requires the construction documents to identify the design criteria — seismic design category, basic wind speed, ground snow load, flood design data, soil bearing values, and the lateral system — plus a statement of special inspections and structural observation requirements where applicable. Reviewers check this code-required drawing information before structural review begins; omitting it returns the set for correction.",
      },
      {
        question: "What is structural observation in Oregon?",
        answer: "Structural observation is the OSSC-required visual observation of the structural system by the engineer of record (or their representative) at defined construction stages — distinct from special inspection, which is performed by approved inspectors. The engineer names the observation scope on the drawings. It applies to defined structure types and seismic design categories, and the building department verifies the program is stated before issuing the permit.",
      },
      {
        question: "Can an out-of-state engineer stamp my Oregon drawings?",
        answer: "Only after obtaining Oregon licensure. Oregon offers comity for engineers licensed in other states who meet the board’s qualifications, but the stamp cannot go on Oregon drawings until the Oregon license is active. Working under an Oregon-licensed engineer in responsible charge is the compliant path while licensure is pending.",
      },
      {
        question: "Does Oregon require special inspections on every commercial project?",
        answer: "Essentially yes for structural work. The OSSC’s special-inspection chapter lists the work requiring continuous or periodic special inspection — structural steel, concrete, masonry, soils, deep foundations, and more — and the engineer’s statement of special inspections on the drawings defines the project-specific program. The building department enforces the statement as part of the permit.",
      },
    ],
    extraLinks: [
      { label: "How are seismic design categories explained?", href: "/answers/seismic-design-categories-explained/" },
      { label: "How are energy code compliance paths explained?", href: "/answers/energy-code-compliance-paths-explained/" },
      { label: "How is the plan check corrections process explained?", href: "/answers/plan-check-corrections-process-explained/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "what-drawings-need-engineer-stamp-hawaii",
    title: "What Drawings Need an Engineer Stamp in Hawaii for Permits?",
    description: "Hawaii requires a Hawaii-licensed PE to stamp commercial structural drawings. Learn which sets need a seal, plus county review and hurricane detailing rules.",
    h1: "What Drawings Need an Engineer Stamp in Hawaii for Permits?",
    answer: "In Hawaii, the drawings that need an engineer stamp are the structural drawings for most commercial, multi-family, educational, assembly, and institutional buildings — together with the mechanical, electrical, and plumbing drawings serving those occupancies. The stamp must come from a professional engineer licensed by the Hawaii Board of Professional Engineers, Architects, Surveyors and Landscape Architects (under the Department of Commerce and Consumer Affairs) who was in responsible charge of the design, showing the engineer’s name, Hawaii license number, and the date. Single-family homes and bona fide agricultural buildings are generally exempt.\n\nA Hawaii permit set that requires engineering is built by discipline — but Hawaii’s defining feature is that the counties are the building authorities. The structural set shows the foundation plan, framing plans, the lateral force-resisting system, connection and hurricane detailing, and the design criteria — design wind speed, exposure category, seismic design category, and soil bearing values on the cover sheet. The mechanical, electrical, and plumbing sets show the building’s systems with Hawaii Energy Code compliance. The civil set covers grading, drainage, utilities, and access. Each county — the City and County of Honolulu’s Department of Planning and Permitting (DPP), Hawaii County, Maui County, and Kauai County — applies the state building code with its own amendments and its own drawing checklist, so the county’s submittal requirements shape the set.\n\nHawaii-specific triggers start with the wind. The islands’ hurricane exposure drives high design wind speeds with wind-borne debris provisions, and the structural drawings must show the wind speed, exposure, and the components-and-cladding pressures for the envelope — impact-resistant glazing or protected openings, roof covering attachment, and the connection detailing that keeps the roof on the building. Honolulu DPP runs the state’s highest-volume review; Hawaii County, Maui County, and Kauai County each run their own with different amendment packages and review cultures. On Hawaii Island, lava zones shape siting and foundation decisions — the drawings and the geotechnical report address the zone’s volcanic soils and the flood and drainage patterns the lava rock creates. Termite protection and corrosion-resistant detailing for the salt-air environment round out the Hawaii drawing package.\n\nGray areas follow the islands’ geography. A project’s county determines everything — the same building on Oahu versus Maui faces different amendments, checklists, and review timelines, so confirming the county AHJ comes before design. Agricultural dedications and plantation-era structures carry use questions that change the stamp threshold. Additions in flood zones trigger elevation and flood-resistant detailing requirements that reach into the structural drawings. And resort and shoreline projects layer shoreline setback, SMA (Special Management Area), and conservation district reviews on top of building plan check — the structural drawings must satisfy every reviewing authority, not just the building department.",
    directAnswer: "In Hawaii, structural drawings for commercial, multi-family, educational, assembly, and institutional buildings need a Hawaii-licensed PE stamp, plus the MEP drawings for those occupancies. Each county runs its own review with hurricane detailing as the defining structural demand. Apex Grid Engineering assigns Hawaii-licensed engineers as engineers of record on every Hawaii project.",
    topic: "PE Stamping by State",
    serviceHref: "/services/structural/",
    sections: [
      {
        heading: "Drawing Sets That Require a Stamp in Hawaii",
        body: "The structural set is Hawaii’s hurricane package. It includes the foundation plan, framing plans, lateral system schedules, and the connection detailing the high-wind design demands — roof-to-wall ties, holdowns, shear wall nailing schedules, and the envelope pressure design. The design criteria block states the ultimate wind speed, exposure category, components-and-cladding pressures, seismic design category, and soil bearing pressure. Reviewers verify the wind numbers and the opening-protection schedule against the adopted maps and the county amendments before reading further.\n\nThe MEP and civil sets complete the submittal under discipline sealing. Mechanical drawings show HVAC designed for the tropical climate, ventilation, and Hawaii Energy Code compliance; electrical drawings show service, distribution, lighting, and panels; plumbing drawings show water, waste, and vent systems. Civil drawings address grading, drainage for intense tropical rainfall, utilities, and access — with flood-zone elevation data where FEMA maps apply. Each set is sealed by the Hawaii-licensed engineer in responsible charge of that discipline, and the county’s drawing checklist dictates the sheet order and required details.",
      },
      {
        heading: "Hawaii-Specific Stamp Triggers",
        body: "The counties are the trigger. Hawaii has no statewide building department — the City and County of Honolulu DPP, Hawaii County, Maui County, and Kauai County each adopt the state code with county amendments and run their own plan review. Honolulu’s DPP is the highest-volume reviewer in the state with detailed electronic submittal requirements; the neighbor-island counties run smaller reviews with their own checklists and amendment packages. The engineer confirms the county AHJ first, because the amendments change wind, energy, and submittal inputs.\n\nHurricane detailing is the engineering trigger. Hawaii’s design wind speeds and wind-borne debris provisions require impact-resistant or protected glazing, specified roof-covering attachment, and continuous load-path connections from roof to foundation — all shown and scheduled on the structural drawings. On Hawaii Island, lava zones add siting and foundation considerations the geotechnical report must address. Flood zones across all islands require finished-floor elevations and flood-resistant detailing on the drawings. Shoreline and SMA review layers add entitlements that run parallel to — and can hold up — the building permit.",
      },
      {
        heading: "Hawaii Drawing Checklist Before Sealing",
        body: "Use this checklist before your Hawaii permit set is sealed:\n\n• Engineer of record holds an active Hawaii PE license, verifiable on the DCCA roster\n• Seal shows name, Hawaii license number, and date on every sealed sheet\n• Responsible charge is genuine: the sealing engineer directed the engineering decisions\n• Design wind speed, exposure category, and components-and-cladding pressures on the structural drawings\n• Opening protection schedule: impact-resistant glazing or shutters per the debris provisions\n• Continuous load-path connections detailed from roof to foundation\n• Flood zone, base flood elevation, and finished floor elevation documented\n• County AHJ confirmed — Honolulu DPP, Hawaii, Maui, or Kauai — with that county’s checklist and amendments",
      },
    ],
    faqs: [
      {
        question: "Which county permits my Hawaii project?",
        answer: "The county where the project sits — Hawaii has no statewide building department. Oahu projects go through the City and County of Honolulu’s Department of Planning and Permitting (DPP); the Big Island through Hawaii County; Maui, Molokai, and Lanai through Maui County; Kauai and Niihau through Kauai County. Each applies the state building code with its own amendments and runs its own review, so the county’s checklist shapes the drawing set.",
      },
      {
        question: "What hurricane detailing do Hawaii drawings need?",
        answer: "Hawaii’s hurricane exposure requires the structural drawings to show the design wind speed, exposure category, and components-and-cladding pressures, plus the detailing that resists them: continuous roof-to-foundation load-path connections, roof covering attachment schedules, and impact-resistant or protected glazing per the wind-borne debris provisions. Reviewers check the opening-protection schedule and the connection details closely.",
      },
      {
        question: "Can an out-of-state engineer stamp my Hawaii drawings?",
        answer: "Only after obtaining Hawaii licensure. Hawaii offers comity for engineers licensed in other states who meet the board’s qualifications, but the stamp cannot go on Hawaii drawings until the Hawaii license is active. Working under a Hawaii-licensed engineer in responsible charge is the compliant path while licensure is pending.",
      },
      {
        question: "Do lava zones change structural drawing requirements?",
        answer: "They change the site inputs the drawings are based on. On Hawaii Island, the lava zone affects siting, the volcanic soils the geotechnical report must characterize, and the drainage patterns the civil drawings must handle. The structural drawings reflect the report’s foundation recommendations for the zone’s conditions — the county reviewer checks that the foundation design matches the geotechnical findings for the specific site.",
      },
    ],
    extraLinks: [
      { label: "How is hurricane glazing designed?", href: "/answers/hurricane-glazing-design/" },
      { label: "How is wind load versus seismic load designed?", href: "/answers/wind-load-vs-seismic-load-design/" },
      { label: "How are ADU engineering plans done?", href: "/answers/adu-engineering-plans/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
];
