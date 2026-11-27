import type { CityData } from "../types";

export const garland: CityData = {
  slug: "garland",
  name: "Garland",
  stateSlug: "texas",
  county: "Dallas County",
  ahj: {
    office: "City of Garland Building Inspection Department",
    process:
      "Garland's Building Inspection Department reviews commercial submittals against the city's adopted model codes, with permit fees calculated on project valuation and energy calculation sheets (COMcheck or IC3 preferred) required in the commercial package. All MEP and irrigation contractors must hold Texas state licenses AND be registered with the city's Building Inspection Department before a permit issues — a registration step out-of-town teams routinely miss. A Certificate of Occupancy is required for all non-residential businesses.",
  },
  codes: {
    building: "2015 International Building Code (City of Garland adopted model codes)",
    energy: "2015 International Energy Conservation Code, with energy calculations (COMcheck or IC3 preferred) required at submittal; Texas state energy requirements also apply",
    amendments:
      "Garland enforces an older, stable code set than most DFW peers — 2015 I-codes with the 2014 NEC, per the city's published code list — so a set documented to a neighboring city's 2021 editions will draw corrections here. The Garland Development Code governs zoning and site standards separately, and the city requires its own contractor registration on top of Texas state licensure for every trade.",
  },
  utilities: {
    electric: "Garland Power & Light (GP&L) — the city-owned municipal electric utility — serves most of Garland; Oncor delivers power in remaining areas",
    notes:
      "Garland is one of the largest Texas cities with its own municipal electric utility: GP&L owns generation and its own transmission and distribution system, so new commercial services, capacity checks, and interconnections run through the city utility rather than the ERCOT retail market — service design starts with GP&L engineering, and GP&L runs its own commercial energy-efficiency rebate programs. Water and wastewater are also City of Garland utilities, consolidating utility coordination inside city hall.",
  },
  climateNotes:
    "ASHRAE climate zone 3A (hot-humid) in North Texas: long severe cooling seasons with design temperatures in the upper 90s, hail and severe-thunderstorm exposure, and episodic winter freezes (the February 2021 Uri event is the standing resilience case). Expansive Blackland Prairie clays underlie most of the city.",
  marketNotes:
    "Garland is a first-ring Dallas suburb in a redevelopment cycle: a revitalizing downtown around its DART station, the Firewheel retail district, industrial and manufacturing stock along the IH-635 and SH-190 corridors, and large employers including Raytheon's Garland operations and Epiroc/Atlas Copco. Much of the commercial work is renovation, re-tenanting, and industrial expansion of a mature building stock rather than greenfield construction.",
  narratives: {
    mep:
      "MEP design in Garland starts with two local facts: the electric utility is the city itself — Garland Power & Light — so service sizing and interconnection run through GP&L engineering rather than a retail provider, and the enforced codes are the 2015 I-codes with the 2014 NEC, older than most DFW neighbors. Energy calculations (COMcheck or IC3) are a required submittal element, and every trade contractor must be both Texas-licensed and city-registered before permits issue.",
    structural:
      "Garland structural design is governed by expansive Blackland Prairie clay: foundation design follows the geotechnical report with drilled piers or post-tension systems to ride seasonal moisture movement, while the 2015 IBC wind and hail provisions shape the envelope. Seismic demand is minimal, so gravity, uplift, and soil movement control most designs, and the mature industrial stock adds existing-structure evaluation under the existing building code.",
    civil:
      "Civil design in Garland works within a built-out city: drainage and detention tie into established systems draining toward Duck Creek and the Lake Ray Hubbard watershed, and the Garland Development Code sets site and paving standards. Because most projects are redevelopment, utility verification — city water, sewer, and GP&L electric all run through the city — and existing-condition documentation carry more weight than on greenfield work.",
    energy:
      "Energy compliance in Garland is documented to the 2015 IECC, with the city expressly preferring COMcheck or IC3 energy calculation sheets in the commercial submittal. GP&L's municipal efficiency rebates give owners a local incentive layer on top of code compliance, and in zone 3A the compliance margin is won or lost on cooling efficiency, duct sealing, and lighting controls.",
  },
  faqs: [
    {
      q: "Who provides electric service in Garland, TX?",
      a: "Garland Power & Light (GP&L), the city-owned municipal utility, serves most of Garland and runs its own generation, transmission, and distribution. Oncor serves remaining areas. New commercial services are coordinated with GP&L engineering.",
    },
    {
      q: "What building code edition does Garland enforce?",
      a: "Garland's published code list is the 2015 I-codes — 2015 IBC, 2015 IECC, 2015 IPC/IMC/IFGC — with the 2014 NEC. That is older than many Dallas-area neighbors, so confirm the Garland editions rather than designing to a nearby city's newer set.",
    },
    {
      q: "Do contractors need to register with the City of Garland?",
      a: "Yes. In addition to Texas state licenses, general, mechanical, electrical, plumbing, irrigation, sign, and fence contractors must register with Garland's Building Inspection Department before permits are issued — with no exceptions, per the city.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 66, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.garlandtx.gov"],
      codes: ["https://www.garlandtx.gov"],
      amendments: ["https://www.garlandtx.gov"],
      utilities: ["https://www.garlandpowerandlight.com"],
      climate: ["https://www.weather.gov/fwd/"],
      market: ["https://www.garlandtx.gov"],
    },
  },
};
