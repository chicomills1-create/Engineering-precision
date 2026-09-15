import type { CityData } from "../types";

export const lubbock: CityData = {
  slug: "lubbock",
  name: "Lubbock",
  stateSlug: "texas",
  county: "Lubbock County",
  ahj: {
    office: "City of Lubbock Building Safety Department",
    process:
      "Building Safety administers commercial permit applications, plan review, and inspections for the City of Lubbock. Plans may be routed to building, fire, planning, engineering, and utility reviewers as applicable; development, site, floodplain, and right-of-way requirements must be coordinated with the responsible City departments in addition to the building permit.",
  },
  codes: {
    building:
      "2021 International Building Code, adopted by the City of Lubbock with local amendments",
    energy:
      "2021 International Energy Conservation Code, commercial provisions, adopted by the City of Lubbock",
    amendments:
      "Lubbock locally adopts and amends its construction-code package under Texas’s municipal code system. The current City ordinance and Building Safety administrative requirements control, while fire, site-development, drainage, accessibility, and utility requirements may add independent review comments.",
  },
  utilities: {
    electric: "Lubbock Power & Light provides electric service within its service territory",
    notes:
      "Lubbock Power & Light should be consulted early for new services, major load additions, and distributed-generation interconnection; its service territory is distinct from areas served by other regional providers. The City of Lubbock provides water and wastewater services, and water availability, main extensions, and fire-flow needs should be resolved with the utility concept.",
  },
  climateNotes:
    "Lubbock is a hot-dry, high-plains climate in IECC zone 3B, with intense solar gain, summer heat, low humidity, large diurnal swings, high winds, dust storms, hail, and occasional winter cold outbreaks. Flat terrain does not eliminate drainage risk: intense thunderstorms can exceed local conveyance capacity, and expansive or collapsible soils require site-specific geotechnical review.",
  marketNotes:
    "Lubbock’s construction market is anchored by Texas Tech University and health-care institutions, with agricultural processing, cotton-related industry, distribution, retail, multifamily, and wind-energy supply-chain activity across the South Plains. Campus, medical, industrial, and growing-edge development all bring water, electric capacity, wind exposure, and wide-site drainage questions to the front of design.",
  narratives: {
    mep:
      "Lubbock MEP design is a high-plains sensible-cooling and resilience problem: intense sun, hot afternoons, low humidity, dust, wind, and large day-to-night temperature swings drive equipment selection, filtration, controls, and envelope coordination. Lubbock Power & Light service capacity and interconnection are established early for electric heating, laboratories, medical loads, or PV, while City water and wastewater availability informs domestic, fire, and process-water planning. The City’s adopted 2021 IECC package guides the permit baseline, but solar control, air sealing, efficient cooling at high ambient conditions, and durable outdoor equipment often carry the practical value.",
    structural:
      "In Lubbock, wind, hail, roof uplift, and soil behavior are central structural considerations. High-plains exposure can make roof and cladding connections, rooftop-equipment anchorage, parapets, and continuous load paths more consequential than the region’s low seismic demand; a project must use the adopted 2021 IBC and site-specific ASCE 7 parameters. Expansive or potentially collapsible soils, variable fill, and moisture changes can dictate slab and foundation systems, so geotechnical recommendations should precede final structural layout. We also account for drift, rain, and hail-resilient roof detailing rather than treating a dry climate as a low-weather-risk climate.",
    civil:
      "Lubbock civil design must manage episodic high-intensity rainfall on very large, flat sites while protecting scarce water resources. Grading must establish positive drainage and safe overland flow because shallow slopes, closed basins, and limited downstream conveyance can leave water ponding after thunderstorms; detention, outfalls, and finished floors should be set early. We coordinate City water, wastewater, fire-flow, drainage, and right-of-way requirements with utility extensions, then prepare TCEQ construction-general-permit and SWPPP documentation for qualifying disturbance while addressing wind-driven erosion and dust control.",
    energy:
      "Commercial energy compliance in Lubbock follows the City’s locally adopted 2021 IECC, with envelope, lighting, HVAC, service-water-heating, and controls documentation tailored to that edition. In hot-dry zone 3B, low-SHGC glazing, exterior shade, reflective roof strategies where appropriate, controlled infiltration, daylighting, and equipment selected for high outdoor temperatures reduce the dominant cooling peak. We compare prescriptive and performance paths when orientation, glazing, laboratories, or process loads make trade-offs useful, and integrate Lubbock Power & Light service and PV interconnection considerations from schematic design.",
  },
  faqs: [
    {
      q: "What commercial codes does Lubbock enforce?",
      a: "Lubbock locally adopts the 2021 IBC and commercial 2021 IECC with City amendments. Because Texas has no universal commercial building-code cycle, the current City ordinance, Building Safety requirements, and related fire and site-development standards should be confirmed for the specific permit.",
    },
    {
      q: "Who provides electric, water, and sewer service in Lubbock?",
      a: "Lubbock Power & Light provides electricity within its territory, and the City of Lubbock provides water and wastewater service. Capacity, electric territory, service routing, water-main extensions, and required fire flow should be verified for the exact site early in design.",
    },
    {
      q: "Why does stormwater engineering matter in dry Lubbock?",
      a: "Long dry periods are interrupted by intense thunderstorms. Flat grades, large paved sites, limited downstream conveyance, and the need for safe overland flow can create ponding and flood risk, so finished-floor elevations, detention, drainage routes, and outfalls need to be established before the layout is fixed.",
    },
  ],
  research: {
    lastVerified: "2026-09-11", reviewStatus: "approved", reviewedBy: "Apex Grid evidence review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 76, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.mylubbock.us/529/Building-Safety"],
      codes: ["https://www.mylubbock.us/529/Building-Safety"],
      amendments: ["https://library.municode.com/tx/lubbock/codes/code_of_ordinances"],
      utilities: ["https://lpandl.com/", "https://www.mylubbock.us/water"],
      climate: ["https://www.weather.gov/lub/"],
      market: ["https://lubbockeda.org/"],
    },
  },
};