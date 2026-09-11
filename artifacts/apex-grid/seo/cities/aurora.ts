import type { CityData } from "../types";

export const aurora: CityData = {
  slug: "aurora",
  name: "Aurora",
  stateSlug: "colorado",
  county: "Arapahoe, Adams, and Douglas Counties",
  ahj: {
    office: "City of Aurora Planning and Development Services Department — Building Division",
    process:
      "Aurora's Building Division administers permits, plan review, and inspections through the city's online eTRAKiT services, with planning, civil engineering, fire, and utility reviews coordinated for development projects. The city uses pre-application and development-review processes for larger sites; a county line does not change the city AHJ for an Aurora address, but it can affect outside agencies and district coordination.",
  },
  codes: {
    building: "2021 Aurora Building Code, based on the 2021 International Codes with City of Aurora amendments",
    energy: "2021 International Energy Conservation Code commercial provisions, as adopted in the Aurora Building Code",
    amendments:
      "Aurora is a home-rule municipality and maintains its own 2021-code amendments, administrative procedures, and adopted fire code. Its code package differs from Denver's energy overlays and from the Pikes Peak regional code used in Colorado Springs; city civil, drainage, and fire standards supplement the building-code review.",
  },
  utilities: {
    electric: "Xcel Energy (Public Service Company of Colorado) provides electric and natural-gas service in Aurora",
    notes:
      "Xcel coordinates service design, meters, transformer capacity, and distributed-generation interconnection; major electrified or campus loads need early utility review. Aurora Water provides water, wastewater, and stormwater services within its system, while some areas also rely on metro districts for local infrastructure.",
  },
  climateNotes:
    "Aurora's high-plains Front Range climate is cold-dry 5B, with high altitude, intense solar exposure, large temperature swings, snow, hail, freeze-thaw, and periodic high winds. Expansive claystone soils and localized drainage/floodplain conditions shape foundations and site design; wildfire smoke can also affect outside-air operations.",
  marketNotes:
    "Aurora's market is led by the Anschutz Medical Campus and adjacent bioscience/healthcare cluster, Buckley Space Force Base and aerospace/defense activity, the I-70/Denver International Airport logistics corridor, and substantial residential and mixed-use growth. These uses create needs for medical reliability, lab infrastructure, secure facilities, and large-format distribution rather than a single downtown development pattern.",
  narratives: {
    mep:
      "Aurora MEP design uses a high-altitude 5B lens: cold winter air, strong solar gain, and wide daily swings favor heat recovery, economizers, durable freeze protection, and envelope-aware equipment sizing. Air density affects air-cooled equipment and combustion capacity, while smoke events warrant practical filtration and outside-air control sequences for healthcare and lab-adjacent work. Aurora reviews its amended 2021 code package, and Xcel should confirm electric capacity and transformer design early; Aurora Water service and fire-flow needs are equally important for campus and logistics sites.",
    structural:
      "Aurora structural work commonly turns on expansive Front Range claystone, not just nominal seismic category. The geotechnical report drives whether slabs need void space or structural support and whether drilled piers, grade beams, or moisture-control measures are warranted. Snow drift, hail, high wind, and rooftop equipment anchorage are meaningful at this elevation; medical, lab, and mission-critical uses can also introduce vibration and resilience criteria. The 2021 Aurora Building Code and city special-inspection procedures govern the permit set.",
    civil:
      "Civil engineering in Aurora needs to reserve room for full site drainage, water quality, detention, snow storage, and utility corridors before buildings and parking are fixed. The city applies its drainage criteria and development standards, and parcels near drainageways require floodplain and outfall coordination. Expansive soils affect pavement and trench design, while Aurora Water capacity, fire flow, and main-extension requirements—or applicable metro-district infrastructure—need confirmation during entitlement. High-plains runoff can be sudden despite the region's dry annual climate.",
    energy:
      "Aurora's commercial energy review is based on the 2021 IECC within the city's amended 2021 code package, rather than Denver's separately amended energy code. For cold-dry 5B, continuous insulation, airtight construction, high-performance glazing, heat recovery, and controls that capitalize on shoulder-season economizer hours create a coherent compliance strategy. Electrification may increase winter peak and service demand, so energy modeling, mechanical selection, and Xcel service capacity should be coordinated early rather than treated as independent tasks.",
  },
  faqs: [
    {
      q: "What commercial code does the City of Aurora enforce?",
      a: "Aurora enforces its amended 2021 Aurora Building Code, based on the 2021 International Codes, including commercial 2021 IECC provisions. Aurora is a home-rule city, so Denver and Colorado Springs code packages do not control an Aurora permit.",
    },
    {
      q: "Which utility serves electricity and water in Aurora?",
      a: "Xcel Energy provides electric service in Aurora, while Aurora Water operates the city's water, wastewater, and stormwater systems. Some development areas use metro-district infrastructure, so service responsibility, capacity, fire flow, and extension needs should be confirmed for the parcel.",
    },
    {
      q: "Why are geotechnical investigations important in Aurora?",
      a: "Expansive Front Range claystone can move with moisture changes and damage unsupported slabs, foundations, and pavements. The site geotechnical report establishes the appropriate foundation, void-form, drainage, and moisture-management approach before structural design is finalized.",
    },
  ],
  research: {
    lastVerified: "2026-09-11", reviewStatus: "approved", reviewedBy: "Apex Grid evidence review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 84, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.auroragov.org/city_hall/development_services"],
      codes: ["https://www.auroragov.org/city_hall/development_services/building_division"],
      amendments: ["https://www.auroragov.org/city_hall/development_services/building_division/codes"],
      utilities: ["https://www.xcelenergy.com/Working_with_Us/Builders"],
      climate: ["https://www.weather.gov/bou/"],
      market: ["https://www.auroragov.org/business_services/economic_development"],
    },
  },
};