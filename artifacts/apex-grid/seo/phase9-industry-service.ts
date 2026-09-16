import { htmlShell, SITE } from "./shell";

export const PHASE9_AUTHOR =
  "Jeremy Mills, CEO & Founder, Apex Grid Engineering — USAF Veteran";

type Link = { label: string; href: string };
type Faq = { question: string; answer: string };

export interface Phase9IndustryServicePage {
  segments: string[];
  title: string;
  description: string;
  h1: string;
  kicker: string;
  intro: string;
  perspective: string;
  topics: string[];
  links: Link[];
  faqs: Faq[];
}

const pages: Phase9IndustryServicePage[] = [
  {
    segments: ["healthcare", "hospitals", "structural-engineering"],
    title: "Hospital Structural Engineering | Apex Grid Engineering",
    description: "Hospital structural engineering for equipment anchorage, renovations, rooftop systems, seismic coordination, and phased construction with PE review documents.",
    h1: "Structural Engineering for Hospitals",
    kicker: "Hospitals · Structural Engineering",
    intro: "I approach hospital structural work as a continuity problem as much as a gravity and lateral design problem. Equipment, rooftop plant, seismic restraint, openings, and construction phasing must be coordinated with spaces that may remain operational.",
    perspective: "My first step is to establish what is known about the building, what the proposed clinical or support use changes, and which conclusions require field verification. I keep structural assumptions visible so the owner and design team can make decisions without treating an incomplete record as a survey.",
    topics: ["Medical equipment anchorage and support", "Rooftop mechanical equipment framing", "Structural openings and penetrations", "Seismic restraint and nonstructural coordination", "Generator, transformer, and equipment pads", "Occupied renovation and phased construction", "Hospital additions and connection detailing", "Existing-condition structural evaluations"],
    links: [
      { label: "Healthcare structural engineering", href: "/industries/healthcare/structural-engineering/" },
      { label: "Hospital MEP engineering", href: "/industries/healthcare/hospitals/mep-engineering/" },
      { label: "Structural engineering services", href: "/structural-engineering/" },
      { label: "Healthcare engineering resources", href: "/resources/" },
    ],
    faqs: [
      { question: "What makes hospital structural engineering different?", answer: "Hospitals combine heavy equipment, sensitive operations, high coordination needs, and often occupied phasing. I evaluate the actual structure, use, equipment, alteration, and governing requirements rather than applying a generic hospital detail." },
      { question: "Can you design support for new medical equipment?", answer: "I can review the available structural records, equipment information, support conditions, and requested deliverable to determine an appropriate engineering scope. Final conclusions depend on verified project information." },
      { question: "How are hospital renovations coordinated with operations?", answer: "The owner and facility team establish access, shutdown, infection-control, and phasing constraints. I document structural interfaces and assumptions so the design team can coordinate them with the construction plan." },
      { question: "Does every hospital project require seismic strengthening?", answer: "Not necessarily. The required analysis depends on location, building, alteration, equipment, code path, and project scope. Those facts must be reviewed before a strengthening conclusion is made." },
      { question: "Who approves a hospital structural submittal?", answer: "The applicable authority, owner, and other designated reviewers control their own requirements and decisions. I prepare the agreed engineering scope without promising approval or review timing." },
    ],
  },
  {
    segments: ["healthcare", "medical-office-buildings", "electrical-engineering"],
    title: "Medical Office Electrical Engineering | Apex Grid USA",
    description: "Electrical engineering for medical office buildings covering imaging loads, emergency power, procedure rooms, tenant improvements, grounding, and documents.",
    h1: "Electrical Engineering for Medical Office Buildings",
    kicker: "Medical Office Buildings · Electrical Engineering",
    intro: "I design medical-office electrical scopes around the actual outpatient program: physician suites, imaging, procedure rooms, laboratories, dental equipment, or a tenant improvement in an existing shell. The load profile and operational risk change with each use.",
    perspective: "I start by separating base-building capacity from the proposed tenant load, then map dedicated equipment circuits, emergency or standby needs, grounding, lighting, and coordination responsibilities. That approach gives the architect and owner a usable decision record before a panel schedule is treated as final.",
    topics: ["Service and feeder capacity review", "Imaging and diagnostic equipment circuits", "Procedure-room and clinical-area power", "Emergency and standby power coordination", "Grounding and bonding documentation", "Medical office tenant-improvement plans", "Lighting, controls, and energy-code coordination", "Panel schedules and load calculations"],
    links: [
      { label: "Healthcare electrical engineering", href: "/industries/healthcare/electrical-engineering/" },
      { label: "Medical office MEP engineering", href: "/industries/healthcare/medical-office-buildings/mep-engineering/" },
      { label: "Electrical engineering services", href: "/electrical-engineering/" },
      { label: "Tenant improvement engineering", href: "/industries/tenant-improvement-engineering" },
    ],
    faqs: [
      { question: "What electrical information is needed for a medical office?", answer: "Useful inputs include the suite plan, equipment schedule, existing service and panels, utility information, clinical use, emergency-power expectations, and the jurisdiction or owner standards governing the work." },
      { question: "Do imaging rooms always need a new electrical service?", answer: "No. Service capacity, equipment nameplates, existing distribution, diversity, and the proposed program determine whether upgrades are needed. I review those facts rather than assuming the answer from the room label." },
      { question: "How do tenant improvements account for base-building capacity?", answer: "I compare the proposed connected and demand loads with available service, feeders, panels, and equipment connections, then identify upgrades or coordination items that require owner and utility confirmation." },
      { question: "Can medical-office electrical work include emergency power?", answer: "It can when the agreed scope and applicable requirements call for it. The owner, facility use, equipment, adopted code, and responsible reviewers determine the required system and documentation." },
      { question: "Who reviews medical-office electrical plans?", answer: "The applicable authority, owner, utility, and other designated reviewers control their own requirements. Engineering documents support the agreed scope but cannot guarantee a review result." },
    ],
  },
  {
    segments: ["healthcare", "surgery-centers", "mep-engineering"],
    title: "Surgery Center MEP Engineering | Apex Grid Engineering",
    description: "MEP engineering for surgery centers covering clinical HVAC, pressure relationships, emergency power, medical gases, plumbing, and design coordination.",
    h1: "MEP Engineering for Surgery Centers",
    kicker: "Surgery Centers · MEP Engineering",
    intro: "I treat a surgery-center MEP scope as a coordinated clinical system. Air pressure, filtration, temperature, electrical continuity, plumbing, medical-gas interfaces, and equipment loads must be considered together with the facility program and operating model.",
    perspective: "I begin with the room list, procedure types, equipment schedule, owner standards, and existing-building constraints. From there I identify which requirements belong to mechanical, electrical, plumbing, architectural, fire-protection, and medical-gas coordination so the final documents have clear boundaries.",
    topics: ["Operating and procedure-room HVAC coordination", "Pressure relationships and ventilation", "Emergency and standby power planning", "Medical-gas interface coordination", "Clinical plumbing and sterilization utilities", "Recovery, pre-op, and support-space systems", "Existing-suite renovation phasing", "Equipment schedules and coordinated documentation"],
    links: [
      { label: "Healthcare MEP engineering", href: "/industries/healthcare/mep-engineering/" },
      { label: "Hospital MEP engineering", href: "/industries/healthcare/hospitals/mep-engineering/" },
      { label: "MEP engineering services", href: "/mep-engineering/" },
      { label: "Healthcare structural engineering", href: "/industries/healthcare/structural-engineering/" },
    ],
    faqs: [
      { question: "What drives a surgery-center MEP scope?", answer: "The procedure program, room functions, equipment, occupancy, existing systems, owner criteria, jurisdiction, and requested deliverables drive the scope. I use those facts instead of assuming every outpatient suite has the same requirements." },
      { question: "How are operating-room pressure relationships documented?", answer: "The design team establishes the room matrix, airflow direction, exhaust and supply strategy, controls, and verification responsibilities for the applicable project. The final basis depends on the facility and governing requirements." },
      { question: "Does a surgery center always need emergency power?", answer: "The required systems depend on the facility use, equipment, adopted requirements, and owner criteria. I review the actual essential loads and interfaces before documenting an emergency-power approach." },
      { question: "Can an existing outpatient suite be converted to surgery use?", answer: "It may be possible, but the existing HVAC, electrical, plumbing, structure, fire/life-safety, and architectural conditions must be evaluated against the proposed program before feasibility is stated." },
      { question: "Who confirms clinical MEP compliance?", answer: "The responsible professionals, owner, authority, and other designated reviewers each control the criteria within their role. I coordinate the agreed engineering scope without promising approval." },
    ],
  },
  {
    segments: ["multifamily", "student-housing", "structural-engineering"],
    title: "Student Housing Structural Engineering | Apex Grid",
    description: "Structural engineering for student housing covering repetitive framing, high occupancy, stairs, balconies, seismic and wind design, podiums, and construction.",
    h1: "Structural Engineering for Student Housing",
    kicker: "Student Housing · Structural Engineering",
    intro: "I design student-housing structural scopes around repetition, density, and the way students actually occupy the building. Room modules, corridors, stairs, balconies, amenity spaces, podiums, and construction phasing all affect the structural system.",
    perspective: "I compare the proposed program with the site, construction type, geotechnical information, and local wind or seismic criteria. My goal is a coordinated framing concept that can be developed into clear permit and construction documents without hiding the decisions that still belong to the owner or design team.",
    topics: ["Repetitive wood, cold-formed, steel, and concrete framing", "Podium and transfer conditions", "Stair, corridor, and egress structure", "Balcony and exterior amenity support", "Seismic and wind lateral systems", "Rooftop and mechanical equipment support", "Existing-building conversion evaluations", "Phased or occupied construction coordination"],
    links: [
      { label: "Multifamily structural engineering", href: "/industries/multifamily/structural-engineering/" },
      { label: "Student housing MEP engineering", href: "/industries/student-housing/mep-engineering/" },
      { label: "Apartment structural engineering", href: "/industries/multifamily/apartments/structural-engineering/" },
      { label: "Structural engineering services", href: "/structural-engineering/" },
    ],
    faqs: [
      { question: "How is student housing different from ordinary apartments?", answer: "The structural scope may be shaped by higher occupancy, repetitive room modules, shared amenities, concentrated circulation, balconies, and academic-calendar phasing. I confirm those project facts before selecting design priorities." },
      { question: "Can student housing use a concrete podium?", answer: "A podium can be part of a project-specific solution when the program, construction type, site, and structural criteria support it. The framing and transfer decisions require coordinated architectural and geotechnical information." },
      { question: "Do balconies need separate structural review?", answer: "Balconies and exterior amenity structures should be included in the structural scope when they are part of the work. Loads, connections, waterproofing interfaces, and exposure conditions must be coordinated for the actual design." },
      { question: "Can an existing apartment become student housing?", answer: "That change requires review of occupancy, loads, egress interfaces, existing framing, alterations, and the applicable requirements. I will identify records and verification needed before drawing a final conclusion." },
      { question: "Who approves student-housing structural documents?", answer: "The applicable authority and owner review team control their requirements and decisions. I prepare the agreed structural deliverables without guaranteeing approval or a particular review schedule." },
    ],
  },
  {
    segments: ["multifamily", "apartments", "geotechnical-engineering"],
    title: "Apartment Geotechnical Engineering | Apex Grid Engineering",
    description: "Geotechnical engineering for apartment projects covering borings, foundations, settlement, expansive soils, retaining conditions, and site preparation.",
    h1: "Geotechnical Engineering for Apartment Buildings",
    kicker: "Apartments · Geotechnical Engineering",
    intro: "I use apartment geotechnical work to connect subsurface evidence with the building and site decisions that follow. Repeated foundations, podiums, retaining conditions, parking, utilities, and grading can make a seemingly simple residential site highly sensitive to soil variability.",
    perspective: "I define the investigation around the proposed footprint, site history, grade changes, building loads, and civil and structural questions. The resulting recommendations remain tied to the tested conditions and project assumptions rather than being presented as a universal soil conclusion.",
    topics: ["Subsurface exploration and boring programs", "Foundation recommendations for apartment buildings", "Expansive or variable soil evaluation", "Settlement and differential movement considerations", "Podium, parking, and retaining conditions", "Pavement and drive-aisle recommendations", "Engineered fill and compaction criteria", "Existing-site additions and conversions"],
    links: [
      { label: "Multifamily geotechnical engineering", href: "/industries/multifamily/geotechnical-engineering/" },
      { label: "Apartment structural engineering", href: "/industries/multifamily/apartments/structural-engineering/" },
      { label: "Multifamily civil engineering", href: "/industries/multifamily/civil-engineering/" },
      { label: "Geotechnical engineering services", href: "/geotechnical-engineering/" },
    ],
    faqs: [
      { question: "Why does an apartment project need geotechnical engineering?", answer: "The investigation supplies site-specific information that structural and civil design use for foundations, slabs, pavement, grading, and settlement decisions. The scope depends on the site and proposed development." },
      { question: "How many borings does an apartment site need?", answer: "There is no responsible universal count. The program depends on building size, footprints, grade changes, prior development, variability, loads, and the questions the project team needs answered." },
      { question: "Can an existing report be reused for an apartment project?", answer: "An existing report may be useful background, but its age, location, scope, conditions, and proposed changes must be compared with the current project before relying on it." },
      { question: "Does geotechnical work include foundation design?", answer: "Geotechnical engineering provides subsurface findings and recommendations; the responsible structural engineer uses them with the building design. The exact division of services should be stated in the project scope." },
      { question: "Who accepts an apartment geotechnical report?", answer: "The applicable authority, owner, and project professionals determine what reports and review steps are required. I prepare the agreed geotechnical scope without promising acceptance." },
    ],
  },
  {
    segments: ["life-science", "cleanroom-electrical-engineering"],
    title: "Cleanroom Electrical Engineering | Apex Grid Engineering",
    description: "Cleanroom electrical engineering for reliable power, UPS and generator coordination, grounding, controls, process equipment, and research facility work.",
    h1: "Electrical Engineering for Cleanrooms",
    kicker: "Life Science · Cleanroom Electrical Engineering",
    intro: "I plan cleanroom electrical work around process continuity, environmental controls, equipment sensitivity, and the relationship between the room classification and the supporting infrastructure. Power quality and maintainability matter alongside the branch circuits on a plan.",
    perspective: "I begin with the process equipment list, environmental systems, owner standards, reliability objectives, and existing service. Then I map distribution, standby or UPS interfaces, grounding, controls, alarms, and future capacity so the electrical design can be coordinated with cleanroom mechanical and architectural decisions.",
    topics: ["Process and laboratory equipment power", "UPS, generator, and transfer coordination", "Grounding and power-quality planning", "Cleanroom HVAC and controls interfaces", "Panel, feeder, and service capacity", "Alarm, monitoring, and critical signal power", "Hazardous or specialty utility coordination", "Phased research and production renovations"],
    links: [
      { label: "Life-science MEP engineering", href: "/industries/life-science/mep-engineering/" },
      { label: "Cleanroom MEP engineering", href: "/industries/life-science/cleanroom-mep-engineering/" },
      { label: "Life-science structural engineering", href: "/industries/life-science/structural-engineering/" },
      { label: "Electrical engineering services", href: "/electrical-engineering/" },
    ],
    faqs: [
      { question: "What drives cleanroom electrical design?", answer: "The process, equipment, environmental systems, room use, reliability objectives, existing service, owner criteria, and applicable requirements drive the design. I confirm those inputs before setting a final distribution concept." },
      { question: "Does every cleanroom need a UPS or generator?", answer: "Not every project has the same continuity requirement. The process, equipment, safety functions, owner criteria, and applicable requirements determine whether UPS, standby, or emergency systems are appropriate." },
      { question: "How is cleanroom electrical work coordinated with HVAC?", answer: "Electrical capacity, controls, alarms, equipment disconnects, and emergency interfaces are coordinated with the mechanical system and room program. The final responsibilities depend on the project team and scope." },
      { question: "Can an operating cleanroom be renovated?", answer: "It may be possible with a defined phasing and shutdown strategy. Existing records, field conditions, contamination controls, temporary power, and the process owner’s constraints must be addressed." },
      { question: "Who confirms cleanroom electrical compliance?", answer: "The responsible professionals, owner, authority, and any designated quality or process reviewers control their respective requirements. Engineering documents cannot promise acceptance by those parties." },
    ],
  },
  {
    segments: ["telecommunications", "mechanical-engineering"],
    title: "Telecom Facility Mechanical Engineering | Apex Grid",
    description: "Mechanical engineering for telecom facilities covering continuous cooling, battery-room ventilation, redundancy, heat rejection, controls, and site upgrades.",
    h1: "Mechanical Engineering for Telecommunications Facilities",
    kicker: "Telecommunications · Mechanical Engineering",
    intro: "I treat telecommunications mechanical design as a continuous-load and access problem. Heat rejection, equipment-room airflow, battery ventilation, redundancy, maintenance clearances, and the building envelope all affect the system that keeps communications equipment within its operating conditions.",
    perspective: "I start with the equipment heat profile, room arrangement, environmental requirements, utility capacity, existing cooling, and reliability objectives. I then coordinate equipment, controls, drainage, electrical interfaces, and phasing so the documents explain both normal operation and the conditions the owner needs reviewed.",
    topics: ["Equipment-room cooling load analysis", "Redundant HVAC and heat-rejection systems", "Battery-room ventilation coordination", "Airflow paths and hot-spot management", "Controls, alarms, and monitoring interfaces", "Rooftop and exterior equipment support coordination", "Maintenance access and replacement planning", "Retrofit and live-site phasing"],
    links: [
      { label: "Telecommunications electrical engineering", href: "/industries/telecommunications/electrical-engineering/" },
      { label: "Telecommunications structural engineering", href: "/industries/telecommunications/structural-engineering/" },
      { label: "Data-center mechanical engineering", href: "/industries/data-centers/mechanical-engineering/" },
      { label: "Mechanical engineering services", href: "/mechanical-engineering/" },
    ],
    faqs: [
      { question: "What information is needed for a telecom cooling scope?", answer: "I need the equipment inventory, heat loads, room plans, environmental targets, existing HVAC, utility information, battery details, controls expectations, and the project’s reliability or phasing requirements." },
      { question: "Does a telecom facility always need redundant cooling?", answer: "The appropriate arrangement depends on equipment, owner objectives, site conditions, and applicable criteria. I evaluate the actual load and operational requirement rather than labeling every facility the same way." },
      { question: "How is battery-room ventilation coordinated?", answer: "Battery type, room configuration, charging equipment, exhaust and makeup-air strategy, detection, controls, and applicable requirements must be coordinated with the facility team and other disciplines." },
      { question: "Can cooling be upgraded while equipment remains live?", answer: "Possibly, but the owner must define acceptable outages, temporary systems, access, and sequencing. I identify design interfaces and assumptions; operations controls the live-site decision." },
      { question: "Who approves telecom mechanical documents?", answer: "The applicable authority, owner, utility, and designated reviewers control their requirements. I prepare the agreed mechanical documents without promising approval, uptime, or a schedule." },
    ],
  },
  {
    segments: ["agriculture", "civil-engineering"],
    title: "Agricultural Facility Civil Engineering | Apex Grid",
    description: "Civil engineering for agricultural facilities covering grading, drainage, access, process utilities, stormwater, yards, greenhouse sites, and utilities.",
    h1: "Civil Engineering for Agricultural Facilities",
    kicker: "Agriculture · Civil Engineering",
    intro: "I plan agricultural civil scopes around how the site operates: production buildings, greenhouses, yards, loading, irrigation, process water, drainage, and seasonal access. A workable plan has to connect the facility program with the land and its existing infrastructure.",
    perspective: "I begin with the site survey, soils and drainage information, facility layout, vehicle movements, utility needs, and water or process narrative. I separate confirmed site facts from assumptions and coordinate civil decisions with structural, MEP, environmental, and agricultural operations requirements.",
    topics: ["Site grading and finished-floor coordination", "Stormwater and drainage planning", "Farm, service, and delivery access", "Greenhouse and controlled-environment site work", "Process and domestic utility connections", "Irrigation and water-management interfaces", "Heavy-duty yards and loading areas", "Erosion, sediment, and phased construction coordination"],
    links: [
      { label: "Agricultural MEP engineering", href: "/industries/agriculture/mep-engineering/" },
      { label: "Civil engineering services", href: "/civil-engineering/" },
      { label: "Industrial and warehouse engineering", href: "/industries/industrial-warehouse-engineering" },
      { label: "Agriculture engineering resources", href: "/resources/" },
    ],
    faqs: [
      { question: "What does civil engineering cover for an agricultural facility?", answer: "The scope may include grading, drainage, access, utilities, yards, loading, stormwater, and erosion controls. The facility use, site, agencies, and requested deliverables determine what belongs in the project." },
      { question: "Can a farm access road be designed like a commercial driveway?", answer: "Not automatically. Vehicle type, seasonal conditions, grades, drainage, fire access, soil, and operations should be reviewed before selecting a pavement or circulation approach." },
      { question: "How are process-water needs included?", answer: "I use the owner’s process narrative, water demand, discharge information, utility records, and applicable agency requirements to identify points of connection and coordination questions. Final requirements remain project-specific." },
      { question: "Does every agricultural site need a stormwater permit?", answer: "Permit and agency requirements depend on location, disturbance, land use, drainage, and project scope. The responsible team must confirm the applicable path rather than relying on a universal assumption." },
      { question: "Who approves agricultural civil plans?", answer: "The applicable local, state, utility, environmental, and project reviewers control their own requirements and decisions. I prepare the agreed civil scope without promising approval or a particular schedule." },
    ],
  },
];

