import type { CityData } from "../types";

export const austin: CityData = {
  slug: "austin",
  name: "Austin",
  stateSlug: "texas",
  county: "Travis County",
  ahj: {
    office: "City of Austin Development Services Department",
    process:
      "Commercial applications run through the AB+C (Austin Build + Connect) online portal, with intake and support at the Permitting and Development Center on Highland Mall Boulevard. Austin layers site/civil review, environmental (watershed) review, and building review, so projects near creeks or over the Edwards Aquifer face additional review tracks that lengthen timelines; the city offers formal expedited-review options for qualifying projects.",
  },
  codes: {
    building: "2024 IBC, adopted as part of City Code Chapter 25-12 (Technical Codes) with Austin local amendments, effective July 10, 2025",
    energy: "2024 IECC with Austin local amendments (City Code Chapter 25-12, Article 12), effective July 10, 2025",
    amendments:
      "Austin's technical-code amendments are among the most stringent in Texas, with local energy provisions and a strong beyond-code culture through Austin Energy Green Building. Separate from the building code, the city's watershed-protection and Save Our Springs environmental regulations, plus Edwards Aquifer rules, materially shape site development in the Barton Springs and recharge zones.",
  },
  utilities: {
    electric: "Austin Energy, a municipally owned utility (not part of the ERCOT competitive-retail market inside its service territory), so service, rates, interconnection, and demand charges all run through Austin Energy",
    notes:
      "Because Austin Energy is a city utility, it also administers Green Building ratings, solar/EV programs, and the commercial energy code enforcement path; large services and transformer procurement should be coordinated with Austin Energy early. Water and wastewater are Austin Water.",
  },
  climateNotes:
    "ASHRAE/IECC climate zone 2A trending 3A, with hot summers, 100°F+ design days, and the Balcones Escarpment creating rapid runoff and flash-flood exposure across the western hill-country side of the city.",
  marketNotes:
    "Austin construction is driven by the semiconductor and tech sector (Samsung's Taylor-area fab and the broader supplier ecosystem), corporate relocations, university-adjacent development, and dense mixed-use and multifamily growth. Environmental and watershed review over the Edwards Aquifer and Barton Springs zone is a defining constraint that sets Austin apart from other Texas metros.",
  narratives: {
    mep:
      "MEP design in Austin combines a hot climate-zone-2A/3A cooling load with the most stringent energy amendments in Texas - the 2024 IECC as adopted in City Code Chapter 25-12, backed by Austin Energy Green Building expectations on many projects. We size cooling plants tightly, favor high-efficiency equipment, and design to meet the city's local energy provisions rather than the bare state minimum. Because Austin Energy is a municipal utility outside the competitive-retail market, service, demand charges, interconnection, and solar/EV incentives all route through it, so we engage Austin Energy at schematic design for capacity, transformer lead times, and Green Building coordination on qualifying projects.",
    structural:
      "Austin structural design straddles two geologies: the eastern Blackland Prairie's expansive clays and the western hill country's shallow limestone over the Balcones Escarpment, so foundations are entirely geotechnical-report driven - drilled piers or spread footings to rock on the west side, moisture-managed slabs on the expansive east side. Seismic demand is low (Seismic Design Category A-B) and inland wind speeds are moderate, so gravity and shrink-swell issues govern most low-rise work. Under the 2024 IBC adopted through Chapter 25-12, special-inspection programs and structural submittals are set up on Austin's forms and coordinated through the AB+C portal alongside site and environmental review.",
    civil:
      "Civil and site engineering is where Austin is genuinely distinct: the Balcones Escarpment produces flashy runoff, and much of the city drains toward the Edwards Aquifer recharge and contributing zones and the Barton Springs watershed. The city's watershed-protection and Save Our Springs regulations impose impervious-cover limits, water-quality treatment, and buffer requirements that can consume large portions of a site, and TCEQ Edwards Aquifer rules add a separate approval track. We design detention, water-quality, and grading to the City of Austin Drainage Criteria Manual and environmental ordinances, and we resolve the site/civil and watershed review tracks through the AB+C portal in parallel with building review.",
    energy:
      "Austin enforces the 2024 IECC with local amendments through City Code Chapter 25-12, so COMcheck or ASHRAE 90.1 modeling must target that edition - and many projects pursue Austin Energy Green Building ratings that push well beyond code. Commercial owners are also subject to the ECAD (Energy Conservation Audit and Disclosure) benchmarking ordinance. In climate zone 2A/3A the highest-leverage moves are low-SHGC glazing, envelope air-sealing, and right-sized high-efficiency cooling; we coordinate envelope, mechanical, and lighting compliance as one package and, because Austin Energy administers both the utility and Green Building, we align the energy model with its expectations early.",
  },
  faqs: [
    {
      q: "What building and energy codes does Austin enforce?",
      a: "Austin adopted the 2024 IBC and 2024 IECC with local amendments through City Code Chapter 25-12, effective July 10, 2025. Austin's energy amendments are among the most stringent in Texas, and many projects also pursue Austin Energy Green Building ratings, so we match COMcheck or energy-model documentation to the 2024 edition and the city's local provisions.",
    },
    {
      q: "How do Edwards Aquifer and watershed rules affect Austin site design?",
      a: "Heavily. Projects over the Edwards Aquifer recharge/contributing zones and in the Barton Springs watershed face the city's watershed-protection and Save Our Springs regulations plus TCEQ Edwards Aquifer rules - impervious-cover limits, water-quality treatment, and buffers that can reshape a site. This environmental review runs as a separate track alongside building review in the AB+C portal.",
    },
    {
      q: "Who provides electric service for an Austin commercial project?",
      a: "Austin Energy, the city's municipally owned utility, provides service inside its territory - it is not part of the ERCOT competitive-retail market there, so rates, interconnection, and demand charges all run through Austin Energy. It also administers the Green Building program, so we coordinate capacity, transformer lead times, and Green Building goals with Austin Energy early.",
    },
  ],
  research: {
    lastVerified: "2026-09-11", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering"],
    priority: { commercialOpportunity: 92, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.austintexas.gov/department/development-services"],
      codes: ["https://www.austintexas.gov/page/building-technical-codes"],
      amendments: ["https://www.austintexas.gov/page/building-technical-codes"],
      utilities: ["https://austinenergy.com/"],
      climate: ["https://www.weather.gov/ewx/"],
      market: ["https://www.austintexas.gov/department/economic-development"],
    },
  },
};
