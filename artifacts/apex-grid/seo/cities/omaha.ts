import type { CityData } from "../types";

export const omaha: CityData = {
  slug: "omaha",
  name: "Omaha",
  stateSlug: "nebraska",
  county: "Douglas County",
  ahj: {
    office: "City of Omaha Planning Department, Permits and Inspections Division",
    process:
      "Omaha's Permits and Inspections Division administers commercial permits and electronic plan review through the city's permit system. Building review is coordinated with planning, fire, public works, zoning, grading, and site requirements as applicable; larger developments should also resolve public infrastructure and utility requirements before final construction documents are submitted.",
  },
  codes: {
    building: "City of Omaha adopted 2018 International Building Code with Omaha amendments",
    energy: "City of Omaha adopted 2018 International Energy Conservation Code commercial provisions",
    amendments:
      "Omaha adopts and amends its own International Codes under Nebraska's locally administered code system. City zoning, floodplain, grading, stormwater, access, and public-works requirements are separate local layers, so the Omaha amendments and applicable site standards should be confirmed for the project address.",
  },
  utilities: {
    electric: "Omaha Public Power District (OPPD), a public power utility, provides electric service",
    notes:
      "OPPD service planning and distributed-generation interconnection should be started early for high-load commercial, industrial, and data-center work. Metropolitan Utilities District provides water and natural gas; the City of Omaha Public Works Department administers sanitary sewer and stormwater infrastructure.",
  },
  climateNotes:
    "Omaha is in ASHRAE climate zone 5A, with cold winters, hot humid summers, large temperature swings, deep frost, snow, hail, and severe thunderstorms/tornadoes. Missouri River floodplain areas, loess deposits, expansive clays, and variable fill make geotechnical and drainage work central to site feasibility.",
  marketNotes:
    "Omaha's construction sectors include finance and insurance offices, healthcare, logistics along I-80 and the Missouri River corridor, food/agricultural processing, higher education, and data-center development supported by public power. Downtown redevelopment and greenfield industrial projects present different utility, grading, and review challenges.",
  narratives: {
    mep:
      "Omaha MEP design must handle a broad zone 5A range: cold, freeze-prone winters; hot humid summer weather; and rapid seasonal change. Heating-plant selection, pipe and sprinkler freeze protection, economizer operation, humidity control, and robust controls are all important rather than optional refinements. OPPD is a public power utility, and early service-capacity and interconnection conversations are essential for data centers, large offices, processing, and logistics facilities; Metropolitan Utilities District water and gas service and City sewer connections need parallel routing decisions. The local 2018 IECC governs commercial energy documentation, but load profiles, resilience, and winter operation must be reconciled with code compliance before the City review.",
    structural:
      "Omaha structural design is a wind, snow, frost, and soil problem rather than a high-seismic one. Open exposure and severe storms require a continuous lateral and uplift load path, while snow accumulation and drift deserve close attention on broad industrial, warehouse, and mixed-height roofs. Foundations and exterior work must account for deep frost and freeze-thaw. Loess and expansive clay can produce settlement, moisture sensitivity, or variable bearing, and redevelopment sites may contain uncontrolled fill; a geotechnical report guides the foundation, slab, pavement, and retaining approach. Missouri River floodplain conditions may also control floor datum and equipment elevations. The adopted 2018 IBC and Omaha amendments set the review baseline.",
    civil:
      "Omaha civil design joins City grading and stormwater review with the realities of loess, clay, frost, and intense convective rainfall. Detention, water-quality practices, conveyance, and outfalls must meet Omaha Public Works requirements and work with soils that may not support optimistic infiltration rates. Missouri River and tributary floodplain sites need FEMA and local floodplain coordination before grades, fill, building elevations, or utilities are fixed. Nebraska construction-stormwater permit coverage and a SWPPP apply to qualifying land disturbance. We reserve corridors for OPPD, Metropolitan Utilities District, and City sewer infrastructure early, then coordinate access and any public improvements with the permit and public-works reviewers.",
    energy:
      "Omaha's locally adopted 2018 IECC provides the commercial energy baseline. In heating-dominated zone 5A, continuous insulation, air-barrier continuity, controlled infiltration, high-performance windows, efficient heating, and heat recovery can have major operating impact, while hot humid summers still require efficient cooling and sound moisture control. For data centers and high-load facilities, the meaningful decisions extend beyond a COMcheck line item to cooling architecture, part-load performance, heat rejection, lighting controls, and OPPD service capacity. We select the appropriate prescriptive or performance route, coordinate it with the locally amended code, and make sure utility-service choices do not undermine the modeled or permit design.",
  },
  faqs: [
    {
      q: "What codes apply to commercial work in Omaha?",
      a: "Omaha has adopted the 2018 IBC and 2018 IECC commercial provisions with City amendments. Nebraska code enforcement is locally administered, so Omaha's amendments plus local zoning, floodplain, stormwater, and public-works requirements should be confirmed for the site.",
    },
    {
      q: "Who provides electric, water, gas, and sewer service in Omaha?",
      a: "OPPD provides electricity; Metropolitan Utilities District provides water and natural gas; and City of Omaha Public Works administers sanitary sewer and stormwater infrastructure. Early capacity, routing, easement, and interconnection coordination is especially important for high-load projects.",
    },
    {
      q: "What site conditions drive Omaha structural and civil design?",
      a: "Cold weather, frost, snow, severe wind and hail, and flood exposure are important above grade. Below grade, loess, expansive clay, variable fill, and Missouri River floodplain conditions can affect bearing, settlement, infiltration, grading, utility depth, floor elevations, and drainage design, making a site-specific geotechnical evaluation important.",
    },
  ],
  research: {
    lastVerified: "2026-09-11", reviewStatus: "approved", reviewedBy: "Apex Grid evidence review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-code-compliance"],
    priority: { commercialOpportunity: 82, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.omahane.gov/Planning/Building"],
      codes: ["https://www.omahane.gov/Planning/Building/Building-Codes"],
      amendments: ["https://www.omahane.gov/Planning/Building/Building-Codes"],
      utilities: ["https://www.oppd.com/business/", "https://omahawaterworks.org/"],
      climate: ["https://www.weather.gov/oax/"],
      market: ["https://www.omahachamber.org/"],
    },
  },
};