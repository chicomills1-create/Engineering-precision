import type { CityData } from "../types";

export const fortCollins: CityData = {
  slug: "fort-collins",
  name: "Fort Collins",
  stateSlug: "colorado",
  county: "Larimer County",
  ahj: {
    office: "City of Fort Collins Building Services, Community Development and Neighborhood Services (281 North College Avenue)",
    process:
      "Fort Collins Building Services runs permitting through the Accela Citizen Access portal, with electronic submittal, one permit per structure or commercial tenant space, and fees payable online, by phone, or in person at 281 North College Avenue. New buildings are expected to schedule a Building Services pre-submittal meeting at early-to-mid design so the project is checked against the adopted codes and structural design criteria before formal review. Reviews run concurrently across departments — Zoning, Poudre Fire Authority, Utilities, Engineering, and Stormwater — and close-out requires every Citizen Access task, final document, and department sign-off (including electric meter verification) to be complete before the permit shows Completed.",
  },
  codes: {
    building: "2021 International Building Code with City of Fort Collins local amendments (2024 code package adopted, effective April 1, 2026)",
    energy: "2021 International Energy Conservation Code with local amendments — commercial chapter for commercial and multi-family buildings four stories and taller",
    amendments:
      "Fort Collins publishes its own amendment package and structural design criteria at fcgov.com/building: ground snow load 35 psf, frost depth 30 inches, ultimate wind 140 mph (Exposure B, Risk Category II) per the SEAC Front Range Gust Map, Seismic Design Category B, and ICC/ANSI A117.1-2017 under Colorado CRS 9-5. Local amendments go well beyond the model code — IBC amendment Section 3604 requires EV charging capability across 70 percent of parking using three charging types, buildings using electric heat must use heat pump equipment, the city's IFC amendments require full NFPA 13 sprinklers above 5,000 square feet, and a city-licensed commercial general contractor is required for new commercial structures.",
  },
  utilities: {
    electric: "Fort Collins Utilities — the city-owned municipal utility — provides electric, water, wastewater, and stormwater service inside the city; Poudre Valley REA serves some outlying areas",
    notes:
      "Fort Collins is a full municipal-utility city: Fort Collins Utilities provides electric, water, wastewater, and stormwater, so service design, meter verification, and energization all coordinate with the city — the permit close-out checklist itself includes a Utilities meter-verification step and a free Utilities energy assessment that is required for alterations of $50,000 or more that have not had one in three years. Natural gas is the exception, provided by Xcel Energy. Outside city limits, electric service shifts to Poudre Valley REA and permitting to Larimer County.",
  },
  climateNotes:
    "IECC climate zone 5B at the Colorado Front Range foothills: cold winters with a 35 psf ground snow load and 30-inch frost depth, intense high-altitude sun, large diurnal swings, chinook-driven wind events (140 mph ultimate design wind), hail exposure, and Cache la Poudre River floodplain areas — a heating-dominated design problem with real structural snow and wind loads.",
  marketNotes:
    "Fort Collins is Northern Colorado's anchor city: Colorado State University drives education, research, and student housing construction; technology and advanced manufacturing employers include Hewlett Packard, Woodward, and OtterBox; Anheuser-Busch operates a major brewery; and UCHealth Poudre Valley Hospital anchors healthcare. Commercial work concentrates in Old Town and Midtown retail and office, CSU-adjacent development, healthcare expansion, craft brewing and manufacturing, and steady multi-family growth.",
  narratives: {
    mep:
      "MEP design in Fort Collins is documented to the 2021 I-codes with city amendments — including the local rule that buildings using electric heat must use heat pump equipment — and serviced by Fort Collins Utilities, the municipal electric and water utility, whose meter verification is a formal permit close-out step. Alterations of $50,000 or more trigger a required free Utilities energy assessment, and the 2023 NEC as amended by the State of Colorado governs electrical design, so state and city layers both belong in the code analysis on the cover sheet.",
    structural:
      "Fort Collins structural design carries Front Range loads that surprise coastal teams: 35 psf ground snow, 30-inch frost depth, 140 mph ultimate wind under the SEAC Front Range Gust Map, and Seismic Design Category B, all published in the city's own design criteria. Plans must be signed and stamped by a Colorado-licensed architect or engineer, EV-charging structural and electrical provisions ride in through local IBC amendment 3604, and foothills-edge sites add expansive-soil and wildfire-interface considerations west of the city.",
    civil:
      "Civil design in Fort Collins coordinates four city utility services at once — electric, water, wastewater, and stormwater all run through Fort Collins Utilities — with Engineering final (site/drainage) inspection and Stormwater erosion final as named close-out gates that carry multi-week review estimates. Cache la Poudre River floodplain mapping, snowmelt and intense convective storm drainage, and the city's Land Use Code landscape and irrigation-plan requirements shape site design from the first submittal.",
    energy:
      "Energy compliance in Fort Collins follows the 2021 IECC with local amendments — the commercial chapter for commercial and taller multi-family buildings — in climate zone 5B, where heating loads, envelope air sealing against chinook winds, and high-altitude solar gain decide the margin. Fort Collins Utilities' required energy assessment for larger alterations and its municipal efficiency programs give owners a local incentive and benchmarking layer beyond code, and the city's heat-pump amendment pushes electrified heating design.",
  },
  faqs: [
    {
      q: "What building codes does Fort Collins enforce?",
      a: "The 2021 I-codes with city amendments — 2021 IBC, IEBC, IECC, IMC, and IFGC, the Colorado Plumbing Code (2021 IPC), and the NEC as amended by the State of Colorado — with published design criteria of 35 psf ground snow, 30-inch frost depth, 140 mph ultimate wind, and Seismic Design Category B. A 2024 code package takes effect April 1, 2026.",
    },
    {
      q: "Who provides electric and water service in Fort Collins, CO?",
      a: "Fort Collins Utilities, the city-owned utility, provides electric, water, wastewater, and stormwater service inside the city. Xcel Energy provides natural gas, and Poudre Valley REA serves some areas outside city limits.",
    },
    {
      q: "Does Fort Collins require anything unusual for commercial permits?",
      a: "Yes: a pre-submittal meeting with Building Services for new buildings, a city-licensed commercial general contractor for new commercial structures, EV charging capability under local IBC amendment 3604, heat pumps where electric heat is used, and a free Fort Collins Utilities energy assessment for alterations of $50,000 or more.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 56, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.fortcollins.gov/Business/Permits-and-Licensing/Building-Permits/Building-Permit-Process"],
      codes: ["https://records.fcgov.com/PlanningDevelopment/DocView.aspx?id=24539558&dbid=0&repo=FortCollins"],
      amendments: ["https://records.fcgov.com/PlanningDevelopment/DocView.aspx?id=24265010&dbid=0&repo=FortCollins"],
      utilities: ["https://www.eggerselectric.com/electrician-fort-collins-co/"],
      climate: ["https://www.weather.gov/bou/"],
      market: ["https://www.fortcollins.gov/Business/Permits-and-Licensing/Building-Permits/Building-Permit-Process"],
    },
  },
};
