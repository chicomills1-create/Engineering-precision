import type { Phase0AeoPage } from "./phase0-corpus";

const founderNote = "I'm Jeremy Mills, CEO & Founder of Apex Grid Engineering and a U.S. Air Force veteran. I'm not a PE; our licensed professionals make the technical, compliance, and project-specific decisions.";

export const WAVE_HX_ANSWER_PAGES: Phase0AeoPage[] = [
  {
    slug: "who-can-stamp-building-plans-nebraska",
    title: "Which Licensed Engineer Can Stamp My Building Plans in Nebraska?",
    description: "Nebraska requires a Nebraska-licensed PE in responsible charge to stamp plans. Learn who qualifies, Omaha tornado and soil rules, and review timelines.",
    h1: "Which Licensed Engineer Can Stamp My Building Plans in Nebraska?",
    answer: "The answer: Only a professional engineer licensed by the Nebraska Board of Engineers and Architects who is in responsible charge of the work can legally stamp your building plans in Nebraska. The seal certifies the engineer personally directed the design decisions, and it must show the engineer's name, Nebraska license number, and the date of sealing.\\n\\nNebraska runs a combined board for engineers and architects, but the rule that matters for stamping is responsible charge: the sealing engineer must have exercised direct supervision and control over the engineering work, not merely reviewed someone else's drawings at the end. Out-of-state engineers must obtain a Nebraska license by comity before sealing Nebraska plans — there is no temporary-permit shortcut for stamping. Apex Grid Engineering assigns a Nebraska-licensed PE as the engineer of record on every Nebraska project, so the stamp on your plans always belongs to the engineer who controlled the design.\\n\\nOmaha drives most Nebraska permitting volume, and the city's Planning Department runs plan review for projects inside city limits, with Lincoln's Building and Safety division covering the capital. Nebraska sits on the northern edge of tornado alley, so wind design under ASCE 7 governs most structural work — high design wind speeds, continuous load paths, and impact protection where the occupancy demands it. Eastern Nebraska's loess and glacial soils are famously expansive, so foundation design routinely addresses swell pressures that can crack slabs and heave lightly loaded structures.\\n\\nPermitting follows the site, not the state. A project inside Omaha goes through the City of Omaha Planning Department with city amendments to the building code, while the same project a mile outside city limits in unincorporated Douglas County goes through the county with different submittal checklists and review staff. In Lincoln, the city-county split runs through Lincoln Building and Safety versus Lancaster County Engineering. Rural Nebraska counties vary widely in review capacity, so the engineer confirms the authority having jurisdiction, the adopted code edition, and the review clock before the first sheet is drawn.",
    directAnswer: "Only a Nebraska-licensed PE in responsible charge of the work can stamp your building plans in Nebraska. Omaha runs the state's heaviest permitting volume, and wind plus expansive-soil design shape nearly every structural set.",
    topic: "PE Stamping by State",
    serviceHref: "/services/structural/",
    sections: [
      {
        heading: "Nebraska PE License Requirements for Stamping",
        body: "The Nebraska Board of Engineers and Architects licenses the individual engineer — and it is the individual, in responsible charge, whose seal may appear on the drawings. Responsible charge means the engineer directed the engineering decisions: selected the structural system, set the design criteria, and supervised the calculations. A seal applied as a favor, or by an engineer who only glanced at finished drawings, violates the board's rules and exposes both the engineer and the project to discipline. The seal must carry the engineer's printed name, the Nebraska license number, and the date sealed on every sheet the engineer takes responsibility for.\\n\\nEngineers licensed in other states cannot stamp Nebraska plans until the Nebraska board grants them a license, typically by comity for engineers already licensed elsewhere with qualifying experience and examinations. Firms practicing in Nebraska designate licensed engineers in responsible charge for each project. Apex Grid Engineering assigns a Nebraska-licensed engineer of record to every Nebraska project, so the responsible-charge chain is real and documented — the engineer who seals your plans is the engineer who ran the design.",
      },
      {
        heading: "Omaha, Lincoln, and Nebraska's Tornado and Soil Demands",
        body: "Omaha is the permitting center of gravity: the city's Planning Department reviews commercial and multifamily work under city amendments to the International Building Code, and completeness of the submittal drives the schedule. Lincoln's review through Building and Safety is smaller in volume but equally exacting on structural documentation. Both cities sit in a wind-governed design region — tornadoes and straight-line prairie winds make the ASCE 7 wind provisions, and the continuous load path from roof to foundation, the controlling structural conversation on most buildings.\\n\\nSoils are the second Nebraska signature. The loess deposits of eastern Nebraska and the glacial tills across much of the state are expansive: they swell when wet and shrink when dry, and that movement destroys lightly loaded slabs, sidewalks, and shallow foundations. Geotechnical reports in the Omaha and Lincoln corridors routinely recommend pier-and-grade-beam systems, post-tensioned slabs, or deep foundations to isolate the structure from the active soil zone. Your engineer should state the soil assumptions, the foundation system, and the wind design criteria on the drawings — reviewers in Douglas and Lancaster counties expect to see them.",
      },
      {
        heading: "Nebraska Plan Stamping Checklist",
        body: "Use this checklist before your Nebraska permit set is sealed:\\n\\n• Engineer of record holds an active Nebraska PE license verifiable on the board's roster\\n• Seal shows name, Nebraska license number, and date on every sealed sheet\\n• Responsible charge is genuine: the sealing engineer directed the design decisions\\n• Wind speed, exposure category, and ASCE 7 edition stated on the structural drawings\\n• Continuous load path detailed from roof diaphragm to foundation\\n• Geotechnical report addresses expansive loess or glacial soils with a compatible foundation system\\n• Storm shelter or safe-room provisions evaluated for the occupancy and jurisdiction\\n• Authority having jurisdiction confirmed: city planning department or county engineering",
      },
    ],
    faqs: [
      {
        question: "Can an out-of-state engineer stamp my Nebraska building plans?",
        answer: "No. Nebraska requires the stamping engineer to hold an active Nebraska license issued by the Nebraska Board of Engineers and Architects. Out-of-state engineers typically obtain licensure by comity, which takes processing time — plan the schedule accordingly. While licensure is pending, the compliant path is working under a Nebraska-licensed engineer in responsible charge.",
      },
      {
        question: "Does Nebraska require storm shelters in new buildings?",
        answer: "Nebraska has no statewide mandate that every building include a storm shelter, but many jurisdictions and occupancies effectively require them — schools, assembly occupancies, and some multifamily projects routinely need ICC 500-compliant safe rooms or shelter areas. Your engineer evaluates the occupancy, the local amendments, and the client's risk tolerance, then designs the shelter to the required wind speeds and debris-impact criteria.",
      },
      {
        question: "Why do Nebraska engineers worry so much about soils?",
        answer: "Eastern Nebraska's loess and much of the state's glacial till are expansive clays that swell dramatically when they absorb water. That movement can heave slabs, crack foundation walls, and rack door and window frames. A geotechnical investigation with swell testing, paired with a foundation system that isolates the building from the active zone — piers, post-tensioned slabs, or deep foundations — is standard practice in Nebraska, not an upgrade.",
      },
      {
        question: "How long does plan review take in Omaha?",
        answer: "Timelines depend on project size, completeness, and current queue volume. Straightforward commercial submittals in Omaha often clear in several weeks when the set is complete and the structural calculations are well documented. Incomplete submittals — missing soils reports, unstated design criteria, or an unlicensed seal — go to the back of the line. A Nebraska-licensed engineer who submits a complete, coordinated set is the fastest schedule lever you have.",
      },
    ],
    extraLinks: [
      { label: "How are expansive soil foundations designed?", href: "/answers/expansive-soil-foundation-solutions/" },
      { label: "How is wind load versus seismic load designed?", href: "/answers/wind-load-vs-seismic-load-design/" },
      { label: "How is the plan check corrections process explained?", href: "/answers/plan-check-corrections-process-explained/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "who-can-stamp-building-plans-kansas",
    title: "Which Licensed Engineer Can Stamp My Building Plans in Kansas?",
    description: "Kansas requires a Kansas-licensed PE in responsible charge to stamp plans. Learn tornado-alley wind design, clay-soil foundations, and Wichita review timelines.",
    h1: "Which Licensed Engineer Can Stamp My Building Plans in Kansas?",
    answer: "The answer: Only a professional engineer licensed by the Kansas State Board of Technical Professions who is in responsible charge of the work can legally stamp your building plans in Kansas. The seal certifies the engineer personally directed the design, and it must show the engineer's name, Kansas license number, and the date of sealing.\\n\\nKansas licenses engineers, architects, surveyors, and landscape architects under one technical professions board, but the stamping rule is the same as everywhere: responsible charge or nothing. The sealing engineer must have exercised direct supervision and control over the engineering decisions — selecting the structural system, setting the design criteria, and directing the calculations. Out-of-state engineers need a Kansas license by comity before sealing Kansas drawings. Apex Grid Engineering assigns a Kansas-licensed PE as engineer of record on every Kansas project, so the stamp always belongs to the engineer who controlled the design.\\n\\nKansas sits in the heart of tornado alley, and that single fact shapes more Kansas structural design than anything else. Design wind speeds are high, continuous load paths from roof to foundation are non-negotiable, and safe rooms designed to ICC 500 are common in schools, public buildings, and multifamily work. Under the wind story runs the soils story: expansive clays dominate Kansas geology, and the Wichita, Kansas City, and Topeka corridors all produce geotechnical reports calling out swell potential. Drilled piers bearing below the active soil zone are the default foundation answer across much of the state. Wichita's permitting runs through the Wichita-Sedgwick County Metropolitan Area Planning Department, the state's largest combined city-county review operation.\\n\\nPermitting follows the site, not the state. A project inside Wichita goes through the Metropolitan Area Planning Department with city amendments, while the same project in unincorporated Sedgwick County faces county review with different checklists. Kansas City, Kansas, is its own animal: the Unified Government of Wyandotte County runs a consolidated city-county government, so one department handles what two handle elsewhere. Overland Park and the Johnson County suburbs each run their own plan check under local amendments. The engineer confirms the authority having jurisdiction, the adopted code edition, and the review queue before drawing — in Kansas, the wind criteria and soil assumptions on the drawings matter as much as which counter the plans land on.",
    directAnswer: "Only a Kansas-licensed PE in responsible charge can stamp your building plans in Kansas. Tornado-alley wind design and statewide expansive clays drive the engineering, with Wichita running the state's largest plan review operation.",
    topic: "PE Stamping by State",
    serviceHref: "/services/structural/",
    sections: [
      {
        heading: "Kansas PE License Requirements for Stamping",
        body: "The Kansas State Board of Technical Professions licenses the individual engineer, and only that licensed individual — in responsible charge of the work — may apply a seal to Kansas drawings. Responsible charge means the engineer controlled the engineering: chose the lateral system, established the wind and soil design criteria, and supervised the analysis. Kansas does not recognize a seal applied by an engineer who merely reviewed another firm's finished set. The seal must display the engineer's name, the Kansas license number, and the date of sealing on each sheet for which the engineer takes responsibility.\\n\\nEngineers licensed elsewhere must secure a Kansas license by comity before stamping Kansas plans, and the board verifies experience and examination history as part of that process. Firms offering engineering services in Kansas operate under licensed engineers in responsible charge for each project and discipline. Apex Grid Engineering assigns a Kansas-licensed engineer of record to every Kansas project — the person whose name and number appear on the seal is the person who directed the design, which is exactly what the board requires.",
      },
      {
        heading: "Tornado Alley Wind Design and Kansas Clay Soils",
        body: "Wind governs Kansas structural design. The state's position in tornado alley drives high design wind speeds, and reviewers expect to see the wind speed, exposure category, and code edition stated plainly on the structural drawings, with a continuous load path detailed from the roof diaphragm through the walls and into the foundation. Hold-downs, anchor bolts, and roof-to-wall connections get real scrutiny because straight-line winds and tornadoes test exactly those details. For schools, daycares, and public assembly buildings, ICC 500 storm shelters or safe rooms are a routine part of the program.\\n\\nBelow grade, expansive clay is the statewide constant. Kansas clays swell with seasonal moisture changes, and the damage pattern — heaved slabs, cracked masonry, stuck doors — is familiar to every plan reviewer in the state. Geotechnical investigations with swell and consolidation testing are the norm, and the foundation answer is usually drilled piers extending below the active moisture zone, with grade beams spanning between them. Your engineer coordinates the geotechnical recommendations with the structural drawings so the reviewer sees one consistent foundation story.",
      },
      {
        heading: "Kansas Plan Stamping Checklist",
        body: "Use this checklist before your Kansas permit set is sealed:\\n\\n• Engineer of record holds an active Kansas PE license verifiable on the board's roster\\n• Seal shows name, Kansas license number, and date on every sealed sheet\\n• Responsible charge is genuine: the sealing engineer directed the design decisions\\n• Wind speed, exposure category, and ASCE 7 edition stated on the structural drawings\\n• Continuous load path detailed from roof to foundation with specified connectors\\n• Geotechnical report addresses expansive clay with drilled piers or an equivalent system\\n• ICC 500 safe-room or shelter provisions evaluated for the occupancy\\n• Authority having jurisdiction confirmed: city, county, or unified government review",
      },
    ],
    faqs: [
      {
        question: "Can an out-of-state engineer stamp my Kansas building plans?",
        answer: "No. Kansas requires an active Kansas license from the State Board of Technical Professions before an engineer may seal Kansas plans. Comity licensure is the standard path for already-licensed engineers, but it takes processing time. The compliant interim path is practicing under a Kansas-licensed engineer in responsible charge — which is how Apex staffs Kansas projects.",
      },
      {
        question: "Are storm shelters required in Kansas buildings?",
        answer: "Kansas has no blanket statewide shelter mandate for all buildings, but shelters are effectively required across much public and institutional work — Kansas school and emergency-management programs have made ICC 500 safe rooms standard in new schools, and many jurisdictions require shelter areas in assembly and multifamily occupancies. Your engineer checks the local amendments and designs the shelter for the required wind speed and missile-impact criteria.",
      },
      {
        question: "Why do Kansas foundations so often use drilled piers?",
        answer: "Because of the clay. Expansive Kansas clays move with moisture changes near the surface, so shallow foundations ride that movement and crack. Drilled piers extend below the active zone into stable bearing material, and grade beams span between piers to carry the structure — isolating the building from the soil's seasonal swell and shrink. It costs more up front than a slab, and it prevents the failures reviewers see constantly.",
      },
      {
        question: "Is permitting different in Kansas City, Kansas versus the Missouri side?",
        answer: "Completely different. Kansas City, Kansas operates under the Unified Government of Wyandotte County with its own departments, codes, and amendments, while Kansas City, Missouri runs a separate municipal review across the state line. A project a few blocks apart can face different codes, different reviewers, and different timelines. Your engineer confirms which state, which city, and which amendments apply before starting design.",
      },
    ],
    extraLinks: [
      { label: "How is drilled pier design done?", href: "/answers/drilled-pier-design/" },
      { label: "How much does a PE stamp cost for house plans?", href: "/answers/pe-stamp-cost-for-house-plans/" },
      { label: "How is self-storage drainage designed?", href: "/answers/self-storage-drainage-design/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "who-can-stamp-building-plans-oklahoma",
    title: "Which Licensed Engineer Can Stamp My Building Plans in Oklahoma?",
    description: "Oklahoma requires an Oklahoma-licensed PE in responsible charge to stamp plans. Learn tornado and expansive-soil rules, OKC permitting, and review timelines.",
    h1: "Which Licensed Engineer Can Stamp My Building Plans in Oklahoma?",
    answer: "The answer: Only a professional engineer licensed by the Oklahoma State Board of Licensure for Professional Engineers and Land Surveyors who is in responsible charge of the work can legally stamp your building plans in Oklahoma. The seal certifies the engineer personally directed the design, and it must show the engineer's name, Oklahoma license number, and the date of sealing.\\n\\nOklahoma's board is explicit that responsible charge means actual direction and control of the engineering work — selecting systems, setting criteria, and supervising calculations. An engineer who only reviews another firm's finished drawings at the end may not seal them. Out-of-state engineers must obtain an Oklahoma license by comity before stamping Oklahoma plans. Apex Grid Engineering assigns an Oklahoma-licensed PE as engineer of record on every Oklahoma project, so the stamp on your plans always belongs to the engineer who ran the design.\\n\\nOklahoma pairs the country's worst tornado exposure with some of its most troublesome expansive soils — the combination shapes every structural set in the state. Design wind speeds run high, continuous load paths are mandatory, and ICC 500 storm shelters are standard in schools and common in multifamily and commercial work; the Moore tornadoes made shelter design a permanent part of the Oklahoma City metro conversation. Below grade, the red-bed clays and shales of central Oklahoma swell aggressively, so drilled piers and post-tensioned slabs dominate foundation design. Oklahoma City's Development Services Department runs the state's largest plan review, with Tulsa's Development Services covering the northeast.\\n\\nPermitting follows the site, not the state. A project inside Oklahoma City goes through OKC Development Services with city amendments, while the same project in unincorporated Oklahoma County goes through county review with different submittal requirements. Tulsa's review runs through its own development services operation with local amendments layered on the state-adopted codes. Suburban cities — Edmond, Norman, Broken Arrow, Moore — each run independent plan check, and their shelter and wind-detail expectations reflect local tornado history. The engineer confirms the authority having jurisdiction and states the wind criteria, soil assumptions, and code edition on the drawings before the first submittal.",
    directAnswer: "Only an Oklahoma-licensed PE in responsible charge can stamp your building plans in Oklahoma. The state pairs severe tornado exposure with expansive red-bed clays, and OKC runs the largest plan review operation.",
    topic: "PE Stamping by State",
    serviceHref: "/services/structural/",
    sections: [
      {
        heading: "Oklahoma PE License Requirements for Stamping",
        body: "The Oklahoma State Board of Licensure for Professional Engineers and Land Surveyors licenses the individual engineer, and the seal is the individual's personal certification that they exercised responsible charge over the work. Oklahoma's rules define responsible charge as the direct control and supervision of the engineering decisions — not a courtesy review, not a rubber stamp. The seal must include the engineer's printed name, the Oklahoma license number, and the date of sealing on every sheet the engineer takes responsibility for, and electronic seals must meet the board's digital signature requirements.\\n\\nAn engineer licensed in another state has no authority to seal Oklahoma plans until the Oklahoma board issues a license, most commonly by comity for engineers with qualifying experience and examinations. Firms practicing in Oklahoma must operate under licensed engineers in responsible charge for each project. Apex Grid Engineering assigns an Oklahoma-licensed engineer of record to every Oklahoma project — the name and number on the seal belong to the engineer who directed the structural and design decisions, exactly as the board requires.",
      },
      {
        heading: "Tornado Exposure Meets Expansive Red-Bed Clays",
        body: "Oklahoma's wind design is among the most demanding in the country. High design wind speeds, tornado-borne debris regions, and a building stock repeatedly tested by real events mean reviewers scrutinize the lateral system, the continuous load path, and the connection details. Roof-to-wall and wall-to-foundation connections, hold-downs, and opening protection are detailed explicitly — generic notes do not survive Oklahoma plan check. Storm shelters designed to ICC 500 are standard in new schools and increasingly expected in multifamily, healthcare, and public assembly projects.\\n\\nThe soils are the other half of the Oklahoma story. Central Oklahoma's red-bed clays and shales are highly expansive, and the swell pressures they generate destroy conventional shallow foundations. Geotechnical reports with swell testing drive the foundation decision: drilled piers bearing below the active zone, post-tensioned slabs designed for the anticipated differential movement, or a combination of both. Your engineer should show the wind speed, exposure category, soil parameters, and foundation system on the drawings as one coherent story — Oklahoma reviewers in OKC and Tulsa expect the wind and soil narratives to match the details.",
      },
      {
        heading: "Oklahoma Plan Stamping Checklist",
        body: "Use this checklist before your Oklahoma permit set is sealed:\\n\\n• Engineer of record holds an active Oklahoma PE license verifiable on the board's roster\\n• Seal shows name, Oklahoma license number, and date on every sealed sheet\\n• Responsible charge is genuine: the sealing engineer directed the design decisions\\n• Wind speed, exposure category, and ASCE 7 edition stated on the structural drawings\\n• Continuous load path with specified hold-downs, straps, and anchor details\\n• ICC 500 storm shelter or safe-room provisions evaluated for the occupancy\\n• Geotechnical report addresses expansive red-bed clays with piers or post-tensioned slabs\\n• Authority having jurisdiction confirmed: OKC, Tulsa, suburb, or county review",
      },
    ],
    faqs: [
      {
        question: "Can an out-of-state engineer stamp my Oklahoma building plans?",
        answer: "No. Oklahoma requires an active Oklahoma license from the State Board of Licensure for Professional Engineers and Land Surveyors before sealing Oklahoma plans. Comity is the standard route for already-licensed engineers, and it takes processing time — build it into the schedule. Until licensure is issued, the compliant path is working under an Oklahoma-licensed engineer in responsible charge.",
      },
      {
        question: "Are storm shelters required in Oklahoma?",
        answer: "Oklahoma requires storm shelters or safe rooms in new public schools, and they are standard practice far beyond that — multifamily, healthcare, daycare, and public assembly projects routinely include ICC 500-compliant shelter areas, and many Oklahoma City-metro jurisdictions expect them. Your engineer evaluates the occupancy, the local amendments, and the site's tornado history, then designs the shelter for the required wind speed and debris-impact loads.",
      },
      {
        question: "What makes Oklahoma soils so difficult?",
        answer: "Central Oklahoma's red-bed clays and shales are among the most expansive soils in the country — they swell dramatically when wet and shrink when dry, generating pressures that crack slabs, heave foundations, and distort frames. Standard practice is a geotechnical investigation with swell testing followed by drilled piers below the active zone or a post-tensioned slab engineered for the expected differential movement.",
      },
      {
        question: "How long does plan review take in Oklahoma City?",
        answer: "It depends on project size, completeness, and queue volume. Complete commercial submittals in OKC often move through in several weeks, while complex or incomplete sets take longer. The most common delays are missing geotechnical reports, unstated wind design criteria, and shelter details that do not meet ICC 500. A complete set sealed by an Oklahoma-licensed engineer in responsible charge clears faster than anything else you can control.",
      },
    ],
    extraLinks: [
      { label: "How are expansive soil foundations designed?", href: "/answers/expansive-soil-foundation-solutions/" },
      { label: "How is wind load versus seismic load designed?", href: "/answers/wind-load-vs-seismic-load-design/" },
      { label: "How is someone else's drawings stamped?", href: "/answers/engineer-stamping-someone-elses-drawings/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "who-can-stamp-building-plans-new-mexico",
    title: "Which Licensed Engineer Can Stamp Building Plans in New Mexico?",
    description: "New Mexico requires a New Mexico-licensed PE in responsible charge to stamp plans. Learn adobe code rules, Albuquerque permitting, and high-desert timelines.",
    h1: "Which Licensed Engineer Can Stamp Building Plans in New Mexico?",
    answer: "The answer: Only a professional engineer licensed by the New Mexico Board of Licensure for Professional Engineers and Professional Surveyors who is in responsible charge of the work can legally stamp your building plans in New Mexico. The seal certifies the engineer personally directed the design, and it must show the engineer's name, New Mexico license number, and the date of sealing.\\n\\nNew Mexico's stamping rule centers on responsible charge — the sealing engineer must have exercised direct supervision and control over the engineering decisions, from the structural system to the design criteria to the calculations. Out-of-state engineers need a New Mexico license by comity before sealing New Mexico drawings. Apex Grid Engineering assigns a New Mexico-licensed PE as engineer of record on every New Mexico project, so the stamp always belongs to the engineer who controlled the design.\\n\\nNew Mexico is the only state in this series with a dedicated earthen-building code: the New Mexico Earthen Building Materials Code governs adobe, rammed earth, and compressed-earth-block construction, and it shapes projects from Santa Fe residences to commercial buildings seeking a regional identity. Albuquerque's Planning Department runs the state's largest plan review, while Santa Fe layers historic-district and design review over standard building permits — the city's Historic Districts Review Board scrutinizes anything visible in the historic districts. High-desert conditions drive the rest: intense sun, large day-night temperature swings, low seismic demand, and water scarcity that makes drainage and grading design a first-order concern.\\n\\nPermitting follows the site, not the state. A project inside Albuquerque goes through the city's Planning Department with local amendments, while the same project in unincorporated Bernalillo County goes through county review with different checklists and well, septic, and drainage considerations that the city never sees. In Santa Fe, city review adds historic and design overlays that can extend the timeline well beyond standard plan check. Las Cruces and the southern jurisdictions run their own smaller reviews. The engineer confirms the authority having jurisdiction, the applicable earthen-building provisions where relevant, and the adopted code edition before the first sheet is drawn.",
    directAnswer: "Only a New Mexico-licensed PE in responsible charge can stamp your building plans in New Mexico. The state's earthen-building code and Santa Fe's historic review make it unique, with Albuquerque running the largest permitting operation.",
    topic: "PE Stamping by State",
    serviceHref: "/services/structural/",
    sections: [
      {
        heading: "New Mexico PE License Requirements for Stamping",
        body: "The New Mexico Board of Licensure for Professional Engineers and Professional Surveyors licenses the individual engineer, and only an engineer in responsible charge may seal New Mexico drawings. Responsible charge means the engineer directed the work: selected the structural system, established the design criteria — including the earthen-building provisions where adobe or rammed earth is used — and supervised the calculations. The seal must show the engineer's printed name, the New Mexico license number, and the date of sealing on each sheet the engineer takes responsibility for.\\n\\nEngineers licensed in other states must obtain a New Mexico license by comity before stamping New Mexico plans. Firms practicing in New Mexico designate licensed engineers in responsible charge for each project and discipline. Apex Grid Engineering assigns a New Mexico-licensed engineer of record to every New Mexico project, so the responsible-charge chain is genuine — the engineer whose seal appears on your plans is the engineer who made the project-specific technical decisions, including any adobe or high-desert detailing.",
      },
      {
        heading: "Adobe Codes, Santa Fe Review, and High-Desert Design",
        body: "The New Mexico Earthen Building Materials Code is the state's signature provision: it sets structural, moisture-protection, and detailing requirements for adobe, rammed earth, and compressed earth block. Earthen walls need proper stem-wall separation from grade, bond beams or equivalent at the top of walls, and roof connections that account for the material's low tensile strength — details a conventional wood-frame engineer may never have drawn. Even on non-earthen projects, the regional style often calls for parapets, vigas, and stucco systems that need engineering for wind, drainage, and thermal movement.\\n\\nSanta Fe adds a second layer: the Historic Districts Review Board and design review overlays govern massing, materials, and anything visible from the public way in the historic districts, and that review runs alongside — sometimes ahead of — building plan check. Albuquerque's review is larger in volume and more conventional, but water is the quiet driver everywhere: scarce supply, expansive soils in pockets of the metro, and intense monsoon cloudbursts make grading, drainage, and foundation moisture protection central to the civil and structural sets. Seismic demand is low across most of the state, which simplifies the lateral story but never excuses it.",
      },
      {
        heading: "New Mexico Plan Stamping Checklist",
        body: "Use this checklist before your New Mexico permit set is sealed:\\n\\n• Engineer of record holds an active New Mexico PE license verifiable on the board's roster\\n• Seal shows name, New Mexico license number, and date on every sealed sheet\\n• Responsible charge is genuine: the sealing engineer directed the design decisions\\n• Earthen construction complies with the NM Earthen Building Materials Code where applicable\\n• Santa Fe projects: historic district and design review clearances sequenced with plan check\\n• Grading and drainage design addresses monsoon cloudbursts and soil moisture protection\\n• Wind and thermal-movement detailing shown for parapets, stucco, and roof systems\\n• Authority having jurisdiction confirmed: city planning or county review with local amendments",
      },
    ],
    faqs: [
      {
        question: "Can an out-of-state engineer stamp my New Mexico building plans?",
        answer: "No. New Mexico requires an active New Mexico license from the Board of Licensure for Professional Engineers and Professional Surveyors before an engineer may seal New Mexico plans. Comity is the standard path for already-licensed engineers. Until licensure is issued, the compliant route is working under a New Mexico-licensed engineer in responsible charge.",
      },
      {
        question: "Does New Mexico really have a separate code for adobe buildings?",
        answer: "Yes. The New Mexico Earthen Building Materials Code is a state-adopted code covering adobe, rammed earth, and compressed earth block — wall thickness, moisture protection, bond beams, and structural limitations. It applies whether the project is a Santa Fe residence or a commercial building using earthen walls as a design feature. Your engineer designs and details to that code, not just the IBC.",
      },
      {
        question: "Why does Santa Fe permitting take longer?",
        answer: "Because design review runs in parallel with building plan check. The Historic Districts Review Board evaluates massing, materials, colors, and visibility from public ways in the historic districts, and projects often go through multiple review rounds before the building permit set is even finalized. Starting the historic and design review early — with an engineer who understands both tracks — is the main schedule lever.",
      },
      {
        question: "Is seismic design a concern in New Mexico?",
        answer: "Seismic demand is low across most of New Mexico compared to the West Coast, so wind typically governs the lateral design. That said, the code still requires a complete lateral system with a defined load path, and certain occupancies and sites carry higher seismic design categories. Your engineer runs the seismic checks regardless — low demand is not the same as no demand.",
      },
    ],
    extraLinks: [
      { label: "How are energy code compliance paths explained?", href: "/answers/energy-code-compliance-paths-explained/" },
      { label: "How are ADU plans PE-stamped?", href: "/answers/pe-stamp-adu-plans/" },
      { label: "How is the plan check corrections process explained?", href: "/answers/plan-check-corrections-process-explained/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "who-can-stamp-building-plans-montana",
    title: "Which Licensed Engineer Can Stamp My Building Plans in Montana?",
    description: "Montana requires a Montana-licensed PE in responsible charge to stamp plans. Learn snow-load design, flexible firm rules, Billings permitting, and timelines.",
    h1: "Which Licensed Engineer Can Stamp My Building Plans in Montana?",
    answer: "The answer: Only a professional engineer licensed by the Montana Board of Professional Engineers and Professional Land Surveyors who is in responsible charge of the work can legally stamp your building plans in Montana. The seal certifies the engineer personally directed the design, and it must show the engineer's name, Montana license number, and the date of sealing.\\n\\nMontana is unusually flexible on the firm side: the state does not issue certificates of authorization to engineering firms and does not require the business entity to be owned by a licensed engineer. The license requirement attaches to the individual — the Montana-licensed PE in responsible charge of each project. Out-of-state engineers still need a Montana license by comity before sealing Montana drawings; the flexible firm rules change nothing about who may stamp. Apex Grid Engineering assigns a Montana-licensed PE as engineer of record on every Montana project, so the stamp always belongs to the engineer who controlled the design.\\n\\nMontana's structural story is written in snow. Ground snow loads run high across the state and climb steeply with elevation — mountain sites near Bozeman, Missoula, and the resort corridors can see loads several times those of the eastern plains, and drifting, sliding snow, and unbalanced loads govern roof design. Billings, the state's largest city, anchors the eastern plains with more moderate snow but real wind exposure. Missoula and Bozeman sit in mountain valleys where snow, freeze-thaw, and hillside geotechnical conditions combine. Billings' Building Division and the Missoula and Bozeman review offices each run their own plan check under the state-adopted codes.\\n\\nPermitting follows the site, not the state. A project inside Billings goes through the city's Building Division, while the same project in unincorporated Yellowstone County goes through county review with different submittal expectations. In the mountain counties, county review often adds steep-slope, wildfire-interface, and septic constraints that city projects never face. Rural Montana counties vary enormously in review staffing — some run full plan check, others rely heavily on the sealed drawings themselves. The engineer confirms the authority having jurisdiction, the site-specific snow load, and the adopted code edition before the first sheet is drawn.",
    directAnswer: "Only a Montana-licensed PE in responsible charge can stamp your building plans in Montana. Heavy snow loads drive the structural design, and the state is unusually flexible about firm ownership — the license requirement sits with the individual engineer.",
    topic: "PE Stamping by State",
    serviceHref: "/services/structural/",
    sections: [
      {
        heading: "Montana PE License Requirements for Stamping",
        body: "The Montana Board of Professional Engineers and Professional Land Surveyors licenses the individual engineer, and the seal on Montana drawings is that individual's certification of responsible charge. Responsible charge means the engineer directed the engineering decisions — the structural system, the snow and wind criteria, the foundation design — and supervised the calculations. Montana's distinctive feature is what it does not require: no certificate of authorization for firms, and no mandate that a licensed engineer own the business entity. That flexibility lowers the barrier for firms to practice in Montana, but it changes nothing about stamping — only a Montana-licensed PE in responsible charge may seal the drawings.\\n\\nOut-of-state engineers must obtain Montana licensure by comity before sealing Montana plans. The seal must display the engineer's name, the Montana license number, and the date of sealing on each sheet the engineer takes responsibility for. Apex Grid Engineering assigns a Montana-licensed engineer of record to every Montana project — the flexible firm rules make it straightforward to serve Montana clients, and the responsible-charge requirement means the engineer who seals your plans is the engineer who ran the snow, wind, and foundation design.",
      },
      {
        heading: "Snow Loads, Mountain Sites, and the Billings Corridor",
        body: "Snow is the controlling load across most of Montana. Ground snow loads vary dramatically with elevation and microclimate — a valley site and a mountainside site a few miles apart can have entirely different design loads — so site-specific snow load determination is the first structural task, not an afterthought. Roof design must address balanced, unbalanced, drift, and sliding snow loads, and the details that fail in Montana are the ones that ignore drifting at parapets, valleys, and lower roofs adjacent to higher ones. Freeze-thaw cycles punish foundations and exterior detailing, and frost depth drives footing depths statewide.\\n\\nBillings anchors the eastern side with the state's largest plan review volume and comparatively moderate snow, while Missoula and Bozeman sit in mountain valleys where snow, slope stability, and wildfire-interface requirements layer onto the structural work. Resort and mountain-county projects add steep-slope geotechnical review and access constraints that shape both design and construction. Your engineer should state the site-specific ground snow load, the drift assumptions, and the frost-depth basis on the drawings — Montana reviewers check those numbers first.",
      },
      {
        heading: "Montana Plan Stamping Checklist",
        body: "Use this checklist before your Montana permit set is sealed:\\n\\n• Engineer of record holds an active Montana PE license verifiable on the board's roster\\n• Seal shows name, Montana license number, and date on every sealed sheet\\n• Responsible charge is genuine: the sealing engineer directed the design decisions\\n• Site-specific ground snow load stated with drift and unbalanced load cases\\n• Footing depths meet or exceed local frost depth requirements\\n• Mountain and hillside sites: geotechnical review for slope stability and drainage\\n• Wildfire-interface provisions evaluated where the jurisdiction requires them\\n• Authority having jurisdiction confirmed: city building division or county review",
      },
    ],
    faqs: [
      {
        question: "Can an out-of-state engineer stamp my Montana building plans?",
        answer: "No. Montana requires an active Montana license from the Board of Professional Engineers and Professional Land Surveyors before an engineer may seal Montana plans, typically obtained by comity. Montana's flexible firm rules — no certificate of authorization, no PE-ownership requirement — do not waive the individual licensing requirement for the stamping engineer.",
      },
      {
        question: "Does my engineering firm need to be owned by a PE to work in Montana?",
        answer: "No. Montana does not require engineering firms to hold a certificate of authorization and does not require the business to be owned by a licensed engineer. The state's requirement attaches to the individual: a Montana-licensed PE must be in responsible charge of the engineering work and must apply the seal. Firm ownership structure is not the board's concern; responsible charge is.",
      },
      {
        question: "How are Montana snow loads determined?",
        answer: "From the site, not a statewide table alone. Ground snow loads in Montana vary sharply with elevation, terrain, and local microclimate, and the code requires site-specific values — often from the local jurisdiction's adopted snow load map or a case study for high-elevation sites. The engineer then designs for balanced, unbalanced, drift, and sliding snow cases. Using a valley number on a mountainside site is one of the most common and dangerous errors.",
      },
      {
        question: "How long does plan review take in Billings?",
        answer: "Timelines depend on project complexity and completeness. Straightforward commercial submittals in Billings often clear in a few weeks when the structural set is complete — stated snow loads, drift cases, frost-depth footings, and a coordinated foundation design. Mountain-county reviews can run longer when geotechnical, wildfire-interface, or steep-slope reviews layer onto the building permit.",
      },
    ],
    extraLinks: [
      { label: "How does an MEP engineer differ from a mechanical engineer?", href: "/answers/mep-engineer-vs-mechanical-engineer/" },
      { label: "How is commercial EV charging designed?", href: "/answers/commercial-ev-charging-design/" },
      { label: "How much does a PE stamp cost for house plans?", href: "/answers/pe-stamp-cost-for-house-plans/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "who-can-stamp-building-plans-idaho",
    title: "Which Licensed Engineer Can Stamp My Building Plans in Idaho?",
    description: "Idaho requires an Idaho-licensed PE in responsible charge to stamp plans. Learn seismic and snow rules, Boise's growth-driven permitting, and timelines.",
    h1: "Which Licensed Engineer Can Stamp My Building Plans in Idaho?",
    answer: "The answer: Only a professional engineer licensed by the Idaho Board of Professional Engineers and Professional Land Surveyors who is in responsible charge of the work can legally stamp your building plans in Idaho. The seal certifies the engineer personally directed the design, and it must show the engineer's name, Idaho license number, and the date of sealing.\\n\\nIdaho's stamping rule centers on responsible charge — the sealing engineer must have exercised direct supervision and control over the engineering decisions, from the lateral system to the foundation design to the calculations. Out-of-state engineers need an Idaho license by comity before sealing Idaho drawings. Apex Grid Engineering assigns an Idaho-licensed PE as engineer of record on every Idaho project, so the stamp always belongs to the engineer who controlled the design.\\n\\nIdaho presents two structural personalities in one state. The Boise metro — the state's growth engine — deals with moderate seismic demand, expansive soils in parts of the Treasure Valley, and a permitting operation straining under rapid growth: Boise's Planning and Development Services runs design review, impact fees, and plan check for a city adding population fast. Eastern Idaho is the other personality: Idaho Falls and the upper Snake River plain sit near the Intermountain Seismic Belt, where seismic design categories climb and the lateral design gets serious. Mountain resort areas add heavy snow loads on top. The engineer must know which Idaho the site sits in — the seismic and snow numbers change completely across the state.\\n\\nPermitting follows the site, not the state. A project inside Boise goes through the city's Planning and Development Services with design review overlays in key districts, while the same project in unincorporated Ada County goes through county development services with different checklists. Idaho Falls runs its own building department review, and the resort counties — Blaine, Teton, Valley — layer hillside, avalanche, and wildfire-interface reviews onto standard plan check. The engineer confirms the authority having jurisdiction, the site-specific seismic design category, and the snow load before the first sheet is drawn.",
    directAnswer: "Only an Idaho-licensed PE in responsible charge can stamp your building plans in Idaho. Boise's growth drives the busiest permitting, while eastern Idaho's seismic belt and mountain snow demand serious structural engineering.",
    topic: "PE Stamping by State",
    serviceHref: "/services/structural/",
    sections: [
      {
        heading: "Idaho PE License Requirements for Stamping",
        body: "The Idaho Board of Professional Engineers and Professional Land Surveyors licenses the individual engineer, and only an engineer in responsible charge may apply a seal to Idaho drawings. Responsible charge means the engineer controlled the engineering: established the seismic design category, set the snow and wind criteria, directed the foundation design, and supervised the calculations. The seal must display the engineer's printed name, the Idaho license number, and the date of sealing on each sheet the engineer takes responsibility for. A seal from an engineer who did not direct the work violates the board's rules regardless of how qualified that engineer is elsewhere.\\n\\nEngineers licensed in other states must obtain an Idaho license by comity before stamping Idaho plans. Firms practicing in Idaho operate under licensed engineers in responsible charge for each project and discipline. Apex Grid Engineering assigns an Idaho-licensed engineer of record to every Idaho project — the person whose seal appears on your drawings is the person who evaluated the site's seismic category, snow load, and soils and directed the design accordingly.",
      },
      {
        heading: "Boise Growth, Eastern Idaho Seismic, and Mountain Snow",
        body: "The Boise metro is Idaho's permitting pressure point: rapid population growth has filled the review queues at Boise's Planning and Development Services, and complete, well-coordinated submittals move while incomplete ones stall. Design review overlays in downtown and key corridors add an entitlement-style layer to the building permit. Structurally, the Treasure Valley brings moderate seismic demand and pockets of expansive and collapsible soils that the geotechnical report must characterize — the foundation design follows the soils report, not a default.\\n\\nEastern Idaho is a different engineering regime. Idaho Falls, Rexburg, and the upper Snake River plain sit close enough to the Intermountain Seismic Belt and the Yellowstone region that seismic design categories rise and the lateral-force design becomes the controlling structural story — diaphragm detailing, collector design, and foundation ties get full attention. The mountain resort counties add heavy snow: site-specific ground snow loads, drift, and sliding snow govern roof structures. Your engineer should state the seismic design category, the site-specific snow load, and the soil assumptions on the drawings — Idaho reviewers from Boise to Idaho Falls check those three numbers first.",
      },
      {
        heading: "Idaho Plan Stamping Checklist",
        body: "Use this checklist before your Idaho permit set is sealed:\\n\\n• Engineer of record holds an active Idaho PE license verifiable on the board's roster\\n• Seal shows name, Idaho license number, and date on every sealed sheet\\n• Responsible charge is genuine: the sealing engineer directed the design decisions\\n• Seismic design category determined for the site and stated on the structural drawings\\n• Site-specific ground snow load with drift and unbalanced cases where applicable\\n• Geotechnical report addresses expansive or collapsible soils with a matching foundation\\n• Boise projects: design review overlays and impact-fee obligations confirmed early\\n• Authority having jurisdiction confirmed: city building department or county development services",
      },
    ],
    faqs: [
      {
        question: "Can an out-of-state engineer stamp my Idaho building plans?",
        answer: "No. Idaho requires an active Idaho license from the Board of Professional Engineers and Professional Land Surveyors before an engineer may seal Idaho plans. Comity licensure is the standard path for already-licensed engineers. Until the Idaho license issues, the compliant route is working under an Idaho-licensed engineer in responsible charge.",
      },
      {
        question: "Is seismic design really required in Idaho?",
        answer: "Yes — and the demand varies enormously by location. Eastern Idaho near the Intermountain Seismic Belt carries meaningful seismic design categories that control the lateral design, while the Boise area has moderate demand. The code requires the engineer to determine the site-specific seismic design category and design the lateral system, diaphragms, and foundation ties accordingly. Skipping that determination is not an option anywhere in the state.",
      },
      {
        question: "What slows down Boise plan review the most?",
        answer: "Growth. Boise's review queues are heavy because the city is growing fast, so incomplete submittals get pushed behind complete ones. The biggest avoidable delays are missing geotechnical reports, unstated seismic categories and snow loads, and design-review overlay issues discovered late. A complete, coordinated set sealed by an Idaho-licensed engineer moves fastest.",
      },
      {
        question: "Do Idaho resort areas have special requirements?",
        answer: "Often, yes. Mountain counties like Blaine, Teton, and Valley layer hillside development standards, avalanche and wildfire-interface reviews, and stringent snow-load requirements onto standard building plan check. Septic, access, and grading constraints can shape the structural and civil design as much as the building code does. Your engineer confirms every applicable review track before starting design.",
      },
    ],
    extraLinks: [
      { label: "How are seismic design categories explained?", href: "/answers/seismic-design-categories-explained/" },
      { label: "How is surge protection designed for commercial buildings?", href: "/answers/surge-protection-commercial-buildings/" },
      { label: "How is drilled pier design done?", href: "/answers/drilled-pier-design/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "who-can-stamp-building-plans-wyoming",
    title: "Which Licensed Engineer Can Stamp My Building Plans in Wyoming?",
    description: "Wyoming requires a Wyoming-licensed PE in responsible charge to stamp plans. Learn extreme-wind design, Cheyenne permitting, rural code gaps, and timelines.",
    h1: "Which Licensed Engineer Can Stamp My Building Plans in Wyoming?",
    answer: "The answer: Only a professional engineer licensed by the Wyoming Board of Professional Engineers and Professional Land Surveyors who is in responsible charge of the work can legally stamp your building plans in Wyoming. The seal certifies the engineer personally directed the design, and it must show the engineer's name, Wyoming license number, and the date of sealing.\\n\\nWyoming's stamping rule centers on responsible charge — the sealing engineer must have exercised direct supervision and control over the engineering decisions, from the lateral system to the foundation design. Out-of-state engineers need a Wyoming license by comity before sealing Wyoming drawings. Apex Grid Engineering assigns a Wyoming-licensed PE as engineer of record on every Wyoming project, so the stamp always belongs to the engineer who controlled the design.\\n\\nWyoming is a wind state first and everything else second. Cheyenne ranks among the windiest cities in America, and design wind speeds across the high plains run high — the lateral design, the building envelope, and the roof system all answer to the wind before anything else. Snow loads are real but secondary to wind across much of the state, and deep frost depths drive footing design. Cheyenne's Community Development Department and Casper's Building Division run the two largest plan reviews; both work under locally adopted codes, because Wyoming has no single statewide building code — adoption happens jurisdiction by jurisdiction.\\n\\nPermitting follows the site, and in Wyoming the site may have no building department at all. Many rural Wyoming counties have limited or no building code enforcement, which means a project outside city limits can face county planning review with no structural plan check — or no review whatsoever. That does not remove the engineering obligation: lenders, insurers, and owners still need code-compliant, sealed drawings, and the engineer designs to the applicable IBC edition regardless. The engineer confirms the authority having jurisdiction — city, county, or none — states the wind speed, exposure, and frost-depth basis on the drawings, and builds a set that stands on its own engineering merit wherever it is reviewed.",
    directAnswer: "Only a Wyoming-licensed PE in responsible charge can stamp your building plans in Wyoming. Extreme high-plains wind governs the design, and rural counties may have no building department — the sealed set must stand on its own.",
    topic: "PE Stamping by State",
    serviceHref: "/services/structural/",
    sections: [
      {
        heading: "Wyoming PE License Requirements for Stamping",
        body: "The Wyoming Board of Professional Engineers and Professional Land Surveyors licenses the individual engineer, and only an engineer in responsible charge may seal Wyoming drawings. Responsible charge means the engineer directed the engineering decisions — the wind-governed lateral system, the envelope detailing, the foundation below frost depth — and supervised the calculations. The seal must show the engineer's printed name, the Wyoming license number, and the date of sealing on each sheet the engineer takes responsibility for. An engineer licensed elsewhere has no stamping authority in Wyoming until the Wyoming board issues a license, most commonly by comity.\\n\\nFirms practicing in Wyoming operate under licensed engineers in responsible charge for each project. Apex Grid Engineering assigns a Wyoming-licensed engineer of record to every Wyoming project — the seal on your plans belongs to the engineer who evaluated the site's wind exposure, snow load, and frost depth and directed the design. In counties with no plan review, that responsible-charge chain matters even more: the sealed drawings are the primary assurance the building is code-compliant.",
      },
      {
        heading: "High-Plains Wind, Frost Depth, and the Rural Code Gap",
        body: "Wind dominates Wyoming structural design. The high plains deliver sustained high winds and gusts that punish under-detailed envelopes: the design wind speed, exposure category, and the continuous load path from roof to foundation must be explicit on the drawings, and cladding, roofing, and parapet details need engineering for wind pressures and fatigue, not just gravity. Snow loads matter — particularly at elevation and in the western mountains — but across the Cheyenne and Casper corridors, wind is the load case that sizes members and connections. Frost depth runs deep, so footings go deep, and freeze-thaw detailing protects everything at grade.\\n\\nThe rural code gap is Wyoming's permitting quirk. Because the state leaves code adoption to local jurisdictions, many counties outside the cities have no building department and no structural plan check. Owners sometimes read that as permission to build without engineering — it is not. Lenders and insurers still require code-compliant design, and the liability for a wind failure lands on the owner and the designer regardless of whether a reviewer looked at the plans. Your engineer designs to the current IBC, states every design criterion on the drawings, and seals a set that is complete whether or not a plan reviewer ever sees it.",
      },
      {
        heading: "Wyoming Plan Stamping Checklist",
        body: "Use this checklist before your Wyoming permit set is sealed:\\n\\n• Engineer of record holds an active Wyoming PE license verifiable on the board's roster\\n• Seal shows name, Wyoming license number, and date on every sealed sheet\\n• Responsible charge is genuine: the sealing engineer directed the design decisions\\n• Design wind speed, exposure category, and ASCE 7 edition stated on the structural drawings\\n• Continuous load path and wind-rated envelope, cladding, and roofing details shown\\n• Footing depths meet or exceed local frost depth; freeze-thaw detailing at grade\\n• Snow load addressed for the site elevation, with drift cases where applicable\\n• Authority having jurisdiction confirmed — including the possibility of no local building review",
      },
    ],
    faqs: [
      {
        question: "Can an out-of-state engineer stamp my Wyoming building plans?",
        answer: "No. Wyoming requires an active Wyoming license from the Board of Professional Engineers and Professional Land Surveyors before an engineer may seal Wyoming plans. Comity is the standard path for already-licensed engineers. Until licensure issues, the compliant route is working under a Wyoming-licensed engineer in responsible charge.",
      },
      {
        question: "Do I need engineered plans if my Wyoming county has no building department?",
        answer: "In practice, yes. The absence of a local plan reviewer does not waive the building code, and lenders, insurers, and future buyers all expect code-compliant, professionally designed buildings. More importantly, Wyoming's wind loads punish under-designed structures whether or not anyone reviewed the drawings. Sealed, engineered plans are the protection — for the building and for your liability.",
      },
      {
        question: "Why is wind such a big deal in Wyoming?",
        answer: "Wyoming's high plains produce some of the highest sustained winds and gusts in the country — Cheyenne is famously among America's windiest cities. High design wind speeds drive the lateral system, the roof and cladding design, and every connection in the load path. Buildings designed for gravity loads alone, or detailed with generic connections, are the ones that fail in Wyoming wind events.",
      },
      {
        question: "How long does plan review take in Cheyenne or Casper?",
        answer: "Both cities run professional review operations, and complete commercial submittals typically move through in several weeks. The usual delays are unstated wind design criteria, missing geotechnical information for the foundation, and envelope details that do not address the wind pressures. A complete set sealed by a Wyoming-licensed engineer is the fastest path through either city.",
      },
    ],
    extraLinks: [
      { label: "How is wind load versus seismic load designed?", href: "/answers/wind-load-vs-seismic-load-design/" },
      { label: "How is self-storage drainage designed?", href: "/answers/self-storage-drainage-design/" },
      { label: "How are energy code compliance paths explained?", href: "/answers/energy-code-compliance-paths-explained/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "who-can-stamp-building-plans-oregon",
    title: "Which Licensed Engineer Can Stamp My Building Plans in Oregon?",
    description: "Oregon requires an Oregon-licensed PE in responsible charge to stamp plans. Learn Cascadia seismic rules, Portland permitting, and landslide review timelines.",
    h1: "Which Licensed Engineer Can Stamp My Building Plans in Oregon?",
    answer: "The answer: Only a professional engineer licensed by the Oregon State Board of Examiners for Engineering and Land Surveying (OSBEELS) who is in responsible charge of the work can legally stamp your building plans in Oregon. The seal certifies the engineer personally directed the design, and it must show the engineer's name, Oregon license number, and the date of sealing.\\n\\nOregon's stamping rule centers on responsible charge — the sealing engineer must have exercised direct supervision and control over the engineering decisions, from the seismic lateral system to the foundation design. Out-of-state engineers need an Oregon license by comity before sealing Oregon drawings. Apex Grid Engineering assigns an Oregon-licensed PE as engineer of record on every Oregon project, so the stamp always belongs to the engineer who controlled the design.\\n\\nOregon is defined by the Cascadia subduction zone: the entire state faces significant seismic hazard, and seismic design categories run high across the Willamette Valley and the coast. Portland's Bureau of Development Services runs the state's largest and most demanding plan review, with seismic detailing, hillside geotechnical review, and stormwater management all in the standard package. Portland's unreinforced masonry seismic retrofit program has made seismic evaluation and retrofit a standing part of the existing-building conversation. Relentless rain shapes the rest — landslide hazards on the West Hills, saturated hillside soils, and envelope detailing that must manage water for eight months a year. Salem and Eugene run smaller but equally seismic-aware reviews.\\n\\nPermitting follows the site, not the state. A project inside Portland goes through the Bureau of Development Services with landslide hazard, environmental, and design review overlays in many areas, while the same project in unincorporated Washington or Clackamas County goes through county land-use and building review with different checklists. Hillside sites trigger geotechnical review tracks that run alongside structural plan check. The engineer confirms the authority having jurisdiction, determines the site-specific seismic design category and landslide hazard zone, and states them on the drawings before the first submittal.",
    directAnswer: "Only an Oregon-licensed PE in responsible charge can stamp your building plans in Oregon. Cascadia seismic hazard controls the structural design, Portland runs the state's most demanding review, and rain-driven landslide risk shapes hillside sites.",
    topic: "PE Stamping by State",
    serviceHref: "/services/structural/",
    sections: [
      {
        heading: "Oregon PE License Requirements for Stamping",
        body: "The Oregon State Board of Examiners for Engineering and Land Surveying — OSBEELS — licenses the individual engineer, and only an engineer in responsible charge may seal Oregon drawings. Responsible charge means the engineer directed the engineering decisions: the seismic lateral system, the diaphragm and collector design, the hillside foundation approach, and the calculations behind them. The seal must display the engineer's name, the Oregon license number, and the date of sealing on each sheet the engineer takes responsibility for. Oregon does not license a separate structural engineer category the way California does — the PE seal covers structural work when the engineer is competent and in responsible charge of it.\\n\\nEngineers licensed in other states must obtain an Oregon license by comity before stamping Oregon plans. Firms practicing in Oregon operate under licensed engineers in responsible charge for each project and discipline. Apex Grid Engineering assigns an Oregon-licensed engineer of record to every Oregon project — the seal on your plans belongs to the engineer who evaluated the site's seismic category, landslide hazard, and soils and directed the design accordingly.",
      },
      {
        heading: "Cascadia Seismic, Portland Review, and Rain-Driven Landslides",
        body: "The Cascadia subduction zone gives Oregon one of the highest seismic hazards in the country: a magnitude-9-capable fault offshore means the code demands robust seismic design statewide, with high seismic design categories across the population centers. The lateral system — shear walls, moment frames, or braced frames — must be detailed for ductility, diaphragms and collectors must deliver forces to the system, and foundations must address liquefaction and lateral spreading where the geotechnical report identifies them. Portland's URM retrofit mandates have normalized seismic evaluation of existing buildings, so retrofit and alteration projects start with an ASCE 41-style assessment, not a guess.\\n\\nRain is the second Oregon signature. Eight months of wet weather saturate hillside soils, and the West Hills and other slide-prone areas carry mapped landslide hazard zones that trigger geotechnical review tracks alongside building plan check. Retaining walls, hillside foundations, and drainage systems are engineered as a package — water management is structural in Oregon, because saturated soil behind a wall or under a footing changes the loads. Envelope detailing must shed water relentlessly: reviewers see the failures when it does not. Your engineer should state the seismic design category, the landslide hazard determination, and the stormwater approach on the drawings as one coordinated story.",
      },
      {
        heading: "Oregon Plan Stamping Checklist",
        body: "Use this checklist before your Oregon permit set is sealed:\\n\\n• Engineer of record holds an active Oregon PE license verifiable on the OSBEELS roster\\n• Seal shows name, Oregon license number, and date on every sealed sheet\\n• Responsible charge is genuine: the sealing engineer directed the design decisions\\n• Seismic design category determined for the site and stated on the structural drawings\\n• Ductile seismic detailing, diaphragm, and collector design shown and calculated\\n• Landslide hazard zone checked; geotechnical review completed for hillside sites\\n• Stormwater management and hillside drainage engineered with the foundation\\n• Authority having jurisdiction confirmed: Portland BDS, suburb, or county review with overlays",
      },
    ],
    faqs: [
      {
        question: "Can an out-of-state engineer stamp my Oregon building plans?",
        answer: "No. Oregon requires an active Oregon license from OSBEELS before an engineer may seal Oregon plans. Comity is the standard path for already-licensed engineers. Until the Oregon license issues, the compliant route is working under an Oregon-licensed engineer in responsible charge — which is how Apex staffs Oregon projects.",
      },
      {
        question: "Does Oregon require a separate structural engineer license?",
        answer: "No. Unlike California, Oregon does not issue a separate Structural Engineer license — the PE license covers structural engineering when the engineer is competent in the work and in responsible charge of it. For complex seismic design, owners should still confirm the assigned engineer has real seismic-design experience, because Cascadia-level detailing is unforgiving of inexperience.",
      },
      {
        question: "What is Portland's URM seismic retrofit requirement?",
        answer: "Portland has mandated seismic evaluation and phased retrofit of unreinforced masonry buildings, one of the building types most vulnerable in an earthquake. Owners of URM buildings face evaluation deadlines and retrofit triggers tied to alterations and occupancy. Any work on a URM building starts with a seismic assessment by a licensed engineer, and the retrofit design must meet the city's adopted standards.",
      },
      {
        question: "Why do Oregon hillside projects need geotechnical review?",
        answer: "Because saturated slopes move. Oregon's mapped landslide hazard zones — including Portland's West Hills — identify areas where the combination of steep slopes, weak soils, and eight months of rain creates real slide risk. Building in these zones triggers geotechnical investigation and review alongside structural plan check, and the foundation, retaining, and drainage designs must work as one system against the slope's demands.",
      },
    ],
    extraLinks: [
      { label: "How are seismic design categories explained?", href: "/answers/seismic-design-categories-explained/" },
      { label: "How does an MEP engineer differ from a mechanical engineer?", href: "/answers/mep-engineer-vs-mechanical-engineer/" },
      { label: "How are hurricane retrofits designed for existing buildings?", href: "/answers/hurricane-retrofit-existing-buildings/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "who-can-stamp-building-plans-hawaii",
    title: "Which Licensed Engineer Can Stamp My Building Plans in Hawaii?",
    description: "Hawaii requires a Hawaii-licensed PE in responsible charge to stamp plans. Learn hurricane and volcanic-soil rules, Honolulu permitting, and timelines.",
    h1: "Which Licensed Engineer Can Stamp My Building Plans in Hawaii?",
    answer: "The answer: Only a professional engineer licensed by the Hawaii Board of Professional Engineers, Architects, Surveyors and Landscape Architects (under the Department of Commerce and Consumer Affairs) who is in responsible charge of the work can legally stamp your building plans in Hawaii. The seal certifies the engineer personally directed the design, and it must show the engineer's name, Hawaii license number, and the date of sealing.\\n\\nHawaii's stamping rule centers on responsible charge — the sealing engineer must have exercised direct supervision and control over the engineering decisions, from the hurricane lateral system to the foundation design. Out-of-state engineers need a Hawaii license by comity before sealing Hawaii drawings. Apex Grid Engineering assigns a Hawaii-licensed PE as engineer of record on every Hawaii project, so the stamp always belongs to the engineer who controlled the design.\\n\\nHawaii is the most logistically demanding state in this series. Hurricanes set the structural agenda: high design wind speeds, coastal Exposure D conditions, wind-borne debris regions, and opening protection are standard — the building envelope is engineered as a pressure-resisting system, not just a weather barrier. Volcanic soils add the geotechnical twist: expansive clays in many developed areas, hard lava rock that makes excavation brutal, and corrosive salt air that punishes unprotected steel and under-detailed concrete. Everything arrives by ship, so material lead times, limited local engineering capacity, and contractor availability shape project planning as much as the code does. Honolulu's Department of Planning and Permitting (DPP) runs the state's largest review under the Hawaii State Building Code.\\n\\nPermitting follows the site, and on Oahu the site is always the City and County of Honolulu — one consolidated government covers the entire island, so Honolulu DPP handles everything from downtown high-rises to North Shore additions. The neighbor islands run their own county building departments: Hawaii County, Maui County, and Kauai County each review under the state code with local amendments and, on the Big Island, lava-zone and volcanic-hazard considerations that appear nowhere else in American permitting. The engineer confirms the island, the county department, the exposure category, and the soils conditions before the first sheet is drawn — and builds the schedule around shipping lead times, not just the review queue.",
    directAnswer: "Only a Hawaii-licensed PE in responsible charge can stamp your building plans in Hawaii. Hurricane wind design and volcanic soils control the engineering, Honolulu DPP covers all of Oahu, and island logistics shape every schedule.",
    topic: "PE Stamping by State",
    serviceHref: "/services/structural/",
    sections: [
      {
        heading: "Hawaii PE License Requirements for Stamping",
        body: "The Hawaii Board of Professional Engineers, Architects, Surveyors and Landscape Architects — operating under the Department of Commerce and Consumer Affairs (DCCA) — licenses the individual engineer, and only an engineer in responsible charge may seal Hawaii drawings. Responsible charge means the engineer directed the engineering decisions: the hurricane lateral and envelope system, the volcanic-soil foundation design, the corrosion-protection strategy, and the calculations behind them. The seal must display the engineer's name, the Hawaii license number, and the date of sealing on each sheet the engineer takes responsibility for.\\n\\nEngineers licensed in other states must obtain a Hawaii license by comity before stamping Hawaii plans — there is no provision for sealing on a mainland license. Firms practicing in Hawaii operate under licensed engineers in responsible charge for each project and discipline. Apex Grid Engineering assigns a Hawaii-licensed engineer of record to every Hawaii project — the seal on your plans belongs to the engineer who evaluated the site's wind exposure, soils, and salt-air conditions and directed the design for island realities, not mainland defaults.",
      },
      {
        heading: "Hurricane Envelopes, Volcanic Soils, and Island Logistics",
        body: "Hurricanes govern Hawaii structural design. High design wind speeds and coastal Exposure D mean the lateral system, the roof, and every opening are engineered for pressure and debris impact — windows, doors, and storefronts carry wind-borne debris ratings, and the envelope detailing must keep water out during wind-driven rain that finds every weakness. Continuous load paths run from roof to foundation, and the connections are specified, not notional. Below grade, volcanic geology complicates foundations: expansive clays swell in many developed areas while lava rock nearby can require heavy excavation or pin foundations, and the geotechnical report must characterize whichever the site presents. Salt air corrodes: steel needs protection systems, concrete needs cover and mix design for chloride exposure, and dissimilar metals need isolation.\\n\\nLogistics is the hidden design constraint. Structural steel, specialty connectors, glazing systems, and equipment arrive by ship on long lead times — a connection detail that assumes next-day mainland delivery can stall a project for months. Limited local engineering and contractor capacity means the design must be buildable by the crews available, with details that survive real island construction conditions. Your engineer should state the wind speed, exposure category, debris-region determination, and soil parameters on the drawings, and should vet material and system selections against shipping realities before the permit set is sealed.",
      },
      {
        heading: "Hawaii Plan Stamping Checklist",
        body: "Use this checklist before your Hawaii permit set is sealed:\\n\\n• Engineer of record holds an active Hawaii PE license verifiable on the DCCA roster\\n• Seal shows name, Hawaii license number, and date on every sealed sheet\\n• Responsible charge is genuine: the sealing engineer directed the design decisions\\n• Design wind speed, exposure category, and debris-region determination stated; openings specified with wind-borne debris ratings\\n• Continuous load path from roof to foundation with specified connectors\\n• Geotechnical report addresses expansive volcanic clays or lava rock with a matching foundation\\n• Corrosion protection specified for steel, concrete, and dissimilar metals in salt air\\n• Material and system lead times vetted against island shipping realities; authority having jurisdiction confirmed: Honolulu DPP or neighbor-island county",
      },
    ],
    faqs: [
      {
        question: "Can an out-of-state engineer stamp my Hawaii building plans?",
        answer: "No. Hawaii requires an active Hawaii license from the Board of Professional Engineers, Architects, Surveyors and Landscape Architects (DCCA) before an engineer may seal Hawaii plans — a mainland license confers no stamping authority. Comity is the standard path for already-licensed engineers. Until licensure issues, the compliant route is working under a Hawaii-licensed engineer in responsible charge.",
      },
      {
        question: "What makes Hawaii structural design different from the mainland?",
        answer: "Three things: hurricanes, volcanic geology, and logistics. High wind speeds with coastal Exposure D and debris regions make the envelope a pressure-resisting system; volcanic soils swing between expansive clays and un-excavatable lava rock; and everything structural arrives by ship, so lead times and local buildability shape the design. An engineer applying mainland defaults to a Hawaii site will miss all three.",
      },
      {
        question: "Who reviews building permits on Oahu?",
        answer: "The City and County of Honolulu's Department of Planning and Permitting (DPP) — one consolidated city-county government covers the entire island of Oahu, so DPP handles everything from Honolulu high-rises to Windward and North Shore projects. The neighbor islands have their own county building departments: Hawaii County, Maui County, and Kauai County, each applying the Hawaii State Building Code with local amendments.",
      },
      {
        question: "How long does permitting take in Honolulu?",
        answer: "Honolulu DPP review times vary with project complexity and queue volume; commercial projects should plan on months rather than weeks, and incomplete submittals restart the clock. The island schedule factor that surprises mainland owners most is not the review queue but procurement — structural steel, glazing, and specialty systems ship in on long lead times, so the engineer and contractor should lock material selections early.",
      },
    ],
    extraLinks: [
      { label: "How is hurricane glazing designed?", href: "/answers/hurricane-glazing-design/" },
      { label: "How are hurricane retrofits designed for existing buildings?", href: "/answers/hurricane-retrofit-existing-buildings/" },
      { label: "How is surge protection designed for commercial buildings?", href: "/answers/surge-protection-commercial-buildings/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  }
];
