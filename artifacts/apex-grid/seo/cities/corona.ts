import type { CityData } from "../types";

export const corona: CityData = {
  slug: "corona",
  name: "Corona",
  stateSlug: "california",
  county: "Riverside County",
  ahj: {
    office: "City of Corona Building Division, Planning & Development Department",
    process:
      "Corona's Building Division at 400 South Vicentia Avenue, Suite 120 takes applications through the eTRAKiT portal (etrakit.coronaca.gov) for plan check and inspections, with expedited online lanes published for solar and EV charging station permits. Not every permit starts in Building: the Planning Division issues fences, walls, patio covers, signs, and additions, and the Development Services counter handles grading, encroachment, and right-of-way work — routing the application to the wrong counter is a common first-submittal error. Building permits expire 12 months after issuance if not kept active by approved milestone inspections, and separate Planning, Fire, DWP, and Public Works inspections are booked with those departments directly.",
  },
  codes: {
    building: "2022 California Building Code (Title 24, Part 2, based on the 2021 IBC) as adopted and amended in Corona Municipal Code Title 15; the 2025 Title 24 edition is adopted by Ordinance 3421 effective January 1, 2026",
    energy: "2022 California Energy Code (Title 24, Part 6), with two sets of Title 24 energy calculations required in the standard submittal package; 2025 Energy Code applies to filings from January 1, 2026",
    amendments:
      "Corona's Title 15 carries unusually specific local triggers: a building permit is required for retaining walls over 2 feet and fences over 3 feet (CMC 15.02.070), separate permits are required for patio covers, pools, and fencing, and public improvements under CMC Chapter 15.48 may have to be built with the project under a written agreement before the permit issues. Corona adopts the 2025 CALGreen code (Title 24, Part 11, Chapters 1-8, Appendices A4-A6 not adopted) by CMC 15.05.020, locally amends NFPA 13D at CMC 15.04.155, and applies Hillside District standards (Chapter 17.59) to parcels with natural slopes of 15 percent or more.",
  },
  utilities: {
    electric: "Southern California Edison (SCE) serves most of Corona; the City of Corona Department of Water and Power (DWP) provides municipal electric service in defined areas including Dos Lagos, The Crossings, Corona Pointe, and Princeland",
    notes:
      "Corona has a dual electric utility structure that must be resolved by address at project start: SCE serves most commercial properties, but the city-owned Department of Water and Power serves its Greenfield/Dos Lagos-area territories and owns that distribution infrastructure, purchasing power delivered in part over SCE facilities. Interconnection applications, EV charging infrastructure, and service design go to whichever utility serves the parcel — DWP takes its own interconnection applications at 755 Public Safety Way. DWP also provides the city's water, reclaimed water, and wastewater service, consolidating water and (in its territory) power coordination in one city department.",
  },
  climateNotes:
    "Inland Southern California valley climate (California Climate Zone 10; ASHRAE 3B, hot-dry): hot summers regularly above 100F moderated by afternoon coastal influence through the Santa Ana River corridor, mild winters, and Santa Ana wind events. Wildfire exposure in the hillside and foothill districts and seismic demand are the governing non-thermal drivers.",
  marketNotes:
    "Corona sits at the SR-91/I-15 junction — the gateway between Orange County and the Inland Empire — with one of the western Inland Empire's largest industrial and logistics inventories, large tilt-up distribution buildings, and food and beverage manufacturing including Monster Energy's headquarters presence. Commercial work concentrates in industrial and warehouse construction along the 91 and I-15 corridors, retail at Dos Lagos and The Crossings, and medical and office projects serving a fast-growing commuter population priced out of coastal Orange County.",
  narratives: {
    mep:
      "MEP design in Corona starts with the utility question: most parcels are Southern California Edison, but Dos Lagos, The Crossings, Corona Pointe, and Princeland are served by the city's own Department of Water and Power, and the serving utility sets the service design, interconnection path, and rate structure. Submittals go through the Building Division's eTRAKiT portal with two sets of Title 24 calculations, expedited lanes exist for solar and EV charging, and in hot Climate Zone 10 the mechanical design is cooling-led with Santa Ana wind conditions affecting rooftop equipment.",
    structural:
      "Structural design in Corona follows the 2022 CBC as amended in Municipal Code Title 15, with seismic demand, Santa Ana wind loading, and — on the city's ring of hillside parcels — the Hillside District standards of Chapter 17.59 for natural slopes of 15 percent or more. The industrial market's large tilt-up warehouses make panel anchorage, diaphragm design, and soils reporting for alluvial valley floors the recurring structural scope.",
    civil:
      "Civil design in Corona must route grading and right-of-way work through the Development Services counter rather than the Building Division, and CMC Chapter 15.48 can require public improvements to be built with the project under a written pre-permit agreement. Water, reclaimed water, and sewer are City of Corona DWP services, drainage ties into the Santa Ana River watershed system, and even small site elements carry local permit triggers — retaining walls over 2 feet and fences over 3 feet need their own permits under CMC 15.02.070.",
    energy:
      "Energy compliance in Corona is documented to the 2022 California Energy Code (Title 24, Part 6) for Climate Zone 10, with the 2025 edition adopted by Ordinance 3421 for filings from January 1, 2026 — filing date decides the edition. Two sets of Title 24 calculations are a standard submittal element, CALGreen applies as locally adopted at CMC 15.05.020, and the flat roofs of the industrial stock make rooftop solar with SCE or DWP interconnection a routine part of the energy package.",
  },
  faqs: [
    {
      q: "Who provides electric service in Corona, CA?",
      a: "It depends on the address. Southern California Edison serves most of Corona, but the City of Corona Department of Water and Power provides municipal electric service in areas including Dos Lagos, The Crossings, Corona Pointe, and Princeland. Confirm the serving utility before service design or solar interconnection.",
    },
    {
      q: "How are permits filed in Corona?",
      a: "Building permits are filed through the eTRAKiT portal with the Building Division at 400 South Vicentia Avenue. Planning issues fences, walls, patio covers, signs, and additions, and the Development Services counter handles grading and encroachments. Building permits expire after 12 months if not kept active by inspections.",
    },
    {
      q: "What small site features need permits in Corona?",
      a: "More than most cities: Corona Municipal Code 15.02.070 requires a building permit for retaining walls over 2 feet and fences over 3 feet, and patio covers, pools, and fencing each require separate permits.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 52, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://alliancepermitting.com/guides/california/corona-building-permit"],
      codes: ["https://cityrulelookup.com/blog/building-safety-rules-in-corona-ca"],
      amendments: ["https://www.jaspector.com/permits/california/riverside/corona/"],
      utilities: ["https://www.energy.ca.gov/sites/default/files/2021-05/CEC-600-2019-057.pdf"],
      climate: ["https://www.keenenergyusa.com/service-areas/corona/"],
      market: ["https://www.keenenergyusa.com/service-areas/corona/"],
    },
  },
};
