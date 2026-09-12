import type {
  Batch2CoreServicePage,
  Batch2CoreServiceSlug,
  Batch2StateExpansion,
} from "./batch2-core-service-types";

type ServiceBrief = {
  focus: string;
  authority: string;
  code: string;
  conditions: string;
  projects: string;
  sections: [
    { heading: string; body: string },
    { heading: string; body: string },
    { heading: string; body: string },
  ];
  steps: [string, string, string, string];
  faqs: [{ question: string; answer: string }, { question: string; answer: string }, { question: string; answer: string }];
};

type MetroBrief = {
  slug: string;
  name: string;
  county: string;
  authority: string;
  code: string;
  conditions: string;
  sources: Array<{ label: string; url: string }>;
  services: Record<Batch2CoreServiceSlug, ServiceBrief>;
};

const source = (label: string, url: string) => ({ label, url });

const metros: MetroBrief[] = [
  {
    slug: "philadelphia",
    name: "Philadelphia",
    county: "Philadelphia County",
    authority:
      "Philadelphia Department of Licenses and Inspections (L&I) is the primary building-permit authority; the Philadelphia Water Department, Streets Department, and Department of Planning and Development have separate reviews. The city's zoning and construction codes are locally administered rather than a routine suburban UCC handoff.",
    code:
      "Philadelphia's locally amended construction code is administered through L&I. Pennsylvania's 2021 UCC code package became effective January 1, 2026, subject to its transition provisions; Philadelphia's Code, zoning, accessibility, historic review, and department bulletins still control the local submittal. Confirm the edition and transition rule applicable to the permit.",
    conditions:
      "Dense rowhouse blocks, Wissahickon schist and fill, combined sewers, tidal Delaware and Schuylkill flood exposure, and hot-humid summers make urban drainage, vibration, underpinning, and floodproofing important design inputs.",
    sources: [
      source("Philadelphia L&I permits and licenses", "https://www.phila.gov/departments/department-of-licenses-and-inspections/"),
      source("Philadelphia construction code", "https://www.phila.gov/departments/department-of-licenses-and-inspections/about-the-department/construction-code/"),
      source("Philadelphia Water Department stormwater", "https://www.phila.gov/departments/philadelphia-water-department/about-us/stormwater/"),
      source("Philadelphia BEPP", "https://www.phila.gov/programs/building-energy-performance-program/"),
      source("PECO business services", "https://www.peco.com/Business"),
    ],
    services: {
      "structural-engineering": {
        focus: "protecting adjacent rowhouses while making old masonry and industrial shells work for new loads",
        authority: "L&I structural plan review, zoning/use review, and any Streets or historic-district coordination must be separated from private design responsibility",
        code: "Philadelphia amendments to the adopted IBC govern the gravity, lateral, existing-building, and special-inspection portions of the package; an existing-building analysis should identify whether an alteration triggers more than a repair",
        conditions: "party walls, shallow urban footings, Wissahickon schist transitions, undocumented alterations, and flood-prone waterfront parcels can control the structural concept more than nominal wind or seismic demand",
        projects: "Queen Village rowhouse additions, Center City tenant improvements, Navy Yard manufacturing fit-outs, and adaptive reuse of Kensington warehouses",
        sections: [
          { heading: "Party-wall load paths in a tight block", body: "A Philadelphia addition can transfer eccentric load into a neighbor's party wall, while underpinning or a new basement changes temporary works risk. Surveying the shared wall, locating old footings, and documenting neighbor-protection assumptions belong in the early structural scope." },
          { heading: "Industrial reuse at the Navy Yard and riverfront", body: "Former factories often have uneven slab elevations, crane-era framing, and unknown corrosion. A useful investigation pairs selective openings with a load inventory for new rooftop equipment, mezzanines, and vibration-sensitive production instead of assuming an empty shell meets current demand." },
          { heading: "Flood and alteration coordination", body: "Waterfront work may involve flood-elevation information, dry-floodproofing interfaces, and corrosion-resistant details. The structural narrative should identify FEMA and city floodplain questions without representing an engineering design as a guarantee of floodplain approval." },
        ],
        steps: [
          "Confirm the L&I permit path, zoning/use status, historic-district review, and whether PWD or Streets reviews are triggered.",
          "Obtain a measured survey, foundation observations, records research, and a geotechnical opinion where new excavation or underpinning is proposed.",
          "Establish gravity, lateral, temporary-condition, flood, and special-inspection criteria with the owner and responsible Pennsylvania PE.",
          "Coordinate signed calculations, drawings, neighbor-protection notes, and the L&I digital submission; respond to each AHJ comment as a project-specific revision.",
        ],
        faqs: [
          { question: "Does a Philadelphia rowhouse addition always need a structural engineer?", answer: "A permit scope and existing-condition review determine what documents L&I requires. Altering bearing walls, foundations, roof framing, or party walls is a strong reason to involve a responsible PE early; the final seal and submission requirements are confirmed for the specific permit." },
          { question: "Can an old warehouse be evaluated from architectural drawings alone?", answer: "Usually not. Existing drawings can be a starting record, but field verification, selective openings, material observations, and a load review are particularly important in Philadelphia industrial buildings with undocumented changes." },
          { question: "Who handles a Philadelphia floodplain decision?", answer: "L&I and other city departments apply the applicable city and floodplain requirements, while FEMA mapping is a reference source. The AHJ confirms the required elevations and floodproofing documentation; engineering review does not promise a floodplain determination." },
        ],
      },
      "mep-engineering": {
        focus: "routing high-density building systems through old rowhouse fabric, constrained shafts, and occupied commercial floors",
        authority: "L&I reviews the building permit and trade permits; Philadelphia Fire, PWD, the utility, and in some cases health or historic reviewers add discipline-specific conditions",
        code: "The mechanical, electrical, plumbing, fuel-gas, ventilation, and energy portions follow the locally adopted code package and Philadelphia amendments; verify edition, fire-protection interface, and trade-permit requirements with L&I before issue",
        conditions: "humid summers, winter freeze protection, combined sewers, PECO service constraints, limited roof area, and difficult riser access shape Philadelphia MEP coordination",
        projects: "restaurant conversions on South Street, Center City office-to-residential work, University City laboratories, and neighborhood mixed-use rehabs",
        sections: [
          { heading: "MEP routes in rowhouse and mixed-use conversions", body: "A narrow Philadelphia parcel often has one viable riser and little space for shafts. Early coordination should reserve fire-rated penetrations, condensate routes, grease exhaust clearances, and accessible shutoffs before architectural ceilings and tenant layouts are fixed." },
          { heading: "University City laboratory utility planning", body: "Research and clinical fit-outs need exhaust diversity, redundancy, emergency power, specialty gases, and controls that can be maintained while occupied. Utility capacity and hazardous-material interfaces should be checked with the university or institutional owner and each applicable AHJ." },
          { heading: "PECO service and combined-sewer realities", body: "Electrical demand, transformer location, and service-clearance questions can affect a small urban site as much as equipment selection. Plumbing design also needs practical backflow, grease, and stormwater decisions where the combined sewer and PWD requirements constrain discharge." },
        ],
        steps: [
          "Identify L&I building and trade permits, Philadelphia Fire review, PWD requirements, PECO service contacts, and any institutional or historic overlays.",
          "Document existing risers, services, utility bills, roof and shaft access, hazardous materials, and occupancy-specific ventilation or plumbing loads.",
          "Develop coordinated MEP layouts, load calculations, equipment schedules, controls, firestopping details, and an energy-code compliance path.",
          "Submit the discipline package through the applicable city process, obtain utility confirmations separately, and close comments without assuming an approval date.",
        ],
        faqs: [
          { question: "Does Philadelphia MEP work use the same route as a Pennsylvania suburb?", answer: "No. L&I and Philadelphia trade processes, local amendments, PWD requirements, and PECO coordination can all differ from a UCC municipality or third-party reviewer. The exact permit matrix is confirmed for the address and occupancy." },
          { question: "What makes a Center City HVAC replacement difficult?", answer: "Rooftop access, crane or street logistics, shaft capacity, tenant continuity, condensate routing, and historic or zoning constraints can govern the design. A site survey and outage plan are needed before selecting equipment." },
          { question: "Who confirms PECO electrical service capacity?", answer: "PECO confirms available service and its interconnection or upgrade requirements. The engineer can calculate demand and coordinate equipment, but neither design work nor a load letter guarantees utility capacity or construction timing." },
        ],
      },
      "civil-engineering": {
        focus: "solving stormwater and utility conflicts on impervious urban parcels where every foot of site matters",
        authority: "Philadelphia Water Department reviews stormwater and wastewater matters, while L&I, Streets, and the city's zoning process govern building, curb, access, and right-of-way decisions",
        code: "Philadelphia's stormwater regulations and PWD Stormwater Regulations supplement the statewide UCC; earth disturbance, NPDES, erosion and sediment control, utility, and right-of-way triggers must be checked independently",
        conditions: "combined sewer overflow objectives, nearly fully impervious lots, basement flood risk, tidal backwater, contaminated fill, and narrow alleys make infiltration and construction staging unusually site-specific",
        projects: "Fishtown infill, logistics improvements at the Navy Yard, schoolyard greening, and redevelopment of former industrial lots along the Delaware",
        sections: [
          { heading: "PWD volume management on impervious lots", body: "A Philadelphia site may have no room for a conventional basin. Blue roofs, subsurface storage, green infrastructure, controlled release, and a defensible drainage area map can be more useful than importing a suburban pond concept." },
          { heading: "Rights-of-way and curb coordination", body: "New curb cuts, sidewalk restoration, fire access, utility cuts, and protected bike or transit routes require city coordination beyond the property line. A civil set should show who owns each improvement and which department must review it." },
          { heading: "Fill, contamination, and flood exposure", body: "Riverfront and former industrial parcels can combine fill variability with environmental constraints. Geotechnical, environmental, and floodplain information should inform grading and utility elevations before a stormwater practice is selected." },
        ],
        steps: [
          "Confirm the parcel's zoning, PWD stormwater category, watershed and flood maps, utility records, right-of-way limits, and earth-disturbance threshold.",
          "Complete a boundary/topographic survey and coordinate geotechnical and environmental investigations for fill, infiltration, and excavation assumptions.",
          "Prepare grading, utility, PWD stormwater, erosion-and-sediment, access, and restoration drawings with calculations tied to the actual drainage areas.",
          "Route the package to PWD, L&I, Streets, and any state or conservation-district reviewers identified by the project; revise to written comments.",
        ],
        faqs: [
          { question: "Can a small Philadelphia infill site use infiltration?", answer: "Not automatically. Soil, fill, groundwater, contamination, utility clearances, and PWD criteria must support the practice. A controlled-release or storage strategy may be more appropriate, and PWD determines acceptance." },
          { question: "Is a Pennsylvania DEP NPDES permit always needed in Philadelphia?", answer: "The earth-disturbance area and project conditions determine the state permit path. Philadelphia review and PWD requirements do not replace a required DEP authorization; the erosion-and-sediment and NPDES status is confirmed with the applicable agencies." },
          { question: "Who approves a new curb cut?", answer: "The city's relevant Streets and permitting processes, together with zoning and site-access review, control the curb-cut decision. Civil drawings can document sight distance, drainage, and geometry but do not promise permission to alter the right-of-way." },
        ],
      },
      "energy-compliance": {
        focus: "turning Philadelphia's building-energy obligations into a design and operations plan rather than a last-minute COMcheck exercise",
        authority: "L&I enforces construction-code energy provisions; the Office of Sustainability administers the Building Energy Performance Program, with benchmarking and tune-up obligations that may continue after occupancy",
        code: "Use the locally accepted commercial energy-code path under Philadelphia's adopted code and amendments, then separately screen for BEPP benchmarking, tune-up, and covered-building requirements; the applicable edition should be verified at filing",
        conditions: "humid 4A weather, tall narrow façades, party-wall heat transfer, district or central plants, PECO demand charges, and limited envelope access affect realistic energy modeling",
        projects: "Center City office renovations, large multifamily conversions, hospital additions, and Navy Yard commercial buildings subject to ongoing performance reporting",
        sections: [
          { heading: "Code compliance versus BEPP operations", body: "A permit calculation demonstrates design compliance; Philadelphia's BEPP can add recurring benchmarking and tune-up responsibilities for covered buildings. Owners benefit from an early gap review that distinguishes permit documents from post-occupancy tasks." },
          { heading: "Existing façades and 4A moisture", body: "Masonry walls, replacement windows, interior insulation, and air leakage need a hygrothermal conversation, not simply a better R-value. Heating, cooling, and dehumidification choices should reflect the narrow floor plates and variable occupancy of urban buildings." },
          { heading: "Utility data as a design input", body: "PECO bills, interval data, central-plant allocation, and demand charges can expose operational problems that equipment schedules miss. Where data is incomplete, assumptions should be labeled and checked with the owner before modeling results guide capital decisions." },
        ],
        steps: [
          "Identify the L&I energy-code edition and compliance path, building size, occupancy, historic constraints, and whether Philadelphia BEPP covers the property.",
          "Collect envelope assemblies, utility data, schedules, equipment inventories, controls information, and owner priorities for electrification or fuel choice.",
          "Prepare COMcheck or approved modeling documentation, envelope and MEP details, and a separate BEPP benchmarking/tune-up action list where applicable.",
          "Submit code documents through L&I and coordinate operational obligations with the building owner; treat reviewer and program determinations as project-specific.",
        ],
        faqs: [
          { question: "Is Philadelphia BEPP the same as energy-code compliance?", answer: "No. Energy-code compliance supports a construction permit, while BEPP can require benchmarking and tune-ups for covered existing buildings. The owner should check both tracks with the city's current program guidance." },
          { question: "Can an older Center City building simply add interior insulation?", answer: "A proposed assembly needs moisture, condensation, historic, and fire-performance review. Interior insulation can change drying potential and usable floor area; the appropriate detail depends on the existing wall and the AHJ's requirements." },
          { question: "Does an energy model guarantee savings?", answer: "No. A model is an estimate based on assumptions, schedules, weather, and equipment operation. It can compare options and document a code or program path, but actual performance depends on installation, controls, maintenance, and occupancy." },
        ],
      },
      "pe-stamped-drawings": {
        focus: "preparing a discipline-specific, reviewable package for Philadelphia's multi-department permit environment",
        authority: "Philadelphia L&I determines construction-submittal requirements, while PWD, Streets, Fire, zoning, and historic reviewers may require related documents; the Pennsylvania licensing board governs the responsible professional's authority to seal",
        code: "The drawing set must address the current Philadelphia construction-code amendments and the discipline's adopted standards; edition and seal requirements are checked against L&I instructions and the project's actual scope",
        conditions: "occupied rowhouses, shared walls, narrow staging areas, historic façades, and multiple utility owners make notes, details, and responsibility boundaries especially important",
        projects: "small commercial fit-outs, permitted rooftop equipment, multifamily renovations, industrial tenant work, and structural repairs in older neighborhoods",
        sections: [
          { heading: "A seal is not a substitute for field knowledge", body: "Philadelphia drawings should identify the surveyed existing condition, assumptions, deferred items, and inspections needed during construction. Clear limits help L&I and the contractor understand what the sealed documents do and do not cover." },
          { heading: "Coordinate the city package, not only the sheets", body: "A complete submission may include zoning information, PWD material, trade applications, fire-resistance details, and historic documentation. Cross-referencing those pieces reduces contradictory dimensions and prevents a permit reviewer from receiving an isolated discipline set." },
          { heading: "Existing-building notes that contractors can use", body: "Repair details need access, sequencing, temporary shoring, and verification language suited to the actual building. Generic notes are particularly risky beside party walls, occupied floors, and old masonry where hidden conditions can change the work." },
        ],
        steps: [
          "Define the address, scope, existing-condition evidence, intended permit type, and the authorities that must receive a sealed discipline package.",
          "Resolve design criteria, calculations, code references, coordination interfaces, construction observations, and any exclusions before final drafting.",
          "Have the responsible Pennsylvania PE review, sign, and seal the applicable sheets and calculations in accordance with board and AHJ requirements.",
          "Submit through the designated Philadelphia process, track comments by department, and issue revisions that preserve the seal and document revision responsibility.",
        ],
        faqs: [
          { question: "Can a PE seal drawings for every Philadelphia trade?", answer: "A PE's scope and competence must match the work being sealed, and some trade or contractor documents follow separate city requirements. The responsible professional and L&I determine which sheets need a Pennsylvania seal." },
          { question: "Are electronic seals accepted?", answer: "Electronic submission and seal practices are controlled by current Pennsylvania board rules and L&I instructions. The responsible PE should use the required authentication method rather than relying on a scanned signature." },
          { question: "Will a stamped set guarantee a Philadelphia permit?", answer: "No. A seal communicates professional responsibility for the covered design; L&I and other departments independently review zoning, code, completeness, and site-specific conditions. Approval cannot be promised." },
        ],
      },
    },
  },
];