export const PHASE9_INDUSTRY_SERVICE_PAGES = pages;

/** Existing generated family pages that provide contextual inbound links. */
export const PHASE9_INBOUND_TARGETS: Record<string, string> = {
  "/industries/healthcare/hospitals/structural-engineering/": "/industries/healthcare/structural-engineering/",
  "/industries/healthcare/medical-office-buildings/electrical-engineering/": "/industries/healthcare/electrical-engineering/",
  "/industries/healthcare/surgery-centers/mep-engineering/": "/industries/healthcare/mep-engineering/",
  "/industries/multifamily/student-housing/structural-engineering/": "/industries/multifamily/structural-engineering/",
  "/industries/multifamily/apartments/geotechnical-engineering/": "/industries/multifamily/geotechnical-engineering/",
  "/industries/life-science/cleanroom-electrical-engineering/": "/industries/life-science/mep-engineering/",
  "/industries/telecommunications/mechanical-engineering/": "/industries/telecommunications/electrical-engineering/",
  "/industries/agriculture/civil-engineering/": "/industries/agriculture/mep-engineering/",
};

export function phase9Url(page: Phase9IndustryServicePage): string {
  return `/industries/${page.segments.join("/")}/`;
}

const esc = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const titleCase = (value: string) =>
  value.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

