import type { Phase0AeoPage } from "./phase0-corpus";

const founderNote = "I'm Jeremy Mills, CEO & Founder of Apex Grid Engineering and a U.S. Air Force veteran. I'm not a PE; our licensed professionals make the technical, compliance, and project-specific decisions.";

export const WAVE_IU_ANSWER_PAGES: Phase0AeoPage[] = [
  {
    slug: "unincorporated-county-building-permit-process",
    title: "How Does the Building Permit Process Work in Unincorporated County Areas?",
    description: "County building departments permit projects outside city limits. How county review timelines, well/septic coordination, and fire marshal review differ.",
    h1: "How Does the Building Permit Process Work in Unincorporated County Areas?",
    answer: "When your site sits outside any city limits, the direct answer is that the county building department becomes your authority having jurisdiction (AHJ), and everything about the permit — submittal portal, review timeline, inspection sequence, and fee schedule — follows county rules instead of city rules. There is no city plan check, no city fire department sign-off, and often no municipal water or sewer to connect to. I treat a county permit as a different project type from day one, because the assumptions that work inside a city will not survive first review.\n\nThe practical differences show up in three places. First, county review timelines run longer than most cities — smaller staffs, broader territory, and reviewers who split time between plan check and field inspections. I submit earlier than the schedule says I should, and I build review cycles into the design calendar. Second, utilities become a design problem: well water and septic or on-site wastewater treatment mean I coordinate with the county health or environmental department alongside the building department, and the mechanical and plumbing designs have to account for well capacity, pressure, and water quality rather than a known municipal supply.\n\nThird, fire protection in unincorporated areas is usually governed by the county fire marshal or a state fire marshal's office rather than a municipal fire department. That changes the sprinkler and fire-alarm review — the criteria are similar, but the reviewer, the submittal path, and the inspection scheduling are all county-side. Structural design also shifts: many counties in wildfire, high-wind, or seismic zones carry local amendments that are stricter than the city next door. I confirm the adopted code edition and every local amendment before the first calculation is run, because discovering an amendment at permit intake costs weeks.",
    directAnswer: "In unincorporated areas the county building department is the AHJ, with longer review timelines than most cities, well/septic coordination through the county health department, and fire review by the county or state fire marshal — so engineers confirm county-specific amendments and submit early.",
    topic: "Jurisdiction & Permitting Authority",
    serviceHref: "/services/civil/",
    faqs: [
      {
        question: "How do I know if my site is in an unincorporated county area?",
        answer: "Check the county assessor's parcel records and the county GIS map — the parcel's jurisdiction field tells you whether a city claims it. As a cross-check, confirm whether the property pays city taxes or receives city services; if it is on well and septic with no city water bill, it is almost certainly unincorporated. I always verify jurisdiction before design starts, because a site that sits a quarter mile from the city line can still be county territory. Annexation activity nearby is worth checking too, since a pending annexation can change your AHJ mid-project.",
      },
      {
        question: "Why do county building permits take longer than city permits?",
        answer: "County building departments cover enormous geographic areas with smaller staffs than a mid-size city's department, and the same people often do both plan review and field inspections. A reviewer who is out on inspections three days a week is not reviewing plans those days. Add coordination with the health department for septic, the fire marshal, and sometimes a flood control district, and the review chain gets long. I plan for it by submitting complete, correct drawing sets the first time — resubmittals hurt far more in a county process than a city one, because you go back to the end of a slower queue.",
      },
      {
        question: "Who reviews fire protection for a county building permit?",
        answer: "Usually the county fire marshal's office or, in some states, the state fire marshal, rather than a municipal fire department. The design criteria come from the same family of fire codes, but the reviewer, the submittal requirements, and the inspection schedule are county-side. I coordinate sprinkler water supply early, because in unincorporated areas the available fire flow may come from a water district tank, a private system, or an on-site tank — and the fire marshal's approval hinges on documented, tested supply. Getting the fire reviewer involved during design avoids the most common county permit surprise.",
      },
      {
        question: "Can I connect to city water and sewer from an unincorporated site?",
        answer: "Sometimes, but never assume it. Some counties have service agreements with adjacent cities or special districts that allow unincorporated parcels to connect for a fee; others prohibit it outright or require annexation first. I check with the serving utility — which is often a special district, not the city — during due diligence. If connection is not available, the design shifts to well and septic or a packaged treatment system, which adds the health department to the approval chain and changes the civil and plumbing scope significantly.",
      },
    ],
    sections: [
      {
        heading: "The county submittal path",
        body: "County building departments run their own portals, checklists, and fee schedules, and they vary far more than city processes do. Before I draw anything, I pull the county's current submittal checklist, confirm the adopted code edition and its local amendments, and identify every parallel approval — health department, fire marshal, flood control, grading — that has to land before the building permit issues. Some counties route everything through one intake; others require you to chase each agency separately. Knowing the routing up front decides whether the permit takes three months or eight.",
      },
      {
        heading: "Well, septic, and site utilities",
        body: "The absence of municipal utilities is the defining engineering fact of most unincorporated projects. Well yield and water quality testing determine whether the plumbing design can assume a reliable supply; a low-yield well means storage tanks, pressure systems, and sometimes treatment that the mechanical design has to accommodate. Septic design goes through the county health or environmental department with its own soil testing, percolation requirements, and setback rules that can shrink the buildable area. I coordinate the civil site plan with the septic layout from the start, because the leach field location is non-negotiable and it regularly conflicts with where the owner imagined the parking.",
      },
      {
        heading: "Unincorporated county permit checklist",
        body: "A county permit application is ready when these items are resolved. Counties forgive nothing and queue everything, so completeness at intake is the whole game.\n\n• Jurisdiction confirmed via county assessor/GIS, with any nearby annexation activity checked\n• Adopted code edition and all county local amendments identified before design\n• Health department path for well/septic (or utility connection letter) underway in parallel\n• Fire marshal or state fire marshal engaged on water supply and access during design\n• Review timeline built into the project schedule with buffer for a slower county queue",
      },
    ],
    extraLinks: [
      { label: "How Does Permitting Differ Between a County and a City?", href: "/answers/boulder-county-vs-city-permitting/" },
      { label: "What Drawings Does an MEP Permit Submittal Require?", href: "/answers/mep-permit-drawings-requirements/" },
      { label: "Can Construction Start Before the Permit Is Issued?", href: "/answers/can-construction-start-before-permit-issuance/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "city-annexation-permit-jurisdiction",
    title: "What Happens to a Building Permit When Land Is Annexed Mid-Project?",
    description: "Annexation mid-project shifts your AHJ from county to city. Which jurisdiction finishes the permit, how inspections carry over, and how engineers manage it.",
    h1: "What Happens to a Building Permit When Land Is Annexed Mid-Project?",
    answer: "The direct answer is that when land is annexed into a city mid-project, the city becomes the authority having jurisdiction, and an in-progress county permit does not automatically transfer — you typically need the city's building department to recognize, re-review, or reissue the permit under city codes before work continues. How painful that is depends on where you are in the project and how the annexation agreement was written. A permit that was only at plan check is far easier to move than one with foundations already in the ground.\n\nAnnexation agreements sometimes include provisions for in-progress permits — the city may agree to honor county-issued permits to a certain milestone, or to accept the county's inspections to date. But that is a negotiation between the jurisdictions, not a right the owner holds. I get the annexation timeline and its permit provisions in writing from the city before committing the design to one code path, because the adopted code edition, local amendments, and even the fee schedule can change the moment the boundary moves.\n\nThe engineering impact is real: city amendments may require design changes to structural, mechanical, or fire-protection systems that were already county-approved. Inspection continuity is the other risk — the county inspector who signed off on your foundation may have no standing with the city, and the city may require re-inspection of work it cannot verify. I document everything during the transition: keep the county permit file complete, get written confirmation from both jurisdictions on what carries over, and never let construction outrun the paperwork. The gap between \"the county said it was fine\" and \"the city agrees\" is where projects stall for months.",
    directAnswer: "Annexation makes the city the new AHJ; an in-progress county permit does not automatically transfer, so the city must recognize or reissue it — engineers get the annexation's permit provisions in writing early and keep construction from outrunning the jurisdictional paperwork.",
    topic: "Jurisdiction & Permitting Authority",
    serviceHref: "/services/civil/",
    faqs: [
      {
        question: "Does my county building permit stay valid after annexation?",
        answer: "Not automatically. The county's authority over the land ends when the annexation is effective, and the city becomes the AHJ — including over permits. Some annexation agreements contain transition provisions that let county permits finish under county rules to a defined milestone, but you cannot assume that; it has to be in the agreement or in a written determination from the city. I check the annexation documents and get the city's building official to state in writing how in-progress permits will be handled before the annexation takes effect.",
      },
      {
        question: "What if construction is already underway when annexation happens?",
        answer: "Work in the ground is the hardest case. The city may accept the county's completed inspections, require its own re-inspection of work it cannot verify, or demand design changes where city amendments differ from county rules. Exposed work — foundation, framing, rough MEP — is much easier to get accepted than work already concealed behind drywall. My rule: if annexation is on the horizon, keep inspections current and photograph everything before concealment, so either jurisdiction can verify what was built. Never cover work that has not been inspected by somebody with standing.",
      },
      {
        question: "Can city code amendments force redesign of a county-approved project?",
        answer: "Yes, if the city applies its own code to the project from the annexation date forward. Structural, fire-protection, and energy requirements are the usual friction points, since city amendments are often stricter than the county's. Whether the city applies its code retroactively to the whole project or only to work performed after annexation depends on the annexation agreement and the building official's determination. I design with the stricter of the two jurisdictions' requirements wherever the annexation looks likely, which usually costs less than redesigning at the boundary change.",
      },
      {
        question: "Who inspects the project during an annexation transition?",
        answer: "Whoever the effective AHJ is at the time of the inspection. Before the annexation is effective, it is the county; after, it is the city. The messy part is the handoff: schedule inspections so there is no gap, and get written confirmation from the city on which county inspections it will honor. I coordinate directly with both building officials during the transition window rather than letting the contractor guess. A missed or disputed inspection during the handoff can force destructive investigation of finished work, which is the most expensive possible outcome.",
      },
    ],
    sections: [
      {
        heading: "Reading the annexation agreement",
        body: "The annexation agreement is the controlling document, and I read it like a contract because it is one. I look for transition provisions on in-progress permits, the effective date of the boundary change, any pre-annexation development agreements, and whether the city committed to honor county approvals to a milestone. Where the agreement is silent, the building official's written determination fills the gap — get it in writing, because a verbal \"we'll work with you\" does not survive a staff change. If no annexation agreement exists yet and one is being negotiated, that is the moment to raise permit continuity; after it is signed, the terms are fixed.",
      },
      {
        heading: "Designing for the boundary change",
        body: "When annexation is likely but not certain, I design to the stricter jurisdiction's requirements from the start — the city's amendments on structural, fire, and energy provisions layered onto the county's baseline. This is cheap insurance: designing to both costs a little more engineering time, while redesigning at annexation costs months. I also keep the drawing set organized so a city re-review can follow it cleanly — clear code compliance notes, amendment references, and calculation packages that a new reviewer can audit without a guided tour. A set that reads well to a stranger is a set that survives an AHJ change.",
      },
      {
        heading: "Annexation transition checklist",
        body: "A project facing annexation stays on track when these items are handled. The theme is written confirmation at every step — the boundary change is a legal event, and verbal understandings do not hold.\n\n• Annexation agreement reviewed for in-progress permit provisions and effective date\n• Written determination from the city building official on permit recognition or reissuance\n• Design reconciled to the stricter of county and city amendments before submittal\n• Inspection records and pre-concealment photos complete for all work in the ground\n• Handoff coordinated directly with both building officials so no inspection falls in the gap",
      },
    ],
    extraLinks: [
      { label: "Can a Building Permit Transfer to a New Owner?", href: "/answers/can-a-building-permit-transfer-to-a-new-owner/" },
      { label: "How Do Permit Expirations and Extensions Work?", href: "/answers/how-do-permit-expirations-and-extensions-work/" },
      { label: "Can Construction Start Before the Permit Is Issued?", href: "/answers/can-construction-start-before-permit-issuance/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "county-plan-check-vs-city-plan-check",
    title: "How Does County Plan Check Differ From City Plan Check?",
    description: "County plan check runs slower with broader reviewers than city plan check. How review depth, timelines, and submittal portals differ between the two.",
    h1: "How Does County Plan Check Differ From City Plan Check?",
    answer: "The direct answer is that county plan check is generally slower, broader in scope per reviewer, and less specialized than city plan check — one county reviewer may cover structural, architectural, and energy compliance on the same set, while a city routes your plans to separate discipline reviewers. That changes how I prepare a submittal: a county set needs to be more self-explanatory, because the person reviewing your structural sheets may not be a structural specialist, and questions come as broad correction lists rather than deep discipline dives.\n\nTimelines are the most visible difference. City departments in active markets often publish review targets and run electronic portals with status tracking; many counties run leaner operations where the reviewer is also the field inspector, and a two-week city turnaround becomes six to eight weeks at the county. I plan submittal sequencing around that reality — and I submit once, correctly, because a county resubmittal goes to the back of a slower line. Correction responses have to be thorough and clearly marked; a county reviewer seeing your set for the second time will not remember the first conversation.\n\nThe submittal portals themselves differ. Cities have mostly standardized on electronic plan review with digital markups and resubmittal workflows. Counties are catching up, but I still encounter counties that want paper sets, wet signatures, or hybrid processes with uploads plus mailed copies. I confirm the submittal format before producing the set — printing eleven half-size sets for a county that quietly went digital wastes a week, and uploading PDFs to a county that still wants paper wastes more. The portal question is a five-minute phone call that saves real schedule.",
    directAnswer: "County plan check runs slower with less specialized reviewers than city plan check, so engineers submit more self-explanatory drawing sets, confirm the submittal format up front, and respond to corrections thoroughly — a county resubmittal returns to the back of a slower queue.",
    topic: "Jurisdiction & Permitting Authority",
    serviceHref: "/services/civil/",
    faqs: [
      {
        question: "Is county plan check easier or harder than city plan check?",
        answer: "Neither — it is different. County review is less specialized, which means fewer deep technical challenges but more broad-scope corrections and more back-and-forth on basics like code references and amendment compliance. City review goes deeper per discipline but is usually faster and more predictable. I would not call either easier; the county process rewards complete, clearly documented submittals, while the city process rewards technical precision. The project that struggles is the one whose engineer assumed the two were interchangeable.",
      },
      {
        question: "How long does county plan check usually take?",
        answer: "It varies widely by county, but I plan for roughly double the comparable city's published timeline as a starting point — and I verify against the county's current actuals, not its published targets. Counties with small staffs and large territories can run eight to twelve weeks for a first review on a commercial project, versus three to four weeks in an efficient city. The real schedule risk is the second cycle: corrections take as long as the first review in many counties. That is why first-submittal quality matters so much more on the county side.",
      },
      {
        question: "Do counties and cities enforce different building codes?",
        answer: "They enforce the same model codes — the IBC, mechanical, plumbing, and energy codes — but the adopted edition and the local amendments frequently differ. A city may have adopted a newer code edition than its surrounding county, or carry amendments the county never adopted. Fire and energy amendments are the most common divergence. I confirm the exact adopted edition and amendment package for the AHJ of record before starting design, because a set engineered to the city's amendments can draw corrections from the county and vice versa.",
      },
      {
        question: "Can I submit the same drawing set to a county and a city?",
        answer: "The drawings can be the same, but the submittal package usually cannot. Cover sheets, code compliance notes, amendment references, energy forms, and application paperwork are jurisdiction-specific, and the two AHJs may require different sheet counts, formats, or electronic portal workflows. I produce one drawing set with jurisdiction-neutral core sheets and jurisdiction-specific front-end sheets — title block data, code analysis, and forms — so a dual or sequential submittal does not mean redrawing the project. Where the amendments genuinely differ, the design follows the stricter requirement.",
      },
    ],
    sections: [
      {
        heading: "Preparing a county-ready submittal",
        body: "A county reviewer sees more project types and fewer repeat submittals from the same engineer than a city specialist does, so the set has to teach as it goes. I write code compliance notes in plain terms with the specific code and amendment cited, keep the structural and MEP narratives on the drawings rather than in separate memos the reviewer may never open, and make the energy compliance path unmistakable. Every assumption the design relies on — soil values, wind exposure, fire flow source — is stated on the sheets, because a generalist reviewer will question what a specialist would take on faith. Clarity is not dumbing down; it is the format the county process rewards.",
      },
      {
        heading: "Managing the review cycle",
        body: "County review cycles reward a different management style than city cycles. I front-load: a pre-submittal meeting or even a phone call with the county reviewer to walk through anything unusual in the project, because one conversation before submittal can prevent a full correction cycle after it. When corrections come back, I respond to every item in a numbered letter keyed to clouded changes on the sheets — the reviewer should be able to verify each response without hunting. And I never submit a partial response to \"keep things moving\"; in a county queue, a partial resubmittal that draws a second correction list costs more time than waiting to answer everything at once.",
      },
      {
        heading: "County vs city plan check comparison",
        body: "Use this comparison when scoping schedule and fee for a project whose AHJ could be either. The differences drive real decisions about submittal strategy.\n\n• Reviewer specialization: city uses discipline specialists; county often uses generalist reviewers covering multiple disciplines\n• Timeline: city publishes targets and usually hits weeks; county runs longer with inspection duties competing for reviewer time\n• Portal: city nearly always electronic with status tracking; county may be paper, hybrid, or a newer digital system — confirm first\n• Corrections: city corrections go deep on technical detail; county corrections go broad — respond completely to avoid a slow second cycle",
      },
    ],
    extraLinks: [
      { label: "How Does the Plan Check Corrections Process Work?", href: "/answers/plan-check-corrections-process-explained/" },
      { label: "Are Plan Check Responses Included in an Engineering Fee?", href: "/answers/are-plan-check-responses-included-in-an-engineering-fee/" },
      { label: "How Does Permitting Differ Between a County and a City?", href: "/answers/boulder-county-vs-city-permitting/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "extraterritorial-jurisdiction-etj-permitting",
    title: "Who Issues Building Permits Inside a City's Extraterritorial Jurisdiction?",
    description: "Building in a city ETJ means city rules can apply where the county permits. Whose codes govern, who issues the permit, and how engineers handle the overlap.",
    h1: "Who Issues Building Permits Inside a City's Extraterritorial Jurisdiction?",
    answer: "The direct answer is that in most states, the county still issues the building permit inside a city's extraterritorial jurisdiction (ETJ), but the city's codes, subdivision rules, and sometimes its building standards apply to the project — so you permit through the county while designing to city-influenced requirements. The ETJ is the band of unincorporated land around a city where the state gives the city limited regulatory authority, usually over platting, subdivision, and sometimes zoning and building standards. It is the most confusing jurisdictional strip in American development, and engineers who treat it as plain county land get corrected at plan check.\n\nWhat the city can actually regulate in its ETJ varies by state law. In Texas, cities can enforce subdivision regulations and, for larger cities, building codes in the ETJ; in other states the city's ETJ power may be limited to platting and land division. The practical result is a split review: the county building department processes the permit, but the city's planning or development staff reviews the plat, setbacks, access, and sometimes the building plans against city standards. I map both reviews before design — the county's checklist and the city's ETJ requirements — because satisfying one and missing the other is the classic ETJ failure.\n\nThe engineering consequence is that the design often has to meet the stricter of two standards that were never written to work together. City street sections, drainage criteria, and utility standards get applied to a project the county will inspect; fire protection may answer to the county fire marshal while the city comments on access and water supply. I keep a jurisdiction matrix on ETJ projects — which AHJ governs each system, which code edition each one enforces — and I get the city's ETJ reviewer to confirm it early. An hour of alignment up front prevents the scenario where the county approves plans the city's ETJ reviewer then rejects.",
    directAnswer: "Inside a city's ETJ the county typically issues the building permit, but the city's subdivision rules and sometimes its building standards also apply — engineers map both reviews up front and design to the stricter of the two where they overlap.",
    topic: "Jurisdiction & Permitting Authority",
    serviceHref: "/services/civil/",
    faqs: [
      {
        question: "What is a city's extraterritorial jurisdiction (ETJ)?",
        answer: "It is the ring of unincorporated county land surrounding a city where state law grants the city limited regulatory power — usually over subdivision platting and land division, and in some states over zoning or building standards. The land is not in the city: residents do not vote in city elections or pay city taxes, but their development can be subject to city rules. ETJ boundaries are set by state statute based on city population, and they move outward as the city grows. I verify ETJ status on the city's planning maps during due diligence, because it is invisible on a casual site visit.",
      },
      {
        question: "Do I need city approval to build in the ETJ?",
        answer: "Often yes, alongside the county permit. The typical pattern is a city review of the plat or site plan against the city's subdivision regulations — lot layout, access, street sections, drainage — while the county building department handles the building permit itself. In states where cities can enforce building codes in the ETJ, the city may also review or co-review the building plans. I never assume the county permit is the only approval; I ask the city's planning staff directly what ETJ review they require for the project type, and I get the answer before the design is far enough along to be expensive to change.",
      },
      {
        question: "Whose building code applies in the ETJ?",
        answer: "It depends on the state. Where state law lets the city enforce its building code in the ETJ, the city's adopted edition and amendments govern — which may be newer or stricter than the county's. Where the city's ETJ authority is limited to subdivision, the county's building code applies to the structure while city standards govern the site layout and infrastructure. The split is exactly why I build the jurisdiction matrix: structure under one code, site work under another, each with its own reviewer. Designing the building to the county code when the city enforces its own in the ETJ is a correctable but expensive mistake.",
      },
      {
        question: "Can a city annex my ETJ property after I get a county permit?",
        answer: "Yes — the ETJ is, by design, the land most likely to be annexed next, and annexation converts the project to full city jurisdiction as described in our annexation guidance. An ETJ project permitted by the county can find itself under city authority mid-construction. I treat ETJ projects as annexation-likely from the start: design to the city's standards where they are stricter, keep inspection records immaculate, and confirm how the city handles in-progress county permits before breaking ground. The ETJ is a transitional zone, and the engineering should assume the transition happens.",
      },
    ],
    sections: [
      {
        heading: "Mapping the split review",
        body: "Every ETJ project gets a jurisdiction matrix before design begins. Down the left side: building permit, structural review, MEP review, fire review, plat approval, drainage approval, utility approval, inspections. Across the top: county and city. I fill in who governs each row, which code edition each reviewer enforces, and the submittal path for each — then I send it to both jurisdictions for confirmation. The matrix usually surfaces at least one surprise: a city drainage standard the county does not enforce, or a county inspection the city will not honor. Finding those in a spreadsheet costs nothing; finding them at final inspection costs months.",
      },
      {
        heading: "Designing to two standards at once",
        body: "The engineering approach for the ETJ is straightforward: identify the stricter requirement for each system and design to it. City street and drainage standards typically exceed county minimums, so the civil design follows the city. Building systems follow whichever code the enforcing AHJ adopted — and where both claim authority, the stricter governs. I document the chosen standard and its source on the drawings so each reviewer can see their requirements addressed without hunting through the other jurisdiction's package. The drawings become the common language between two reviewers who rarely talk to each other.",
      },
      {
        heading: "ETJ project checklist",
        body: "An ETJ project is ready to permit when these items are resolved. The ETJ punishes assumptions, so every item is about confirming rather than guessing.\n\n• ETJ status verified on city planning maps, with the city's ETJ authority under state law confirmed\n• Jurisdiction matrix built and confirmed in writing by both the county and the city\n• Plat/site plan routed through the city's ETJ subdivision review before or with the county permit\n• Design reconciled to the stricter of county and city standards for each system\n• Annexation likelihood assessed, with in-progress permit handling confirmed by the city",
      },
    ],
    extraLinks: [
      { label: "How Does Permitting Differ Between a County and a City?", href: "/answers/boulder-county-vs-city-permitting/" },
      { label: "Can a Building Permit Transfer to a New Owner?", href: "/answers/can-a-building-permit-transfer-to-a-new-owner/" },
      { label: "How Do Permit Expirations and Extensions Work?", href: "/answers/how-do-permit-expirations-and-extensions-work/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "multi-jurisdiction-project-permitting",
    title: "How Do You Permit a Project That Spans City and County Lines?",
    description: "One site crossing a city-county line needs approvals from both AHJs. How engineers sequence dual permits and reconcile conflicting code amendments.",
    h1: "How Do You Permit a Project That Spans City and County Lines?",
    answer: "The direct answer is that a project straddling a city-county boundary needs a building permit from each jurisdiction for the portion of the work in its territory, and the engineer's job is to sequence the two reviews so neither one stalls the other while reconciling any conflicting code amendments. There is no joint permit and no lead AHJ by default — the city reviews its half, the county reviews its half, and the project has to satisfy both. I have seen owners assume the larger jurisdiction's permit covers the whole site; it does not, and building the county portion under a city permit is unpermitted work.\n\nSequencing is the first decision. The two reviews run on different timelines — the city may turn a review in three weeks while the county takes eight — so I submit to the slower jurisdiction first and use the waiting period to finalize the faster one's package. Where the building itself crosses the line, which it often does, both AHJs review the same structure, and I need each reviewer's corrections resolved without creating a conflict with the other's. That means one coordinated response package, not two independent ones: I answer both correction lists against a single drawing set, and where the amendments differ, I design to the stricter and show both reviewers why.\n\nInspections need the same coordination. The boundary line runs through the site, so the foundation pour might need the city inspector on one side and the county inspector on the other — sometimes on the same day. I build an inspection matrix keyed to the site plan with the jurisdictional boundary drawn on it, and I schedule both inspectors from a single lookahead rather than letting the contractor call them independently. The project succeeds when the two AHJs never have to talk to each other, because the engineer already translated between them.",
    directAnswer: "A site crossing a city-county line needs a permit from each AHJ for its portion; engineers submit to the slower jurisdiction first, answer both correction lists against one drawing set designed to the stricter amendments, and coordinate inspections from a single schedule.",
    topic: "Jurisdiction & Permitting Authority",
    serviceHref: "/services/civil/",
    faqs: [
      {
        question: "Do I really need two building permits for one project?",
        answer: "Yes, if the work physically sits in two jurisdictions. Each AHJ's authority stops at its boundary, so the city permit covers only the city-side work and the county permit covers only the county-side work. A single building crossing the line gets reviewed by both — each for code compliance of the whole structure as it relates to their enforcement, though in practice they focus on their territory. I confirm the boundary location with a survey tied to the jurisdictional maps, because tax parcels and GIS layers are sometimes wrong by enough to matter.",
      },
      {
        question: "Which jurisdiction's code applies when a building crosses the boundary?",
        answer: "Both — each AHJ enforces its adopted code and amendments on its side of the line, and for a single structure that means the design must satisfy the stricter of the two wherever they differ. Structural, fire-protection, and energy provisions are where amendments most often diverge. In practice I design the whole building to the stricter standard and document compliance with both amendment packages on the code sheets. Designing two halves of one building to two different structural standards is theoretically possible and practically a bad idea.",
      },
      {
        question: "How do you schedule inspections across two jurisdictions?",
        answer: "From one master inspection schedule with the jurisdictional boundary marked on the site plan. I identify which inspections each AHJ requires, note where they overlap on the same work (foundation, framing, rough MEP), and sequence the calls so neither inspector is waiting on the other. The critical rule: no work gets concealed until the AHJ with authority over that location has signed off. I brief the superintendent on the boundary location in the field — a painted line on the slab is worth more than a paragraph in the specs.",
      },
      {
        question: "What if the two jurisdictions' reviewers contradict each other?",
        answer: "It happens, and the engineer's job is to resolve it without making either reviewer the loser. I take the conflicting corrections to both reviewers together — usually by phone or a joint meeting — with a proposed solution that satisfies the stricter requirement, and I get written agreement before revising the drawings. What I never do is quietly satisfy one reviewer and hope the other does not notice; plan checkers talk, and a correction discovered at final inspection is far more expensive than one resolved at plan check. The single coordinated response package is the mechanism that keeps this clean.",
      },
    ],
    sections: [
      {
        heading: "Sequencing the dual submittal",
        body: "I start both permit tracks with a pre-submittal touch at each jurisdiction — not a formal meeting necessarily, but a confirmation of the submittal checklist, the adopted amendments, and the review timeline. Then I submit to the slower AHJ first, usually the county, and finalize the faster jurisdiction's package during the wait. The drawing set is one set with jurisdiction-specific front ends: code compliance sheets that address each AHJ's amendments separately, so each reviewer sees their requirements answered without wading through the other's. When corrections return, I hold the faster jurisdiction's response until I have both lists, then issue one coordinated revision that answers everything at once.",
      },
      {
        heading: "Reconciling conflicting amendments",
        body: "Amendment conflicts cluster in predictable areas: energy code stringency, fire sprinkler thresholds, structural design values for wind or snow, and plumbing fixture requirements. My default resolution is the stricter standard applied project-wide, documented with citations to both amendment packages. Where the stricter standard is genuinely ambiguous — one jurisdiction is stricter on one provision, the other on a different one — I apply each jurisdiction's stricter provision to its own territory and document the split clearly on the plans. The goal is a set that either reviewer can approve without asking the engineer to choose between their amendments.",
      },
      {
        heading: "Multi-jurisdiction permitting checklist",
        body: "A boundary-straddling project permits cleanly when these items are handled. The entire strategy is coordination the AHJs do not provide themselves.\n\n• Jurisdictional boundary surveyed and tied to official maps — not assumed from GIS\n• Separate permits identified for each side, with the slower AHJ submitted first\n• One drawing set with jurisdiction-specific code sheets addressing each amendment package\n• Single coordinated correction response answering both reviewers' lists at once\n• Master inspection schedule with the boundary marked, so no work is concealed without the right sign-off",
      },
    ],
    extraLinks: [
      { label: "How Does the Plan Check Corrections Process Work?", href: "/answers/plan-check-corrections-process-explained/" },
      { label: "How Does Permitting Differ Between a County and a City?", href: "/answers/boulder-county-vs-city-permitting/" },
      { label: "What Drawings Does an MEP Permit Submittal Require?", href: "/answers/mep-permit-drawings-requirements/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "unincorporated-area-fire-marshal-requirements",
    title: "What Does the Fire Marshal Require for Buildings in Unincorporated Areas?",
    description: "Outside city limits the county or state fire marshal replaces the city fire department. What changes for fire protection design and inspections.",
    h1: "What Does the Fire Marshal Require for Buildings in Unincorporated Areas?",
    answer: "The direct answer is that in unincorporated areas, the county fire marshal — or in some states the state fire marshal's office — takes the place of a municipal fire department as the fire AHJ, and while the underlying fire codes are the same family of standards, everything about the process changes: who reviews the plans, what water supply documentation they demand, how inspections are scheduled, and how access for apparatus is judged. I engage the fire marshal during design, not at permit intake, because fire-driven site changes are the most expensive kind to make late.\n\nWater supply is the central issue. Inside a city, the engineer designs to a known municipal system with tested hydrant flows; in unincorporated areas the supply might be a water district system, a private community system, or an on-site tank and pump — and the fire marshal's approval hinges on documented, tested, reliable supply. I get flow test data early, and where the supply is marginal, the design conversation starts with storage and fire pumps rather than hoping the numbers work. The marshal will also scrutinize apparatus access more closely than a city reviewer: road widths, turning radii, grades, and all-weather surfaces on private drives that a city project would never think twice about.\n\nSprinkler and fire alarm submittals go through the marshal's office on its own timeline, often as deferred submittals after the building permit. That is normal, but it means the building design has to anticipate the fire protection requirements — riser room locations, fire pump space, alarm panel locations — before the fire protection engineer ever submits. I coordinate those space and infrastructure needs in the base building design so the deferred submittal does not force architectural changes. The marshal's inspection sequence also tends to be milestone-based with fewer available inspectors, so I build their inspections into the construction schedule as fixed constraints, not float.",
    directAnswer: "In unincorporated areas the county or state fire marshal is the fire AHJ; engineers engage them during design on water supply documentation, apparatus access, and sprinkler/alarm submittals, since fire-driven changes are the costliest to make late.",
    topic: "Jurisdiction & Permitting Authority",
    serviceHref: "/services/mep/",
    faqs: [
      {
        question: "How is the fire marshal different from a city fire department reviewer?",
        answer: "The codes are the same family, but the office is structured differently. A city fire prevention bureau reviews plans full-time with dedicated staff; a county fire marshal's office is often smaller, covers vastly more territory, and its personnel split time between plan review, inspections, and fire investigation. Turnarounds are longer and reviewers are generalists across occupancies. The substantive difference is emphasis: marshals in unincorporated areas focus intensely on water supply reliability and apparatus access, because those are the two things most likely to be inadequate outside city infrastructure.",
      },
      {
        question: "What water supply documentation does a fire marshal require?",
        answer: "Documented, recent, and reliable. Expect to provide certified flow test results showing available fire flow at the required residual pressure, details of the supply source — district system, private system, or on-site storage — and where storage or pumps are involved, calculations and equipment data proving the supply lasts for the required duration. The marshal wants to know the water will be there on the worst day, not just on test day. I provide the full chain: source, storage, pumping, distribution, and the test data tying it together. Anything less draws the first correction.",
      },
      {
        question: "Can fire sprinkler plans be deferred in a county permit?",
        answer: "Usually yes — sprinkler and fire alarm drawings are commonly deferred submittals reviewed by the fire marshal after the building permit issues, just as in cities. But deferred does not mean unplanned: the base building permit set must show riser locations, fire pump room space and access, water service sizing, and alarm panel locations, or the deferred design will collide with finished architecture. I note the deferred submittals on the permit drawings with the performance criteria the deferred design must meet, so the marshal reviewing the base permit can see the fire protection strategy is real.",
      },
      {
        question: "What access requirements apply on private rural roads?",
        answer: "The fire code's access provisions apply regardless of who owns the road: minimum widths, turning radii for apparatus, maximum grades, all-weather surfaces capable of supporting apparatus weight, and turnaround provisions for dead-ends. On private rural drives these are frequently the governing site constraint — a scenic winding drive to a commercial site may need widening, turnouts, or a hammerhead turnaround the owner never imagined. I lay out access to the fire code's criteria during site planning and walk it with the marshal early, because regrading a finished drive is pure waste.",
      },
    ],
    sections: [
      {
        heading: "Designing for the marshal's review",
        body: "I treat the fire marshal as a design partner from schematic phase on an unincorporated project. The early conversation covers water supply strategy, apparatus access routing, building separation and exposure, and whether any local amendments add requirements beyond the model code — wildfire-prone counties often carry defensible-space and ignition-resistant construction provisions that reshape the building envelope and site. Getting the marshal's read on these items before the drawings are detailed means the permit submittal arrives pre-aligned with the reviewer's expectations. The submittal itself gets the same clarity treatment as a county plan check package: assumptions stated, calculations traceable, code paths explicit.",
      },
      {
        heading: "Water supply strategy",
        body: "Every unincorporated fire protection design starts with the supply question and works outward. I verify the source — flow tests on district or private systems, well yield analysis where applicable — and I design storage and pumping to bridge any gap between what the source provides and what the hazard demands. Fire pumps get reliable power with the transfer provisions the code requires; on-site tanks get the capacity, refill, and freeze protection the climate demands. The hydraulic calculations for the sprinkler system tie back to the documented supply, and I keep the test data current — stale flow tests are one of the most common marshal corrections, and retesting mid-review costs weeks.",
      },
      {
        heading: "Fire marshal coordination checklist",
        body: "Fire approval in unincorporated areas goes smoothly when these items are handled early. The marshal's signature is a gating item for occupancy, so none of this can wait.\n\n• Fire marshal engaged during design on supply, access, and any wildfire amendments\n• Certified flow test data and full supply chain documented: source, storage, pumping, distribution\n• Apparatus access laid out to code criteria on all private drives, verified before grading\n• Deferred sprinkler and alarm submittals anticipated in the base building design with space reserved\n• Marshal inspections built into the construction schedule as fixed milestones",
      },
    ],
    extraLinks: [
      { label: "How Are Fire Sprinkler Systems Hydraulically Designed?", href: "/answers/fire-sprinkler-hydraulic-design-explained/" },
      { label: "What Are the Main Types of Fire Sprinkler Systems?", href: "/answers/fire-sprinkler-system-types-explained/" },
      { label: "How Is a Fire Alarm System Designed?", href: "/answers/fire-alarm-system-design-explained/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "county-vs-city-plumbing-code-amendments",
    title: "How Do Plumbing Code Amendments Differ Between County and City?",
    description: "Plumbing amendments differ between county and city AHJs. How engineers identify which local amendments apply and design to the correct one.",
    h1: "How Do Plumbing Code Amendments Differ Between County and City?",
    answer: "The direct answer is that the county and the neighboring city usually adopt the same model plumbing code but different local amendments — and the amendments are where the real design requirements live: water-conserving fixture mandates, grease interceptor sizing rules, backflow prevention details, and medical gas or special-waste provisions. The model code gets you in the neighborhood; the amendments decide the fixture schedule, the interceptor size, and whether your backflow assembly needs a heated enclosure. I confirm the AHJ's amendment package before laying out a single restroom.\n\nAmendments diverge for understandable reasons. Cities often adopt stricter water-efficiency provisions driven by municipal conservation programs; counties may carry amendments aimed at septic-system protection, wellhead setbacks, or agricultural and industrial waste handling that cities never need. Backflow requirements are a frequent split: the water purveyor — often a special district in unincorporated areas rather than the city water department — sets its own cross-connection standards on top of the plumbing code, and the engineer has to satisfy both. I read the purveyor's requirements as carefully as the code amendments, because the purveyor can refuse the water connection regardless of what the building permit says.\n\nTracking this across projects is a systems problem. I maintain the amendment picture per AHJ rather than per project: which code edition the county enforces, which the city enforces, and the delta between them on the provisions that affect plumbing design. On every project the code compliance sheet names the AHJ, the adopted edition, and the applicable amendments explicitly, so the reviewer sees their rules reflected back. When a project sits near a boundary or in an ETJ, I design to the stricter amendment and note both. The plumbing design that fails plan check almost always failed on an amendment the engineer never looked up.",
    directAnswer: "County and city plumbing amendments diverge on fixtures, interceptors, backflow, and special wastes; engineers confirm the AHJ's amendment package plus the water purveyor's cross-connection rules before design, and design to the stricter where jurisdictions overlap.",
    topic: "Jurisdiction & Permitting Authority",
    serviceHref: "/services/mep/",
    faqs: [
      {
        question: "Where do I find a jurisdiction's plumbing code amendments?",
        answer: "Start with the building department's website — most AHJs publish their adopted code edition and local amendments as a downloadable document or ordinance. If it is not posted, call the plumbing plan reviewer and ask; they will tell you, and the five-minute call also builds the relationship. For the water purveyor's cross-connection requirements, go to the purveyor directly — city water department, county water district, or special district — because those rules live outside the building code entirely. I collect all three sources (model code, local amendments, purveyor rules) before design on every project.",
      },
      {
        question: "Why would a county amendment be stricter than the city's?",
        answer: "Because the county is protecting different things. Septic-system protection drives county amendments on kitchen waste, garbage disposals, and water softener discharge that cities on sewer never consider. Wellhead and groundwater protection adds setback and material requirements. And counties with significant agricultural or industrial activity carry special-waste provisions — chemical waste, process drainage, washdown water — that urban amendments skip. Stricter is not a city monopoly; it follows the risk, and the county's risks are different.",
      },
      {
        question: "Do plumbing amendments affect the fixture schedule?",
        answer: "Directly. Water-efficiency amendments set maximum flow rates and flush volumes that can be stricter than the model code, and some jurisdictions mandate specific fixture types — metering faucets in public restrooms, for example, or high-efficiency toilets across the board. The fixture schedule I put on the drawings cites the governing provision for each choice, so the reviewer can verify compliance without a separate narrative. Value-engineering a fixture after permit without checking the amendment is how projects end up ripping out installed product at final inspection.",
      },
      {
        question: "Who governs backflow prevention — the plumbing code or the water purveyor?",
        answer: "Both, and the purveyor usually wins ties. The plumbing code sets the baseline: which hazards require which type of backflow assembly. The water purveyor — city department, county district, or special district — sets its own cross-connection control program with testing, registration, and sometimes stricter assembly requirements or enclosure standards. The purveyor inspects and can shut off water for noncompliance independent of the building permit. I design to the purveyor's published requirements and coordinate assembly locations with them early, because a purveyor rejection at meter set is a project-stopper.",
      },
    ],
    sections: [
      {
        heading: "Building the amendment picture",
        body: "For each AHJ I work in regularly, I keep a current record: adopted plumbing code edition, the local amendment document with its effective date, and the water purveyor's cross-connection requirements. Before a project starts, I verify nothing changed — amendments update on their own cycles, and designing to last year's package is a correctable but schedule-eating error. On the drawings, the plumbing code compliance notes name the edition and the specific amendments the design follows, provision by provision for anything nonstandard. A reviewer who can trace every design decision to a cited requirement approves faster than one who has to ask.",
      },
      {
        heading: "Where amendments bite hardest",
        body: "Four areas generate most amendment-driven corrections. Grease interceptors: sizing methods and maintenance access rules vary widely, and counties on septic are notably stricter. Backflow: purveyor requirements on assembly type, location, and freeze protection exceed the code baseline in many jurisdictions. Water efficiency: fixture flow rates and types follow local conservation mandates. Special wastes: laboratories, medical, food service, and industrial process drainage each carry amendment-level detail that the model code leaves generic. I check all four against the amendment package during schematic design, when changes are still cheap, rather than discovering them in a correction letter.",
      },
      {
        heading: "Plumbing amendment compliance checklist",
        body: "A plumbing design survives plan check when these items are verified. Amendments are the fine print that governs the design, so the fine print gets read first.\n\n• AHJ's adopted code edition and current local amendment package confirmed before design\n• Water purveyor's cross-connection and backflow requirements collected from the purveyor directly\n• Fixture schedule keyed to the applicable efficiency amendments, not just the model code\n• Grease, special waste, and interceptor provisions checked against county-specific rules where applicable\n• Code compliance notes on the drawings cite the edition and amendments the design follows",
      },
    ],
    extraLinks: [
      { label: "What Does the IPC Plumbing Code Require?", href: "/answers/ipc-plumbing-code-requirements-explained/" },
      { label: "How Is a Grease Interceptor Sized?", href: "/answers/grease-interceptor-sizing-explained/" },
      { label: "How Is a Building Sewer Designed?", href: "/answers/building-sewer-design/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "special-district-utility-approvals",
    title: "What Are Special District Utility Approvals and How Do They Affect Permits?",
    description: "Water, sewer, and special districts approve connections separately from the building permit. How engineers sequence district approvals alongside the AHJ.",
    h1: "What Are Special District Utility Approvals and How Do They Affect Permits?",
    answer: "The direct answer is that water districts, sewer districts, and other special districts are independent approval authorities: they control connection to their systems, set their own design standards and fees, and run their own review timelines — entirely separate from the city or county building permit. Your building permit does not grant you a water connection, and the district can stop your project at the meter regardless of what the building department approved. I treat district approval as a parallel permit track from day one, with its own schedule and its own reviewer.\n\nSpecial districts exist because utilities do not follow jurisdictional boundaries. A water district may serve parts of a city, unincorporated county land, and a neighboring town — applying one set of standards across all three. That means the district's design manual, not the city's, governs your water service sizing, backflow requirements, meter location, and fire-flow availability; the sewer district's manual governs your lateral design, pretreatment, and connection fees. These manuals are detailed engineering documents, and district reviewers enforce them strictly — they own and maintain the system you are connecting to, so their standards protect their infrastructure first.\n\nThe sequencing matters because districts move at their own pace and their approvals gate construction milestones. A will-serve letter or availability letter is usually needed before the building permit application is even complete; capacity fees and connection fees can be due before permit issuance; and the district inspects its own work — taps, meters, laterals — on a schedule the contractor does not control. I get the will-serve letter during due diligence, submit utility plans to the district in parallel with the building permit, and confirm fee timing early because district connection fees are routinely the largest single permit-related cost on a commercial project. The project that discovers the district late discovers it expensively.",
    directAnswer: "Special districts approve utility connections independently of the building permit, with their own standards, fees, and timelines — engineers run district approval as a parallel track starting with a will-serve letter during due diligence.",
    topic: "Jurisdiction & Permitting Authority",
    serviceHref: "/services/civil/",
    faqs: [
      {
        question: "What is a special district in the context of utilities?",
        answer: "A special district is a local government entity created to provide a specific service — water supply, sewer collection, fire protection, flood control — across an area that does not match city or county boundaries. It has its own elected or appointed board, its own revenue from rates and fees, and its own engineering standards. For your project, the practical meaning is simple: the district is a separate government you must satisfy, with separate applications, separate plan review, and separate inspections, in addition to the city or county building permit.",
      },
      {
        question: "Do I need district approval before applying for a building permit?",
        answer: "In most cases you need at least the district's will-serve or availability letter before the building permit application is considered complete — the AHJ wants proof that water and sewer service exist for the project. Full district plan approval for your utility connections typically runs in parallel with building plan check. I sequence it as: will-serve letter in due diligence, utility plan submittal to the district alongside the building permit submittal, and district fees budgeted from the start. Waiting until building plan check to contact the district is the most common utility-related schedule mistake I see.",
      },
      {
        question: "How much do special district connection fees cost?",
        answer: "They vary enormously by district and project type, but on commercial projects the combined water and sewer capacity and connection fees are often the largest permit-related cost — sometimes exceeding the building permit fee several times over. Fees are typically based on meter size, fixture count, or equivalent dwelling units, plus the actual cost of the tap and lateral installation. I get the district's fee schedule during due diligence and put real numbers in the project budget early. Surprise five-figure fees at permit issuance have killed project financing; they should never be a surprise.",
      },
      {
        question: "Who inspects the utility connection — the district or the building inspector?",
        answer: "The district inspects its own system: the tap, the meter assembly, the sewer lateral to the main, and any district-required backflow or pretreatment devices. The building inspector covers the on-site plumbing up to the point of connection. The handoff point is defined in the district's standards — usually at the meter or the property line — and both inspectors need to sign off on their side before the system goes live. I coordinate the two inspections through the construction schedule because the district inspector works on the district's calendar, not the contractor's, and a missed district inspection can hold up the water meter set by weeks.",
      },
    ],
    sections: [
      {
        heading: "Identifying every district on your site",
        body: "Due diligence for utilities means identifying every special district with authority over the parcel: water, sewer, fire (in some areas the fire district is separate from the fire marshal), flood control or drainage, and sometimes irrigation or reclaimed water. I pull this from the county assessor, the local agency formation commission records where they exist, and direct calls — district boundaries are poorly represented in most GIS tools. Each district gets its own row in the project tracker: contact, application requirements, design manual, fee schedule, review timeline, and inspection process. A district you do not know about is a district whose requirements you will discover at the worst possible time.",
      },
      {
        heading: "Designing to district standards",
        body: "District design manuals are prescriptive in ways building codes are not: exact meter assembly configurations, approved materials lists, lateral slopes and depths, backflow assembly types and enclosures, grease interceptor specifications, and fire service layouts. I design the site utilities to the district manual first and the plumbing code second, because the district reviewer's checklist is the manual. Where the manual and the code conflict, I satisfy the stricter and document both — but I raise genuine conflicts with the district engineer early rather than designing around them silently. District reviewers respect engineers who ask about the conflict before submittal; they correct engineers who ignore it.",
      },
      {
        heading: "Special district approval checklist",
        body: "Utility approvals stay off the critical path when these items are handled in order. Districts are independent governments — treat their process with the same seriousness as the building permit.\n\n• Every water, sewer, fire, and drainage district identified during due diligence\n• Will-serve or availability letters secured before the building permit application\n• Utility plans submitted to each district in parallel with building plan check\n• Connection and capacity fees budgeted from real district fee schedules, not allowances\n• District inspections coordinated on the district's calendar, with the handoff point to building inspection defined",
      },
    ],
    extraLinks: [
      { label: "How Is a Building Sewer Designed?", href: "/answers/building-sewer-design/" },
      { label: "What Is a Campus Utility Master Plan?", href: "/answers/campus-utility-master-plan/" },
      { label: "How Do Water and Wastewater Systems Serve Large Sites?", href: "/answers/airport-water-wastewater-systems/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "texas-etj-utility-extension-rules",
    title: "How Do Utility Extension Rules Work in a Texas ETJ?",
    description: "Texas ETJ development often means developer-funded utility extensions. Who approves capacity, how extension agreements work, and what engineers document.",
    h1: "How Do Utility Extension Rules Work in a Texas ETJ?",
    answer: "The direct answer is that in a Texas ETJ, extending city water or sewer to your site typically means the developer designs and funds the extension under an agreement with the city or utility provider, and capacity approval — the formal confirmation that the system can serve your project — comes from whoever owns the system you are connecting to. Texas cities use ETJ utility extension agreements to push infrastructure costs onto development while protecting existing customers' service. I treat the extension agreement as a project-defining document: it sets who pays, who builds, who owns the finished line, and what capacity is reserved.\n\nThe capacity question comes first. Before any agreement is negotiated, the system owner — the city utility department, a municipal utility district (MUD), or a water supply corporation — evaluates whether its treatment plants, storage, and trunk lines can absorb your project's demand. That evaluation is an engineering exercise: projected flows against available capacity under the system's planning criteria. If capacity exists, the agreement reserves it for your project, usually with a time limit and a fee; if it does not, you are looking at system upgrades as part of your development cost, or a phased project that matches available capacity. I get the capacity determination in writing before the owner closes on the land if at all possible, because \"we'll figure out utilities later\" is how ETJ projects die.\n\nThe extension itself is developer-funded infrastructure built to the system owner's standards and then typically dedicated to the owner upon acceptance. That means I design the water and sewer extensions to the city or district's design manual — pipe materials, depths, easement widths, lift station standards — knowing their inspectors will review and accept the work. Oversizing provisions are common: the agreement may require you to build larger lines than your project needs to serve future development, with reimbursement mechanisms for the extra capacity. I model the hydraulics for both the project and the ultimate buildout the agreement contemplates, because an extension that serves only your phase one will draw a correction from a reviewer planning for phase ten.",
    directAnswer: "In a Texas ETJ the developer typically funds water/sewer extensions under an agreement with the system owner, who must first confirm capacity in writing; engineers design the extension to the owner's standards, model ultimate buildout, and document the agreement's cost and ownership terms.",
    topic: "Jurisdiction & Permitting Authority",
    serviceHref: "/services/civil/",
    faqs: [
      {
        question: "Who pays for utility extensions in a Texas ETJ?",
        answer: "Almost always the developer. Texas cities and utility providers generally require the developing party to design, construct, and fund extensions of water and sewer mains to serve ETJ development, with the infrastructure dedicated to the system owner after acceptance and testing. The extension agreement spells out the cost responsibility, including any required oversizing for future development and whether reimbursement is available when later projects connect to your line. I make sure the owner sees the full extension cost — design, construction, easements, fees, and any system upgrades — before committing to the site, because it routinely exceeds the building construction budget's utility allowance by multiples.",
      },
      {
        question: "What is a capacity approval and who issues it?",
        answer: "Capacity approval is the system owner's formal determination that its water and sewer systems can serve your project's projected demand — and it is issued by whoever owns and operates the system: the city utility department, a MUD, or a water supply corporation. It typically takes the form of a will-serve letter or capacity reservation tied to the extension agreement, often with an expiration date and a reservation fee. Without it, there is no project: no building permit application is complete without proof of service. I pursue it during due diligence, with preliminary demand calculations in hand, so the owner's go/no-go decision rests on facts.",
      },
      {
        question: "What is a MUD and how does it affect my project?",
        answer: "A municipal utility district is a special-purpose district created under Texas law to provide water, sewer, drainage, and sometimes roads to developing areas — very common in ETJ territory around growing Texas cities. If your site is in a MUD, the MUD (not the city) is your utility provider and approval authority: its engineer reviews your utility plans, its board approves the extension, and its tax rate affects the project's economics. I identify MUD jurisdiction during due diligence and open coordination with the MUD's engineer early, because MUD standards and timelines are their own world with their own rhythm.",
      },
      {
        question: "Can the city require me to oversize the utility extension?",
        answer: "Yes, and it frequently does. Extension agreements commonly require the developer to install larger water and sewer mains than the project itself needs, so the infrastructure can serve anticipated future development in the area. The agreement should address reimbursement — mechanisms like pro-rata charges or impact-fee credits that compensate you when later development connects to the capacity you built. I size the hydraulics for the ultimate condition the agreement describes and make sure the reimbursement terms are explicit and enforceable before construction. Oversizing without a reimbursement path is a gift to future developers funded by your client.",
      },
    ],
    sections: [
      {
        heading: "The extension agreement",
        body: "I read the utility extension agreement the way I read an annexation agreement — as the document that controls the project's infrastructure economics. Key provisions: the scope of the extension (which mains, what sizes, what appurtenances), design standards and the approving engineer, construction inspection and acceptance testing requirements, the dedication process transferring ownership to the system owner, capacity reservation terms with quantities and expiration, fee and cost responsibility including oversizing, and reimbursement mechanisms for future connections. Anything vague in the agreement becomes a dispute during construction; I push for specificity before the owner signs, particularly on who pays for rock excavation, dewatering, or other subsurface surprises along the extension route.",
      },
      {
        heading: "Designing the extension",
        body: "The civil design follows the system owner's design manual to the letter — this is infrastructure they will own and maintain for decades, and their reviewers check accordingly. I model water distribution for the project's peak demands plus fire flow, and sewer collection for peak wet-weather flows, in both the initial and ultimate buildout conditions. Easements get dedicated at the widths the owner requires, with access for maintenance equipment, not just the pipe. Lift stations, where gravity service is not feasible, are designed to the owner's standards for equipment, controls, backup power, and access — a lift station the owner will not accept is a stranded asset. The extension plans go through the owner's engineer review in parallel with the site's building permit track.",
      },
      {
        heading: "Texas ETJ utility extension checklist",
        body: "An ETJ utility extension succeeds when these items are locked down early. The extension is often the project's longest lead item, so it starts first.\n\n• System owner identified (city utility, MUD, or supply corporation) with capacity confirmed in writing\n• Extension agreement negotiated with clear terms on scope, cost, oversizing, and reimbursement\n• Full extension cost — design, construction, easements, fees, upgrades — in the project budget\n• Extension designed to the owner's manual for initial and ultimate buildout conditions\n• Dedication, testing, and acceptance criteria understood before construction begins",
      },
    ],
    extraLinks: [
      { label: "How Is a Building Sewer Designed?", href: "/answers/building-sewer-design/" },
      { label: "How Do Water and Wastewater Systems Serve Large Sites?", href: "/answers/airport-water-wastewater-systems/" },
      { label: "What Does Commercial Site Civil Design Cover?", href: "/answers/dfw-logistics-park-site-civil-design/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "florida-unincorporated-development-review",
    title: "How Does Development Review Work in Unincorporated Florida Counties?",
    description: "Florida county development review runs on concurrency and DRC processes. How the unincorporated county path differs from the municipal route.",
    h1: "How Does Development Review Work in Unincorporated Florida Counties?",
    answer: "The direct answer is that development in unincorporated Florida goes through the county's development review process — typically a Development Review Committee (DRC) with concurrency review — where the county checks your project against its comprehensive plan for adequate public facilities: roads, water, sewer, drainage, parks, and schools. This is a land-development approval that runs before and alongside the building permit, and it is more involved than most newcomers expect. I treat the county development order as the project's first major entitlement milestone, because nothing downstream moves without it.\n\nConcurrency is Florida's distinctive requirement: the county must find that public facilities have adequate capacity to serve your project at the adopted level of service, or the project does not get approved. For the engineer, that means traffic impact analysis for roadway concurrency, utility capacity letters for water and sewer, and drainage design that meets the county's stormwater level of service — all packaged for DRC review. The DRC itself is a multi-agency table: planning, engineering, utilities, fire, environmental, and sometimes the water management district all review the site plan together and issue a consolidated comment set. One coordinated review is the advantage; the disadvantage is that every agency's concerns land at once.\n\nCompared with the municipal path, the county process covers more ground per review but moves more slowly. A Florida city runs a similar site-plan review, often faster and with staff the engineer sees repeatedly; the county DRC handles everything from subdivisions to commercial site plans across the whole unincorporated area, and the reviewers are generalists across project types. The engineering deliverables are the same family — civil site plans, drainage calculations, utility plans, landscape and lighting — but the county's checklists are longer and its resubmittal cycles slower. I front-load the concurrency-sensitive items (traffic, utilities, drainage) because a concurrency failure is a redesign, not a correction.",
    directAnswer: "Unincorporated Florida development goes through the county DRC with concurrency review proving adequate roads, water, sewer, and drainage capacity; engineers front-load traffic, utility, and stormwater analysis since concurrency findings drive approval.",
    topic: "Jurisdiction & Permitting Authority",
    serviceHref: "/services/civil/",
    faqs: [
      {
        question: "What is concurrency in Florida development review?",
        answer: "Concurrency is the state-rooted requirement that public facilities — roads, potable water, sanitary sewer, drainage, parks, solid waste, and schools — have adequate capacity available at the county's adopted level of service when your development's impacts hit. The county measures your project's demand against available capacity; if the system is already at its limit, your project must mitigate (road improvements, for example), wait for planned capacity, or it does not get approved. For engineers, concurrency turns traffic studies, utility demand calculations, and drainage analysis into entitlement documents, not just design documents. I scope them to the county's methodology from the start, because a study the county cannot use is money spent twice.",
      },
      {
        question: "What is a Development Review Committee (DRC)?",
        answer: "The DRC is the county's interagency review body for development applications — planning, engineering, utilities, fire rescue, environmental, and legal staff reviewing your site plan together and issuing consolidated comments. You typically present or respond at scheduled DRC meetings on a fixed cycle (weekly or biweekly in larger counties). The benefit is one coordinated comment set instead of sequential agency reviews; the discipline it demands is a complete, coordinated submittal, because an incomplete package burns a whole cycle. I use the county's pre-application meeting to learn exactly what the DRC expects before the first formal submittal.",
      },
      {
        question: "How does the county path differ from developing inside a Florida city?",
        answer: "The structure is similar — site plan review, concurrency, then building permit — but the county process is broader and slower. County DRCs review every project type across the entire unincorporated area, so reviewers are less specialized and cycles run longer than a busy city's development review. Cities often have more staff continuity, meaning you see the same reviewers project after project. The substantive standards can also differ: county stormwater, roadway, and utility criteria reflect rural-to-suburban conditions and water management district rules, while cities layer on urban form standards. I scope schedule and fee to the county's actual cycle times, not the city's.",
      },
      {
        question: "Do I need water management district approval too?",
        answer: "Very often, yes. Florida's water management districts regulate stormwater management systems, wetland impacts, and water use separately from the county's development review — an environmental resource permit for your stormwater system is a parallel approval with its own application, criteria, and timeline. The county will want to see the district permit (or at least the application underway) before final development approval. I run the district permitting in parallel with the DRC process from the beginning, designing the stormwater system to satisfy both the district's and the county's criteria in one design. Two stormwater designs for one site is the failure mode to avoid.",
      },
    ],
    sections: [
      {
        heading: "Navigating the DRC cycle",
        body: "The DRC runs on a fixed calendar — application deadlines, staff review periods, meeting dates — and I plan the project around it from the entitlement schedule's first draft. The pre-application conference is the highest-value meeting in the process: county staff tell you which studies they require, which concurrency methodologies apply, and what the hot-button issues are for your site. I come with a concept plan and specific questions, not a blank slate. The formal submittal then arrives complete: site plans, drainage report, utility plans, traffic study, landscape plans — everything the checklist requires, because a deficient submittal does not get a partial review, it gets deferred to the next cycle.",
      },
      {
        heading: "Concurrency-sensitive engineering",
        body: "Three engineering workstreams carry concurrency weight and deserve early, careful effort. Traffic: the impact study follows the county's adopted methodology and trip generation rates, and its findings can trigger off-site improvements that reshape the project budget — I get the traffic engineer scoped during due diligence. Utilities: capacity letters from the water and sewer providers confirming adequate supply and treatment capacity at the adopted level of service, secured before the DRC submittal. Drainage: stormwater design meeting both the county's level of service and the water management district's criteria, since a system that passes one and fails the other still fails. These three decide whether the project is approvable; everything else is refinement.",
      },
      {
        heading: "Florida county development review checklist",
        body: "County development approval in Florida proceeds smoothly when these items are sequenced correctly. The process rewards completeness and punishes partial submittals.\n\n• Pre-application conference held; county's required studies and methodologies confirmed\n• Concurrency-sensitive work (traffic, utility capacity, drainage) completed to county methodology\n• Water management district environmental resource permit pursued in parallel with DRC\n• Complete DRC submittal package filed to the county's checklist — no placeholder sheets\n• Development order conditions tracked into the building permit drawings so nothing is lost between approvals",
      },
    ],
    extraLinks: [
      { label: "How Do Stormwater Ordinances Shape Site Design?", href: "/answers/charlotte-stormwater-ordinance-design/" },
      { label: "How Is Stormwater Managed on Industrial Sites?", href: "/answers/gulf-coast-industrial-stormwater-design/" },
      { label: "How Does the Plan Check Corrections Process Work?", href: "/answers/plan-check-corrections-process-explained/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "arizona-county-vs-city-grading-permits",
    title: "Do Grading Permits Differ Between Arizona Counties and Cities?",
    description: "Arizona grading permits split between county flood control districts and city engineering. Who reviews your grading plan and what each AHJ scrutinizes.",
    h1: "Do Grading Permits Differ Between Arizona Counties and Cities?",
    answer: "The direct answer is yes — in Arizona, grading and drainage permits in unincorporated county land typically run through the county engineering department and the county flood control district, while inside a city they run through the city's engineering department, and the two paths differ in criteria, review depth, and who signs off on drainage. Arizona's monsoon-driven flood risk makes drainage the dominant grading concern statewide, and the county flood control district is a powerful, technically deep reviewer that many out-of-state engineers underestimate. I treat the flood control district as a co-AHJ on every county grading project.\n\nThe county path centers on the flood control district's drainage criteria: detention and retention requirements, wash and watercourse setbacks, finished-floor elevations above base flood levels, and erosion protection designed for the district's hydrology manual. County grading permits also tend to bundle more — grading, drainage, sometimes paving and off-site improvements — under one review with a longer timeline. The city path is usually faster and more standardized, with the city engineer reviewing to the city's drainage manual, but cities in Arizona carry their own strict stormwater quality and retention rules that can exceed the county's. Neither is lenient; they are strict about different things.\n\nWhat changes for the engineer is the design basis. County work means designing to the flood control district's hydrology — its rainfall data, its routing methods, its detention sizing criteria — and coordinating any work in or near washes and floodplains with the district early, because floodplain encroachment triggers federal and state considerations beyond the grading permit. I verify the flood zone status from the current FEMA maps during due diligence, not after the grading plan is drawn. In the city, I design to the city engineer's manual and confirm whether the city defers any drainage review to the county flood control district anyway — which happens more often than owners expect, creating a hybrid review even inside city limits.",
    directAnswer: "Arizona county grading permits run through county engineering and the flood control district with district hydrology criteria, while city permits run through the city engineer; engineers design to the reviewing agency's drainage manual and verify flood zone status during due diligence.",
    topic: "Jurisdiction & Permitting Authority",
    serviceHref: "/services/civil/",
    faqs: [
      {
        question: "What does an Arizona county flood control district review?",
        answer: "The district reviews drainage and floodplain aspects of your project: hydrology calculations per the district's manual, detention/retention sizing, storm drain design, watercourse and wash setbacks, finished-floor elevations relative to flood levels, erosion and scour protection, and any encroachment into regulated floodplains or washes. District reviewers are drainage specialists — often the most technically demanding reviewers on the project — and their comments go deep on hydrology. I submit drainage reports that follow the district's format and methods exactly, because a report in the wrong methodology gets returned without technical review.",
      },
      {
        question: "Do I need a separate grading permit or is it part of the building permit?",
        answer: "In most Arizona jurisdictions, grading is a separate permit from the building permit — applied for separately, reviewed by engineering rather than building plan check, and often issued on its own timeline. Many projects pull the grading permit first to start earthwork while the building permit is still in review, which is legitimate schedule strategy where the jurisdiction allows it. But the grading permit has its own conditions: dust control, stormwater pollution prevention, and sometimes archaeological or native plant clearances. I sequence the grading permit as its own track with its own submittal, not as an afterthought to the building permit.",
      },
      {
        question: "How do monsoon storms affect Arizona grading design?",
        answer: "Profoundly. Arizona's intense, short-duration monsoon bursts produce flash flooding with little warning, so drainage design is built around high-intensity events: conservative runoff coefficients, robust inlet and channel capacity, energy dissipation at outfalls, and erosion protection sized for velocities that humid-climate engineers find startling. During construction, the stormwater pollution prevention plan has to handle the reality that a single afternoon storm can move a poorly protected site's sediment into the downstream system. I design both the permanent drainage and the construction-phase controls for monsoon intensity, because the district reviewers certainly do.",
      },
      {
        question: "What if my site is in or near a wash or floodplain?",
        answer: "Then the flood control district — and potentially federal floodplain regulations — govern what you can do. Work in a regulated wash or floodplain may require a floodplain use permit in addition to the grading permit, with analyses showing no adverse rise in flood levels and no increase in downstream hazard. Setbacks from wash banks are non-negotiable and can consume significant site area. I delineate washes, floodplains, and erosion hazard setbacks on the concept plan before the site layout is fixed, because discovering the wash after the building is sited means starting the layout over. Early coordination with the district on floodplain questions is never wasted time.",
      },
    ],
    sections: [
      {
        heading: "County path: engineering plus flood control",
        body: "On unincorporated county land, I plan for two engineering reviewers: county engineering for the grading, paving, and improvement plans, and the flood control district for drainage and floodplain matters. The submittal package splits accordingly — grading and improvement plans to engineering, drainage report and floodplain analyses to the district — though some counties route it as one intake. Timelines run longer than the city path, and district comments are technically detailed, so I budget for at least one substantive response cycle on hydrology. Pre-submittal coordination with the district on methodology — which rainfall data, which routing method, which detention criteria — prevents the most common first-round rejection: a correct analysis in the wrong framework.",
      },
      {
        heading: "City path: faster but still strict",
        body: "Inside Arizona cities, the city engineer's office handles grading and drainage review to the city's manual, usually on a faster cycle with more predictable checklists. But \"faster\" does not mean \"easier\": Arizona cities enforce retention-heavy stormwater rules — many require retaining the full design storm on site — plus stormwater quality provisions and dust control ordinances with real enforcement teeth. I also confirm whether the city routes any drainage review back to the county flood control district, because that hybrid review changes both the timeline and the design basis. The city permit set references the city's manual throughout, with the same rigor the district would demand.",
      },
      {
        heading: "Arizona grading permit checklist",
        body: "Grading approval in Arizona goes smoothly when the drainage basis is right from the start. Water runs the process here — get the hydrology correct and the rest follows.\n\n• Flood zone and wash delineation completed during due diligence from current maps\n• Reviewing agencies identified: county engineering, flood control district, or city engineer — or a hybrid\n• Drainage report built on the reviewing agency's hydrology manual, methods, and formats\n• Grading permit sequenced as its own track, with dust control and stormwater pollution prevention addressed\n• Floodplain or wash encroachments coordinated with the district before the site layout is fixed",
      },
    ],
    extraLinks: [
      { label: "How Is Hillside Grading Designed in the Mountain West?", href: "/answers/arvada-jefferson-county-hillside-grading/" },
      { label: "How Is Stormwater Detention Designed for Monsoon Climates?", href: "/answers/el-paso-monsoon-stormwater-detention/" },
      { label: "How Does Agricultural Drainage Design Work?", href: "/answers/ag-drainage-design/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "california-county-title-24-enforcement",
    title: "How Is Title 24 Enforced Through a California County Building Department?",
    description: "California counties enforce Title 24 through county plan check. What county reviewers scrutinize and how engineers prepare compliant submittals.",
    h1: "How Is Title 24 Enforced Through a California County Building Department?",
    answer: "The direct answer is that a California county building department enforces Title 24 — the state's energy code — as part of its plan check process, applying the same statewide standards a city would, but with reviewers who are often generalists rather than energy specialists and with timelines that run longer. Title 24 does not get easier outside city limits; the standards are state law. What changes is the review experience: fewer dedicated energy reviewers, broader correction lists, and a process where the quality of your compliance documentation matters more because the reviewer has less time to interpret it for you.\n\nCounty plan checkers scrutinize the same pressure points city energy reviewers do, but I prepare the package assuming less hand-holding. The compliance forms — generated by the approved energy modeling software — must be complete, internally consistent, and matched to the drawings: every fenestration schedule entry, every lighting power density, every mechanical equipment efficiency needs to tie between the forms and the plans. Inconsistencies that a city energy specialist might resolve with a quick question become correction items in a county review, each one costing a cycle. I run a forms-to-drawings cross-check before submittal as a non-negotiable step.\n\nThe practical differences show up in three areas. First, lighting and mechanical compliance: county reviewers check the mandatory measures and prescriptive packages carefully, and performance-method projects get closer scrutiny because the reviewer is verifying modeling inputs they did not set up. Second, the field inspection side — county inspectors covering large territories verify Title 24 installation measures (insulation grades, duct testing, lighting controls) on the same visits as everything else, so the construction documents need to make the required verifications unmistakable. Third, local amendments: some counties layer reach-code-style amendments onto Title 24 for specific project types, particularly around electrification. I confirm the county's amendment posture during due diligence, because a reach provision discovered at plan check can force equipment reselection.",
    directAnswer: "California counties enforce the same statewide Title 24 standards as cities through county plan check, with generalist reviewers and longer timelines — so engineers submit meticulously cross-checked compliance documentation and confirm any county-level energy amendments up front.",
    topic: "Jurisdiction & Permitting Authority",
    serviceHref: "/services/mep/",
    faqs: [
      {
        question: "Is Title 24 the same in counties as in cities?",
        answer: "The base standards are identical — Title 24 is state law, and the energy code does not vary by jurisdiction. What can vary are local amendments: some cities and counties adopt reach provisions that exceed the state minimum, most commonly around building electrification, solar, or EV charging. The enforcement experience also differs: cities often have dedicated energy plan checkers, while counties typically fold energy review into generalist plan check. I always check for local amendments beyond the state code, because those — not the base Title 24 — are what surprise engineers moving between jurisdictions.",
      },
      {
        question: "What do county plan checkers scrutinize most in Title 24 submittals?",
        answer: "Consistency and completeness. The most common county corrections are mismatches between the compliance forms and the drawings — a window schedule that does not match the modeled fenestration, lighting wattages that differ from the power calculations, mechanical equipment schedules missing the efficiency values the forms claim. County reviewers also check mandatory measures closely: insulation installation quality provisions, duct sealing and testing requirements, and lighting control requirements. I treat the submittal as guilty until proven innocent: every number on the forms gets traced to a drawing or schedule before it goes in.",
      },
      {
        question: "Does the performance method get extra scrutiny in county review?",
        answer: "In practice, yes. A prescriptive compliance package is a checklist the reviewer can verify line by line; a performance-method package asks the reviewer to trust an energy model they did not build, with proposed-versus-standard budget comparisons. Generalist county reviewers handle this by checking inputs meticulously against the drawings and sometimes by asking for additional documentation. I make performance submittals reviewer-friendly: a clear narrative of the modeling approach, input summaries keyed to the drawings, and the compliance forms complete and signed. The easier I make verification, the faster the review.",
      },
      {
        question: "How does Title 24 field verification work with county inspectors?",
        answer: "The same required verifications apply — insulation installation quality, duct leakage testing, refrigerant charge verification, lighting controls acceptance testing — but they are performed by county field inspectors covering large territories, often combined with other inspections on the same visit. That makes clear construction documents critical: the inspector needs to see at a glance which verifications apply, who performs them (inspector versus third-party rater), and at what construction stage. I also confirm whether the county requires third-party HERS verification for the project's measures and get the rater engaged before construction, because scheduling a rater after drywall is up is an expensive lesson.",
      },
    ],
    sections: [
      {
        heading: "Preparing a county-ready Title 24 package",
        body: "My county Title 24 package is built for a reviewer seeing it cold. The compliance forms come from the current approved software version for the code cycle in effect — using last cycle's forms is an automatic correction. Every schedule on the drawings (fenestration, lighting, mechanical equipment) is reconciled to the forms before submittal, and the reconciliation is documented so the reviewer can follow it. The energy compliance narrative states the compliance approach — prescriptive or performance — and lists any local amendments the design addresses. I also include the mandatory-measures checklist marked up for the project, because county reviewers check mandatory measures first and prescriptive details second.",
      },
      {
        heading: "Lighting, mechanical, and envelope coordination",
        body: "Title 24 compliance is a team effort across disciplines, and the county review exposes any gaps in coordination. The electrical design carries lighting power densities, control sequences, and acceptance testing requirements; the mechanical design carries equipment efficiencies, duct design and testing, and ventilation energy provisions; the architectural design carries the envelope, fenestration, and insulation that the whole model rests on. I coordinate these at design development, not at permit, because a late change to glazing or lighting ripples through the compliance model. When the model changes, the forms change, and the forms must match the drawings on the day of submittal — that three-way lock is the entire game in county Title 24 review.",
      },
      {
        heading: "County Title 24 enforcement checklist",
        body: "Title 24 approval through a county building department goes smoothly when the documentation does the reviewer's work for them. Precision at submittal beats speed every time.\n\n• County's adopted code cycle and any local energy amendments confirmed during due diligence\n• Compliance forms generated from current approved software, complete and internally consistent\n• Forms-to-drawings cross-check completed: fenestration, lighting, and equipment all reconciled\n• Mandatory measures and field verifications clearly assigned between inspector and third-party rater\n• Performance-method submittals include a reviewer-friendly modeling narrative keyed to the drawings",
      },
    ],
    extraLinks: [
      { label: "How Are Title 24 Energy Calculations Done in California?", href: "/answers/title-24-calculations-california/" },
      { label: "What Are the Structural Implications of Title 24?", href: "/answers/california-title-24-structural-implications/" },
      { label: "Can Title 24 and MEP Come From the Same Company?", href: "/answers/can-title-24-and-mep-come-from-the-same-company/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
];