type MetroServiceDraft = {
  focus: string;
  authority: string;
  code: string;
  conditions: string;
  projects: string;
  sections: [string, string, string];
  bodies: [string, string, string];
  steps: [string, string, string, string];
  faqs: [{ question: string; answer: string }, { question: string; answer: string }, { question: string; answer: string }];
};

const labels: Record<Batch2CoreServiceSlug, string> = {
  "structural-engineering": "Structural Engineering",
  "mep-engineering": "MEP Engineering",
  "civil-engineering": "Civil Engineering",
  "energy-compliance": "Energy Compliance",
  "pe-stamped-drawings": "PE-Stamped Drawings",
};

function materializeLocalServiceRecords(
  briefs: Record<Batch2CoreServiceSlug, MetroServiceDraft>,
): Record<Batch2CoreServiceSlug, ServiceBrief> {
  const materialize = (slug: Batch2CoreServiceSlug): ServiceBrief => {
      const b = briefs[slug];
      return {
        ...b,
        sections: [
          { heading: b.sections[0], body: b.bodies[0] },
          { heading: b.sections[1], body: b.bodies[1] },
          { heading: b.sections[2], body: b.bodies[2] },
        ],
      };
  };
  return {
    "structural-engineering": materialize("structural-engineering"),
    "mep-engineering": materialize("mep-engineering"),
    "civil-engineering": materialize("civil-engineering"),
    "energy-compliance": materialize("energy-compliance"),
    "pe-stamped-drawings": materialize("pe-stamped-drawings"),
  };
}

const allentown: MetroBrief = {
  slug: "allentown",
  name: "Allentown",
  county: "Lehigh County",
  authority: "Allentown's Bureau of Building Standards and Safety is the municipal UCC contact; Lehigh County Conservation District and the city's Engineering and Planning bureaus handle separate site and land-development reviews.",
  code: "Pennsylvania's 2021 UCC package became effective January 1, 2026, through the city's elected enforcement program, with Allentown zoning, subdivision, stormwater, and floodplain ordinances layered onto the state code. Verify transition applicability, the accepted edition, and local amendments with the Bureau before filing.",
  conditions: "Lehigh Valley limestone and karst, former industrial fill, cold 5A winters, fast warehouse growth along I-78, and Jordan Creek/Lehigh River floodplains create unusually important subsurface and stormwater decisions.",
  sources: [
    source("Allentown Building Standards and Safety", "https://www.allentownpa.gov/Building-Standards-and-Safety"),
    source("Allentown Engineering", "https://www.allentownpa.gov/Engineering"),
    source("Lehigh County Conservation District", "https://www.lehighconservation.org/"),
    source("PPL Electric business services", "https://www.pplelectric.com/site/Business"),
      source("Pennsylvania UCC, 34 Pa. Code Chapter 403", "https://www.pacodeandbulletin.gov/Display/pacode?file=/secure/pacode/data/034/chapter403/chap403toc.html&d=.&p=1"),
  ],
  services: materializeLocalServiceRecords({
      "structural-engineering": {
        focus: "making warehouse, mill, and downtown-reuse structures reliable over variable Lehigh Valley ground",
        authority: "The Bureau reviews UCC structural documents; Planning, historic review, and the conservation district may have separate jurisdiction",
        code: "Existing-building, snow, wind, seismic, and geotechnical provisions should be cited by the responsible PE for the filing",
        conditions: "limestone cavities, mine-related fill, 3–3.5-foot frost depth, and Lehigh floodplain elevations can control foundations and lateral details",
        projects: "I-78 distribution buildings, former silk-mill conversions, Hamilton Street mixed-use rehabs, and riverfront commercial additions",
        sections: ["Karst before footing design", "Mill conversions and vibration", "Floodplain elevation coordination"],
        bodies: [
          "Allentown-area limestone can conceal voids and pinnable seams. A geotechnical program with borings and, where warranted, geophysics should precede a foundation decision; a standard spread-footing assumption is not a site investigation.",
          "Historic mills combine heavy masonry, irregular timber or steel bays, and new residential or commercial live loads. Selective openings and a bay-by-bay load path review are more useful than relying on a reused 1950s plan.",
          "A parcel beside the Lehigh River or Jordan Creek can require flood-elevation and enclosure decisions that affect finished floors, stairs, utilities, and structural durability. Those determinations remain with the AHJ and applicable floodplain rules.",
        ],
        steps: [
          "Confirm the Allentown UCC permit route, zoning and land-development status, floodplain mapping, and any historic or conservation-district review.",
          "Obtain a boundary/topographic survey, geotechnical report, existing-building records, and targeted openings for old mill or warehouse construction.",
          "Set snow, wind, seismic, frost, flood, vibration, and special-inspection criteria with the owner and responsible Pennsylvania PE.",
          "Submit sealed drawings and calculations to the Bureau and respond to written municipal or third-party review comments; no review timeline is promised.",
        ],
        faqs: [
          { question: "Why is karst a design issue in Allentown?", answer: "The Lehigh Valley limestone belt can contain solution features that change bearing and infiltration assumptions. A project-specific geotechnical investigation determines whether foundations, grouting, or site layout need adjustment." },
          { question: "Are old Allentown mills easy to convert?", answer: "No. Masonry condition, uneven foundations, historic fabric, vibration, fire separation, and new occupancy loads all need investigation. The permit authority determines the applicable existing-building path." },
          { question: "Does an Allentown floodplain map set the building elevation?", answer: "Maps inform the analysis but do not replace the city's and other authorities' determinations. Survey, flood data, and the current local ordinance are reviewed for the actual parcel." },
        ],
      },
      "mep-engineering": {
        focus: "coordinating high-bay logistics systems and older downtown utility networks",
        authority: "The Bureau reviews building and trade documents, while PPL, Allentown utilities, Fire, and land-development reviewers address service-specific items",
        code: "Mechanical, electrical, plumbing, fuel-gas, and energy documents follow the current UCC package and Allentown permit instructions",
        conditions: "cold winters, humid summers, high-bay destratification, limited mill shafts, PPL capacity, and flood-sensitive equipment rooms shape the system choice",
        projects: "Lehigh Valley warehouses, downtown restaurants, hospital support spaces, and adaptive-reuse apartments near Hamilton Street",
        sections: ["High-bay warehouse air strategy", "Downtown riser archaeology", "PPL and flood-resilient services"],
        bodies: [
          "A logistics building needs destratification, dock-door infiltration control, freeze protection, and ventilation that reflects actual storage and battery-charging use. Generic office load assumptions can materially mis-size the system.",
          "Downtown conversions frequently uncover abandoned plumbing, undersized electrical risers, and shafts interrupted by historic framing. Early field verification lets the design reserve access and firestopping before finishes conceal the route.",
          "PPL service discussions, transformer placement, emergency power, and flood-elevated equipment can affect site yield. Utility confirmation is separate from engineering and should be documented before procurement.",
        ],
        steps: [
          "List UCC building and trade permits, Fire interfaces, PPL service needs, floodplain constraints, and any institutional owner standards.",
          "Survey existing services, roof access, shafts, utility bills, process loads, occupancy schedules, and hazardous or battery-charging areas.",
          "Produce coordinated load calculations, equipment schedules, distribution diagrams, controls, energy documentation, and penetration details.",
          "Submit to the Bureau and coordinate PPL or other utility approvals independently; revise to comments without representing a guaranteed service date.",
        ],
        faqs: [
          { question: "How does a Lehigh Valley warehouse differ from an office MEP design?", answer: "Dock infiltration, storage height, destratification, sprinkler interfaces, battery charging, and utility demand can dominate the loads. The occupancy and operations must be documented before equipment is selected." },
          { question: "Can an old mill use its existing shafts?", answer: "Possibly, but field verification is essential. Shaft dimensions, fire ratings, abandoned services, structural openings, and maintenance access are checked before reuse is shown." },
          { question: "Who approves an Allentown electrical service upgrade?", answer: "PPL and the owner’s electrical contractor or utility representative confirm the service path. Engineering calculations support that conversation but do not guarantee capacity, equipment, or schedule." },
        ],
      },
      "civil-engineering": {
        focus: "balancing warehouse access, karst-sensitive infiltration, and Lehigh Valley land-development requirements",
        authority: "Allentown Engineering and Planning review local site and right-of-way matters; the Lehigh County Conservation District and Pennsylvania DEP may review erosion, sediment, and NPDES documents",
        code: "Allentown stormwater and subdivision rules operate alongside Pennsylvania Chapter 102, NPDES, and the statewide UCC; the actual drainage area and earth-disturbance triggers control",
        conditions: "karst infiltration risk, Jordan Creek and Lehigh floodplains, steep valley edges, legacy industrial fill, and large truck courts require site-specific civil modeling",
        projects: "I-78 logistics campuses, brownfield redevelopment, riverfront trails, and infill parking or loading improvements",
        sections: ["Truck courts on tight grades", "Karst and PCSM choices", "Brownfield utility records"],
        bodies: [
          "Large distribution sites must reconcile trailer turning radii, emergency access, pedestrian safety, and stormwater storage without sending runoff toward adjacent parcels. Spot elevations and swept paths should be coordinated before paving limits are fixed.",
          "Infiltration is not an automatic answer on limestone. Testing, groundwater, bedrock, and sinkhole risk inform whether volume reduction uses infiltration, lined storage, reuse, or controlled release under local review.",
          "Former industrial parcels can contain undocumented drains, tanks, and fills. Utility locating and environmental coordination should precede final profiles so a proposed main is not built through an unrecorded obstruction.",
        ],
        steps: [
          "Confirm city land-development, stormwater, floodplain, right-of-way, and Chapter 102/NPDES triggers with the appropriate offices.",
          "Complete survey, utility research, geotechnical infiltration testing, environmental review, and a watershed-based drainage-area plan.",
          "Prepare grading, access, utility, E&S, PCSM, and construction details with maintenance responsibilities clearly assigned.",
          "Submit to Allentown, the conservation district, DEP, and utilities as applicable, then track written comments and permit conditions.",
        ],
        faqs: [
          { question: "Can an Allentown warehouse basin infiltrate?", answer: "Only if testing and the agencies support it. Karst, groundwater, bedrock, contamination, and nearby foundations may favor lined storage or controlled release instead." },
          { question: "Who reviews a one-acre-plus disturbance?", answer: "Pennsylvania DEP Chapter 102 and the delegated conservation-district process may require E&S and NPDES authorization, in addition to city land-development review. The threshold and permit path are confirmed for the scope." },
          { question: "Does civil engineering include utility capacity?", answer: "It can coordinate utility alignments and demands, but each provider confirms available capacity, connection conditions, and timing. A plan cannot promise that a public main or service will accept the proposed load." },
        ],
      },
      "energy-compliance": {
        focus: "documenting cold-climate energy compliance for fast-growing Lehigh Valley commercial buildings",
        authority: "The Bureau enforces energy provisions through the UCC; PPL data and owner operations inform, but do not replace, the permit documentation",
        code: "Pennsylvania's 2021 UCC commercial energy provisions now reference the 2021 IECC, effective January 1, 2026, with any permit transition determined by the applicable filing rule; confirm Philadelphia's accepted compliance documentation and local submittal requirements",
        conditions: "IECC 5A heating demand, warehouse infiltration, roof snow, heat-pump defrost, gas availability, and large PPL peak demand drive the compliance strategy",
        projects: "tilt-up logistics centers, Lehigh University-area laboratories, retail renovations, and mill-to-apartment conversions",
        sections: ["Warehouse envelope and infiltration", "Heat pumps in a 5A winter", "Existing-building documentation"],
        bodies: [
          "A Lehigh Valley distribution envelope must address dock-door leakage, roof insulation continuity, slab edges, and daylighting controls. A compliance form is strongest when its assemblies match the details the contractor will actually build.",
          "Heat pumps can work in this climate, but defrost, low-temperature capacity, supplemental heat, domestic hot water, and electrical service should be modeled together. Fuel selection is an owner decision, not a promised outcome of code review.",
          "Existing mills rarely have complete envelope records. Field dimensions, window condition, air-sealing opportunities, and historic constraints should be logged before an alteration path is selected.",
        ],
        steps: [
          "Confirm the Bureau’s current commercial energy-code edition, building area, use groups, alteration scope, and available PPL consumption data.",
          "Inventory assemblies, fenestration, schedules, process loads, HVAC equipment, controls, utility tariffs, and owner electrification goals.",
          "Complete COMcheck or an accepted model and align the report with envelope, lighting, HVAC, and domestic-water drawings.",
          "Submit energy documents with the UCC package and address reviewer questions; projected performance remains dependent on construction and operation.",
        ],
        faqs: [
          { question: "Which energy-code edition should an Allentown applicant use now?", answer: "The 2021 Pennsylvania UCC energy provisions took effect January 1, 2026, while transition provisions can depend on the permit and project status. The Bureau confirms the accepted documentation and edition for the address before filing." },
          { question: "Can COMcheck model warehouse process loads?", answer: "COMcheck covers its defined building components and systems, while unusual process loads may require separate documentation or modeling. The accepted path is confirmed with the AHJ." },
          { question: "Will a model prove the owner’s utility savings?", answer: "No. Compliance and comparison modeling use assumptions and do not guarantee bills or future performance. Commissioning, controls, occupancy, and utility rates affect results." },
        ],
      },
      "pe-stamped-drawings": {
        focus: "producing clear sealed packages for Allentown's municipal UCC and land-development interfaces",
        authority: "The Bureau identifies building-submittal requirements and the Pennsylvania registration board governs the responsible PE's seal; site documents may separately go to city Engineering or the conservation district",
        code: "A sealed set should cite the current UCC, Allentown ordinances, discipline standards, and permit-specific amendments rather than relying on an unqualified generic code note",
        conditions: "large logistics parcels, older mill interiors, karst uncertainty, and multiple city reviewers make assumptions and sheet responsibility especially consequential",
        projects: "tenant improvements, warehouse mezzanines, service upgrades, mill conversions, and small commercial additions",
        sections: ["A package matched to the AHJ", "Existing conditions and limitations", "Lehigh Valley review coordination"],
        bodies: [
          "Allentown submissions often combine a building package with site and utility material. The index should show which sheets are sealed, which are owner or contractor documents, and which agencies receive the related information.",
          "When a mill or brownfield record is incomplete, sealed drawings should state field-verification requirements, hidden-condition responses, and construction observation limits. That is more protective than implying every concealed condition is known.",
          "A Pennsylvania PE seal does not approve zoning, stormwater, utility capacity, or a conservation-district permit. Those boundaries should be explicit so the owner can route each document to the correct reviewer.",
        ],
        steps: [
          "Define scope, address, UCC occupancy, local review agencies, existing-condition evidence, and the sheets that require a Pennsylvania PE seal.",
          "Resolve calculations, details, code citations, coordination interfaces, inspection notes, and exclusions before issuing the final set.",
          "Have the responsible PE review, sign, and authenticate the applicable drawings and calculations under Pennsylvania board and AHJ rules.",
          "Submit through the Bureau and other identified offices, then issue controlled revisions responding to their written comments.",
        ],
        faqs: [
          { question: "Does a PE-stamped set cover Allentown land-development approval?", answer: "No. A seal covers the professional work within its scope; city planning, engineering, conservation-district, zoning, and utility approvals remain separate decisions." },
          { question: "What should an old mill drawing set say about hidden conditions?", answer: "It should identify survey limits, opening locations, assumptions, inspection hold points, and a process for addressing conditions that differ from the documents. The final language is project-specific." },
          { question: "Can a seal guarantee UCC approval?", answer: "No. The Bureau reviews completeness, code, zoning interfaces, and other requirements independently. Responsible PE licensure and the correct seal are confirmed per project, but approval cannot be guaranteed." },
        ],
      },
    },
  ),
};

