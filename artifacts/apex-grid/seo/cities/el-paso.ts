import type { CityData } from "../types";

export const elPaso: CityData = {
  slug: "el-paso",
  name: "El Paso",
  stateSlug: "texas",
  county: "El Paso County",
  ahj: {
    office: "City of El Paso Planning & Inspections Department",
    process:
      "Commercial building permits, plan review, and inspections are administered by Planning & Inspections through the city’s online permitting system. A complete application is routed to building, fire, planning, engineering, and utility reviewers as applicable; development in the Fort Bliss area, the historic districts, or the floodplain can add separate federal, preservation, or floodplain coordination.",
  },
  codes: {
    building: "2018 International Building Code, adopted by the City of El Paso with local amendments",
    energy: "2018 International Energy Conservation Code, commercial provisions, adopted by the City of El Paso",
    amendments:
      "El Paso adopts and amends the 2018 I-Codes locally, including its building, fire, mechanical, plumbing, and electrical packages. The city’s desert location, international-border context, and flood-control system make parcel-specific site and utility review as important as the base building-code edition.",
  },
  utilities: {
    electric: "El Paso Electric provides electric distribution service; El Paso Water provides water and wastewater service within its service area",
    notes:
      "Large service additions and distributed-generation proposals require El Paso Electric capacity and interconnection coordination. El Paso Water’s reclaimed-water, potable-water, and sewer availability information should be resolved with the site utility concept, especially where extensions or lift-station capacity are involved.",
  },
  climateNotes:
    "El Paso is hot-dry climate zone 3B, with intense solar gain, very low humidity, large daily temperature swings, dust events, and summer monsoon downpours. The Franklin Mountains, arroyos, and Rio Grande floodplain create sharply different wind, drainage, and access conditions over short distances.",
  marketNotes:
    "El Paso’s commercial work is shaped by cross-border manufacturing and logistics, warehousing and distribution around the international ports of entry, defense activity associated with Fort Bliss, healthcare, and growth on the city’s east and west sides. Water availability, border-crossing logistics, and utility extension planning are consequential schedule items on large industrial sites.",
  narratives: {
    mep:
      "El Paso MEP design responds to a hot-dry 3B climate rather than the humidity problem found in most Texas metros: solar gain, sensible cooling, filtration during dust events, and a wide diurnal swing drive equipment and control choices. We coordinate the City of El Paso’s adopted 2018 trade-code package with El Paso Electric early for service capacity and DG interconnection, while El Paso Water availability informs domestic, fire, and process-water concepts. Evaporative approaches, economizer hours, and heat rejection are evaluated against the actual program and water budget—not assumed simply because the climate is dry.",
    structural:
      "In El Paso, structural criteria change with terrain. A site at the base of the Franklin Mountains or on an exposed mesa can have materially different wind exposure, geotechnical conditions, and drainage constraints from a flat valley site. Low regional seismicity does not eliminate the need to establish site-specific IBC seismic parameters, and windborne dust and high roof temperatures make durable roof and equipment anchorage details useful. We use the project geotechnical report to address alluvial soils, rock, variable bearing, and potential collapsible or expansive soils, then coordinate the continuous load path and special inspections with Planning & Inspections under its 2018 IBC amendment package.",
    civil:
      "El Paso civil design is a water-management problem in an arid city: long dry spells do not reduce the danger of intense monsoon runoff. Arroyos can convey fast flows, and projects near the Rio Grande or mapped FEMA floodplains need floodplain review; grading must preserve safe overland routes instead of directing runoff toward buildings or neighbors. We coordinate detention, outfalls, paving, water and sewer extensions, and any reclaimed-water opportunity with city criteria and El Paso Water. Construction disturbing one acre or more also needs TCEQ construction-general-permit coverage and a SWPPP, with erosion measures designed for both wind and cloudburst conditions.",
    energy:
      "The City of El Paso’s commercial 2018 IECC target makes solar control the first energy decision. Low-SHGC glazing, exterior shading, controlled infiltration, reflective roofs where appropriate, and cooling equipment selected for high dry-bulb temperatures reduce the dominant sensible peak; a generic warm-humid strategy does not. We assemble envelope, lighting, HVAC, and service-water-heating documentation for the city’s electronic review process and compare prescriptive compliance with whole-building modeling when orientation, process loads, or large glazing make trade-offs valuable. El Paso Electric interconnection is brought into early energy and PV decisions rather than left to the permit closeout.",
  },
  faqs: [
    {
      q: "What commercial building code does El Paso enforce?",
      a: "El Paso adopts the 2018 International Building Code locally, with city amendments, along with coordinated 2018 trade-code packages. Planning & Inspections is the permitting AHJ; the current city amendment and administrative requirements should be confirmed at project kickoff.",
    },
    {
      q: "Who provides utility service for an El Paso commercial project?",
      a: "El Paso Electric provides electric distribution service, while El Paso Water provides water and wastewater service in its service area. Capacity, routing, extensions, and any distributed-generation interconnection should be coordinated for the exact parcel before major equipment or site layouts are fixed.",
    },
    {
      q: "Why is stormwater engineering important in a desert city like El Paso?",
      a: "El Paso’s dry climate is punctuated by high-intensity monsoon storms. Arroyos, the Rio Grande floodplain, and steep mountain runoff can create fast flows, so grading, detention, safe overland flow paths, and FEMA floodplain constraints require early site-specific analysis.",
    },
  ],
  research: {
    lastVerified: "2026-09-11", reviewStatus: "approved", reviewedBy: "Apex Grid evidence review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 83, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.elpasotexas.gov/planning-and-inspections/"],
      codes: ["https://www.elpasotexas.gov/planning-and-inspections/building-codes/"],
      amendments: ["https://library.municode.com/tx/el_paso/codes/code_of_ordinances"],
      utilities: ["https://www.epelectric.com/", "https://www.epwater.org/"],
      climate: ["https://www.weather.gov/epz/"],
      market: ["https://www.elpasotexas.gov/economic-development/"],
    },
  },
};