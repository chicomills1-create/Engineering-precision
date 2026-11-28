import type { CityData } from "../types";

export const mesquite: CityData = {
  slug: "mesquite",
  name: "Mesquite",
  stateSlug: "texas",
  county: "Dallas County",
  ahj: {
    office: "City of Mesquite Building Inspection Division, Planning and Development Services Department (1515 N. Galloway Ave.)",
    process:
      "Mesquite's Building Inspection Division runs nearly the entire permit lifecycle through the city's Citizen Self Service (CSS) portal: contractors first obtain a city Professional License through the portal, then apply for permits, request inspections, and track status online. Permits are required for new construction, repairs, remodels, windows and exterior doors, demolitions, and all electrical, plumbing, and HVAC work. Questions on adopted codes, inspection procedures, and submittals route to the division's permit staff, and the Building Standards Board hears code adoption and amendment matters before they reach City Council.",
  },
  codes: {
    building: "2024 International Building Code with City of Mesquite local amendments (Ordinance 5215, adopted November 17, 2025)",
    energy: "2024 International Energy Conservation Code with local amendments (Ordinance 5243, adopted May 18, 2026, replacing Chapter 5, Article XII)",
    amendments:
      "Mesquite executed a full code-cycle update across 2025–2026: the 2024 IBC (Ord. 5215) and 2024 IFC (Ord. 5216) in November 2025, followed by the 2024 IEBC, IFGC, and IECC in May 2026 — all with local amendments in Chapter 5 of the City Code, many carried on North Central Texas Council of Governments (NCTCOG) regional recommendations. Electrical work follows the 2023 NEC (Ord. 5149), and an older local IECC amendment preserves an insulation exception for certain buildings over 100,000 square feet — worth checking on large industrial projects.",
  },
  utilities: {
    electric: "Oncor Electric Delivery provides transmission and distribution service in Mesquite; customers choose a retail electric provider in the ERCOT market. Atmos Energy provides natural gas",
    notes:
      "New commercial electric services, meter work, and service upgrades are coordinated with Oncor's service design process, which runs separately from the city's CSS permit track — service lead time is a schedule risk to manage on Mesquite's fast-moving logistics projects. Water and wastewater are City of Mesquite utilities, so taps and capacity checks stay inside city hall. Because Mesquite requires a city Professional License through the CSS portal before permit application, out-of-town contractors should register before the first submittal, not after.",
  },
  climateNotes:
    "ASHRAE climate zone 3A (hot-humid) on the east side of Dallas: long cooling seasons with design temperatures in the upper 90s, hail and severe thunderstorm exposure, and episodic winter freezes. Expansive Blackland Prairie clays underlie much of the city and drive foundation design, as across the eastern Metroplex.",
  marketNotes:
    "Mesquite is a logistics and manufacturing suburb at the junction of I-20, I-635, and US-80: big-box distribution and industrial parks line the I-20 corridor, Town East Mall anchors the retail core, and Dallas Regional Medical Center is a major healthcare employer. The Solterra master-planned community on the city's south side is driving a new wave of residential-supporting commercial work, while the city's rodeo heritage (the Mesquite Championship Rodeo) sustains hospitality demand along the highway corridors.",
  narratives: {
    mep:
      "MEP design in Mesquite is documented to the city's new 2024 I-code package with the 2023 NEC, filed through the Citizen Self Service portal after the contractor secures a city Professional License. Energy documentation follows the 2024 IECC as locally amended — including a carried-over local exception affecting insulation standards on buildings over 100,000 square feet that large industrial teams should verify early. Oncor service design runs on a separate track from city review, so electrical service coordination starts in parallel with the permit application.",
    structural:
      "Structural design in Mesquite follows the 2024 IBC with Chapter 5 local amendments. Expansive Blackland Prairie clay is the controlling site condition — foundations follow the geotechnical report, typically drilled piers or post-tension systems — while 2024 IBC wind and hail provisions shape the large low-slope envelopes of the I-20 logistics stock. Seismic demand is minimal, so gravity, uplift, and soil movement govern most designs.",
    civil:
      "Civil design in Mesquite works within a mostly built-out suburban framework draining toward South Mesquite Creek and the East Fork Trinity River: detention, paving, and utility standards follow the city's engineering criteria, and water and wastewater connections are City of Mesquite services coordinated through Planning and Development Services. The Solterra growth area on the south side is the exception — greenfield-scale subdivision and commercial infrastructure with PID-backed public improvements.",
    energy:
      "Energy compliance in Mesquite is documented to the 2024 IECC with local amendments (Ordinance 5243, May 2026) — one of the newest energy code adoptions in the Metroplex, so design teams should not reuse a neighboring city's 2021 IECC package here. COMcheck documentation supports the commercial submittal, and in zone 3A the compliance margin is won on cooling efficiency, envelope performance, and lighting controls; large industrial buildings should confirm whether the local over-100,000-square-foot insulation exception applies before finalizing the envelope design.",
  },
  faqs: [
    {
      q: "Who provides electric service in Mesquite, TX?",
      a: "Oncor Electric Delivery owns the wires in Mesquite and customers choose a retail provider in the ERCOT market; Atmos Energy provides natural gas. New services and meter work are coordinated with Oncor separately from the city permit. Water and wastewater are City of Mesquite utilities.",
    },
    {
      q: "What building and energy codes does Mesquite enforce?",
      a: "Mesquite completed a full code update in 2025–2026: the 2024 IBC (Ordinance 5215), 2024 IFC, and in May 2026 the 2024 IEBC, IFGC, and IECC (Ordinance 5243), all with local amendments in Chapter 5 of the City Code. Electrical work follows the 2023 NEC.",
    },
    {
      q: "How do contractors start work in Mesquite?",
      a: "Through the city's Citizen Self Service (CSS) portal: register and obtain a city Professional License first, then apply for the permit, request inspections, and track status online. The Building Inspection Division of Planning and Development Services (1515 N. Galloway Ave.) administers the process.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 48, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.nearbyelectricians.com/permits/texas/mesquite/"],
      codes: ["https://apps.cityofmesquite.com/city_secweb/ordinances/5215.pdf"],
      amendments: ["https://apps.cityofmesquite.com/city_secweb/olist.php?Search=&Sord=&Ssub=&Sdes=&st=OrdDate&so=1&start=20&dsearch=&keyword="],
      utilities: ["https://www.nearbyelectricians.com/permits/texas/mesquite/"],
      climate: ["https://www.weather.gov/fwd/"],
      market: ["https://apps.cityofmesquite.com/city_secweb/olist.php?Search=&Sord=&Ssub=&Sdes=&st=OrdDate&so=1&start=60&Search&Sord&Ssub&Sdes"],
    },
  },
};
