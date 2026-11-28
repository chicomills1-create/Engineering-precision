import type { CityData } from "../types";

export const greeley: CityData = {
  slug: "greeley",
  name: "Greeley",
  stateSlug: "colorado",
  county: "Weld County",
  ahj: {
    office: "City of Greeley Building Inspection Division (1100 10th Street)",
    process:
      "Greeley's Building Inspection Division administers permits and inspections through the city's eTRAKiT portal, covering building, electrical, plumbing, mechanical, and sprinkler work — each trade takes its own permit. The exemption list is narrow (Municipal Code §22-78): small accessory structures, low fences, and similar minor work only, and starting permit-required work without a permit doubles the fee to 200% under §22-81 on top of a stop-work exposure. Planning and zoning review runs under the city's Development Code (Title 24), with civil drawings and drainage reports handled through Engineering Development Review.",
  },
  codes: {
    building: "2021 International Building Code (IBC), adopted by City of Greeley Ordinance No. 25, 2022 at Greeley Municipal Code Title 22, §22-31, effective January 1, 2023, with the 2023 NEC",
    energy: "2021 International Energy Conservation Code (IECC), adopted as the Energy Conservation Code at Greeley Municipal Code Title 22, Chapter 8, under Ordinance No. 25, 2022",
    amendments:
      "Greeley's Title 22 carries an unusually long local amendment set: §§22-33 through 22-51 amend the IBC section by section, including the snow-load provisions at §1608.2, and all flatwork requires a permit under Development Code §24-1022. On the residential side, §22-95 deletes the IRC's automatic fire sprinkler mandate (R313.2) for one- and two-family homes in its entirety — a deletion design teams from sprinkler-mandate states routinely miss — and the city has added a local contractor licensing requirement for permits from January 1, 2027.",
  },
  utilities: {
    electric: "Xcel Energy",
    notes:
      "Xcel Energy delivers electricity in Greeley — there is no municipal electric utility — so new commercial services, capacity, and solar interconnection run through Xcel's service process, with Atmos Energy the principal natural gas provider by address. Water and sewer are City of Greeley utilities: the city runs its own Water and Sewer department drawing on Cache la Poudre River and Colorado-Big Thompson supplies, while fringe addresses may fall in the Central Weld County Water District, so the serving water provider must be verified by exact address before design.",
  },
  climateNotes:
    "IECC climate zone 5B (cold-dry) on the high plains of Weld County at about 4,700 feet: cold winters with real snow loads — Greeley amends the IBC snow-load section locally — hot dry summers, and some of Colorado's most severe hail and convective wind exposure. Expansive bentonite soils across the Front Range, Cache la Poudre and South Platte river floodplains, and large diurnal temperature swings round out the design drivers.",
  marketNotes:
    "Greeley is Weld County's seat and a food-processing and energy city: JBS USA — headquartered in Greeley, with its Swift Beef plant employing several thousand — and Leprino Foods, the world's largest mozzarella producer, anchor an ag-industrial base joined by Colorado Premium Foods and Hensel Phelps Construction's corporate headquarters. Banner Health's North Colorado Medical Center, the University of Northern Colorado, Aims Community College, and State Farm's regional operations anchor institutional work, and Weld County's oil and gas sector drives industrial and service construction along the US-34 and US-85 corridors.",
  narratives: {
    mep:
      "MEP design in Greeley is documented to the 2021 I-code set adopted at Title 22 — 2021 IECC for energy, 2021 IPC and IMC, and the 2023 NEC for electrical work — with each trade permitted separately through Building Inspection's eTRAKiT portal. Electric service runs through Xcel Energy rather than a city utility, and the food-processing stock that dominates local industry — JBS, Leprino, and their supplier plants — brings ammonia refrigeration, washdown, and high-demand process loads that drive service sizing and mechanical design far beyond office-building norms.",
    structural:
      "Structural design in Greeley under the 2021 IBC is a snow, wind, and soil exercise: the city locally amends the §1608.2 snow-load provisions for zone 5B winters, Front Range hail and convective wind check every roof system, and expansive bentonite soils demand geotechnical-driven foundation design — the city even lists a separate residential footing and foundation permit step. Seismic demand is modest, so gravity, drifted snow, uplift, and soil movement control most designs, including the heavy industrial frames of the ag-processing corridor.",
    civil:
      "Civil design in Greeley runs through Engineering Development Review under the Development Code, with civil drawings and drainage reports reviewed alongside planning — and a local rule with real schedule consequences: all flatwork requires a permit under §24-1022. Drainage answers to the Cache la Poudre and South Platte river systems and intense Front Range convective storms, water and sewer are city utilities inside city limits (with Central Weld County Water District on the fringe), and expansive soils shape pavement and utility bedding design across the city.",
    energy:
      "Energy compliance in Greeley is documented to the 2021 IECC as adopted at Title 22, Chapter 8, using prescriptive or performance paths with COMcheck documentation. In zone 5B the margin is split between a genuine heating season at 4,700 feet and hot, high-sun summers, so envelope air sealing, insulation continuity through freeze-thaw cycling, and right-sized equipment both ways decide compliance economics — and Xcel Energy's commercial efficiency programs add a utility incentive layer for the city's industrial and institutional buildings.",
  },
  faqs: [
    {
      q: "What building code does Greeley, CO enforce?",
      a: "The 2021 International codes adopted by Ordinance No. 25, 2022 at Greeley Municipal Code Title 22, effective January 1, 2023 — 2021 IBC (§22-31), IRC, IMC, IPC, IEBC, and IECC, with ICC A117.1-2017 and the 2023 NEC — all with extensive local amendments in §§22-33 through 22-51.",
    },
    {
      q: "Does Greeley require fire sprinklers in new homes?",
      a: "No. Greeley Municipal Code §22-95 deletes the 2021 IRC's automatic fire sprinkler mandate (R313.2) for one- and two-family dwellings in its entirety, and the fire code's Group R rule excepts them as well — a local deletion that surprises teams arriving from sprinkler-mandate jurisdictions.",
    },
    {
      q: "Who provides electric, water, and sewer service in Greeley?",
      a: "Xcel Energy provides electricity (Greeley has no municipal electric utility) and Atmos Energy is the principal gas provider. Water and sewer are City of Greeley utilities, though fringe addresses may be served by the Central Weld County Water District, so service is verified by exact address.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 42, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://spanwise.netlify.app/towns/colorado/greeley/"],
      codes: ["https://mccmeetingspublic.blob.core.usgovcloudapi.net/greeley-meet-3ca27ebeaabc46c086225093a9c9b9f3/ITEM-Attachment-001-837d60ecb05f40eabdb5186799f4a4dc.pdf"],
      amendments: ["https://cityrulelookup.com/building-safety/building-permits/greeley-co"],
      utilities: ["https://www.windsorco.gov/DocumentCenter/View/26622"],
      climate: ["https://mccmeetingspublic.blob.core.usgovcloudapi.net/greeley-meet-3ca27ebeaabc46c086225093a9c9b9f3/ITEM-Attachment-001-85cea3a2935b415ba8305988f743e79e.pdf"],
      market: ["https://livability.com/greeley/education-careers-opportunity/these-are-the-most-successful-businesses-in-greeley-co/"],
    },
  },
};
