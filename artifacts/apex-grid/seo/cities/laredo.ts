import type { CityData } from "../types";

export const laredo: CityData = {
  slug: "laredo",
  name: "Laredo",
  stateSlug: "texas",
  county: "Webb County",
  ahj: {
    office: "City of Laredo Building Development Services Department",
    process:
      "Building Development Services administers City building permits, plan review, and inspections, with applications and plan documents submitted through the City's permitting process. Commercial development commonly requires parallel zoning, plat, engineering, fire, utility, and right-of-way review; City limits and unincorporated Webb County are distinct permit jurisdictions.",
  },
  codes: {
    building: "2021 International Building Code, adopted by the City of Laredo with local amendments",
    energy: "2021 International Energy Conservation Code, commercial provisions, adopted by the City of Laredo with local amendments",
    amendments:
      "Laredo adopts its own locally amended I-Code package, including associated fire, mechanical, plumbing, and electrical codes. The City ordinance, adopted amendments, and Building Development Services requirements—not a statewide Texas building-code edition or a neighboring jurisdiction's package—govern the submittal.",
  },
  utilities: {
    electric: "AEP Texas provides electric distribution service in Laredo; the city is within ERCOT's competitive retail-electric market",
    notes:
      "AEP Texas coordinates delivery facilities, meters, extensions, and distributed-generation interconnection, while customers select a retail electric provider for energy supply. The City of Laredo Utilities Department provides water and wastewater service; large demands, fire flow, extensions, and border-area growth infrastructure require early utility review.",
  },
  climateNotes:
    "Laredo is a hot-dry ASHRAE climate zone 2B city with very high summer temperatures, strong solar gain, low rainfall punctuated by intense thunderstorms, drought, and Rio Grande flood exposure. Caliche, expansive or collapsible soils, and sparse vegetation can make geotechnical investigation, erosion control, and water-conscious site design consequential.",
  marketNotes:
    "Laredo is a major U.S.-Mexico trade gateway, with international bridges, customs brokerage, warehousing, trucking, and logistics driving industrial development. The I-35 corridor, World Trade Bridge activity, retail and healthcare growth support continued construction, while water, wastewater, transportation access, and drainage infrastructure are material feasibility issues for large greenfield and industrial sites.",
  narratives: {
    mep:
      "Laredo MEP design is led by extreme sensible cooling, solar gain, and water-aware operations in hot-dry climate zone 2B. High-performance glazing, shading, roof strategy, efficient cooling plants, ventilation controls, and robust filtration help manage peak conditions, while a real freeze-protection check remains prudent for occasional cold events. The City's locally amended 2021 I-Code package—not a generic Texas assumption—sets permit requirements. AEP Texas owns the delivery infrastructure in ERCOT, so large warehouse, refrigerated, or border-logistics loads require early decisions on voltage, fault duty, transformer placement, and the customer's retail-supply strategy; City water and wastewater capacity are coordinated in parallel.",
    structural:
      "Laredo structural design balances low seismic demand with wind, heat, and soil performance. The locally adopted 2021 IBC basis requires site-specific wind, exposure, roof uplift, canopy, cladding, and rooftop-equipment design; intense convective storms make drainage and exterior attachment details important even in a dry climate. Caliche and variable alluvial or expansive soils can affect excavation, slab support, piers, buried utilities, and pavement, so the geotechnical report governs foundation strategy rather than a regional rule of thumb. Solar-driven movement and durable detailing at roof and enclosure interfaces are coordinated with the mechanical and architectural systems.",
    civil:
      "Laredo civil engineering treats water as both scarce and episodic. A site can experience long drought followed by short, high-intensity storms, with drainage ultimately tied to arroyos, the Rio Grande basin, or City systems; grading, conveyance, detention, and outfall design need the City's engineering criteria and actual downstream conditions. We reserve corridors for City water and wastewater extensions, evaluate fire flow and large-use demand early, and coordinate access and platting with development review. Rio Grande floodplain mapping may govern low-lying parcels, and qualifying construction disturbance requires Texas Commission on Environmental Quality construction-general-permit coverage and a SWPPP.",
    energy:
      "Laredo's commercial energy baseline is the City's locally amended 2021 IECC. In zone 2B, cooling and solar control dominate: low-SHGC glazing, exterior shade, reflective roofs, air sealing, efficient cooling, and lighting controls reduce peak demand in an ERCOT market, while the selected HVAC system must still control ventilation and shoulder-season operation. We choose the prescriptive or modeled path against Laredo's adopted package and reconcile envelope, HVAC, lighting, and service-water-heating documents before Building Development Services review. Early AEP Texas service coordination keeps a high-load design from assuming capacity or transformer placement that the delivery system cannot support.",
  },
  faqs: [
    {
      q: "Which building and energy codes apply to commercial work in Laredo?",
      a: "Laredo adopts the 2021 International Building Code and 2021 International Energy Conservation Code commercial provisions with City amendments. The City's adopted ordinance, amendments, and Building Development Services requirements govern; Texas does not supply one statewide commercial building-code edition that replaces local adoption.",
    },
    {
      q: "How does electricity work for a Laredo commercial project?",
      a: "AEP Texas provides the electric delivery network, meters, extensions, and interconnection. Laredo is in ERCOT's competitive retail market, so the customer chooses a retail provider for energy supply. Confirm available capacity, voltage, transformer siting, and service routing with AEP Texas early for large loads.",
    },
    {
      q: "Why are drainage and geotechnical work important in Laredo's dry climate?",
      a: "Low annual rainfall does not eliminate flood risk: intense thunderstorms can produce rapid runoff to arroyos, City systems, or the Rio Grande basin. Caliche and variable soils also affect foundations, pavements, utility trenches, and infiltration, so design needs site-specific drainage, floodplain, and geotechnical information.",
    },
  ],
  research: {
    lastVerified: "2026-09-11", reviewStatus: "approved", reviewedBy: "Apex Grid evidence review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 79, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.cityoflaredo.com/development-services/"],
      codes: ["https://www.cityoflaredo.com/development-services/building-development-services/"],
      amendments: ["https://library.municode.com/tx/laredo/codes/code_of_ordinances"],
      utilities: ["https://www.aeptexas.com/", "https://www.cityoflaredo.com/utilities/"],
      climate: ["https://www.weather.gov/ewx/"],
      market: ["https://www.cityoflaredo.com/economic-development/"],
    },
  },
};