export function phase9Page(page: Phase9IndustryServicePage): string {
  const url = phase9Url(page);
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Industries", href: "/industries/" },
    { name: titleCase(page.segments[0]), href: `/industries/${page.segments[0]}` },
    ...(page.segments.length > 2 ? [{ name: titleCase(page.segments[1]), href: `/industries/${page.segments[0]}` }] : []),
    { name: page.kicker.split(" · ").at(-1) ?? "Engineering" },
  ];
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      ...(crumb.href ? { item: `${SITE}${crumb.href}` } : {}),
    })),
  };
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.h1,
    description: page.description,
    provider: { "@type": "Organization", name: "Apex Grid Engineering", url: SITE },
    url: `${SITE}${url}`,
    areaServed: { "@type": "Country", name: "United States" },
  };
  const body = `
<nav class="breadcrumb">${crumbs.map((crumb) => crumb.href ? `<a href="${crumb.href}">${esc(crumb.name)}</a><span>/</span>` : `<b>${esc(crumb.name)}</b>`).join("")}</nav>
<section class="hero"><div class="container"><p class="kicker">${esc(page.kicker)}</p><h1>${esc(page.h1)}</h1><p class="lede">${esc(page.intro)}</p><p class="byline">By ${PHASE9_AUTHOR}</p></div></section>
<section class="block prose"><div class="container"><h2>How I approach this <em>scope</em></h2><p>${esc(page.perspective)}</p><p>I confirm the discipline, jurisdiction, records, applicable criteria, and requested deliverables before treating a concept as a final engineering conclusion. When the available information is incomplete, I identify the verification needed instead of turning an assumption into a promise.</p><p>My role is to coordinate the agreed engineering work with the owner, architect, contractor, and other responsible professionals. Availability, licensure, schedule, fee basis, and review requirements remain subject to the specific project and confirmed scope.</p></div></section>
<section class="block"><div class="container"><h2>Typical <em>engineering questions</em></h2><ul class="scope">${page.topics.map((topic) => `<li>${esc(topic)}</li>`).join("")}</ul></div></section>
<section class="block recommended-resources"><div class="container"><h2>Related <em>resources and services</em></h2><ul>${page.links.map((link) => `<li><a href="${link.href}">${esc(link.label)}</a></li>`).join("")}</ul></div></section>
<section class="block faq"><div class="container"><h2>Frequently Asked <em>Questions</em></h2>${page.faqs.map((faq) => `<details><summary>${esc(faq.question)}</summary><div class="a">${esc(faq.answer)}</div></details>`).join("")}</div></section>
<section class="ctaband"><div class="container"><h2>Define the next engineering decision</h2><p>Share the address, existing records, project use, requested discipline, and the decision your team needs to make.</p><a class="cta" href="/estimate/">Request an Estimate</a></div></section>`;
  return htmlShell({ title: page.title, description: page.description, canonical: `${SITE}${url}`, schemaJson: [serviceSchema, breadcrumbSchema, faqSchema], body });
}