import type { CityData } from "../types";

export const huntsville: CityData = {
  slug: "huntsville",
  name: "Huntsville",
  stateSlug: "alabama",
  county: "Madison County",
  ahj: {
    office: "City of Huntsville Inspection Department",
    process:
      "Huntsville's Inspection Department administers building permits and plan review for construction inside the city, applying the city's adopted I-code editions with local amendments, while Madison County handles unincorporated areas growing around the city edges. Commercial review coordinates building, fire, and engineering sign-offs locally, and the pace of Redstone Arsenal–driven development means review sequencing with the city's engineering and traffic departments is part of larger site approvals.",
  },
  codes: {
    building: "International Building Code as adopted by the City of Huntsville with local amendments (Alabama municipalities adopt their own editions; the state-referenced base is the 2015 IBC and Huntsville enforces its adopted edition locally)",
    energy: "Commercial energy code as adopted by the City of Huntsville (2015 IECC is Alabama's state-referenced commercial baseline, with ASHRAE 90.1 as an alternate path)",
    amendments:
      "Alabama has no mandatory statewide commercial building code, so Huntsville's adopted editions and local amendments are the governing text — they must be confirmed with the Inspection Department rather than assumed from the state reference edition. The city's tornado-region practice is a de facto amendment layer: safe rooms and storm shelters for schools and assembly occupancies follow ICC 500 expectations shaped by the Tennessee Valley's tornado history, including the 2011 Super Outbreak.",
  },
  utilities: {
    electric: "Huntsville Utilities — the city-owned utility — provides electric, natural gas, and water service in Huntsville (electricity supplied by TVA)",
    notes:
      "Huntsville Utilities is a municipally owned combined utility: one city board coordinates electric (TVA-generated power), gas, and water service, which consolidates new-service and capacity coordination for commercial projects into a single local utility. TVA's low industrial rates and the utility's experience serving Redstone Arsenal and Cummings Research Park loads make early capacity conversations productive for large users; fiber is also a Huntsville Utilities service line used across the research-park market.",
  },
  climateNotes:
    "ASHRAE climate zone 4A at the northern edge of Alabama (mixed-humid, edging from 3A): hot humid summers, mild-to-cold winters, and the Tennessee Valley's severe convective weather — Huntsville sits in Dixie Alley with significant tornado exposure and high design wind awareness. Karst limestone underlies much of Madison County.",
  marketNotes:
    "Huntsville is the Rocket City: Redstone Arsenal (NASA Marshall Space Flight Center, Army aviation and missile commands, and the FBI's growing campus), Cummings Research Park — one of the largest research parks in the U.S. — and defense contractors including Lockheed Martin, Northrop Grumman, and Dynetics drive constant office, lab, and secure-facility construction. Mazda Toyota Manufacturing, Polaris, and Blue Origin anchor advanced manufacturing, and the city has been Alabama's largest by population since 2020.",
  narratives: {
    mep:
      "MEP design in Huntsville serves a defense-and-space market: labs, secure facilities, and engineering offices for Redstone Arsenal and Cummings Research Park tenants, documented to the city's adopted I-codes and energy baseline. Huntsville Utilities' combined municipal service — TVA power, gas, and water under one board — simplifies utility coordination, and zone 4A humidity plus tornado-safe-room mechanical and standby-power requirements shape system design on institutional work.",
    structural:
      "Huntsville structural design follows the city's adopted IBC edition with low seismic demand (the New Madrid and East Tennessee zones are distant influences) but serious wind and tornado considerations: ICC 500 storm shelters are a recurring scope on schools and public buildings after the 2011 Super Outbreak crossed Madison County. Karst limestone and the valley's alluvial soils make geotechnical input decisive on larger footprints.",
    civil:
      "Civil design in Huntsville supports rapid greenfield and research-park growth: city engineering review covers drainage into the Tennessee River watershed, where karst sinkholes and spring features complicate detention design. Redstone Arsenal boundary projects add federal coordination, and the city's westward expansion toward the Mazda Toyota plant keeps extending water, sewer, and Huntsville Utilities electric infrastructure.",
    energy:
      "Energy compliance in Huntsville is documented against the city's adopted commercial energy provisions — Alabama's state-referenced baseline is the 2015 IECC with ASHRAE 90.1 as an alternate — while TVA and Huntsville Utilities efficiency programs reward beyond-code performance for the research-park and industrial loads that dominate new construction. Confirming the city's current adopted edition at kickoff is essential because Alabama adoption is municipal, not statewide.",
  },
  faqs: [
    {
      q: "Who provides electric service in Huntsville, AL?",
      a: "Huntsville Utilities, the city-owned combined utility, provides electric service (power supplied by TVA) as well as natural gas and water — one municipal board coordinates all three for new commercial services.",
    },
    {
      q: "Does Alabama have a statewide building code for Huntsville projects?",
      a: "No mandatory statewide commercial code — Alabama municipalities adopt their own IBC editions and amendments. Huntsville's adopted editions, enforced by its Inspection Department, are the governing text and should be confirmed at project start.",
    },
    {
      q: "What drives Huntsville's construction market?",
      a: "Redstone Arsenal and the defense/space economy: NASA Marshall, Army missile and aviation commands, the FBI campus, Cummings Research Park contractors, and advanced manufacturing (Mazda Toyota, Blue Origin, Polaris) generate continuous lab, office, secure-facility, and industrial work.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 76, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.huntsvilleal.gov"],
      codes: ["https://www.huntsvilleal.gov"],
      amendments: ["https://www.huntsvilleal.gov"],
      utilities: ["https://www.hsvutil.org"],
      climate: ["https://www.weather.gov/hun/"],
      market: ["https://www.huntsvilleal.gov"],
    },
  },
};
