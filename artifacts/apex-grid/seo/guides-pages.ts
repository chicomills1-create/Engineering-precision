/** Engineering guide pages — cost/timeline, do-I-need, comparisons, PE education.
 *  Rendered at /guides/{slug}/
 */

import { LICENSING_COVERAGE_STATEMENT, PROJECT_JURISDICTION_NOTE } from "../src/lib/licensing";

export interface GuidePage {
  slug: string;
  title: string;
  description: string;
  h1: string;
  kicker: string;
  /** Short direct answer shown prominently at the top — the "featured snippet" paragraph. */
  shortAnswer: string;
  /** Body sections — each has a heading and bullet points. */
  sections: { heading: string; points: string[] }[];
  /** Contextual CTA text */
  ctaText: string;
  ctaHref: string;
}

export const GUIDE_PAGES: GuidePage[] = [

  // ─── COST & TIMELINE ───────────────────────────────────────────────────────

  {
    slug: "structural-engineering-cost",
    title: "How Much Does Structural Engineering Cost? | Apex Grid Engineering",
    description: "Structural engineering fees depend on project type, scope, complexity, and deliverables. Here's a practical breakdown of what drives structural engineering costs.",
    h1: "How Much Does Structural Engineering Cost?",
    kicker: "Structural Engineering · Cost Guide",
    shortAnswer: "Structural engineering fees vary based on project scope, complexity, building type, and deliverables required. Simple residential wall removal or equipment anchorage work may cost a few hundred to a few thousand dollars. Full structural engineering for a commercial building — design development through permit drawings — typically ranges from tens of thousands to well over one hundred thousand dollars depending on size and complexity. The best way to understand cost is to get a scope-specific proposal.",
    sections: [
      {
        heading: "What Drives Structural Engineering Cost",
        points: [
          "Scope of work — number of structural systems, disciplines, and deliverables",
          "Building complexity — irregular geometry, long spans, special structural systems",
          "Project type — new construction costs more than a targeted modification",
          "Available information — working without existing drawings adds engineering time",
          "Jurisdiction — some building departments require more extensive calculations",
          "Schedule — expedited delivery typically carries a premium",
          "Professional liability — projects with higher stakes carry higher PE review cost",
          "Coordination requirements — multi-discipline coordination increases cost",
        ],
      },
      {
        heading: "Typical Structural Engineering Scopes and Cost Ranges",
        points: [
          "Simple wall removal or opening — typically $1,500–$5,000 for residential/light commercial",
          "Equipment anchorage or rooftop structural support — $2,000–$8,000 depending on quantity",
          "Structural inspection report — $2,500–$7,500 depending on building size",
          "Tenant improvement structural modifications — $5,000–$25,000+ depending on scope",
          "Full structural engineering for a commercial building — scope-dependent, often $30,000–$150,000+",
          "Seismic retrofit engineering — highly variable based on deficiency scope",
          "Multifamily structural engineering — typically priced per unit or per building",
          "Government/military projects — may carry compliance premiums for UFC and federal standards",
        ],
      },
      {
        heading: "Why Exact Pricing Requires a Proposal",
        points: [
          "Structural engineering is priced on professional time and deliverable scope, not square footage alone",
          "Two buildings of the same size may have very different structural complexity",
          "Existing-building work requires evaluating what's there before the scope can be defined",
          "Permit and jurisdiction requirements vary — some jurisdictions require more documentation",
          "Send us your drawings or a project description and we'll respond with a fee proposal within one business day",
        ],
      },
    ],
    ctaText: "Get a Structural Engineering Proposal",
    ctaHref: "/contact/",
  },
  {
    slug: "mep-engineering-cost",
    title: "How Much Does MEP Engineering Cost? | Apex Grid Engineering",
    description: "MEP engineering fees depend on building type, scope, number of disciplines, and permit requirements. A practical guide to understanding MEP engineering costs.",
    h1: "How Much Does MEP Engineering Cost?",
    kicker: "MEP Engineering · Cost Guide",
    shortAnswer: "MEP engineering fees depend on the building type, which disciplines are included (mechanical, electrical, and/or plumbing), project complexity, and permit requirements. Simple MEP permit plans for a small tenant improvement may cost $5,000–$15,000. Full MEP engineering for a complex commercial building can range from $50,000 to several hundred thousand dollars. Restaurant MEP, medical office MEP, and industrial MEP all carry different cost profiles based on system complexity.",
    sections: [
      {
        heading: "What Drives MEP Engineering Cost",
        points: [
          "Number of disciplines — full MEP (all three) costs more than a single discipline",
          "Building type — healthcare, lab, and food service MEP require specialized systems",
          "New construction vs. renovation — renovation adds existing-condition evaluation",
          "Energy code jurisdiction — Title 24 or ASHRAE 90.1 compliance adds documentation",
          "Kitchen exhaust and make-up air systems add mechanical engineering complexity",
          "Emergency power, generators, and UPS systems add electrical engineering scope",
          "Medical gas and specialty plumbing add plumbing engineering complexity",
          "Multi-story or large building — more equipment, more coordination, more drawings",
        ],
      },
      {
        heading: "Typical MEP Engineering Scopes and Cost Ranges",
        points: [
          "Small TI or shell MEP permit plans (single discipline) — $3,000–$8,000",
          "Restaurant MEP permit plans — $8,000–$20,000 depending on kitchen complexity",
          "Medical office MEP — $15,000–$40,000+ depending on specialty systems",
          "Multifamily MEP engineering — typically priced per unit or per building",
          "Warehouse or industrial MEP — $10,000–$40,000 depending on HVAC and electrical",
          "Full commercial building MEP (all three disciplines) — $30,000–$150,000+",
          "Data center MEP — significantly higher due to redundancy and complexity",
          "Government or military MEP — carries compliance premiums for UFC standards",
        ],
      },
      {
        heading: "How to Get an Accurate MEP Engineering Proposal",
        points: [
          "Send architectural plans or a scope description so we can size the engineering deliverable",
          "Tell us the jurisdiction — energy code requirements vary significantly by state and city",
          "Identify the special systems — commercial kitchen, emergency power, medical gas",
          "Identify the schedule — standard vs. expedited affects pricing",
          "We respond with a detailed fee proposal within one business day",
        ],
      },
    ],
    ctaText: "Get an MEP Engineering Proposal",
    ctaHref: "/contact/",
  },
  {
    slug: "civil-engineering-cost",
    title: "How Much Does Civil Engineering Cost? | Apex Grid Engineering",
    description: "Civil engineering fees vary by project scope, site complexity, jurisdiction, and deliverables. A practical guide to civil engineering costs for commercial projects.",
    h1: "How Much Does Civil Engineering Cost?",
    kicker: "Civil Engineering · Cost Guide",
    shortAnswer: "Civil engineering fees for commercial site work depend on project scope, site complexity, jurisdiction requirements, and the number of deliverables. A simple parking lot or driveway improvement may cost $5,000–$15,000. Full civil engineering for a commercial site development typically ranges from $20,000 to $75,000 or more depending on site size, drainage complexity, and local requirements.",
    sections: [
      {
        heading: "What Drives Civil Engineering Cost",
        points: [
          "Site complexity — challenging topography, drainage, or utility conditions cost more",
          "Scope — grading only vs. full site development with utilities and drainage",
          "Jurisdiction — some municipalities require extensive drainage studies or traffic analysis",
          "Existing conditions — infill development with constraints costs more than greenfield",
          "Utility coordination — multiple utility connections add engineering scope",
          "Stormwater management — retention, detention, or infiltration requirements add cost",
          "ADA improvements — accessible route design adds scope on some projects",
          "Permit jurisdiction — some agencies require more extensive civil documentation",
        ],
      },
      {
        heading: "Typical Civil Engineering Scopes and Cost Ranges",
        points: [
          "Parking lot engineering — $5,000–$15,000 for a typical commercial lot",
          "Commercial driveway or turn lane — $4,000–$12,000",
          "Site drainage design — $5,000–$20,000 depending on complexity",
          "Utility connections — $4,000–$10,000 per connection type",
          "Full commercial site development — $20,000–$75,000+",
          "Multifamily site civil engineering — priced by site size and complexity",
          "Industrial or warehouse site engineering — $20,000–$60,000+",
          "Government site improvements — may carry agency-specific requirements",
        ],
      },
      {
        heading: "How to Get a Civil Engineering Proposal",
        points: [
          "Share your site plan or a description of the proposed site improvements",
          "Tell us the jurisdiction — local drainage and stormwater requirements vary significantly",
          "Identify the utility connections needed — water, sewer, storm",
          "We'll review the scope and respond with a fee proposal",
        ],
      },
    ],
    ctaText: "Get a Civil Engineering Proposal",
    ctaHref: "/contact/",
  },
  {
    slug: "geotechnical-engineering-cost",
    title: "How Much Does Geotechnical Engineering Cost? | Apex Grid",
    description: "Geotechnical engineering and geotechnical report costs depend on site size, boring depth, number of borings, and laboratory testing scope.",
    h1: "How Much Does Geotechnical Engineering Cost?",
    kicker: "Geotechnical Engineering · Cost Guide",
    shortAnswer: "Geotechnical engineering costs depend on the number and depth of soil borings, laboratory testing, site access conditions, and report scope. A standard commercial geotechnical investigation and report typically costs $5,000–$20,000. Larger sites, deeper investigations, or more complex testing programs can cost significantly more.",
    sections: [
      {
        heading: "What Drives Geotechnical Engineering Cost",
        points: [
          "Number of soil borings required — determined by site size and building footprint",
          "Boring depth — deeper borings for larger buildings or poor soil conditions",
          "Laboratory testing scope — grain size, Atterberg limits, compaction, expansion index",
          "Site access conditions — difficult access increases mobilization cost",
          "Groundwater conditions — variable groundwater requires special sampling and testing",
          "Special testing — consolidation, shear strength, permeability for specific applications",
          "Report scope — standard foundation report vs. pavement design vs. slope stability",
          "Urgency — expedited investigations carry scheduling premiums",
        ],
      },
      {
        heading: "Typical Geotechnical Scopes and Cost Ranges",
        points: [
          "Small commercial building geotechnical report — $5,000–$10,000",
          "Standard commercial site geotechnical investigation — $8,000–$18,000",
          "Multifamily geotechnical investigation — $10,000–$25,000+ by building count and site",
          "Parking lot geotechnical and pavement design — $4,000–$10,000",
          "Industrial or warehouse geotechnical — $10,000–$30,000 depending on loading",
          "Government or military geotechnical — may carry additional documentation requirements",
          "Phase II environmental combined with geotechnical — separate scope",
          "Retaining wall geotechnical parameters — add-on to standard report",
        ],
      },
      {
        heading: "How to Get a Geotechnical Proposal",
        points: [
          "Provide the site address and a site plan showing the building footprint",
          "Describe the proposed construction — building type, number of stories, basement if any",
          "Note any known site conditions — fill, old structures, drainage issues",
          "We'll scope the boring program and provide a fee proposal",
        ],
      },
    ],
    ctaText: "Get a Geotechnical Engineering Proposal",
    ctaHref: "/contact/",
  },
  {
    slug: "structural-engineering-timeline",
    title: "How Long Does Structural Engineering Take? | Apex Grid Engineering",
    description: "Structural engineering timelines depend on project type, complexity, available information, and permit requirements. A practical guide to structural engineering schedules.",
    h1: "How Long Does Structural Engineering Take?",
    kicker: "Structural Engineering · Schedule Guide",
    shortAnswer: "Structural engineering timelines depend on project complexity, available information, and deliverable scope. Simple structural scopes — equipment anchorage, wall opening calculations — may be delivered in one to two weeks. Full structural engineering for a commercial building typically takes four to ten weeks depending on complexity. Existing-building projects without original drawings take longer because field verification must happen before engineering can begin.",
    sections: [
      {
        heading: "Factors That Affect Structural Engineering Timeline",
        points: [
          "Project complexity — simple modifications are faster than full structural systems",
          "Available information — working without existing drawings adds field verification time",
          "Permit jurisdiction — some AHJs have specific documentation requirements that add time",
          "Geotechnical report — foundation design cannot begin until geotech data is available",
          "Coordination requirements — multi-discipline coordination adds review cycles",
          "Client review cycles — the engineer's schedule and client review schedule both matter",
          "Revisions — changes in scope mid-project extend the timeline",
          "Expedited delivery — available on many project types for a premium",
        ],
      },
      {
        heading: "Typical Structural Engineering Timelines",
        points: [
          "Equipment anchorage or simple structural detail — 1–2 weeks from complete information",
          "Wall removal or opening engineering — 1–3 weeks",
          "Structural report for existing building — 2–4 weeks",
          "Tenant improvement structural modifications — 2–5 weeks",
          "Full structural engineering for a new commercial building — 5–12 weeks",
          "Seismic retrofit engineering — highly variable based on investigation and scope",
          "Field verification required — add 1–3 weeks for contractor documentation collection",
          "Expedited structural engineering — contact us to discuss schedule compression",
        ],
      },
      {
        heading: "How to Keep Your Structural Engineering on Schedule",
        points: [
          "Send complete information — architectural plans, geotechnical report, existing drawings if available",
          "Resolve architectural decisions before structural engineering begins",
          "Coordinate contractor field verification early if existing drawings are unavailable",
          "Build permit plan check time into your schedule separately from engineering time",
          "Communicate your permit target date at project start",
        ],
      },
    ],
    ctaText: "Request Structural Engineering — Send Your Plans",
    ctaHref: "/contact/",
  },
  {
    slug: "mep-engineering-timeline",
    title: "How Long Does MEP Engineering Take? | Apex Grid Engineering",
    description: "MEP engineering timelines depend on building type, number of disciplines, system complexity, and coordination requirements. A practical guide to MEP engineering schedules.",
    h1: "How Long Does MEP Engineering Take?",
    kicker: "MEP Engineering · Schedule Guide",
    shortAnswer: "MEP engineering timelines depend on building type, disciplines involved, and system complexity. Simple single-discipline permit plans for a small tenant improvement may be delivered in two to three weeks. Full MEP engineering for a complex commercial building with all three disciplines typically takes four to ten weeks. Restaurant MEP — with kitchen exhaust, make-up air, and gas — often takes three to five weeks from complete architectural plans.",
    sections: [
      {
        heading: "Factors That Affect MEP Engineering Timeline",
        points: [
          "Number of disciplines — mechanical, electrical, and plumbing each add scope",
          "System complexity — commercial kitchen, medical, lab, and data center systems take longer",
          "Equipment selection — owner-furnished equipment schedules must be confirmed before design",
          "Energy code compliance — Title 24 and ASHRAE 90.1 documentation adds time",
          "Architectural design changes — MEP follows architecture; late changes reset coordination",
          "Multi-story buildings — shaft and distribution coordination takes longer",
          "Permit jurisdiction — some AHJs require more extensive MEP documentation",
          "Coordination with structural — rooftop equipment and penetrations require coordination",
        ],
      },
      {
        heading: "Typical MEP Engineering Timelines",
        points: [
          "Single-discipline permit plans (small TI) — 2–3 weeks from complete architectural plans",
          "Restaurant MEP — 3–5 weeks from complete architectural and equipment schedules",
          "Medical office MEP — 4–7 weeks depending on specialty systems",
          "Multifamily MEP — 4–8 weeks depending on unit count and building type",
          "Full commercial MEP (all three disciplines) — 5–10 weeks",
          "Data center MEP — 8–16 weeks depending on redundancy and complexity",
          "Expedited MEP — available on select project types; contact us to discuss",
        ],
      },
      {
        heading: "What Delays MEP Engineering",
        points: [
          "Incomplete architectural plans — MEP cannot finalize until architecture is fixed",
          "Missing equipment schedules — HVAC, water heater, and electrical loads must be confirmed",
          "Late utility information — electrical service capacity and gas pressure must be known",
          "Scope changes after MEP design begins — changes require rework of affected systems",
          "Permit comments and resubmittals — factor plan check time into the overall schedule",
        ],
      },
    ],
    ctaText: "Get an MEP Engineering Proposal",
    ctaHref: "/contact/",
  },
  {
    slug: "geotechnical-report-timeline",
    title: "How Long Does a Geotechnical Report Take? | Apex Grid Engineering",
    description: "Geotechnical investigation and report timelines depend on site access, boring scheduling, laboratory testing, and report production. A practical guide.",
    h1: "How Long Does a Geotechnical Report Take?",
    kicker: "Geotechnical Engineering · Schedule Guide",
    shortAnswer: "A geotechnical investigation and report typically takes three to six weeks from notice to proceed. The timeline includes drilling mobilization and scheduling, field investigation, laboratory testing, and report production. Rush geotechnical investigations are sometimes possible but depend on drilling contractor availability and laboratory capacity.",
    sections: [
      {
        heading: "Geotechnical Investigation Timeline Phases",
        points: [
          "Contract execution and mobilization — typically 1–2 weeks to schedule drilling",
          "Field investigation — 1–3 days for most commercial sites",
          "Laboratory testing — typically 1–3 weeks depending on test types",
          "Engineering analysis and report production — 1–2 weeks",
          "Total typical timeline — 3–6 weeks from authorization to report delivery",
          "Expedited investigations — possible in 2–3 weeks if drilling is available and lab is expedited",
        ],
      },
      {
        heading: "What Can Delay a Geotechnical Report",
        points: [
          "Drilling contractor availability — scheduling is market-dependent",
          "Site access issues — permits, utility clearances, or restricted access add time",
          "Underground utilities — potholing or hand-digging near utilities adds time",
          "Groundwater — monitoring wells or long-duration testing extends the program",
          "Special testing — consolidation tests can take several weeks",
          "Report review cycles — client or structural engineer comments may require revisions",
        ],
      },
      {
        heading: "How to Keep Geotechnical on Schedule",
        points: [
          "Order geotechnical early — it's often on the critical path for foundation design",
          "Have a site plan and building footprint ready at authorization",
          "Clear site access in advance — locked gates, tenant notification, or permits",
          "Communicate your structural design start date so we can target report delivery",
          "Budget for expedited laboratory testing if schedule is compressed",
        ],
      },
    ],
    ctaText: "Request a Geotechnical Investigation Proposal",
    ctaHref: "/contact/",
  },
  {
    slug: "plan-check-timeline",
    title: "How Long Does Plan Check Take? | Apex Grid Engineering",
    description: "Plan check timelines vary by jurisdiction, project complexity, and over-the-counter vs. full review. A practical guide to building department plan check schedules.",
    h1: "How Long Does Plan Check Take?",
    kicker: "Permit Engineering · Plan Check",
    shortAnswer: "Plan check timelines vary widely by jurisdiction and are outside the engineer's direct control. Over-the-counter or express review may take one day to two weeks. Standard plan check for a commercial project typically takes two to ten weeks for the first review. Some jurisdictions are significantly slower — especially after major permit surges or with underfunded building departments. Resubmittals after city comments typically take one to four weeks per review cycle.",
    sections: [
      {
        heading: "Factors That Affect Plan Check Timeline",
        points: [
          "Jurisdiction — building department staffing and backlog vary enormously",
          "Project type — over-the-counter review is available for simpler scopes in some cities",
          "Building department workload — permit surges slow all reviews",
          "Completeness of the first submittal — incomplete packages are rejected or cycle longer",
          "Number of reviewing agencies — fire, planning, utilities, and health may all review",
          "Third-party or outside plan check — some jurisdictions allow this to speed review",
          "Corrections required — more comments mean more resubmittal cycles",
          "Project complexity — complex MEP or structural systems get more scrutiny",
        ],
      },
      {
        heading: "Typical Plan Check Timelines by Project Type",
        points: [
          "Over-the-counter review (simple projects, select cities) — 1 day to 2 weeks",
          "Standard commercial TI — 2–6 weeks first review in most jurisdictions",
          "New commercial construction — 4–10 weeks first review",
          "California cities (LA, SF, Oakland) — plan check often 8–16 weeks or longer",
          "Arizona cities (Phoenix, Scottsdale) — typically 4–8 weeks for commercial",
          "Texas cities (Dallas, Austin, Houston) — typically 3–8 weeks",
          "Resubmittal reviews — typically 2–4 weeks per cycle after city comments",
        ],
      },
      {
        heading: "How Engineering Quality Affects Plan Check Speed",
        points: [
          "Complete, well-organized permit sets reduce comment volume",
          "Correct calculations submitted with the first package reduce follow-up requests",
          "Proactive engineering responses to anticipated city questions reduce comment cycles",
          "Apex Grid prepares permit packages specifically designed for clean first-cycle review",
          "Our engineers respond to city comments efficiently to minimize resubmittal time",
        ],
      },
    ],
    ctaText: "Send Your Plans — We'll Engineer the Permit Package",
    ctaHref: "/contact/",
  },
  {
    slug: "what-delays-engineering",
    title: "What Delays Engineering Projects? | Apex Grid Engineering",
    description: "Understanding what commonly delays engineering — and how to avoid the most common schedule problems — helps projects hit permit targets.",
    h1: "What Delays Engineering Projects?",
    kicker: "Engineering · Schedule Management",
    shortAnswer: "The most common engineering delays are not caused by the engineer — they come from incomplete information at project start, architectural changes during engineering, late equipment selections, unavailable existing drawings, and permit review cycles that exceed schedule assumptions. Understanding what causes delays helps project teams plan realistically and avoid the most common schedule traps.",
    sections: [
      {
        heading: "Most Common Engineering Delays",
        points: [
          "Incomplete architectural plans — MEP and structural cannot finalize when architecture is still changing",
          "Missing equipment schedules — HVAC, electrical loads, and plumbing fixtures must be selected",
          "No existing drawings on an existing-building project — field verification adds weeks",
          "Late geotechnical report — foundation design depends on geotech; delays cascade",
          "Scope changes mid-engineering — changes after engineering begins require rework",
          "Utility information not yet confirmed — electrical service, gas pressure, water service size",
          "Client review delays — engineering waits for client approval before permit submittal",
          "Permit plan check backlogs — jurisdiction-dependent and outside engineering control",
        ],
      },
      {
        heading: "How to Avoid Common Engineering Delays",
        points: [
          "Start with complete architectural plans before engaging engineering",
          "Select major equipment before MEP engineering begins",
          "Order geotechnical early — it is frequently on the critical path",
          "Confirm utility information with the serving utilities before MEP design",
          "Request existing drawings from the building department before field verification",
          "Communicate your permit target date at project kickoff",
          "Allow adequate time for permit plan check — it varies enormously by jurisdiction",
          "Build resubmittal time into the schedule as a realistic contingency",
        ],
      },
      {
        heading: "How Apex Grid Minimizes Engineering Delays",
        points: [
          "We identify missing information at project kickoff before it affects the schedule",
          "We flag scope dependencies — geotechnical, existing drawings, equipment schedules",
          "We stage engineering where possible to maintain progress with available information",
          "We respond to RFIs and city comments quickly to minimize resubmittal cycles",
          "We communicate schedule status proactively when issues arise",
        ],
      },
    ],
    ctaText: "Discuss Your Project Schedule",
    ctaHref: "/contact/",
  },

  // ─── DO I NEED AN ENGINEER? ────────────────────────────────────────────────

  {
    slug: "do-i-need-structural-engineer-remodel",
    title: "Do I Need a Structural Engineer for a Remodel? | Apex Grid Engineering",
    description: "Whether a remodel requires a structural engineer depends on what's being changed and the building permit requirements in your jurisdiction.",
    h1: "Do I Need a Structural Engineer for a Remodel?",
    kicker: "Structural Engineering · Remodel",
    shortAnswer: "Many remodels require structural engineering — particularly when the work involves removing or modifying walls, changing floor or roof loads, adding equipment, or when the building permit requires engineering documentation. Cosmetic remodels that touch no structural elements may not need an engineer. When in doubt, the building department or a brief engineering consultation can confirm what's required.",
    sections: [
      {
        heading: "Remodel Work That Typically Requires Structural Engineering",
        points: [
          "Removing a wall — especially if load-bearing",
          "Creating or widening an opening in a wall",
          "Adding or modifying rooftop HVAC equipment",
          "Converting an attic or crawl space to occupied space",
          "Adding a second story or addition",
          "Changing occupancy use of a building",
          "Commercial remodels in most jurisdictions — permit requirement",
          "Adding solar panels or rooftop equipment",
        ],
      },
      {
        heading: "Remodel Work That Often Does NOT Require Structural Engineering",
        points: [
          "Cosmetic finishes — flooring, paint, cabinets, millwork",
          "Non-structural partition walls",
          "Replacing like-for-like fixtures and equipment at same locations and weights",
          "Interior improvements that don't touch structure",
          "Work below the permit threshold in some jurisdictions",
        ],
      },
      {
        heading: "How to Find Out if Your Remodel Needs Engineering",
        points: [
          "Check with your local building department — they define permit and engineering requirements",
          "Ask your architect — they typically know jurisdiction requirements well",
          "Consult a structural engineer early — a brief consultation is often inexpensive",
          "Don't assume — unpermitted structural work creates significant liability",
        ],
      },
    ],
    ctaText: "Ask an Engineer About Your Remodel",
    ctaHref: "/contact/",
  },
  {
    slug: "do-i-need-structural-engineer-addition",
    title: "Do I Need a Structural Engineer for an Addition? | Apex Grid",
    description: "Building additions almost always require structural engineering — here's what's involved and why.",
    h1: "Do I Need a Structural Engineer for an Addition?",
    kicker: "Structural Engineering · Addition",
    shortAnswer: "Yes — building additions almost always require structural engineering. An addition adds new structural loads that must be designed and connected to the existing structure. The building permit for an addition typically requires structural drawings and calculations stamped by a licensed structural or civil engineer.",
    sections: [
      {
        heading: "What Structural Engineering an Addition Requires",
        points: [
          "New structural framing design — walls, roof, floor system",
          "Foundation design for the addition",
          "Connection design where the addition attaches to the existing building",
          "Evaluation of the existing building's capacity to handle the new connection loads",
          "Seismic and wind design for the addition",
          "Structural permit drawings and calculations",
          "Geotechnical coordination if significant new foundation loads are involved",
        ],
      },
      {
        heading: "Existing Building Evaluation Often Required",
        points: [
          "The structural engineer evaluates the existing building at the point of connection",
          "If the existing building lacks original drawings, field verification may be required",
          "Some additions require strengthening the existing structure to carry new loads",
          "If the addition triggers a change in seismic design category, the whole building may require review",
        ],
      },
      {
        heading: "Starting an Addition Project",
        points: [
          "Locate existing drawings — contact your building department if you don't have them",
          "Engage an architect for the addition design before structural engineering begins",
          "Order geotechnical if there's no existing report on file",
          "Contact us with architectural plans for a structural engineering proposal",
        ],
      },
    ],
    ctaText: "Send Your Addition Plans for Engineering Review",
    ctaHref: "/contact/",
  },
  {
    slug: "do-i-need-structural-engineer-wall-removal",
    title: "Do I Need a Structural Engineer for a Wall Removal? | Apex Grid",
    description: "Wall removal requires a structural engineer when the wall is load-bearing — and the permit almost always requires engineering documentation.",
    h1: "Do I Need a Structural Engineer for a Wall Removal?",
    kicker: "Structural Engineering · Wall Removal",
    shortAnswer: "Yes — if the wall is load-bearing, you need a structural engineer before removing it. Load-bearing walls carry roof, floor, or structural loads that must be redirected through a beam, header, and supporting posts when the wall is removed. Even if you think a wall isn't load-bearing, confirming its structural role with an engineer before demolition is critical. Most building permits for wall removal require structural drawings.",
    sections: [
      {
        heading: "What Structural Engineering a Wall Removal Requires",
        points: [
          "Determination of whether the wall is load-bearing",
          "Beam or header sizing to carry the loads the wall was carrying",
          "Post or column design to carry beam reactions to the foundation",
          "Foundation capacity check at post locations",
          "Connection design at beam-to-post and beam-to-wall",
          "Structural permit drawings and calculations",
          "Sometimes: existing building field verification if no drawings exist",
        ],
      },
      {
        heading: "How to Tell if a Wall Might Be Load-Bearing",
        points: [
          "Walls running perpendicular to floor or roof framing are often load-bearing",
          "Walls at the center of a building often carry ridge or mid-span loads",
          "Walls above or below other walls in multi-story buildings are often load-bearing",
          "Exterior walls are almost always structural in some way",
          "The only reliable way to confirm is structural engineering review",
        ],
      },
      {
        heading: "Next Steps for a Wall Removal Project",
        points: [
          "Contact us with the wall location and available floor plans",
          "We'll confirm the structural role, size the beam and posts, and produce permit drawings",
          "Do not remove a wall before obtaining a permit and engineering review",
        ],
      },
    ],
    ctaText: "Get Engineering for Your Wall Removal",
    ctaHref: "/contact/",
  },
  {
    slug: "do-i-need-engineering-commercial-remodel",
    title: "Do I Need Engineering for a Commercial Remodel? | Apex Grid",
    description: "Commercial remodels almost always require engineering — structural, MEP, or both — depending on what's being changed and the permit requirements.",
    h1: "Do I Need Engineering for a Commercial Remodel?",
    kicker: "Commercial Engineering · Remodel",
    shortAnswer: "Commercial remodels almost always require engineering. Most commercial building permits require stamped structural drawings for any work affecting the structure, and stamped MEP plans for any mechanical, electrical, or plumbing changes. Even light commercial tenant improvements typically require MEP engineering to verify compliance with current codes.",
    sections: [
      {
        heading: "Commercial Remodel Work That Requires Structural Engineering",
        points: [
          "Any wall removal or modification in a commercial building",
          "Adding or modifying openings — doors, windows, storefronts",
          "Rooftop HVAC equipment additions or replacements",
          "Mezzanines, equipment platforms, or storage structures",
          "Adding solar panels or telecom equipment",
          "Change of occupancy where load requirements change",
          "Foundation modifications or new concentrated loads",
        ],
      },
      {
        heading: "Commercial Remodel Work That Requires MEP Engineering",
        points: [
          "Any HVAC system modification or replacement",
          "Electrical service changes, panel upgrades, or load additions",
          "New or modified plumbing — fixtures, gas, drainage",
          "Commercial kitchen additions or modifications",
          "EV charging installation above certain capacity thresholds",
          "Energy code compliance documentation — almost always required for commercial permits",
        ],
      },
      {
        heading: "What to Do Next",
        points: [
          "Talk to your architect or contractor about what permit is required",
          "Contact your building department to confirm what engineering is required for your scope",
          "Send us your scope and plans — we'll tell you what disciplines are needed",
        ],
      },
    ],
    ctaText: "Send Your Commercial Remodel Scope",
    ctaHref: "/contact/",
  },
  {
    slug: "do-i-need-mep-plans-restaurant",
    title: "Do I Need MEP Plans for a Restaurant? | Apex Grid Engineering",
    description: "Restaurant permits almost always require MEP engineering plans — especially for kitchen exhaust, make-up air, gas, and electrical systems.",
    h1: "Do I Need MEP Plans for a Restaurant?",
    kicker: "MEP Engineering · Restaurant",
    shortAnswer: "Yes — virtually every restaurant permit requires MEP engineering plans. Restaurant commercial kitchens involve complex mechanical systems (exhaust, make-up air, grease exhaust), gas piping, plumbing for kitchen and restrooms, and significant electrical loads. These systems all require engineering documentation for the building permit.",
    sections: [
      {
        heading: "MEP Engineering Required for Most Restaurant Permits",
        points: [
          "Mechanical — HVAC, kitchen exhaust, make-up air, grease exhaust",
          "Electrical — service sizing, panel schedules, kitchen equipment loads, one-line diagram",
          "Plumbing — kitchen plumbing, grease waste, grease interceptor, restrooms, gas piping",
          "Energy code compliance documentation — required in most jurisdictions",
          "Health department may also review MEP systems in some jurisdictions",
        ],
      },
      {
        heading: "Special Restaurant MEP Complexity",
        points: [
          "Kitchen exhaust hoods require engineered exhaust and make-up air systems",
          "Grease exhaust systems are separate from general HVAC exhaust",
          "Gas piping must be engineered for cooking equipment BTU loads",
          "Grease interceptors must be sized based on fixture unit and trap counts",
          "Restaurant electrical loads are typically much higher than general commercial",
          "Health code and fire code requirements interact with MEP engineering",
        ],
      },
      {
        heading: "What to Send for a Restaurant MEP Proposal",
        points: [
          "Architectural plans showing kitchen layout and equipment locations",
          "Equipment schedule with gas BTU, electrical voltage/amperage, and ventilation requirements",
          "Jurisdiction and address — energy code requirements vary by state and city",
          "Target permit date so we can schedule accordingly",
        ],
      },
    ],
    ctaText: "Get Restaurant MEP Engineering — Send Your Plans",
    ctaHref: "/contact/",
  },
  {
    slug: "do-i-need-structural-rooftop-hvac",
    title: "Do I Need Structural Engineering for Rooftop HVAC? | Apex Grid",
    description: "Adding or replacing rooftop HVAC equipment often requires structural engineering to verify the roof framing can support the equipment loads.",
    h1: "Do I Need Structural Engineering for Rooftop HVAC?",
    kicker: "Structural Engineering · Rooftop HVAC",
    shortAnswer: "Yes — adding or replacing rooftop HVAC equipment usually requires structural engineering. The roof framing must be verified to carry the weight of the equipment. Most building departments require stamped structural calculations and drawings for rooftop equipment additions. Even equipment replacements may require engineering if the new unit is heavier than the old one.",
    sections: [
      {
        heading: "When Structural Engineering Is Required for Rooftop HVAC",
        points: [
          "Adding new rooftop units where none existed before",
          "Replacing an existing unit with a heavier unit",
          "Adding multiple units to a roof not originally designed for rooftop equipment",
          "Equipment that concentrates load on specific roof framing members",
          "Building permit requirement in most commercial jurisdictions",
          "When a seismic anchorage calculation is required",
        ],
      },
      {
        heading: "What the Structural Engineering Covers",
        points: [
          "Existing roof framing capacity evaluation at equipment location",
          "Equipment weight verification from manufacturer data sheets",
          "Roof curb and support frame structural design",
          "Seismic anchorage design per current IBC and ASCE 7",
          "Wind uplift anchorage design",
          "Structural permit drawings and calculations",
          "Coordination with mechanical engineer on equipment locations",
        ],
      },
      {
        heading: "What to Send for a Rooftop Equipment Structural Proposal",
        points: [
          "Equipment weight from the manufacturer data sheet (operating weight)",
          "Roof framing type and information — existing drawings if available",
          "Location of equipment on the roof",
          "Jurisdiction — seismic design category varies by location",
        ],
      },
    ],
    ctaText: "Get Structural Engineering for Rooftop Equipment",
    ctaHref: "/contact/",
  },
  {
    slug: "do-i-need-engineering-ev-chargers",
    title: "Do I Need Engineering for EV Charging? | Apex Grid Engineering",
    description: "EV charging installation requires electrical engineering when adding significant load to the electrical service — and most commercial EV projects require stamped engineering.",
    h1: "Do I Need Engineering for EV Charging?",
    kicker: "Electrical Engineering · EV Charging",
    shortAnswer: "Commercial EV charging typically requires electrical engineering — a load study, service capacity evaluation, panel schedule updates, and sometimes service upgrades. Most building departments require stamped electrical drawings for EV charging installations above a minimum capacity. Fleet charging and DC fast charging almost always require engineering.",
    sections: [
      {
        heading: "EV Charging That Requires Electrical Engineering",
        points: [
          "Commercial EV charging stations in most jurisdictions",
          "DC fast charging — high-power installations almost always require engineering",
          "Fleet charging — high aggregate load requires service capacity analysis",
          "Multifamily EV charging — multiple panel connections and load management",
          "Parking structure EV charging — distribution design across levels",
          "Any installation that requires a utility interconnection or service upgrade",
        ],
      },
      {
        heading: "What the Electrical Engineering Covers",
        points: [
          "Existing electrical service capacity load study",
          "EV charging load calculation and service upgrade sizing if needed",
          "Panel schedules for new EV circuits",
          "One-line diagram showing EV charging system distribution",
          "Utility coordination for service upgrade",
          "Load management system engineering where required",
          "Electrical permit drawings and calculations",
        ],
      },
      {
        heading: "What to Send for an EV Charging Engineering Proposal",
        points: [
          "Number and type of EV chargers — Level 2 kW rating or DC fast charging kW",
          "Existing electrical service information — main breaker size, voltage, available capacity",
          "Site plan showing charger locations",
          "Jurisdiction — EV charging code requirements vary by state",
        ],
      },
    ],
    ctaText: "Get EV Charging Electrical Engineering",
    ctaHref: "/contact/",
  },
  {
    slug: "do-i-need-geotechnical-report",
    title: "Do I Need a Geotechnical Report? | Apex Grid Engineering",
    description: "Most commercial construction projects require a geotechnical report — here's when it's required and what it includes.",
    h1: "Do I Need a Geotechnical Report?",
    kicker: "Geotechnical Engineering · Requirements",
    shortAnswer: "Most commercial construction projects require a geotechnical report. Building departments typically require geotechnical investigation before approving foundation design for new construction, additions, and some renovation projects. The structural engineer needs the geotechnical report to design the foundation — so geotechnical should be ordered early.",
    sections: [
      {
        heading: "Projects That Typically Require a Geotechnical Report",
        points: [
          "New commercial construction — virtually always required",
          "Additions with new foundations",
          "Parking lot construction in many jurisdictions",
          "Retaining walls above certain height thresholds",
          "Sites with known soil problems — expansive soils, fill, high groundwater",
          "Projects with significant grading or earthwork",
          "Some tenant improvements with new concentrated loads",
        ],
      },
      {
        heading: "Projects That May Not Require Geotechnical",
        points: [
          "Tenant improvements with no foundation work",
          "Small additions on sites with recent geotechnical reports",
          "Jurisdictions that allow presumptive bearing values in some cases",
          "Consult with your structural engineer and local building department to confirm",
        ],
      },
      {
        heading: "What a Geotechnical Report Provides",
        points: [
          "Soil boring logs documenting subsurface conditions",
          "Allowable bearing pressure for foundation design",
          "Foundation type recommendations — spread footings, deep foundations",
          "Expansive soil evaluation and mitigation recommendations",
          "Groundwater depth and seasonal variation",
          "Compaction recommendations for earthwork",
          "Pavement subgrade recommendations if applicable",
        ],
      },
    ],
    ctaText: "Request a Geotechnical Investigation Proposal",
    ctaHref: "/contact/",
  },
  {
    slug: "do-i-need-engineering-change-of-occupancy",
    title: "Do I Need Engineering for a Change of Occupancy? | Apex Grid",
    description: "Change of occupancy typically requires both structural and MEP engineering to verify the building meets current code requirements for the new use.",
    h1: "Do I Need Engineering for a Change of Occupancy?",
    kicker: "Engineering · Change of Occupancy",
    shortAnswer: "Yes — a change of occupancy almost always requires engineering. The building code applies different structural, life safety, accessibility, and MEP requirements based on occupancy classification. When a building's use changes, engineering is required to verify the existing building meets the requirements for the new occupancy — and to design the modifications needed to comply.",
    sections: [
      {
        heading: "Structural Engineering for Change of Occupancy",
        points: [
          "Live load review for the new occupancy — assembly, storage, and industrial uses have higher loads",
          "Existing structural capacity evaluation for increased loads",
          "Seismic performance review — some occupancy changes trigger re-evaluation",
          "Structural modifications to meet new load requirements",
          "Foundation evaluation if loads change significantly",
        ],
      },
      {
        heading: "MEP Engineering for Change of Occupancy",
        points: [
          "HVAC system review for new occupancy ventilation requirements",
          "Electrical service capacity for new occupancy loads",
          "Plumbing fixture count compliance for new occupancy",
          "Fire suppression coordination — some occupancy changes affect sprinkler requirements",
          "Energy code compliance for the new occupancy",
          "ADA accessibility compliance review",
        ],
      },
      {
        heading: "Common Change of Occupancy Scenarios",
        points: [
          "Office to restaurant — MEP overhaul typically required",
          "Warehouse to retail or assembly — floor load and egress review",
          "Retail to medical — HVAC, plumbing, and electrical typically require upgrades",
          "Any building to residential — plumbing, electrical, and structural changes",
          "Contact us with the current and proposed occupancy for a scope assessment",
        ],
      },
    ],
    ctaText: "Get Engineering for Your Change of Occupancy",
    ctaHref: "/contact/",
  },

  // ─── WHAT DOES AN ENGINEER NEED? ──────────────────────────────────────────

  {
    slug: "what-does-structural-engineer-need",
    title: "What Does a Structural Engineer Need to Start? | Apex Grid",
    description: "The information a structural engineer needs at project start depends on the project type — here's a practical breakdown for common project categories.",
    h1: "What Does a Structural Engineer Need to Start?",
    kicker: "Structural Engineering · Project Information",
    shortAnswer: "Structural engineering typically requires architectural plans showing the proposed scope, existing building information if the project involves modifications, a geotechnical report for foundation design, and a clear scope description. The more complete the information, the faster engineering can begin and the more accurate the fee proposal.",
    sections: [
      {
        heading: "Information Structural Engineers Need for Most Projects",
        points: [
          "Architectural plans — PDF at minimum, CAD or Revit if available",
          "Existing building drawings — structural drawings if available for renovation projects",
          "Geotechnical report — required for foundation design on new construction and additions",
          "Project address and jurisdiction — determines seismic design category and local code requirements",
          "Scope description — what's changing, what's staying, what the project objectives are",
          "Schedule requirements — permit target date and any construction start constraints",
        ],
      },
      {
        heading: "Additional Information for Specific Project Types",
        points: [
          "Rooftop equipment — manufacturer data sheets with operating weight",
          "Wall removal — floor plan showing wall location and what's above",
          "Additions — site plan, existing foundation information",
          "Existing building without drawings — access for field verification",
          "Solar — panel layout, total weight, and mounting system description",
          "Mezzanines — intended use and expected floor loads",
        ],
      },
      {
        heading: "What If You Don't Have All the Information",
        points: [
          "Contact us with what you have — we'll tell you what additional information is needed",
          "Missing existing drawings can often be addressed through field verification",
          "We can stage engineering to begin with available information",
          "A brief project description is enough to start a fee proposal conversation",
        ],
      },
    ],
    ctaText: "Send Your Project Information",
    ctaHref: "/contact/",
  },
  {
    slug: "what-does-mep-engineer-need",
    title: "What Does an MEP Engineer Need? | Apex Grid Engineering",
    description: "MEP engineering requires architectural plans, equipment schedules, utility information, and jurisdiction data. Here's a practical breakdown of what to prepare.",
    h1: "What Does an MEP Engineer Need?",
    kicker: "MEP Engineering · Project Information",
    shortAnswer: "MEP engineering requires architectural plans showing the building layout, a description of the building use and occupancy, equipment schedules for major mechanical and electrical equipment, utility service information, and jurisdiction data for energy code compliance. Restaurant and commercial kitchen projects also require kitchen equipment schedules.",
    sections: [
      {
        heading: "Core Information for MEP Engineering",
        points: [
          "Architectural plans — floor plans, reflected ceiling plans, sections",
          "Building use and occupancy — restaurant, medical, office, warehouse, etc.",
          "Building area and number of stories",
          "Jurisdiction and address — for energy code and utility coordination",
          "Existing utility service information — electrical service size, gas pressure, water service",
          "MEP scope — all three disciplines or specific discipline(s) needed",
        ],
      },
      {
        heading: "Equipment Information for MEP Engineering",
        points: [
          "HVAC equipment — owner-furnished vs. engineer-selected, any existing equipment being reused",
          "Commercial kitchen equipment schedule — gas BTU, electrical requirements, ventilation requirements",
          "Water heater — capacity and fuel type",
          "Electrical loads — tenant-supplied or specialized equipment not on standard schedules",
          "Generator — kW rating and which loads it serves",
          "EV chargers — quantity, charging level, and location",
        ],
      },
      {
        heading: "What If Equipment Isn't Selected Yet",
        points: [
          "MEP engineering can begin with preliminary assumptions before final equipment selection",
          "Equipment substitutions after design begins may require engineering revisions",
          "We'll flag items that need to be confirmed before the permit package is finalized",
          "Earlier equipment selection = fewer revisions and faster permit submittals",
        ],
      },
    ],
    ctaText: "Send Your Architectural Plans — We'll Identify What's Needed",
    ctaHref: "/contact/",
  },
  {
    slug: "do-engineers-need-cad-files",
    title: "Do Engineers Need CAD Files? | Apex Grid Engineering",
    description: "Engineers can work from PDFs, CAD, or Revit files — PDF is often sufficient, but CAD and Revit provide coordination advantages for complex projects.",
    h1: "Do Engineers Need CAD Files?",
    kicker: "Engineering · Project Files",
    shortAnswer: "No — engineers can work from PDF drawings in most cases. CAD or Revit files speed up coordination and reduce errors on complex projects, but PDF architectural plans are sufficient for structural, MEP, and civil engineering on the majority of commercial projects. Provide whatever file format you have.",
    sections: [
      {
        heading: "When PDF Plans Are Sufficient",
        points: [
          "Most commercial tenant improvements and renovations",
          "Small to medium commercial buildings with conventional structural systems",
          "MEP engineering for standard occupancy types",
          "Civil site engineering for standard site improvements",
          "Permit-focused engineering with limited coordination requirements",
        ],
      },
      {
        heading: "When CAD or Revit Adds Value",
        points: [
          "Complex multi-story buildings with extensive MEP coordination",
          "Projects where structural and MEP conflicts need to be resolved in the model",
          "Revit-based coordination on healthcare, data center, or complex commercial projects",
          "Projects where the architect is working in Revit and wants engineering in the same model",
          "Large-scale projects where a coordinated BIM model is required",
        ],
      },
      {
        heading: "Our File Compatibility",
        points: [
          "We work in PDF, DWG, DXF, and Revit formats",
          "We can receive Bluebeam markups and redlines",
          "If you only have paper drawings, we can often work from scanned PDFs",
          "Send us whatever you have — we'll confirm if anything additional is needed",
        ],
      },
    ],
    ctaText: "Send Your Plans in Any Format",
    ctaHref: "/contact/",
  },
  {
    slug: "can-engineers-work-from-pdfs",
    title: "Can Engineers Work From PDFs? | Apex Grid Engineering",
    description: "Yes — PDF architectural plans are the standard starting point for most structural, MEP, and civil engineering projects.",
    h1: "Can Engineers Work From PDFs?",
    kicker: "Engineering · Project Files",
    shortAnswer: "Yes — PDF is the most common format for engineering project initiation. Structural, MEP, civil, and geotechnical engineers routinely work from PDF architectural plans, and PDF is often all that's needed to produce a complete permit package. CAD or Revit files are beneficial on complex or coordination-intensive projects but are not required for most engineering.",
    sections: [
      {
        heading: "What Engineers Do With PDF Plans",
        points: [
          "Use PDF architectural plans as the geometric basis for engineering design",
          "Mark up PDFs with structural and MEP overlays in Bluebeam or CAD",
          "Reference PDF plans for dimensions, layouts, and scope documentation",
          "Produce engineering drawings in CAD or Revit that reference the PDF architectural drawings",
          "Coordinate engineering with the architect by exchanging PDF redlines",
        ],
      },
      {
        heading: "PDF Quality Requirements",
        points: [
          "Legible dimensions and notes — engineers need to read the plans",
          "All relevant sheets — floor plans, ceiling plans, sections, and details",
          "Complete and up-to-date — old or superseded plans cause scope errors",
          "Scale reference — title block information should include scale or at minimum a scale bar",
        ],
      },
      {
        heading: "When Only PDFs Are Available",
        points: [
          "Most projects: PDF is fully sufficient for permit-quality engineering",
          "Existing buildings without CAD: we work from as-built PDFs, field measurements, and photos",
          "If PDFs are of poor quality, we may request better originals or field verification",
        ],
      },
    ],
    ctaText: "Send Your PDF Plans",
    ctaHref: "/contact/",
  },
  {
    slug: "what-photos-to-send-engineer",
    title: "What Photos Should a Contractor Send an Engineer? | Apex Grid",
    description: "High-quality, systematic contractor photos of existing framing and conditions can support structural engineering without requiring an engineer site visit.",
    h1: "What Photos Should a Contractor Send an Engineer?",
    kicker: "Existing Building · Contractor Documentation",
    shortAnswer: "For existing-building structural engineering, contractors should send photos that show framing member sizes, connections, spans, and the relationship between structural elements. Photos should be labeled with location descriptions. The goal is to give the engineer a clear picture of what's actually in the building without requiring a site visit.",
    sections: [
      {
        heading: "Required Photo Categories for Structural Engineering",
        points: [
          "Overall framing — wide photos showing the framing layout in exposed areas",
          "Member sizes — close photos of wood, steel, or concrete member dimensions with a tape measure",
          "Connections — beam-to-column, beam-to-wall, joist-to-beam, holdowns",
          "Foundation type — footing exposure, slab thickness, stemwall conditions",
          "Wall framing — stud size, spacing, and header conditions at openings",
          "Damaged or suspect conditions — cracks, rot, corrosion, overloading signs",
          "Overview photos — floor plan orientation photos to locate detailed images",
        ],
      },
      {
        heading: "Photo Documentation Best Practices",
        points: [
          "Label each photo with its location — 'North wall, beam at column line 3'",
          "Include a tape measure in size photos for scale reference",
          "Photograph from multiple angles — one photo of a connection is never enough",
          "Use consistent lighting — avoid backlit photos where framing detail is lost",
          "Organize by location — group photos by wall, bay, or level",
          "Send raw, full-resolution photos — do not compress before sending",
        ],
      },
      {
        heading: "When Photos May Not Be Sufficient",
        points: [
          "When framing is concealed and cannot be exposed without demolition",
          "When connections are complex or critical and direct observation is needed",
          "When the engineer determines a site visit is required based on photo review",
          "When photo quality or completeness is insufficient — we'll let you know",
        ],
      },
    ],
    ctaText: "Send Your Photos — We'll Review and Advise",
    ctaHref: "/contact/",
  },

  // ─── COMPARISON PAGES ─────────────────────────────────────────────────────

  {
    slug: "structural-engineer-vs-architect",
    title: "Structural Engineer vs Architect: What's the Difference? | Apex Grid",
    description: "Structural engineers and architects have different but complementary roles. Understanding the difference helps project teams engage the right professionals at the right time.",
    h1: "Structural Engineer vs Architect",
    kicker: "Engineering Education · Roles",
    shortAnswer: "Architects design buildings — their form, function, and occupant experience. Structural engineers design the structural systems that make those buildings stand safely. On most commercial projects, both are required and work together. The architect coordinates the project and produces the overall building design; the structural engineer provides the structural drawings, calculations, and professional engineering stamp for the structural systems.",
    sections: [
      {
        heading: "What an Architect Does",
        points: [
          "Designs the building program — space planning, circulation, aesthetics",
          "Produces architectural drawings — floor plans, elevations, sections, details",
          "Coordinates with all engineering consultants",
          "Manages code compliance for occupancy, accessibility, egress, and life safety",
          "Leads the permit application in most jurisdictions",
          "Provides architecture professional stamp on architectural sheets",
        ],
      },
      {
        heading: "What a Structural Engineer Does",
        points: [
          "Designs the structural system — framing, foundations, connections",
          "Produces structural drawings and engineering calculations",
          "Provides the professional engineering stamp for structural drawings",
          "Evaluates existing structures for proposed modifications",
          "Coordinates with MEP for rooftop equipment, penetrations, and loads",
          "Responds to structural plan check comments from the building department",
        ],
      },
      {
        heading: "When Both Are Required",
        points: [
          "Most commercial permits require both architectural and structural drawings",
          "New construction, additions, and significant renovations typically need both",
          "The architect and structural engineer work as a coordinated team",
          "Some simple structural scopes may be permitted without an architect — consult your AHJ",
        ],
      },
    ],
    ctaText: "Ask Apex Grid About Structural Engineering for Your Project",
    ctaHref: "/contact/",
  },
  {
    slug: "structural-engineer-vs-civil-engineer",
    title: "Structural Engineer vs Civil Engineer | Apex Grid Engineering",
    description: "Structural and civil engineers have overlapping but distinct specializations. Here's a practical explanation of the difference and when each is needed.",
    h1: "Structural Engineer vs Civil Engineer",
    kicker: "Engineering Education · Roles",
    shortAnswer: "Structural engineers specialize in buildings and structures — designing the framing, foundations, and connections that hold buildings up. Civil engineers specialize in site development — grading, drainage, utilities, roads, and infrastructure. Both are licensed professional engineers, and most commercial projects need both. Civil engineers design what's on and under the site; structural engineers design what's above grade inside the building.",
    sections: [
      {
        heading: "What a Structural Engineer Does",
        points: [
          "Designs building structural framing — steel, concrete, wood, masonry",
          "Designs foundations — footings, grade beams, slabs, deep foundations",
          "Evaluates existing buildings for modifications, additions, and damage",
          "Produces structural permit drawings and calculations",
          "Analyzes loads — gravity, seismic, wind, live, dead",
        ],
      },
      {
        heading: "What a Civil Engineer Does",
        points: [
          "Designs site grading and drainage",
          "Designs utility connections — water, sewer, storm drainage",
          "Designs parking lots, driveways, and site access",
          "Designs stormwater management systems",
          "Produces civil site permit drawings",
          "Coordinates with city on public improvements and right-of-way",
        ],
      },
      {
        heading: "When You Need Both",
        points: [
          "New commercial construction — civil for site, structural for building",
          "Site improvements adjacent to an existing building",
          "Retaining walls — civil (if freestanding site wall) or structural (if building-integrated)",
          "Apex Grid provides both structural and civil engineering under one contract",
        ],
      },
    ],
    ctaText: "Get Structural and Civil Engineering Under One Proposal",
    ctaHref: "/contact/",
  },
  {
    slug: "civil-engineer-vs-surveyor",
    title: "Civil Engineer vs Land Surveyor | Apex Grid Engineering",
    description: "Civil engineers and land surveyors both work on site-related projects but have different roles. Understanding the difference helps you engage the right professional.",
    h1: "Civil Engineer vs Land Surveyor",
    kicker: "Engineering Education · Roles",
    shortAnswer: "A land surveyor measures and documents existing property boundaries, topography, and physical features of a site. A civil engineer designs what gets built on that site — grading, drainage, utilities, and access. Both are typically needed on commercial site development projects — the surveyor first, then the civil engineer who designs from the survey.",
    sections: [
      {
        heading: "What a Land Surveyor Does",
        points: [
          "Establishes property boundaries and corners",
          "Measures and documents existing site topography (elevations)",
          "Documents existing improvements — buildings, utilities, easements",
          "Produces a topographic survey and boundary survey",
          "Provides the base drawing from which civil engineering design begins",
          "May produce ALTA/NSPS surveys for real estate transactions",
        ],
      },
      {
        heading: "What a Civil Engineer Does",
        points: [
          "Designs grading, drainage, and site improvements using the survey as a base",
          "Designs utility connections and site infrastructure",
          "Designs parking lots, driveways, and access improvements",
          "Produces civil permit drawings stamped by a licensed civil PE",
          "Does not survey — relies on surveyor-produced base drawings",
        ],
      },
      {
        heading: "Typical Project Sequence",
        points: [
          "Step 1: Land surveyor produces topographic and boundary survey",
          "Step 2: Architect or developer provides site plan concept",
          "Step 3: Civil engineer designs site improvements using the survey as a base",
          "Apex Grid provides civil engineering once a survey is available",
        ],
      },
    ],
    ctaText: "Get Civil Engineering for Your Site Project",
    ctaHref: "/contact/",
  },
  {
    slug: "mechanical-engineer-vs-hvac-contractor",
    title: "Mechanical Engineer vs HVAC Contractor | Apex Grid Engineering",
    description: "Mechanical engineers design HVAC systems and produce engineering drawings. HVAC contractors install equipment. Understanding the difference is critical for commercial projects.",
    h1: "Mechanical Engineer vs HVAC Contractor",
    kicker: "Engineering Education · Roles",
    shortAnswer: "A mechanical engineer designs the HVAC system — calculating loads, selecting equipment, designing ductwork, and producing stamped engineering drawings for the permit. An HVAC contractor installs the equipment and ductwork in the field. Most commercial HVAC work requires both — the mechanical engineer produces the permitted design, the contractor builds it.",
    sections: [
      {
        heading: "What a Mechanical Engineer Does",
        points: [
          "Calculates heating and cooling loads for the space",
          "Selects or specifies HVAC equipment",
          "Designs ductwork distribution and airflow",
          "Designs outside air, ventilation, and exhaust systems",
          "Produces stamped mechanical engineering drawings for the permit",
          "Responds to plan check comments on HVAC systems",
          "Does not install equipment",
        ],
      },
      {
        heading: "What an HVAC Contractor Does",
        points: [
          "Installs equipment and ductwork per the engineering drawings",
          "May size and install equipment on simple residential projects without engineering",
          "Provides equipment bids and submittals",
          "Coordinates field installation with other trades",
          "Does not produce stamped engineering drawings for commercial permits",
        ],
      },
      {
        heading: "Why Commercial HVAC Needs an Engineer",
        points: [
          "Building permits for commercial HVAC typically require stamped mechanical drawings",
          "HVAC contractors are not licensed to produce or stamp engineering drawings",
          "Improperly designed commercial systems waste energy and fail inspections",
          "Kitchen exhaust, make-up air, and specialty systems require engineering analysis",
          "Energy code compliance — Title 24 and ASHRAE 90.1 — requires engineering documentation",
        ],
      },
    ],
    ctaText: "Get Mechanical Engineering for Your HVAC Project",
    ctaHref: "/contact/",
  },
  {
    slug: "electrical-engineer-vs-electrician",
    title: "Electrical Engineer vs Electrician | Apex Grid Engineering",
    description: "Electrical engineers design power distribution systems and produce stamped drawings. Electricians install wiring and equipment. Both are needed on most commercial electrical projects.",
    h1: "Electrical Engineer vs Electrician",
    kicker: "Engineering Education · Roles",
    shortAnswer: "An electrical engineer designs the electrical system — load calculations, service sizing, panel schedules, one-line diagrams — and produces stamped drawings for the permit. An electrician installs wiring, panels, and equipment in the field. Commercial electrical projects typically require both — the engineer produces the permitted design, the licensed electrician installs it.",
    sections: [
      {
        heading: "What an Electrical Engineer Does",
        points: [
          "Calculates electrical loads for the building or space",
          "Sizes the electrical service and main distribution equipment",
          "Designs power distribution — panels, feeders, branch circuits",
          "Produces one-line diagrams and panel schedules",
          "Designs emergency and standby power systems",
          "Stamps engineering drawings for the electrical permit",
          "Responds to plan check comments on electrical systems",
        ],
      },
      {
        heading: "What a Licensed Electrician Does",
        points: [
          "Installs wiring, conduit, panels, and equipment per the engineering drawings",
          "Pulls electrical permits on residential and light commercial in some jurisdictions",
          "Does not produce stamped engineering drawings for most commercial permits",
          "Provides material and installation bids",
          "Coordinates installation with other trades in the field",
        ],
      },
      {
        heading: "When Electrical Engineering is Required",
        points: [
          "Most commercial electrical permits require stamped electrical engineering drawings",
          "Service upgrades, panel replacements, and load additions typically require engineering",
          "EV charging stations above certain amperage require engineering",
          "Emergency power systems — generators, UPS — require engineering",
          "Solar interconnection and battery storage require engineering",
        ],
      },
    ],
    ctaText: "Get Electrical Engineering for Your Commercial Project",
    ctaHref: "/contact/",
  },
  {
    slug: "geotechnical-engineer-vs-structural-engineer",
    title: "Geotechnical Engineer vs Structural Engineer | Apex Grid",
    description: "Geotechnical and structural engineers work together on foundation design — here's how their roles differ and how they coordinate.",
    h1: "Geotechnical Engineer vs Structural Engineer",
    kicker: "Engineering Education · Roles",
    shortAnswer: "Geotechnical engineers investigate subsurface conditions — soil types, bearing capacity, groundwater, and earth properties — and provide recommendations for foundation design. Structural engineers use those recommendations to design the actual foundation system. Both are professional engineers; their disciplines overlap at the foundation and work closely together on building projects.",
    sections: [
      {
        heading: "What a Geotechnical Engineer Does",
        points: [
          "Investigates subsurface soil and rock conditions",
          "Drills soil borings and collects soil samples",
          "Performs laboratory testing on soil samples",
          "Determines allowable soil bearing pressure for foundations",
          "Recommends foundation types — spread footings, grade beams, piles",
          "Evaluates expansive soils, groundwater, and settlement potential",
          "Produces a geotechnical investigation report",
        ],
      },
      {
        heading: "What a Structural Engineer Does With the Geotech Report",
        points: [
          "Uses allowable bearing pressure to size footings and grade beams",
          "Uses foundation type recommendation to select the structural system",
          "Uses soil parameters for seismic site class determination",
          "Uses expansive soil recommendations to design appropriate slabs and footings",
          "Coordinates with geotechnical engineer on unusual conditions or questions",
          "References geotechnical report in structural calculations",
        ],
      },
      {
        heading: "Typical Coordination Sequence",
        points: [
          "Geotechnical investigation begins early — it's often on the critical path",
          "Structural engineer receives geotechnical report and begins foundation design",
          "Questions on soil conditions are resolved between structural and geotechnical engineers",
          "Both engineers' stamps typically appear in the permit package",
          "Apex Grid provides both geotechnical and structural engineering under one contract",
        ],
      },
    ],
    ctaText: "Get Geotechnical and Structural Engineering Together",
    ctaHref: "/contact/",
  },
  {
    slug: "full-service-firm-vs-separate-consultants",
    title: "Full-Service Engineering Firm vs Separate Consultants | Apex Grid",
    description: "Hiring one multi-discipline engineering firm vs. managing separate structural, MEP, civil, and geotechnical consultants — the practical tradeoffs.",
    h1: "Full-Service Engineering Firm vs Separate Consultants",
    kicker: "Engineering Education · Project Delivery",
    shortAnswer: "A full-service multi-discipline engineering firm provides structural, MEP, civil, and geotechnical engineering under one contract with coordinated deliverables. Separate consultants provide each discipline independently. For most commercial projects, a full-service firm reduces coordination burden, improves schedule, and simplifies contracting — especially on multi-discipline projects where engineering coordination is critical.",
    sections: [
      {
        heading: "Advantages of a Full-Service Engineering Firm",
        points: [
          "Single point of contact for all engineering disciplines",
          "Coordinated drawings — MEP and structural are produced together, not separately",
          "Better scheduling — all disciplines on the same timeline and project kickoff",
          "Fewer RFIs — engineering conflicts resolved before they reach the field",
          "Simpler contracting — one proposal, one contract, one invoice",
          "National coverage — one firm licensed across all required states",
          "Consistent quality and process across disciplines",
        ],
      },
      {
        heading: "When Separate Consultants May Make Sense",
        points: [
          "Highly specialized scopes where a particular discipline expert is required",
          "Owner preferences or prior relationships with specific consultants",
          "Projects where only one discipline is needed",
          "Design-build projects where each trade selects its own engineer",
        ],
      },
      {
        heading: "How Apex Grid Provides Multi-Discipline Engineering",
        points: [
          "Single proposal for all required disciplines — structural, MEP, civil, and geotechnical",
          "Coordinated engineering team with internal coordination meetings",
          "Unified permit package with coordinated drawing sets across disciplines",
          `${LICENSING_COVERAGE_STATEMENT} ${PROJECT_JURISDICTION_NOTE} One firm for national clients`,
          "Business-provided postal contact in Queen Creek, AZ with national project delivery",
        ],
      },
    ],
    ctaText: "Request a Multi-Discipline Engineering Proposal",
    ctaHref: "/contact/",
  },

  // ─── PROFESSIONAL ENGINEERING EDUCATION ───────────────────────────────────

  {
    slug: "what-is-a-professional-engineer",
    title: "What Is a Professional Engineer (PE)? | Apex Grid Engineering",
    description: "A Professional Engineer is a licensed engineering professional authorized to stamp and seal engineering documents, taking professional responsibility for their accuracy.",
    h1: "What Is a Professional Engineer (PE)?",
    kicker: "Engineering Education · PE Licensing",
    shortAnswer: "A Professional Engineer (PE) is a licensed engineer who has passed the Fundamentals of Engineering exam, gained qualifying engineering experience, and passed the Principles and Practice of Engineering exam. PEs are licensed by state boards and are authorized to stamp and seal engineering documents, taking professional and legal responsibility for the engineering work they certify.",
    sections: [
      {
        heading: "PE Licensing Requirements",
        points: [
          "Pass the Fundamentals of Engineering (FE) exam, typically taken after college graduation",
          "Gain at least four years of progressive engineering experience under a licensed PE",
          "Pass the Principles and Practice of Engineering (PE) exam in the specific discipline",
          "Apply for licensure in the state where engineering work is performed",
          "Maintain licensure through continuing education requirements",
          "Many engineers hold PE licenses in multiple states where they regularly practice",
        ],
      },
      {
        heading: "Why PE Licensure Matters",
        points: [
          "Building permits require engineering drawings stamped by a licensed PE",
          "PEs have professional, legal, and ethical responsibilities for their work",
          "Only PEs can certify that engineering work meets applicable codes and standards",
          "PE licensing protects the public by requiring professional accountability",
          "Engineers without PE licenses cannot legally sign or stamp engineering documents for public buildings",
        ],
      },
      {
        heading: "PE Licenses at Apex Grid",
        points: [
          "Where a permit drawing requires a seal, the responsible professional's current license, firm authorization, discipline, and AHJ requirements are verified for the project jurisdiction",
          "Apex Grid evaluates structural, mechanical, electrical, plumbing, civil, and geotechnical scopes separately; credential availability is not inferred from a service page",
          `${LICENSING_COVERAGE_STATEMENT} ${PROJECT_JURISDICTION_NOTE}`,
        ],
      },
    ],
    ctaText: "Request PE-Stamped Engineering for Your Project",
    ctaHref: "/contact/",
  },
  {
    slug: "what-does-pe-stamp-mean",
    title: "What Does a PE Stamp Mean? | Apex Grid Engineering",
    description: "A PE stamp on engineering drawings means a licensed Professional Engineer has reviewed, approved, and taken professional responsibility for the engineering work.",
    h1: "What Does a PE Stamp Mean?",
    kicker: "Engineering Education · PE Stamp",
    shortAnswer: "A PE stamp (or PE seal) on engineering drawings means that a licensed Professional Engineer has reviewed the work, determined it meets applicable codes and engineering standards, and accepted professional responsibility for the accuracy of the engineering contained in those documents. Building departments require PE-stamped drawings because it creates professional accountability for public safety.",
    sections: [
      {
        heading: "What a PE Stamp Represents",
        points: [
          "The engineer has reviewed and approved the engineering contained in the documents",
          "The engineer accepts professional liability for the accuracy of the engineering",
          "The engineering meets applicable codes and engineering standards in the PE's professional judgment",
          "The PE is licensed in the jurisdiction where the work is performed",
          "The PE has the authority to legally certify engineering for public use",
        ],
      },
      {
        heading: "What a PE Stamp Does Not Mean",
        points: [
          "A PE stamp is not a guarantee of permit approval — the building department still reviews",
          "A PE stamp does not certify contractor means and methods or field installation",
          "A PE stamp does not transfer responsibility for construction observation to the engineer",
          "A PE stamp on someone else's drawings without independent review is an ethical violation",
        ],
      },
      {
        heading: "PE Stamps on Apex Grid Engineering Documents",
        points: [
          "Where a seal is required, the responsible PE's current license, firm authorization, discipline, and AHJ requirements are verified for the project state",
          "Any PE reviews only work within the applicable responsible-charge and professional rules",
          "License information appears on stamped documents where required for verification",
          "We confirm jurisdiction licensing before accepting each project",
        ],
      },
    ],
    ctaText: "Request PE-Stamped Engineering Drawings",
    ctaHref: "/contact/",
  },
  {
    slug: "what-is-responsible-charge",
    title: "What Is Responsible Charge in Engineering? | Apex Grid Engineering",
    description: "Responsible charge is the legal standard for PE licensing — the engineer in responsible charge has direct control over the engineering work they stamp.",
    h1: "What Is Responsible Charge in Engineering?",
    kicker: "Engineering Education · Professional Standards",
    shortAnswer: "Responsible charge means that the professional engineer who stamps a set of engineering drawings was in direct control of and responsible for the engineering work contained in those documents. State engineering boards require that the PE signing and sealing documents was actually in charge of the engineering — not simply reviewing or rubber-stamping work done entirely by others without meaningful oversight.",
    sections: [
      {
        heading: "What Responsible Charge Requires",
        points: [
          "The stamping PE must have supervised or performed the engineering work",
          "The PE must have the technical competence to understand and verify the work",
          "The PE must have had the authority to make engineering decisions",
          "Signing work the PE did not actually control is an ethical and licensing violation",
          "State engineering boards investigate responsible charge violations seriously",
        ],
      },
      {
        heading: "Why Responsible Charge Matters to Building Owners",
        points: [
          "It ensures the PE who stamped your drawings actually understands and stands behind the engineering",
          "It protects you from drawings stamped by engineers who were not actually involved",
          "It creates a clear chain of professional accountability for permit and construction purposes",
          "Drawings not in responsible charge may be challenged by the building department or in litigation",
        ],
      },
      {
        heading: "Responsible Charge at Apex Grid",
        points: [
          "Our licensed PEs are directly involved in the engineering they stamp",
          "We do not provide cursory review stamps on work we did not engineer",
          "Engineering assignments are matched to PEs who have the expertise for the project type",
          "We will not stamp plans we did not engineer — responsible charge is non-negotiable",
        ],
      },
    ],
    ctaText: "Request Engineering With Full Professional Accountability",
    ctaHref: "/contact/",
  },
  {
    slug: "why-engineers-cannot-rubber-stamp",
    title: "Why Engineers Cannot Simply Rubber Stamp Third-Party Plans | Apex Grid",
    description: "Engineers cannot legally or ethically stamp plans they did not engineer — here's why, and what the alternative is.",
    h1: "Why Engineers Cannot Simply Rubber Stamp Third-Party Plans",
    kicker: "Engineering Education · Professional Ethics",
    shortAnswer: "A licensed professional engineer cannot legally or ethically stamp drawings they did not engineer. Stamping engineering documents creates professional liability and represents to the public that the PE reviewed, approved, and takes responsibility for the work. Stamping plans produced by others without responsible charge is an ethics violation that can result in license revocation. Engineers who agree to do this are putting their licenses and the public at risk.",
    sections: [
      {
        heading: "Why Rubber Stamping Is a Licensing Violation",
        points: [
          "Engineering licensing law in every state requires the PE to be in responsible charge",
          "Stamping work the PE did not engineer misrepresents the PE's review and oversight",
          "Building departments rely on PE stamps as certification of engineering accuracy",
          "State engineering boards can revoke licenses for rubber stamping",
          "Professional liability insurance typically does not cover claims from rubber-stamped work",
        ],
      },
      {
        heading: "What to Do When You Have Unlicensed Engineering",
        points: [
          "Engage a licensed engineer to review and, if appropriate, redesign the systems",
          "A licensed engineer may be able to work from existing drawings as a starting point",
          "This is different from rubber stamping — the PE actually reviews and verifies the engineering",
          "If the existing work doesn't meet code, the PE redesigns what needs to change",
          "Engineering from contractor-produced plans is a legitimate service Apex Grid provides",
        ],
      },
      {
        heading: "Engineering From Unlicensed or Non-PE Plans",
        points: [
          "Apex Grid can engineer from contractor drawings, architectural plans, or owner-produced documents",
          "We review the existing design, verify structural and MEP adequacy, and produce PE-stamped documents",
          "This is a legitimate engineering service, not rubber stamping",
          "We will identify and correct deficiencies in the source drawings as part of our engineering scope",
        ],
      },
    ],
    ctaText: "Request Engineering From Your Existing Plans",
    ctaHref: "/contact/",
  },
  {
    slug: "what-is-engineering-quality-control",
    title: "What Is Engineering Quality Control (QA/QC)? | Apex Grid",
    description: "Engineering quality control is the internal review process that ensures engineering documents are accurate, complete, and code-compliant before delivery.",
    h1: "What Is Engineering Quality Control?",
    kicker: "Engineering Education · Quality",
    shortAnswer: "Engineering quality control (QA/QC) is the internal review process engineering firms use to verify that drawings, calculations, and engineering documents are accurate, complete, internally consistent, and code-compliant before they are issued to clients or submitted for permit. QA/QC catches errors before they reach the building department — and before they're built into the structure.",
    sections: [
      {
        heading: "What Engineering QA/QC Involves",
        points: [
          "Independent review of engineering calculations by a second engineer",
          "Drawing check for consistency with calculations",
          "Code compliance review against applicable building code edition",
          "Checking engineering against architectural plans for coordination",
          "Review of multi-discipline coordination — structural vs. MEP conflicts",
          "Review of calculations for mathematical and methodology accuracy",
          "Checking drawing completeness — all required details and notes present",
        ],
      },
      {
        heading: "Why QA/QC Matters",
        points: [
          "Engineering errors caught internally cost far less than errors caught at plan check",
          "Errors built into construction can require costly remediation or demolition",
          "QA/QC reduces plan check comments and resubmittal cycles",
          "Professional liability claims often arise from failures in QA/QC",
          "Building owners deserve engineering that was checked before it was submitted",
        ],
      },
      {
        heading: "QA/QC at Apex Grid",
        points: [
          "All permit packages receive internal drawing and calculation review",
          "Multi-discipline coordination review before permit submittal",
          "PE review of all stamped documents",
          "We use structured checklists for each project type",
          "Resubmittals include QA/QC review of all revised documents",
        ],
      },
    ],
    ctaText: "Request Engineering With Rigorous Quality Control",
    ctaHref: "/contact/",
  },
];

export const GUIDES_HUB = {
  title: "Engineering Guides: Cost, Timeline, and Professional Roles | Apex Grid",
  description: "Practical engineering guides covering cost and timeline expectations, when engineering is required, what information engineers need, professional role comparisons, and PE licensing education.",
  h1: "Engineering Guides",
  lede: "Practical answers to the most common questions about engineering costs, schedules, professional roles, and when engineering is required — written for architects, contractors, developers, and building owners.",
};
