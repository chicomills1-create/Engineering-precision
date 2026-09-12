/**
 * Source content for California ADU structural-engineering pages.
 *
 * This module deliberately keeps the research record separate from the HTML
 * generator. A renderer can turn each record into a static page without
 * assuming that a statewide rule is a city-specific promise.
 */

export type AduPageKind = "state" | "city";

export interface AduSection {
  heading: string;
  body: string;
}

export interface AduFaq {
  question: string;
  answer: string;
}

export interface CaliforniaAduPage {
  kind: AduPageKind;
  slug: string;
  title: string;
  description: string;
  h1: string;
  kicker: string;
  lede: string;
  authority: {
    name: string;
    process: string;
  };
  codeConditions: string;
  physicalConstraints: string;
  sections: AduSection[];
  permitSteps: string[];
  timelineGuidance: string;
  faqs: AduFaq[];
  internalLinks: Array<{ label: string; href: string }>;
  sources: string[];
}

const STRUCTURAL_LINKS: Array<{ label: string; href: string }> = [
  { label: "California structural engineering", href: "/structural-engineering/" },
  { label: "Permit-ready engineering packages", href: "/permit-engineering/" },
  { label: "Plan-check response engineering", href: "/permit-engineering/plan-check-responses/" },
  { label: "California Title 24 compliance", href: "/title-24/" },
  { label: "Contact Apex Grid Engineering", href: "/contact/" },
];

/**
 * The state record is not a substitute for a city handout. It explains the
 * state floor and identifies the local building department as the permitting
 * authority, which is the honest statewide description for an ADU.
 */
const CALIFORNIA_STATE_PAGE: CaliforniaAduPage = {
  kind: "state",
  slug: "california-adu-structural-engineering",
  title: "California ADU Structural Engineering | Permit Drawings",
  description:
    "California ADU structural engineering for additions, conversions, and detached units, coordinated with local building departments and site conditions.",
  h1: "California ADU Structural Engineering",
  kicker: "Accessory Dwelling Unit Engineering",
  lede:
    "An ADU still needs a structure that works at its actual site. California ADU structural engineering translates the existing house, proposed framing, foundation conditions, and local seismic requirements into calculations and permit drawings for the city or county that will review the application.",
  authority: {
    name: "The city or county building department having jurisdiction; the California Department of Housing and Community Development (HCD) publishes ADU guidance and the California Building Standards Commission publishes the statewide codes.",
    process:
      "An ADU application is submitted to the local building department, often with planning or zoning review coordinated by that agency. The reviewing authority checks the site and construction documents against the applicable California Building Standards Code, Government Code ADU provisions, and local objective standards; HCD is not the permit counter for an ordinary private ADU.",
  },
  codeConditions:
    "California Government Code section 65852.2 establishes statewide ADU rules and ministerial pathways, but local objective zoning standards, fire requirements, utilities, historic-resource rules, and the adopted California Building Standards Code still affect the design. The exact structural package depends on whether the work is a detached new unit, an addition, a garage conversion, or an alteration of existing space.",
  physicalConstraints:
    "California sites vary from soft coastal soils and liquefaction-prone fills to steep hillsides, expansive inland soils, wildfire exposure, and dense lots with limited access. Existing foundations, undocumented remodels, retaining walls, utility trenches, and the connection between new and old framing must be verified rather than inferred from a city name or a stock plan.",
  sections: [
    {
      heading: "What the structural scope actually studies",
      body:
        "The engineer reviews the architectural layout and available existing-condition information, then evaluates gravity loads, lateral resistance, diaphragm and shear-wall paths, openings, roof or floor additions, and the foundation interface. A conversion may need a different investigation from a detached unit: removing a garage door, for example, can change the wall line and the bracing path even when the footprint does not change. Where the record is incomplete, field verification and selective exposure may be needed before a responsible design can be sealed.",
    },
    {
      heading: "California code is a floor, not a permit approval",
      body:
        "The California Residential Code and local amendments govern many one- and two-family ADU structural details, while the project facts determine whether additional provisions apply. Seismic design is particularly important throughout the state, but the governing design category, soil assumptions, irregularities, and foundation solution are project-specific. The structural engineer coordinates with the architect, geotechnical professional when warranted, and the local reviewer instead of promising that a standard detail will be accepted everywhere.",
    },
    {
      heading: "Coordinate structure with the rest of the permit set",
      body:
        "An ADU permit package can also involve site drainage, sewer or water capacity, electrical service, mechanical equipment, fire separation, energy compliance, and local planning constraints. Structural sheets should agree with the architectural openings, Title 24 documentation, equipment locations, and civil or utility work. Apex Grid can prepare a defined engineering scope after reviewing the jurisdiction, existing documents, site photographs, and proposed plans; the local authority retains approval responsibility.",
    },
  ],
  permitSteps: [
    "Confirm the property’s city or county jurisdiction, parcel constraints, existing plans, proposed ADU type, and whether planning, historic, fire, flood, or coastal review is triggered.",
    "Have the design team establish existing conditions and the proposed architectural geometry; arrange a field visit, survey, or geotechnical input when the site or existing structure makes those inputs necessary.",
    "Prepare structural calculations and drawings coordinated with the architectural, MEP, civil, fire-separation, and California energy-compliance documents required by the local submittal checklist.",
    "Submit through the responsible city or county building department’s current portal or counter process and respond to that authority’s comments with revised sheets or calculations when requested.",
    "After permit issuance, keep construction changes under engineering review; field conditions and substitutions can require a permit revision rather than an informal drawing change.",
  ],
  timelineGuidance:
    "Government Code section 65852.2 includes a 60-day ministerial action rule for a complete ADU application in circumstances described by the statute, with an application generally deemed approved if the agency does not act within that period. That statutory review rule is not a promise of total project duration: design, surveys, owner revisions, utility or fire review, corrections, resubmittal, permit issuance, and construction are separate schedule items. Confirm the current statute and local intake checklist before setting a project date.",
  faqs: [
    {
      question: "Does every California ADU need a structural engineer?",
      answer:
        "The answer depends on the scope and the local building department’s submittal requirements. A new detached unit, addition, seismic alteration, unusual foundation, or substantial garage conversion commonly needs engineered calculations or details; some simple residential work may be accepted under prescriptive provisions. The responsible design professional should confirm the required scope with the local authority rather than treating a PE seal as an automatic requirement or an optional formality.",
    },
    {
      question: "Can a California ADU use a standard structural plan?",
      answer:
        "A standard plan can be a starting point, but it does not establish that the existing house, soil, slope, setbacks, utilities, seismic conditions, or local amendments match the plan. Site-specific adaptation and professional responsibility remain necessary, especially where the ADU attaches to an existing building or changes an exterior wall or garage opening.",
    },
    {
      question: "What information should I send for an ADU structural proposal?",
      answer:
        "Useful intake material includes the address and jurisdiction, a survey or site plan if available, architectural plans, photographs of the existing foundation and framing, prior permits or drawings, the proposed construction type, and known slope, soil, flood, fire, or historic constraints. Missing information is itself a schedule and fee consideration; it should be identified before a fixed scope is promised.",
    },
    {
      question: "Does structural engineering include Title 24 or the ADU permit?",
      answer:
        "Structural engineering addresses the load-resisting system and related structural permit documents. Title 24 energy compliance, utility approvals, planning review, and the building permit are separate responsibilities, although the disciplines need to coordinate. The city or county—not the engineer—decides whether the complete application is approvable.",
    },
  ],
  internalLinks: STRUCTURAL_LINKS,
  sources: [
    "https://www.hcd.ca.gov/policy-and-research/accessory-dwelling-units",
    "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?sectionNum=65852.2.&lawCode=GOV",
    "https://www.dgs.ca.gov/BSC/Codes",
    "https://www.energy.ca.gov/programs-and-topics/programs/building-energy-efficiency-program",
  ],
};

