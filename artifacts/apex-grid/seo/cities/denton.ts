import type { CityData } from "../types";

export const denton: CityData = {
  slug: "denton",
  name: "Denton",
  stateSlug: "texas",
  county: "Denton County",
  ahj: {
    office: "City of Denton Building Safety Division, Development Services Department (Development Services Center, 401 N. Elm St.)",
    process:
      "Denton's Building Safety Division takes commercial applications online through the city's eTRAKiT portal and at the Development Services Center counter. A Zoning Compliance Plan reviewed by the Planning Department is required before Building Safety will accept a building permit application for new commercial construction and for larger alterations, so entitlement and building review run as two sequenced gates. Commercial submittals must include full electrical plans with load calculations and panel schedules, mechanical plans with ventilation calculations, and a 2021 IECC energy package — compliance reports for envelope, lighting, and mechanical systems plus the city's completed commercial compliance path form (COMcheck accepted).",
  },
  codes: {
    building: "2021 International Building Code with City of Denton local amendments (2022 code adoption package, Ordinances 22-658 through 22-666)",
    energy: "2021 International Energy Conservation Code with local amendments (Ordinance 22-661); commercial compliance documented with COMcheck reports and the city's 2021 IECC commercial compliance path form",
    amendments:
      "Denton's 2022 adoption package pairs the 2021 I-codes with the 2020 NEC and extensive local amendments published chapter-by-chapter for each code — including attic-access and permit-expiration amendments in the mechanical code and sprinkler triggers in the amended IRC — so the city's amendment documents, not the bare model code, govern design. Appeals of code decisions go to the city's Health and Building Standards Commission rather than a standard board of appeals.",
  },
  utilities: {
    electric: "Denton Municipal Electric (DME) — the city-owned municipal electric utility — serves the entire city; Denton is not in the ERCOT retail-choice market",
    notes:
      "DME is a municipally owned utility (operating since 1905) that owns its generation, transmission, and distribution, and supplies power on a 100% renewable net-annual basis anchored by the 225 MW gas-fired Denton Energy Center for backup — there is no retail electric provider to shop, so new services, meter releases, and capacity questions all run through the city. A city utility billing account must be established with Customer Service before meter release inspections. Water, wastewater, and solid waste are also City of Denton services, and Atmos Energy provides natural gas.",
  },
  climateNotes:
    "ASHRAE climate zone 3A (hot-humid) at the northwest edge of the DFW Metroplex: design cooling temperatures in the upper 90s, severe thunderstorm and hail exposure, tornado risk, and episodic hard freezes. Expansive clay soils are common across Denton County and drive foundation design.",
  marketNotes:
    "Denton is a two-university city — the University of North Texas and Texas Woman's University anchor enrollment-driven housing, medical, and retail demand — with a major industrial base that includes Peterbilt Motors' headquarters and truck plant, Sally Beauty Holdings' headquarters, and Denton Regional Medical Center. Growth corridors along I-35E/I-35W and the downtown Square redevelopment generate steady commercial, multifamily, and institutional work.",
  narratives: {
    mep:
      "MEP design in Denton runs through two city gates: a Planning-reviewed Zoning Compliance Plan before Building Safety accepts the permit set, and a commercial package that must carry full electrical load calculations, panel schedules, mechanical ventilation calculations, and a 2021 IECC energy submission with COMcheck reports. Because the electric utility is the city itself — Denton Municipal Electric — service sizing and meter release are coordinated with the same municipality that reviews the plans, and a utility billing account must exist before meter-release inspection.",
    structural:
      "Structural design in Denton is documented to the 2021 IBC with the city's published local amendments. Expansive Denton County clays make the geotechnical report the controlling document for foundations, and North Texas wind, hail, and tornado exposure shape envelope and rooftop-equipment design. Seismic demand is low, so gravity, uplift, and soil movement govern most commercial structures, from I-35 corridor industrial buildings to university-area mid-rise construction.",
    civil:
      "Civil design in Denton follows the city's Development Code and its 2026 Design Criteria Manual covering stormwater, transportation, and water/wastewater standards. Sites drain toward the Elm Fork Trinity River and Lewisville Lake watersheds, and detention and water-quality requirements are checked against the city's stormwater criteria manual. Because Denton provides its own water, wastewater, and electric service, utility coordination stays inside city departments from site plan through meter release.",
    energy:
      "Energy compliance in Denton is documented to the 2021 IECC with local amendments: the commercial submittal requires compliance reports for the envelope, interior and exterior lighting, and mechanical systems, plus the city's completed 2021 IECC commercial compliance path form, with COMcheck accepted as the reporting vehicle. DME's 100% renewable net-annual supply changes the owner's operating picture but not the code documentation — in zone 3A the compliance margin is still won on cooling efficiency, envelope, and lighting controls.",
  },
  faqs: [
    {
      q: "Who provides electric service in Denton, TX?",
      a: "Denton Municipal Electric (DME), the city-owned utility, serves the whole city — Denton opted out of the ERCOT retail-choice market, so there is no competitive provider. New commercial services, capacity checks, and meter releases are coordinated with DME and City Customer Service, and a utility billing account must be set up before meter release.",
    },
    {
      q: "What building and energy codes does Denton enforce?",
      a: "Denton's 2022 adoption package enforces the 2021 I-codes with local amendments — 2021 IBC, 2021 IECC, 2021 IPC/IMC/IFGC — with the 2020 NEC for electrical work. Commercial submittals must include 2021 IECC compliance reports (COMcheck accepted) and the city's commercial compliance path form.",
    },
    {
      q: "What must happen before Denton accepts a commercial building permit application?",
      a: "For new commercial buildings and larger alterations, the Planning Department must first review a Zoning Compliance Plan under Development Code section 2.5.1. Only after that zoning gate clears will Building Safety accept the building permit application, which is filed through the eTRAKiT portal or at the Development Services Center.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 52, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.cityofdenton.com/DocumentCenter/View/3682/New-Commercial-Construction-Submittal-Requirements-PDF"],
      codes: ["https://www.cityofdenton.com/DocumentCenter/View/403/Recommended-Amendments-to-the-2021-International-Mechanical-Code-PDF"],
      amendments: ["https://www.cityofdenton.com/DocumentCenter/View/403/Recommended-Amendments-to-the-2021-International-Mechanical-Code-PDF"],
      utilities: ["https://www.cityofdenton.com/DocumentCenter/View/730/Denton-Energy-Center-Frequently-Asked-Questions-PDF"],
      climate: ["https://www.weather.gov/fwd/"],
      market: ["https://www.cityofdenton.com/255/Development-Code-Design-Documents-Criter"],
    },
  },
};
