import type { CityData } from "../types";

export const montgomery: CityData = {
  slug: "montgomery",
  name: "Montgomery",
  stateSlug: "alabama",
  county: "Montgomery County",
  ahj: {
    office: "City of Montgomery Inspections Department",
    process:
      "Montgomery's Inspections Department administers building permits and plan review inside the city under its adopted I-code editions with local amendments, coordinating fire review with Montgomery Fire/Rescue and site review with the city's engineering staff. Montgomery County and the fast-growing Pike Road and Prattville jurisdictions run separate programs, so metro projects routinely carry two or three different adopted-edition answers across one market.",
  },
  codes: {
    building: "International Building Code as adopted by the City of Montgomery with local amendments (Alabama municipalities adopt their own editions; the state-referenced base is the 2015 IBC)",
    energy: "Commercial energy code as adopted by the City of Montgomery (2015 IECC is Alabama's state-referenced commercial baseline, with ASHRAE 90.1 as an alternate path)",
    amendments:
      "Alabama adoption is municipal: Montgomery's adopted editions and amendments are the governing text and are confirmed with the Inspections Department at kickoff. The local design layer is the Alabama River floodplain through the north side of the city, tornado exposure in the state's central belt, and state-government building standards that overlay capitol-complex work.",
  },
  utilities: {
    electric: "Alabama Power Company provides electric service in Montgomery",
    notes:
      "Alabama Power handles new commercial services and interconnections in Montgomery, including the very large industrial load of Hyundai Motor Manufacturing Alabama and its supplier park on the city's south side, where capacity planning is a standing coordination. Natural gas is Spire in the Montgomery area, and water and sewer are provided by the Montgomery Water Works & Sanitary Sewer Board.",
  },
  climateNotes:
    "ASHRAE climate zone 3A (warm-humid) on the Alabama River: long hot humid summers, mild winters, and central-Alabama tornado and severe thunderstorm exposure. The river floodplain and Catoma Creek shape the low districts; snow and deep cold are not design cases.",
  marketNotes:
    "Montgomery is Alabama's capital: state government and the capitol complex, Maxwell Air Force Base and Gunter Annex (home of Air University and major Air Force IT operations), Hyundai Motor Manufacturing Alabama — the automaker's first U.S. plant — and its supplier network, Baptist Health and Jackson Hospital, and Alabama State University drive government, defense-IT, automotive, and medical construction.",
  narratives: {
    mep:
      "MEP design in Montgomery is documented to the city's adopted I-codes and energy baseline, in zone 3A where cooling and dehumidification dominate and Alabama Power service coordination covers loads from Hyundai's supplier plants to Air University facilities. Spire gas and Montgomery Water Works coordination complete the utility picture, and state-government work adds the capitol complex's own standards to the review.",
    structural:
      "Montgomery structural design follows the city's adopted IBC edition with low seismic demand, tornado-aware wind detailing for central Alabama's storm belt, and flood design along the Alabama River and Catoma Creek lowlands. Industrial work for the automotive cluster carries heavy equipment and crane loads, and coastal-plain soils with a variable water table drive foundation selection.",
    civil:
      "Civil design in Montgomery manages drainage to the Alabama River system with floodplain constraints on the north side and rapid suburban growth pushing into Montgomery County and Pike Road, each with separate review tracks. Maxwell AFB and Gunter Annex adjacency adds federal coordination for nearby sites, and Hyundai's supplier corridor keeps extending city and county utility infrastructure south.",
    energy:
      "Energy compliance in Montgomery is documented against the city's adopted commercial energy provisions — Alabama's state-referenced baseline is the 2015 IECC with ASHRAE 90.1 as an alternate — confirmed with the city because adoption is municipal. Alabama Power programs support efficiency for the automotive and institutional loads that dominate new construction.",
  },
  faqs: [
    {
      q: "Who provides electric service in Montgomery, AL?",
      a: "Alabama Power Company provides electric service, including Hyundai Motor Manufacturing Alabama and its supplier park. Gas is Spire; water and sewer are the Montgomery Water Works & Sanitary Sewer Board.",
    },
    {
      q: "What building code applies in Montgomery?",
      a: "The IBC edition adopted by the City of Montgomery with local amendments. Alabama has no mandatory statewide commercial code, so the city's adopted text — confirmed with the Inspections Department — governs.",
    },
    {
      q: "What drives Montgomery's construction market?",
      a: "State government, Maxwell AFB/Gunter Annex and Air University, Hyundai's first U.S. assembly plant and its suppliers, and the Baptist Health and Jackson Hospital systems.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 61, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.montgomeryal.gov"],
      codes: ["https://www.montgomeryal.gov"],
      amendments: ["https://www.montgomeryal.gov"],
      utilities: ["https://www.alabamapower.com"],
      climate: ["https://www.weather.gov/bmx/"],
      market: ["https://www.montgomeryal.gov"],
    },
  },
};
