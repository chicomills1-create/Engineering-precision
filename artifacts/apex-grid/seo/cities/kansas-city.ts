import type { CityData } from "../types";

export const kansasCity: CityData = {
  slug: "kansas-city",
  name: "Kansas City",
  stateSlug: "missouri",
  county: "Jackson, Clay, and Platte counties",
  ahj: {
    office: "City of Kansas City, Missouri City Planning & Development Department — Development Services",
    process:
      "Kansas City, Missouri administers development and building permits through Development Services and its CompassKC online portal. Commercial plans can require concurrent building, fire, planning/zoning, public-works, water-services, and development-engineering review; a project outside the city limits, even within the KC metro, is a different Missouri or Kansas AHJ and must not be submitted on KCMO assumptions.",
  },
  codes: {
    building: "Kansas City, Missouri Construction Code: 2018 International Building Code with local amendments",
    energy: "Kansas City, Missouri Energy Code: 2018 International Energy Conservation Code with local amendments",
    amendments:
      "Missouri has no statewide commercial code, so KCMO’s locally adopted 2018 I-Codes and ordinance amendments control inside city limits. Development projects must also meet City zoning, development, fire, public-works, and stormwater requirements; confirm the parcel jurisdiction because Kansas City spans multiple counties and the metropolitan area crosses a state line.",
  },
  utilities: {
    electric: "Evergy Missouri Metro provides electric service in Kansas City, Missouri",
    notes:
      "Evergy reviews new service, distributed generation, and major load additions; data-center, cold-storage, and logistics projects should obtain utility capacity and service-routing information early. Kansas City Water Services provides water, wastewater, and stormwater services within the city, and Spire Missouri serves natural gas in the Kansas City area.",
  },
  climateNotes:
    "Kansas City is in mixed-humid climate zone 4A, with hot-humid summers, cold winters, severe thunderstorms and tornado exposure, and recurring freeze-thaw cycles. Loess and expansive or shrink-swell clay soils, steep tributary valleys, and Missouri/Kansas River floodplain conditions make geotechnical, grading, and floodplain work site-specific.",
  marketNotes:
    "Kansas City is a major central-U.S. logistics market at the intersection of interstate, rail, and intermodal networks, with continuing warehouse, cold-storage, and industrial development. The metro also has a nationally significant animal-health and agtech cluster and active data-center development, while downtown and riverfront reinvestment creates urban infrastructure and redevelopment work.",
  narratives: {
    mep:
      "Kansas City MEP systems must handle zone-4A seasonal swings—humid summer cooling and dehumidification, meaningful winter heating, and productive shoulder-season economizer opportunities. Evergy Missouri Metro service capacity is an early design constraint for data centers, refrigerated logistics, and industrial facilities; electrical one-lines, standby strategy, and service routing are developed with utility coordination rather than after equipment selection. KCMO’s locally adopted 2018 IECC governs energy compliance inside the city, while Kansas City Water Services and Spire Missouri interfaces shape water, sewer, and gas design. This matters in a metro that crosses the state line: the governing city and utility territory are verified before a code or interconnection path is assumed.",
    structural:
      "Kansas City structural design is generally low seismicity, leaving wind, tornado-related uplift, gravity loads, snow, frost, and soils as the recurring controls. Large logistics roofs demand careful diaphragm, joist, drift, and rooftop-equipment load paths, while severe-storm exposure makes continuous connections and cladding anchorage important. Loess, expansive clay, variable fill, and valley-side conditions can affect bearing, settlement, and pavement performance, so we use the geotechnical report to select foundations and grading recommendations rather than relying on a regional rule of thumb. The KCMO 2018 IBC amendment package is the building-code basis inside the City, with special inspections and fire/life-safety coordination part of the permit record.",
    civil:
      "Kansas City civil engineering is shaped by steep tributary drainage, river floodplains, and a long municipal stormwater-management and combined-sewer-overflow improvement program. Kansas City Water Services and Development Services review water, sanitary, stormwater, and development infrastructure; City detention, water-quality, and green-infrastructure criteria need to be set alongside Missouri DNR construction-stormwater permit and SWPPP obligations for qualifying disturbance. On logistics sites, extensive pavement and truck courts make outlet capacity and detention footprint decisive early choices. We also screen Missouri and Kansas River floodplain conditions, soil movement, and public-infrastructure connections before land planning consumes the viable drainage corridors.",
    energy:
      "KCMO’s commercial energy path is local: the City enforces its 2018 IECC with local amendments, not a Missouri statewide energy code. For mixed-humid 4A conditions, the best package balances insulation and air tightness for winter with solar control, efficient cooling, ventilation, and humidity management for summer; neither a northern heating-only recipe nor a southern cooling-only recipe fits. We prepare compliance documentation to the City edition, coordinate it with lighting and mechanical controls, and model high-load data, refrigeration, and animal-health facilities beyond generic office assumptions. Evergy’s service and demand profile is considered alongside the energy model, particularly where electrification or resilience changes peak load.",
  },
  faqs: [
    {
      q: "Which codes does Kansas City, Missouri enforce for commercial work?",
      a: "Inside KCMO, the locally adopted Construction Code is based on the 2018 IBC with City amendments, and the Energy Code is based on the 2018 IECC with local amendments. Missouri has no statewide commercial code, so neighboring KC-area jurisdictions may use a different edition or amendment package.",
    },
    {
      q: "Who reviews a Kansas City commercial development permit?",
      a: "KCMO Development Services administers development and building review through CompassKC, with building, fire, planning/zoning, public works, water services, and development engineering involved as relevant. A location in another KC metro municipality or across the Kansas line is under a different AHJ.",
    },
    {
      q: "What site constraints are common in Kansas City?",
      a: "Projects must account for tributary drainage and Missouri/Kansas River floodplain conditions, stormwater and detention requirements, and variable loess or expansive-clay soils. Kansas City Water Services and Development Services requirements, plus Missouri DNR construction-stormwater coverage for qualifying disturbance, should be incorporated before site layout is finalized.",
    },
  ],
};