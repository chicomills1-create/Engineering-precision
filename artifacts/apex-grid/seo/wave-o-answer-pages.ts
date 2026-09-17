import type { Phase0AeoPage } from "./phase0-corpus";

const founderNote = "I'm Jeremy Mills, CEO & Founder of Apex Grid Engineering and a U.S. Air Force veteran. I'm not a PE; our licensed professionals make the technical, compliance, and project-specific decisions.";

export const WAVE_O_ANSWER_PAGES: Phase0AeoPage[] = [
  {
    slug: "ibc-chapter-17-special-inspections",
    title: "When Do IBC Chapter 17 Special Inspections Apply to Your Project?",
    description: "IBC Chapter 17 special inspections explained: which structural work triggers them, who performs them, and what the statement of special inspections must cover.",
    h1: "When Do IBC Chapter 17 Special Inspections Apply to Your Project?",
    answer: "If your project includes structural concrete, structural steel, structural masonry, deep foundations, or sprayed fire-resistant materials, there's a strong chance IBC Chapter 17 requires special inspections — inspections performed by qualified, independent inspectors rather than your contractor or the building department's routine inspector. The registered design professional, usually the structural engineer, prepares a statement of special inspections listing exactly which work requires it, whether the inspection is continuous or periodic, and who is qualified to perform it. That statement goes to the building official with the permit documents, and covered work can't be concealed until the special inspector signs off.\n\nWe treat the statement of special inspections as a coordination document, not paperwork. It tells the contractor when to call the inspector, tells the owner what testing and observation is coming, and tells the building official that critical work — welds, high-strength bolting, concrete placement, masonry grouting, soils compaction, deep foundations — is being watched by someone independent of the crew doing the work. Special inspections don't replace the building department's inspections; they run alongside them, focused on the structural items where a hidden defect could compromise the building.",
    directAnswer: "IBC Chapter 17 requires independent special inspections, documented in a statement of special inspections prepared by the registered design professional, for structural work where concealed defects could endanger the building — including concrete, masonry, steel, soils, and fireproofing. They supplement, not replace, the building department's inspections.",
    topic: "Structural",
    serviceHref: "/services/structural/",
    faqs: [
      {
        question: "What work typically triggers special inspections?",
        answer: "The common triggers are concrete construction including reinforcement placement and prestressing, masonry construction per the TMS inspection tables, structural steel welding and high-strength bolting, soils work such as compaction and deep foundations, sprayed fire-resistant materials, exterior insulation and finish systems, and smoke control systems. The statement of special inspections prepared for your project lists exactly which items apply — not every item in the chapter applies to every building.",
      },
      {
        question: "Who performs special inspections, and who hires them?",
        answer: "Special inspections are performed by qualified individuals or approved agencies accepted by the building official — typically third-party testing and inspection firms with certified inspectors. The code generally requires the owner, not the contractor, to employ the special inspector, which keeps the inspection independent of the crew performing the work. Our engineers coordinate the required qualifications with the inspection agency so the right certifications show up on site.",
      },
      {
        question: "How are special inspections different from normal building inspections?",
        answer: "Building department inspections are periodic checks by the authority having jurisdiction at hold points like footing, framing, and final. Special inspections are continuous or periodic monitoring by specialists while the work is actually being placed — watching concrete go into forms, verifying weld quality, confirming grout fills masonry cells. They cover structural safety items the building official can't watch full-time, and the results are documented in reports the building official relies on.",
      },
      {
        question: "What happens when a special inspector finds a problem?",
        answer: "The inspector documents the discrepancy and notifies the contractor, and the defective work must be corrected and re-inspected before it gets covered up. Inspectors file reports with the building official, and unresolved discrepancies get escalated — the building official can stop work until they're resolved. Catching issues while the work is still exposed is exactly the point; fixing a bad weld or unconsolidated grout after concealment is far more expensive.",
      },
    ],
    sections: [
      {
        heading: "The concise answer",
        body: "IBC Chapter 17 requires independent special inspections for structural work where a concealed defect could compromise safety — concrete, masonry, steel, soils and foundations, and fireproofing chief among them. The registered design professional prepares a statement of special inspections identifying each item, the required frequency, and the inspector qualifications, and the building official approves it as part of the permit. Covered work is inspected as it's performed and can't be concealed until accepted.\n\nThe practical effect on your project is scheduling and coordination, not just cost. Special inspectors need advance notice before concrete placements, steel erection milestones, and masonry grouting operations. We build the inspection schedule into the structural notes and the statement so the contractor can plan around it — projects get delayed when an inspector is called the morning of a pour, not the week before.",
      },
      {
        heading: "How the statement of special inspections works",
        body: "The statement is prepared by the registered design professional in responsible charge — on most commercial projects, that's the structural engineer of record — and it becomes part of the construction documents the building official reviews. For each item it names the inspection type, whether it's continuous or periodic, and any special qualifications the inspector needs. It also identifies any testing required, like concrete cylinder breaks or weld nondestructive testing, and confirms who employs the inspector.\n\nDuring construction the special inspector keeps records, submits reports to the building official and the design professional, and flags discrepancies immediately. At the end of the work, a final report of special inspections documents that everything required was inspected and accepted. Building officials commonly hold the certificate of occupancy until that final report is in — so the statement isn't just a permit submittal item, it's on the critical path to opening the building.",
      },
      {
        heading: "Special inspection coordination checklist",
        body: "Get these items settled before construction starts and special inspections become a smooth part of the job instead of a source of delays and disputes.",
        bullets: [
          "Confirm the statement of special inspections is complete and approved before the first affected work starts",
          "Engage an approved inspection agency early, with inspectors holding the certifications your statement requires",
          "Build inspector notification lead times into the construction schedule for pours, grouting, and steel milestones",
          "Make sure the contractor understands no covered work proceeds without inspector sign-off",
          "Route inspector reports to the engineer of record so discrepancies get engineering direction, not field guesses",
          "Track the final report of special inspections as a certificate-of-occupancy prerequisite",
        ],
      },
    ],
    extraLinks: [
      { label: "What are deferred submittals?", href: "/answers/what-are-deferred-submittals/" },
      { label: "Most common plan check corrections", href: "/answers/most-common-plan-check-corrections/" },
      { label: "How much do engineering calculations cost?", href: "/answers/how-much-do-engineering-calculations-cost/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "asce-7-seismic-design-categories",
    title: "How Are ASCE 7 Seismic Design Categories Assigned to Buildings?",
    description: "How ASCE 7 assigns Seismic Design Categories A through F from occupancy and ground motion, and how the category changes analysis, system limits, and detailing.",
    h1: "How Are ASCE 7 Seismic Design Categories Assigned to Buildings?",
    answer: "Every building gets assigned a Seismic Design Category from A to F, and that single letter quietly controls how much seismic engineering your project needs. The category comes from two inputs: the building's Risk Category — I through IV based on occupancy, where a warehouse is Category I and a hospital or fire station is Category IV — and the earthquake ground motion expected at the site, expressed as design spectral accelerations adjusted for local soil conditions. Our engineers pull the mapped ground-motion values, adjust them for the site class from the geotechnical report, and the code tables hand back the category.\n\nWhy the letter matters: SDC A means essentially no seismic design beyond basic structural integrity. By SDC D, E, and F, you're into special seismic detailing, limits on which structural systems you can use, restrictions on irregular building shapes, and seismic anchorage requirements for nonstructural components and foundations. Two identical buildings on different soils — or with different occupancies — can land in different categories with very different engineering scopes and costs. We pin down the SDC at the start of every structural project because it sets the entire seismic scope before a single member is sized.",
    directAnswer: "ASCE 7 assigns Seismic Design Categories A through F based on the building's Risk Category and the site's design spectral accelerations. The category sets how rigorous the seismic analysis, structural system limits, and detailing requirements must be — higher categories mean stricter rules.",
    topic: "Structural",
    serviceHref: "/services/structural/",
    faqs: [
      {
        question: "What is the difference between Risk Category and Seismic Design Category?",
        answer: "Risk Category describes the building's occupancy and consequence of failure — I for low-risk buildings like agricultural storage, up to IV for essential facilities like hospitals and emergency response. Seismic Design Category combines the Risk Category with the site's ground-motion hazard to set design stringency from A (least) to F (most). Think of Risk Category as who uses the building and SDC as how hard the earthquake design has to work.",
      },
      {
        question: "Can a building's Seismic Design Category change during design?",
        answer: "Yes, and it happens more often than owners expect. A geotechnical report that revises the site class — say from stiff soil to soft soil — can push the category up. So can a change in occupancy that raises the Risk Category, or refined ground-motion data. Because the SDC drives system selection and detailing, we recheck it whenever the soils report or the program changes rather than discovering the shift at plan check.",
      },
      {
        question: "Does SDC A mean no earthquake design at all?",
        answer: "Not quite. SDC A buildings still need basic structural integrity — connections that tie the building together and a complete load path — but they're exempt from the seismic analysis and detailing chapters that govern higher categories. In genuinely low-seismic regions on good soils with ordinary occupancies, the seismic scope really is minimal, which is one reason identical prototype buildings cost less to engineer in some states than others.",
      },
      {
        question: "Do nonstructural components have seismic requirements?",
        answer: "Yes, and this is where higher SDCs surprise MEP contractors. In elevated categories, components like rooftop equipment, piping, ductwork, ceilings, cladding, and partitions need engineered seismic anchorage and bracing — our nonstructural component bracing designs address exactly this. The architectural and MEP drawings have to show the bracing, and it gets inspected, so it's a real scope item rather than a footnote.",
      },
    ],
    sections: [
      {
        heading: "The concise answer",
        body: "ASCE 7 assigns Seismic Design Categories A through F using two inputs: the building's Risk Category (I to IV, occupancy-based) and the design spectral accelerations at the site (ground-motion values adjusted for soil conditions). The category then dictates the seismic design effort — from essentially none at A, through moderate analysis and detailing requirements in the middle categories, to special seismic systems, strict irregularity limits, and detailed nonstructural requirements at D, E, and F.\n\nFor owners, the SDC is one of the biggest hidden cost drivers in structural engineering. It determines whether an ordinary steel frame or concrete shear wall system is permitted or whether the design must use special moment frames and special detailing — systems that cost more to design and more to build. Establishing the category early lets the structural system be selected once, correctly, instead of being redesigned after plan check.",
      },
      {
        heading: "What actually moves a building from one category to another",
        body: "Three levers control the category. First, occupancy: upgrading a building from offices to an emergency operations center raises the Risk Category and can raise the SDC with it. Second, site soils: soft clays and loose fills amplify ground motion, so the site class from the geotechnical investigation directly feeds the calculation — a building on soft soil can land two categories higher than the same building on rock. Third, location: the mapped spectral accelerations vary enormously across the country, which is why seismic design dominates in California and barely registers in parts of the Midwest.\n\nCategory F has its own trigger worth knowing: buildings assigned to Risk Category IV with high ground motion near active faults land in F, the most stringent category, with the tightest limits on structural systems and irregularities. When we see a site approaching that territory, we flag it in the proposal stage so the owner understands the seismic scope before committing to a structural system.",
      },
      {
        heading: "Seismic Design Category scoping checklist",
        body: "Nail down these inputs at project kickoff and the seismic scope stays predictable from proposal through permit.",
        bullets: [
          "Confirm the occupancy and Risk Category before structural system selection begins",
          "Get the geotechnical report's site class early — soils drive the category as much as location",
          "Pull the mapped spectral accelerations for the exact site coordinates, not a nearby city",
          "Check whether the SDC permits the intended structural system or forces special seismic systems",
          "Scope nonstructural component bracing and anchorage for the MEP and architectural trades",
          "Re-verify the category if occupancy, soils data, or building location changes mid-design",
        ],
      },
    ],
    extraLinks: [
      { label: "Seismic design categories explained", href: "/answers/seismic-design-categories-explained/" },
      { label: "Wind load vs seismic load design", href: "/answers/wind-load-vs-seismic-load-design/" },
      { label: "Nonstructural component seismic bracing", href: "/answers/nonstructural-component-seismic-bracing/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "asce-7-wind-load-provisions",
    title: "How Do Engineers Determine ASCE 7 Wind Loads on Buildings?",
    description: "How ASCE 7 builds wind loads from mapped wind speeds, exposure, and topography — and how engineers design the main wind frame versus components and cladding.",
    h1: "How Do Engineers Determine ASCE 7 Wind Loads on Buildings?",
    answer: "Wind loads start with the basic wind speed — the mapped gust speed for the site's risk category — and then get shaped by everything between the sky and your building. Our engineers adjust for exposure, meaning whether the site is open terrain, suburban, or urban; for hills and escarpments that accelerate wind; for the building's height, shape, and roof geometry; and for internal pressure driven by openings like doors and windows. The result is wind pressures applied to the main wind force resisting system — the frames, shear walls, and roof diaphragm that keep the building standing — plus higher localized pressures on components and cladding.\n\nThe distinction between the main wind force resisting system and components-and-cladding is where most of the engineering judgment lives. The overall frame sees averaged pressures across the building; a single window, a roof corner, or a parapet sees peak gusts that can be several times higher. We design both, because the structure can be perfectly adequate while the glazing or roof membrane fails. In hurricane-prone and high-wind regions, wind — not earthquakes — usually controls the lateral design, and that's exactly what the calculations have to prove.",
    directAnswer: "ASCE 7 wind loads are built from the site's basic wind speed, adjusted for exposure, topography, height, and internal pressure, then applied as averaged pressures on the main wind force resisting system and as higher localized pressures on components and cladding.",
    topic: "Structural",
    serviceHref: "/services/structural/",
    faqs: [
      {
        question: "What is the difference between MWFRS and components and cladding?",
        answer: "The main wind force resisting system (MWFRS) is the collection of structural elements — frames, shear walls, diaphragms — that resist overall wind forces on the building, designed for spatially averaged pressures. Components and cladding (C&C) are individual elements like windows, doors, roofing, and parapets that receive wind directly, designed for higher localized peak pressures. A building needs both designs: the frame keeps it standing, the cladding keeps the weather out.",
      },
      {
        question: "Does my building need a wind tunnel test?",
        answer: "Rarely. ASCE 7 provides analytical procedures — directional, envelope, and simplified methods — that cover the vast majority of buildings. Wind tunnel testing comes into play for unusually tall, slender, or oddly shaped structures, or where surrounding buildings create complex interference effects. For typical commercial and industrial buildings, the code procedures are the accepted and expected path.",
      },
      {
        question: "How do doors and windows affect wind loads?",
        answer: "Openings determine the internal pressure coefficient. An enclosed building with limited openings gets modest internal pressures, while a partially enclosed building — say a warehouse with a large door that could fail or be left open in a storm — gets much higher internal pressures that push outward on the roof and walls simultaneously. Glazing and door ratings in high-wind regions are often driven by this classification, not just the exterior pressure.",
      },
      {
        question: "Does wind or seismic control my building's lateral design?",
        answer: "It depends on region, height, and weight. Heavy, stiff buildings in seismic zones are often seismic-controlled; light, tall, or large-surface-area buildings in windy regions are usually wind-controlled. Our engineers run both sets of calculations and design for whichever governs — and on many projects, wind controls the cladding and roof design while seismic controls the frame, so both matter.",
      },
    ],
    sections: [
      {
        heading: "The concise answer",
        body: "Engineers determine ASCE 7 wind loads by starting with the basic wind speed mapped for the site and Risk Category, then applying adjustment factors: exposure category for surrounding terrain, topographic factor for hills and ridges, ground elevation factor, directionality, and internal pressure based on enclosure classification. These produce velocity pressures that vary with height, which are converted into design pressures on the main wind force resisting system and into zone-based peak pressures on components and cladding.\n\nThe output is a set of pressures — and just as importantly, the load cases that combine them: wind from each direction, with positive and negative internal pressure, applied to walls, roofs, parapets, and rooftop equipment. Plan reviewers expect to see the wind speed, exposure, enclosure classification, and resulting pressures documented in the structural calculations, because every one of those inputs is a judgment call the reviewer will check.",
      },
      {
        heading: "The inputs that shape the final wind pressure",
        body: "Exposure category is the input owners can most easily get wrong. A building designed as Exposure B (suburban) that actually sits in open Exposure C terrain is under-designed — the terrain roughness directly scales the pressure, and reviewers verify it against aerial imagery. Topography matters too: a building on a hill or escarpment gets a speed-up factor that can add a meaningful percentage to the pressure.\n\nThen come the building-specific inputs. Taller buildings see higher pressures at the top than at the base. Roof geometry — flat, gabled, hip — changes the pressure zones, with roof corners and edges carrying the highest suction. Parapets, rooftop units, and canopies each get their own provisions. And the enclosure classification, driven by the openings, sets the internal pressure that acts on every surface at once. Each input is modest on its own; together they define whether the design is right.",
      },
      {
        heading: "Wind load design checklist",
        body: "Confirm these inputs before the lateral system is selected and the wind design holds up under any plan review.",
        bullets: [
          "Verify the basic wind speed and Risk Category for the exact site, not a neighboring jurisdiction",
          "Classify exposure honestly against actual surrounding terrain and future development",
          "Check topographic speed-up for hills, ridges, and escarpments near the site",
          "Classify enclosure correctly — partially enclosed assumptions change everything",
          "Design components and cladding zones separately, especially roof corners, edges, and parapets",
          "Include rooftop equipment, screens, and canopies in the wind scope, not as afterthoughts",
        ],
      },
    ],
    extraLinks: [
      { label: "Wind uplift roof design", href: "/answers/wind-uplift-roof-design/" },
      { label: "Wind load vs seismic load design", href: "/answers/wind-load-vs-seismic-load-design/" },
      { label: "What is a structural load path?", href: "/answers/what-is-a-structural-load-path/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "asce-7-snow-load-design",
    title: "How Are ASCE 7 Snow Loads Designed for Commercial Buildings?",
    description: "How engineers turn ground snow loads into commercial roof snow loads under ASCE 7, then design for drift, sliding snow, and unbalanced loading in snow regions.",
    h1: "How Are ASCE 7 Snow Loads Designed for Commercial Buildings?",
    answer: "Snow design starts with the ground snow load — the mapped weight of snow on the ground at your site — and converts it into what the roof actually has to carry. Our engineers apply factors for exposure, meaning whether wind scours snow off the roof or surrounding obstructions shelter it; for thermal condition, since heated buildings melt snow faster than unheated ones; and for the building's importance. Then we check far more than a uniform blanket of snow: drifted snow piled against parapets and at roof steps, sliding snow shedding from upper roofs onto lower ones, and unbalanced loads from wind redistributing snow across the roof.\n\nThe roof that fails is rarely the one with too little uniform capacity — it's the one nobody checked for drift. Drift loads at parapets and roof elevation changes create intense triangular surcharges that routinely control the design of the supporting beams and columns. In snow regions we also watch deflection and ponding, because a roof that sags under snow collects more snow, and rain-on-snow can add real weight in certain climates. If your project sits anywhere snow falls, the structural package should show the ground snow load used and every drift and unbalanced case considered — that's what a plan reviewer looks for first.",
    directAnswer: "Engineers convert the site's ground snow load into roof snow loads using exposure, thermal, and importance factors, then design for uniform, drifted, sliding, and unbalanced snow — drift at parapets and roof steps usually controls the supporting members.",
    topic: "Structural",
    serviceHref: "/services/structural/",
    faqs: [
      {
        question: "What is the difference between ground snow load and roof snow load?",
        answer: "Ground snow load is the mapped weight of snow on the ground at the site — the starting input. Roof snow load is what the roof must actually support after applying factors: exposure (wind scouring vs. shelter), thermal condition (heated vs. cold roof), importance, and roof slope. The roof load is typically lower than the ground load for a simple flat heated roof, but drift and unbalanced cases can push local loads far above the uniform value.",
      },
      {
        question: "What is snow drift and why does it matter so much?",
        answer: "Wind blows snow off upper and open areas and deposits it against obstructions — parapets, rooftop equipment, and roof steps where a high roof meets a low roof. These drifts form triangular surcharges several feet deep that impose intense local loads on the structure below. Drift is the controlling load case on a huge share of commercial roof designs in snow country, and missing a drift case is one of the most common structural plan-check corrections in those regions.",
      },
      {
        question: "Do I need to design for snow in a mild climate?",
        answer: "Probably at least minimally. Even where mapped ground snow loads are low, the code requires roofs to support a minimum roof live load, and some jurisdictions set minimum ground snow values regardless of the maps. Our engineers check the local amendments for the project jurisdiction — a few jurisdictions with no real snow history still enforce a minimum that affects the design.",
      },
      {
        question: "Can snow sliding off an upper roof damage the lower roof?",
        answer: "Yes, and the code requires designing for it. Slippery, sloped upper roofs shed snow onto the roofs, canopies, and equipment below, and the impact plus the accumulated weight must be accounted for in the lower roof's design. Gutters, overhangs, and canopies at the eave line get their own checks, and in some cases snow guards or retention are detailed to control where the snow goes.",
      },
    ],
    sections: [
      {
        heading: "The concise answer",
        body: "ASCE 7 snow design takes the ground snow load from the code maps or the local jurisdiction, applies exposure, thermal, and importance factors plus a roof slope factor, and produces the balanced roof snow load. Then the engineer works through the additional cases the chapter requires: windward and leeward drifts at parapets and projections, drifts at roof steps between high and low roofs, sliding snow from sloped upper surfaces, unbalanced loading on gable and curved roofs, and rain-on-snow surcharge where the climate warrants it.\n\nEach case produces its own loading diagram on the roof framing, and the members are designed for the worst combination. The calculations document the ground snow load, every factor used, and each drift geometry — drift height and width are computed from the upwind fetch distance, so the roof layout itself feeds the load. Reviewers in snow jurisdictions check drift cases closely because that's where under-design hides.",
      },
      {
        heading: "The load cases beyond the uniform blanket",
        body: "Unbalanced loads deserve attention because they surprise owners: wind strips snow from the windward side of a gable roof and piles it on the leeward side, so one slope can carry multiples of the balanced load while the other carries almost nothing. The framing has to handle that asymmetry, not just the average. On curved roofs the pattern shifts with the geometry, and open structures like canopies get their own unbalanced provisions.\n\nThen there's the serviceability side. Snow is a sustained load — it sits for weeks — so deflection under snow matters more than deflection under a brief wind gust. A roof that deflects excessively ponds meltwater, and ponding plus snow is a failure mode with a long history. We check deflection limits and ponding stability as part of the snow design, not as an afterthought, and we pay special attention to long-span roofs and roofs with interior drains where ponding risk concentrates.",
      },
      {
        heading: "Snow design checklist for the structural package",
        body: "Make sure the structural documents address every one of these before they go to plan check in a snow region.",
        bullets: [
          "Document the ground snow load source — code map value or the jurisdiction's amended minimum",
          "Show exposure, thermal, and importance factors with the reasoning for each selection",
          "Compute drift at every parapet, roof step, and rooftop projection with the fetch distances shown",
          "Check sliding snow from upper roofs and sloped surfaces onto everything below",
          "Evaluate unbalanced loading on sloped, gabled, and curved roof geometry",
          "Verify deflection and ponding stability under sustained snow plus rain-on-snow where applicable",
        ],
      },
    ],
    extraLinks: [
      { label: "Wind uplift roof design", href: "/answers/wind-uplift-roof-design/" },
      { label: "How long does structural engineering design take?", href: "/answers/how-long-does-structural-engineering-design-take/" },
      { label: "What is a structural load path?", href: "/answers/what-is-a-structural-load-path/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "aci-318-concrete-code-requirements",
    title: "What Does ACI 318 Require for Structural Concrete Design?",
    description: "What ACI 318 requires for structural concrete — strength design, durability, and reinforcement detailing — and when Chapter 18 seismic rules change the design.",
    h1: "What Does ACI 318 Require for Structural Concrete Design?",
    answer: "ACI 318 is the building code for structural concrete — the document the IBC adopts by reference that tells engineers how to design reinforced concrete so it stands up for its full service life. It covers strength design with factored loads and reduced nominal strengths, minimum reinforcement so members don't fail without warning, development lengths and splices so bars actually deliver their strength, and the design of beams, slabs, columns, walls, and foundations for flexure, shear, and axial load. It also governs durability: exposure classes that dictate water-cement ratio, concrete cover, and air entrainment so the concrete survives freeze-thaw, deicing salts, and corrosive soils.\n\nTwo parts of ACI 318 generate the most plan-check comments in our experience: detailing and Chapter 18. Detailing — hooks, development lengths, bar spacing, confinement — is where drawings get redlined, because a member sized correctly but detailed poorly won't perform. Chapter 18 kicks in for Seismic Design Categories D and above, demanding special moment frames, special structural walls, and confinement detailing that looks very different from ordinary concrete. We flag the seismic chapter at project start because it changes member sizes, rebar congestion, and construction cost — discovering it at plan check means redesign.",
    directAnswer: "ACI 318 is the IBC-referenced code for structural concrete design, covering strength, serviceability, durability, and reinforcement detailing — with Chapter 18 adding special earthquake-resistant detailing for buildings in higher Seismic Design Categories.",
    topic: "Structural",
    serviceHref: "/services/structural/",
    faqs: [
      {
        question: "What is strength design, and how is it different from the old working stress method?",
        answer: "Strength design — the standard in current ACI 318 — applies load factors that magnify the expected loads and strength-reduction factors that reduce the nominal capacity, designing so factored demand stays below reduced capacity. The old working stress method compared unfactored service loads against allowable stresses. Strength design is more consistent across load types and is what reviewers expect to see in modern calculations.",
      },
      {
        question: "When does ACI 318 Chapter 18 apply to a project?",
        answer: "Chapter 18, covering earthquake-resistant structures, applies when the Seismic Design Category is D, E, or F. It imposes special detailing on frames and walls designated as part of the seismic force resisting system — closely spaced confinement ties, strong-column/weak-beam proportions, special splice and anchorage rules. Even buildings in lower SDCs pick up some seismic provisions from earlier chapters, but Chapter 18 is where concrete design changes fundamentally.",
      },
      {
        question: "What are exposure classes in ACI 318?",
        answer: "Exposure classes categorize what the concrete will face in service — freezing and thawing, deicing chemicals, sulfate-laden soils, seawater, corrosion protection of reinforcement. Each class sets maximum water-cement ratios, minimum strengths, air entrainment, and cover requirements. Getting the exposure class right at the start matters because it drives the concrete mix the contractor orders and the cover the detailer shows.",
      },
      {
        question: "Does ACI 318 cover shotcrete or plain concrete?",
        answer: "ACI 318 includes limited provisions for plain structural concrete, but shotcrete is primarily governed by ACI 506 with reference back to 318 for design. Most commercial structural concrete — foundations, slabs, beams, columns, walls — falls squarely under ACI 318's reinforced concrete chapters, which is where our engineers spend their time.",
      },
    ],
    sections: [
      {
        heading: "The concise answer",
        body: "ACI 318 requires engineers to design reinforced concrete members for factored load combinations using strength design, satisfy serviceability limits on deflection and cracking, meet durability requirements through exposure classes, and detail reinforcement — development, splices, hooks, spacing, cover — so the as-built member matches the design assumptions. Foundations, slabs, beams, columns, walls, and diaphragms each have dedicated chapters, and construction documents must show the design details the code's assumptions rest on.\n\nFor owners, the practical takeaway is that concrete design doesn't end at member sizes. The mix design, the cover dimensions, the bar detailing, and the inspection of placement all carry code requirements, and the special inspection program under IBC Chapter 17 verifies them in the field. A complete concrete package addresses design, durability, detailing, and field verification together.",
      },
      {
        heading: "Where concrete projects usually get tripped up",
        body: "Detailing is the number-one source of plan-check corrections on concrete projects. Development lengths that don't fit in the joint, bars spaced tighter than concrete can flow through, missing confinement at frame joints — these are drawing problems, not analysis problems, and they cost weeks when caught late. We detail for constructability from the start: if the rebar can't physically be placed and consolidated, the design is wrong regardless of what the math says.\n\nDurability is the quiet second trap. A structural design that's perfect on strength but specifies the wrong exposure class delivers concrete that deteriorates in a decade — scaling, spalling, corroded reinforcement. And Chapter 18 seismic detailing is the third: special moment frame joints are congested by design, and the congestion has to be drawn, reviewed, and buildable. Flagging all three at kickoff is how we keep concrete projects out of correction cycles.",
      },
      {
        heading: "Concrete code compliance checklist",
        body: "Cover these items in the structural documents and the concrete scope stays out of trouble.",
        bullets: [
          "Confirm the Seismic Design Category early to know whether Chapter 18 detailing applies",
          "Assign exposure classes for every concrete element and carry them into the specifications",
          "Detail development lengths, splices, hooks, and confinement so they fit and can be built",
          "Show concrete cover dimensions that match the exposure class, not just minimums",
          "Coordinate the concrete mix submittal review with the specified strength and durability",
          "Align special inspection items for concrete with the statement of special inspections",
        ],
      },
    ],
    extraLinks: [
      { label: "Concrete crack evaluation, structural", href: "/answers/concrete-crack-evaluation-structural/" },
      { label: "Concrete mix design submittal review", href: "/answers/concrete-mix-design-submittal-review/" },
      { label: "What are deferred submittals?", href: "/answers/what-are-deferred-submittals/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "tms-402-masonry-code-explained",
    title: "What Does TMS 402 Require for Structural Masonry Design?",
    description: "TMS 402/602 masonry code explained: allowable stress versus strength design, grout and reinforcement rules, and why field inspection levels matter so much.",
    h1: "What Does TMS 402 Require for Structural Masonry Design?",
    answer: "TMS 402/602 is the masonry counterpart to ACI 318 — the Building Code Requirements (402) and Specification for Masonry Structures (602) that the IBC adopts for masonry design and construction. It covers both design methods engineers may use: allowable stress design, the traditional working-stress approach, and strength design, which parallels concrete's factored-load method. It sets the rules for reinforced and unreinforced masonry, grout and mortar, reinforcement placement, and the design of walls for axial load, flexure, and shear — including masonry shear walls that serve as the building's lateral system.\n\nWhat surprises owners is how much of masonry compliance happens in the field rather than on paper. TMS 602's inspection tables tie special inspection levels to the building's risk category and seismic design category — grout placement, mortar, reinforcement positioning, and unit placement get verified as the wall goes up, because nobody can inspect inside a grouted wall after the fact. We coordinate the required inspection level with the structural drawings from the start so the mason, the inspector, and the building official are all working from the same page instead of discovering the requirements mid-wall.",
    directAnswer: "TMS 402/602 is the IBC-adopted masonry code and construction specification, covering allowable stress and strength design of masonry plus field inspection levels tied to risk and seismic categories — since masonry quality must be verified during construction.",
    topic: "Structural",
    serviceHref: "/services/structural/",
    faqs: [
      {
        question: "Allowable stress vs. strength design for masonry — which is used?",
        answer: "Both are permitted by TMS 402. Allowable stress design compares service loads against allowable stresses and remains common for simpler masonry. Strength design uses factored loads and reduced nominal strengths, paralleling concrete design, and is more common for engineered structures and seismic force resisting systems. Our engineers select the method that fits the project's complexity and the reviewer's expectations in the jurisdiction.",
      },
      {
        question: "What is the difference between TMS 402 and TMS 602?",
        answer: "TMS 402 contains the design requirements — how engineers calculate masonry capacity for axial, flexure, and shear. TMS 602 contains the construction and specification requirements — materials, mortar and grout, construction practices, tolerances, and the inspection tables. They're adopted together because a masonry design is only as good as its construction, and the inspection tables in 602 are what enforce that link.",
      },
      {
        question: "Does all masonry work require special inspection?",
        answer: "Not all of it, but most structural masonry does. TMS 602 sets three inspection levels with required tasks — verifying mortar, grout, reinforcement placement, grout space, and unit placement — and the applicable level rises with the building's risk category and seismic design category. Veneer and nonstructural masonry have lighter requirements, but anything carrying structural load should expect inspection.",
      },
      {
        question: "Can masonry be used for a building's seismic force resisting system?",
        answer: "Yes. Reinforced masonry shear walls are a recognized seismic force resisting system, with detailing requirements that escalate by Seismic Design Category — from ordinary reinforced masonry in lower categories to special reinforced masonry shear walls with strict reinforcement and grouting rules in higher ones. Unreinforced masonry is heavily restricted in seismic regions, which is why existing unreinforced buildings often need retrofit.",
      },
    ],
    sections: [
      {
        heading: "The concise answer",
        body: "TMS 402 requires engineers to design masonry for the applicable loads using either allowable stress or strength design, covering compressive, flexural, and shear capacity of walls, columns, pilasters, and beams — with grout, mortar, and reinforcement specified to match the design assumptions. TMS 602 then requires the construction to be built and inspected to those assumptions, with inspection levels set by tables keyed to risk category and seismic design category.\n\nThe practical consequence is that masonry engineering is a two-part deliverable: calculations and drawings that satisfy 402, plus specifications and an inspection plan that satisfy 602. Projects get in trouble when the design assumes fully grouted, inspected reinforced masonry but the specs and inspection plan describe something lighter. We keep the design assumptions, the specs, and the inspection level explicitly linked so the wall that gets built is the wall that was designed.",
      },
      {
        heading: "Why masonry lives or dies in the field",
        body: "Unlike steel, which arrives from the shop with mill certs, or concrete, which gets cylinder breaks, masonry's quality is created on the scaffold — one unit, one mortar joint, one grout lift at a time. Low-lift grouting versus high-lift grouting changes what's inspectable. Reinforcement that's supposed to be centered in the cell but ends up against the face changes the wall's capacity. Mortar mixed too wet loses strength. Every one of these is invisible once the wall is finished, which is exactly why the inspection tables exist.\n\nOur approach is to make the field requirements unmistakable: grout lift heights on the drawings, cleanout locations for high-lift grouting, inspection hold points in the specs, and preconstruction meetings where the mason and inspector walk through the requirements together. Masonry done right is durable, economical structure — but 'done right' has to be verified while the work is open, not assumed afterward.",
      },
      {
        heading: "Masonry project checklist",
        body: "Address these before masonry construction starts and the walls go up without surprises.",
        bullets: [
          "Select the design method and confirm the masonry shear wall type suits the Seismic Design Category",
          "Set the TMS 602 inspection level from the risk category and SDC, and show it in the documents",
          "Specify grout type, lift heights, and cleanout requirements the mason can actually build",
          "Detail reinforcement placement with tolerances that keep bars where the design assumes",
          "Coordinate veneer anchorage and support separately from the structural backup wall",
          "Hold a preconstruction meeting with the mason and inspector on grouting and hold points",
        ],
      },
    ],
    extraLinks: [
      { label: "Masonry veneer support design", href: "/answers/masonry-veneer-support-design/" },
      { label: "Unreinforced masonry retrofit engineering", href: "/answers/unreinforced-masonry-retrofit-engineering/" },
      { label: "What is a structural load path?", href: "/answers/what-is-a-structural-load-path/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "nds-wood-design-standard-explained",
    title: "What Does the NDS Wood Standard Require Engineers to Check?",
    description: "The NDS wood design standard explained: sawn lumber, glulam, and connection design requirements — plus when IBC construction types allow wood framing at all.",
    h1: "What Does the NDS Wood Standard Require Engineers to Check?",
    answer: "The National Design Specification (NDS) for Wood Construction is the IBC-referenced standard engineers use to design sawn lumber, glued-laminated timber, and wood connections. It publishes reference design values for bending, shear, compression, and tension, then adjusts them for real-world conditions — load duration, moisture, temperature, member size, lateral stability — because wood's strength genuinely depends on how and where it's used. Connection design is roughly half the standard: bolts, nails, screws, and other dowel-type fasteners sized with yield-limit equations that account for the wood and the fastener failing together.\n\nThe question we hear most is 'can we build it out of wood?' — and the answer comes from the IBC's construction types, not the NDS. Type V allows wood framing throughout within height and area limits; Type III allows wood interior framing with noncombustible exterior walls; Type IV covers mass timber with its own taller allowances. The NDS tells us how to size the members; the IBC tells us whether wood is permitted at all. Engineered wood products like LVL, PSL, and I-joists supplement the NDS with manufacturer-published design values, and our engineers verify those values are code-recognized before using them.",
    directAnswer: "The NDS is the IBC-adopted wood design standard covering sawn lumber, glulam, and connections, with reference values adjusted for load duration, moisture, and stability — while the IBC's construction types decide where wood framing is legally allowed.",
    topic: "Structural",
    serviceHref: "/services/structural/",
    faqs: [
      {
        question: "What is the difference between sawn lumber and engineered wood?",
        answer: "Sawn lumber is solid wood cut from logs, graded visually or by machine, with design values straight from the NDS. Engineered wood — LVL, PSL, LSL, glulam, I-joists — is manufactured from veneers, strands, or laminations bonded together, delivering higher and more consistent strengths for long spans and heavy loads. Engineered products carry manufacturer-published values evaluated to code acceptance criteria, which our engineers verify before specifying.",
      },
      {
        question: "Why does load duration matter in wood design?",
        answer: "Wood carries more load for short durations than for sustained ones — a beam handles a gust or a worker's footfall at higher stress than the same load sitting for years. The NDS applies a load duration factor that increases allowable stress for short-term loads like wind and seismic and reduces it for permanent dead loads. Getting the duration factor right for each load combination is fundamental to a correct wood design.",
      },
      {
        question: "When is wood framing not allowed?",
        answer: "The IBC's construction types set the limits: wood is restricted by occupancy, building height, floor area, and fire separation distance. High-hazard occupancies, tall buildings beyond Type IV mass timber allowances, and buildings close to property lines often can't use wood framing. Fire-resistance ratings for certain assemblies also rule it out. We check construction type against the program before any wood member gets sized.",
      },
      {
        question: "Does the NDS cover mass timber like CLT?",
        answer: "The NDS covers glulam and includes provisions used in heavy timber design, while cross-laminated timber and other mass timber products are addressed through the IBC's Type IV construction provisions and product-specific code evaluations. Mass timber high-rises are an active area of code development, so we confirm the adopted edition's Type IV allowances for the project jurisdiction rather than assuming.",
      },
    ],
    sections: [
      {
        heading: "The concise answer",
        body: "The NDS requires engineers to check wood members for bending, shear, deflection, compression, tension, and combined loading using reference design values adjusted by factors for load duration, wet service, temperature, size, flat use, incising, repetitive members, and stability. Connections get equal billing: fastener capacity, spacing, edge distances, and group action must all be verified, because connections are where wood structures most often underperform.\n\nIn practice, a wood structural package includes member sizing calculations, connection details with fastener schedules, lateral system design for wind and seismic, and deflection checks — wood moves more than steel or concrete, so serviceability often controls. The drawings must show species and grade, moisture condition assumptions, and preservative treatment where required, since the design values depend on all three.",
      },
      {
        heading: "The two questions every wood project must answer",
        body: "First: is wood allowed here? That question belongs to the IBC — construction type, occupancy, height, area, and fire ratings. We've seen projects designed beautifully in wood that couldn't be permitted as drawn because the construction type didn't allow it, and reworking a wood design into noncombustible construction late is essentially starting over. The construction-type check happens at project kickoff, before any member is sized.\n\nSecond: how do we size it right? That's the NDS — reference values, adjustment factors, connection design, lateral analysis. Wood's variability is the engineering challenge: moisture content, load duration, and stability all move the numbers, and the adjustments interact. Lateral design deserves special attention because wood shear walls and diaphragms have strict aspect-ratio and nailing requirements, and the holdowns and straps that make them work must be detailed, scheduled, and inspectable.",
      },
      {
        heading: "Wood project checklist",
        body: "Run through these items and the wood scope stays buildable and permittable.",
        bullets: [
          "Confirm the IBC construction type allows wood for the occupancy, height, and area",
          "Specify species, grade, and moisture condition so design values are traceable",
          "Apply all NDS adjustment factors — especially load duration and stability",
          "Detail connections completely: fastener type, size, spacing, and edge distances",
          "Design shear walls and diaphragms within aspect-ratio and nailing limits",
          "Show holdowns, straps, and hardware on the drawings with a complete schedule",
        ],
      },
    ],
    extraLinks: [
      { label: "Steel vs wood framing for commercial buildings", href: "/answers/steel-vs-wood-framing-commercial-buildings/" },
      { label: "Cold-formed steel framing design", href: "/answers/cold-formed-steel-framing-design/" },
      { label: "Barndominium structural engineering", href: "/answers/barndominium-structural-engineering/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "aisc-360-steel-design-explained",
    title: "What Does AISC 360 Require for Structural Steel Members?",
    description: "AISC 360 steel design explained: LRFD versus ASD member design rules, connection requirements, and when the AISC 341 seismic companion standard applies.",
    h1: "What Does AISC 360 Require for Structural Steel Members?",
    answer: "AISC 360 is the Specification for Structural Steel Buildings — the IBC-adopted standard governing how engineers design steel members and connections. It covers tension members, compression members with buckling checks, beams in flexure and shear, members under combined axial and bending, and composite construction, using either LRFD (load and resistance factor design) or ASD (allowable strength design). Both methods are code-legal: LRFD pairs factored loads with reduced nominal strengths, ASD pairs service loads with a safety factor — and while LRFD dominates new commercial work, the methods are calibrated to give comparable reliability when applied consistently.\n\nConnections deserve their own mention because that's where steel projects succeed or fail. AISC 360's connection provisions cover bolts, welds, and connecting elements, and the drawings must show enough — or delegate clearly to the fabricator — that the connections get properly detailed. For seismic work, AISC 341 takes over as the companion standard: when the seismic demands require it, ordinary steel frames give way to special moment frames, special concentrically braced frames, and detailing rules that control how and where the steel yields. We identify the seismic path early because it changes member sizes, connection types, and cost.",
    directAnswer: "AISC 360 is the IBC-adopted steel design specification covering member design by LRFD or ASD plus connection requirements, with AISC 341 as its seismic companion standard for earthquake-resistant steel frames.",
    topic: "Structural",
    serviceHref: "/services/structural/",
    faqs: [
      {
        question: "LRFD vs. ASD — which should my project use?",
        answer: "Either is acceptable to the code, and both are calibrated for similar reliability. LRFD is more common in current commercial practice and pairs naturally with the factored load combinations in ASCE 7. The key rule is consistency: pick one method for the project and use it throughout, since mixing methods within a design invites errors. Our engineers default to LRFD unless a client or jurisdiction has a reason to prefer ASD.",
      },
      {
        question: "When does AISC 341 apply instead of just AISC 360?",
        answer: "AISC 341, the Seismic Provisions for Structural Steel Buildings, applies to the seismic force resisting system when the Seismic Design Category requires it — generally Categories D and above, and for certain systems in Category C. It adds system-specific detailing: special moment frame connection qualifications, braced-frame member slenderness limits, and capacity-design rules that force yielding into ductile elements. The gravity system still follows AISC 360.",
      },
      {
        question: "Who designs the steel connections — the engineer or the fabricator?",
        answer: "The engineer of record sets the connection design criteria — loads, design method, and any seismic requirements — and either designs the connections or explicitly delegates their design to the fabricator's engineer through deferred submittals. Delegation must be clearly stated in the documents; assumed delegation is how connections fall through the cracks. Either way, the engineer of record reviews the connection submittals.",
      },
      {
        question: "Does AISC 360 cover cold-formed steel studs?",
        answer: "No — cold-formed steel members are covered by AISI S100, a separate specification. AISC 360 governs hot-rolled structural steel shapes like wide-flange beams, columns, angles, and hollow structural sections. Light-gage stud walls and cold-formed joists follow the AISI standards, which our engineers use alongside 360 on mixed projects.",
      },
    ],
    sections: [
      {
        heading: "The concise answer",
        body: "AISC 360 requires engineers to verify steel members for all applicable limit states — yielding, buckling, lateral-torsional buckling, block shear, and combined loading — using LRFD or ASD, and to design connections for the full forces the members deliver, including bolts, welds, and connecting elements. Stability is a central theme: unbraced lengths, effective length factors, and bracing requirements determine compression and flexural capacity as much as the steel grade does.\n\nThe deliverable is a structural package showing member sizes, connection criteria or designs, bracing locations, and camber where needed — coordinated with the steel fabricator's detailing. Because steel is fabricated off site to tight tolerances, the drawings have to be complete and unambiguous: a missing brace location or an unclear connection isn't a field fix, it's a fabrication error waiting to happen.",
      },
      {
        heading: "Members, connections, and the seismic fork in the road",
        body: "Member design under AISC 360 is methodical: classify the cross-section, check each limit state, verify combined loading with the interaction equations. Experienced engineers spend as much time on bracing and stability as on the member checks themselves, because a beam that's laterally unsupported over a long span loses capacity far faster than a slightly smaller well-braced one. Serviceability — floor vibration and deflection — often controls long-span beams regardless of strength.\n\nThe seismic fork is the big scope decision. A steel frame in a low seismic category can use ordinary systems with standard AISC 360 connections; the same building in a high category needs AISC 341 special systems with qualified connections, stringent member proportions, and capacity design. That fork changes the engineering hours, the fabrication cost, and the inspection program — so we settle which side of it the project sits on before sizing the first beam.",
      },
      {
        heading: "Structural steel checklist",
        body: "Confirm these on every steel project and the design, fabrication, and inspection stay aligned.",
        bullets: [
          "Establish the Seismic Design Category to determine whether AISC 341 detailing is required",
          "Choose LRFD or ASD for the project and apply it consistently across all calculations",
          "Show bracing points and unbraced lengths — stability assumptions must be buildable",
          "Define connection responsibility explicitly: engineer-designed or delegated to the fabricator",
          "Check floor vibration and deflection on long spans, not just strength",
          "Coordinate special inspection of welding and high-strength bolting with the inspection agency",
        ],
      },
    ],
    extraLinks: [
      { label: "Structural steel connection design", href: "/answers/structural-steel-connection-design/" },
      { label: "Collector and drag strut design", href: "/answers/collector-drag-strut-design/" },
      { label: "Steel vs wood framing for commercial buildings", href: "/answers/steel-vs-wood-framing-commercial-buildings/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "iecc-commercial-energy-code-explained",
    title: "How Does the IECC Affect Commercial Building Design Projects?",
    description: "IECC commercial energy code explained: envelope, mechanical, lighting, and water heating requirements — plus how state adoptions change the requirements.",
    h1: "How Does the IECC Affect Commercial Building Design Projects?",
    answer: "The International Energy Conservation Code's commercial provisions set the minimum energy efficiency for commercial buildings: how well the envelope insulates and seals, how efficient the mechanical systems are, how lighting power and controls perform, and how service water heating is handled. Compliance runs through either a prescriptive path — meet every listed requirement individually — or a performance path that models the whole building against a baseline and beats it. Our energy team picks the path based on the building: straightforward boxes usually go prescriptive, while complex, highly glazed, or mixed-use buildings typically benefit from modeling.\n\nTwo things owners should know before budgeting. First, the IECC allows compliance through ASHRAE 90.1 as an alternate path — the two documents are siblings with similar technical content, and many engineers prefer 90.1's structure for complex projects. Second, states adopt the IECC unevenly: some adopt it statewide as written, some amend it heavily, and some run their own energy code entirely, like California's 2025 California Energy Code / 2025 Standards, effective January 1, 2026. We verify the exact adopted edition and local amendments for the project jurisdiction before designing, because engineering to the wrong edition is an expensive redo at plan check.",
    directAnswer: "The IECC's commercial provisions set minimum envelope, mechanical, lighting, and water-heating efficiency for commercial buildings via prescriptive or performance paths, with ASHRAE 90.1 allowed as an alternate — though states adopt and amend it differently.",
    topic: "Energy Code",
    serviceHref: "/services/energy-code-compliance/",
    faqs: [
      {
        question: "What is the difference between the IECC and ASHRAE 90.1?",
        answer: "The IECC is a model energy code written for direct adoption by jurisdictions; ASHRAE 90.1 is an energy standard that becomes enforceable when a jurisdiction adopts it or when the IECC references it as an alternate compliance path. Their technical requirements are similar in most editions. Engineers often choose 90.1 for complex buildings because its performance path and documentation structure fit modeled projects well, while the IECC prescriptive path suits simpler buildings.",
      },
      {
        question: "Does the IECC apply to renovations and additions?",
        answer: "Yes. The IECC covers new construction plus additions, alterations, and changes in space conditioning, with the requirements scaled to the scope of work. A full-building renovation triggers more of the code than a small tenant improvement, and historic buildings often get specific relief. We scope the energy requirements to the actual project scope rather than assuming the whole code applies to every alteration.",
      },
      {
        question: "What is the performance path for IECC compliance?",
        answer: "Instead of meeting every prescriptive requirement individually, the performance path uses whole-building energy modeling to show the proposed design uses less energy — or costs less to operate — than a baseline building meeting the prescriptive minimums. It allows trade-offs: better glazing can offset a less efficient HVAC choice, for example. The modeling follows standardized rules so results are comparable and reviewable.",
      },
      {
        question: "Who enforces energy code compliance at permit?",
        answer: "The authority having jurisdiction enforces it during plan review, typically through compliance forms like COMcheck for prescriptive projects or energy model reports for performance-path projects. Some jurisdictions add third-party verification or commissioning requirements on top. Our deliverables include the compliance documentation formatted the way the specific jurisdiction's reviewers expect to receive it.",
      },
    ],
    sections: [
      {
        heading: "The concise answer",
        body: "The IECC affects commercial projects by setting mandatory minimums across four systems: the building envelope (insulation, fenestration, air sealing), mechanical systems (equipment efficiency, controls, ductwork), lighting (power allowances, controls, daylighting), and service water heating. The design team demonstrates compliance prescriptively with forms like COMcheck or through whole-building performance modeling, and the compliance documentation is part of the permit submittal.\n\nFor project planning, the key insight is that energy code compliance is a design-phase activity, not a paperwork exercise at the end. Envelope and glazing decisions made in schematic design lock in most of the compliance picture; trying to fix a non-compliant envelope with better light fixtures later rarely works. We run the compliance strategy alongside early design so the architecture and the energy math agree from the start.",
      },
      {
        heading: "The adoption patchwork problem",
        body: "The IECC is a model code — it only has force where adopted, and adoptions vary widely. Some states adopt the latest edition statewide, some are several editions behind, some let cities adopt stricter versions, and a few enforce their own codes entirely. Local amendments can add requirements the base IECC doesn't have, from stricter envelope values to mandatory commissioning or solar readiness.\n\nThis is why 'we comply with the IECC' is never a complete answer. Our first step on every energy project is confirming the jurisdiction's adopted edition and amendments — the state, the city, and sometimes the county each get a say. Designing to the model IECC when the city enforces an amended version means corrections; designing to an old edition the state still uses when you assumed the newest means overdesign. The jurisdiction's actual requirements are the only ones that matter at the permit counter.",
      },
      {
        heading: "IECC compliance checklist",
        body: "Work through these steps and energy compliance stays on schedule instead of becoming a plan-check surprise.",
        bullets: [
          "Confirm the adopted energy code edition and every local amendment for the project jurisdiction",
          "Choose prescriptive vs. performance path during early design, not at permit time",
          "Lock envelope and glazing performance targets before schematic design closes",
          "Verify mechanical equipment efficiencies meet code minimums before procurement",
          "Include lighting controls and daylighting requirements in the electrical scope early",
          "Prepare compliance documentation in the format the jurisdiction's reviewers expect",
        ],
      },
    ],
    extraLinks: [
      { label: "Energy modeling vs Title 24", href: "/answers/energy-modeling-vs-title-24/" },
      { label: "Cool roof energy code requirements", href: "/answers/cool-roof-energy-code-requirements/" },
      { label: "Lighting controls energy code", href: "/answers/lighting-controls-energy-code/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "ashrae-90-1-energy-standard-explained",
    title: "How Does ASHRAE 90.1 Shape Commercial Energy Compliance?",
    description: "ASHRAE 90.1 explained: the energy standard behind most commercial codes, its prescriptive and performance paths, and what Appendix G modeling delivers.",
    h1: "How Does ASHRAE 90.1 Shape Commercial Energy Compliance?",
    answer: "ASHRAE 90.1 is the national energy standard for buildings — the document most U.S. commercial energy codes are built on, borrowed from, or offered as an alternate to. It sets minimum efficiency for the building envelope, HVAC, service water heating, power, and lighting, and it gives engineers two ways to comply: follow every prescriptive requirement, or use the Energy Cost Budget method to trade off systems against each other while hitting an overall target. For beyond-code goals, its Appendix G performance rating method is the industry's common language for modeling a proposed building against a baseline.\n\nIn practice, 90.1 is both a compliance tool and a design tool. Jurisdictions adopt it directly or write their codes around it, and green building programs reference its Appendix G for energy credits — so a single well-built model can serve code compliance, utility incentives, and certification at once. Our team builds the model early enough to influence design: upgrading glazing, equipment, or envelope is cheap on paper and expensive after permit. The standard updates on a regular cycle and the adopted edition varies by state, so we confirm the jurisdiction's edition first — the modeling rules shift between editions.",
    directAnswer: "ASHRAE 90.1 is the minimum-efficiency energy standard behind most U.S. commercial energy codes, offering prescriptive or Energy Cost Budget compliance paths, with Appendix G as the standard method for whole-building energy modeling.",
    topic: "Energy Code",
    serviceHref: "/services/energy-code-compliance/",
    faqs: [
      {
        question: "Is ASHRAE 90.1 a code or a standard?",
        answer: "It's a standard — it becomes legally enforceable when a jurisdiction adopts it as its energy code or when another code, like the IECC, references it as an alternate compliance path. In practice it functions as the technical backbone of commercial energy regulation across the country. Whether your project 'complies with 90.1' depends on which edition your jurisdiction has adopted and whether any local amendments apply.",
      },
      {
        question: "What is Appendix G in ASHRAE 90.1?",
        answer: "Appendix G is the Performance Rating Method: a standardized way to model a proposed building design against a baseline building and quantify the percentage improvement. It fixes the modeling rules — schedules, baselines, system mappings — so results are comparable across projects. Code compliance, LEED energy credits, and many utility incentive programs all accept Appendix G results, which is why one model can serve multiple purposes.",
      },
      {
        question: "Prescriptive vs. performance — which path is better?",
        answer: "It depends on the building. Prescriptive compliance is simpler and cheaper to document — ideal for straightforward buildings that meet every requirement comfortably. The performance path costs more in modeling but allows trade-offs, which pays off for complex, highly glazed, or mixed-use buildings where prescriptive compliance would force expensive overdesign. We recommend the path during early design based on the building's characteristics and the owner's goals.",
      },
      {
        question: "Does ASHRAE 90.1 cover residential buildings?",
        answer: "Only high-rise residential — generally four stories and above. Low-rise residential falls under the IECC's residential provisions instead. Mixed-use buildings with both commercial and residential portions need to apply the right provisions to each part, which is a common source of confusion we sort out during the compliance strategy.",
      },
    ],
    sections: [
      {
        heading: "The concise answer",
        body: "ASHRAE 90.1 shapes commercial energy compliance by defining the minimum efficiency of every energy-using system in the building and the two legal ways to prove it: meet each prescriptive requirement, or model the whole building and beat the Energy Cost Budget. Its Appendix G method extends that modeling into a performance rating used for green certification and incentive programs. Because so many jurisdictions and programs reference it, designing to 90.1 is the closest thing the industry has to a universal energy compliance strategy.\n\nThe strategic point for owners: an energy model built for code compliance can be leveraged for LEED points, utility rebates, and design optimization at marginal extra cost — but only if the modeling scope is planned upfront. A model built narrowly for the permit can't easily be extended later. We scope the model for every intended use at the start.",
      },
      {
        heading: "One model, three uses",
        body: "The highest-value energy models serve code compliance, certification, and incentives simultaneously. The code model proves the building meets the adopted 90.1 edition. The same Appendix G framework feeds LEED energy credits, where the percentage improvement over baseline translates directly into points. And many utilities accept the modeled savings as the basis for custom rebates — real money tied to the same simulation.\n\nThis only works when the design team commits early. The model needs to reflect actual proposed systems, not placeholders, which means mechanical and envelope decisions have to be real before the model is final. We sequence it so the model informs design choices — glazing ratios, equipment selection, lighting power — while changes are still cheap, then finalizes into the compliance documentation the jurisdiction reviews. Done in that order, the model pays for itself; done backwards, it's just permit paperwork.",
      },
      {
        heading: "ASHRAE 90.1 project checklist",
        body: "Set these decisions early and the energy scope delivers value instead of just checking a box.",
        bullets: [
          "Confirm the adopted 90.1 edition and local amendments for the jurisdiction",
          "Decide prescriptive vs. Energy Cost Budget path based on building complexity",
          "Scope the energy model for every intended use: code, certification, and incentives",
          "Freeze envelope, glazing, and major equipment selections before final modeling",
          "Use early model runs to optimize design while changes are still inexpensive",
          "Deliver compliance documentation matched to the reviewer's expected format",
        ],
      },
    ],
    extraLinks: [
      { label: "Energy modeling vs Title 24", href: "/answers/energy-modeling-vs-title-24/" },
      { label: "How does energy code compliance work?", href: "/answers/how-does-energy-code-compliance-work/" },
      { label: "Net-zero energy building engineering", href: "/answers/net-zero-energy-building-engineering/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "ipc-plumbing-code-requirements-explained",
    title: "What Does the International Plumbing Code Require for Buildings?",
    description: "International Plumbing Code essentials: fixture counts by occupancy, water distribution and DWV sizing, venting, backflow protection, and special-case triggers.",
    h1: "What Does the International Plumbing Code Require for Buildings?",
    answer: "The International Plumbing Code governs everything water touches in your building: how many plumbing fixtures each occupancy needs, how water distribution piping is sized and pressurized, how drain-waste-vent systems carry waste away, and how the potable water supply is protected from contamination. Fixture counts come from occupancy-based tables — a restaurant, an office, and a school with the same square footage need very different numbers of water closets and lavatories — and getting them wrong is one of the most common plan-check corrections we see on commercial projects.\n\nBeyond fixtures, the IPC work that drives engineering hours is in the sizing and the special cases. Water distribution must deliver adequate pressure at the hydraulically farthest fixture; DWV piping needs correct sizing, slope, and venting so traps don't siphon and waste flows reliably; and backflow prevention assemblies protect the public water supply wherever contamination is possible — irrigation, commercial kitchens, medical and laboratory spaces. High-rise buildings, commercial kitchens, and health care occupancies each trigger additional requirements, which is why we ask about the operation early: the plumbing design follows the use of the building, not just its floor plan.",
    directAnswer: "The IPC sets fixture counts by occupancy, water distribution and DWV sizing rules, venting, and backflow protection for potable water — with extra requirements for kitchens, medical, and high-rise buildings.",
    topic: "MEP",
    serviceHref: "/services/mep/",
    faqs: [
      {
        question: "How are plumbing fixture counts determined?",
        answer: "The IPC's fixture table assigns required numbers of water closets, lavatories, drinking fountains, and other fixtures based on the occupancy classification and the occupant load. Different occupancies have different ratios — assembly, business, educational, and mercantile each compute differently — and separate facilities for each sex are generally required above certain occupant thresholds. Our engineers run the fixture calculation from the code occupancy and occupant load, not from rules of thumb.",
      },
      {
        question: "What is backflow prevention and when is it required?",
        answer: "Backflow prevention stops contaminated water from flowing backward into the potable supply when pressure conditions reverse. The IPC requires approved backflow assemblies where contamination hazards exist: irrigation systems, commercial kitchens, medical and dental facilities, laboratories, boiler chemical feeds, and fire sprinkler connections, among others. The assembly type depends on the hazard level, and most jurisdictions require annual testing by a certified tester.",
      },
      {
        question: "What is a DWV system?",
        answer: "Drain, waste, and vent — the piping network that carries wastewater out of the building and vents the system so traps hold their water seals. The IPC sets pipe sizing based on fixture units, minimum slopes so solids keep moving, vent sizing and configuration so negative pressure doesn't siphon traps dry, and cleanout locations for maintenance. Undersized or poorly vented DWV is a chronic source of odors, slow drains, and inspection failures.",
      },
      {
        question: "Does the IPC cover storm drainage?",
        answer: "Yes, the IPC includes a storm drainage chapter covering roof drains, leaders, and building storm sewers sized for the local rainfall rate. Some jurisdictions handle stormwater separately through civil requirements, so our engineers coordinate the building storm drainage with the site civil design to make sure pipe sizes, discharge points, and detention requirements all agree at the property line.",
      },
    ],
    sections: [
      {
        heading: "The concise answer",
        body: "The IPC requires buildings to provide the code-mandated number and type of plumbing fixtures for their occupancy, distribute potable water at adequate pressure to every fixture, remove wastewater through properly sized and vented DWV piping, protect the water supply with backflow prevention where hazards exist, and manage storm drainage from the roof to the site system. Water heaters, interceptors for grease and oil, and special wastes each get dedicated provisions.\n\nFor project planning, plumbing engineering scales with the building's use. An office building's plumbing is largely fixtures and distribution; a restaurant adds grease interceptors, indirect waste, and backflow assemblies; a medical building adds medical gas coordination, special drainage, and stricter backflow rules. Defining the operation early lets the plumbing scope — and its cost — be estimated accurately instead of discovered during design.",
      },
      {
        heading: "Where plumbing designs get redlined",
        body: "Fixture counts top the list. They're pure arithmetic from the code tables, yet they generate corrections constantly — usually because the occupant load or occupancy classification used in the calculation doesn't match the architectural code analysis. We reconcile our fixture count against the architect's occupant load before submitting, which eliminates the most common correction outright.\n\nVenting is the second chronic issue. Every trap needs vent protection, and the vent sizing and distance rules are unforgiving — a lavatory too far from its vent fails inspection even if everything else is perfect. Backflow prevention is third: missing assemblies, wrong assembly types for the hazard, or no plan for the required annual testing. And on the water side, inadequate pressure at remote fixtures shows up when distribution piping is sized by habit rather than calculation. Each of these is preventable with a complete plumbing design instead of a fixture layout alone.",
      },
      {
        heading: "Plumbing code checklist",
        body: "Cover these in the plumbing design and the IPC scope stays clean through plan check and inspection.",
        bullets: [
          "Run fixture counts from the code occupancy and reconciled occupant load",
          "Size water distribution by calculation to prove pressure at the farthest fixture",
          "Verify every trap has vent protection within the code's distance limits",
          "Specify the correct backflow assembly type for each hazard location",
          "Include grease, oil, and solids interceptors where the operation requires them",
          "Coordinate building storm drainage with the civil site design at the property line",
        ],
      },
    ],
    extraLinks: [
      { label: "Plumbing fixture counts, code explained", href: "/answers/plumbing-fixture-counts-code-explained/" },
      { label: "Backflow prevention design explained", href: "/answers/backflow-prevention-design-explained/" },
      { label: "Plumbing design for high-rise buildings", href: "/answers/plumbing-design-high-rise-buildings/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "imc-mechanical-code-requirements-explained",
    title: "What Does the International Mechanical Code Require for HVAC?",
    description: "International Mechanical Code essentials: ventilation rates, exhaust, combustion air, refrigeration machinery rooms, and commercial kitchen hood requirements.",
    h1: "What Does the International Mechanical Code Require for HVAC?",
    answer: "The International Mechanical Code is the rulebook for HVAC and related systems in commercial buildings: how much outdoor ventilation air each space needs, how exhaust systems handle kitchens, restrooms, and hazardous processes, how combustion air reaches fuel-burning equipment, and how refrigeration machinery rooms stay safe. Ventilation rates come from occupancy-based tables keyed to people and floor area — an office, a classroom, and a salon have very different air requirements — and the code sets both the rates and how that air gets delivered and distributed.\n\nThe heavy engineering lives in the special systems. Commercial kitchen exhaust means Type I hoods over grease-producing equipment with fire suppression and dedicated makeup air; boiler and water-heater rooms need combustion air sized to the equipment's fuel input; refrigeration machinery rooms have refrigerant concentration limits, alarming, and emergency ventilation. We see the most plan-check friction where trades overlap — the kitchen hood, the makeup air unit, and the fire suppression all have to agree with each other — so our mechanical engineers coordinate those interfaces on the drawings, not in the field where changes cost ten times more.",
    directAnswer: "The IMC sets ventilation rates by occupancy, exhaust and combustion-air rules, refrigeration machinery room safety, and commercial kitchen hood requirements — the core mechanical code for commercial HVAC design.",
    topic: "MEP",
    serviceHref: "/services/mep/",
    faqs: [
      {
        question: "How are ventilation rates determined under the IMC?",
        answer: "The IMC's ventilation table assigns outdoor air rates by occupancy, combining a per-person component with a per-square-foot area component. The design uses the expected occupant count — or the code default where it's higher — plus the floor area to compute the required outdoor airflow for each space, then the HVAC design delivers it through the ventilation system. Densely occupied spaces like classrooms and assembly areas need far more air per square foot than offices.",
      },
      {
        question: "What is the difference between Type I and Type II kitchen hoods?",
        answer: "Type I hoods go over equipment producing grease or smoke — fryers, grills, broilers — and require integral fire suppression plus grease duct construction and clearances. Type II hoods handle heat and steam without grease — dishwashers, pasta cookers — with lighter requirements. Misclassifying cooking equipment under the wrong hood type is a common and expensive correction, since the ductwork, suppression, and clearances all change.",
      },
      {
        question: "What is makeup air and why does it matter?",
        answer: "Makeup air replaces the air that exhaust systems remove from the building. Without it, powerful kitchen or process exhaust drives the building negative — doors get hard to open, backdrafting can pull flue gases from water heaters, and the exhaust equipment itself underperforms. The IMC requires makeup air for significant exhaust systems, and our engineers size and temper it so the building stays balanced in every operating mode.",
      },
      {
        question: "Does the IMC cover residential HVAC?",
        answer: "One- and two-family dwellings and townhouses generally fall under the International Residential Code instead. The IMC governs commercial buildings and residential buildings outside the IRC's scope, like apartment buildings over three stories. Mixed-use projects need the boundary between the two codes mapped clearly so each portion gets the right requirements.",
      },
    ],
    sections: [
      {
        heading: "The concise answer",
        body: "The IMC requires commercial buildings to deliver code-mandated outdoor ventilation to every occupied space, exhaust contaminants at their source through systems designed for each process, supply combustion air to fuel-burning equipment, keep refrigeration machinery rooms within safe refrigerant concentration limits, and capture commercial cooking effluent with properly classified hoods, grease ductwork, and fire suppression. Duct construction, insulation, controls, and equipment installation each carry detailed provisions.\n\nFor owners, the takeaway is that mechanical code compliance is inseparable from equipment selection. The ventilation rates, exhaust volumes, and combustion air openings all derive from the actual equipment scheduled — change a fryer lineup or upsize a boiler and the code calculations change with it. We finalize equipment selections before completing the mechanical code analysis so the permit set reflects what's actually being installed.",
      },
      {
        heading: "The systems that generate the most plan-check comments",
        body: "Commercial kitchens lead the list. Hood classification, grease duct routing with required clearances to combustibles, makeup air quantities, and fire suppression integration each get scrutinized — and the kitchen consultant, the mechanical engineer, and the fire protection designer all touch the same systems. We coordinate those three disciplines explicitly on restaurant and food-service projects because assumptions made in isolation are what generate corrections.\n\nCombustion air is second: boiler and water-heater rooms need openings sized to the total fuel input, with specific rules for indoor versus outdoor air and for rooms with multiple appliances. Refrigeration machinery rooms are third — refrigerant quantity limits, leak detection, and emergency exhaust are life-safety items reviewers check closely. And ventilation calculations round out the list: reviewers verify the occupancy assumptions and the math, so the rates table, occupant counts, and system airflow all have to tell the same story.",
      },
      {
        heading: "Mechanical code checklist",
        body: "Address these in the mechanical design and the IMC scope passes review without rework.",
        bullets: [
          "Compute ventilation from the IMC rates table using verified occupancies and occupant counts",
          "Classify cooking equipment correctly and coordinate Type I hoods with fire suppression",
          "Size and temper makeup air for every significant exhaust system",
          "Provide combustion air openings sized to total fuel input for boiler and heater rooms",
          "Design refrigeration machinery rooms for refrigerant limits, detection, and emergency exhaust",
          "Lock equipment selections before finalizing code calculations and the permit set",
        ],
      },
    ],
    extraLinks: [
      { label: "Commercial kitchen makeup air design", href: "/answers/commercial-kitchen-makeup-air-design/" },
      { label: "Chilled water vs DX HVAC", href: "/answers/chilled-water-vs-dx-hvac/" },
      { label: "Condensate drain design for HVAC", href: "/answers/condensate-drain-design-hvac/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "ifc-fire-code-requirements-explained",
    title: "What Does the International Fire Code Require for Buildings?",
    description: "The International Fire Code governs fire safety in occupied buildings: hazardous materials, storage, fire protection systems, and required operational permits.",
    h1: "What Does the International Fire Code Require for Buildings?",
    answer: "The International Fire Code is the code that governs fire safety in buildings as they exist and operate, not just as they're drawn. Where the building code sets the rules for designing and constructing a building, the IFC picks up once the building is occupied: it regulates hazardous materials storage and handling, high-piled combustible storage, the inspection, testing, and maintenance of fire protection systems, and the operational permits a business needs for certain hazards. For owners and developers, the IFC is the code that shows up at the fire marshal's inspection, not at the building department counter.\n\nWe interact with the IFC most when the building code isn't the whole story. Our engineers design high-piled storage layouts and commodity classifications around the IFC's storage chapters, coordinate hazmat control areas and maximum allowable quantities with the fire code official, and design fire protection systems knowing the IFC will govern their testing and maintenance for the life of the building. The practical split I explain to clients: the building code asks how it was built, and the fire code asks how it's being used — and whether that use is still safe.",
    directAnswer: "The International Fire Code governs fire safety during a building's operation — hazardous materials, high-piled storage, fire protection system maintenance, and operational permits — while the building code governs design and construction. Engineers design storage, hazmat, and fire protection features to satisfy both.",
    topic: "Fire Protection",
    serviceHref: "/services/mep/",
    faqs: [
      {
        question: "What is the difference between the IFC and the IBC?",
        answer: "The IBC governs how buildings are designed and constructed — structure, egress, construction type, and built-in fire protection. The IFC governs how buildings are operated and maintained — hazardous materials, storage arrangements, system testing and maintenance, and hazardous operations. Most jurisdictions adopt both, and they are enforced by different offices: the building department and the fire prevention bureau.",
      },
      {
        question: "Who enforces the fire code on a project?",
        answer: "Typically the fire marshal or fire prevention bureau. They review certain features during design — storage plans, hazmat layouts, fire access — and then inspect the occupied building on a recurring cycle. Their authority is separate from the building department's permit review, which is why a project can clear plan check and still face fire code corrections.",
      },
      {
        question: "Does my business need a fire code operational permit?",
        answer: "It depends on what you store and do. The IFC lists operations that require permits — storing or using hazardous materials above threshold quantities, high-piled combustible storage, certain manufacturing and repair processes. The fire code official makes the final call for your jurisdiction, so we confirm applicability early rather than discovering a permit gap at inspection.",
      },
      {
        question: "Do engineers design to the fire code or the building code?",
        answer: "Both. The building code drives construction requirements like sprinklers, fire barriers, and egress. The fire code drives operational features like storage arrangement, hazmat control areas, and the testing and maintenance regime for fire protection systems. Fire protection engineers coordinate the two so the designed building can actually be operated legally.",
      },
    ],
    sections: [
      {
        heading: "The concise answer",
        body: "The International Fire Code is a model code published by the International Code Council that regulates fire safety in new and existing buildings from the operations side. Its chapters cover general precautions, emergency planning, fire protection systems, means of egress maintenance, hazardous materials, and specialized hazards like high-piled storage, spray finishing, and industrial processes. Jurisdictions adopt it with local amendments, and it is enforced alongside — not instead of — the building code.\n\nThe distinction that matters for project planning is timing. Building code compliance is demonstrated once, at permit, through drawings and calculations. Fire code compliance is demonstrated continuously: through operational permits that renew, through required inspection and testing intervals for sprinklers, alarms, and extinguishers, and through the fire department's ongoing right to inspect. A building that was fully code-compliant on the day it opened can fall out of fire code compliance the day a tenant changes what they store.",
      },
      {
        heading: "Where the fire code actually touches engineering work",
        body: "The deepest engineering overlap is in storage and hazardous materials. High-piled storage design — rack layouts, aisle widths, commodity classification, and sprinkler protection criteria — is fundamentally an IFC exercise, and getting the commodity class wrong can mean a sprinkler system that is legal on paper and inadequate in a fire. Hazardous materials work runs the same way: the IFC sets maximum allowable quantities per control area, and when a process exceeds them, the engineering response is a higher-hazard occupancy classification or additional control areas with rated separation.\n\nFire protection system design also lives in both codes at once. The building code triggers the requirement for sprinklers or alarms, the referenced NFPA standards define how they are designed and installed, and the IFC defines how they are inspected, tested, and maintained for the next fifty years. We design with that maintenance regime in mind — valve access, testing provisions, and documentation — because a system the owner cannot test is a system that drifts out of compliance.",
      },
      {
        heading: "Keeping your project on the right side of the fire code",
        body: "Fire code problems almost always come from a change nobody flagged: a new tenant, a new product line, a new storage method. The building was fine; the use changed. Treat the fire code as a living obligation, not a one-time hurdle.\n\nHere is how we keep clients out of fire code trouble.",
        bullets: [
          "Identify fire code permits early: hazmat, high-piled storage, and hazardous processes before lease or build-out decisions",
          "Classify commodities honestly: storage protection design stands or falls on the correct commodity class",
          "Track maximum allowable quantities: know your hazmat inventory against the IFC thresholds per control area",
          "Design for testability: valves, drains, and access that make the IFC's inspection intervals practical",
          "Re-check on every tenant change: a new use can re-trigger the whole fire code analysis",
        ],
      },
    ],
    extraLinks: [
      { label: "Fire sprinkler hydraulic design explained", href: "/answers/fire-sprinkler-hydraulic-design-explained/" },
      { label: "Fire alarm vs sprinkler design: what's the difference?", href: "/answers/fire-alarm-vs-sprinkler-design/" },
      { label: "Most common plan check corrections", href: "/answers/most-common-plan-check-corrections/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "ada-accessibility-engineering-requirements",
    title: "How Does ADA Accessibility Shape Engineering Design Work?",
    description: "ADA accessibility runs through site grading, parking, ramps, and routes — here's how engineers build the 2010 ADA Standards into real projects from day one.",
    h1: "How Does ADA Accessibility Shape Engineering Design Work?",
    answer: "ADA accessibility shapes engineering design because access is a civil engineering problem before it is an architectural one. The 2010 ADA Standards for Accessible Design set the technical requirements — accessible routes, ramp slopes, parking configurations, door maneuvering clearances, restroom layouts — but on a real site, those requirements land on grading plans, parking lot geometry, sidewalk profiles, and curb ramp details. An accessible route that climbs too steeply or ponds water at the curb ramp fails in the field even when it passes on paper, and that is squarely an engineering coordination issue.\n\nWe build accessibility into the site and building design from the first grading concept, not as a correction at the end. Our civil work sets accessible parking closest to accessible entrances, holds walkway slopes within limits while still draining the site, and details curb ramps that actually connect to the pedestrian network. Inside the building, we coordinate with the architect on restroom plumbing layouts and clearances. The goal I set for every project: a person using a wheelchair should be able to arrive, park, enter, and use the facility without encountering a single engineered barrier.",
    directAnswer: "ADA accessibility requirements from the 2010 ADA Standards shape engineering through site grading, accessible parking, ramps, walkways, and restroom layouts. Engineers coordinate slopes, drainage, clearances, and routes from the first design concept, and state codes can add stricter requirements on top.",
    topic: "Accessibility",
    serviceHref: "/services/civil/",
    faqs: [
      {
        question: "What is the difference between the ADA Standards and state accessibility codes?",
        answer: "The 2010 ADA Standards for Accessible Design are the federal baseline. Many states adopt their own accessibility codes that are stricter in places — California's Chapter 11B is the best-known example. The rule is simple: comply with both, and where they differ, the more restrictive requirement governs. We always check the state amendments before finalizing accessible details.",
      },
      {
        question: "Which parts of accessibility are the engineer's responsibility?",
        answer: "Civil engineers typically own the site side: accessible parking layout and signage, accessible routes, curb ramps, walkway slopes, and grading that drains without creating barriers. Architects typically own the building interior — doors, restrooms, counters. Plumbing engineers coordinate restroom fixture layouts and clearances. The handoff between site and building is where most failures happen, so we coordinate it explicitly.",
      },
      {
        question: "Does ADA apply to existing buildings being renovated?",
        answer: "Yes, with nuance. Alterations must make the altered areas accessible, and there are requirements to make the path of travel to the altered area accessible up to a proportionality limit. Full new-construction standards generally do not retroactively apply to untouched areas, but any renovation is an opportunity — and an obligation — to remove barriers where the standards require it.",
      },
      {
        question: "What is the most common ADA failure engineers see in the field?",
        answer: "Slopes. Walkways and ramps that exceed the maximum running slope or cross slope, usually because grading was value-engineered or field-adjusted without rechecking accessibility. A tenth of a percent over the limit at a curb ramp is still a violation, and it is one of the most cited issues in accessibility complaints and lawsuits.",
      },
    ],
    sections: [
      {
        heading: "The concise answer",
        body: "The 2010 ADA Standards for Accessible Design establish the technical requirements for accessible buildings and sites: accessible routes connecting parking to entrances, ramps with maximum 1:12 slopes and level landings, accessible parking spaces including van-accessible spaces with access aisles, curb ramps with detectable warnings, and detailed requirements for doors, restrooms, drinking fountains, and counters. The Architectural Barriers Act standards apply similar requirements to federal facilities.\n\nFor engineers, the critical insight is that most of these are geometric requirements, and geometry is what civil engineers control. A parking lot that drains toward the accessible spaces, a walkway whose cross slope exceeds the limit to shed water, a curb ramp that lands in a ponding area — these are all design decisions with accessibility consequences. Accessibility compliance is won or lost in grading and detailing long before the architect places a grab bar.",
      },
      {
        heading: "How accessibility gets engineered into a project",
        body: "We start with the accessible route as a spine: from the public way and transit stops, through accessible parking, to the accessible entrance, and into the building. Every segment of that spine gets a slope check — running slope and cross slope — and a width and surface check. Accessible parking goes closest to the accessible entrance, on the flattest ground the site offers, with access aisles, signage, and a route that never forces a wheelchair user through traffic.\n\nThe hard part is the tension between drainage and accessibility. Water needs slope; wheelchairs need flat. Resolving that tension is genuine engineering: strategic grading that moves water while holding accessible routes within limits, trench drains at critical transitions, and curb ramp details that tie into the gutter without creating a lip or a pond. We also coordinate the building threshold carefully — the handoff from civil's sidewalk to the architect's entrance — because a half-inch lip there defeats the entire route.",
      },
      {
        heading: "Accessibility coordination checklist",
        body: "Accessibility failures are coordination failures. The standards are clear; what breaks is the handoff between disciplines, or between design and construction. This is the checklist we run before documents go out.\n\nConfirm each of these on every project with public access.",
        bullets: [
          "Continuous accessible route: public way to parking to entrance to interior, with no gaps or barriers",
          "Slopes verified on plans and in the field: walkways, ramps, landings, and curb ramps within limits",
          "Accessible parking correct: count, van spaces, access aisles, signage, and closest-to-entrance placement",
          "Drainage resolved: no ponding on accessible routes, ramps, or at curb ramp landings",
          "Restroom coordination: fixture layouts, clearances, and plumbing rough-in match the accessibility details",
          "State amendments checked: local code requirements that exceed the federal ADA baseline",
        ],
      },
    ],
    extraLinks: [
      { label: "Parking lot ADA design requirements", href: "/answers/parking-lot-ada-design-requirements/" },
      { label: "Sidewalk ADA compliance for commercial sites", href: "/answers/sidewalk-ada-compliance-commercial/" },
      { label: "What is a certificate of occupancy?", href: "/answers/what-is-a-certificate-of-occupancy/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "ibc-occupancy-classifications-explained",
    title: "How Do IBC Occupancy Classifications Drive Building Design?",
    description: "IBC occupancy groups decide sprinklers, construction type, egress, and plumbing counts — get the classification right or everything downstream shifts.",
    h1: "How Do IBC Occupancy Classifications Drive Building Design?",
    answer: "IBC occupancy classification is the single decision that drives almost everything else in a building's code design. The International Building Code sorts every use into occupancy groups — Assembly, Business, Educational, Factory, High-hazard, Institutional, Mercantile, Residential, Storage, and Utility — and each group carries its own thresholds for sprinklers, allowable height and area, egress design, and plumbing fixture counts. Classify a space wrong and the construction type, the sprinkler requirement, and the exit design can all shift under you.\n\nWe treat occupancy classification as the first code decision on every project, made deliberately and documented clearly. Our engineers map each space to its group, check for mixed occupancies and accessory uses, and confirm the classification with the authority having jurisdiction before the design develops around it. The cost of getting it right early is a conversation; the cost of getting it wrong late is redesign. When a client tells me their project is 'just' a warehouse or 'just' an office, I slow the conversation down — that one word determines the entire code path. It also affects plumbing fixture counts, fire alarm thresholds, and even structural live loads in some cases — occupancy classification is the root of the code tree, and every branch inherits its assumptions.",
    directAnswer: "The IBC classifies every building use into occupancy groups (A, B, E, F, H, I, M, R, S, U), and that classification drives sprinkler requirements, allowable height and area, construction type, egress, and plumbing counts. Correct early classification prevents expensive redesign.",
    topic: "Building Code",
    serviceHref: "/services/",
    faqs: [
      {
        question: "What are the main IBC occupancy groups?",
        answer: "Group A (assembly, A-1 through A-5), B (business), E (educational), F (factory, F-1 and F-2), H (high-hazard, H-1 through H-5), I (institutional, I-1 through I-4), M (mercantile), R (residential, R-1 through R-4), S (storage, S-1 and S-2), and U (utility). Each has subcategories with different hazard levels — for example, H-2 (deflagration hazard) is treated very differently from H-4 (health hazard).",
      },
      {
        question: "Why does occupancy classification matter so much?",
        answer: "Because nearly every major code requirement keys off it. Sprinkler thresholds in IBC Section 903, allowable height and area tables, occupant load factors for egress, fire separation requirements, and plumbing fixture counts all vary by occupancy. Change the occupancy and you change the answers to all of those questions at once.",
      },
      {
        question: "Who decides the occupancy classification?",
        answer: "The design team proposes it and the authority having jurisdiction — the building official — confirms or corrects it. For ambiguous uses, we document the reasoning and confirm early with the jurisdiction, because a plan reviewer reclassifying the building at permit is one of the most expensive surprises in a project.",
      },
      {
        question: "Can one building have more than one occupancy?",
        answer: "Yes, and most commercial buildings do. The IBC provides three approaches for multiple occupancies in one building: accessory occupancies, nonseparated occupancies, and separated occupancies. Each has different implications for fire separation, sprinklers, and allowable area — the choice is a real design decision, not just paperwork.",
      },
    ],
    sections: [
      {
        heading: "The concise answer",
        body: "IBC Chapter 3 defines ten occupancy groups based on the use of a building or portion of a building and the relative hazard that use presents. Assembly covers gatherings, Business covers offices, Educational covers schools, Factory covers manufacturing, High-hazard covers dangerous materials and processes, Institutional covers occupancies where occupants need assistance or are detained, Mercantile covers retail, Residential covers sleeping uses, Storage covers warehousing, and Utility covers accessory and miscellaneous uses.\n\nThe classification drives the code analysis in a fixed sequence. First it determines which sprinkler thresholds apply. Then it sets the allowable height, stories, and area for each candidate construction type. Then it feeds the egress design through occupant load factors and exit requirements. Getting the classification right is the foundation the rest of the code analysis is built on — every downstream decision inherits its assumptions.",
      },
      {
        heading: "How classification errors actually happen",
        body: "Classification errors rarely come from not knowing the groups exist — they come from uses that straddle groups. A brewery with a tasting room is manufacturing plus assembly. A church with a school is assembly plus educational. A maker space with retail is factory plus mercantile. Each of those combinations has a correct IBC treatment, and guessing wrong means the sprinkler design, the egress design, or the allowable area was computed for the wrong building.\n\nThe other classic error is the change of use that nobody flags as one. A warehouse that becomes a gym, an office that becomes a restaurant, a retail space that becomes a daycare — each of these can change the occupancy group, and a change of occupancy triggers a fresh code analysis of the space. We see this constantly in tenant improvements, where the previous tenant's classification was fine for them and wrong for the new one. The lease gets signed, the drawings start, and then plan check asks the question nobody asked.",
      },
      {
        heading: "Getting the classification right the first time",
        body: "Occupancy classification is cheap to get right and expensive to get wrong. The discipline is to classify deliberately, document the reasoning, and confirm it before design develops around it.\n\nThis is the sequence we follow on every project.",
        bullets: [
          "Map every space to an occupancy group: no unlabeled or 'flex' space in the code analysis",
          "Identify mixed occupancies early: choose accessory, nonseparated, or separated treatment deliberately",
          "Check high-hazard triggers: materials and processes that push a space into Group H change everything",
          "Confirm with the jurisdiction: ambiguous uses get a documented answer before design development",
          "Re-check on tenant changes: a new use can mean a new occupancy and a fresh code analysis",
        ],
      },
    ],
    extraLinks: [
      { label: "Change of occupancy permit engineering", href: "/answers/change-of-occupancy-permit-engineering/" },
      { label: "What is a certificate of occupancy?", href: "/answers/what-is-a-certificate-of-occupancy/" },
      { label: "Most common plan check corrections", href: "/answers/most-common-plan-check-corrections/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "ibc-types-of-construction-explained",
    title: "How Do the IBC Types of Construction I\u2013V Shape a Building?",
    description: "IBC construction Types I through V set fire-resistance ratings and allowable materials — the choice constrains building height, area, structure, and cost.",
    h1: "How Do the IBC Types of Construction I\u2013V Shape a Building?",
    answer: "The IBC's five types of construction — I, II, III, IV, and V, each in A and B variants — define how fire-resistant a building's structure must be and what materials it can be built from. Type I is the most fire-resistant, with noncombustible construction and the highest hourly ratings; Type V-B is the least, allowing wood framing with no required fire resistance. Everything in between trades fire resistance for cost and material flexibility, and the type you select sets hard limits on how tall and how large the building can be.\n\nWe treat construction type selection as one of the earliest structural and cost decisions on a project. Our engineers weigh the allowable height and area each type permits against the construction cost each type demands — a Type I high-rise frame costs far more per square foot than a Type V-B wood building, but only the rated types can reach certain heights. The right answer is the least expensive type that legally and safely does the job. Picking too low means a redesign at plan check; picking too high means the client paid for fire resistance the code never required.",
    directAnswer: "The IBC defines construction Types I through V (A and B variants) by required fire-resistance ratings and permitted materials, from fully noncombustible Type I to wood-framed Type V-B. The selected type limits allowable height and area and strongly influences structural design and cost.",
    topic: "Building Code",
    serviceHref: "/services/structural/",
    faqs: [
      {
        question: "What is the difference between Type A and Type B construction?",
        answer: "Type A is the protected variant — structural elements require fire-resistance ratings, typically achieved with rated assemblies, spray-applied fireproofing, or inherently rated materials. Type B is the unprotected variant, where most structural elements require no fire-resistance rating. Type I-A is the most protected construction in the code; Type V-B, unprotected wood frame, is the least.",
      },
      {
        question: "What materials are allowed in each construction type?",
        answer: "Types I and II require noncombustible construction — steel, concrete, masonry. Type III requires noncombustible exterior walls but allows any permitted material inside. Type IV is heavy timber or mass timber construction. Type V allows any material permitted by the code, which in practice means wood framing for most Type V buildings.",
      },
      {
        question: "What is Type IV mass timber construction?",
        answer: "Recent IBC editions added Type IV-A, IV-B, and IV-C to recognize mass timber — cross-laminated timber, glulam, and similar engineered wood products — as a distinct construction type with its own height, area, and fire-protection rules. It allows taller wood buildings than traditional heavy timber by combining mass timber's inherent fire behavior with encapsulation and sprinkler requirements.",
      },
      {
        question: "Can the construction type change during design?",
        answer: "It can, but it is painful. Changing construction type changes the fire-resistance ratings of nearly every structural element, the allowable height and area, and often the structural system itself. We lock the construction type during schematic design precisely because late changes cascade through the structural drawings, the fire protection strategy, and the budget.",
      },
    ],
    sections: [
      {
        heading: "The concise answer",
        body: "IBC Chapter 6 establishes the five construction types, and Table 601 sets the required fire-resistance ratings for the structural frame, floors, roofs, and exterior walls of each. The ratings step down from Type I-A through Type V-B, and the allowable materials broaden as the ratings drop. The type works together with the occupancy classification to determine allowable height, number of stories, and floor area through the tables in Chapter 5 — a more fire-resistant type buys more height and area for a given occupancy.\n\nThe engineering consequence is direct: the construction type dictates the structural system options. A Type I building needs a rated steel or concrete frame. A Type V-B building can be conventional wood framing. Type III means noncombustible exterior walls — typically masonry or concrete — with wood or steel inside. The structural engineer cannot select members and systems freely; the construction type draws the boundaries first.",
      },
      {
        heading: "How type selection drives cost and design",
        body: "The fundamental trade is fire resistance against construction cost. Rated construction costs more — fireproofing steel, rated assemblies, noncombustible materials, and the detailing and inspection they require all add dollars per square foot. But rated construction also buys height and area: for many occupancies, the only way to build taller or larger on a given site is to step up a construction type rather than shrink the program.\n\nSprinklers complicate the trade in the client's favor. The code grants height and area increases for sprinklered buildings that can make a lower construction type work where an unsprinklered building would need a higher one. We run these combinations explicitly — type plus sprinklered or unsprinklered — against the Chapter 5 tables to find the minimum compliant type, then check that the structural system it implies is buildable and economical. The cheapest compliant answer wins, and it is almost never the answer anyone guessed at the first meeting.",
      },
      {
        heading: "Construction type decision checklist",
        body: "Construction type is a schematic-design decision with construction-document consequences. Lock it early, document the reasoning, and verify it against the tables rather than memory.\n\nWork through these before the type is finalized.",
        bullets: [
          "Classify occupancy first: allowable height and area tables need both occupancy and type",
          "Test sprinklered and unsprinklered: sprinkler increases often allow a lower, cheaper type",
          "Match type to structural system: the implied frame must be one the engineer can actually design",
          "Check the exterior walls: Type III and some others impose noncombustible exterior requirements",
          "Document the selection: table references and assumptions, so plan check sees the logic",
        ],
      },
    ],
    extraLinks: [
      { label: "Fire-rated assemblies explained", href: "/answers/fire-rated-assemblies-explained/" },
      { label: "What is a structural load path?", href: "/answers/what-is-a-structural-load-path/" },
      { label: "How much does structural engineering cost?", href: "/answers/how-much-does-structural-engineering-cost/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "ibc-egress-requirements-explained",
    title: "How Do IBC Means of Egress Rules Actually Work in Design?",
    description: "IBC means of egress design runs from occupant load through exit counts, travel distance, and stairs — how engineers keep building occupants moving safely out.",
    h1: "How Do IBC Means of Egress Rules Actually Work in Design?",
    answer: "IBC means of egress design is the engineering of getting everyone out of a building safely — and it starts with a number most people never see: the occupant load. The code assigns every use a load factor, we divide the floor area by it, and the resulting occupant count drives everything downstream: how many exits are required, how wide they must be, how far anyone may travel to reach one, and whether exit stairs need to be enclosed. Egress is a system with three parts — exit access, the exit itself, and exit discharge — and the code regulates each one.\n\nWe design egress as a continuous, verifiable path on every project. Our team calculates occupant loads room by room, lays out exits to satisfy number, remoteness, and travel distance simultaneously, and details stairs, doors, and corridors so the built result matches the analysis. The pitfalls are consistent: dead-end corridors, common paths of travel that are too long, doors that swing the wrong way, and exit paths that look fine on plan but fail in three dimensions. Egress is life safety — it gets the same rigor we give the structure, because the consequences of getting it wrong are measured in lives.",
    directAnswer: "The IBC requires a continuous egress path — exit access, exit, and exit discharge — sized from the occupant load, with regulated numbers of exits, travel distances, stair enclosures, and door hardware. Engineers calculate loads, lay out exits for remoteness and distance, and detail every component.",
    topic: "Life Safety",
    serviceHref: "/services/",
    faqs: [
      {
        question: "What are the three parts of a means of egress?",
        answer: "Exit access — the path from anywhere in the building to an exit, like corridors and aisles. The exit — the protected portion, typically an enclosed stairway or a door leading directly outside. And exit discharge — the path from the exit to the public way. The code requires all three to be continuous, unobstructed, and properly illuminated and marked.",
      },
      {
        question: "How is occupant load calculated?",
        answer: "By dividing the floor area of each space by the occupant load factor for its use, from IBC Table 1004.5. Assembly uses have dense factors, offices and retail are in the middle, warehouses are sparse. The total drives the required number of exits, the required exit width, and plumbing fixture counts — it is one of the most leveraged numbers in the code.",
      },
      {
        question: "How many exits does a building need?",
        answer: "It depends on the occupant load and the occupancy. Small spaces can have a single exit; larger occupant loads require two, three, or more, per IBC Section 1006. Exits must also be remotely located from each other — measured along the diagonal of the space — so a single fire cannot block them all. Counting exits is easy; placing them remotely is the real design work.",
      },
      {
        question: "What is the most common egress design mistake?",
        answer: "Dead-end corridors and excessive common path of travel. A corridor that forces occupants past the fire to reach an exit, or a path where everyone funnels through one route for too long before the paths split, fails the code and fails the intent. We check travel distance, common path, and dead ends on every floor plan before it leaves our office.",
      },
    ],
    sections: [
      {
        heading: "The concise answer",
        body: "IBC Chapter 10 builds the means of egress from the occupant load outward. Table 1004.5 converts area to occupants; Section 1006 sets the number of exits and the single-exit allowances; Section 1017 limits travel distance, common path of travel, and dead-end corridors; and the sections on stairs, ramps, doors, and corridors set widths, enclosures, swing direction, and hardware. Exit signage, illumination, and emergency lighting complete the system so the path works in smoke and darkness.\n\nThe design logic is sequential and unforgiving. Occupant load determines exit count and width. Exit count and the floor plate determine exit placement for remoteness. Placement determines travel distance compliance. And the whole assembly must be buildable — a stair that satisfies the code on plan but cannot be constructed within the floor-to-floor height is not a design, it is a sketch. We verify the geometry in section, not just in plan.",
      },
      {
        heading: "Where egress designs actually fail",
        body: "The failures we correct most often are geometric, not conceptual. A tenant improvement carves offices into an open floor and creates a dead-end corridor that exceeds the limit. A remodel moves a door and the two exits are no longer remote from each other. A stair is drawn at the right width but the headroom or the riser-tread geometry fails the code's dimensional rules. None of these come from ignorance of the chapter — they come from changes made without re-running the egress analysis.\n\nHardware and doors are the other chronic trouble spot. Doors in the egress path must swing in the direction of travel when serving enough occupants, cannot require special knowledge or effort to open, and panic hardware is required at certain thresholds. Delayed-egress and access-controlled doors are permitted only with specific conditions met. We review door schedules against the egress plan explicitly, because a beautiful door that violates the hardware rules is a plan check correction and a life-safety defect at the same time.",
      },
      {
        heading: "Egress design verification checklist",
        body: "Egress is verified, not assumed. Every floor plan gets the same systematic check before it is issued, and again after any layout change.\n\nRun this checklist on every level of the building.",
        bullets: [
          "Occupant load calculated per space: correct load factors, totals carried to exit and fixture design",
          "Exit count and remoteness verified: enough exits, separated along the required diagonal",
          "Travel distances checked: exit access, common path, and dead ends within limits for the occupancy",
          "Stairs detailed in section: risers, treads, headroom, width, and enclosure ratings all compliant",
          "Doors and hardware reviewed: swing direction, panic hardware, and special locking conditions correct",
        ],
      },
    ],
    extraLinks: [
      { label: "Emergency egress lighting design", href: "/answers/emergency-egress-lighting-design/" },
      { label: "Fire alarm notification design", href: "/answers/fire-alarm-notification-design/" },
      { label: "How does plan check resubmittal work?", href: "/answers/how-does-plan-check-resubmittal-work/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "ibc-mixed-occupancy-requirements-explained",
    title: "How Do the IBC Mixed Occupancy Rules Change Your Design?",
    description: "Separated, nonseparated, or accessory: the IBC's three mixed-occupancy approaches decide fire separation ratings, sprinkler scope, and allowable building area.",
    h1: "How Do the IBC Mixed Occupancy Rules Change Your Design?",
    answer: "The IBC's mixed occupancy rules answer a simple question with expensive consequences: when one building holds more than one use, which code requirements apply where? The code offers three approaches. Separated occupancies divide the building with rated fire barriers and let each space follow its own occupancy rules. Nonseparated occupancies skip the barriers but apply the most restrictive requirements of any occupancy throughout the whole building. Accessory occupancies let small secondary uses — under ten percent of the story area — simply follow the main occupancy's rules.\n\nWe choose the approach deliberately on every mixed-use project because the choice reshapes the design. Separated occupancies buy code simplicity at the cost of rated construction everywhere the uses meet. Nonseparated occupancies save the barriers but can force sprinklers, construction type upgrades, or egress improvements across the entire building. There is no free option — only the option whose cost lands where the project can best absorb it. I walk clients through all three with real numbers before anyone commits, because the wrong choice here is a redesign wearing a disguise. The jurisdiction's reviewers will also have a view — some plan checkers strongly prefer separated occupancies for clarity, and their preference carries real weight at permit.",
    directAnswer: "The IBC handles multiple occupancies as separated (rated barriers between uses, each follows its own rules), nonseparated (no barriers, most restrictive rules apply everywhere), or accessory (small secondary uses follow the main occupancy). The choice affects fire separation, sprinklers, construction type, and allowable area.",
    topic: "Building Code",
    serviceHref: "/services/",
    faqs: [
      {
        question: "What is a separated occupancy?",
        answer: "A design approach where different occupancies in one building are divided by fire barriers, horizontal assemblies, or both, with the required ratings from IBC Table 508.4. Each separated space then follows the code requirements of its own occupancy — its own sprinkler thresholds, allowable area, and egress rules — independent of its neighbors.",
      },
      {
        question: "What is a nonseparated occupancy?",
        answer: "A design approach with no required fire separation between occupancies, where the most restrictive requirements of any occupancy in the building apply throughout. It saves the cost of rated separations but can impose the strictest sprinkler, construction type, and height and area limits building-wide. It works best when the occupancies have similar hazard levels.",
      },
      {
        question: "What qualifies as an accessory occupancy?",
        answer: "An occupancy that is ancillary to the main occupancy and occupies no more than ten percent of the story area, per IBC Section 508.2. A small storage room in an office building or a break room in a warehouse are classic examples. Accessory occupancies are classified as part of the main occupancy, with limited exceptions for hazardous uses.",
      },
      {
        question: "How does mixed occupancy affect sprinklers?",
        answer: "Significantly. In a separated occupancy, each space is evaluated against its own sprinkler thresholds. In a nonseparated occupancy, if any occupancy requires sprinklers, the requirement typically extends through the fire area or building. Mixed-use projects often end up fully sprinklered even when individual uses would not trigger it alone — which is frequently the right economic trade anyway.",
      },
    ],
    sections: [
      {
        heading: "The concise answer",
        body: "IBC Section 508 governs buildings with multiple occupancies. Accessory occupancies under Section 508.2 are small and ancillary and take on the main occupancy's classification. Nonseparated occupancies under Section 508.3 have no required separation and live under the most restrictive applicable requirements. Separated occupancies under Section 508.4 are divided by fire barriers and horizontal assemblies rated per Table 508.4, and each occupancy is then regulated independently. Incidental uses under Section 509 — furnace rooms, laundry rooms, storage rooms with specific hazards — carry their own separation or protection requirements regardless of the occupancy approach.\n\nThe analysis runs in a fixed order: classify every space, identify accessory and incidental uses, then choose separated or nonseparated for what remains. That choice then flows into the height and area calculations, the sprinkler analysis, and the fire-resistance ratings of the separations themselves.",
      },
      {
        heading: "How the choice reshapes the building",
        body: "Take a common project: ground-floor retail with apartments above. As a separated occupancy, the retail and residential levels are divided by a rated horizontal assembly — typically two hours — and each follows its own rules for area, egress, and sprinklers. As a nonseparated occupancy, there is no required assembly, but the residential requirements, being more restrictive in several categories, extend down through the retail level.\n\nNeither answer is universally better. Separation costs real money in rated construction, rated doors, and protected penetrations — every pipe and duct crossing the assembly needs proper firestopping. Nonseparation can force a construction type upgrade or building-wide sprinkler protection that dwarfs the separation cost. We price both paths during schematic design, because the mixed-occupancy decision is really a cost-allocation decision wearing a code-compliance costume. The jurisdictions we work in will also weigh in — some reviewers have strong preferences, and their preference matters.",
      },
      {
        heading: "Mixed occupancy decision checklist",
        body: "Mixed occupancy is decided once, early, and documented — because every downstream code calculation inherits the choice.\n\nSettle each of these before design development advances.",
        bullets: [
          "Every space classified: no unclassified or 'flex' areas in the code analysis",
          "Accessory uses identified: ten-percent test applied per story, hazardous exceptions checked",
          "Separated vs nonseparated priced: real construction cost for both paths, not just code preference",
          "Table 508.4 ratings mapped: every required barrier and horizontal assembly located on plan",
          "Incidental uses handled: Section 509 separations independent of the occupancy approach",
        ],
      },
    ],
    extraLinks: [
      { label: "Change of occupancy permit engineering", href: "/answers/change-of-occupancy-permit-engineering/" },
      { label: "How long does permitting take by project type?", href: "/answers/how-long-does-permitting-take-by-project-type/" },
      { label: "Fire-rated assemblies explained", href: "/answers/fire-rated-assemblies-explained/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "asce-24-flood-resistant-design",
    title: "What Does ASCE 24 Require for Flood-Resistant Buildings?",
    description: "ASCE 24 sets flood design classes, elevation and freeboard rules, and dry vs wet floodproofing methods for buildings in FEMA-mapped flood hazard areas.",
    h1: "What Does ASCE 24 Require for Flood-Resistant Buildings?",
    answer: "ASCE 24 is the standard for flood-resistant design and construction, and it is where the building code sends you the moment a project sits in a flood hazard area. It assigns every building a Flood Design Class based on its risk to human life and its importance to the community — ordinary buildings, buildings with higher occupancy or hazardous contents, and essential facilities like hospitals and emergency services. The higher the class, the higher the building must sit above the flood elevation and the tougher the construction rules become.\n\nWe design to ASCE 24 whenever FEMA flood maps put a site in a special flood hazard area. Our civil and structural engineers establish the design flood elevation from the maps, set the lowest floor elevation with the required freeboard for the building's class, and choose between elevation, dry floodproofing, or wet floodproofing based on the occupancy and what the standard permits. Flood design is unforgiving of optimism — water does not negotiate, and the standard is written by people who have watched what happens when buildings are designed for the flood that almost came.",
    directAnswer: "ASCE 24, referenced by the building code, requires buildings in flood hazard areas to meet Flood Design Class requirements: elevated lowest floors with freeboard above the design flood elevation, plus dry or wet floodproofing where permitted. Requirements scale with the building's importance and are tied to FEMA flood maps.",
    topic: "Civil",
    serviceHref: "/services/civil/",
    faqs: [
      {
        question: "What are the ASCE 24 Flood Design Classes?",
        answer: "Class 1 covers low-risk structures like agricultural and minor storage buildings. Class 2 is the default for most buildings. Class 3 covers buildings with higher risk — high occupancy, hazardous materials, or uses where flooding would cause major disruption. Class 4 covers essential facilities that must remain operational: hospitals, fire and police stations, emergency shelters. Each step up raises the required elevation and tightens construction rules.",
      },
      {
        question: "How does ASCE 24 relate to FEMA flood maps?",
        answer: "FEMA Flood Insurance Rate Maps define the special flood hazard areas and the base flood elevation — the water surface elevation of the one-percent-annual-chance flood. ASCE 24 starts from that elevation and adds freeboard based on Flood Design Class. The maps tell you where the hazard is and how deep it runs; the standard tells you how high and how tough the building must be.",
      },
      {
        question: "What is the difference between dry and wet floodproofing?",
        answer: "Dry floodproofing makes the building watertight below the flood level — sealed walls, flood shields, protected openings — so water stays out. Wet floodproofing lets water in but minimizes damage: flood vents equalize pressure, breakaway walls fail safely, and materials below flood level resist water damage. Dry floodproofing is generally limited to non-residential buildings; homes in flood zones are elevated instead.",
      },
      {
        question: "Can you build in a FEMA V zone?",
        answer: "Yes, but the rules are the strictest in the standard. V zones face wave action, so buildings must be elevated on pilings or columns with the lowest horizontal structural member above the flood elevation, and the area below must remain free of obstructions or use breakaway construction. Fill for structural support is prohibited. Coastal construction leaves no room for shortcuts.",
      },
    ],
    sections: [
      {
        heading: "The concise answer",
        body: "ASCE 24 Flood Resistant Design and Construction is referenced by IBC Section 1612, which makes it mandatory for buildings in flood hazard areas established by the jurisdiction — typically the FEMA-mapped special flood hazard areas. The standard covers siting, elevation, foundations, enclosures below the design flood elevation, materials, utilities, and floodproofing methods, with requirements escalating across the four Flood Design Classes.\n\nThe core mechanism is elevation plus freeboard. The design flood elevation is the base flood elevation from the maps, and ASCE 24 requires the lowest floor — or the lowest horizontal structural member in coastal zones — to sit above it by a freeboard amount that grows with the Flood Design Class. Utilities, mechanical equipment, and plumbing must also be elevated or protected. A building whose structure survives but whose electrical and HVAC systems drown is not a flood-resistant building.",
      },
      {
        heading: "How flood-resistant design gets built",
        body: "The work starts with the maps and the site. We pull the FEMA Flood Insurance Rate Map, confirm the flood zone and base flood elevation, and verify whether the jurisdiction has adopted higher local standards — many floodplain ordinances add freeboard beyond the minimum. Then the structural design follows the standard's prescriptions: elevated foundations on piers, piles, or columns in high-velocity zones; stem walls or fill where the zone permits; flood openings in enclosed areas below the elevated floor so water pressure equalizes instead of collapsing walls.\n\nMaterials and utilities get the same discipline. Everything below the design flood elevation must resist flood damage — no standard gypsum, no vulnerable insulation, no electrical panels at grade. Mechanical equipment goes on elevated platforms or the roof. And the certification matters: floodplain permits typically require an elevation certificate documenting the as-built lowest floor elevation, prepared by a licensed surveyor or engineer, before the building is accepted. Design it right, then prove it.",
      },
      {
        heading: "Flood zone project checklist",
        body: "Floodplain projects fail on details, not on concepts. Everyone agrees the building should be above the water; the failures are in the utilities, the enclosures, and the documentation.\n\nVerify each of these before the floodplain permit is closed.",
        bullets: [
          "Flood Design Class assigned: elevation and construction rules follow from the class",
          "Design flood elevation established: BFE from the FIRM plus required freeboard and any local additions",
          "Lowest floor and utilities elevated: structure, electrical, HVAC, and plumbing all above the line",
          "Below-flood enclosures detailed: flood vents, breakaway walls, and flood-resistant materials only",
          "Elevation certificate planned: as-built certification ready for the floodplain permit closeout",
        ],
      },
    ],
    extraLinks: [
      { label: "Floodplain construction engineering requirements", href: "/answers/floodplain-construction-engineering-requirements/" },
      { label: "Basement waterproofing and drainage design", href: "/answers/basement-waterproofing-drainage-design/" },
      { label: "Retaining wall engineering design", href: "/answers/retaining-wall-engineering-design/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "nfpa-13-sprinkler-requirements-explained",
    title: "When Are NFPA 13 Sprinkler Systems Required in Buildings?",
    description: "NFPA 13 sprinkler requirements hinge on occupancy hazard classification, building size, and height — and when voluntary sprinklers buy code trade-offs.",
    h1: "When Are NFPA 13 Sprinkler Systems Required in Buildings?",
    answer: "NFPA 13 sprinkler systems are required when the building code says they are — and the building code says so based on what the building is used for, how big it is, and how tall it is. The IBC's sprinkler thresholds vary by occupancy: assembly spaces, educational buildings, many residential and institutional uses, high-rise buildings, and storage and factory buildings over certain areas all trigger the requirement. Once sprinklers are required, NFPA 13 takes over and defines how the system is designed — occupancy hazard classification, water density over design area, pipe sizing, and hydraulic calculations.\n\nWe design sprinkler systems to NFPA 13 on projects across all 49 states we serve, and we also design them where they are not strictly required. Voluntary sprinklers are one of the best trades in the building code: they buy increases in allowable height and area, reductions in fire-resistance ratings, and relief on egress and separation requirements. When I show a client that sprinklers cost less than the rated construction they replace, the decision usually makes itself. Required or voluntary, the system has to be designed right — water supply verified, hazard classified honestly, hydraulics proven.",
    directAnswer: "Sprinklers are required by building code thresholds based on occupancy, area, and height; NFPA 13 then governs the design through occupancy hazard classifications, density-over-area criteria, and hydraulic calculations. Voluntarily provided sprinklers can also earn code trade-offs in height, area, and fire ratings.",
    topic: "Fire Protection",
    serviceHref: "/services/mep/",
    faqs: [
      {
        question: "What are the NFPA 13 occupancy hazard classifications?",
        answer: "Light Hazard covers offices, churches, and similar low-combustibility uses. Ordinary Hazard Groups 1 and 2 cover most commercial and manufacturing uses with moderate fuel loads. Extra Hazard Groups 1 and 2 cover high-challenge fires like printing plants and flammable liquid operations. Storage has its own detailed criteria based on commodity class and storage height. The classification sets the required water density and design area.",
      },
      {
        question: "What is density-over-area in sprinkler design?",
        answer: "The core NFPA 13 design method: the system must deliver a specified water density, in gallons per minute per square foot, over a specified design area — the hydraulically most demanding portion of the system. Higher hazard means higher density over a larger area, which means bigger pipes, more water, and often a fire pump. The density-area curves are the heart of the standard.",
      },
      {
        question: "When is a fire pump required?",
        answer: "When the available municipal water supply cannot meet the system's hydraulic demand with adequate margin. We test the water supply — static pressure, residual pressure, and flow — and run hydraulic calculations for the most demanding area. If the supply falls short, a fire pump boosts pressure and flow; if the supply is wildly short, on-site water storage enters the conversation.",
      },
      {
        question: "Do existing buildings have to add sprinklers?",
        answer: "Existing buildings generally follow the code under which they were built, but triggers can force retrofits: a change of occupancy to a higher hazard, certain additions or alterations, or local ordinances requiring sprinklers in specific existing uses. High-rise and certain residential retrofit ordinances exist in many jurisdictions. We evaluate the trigger before assuming the existing condition can stay.",
      },
    ],
    sections: [
      {
        heading: "The concise answer",
        body: "NFPA 13 is the installation standard for automatic sprinkler systems: it defines system types, occupancy hazard classifications, design criteria, pipe sizing, installation rules, and acceptance testing. But NFPA 13 does not decide where sprinklers go — the building code does, through IBC Section 903 and its occupancy-specific thresholds, and through referenced standards for special uses. The fire protection engineer's job starts where the code's 'provide sprinklers' meets NFPA 13's 'here is how.'\n\nThe design sequence is fixed. Classify the occupancy hazard honestly. Determine the design density and area from the standard's curves. Lay out sprinklers for coverage and obstruction rules. Size the piping and run hydraulic calculations against the tested water supply. Where the supply is inadequate, add a fire pump and re-verify. Every step depends on the one before it, which is why hazard misclassification is the original sin of sprinkler design — it corrupts the entire calculation silently.",
      },
      {
        heading: "Required versus voluntary: the sprinkler trade",
        body: "Required sprinklers are straightforward — the code triggers them, we design them. Voluntary sprinklers are where engineering judgment earns its fee. The IBC rewards sprinklered buildings across the board: increased allowable height and number of stories, increased floor area, substitution for one-hour fire barriers in certain separations, reduced fire-resistance ratings on some elements, and relief on egress travel distances and corridor ratings.\n\nWe quantify the trade on every project where it is close. The installed cost of a sprinkler system is real money, but so is the cost of the rated construction, reduced rentable area, or lost story it replaces. On wood-frame residential and light commercial work, sprinklers routinely pay for themselves in the area and height they unlock. On storage and industrial projects, the right hazard classification and ESFR sprinkler selection can be the difference between a buildable warehouse and an uninsurable one. The analysis takes an afternoon; the consequences last the life of the building.",
      },
      {
        heading: "Sprinkler project checklist",
        body: "Sprinkler systems fail at plan check and in the field for predictable reasons. Most trace back to the first two items on this list.\n\nConfirm each before the system is bid.",
        bullets: [
          "Hazard classification documented: Light, Ordinary, Extra, or Storage — with the basis stated",
          "Water supply tested: flow test data current, hydraulic demand proven against it with margin",
          "Density and area from the curves: design criteria traceable to the correct NFPA 13 figure",
          "Voluntary trade quantified: code benefits priced against installed cost before the decision",
          "Coordination complete: structural, ceiling, and MEP clashes resolved before installation",
        ],
      },
    ],
    extraLinks: [
      { label: "Fire sprinkler hydraulic design explained", href: "/answers/fire-sprinkler-hydraulic-design-explained/" },
      { label: "ESFR sprinkler warehouse design", href: "/answers/esfr-sprinkler-warehouse-design/" },
      { label: "Fire pump system design", href: "/answers/fire-pump-system-design/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "nfpa-70-nec-essentials-explained",
    title: "What Does the NEC (NFPA 70) Cover on Building Projects?",
    description: "The NEC (NFPA 70) governs safe electrical installations — wiring, grounding, overcurrent, and emergency systems — adopted by states on staggered cycles.",
    h1: "What Does the NEC (NFPA 70) Cover on Building Projects?",
    answer: "The National Electrical Code — NFPA 70 — is the standard that governs how electrical systems are installed safely in buildings. It covers nearly everything with current in it: branch circuits and feeders, services, grounding and bonding, overcurrent protection, wiring methods, panelboards, motors, and the emergency and standby power systems that keep life-safety equipment running. It is not a design guide; it is the minimum safety rulebook, and electrical engineers design to it while the authority having jurisdiction inspects to it.\n\nWe work under the NEC on every building project, and the articles we touch most are the same on nearly every job. Our engineers run load calculations under Article 220, design grounding and bonding under Article 250, select overcurrent protection throughout, and design emergency systems under Article 700 where the building code requires them. One practical warning I give every client: the NEC is revised every three years and states adopt new editions on their own schedules, so the 'current' NEC on your project is whichever edition your jurisdiction has adopted — and that answer varies by state and sometimes by city.",
    directAnswer: "The NEC (NFPA 70) sets minimum safety requirements for electrical installations — wiring, grounding, overcurrent protection, services, and emergency power systems. Electrical engineers design to it, inspectors enforce it, and the applicable edition is whichever one the local jurisdiction has adopted.",
    topic: "Electrical",
    serviceHref: "/services/mep/",
    faqs: [
      {
        question: "Which NEC articles do engineers use most on building projects?",
        answer: "Article 110 for general installation requirements, Article 210 for branch circuits, Article 220 for load calculations, Article 230 for services, Article 250 for grounding and bonding, Article 408 for panelboards and switchboards, and Articles 700, 701, and 702 for emergency, legally required standby, and optional standby systems. Special occupancies like healthcare add Article 517.",
      },
      {
        question: "What is the difference between Articles 700, 701, and 702?",
        answer: "Article 700 covers emergency systems — power for life safety like egress lighting and fire alarms, with the strictest requirements including ten-second restoration. Article 701 covers legally required standby — systems the code requires but that are not life safety, like smoke control. Article 702 covers optional standby — owner-elected backup power with the fewest constraints.",
      },
      {
        question: "How often does the NEC change, and which edition applies?",
        answer: "The NEC is revised on a three-year cycle. States and local jurisdictions adopt editions on their own timelines, sometimes with amendments, so neighboring jurisdictions can enforce different editions. We always confirm the adopted edition and local amendments at project start — designing to the wrong edition is an avoidable plan check failure.",
      },
      {
        question: "Does the NEC cover low-voltage and communications systems?",
        answer: "Yes, in part. Articles 725, 760, and 800-series articles cover control wiring, fire alarm circuits, and communications systems, including separation from power wiring and listing requirements. Low-voltage does not mean unregulated — the NEC still governs installation methods, and fire alarm design must also satisfy NFPA 72.",
      },
    ],
    sections: [
      {
        heading: "The concise answer",
        body: "NFPA 70, the National Electrical Code, is the most widely adopted electrical safety standard in the United States, and it is referenced by the building code as the governing standard for electrical installations. Its scope runs from the utility service entrance through every branch circuit: conductor sizing and protection, wiring methods and raceways, grounding and bonding, equipment installation clearances, hazardous locations, and standby and emergency power. The code's purpose is practical safeguarding of people and property from electrical hazards.\n\nFor the design team, the NEC is both a constraint and a checklist. Load calculations size the service and feeders. Grounding and bonding design protects people from fault current. Overcurrent coordination protects equipment. And the emergency power articles determine what must keep running when normal power fails — and how fast it must come back. The electrical drawings are, in large measure, a demonstration that each of these articles has been satisfied.",
      },
      {
        heading: "Where NEC compliance gets decided in design",
        body: "The highest-leverage NEC decisions happen early. Service sizing under Article 220 locks the utility coordination, the main distribution equipment, and often the electrical room size. Grounding electrode system design under Article 250 is a construction-phase item that cannot be fixed after the concrete is poured — the electrodes go in with the foundation, and missing them means expensive remediation. Selective coordination for emergency and legally required standby systems affects breaker and fuse selection across the distribution.\n\nThe chronic field failures are equally predictable: working clearances around equipment that the architectural layout did not preserve, panelboard and equipment locations that violate dedicated space rules, and emergency system wiring that was not kept independent as Article 700 requires. We coordinate electrical room layouts, clearances, and dedicated spaces with the architect before equipment is ordered, because moving a switchboard after it ships is the kind of problem that ends up in someone's story about the project that went wrong.",
      },
      {
        heading: "NEC compliance checklist",
        body: "NEC compliance is verified article by article, but a short list of items causes most of the plan check corrections and field failures.\n\nCheck these on every electrical package.",
        bullets: [
          "Adopted edition confirmed: the correct NEC edition and local amendments identified at project start",
          "Load calculations complete: service, feeders, and panels sized per Article 220 methods",
          "Grounding electrode system designed: electrodes coordinated with foundation construction",
          "Working clearances preserved: equipment layouts maintain required clear space in the architectural plan",
          "Emergency systems separated: Article 700 wiring independence and selective coordination verified",
        ],
      },
    ],
    extraLinks: [
      { label: "Electrical load calculations explained", href: "/answers/electrical-load-calculations-explained/" },
      { label: "Electrical grounding and bonding explained", href: "/answers/electrical-grounding-and-bonding-explained/" },
      { label: "Backup vs standby vs emergency power", href: "/answers/backup-vs-standby-vs-emergency-power/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "energy-code-compliance-paths-explained",
    title: "Which Energy Code Compliance Path Fits Your Project Best?",
    description: "Prescriptive, performance modeling, or outcome-based: the three energy code paths differ in design flexibility, engineering effort, and when each one wins.",
    h1: "Which Energy Code Compliance Path Fits Your Project Best?",
    answer: "Energy codes offer three paths to compliance, and choosing among them is one of the highest-leverage early decisions on a project. The prescriptive path is a checklist — every component meets its minimum: insulation R-values, window U-factors, lighting power densities, equipment efficiencies. The performance path uses whole-building energy modeling to show the proposed design uses no more energy than a code-compliant reference building, trading strengths in one system against weaknesses in another. The outcome-based path verifies actual measured energy use after occupancy — the newest and least common approach.\n\nWe guide clients to the path that fits the building, the budget, and the schedule. Simple buildings with conventional systems usually comply cheapest through the prescriptive path. Complex buildings — curtain wall towers, high-performance designs, unusual occupancies — almost always need performance modeling, and the modeling often pays for itself by unlocking design flexibility the prescriptive path would prohibit. Our energy team runs Title 24 and IECC/ASHRAE 90.1 compliance across the states we serve, and the right path decision, made early, is worth more than any amount of late-stage optimization. We also confirm which code applies — IECC, ASHRAE 90.1, or a state-specific code like California's Title 24 — because the available paths and their documentation differ.",
    directAnswer: "Energy codes offer prescriptive (meet every component minimum), performance (whole-building modeling against a reference building), and outcome-based (verify actual energy use) paths. Simple conventional buildings suit prescriptive; complex or high-performance buildings usually need modeling.",
    topic: "Energy Code",
    serviceHref: "/services/energy-code-compliance/",
    faqs: [
      {
        question: "What is the prescriptive energy code path?",
        answer: "Compliance by meeting every individual requirement: envelope insulation and glazing values, lighting power densities and controls, HVAC equipment efficiencies, and service water heating rules. It is simple to document and review, but inflexible — a spectacular glazing system cannot compensate for anything, and every component must pass on its own.",
      },
      {
        question: "What is the performance energy code path?",
        answer: "Compliance demonstrated through whole-building energy modeling: the proposed design is simulated against a code-compliant baseline building, and it must use equal or less energy (or cost). It allows trade-offs — better lighting can offset a weaker envelope — and it is the standard route for complex buildings. It requires a qualified energy modeler and takes more engineering effort.",
      },
      {
        question: "What is outcome-based energy code compliance?",
        answer: "Compliance verified against the building's actual measured energy use after occupancy, rather than predicted performance. It is an emerging approach adopted in a limited number of jurisdictions and programs. The appeal is honesty — the building must actually perform — but it shifts compliance risk onto operations, which makes owners and lenders cautious.",
      },
      {
        question: "How does California's energy code fit these paths?",
        answer: "California uses its own code — the 2025 California Energy Code / 2025 Standards, effective January 1, 2026 — which provides prescriptive and performance compliance approaches for nonresidential buildings. The performance approach uses approved compliance software to compare the proposed design against the standard design. Our team runs both paths for California projects.",
      },
    ],
    sections: [
      {
        heading: "The concise answer",
        body: "The IECC and ASHRAE 90.1 — the two national model energy codes — both structure compliance around the prescriptive/performance split. The prescriptive path is deterministic: meet each section's minimums and you comply. The performance path is comparative: model the proposed building and a baseline, and prove the proposal wins. Some jurisdictions and above-code programs add outcome-based or measured-performance options that judge the occupied building's metered energy.\n\nThe paths differ in engineering effort, review risk, and design freedom. Prescriptive compliance is the least effort and the most predictable at plan check, but it constrains design. Performance compliance costs more in modeling and documentation, faces more reviewer scrutiny, but frees the architecture and often produces a genuinely better building. Outcome-based compliance is the least effort at design and the most risk after occupancy.",
      },
      {
        heading: "Choosing the path: how we advise clients",
        body: "The decision starts with the building. A single-story retail box with standard construction is a prescriptive building — the modeling would cost more than it could ever save. A mixed-use tower with extensive glazing, a data center, or any project chasing above-code certification is a performance building — the prescriptive path would either prohibit the design or force expensive component upgrades that modeling could avoid through trade-offs.\n\nSchedule and team matter too. Performance compliance needs an energy modeler engaged during design development, not during permit — late modeling only documents decisions that are already locked. And jurisdiction matters: some plan reviewers scrutinize performance submittals closely, which we account for in documentation quality, while others effectively require modeling for complex buildings. We make the path recommendation in writing during schematic design, with the cost and schedule implications stated plainly, because switching paths mid-project wastes the one resource no project has to spare: time.",
      },
      {
        heading: "Compliance path decision checklist",
        body: "The path decision belongs in schematic design, not at permit. Late switches mean rework.\n\nWork through these before the path is locked.",
        bullets: [
          "Building complexity assessed: conventional and simple favors prescriptive, complex favors performance",
          "Trade-off value estimated: whether modeling flexibility is worth the modeling cost",
          "Modeler engaged early: performance path needs modeling during design, not after",
          "Jurisdiction expectations checked: reviewer scrutiny and local amendments for the chosen path",
          "Above-code goals aligned: certification or stretch-code targets may dictate the path",
        ],
      },
    ],
    extraLinks: [
      { label: "How does energy code compliance work?", href: "/answers/how-does-energy-code-compliance-work/" },
      { label: "Energy modeling: Title 24 explained", href: "/answers/energy-modeling-title-24-explained/" },
      { label: "How much does energy compliance cost?", href: "/answers/how-much-does-energy-compliance-cost/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "geotechnical-report-requirements-explained",
    title: "What Must a Geotechnical Report Include for Permitting?",
    description: "A geotechnical report delivers borings, bearing capacity, settlement analysis, and foundation recommendations — the soil answers every new structure needs.",
    h1: "What Must a Geotechnical Report Include for Permitting?",
    answer: "A geotechnical report is the engineering study of what is under your site — and for most commercial buildings, the building code requires one before a foundation can be designed. The report documents subsurface exploration (borings or test pits), soil and rock classification, groundwater conditions, laboratory test results, and then the recommendations everything else depends on: allowable bearing capacity, expected settlement, foundation type, lateral earth pressures, and seismic site class. It is the document the structural engineer designs the foundation from.\n\nWe treat the geotechnical report as the first technical deliverable on any project with new foundations. Our civil and structural engineers scope the investigation to the building — heavier structures and poorer soils need deeper, closer borings — review the report for the parameters the structural design actually needs, and coordinate directly with the geotechnical engineer when the recommendations raise questions. Skipping or skimping on the investigation is the most expensive false economy in construction: foundations designed on assumed soil are foundations designed on hope, and hope settles differentially. We also make sure the investigation covers the whole site, not just the building footprint — pavements, retaining walls, and site utilities all need soil answers too, and a second mobilization costs far more than a few extra borings.",
    directAnswer: "A geotechnical report must document subsurface exploration, soil classification, groundwater, lab testing, and engineering recommendations — bearing capacity, settlement, foundation type, lateral pressures, liquefaction potential, and seismic site class. The building code requires it for most new foundations.",
    topic: "Civil",
    serviceHref: "/services/civil/",
    faqs: [
      {
        question: "When does the building code require a geotechnical investigation?",
        answer: "IBC Chapter 18 requires a geotechnical investigation for most new buildings, with limited exceptions for small, light structures where the building official accepts prior knowledge of the site. In practice, commercial projects, multi-story buildings, and anything with deep foundations or retaining walls need one. When in doubt, the building official decides — and they almost always want the report.",
      },
      {
        question: "What is the difference between a boring and a test pit?",
        answer: "A boring is a drilled hole, typically with a drill rig, that retrieves soil samples at depth and can extend a hundred feet or more. A test pit is an excavated pit, usually with a backhoe, that allows direct visual inspection of shallow soils. Borings suit deep foundations and multi-story loads; test pits suit shallow investigations like pavements and small structures.",
      },
      {
        question: "What is seismic site class and why does it matter?",
        answer: "Seismic site class — A through F under ASCE 7 — characterizes how the soil amplifies earthquake shaking, based on shear wave velocity, blow counts, or undrained shear strength in the upper hundred feet. It directly scales the seismic design forces on the structure. Soft soils amplify shaking, so the site class can significantly increase the structural design demand.",
      },
      {
        question: "Who hires the geotechnical engineer?",
        answer: "Typically the owner, often on the structural engineer's recommendation for scope. The geotechnical engineer works as a specialty consultant — they investigate and recommend, while the structural engineer of record designs the foundation using those recommendations. Clear scoping between the two avoids gaps where each assumes the other covered an item.",
      },
    ],
    sections: [
      {
        heading: "The concise answer",
        body: "A complete geotechnical report contains the exploration program (boring locations, depths, and logs), soil and rock descriptions with classification, groundwater observations, laboratory test results (strength, compressibility, expansiveness, corrosivity), and engineering analysis with recommendations: allowable bearing pressures for shallow foundations, deep foundation capacities and installation criteria, estimated total and differential settlement, lateral earth pressures for walls, subgrade preparation and fill requirements, pavement design parameters, and seismic site class with liquefaction assessment.\n\nThe report's value is in the recommendations, not the raw data. Boring logs tell you what is down there; the engineer's analysis tells you what to build on it. A good report states the foundation options explicitly — shallow versus deep — with the settlement and cost implications of each, so the structural engineer and owner can make an informed choice rather than guessing.",
      },
      {
        heading: "How the report drives the structural design",
        body: "The structural engineer cannot size a footing without the allowable bearing pressure, cannot check serviceability without the settlement estimate, and cannot run the seismic analysis without the site class. The geotechnical report is not background reading — it is input data, and missing or vague parameters stall the structural design. We review every report against a simple test: does it give us every number the foundation design needs, stated unambiguously?\n\nLiquefaction deserves special attention in seismic regions. If loose saturated soils can lose strength during an earthquake, the report must assess the hazard and recommend mitigation — ground improvement, deep foundations bearing below the liquefiable layer, or structural accommodation of the resulting settlement. Expansive soils get similar focus where they occur: the report should quantify swell potential and recommend slab and foundation details that tolerate it. These are the findings that change projects, and they are exactly why the investigation happens before the structural design, not during it.",
      },
      {
        heading: "Geotechnical scoping and review checklist",
        body: "A useful geotechnical report starts with a well-scoped investigation. Under-scoped investigations produce vague reports; vague reports produce conservative, expensive foundations.\n\nConfirm these when scoping and reviewing the work.",
        bullets: [
          "Scope matches the structure: boring depth and spacing suited to the building loads and soil variability",
          "All design parameters present: bearing capacity, settlement, lateral pressures, and site class stated clearly",
          "Groundwater addressed: observed levels, seasonal variation, and dewatering or waterproofing implications",
          "Seismic hazards assessed: site class, liquefaction potential, and mitigation recommendations where needed",
          "Foundation options compared: shallow vs deep with settlement and cost implications, not just one answer",
        ],
      },
    ],
    extraLinks: [
      { label: "What does geotechnical engineering cost?", href: "/answers/geotechnical-engineering-cost/" },
      { label: "Geotechnical settlement analysis explained", href: "/answers/geotechnical-settlement-analysis-explained/" },
      { label: "When should geotechnical information enter structural design?", href: "/answers/when-should-geotechnical-information-enter-structural-design/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "as-built-drawings-engineering-explained",
    title: "As-Built vs Record Drawings: What Do Owners Actually Get?",
    description: "As-built drawings capture field changes; record drawings compile them into the final building record — who prepares each one and why owners need both.",
    h1: "As-Built vs Record Drawings: What Do Owners Actually Get?",
    answer: "As-built drawings and record drawings are related but different, and the difference matters at handover. As-builts are the contractor's marked-up drawings — redlines made during construction recording what was actually built: rerouted conduit, moved walls, field-adjusted pipe runs, substituted equipment. Record drawings are the design team's final product: a clean set incorporating the as-built information into the contract documents, representing the finished building as a coherent whole.\n\nWe make sure owners actually receive both, because each serves a different future. The contractor's redlines are the raw truth of the field — messy but honest. The record set is the usable reference the next engineer, the facilities team, and the future renovation architect will work from. I tell every owner the same thing: the building you permitted and the building you got are never identical, and the record of the difference is one of the most valuable documents you will ever own. Future projects on that building will be faster, cheaper, and safer because of it. Lenders and insurers increasingly ask for these documents as well, since documented buildings carry less unknown-condition risk. We specify the deliverable — as-builts, record drawings, or both — in our proposals so there is no ambiguity at closeout.",
    directAnswer: "As-built drawings are the contractor's field markups showing what was actually constructed; record drawings are the design team's final compiled set incorporating that information. Owners need both — raw field truth and a clean, usable record for maintenance and future work.",
    topic: "Construction Administration",
    serviceHref: "/services/",
    faqs: [
      {
        question: "Who is responsible for preparing as-built drawings?",
        answer: "The contractor prepares as-built markups during construction — recording field changes, reroutes, and substitutions on the contract drawings as the work proceeds. The contract documents should require this explicitly, including that markups be kept current rather than reconstructed from memory at project end. Memory fades; redlines made the day of the change do not.",
      },
      {
        question: "Who prepares record drawings?",
        answer: "Typically the architect or engineer of record, using the contractor's as-built markups as the source — but only if the contract requires it. Record drawing preparation is a distinct scope with its own fee; it is not automatic. Owners should confirm in the design contract whether a record set is included and at what level of verification.",
      },
      {
        question: "How accurate are record drawings?",
        answer: "They are only as accurate as their sources. Record drawings compiled from diligent contractor redlines are generally reliable for concealed conditions. Where critical — underground utilities, structural embeds, complex MEP routing — field verification, surveying, or laser scanning during construction produces a far better record. We advise owners to specify the verification level for the systems they will need most.",
      },
      {
        question: "Why do future engineers need record drawings?",
        answer: "Because every renovation, addition, or system replacement starts with knowing what is there. Without a record set, the next engineer pays for exploratory demolition, scanning, or conservative assumptions — all billed to the owner. A good record set pays for itself the first time anyone opens a wall or ties into an existing system.",
      },
    ],
    sections: [
      {
        heading: "The concise answer",
        body: "The terminology is precise in the industry even though owners often use the words interchangeably. As-built drawings document the actual constructed conditions, prepared from measurements and observations during construction. Record drawings are the revision of the contract documents to reflect the as-built conditions — the design professional's final representation of the project as built. Some contracts also reference 'measured drawings' for existing buildings, which are field-measured surveys of what exists before any work begins.\n\nThe practical distinction is authorship and reliability. As-builts come from the people who built it and capture field reality, including the undocumented adjustments every project accumulates. Record drawings come from the design team and organize that reality into a coordinated, legible set. An owner who receives only redlines has the truth but not the usability; an owner who receives only a record set compiled without good redlines has usability without truth. The pair is the complete deliverable.",
      },
      {
        heading: "How good documentation gets produced",
        body: "Good as-builts are a process, not a deliverable that appears at the end. The contract should require the contractor to maintain a current marked-up set on site, updated as changes occur, and available for review at progress meetings. We review the redline set during construction administration visits — not to do the contractor's documentation for them, but to verify the process is happening while memories and access are fresh.\n\nFor critical concealed systems, we recommend going beyond redlines. Underground utilities should be surveyed before backfill — once buried, their location is a guess forever. Major MEP routing above ceilings benefits from verification before close-up. Laser scanning and photogrammetry have made high-fidelity documentation affordable on projects where future work is certain. The cost of this verification is trivial against the cost of cutting into an unmarked post-tensioned slab or an undocumented high-voltage feeder during the next renovation.",
      },
      {
        heading: "Handover documentation checklist",
        body: "Documentation requirements belong in the contracts — design and construction — before work starts. Retroactively requiring as-builts at closeout produces fiction.\n\nSettle these before construction begins.",
        bullets: [
          "As-built obligation in the construction contract: current redlines maintained during work, not after",
          "Record drawing scope in the design contract: who compiles the final set and to what verification level",
          "Underground survey before backfill: utilities and buried systems located while visible",
          "Concealed MEP verification: critical routing documented before ceilings and walls close",
          "Handover format agreed: CAD, PDF, and BIM deliverables the owner's team can actually use",
        ],
      },
    ],
    extraLinks: [
      { label: "Building commissioning explained", href: "/answers/building-commissioning-explained/" },
      { label: "Can construction start before permit issuance?", href: "/answers/can-construction-start-before-permit-issuance/" },
      { label: "How does plan check resubmittal work?", href: "/answers/how-does-plan-check-resubmittal-work/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
];
