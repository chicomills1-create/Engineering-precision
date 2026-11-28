import type { CityData } from "../types";

export const maconBibbCounty: CityData = {
  slug: "macon-bibb-county",
  name: "Macon-Bibb County",
  stateSlug: "georgia",
  county: "Bibb County",
  ahj: {
    office: "Macon-Bibb County Business Development Services — Building and Fire Safety Department (permitting at 3661 Eisenhower Parkway)",
    process:
      "Macon-Bibb is a consolidated city-county government, so one permitting authority covers the whole county. Building permit applications run through the Community Connect online portal, and the contractor's account must be created by the Georgia license holder so permits issue only to that license holder. A separate zoning compliance approval from the Macon-Bibb County Planning and Zoning Commission — filed through its own Clariti system — is required for all construction and every new business, so the two approvals proceed as parallel tracks before the building permit can fully clear.",
  },
  codes: {
    building: "2018 International Building Code, as amended by the State of Georgia (Georgia State Minimum Standard Codes, enforced by Macon-Bibb effective January 1, 2020)",
    energy: "2015 International Energy Conservation Code, as amended by the State of Georgia (per Macon-Bibb's published construction code adoption)",
    amendments:
      "Georgia amends the state minimum standard codes through the Department of Community Affairs, and Macon-Bibb enforces those Georgia amendments with the base codes — including the 2017 NEC as locally listed. Locally, Macon-Bibb's Code of Ordinances adopts the National Green Building Standard only as an optional, non-mandatory standard for residential dwellings (Section 6-2(c)), and the Planning and Zoning Commission's Land Development Resolution adds site standards the state codes do not carry.",
  },
  utilities: {
    electric: "Georgia Power (investor-owned electric service across Macon-Bibb County)",
    notes:
      "Georgia Power supplies electricity across Macon-Bibb, so new commercial services and interconnections follow Georgia Power's service and interconnection process. Water, sewer, and stormwater are consolidated under the Macon Water Authority — an independent authority, not a county department — which runs the county's water treatment and wastewater systems, so utility taps, capacity, and sewer availability are coordinated with MWA separately from the county permit. Natural gas is supplied by Atlanta Gas Light's system.",
  },
  climateNotes:
    "ASHRAE climate zone 3A (warm-humid) in central Georgia: long, hot, humid summers drive cooling-dominated design, mild winters keep heating loads modest, and severe thunderstorms and tornado exposure shape wind design. The Ocmulgee River and its tributaries put meaningful parts of the county in mapped floodplain, making flood elevation a routine site-design check.",
  marketNotes:
    "Macon-Bibb's construction market is anchored by healthcare and education: Atrium Health Navicent (the region's trauma center), Mercer University, and Middle Georgia State University, with Robins Air Force Base just south in Warner Robins driving regional demand. GEICO's large Macon operation, YKK's fastening-products plant, Graphic Packaging, and Irving Consumer Products anchor manufacturing, while downtown and Ocmulgee Riverfront revitalization and I-75/I-16 interchange logistics generate steady commercial and industrial work.",
  narratives: {
    mep:
      "MEP design in Macon-Bibb is documented to Georgia's state minimum standard codes as the county publishes them — the 2018 I-codes with the 2017 NEC and the 2015 IECC with Georgia amendments. Building permits file through Community Connect under the license holder's own account, while zoning compliance clears separately through Planning and Zoning. Georgia Power is the electric utility and the Macon Water Authority controls water and sewer, and in climate zone 3A the mechanical design battle is humidity: latent loads, ventilation dehumidification, and condensate management dominate.",
    structural:
      "Structural design in Macon-Bibb follows the 2018 IBC with Georgia amendments. Wind design carries central Georgia's severe thunderstorm and tornado exposure, seismic demand is low, and the governing site issue is often water — Ocmulgee River and tributary floodplains cross the county, so finished-floor elevation and flood openings enter the structural conversation early. Much of the work is renovation of a mature stock of masonry commercial and institutional buildings downtown and around the medical center.",
    civil:
      "Civil design in Macon-Bibb coordinates two separate authorities: the consolidated county for permitting and site approvals through Planning and Zoning's Land Development Resolution, and the independent Macon Water Authority for water, sewer, and stormwater. Sites draining toward the Ocmulgee River need floodplain verification, and Georgia's red clay and rolling Piedmont-to-Coastal-Plain transition terrain make erosion control and detention design central to plan review.",
    energy:
      "Energy compliance in Macon-Bibb is documented to the 2015 IECC as amended by the State of Georgia — an older energy code than neighboring states enforce, so compliance margins differ from what regional teams may assume. In zone 3A the model is won on cooling efficiency, duct sealing, and latent control. Macon-Bibb's green building standard is expressly optional for residential work under Section 6-2(c), so above-code performance is a market decision, not a permit requirement.",
  },
  faqs: [
    {
      q: "Who issues building permits in Macon-Bibb County, GA?",
      a: "The Macon-Bibb County Business Development Services / Building and Fire Safety Department, for the entire consolidated city-county. Applications run through the Community Connect portal, and the contractor account must be set up by the Georgia license holder. Zoning compliance is separate, through the Macon-Bibb Planning and Zoning Commission.",
    },
    {
      q: "What building codes does Macon-Bibb County enforce?",
      a: "The Georgia State Minimum Standard Codes as published by the county, effective January 1, 2020: the 2018 IBC, IFC, IFGC, IMC, IPC, IRC and ISPSC, the 2017 NEC, and the 2015 IECC — each as amended by the State of Georgia.",
    },
    {
      q: "Who provides water and electric service in Macon, GA?",
      a: "Electricity comes from Georgia Power. Water, sewer, and stormwater are provided by the Macon Water Authority, an independent authority separate from the county government, so taps and capacity are coordinated with MWA in addition to the county building permit.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 53, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://maconbibb.us/wp-content/uploads/2019/12/Macon-Bibb_County_Construction_Code_Adoption_-_Jan_2020-2.pdf"],
      codes: ["https://maconbibb.us/wp-content/uploads/2019/12/Macon-Bibb_County_Construction_Code_Adoption_-_Jan_2020-2.pdf"],
      amendments: ["https://maconbibb.us/wp-content/uploads/2019/12/Macon-Bibb_County_Construction_Code_Adoption_-_Jan_2020-2.pdf"],
      utilities: ["https://www.georgiapower.com", "https://www.maconwater.org"],
      climate: ["https://www.weather.gov/ffc/"],
      market: ["https://www.maconbibb.us"],
    },
  },
};
