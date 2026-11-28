import type { CityData } from "../types";

export const killeen: CityData = {
  slug: "killeen",
  name: "Killeen",
  stateSlug: "texas",
  county: "Bell County",
  ahj: {
    office: "City of Killeen Development Services Department — Building Inspections Division",
    process:
      "Killeen's Building Inspections Division (200 East Avenue D) reviews and permits commercial work under Chapter 8 of the Killeen Code of Ordinances, with electronic documents required in the permit application package and contractor registration required with the city before work begins — though state law bars registration fees for plumbing, electrical, and mechanical contractors. A local step out-of-town teams miss is the form placement verification: for new buildings and additions, a form check document sealed by a Texas Registered Professional Land Surveyor must be submitted and approved verifying building placement before the foundation proceeds. Work started without a permit draws doubled permit fees.",
  },
  codes: {
    building: "2021 International Building Code, adopted with the 2021 International Construction Codes and the 2020 National Electrical Code by Ordinance 22-004, effective for permits received on or after March 1, 2022",
    energy: "2021 International Energy Conservation Code as adopted locally; Texas state energy code requirements administered through SECO also apply to commercial construction",
    amendments:
      "Killeen's Chapter 8 carries the local amendments to the 2021 I-codes, including the surveyor-sealed form placement verification requirement (new Section 8-32), a permit requirement expressly covering structural and foundation repairs, a non-refundable $10 technology/application fee, and clarified rules that non-expired permits may be extended at no fee when requested before expiration while expired permits cannot be extended if code or design changes have occurred. The division has publicly targeted adoption of the 2024 I-codes with the 2023 NEC effective January 1, 2026, so late-2025 filings should confirm which edition the permit date locks in.",
  },
  utilities: {
    electric: "Oncor Electric Delivery is the transmission and distribution utility in Killeen; customers choose a retail electric provider in Texas's deregulated ERCOT market",
    notes:
      "Electric design in Killeen separates wires from supply: Oncor owns the distribution system, handles service connections, metering, and outages, while the building owner contracts with a retail electric provider of choice for energy supply. Water, sewer, and solid waste are City of Killeen municipal services billed together through Utility Collections, with the city purchasing treated water sourced from Lake Belton through the Bell County Water Control and Improvement District No. 1 system. Natural gas service is Atmos Energy where piped service exists.",
  },
  climateNotes:
    "ASHRAE climate zone 3A (hot-humid) in Central Texas: long, severe cooling seasons with design temperatures near 100F, hail and severe-thunderstorm exposure, tornado risk, and episodic hard freezes. Blackland Prairie and Edwards-margin soils include expansive clays that drive foundation design, and intense convective rainfall drives drainage design.",
  marketNotes:
    "Killeen exists because of Fort Hood — redesignated Fort Cavazos from 2023 to 2025 — one of the largest U.S. Army installations in the world, with roughly 40,000 soldiers, the III Armored Corps headquarters, and Carl R. Darnall Army Medical Center driving the entire regional economy. Off-post commercial work concentrates in retail, hospitality, medical, and multifamily along the I-14/US-190 corridor serving soldiers, families, retirees, and defense contractors, plus institutional work for Killeen ISD, Central Texas College, Texas A&M University-Central Texas, and AdventHealth Central Texas. Deployment and PCS cycles make military-driven demand the market's defining rhythm.",
  narratives: {
    mep:
      "MEP design in Killeen follows the 2021 I-codes with the 2020 NEC under Ordinance 22-004, in ASHRAE zone 3A where cooling capacity and hail-resilient rooftop equipment dominate. Electric service design runs through Oncor for delivery and connection while the owner selects a retail provider for supply — a split commercial teams from regulated markets routinely mishandle at service application. Contractors must be registered with the city, and the division's move toward the 2024 codes targeted for January 1, 2026 makes the permit date an MEP design input.",
    structural:
      "Structural design in Killeen is governed by expansive Central Texas clays: foundation systems follow the geotechnical report with drilled piers or post-tension slabs to ride seasonal moisture movement, under the 2021 IBC's wind, hail, and severe-thunderstorm provisions. Killeen adds a local control most cities lack — a surveyor-sealed form placement verification under Section 8-32 must be approved for new buildings and additions — and structural and foundation repairs expressly require permits under Chapter 8.",
    civil:
      "Civil design in Killeen consolidates utilities inside city hall: water, sewer, and solid waste are all City of Killeen services billed together, with treated water sourced from Lake Belton via Bell County WCID No. 1, while electric coordination goes to Oncor. Site design must manage intense convective storm rainfall on clay soils with poor natural drainage, and land disturbance work coordinates with the city's Engineering Division separately from the building permit.",
    energy:
      "Energy compliance in Killeen is documented to the 2021 IECC as locally adopted, with Texas state energy requirements through SECO applying to commercial work and COMcheck the standard documentation path. In zone 3A the margin is won on cooling efficiency, envelope solar control, and duct sealing through long 100F summers, balanced against freeze resilience that the February 2021 Uri event made a standing design consideration across Central Texas.",
  },
  faqs: [
    {
      q: "What codes does Killeen enforce?",
      a: "The 2021 International Construction Codes with the 2020 NEC, adopted by Ordinance 22-004 and effective for permits received on or after March 1, 2022, with local amendments in Chapter 8 of the city code. The Building Inspections Division has targeted the 2024 I-codes with the 2023 NEC for January 1, 2026, so confirm the edition for your permit date.",
    },
    {
      q: "Who provides electric, water, and sewer service in Killeen?",
      a: "Oncor Electric Delivery owns the wires and handles connections and outages, with energy supply bought from a retail provider the customer chooses. Water, sewer, and trash are City of Killeen services billed together; the city's treated water is sourced from Lake Belton. Atmos Energy provides natural gas where piped.",
    },
    {
      q: "What is Killeen's form placement verification requirement?",
      a: "For new buildings and additions, Chapter 8 Section 8-32 requires a form placement verification document sealed by a Texas Registered Professional Land Surveyor, submitted for approval to verify building placement — a step that must be scheduled into the foundation sequence.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 52, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.killeentexas.gov/DocumentCenter/View/5467/2021-Code-Significant-Changes-PDF?bidId="],
      codes: ["https://www.killeentexas.gov/DocumentCenter/View/5467/2021-Code-Significant-Changes-PDF?bidId="],
      amendments: ["https://www.killeentexas.gov/DocumentCenter/View/4874/Chapter-8-full-ordinance-PDF"],
      utilities: ["https://brokerfind.hcrealestateservices.com/city-guides/killeen-tx/"],
      climate: ["https://www.killeentexas.gov/DocumentCenter/View/12713/2024-ICC-Code-and-2023-NEC-Code-Adoption-Presentation-Flyer-PDF"],
      market: ["https://brokerfind.hcrealestateservices.com/city-guides/killeen-tx/"],
    },
  },
};