const pittsburgh: MetroBrief = {
  slug: "pittsburgh",
  name: "Pittsburgh",
  county: "Allegheny County",
  authority: "Pittsburgh Department of Permits, Licenses, and Inspections (PLI) is the building AHJ, with zoning, Public Works, Water and Sewer Authority, and county or state environmental reviews added as applicable.",
  code: "Pittsburgh administers the 2021 Pennsylvania UCC package effective January 1, 2026, through PLI with local amendments and procedures rather than treating every project as a generic suburban UCC filing. Confirm transition applicability, zoning overlays, historic review, and PLI trade-review route at the address.",
  conditions: "Steep hillsides, landslide-prone colluvium, mine workings, former steel and mill sites, combined sewers, freeze-thaw, and intense rainfall make Pittsburgh site and existing-building work highly location-dependent.",
  sources: [
    source("Pittsburgh PLI", "https://www.pittsburghpa.gov/PLI"),
    source("Pittsburgh zoning code", "https://pittsburghpa.gov/dcp/zoning"),
    source("ALCOSAN development services", "https://www.alcosan.org/work-with-us/development-services"),
    source("Duquesne Light business", "https://www.duquesnelight.com/business"),
    source("Allegheny County Conservation District", "https://alleghenyconservation.org/"),
  ],
  services: materializeLocalServiceRecords({
      "structural-engineering": {
        focus: "stabilizing hillside buildings and adapting former steel-city structures to new occupancy",
        authority: "PLI reviews the structural permit package; zoning, historic, Public Works, and geotechnical conditions can add independent requirements",
        code: "The applicable Pittsburgh code, existing-building provisions, snow and wind criteria, and project-specific special inspections must be confirmed with PLI",
        conditions: "steep slopes, mine subsidence, landslides, masonry party walls, river floodplains, and freeze-thaw deterioration shape the structural solution",
        projects: "Strip District conversions, Oakland institutional additions, hillside homes, and former mill or warehouse redevelopment",
        sections: ["Hillside movement and foundations", "Steel-city adaptive reuse", "River corridor durability"],
        bodies: [
          "On Pittsburgh hillsides, retaining walls, shallow landslide planes, drainage, and temporary excavation support can govern before the building frame does. Geotechnical recommendations and survey control should be integrated into the structural basis of design.",
          "Former mills and warehouses may have riveted frames, crane beams, brittle masonry, and corrosion hidden beneath coatings. New floor loads, vibration-sensitive uses, and openings should be checked bay by bay with field observations.",
          "Monongahela and Ohio river corridors add flood and corrosion questions to otherwise ordinary renovations. Equipment supports, anchorage, and flood-resilient details need coordination with the elevation and use requirements determined by the AHJ.",
        ],
        steps: [
          "Confirm PLI permit and zoning routes, slope or landslide review, historic status, floodplain information, and any Public Works interface.",
          "Coordinate survey, geotechnical, mine-subsidence, existing-frame, and material-condition investigations before fixing the structural scheme.",
          "Set gravity, lateral, slope-stability, snow, flood, temporary-work, and special-inspection criteria with the responsible Pennsylvania PE.",
          "Submit sealed plans and calculations through PLI and address written comments; field changes remain subject to the responsible PE and AHJ.",
        ],
        faqs: [
          { question: "Why does a Pittsburgh addition need a geotechnical review?", answer: "A steep parcel may have colluvium, old fills, mine workings, or drainage that affects both temporary excavation and permanent foundations. The geotechnical professional determines the appropriate investigation." },
          { question: "Can old mill steel support a new apartment floor?", answer: "Only after member condition, connections, vibration, fire protection, and new load paths are evaluated. Historic records alone are not a substitute for field verification." },
          { question: "Does PLI decide whether a hillside is safe?", answer: "PLI reviews its required documents, but geotechnical and structural professionals provide the project analysis and other agencies may have jurisdiction. No engineering review promises a permit or a stability outcome." },
        ],
      },
      "mep-engineering": {
        focus: "fitting modern ventilation, power, and plumbing into steep, historic, and institution-heavy neighborhoods",
        authority: "PLI receives building and trade documents; Pittsburgh Water, Duquesne Light, Peoples Natural Gas, Fire, and institutional owners may impose separate requirements",
        code: "Mechanical, electrical, plumbing, fuel-gas, fire, and energy requirements follow the currently accepted Pittsburgh code package and PLI instructions",
        conditions: "winter freeze protection, humid summers, tall slopes, limited shafts, combined sewer constraints, and utility capacity shape MEP choices",
        projects: "Oakland laboratories, East Liberty mixed-use work, restaurant conversions, and robotics or advanced-manufacturing tenant spaces",
        sections: ["Laboratory exhaust in Oakland", "Steep-site utility routing", "Power for advanced manufacturing"],
        bodies: [
          "University and medical districts demand exhaust diversity, controls, emergency power, and maintenance access that ordinary office templates miss. The owner, fire authority, and hazardous-material program should be part of the basis of design.",
          "A Pittsburgh slope can put the main service at one elevation and the equipment room at another. Drainage, backflow, freeze protection, pressure zones, and accessible shutoffs should be mapped in section, not only on a plan.",
          "Robotics and fabrication users can produce high starting currents, process heat, compressed-air loads, and harmonic concerns. Duquesne Light and the owner must confirm service assumptions before the design is priced.",
        ],
        steps: [
          "Identify PLI building and trade permits, Fire review, water and sewer interfaces, utility territories, owner standards, and hazardous-use requirements.",
          "Survey service entrances, shafts, roofs, equipment rooms, utility bills, process loads, and occupied-building shutdown constraints.",
          "Develop coordinated plans, load calculations, controls, equipment schedules, firestopping, energy documentation, and maintenance clearances.",
          "Submit to PLI and coordinate utility or institutional approvals independently; respond to comments without promising review or connection dates.",
        ],
        faqs: [
          { question: "What is distinctive about Pittsburgh MEP routing?", answer: "Steep grades, old shafts, occupied institutional buildings, combined sewers, and river or hillside conditions can all affect routing. A three-dimensional field survey is often more valuable than a copied plan." },
          { question: "Does Duquesne Light approve a calculated electrical load?", answer: "The utility confirms service availability and upgrade conditions. Engineering calculations support the request but do not guarantee capacity, transformer placement, or schedule." },
          { question: "Do laboratory exhaust systems need only a mechanical permit?", answer: "The use, exhaust discharge, fire protection, hazardous materials, and owner or institutional standards may involve multiple reviews. PLI and the project-specific authorities determine the required package." },
        ],
      },
      "civil-engineering": {
        focus: "making steep, combined-sewer sites buildable without treating Pittsburgh topography as a drafting afterthought",
        authority: "Pittsburgh DCP/PLI and Public Works review city site and right-of-way matters; ALCOSAN, Allegheny County Conservation District, and DEP may control sewer and earth-disturbance elements",
        code: "City stormwater and zoning standards operate with Pennsylvania Chapter 102, ALCOSAN development criteria, and applicable MS4 or watershed requirements",
        conditions: "steep grades, landslide hazards, combined sewer overflows, mine subsidence, intense rainfall, and narrow rights-of-way drive civil design",
        projects: "hilltop infill, riverfront brownfields, trail and streetscape projects, and Oakland or Lawrenceville redevelopment",
        sections: ["A street network on steep grades", "ALCOSAN and runoff volume", "Mine legacy and brownfields"],
        bodies: [
          "A site can lose usable area quickly when emergency access, retaining walls, sidewalk grades, and truck movements are tested together. Profile views and construction staging should accompany grading, especially on a hillside.",
          "Combined-sewer capacity and regional wet-weather goals make detention, reuse, and controlled release more than a checkbox. ALCOSAN and city criteria should be reconciled with the parcel's actual connection point and downstream constraints.",
          "Mine entries, slag, fill, and former industrial contaminants can alter both excavation and stormwater infiltration. Environmental and geotechnical findings should be carried into utility and pavement details.",
        ],
        steps: [
          "Confirm zoning, steep-slope or landslide review, ALCOSAN connection rules, Public Works right-of-way limits, and Chapter 102 triggers.",
          "Collect survey, utility records, watershed and flood data, geotechnical information, environmental records, and infiltration or groundwater testing.",
          "Prepare grading, retaining, access, stormwater, utility, E&S, and maintenance documents that identify each agency's responsibility.",
          "Submit the relevant portions to PLI, city departments, ALCOSAN, conservation district, DEP, and utilities, then track written conditions.",
        ],
        faqs: [
          { question: "Why can’t a Pittsburgh site simply drain to the street?", answer: "Street and combined-sewer capacity, city stormwater requirements, erosion, and downstream flooding concerns can restrict discharge. The accepted approach is determined from the actual connection and watershed." },
          { question: "What does mine history change in civil design?", answer: "It can affect settlement, excavation safety, infiltration, utility trenching, and foundation locations. A records review and qualified geotechnical investigation establish the project-specific response." },
          { question: "Who reviews Pittsburgh earth disturbance?", answer: "The city, county conservation district, and Pennsylvania DEP roles depend on area, permit delegation, watershed, and project conditions. An engineering set does not replace required NPDES or E&S authorization." },
        ],
      },
      "energy-compliance": {
        focus: "connecting Pittsburgh's cold-climate envelope work with institutional operations and building performance goals",
        authority: "PLI reviews construction-code energy documents; owner programs, utility data, and any city or district performance commitment are separate from that permit review",
        code: "Pittsburgh projects should be checked against the 2021 Pennsylvania UCC energy provisions effective January 1, 2026, the applicable transition rule, and any locally required energy documentation or program requirements",
        conditions: "5A heating, summer humidity, old masonry, steam or hydronic plants, infiltration at loading doors, and Duquesne Light demand affect compliance and operations",
        projects: "university research buildings, Downtown office retrofits, mill conversions, and high-bay fabrication facilities",
        sections: ["Masonry and moisture", "Campus plant coordination", "High-bay demand management"],
        bodies: [
          "A Pittsburgh masonry retrofit must consider vapor drive, freeze-thaw, interior surface temperatures, and historic appearance. Better nominal insulation is not automatically a durable wall assembly.",
          "Campus and hospital projects may share steam, chilled-water, or electric infrastructure across buildings. Meter boundaries, plant temperatures, redundancy, and controls should be documented before a project claims savings.",
          "Fabrication buildings can combine large fans, process loads, dock leakage, and intermittent schedules. A demand and controls strategy should reflect real operations rather than an office occupancy profile.",
        ],
        steps: [
          "Confirm PLI's current energy-code path, building use and alteration category, owner performance targets, and available utility or plant data.",
          "Survey envelope assemblies, fenestration, schedules, process equipment, central plants, controls, and Duquesne Light tariff information.",
          "Prepare accepted compliance calculations or modeling and coordinate every modeled assembly and system with the permit drawings.",
          "Submit through PLI and keep owner performance recommendations separate from the code certificate; verify construction and commissioning responsibilities.",
        ],
        faqs: [
          { question: "Does a Pittsburgh masonry retrofit need hygrothermal analysis?", answer: "The existing wall, exposure, insulation location, interior humidity, and historic constraints determine the need. Those conditions should be evaluated before selecting an enclosure detail." },
          { question: "Is a campus energy model a permit document?", answer: "A model may support design decisions or an owner program, while the permit requires the AHJ's accepted compliance documentation. The two purposes and assumptions should not be conflated." },
          { question: "Does energy compliance guarantee a lower Duquesne Light bill?", answer: "No. Rates, demand, weather, operation, controls, and commissioning determine actual bills. Compliance documents demonstrate a code path, not a financial guarantee." },
        ],
      },
      "pe-stamped-drawings": {
        focus: "delivering disciplined sealed documents for Pittsburgh's PLI, utility, and steep-site review interfaces",
        authority: "PLI sets construction-submittal requirements and the Pennsylvania board governs professional seals; Public Works, ALCOSAN, zoning, and historic reviewers may require related documents",
        code: "The sealed package should cite current Pittsburgh amendments and applicable discipline standards, with explicit assumptions for existing buildings, slopes, utilities, and special inspections",
        conditions: "hillside excavation, occupied institutional space, old steel, narrow streets, and mine or brownfield uncertainty make scope boundaries critical",
        projects: "tenant renovations, retaining and foundation work, rooftop equipment, laboratory upgrades, and adaptive reuse",
        sections: ["Sealed scope in a multi-agency city", "Hillside construction notes", "Reviewable existing-building sheets"],
        bodies: [
          "A Pittsburgh package should distinguish PLI building sheets from site, sewer, right-of-way, and utility documents. A well-indexed set gives each reviewer the design information needed without implying one seal covers every decision.",
          "Temporary excavation, shoring, dewatering, haul routes, and neighbor monitoring may be central to a hillside project. Drawings should identify the responsible design and observation limits rather than hiding them in generic notes.",
          "Field-verification points, material testing, and special inspections should be placed beside the affected details. This gives the contractor a usable path when an old wall or steel connection differs from the record.",
        ],
        steps: [
          "Define the project scope, PLI permit type, zoning and site interfaces, existing-condition record, and sheets requiring a Pennsylvania PE seal.",
          "Resolve calculations, code criteria, details, construction observation language, special inspections, and coordination exclusions.",
          "Have the responsible PE review and authenticate the applicable documents under Pennsylvania board and PLI requirements.",
          "Submit the controlled set to PLI and other agencies, then maintain revision tracking through written review comments and field changes.",
        ],
        faqs: [
          { question: "Does one Pittsburgh PE seal cover an ALCOSAN submission?", answer: "The responsible professional and each agency determine the required documents and seal scope. A building seal does not automatically authorize sewer, right-of-way, or utility work." },
          { question: "Should shoring appear on a permanent structural set?", answer: "The project team must determine the temporary-work design responsibility and AHJ requirements. If shoring affects adjacent property or public ways, its scope and review path should be explicit." },
          { question: "Can a stamped drawing promise PLI approval?", answer: "No. PLI independently evaluates code, zoning, completeness, and site conditions. Licensure and sealing are confirmed per project, but approval and timing are never guaranteed." },
        ],
      },
    },
  ),
};

