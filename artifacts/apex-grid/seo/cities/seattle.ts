import type { CityData } from "../types";

export const seattle: CityData = {
  slug: "seattle",
  name: "Seattle",
  stateSlug: "washington",
  county: "King County",
  ahj: {
    office: "Seattle Department of Construction and Inspections (SDCI)",
    process:
      "SDCI runs plan review through its online Seattle Services Portal, with most commercial permits submitted and tracked electronically. The city uses intake screening and, for larger projects, a preliminary/pre-submittal conference process, and offers different review tracks depending on project size and complexity. SDCI publishes review timelines, and its energy code review is notably rigorous given Seattle's stringent local energy code.",
  },
  codes: {
    building:
      "2021 Seattle Building Code (based on the 2021 IBC via the 2021 Washington State Building Code) with city amendments",
    energy:
      "2021 Seattle Energy Code — a city-specific code substantially more stringent than the base Washington State Energy Code",
    amendments:
      "Seattle maintains its own Building, Residential, Mechanical, and Energy Codes with amendments on top of the state codes, and enforces the Building Emissions Performance Standard (BEPS) plus the Energy Benchmarking and Building Tune-Ups ordinances for existing buildings. The Seattle Energy Code is one of the most aggressive in the country, so design to the city edition — not the plain Washington State Energy Code.",
  },
  utilities: {
    electric:
      "Seattle City Light — a municipal utility serving the city with a nearly carbon-free, hydro-dominant generation mix",
    notes:
      "Seattle City Light's power is overwhelmingly hydroelectric and low-carbon, which shifts electrification economics and emissions accounting compared with fossil-heavy grids; new services and interconnection go through the municipal utility's process. Seattle Public Utilities provides water, sewer, and drainage, so utility coordination inside city limits runs through city agencies.",
  },
  climateNotes:
    "Seattle sits in ASHRAE climate zone 4C (marine, cool-and-wet) with mild summers, cool wet winters, and historically low cooling demand — though rising summer heat events are increasing the case for mechanical cooling; heating, moisture management, and daylight-poor winters dominate design.",
  marketNotes:
    "Seattle's construction market is shaped by major technology-sector office and campus development, dense high-rise and mid-rise multifamily, healthcare and life-science lab space, and institutional work. The city's aggressive decarbonization policy — the Building Emissions Performance Standard and one of the strictest energy codes in the nation — is a defining constraint, steering new and existing buildings toward electrification and deep envelope performance.",
  narratives: {
    mep:
      "MEP design in Seattle answers to the Seattle Energy Code, among the strictest in the U.S., in a cool marine 4C climate where heating and moisture control historically outweigh cooling — though rising summer heat is changing that calculus. We lean into heat-recovery ventilation, high-performance envelopes, and heat-pump-based heating and cooling that pair naturally with Seattle City Light's low-carbon hydro grid, making electrification both code-aligned and emissions-smart. Because SDCI energy review is rigorous and BEPS caps operational emissions, we model early, right-size systems for the mild but damp climate, and coordinate electrical service and interconnection with the municipal utility rather than assuming a fossil-grid design baseline.",
    structural:
      "Structural engineering in Seattle is high-seismic: the region faces the Cascadia Subduction Zone megathrust hazard plus the shallow crustal Seattle Fault, so sites commonly land in Seismic Design Category D with liquefaction and soft-soil concerns in filled and waterfront areas. SDCI enforces the 2021 Seattle Building Code seismic provisions, and geotechnical conditions — glacial tills, soft lake and estuarine deposits, and steep slopes — heavily influence foundation and lateral systems. Snow loads are modest at sea level but rise with elevation, and special-inspection programs run through SDCI, so we set them up alongside the Seattle Services Portal submittal.",
    civil:
      "Civil design in Seattle centers on stormwater: the city's Stormwater Code and Green Stormwater Infrastructure requirements push flow control, water-quality treatment, and on-site management to protect Puget Sound and local creeks, and drainage review is a real gate on the schedule. Steep-slope and landslide-prone Environmentally Critical Areas overlays constrain grading across many neighborhoods, and right-of-way work coordinates with Seattle Department of Transportation. Given the wet 4C climate, we lay out drainage, detention, and GSI facilities early since they consume site area, and we coordinate water and sewer capacity with Seattle Public Utilities during permitting.",
    energy:
      "Energy compliance in Seattle means the Seattle Energy Code, a city-specific code far more stringent than the base Washington State Energy Code, plus the Building Emissions Performance Standard capping operational carbon for existing buildings over time. Compliance leans on deep envelope performance, heat recovery, and electrified heat pumps — a strategy that fits Seattle City Light's low-carbon hydro grid and the city's decarbonization mandates. In the cool marine 4C climate, heating efficiency, air-tightness, and moisture control drive results more than cooling, and SDCI energy review is demanding, so we develop the compliance model and system electrification strategy from schematic design rather than retrofitting it late.",
  },
  faqs: [
    {
      q: "How strict is Seattle's energy code?",
      a: "Very. Seattle enforces its own Seattle Energy Code, one of the most aggressive in the country and substantially tougher than the base Washington State Energy Code. Combined with the Building Emissions Performance Standard, it steers projects toward electrified heat pumps, heat recovery, and high-performance envelopes, so energy strategy must be set early in design.",
    },
    {
      q: "Does Seattle have significant seismic design requirements?",
      a: "Yes. Seattle faces both the Cascadia Subduction Zone and the shallow Seattle Fault, so sites are typically Seismic Design Category D under the 2021 Seattle Building Code, with liquefaction and soft-soil concerns in filled and waterfront areas. Geotechnical investigation drives foundation and lateral design on nearly every project.",
    },
    {
      q: "Why does Seattle City Light's power mix matter for my building?",
      a: "Seattle City Light supplies nearly carbon-free, hydro-dominant electricity, which makes building electrification both cost-effective and low-emission. Because Seattle's emissions performance standard caps operational carbon, designing electrified heat-pump systems on a clean grid aligns code compliance, emissions goals, and operating cost — so we plan for it from the outset.",
    },
  ],
};
