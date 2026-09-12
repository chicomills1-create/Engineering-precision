/**
 * Source content for the Northern and Central California ADU structural
 * engineering pages.  This module is intentionally not a city-name template:
 * each record describes the local permit counter, local implementation issues,
 * and physical conditions that affect an ADU addition or conversion.
 */

export interface CaliforniaAduStructuralPage {
  slug: string;
  city: string;
  county: string;
  title: string;
  description: string;
  h1: string;
  kicker: string;
  lede: string;
  sections: {
    localContext: string;
    structuralEngineering: string;
    permitPath: string;
    timeline: string;
  };
  permitSteps: string[];
  timelineGuidance: {
    statutoryWindow: string;
    totalDuration: string;
  };
  faqs: Array<{ q: string; a: string }>;
  internalLinks: Array<{ label: string; href: string }>;
  sources: {
    state: string[];
    city: string[];
    localConditions: string[];
  };
}

const statewideSources = [
  "https://www.hcd.ca.gov/policy-and-research/accessory-dwelling-units",
  "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?sectionNum=65852.2.&lawCode=GOV",
  "https://www.dgs.ca.gov/BSC/Codes",
];

const commonInternalLinks = [
  { label: "California structural engineering", href: "/locations/california/structural-engineering" },
  { label: "structural engineering services", href: "/services/structural" },
  { label: "permit-ready engineering drawings", href: "/permit-engineering/pe-stamped-drawings" },
];

