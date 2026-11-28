import type { CityData } from "../types";

export const evansville: CityData = {
  slug: "evansville",
  name: "Evansville",
  stateSlug: "indiana",
  county: "Vanderburgh County",
  ahj: {
    office: "Evansville–Vanderburgh County Building Commission",
    process:
      "Evansville permitting is a two-office sequence inside the Civic Center Complex: the Area Plan Commission first issues the Improvement Location Permit (commercial, industrial, and multi-family projects route through its Site Review Committee), and the Building Commission then issues the building permit and runs inspections. For most commercial projects — Indiana Class 1 structures — an Indiana-registered design professional must first obtain a Construction Design Release from the Plan Review division of the Indiana Department of Homeland Security, and the Building Commission cannot issue the permit until that state release is in hand. Permits are applied for, tracked, and printed through the city's online permitting portal.",
  },
  codes: {
    building: "2014 Indiana Building Code (675 IAC 13-2.6, based on the 2012 International Building Code with Indiana amendments) — Indiana building codes are adopted statewide and local governments generally cannot adopt more restrictive codes",
    energy: "2010 Indiana Energy Conservation Code (675 IAC 19-4), based on ASHRAE Standard 90.1-2007 with Indiana amendments, for commercial buildings",
    amendments:
      "Indiana is a statewide-code state: the Fire Prevention and Building Safety Commission adopts the building, fire, mechanical, plumbing, and energy codes, and Evansville enforces them as written rather than layering on a local code edition. The city's local layer is procedural — the Improvement Location Permit and Site Review Committee process through the Area Plan Commission, floodplain development permits for work in the Ohio River flood hazard areas, and Evansville Fire Department plan review of sprinkler, alarm, and suppression systems as a standing member of the weekly plan review committee.",
  },
  utilities: {
    electric: "CenterPoint Energy (formerly Vectren) — electric and natural gas service in southwestern Indiana",
    notes:
      "CenterPoint Energy is the regulated electric and natural gas utility for Evansville — there is no retail electric choice in Indiana — so new commercial services, capacity checks, and service extensions run through CenterPoint's engineering and tariff process, and it operates more than 1,200 MW of generation in southwestern Indiana. Water and sewer are the city-owned Evansville Water and Sewer Utility, drawing on the Ohio River; sewer design carries the weight of the city's federal consent decree program to reduce combined sewer overflows, and phased water rate increases funding a replacement treatment plant make utility capacity and fee confirmation an early design step.",
  },
  climateNotes:
    "ASHRAE/IECC climate zone 4A (mixed-humid) on the Ohio River in southwestern Indiana: hot, humid summers and real winter heating seasons, severe-thunderstorm and tornado exposure, and extensive Ohio River floodplain that drives flood checks and floodplain permits on low-lying sites. Seismic design cannot be ignored — the Wabash Valley seismic zone sits to the north and the New Madrid zone to the south.",
  marketNotes:
    "Evansville is the commercial hub of the Indiana–Kentucky–Illinois tri-state: healthcare anchors the market through Deaconess Health System and Ascension St. Vincent Evansville, Berry Global is headquartered here, Mead Johnson Nutrition operates a major plant, and the University of Evansville and University of Southern Indiana drive institutional work. The Ohio River port, I-69 corridor logistics, and the nearby Toyota Motor Manufacturing Indiana plant in Princeton feed industrial and warehouse demand, while downtown and riverfront redevelopment generate renovation and mixed-use work.",
  narratives: {
    mep:
      "MEP design in Evansville is documented to Indiana's statewide code set — the 2014 Indiana Mechanical Code companion rules and the 2010 Indiana Energy Conservation Code (ASHRAE 90.1-2007) — an older energy baseline than neighboring states, so a set modeled to Illinois or Kentucky editions will be over- or mis-documented here. Electrical service runs through CenterPoint Energy as the sole regulated provider, and fire protection systems take a parallel review with the Evansville Fire Department's Code Enforcement Section, which sits on the weekly plan review committee and must inspect before occupancy.",
    structural:
      "Structural design in Evansville follows the 2014 Indiana Building Code (2012 IBC base) with two regional drivers: Ohio River alluvial soils and floodplain along the riverfront, and genuine seismic demand from the Wabash Valley and New Madrid seismic zones — a combination most Indiana markets do not impose. Wind design must account for severe thunderstorm and tornado exposure in zone 4A, and Class 1 structures over the state volume threshold require an Indiana-registered design professional's seal for the Construction Design Release.",
    civil:
      "Civil design in Evansville starts at the Area Plan Commission: the Improvement Location Permit and, for commercial work, Site Review Committee approval precede the building permit, and any site in the Ohio River floodplain needs a floodplain development permit and flood check before design hardens. Drainage design ties into a system under a federal consent decree to cut combined sewer overflows, so Evansville Water and Sewer Utility capacity and stormwater expectations should be confirmed at schematic design, not at permit submittal.",
    energy:
      "Energy compliance in Evansville is documented to the 2010 Indiana Energy Conservation Code, which applies ASHRAE 90.1-2007 with Indiana amendments to commercial buildings — one of the oldest commercial energy baselines in the Midwest. In zone 4A both heating and cooling loads matter, and because CenterPoint Energy is a regulated single provider, demand and rate structure analysis is a utility conversation rather than a supplier-shopping exercise; the code margin is won on envelope performance and HVAC efficiency documented the Indiana way.",
  },
  faqs: [
    {
      q: "What building code does Evansville enforce?",
      a: "The statewide Indiana codes adopted by the Fire Prevention and Building Safety Commission — principally the 2014 Indiana Building Code (based on the 2012 IBC) — enforced locally by the Evansville–Vanderburgh County Building Commission. Indiana local governments generally cannot adopt more restrictive codes, and commercial energy work follows the 2010 Indiana Energy Conservation Code (ASHRAE 90.1-2007).",
    },
    {
      q: "What is a Construction Design Release, and does my Evansville project need one?",
      a: "For most commercial (Class 1) projects, an Indiana-registered design professional must submit plans to the Indiana Department of Homeland Security's Plan Review division and obtain a Construction Design Release before the Building Commission can issue the local permit. Projects also need an Improvement Location Permit from the Area Plan Commission first.",
    },
    {
      q: "Who provides electric, gas, water, and sewer service in Evansville?",
      a: "CenterPoint Energy provides regulated electric and natural gas service. Water and sewer are provided by the city-owned Evansville Water and Sewer Utility, which draws on the Ohio River and is carrying out a federal consent decree program to reduce sewer overflows.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 44, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.evansvillegov.org/city/topic/subtopic.php?topicid=572&"],
      codes: ["https://www.evansvillegov.org/egov/apps/document/center.egov?view=item;id=1652"],
      amendments: ["https://www.evansvillegov.org/egov/apps/document/center.egov?view=item;id=1652"],
      utilities: ["https://www.centerpointenergy.com/en-us/corporate/about-us/company-overview/where-we-serve"],
      climate: ["https://www.evansvillegov.org/city/topic/subtopic.php?topicid=572&"],
      market: ["https://skylinecapitalinvestments.com/market-insights/evansville-in-apartment-operating-costs/"],
    },
  },
};
