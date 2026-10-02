// Healthcare SEO tier — generated 2026-10-02. White-hat, locally-specific content.
const founderNote = "I'm Jeremy Mills, CEO & Founder of Apex Grid Engineering and a U.S. Air Force veteran. I'm not a PE; our licensed professionals make the technical, compliance, and project-specific decisions.";

export interface HealthcareStatePage {
  slug: string; title: string; description: string; h1: string;
  directAnswer: string; answer: string;
  sections: { h2: string; body: string }[];
  faqs: { question: string; answer: string }[];
  founderNote: string;
  extraLinks: { text: string; href: string }[];
}

export const WAVE_HC_STATES: HealthcareStatePage[] = [
  {
    slug: "healthcare-design/alabama",
    title: "Hospital MEP Design in Alabama: Engineering & Plan Review",
    description: "Alabama hospital MEP engineering: ASHRAE 170 HVAC, NFPA 99 medical gas, USP 800 pharmacy design. Alabama plan-review support and schedule-driven delivery.",
    h1: "Hospital MEP Design in Alabama: Engineering & Plan Review",
    directAnswer: "Apex Grid Engineering provides hospital MEP design in Alabama — HVAC to ASHRAE 170, NFPA 99 medical gas, USP 800 pharmacy, and emergency power — for UAB Hospital in Birmingham, Huntsville Hospital in Huntsville, Baptist Health in Montgomery, with Alabama plan-review support.",
    answer: "Alabama's hospital market is anchored by UAB Hospital in Birmingham — a 1,400-bed academic giant ranked #1 in the state — with Huntsville Hospital's 881-bed regional campus serving one of the fastest-growing metros in the Southeast. Systems are expanding outpatient and surgical capacity across the Birmingham-Huntsville-Mobile triangle.\n\nHospital construction in Alabama routes through the Alabama State Health Planning and Development Agency's certificate-of-need program and the Alabama Department of Public Health's facility plan review. That review shapes the engineering from the first drawing: ventilation schedules proving every space's air changes and pressure relationships, medical gas risers with zone valves and alarms, and essential-electrical one-lines the reviewer can trace.\n\nAlabama projects pair certificate-of-need approval with practical Gulf Coast resilience: hurricane-season emergency power, flood-plain siting, and humidity control sized for long cooling seasons. Apex designs for that reality — and for the schedule. Health systems expanding in Alabama get schedule-driven delivery: early reviewer engagement, submittals built for the checklist, and comment responses in days, not weeks.",
    sections: [
      {
        h2: "Clinical-space HVAC for Alabama hospitals",
        body: "Hospital HVAC in Alabama is designed space by space to ASHRAE 170. Operating rooms hold positive pressure at 20 air changes per hour with temperature between 68 and 75 degrees and relative humidity between 20 and 60 percent, delivered through low-velocity diffuser arrays that sweep contaminants away from the sterile field. Airborne-infection isolation rooms reverse the relationship — negative pressure at 12 ACH with anterooms and continuous monitoring. At UAB Hospital in Birmingham and Huntsville Hospital in Huntsville, these pressure relationships are the first thing plan reviewers verify, and the building automation system proves them around the clock. Alabama projects pair certificate-of-need approval with practical Gulf Coast resilience: hurricane-season emergency power, flood-plain siting, and humidity control sized for long cooling seasons.",
      },
      {
        h2: "Alabama health-facility plan review, handled",
        body: "Hospital construction in Alabama routes through the Alabama State Health Planning and Development Agency's certificate-of-need program and the Alabama Department of Public Health's facility plan review. Our submittals are built for the reviewer's checklist: FGI Guidelines compliance narratives, ASHRAE 170 ventilation schedules with every space's air changes, outdoor air, pressure relationship, temperature, humidity, and filtration listed, NFPA 99 medical gas riser diagrams with zone valves and alarms, and essential-electrical one-lines showing the life safety, critical, and equipment branches. We engage the reviewer early, answer comments in days, and keep the project moving — because a health system's opening date is a clinical commitment, not a suggestion.",
      },
      {
        h2: "Surgical suites and sterile processing in Alabama",
        body: "Surgical capacity is the economic engine of Alabama hospitals — from UAB Hospital's operating rooms to ambulatory surgery centers across the state — and its MEP design is unforgiving. Each OR needs 20 total air changes per hour, positive pressure to the corridor, HEPA-filtered supply, and N+1 redundancy on the air-handling so a fan failure never cancels a case. Sterile processing departments need their own pressure cascade: decontamination negative, clean workroom positive, sterilizer rooms exhausted. Medical gas zone valves sit outside every OR suite with area alarms at the nurses' station. We design surgical MEP for the survey as well as the surgery: Joint Commission and CMS surveyors trace pressure relationships, humidity logs, and medical gas alarms on every visit.",
      },
      {
        h2: "Pharmacy, lab, and specialty spaces in Alabama",
        body: "Beyond the bed tower, Alabama health systems are building the specialty spaces that carry modern care: USP 800 hazardous-drug compounding suites with negative-pressure C-SECs at 30 air changes per hour and externally vented C-PEC hoods; USP 797 sterile compounding with ISO-classified buffer and ante areas; BSL-2 and BSL-3 laboratories with directional airflow, single-pass exhaust, and sealed penetrations; and vivarium facilities with 10 to 15 air changes per hour and tight temperature and humidity control. Each carries its own code regime — state pharmacy board, CDC biosafety, AAALAC — and each gets dedicated HVAC, monitoring, and alarming independent of the building's comfort systems.",
      },
    ],
    faqs: [
      {
        question: "Which health systems drive hospital construction in Alabama?",
        answer: "The major owners are UAB Hospital (Birmingham); Huntsville Hospital (Huntsville); Baptist Health (Montgomery); USA Health University Hospital (Mobile). We design for health-system standards as well as one-off projects, so a system's MEP criteria carry across its campuses.",
      },
      {
        question: "How does Alabama review hospital construction plans?",
        answer: "Hospital construction in Alabama routes through the Alabama State Health Planning and Development Agency's certificate-of-need program and the Alabama Department of Public Health's facility plan review. We build the submittal for that reviewer's checklist and resolve comments fast.",
      },
      {
        question: "What ventilation rates does ASHRAE 170 require?",
        answer: "ASHRAE Standard 170 sets ventilation by space type: operating rooms need 20 total air changes per hour at positive pressure, trauma rooms 15 ACH, airborne-infection isolation rooms 12 ACH at negative pressure, protective-environment rooms 12 ACH at positive pressure, and patient rooms 6 ACH with 2 ACH of outdoor air. Temperature and humidity ranges are specified per space, and the standard is enforced through state health-department plan review.",
      },
      {
        question: "How are medical gas systems designed under NFPA 99?",
        answer: "NFPA 99 categorizes health care facilities by risk (Category 1 through 4) and governs medical gas and vacuum systems accordingly: zoned piping with area zone valves outside each critical-care zone, source equipment with automatic changeover, master and area alarms at attended locations, labeled outlets, and third-party certification testing before the system goes live. The medical gas design is a dedicated plan-review item in most states.",
      },
    ],
    founderNote: founderNote,
    extraLinks: [
      { text: "Hospital MEP Engineering in Birmingham, AL", href: "/healthcare-design/alabama/birmingham/" },
      { text: "Hospital MEP Engineering in Huntsville, AL", href: "/healthcare-design/alabama/huntsville/" },
      { text: "Hospital MEP Engineering in Mobile, AL", href: "/healthcare-design/alabama/mobile/" },
      { text: "Hospital MEP Engineering in Montgomery, AL", href: "/healthcare-design/alabama/montgomery/" },
      { text: "Hospital MEP Engineering in Tuscaloosa, AL", href: "/healthcare-design/alabama/tuscaloosa/" },
      { text: "What Are ASHRAE 170 Ventilation Requirements?", href: "/answers/healthcare-ashrae-170-ventilation-requirements/" },
      { text: "How Much Does Hospital MEP Design Cost?", href: "/answers/healthcare-hospital-mep-design-cost/" },
      { text: "MEP Engineering Services", href: "/mep-engineering/" },
      { text: "Mechanical Engineering", href: "/mechanical-engineering/" },
      { text: "Electrical Engineering", href: "/electrical-engineering/" },
      { text: "Healthcare Industry Practice", href: "/industries/healthcare/" },
      { text: "Get a Healthcare Engineering Estimate", href: "/estimate" },
    ],
  },
  {
    slug: "healthcare-design/arizona",
    title: "Hospital MEP Design in Arizona: Engineering & Plan Review",
    description: "Arizona hospital MEP engineering: ASHRAE 170 HVAC, NFPA 99 medical gas, USP 800 pharmacy design. Arizona plan-review support and schedule-driven delivery.",
    h1: "Hospital MEP Design in Arizona: Engineering & Plan Review",
    directAnswer: "Apex Grid Engineering provides hospital MEP design in Arizona — HVAC to ASHRAE 170, NFPA 99 medical gas, USP 800 pharmacy, and emergency power — for Mayo Clinic Hospital in Phoenix, Banner Health in Phoenix, Dignity Health in Phoenix, with Arizona plan-review support.",
    answer: "Arizona pairs destination medicine — Mayo Clinic's Phoenix campus, ranked #1 in the state — with one of the nation's largest nonprofit systems in Banner Health. The Phoenix metro's explosive growth keeps driving new tower, MOB, and surgery-center work, while Tucson anchors southern Arizona care.\n\nArizona hospital projects are reviewed by the Arizona Department of Health Services' Bureau of Residential and Medical Facilities, with local AHJ building permits running in parallel. That review shapes the engineering from the first drawing: ventilation schedules proving every space's air changes and pressure relationships, medical gas risers with zone valves and alarms, and essential-electrical one-lines the reviewer can trace.\n\nDesert-climate engineering defines Arizona healthcare: extreme cooling loads, dust and monsoon resilience, and HVAC redundancy that holds surgical-suite conditions through 115-degree heat. Apex designs for that reality — and for the schedule. Health systems expanding in Arizona get schedule-driven delivery: early reviewer engagement, submittals built for the checklist, and comment responses in days, not weeks.",
    sections: [
      {
        h2: "Arizona health-facility plan review, handled",
        body: "Arizona hospital projects are reviewed by the Arizona Department of Health Services' Bureau of Residential and Medical Facilities, with local AHJ building permits running in parallel. Our submittals are built for the reviewer's checklist: FGI Guidelines compliance narratives, ASHRAE 170 ventilation schedules with every space's air changes, outdoor air, pressure relationship, temperature, humidity, and filtration listed, NFPA 99 medical gas riser diagrams with zone valves and alarms, and essential-electrical one-lines showing the life safety, critical, and equipment branches. We engage the reviewer early, answer comments in days, and keep the project moving — because a health system's opening date is a clinical commitment, not a suggestion.",
      },
      {
        h2: "Surgical suites and sterile processing in Arizona",
        body: "Surgical capacity is the economic engine of Arizona hospitals — from Mayo Clinic Hospital's operating rooms to ambulatory surgery centers across the state — and its MEP design is unforgiving. Each OR needs 20 total air changes per hour, positive pressure to the corridor, HEPA-filtered supply, and N+1 redundancy on the air-handling so a fan failure never cancels a case. Sterile processing departments need their own pressure cascade: decontamination negative, clean workroom positive, sterilizer rooms exhausted. Medical gas zone valves sit outside every OR suite with area alarms at the nurses' station. We design surgical MEP for the survey as well as the surgery: Joint Commission and CMS surveyors trace pressure relationships, humidity logs, and medical gas alarms on every visit.",
      },
      {
        h2: "Pharmacy, lab, and specialty spaces in Arizona",
        body: "Beyond the bed tower, Arizona health systems are building the specialty spaces that carry modern care: USP 800 hazardous-drug compounding suites with negative-pressure C-SECs at 30 air changes per hour and externally vented C-PEC hoods; USP 797 sterile compounding with ISO-classified buffer and ante areas; BSL-2 and BSL-3 laboratories with directional airflow, single-pass exhaust, and sealed penetrations; and vivarium facilities with 10 to 15 air changes per hour and tight temperature and humidity control. Each carries its own code regime — state pharmacy board, CDC biosafety, AAALAC — and each gets dedicated HVAC, monitoring, and alarming independent of the building's comfort systems.",
      },
      {
        h2: "Renovating occupied Arizona hospitals",
        body: "Most Arizona hospital work is renovation inside fully operational buildings — a new OR at Mayo Clinic Hospital, an ED expansion, a pharmacy brought up to USP 800. Our construction documents carry ICRA 2.0 infection-control risk assessments matched to the work: Class I through V precautions, dust-tight barriers with negative-pressure containment, HEPA-filtered exhaust, sealed penetrations, and traffic patterns that keep construction crews out of patient corridors. Shutdowns are sequenced — med gas, normal power, HVAC — with temporary systems bridging every outage and life-safety maintained throughout. The facility's infection preventionist approves the ICRA plan before work starts because it is on the drawings, not in a memo afterward.",
      },
    ],
    faqs: [
      {
        question: "Which health systems drive hospital construction in Arizona?",
        answer: "The major owners are Mayo Clinic Hospital (Phoenix); Banner Health (Phoenix); Dignity Health (Phoenix); Valleywise Health (Phoenix). We design for health-system standards as well as one-off projects, so a system's MEP criteria carry across its campuses.",
      },
      {
        question: "How does Arizona review hospital construction plans?",
        answer: "Arizona hospital projects are reviewed by the Arizona Department of Health Services' Bureau of Residential and Medical Facilities, with local AHJ building permits running in parallel. We build the submittal for that reviewer's checklist and resolve comments fast.",
      },
      {
        question: "What is USP 800 and which facilities need it?",
        answer: "USP General Chapter 800 governs the handling of hazardous drugs in healthcare settings. Facilities that compound or handle hazardous drugs — hospital pharmacies, oncology infusion pharmacies, veterinary compounding — need a containment suite: a negative-pressure secondary engineering control (C-SEC) at -0.01 to -0.03 inches water column, externally vented primary controls (C-PEC), 30 air changes per hour, and strict temperature and humidity control. State boards of pharmacy enforce it.",
      },
      {
        question: "How much does hospital MEP engineering cost?",
        answer: "Hospital MEP engineering fees typically run 6 to 10 percent of the MEP construction value. Since MEP systems represent 30 to 45 percent of total hospital construction — and new acute-care hospitals cost $600 to over $1,000 per square foot — engineering fees generally land in the range of $15 to $45 per square foot, with surgical suites, isolation, pharmacy, and lab spaces commanding the high end.",
      },
    ],
    founderNote: founderNote,
    extraLinks: [
      { text: "Hospital MEP Engineering in Phoenix, AZ", href: "/healthcare-design/arizona/phoenix/" },
      { text: "Hospital MEP Engineering in Tucson, AZ", href: "/healthcare-design/arizona/tucson/" },
      { text: "Hospital MEP Engineering in Mesa, AZ", href: "/healthcare-design/arizona/mesa/" },
      { text: "Hospital MEP Engineering in Scottsdale, AZ", href: "/healthcare-design/arizona/scottsdale/" },
      { text: "Hospital MEP Engineering in Chandler, AZ", href: "/healthcare-design/arizona/chandler/" },
      { text: "Hospital MEP Engineering in Glendale, AZ", href: "/healthcare-design/arizona/glendale/" },
      { text: "What Are ASHRAE 170 Ventilation Requirements?", href: "/answers/healthcare-ashrae-170-ventilation-requirements/" },
      { text: "How Much Does Hospital MEP Design Cost?", href: "/answers/healthcare-hospital-mep-design-cost/" },
      { text: "MEP Engineering Services", href: "/mep-engineering/" },
      { text: "Mechanical Engineering", href: "/mechanical-engineering/" },
      { text: "Electrical Engineering", href: "/electrical-engineering/" },
      { text: "Healthcare Industry Practice", href: "/industries/healthcare/" },
      { text: "Get a Healthcare Engineering Estimate", href: "/estimate" },
    ],
  },
  {
    slug: "healthcare-design/arkansas",
    title: "Hospital MEP Design in Arkansas: Engineering & Plan Review",
    description: "Arkansas hospital MEP engineering: ASHRAE 170 HVAC, NFPA 99 medical gas, USP 800 pharmacy design. Arkansas plan-review support and schedule-driven delivery.",
    h1: "Hospital MEP Design in Arkansas: Engineering & Plan Review",
    directAnswer: "Apex Grid Engineering provides hospital MEP design in Arkansas — HVAC to ASHRAE 170, NFPA 99 medical gas, USP 800 pharmacy, and emergency power — for Baptist Health Medical Center in Little Rock, UAMS Medical Center in Little Rock, Washington Regional Medical Center in Fayetteville, with Arkansas plan-review support.",
    answer: "Arkansas healthcare centers on Little Rock — Baptist Health's 827-bed flagship, the UAMS academic campus with the state's only adult Level 1 trauma center, and Arkansas Children's — while northwest Arkansas (Fayetteville, anchored by the state's #1-ranked Washington Regional) grows with the Walmart/Tyson/J.B. Hunt corridor.\n\nHospital construction in Arkansas is reviewed by the Arkansas Department of Health's facility services section, with the state fire marshal reviewing life-safety systems. That review shapes the engineering from the first drawing: ventilation schedules proving every space's air changes and pressure relationships, medical gas risers with zone valves and alarms, and essential-electrical one-lines the reviewer can trace.\n\nArkansas projects balance academic-medical-center complexity in Little Rock with fast-growing northwest Arkansas outpatient and MOB work serving a booming corporate corridor. Apex designs for that reality — and for the schedule. Health systems expanding in Arkansas get schedule-driven delivery: early reviewer engagement, submittals built for the checklist, and comment responses in days, not weeks.",
    sections: [
      {
        h2: "Surgical suites and sterile processing in Arkansas",
        body: "Surgical capacity is the economic engine of Arkansas hospitals — from Baptist Health Medical Center's operating rooms to ambulatory surgery centers across the state — and its MEP design is unforgiving. Each OR needs 20 total air changes per hour, positive pressure to the corridor, HEPA-filtered supply, and N+1 redundancy on the air-handling so a fan failure never cancels a case. Sterile processing departments need their own pressure cascade: decontamination negative, clean workroom positive, sterilizer rooms exhausted. Medical gas zone valves sit outside every OR suite with area alarms at the nurses' station. We design surgical MEP for the survey as well as the surgery: Joint Commission and CMS surveyors trace pressure relationships, humidity logs, and medical gas alarms on every visit.",
      },
      {
        h2: "Pharmacy, lab, and specialty spaces in Arkansas",
        body: "Beyond the bed tower, Arkansas health systems are building the specialty spaces that carry modern care: USP 800 hazardous-drug compounding suites with negative-pressure C-SECs at 30 air changes per hour and externally vented C-PEC hoods; USP 797 sterile compounding with ISO-classified buffer and ante areas; BSL-2 and BSL-3 laboratories with directional airflow, single-pass exhaust, and sealed penetrations; and vivarium facilities with 10 to 15 air changes per hour and tight temperature and humidity control. Each carries its own code regime — state pharmacy board, CDC biosafety, AAALAC — and each gets dedicated HVAC, monitoring, and alarming independent of the building's comfort systems.",
      },
      {
        h2: "Renovating occupied Arkansas hospitals",
        body: "Most Arkansas hospital work is renovation inside fully operational buildings — a new OR at Baptist Health Medical Center, an ED expansion, a pharmacy brought up to USP 800. Our construction documents carry ICRA 2.0 infection-control risk assessments matched to the work: Class I through V precautions, dust-tight barriers with negative-pressure containment, HEPA-filtered exhaust, sealed penetrations, and traffic patterns that keep construction crews out of patient corridors. Shutdowns are sequenced — med gas, normal power, HVAC — with temporary systems bridging every outage and life-safety maintained throughout. The facility's infection preventionist approves the ICRA plan before work starts because it is on the drawings, not in a memo afterward.",
      },
      {
        h2: "Emergency power and medical gas across Arkansas",
        body: "Every Arkansas hospital depends on systems patients never see. The essential electrical system — life safety, critical, and equipment branches per NFPA 99 — rides on generators that start within 10 seconds, with selective coordination, load-shed sequencing, and monthly NFPA 110 testing baked into the design. Medical gas piping runs zoned and alarmed: oxygen, medical air, nitrous oxide, vacuum, and waste anesthetic gas with area zone valves outside each critical-care zone and master alarms where staff always watch. Arkansas projects balance academic-medical-center complexity in Little Rock with fast-growing northwest Arkansas outpatient and MOB work serving a booming corporate corridor.",
      },
    ],
    faqs: [
      {
        question: "Which health systems drive hospital construction in Arkansas?",
        answer: "The major owners are Baptist Health Medical Center (Little Rock); UAMS Medical Center (Little Rock); Washington Regional Medical Center (Fayetteville); CHI St. Vincent Infirmary (Little Rock). We design for health-system standards as well as one-off projects, so a system's MEP criteria carry across its campuses.",
      },
      {
        question: "How does Arkansas review hospital construction plans?",
        answer: "Hospital construction in Arkansas is reviewed by the Arkansas Department of Health's facility services section, with the state fire marshal reviewing life-safety systems. We build the submittal for that reviewer's checklist and resolve comments fast.",
      },
      {
        question: "What does ICRA require during hospital renovation?",
        answer: "The ICRA 2.0 process classifies construction activity (Type A through D) and patient risk groups, then assigns precautions Class I through V: dust-tight barriers, negative-pressure containment with HEPA-filtered exhaust, sealed penetrations, debris handling in covered containers, and traffic patterns separated from patient care. The ICRA matrix and barrier plan belong in the construction documents for plan review and the facility's infection preventionist.",
      },
      {
        question: "How long does healthcare plan review take?",
        answer: "It depends on the state. Standard health-department facility review runs 4 to 12 weeks in most states; California HCAI review runs longer with its seismic program; certificate-of-need states add months before design review even begins. We compress the timeline with early AHJ engagement, submittals built for the reviewer's checklist, and comment responses turned in days.",
      },
    ],
    founderNote: founderNote,
    extraLinks: [
      { text: "Hospital MEP Engineering in Little Rock, AR", href: "/healthcare-design/arkansas/little-rock/" },
      { text: "Hospital MEP Engineering in Fayetteville, AR", href: "/healthcare-design/arkansas/fayetteville/" },
      { text: "Hospital MEP Engineering in Springdale, AR", href: "/healthcare-design/arkansas/springdale/" },
      { text: "Hospital MEP Engineering in Fort Smith, AR", href: "/healthcare-design/arkansas/fort-smith/" },
      { text: "Hospital MEP Engineering in Jonesboro, AR", href: "/healthcare-design/arkansas/jonesboro/" },
      { text: "Hospital MEP Engineering in Conway, AR", href: "/healthcare-design/arkansas/conway/" },
      { text: "What Are ASHRAE 170 Ventilation Requirements?", href: "/answers/healthcare-ashrae-170-ventilation-requirements/" },
      { text: "How Much Does Hospital MEP Design Cost?", href: "/answers/healthcare-hospital-mep-design-cost/" },
      { text: "MEP Engineering Services", href: "/mep-engineering/" },
      { text: "Mechanical Engineering", href: "/mechanical-engineering/" },
      { text: "Electrical Engineering", href: "/electrical-engineering/" },
      { text: "Healthcare Industry Practice", href: "/industries/healthcare/" },
      { text: "Get a Healthcare Engineering Estimate", href: "/estimate" },
    ],
  },
  {
    slug: "healthcare-design/california",
    title: "Hospital MEP Design in California: Engineering & Plan Review",
    description: "California hospital MEP engineering: ASHRAE 170 HVAC, NFPA 99 medical gas, USP 800 pharmacy design. California plan-review support and schedule-driven delivery.",
    h1: "Hospital MEP Design in California: Engineering & Plan Review",
    directAnswer: "Apex Grid Engineering provides hospital MEP design in California — HVAC to ASHRAE 170, NFPA 99 medical gas, USP 800 pharmacy, and emergency power — for Cedars-Sinai Medical Center in Los Angeles, UCLA Medical Center in Los Angeles, UCSF Medical Center in San Francisco, with California plan-review support.",
    answer: "California is the most regulated and most seismic-driven hospital market in the country: four U.S. News #1 (tie) academic flagships — Cedars-Sinai, UCLA, UCSF, Stanford — plus Kaiser Permanente's vast integrated network. HCAI's seismic compliance program shapes every acute-care project in the state.\n\nCalifornia hospital construction is uniquely governed by HCAI (the Department of Health Care Access and Information, formerly OSHPD), which runs its own seismic-compliance plan review and field inspection program — separate from the local building department. That review shapes the engineering from the first drawing: ventilation schedules proving every space's air changes and pressure relationships, medical gas risers with zone valves and alarms, and essential-electrical one-lines the reviewer can trace.\n\nHCAI (ex-OSHPD) seismic compliance is the defining California challenge: SPC/NPC ratings, OSHPD-1/2/4/5 building classifications, and a dedicated plan-review and inspection track no other state requires. Apex designs for that reality — and for the schedule. Health systems expanding in California get schedule-driven delivery: early reviewer engagement, submittals built for the checklist, and comment responses in days, not weeks.",
    sections: [
      {
        h2: "Pharmacy, lab, and specialty spaces in California",
        body: "Beyond the bed tower, California health systems are building the specialty spaces that carry modern care: USP 800 hazardous-drug compounding suites with negative-pressure C-SECs at 30 air changes per hour and externally vented C-PEC hoods; USP 797 sterile compounding with ISO-classified buffer and ante areas; BSL-2 and BSL-3 laboratories with directional airflow, single-pass exhaust, and sealed penetrations; and vivarium facilities with 10 to 15 air changes per hour and tight temperature and humidity control. Each carries its own code regime — state pharmacy board, CDC biosafety, AAALAC — and each gets dedicated HVAC, monitoring, and alarming independent of the building's comfort systems.",
      },
      {
        h2: "Renovating occupied California hospitals",
        body: "Most California hospital work is renovation inside fully operational buildings — a new OR at Cedars-Sinai Medical Center, an ED expansion, a pharmacy brought up to USP 800. Our construction documents carry ICRA 2.0 infection-control risk assessments matched to the work: Class I through V precautions, dust-tight barriers with negative-pressure containment, HEPA-filtered exhaust, sealed penetrations, and traffic patterns that keep construction crews out of patient corridors. Shutdowns are sequenced — med gas, normal power, HVAC — with temporary systems bridging every outage and life-safety maintained throughout. The facility's infection preventionist approves the ICRA plan before work starts because it is on the drawings, not in a memo afterward.",
      },
      {
        h2: "Emergency power and medical gas across California",
        body: "Every California hospital depends on systems patients never see. The essential electrical system — life safety, critical, and equipment branches per NFPA 99 — rides on generators that start within 10 seconds, with selective coordination, load-shed sequencing, and monthly NFPA 110 testing baked into the design. Medical gas piping runs zoned and alarmed: oxygen, medical air, nitrous oxide, vacuum, and waste anesthetic gas with area zone valves outside each critical-care zone and master alarms where staff always watch. HCAI (ex-OSHPD) seismic compliance is the defining California challenge: SPC/NPC ratings, OSHPD-1/2/4/5 building classifications, and a dedicated plan-review and inspection track no other state requires.",
      },
      {
        h2: "Clinical-space HVAC for California hospitals",
        body: "Hospital HVAC in California is designed space by space to ASHRAE 170. Operating rooms hold positive pressure at 20 air changes per hour with temperature between 68 and 75 degrees and relative humidity between 20 and 60 percent, delivered through low-velocity diffuser arrays that sweep contaminants away from the sterile field. Airborne-infection isolation rooms reverse the relationship — negative pressure at 12 ACH with anterooms and continuous monitoring. At Cedars-Sinai Medical Center in Los Angeles and UCLA Medical Center in Los Angeles, these pressure relationships are the first thing plan reviewers verify, and the building automation system proves them around the clock. HCAI (ex-OSHPD) seismic compliance is the defining California challenge: SPC/NPC ratings, OSHPD-1/2/4/5 building classifications, and a dedicated plan-review and inspection track no other state requires.",
      },
    ],
    faqs: [
      {
        question: "Which health systems drive hospital construction in California?",
        answer: "The major owners are Cedars-Sinai Medical Center (Los Angeles); UCLA Medical Center (Los Angeles); UCSF Medical Center (San Francisco); Stanford Hospital (Palo Alto). We design for health-system standards as well as one-off projects, so a system's MEP criteria carry across its campuses.",
      },
      {
        question: "How does California review hospital construction plans?",
        answer: "California hospital construction is uniquely governed by HCAI (the Department of Health Care Access and Information, formerly OSHPD), which runs its own seismic-compliance plan review and field inspection program — separate from the local building department. We build the submittal for that reviewer's checklist and resolve comments fast.",
      },
      {
        question: "What emergency power do hospitals require?",
        answer: "Hospitals require an essential electrical system per NFPA 99: life safety, critical, and equipment branches served by on-site generators that start and assume load within 10 seconds of a normal-power failure. NFPA 110 governs the generator installation, fuel supply, and monthly testing. Critical branch loads — ORs, ICUs, emergency departments — transfer automatically; the design must prove selective coordination and load-shed sequencing.",
      },
      {
        question: "What pressure relationships do hospital rooms need?",
        answer: "Operating rooms and protective-environment rooms run positive to adjacent spaces to keep contaminants out; airborne-infection isolation rooms, USP 800 compounding rooms, and soiled utility rooms run negative to contain contaminants. Anterooms buffer the transition. Each relationship is continuously monitored and alarmed through the building automation system, and the pressure map is part of the plan-review submittal.",
      },
    ],
    founderNote: founderNote,
    extraLinks: [
      { text: "Hospital MEP Engineering in Los Angeles, CA", href: "/healthcare-design/california/los-angeles/" },
      { text: "Hospital MEP Engineering in San Francisco, CA", href: "/healthcare-design/california/san-francisco/" },
      { text: "Hospital MEP Engineering in San Diego, CA", href: "/healthcare-design/california/san-diego/" },
      { text: "Hospital MEP Engineering in Sacramento, CA", href: "/healthcare-design/california/sacramento/" },
      { text: "Hospital MEP Engineering in Palo Alto, CA", href: "/healthcare-design/california/palo-alto/" },
      { text: "Hospital MEP Engineering in Irvine, CA", href: "/healthcare-design/california/irvine/" },
      { text: "Hospital MEP Engineering in Fresno, CA", href: "/healthcare-design/california/fresno/" },
      { text: "What Are ASHRAE 170 Ventilation Requirements?", href: "/answers/healthcare-ashrae-170-ventilation-requirements/" },
      { text: "How Much Does Hospital MEP Design Cost?", href: "/answers/healthcare-hospital-mep-design-cost/" },
      { text: "MEP Engineering Services", href: "/mep-engineering/" },
      { text: "Mechanical Engineering", href: "/mechanical-engineering/" },
      { text: "Electrical Engineering", href: "/electrical-engineering/" },
      { text: "Healthcare Industry Practice", href: "/industries/healthcare/" },
      { text: "Get a Healthcare Engineering Estimate", href: "/estimate" },
    ],
  },
  {
    slug: "healthcare-design/colorado",
    title: "Hospital MEP Design in Colorado: Engineering & Plan Review",
    description: "Colorado hospital MEP engineering: ASHRAE 170 HVAC, NFPA 99 medical gas, USP 800 pharmacy design. Colorado plan-review support and schedule-driven delivery.",
    h1: "Hospital MEP Design in Colorado: Engineering & Plan Review",
    directAnswer: "Apex Grid Engineering provides hospital MEP design in Colorado — HVAC to ASHRAE 170, NFPA 99 medical gas, USP 800 pharmacy, and emergency power — for UCHealth University of Colorado Hospital in Aurora, UCHealth in Aurora, AdventHealth in Altamonte Springs, with Colorado plan-review support.",
    answer: "Colorado healthcare orbits the Anschutz Medical Campus in Aurora — UCHealth University of Colorado Hospital (#1 in the state) and Children's Hospital Colorado — with Denver Health as the public trauma anchor and AdventHealth operating the former Centura footprint statewide.\n\nColorado hospital projects are reviewed by the Colorado Department of Public Health and Environment's health facilities division, alongside local building department permits. That review shapes the engineering from the first drawing: ventilation schedules proving every space's air changes and pressure relationships, medical gas risers with zone valves and alarms, and essential-electrical one-lines the reviewer can trace.\n\nHigh-altitude and snow-country design: pressurization and ventilation at 5,000+ feet, snow-load and freeze protection for rooftop equipment, and wildfire-smoke filtration becoming standard in air-handling design. Apex designs for that reality — and for the schedule. Health systems expanding in Colorado get schedule-driven delivery: early reviewer engagement, submittals built for the checklist, and comment responses in days, not weeks.",
    sections: [
      {
        h2: "Renovating occupied Colorado hospitals",
        body: "Most Colorado hospital work is renovation inside fully operational buildings — a new OR at UCHealth University of Colorado Hospital, an ED expansion, a pharmacy brought up to USP 800. Our construction documents carry ICRA 2.0 infection-control risk assessments matched to the work: Class I through V precautions, dust-tight barriers with negative-pressure containment, HEPA-filtered exhaust, sealed penetrations, and traffic patterns that keep construction crews out of patient corridors. Shutdowns are sequenced — med gas, normal power, HVAC — with temporary systems bridging every outage and life-safety maintained throughout. The facility's infection preventionist approves the ICRA plan before work starts because it is on the drawings, not in a memo afterward.",
      },
      {
        h2: "Emergency power and medical gas across Colorado",
        body: "Every Colorado hospital depends on systems patients never see. The essential electrical system — life safety, critical, and equipment branches per NFPA 99 — rides on generators that start within 10 seconds, with selective coordination, load-shed sequencing, and monthly NFPA 110 testing baked into the design. Medical gas piping runs zoned and alarmed: oxygen, medical air, nitrous oxide, vacuum, and waste anesthetic gas with area zone valves outside each critical-care zone and master alarms where staff always watch. High-altitude and snow-country design: pressurization and ventilation at 5,000+ feet, snow-load and freeze protection for rooftop equipment, and wildfire-smoke filtration becoming standard in air-handling design.",
      },
      {
        h2: "Clinical-space HVAC for Colorado hospitals",
        body: "Hospital HVAC in Colorado is designed space by space to ASHRAE 170. Operating rooms hold positive pressure at 20 air changes per hour with temperature between 68 and 75 degrees and relative humidity between 20 and 60 percent, delivered through low-velocity diffuser arrays that sweep contaminants away from the sterile field. Airborne-infection isolation rooms reverse the relationship — negative pressure at 12 ACH with anterooms and continuous monitoring. At UCHealth University of Colorado Hospital in Aurora and UCHealth in Aurora, these pressure relationships are the first thing plan reviewers verify, and the building automation system proves them around the clock. High-altitude and snow-country design: pressurization and ventilation at 5,000+ feet, snow-load and freeze protection for rooftop equipment, and wildfire-smoke filtration becoming standard in air-handling design.",
      },
      {
        h2: "Colorado health-facility plan review, handled",
        body: "Colorado hospital projects are reviewed by the Colorado Department of Public Health and Environment's health facilities division, alongside local building department permits. Our submittals are built for the reviewer's checklist: FGI Guidelines compliance narratives, ASHRAE 170 ventilation schedules with every space's air changes, outdoor air, pressure relationship, temperature, humidity, and filtration listed, NFPA 99 medical gas riser diagrams with zone valves and alarms, and essential-electrical one-lines showing the life safety, critical, and equipment branches. We engage the reviewer early, answer comments in days, and keep the project moving — because a health system's opening date is a clinical commitment, not a suggestion.",
      },
    ],
    faqs: [
      {
        question: "Which health systems drive hospital construction in Colorado?",
        answer: "The major owners are UCHealth University of Colorado Hospital (Aurora); UCHealth (Aurora); AdventHealth (Altamonte Springs); Children's Hospital Colorado (Aurora). We design for health-system standards as well as one-off projects, so a system's MEP criteria carry across its campuses.",
      },
      {
        question: "How does Colorado review hospital construction plans?",
        answer: "Colorado hospital projects are reviewed by the Colorado Department of Public Health and Environment's health facilities division, alongside local building department permits. We build the submittal for that reviewer's checklist and resolve comments fast.",
      },
      {
        question: "What ventilation rates does ASHRAE 170 require?",
        answer: "ASHRAE Standard 170 sets ventilation by space type: operating rooms need 20 total air changes per hour at positive pressure, trauma rooms 15 ACH, airborne-infection isolation rooms 12 ACH at negative pressure, protective-environment rooms 12 ACH at positive pressure, and patient rooms 6 ACH with 2 ACH of outdoor air. Temperature and humidity ranges are specified per space, and the standard is enforced through state health-department plan review.",
      },
      {
        question: "How are medical gas systems designed under NFPA 99?",
        answer: "NFPA 99 categorizes health care facilities by risk (Category 1 through 4) and governs medical gas and vacuum systems accordingly: zoned piping with area zone valves outside each critical-care zone, source equipment with automatic changeover, master and area alarms at attended locations, labeled outlets, and third-party certification testing before the system goes live. The medical gas design is a dedicated plan-review item in most states.",
      },
    ],
    founderNote: founderNote,
    extraLinks: [
      { text: "Hospital MEP Engineering in Denver, CO", href: "/healthcare-design/colorado/denver/" },
      { text: "Hospital MEP Engineering in Aurora, CO", href: "/healthcare-design/colorado/aurora/" },
      { text: "Hospital MEP Engineering in Colorado Springs, CO", href: "/healthcare-design/colorado/colorado-springs/" },
      { text: "Hospital MEP Engineering in Fort Collins, CO", href: "/healthcare-design/colorado/fort-collins/" },
      { text: "Hospital MEP Engineering in Boulder, CO", href: "/healthcare-design/colorado/boulder/" },
      { text: "Hospital MEP Engineering in Grand Junction, CO", href: "/healthcare-design/colorado/grand-junction/" },
      { text: "What Are ASHRAE 170 Ventilation Requirements?", href: "/answers/healthcare-ashrae-170-ventilation-requirements/" },
      { text: "How Much Does Hospital MEP Design Cost?", href: "/answers/healthcare-hospital-mep-design-cost/" },
      { text: "MEP Engineering Services", href: "/mep-engineering/" },
      { text: "Mechanical Engineering", href: "/mechanical-engineering/" },
      { text: "Electrical Engineering", href: "/electrical-engineering/" },
      { text: "Healthcare Industry Practice", href: "/industries/healthcare/" },
      { text: "Get a Healthcare Engineering Estimate", href: "/estimate" },
    ],
  },
  {
    slug: "healthcare-design/connecticut",
    title: "Hospital MEP Design in Connecticut: Engineering & Plan Review",
    description: "Connecticut hospital MEP engineering: ASHRAE 170 HVAC, NFPA 99 medical gas, USP 800 pharmacy design. CT plan-review support and schedule-driven MEP delivery.",
    h1: "Hospital MEP Design in Connecticut: Engineering & Plan Review",
    directAnswer: "Apex Grid Engineering provides hospital MEP design in Connecticut — HVAC to ASHRAE 170, NFPA 99 medical gas, USP 800 pharmacy, and emergency power — for Yale New Haven Hospital in New Haven, Hartford Hospital in Hartford, Hartford HealthCare in Hartford, with Connecticut plan-review support.",
    answer: "Connecticut is a two-pole market: Yale New Haven's 1,541-bed academic giant (#1 in the state) and Hartford HealthCare's statewide network anchored by the 867-bed Hartford Hospital. Fairfield County feeds the New York metro market while the Hartford-New Haven corridor drives academic and specialty growth.\n\nConnecticut hospital projects require certificate-of-need approval through the Office of Health Strategy (OHS), plus Department of Public Health facility review. That review shapes the engineering from the first drawing: ventilation schedules proving every space's air changes and pressure relationships, medical gas risers with zone valves and alarms, and essential-electrical one-lines the reviewer can trace.\n\nConnecticut's OHS certificate-of-need process means healthcare design starts with regulatory strategy — aligning clinical program, bed need, and facility plan before drawings begin. Apex designs for that reality — and for the schedule. Health systems expanding in Connecticut get schedule-driven delivery: early reviewer engagement, submittals built for the checklist, and comment responses in days, not weeks.",
    sections: [
      {
        h2: "Emergency power and medical gas across Connecticut",
        body: "Every Connecticut hospital depends on systems patients never see. The essential electrical system — life safety, critical, and equipment branches per NFPA 99 — rides on generators that start within 10 seconds, with selective coordination, load-shed sequencing, and monthly NFPA 110 testing baked into the design. Medical gas piping runs zoned and alarmed: oxygen, medical air, nitrous oxide, vacuum, and waste anesthetic gas with area zone valves outside each critical-care zone and master alarms where staff always watch. Connecticut's OHS certificate-of-need process means healthcare design starts with regulatory strategy — aligning clinical program, bed need, and facility plan before drawings begin.",
      },
      {
        h2: "Clinical-space HVAC for Connecticut hospitals",
        body: "Hospital HVAC in Connecticut is designed space by space to ASHRAE 170. Operating rooms hold positive pressure at 20 air changes per hour with temperature between 68 and 75 degrees and relative humidity between 20 and 60 percent, delivered through low-velocity diffuser arrays that sweep contaminants away from the sterile field. Airborne-infection isolation rooms reverse the relationship — negative pressure at 12 ACH with anterooms and continuous monitoring. At Yale New Haven Hospital in New Haven and Hartford Hospital in Hartford, these pressure relationships are the first thing plan reviewers verify, and the building automation system proves them around the clock. Connecticut's OHS certificate-of-need process means healthcare design starts with regulatory strategy — aligning clinical program, bed need, and facility plan before drawings begin.",
      },
      {
        h2: "Connecticut health-facility plan review, handled",
        body: "Connecticut hospital projects require certificate-of-need approval through the Office of Health Strategy (OHS), plus Department of Public Health facility review. Our submittals are built for the reviewer's checklist: FGI Guidelines compliance narratives, ASHRAE 170 ventilation schedules with every space's air changes, outdoor air, pressure relationship, temperature, humidity, and filtration listed, NFPA 99 medical gas riser diagrams with zone valves and alarms, and essential-electrical one-lines showing the life safety, critical, and equipment branches. We engage the reviewer early, answer comments in days, and keep the project moving — because a health system's opening date is a clinical commitment, not a suggestion.",
      },
      {
        h2: "Surgical suites and sterile processing in Connecticut",
        body: "Surgical capacity is the economic engine of Connecticut hospitals — from Yale New Haven Hospital's operating rooms to ambulatory surgery centers across the state — and its MEP design is unforgiving. Each OR needs 20 total air changes per hour, positive pressure to the corridor, HEPA-filtered supply, and N+1 redundancy on the air-handling so a fan failure never cancels a case. Sterile processing departments need their own pressure cascade: decontamination negative, clean workroom positive, sterilizer rooms exhausted. Medical gas zone valves sit outside every OR suite with area alarms at the nurses' station. We design surgical MEP for the survey as well as the surgery: Joint Commission and CMS surveyors trace pressure relationships, humidity logs, and medical gas alarms on every visit.",
      },
    ],
    faqs: [
      {
        question: "Which health systems drive hospital construction in Connecticut?",
        answer: "The major owners are Yale New Haven Hospital (New Haven); Hartford Hospital (Hartford); Hartford HealthCare (Hartford); Yale New Haven Health (New Haven). We design for health-system standards as well as one-off projects, so a system's MEP criteria carry across its campuses.",
      },
      {
        question: "How does Connecticut review hospital construction plans?",
        answer: "Connecticut hospital projects require certificate-of-need approval through the Office of Health Strategy (OHS), plus Department of Public Health facility review. We build the submittal for that reviewer's checklist and resolve comments fast.",
      },
      {
        question: "What is USP 800 and which facilities need it?",
        answer: "USP General Chapter 800 governs the handling of hazardous drugs in healthcare settings. Facilities that compound or handle hazardous drugs — hospital pharmacies, oncology infusion pharmacies, veterinary compounding — need a containment suite: a negative-pressure secondary engineering control (C-SEC) at -0.01 to -0.03 inches water column, externally vented primary controls (C-PEC), 30 air changes per hour, and strict temperature and humidity control. State boards of pharmacy enforce it.",
      },
      {
        question: "How much does hospital MEP engineering cost?",
        answer: "Hospital MEP engineering fees typically run 6 to 10 percent of the MEP construction value. Since MEP systems represent 30 to 45 percent of total hospital construction — and new acute-care hospitals cost $600 to over $1,000 per square foot — engineering fees generally land in the range of $15 to $45 per square foot, with surgical suites, isolation, pharmacy, and lab spaces commanding the high end.",
      },
    ],
    founderNote: founderNote,
    extraLinks: [
      { text: "Hospital MEP Engineering in New Haven, CT", href: "/healthcare-design/connecticut/new-haven/" },
      { text: "Hospital MEP Engineering in Hartford, CT", href: "/healthcare-design/connecticut/hartford/" },
      { text: "Hospital MEP Engineering in Stamford, CT", href: "/healthcare-design/connecticut/stamford/" },
      { text: "Hospital MEP Engineering in Bridgeport, CT", href: "/healthcare-design/connecticut/bridgeport/" },
      { text: "Hospital MEP Engineering in Waterbury, CT", href: "/healthcare-design/connecticut/waterbury/" },
      { text: "Hospital MEP Engineering in New London, CT", href: "/healthcare-design/connecticut/new-london/" },
      { text: "What Are ASHRAE 170 Ventilation Requirements?", href: "/answers/healthcare-ashrae-170-ventilation-requirements/" },
      { text: "How Much Does Hospital MEP Design Cost?", href: "/answers/healthcare-hospital-mep-design-cost/" },
      { text: "MEP Engineering Services", href: "/mep-engineering/" },
      { text: "Mechanical Engineering", href: "/mechanical-engineering/" },
      { text: "Electrical Engineering", href: "/electrical-engineering/" },
      { text: "Healthcare Industry Practice", href: "/industries/healthcare/" },
      { text: "Get a Healthcare Engineering Estimate", href: "/estimate" },
    ],
  },
  {
    slug: "healthcare-design/delaware",
    title: "Hospital MEP Design in Delaware: Engineering & Plan Review",
    description: "Delaware hospital MEP engineering: ASHRAE 170 HVAC, NFPA 99 medical gas, USP 800 pharmacy design. Delaware plan-review support and schedule-driven delivery.",
    h1: "Hospital MEP Design in Delaware: Engineering & Plan Review",
    directAnswer: "Apex Grid Engineering provides hospital MEP design in Delaware — HVAC to ASHRAE 170, NFPA 99 medical gas, USP 800 pharmacy, and emergency power — for ChristianaCare in Newark, Bayhealth in Dover, Beebe Healthcare in Lewes, with Delaware plan-review support.",
    answer: "Delaware's small market is dominated by ChristianaCare — 1,100 beds, the state's only Level I trauma center, and its #1-ranked hospital — with Bayhealth covering the fast-growing central and southern counties and Beebe anchoring the beach communities.\n\nDelaware hospital construction is reviewed by the Delaware Health Resources Board's facility review process and the Division of Public Health, with local building permits in parallel. That review shapes the engineering from the first drawing: ventilation schedules proving every space's air changes and pressure relationships, medical gas risers with zone valves and alarms, and essential-electrical one-lines the reviewer can trace.\n\nSmall-state, high-growth dynamics: Sussex County's beach-driven population surge is pushing Bayhealth and Beebe expansions where MOB, surgery-center, and emergency-department capacity lead the work. Apex designs for that reality — and for the schedule. Health systems expanding in Delaware get schedule-driven delivery: early reviewer engagement, submittals built for the checklist, and comment responses in days, not weeks.",
    sections: [
      {
        h2: "Clinical-space HVAC for Delaware hospitals",
        body: "Hospital HVAC in Delaware is designed space by space to ASHRAE 170. Operating rooms hold positive pressure at 20 air changes per hour with temperature between 68 and 75 degrees and relative humidity between 20 and 60 percent, delivered through low-velocity diffuser arrays that sweep contaminants away from the sterile field. Airborne-infection isolation rooms reverse the relationship — negative pressure at 12 ACH with anterooms and continuous monitoring. At ChristianaCare in Newark and Bayhealth in Dover, these pressure relationships are the first thing plan reviewers verify, and the building automation system proves them around the clock. Small-state, high-growth dynamics: Sussex County's beach-driven population surge is pushing Bayhealth and Beebe expansions where MOB, surgery-center, and emergency-department capacity lead the work.",
      },
      {
        h2: "Delaware health-facility plan review, handled",
        body: "Delaware hospital construction is reviewed by the Delaware Health Resources Board's facility review process and the Division of Public Health, with local building permits in parallel. Our submittals are built for the reviewer's checklist: FGI Guidelines compliance narratives, ASHRAE 170 ventilation schedules with every space's air changes, outdoor air, pressure relationship, temperature, humidity, and filtration listed, NFPA 99 medical gas riser diagrams with zone valves and alarms, and essential-electrical one-lines showing the life safety, critical, and equipment branches. We engage the reviewer early, answer comments in days, and keep the project moving — because a health system's opening date is a clinical commitment, not a suggestion.",
      },
      {
        h2: "Surgical suites and sterile processing in Delaware",
        body: "Surgical capacity is the economic engine of Delaware hospitals — from ChristianaCare's operating rooms to ambulatory surgery centers across the state — and its MEP design is unforgiving. Each OR needs 20 total air changes per hour, positive pressure to the corridor, HEPA-filtered supply, and N+1 redundancy on the air-handling so a fan failure never cancels a case. Sterile processing departments need their own pressure cascade: decontamination negative, clean workroom positive, sterilizer rooms exhausted. Medical gas zone valves sit outside every OR suite with area alarms at the nurses' station. We design surgical MEP for the survey as well as the surgery: Joint Commission and CMS surveyors trace pressure relationships, humidity logs, and medical gas alarms on every visit.",
      },
      {
        h2: "Pharmacy, lab, and specialty spaces in Delaware",
        body: "Beyond the bed tower, Delaware health systems are building the specialty spaces that carry modern care: USP 800 hazardous-drug compounding suites with negative-pressure C-SECs at 30 air changes per hour and externally vented C-PEC hoods; USP 797 sterile compounding with ISO-classified buffer and ante areas; BSL-2 and BSL-3 laboratories with directional airflow, single-pass exhaust, and sealed penetrations; and vivarium facilities with 10 to 15 air changes per hour and tight temperature and humidity control. Each carries its own code regime — state pharmacy board, CDC biosafety, AAALAC — and each gets dedicated HVAC, monitoring, and alarming independent of the building's comfort systems.",
      },
    ],
    faqs: [
      {
        question: "Which health systems drive hospital construction in Delaware?",
        answer: "The major owners are ChristianaCare (Newark); Bayhealth (Dover); Beebe Healthcare (Lewes); Nemours Children's Health (Wilmington). We design for health-system standards as well as one-off projects, so a system's MEP criteria carry across its campuses.",
      },
      {
        question: "How does Delaware review hospital construction plans?",
        answer: "Delaware hospital construction is reviewed by the Delaware Health Resources Board's facility review process and the Division of Public Health, with local building permits in parallel. We build the submittal for that reviewer's checklist and resolve comments fast.",
      },
      {
        question: "What does ICRA require during hospital renovation?",
        answer: "The ICRA 2.0 process classifies construction activity (Type A through D) and patient risk groups, then assigns precautions Class I through V: dust-tight barriers, negative-pressure containment with HEPA-filtered exhaust, sealed penetrations, debris handling in covered containers, and traffic patterns separated from patient care. The ICRA matrix and barrier plan belong in the construction documents for plan review and the facility's infection preventionist.",
      },
      {
        question: "How long does healthcare plan review take?",
        answer: "It depends on the state. Standard health-department facility review runs 4 to 12 weeks in most states; California HCAI review runs longer with its seismic program; certificate-of-need states add months before design review even begins. We compress the timeline with early AHJ engagement, submittals built for the reviewer's checklist, and comment responses turned in days.",
      },
    ],
    founderNote: founderNote,
    extraLinks: [
      { text: "Hospital MEP Engineering in Wilmington, DE", href: "/healthcare-design/delaware/wilmington/" },
      { text: "Hospital MEP Engineering in Newark, DE", href: "/healthcare-design/delaware/newark/" },
      { text: "Hospital MEP Engineering in Dover, DE", href: "/healthcare-design/delaware/dover/" },
      { text: "Hospital MEP Engineering in Middletown, DE", href: "/healthcare-design/delaware/middletown/" },
      { text: "Hospital MEP Engineering in Lewes, DE", href: "/healthcare-design/delaware/lewes/" },
      { text: "What Are ASHRAE 170 Ventilation Requirements?", href: "/answers/healthcare-ashrae-170-ventilation-requirements/" },
      { text: "How Much Does Hospital MEP Design Cost?", href: "/answers/healthcare-hospital-mep-design-cost/" },
      { text: "MEP Engineering Services", href: "/mep-engineering/" },
      { text: "Mechanical Engineering", href: "/mechanical-engineering/" },
      { text: "Electrical Engineering", href: "/electrical-engineering/" },
      { text: "Healthcare Industry Practice", href: "/industries/healthcare/" },
      { text: "Get a Healthcare Engineering Estimate", href: "/estimate" },
    ],
  },
  {
    slug: "healthcare-design/district-of-columbia",
    title: "Hospital MEP Design in Washington DC: Engineering & Plan Review",
    description: "District of Columbia hospital MEP engineering: ASHRAE 170 HVAC, NFPA 99 medical gas, USP 800 pharmacy design. Serving DC hospitals, plan review to opening.",
    h1: "Hospital MEP Design in Washington DC: Engineering & Plan Review",
    directAnswer: "Apex Grid Engineering provides hospital MEP design in District of Columbia — HVAC to ASHRAE 170, NFPA 99 medical gas, USP 800 pharmacy, and emergency power — for MedStar Georgetown University Hospital in Washington, George Washington University Hospital in Washington, Children's National Hospital in Washington, with District of Columbia plan-review support.",
    answer: "DC concentrates academic medicine in a compact footprint: MedStar Georgetown, GW University Hospital, Children's National, Howard University Hospital, and Johns Hopkins' Sibley Memorial — all competing for specialty volume in one of the densest healthcare markets in the country.\n\nHospital projects in the District require certificate-of-need approval through the State Health Planning and Development Agency (SHPDA), plus DC Department of Health facility review. That review shapes the engineering from the first drawing: ventilation schedules proving every space's air changes and pressure relationships, medical gas risers with zone valves and alarms, and essential-electrical one-lines the reviewer can trace.\n\nUrban-infill healthcare engineering: constrained downtown sites, historic-adjacent construction, and ICRA phasing that keeps academic hospitals fully operational through renovation. Apex designs for that reality — and for the schedule. Health systems expanding in District of Columbia get schedule-driven delivery: early reviewer engagement, submittals built for the checklist, and comment responses in days, not weeks.",
    sections: [
      {
        h2: "District of Columbia health-facility plan review, handled",
        body: "Hospital projects in the District require certificate-of-need approval through the State Health Planning and Development Agency (SHPDA), plus DC Department of Health facility review. Our submittals are built for the reviewer's checklist: FGI Guidelines compliance narratives, ASHRAE 170 ventilation schedules with every space's air changes, outdoor air, pressure relationship, temperature, humidity, and filtration listed, NFPA 99 medical gas riser diagrams with zone valves and alarms, and essential-electrical one-lines showing the life safety, critical, and equipment branches. We engage the reviewer early, answer comments in days, and keep the project moving — because a health system's opening date is a clinical commitment, not a suggestion.",
      },
      {
        h2: "Surgical suites and sterile processing in District of Columbia",
        body: "Surgical capacity is the economic engine of District of Columbia hospitals — from MedStar Georgetown University Hospital's operating rooms to ambulatory surgery centers across the state — and its MEP design is unforgiving. Each OR needs 20 total air changes per hour, positive pressure to the corridor, HEPA-filtered supply, and N+1 redundancy on the air-handling so a fan failure never cancels a case. Sterile processing departments need their own pressure cascade: decontamination negative, clean workroom positive, sterilizer rooms exhausted. Medical gas zone valves sit outside every OR suite with area alarms at the nurses' station. We design surgical MEP for the survey as well as the surgery: Joint Commission and CMS surveyors trace pressure relationships, humidity logs, and medical gas alarms on every visit.",
      },
      {
        h2: "Pharmacy, lab, and specialty spaces in District of Columbia",
        body: "Beyond the bed tower, District of Columbia health systems are building the specialty spaces that carry modern care: USP 800 hazardous-drug compounding suites with negative-pressure C-SECs at 30 air changes per hour and externally vented C-PEC hoods; USP 797 sterile compounding with ISO-classified buffer and ante areas; BSL-2 and BSL-3 laboratories with directional airflow, single-pass exhaust, and sealed penetrations; and vivarium facilities with 10 to 15 air changes per hour and tight temperature and humidity control. Each carries its own code regime — state pharmacy board, CDC biosafety, AAALAC — and each gets dedicated HVAC, monitoring, and alarming independent of the building's comfort systems.",
      },
      {
        h2: "Renovating occupied District of Columbia hospitals",
        body: "Most District of Columbia hospital work is renovation inside fully operational buildings — a new OR at MedStar Georgetown University Hospital, an ED expansion, a pharmacy brought up to USP 800. Our construction documents carry ICRA 2.0 infection-control risk assessments matched to the work: Class I through V precautions, dust-tight barriers with negative-pressure containment, HEPA-filtered exhaust, sealed penetrations, and traffic patterns that keep construction crews out of patient corridors. Shutdowns are sequenced — med gas, normal power, HVAC — with temporary systems bridging every outage and life-safety maintained throughout. The facility's infection preventionist approves the ICRA plan before work starts because it is on the drawings, not in a memo afterward.",
      },
    ],
    faqs: [
      {
        question: "Which health systems drive hospital construction in District of Columbia?",
        answer: "The major owners are MedStar Georgetown University Hospital (Washington); George Washington University Hospital (Washington); Children's National Hospital (Washington); MedStar Washington Hospital Center (Washington). We design for health-system standards as well as one-off projects, so a system's MEP criteria carry across its campuses.",
      },
      {
        question: "How does District of Columbia review hospital construction plans?",
        answer: "Hospital projects in the District require certificate-of-need approval through the State Health Planning and Development Agency (SHPDA), plus DC Department of Health facility review. We build the submittal for that reviewer's checklist and resolve comments fast.",
      },
      {
        question: "What emergency power do hospitals require?",
        answer: "Hospitals require an essential electrical system per NFPA 99: life safety, critical, and equipment branches served by on-site generators that start and assume load within 10 seconds of a normal-power failure. NFPA 110 governs the generator installation, fuel supply, and monthly testing. Critical branch loads — ORs, ICUs, emergency departments — transfer automatically; the design must prove selective coordination and load-shed sequencing.",
      },
      {
        question: "What pressure relationships do hospital rooms need?",
        answer: "Operating rooms and protective-environment rooms run positive to adjacent spaces to keep contaminants out; airborne-infection isolation rooms, USP 800 compounding rooms, and soiled utility rooms run negative to contain contaminants. Anterooms buffer the transition. Each relationship is continuously monitored and alarmed through the building automation system, and the pressure map is part of the plan-review submittal.",
      },
    ],
    founderNote: founderNote,
    extraLinks: [
      { text: "Hospital MEP Engineering in Georgetown, DC", href: "/healthcare-design/district-of-columbia/georgetown/" },
      { text: "Hospital MEP Engineering in Foggy Bottom, DC", href: "/healthcare-design/district-of-columbia/foggy-bottom/" },
      { text: "Hospital MEP Engineering in Northwest DC, DC", href: "/healthcare-design/district-of-columbia/northwest-dc/" },
      { text: "Hospital MEP Engineering in Northeast DC, DC", href: "/healthcare-design/district-of-columbia/northeast-dc/" },
      { text: "Hospital MEP Engineering in Shaw, DC", href: "/healthcare-design/district-of-columbia/shaw/" },
      { text: "What Are ASHRAE 170 Ventilation Requirements?", href: "/answers/healthcare-ashrae-170-ventilation-requirements/" },
      { text: "How Much Does Hospital MEP Design Cost?", href: "/answers/healthcare-hospital-mep-design-cost/" },
      { text: "MEP Engineering Services", href: "/mep-engineering/" },
      { text: "Mechanical Engineering", href: "/mechanical-engineering/" },
      { text: "Electrical Engineering", href: "/electrical-engineering/" },
      { text: "Healthcare Industry Practice", href: "/industries/healthcare/" },
      { text: "Get a Healthcare Engineering Estimate", href: "/estimate" },
    ],
  },
  {
    slug: "healthcare-design/florida",
    title: "Hospital MEP Design in Florida: Engineering & Plan Review",
    description: "Florida hospital MEP engineering: ASHRAE 170 HVAC, NFPA 99 medical gas, USP 800 pharmacy design. Florida plan-review support and schedule-driven delivery.",
    h1: "Hospital MEP Design in Florida: Engineering & Plan Review",
    directAnswer: "Apex Grid Engineering provides hospital MEP design in Florida — HVAC to ASHRAE 170, NFPA 99 medical gas, USP 800 pharmacy, and emergency power — for AdventHealth Orlando in Orlando, Jackson Memorial Hospital in Miami, UF Health Shands Hospital in Gainesville, with Florida plan-review support.",
    answer: "Florida is a hospital-building powerhouse: AdventHealth Orlando's 2,247 beds make it one of the largest hospitals in America, with Jackson Memorial (1,550), UF Shands (1,145), Baptist Miami (1,020), and Tampa General (982) forming a deep bench. Population growth and hurricane exposure drive continuous expansion.\n\nFlorida hospital construction is reviewed by the Agency for Health Care Administration (AHCA), which runs a dedicated hospital plan-review program with strict life-safety and emergency-preparedness requirements. That review shapes the engineering from the first drawing: ventilation schedules proving every space's air changes and pressure relationships, medical gas risers with zone valves and alarms, and essential-electrical one-lines the reviewer can trace.\n\nAHCA plan review plus hurricane hardening: Florida healthcare design means emergency power above flood elevation, impact-rated envelopes, and HVAC that survives extended utility outages. Apex designs for that reality — and for the schedule. Health systems expanding in Florida get schedule-driven delivery: early reviewer engagement, submittals built for the checklist, and comment responses in days, not weeks.",
    sections: [
      {
        h2: "Surgical suites and sterile processing in Florida",
        body: "Surgical capacity is the economic engine of Florida hospitals — from AdventHealth Orlando's operating rooms to ambulatory surgery centers across the state — and its MEP design is unforgiving. Each OR needs 20 total air changes per hour, positive pressure to the corridor, HEPA-filtered supply, and N+1 redundancy on the air-handling so a fan failure never cancels a case. Sterile processing departments need their own pressure cascade: decontamination negative, clean workroom positive, sterilizer rooms exhausted. Medical gas zone valves sit outside every OR suite with area alarms at the nurses' station. We design surgical MEP for the survey as well as the surgery: Joint Commission and CMS surveyors trace pressure relationships, humidity logs, and medical gas alarms on every visit.",
      },
      {
        h2: "Pharmacy, lab, and specialty spaces in Florida",
        body: "Beyond the bed tower, Florida health systems are building the specialty spaces that carry modern care: USP 800 hazardous-drug compounding suites with negative-pressure C-SECs at 30 air changes per hour and externally vented C-PEC hoods; USP 797 sterile compounding with ISO-classified buffer and ante areas; BSL-2 and BSL-3 laboratories with directional airflow, single-pass exhaust, and sealed penetrations; and vivarium facilities with 10 to 15 air changes per hour and tight temperature and humidity control. Each carries its own code regime — state pharmacy board, CDC biosafety, AAALAC — and each gets dedicated HVAC, monitoring, and alarming independent of the building's comfort systems.",
      },
      {
        h2: "Renovating occupied Florida hospitals",
        body: "Most Florida hospital work is renovation inside fully operational buildings — a new OR at AdventHealth Orlando, an ED expansion, a pharmacy brought up to USP 800. Our construction documents carry ICRA 2.0 infection-control risk assessments matched to the work: Class I through V precautions, dust-tight barriers with negative-pressure containment, HEPA-filtered exhaust, sealed penetrations, and traffic patterns that keep construction crews out of patient corridors. Shutdowns are sequenced — med gas, normal power, HVAC — with temporary systems bridging every outage and life-safety maintained throughout. The facility's infection preventionist approves the ICRA plan before work starts because it is on the drawings, not in a memo afterward.",
      },
      {
        h2: "Emergency power and medical gas across Florida",
        body: "Every Florida hospital depends on systems patients never see. The essential electrical system — life safety, critical, and equipment branches per NFPA 99 — rides on generators that start within 10 seconds, with selective coordination, load-shed sequencing, and monthly NFPA 110 testing baked into the design. Medical gas piping runs zoned and alarmed: oxygen, medical air, nitrous oxide, vacuum, and waste anesthetic gas with area zone valves outside each critical-care zone and master alarms where staff always watch. AHCA plan review plus hurricane hardening: Florida healthcare design means emergency power above flood elevation, impact-rated envelopes, and HVAC that survives extended utility outages.",
      },
    ],
    faqs: [
      {
        question: "Which health systems drive hospital construction in Florida?",
        answer: "The major owners are AdventHealth Orlando (Orlando); Jackson Memorial Hospital (Miami); UF Health Shands Hospital (Gainesville); Tampa General Hospital (Tampa). We design for health-system standards as well as one-off projects, so a system's MEP criteria carry across its campuses.",
      },
      {
        question: "How does Florida review hospital construction plans?",
        answer: "Florida hospital construction is reviewed by the Agency for Health Care Administration (AHCA), which runs a dedicated hospital plan-review program with strict life-safety and emergency-preparedness requirements. We build the submittal for that reviewer's checklist and resolve comments fast.",
      },
      {
        question: "What ventilation rates does ASHRAE 170 require?",
        answer: "ASHRAE Standard 170 sets ventilation by space type: operating rooms need 20 total air changes per hour at positive pressure, trauma rooms 15 ACH, airborne-infection isolation rooms 12 ACH at negative pressure, protective-environment rooms 12 ACH at positive pressure, and patient rooms 6 ACH with 2 ACH of outdoor air. Temperature and humidity ranges are specified per space, and the standard is enforced through state health-department plan review.",
      },
      {
        question: "How are medical gas systems designed under NFPA 99?",
        answer: "NFPA 99 categorizes health care facilities by risk (Category 1 through 4) and governs medical gas and vacuum systems accordingly: zoned piping with area zone valves outside each critical-care zone, source equipment with automatic changeover, master and area alarms at attended locations, labeled outlets, and third-party certification testing before the system goes live. The medical gas design is a dedicated plan-review item in most states.",
      },
    ],
    founderNote: founderNote,
    extraLinks: [
      { text: "Hospital MEP Engineering in Orlando, FL", href: "/healthcare-design/florida/orlando/" },
      { text: "Hospital MEP Engineering in Miami, FL", href: "/healthcare-design/florida/miami/" },
      { text: "Hospital MEP Engineering in Tampa, FL", href: "/healthcare-design/florida/tampa/" },
      { text: "Hospital MEP Engineering in Jacksonville, FL", href: "/healthcare-design/florida/jacksonville/" },
      { text: "Hospital MEP Engineering in Gainesville, FL", href: "/healthcare-design/florida/gainesville/" },
      { text: "Hospital MEP Engineering in Fort Lauderdale, FL", href: "/healthcare-design/florida/fort-lauderdale/" },
      { text: "Hospital MEP Engineering in West Palm Beach, FL", href: "/healthcare-design/florida/west-palm-beach/" },
      { text: "What Are ASHRAE 170 Ventilation Requirements?", href: "/answers/healthcare-ashrae-170-ventilation-requirements/" },
      { text: "How Much Does Hospital MEP Design Cost?", href: "/answers/healthcare-hospital-mep-design-cost/" },
      { text: "MEP Engineering Services", href: "/mep-engineering/" },
      { text: "Mechanical Engineering", href: "/mechanical-engineering/" },
      { text: "Electrical Engineering", href: "/electrical-engineering/" },
      { text: "Healthcare Industry Practice", href: "/industries/healthcare/" },
      { text: "Get a Healthcare Engineering Estimate", href: "/estimate" },
    ],
  },
  {
    slug: "healthcare-design/georgia",
    title: "Hospital MEP Design in Georgia: Engineering & Plan Review",
    description: "Georgia hospital MEP engineering: ASHRAE 170 HVAC, NFPA 99 medical gas, USP 800 pharmacy design. Georgia plan-review support and schedule-driven delivery.",
    h1: "Hospital MEP Design in Georgia: Engineering & Plan Review",
    directAnswer: "Apex Grid Engineering provides hospital MEP design in Georgia — HVAC to ASHRAE 170, NFPA 99 medical gas, USP 800 pharmacy, and emergency power — for Emory University Hospital in Atlanta, Grady Memorial Hospital in Atlanta, Northside Hospital in Atlanta, with Georgia plan-review support.",
    answer: "Georgia healthcare is Atlanta-centric: Emory University Hospital (#1 in the state), Grady's 953-bed public trauma campus, Northside, Piedmont, and Wellstar all compete across the metro — while Augusta University anchors east Georgia and Savannah serves the coast.\n\nGeorgia hospital projects require certificate-of-need approval through the Department of Community Health, followed by facility plan review. That review shapes the engineering from the first drawing: ventilation schedules proving every space's air changes and pressure relationships, medical gas risers with zone valves and alarms, and essential-electrical one-lines the reviewer can trace.\n\nGeorgia's CON program shapes project strategy from day one — bed need, service-line justification, and facility design advance together through Department of Community Health review. Apex designs for that reality — and for the schedule. Health systems expanding in Georgia get schedule-driven delivery: early reviewer engagement, submittals built for the checklist, and comment responses in days, not weeks.",
    sections: [
      {
        h2: "Pharmacy, lab, and specialty spaces in Georgia",
        body: "Beyond the bed tower, Georgia health systems are building the specialty spaces that carry modern care: USP 800 hazardous-drug compounding suites with negative-pressure C-SECs at 30 air changes per hour and externally vented C-PEC hoods; USP 797 sterile compounding with ISO-classified buffer and ante areas; BSL-2 and BSL-3 laboratories with directional airflow, single-pass exhaust, and sealed penetrations; and vivarium facilities with 10 to 15 air changes per hour and tight temperature and humidity control. Each carries its own code regime — state pharmacy board, CDC biosafety, AAALAC — and each gets dedicated HVAC, monitoring, and alarming independent of the building's comfort systems.",
      },
      {
        h2: "Renovating occupied Georgia hospitals",
        body: "Most Georgia hospital work is renovation inside fully operational buildings — a new OR at Emory University Hospital, an ED expansion, a pharmacy brought up to USP 800. Our construction documents carry ICRA 2.0 infection-control risk assessments matched to the work: Class I through V precautions, dust-tight barriers with negative-pressure containment, HEPA-filtered exhaust, sealed penetrations, and traffic patterns that keep construction crews out of patient corridors. Shutdowns are sequenced — med gas, normal power, HVAC — with temporary systems bridging every outage and life-safety maintained throughout. The facility's infection preventionist approves the ICRA plan before work starts because it is on the drawings, not in a memo afterward.",
      },
      {
        h2: "Emergency power and medical gas across Georgia",
        body: "Every Georgia hospital depends on systems patients never see. The essential electrical system — life safety, critical, and equipment branches per NFPA 99 — rides on generators that start within 10 seconds, with selective coordination, load-shed sequencing, and monthly NFPA 110 testing baked into the design. Medical gas piping runs zoned and alarmed: oxygen, medical air, nitrous oxide, vacuum, and waste anesthetic gas with area zone valves outside each critical-care zone and master alarms where staff always watch. Georgia's CON program shapes project strategy from day one — bed need, service-line justification, and facility design advance together through Department of Community Health review.",
      },
      {
        h2: "Clinical-space HVAC for Georgia hospitals",
        body: "Hospital HVAC in Georgia is designed space by space to ASHRAE 170. Operating rooms hold positive pressure at 20 air changes per hour with temperature between 68 and 75 degrees and relative humidity between 20 and 60 percent, delivered through low-velocity diffuser arrays that sweep contaminants away from the sterile field. Airborne-infection isolation rooms reverse the relationship — negative pressure at 12 ACH with anterooms and continuous monitoring. At Emory University Hospital in Atlanta and Grady Memorial Hospital in Atlanta, these pressure relationships are the first thing plan reviewers verify, and the building automation system proves them around the clock. Georgia's CON program shapes project strategy from day one — bed need, service-line justification, and facility design advance together through Department of Community Health review.",
      },
    ],
    faqs: [
      {
        question: "Which health systems drive hospital construction in Georgia?",
        answer: "The major owners are Emory University Hospital (Atlanta); Grady Memorial Hospital (Atlanta); Northside Hospital (Atlanta); Piedmont Healthcare (Atlanta). We design for health-system standards as well as one-off projects, so a system's MEP criteria carry across its campuses.",
      },
      {
        question: "How does Georgia review hospital construction plans?",
        answer: "Georgia hospital projects require certificate-of-need approval through the Department of Community Health, followed by facility plan review. We build the submittal for that reviewer's checklist and resolve comments fast.",
      },
      {
        question: "What is USP 800 and which facilities need it?",
        answer: "USP General Chapter 800 governs the handling of hazardous drugs in healthcare settings. Facilities that compound or handle hazardous drugs — hospital pharmacies, oncology infusion pharmacies, veterinary compounding — need a containment suite: a negative-pressure secondary engineering control (C-SEC) at -0.01 to -0.03 inches water column, externally vented primary controls (C-PEC), 30 air changes per hour, and strict temperature and humidity control. State boards of pharmacy enforce it.",
      },
      {
        question: "How much does hospital MEP engineering cost?",
        answer: "Hospital MEP engineering fees typically run 6 to 10 percent of the MEP construction value. Since MEP systems represent 30 to 45 percent of total hospital construction — and new acute-care hospitals cost $600 to over $1,000 per square foot — engineering fees generally land in the range of $15 to $45 per square foot, with surgical suites, isolation, pharmacy, and lab spaces commanding the high end.",
      },
    ],
    founderNote: founderNote,
    extraLinks: [
      { text: "Hospital MEP Engineering in Atlanta, GA", href: "/healthcare-design/georgia/atlanta/" },
      { text: "Hospital MEP Engineering in Augusta, GA", href: "/healthcare-design/georgia/augusta/" },
      { text: "Hospital MEP Engineering in Savannah, GA", href: "/healthcare-design/georgia/savannah/" },
      { text: "Hospital MEP Engineering in Macon, GA", href: "/healthcare-design/georgia/macon/" },
      { text: "Hospital MEP Engineering in Columbus, GA", href: "/healthcare-design/georgia/columbus/" },
      { text: "Hospital MEP Engineering in Marietta, GA", href: "/healthcare-design/georgia/marietta/" },
      { text: "Hospital MEP Engineering in Athens, GA", href: "/healthcare-design/georgia/athens/" },
      { text: "What Are ASHRAE 170 Ventilation Requirements?", href: "/answers/healthcare-ashrae-170-ventilation-requirements/" },
      { text: "How Much Does Hospital MEP Design Cost?", href: "/answers/healthcare-hospital-mep-design-cost/" },
      { text: "MEP Engineering Services", href: "/mep-engineering/" },
      { text: "Mechanical Engineering", href: "/mechanical-engineering/" },
      { text: "Electrical Engineering", href: "/electrical-engineering/" },
      { text: "Healthcare Industry Practice", href: "/industries/healthcare/" },
      { text: "Get a Healthcare Engineering Estimate", href: "/estimate" },
    ],
  },
  {
    slug: "healthcare-design/hawaii",
    title: "Hospital MEP Design in Hawaii: Engineering & Plan Review",
    description: "Hawaii hospital MEP engineering: ASHRAE 170 HVAC, NFPA 99 medical gas, USP 800 pharmacy design. Hawaii plan-review support and schedule-driven delivery.",
    h1: "Hospital MEP Design in Hawaii: Engineering & Plan Review",
    directAnswer: "Apex Grid Engineering provides hospital MEP design in Hawaii — HVAC to ASHRAE 170, NFPA 99 medical gas, USP 800 pharmacy, and emergency power — for The Queen's Medical Center in Honolulu, Hawaii Pacific Health in Honolulu, Kaiser Permanente Moanalua Medical Center in Honolulu, with Hawaii plan-review support.",
    answer: "Hawaii's island market centers on The Queen's Medical Center in Honolulu — the state's only Level 1 trauma center, its only transplant program, and its #1-ranked hospital — with Hawaii Pacific Health and Kaiser covering Oahu and neighbor-island systems serving Maui and the Big Island.\n\nHawaii hospital projects require certificate-of-need approval through the State Health Planning and Development Agency (SHPDA), with Department of Health facility review. That review shapes the engineering from the first drawing: ventilation schedules proving every space's air changes and pressure relationships, medical gas risers with zone valves and alarms, and essential-electrical one-lines the reviewer can trace.\n\nIsland logistics engineering: equipment procurement with long lead times, seismic and hurricane resilience, and HVAC redundancy for facilities that cannot rely on mainland support. Apex designs for that reality — and for the schedule. Health systems expanding in Hawaii get schedule-driven delivery: early reviewer engagement, submittals built for the checklist, and comment responses in days, not weeks.",
    sections: [
      {
        h2: "Renovating occupied Hawaii hospitals",
        body: "Most Hawaii hospital work is renovation inside fully operational buildings — a new OR at The Queen's Medical Center, an ED expansion, a pharmacy brought up to USP 800. Our construction documents carry ICRA 2.0 infection-control risk assessments matched to the work: Class I through V precautions, dust-tight barriers with negative-pressure containment, HEPA-filtered exhaust, sealed penetrations, and traffic patterns that keep construction crews out of patient corridors. Shutdowns are sequenced — med gas, normal power, HVAC — with temporary systems bridging every outage and life-safety maintained throughout. The facility's infection preventionist approves the ICRA plan before work starts because it is on the drawings, not in a memo afterward.",
      },
      {
        h2: "Emergency power and medical gas across Hawaii",
        body: "Every Hawaii hospital depends on systems patients never see. The essential electrical system — life safety, critical, and equipment branches per NFPA 99 — rides on generators that start within 10 seconds, with selective coordination, load-shed sequencing, and monthly NFPA 110 testing baked into the design. Medical gas piping runs zoned and alarmed: oxygen, medical air, nitrous oxide, vacuum, and waste anesthetic gas with area zone valves outside each critical-care zone and master alarms where staff always watch. Island logistics engineering: equipment procurement with long lead times, seismic and hurricane resilience, and HVAC redundancy for facilities that cannot rely on mainland support.",
      },
      {
        h2: "Clinical-space HVAC for Hawaii hospitals",
        body: "Hospital HVAC in Hawaii is designed space by space to ASHRAE 170. Operating rooms hold positive pressure at 20 air changes per hour with temperature between 68 and 75 degrees and relative humidity between 20 and 60 percent, delivered through low-velocity diffuser arrays that sweep contaminants away from the sterile field. Airborne-infection isolation rooms reverse the relationship — negative pressure at 12 ACH with anterooms and continuous monitoring. At The Queen's Medical Center in Honolulu and Hawaii Pacific Health in Honolulu, these pressure relationships are the first thing plan reviewers verify, and the building automation system proves them around the clock. Island logistics engineering: equipment procurement with long lead times, seismic and hurricane resilience, and HVAC redundancy for facilities that cannot rely on mainland support.",
      },
      {
        h2: "Hawaii health-facility plan review, handled",
        body: "Hawaii hospital projects require certificate-of-need approval through the State Health Planning and Development Agency (SHPDA), with Department of Health facility review. Our submittals are built for the reviewer's checklist: FGI Guidelines compliance narratives, ASHRAE 170 ventilation schedules with every space's air changes, outdoor air, pressure relationship, temperature, humidity, and filtration listed, NFPA 99 medical gas riser diagrams with zone valves and alarms, and essential-electrical one-lines showing the life safety, critical, and equipment branches. We engage the reviewer early, answer comments in days, and keep the project moving — because a health system's opening date is a clinical commitment, not a suggestion.",
      },
    ],
    faqs: [
      {
        question: "Which health systems drive hospital construction in Hawaii?",
        answer: "The major owners are The Queen's Medical Center (Honolulu); Hawaii Pacific Health (Honolulu); Kaiser Permanente Moanalua Medical Center (Honolulu); Maui Health (Wailuku). We design for health-system standards as well as one-off projects, so a system's MEP criteria carry across its campuses.",
      },
      {
        question: "How does Hawaii review hospital construction plans?",
        answer: "Hawaii hospital projects require certificate-of-need approval through the State Health Planning and Development Agency (SHPDA), with Department of Health facility review. We build the submittal for that reviewer's checklist and resolve comments fast.",
      },
      {
        question: "What does ICRA require during hospital renovation?",
        answer: "The ICRA 2.0 process classifies construction activity (Type A through D) and patient risk groups, then assigns precautions Class I through V: dust-tight barriers, negative-pressure containment with HEPA-filtered exhaust, sealed penetrations, debris handling in covered containers, and traffic patterns separated from patient care. The ICRA matrix and barrier plan belong in the construction documents for plan review and the facility's infection preventionist.",
      },
      {
        question: "How long does healthcare plan review take?",
        answer: "It depends on the state. Standard health-department facility review runs 4 to 12 weeks in most states; California HCAI review runs longer with its seismic program; certificate-of-need states add months before design review even begins. We compress the timeline with early AHJ engagement, submittals built for the reviewer's checklist, and comment responses turned in days.",
      },
    ],
    founderNote: founderNote,
    extraLinks: [
      { text: "Hospital MEP Engineering in Honolulu, HI", href: "/healthcare-design/hawaii/honolulu/" },
      { text: "Hospital MEP Engineering in Hilo, HI", href: "/healthcare-design/hawaii/hilo/" },
      { text: "Hospital MEP Engineering in Kahului, HI", href: "/healthcare-design/hawaii/kahului/" },
      { text: "Hospital MEP Engineering in Kailua, HI", href: "/healthcare-design/hawaii/kailua/" },
      { text: "Hospital MEP Engineering in Waipahu, HI", href: "/healthcare-design/hawaii/waipahu/" },
      { text: "What Are ASHRAE 170 Ventilation Requirements?", href: "/answers/healthcare-ashrae-170-ventilation-requirements/" },
      { text: "How Much Does Hospital MEP Design Cost?", href: "/answers/healthcare-hospital-mep-design-cost/" },
      { text: "MEP Engineering Services", href: "/mep-engineering/" },
      { text: "Mechanical Engineering", href: "/mechanical-engineering/" },
      { text: "Electrical Engineering", href: "/electrical-engineering/" },
      { text: "Healthcare Industry Practice", href: "/industries/healthcare/" },
      { text: "Get a Healthcare Engineering Estimate", href: "/estimate" },
    ],
  },
  {
    slug: "healthcare-design/idaho",
    title: "Hospital MEP Design in Idaho: Engineering & Plan Review",
    description: "Idaho hospital MEP engineering: ASHRAE 170 HVAC, NFPA 99 medical gas, USP 800 pharmacy design. Idaho plan-review support and schedule-driven delivery.",
    h1: "Hospital MEP Design in Idaho: Engineering & Plan Review",
    directAnswer: "Apex Grid Engineering provides hospital MEP design in Idaho — HVAC to ASHRAE 170, NFPA 99 medical gas, USP 800 pharmacy, and emergency power — for St. Luke's Health System in Boise, Saint Alphonsus Health System in Boise, Kootenai Health in Coeur d'Alene, with Idaho plan-review support.",
    answer: "Idaho's market is a two-system Boise core — St. Luke's (the state's largest system, #1-ranked Boise campus) and Saint Alphonsus — with Kootenai anchoring the north and EIRMC the east, all serving one of the fastest-growing states in the country.\n\nIdaho hospital construction is reviewed by the Department of Health and Welfare's facility standards program, with local building department permits. That review shapes the engineering from the first drawing: ventilation schedules proving every space's air changes and pressure relationships, medical gas risers with zone valves and alarms, and essential-electrical one-lines the reviewer can trace.\n\nGrowth-market healthcare: Boise-area population surges are driving MOB, surgery-center, and bed-tower work where speed to permit and schedule-driven delivery win. Apex designs for that reality — and for the schedule. Health systems expanding in Idaho get schedule-driven delivery: early reviewer engagement, submittals built for the checklist, and comment responses in days, not weeks.",
    sections: [
      {
        h2: "Emergency power and medical gas across Idaho",
        body: "Every Idaho hospital depends on systems patients never see. The essential electrical system — life safety, critical, and equipment branches per NFPA 99 — rides on generators that start within 10 seconds, with selective coordination, load-shed sequencing, and monthly NFPA 110 testing baked into the design. Medical gas piping runs zoned and alarmed: oxygen, medical air, nitrous oxide, vacuum, and waste anesthetic gas with area zone valves outside each critical-care zone and master alarms where staff always watch. Growth-market healthcare: Boise-area population surges are driving MOB, surgery-center, and bed-tower work where speed to permit and schedule-driven delivery win.",
      },
      {
        h2: "Clinical-space HVAC for Idaho hospitals",
        body: "Hospital HVAC in Idaho is designed space by space to ASHRAE 170. Operating rooms hold positive pressure at 20 air changes per hour with temperature between 68 and 75 degrees and relative humidity between 20 and 60 percent, delivered through low-velocity diffuser arrays that sweep contaminants away from the sterile field. Airborne-infection isolation rooms reverse the relationship — negative pressure at 12 ACH with anterooms and continuous monitoring. At St. Luke's Health System in Boise and Saint Alphonsus Health System in Boise, these pressure relationships are the first thing plan reviewers verify, and the building automation system proves them around the clock. Growth-market healthcare: Boise-area population surges are driving MOB, surgery-center, and bed-tower work where speed to permit and schedule-driven delivery win.",
      },
      {
        h2: "Idaho health-facility plan review, handled",
        body: "Idaho hospital construction is reviewed by the Department of Health and Welfare's facility standards program, with local building department permits. Our submittals are built for the reviewer's checklist: FGI Guidelines compliance narratives, ASHRAE 170 ventilation schedules with every space's air changes, outdoor air, pressure relationship, temperature, humidity, and filtration listed, NFPA 99 medical gas riser diagrams with zone valves and alarms, and essential-electrical one-lines showing the life safety, critical, and equipment branches. We engage the reviewer early, answer comments in days, and keep the project moving — because a health system's opening date is a clinical commitment, not a suggestion.",
      },
      {
        h2: "Surgical suites and sterile processing in Idaho",
        body: "Surgical capacity is the economic engine of Idaho hospitals — from St. Luke's Health System's operating rooms to ambulatory surgery centers across the state — and its MEP design is unforgiving. Each OR needs 20 total air changes per hour, positive pressure to the corridor, HEPA-filtered supply, and N+1 redundancy on the air-handling so a fan failure never cancels a case. Sterile processing departments need their own pressure cascade: decontamination negative, clean workroom positive, sterilizer rooms exhausted. Medical gas zone valves sit outside every OR suite with area alarms at the nurses' station. We design surgical MEP for the survey as well as the surgery: Joint Commission and CMS surveyors trace pressure relationships, humidity logs, and medical gas alarms on every visit.",
      },
    ],
    faqs: [
      {
        question: "Which health systems drive hospital construction in Idaho?",
        answer: "The major owners are St. Luke's Health System (Boise); Saint Alphonsus Health System (Boise); Kootenai Health (Coeur d'Alene); Eastern Idaho Regional Medical Center (Idaho Falls). We design for health-system standards as well as one-off projects, so a system's MEP criteria carry across its campuses.",
      },
      {
        question: "How does Idaho review hospital construction plans?",
        answer: "Idaho hospital construction is reviewed by the Department of Health and Welfare's facility standards program, with local building department permits. We build the submittal for that reviewer's checklist and resolve comments fast.",
      },
      {
        question: "What emergency power do hospitals require?",
        answer: "Hospitals require an essential electrical system per NFPA 99: life safety, critical, and equipment branches served by on-site generators that start and assume load within 10 seconds of a normal-power failure. NFPA 110 governs the generator installation, fuel supply, and monthly testing. Critical branch loads — ORs, ICUs, emergency departments — transfer automatically; the design must prove selective coordination and load-shed sequencing.",
      },
      {
        question: "What pressure relationships do hospital rooms need?",
        answer: "Operating rooms and protective-environment rooms run positive to adjacent spaces to keep contaminants out; airborne-infection isolation rooms, USP 800 compounding rooms, and soiled utility rooms run negative to contain contaminants. Anterooms buffer the transition. Each relationship is continuously monitored and alarmed through the building automation system, and the pressure map is part of the plan-review submittal.",
      },
    ],
    founderNote: founderNote,
    extraLinks: [
      { text: "Hospital MEP Engineering in Boise, ID", href: "/healthcare-design/idaho/boise/" },
      { text: "Hospital MEP Engineering in Meridian, ID", href: "/healthcare-design/idaho/meridian/" },
      { text: "Hospital MEP Engineering in Nampa, ID", href: "/healthcare-design/idaho/nampa/" },
      { text: "Hospital MEP Engineering in Idaho Falls, ID", href: "/healthcare-design/idaho/idaho-falls/" },
      { text: "Hospital MEP Engineering in Coeur d'Alene, ID", href: "/healthcare-design/idaho/coeur-d-alene/" },
      { text: "Hospital MEP Engineering in Twin Falls, ID", href: "/healthcare-design/idaho/twin-falls/" },
      { text: "What Are ASHRAE 170 Ventilation Requirements?", href: "/answers/healthcare-ashrae-170-ventilation-requirements/" },
      { text: "How Much Does Hospital MEP Design Cost?", href: "/answers/healthcare-hospital-mep-design-cost/" },
      { text: "MEP Engineering Services", href: "/mep-engineering/" },
      { text: "Mechanical Engineering", href: "/mechanical-engineering/" },
      { text: "Electrical Engineering", href: "/electrical-engineering/" },
      { text: "Healthcare Industry Practice", href: "/industries/healthcare/" },
      { text: "Get a Healthcare Engineering Estimate", href: "/estimate" },
    ],
  },
  {
    slug: "healthcare-design/illinois",
    title: "Hospital MEP Design in Illinois: Engineering & Plan Review",
    description: "Illinois hospital MEP engineering: ASHRAE 170 HVAC, NFPA 99 medical gas, USP 800 pharmacy design. Illinois plan-review support and schedule-driven delivery.",
    h1: "Hospital MEP Design in Illinois: Engineering & Plan Review",
    directAnswer: "Apex Grid Engineering provides hospital MEP design in Illinois — HVAC to ASHRAE 170, NFPA 99 medical gas, USP 800 pharmacy, and emergency power — for Northwestern Memorial Hospital in Chicago, Rush University Medical Center in Chicago, Advocate Health Care in Downers Grove, with Illinois plan-review support.",
    answer: "Illinois healthcare is Chicago-dominant — Northwestern Memorial and Rush tied at #1, with Advocate, Endeavor, and UChicago Medicine rounding out a deep metro bench — while OSF and Carle anchor the downstate markets of Peoria, Springfield, and Champaign.\n\nIllinois hospital projects go through the Illinois Department of Public Health's health facilities review and the Health Facilities and Services Review Board's certificate-of-need process. That review shapes the engineering from the first drawing: ventilation schedules proving every space's air changes and pressure relationships, medical gas risers with zone valves and alarms, and essential-electrical one-lines the reviewer can trace.\n\nChicago's dense urban hospital campuses demand phased ICRA construction, deep-winter HVAC design, and high-rise vertical-transport coordination for tower additions. Apex designs for that reality — and for the schedule. Health systems expanding in Illinois get schedule-driven delivery: early reviewer engagement, submittals built for the checklist, and comment responses in days, not weeks.",
    sections: [
      {
        h2: "Clinical-space HVAC for Illinois hospitals",
        body: "Hospital HVAC in Illinois is designed space by space to ASHRAE 170. Operating rooms hold positive pressure at 20 air changes per hour with temperature between 68 and 75 degrees and relative humidity between 20 and 60 percent, delivered through low-velocity diffuser arrays that sweep contaminants away from the sterile field. Airborne-infection isolation rooms reverse the relationship — negative pressure at 12 ACH with anterooms and continuous monitoring. At Northwestern Memorial Hospital in Chicago and Rush University Medical Center in Chicago, these pressure relationships are the first thing plan reviewers verify, and the building automation system proves them around the clock. Chicago's dense urban hospital campuses demand phased ICRA construction, deep-winter HVAC design, and high-rise vertical-transport coordination for tower additions.",
      },
      {
        h2: "Illinois health-facility plan review, handled",
        body: "Illinois hospital projects go through the Illinois Department of Public Health's health facilities review and the Health Facilities and Services Review Board's certificate-of-need process. Our submittals are built for the reviewer's checklist: FGI Guidelines compliance narratives, ASHRAE 170 ventilation schedules with every space's air changes, outdoor air, pressure relationship, temperature, humidity, and filtration listed, NFPA 99 medical gas riser diagrams with zone valves and alarms, and essential-electrical one-lines showing the life safety, critical, and equipment branches. We engage the reviewer early, answer comments in days, and keep the project moving — because a health system's opening date is a clinical commitment, not a suggestion.",
      },
      {
        h2: "Surgical suites and sterile processing in Illinois",
        body: "Surgical capacity is the economic engine of Illinois hospitals — from Northwestern Memorial Hospital's operating rooms to ambulatory surgery centers across the state — and its MEP design is unforgiving. Each OR needs 20 total air changes per hour, positive pressure to the corridor, HEPA-filtered supply, and N+1 redundancy on the air-handling so a fan failure never cancels a case. Sterile processing departments need their own pressure cascade: decontamination negative, clean workroom positive, sterilizer rooms exhausted. Medical gas zone valves sit outside every OR suite with area alarms at the nurses' station. We design surgical MEP for the survey as well as the surgery: Joint Commission and CMS surveyors trace pressure relationships, humidity logs, and medical gas alarms on every visit.",
      },
      {
        h2: "Pharmacy, lab, and specialty spaces in Illinois",
        body: "Beyond the bed tower, Illinois health systems are building the specialty spaces that carry modern care: USP 800 hazardous-drug compounding suites with negative-pressure C-SECs at 30 air changes per hour and externally vented C-PEC hoods; USP 797 sterile compounding with ISO-classified buffer and ante areas; BSL-2 and BSL-3 laboratories with directional airflow, single-pass exhaust, and sealed penetrations; and vivarium facilities with 10 to 15 air changes per hour and tight temperature and humidity control. Each carries its own code regime — state pharmacy board, CDC biosafety, AAALAC — and each gets dedicated HVAC, monitoring, and alarming independent of the building's comfort systems.",
      },
    ],
    faqs: [
      {
        question: "Which health systems drive hospital construction in Illinois?",
        answer: "The major owners are Northwestern Memorial Hospital (Chicago); Rush University Medical Center (Chicago); Advocate Health Care (Downers Grove); Endeavor Health (Evanston). We design for health-system standards as well as one-off projects, so a system's MEP criteria carry across its campuses.",
      },
      {
        question: "How does Illinois review hospital construction plans?",
        answer: "Illinois hospital projects go through the Illinois Department of Public Health's health facilities review and the Health Facilities and Services Review Board's certificate-of-need process. We build the submittal for that reviewer's checklist and resolve comments fast.",
      },
      {
        question: "What ventilation rates does ASHRAE 170 require?",
        answer: "ASHRAE Standard 170 sets ventilation by space type: operating rooms need 20 total air changes per hour at positive pressure, trauma rooms 15 ACH, airborne-infection isolation rooms 12 ACH at negative pressure, protective-environment rooms 12 ACH at positive pressure, and patient rooms 6 ACH with 2 ACH of outdoor air. Temperature and humidity ranges are specified per space, and the standard is enforced through state health-department plan review.",
      },
      {
        question: "How are medical gas systems designed under NFPA 99?",
        answer: "NFPA 99 categorizes health care facilities by risk (Category 1 through 4) and governs medical gas and vacuum systems accordingly: zoned piping with area zone valves outside each critical-care zone, source equipment with automatic changeover, master and area alarms at attended locations, labeled outlets, and third-party certification testing before the system goes live. The medical gas design is a dedicated plan-review item in most states.",
      },
    ],
    founderNote: founderNote,
    extraLinks: [
      { text: "Hospital MEP Engineering in Chicago, IL", href: "/healthcare-design/illinois/chicago/" },
      { text: "Hospital MEP Engineering in Aurora, IL", href: "/healthcare-design/illinois/aurora/" },
      { text: "Hospital MEP Engineering in Naperville, IL", href: "/healthcare-design/illinois/naperville/" },
      { text: "Hospital MEP Engineering in Peoria, IL", href: "/healthcare-design/illinois/peoria/" },
      { text: "Hospital MEP Engineering in Springfield, IL", href: "/healthcare-design/illinois/springfield/" },
      { text: "Hospital MEP Engineering in Rockford, IL", href: "/healthcare-design/illinois/rockford/" },
      { text: "Hospital MEP Engineering in Champaign, IL", href: "/healthcare-design/illinois/champaign/" },
      { text: "What Are ASHRAE 170 Ventilation Requirements?", href: "/answers/healthcare-ashrae-170-ventilation-requirements/" },
      { text: "How Much Does Hospital MEP Design Cost?", href: "/answers/healthcare-hospital-mep-design-cost/" },
      { text: "MEP Engineering Services", href: "/mep-engineering/" },
      { text: "Mechanical Engineering", href: "/mechanical-engineering/" },
      { text: "Electrical Engineering", href: "/electrical-engineering/" },
      { text: "Healthcare Industry Practice", href: "/industries/healthcare/" },
      { text: "Get a Healthcare Engineering Estimate", href: "/estimate" },
    ],
  },
  {
    slug: "healthcare-design/indiana",
    title: "Hospital MEP Design in Indiana: Engineering & Plan Review",
    description: "Indiana hospital MEP engineering: ASHRAE 170 HVAC, NFPA 99 medical gas, USP 800 pharmacy design. Indiana plan-review support and schedule-driven delivery.",
    h1: "Hospital MEP Design in Indiana: Engineering & Plan Review",
    directAnswer: "Apex Grid Engineering provides hospital MEP design in Indiana — HVAC to ASHRAE 170, NFPA 99 medical gas, USP 800 pharmacy, and emergency power — for Indiana University Health in Indianapolis, Community Hospital in Munster, Ascension St. Vincent in Indianapolis, with Indiana plan-review support.",
    answer: "Indiana pairs IU Health's Indianapolis academic core with strong regional anchors — Parkview in Fort Wayne, Deaconess in Evansville, and Community Hospital in Munster (#1 in the state) serving the Chicago-adjacent northwest.\n\nIndiana hospital construction is reviewed by the Indiana Department of Health's facility program, with local building department permits running in parallel. That review shapes the engineering from the first drawing: ventilation schedules proving every space's air changes and pressure relationships, medical gas risers with zone valves and alarms, and essential-electrical one-lines the reviewer can trace.\n\nRegional-hub strategy: Indiana's strongest growth is in Fort Wayne, Evansville, and South Bend regional centers where surgical and MOB expansion outpaces downtown tower work. Apex designs for that reality — and for the schedule. Health systems expanding in Indiana get schedule-driven delivery: early reviewer engagement, submittals built for the checklist, and comment responses in days, not weeks.",
    sections: [
      {
        h2: "Indiana health-facility plan review, handled",
        body: "Indiana hospital construction is reviewed by the Indiana Department of Health's facility program, with local building department permits running in parallel. Our submittals are built for the reviewer's checklist: FGI Guidelines compliance narratives, ASHRAE 170 ventilation schedules with every space's air changes, outdoor air, pressure relationship, temperature, humidity, and filtration listed, NFPA 99 medical gas riser diagrams with zone valves and alarms, and essential-electrical one-lines showing the life safety, critical, and equipment branches. We engage the reviewer early, answer comments in days, and keep the project moving — because a health system's opening date is a clinical commitment, not a suggestion.",
      },
      {
        h2: "Surgical suites and sterile processing in Indiana",
        body: "Surgical capacity is the economic engine of Indiana hospitals — from Indiana University Health's operating rooms to ambulatory surgery centers across the state — and its MEP design is unforgiving. Each OR needs 20 total air changes per hour, positive pressure to the corridor, HEPA-filtered supply, and N+1 redundancy on the air-handling so a fan failure never cancels a case. Sterile processing departments need their own pressure cascade: decontamination negative, clean workroom positive, sterilizer rooms exhausted. Medical gas zone valves sit outside every OR suite with area alarms at the nurses' station. We design surgical MEP for the survey as well as the surgery: Joint Commission and CMS surveyors trace pressure relationships, humidity logs, and medical gas alarms on every visit.",
      },
      {
        h2: "Pharmacy, lab, and specialty spaces in Indiana",
        body: "Beyond the bed tower, Indiana health systems are building the specialty spaces that carry modern care: USP 800 hazardous-drug compounding suites with negative-pressure C-SECs at 30 air changes per hour and externally vented C-PEC hoods; USP 797 sterile compounding with ISO-classified buffer and ante areas; BSL-2 and BSL-3 laboratories with directional airflow, single-pass exhaust, and sealed penetrations; and vivarium facilities with 10 to 15 air changes per hour and tight temperature and humidity control. Each carries its own code regime — state pharmacy board, CDC biosafety, AAALAC — and each gets dedicated HVAC, monitoring, and alarming independent of the building's comfort systems.",
      },
      {
        h2: "Renovating occupied Indiana hospitals",
        body: "Most Indiana hospital work is renovation inside fully operational buildings — a new OR at Indiana University Health, an ED expansion, a pharmacy brought up to USP 800. Our construction documents carry ICRA 2.0 infection-control risk assessments matched to the work: Class I through V precautions, dust-tight barriers with negative-pressure containment, HEPA-filtered exhaust, sealed penetrations, and traffic patterns that keep construction crews out of patient corridors. Shutdowns are sequenced — med gas, normal power, HVAC — with temporary systems bridging every outage and life-safety maintained throughout. The facility's infection preventionist approves the ICRA plan before work starts because it is on the drawings, not in a memo afterward.",
      },
    ],
    faqs: [
      {
        question: "Which health systems drive hospital construction in Indiana?",
        answer: "The major owners are Indiana University Health (Indianapolis); Community Hospital (Munster); Ascension St. Vincent (Indianapolis); Franciscan Health (Mishawaka). We design for health-system standards as well as one-off projects, so a system's MEP criteria carry across its campuses.",
      },
      {
        question: "How does Indiana review hospital construction plans?",
        answer: "Indiana hospital construction is reviewed by the Indiana Department of Health's facility program, with local building department permits running in parallel. We build the submittal for that reviewer's checklist and resolve comments fast.",
      },
      {
        question: "What is USP 800 and which facilities need it?",
        answer: "USP General Chapter 800 governs the handling of hazardous drugs in healthcare settings. Facilities that compound or handle hazardous drugs — hospital pharmacies, oncology infusion pharmacies, veterinary compounding — need a containment suite: a negative-pressure secondary engineering control (C-SEC) at -0.01 to -0.03 inches water column, externally vented primary controls (C-PEC), 30 air changes per hour, and strict temperature and humidity control. State boards of pharmacy enforce it.",
      },
      {
        question: "How much does hospital MEP engineering cost?",
        answer: "Hospital MEP engineering fees typically run 6 to 10 percent of the MEP construction value. Since MEP systems represent 30 to 45 percent of total hospital construction — and new acute-care hospitals cost $600 to over $1,000 per square foot — engineering fees generally land in the range of $15 to $45 per square foot, with surgical suites, isolation, pharmacy, and lab spaces commanding the high end.",
      },
    ],
    founderNote: founderNote,
    extraLinks: [
      { text: "Hospital MEP Engineering in Indianapolis, IN", href: "/healthcare-design/indiana/indianapolis/" },
      { text: "Hospital MEP Engineering in Fort Wayne, IN", href: "/healthcare-design/indiana/fort-wayne/" },
      { text: "Hospital MEP Engineering in Evansville, IN", href: "/healthcare-design/indiana/evansville/" },
      { text: "Hospital MEP Engineering in South Bend, IN", href: "/healthcare-design/indiana/south-bend/" },
      { text: "Hospital MEP Engineering in Munster, IN", href: "/healthcare-design/indiana/munster/" },
      { text: "Hospital MEP Engineering in Carmel, IN", href: "/healthcare-design/indiana/carmel/" },
      { text: "Hospital MEP Engineering in Bloomington, IN", href: "/healthcare-design/indiana/bloomington/" },
      { text: "What Are ASHRAE 170 Ventilation Requirements?", href: "/answers/healthcare-ashrae-170-ventilation-requirements/" },
      { text: "How Much Does Hospital MEP Design Cost?", href: "/answers/healthcare-hospital-mep-design-cost/" },
      { text: "MEP Engineering Services", href: "/mep-engineering/" },
      { text: "Mechanical Engineering", href: "/mechanical-engineering/" },
      { text: "Electrical Engineering", href: "/electrical-engineering/" },
      { text: "Healthcare Industry Practice", href: "/industries/healthcare/" },
      { text: "Get a Healthcare Engineering Estimate", href: "/estimate" },
    ],
  },
  {
    slug: "healthcare-design/iowa",
    title: "Iowa Hospital MEP Design: Engineering Services & Plan Review",
    description: "Iowa hospital MEP engineering: ASHRAE 170 HVAC, NFPA 99 medical gas, USP 800 pharmacy design. Iowa health-facility plan review, handled start to finish.",
    h1: "Iowa Hospital MEP Design: Engineering Services & Plan Review",
    directAnswer: "Apex Grid Engineering provides hospital MEP design in Iowa — HVAC to ASHRAE 170, NFPA 99 medical gas, USP 800 pharmacy, and emergency power — for University of Iowa Health Care in Iowa City, UnityPoint Health in Des Moines, MercyOne in Des Moines, with Iowa plan-review support.",
    answer: "Iowa is a tale of two anchors: University of Iowa Health Care in Iowa City — #1 in the state 37 straight years with its only nationally ranked adult specialties — and Des Moines' UnityPoint/MercyOne duopoly, with UnityPoint's 32-hospital footprint headquartered there.\n\nIowa hospital projects are reviewed by the Iowa Department of Health and Human Services' facility program, with the state fire marshal reviewing life safety. That review shapes the engineering from the first drawing: ventilation schedules proving every space's air changes and pressure relationships, medical gas risers with zone valves and alarms, and essential-electrical one-lines the reviewer can trace.\n\nAcademic-meets-community engineering: Iowa City's quaternary complexity alongside Des Moines' community-system efficiency work, with winter-hardened envelopes across the board. Apex designs for that reality — and for the schedule. Health systems expanding in Iowa get schedule-driven delivery: early reviewer engagement, submittals built for the checklist, and comment responses in days, not weeks.",
    sections: [
      {
        h2: "Surgical suites and sterile processing in Iowa",
        body: "Surgical capacity is the economic engine of Iowa hospitals — from University of Iowa Health Care's operating rooms to ambulatory surgery centers across the state — and its MEP design is unforgiving. Each OR needs 20 total air changes per hour, positive pressure to the corridor, HEPA-filtered supply, and N+1 redundancy on the air-handling so a fan failure never cancels a case. Sterile processing departments need their own pressure cascade: decontamination negative, clean workroom positive, sterilizer rooms exhausted. Medical gas zone valves sit outside every OR suite with area alarms at the nurses' station. We design surgical MEP for the survey as well as the surgery: Joint Commission and CMS surveyors trace pressure relationships, humidity logs, and medical gas alarms on every visit.",
      },
      {
        h2: "Pharmacy, lab, and specialty spaces in Iowa",
        body: "Beyond the bed tower, Iowa health systems are building the specialty spaces that carry modern care: USP 800 hazardous-drug compounding suites with negative-pressure C-SECs at 30 air changes per hour and externally vented C-PEC hoods; USP 797 sterile compounding with ISO-classified buffer and ante areas; BSL-2 and BSL-3 laboratories with directional airflow, single-pass exhaust, and sealed penetrations; and vivarium facilities with 10 to 15 air changes per hour and tight temperature and humidity control. Each carries its own code regime — state pharmacy board, CDC biosafety, AAALAC — and each gets dedicated HVAC, monitoring, and alarming independent of the building's comfort systems.",
      },
      {
        h2: "Renovating occupied Iowa hospitals",
        body: "Most Iowa hospital work is renovation inside fully operational buildings — a new OR at University of Iowa Health Care, an ED expansion, a pharmacy brought up to USP 800. Our construction documents carry ICRA 2.0 infection-control risk assessments matched to the work: Class I through V precautions, dust-tight barriers with negative-pressure containment, HEPA-filtered exhaust, sealed penetrations, and traffic patterns that keep construction crews out of patient corridors. Shutdowns are sequenced — med gas, normal power, HVAC — with temporary systems bridging every outage and life-safety maintained throughout. The facility's infection preventionist approves the ICRA plan before work starts because it is on the drawings, not in a memo afterward.",
      },
      {
        h2: "Emergency power and medical gas across Iowa",
        body: "Every Iowa hospital depends on systems patients never see. The essential electrical system — life safety, critical, and equipment branches per NFPA 99 — rides on generators that start within 10 seconds, with selective coordination, load-shed sequencing, and monthly NFPA 110 testing baked into the design. Medical gas piping runs zoned and alarmed: oxygen, medical air, nitrous oxide, vacuum, and waste anesthetic gas with area zone valves outside each critical-care zone and master alarms where staff always watch. Academic-meets-community engineering: Iowa City's quaternary complexity alongside Des Moines' community-system efficiency work, with winter-hardened envelopes across the board.",
      },
    ],
    faqs: [
      {
        question: "Which health systems drive hospital construction in Iowa?",
        answer: "The major owners are University of Iowa Health Care (Iowa City); UnityPoint Health (Des Moines); MercyOne (Des Moines); UnityPoint St. Luke's (Cedar Rapids). We design for health-system standards as well as one-off projects, so a system's MEP criteria carry across its campuses.",
      },
      {
        question: "How does Iowa review hospital construction plans?",
        answer: "Iowa hospital projects are reviewed by the Iowa Department of Health and Human Services' facility program, with the state fire marshal reviewing life safety. We build the submittal for that reviewer's checklist and resolve comments fast.",
      },
      {
        question: "What does ICRA require during hospital renovation?",
        answer: "The ICRA 2.0 process classifies construction activity (Type A through D) and patient risk groups, then assigns precautions Class I through V: dust-tight barriers, negative-pressure containment with HEPA-filtered exhaust, sealed penetrations, debris handling in covered containers, and traffic patterns separated from patient care. The ICRA matrix and barrier plan belong in the construction documents for plan review and the facility's infection preventionist.",
      },
      {
        question: "How long does healthcare plan review take?",
        answer: "It depends on the state. Standard health-department facility review runs 4 to 12 weeks in most states; California HCAI review runs longer with its seismic program; certificate-of-need states add months before design review even begins. We compress the timeline with early AHJ engagement, submittals built for the reviewer's checklist, and comment responses turned in days.",
      },
    ],
    founderNote: founderNote,
    extraLinks: [
      { text: "Hospital MEP Engineering in Des Moines, IA", href: "/healthcare-design/iowa/des-moines/" },
      { text: "Hospital MEP Engineering in Iowa City, IA", href: "/healthcare-design/iowa/iowa-city/" },
      { text: "Hospital MEP Engineering in Cedar Rapids, IA", href: "/healthcare-design/iowa/cedar-rapids/" },
      { text: "Hospital MEP Engineering in Davenport, IA", href: "/healthcare-design/iowa/davenport/" },
      { text: "Hospital MEP Engineering in Sioux City, IA", href: "/healthcare-design/iowa/sioux-city/" },
      { text: "Hospital MEP Engineering in Waterloo, IA", href: "/healthcare-design/iowa/waterloo/" },
      { text: "Hospital MEP Engineering in Ames, IA", href: "/healthcare-design/iowa/ames/" },
      { text: "What Are ASHRAE 170 Ventilation Requirements?", href: "/answers/healthcare-ashrae-170-ventilation-requirements/" },
      { text: "How Much Does Hospital MEP Design Cost?", href: "/answers/healthcare-hospital-mep-design-cost/" },
      { text: "MEP Engineering Services", href: "/mep-engineering/" },
      { text: "Mechanical Engineering", href: "/mechanical-engineering/" },
      { text: "Electrical Engineering", href: "/electrical-engineering/" },
      { text: "Healthcare Industry Practice", href: "/industries/healthcare/" },
      { text: "Get a Healthcare Engineering Estimate", href: "/estimate" },
    ],
  },
  {
    slug: "healthcare-design/kansas",
    title: "Hospital MEP Design in Kansas: Engineering & Plan Review",
    description: "Kansas hospital MEP engineering: ASHRAE 170 HVAC, NFPA 99 medical gas, USP 800 pharmacy design. Kansas plan-review support and schedule-driven delivery.",
    h1: "Hospital MEP Design in Kansas: Engineering & Plan Review",
    directAnswer: "Apex Grid Engineering provides hospital MEP design in Kansas — HVAC to ASHRAE 170, NFPA 99 medical gas, USP 800 pharmacy, and emergency power — for The University of Kansas Health System in Kansas City, Ascension Via Christi in Wichita, Wesley Medical Center in Wichita, with Kansas plan-review support.",
    answer: "Kansas healthcare splits between the Kansas City metro — The University of Kansas Health System (900+ beds, the state's only academic center, #1 ranked) — and Wichita, where Ascension Via Christi (the state's largest provider) and HCA's Wesley Medical Center compete.\n\nKansas hospital construction is reviewed by the Kansas Department of Health and Environment's facility program, with the state fire marshal reviewing life-safety systems. That review shapes the engineering from the first drawing: ventilation schedules proving every space's air changes and pressure relationships, medical gas risers with zone valves and alarms, and essential-electrical one-lines the reviewer can trace.\n\nTornado-alley resilience: Kansas hospital design emphasizes storm shelters, hardened emergency departments, and utility redundancy for severe-weather events. Apex designs for that reality — and for the schedule. Health systems expanding in Kansas get schedule-driven delivery: early reviewer engagement, submittals built for the checklist, and comment responses in days, not weeks.",
    sections: [
      {
        h2: "Pharmacy, lab, and specialty spaces in Kansas",
        body: "Beyond the bed tower, Kansas health systems are building the specialty spaces that carry modern care: USP 800 hazardous-drug compounding suites with negative-pressure C-SECs at 30 air changes per hour and externally vented C-PEC hoods; USP 797 sterile compounding with ISO-classified buffer and ante areas; BSL-2 and BSL-3 laboratories with directional airflow, single-pass exhaust, and sealed penetrations; and vivarium facilities with 10 to 15 air changes per hour and tight temperature and humidity control. Each carries its own code regime — state pharmacy board, CDC biosafety, AAALAC — and each gets dedicated HVAC, monitoring, and alarming independent of the building's comfort systems.",
      },
      {
        h2: "Renovating occupied Kansas hospitals",
        body: "Most Kansas hospital work is renovation inside fully operational buildings — a new OR at The University of Kansas Health System, an ED expansion, a pharmacy brought up to USP 800. Our construction documents carry ICRA 2.0 infection-control risk assessments matched to the work: Class I through V precautions, dust-tight barriers with negative-pressure containment, HEPA-filtered exhaust, sealed penetrations, and traffic patterns that keep construction crews out of patient corridors. Shutdowns are sequenced — med gas, normal power, HVAC — with temporary systems bridging every outage and life-safety maintained throughout. The facility's infection preventionist approves the ICRA plan before work starts because it is on the drawings, not in a memo afterward.",
      },
      {
        h2: "Emergency power and medical gas across Kansas",
        body: "Every Kansas hospital depends on systems patients never see. The essential electrical system — life safety, critical, and equipment branches per NFPA 99 — rides on generators that start within 10 seconds, with selective coordination, load-shed sequencing, and monthly NFPA 110 testing baked into the design. Medical gas piping runs zoned and alarmed: oxygen, medical air, nitrous oxide, vacuum, and waste anesthetic gas with area zone valves outside each critical-care zone and master alarms where staff always watch. Tornado-alley resilience: Kansas hospital design emphasizes storm shelters, hardened emergency departments, and utility redundancy for severe-weather events.",
      },
      {
        h2: "Clinical-space HVAC for Kansas hospitals",
        body: "Hospital HVAC in Kansas is designed space by space to ASHRAE 170. Operating rooms hold positive pressure at 20 air changes per hour with temperature between 68 and 75 degrees and relative humidity between 20 and 60 percent, delivered through low-velocity diffuser arrays that sweep contaminants away from the sterile field. Airborne-infection isolation rooms reverse the relationship — negative pressure at 12 ACH with anterooms and continuous monitoring. At The University of Kansas Health System in Kansas City and Ascension Via Christi in Wichita, these pressure relationships are the first thing plan reviewers verify, and the building automation system proves them around the clock. Tornado-alley resilience: Kansas hospital design emphasizes storm shelters, hardened emergency departments, and utility redundancy for severe-weather events.",
      },
    ],
    faqs: [
      {
        question: "Which health systems drive hospital construction in Kansas?",
        answer: "The major owners are The University of Kansas Health System (Kansas City); Ascension Via Christi (Wichita); Wesley Medical Center (Wichita); Stormont Vail Health (Topeka). We design for health-system standards as well as one-off projects, so a system's MEP criteria carry across its campuses.",
      },
      {
        question: "How does Kansas review hospital construction plans?",
        answer: "Kansas hospital construction is reviewed by the Kansas Department of Health and Environment's facility program, with the state fire marshal reviewing life-safety systems. We build the submittal for that reviewer's checklist and resolve comments fast.",
      },
      {
        question: "What emergency power do hospitals require?",
        answer: "Hospitals require an essential electrical system per NFPA 99: life safety, critical, and equipment branches served by on-site generators that start and assume load within 10 seconds of a normal-power failure. NFPA 110 governs the generator installation, fuel supply, and monthly testing. Critical branch loads — ORs, ICUs, emergency departments — transfer automatically; the design must prove selective coordination and load-shed sequencing.",
      },
      {
        question: "What pressure relationships do hospital rooms need?",
        answer: "Operating rooms and protective-environment rooms run positive to adjacent spaces to keep contaminants out; airborne-infection isolation rooms, USP 800 compounding rooms, and soiled utility rooms run negative to contain contaminants. Anterooms buffer the transition. Each relationship is continuously monitored and alarmed through the building automation system, and the pressure map is part of the plan-review submittal.",
      },
    ],
    founderNote: founderNote,
    extraLinks: [
      { text: "Hospital MEP Engineering in Kansas City, KS", href: "/healthcare-design/kansas/kansas-city/" },
      { text: "Hospital MEP Engineering in Wichita, KS", href: "/healthcare-design/kansas/wichita/" },
      { text: "Hospital MEP Engineering in Overland Park, KS", href: "/healthcare-design/kansas/overland-park/" },
      { text: "Hospital MEP Engineering in Topeka, KS", href: "/healthcare-design/kansas/topeka/" },
      { text: "Hospital MEP Engineering in Lawrence, KS", href: "/healthcare-design/kansas/lawrence/" },
      { text: "Hospital MEP Engineering in Olathe, KS", href: "/healthcare-design/kansas/olathe/" },
      { text: "What Are ASHRAE 170 Ventilation Requirements?", href: "/answers/healthcare-ashrae-170-ventilation-requirements/" },
      { text: "How Much Does Hospital MEP Design Cost?", href: "/answers/healthcare-hospital-mep-design-cost/" },
      { text: "MEP Engineering Services", href: "/mep-engineering/" },
      { text: "Mechanical Engineering", href: "/mechanical-engineering/" },
      { text: "Electrical Engineering", href: "/electrical-engineering/" },
      { text: "Healthcare Industry Practice", href: "/industries/healthcare/" },
      { text: "Get a Healthcare Engineering Estimate", href: "/estimate" },
    ],
  },
  {
    slug: "healthcare-design/kentucky",
    title: "Hospital MEP Design in Kentucky: Engineering & Plan Review",
    description: "Kentucky hospital MEP engineering: ASHRAE 170 HVAC, NFPA 99 medical gas, USP 800 pharmacy design. Kentucky plan-review support and schedule-driven delivery.",
    h1: "Hospital MEP Design in Kentucky: Engineering & Plan Review",
    directAnswer: "Apex Grid Engineering provides hospital MEP design in Kentucky — HVAC to ASHRAE 170, NFPA 99 medical gas, USP 800 pharmacy, and emergency power — for UK HealthCare Albert B. Chandler Hospital in Lexington, Norton Healthcare in Louisville, Baptist Health in Louisville, with Kentucky plan-review support.",
    answer: "Kentucky's market pivots on Lexington's UK Chandler Hospital — 1,142 beds, #1 in the state, home to Kentucky's only NCI-designated cancer center — and Louisville's Norton/Baptist/UofL Health triangle, with St. Elizabeth anchoring the Cincinnati-adjacent north.\n\nKentucky hospital projects require certificate-of-need approval through the Cabinet for Health and Family Services, plus facility plan review. That review shapes the engineering from the first drawing: ventilation schedules proving every space's air changes and pressure relationships, medical gas risers with zone valves and alarms, and essential-electrical one-lines the reviewer can trace.\n\nKentucky's CON process plus academic-cancer-center complexity: Markey's NCI designation drives specialized lab, pharmacy, and shielding work across the Lexington market. Apex designs for that reality — and for the schedule. Health systems expanding in Kentucky get schedule-driven delivery: early reviewer engagement, submittals built for the checklist, and comment responses in days, not weeks.",
    sections: [
      {
        h2: "Renovating occupied Kentucky hospitals",
        body: "Most Kentucky hospital work is renovation inside fully operational buildings — a new OR at UK HealthCare Albert B. Chandler Hospital, an ED expansion, a pharmacy brought up to USP 800. Our construction documents carry ICRA 2.0 infection-control risk assessments matched to the work: Class I through V precautions, dust-tight barriers with negative-pressure containment, HEPA-filtered exhaust, sealed penetrations, and traffic patterns that keep construction crews out of patient corridors. Shutdowns are sequenced — med gas, normal power, HVAC — with temporary systems bridging every outage and life-safety maintained throughout. The facility's infection preventionist approves the ICRA plan before work starts because it is on the drawings, not in a memo afterward.",
      },
      {
        h2: "Emergency power and medical gas across Kentucky",
        body: "Every Kentucky hospital depends on systems patients never see. The essential electrical system — life safety, critical, and equipment branches per NFPA 99 — rides on generators that start within 10 seconds, with selective coordination, load-shed sequencing, and monthly NFPA 110 testing baked into the design. Medical gas piping runs zoned and alarmed: oxygen, medical air, nitrous oxide, vacuum, and waste anesthetic gas with area zone valves outside each critical-care zone and master alarms where staff always watch. Kentucky's CON process plus academic-cancer-center complexity: Markey's NCI designation drives specialized lab, pharmacy, and shielding work across the Lexington market.",
      },
      {
        h2: "Clinical-space HVAC for Kentucky hospitals",
        body: "Hospital HVAC in Kentucky is designed space by space to ASHRAE 170. Operating rooms hold positive pressure at 20 air changes per hour with temperature between 68 and 75 degrees and relative humidity between 20 and 60 percent, delivered through low-velocity diffuser arrays that sweep contaminants away from the sterile field. Airborne-infection isolation rooms reverse the relationship — negative pressure at 12 ACH with anterooms and continuous monitoring. At UK HealthCare Albert B. Chandler Hospital in Lexington and Norton Healthcare in Louisville, these pressure relationships are the first thing plan reviewers verify, and the building automation system proves them around the clock. Kentucky's CON process plus academic-cancer-center complexity: Markey's NCI designation drives specialized lab, pharmacy, and shielding work across the Lexington market.",
      },
      {
        h2: "Kentucky health-facility plan review, handled",
        body: "Kentucky hospital projects require certificate-of-need approval through the Cabinet for Health and Family Services, plus facility plan review. Our submittals are built for the reviewer's checklist: FGI Guidelines compliance narratives, ASHRAE 170 ventilation schedules with every space's air changes, outdoor air, pressure relationship, temperature, humidity, and filtration listed, NFPA 99 medical gas riser diagrams with zone valves and alarms, and essential-electrical one-lines showing the life safety, critical, and equipment branches. We engage the reviewer early, answer comments in days, and keep the project moving — because a health system's opening date is a clinical commitment, not a suggestion.",
      },
    ],
    faqs: [
      {
        question: "Which health systems drive hospital construction in Kentucky?",
        answer: "The major owners are UK HealthCare Albert B. Chandler Hospital (Lexington); Norton Healthcare (Louisville); Baptist Health (Louisville); St. Elizabeth Healthcare (Edgewood). We design for health-system standards as well as one-off projects, so a system's MEP criteria carry across its campuses.",
      },
      {
        question: "How does Kentucky review hospital construction plans?",
        answer: "Kentucky hospital projects require certificate-of-need approval through the Cabinet for Health and Family Services, plus facility plan review. We build the submittal for that reviewer's checklist and resolve comments fast.",
      },
      {
        question: "What ventilation rates does ASHRAE 170 require?",
        answer: "ASHRAE Standard 170 sets ventilation by space type: operating rooms need 20 total air changes per hour at positive pressure, trauma rooms 15 ACH, airborne-infection isolation rooms 12 ACH at negative pressure, protective-environment rooms 12 ACH at positive pressure, and patient rooms 6 ACH with 2 ACH of outdoor air. Temperature and humidity ranges are specified per space, and the standard is enforced through state health-department plan review.",
      },
      {
        question: "How are medical gas systems designed under NFPA 99?",
        answer: "NFPA 99 categorizes health care facilities by risk (Category 1 through 4) and governs medical gas and vacuum systems accordingly: zoned piping with area zone valves outside each critical-care zone, source equipment with automatic changeover, master and area alarms at attended locations, labeled outlets, and third-party certification testing before the system goes live. The medical gas design is a dedicated plan-review item in most states.",
      },
    ],
    founderNote: founderNote,
    extraLinks: [
      { text: "Hospital MEP Engineering in Louisville, KY", href: "/healthcare-design/kentucky/louisville/" },
      { text: "Hospital MEP Engineering in Lexington, KY", href: "/healthcare-design/kentucky/lexington/" },
      { text: "Hospital MEP Engineering in Covington, KY", href: "/healthcare-design/kentucky/covington/" },
      { text: "Hospital MEP Engineering in Bowling Green, KY", href: "/healthcare-design/kentucky/bowling-green/" },
      { text: "Hospital MEP Engineering in Owensboro, KY", href: "/healthcare-design/kentucky/owensboro/" },
      { text: "Hospital MEP Engineering in Paducah, KY", href: "/healthcare-design/kentucky/paducah/" },
      { text: "What Are ASHRAE 170 Ventilation Requirements?", href: "/answers/healthcare-ashrae-170-ventilation-requirements/" },
      { text: "How Much Does Hospital MEP Design Cost?", href: "/answers/healthcare-hospital-mep-design-cost/" },
      { text: "MEP Engineering Services", href: "/mep-engineering/" },
      { text: "Mechanical Engineering", href: "/mechanical-engineering/" },
      { text: "Electrical Engineering", href: "/electrical-engineering/" },
      { text: "Healthcare Industry Practice", href: "/industries/healthcare/" },
      { text: "Get a Healthcare Engineering Estimate", href: "/estimate" },
    ],
  },
  {
    slug: "healthcare-design/louisiana",
    title: "Hospital MEP Design in Louisiana: Engineering & Plan Review",
    description: "Louisiana hospital MEP engineering: ASHRAE 170 HVAC, NFPA 99 medical gas, USP 800 pharmacy design. Louisiana plan-review support and schedule-driven delivery.",
    h1: "Hospital MEP Design in Louisiana: Engineering & Plan Review",
    directAnswer: "Apex Grid Engineering provides hospital MEP design in Louisiana — HVAC to ASHRAE 170, NFPA 99 medical gas, USP 800 pharmacy, and emergency power — for Ochsner Medical Center in New Orleans, Our Lady of the Lake Regional Medical Center in Baton Rouge, LCMC Health in New Orleans, with Louisiana plan-review support.",
    answer: "Louisiana healthcare is New Orleans- and Baton Rouge-centric: Ochsner Medical Center (#1 in the state) and LCMC Health in New Orleans, Our Lady of the Lake's 900-bed Baton Rouge campus — all designed around hurricane resilience after Katrina rewrote the state's expectations.\n\nLouisiana hospital construction is reviewed by the Louisiana Department of Health's facility program, with strict emergency-preparedness requirements shaped by hurricane history. That review shapes the engineering from the first drawing: ventilation schedules proving every space's air changes and pressure relationships, medical gas risers with zone valves and alarms, and essential-electrical one-lines the reviewer can trace.\n\nPost-Katrina hardening is the Louisiana standard: elevated emergency power, flood-proofed critical systems, and HVAC that holds through extended grid outages. Apex designs for that reality — and for the schedule. Health systems expanding in Louisiana get schedule-driven delivery: early reviewer engagement, submittals built for the checklist, and comment responses in days, not weeks.",
    sections: [
      {
        h2: "Emergency power and medical gas across Louisiana",
        body: "Every Louisiana hospital depends on systems patients never see. The essential electrical system — life safety, critical, and equipment branches per NFPA 99 — rides on generators that start within 10 seconds, with selective coordination, load-shed sequencing, and monthly NFPA 110 testing baked into the design. Medical gas piping runs zoned and alarmed: oxygen, medical air, nitrous oxide, vacuum, and waste anesthetic gas with area zone valves outside each critical-care zone and master alarms where staff always watch. Post-Katrina hardening is the Louisiana standard: elevated emergency power, flood-proofed critical systems, and HVAC that holds through extended grid outages.",
      },
      {
        h2: "Clinical-space HVAC for Louisiana hospitals",
        body: "Hospital HVAC in Louisiana is designed space by space to ASHRAE 170. Operating rooms hold positive pressure at 20 air changes per hour with temperature between 68 and 75 degrees and relative humidity between 20 and 60 percent, delivered through low-velocity diffuser arrays that sweep contaminants away from the sterile field. Airborne-infection isolation rooms reverse the relationship — negative pressure at 12 ACH with anterooms and continuous monitoring. At Ochsner Medical Center in New Orleans and Our Lady of the Lake Regional Medical Center in Baton Rouge, these pressure relationships are the first thing plan reviewers verify, and the building automation system proves them around the clock. Post-Katrina hardening is the Louisiana standard: elevated emergency power, flood-proofed critical systems, and HVAC that holds through extended grid outages.",
      },
      {
        h2: "Louisiana health-facility plan review, handled",
        body: "Louisiana hospital construction is reviewed by the Louisiana Department of Health's facility program, with strict emergency-preparedness requirements shaped by hurricane history. Our submittals are built for the reviewer's checklist: FGI Guidelines compliance narratives, ASHRAE 170 ventilation schedules with every space's air changes, outdoor air, pressure relationship, temperature, humidity, and filtration listed, NFPA 99 medical gas riser diagrams with zone valves and alarms, and essential-electrical one-lines showing the life safety, critical, and equipment branches. We engage the reviewer early, answer comments in days, and keep the project moving — because a health system's opening date is a clinical commitment, not a suggestion.",
      },
      {
        h2: "Surgical suites and sterile processing in Louisiana",
        body: "Surgical capacity is the economic engine of Louisiana hospitals — from Ochsner Medical Center's operating rooms to ambulatory surgery centers across the state — and its MEP design is unforgiving. Each OR needs 20 total air changes per hour, positive pressure to the corridor, HEPA-filtered supply, and N+1 redundancy on the air-handling so a fan failure never cancels a case. Sterile processing departments need their own pressure cascade: decontamination negative, clean workroom positive, sterilizer rooms exhausted. Medical gas zone valves sit outside every OR suite with area alarms at the nurses' station. We design surgical MEP for the survey as well as the surgery: Joint Commission and CMS surveyors trace pressure relationships, humidity logs, and medical gas alarms on every visit.",
      },
    ],
    faqs: [
      {
        question: "Which health systems drive hospital construction in Louisiana?",
        answer: "The major owners are Ochsner Medical Center (New Orleans); Our Lady of the Lake Regional Medical Center (Baton Rouge); LCMC Health (New Orleans); Willis-Knighton Health System (Shreveport). We design for health-system standards as well as one-off projects, so a system's MEP criteria carry across its campuses.",
      },
      {
        question: "How does Louisiana review hospital construction plans?",
        answer: "Louisiana hospital construction is reviewed by the Louisiana Department of Health's facility program, with strict emergency-preparedness requirements shaped by hurricane history. We build the submittal for that reviewer's checklist and resolve comments fast.",
      },
      {
        question: "What is USP 800 and which facilities need it?",
        answer: "USP General Chapter 800 governs the handling of hazardous drugs in healthcare settings. Facilities that compound or handle hazardous drugs — hospital pharmacies, oncology infusion pharmacies, veterinary compounding — need a containment suite: a negative-pressure secondary engineering control (C-SEC) at -0.01 to -0.03 inches water column, externally vented primary controls (C-PEC), 30 air changes per hour, and strict temperature and humidity control. State boards of pharmacy enforce it.",
      },
      {
        question: "How much does hospital MEP engineering cost?",
        answer: "Hospital MEP engineering fees typically run 6 to 10 percent of the MEP construction value. Since MEP systems represent 30 to 45 percent of total hospital construction — and new acute-care hospitals cost $600 to over $1,000 per square foot — engineering fees generally land in the range of $15 to $45 per square foot, with surgical suites, isolation, pharmacy, and lab spaces commanding the high end.",
      },
    ],
    founderNote: founderNote,
    extraLinks: [
      { text: "Hospital MEP Engineering in New Orleans, LA", href: "/healthcare-design/louisiana/new-orleans/" },
      { text: "Hospital MEP Engineering in Baton Rouge, LA", href: "/healthcare-design/louisiana/baton-rouge/" },
      { text: "Hospital MEP Engineering in Shreveport, LA", href: "/healthcare-design/louisiana/shreveport/" },
      { text: "Hospital MEP Engineering in Lafayette, LA", href: "/healthcare-design/louisiana/lafayette/" },
      { text: "Hospital MEP Engineering in Lake Charles, LA", href: "/healthcare-design/louisiana/lake-charles/" },
      { text: "Hospital MEP Engineering in Metairie, LA", href: "/healthcare-design/louisiana/metairie/" },
      { text: "What Are ASHRAE 170 Ventilation Requirements?", href: "/answers/healthcare-ashrae-170-ventilation-requirements/" },
      { text: "How Much Does Hospital MEP Design Cost?", href: "/answers/healthcare-hospital-mep-design-cost/" },
      { text: "MEP Engineering Services", href: "/mep-engineering/" },
      { text: "Mechanical Engineering", href: "/mechanical-engineering/" },
      { text: "Electrical Engineering", href: "/electrical-engineering/" },
      { text: "Healthcare Industry Practice", href: "/industries/healthcare/" },
      { text: "Get a Healthcare Engineering Estimate", href: "/estimate" },
    ],
  },
  {
    slug: "healthcare-design/maine",
    title: "Hospital MEP Design in Maine: Engineering & Plan Review",
    description: "Maine hospital MEP engineering: ASHRAE 170 HVAC, NFPA 99 medical gas, USP 800 pharmacy design. Maine plan-review support and schedule-driven delivery.",
    h1: "Hospital MEP Design in Maine: Engineering & Plan Review",
    directAnswer: "Apex Grid Engineering provides hospital MEP design in Maine — HVAC to ASHRAE 170, NFPA 99 medical gas, USP 800 pharmacy, and emergency power — for MaineHealth Maine Medical Center in Portland, MaineHealth in Portland, Northern Light Eastern Maine Medical Center in Bangor, with Maine plan-review support.",
    answer: "Maine is a two-system state: MaineHealth — the state's largest private employer at 22,000+ workers, anchored by the 700-bed Maine Medical Center (#1 in Maine) — and Northern Light Health, anchored by Bangor's 411-bed Eastern Maine Medical Center (#2).\n\nMaine hospital projects require certificate-of-need approval through the Department of Health and Human Services, with facility licensing review. That review shapes the engineering from the first drawing: ventilation schedules proving every space's air changes and pressure relationships, medical gas risers with zone valves and alarms, and essential-electrical one-lines the reviewer can trace.\n\nRural-access engineering: Maine's dispersed population means critical-access design, telehealth-ready infrastructure, and winter-hardened facilities from Portland to Bangor. Apex designs for that reality — and for the schedule. Health systems expanding in Maine get schedule-driven delivery: early reviewer engagement, submittals built for the checklist, and comment responses in days, not weeks.",
    sections: [
      {
        h2: "Clinical-space HVAC for Maine hospitals",
        body: "Hospital HVAC in Maine is designed space by space to ASHRAE 170. Operating rooms hold positive pressure at 20 air changes per hour with temperature between 68 and 75 degrees and relative humidity between 20 and 60 percent, delivered through low-velocity diffuser arrays that sweep contaminants away from the sterile field. Airborne-infection isolation rooms reverse the relationship — negative pressure at 12 ACH with anterooms and continuous monitoring. At MaineHealth Maine Medical Center in Portland and MaineHealth in Portland, these pressure relationships are the first thing plan reviewers verify, and the building automation system proves them around the clock. Rural-access engineering: Maine's dispersed population means critical-access design, telehealth-ready infrastructure, and winter-hardened facilities from Portland to Bangor.",
      },
      {
        h2: "Maine health-facility plan review, handled",
        body: "Maine hospital projects require certificate-of-need approval through the Department of Health and Human Services, with facility licensing review. Our submittals are built for the reviewer's checklist: FGI Guidelines compliance narratives, ASHRAE 170 ventilation schedules with every space's air changes, outdoor air, pressure relationship, temperature, humidity, and filtration listed, NFPA 99 medical gas riser diagrams with zone valves and alarms, and essential-electrical one-lines showing the life safety, critical, and equipment branches. We engage the reviewer early, answer comments in days, and keep the project moving — because a health system's opening date is a clinical commitment, not a suggestion.",
      },
      {
        h2: "Surgical suites and sterile processing in Maine",
        body: "Surgical capacity is the economic engine of Maine hospitals — from MaineHealth Maine Medical Center's operating rooms to ambulatory surgery centers across the state — and its MEP design is unforgiving. Each OR needs 20 total air changes per hour, positive pressure to the corridor, HEPA-filtered supply, and N+1 redundancy on the air-handling so a fan failure never cancels a case. Sterile processing departments need their own pressure cascade: decontamination negative, clean workroom positive, sterilizer rooms exhausted. Medical gas zone valves sit outside every OR suite with area alarms at the nurses' station. We design surgical MEP for the survey as well as the surgery: Joint Commission and CMS surveyors trace pressure relationships, humidity logs, and medical gas alarms on every visit.",
      },
      {
        h2: "Pharmacy, lab, and specialty spaces in Maine",
        body: "Beyond the bed tower, Maine health systems are building the specialty spaces that carry modern care: USP 800 hazardous-drug compounding suites with negative-pressure C-SECs at 30 air changes per hour and externally vented C-PEC hoods; USP 797 sterile compounding with ISO-classified buffer and ante areas; BSL-2 and BSL-3 laboratories with directional airflow, single-pass exhaust, and sealed penetrations; and vivarium facilities with 10 to 15 air changes per hour and tight temperature and humidity control. Each carries its own code regime — state pharmacy board, CDC biosafety, AAALAC — and each gets dedicated HVAC, monitoring, and alarming independent of the building's comfort systems.",
      },
    ],
    faqs: [
      {
        question: "Which health systems drive hospital construction in Maine?",
        answer: "The major owners are MaineHealth Maine Medical Center (Portland); MaineHealth (Portland); Northern Light Eastern Maine Medical Center (Bangor); Northern Light Health (Brewer). We design for health-system standards as well as one-off projects, so a system's MEP criteria carry across its campuses.",
      },
      {
        question: "How does Maine review hospital construction plans?",
        answer: "Maine hospital projects require certificate-of-need approval through the Department of Health and Human Services, with facility licensing review. We build the submittal for that reviewer's checklist and resolve comments fast.",
      },
      {
        question: "What does ICRA require during hospital renovation?",
        answer: "The ICRA 2.0 process classifies construction activity (Type A through D) and patient risk groups, then assigns precautions Class I through V: dust-tight barriers, negative-pressure containment with HEPA-filtered exhaust, sealed penetrations, debris handling in covered containers, and traffic patterns separated from patient care. The ICRA matrix and barrier plan belong in the construction documents for plan review and the facility's infection preventionist.",
      },
      {
        question: "How long does healthcare plan review take?",
        answer: "It depends on the state. Standard health-department facility review runs 4 to 12 weeks in most states; California HCAI review runs longer with its seismic program; certificate-of-need states add months before design review even begins. We compress the timeline with early AHJ engagement, submittals built for the reviewer's checklist, and comment responses turned in days.",
      },
    ],
    founderNote: founderNote,
    extraLinks: [
      { text: "Hospital MEP Engineering in Portland, ME", href: "/healthcare-design/maine/portland/" },
      { text: "Hospital MEP Engineering in Bangor, ME", href: "/healthcare-design/maine/bangor/" },
      { text: "Hospital MEP Engineering in Lewiston, ME", href: "/healthcare-design/maine/lewiston/" },
      { text: "Hospital MEP Engineering in Augusta, ME", href: "/healthcare-design/maine/augusta/" },
      { text: "Hospital MEP Engineering in Biddeford, ME", href: "/healthcare-design/maine/biddeford/" },
      { text: "What Are ASHRAE 170 Ventilation Requirements?", href: "/answers/healthcare-ashrae-170-ventilation-requirements/" },
      { text: "How Much Does Hospital MEP Design Cost?", href: "/answers/healthcare-hospital-mep-design-cost/" },
      { text: "MEP Engineering Services", href: "/mep-engineering/" },
      { text: "Mechanical Engineering", href: "/mechanical-engineering/" },
      { text: "Electrical Engineering", href: "/electrical-engineering/" },
      { text: "Healthcare Industry Practice", href: "/industries/healthcare/" },
      { text: "Get a Healthcare Engineering Estimate", href: "/estimate" },
    ],
  },
  {
    slug: "healthcare-design/maryland",
    title: "Hospital MEP Design in Maryland: Engineering & Plan Review",
    description: "Maryland hospital MEP engineering: ASHRAE 170 HVAC, NFPA 99 medical gas, USP 800 pharmacy design. Maryland plan-review support and schedule-driven delivery.",
    h1: "Hospital MEP Design in Maryland: Engineering & Plan Review",
    directAnswer: "Apex Grid Engineering provides hospital MEP design in Maryland — HVAC to ASHRAE 170, NFPA 99 medical gas, USP 800 pharmacy, and emergency power — for The Johns Hopkins Hospital in Baltimore, University of Maryland Medical System in Baltimore, MedStar Health in Columbia, with Maryland plan-review support.",
    answer: "Maryland is anchored by The Johns Hopkins Hospital (1,145 beds, #1 in the state) and the University of Maryland Medical System in Baltimore, with MedStar and LifeBridge spanning the Baltimore-Washington corridor under the nation's most rigorous CON regime.\n\nMaryland hospital projects require certificate-of-need approval through the Maryland Health Care Commission, one of the most analytically rigorous CON programs in the country. That review shapes the engineering from the first drawing: ventilation schedules proving every space's air changes and pressure relationships, medical gas risers with zone valves and alarms, and essential-electrical one-lines the reviewer can trace.\n\nMaryland's Health Care Commission runs the country's most data-driven CON process — facility planning here starts with utilization analytics and service-line justification. Apex designs for that reality — and for the schedule. Health systems expanding in Maryland get schedule-driven delivery: early reviewer engagement, submittals built for the checklist, and comment responses in days, not weeks.",
    sections: [
      {
        h2: "Maryland health-facility plan review, handled",
        body: "Maryland hospital projects require certificate-of-need approval through the Maryland Health Care Commission, one of the most analytically rigorous CON programs in the country. Our submittals are built for the reviewer's checklist: FGI Guidelines compliance narratives, ASHRAE 170 ventilation schedules with every space's air changes, outdoor air, pressure relationship, temperature, humidity, and filtration listed, NFPA 99 medical gas riser diagrams with zone valves and alarms, and essential-electrical one-lines showing the life safety, critical, and equipment branches. We engage the reviewer early, answer comments in days, and keep the project moving — because a health system's opening date is a clinical commitment, not a suggestion.",
      },
      {
        h2: "Surgical suites and sterile processing in Maryland",
        body: "Surgical capacity is the economic engine of Maryland hospitals — from The Johns Hopkins Hospital's operating rooms to ambulatory surgery centers across the state — and its MEP design is unforgiving. Each OR needs 20 total air changes per hour, positive pressure to the corridor, HEPA-filtered supply, and N+1 redundancy on the air-handling so a fan failure never cancels a case. Sterile processing departments need their own pressure cascade: decontamination negative, clean workroom positive, sterilizer rooms exhausted. Medical gas zone valves sit outside every OR suite with area alarms at the nurses' station. We design surgical MEP for the survey as well as the surgery: Joint Commission and CMS surveyors trace pressure relationships, humidity logs, and medical gas alarms on every visit.",
      },
      {
        h2: "Pharmacy, lab, and specialty spaces in Maryland",
        body: "Beyond the bed tower, Maryland health systems are building the specialty spaces that carry modern care: USP 800 hazardous-drug compounding suites with negative-pressure C-SECs at 30 air changes per hour and externally vented C-PEC hoods; USP 797 sterile compounding with ISO-classified buffer and ante areas; BSL-2 and BSL-3 laboratories with directional airflow, single-pass exhaust, and sealed penetrations; and vivarium facilities with 10 to 15 air changes per hour and tight temperature and humidity control. Each carries its own code regime — state pharmacy board, CDC biosafety, AAALAC — and each gets dedicated HVAC, monitoring, and alarming independent of the building's comfort systems.",
      },
      {
        h2: "Renovating occupied Maryland hospitals",
        body: "Most Maryland hospital work is renovation inside fully operational buildings — a new OR at The Johns Hopkins Hospital, an ED expansion, a pharmacy brought up to USP 800. Our construction documents carry ICRA 2.0 infection-control risk assessments matched to the work: Class I through V precautions, dust-tight barriers with negative-pressure containment, HEPA-filtered exhaust, sealed penetrations, and traffic patterns that keep construction crews out of patient corridors. Shutdowns are sequenced — med gas, normal power, HVAC — with temporary systems bridging every outage and life-safety maintained throughout. The facility's infection preventionist approves the ICRA plan before work starts because it is on the drawings, not in a memo afterward.",
      },
    ],
    faqs: [
      {
        question: "Which health systems drive hospital construction in Maryland?",
        answer: "The major owners are The Johns Hopkins Hospital (Baltimore); University of Maryland Medical System (Baltimore); MedStar Health (Columbia); LifeBridge Health (Baltimore). We design for health-system standards as well as one-off projects, so a system's MEP criteria carry across its campuses.",
      },
      {
        question: "How does Maryland review hospital construction plans?",
        answer: "Maryland hospital projects require certificate-of-need approval through the Maryland Health Care Commission, one of the most analytically rigorous CON programs in the country. We build the submittal for that reviewer's checklist and resolve comments fast.",
      },
      {
        question: "What emergency power do hospitals require?",
        answer: "Hospitals require an essential electrical system per NFPA 99: life safety, critical, and equipment branches served by on-site generators that start and assume load within 10 seconds of a normal-power failure. NFPA 110 governs the generator installation, fuel supply, and monthly testing. Critical branch loads — ORs, ICUs, emergency departments — transfer automatically; the design must prove selective coordination and load-shed sequencing.",
      },
      {
        question: "What pressure relationships do hospital rooms need?",
        answer: "Operating rooms and protective-environment rooms run positive to adjacent spaces to keep contaminants out; airborne-infection isolation rooms, USP 800 compounding rooms, and soiled utility rooms run negative to contain contaminants. Anterooms buffer the transition. Each relationship is continuously monitored and alarmed through the building automation system, and the pressure map is part of the plan-review submittal.",
      },
    ],
    founderNote: founderNote,
    extraLinks: [
      { text: "Hospital MEP Engineering in Baltimore, MD", href: "/healthcare-design/maryland/baltimore/" },
      { text: "Hospital MEP Engineering in Columbia, MD", href: "/healthcare-design/maryland/columbia/" },
      { text: "Hospital MEP Engineering in Annapolis, MD", href: "/healthcare-design/maryland/annapolis/" },
      { text: "Hospital MEP Engineering in Towson, MD", href: "/healthcare-design/maryland/towson/" },
      { text: "Hospital MEP Engineering in Frederick, MD", href: "/healthcare-design/maryland/frederick/" },
      { text: "Hospital MEP Engineering in Silver Spring, MD", href: "/healthcare-design/maryland/silver-spring/" },
      { text: "Hospital MEP Engineering in Bethesda, MD", href: "/healthcare-design/maryland/bethesda/" },
      { text: "What Are ASHRAE 170 Ventilation Requirements?", href: "/answers/healthcare-ashrae-170-ventilation-requirements/" },
      { text: "How Much Does Hospital MEP Design Cost?", href: "/answers/healthcare-hospital-mep-design-cost/" },
      { text: "MEP Engineering Services", href: "/mep-engineering/" },
      { text: "Mechanical Engineering", href: "/mechanical-engineering/" },
      { text: "Electrical Engineering", href: "/electrical-engineering/" },
      { text: "Healthcare Industry Practice", href: "/industries/healthcare/" },
      { text: "Get a Healthcare Engineering Estimate", href: "/estimate" },
    ],
  },
  {
    slug: "healthcare-design/massachusetts",
    title: "Hospital MEP Design in Massachusetts: Engineering & Plan Review",
    description: "Massachusetts hospital MEP engineering: ASHRAE 170 HVAC, NFPA 99 medical gas, USP 800 pharmacy design. Massachusetts plan-review support, delivered fast.",
    h1: "Hospital MEP Design in Massachusetts: Engineering & Plan Review",
    directAnswer: "Apex Grid Engineering provides hospital MEP design in Massachusetts — HVAC to ASHRAE 170, NFPA 99 medical gas, USP 800 pharmacy, and emergency power — for Massachusetts General Hospital in Boston, Brigham and Women's Hospital in Boston, Beth Israel Lahey Health in Cambridge, with Massachusetts plan-review support.",
    answer: "Massachusetts is the densest academic-medicine market in America: Mass General (1,059 beds) and Brigham and Women's tied at #1, with Beth Israel Lahey, UMass Memorial in Worcester, and Baystate in Springfield completing statewide coverage.\n\nMassachusetts hospital projects require Determination of Need (DoN) approval through the Department of Public Health — the state's version of certificate of need. That review shapes the engineering from the first drawing: ventilation schedules proving every space's air changes and pressure relationships, medical gas risers with zone valves and alarms, and essential-electrical one-lines the reviewer can trace.\n\nBoston's Longwood and downtown campuses are vertical, land-locked, and perpetually under construction — ICRA-phased renovation and vertical-expansion engineering are the core skills. Apex designs for that reality — and for the schedule. Health systems expanding in Massachusetts get schedule-driven delivery: early reviewer engagement, submittals built for the checklist, and comment responses in days, not weeks.",
    sections: [
      {
        h2: "Surgical suites and sterile processing in Massachusetts",
        body: "Surgical capacity is the economic engine of Massachusetts hospitals — from Massachusetts General Hospital's operating rooms to ambulatory surgery centers across the state — and its MEP design is unforgiving. Each OR needs 20 total air changes per hour, positive pressure to the corridor, HEPA-filtered supply, and N+1 redundancy on the air-handling so a fan failure never cancels a case. Sterile processing departments need their own pressure cascade: decontamination negative, clean workroom positive, sterilizer rooms exhausted. Medical gas zone valves sit outside every OR suite with area alarms at the nurses' station. We design surgical MEP for the survey as well as the surgery: Joint Commission and CMS surveyors trace pressure relationships, humidity logs, and medical gas alarms on every visit.",
      },
      {
        h2: "Pharmacy, lab, and specialty spaces in Massachusetts",
        body: "Beyond the bed tower, Massachusetts health systems are building the specialty spaces that carry modern care: USP 800 hazardous-drug compounding suites with negative-pressure C-SECs at 30 air changes per hour and externally vented C-PEC hoods; USP 797 sterile compounding with ISO-classified buffer and ante areas; BSL-2 and BSL-3 laboratories with directional airflow, single-pass exhaust, and sealed penetrations; and vivarium facilities with 10 to 15 air changes per hour and tight temperature and humidity control. Each carries its own code regime — state pharmacy board, CDC biosafety, AAALAC — and each gets dedicated HVAC, monitoring, and alarming independent of the building's comfort systems.",
      },
      {
        h2: "Renovating occupied Massachusetts hospitals",
        body: "Most Massachusetts hospital work is renovation inside fully operational buildings — a new OR at Massachusetts General Hospital, an ED expansion, a pharmacy brought up to USP 800. Our construction documents carry ICRA 2.0 infection-control risk assessments matched to the work: Class I through V precautions, dust-tight barriers with negative-pressure containment, HEPA-filtered exhaust, sealed penetrations, and traffic patterns that keep construction crews out of patient corridors. Shutdowns are sequenced — med gas, normal power, HVAC — with temporary systems bridging every outage and life-safety maintained throughout. The facility's infection preventionist approves the ICRA plan before work starts because it is on the drawings, not in a memo afterward.",
      },
      {
        h2: "Emergency power and medical gas across Massachusetts",
        body: "Every Massachusetts hospital depends on systems patients never see. The essential electrical system — life safety, critical, and equipment branches per NFPA 99 — rides on generators that start within 10 seconds, with selective coordination, load-shed sequencing, and monthly NFPA 110 testing baked into the design. Medical gas piping runs zoned and alarmed: oxygen, medical air, nitrous oxide, vacuum, and waste anesthetic gas with area zone valves outside each critical-care zone and master alarms where staff always watch. Boston's Longwood and downtown campuses are vertical, land-locked, and perpetually under construction — ICRA-phased renovation and vertical-expansion engineering are the core skills.",
      },
    ],
    faqs: [
      {
        question: "Which health systems drive hospital construction in Massachusetts?",
        answer: "The major owners are Massachusetts General Hospital (Boston); Brigham and Women's Hospital (Boston); Beth Israel Lahey Health (Cambridge); UMass Memorial Health (Worcester). We design for health-system standards as well as one-off projects, so a system's MEP criteria carry across its campuses.",
      },
      {
        question: "How does Massachusetts review hospital construction plans?",
        answer: "Massachusetts hospital projects require Determination of Need (DoN) approval through the Department of Public Health — the state's version of certificate of need. We build the submittal for that reviewer's checklist and resolve comments fast.",
      },
      {
        question: "What ventilation rates does ASHRAE 170 require?",
        answer: "ASHRAE Standard 170 sets ventilation by space type: operating rooms need 20 total air changes per hour at positive pressure, trauma rooms 15 ACH, airborne-infection isolation rooms 12 ACH at negative pressure, protective-environment rooms 12 ACH at positive pressure, and patient rooms 6 ACH with 2 ACH of outdoor air. Temperature and humidity ranges are specified per space, and the standard is enforced through state health-department plan review.",
      },
      {
        question: "How are medical gas systems designed under NFPA 99?",
        answer: "NFPA 99 categorizes health care facilities by risk (Category 1 through 4) and governs medical gas and vacuum systems accordingly: zoned piping with area zone valves outside each critical-care zone, source equipment with automatic changeover, master and area alarms at attended locations, labeled outlets, and third-party certification testing before the system goes live. The medical gas design is a dedicated plan-review item in most states.",
      },
    ],
    founderNote: founderNote,
    extraLinks: [
      { text: "Hospital MEP Engineering in Boston, MA", href: "/healthcare-design/massachusetts/boston/" },
      { text: "Hospital MEP Engineering in Worcester, MA", href: "/healthcare-design/massachusetts/worcester/" },
      { text: "Hospital MEP Engineering in Springfield, MA", href: "/healthcare-design/massachusetts/springfield/" },
      { text: "Hospital MEP Engineering in Cambridge, MA", href: "/healthcare-design/massachusetts/cambridge/" },
      { text: "Hospital MEP Engineering in Burlington, MA", href: "/healthcare-design/massachusetts/burlington/" },
      { text: "Hospital MEP Engineering in New Bedford, MA", href: "/healthcare-design/massachusetts/new-bedford/" },
      { text: "Hospital MEP Engineering in Lowell, MA", href: "/healthcare-design/massachusetts/lowell/" },
      { text: "What Are ASHRAE 170 Ventilation Requirements?", href: "/answers/healthcare-ashrae-170-ventilation-requirements/" },
      { text: "How Much Does Hospital MEP Design Cost?", href: "/answers/healthcare-hospital-mep-design-cost/" },
      { text: "MEP Engineering Services", href: "/mep-engineering/" },
      { text: "Mechanical Engineering", href: "/mechanical-engineering/" },
      { text: "Electrical Engineering", href: "/electrical-engineering/" },
      { text: "Healthcare Industry Practice", href: "/industries/healthcare/" },
      { text: "Get a Healthcare Engineering Estimate", href: "/estimate" },
    ],
  },
  {
    slug: "healthcare-design/michigan",
    title: "Hospital MEP Design in Michigan: Engineering & Plan Review",
    description: "Michigan hospital MEP engineering: ASHRAE 170 HVAC, NFPA 99 medical gas, USP 800 pharmacy design. Michigan plan-review support and schedule-driven delivery.",
    h1: "Hospital MEP Design in Michigan: Engineering & Plan Review",
    directAnswer: "Apex Grid Engineering provides hospital MEP design in Michigan — HVAC to ASHRAE 170, NFPA 99 medical gas, USP 800 pharmacy, and emergency power — for University of Michigan Health in Ann Arbor, Henry Ford Health in Detroit, Corewell Health in Grand Rapids, with Michigan plan-review support.",
    answer: "Michigan pairs Ann Arbor's University of Michigan Health (#1 in the state) with Detroit's Henry Ford (877 beds) and the statewide Corewell Health footprint — a big, competitive, CON-regulated market.\n\nMichigan hospital projects require certificate-of-need approval through the Department of Health and Human Services, with facility plan review. That review shapes the engineering from the first drawing: ventilation schedules proving every space's air changes and pressure relationships, medical gas risers with zone valves and alarms, and essential-electrical one-lines the reviewer can trace.\n\nMichigan's CON program and union-construction market reward precise phasing: hospital work here is won on ICRA planning and schedule certainty as much as on design. Apex designs for that reality — and for the schedule. Health systems expanding in Michigan get schedule-driven delivery: early reviewer engagement, submittals built for the checklist, and comment responses in days, not weeks.",
    sections: [
      {
        h2: "Pharmacy, lab, and specialty spaces in Michigan",
        body: "Beyond the bed tower, Michigan health systems are building the specialty spaces that carry modern care: USP 800 hazardous-drug compounding suites with negative-pressure C-SECs at 30 air changes per hour and externally vented C-PEC hoods; USP 797 sterile compounding with ISO-classified buffer and ante areas; BSL-2 and BSL-3 laboratories with directional airflow, single-pass exhaust, and sealed penetrations; and vivarium facilities with 10 to 15 air changes per hour and tight temperature and humidity control. Each carries its own code regime — state pharmacy board, CDC biosafety, AAALAC — and each gets dedicated HVAC, monitoring, and alarming independent of the building's comfort systems.",
      },
      {
        h2: "Renovating occupied Michigan hospitals",
        body: "Most Michigan hospital work is renovation inside fully operational buildings — a new OR at University of Michigan Health, an ED expansion, a pharmacy brought up to USP 800. Our construction documents carry ICRA 2.0 infection-control risk assessments matched to the work: Class I through V precautions, dust-tight barriers with negative-pressure containment, HEPA-filtered exhaust, sealed penetrations, and traffic patterns that keep construction crews out of patient corridors. Shutdowns are sequenced — med gas, normal power, HVAC — with temporary systems bridging every outage and life-safety maintained throughout. The facility's infection preventionist approves the ICRA plan before work starts because it is on the drawings, not in a memo afterward.",
      },
      {
        h2: "Emergency power and medical gas across Michigan",
        body: "Every Michigan hospital depends on systems patients never see. The essential electrical system — life safety, critical, and equipment branches per NFPA 99 — rides on generators that start within 10 seconds, with selective coordination, load-shed sequencing, and monthly NFPA 110 testing baked into the design. Medical gas piping runs zoned and alarmed: oxygen, medical air, nitrous oxide, vacuum, and waste anesthetic gas with area zone valves outside each critical-care zone and master alarms where staff always watch. Michigan's CON program and union-construction market reward precise phasing: hospital work here is won on ICRA planning and schedule certainty as much as on design.",
      },
      {
        h2: "Clinical-space HVAC for Michigan hospitals",
        body: "Hospital HVAC in Michigan is designed space by space to ASHRAE 170. Operating rooms hold positive pressure at 20 air changes per hour with temperature between 68 and 75 degrees and relative humidity between 20 and 60 percent, delivered through low-velocity diffuser arrays that sweep contaminants away from the sterile field. Airborne-infection isolation rooms reverse the relationship — negative pressure at 12 ACH with anterooms and continuous monitoring. At University of Michigan Health in Ann Arbor and Henry Ford Health in Detroit, these pressure relationships are the first thing plan reviewers verify, and the building automation system proves them around the clock. Michigan's CON program and union-construction market reward precise phasing: hospital work here is won on ICRA planning and schedule certainty as much as on design.",
      },
    ],
    faqs: [
      {
        question: "Which health systems drive hospital construction in Michigan?",
        answer: "The major owners are University of Michigan Health (Ann Arbor); Henry Ford Health (Detroit); Corewell Health (Grand Rapids); Trinity Health (Livonia). We design for health-system standards as well as one-off projects, so a system's MEP criteria carry across its campuses.",
      },
      {
        question: "How does Michigan review hospital construction plans?",
        answer: "Michigan hospital projects require certificate-of-need approval through the Department of Health and Human Services, with facility plan review. We build the submittal for that reviewer's checklist and resolve comments fast.",
      },
      {
        question: "What is USP 800 and which facilities need it?",
        answer: "USP General Chapter 800 governs the handling of hazardous drugs in healthcare settings. Facilities that compound or handle hazardous drugs — hospital pharmacies, oncology infusion pharmacies, veterinary compounding — need a containment suite: a negative-pressure secondary engineering control (C-SEC) at -0.01 to -0.03 inches water column, externally vented primary controls (C-PEC), 30 air changes per hour, and strict temperature and humidity control. State boards of pharmacy enforce it.",
      },
      {
        question: "How much does hospital MEP engineering cost?",
        answer: "Hospital MEP engineering fees typically run 6 to 10 percent of the MEP construction value. Since MEP systems represent 30 to 45 percent of total hospital construction — and new acute-care hospitals cost $600 to over $1,000 per square foot — engineering fees generally land in the range of $15 to $45 per square foot, with surgical suites, isolation, pharmacy, and lab spaces commanding the high end.",
      },
    ],
    founderNote: founderNote,
    extraLinks: [
      { text: "Hospital MEP Engineering in Detroit, MI", href: "/healthcare-design/michigan/detroit/" },
      { text: "Hospital MEP Engineering in Ann Arbor, MI", href: "/healthcare-design/michigan/ann-arbor/" },
      { text: "Hospital MEP Engineering in Grand Rapids, MI", href: "/healthcare-design/michigan/grand-rapids/" },
      { text: "Hospital MEP Engineering in Royal Oak, MI", href: "/healthcare-design/michigan/royal-oak/" },
      { text: "Hospital MEP Engineering in Lansing, MI", href: "/healthcare-design/michigan/lansing/" },
      { text: "Hospital MEP Engineering in Flint, MI", href: "/healthcare-design/michigan/flint/" },
      { text: "Hospital MEP Engineering in Kalamazoo, MI", href: "/healthcare-design/michigan/kalamazoo/" },
      { text: "What Are ASHRAE 170 Ventilation Requirements?", href: "/answers/healthcare-ashrae-170-ventilation-requirements/" },
      { text: "How Much Does Hospital MEP Design Cost?", href: "/answers/healthcare-hospital-mep-design-cost/" },
      { text: "MEP Engineering Services", href: "/mep-engineering/" },
      { text: "Mechanical Engineering", href: "/mechanical-engineering/" },
      { text: "Electrical Engineering", href: "/electrical-engineering/" },
      { text: "Healthcare Industry Practice", href: "/industries/healthcare/" },
      { text: "Get a Healthcare Engineering Estimate", href: "/estimate" },
    ],
  },
  {
    slug: "healthcare-design/minnesota",
    title: "Hospital MEP Design in Minnesota: Engineering & Plan Review",
    description: "Minnesota hospital MEP engineering: ASHRAE 170 HVAC, NFPA 99 medical gas, USP 800 pharmacy design. Minnesota plan-review support and schedule-driven delivery.",
    h1: "Hospital MEP Design in Minnesota: Engineering & Plan Review",
    directAnswer: "Apex Grid Engineering provides hospital MEP design in Minnesota — HVAC to ASHRAE 170, NFPA 99 medical gas, USP 800 pharmacy, and emergency power — for Mayo Clinic in Rochester, M Health Fairview in Minneapolis, Allina Health in Minneapolis, with Minnesota plan-review support.",
    answer: "Minnesota is Mayo country — Rochester's perennial national #1 with the 1,265-bed Saint Marys campus — backed by the Twin Cities' M Health Fairview/Allina duopoly and Essentia's northern anchor in Duluth.\n\nMinnesota hospital construction is reviewed by the Minnesota Department of Health's facility program; the state's hospital moratorium shapes bed-capacity planning. That review shapes the engineering from the first drawing: ventilation schedules proving every space's air changes and pressure relationships, medical gas risers with zone valves and alarms, and essential-electrical one-lines the reviewer can trace.\n\nDestination-medicine standards: Mayo's Rochester campus sets the bar for surgical-suite HVAC, isolation design, and research-lab engineering statewide. Apex designs for that reality — and for the schedule. Health systems expanding in Minnesota get schedule-driven delivery: early reviewer engagement, submittals built for the checklist, and comment responses in days, not weeks.",
    sections: [
      {
        h2: "Renovating occupied Minnesota hospitals",
        body: "Most Minnesota hospital work is renovation inside fully operational buildings — a new OR at Mayo Clinic, an ED expansion, a pharmacy brought up to USP 800. Our construction documents carry ICRA 2.0 infection-control risk assessments matched to the work: Class I through V precautions, dust-tight barriers with negative-pressure containment, HEPA-filtered exhaust, sealed penetrations, and traffic patterns that keep construction crews out of patient corridors. Shutdowns are sequenced — med gas, normal power, HVAC — with temporary systems bridging every outage and life-safety maintained throughout. The facility's infection preventionist approves the ICRA plan before work starts because it is on the drawings, not in a memo afterward.",
      },
      {
        h2: "Emergency power and medical gas across Minnesota",
        body: "Every Minnesota hospital depends on systems patients never see. The essential electrical system — life safety, critical, and equipment branches per NFPA 99 — rides on generators that start within 10 seconds, with selective coordination, load-shed sequencing, and monthly NFPA 110 testing baked into the design. Medical gas piping runs zoned and alarmed: oxygen, medical air, nitrous oxide, vacuum, and waste anesthetic gas with area zone valves outside each critical-care zone and master alarms where staff always watch. Destination-medicine standards: Mayo's Rochester campus sets the bar for surgical-suite HVAC, isolation design, and research-lab engineering statewide.",
      },
      {
        h2: "Clinical-space HVAC for Minnesota hospitals",
        body: "Hospital HVAC in Minnesota is designed space by space to ASHRAE 170. Operating rooms hold positive pressure at 20 air changes per hour with temperature between 68 and 75 degrees and relative humidity between 20 and 60 percent, delivered through low-velocity diffuser arrays that sweep contaminants away from the sterile field. Airborne-infection isolation rooms reverse the relationship — negative pressure at 12 ACH with anterooms and continuous monitoring. At Mayo Clinic in Rochester and M Health Fairview in Minneapolis, these pressure relationships are the first thing plan reviewers verify, and the building automation system proves them around the clock. Destination-medicine standards: Mayo's Rochester campus sets the bar for surgical-suite HVAC, isolation design, and research-lab engineering statewide.",
      },
      {
        h2: "Minnesota health-facility plan review, handled",
        body: "Minnesota hospital construction is reviewed by the Minnesota Department of Health's facility program; the state's hospital moratorium shapes bed-capacity planning. Our submittals are built for the reviewer's checklist: FGI Guidelines compliance narratives, ASHRAE 170 ventilation schedules with every space's air changes, outdoor air, pressure relationship, temperature, humidity, and filtration listed, NFPA 99 medical gas riser diagrams with zone valves and alarms, and essential-electrical one-lines showing the life safety, critical, and equipment branches. We engage the reviewer early, answer comments in days, and keep the project moving — because a health system's opening date is a clinical commitment, not a suggestion.",
      },
    ],
    faqs: [
      {
        question: "Which health systems drive hospital construction in Minnesota?",
        answer: "The major owners are Mayo Clinic (Rochester); M Health Fairview (Minneapolis); Allina Health (Minneapolis); Essentia Health (Duluth). We design for health-system standards as well as one-off projects, so a system's MEP criteria carry across its campuses.",
      },
      {
        question: "How does Minnesota review hospital construction plans?",
        answer: "Minnesota hospital construction is reviewed by the Minnesota Department of Health's facility program; the state's hospital moratorium shapes bed-capacity planning. We build the submittal for that reviewer's checklist and resolve comments fast.",
      },
      {
        question: "What does ICRA require during hospital renovation?",
        answer: "The ICRA 2.0 process classifies construction activity (Type A through D) and patient risk groups, then assigns precautions Class I through V: dust-tight barriers, negative-pressure containment with HEPA-filtered exhaust, sealed penetrations, debris handling in covered containers, and traffic patterns separated from patient care. The ICRA matrix and barrier plan belong in the construction documents for plan review and the facility's infection preventionist.",
      },
      {
        question: "How long does healthcare plan review take?",
        answer: "It depends on the state. Standard health-department facility review runs 4 to 12 weeks in most states; California HCAI review runs longer with its seismic program; certificate-of-need states add months before design review even begins. We compress the timeline with early AHJ engagement, submittals built for the reviewer's checklist, and comment responses turned in days.",
      },
    ],
    founderNote: founderNote,
    extraLinks: [
      { text: "Hospital MEP Engineering in Rochester, MN", href: "/healthcare-design/minnesota/rochester/" },
      { text: "Hospital MEP Engineering in Minneapolis, MN", href: "/healthcare-design/minnesota/minneapolis/" },
      { text: "Hospital MEP Engineering in St. Paul, MN", href: "/healthcare-design/minnesota/st-paul/" },
      { text: "Hospital MEP Engineering in Duluth, MN", href: "/healthcare-design/minnesota/duluth/" },
      { text: "Hospital MEP Engineering in St. Cloud, MN", href: "/healthcare-design/minnesota/st-cloud/" },
      { text: "Hospital MEP Engineering in Edina, MN", href: "/healthcare-design/minnesota/edina/" },
      { text: "What Are ASHRAE 170 Ventilation Requirements?", href: "/answers/healthcare-ashrae-170-ventilation-requirements/" },
      { text: "How Much Does Hospital MEP Design Cost?", href: "/answers/healthcare-hospital-mep-design-cost/" },
      { text: "MEP Engineering Services", href: "/mep-engineering/" },
      { text: "Mechanical Engineering", href: "/mechanical-engineering/" },
      { text: "Electrical Engineering", href: "/electrical-engineering/" },
      { text: "Healthcare Industry Practice", href: "/industries/healthcare/" },
      { text: "Get a Healthcare Engineering Estimate", href: "/estimate" },
    ],
  },
  {
    slug: "healthcare-design/mississippi",
    title: "Hospital MEP Design in Mississippi: Engineering & Plan Review",
    description: "Mississippi hospital MEP engineering: ASHRAE 170 HVAC, NFPA 99 medical gas, USP 800 pharmacy design. MS plan-review support and schedule-driven MEP delivery.",
    h1: "Hospital MEP Design in Mississippi: Engineering & Plan Review",
    directAnswer: "Apex Grid Engineering provides hospital MEP design in Mississippi — HVAC to ASHRAE 170, NFPA 99 medical gas, USP 800 pharmacy, and emergency power — for Baptist Memorial Health Care in Memphis, University of Mississippi Medical Center in Jackson, Mississippi Baptist Medical Center in Jackson, with Mississippi plan-review support.",
    answer: "Mississippi healthcare centers on Jackson — UMMC (the state's only academic center) and Mississippi Baptist Medical Center (#1 in the state) — with Baptist Memorial operating the largest hospital footprint (12 in-state hospitals) and strong regional anchors in Tupelo, Hattiesburg, and Meridian.\n\nMississippi hospital projects require certificate-of-need approval through the State Department of Health, with facility plan review. That review shapes the engineering from the first drawing: ventilation schedules proving every space's air changes and pressure relationships, medical gas risers with zone valves and alarms, and essential-electrical one-lines the reviewer can trace.\n\nRural-referral engineering: Mississippi's regional anchors in Tupelo, Hattiesburg, and Meridian need tertiary-capable design — trauma, cardiac, and NICU infrastructure far from the academic center. Apex designs for that reality — and for the schedule. Health systems expanding in Mississippi get schedule-driven delivery: early reviewer engagement, submittals built for the checklist, and comment responses in days, not weeks.",
    sections: [
      {
        h2: "Emergency power and medical gas across Mississippi",
        body: "Every Mississippi hospital depends on systems patients never see. The essential electrical system — life safety, critical, and equipment branches per NFPA 99 — rides on generators that start within 10 seconds, with selective coordination, load-shed sequencing, and monthly NFPA 110 testing baked into the design. Medical gas piping runs zoned and alarmed: oxygen, medical air, nitrous oxide, vacuum, and waste anesthetic gas with area zone valves outside each critical-care zone and master alarms where staff always watch. Rural-referral engineering: Mississippi's regional anchors in Tupelo, Hattiesburg, and Meridian need tertiary-capable design — trauma, cardiac, and NICU infrastructure far from the academic center.",
      },
      {
        h2: "Clinical-space HVAC for Mississippi hospitals",
        body: "Hospital HVAC in Mississippi is designed space by space to ASHRAE 170. Operating rooms hold positive pressure at 20 air changes per hour with temperature between 68 and 75 degrees and relative humidity between 20 and 60 percent, delivered through low-velocity diffuser arrays that sweep contaminants away from the sterile field. Airborne-infection isolation rooms reverse the relationship — negative pressure at 12 ACH with anterooms and continuous monitoring. At Baptist Memorial Health Care in Memphis and University of Mississippi Medical Center in Jackson, these pressure relationships are the first thing plan reviewers verify, and the building automation system proves them around the clock. Rural-referral engineering: Mississippi's regional anchors in Tupelo, Hattiesburg, and Meridian need tertiary-capable design — trauma, cardiac, and NICU infrastructure far from the academic center.",
      },
      {
        h2: "Mississippi health-facility plan review, handled",
        body: "Mississippi hospital projects require certificate-of-need approval through the State Department of Health, with facility plan review. Our submittals are built for the reviewer's checklist: FGI Guidelines compliance narratives, ASHRAE 170 ventilation schedules with every space's air changes, outdoor air, pressure relationship, temperature, humidity, and filtration listed, NFPA 99 medical gas riser diagrams with zone valves and alarms, and essential-electrical one-lines showing the life safety, critical, and equipment branches. We engage the reviewer early, answer comments in days, and keep the project moving — because a health system's opening date is a clinical commitment, not a suggestion.",
      },
      {
        h2: "Surgical suites and sterile processing in Mississippi",
        body: "Surgical capacity is the economic engine of Mississippi hospitals — from Baptist Memorial Health Care's operating rooms to ambulatory surgery centers across the state — and its MEP design is unforgiving. Each OR needs 20 total air changes per hour, positive pressure to the corridor, HEPA-filtered supply, and N+1 redundancy on the air-handling so a fan failure never cancels a case. Sterile processing departments need their own pressure cascade: decontamination negative, clean workroom positive, sterilizer rooms exhausted. Medical gas zone valves sit outside every OR suite with area alarms at the nurses' station. We design surgical MEP for the survey as well as the surgery: Joint Commission and CMS surveyors trace pressure relationships, humidity logs, and medical gas alarms on every visit.",
      },
    ],
    faqs: [
      {
        question: "Which health systems drive hospital construction in Mississippi?",
        answer: "The major owners are Baptist Memorial Health Care (Memphis); University of Mississippi Medical Center (Jackson); Mississippi Baptist Medical Center (Jackson); North Mississippi Health Services (Tupelo). We design for health-system standards as well as one-off projects, so a system's MEP criteria carry across its campuses.",
      },
      {
        question: "How does Mississippi review hospital construction plans?",
        answer: "Mississippi hospital projects require certificate-of-need approval through the State Department of Health, with facility plan review. We build the submittal for that reviewer's checklist and resolve comments fast.",
      },
      {
        question: "What emergency power do hospitals require?",
        answer: "Hospitals require an essential electrical system per NFPA 99: life safety, critical, and equipment branches served by on-site generators that start and assume load within 10 seconds of a normal-power failure. NFPA 110 governs the generator installation, fuel supply, and monthly testing. Critical branch loads — ORs, ICUs, emergency departments — transfer automatically; the design must prove selective coordination and load-shed sequencing.",
      },
      {
        question: "What pressure relationships do hospital rooms need?",
        answer: "Operating rooms and protective-environment rooms run positive to adjacent spaces to keep contaminants out; airborne-infection isolation rooms, USP 800 compounding rooms, and soiled utility rooms run negative to contain contaminants. Anterooms buffer the transition. Each relationship is continuously monitored and alarmed through the building automation system, and the pressure map is part of the plan-review submittal.",
      },
    ],
    founderNote: founderNote,
    extraLinks: [
      { text: "Hospital MEP Engineering in Jackson, MS", href: "/healthcare-design/mississippi/jackson/" },
      { text: "Hospital MEP Engineering in Tupelo, MS", href: "/healthcare-design/mississippi/tupelo/" },
      { text: "Hospital MEP Engineering in Gulfport, MS", href: "/healthcare-design/mississippi/gulfport/" },
      { text: "Hospital MEP Engineering in Hattiesburg, MS", href: "/healthcare-design/mississippi/hattiesburg/" },
      { text: "Hospital MEP Engineering in Meridian, MS", href: "/healthcare-design/mississippi/meridian/" },
      { text: "Hospital MEP Engineering in Southaven, MS", href: "/healthcare-design/mississippi/southaven/" },
      { text: "What Are ASHRAE 170 Ventilation Requirements?", href: "/answers/healthcare-ashrae-170-ventilation-requirements/" },
      { text: "How Much Does Hospital MEP Design Cost?", href: "/answers/healthcare-hospital-mep-design-cost/" },
      { text: "MEP Engineering Services", href: "/mep-engineering/" },
      { text: "Mechanical Engineering", href: "/mechanical-engineering/" },
      { text: "Electrical Engineering", href: "/electrical-engineering/" },
      { text: "Healthcare Industry Practice", href: "/industries/healthcare/" },
      { text: "Get a Healthcare Engineering Estimate", href: "/estimate" },
    ],
  },
  {
    slug: "healthcare-design/missouri",
    title: "Hospital MEP Design in Missouri: Engineering & Plan Review",
    description: "Missouri hospital MEP engineering: ASHRAE 170 HVAC, NFPA 99 medical gas, USP 800 pharmacy design. Missouri plan-review support and schedule-driven delivery.",
    h1: "Hospital MEP Design in Missouri: Engineering & Plan Review",
    directAnswer: "Apex Grid Engineering provides hospital MEP design in Missouri — HVAC to ASHRAE 170, NFPA 99 medical gas, USP 800 pharmacy, and emergency power — for Barnes-Jewish Hospital in St. Louis, BJC Health in St. Louis, SSM Health in St. Louis, with Missouri plan-review support.",
    answer: "Missouri's St. Louis market just consolidated: BJC HealthCare and Saint Luke's merged in January 2024 and rebranded as BJC Health in November 2025 — a 24-hospital, $10.7B system anchored by the 1,315-bed Barnes-Jewish (#1 in the state). SSM Health, Mercy, and Springfield's $2.4B CoxHealth complete the map.\n\nMissouri hospital construction is reviewed by the Department of Health and Senior Services' facility program; Missouri has no certificate-of-need program. That review shapes the engineering from the first drawing: ventilation schedules proving every space's air changes and pressure relationships, medical gas risers with zone valves and alarms, and essential-electrical one-lines the reviewer can trace.\n\nPost-merger capital planning: the BJC Health combination is driving system-wide facility standardization — a design-standardization opportunity across 24 hospitals. Apex designs for that reality — and for the schedule. Health systems expanding in Missouri get schedule-driven delivery: early reviewer engagement, submittals built for the checklist, and comment responses in days, not weeks.",
    sections: [
      {
        h2: "Clinical-space HVAC for Missouri hospitals",
        body: "Hospital HVAC in Missouri is designed space by space to ASHRAE 170. Operating rooms hold positive pressure at 20 air changes per hour with temperature between 68 and 75 degrees and relative humidity between 20 and 60 percent, delivered through low-velocity diffuser arrays that sweep contaminants away from the sterile field. Airborne-infection isolation rooms reverse the relationship — negative pressure at 12 ACH with anterooms and continuous monitoring. At Barnes-Jewish Hospital in St. Louis and BJC Health in St. Louis, these pressure relationships are the first thing plan reviewers verify, and the building automation system proves them around the clock. Post-merger capital planning: the BJC Health combination is driving system-wide facility standardization — a design-standardization opportunity across 24 hospitals.",
      },
      {
        h2: "Missouri health-facility plan review, handled",
        body: "Missouri hospital construction is reviewed by the Department of Health and Senior Services' facility program; Missouri has no certificate-of-need program. Our submittals are built for the reviewer's checklist: FGI Guidelines compliance narratives, ASHRAE 170 ventilation schedules with every space's air changes, outdoor air, pressure relationship, temperature, humidity, and filtration listed, NFPA 99 medical gas riser diagrams with zone valves and alarms, and essential-electrical one-lines showing the life safety, critical, and equipment branches. We engage the reviewer early, answer comments in days, and keep the project moving — because a health system's opening date is a clinical commitment, not a suggestion.",
      },
      {
        h2: "Surgical suites and sterile processing in Missouri",
        body: "Surgical capacity is the economic engine of Missouri hospitals — from Barnes-Jewish Hospital's operating rooms to ambulatory surgery centers across the state — and its MEP design is unforgiving. Each OR needs 20 total air changes per hour, positive pressure to the corridor, HEPA-filtered supply, and N+1 redundancy on the air-handling so a fan failure never cancels a case. Sterile processing departments need their own pressure cascade: decontamination negative, clean workroom positive, sterilizer rooms exhausted. Medical gas zone valves sit outside every OR suite with area alarms at the nurses' station. We design surgical MEP for the survey as well as the surgery: Joint Commission and CMS surveyors trace pressure relationships, humidity logs, and medical gas alarms on every visit.",
      },
      {
        h2: "Pharmacy, lab, and specialty spaces in Missouri",
        body: "Beyond the bed tower, Missouri health systems are building the specialty spaces that carry modern care: USP 800 hazardous-drug compounding suites with negative-pressure C-SECs at 30 air changes per hour and externally vented C-PEC hoods; USP 797 sterile compounding with ISO-classified buffer and ante areas; BSL-2 and BSL-3 laboratories with directional airflow, single-pass exhaust, and sealed penetrations; and vivarium facilities with 10 to 15 air changes per hour and tight temperature and humidity control. Each carries its own code regime — state pharmacy board, CDC biosafety, AAALAC — and each gets dedicated HVAC, monitoring, and alarming independent of the building's comfort systems.",
      },
    ],
    faqs: [
      {
        question: "Which health systems drive hospital construction in Missouri?",
        answer: "The major owners are Barnes-Jewish Hospital (St. Louis); BJC Health (St. Louis); SSM Health (St. Louis); Mercy (St. Louis). We design for health-system standards as well as one-off projects, so a system's MEP criteria carry across its campuses.",
      },
      {
        question: "How does Missouri review hospital construction plans?",
        answer: "Missouri hospital construction is reviewed by the Department of Health and Senior Services' facility program; Missouri has no certificate-of-need program. We build the submittal for that reviewer's checklist and resolve comments fast.",
      },
      {
        question: "What ventilation rates does ASHRAE 170 require?",
        answer: "ASHRAE Standard 170 sets ventilation by space type: operating rooms need 20 total air changes per hour at positive pressure, trauma rooms 15 ACH, airborne-infection isolation rooms 12 ACH at negative pressure, protective-environment rooms 12 ACH at positive pressure, and patient rooms 6 ACH with 2 ACH of outdoor air. Temperature and humidity ranges are specified per space, and the standard is enforced through state health-department plan review.",
      },
      {
        question: "How are medical gas systems designed under NFPA 99?",
        answer: "NFPA 99 categorizes health care facilities by risk (Category 1 through 4) and governs medical gas and vacuum systems accordingly: zoned piping with area zone valves outside each critical-care zone, source equipment with automatic changeover, master and area alarms at attended locations, labeled outlets, and third-party certification testing before the system goes live. The medical gas design is a dedicated plan-review item in most states.",
      },
    ],
    founderNote: founderNote,
    extraLinks: [
      { text: "Hospital MEP Engineering in St. Louis, MO", href: "/healthcare-design/missouri/st-louis/" },
      { text: "Hospital MEP Engineering in Kansas City, MO", href: "/healthcare-design/missouri/kansas-city/" },
      { text: "Hospital MEP Engineering in Springfield, MO", href: "/healthcare-design/missouri/springfield/" },
      { text: "Hospital MEP Engineering in Columbia, MO", href: "/healthcare-design/missouri/columbia/" },
      { text: "Hospital MEP Engineering in St. Charles, MO", href: "/healthcare-design/missouri/st-charles/" },
      { text: "Hospital MEP Engineering in Joplin, MO", href: "/healthcare-design/missouri/joplin/" },
      { text: "What Are ASHRAE 170 Ventilation Requirements?", href: "/answers/healthcare-ashrae-170-ventilation-requirements/" },
      { text: "How Much Does Hospital MEP Design Cost?", href: "/answers/healthcare-hospital-mep-design-cost/" },
      { text: "MEP Engineering Services", href: "/mep-engineering/" },
      { text: "Mechanical Engineering", href: "/mechanical-engineering/" },
      { text: "Electrical Engineering", href: "/electrical-engineering/" },
      { text: "Healthcare Industry Practice", href: "/industries/healthcare/" },
      { text: "Get a Healthcare Engineering Estimate", href: "/estimate" },
    ],
  },
  {
    slug: "healthcare-design/montana",
    title: "Hospital MEP Design in Montana: Engineering & Plan Review",
    description: "Montana hospital MEP engineering: ASHRAE 170 HVAC, NFPA 99 medical gas, USP 800 pharmacy design. Montana plan-review support and schedule-driven delivery.",
    h1: "Hospital MEP Design in Montana: Engineering & Plan Review",
    directAnswer: "Apex Grid Engineering provides hospital MEP design in Montana — HVAC to ASHRAE 170, NFPA 99 medical gas, USP 800 pharmacy, and emergency power — for Billings Clinic-Logan Health in Billings, Providence St. Patrick Hospital in Missoula, St. Vincent Healthcare in Billings, with Montana plan-review support.",
    answer: "Montana's market consolidated around the Billings Clinic-Logan Health merger — the state's largest system at roughly 30% share — with Providence's St. Patrick in Missoula ranked #1 and Intermountain's St. Vincent competing in Billings.\n\nMontana hospital construction is reviewed by the Department of Public Health and Human Services' facility program, with local building permits. That review shapes the engineering from the first drawing: ventilation schedules proving every space's air changes and pressure relationships, medical gas risers with zone valves and alarms, and essential-electrical one-lines the reviewer can trace.\n\nFrontier-state engineering: long equipment lead times, extreme winter design, and critical-access facilities serving vast rural catchment areas. Apex designs for that reality — and for the schedule. Health systems expanding in Montana get schedule-driven delivery: early reviewer engagement, submittals built for the checklist, and comment responses in days, not weeks.",
    sections: [
      {
        h2: "Montana health-facility plan review, handled",
        body: "Montana hospital construction is reviewed by the Department of Public Health and Human Services' facility program, with local building permits. Our submittals are built for the reviewer's checklist: FGI Guidelines compliance narratives, ASHRAE 170 ventilation schedules with every space's air changes, outdoor air, pressure relationship, temperature, humidity, and filtration listed, NFPA 99 medical gas riser diagrams with zone valves and alarms, and essential-electrical one-lines showing the life safety, critical, and equipment branches. We engage the reviewer early, answer comments in days, and keep the project moving — because a health system's opening date is a clinical commitment, not a suggestion.",
      },
      {
        h2: "Surgical suites and sterile processing in Montana",
        body: "Surgical capacity is the economic engine of Montana hospitals — from Billings Clinic-Logan Health's operating rooms to ambulatory surgery centers across the state — and its MEP design is unforgiving. Each OR needs 20 total air changes per hour, positive pressure to the corridor, HEPA-filtered supply, and N+1 redundancy on the air-handling so a fan failure never cancels a case. Sterile processing departments need their own pressure cascade: decontamination negative, clean workroom positive, sterilizer rooms exhausted. Medical gas zone valves sit outside every OR suite with area alarms at the nurses' station. We design surgical MEP for the survey as well as the surgery: Joint Commission and CMS surveyors trace pressure relationships, humidity logs, and medical gas alarms on every visit.",
      },
      {
        h2: "Pharmacy, lab, and specialty spaces in Montana",
        body: "Beyond the bed tower, Montana health systems are building the specialty spaces that carry modern care: USP 800 hazardous-drug compounding suites with negative-pressure C-SECs at 30 air changes per hour and externally vented C-PEC hoods; USP 797 sterile compounding with ISO-classified buffer and ante areas; BSL-2 and BSL-3 laboratories with directional airflow, single-pass exhaust, and sealed penetrations; and vivarium facilities with 10 to 15 air changes per hour and tight temperature and humidity control. Each carries its own code regime — state pharmacy board, CDC biosafety, AAALAC — and each gets dedicated HVAC, monitoring, and alarming independent of the building's comfort systems.",
      },
      {
        h2: "Renovating occupied Montana hospitals",
        body: "Most Montana hospital work is renovation inside fully operational buildings — a new OR at Billings Clinic-Logan Health, an ED expansion, a pharmacy brought up to USP 800. Our construction documents carry ICRA 2.0 infection-control risk assessments matched to the work: Class I through V precautions, dust-tight barriers with negative-pressure containment, HEPA-filtered exhaust, sealed penetrations, and traffic patterns that keep construction crews out of patient corridors. Shutdowns are sequenced — med gas, normal power, HVAC — with temporary systems bridging every outage and life-safety maintained throughout. The facility's infection preventionist approves the ICRA plan before work starts because it is on the drawings, not in a memo afterward.",
      },
    ],
    faqs: [
      {
        question: "Which health systems drive hospital construction in Montana?",
        answer: "The major owners are Billings Clinic-Logan Health (Billings); Providence St. Patrick Hospital (Missoula); St. Vincent Healthcare (Billings); Benefis Health System (Great Falls). We design for health-system standards as well as one-off projects, so a system's MEP criteria carry across its campuses.",
      },
      {
        question: "How does Montana review hospital construction plans?",
        answer: "Montana hospital construction is reviewed by the Department of Public Health and Human Services' facility program, with local building permits. We build the submittal for that reviewer's checklist and resolve comments fast.",
      },
      {
        question: "What is USP 800 and which facilities need it?",
        answer: "USP General Chapter 800 governs the handling of hazardous drugs in healthcare settings. Facilities that compound or handle hazardous drugs — hospital pharmacies, oncology infusion pharmacies, veterinary compounding — need a containment suite: a negative-pressure secondary engineering control (C-SEC) at -0.01 to -0.03 inches water column, externally vented primary controls (C-PEC), 30 air changes per hour, and strict temperature and humidity control. State boards of pharmacy enforce it.",
      },
      {
        question: "How much does hospital MEP engineering cost?",
        answer: "Hospital MEP engineering fees typically run 6 to 10 percent of the MEP construction value. Since MEP systems represent 30 to 45 percent of total hospital construction — and new acute-care hospitals cost $600 to over $1,000 per square foot — engineering fees generally land in the range of $15 to $45 per square foot, with surgical suites, isolation, pharmacy, and lab spaces commanding the high end.",
      },
    ],
    founderNote: founderNote,
    extraLinks: [
      { text: "Hospital MEP Engineering in Billings, MT", href: "/healthcare-design/montana/billings/" },
      { text: "Hospital MEP Engineering in Missoula, MT", href: "/healthcare-design/montana/missoula/" },
      { text: "Hospital MEP Engineering in Great Falls, MT", href: "/healthcare-design/montana/great-falls/" },
      { text: "Hospital MEP Engineering in Bozeman, MT", href: "/healthcare-design/montana/bozeman/" },
      { text: "Hospital MEP Engineering in Kalispell, MT", href: "/healthcare-design/montana/kalispell/" },
      { text: "Hospital MEP Engineering in Helena, MT", href: "/healthcare-design/montana/helena/" },
      { text: "What Are ASHRAE 170 Ventilation Requirements?", href: "/answers/healthcare-ashrae-170-ventilation-requirements/" },
      { text: "How Much Does Hospital MEP Design Cost?", href: "/answers/healthcare-hospital-mep-design-cost/" },
      { text: "MEP Engineering Services", href: "/mep-engineering/" },
      { text: "Mechanical Engineering", href: "/mechanical-engineering/" },
      { text: "Electrical Engineering", href: "/electrical-engineering/" },
      { text: "Healthcare Industry Practice", href: "/industries/healthcare/" },
      { text: "Get a Healthcare Engineering Estimate", href: "/estimate" },
    ],
  },
  {
    slug: "healthcare-design/nebraska",
    title: "Hospital MEP Design in Nebraska: Engineering & Plan Review",
    description: "Nebraska hospital MEP engineering: ASHRAE 170 HVAC, NFPA 99 medical gas, USP 800 pharmacy design. Nebraska plan-review support and schedule-driven delivery.",
    h1: "Hospital MEP Design in Nebraska: Engineering & Plan Review",
    directAnswer: "Apex Grid Engineering provides hospital MEP design in Nebraska — HVAC to ASHRAE 170, NFPA 99 medical gas, USP 800 pharmacy, and emergency power — for Nebraska Medicine in Omaha, CHI Health Creighton University Medical Center-Bergan Mercy in Omaha, Nebraska Methodist Health System in Omaha, with Nebraska plan-review support.",
    answer: "Nebraska healthcare is Omaha-centric: Nebraska Medicine's 718-bed academic campus (#1 in the state), CHI Health's Bergan Mercy Level I trauma center, and Methodist Health — with Bryan Health's two Lincoln campuses anchoring the capital.\n\nNebraska hospital construction is reviewed by the Department of Health and Human Services' facility program, with the state fire marshal reviewing life safety. That review shapes the engineering from the first drawing: ventilation schedules proving every space's air changes and pressure relationships, medical gas risers with zone valves and alarms, and essential-electrical one-lines the reviewer can trace.\n\nAcademic-corridor growth: the UNMC/Nebraska Medicine campus keeps adding research, tower, and specialty capacity in midtown Omaha. Apex designs for that reality — and for the schedule. Health systems expanding in Nebraska get schedule-driven delivery: early reviewer engagement, submittals built for the checklist, and comment responses in days, not weeks.",
    sections: [
      {
        h2: "Surgical suites and sterile processing in Nebraska",
        body: "Surgical capacity is the economic engine of Nebraska hospitals — from Nebraska Medicine's operating rooms to ambulatory surgery centers across the state — and its MEP design is unforgiving. Each OR needs 20 total air changes per hour, positive pressure to the corridor, HEPA-filtered supply, and N+1 redundancy on the air-handling so a fan failure never cancels a case. Sterile processing departments need their own pressure cascade: decontamination negative, clean workroom positive, sterilizer rooms exhausted. Medical gas zone valves sit outside every OR suite with area alarms at the nurses' station. We design surgical MEP for the survey as well as the surgery: Joint Commission and CMS surveyors trace pressure relationships, humidity logs, and medical gas alarms on every visit.",
      },
      {
        h2: "Pharmacy, lab, and specialty spaces in Nebraska",
        body: "Beyond the bed tower, Nebraska health systems are building the specialty spaces that carry modern care: USP 800 hazardous-drug compounding suites with negative-pressure C-SECs at 30 air changes per hour and externally vented C-PEC hoods; USP 797 sterile compounding with ISO-classified buffer and ante areas; BSL-2 and BSL-3 laboratories with directional airflow, single-pass exhaust, and sealed penetrations; and vivarium facilities with 10 to 15 air changes per hour and tight temperature and humidity control. Each carries its own code regime — state pharmacy board, CDC biosafety, AAALAC — and each gets dedicated HVAC, monitoring, and alarming independent of the building's comfort systems.",
      },
      {
        h2: "Renovating occupied Nebraska hospitals",
        body: "Most Nebraska hospital work is renovation inside fully operational buildings — a new OR at Nebraska Medicine, an ED expansion, a pharmacy brought up to USP 800. Our construction documents carry ICRA 2.0 infection-control risk assessments matched to the work: Class I through V precautions, dust-tight barriers with negative-pressure containment, HEPA-filtered exhaust, sealed penetrations, and traffic patterns that keep construction crews out of patient corridors. Shutdowns are sequenced — med gas, normal power, HVAC — with temporary systems bridging every outage and life-safety maintained throughout. The facility's infection preventionist approves the ICRA plan before work starts because it is on the drawings, not in a memo afterward.",
      },
      {
        h2: "Emergency power and medical gas across Nebraska",
        body: "Every Nebraska hospital depends on systems patients never see. The essential electrical system — life safety, critical, and equipment branches per NFPA 99 — rides on generators that start within 10 seconds, with selective coordination, load-shed sequencing, and monthly NFPA 110 testing baked into the design. Medical gas piping runs zoned and alarmed: oxygen, medical air, nitrous oxide, vacuum, and waste anesthetic gas with area zone valves outside each critical-care zone and master alarms where staff always watch. Academic-corridor growth: the UNMC/Nebraska Medicine campus keeps adding research, tower, and specialty capacity in midtown Omaha.",
      },
    ],
    faqs: [
      {
        question: "Which health systems drive hospital construction in Nebraska?",
        answer: "The major owners are Nebraska Medicine (Omaha); CHI Health Creighton University Medical Center-Bergan Mercy (Omaha); Nebraska Methodist Health System (Omaha); Bryan Health (Lincoln). We design for health-system standards as well as one-off projects, so a system's MEP criteria carry across its campuses.",
      },
      {
        question: "How does Nebraska review hospital construction plans?",
        answer: "Nebraska hospital construction is reviewed by the Department of Health and Human Services' facility program, with the state fire marshal reviewing life safety. We build the submittal for that reviewer's checklist and resolve comments fast.",
      },
      {
        question: "What does ICRA require during hospital renovation?",
        answer: "The ICRA 2.0 process classifies construction activity (Type A through D) and patient risk groups, then assigns precautions Class I through V: dust-tight barriers, negative-pressure containment with HEPA-filtered exhaust, sealed penetrations, debris handling in covered containers, and traffic patterns separated from patient care. The ICRA matrix and barrier plan belong in the construction documents for plan review and the facility's infection preventionist.",
      },
      {
        question: "How long does healthcare plan review take?",
        answer: "It depends on the state. Standard health-department facility review runs 4 to 12 weeks in most states; California HCAI review runs longer with its seismic program; certificate-of-need states add months before design review even begins. We compress the timeline with early AHJ engagement, submittals built for the reviewer's checklist, and comment responses turned in days.",
      },
    ],
    founderNote: founderNote,
    extraLinks: [
      { text: "Hospital MEP Engineering in Omaha, NE", href: "/healthcare-design/nebraska/omaha/" },
      { text: "Hospital MEP Engineering in Lincoln, NE", href: "/healthcare-design/nebraska/lincoln/" },
      { text: "Hospital MEP Engineering in Grand Island, NE", href: "/healthcare-design/nebraska/grand-island/" },
      { text: "Hospital MEP Engineering in Kearney, NE", href: "/healthcare-design/nebraska/kearney/" },
      { text: "Hospital MEP Engineering in Bellevue, NE", href: "/healthcare-design/nebraska/bellevue/" },
      { text: "Hospital MEP Engineering in Fremont, NE", href: "/healthcare-design/nebraska/fremont/" },
      { text: "What Are ASHRAE 170 Ventilation Requirements?", href: "/answers/healthcare-ashrae-170-ventilation-requirements/" },
      { text: "How Much Does Hospital MEP Design Cost?", href: "/answers/healthcare-hospital-mep-design-cost/" },
      { text: "MEP Engineering Services", href: "/mep-engineering/" },
      { text: "Mechanical Engineering", href: "/mechanical-engineering/" },
      { text: "Electrical Engineering", href: "/electrical-engineering/" },
      { text: "Healthcare Industry Practice", href: "/industries/healthcare/" },
      { text: "Get a Healthcare Engineering Estimate", href: "/estimate" },
    ],
  },
  {
    slug: "healthcare-design/nevada",
    title: "Hospital MEP Design in Nevada: Engineering & Plan Review",
    description: "Nevada hospital MEP engineering: ASHRAE 170 HVAC, NFPA 99 medical gas, USP 800 pharmacy design. Nevada plan-review support and schedule-driven delivery.",
    h1: "Hospital MEP Design in Nevada: Engineering & Plan Review",
    directAnswer: "Apex Grid Engineering provides hospital MEP design in Nevada — HVAC to ASHRAE 170, NFPA 99 medical gas, USP 800 pharmacy, and emergency power — for Renown Health in Reno, University Medical Center of Southern Nevada in Las Vegas, MountainView Hospital in Las Vegas, with Nevada plan-review support.",
    answer: "Nevada is a two-metro market: Las Vegas — UMC Southern Nevada (the state's largest public hospital), HCA's Sunrise and MountainView — and Reno, where Renown Health (the largest locally owned nonprofit in northern Nevada) anchors a fast-growing market.\n\nNevada hospital construction is reviewed by the Department of Health and Human Services' facility program, with local building department permits. That review shapes the engineering from the first drawing: ventilation schedules proving every space's air changes and pressure relationships, medical gas risers with zone valves and alarms, and essential-electrical one-lines the reviewer can trace.\n\nBoom-market speed: Las Vegas and Reno population growth is driving rapid MOB, freestanding-ED, and bed-tower work where schedule-driven delivery wins. Apex designs for that reality — and for the schedule. Health systems expanding in Nevada get schedule-driven delivery: early reviewer engagement, submittals built for the checklist, and comment responses in days, not weeks.",
    sections: [
      {
        h2: "Pharmacy, lab, and specialty spaces in Nevada",
        body: "Beyond the bed tower, Nevada health systems are building the specialty spaces that carry modern care: USP 800 hazardous-drug compounding suites with negative-pressure C-SECs at 30 air changes per hour and externally vented C-PEC hoods; USP 797 sterile compounding with ISO-classified buffer and ante areas; BSL-2 and BSL-3 laboratories with directional airflow, single-pass exhaust, and sealed penetrations; and vivarium facilities with 10 to 15 air changes per hour and tight temperature and humidity control. Each carries its own code regime — state pharmacy board, CDC biosafety, AAALAC — and each gets dedicated HVAC, monitoring, and alarming independent of the building's comfort systems.",
      },
      {
        h2: "Renovating occupied Nevada hospitals",
        body: "Most Nevada hospital work is renovation inside fully operational buildings — a new OR at Renown Health, an ED expansion, a pharmacy brought up to USP 800. Our construction documents carry ICRA 2.0 infection-control risk assessments matched to the work: Class I through V precautions, dust-tight barriers with negative-pressure containment, HEPA-filtered exhaust, sealed penetrations, and traffic patterns that keep construction crews out of patient corridors. Shutdowns are sequenced — med gas, normal power, HVAC — with temporary systems bridging every outage and life-safety maintained throughout. The facility's infection preventionist approves the ICRA plan before work starts because it is on the drawings, not in a memo afterward.",
      },
      {
        h2: "Emergency power and medical gas across Nevada",
        body: "Every Nevada hospital depends on systems patients never see. The essential electrical system — life safety, critical, and equipment branches per NFPA 99 — rides on generators that start within 10 seconds, with selective coordination, load-shed sequencing, and monthly NFPA 110 testing baked into the design. Medical gas piping runs zoned and alarmed: oxygen, medical air, nitrous oxide, vacuum, and waste anesthetic gas with area zone valves outside each critical-care zone and master alarms where staff always watch. Boom-market speed: Las Vegas and Reno population growth is driving rapid MOB, freestanding-ED, and bed-tower work where schedule-driven delivery wins.",
      },
      {
        h2: "Clinical-space HVAC for Nevada hospitals",
        body: "Hospital HVAC in Nevada is designed space by space to ASHRAE 170. Operating rooms hold positive pressure at 20 air changes per hour with temperature between 68 and 75 degrees and relative humidity between 20 and 60 percent, delivered through low-velocity diffuser arrays that sweep contaminants away from the sterile field. Airborne-infection isolation rooms reverse the relationship — negative pressure at 12 ACH with anterooms and continuous monitoring. At Renown Health in Reno and University Medical Center of Southern Nevada in Las Vegas, these pressure relationships are the first thing plan reviewers verify, and the building automation system proves them around the clock. Boom-market speed: Las Vegas and Reno population growth is driving rapid MOB, freestanding-ED, and bed-tower work where schedule-driven delivery wins.",
      },
    ],
    faqs: [
      {
        question: "Which health systems drive hospital construction in Nevada?",
        answer: "The major owners are Renown Health (Reno); University Medical Center of Southern Nevada (Las Vegas); MountainView Hospital (Las Vegas); Sunrise Hospital and Medical Center (Las Vegas). We design for health-system standards as well as one-off projects, so a system's MEP criteria carry across its campuses.",
      },
      {
        question: "How does Nevada review hospital construction plans?",
        answer: "Nevada hospital construction is reviewed by the Department of Health and Human Services' facility program, with local building department permits. We build the submittal for that reviewer's checklist and resolve comments fast.",
      },
      {
        question: "What emergency power do hospitals require?",
        answer: "Hospitals require an essential electrical system per NFPA 99: life safety, critical, and equipment branches served by on-site generators that start and assume load within 10 seconds of a normal-power failure. NFPA 110 governs the generator installation, fuel supply, and monthly testing. Critical branch loads — ORs, ICUs, emergency departments — transfer automatically; the design must prove selective coordination and load-shed sequencing.",
      },
      {
        question: "What pressure relationships do hospital rooms need?",
        answer: "Operating rooms and protective-environment rooms run positive to adjacent spaces to keep contaminants out; airborne-infection isolation rooms, USP 800 compounding rooms, and soiled utility rooms run negative to contain contaminants. Anterooms buffer the transition. Each relationship is continuously monitored and alarmed through the building automation system, and the pressure map is part of the plan-review submittal.",
      },
    ],
    founderNote: founderNote,
    extraLinks: [
      { text: "Hospital MEP Engineering in Las Vegas, NV", href: "/healthcare-design/nevada/las-vegas/" },
      { text: "Hospital MEP Engineering in Reno, NV", href: "/healthcare-design/nevada/reno/" },
      { text: "Hospital MEP Engineering in Henderson, NV", href: "/healthcare-design/nevada/henderson/" },
      { text: "Hospital MEP Engineering in North Las Vegas, NV", href: "/healthcare-design/nevada/north-las-vegas/" },
      { text: "Hospital MEP Engineering in Carson City, NV", href: "/healthcare-design/nevada/carson-city/" },
      { text: "Hospital MEP Engineering in Sparks, NV", href: "/healthcare-design/nevada/sparks/" },
      { text: "What Are ASHRAE 170 Ventilation Requirements?", href: "/answers/healthcare-ashrae-170-ventilation-requirements/" },
      { text: "How Much Does Hospital MEP Design Cost?", href: "/answers/healthcare-hospital-mep-design-cost/" },
      { text: "MEP Engineering Services", href: "/mep-engineering/" },
      { text: "Mechanical Engineering", href: "/mechanical-engineering/" },
      { text: "Electrical Engineering", href: "/electrical-engineering/" },
      { text: "Healthcare Industry Practice", href: "/industries/healthcare/" },
      { text: "Get a Healthcare Engineering Estimate", href: "/estimate" },
    ],
  },
  {
    slug: "healthcare-design/new-hampshire",
    title: "Hospital MEP Design in New Hampshire: Engineering & Plan Review",
    description: "New Hampshire hospital MEP engineering: ASHRAE 170 HVAC, NFPA 99 medical gas, USP 800 pharmacy design. New Hampshire plan-review support, delivered fast.",
    h1: "Hospital MEP Design in New Hampshire: Engineering & Plan Review",
    directAnswer: "Apex Grid Engineering provides hospital MEP design in New Hampshire — HVAC to ASHRAE 170, NFPA 99 medical gas, USP 800 pharmacy, and emergency power — for Dartmouth Hitchcock Medical Center in Lebanon, Elliot Health System in Manchester, Concord Hospital in Concord, with New Hampshire plan-review support.",
    answer: "New Hampshire healthcare radiates from Dartmouth Hitchcock Medical Center in Lebanon — the state's only academic medical center and its #1-ranked hospital — with Elliot, Catholic Medical Center, and Concord Hospital covering the populous southern tier.\n\nNew Hampshire hospital construction is reviewed by the Department of Health and Human Services' facility program; the state has no certificate-of-need program. That review shapes the engineering from the first drawing: ventilation schedules proving every space's air changes and pressure relationships, medical gas risers with zone valves and alarms, and essential-electrical one-lines the reviewer can trace.\n\nAcademic-hub-and-spoke: Dartmouth Hitchcock's Lebanon campus drives quaternary work while the Manchester-Nashua corridor handles community and specialty growth. Apex designs for that reality — and for the schedule. Health systems expanding in New Hampshire get schedule-driven delivery: early reviewer engagement, submittals built for the checklist, and comment responses in days, not weeks.",
    sections: [
      {
        h2: "Renovating occupied New Hampshire hospitals",
        body: "Most New Hampshire hospital work is renovation inside fully operational buildings — a new OR at Dartmouth Hitchcock Medical Center, an ED expansion, a pharmacy brought up to USP 800. Our construction documents carry ICRA 2.0 infection-control risk assessments matched to the work: Class I through V precautions, dust-tight barriers with negative-pressure containment, HEPA-filtered exhaust, sealed penetrations, and traffic patterns that keep construction crews out of patient corridors. Shutdowns are sequenced — med gas, normal power, HVAC — with temporary systems bridging every outage and life-safety maintained throughout. The facility's infection preventionist approves the ICRA plan before work starts because it is on the drawings, not in a memo afterward.",
      },
      {
        h2: "Emergency power and medical gas across New Hampshire",
        body: "Every New Hampshire hospital depends on systems patients never see. The essential electrical system — life safety, critical, and equipment branches per NFPA 99 — rides on generators that start within 10 seconds, with selective coordination, load-shed sequencing, and monthly NFPA 110 testing baked into the design. Medical gas piping runs zoned and alarmed: oxygen, medical air, nitrous oxide, vacuum, and waste anesthetic gas with area zone valves outside each critical-care zone and master alarms where staff always watch. Academic-hub-and-spoke: Dartmouth Hitchcock's Lebanon campus drives quaternary work while the Manchester-Nashua corridor handles community and specialty growth.",
      },
      {
        h2: "Clinical-space HVAC for New Hampshire hospitals",
        body: "Hospital HVAC in New Hampshire is designed space by space to ASHRAE 170. Operating rooms hold positive pressure at 20 air changes per hour with temperature between 68 and 75 degrees and relative humidity between 20 and 60 percent, delivered through low-velocity diffuser arrays that sweep contaminants away from the sterile field. Airborne-infection isolation rooms reverse the relationship — negative pressure at 12 ACH with anterooms and continuous monitoring. At Dartmouth Hitchcock Medical Center in Lebanon and Elliot Health System in Manchester, these pressure relationships are the first thing plan reviewers verify, and the building automation system proves them around the clock. Academic-hub-and-spoke: Dartmouth Hitchcock's Lebanon campus drives quaternary work while the Manchester-Nashua corridor handles community and specialty growth.",
      },
      {
        h2: "New Hampshire health-facility plan review, handled",
        body: "New Hampshire hospital construction is reviewed by the Department of Health and Human Services' facility program; the state has no certificate-of-need program. Our submittals are built for the reviewer's checklist: FGI Guidelines compliance narratives, ASHRAE 170 ventilation schedules with every space's air changes, outdoor air, pressure relationship, temperature, humidity, and filtration listed, NFPA 99 medical gas riser diagrams with zone valves and alarms, and essential-electrical one-lines showing the life safety, critical, and equipment branches. We engage the reviewer early, answer comments in days, and keep the project moving — because a health system's opening date is a clinical commitment, not a suggestion.",
      },
    ],
    faqs: [
      {
        question: "Which health systems drive hospital construction in New Hampshire?",
        answer: "The major owners are Dartmouth Hitchcock Medical Center (Lebanon); Elliot Health System (Manchester); Concord Hospital (Concord); Catholic Medical Center (Manchester). We design for health-system standards as well as one-off projects, so a system's MEP criteria carry across its campuses.",
      },
      {
        question: "How does New Hampshire review hospital construction plans?",
        answer: "New Hampshire hospital construction is reviewed by the Department of Health and Human Services' facility program; the state has no certificate-of-need program. We build the submittal for that reviewer's checklist and resolve comments fast.",
      },
      {
        question: "What ventilation rates does ASHRAE 170 require?",
        answer: "ASHRAE Standard 170 sets ventilation by space type: operating rooms need 20 total air changes per hour at positive pressure, trauma rooms 15 ACH, airborne-infection isolation rooms 12 ACH at negative pressure, protective-environment rooms 12 ACH at positive pressure, and patient rooms 6 ACH with 2 ACH of outdoor air. Temperature and humidity ranges are specified per space, and the standard is enforced through state health-department plan review.",
      },
      {
        question: "How are medical gas systems designed under NFPA 99?",
        answer: "NFPA 99 categorizes health care facilities by risk (Category 1 through 4) and governs medical gas and vacuum systems accordingly: zoned piping with area zone valves outside each critical-care zone, source equipment with automatic changeover, master and area alarms at attended locations, labeled outlets, and third-party certification testing before the system goes live. The medical gas design is a dedicated plan-review item in most states.",
      },
    ],
    founderNote: founderNote,
    extraLinks: [
      { text: "Hospital MEP Engineering in Lebanon, NH", href: "/healthcare-design/new-hampshire/lebanon/" },
      { text: "Hospital MEP Engineering in Manchester, NH", href: "/healthcare-design/new-hampshire/manchester/" },
      { text: "Hospital MEP Engineering in Nashua, NH", href: "/healthcare-design/new-hampshire/nashua/" },
      { text: "Hospital MEP Engineering in Concord, NH", href: "/healthcare-design/new-hampshire/concord/" },
      { text: "Hospital MEP Engineering in Portsmouth, NH", href: "/healthcare-design/new-hampshire/portsmouth/" },
      { text: "Hospital MEP Engineering in Derry, NH", href: "/healthcare-design/new-hampshire/derry/" },
      { text: "What Are ASHRAE 170 Ventilation Requirements?", href: "/answers/healthcare-ashrae-170-ventilation-requirements/" },
      { text: "How Much Does Hospital MEP Design Cost?", href: "/answers/healthcare-hospital-mep-design-cost/" },
      { text: "MEP Engineering Services", href: "/mep-engineering/" },
      { text: "Mechanical Engineering", href: "/mechanical-engineering/" },
      { text: "Electrical Engineering", href: "/electrical-engineering/" },
      { text: "Healthcare Industry Practice", href: "/industries/healthcare/" },
      { text: "Get a Healthcare Engineering Estimate", href: "/estimate" },
    ],
  },
  {
    slug: "healthcare-design/new-jersey",
    title: "Hospital MEP Design in New Jersey: Engineering & Plan Review",
    description: "New Jersey hospital MEP engineering: ASHRAE 170 HVAC, NFPA 99 medical gas, USP 800 pharmacy design. New Jersey plan-review support and schedule-driven delivery.",
    h1: "Hospital MEP Design in New Jersey: Engineering & Plan Review",
    directAnswer: "Apex Grid Engineering provides hospital MEP design in New Jersey — HVAC to ASHRAE 170, NFPA 99 medical gas, USP 800 pharmacy, and emergency power — for Hackensack University Medical Center in Hackensack, RWJBarnabas Health in West Orange, Atlantic Health System in Morristown, with New Jersey plan-review support.",
    answer: "New Jersey's dense market is led by Hackensack University Medical Center (#1 in the state) and the statewide RWJBarnabas footprint, with Atlantic Health, Virtua, and Cooper anchoring the north, south, and academic segments.\n\nNew Jersey hospital projects require certificate-of-need approval through the Department of Health, with facility plan review. That review shapes the engineering from the first drawing: ventilation schedules proving every space's air changes and pressure relationships, medical gas risers with zone valves and alarms, and essential-electrical one-lines the reviewer can trace.\n\nNYC-adjacent density: northern New Jersey campuses compete directly with Manhattan flagships, driving continuous tower, ED, and specialty-pavilion investment on tight urban sites. Apex designs for that reality — and for the schedule. Health systems expanding in New Jersey get schedule-driven delivery: early reviewer engagement, submittals built for the checklist, and comment responses in days, not weeks.",
    sections: [
      {
        h2: "Emergency power and medical gas across New Jersey",
        body: "Every New Jersey hospital depends on systems patients never see. The essential electrical system — life safety, critical, and equipment branches per NFPA 99 — rides on generators that start within 10 seconds, with selective coordination, load-shed sequencing, and monthly NFPA 110 testing baked into the design. Medical gas piping runs zoned and alarmed: oxygen, medical air, nitrous oxide, vacuum, and waste anesthetic gas with area zone valves outside each critical-care zone and master alarms where staff always watch. NYC-adjacent density: northern New Jersey campuses compete directly with Manhattan flagships, driving continuous tower, ED, and specialty-pavilion investment on tight urban sites.",
      },
      {
        h2: "Clinical-space HVAC for New Jersey hospitals",
        body: "Hospital HVAC in New Jersey is designed space by space to ASHRAE 170. Operating rooms hold positive pressure at 20 air changes per hour with temperature between 68 and 75 degrees and relative humidity between 20 and 60 percent, delivered through low-velocity diffuser arrays that sweep contaminants away from the sterile field. Airborne-infection isolation rooms reverse the relationship — negative pressure at 12 ACH with anterooms and continuous monitoring. At Hackensack University Medical Center in Hackensack and RWJBarnabas Health in West Orange, these pressure relationships are the first thing plan reviewers verify, and the building automation system proves them around the clock. NYC-adjacent density: northern New Jersey campuses compete directly with Manhattan flagships, driving continuous tower, ED, and specialty-pavilion investment on tight urban sites.",
      },
      {
        h2: "New Jersey health-facility plan review, handled",
        body: "New Jersey hospital projects require certificate-of-need approval through the Department of Health, with facility plan review. Our submittals are built for the reviewer's checklist: FGI Guidelines compliance narratives, ASHRAE 170 ventilation schedules with every space's air changes, outdoor air, pressure relationship, temperature, humidity, and filtration listed, NFPA 99 medical gas riser diagrams with zone valves and alarms, and essential-electrical one-lines showing the life safety, critical, and equipment branches. We engage the reviewer early, answer comments in days, and keep the project moving — because a health system's opening date is a clinical commitment, not a suggestion.",
      },
      {
        h2: "Surgical suites and sterile processing in New Jersey",
        body: "Surgical capacity is the economic engine of New Jersey hospitals — from Hackensack University Medical Center's operating rooms to ambulatory surgery centers across the state — and its MEP design is unforgiving. Each OR needs 20 total air changes per hour, positive pressure to the corridor, HEPA-filtered supply, and N+1 redundancy on the air-handling so a fan failure never cancels a case. Sterile processing departments need their own pressure cascade: decontamination negative, clean workroom positive, sterilizer rooms exhausted. Medical gas zone valves sit outside every OR suite with area alarms at the nurses' station. We design surgical MEP for the survey as well as the surgery: Joint Commission and CMS surveyors trace pressure relationships, humidity logs, and medical gas alarms on every visit.",
      },
    ],
    faqs: [
      {
        question: "Which health systems drive hospital construction in New Jersey?",
        answer: "The major owners are Hackensack University Medical Center (Hackensack); RWJBarnabas Health (West Orange); Atlantic Health System (Morristown); Virtua Health (Marlton). We design for health-system standards as well as one-off projects, so a system's MEP criteria carry across its campuses.",
      },
      {
        question: "How does New Jersey review hospital construction plans?",
        answer: "New Jersey hospital projects require certificate-of-need approval through the Department of Health, with facility plan review. We build the submittal for that reviewer's checklist and resolve comments fast.",
      },
      {
        question: "What is USP 800 and which facilities need it?",
        answer: "USP General Chapter 800 governs the handling of hazardous drugs in healthcare settings. Facilities that compound or handle hazardous drugs — hospital pharmacies, oncology infusion pharmacies, veterinary compounding — need a containment suite: a negative-pressure secondary engineering control (C-SEC) at -0.01 to -0.03 inches water column, externally vented primary controls (C-PEC), 30 air changes per hour, and strict temperature and humidity control. State boards of pharmacy enforce it.",
      },
      {
        question: "How much does hospital MEP engineering cost?",
        answer: "Hospital MEP engineering fees typically run 6 to 10 percent of the MEP construction value. Since MEP systems represent 30 to 45 percent of total hospital construction — and new acute-care hospitals cost $600 to over $1,000 per square foot — engineering fees generally land in the range of $15 to $45 per square foot, with surgical suites, isolation, pharmacy, and lab spaces commanding the high end.",
      },
    ],
    founderNote: founderNote,
    extraLinks: [
      { text: "Hospital MEP Engineering in Hackensack, NJ", href: "/healthcare-design/new-jersey/hackensack/" },
      { text: "Hospital MEP Engineering in New Brunswick, NJ", href: "/healthcare-design/new-jersey/new-brunswick/" },
      { text: "Hospital MEP Engineering in Newark, NJ", href: "/healthcare-design/new-jersey/newark/" },
      { text: "Hospital MEP Engineering in Morristown, NJ", href: "/healthcare-design/new-jersey/morristown/" },
      { text: "Hospital MEP Engineering in Camden, NJ", href: "/healthcare-design/new-jersey/camden/" },
      { text: "Hospital MEP Engineering in Edison, NJ", href: "/healthcare-design/new-jersey/edison/" },
      { text: "Hospital MEP Engineering in Paterson, NJ", href: "/healthcare-design/new-jersey/paterson/" },
      { text: "What Are ASHRAE 170 Ventilation Requirements?", href: "/answers/healthcare-ashrae-170-ventilation-requirements/" },
      { text: "How Much Does Hospital MEP Design Cost?", href: "/answers/healthcare-hospital-mep-design-cost/" },
      { text: "MEP Engineering Services", href: "/mep-engineering/" },
      { text: "Mechanical Engineering", href: "/mechanical-engineering/" },
      { text: "Electrical Engineering", href: "/electrical-engineering/" },
      { text: "Healthcare Industry Practice", href: "/industries/healthcare/" },
      { text: "Get a Healthcare Engineering Estimate", href: "/estimate" },
    ],
  },
  {
    slug: "healthcare-design/new-mexico",
    title: "Hospital MEP Design in New Mexico: Engineering & Plan Review",
    description: "New Mexico hospital MEP engineering: ASHRAE 170 HVAC, NFPA 99 medical gas, USP 800 pharmacy design. New Mexico plan-review support and schedule-driven delivery.",
    h1: "Hospital MEP Design in New Mexico: Engineering & Plan Review",
    directAnswer: "Apex Grid Engineering provides hospital MEP design in New Mexico — HVAC to ASHRAE 170, NFPA 99 medical gas, USP 800 pharmacy, and emergency power — for Presbyterian Healthcare Services in Albuquerque, UNM Hospital in Albuquerque, Lovelace Health System in Albuquerque, with New Mexico plan-review support.",
    answer: "New Mexico healthcare is Albuquerque-centric: Presbyterian Healthcare Services (the state's largest system; its 453-bed Presbyterian Hospital is #1) and UNM Hospital (the only Level 1 trauma center and only academic center), with Lovelace's 5-hospital footprint and Christus St. Vincent anchoring Santa Fe.\n\nNew Mexico hospital construction is reviewed by the Department of Health's facility program, with local building department permits. That review shapes the engineering from the first drawing: ventilation schedules proving every space's air changes and pressure relationships, medical gas risers with zone valves and alarms, and essential-electrical one-lines the reviewer can trace.\n\nHigh-desert and rural-access design: vast catchment areas, Native American health facilities, and HVAC engineered for extreme diurnal temperature swings. Apex designs for that reality — and for the schedule. Health systems expanding in New Mexico get schedule-driven delivery: early reviewer engagement, submittals built for the checklist, and comment responses in days, not weeks.",
    sections: [
      {
        h2: "Clinical-space HVAC for New Mexico hospitals",
        body: "Hospital HVAC in New Mexico is designed space by space to ASHRAE 170. Operating rooms hold positive pressure at 20 air changes per hour with temperature between 68 and 75 degrees and relative humidity between 20 and 60 percent, delivered through low-velocity diffuser arrays that sweep contaminants away from the sterile field. Airborne-infection isolation rooms reverse the relationship — negative pressure at 12 ACH with anterooms and continuous monitoring. At Presbyterian Healthcare Services in Albuquerque and UNM Hospital in Albuquerque, these pressure relationships are the first thing plan reviewers verify, and the building automation system proves them around the clock. High-desert and rural-access design: vast catchment areas, Native American health facilities, and HVAC engineered for extreme diurnal temperature swings.",
      },
      {
        h2: "New Mexico health-facility plan review, handled",
        body: "New Mexico hospital construction is reviewed by the Department of Health's facility program, with local building department permits. Our submittals are built for the reviewer's checklist: FGI Guidelines compliance narratives, ASHRAE 170 ventilation schedules with every space's air changes, outdoor air, pressure relationship, temperature, humidity, and filtration listed, NFPA 99 medical gas riser diagrams with zone valves and alarms, and essential-electrical one-lines showing the life safety, critical, and equipment branches. We engage the reviewer early, answer comments in days, and keep the project moving — because a health system's opening date is a clinical commitment, not a suggestion.",
      },
      {
        h2: "Surgical suites and sterile processing in New Mexico",
        body: "Surgical capacity is the economic engine of New Mexico hospitals — from Presbyterian Healthcare Services's operating rooms to ambulatory surgery centers across the state — and its MEP design is unforgiving. Each OR needs 20 total air changes per hour, positive pressure to the corridor, HEPA-filtered supply, and N+1 redundancy on the air-handling so a fan failure never cancels a case. Sterile processing departments need their own pressure cascade: decontamination negative, clean workroom positive, sterilizer rooms exhausted. Medical gas zone valves sit outside every OR suite with area alarms at the nurses' station. We design surgical MEP for the survey as well as the surgery: Joint Commission and CMS surveyors trace pressure relationships, humidity logs, and medical gas alarms on every visit.",
      },
      {
        h2: "Pharmacy, lab, and specialty spaces in New Mexico",
        body: "Beyond the bed tower, New Mexico health systems are building the specialty spaces that carry modern care: USP 800 hazardous-drug compounding suites with negative-pressure C-SECs at 30 air changes per hour and externally vented C-PEC hoods; USP 797 sterile compounding with ISO-classified buffer and ante areas; BSL-2 and BSL-3 laboratories with directional airflow, single-pass exhaust, and sealed penetrations; and vivarium facilities with 10 to 15 air changes per hour and tight temperature and humidity control. Each carries its own code regime — state pharmacy board, CDC biosafety, AAALAC — and each gets dedicated HVAC, monitoring, and alarming independent of the building's comfort systems.",
      },
    ],
    faqs: [
      {
        question: "Which health systems drive hospital construction in New Mexico?",
        answer: "The major owners are Presbyterian Healthcare Services (Albuquerque); UNM Hospital (Albuquerque); Lovelace Health System (Albuquerque); Christus St. Vincent Regional Medical Center (Santa Fe). We design for health-system standards as well as one-off projects, so a system's MEP criteria carry across its campuses.",
      },
      {
        question: "How does New Mexico review hospital construction plans?",
        answer: "New Mexico hospital construction is reviewed by the Department of Health's facility program, with local building department permits. We build the submittal for that reviewer's checklist and resolve comments fast.",
      },
      {
        question: "What does ICRA require during hospital renovation?",
        answer: "The ICRA 2.0 process classifies construction activity (Type A through D) and patient risk groups, then assigns precautions Class I through V: dust-tight barriers, negative-pressure containment with HEPA-filtered exhaust, sealed penetrations, debris handling in covered containers, and traffic patterns separated from patient care. The ICRA matrix and barrier plan belong in the construction documents for plan review and the facility's infection preventionist.",
      },
      {
        question: "How long does healthcare plan review take?",
        answer: "It depends on the state. Standard health-department facility review runs 4 to 12 weeks in most states; California HCAI review runs longer with its seismic program; certificate-of-need states add months before design review even begins. We compress the timeline with early AHJ engagement, submittals built for the reviewer's checklist, and comment responses turned in days.",
      },
    ],
    founderNote: founderNote,
    extraLinks: [
      { text: "Hospital MEP Engineering in Albuquerque, NM", href: "/healthcare-design/new-mexico/albuquerque/" },
      { text: "Hospital MEP Engineering in Santa Fe, NM", href: "/healthcare-design/new-mexico/santa-fe/" },
      { text: "Hospital MEP Engineering in Las Cruces, NM", href: "/healthcare-design/new-mexico/las-cruces/" },
      { text: "Hospital MEP Engineering in Rio Rancho, NM", href: "/healthcare-design/new-mexico/rio-rancho/" },
      { text: "Hospital MEP Engineering in Farmington, NM", href: "/healthcare-design/new-mexico/farmington/" },
      { text: "What Are ASHRAE 170 Ventilation Requirements?", href: "/answers/healthcare-ashrae-170-ventilation-requirements/" },
      { text: "How Much Does Hospital MEP Design Cost?", href: "/answers/healthcare-hospital-mep-design-cost/" },
      { text: "MEP Engineering Services", href: "/mep-engineering/" },
      { text: "Mechanical Engineering", href: "/mechanical-engineering/" },
      { text: "Electrical Engineering", href: "/electrical-engineering/" },
      { text: "Healthcare Industry Practice", href: "/industries/healthcare/" },
      { text: "Get a Healthcare Engineering Estimate", href: "/estimate" },
    ],
  },
  {
    slug: "healthcare-design/new-york",
    title: "Hospital MEP Design in New York: Engineering & Plan Review",
    description: "New York hospital MEP engineering: ASHRAE 170 HVAC, NFPA 99 medical gas, USP 800 pharmacy design. New York plan-review support and schedule-driven delivery.",
    h1: "Hospital MEP Design in New York: Engineering & Plan Review",
    directAnswer: "Apex Grid Engineering provides hospital MEP design in New York — HVAC to ASHRAE 170, NFPA 99 medical gas, USP 800 pharmacy, and emergency power — for NewYork-Presbyterian Hospital in New York, NYU Langone Hospitals in New York, Mount Sinai Hospital in New York, with New York plan-review support.",
    answer: "New York is the most competitive hospital market in America: NYP, NYU Langone, and Mount Sinai (1,139 beds) tied at #1, with Northwell as the state's largest system and strong upstate anchors in Buffalo (Roswell Park, Kaleida), Rochester (UR Medicine), and Syracuse (Upstate).\n\nNew York hospital projects require certificate-of-need approval through the Department of Health — one of the most complex CON processes in the country — plus NYC Department of Buildings review in the five boroughs. That review shapes the engineering from the first drawing: ventilation schedules proving every space's air changes and pressure relationships, medical gas risers with zone valves and alarms, and essential-electrical one-lines the reviewer can trace.\n\nManhattan's vertical hospital campuses are the hardest healthcare engineering in the country: occupied-tower renovation, ICRA phasing, and infrastructure replacement without closing a bed. Apex designs for that reality — and for the schedule. Health systems expanding in New York get schedule-driven delivery: early reviewer engagement, submittals built for the checklist, and comment responses in days, not weeks.",
    sections: [
      {
        h2: "New York health-facility plan review, handled",
        body: "New York hospital projects require certificate-of-need approval through the Department of Health — one of the most complex CON processes in the country — plus NYC Department of Buildings review in the five boroughs. Our submittals are built for the reviewer's checklist: FGI Guidelines compliance narratives, ASHRAE 170 ventilation schedules with every space's air changes, outdoor air, pressure relationship, temperature, humidity, and filtration listed, NFPA 99 medical gas riser diagrams with zone valves and alarms, and essential-electrical one-lines showing the life safety, critical, and equipment branches. We engage the reviewer early, answer comments in days, and keep the project moving — because a health system's opening date is a clinical commitment, not a suggestion.",
      },
      {
        h2: "Surgical suites and sterile processing in New York",
        body: "Surgical capacity is the economic engine of New York hospitals — from NewYork-Presbyterian Hospital's operating rooms to ambulatory surgery centers across the state — and its MEP design is unforgiving. Each OR needs 20 total air changes per hour, positive pressure to the corridor, HEPA-filtered supply, and N+1 redundancy on the air-handling so a fan failure never cancels a case. Sterile processing departments need their own pressure cascade: decontamination negative, clean workroom positive, sterilizer rooms exhausted. Medical gas zone valves sit outside every OR suite with area alarms at the nurses' station. We design surgical MEP for the survey as well as the surgery: Joint Commission and CMS surveyors trace pressure relationships, humidity logs, and medical gas alarms on every visit.",
      },
      {
        h2: "Pharmacy, lab, and specialty spaces in New York",
        body: "Beyond the bed tower, New York health systems are building the specialty spaces that carry modern care: USP 800 hazardous-drug compounding suites with negative-pressure C-SECs at 30 air changes per hour and externally vented C-PEC hoods; USP 797 sterile compounding with ISO-classified buffer and ante areas; BSL-2 and BSL-3 laboratories with directional airflow, single-pass exhaust, and sealed penetrations; and vivarium facilities with 10 to 15 air changes per hour and tight temperature and humidity control. Each carries its own code regime — state pharmacy board, CDC biosafety, AAALAC — and each gets dedicated HVAC, monitoring, and alarming independent of the building's comfort systems.",
      },
      {
        h2: "Renovating occupied New York hospitals",
        body: "Most New York hospital work is renovation inside fully operational buildings — a new OR at NewYork-Presbyterian Hospital, an ED expansion, a pharmacy brought up to USP 800. Our construction documents carry ICRA 2.0 infection-control risk assessments matched to the work: Class I through V precautions, dust-tight barriers with negative-pressure containment, HEPA-filtered exhaust, sealed penetrations, and traffic patterns that keep construction crews out of patient corridors. Shutdowns are sequenced — med gas, normal power, HVAC — with temporary systems bridging every outage and life-safety maintained throughout. The facility's infection preventionist approves the ICRA plan before work starts because it is on the drawings, not in a memo afterward.",
      },
    ],
    faqs: [
      {
        question: "Which health systems drive hospital construction in New York?",
        answer: "The major owners are NewYork-Presbyterian Hospital (New York); NYU Langone Hospitals (New York); Mount Sinai Hospital (New York); Northwell Health (New Hyde Park). We design for health-system standards as well as one-off projects, so a system's MEP criteria carry across its campuses.",
      },
      {
        question: "How does New York review hospital construction plans?",
        answer: "New York hospital projects require certificate-of-need approval through the Department of Health — one of the most complex CON processes in the country — plus NYC Department of Buildings review in the five boroughs. We build the submittal for that reviewer's checklist and resolve comments fast.",
      },
      {
        question: "What emergency power do hospitals require?",
        answer: "Hospitals require an essential electrical system per NFPA 99: life safety, critical, and equipment branches served by on-site generators that start and assume load within 10 seconds of a normal-power failure. NFPA 110 governs the generator installation, fuel supply, and monthly testing. Critical branch loads — ORs, ICUs, emergency departments — transfer automatically; the design must prove selective coordination and load-shed sequencing.",
      },
      {
        question: "What pressure relationships do hospital rooms need?",
        answer: "Operating rooms and protective-environment rooms run positive to adjacent spaces to keep contaminants out; airborne-infection isolation rooms, USP 800 compounding rooms, and soiled utility rooms run negative to contain contaminants. Anterooms buffer the transition. Each relationship is continuously monitored and alarmed through the building automation system, and the pressure map is part of the plan-review submittal.",
      },
    ],
    founderNote: founderNote,
    extraLinks: [
      { text: "Hospital MEP Engineering in New York City, NY", href: "/healthcare-design/new-york/new-york-city/" },
      { text: "Hospital MEP Engineering in Buffalo, NY", href: "/healthcare-design/new-york/buffalo/" },
      { text: "Hospital MEP Engineering in Rochester, NY", href: "/healthcare-design/new-york/rochester/" },
      { text: "Hospital MEP Engineering in Syracuse, NY", href: "/healthcare-design/new-york/syracuse/" },
      { text: "Hospital MEP Engineering in Albany, NY", href: "/healthcare-design/new-york/albany/" },
      { text: "Hospital MEP Engineering in White Plains, NY", href: "/healthcare-design/new-york/white-plains/" },
      { text: "What Are ASHRAE 170 Ventilation Requirements?", href: "/answers/healthcare-ashrae-170-ventilation-requirements/" },
      { text: "How Much Does Hospital MEP Design Cost?", href: "/answers/healthcare-hospital-mep-design-cost/" },
      { text: "MEP Engineering Services", href: "/mep-engineering/" },
      { text: "Mechanical Engineering", href: "/mechanical-engineering/" },
      { text: "Electrical Engineering", href: "/electrical-engineering/" },
      { text: "Healthcare Industry Practice", href: "/industries/healthcare/" },
      { text: "Get a Healthcare Engineering Estimate", href: "/estimate" },
    ],
  },
  {
    slug: "healthcare-design/north-carolina",
    title: "Hospital MEP Design in North Carolina: Engineering & Plan Review",
    description: "North Carolina hospital MEP engineering: ASHRAE 170 HVAC, NFPA 99 medical gas, USP 800 pharmacy design. North Carolina plan-review support, delivered fast.",
    h1: "Hospital MEP Design in North Carolina: Engineering & Plan Review",
    directAnswer: "Apex Grid Engineering provides hospital MEP design in North Carolina — HVAC to ASHRAE 170, NFPA 99 medical gas, USP 800 pharmacy, and emergency power — for Duke University Hospital in Durham, UNC Hospitals in Chapel Hill, Atrium Health Wake Forest Baptist in Winston-Salem, with North Carolina plan-review support.",
    answer: "North Carolina's Research Triangle is an academic-medicine powerhouse: Duke (1,106 beds, #1), UNC Hospitals (1,000+), and Atrium Wake Forest Baptist (1,000+), with ECU Health's 974-bed Greenville campus anchoring the east and Atrium/Novant competing in Charlotte.\n\nNorth Carolina hospital projects require certificate-of-need approval through the Division of Health Service Regulation — an active, litigated CON program that shapes every bed tower in the state. That review shapes the engineering from the first drawing: ventilation schedules proving every space's air changes and pressure relationships, medical gas risers with zone valves and alarms, and essential-electrical one-lines the reviewer can trace.\n\nNorth Carolina's contested CON program means facility strategy and regulatory strategy are inseparable — bed need, service-line planning, and design advance as one package. Apex designs for that reality — and for the schedule. Health systems expanding in North Carolina get schedule-driven delivery: early reviewer engagement, submittals built for the checklist, and comment responses in days, not weeks.",
    sections: [
      {
        h2: "Surgical suites and sterile processing in North Carolina",
        body: "Surgical capacity is the economic engine of North Carolina hospitals — from Duke University Hospital's operating rooms to ambulatory surgery centers across the state — and its MEP design is unforgiving. Each OR needs 20 total air changes per hour, positive pressure to the corridor, HEPA-filtered supply, and N+1 redundancy on the air-handling so a fan failure never cancels a case. Sterile processing departments need their own pressure cascade: decontamination negative, clean workroom positive, sterilizer rooms exhausted. Medical gas zone valves sit outside every OR suite with area alarms at the nurses' station. We design surgical MEP for the survey as well as the surgery: Joint Commission and CMS surveyors trace pressure relationships, humidity logs, and medical gas alarms on every visit.",
      },
      {
        h2: "Pharmacy, lab, and specialty spaces in North Carolina",
        body: "Beyond the bed tower, North Carolina health systems are building the specialty spaces that carry modern care: USP 800 hazardous-drug compounding suites with negative-pressure C-SECs at 30 air changes per hour and externally vented C-PEC hoods; USP 797 sterile compounding with ISO-classified buffer and ante areas; BSL-2 and BSL-3 laboratories with directional airflow, single-pass exhaust, and sealed penetrations; and vivarium facilities with 10 to 15 air changes per hour and tight temperature and humidity control. Each carries its own code regime — state pharmacy board, CDC biosafety, AAALAC — and each gets dedicated HVAC, monitoring, and alarming independent of the building's comfort systems.",
      },
      {
        h2: "Renovating occupied North Carolina hospitals",
        body: "Most North Carolina hospital work is renovation inside fully operational buildings — a new OR at Duke University Hospital, an ED expansion, a pharmacy brought up to USP 800. Our construction documents carry ICRA 2.0 infection-control risk assessments matched to the work: Class I through V precautions, dust-tight barriers with negative-pressure containment, HEPA-filtered exhaust, sealed penetrations, and traffic patterns that keep construction crews out of patient corridors. Shutdowns are sequenced — med gas, normal power, HVAC — with temporary systems bridging every outage and life-safety maintained throughout. The facility's infection preventionist approves the ICRA plan before work starts because it is on the drawings, not in a memo afterward.",
      },
      {
        h2: "Emergency power and medical gas across North Carolina",
        body: "Every North Carolina hospital depends on systems patients never see. The essential electrical system — life safety, critical, and equipment branches per NFPA 99 — rides on generators that start within 10 seconds, with selective coordination, load-shed sequencing, and monthly NFPA 110 testing baked into the design. Medical gas piping runs zoned and alarmed: oxygen, medical air, nitrous oxide, vacuum, and waste anesthetic gas with area zone valves outside each critical-care zone and master alarms where staff always watch. North Carolina's contested CON program means facility strategy and regulatory strategy are inseparable — bed need, service-line planning, and design advance as one package.",
      },
    ],
    faqs: [
      {
        question: "Which health systems drive hospital construction in North Carolina?",
        answer: "The major owners are Duke University Hospital (Durham); UNC Hospitals (Chapel Hill); Atrium Health Wake Forest Baptist (Winston-Salem); ECU Health Medical Center (Greenville). We design for health-system standards as well as one-off projects, so a system's MEP criteria carry across its campuses.",
      },
      {
        question: "How does North Carolina review hospital construction plans?",
        answer: "North Carolina hospital projects require certificate-of-need approval through the Division of Health Service Regulation — an active, litigated CON program that shapes every bed tower in the state. We build the submittal for that reviewer's checklist and resolve comments fast.",
      },
      {
        question: "What ventilation rates does ASHRAE 170 require?",
        answer: "ASHRAE Standard 170 sets ventilation by space type: operating rooms need 20 total air changes per hour at positive pressure, trauma rooms 15 ACH, airborne-infection isolation rooms 12 ACH at negative pressure, protective-environment rooms 12 ACH at positive pressure, and patient rooms 6 ACH with 2 ACH of outdoor air. Temperature and humidity ranges are specified per space, and the standard is enforced through state health-department plan review.",
      },
      {
        question: "How are medical gas systems designed under NFPA 99?",
        answer: "NFPA 99 categorizes health care facilities by risk (Category 1 through 4) and governs medical gas and vacuum systems accordingly: zoned piping with area zone valves outside each critical-care zone, source equipment with automatic changeover, master and area alarms at attended locations, labeled outlets, and third-party certification testing before the system goes live. The medical gas design is a dedicated plan-review item in most states.",
      },
    ],
    founderNote: founderNote,
    extraLinks: [
      { text: "Hospital MEP Engineering in Durham, NC", href: "/healthcare-design/north-carolina/durham/" },
      { text: "Hospital MEP Engineering in Chapel Hill, NC", href: "/healthcare-design/north-carolina/chapel-hill/" },
      { text: "Hospital MEP Engineering in Winston-Salem, NC", href: "/healthcare-design/north-carolina/winston-salem/" },
      { text: "Hospital MEP Engineering in Charlotte, NC", href: "/healthcare-design/north-carolina/charlotte/" },
      { text: "Hospital MEP Engineering in Raleigh, NC", href: "/healthcare-design/north-carolina/raleigh/" },
      { text: "Hospital MEP Engineering in Greenville, NC", href: "/healthcare-design/north-carolina/greenville/" },
      { text: "Hospital MEP Engineering in Asheville, NC", href: "/healthcare-design/north-carolina/asheville/" },
      { text: "What Are ASHRAE 170 Ventilation Requirements?", href: "/answers/healthcare-ashrae-170-ventilation-requirements/" },
      { text: "How Much Does Hospital MEP Design Cost?", href: "/answers/healthcare-hospital-mep-design-cost/" },
      { text: "MEP Engineering Services", href: "/mep-engineering/" },
      { text: "Mechanical Engineering", href: "/mechanical-engineering/" },
      { text: "Electrical Engineering", href: "/electrical-engineering/" },
      { text: "Healthcare Industry Practice", href: "/industries/healthcare/" },
      { text: "Get a Healthcare Engineering Estimate", href: "/estimate" },
    ],
  },
  {
    slug: "healthcare-design/north-dakota",
    title: "Hospital MEP Design in North Dakota: Engineering & Plan Review",
    description: "North Dakota hospital MEP engineering: ASHRAE 170 HVAC, NFPA 99 medical gas, USP 800 pharmacy design. North Dakota plan-review support, delivered fast.",
    h1: "Hospital MEP Design in North Dakota: Engineering & Plan Review",
    directAnswer: "Apex Grid Engineering provides hospital MEP design in North Dakota — HVAC to ASHRAE 170, NFPA 99 medical gas, USP 800 pharmacy, and emergency power — for Sanford Health in Fargo, Essentia Health in Fargo, CHI St. Alexius Health in Bismarck, with North Dakota plan-review support.",
    answer: "North Dakota healthcare is Fargo-centric: Sanford Health's flagship (the system's largest facility, #1 in the state) and Essentia's Fargo campus, with CHI St. Alexius anchoring Bismarck, Altru in Grand Forks, and Trinity in Minot.\n\nNorth Dakota hospital construction is reviewed by the Department of Health and Human Services' facility program, with the state fire marshal reviewing life safety. That review shapes the engineering from the first drawing: ventilation schedules proving every space's air changes and pressure relationships, medical gas risers with zone valves and alarms, and essential-electrical one-lines the reviewer can trace.\n\nExtreme-winter and energy-boom design: minus-30 design temperatures, Bakken-region workforce housing clinics, and facilities built for vast rural catchments. Apex designs for that reality — and for the schedule. Health systems expanding in North Dakota get schedule-driven delivery: early reviewer engagement, submittals built for the checklist, and comment responses in days, not weeks.",
    sections: [
      {
        h2: "Pharmacy, lab, and specialty spaces in North Dakota",
        body: "Beyond the bed tower, North Dakota health systems are building the specialty spaces that carry modern care: USP 800 hazardous-drug compounding suites with negative-pressure C-SECs at 30 air changes per hour and externally vented C-PEC hoods; USP 797 sterile compounding with ISO-classified buffer and ante areas; BSL-2 and BSL-3 laboratories with directional airflow, single-pass exhaust, and sealed penetrations; and vivarium facilities with 10 to 15 air changes per hour and tight temperature and humidity control. Each carries its own code regime — state pharmacy board, CDC biosafety, AAALAC — and each gets dedicated HVAC, monitoring, and alarming independent of the building's comfort systems.",
      },
      {
        h2: "Renovating occupied North Dakota hospitals",
        body: "Most North Dakota hospital work is renovation inside fully operational buildings — a new OR at Sanford Health, an ED expansion, a pharmacy brought up to USP 800. Our construction documents carry ICRA 2.0 infection-control risk assessments matched to the work: Class I through V precautions, dust-tight barriers with negative-pressure containment, HEPA-filtered exhaust, sealed penetrations, and traffic patterns that keep construction crews out of patient corridors. Shutdowns are sequenced — med gas, normal power, HVAC — with temporary systems bridging every outage and life-safety maintained throughout. The facility's infection preventionist approves the ICRA plan before work starts because it is on the drawings, not in a memo afterward.",
      },
      {
        h2: "Emergency power and medical gas across North Dakota",
        body: "Every North Dakota hospital depends on systems patients never see. The essential electrical system — life safety, critical, and equipment branches per NFPA 99 — rides on generators that start within 10 seconds, with selective coordination, load-shed sequencing, and monthly NFPA 110 testing baked into the design. Medical gas piping runs zoned and alarmed: oxygen, medical air, nitrous oxide, vacuum, and waste anesthetic gas with area zone valves outside each critical-care zone and master alarms where staff always watch. Extreme-winter and energy-boom design: minus-30 design temperatures, Bakken-region workforce housing clinics, and facilities built for vast rural catchments.",
      },
      {
        h2: "Clinical-space HVAC for North Dakota hospitals",
        body: "Hospital HVAC in North Dakota is designed space by space to ASHRAE 170. Operating rooms hold positive pressure at 20 air changes per hour with temperature between 68 and 75 degrees and relative humidity between 20 and 60 percent, delivered through low-velocity diffuser arrays that sweep contaminants away from the sterile field. Airborne-infection isolation rooms reverse the relationship — negative pressure at 12 ACH with anterooms and continuous monitoring. At Sanford Health in Fargo and Essentia Health in Fargo, these pressure relationships are the first thing plan reviewers verify, and the building automation system proves them around the clock. Extreme-winter and energy-boom design: minus-30 design temperatures, Bakken-region workforce housing clinics, and facilities built for vast rural catchments.",
      },
    ],
    faqs: [
      {
        question: "Which health systems drive hospital construction in North Dakota?",
        answer: "The major owners are Sanford Health (Fargo); Essentia Health (Fargo); CHI St. Alexius Health (Bismarck); Altru Health System (Grand Forks). We design for health-system standards as well as one-off projects, so a system's MEP criteria carry across its campuses.",
      },
      {
        question: "How does North Dakota review hospital construction plans?",
        answer: "North Dakota hospital construction is reviewed by the Department of Health and Human Services' facility program, with the state fire marshal reviewing life safety. We build the submittal for that reviewer's checklist and resolve comments fast.",
      },
      {
        question: "What is USP 800 and which facilities need it?",
        answer: "USP General Chapter 800 governs the handling of hazardous drugs in healthcare settings. Facilities that compound or handle hazardous drugs — hospital pharmacies, oncology infusion pharmacies, veterinary compounding — need a containment suite: a negative-pressure secondary engineering control (C-SEC) at -0.01 to -0.03 inches water column, externally vented primary controls (C-PEC), 30 air changes per hour, and strict temperature and humidity control. State boards of pharmacy enforce it.",
      },
      {
        question: "How much does hospital MEP engineering cost?",
        answer: "Hospital MEP engineering fees typically run 6 to 10 percent of the MEP construction value. Since MEP systems represent 30 to 45 percent of total hospital construction — and new acute-care hospitals cost $600 to over $1,000 per square foot — engineering fees generally land in the range of $15 to $45 per square foot, with surgical suites, isolation, pharmacy, and lab spaces commanding the high end.",
      },
    ],
    founderNote: founderNote,
    extraLinks: [
      { text: "Hospital MEP Engineering in Fargo, ND", href: "/healthcare-design/north-dakota/fargo/" },
      { text: "Hospital MEP Engineering in Bismarck, ND", href: "/healthcare-design/north-dakota/bismarck/" },
      { text: "Hospital MEP Engineering in Grand Forks, ND", href: "/healthcare-design/north-dakota/grand-forks/" },
      { text: "Hospital MEP Engineering in Minot, ND", href: "/healthcare-design/north-dakota/minot/" },
      { text: "Hospital MEP Engineering in West Fargo, ND", href: "/healthcare-design/north-dakota/west-fargo/" },
      { text: "Hospital MEP Engineering in Dickinson, ND", href: "/healthcare-design/north-dakota/dickinson/" },
      { text: "What Are ASHRAE 170 Ventilation Requirements?", href: "/answers/healthcare-ashrae-170-ventilation-requirements/" },
      { text: "How Much Does Hospital MEP Design Cost?", href: "/answers/healthcare-hospital-mep-design-cost/" },
      { text: "MEP Engineering Services", href: "/mep-engineering/" },
      { text: "Mechanical Engineering", href: "/mechanical-engineering/" },
      { text: "Electrical Engineering", href: "/electrical-engineering/" },
      { text: "Healthcare Industry Practice", href: "/industries/healthcare/" },
      { text: "Get a Healthcare Engineering Estimate", href: "/estimate" },
    ],
  },
  {
    slug: "healthcare-design/ohio",
    title: "Ohio Hospital MEP Design: Engineering Services & Plan Review",
    description: "Ohio hospital MEP engineering: ASHRAE 170 HVAC, NFPA 99 medical gas, USP 800 pharmacy design. Ohio health-facility plan review, handled start to finish.",
    h1: "Ohio Hospital MEP Design: Engineering Services & Plan Review",
    directAnswer: "Apex Grid Engineering provides hospital MEP design in Ohio — HVAC to ASHRAE 170, NFPA 99 medical gas, USP 800 pharmacy, and emergency power — for Cleveland Clinic in Cleveland, OhioHealth Riverside Methodist in Columbus, University Hospitals Cleveland Medical Center in Cleveland, with Ohio plan-review support.",
    answer: "Ohio is a three-metro heavyweight: Cleveland Clinic (1,299 beds, #1 in the state, perennial national top-5) and UH Cleveland (1,032) in the north, Ohio State's Wexner and OhioHealth Riverside (1,059) in Columbus, and a deep Cincinnati bench — all in a no-CON, build-friendly regulatory climate.\n\nOhio hospital construction is reviewed by the Ohio Department of Health's facility program; Ohio has no certificate-of-need program. That review shapes the engineering from the first drawing: ventilation schedules proving every space's air changes and pressure relationships, medical gas risers with zone valves and alarms, and essential-electrical one-lines the reviewer can trace.\n\nOhio's no-CON environment rewards speed: systems expand on market timing, not regulatory calendars — schedule-driven design and fast plan-review support win the work. Apex designs for that reality — and for the schedule. Health systems expanding in Ohio get schedule-driven delivery: early reviewer engagement, submittals built for the checklist, and comment responses in days, not weeks.",
    sections: [
      {
        h2: "Renovating occupied Ohio hospitals",
        body: "Most Ohio hospital work is renovation inside fully operational buildings — a new OR at Cleveland Clinic, an ED expansion, a pharmacy brought up to USP 800. Our construction documents carry ICRA 2.0 infection-control risk assessments matched to the work: Class I through V precautions, dust-tight barriers with negative-pressure containment, HEPA-filtered exhaust, sealed penetrations, and traffic patterns that keep construction crews out of patient corridors. Shutdowns are sequenced — med gas, normal power, HVAC — with temporary systems bridging every outage and life-safety maintained throughout. The facility's infection preventionist approves the ICRA plan before work starts because it is on the drawings, not in a memo afterward.",
      },
      {
        h2: "Emergency power and medical gas across Ohio",
        body: "Every Ohio hospital depends on systems patients never see. The essential electrical system — life safety, critical, and equipment branches per NFPA 99 — rides on generators that start within 10 seconds, with selective coordination, load-shed sequencing, and monthly NFPA 110 testing baked into the design. Medical gas piping runs zoned and alarmed: oxygen, medical air, nitrous oxide, vacuum, and waste anesthetic gas with area zone valves outside each critical-care zone and master alarms where staff always watch. Ohio's no-CON environment rewards speed: systems expand on market timing, not regulatory calendars — schedule-driven design and fast plan-review support win the work.",
      },
      {
        h2: "Clinical-space HVAC for Ohio hospitals",
        body: "Hospital HVAC in Ohio is designed space by space to ASHRAE 170. Operating rooms hold positive pressure at 20 air changes per hour with temperature between 68 and 75 degrees and relative humidity between 20 and 60 percent, delivered through low-velocity diffuser arrays that sweep contaminants away from the sterile field. Airborne-infection isolation rooms reverse the relationship — negative pressure at 12 ACH with anterooms and continuous monitoring. At Cleveland Clinic in Cleveland and OhioHealth Riverside Methodist in Columbus, these pressure relationships are the first thing plan reviewers verify, and the building automation system proves them around the clock. Ohio's no-CON environment rewards speed: systems expand on market timing, not regulatory calendars — schedule-driven design and fast plan-review support win the work.",
      },
      {
        h2: "Ohio health-facility plan review, handled",
        body: "Ohio hospital construction is reviewed by the Ohio Department of Health's facility program; Ohio has no certificate-of-need program. Our submittals are built for the reviewer's checklist: FGI Guidelines compliance narratives, ASHRAE 170 ventilation schedules with every space's air changes, outdoor air, pressure relationship, temperature, humidity, and filtration listed, NFPA 99 medical gas riser diagrams with zone valves and alarms, and essential-electrical one-lines showing the life safety, critical, and equipment branches. We engage the reviewer early, answer comments in days, and keep the project moving — because a health system's opening date is a clinical commitment, not a suggestion.",
      },
    ],
    faqs: [
      {
        question: "Which health systems drive hospital construction in Ohio?",
        answer: "The major owners are Cleveland Clinic (Cleveland); OhioHealth Riverside Methodist (Columbus); University Hospitals Cleveland Medical Center (Cleveland); Ohio State University Wexner Medical Center (Columbus). We design for health-system standards as well as one-off projects, so a system's MEP criteria carry across its campuses.",
      },
      {
        question: "How does Ohio review hospital construction plans?",
        answer: "Ohio hospital construction is reviewed by the Ohio Department of Health's facility program; Ohio has no certificate-of-need program. We build the submittal for that reviewer's checklist and resolve comments fast.",
      },
      {
        question: "What does ICRA require during hospital renovation?",
        answer: "The ICRA 2.0 process classifies construction activity (Type A through D) and patient risk groups, then assigns precautions Class I through V: dust-tight barriers, negative-pressure containment with HEPA-filtered exhaust, sealed penetrations, debris handling in covered containers, and traffic patterns separated from patient care. The ICRA matrix and barrier plan belong in the construction documents for plan review and the facility's infection preventionist.",
      },
      {
        question: "How long does healthcare plan review take?",
        answer: "It depends on the state. Standard health-department facility review runs 4 to 12 weeks in most states; California HCAI review runs longer with its seismic program; certificate-of-need states add months before design review even begins. We compress the timeline with early AHJ engagement, submittals built for the reviewer's checklist, and comment responses turned in days.",
      },
    ],
    founderNote: founderNote,
    extraLinks: [
      { text: "Hospital MEP Engineering in Cleveland, OH", href: "/healthcare-design/ohio/cleveland/" },
      { text: "Hospital MEP Engineering in Columbus, OH", href: "/healthcare-design/ohio/columbus/" },
      { text: "Hospital MEP Engineering in Cincinnati, OH", href: "/healthcare-design/ohio/cincinnati/" },
      { text: "Hospital MEP Engineering in Dayton, OH", href: "/healthcare-design/ohio/dayton/" },
      { text: "Hospital MEP Engineering in Toledo, OH", href: "/healthcare-design/ohio/toledo/" },
      { text: "Hospital MEP Engineering in Akron, OH", href: "/healthcare-design/ohio/akron/" },
      { text: "Hospital MEP Engineering in Youngstown, OH", href: "/healthcare-design/ohio/youngstown/" },
      { text: "What Are ASHRAE 170 Ventilation Requirements?", href: "/answers/healthcare-ashrae-170-ventilation-requirements/" },
      { text: "How Much Does Hospital MEP Design Cost?", href: "/answers/healthcare-hospital-mep-design-cost/" },
      { text: "MEP Engineering Services", href: "/mep-engineering/" },
      { text: "Mechanical Engineering", href: "/mechanical-engineering/" },
      { text: "Electrical Engineering", href: "/electrical-engineering/" },
      { text: "Healthcare Industry Practice", href: "/industries/healthcare/" },
      { text: "Get a Healthcare Engineering Estimate", href: "/estimate" },
    ],
  },
  {
    slug: "healthcare-design/oklahoma",
    title: "Hospital MEP Design in Oklahoma: Engineering & Plan Review",
    description: "Oklahoma hospital MEP engineering: ASHRAE 170 HVAC, NFPA 99 medical gas, USP 800 pharmacy design. Oklahoma plan-review support and schedule-driven delivery.",
    h1: "Hospital MEP Design in Oklahoma: Engineering & Plan Review",
    directAnswer: "Apex Grid Engineering provides hospital MEP design in Oklahoma — HVAC to ASHRAE 170, NFPA 99 medical gas, USP 800 pharmacy, and emergency power — for OU Health University of Oklahoma Medical Center in Oklahoma City, Saint Francis Health System in Tulsa, INTEGRIS Health in Oklahoma City, with Oklahoma plan-review support.",
    answer: "Oklahoma pairs two giants: OU Health in Oklahoma City — the state's largest hospital, its only Level I trauma center, and its only comprehensive academic system — and Tulsa's Saint Francis (1,112 beds, the 11th-largest hospital in America, #1 in the state), with INTEGRIS as the largest Oklahoma-owned system (14 hospitals).\n\nOklahoma hospital construction is reviewed by the State Department of Health's facility program; Oklahoma has no certificate-of-need program. That review shapes the engineering from the first drawing: ventilation schedules proving every space's air changes and pressure relationships, medical gas risers with zone valves and alarms, and essential-electrical one-lines the reviewer can trace.\n\nTornado-alley hardening plus no-CON speed: Oklahoma rewards storm-resilient design delivered on aggressive schedules. Apex designs for that reality — and for the schedule. Health systems expanding in Oklahoma get schedule-driven delivery: early reviewer engagement, submittals built for the checklist, and comment responses in days, not weeks.",
    sections: [
      {
        h2: "Emergency power and medical gas across Oklahoma",
        body: "Every Oklahoma hospital depends on systems patients never see. The essential electrical system — life safety, critical, and equipment branches per NFPA 99 — rides on generators that start within 10 seconds, with selective coordination, load-shed sequencing, and monthly NFPA 110 testing baked into the design. Medical gas piping runs zoned and alarmed: oxygen, medical air, nitrous oxide, vacuum, and waste anesthetic gas with area zone valves outside each critical-care zone and master alarms where staff always watch. Tornado-alley hardening plus no-CON speed: Oklahoma rewards storm-resilient design delivered on aggressive schedules.",
      },
      {
        h2: "Clinical-space HVAC for Oklahoma hospitals",
        body: "Hospital HVAC in Oklahoma is designed space by space to ASHRAE 170. Operating rooms hold positive pressure at 20 air changes per hour with temperature between 68 and 75 degrees and relative humidity between 20 and 60 percent, delivered through low-velocity diffuser arrays that sweep contaminants away from the sterile field. Airborne-infection isolation rooms reverse the relationship — negative pressure at 12 ACH with anterooms and continuous monitoring. At OU Health University of Oklahoma Medical Center in Oklahoma City and Saint Francis Health System in Tulsa, these pressure relationships are the first thing plan reviewers verify, and the building automation system proves them around the clock. Tornado-alley hardening plus no-CON speed: Oklahoma rewards storm-resilient design delivered on aggressive schedules.",
      },
      {
        h2: "Oklahoma health-facility plan review, handled",
        body: "Oklahoma hospital construction is reviewed by the State Department of Health's facility program; Oklahoma has no certificate-of-need program. Our submittals are built for the reviewer's checklist: FGI Guidelines compliance narratives, ASHRAE 170 ventilation schedules with every space's air changes, outdoor air, pressure relationship, temperature, humidity, and filtration listed, NFPA 99 medical gas riser diagrams with zone valves and alarms, and essential-electrical one-lines showing the life safety, critical, and equipment branches. We engage the reviewer early, answer comments in days, and keep the project moving — because a health system's opening date is a clinical commitment, not a suggestion.",
      },
      {
        h2: "Surgical suites and sterile processing in Oklahoma",
        body: "Surgical capacity is the economic engine of Oklahoma hospitals — from OU Health University of Oklahoma Medical Center's operating rooms to ambulatory surgery centers across the state — and its MEP design is unforgiving. Each OR needs 20 total air changes per hour, positive pressure to the corridor, HEPA-filtered supply, and N+1 redundancy on the air-handling so a fan failure never cancels a case. Sterile processing departments need their own pressure cascade: decontamination negative, clean workroom positive, sterilizer rooms exhausted. Medical gas zone valves sit outside every OR suite with area alarms at the nurses' station. We design surgical MEP for the survey as well as the surgery: Joint Commission and CMS surveyors trace pressure relationships, humidity logs, and medical gas alarms on every visit.",
      },
    ],
    faqs: [
      {
        question: "Which health systems drive hospital construction in Oklahoma?",
        answer: "The major owners are OU Health University of Oklahoma Medical Center (Oklahoma City); Saint Francis Health System (Tulsa); INTEGRIS Health (Oklahoma City); SSM Health St. Anthony (Oklahoma City). We design for health-system standards as well as one-off projects, so a system's MEP criteria carry across its campuses.",
      },
      {
        question: "How does Oklahoma review hospital construction plans?",
        answer: "Oklahoma hospital construction is reviewed by the State Department of Health's facility program; Oklahoma has no certificate-of-need program. We build the submittal for that reviewer's checklist and resolve comments fast.",
      },
      {
        question: "What emergency power do hospitals require?",
        answer: "Hospitals require an essential electrical system per NFPA 99: life safety, critical, and equipment branches served by on-site generators that start and assume load within 10 seconds of a normal-power failure. NFPA 110 governs the generator installation, fuel supply, and monthly testing. Critical branch loads — ORs, ICUs, emergency departments — transfer automatically; the design must prove selective coordination and load-shed sequencing.",
      },
      {
        question: "What pressure relationships do hospital rooms need?",
        answer: "Operating rooms and protective-environment rooms run positive to adjacent spaces to keep contaminants out; airborne-infection isolation rooms, USP 800 compounding rooms, and soiled utility rooms run negative to contain contaminants. Anterooms buffer the transition. Each relationship is continuously monitored and alarmed through the building automation system, and the pressure map is part of the plan-review submittal.",
      },
    ],
    founderNote: founderNote,
    extraLinks: [
      { text: "Hospital MEP Engineering in Oklahoma City, OK", href: "/healthcare-design/oklahoma/oklahoma-city/" },
      { text: "Hospital MEP Engineering in Tulsa, OK", href: "/healthcare-design/oklahoma/tulsa/" },
      { text: "Hospital MEP Engineering in Norman, OK", href: "/healthcare-design/oklahoma/norman/" },
      { text: "Hospital MEP Engineering in Edmond, OK", href: "/healthcare-design/oklahoma/edmond/" },
      { text: "Hospital MEP Engineering in Broken Arrow, OK", href: "/healthcare-design/oklahoma/broken-arrow/" },
      { text: "Hospital MEP Engineering in Lawton, OK", href: "/healthcare-design/oklahoma/lawton/" },
      { text: "What Are ASHRAE 170 Ventilation Requirements?", href: "/answers/healthcare-ashrae-170-ventilation-requirements/" },
      { text: "How Much Does Hospital MEP Design Cost?", href: "/answers/healthcare-hospital-mep-design-cost/" },
      { text: "MEP Engineering Services", href: "/mep-engineering/" },
      { text: "Mechanical Engineering", href: "/mechanical-engineering/" },
      { text: "Electrical Engineering", href: "/electrical-engineering/" },
      { text: "Healthcare Industry Practice", href: "/industries/healthcare/" },
      { text: "Get a Healthcare Engineering Estimate", href: "/estimate" },
    ],
  },
  {
    slug: "healthcare-design/oregon",
    title: "Hospital MEP Design in Oregon: Engineering & Plan Review",
    description: "Oregon hospital MEP engineering: ASHRAE 170 HVAC, NFPA 99 medical gas, USP 800 pharmacy design. Oregon plan-review support and schedule-driven delivery.",
    h1: "Hospital MEP Design in Oregon: Engineering & Plan Review",
    directAnswer: "Apex Grid Engineering provides hospital MEP design in Oregon — HVAC to ASHRAE 170, NFPA 99 medical gas, USP 800 pharmacy, and emergency power — for OHSU Hospital in Portland, Providence Health in Portland, Legacy Health in Portland, with Oregon plan-review support.",
    answer: "Oregon healthcare centers on Portland's OHSU — the state's only academic medical center and its #1-ranked hospital — with Providence and Legacy spanning the metro and PeaceHealth, Asante, and Samaritan anchoring the valley and south.\n\nOregon hospital projects are reviewed by the Oregon Health Authority, which administers the state's certificate-of-need program. That review shapes the engineering from the first drawing: ventilation schedules proving every space's air changes and pressure relationships, medical gas risers with zone valves and alarms, and essential-electrical one-lines the reviewer can trace.\n\nCascadia-subduction seismic design plus Oregon's CON program: resilience engineering and regulatory strategy in one package. Apex designs for that reality — and for the schedule. Health systems expanding in Oregon get schedule-driven delivery: early reviewer engagement, submittals built for the checklist, and comment responses in days, not weeks.",
    sections: [
      {
        h2: "Clinical-space HVAC for Oregon hospitals",
        body: "Hospital HVAC in Oregon is designed space by space to ASHRAE 170. Operating rooms hold positive pressure at 20 air changes per hour with temperature between 68 and 75 degrees and relative humidity between 20 and 60 percent, delivered through low-velocity diffuser arrays that sweep contaminants away from the sterile field. Airborne-infection isolation rooms reverse the relationship — negative pressure at 12 ACH with anterooms and continuous monitoring. At OHSU Hospital in Portland and Providence Health in Portland, these pressure relationships are the first thing plan reviewers verify, and the building automation system proves them around the clock. Cascadia-subduction seismic design plus Oregon's CON program: resilience engineering and regulatory strategy in one package.",
      },
      {
        h2: "Oregon health-facility plan review, handled",
        body: "Oregon hospital projects are reviewed by the Oregon Health Authority, which administers the state's certificate-of-need program. Our submittals are built for the reviewer's checklist: FGI Guidelines compliance narratives, ASHRAE 170 ventilation schedules with every space's air changes, outdoor air, pressure relationship, temperature, humidity, and filtration listed, NFPA 99 medical gas riser diagrams with zone valves and alarms, and essential-electrical one-lines showing the life safety, critical, and equipment branches. We engage the reviewer early, answer comments in days, and keep the project moving — because a health system's opening date is a clinical commitment, not a suggestion.",
      },
      {
        h2: "Surgical suites and sterile processing in Oregon",
        body: "Surgical capacity is the economic engine of Oregon hospitals — from OHSU Hospital's operating rooms to ambulatory surgery centers across the state — and its MEP design is unforgiving. Each OR needs 20 total air changes per hour, positive pressure to the corridor, HEPA-filtered supply, and N+1 redundancy on the air-handling so a fan failure never cancels a case. Sterile processing departments need their own pressure cascade: decontamination negative, clean workroom positive, sterilizer rooms exhausted. Medical gas zone valves sit outside every OR suite with area alarms at the nurses' station. We design surgical MEP for the survey as well as the surgery: Joint Commission and CMS surveyors trace pressure relationships, humidity logs, and medical gas alarms on every visit.",
      },
      {
        h2: "Pharmacy, lab, and specialty spaces in Oregon",
        body: "Beyond the bed tower, Oregon health systems are building the specialty spaces that carry modern care: USP 800 hazardous-drug compounding suites with negative-pressure C-SECs at 30 air changes per hour and externally vented C-PEC hoods; USP 797 sterile compounding with ISO-classified buffer and ante areas; BSL-2 and BSL-3 laboratories with directional airflow, single-pass exhaust, and sealed penetrations; and vivarium facilities with 10 to 15 air changes per hour and tight temperature and humidity control. Each carries its own code regime — state pharmacy board, CDC biosafety, AAALAC — and each gets dedicated HVAC, monitoring, and alarming independent of the building's comfort systems.",
      },
    ],
    faqs: [
      {
        question: "Which health systems drive hospital construction in Oregon?",
        answer: "The major owners are OHSU Hospital (Portland); Providence Health (Portland); Legacy Health (Portland); PeaceHealth (Springfield). We design for health-system standards as well as one-off projects, so a system's MEP criteria carry across its campuses.",
      },
      {
        question: "How does Oregon review hospital construction plans?",
        answer: "Oregon hospital projects are reviewed by the Oregon Health Authority, which administers the state's certificate-of-need program. We build the submittal for that reviewer's checklist and resolve comments fast.",
      },
      {
        question: "What ventilation rates does ASHRAE 170 require?",
        answer: "ASHRAE Standard 170 sets ventilation by space type: operating rooms need 20 total air changes per hour at positive pressure, trauma rooms 15 ACH, airborne-infection isolation rooms 12 ACH at negative pressure, protective-environment rooms 12 ACH at positive pressure, and patient rooms 6 ACH with 2 ACH of outdoor air. Temperature and humidity ranges are specified per space, and the standard is enforced through state health-department plan review.",
      },
      {
        question: "How are medical gas systems designed under NFPA 99?",
        answer: "NFPA 99 categorizes health care facilities by risk (Category 1 through 4) and governs medical gas and vacuum systems accordingly: zoned piping with area zone valves outside each critical-care zone, source equipment with automatic changeover, master and area alarms at attended locations, labeled outlets, and third-party certification testing before the system goes live. The medical gas design is a dedicated plan-review item in most states.",
      },
    ],
    founderNote: founderNote,
    extraLinks: [
      { text: "Hospital MEP Engineering in Portland, OR", href: "/healthcare-design/oregon/portland/" },
      { text: "Hospital MEP Engineering in Eugene, OR", href: "/healthcare-design/oregon/eugene/" },
      { text: "Hospital MEP Engineering in Salem, OR", href: "/healthcare-design/oregon/salem/" },
      { text: "Hospital MEP Engineering in Medford, OR", href: "/healthcare-design/oregon/medford/" },
      { text: "Hospital MEP Engineering in Bend, OR", href: "/healthcare-design/oregon/bend/" },
      { text: "Hospital MEP Engineering in Hillsboro, OR", href: "/healthcare-design/oregon/hillsboro/" },
      { text: "What Are ASHRAE 170 Ventilation Requirements?", href: "/answers/healthcare-ashrae-170-ventilation-requirements/" },
      { text: "How Much Does Hospital MEP Design Cost?", href: "/answers/healthcare-hospital-mep-design-cost/" },
      { text: "MEP Engineering Services", href: "/mep-engineering/" },
      { text: "Mechanical Engineering", href: "/mechanical-engineering/" },
      { text: "Electrical Engineering", href: "/electrical-engineering/" },
      { text: "Healthcare Industry Practice", href: "/industries/healthcare/" },
      { text: "Get a Healthcare Engineering Estimate", href: "/estimate" },
    ],
  },
  {
    slug: "healthcare-design/pennsylvania",
    title: "Hospital MEP Design in Pennsylvania: Engineering & Plan Review",
    description: "Pennsylvania hospital MEP engineering: ASHRAE 170 HVAC, NFPA 99 medical gas, USP 800 pharmacy design. Pennsylvania plan-review support, delivered fast.",
    h1: "Hospital MEP Design in Pennsylvania: Engineering & Plan Review",
    directAnswer: "Apex Grid Engineering provides hospital MEP design in Pennsylvania — HVAC to ASHRAE 170, NFPA 99 medical gas, USP 800 pharmacy, and emergency power — for Hospitals of the University of Pennsylvania-Penn Presbyterian in Philadelphia, UPMC in Pittsburgh, Jefferson Health in Philadelphia, with Pennsylvania plan-review support.",
    answer: "Pennsylvania is a Philadelphia-Pittsburgh heavyweight: Penn Presbyterian (#1 in the state) and Jefferson in the east, UPMC — one of America's largest systems — and Allegheny Health Network in the west, with Geisinger anchoring the center.\n\nPennsylvania hospital construction is reviewed by the Department of Health's facility program; Pennsylvania has no certificate-of-need program. That review shapes the engineering from the first drawing: ventilation schedules proving every space's air changes and pressure relationships, medical gas risers with zone valves and alarms, and essential-electrical one-lines the reviewer can trace.\n\nLegacy-campus modernization: Pennsylvania's century-old hospital buildings need infrastructure replacement — chillers, air handlers, electrical distribution — engineered around fully occupied floors. Apex designs for that reality — and for the schedule. Health systems expanding in Pennsylvania get schedule-driven delivery: early reviewer engagement, submittals built for the checklist, and comment responses in days, not weeks.",
    sections: [
      {
        h2: "Pennsylvania health-facility plan review, handled",
        body: "Pennsylvania hospital construction is reviewed by the Department of Health's facility program; Pennsylvania has no certificate-of-need program. Our submittals are built for the reviewer's checklist: FGI Guidelines compliance narratives, ASHRAE 170 ventilation schedules with every space's air changes, outdoor air, pressure relationship, temperature, humidity, and filtration listed, NFPA 99 medical gas riser diagrams with zone valves and alarms, and essential-electrical one-lines showing the life safety, critical, and equipment branches. We engage the reviewer early, answer comments in days, and keep the project moving — because a health system's opening date is a clinical commitment, not a suggestion.",
      },
      {
        h2: "Surgical suites and sterile processing in Pennsylvania",
        body: "Surgical capacity is the economic engine of Pennsylvania hospitals — from Hospitals of the University of Pennsylvania-Penn Presbyterian's operating rooms to ambulatory surgery centers across the state — and its MEP design is unforgiving. Each OR needs 20 total air changes per hour, positive pressure to the corridor, HEPA-filtered supply, and N+1 redundancy on the air-handling so a fan failure never cancels a case. Sterile processing departments need their own pressure cascade: decontamination negative, clean workroom positive, sterilizer rooms exhausted. Medical gas zone valves sit outside every OR suite with area alarms at the nurses' station. We design surgical MEP for the survey as well as the surgery: Joint Commission and CMS surveyors trace pressure relationships, humidity logs, and medical gas alarms on every visit.",
      },
      {
        h2: "Pharmacy, lab, and specialty spaces in Pennsylvania",
        body: "Beyond the bed tower, Pennsylvania health systems are building the specialty spaces that carry modern care: USP 800 hazardous-drug compounding suites with negative-pressure C-SECs at 30 air changes per hour and externally vented C-PEC hoods; USP 797 sterile compounding with ISO-classified buffer and ante areas; BSL-2 and BSL-3 laboratories with directional airflow, single-pass exhaust, and sealed penetrations; and vivarium facilities with 10 to 15 air changes per hour and tight temperature and humidity control. Each carries its own code regime — state pharmacy board, CDC biosafety, AAALAC — and each gets dedicated HVAC, monitoring, and alarming independent of the building's comfort systems.",
      },
      {
        h2: "Renovating occupied Pennsylvania hospitals",
        body: "Most Pennsylvania hospital work is renovation inside fully operational buildings — a new OR at Hospitals of the University of Pennsylvania-Penn Presbyterian, an ED expansion, a pharmacy brought up to USP 800. Our construction documents carry ICRA 2.0 infection-control risk assessments matched to the work: Class I through V precautions, dust-tight barriers with negative-pressure containment, HEPA-filtered exhaust, sealed penetrations, and traffic patterns that keep construction crews out of patient corridors. Shutdowns are sequenced — med gas, normal power, HVAC — with temporary systems bridging every outage and life-safety maintained throughout. The facility's infection preventionist approves the ICRA plan before work starts because it is on the drawings, not in a memo afterward.",
      },
    ],
    faqs: [
      {
        question: "Which health systems drive hospital construction in Pennsylvania?",
        answer: "The major owners are Hospitals of the University of Pennsylvania-Penn Presbyterian (Philadelphia); UPMC (Pittsburgh); Jefferson Health (Philadelphia); Geisinger (Danville). We design for health-system standards as well as one-off projects, so a system's MEP criteria carry across its campuses.",
      },
      {
        question: "How does Pennsylvania review hospital construction plans?",
        answer: "Pennsylvania hospital construction is reviewed by the Department of Health's facility program; Pennsylvania has no certificate-of-need program. We build the submittal for that reviewer's checklist and resolve comments fast.",
      },
      {
        question: "What is USP 800 and which facilities need it?",
        answer: "USP General Chapter 800 governs the handling of hazardous drugs in healthcare settings. Facilities that compound or handle hazardous drugs — hospital pharmacies, oncology infusion pharmacies, veterinary compounding — need a containment suite: a negative-pressure secondary engineering control (C-SEC) at -0.01 to -0.03 inches water column, externally vented primary controls (C-PEC), 30 air changes per hour, and strict temperature and humidity control. State boards of pharmacy enforce it.",
      },
      {
        question: "How much does hospital MEP engineering cost?",
        answer: "Hospital MEP engineering fees typically run 6 to 10 percent of the MEP construction value. Since MEP systems represent 30 to 45 percent of total hospital construction — and new acute-care hospitals cost $600 to over $1,000 per square foot — engineering fees generally land in the range of $15 to $45 per square foot, with surgical suites, isolation, pharmacy, and lab spaces commanding the high end.",
      },
    ],
    founderNote: founderNote,
    extraLinks: [
      { text: "Hospital MEP Engineering in Philadelphia, PA", href: "/healthcare-design/pennsylvania/philadelphia/" },
      { text: "Hospital MEP Engineering in Pittsburgh, PA", href: "/healthcare-design/pennsylvania/pittsburgh/" },
      { text: "Hospital MEP Engineering in Hershey, PA", href: "/healthcare-design/pennsylvania/hershey/" },
      { text: "Hospital MEP Engineering in Allentown, PA", href: "/healthcare-design/pennsylvania/allentown/" },
      { text: "Hospital MEP Engineering in Danville, PA", href: "/healthcare-design/pennsylvania/danville/" },
      { text: "Hospital MEP Engineering in Harrisburg, PA", href: "/healthcare-design/pennsylvania/harrisburg/" },
      { text: "Hospital MEP Engineering in Erie, PA", href: "/healthcare-design/pennsylvania/erie/" },
      { text: "What Are ASHRAE 170 Ventilation Requirements?", href: "/answers/healthcare-ashrae-170-ventilation-requirements/" },
      { text: "How Much Does Hospital MEP Design Cost?", href: "/answers/healthcare-hospital-mep-design-cost/" },
      { text: "MEP Engineering Services", href: "/mep-engineering/" },
      { text: "Mechanical Engineering", href: "/mechanical-engineering/" },
      { text: "Electrical Engineering", href: "/electrical-engineering/" },
      { text: "Healthcare Industry Practice", href: "/industries/healthcare/" },
      { text: "Get a Healthcare Engineering Estimate", href: "/estimate" },
    ],
  },
  {
    slug: "healthcare-design/rhode-island",
    title: "Hospital MEP Design in Rhode Island: Engineering & Plan Review",
    description: "Rhode Island hospital MEP engineering: ASHRAE 170 HVAC, NFPA 99 medical gas, USP 800 pharmacy design. Rhode Island plan-review support, delivered fast.",
    h1: "Hospital MEP Design in Rhode Island: Engineering & Plan Review",
    directAnswer: "Apex Grid Engineering provides hospital MEP design in Rhode Island — HVAC to ASHRAE 170, NFPA 99 medical gas, USP 800 pharmacy, and emergency power — for Lifespan in Providence, The Miriam Hospital in Providence, Care New England in Providence, with Rhode Island plan-review support.",
    answer: "Rhode Island's compact market is a Lifespan/Care New England duopoly in Providence — Rhode Island Hospital (the state's largest, with its Level 1 trauma center), The Miriam (#1 in the state), Women & Infants — serving the entire state from one metro.\n\nRhode Island hospital projects require certificate-of-need approval through the Department of Health, with facility plan review. That review shapes the engineering from the first drawing: ventilation schedules proving every space's air changes and pressure relationships, medical gas risers with zone valves and alarms, and essential-electrical one-lines the reviewer can trace.\n\nOne-metro-state efficiency: every Rhode Island project sits within 20 miles of Providence, rewarding hyper-local AHJ knowledge and fast community-hospital delivery. Apex designs for that reality — and for the schedule. Health systems expanding in Rhode Island get schedule-driven delivery: early reviewer engagement, submittals built for the checklist, and comment responses in days, not weeks.",
    sections: [
      {
        h2: "Surgical suites and sterile processing in Rhode Island",
        body: "Surgical capacity is the economic engine of Rhode Island hospitals — from Lifespan's operating rooms to ambulatory surgery centers across the state — and its MEP design is unforgiving. Each OR needs 20 total air changes per hour, positive pressure to the corridor, HEPA-filtered supply, and N+1 redundancy on the air-handling so a fan failure never cancels a case. Sterile processing departments need their own pressure cascade: decontamination negative, clean workroom positive, sterilizer rooms exhausted. Medical gas zone valves sit outside every OR suite with area alarms at the nurses' station. We design surgical MEP for the survey as well as the surgery: Joint Commission and CMS surveyors trace pressure relationships, humidity logs, and medical gas alarms on every visit.",
      },
      {
        h2: "Pharmacy, lab, and specialty spaces in Rhode Island",
        body: "Beyond the bed tower, Rhode Island health systems are building the specialty spaces that carry modern care: USP 800 hazardous-drug compounding suites with negative-pressure C-SECs at 30 air changes per hour and externally vented C-PEC hoods; USP 797 sterile compounding with ISO-classified buffer and ante areas; BSL-2 and BSL-3 laboratories with directional airflow, single-pass exhaust, and sealed penetrations; and vivarium facilities with 10 to 15 air changes per hour and tight temperature and humidity control. Each carries its own code regime — state pharmacy board, CDC biosafety, AAALAC — and each gets dedicated HVAC, monitoring, and alarming independent of the building's comfort systems.",
      },
      {
        h2: "Renovating occupied Rhode Island hospitals",
        body: "Most Rhode Island hospital work is renovation inside fully operational buildings — a new OR at Lifespan, an ED expansion, a pharmacy brought up to USP 800. Our construction documents carry ICRA 2.0 infection-control risk assessments matched to the work: Class I through V precautions, dust-tight barriers with negative-pressure containment, HEPA-filtered exhaust, sealed penetrations, and traffic patterns that keep construction crews out of patient corridors. Shutdowns are sequenced — med gas, normal power, HVAC — with temporary systems bridging every outage and life-safety maintained throughout. The facility's infection preventionist approves the ICRA plan before work starts because it is on the drawings, not in a memo afterward.",
      },
      {
        h2: "Emergency power and medical gas across Rhode Island",
        body: "Every Rhode Island hospital depends on systems patients never see. The essential electrical system — life safety, critical, and equipment branches per NFPA 99 — rides on generators that start within 10 seconds, with selective coordination, load-shed sequencing, and monthly NFPA 110 testing baked into the design. Medical gas piping runs zoned and alarmed: oxygen, medical air, nitrous oxide, vacuum, and waste anesthetic gas with area zone valves outside each critical-care zone and master alarms where staff always watch. One-metro-state efficiency: every Rhode Island project sits within 20 miles of Providence, rewarding hyper-local AHJ knowledge and fast community-hospital delivery.",
      },
    ],
    faqs: [
      {
        question: "Which health systems drive hospital construction in Rhode Island?",
        answer: "The major owners are Lifespan (Providence); The Miriam Hospital (Providence); Care New England (Providence); Rhode Island Hospital (Providence). We design for health-system standards as well as one-off projects, so a system's MEP criteria carry across its campuses.",
      },
      {
        question: "How does Rhode Island review hospital construction plans?",
        answer: "Rhode Island hospital projects require certificate-of-need approval through the Department of Health, with facility plan review. We build the submittal for that reviewer's checklist and resolve comments fast.",
      },
      {
        question: "What does ICRA require during hospital renovation?",
        answer: "The ICRA 2.0 process classifies construction activity (Type A through D) and patient risk groups, then assigns precautions Class I through V: dust-tight barriers, negative-pressure containment with HEPA-filtered exhaust, sealed penetrations, debris handling in covered containers, and traffic patterns separated from patient care. The ICRA matrix and barrier plan belong in the construction documents for plan review and the facility's infection preventionist.",
      },
      {
        question: "How long does healthcare plan review take?",
        answer: "It depends on the state. Standard health-department facility review runs 4 to 12 weeks in most states; California HCAI review runs longer with its seismic program; certificate-of-need states add months before design review even begins. We compress the timeline with early AHJ engagement, submittals built for the reviewer's checklist, and comment responses turned in days.",
      },
    ],
    founderNote: founderNote,
    extraLinks: [
      { text: "Hospital MEP Engineering in Providence, RI", href: "/healthcare-design/rhode-island/providence/" },
      { text: "Hospital MEP Engineering in Warwick, RI", href: "/healthcare-design/rhode-island/warwick/" },
      { text: "Hospital MEP Engineering in Newport, RI", href: "/healthcare-design/rhode-island/newport/" },
      { text: "Hospital MEP Engineering in Woonsocket, RI", href: "/healthcare-design/rhode-island/woonsocket/" },
      { text: "Hospital MEP Engineering in Wakefield, RI", href: "/healthcare-design/rhode-island/wakefield/" },
      { text: "What Are ASHRAE 170 Ventilation Requirements?", href: "/answers/healthcare-ashrae-170-ventilation-requirements/" },
      { text: "How Much Does Hospital MEP Design Cost?", href: "/answers/healthcare-hospital-mep-design-cost/" },
      { text: "MEP Engineering Services", href: "/mep-engineering/" },
      { text: "Mechanical Engineering", href: "/mechanical-engineering/" },
      { text: "Electrical Engineering", href: "/electrical-engineering/" },
      { text: "Healthcare Industry Practice", href: "/industries/healthcare/" },
      { text: "Get a Healthcare Engineering Estimate", href: "/estimate" },
    ],
  },
  {
    slug: "healthcare-design/south-carolina",
    title: "Hospital MEP Design in South Carolina: Engineering & Plan Review",
    description: "South Carolina hospital MEP engineering: ASHRAE 170 HVAC, NFPA 99 medical gas, USP 800 pharmacy design. South Carolina plan-review support, delivered fast.",
    h1: "Hospital MEP Design in South Carolina: Engineering & Plan Review",
    directAnswer: "Apex Grid Engineering provides hospital MEP design in South Carolina — HVAC to ASHRAE 170, NFPA 99 medical gas, USP 800 pharmacy, and emergency power — for MUSC Health University Medical Center in Charleston, Prisma Health in Greenville, Lexington Medical Center in West Columbia, with South Carolina plan-review support.",
    answer: "South Carolina pairs Charleston's MUSC academic flagship (#1 in the state) with Prisma Health — the state's largest system — spanning Greenville, Columbia, and the Upstate, plus strong regional anchors in Spartanburg, Florence, and the Grand Strand.\n\nSouth Carolina hospital projects require certificate-of-need approval through the Department of Health and Environmental Control (DHEC), with facility plan review. That review shapes the engineering from the first drawing: ventilation schedules proving every space's air changes and pressure relationships, medical gas risers with zone valves and alarms, and essential-electrical one-lines the reviewer can trace.\n\nHurricane-zone plus CON: South Carolina hospital work combines DHEC certificate-of-need strategy with coastal resilience — elevated critical systems and storm-hardened envelopes. Apex designs for that reality — and for the schedule. Health systems expanding in South Carolina get schedule-driven delivery: early reviewer engagement, submittals built for the checklist, and comment responses in days, not weeks.",
    sections: [
      {
        h2: "Pharmacy, lab, and specialty spaces in South Carolina",
        body: "Beyond the bed tower, South Carolina health systems are building the specialty spaces that carry modern care: USP 800 hazardous-drug compounding suites with negative-pressure C-SECs at 30 air changes per hour and externally vented C-PEC hoods; USP 797 sterile compounding with ISO-classified buffer and ante areas; BSL-2 and BSL-3 laboratories with directional airflow, single-pass exhaust, and sealed penetrations; and vivarium facilities with 10 to 15 air changes per hour and tight temperature and humidity control. Each carries its own code regime — state pharmacy board, CDC biosafety, AAALAC — and each gets dedicated HVAC, monitoring, and alarming independent of the building's comfort systems.",
      },
      {
        h2: "Renovating occupied South Carolina hospitals",
        body: "Most South Carolina hospital work is renovation inside fully operational buildings — a new OR at MUSC Health University Medical Center, an ED expansion, a pharmacy brought up to USP 800. Our construction documents carry ICRA 2.0 infection-control risk assessments matched to the work: Class I through V precautions, dust-tight barriers with negative-pressure containment, HEPA-filtered exhaust, sealed penetrations, and traffic patterns that keep construction crews out of patient corridors. Shutdowns are sequenced — med gas, normal power, HVAC — with temporary systems bridging every outage and life-safety maintained throughout. The facility's infection preventionist approves the ICRA plan before work starts because it is on the drawings, not in a memo afterward.",
      },
      {
        h2: "Emergency power and medical gas across South Carolina",
        body: "Every South Carolina hospital depends on systems patients never see. The essential electrical system — life safety, critical, and equipment branches per NFPA 99 — rides on generators that start within 10 seconds, with selective coordination, load-shed sequencing, and monthly NFPA 110 testing baked into the design. Medical gas piping runs zoned and alarmed: oxygen, medical air, nitrous oxide, vacuum, and waste anesthetic gas with area zone valves outside each critical-care zone and master alarms where staff always watch. Hurricane-zone plus CON: South Carolina hospital work combines DHEC certificate-of-need strategy with coastal resilience — elevated critical systems and storm-hardened envelopes.",
      },
      {
        h2: "Clinical-space HVAC for South Carolina hospitals",
        body: "Hospital HVAC in South Carolina is designed space by space to ASHRAE 170. Operating rooms hold positive pressure at 20 air changes per hour with temperature between 68 and 75 degrees and relative humidity between 20 and 60 percent, delivered through low-velocity diffuser arrays that sweep contaminants away from the sterile field. Airborne-infection isolation rooms reverse the relationship — negative pressure at 12 ACH with anterooms and continuous monitoring. At MUSC Health University Medical Center in Charleston and Prisma Health in Greenville, these pressure relationships are the first thing plan reviewers verify, and the building automation system proves them around the clock. Hurricane-zone plus CON: South Carolina hospital work combines DHEC certificate-of-need strategy with coastal resilience — elevated critical systems and storm-hardened envelopes.",
      },
    ],
    faqs: [
      {
        question: "Which health systems drive hospital construction in South Carolina?",
        answer: "The major owners are MUSC Health University Medical Center (Charleston); Prisma Health (Greenville); Lexington Medical Center (West Columbia); Roper St. Francis Healthcare (Charleston). We design for health-system standards as well as one-off projects, so a system's MEP criteria carry across its campuses.",
      },
      {
        question: "How does South Carolina review hospital construction plans?",
        answer: "South Carolina hospital projects require certificate-of-need approval through the Department of Health and Environmental Control (DHEC), with facility plan review. We build the submittal for that reviewer's checklist and resolve comments fast.",
      },
      {
        question: "What emergency power do hospitals require?",
        answer: "Hospitals require an essential electrical system per NFPA 99: life safety, critical, and equipment branches served by on-site generators that start and assume load within 10 seconds of a normal-power failure. NFPA 110 governs the generator installation, fuel supply, and monthly testing. Critical branch loads — ORs, ICUs, emergency departments — transfer automatically; the design must prove selective coordination and load-shed sequencing.",
      },
      {
        question: "What pressure relationships do hospital rooms need?",
        answer: "Operating rooms and protective-environment rooms run positive to adjacent spaces to keep contaminants out; airborne-infection isolation rooms, USP 800 compounding rooms, and soiled utility rooms run negative to contain contaminants. Anterooms buffer the transition. Each relationship is continuously monitored and alarmed through the building automation system, and the pressure map is part of the plan-review submittal.",
      },
    ],
    founderNote: founderNote,
    extraLinks: [
      { text: "Hospital MEP Engineering in Charleston, SC", href: "/healthcare-design/south-carolina/charleston/" },
      { text: "Hospital MEP Engineering in Columbia, SC", href: "/healthcare-design/south-carolina/columbia/" },
      { text: "Hospital MEP Engineering in Greenville, SC", href: "/healthcare-design/south-carolina/greenville/" },
      { text: "Hospital MEP Engineering in Spartanburg, SC", href: "/healthcare-design/south-carolina/spartanburg/" },
      { text: "Hospital MEP Engineering in Florence, SC", href: "/healthcare-design/south-carolina/florence/" },
      { text: "Hospital MEP Engineering in Myrtle Beach, SC", href: "/healthcare-design/south-carolina/myrtle-beach/" },
      { text: "What Are ASHRAE 170 Ventilation Requirements?", href: "/answers/healthcare-ashrae-170-ventilation-requirements/" },
      { text: "How Much Does Hospital MEP Design Cost?", href: "/answers/healthcare-hospital-mep-design-cost/" },
      { text: "MEP Engineering Services", href: "/mep-engineering/" },
      { text: "Mechanical Engineering", href: "/mechanical-engineering/" },
      { text: "Electrical Engineering", href: "/electrical-engineering/" },
      { text: "Healthcare Industry Practice", href: "/industries/healthcare/" },
      { text: "Get a Healthcare Engineering Estimate", href: "/estimate" },
    ],
  },
  {
    slug: "healthcare-design/south-dakota",
    title: "Hospital MEP Design in South Dakota: Engineering & Plan Review",
    description: "South Dakota hospital MEP engineering: ASHRAE 170 HVAC, NFPA 99 medical gas, USP 800 pharmacy design. South Dakota plan-review support, delivered fast.",
    h1: "Hospital MEP Design in South Dakota: Engineering & Plan Review",
    directAnswer: "Apex Grid Engineering provides hospital MEP design in South Dakota — HVAC to ASHRAE 170, NFPA 99 medical gas, USP 800 pharmacy, and emergency power — for Sanford USD Medical Center in Sioux Falls, Avera McKennan Hospital in Sioux Falls, Avera Health in Sioux Falls, with South Dakota plan-review support.",
    answer: "South Dakota is a Sioux Falls duopoly with national reach: Sanford USD Medical Center (545 beds, the state's only Level I adult trauma center, #1 in the state) and Avera McKennan — headquarters cities for two of America's largest rural health systems — with Monument Health anchoring Rapid City.\n\nSouth Dakota hospital construction is reviewed by the Department of Health's facility program, with the state fire marshal reviewing life safety. That review shapes the engineering from the first drawing: ventilation schedules proving every space's air changes and pressure relationships, medical gas risers with zone valves and alarms, and essential-electrical one-lines the reviewer can trace.\n\nRural-system headquarters engineering: Sanford and Avera design to system standards deployed across five states — standardization and speed matter more than one-off customization. Apex designs for that reality — and for the schedule. Health systems expanding in South Dakota get schedule-driven delivery: early reviewer engagement, submittals built for the checklist, and comment responses in days, not weeks.",
    sections: [
      {
        h2: "Renovating occupied South Dakota hospitals",
        body: "Most South Dakota hospital work is renovation inside fully operational buildings — a new OR at Sanford USD Medical Center, an ED expansion, a pharmacy brought up to USP 800. Our construction documents carry ICRA 2.0 infection-control risk assessments matched to the work: Class I through V precautions, dust-tight barriers with negative-pressure containment, HEPA-filtered exhaust, sealed penetrations, and traffic patterns that keep construction crews out of patient corridors. Shutdowns are sequenced — med gas, normal power, HVAC — with temporary systems bridging every outage and life-safety maintained throughout. The facility's infection preventionist approves the ICRA plan before work starts because it is on the drawings, not in a memo afterward.",
      },
      {
        h2: "Emergency power and medical gas across South Dakota",
        body: "Every South Dakota hospital depends on systems patients never see. The essential electrical system — life safety, critical, and equipment branches per NFPA 99 — rides on generators that start within 10 seconds, with selective coordination, load-shed sequencing, and monthly NFPA 110 testing baked into the design. Medical gas piping runs zoned and alarmed: oxygen, medical air, nitrous oxide, vacuum, and waste anesthetic gas with area zone valves outside each critical-care zone and master alarms where staff always watch. Rural-system headquarters engineering: Sanford and Avera design to system standards deployed across five states — standardization and speed matter more than one-off customization.",
      },
      {
        h2: "Clinical-space HVAC for South Dakota hospitals",
        body: "Hospital HVAC in South Dakota is designed space by space to ASHRAE 170. Operating rooms hold positive pressure at 20 air changes per hour with temperature between 68 and 75 degrees and relative humidity between 20 and 60 percent, delivered through low-velocity diffuser arrays that sweep contaminants away from the sterile field. Airborne-infection isolation rooms reverse the relationship — negative pressure at 12 ACH with anterooms and continuous monitoring. At Sanford USD Medical Center in Sioux Falls and Avera McKennan Hospital in Sioux Falls, these pressure relationships are the first thing plan reviewers verify, and the building automation system proves them around the clock. Rural-system headquarters engineering: Sanford and Avera design to system standards deployed across five states — standardization and speed matter more than one-off customization.",
      },
      {
        h2: "South Dakota health-facility plan review, handled",
        body: "South Dakota hospital construction is reviewed by the Department of Health's facility program, with the state fire marshal reviewing life safety. Our submittals are built for the reviewer's checklist: FGI Guidelines compliance narratives, ASHRAE 170 ventilation schedules with every space's air changes, outdoor air, pressure relationship, temperature, humidity, and filtration listed, NFPA 99 medical gas riser diagrams with zone valves and alarms, and essential-electrical one-lines showing the life safety, critical, and equipment branches. We engage the reviewer early, answer comments in days, and keep the project moving — because a health system's opening date is a clinical commitment, not a suggestion.",
      },
    ],
    faqs: [
      {
        question: "Which health systems drive hospital construction in South Dakota?",
        answer: "The major owners are Sanford USD Medical Center (Sioux Falls); Avera McKennan Hospital (Sioux Falls); Avera Health (Sioux Falls); Sanford Health (Sioux Falls). We design for health-system standards as well as one-off projects, so a system's MEP criteria carry across its campuses.",
      },
      {
        question: "How does South Dakota review hospital construction plans?",
        answer: "South Dakota hospital construction is reviewed by the Department of Health's facility program, with the state fire marshal reviewing life safety. We build the submittal for that reviewer's checklist and resolve comments fast.",
      },
      {
        question: "What ventilation rates does ASHRAE 170 require?",
        answer: "ASHRAE Standard 170 sets ventilation by space type: operating rooms need 20 total air changes per hour at positive pressure, trauma rooms 15 ACH, airborne-infection isolation rooms 12 ACH at negative pressure, protective-environment rooms 12 ACH at positive pressure, and patient rooms 6 ACH with 2 ACH of outdoor air. Temperature and humidity ranges are specified per space, and the standard is enforced through state health-department plan review.",
      },
      {
        question: "How are medical gas systems designed under NFPA 99?",
        answer: "NFPA 99 categorizes health care facilities by risk (Category 1 through 4) and governs medical gas and vacuum systems accordingly: zoned piping with area zone valves outside each critical-care zone, source equipment with automatic changeover, master and area alarms at attended locations, labeled outlets, and third-party certification testing before the system goes live. The medical gas design is a dedicated plan-review item in most states.",
      },
    ],
    founderNote: founderNote,
    extraLinks: [
      { text: "Hospital MEP Engineering in Sioux Falls, SD", href: "/healthcare-design/south-dakota/sioux-falls/" },
      { text: "Hospital MEP Engineering in Rapid City, SD", href: "/healthcare-design/south-dakota/rapid-city/" },
      { text: "Hospital MEP Engineering in Aberdeen, SD", href: "/healthcare-design/south-dakota/aberdeen/" },
      { text: "Hospital MEP Engineering in Brookings, SD", href: "/healthcare-design/south-dakota/brookings/" },
      { text: "Hospital MEP Engineering in Watertown, SD", href: "/healthcare-design/south-dakota/watertown/" },
      { text: "Hospital MEP Engineering in Mitchell, SD", href: "/healthcare-design/south-dakota/mitchell/" },
      { text: "What Are ASHRAE 170 Ventilation Requirements?", href: "/answers/healthcare-ashrae-170-ventilation-requirements/" },
      { text: "How Much Does Hospital MEP Design Cost?", href: "/answers/healthcare-hospital-mep-design-cost/" },
      { text: "MEP Engineering Services", href: "/mep-engineering/" },
      { text: "Mechanical Engineering", href: "/mechanical-engineering/" },
      { text: "Electrical Engineering", href: "/electrical-engineering/" },
      { text: "Healthcare Industry Practice", href: "/industries/healthcare/" },
      { text: "Get a Healthcare Engineering Estimate", href: "/estimate" },
    ],
  },
  {
    slug: "healthcare-design/tennessee",
    title: "Hospital MEP Design in Tennessee: Engineering & Plan Review",
    description: "Tennessee hospital MEP engineering: ASHRAE 170 HVAC, NFPA 99 medical gas, USP 800 pharmacy design. Tennessee plan-review support and schedule-driven delivery.",
    h1: "Hospital MEP Design in Tennessee: Engineering & Plan Review",
    directAnswer: "Apex Grid Engineering provides hospital MEP design in Tennessee — HVAC to ASHRAE 170, NFPA 99 medical gas, USP 800 pharmacy, and emergency power — for Vanderbilt University Medical Center in Nashville, HCA Healthcare in Nashville, Ascension Saint Thomas in Nashville, with Tennessee plan-review support.",
    answer: "Tennessee is Nashville-centric: Vanderbilt University Medical Center (#1 in the state) and HCA Healthcare — headquartered in Nashville, the largest for-profit hospital company in America — with Ascension Saint Thomas, Memphis' Methodist Le Bonheur, UT Medical in Knoxville, and Erlanger in Chattanooga.\n\nTennessee hospital projects require certificate-of-need approval through the Health Services and Development Agency (HSDA), with Department of Health facility review. That review shapes the engineering from the first drawing: ventilation schedules proving every space's air changes and pressure relationships, medical gas risers with zone valves and alarms, and essential-electrical one-lines the reviewer can trace.\n\nFor-profit development pace: HCA's Nashville headquarters drives some of the fastest hospital development cycles in the country — design teams must match that tempo. Apex designs for that reality — and for the schedule. Health systems expanding in Tennessee get schedule-driven delivery: early reviewer engagement, submittals built for the checklist, and comment responses in days, not weeks.",
    sections: [
      {
        h2: "Emergency power and medical gas across Tennessee",
        body: "Every Tennessee hospital depends on systems patients never see. The essential electrical system — life safety, critical, and equipment branches per NFPA 99 — rides on generators that start within 10 seconds, with selective coordination, load-shed sequencing, and monthly NFPA 110 testing baked into the design. Medical gas piping runs zoned and alarmed: oxygen, medical air, nitrous oxide, vacuum, and waste anesthetic gas with area zone valves outside each critical-care zone and master alarms where staff always watch. For-profit development pace: HCA's Nashville headquarters drives some of the fastest hospital development cycles in the country — design teams must match that tempo.",
      },
      {
        h2: "Clinical-space HVAC for Tennessee hospitals",
        body: "Hospital HVAC in Tennessee is designed space by space to ASHRAE 170. Operating rooms hold positive pressure at 20 air changes per hour with temperature between 68 and 75 degrees and relative humidity between 20 and 60 percent, delivered through low-velocity diffuser arrays that sweep contaminants away from the sterile field. Airborne-infection isolation rooms reverse the relationship — negative pressure at 12 ACH with anterooms and continuous monitoring. At Vanderbilt University Medical Center in Nashville and HCA Healthcare in Nashville, these pressure relationships are the first thing plan reviewers verify, and the building automation system proves them around the clock. For-profit development pace: HCA's Nashville headquarters drives some of the fastest hospital development cycles in the country — design teams must match that tempo.",
      },
      {
        h2: "Tennessee health-facility plan review, handled",
        body: "Tennessee hospital projects require certificate-of-need approval through the Health Services and Development Agency (HSDA), with Department of Health facility review. Our submittals are built for the reviewer's checklist: FGI Guidelines compliance narratives, ASHRAE 170 ventilation schedules with every space's air changes, outdoor air, pressure relationship, temperature, humidity, and filtration listed, NFPA 99 medical gas riser diagrams with zone valves and alarms, and essential-electrical one-lines showing the life safety, critical, and equipment branches. We engage the reviewer early, answer comments in days, and keep the project moving — because a health system's opening date is a clinical commitment, not a suggestion.",
      },
      {
        h2: "Surgical suites and sterile processing in Tennessee",
        body: "Surgical capacity is the economic engine of Tennessee hospitals — from Vanderbilt University Medical Center's operating rooms to ambulatory surgery centers across the state — and its MEP design is unforgiving. Each OR needs 20 total air changes per hour, positive pressure to the corridor, HEPA-filtered supply, and N+1 redundancy on the air-handling so a fan failure never cancels a case. Sterile processing departments need their own pressure cascade: decontamination negative, clean workroom positive, sterilizer rooms exhausted. Medical gas zone valves sit outside every OR suite with area alarms at the nurses' station. We design surgical MEP for the survey as well as the surgery: Joint Commission and CMS surveyors trace pressure relationships, humidity logs, and medical gas alarms on every visit.",
      },
    ],
    faqs: [
      {
        question: "Which health systems drive hospital construction in Tennessee?",
        answer: "The major owners are Vanderbilt University Medical Center (Nashville); HCA Healthcare (Nashville); Ascension Saint Thomas (Nashville); Methodist Le Bonheur Healthcare (Memphis). We design for health-system standards as well as one-off projects, so a system's MEP criteria carry across its campuses.",
      },
      {
        question: "How does Tennessee review hospital construction plans?",
        answer: "Tennessee hospital projects require certificate-of-need approval through the Health Services and Development Agency (HSDA), with Department of Health facility review. We build the submittal for that reviewer's checklist and resolve comments fast.",
      },
      {
        question: "What is USP 800 and which facilities need it?",
        answer: "USP General Chapter 800 governs the handling of hazardous drugs in healthcare settings. Facilities that compound or handle hazardous drugs — hospital pharmacies, oncology infusion pharmacies, veterinary compounding — need a containment suite: a negative-pressure secondary engineering control (C-SEC) at -0.01 to -0.03 inches water column, externally vented primary controls (C-PEC), 30 air changes per hour, and strict temperature and humidity control. State boards of pharmacy enforce it.",
      },
      {
        question: "How much does hospital MEP engineering cost?",
        answer: "Hospital MEP engineering fees typically run 6 to 10 percent of the MEP construction value. Since MEP systems represent 30 to 45 percent of total hospital construction — and new acute-care hospitals cost $600 to over $1,000 per square foot — engineering fees generally land in the range of $15 to $45 per square foot, with surgical suites, isolation, pharmacy, and lab spaces commanding the high end.",
      },
    ],
    founderNote: founderNote,
    extraLinks: [
      { text: "Hospital MEP Engineering in Nashville, TN", href: "/healthcare-design/tennessee/nashville/" },
      { text: "Hospital MEP Engineering in Memphis, TN", href: "/healthcare-design/tennessee/memphis/" },
      { text: "Hospital MEP Engineering in Knoxville, TN", href: "/healthcare-design/tennessee/knoxville/" },
      { text: "Hospital MEP Engineering in Chattanooga, TN", href: "/healthcare-design/tennessee/chattanooga/" },
      { text: "Hospital MEP Engineering in Murfreesboro, TN", href: "/healthcare-design/tennessee/murfreesboro/" },
      { text: "Hospital MEP Engineering in Franklin, TN", href: "/healthcare-design/tennessee/franklin/" },
      { text: "Hospital MEP Engineering in Clarksville, TN", href: "/healthcare-design/tennessee/clarksville/" },
      { text: "What Are ASHRAE 170 Ventilation Requirements?", href: "/answers/healthcare-ashrae-170-ventilation-requirements/" },
      { text: "How Much Does Hospital MEP Design Cost?", href: "/answers/healthcare-hospital-mep-design-cost/" },
      { text: "MEP Engineering Services", href: "/mep-engineering/" },
      { text: "Mechanical Engineering", href: "/mechanical-engineering/" },
      { text: "Electrical Engineering", href: "/electrical-engineering/" },
      { text: "Healthcare Industry Practice", href: "/industries/healthcare/" },
      { text: "Get a Healthcare Engineering Estimate", href: "/estimate" },
    ],
  },
  {
    slug: "healthcare-design/texas",
    title: "Hospital MEP Design in Texas: Engineering & Plan Review",
    description: "Texas hospital MEP engineering: ASHRAE 170 HVAC, NFPA 99 medical gas, USP 800 pharmacy design. Texas plan-review support and schedule-driven delivery.",
    h1: "Hospital MEP Design in Texas: Engineering & Plan Review",
    directAnswer: "Apex Grid Engineering provides hospital MEP design in Texas — HVAC to ASHRAE 170, NFPA 99 medical gas, USP 800 pharmacy, and emergency power — for Houston Methodist Hospital in Houston, Memorial Hermann-Texas Medical Center in Houston, Baylor University Medical Center in Dallas, with Texas plan-review support.",
    answer: "Texas is the biggest hospital construction market in America: the Texas Medical Center in Houston — the world's largest medical complex, home to Houston Methodist (#1 in Texas), Memorial Hermann (1,137 beds), MD Anderson, and Texas Children's — plus Dallas' Baylor (914 beds), Parkland (882), and UT Southwestern. No CON means systems build on market timing.\n\nTexas hospital construction is reviewed by the Texas Department of State Health Services' facility program; Texas has no certificate-of-need program, so market timing drives development. That review shapes the engineering from the first drawing: ventilation schedules proving every space's air changes and pressure relationships, medical gas risers with zone valves and alarms, and essential-electrical one-lines the reviewer can trace.\n\nScale plus hurricane plus no-CON speed: Texas hospital work means mega-campus infrastructure, Gulf Coast storm hardening, and development cycles that move at market pace. Apex designs for that reality — and for the schedule. Health systems expanding in Texas get schedule-driven delivery: early reviewer engagement, submittals built for the checklist, and comment responses in days, not weeks.",
    sections: [
      {
        h2: "Clinical-space HVAC for Texas hospitals",
        body: "Hospital HVAC in Texas is designed space by space to ASHRAE 170. Operating rooms hold positive pressure at 20 air changes per hour with temperature between 68 and 75 degrees and relative humidity between 20 and 60 percent, delivered through low-velocity diffuser arrays that sweep contaminants away from the sterile field. Airborne-infection isolation rooms reverse the relationship — negative pressure at 12 ACH with anterooms and continuous monitoring. At Houston Methodist Hospital in Houston and Memorial Hermann-Texas Medical Center in Houston, these pressure relationships are the first thing plan reviewers verify, and the building automation system proves them around the clock. Scale plus hurricane plus no-CON speed: Texas hospital work means mega-campus infrastructure, Gulf Coast storm hardening, and development cycles that move at market pace.",
      },
      {
        h2: "Texas health-facility plan review, handled",
        body: "Texas hospital construction is reviewed by the Texas Department of State Health Services' facility program; Texas has no certificate-of-need program, so market timing drives development. Our submittals are built for the reviewer's checklist: FGI Guidelines compliance narratives, ASHRAE 170 ventilation schedules with every space's air changes, outdoor air, pressure relationship, temperature, humidity, and filtration listed, NFPA 99 medical gas riser diagrams with zone valves and alarms, and essential-electrical one-lines showing the life safety, critical, and equipment branches. We engage the reviewer early, answer comments in days, and keep the project moving — because a health system's opening date is a clinical commitment, not a suggestion.",
      },
      {
        h2: "Surgical suites and sterile processing in Texas",
        body: "Surgical capacity is the economic engine of Texas hospitals — from Houston Methodist Hospital's operating rooms to ambulatory surgery centers across the state — and its MEP design is unforgiving. Each OR needs 20 total air changes per hour, positive pressure to the corridor, HEPA-filtered supply, and N+1 redundancy on the air-handling so a fan failure never cancels a case. Sterile processing departments need their own pressure cascade: decontamination negative, clean workroom positive, sterilizer rooms exhausted. Medical gas zone valves sit outside every OR suite with area alarms at the nurses' station. We design surgical MEP for the survey as well as the surgery: Joint Commission and CMS surveyors trace pressure relationships, humidity logs, and medical gas alarms on every visit.",
      },
      {
        h2: "Pharmacy, lab, and specialty spaces in Texas",
        body: "Beyond the bed tower, Texas health systems are building the specialty spaces that carry modern care: USP 800 hazardous-drug compounding suites with negative-pressure C-SECs at 30 air changes per hour and externally vented C-PEC hoods; USP 797 sterile compounding with ISO-classified buffer and ante areas; BSL-2 and BSL-3 laboratories with directional airflow, single-pass exhaust, and sealed penetrations; and vivarium facilities with 10 to 15 air changes per hour and tight temperature and humidity control. Each carries its own code regime — state pharmacy board, CDC biosafety, AAALAC — and each gets dedicated HVAC, monitoring, and alarming independent of the building's comfort systems.",
      },
    ],
    faqs: [
      {
        question: "Which health systems drive hospital construction in Texas?",
        answer: "The major owners are Houston Methodist Hospital (Houston); Memorial Hermann-Texas Medical Center (Houston); Baylor University Medical Center (Dallas); Parkland Memorial Hospital (Dallas). We design for health-system standards as well as one-off projects, so a system's MEP criteria carry across its campuses.",
      },
      {
        question: "How does Texas review hospital construction plans?",
        answer: "Texas hospital construction is reviewed by the Texas Department of State Health Services' facility program; Texas has no certificate-of-need program, so market timing drives development. We build the submittal for that reviewer's checklist and resolve comments fast.",
      },
      {
        question: "What does ICRA require during hospital renovation?",
        answer: "The ICRA 2.0 process classifies construction activity (Type A through D) and patient risk groups, then assigns precautions Class I through V: dust-tight barriers, negative-pressure containment with HEPA-filtered exhaust, sealed penetrations, debris handling in covered containers, and traffic patterns separated from patient care. The ICRA matrix and barrier plan belong in the construction documents for plan review and the facility's infection preventionist.",
      },
      {
        question: "How long does healthcare plan review take?",
        answer: "It depends on the state. Standard health-department facility review runs 4 to 12 weeks in most states; California HCAI review runs longer with its seismic program; certificate-of-need states add months before design review even begins. We compress the timeline with early AHJ engagement, submittals built for the reviewer's checklist, and comment responses turned in days.",
      },
    ],
    founderNote: founderNote,
    extraLinks: [
      { text: "Hospital MEP Engineering in Houston, TX", href: "/healthcare-design/texas/houston/" },
      { text: "Hospital MEP Engineering in Dallas, TX", href: "/healthcare-design/texas/dallas/" },
      { text: "Hospital MEP Engineering in San Antonio, TX", href: "/healthcare-design/texas/san-antonio/" },
      { text: "Hospital MEP Engineering in Austin, TX", href: "/healthcare-design/texas/austin/" },
      { text: "Hospital MEP Engineering in Fort Worth, TX", href: "/healthcare-design/texas/fort-worth/" },
      { text: "Hospital MEP Engineering in El Paso, TX", href: "/healthcare-design/texas/el-paso/" },
      { text: "Hospital MEP Engineering in Lubbock, TX", href: "/healthcare-design/texas/lubbock/" },
      { text: "What Are ASHRAE 170 Ventilation Requirements?", href: "/answers/healthcare-ashrae-170-ventilation-requirements/" },
      { text: "How Much Does Hospital MEP Design Cost?", href: "/answers/healthcare-hospital-mep-design-cost/" },
      { text: "MEP Engineering Services", href: "/mep-engineering/" },
      { text: "Mechanical Engineering", href: "/mechanical-engineering/" },
      { text: "Electrical Engineering", href: "/electrical-engineering/" },
      { text: "Healthcare Industry Practice", href: "/industries/healthcare/" },
      { text: "Get a Healthcare Engineering Estimate", href: "/estimate" },
    ],
  },
  {
    slug: "healthcare-design/utah",
    title: "Utah Hospital MEP Design: Engineering Services & Plan Review",
    description: "Utah hospital MEP engineering: ASHRAE 170 HVAC, NFPA 99 medical gas, USP 800 pharmacy design. Utah health-facility plan review, handled start to finish.",
    h1: "Utah Hospital MEP Design: Engineering Services & Plan Review",
    directAnswer: "Apex Grid Engineering provides hospital MEP design in Utah — HVAC to ASHRAE 170, NFPA 99 medical gas, USP 800 pharmacy, and emergency power — for Intermountain Health in Murray, University of Utah Health in Salt Lake City, Primary Children's Hospital in Salt Lake City, with Utah plan-review support.",
    answer: "Utah's market is an Intermountain/U of U duopoly: Intermountain Health — the largest nonprofit in the Intermountain West, anchored by the 504-bed Intermountain Medical Center — and University of Utah Health, the state's only academic center and its only Level 1 trauma center within 200 miles (#1 in Utah).\n\nUtah hospital construction is reviewed by the Department of Health and Human Services' facility program, with local building department permits. That review shapes the engineering from the first drawing: ventilation schedules proving every space's air changes and pressure relationships, medical gas risers with zone valves and alarms, and essential-electrical one-lines the reviewer can trace.\n\nSystem-standardized delivery: Intermountain's design standards and the U's academic-research growth reward teams fluent in repeatable, high-performance healthcare design. Apex designs for that reality — and for the schedule. Health systems expanding in Utah get schedule-driven delivery: early reviewer engagement, submittals built for the checklist, and comment responses in days, not weeks.",
    sections: [
      {
        h2: "Utah health-facility plan review, handled",
        body: "Utah hospital construction is reviewed by the Department of Health and Human Services' facility program, with local building department permits. Our submittals are built for the reviewer's checklist: FGI Guidelines compliance narratives, ASHRAE 170 ventilation schedules with every space's air changes, outdoor air, pressure relationship, temperature, humidity, and filtration listed, NFPA 99 medical gas riser diagrams with zone valves and alarms, and essential-electrical one-lines showing the life safety, critical, and equipment branches. We engage the reviewer early, answer comments in days, and keep the project moving — because a health system's opening date is a clinical commitment, not a suggestion.",
      },
      {
        h2: "Surgical suites and sterile processing in Utah",
        body: "Surgical capacity is the economic engine of Utah hospitals — from Intermountain Health's operating rooms to ambulatory surgery centers across the state — and its MEP design is unforgiving. Each OR needs 20 total air changes per hour, positive pressure to the corridor, HEPA-filtered supply, and N+1 redundancy on the air-handling so a fan failure never cancels a case. Sterile processing departments need their own pressure cascade: decontamination negative, clean workroom positive, sterilizer rooms exhausted. Medical gas zone valves sit outside every OR suite with area alarms at the nurses' station. We design surgical MEP for the survey as well as the surgery: Joint Commission and CMS surveyors trace pressure relationships, humidity logs, and medical gas alarms on every visit.",
      },
      {
        h2: "Pharmacy, lab, and specialty spaces in Utah",
        body: "Beyond the bed tower, Utah health systems are building the specialty spaces that carry modern care: USP 800 hazardous-drug compounding suites with negative-pressure C-SECs at 30 air changes per hour and externally vented C-PEC hoods; USP 797 sterile compounding with ISO-classified buffer and ante areas; BSL-2 and BSL-3 laboratories with directional airflow, single-pass exhaust, and sealed penetrations; and vivarium facilities with 10 to 15 air changes per hour and tight temperature and humidity control. Each carries its own code regime — state pharmacy board, CDC biosafety, AAALAC — and each gets dedicated HVAC, monitoring, and alarming independent of the building's comfort systems.",
      },
      {
        h2: "Renovating occupied Utah hospitals",
        body: "Most Utah hospital work is renovation inside fully operational buildings — a new OR at Intermountain Health, an ED expansion, a pharmacy brought up to USP 800. Our construction documents carry ICRA 2.0 infection-control risk assessments matched to the work: Class I through V precautions, dust-tight barriers with negative-pressure containment, HEPA-filtered exhaust, sealed penetrations, and traffic patterns that keep construction crews out of patient corridors. Shutdowns are sequenced — med gas, normal power, HVAC — with temporary systems bridging every outage and life-safety maintained throughout. The facility's infection preventionist approves the ICRA plan before work starts because it is on the drawings, not in a memo afterward.",
      },
    ],
    faqs: [
      {
        question: "Which health systems drive hospital construction in Utah?",
        answer: "The major owners are Intermountain Health (Murray); University of Utah Health (Salt Lake City); Primary Children's Hospital (Salt Lake City); Huntsman Cancer Institute (Salt Lake City). We design for health-system standards as well as one-off projects, so a system's MEP criteria carry across its campuses.",
      },
      {
        question: "How does Utah review hospital construction plans?",
        answer: "Utah hospital construction is reviewed by the Department of Health and Human Services' facility program, with local building department permits. We build the submittal for that reviewer's checklist and resolve comments fast.",
      },
      {
        question: "What emergency power do hospitals require?",
        answer: "Hospitals require an essential electrical system per NFPA 99: life safety, critical, and equipment branches served by on-site generators that start and assume load within 10 seconds of a normal-power failure. NFPA 110 governs the generator installation, fuel supply, and monthly testing. Critical branch loads — ORs, ICUs, emergency departments — transfer automatically; the design must prove selective coordination and load-shed sequencing.",
      },
      {
        question: "What pressure relationships do hospital rooms need?",
        answer: "Operating rooms and protective-environment rooms run positive to adjacent spaces to keep contaminants out; airborne-infection isolation rooms, USP 800 compounding rooms, and soiled utility rooms run negative to contain contaminants. Anterooms buffer the transition. Each relationship is continuously monitored and alarmed through the building automation system, and the pressure map is part of the plan-review submittal.",
      },
    ],
    founderNote: founderNote,
    extraLinks: [
      { text: "Hospital MEP Engineering in Salt Lake City, UT", href: "/healthcare-design/utah/salt-lake-city/" },
      { text: "Hospital MEP Engineering in Murray, UT", href: "/healthcare-design/utah/murray/" },
      { text: "Hospital MEP Engineering in Provo, UT", href: "/healthcare-design/utah/provo/" },
      { text: "Hospital MEP Engineering in Ogden, UT", href: "/healthcare-design/utah/ogden/" },
      { text: "Hospital MEP Engineering in St. George, UT", href: "/healthcare-design/utah/st-george/" },
      { text: "Hospital MEP Engineering in Sandy, UT", href: "/healthcare-design/utah/sandy/" },
      { text: "What Are ASHRAE 170 Ventilation Requirements?", href: "/answers/healthcare-ashrae-170-ventilation-requirements/" },
      { text: "How Much Does Hospital MEP Design Cost?", href: "/answers/healthcare-hospital-mep-design-cost/" },
      { text: "MEP Engineering Services", href: "/mep-engineering/" },
      { text: "Mechanical Engineering", href: "/mechanical-engineering/" },
      { text: "Electrical Engineering", href: "/electrical-engineering/" },
      { text: "Healthcare Industry Practice", href: "/industries/healthcare/" },
      { text: "Get a Healthcare Engineering Estimate", href: "/estimate" },
    ],
  },
  {
    slug: "healthcare-design/vermont",
    title: "Hospital MEP Design in Vermont: Engineering & Plan Review",
    description: "Vermont hospital MEP engineering: ASHRAE 170 HVAC, NFPA 99 medical gas, USP 800 pharmacy design. Vermont plan-review support and schedule-driven delivery.",
    h1: "Hospital MEP Design in Vermont: Engineering & Plan Review",
    directAnswer: "Apex Grid Engineering provides hospital MEP design in Vermont — HVAC to ASHRAE 170, NFPA 99 medical gas, USP 800 pharmacy, and emergency power — for University of Vermont Medical Center in Burlington, UVM Health Network in Burlington, Central Vermont Medical Center in Berlin, with Vermont plan-review support.",
    answer: "Vermont is a single-anchor state: the University of Vermont Medical Center in Burlington — the state's only Level 1 trauma center and its #1-ranked hospital — with Central Vermont, Rutland Regional, and Southwestern Vermont covering the regions under the Green Mountain Care Board's watchful budget review.\n\nVermont hospital projects are regulated by the Green Mountain Care Board, which reviews hospital budgets and major capital projects — a uniquely hands-on regulatory model. That review shapes the engineering from the first drawing: ventilation schedules proving every space's air changes and pressure relationships, medical gas risers with zone valves and alarms, and essential-electrical one-lines the reviewer can trace.\n\nBudget-board regulation: the Green Mountain Care Board reviews hospital budgets and capital projects, so facility planning here is inseparable from financial justification. Apex designs for that reality — and for the schedule. Health systems expanding in Vermont get schedule-driven delivery: early reviewer engagement, submittals built for the checklist, and comment responses in days, not weeks.",
    sections: [
      {
        h2: "Surgical suites and sterile processing in Vermont",
        body: "Surgical capacity is the economic engine of Vermont hospitals — from University of Vermont Medical Center's operating rooms to ambulatory surgery centers across the state — and its MEP design is unforgiving. Each OR needs 20 total air changes per hour, positive pressure to the corridor, HEPA-filtered supply, and N+1 redundancy on the air-handling so a fan failure never cancels a case. Sterile processing departments need their own pressure cascade: decontamination negative, clean workroom positive, sterilizer rooms exhausted. Medical gas zone valves sit outside every OR suite with area alarms at the nurses' station. We design surgical MEP for the survey as well as the surgery: Joint Commission and CMS surveyors trace pressure relationships, humidity logs, and medical gas alarms on every visit.",
      },
      {
        h2: "Pharmacy, lab, and specialty spaces in Vermont",
        body: "Beyond the bed tower, Vermont health systems are building the specialty spaces that carry modern care: USP 800 hazardous-drug compounding suites with negative-pressure C-SECs at 30 air changes per hour and externally vented C-PEC hoods; USP 797 sterile compounding with ISO-classified buffer and ante areas; BSL-2 and BSL-3 laboratories with directional airflow, single-pass exhaust, and sealed penetrations; and vivarium facilities with 10 to 15 air changes per hour and tight temperature and humidity control. Each carries its own code regime — state pharmacy board, CDC biosafety, AAALAC — and each gets dedicated HVAC, monitoring, and alarming independent of the building's comfort systems.",
      },
      {
        h2: "Renovating occupied Vermont hospitals",
        body: "Most Vermont hospital work is renovation inside fully operational buildings — a new OR at University of Vermont Medical Center, an ED expansion, a pharmacy brought up to USP 800. Our construction documents carry ICRA 2.0 infection-control risk assessments matched to the work: Class I through V precautions, dust-tight barriers with negative-pressure containment, HEPA-filtered exhaust, sealed penetrations, and traffic patterns that keep construction crews out of patient corridors. Shutdowns are sequenced — med gas, normal power, HVAC — with temporary systems bridging every outage and life-safety maintained throughout. The facility's infection preventionist approves the ICRA plan before work starts because it is on the drawings, not in a memo afterward.",
      },
      {
        h2: "Emergency power and medical gas across Vermont",
        body: "Every Vermont hospital depends on systems patients never see. The essential electrical system — life safety, critical, and equipment branches per NFPA 99 — rides on generators that start within 10 seconds, with selective coordination, load-shed sequencing, and monthly NFPA 110 testing baked into the design. Medical gas piping runs zoned and alarmed: oxygen, medical air, nitrous oxide, vacuum, and waste anesthetic gas with area zone valves outside each critical-care zone and master alarms where staff always watch. Budget-board regulation: the Green Mountain Care Board reviews hospital budgets and capital projects, so facility planning here is inseparable from financial justification.",
      },
    ],
    faqs: [
      {
        question: "Which health systems drive hospital construction in Vermont?",
        answer: "The major owners are University of Vermont Medical Center (Burlington); UVM Health Network (Burlington); Central Vermont Medical Center (Berlin); Rutland Regional Medical Center (Rutland). We design for health-system standards as well as one-off projects, so a system's MEP criteria carry across its campuses.",
      },
      {
        question: "How does Vermont review hospital construction plans?",
        answer: "Vermont hospital projects are regulated by the Green Mountain Care Board, which reviews hospital budgets and major capital projects — a uniquely hands-on regulatory model. We build the submittal for that reviewer's checklist and resolve comments fast.",
      },
      {
        question: "What ventilation rates does ASHRAE 170 require?",
        answer: "ASHRAE Standard 170 sets ventilation by space type: operating rooms need 20 total air changes per hour at positive pressure, trauma rooms 15 ACH, airborne-infection isolation rooms 12 ACH at negative pressure, protective-environment rooms 12 ACH at positive pressure, and patient rooms 6 ACH with 2 ACH of outdoor air. Temperature and humidity ranges are specified per space, and the standard is enforced through state health-department plan review.",
      },
      {
        question: "How are medical gas systems designed under NFPA 99?",
        answer: "NFPA 99 categorizes health care facilities by risk (Category 1 through 4) and governs medical gas and vacuum systems accordingly: zoned piping with area zone valves outside each critical-care zone, source equipment with automatic changeover, master and area alarms at attended locations, labeled outlets, and third-party certification testing before the system goes live. The medical gas design is a dedicated plan-review item in most states.",
      },
    ],
    founderNote: founderNote,
    extraLinks: [
      { text: "Hospital MEP Engineering in Burlington, VT", href: "/healthcare-design/vermont/burlington/" },
      { text: "Hospital MEP Engineering in Berlin, VT", href: "/healthcare-design/vermont/berlin/" },
      { text: "Hospital MEP Engineering in Rutland, VT", href: "/healthcare-design/vermont/rutland/" },
      { text: "Hospital MEP Engineering in Bennington, VT", href: "/healthcare-design/vermont/bennington/" },
      { text: "Hospital MEP Engineering in Brattleboro, VT", href: "/healthcare-design/vermont/brattleboro/" },
      { text: "What Are ASHRAE 170 Ventilation Requirements?", href: "/answers/healthcare-ashrae-170-ventilation-requirements/" },
      { text: "How Much Does Hospital MEP Design Cost?", href: "/answers/healthcare-hospital-mep-design-cost/" },
      { text: "MEP Engineering Services", href: "/mep-engineering/" },
      { text: "Mechanical Engineering", href: "/mechanical-engineering/" },
      { text: "Electrical Engineering", href: "/electrical-engineering/" },
      { text: "Healthcare Industry Practice", href: "/industries/healthcare/" },
      { text: "Get a Healthcare Engineering Estimate", href: "/estimate" },
    ],
  },
  {
    slug: "healthcare-design/virginia",
    title: "Hospital MEP Design in Virginia: Engineering & Plan Review",
    description: "Virginia hospital MEP engineering: ASHRAE 170 HVAC, NFPA 99 medical gas, USP 800 pharmacy design. Virginia plan-review support and schedule-driven delivery.",
    h1: "Hospital MEP Design in Virginia: Engineering & Plan Review",
    directAnswer: "Apex Grid Engineering provides hospital MEP design in Virginia — HVAC to ASHRAE 170, NFPA 99 medical gas, USP 800 pharmacy, and emergency power — for Inova Fairfax Hospital in Falls Church, Inova Health System in Falls Church, Sentara Healthcare in Norfolk, with Virginia plan-review support.",
    answer: "Virginia splits three ways: northern Virginia's Inova Fairfax (928 beds, #1 in the state), Sentara's statewide footprint anchored in Norfolk, and the Richmond-Charlottesville academic corridor (VCU, UVA) — all under an active certificate-of-public-need program.\n\nVirginia hospital projects require certificate-of-public-need approval through the Department of Health — an active COPN program covering beds and major equipment. That review shapes the engineering from the first drawing: ventilation schedules proving every space's air changes and pressure relationships, medical gas risers with zone valves and alarms, and essential-electrical one-lines the reviewer can trace.\n\nVirginia's COPN program covers beds and big-ticket equipment — imaging, surgical, and bed-tower planning all run through Department of Health review. Apex designs for that reality — and for the schedule. Health systems expanding in Virginia get schedule-driven delivery: early reviewer engagement, submittals built for the checklist, and comment responses in days, not weeks.",
    sections: [
      {
        h2: "Pharmacy, lab, and specialty spaces in Virginia",
        body: "Beyond the bed tower, Virginia health systems are building the specialty spaces that carry modern care: USP 800 hazardous-drug compounding suites with negative-pressure C-SECs at 30 air changes per hour and externally vented C-PEC hoods; USP 797 sterile compounding with ISO-classified buffer and ante areas; BSL-2 and BSL-3 laboratories with directional airflow, single-pass exhaust, and sealed penetrations; and vivarium facilities with 10 to 15 air changes per hour and tight temperature and humidity control. Each carries its own code regime — state pharmacy board, CDC biosafety, AAALAC — and each gets dedicated HVAC, monitoring, and alarming independent of the building's comfort systems.",
      },
      {
        h2: "Renovating occupied Virginia hospitals",
        body: "Most Virginia hospital work is renovation inside fully operational buildings — a new OR at Inova Fairfax Hospital, an ED expansion, a pharmacy brought up to USP 800. Our construction documents carry ICRA 2.0 infection-control risk assessments matched to the work: Class I through V precautions, dust-tight barriers with negative-pressure containment, HEPA-filtered exhaust, sealed penetrations, and traffic patterns that keep construction crews out of patient corridors. Shutdowns are sequenced — med gas, normal power, HVAC — with temporary systems bridging every outage and life-safety maintained throughout. The facility's infection preventionist approves the ICRA plan before work starts because it is on the drawings, not in a memo afterward.",
      },
      {
        h2: "Emergency power and medical gas across Virginia",
        body: "Every Virginia hospital depends on systems patients never see. The essential electrical system — life safety, critical, and equipment branches per NFPA 99 — rides on generators that start within 10 seconds, with selective coordination, load-shed sequencing, and monthly NFPA 110 testing baked into the design. Medical gas piping runs zoned and alarmed: oxygen, medical air, nitrous oxide, vacuum, and waste anesthetic gas with area zone valves outside each critical-care zone and master alarms where staff always watch. Virginia's COPN program covers beds and big-ticket equipment — imaging, surgical, and bed-tower planning all run through Department of Health review.",
      },
      {
        h2: "Clinical-space HVAC for Virginia hospitals",
        body: "Hospital HVAC in Virginia is designed space by space to ASHRAE 170. Operating rooms hold positive pressure at 20 air changes per hour with temperature between 68 and 75 degrees and relative humidity between 20 and 60 percent, delivered through low-velocity diffuser arrays that sweep contaminants away from the sterile field. Airborne-infection isolation rooms reverse the relationship — negative pressure at 12 ACH with anterooms and continuous monitoring. At Inova Fairfax Hospital in Falls Church and Inova Health System in Falls Church, these pressure relationships are the first thing plan reviewers verify, and the building automation system proves them around the clock. Virginia's COPN program covers beds and big-ticket equipment — imaging, surgical, and bed-tower planning all run through Department of Health review.",
      },
    ],
    faqs: [
      {
        question: "Which health systems drive hospital construction in Virginia?",
        answer: "The major owners are Inova Fairfax Hospital (Falls Church); Inova Health System (Falls Church); Sentara Healthcare (Norfolk); VCU Health (Richmond). We design for health-system standards as well as one-off projects, so a system's MEP criteria carry across its campuses.",
      },
      {
        question: "How does Virginia review hospital construction plans?",
        answer: "Virginia hospital projects require certificate-of-public-need approval through the Department of Health — an active COPN program covering beds and major equipment. We build the submittal for that reviewer's checklist and resolve comments fast.",
      },
      {
        question: "What is USP 800 and which facilities need it?",
        answer: "USP General Chapter 800 governs the handling of hazardous drugs in healthcare settings. Facilities that compound or handle hazardous drugs — hospital pharmacies, oncology infusion pharmacies, veterinary compounding — need a containment suite: a negative-pressure secondary engineering control (C-SEC) at -0.01 to -0.03 inches water column, externally vented primary controls (C-PEC), 30 air changes per hour, and strict temperature and humidity control. State boards of pharmacy enforce it.",
      },
      {
        question: "How much does hospital MEP engineering cost?",
        answer: "Hospital MEP engineering fees typically run 6 to 10 percent of the MEP construction value. Since MEP systems represent 30 to 45 percent of total hospital construction — and new acute-care hospitals cost $600 to over $1,000 per square foot — engineering fees generally land in the range of $15 to $45 per square foot, with surgical suites, isolation, pharmacy, and lab spaces commanding the high end.",
      },
    ],
    founderNote: founderNote,
    extraLinks: [
      { text: "Hospital MEP Engineering in Falls Church, VA", href: "/healthcare-design/virginia/falls-church/" },
      { text: "Hospital MEP Engineering in Richmond, VA", href: "/healthcare-design/virginia/richmond/" },
      { text: "Hospital MEP Engineering in Norfolk, VA", href: "/healthcare-design/virginia/norfolk/" },
      { text: "Hospital MEP Engineering in Charlottesville, VA", href: "/healthcare-design/virginia/charlottesville/" },
      { text: "Hospital MEP Engineering in Roanoke, VA", href: "/healthcare-design/virginia/roanoke/" },
      { text: "Hospital MEP Engineering in Arlington, VA", href: "/healthcare-design/virginia/arlington/" },
      { text: "Hospital MEP Engineering in Alexandria, VA", href: "/healthcare-design/virginia/alexandria/" },
      { text: "What Are ASHRAE 170 Ventilation Requirements?", href: "/answers/healthcare-ashrae-170-ventilation-requirements/" },
      { text: "How Much Does Hospital MEP Design Cost?", href: "/answers/healthcare-hospital-mep-design-cost/" },
      { text: "MEP Engineering Services", href: "/mep-engineering/" },
      { text: "Mechanical Engineering", href: "/mechanical-engineering/" },
      { text: "Electrical Engineering", href: "/electrical-engineering/" },
      { text: "Healthcare Industry Practice", href: "/industries/healthcare/" },
      { text: "Get a Healthcare Engineering Estimate", href: "/estimate" },
    ],
  },
  {
    slug: "healthcare-design/washington",
    title: "Hospital MEP Design in Washington: Engineering & Plan Review",
    description: "Washington hospital MEP engineering: ASHRAE 170 HVAC, NFPA 99 medical gas, USP 800 pharmacy design. Washington plan-review support and schedule-driven delivery.",
    h1: "Hospital MEP Design in Washington: Engineering & Plan Review",
    directAnswer: "Apex Grid Engineering provides hospital MEP design in Washington — HVAC to ASHRAE 170, NFPA 99 medical gas, USP 800 pharmacy, and emergency power — for Virginia Mason Medical Center in Seattle, UW Medicine in Seattle, Providence Swedish in Seattle, with Washington plan-review support.",
    answer: "Washington pairs Seattle's deep bench — Virginia Mason (#1 in the state), UW Medicine's academic campuses, Providence Swedish — with MultiCare in Tacoma, Providence in Spokane, and PeaceHealth in Vancouver, all under a rigorous certificate-of-need program.\n\nWashington hospital projects require certificate-of-need approval through the Department of Health — a rigorous CON program covering hospitals, beds, and major services. That review shapes the engineering from the first drawing: ventilation schedules proving every space's air changes and pressure relationships, medical gas risers with zone valves and alarms, and essential-electrical one-lines the reviewer can trace.\n\nSeismic plus CON: Washington hospital work combines Cascadia-subduction resilience engineering with Department of Health certificate-of-need strategy. Apex designs for that reality — and for the schedule. Health systems expanding in Washington get schedule-driven delivery: early reviewer engagement, submittals built for the checklist, and comment responses in days, not weeks.",
    sections: [
      {
        h2: "Renovating occupied Washington hospitals",
        body: "Most Washington hospital work is renovation inside fully operational buildings — a new OR at Virginia Mason Medical Center, an ED expansion, a pharmacy brought up to USP 800. Our construction documents carry ICRA 2.0 infection-control risk assessments matched to the work: Class I through V precautions, dust-tight barriers with negative-pressure containment, HEPA-filtered exhaust, sealed penetrations, and traffic patterns that keep construction crews out of patient corridors. Shutdowns are sequenced — med gas, normal power, HVAC — with temporary systems bridging every outage and life-safety maintained throughout. The facility's infection preventionist approves the ICRA plan before work starts because it is on the drawings, not in a memo afterward.",
      },
      {
        h2: "Emergency power and medical gas across Washington",
        body: "Every Washington hospital depends on systems patients never see. The essential electrical system — life safety, critical, and equipment branches per NFPA 99 — rides on generators that start within 10 seconds, with selective coordination, load-shed sequencing, and monthly NFPA 110 testing baked into the design. Medical gas piping runs zoned and alarmed: oxygen, medical air, nitrous oxide, vacuum, and waste anesthetic gas with area zone valves outside each critical-care zone and master alarms where staff always watch. Seismic plus CON: Washington hospital work combines Cascadia-subduction resilience engineering with Department of Health certificate-of-need strategy.",
      },
      {
        h2: "Clinical-space HVAC for Washington hospitals",
        body: "Hospital HVAC in Washington is designed space by space to ASHRAE 170. Operating rooms hold positive pressure at 20 air changes per hour with temperature between 68 and 75 degrees and relative humidity between 20 and 60 percent, delivered through low-velocity diffuser arrays that sweep contaminants away from the sterile field. Airborne-infection isolation rooms reverse the relationship — negative pressure at 12 ACH with anterooms and continuous monitoring. At Virginia Mason Medical Center in Seattle and UW Medicine in Seattle, these pressure relationships are the first thing plan reviewers verify, and the building automation system proves them around the clock. Seismic plus CON: Washington hospital work combines Cascadia-subduction resilience engineering with Department of Health certificate-of-need strategy.",
      },
      {
        h2: "Washington health-facility plan review, handled",
        body: "Washington hospital projects require certificate-of-need approval through the Department of Health — a rigorous CON program covering hospitals, beds, and major services. Our submittals are built for the reviewer's checklist: FGI Guidelines compliance narratives, ASHRAE 170 ventilation schedules with every space's air changes, outdoor air, pressure relationship, temperature, humidity, and filtration listed, NFPA 99 medical gas riser diagrams with zone valves and alarms, and essential-electrical one-lines showing the life safety, critical, and equipment branches. We engage the reviewer early, answer comments in days, and keep the project moving — because a health system's opening date is a clinical commitment, not a suggestion.",
      },
    ],
    faqs: [
      {
        question: "Which health systems drive hospital construction in Washington?",
        answer: "The major owners are Virginia Mason Medical Center (Seattle); UW Medicine (Seattle); Providence Swedish (Seattle); MultiCare Health System (Tacoma). We design for health-system standards as well as one-off projects, so a system's MEP criteria carry across its campuses.",
      },
      {
        question: "How does Washington review hospital construction plans?",
        answer: "Washington hospital projects require certificate-of-need approval through the Department of Health — a rigorous CON program covering hospitals, beds, and major services. We build the submittal for that reviewer's checklist and resolve comments fast.",
      },
      {
        question: "What does ICRA require during hospital renovation?",
        answer: "The ICRA 2.0 process classifies construction activity (Type A through D) and patient risk groups, then assigns precautions Class I through V: dust-tight barriers, negative-pressure containment with HEPA-filtered exhaust, sealed penetrations, debris handling in covered containers, and traffic patterns separated from patient care. The ICRA matrix and barrier plan belong in the construction documents for plan review and the facility's infection preventionist.",
      },
      {
        question: "How long does healthcare plan review take?",
        answer: "It depends on the state. Standard health-department facility review runs 4 to 12 weeks in most states; California HCAI review runs longer with its seismic program; certificate-of-need states add months before design review even begins. We compress the timeline with early AHJ engagement, submittals built for the reviewer's checklist, and comment responses turned in days.",
      },
    ],
    founderNote: founderNote,
    extraLinks: [
      { text: "Hospital MEP Engineering in Seattle, WA", href: "/healthcare-design/washington/seattle/" },
      { text: "Hospital MEP Engineering in Spokane, WA", href: "/healthcare-design/washington/spokane/" },
      { text: "Hospital MEP Engineering in Tacoma, WA", href: "/healthcare-design/washington/tacoma/" },
      { text: "Hospital MEP Engineering in Bellevue, WA", href: "/healthcare-design/washington/bellevue/" },
      { text: "Hospital MEP Engineering in Everett, WA", href: "/healthcare-design/washington/everett/" },
      { text: "Hospital MEP Engineering in Vancouver, WA", href: "/healthcare-design/washington/vancouver/" },
      { text: "Hospital MEP Engineering in Olympia, WA", href: "/healthcare-design/washington/olympia/" },
      { text: "What Are ASHRAE 170 Ventilation Requirements?", href: "/answers/healthcare-ashrae-170-ventilation-requirements/" },
      { text: "How Much Does Hospital MEP Design Cost?", href: "/answers/healthcare-hospital-mep-design-cost/" },
      { text: "MEP Engineering Services", href: "/mep-engineering/" },
      { text: "Mechanical Engineering", href: "/mechanical-engineering/" },
      { text: "Electrical Engineering", href: "/electrical-engineering/" },
      { text: "Healthcare Industry Practice", href: "/industries/healthcare/" },
      { text: "Get a Healthcare Engineering Estimate", href: "/estimate" },
    ],
  },
  {
    slug: "healthcare-design/west-virginia",
    title: "Hospital MEP Design in West Virginia: Engineering & Plan Review",
    description: "West Virginia hospital MEP engineering: ASHRAE 170 HVAC, NFPA 99 medical gas, USP 800 pharmacy design. West Virginia plan-review support, delivered fast.",
    h1: "Hospital MEP Design in West Virginia: Engineering & Plan Review",
    directAnswer: "Apex Grid Engineering provides hospital MEP design in West Virginia — HVAC to ASHRAE 170, NFPA 99 medical gas, USP 800 pharmacy, and emergency power — for WVU Medicine in Morgantown, Charleston Area Medical Center in Charleston, Vandalia Health in Charleston, with West Virginia plan-review support.",
    answer: "West Virginia is WVU Medicine's state: 25 hospitals, 3,400+ beds, the 880-bed J.W. Ruby Memorial flagship (#1 in the state) — with Vandalia Health (CAMC/Mon Health) and the Huntington systems completing a market built on rural referral networks.\n\nWest Virginia hospital projects require certificate-of-need approval through the Health Care Authority, with Department of Health facility review. That review shapes the engineering from the first drawing: ventilation schedules proving every space's air changes and pressure relationships, medical gas risers with zone valves and alarms, and essential-electrical one-lines the reviewer can trace.\n\nRural-referral engineering at scale: WVU Medicine's 25-hospital network needs tertiary design in Morgantown and resilient community-hospital design across some of America's toughest terrain. Apex designs for that reality — and for the schedule. Health systems expanding in West Virginia get schedule-driven delivery: early reviewer engagement, submittals built for the checklist, and comment responses in days, not weeks.",
    sections: [
      {
        h2: "Emergency power and medical gas across West Virginia",
        body: "Every West Virginia hospital depends on systems patients never see. The essential electrical system — life safety, critical, and equipment branches per NFPA 99 — rides on generators that start within 10 seconds, with selective coordination, load-shed sequencing, and monthly NFPA 110 testing baked into the design. Medical gas piping runs zoned and alarmed: oxygen, medical air, nitrous oxide, vacuum, and waste anesthetic gas with area zone valves outside each critical-care zone and master alarms where staff always watch. Rural-referral engineering at scale: WVU Medicine's 25-hospital network needs tertiary design in Morgantown and resilient community-hospital design across some of America's toughest terrain.",
      },
      {
        h2: "Clinical-space HVAC for West Virginia hospitals",
        body: "Hospital HVAC in West Virginia is designed space by space to ASHRAE 170. Operating rooms hold positive pressure at 20 air changes per hour with temperature between 68 and 75 degrees and relative humidity between 20 and 60 percent, delivered through low-velocity diffuser arrays that sweep contaminants away from the sterile field. Airborne-infection isolation rooms reverse the relationship — negative pressure at 12 ACH with anterooms and continuous monitoring. At WVU Medicine in Morgantown and Charleston Area Medical Center in Charleston, these pressure relationships are the first thing plan reviewers verify, and the building automation system proves them around the clock. Rural-referral engineering at scale: WVU Medicine's 25-hospital network needs tertiary design in Morgantown and resilient community-hospital design across some of America's toughest terrain.",
      },
      {
        h2: "West Virginia health-facility plan review, handled",
        body: "West Virginia hospital projects require certificate-of-need approval through the Health Care Authority, with Department of Health facility review. Our submittals are built for the reviewer's checklist: FGI Guidelines compliance narratives, ASHRAE 170 ventilation schedules with every space's air changes, outdoor air, pressure relationship, temperature, humidity, and filtration listed, NFPA 99 medical gas riser diagrams with zone valves and alarms, and essential-electrical one-lines showing the life safety, critical, and equipment branches. We engage the reviewer early, answer comments in days, and keep the project moving — because a health system's opening date is a clinical commitment, not a suggestion.",
      },
      {
        h2: "Surgical suites and sterile processing in West Virginia",
        body: "Surgical capacity is the economic engine of West Virginia hospitals — from WVU Medicine's operating rooms to ambulatory surgery centers across the state — and its MEP design is unforgiving. Each OR needs 20 total air changes per hour, positive pressure to the corridor, HEPA-filtered supply, and N+1 redundancy on the air-handling so a fan failure never cancels a case. Sterile processing departments need their own pressure cascade: decontamination negative, clean workroom positive, sterilizer rooms exhausted. Medical gas zone valves sit outside every OR suite with area alarms at the nurses' station. We design surgical MEP for the survey as well as the surgery: Joint Commission and CMS surveyors trace pressure relationships, humidity logs, and medical gas alarms on every visit.",
      },
    ],
    faqs: [
      {
        question: "Which health systems drive hospital construction in West Virginia?",
        answer: "The major owners are WVU Medicine (Morgantown); Charleston Area Medical Center (Charleston); Vandalia Health (Charleston); Cabell Huntington Hospital (Huntington). We design for health-system standards as well as one-off projects, so a system's MEP criteria carry across its campuses.",
      },
      {
        question: "How does West Virginia review hospital construction plans?",
        answer: "West Virginia hospital projects require certificate-of-need approval through the Health Care Authority, with Department of Health facility review. We build the submittal for that reviewer's checklist and resolve comments fast.",
      },
      {
        question: "What emergency power do hospitals require?",
        answer: "Hospitals require an essential electrical system per NFPA 99: life safety, critical, and equipment branches served by on-site generators that start and assume load within 10 seconds of a normal-power failure. NFPA 110 governs the generator installation, fuel supply, and monthly testing. Critical branch loads — ORs, ICUs, emergency departments — transfer automatically; the design must prove selective coordination and load-shed sequencing.",
      },
      {
        question: "What pressure relationships do hospital rooms need?",
        answer: "Operating rooms and protective-environment rooms run positive to adjacent spaces to keep contaminants out; airborne-infection isolation rooms, USP 800 compounding rooms, and soiled utility rooms run negative to contain contaminants. Anterooms buffer the transition. Each relationship is continuously monitored and alarmed through the building automation system, and the pressure map is part of the plan-review submittal.",
      },
    ],
    founderNote: founderNote,
    extraLinks: [
      { text: "Hospital MEP Engineering in Morgantown, WV", href: "/healthcare-design/west-virginia/morgantown/" },
      { text: "Hospital MEP Engineering in Charleston, WV", href: "/healthcare-design/west-virginia/charleston/" },
      { text: "Hospital MEP Engineering in Huntington, WV", href: "/healthcare-design/west-virginia/huntington/" },
      { text: "Hospital MEP Engineering in Parkersburg, WV", href: "/healthcare-design/west-virginia/parkersburg/" },
      { text: "Hospital MEP Engineering in Wheeling, WV", href: "/healthcare-design/west-virginia/wheeling/" },
      { text: "Hospital MEP Engineering in Bridgeport, WV", href: "/healthcare-design/west-virginia/bridgeport/" },
      { text: "What Are ASHRAE 170 Ventilation Requirements?", href: "/answers/healthcare-ashrae-170-ventilation-requirements/" },
      { text: "How Much Does Hospital MEP Design Cost?", href: "/answers/healthcare-hospital-mep-design-cost/" },
      { text: "MEP Engineering Services", href: "/mep-engineering/" },
      { text: "Mechanical Engineering", href: "/mechanical-engineering/" },
      { text: "Electrical Engineering", href: "/electrical-engineering/" },
      { text: "Healthcare Industry Practice", href: "/industries/healthcare/" },
      { text: "Get a Healthcare Engineering Estimate", href: "/estimate" },
    ],
  },
  {
    slug: "healthcare-design/wisconsin",
    title: "Hospital MEP Design in Wisconsin: Engineering & Plan Review",
    description: "Wisconsin hospital MEP engineering: ASHRAE 170 HVAC, NFPA 99 medical gas, USP 800 pharmacy design. Wisconsin plan-review support and schedule-driven delivery.",
    h1: "Hospital MEP Design in Wisconsin: Engineering & Plan Review",
    directAnswer: "Apex Grid Engineering provides hospital MEP design in Wisconsin — HVAC to ASHRAE 170, NFPA 99 medical gas, USP 800 pharmacy, and emergency power — for Aurora Health Care in Milwaukee, UW Health University Hospital in Madison, Froedtert Hospital in Milwaukee, with Wisconsin plan-review support.",
    answer: "Wisconsin pairs Aurora Health Care — the state's largest system (18 hospitals), now part of Advocate Health — with Madison's UW Health University Hospital (#1 in the state) and Milwaukee's Froedtert (702 beds, Level I trauma). Aurora St. Luke's (938 beds) is the state's largest hospital.\n\nWisconsin hospital construction is reviewed by the Department of Health Services' facility program; Wisconsin has no certificate-of-need program. That review shapes the engineering from the first drawing: ventilation schedules proving every space's air changes and pressure relationships, medical gas risers with zone valves and alarms, and essential-electrical one-lines the reviewer can trace.\n\nNo-CON competition: Wisconsin systems expand on market strategy, driving continuous MOB, surgery-center, and bed-tower work across the Milwaukee-Madison corridor. Apex designs for that reality — and for the schedule. Health systems expanding in Wisconsin get schedule-driven delivery: early reviewer engagement, submittals built for the checklist, and comment responses in days, not weeks.",
    sections: [
      {
        h2: "Clinical-space HVAC for Wisconsin hospitals",
        body: "Hospital HVAC in Wisconsin is designed space by space to ASHRAE 170. Operating rooms hold positive pressure at 20 air changes per hour with temperature between 68 and 75 degrees and relative humidity between 20 and 60 percent, delivered through low-velocity diffuser arrays that sweep contaminants away from the sterile field. Airborne-infection isolation rooms reverse the relationship — negative pressure at 12 ACH with anterooms and continuous monitoring. At Aurora Health Care in Milwaukee and UW Health University Hospital in Madison, these pressure relationships are the first thing plan reviewers verify, and the building automation system proves them around the clock. No-CON competition: Wisconsin systems expand on market strategy, driving continuous MOB, surgery-center, and bed-tower work across the Milwaukee-Madison corridor.",
      },
      {
        h2: "Wisconsin health-facility plan review, handled",
        body: "Wisconsin hospital construction is reviewed by the Department of Health Services' facility program; Wisconsin has no certificate-of-need program. Our submittals are built for the reviewer's checklist: FGI Guidelines compliance narratives, ASHRAE 170 ventilation schedules with every space's air changes, outdoor air, pressure relationship, temperature, humidity, and filtration listed, NFPA 99 medical gas riser diagrams with zone valves and alarms, and essential-electrical one-lines showing the life safety, critical, and equipment branches. We engage the reviewer early, answer comments in days, and keep the project moving — because a health system's opening date is a clinical commitment, not a suggestion.",
      },
      {
        h2: "Surgical suites and sterile processing in Wisconsin",
        body: "Surgical capacity is the economic engine of Wisconsin hospitals — from Aurora Health Care's operating rooms to ambulatory surgery centers across the state — and its MEP design is unforgiving. Each OR needs 20 total air changes per hour, positive pressure to the corridor, HEPA-filtered supply, and N+1 redundancy on the air-handling so a fan failure never cancels a case. Sterile processing departments need their own pressure cascade: decontamination negative, clean workroom positive, sterilizer rooms exhausted. Medical gas zone valves sit outside every OR suite with area alarms at the nurses' station. We design surgical MEP for the survey as well as the surgery: Joint Commission and CMS surveyors trace pressure relationships, humidity logs, and medical gas alarms on every visit.",
      },
      {
        h2: "Pharmacy, lab, and specialty spaces in Wisconsin",
        body: "Beyond the bed tower, Wisconsin health systems are building the specialty spaces that carry modern care: USP 800 hazardous-drug compounding suites with negative-pressure C-SECs at 30 air changes per hour and externally vented C-PEC hoods; USP 797 sterile compounding with ISO-classified buffer and ante areas; BSL-2 and BSL-3 laboratories with directional airflow, single-pass exhaust, and sealed penetrations; and vivarium facilities with 10 to 15 air changes per hour and tight temperature and humidity control. Each carries its own code regime — state pharmacy board, CDC biosafety, AAALAC — and each gets dedicated HVAC, monitoring, and alarming independent of the building's comfort systems.",
      },
    ],
    faqs: [
      {
        question: "Which health systems drive hospital construction in Wisconsin?",
        answer: "The major owners are Aurora Health Care (Milwaukee); UW Health University Hospital (Madison); Froedtert Hospital (Milwaukee); Aurora St. Luke's Medical Center (Milwaukee). We design for health-system standards as well as one-off projects, so a system's MEP criteria carry across its campuses.",
      },
      {
        question: "How does Wisconsin review hospital construction plans?",
        answer: "Wisconsin hospital construction is reviewed by the Department of Health Services' facility program; Wisconsin has no certificate-of-need program. We build the submittal for that reviewer's checklist and resolve comments fast.",
      },
      {
        question: "What ventilation rates does ASHRAE 170 require?",
        answer: "ASHRAE Standard 170 sets ventilation by space type: operating rooms need 20 total air changes per hour at positive pressure, trauma rooms 15 ACH, airborne-infection isolation rooms 12 ACH at negative pressure, protective-environment rooms 12 ACH at positive pressure, and patient rooms 6 ACH with 2 ACH of outdoor air. Temperature and humidity ranges are specified per space, and the standard is enforced through state health-department plan review.",
      },
      {
        question: "How are medical gas systems designed under NFPA 99?",
        answer: "NFPA 99 categorizes health care facilities by risk (Category 1 through 4) and governs medical gas and vacuum systems accordingly: zoned piping with area zone valves outside each critical-care zone, source equipment with automatic changeover, master and area alarms at attended locations, labeled outlets, and third-party certification testing before the system goes live. The medical gas design is a dedicated plan-review item in most states.",
      },
    ],
    founderNote: founderNote,
    extraLinks: [
      { text: "Hospital MEP Engineering in Milwaukee, WI", href: "/healthcare-design/wisconsin/milwaukee/" },
      { text: "Hospital MEP Engineering in Madison, WI", href: "/healthcare-design/wisconsin/madison/" },
      { text: "Hospital MEP Engineering in Green Bay, WI", href: "/healthcare-design/wisconsin/green-bay/" },
      { text: "Hospital MEP Engineering in Eau Claire, WI", href: "/healthcare-design/wisconsin/eau-claire/" },
      { text: "Hospital MEP Engineering in Wausau, WI", href: "/healthcare-design/wisconsin/wausau/" },
      { text: "Hospital MEP Engineering in La Crosse, WI", href: "/healthcare-design/wisconsin/la-crosse/" },
      { text: "Hospital MEP Engineering in Kenosha, WI", href: "/healthcare-design/wisconsin/kenosha/" },
      { text: "What Are ASHRAE 170 Ventilation Requirements?", href: "/answers/healthcare-ashrae-170-ventilation-requirements/" },
      { text: "How Much Does Hospital MEP Design Cost?", href: "/answers/healthcare-hospital-mep-design-cost/" },
      { text: "MEP Engineering Services", href: "/mep-engineering/" },
      { text: "Mechanical Engineering", href: "/mechanical-engineering/" },
      { text: "Electrical Engineering", href: "/electrical-engineering/" },
      { text: "Healthcare Industry Practice", href: "/industries/healthcare/" },
      { text: "Get a Healthcare Engineering Estimate", href: "/estimate" },
    ],
  },
  {
    slug: "healthcare-design/wyoming",
    title: "Hospital MEP Design in Wyoming: Engineering & Plan Review",
    description: "Wyoming hospital MEP engineering: ASHRAE 170 HVAC, NFPA 99 medical gas, USP 800 pharmacy design. Wyoming plan-review support and schedule-driven delivery.",
    h1: "Hospital MEP Design in Wyoming: Engineering & Plan Review",
    directAnswer: "Apex Grid Engineering provides hospital MEP design in Wyoming — HVAC to ASHRAE 170, NFPA 99 medical gas, USP 800 pharmacy, and emergency power — for Wyoming Medical Center in Casper, Cheyenne Regional Medical Center in Cheyenne, Sheridan Memorial Hospital in Sheridan, with Wyoming plan-review support.",
    answer: "Wyoming's frontier market centers on Casper's Wyoming Medical Center (249 beds, now Banner Health) and Cheyenne Regional (222 beds), with community anchors in Sheridan, Laramie, and Gillette serving vast rural catchments.\n\nWyoming hospital construction is reviewed by the Department of Health's facility program, with the state fire marshal reviewing life safety. That review shapes the engineering from the first drawing: ventilation schedules proving every space's air changes and pressure relationships, medical gas risers with zone valves and alarms, and essential-electrical one-lines the reviewer can trace.\n\nFrontier-state resilience: extreme winter design, long equipment lead times, and critical-access facilities engineered for Wyoming's distances and weather. Apex designs for that reality — and for the schedule. Health systems expanding in Wyoming get schedule-driven delivery: early reviewer engagement, submittals built for the checklist, and comment responses in days, not weeks.",
    sections: [
      {
        h2: "Wyoming health-facility plan review, handled",
        body: "Wyoming hospital construction is reviewed by the Department of Health's facility program, with the state fire marshal reviewing life safety. Our submittals are built for the reviewer's checklist: FGI Guidelines compliance narratives, ASHRAE 170 ventilation schedules with every space's air changes, outdoor air, pressure relationship, temperature, humidity, and filtration listed, NFPA 99 medical gas riser diagrams with zone valves and alarms, and essential-electrical one-lines showing the life safety, critical, and equipment branches. We engage the reviewer early, answer comments in days, and keep the project moving — because a health system's opening date is a clinical commitment, not a suggestion.",
      },
      {
        h2: "Surgical suites and sterile processing in Wyoming",
        body: "Surgical capacity is the economic engine of Wyoming hospitals — from Wyoming Medical Center's operating rooms to ambulatory surgery centers across the state — and its MEP design is unforgiving. Each OR needs 20 total air changes per hour, positive pressure to the corridor, HEPA-filtered supply, and N+1 redundancy on the air-handling so a fan failure never cancels a case. Sterile processing departments need their own pressure cascade: decontamination negative, clean workroom positive, sterilizer rooms exhausted. Medical gas zone valves sit outside every OR suite with area alarms at the nurses' station. We design surgical MEP for the survey as well as the surgery: Joint Commission and CMS surveyors trace pressure relationships, humidity logs, and medical gas alarms on every visit.",
      },
      {
        h2: "Pharmacy, lab, and specialty spaces in Wyoming",
        body: "Beyond the bed tower, Wyoming health systems are building the specialty spaces that carry modern care: USP 800 hazardous-drug compounding suites with negative-pressure C-SECs at 30 air changes per hour and externally vented C-PEC hoods; USP 797 sterile compounding with ISO-classified buffer and ante areas; BSL-2 and BSL-3 laboratories with directional airflow, single-pass exhaust, and sealed penetrations; and vivarium facilities with 10 to 15 air changes per hour and tight temperature and humidity control. Each carries its own code regime — state pharmacy board, CDC biosafety, AAALAC — and each gets dedicated HVAC, monitoring, and alarming independent of the building's comfort systems.",
      },
      {
        h2: "Renovating occupied Wyoming hospitals",
        body: "Most Wyoming hospital work is renovation inside fully operational buildings — a new OR at Wyoming Medical Center, an ED expansion, a pharmacy brought up to USP 800. Our construction documents carry ICRA 2.0 infection-control risk assessments matched to the work: Class I through V precautions, dust-tight barriers with negative-pressure containment, HEPA-filtered exhaust, sealed penetrations, and traffic patterns that keep construction crews out of patient corridors. Shutdowns are sequenced — med gas, normal power, HVAC — with temporary systems bridging every outage and life-safety maintained throughout. The facility's infection preventionist approves the ICRA plan before work starts because it is on the drawings, not in a memo afterward.",
      },
    ],
    faqs: [
      {
        question: "Which health systems drive hospital construction in Wyoming?",
        answer: "The major owners are Wyoming Medical Center (Casper); Cheyenne Regional Medical Center (Cheyenne); Sheridan Memorial Hospital (Sheridan); Ivinson Memorial Hospital (Laramie). We design for health-system standards as well as one-off projects, so a system's MEP criteria carry across its campuses.",
      },
      {
        question: "How does Wyoming review hospital construction plans?",
        answer: "Wyoming hospital construction is reviewed by the Department of Health's facility program, with the state fire marshal reviewing life safety. We build the submittal for that reviewer's checklist and resolve comments fast.",
      },
      {
        question: "What is USP 800 and which facilities need it?",
        answer: "USP General Chapter 800 governs the handling of hazardous drugs in healthcare settings. Facilities that compound or handle hazardous drugs — hospital pharmacies, oncology infusion pharmacies, veterinary compounding — need a containment suite: a negative-pressure secondary engineering control (C-SEC) at -0.01 to -0.03 inches water column, externally vented primary controls (C-PEC), 30 air changes per hour, and strict temperature and humidity control. State boards of pharmacy enforce it.",
      },
      {
        question: "How much does hospital MEP engineering cost?",
        answer: "Hospital MEP engineering fees typically run 6 to 10 percent of the MEP construction value. Since MEP systems represent 30 to 45 percent of total hospital construction — and new acute-care hospitals cost $600 to over $1,000 per square foot — engineering fees generally land in the range of $15 to $45 per square foot, with surgical suites, isolation, pharmacy, and lab spaces commanding the high end.",
      },
    ],
    founderNote: founderNote,
    extraLinks: [
      { text: "Hospital MEP Engineering in Cheyenne, WY", href: "/healthcare-design/wyoming/cheyenne/" },
      { text: "Hospital MEP Engineering in Casper, WY", href: "/healthcare-design/wyoming/casper/" },
      { text: "Hospital MEP Engineering in Laramie, WY", href: "/healthcare-design/wyoming/laramie/" },
      { text: "Hospital MEP Engineering in Gillette, WY", href: "/healthcare-design/wyoming/gillette/" },
      { text: "Hospital MEP Engineering in Sheridan, WY", href: "/healthcare-design/wyoming/sheridan/" },
      { text: "Hospital MEP Engineering in Rock Springs, WY", href: "/healthcare-design/wyoming/rock-springs/" },
      { text: "What Are ASHRAE 170 Ventilation Requirements?", href: "/answers/healthcare-ashrae-170-ventilation-requirements/" },
      { text: "How Much Does Hospital MEP Design Cost?", href: "/answers/healthcare-hospital-mep-design-cost/" },
      { text: "MEP Engineering Services", href: "/mep-engineering/" },
      { text: "Mechanical Engineering", href: "/mechanical-engineering/" },
      { text: "Electrical Engineering", href: "/electrical-engineering/" },
      { text: "Healthcare Industry Practice", href: "/industries/healthcare/" },
      { text: "Get a Healthcare Engineering Estimate", href: "/estimate" },
    ],
  },
];
