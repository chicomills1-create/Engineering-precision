import type { CityData } from "../types";

export const concord: CityData = {
  slug: "concord",
  name: "Concord",
  stateSlug: "north-carolina",
  county: "Cabarrus County",
  ahj: {
    office: "Cabarrus County Construction Standards Division (65 Church Street S, Concord) for building plan review, permits, and inspections; City of Concord Planning and Neighborhood Development for zoning",
    process:
      "Concord splits permitting between two governments in one workflow: the City of Concord reviews zoning, and Cabarrus County Construction Standards handles building plan review, permitting, and inspections — applicants do not need to submit separately to both. Commercial plan review is filed through the Accela Citizen Access portal as a Plan Review – Building record (site plan review is a separate record), with plans in PDF, a project cost estimate including all trades, and a lien document for projects of $30,000 or more. The county publishes its review clock: about 5–7 business days for residential reviews and 3–5 weeks for commercial reviews depending on zoning, with status tracked in Accela by the PRB record number.",
  },
  codes: {
    building: "2018 North Carolina State Building Code (based on the 2015 I-codes with North Carolina amendments), enforced by Cabarrus County Construction Standards; the adopted 2024 NC code's effective date has been repeatedly postponed and is not yet the enforced edition",
    energy: "2018 North Carolina Energy Conservation Code (based on the 2015 IECC with NC amendments; ASHRAE 90.1-2013 is an alternate commercial compliance path, documented with the NC-specific COMcheck)",
    amendments:
      "North Carolina is a statewide-code state: under G.S. 143-138 the State Building Code applies uniformly and local governments may not adopt their own building-code amendments beyond fire prevention and floodplain rules, so Concord's local layer is its Development Ordinance — zoning, site plan, and design standards — rather than code amendments. The state-level NC amendments to the 2015 I-code base are the ones that matter, including the 2018 NCECC amendment exempting Group F, S, and U occupancies from energy-code provisions.",
  },
  utilities: {
    electric: "Concord Electric Systems — the City of Concord's own municipal electric department (public power since 1904)",
    notes:
      "Concord is a North Carolina public power city: Concord Electric Systems, the city's own electric department, operates more than 1,700 miles of distribution lines and 21 substations serving over 34,000 customers, so new commercial services, capacity, and interconnections run through a city department rather than an investor-owned utility. Water, wastewater, and stormwater are also City of Concord utilities, which consolidates nearly all utility coordination inside one municipal government — the county handles the building permit, the city handles everything that connects to it.",
  },
  climateNotes:
    "ASHRAE climate zone 3A / IECC zone 3 in the North Carolina Piedmont: hot humid summers, mild winters with occasional ice, and severe thunderstorm and tropical-remnant rainfall exposure — Concord designs to a 115 mph wind speed under the NC code's county design data. Expansive Piedmont residual soils and red clays make foundation moisture control a standing issue, and seismic demand is low.",
  marketNotes:
    "Concord is the Cabarrus County seat and the Charlotte metro's second-largest city: Atrium Health Cabarrus is the largest employer, Charlotte Motor Speedway and the motorsports industry (Roush Fenway Racing and the NASCAR shop cluster) define its national profile, and Concord Mills is the largest outlet mall in North Carolina. Shoe Show's headquarters and distribution center, S&D Coffee & Tea, and Sysco anchor logistics and food operations, and the I-85 corridor keeps industrial, hospitality (Great Wolf Lodge), and medical work steady.",
  narratives: {
    mep:
      "MEP design in Concord is documented to the 2018 NC State Building Code volumes — the edition actually enforced, since the adopted 2024 NC code's effective date keeps being postponed — with energy compliance under the 2018 NCECC or the ASHRAE 90.1-2013 path using the NC-specific COMcheck. The service conversation is unusually simple: Concord Electric Systems is the city's own department, so electrical service, capacity, and interconnection are coordinated with the same municipal government that runs water and sewer, while the permit itself sits with Cabarrus County.",
    structural:
      "Structural design in Concord follows the 2018 NC Building Code with the county's published design data — 115 mph wind speed is the governing lateral number, with low seismic demand in the Piedmont. Foundations work in residual Piedmont soils and red clays where moisture-driven movement is the standing risk, and the motorsports and logistics stock along I-85 adds long-span steel and tilt-wall work where wind uplift and roof drainage detailing decide performance in tropical-remnant storms.",
    civil:
      "Civil design in Concord runs on the city's Development Ordinance: site plans, construction plans, and stormwater control measures are reviewed by the city, water and sewer permits are filed through the Citizen Access (Accela) portal, and a Certificate of Compliance — not just a building final — closes the site work, requiring SCM maintenance agreements approved by City Council, as-builts, and an engineer's certification. Because the building permit sits with Cabarrus County while site compliance sits with the city, sequencing the two governments is the core civil task.",
    energy:
      "Energy compliance in Concord is documented to the 2018 North Carolina Energy Conservation Code, with commercial buildings choosing between the prescriptive sections, the performance path at 85% of the standard reference design, ASHRAE 90.1, or the NC-specific COMcheck keyed to the 2018 code. One NC amendment changes scope materially: structures whose primary occupancy is Group F, S, or U are exempt from the energy code's provisions — a carve-out that matters in Concord's industrial and warehouse market.",
  },
  faqs: [
    {
      q: "Who issues building permits in Concord, NC?",
      a: "Cabarrus County Construction Standards issues building permits and performs plan review and inspections for projects inside Concord, while the City of Concord reviews zoning — applicants do not submit separately to both. Commercial plan review is filed in the Accela Citizen Access portal and typically takes 3–5 weeks depending on zoning.",
    },
    {
      q: "What building code is enforced in Concord?",
      a: "The 2018 North Carolina State Building Code, based on the 2015 I-codes with state amendments, including the 2018 NC Energy Conservation Code. North Carolina is a statewide-code state, so Concord cannot adopt its own building-code amendments. The adopted 2024 NC code's effective date has been repeatedly postponed and is not yet enforced.",
    },
    {
      q: "Who provides electric service in Concord, NC?",
      a: "Concord Electric Systems, the City of Concord's own municipal electric department — a public power utility operating since 1904 with more than 1,700 miles of distribution lines and 21 substations serving over 34,000 customers. Water, wastewater, and stormwater are also City of Concord utilities.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 43, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.cabarruscounty.us/Government/Departments/Construction-Standards/Plan-Review?lang_update=638588378062613942"],
      codes: ["https://www.ncosfm.gov/2017-2024-approved-amendments-241210energy-conservation-code/open"],
      amendments: ["https://concordnc.gov/Departments/Planning-Development-Services/Development-Ordinance"],
      utilities: ["https://concordnc.gov/Services/Community/News/ID/425/Concord-Electric-Systems-Earns-National-Recognition-for-Outstanding-Safety-Practices"],
      climate: ["https://bestroofingestimates.com/concord-nc/"],
      market: ["https://WWW.HOMES.COM/local-guide/concord-nc/"],
    },
  },
};