export const CALIFORNIA_ADU_PAGES: CaliforniaAduPage[] = [
  CALIFORNIA_STATE_PAGE,
  {
    kind: "city",
    slug: "los-angeles-adu-structural-engineering",
    title: "Los Angeles ADU Structural Engineering | LADBS Plans",
    description:
      "ADU structural engineering for Los Angeles properties, coordinated with LADBS plan check, hillside and fire constraints, and existing-building conditions.",
    h1: "Los Angeles ADU Structural Engineering",
    kicker: "Los Angeles County Metro · City of Los Angeles",
    lede:
      "A Los Angeles ADU is reviewed against a real parcel—not just a statewide floor plan. Structural design must account for LADBS submittal requirements, the existing house, seismic force paths, and site conditions that can change from a flat interior lot to a hillside, liquefaction, or high-fire area.",
    authority: {
      name: "City of Los Angeles Department of Building and Safety (LADBS), with City Planning and other agencies when the parcel triggers additional review.",
      process:
        "LADBS accepts building permit applications through its permit and plan-check channels, including electronic plan review options described by the department. City Planning zoning and ADU resources help establish eligibility and site rules; LADBS reviews the construction documents and issues the building permit after required corrections and clearances are addressed.",
    },
    codeConditions:
      "Los Angeles applies the Los Angeles Building Code and Residential Code as part of the locally adopted California Building Standards Code, together with city zoning and ADU regulations. A project can also encounter hillside grading or construction rules, Very High Fire Hazard Severity Zone requirements, a protected structure or historic review, and objective zoning constraints that are not resolved by the state ADU statute alone.",
    physicalConstraints:
      "Los Angeles spans basin soils, older neighborhoods with additions of uncertain provenance, steep hillside streets, narrow rear-yard access, liquefaction zones, and wildfire-prone hillsides. An engineer should verify the existing foundation and wall lines and should not assume that a garage slab, retaining wall, or undocumented conversion can support a new second story or detached unit.",
    sections: [
      {
        heading: "LADBS review starts with the parcel and existing building",
        body:
          "Before sizing a beam or footing, the design team needs to identify the City of Los Angeles parcel, the proposed ADU category, and any City Planning overlays. LADBS plan check can require a clear connection between architectural dimensions and structural calculations. For an attached addition or garage conversion, the critical work is often the interface with existing framing: new openings, cripple-wall changes, roof loads, and anchorage need documented assumptions rather than a generic California detail.",
      },
      {
        heading: "Hillside and fire conditions can change the engineering",
        body:
          "A hillside lot may involve slope stability, retaining structures, stepped foundations, access for construction, and separate grading or planning considerations. A Very High Fire Hazard Severity Zone location can affect exterior assemblies and coordination with the fire code, while liquefaction mapping can prompt a closer look at foundations and soil information. These are parcel questions to check through City Planning and LADBS resources before finalizing the structural scope.",
      },
      {
        heading: "Design for the way Los Angeles is actually built",
        body:
          "Many Los Angeles ADUs are inserted behind an occupied house, over or beside a garage, or into a constrained rear yard. That makes construction sequencing, temporary support, utility clearances, and access as important to the practical design as the gravity calculations. A coordinated package should show the load path and connection details that a contractor can build while preserving the existing residence’s stability.",
      },
    ],
    permitSteps: [
      "Use LADBS and City Planning resources to confirm the parcel, ADU eligibility, zoning overlays, hillside or fire-zone flags, and whether a separate clearance is needed.",
      "Document the existing residence, garage or accessory structure, grades, retaining conditions, and access; obtain architectural plans and a survey or other site information appropriate to the scope.",
      "Prepare LADBS-ready structural drawings and calculations coordinated with architectural, Title 24, fire-separation, utility, and any grading documents.",
      "Submit through the current LADBS plan-check or permit channel, track City Planning or other clearances, and respond to each plan-check comment with revised documents.",
      "Obtain the building permit before construction and route field changes through the design professional and LADBS revision process when they affect the approved work.",
    ],
    timelineGuidance:
      "California’s ADU statute contains a ministerial review rule, including a 60-day action provision for a complete application in the statutory circumstances. That is not a guaranteed LADBS permit date or a complete design-to-construction schedule. City Planning clearances, hillside or fire review, incomplete existing-condition information, plan-check corrections, and permit issuance can extend the overall duration; ask LADBS what it considers a complete submittal for this parcel.",
    faqs: [
      {
        question: "Does a Los Angeles hillside ADU need more than structural drawings?",
        answer:
          "Possibly. A hillside parcel can trigger grading, slope, retaining, drainage, planning, or fire-related requirements in addition to the building structural package. LADBS and City Planning determine the applicable clearances. The structural engineer should coordinate the foundation and retaining assumptions with the site professionals rather than treating a hillside ADU like a flat-lot garage conversion.",
      },
      {
        question: "Can an existing Los Angeles garage become an ADU without a foundation investigation?",
        answer:
          "Not necessarily. The engineer must determine whether the existing slab, footings, walls, and roof can support the proposed use and any changes, including a new opening or added floor. Older, altered, or undocumented garages may require field verification or selective exposure before the engineer can responsibly rely on them.",
      },
      {
        question: "Who approves the Los Angeles ADU permit?",
        answer:
          "LADBS is the building-permit authority, while City Planning and other departments may provide required zoning or site clearances. Apex Grid can prepare engineering documents and responses within its scope, but LADBS and the City decide whether the application complies and whether a permit is issued.",
      },
    ],
    internalLinks: [
      ...STRUCTURAL_LINKS,
      { label: "Los Angeles engineering information", href: "/locations/california/los-angeles/" },
    ],
    sources: [
      "https://www.ladbs.org/services/adu",
      "https://planning.lacity.gov/plans-policies/adu",
      "https://www.ladbs.org/our-services/plan-check-permit",
      "https://planning.lacity.gov/zoning",
      "https://www.ladbs.org/services/core-services/plan-check",
      "https://www.ladbs.org/services/core-services/inspection",
    ],
  },
  {
    kind: "city",
    slug: "san-diego-adu-structural-engineering",
    title: "San Diego ADU Structural Engineering | Permit Plans",
    description:
      "San Diego ADU structural engineering for coastal, canyon, and inland sites, coordinated with Development Services and local fire and zoning review.",
    h1: "San Diego ADU Structural Engineering",
    kicker: "San Diego County Metro · City of San Diego",
    lede:
      "San Diego ADU engineering has to reconcile the city’s Development Services process with a wide range of terrain: coastal lots, canyon rims, older bungalow neighborhoods, and inland heat. The structural package should show how a new unit or conversion works at this parcel, including its seismic, foundation, drainage, and fire interfaces.",
    authority: {
      name: "City of San Diego Development Services Department (DSD), with Planning, Public Utilities, and San Diego Fire-Rescue review when the project requires it.",
      process:
        "DSD provides the City’s ADU information, permit intake, plan review, and inspection pathways. Applicants use the City’s current online or in-person submittal instructions, and a project may be routed to zoning, fire, public utilities, or other reviews before DSD can issue the building permit.",
    },
    codeConditions:
      "San Diego enforces locally adopted California building, residential, energy, plumbing, mechanical, and fire provisions through its municipal code and DSD review. The city’s ADU materials and zoning rules should be checked for the current objective standards; coastal, environmentally sensitive, historic, parking, and fire-related conditions can affect the design even where state law supplies the ADU eligibility pathway.",
    physicalConstraints:
      "San Diego’s canyons and mesa edges create variable slopes, erosion and retaining concerns, and difficult construction access. Coastal parcels can add corrosion, coastal-zone, and height or visual-context questions; inland neighborhoods can bring expansive soils and high cooling demand. Existing homes and detached garages also vary widely in age and seismic detailing, so field evidence matters.",
    sections: [
      {
        heading: "Start with San Diego DSD’s ADU route",
        body:
          "The City’s DSD ADU resources are the starting point for confirming the permit path and current submittal requirements. Structural drawings should be coordinated to the architectural site plan, including property lines, grades, existing structures, fire separation, and utility routes. For a conversion, the engineer must distinguish a change of occupancy or use from a new load path: a former garage may need wall, diaphragm, anchorage, or foundation work even if its footprint is retained.",
      },
      {
        heading: "Canyon edges and coastal parcels deserve early screening",
        body:
          "A proposed unit near a canyon may need a site professional to address slope, drainage, or retaining conditions, and equipment or foundations may be constrained by the edge. A coastal or older urban lot may instead make corrosion, tight setbacks, and construction staging the key issues. DSD, Planning, and other City reviewers—not a generalized ADU checklist—determine which overlays and clearances apply to the address.",
      },
      {
        heading: "Tie seismic design to the existing San Diego house",
        body:
          "California seismic design is not just a calculation value inserted into a template. The engineer traces the lateral path through the proposed walls, diaphragms, collectors, hold-downs, and foundation, then checks the connection to existing construction. This is particularly important for attached additions, second-story ADUs, and garage conversions where new openings interrupt the original bracing system.",
      },
    ],
    permitSteps: [
      "Confirm the address with San Diego DSD and screen zoning, coastal, historic, canyon, environmentally sensitive, parking, and fire conditions identified by the City.",
      "Gather architectural plans, site grades and access information, records for the existing house or garage, and photographs or field measurements needed to establish the existing structural system.",
      "Develop calculations and drawings for the selected ADU type, coordinated with DSD’s checklist, Title 24 documents, fire separations, drainage, utilities, and any geotechnical or retaining work.",
      "Submit through the current DSD permit process; answer DSD and routed-agency comments in a consolidated response package and resubmit revised documents as required.",
      "Schedule inspections only after the permit is issued and obtain engineering review of construction changes that alter the approved load path or foundation.",
    ],
    timelineGuidance:
      "The state ADU statute’s ministerial provisions include a 60-day action rule for a complete application in the circumstances specified by Government Code section 65852.2. It does not measure design production, site investigations, DSD intake completeness, routed reviews, correction cycles, permit issuance, or construction. San Diego’s current DSD instructions should control the project schedule, and no review window should be presented as a guaranteed total duration.",
    faqs: [
      {
        question: "Is a San Diego canyon ADU automatically prohibited?",
        answer:
          "No blanket answer is responsible. Canyon, slope, environmentally sensitive, drainage, and fire conditions are parcel-specific and may require additional review or engineering. DSD and Planning determine the applicable rules; a structural proposal should reserve the right to coordinate geotechnical, civil, or retaining design when the site evidence calls for it.",
      },
      {
        question: "What makes a San Diego garage conversion structurally different?",
        answer:
          "Removing the garage door and adding habitable finishes can change the wall’s lateral role, openings, anchorage, ventilation, and foundation assumptions. The existing slab and walls also need to be verified. The engineer should design the actual infill and connections rather than assume that a new interior layout leaves the structure unchanged.",
      },
      {
        question: "Does Development Services approve the whole ADU design?",
        answer:
          "DSD is the City’s principal building-permit authority, but Planning, Fire-Rescue, Public Utilities, and other agencies may review their portions. Engineering supports the application; DSD and the responsible City agencies decide compliance and approval.",
      },
    ],
    internalLinks: [
      ...STRUCTURAL_LINKS,
      { label: "San Diego engineering information", href: "/locations/california/san-diego/" },
    ],
    sources: [
      "https://www.sandiego.gov/development-services/permits/adu",
      "https://www.sandiego.gov/development-services/permits",
      "https://www.sandiego.gov/development-services/zoning",
      "https://www.sandiego.gov/development-services/inspections",
      "https://www.sandiego.gov/fire",
    ],
  },
  {
    kind: "city",
    slug: "anaheim-adu-structural-engineering",
    title: "Anaheim ADU Structural Engineering | Permit Drawings",
    description:
      "Anaheim ADU structural engineering for garage conversions, additions, and detached units, coordinated with the City’s planning and building permit process.",
    h1: "Anaheim ADU Structural Engineering",
    kicker: "Orange County · City of Anaheim",
    lede:
      "Anaheim’s ADU work ranges from older neighborhood garage conversions to additions in planned communities and detached units on constrained residential lots. The structural design needs to follow the City of Anaheim’s current ADU and building-permit path while addressing the existing framing, seismic load path, utilities, and the specific lot—not merely the California statewide rules.",
    authority: {
      name: "City of Anaheim Planning and Building Division, with Anaheim Fire & Rescue, Public Works, and utility review where applicable.",
      process:
        "Anaheim publishes ADU information through its Planning and Building resources and routes applications through the City’s building-permit process. The applicant must use the current City checklist and submittal method, satisfy planning and building review, respond to comments, and arrange inspections after permit issuance; a project can require additional review for fire, right-of-way, grading, or utilities.",
    },
    codeConditions:
      "Anaheim applies the California Building Standards Code as adopted locally and implements ADU provisions through its municipal zoning and development regulations. Local objective standards, fire separation, the City’s planning review, and any applicable overlay or property-specific restriction remain relevant; a state-law exemption does not remove the need to comply with building, energy, utility, or life-safety requirements.",
    physicalConstraints:
      "Anaheim’s flat central neighborhoods can have tight rear-yard access, older unreinforced or altered garage construction, and mature trees or utility corridors. Properties nearer the Santa Ana River or low-lying drainage areas need flood and stormwater screening, while Anaheim Hills and foothill-edge lots can add slope, retaining, and wildfire-interface questions. These conditions affect foundation selection and construction sequencing.",
    sections: [
      {
        heading: "Use the Anaheim handout as the first design filter",
        body:
          "Anaheim’s ADU materials establish the local starting point, but they do not replace site-specific structural work. The engineer should compare the proposed footprint and height with the architectural and planning documents, then identify which walls, roof lines, foundations, and utility penetrations are existing. A detached unit may need a straightforward new foundation; a conversion or addition can require a careful check of the existing slab, bearing walls, and lateral bracing.",
      },
      {
        heading: "Flat does not mean structurally uniform",
        body:
          "Many Anaheim lots look uncomplicated from the street, yet construction records and garage framing can differ from one tract or remodel to the next. A new opening for a garage conversion, a raised roof, or an attached addition can interrupt a wall line and transfer load into an existing footing that was never intended for it. Field measurements and permit records are useful evidence before selecting a standard detail.",
      },
      {
        heading: "Coordinate utilities and fire separation early",
        body:
          "The structural layout must leave room for electrical, plumbing, HVAC, water-heater, and sewer work while maintaining required fire-resistance assemblies and clearances. Anaheim Fire & Rescue, Public Works, or utility requirements may affect wall locations, access, or site work. Resolving those interfaces before the first City submittal reduces the risk of a structural sheet that conflicts with the rest of the permit set.",
      },
    ],
    permitSteps: [
      "Check Anaheim Planning and Building’s current ADU guidance against the parcel, existing structures, planned-community or overlay conditions, and any flood, fire, grading, or right-of-way flags.",
      "Provide a dimensioned architectural site and floor plan, existing-condition photographs, prior permit information if available, and clear information about the garage, addition, or detached-unit scope.",
      "Prepare structural calculations and drawings coordinated with Title 24, fire-resistance details, utility layouts, site drainage, and Anaheim’s building submittal checklist.",
      "Submit through the City’s current permit intake process and respond to Planning, Building, Fire, or other routed comments with a tracked revision package.",
      "Obtain permit issuance before work and request engineering review for field changes that modify foundations, framing, openings, or the approved lateral system.",
    ],
    timelineGuidance:
      "California’s 60-day ministerial action provision for a complete ADU application is a statutory review rule under specified conditions, not a promise that an Anaheim project will be designed, corrected, issued, and built within 60 days. Site information, City intake, corrections, fire or utility review, plan revisions, and inspection availability are separate schedule variables. Use Anaheim’s current permit instructions and a project-specific document schedule.",
    faqs: [
      {
        question: "Can an Anaheim ADU use the existing garage slab?",
        answer:
          "Sometimes, but the engineer must verify the slab, footings, walls, moisture or drainage conditions, and proposed loads. Converting a garage may also require infilling the door opening and adding lateral or anchorage work. A slab that appears sound is not by itself proof of an adequate permitted foundation.",
      },
      {
        question: "Will a planned community change the Anaheim ADU process?",
        answer:
          "It can add a practical coordination issue. The City controls the public permit, while private association documents or design review may impose separate obligations that the owner must investigate. The City’s Planning and Building Division remains the source for public zoning and building requirements; private review should not be confused with City approval.",
      },
      {
        question: "Who issues the Anaheim ADU building permit?",
        answer:
          "The City of Anaheim’s Planning and Building Division handles the municipal planning and building-permit process, with other City reviewers involved when their requirements apply. Engineering documents support that review; they do not constitute permit approval.",
      },
    ],
    internalLinks: STRUCTURAL_LINKS,
    sources: [
      "https://www.anaheim.net/413/Accessory-Dwelling-Units",
      "https://www.anaheim.net/877/Building-Permits",
      "https://www.anaheim.net/465/Planning",
      "https://www.anaheim.net/1039/Fire-Rescue",
      "https://www.anaheim.net/1029/Public-Works",
    ],
  },
  {
    kind: "city",
    slug: "riverside-adu-structural-engineering",
    title: "Riverside ADU Structural Engineering | Permit Plans",
    description:
      "Riverside ADU structural engineering for inland heat, older homes, hillsides, and garage conversions, coordinated with the City’s CEDD permit review.",
    h1: "Riverside ADU Structural Engineering",
    kicker: "Inland Southern California · City of Riverside",
    lede:
      "Riverside ADUs often combine older housing stock with hot inland conditions, broad lots, detached garages, and neighborhoods that transition toward hillsides and river corridors. A useful structural package starts with the City’s Community and Economic Development Department process and then tests the proposed unit against the actual foundation, soil, drainage, and seismic load path.",
    authority: {
      name: "City of Riverside Community and Economic Development Department (CEDD), including Planning and Building & Safety, with Fire, Public Works, and Riverside Public Utilities involvement when applicable.",
      process:
        "Riverside’s CEDD provides planning, ADU, building, and inspection information and directs applicants to the City’s current permit intake process. Building & Safety reviews the construction documents after applicable planning and site requirements are addressed; corrections, routed reviews, and inspections remain part of the City’s process.",
    },
    codeConditions:
      "Riverside implements California’s building and residential codes through its municipal code and CEDD review, alongside state ADU statutes and local objective development standards. A project may also be affected by hillside or grading rules, floodplain or drainage review, fire access, historic resources, and utility requirements. The exact code edition and City handout in effect at submittal should control the drawings.",
    physicalConstraints:
      "Inland Riverside’s hot, dry climate increases HVAC and roof-equipment coordination, while expansive or variable soils can influence footing movement and slab decisions. Older houses and detached garages may have undocumented alterations. Near the Santa Ana River or sloping areas, drainage, flood, erosion, retaining, and construction access can be more consequential than the small size of the ADU.",
    sections: [
      {
        heading: "Riverside CEDD connects planning and building review",
        body:
          "The City’s CEDD resources are important because a structurally sound design can still need planning, grading, flood, fire, or utility coordination. The engineer should obtain the site plan and architectural geometry that CEDD and Building & Safety will review, identify the ADU type, and make the structural sheets consistent with property lines, setbacks, grades, equipment locations, and fire-resistance assemblies.",
      },
      {
        heading: "Older detached garages need evidence, not assumptions",
        body:
          "A Riverside garage conversion may involve a thin slab, isolated footings, wood-framed walls with unknown anchorage, or prior alterations that are not represented in a permit set. The engineer can determine whether the existing work is usable only after reviewing records and field conditions. Door infill, new windows, roof changes, and added partitions can each change the gravity or lateral system.",
      },
      {
        heading: "Inland heat and drainage affect the structural coordination",
        body:
          "Rooftop HVAC, water heating, solar-ready provisions, and penetrations need locations that respect framing and roof loading. On a slope or near a drainage corridor, the foundation and site design also need to keep water away from the building and avoid relying on an unverified retaining condition. CEDD, Public Works, Fire, and Riverside Public Utilities requirements should be screened before the structural set is finalized.",
      },
    ],
    permitSteps: [
      "Confirm the Riverside address, CEDD jurisdiction, ADU type, zoning and planning conditions, and any hillside, flood, grading, historic, fire-access, or utility triggers.",
      "Collect architectural plans, site grades and drainage information, prior permits, garage or house photographs, and field measurements needed to establish existing foundations and framing.",
      "Develop structural drawings and calculations coordinated with Title 24, HVAC and solar-ready locations, fire separation, civil or grading work, and the CEDD checklist.",
      "Submit through Riverside’s current CEDD/Building & Safety permit pathway, monitor routed reviews, and issue a documented response to each correction cycle.",
      "Keep approved documents available for inspection and obtain professional review of changes to foundations, openings, roof loads, or lateral elements before construction proceeds.",
    ],
    timelineGuidance:
      "The state’s ministerial ADU statute includes a 60-day action provision for a complete application in the situations described in Government Code section 65852.2. Riverside design production, CEDD intake, site or utility review, correction responses, permit issuance, and inspections are not the same clock. The statutory window should therefore be presented as a review requirement, not a guaranteed total permit or construction duration.",
    faqs: [
      {
        question: "Are Riverside ADUs affected by soil conditions?",
        answer:
          "They can be. Expansive or variable inland soils, slope conditions, drainage, and existing foundation performance can influence the appropriate footing or slab approach. The engineer should use available geotechnical and site information and request additional investigation when the project facts warrant it.",
      },
      {
        question: "Does a Riverside detached ADU need a new foundation design?",
        answer:
          "A new detached unit needs a foundation design appropriate to its loads and site conditions, even when a prescriptive solution may be possible. Existing garage conversions are different: the existing foundation may be reused only after it is verified for the proposed use and modifications.",
      },
      {
        question: "Which Riverside office should receive the ADU application?",
        answer:
          "The City of Riverside Community and Economic Development Department, through its Planning and Building & Safety functions and current permit process, is the relevant municipal starting point. Other departments or utilities may be routed in. Confirm the current intake channel directly with CEDD before submission.",
      },
    ],
    internalLinks: STRUCTURAL_LINKS,
    sources: [
      "https://riversideca.gov/cedd/planning/accessory-dwelling-units",
      "https://riversideca.gov/cedd/building-safety",
      "https://riversideca.gov/cedd/planning",
      "https://riversideca.gov/publicworks",
      "https://riversidepublicutilities.com/",
    ],
  },
  {
    kind: "city",
    slug: "irvine-adu-structural-engineering",
    title: "Irvine ADU Structural Engineering | Permit Coordination",
    description:
      "Irvine ADU structural engineering for planned communities, additions, and detached units, coordinated with Irvine Community Development and local fire review.",
    h1: "Irvine ADU Structural Engineering",
    kicker: "Orange County · City of Irvine",
    lede:
      "Irvine’s planned neighborhoods make early document coordination especially important. An ADU structural design must fit the City of Irvine’s development and building review, the tract’s existing architecture and grading, and the actual foundation and utility conditions—while separate private association rules may affect the owner’s project decisions.",
    authority: {
      name: "City of Irvine Community Development Department, including Planning and Building & Safety, with Orange County Fire Authority and Irvine Ranch Water District or other utility coordination when applicable.",
      process:
        "Irvine’s Community Development resources provide the City’s ADU and building-permit information and current submittal routes. Planning and Building & Safety review the public permit; fire, grading, utility, and other reviews are added when triggered by the site or scope. A homeowners association or master developer review is private and does not replace the City permit.",
    },
    codeConditions:
      "Irvine applies the California Building Standards Code through its municipal code and development review, together with state ADU statutes and objective zoning standards. Planned-community design rules, private conditions, fire access, grading, hillside or open-space interfaces, and tract-specific utility arrangements can affect feasibility. The City’s current ADU handout and adopted code should be used rather than assuming a neighboring Orange County city’s standards apply.",
    physicalConstraints:
      "Irvine’s master-planned neighborhoods can have tract-specific lot geometry, zero-lot-line conditions, retaining walls, finished grades, and limited side-yard access. Foothill and open-space edges add slope, drainage, and wildfire-interface questions; flatter villages still require careful checks of existing garage foundations and utility corridors. The proposed structure must also coexist with the architectural character and private review realities of the community.",
    sections: [
      {
        heading: "Public permit and private review are different tracks",
        body:
          "The City of Irvine is the authority for the public building and planning permit. An owner may also need to investigate HOA, master-developer, or recorded architectural restrictions, but a private review cannot waive City code and City approval cannot necessarily waive private obligations. The engineering intake should identify both tracks so structural revisions are not discovered after the permit drawings are complete.",
      },
      {
        heading: "Planned grading makes existing conditions important",
        body:
          "A tract’s finished grade, retaining wall, slab elevation, and utility alignment may be more informative than a generic regional detail. An attached addition can load an existing footing at a property-line condition, while a detached unit may need to respect a retaining wall or drainage path. The engineer should compare field evidence, available plans, and the architectural site plan before relying on the original tract design.",
      },
      {
        heading: "Coordinate with fire and water infrastructure",
        body:
          "Irvine projects can involve Orange County Fire Authority review and water or sewer coordination through the responsible utility provider. Those requirements may affect access, fire separation, equipment placement, trenching, and foundation clearances. Structural drawings should be coordinated after those interfaces are understood, not issued as an isolated framing package.",
      },
    ],
    permitSteps: [
      "Confirm the City of Irvine parcel, ADU type, zoning and planned-community conditions, and any hillside, open-space, grading, fire, or utility review triggers.",
      "Obtain architectural and site information, tract or prior permit records, HOA or private-review requirements from the owner, and field evidence for the existing house, garage, slabs, walls, and retaining conditions.",
      "Prepare Irvine-coordinated structural calculations and drawings that agree with Title 24, fire access and separation, civil drainage, utilities, and the current City checklist.",
      "Submit through Irvine Community Development’s current planning/building permit process and separately complete any applicable private review; respond to public-agency corrections in the City’s format.",
      "Secure permit issuance before construction and route structural changes through the engineer and City revision process when the approved foundations or framing change.",
    ],
    timelineGuidance:
      "Government Code section 65852.2 provides a statutory ministerial action rule, including a 60-day provision for a complete ADU application in specified circumstances. That rule does not include private association review, design production, Irvine intake, fire or utility coordination, correction cycles, or construction. Treat it as one review constraint and verify the current City process before communicating a schedule.",
    faqs: [
      {
        question: "Does Irvine’s master-planned setting mean an HOA approves the ADU?",
        answer:
          "An HOA or master developer may have private restrictions or review procedures, but the City of Irvine remains the public permitting authority. The owner should investigate recorded and association requirements separately. Private approval is not a substitute for City Planning and Building & Safety approval, and a City permit does not resolve every private covenant.",
      },
      {
        question: "What structural issues are common for an Irvine garage conversion?",
        answer:
          "The engineer commonly needs to verify the existing slab and footings, infill the garage door opening, address lateral resistance and anchorage, and coordinate new windows, utilities, and fire-rated assemblies. Tract construction records can help, but field conditions and prior alterations control the responsible design.",
      },
      {
        question: "Can the Irvine ADU schedule be based on the 60-day state rule?",
        answer:
          "Only as a carefully qualified statutory review reference. The rule applies to a complete application in the circumstances specified by state law and is not a guarantee of total permit duration. City and private review, corrections, missing information, and utility or fire requirements can occur outside that action window.",
      },
    ],
    internalLinks: STRUCTURAL_LINKS,
    sources: [
      "https://www.cityofirvine.org/community-development/accessory-dwelling-units",
      "https://www.cityofirvine.org/community-development/building-safety",
      "https://www.cityofirvine.org/community-development/planning",
      "https://www.ocfa.org/",
      "https://www.irwd.com/",
    ],
  },
  {
    kind: "city",
    slug: "san-bernardino-adu-structural-engineering",
    title: "San Bernardino ADU Structural Engineering | Permit Plans",
    description:
      "San Bernardino ADU structural engineering for foothill and valley properties, garage conversions, additions, and detached units under the City’s permit process.",
    h1: "San Bernardino ADU Structural Engineering",
    kicker: "Inland Empire · City of San Bernardino",
    lede:
      "San Bernardino’s valley-to-foothill geography creates different ADU engineering questions within one city. A practical permit package starts with the City’s Community and Economic Development permit authority and checks the existing residence, foundation, hillside or flood conditions, heat-driven equipment loads, and fire or utility interfaces at the address.",
    authority: {
      name: "City of San Bernardino Community and Economic Development Department, including Planning and Building & Safety, with San Bernardino County Fire or other agencies where the property and scope require it.",
      process:
        "The City’s Planning and Building & Safety resources provide the current ADU guidance, permit intake, plan review, and inspection route. Applications may need zoning, fire, Public Works, flood, grading, or utility coordination; the applicant must respond to the responsible reviewers and obtain the City’s building permit before starting work.",
    },
    codeConditions:
      "San Bernardino enforces the locally adopted California Building Standards Code and state ADU provisions through its municipal development and building review. Local objective standards, hillside or grading rules, flood and drainage requirements, fire access, and historic or neighborhood conditions can affect a parcel. Confirm the City’s current code edition and ADU checklist at submittal because a county or neighboring-city handout is not controlling.",
    physicalConstraints:
      "San Bernardino combines flat valley lots with foothill and mountain-edge sites, older housing stock, hot summers, and areas where flood, debris-flow, drainage, or wildfire exposure must be screened. Existing garages may have uncertain foundations or prior conversions, while sloped parcels can require stepped foundations or retaining coordination. Construction access and long utility runs can also affect a detached unit’s layout.",
    sections: [
      {
        heading: "San Bernardino’s permit path is address-specific",
        body:
          "The City’s Community and Economic Development Department is the starting point, but the correct engineering scope depends on the parcel’s grade, overlays, existing permit history, and ADU type. A design team should obtain the site plan and current City checklist before finalizing a structural package, then align the sheets with the planning footprint, fire separation, utility path, and inspection requirements.",
      },
      {
        heading: "Foothill conditions can change a simple foundation",
        body:
          "A foothill or mountain-edge property may need more than a typical slab-and-stem-wall detail. Grades, retaining walls, drainage, expansive or variable soils, and wildfire-interface requirements can influence foundation geometry and construction sequencing. Those questions should be coordinated with civil, geotechnical, and fire professionals when indicated; the structural engineer should not infer a slope solution from an aerial image.",
      },
      {
        heading: "Valley lots still need existing-building investigation",
        body:
          "On a flat lot, the main risk may be an older garage, undocumented alteration, or long utility route rather than topography. Converting a garage changes openings, habitable-load assumptions, and fire-rated construction, and an attached addition transfers new loads into an existing foundation. Field verification can prevent a permit set that depends on framing or footings the property does not actually have.",
      },
    ],
    permitSteps: [
      "Confirm the City of San Bernardino jurisdiction, ADU category, zoning and property overlays, and any hillside, flood, grading, fire, historic, or utility triggers.",
      "Provide architectural plans, site and grade information, existing permit records, photographs, and field measurements for the home, garage, foundations, retaining walls, and access.",
      "Prepare structural calculations and drawings coordinated with Title 24, fire and egress requirements, grading or drainage, utility work, and the City’s current submittal checklist.",
      "Submit through the City’s Community and Economic Development permit route, track routed reviews, and answer each plan-check comment with identified drawing and calculation changes.",
      "Wait for permit issuance before construction and obtain engineering and City review when field conditions or substitutions alter the approved structure.",
    ],
    timelineGuidance:
      "The California ADU statute contains a 60-day ministerial action provision for a complete application in the statutory circumstances; it is not a guaranteed San Bernardino permit or construction timeline. The City’s intake completeness, site or fire review, engineering production, corrections, resubmittals, utility work, and inspections are separate schedule components and should be discussed separately with the owner.",
    faqs: [
      {
        question: "Does a San Bernardino foothill ADU need a geotechnical report?",
        answer:
          "That depends on the site, proposed foundation, grade, soil information, and City or design-team requirements. A slope, retaining condition, drainage concern, or poor existing evidence can make geotechnical input important. The structural engineer should identify the need during scope review rather than promise that a prescriptive detail will fit every foothill parcel.",
      },
      {
        question: "Can an older San Bernardino garage be converted without rebuilding it?",
        answer:
          "Reuse may be possible, but the existing slab, footings, walls, roof, anchorage, and door infill must be evaluated for the proposed ADU. Prior unpermitted changes or deterioration can require repairs or a more extensive design. Building & Safety determines what documents and corrections are required for the permit.",
      },
      {
        question: "Which agency reviews a San Bernardino ADU?",
        answer:
          "The City of San Bernardino Community and Economic Development Department, through Planning and Building & Safety, is the municipal starting point. Fire, Public Works, utilities, or county agencies may participate depending on location and scope. Confirm the current permit intake with the City before submission.",
      },
    ],
    internalLinks: STRUCTURAL_LINKS,
    sources: [
      "https://www.sbcity.org/city_hall/community___economic_development/planning/accessory_dwelling_units",
      "https://www.sbcity.org/city_hall/community___economic_development/building___safety",
      "https://www.sbcity.org/city_hall/community___economic_development/planning",
      "https://www.sbcity.org/city_hall/public_works",
      "https://www.sbcity.org/city_hall/fire",
    ],
  },
  {
    kind: "city",
    slug: "chula-vista-adu-structural-engineering",
    title: "Chula Vista ADU Structural Engineering | Permit Drawings",
    description:
      "Chula Vista ADU structural engineering for coastal and inland neighborhoods, garage conversions, additions, and detached units through Development Services.",
    h1: "Chula Vista ADU Structural Engineering",
    kicker: "South San Diego County · City of Chula Vista",
    lede:
      "Chula Vista spans coastal-influenced neighborhoods, inland planned communities, canyons, and the Otay area. ADU structural engineering therefore needs to match the City’s Development Services permit route and the property’s actual slope, drainage, soil, fire, utility, and existing-building conditions rather than relying on a generic San Diego County detail.",
    authority: {
      name: "City of Chula Vista Development Services Department, including Planning and Building, with Chula Vista Fire Department, Public Works, and local water or sewer providers when applicable.",
      process:
        "Chula Vista’s Development Services resources provide the ADU, planning, building-permit, plan-review, and inspection information for projects inside the City. The applicant follows the current City submittal route, satisfies Planning and Building comments, and coordinates fire, grading, right-of-way, and utility requirements that are triggered by the parcel or design.",
    },
    codeConditions:
      "Chula Vista implements California’s adopted building and residential codes through its municipal code, Development Services review, and state ADU provisions. Planned-community standards, fire access, grading, canyon or slope conditions, coastal or environmental review, and local water or sewer requirements can shape the project. Verify the current Chula Vista ADU handout and code at intake instead of importing the City of San Diego’s rules.",
    physicalConstraints:
      "South Chula Vista includes canyon edges, rolling terrain, newer planned neighborhoods, and older flat-lot communities. Slopes and drainage can affect foundations and retaining work; wildfire exposure and access can affect exterior and fire coordination; coastal air and soil variability can affect durability and foundation assumptions. Existing garages, tract walls, and utility easements need field and record verification.",
    sections: [
      {
        heading: "Chula Vista Development Services is the permit starting point",
        body:
          "A Chula Vista ADU application should be assembled around the City’s current Development Services checklist and permit route. The structural engineer needs the City-facing architectural site plan, grades, setbacks, existing building information, and utility or fire layouts so the calculations and drawings describe the same project. Planning eligibility and building structural compliance are related reviews, but they are not interchangeable.",
      },
      {
        heading: "Canyon and planned-community sites need different investigations",
        body:
          "Near a canyon or on rolling terrain, a foundation may interact with a slope, retaining wall, drainage path, or difficult construction access. In a planned community, the tract may provide useful records but can also contain private walls, easements, and restrictions. The responsible engineer should verify what is present and coordinate geotechnical, civil, fire, or private-review input when the site facts make it necessary.",
      },
      {
        heading: "South County utilities belong in the early coordination set",
        body:
          "A detached ADU can create long water, sewer, and electrical runs, while a conversion may need new service equipment and penetrations through existing walls. Chula Vista Public Works and the serving water or sewer provider can impose location or connection requirements that affect the foundation and site plan. Early coordination avoids placing structural footings or retaining elements where a required utility route must go.",
      },
    ],
    permitSteps: [
      "Confirm the Chula Vista address, Development Services jurisdiction, ADU type, planned-community or zoning conditions, and any canyon, grading, fire, environmental, coastal, or utility flags.",
      "Gather the architectural package, survey or grade information when appropriate, existing-house and garage records, photographs, utility easements, and field measurements.",
      "Prepare structural calculations and drawings coordinated with Chula Vista’s current checklist, Title 24, fire separation and access, drainage or retaining work, and water, sewer, and electrical layouts.",
      "Submit through Development Services’ current permit and plan-review process, coordinate routed agency comments, and return a complete correction response with revised documents.",
      "Obtain the building permit before construction and have the engineer evaluate field changes that affect foundations, retaining, openings, roof loads, or lateral resistance.",
    ],
    timelineGuidance:
      "Government Code section 65852.2 supplies a ministerial 60-day action rule for a complete ADU application in the situations specified by the statute. It does not guarantee a Chula Vista permit date or total project duration. Design and field verification, Development Services intake, fire or utility coordination, correction cycles, resubmittal, permit issuance, and construction should be scheduled as distinct steps.",
    faqs: [
      {
        question: "Is a Chula Vista canyon ADU the same as a flat-lot ADU?",
        answer:
          "No. A canyon or sloped site can require additional attention to slope stability, retaining, drainage, access, fire exposure, and foundation geometry. Development Services determines applicable review, while the structural and site professionals determine what can responsibly be designed from the available evidence.",
      },
      {
        question: "Does a Chula Vista ADU need a new utility layout before structural design?",
        answer:
          "The full utility design may still be developing, but structural planning should know the likely service and trench routes. Water, sewer, electrical equipment, fire access, and drainage can affect footing locations and wall penetrations. Coordinating these items early is especially useful for detached units and additions in planned communities.",
      },
      {
        question: "Who issues the Chula Vista ADU permit?",
        answer:
          "The City of Chula Vista Development Services Department is the public permit authority for projects within the City, with Planning, Building, Fire, Public Works, and utilities involved as applicable. Engineering supports the review; the City decides whether the application complies and issues the permit.",
      },
    ],
    internalLinks: STRUCTURAL_LINKS,
    sources: [
      "https://www.chulavistaca.gov/departments/development-services/planning/accessory-dwelling-units",
      "https://www.chulavistaca.gov/departments/development-services/building",
      "https://www.chulavistaca.gov/departments/development-services/permits",
      "https://www.chulavistaca.gov/departments/public-works",
      "https://www.otaywater.gov/",
    ],
  },
];

export const CALIFORNIA_ADU_STATE_PAGE = CALIFORNIA_STATE_PAGE;
export const CALIFORNIA_ADU_CITY_PAGES = CALIFORNIA_ADU_PAGES.filter(
  (page): page is CaliforniaAduPage & { kind: "city" } => page.kind === "city",
);