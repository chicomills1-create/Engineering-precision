import type { CityData } from "../types";

export const modesto: CityData = {
  slug: "modesto",
  name: "Modesto",
  stateSlug: "california",
  county: "Stanislaus County",
  ahj: {
    office: "City of Modesto Building Safety Division (Community & Economic Development Department)",
    process:
      "Modesto's Building Safety Division plan-checks and permits construction inside the city under the California Building Code with city amendments; Stanislaus County handles the surrounding unincorporated areas. Title 24 documentation — energy (Part 6), CALGreen, and accessibility — is reviewed with the construction documents, and the city's downtown and corridor projects often coordinate with fire and public works reviews run through the same development services counter.",
  },
  codes: {
    building: "2025 California Building Code (Title 24, Part 2; based on the 2024 IBC), effective January 1, 2026, with City of Modesto amendments",
    energy: "2025 California Energy Code (Title 24, Part 6), effective January 1, 2026",
    amendments:
      "Modesto's amendments sit inside California's statewide Title 24 framework. The local design drivers are Central Valley conditions rather than coastal ones: moderate seismic design categories, expansive and corrosive valley soils in places, and tule fog and air-quality district rules (San Joaquin Valley Air Pollution Control District) that affect construction equipment and some industrial processes. Fire sprinkler and fire code administration runs through Modesto Fire with its own local amendments.",
  },
  utilities: {
    electric: "Modesto Irrigation District (MID) provides electric service to Modesto (with TID serving parts of the greater area)",
    notes:
      "MID is a publicly owned irrigation district that is also the electric utility for Modesto — a Central Valley pattern (like TID in Turlock) where power comes from a local district with some of California's lower electric rates, which is a genuine siting factor for food-processing and cold-storage loads. MID handles new commercial services and interconnections locally rather than through a statewide IOU queue; irrigation water is MID's, drinking water is the City of Modesto, and gas is PG&E.",
  },
  climateNotes:
    "California climate zone 12 / IECC 3B (hot-dry Central Valley): very hot dry summers with design temperatures over 100°F, cool winters with dense tule fog, and poor winter air quality under valley inversions. Cooling and ventilation design dominate; seismic demand is moderate and snow is not a design case.",
  marketNotes:
    "Modesto is an agricultural processing capital: E. & J. Gallo Winery (the world's largest winery) is headquartered and produces here, alongside Frito-Lay, Del Monte, Conagra, and a deep food-and-beverage manufacturing base, plus Memorial Medical Center healthcare and Highway 99 logistics. Food processing, cold storage, and industrial work — with their heavy process electrical and refrigeration loads — define the commercial market.",
  narratives: {
    mep:
      "MEP design in Modesto is industrial Title 24 work: the 2025 CBC and Energy Code govern, and the loads are process loads — refrigeration, compressed air, and production lines for food and beverage plants — served by Modesto Irrigation District at public-power rates. Zone 12 heat drives large cooling and ventilation systems, valley air-district rules reach into industrial equipment selection, and PG&E gas coordination covers process and space heating.",
    structural:
      "Modesto structural design follows the 2025 CBC with moderate seismic design categories — lower than coastal California but never negligible — and the practical drivers are industrial: heavy floor and silo/tank loads, tilt-up warehouse and plant construction, and valley soils that vary from firm alluvium to expansive pockets. Snow is absent and wind is modest, so gravity and seismic detailing share the lead.",
    civil:
      "Civil design in Modesto works on flat valley floor draining toward the Tuolumne River, with city storm drainage and MID irrigation infrastructure interleaved across the urban edge — canal and lateral crossings and easements are a recurring site constraint. Industrial sites add truck courts, rail spurs on the BNSF and UP lines, and air-district dust and stormwater requirements to the standard city review.",
    energy:
      "Energy compliance in Modesto is documented to the 2025 California Energy Code (Title 24, Part 6) on state compliance forms. For the food-processing and cold-storage stock that dominates the market, the compliance conversation centers on refrigeration efficiency, process loads outside the code's regulated scope, and MID's public-power rates, which change the payback math versus IOU territory.",
  },
  faqs: [
    {
      q: "Who provides electric service in Modesto?",
      a: "Modesto Irrigation District (MID), a publicly owned district, provides electric service in Modesto at public-power rates — a key siting factor for food-processing and cold-storage facilities. Gas is PG&E; drinking water is the City of Modesto.",
    },
    {
      q: "What building code applies in Modesto?",
      a: "The 2025 California Building Code (Title 24, Part 2), effective January 1, 2026, with City of Modesto amendments, and the 2025 California Energy Code (Part 6) for energy compliance — documented on California forms, not COMcheck.",
    },
    {
      q: "What industries drive Modesto construction?",
      a: "Food and beverage processing above all — Gallo Winery's hometown operations, Frito-Lay, Del Monte, and Conagra plants — plus healthcare and Highway 99 logistics, bringing heavy process electrical, refrigeration, and industrial building work.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 64, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.modestogov.com"],
      codes: ["https://www.dgs.ca.gov/BSC"],
      amendments: ["https://www.modestogov.com"],
      utilities: ["https://www.mid.org"],
      climate: ["https://www.weather.gov/hnx/"],
      market: ["https://www.modestogov.com"],
    },
  },
};
