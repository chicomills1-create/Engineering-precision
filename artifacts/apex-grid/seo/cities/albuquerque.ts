import type { CityData } from "../types";

export const albuquerque: CityData = {
  slug: "albuquerque",
  name: "Albuquerque",
  stateSlug: "new-mexico",
  county: "Bernalillo County",
  ahj: {
    office: "City of Albuquerque Planning Department, Building Safety Division",
    process:
      "Building Safety administers building permits, plan review, and inspections through the City of Albuquerque's online permitting system, with planning, zoning, fire, and engineering review coordinated as needed. Work may also implicate the New Mexico Construction Industries Division and state building-code rules; city/county boundaries, historic overlays, and neighborhood association or zoning requirements should be identified at entitlement.",
  },
  codes: {
    building: "2021 New Mexico Commercial Building Code, based on the 2021 International Building Code and enforced by the City of Albuquerque with local requirements",
    energy: "2021 New Mexico Energy Conservation Code, based on the 2021 International Energy Conservation Code",
    amendments:
      "New Mexico's state construction-code rules establish the commercial-code basis, while Albuquerque adds local zoning, development-process, and building-safety requirements. The city's high-desert climate and regional seismic setting make site-specific snow, wind, seismic, and energy inputs more important than copying a low-elevation Southwest template.",
  },
  utilities: {
    electric: "Public Service Company of New Mexico (PNM) provides electric service; Albuquerque Bernalillo County Water Utility Authority provides water and wastewater service",
    notes:
      "PNM administers new electric service and distributed-generation interconnection, and its load/service review is important for all-electric and solar projects. The Water Authority's service availability, main extensions, conservation rules, and reclaimed-water programs can affect water, sewer, irrigation, and site concepts.",
  },
  climateNotes:
    "At roughly 5,300 feet above sea level, Albuquerque is a high-altitude, high-solar, cold semi-arid climate zone 4B market: large daily temperature swings, intense ultraviolet exposure, summer monsoon downpours, winter heating demand, and low humidity all shape building systems. The Rio Grande rift produces meaningful regional seismic consideration, while arroyos, expansive/collapsible soils, and wildfire at the urban-wildland edge are site-dependent constraints.",
  marketNotes:
    "Albuquerque construction activity includes health care and research, University of New Mexico and federal laboratory-related work, film production facilities, industrial/logistics projects, and infill and housing investment along major corridors. Land near arroyos or the Sandia foothills frequently requires more front-end grading, drainage, geotechnical, wildfire, and utility analysis than a flat urban infill parcel.",
  narratives: {
    mep:
      "Albuquerque MEP design is fundamentally different from low-desert cooling-only work. At about 5,300 feet, climate zone 4B combines cold winter nights, hot sunny afternoons, very dry air, and reduced air density, so equipment capacity, combustion/altitude derating, economizer and evaporative opportunities, filtration, humidification needs, and freeze protection must be evaluated together. The 2021 New Mexico Energy Conservation Code governs the commercial energy baseline. PNM service and solar interconnection are coordinated early, while Water Authority availability and conservation requirements affect plumbing, irrigation, and cooling-water concepts.",
    structural:
      "Albuquerque structural design balances regional Rio Grande rift seismicity with wind, snow, and highly variable ground conditions. Seismic design category, basic wind speed, ground snow load, and exposure are selected from the 2021 New Mexico Commercial Building Code criteria for the exact site and risk category—not from a generic desert assumption. Alluvial soils can be collapsible or expansive, and foothill sites can add slope and rock issues, so the geotechnical report guides foundations, retaining, and grading interfaces. Roof framing also needs to account for elevation-specific snow/drift conditions and robust anchorage for rooftop photovoltaic equipment.",
    civil:
      "Albuquerque civil engineering is built around water scarcity and brief, high-intensity monsoon runoff. Dry arroyos can convey dangerous flows, so floodplain limits, off-site tributary routing, erosion protection, and detention/outfall details are investigated before a layout hardens; the Albuquerque Metropolitan Arroyo Flood Control Authority is a key regional drainage stakeholder. The Water Authority's conservation-focused water service and reclaimed-water options shape landscape and irrigation design. We coordinate city drainage and development requirements, FEMA mapping where applicable, erosion/sediment controls, and New Mexico construction-stormwater coverage for qualifying sites.",
    energy:
      "Albuquerque's 2021 New Mexico Energy Conservation Code addresses a high-solar, cold-dry 4B climate where both heating and cooling performance matter. The strongest strategies are a continuous air barrier, appropriate roof and wall insulation, high-performance low-SHGC glazing that still captures useful winter sun when orientation allows, efficient heat-pump or other heating systems designed for altitude, and daylight-responsive lighting. PNM's solar interconnection process should be considered with early electrical design, but photovoltaic capacity does not replace envelope and HVAC compliance. We coordinate those measures as a complete Building Safety submittal rather than treating energy as a late COMcheck exercise.",
  },
  faqs: [
    {
      q: "Which energy code applies to a commercial building in Albuquerque?",
      a: "The commercial baseline is the 2021 New Mexico Energy Conservation Code, based on the 2021 IECC, together with applicable City of Albuquerque review requirements. Envelope, lighting, HVAC, service-water-heating, and any performance-path documentation should be prepared to that adopted state/local framework.",
    },
    {
      q: "Why does Albuquerque elevation matter to building systems?",
      a: "At roughly 5,300 feet, lower air density affects equipment performance and combustion-air considerations, while high solar exposure, cold nights, dry air, and large daily temperature swings create both heating and cooling demands. Equipment selections and loads should be calculated for the actual elevation and local design conditions.",
    },
    {
      q: "What drainage issues are unique to Albuquerque sites?",
      a: "Although annual precipitation is low, summer monsoons can generate short, intense flows through arroyos and across developed areas. A site needs early review of arroyo/floodplain constraints, tributary flow paths, erosion control, detention, and outfall conditions, often with City and AMAFCA coordination.",
    },
  ],
  research: {
    lastVerified: "2026-09-11",
    reviewStatus: "approved",
    reviewedBy: "Apex Grid evidence review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 78, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.cabq.gov/planning/building-safety-division/building-safety-division"],
      codes: ["https://www.rld.nm.gov/construction-industries/"],
      amendments: ["https://www.cabq.gov/planning/building-safety-division/building-safety-division"],
      utilities: ["https://www.pnm.com/business", "https://www.abcwua.org/"],
      climate: ["https://www.weather.gov/wrh/climate?wfo=abq"],
      market: ["https://www.cabq.gov/economicdevelopment"],
    },
  },
};