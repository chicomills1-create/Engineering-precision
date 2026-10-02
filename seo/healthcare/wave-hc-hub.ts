// Healthcare SEO tier — national hub page
const founderNote = "I'm Jeremy Mills, CEO & Founder of Apex Grid Engineering and a U.S. Air Force veteran. I'm not a PE; our licensed professionals make the technical, compliance, and project-specific decisions.";

export interface HealthcareHubPage {
  slug: string; title: string; description: string; h1: string;
  directAnswer: string; answer: string;
  sections: { h2: string; body: string }[];
  faqs: { question: string; answer: string }[];
  founderNote: string;
  extraLinks: { text: string; href: string }[];
}

export const WAVE_HC_HUB: HealthcareHubPage[] = [
  {
    slug: "healthcare-design",
    title: "Healthcare Facility Engineering: Hospital MEP Design Experts",
    description: "Hospital MEP engineering nationwide: ASHRAE 170 ventilation, NFPA 99 medical gas, USP 800 pharmacy, surgical suites, ICRA renovation. Licensed in 49 states.",
    h1: "Healthcare Facility Engineering: Hospital MEP Design Experts",
    directAnswer: "Apex Grid Engineering provides hospital and healthcare MEP engineering — HVAC, medical gas, emergency power, and plumbing — designed to ASHRAE 170, FGI Guidelines, NFPA 99, and USP 800, and licensed in 49 states.",
    answer: "Apex Grid Engineering designs MEP systems for hospitals, surgical centers, medical office buildings, pharmacies, and life-science labs across all 49 states where we hold engineering licenses. Healthcare is the most demanding MEP market in commercial construction: ASHRAE Standard 170 ventilation rates, FGI Guidelines space and systems requirements, NFPA 99 medical gas and emergency power, USP 795/797/800 compounding rules, and BSL-2/BSL-3 containment — all enforced through state health-department plan review that forgives nothing.\n\nOur healthcare practice is built for health systems expanding quickly. We pair deep code fluency — operating rooms at 20 air changes per hour and positive pressure, airborne-infection isolation at 12 ACH and negative pressure, USP 800 compounding suites at negative 0.01 to 0.03 inches of water column — with schedule-driven delivery: fast submittal turnaround, plan-review comment resolution, and ICRA-phased construction documents that keep occupied hospitals running while we renovate them.\n\nEvery state runs its own healthcare review process. California routes hospital work through HCAI's seismic plan-review program. Florida's AHCA reviews every hospital plan. New York, North Carolina, Maryland, and more than two dozen other states require certificate-of-need approval before a bed tower breaks ground. Our engineers design to the state process from day one, so the submittal clears instead of cycling.",
    sections: [
      {
        h2: "Hospital MEP engineering, from central plant to bedside",
        body: "Hospital MEP design starts with the loads and ends with the patient. Mechanical engineers size central plants, air-handling systems, and exhaust for the building's most unforgiving spaces: operating rooms needing 20 air changes per hour of highly filtered supply air, isolation rooms holding directional airflow around the clock, pharmacies with cascading pressure regimes, and imaging suites with dedicated cooling and shielding coordination. Electrical engineers design the essential electrical system — life safety, critical, and equipment branches backed by generators that start within 10 seconds — plus normal power distribution, lighting, and low-voltage systems. Plumbing engineers route domestic water with Legionella mitigation per ASHRAE 188, sanitary and storm systems, and coordinate every medical gas outlet the clinical program requires. One stamped, coordinated set covers all of it.",
      },
      {
        h2: "Surgical suites, isolation rooms, and compounding pharmacies",
        body: "The spaces that define a hospital's MEP design are its critical clinical rooms. Operating rooms run positive to adjacent spaces at 20 total air changes per hour with tight temperature (68-75°F) and humidity (20-60%) control, supplied through low-velocity diffuser arrays. Airborne-infection isolation rooms run negative at 12 ACH with anterooms and continuous pressure monitoring. Protective-environment rooms flip the relationship — positive pressure protecting immunocompromised patients. USP 800 hazardous-drug compounding suites cascade negative from the anteroom inward, with externally vented C-PEC hoods and 30 air changes per hour. Each room type gets its own pressure map, and the building automation system proves every relationship, every hour.",
      },
      {
        h2: "Medical gas, emergency power, and life safety",
        body: "NFPA 99 governs the systems patients never see but always depend on. Medical gas — oxygen, medical air, nitrous oxide, medical vacuum, waste anesthetic gas disposal — runs in zoned, alarmed, and labeled piping with area zone valves outside every critical care zone and master alarms at 24-hour attended locations. The essential electrical system carries life safety, critical, and equipment branches on generator backup sized for the facility's actual connected emergency load, with monthly testing per NFPA 110. Fire protection, smoke management, and emergency communications complete the life-safety package. These systems are designed for the survey as well as the emergency: Joint Commission and CMS surveyors trace them end to end.",
      },
      {
        h2: "Infection control during construction (ICRA)",
        body: "Renovating an occupied hospital is surgery on a living patient. Our construction documents carry ICRA 2.0-compliant infection-control risk assessments: Class I through V precautions matched to the construction activity and the patient risk group next door, dust-tight barriers with negative-pressure containment, HEPA-filtered exhaust, sealed penetrations, and traffic patterns that keep construction workers out of patient corridors. The ICRA matrix, barrier details, and monitoring requirements go on the drawings — not in a memo after permit — so the facility's infection preventionist can approve the plan before work starts.",
      },
      {
        h2: "Why health systems choose Apex for speed",
        body: "Healthcare schedules are clinical schedules: a delayed OR opening is lost surgical revenue, a late pharmacy is a delayed accreditation survey. We run healthcare projects on schedule-driven delivery — early AHJ and plan-review engagement, submittal packages built for the reviewer's checklist, and comment responses turned in days, not weeks. Our 49-state licensing footprint means one engineering team can carry a health system's program across state lines without re-procurement, and our 10+ PEs stamp in every jurisdiction we serve.",
      },
    ],
    faqs: [
      {
        question: "What codes govern hospital MEP design?",
        answer: "Hospital MEP design is governed by ASHRAE Standard 170 (ventilation of health care facilities), the FGI Guidelines for Design and Construction of Hospitals, NFPA 99 (health care facilities code, covering medical gas and electrical systems), NFPA 101 (life safety), NFPA 110 (emergency power), USP 795/797/800 (compounding), and the adopted building, mechanical, electrical, and plumbing codes — plus state health-department plan review that enforces them.",
      },
      {
        question: "How much does hospital MEP engineering cost?",
        answer: "Hospital MEP engineering fees typically run 6 to 10 percent of the MEP construction value, which itself is 30 to 45 percent of total hospital construction cost. A new acute-care hospital can cost $600 to over $1,000 per square foot to build, putting MEP engineering in the range of roughly $15 to $45 per square foot depending on complexity, with surgical suites, isolation, pharmacy, and lab spaces at the high end.",
      },
      {
        question: "What is ASHRAE 170?",
        answer: "ASHRAE Standard 170, Ventilation of Health Care Facilities, sets the minimum ventilation rates, filtration levels, temperature and humidity ranges, and pressure relationships for every space in a hospital — from operating rooms (20 air changes per hour, positive pressure) to airborne-infection isolation rooms (12 ACH, negative) to patient rooms. It is adopted by reference into the FGI Guidelines and enforced through state plan review.",
      },
      {
        question: "Does Apex handle HCAI/OSHPD projects in California?",
        answer: "Yes. California hospital work routes through HCAI (the Department of Health Care Access and Information, formerly OSHPD), with its own seismic-compliance plan review, inspection program, and Inspector of Record requirements. We support HCAI submittals with OSHPD-1/2/4/5 building classifications, SPC/NPC seismic ratings, and the documentation discipline HCAI reviewers expect.",
      },
      {
        question: "Can you renovate an occupied hospital?",
        answer: "Yes — most of our healthcare work is renovation inside operating facilities. We design ICRA 2.0-compliant infection-control phasing: containment barriers, negative-pressure construction zones, HEPA exhaust, and sequenced shutdowns that keep adjacent departments fully operational. The phasing and ICRA matrix are part of the construction documents.",
      },
      {
        question: "How fast can you deliver healthcare construction documents?",
        answer: "Speed is our operating model. Healthcare clients come to us when the clinical schedule is fixed — an OR opening date, a survey window, a CON deadline. We staff for schedule-driven delivery: early plan-review engagement, parallel workstreams across disciplines, and comment responses in days. Tell us the date the facility needs to open and we engineer backward from it.",
      },
    ],
    founderNote: founderNote,
    extraLinks: [
      { text: "MEP Engineering Services", href: "/mep-engineering/" },
      { text: "Mechanical Engineering", href: "/mechanical-engineering/" },
      { text: "Electrical Engineering", href: "/electrical-engineering/" },
      { text: "Healthcare Industry Practice", href: "/industries/healthcare/" },
      { text: "Get a Healthcare Engineering Estimate", href: "/estimate" },
    ],
  },
];
