import type { Phase0AeoPage } from "./phase0-corpus";

const founderNote = "I'm Jeremy Mills, CEO & Founder of Apex Grid Engineering and a U.S. Air Force veteran. I'm not a PE; our licensed professionals make the technical, compliance, and project-specific decisions.";

/** Apex Engineering Library — Batch 1 deepened records for the four Phase 0
 * starter questions. These bespoke records intentionally share slugs with
 * the generic Phase 0 starter tuples; generate.ts emits ALL_AEO_PAGES in
 * order with this array last, so these records are the ones that render. */
export const WAVE_LIBRARY_ANSWER_PAGES: Phase0AeoPage[] = [
  {
    slug: "how-much-does-a-pe-stamp-cost",
    title: "How Much Does a PE Stamp Cost? | Apex Grid",
    description: "A PE seal is part of responsible engineering work; its cost depends on the scope, review, design, calculations, coordination, and jurisdictional requirements.",
    h1: "How much does a PE stamp cost?",
    answer: "There is no legitimate price for a stamp by itself, because a PE seal is not a product that can be detached from the engineering behind it. What you are actually buying is review-and-seal: a licensed professional engineer, licensed in the project's state and acting under responsible charge, independently reviews the drawings and calculations, verifies the design basis, requires and confirms any revisions, and only then signs and seals. Priced that way — as engineering scope — typical ranges look like this. A narrow, single-discipline review of a complete, well-documented small set commonly runs $500 to $2,500. A small commercial project in one discipline more commonly runs $1,500 to $5,000. A multi-discipline commercial review-and-seal commonly runs $5,000 to $25,000, and higher on large or complex buildings. When the review finds that calculations are missing or the design itself needs to be redone, the scope stops being review and becomes design, and it is priced as design.\n\nThe spread inside those bands is not arbitrary. Two drawing sets for buildings of the same size can differ several-fold in review effort, because the fee follows the state of the engineering, not the square footage. A set that arrives with complete, traceable calculations, a stated code basis, and internally consistent sheets can be verified efficiently. A set that arrives as drawings alone — no calculations, no design criteria, equipment weights missing, details that contradict the plans — forces the reviewing engineer to reconstruct the design basis before any verification can start, and that reconstruction is billable engineering whether anyone planned for it or not. I have seen a clean residential structural package verified in days and a same-size package with no calculations take weeks, at several times the fee, purely on the strength of what was sent.\n\nSo the useful question is never \"what does a stamp cost\" but \"what will the review of this set, in this state, for this occupancy, actually involve\" — and the only honest answer comes after the engineer sees the set. A firm quoting a seal price for unseen drawings is telling you, in advance, how much review your money buys. Apex Grid Engineering PLLC prices review-and-seal from the set itself, in writing, with the scope and the fee stated before work begins; the sections below show how those numbers are built and how to recognize the quotes that are not built on review at all.",
    directAnswer: "A PE stamp is not sold separately; you pay for review-and-seal under responsible charge. Typical ranges: $500 to $2,500 for a single-discipline review of a complete small set, $1,500 to $5,000 for small commercial work in one discipline, and $5,000 to $25,000 or more for multi-discipline commercial review-and-seal. Apex Grid Engineering PLLC (480-490-0064) quotes from the set, in writing.",
    facts: [
      { label: "Narrow single-discipline review", value: "Commonly $500-$2,500 where the set is complete, calculations provided" },
      { label: "Small commercial, one discipline", value: "Commonly $1,500-$5,000 depending on set quality, size, and revision cycles" },
      { label: "Multi-discipline commercial review-and-seal", value: "Commonly $5,000-$25,000 or more, rising with size and complexity" },
      { label: "Hourly review work", value: "Licensed-engineer review time commonly billed in the $150-$350 per hour range when scope cannot be fixed in advance" },
      { label: "Review that becomes redesign", value: "Priced as design work, not review — triggered by missing calculations or engineering that does not verify" },
      { label: "Seal offered without seeing the set", value: "Not a legitimate quote basis in any state; responsible charge requires review first" },
    ],
    topic: "Professional Engineering",
    serviceHref: "/pe-stamp/",
    sections: [
      {
        heading: "What the fee actually buys",
        body: "A review-and-seal fee buys four things, and a quote should be traceable to all of them. Independent verification: the engineer re-checks the engineering the set depends on — loads and load paths, sizing, selections, code basis — rather than proofreading the title block. Revision cycles: findings are marked, the originating designer revises, and the engineer re-verifies the corrections before sealing, which is where a second and third pass of professional time goes. Professional responsibility: the seal puts the engineer's license, livelihood, and professional liability coverage behind the documents, and that exposure is priced into responsible work whether or not a quote itemizes it. And documentation: a review record — what was checked, what was found, what changed — that makes the sealed set defensible at plan check and afterwards. When a price seems too low against that list, the missing item is almost never the seal impression. It is the verification.",
        bullets: [
          "Independent verification of calculations and design basis, not a visual scan",
          "Marked findings, designer revisions, and re-verification before sealing",
          "The sealing engineer's license and liability stand behind the documents",
          "A review record that supports the set at plan check and beyond",
        ],
      },
      {
        heading: "How review-and-seal fees are structured",
        body: "Most legitimate review-and-seal work is quoted as a fixed fee for a defined scope, because both sides benefit when the deliverable and the number are settled before work starts. The scope names the disciplines, the documents, the number of revision cycles included, and whether plan-check response support is part of the engagement or a later phase. Hourly billing appears where the scope genuinely cannot be fixed in advance — a set of unknown quality, an investigation, an open-ended correction history — usually with a not-to-exceed figure once the engineer has seen the material. Percentage-of-construction pricing belongs to full design engagements, where the engineer of record is producing the documents, not reviewing another designer's. What the structures share is that each is anchored to a described scope. The moment a price is quoted per stamp, per sheet, or per signature with no scope behind it, you are no longer looking at an engineering fee structure at all.",
        bullets: [
          "Fixed fee for a defined review scope is the common structure",
          "Hourly with a ceiling fits sets of unknown quality or investigations",
          "Percentage pricing belongs to design engagements, not outside review",
          "Every legitimate structure is anchored to a written scope",
        ],
      },
      {
        heading: "The drivers that move a quote",
        body: "I price review work from the set, and seven drivers account for nearly all of the variation. Completeness of the design basis — calculations present or absent is the single largest driver. Number of disciplines: structural alone is one review; structural plus mechanical, electrical, and plumbing is three more, each by an appropriately licensed engineer. Condition of the set: coordinated sheets verify faster than contradictory ones. State licensure: the sealing engineer must be licensed where the building stands, and multi-state projects need each state's review arranged. Occupancy and consequence: a warehouse and a clinic with the same floor area do not carry the same review depth or liability. Turnaround: a genuine rush compresses senior engineer time and is priced like it. And site verification: most reviews proceed from records, but existing conditions that cannot be verified from documents add a field visit to the scope. None of these is knowable from a project address and a square footage, which is precisely why sight-unseen pricing fails.",
        bullets: [
          "Calculations present or absent is the largest single cost driver",
          "Each added discipline is a separate licensed review",
          "Occupancy and consequence set the review depth, not floor area alone",
          "Rush turnaround and site verification are real, priceable scope",
        ],
      },
      {
        heading: "Anatomy of a legitimate quote",
        body: "A quote you can rely on reads like a scope, not an advertisement. It identifies the project and the jurisdiction, names the disciplines and the exact documents to be reviewed, states what the engineer will do — verification, recalculation where required, marked revisions, re-verification, sealing — and what is excluded, such as redesign, site visits, or plan-check responses beyond a stated number of cycles. It names the fee, the schedule, and the assumptions: most importantly, that the fee rests on the set as received, and that missing calculations or failed verification will be reported and re-scoped rather than silently absorbed. It also identifies who seals: a licensed engineer in the project's state, in responsible charge of the review. Read any quote against that anatomy. The omissions are the information — a proposal that does not say what happens when the engineering does not check out has already answered the question.",
        bullets: [
          "Names the project, jurisdiction, disciplines, and exact documents",
          "States the review steps and the revision cycles included",
          "States exclusions and the assumption the fee rests on",
          "Identifies the sealing engineer and their licensure for the project state",
        ],
      },
      {
        heading: "Red flags: stamp-for-hire pricing",
        body: "The market for detached stamps exists, and its pricing patterns are recognizable. A firm per-stamp price quoted before the set is seen. A menu — so much per sheet, per discipline, per state — with no request for calculations. Marketing built on volume and speed: stamps in all fifty states, twenty-four-hour sealing, no questions asked. Each pattern points the same way: the review that state board rules require — the responsible-charge verification that makes a seal mean something — is not in the budget, because at those prices it cannot be. The consequences land on the buyer: plan stamping without responsible charge is a disciplinary offense for the engineer in every state, permits can be rejected or revoked when it surfaces, the documents may be effectively uninsured, and the owner is left holding engineering nobody actually verified. I discourage clients from treating a cheap seal as a bargain for the same reason I would discourage a cheap parachute: the failure mode arrives later, loaded.",
        bullets: [
          "Firm price quoted before the drawings are seen",
          "Per-sheet or per-stamp menus that never ask for calculations",
          "All-fifty-states, guaranteed-speed sealing marketed as the product",
          "A sealing engineer who cannot discuss the project's engineering",
        ],
      },
      {
        heading: "Worked example: review-and-seal on a light-industrial tenant improvement",
        body: "A representative engagement: a 7,500-square-foot light-industrial tenant improvement in the Phoenix area, where an out-of-state supplier's package needed Arizona review-and-seal for two replacement rooftop units, a small storage mezzanine, and the altered production area's mechanical, electrical, and plumbing work. The structural review came to $3,400: the engineer verified the rooftop unit loads and the mezzanine framing, and found the existing curb support undersized for the replacement unit's operating weight — one marked revision cycle, re-verified, then sealed. Mechanical and electrical review came to $4,100, covering ventilation verification for the production area and correction of a panel schedule that did not match the drawings. Plumbing and gas review added $700. Coordination and one consolidated plan-check response cycle were scoped at $500. The total was $8,700 — inside the multi-discipline band, set by the set's condition rather than its size: the calculations that did arrive were usable, which is what kept the review a review. Had the structural package arrived without calculations, the honest quote would have been a design scope at a different number, and saying so up front is part of the service.",
        bullets: [
          "Structural review-and-seal: $3,400, including one revision cycle on the curb support",
          "Mechanical and electrical review: $4,100, including panel schedule corrections",
          "Plumbing and gas review: $700",
          "Coordination and one plan-check response cycle: $500 — total $8,700",
        ],
      },
    ],
    faqs: [
      {
        question: "Is it illegal to buy a PE stamp without review?",
        answer: "For the engineer, sealing work they did not perform or independently verify under responsible charge — plan stamping — is a disciplinary violation of state board rules everywhere, exposing the license to sanction. For the buyer, the practical exposure is a permit rejected or revoked when the arrangement surfaces, documents no insurer stands behind, and engineering nobody actually checked. The seal's entire value is the review and responsibility behind it; a transaction designed to skip both buys the appearance and none of the substance.",
      },
      {
        question: "Why can't an engineer quote a seal price from square footage alone?",
        answer: "Because review effort follows the state of the engineering, not the size of the building. A complete set with traceable calculations can be verified efficiently; a drawings-only set forces the engineer to reconstruct the design basis first. Two projects with identical floor areas routinely differ several-fold in review hours. A responsible quote requires seeing the drawings, the calculations, and the jurisdiction's requirements — which is why legitimate firms ask for the set before naming a fee.",
      },
      {
        question: "Does the review-and-seal fee include responding to plan-check corrections?",
        answer: "Only if the scope says so. Some engagements include a stated number of correction-response cycles; others end at delivery of the sealed set, with plan-check support as a later phase. Neither structure is improper — what matters is that the proposal states it plainly, because most sealed sets do receive comments, and discovering at that moment that responses are unscoped is an avoidable friction.",
      },
      {
        question: "What happens to the fee if the review finds real errors?",
        answer: "The findings are reported and the path is agreed before extra work is done. Minor errors are usually corrected by the originating designer inside the included revision cycles. Fundamental problems — a missing lateral system, calculations that do not support the drawings — change the scope: either the designer redesigns and resubmits for re-review, or the engagement converts to design work under the sealing firm's responsible charge, re-priced in writing. What does not happen, in a legitimate engagement, is sealing over the errors to hold the original price.",
      },
      {
        question: "How long does review-and-seal take?",
        answer: "For a clean, complete, single-discipline set, the review itself commonly runs from several business days to about two weeks. Multi-discipline sets, thin calculations, and sets needing substantive revision commonly run two to four weeks, driven as much by the originating designer's revision turnaround as by the reviewer's work. A firm timeline can only be given against the actual set — the same discipline as the fee.",
      },
      {
        question: "Is a cheaper online stamp ever legitimate?",
        answer: "Online delivery is not the problem — most legitimate review-and-seal is coordinated remotely, from records and calculations sent electronically. The test is what the service does, not where it sits: does it require your calculations, verify them, mark revisions, seal under a named engineer licensed in your state, and stand behind the work? A remote firm that does those things is practicing engineering. A service whose offer is the seal itself, priced sight unseen, is selling the one thing that cannot legitimately be sold.",
      },
    ],
    extraLinks: [
      { label: "\"Stamp only\" vs review-and-seal: what the difference means", href: "/answers/pe-stamp-only-vs-review-and-seal/" },
      { label: "What is a PE stamp?", href: "/answers/what-is-a-pe-stamp/" },
      { label: "Can an engineer seal another engineer's drawings?", href: "/answers/can-an-engineer-seal-another-engineers-drawings/" },
      { label: "How long does plan check take?", href: "/answers/how-long-does-plan-check-take/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "how-much-does-mep-engineering-cost",
    title: "How Much Does MEP Engineering Cost? | Apex Grid",
    description: "MEP engineering fees depend on discipline scope, building complexity, existing conditions, coordination, deliverables, jurisdiction, and schedule—not a universal published price.",
    h1: "How much does MEP engineering cost?",
    answer: "MEP engineering — the mechanical, electrical, and plumbing design of a building's systems — is most often bought as a fixed fee for a named set of drawings, calculations, and permit documents, and the realistic planning ranges depend on what kind of building it is. Straightforward office and retail work commonly prices between about $1.75 and $3.50 per square foot for the full three disciplines. Finished office and medical-adjacent tenant improvements more commonly land between $3.00 and $5.50 per square foot. Restaurants, clinical space, and other system-dense buildings commonly run $5.00 to $9.00 per square foot. Multifamily projects are frequently priced per dwelling unit instead, commonly in the $1,800 to $3,200 per unit range for the MEP package. Expressed against construction, full MEP design on commercial work commonly falls between roughly 4% and 8% of the MEP construction cost. Every one of those figures is a planning band for a defined scope, not a rate card — the sections below show what moves a real project within them.\n\nThe reason quotes for the same building can differ by half is that \"MEP design\" is not one deliverable. One proposal may cover load calculations, equipment selection, duct and piping design, power distribution, lighting design with energy-code controls, plumbing and gas systems, and coordination against the structure — through permit, with correction cycles included. Another may cover schematic-level layouts for the same three letters, with energy documentation, equipment schedules, and plan-check responses priced as later phases. The buildings are identical; the scopes are not, and the fees are honestly different. Comparing the two totals without normalizing what each includes is how owners end up buying the cheaper proposal and the more expensive project.\n\nApex Grid Engineering PLLC quotes MEP work as a written scope with a fixed fee wherever the inputs allow it: the disciplines, the deliverables, the calculation package, the energy documents, and the number of permit cycles are stated in the proposal, so the number you approve is the number the work costs. What follows is the framework we price from — the fee structures, the bands by building type, the scope lines commonly inside or outside, and the drivers that move a fee once the building is real.",
    directAnswer: "MEP engineering is usually a fixed fee for a defined scope. Typical ranges: $1.75 to $3.50 per square foot for straightforward office and retail, $3.00 to $5.50 for finished tenant improvements, $5.00 to $9.00 for restaurants and clinical space, or 4% to 8% of MEP construction cost. Apex Grid Engineering PLLC (480-490-0064) quotes scope and fee in writing.",
    facts: [
      { label: "Office and retail, straightforward systems", value: "Commonly $1.75-$3.50 per square foot for full mechanical, electrical, and plumbing design" },
      { label: "Finished office or medical-adjacent tenant improvement", value: "Commonly $3.00-$5.50 per square foot, driven by system and control density" },
      { label: "Restaurants and clinical space", value: "Commonly $5.00-$9.00 per square foot; kitchen exhaust, gas, and systems concentrate the work" },
      { label: "Multifamily buildings", value: "Commonly priced per unit at roughly $1,800-$3,200 per dwelling unit for the MEP package" },
      { label: "Against construction cost", value: "Full MEP design commonly falls near 4%-8% of the MEP construction cost" },
      { label: "Single-system or assessment work", value: "Commonly hourly, broadly $125-$275 per hour blended by staff level, or a small fixed fee" },
    ],
    topic: "MEP Engineering",
    serviceHref: "/services/mep/",
    sections: [
      {
        heading: "The fee structures in use, and what each one is for",
        body: "Four structures account for nearly every MEP proposal you will see. A fixed fee for a defined scope is the standard for permit design: the deliverables are knowable, so the price is stated whole. A percentage of construction cost appears on larger design engagements, usually converted to a fixed figure once the scope and budget settle, because an open percentage rewards cost growth nobody wants. Hourly billing fits work whose extent cannot be known in advance — troubleshooting an existing system, an assessment, support during a dispute — and responsible hourly proposals name the rates by staff level and estimate the hours. Per-unit pricing is the multifamily convention, where the engineering repeats across similar dwellings and the unit count is the honest measure of the work. None of these is inherently fairer than the others. What makes any of them fair is that the scope is written down tightly enough that both sides know what the number bought.",
        bullets: [
          "Fixed fee for a defined scope: the standard for permit design",
          "Percentage of construction: usually converted to fixed once scope settles",
          "Hourly: for assessments and work whose extent is unknowable in advance",
          "Per-unit: the multifamily convention, where designs repeat",
        ],
      },
      {
        heading: "Why the bands spread so widely by building type",
        body: "MEP fee per square foot tracks system density, not floor area. An office floor is mostly repetitions of one condition: a cooling and ventilation pattern, a lighting pattern, a modest plumbing count. A restaurant concentrates a commercial kitchen's exhaust and makeup air, gas service, grease waste, high domestic hot water demand, and dense electrical loads into a small footprint — the engineering hours per square foot multiply accordingly. Clinical space adds medical gas, pressure relationships between rooms, emergency power distribution, and infection-control-driven ventilation rates. A warehouse inverts the pattern: large area, few systems, and a fee per square foot that can fall below the office band. The building's program is the price driver; the tape measure just scales it.",
        bullets: [
          "System density, not floor area, sets engineering hours per square foot",
          "Restaurants concentrate kitchen, gas, grease, and hot water systems in small footprints",
          "Clinical work adds medical gas, pressure relationships, and emergency power",
          "Warehouses and shell space can price below the office band",
        ],
      },
      {
        heading: "What is usually inside the fee — and what is usually not",
        body: "A full MEP permit package typically includes heating and cooling load calculations, equipment selection and schedules, duct and piping layout and sizing, ventilation design, power distribution and panel schedules, lighting layout with the controls the energy code requires, plumbing and gas sizing, and the energy compliance documentation for the project's code path. The lines most often outside — legitimately, when they are stated — are worth knowing by name. Fire sprinkler working drawings are commonly produced by the sprinkler contractor as delegated design against the engineer's performance criteria, unless the scope says the engineer draws them. Low-voltage systems — data, security, audio-visual — are commonly designed by the technology vendor. Commercial kitchen equipment layout belongs to the foodservice consultant, with MEP providing the utility connections. Site utilities beyond the building line belong to the civil engineer. Commissioning is performed by a commissioning authority, not the designer. None of these exclusions is a defect; every one of them becomes a defect when it is discovered mid-project instead of read in the proposal.",
        bullets: [
          "Typically inside: loads, equipment, distribution, lighting and controls, plumbing and gas, energy documents",
          "Sprinkler working drawings: commonly delegated design by the installing contractor",
          "Low-voltage and kitchen equipment design: commonly by the vendor or foodservice consultant",
          "Site utilities and commissioning: owned by the civil engineer and the commissioning authority",
        ],
      },
      {
        heading: "The scope drivers that move a real fee",
        body: "Once the building type is set, five drivers explain most of the remaining spread. Existing conditions: designing into a documented building with reliable as-builts is one fee; designing into an undocumented one, where systems must be surveyed and assumptions verified in the field, is a larger one. Energy modeling: a prescriptive compliance package is a modest work item, while a whole-building performance model — California Title 24 performance path, or an ASHRAE 90.1 appendix G model where a program requires it — is a genuine analysis scope of its own. Coordination depth: a set coordinated in plan against the structure is priced differently from a three-dimensional model coordinated clash-by-clash with every other discipline, because the engineer is resolving in the model what would otherwise surface in the field. Phasing and packaging: phased permits, shell-and-tenant splits, and fast-track packages each multiply submittals and coordination. And permit cycles: a proposal that includes correction responses through approval is carrying more than one that ends at first submittal.",
        bullets: [
          "Undocumented existing conditions add survey and field verification scope",
          "Performance energy modeling is an analysis scope of its own",
          "Model-based clash coordination prices above plan-only coordination",
          "Phased permits and included correction cycles each add real work",
        ],
      },
      {
        heading: "What a useful MEP proposal states",
        body: "A proposal you can manage a project against reads like an inventory. It names the disciplines and, for each, the deliverables: the calculations, the drawing sheets or sheet types, the schedules, and the energy documents. It states the design inputs it relies on — architectural backgrounds, equipment selections, utility information — and the assumptions it makes where inputs are open. It states the meeting and coordination expectations, the number of permit submittal and correction cycles included, the site visits included, and the exclusions by name, including the delegated-design lines from the section above. It states the fee, what would change it, and how changes are priced. I write proposals this way because it protects the client as much as the firm: when a mid-project question starts with \"is that included,\" the proposal should answer it in one reading. If the proposals cannot be lined up line by line, you are comparing two numbers, not two scopes — and the cheaper number usually belongs to the thinner scope.",
        bullets: [
          "Deliverables named per discipline: calculations, sheets, schedules, energy documents",
          "Inputs relied on and assumptions stated, not implied",
          "Permit cycles and site visits counted, not implied unlimited",
          "Exclusions named, including delegated-design lines",
        ],
      },
      {
        heading: "Worked example: MEP design for a 30-unit multifamily building",
        body: "A representative scope: ground-up MEP design for a three-story, 30-unit multifamily building of about 36,000 square feet, wood-framed over a concrete podium, with central water heating, split-system heating and cooling per unit, and a small leasing office and amenity space. The mechanical design — load calculations per unit type, ventilation, exhaust, and the amenity systems — was scoped at $34,500. The electrical design — service sizing, unit panels, house loads, lighting and energy-code controls, and the podium's life-safety distribution — came to $27,900. The plumbing design — domestic water, sanitary and vent, gas distribution, and the central water heating plant — came to $24,000. The combined MEP fee was $86,400: about $2,880 per dwelling unit and roughly $2.40 per square foot, sitting inside the multifamily band because the unit types repeated and the systems, while complete, were conventional. The same building with structured parking ventilation, a pool, and per-unit energy modeling would price visibly higher, and a garden-style project of spread-out small buildings prices differently again — which is the point of the bands: they orient a budget, and then the scope sets the number.",
        bullets: [
          "Mechanical design: $34,500 — loads, ventilation, exhaust, amenity systems",
          "Electrical design: $27,900 — service, distribution, lighting and controls",
          "Plumbing design: $24,000 — water, sanitary, gas, central water heating",
          "Combined: $86,400 — about $2,880 per unit and $2.40 per square foot",
        ],
      },
    ],
    faqs: [
      {
        question: "Is a percentage-of-construction fee or a fixed fee better?",
        answer: "For permit design, a fixed fee for a defined scope is usually the better instrument: the number is settled, and neither side's interests move with the construction budget. Percentage pricing is common on large engagements and is typically converted to a fixed figure once scope and budget are set. What matters more than the structure is the scope definition underneath it — a percentage of an undefined scope is no more predictable than a fixed fee for one.",
      },
      {
        question: "Are permit fees and energy reports included in the MEP fee?",
        answer: "Permit fees charged by the jurisdiction are never part of an engineering fee; they are paid to the authority. Energy compliance documentation is usually part of an MEP scope on commercial work — as forms and calculations on a prescriptive path, or as a modeled analysis on a performance path — but because the modeling scope varies, a clear proposal names it as its own line rather than leaving it inside the word \"design.\" If your proposal is silent on energy documents, ask before you sign, not at plan check.",
      },
      {
        question: "Why did three firms quote the same building at such different prices?",
        answer: "Almost always because they scoped three different jobs. The usual hidden differences are the calculation package (full loads and sizing versus schematic layouts), energy documentation, coordination depth, permit cycles included, and the delegated-design exclusions. Normalize the scopes line by line and the spread usually narrows to an honest difference in rates and efficiency. A quote that stays far below the others after normalization is telling you something is not in it.",
      },
      {
        question: "Does MEP design include the fire sprinkler system?",
        answer: "Usually as performance design, not working drawings. On most projects the MEP or fire protection engineer establishes the sprinkler design criteria — hazard classification, density, water supply basis — and the installing sprinkler contractor produces the working plans and hydraulic calculations as delegated design, reviewed against those criteria. Full engineer-drawn sprinkler design is available but is a distinct scope that costs more, and a proposal should say which of the two it includes.",
      },
      {
        question: "Can I hire MEP for just one system, like the HVAC?",
        answer: "Yes — single-discipline and single-system scopes are routine: an HVAC design for a tenant improvement, a service upgrade calculation, a plumbing design for a restaurant. The fee follows the bounded scope, often as a modest fixed fee or hourly work for assessments. The caution is coordination: a single system still touches the others (a rooftop unit is also an electrical load and a structural load), and a good single-discipline proposal states how those interfaces are handled.",
      },
      {
        question: "What information produces a firm MEP quote?",
        answer: "The project address and jurisdiction, the architectural floor plans or a dimensioned description of the space, the building's use and occupancy, the systems in scope, any existing-condition records for renovations, equipment preferences or selections already made, and the target permit date. With those, a firm can scope the deliverables and quote a fixed fee. Without the plans and the use, any number offered is a range wearing a costume — useful for budgeting, not for contracting.",
      },
    ],
    extraLinks: [
      { label: "What is MEP engineering?", href: "/answers/what-is-mep-engineering/" },
      { label: "What is Title 24?", href: "/answers/what-is-title-24/" },
      { label: "How long does plan check take?", href: "/answers/how-long-does-plan-check-take/" },
      { label: "How much does a PE stamp cost?", href: "/answers/how-much-does-a-pe-stamp-cost/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "how-long-does-plan-check-take",
    title: "How Long Does Plan Check Take? | Apex Grid",
    description: "Plan-check duration depends on the authority, submittal completeness, queue, project type, review cycles, corrections, and applicant actions; it is not a universal promise.",
    h1: "How long does plan check take?",
    answer: "Plan check is the building department's review of your submitted drawings and calculations for code compliance before a permit can issue, and the honest planning answer is a range, not a date. Minor work that qualifies for over-the-counter review can clear the same day or within a week. A first review of a typical commercial tenant improvement commonly takes three to six weeks. New commercial buildings and multifamily projects commonly see four to eight weeks for the first review, and twelve weeks or more on large or complex buildings. Because most projects receive a correction list and go through at least one resubmittal cycle, the total trip from submittal to an issued permit commonly runs six to sixteen weeks — roughly two to three times the first-review time. Anyone quoting a single number without asking what you are building, where, and how complete your set is, is guessing.\n\nHere is what is actually happening during those weeks. When a permit application is filed, the authority having jurisdiction — the city or county building department, or a private plan-review firm working under contract to it — routes the set to plans examiners by discipline. Structural reviewers check the design against the adopted building code, typically the International Building Code with local amendments, and against ASCE 7 load criteria. Architectural reviewers check occupancy, egress, fire separation, and accessibility. Mechanical, electrical, and plumbing reviewers check their systems against the adopted mechanical, electrical, and plumbing codes, and an energy reviewer checks the compliance documentation. Fire protection, civil and site work, planning, and public works may run as separate reviews, in parallel in a well-run department. The review ends in approval, approval with conditions noted for the field, or a correction list. Approval does not transfer design responsibility away from the engineer of record who sealed the drawings.\n\nThe most common planning error is treating the first-review target as the permit date. A published target — and statutory windows such as California's thirty-day completeness determination under Government Code section 65943 — describes one step: the department's first look, or whether the application is complete enough to process. It does not count the weeks the set sits with your design team answering corrections, the back-check queue, the separate fire marshal, health department, or utility sign-offs that must land before issuance, or final fee reconciliation and permit paperwork. Experienced teams budget all of it. The applicant's own response time is the one block fully in the applicant's control, and on many projects it rivals the department's review time.",
    directAnswer: "Plan check typically takes three to six weeks for a first review of a commercial tenant improvement and four to eight weeks for a new commercial building, with total time to an issued permit commonly running six to sixteen weeks once correction and resubmittal cycles are counted. Apex Grid Engineering PLLC (480-490-0064) prepares permit sets and correction responses.",
    facts: [
      { label: "Over-the-counter scope", value: "Same day to about one week where the jurisdiction offers counter review for defined minor work" },
      { label: "Single-family homes and additions", value: "First review commonly two to four weeks in a normally loaded department" },
      { label: "Commercial tenant improvement", value: "First review commonly three to six weeks; permit in roughly six to ten with one correction cycle" },
      { label: "New commercial or multifamily building", value: "First review commonly four to eight weeks; complex buildings twelve weeks or more" },
      { label: "Back-check after corrections", value: "Commonly one to three weeks for a targeted re-review of the corrected items" },
      { label: "California schools and hospitals", value: "DSA and HCAI state reviews run on queues measured in months, often phased" },
    ],
    topic: "Plan Check",
    serviceHref: "/services/plan-check/",
    sections: [
      {
        heading: "Timelines by jurisdiction and project type",
        body: "Timelines vary by jurisdiction type as much as by project size. Large metropolitan departments carry deep backlogs and specialized reviewers, and a first review measured in months is not unusual on a complex project there. Mid-size cities and counties often publish first-review targets in the range of ten to twenty business days for commercial work and roughly meet them in normal workload periods. Smaller jurisdictions with lighter volume can turn a straightforward set in one to three weeks, but a two-person department also slows down the week a reviewer is out. Two California state reviewers sit outside the local system entirely: public school construction goes to the Division of the State Architect, and hospital work goes to the Department of Health Care Access and Information, and both run queues measured in months, with phased approvals used to keep projects moving. Texas cities such as Houston run high-volume permit centers where a clean set can move quickly, but site, utility, and floodplain reviews sit in separate queues. Phoenix-metro jurisdictions generally work from published turnaround targets and electronic review, with cycles measured in weeks when the set is complete.",
        bullets: [
          "Published targets describe the first review, not the permit date",
          "State reviewers such as DSA and HCAI run separate queues from local departments",
          "Expedited and third-party review options exist in some jurisdictions and not others",
          "Ask about the current backlog at intake — it changes with workload and season",
        ],
      },
      {
        heading: "What actually drives the cycle time",
        body: "Five things set the pace, in order of how much influence you have over them. First, the completeness and internal coordination of the submitted set: a set whose structural calculations match the drawings, whose sheets agree with each other, and whose code analysis is stated on the cover sheet gets shorter, cleaner correction lists than a set the examiner has to reconstruct. Second, the number of separate approvals the project triggers — a restaurant adds a health department review, and a change of occupancy can pull in planning and fire reviews that a like-for-like project avoids. Third, department workload and staffing at the moment you submit, which no one controls. Fourth, design stability: changing the layout, the equipment, or the structure mid-review can void completed review work and restart portions of it. Fifth, code triggers that add disciplines — high-rise provisions, hazardous materials, floodplain construction, and deferred submittals such as trusses or sprinkler hydraulics, reviewed later on their own clocks. I tell clients to plan around the first two and treat the rest as weather: real, but not theirs to manage.",
        bullets: [
          "Set completeness and coordination is the largest factor the applicant controls",
          "Each separate agency sign-off adds its own queue to the critical path",
          "Design changes during review can restart completed review work",
          "Deferred submittals are reviewed later, on separate timelines",
        ],
      },
      {
        heading: "How the corrections and resubmittal cycle works",
        body: "The corrections cycle has a mechanics of its own, and working it well is where weeks are saved. The department issues a correction list citing the code section behind each item. The design team answers with a written response letter that takes every comment in order — what was changed, on which sheet, or the code basis for why no change is warranted — and resubmits revised sheets with the changes clouded and delta-tagged, revised calculations where the engineering changed, and the response letter on top. That package goes back into a queue for a back-check, which is normally a targeted review of the corrected items rather than a fresh full review, commonly one to three weeks. A second, shorter correction list is common and is not a sign of a failing project; a third full-scale list usually means the original set had coordination problems or the responses are not closing items. Partial resubmittals — structural revisions now, mechanical later — usually stall the file, because reviewers close cycles on complete packages, not fragments.",
        bullets: [
          "Answer every comment in writing, in order, by its list number",
          "Cloud and delta-tag every changed sheet so the reviewer can verify quickly",
          "Resubmit one consolidated package, not discipline-by-discipline fragments",
          "Keep a comment log with an owner and a disposition for every item",
        ],
      },
      {
        heading: "What plan check costs",
        body: "Costs follow the same pattern of a public fee plus professional time. Most jurisdictions charge a plan check fee set as a percentage of the building permit fee in the adopted fee schedule — a plan review fee of sixty-five percent of the permit fee is a long-standing convention in valuation-based schedules, though the exact figure and basis are local. The first back-check or two are often included; departments may charge additional review fees for third and later resubmittals, and expedited or third-party review, where offered, is billed on top. Separately, the engineering time to answer corrections is real work: for a small commercial set, a correction-response cycle commonly runs from the high hundreds into the low thousands of dollars per discipline involved, depending on whether the comments ask for drafting coordination or for genuine redesign and recalculation. A proposal stating a defined number of included cycles is being honest; one promising unlimited cycles at no charge is usually excluding them somewhere else.",
        bullets: [
          "Plan check fees are set by the jurisdiction's adopted fee schedule",
          "Later resubmittal rounds may carry additional review fees",
          "Correction-response engineering is scoped per cycle and per discipline",
          "Expedited review, where offered, is a fee on top of standard review",
        ],
      },
      {
        heading: "Worked example: a restaurant tenant improvement, week by week",
        body: "Take a 2,800-square-foot restaurant tenant improvement in an existing Phoenix-area shopping center, submitted as a complete, coordinated set. Intake and completeness screening take the first few days. The building, structural, and mechanical reviews run concurrently and the first correction list lands at the end of week four; the county health review for the food-service layout runs on its own track and returns in week five. The comments are ordinary: an egress width correction at the kitchen corridor, a grease interceptor sizing letter, rooftop unit anchorage calculations for the replacement unit, and energy compliance forms for the new lighting. The design team turns the response around in ten days, sheets clouded, with a point-by-point letter. The back-check takes two weeks and clears everything except one fire sprinkler item, which closes with a targeted letter and a single revised sheet. The permit issues in week nine. Run the same project with the rooftop unit submitted without structural support information and one intake rejection for incompleteness, and the identical project permits in week thirteen or fourteen — the difference is not the department, it is the package and the response discipline.",
        bullets: [
          "Weeks 0-1: intake and completeness screening",
          "Weeks 2-5: concurrent discipline reviews and the parallel health review",
          "Weeks 5-7: design team correction response, ten working days",
          "Weeks 7-9: back-check, one targeted closure item, permit issued",
        ],
      },
      {
        heading: "How to legitimately shorten plan check",
        body: "The legitimate ways to shorten plan check are unglamorous. Hold a pre-application meeting on anything unusual and ask what the department wants to see. Submit every discipline together, coordinated against the same architectural backgrounds. Put the code analysis — occupancy, construction type, allowable area, egress — on the cover sheet where the examiner looks for it. Answer every correction in writing, by number. Keep the design frozen during review unless a correction forces a change. Check at intake whether the project qualifies for over-the-counter, expedited, or third-party review. And treat response turnaround as schedule-critical work, because the clock that runs while the set sits in your office is yours, not the department's. Apex Grid Engineering PLLC prepares coordinated permit sets and writes plan-check correction responses for commercial, multifamily, and industrial projects; if you are holding a correction list, send the project address, the drawings and calculations as they stand, and the comments you have received, or call 480-490-0064.",
        bullets: [
          "Pre-application meeting for unusual occupancies or code questions",
          "All disciplines submitted together against one set of backgrounds",
          "Code analysis stated on the cover sheet, where examiners look first",
          "Response turnaround treated as schedule-critical, not administrative",
        ],
      },
    ],
    faqs: [
      {
        question: "Can plan check be expedited?",
        answer: "In some jurisdictions, yes. Options include paid expedited review, over-the-counter review for defined small scopes, and acceptance of third-party plan review — each with local eligibility rules, and none of them lowers the code standard being reviewed. Ask at intake what the authority offers; if expedited review is not offered, the honest levers are set completeness and fast, complete correction responses.",
      },
      {
        question: "Does the clock stop while we respond to corrections?",
        answer: "Effectively, yes. Most departments and their portals track reviewer time and applicant time separately. The weeks your team spends revising drawings and writing responses are applicant time, and on many projects they rival the department's own review time — which is why response turnaround deserves real schedule pressure.",
      },
      {
        question: "How many correction rounds are normal?",
        answer: "One full correction list followed by a short second list is the normal pattern for a coordinated commercial set. A third round is not automatically a problem if it is short and narrow. A third round that reads like a first review — new comments across every discipline — usually signals that the original set had coordination problems or that responses are restating positions instead of closing items.",
      },
      {
        question: "What is a back-check?",
        answer: "A back-check is the reviewer's targeted re-review of a resubmittal. Instead of reviewing the whole set again, the examiner verifies that each correction item was addressed as the response letter describes, checks the revised sheets and calculations the letter points to, and clears or carries forward each item. Clear response letters and clouded revisions make back-checks faster because verification, not searching, is the work.",
      },
      {
        question: "Is a published review target a guaranteed permit date?",
        answer: "No. A published target describes the intended time for one step, usually the first review, under normal workload. It excludes applicant response time, back-check queues, outside agency approvals, and issuance processing, and it is a target rather than a commitment. Budget the full sequence, with the target as one block inside it.",
      },
      {
        question: "Who performs plan check — city staff or private firms?",
        answer: "Either. Many cities and counties employ their own plans examiners; many others contract plan review to private firms, especially for overflow, specialized occupancies, or structural review. The standard applied is the jurisdiction's adopted code either way, the permit decision remains the authority's, and appeals run through the authority having jurisdiction, not the reviewing firm.",
      },
    ],
    extraLinks: [
      { label: "What is a plan-check correction?", href: "/answers/what-is-a-plan-check-correction/" },
      { label: "How does plan check resubmittal work?", href: "/answers/how-does-plan-check-resubmittal-work/" },
      { label: "Third-party plan check explained", href: "/answers/third-party-plan-check-explained/" },
      { label: "How much does a PE stamp cost?", href: "/answers/how-much-does-a-pe-stamp-cost/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "what-is-title-24",
    title: "What Is Title 24? California Building Standards | Apex Grid",
    description: "Title 24 is California's compilation of building standards; Part 6 contains the California Energy Code and its compliance documentation requirements.",
    h1: "What is Title 24?",
    answer: "Title 24 is the California Building Standards Code: the complete set of building regulations for the state of California, published by the California Building Standards Commission as Title 24 of the California Code of Regulations. When people on a project say \"Title 24,\" they usually mean one part of it — Part 6, the Building Energy Efficiency Standards, also called the California Energy Code — which sets mandatory requirements for insulation, fenestration, heating and cooling, water heating, and lighting, and which must be documented on signed compliance forms before a building department will issue a permit. Both meanings matter. The full code governs how nearly every building in California is designed and built, and Part 6 is the part that adds an energy compliance workstream, with its own forms, calculations, and verification steps, to almost every California permit.\n\nEnforcement is local. Cities and counties adopt Title 24 and enforce it through their building departments as the authority having jurisdiction, and they may adopt amendments — for energy, local \"reach codes\" that exceed Part 6, including all-electric requirements in some cities, are adopted through a California Energy Commission process and filed with the state. State agencies enforce the code for the buildings in their charge, including the Division of the State Architect for public schools. The practical point: the code is statewide, but the submittal checklist and any local amendments come from the jurisdiction where the building sits.",
    directAnswer: "Title 24 is the California Building Standards Code — the state's complete building code, published as Title 24 of the California Code of Regulations — and in project shorthand it means Part 6, the California Energy Code, whose signed compliance documentation is required before a California permit issues. Apex Grid Engineering PLLC (480-490-0064) prepares Part 6 documentation.",
    facts: [
      { label: "Part 2 — California Building Code", value: "General building and structural requirements, based on the International Building Code" },
      { label: "Part 2.5 — California Residential Code", value: "One- and two-family dwellings, based on the International Residential Code" },
      { label: "Part 3 — California Electrical Code", value: "Electrical requirements, based on the National Electrical Code" },
      { label: "Part 4 — California Mechanical Code", value: "Mechanical requirements, based on the Uniform Mechanical Code" },
      { label: "Part 5 — California Plumbing Code", value: "Plumbing requirements, based on the Uniform Plumbing Code" },
      { label: "Part 6 — Building Energy Efficiency Standards", value: "The California Energy Code: envelope, HVAC, water heating, and lighting requirements and compliance forms" },
      { label: "Part 11 — CALGreen", value: "Green building standards: water, waste diversion, materials, and EV charging measures" },
      { label: "Code cycle", value: "Republished every three years; 2022 edition effective January 1, 2023, 2025 edition effective January 1, 2026" },
    ],
    topic: "Energy Compliance",
    serviceHref: "/services/energy-compliance/",
    sections: [
      {
        heading: "The parts of Title 24",
        body: "The parts map to the disciplines at the table: Part 1 is administrative; Part 2, the California Building Code, carries structural and life-safety requirements on the framework of the International Building Code; Part 2.5 covers dwellings; Parts 3, 4, and 5 govern electrical, mechanical, and plumbing work; Part 8 addresses historic buildings, Part 9 is the Fire Code, Part 10 covers existing buildings, and Part 12 collects referenced standards. A design team lives mostly in Parts 2 through 6 and 11 — and a correction list citing Title 24 can come from any of them. The whole code is republished on a three-year cycle: the 2022 edition took effect January 1, 2023, and the 2025 edition takes effect January 1, 2026, with the edition in effect at permit application generally governing the project.",
        bullets: [
          "Part 2 (CBC) carries structural and life-safety requirements",
          "Parts 3, 4, and 5 govern electrical, mechanical, and plumbing work",
          "Part 6 is the energy code — the usual meaning of the shorthand",
          "Part 11 (CALGreen) runs alongside Part 6",
        ],
      },
      {
        heading: "Part 6, the energy code, in depth",
        body: "Part 6 deserves the closest look, because it is the part that generates work on ordinary projects. The energy standards were first adopted in 1978 and are updated by the California Energy Commission on the same three-year rhythm, to reduce the energy cost and peak demand of buildings over their operating lives. Part 6 regulates the building envelope — insulation, fenestration, air leakage — together with space conditioning, service water heating, indoor and outdoor lighting and controls, and pool and spa equipment. Recent cycles added solar and battery requirements for many new buildings. California is divided into sixteen climate zones, and requirements differ by zone: what complies in coastal San Diego does not automatically comply in the Central Valley or the mountains. Above all of it sits a layer of mandatory measures that apply under either compliance path.",
        bullets: [
          "Regulates envelope, HVAC, water heating, lighting, and pool and spa systems",
          "Sixteen climate zones, with requirements that differ by zone",
          "Mandatory measures apply under both compliance paths",
          "Recent cycles added solar and battery requirements for many new buildings",
        ],
      },
      {
        heading: "Prescriptive vs performance: the two compliance paths",
        body: "There are two ways to comply, and choosing between them is a genuine design decision. The prescriptive approach is a checklist: every regulated component meets its prescribed value — wall assembly, window U-factor and solar heat gain, equipment efficiency, lighting power allowance — with no trade-offs between components. It is fast and predictable for small, conventional buildings, and rigid the moment a design departs from the tables, as a glass-heavy storefront quickly does. The performance approach instead models the whole building in software approved by the Energy Commission — CBECC-Res for residential work and CBECC-Com for nonresidential, plus approved commercial alternatives — and compares the proposed design's modeled energy use against a standard-design baseline generated from the prescriptive rules. Beat the baseline and the design complies, which lets a team trade a more efficient mechanical system or better lighting controls against the storefront glazing the prescriptive path rejected. Most substantial commercial projects take the performance path; most small residential projects stay prescriptive.",
        bullets: [
          "Prescriptive: every component meets its table value, no trade-offs",
          "Performance: modeled whole-building energy use must beat a standard-design baseline",
          "CEC-approved software includes CBECC-Res and CBECC-Com",
          "Performance path enables trade-offs between systems",
        ],
      },
      {
        heading: "The paperwork trail: forms, HERS, and acceptance testing",
        body: "Compliance is proven on paper, in three stages, and the paper trail is what plan check actually reviews. At design, the team registers and completes the certificate of compliance — the CF1R for residential projects, the NRCC for nonresidential — which enters the permit set and states the path, the inputs, and the margin. During construction, installers complete installation certificates — CF2R or NRCI. At final, verification certificates — CF3R or NRCV — cover measures requiring field verification, some performed by a certified HERS rater independent of the installer. Nonresidential controls additionally require acceptance testing by a certified technician before final inspection. The forms are prepared by a documentation author; the responsible designer signs for the design's compliance, and the recognized specialist credential in this work is the Energy Commission's Certified Energy Analyst designation. A set that reaches plan check with the wrong forms or inputs that do not match the drawings will draw energy comments just as surely as a structural set with missing calculations.",
        bullets: [
          "Design stage: CF1R (residential) or NRCC (nonresidential) certificate of compliance",
          "Construction stage: CF2R / NRCI installation certificates by the installers",
          "Final stage: CF3R / NRCV verification certificates, some by an independent HERS rater",
        ],
      },
      {
        heading: "Part 11 CALGreen and local reach codes",
        body: "Part 11, CALGreen, runs alongside Part 6 and is frequently confused with it. Its mandatory measures are not, for the most part, energy calculations: waste diversion, indoor water reduction, low-emitting materials, bicycle parking, and electric vehicle charging scaled to the parking count. Its voluntary Tier 1 and Tier 2 measure sets matter because many cities adopt a tier, in whole or in part, as their local reach standard — so the CALGreen checklist in the permit set may be the statewide floor or a stricter local version, and the team has to establish which before the set is drawn. I ask about local amendments at the start of every California project, because designing to the state floor in a reach-code city is a correction cycle waiting to happen.",
        bullets: [
          "CALGreen mandatory measures cover water, waste, materials, and EV charging",
          "Tier 1 and Tier 2 sets are often adopted locally as reach standards",
          "Reach energy codes can exceed Part 6, including all-electric requirements",
          "Confirm the local amendment package before the set is drawn",
        ],
      },
      {
        heading: "Who Title 24 hits, and what the documentation costs",
        body: "Title 24 hits every California permit applicant — owners, architects, engineers, and builders — on new buildings, and on additions and alterations to the extent the alteration rules reach. Those trigger rules are specific: a roof replacement, an HVAC changeout, a window replacement, and a lighting alteration each carry their own Part 6 requirements for the work being done, while an untouched existing building is not retroactively dragged into current compliance. Additions must comply for the new work, and some measures look at the combined existing-plus-addition condition. Outside California, Title 24 has no force at all, and California does not adopt the IECC used elsewhere — out-of-state models, forms, and software do not transfer. For the documentation itself, as typical market ranges: a prescriptive residential report for a production-style home commonly runs a few hundred dollars; a custom home, an ADU with a performance run, or a small commercial report more commonly falls between roughly five hundred and fifteen hundred dollars; and a nonresidential performance model with the full NRCC package starts in the low thousands and rises with size and complexity, with HERS verification and acceptance testing billed as separate field services. What the fee buys is not the form; it is the analysis that keeps the energy review from becoming a correction cycle.",
        bullets: [
          "Alterations trigger Part 6 requirements specific to the work being done",
          "Untouched existing buildings are not retroactively brought into compliance",
          "California does not adopt the IECC — out-of-state documentation does not transfer",
          "Documentation ranges from a few hundred dollars (residential) to the low thousands and up (nonresidential models)",
        ],
      },
      {
        heading: "Worked example: a retail shell in Climate Zone 12",
        body: "Consider a new 6,800-square-foot retail shell in Climate Zone 12, in the Sacramento Valley, with a storefront-heavy elevation. Run prescriptively, the design fails: the glazing cannot meet the prescriptive fenestration limits alongside the lighting design as drawn. The team moves to the performance approach. The CBECC-Com model holds the storefront, and the design earns its margin back with higher-efficiency rooftop units, a tighter envelope specification, and occupancy and daylighting controls in the sales area — measures the team has to actually draw, not just model. The NRCC certificate enters the permit set with its compliance margin printed on it, the energy reviewer checks model inputs against the drawings, and construction proceeds with NRCI certificates, acceptance testing, and the triggered verification steps, each closed before final inspection — the standard shape of a California commercial project, and why energy work starts with the design, not after it. Apex Grid Engineering PLLC prepares Title 24 Part 6 documentation — prescriptive reports and performance energy models, with the CF1R and NRCC certificates coordinated to the permit drawings — as part of California MEP and permit packages; to scope a project, send the address and the architectural set or a description of the building, or call 480-490-0064.",
        bullets: [
          "Prescriptive path failed on fenestration limits for the storefront design",
          "Performance model traded HVAC efficiency and lighting controls for the glazing",
          "NRCC certificate submitted in the permit set with the compliance margin shown",
          "Installation certificates, acceptance testing, and verification closed before final",
        ],
      },
    ],
    faqs: [
      {
        question: "Is Title 24 just the energy code?",
        answer: "No. Title 24 is the entire California Building Standards Code — building, residential, electrical, mechanical, plumbing, fire, existing-building, and green standards in numbered parts. The energy code is Part 6. The shorthand persists because Part 6 most often adds a distinct documentation workstream to a project, but a correction list citing Title 24 can come from any part.",
      },
      {
        question: "Does Title 24 apply to existing buildings?",
        answer: "Not retroactively to untouched buildings. It applies through the addition and alteration rules: new work must comply, and specific replacements — roofing, HVAC changeouts, windows, lighting alterations — carry their own Part 6 requirements. Part 10, the California Existing Building Code, governs how the code applies to existing structures.",
      },
      {
        question: "What is the difference between Title 24 and the IECC?",
        answer: "They are different energy codes from different authorities. Title 24 Part 6 is California's own standard, developed by the California Energy Commission, with California climate zones, compliance software, and certificate forms. The IECC is a model code published by the International Code Council and adopted, usually with amendments, by other states. California does not adopt the IECC, so an IECC report does not satisfy a California permit.",
      },
      {
        question: "How often does Title 24 change, and which edition applies to my project?",
        answer: "The code is republished on a three-year cycle: the 2022 edition took effect January 1, 2023, and the 2025 edition takes effect January 1, 2026. The edition in effect when the permit application is submitted generally governs the project, so a submittal that slips across a January 1 effective date can require re-documentation under the new edition. Confirm the rule with the local building department near a cycle boundary.",
      },
      {
        question: "Who can prepare Title 24 compliance documentation?",
        answer: "The forms are prepared by a documentation author using Energy Commission-approved software, and the project's responsible designer — the architect or engineer of record — signs the certificate of compliance. The specialist credential in this field is the Energy Commission's Certified Energy Analyst. Verification steps requiring a HERS rater must be done by a certified rater independent of the installer.",
      },
      {
        question: "Do I always need HERS verification on a California project?",
        answer: "No. HERS verification is required only for the specific measures the compliance approach triggers — certain duct, airflow, refrigerant-charge, and envelope measures listed on the project's own CF1R or NRCC. The certificate states which verifications apply; a project whose path triggers none of them has no HERS scope to schedule.",
      },
    ],
    extraLinks: [
      { label: "Title 24 vs IECC: what is the difference?", href: "/answers/title-24-vs-iecc/" },
      { label: "How does energy code compliance work?", href: "/answers/how-does-energy-code-compliance-work/" },
      { label: "Energy modeling vs Title 24", href: "/answers/energy-modeling-vs-title-24/" },
      { label: "How much does MEP engineering cost?", href: "/answers/how-much-does-mep-engineering-cost/" },
      { label: "Get an engineering estimate", href: "/estimate" },
    ],
    founderNote,
  },
  {
    slug: "michigan-professional-engineer-license-lookup",
    title: "Michigan Professional Engineer License Lookup: How to Verify a PE License | Apex Grid",
    description: "How to verify a Michigan PE license in LARA's official lookup: what the record shows, how to check the firm behind the seal, and what to do when no record appears.",
    h1: "Michigan professional engineer license lookup",
    answer: "Michigan professional engineer licenses are issued and verified by the Michigan Department of Licensing and Regulatory Affairs (LARA), through its Bureau of Professional Licensing and the Board of Professional Engineers, under Article 20 of the Michigan Occupational Code. The verification itself is a free public search — LARA's official license lookup, run on the state's Accela portal at https://aca-prod.accela.com/MILARA/GeneralProperty/PropertyLookUp.aspx — and it takes a few minutes: enter the engineer's name or license number, open the record, and confirm that the license type is Professional Engineer, the status is Active, and the expiration date is in the future. Only an engineer licensed in Michigan may sign and seal engineering documents for a Michigan project — a seal from an engineer whose Michigan license is expired, lapsed, or nonexistent is a plan-check problem waiting to be found by someone less friendly than you.\n\nWhat the lookup proves is narrow and important: on the day you check, the state shows this person holding this license in this status. It does not prove the engineer is the right specialist for your building type, that they were in responsible charge of the set you were handed, or that a firm using their seal is organized the way Michigan expects. The sections below walk the lookup step by step, show how to read the record and check the firm behind the engineer, and what to do when the search comes back empty.",
    directAnswer: "Verify a Michigan PE license free in LARA's official Accela lookup: search the engineer's name or license number and confirm Professional Engineer type, Active status, and a future expiration date.",
    facts: [
      { label: "Who issues Michigan PE licenses", value: "Michigan Department of Licensing and Regulatory Affairs (LARA), Bureau of Professional Licensing, under the Board of Professional Engineers" },
      { label: "Governing law", value: "Michigan Occupational Code (Act 299 of 1980), Article 20" },
      { label: "Where to verify", value: "LARA's official license lookup on the state Accela portal — free, no account required" },
      { label: "Search by", value: "The engineer's last name or Michigan license number" },
      { label: "What the record shows", value: "Licensee name, license type and number, status, and expiration date" },
      { label: "What to confirm", value: "Type: Professional Engineer · Status: Active · Expiration date in the future" },
    ],
    topic: "Michigan PE License Lookup",
    serviceHref: "/pe-stamp/",
    sections: [
      {
        heading: "How to run the lookup, step by step",
        body: "Start from the official source, not a search engine's first result — license data is republished by third-party directories that lag the state's record and sometimes invent details to fill gaps. LARA's own lookup is the Accela license search at https://aca-prod.accela.com/MILARA/GeneralProperty/PropertyLookUp.aspx , the same portal Michigan's licensing pages point to. From there the search is deliberately plain: no account, no fee, no application.",
        bullets: [
          "Open LARA's official license lookup (the Accela portal linked above)",
          "Search by the engineer's last name; if you have it, the license number is the sharper tool",
          "Pick the record whose license type reads Professional Engineer — one person can hold several Michigan licenses",
          "Open the full record and read the status and expiration date, not just the search-results line",
        ],
      },
      {
        heading: "What the record shows — and how to read it",
        body: "A Michigan PE record shows the licensee's name, the license type and number, the license status, and the expiration date. Three of those fields do the real work. The type must be Professional Engineer — Michigan licenses many professions through the same portal, and a similarly named credential is not this one. The status must be Active: an expired or lapsed license means the engineer is not currently authorized to practice or seal in Michigan, whatever their history. And the expiration date must be ahead of the work — Michigan PE licenses renew on a two-year cycle with continuing-education requirements, and a license that lapses between a proposal and a submittal is a common, preventable failure. One limit to keep in view: the portal shows license facts, not a practice history — public disciplinary outcomes are published by the Bureau separately, in its disciplinary action reports.",
        bullets: [
          "Type: Professional Engineer — not a related trade or technician credential",
          "Status: Active — expired or lapsed means not currently authorized to seal Michigan work",
          "Expiration in the future — and re-check if the project runs past it",
          "License number on the record should match the number in the seal on your drawings",
        ],
      },
      {
        heading: "How to check the firm behind the engineer",
        body: "Michigan licenses engineers as individuals, so the firm check runs through a person, not a company registry entry. When a firm proposes to seal Michigan work, ask it to name — in writing — the Michigan-licensed professional engineer who will be in responsible charge of your project, then run that person through the lookup exactly as above. The seal that lands on your drawings carries the sealing engineer's name and license number; match both against the state record before the set goes to the authority having jurisdiction. A firm that treats the question as an insult, or offers a seal without naming who stands behind it, has answered a different question than the one you asked — believe that answer too.",
        bullets: [
          "Ask the firm to name its Michigan PE in responsible charge for your project",
          "Verify that named person in the LARA lookup — type, status, expiration",
          "Match the name and license number in the drawing seal to the state record",
          "Repeat the check for each discipline being sealed, not just the lead",
        ],
      },
      {
        heading: "If the lookup finds nothing",
        body: "An empty result is a finding, not a verdict. Work the innocent causes first: name spellings (hyphenated and maiden names, initials filed as first names), a mistyped license number, a license issued or renewed so recently the public record has not caught up, and a license that exists under a different credential type. Search on the last name alone before concluding anything. If the record still does not appear, contact the Bureau of Professional Licensing and ask them to confirm the person's status directly. What not to do: do not submit drawings on an unverifiable seal, and do not accuse an engineer of practicing without a license on the strength of one failed search. Both errors are expensive; the phone call is not.",
        bullets: [
          "Re-search on last name only, and try alternate spellings before concluding",
          "Confirm the license number digit by digit against the seal or the firm's letterhead",
          "Escalate to the Bureau of Professional Licensing for a direct confirmation",
          "Hold the submittal, not the accusation, until the bureau answers",
        ],
      },
      {
        heading: "What verification does not prove",
        body: "A verified license establishes that the state authorizes this engineer to practice. It does not establish that the engineer is a good fit for your building type, that the set you hold was actually produced or reviewed under their responsible charge, or that the authority having jurisdiction will accept the documents — the AHJ's review is its own gate. Verification is the floor, not the ceiling: it removes the one risk that can be removed in five minutes, so your remaining diligence — references, relevant project history, and the quality of the firm's questions about your project — goes to risks that actually require judgment. The fastest way to confirm any firm's Michigan coverage — including ours — is the same lookup described on this page.",
        bullets: [
          "Licensed is not the same as experienced in your building type",
          "A firm is not verified because one of its engineers is",
          "The seal must still reflect responsible charge over the actual set",
        ],
      },
    ],
    faqs: [
      {
        question: "Is the Michigan PE license lookup free?",
        answer: "Yes. LARA's license search is a public record check on the state's Accela portal — no account, no fee, and no permission from the engineer is needed. If a website offers to sell you the same verification, it is selling you a copy of a free record, usually a staler one.",
      },
      {
        question: "Can I verify a Michigan engineering firm the same way?",
        answer: "Not directly — Michigan licenses professional engineers as individuals, so the lookup verifies people. For a firm, get the name of the Michigan-licensed PE who will be in responsible charge of your project, verify that person, and match the name and license number in the seal on your drawings to the state record.",
      },
      {
        question: "What does it mean if an engineer's status is not Active?",
        answer: "It means the engineer is not currently authorized to practice professional engineering or seal documents in Michigan. Work sealed while a license is lapsed can be rejected at plan check; ask the engineer to resolve the status with the Bureau of Professional Licensing before relying on the seal.",
      },
      {
        question: "How long does a Michigan PE license last?",
        answer: "Michigan PE licenses run on a two-year renewal cycle, with continuing-education requirements attached to renewal. The controlling fact for any project is the expiration date on the engineer's own record — check it when you engage the engineer, and again if the project schedule runs past it.",
      },
      {
        question: "The engineer who sealed my drawings is not in the lookup. What now?",
        answer: "First, rule out the innocent causes: search on the last name alone, try alternate spellings, and confirm the license number in the seal digit by digit. If the record still does not appear, ask the Bureau of Professional Licensing to confirm the person's status directly — and hold the submittal until it does.",
      },
    ],
    extraLinks: [
      { label: "PE stamp services in Michigan", href: "/pe-stamp/michigan/" },
      { label: "What is a PE stamp?", href: "/answers/what-is-a-pe-stamp/" },
      { label: "How much does a PE stamp cost?", href: "/answers/how-much-does-a-pe-stamp-cost/" },
      { label: "\"Stamp only\" vs review-and-seal: what the difference means", href: "/answers/pe-stamp-only-vs-review-and-seal/" },
    ],
    founderNote,
  },
];