const harrisburg: MetroBrief = {
  slug: "harrisburg",
  name: "Harrisburg",
  county: "Dauphin County",
  authority: "The City of Harrisburg's Bureau of Building and Housing Development is the local building-permit contact; Dauphin County Conservation District, Susquehanna Township or neighboring municipal offices, and state agencies may have separate authority outside the city.",
  code: "Harrisburg participates in Pennsylvania's 2021 UCC enforcement framework effective January 1, 2026, with city zoning, floodplain, property-maintenance, and land-development requirements layered onto state code. Confirm transition applicability and whether the parcel is city-enforced or in a neighboring Dauphin County municipality.",
  conditions: "Susquehanna River and Paxton Creek flood exposure, freeze-thaw, urban fill, older masonry, and the I-81/I-83 logistics and state-government market shape Harrisburg projects.",
  sources: [
    source("City of Harrisburg Building and Housing", "https://www.harrisburgpa.gov/bureau-of-building-and-housing-development/"),
    source("Pennsylvania UCC, 34 Pa. Code Chapter 403", "https://www.pacodeandbulletin.gov/Display/pacode?file=/secure/pacode/data/034/chapter403/chap403toc.html&d=.&p=1"),
    source("Dauphin County Conservation District", "https://www.dauphincd.org/"),
    source("PPL Electric business", "https://www.pplelectric.com/site/Business"),
    source("Susquehanna River Basin Commission", "https://www.srbc.net/"),
  ],
  services: materializeLocalServiceRecords({
      "structural-engineering": {
        focus: "repairing older capital-city buildings while accounting for river flooding and urban fill",
        authority: "The city Bureau reviews UCC structural work; floodplain, historic, zoning, and state-owner reviews may run alongside it",
        code: "The current UCC edition, existing-building provisions, flood loads, snow, wind, and special inspections should be verified at filing",
        conditions: "Susquehanna and Paxton Creek flood elevations, soft alluvial soils, masonry deterioration, and freeze-thaw govern many sites",
        projects: "state-office renovations, Midtown mixed-use buildings, warehouse conversions, and river-adjacent civic work",
        sections: ["Alluvial soils and old foundations", "Civic-building alterations", "River flood detailing"],
        bodies: [
          "Alluvial deposits near the Susquehanna can make settlement and groundwater more important than seismic demand. Foundation observations and geotechnical recommendations should be reconciled with old basements before underpinning or additions.",
          "State-office and civic alterations often require phasing, security coordination, continuity of egress, and records that span several renovations. Structural documents should identify occupied-building sequencing and survey limitations.",
          "Flood exposure changes the durability and elevation conversation for utilities, stairs, enclosure walls, and replacement framing. The current floodplain authority determines required elevations; the engineer should not promise a map or permit outcome.",
        ],
        steps: [
          "Identify the city or neighboring municipal AHJ, zoning and floodplain path, historic review, owner security needs, and UCC permit category.",
          "Perform survey, record research, foundation openings, geotechnical review, and flood-elevation coordination appropriate to the site.",
          "Set gravity, lateral, snow, flood, temporary-condition, and special-inspection criteria with the responsible Pennsylvania PE.",
          "Submit sealed documents to the identified AHJ and respond to written comments; coordinate state-owner reviews separately where applicable.",
        ],
        faqs: [
          { question: "Does a Harrisburg riverfront project need a different foundation study?", answer: "Alluvial soils, groundwater, fill, and flood exposure can alter foundation and excavation decisions. A qualified geotechnical investigation establishes what the parcel needs." },
          { question: "Can an office alteration ignore existing drawings?", answer: "No. Older records often omit later openings, added equipment, and repairs. Field verification and an occupied-building survey are needed before relying on them." },
          { question: "Who confirms Harrisburg floodplain requirements?", answer: "The local floodplain and building authorities apply current maps and ordinances, with FEMA data as a reference. The project team confirms the actual requirements for the parcel." },
        ],
      },
      "mep-engineering": {
        focus: "coordinating resilient systems for state offices, civic facilities, and Susquehanna Valley distribution space",
        authority: "The city Bureau reviews building and trade documents, while PPL, water and sewer authorities, Fire, and state facility owners add their own reviews",
        code: "The accepted UCC mechanical, plumbing, electrical, fuel-gas, fire, and energy provisions must be verified with the local permit office and owner",
        conditions: "cold winters, humid summers, flood-sensitive basements, secure state buildings, and PPL demand or backup-power constraints influence system layouts",
        projects: "Capitol-area offices, courthouse support work, refrigerated logistics, and older downtown retail-to-residential conversions",
        sections: ["Continuity in state facilities", "Flood-aware equipment rooms", "Warehouse ventilation"],
        bodies: [
          "State and civic buildings may require temporary cooling, secure access, redundant power, and strict outage windows. Controls and phasing need owner sign-off before a permit set freezes equipment locations.",
          "Basement electrical rooms and boilers near flood-prone corridors deserve elevation, protection, drainage, and emergency-access review. A flood-resilient concept still needs the AHJ and owner to confirm acceptable measures.",
          "Distribution facilities bring loading-door infiltration, battery charging, refrigeration, and high ventilation rates together. The operating profile should drive the load calculation rather than a generic industrial template.",
        ],
        steps: [
          "Confirm the Harrisburg or neighboring municipal permit office, owner standards, Fire review, utility territories, floodplain triggers, and trade permits.",
          "Survey existing equipment, shafts, service capacity, controls, security constraints, schedules, and outage or phasing requirements.",
          "Prepare coordinated MEP plans, calculations, energy documents, equipment schedules, emergency power, and flood-protection details.",
          "Submit to the AHJ and utility or owner reviewers, then close comments through controlled revisions without promising an inspection or connection date.",
        ],
        faqs: [
          { question: "Why coordinate phasing before a Harrisburg office permit?", answer: "Occupied state and civic buildings may need continuous cooling, security, egress, and emergency power. Phasing affects equipment, controls, and temporary services and should be part of the design basis." },
          { question: "Should flood-sensitive equipment be in a basement?", answer: "The project team should evaluate flood elevations, protection, access, and code requirements; relocation may be appropriate but is not automatic. The local authority and owner confirm the accepted solution." },
          { question: "Who confirms PPL service for a warehouse?", answer: "PPL confirms available service and upgrade conditions. The engineer documents calculated demand and coordinates the request, but utility capacity and timing remain outside a design guarantee." },
        ],
      },
      "civil-engineering": {
        focus: "planning flood-conscious redevelopment and stormwater for the Susquehanna capital region",
        authority: "Harrisburg engineering and planning offices review city site work; Dauphin County Conservation District and DEP address earth disturbance, while SRBC or utilities may have separate authority",
        code: "Local stormwater and floodplain rules work with Pennsylvania Chapter 102, county watershed plans, SRBC requirements where triggered, and UCC site interfaces",
        conditions: "Susquehanna and Paxton Creek flooding, urban combined or legacy sewers, alluvial groundwater, steep suburban edges, and I-81 truck circulation shape civil design",
        projects: "riverfront redevelopment, state-campus improvements, I-81 logistics sites, and Midtown infill",
        sections: ["Floodplain grading and access", "Paxton Creek runoff", "Urban utility uncertainty"],
        bodies: [
          "Riverfront grading must keep accessible routes and emergency access functional while meeting floodplain constraints. Finished floors, parking, utilities, and construction entrances should be tested together in profile.",
          "Paxton Creek drainage responses need watershed context rather than an isolated pipe calculation. Detention, volume reduction, outfall stability, and downstream capacity should be explained in terms the city and conservation district can review.",
          "Older streets can contain undocumented services and abandoned connections. Utility research, test pits, and coordination with the owner and providers should precede final alignments and pavement restoration limits.",
        ],
        steps: [
          "Confirm the municipal boundary, floodplain, watershed, zoning, right-of-way, Chapter 102, SRBC, and local stormwater triggers.",
          "Obtain survey, utility research, flood and drainage data, geotechnical testing, and environmental information for fill or former uses.",
          "Prepare grading, access, utility, stormwater, E&S, PCSM, and restoration drawings with maintenance and ownership responsibilities.",
          "Submit to the city, county conservation district, DEP, SRBC, and utilities as applicable, then track conditions through construction documents.",
        ],
        faqs: [
          { question: "Can a riverfront Harrisburg site raise all of its finished grades?", answer: "Floodplain, access, adjacent properties, utilities, and roadway connections constrain grading. The AHJ and floodplain rules determine the acceptable strategy for the parcel." },
          { question: "Does SRBC review every Harrisburg stormwater project?", answer: "SRBC jurisdiction depends on the activity and water-resource triggers; local and DEP requirements may also apply. The project team confirms the agencies rather than assuming one permit replaces another." },
          { question: "Are city utility records complete?", answer: "Records are valuable but may not show every legacy connection. Survey, locating, and field verification are prudent before excavation or final utility design." },
        ],
      },
      "energy-compliance": {
        focus: "documenting practical energy compliance for government, warehouse, and adaptive-reuse buildings in climate zone 5A",
        authority: "The local UCC enforcing agency reviews construction energy documents; PPL data, state-owner standards, and operational goals are separate inputs",
        code: "Verify the 2021 Pennsylvania UCC commercial energy provisions effective January 1, 2026, the permit transition rule, and Harrisburg or owner requirements before selecting COMcheck or an alternate modeling path",
        conditions: "cold winters, humid summers, old masonry, flood-related equipment choices, secure occupancy schedules, and warehouse infiltration influence the analysis",
        projects: "Capitol-area office upgrades, public safety buildings, distribution centers, and Midtown conversions",
        sections: ["Government schedules and controls", "Envelope decisions in old masonry", "Flood and energy resilience"],
        bodies: [
          "Government buildings often have predictable schedules but strict security and ventilation requirements. Controls sequences, after-hours operation, and commissioning should be documented instead of assuming an office default.",
          "Masonry retrofits in Harrisburg need attention to air leakage, moisture, window replacement, and interior surface temperature. An energy improvement should be checked against durability and historic constraints.",
          "Flood-conscious equipment placement can reduce resilience risk while changing distribution losses, pipe lengths, and electrical demand. The model should reflect the selected layout and not treat flood work as unrelated scope.",
        ],
        steps: [
          "Confirm the AHJ's energy-code edition and path, occupancy, alteration category, owner criteria, flood exposure, and available PPL data.",
          "Inventory envelope, lighting, HVAC, controls, domestic water, schedules, process loads, and equipment-room constraints.",
          "Prepare accepted code calculations or modeling, then coordinate reports with the architectural and MEP details actually submitted.",
          "Submit with the UCC package and separately document owner performance or commissioning tasks; actual savings depend on operation.",
        ],
        faqs: [
          { question: "What energy-code transition applies in Harrisburg?", answer: "Pennsylvania's 2021 UCC package took effect January 1, 2026. The city or authorized code agency confirms whether a permit qualifies for a transition provision and which compliance documentation accompanies the filing." },
          { question: "How does a flood requirement affect energy design?", answer: "Equipment location, pipe routing, controls, and emergency power may change. The design should model the actual resilient configuration rather than assume flood protection has no energy impact." },
          { question: "Can COMcheck document a state-office renovation?", answer: "It may document the applicable components when its scope fits; unusual existing conditions or systems may need another accepted path. The AHJ confirms the required documentation." },
        ],
      },
      "pe-stamped-drawings": {
        focus: "assembling controlled sealed documents for Harrisburg's city, county, and state-owner interfaces",
        authority: "The city Bureau and other municipal AHJs set submittal requirements, while Pennsylvania's board governs professional sealing; state facilities may impose procurement and review standards",
        code: "The set should identify the current UCC, Harrisburg amendments and ordinances, floodplain provisions, state-owner standards, and each discipline's seal scope",
        conditions: "river flood exposure, occupied offices, old foundations, utility uncertainty, and public procurement review make clear document limits essential",
        projects: "public-office renovations, warehouse tenant improvements, flood-resilient utilities, and downtown adaptive reuse",
        sections: ["Public-owner document control", "Flood notes with real limits", "Coordinating municipal reviews"],
        bodies: [
          "A public project needs an index, revision history, and clearly assigned responsibilities across building, site, security, and utility documents. A PE seal does not replace a state-owner or procurement review.",
          "Flood notes should describe elevations, materials, utilities, and inspection assumptions actually analyzed. They should not imply that a seal itself establishes eligibility for a floodplain exception.",
          "Harrisburg packages can cross city, county, conservation-district, and utility boundaries. Cross-references and agency-specific cover sheets help prevent an accurate discipline set from being routed to the wrong reviewer.",
        ],
        steps: [
          "Confirm the parcel's AHJ, project procurement requirements, flood and zoning overlays, existing evidence, and discipline sheets needing a Pennsylvania PE seal.",
          "Resolve calculations, criteria, field-verification notes, inspection responsibilities, coordination interfaces, and exclusions.",
          "Have the responsible PE review and authenticate the final applicable documents under Pennsylvania board and AHJ rules.",
          "Submit controlled files to each identified reviewer and maintain comment and revision tracking through construction.",
        ],
        faqs: [
          { question: "Does a city seal satisfy a state-owner review?", answer: "No. A responsible PE's seal and the owner's or procurement agency's review are separate requirements. The project team confirms each document path." },
          { question: "Can a stamped flood note guarantee eligibility?", answer: "No. Floodplain authorities evaluate maps, elevations, use, and local rules. Engineering documents support that review but cannot promise an exception or approval." },
          { question: "Who chooses the responsible PE?", answer: "The project owner and design firm select a properly licensed professional with suitable competence and scope. Responsible Pennsylvania licensure and sealing are confirmed for the actual project." },
        ],
      },
    },
  ),
};

