import type { CityData } from "../types";

export const carrollton: CityData = {
  slug: "carrollton",
  name: "Carrollton",
  stateSlug: "texas",
  county: "Dallas County",
  ahj: {
    office: "City of Carrollton Building Inspection Division, Development Services (City Hall, 1945 East Jackson Road)",
    process:
      "Carrollton takes building permit applications online through the CityServe Portal, and its published review clocks are explicit: 15 business days for the first round of review and 5 business days for revisions. Applicants may file with complete civil drawings, civil plus landscape, or the full construction set, and the city offers pre-development meetings that walk the Building Inspection, Planning, Fire, and Landscape requirements in one sitting. The submittal must include 2024 IECC COMcheck documentation for envelope, exterior and interior lighting, and mechanical systems, plus the project's TDLR Texas Architectural Barriers registration number. Inspections are requested through the portal — book before 7 a.m. for a same-day visit, with no Friday afternoon inspections.",
  },
  codes: {
    building: "2024 International Building Code with North Central Texas Council of Governments (COG) local amendments (Ordinances 4265 and 4290, effective September 1, 2025)",
    energy: "2024 International Energy Conservation Code with local amendments; Texas state energy requirements also apply",
    amendments:
      "Carrollton's amendments are specific and consequential: every foundation and footing must be designed and sealed by a Texas-registered engineer (an amendment to IRC R401.2 driven by local expansive soils), detached accessory buildings need a permit at 120 square feet instead of the model code's 200, structures spanning more than 24 feet need an engineer's seal, and the Fire Code amendment requires full sprinklering of new buildings — or additions that push an existing building over 6,000 square feet. Published design criteria set 105 mph ultimate wind speed at Exposure C, 8 psf ground snow, seismic category A, and a 6-inch frost line.",
  },
  utilities: {
    electric: "Oncor Electric Delivery — transmission and distribution in the ERCOT competitive market; retail supply is chosen by the customer",
    notes:
      "Carrollton is ERCOT choice territory: Oncor owns the wires and meters and handles outages, owners select a retail electric provider, and new commercial service capacity is engineered with Oncor. Atmos Energy (Mid-Tex Division) is the natural gas utility. Water, wastewater, and trash/recycling all run through the City of Carrollton on a single utility account — one stop for taps and capacity — which simplifies utility coordination relative to the special-district patchwork found elsewhere in DFW. Northern Carrollton extends into Denton County (the Castle Hills area), where jurisdiction and utility details should be confirmed parcel by parcel.",
  },
  climateNotes:
    "ASHRAE climate zone 3A (hot-humid) in North Texas: the city's published criteria set a 105 mph design wind speed, 22°F winter design temperature, and a 6-inch frost line. The defining ground condition is expansive Blackland Prairie clay — the reason Carrollton requires every foundation to be engineer-sealed — alongside hail exposure, severe thunderstorms, and long cooling seasons.",
  marketNotes:
    "Carrollton is a built-out, edge-to-edge first-ring Dallas suburb whose work is redevelopment and tenant turnover: two DART Green Line stations (Downtown Carrollton and Trinity Mills) anchor transit-oriented districts, the I-35E and President George Bush Turnpike corridors carry logistics, flex-industrial, and medical stock, and FASTSIGNS International and BuzzBallz are among the companies headquartered in the city. Castle Hills, the large master-planned community in the Denton County portion, continues phased build-out, while the mature interior generates steady restaurant, retail, office, and multifamily renovation volume.",
  narratives: {
    mep:
      "MEP design in Carrollton is documented to the newest code set in this part of DFW — the 2024 I-codes with COG amendments and the 2023 NEC, effective September 1, 2025 — so a set carried over from a neighboring city's 2021 cycle will draw corrections. Energy submittals require COMcheck documentation for envelope, lighting, and mechanical systems with the construction documents, and TDLR barrier registration is part of the package. Electric service is engineered with Oncor in the choice market and gas with Atmos, while city water and sewer keep the wet-utility coordination inside city hall.",
    structural:
      "Carrollton structural design starts underground: expansive Blackland Prairie clay is so determinative that the city amended the code to require every foundation and footing to be designed and sealed by a Texas-registered engineer — there is no prescriptive foundation path. Above grade, the 2024 IBC with published criteria (105 mph wind, seismic category A) governs, and the local fire amendment sprinklers new buildings and additions crossing 6,000 square feet, which feeds back into water-service sizing and structural coordination for standpipes and fire pumps on larger projects.",
    civil:
      "Civil design in Carrollton is infill engineering in a fully built city: drainage ties into established systems draining toward the Elm Fork of the Trinity River, detention and water-quality requirements apply on redevelopment sites, and the city accepts phased submittals — civil first, or civil with landscape — ahead of the full architectural set. DART station-area projects add streetscape and form-based standards, and Castle Hills parcels in Denton County need an early jurisdiction check because county and utility details differ from the Dallas County core.",
    energy:
      "Energy compliance in Carrollton follows the 2024 IECC with local amendments, and the city names its deliverable: COMcheck reports for the envelope, exterior lighting, interior lighting, and mechanical systems are required with the construction documents. In zone 3A the compliance margin is decided by cooling efficiency, duct design, and lighting controls, and Texas state energy requirements layer on top of the local adoption for commercial work.",
  },
  faqs: [
    {
      q: "What building codes does Carrollton, TX enforce?",
      a: "The 2024 International codes — IBC, IRC, plumbing, mechanical, and energy conservation — plus the 2023 NEC, with North Central Texas COG local amendments under Ordinances 4265 and 4290, effective September 1, 2025. That is a newer cycle than most DFW neighbors.",
    },
    {
      q: "Does Carrollton require an engineer to design foundations?",
      a: "Yes — for every foundation. A local amendment to IRC Section R401.2 requires every foundation and footing to be designed and sealed by a Texas-registered engineer, a response to the area's expansive clay soils. Structures spanning more than 24 feet also require an engineer's seal.",
    },
    {
      q: "How long does plan review take in Carrollton?",
      a: "The city's published turnaround is 15 business days for the first round of review and 5 business days for revisions. Applications are filed online through the CityServe Portal, and inspections booked before 7 a.m. are performed the same day.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 49, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.cityofcarrollton.com/home/showpublisheddocument/41677"],
      codes: ["https://www.cityofcarrollton.com/home/showpublisheddocument/41677"],
      amendments: ["https://www.texasbarndominiumbuilders.co/areas/carrollton/"],
      utilities: ["https://www.utilityprovidercheck.com/cities/carrollton-tx-utility-providers/"],
      climate: ["https://www.weather.gov/fwd/"],
      market: ["https://www.masacogroup.com/service-areas/carrollton-tx/"],
    },
  },
};
