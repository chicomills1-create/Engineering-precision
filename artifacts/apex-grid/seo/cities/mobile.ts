import type { CityData } from "../types";

export const mobile: CityData = {
  slug: "mobile",
  name: "Mobile",
  stateSlug: "alabama",
  county: "Mobile County",
  ahj: {
    office: "City of Mobile Urban Development Department — Permits / Building Services",
    process:
      "Mobile administers building permits and plan review through its Urban Development functions under the city's adopted I-code editions with local amendments, while Mobile County and the surrounding jurisdictions run their own programs. Commercial review coordinates with the Mobile Fire-Rescue and the city's engineering and traffic reviewers, and waterfront and port-area projects add state and federal layers (Alabama State Port Authority, Corps of Engineers) to the city track.",
  },
  codes: {
    building: "International Building Code as adopted by the City of Mobile with local amendments (Alabama municipalities adopt their own editions; the state-referenced base is the 2015 IBC)",
    energy: "Commercial energy code as adopted by the City of Mobile (2015 IECC is Alabama's state-referenced commercial baseline, with ASHRAE 90.1 as an alternate path)",
    amendments:
      "Alabama adoption is municipal, so Mobile's adopted editions and amendments govern and must be confirmed with the city rather than assumed from the state reference. The operative local layer is hurricane practice: Mobile is a Gulf landfall city (Frederic 1979, Katrina 2005 surge), and wind-load, flood-elevation, and coastal construction enforcement on the bay and riverfront districts functions as the amendment that matters most.",
  },
  utilities: {
    electric: "Alabama Power Company (a Southern Company utility) provides electric service in Mobile",
    notes:
      "Alabama Power handles new commercial services and interconnections in Mobile, including the heavy industrial loads of the port, shipbuilding, and steel corridor, where service capacity conversations start early. Natural gas is Spire (formerly Alagasco) in the Mobile area, and water and sewer are provided by MAWSS (Mobile Area Water & Sewer System) — whose Big Creek Lake watershed rules affect western development.",
  },
  climateNotes:
    "ASHRAE climate zone 2A (hot-humid) on Mobile Bay: among the rainiest large cities in the U.S. (roughly 65+ inches a year), severe cooling and dehumidification loads, and direct hurricane landfall and storm-surge exposure on the bay and Mobile River delta. Winters are mild; snow is not a design case, but wind-driven rain and flooding are.",
  marketNotes:
    "Mobile is Alabama's port city: the Port of Mobile (one of the nation's largest by tonnage, with a harbor-deepening program), Airbus's A320/A220 final assembly lines and engineering center, Austal USA's shipyards building Navy vessels, AM/NS Calvert steel upriver, and USA Health and Infirmary Health systems drive industrial, aviation, and medical construction.",
  narratives: {
    mep:
      "MEP design in Mobile is documented to the city's adopted I-codes and energy baseline, in zone 2A where latent load, corrosion from salt air, and standby power for hurricane outages shape every system. Alabama Power service coordination covers loads from port and shipyard industrial work to hospital campuses, and Spire gas and MAWSS water/sewer coordination complete a three-utility picture that starts at site selection.",
    structural:
      "Mobile structural design is hurricane engineering under the city's adopted IBC edition: high basic wind speeds, windborne debris near the coast, and flood and surge loads across the bay and river delta districts. Deep foundations in coastal plain soils and a high water table are routine, and industrial structures for shipbuilding and steel carry heavy crane and equipment loads.",
    civil:
      "Civil design in Mobile is water management at scale — 65-plus inches of annual rain, tidal drainage to Mobile Bay and the delta, and storm-surge floodplain across the working waterfront. Port and industrial sites coordinate with the Alabama State Port Authority and Corps of Engineers alongside city review, and MAWSS watershed protection shapes development on the western side.",
    energy:
      "Energy compliance in Mobile is documented against the city's adopted commercial energy provisions — Alabama's state-referenced baseline is the 2015 IECC with ASHRAE 90.1 as an alternate — confirmed with the city at kickoff because Alabama adoption is municipal. In zone 2A the margin is dehumidification and envelope control, and Alabama Power programs support efficiency on the industrial and medical loads that dominate.",
  },
  faqs: [
    {
      q: "Who provides electric service in Mobile, AL?",
      a: "Alabama Power Company provides electric service in Mobile, including the port and shipbuilding industrial corridor. Gas is Spire, and water/sewer is MAWSS (Mobile Area Water & Sewer System).",
    },
    {
      q: "What building code applies in Mobile?",
      a: "The IBC edition adopted by the City of Mobile with local amendments — Alabama has no mandatory statewide commercial code, so the city's adopted text governs and is confirmed with Urban Development at project start.",
    },
    {
      q: "What drives Mobile's construction market?",
      a: "The Port of Mobile, Airbus's final assembly lines, Austal USA shipbuilding for the Navy, steel production upriver, and the USA Health and Infirmary Health medical systems — a port, aviation, maritime, and healthcare economy.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 66, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.cityofmobile.org"],
      codes: ["https://www.cityofmobile.org"],
      amendments: ["https://www.cityofmobile.org"],
      utilities: ["https://www.alabamapower.com"],
      climate: ["https://www.weather.gov/mob/"],
      market: ["https://www.cityofmobile.org"],
    },
  },
};