const scranton: MetroBrief = {
  slug: "scranton",
  name: "Scranton",
  county: "Lackawanna County",
  authority: "Scranton's Department of Licensing, Inspections and Permits is the city building AHJ; Lackawanna County Conservation District, sewer authorities, and neighboring municipalities have separate jurisdiction outside the city.",
  code: "The Pennsylvania 2021 UCC package effective January 1, 2026, is enforced through the local municipality or its authorized third-party agency, with Scranton zoning, floodplain, historic, and property-specific requirements layered on. Confirm transition applicability and the local enforcement route before design.",
  conditions: "Anthracite mine legacy, steep valley slopes, high northeastern Pennsylvania snow, freeze-thaw masonry damage, Lackawanna River flooding, and older combined or legacy utilities shape Scranton work.",
  sources: [
    source("City of Scranton permits", "https://www.scrantonpa.gov/government/departments/licensing-inspections-permits/"),
    source("Lackawanna County Conservation District", "https://www.lackawannacd.org/"),
    source("Pennsylvania UCC, 34 Pa. Code Chapter 403", "https://www.pacodeandbulletin.gov/Display/pacode?file=/secure/pacode/data/034/chapter403/chap403toc.html&d=.&p=1"),
    source("PPL Electric business", "https://www.pplelectric.com/site/Business"),
    source("FEMA flood maps", "https://www.fema.gov/flood-maps"),
  ],
  services: materializeLocalServiceRecords({
      "structural-engineering": {
        focus: "designing safe alterations around coal-era ground and snow-loaded northeastern roofs",
        authority: "The city department reviews UCC structural material; historic, floodplain, zoning, and mine-related information may require other reviewers",
        code: "The current UCC commercial provisions, existing-building rules, roof snow and drift, wind, and special-inspection requirements must be verified before filing",
        conditions: "mine subsidence, steep cuts, 40-plus-psf snow in regional highlands, frost, old masonry, and river flooding govern many structural decisions",
        projects: "downtown loft conversions, school additions, former silk mills, and small industrial buildings along the Lackawanna River",
        sections: ["Mine records before excavation", "Snow drift on old roofs", "Masonry in freeze-thaw"],
        bodies: [
          "Anthracite records and mine-subsidence screening are important before a new foundation, deep utility, or addition is laid out. The structural concept should stay coordinated with the geotechnical professional's findings.",
          "Scranton roofs see more snow and drift complexity than a Philadelphia comparison suggests. Equipment curbs, parapets, snow retention, and unbalanced loading should be checked for the actual roof geometry and exposure.",
          "Water entry and freeze-thaw can reduce old brick, stone, and lintel capacity. Repair details should address drainage, temporary shoring, repointing compatibility, and observation rather than only a nominal replacement member.",
        ],
        steps: [
          "Confirm the Scranton permit office or third-party UCC agency, zoning, floodplain, historic status, and mine-subsidence review path.",
          "Complete records research, survey, geotechnical and mine screening, roof observations, and openings at existing masonry or framing.",
          "Establish snow, drift, frost, wind, lateral, flood, temporary-work, and inspection criteria with the responsible Pennsylvania PE.",
          "Submit sealed drawings and calculations to the AHJ and answer written comments; construction conditions remain subject to field verification.",
        ],
        faqs: [
          { question: "Do mine records replace a Scranton geotechnical investigation?", answer: "No. Records are a screening tool and may be incomplete or imprecise. A qualified investigation determines how mine legacy affects the actual foundation and excavation." },
          { question: "Why are roof additions sensitive in Scranton?", answer: "Snow drift, unbalanced loading, old framing, and freeze-thaw deterioration can make a small rooftop unit or solar array consequential. Existing framing and the current code criteria should be checked." },
          { question: "Can a masonry repair be designed from photographs?", answer: "Photographs help document symptoms but do not establish hidden capacity or moisture causes. Field observations and material or opening information are usually needed." },
        ],
      },
      "mep-engineering": {
        focus: "upgrading heating and utility systems for cold Scranton buildings without losing maintainability",
        authority: "The city permit department and trade reviewers receive the building package; PPL, water and sewer providers, Fire, and owners impose separate service conditions",
        code: "The applicable UCC mechanical, plumbing, electrical, fuel-gas, fire, and energy provisions and local permit instructions govern the package",
        conditions: "cold winters, snow-blocked rooftop access, old steam or hydronic systems, mine-area drainage, and constrained downtown shafts shape MEP work",
        projects: "downtown apartments, hospitals, school renovations, small manufacturers, and former mill tenant spaces",
        sections: ["Heating in a cold valley", "Occupied healthcare phasing", "Rooftop access and snow"],
        bodies: [
          "Heating replacement should account for low-temperature capacity, freeze protection, domestic hot water, envelope leakage, and fuel availability. A heat-pump decision needs electrical and acoustical coordination, not a catalog swap.",
          "Healthcare and school work can require temporary ventilation, infection-control barriers, emergency power, and night shutdowns. The owner’s operations plan belongs in the MEP basis before equipment is ordered.",
          "Snow and roof access affect serviceability, intake/exhaust clearance, and condensate protection. Rooftop layouts should show safe access and drainage rather than leaving winter maintenance to the contractor.",
        ],
        steps: [
          "Identify the local UCC and trade permit route, owner phasing rules, Fire interfaces, PPL service, and water or sewer requirements.",
          "Survey existing boilers, steam or hydronic distribution, shafts, electrical service, roof access, controls, utility bills, and occupancy schedules.",
          "Prepare loads, equipment schedules, distribution, controls, energy documents, firestopping, emergency power, and maintenance details.",
          "Submit to the city or authorized agency and utility reviewers, then close comments without promising inspection or service timing.",
        ],
        faqs: [
          { question: "Is heat-pump conversion simple in a Scranton building?", answer: "Low-temperature performance, supplemental heat, electrical capacity, envelope leakage, condensate, and domestic hot water must be evaluated together. The owner and utility confirm feasibility." },
          { question: "Why show snow on an MEP roof plan?", answer: "Snow affects access, intakes, exhausts, drains, curbs, and service. The structural and mechanical layouts should be coordinated for the actual roof and maintenance route." },
          { question: "Who approves a hospital shutdown?", answer: "The healthcare owner and its safety or facilities program establish operational controls, while the AHJ reviews code documents. Engineering cannot authorize an owner’s operational shutdown by itself." },
        ],
      },
      "civil-engineering": {
        focus: "coordinating mine-aware grading, river flood response, and winter construction in the Scranton valley",
        authority: "The city reviews site and right-of-way work; Lackawanna County Conservation District and DEP address earth disturbance, while sewer authorities and floodplain officials have distinct roles",
        code: "Scranton stormwater and zoning requirements combine with Chapter 102, county review, floodplain rules, and applicable watershed or MS4 criteria",
        conditions: "mine entries, steep lots, Lackawanna River flooding, glacial or fill soils, winter frost, and limited downtown rights-of-way control site choices",
        projects: "brownfield reuse, river trail work, hillside infill, school sites, and I-81-oriented commercial development",
        sections: ["Mine-aware utility alignment", "River flood and winter runoff", "Small lots with no easy basin"],
        bodies: [
          "Legacy mine features can affect trench stability, infiltration, and settlement. Utility alignments should be checked against records and geotechnical information before a trench becomes the investigation.",
          "River flooding and frozen-ground conditions make construction staging part of drainage design. Temporary sediment control, stabilized access, and protected outfalls deserve the same attention as the final plan.",
          "Small Scranton parcels rarely have room for a conventional basin. Roof storage, distributed practices, controlled release, or off-site measures may be evaluated, subject to the city's and conservation district's acceptance.",
        ],
        steps: [
          "Confirm the city boundary, zoning, floodplain, sewer authority, Chapter 102 and NPDES triggers, and conservation-district review.",
          "Obtain survey, utility and mine records, flood data, soil or infiltration testing, environmental information, and drainage-area mapping.",
          "Prepare grading, access, erosion, stormwater, utility, winter-staging, and maintenance documents for the actual site.",
          "Submit to the municipality, conservation district, DEP, sewer authority, and utilities as applicable, then track written conditions.",
        ],
        faqs: [
          { question: "Can mine legacy affect stormwater design?", answer: "Yes. Voids, fill, groundwater, settlement, and contamination can make infiltration or trenching unsuitable. Testing and records review inform the accepted strategy." },
          { question: "Does a river parcel automatically need a flood permit?", answer: "The mapped zone, disturbance, use, and local ordinance determine the path. Floodplain officials and the AHJ confirm the actual requirements." },
          { question: "Can a small lot discharge directly to a sewer?", answer: "Capacity and local stormwater criteria govern. A civil study should identify allowable discharge and alternatives rather than assume an available connection." },
        ],
      },
      "energy-compliance": {
        focus: "translating northeastern Pennsylvania heating demand into durable code documentation",
        authority: "The municipal or authorized UCC agency reviews energy documents; PPL data, owner operations, and weather assumptions remain separate design inputs",
        code: "Confirm the 2021 Pennsylvania UCC commercial energy provisions effective January 1, 2026, any transition provision, and Scranton's current local filing instructions",
        conditions: "cold 5A heating, snow, leaky masonry, steam conversions, humid summers, and limited electrical service shape Scranton energy work",
        projects: "school renovations, downtown multifamily, small manufacturing, public buildings, and mill conversions",
        sections: ["Heating-load reality", "Masonry and air leakage", "Steam-to-electric decisions"],
        bodies: [
          "A Scranton heating calculation should reflect infiltration, envelope condition, snow exposure, and actual occupancy. A new high-efficiency unit cannot correct an undocumented air-leakage or distribution problem by itself.",
          "Old masonry walls need moisture and freeze-thaw review when insulation or windows change. Air-barrier continuity and interior humidity can matter as much as the nominal insulation value.",
          "Steam replacement can shift electrical demand, distribution space, controls, and domestic hot water. The code path and owner’s resilience goals should be modeled together before selecting fuel or equipment.",
        ],
        steps: [
          "Confirm the local energy-code edition, use and alteration category, equipment inventory, owner goals, and available PPL bills or interval data.",
          "Document envelope, glazing, schedules, loads, steam or hydronic plant, lighting, controls, and service constraints.",
          "Prepare accepted COMcheck or modeling documents and coordinate every assumption with the architectural and MEP permit sheets.",
          "Submit with the UCC package, respond to comments, and explain that predicted performance depends on construction and operation.",
        ],
        faqs: [
          { question: "Which energy compliance documents does Scranton require?", answer: "The 2021 Pennsylvania UCC energy provisions became effective January 1, 2026, but the applicable transition and accepted forms depend on the permit and AHJ. Scranton or its authorized code agency confirms the filing package." },
          { question: "Can insulation alone solve an old mill’s heating bill?", answer: "Not necessarily. Air leakage, moisture, windows, distribution losses, controls, and occupancy all affect performance. A whole-building review avoids an isolated retrofit assumption." },
          { question: "Will an energy calculation guarantee PPL savings?", answer: "No. Weather, rates, peak demand, controls, maintenance, and user behavior determine actual bills. Compliance documentation is not a savings guarantee." },
        ],
      },
      "pe-stamped-drawings": {
        focus: "creating accountable sealed sets for Scranton's local UCC path and mine-affected existing buildings",
        authority: "The city or authorized third-party agency sets permit requirements and Pennsylvania's registration board governs the responsible PE's seal; county and utility reviews remain separate",
        code: "Documents should cite the current UCC, Scranton ordinances, snow and flood criteria, mine-related assumptions, and discipline standards applicable to the actual scope",
        conditions: "old masonry, occupied rehabs, steep sites, winter construction, and incomplete mine records make limitations and field verification important",
        projects: "roof repairs, tenant improvements, mill conversions, utility upgrades, and flood-conscious commercial renovations",
        sections: ["Mine assumptions in sealed documents", "Winter-ready construction notes", "Separating permit responsibilities"],
        bodies: [
          "A sealed set should identify the records consulted and the areas that require field verification because mine information and old construction are incomplete. This gives the contractor and reviewer a usable decision path.",
          "Scranton projects benefit from notes on temporary weather protection, snow removal, freeze protection, and inspection hold points. Those notes should match the actual sequencing rather than copy a generic national specification.",
          "The UCC agency, conservation district, sewer authority, and utility each review different questions. A PE seal supports the covered design but does not transfer responsibility for those independent approvals.",
        ],
        steps: [
          "Define scope, AHJ, local UCC path, mine and flood overlays, existing evidence, and the documents that require a Pennsylvania PE seal.",
          "Resolve code criteria, calculations, field-verification notes, special inspections, sequencing, coordination interfaces, and exclusions.",
          "Have the responsible PE review and authenticate the applicable drawings and calculations under board and AHJ requirements.",
          "Submit the controlled package, track comments by reviewer, and issue documented revisions as field conditions are confirmed.",
        ],
        faqs: [
          { question: "Can a stamped set certify a mine-free site?", answer: "No. Mine conditions require records research and qualified geotechnical investigation. A seal covers the professional work within scope and cannot certify unknown subsurface conditions." },
          { question: "Are winter construction notes part of structural design?", answer: "They can be when temporary stability, weather exposure, or freeze protection affects the design. The responsible PE and contractor determine the appropriate scope and means." },
          { question: "Does a Scranton stamp promise permit approval?", answer: "No. The local AHJ and other agencies independently review the package. Licensure and sealing are confirmed for the actual project, while approval and timing remain uncertain." },
        ],
      },
    },
  ),
};

