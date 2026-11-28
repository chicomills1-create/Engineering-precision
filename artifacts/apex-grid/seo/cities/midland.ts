import type { CityData } from "../types";

export const midland: CityData = {
  slug: "midland",
  name: "Midland",
  stateSlug: "texas",
  county: "Midland County",
  ahj: {
    office: "City of Midland Development Services Department — Permitting and Inspections (City Hall, 300 North Loraine Street)",
    process:
      "Midland's Development Services Department takes permit applications as PDF submittals — commercial packages go to the department's commercial permits intake — with 25% of the permit fee due at submission, in person or through the city's web payment link. Plan review and staged inspections follow, and only the property owner or the owner's licensed and bonded contractor can pull the permit. The first question on any fringe project is jurisdictional: confirm whether the parcel sits inside city limits or in Midland's extraterritorial jurisdiction before filing, because Midland County itself issues no general building permits.",
  },
  codes: {
    building: "2018 International Building Code (City of Midland adopted codes, effective July 1, 2019)",
    energy: "2015 International Energy Conservation Code; Texas state energy requirements administered through SECO also apply to commercial work",
    amendments:
      "Midland's local amendments live in Title IV, Chapter 4-1 of the City Code: contractors must post a $10,000 bond approved by the City Attorney, a fence permit is required for front- and street-side-yard fences, accessibility design is tied to the Texas Accessibility Standards, and the adopted residential design table sets Midland-specific criteria — 115 mph basic wind speed, 3.5 psf ground snow load, seismic design category A, 12-inch frost line, 21°F winter and 103°F summer design temperatures at 2,851 feet elevation. The code set is a deliberate split: 2018 IBC/IRC/IMC/IPC, 2015 IECC and IFC, and the much newer 2023 NEC.",
  },
  utilities: {
    electric: "Oncor Electric Delivery — transmission and distribution in the ERCOT competitive market; retail supply is chosen by the customer",
    notes:
      "Midland sits in ERCOT's deregulated market: Oncor owns the wires, meters, and outage response, while the owner picks a retail electric provider — so new commercial service, capacity, and transformer work are engineered with Oncor regardless of who sells the power. Atmos Energy (West Texas Division) is the natural gas utility. Water and wastewater are City of Midland utilities, which keeps tap, capacity, and utility-billing questions inside city hall and makes the city a required early stop on any site with new or upsized water and sewer demand.",
  },
  climateNotes:
    "ASHRAE climate zone 3B (hot-dry) on the southern Llano Estacado at 2,851 feet: the city's own adopted design table sets a 103°F summer design temperature and 21°F winter design temperature, 115 mph wind, minimal snow (3.5 psf), and seismic design category A. Extreme heat, dust, high solar gain, and scarce water — not cold or seismicity — drive envelope, cooling, and site design.",
  marketNotes:
    "Midland is the headquarters city of the Permian Basin, the most productive oil field in the United States: Diamondback Energy, Permian Resources, Viper Energy, and ProPetro are headquartered downtown, ExxonMobil's Permian operations (through the Pioneer acquisition) and Chevron run major Midland offices, and hundreds of oilfield-service firms fill the industrial corridors. Construction demand tracks the drilling cycle — operator offices and training centers, industrial and service yards, hotels and multifamily for a relocating workforce, and Midland Memorial Hospital and Texas Tech Health Sciences Center expansions on the institutional side.",
  narratives: {
    mep:
      "MEP design in Midland works to a split-edition code set that catches out-of-town teams: 2018 IMC and IPC, the 2015 IECC for energy, but the 2023 NEC for electrical — the electrical design must be considerably more current than the mechanical one. Electric service is engineered with Oncor in the ERCOT choice market, gas with Atmos Energy, and in zone 3B the mechanical design is a cooling problem first: 103°F design temperatures, dust filtration for rooftop equipment, and water-conscious cooling choices in a city where water is a planned resource.",
    structural:
      "Structural design in Midland is governed by the 2018 IBC with the city's published criteria — 115 mph wind, seismic design category A, 12-inch frost depth — over Permian Basin soils where caliche layers and collapsible or expansive pockets make the geotechnical report the controlling document for foundations. Wind uplift on large low-slope industrial and warehouse roofs, and equipment loads for oilfield facilities, outweigh seismic demand in almost every design, though induced seismicity in the Midland Basin is a monitored regional issue for critical facilities.",
    civil:
      "Civil design in Midland is drainage in a desert: flat Llano Estacado terrain, playa lakes, and intense short-duration storms mean detention and finished-floor elevation carry the design, and projects must first confirm whether they sit in city limits or the ETJ because the county issues no building permits. City of Midland water and wastewater are the serving utilities, and oilfield-adjacent industrial sites add heavy-haul pavement sections, produced-water considerations, and wide turning geometry for service rigs and frac fleets.",
    energy:
      "Energy compliance in Midland is documented to the 2015 IECC — older than the state's current baseline editions — alongside Texas state energy requirements, so confirm the applicable path with Development Services rather than assuming a newer IECC. In zone 3B, compliance is won on cooling efficiency, roof solar reflectance, and envelope control of solar gain; the gap between the 2015 energy code and the 2023 NEC means the electrical and energy narratives of a Midland set routinely cite different code generations.",
  },
  faqs: [
    {
      q: "What building codes does Midland, TX enforce?",
      a: "A split set adopted effective July 1, 2019: the 2018 IBC, IRC, IMC, and IPC; the 2015 IECC and IFC; and the 2023 NEC. Local amendments are in Title IV, Chapter 4-1 of the City Code, including a $10,000 contractor bond requirement.",
    },
    {
      q: "Who provides electric service in Midland?",
      a: "Oncor Electric Delivery owns the wires and meters in ERCOT's competitive market — building owners choose a retail electric provider, but new service and capacity work is coordinated with Oncor. Atmos Energy provides natural gas, and the City of Midland provides water and sewer.",
    },
    {
      q: "Does Midland County issue building permits?",
      a: "No. Midland County has no general building permit program for unincorporated areas. Projects inside Midland city limits — and some obligations in the city's extraterritorial jurisdiction — run through the City of Midland Development Services Department, so jurisdiction is the first check on any fringe parcel.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 52, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.MIDLANDTEXAS.GOV/1269/Building-Permits"],
      codes: ["https://www.midlandtexas.gov/DocumentCenter/View/4816/Current-Building-Codes-List"],
      amendments: ["https://corpuslaw.us/city/TX-MIDLAND/ordinances/4-1-3-changes-and-additions-to-adopted-building"],
      utilities: ["https://www.utilityprovidercheck.com/cities/midland-tx-utility-providers/"],
      climate: ["https://www.weather.gov/maf/"],
      market: ["https://beta.bebop.ai/markets/oil-and-gas-companies-midland"],
    },
  },
};
