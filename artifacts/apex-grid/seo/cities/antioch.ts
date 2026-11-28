import type { CityData } from "../types";

export const antioch: CityData = {
  slug: "antioch",
  name: "Antioch",
  stateSlug: "california",
  county: "Contra Costa County",
  ahj: {
    office: "City of Antioch Building Services Division, Community & Economic Development Department (City Hall, 200 H Street)",
    process:
      "Antioch's Building Services Division is the sole building authority inside the city and takes applications online through the city's Civic Access (EnerGov) portal: after an application is received, the division invoices the plan check fee, and once paid, the Planning Division reviews zoning and design while the Building Division reviews conformance with the California Building Code, with corrections or permit-ready notice issued through the portal. Commercial submittals typically require stamped plans plus Title 24 compliance documents, soils reports, and structural calculations as applicable. The counter runs a four-day week, with Friday by appointment, and the city offers an impact fee deferral program for eligible residential projects, allowing certain fees to be paid at final inspection or certificate of occupancy.",
  },
  codes: {
    building: "2025 California Building Code (Title 24, Part 2, based on the 2024 IBC), adopted by reference in Title 8 of the Antioch Municipal Code and enforced effective January 1, 2026",
    energy: "2025 California Energy Code (Title 24, Part 6), with CALGreen (Title 24, Part 11) mandatory measures",
    amendments:
      "Antioch adopts the California Building Standards Code by reference in Title 8 of its Municipal Code — Chapter 1 adopts the CBC including Appendix J (Grading), and Chapter 7 adopts CALGreen — and layers local rules on top, including a plumbing amendment requiring earthquake-actuated gas shutoff valves that has no counterpart in the state code. Under state law the 2025 editions govern applications submitted on or after January 1, 2026, and new local residential amendments are largely frozen by state statute until 2031, so Antioch's Title 8 tracks the state cycle closely.",
  },
  utilities: {
    electric: "Pacific Gas and Electric Company (PG&E) — electric and natural gas service",
    notes:
      "PG&E delivers both electricity and natural gas in Antioch, so new commercial services, panel and transformer capacity, and interconnections run through PG&E's service-planning process and its lead times belong on the project schedule from day one. Water is a City of Antioch utility drawing on San Joaquin River supplies, while wastewater splits: the city operates the sewer collection system and Delta Diablo — the regional district serving Antioch, Pittsburg, and Bay Point — provides treatment, so sewer capacity and connection questions can involve both agencies on larger projects.",
  },
  climateNotes:
    "California Title 24 Climate Zone 12 at the edge of the Sacramento–San Joaquin Delta: hot inland summers moderated by the Delta breeze, cool wet winters with atmospheric-river storms, and high seismic demand — Antioch sits between the Concord and Greenville fault systems and designs to Seismic Design Category D. Title 24 envelope and cool-roof requirements are driven by summer cooling peaks, and dry Delta winds plus seasonal grassland exposure keep Class A roof and defensible detailing relevant on the city's eastern edge.",
  marketNotes:
    "Antioch is east Contra Costa County's largest city, and its commercial market is a mix of commuter-driven retail, logistics, and civic reinvestment: Kaiser Permanente's Antioch Medical Center anchors the health-care sector, industrial and warehouse stock is growing along the SR-4 corridor and the city's eastern employment lands, and the downtown Rivertown waterfront district is the focus of city-led revitalization. The Antioch eBART station ties the city to the regional rail network, and most private work is retail re-tenanting, medical and industrial expansion, and production housing with its commercial support — value-priced Bay Area growth rather than greenfield suburbs.",
  narratives: {
    mep:
      "MEP design in Antioch is a Title 24 exercise: the 2025 California Energy Code governs envelope, lighting, and mechanical efficiency, CALGreen adds mandatory measures, and electrical work is documented to the 2025 California Electrical Code — with the edition set by the submittal date, since the 2025 codes took over on January 1, 2026. Service coordination runs through PG&E for both power and gas, and Antioch's local plumbing amendment requiring earthquake-actuated gas shutoff valves is a detail out-of-area teams routinely miss. Fire and life-safety scope should be sequenced early in the Building Services Division's plan check, alongside the Title 24 compliance forms the city expects in the commercial package.",
    structural:
      "Antioch structural design is seismic-first: Seismic Design Category D detailing under the 2025 CBC, with the Concord and Greenville faults setting the hazard, Delta alluvium and bay-margin soils on the north side demanding site-specific geotechnical work, and expansive clays on the southern hillsides driving foundation design. The city adopts CBC Appendix J grading provisions, and production and industrial work alike carries the soils report and structural calculations in the initial submittal rather than as a deferred item.",
    civil:
      "Civil design in Antioch works between the river and the hills: northern sites drain toward the San Joaquin River and its sloughs under Contra Costa's stormwater (C.3) regime, requiring on-site treatment and hydromodification controls, while southern sites contend with hillside grading under the city's adopted Appendix J standards. Sewer coordination can be a two-agency exercise — city collection, Delta Diablo treatment — and water is a city utility, so capacity letters and connection requirements should be locked before the building submittal, not after.",
    energy:
      "Energy compliance in Antioch is documented to the 2025 California Energy Code (Title 24, Part 6) with CALGreen mandatory measures, using the performance or prescriptive paths and the required compliance forms in the submittal set. In Climate Zone 12 the margin is decided by cooling efficiency, envelope solar control against hot Delta summers, and lighting power density — and PG&E territory adds a commercial layer of demand charges and time-of-use rates that reward load-shifting designs beyond the code minimum.",
  },
  faqs: [
    {
      q: "What building code does Antioch, CA enforce?",
      a: "The 2025 California Building Standards Code — the 2025 CBC (Title 24, Part 2, based on the 2024 IBC) and companion California codes — adopted by reference in Title 8 of the Antioch Municipal Code and effective for applications submitted on or after January 1, 2026. Energy work is documented to the 2025 California Energy Code plus CALGreen.",
    },
    {
      q: "How do I apply for a building permit in Antioch?",
      a: "Online through the city's Civic Access (EnerGov) portal. The Building Services Division invoices the plan check fee after application; once paid, Planning reviews zoning and design and Building reviews code conformance, and you are notified of corrections or that the permit is ready to issue. Commercial projects typically need stamped plans, Title 24 documents, soils reports, and structural calculations.",
    },
    {
      q: "Who provides electric, water, and sewer service in Antioch?",
      a: "PG&E provides electricity and natural gas. Water is a City of Antioch utility, and wastewater is split — the city runs the sewer collection system while Delta Diablo, the regional district also serving Pittsburg and Bay Point, provides treatment — so larger projects may need capacity answers from both.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 44, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://alliancepermitting.com/guides/california/antioch-building-permit"],
      codes: ["https://www.jaspector.com/permits/california/contra-costa/antioch/"],
      amendments: ["https://codelibrary.amlegal.com/codes/antioch/latest/antioch_ca/0-0-0-18584"],
      utilities: ["https://www.matthewsmithrealty.com/local/contracosta-antioch"],
      climate: ["https://www.disclosurepro.ai/blog/antioch-ca-roofs/"],
      market: ["https://alliancepermitting.com/guides/california/antioch-building-permit"],
    },
  },
};
