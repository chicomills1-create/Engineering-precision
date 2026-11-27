import type { CityData } from "../types";

export const rochester: CityData = {
  slug: "rochester",
  name: "Rochester",
  stateSlug: "new-york",
  county: "Monroe County",
  ahj: {
    office: "City of Rochester Bureau of Architecture and Engineering / Department of Neighborhood and Business Development — Permit Office",
    process:
      "Rochester administers building permits and plan review locally under the New York State Uniform Code through its permit office, with certificates and inspections handled by city code enforcement. New York requires commercial drawings to be sealed by NY-licensed design professionals, verified at intake. The city's large stock of legacy industrial and institutional buildings means existing-building and change-of-occupancy reviews are a major share of the caseload alongside new construction.",
  },
  codes: {
    building: "2020 Building Code of New York State (Uniform Code, based on the 2018 IBC with New York amendments)",
    energy: "2020 Energy Conservation Construction Code of New York State (ECCCNYS, based on 2018 IECC / ASHRAE 90.1-2016)",
    amendments:
      "The Uniform Code applies statewide as written; Rochester's local layer is administrative and land-use. The compliance context is set by New York's climate law trajectory — NYStretch energy provisions in the region and electrification-ready expectations for new buildings — and by the practical demands of converting Kodak-era industrial and downtown office stock under the Existing Building Code of New York State.",
  },
  utilities: {
    electric: "Rochester Gas and Electric (RG&E, an Avangrid company) provides electric and natural gas service in Rochester",
    notes:
      "RG&E handles new commercial services, upgrades, and interconnections in Rochester, including rooftop solar under New York's net metering and Value of Distributed Energy Resources (VDER) compensation framework administered through the utility. RG&E's service-reliability and capacity planning in older city neighborhoods makes early service coordination worthwhile on larger downtown and campus projects; the University of Rochester and Rochester Regional Health operate major district energy systems of their own.",
  },
  climateNotes:
    "ASHRAE climate zone 5A (cool-humid) on Lake Ontario's south shore: lake-effect snow is the defining condition, with seasonal snowfall routinely exceeding 100 inches and ground snow loads to match, cold winters, and mild summers moderated by the lake. Freeze protection and roof snow management are primary design cases.",
  marketNotes:
    "Rochester's construction market is anchored by the University of Rochester and Rochester Regional Health (the region's largest employers), Rochester Institute of Technology, and the optics, photonics, and imaging cluster descended from Kodak, Xerox, and Bausch + Lomb — now formalized in the AIM Photonics ecosystem. Healthcare and higher-education capital programs dominate, with downtown and Eastman Business Park industrial reuse behind them.",
  narratives: {
    mep:
      "MEP design in Rochester is documented to the 2020 Uniform Code and ECCCNYS, in RG&E territory where interconnection and VDER compensation rules shape rooftop solar and combined heat and power on campus projects. Zone 5A lake-effect winters drive heating plant sizing, snow-melt and freeze protection, and ventilation heat recovery for the hospital and university systems that anchor the market, and legacy industrial conversions add existing-system evaluation to most scopes.",
    structural:
      "Rochester structural design follows the 2020 Building Code of New York State with lake-effect ground snow loads among the highest in the state — roof snow, drift at parapets and step roofs, and ponding govern many designs. Seismic demand is low, wind is moderate off the lake plain, and the Kodak-era industrial stock brings heavy floor loads and long-span structures into existing-building review.",
    civil:
      "Civil design in Rochester works in a mature city draining to the Genesee River and Lake Ontario, with combined-sewer overflow controls and green infrastructure requirements shaping stormwater design. Snow storage is a site-design requirement in its own right at this snowfall level, and campus and hospital expansions coordinate with city water and RG&E utility corridors in established streets.",
    energy:
      "Energy compliance in Rochester is documented to the 2020 ECCCNYS, with NYStretch provisions and New York's climate-law direction raising expectations toward electrification for new buildings. In zone 5A the compliance margin is envelope and heat recovery; RG&E and NYSERDA incentive programs support beyond-code measures on the institutional projects that dominate local construction.",
  },
  faqs: [
    {
      q: "Who provides electric service in Rochester, NY?",
      a: "Rochester Gas and Electric (RG&E), an Avangrid company, provides electric and gas service. Solar and distributed generation interconnect through RG&E under New York's net metering and VDER frameworks.",
    },
    {
      q: "What building code applies in Rochester?",
      a: "The 2020 Building Code of New York State (Uniform Code, 2018 IBC-based with state amendments) and the 2020 Energy Conservation Construction Code of New York State.",
    },
    {
      q: "What climate condition most affects Rochester design?",
      a: "Lake-effect snow. Rochester averages over 100 inches of snow a season off Lake Ontario, so ground snow loads, roof drift, snow storage, and freeze protection are primary design cases in climate zone 5A.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 64, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.cityofrochester.gov"],
      codes: ["https://www.dos.ny.gov"],
      amendments: ["https://www.cityofrochester.gov"],
      utilities: ["https://www.rge.com"],
      climate: ["https://www.weather.gov/buf/"],
      market: ["https://www.cityofrochester.gov"],
    },
  },
};
