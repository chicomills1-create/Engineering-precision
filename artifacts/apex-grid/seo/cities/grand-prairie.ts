import type { CityData } from "../types";

export const grandPrairie: CityData = {
  slug: "grand-prairie",
  name: "Grand Prairie",
  stateSlug: "texas",
  county: "Dallas, Tarrant, and Ellis Counties",
  ahj: {
    office: "City of Grand Prairie Building Inspections Division",
    process:
      "Grand Prairie's Building Inspections Division reviews commercial plans and issues permits under the city's adopted I-code editions with local amendments, in a city that spans three counties mid-way between Dallas and Fort Worth. Commercial review coordinates with fire, engineering, and environmental reviewers locally, and the city's entertainment and industrial districts carry their own development standards layered onto the base permit track.",
  },
  codes: {
    building: "International Building Code as adopted by the City of Grand Prairie with local amendments (Texas editions are municipal; many DFW cities enforce 2021 IBC-based sets)",
    energy: "International Energy Conservation Code as adopted by the City of Grand Prairie, subject to Texas state commercial energy requirements",
    amendments:
      "Grand Prairie's local layer is its adopted amendments plus district standards for its entertainment and industrial corridors. The design-relevant local facts are geographic: the West Fork of the Trinity River and Johnson Creek floodplains cross the city, expansive DFW clays underlie most sites, and code editions differ from both Dallas and Fort Worth — the Grand Prairie set must be confirmed with Building Inspections, not assumed from either neighbor.",
  },
  utilities: {
    electric: "Oncor Electric Delivery provides transmission and distribution service in Grand Prairie (retail electricity is supplied by competitive retail providers over Oncor's system)",
    notes:
      "Grand Prairie sits in ERCOT's competitive market: Oncor owns the wires and handles new services, capacity, and interconnections, while the energy itself is bought from a retail electric provider — so service design coordinates with Oncor engineering even though the bill comes from elsewhere. Large logistics and manufacturing loads along the I-20 and SH-161 corridors should confirm Oncor capacity early. Gas is Atmos Energy; water and wastewater are City of Grand Prairie utilities.",
  },
  climateNotes:
    "ASHRAE climate zone 3A (hot-humid) in the mid-cities of DFW: long severe cooling seasons, hail and severe thunderstorms, episodic winter freezes, and Trinity River basin flash flooding. Expansive clay soils with strong seasonal moisture movement underlie most of the city.",
  marketNotes:
    "Grand Prairie builds on logistics, manufacturing, and entertainment: Lockheed Martin's Missiles and Fire Control campus, Poly-America plastics manufacturing, large warehouse districts along I-20 and I-30, and the EpicCentral entertainment district (Epic Waters, PlayGrand Adventures, and city-developed venues) plus Lone Star Park horse racing and the Theatre at Grand Prairie. Industrial and entertainment construction lead the pipeline.",
  narratives: {
    mep:
      "MEP design in Grand Prairie is documented to the city's adopted I-codes and Texas energy requirements, with Oncor coordinating service and interconnection in ERCOT's competitive market — the wires and the energy contract are separate conversations. Zone 3A cooling loads, hail-resilient exterior equipment, and the heavy process and refrigeration loads of the manufacturing base shape system design, and entertainment venues add assembly-occupancy life-safety scopes.",
    structural:
      "Grand Prairie structural design follows the city's adopted IBC edition on expansive DFW clay: drilled-pier or post-tension foundations designed from the geotechnical report are the default answer to seasonal soil movement, while wind uplift and hail shape the envelope. Seismic demand is minimal; the Trinity and Johnson Creek floodplains set finished-floor elevations in the low corridors.",
    civil:
      "Civil design in Grand Prairie manages Trinity River basin drainage — the West Fork and Johnson Creek floodplains, detention requirements, and city stormwater rules — across a three-county city. Industrial sites along I-20 and SH-161 add truck circulation and rail-served layouts, and city water and sewer capacity coordination belongs in the first pass for the warehouse districts.",
    energy:
      "Energy compliance in Grand Prairie is documented to the IECC as adopted by the city under Texas state requirements, typically evidenced with COMcheck for commercial work. In zone 3A the margin is cooling efficiency, envelope solar control, and lighting controls, and Oncor's efficiency programs support measures across the logistics and manufacturing stock.",
  },
  faqs: [
    {
      q: "Who provides electric service in Grand Prairie?",
      a: "Oncor Electric Delivery owns the distribution system and handles new services and interconnections; electricity itself is purchased from a competitive retail provider in the ERCOT market. Gas is Atmos Energy.",
    },
    {
      q: "What building code applies in Grand Prairie?",
      a: "The IBC and IECC editions adopted by the City of Grand Prairie with local amendments — Texas has no statewide commercial code, and Grand Prairie's editions differ from Dallas's and Fort Worth's, so confirm them with Building Inspections.",
    },
    {
      q: "What drives Grand Prairie's construction market?",
      a: "Lockheed Martin's Missiles and Fire Control campus, manufacturing such as Poly-America, I-20/I-30 logistics, and the EpicCentral entertainment district and Lone Star Park — defense, industrial, and entertainment construction.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 63, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.gptx.org"],
      codes: ["https://www.gptx.org"],
      amendments: ["https://www.gptx.org"],
      utilities: ["https://www.oncor.com"],
      climate: ["https://www.weather.gov/fwd/"],
      market: ["https://www.gptx.org"],
    },
  },
};
