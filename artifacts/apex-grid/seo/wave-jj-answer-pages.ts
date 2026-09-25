import type { Phase0AeoPage } from "./phase0-corpus";

const founderNote = "I'm Jeremy Mills, CEO & Founder of Apex Grid Engineering and a U.S. Air Force veteran. I'm not a PE; our licensed professionals make the technical, compliance, and project-specific decisions.";

export const WAVE_JJ_ANSWER_PAGES: Phase0AeoPage[] = [
  {
    slug: "cook-county-il-engineering-permit-guide",
    title: "How Does Engineering Permitting Work in Unincorporated Cook County, IL?",
    description: "Unincorporated Cook County projects permit through the County Department of Building and Zoning, with MWRD stormwater review and deep-frost foundation design for Chicago-area clay soils.",
    h1: "How Does Engineering Permitting Work in Unincorporated Cook County, IL?",
    answer: "Direct answer: building projects in unincorporated Cook County — the township pockets outside any city or village boundary — permit through the Cook County Department of Building and Zoning, not through a municipality. The county reviews zoning compliance, building plans, and trade permits for those parcels, while stormwater and watershed review runs through the Metropolitan Water Reclamation District of Greater Chicago (MWRD), which administers its Watershed Management Ordinance across the county. The parcel's jurisdiction decides the reviewer, so confirming unincorporated status with the county's address or parcel lookup is the first engineering task.\n\nThe county path differs from a Chicago or suburban village submittal in practical ways. Unincorporated parcels often sit on larger lots with private wells and septic systems rather than municipal utilities, which adds county health department review of the well and septic design to the building permit. Setbacks follow the county zoning ordinance for the parcel's district, and access may come off a township road or county highway rather than a municipal street, which affects driveway permits and sight-distance review. The structural design still follows the adopted building code with Chicago-area amendments, including frost-depth footings sized for the region's deep freeze.\n\nFoundations in Cook County are designed around two realities: deep frost and clay. Footings must extend below the local frost line — the Chicago area designs to roughly three and a half feet of frost penetration — and much of the county sits on dense glacial clays that are strong but slow-draining, with pockets of softer compressible soils near historic wetlands and river corridors. A geotechnical investigation tells the structural engineer the bearing values, the groundwater elevation, and whether deep foundations or ground improvement are warranted for heavier commercial loads. Basements are common, so the design also addresses foundation drainage, sump systems, and waterproofing against the high water tables found near the Des Plaines and Chicago river corridors.\n\nStormwater is where county projects most often stall. MWRD's watershed ordinance requires detention and volume control for qualifying developments, and the county will not issue a building permit until the stormwater approach is resolved. Older combined-sewer areas and flood-prone corridors along the rivers add floodplain review to the mix, with elevation certificates and compensatory storage where the flood maps apply. The civil engineer sizes detention, documents the release rates, and coordinates the MWRD permit in parallel with the county building review, because the two tracks run on different clocks and neither waits for the other.",
    directAnswer: "Unincorporated Cook County building permits run through the County Department of Building and Zoning, with stormwater review by the Metropolitan Water Reclamation District under its Watershed Management Ordinance. Foundations design for deep frost and glacial clay soils, and unincorporated parcels often need well and septic review alongside the building permit.",
    topic: "Illinois Engineering",
    serviceHref: "/services/civil/",
    sections: [
      {
        heading: "Confirming Unincorporated Status and the County Submittal",
        body: "Cook County's unincorporated areas are scattered township pockets surrounded by municipalities — a parcel can have a Chicago mailing address and still be a county project. The Department of Building and Zoning publishes parcel lookup tools, and the county assessor's records show the taxing jurisdiction, which settles the question. Designing to a neighboring village's standards and then discovering the parcel is unincorporated costs months, because the county's zoning districts, setback tables, and submittal checklists are its own.\n\nThe county building submittal covers zoning review, architectural and structural plans, and MEP systems, reviewed against the county's adopted codes. Commercial projects add the full commercial package: civil site plans with grading and utilities, landscape plans, and fire protection coordination. Because unincorporated parcels frequently lack municipal water and sewer, the county health department reviews well construction and septic design under state standards, and the building permit depends on those approvals. The engineering team should sequence the health department submittal early — a septic field layout can reshape the site plan, and discovering that after the building plans are drawn is expensive rework.",
      },
      {
        heading: "MWRD Stormwater Review and Floodplain Coordination",
        body: "The Metropolitan Water Reclamation District's Watershed Management Ordinance applies countywide, including unincorporated parcels, and it is a separate permit from the county building permit. Qualifying developments must provide stormwater detention with controlled release rates, volume control for the water-quality storm, and documentation that the design meets the ordinance's performance standards. The civil engineer's stormwater report is the core of the MWRD submittal, and the district's review comments typically drive at least one round of revisions to pipe sizing, outlet structures, or detention grading.\n\nFloodplain adds a second layer where the maps apply. Parcels near the Des Plaines River, the Chicago River branches, and tributary creeks may fall in mapped floodplain, which triggers elevation certificates, floodproofing details for nonresidential structures, and compensatory storage so the project does not displace flood volume onto neighbors. The county enforces floodplain regulations through its building review, and the AHJ — county for building, MWRD for watershed — decides what is approved. Neither review replaces the geotechnical report or the stormwater calculations; those are the technical basis the reviewers check, not something the reviewers produce.",
      },
    ],
    faqs: [
      {
        question: "How do I know if my parcel is unincorporated Cook County?",
        answer: "Use the county's address or parcel lookup, or check the taxing jurisdiction on the assessor's records. A Chicago or suburban mailing address does not determine jurisdiction — unincorporated pockets sit inside township areas surrounded by municipalities. If no city or village claims the parcel, it permits through the Cook County Department of Building and Zoning.",
      },
      {
        question: "Does MWRD review apply to unincorporated Cook County projects?",
        answer: "Yes. The Metropolitan Water Reclamation District's Watershed Management Ordinance applies countywide, and qualifying developments need an MWRD stormwater permit with detention, volume control, and a sealed stormwater report. It is a separate track from the county building permit, so the civil engineer coordinates both in parallel.",
      },
      {
        question: "How deep do footings go in Cook County?",
        answer: "Footings must extend below the local frost line, which the Chicago area designs to roughly three and a half feet. The structural engineer sets the actual depth from the adopted code and the geotechnical report, which also addresses the county's glacial clay soils, groundwater elevation, and basement drainage where basements are planned.",
      },
      {
        question: "Do I need well and septic approval for an unincorporated parcel?",
        answer: "Often, yes. Many unincorporated parcels lack municipal water and sewer, so the county health department reviews the private well and septic system design under state standards. The building permit depends on those approvals, so the engineering team sequences the health department submittal early in the project.",
      },
    ],
    extraLinks: [
      { label: "How does city vs. county permitting differ?", href: "/answers/boulder-county-vs-city-permitting/" },
      { label: "How long does plan check take?", href: "/answers/how-long-does-plan-check-take/" },
      { label: "What is a geotechnical report?", href: "/answers/geotechnical-report-explained/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "dupage-county-il-engineering-permit-guide",
    title: "How Does Engineering Permitting Work in Unincorporated DuPage County, IL?",
    description: "DuPage County pairs its Building and Zoning review with one of Illinois' strictest countywide stormwater ordinances — detention, best management practices, and floodplain review shape every site design.",
    h1: "How Does Engineering Permitting Work in Unincorporated DuPage County, IL?",
    answer: "Direct answer: projects in unincorporated DuPage County permit through the county's Building and Zoning function, and nearly every project with land disturbance also faces the county's Stormwater Management program, which administers a countywide stormwater and floodplain ordinance that is among the most demanding in Illinois. The two reviews run in parallel — building plans through the county's permit review and stormwater through the stormwater program — and the building permit depends on stormwater compliance. Confirming the parcel is genuinely unincorporated, rather than inside one of the county's many municipalities, sets the correct submittal path from day one.\n\nDuPage County's stormwater program grew out of the county's history of serious flooding along the DuPage River, Salt Creek, and the East Branch watersheds. The ordinance requires stormwater detention with controlled release rates, post-construction best management practices for water quality, and strict floodplain management including compensatory storage where floodplain is affected. The civil engineer's stormwater submittal — calculations, detention design, BMP details, and floodplain documentation — is typically the longest pole in the permitting tent, and the county's stormwater reviewers are known for thorough technical comments that reshape pipe networks, outlet structures, and grading plans.\n\nThe building side follows the county's adopted codes with local amendments. Structural design accounts for the Chicago region's deep frost, with footings below the frost line and foundation drainage suited to the county's glacial tills and clay soils. Commercial submittals include architectural, structural, and MEP plans plus civil site work, and trade permits follow the building permit. Where municipal utilities do not reach, the county health department reviews wells and septic systems, and fire protection review coordinates with the local fire protection district serving the parcel.\n\nJurisdiction boundaries in DuPage are intricate. Municipalities have annexed aggressively over the decades, leaving unincorporated pockets and township areas stitched between villages and cities. A site's mailing address may say Wheaton or Naperville while the parcel permits through the county. The engineering team verifies jurisdiction through the county's parcel mapping before drawing a single detail, because a set designed for a village's standards does not transfer to the county's stormwater ordinance without rework.",
    directAnswer: "Unincorporated DuPage County projects permit through the county's Building and Zoning review, with a parallel stormwater permit under the county's strict countywide stormwater and floodplain ordinance. The civil stormwater submittal is usually the longest review track; structures design for deep frost and glacial clay soils.",
    topic: "Illinois Engineering",
    serviceHref: "/services/civil/",
    sections: [
      {
        heading: "The Stormwater Submittal: Detention, BMPs, and Floodplain",
        body: "DuPage County's stormwater ordinance requires new development and redevelopment to manage both quantity and quality. Detention facilities must control release rates so downstream waterways see no increase in peak flows, and post-construction best management practices — bioswales, permeable pavement, native plantings, infiltration features where soils allow — address water quality. The ordinance also regulates work in and near floodplains and wetlands, with buffer requirements and compensatory storage calculations where flood storage is displaced.\n\nThe engineering behind the submittal is substantial: hydrologic modeling of pre- and post-development runoff, hydraulic sizing of storm sewers and outlet control structures, grading plans that direct water to the BMPs, and floodplain analyses where the maps show risk. Reviewers check the math, not just the drawings, so the stormwater report must be sealed by a licensed professional engineer and internally consistent — a detention volume that does not match the grading plan is the classic first-round correction. Projects should budget schedule for at least one full round of stormwater review comments, because the county's program does not rubber-stamp.",
      },
      {
        heading: "Building Review, Frost Design, and Utility Coordination",
        body: "The county's building review covers zoning compliance, architectural plans, structural design, and MEP systems against the adopted codes. Structural engineers design foundations below the region's deep frost line, with spread footings or deep foundations sized from the geotechnical report's bearing values for the site's glacial soils. Basements need drainage and waterproofing details suited to the county's clay tills and seasonal high water tables, and commercial slabs need subgrade preparation that accounts for the same soils.\n\nUtility coordination follows the parcel's reality. Unincorporated lots on the county's edges may rely on private wells and septic systems, which the county health department permits separately — and the septic field's location, sized from soil percolation testing, can dictate the site layout. Fire protection review runs through the fire protection district, which may require hydrant coverage, fire lanes, or suppression systems that feed back into the civil and architectural design. The AHJ for each piece — county for building, stormwater program for watershed, health department for wells and septic — decides what is approved, so the design team tracks each review thread to its own closeout.",
      },
    ],
    faqs: [
      {
        question: "Is DuPage County stormwater review separate from the building permit?",
        answer: "Yes. The county's Stormwater Management program administers the countywide stormwater and floodplain ordinance as its own permit track, covering detention, best management practices, and floodplain compliance. The building permit depends on stormwater approval, so the civil engineer runs both submittals in parallel.",
      },
      {
        question: "What does DuPage County require for stormwater detention?",
        answer: "The ordinance requires detention with controlled release rates so development does not increase downstream peak flows, plus post-construction best management practices for water quality and compensatory storage where floodplain is affected. The sealed stormwater report with hydrologic and hydraulic calculations is the core of the submittal.",
      },
      {
        question: "How do I confirm my site is unincorporated DuPage County?",
        answer: "Check the county's parcel mapping or the assessor's taxing jurisdiction — mailing addresses are unreliable because municipalities have annexed extensively. If no city or village claims the parcel, it is unincorporated and permits through the county's Building and Zoning and stormwater programs.",
      },
      {
        question: "Do foundations in DuPage County need frost protection?",
        answer: "Yes. Footings must extend below the local frost line, which the Chicago region designs to roughly three and a half feet, and the structural engineer sizes foundations from the geotechnical report for the site's glacial clay soils, groundwater, and any basement drainage needs.",
      },
    ],
    extraLinks: [
      { label: "How does city vs. county permitting differ?", href: "/answers/boulder-county-vs-city-permitting/" },
      { label: "How do you respond to plan check corrections?", href: "/answers/how-to-respond-to-plan-check-corrections/" },
      { label: "What is a geotechnical report?", href: "/answers/geotechnical-report-explained/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "lake-county-il-engineering-permit-guide",
    title: "How Does Engineering Permitting Work in Unincorporated Lake County, IL?",
    description: "Lake County's Planning, Building and Development review pairs with the Stormwater Management Commission's watershed ordinance — wetlands, floodplain, and glacial soils shape every unincorporated project.",
    h1: "How Does Engineering Permitting Work in Unincorporated Lake County, IL?",
    answer: "Direct answer: unincorporated Lake County projects permit through the county's Planning, Building and Development Department, and land-disturbing work also goes through the Lake County Stormwater Management Commission (SMC), which enforces a watershed development ordinance covering stormwater, floodplain, wetlands, and soil erosion. The SMC's jurisdiction is watershed-based rather than municipal, so even projects inside cities can face SMC review — but for unincorporated parcels, the county building permit and the SMC permit are the two gates. The parcel's location relative to municipal boundaries and watershed lines determines the full review set.\n\nLake County's landscape drives its regulations. The county holds extensive wetlands, kettle lakes, and floodplain along the Des Plaines River, Fox River, and their tributaries, plus glacial soils that range from dense till to soft organic deposits in former wetland areas. The SMC's ordinance requires wetland delineation and mitigation sequencing, floodplain compensatory storage, detention with controlled release, and soil erosion and sediment control during construction. A site that looks like a simple open field may carry wetland and floodplain constraints that reshape the buildable area — which is why the civil engineer starts with a constraints analysis, not a site plan.\n\nThe county's building review covers zoning, architectural, structural, and MEP plans under the adopted codes. Foundations design for the region's deep frost and the variable glacial soils: the geotechnical investigation distinguishes competent till from soft compressible deposits, sets bearing values and settlement expectations, and addresses groundwater that runs high near lakes and wetlands. Basements and deep excavations near the water table need dewatering plans and waterproofing details the structural reviewer will check.\n\nSeptic and well review is common on the county's rural edges. The Lake County Health Department permits private sewage systems and wells where municipal utilities are unavailable, with soil evaluations that determine the system type and field size. Like the other collar counties, Lake's municipal boundaries are complex — villages and cities interleave with unincorporated township areas — so jurisdiction verification through county parcel records comes before any design work.",
    directAnswer: "Unincorporated Lake County building permits run through the county's Planning, Building and Development Department, with stormwater, wetland, and floodplain review by the Lake County Stormwater Management Commission under its watershed ordinance. Glacial soils, wetlands, and high water tables make the geotechnical and constraints analysis the critical first step.",
    topic: "Illinois Engineering",
    serviceHref: "/services/civil/",
    sections: [
      {
        heading: "SMC Review: Wetlands, Floodplain, and Erosion Control",
        body: "The Stormwater Management Commission's watershed development ordinance is the dominant civil review for Lake County projects. It requires wetland delineation by qualified professionals, with avoidance and minimization before any mitigation is considered; floodplain analysis with compensatory storage where fill or structures displace flood volume; detention designed to the ordinance's release-rate standards; and soil erosion and sediment control plans for the construction phase. The ordinance applies across watershed boundaries, so the civil engineer maps the site against watershed, floodplain, and wetland layers before laying out lots, roads, or buildings.\n\nThe practical effect is that the buildable envelope is often smaller than the parcel. Wetland buffers, floodplain limits, and detention footprints consume acreage, and the site plan must work within what remains. The SMC's technical review checks calculations and details — outlet control structures, emergency overflow paths, erosion control sequencing — and comments frequently require regrading or resizing. Because the SMC permit gates the county building permit, the stormwater and environmental work leads the schedule, not the architecture.",
      },
      {
        heading: "County Building Review and Glacial-Soil Foundations",
        body: "The Planning, Building and Development Department reviews zoning compliance, building plans, and trade permits for unincorporated parcels. Structural design follows the adopted codes with frost-depth footings for the Chicago region's deep freeze, and the geotechnical report carries extra weight in Lake County because the glacial geology varies sharply — dense till that bears well can sit beside soft organic soils that settle under load. The report sets foundation type, bearing values, and excavation and dewatering requirements, and the structural reviewer expects the drawings to reflect it.\n\nWhere municipal sewer and water do not reach, the health department's well and septic review joins the process, with soil borings and percolation testing sizing the drain field. Fire protection coordinates with the local fire district. Each AHJ — county building, SMC, health department — approves its own piece, and the design team closes each thread on its own timeline. The county does not issue the building permit until the stormwater and health approvals are in hand, so the project schedule is built around the slowest review, which is usually the SMC's.",
      },
    ],
    faqs: [
      {
        question: "Does the Stormwater Management Commission review projects inside cities too?",
        answer: "The SMC's watershed development ordinance is watershed-based, so its jurisdiction can extend into municipalities for stormwater, floodplain, and wetland matters. For unincorporated parcels, the county building permit and the SMC permit are the two primary gates — the civil engineer confirms which reviews apply from the watershed and parcel maps.",
      },
      {
        question: "Why do Lake County sites need wetland delineation?",
        answer: "The county contains extensive wetlands tied to its glacial lakes and river corridors, and the SMC ordinance requires delineation, avoidance and minimization sequencing, and mitigation where impacts are unavoidable. A field that looks buildable may carry wetland constraints that reshape the site plan, so the delineation comes before layout.",
      },
      {
        question: "What foundation issues do Lake County's glacial soils cause?",
        answer: "The soils vary from dense load-bearing till to soft compressible organic deposits in former wetland areas, with high groundwater near lakes and rivers. The geotechnical investigation distinguishes the two, sets bearing values and settlement expectations, and drives foundation type, excavation, dewatering, and basement waterproofing details.",
      },
      {
        question: "Do I need county health department approval for septic?",
        answer: "Yes, where municipal sewer is unavailable. The Lake County Health Department permits private sewage systems and wells, with soil evaluations determining the system type and drain-field size. The field layout can dictate the site plan, so the health review is sequenced early.",
      },
    ],
    extraLinks: [
      { label: "How does city vs. county permitting differ?", href: "/answers/boulder-county-vs-city-permitting/" },
      { label: "How long does plan check take?", href: "/answers/how-long-does-plan-check-take/" },
      { label: "What is a geotechnical report?", href: "/answers/geotechnical-report-explained/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "oakland-county-mi-engineering-permit-guide",
    title: "How Does Engineering Permitting Work in Oakland County, MI Townships?",
    description: "Oakland County townships issue their own building permits while the county Water Resources Commissioner handles drains and stormwater — frost-depth foundations and clay soils shape the engineering.",
    h1: "How Does Engineering Permitting Work in Oakland County, MI Townships?",
    answer: "Direct answer: in Oakland County, building permits are issued by the individual city, village, or township — the county itself does not run a general building department for private development. Unincorporated township areas permit through the township's building department, while the Oakland County Water Resources Commissioner's office (WRC) reviews county drains, stormwater management, and soil erosion for projects that affect regulated drains or meet the county's stormwater standards. The engineering team therefore tracks two AHJs from the start: the township for the building permit and the WRC for drainage.\n\nThis split surprises out-of-state developers who expect a single county permit counter. Each township — from high-growth areas like Oakland Township and Orion Township to the more rural northern townships — administers its own zoning ordinance, site plan review, and building inspection program under the Michigan Building Code. The township planner confirms zoning compliance and site plan approval, often through a planning commission process for commercial projects, before the building department reviews construction documents. Timelines and submittal expectations vary township to township, so the design schedule is built on the specific township's process, not a county-wide assumption.\n\nThe WRC's drainage review is the county-level constant. Michigan's drain code gives the Water Resources Commissioner authority over established county drains, and development that outlets to or crosses a county drain needs WRC approval. The county's stormwater standards require detention and water-quality treatment for qualifying sites, with the civil engineer's calculations and details forming the submittal. Soil erosion and sedimentation control permits under the state's program are typically administered at the county or township level as the designated enforcing agency — another review thread the civil engineer must identify and close.\n\nStructural design in Oakland County works around deep frost and clay. Footings extend below the local frost line — southeast Michigan designs to roughly three and a half feet — and much of the county sits on stiff glacial clays that bear well but drain poorly, with sandier outwash deposits in places. The geotechnical report sets bearing values, addresses perched groundwater that plagues basements in clay soils, and informs foundation drainage and sump design. Commercial slabs and pavements need subgrade preparation suited to the same clays, and the structural reviewer at the township checks that the drawings reflect the soils report.",
    directAnswer: "Oakland County townships issue their own building permits under the Michigan Building Code — there is no county general building department. The Oakland County Water Resources Commissioner reviews county drains and stormwater, and soil erosion permits run through the designated enforcing agency. Foundations design for deep frost and glacial clay soils.",
    topic: "Michigan Engineering",
    serviceHref: "/services/structural/",
    sections: [
      {
        heading: "Township Building Review and Site Plan Approval",
        body: "Each Oakland County township runs its own development review, and commercial projects typically pass through site plan review with the township planning commission before building permits. The site plan covers zoning compliance — setbacks, parking counts, landscaping, lighting — plus architectural elevations and the civil site work. Townships apply their own zoning ordinances, so a use permitted by right in one township may need special approval next door, and the civil engineer confirms the zoning classification and any overlay districts before the layout is fixed.\n\nThe building plan review that follows checks structural, architectural, and MEP design against the Michigan Building Code and the township's amendments. Because townships vary in staff size, some use in-house reviewers and others contract plan review to third-party agencies — either way, the AHJ is the township, and correction cycles follow its process. Fire protection review coordinates with the township's fire department or fire authority, which may impose access, hydrant, and suppression requirements that feed back into the site and building design.",
      },
      {
        heading: "WRC Drainage Review and Erosion Control",
        body: "The Water Resources Commissioner's office is the county-level review that most Oakland County projects encounter. Any work affecting an established county drain — crossings, outlets, enclosures — needs WRC approval, and the county's stormwater standards apply detention and water-quality requirements to qualifying developments. The civil submittal includes hydrologic calculations, detention design with controlled outlets, and details for the treatment practices, sealed by a licensed professional engineer.\n\nSoil erosion and sedimentation control is the companion permit. Michigan's program requires permits for earth changes above the statutory threshold, administered by the designated county or municipal enforcing agency, with inspections during construction. The erosion control plan — silt fence, inlet protection, stabilized construction access, sequencing — is part of the civil drawing set, and the enforcing agency can stop work for noncompliance. The WRC, the township building department, and the erosion enforcing agency each close their own review, so the project tracks three approvals that do not wait on each other.",
      },
    ],
    faqs: [
      {
        question: "Does Oakland County issue building permits?",
        answer: "No. Building permits in Oakland County come from the city, village, or township where the parcel sits — each municipality administers the Michigan Building Code locally. The county's role in private development is drainage and stormwater through the Water Resources Commissioner's office, not general building review.",
      },
      {
        question: "What does the Water Resources Commissioner review?",
        answer: "The WRC administers established county drains under Michigan's drain code — crossings, outlets, and enclosures need WRC approval — and applies the county's stormwater standards for detention and water-quality treatment on qualifying developments. The civil engineer's sealed calculations and details form the submittal.",
      },
      {
        question: "How deep do footings go in Oakland County?",
        answer: "Footings must extend below the local frost line, which southeast Michigan designs to roughly three and a half feet. The geotechnical report sets the actual foundation design for the site's glacial clay soils, perched groundwater, and basement drainage needs.",
      },
      {
        question: "Do I need a soil erosion permit in Oakland County?",
        answer: "Earth changes above the state's threshold need a soil erosion and sedimentation control permit from the designated enforcing agency, with an erosion control plan and construction-phase inspections. The civil engineer identifies the enforcing agency for the parcel and includes the plan in the drawing set.",
      },
    ],
    extraLinks: [
      { label: "How does city vs. county permitting differ?", href: "/answers/boulder-county-vs-city-permitting/" },
      { label: "What is a geotechnical report?", href: "/answers/geotechnical-report-explained/" },
      { label: "What are expansive soil foundation solutions?", href: "/answers/expansive-soil-foundation-solutions/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "wayne-county-mi-engineering-permit-guide",
    title: "How Does Engineering Permitting Work in Wayne County, MI?",
    description: "Wayne County municipalities issue their own building permits while Detroit runs its own BSEED review — combined sewers, clay soils, and deep frost drive the engineering.",
    h1: "How Does Engineering Permitting Work in Wayne County, MI?",
    answer: "Direct answer: building permits in Wayne County are issued by the city, village, or township where the project sits — the county does not operate a general building department for private work. Detroit, the county's largest city, runs its own review through the Buildings, Safety Engineering, and Environmental Department (BSEED), while the downriver and western suburbs each administer the Michigan Building Code through their own building departments. County-level review appears for drainage through the Wayne County Department of Public Services and for soil erosion through the designated enforcing agency. Verifying the exact municipality — not just the mailing address — is the first step, because Detroit's process differs markedly from a suburban township's.\n\nDetroit's BSEED review is the most involved path in the county. Commercial projects pass through site plan review and building plan review against the Michigan Building Code with Detroit amendments, plus trade permits and inspections scheduled through the department. The city's combined sewer system shapes the civil design: Detroit's sewers carry stormwater and sanitary flow together, so the plumbing and site design must meet the Detroit Water and Sewerage Department's requirements for connections, and larger projects may face stormwater management expectations tied to the city's consent-decree-driven infrastructure program. The civil engineer coordinates the DWSD connection review in parallel with BSEED's building review.\n\nOutside Detroit, the suburban municipalities run leaner but independent reviews. Each enforces the state building code with local amendments, conducts its own inspections, and applies its own zoning ordinance for site plan approval. Downriver communities along the Detroit River and western suburbs over clay plains share the county's geotechnical realities: deep frost demanding footings well below grade, stiff glacial clays with poor drainage, and high water tables near the river corridors. The geotechnical report drives foundation type and basement waterproofing, and the municipal reviewer checks the structural drawings against it.\n\nEnvironmental history matters on Wayne County sites. The county's industrial legacy means Phase I environmental assessments are routine for commercial transactions, and brownfield sites carry Michigan's due-care obligations for the new owner or operator. The civil and environmental engineers coordinate on sites with recognized environmental conditions, because remediation or exposure controls can reshape grading, foundation, and utility plans. The AHJ for building approval is the municipality; the environmental obligations run under state law regardless of who issues the permit.",
    directAnswer: "Wayne County building permits come from the local municipality — Detroit reviews through BSEED, suburbs through their own building departments. The county handles drains and the designated agency handles soil erosion. Detroit's combined sewers and the county's deep frost and clay soils define the civil and structural design.",
    topic: "Michigan Engineering",
    serviceHref: "/services/civil/",
    sections: [
      {
        heading: "Detroit BSEED Review and Combined-Sewer Coordination",
        body: "Detroit's Buildings, Safety Engineering, and Environmental Department is a full-service municipal review: zoning and site plan approval, building plan review, trade permits, and inspections. Commercial submittals include architectural, structural, and MEP plans plus civil site work, reviewed against the Michigan Building Code with city amendments. The department's review threads — plan review, zoning, and inspections — run on the city's process, and the design team builds the schedule around BSEED's published submittal requirements rather than assumptions carried over from suburban work.\n\nThe civil design must reckon with the combined sewer system. DWSD administers sewer connections and enforces requirements that keep stormwater management compatible with a system carrying both flows, and the plumbing design reflects the city's standards for backflow prevention and connection details. On larger or environmentally sensitive sites, stormwater detention and green infrastructure may enter the design to align with the region's long-term infrastructure commitments. The civil engineer treats DWSD coordination as a parallel permit track with its own submittal and review comments.",
      },
      {
        heading: "Suburban Municipal Review, Frost Design, and Brownfield Due Care",
        body: "Wayne County's suburbs — Dearborn, Livonia, Taylor, the downriver communities — each issue building permits through their own departments under the state code. Site plan review follows each municipality's zoning ordinance, and the engineering submittal mirrors the Detroit package at a scale matched to the project: civil site plans, structural drawings, MEP systems, and trade permits. The reviewer is the municipality, and correction cycles follow local practice.\n\nFoundations across the county design for deep frost, with footings below the local frost line per the adopted code, and for the stiff clays that dominate the county's geology. Basements need drainage systems, sump details, and waterproofing that account for clay's slow drainage and seasonal water tables, and the geotechnical report sets bearing values and any ground-improvement needs for heavier structures. On previously industrial sites, Michigan's due-care framework obligates owners and operators to prevent exacerbation and mitigate exposure — the environmental assessment and any response actions are scoped before the structural design is finalized, because vapor mitigation or soil management can change the foundation and slab details.",
      },
    ],
    faqs: [
      {
        question: "Does Wayne County issue building permits?",
        answer: "No. Permits come from the city, village, or township where the parcel is located. Detroit reviews through its Buildings, Safety Engineering, and Environmental Department (BSEED); each suburb administers the Michigan Building Code through its own building department.",
      },
      {
        question: "How do Detroit's combined sewers affect my project?",
        answer: "Detroit's sewers carry stormwater and sanitary flow together, so the civil and plumbing design must meet Detroit Water and Sewerage Department requirements for connections, backflow prevention, and any stormwater management the project triggers. DWSD coordination runs as a parallel track to BSEED's building review.",
      },
      {
        question: "What foundation conditions are typical in Wayne County?",
        answer: "Deep frost requiring footings well below grade, stiff glacial clays with poor drainage, and high water tables near the Detroit River corridor. The geotechnical report sets foundation type, bearing values, and basement drainage and waterproofing details for the specific site.",
      },
      {
        question: "Do I need an environmental assessment for a Wayne County commercial site?",
        answer: "Phase I assessments are routine given the county's industrial history, and Michigan's due-care obligations apply to owners and operators of contaminated or formerly industrial property. Environmental findings can reshape grading, foundation, and utility design, so the assessment is scoped before structural design is finalized.",
      },
    ],
    extraLinks: [
      { label: "How does city vs. county permitting differ?", href: "/answers/boulder-county-vs-city-permitting/" },
      { label: "How do you respond to plan check corrections?", href: "/answers/how-to-respond-to-plan-check-corrections/" },
      { label: "What is a geotechnical report?", href: "/answers/geotechnical-report-explained/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "franklin-county-oh-engineering-permit-guide",
    title: "How Does Engineering Permitting Work in Unincorporated Franklin County, OH?",
    description: "Franklin County's Economic Development and Planning Department reviews unincorporated township projects — Columbus-area clay soils, frost-depth foundations, and township zoning shape the submittal.",
    h1: "How Does Engineering Permitting Work in Unincorporated Franklin County, OH?",
    answer: "Direct answer: building projects in the unincorporated townships of Franklin County permit through the county's Economic Development and Planning Department, which administers building plan review, zoning compliance, and inspections for township areas outside municipal boundaries. Columbus and the county's suburbs each run their own building departments, so the parcel's jurisdiction — township versus city — decides the reviewer. The county also coordinates floodplain administration and works with regional utilities, while stormwater design follows the applicable municipal or county standards for the site's watershed. Confirming township status through the county's parcel records is the essential first step.\n\nFranklin County's townships range from fast-growing suburban edges like those around Dublin, Hilliard, and New Albany to rural areas in the county's southern and eastern reaches. The county's zoning resolution governs land use in the townships, with the county's planning staff reviewing site plans for commercial projects against setback, parking, landscaping, and access requirements. Building plan review then checks architectural, structural, and MEP design against the Ohio Building Code, which is based on the IBC with state modifications. The county's process is a single coordinated review, but the submittal must be complete — partial packages do not start the clock.\n\nStructural design in Franklin County addresses deep frost and variable soils. Footings extend below the local frost line per the Ohio Building Code, and the county's geology mixes glacial tills and clays with limestone-derived soils and pockets of softer alluvium along the Scioto and Olentangy river corridors. Some areas carry shrink-swell clays that move with moisture changes, so the geotechnical investigation sets bearing values, foundation type, and any moisture-management details for slabs and pavements. Basements are common in residential work and need drainage and waterproofing suited to the clay tills.\n\nUtilities and access follow the township reality. Many township parcels connect to Columbus or suburban water and sewer through service agreements, but rural lots may need private wells and household sewage treatment systems reviewed by Franklin County Public Health. Road access may come off a township road or county route, with driveway permits and sight-distance review through the county engineer's office. Each AHJ — county planning and building, public health for wells and septic, the county engineer for road access — approves its own piece, and the design team sequences them so no single approval strands the others.",
    directAnswer: "Unincorporated Franklin County township projects permit through the county's Economic Development and Planning Department under the Ohio Building Code, with township zoning review up front. Foundations design for deep frost and mixed glacial and clay soils; wells, septic, and road access add county health and engineer reviews where municipal services do not reach.",
    topic: "Ohio Engineering",
    serviceHref: "/services/structural/",
    sections: [
      {
        heading: "County Zoning and Building Plan Review",
        body: "The county's zoning resolution controls what can be built in the townships, and commercial site plans go through county planning review for compliance with district standards — setbacks, lot coverage, parking, landscaping, signage, and access management. Rezonings and variances go through the county's public hearing process, which adds months, so the civil engineer confirms the zoning classification and permitted uses before the site layout hardens. Conditional uses carry their own standards and review path.\n\nBuilding plan review follows site approval. The county checks the full construction document set — architectural, structural, MEP, and civil site plans — against the Ohio Building Code, and trade permits for electrical, plumbing, HVAC, and fire protection follow the building permit. The structural reviewer expects the drawings to reflect the geotechnical report: foundation depths below frost, bearing values matched to the soils, and details for any shrink-swell mitigation the report recommends. Fire protection review coordinates with the township fire department, whose access and suppression requirements feed back into the site design.",
      },
      {
        heading: "Frost, Soils, and Township Utility Realities",
        body: "Franklin County's frost line drives foundation depths for every structure, and the structural engineer details footings, piers, and frost walls to keep bearing soils below the freeze. The geotechnical investigation distinguishes the county's competent glacial tills from softer alluvial pockets and identifies any expansive clays that need moisture control or deeper foundations. For commercial slabs and pavements, subgrade preparation and proof-rolling requirements come from the same report, and the civil engineer grades the site to keep water away from foundations in the slow-draining clays.\n\nOn the township edges, utilities decide constructability. Parcels served by municipal water and sewer coordinate tap permits and capacity with the utility provider; parcels beyond reach need wells and household sewage treatment systems permitted through Franklin County Public Health, with soil evaluations sizing the system. Road frontage on township or county roads needs driveway permits from the maintaining authority, and the county engineer reviews access for sight distance and drainage impacts. The building permit depends on the health and access approvals being resolved, so the engineering team runs those threads early rather than discovering them at final review.",
      },
    ],
    faqs: [
      {
        question: "How do I know if my site is in unincorporated Franklin County?",
        answer: "Check the county auditor's parcel records for the taxing jurisdiction — if no city or village claims the parcel, it sits in a township and permits through the county's Economic Development and Planning Department. Mailing addresses are unreliable because Columbus-area municipalities interleave with township land.",
      },
      {
        question: "What code does Franklin County enforce?",
        answer: "The Ohio Building Code, which is based on the IBC with Ohio modifications, plus the county's zoning resolution for township land use. Columbus and each suburb enforce the same state code through their own building departments with local amendments.",
      },
      {
        question: "What soil conditions affect Franklin County foundations?",
        answer: "Deep frost requiring footings below the freeze line, glacial tills and clays with slow drainage, softer alluvial soils along the Scioto and Olentangy corridors, and pockets of shrink-swell clay. The geotechnical report sets foundation type, bearing values, and any moisture-management details.",
      },
      {
        question: "Do township projects need county health approval?",
        answer: "Where municipal water and sewer are unavailable, yes — Franklin County Public Health permits private wells and household sewage treatment systems, with soil evaluations determining the system design. Road access permits come from the township or county engineer depending on who maintains the road.",
      },
    ],
    extraLinks: [
      { label: "How does city vs. county permitting differ?", href: "/answers/boulder-county-vs-city-permitting/" },
      { label: "How long does plan check take?", href: "/answers/how-long-does-plan-check-take/" },
      { label: "What is a geotechnical report?", href: "/answers/geotechnical-report-explained/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "cuyahoga-county-oh-engineering-permit-guide",
    title: "How Does Engineering Permitting Work in Cuyahoga County, OH?",
    description: "Cuyahoga County municipalities run their own building departments while the Northeast Ohio Regional Sewer District governs stormwater — lake-effect snow, clay soils, and combined sewers shape the design.",
    h1: "How Does Engineering Permitting Work in Cuyahoga County, OH?",
    answer: "Direct answer: building permits in Cuyahoga County are issued by the individual city or village — Cleveland runs its own Department of Building and Housing, and each suburb administers the Ohio Building Code through its own department. The county itself does not issue general building permits for private development. The county-level constant is stormwater: the Northeast Ohio Regional Sewer District (NEORSD) administers a regional stormwater management program across much of the county, with its own code requirements for development, and the county handles floodplain coordination and soil erosion review threads. The engineering team confirms the municipality for the building permit and the sewer district's requirements for the site work.\n\nCleveland's building review is the county's heaviest municipal path. The Department of Building and Housing reviews commercial construction documents against the Ohio Building Code, with site plan review, zoning compliance, and trade permits in the package. Cleveland's combined sewer areas add the civil complication: older parts of the city carry stormwater and sanitary flow in the same pipes, so the plumbing and site design must satisfy the city's water pollution control requirements for connections, and larger projects coordinate stormwater management with both the city and NEORSD. The civil engineer maps which sewer system serves the parcel before the utility plan is drawn.\n\nNEORSD's regional stormwater program applies to member communities across the county. Its code sets requirements for stormwater quality and quantity on regulated development, and the district reviews and inspects its own infrastructure while municipalities handle local systems — the civil engineer must determine where the district's jurisdiction starts for the specific site. The program grew out of the region's consent-decree obligations for its combined sewer system, so the regulatory posture is serious and the technical review is thorough.\n\nStructural design in Cuyahoga County contends with lake-effect snow, deep frost, and clay. Roof designs carry the county's substantial ground snow loads per the adopted code and ASCE 7, with drifting details at parapets and rooftop units that the structural reviewer checks. Footings extend below the frost line, and the county's glacial clays — stiff but slow-draining, with softer lake-plain deposits near Lake Erie — set bearing values and basement waterproofing needs through the geotechnical report. The lake-plain soils near the shore can be compressible, so heavier commercial structures there may need deep foundations, and the soils report makes that call.",
    directAnswer: "Cuyahoga County building permits come from the local municipality — Cleveland through its Department of Building and Housing, suburbs through their own departments. NEORSD administers regional stormwater requirements, and the county coordinates floodplain review. Structures design for heavy lake-effect snow, deep frost, and glacial clay soils.",
    topic: "Ohio Engineering",
    serviceHref: "/services/structural/",
    sections: [
      {
        heading: "Cleveland Building Review and NEORSD Stormwater Coordination",
        body: "Cleveland's Department of Building and Housing runs plan review, permitting, and inspections for the city, with the Board of Zoning Appeals and City Planning Commission handling entitlements where the zoning code requires them. Commercial submittals include architectural, structural, and MEP plans plus civil site work, reviewed against the Ohio Building Code. The city's review threads — zoning, building, trades — each close on their own timeline, and the design team sequences entitlements before construction documents where variances or conditional uses are involved.\n\nThe NEORSD layer sits on top for stormwater. The district's code requires regulated developments to manage stormwater quality and quantity, with the civil engineer's calculations, detention design, and best management practices forming the submittal. Where the district's regional system meets the municipality's local system, the engineer documents the handoff — pipe ownership, maintenance responsibility, and the design standards each side enforces. In Cleveland's combined-sewer areas, the city's water pollution control requirements add connection standards and any project-specific stormwater expectations, so the civil design satisfies three reviewers: city building, city sewers, and the regional district.",
      },
      {
        heading: "Snow Loads, Frost, and Lake-Plain Soils",
        body: "Cuyahoga County's snow loads are among the heaviest in Ohio thanks to Lake Erie, and the structural engineer designs roofs for the code-prescribed ground snow load with ASCE 7 drift provisions at parapets, penthouses, and stepped roofs. The reviewer checks load paths, drift surcharge zones, and the capacity of long-span elements where drift accumulates — a roof that works for uniform snow can fail at the drift pile, so the detailing matters as much as the numbers.\n\nFoundations go below the frost line per the Ohio Building Code, and the geotechnical report addresses the county's soil profile: stiff glacial clays across much of the county, softer and more compressible lake-plain deposits near the shore, and fill soils in historically developed areas. The report sets bearing values, settlement expectations, and foundation type — and on lake-plain sites with soft soils, it may recommend deep foundations or ground improvement for commercial loads. Basements need drainage and waterproofing designed for clay's slow drainage and the high water tables near the lake, and the structural drawings must reflect the report's recommendations for the reviewer to approve them.",
      },
    ],
    faqs: [
      {
        question: "Does Cuyahoga County issue building permits?",
        answer: "No. Each city and village issues its own building permits under the Ohio Building Code — Cleveland through its Department of Building and Housing, suburbs through their own departments. The county's role in private development is coordination on floodplain and related reviews, not general building permits.",
      },
      {
        question: "What is NEORSD's role in my project?",
        answer: "The Northeast Ohio Regional Sewer District administers a regional stormwater management program across its member communities, with code requirements for stormwater quality and quantity on regulated development. The civil engineer determines where the district's jurisdiction applies for the site and coordinates its review alongside the municipal building permit.",
      },
      {
        question: "How do lake-effect snow loads affect structural design?",
        answer: "Roofs must be designed for the code-prescribed ground snow load plus ASCE 7 drift provisions at parapets, rooftop units, and stepped roofs. The structural reviewer checks drift surcharge zones and load paths, since drift accumulation — not uniform snow — typically governs the design.",
      },
      {
        question: "What soils will my geotechnical report find in Cuyahoga County?",
        answer: "Stiff glacial clays across much of the county, softer compressible lake-plain deposits near Lake Erie, and fill in historically developed areas — plus deep frost everywhere. The report sets bearing values, foundation type, settlement expectations, and basement drainage and waterproofing details.",
      },
    ],
    extraLinks: [
      { label: "How does city vs. county permitting differ?", href: "/answers/boulder-county-vs-city-permitting/" },
      { label: "What is a geotechnical report?", href: "/answers/geotechnical-report-explained/" },
      { label: "How is a geotechnical settlement analysis done?", href: "/answers/geotechnical-settlement-analysis-explained/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "hamilton-county-oh-engineering-permit-guide",
    title: "How Does Engineering Permitting Work in Unincorporated Hamilton County, OH?",
    description: "Hamilton County's Planning and Development reviews unincorporated township projects with MSD sewer coordination — Ohio River hillside soils, landslides, and frost-depth foundations define the engineering.",
    h1: "How Does Engineering Permitting Work in Unincorporated Hamilton County, OH?",
    answer: "Direct answer: projects in Hamilton County's unincorporated townships permit through the county's Planning and Development Department, which handles zoning, building plan review, and inspections for township areas. Cincinnati and the county's villages and cities each run their own building departments, so township versus municipal status decides the reviewer. Sewer and drainage coordination runs through the Metropolitan Sewer District of Greater Cincinnati (MSD), which serves much of the county, and hillside development faces the county's geotechnical expectations for the region's landslide-prone soils. The township parcel check comes first, because Cincinnati's boundaries interleave with township land.\n\nHamilton County's defining engineering challenge is its hillsides. The Ohio River valley's steep slopes carry colluvial soils and weathered shale and limestone that have produced generations of landslides, and the county's hillside regulations require geotechnical investigation, slope stability analysis, and engineered retaining systems for development on steep ground. The geotechnical engineer evaluates global slope stability — not just the building pad — because a stable house on an unstable hillside is still a failure. Retaining walls, drilled shafts, soil nails, and drainage systems are designed from the slope analysis, and the county reviewer checks that the stabilization addresses the whole slope, not just the structure.\n\nThe building review itself follows the Ohio Building Code. Structural design accounts for the region's deep frost with footings below the freeze line, and for the variable soils: ridgetop clays and shales that are generally competent, valley alluvium that can be soft, and the hillside colluvium that demands the slope-stability work. Commercial submittals include the full architectural, structural, and MEP package plus civil site plans, and the structural reviewer expects foundation and retaining designs that match the geotechnical report's recommendations.\n\nMSD coordination is the civil constant across the county. The sewer district administers sanitary and combined sewer connections, reviews the project's sewer availability and capacity, and enforces its rules for connections, extensions, and any required stormwater management. In Cincinnati's combined-sewer areas, the plumbing and site design must meet the district's standards for the combined system. Stormwater detention and water-quality practices follow the applicable local regulations for the site, and the civil engineer runs the MSD review in parallel with the county's building review since neither waits for the other.",
    directAnswer: "Unincorporated Hamilton County township projects permit through the county's Planning and Development Department under the Ohio Building Code, with sewer review by the Metropolitan Sewer District of Greater Cincinnati. Hillside sites require geotechnical slope-stability analysis for the region's landslide-prone soils; foundations design for deep frost.",
    topic: "Ohio Engineering",
    serviceHref: "/services/structural/",
    sections: [
      {
        heading: "Hillside Development: Slope Stability and Retaining Systems",
        body: "Hamilton County's hillside soils demand engineering that goes beyond the building footprint. The geotechnical investigation for a hillside site includes borings that characterize the colluvium, weathered rock, and groundwater regime, and the slope-stability analysis models the entire hillside under static and seismic loading with the proposed grading and structures in place. The analysis sets the allowable cut and fill geometry, the retaining system type and capacity, and the subsurface drainage needed to keep water pressures from destabilizing the slope.\n\nRetaining solutions range from conventional cantilever walls for modest heights to drilled-shaft and lagging walls, soil-nail walls, or tiered systems for taller or weaker slopes — each designed by the structural or geotechnical engineer from the slope analysis, not selected from a catalog. Surface and subsurface drainage is integral: hillside failures in the region are water-driven far more often than load-driven, so interceptor drains, wall drainage, and controlled discharge are part of the permitted design. The county reviewer checks the stability calculations, the wall structural design, and the drainage details as a system, and construction observation during earthwork and wall installation is standard practice.",
      },
      {
        heading: "County Building Review, MSD Sewers, and Frost Design",
        body: "The county's Planning and Development Department reviews township projects for zoning compliance and building code conformance in one coordinated process. Site plan review covers setbacks, access, parking, and landscaping under the township zoning resolution, and building plan review checks the structural, architectural, and MEP design against the Ohio Building Code. Trade permits follow the building permit, and inspections verify the work matches the approved documents — including the geotechnical recommendations, which the inspector can require to be verified by the engineer of record.\n\nMSD's sewer review runs alongside. The district confirms sewer availability and capacity for the parcel, reviews connection designs and any main extensions, and enforces its standards for the combined and sanitary systems serving the site. The civil engineer coordinates tap permits, easements for sewer extensions, and any stormwater management the local regulations require, with detention and water-quality practices designed to the applicable standards. Foundations across the county extend below the frost line per the code, with bearing values and foundation types set by the geotechnical report for the site's ridgetop, hillside, or valley soils.",
      },
    ],
    faqs: [
      {
        question: "Why does Hamilton County require slope stability analysis?",
        answer: "The Ohio River valley's steep hillsides carry colluvial soils and weathered shale and limestone with a long history of landslides. The county expects geotechnical investigation and slope-stability analysis for hillside development, covering the entire slope — not just the building pad — with engineered retaining and drainage systems designed from the analysis.",
      },
      {
        question: "What is MSD's role in my Hamilton County project?",
        answer: "The Metropolitan Sewer District of Greater Cincinnati administers sanitary and combined sewer service across much of the county. It confirms sewer availability and capacity, reviews connection and extension designs, and enforces its standards — the civil engineer coordinates this review in parallel with the county's building permit.",
      },
      {
        question: "How do I know if my site is township or City of Cincinnati?",
        answer: "Check the county auditor's parcel records for the taxing jurisdiction. Cincinnati's boundaries interleave with township land, and mailing addresses do not settle it — township parcels permit through the county's Planning and Development Department, city parcels through Cincinnati's building department.",
      },
      {
        question: "What retaining systems work on Hamilton County hillsides?",
        answer: "It depends on the slope analysis: conventional cantilever walls for modest heights, drilled-shaft and lagging or soil-nail walls for taller or weaker slopes, always with integrated surface and subsurface drainage. The system is designed from the geotechnical slope-stability analysis, and construction observation during earthwork and wall installation is standard.",
      },
    ],
    extraLinks: [
      { label: "How does city vs. county permitting differ?", href: "/answers/boulder-county-vs-city-permitting/" },
      { label: "What is a geotechnical report?", href: "/answers/geotechnical-report-explained/" },
      { label: "How is a geotechnical settlement analysis done?", href: "/answers/geotechnical-settlement-analysis-explained/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "hennepin-county-mn-engineering-permit-guide",
    title: "How Does Engineering Permitting Work in Hennepin County, MN?",
    description: "Hennepin County cities issue their own building permits under the Minnesota State Building Code — deep-frost footings, expansive clays, and watershed district stormwater review shape the engineering.",
    h1: "How Does Engineering Permitting Work in Hennepin County, MN?",
    answer: "Direct answer: building permits in Hennepin County are issued by the city where the project sits — Minneapolis reviews through its Community Planning and Economic Development (CPED) department, and each suburb administers the Minnesota State Building Code through its own building department. The county does not issue general building permits for private development; its development role centers on transportation, right-of-way, and county road access. The county-level engineering reviews that most projects actually encounter are watershed-based: the county's watershed districts and watershed management organizations enforce stormwater, wetland, and floodplain rules that apply regardless of municipal boundaries. The design team confirms the city for the building permit and the watershed district for the water review.\n\nMinnesota's deep frost dominates structural design. Hennepin County designs for roughly five feet of frost penetration, so footings, piers, and frost walls extend well below grade, and the structural engineer details foundation insulation and frost-protected designs where the code allows them. The county's soils add a second challenge: glacial tills and outwash sands that generally bear well, but with pockets of soft organic soils in former wetland areas and plastic clays in places that shrink and swell with moisture changes. The geotechnical report sets bearing values, addresses settlement risk in the soft deposits, and flags any expansive soils needing moisture management or deeper foundations.\n\nThe watershed review is the civil constant. Organizations like the Minnehaha Creek Watershed District, Bassett Creek Watershed Management Commission, and others covering the county enforce rules for stormwater rate and volume control, wetland buffers and mitigation sequencing, floodplain management, and erosion control. Their jurisdiction follows watershed boundaries, not city lines, so a project can face city building review plus watershed district review as two independent tracks. The civil engineer's stormwater submittal — calculations, BMP designs, wetland delineation where applicable — is sealed and reviewed on its technical merits, and the watershed permit gates the project regardless of the city's building timeline.\n\nMinneapolis CPED review is the county's most involved municipal path. Commercial projects go through site plan review with the planning commission where required, then building plan review against the state building code with city amendments, plus trade permits and inspections. The city's combined-sewer separation legacy and its stormwater management requirements add civil coordination, and heritage or shoreland overlays near the Chain of Lakes and the Mississippi add design constraints the architect resolves before the engineering is finalized. Suburban cities run the same state code through leaner local processes, each with its own submittal expectations.",
    directAnswer: "Hennepin County building permits come from the local city — Minneapolis through CPED, suburbs through their own departments — under the Minnesota State Building Code. Watershed districts enforce stormwater, wetland, and floodplain rules across city lines. Structures design for roughly five feet of frost and mixed glacial soils with soft and expansive pockets.",
    topic: "Minnesota Engineering",
    serviceHref: "/services/structural/",
    sections: [
      {
        heading: "Deep-Frost Foundations and Glacial-Soil Variability",
        body: "Hennepin County's frost depth makes foundation design a bigger engineering exercise than in most of the country. Spread footings, drilled piers, and basement walls all extend below the roughly five-foot frost line, and the structural engineer sizes them from the geotechnical report's bearing values for the site's specific soils. Where the report finds soft organic deposits — common in former wetland areas — the design may call for deep foundations, overexcavation and replacement, or ground improvement, and the reviewer expects the drawings to show exactly what the report recommended.\n\nExpansive and plastic clays appear in parts of the county and demand their own detailing: moisture barriers, controlled backfill, and foundation designs that tolerate or isolate soil movement. The geotechnical engineer identifies these soils through Atterberg limits and swell testing, and the structural details — from slab edge thickening to pier depths — follow the findings. Basements need drainage, sump systems, and waterproofing designed for the local water table, which runs high near the county's lakes, creeks, and the Mississippi and Minnesota river corridors.",
      },
      {
        heading: "Watershed District Review and Municipal Building Permits",
        body: "The watershed districts and management organizations covering Hennepin County are independent AHJs for water resources. Their rules typically require stormwater management that controls both peak rates and total volume, water-quality treatment through best management practices, wetland delineation with avoidance-minimization-mitigation sequencing, and floodplain compliance with no adverse impact on neighbors. The civil submittal includes hydrologic and hydraulic modeling, BMP details, and erosion control plans, and the district's technical reviewers comment on the engineering — not just the paperwork.\n\nThe municipal building permit runs in parallel. Minneapolis CPED handles site plan review, building plan review, and inspections for city parcels, while each suburb administers the same state code through its own department with local amendments and procedures. The building reviewer checks structural, architectural, and MEP design, and trade permits follow. Because the watershed permit and the building permit close on different clocks, the project schedule is built around both — the civil engineer drives the watershed submittal early, since its site-layout implications (detention footprints, wetland buffers, infiltration areas) are hardest to retrofit late.",
      },
    ],
    faqs: [
      {
        question: "Does Hennepin County issue building permits?",
        answer: "No. Building permits come from the city where the parcel sits — Minneapolis through its CPED department, each suburb through its own building department — all under the Minnesota State Building Code. The county's development role centers on transportation and right-of-way, not private building review.",
      },
      {
        question: "What is a watershed district's role in my project?",
        answer: "Watershed districts and management organizations enforce stormwater, wetland, floodplain, and erosion rules across municipal boundaries. Their permit — covering rate and volume control, water-quality BMPs, wetland sequencing, and floodplain compliance — is an independent AHJ track that gates the project regardless of the city's building timeline.",
      },
      {
        question: "How deep do footings go in Hennepin County?",
        answer: "Foundations must extend below the local frost line, which Hennepin County designs to roughly five feet. The structural engineer sets the actual depth and foundation type from the state building code and the geotechnical report, which also addresses the site's glacial soils, soft deposits, and any expansive clays.",
      },
      {
        question: "Do Minneapolis projects face extra overlay reviews?",
        answer: "They can. Shoreland overlays near the Chain of Lakes and the Mississippi River, heritage preservation districts, and other city overlays add design constraints that the architect resolves during site plan review — before the structural and MEP engineering is finalized.",
      },
    ],
    extraLinks: [
      { label: "How does city vs. county permitting differ?", href: "/answers/boulder-county-vs-city-permitting/" },
      { label: "How deep should footings go in cold climates?", href: "/answers/minneapolis-deep-frost-footing-design/" },
      { label: "What is a geotechnical report?", href: "/answers/geotechnical-report-explained/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "ramsey-county-mn-engineering-permit-guide",
    title: "How Does Engineering Permitting Work in Ramsey County, MN?",
    description: "Ramsey County cities permit under the Minnesota State Building Code with watershed district water review — Saint Paul's DSI process, deep frost, and Mississippi river bluff soils shape the engineering.",
    h1: "How Does Engineering Permitting Work in Ramsey County, MN?",
    answer: "Direct answer: building permits in Ramsey County come from the city where the project sits — Saint Paul reviews through its Department of Safety and Inspections (DSI), and each suburb administers the Minnesota State Building Code through its own building department. The county does not issue general building permits for private work. Water resources review runs through the watershed districts covering the county, notably the Ramsey-Washington Metro Watershed District and the Capitol Region Watershed District, which enforce stormwater, wetland, floodplain, and erosion rules across municipal lines. The engineering team confirms the city for building review and the watershed district for water review at project outset.\n\nSaint Paul's DSI process is the county's most layered municipal path. Commercial projects move through site plan review with the planning commission where the zoning code requires it, then building plan review against the state building code with city amendments, plus fire, trade, and related permits. The city's Mississippi riverfront and bluff areas add geotechnical scrutiny: the river bluffs carry soils prone to erosion and slope instability, and development near the bluffs faces the city's bluffland regulations with geotechnical investigation and setback requirements. The civil and geotechnical engineers scope bluff work before the site layout is fixed, because bluff setbacks and stability requirements can remove significant acreage from the buildable envelope.\n\nThe watershed districts are the county-level engineering AHJs. Their rules require stormwater rate and volume control, water-quality treatment, wetland delineation and mitigation sequencing, floodplain management along the Mississippi and the county's lakes and creeks, and construction erosion control. The Ramsey-Washington Metro Watershed District in particular is known for rigorous technical review of stormwater submittals, and its permit is independent of the city's building permit — the civil engineer runs both tracks and designs the site to satisfy the stricter of any overlapping requirements.\n\nStructural design follows Minnesota's deep-frost reality. Foundations extend below the roughly five-foot frost line, with the geotechnical report setting bearing values for the county's glacial tills and outwash deposits, identifying soft organic soils in former wetland areas, and flagging any expansive clays. Basements need drainage and waterproofing suited to local water tables, which run high near the Mississippi, the lakes, and the county's creek corridors. The municipal reviewer checks that foundation depths, types, and details match the soils report — in Ramsey County, the report is the design basis, not a formality.",
    directAnswer: "Ramsey County building permits come from the local city — Saint Paul through DSI, suburbs through their own departments — under the Minnesota State Building Code. Watershed districts enforce stormwater, wetland, and floodplain rules across city lines. Mississippi bluff sites add geotechnical slope review; foundations design for roughly five feet of frost.",
    topic: "Minnesota Engineering",
    serviceHref: "/services/civil/",
    sections: [
      {
        heading: "Saint Paul DSI Review and Mississippi Bluff Geotechnics",
        body: "Saint Paul's Department of Safety and Inspections administers plan review, permits, and inspections for the city, with the planning commission handling site plan review and the zoning code's entitlement processes — variances, conditional uses, rezonings — where projects trigger them. Commercial submittals include architectural, structural, and MEP plans plus civil site work, reviewed against the state building code with Saint Paul amendments. The city's process rewards complete submittals: the review threads for zoning, building, fire, and public works each run on the city's timeline, and the design team tracks each to closeout.\n\nThe Mississippi bluffs deserve early engineering attention. Bluffland areas carry the city's specific regulations governing setbacks, vegetation, and grading near the bluff line, and the underlying soils — sands, clays, and weathered deposits on steep slopes — require geotechnical investigation with slope-stability analysis for structures, retaining systems, and significant grading near the bluff. The geotechnical engineer evaluates both the building site and the slope's global stability, because bluff failures in the region have historically involved the hillside, not just the structure. Retaining walls, drainage, and grading plans are designed from that analysis, and the city reviewer checks the geotechnical recommendations against the bluffland requirements.",
      },
      {
        heading: "Watershed District Permits and Deep-Frost Foundations",
        body: "The watershed districts covering Ramsey County operate as independent water-resource AHJs. Their permits address the full water cycle for the site: stormwater detention and volume control sized by hydrologic modeling, water-quality best management practices, wetland buffers and mitigation where delineation finds wetlands, floodplain compliance with compensatory storage where fill displaces flood volume, and erosion and sediment control during construction. The civil submittal is sealed by a licensed professional engineer and reviewed on its technical merits — undersized outlets, missing overflow paths, and inconsistent grading-to-calculation details are the classic correction items.\n\nFoundations across the county extend below the deep frost line per the state building code, with the structural engineer detailing footings, piers, and foundation walls from the geotechnical report. The report characterizes the glacial tills and sands, locates soft organic deposits that may need deep foundations or ground improvement, and tests for expansive soils that would require moisture management or isolation detailing. Where municipal utilities do not reach — uncommon in Ramsey County but present on its edges — well and septic review through the county or state health programs joins the process. Each AHJ approves its own piece, and the building permit waits on the watershed and geotechnical threads being resolved.",
      },
    ],
    faqs: [
      {
        question: "Does Ramsey County issue building permits?",
        answer: "No. Permits come from the city where the parcel sits — Saint Paul through its Department of Safety and Inspections, each suburb through its own building department — under the Minnesota State Building Code. The county's private-development role is limited; watershed districts handle the county-level water review.",
      },
      {
        question: "What is special about building near the Mississippi bluffs?",
        answer: "Saint Paul's bluffland regulations govern setbacks, vegetation, and grading near the bluff line, and the bluff soils require geotechnical investigation with slope-stability analysis for structures and retaining systems. The analysis covers the slope's global stability, and bluff constraints can significantly reduce the buildable area — so the geotechnical scoping comes before site layout.",
      },
      {
        question: "Which watershed district reviews my Ramsey County site?",
        answer: "It depends on the watershed boundary — the Ramsey-Washington Metro Watershed District and the Capitol Region Watershed District are the two principal districts in the county. The civil engineer confirms jurisdiction from the watershed maps, since district boundaries do not follow city lines.",
      },
      {
        question: "How deep do foundations go in Ramsey County?",
        answer: "Below the local frost line, which the county designs to roughly five feet, with foundation type and bearing values set by the geotechnical report for the site's glacial soils, soft deposits, and any expansive clays. Basements need drainage and waterproofing designed for local water tables near the river, lakes, and creeks.",
      },
    ],
    extraLinks: [
      { label: "How does city vs. county permitting differ?", href: "/answers/boulder-county-vs-city-permitting/" },
      { label: "How deep should footings go in cold climates?", href: "/answers/minneapolis-deep-frost-footing-design/" },
      { label: "What is a geotechnical report?", href: "/answers/geotechnical-report-explained/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "milwaukee-county-wi-engineering-permit-guide",
    title: "How Does Engineering Permitting Work in Milwaukee County, WI?",
    description: "Milwaukee County municipalities issue their own building permits while MMSD governs sewers and waterways — combined sewers, deep frost, and lake clay soils drive the engineering.",
    h1: "How Does Engineering Permitting Work in Milwaukee County, WI?",
    answer: "Direct answer: building permits in Milwaukee County are issued by the city or village where the project sits — Milwaukee reviews through its Department of Neighborhood Services, and each suburb administers the Wisconsin Uniform Dwelling Code and Commercial Building Code through its own inspection department. The county does not issue general building permits for private development. The dominant county-scale engineering authority is the Milwaukee Metropolitan Sewerage District (MMSD), which operates the regional sewer system and enforces its rules for connections, stormwater management, and work near its facilities across the member municipalities. Confirming the municipality for the building permit and MMSD's requirements for the site's sewer service is the opening move.\n\nMMSD's jurisdiction shapes civil design countywide. The district's rules govern connections to the regional system, require stormwater management for regulated development, and restrict construction near district sewers, watercourses, and flood management facilities. Milwaukee's combined sewer areas — the older city core where stormwater and sanitary flow share pipes — add the city's plumbing and sewer connection standards to the design, including backflow prevention and any project-specific stormwater expectations tied to the region's long-term combined-sewer overflow control program. The civil engineer determines whether the parcel sits in combined or separated sewer territory before the utility plan is drawn, because the two systems impose different design requirements.\n\nMilwaukee's Department of Neighborhood Services runs the county's largest municipal review: plan examination, zoning compliance, trade permits, and inspections for the city, with the Board of Zoning Appeals and City Plan Commission handling entitlements. Commercial submittals include architectural, structural, and MEP plans plus civil site work, reviewed against the state commercial building code with city amendments. The suburban municipalities run the same state codes through their own departments, each with local procedures and inspection scheduling.\n\nStructural design in Milwaukee County works around deep frost and clay. Footings extend below the local frost line — Wisconsin designs to roughly four feet — and the county's soils are dominated by stiff glacial clays with poor drainage, plus lake-plain deposits near Lake Michigan and fill in historically developed areas. The geotechnical report sets bearing values, addresses settlement in softer deposits, and drives basement drainage, sump, and waterproofing details for the high water tables near the lake and the county's rivers. Commercial slabs and pavements need subgrade preparation suited to the clays, and the municipal reviewer checks the structural drawings against the soils report.",
    directAnswer: "Milwaukee County building permits come from the local municipality — Milwaukee through Neighborhood Services, suburbs through their own departments — under Wisconsin's state building codes. MMSD governs regional sewers, stormwater, and work near district facilities. Foundations design for roughly four feet of frost and stiff glacial clay soils.",
    topic: "Wisconsin Engineering",
    serviceHref: "/services/civil/",
    sections: [
      {
        heading: "MMSD Review and Combined-Sewer Design Constraints",
        body: "The Milwaukee Metropolitan Sewerage District is the regional AHJ for sewers and waterways, and its rules apply across the member municipalities regardless of who issues the building permit. The district reviews connections to the regional system, enforces stormwater management requirements for regulated development, and requires permits for construction near its interceptors, watercourse improvements, and flood management facilities. The civil submittal documents the connection design, the stormwater calculations and BMPs, and the clearances from district facilities, sealed by a licensed professional engineer.\n\nIn Milwaukee's combined-sewer areas, the design must satisfy both MMSD's regional rules and the city's connection standards. Backflow prevention protects buildings from surcharge during major storms, plumbing designs reflect the combined system's characteristics, and larger projects may incorporate stormwater detention or green infrastructure consistent with the region's overflow-control commitments. The civil engineer treats the sewer review as a parallel permit track with its own submittal, review comments, and closeout — it does not ride along inside the building permit.",
      },
      {
        heading: "Municipal Building Review, Frost, and Clay-Soil Foundations",
        body: "Milwaukee's Department of Neighborhood Services examines plans, issues permits, and inspects construction for the city, coordinating zoning, building, and trade reviews in one municipal process. Site plan review and any required entitlements go through the city's planning bodies before or alongside building plan review, and the engineering submittal must reflect the approved site layout — a rezoning condition or variance stipulation can change setbacks, access, or landscaping that the civil drawings must match.\n\nFoundations countywide extend below the frost line per the state codes, with the structural engineer setting depths and types from the geotechnical report. The report characterizes the stiff clays that dominate the county, locates softer lake-plain or alluvial deposits that may settle under commercial loads, and identifies fill soils needing removal or improvement. Basements get drainage tile, sump systems, and waterproofing designed for clay's slow drainage and the water tables near Lake Michigan and the Milwaukee, Menomonee, and Kinnickinnic rivers. The municipal plan reviewer verifies that the foundation design follows the report — in Milwaukee County's clays, the soils investigation is what keeps basements dry and slabs level.",
      },
    ],
    faqs: [
      {
        question: "Does Milwaukee County issue building permits?",
        answer: "No. Each city and village issues its own permits — Milwaukee through its Department of Neighborhood Services, suburbs through their own inspection departments — under Wisconsin's Uniform Dwelling Code and Commercial Building Code. The county-scale authority developers encounter is MMSD for sewers and waterways.",
      },
      {
        question: "What does MMSD review on private development?",
        answer: "Connections to the regional sewer system, stormwater management for regulated development, and any construction near district interceptors, watercourses, or flood management facilities. Its rules apply across member municipalities as an independent review track alongside the municipal building permit.",
      },
      {
        question: "How do combined sewers affect Milwaukee projects?",
        answer: "In the city's combined-sewer areas, stormwater and sanitary flow share pipes, so the design must meet city connection standards with backflow prevention and any project stormwater expectations tied to the region's overflow-control program. The civil engineer confirms combined versus separated service for the parcel before designing utilities.",
      },
      {
        question: "What foundation conditions are typical in Milwaukee County?",
        answer: "Roughly four feet of frost penetration, stiff glacial clays with poor drainage, softer lake-plain deposits near Lake Michigan, and fill in older developed areas. The geotechnical report sets foundation type, bearing values, and basement drainage and waterproofing for the specific site.",
      },
    ],
    extraLinks: [
      { label: "How does city vs. county permitting differ?", href: "/answers/boulder-county-vs-city-permitting/" },
      { label: "How do you respond to plan check corrections?", href: "/answers/how-to-respond-to-plan-check-corrections/" },
      { label: "What is a geotechnical report?", href: "/answers/geotechnical-report-explained/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "dane-county-wi-engineering-permit-guide",
    title: "How Does Engineering Permitting Work in Unincorporated Dane County, WI?",
    description: "Dane County's Planning and Development handles zoning for unincorporated towns while Madison runs its own review — Yahara watershed rules, drumlin soils, and deep frost shape the engineering.",
    h1: "How Does Engineering Permitting Work in Unincorporated Dane County, WI?",
    answer: "Direct answer: land use in Dane County's unincorporated towns is governed by the county's zoning ordinance, administered by the Dane County Planning and Development Department, while building code enforcement for one- and two-family dwellings in the towns is typically handled at the town level and commercial building review follows the state commercial building code through the applicable reviewing authority. Madison — the county seat and dominant city — runs its own full review through its Planning, Community and Economic Development agencies and Building Inspection. The parcel's town-versus-city status decides the review path, and the Yahara watershed's stormwater expectations apply across the urbanizing areas. Verifying jurisdiction through county parcel records is the first engineering task, because Madison's growth has left town islands surrounded by the city.\n\nDane County's zoning is the constant for town parcels. The county zoning ordinance regulates land use, setbacks, lot standards, and conditional uses in the unincorporated towns, with the county's zoning staff reviewing site plans and the county board's committees handling rezones and conditional use permits. Commercial and multifamily projects in the towns need county zoning approval before building permits, and the civil engineer confirms the zoning district, permitted uses, and any overlay requirements — shoreland zoning near the Yahara lakes and streams, for example — before the site layout is set.\n\nStormwater in the urbanizing towns follows the county's stormwater expectations and, in many areas, the standards of the adjacent city through extraterritorial or intergovernmental arrangements. The Yahara River watershed's chain of lakes — Mendota, Monona, Waubesa, Kegonsa — makes water quality and flood management a regional priority, and the civil engineer's stormwater design addresses detention, infiltration where soils allow, and erosion control with the sealed calculations the reviewers check. Wetland and floodplain constraints along the Yahara corridor and its tributaries can reshape the buildable area, so the constraints analysis precedes the site plan.\n\nStructural design contends with deep frost and glacial landforms. Footings extend below the roughly four-foot frost line, and the county's drumlins, ground moraine, and outwash deposits create variable soils — competent tills on the drumlins, sandier outwash in places, and soft organic deposits in former wetland and lowland areas. The geotechnical report maps this variability for the site, sets bearing values and settlement expectations, and drives foundation type and basement waterproofing for the local water tables near the lakes and Yahara system.",
    directAnswer: "Unincorporated Dane County town parcels follow the county zoning ordinance through Planning and Development, with building code review through the applicable town or state authority; Madison runs its own full municipal review. Yahara watershed stormwater rules and shoreland zoning constrain urbanizing sites; foundations design for roughly four feet of frost and variable glacial soils.",
    topic: "Wisconsin Engineering",
    serviceHref: "/services/civil/",
    sections: [
      {
        heading: "County Zoning, Shoreland Rules, and the Yahara Watershed",
        body: "Dane County's Planning and Development Department is the zoning AHJ for the unincorporated towns, administering the county zoning ordinance's district standards, conditional use process, and site plan review. Rezones and conditional uses go through public hearings, which adds months to the entitlement timeline — the civil engineer and land-use attorney confirm the zoning path before the project schedule is built. Shoreland zoning near the Yahara lakes, rivers, and streams adds setback, vegetation, and impervious-surface standards that the site plan must satisfy on top of the base district rules.\n\nStormwater design in the county's growth areas answers to both water-quality and flood-control expectations shaped by the Yahara lakes system. The civil submittal includes hydrologic modeling, detention and infiltration design, water-quality practices, and erosion and sediment control, with the calculations sealed by a licensed professional engineer. Where town parcels sit in the path of municipal growth, intergovernmental agreements or future annexation can bring city stormwater standards into play — the engineer confirms which standards govern the parcel rather than assuming the town's minimums will suffice.",
      },
      {
        heading: "Building Review Paths and Glacial-Soil Foundations",
        body: "The building permit path for town parcels depends on the occupancy: one- and two-family dwellings typically permit through the town's building inspection process under the Wisconsin Uniform Dwelling Code, while commercial buildings follow the state commercial building code through the designated reviewing authority. Madison parcels go through the city's Building Inspection with its full plan review, zoning, and trade permit process. Each AHJ checks structural, architectural, and MEP design against its applicable code, and the engineering drawings must reflect the approved zoning and site layout.\n\nFoundations across the county extend below the frost line per the applicable code, with the geotechnical investigation carrying unusual weight because Dane County's glacial landforms change soils over short distances. Drumlins offer dense till that bears well; outwash areas bring sands with different bearing and drainage behavior; lowlands and former wetlands hide soft organic soils that settle under load and may require deep foundations or ground improvement for commercial structures. The report sets foundation type, bearing values, and excavation and dewatering requirements, and the plan reviewer expects the structural drawings to implement its recommendations — particularly basement drainage and waterproofing where water tables run high near the lakes and the Yahara corridor.",
      },
    ],
    faqs: [
      {
        question: "Who zones my Dane County town parcel?",
        answer: "Dane County itself — the Planning and Development Department administers the county zoning ordinance for the unincorporated towns, covering district standards, site plan review, conditional uses, and rezones. Building code review then follows through the town or the applicable authority for the occupancy type.",
      },
      {
        question: "How does Madison's growth affect town parcels?",
        answer: "Madison has annexed extensively, leaving town islands surrounded by the city, and intergovernmental agreements or future annexation can bring city standards — including stormwater — into play for town parcels. The engineer confirms the governing standards for the specific parcel rather than assuming town minimums apply.",
      },
      {
        question: "What is shoreland zoning in Dane County?",
        answer: "Shoreland zoning applies near the Yahara lakes, rivers, and streams, adding setback, vegetation protection, and impervious-surface standards on top of the base zoning district. The civil engineer maps shoreland jurisdiction during the constraints analysis, before the site layout is fixed.",
      },
      {
        question: "What soils will my Dane County geotechnical report find?",
        answer: "It varies by landform: dense till on drumlins, sands in outwash areas, and soft organic deposits in lowlands and former wetlands — all under roughly four feet of frost. The report sets bearing values, foundation type, settlement expectations, and basement drainage and waterproofing for the site.",
      },
    ],
    extraLinks: [
      { label: "How does city vs. county permitting differ?", href: "/answers/boulder-county-vs-city-permitting/" },
      { label: "How long does plan check take?", href: "/answers/how-long-does-plan-check-take/" },
      { label: "What is a geotechnical report?", href: "/answers/geotechnical-report-explained/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
];