const lancaster: MetroBrief = {
  slug: "lancaster",
  name: "Lancaster",
  county: "Lancaster County",
  authority: "Lancaster City's Department of Community Planning and Economic Development and Bureau of Building Code Administration handle city permits; Lancaster County Conservation District, utility providers, and surrounding municipalities have distinct authority.",
  code: "Lancaster uses Pennsylvania's 2021 UCC package effective January 1, 2026, with city zoning, historic-district, stormwater, and streetscape requirements. Confirm transition applicability, the local enforcement agency, and accepted code edition before preparing a permit package.",
  conditions: "Amish Country growth, historic brick fabric, limestone and karst, Conestoga River flooding, agricultural runoff, and cold-humid 4A/5A transition conditions influence local design.",
  sources: [
    source("City of Lancaster planning and permits", "https://www.cityoflancasterpa.gov/government/departments/planning/"),
    source("Lancaster County Conservation District", "https://www.lancasterconservation.org/"),
    source("Lancaster City stormwater", "https://www.cityoflancasterpa.gov/government/departments/public-works/stormwater/"),
    source("PPL Electric business", "https://www.pplelectric.com/site/Business"),
    source("UGI utilities", "https://www.ugi.com/"),
  ],
  services: materializeLocalServiceRecords({
      "structural-engineering": {
        focus: "preserving Lancaster's historic masonry while supporting new mixed-use and agricultural-adjacent development",
        authority: "The city building-code office reviews UCC structural documents; historic, zoning, floodplain, and county reviews can be separate",
        code: "The current UCC and Lancaster historic or existing-building requirements govern the structural package, with snow, wind, seismic, and inspection criteria confirmed at filing",
        conditions: "brick rowhouses, limestone karst, soft alluvium, freeze-thaw, river flooding, and barn or mill conversions shape structural choices",
        projects: "Lancaster City rowhouse work, warehouse conversions, food-processing buildings, and rural commercial additions",
        sections: ["Historic brick and new openings", "Karst at the growth edge", "Food and agricultural structures"],
        bodies: [
          "Historic brick façades require lintel, parapet, and moisture-sensitive opening details that respect the existing bond and review requirements. New floor or stair openings should map load paths before demolition.",
          "Limestone and sinkhole concerns increase toward the county growth edge. Geotechnical exploration should inform foundations and stormwater infiltration instead of assuming city-center soils represent the next parcel.",
          "Food and agricultural buildings can combine heavy equipment, washdown, refrigeration, and unusual vibration. Framing, slab joints, drainage, and equipment anchorage should be designed around the actual process.",
        ],
        steps: [
          "Confirm city or township AHJ, zoning, historic status, floodplain, county land-development, and UCC permit requirements.",
          "Complete survey, existing-masonry documentation, geotechnical or karst screening, process-load review, and flood-elevation research where relevant.",
          "Set gravity, lateral, snow, frost, flood, vibration, and special-inspection criteria with the responsible Pennsylvania PE.",
          "Submit the sealed package to each applicable reviewer and respond to written comments; historic or land-development approval is not implied by a seal.",
        ],
        faqs: [
          { question: "Does historic review change Lancaster structural details?", answer: "It can affect visible openings, masonry repair, roof work, and sequencing. The city or historic authority determines the applicable review, while the PE documents a technically appropriate design." },
          { question: "Is karst limited to the city?", answer: "Karst is a regional geologic issue and varies by parcel. County-edge development should use project-specific records, borings, and testing rather than a city-center assumption." },
          { question: "What makes food-processing structures different?", answer: "Equipment vibration, washdown, refrigeration, slab drainage, sanitation, and utility loads can all affect structure. Process criteria should be established with the owner before design." },
        ],
      },
      "mep-engineering": {
        focus: "serving Lancaster's historic downtown, food-production, and rural commercial building mix",
        authority: "City building and trade reviewers coordinate with Fire, PPL or UGI, water and sewer providers, and food or agricultural owners",
        code: "The accepted UCC mechanical, electrical, plumbing, fuel-gas, fire, and energy provisions and local permit instructions govern each occupancy",
        conditions: "humid summers, cold winters, food sanitation, gas availability, older shafts, rural service limits, and river flood exposure shape MEP choices",
        projects: "restaurant rehabs, food-processing plants, downtown apartments, farm-market facilities, and healthcare fit-outs",
        sections: ["Food-process ventilation", "Historic downtown shafts", "Rural utility assumptions"],
        bodies: [
          "Food spaces need washdown-compatible equipment, make-up air, refrigeration heat rejection, grease or process exhaust, and controls that protect sanitation. A restaurant template rarely captures a production user's loads.",
          "Downtown buildings may have narrow shafts and party walls that limit new plumbing and ventilation routes. Field surveys should reserve fire-rated penetrations and accessible cleanouts before ceilings are rebuilt.",
          "Outside the city, PPL or UGI service and private wells or septic systems can change the MEP basis. Provider and county requirements are verified rather than assumed from a city utility connection.",
        ],
        steps: [
          "Identify the local building and trade AHJ, Fire and health interfaces, utility territories, water/sewer or well systems, and owner standards.",
          "Survey services, shafts, process equipment, refrigeration, occupancy schedules, utility bills, roof access, and shutdown limitations.",
          "Develop coordinated loads, plans, schedules, controls, firestopping, energy documents, and maintenance clearances for the actual use.",
          "Submit to the AHJ and utility or owner reviewers, then answer written comments without promising capacity, inspection, or installation timing.",
        ],
        faqs: [
          { question: "Does a Lancaster restaurant need the same MEP design as a food plant?", answer: "No. Process exhaust, refrigeration, washdown, sanitation, and production schedules can make food facilities substantially different. The owner and AHJ define the actual requirements." },
          { question: "How do private wells affect commercial MEP work?", answer: "Water quality, flow, storage, treatment, fire protection, and health requirements may affect the design. County, utility, and AHJ requirements are checked for the specific property." },
          { question: "Can old downtown shafts be reused?", answer: "Only after dimensions, fire rating, abandoned services, access, and structural openings are verified. Reuse is a design option, not an assumed condition." },
        ],
      },
      "civil-engineering": {
        focus: "linking Lancaster city stormwater rules with county growth, agricultural runoff, and karst-sensitive sites",
        authority: "Lancaster City Public Works and planning offices review city site work; the county conservation district and DEP address earth disturbance, while municipalities and utilities control other permits",
        code: "Local stormwater, zoning, and streetscape rules operate with Pennsylvania Chapter 102, NPDES, county watershed standards, and the actual municipality's ordinances",
        conditions: "Conestoga River flooding, agricultural nutrients, limestone infiltration risk, rolling grades, and tight historic streets shape Lancaster civil work",
        projects: "city infill, warehouse campuses, stream-buffer improvements, farm-market sites, and brownfield reuse",
        sections: ["Conestoga flood response", "Rural-to-urban drainage", "Karst and infiltration testing"],
        bodies: [
          "Conestoga River and tributary flood exposure affects finished floors, crossings, parking, and emergency access. Hydraulic and survey information should be coordinated before grading is set.",
          "A county-edge development can convert agricultural drainage to large impervious areas quickly. Existing swales, buffers, downstream channels, and maintenance ownership belong in the stormwater concept.",
          "Limestone soils may accept water quickly in one area and conceal a void in another. Infiltration testing and geotechnical review are essential before a basin, trench, or recharge practice is selected.",
        ],
        steps: [
          "Confirm city or township land-development, floodplain, stormwater, right-of-way, Chapter 102, NPDES, and conservation-district triggers.",
          "Collect survey, watershed and flood data, utility records, environmental and agricultural information, geotechnical testing, and drainage mapping.",
          "Prepare grading, access, utility, E&S, PCSM, stream-buffer, and maintenance documents for the actual parcel.",
          "Submit to municipal, county, DEP, conservation-district, and utility reviewers as applicable, then incorporate written conditions.",
        ],
        faqs: [
          { question: "Can Lancaster County agricultural drainage be preserved after development?", answer: "Existing drainage and downstream impacts should be studied, but preservation is not automatic. The accepted grading and stormwater approach is set by the municipality and applicable county or state requirements." },
          { question: "Is infiltration preferred on every Lancaster site?", answer: "No. Karst, groundwater, contamination, bedrock, utilities, and foundations may make another practice safer. Testing and agency review determine suitability." },
          { question: "Who reviews a Lancaster city street opening?", answer: "The city's public-way and utility processes control the opening, restoration, and traffic interface. A civil set can document geometry and drainage but cannot promise permission." },
        ],
      },
      "energy-compliance": {
        focus: "documenting energy compliance across Lancaster's historic, food, and mixed-use building stock",
        authority: "The enforcing building department reviews UCC energy documents; PPL or UGI data, historic review, and owner performance goals are additional considerations",
        code: "Confirm the 2021 Pennsylvania UCC commercial energy provisions effective January 1, 2026, any transition rule, and Lancaster's local submission requirements before preparing the compliance route",
        conditions: "4A/5A heating and cooling, historic masonry, process refrigeration, gas availability, humid summers, and rural service limits influence energy decisions",
        projects: "downtown rehabs, food-processing additions, schools, multifamily conversions, and farm-market buildings",
        sections: ["Historic façades and air control", "Process energy accounting", "Rural utility realities"],
        bodies: [
          "Historic masonry and windows need an enclosure strategy that balances air sealing, moisture, appearance, and floor-area constraints. A code worksheet cannot substitute for assembly coordination.",
          "Refrigeration, ovens, washdown, compressed air, and process exhaust can dominate a food facility's energy use. Modeling should separate regulated building systems from owner process loads and state assumptions clearly.",
          "A rural building may face different gas, electric, well, or septic constraints than a city renovation. Utility conversations should occur before electrification or equipment recommendations are presented as feasible.",
        ],
        steps: [
          "Confirm the AHJ, energy-code edition and path, use or alteration category, historic restrictions, process loads, and available utility data.",
          "Inventory envelope, lighting, HVAC, refrigeration, process equipment, schedules, controls, water systems, and owner targets.",
          "Prepare accepted COMcheck or modeling documentation and align every assumption with the issued architectural and MEP details.",
          "Submit with the permit package and distinguish code documentation from optional performance goals, which depend on construction and operation.",
        ],
        faqs: [
          { question: "How should a Lancaster applicant handle the 2021 UCC transition?", answer: "Pennsylvania's 2021 UCC provisions became effective January 1, 2026. The city or township confirms whether the permit is governed by a transition provision and what energy forms or modeling accompany it." },
          { question: "How should food-process energy be handled?", answer: "Regulated building systems and unusual process loads should be identified separately, with the AHJ's accepted documentation path confirmed. Owner process schedules are critical inputs." },
          { question: "Can a historic building meet current energy requirements?", answer: "The accepted alteration path, existing conditions, historic review, and technically feasible improvements must be evaluated together. No blanket exemption or outcome should be assumed." },
        ],
      },
      "pe-stamped-drawings": {
        focus: "delivering sealed, clearly scoped documents for Lancaster's city and county development reviews",
        authority: "The local building office and planning departments set submittal requirements; Pennsylvania's registration board governs the responsible PE seal, while conservation and utility reviews are distinct",
        code: "The set should cite the current UCC, Lancaster ordinances, historic or flood provisions, county criteria, and discipline standards actually applicable to the scope",
        conditions: "historic masonry, food-process coordination, karst, stream buffers, and public-way work make agency responsibility and field limits important",
        projects: "downtown tenant improvements, food-plant additions, mixed-use rehabs, drainage upgrades, and rural commercial facilities",
        sections: ["Historic review and seal scope", "Process drawings contractors can use", "County and city coordination"],
        bodies: [
          "A sealed structural or MEP package does not itself satisfy historic or planning review. Sheet indices should identify the information each reviewer needs and keep professional responsibility transparent.",
          "Food and commercial projects benefit from details tied to sanitation, washdown, access, maintenance, and equipment responsibility. Generic contractor notes can leave critical interfaces unresolved.",
          "County conservation, city streets, zoning, and utility conditions should be listed as coordination items, not folded into an unsupported promise that one stamp covers site approvals.",
        ],
        steps: [
          "Define the municipality, scope, UCC and land-development route, historic or flood overlays, existing evidence, and applicable PE seal scope.",
          "Resolve calculations, code criteria, details, inspection notes, process interfaces, coordination exclusions, and revision responsibilities.",
          "Have the responsible Pennsylvania PE review and authenticate applicable documents under board and AHJ requirements.",
          "Submit to each identified office, respond to written comments, and keep field revisions controlled through construction.",
        ],
        faqs: [
          { question: "Can one Lancaster stamp cover city and county approvals?", answer: "No. A PE seal covers work within the professional scope; municipal, county, conservation-district, historic, and utility reviews remain independent." },
          { question: "Should food equipment be shown on PE-stamped drawings?", answer: "The design scope and responsibility determine what is shown. Building services, anchorage, clearances, exhaust, and interfaces should be coordinated even where the owner or vendor supplies equipment." },
          { question: "Does a stamp promise historic approval?", answer: "No. Historic authorities evaluate character and local criteria independently. The responsible PE and AHJ confirm required sealing and review routes for the actual project." },
        ],
      },
    },
  ),
};

