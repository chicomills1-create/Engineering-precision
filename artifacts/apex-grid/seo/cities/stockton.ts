import type { CityData } from "../types";

export const stockton: CityData = {
  slug: "stockton",
  name: "Stockton",
  stateSlug: "california",
  county: "San Joaquin County",
  ahj: {
    office: "City of Stockton Community Development Department, Building & Life Safety Division",
    process:
      "Stockton's Building & Life Safety Division administers building permits and plan review through the City's online permitting process, coordinating with planning, fire, public works, and municipal utilities as required. Development projects can need separate planning, grading, encroachment, stormwater, and utility approvals, so a building submittal should not be treated as the only City review.",
  },
  codes: {
    building: "2022 Stockton Building Code, based on the 2022 California Building Code (2021 IBC) with City of Stockton amendments",
    energy: "2022 California Energy Code (Title 24, Part 6), with 2022 CALGreen mandatory measures",
    amendments:
      "Stockton Municipal Code adopts the California Building Standards Code with local amendments. City floodplain, grading, stormwater, fire, zoning, and public-works provisions apply alongside the CBC; Delta-adjacent and redevelopment sites require parcel-specific utility and flood screening.",
  },
  utilities: {
    electric: "Pacific Gas and Electric Company (PG&E) provides electric and natural-gas service; City of Stockton Municipal Utilities Department provides water, wastewater, and stormwater services",
    notes:
      "PG&E new-service and distributed-energy interconnection requests should be started early for warehouses, cold storage, food processing, and other large loads. The Municipal Utilities Department's water, wastewater, and stormwater systems are a parallel capacity and connection consideration, particularly for industrial and infill development.",
  },
  climateNotes:
    "Stockton has a hot, dry Central Valley climate (ASHRAE 3B/California climate zone 12), with very hot summers, cool wet winters, tule fog, and periodic wildfire-smoke events. Delta flood exposure, high groundwater, alluvial soils, subsidence, and seismic liquefaction potential make finished floors and geotechnical findings site-specific.",
  marketNotes:
    "Stockton is a Central Valley logistics and distribution hub with Interstate 5 and State Route 99 access, rail connections, and port-related activity on the Stockton Deepwater Channel. Warehousing, food and agricultural processing, healthcare, education, and residential growth create demand for utility-intensive industrial work as well as infill and public-infrastructure improvements.",
  narratives: {
    mep:
      "Stockton MEP design addresses hot Central Valley cooling peaks, winter fog and damp conditions, and wildfire-smoke events that can limit outdoor-air strategies. Logistics, cold storage, food processing, port-adjacent operations, and healthcare programs need load, refrigeration, ventilation, and resilience assumptions developed from the operating plan. PG&E service capacity and interconnection are early electrical constraints, while City Municipal Utilities connections affect domestic, fire, process, sewer, and drainage coordination. The 2022 Title 24 baseline is applied with real schedules and control sequences rather than a generic warehouse or office profile.",
    structural:
      "Stockton projects follow the 2022 CBC seismic provisions, but foundation and lateral design depend strongly on Delta and Central Valley soil conditions. Alluvial deposits, high groundwater, settlement, subsidence, and liquefaction potential can drive the geotechnical recommendations for foundations, slabs, pavements, and underground utilities. Large logistics roofs also require attention to seismic diaphragm and collector behavior, wind, drift, and rooftop-equipment anchorage. City review and special inspections are coordinated with the structural package, especially where industrial occupancy or racking introduces substantial concentrated loads.",
    civil:
      "Stockton civil design begins with Delta flood exposure, low-relief drainage, groundwater, and City stormwater and utility requirements. We screen FEMA mapping, finished-floor constraints, discharge routes, and existing infrastructure before land planning fixes truck courts, buildings, and parking, then coordinate water, wastewater, and stormwater connections with the Municipal Utilities Department. Industrial and distribution sites need deliberate treatment of large impervious areas, truck circulation, water quality, and fire-service routing. Public-frontage work is coordinated with City public works, while California construction general-permit coverage and a SWPPP apply to qualifying disturbance.",
    energy:
      "Stockton commercial energy documentation follows the 2022 California Energy Code and mandatory 2022 CALGreen measures, with City amendments reviewed for the exact scope. The hot-dry climate favors solar control, high-performance roofs and glazing, efficient cooling, heat pumps, lighting controls, and demand management, but smoke events mean economizer and ventilation sequences need operational safeguards. We align the Title 24 model with actual refrigerated, process, warehouse, or healthcare loads and coordinate solar, storage, EV charging, and peak demand with PG&E. Flood elevation and electrical-room placement are considered with resilience planning rather than after energy decisions are complete.",
  },
  faqs: [
    {
      q: "Who issues commercial permits in Stockton?",
      a: "The City of Stockton Community Development Department's Building & Life Safety Division administers building permits and plan review. Planning, Fire, Public Works, and the Municipal Utilities Department may also review the project's site, utility, grading, stormwater, or fire elements.",
    },
    {
      q: "What codes apply to a Stockton commercial project?",
      a: "Stockton enforces its 2022 Building Code, based on the 2022 California Building Code, and the 2022 California Energy Code, Title 24 Part 6, with mandatory 2022 CALGreen measures. Local floodplain, grading, stormwater, and public-works requirements apply in addition.",
    },
    {
      q: "What flood and soil issues should Stockton projects evaluate?",
      a: "Delta flood exposure, low-relief drainage, high groundwater, alluvial soils, subsidence, and possible liquefaction make site-specific analysis important. FEMA mapping and a geotechnical report guide finished floors, foundations, drainage, pavement, and utility elevations.",
    },
  ],
};