import type { Industry } from "./types";
import { LICENSING_COVERAGE_STATEMENT, PROJECT_JURISDICTION_NOTE } from "../../lib/licensing";

export const CLUSTER1_INDUSTRIES: Industry[] = [
  {
    slug: "healthcare-engineering",
    name: "Healthcare",
    cluster: 1,
    title: "Healthcare MEP & Structural Engineering | OSHPD Compliance",
    meta: "Professional healthcare engineering services. Specialists in OSHPD compliance, medical gas piping design, and negative pressure isolation room HVAC infrastructure.",
    h1: "Healthcare Facility MEP & Structural Engineering Services",
    h2: "Engineered Infrastructure for Hospitals, Clinics, and Medical Research Centers",
    cardBlurb:
      "Integrated structural and MEP engineering for hospitals, clinics, and medical research centers, designed to HCAI/OSHPD, NFPA 99, and FGI Guidelines.",
    intro: [
      "Healthcare carries the most demanding regulatory and life-safety burden of any occupancy type. A single project must reconcile the FGI Guidelines, NFPA 99 risk-category requirements, ASHRAE 170 ventilation criteria, and jurisdictional review — often HCAI/OSHPD in California — while sustaining patient care in occupied buildings. Structural, mechanical, electrical, plumbing, and medical gas systems are tightly interdependent, so a change in one ripples through the rest, and fragmented coordination is where schedule and budget risk accumulate.",
      `Apex Grid delivers structural, MEP, civil, and geotechnical engineering under one roof, sparing owners the coordination gaps that stall reviews and inflate change orders. We design essential-facility structures to Risk Category IV demands, size mechanical systems for the pressure relationships and air-change rates infection control requires, and produce permit-ready, sealed documents built to survive plan check. Veteran-owned. ${LICENSING_COVERAGE_STATEMENT} ${PROJECT_JURISDICTION_NOTE} We serve clinics through multi-phase hospital campuses.`,
    ],
    specialties: [
      {
        heading: "OSHPD & HCAI Compliance Expertise",
        body: "Acute-care hospitals and skilled nursing facilities in California fall under HCAI (formerly OSHPD), which imposes its own plan review, special inspection, and construction observation beyond the base California Building Code. We design non-structural components — ceilings, ductwork, piping, and equipment anchorage — to ASCE 7 Chapter 13 with the Ip = 1.5 importance factor. Our documents anticipate the amended review process and package the special inspection and testing agreements HCAI requires, and early decisions on incremental versus full compliance keep occupied renovations moving.",
      },
      {
        heading: "NFPA 99 Certified Medical Gas & Vacuum Systems",
        body: "Medical gas and vacuum systems are engineered to NFPA 99 by risk category, coordinating source equipment, alarm zones, and outlet loads with ASSE 6000-series requirements. We calculate diversified oxygen, medical air, nitrous oxide, and instrument-air demand; size copper Type L tubing for pressure drop at peak simultaneous flow; and locate zone valve boxes, area alarms, and master alarms per code adjacencies. Manifold and bulk-oxygen sizing and medical-vacuum redundancy suit the facility's procedure mix, and documents specify brazing, purging, and required third-party verification for commissioning.",
      },
      {
        heading: "Airborne Infection Isolation (AII) & Negative Pressure HVAC Design",
        body: "Airborne infection isolation and protective-environment rooms demand precise, verifiable pressure relationships. We design AII rooms to ASHRAE 170 and CDC criteria: minimum 12 air changes per hour, 100% exhaust to the exterior, and negative pressurization of at least 0.01 in. w.c. relative to adjacent spaces, monitored continuously. Airflow offsets hold pressure with the door closed, anteroom sequencing is defined, and HEPA filtration is specified where recirculation or exhaust discharge requires it; protective-environment rooms are conversely positive. Low-leakage dampers and room-differential monitoring let commissioning verify compliance.",
      },
    ],
    disciplines: [
      {
        name: "Structural Engineering",
        href: "/services/structural",
        body: [
          "Hospitals are Risk Category IV essential facilities, so we design lateral and gravity systems to the elevated seismic importance factor and drift limits that keep the building operational after a design-level event. This drives system selection, foundation demands, and non-structural anchorage, and we coordinate imaging-suite shielding loads, heavy rooftop equipment, and vibration-sensitive areas.",
          "Renovations in occupied hospitals require capacity checks, shoring, and load-path continuity so openings never compromise the structure.",
        ],
        highlights: [
          "Risk Category IV seismic design to ASCE 7 with Ip = 1.5 non-structural anchorage",
          "Rooftop and interstitial equipment support framing and vibration isolation",
          "Imaging/radiation shielding wall and slab loading coordination",
          "Structural openings, infill, and shoring for occupied renovations",
          "Seismic joints and phasing details for campus expansions",
        ],
      },
      {
        name: "MEP Engineering",
        href: "/services/mep",
        body: [
          "Healthcare MEP carries the most code intensity. We design HVAC to ASHRAE 170 for space-by-space air changes, pressure relationships, temperature and humidity, and filtration across operating, isolation, and pharmacy spaces. Electrical distribution follows NEC Article 517, splitting the essential electrical system into life-safety, critical, and equipment branches with code-compliant generators.",
          "Plumbing and medical gas are coordinated together, including sanitary, domestic hot-water recirculation for Legionella control, and NFPA 99 medical gas and vacuum.",
        ],
        highlights: [
          "ASHRAE 170 ventilation, pressurization, and filtration design",
          "NEC 517 essential electrical system: life-safety, critical, equipment branches",
          "Emergency generator sizing, paralleling, and automatic transfer schemes",
          "Domestic hot-water and recirculation design for Legionella mitigation",
          "OR, sterile processing, pharmacy, and lab specialty exhaust systems",
        ],
      },
      {
        name: "Civil Engineering",
        href: "/services/civil",
        body: [
          "Healthcare sites accommodate ambulance circulation, covered patient drop-offs, service access, and helistop approach where applicable, all meeting accessibility and municipal standards. We design grading, ADA-compliant routes, stormwater detention, and utility connections sized for the facility's high domestic, fire, and medical-waste loads.",
          "Fire-access lanes, hydrant placement, and site fire-flow are coordinated with the building fire-protection design.",
        ],
        highlights: [
          "Emergency-vehicle circulation, drop-off, and service access design",
          "Site grading, ADA-accessible routes, and parking layout",
          "Stormwater detention and NPDES-compliant drainage",
          "Fire-flow, hydrant, and fire-access lane coordination",
          "Domestic, sanitary, and fire-service utility connections",
        ],
      },
      {
        name: "Geotechnical Engineering",
        body: [
          "Essential facilities warrant a thorough subsurface program to establish bearing capacity, settlement tolerances, and seismic site class. We provide foundation recommendations — spread footings, mats, or deep foundations — and evaluate liquefaction and lateral spreading where site conditions require.",
          "Recommendations address vibration-sensitive imaging areas, slab-on-grade support, and earthwork so the design rests on verified soil parameters.",
        ],
        highlights: [
          "Subsurface investigation and seismic site classification",
          "Bearing capacity and settlement analysis for essential facilities",
          "Liquefaction and lateral-spread evaluation where applicable",
          "Deep foundation recommendations for poor soils",
          "Vibration and slab-support parameters for sensitive equipment",
        ],
      },
    ],
    facilityTypes: [
      "Acute-care hospitals",
      "Ambulatory surgery centers",
      "Outpatient clinics and medical office buildings",
      "Emergency departments and urgent care",
      "Imaging and diagnostic centers",
      "Skilled nursing and long-term care",
      "Behavioral health facilities",
      "Medical research and laboratory buildings",
      "Central sterile processing departments",
      "Pharmacy and compounding (USP 797/800) suites",
    ],
    projectTypes: [
      "New hospital and clinic construction",
      "Occupied-facility renovation and modernization",
      "Departmental tenant improvements and fit-outs",
      "Bed-tower and surgical-suite expansions",
      "Adaptive reuse of commercial space to medical use",
      "Infrastructure and equipment replacement projects",
    ],
    deliverables: [
      "Permit-ready sealed structural and MEP drawings",
      "Structural and non-structural seismic anchorage calculations",
      "ASHRAE 170 ventilation and pressurization schedules",
      "NEC 517 essential electrical one-line diagrams and load studies",
      "NFPA 99 medical gas and vacuum design and sizing package",
      "Technical specifications and equipment schedules",
      "Special inspection and testing agreements",
      "RFI responses and construction administration support",
    ],
    compliance: [
      {
        code: "FGI Guidelines",
        desc: "The Guidelines for Design and Construction set minimum programming, space, and system requirements for hospitals and clinics.",
      },
      {
        code: "NFPA 99",
        desc: "The Health Care Facilities Code sets risk-category requirements for medical gas, electrical, and gas-equipment systems that we design for third-party verification.",
      },
      {
        code: "ASHRAE 170",
        desc: "This ventilation standard defines air changes, pressure relationships, humidity, and filtration by space type for infection control.",
      },
      {
        code: "NEC Article 517",
        desc: "Article 517 governs health-care electrical systems, including the essential electrical branches and patient-care-space wiring our distribution follows.",
      },
      {
        code: "IBC / ASCE 7",
        desc: "The building code and ASCE 7 establish the Risk Category IV loading and seismic criteria we apply to structural and non-structural design.",
      },
      {
        code: "HCAI / OSHPD",
        desc: "In California, HCAI enforces additional plan review, inspection, and observation for acute-care and skilled-nursing facilities.",
      },
    ],
    cta: "Upload your healthcare project drawings for a scope and fee review, and we will map the fastest compliant path through plan check.",
  },
  {
    slug: "military-defense-engineering",
    name: "Military & Defense",
    cluster: 1,
    title: "Military & Defense Engineering Firm | UFC & ATFP Compliance",
    meta: "Veteran-owned engineering firm specializing in military and defense installations. Complete MEP and structural design built to UFC criteria and ATFP standards.",
    h1: "Military, Defense & Aerospace Engineering Services",
    h2: "Mission-Critical Infrastructure Designed to Unified Facilities Criteria (UFC)",
    cardBlurb:
      "Veteran-owned, multi-discipline engineering for military and defense installations — designed to Unified Facilities Criteria, ATFP standards, and DoD mandates.",
    intro: [
      "Defense projects answer to a distinct body of criteria: the Unified Facilities Criteria (UFC), Unified Facilities Guide Specifications (UFGS), and service-specific requirements that supersede commercial code where they conflict. Anti-terrorism/force-protection standoff and progressive-collapse provisions shape the structure, secure-facility requirements shape the mechanical and electrical systems, and DoD energy and resilience mandates shape everything. Meeting these standards under the contracting authority's design-quality expectations requires engineers fluent in both the criteria and the review process.",
      `Apex Grid is a veteran-owned firm delivering integrated structural, MEP, civil, and geotechnical engineering for military and defense clients. We design to the governing UFC and UFGS, coordinate ATFP standoff and hardening with the site and structural systems, and produce sealed, DrChecks-ready documents. ${LICENSING_COVERAGE_STATEMENT} ${PROJECT_JURISDICTION_NOTE} We support installations, contractors, and mission partners on new construction, MILCON, and SRM work.`,
    ],
    specialties: [
      {
        heading: "ATFP Standoff and Structural Hardening",
        body: "Anti-terrorism/force-protection design begins with UFC 4-010-01 minimum standoff distances and progresses to structural hardening where standoff cannot be achieved. We apply the DoD minimum standards for buildings — laminated glazing with capture-resistant frames, superstructure detailing to resist progressive collapse per UFC 4-023-03, and component design for blast loads where required. Framing is developed to redistribute loads after loss of a primary member, using tie-force or alternate-path methods appropriate to the level of protection. Site civil design coordinates controlled perimeters, vehicle barriers, and setbacks to achieve required standoff, and connection detailing is documented so hardened performance is buildable and verifiable.",
      },
      {
        heading: "Secure Facilities (SCIF) & Special Access Program (SAP) Infrastructure",
        body: "Sensitive Compartmented Information Facilities and SAP spaces are engineered to ICD 705 technical specifications alongside the base building code. We coordinate acoustic isolation to the required STC ratings, RF shielding and TEMPEST provisions where specified, and the penetration control that keeps the secure perimeter intact — sealing every duct, pipe, conduit, and structural interface. Mechanical systems are designed for sound attenuation and independent zoning; electrical and low-voltage pathways are separated and protected; and intrusion-detection and access-control infrastructure is accommodated. Our documents define the construction-security requirements and coordination with the accrediting official so the facility is accredited without redesign.",
      },
      {
        heading: "DoD Energy Mandates & Net-Zero Installation Engineering",
        body: "Federal and DoD energy policy drives aggressive efficiency and resilience targets, and we engineer to UFC 1-200-02 High Performance and Sustainable Building Requirements along with applicable executive-order goals. Designs reduce energy-use intensity through high-performance envelopes, efficient HVAC, and controls, and incorporate on-site generation, battery storage, and microgrid-ready distribution where resilience is required. We perform energy modeling to verify targets, size standby and prime power for mission continuity, and coordinate metering. Rooftop or ground-mount PV is developed to interconnect safely with installation distribution, supporting net-zero and energy-security objectives without compromising mission loads.",
      },
    ],
    disciplines: [
      {
        name: "Structural Engineering",
        href: "/services/structural",
        body: [
          "Military structural engineering integrates conventional loading with force-protection demands. We design to the applicable UFC structural criteria and IBC/ASCE 7, then layer in progressive-collapse resistance and blast component design per the required level of protection. Framing, connections, and foundations are detailed so hardened performance is achievable with standard construction methods.",
          "We also design for heavy equipment, aircraft, and vehicle loads common to defense facilities, coordinating seismic and wind demands for the location.",
        ],
        highlights: [
          "Progressive-collapse design per UFC 4-023-03 (tie-force/alternate-path)",
          "Blast component and connection detailing for required protection levels",
          "Heavy vehicle, aircraft, and equipment load design",
          "Foundations coordinated with hardening and standoff requirements",
          "Seismic and wind design to UFC and ASCE 7",
        ],
      },
      {
        name: "MEP Engineering",
        href: "/services/mep",
        body: [
          "Defense MEP balances efficiency mandates with mission resilience. We design HVAC, power, and plumbing to the governing UFC and UFGS, providing standby and, where required, redundant power for mission-critical loads, and sound-attenuated, isolated systems for secure spaces. Electrical distribution is coordinated with generators, ATS schemes, and microgrid-ready architecture.",
          "Mechanical designs meet high-performance-building energy targets while maintaining the pressurization and separation that secure and specialized facilities require.",
        ],
        highlights: [
          "UFC/UFGS-compliant HVAC, electrical, and plumbing design",
          "Standby/redundant power and paralleled generator schemes",
          "High-performance building energy modeling and controls",
          "Acoustically isolated, independently zoned systems for secure spaces",
          "Microgrid-ready distribution and on-site generation integration",
        ],
      },
      {
        name: "Civil Engineering",
        href: "/services/civil",
        body: [
          "Site civil work is central to force protection: we lay out controlled perimeters, vehicle standoff, barriers, and access-control points to achieve UFC 4-010-01 setbacks. Heavy-duty pavements are designed for military vehicle and aircraft traffic, with stormwater management meeting federal and installation standards.",
          "Utility corridors, fire access, and site security features are coordinated with the installation's master plan and the building disciplines.",
        ],
        highlights: [
          "ATFP standoff, perimeter, and vehicle-barrier site layout",
          "Heavy-duty pavement design for military vehicles and aircraft",
          "Stormwater management to federal and installation standards",
          "Utility corridor and fire-access coordination",
          "Site design aligned with the installation master plan",
        ],
      },
      {
        name: "Geotechnical Engineering",
        body: [
          "Subsurface investigation supports the demanding foundations these facilities require, characterizing bearing capacity, settlement, and seismic site class. We provide foundation recommendations for hardened structures, heavy equipment pads, and airfield or pavement subgrades.",
          "Where blast or dynamic loads apply, soil-structure interaction and dynamic response are considered so foundation performance matches the protection objective.",
        ],
        highlights: [
          "Subsurface investigation and seismic site classification",
          "Foundation recommendations for hardened and heavy-load structures",
          "Pavement subgrade and CBR evaluation for airfields/roads",
          "Settlement and bearing analysis for mission facilities",
          "Soil parameters for dynamic and blast-load considerations",
        ],
      },
    ],
    facilityTypes: [
      "Administrative and command facilities",
      "Barracks and unaccompanied housing",
      "Maintenance and vehicle facilities",
      "Aircraft hangars and support buildings",
      "Secure facilities (SCIF/SAP spaces)",
      "Training and simulation facilities",
      "Warehouse and supply/logistics facilities",
      "Utility and central energy plants",
      "Communications and network facilities",
    ],
    projectTypes: [
      "MILCON new construction",
      "Sustainment, restoration, and modernization (SRM)",
      "Facility renovation and reconfiguration",
      "Secure-space build-out and accreditation support",
      "Expansion and mission-bed-down projects",
      "Energy and resilience upgrade projects",
    ],
    deliverables: [
      "Permit-ready sealed structural and MEP drawings",
      "Progressive-collapse and blast component calculations",
      "Electrical one-line diagrams and standby power load studies",
      "Energy models and high-performance-building compliance documentation",
      "UFGS-formatted specifications",
      "ICD 705 secure-space coordination documents",
      "DrChecks review responses and back-check submittals",
      "RFI responses and construction administration support",
    ],
    compliance: [
      {
        code: "UFC 4-010-01",
        desc: "The DoD Minimum Antiterrorism Standards for Buildings define standoff distances and protective measures that we implement in structural and site design.",
      },
      {
        code: "UFC 4-023-03",
        desc: "This criterion governs design to resist progressive collapse, applied through tie-force or alternate-path structural methods.",
      },
      {
        code: "ICD 705",
        desc: "The Intelligence Community Directive sets physical and technical security standards for SCIFs our acoustic, shielding, and penetration-control design satisfies.",
      },
      {
        code: "UFC 1-200-02",
        desc: "High Performance and Sustainable Building Requirements drive the energy, water, and resilience targets we verify through modeling and system design.",
      },
      {
        code: "UFGS",
        desc: "Unified Facilities Guide Specifications provide the DoD specification format and content we adapt for each project's materials and systems.",
      },
      {
        code: "IBC / ASCE 7",
        desc: "The building code and ASCE 7 establish the baseline structural, seismic, and wind loading criteria that UFC provisions build upon.",
      },
    ],
    cta: "Upload your installation or MILCON drawings for a scope and fee review, and our veteran-owned team will confirm the UFC path forward.",
  },
  {
    slug: "government-civic-engineering",
    name: "Government & Civic",
    cluster: 1,
    title: "Government & Civic Building Engineering | High-Security Design",
    meta: "Comprehensive engineering services for public, civic, and municipal infrastructure. Expertise in high-security structural hardening and stringent energy mandates.",
    h1: "Government & Municipal Infrastructure Engineering",
    h2: "Secure, Resilient, and Energy-Efficient Public Buildings",
    cardBlurb:
      "Structural and MEP engineering for civic, municipal, and public-safety buildings — secure, resilient, and built to meet public-sector energy and accessibility mandates.",
    intro: [
      "Public buildings must serve everyone, endure for decades, and often keep operating through emergencies. That places government projects at the intersection of stringent accessibility requirements, public-sector energy mandates, security and blast-resilience considerations, and — for essential facilities — the higher loading demands that keep them functional after a disaster. Add prescriptive procurement and multi-agency review, and the engineering must be both technically rigorous and administratively disciplined to clear approvals on schedule.",
      `Apex Grid provides integrated structural, MEP, civil, and geotechnical engineering for civic and municipal clients, from city halls and courthouses to police, fire, and emergency-operations facilities. We design essential public-safety buildings to Risk Category IV, add security hardening and blast resilience where the threat assessment requires it, and meet the energy codes and sustainability targets public agencies mandate. ${LICENSING_COVERAGE_STATEMENT} ${PROJECT_JURISDICTION_NOTE} We deliver permit-ready documents and the specifications public bidding requires.`,
    ],
    specialties: [
      {
        heading: "High-Security Structural Hardening & Blast Resilient Design",
        body: "Courthouses, federal buildings, and public-safety facilities frequently require security measures beyond baseline code. Where a threat and risk assessment applies — such as ISC or GSA criteria for federal work — we design structural systems for standoff, progressive-collapse resistance, and blast-resistant components. Laminated, capture-resistant glazing limits hazardous fragmentation; superstructure detailing provides alternate load paths; and secure zones such as sally ports, holding areas, and evidence rooms receive appropriate wall, slab, and connection design. We calibrate the level of protection to the facility's mission and documented risk so hardening is targeted rather than generic.",
      },
      {
        heading: "Federal, State, and Municipal Energy Mandate Compliance",
        body: "Public agencies are often bound by energy codes and sustainability policies stricter than private-sector minimums — ASHRAE 90.1 or the IECC as adopted, plus state programs like California's Title 24 and agency net-zero or LEED requirements. We design high-performance envelopes and efficient HVAC, optimize lighting to power-density limits, and specify controls that meet mandatory measures. Energy modeling verifies performance-path compliance and documents savings for agency reporting. Where policy requires it, we integrate on-site renewables and electrification, producing a defensible package that satisfies the building department and the agency's commitments.",
      },
      {
        heading: "Public Works, Civic Centers, and Emergency Response Facilities",
        body: "Emergency operations centers, fire stations, 911 dispatch, and public-works facilities must remain operational during and after extreme events, classifying them as Risk Category IV essential facilities under ASCE 7. We design their structures to elevated seismic and wind importance factors with strict drift control, and anchor non-structural components so systems stay functional post-event. Standby and, where warranted, redundant power keeps critical loads energized, and HVAC and communications run continuously. Fire stations add apparatus-bay loading and vehicle exhaust extraction, while civic centers balance high assembly occupancy, egress, and accessibility with durable systems.",
      },
    ],
    disciplines: [
      {
        name: "Structural Engineering",
        href: "/services/structural",
        body: [
          "Government structural design spans routine occupancies and essential facilities. For city halls, libraries, and civic centers we design efficient, durable framing to IBC and ASCE 7; for police, fire, and emergency-operations buildings we apply Risk Category IV loading with tight drift limits and non-structural anchorage so the facility stays operational after a design event.",
          "Where security assessments require it, we add standoff coordination, progressive-collapse resistance, and blast component design for the documented threat.",
        ],
        highlights: [
          "Risk Category IV design for essential public-safety facilities",
          "Efficient gravity and lateral systems for civic buildings",
          "Progressive-collapse and blast component design where required",
          "Non-structural anchorage for post-event system continuity",
          "Apparatus-bay and heavy-vehicle structural design for fire stations",
        ],
      },
      {
        name: "MEP Engineering",
        href: "/services/mep",
        body: [
          "Civic MEP must meet strict energy mandates while keeping essential facilities running. We design efficient HVAC, plumbing, and electrical systems that comply with the adopted energy code and agency targets, and provide standby or redundant power for public-safety loads.",
          "High-assembly civic spaces receive ventilation, egress lighting, and life-safety systems sized for peak occupancy, with metering that supports agency reporting.",
        ],
        highlights: [
          "Energy-code-compliant HVAC, lighting, and controls",
          "Standby/redundant power for emergency and critical loads",
          "Life-safety, egress, and fire-alarm systems for assembly occupancies",
          "Vehicle-exhaust extraction and specialty systems for fire stations",
          "Metering and monitoring for sustainability reporting",
        ],
      },
      {
        name: "Civil Engineering",
        href: "/services/civil",
        body: [
          "Public sites demand accessible, durable, and secure design. We provide grading, ADA-compliant circulation, parking, and stormwater management to municipal standards, and lay out perimeters, vehicle standoff, and secure access where security criteria apply.",
          "Emergency-response facilities receive apparatus-access and turnout design, and utility connections are sized for the building and coordinated with fire-flow.",
        ],
        highlights: [
          "ADA-accessible site circulation and parking",
          "Stormwater management and NPDES compliance",
          "Security perimeters, standoff, and controlled access",
          "Apparatus access and turnout aprons for fire stations",
          "Utility connections and fire-flow coordination",
        ],
      },
      {
        name: "Geotechnical Engineering",
        body: [
          "Long-lived public and essential facilities warrant thorough subsurface investigation to establish bearing capacity, settlement limits, and seismic site class. We provide foundation recommendations suited to the structure and its importance factor.",
          "Where soils are poor or seismic hazards exist, we evaluate liquefaction and recommend deep foundations or ground improvement.",
        ],
        highlights: [
          "Subsurface investigation and seismic site classification",
          "Bearing and settlement analysis for public and essential facilities",
          "Liquefaction and lateral-spread evaluation where applicable",
          "Deep-foundation or ground-improvement recommendations",
          "Pavement subgrade evaluation for site and apparatus areas",
        ],
      },
    ],
    facilityTypes: [
      "City halls and administrative buildings",
      "Courthouses and justice facilities",
      "Police stations and public-safety buildings",
      "Fire stations and EMS facilities",
      "Emergency operations and 911 dispatch centers",
      "Public libraries and civic/community centers",
      "Public-works and maintenance facilities",
      "Detention and holding facilities",
      "Municipal utility and treatment support buildings",
    ],
    projectTypes: [
      "New civic and public-safety construction",
      "Renovation and modernization of aging public buildings",
      "Seismic and security retrofit projects",
      "Facility expansions and additions",
      "Adaptive reuse of buildings for public use",
      "Energy and infrastructure upgrade projects",
    ],
    deliverables: [
      "Permit-ready sealed structural and MEP drawings",
      "Risk Category IV structural and anchorage calculations",
      "Electrical one-line diagrams and standby power load studies",
      "Energy models and code-compliance documentation",
      "Public-bid specifications (CSI format)",
      "Blast/security hardening design documentation where required",
      "Commissioning coordination documents",
      "RFI responses and construction administration support",
    ],
    compliance: [
      {
        code: "IBC / ASCE 7",
        desc: "The building code and ASCE 7 set the Risk Category and loading criteria we apply, using Category IV for essential facilities.",
      },
      {
        code: "ADA / ABA Standards",
        desc: "Federal accessibility standards govern public access, incorporated into our site, circulation, and building design.",
      },
      {
        code: "ASHRAE 90.1 / IECC",
        desc: "The adopted energy standard sets envelope, HVAC, and lighting efficiency requirements our designs meet by prescriptive or performance paths.",
      },
      {
        code: "ISC / GSA Security Criteria",
        desc: "For federal and high-security civic projects, these criteria define protection levels informing our structural hardening and standoff design.",
      },
      {
        code: "NFPA 101 / IFC",
        desc: "The Life Safety Code and Fire Code govern egress, occupancy, and fire protection for the assembly and institutional public buildings we design.",
      },
      {
        code: "Title 24 (where applicable)",
        desc: "California's energy standard imposes stringent mandatory and performance measures we document for compliance where applicable.",
      },
    ],
    cta: "Upload your civic or public-safety project drawings for a scope and fee review, and we will outline a secure, code-compliant delivery plan.",
  },
  {
    slug: "educational-facility-engineering",
    name: "Education",
    cluster: 1,
    title: "Educational Facility Engineering | DSA & Campus MEP Infrastructure",
    meta: "Engineering services for K-12 and higher education institutions. Experts in DSA compliance, campus utility master planning, and laboratory ventilation.",
    h1: "K-12 & Higher Education Facility Engineering",
    h2: "Scalable MEP Infrastructure & Structural Systems for Modern Campuses",
    cardBlurb:
      "Multi-discipline engineering for K-12 and higher-education campuses — DSA-compliant structures, laboratory ventilation, and scalable central-plant infrastructure.",
    intro: [
      "Educational facilities house vulnerable occupants and operate on immovable academic calendars, so life-safety rigor and schedule certainty both matter. K-12 schools in California fall under the Division of the State Architect (DSA), which reviews structural, fire-life-safety, and accessibility for every project. Higher-education campuses add teaching and research labs, high-density occupancies, and aging central infrastructure that must expand without campus shutdowns.",
      `Apex Grid delivers integrated structural, MEP, civil, and geotechnical engineering for K-12 districts and colleges. We design school structures to the elevated safety expectations of educational occupancies — DSA where applicable — engineer laboratory ventilation and fume-hood systems to ANSI/ASHRAE and NFPA standards, and master-plan campus utilities and central plants for phased growth. ${LICENSING_COVERAGE_STATEMENT} ${PROJECT_JURISDICTION_NOTE} We produce permit-ready, sealed documents and phasing plans that keep campuses running between terms.`,
    ],
    specialties: [
      {
        heading: "DSA Compliance & Structural Safety Verification",
        body: "California public K-12 and community-college buildings are governed by the Field Act and reviewed by DSA for structural safety, fire and life safety, and accessibility. We design to the California Building Code with DSA amendments, prepare structural calculations and drawings for plan review, and coordinate the DSA-required project inspector and special-inspection program through construction. Non-structural components — ceilings, fixtures, partitions, and equipment — are anchored to ASCE 7 seismic requirements because student safety depends on them staying in place. We manage the DSA submittal, back-check, and construction-change process and provide the verified-report closeout so projects certify. Early code-path decisions keep modernizations and additions on the academic schedule.",
      },
      {
        heading: "Complex Laboratory Ventilation & Fume Hood Systems",
        body: "Teaching and research labs demand precise, safe ventilation. We design fume-hood exhaust and laboratory HVAC to ANSI/AIHA Z9.5 and NFPA 45, sizing exhaust for the required face velocity — typically around 100 fpm — and providing the make-up air, room pressurization, and minimum air-change rates each lab class requires. Variable-air-volume fume-hood controls with proper sash management reduce energy use while maintaining containment, and high-plume dilution fans disperse effluent safely above the roofline. Hazardous-material storage, chemical fume exhaust, and specialty gas systems coordinate with the fire-protection design. Documentation defines airflow interlocks and alarms so commissioning verifies safe containment.",
      },
      {
        heading: "Campus-Wide Central Utility Plant (CUP) & Infrastructure Design",
        body: "Colleges and large districts rely on central plants distributing chilled water, hot water or steam, and electrical power across many buildings. We design and expand central utility plants — chillers, boilers, cooling towers, pumps, and distribution — and perform the load analysis and hydraulic modeling that right-sizes capacity for current and future loads. Underground distribution piping, direct-buried or in utilidors, is engineered for thermal expansion, and electrical distribution coordinates with campus substations and standby power. We phase tie-ins so new buildings connect without interrupting service, and develop utility master plans for predictable growth over decades.",
      },
    ],
    disciplines: [
      {
        name: "Structural Engineering",
        href: "/services/structural",
        body: [
          "School structures carry heightened safety expectations. We design gravity and lateral systems to IBC and ASCE 7 — and to DSA amendments for California K-12 — with careful attention to non-structural anchorage of ceilings, fixtures, and equipment that protects occupants during seismic events.",
          "For gymnasiums, auditoriums, and libraries we design long-span, high-occupancy structures, and for occupied-campus additions we detail expansion joints, tie-ins, and shoring so buildings stay in use.",
        ],
        highlights: [
          "DSA-compliant structural design for California K-12",
          "Non-structural seismic anchorage for ceilings, fixtures, and equipment",
          "Long-span framing for gyms, auditoriums, and assembly spaces",
          "Additions, tie-ins, and expansion-joint detailing on occupied campuses",
          "Modular and relocatable classroom support",
        ],
      },
      {
        name: "MEP Engineering",
        href: "/services/mep",
        body: [
          "Educational MEP prioritizes indoor air quality, energy efficiency, and reliability. We design HVAC to ASHRAE ventilation and comfort standards for classrooms, with acoustics addressed to ANSI S12.60 so learning environments stay quiet. Laboratory, kitchen, and shop spaces receive specialized exhaust and make-up air.",
          "Electrical, lighting, and low-voltage systems support technology-rich classrooms, designed to the adopted energy code with controls that lower operating costs.",
        ],
        highlights: [
          "ASHRAE-compliant classroom ventilation and comfort control",
          "Laboratory, kitchen, and shop exhaust and make-up air",
          "Energy-code-compliant lighting and HVAC controls",
          "Classroom power, data, and AV/low-voltage infrastructure",
          "Acoustic design to ANSI S12.60 for learning spaces",
        ],
      },
      {
        name: "Civil Engineering",
        href: "/services/civil",
        body: [
          "Campus civil design addresses safe pedestrian and vehicular separation, bus and parent drop-off, service access, and accessible routes throughout the site. We provide grading, paving, stormwater management, and utility connections sized for campus demands.",
          "Athletic fields, play areas, and site drainage are coordinated with building and utility work, and fire access is designed to satisfy the AHJ.",
        ],
        highlights: [
          "Bus, drop-off, and pedestrian-vehicle separation",
          "ADA-accessible campus circulation and parking",
          "Stormwater management and NPDES compliance",
          "Athletic field and play-area grading and drainage",
          "Campus utility connections and fire-access coordination",
        ],
      },
      {
        name: "Geotechnical Engineering",
        body: [
          "Subsurface investigation establishes bearing capacity, settlement, and seismic site class for school and campus structures, including the DSA-required geotechnical documentation for California K-12 sites.",
          "We provide foundation recommendations, evaluate expansive or liquefiable soils, and supply pavement subgrade parameters for campus site work.",
        ],
        highlights: [
          "Subsurface investigation and seismic site classification",
          "Geotechnical reports meeting DSA requirements where applicable",
          "Bearing capacity and settlement analysis",
          "Expansive- and liquefiable-soil evaluation and mitigation",
          "Pavement subgrade recommendations for campus site work",
        ],
      },
    ],
    facilityTypes: [
      "K-12 classroom buildings and campuses",
      "Science, technology, and career-technical labs",
      "Gymnasiums, fieldhouses, and athletic facilities",
      "Auditoriums, theaters, and performing-arts centers",
      "Libraries and media/learning commons",
      "Higher-education academic and research buildings",
      "Student housing and residence halls",
      "Central utility plants and campus infrastructure",
      "Administration and student-services buildings",
    ],
    projectTypes: [
      "New school and campus building construction",
      "Modernization and renovation of existing facilities",
      "Classroom and lab tenant improvements/fit-outs",
      "Additions and campus expansions",
      "Central-plant and utility-infrastructure upgrades",
      "Seismic and accessibility retrofit projects",
    ],
    deliverables: [
      "Permit-ready sealed structural and MEP drawings",
      "Structural and non-structural anchorage calculations",
      "DSA submittal, back-check, and closeout documentation",
      "Laboratory ventilation and fume-hood exhaust design package",
      "Central-plant load analysis and utility master plans",
      "Electrical one-line diagrams and load studies",
      "Technical specifications and equipment schedules",
      "RFI responses and construction administration support",
    ],
    compliance: [
      {
        code: "DSA / Field Act",
        desc: "The Division of the State Architect reviews structural, fire-life-safety, and accessibility for California public K-12 and community-college projects, which we design and document to for certification.",
      },
      {
        code: "IBC / ASCE 7",
        desc: "The building code and ASCE 7 establish the loading and seismic criteria for educational occupancies, including robust non-structural anchorage.",
      },
      {
        code: "ANSI/AIHA Z9.5",
        desc: "The laboratory ventilation standard sets fume-hood face velocity and ventilation criteria that govern our lab HVAC and exhaust design.",
      },
      {
        code: "NFPA 45",
        desc: "The standard for fire protection in laboratories using chemicals informs our hazardous-material, exhaust, and storage coordination.",
      },
      {
        code: "ANSI S12.60",
        desc: "This acoustical standard for classrooms sets background-noise and reverberation limits that shape our HVAC and building acoustics design.",
      },
      {
        code: "ASHRAE 90.1 / IECC",
        desc: "The adopted energy standard defines efficiency requirements we meet for envelope, HVAC, and lighting to lower campus operating costs.",
      },
    ],
    cta: "Upload your campus or school project drawings for a scope and fee review, and we will phase the work to fit your academic calendar.",
  },
];