const erie: MetroBrief = {
  slug: "erie",
  name: "Erie",
  county: "Erie County",
  authority: "The City of Erie's Department of Public Safety and code-enforcement functions handle city permits; Erie Water Works, the county conservation district, DEP, and neighboring municipalities have distinct roles.",
  code: "Pennsylvania's 2021 UCC package effective January 1, 2026, is administered through the local or authorized third-party enforcement agency, with Erie zoning, floodplain, shoreline, and public-way rules added for city projects. Confirm transition applicability, the local code edition, and reviewer.",
  conditions: "Lake-effect snow, high winds off Lake Erie, freeze-thaw, shoreline flooding, clay and fill, aging industrial buildings, and heavy manufacturing make Erie unlike southeastern Pennsylvania markets.",
  sources: [
    source("City of Erie permits and codes", "https://cityof.erie.pa.us/departments/public-safety/"),
    source("Erie Water Works", "https://www.eriewater.org/"),
    source("Erie County Conservation District", "https://www.erieconservation.com/"),
    source("Penelec business services", "https://www.firstenergycorp.com/help-support/billing-payment/business.html"),
    source("NOAA Great Lakes Environmental Research Laboratory", "https://www.glerl.noaa.gov/"),
  ],
  services: materializeLocalServiceRecords({
      "structural-engineering": {
        focus: "engineering Erie industrial, waterfront, and snow-loaded structures for severe Great Lakes exposure",
        authority: "The city or authorized UCC reviewer receives structural documents; shoreline, floodplain, zoning, and industrial-owner reviews may be separate",
        code: "Confirm the accepted UCC edition, high-snow and wind criteria, existing-building requirements, corrosion provisions, and special inspections before filing",
        conditions: "lake-effect snow, drifting, wind, freeze-thaw, shoreline flooding, clay or fill, and corroded industrial steel control structural decisions",
        projects: "Port of Erie support buildings, manufacturing additions, warehouse roofs, downtown rehabs, and Lake Erie waterfront work",
        sections: ["Lake-effect roof loading", "Industrial corrosion and vibration", "Shoreline foundations"],
        bodies: [
          "Erie roofs need attention to lake-effect accumulation, drift at parapets and rooftop equipment, snow sliding, and maintenance access. The ground snow and exposure criteria should be confirmed for the site rather than borrowed from a distant city.",
          "Manufacturing frames can conceal section loss, fatigue, and vibration damage beneath coatings. Equipment loads, crane actions, dynamic effects, and corrosion inspection should be integrated before new production is connected.",
          "Waterfront fill, high groundwater, wave or flood exposure, and freeze-thaw can affect foundations and site walls. Geotechnical and flood information should inform elevations and durability without promising a shoreline approval.",
        ],
        steps: [
          "Confirm the Erie AHJ, zoning, shoreline and floodplain path, industrial owner criteria, and current UCC snow and wind requirements.",
          "Obtain survey, geotechnical and flood information, roof observations, corrosion records, equipment data, and existing-frame openings.",
          "Set snow drift, wind, frost, lateral, vibration, flood, temporary-work, and inspection criteria with the responsible Pennsylvania PE.",
          "Submit sealed plans and calculations to the AHJ and separate shoreline, utility, or owner reviewers; respond to written comments.",
        ],
        faqs: [
          { question: "Why is Erie snow design different from Harrisburg?", answer: "Lake-effect bands and drifting can create local accumulation and unbalanced roof loads that a regional average misses. The project criteria and roof geometry are checked specifically." },
          { question: "Can an industrial steel frame be reused?", answer: "Possibly, after corrosion, connection, fatigue, vibration, fire protection, and new equipment loads are evaluated. Coating or age alone does not establish capacity." },
          { question: "Does waterfront engineering guarantee a shoreline permit?", answer: "No. Flood, shoreline, environmental, and local authorities make independent determinations. Engineering documents support the application but cannot promise an outcome." },
        ],
      },
      "mep-engineering": {
        focus: "designing freeze-resilient systems for lake-effect weather and Erie manufacturing",
        authority: "The local building and trade reviewer coordinates with Erie Water Works, Penelec or gas utilities, Fire, and industrial owners",
        code: "Mechanical, electrical, plumbing, fuel-gas, fire, and energy documents follow the currently accepted UCC and local permit instructions",
        conditions: "lake-effect cold, humid summers, frozen intakes, industrial process heat, corrosion, high electric loads, and flood-sensitive equipment rooms shape MEP work",
        projects: "manufacturing plants, port warehouses, hospital work, downtown rehabs, and food or cold-storage facilities",
        sections: ["Freeze protection at the lake", "Manufacturing ventilation", "Water and power resilience"],
        bodies: [
          "Outdoor-air intakes, louvers, coils, condensate, and sprinkler piping need protection against Erie cold and snow blockage. Maintenance access and snow drift should be visible on the coordinated roof and equipment plans.",
          "Manufacturing ventilation must account for process contaminants, make-up air, heat recovery, cranes, and variable production. The process owner and Fire authority need to participate before exhaust or make-up-air equipment is sized.",
          "Water service, Penelec capacity, emergency power, and flood elevation can constrain a waterfront or industrial retrofit. Provider confirmations are separate from design calculations and should be tracked explicitly.",
        ],
        steps: [
          "Identify the local building and trade AHJ, Fire and process reviews, water provider, electric and gas utilities, flood exposure, and owner standards.",
          "Survey equipment, intake and exhaust locations, service capacity, process loads, controls, roof snow conditions, and outage requirements.",
          "Prepare coordinated loads, plans, schedules, controls, energy documents, freeze protection, firestopping, and maintenance access.",
          "Submit to the AHJ, utility, and owner reviewers, then close written comments without promising a utility upgrade or inspection date.",
        ],
        faqs: [
          { question: "What makes Erie rooftop HVAC difficult?", answer: "Lake-effect snow, drifting, freezing, wind, intake blockage, condensate, and safe maintenance access all affect equipment placement. A roof plan and structural coordination are essential." },
          { question: "Can an industrial exhaust system be selected from a catalog?", answer: "The contaminant, process schedule, make-up air, discharge, noise, fire, and corrosion environment must be established first. The AHJ and owner confirm the applicable requirements." },
          { question: "Who confirms Erie Water Works capacity?", answer: "Erie Water Works confirms connection and service conditions. Engineering can calculate demand and coordinate the request, but provider capacity and timing are not guaranteed." },
        ],
      },
      "civil-engineering": {
        focus: "handling lakefront drainage, snowmelt, and industrial site circulation in Erie",
        authority: "City engineering and code offices review local site and right-of-way work; Erie County Conservation District and DEP address earth disturbance, while utilities and shoreline agencies retain distinct authority",
        code: "Erie ordinances work with Pennsylvania Chapter 102, county watershed and stormwater criteria, floodplain requirements, and the UCC site interfaces",
        conditions: "lake-level and shoreline flooding, snowmelt surges, clay and fill, high groundwater, industrial contamination, and heavy truck movements control civil design",
        projects: "Port and waterfront facilities, manufacturing campuses, brownfield reuse, warehouse yards, and neighborhood drainage improvements",
        sections: ["Snowmelt and outfalls", "Port truck circulation", "Industrial soil and groundwater"],
        bodies: [
          "Erie sites receive snow that must be stored, melted, and kept out of loading and fire routes. Grading, inlet capacity, snow-storage areas, and outfall protection should be tested for melt events rather than only ordinary rainfall.",
          "Port and manufacturing yards need swept paths, durable pavement, security, rail or truck interfaces, and drainage that does not undermine heavy-use areas. The civil plan should show operational assumptions visibly.",
          "Brownfield fill and groundwater can make infiltration, trenching, or reuse of existing utilities uncertain. Environmental and geotechnical information should control the stormwater and pavement concept.",
        ],
        steps: [
          "Confirm city zoning and right-of-way, flood and shoreline overlays, Chapter 102 and NPDES triggers, conservation-district review, and utility requirements.",
          "Complete survey, snowmelt drainage study, flood and lake data, utility locating, geotechnical and environmental investigations, and truck-route analysis.",
          "Prepare grading, snow storage, access, utility, stormwater, E&S, PCSM, and maintenance drawings for the actual operations.",
          "Submit to city, county, DEP, utilities, and shoreline or owner reviewers as applicable, then incorporate written permit conditions.",
        ],
        faqs: [
          { question: "Is snow storage part of Erie stormwater design?", answer: "It should be considered where meltwater, access, salt, and inlet capacity affect the site. The accepted design depends on the parcel, operations, and local review criteria." },
          { question: "Can a brownfield parcel infiltrate stormwater?", answer: "Contamination, groundwater, fill, clay, and foundation or utility clearances may prohibit it. Testing and agency review determine whether infiltration is appropriate." },
          { question: "Who controls a Port of Erie access change?", answer: "The owner or port authority, city right-of-way and zoning offices, and any other applicable agencies may review different aspects. Civil drawings cannot promise access approval." },
        ],
      },
      "energy-compliance": {
        focus: "documenting cold-climate energy compliance for Erie manufacturing and waterfront buildings",
        authority: "The local or authorized UCC agency reviews energy documents; Penelec data, process owners, and resilience planning are additional inputs",
        code: "Verify the 2021 Pennsylvania UCC commercial energy provisions effective January 1, 2026, the transition rule for the permit, and Erie's local filing requirements",
        conditions: "cold lake-effect winters, high air leakage at industrial doors, process heat, corrosion, snow shading, and utility demand affect the compliance strategy",
        projects: "manufacturing additions, refrigerated warehouses, hospitals, schools, and downtown commercial conversions",
        sections: ["Industrial doors and heat loss", "Process versus regulated energy", "Lake-effect envelope durability"],
        bodies: [
          "Dock doors and high-bay leakage can dominate heating demand in Erie. Vestibules, controls, destratification, and operating schedules should be coordinated with the envelope and not treated as a form-only adjustment.",
          "Process ovens, refrigeration, compressed air, and manufacturing exhaust need a clear boundary between regulated building energy and owner process energy. The compliance report should state assumptions the owner can verify.",
          "Snow, wind-driven rain, salt, and freeze-thaw test roof, façade, and equipment details. Energy improvements should be checked for durability and maintenance, especially at the waterfront.",
        ],
        steps: [
          "Confirm AHJ, current commercial energy-code path, occupancy and alteration category, process loads, flood or shoreline constraints, and Penelec data.",
          "Inventory envelope, doors, lighting, HVAC, refrigeration, process equipment, controls, schedules, and owner resilience goals.",
          "Prepare accepted COMcheck or modeling documents and coordinate modeled assemblies and systems with the permit drawings.",
          "Submit with the UCC package and distinguish compliance from optional performance projections that depend on construction and operation.",
        ],
        faqs: [
          { question: "What energy-code edition applies to an Erie project?", answer: "The 2021 Pennsylvania UCC energy provisions took effect January 1, 2026. Erie or its authorized code agency confirms whether a transition provision applies and which compliance documents are accepted for the permit." },
          { question: "How should process energy be handled in a manufacturing model?", answer: "The regulated building scope and unusual process loads should be identified separately under the accepted compliance method. Production schedules and equipment data are essential." },
          { question: "Will better insulation prevent lake-effect roof problems?", answer: "Insulation is only one part of a durable assembly. Air, vapor, drainage, snow, wind-driven rain, fasteners, and maintenance access also need review." },
        ],
      },
      "pe-stamped-drawings": {
        focus: "preparing sealed drawings that communicate Erie snow, industrial, and shoreline assumptions",
        authority: "The city or authorized UCC reviewer sets permit requirements and Pennsylvania's registration board governs the responsible PE seal; utilities, county, and shoreline reviews are separate",
        code: "The package should cite current UCC provisions, Erie ordinances, snow and wind criteria, flood or shoreline conditions, and the discipline standards used",
        conditions: "lake-effect snow, industrial corrosion, waterfront fill, heavy operations, and winter construction make assumptions and inspection notes central",
        projects: "manufacturing additions, warehouse roofs, port support buildings, commercial rehabs, and utility upgrades",
        sections: ["Snow criteria on the cover sheet", "Industrial responsibility boundaries", "Waterfront document coordination"],
        bodies: [
          "Erie sealed drawings should make roof snow, drift, equipment, access, and snow-removal assumptions easy to find. This helps the reviewer and contractor understand the design basis without mistaking it for a weather guarantee.",
          "Industrial packages need clear boundaries between PE design, vendor equipment, owner process criteria, and contractor means. Corrosion, vibration, anchorage, and inspection responsibilities should be assigned rather than implied.",
          "A waterfront set can support several agency reviews without claiming one seal covers shoreline, environmental, flood, or utility decisions. Cover sheets and cross-references should keep those responsibilities separate.",
        ],
        steps: [
          "Define the Erie AHJ, project scope, snow and shoreline overlays, owner standards, existing evidence, and drawings requiring a Pennsylvania PE seal.",
          "Resolve calculations, code criteria, equipment and process interfaces, special inspections, field verification, exclusions, and revision control.",
          "Have the responsible PE review and authenticate applicable drawings and calculations under Pennsylvania board and AHJ rules.",
          "Submit to identified building, county, utility, shoreline, and owner reviewers, then issue controlled responses to written comments.",
        ],
        faqs: [
          { question: "Does an Erie PE seal certify a roof’s snow removal plan?", answer: "The seal covers the professional design within its scope; owner operations and snow-removal procedures are separate. The actual AHJ and owner requirements must be confirmed." },
          { question: "Can a stamped waterfront set guarantee shoreline approval?", answer: "No. Shoreline, flood, environmental, utility, and local authorities make independent decisions. Engineering documents support their review but cannot guarantee approval." },
          { question: "Who confirms responsible PE licensure?", answer: "The owner and design firm should select a properly licensed professional with relevant competence and scope. Pennsylvania registration and seal requirements are checked for the actual submission." },
        ],
      },
    },
  ),
};

