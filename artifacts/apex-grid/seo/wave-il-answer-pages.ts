import type { Phase0AeoPage } from "./phase0-corpus";

const founderNote = "I'm Jeremy Mills, CEO & Founder of Apex Grid Engineering and a U.S. Air Force veteran. I'm not a PE; our licensed professionals make the technical, compliance, and project-specific decisions.";

export const WAVE_IL_ANSWER_PAGES: Phase0AeoPage[] = [
  {
    slug: "honolulu-volcanic-basalt-foundation-design",
    title: "How Are Honolulu Foundations Designed for Volcanic Basalt and Coral Rock?",
    description: "Honolulu foundations bear on basalt, coral ledges, or tuff, with the geotechnical report setting bearing values, socket depths, and settlement limits.",
    h1: "How Are Honolulu Foundations Designed for Volcanic Basalt and Coral Rock?",
    answer: "Honolulu's ground is a layered stack of volcanic and reef deposits, and the foundation type follows the rock, not a standard rule of thumb. Direct answer: foundations in Honolulu bear on basalt bedrock, coral reef ledges, or volcanic tuff where those layers are present near the surface, with the geotechnical report setting the allowable bearing pressure, socket depth, and settlement criteria; weak lagoonal muds, alluvium, and fill are bypassed with deep foundations or removed and replaced. The structural engineer then designs the footings, piers, or shafts from those report values and permits the work through the Honolulu Department of Planning and Permitting (DPP).\n\nThe subsurface under Honolulu is a caprock of younger sediments sitting on older Ko'olau basalt. Decades of boring logs compiled by the University of Hawaii classify the near-surface materials into fill, lagoonal deposits, alluvial deposits, coralline debris, coral ledges, cinders, tuff, basalt, and residual weathered soil. The three strongest bearing layers are the coral ledges, the tuff, and the basalt. The lagoonal muds and alluvial clays between them are compressible and weak, and they also include buried alluvial channels that can change bearing conditions across a single lot. A site-specific investigation with borings to a competent layer is the only way to know which materials are actually under the building.\n\nEach rock type brings its own design problem. Basalt is hard and strong, but young flows can be fractured, vesicular, or laced with soft zones, so drilled shafts are socketed a specified depth into competent rock and the socket length is verified in the field rather than assumed from one boring. Coral reef limestone is strong where it is intact, but it can hold cavities, solution features, and loose coralline debris that swallow grout and reduce bearing, so the investigation probes for voids and the design accounts for variable rock quality. Volcanic tuff is generally reliable bearing, while cinder deposits and loose coralline sands behave more like dense granular soil than rock.\n\nWhere the competent layer is deep, buildings go to deep foundations. Driven piles and drilled shafts extend through the weak caprock sediments to bear in basalt, coral ledge, or tuff, and the design checks both end bearing and side resistance per the geotechnical recommendations. Where bearing rock is shallow, spread footings or a mat foundation can work, provided settlement of any remaining compressible layer is checked. Because the City and County of Honolulu covers the entire island of O'ahu, the DPP is the AHJ for all of it, and its HNL Build portal routes the geotechnical report and structural calculations through agency review. The AHJ decides what is approved, and the engineer confirms current submittal requirements before the investigation is scoped.",
    directAnswer: "Honolulu foundations bear on basalt bedrock, coral reef ledges, or volcanic tuff where present, with bearing values, socket depths, and settlement limits set by the geotechnical report. Weak lagoonal muds and fill are bypassed with drilled shafts or piles, and the work is permitted through the Honolulu Department of Planning and Permitting.",
    topic: "Hawaii Pacific Island Engineering",
    serviceHref: "/services/structural/",
    sections: [
      {
        heading: "Bearing in Basalt, Coral Ledge, and Tuff",
        body: "The design starts where the borings stop. The geotechnical engineer maps the depth, thickness, and quality of each layer, then recommends an allowable bearing pressure or shaft capacity for the competent stratum, along with socket depths for drilled shafts and criteria for identifying refusal or competent rock in the field. For basalt, the report distinguishes massive flows from fractured or weathered zones, because bearing and socket friction vary sharply between them. For coral ledge, the report flags cavities and soft pockets and may recommend probing ahead of each shaft.\n\nThe structural engineer converts those recommendations into the foundation system. Heavy buildings typically use drilled shafts socketed into basalt or coral ledge, with reinforced concrete shafts sized for axial load, lateral load, and any downdrag from settling fill around them. Lighter structures on shallow rock use spread footings bearing directly on the competent layer, with footing elevations stepped to follow the rock surface. Where a building straddles rock at different depths, the engineer details the transition so differential settlement does not crack the structure.",
      },
      {
        heading: "Dealing With the Weak Layers Above the Rock",
        body: "The caprock sediments above the basalt are the reason deep foundations exist in Honolulu. Lagoonal muds and alluvial clays consolidate under load, which means a footing that bears on them will settle over time, unevenly where the soft layer is thicker. Fill placed over former fishponds, marshes, and shoreline areas is even less reliable. The geotechnical report identifies these layers, estimates consolidation settlement, and recommends either bypassing them entirely or, for light loads, over-excavating and replacing them with engineered fill.\n\nGroundwater complicates every option. The caprock holds brackish groundwater within a few feet of sea level, so deep excavations encounter water almost immediately and need dewatering and waterproofing planned from the start. Buried alluvial channels can also concentrate groundwater flow and weaken the ground locally. The permit set documents how the design handles bearing, settlement, and water together, because the plan reviewer at DPP sees all three as one foundation problem, not three separate ones.",
      },
    ],
    faqs: [
      {
        question: "What is the best foundation bearing layer in Honolulu?",
        answer: "Intact basalt bedrock, dense coral reef ledges, and volcanic tuff are the most reliable bearing layers, according to compiled Honolulu boring data. The geotechnical report on each site confirms which of these is present, its depth and quality, and the allowable bearing values the structural engineer can use. No bearing layer should be assumed from neighboring lots, because depths and rock quality vary.",
      },
      {
        question: "Why can't a Honolulu building just use spread footings everywhere?",
        answer: "Spread footings only work where a competent bearing layer is within practical excavation depth. Across much of Honolulu, the near-surface ground is fill, lagoonal mud, or alluvium over deeper rock, and footings on those soft layers settle. Deep foundations carry the load through the weak layers to the rock below, which is why downtown towers and many mid-rise buildings stand on drilled shafts or piles.",
      },
      {
        question: "What problems does coral reef limestone cause for foundations?",
        answer: "Coral limestone can be strong, but it is rarely uniform. Cavities, solution voids, and zones of loose coralline debris create sudden changes in bearing, and drilling can lose circulation in open voids. The investigation probes for these features, and the design may require additional shaft length, grouting of voids, or conservative capacity values where the rock is variable.",
      },
      {
        question: "Who reviews the geotechnical report for a Honolulu project?",
        answer: "The geotechnical report is part of the building permit submittal reviewed by the Honolulu Department of Planning and Permitting through its HNL Build portal. DPP routes the plans and calculations to the appropriate agencies for code compliance review. The AHJ decides what is approved, so the design team confirms current submittal and review requirements before starting the investigation.",
      },
      {
        question: "Does foundation design differ on the neighbor islands?",
        answer: "The engineering principles are the same, but the geology and the AHJ change. The Big Island, Maui, and Kaua'i each have their own building departments with their own submittal portals, and their volcanic soils, lava tubes, and ash deposits create different bearing problems than Honolulu's caprock. The geotechnical investigation always reflects the island's actual geology, never a mainland assumption carried over.",
      },
    ],
    extraLinks: [
      { label: "What is a geotechnical report?", href: "/answers/geotechnical-report-explained/" },
      { label: "How are deep foundations designed?", href: "/answers/deep-foundation-design/" },
      { label: "What are concrete mix design basics?", href: "/answers/concrete-mix-design-basics/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "honolulu-dpp-plan-review-process",
    title: "How Does the Honolulu DPP Plan Review Process Work?",
    description: "Honolulu permits run through DPP's HNL Build portal: online application, ePlans submittal, prescreen, agency review with corrections, issuance, and inspections.",
    h1: "How Does the Honolulu DPP Plan Review Process Work?",
    answer: "A Honolulu building permit is an online workflow with a defined sequence, and knowing the sequence keeps a project moving. Direct answer: the process runs through the Department of Planning and Permitting's HNL Build portal, where the applicant files an online building permit application, uploads plans and documents through ePlans electronic plan review, passes a prescreen for completeness, and then moves through multi-agency plan review with correction cycles until every agency approves, followed by payment, permit issuance, inspections, and permit closeout. Small qualifying single-family projects can use Instant Online Permits instead.\n\nThe sequence starts with the application. The applicant files an Internet Building Permit application through HNL Build and selects electronic plan review, which triggers an email link to the ePlans system for uploading drawings and supporting documents. The submittal must meet the building plans format checklist: dimensioned, to-scale drawings, a graphic bar scale, and the required supporting documents for the project type. Shoreline lots need a certified shoreline survey prepared by a registered land surveyor and certified by the Board of Land and Natural Resources within one year of the application date, along with the regulatory shoreline setback shown on the site plan.\n\nPrescreen comes before any technical review. DPP staff check that the plans meet the format checklist and that all required information is present, and incomplete submittals are returned to the applicant for correction. Once a submittal passes prescreen, the plans are routed to the appropriate agencies for code compliance review, which can include zoning, building, electrical, plumbing, and fire reviewers depending on the scope. Reviewers return comments for clarification or code compliance issues, the design team responds and resubmits, and the cycle repeats until all agencies approve. For qualifying residential projects, the optional OTR-60 one-time review process limits agency review to a single cycle, with the applicant asserting that all comments are addressed.\n\nAfter all approvals, the applicant submits the required documents and payment to have the permit issued. Building permits with plans are paid by check to the City and County of Honolulu, while Instant Online Permits accept credit or debit cards. Construction then proceeds with the required inspections called in as the work reaches each stage, and the permit must be formally closed once the inspector completes final inspection. The AHJ decides what is approved at every step, and review timelines vary with department workload, so owners and design teams should confirm current processing times before committing to a construction schedule.\n\nJurisdiction matters in Hawai'i. The City and County of Honolulu covers all of O'ahu, so DPP is the single building department for Honolulu, Waikiki, Kailua, and the North Shore alike. The other islands are separate: Maui County, Kaua'i County, and the County of Hawai'i each run their own building departments with their own portals and review processes. A project team working across islands confirms each county's current submittal rules rather than assuming Honolulu's process applies statewide.",
    directAnswer: "Honolulu permits run through DPP's HNL Build portal: online application, ePlans upload, prescreen for completeness, multi-agency plan review with correction cycles, then payment, issuance, inspections, and closeout. Qualifying single-family work can use Instant Online Permits, and review timelines should be confirmed with the department before scheduling construction.",
    topic: "Hawaii Pacific Island Engineering",
    serviceHref: "/services/structural/",
    sections: [
      {
        heading: "HNL Build, ePlans, and the Prescreen Gate",
        body: "HNL Build is the online permitting platform that replaced the legacy Posse system, consolidating permit tracking so a project's phases share one record instead of separate tracking numbers. Account registration with email verification is required, and electronic plan submittal is the standard path. Questions about ePlans uploads go to the department's dedicated ePlans support email, and the permit center can be reached by phone for application questions.\n\nThe prescreen gate is where most submittals stall or sail through. Reviewers check plan format, scale, dimensions, and required documents before any engineer or architect reviewer sees the design. Common returns include missing bar scales, un-dimensioned plans, absent shoreline certifications on coastal lots, and incomplete structural or civil documentation. A clean prescreen pass is the cheapest schedule insurance in the whole process, because a submittal returned at prescreen has not yet entered the technical review queue.",
      },
      {
        heading: "Correction Cycles and What Speeds Them Up",
        body: "Multi-agency review means several reviewers look at the same set of plans for different code chapters, and their comments arrive as a combined correction list. The design team's response should address every comment in writing, cloud the changes on the drawings, and resubmit a complete package, because partial responses generate a second correction cycle on items that could have closed in the first. OTR-60 compresses this for eligible single-family and two-family projects by limiting the agencies to one review cycle, with compliance verified at inspection.\n\nStructural submittals get the smoothest reviews when the calculations, the geotechnical report, and the drawings tell the same story. Lateral system, foundation type, and design loads in the calculations must match what is drawn and what the geotechnical engineer recommended. The AHJ alone decides what is approved, and the design team confirms the current review timelines with the department, since workload-driven backlogs change the schedule math more than any design choice.",
      },
    ],
    faqs: [
      {
        question: "What is HNL Build?",
        answer: "HNL Build is the City and County of Honolulu's online permitting platform, launched to replace the legacy Posse system. It handles permit application, tracking, and electronic plan submittal in one place, with a single tracking record for a project's phases. Applicants register with email verification before submitting.",
      },
      {
        question: "What is the difference between an Instant Online Permit and a standard building permit?",
        answer: "Instant Online Permits are issued immediately online for qualifying work, mostly on single-family dwellings, as long as the property is not in a flood zone and has no advisories or violations. Standard building permits require plan submittal through ePlans, prescreen, and multi-agency review, and they cover new construction, additions, and structural work that needs drawings.",
      },
      {
        question: "What is OTR-60?",
        answer: "OTR-60 is an optional one-time review process for qualifying residential projects, including new construction and renovation of single-family and two-family detached dwellings submitted through ePlans. It limits agency review to one review cycle, with the applicant asserting that all comments have been addressed and compliance verified by inspection, which can shorten review for straightforward homes.",
      },
      {
        question: "How long does DPP plan review take?",
        answer: "Review timelines vary with department workload, project complexity, and how clean the submittal is. The AHJ decides what is approved and on what schedule, so the design team confirms current processing times with DPP before committing to a construction schedule. Clean prescreen passes and complete correction responses are the factors the project team controls.",
      },
      {
        question: "Does the same process apply on Maui, Kaua'i, and the Big Island?",
        answer: "No. Each county is its own AHJ with its own building department, portals, and review timelines. Honolulu's HNL Build process applies only on O'ahu. Maui County, Kaua'i County, and the County of Hawai'i each have their own submittal requirements, so multi-island project teams verify each county's current process separately.",
      },
    ],
    extraLinks: [
      { label: "What is a geotechnical report?", href: "/answers/geotechnical-report-explained/" },
      { label: "What are ASCE 7 seismic design categories?", href: "/answers/asce-7-seismic-design-categories/" },
      { label: "How do floodproofing techniques work?", href: "/answers/floodproofing-techniques-explained/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "waikiki-high-water-table-basement-design",
    title: "How Are Basements Designed for Waikiki's High Water Table?",
    description: "Waikiki basements contend with brackish caprock groundwater near the surface, using dewatering, buoyancy design, blindside waterproofing, and sump backup.",
    h1: "How Are Basements Designed for Waikiki's High Water Table?",
    answer: "In Waikiki, groundwater is not a possibility to check; it is a certainty to design for. Direct answer: basements and below-grade parking in Waikiki are designed for brackish caprock groundwater that sits within a few feet of sea level, using construction dewatering to build the structure, a waterproofing system rated for permanent hydrostatic pressure, and a structural design that resists buoyancy uplift, with under-slab drainage and sump systems as backup. The geotechnical and hydrogeologic investigation sets the design water elevation, including tidal fluctuation, and the structural engineer sizes the slab and walls for the water pressure it will actually see.\n\nThe ground under Waikiki is a caprock of coral reef limestone, lagoonal deposits, and alluvium over Ko'olau basalt, and the caprock holds unconfined groundwater close to the ground surface in many areas. University of Hawaii research compiling thousands of Honolulu borings found groundwater within about five feet of sea level in the downtown and coastal areas, with coral ledges, coralline debris, and coarse lagoonal deposits carrying water much more readily than the clays around them. The water is brackish and non-potable, and levels respond to tides, so a basement wall sees water pressure that rises and falls on a daily cycle.\n\nConstruction dewatering is the first engineering problem. Excavating below the water table in permeable coral deposits means pumping, typically with wellpoints or deep wells, and the dewatering design must be based on the site's own small-scale geology because hydraulic conductivity varies wildly within the caprock. Discharge of pumped groundwater needs its own approvals, and neighboring structures must be protected from settlement caused by drawdown. The shoring system, often secant pile or slurry walls in tight Waikiki sites, doubles as the groundwater cutoff and as the surface the waterproofing is applied to.\n\nThe permanent design treats water as a structural load. Hydrostatic uplift pushes up on the basement slab with the full weight of the displaced water, so the slab is thickened, tied down with tension piles or anchors where uplift exceeds the building's dead weight, and designed as a structural element, not just a floor. Walls are designed for lateral water pressure plus soil pressure, and every joint, penetration, and tie hole is a waterproofing detail. Waterproofing is typically a fully bonded sheet membrane or bentonite system applied blindside against the shoring before the concrete is placed, since there is no access to the outside of the wall after construction. Under-slab drainage with sump pumps provides a secondary path for water that gets past the membrane, and the pumps need emergency power, because a pump that stops in a high water table basement is a flooding event. The AHJ, Honolulu DPP, reviews the dewatering, shoring, waterproofing, and structural design as one package through HNL Build, and the AHJ decides what is approved.",
    directAnswer: "Waikiki basements are engineered for brackish caprock groundwater near the surface: construction dewatering, a fully bonded or bentonite waterproofing system rated for permanent hydrostatic pressure, structural slabs and walls designed for uplift and lateral water loads, and under-slab drainage with backup sump pumps.",
    topic: "Hawaii Pacific Island Engineering",
    serviceHref: "/services/structural/",
    sections: [
      {
        heading: "Buoyancy, Uplift, and the Structural Slab",
        body: "A basement in the water table is a boat hull trying to float, and the structural design proves it stays down. The engineer calculates hydrostatic uplift from the design high water elevation, which includes tidal range and storm surge effects from the geotechnical investigation, and compares it against the building's reliable dead weight. Where uplift wins, the design adds tension piles, rock anchors, or a thickened mat slab heavy enough to hold the structure down, with the slab reinforced for the bending that uplift creates between tie-down points.\n\nWalls carry the lateral side of the same water. The design combines hydrostatic pressure with at-rest soil pressure and any surcharge from adjacent streets and buildings, and it checks the wall as a propped or cantilevered element depending on the floor framing. Construction joints get waterstops, tie holes get sealed plugs, and penetrations for utilities get flanged waterproofing boots. Every one of these details is drawn and specified, because a basement waterproofing system fails at its details, not in the middle of a membrane sheet.",
      },
      {
        heading: "Waterproofing and Dewatering as One System",
        body: "The waterproofing selection follows the construction sequence. On tight Waikiki sites where shoring stays in place, blindside waterproofing is applied to the shoring face before the structural wall is cast against it, so the membrane bonds to the concrete and any water that reaches it is stopped at the wall face. Fully bonded sheet membranes and sodium bentonite panels are the common choices, selected for the project's chemistry, the expected hydrostatic head, and the shoring type. Crystalline admixtures in the concrete add a second line of defense inside the wall itself.\n\nDewatering gets the structure built so the waterproofing can do its job permanently. Wellpoints or deep wells lower the water table inside the excavation while the shoring holds back the surrounding ground and water, and the system runs until the structure is heavy enough and sealed enough to resist the water on its own. Pumping rates, discharge points, and monitoring of neighboring buildings are part of the dewatering submittal, because the AHJ reviews construction impacts alongside the permanent design.",
      },
    ],
    faqs: [
      {
        question: "How high is the water table in Waikiki?",
        answer: "Caprock groundwater in the Honolulu coastal area is commonly within about five feet of sea level, and in low-lying Waikiki sites it can be very close to the ground surface. Levels fluctuate with tides and rainfall. The geotechnical investigation for each site measures actual water elevations over time rather than relying on regional rules of thumb.",
      },
      {
        question: "Is Waikiki groundwater fresh or salt water?",
        answer: "It is brackish and non-potable, a mix of seawater intrusion and fresh groundwater moving through the caprock toward the ocean. The salt content matters for design because chlorides accelerate corrosion of reinforcement and embedded steel, which is one more reason the concrete mix, cover, and waterproofing are specified for a marine-adjacent exposure.",
      },
      {
        question: "What is blindside waterproofing?",
        answer: "Blindside waterproofing is applied to the shoring or lagging before the structural concrete wall is cast against it, so the membrane ends up bonded to the outside face of the wall with no access needed after construction. It is the standard approach on tight urban sites where the excavation support stays in place and the wall face can never be reached from outside.",
      },
      {
        question: "Why do basement slabs need to resist uplift?",
        answer: "Groundwater below a slab exerts upward hydrostatic pressure equal to the weight of the water the structure displaces. In a high water table like Waikiki's, that uplift can exceed the weight of the building during construction or in a lightly loaded garage level. The slab is designed for that upward load, with tension piles or anchors where the building's own weight is not enough to hold it down.",
      },
      {
        question: "What happens if the sump pumps fail?",
        answer: "Under-slab drainage and sump pumps are the backup system behind the primary membrane waterproofing, so a pump failure during a high water event can flood the lowest level. Designs typically include redundant pumps, high-water alarms, and emergency power. The maintenance plan for the pumps is a permanent building operations item, not a construction-phase concern.",
      },
    ],
    extraLinks: [
      { label: "How is construction dewatering engineered?", href: "/answers/dewatering-design/" },
      { label: "How does basement waterproofing and drainage work?", href: "/answers/basement-waterproofing-drainage-design/" },
      { label: "What is below-grade waterproofing?", href: "/answers/below-grade-waterproofing-design/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "maui-trade-wind-corrosion-structural-design",
    title: "How Does Maui's Trade-Wind Salt Air Shape Structural Design?",
    description: "Maui's trade winds carry marine salt far inland, so structures need corrosion-resistant connectors, treated wood, and durable concrete for the load path.",
    h1: "How Does Maui's Trade-Wind Salt Air Shape Structural Design?",
    answer: "Maui's weather is famously pleasant and quietly destructive to buildings. Direct answer: the persistent northeast trade winds carry marine aerosol far inland across Maui, so structural design treats corrosion as a primary load-path problem, specifying hot-dip galvanized or stainless steel connectors, preservative-treated wood with termite protection, and low-permeability concrete with adequate cover, so that the hurricane clips, holdowns, and anchors forming the continuous load path keep their strength for the life of the building.\n\nCorrosion attacks the connections first, and the connections are what hold a building together in wind and earthquakes. Hurricane clips, joist hangers, holdowns, anchor bolts, and nails all present large steel surface areas to salt-laden air, and once section loss starts, the rated capacity of the connector drops. A clip that was designed for a code-level wind uplift is no longer that clip after years of rust. The design response is material selection matched to exposure: hot-dip galvanized connectors as the baseline, stainless steel in the most severe exposures near the shoreline, and details that keep water from ponding on steel, because standing water and trapped moisture accelerate corrosion even in galvanized hardware.\n\nWood framing gets parallel protection. Hawai'i's state building code amendments require preservative-treated structural lumber above ground and Formosan subterranean termite protection where wood framing bears on concrete, either through soil treatment by a licensed pest control operator, stainless steel termite barriers, or other measures the building official approves. The warm, humid climate feeds both decay fungi and the Formosan subterranean termite, so the treatment and barrier details are structural durability items, not cosmetic ones.\n\nConcrete and masonry need their own defense. Marine aerosol deposits chlorides on every exposed surface, and windward Maui, from Hana around to the north shore, sees heavier salt loading than the leeward Kihei and Lahaina coasts. The concrete specification responds with low water-cement ratio mixes, supplementary cementitious materials that densify the concrete, adequate curing, and cover depths that keep chlorides away from the reinforcement for the design life. Epoxy-coated or stainless reinforcement is used where exposure is severe. Crack control matters because every crack is a fast path for chlorides to reach the steel.\n\nMaui County is the AHJ for the island, with its own building department and review process separate from Honolulu's DPP. The structural engineer confirms the county's current amendments and submittal requirements, because the corrosion detailing that protects the load path must be shown on the drawings and in the specifications, not left to field improvisation. The AHJ decides what is approved.",
    directAnswer: "Maui's trade winds drive marine salt deep inland, so structural design specifies corrosion-resistant connectors, preservative-treated and termite-protected wood, and low-permeability concrete with proper cover. The continuous load path of hurricane clips, holdowns, and anchors must keep its rated strength for the building's life, which only happens when corrosion is designed out from the start.",
    topic: "Hawaii Pacific Island Engineering",
    serviceHref: "/services/structural/",
    sections: [
      {
        heading: "Protecting the Continuous Load Path",
        body: "The continuous load path is the chain of connectors tying the roof to the walls, the walls to the floors, and the floors to the foundation, and every link is a corrosion target. The engineer specifies the connector material and coating for the exposure zone: hot-dip galvanized for typical island exposure, heavier galvanizing or stainless steel within the salt-spray zone near the shoreline, and stainless fasteners wherever dissimilar metals could set up galvanic corrosion. The plans call out the coating and material explicitly so substitutions cannot quietly downgrade the protection.\n\nDetailing keeps water away from steel. Connectors are detailed with drainage and drying in mind: no pockets that hold water against the metal, flashing that sheds water away from the connection, and separation between treated wood and bare steel where the treatment chemicals would attack the coating. In the most exposed locations, the design may enclose connections or use stainless throughout, because a connector that cannot be inspected cannot be maintained, and an unmaintainable connector must be specified to survive without maintenance.",
      },
      {
        heading: "Wood, Termites, and Concrete Durability",
        body: "Wood durability in Maui is a two-front war against decay and Formosan subterranean termites. The state amendments require preservative-treated structural lumber above ground and ground-contact treatment levels for wood in direct soil contact, plus termite protection at the wood-to-concrete interface through licensed soil treatment or physical barriers like stainless steel mesh. These requirements are enforced at plan check and inspection, and the specifications name the treatment and barrier products rather than leaving the choice to the field.\n\nConcrete durability is built into the mix and the cover. Lower water-cement ratios and pozzolanic additions slow chloride penetration, proper curing develops the surface that resists it, and specified cover depths put enough concrete between the salt air and the steel. Where the structure sits in the splash or spray zone, epoxy-coated or stainless reinforcement adds a further barrier. The engineer treats durability as a design calculation with an exposure class, a mix, and a cover, the same way gravity loads get a calculation, a member size, and a detail.",
      },
    ],
    faqs: [
      {
        question: "Why is corrosion worse on Maui than in many coastal mainland cities?",
        answer: "The northeast trade winds blow across Maui most of the year, carrying marine aerosol from the surrounding ocean deep inland rather than just along the beach. Combined with year-round warmth and humidity, that gives steel and wood almost no dry season to recover. Windward exposures facing the trades see the heaviest salt loading, while leeward areas are somewhat sheltered but still corrosive.",
      },
      {
        question: "What is the continuous load path?",
        answer: "The continuous load path is the unbroken chain of structural connections from the roof covering down through the framing, walls, and floors to the foundation. Hurricane clips tie roof to wall, straps and holdowns tie wall to floor and foundation, and anchor bolts tie the sill to the concrete. If any link is missing or corroded, wind uplift can separate the building at that point.",
      },
      {
        question: "Should hurricane clips be stainless steel in Hawai'i?",
        answer: "Hot-dip galvanized connectors are the standard baseline for Hawai'i construction and perform well in typical exposures. Stainless steel is specified in the most severe exposures, such as direct shoreline salt spray, or where a connection cannot be inspected or maintained. The structural engineer selects the material for the project's actual exposure zone rather than applying one answer everywhere.",
      },
      {
        question: "What termite protection does Hawai'i require?",
        answer: "The state building code amendments require Formosan subterranean termite protection where wood-frame buildings bear on concrete slabs or foundations, through soil treatment by a Hawai'i licensed pest control operator, stainless steel termite barriers, or other measures approved by the building official. Structural lumber above ground must be preservative-treated, with heavier treatment for ground contact.",
      },
      {
        question: "Does corrosion protection differ between Maui's microclimates?",
        answer: "The engineering approach is the same, but the exposure severity changes the specification. Windward areas like Hana and the north shore face stronger salt loading from the trades, while leeward Kihei and West Maui are drier but still marine. Sites within the direct shoreline spray zone get the most conservative material selections regardless of which side of the island they are on.",
      },
    ],
    extraLinks: [
      { label: "How is steel protected from corrosion?", href: "/answers/corrosion-protection-steel-design/" },
      { label: "How are existing buildings retrofitted for hurricanes?", href: "/answers/hurricane-retrofit-existing-buildings/" },
      { label: "How is roof wind uplift resisted?", href: "/answers/wind-uplift-roof-design/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "hilo-volcanic-ash-soil-foundation",
    title: "How Are Hilo Foundations Designed for Volcanic Ash Soils?",
    description: "Hilo's volcanic ash soils are light and weak when saturated, so foundations use over-excavation with engineered fill or piers socketed into basalt below.",
    h1: "How Are Hilo Foundations Designed for Volcanic Ash Soils?",
    answer: "Hilo's soil looks like ordinary earth and behaves like a sponge. Direct answer: foundations in Hilo are designed for volcanic ash soils that are light, highly water-retentive, and weak when saturated, so the geotechnical investigation determines the ash depth, bearing capacity, and settlement behavior, and the structural design either over-excavates the ash and replaces it with engineered fill or carries the building on drilled piers socketed into the basalt lava flows beneath. Drainage is part of the foundation design, because keeping water out of the ash is what keeps its strength up.\n\nVolcanic ash soils, classified as andisols, form from weathered ash deposits and are common across the windward side of the Big Island. They have very low bulk density, hold large amounts of water, and lose strength dramatically as they saturate. Hilo is one of the wettest cities in the United States, so saturation is the normal condition, not the exception. An ash layer that tests adequately in a dry boring can be far weaker after a week of Hilo rain, which is why the investigation evaluates the soil at its wettest expected condition and why the design never relies on the ash staying dry.\n\nBeneath the ash lie the basalt lava flows, pahoehoe and a'a, that form the island's skeleton. The depth to competent basalt varies: in some areas the ash is a thin mantle over shallow rock, in others it fills deep depressions between flows. The basalt surface itself is irregular, with the tops of flows often weathered and weak before the massive rock below. Borings must reach through the ash and into competent basalt to establish a reliable bearing stratum, and the report distinguishes weathered flow tops from the sound rock that can actually carry a foundation.\n\nThe two standard foundation strategies follow from those findings. Where the ash is shallow, the design removes it entirely beneath the building footprint and replaces it with compacted engineered fill, with the excavation bottom proof-rolled and the fill placed and tested in lifts. Where the ash is deep, drilled piers or micropiles extend through it to bear in the basalt, and the design accounts for the ash providing little or no lateral support to the upper shaft. Mat or stiffened slabs can work for light structures on replaced ground, but they are sized for the settlement the geotechnical engineer predicts, not for an assumed zero.\n\nSurface and subsurface water get engineered alongside the foundation. Roof runoff, site grading, and subdrains keep water from ponding against the building and infiltrating the ash, because a saturated ash layer under a footing is a settlement problem waiting for the next storm. The County of Hawai'i Department of Public Works, Building Division, is the AHJ for Hilo, with its own submittal requirements and review process separate from Honolulu. The AHJ decides what is approved, and the geotechnical report is the document the structural design stands on.",
    directAnswer: "Hilo foundations handle volcanic ash soils by either over-excavating the weak ash and replacing it with engineered fill or drilling piers through it into basalt lava flows below. The geotechnical report sets bearing values for saturated conditions, and drainage is engineered as part of the foundation because wet ash loses strength.",
    topic: "Hawaii Pacific Island Engineering",
    serviceHref: "/services/structural/",
    sections: [
      {
        heading: "Why Volcanic Ash Is a Difficult Bearing Soil",
        body: "Volcanic ash soils challenge every assumption that works on mainland clays and sands. Their low bulk density means they compress significantly under load, their high water content means they are often near saturation before construction starts, and their structure can collapse when wetted under load, producing sudden settlement rather than gradual consolidation. Organic-rich topsoil layers common in Hilo add compressibility and decomposition settlement on top of the ash behavior.\n\nThe investigation is designed around these traits. Borings log the ash thickness, test its strength and compressibility at field moisture and saturated conditions, and identify any buried organic layers or soft zones. The report gives the structural engineer bearing values tied to specific conditions, such as the ash removed to a stated depth or piers bearing in basalt, rather than a single number for the site. Designing from a shallow test pit or a neighbor's old report is how ash-soil foundations fail, because the ash depth and the basalt surface change over short distances.",
      },
      {
        heading: "Over-Excavation Versus Deep Foundations",
        body: "Over-excavation and replacement suits light to moderate buildings where the ash is shallow enough to remove economically. The excavation extends through the ash and any organic material to a firm stratum, the subgrade is proof-rolled to find soft spots, and engineered fill is placed in controlled lifts with density testing. The result is a uniform bearing pad with predictable settlement, and the foundation can be conventional spread footings or a stiffened slab on the improved ground.\n\nDeep foundations take over where the ash runs deep or the loads are heavy. Drilled shafts or micropiles pass through the ash with temporary casing to keep the hole open in the weak, wet soil, then socket into competent basalt. The design conservatively ignores lateral support from the ash in the upper shaft and checks the pier for the full unsupported length plus any downdrag if surrounding fill settles. Either strategy is paired with site drainage that keeps surface water off the foundation soils permanently, because the design's bearing assumptions depend on the water management working for the life of the building.",
      },
    ],
    faqs: [
      {
        question: "What are volcanic ash soils?",
        answer: "Volcanic ash soils, known as andisols, form from the weathering of volcanic ash deposits. They are very light, hold large amounts of water, and are common on the windward sides of the Hawaiian Islands, including around Hilo. Their engineering problem is that they are weak and compressible, especially when saturated, which in Hilo's climate is most of the time.",
      },
      {
        question: "Can you build a slab-on-grade on volcanic ash?",
        answer: "Only after the ash problem is solved. A slab placed directly on untreated ash will settle unevenly as the soil compresses and saturates. The standard approaches are to over-excavate the ash and replace it with engineered fill, then build a stiffened slab on the improved ground, or to support the slab on deep foundations bearing in basalt. The geotechnical report determines which approach fits the site.",
      },
      {
        question: "How deep is the basalt under Hilo's ash?",
        answer: "It varies widely, from a thin ash mantle over shallow lava flows to deep ash-filled depressions between flows. There is no reliable typical depth, which is why borings must extend through the ash and into competent basalt on every project. The weathered tops of lava flows are also weak, so the investigation distinguishes weathered rock from the sound basalt that can carry foundation loads.",
      },
      {
        question: "Why does drainage matter so much for ash-soil foundations?",
        answer: "Because the ash's strength depends on its water content. Roof runoff, poor grading, or a broken drain that saturates the foundation soils can reduce bearing capacity and trigger settlement in a foundation that performed fine when drier. The civil design keeps water away from the building with grading, gutters, and subdrains, and that water management is a permanent part of the foundation system.",
      },
      {
        question: "Who permits a Hilo foundation project?",
        answer: "The County of Hawai'i Department of Public Works, Building Division, is the authority having jurisdiction for Hilo and the rest of the Big Island. It enforces the state building code as adopted and amended by the county, with its own submittal requirements and review timelines. The AHJ decides what is approved.",
      },
    ],
    extraLinks: [
      { label: "What is a geotechnical report?", href: "/answers/geotechnical-report-explained/" },
      { label: "How are deep foundations designed?", href: "/answers/deep-foundation-design/" },
      { label: "How are erosion and sediment control plans prepared?", href: "/answers/erosion-sediment-control-plans/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "kauai-hurricane-wind-design",
    title: "What Did Hurricane Iniki Teach Kaua'i About Wind Design?",
    description: "Hurricane Iniki proved roof-to-wall connections fail first on Kaua'i, driving Hawai'i's requirement for a complete continuous load path with hurricane clips.",
    h1: "What Did Hurricane Iniki Teach Kaua'i About Wind Design?",
    answer: "Hurricane Iniki rewrote how Hawai'i builds. Direct answer: when Iniki struck Kaua'i in September 1992 as a Category 4 hurricane with sustained winds around 140 mph and gusts to 175 mph, post-storm investigations found that incomplete load transfer, especially missing or inadequate roof-to-wall connections, was the leading cause of structural failure, and Hawai'i responded by requiring a complete continuous load path with hurricane clips and uplift connectors in new construction. Today's designs follow the state building code and ASCE 7 wind provisions, with wind topographic factor maps adjusting for ridges and valleys, and the AHJ in each county enforces the requirements at plan check and inspection.\n\nThe damage pattern was unmistakable. Entire roofs lifted off walls in one piece, walls separated from floors, and buildings that looked intact from the street had lost their structural connections. A federal assessment of building performance on Kaua'i concluded that improper connections between roof and walls were the most important factor in wind-uplift failures, and that breached windows and doors let internal pressure build until the building failed progressively from the inside. Many of the destroyed homes were single-wall construction, the light, economical framing style that dominated Hawai'i housing for decades, with no engineered connection between its parts.\n\nThe code response came in stages. After Hurricane Iwa in 1982, new homes were required to secure roofs to walls. After Iniki, the requirements grew into a full continuous load path: hurricane clips tying roof to wall, straps tying upper stories to lower stories, and connectors tying the first floor to the foundation, so wind uplift has an unbroken steel path from the roof covering to the ground. Kaua'i adopted these requirements in its post-Iniki building code, and they are now embedded in the statewide code framework that each county adopts and amends.\n\nCurrent design starts with the wind speed the code assigns. Structural engineers in Hawai'i design for 3-second gusts of 130 mph, the peak gust equivalent of a Category 3 hurricane, and the state's wind topographic factor maps increase the design pressures for buildings on ridges, escarpments, and in valleys where the terrain accelerates the wind. The structural calculations trace the uplift from the roof through every connector to the foundation, and each connector is specified with a rated capacity that meets or exceeds the demand at that location. Opening protection for windows and doors, and garage doors rated for the design pressure, keep the building envelope intact so internal pressures never develop.\n\nThe older housing stock remains the vulnerability. A large share of Hawai'i's single-family homes were built before the continuous load path was required, and studies have found that most lack meaningful hurricane protections. Retrofit programs add hurricane clips, strap the roof to the walls, strengthen gable ends, and protect openings, which can substantially reduce damage in tropical storms and lower-category hurricanes. Kaua'i County's planning and building departments are the AHJ for the island, and the AHJ decides what is approved for both new construction and retrofit permits.",
    directAnswer: "Hurricane Iniki showed that missing roof-to-wall connections, not weak materials, destroyed Kaua'i homes, so Hawai'i now requires a complete continuous load path of hurricane clips, straps, and anchors in new construction. Engineers design for 130 mph 3-second gusts with topographic adjustments, and older single-wall homes remain the highest-risk stock for retrofit.",
    topic: "Hawaii Pacific Island Engineering",
    serviceHref: "/services/structural/",
    sections: [
      {
        heading: "The Continuous Load Path, Connection by Connection",
        body: "The continuous load path is designed as a chain with no weak link. At the roof, hurricane clips or straps connect each rafter or truss to the wall top plate with a rated uplift capacity. The wall top plate is strapped to the studs, the studs to the floor framing or sill below, and the sill is anchored to the foundation with anchor bolts sized for both uplift and shear. Holdowns at shear wall ends resist the overturning that tries to lift one end of the wall while pushing the other down.\n\nEvery connector in that chain is selected from the calculated uplift at its location, not from a generic schedule. Gable ends get bracing against the inward and outward pressures that peel them off, roof sheathing gets the nailing pattern the wind design requires, and the foundation connection closes the path into concrete. The drawings detail each connection and the specifications name the connector models, because a load path drawn generically is a load path built incorrectly.",
      },
      {
        heading: "Topography, Openings, and the Older Housing Stock",
        body: "Wind does not hit every Kaua'i lot equally. Ridges and hilltops accelerate wind, valleys can funnel it, and the state's wind topographic factor maps tell the engineer where the design pressures increase above the base wind speed. A home on a ridge above Hanalei or along an exposed coastal bluff is designed for higher pressures than an identical home in a sheltered valley floor, and the topographic factor is applied before any connector is sized.\n\nThe building envelope is the second half of wind design. Windows, doors, and garage doors must resist the design pressures and the debris the wind carries, because a breached opening pressurizes the interior and doubles the uplift on the roof. Impact-rated glazing or shutters protect the openings, and garage doors get pressure-rated models with reinforced tracks. For the pre-code housing stock, often single-wall construction with no uplift connectors at all, retrofit work adds clips, straps, and opening protection that meaningfully improve survival odds, even though a full retrofit cannot make an old home equal to a new code-designed one.",
      },
    ],
    faqs: [
      {
        question: "How strong was Hurricane Iniki?",
        answer: "Iniki made landfall on Kaua'i in September 1992 as a Category 4 hurricane with sustained winds around 140 mph and gusts as high as 175 mph. It was the only Category 4 hurricane to make landfall in Hawai'i in the modern record, and it damaged or destroyed a large share of the island's homes, which is why it remains the reference event for the state's wind design requirements.",
      },
      {
        question: "What is a continuous load path?",
        answer: "The continuous load path is the unbroken chain of rated connectors from the roof to the foundation: hurricane clips from rafters to walls, straps from walls to floors, and anchors from sills to concrete. Wind uplift travels down this chain into the ground. Before Iniki, most Hawai'i homes lacked this chain, so roofs separated from walls as complete units.",
      },
      {
        question: "What wind speed do Hawai'i engineers design for?",
        answer: "Structural engineers design Hawai'i buildings for 3-second wind gusts of 130 mph, which corresponds to the peak gusts within a Category 3 hurricane's sustained winds. The design also applies topographic factors that raise the pressures for buildings on ridges, escarpments, and in valleys. The AHJ enforces these requirements through the county building code.",
      },
      {
        question: "Can an older Kaua'i home be retrofitted for hurricanes?",
        answer: "Yes, and retrofit meaningfully reduces damage. The standard retrofit adds hurricane clips tying the roof to the walls, straps connecting stories and the structure to the foundation, gable-end bracing, and opening protection for windows and garage doors. Single-wall homes are harder to strengthen than modern double-wall framing, but the retrofit still improves their odds in tropical storms and lower-category hurricanes.",
      },
      {
        question: "Why did so many roofs come off in one piece during Iniki?",
        answer: "Because the roof structure itself was often adequately nailed together, but it was barely connected to the walls below. Wind uplift acted on the whole roof as a unit, and with no clips or straps holding it down, the entire assembly lifted off intact. The lesson was that connection design matters more than member strength in wind events, which is exactly what the continuous load path requirements address.",
      },
    ],
    extraLinks: [
      { label: "How is roof wind uplift resisted?", href: "/answers/wind-uplift-roof-design/" },
      { label: "How are existing buildings retrofitted for hurricanes?", href: "/answers/hurricane-retrofit-existing-buildings/" },
      { label: "How are hurricane safe rooms designed?", href: "/answers/hurricane-safe-room-design/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "kona-lava-tube-subsurface-investigation",
    title: "How Are Lava Tubes Investigated Before Building in Kona?",
    description: "Kona's young lava flows can hide lava tube voids, so engineers probe with borings, ground-penetrating radar, and resistivity before designing foundations.",
    h1: "How Are Lava Tubes Investigated Before Building in Kona?",
    answer: "In Kona, the ground can be hollow. Direct answer: because the young pahoehoe lava flows of the Kona and Kohala coasts can contain lava tube voids that collapse under building loads, engineers investigate with a combination of closely spaced borings, ground-penetrating radar, and electrical resistivity surveys to find the voids before design, then either grout them, bridge them with deep foundations, or relocate the structure. The geotechnical report documents the investigation and the mitigation, and the County of Hawai'i reviews it as part of the building permit.\n\nLava tubes form when the outer crust of a flowing lava stream solidifies while molten lava keeps moving inside, eventually draining out and leaving a tunnel. In young flows, these tubes can run for hundreds of feet, with roofs thin enough that a foundation load or a heavy vehicle can break through. The surface gives little warning: the ground above a tube looks like the same pahoehoe everywhere else. Collapses have opened under roads, lots, and structures, which is why building on young flows without a void investigation is a gamble the code does not allow the engineer to take.\n\nThe investigation uses multiple methods because no single one sees everything. Borings on a tight grid probe for sudden drops of the drill string, loss of drilling fluid, or hollow-sounding rock that signal a void. Ground-penetrating radar scans between borings for the reflections that voids produce, working best in the shallow, resistive basalt of young flows. Electrical resistivity surveys map larger areas and can trace tube alignments across a site. Test pits and trenching expose the near-surface rock where grading will occur. The geotechnical engineer correlates all of it into a void map with the engineer's assessment of which features threaten the proposed building.\n\nMitigation follows the void map. Small, shallow voids can be excavated and backfilled with compacted material or flowable fill during grading. Larger tubes are grouted, with cement or cellular concrete grout pumped in to fill the void completely, and the grouting is verified by volume records and follow-up probing. Where a major tube runs beneath the building footprint, deep foundations such as micropiles can be extended through the tube roof into competent rock below, or the structure can be sited to avoid the feature entirely. The structural engineer designs the foundation for the mitigated condition and details for the possibility that an unmapped void exists, because no investigation finds everything.\n\nThe County of Hawai'i Department of Public Works, Building Division, is the AHJ for Kona, and its reviewers expect the geotechnical report to address voids explicitly on young-flow sites. Grading, foundation, and structural plans must reflect the investigation's findings consistently. The AHJ decides what is approved, and the investigation scope is set before design begins, not after the foundation is drawn.",
    directAnswer: "Kona lava tubes are found with tight boring grids, ground-penetrating radar, and electrical resistivity surveys correlated into a void map. Voids are grouted, bridged with micropiles into rock below, or avoided by relocating the structure, and the County of Hawai'i reviews the geotechnical mitigation with the building permit.",
    topic: "Hawaii Pacific Island Engineering",
    serviceHref: "/services/structural/",
    sections: [
      {
        heading: "The Investigation Toolkit: Borings, GPR, and Resistivity",
        body: "Borings remain the ground truth of a void investigation. Drillers log every anomaly: the sudden free-fall of the drill string through an open void, partial drops through rubble-filled tubes, circulation loss where drilling fluid escapes into fractures, and the hollow ring of thin tube roofs. Because a single boring can miss a tube entirely, the grid is tightened over the building footprint, and angled or offset borings chase suspected alignments between holes.\n\nGeophysics extends the borings' reach. Ground-penetrating radar sends electromagnetic pulses into the ground and reads the reflections from voids and layer boundaries, producing profiles that the geophysicist interprets alongside the boring logs. Electrical resistivity surveys inject current through surface electrodes and map the subsurface resistivity, with air-filled voids showing as high-resistivity anomalies against the basalt. Neither method is definitive alone, and both need calibration against borings, but together they let the engineer map tube alignments across the site and target the follow-up drilling where it matters.",
      },
      {
        heading: "Grouting, Bridging, or Moving the Building",
        body: "Grouting is the workhorse mitigation for tubes that cannot be excavated. Holes are drilled into the void on a pattern, and cement or cellular concrete grout is pumped in under controlled pressure until the tube is filled, with the grout take recorded for every hole as verification. Cellular concrete is often preferred for large voids because it fills completely at low density without overloading the tube floor. After grouting, probe holes confirm the fill, and any remaining open sections get a second round.\n\nBridging suits major tubes that grouting cannot practically fill. Micropiles or drilled shafts are cased through the tube roof and the void itself, then socketed into competent basalt below, so the building load bypasses the hollow ground entirely. The piles are designed for the full unsupported length through the void plus the soil above it. When the void map shows a tube system too extensive to grout or bridge economically, the honest engineering answer is to move the building, and the site plan is revised before the structural design is finalized rather than after.",
      },
    ],
    faqs: [
      {
        question: "What is a lava tube?",
        answer: "A lava tube is a tunnel left behind when the outer crust of a lava flow solidifies while molten lava continues flowing inside, then drains out. They are common in young pahoehoe flows like those along the Kona coast. Tubes can be a few feet to tens of feet across and run for long distances, with roofs that may be thin enough to collapse under building or vehicle loads.",
      },
      {
        question: "How do engineers find lava tubes before construction?",
        answer: "With a combined investigation: closely spaced borings that probe for voids directly, ground-penetrating radar that images shallow anomalies between borings, and electrical resistivity surveys that map larger areas for tube alignments. The geotechnical engineer correlates all three methods into a void map. No single method is reliable alone, so the investigation is designed as a system.",
      },
      {
        question: "Can a building be constructed over a lava tube?",
        answer: "Sometimes, with engineered mitigation. Small voids can be excavated and backfilled or grouted solid. Larger tubes can be bridged with micropiles or drilled shafts that carry the building load through the void into competent rock below. The geotechnical and structural engineers design the mitigation for the specific void, and the county reviews it with the permit.",
      },
      {
        question: "What is grouting for lava tube mitigation?",
        answer: "Grouting fills the void with cement or cellular concrete grout pumped through drilled holes, turning the hollow tube into solid ground. The grout volume placed in each hole is recorded as verification, and follow-up probing confirms the fill. Cellular concrete is often used for large voids because it fills completely without adding excessive weight to the surrounding rock.",
      },
      {
        question: "Does every Kona site need a lava tube investigation?",
        answer: "The need depends on the age and type of the lava flow beneath the site. Young pahoehoe flows carry the highest tube risk, while older, deeply weathered flows are less likely to hold open voids. The geotechnical engineer assesses the mapped geology first and scopes the investigation accordingly, but on young-flow sites the AHJ expects voids to be addressed explicitly in the report.",
      },
    ],
    extraLinks: [
      { label: "How does ground-penetrating radar guide concrete work?", href: "/answers/concrete-scanning-gpr-guide/" },
      { label: "What is a geotechnical report?", href: "/answers/geotechnical-report-explained/" },
      { label: "How are deep foundations designed?", href: "/answers/deep-foundation-design/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "oahu-tsunami-vertical-evacuation-design",
    title: "How Are Tsunami Vertical Evacuation Structures Designed on O'ahu?",
    description: "Tsunami vertical evacuation structures on O'ahu follow FEMA P-646 and ASCE 7, with refuge floors above inundation and frames sized for wave and debris forces.",
    h1: "How Are Tsunami Vertical Evacuation Structures Designed on O'ahu?",
    answer: "When the ground cannot be reached in time, the building itself must become the high ground. Direct answer: tsunami vertical evacuation structures on O'ahu are designed under FEMA P-646, the Guidelines for Design of Structures for Vertical Evacuation from Tsunamis, together with the tsunami loads and effects provisions of ASCE 7, which require the refuge floors to sit above the maximum considered inundation elevation and the structure to resist hydrostatic, hydrodynamic, impulsive, debris impact, debris damming, buoyant, and uplift forces. The design uses tsunami-specific load combinations with the refuge loaded at assembly occupancy, and the structure is detailed so the loss of any single element does not bring it down.\n\nThe design starts with the water. The maximum considered tsunami, a 2,475-year return period event, sets the inundation depth and flow velocity at the site, and the runup elevation used in force calculations is increased to account for variability. From those flow parameters the engineer calculates each load effect: hydrostatic pressure from standing water, buoyant uplift on the submerged volume, hydrodynamic drag from flowing water, an impulsive force at the leading edge of the bore taken as a multiple of the hydrodynamic force, impact from waterborne debris such as vehicles and shipping containers, additional damming load where debris accumulates against the structure, and uplift on elevated floors. Scour around the foundations is evaluated because a tsunami that undermines the footings defeats everything above them.\n\nThe load combinations are unique to tsunami design. The governing combinations pair full tsunami load effects with dead load and the refuge area loaded at 100 pounds per square foot, the assembly live load representing evacuees packed at standing density, while other floors carry a reduced live load. A companion combination checks the case where gravity loads oppose the tsunami effects. Seismic loads are not combined with tsunami loads, since the design-level earthquake and the maximum tsunami are not assumed to strike simultaneously, though the structure must still meet the seismic code on its own.\n\nStructurally, these are robust reinforced concrete buildings by necessity. Ductile concrete frames or shear walls provide the lateral strength and the redundancy the guidelines demand, with progressive collapse considerations so that debris impact taking out one column does not trigger a disproportionate failure. The refuge area needs clear access: stairs sized for the evacuee population, routes that remain passable as water rises, and signage identifying the building as a vertical evacuation refuge. Breakaway walls may be used at lower levels so the water passes through without imposing full forces on the frame.\n\nOn O'ahu, tsunami evacuation planning is led by the state and county emergency management agencies, which map evacuation zones and identify vertical evacuation options where high ground is too far to reach on foot. A building designated for that role must meet the design criteria above and be evaluated as an existing or new structure accordingly. Permitting runs through Honolulu DPP as the AHJ for the island, and the AHJ decides what is approved.",
    directAnswer: "Tsunami vertical evacuation structures follow FEMA P-646 and ASCE 7 tsunami provisions: refuge floors above the maximum considered inundation elevation, reinforced concrete frames designed for hydrostatic, hydrodynamic, impulsive, debris, buoyancy, and uplift forces, and tsunami-specific load combinations with the refuge at assembly live load.",
    topic: "Hawaii Pacific Island Engineering",
    serviceHref: "/services/structural/",
    sections: [
      {
        heading: "Tsunami Loads: From Hydrostatic to Debris Impact",
        body: "Each tsunami load effect attacks the structure differently, so the engineer calculates them all. Hydrostatic forces push laterally on walls from the water depth, while buoyancy tries to lift the entire submerged portion. Hydrodynamic drag scales with the flow velocity squared, which is why fast, shallow flow can govern over deeper, slower water. The impulsive force at the bore's leading edge is taken as one and a half times the hydrodynamic force, capturing the slap of the arriving wave front.\n\nDebris is often the controlling demand. The guidelines require designing for impacts from waterborne debris, from floating lumber and vehicles up to shipping containers, with the impact force depending on the debris mass and the flow velocity. Debris damming adds a further surcharge where accumulated debris blocks flow against the structure and raises the effective pressure. Uplift on elevated floor slabs and the additional gravity load of water retained on those slabs complete the loading picture, and foundation scour is checked so the footings keep their bearing through the event.",
      },
      {
        heading: "Refuge Floors, Access, and Structural Robustness",
        body: "The refuge elevation is set above the maximum considered inundation with margin, because a refuge that floods is not a refuge. The refuge floor is sized for the expected evacuee population at assembly loading, with stairs and routes designed for the crowd and for access as water rises around the building. Signage, lighting, and emergency communication are part of the facility planning, coordinated with the emergency management agencies that designate the building.\n\nRobustness is engineered, not assumed. The guidelines call for structural systems with redundancy and for consideration of progressive collapse, so that severe debris damage to one column or wall segment does not cascade into total failure. Ductile detailing from the seismic design carries over directly, since the same ductility that survives an earthquake gives the structure reserve capacity against tsunami overloads. Existing buildings evaluated for vertical evacuation duty are checked against the same performance expectations, with retrofit designed where the evaluation finds shortfalls.",
      },
    ],
    faqs: [
      {
        question: "What is FEMA P-646?",
        answer: "FEMA P-646 is the Guidelines for Design of Structures for Vertical Evacuation from Tsunamis, the national reference for designing buildings that serve as tsunami refuges. It defines the tsunami load effects, the load combinations, and the structural robustness criteria. The tsunami provisions in ASCE 7 were developed alongside it and provide the code-level design requirements.",
      },
      {
        question: "What loads does a tsunami impose on a building?",
        answer: "Hydrostatic pressure from standing water, buoyant uplift, hydrodynamic drag from flowing water, an impulsive force at the wave front, impact from waterborne debris, added pressure from debris damming against the structure, uplift on elevated floors, and scour that can undermine foundations. The engineer calculates each effect from the site's inundation depth and flow velocity.",
      },
      {
        question: "How high must the refuge floor be?",
        answer: "Above the maximum considered tsunami inundation elevation, which corresponds to a 2,475-year return period event, with the runup elevation increased to account for variability. The refuge must stay dry and accessible through the entire event, so the elevation is set from site-specific tsunami modeling, not from a standard height.",
      },
      {
        question: "Are tsunami and earthquake loads combined in design?",
        answer: "No. The guidelines do not combine seismic loads with tsunami loads, because the design-level earthquake and the maximum considered tsunami are not assumed to occur simultaneously. The structure must still satisfy the seismic code independently, and the ductile detailing from seismic design contributes directly to the robustness the tsunami provisions require.",
      },
      {
        question: "Can an existing building become a vertical evacuation refuge?",
        answer: "It can be evaluated for the role, but the evaluation is demanding. The existing structure is checked against the tsunami load effects, the refuge elevation, access capacity, and robustness criteria, and retrofit is designed where it falls short. Many existing buildings cannot practically meet the debris impact and inundation requirements, which is why purpose-designed structures are often the realistic answer.",
      },
    ],
    extraLinks: [
      { label: "How do floodproofing techniques work?", href: "/answers/floodproofing-techniques-explained/" },
      { label: "How is a hurricane-resistant beach house designed?", href: "/answers/hurricane-resistant-beach-house-design/" },
      { label: "How are deep foundations designed?", href: "/answers/deep-foundation-design/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "honolulu-salt-air-concrete-durability",
    title: "How Is Concrete Made Durable in Honolulu's Salt Air?",
    description: "Honolulu concrete resists chloride corrosion with low-permeability mixes, adequate cover, proper curing, and corrosion-resistant steel in severe exposures.",
    h1: "How Is Concrete Made Durable in Honolulu's Salt Air?",
    answer: "In Honolulu, concrete does not fail from loading; it fails from salt reaching the steel inside it. Direct answer: durable concrete in Honolulu's salt air starts with a low-permeability mix using a low water-cement ratio and supplementary cementitious materials, continues with adequate concrete cover over the reinforcement and thorough curing, and adds corrosion-resistant reinforcement such as epoxy-coated or stainless steel in severe marine exposures. The design assigns an exposure class to each element, and the mix, cover, and reinforcement follow from that classification, with crack control and maintenance completing the system.\n\nThe corrosion mechanism is straightforward. Marine aerosol deposits chlorides on every concrete surface, and moisture carries those chlorides inward through the concrete's pore structure. When chlorides reach the reinforcing steel in sufficient concentration, they break down the steel's passive protective layer and corrosion begins. Corroding steel expands to several times its original volume, cracking and spalling the concrete cover, which lets in more chlorides in a self-accelerating cycle. In Honolulu's warm, humid climate the process runs faster than in cooler coastal cities, and trade-wind salt loading reaches well beyond the immediate shoreline.\n\nThe first defense is permeability. A low water-cement ratio produces denser concrete with fewer connected pores, and supplementary cementitious materials such as fly ash, slag, or silica fume further refine the pore structure and bind chlorides chemically. Proper curing is what develops that dense surface in the first place: concrete that dries out early never reaches its designed permeability, no matter what the mix ticket says. The specifications therefore treat curing as a durability requirement with inspection, not a suggestion.\n\nThe second defense is distance. Concrete cover, the thickness of concrete between the surface and the steel, is the physical barrier the chlorides must cross, and the code requires greater cover for elements in severe exposures. Beams, columns, and slabs near the ocean or in salt spray get more cover than identical members in a sheltered interior. Crack control works alongside cover, because every crack wider than a hairline is a direct channel for chlorides to bypass the concrete entirely, so the design limits crack widths through reinforcement detailing and, where needed, post-tensioning or shrinkage control.\n\nThe third defense is the steel itself. Epoxy-coated reinforcement adds a barrier between chlorides and the steel in severe exposures, and stainless steel reinforcement provides the highest durability where the exposure is extreme or the element cannot be maintained or replaced. Galvanized reinforcement is another option in the durability toolkit. The engineer selects the reinforcement type for the exposure the element will actually see over its service life, and the drawings identify it explicitly so it is not value-engineered away during construction. Honolulu DPP reviews the structural durability provisions as part of the building permit, and the AHJ decides what is approved.",
    directAnswer: "Honolulu concrete durability comes from low-permeability mixes with supplementary cementitious materials, adequate cover for the exposure, thorough curing, crack control, and epoxy-coated or stainless reinforcement in severe marine exposures. Chloride-driven rebar corrosion is the failure mode being designed against, and warm humid air accelerates it.",
    topic: "Hawaii Pacific Island Engineering",
    serviceHref: "/services/structural/",
    sections: [
      {
        heading: "Mix Design, Cover, and Curing",
        body: "The durability specification reads like a recipe with inspection steps. The mix sets a maximum water-cement ratio and includes supplementary cementitious materials that densify the concrete and chemically bind chlorides, slowing their movement toward the steel. Air entrainment and aggregate selection follow the exposure as well. The submittal review checks the proposed mix against the specified exposure class before a single yard is placed, because a mix designed for a mild interior exposure has no business in a seaside column.\n\nCover and curing turn the mix into durable concrete in the field. Specified cover depths are verified with chairs, spacers, and pre-pour inspection, since steel that shifts during the pour loses the protection the design assumed. Curing keeps the surface moist long enough for hydration to close the pore structure, through ponding, wet coverings, or curing compounds applied correctly. In Honolulu's sun and trade winds, concrete surfaces dry fast, so the curing plan is written for the actual climate, not for a temperate mainland jobsite.",
      },
      {
        heading: "Corrosion-Resistant Reinforcement and Maintenance",
        body: "Where the exposure is severe, the reinforcement itself gets upgraded. Epoxy-coated bars provide a dielectric barrier that keeps chlorides off the steel even if the concrete cracks, though the coating must be handled carefully to avoid holidays and damage during placement. Stainless steel reinforcement offers the highest corrosion resistance and is specified for elements with extreme exposure or where future repair would be prohibitively difficult, such as below-grade walls in the salt-laden water table. The engineer weighs the upfront cost against the cost of a repair that requires demolition, because durability economics favor spending during construction.\n\nMaintenance closes the loop the design starts. Sealers and coatings on exposed concrete slow chloride ingress and are reapplied on a schedule, drainage details keep water from ponding on decks and beams, and periodic condition surveys catch spalls and delamination while repairs are still small. A durability design without a maintenance plan assumes the building maintains itself, which no building in salt air does.",
      },
    ],
    faqs: [
      {
        question: "Why does rebar corrode inside concrete?",
        answer: "Concrete normally protects steel with a highly alkaline environment that forms a passive layer on the bar surface. Chlorides from salt air penetrate the concrete and break down that passive layer, and then corrosion starts. The rust expands, cracking and spalling the concrete, which admits more chlorides. Warm, humid, salt-laden air like Honolulu's accelerates every stage of the process.",
      },
      {
        question: "What is concrete cover and why does it matter?",
        answer: "Concrete cover is the thickness of concrete between the outer surface and the reinforcing steel. It is the physical distance chlorides must travel to reach the steel, so greater cover means a longer service life before corrosion initiates. The code requires more cover for severe exposures, and the cover shown on the drawings must actually be achieved in the field with proper bar supports and inspection.",
      },
      {
        question: "Do supplementary cementitious materials really help durability?",
        answer: "Yes. Materials like fly ash, slag, and silica fume refine the concrete's pore structure, making it less permeable, and they chemically bind some chlorides before they reach the steel. They are a standard part of durable marine concrete specifications. Their benefit depends on proper proportioning and curing, which is why the mix submittal and the curing plan are reviewed together.",
      },
      {
        question: "When is stainless steel rebar justified?",
        answer: "When the exposure is extreme, the element is critical, or future repair would be extremely disruptive or expensive. Examples include below-grade walls sitting in brackish groundwater, elements in direct salt spray that cannot be recoated, and structures with very long design lives. The engineer compares the premium for stainless steel against the lifecycle cost of repairs that would otherwise be inevitable.",
      },
      {
        question: "How does cracking affect concrete durability?",
        answer: "Cracks bypass the concrete's protective barrier entirely, giving chlorides a direct path to the steel. That is why durable design includes crack control through reinforcement detailing, shrinkage management, and sometimes post-tensioning. A well-detailed structure with tight, well-distributed cracks far outlasts one with a few wide cracks, even when both use the same mix.",
      },
    ],
    extraLinks: [
      { label: "How is steel protected from corrosion?", href: "/answers/corrosion-protection-steel-design/" },
      { label: "What are concrete mix design basics?", href: "/answers/concrete-mix-design-basics/" },
      { label: "What is the difference between dampproofing and waterproofing?", href: "/answers/dampproofing-vs-waterproofing/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "lahaina-maui-wildfire-rebuild-structural-standards",
    title: "What Structural Standards Guide the Lahaina Rebuild After the 2023 Fire?",
    description: "Lahaina rebuilds follow Hawai'i building code with ignition-resistant construction and wind load paths, plus recovery rules for nonconforming structures.",
    h1: "What Structural Standards Guide the Lahaina Rebuild After the 2023 Fire?",
    answer: "Rebuilding Lahaina means building to today's standards on lots shaped by yesterday's town. Direct answer: structures rebuilt after the August 2023 Lahaina fire are designed to the current Hawai'i State Building Code as adopted and amended by Maui County, with ignition-resistant construction for wildfire resilience, a complete continuous load path for wind, and foundations engineered for the site's actual soils, while Maui County's recovery ordinances create a dedicated path for legally nonconforming structures to be rebuilt to their former condition. The County's Office of Recovery coordinates the rebuild areas, and the AHJ decides what is approved.\n\nThe code baseline for new construction is the state building code suite, currently the 2018 IBC with Hawai'i amendments, as adopted into Maui County's building code. Every new home and commercial building is a new-code building: current seismic, wind, and structural provisions apply in full, regardless of what the previous structure on the lot looked like. That includes the continuous load path of hurricane clips, straps, and anchors that Hawai'i requires after the lessons of Hurricanes Iwa and Iniki, because wind did not stop being a hazard when fire became one.\n\nIgnition-resistant construction is the wildfire layer added on top of the structural code. The principles are well established from wildfire-prone regions: Class A fire-rated roof assemblies, ember-resistant attic and foundation vents that block wind-driven ember intrusion, tempered or dual-pane glazing that survives radiant heat, noncombustible or ignition-resistant siding and decking, and enclosed eaves that deny embers a place to lodge. Defensible space extends the protection beyond the walls, with the first several feet around the structure kept clear of combustible materials and vegetation managed outward from there. These measures address the ember ignition that destroys most homes in wildfires, which often arrive ahead of any flame front.\n\nMaui County created specific recovery rules for the rebuild. Ordinance 5780 allows legally nonconforming structures, those lawfully built before the fire but no longer meeting current development standards such as setbacks or height, to be reconstructed to their former condition without increasing the nonconformity, provided owners obtain permits, complete reconstruction, and pass final inspection by the April 2029 deadline, with possible extensions for historic district and Special Management Area properties. Separately, county legislation has addressed building heights in the Lahaina National Historic Landmark District so that destroyed structures are not trapped between pre-fire heights and current plan limits. Property owners document the prior legal condition with permits, tax records, or variances, and every rebuild still complies with the building and safety codes in effect.\n\nFoundations deserve special attention on fire-affected lots. Fire can alter near-surface soils, debris removal changes grades, and the geotechnical investigation for each rebuild confirms bearing conditions as they exist now, not as they were mapped decades ago. Concrete and masonry exposed to intense heat are assessed for residual strength before any decision to reuse them, since fire-damaged concrete loses capacity in ways that are not visible at the surface. The structural engineer designs the new foundation and framing from current site data, and the permit set goes through Maui County's review process like any new construction. The work is technical and forward-looking: a town rebuilt to modern structural and fire standards, lot by lot.",
    directAnswer: "Lahaina rebuilds follow the current Hawai'i State Building Code as adopted by Maui County, with ignition-resistant construction for wildfire resilience and a full continuous load path for wind. County recovery ordinances let legally nonconforming structures rebuild to their former condition by the 2029 deadline, and every foundation is re-engineered from current site conditions.",
    topic: "Hawaii Pacific Island Engineering",
    serviceHref: "/services/structural/",
    sections: [
      {
        heading: "Ignition-Resistant Construction Details",
        body: "The wildfire detailing starts at the roof and works down. Class A roof assemblies resist ember ignition and flame spread, with sealed edges and noncombustible gutters that cannot collect burning debris. Attic, eave, and foundation vents use ember-resistant designs with baffles or fine screening tested against ember intrusion, because post-fire investigations consistently find attic ignition through ordinary vents as a leading loss mechanism. Windows get tempered or dual-pane glazing that survives radiant heat without breaking open an ember path into the interior.\n\nWalls and projections complete the envelope. Noncombustible or ignition-resistant siding, decking, and fencing within the defensible space deny the fire fuel at the structure's face, and eaves are enclosed with noncombustible soffits to eliminate the open rafter tails where embers traditionally lodge and smolder. The first several feet around the building are kept clear of combustible mulch, firewood, and vegetation against the siding. These are drawn and specified as an assembly, because a single ordinary vent or wooden fence section can defeat an otherwise hardened house.",
      },
      {
        heading: "Nonconforming Structures and the Recovery Path",
        body: "Much of Lahaina was built before current zoning, so the recovery ordinances address the nonconformity problem directly. Under Ordinance 5780, owners of legally nonconforming structures within the disaster area can rebuild to the structure's former condition, including its former nonconforming setbacks or height, as long as the reconstruction does not increase the nonconformity and all work complies with current building and safety codes. Eligibility requires evidence of the prior legal condition, and the ordinance sets a firm timeline running to April 2029 for permit, reconstruction, and final inspection.\n\nThe structural design for these rebuilds is still fully current-code. A rebuilt-to-former-condition structure keeps its old footprint and massing but gets a new-code foundation, framing, connections, and envelope, engineered from a current geotechnical investigation and current structural calculations. The county's Office of Recovery coordinates waivers and directives for the rebuild areas, and the building department reviews each project through the normal permit process. The AHJ decides what is approved, and owners confirm the current ordinance requirements and deadlines before designing, because recovery rules evolve as the rebuild progresses.",
      },
    ],
    faqs: [
      {
        question: "Can a Lahaina home be rebuilt exactly as it was before the fire?",
        answer: "Maui County's recovery ordinances allow legally nonconforming structures to be reconstructed to their former condition, including former setbacks or heights that would not be permitted for new construction, as long as the nonconformity is not increased. The structure itself is still built to current building and safety codes. Owners must provide evidence of the prior legal condition and meet the ordinance deadlines.",
      },
      {
        question: "What is the deadline for rebuilding under the recovery ordinances?",
        answer: "Ordinance 5780 requires eligible owners to obtain the building permit, complete reconstruction, and secure final inspection approval by April 1, 2029. Properties in a historic district or Special Management Area may qualify for an extension with demonstrated good cause. Owners should confirm the current requirements with Maui County, since recovery directives can change.",
      },
      {
        question: "What makes construction ignition-resistant?",
        answer: "A system of ember-focused details: Class A fire-rated roofing, ember-resistant vents with baffles or fine screening, tempered or dual-pane windows, noncombustible or ignition-resistant siding and decking, enclosed eaves, and defensible space with the area nearest the structure kept clear of combustibles. Most homes in wildfires ignite from wind-driven embers, not from direct flame contact, so the design closes ember entry points.",
      },
      {
        question: "Do rebuilt Lahaina homes still need hurricane clips?",
        answer: "Yes. The rebuild is new construction under the current code, which requires the complete continuous load path of hurricane clips, straps, and foundation anchors that Hawai'i adopted after Hurricanes Iwa and Iniki. Wildfire hardening and wind design are complementary: the same house gets ember-resistant detailing and a fully connected structural frame.",
      },
      {
        question: "Can fire-damaged foundations be reused?",
        answer: "Only after engineering assessment. Concrete and masonry exposed to intense heat can lose strength in ways that are not visible, so the engineer evaluates residual capacity before any reuse decision. In practice, most rebuilds get new foundations designed from a current geotechnical investigation, since fire, debris removal, and regrading change the site conditions the old foundation was designed for.",
      },
    ],
    extraLinks: [
      { label: "How are homes hardened against wildfire?", href: "/answers/wildfire-home-hardening-engineering/" },
      { label: "How is wildfire defensible space engineered?", href: "/answers/wildfire-defensible-space-engineering/" },
      { label: "How does wildfire rebuild design work?", href: "/answers/wildfire-rebuild-design/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "hilo-heavy-rainfall-drainage-design",
    title: "How Is Drainage Designed for Hilo's Heavy Rainfall?",
    description: "Hilo's extreme rainfall demands drainage sized for tropical cloudbursts: roofs, grading, swales, detention, erosion control, and subsurface drains in ash soils.",
    h1: "How Is Drainage Designed for Hilo's Heavy Rainfall?",
    answer: "Hilo does not get rainstorms; it gets a climate. Direct answer: drainage in Hilo is designed for one of the highest rainfall regimes of any American city, with roof systems, site grading, swales, culverts, and detention sized for intense tropical rainfall, erosion and sediment controls protecting the island's streams and bays during construction, and subsurface drainage keeping water out of the weak volcanic ash soils beneath foundations. The civil engineer sizes the system from the county's design storm criteria, and the County of Hawai'i reviews the drainage plan with the building permit.\n\nThe rainfall numbers set the scale. Hilo's windward location catches the moisture the trade winds carry, producing annual rainfall measured in the hundreds of inches in the wettest upland areas and well over a hundred inches in town, with intense cloudburst events that drop inches in hours. A drainage system sized for mainland design storms would be overwhelmed in its first Hilo winter. Gutters, downspouts, swales, culverts, and detention are all sized for the local intensity-duration-frequency data the county's standards reference, and the design checks the system against the cloudburst events that actually cause flooding, not just the statistical design storm.\n\nRoof and site drainage work as one system. Roofs collect enormous volumes, so gutter and downspout sizing, overflow scuppers, and the grading that carries water away from the building are designed together. Sites are graded to shed water without creating concentrated flows that erode the volcanic ash soils, and swales and channels are lined or vegetated to survive the velocities Hilo's storms produce. Where the site cannot infiltrate or convey the runoff safely, detention or retention basins hold the peak flow and release it at a rate the downstream system can accept.\n\nErosion control is a parallel design, not an afterthought. Hilo's ash and residual soils erode readily under concentrated flow, and sediment washing into streams and Hilo Bay is both an environmental harm and a permit violation. Construction-phase erosion and sediment control plans sequence the grading, stabilize exposed soil quickly, and trap sediment before it leaves the site. Permanent stabilization with vegetation suited to the wet climate follows as soon as grading is complete.\n\nSubsurface drainage protects the foundations the surface system cannot see. In Hilo's saturated ash soils, footing drains, subdrains behind retaining walls, and under-slab drainage keep water from softening the bearing soils and from building hydrostatic pressure against buried walls. The geotechnical report sets the drainage requirements alongside the bearing values, because in ash soils the two are inseparable. Floodplain areas near Hilo's rivers and streams add flood elevation and floodproofing requirements from the applicable flood maps, which the design addresses before the building footprint is finalized. The AHJ decides what is approved.",
    directAnswer: "Hilo drainage is engineered for extreme tropical rainfall: roofs, gutters, grading, swales, and culverts sized for local cloudburst intensities, detention controlling peak flows, erosion and sediment plans protecting streams, and subsurface drains keeping water out of weak volcanic ash foundation soils.",
    topic: "Hawaii Pacific Island Engineering",
    serviceHref: "/services/civil/",
    sections: [
      {
        heading: "Sizing for Cloudbursts, Not Averages",
        body: "Designing for Hilo's average rainfall would miss the events that cause damage. The civil engineer sizes conveyance and detention for the intense short-duration storms the county's criteria describe, checking that gutters do not overtop, swales do not erode, culverts do not surcharge, and detention basins have the volume to shave the peak. Overflow paths are designed deliberately, so that when a storm exceeds the design event, the water goes somewhere harmless instead of through the building.\n\nThe site layout serves the drainage. Buildings are sited and graded so that natural drainage paths are preserved or replaced with engineered equivalents of equal capacity, and no new concentrated discharge is aimed at a neighbor or an erodible slope. Driveways, parking, and walkways are graded as part of the drainage system, with permeable or properly drained surfaces where the soils allow. The drainage report documents the calculations, the design storms, and the downstream capacity, and the county reviewer checks the math against the same standards the engineer used.",
      },
      {
        heading: "Erosion Control on Volcanic Soils",
        body: "Hilo's volcanic ash and residual soils detach easily under flowing water, so erosion control is designed for the soil that is actually there. During construction, the erosion and sediment control plan limits the area of exposed soil, phases the grading so stabilization follows closely behind earthwork, and installs sediment traps, silt fence, and stabilized construction entrances before the first grading begins. Exposed slopes get temporary cover immediately, because a single Hilo storm can remove an unprotected slope overnight.\n\nPermanent erosion control uses the wet climate as an asset. Fast-establishing vegetation suited to windward Hawai'i stabilizes slopes and swales quickly, and channels that will see regular high flows get turf reinforcement, riprap, or hard lining sized for the design velocity. Retaining walls include subdrains and weep systems so groundwater does not build pressure behind them, and the wall design accounts for the saturated soil pressures the geotechnical engineer reports. The erosion controls are inspected and maintained until the permanent vegetation is established, not just until the contractor leaves the site.",
      },
    ],
    faqs: [
      {
        question: "How much rain does Hilo get?",
        answer: "Hilo is one of the wettest cities in the United States, with annual rainfall in town well over a hundred inches and much higher totals in the uplands above the city. Intense cloudburst events can drop inches of rain in a few hours. Drainage design uses the county's local intensity data rather than mainland assumptions, because mainland design storms do not represent Hilo's climate.",
      },
      {
        question: "What is a detention basin and does a Hilo home need one?",
        answer: "A detention basin temporarily holds stormwater runoff and releases it slowly so the peak flow does not overwhelm downstream pipes, streams, or neighboring properties. Whether a specific project needs one depends on the site's runoff increase, the downstream capacity, and the county's requirements. The civil engineer evaluates this in the drainage study prepared for the permit.",
      },
      {
        question: "Why is erosion control such a big deal in Hilo?",
        answer: "Hilo's volcanic ash soils erode easily, its storms are intense, and its streams run directly to Hilo Bay. Sediment from an uncontrolled construction site damages stream habitat and nearshore waters, and it violates permit conditions. The erosion and sediment control plan is a required permit document, and its measures must be installed before grading starts and maintained until the site is permanently stabilized.",
      },
      {
        question: "How does drainage relate to foundation design in Hilo?",
        answer: "Directly. Hilo's volcanic ash soils lose strength when saturated, so the foundation design depends on the drainage design keeping water away from the bearing soils. Footing drains, subdrains, grading that sheds water, and roof systems that discharge away from the building are all part of protecting the foundation's bearing assumptions for the life of the structure.",
      },
      {
        question: "Who reviews drainage plans in Hilo?",
        answer: "The County of Hawai'i Department of Public Works reviews drainage, grading, and erosion control plans as part of the building permit process for Hilo and the Big Island. The design follows the county's drainage standards and design storm criteria. The AHJ decides what is approved.",
      },
    ],
    extraLinks: [
      { label: "What is a drainage study?", href: "/answers/drainage-study-explained/" },
      { label: "How are erosion and sediment control plans prepared?", href: "/answers/erosion-sediment-control-plans/" },
      { label: "How is retaining wall drainage designed?", href: "/answers/retaining-wall-drainage-design/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "kailua-oahu-coastal-erosion-setback-design",
    title: "How Do Coastal Erosion Setbacks Shape Kailua Home Design?",
    description: "Kailua's eroding shoreline pushes homes landward of Honolulu's setback line, with deep pile foundations and elevated floors designed for scour and wave runup.",
    h1: "How Do Coastal Erosion Setbacks Shape Kailua Home Design?",
    answer: "On Kailua's beaches, the property line moves. Direct answer: chronic coastal erosion along Kailua and Lanikai pushes new homes landward under the City and County of Honolulu's shoreline setback rules, which are measured from a certified shoreline surveyed within a year of the permit application, and the structural design responds with deep pile or pier foundations, elevated floor levels, and scour-resistant detailing that assume the beach will keep retreating. The setback determines where the house can sit, and the foundation determines whether it survives there.\n\nKailua's shoreline is one of O'ahu's most studied erosion hotspots. Long-term shoreline change analyses show chronic retreat along much of the Kailua and Lanikai littoral cell, driven by the natural sediment budget, seasonal wave shifts, and episodic storm erosion that can remove in days what took years to accumulate. A house designed for today's beach position without accounting for the erosion trend is designed for a shoreline that will not exist for the life of the structure. The engineering therefore starts with the erosion rate, not just the current survey.\n\nThe regulatory shoreline is a surveyed fact, not an estimate. Honolulu requires a certified shoreline prepared by a registered land surveyor and certified by the Board of Land and Natural Resources within one year of the application date, and the shoreline setback is measured from that line. The setback keeps structures out of the active beach zone and provides a buffer for future erosion, and it applies alongside Special Management Area review for coastal development. Because the certified shoreline moves with erosion, a lot that complied decades ago may not comply the same way today, which is why the survey must be current.\n\nWithin the buildable area, the foundation is designed for an eroding coast. Driven piles or drilled shafts extend through the beach sands to bear in the underlying reef limestone or dense strata, and the design accounts for scour, the removal of sand from around the piles during storms, by considering the piles unsupported over the scoured depth. Floor elevations are set above the design flood and wave runup elevations from the applicable flood maps, and the structure below the elevated floor is designed to let water pass through rather than to resist it as a wall. Enclosures below the lowest floor are limited to parking, storage, and access, built with flood-resistant materials and breakaway walls where the flood provisions require them.\n\nSeptic systems, grading, and drainage get the same coastal treatment. Setbacks from the shoreline apply to wastewater systems as well as structures, grading must not destabilize the dune or beach, and drainage is directed away from the shoreline to avoid concentrating flows that accelerate erosion. The permit set documents the certified shoreline, the setback compliance, the flood elevations, and the foundation design as one coastal package for Honolulu DPP review through HNL Build. The AHJ decides what is approved, and no design can promise a permit on an eroding shoreline, only a design that meets the rules as they stand.",
    directAnswer: "Kailua homes are sited landward of Honolulu's shoreline setback measured from a currently certified shoreline, then built on deep piles designed for scour with elevated floors above flood and wave runup elevations. Chronic erosion means the design plans for the future shoreline, not just today's beach.",
    topic: "Hawaii Pacific Island Engineering",
    serviceHref: "/services/structural/",
    sections: [
      {
        heading: "The Certified Shoreline and the Setback",
        body: "The certified shoreline is the legal starting line for coastal development, and it is re-established for each project. A registered land surveyor locates the shoreline under the state's criteria, the Board of Land and Natural Resources certifies it, and the certification must be within one year of the permit application, because an older survey may not reflect the current erosion. The site plan shows the certified shoreline, the regulatory setback line, and the waiver line where applicable, all tied to the survey.\n\nThe setback does more than keep the house off the sand. It preserves the beach's ability to migrate, protects the structure from the wave and erosion hazard, and maintains lateral public access along the shoreline. Within the setback, new structures are restricted, and even permitted work faces heightened review through the Special Management Area process. For lots where erosion has consumed most of the buildable depth, the honest feasibility answer may be a smaller footprint, relocation of the structure landward, or no new structure at all, and that answer belongs at the start of the project, not at plan check.",
      },
      {
        heading: "Pile Foundations and Elevated Floors for an Eroding Coast",
        body: "The foundation system assumes the sand leaves. Piles are driven or drilled through the beach deposits into competent bearing, and the structural design checks them for the full range of ground conditions from present grade down to the maximum expected scoured elevation, treating the pile as a longer, laterally loaded column in the worst case. Pile caps and grade beams are set high enough to stay out of the active erosion zone, and connections are detailed for the corrosive salt environment with the protection the exposure demands.\n\nThe elevated floor completes the strategy. Living space sits above the design flood elevation plus wave runup, with the area below kept open or limited to non-habitable uses built to flood standards. Breakaway walls, flood vents, and flood-resistant materials let water move through without destroying the structure, and utilities are elevated or protected so the house remains serviceable after the storm passes. The design coordinates the structural, civil, and architectural drawings around these elevations, because a single inconsistent floor height can fail the flood review.",
      },
    ],
    faqs: [
      {
        question: "What is a certified shoreline in Hawai'i?",
        answer: "The certified shoreline is the shoreline location surveyed by a registered land surveyor and certified by the Board of Land and Natural Resources, used as the baseline for shoreline setbacks. Honolulu requires the certification to be within one year of the permit application date. It is re-established for each project because erosion and accretion move the actual shoreline over time.",
      },
      {
        question: "Why is Kailua's beach eroding?",
        answer: "Kailua and Lanikai sit in a littoral cell with a long-term sediment deficit, meaning more sand leaves the system than arrives. Seasonal wave direction shifts move sand alongshore, and episodic storms can carve the beach dramatically in a single event. Long-term shoreline studies document chronic retreat along much of this coast, which is why setback and foundation design must plan for continued erosion.",
      },
      {
        question: "Can you build a seawall to protect a Kailua home?",
        answer: "Seawalls are heavily restricted in Hawai'i because they accelerate erosion on neighboring beaches and destroy the beach itself. The state's coastal policy favors setbacks, relocation, and beach-compatible design over hardening. Any shoreline protection structure faces stringent review and is rarely the answer for a residential lot; the engineering effort goes into siting and foundations instead.",
      },
      {
        question: "What is scour and why does it matter for pile design?",
        answer: "Scour is the removal of sand from around piles during storm waves and surge, which increases the unsupported length of each pile. A pile designed only for today's ground level can become a longer, weaker column after a storm strips the sand away. The engineer designs for the maximum expected scoured condition, checking axial capacity, lateral deflection, and buckling over the full exposed length.",
      },
      {
        question: "Do flood zones affect Kailua home design?",
        answer: "Yes. Coastal Kailua lots fall within mapped flood zones where the flood maps set design flood elevations and construction requirements. The lowest floor must be elevated above the design flood elevation, enclosures below are restricted to non-habitable uses with flood-resistant construction, and utilities must be protected. The flood provisions are enforced alongside the shoreline setback at permit review.",
      },
    ],
    extraLinks: [
      { label: "How is coastal erosion controlled?", href: "/answers/coastal-erosion-control-design/" },
      { label: "How are coastal erosion foundations designed?", href: "/answers/coastal-erosion-foundation-design/" },
      { label: "How do floodproofing techniques work?", href: "/answers/floodproofing-techniques-explained/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
];