export const CALIFORNIA_ADU_STRUCTURAL_PAGES: CaliforniaAduStructuralPage[] = [
  {
    slug: "san-francisco-adu-structural-engineering",
    city: "San Francisco",
    county: "San Francisco County",
    title: "San Francisco ADU Structural Engineering | Apex Grid",
    description:
      "Structural engineering for San Francisco ADU additions and conversions, coordinated with DBI, Planning, seismic conditions, and the actual site.",
    h1: "San Francisco ADU Structural Engineering",
    kicker: "Accessory Dwelling Unit Engineering · San Francisco",
    lede:
      "A San Francisco ADU is rarely a detached-box exercise. Existing unreinforced or altered buildings, narrow lots, shared walls, seismic demands, and constrained access can all change the structural scope. Apex Grid develops permit drawings and calculations around the existing building and the City's review path rather than promising a generic plan or approval.",
    sections: {
      localContext:
        "The City and County of San Francisco Department of Building Inspection (DBI) is the building-permit authority, while San Francisco Planning reviews zoning and historic-resource issues when they apply. The City's ADU program can allow an attached or interior unit in an existing building, but the project still has to satisfy applicable Planning, Building, Fire, and other agency requirements. On a typical older rowhouse or apartment building, the question is not simply whether an ADU is allowed: it is whether the proposed opening, stair, foundation, or added story can be integrated into a building with unknown past alterations and limited staging.",
      structuralEngineering:
        "The structural investigation starts with an as-built survey, permit history where available, framing direction, existing foundation type, and the relationship to party walls and neighboring structures. Bay Area seismic design can make new shear walls, collectors, hold-downs, diaphragm repairs, or foundation strengthening more important than the ADU's square footage suggests. Soft or liquefiable ground near the bay and filled areas is different from a hillside site; the engineer should use the geotechnical information available for the parcel instead of assigning one citywide foundation detail. Temporary shoring, underpinning, and vibration control belong in the conversation when new openings or excavation are close to a neighbor.",
      permitPath:
        "A practical submittal begins by confirming the Planning zoning or historic-review path, then preparing architectural, structural, and any required fire or utility documents for DBI's permit process. DBI's Permit Center and electronic services are the authoritative source for current intake instructions; a complete application may still receive corrections from several review disciplines. Structural drawings should clearly distinguish existing conditions, demolition, new work, seismic load path, and construction sequencing so a plan reviewer can evaluate the conversion rather than infer it from a floor plan.",
      timeline:
        "California Government Code section 65852.2 establishes a statutory action window for a complete ADU application in the circumstances described by the statute. That is a review requirement, not a promise that a San Francisco project will receive a permit or be built within that period. DBI and Planning intake, historic or site-specific review, correction cycles, utility work, shoring, and inspection scheduling can all affect the overall duration; only the agencies and the project team can establish a current project schedule.",
    },
    permitSteps: [
      "Confirm the parcel's zoning, historic-resource status, existing legal units, and whether the proposed ADU is an interior conversion, addition, or new detached structure with San Francisco Planning.",
      "Document the existing building and obtain available plans or permit history; flag party walls, prior alterations, soft-story conditions, and inaccessible framing before structural design.",
      "Coordinate architectural, structural, fire/life-safety, and utility documents, including a construction approach for tight access or work near a neighboring foundation.",
      "Submit through the current DBI Permit Center/electronic process and respond to each DBI or Planning correction with revised sheets and calculations; separate trade permits may be required.",
      "Build only from approved documents and arrange required inspections, special inspections, and any revisions for concealed conditions through DBI's process.",
    ],
    timelineGuidance: {
      statutoryWindow:
        "The state ADU statute describes a 60-day agency action window for a complete application in qualifying cases. It is not a guaranteed approval, plan-preparation time, construction duration, or promise that every San Francisco review track will fit inside 60 days.",
      totalDuration:
        "Total duration depends on the existing-building survey, Planning or historic review, DBI correction cycles, structural complexity, utility work, and contractor access. A small interior conversion may have a different path from a seismic addition; Apex Grid should provide a project-specific estimate only after reviewing the scope.",
    },
    faqs: [
      {
        q: "Does San Francisco's ADU process eliminate structural engineering?",
        a:
          "No. A ministerial ADU path does not remove the California Building Code's structural requirements or DBI's ability to request adequate drawings and calculations. Cutting a wall, adding a floor, changing a roof, or strengthening an older building can require an engineer's analysis even when the zoning path is straightforward.",
      },
      {
        q: "Why are party walls and access important for a San Francisco ADU?",
        a:
          "Rowhouses and dense lots often leave little room for excavation, material delivery, or temporary bracing. A new opening or foundation close to a shared wall may affect shoring, underpinning, fire separation, and neighbor protection. Those constraints should be surveyed and shown in the permit strategy before construction starts.",
      },
      {
        q: "Is the state's ADU review window the same as the total San Francisco project time?",
        a:
          "No. The state statute addresses agency action on a complete application in qualifying circumstances. It does not include design, Planning or historic review, corrections, utility coordination, contractor procurement, construction, or final inspection, and it is not an approval guarantee.",
      },
    ],
    internalLinks: commonInternalLinks,
    sources: {
      state: statewideSources,
      city: [
        "https://sfplanning.org/accessory-dwelling-units",
        "https://www.sf.gov/departments--department-building-inspection",
        "https://www.sf.gov/topics/accessory-dwelling-units",
      ],
      localConditions: [
        "https://sfplanning.org/resource/san-francisco-property-information-map",
        "https://www.usgs.gov/programs/earthquake-hazards/science/hazard-maps",
      ],
    },
  },
  {
    slug: "san-jose-adu-structural-engineering",
    city: "San Jose",
    county: "Santa Clara County",
    title: "San Jose ADU Structural Engineering | Apex Grid",
    description:
      "San Jose ADU structural plans for additions, detached units, and garage conversions, with PBCE permit coordination and site-specific seismic review.",
    h1: "San Jose ADU Structural Engineering",
    kicker: "Accessory Dwelling Unit Engineering · San José",
    lede:
      "San José ADU design has to reconcile state ADU rules with the City's zoning and building review, an established-house survey, and Santa Clara Valley site conditions. A garage conversion, rear addition, and detached unit can each create a different load path and foundation problem. Our structural scope is based on what is actually found at the property.",
    sections: {
      localContext:
        "The City of San José Planning, Building and Code Enforcement (PBCE) Department is the relevant local department for planning and building permits. San José publishes ADU guidance and accepts building permit work through its current online and in-person services; Planning, Building, Public Works, and other reviewers may have distinct roles. City ADU standards and state law are not a substitute for checking the parcel's zoning, historic or hillside status, flood considerations, and the current submittal checklist.",
      structuralEngineering:
        "Many San José homes sit on valley soils where liquefaction potential, groundwater, settlement, or lateral spreading varies by neighborhood; foothill parcels introduce slope and retaining-wall questions. A structural engineer should verify the existing slab and footing rather than assume a garage foundation can carry new wall loads, and should trace the seismic load path where an addition removes exterior wall or roof bracing. New openings between a garage and house, roof raises, and second-story additions need details for collectors, hold-downs, anchorage, and any required foundation work.",
      permitPath:
        "The permit package should identify whether the work is a garage conversion, attached addition, detached ADU, or a combination with alterations to the primary dwelling. Start with PBCE's ADU and zoning guidance, then coordinate architectural plans with structural sheets, Title 24 or other required residential documents, utilities, and fire access where applicable. San José's review comments may cover zoning and building issues separately, so the response set should use the City's current portal and keep an auditable revision history.",
      timeline:
        "The California ADU statute's review window applies to a complete application in qualifying circumstances; it does not set the duration of design, corrections, utility approvals, construction, or final inspection. A valley-lot ADU can also need information about drainage, floodplain, trees, easements, or a utility service change. Those parcel facts should be confirmed before anyone turns a statutory review window into a project promise.",
    },
    permitSteps: [
      "Use San José PBCE's ADU and zoning resources to classify the unit, check setbacks and height, and identify hillside, historic, flood, easement, or tree constraints for the parcel.",
      "Measure the existing house or garage, expose or otherwise verify representative framing and foundations as needed, and obtain geotechnical input when site conditions or the scope warrant it.",
      "Prepare coordinated architectural, structural, energy, fire/life-safety, and utility documents; show the seismic load path from the new roof and walls to the foundation.",
      "Submit through San José's current building permit service, track PBCE and related review comments, and issue a complete response rather than treating a correction as informal construction advice.",
      "Use approved drawings for construction and schedule required inspections; document field changes with the responsible design professional and PBCE before covering work.",
    ],
    timelineGuidance: {
      statutoryWindow:
        "Government Code section 65852.2 contains a 60-day action window for a complete ADU application in qualifying cases. It is a statutory review standard, not a guaranteed San José permit date or a statement about total project duration.",
      totalDuration:
        "Actual duration varies with survey quality, PBCE corrections, utility and fire-access questions, site drainage or hillside review, and the need to strengthen an existing garage or house. A schedule should be based on the specific parcel and current City intake requirements.",
    },
    faqs: [
      {
        q: "Can an existing San José garage automatically support an ADU?",
        a:
          "No. A garage slab and footing may have been designed for a different use, and conversion can add wall, roof, bathroom, or seismic demands while removing a braced wall. The engineer needs enough information about the existing foundation and framing to justify reuse or design strengthening.",
      },
      {
        q: "When does a San José ADU need more than a basic foundation detail?",
        a:
          "Slope, retaining walls, questionable fill, groundwater, liquefaction or lateral-spreading potential, a roof raise, or an addition connected to an older house can all change the foundation and lateral design. The applicable geotechnical and building-code decisions are parcel and scope specific.",
      },
      {
        q: "Who reviews a San José ADU permit?",
        a:
          "PBCE is the City's local planning and building department for this work. The project may also involve other City functions, utilities, or fire/life-safety review depending on its location and scope, so the current PBCE submittal instructions control.",
      },
    ],
    internalLinks: commonInternalLinks,
    sources: {
      state: statewideSources,
      city: [
        "https://www.sanjoseca.gov/your-government/departments-offices/planning-building-code-enforcement/planning-division/accessory-dwelling-units",
        "https://www.sanjoseca.gov/your-government/departments-offices/planning-building-code-enforcement/building-division/permits",
        "https://www.sanjoseca.gov/your-government/departments-offices/planning-building-code-enforcement",
      ],
      localConditions: [
        "https://www.sanjoseca.gov/your-government/departments-offices/planning-building-code-enforcement/planning-division/hillside-development",
        "https://myhazards.caloes.ca.gov/",
        "https://www.valleywater.org/your-water/flood-protection",
      ],
    },
  },
  {
    slug: "sacramento-adu-structural-engineering",
    city: "Sacramento",
    county: "Sacramento County",
    title: "Sacramento ADU Structural Engineering | Apex Grid",
    description:
      "Sacramento ADU structural engineering for garage conversions, additions, and detached units, coordinated with the City's Building Division and flood-aware site design.",
    h1: "Sacramento ADU Structural Engineering",
    kicker: "Accessory Dwelling Unit Engineering · Sacramento",
    lede:
      "Sacramento ADU projects often look simple on a flat Central Valley lot, but older garages, alley access, flood exposure, drainage, and settlement can control the design. Apex Grid prepares structural documents around the existing building, the City's electronic review process, and the actual foundation and site evidence.",
    sections: {
      localContext:
        "The City of Sacramento Community Development Department's Building Division is the building-permit authority for property inside the city. The City's ADU guidance and electronic plan review process should be used to confirm current zoning, building, and submittal requirements; public works, utilities, floodplain, tree, or fire-access reviews can be separate tracks. A Sacramento County property is not on the same permit path as a City property, so the jurisdiction must be established from the parcel before design begins.",
      structuralEngineering:
        "For a Sacramento garage conversion, the first structural question is often whether the existing slab, stem walls, roof framing, and vehicle opening are suitable for habitable use and current seismic load paths. New openings, an attached rear addition, or a detached unit may require a new footing or connection to an existing foundation. Central Valley alluvial soils, variable fill, shallow groundwater, and settlement are not uniform across the city; river and levee-adjacent parcels also require flood-elevation and civil coordination. A structural plan should not assume that a flat site has no geotechnical or drainage issue.",
      permitPath:
        "Begin with the City's ADU and planning information, identify the permit type, and coordinate architectural, structural, energy, plumbing, and site drawings before uploading through the Building Division's current electronic plan-review system. Show flood-related elevations or site information when applicable, preserve required drainage and access, and make the existing-versus-new scope legible. Corrections from Building, Planning, utilities, or other reviewing functions should be answered in the City's process; a state review window does not eliminate those project-specific checks.",
      timeline:
        "California law provides a statutory action window for a complete ADU application in qualifying situations, but that window is not a construction schedule. In Sacramento, survey and correction time, drainage or floodplain questions, utility routing, alley constraints, and inspection availability can matter more than the size of the unit. The total duration must be discussed as a project-specific range after the City path and existing conditions are known.",
    },
    permitSteps: [
      "Verify that the property is inside the City of Sacramento and use City ADU resources to check zoning, setbacks, height, parking, floodplain, tree, and utility constraints.",
      "Survey the existing residence or garage, including slab elevation, footing evidence, roof framing, vehicle openings, prior work, and alley or side-yard access.",
      "Coordinate structural calculations and drawings with the architectural, Title 24, plumbing, drainage, and fire-access documents required for the selected ADU type.",
      "Upload the complete package through the Building Division's current electronic plan-review process and answer comments through that record.",
      "Construct only from approved plans, call for required inspections, and submit engineered revisions when concealed conditions differ from the permitted design.",
    ],
    timelineGuidance: {
      statutoryWindow:
        "Government Code section 65852.2 describes a 60-day agency action window for a complete application in qualifying cases. It does not guarantee a Sacramento permit, waive other approvals, or include design, construction, utility, or inspection time.",
      totalDuration:
        "A detached unit with new utilities and drainage can have a different duration from a garage conversion. Floodplain information, existing foundation verification, electronic correction cycles, utility work, contractor availability, and inspections should be included in the project-specific schedule.",
    },
    faqs: [
      {
        q: "Does Sacramento flood risk affect an ADU structural plan?",
        a:
          "It can. A parcel near the Sacramento or American River system, a levee, or a mapped flood area may require elevation, floodplain, drainage, and foundation coordination. The applicable map and City requirements should be checked for the parcel rather than inferred from the citywide climate.",
      },
      {
        q: "Is a Sacramento detached ADU foundation always shallow?",
        a:
          "Not necessarily. Foundation design depends on the structure, soil and fill, groundwater, grading, flood considerations, and code loads. A site with undocumented fill or settlement concerns may need geotechnical input and a different foundation approach than a well-supported conversion.",
      },
      {
        q: "Which Sacramento office issues the building permit?",
        a:
          "For property inside the city, the City of Sacramento Community Development Department Building Division is the relevant building-permit authority. County properties follow the County's process, so the address and jurisdiction should be confirmed before using City forms or standards.",
      },
    ],
    internalLinks: commonInternalLinks,
    sources: {
      state: statewideSources,
      city: [
        "https://www.cityofsacramento.gov/community-development/planning/long-range/accessory-dwelling-units",
        "https://www.cityofsacramento.gov/community-development/building",
        "https://www.cityofsacramento.gov/community-development/building/plan-review",
      ],
      localConditions: [
        "https://www.cityofsacramento.gov/utilities/drainage/floodplain",
        "https://www.cityofsacramento.gov/public-works/engineering-services",
        "https://www.cityofsacramento.gov/community-development/planning/urban-forestry",
      ],
    },
  },
  {
    slug: "fresno-adu-structural-engineering",
    city: "Fresno",
    county: "Fresno County",
    title: "Fresno ADU Structural Engineering | Apex Grid",
    description:
      "Fresno ADU structural plans for conversions, additions, and detached units, with Development Services permitting and Central Valley soil and drainage coordination.",
    h1: "Fresno ADU Structural Engineering",
    kicker: "Accessory Dwelling Unit Engineering · Fresno",
    lede:
      "Fresno's Central Valley setting changes the questions behind an ADU permit: an older detached garage may have limited footing information, summer heat affects roof and equipment coordination, and flat ground still needs careful drainage and utility planning. We produce a structural package that addresses the existing building and Fresno's actual permit path.",
    sections: {
      localContext:
        "The City of Fresno Development Services Department, including its Building and Safety functions, handles building permits for property inside the city. Fresno's ADU information and current online permit instructions should be checked with the address because a County property follows a different authority and because planning, fire, utility, or site requirements can depend on the proposal. State ADU standards establish a baseline, but local zoning and adopted building-code provisions still govern the submittal.",
      structuralEngineering:
        "Garage conversions need an inspection of the existing slab, perimeter footing, wall bracing, roof framing, and large door opening; many older detached structures were not built as habitable living space. For a new Fresno ADU, the engineer must coordinate gravity and seismic loads with the soil and grading information available for the parcel. San Joaquin Valley alluvial deposits and undocumented fill can create differential-settlement concerns, while irrigation, drainage, and high summer temperatures influence the durability and detailing conversation. The structural design should also leave clear routes for new plumbing and mechanical penetrations without weakening the lateral system.",
      permitPath:
        "Use Fresno Development Services' ADU and permit guidance to select the correct building permit path, then coordinate site plan, architecture, structural drawings, energy documents, and utility connections. A detached unit may require more site and utility information than a conversion, particularly where access is through an alley or where sewer and water connections cross the existing yard. Upload the complete package using the City's current system and answer Building and Safety comments with specific revised sheets and calculations.",
      timeline:
        "The state statute's action period for a complete ADU application in qualifying cases should not be described as a promise of a Fresno permit or a completed unit. Design time, field verification, plan-check corrections, utility trenching, summer construction conditions, and inspections remain outside that statutory window. A responsible estimate distinguishes agency review from the total project duration.",
    },
    permitSteps: [
      "Confirm the parcel is within Fresno city limits, identify the ADU type, and review City zoning, access, setback, parking, utility, and fire requirements.",
      "Inspect and measure the existing garage or house; verify foundations, slab, roof framing, wall openings, and prior unpermitted alterations before selecting a conversion detail.",
      "Coordinate structural, architectural, energy, plumbing, drainage, and electrical documents so new penetrations and equipment loads do not undermine the seismic system.",
      "Submit to Fresno Development Services through the current permit channel, track plan-check comments, and issue a coordinated response set.",
      "Schedule inspections and address field conditions through the approved revision process before covering foundations, framing, or utility work.",
    ],
    timelineGuidance: {
      statutoryWindow:
        "California Government Code section 65852.2 provides a 60-day action window for a complete ADU application in qualifying circumstances. This is not a Fresno approval guarantee and does not include design, corrections, construction, utilities, or final inspection.",
      totalDuration:
        "The project schedule depends on whether the unit is a conversion or new build, the quality of existing-condition information, City correction cycles, sewer and electrical routing, and contractor and inspection availability. It should be set only after reviewing the property.",
    },
    faqs: [
      {
        q: "What is commonly missed in a Fresno garage conversion?",
        a:
          "A garage may lack a habitable slab elevation, adequate footing, insulated envelope, or a complete lateral load path. The former vehicle door opening and new plumbing routes can also affect the structure. Those conditions should be verified rather than hidden behind a standard conversion detail.",
      },
      {
        q: "Does flat Fresno terrain mean an ADU has no site engineering issue?",
        a:
          "No. Flat sites still need positive drainage, finished-floor coordination, utility trenching, and attention to settlement or undocumented fill. The parcel's grading, flood information, and existing drainage pattern should inform the design.",
      },
      {
        q: "Does the 60-day ADU rule mean a Fresno unit will be permitted in 60 days?",
        a:
          "No. The statute addresses agency action on a complete application in qualifying cases. It does not include the time to prepare a complete package, respond to corrections, obtain utility work, build, or pass inspections.",
      },
    ],
    internalLinks: commonInternalLinks,
    sources: {
      state: statewideSources,
      city: [
        "https://www.fresno.gov/planning/adus/",
        "https://www.fresno.gov/departments/public-works/development-services/",
        "https://www.fresno.gov/departments/public-works/building-safety/",
      ],
      localConditions: [
        "https://www.fresno.gov/publicworks/water-services/",
        "https://www.fresno.gov/publicworks/wastewater/",
        "https://www.fresno.gov/planning/",
      ],
    },
  },
  {
    slug: "oakland-adu-structural-engineering",
    city: "Oakland",
    county: "Alameda County",
    title: "Oakland ADU Structural Engineering | Apex Grid",
    description:
      "Oakland ADU structural engineering for hillside additions, garage conversions, and detached units, coordinated with Planning and Building and local seismic constraints.",
    h1: "Oakland ADU Structural Engineering",
    kicker: "Accessory Dwelling Unit Engineering · Oakland",
    lede:
      "Oakland's ADU sites can range from flat, closely spaced homes to steep hillside parcels and older buildings with complicated alteration histories. Structural engineering has to account for seismic load paths, slope or retaining conditions, and construction access while matching the City's Planning and Building permit process.",
    sections: {
      localContext:
        "The City of Oakland Planning and Building Department is the local authority for zoning and building permits. Oakland publishes ADU information and permit resources, but Planning, Building, Public Works, trees, fire, and other reviews can apply differently by parcel. State ADU law does not erase Oakland's site-specific hillside, historic, creek, flood, or building-safety questions; the current City guidance and a property-specific zoning check are the starting point.",
      structuralEngineering:
        "Oakland structural scope is strongly site dependent. A flat East Oakland conversion may center on an existing slab, garage opening, and seismic bracing, while an Oakland Hills unit may require retaining-wall review, stepped foundations, slope stability coordination, and careful construction sequencing. Bay Area fault and liquefaction hazards vary with geology and elevation, and older homes may contain irregular additions or incomplete records. New shear walls, collectors, hold-downs, diaphragms, and foundations should be designed as one load path, with shoring and neighbor protection addressed when excavation is close to a property line.",
      permitPath:
        "The permit strategy should start with Oakland Planning's ADU resources and parcel information, then coordinate architectural, structural, energy, site, and fire documents before the Building permit submission. Hillside grading, trees, historic status, creek or flood conditions, and public-right-of-way work can introduce related reviews. The structural set should identify existing and proposed work, show how slope and retaining conditions are handled, and answer City comments through the current permit channel rather than relying on a detached engineering letter.",
      timeline:
        "The state ADU statute sets an agency action window for a complete application in qualifying circumstances, but that is not a total Oakland project timeline. Hillside or historic review, geotechnical and survey work, correction cycles, shoring, tree or public-way approvals, and inspections can add separate work. Any schedule should distinguish the statutory review standard from the time needed to design and build safely.",
    },
    permitSteps: [
      "Confirm Oakland jurisdiction and use Planning and Building ADU resources to check zoning, hillside or historic status, creek/flood information, trees, access, and the proposed unit type.",
      "Complete an existing-condition and topographic survey; obtain geotechnical or slope information when grade, retaining walls, fill, or excavation could govern the design.",
      "Prepare a coordinated package that shows the seismic load path, foundation or retaining work, temporary shoring assumptions, architectural scope, and required energy and utility documents.",
      "Submit through Oakland's current Planning and Building permit process and track comments from each reviewing function in the project record.",
      "Use approved plans, coordinate inspections and special inspections when required, and obtain City review before changing foundations, retaining work, or the permitted layout.",
    ],
    timelineGuidance: {
      statutoryWindow:
        "The state ADU law describes a 60-day action window for a complete application in qualifying situations. It is not a promise of Oakland approval, nor does it include design, geotechnical work, corrections, construction, or inspection time.",
      totalDuration:
        "Oakland duration depends heavily on topography, historic or tree review, the existing building, geotechnical information, correction cycles, and constrained construction access. A hillside addition should not be scheduled like a straightforward interior conversion.",
    },
    faqs: [
      {
        q: "Does every Oakland ADU need a geotechnical report?",
        a:
          "The need is project and site specific. Slope, retaining walls, excavation, fill, groundwater, liquefaction potential, or a foundation that cannot be verified can justify geotechnical input. The structural engineer should coordinate the applicable investigation with the City's current requirements rather than make a blanket promise.",
      },
      {
        q: "What makes an Oakland Hills ADU structurally different?",
        a:
          "Grade changes can create stepped foundations, retaining forces, lateral soil pressure, drainage and erosion concerns, and difficult construction sequencing. The building frame, slope, temporary work, and neighbor protection need to be considered together.",
      },
      {
        q: "Which local department handles an Oakland ADU permit?",
        a:
          "Oakland Planning and Building handles the City's zoning and building permit functions. Other City reviews may be triggered by the parcel and scope, so the current City ADU and permit resources—not a generic statewide checklist—should control the submission.",
      },
    ],
    internalLinks: commonInternalLinks,
    sources: {
      state: statewideSources,
      city: [
        "https://www.oaklandca.gov/services/accessory-dwelling-units-adus",
        "https://www.oaklandca.gov/departments/planning-and-building",
        "https://www.oaklandca.gov/services/building-permits",
      ],
      localConditions: [
        "https://www.oaklandca.gov/topics/hillside-area-planning",
        "https://www.oaklandca.gov/topics/oakland-creek",
        "https://www.ebmud.com/water/about-your-water/water-service",
      ],
    },
  },
  {
    slug: "bakersfield-adu-structural-engineering",
    city: "Bakersfield",
    county: "Kern County",
    title: "Bakersfield ADU Structural Engineering | Apex Grid",
    description:
      "Bakersfield ADU structural engineering for garage conversions, additions, and detached units, with City Development Services and Central Valley site coordination.",
    h1: "Bakersfield ADU Structural Engineering",
    kicker: "Accessory Dwelling Unit Engineering · Bakersfield",
    lede:
      "Bakersfield ADU design is shaped by hot, dry conditions, flat but variable alluvial ground, irrigation and drainage patterns, and the condition of older detached garages. Our structural drawings are developed for the City's Development Services review and for the actual foundation, framing, and access conditions found at the property.",
    sections: {
      localContext:
        "The City of Bakersfield Development Services Department, including its Building Division, is the permit authority for property within city limits. The City provides an ADU and building-permit path, while zoning, fire, utilities, grading, and public works requirements can apply based on the site and scope. A Kern County address outside city limits follows a different authority, so jurisdiction and current City forms should be confirmed before relying on a Bakersfield checklist.",
      structuralEngineering:
        "A Bakersfield conversion often involves a detached garage with a slab and framing that predate residential occupancy, an oversized vehicle opening, or undocumented alterations. A new unit requires gravity and seismic design plus foundation decisions informed by soil, fill, grading, and drainage conditions; flat terrain does not prove uniform support. Hot summers also make roof and equipment penetrations, shade structures, and outdoor mechanical supports relevant to the structural coordination. Where expansive or compressible soils are indicated, the design should follow project-specific geotechnical recommendations rather than a generic foundation assumption.",
      permitPath:
        "Use Bakersfield Development Services' current ADU guidance to determine the permit type and coordinate a site plan, architectural plans, structural calculations, energy documents, and utility information. The location of sewer and water connections, alley access, easements, and fire access can affect a detached unit more than the floor plan does. Submit through the City's current permit channel, track Building and Safety comments, and keep structural revisions synchronized with architecture and field conditions.",
      timeline:
        "The state action window for a complete ADU application in qualifying circumstances is only one part of a Bakersfield project. Design and existing-condition verification, City corrections, utility trenching, grading or drainage work, contractor availability, weather, and inspections remain outside that window. No permit or construction timeline should be presented as guaranteed without a complete project review.",
    },
    permitSteps: [
      "Confirm city limits, parcel zoning, ADU type, access, utility providers, easements, drainage, and applicable fire requirements with Bakersfield Development Services.",
      "Inspect the existing garage or house and verify slab, footing, wall and roof framing, openings, prior alterations, and the condition of any proposed connection.",
      "Coordinate the structural set with site, architectural, energy, plumbing, electrical, and utility documents, including equipment supports and new penetrations.",
      "Submit through the City's current Development Services permit process and respond to plan-check comments with revised calculations and drawings.",
      "Schedule inspections and obtain approval for engineered changes before covering foundation, framing, or utility work.",
    ],
    timelineGuidance: {
      statutoryWindow:
        "Government Code section 65852.2 includes a 60-day agency action window for a complete application in qualifying situations. It does not guarantee a Bakersfield permit, and it excludes design, corrections, utility work, construction, and inspections.",
      totalDuration:
        "A reliable schedule depends on conversion versus new construction, site and foundation information, grading and utility scope, City corrections, and inspection availability. The project team should establish a range after the parcel and existing building are reviewed.",
    },
    faqs: [
      {
        q: "Does Bakersfield's hot climate change ADU structural coordination?",
        a:
          "Heat does not replace structural code analysis, but it makes roof penetrations, shade structures, rooftop equipment, and durable exterior details important coordination items. Equipment and solar-related loads should be shown rather than added after the structural design.",
      },
      {
        q: "Can a Bakersfield garage slab be reused for an ADU?",
        a:
          "Possibly, but only after the existing slab, footing, moisture and drainage condition, framing, and proposed loads are evaluated. The former garage may need new foundations, a replacement slab or moisture detail, a sealed vehicle opening, or seismic strengthening.",
      },
      {
        q: "Who issues the permit for an ADU in Bakersfield?",
        a:
          "For property inside city limits, Bakersfield Development Services and its Building Division are the relevant local permit authority. County properties follow Kern County's process, so the address should be checked first.",
      },
    ],
    internalLinks: commonInternalLinks,
    sources: {
      state: statewideSources,
      city: [
        "https://www.bakersfieldcity.us/225/Development-Services",
        "https://www.bakersfieldcity.us/DocumentCenter/Index/ADU",
        "https://www.bakersfieldcity.us/190/Building-Safety",
      ],
      localConditions: [
        "https://www.bakersfieldcity.us/278/Engineering",
        "https://www.bakersfieldcity.us/242/Water-Resources",
        "https://www.kerncounty.com/government/departments/engineering-and-survey-services",
      ],
    },
  },
  {
    slug: "stockton-adu-structural-engineering",
    city: "Stockton",
    county: "San Joaquin County",
    title: "Stockton ADU Structural Engineering | Apex Grid",
    description:
      "Stockton ADU structural engineering for conversions and new units, coordinated with Community Development, flood-aware site planning, and Delta-region soils.",
    h1: "Stockton ADU Structural Engineering",
    kicker: "Accessory Dwelling Unit Engineering · Stockton",
    lede:
      "Stockton ADU projects sit in a river and Delta-influenced region where flood, groundwater, settlement, drainage, and access can matter alongside the frame itself. We design garage conversions, additions, and detached units around Stockton's Community Development permit process and evidence from the actual property.",
    sections: {
      localContext:
        "The City of Stockton Community Development Department is the local authority for planning and building permits within the city. Stockton's ADU information and permit center resources should be checked for the current zoning, submittal, flood, utility, and inspection requirements; a San Joaquin County parcel outside city limits follows a separate process. The ADU statute supplies statewide rules, but it does not determine whether a particular site has a drainage, levee, easement, or existing-building problem.",
      structuralEngineering:
        "Stockton's low-lying and river-connected setting makes finished-floor elevation, groundwater, settlement, and flood coordination relevant to foundation decisions on some parcels. A garage conversion should still be investigated for slab, footing, moisture, and seismic wall continuity; a detached unit may need additional review of fill, compaction, utility trenching, and drainage. Older neighborhoods can have narrow side yards or alley access, so excavation and material staging should be considered before selecting a foundation or underpinning detail.",
      permitPath:
        "Start with Stockton Community Development's ADU and permit resources, establish the parcel's flood and zoning status, and then coordinate architectural, structural, energy, utility, and site information. The structural drawings should tie new wall and roof loads into the foundation and identify any raising, replacement, or flood-related measures that affect the architectural set. Submit via the City's current permit process and keep responses to Building, Planning, Public Works, or utility comments in one coordinated revision.",
      timeline:
        "The state law's complete-application action window in qualifying cases does not measure the total Stockton project. Floodplain or drainage questions, existing foundation verification, correction cycles, sewer and electric connections, contractor access, and inspections can occur before or after agency action. A project-specific schedule should identify those dependencies rather than quote a guaranteed number of days.",
    },
    permitSteps: [
      "Confirm Stockton jurisdiction, zoning, ADU type, flood or levee context, access, utilities, easements, and applicable site or fire requirements.",
      "Survey and investigate the existing garage or house and record slab elevation, foundations, framing, openings, prior work, drainage, and access constraints.",
      "Coordinate structural calculations with architectural, energy, plumbing, electrical, drainage, and any flood-related documents before submission.",
      "Submit through Stockton Community Development's current permit-center process and respond to each review comment with a coordinated revision.",
      "Follow approved plans during construction, schedule inspections, and obtain review for field changes before covering structural or site work.",
    ],
    timelineGuidance: {
      statutoryWindow:
        "California Government Code section 65852.2 describes a 60-day action window for a complete ADU application in qualifying circumstances. It is not a Stockton approval guarantee and does not include design, corrections, construction, utility work, or inspections.",
      totalDuration:
        "Total duration depends on the unit type, flood and drainage review, existing-building conditions, utility connections, correction cycles, contractor access, and inspection availability. A detached unit in a low-lying area should not be scheduled from the statutory window alone.",
    },
    faqs: [
      {
        q: "Can flood conditions affect a Stockton ADU foundation?",
        a:
          "They can affect finished-floor, foundation, drainage, and site decisions where the parcel is in or near a mapped flood area or levee-influenced setting. The applicable City and FEMA information should be checked for the address and coordinated with structural and civil design.",
      },
      {
        q: "What should be checked before converting a Stockton garage?",
        a:
          "Verify the slab and footings, framing, moisture and drainage condition, former vehicle opening, seismic bracing, and any prior alterations. A conversion can require strengthening even when the exterior walls remain in place.",
      },
      {
        q: "Is a Stockton County property permitted by Stockton Community Development?",
        a:
          "No. Community Development is the relevant authority for property inside Stockton city limits. An address in unincorporated San Joaquin County follows the County's permit process, so the jurisdiction must be confirmed first.",
      },
    ],
    internalLinks: commonInternalLinks,
    sources: {
      state: statewideSources,
      city: [
        "https://www.stocktonca.gov/government/departments/communityDevelopment/",
        "https://www.stocktonca.gov/government/departments/communityDevelopment/buildingPermits/",
        "https://www.stocktonca.gov/government/departments/communityDevelopment/planning/",
      ],
      localConditions: [
        "https://www.stocktonca.gov/government/departments/municipalUtilities/",
        "https://www.stocktonca.gov/government/departments/publicWorks/",
        "https://www.fema.gov/flood-maps",
      ],
    },
  },
  {
    slug: "fremont-adu-structural-engineering",
    city: "Fremont",
    county: "Alameda County",
    title: "Fremont ADU Structural Engineering | Apex Grid",
    description:
      "Fremont ADU structural engineering for garage conversions, additions, and detached units, with Community Development permitting and Bay Area site review.",
    h1: "Fremont ADU Structural Engineering",
    kicker: "Accessory Dwelling Unit Engineering · Fremont",
    lede:
      "Fremont combines established suburban neighborhoods, hillside and canyon edges, creek and flood corridors, and Bay Area seismic design. A Fremont ADU structural package must fit the City's Community Development review and the home's actual garage, foundation, access, and site conditions—not a generic Bay Area detail.",
    sections: {
      localContext:
        "The City of Fremont Community Development Department, including Building and Safety and Planning, handles permits for property inside the city. Fremont publishes ADU and building-permit guidance, but the current zoning, building, fire, tree, flood, and utility requirements depend on the parcel and unit type. Neighborhoods near the hills, Mission San José, Niles, Alameda Creek, or constrained streets can require a different design and review conversation from a flat interior-lot conversion.",
      structuralEngineering:
        "Fremont structural engineering is driven by Bay Area seismic loads and by local variation in ground and topography. A garage conversion requires verification of slab, perimeter foundation, wall bracing, roof-to-wall connections, and the former vehicle opening; an addition or detached unit may involve new foundations, retaining, or a connection to an older house. Liquefaction and settlement concerns can be relevant in low-lying or filled areas, while hillside parcels need slope, retaining, and drainage coordination. PG&E service and City or regional utility work may affect equipment locations, but added loads still belong in the structural and architectural coordination.",
      permitPath:
        "Use Fremont Community Development's ADU guidance and permit portal instructions to check setbacks, height, parking, access, fire separation, and parcel-specific overlays. Coordinate architectural, structural, energy, utility, and any geotechnical or site documents before the building submission. The structural plans should show the complete lateral path and foundation interface, then answer Fremont comments through the City's current review record rather than treating a standard plan as pre-approved.",
      timeline:
        "California's ADU statute contains a complete-application action window in qualifying circumstances, but that is not a total Fremont schedule. Hillside or flood review, utility coordination, corrections, existing-condition discovery, contractor access, and inspections may add separate work. The schedule should explicitly separate statutory agency action from design and construction time.",
    },
    permitSteps: [
      "Confirm Fremont city limits and use Community Development ADU resources to check zoning, overlays, hillside or flood context, trees, access, utilities, and the proposed unit type.",
      "Survey the existing house or garage and verify foundations, slab, framing, openings, prior work, grade changes, retaining features, and available construction access.",
      "Coordinate structural, architectural, energy, utility, fire, and site documents; obtain geotechnical or civil input where soil, slope, fill, drainage, or flood conditions warrant it.",
      "Submit through Fremont's current Community Development permit process and respond to Building, Planning, or related comments with coordinated revisions.",
      "Construct from approved drawings, arrange inspections and special inspections when required, and obtain review for field changes before concealment.",
    ],
    timelineGuidance: {
      statutoryWindow:
        "Government Code section 65852.2 provides a 60-day action window for a complete ADU application in qualifying cases. It is not a guaranteed Fremont approval or construction date and does not include design, correction, utility, construction, or inspection time.",
      totalDuration:
        "Actual duration depends on the unit type, existing framing and foundation information, geotechnical or hillside needs, flood or utility questions, City correction cycles, contractor access, and inspections. The City and project team should confirm a schedule for the specific parcel.",
    },
    faqs: [
      {
        q: "Do Fremont ADUs always need a new foundation?",
        a:
          "No, but reuse has to be justified. A garage conversion may reuse a suitable slab and foundation after inspection, while a roof raise, addition, detached unit, slope, poor soil, or changed load path can require new or strengthened foundations.",
      },
      {
        q: "Why does a Fremont hillside or creek-adjacent parcel need early review?",
        a:
          "Grade, retaining, drainage, flood, and access constraints can affect where the ADU fits and how foundations are built. Those conditions can trigger related City review and change the structural approach before a building permit package is complete.",
      },
      {
        q: "Who is the permit authority for a Fremont ADU?",
        a:
          "Fremont's Community Development Department, including its Building and Safety and Planning functions, handles permits inside city limits. The City's current ADU and permit resources control; neighboring jurisdictions and unincorporated Alameda County use different processes.",
      },
    ],
    internalLinks: commonInternalLinks,
    sources: {
      state: statewideSources,
      city: [
        "https://www.fremont.gov/government/departments/community-development/accessory-dwelling-units",
        "https://www.fremont.gov/government/departments/community-development/building-safety",
        "https://www.fremont.gov/government/departments/community-development/permit-center",
      ],
      localConditions: [
        "https://www.fremont.gov/government/departments/community-development/planning-division",
        "https://www.fremont.gov/government/departments/public-works/floodplain-management",
        "https://www.acwd.com/flood-protection/",
      ],
    },
  },
];