function materializePage(metro: MetroBrief, serviceSlug: Batch2CoreServiceSlug): Batch2CoreServicePage {
  const detail = metro.services[serviceSlug];
  const label = labels[serviceSlug];
  return {
    serviceSlug,
    title: `${label} for ${metro.name} commercial projects | Apex Grid Engineering`,
    description: `Project-specific ${label.toLowerCase()} for ${metro.name}, ${metro.county}: ${detail.focus}. Review the local AHJ, Pennsylvania code path, site conditions, and responsible PE requirements before filing.`,
    h1: `${label} in ${metro.name}, Pennsylvania`,
    kicker: `${metro.name} · ${metro.county} · ${label}`,
    lede: `A ${metro.name} ${label.toLowerCase()} scope has to respond to ${detail.focus}. Apex Grid helps owners organize the facts, documents, and agency questions without promising licensure, approval, coverage, or a review timeline.`,
    permitAuthority: detail.authority,
    codeContext: detail.code,
    localConditions: detail.conditions,
    projectTypes: detail.projects,
    sections: detail.sections,
    permitSteps: detail.steps,
    faqs: detail.faqs,
    sources: metro.sources,
  };
}

const stateMetros = [metros[0], pittsburgh, allentown, harrisburg, scranton, lancaster, erie];

export const pennsylvaniaBatch2: Batch2StateExpansion = {
  stateSlug: "pennsylvania",
  stateName: "Pennsylvania",
  stateAbbrev: "PA",
  hub: {
    title: "Pennsylvania engineering services for commercial projects | Apex Grid Engineering",
    description: "Pennsylvania structural, MEP, civil, energy-compliance, and PE-stamped drawing guidance grounded in local permit offices, UCC requirements, utilities, flood, snow, mine, karst, and Great Lakes conditions.",
    h1: "Commercial engineering across Pennsylvania",
    kicker: "PENNSYLVANIA · LOCAL AHJ AND CODE CONTEXT",
    lede: "Pennsylvania is not one uniform engineering market: Philadelphia's local code, Pittsburgh's hillsides, Lehigh Valley karst, Harrisburg floodplains, Scranton mine legacy, Lancaster growth, and Erie's lake-effect snow each change the work. Start with the metro and discipline that match the project.",
    sections: [
      {
        heading: "Statewide UCC, local enforcement",
        body: "Pennsylvania's Uniform Construction Code provides a statewide baseline, but municipalities may enforce through their own departments, an authorized third-party agency, or the Department of Labor & Industry. Philadelphia and Pittsburgh have distinct local processes and amendments; the actual parcel determines the authority having jurisdiction.",
      },
      {
        heading: "Climate and ground conditions vary materially",
        body: "Southeastern 4A conditions, northern and western 5A/6A cold, Erie lake-effect snow, river floodplains, limestone karst, anthracite and bituminous mine areas, soft alluvial soils, and freeze-thaw cycles produce different structural, civil, MEP, and energy decisions. A neighboring city is not a sufficient site proxy.",
      },
      {
        heading: "A coordinated path from investigation to permit",
        body: "A responsible Pennsylvania PE confirms scope and licensure for the project, while the owner and design team confirm AHJ requirements, utility capacity, geotechnical information, conservation-district or DEP permits, energy documentation, and any city performance program. Engineering supports those decisions; it does not promise a seal, permit, approval, coverage, or schedule.",
      },
    ],
    faqs: [
      {
        question: "Which building code applies to a Pennsylvania commercial project?",
        answer: "The statewide UCC supplies the baseline, with the currently accepted code edition and Pennsylvania amendments subject to change through the state's adoption process. Philadelphia, Pittsburgh, and other municipalities may add local amendments or procedures, so the AHJ confirms the edition and project path.",
      },
      {
        question: "Who reviews a Pennsylvania permit?",
        answer: "The municipality may use its own department, a state-approved third-party agency, or L&I; Philadelphia and Pittsburgh have their own departments. Zoning, utilities, conservation districts, DEP, floodplain, and historic authorities can review separate issues.",
      },
      {
        question: "What commercial energy code is current in Pennsylvania?",
        answer: "Pennsylvania's commercial energy provisions now follow the 2021 IECC under the 2021 UCC package, effective January 1, 2026. Permit transition provisions and local documentation requirements are verified with the AHJ for the project address.",
      },
    ],
    sources: [
      source("Pennsylvania UCC, 34 Pa. Code Chapter 403", "https://www.pacodeandbulletin.gov/Display/pacode?file=/secure/pacode/data/034/chapter403/chap403toc.html&d=.&p=1"),
      source("Pennsylvania professional licensing board", "https://www.pa.gov/agencies/dos/boards-commissions/engineers-land-surveyors-geologists"),
      source("Pennsylvania DEP Chapter 102", "https://www.dep.pa.gov/Business/Water/CleanWater/StormwaterMgmt/Pages/Construction-Stormwater.aspx"),
      source("FEMA flood maps", "https://www.fema.gov/flood-maps"),
      source("Pennsylvania Emergency Management flood resources", "https://www.pema.pa.gov/Be-Informed/Hazards/Pages/Floods.aspx"),
    ],
  },
  metros: stateMetros.map((metro) => ({
    slug: metro.slug,
    name: metro.name,
    county: metro.county,
    services: [
      materializePage(metro, "structural-engineering"),
      materializePage(metro, "mep-engineering"),
      materializePage(metro, "civil-engineering"),
      materializePage(metro, "energy-compliance"),
      materializePage(metro, "pe-stamped-drawings"),
    ],
  })),
};

export default pennsylvaniaBatch2;