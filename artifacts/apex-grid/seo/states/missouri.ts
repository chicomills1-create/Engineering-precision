import type { StateData } from "../types";

export const missouri: StateData = {
  slug: "missouri",
  name: "Missouri",
  abbrev: "MO",
  lastVerified: "2026-07-28",
  buildingCode: {
    name: "No statewide commercial building code — local adoption of the IBC",
    baseCode: "IBC with local amendments; editions vary widely by jurisdiction",
    notes:
      "Missouri has no comprehensive statewide building code for commercial construction; cities and counties adopt (or decline to adopt) the IBC on their own cycles. Kansas City and St. Louis enforce recent IBC editions with local amendments, while many rural areas have limited or no adopted code. The governing edition must be confirmed with the specific AHJ before design.",
  },
  energyCode: {
    commercial: "Varies by jurisdiction — no statewide energy code; Kansas City, St. Louis, and other larger cities enforce IECC editions locally",
    notes:
      "With no statewide energy code, commercial energy compliance in Missouri is a city-by-city question. COMcheck runs and energy documentation must target the exact IECC edition the permitting jurisdiction enforces; some rural jurisdictions have no adopted energy code.",
  },
  climate: {
    zones: "4A across most of the state; 5A in the far north near the Iowa border",
    drivers: [
      "Hot, humid summers requiring strong dehumidification and cooling",
      "Cold winters with moderate-to-significant heating loads",
      "Large seasonal swings between heating and cooling dominance",
      "Severe-storm and tornado exposure statewide",
    ],
  },
  structural: {
    seismic: "Low in the north and west (SDC A–B), but southeastern Missouri — the Bootheel near the New Madrid Seismic Zone — reaches SDC D or higher, among the highest seismic demand east of the Rockies",
    wind: "Basic wind speeds generally around 105–115 mph (Risk Category II); high tornado frequency drives uplift and load-path attention",
    snow: "Ground snow loads commonly around 15–20 psf, higher in the north",
    other: "Frost depths of roughly 30–36 inches govern footings; expansive clays and, in the southeast, soft/liquefiable alluvial soils require geotechnical coordination",
  },
  licensure: {
    board: "Missouri Board for Architects, Professional Engineers, Professional Land Surveyors and Professional Landscape Architects (APELSLA)",
    notes: "Missouri grants licensure by comity for NCEES-record engineers; electronic seals and digital signatures are accepted for plan submittals under board rules.",
  },
  metros: ["Kansas City", "St. Louis", "Springfield", "Columbia", "Independence", "Lee's Summit"],
  permitting:
    "Missouri's home-rule structure means permitting is entirely local. Kansas City and St. Louis run structured commercial review with their own amendments and editions, while suburban and rural jurisdictions vary widely — some with minimal review. Confirming the governing code, edition, and energy requirements with the specific AHJ is the essential first step on any Missouri project.",
  marketNotes:
    "Missouri's two major metros anchor the market: Kansas City is a national logistics and animal-health/agtech hub with heavy warehouse and data-center growth, while St. Louis sustains healthcare, higher education, geospatial/defense, and biotech development. Springfield and the I-44 corridor add manufacturing and distribution activity.",
  narratives: {
    mep:
      "Missouri's climate zone 4A puts our mechanical designs in a genuinely mixed regime — hot, humid summers and cold winters that make both cooling and heating consequential, with neither dominating the way it does in the Deep South or upper Midwest. We size for strong summer dehumidification and cooling while providing efficient heating (condensing boilers, VRF, heat pumps), and we lean on economizer strategies during Missouri's long shoulder seasons. The Kansas City logistics and data-center corridor drives large electrical services and cooling loads, and we coordinate with utilities like Evergy and Ameren Missouri on capacity, redundancy, and demand strategy. Since Missouri leaves energy adoption to each jurisdiction, our compliance path shifts from city to city — Kansas City and St. Louis run their own IECC editions — so we verify the applicable edition before preparing COMcheck documentation. For the healthcare and biotech work clustered in St. Louis, ventilation, pressurization, and standby power are engineered to the demanding standards those occupancies impose.",
    structural:
      "Missouri structural design is bifurcated by seismicity. Across most of the state — Kansas City, St. Louis, Springfield — demand is low (SDC A–B) and wind and gravity govern, with Missouri's frequent tornadoes keeping our uplift resistance and load-path continuity rigorous. But southeastern Missouri, the Bootheel near the New Madrid Seismic Zone, carries some of the highest seismic demand east of the Rockies, reaching SDC D or higher, where ductile detailing, careful lateral design, and attention to liquefiable alluvial soils are non-negotiable. Ground snow is a light load here, near 15–20 psf, while footings reach past the roughly 30-to-36-inch frost depth. Statewide expansive clays and soft soils along the river corridors call for close geotechnical coordination. With no building code enacted at the state level, we tie the governing IBC edition to the specific AHJ and design the gravity and lateral systems to both that basis and the site's actual seismic category.",
    civil:
      "Site engineering in Missouri operates under the state's MS4 and NPDES framework administered by the Missouri Department of Natural Resources, which requires land-disturbance permit coverage for sites of an acre or more with a stormwater pollution prevention plan. What happens after construction — detention and water-quality control — is governed locally, and the two metros diverge sharply: Kansas City enforces detention and green-infrastructure rules shaped by a long combined-sewer-overflow consent-decree history, while St. Louis works under MSD stormwater regulations with distinct detention and water-quality criteria. Our basins, bioretention, and conveyance follow whichever local standard applies, with careful attention to Missouri's clay soils, the karst terrain found in parts of the state, and combined-sewer limitations. On the sizable warehouse and data-center developments powering the KC market, we lock down detention and outfall early to preserve developable area.",
    energy:
      "With no energy code at the state level, Missouri turns commercial compliance into a matter of tracking local adoption: Kansas City and St. Louis run their own IECC editions, other cities update on their own schedules, and some rural areas enforce nothing. We prepare documentation against whatever edition the AHJ actually enforces, warning clients off the expensive error of designing to an edition that doesn't apply. Zone 4A leaves heating and cooling roughly even, so rather than favor one season we balance insulation, air tightness, and glazing SHGC as a set and match mechanical plant capacity to the combined load. Evergy and Ameren Missouri both run above-code incentive programs, and we flag them because the rebates can recover first cost where the local baseline is weak or absent.",
  },
  faqs: [
    {
      q: "Which building code applies to my Missouri project?",
      a: "It depends on the city or county issuing the permit — Missouri has no statewide commercial building code. Kansas City and St. Louis enforce recent IBC editions with local amendments, while rural areas vary widely. We confirm the governing code and edition with the AHJ at project kickoff.",
    },
    {
      q: "Does Missouri require commercial energy code compliance?",
      a: "Only where the local jurisdiction has adopted an energy code. Kansas City, St. Louis, and other larger cities enforce IECC editions locally; some rural jurisdictions have none. Compliance documentation, typically COMcheck, must match the specific edition your permitting city enforces.",
    },
    {
      q: "Is seismic design required in Missouri?",
      a: "It depends heavily on location. Most of Missouri is low-seismicity (SDC A–B), but the southeastern Bootheel near the New Madrid Seismic Zone reaches SDC D or higher — among the highest east of the Rockies — requiring rigorous seismic detailing and liquefaction consideration. We evaluate SDC by site.",
    },
    {
      q: "What stormwater rules apply to Missouri site development?",
      a: "The Missouri DNR requires NPDES land-disturbance permit coverage for sites of an acre or more with a SWPPP. Post-construction detention and water-quality criteria are local — Kansas City and St. Louis (MSD) have their own detention and green-infrastructure standards. We design to the governing local rules.",
    },
  ],
};
