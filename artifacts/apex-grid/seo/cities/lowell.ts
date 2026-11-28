import type { CityData } from "../types";

export const lowell: CityData = {
  slug: "lowell",
  name: "Lowell",
  stateSlug: "massachusetts",
  county: "Middlesex County",
  ahj: {
    office: "City of Lowell Division of Development Services, Building Department (City Hall, 375 Merrimack Street, Room 55)",
    process:
      "Lowell's Division of Development Services issues building and trade permits from City Hall and takes applications through the city's Munis Citizen Self Service portal — applicants register, link their account to a Contractor/Customer ID (CID), upload all plans, specifications, and state forms to the application, and are notified by email when the permit is ready for online payment. One hard-copy plan set matching the uploaded digital set must also be delivered to Development Services. Building permits carry an additional $75 fee for the Certificate of Completion or Certificate of Occupancy, and the city's wiring, plumbing, and gas inspectors permit their own trades under the state specialized codes.",
  },
  codes: {
    building: "Massachusetts State Building Code, Tenth Edition (780 CMR), based on the 2021 International Building Code with Massachusetts amendments — the sole building code statewide, effective as the only edition in force since June 30, 2025",
    energy: "Massachusetts Stretch Energy Code (225 CMR 22.00 and 23.00), adopted by Lowell and layered on the Tenth Edition base energy provisions (2021 IECC with Massachusetts amendments)",
    amendments:
      "Massachusetts law gives Lowell no power to amend 780 CMR locally — the code is the Commonwealth's and is identical in every city and town. Lowell's local layer is everything around it: the city zoning ordinance and its enforcement, the Downtown Lowell and Locks and Canals historic districts that govern work on the mill-era building stock, wetlands jurisdiction along the Merrimack and Concord rivers, and the city's own fee schedule (Chapter 150: $50 up to $1,000 of construction cost plus $10 per additional $1,000, with work without a permit charged triple).",
  },
  utilities: {
    electric: "National Grid (Massachusetts Electric) — distribution utility for Lowell; natural gas is also National Grid",
    notes:
      "National Grid delivers both electricity and natural gas in Lowell, so new commercial services, service upgrades, and interconnections run through National Grid's service process, and its Mass Save programs are the main efficiency-incentive channel for commercial retrofits. Water is a city utility — the Lowell Regional Water Utility draws from the Merrimack River — and wastewater is handled by the Lowell Regional Wastewater Utility, which also serves Chelmsford, Dracut, Tewksbury, and Tyngsborough, so capacity and connection review for larger projects is a regional conversation held inside city government.",
  },
  climateNotes:
    "ASHRAE/IECC climate zone 5A (cool-humid) in the Merrimack Valley: cold, snowy winters — Lowell averages roughly 56 inches of snow a season — with a 48-inch frost depth and nor'easter exposure, warm humid summers, and Merrimack and Concord River flooding as the standing water hazard. Glacial till over shallow bedrock complicates excavation across much of the city.",
  marketNotes:
    "Lowell's commercial market is built on reinvention of its nineteenth-century textile mill stock: mill conversions to housing, office, and lab space downtown and along the canals, anchored institutionally by UMass Lowell — a growing research university with engineering and biotech programs — and Lowell General Hospital. MACOM's headquarters, UKG's Lowell campus, and a cluster of software and life-science employers fill converted mill space, and most private work is adaptive reuse, institutional expansion, and downtown redevelopment rather than greenfield construction.",
  narratives: {
    mep:
      "MEP design in Lowell is a Massachusetts exercise: the Tenth Edition of 780 CMR governs the building, the state specialized codes govern wiring, plumbing, and gas — each permitted and inspected by the city's own trade inspectors — and energy design must satisfy the Stretch Code Lowell has adopted, not just the base code. Service work runs through National Grid for both electric and gas. Because so much of the stock is mill-era, MEP scope is usually retrofit inside heavy-timber or masonry structures, where routing, fire protection, and existing-service capacity are settled before layout.",
    structural:
      "Lowell structural work is existing-building work first: the Tenth Edition's existing building provisions — alteration levels, repairs, and change of occupancy — decide most projects in the mill and downtown stock, with heavy-timber and unreinforced-masonry evaluation a recurring scope. New work designs to zone 5A snow loads with a 48-inch frost depth, and glacial till over shallow ledge means foundation design follows the geotechnical investigation rather than presumptive values.",
    civil:
      "Civil design in Lowell works around water and history: sites along the Merrimack and Concord rivers and the city's canal system fall under wetlands and floodplain jurisdiction, historic-district review shapes downtown exteriors and site work, and the combined age of the street and utility network makes existing-condition survey essential. Water supply is the city's own Merrimack River utility and wastewater is regional, so utility coordination stays inside city hall even on large projects.",
    energy:
      "Energy compliance in Lowell is documented to the Massachusetts Stretch Energy Code (225 CMR 22.00/23.00), which Lowell adopted in place of the base code alone — a materially higher bar for envelope, mechanical efficiency, and commissioning than the Tenth Edition base provisions. In zone 5A the margin is won on heating efficiency, air sealing, and heat-recovery ventilation, and National Grid's Mass Save incentives are the standard offset for commercial measures that exceed code.",
  },
  faqs: [
    {
      q: "What building code does Lowell, MA enforce?",
      a: "The Massachusetts State Building Code, Tenth Edition (780 CMR), based on the 2021 IBC with Massachusetts amendments. It is the only building code in the Commonwealth — Lowell cannot amend it locally — and the Tenth Edition has been the sole edition in force since June 30, 2025.",
    },
    {
      q: "How do I apply for a building permit in Lowell?",
      a: "Through the Division of Development Services, either in the Munis Citizen Self Service portal (register, link a Contractor/Customer ID, and upload plans and forms), in person at City Hall, 375 Merrimack Street, Room 55, by mail, or by email to buildingpermits@lowellma.gov. Building applicants must also deliver one hard-copy plan set matching the digital upload.",
    },
    {
      q: "Who provides electric and gas service in Lowell?",
      a: "National Grid delivers both electricity and natural gas in Lowell. Water comes from the city-owned Lowell Regional Water Utility, which treats Merrimack River water, and wastewater is treated by the Lowell Regional Wastewater Utility serving Lowell and four neighboring towns.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 44, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.lowellma.gov/DocumentCenter/View/36925/BLDG-1-Online-Permitting-Overview-and-Quickstart-20220331"],
      codes: ["https://www.mass.gov/handbook/tenth-edition-of-the-ma-state-building-code-780"],
      amendments: ["https://alliancepermitting.com/guides/massachusetts/lowell-building-permit"],
      utilities: ["https://www.mass.gov/doc/massachusetts-gap-iii-energy-grant-awardees/download"],
      climate: ["https://forecast.weather.gov/product.php?site=TFX&product=HYD&issuedby=BOX"],
      market: ["https://alliancepermitting.com/guides/massachusetts/middlesex-county-building-permit"],
    },
  },
};
