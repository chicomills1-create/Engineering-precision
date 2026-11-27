import type { CityData } from "../types";

export const tallahassee: CityData = {
  slug: "tallahassee",
  name: "Tallahassee",
  stateSlug: "florida",
  county: "Leon County",
  ahj: {
    office: "City of Tallahassee Growth Management Department — Building Services Division",
    process:
      "Tallahassee's Building Services Division, within Growth Management, reviews plans and issues permits under the Florida Building Code through the city's online permitting system. Because the city also owns the electric, gas, water, and sewer utilities, development review in Tallahassee coordinates permitting and utility capacity inside one municipal organization — a consolidation that speeds utility answers but makes the city's development review the single gate for both.",
  },
  codes: {
    building: "Florida Building Code, 8th Edition (2023) — 2021 IBC with extensive Florida amendments, mandatory statewide",
    energy: "Florida Building Code — Energy Conservation, 8th Edition (2023)",
    amendments:
      "The FBC is mandatory statewide; Tallahassee's distinction is climatic and institutional rather than textual — it is one of the few Florida metros with genuine winter heating loads and freeze exposure, sits inland of the windborne-debris coast but still in hurricane wind-speed territory, and enforces the FBC across a canopy-road, lake-district landscape where local environmental and tree-protection rules layer onto site work.",
  },
  utilities: {
    electric: "City of Tallahassee Utilities — the municipal electric utility — serves Tallahassee (with Talquin Electric Cooperative serving surrounding Leon County areas)",
    notes:
      "Tallahassee runs one of Florida's notable municipal utilities: the city electric system (with its own generation, including the Hopkins and Purdom plants) also operates the city's natural gas, water, and sewer utilities, so new commercial services, capacity, and interconnections are coordinated with a single city utility department. Municipal rates and the city's net-metering program for rooftop solar are set locally by the City Commission, and the utility's storm-hardening program after Hurricane Michael (2018) reshaped local reliability expectations.",
  },
  climateNotes:
    "ASHRAE climate zone 2A (hot-humid) in Florida's Big Bend hill country — unusually for Florida, Tallahassee has real seasons: hot humid summers, winter freezes into the 20s, and hurricane exposure from Gulf landfalls in the Big Bend and Panhandle. Rolling red-clay hills, lakes, and sinkhole-prone limestone distinguish its terrain from peninsular Florida.",
  marketNotes:
    "Tallahassee is Florida's capital: state government is the largest employer and a constant construction client, joined by Florida State University and Florida A&M University, Tallahassee Memorial and HCA Florida Capital hospitals, and a growing innovation district around FSU's research operations and the National High Magnetic Field Laboratory — the world's strongest magnet lab, a one-of-a-kind facility client.",
  narratives: {
    mep:
      "MEP design in Tallahassee is documented to the Florida Building Code, 8th Edition (2023) including its Energy Conservation volume, with a utility picture unlike most of Florida: the City of Tallahassee's municipal utility provides electric, gas, water, and sewer, so service design is a city-coordinated exercise. Zone 2A humidity drives latent design, but genuine winter freezes make heating plant and freeze protection real scopes here — a Florida exception reviewers expect to see handled.",
    structural:
      "Tallahassee structural design follows the FBC with Big Bend hurricane wind speeds — lower than the peninsula's tip but fully hurricane-governed — and flood design around its lake districts and sinkhole-prone limestone terrain. The rolling clay hills change foundation practice from flat-Florida norms, and state-government and university work adds the FBC's public-building requirements to the standard set.",
    civil:
      "Civil design in Tallahassee works in lake and sinkhole country: stormwater drains toward Lake Jackson, Lake Lafayette, and the Wakulla watershed under city and Northwest Florida Water Management District rules, and canopy-road and tree-protection ordinances constrain site clearing in ways unusual for Florida. Municipal utility capacity — all city-owned — is confirmed inside the same Growth Management review that handles the site plan.",
    energy:
      "Energy compliance in Tallahassee runs under the FBC Energy Conservation volume (8th Edition, 2023) with Florida's compliance forms. The municipal utility's local programs and net metering shape the beyond-code conversation, and Tallahassee's seasonal climate — real heating degree-days by Florida standards — makes envelope and heat-pump performance a two-season calculation.",
  },
  faqs: [
    {
      q: "Who provides electric service in Tallahassee?",
      a: "The City of Tallahassee's municipal electric utility — which also runs the city's gas, water, and sewer systems. Talquin Electric Cooperative serves surrounding areas of Leon County outside the city system.",
    },
    {
      q: "What building code applies in Tallahassee?",
      a: "The Florida Building Code, 8th Edition (2023), mandatory statewide, including the FBC Energy Conservation volume — administered locally by the city's Building Services Division within Growth Management.",
    },
    {
      q: "How is Tallahassee's climate different from the rest of Florida?",
      a: "It has real winters for Florida — freezes into the 20s — alongside hot humid summers and Big Bend hurricane exposure, in rolling lake-and-sinkhole hill country rather than flat peninsula terrain.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 62, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.talgov.com"],
      codes: ["https://www.floridabuilding.org"],
      amendments: ["https://www.talgov.com"],
      utilities: ["https://www.talgov.com"],
      climate: ["https://www.weather.gov/tae/"],
      market: ["https://www.talgov.com"],
    },
  },
};
