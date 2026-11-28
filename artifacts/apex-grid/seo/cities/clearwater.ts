import type { CityData } from "../types";

export const clearwater: CityData = {
  slug: "clearwater",
  name: "Clearwater",
  stateSlug: "florida",
  county: "Pinellas County",
  ahj: {
    office: "City of Clearwater Planning & Development Department, Construction Services Division (Municipal Services Building, 100 S. Myrtle Avenue)",
    process:
      "Clearwater's Construction Services Division runs permitting end to end through the city's ePermit system on the Accela Citizen Access platform: applications, digital plan review, fee payment, and records all live in the portal, and the city publishes training for its digital plan review process and a permit fee estimator. Filing under the wrong record type is a rejection, not a correction — the application is closed and refiled — so record selection at intake matters. Inspections are scheduled online, through the 24-hour line, or by texting SCHEDULE to (888) 691-4479 by midnight for the next business day, and Florida-licensed private providers may be registered for plan review and inspections as an alternative track.",
  },
  codes: {
    building: "Florida Building Code, 8th Edition (2023), Building — the statewide code based on the 2021 IBC with Florida amendments, enforced by the City of Clearwater",
    energy: "Florida Building Code, 8th Edition (2023), Energy Conservation",
    amendments:
      "Florida law sharply limits local technical amendments to the Florida Building Code, so Clearwater's design-shaping layer sits in its floodplain and development rules: the city builds on the August 2021 FEMA flood maps and requires the lowest floor of buildings in flood zones at least 2 feet above base flood elevation, the 50-percent substantial-improvement rule brings older buildings up to current flood standards, and the Community Development Code governs height (measured from base flood elevation in flood zones), setbacks, and coastal construction. Florida product approvals must be documented in the submittal for components and cladding throughout the wind-borne debris region.",
  },
  utilities: {
    electric: "Duke Energy Florida (30-year franchise agreement with the City of Clearwater renewed in 2026); natural gas from CGS Energy, the city-owned Clearwater Gas System",
    notes:
      "Duke Energy Florida delivers electricity across Clearwater, so new commercial services and capacity run through Duke's service process — and in a hurricane market, service restoration priority and undergrounding programs are part of the conversation. Unusually, the gas utility is the city itself: CGS Energy (Clearwater Gas System) is a city-owned gas utility serving north Pinellas and beyond. Water and sewer are also City of Clearwater utilities billed through city utility customer service, consolidating water, sewer, and gas coordination inside city government, while unincorporated enclaves fall to Pinellas County Utilities.",
  },
  climateNotes:
    "ASHRAE/IECC climate zone 2A (hot-humid) on Florida's central Gulf coast: the FBC wind map puts Pinellas County between the 140 and 150 mph ultimate design wind speed lines for Risk Category II, inside the wind-borne debris region, and storm surge — not wind — is the catastrophic hazard, as Hurricane Helene's record 6.67-foot surge at Clearwater Beach in September 2024 demonstrated. Cooling and latent (dehumidification) loads run nearly year-round, and the May-to-October rainy season concentrates most of the year's roughly 47 inches of rain.",
  marketNotes:
    "Clearwater's commercial market runs on hospitality, health care, and marine industry: Clearwater Beach is one of the Gulf's top tourist beaches, driving continuous hotel, resort, and restaurant construction and renovation; Morton Plant Hospital anchors a large medical sector; MarineMax, the world's largest recreational boat retailer, is headquartered here; and Honeywell's Clearwater campus builds aerospace guidance systems while the TD SYNNEX campus continues the city's long tech-distribution presence. Downtown, the city-led Imagine Clearwater redevelopment around Coachman Park and The Sound amphitheater is generating civic, mixed-use, and waterfront work.",
  narratives: {
    mep:
      "MEP design in Clearwater is documented to the Florida Building Code, 8th Edition (2023), with Florida product approvals filed in the submittal for the envelope components the mechanical and electrical designs depend on. Electric service runs through Duke Energy Florida while gas, water, and sewer are city utilities — CGS Energy is one of Florida's few municipal gas systems — so utility coordination splits between a regional investor-owned utility and city hall. In zone 2A, latent load control and corrosion protection for coastal air are design drivers on every system, and hospitality work adds kitchen, laundry, and pool loads that dominate service sizing.",
    structural:
      "Clearwater structural design is hurricane engineering: FBC ultimate design wind speeds of 140–150 mph for ordinary Risk Category II buildings, wind-borne debris protection across the county, and component-and-cladding pressures that govern storefront, roofing, and equipment anchorage. Flood design is the second discipline — lowest floors at least 2 feet above base flood elevation under the city's freeboard rule, breakaway and flood-vent detailing in coastal zones, and the 50-percent rule forcing substantial-improvement projects in the beach and bayfront stock up to current standards.",
    civil:
      "Civil design in Clearwater starts with surge and drainage: FEMA flood zones (August 2021 maps), Pinellas County evacuation zones, and the city's freeboard requirement set finished floors before site layout begins, and stormwater must be retained and treated under Florida's water-management rules in a city where the rainy season delivers most of the annual rainfall in five months. Much of the work is redevelopment of beach, downtown, and US-19 corridor parcels, where utility verification — city water and sewer, Duke Energy electric, and city gas — and existing-condition documentation carry the schedule risk.",
    energy:
      "Energy compliance in Clearwater is documented to the Florida Building Code, Energy Conservation, 8th Edition (2023), by the prescriptive path or performance modeling, with the compliance documentation filed in the ePermit digital plan review. In zone 2A the margin is decided by cooling efficiency, latent-load control, and envelope solar gain — west-facing glass on beach and bayfront projects is the recurring failure point — and Duke Energy Florida's commercial programs layer incentives on top of code for high-efficiency equipment.",
  },
  faqs: [
    {
      q: "What building code does Clearwater, FL enforce?",
      a: "The Florida Building Code, 8th Edition (2023) — the statewide code based on the 2021 IBC with Florida amendments — including its Energy Conservation volume. Permits are filed through the city's ePermit (Accela) portal, and Florida product approvals are required for envelope components in the wind-borne debris region.",
    },
    {
      q: "How much freeboard does Clearwater require above the base flood elevation?",
      a: "Two feet. Clearwater builds on the August 2021 FEMA flood maps and requires the lowest floor of buildings in flood zones at least 2 feet above base flood elevation, and repairs or improvements reaching 50 percent of a flood-zone building's market value trigger compliance with current flood rules.",
    },
    {
      q: "Who provides electric, gas, water, and sewer service in Clearwater?",
      a: "Duke Energy Florida provides electricity under a franchise with the city. Natural gas comes from CGS Energy — the Clearwater Gas System, a city-owned utility — and water and sewer are also City of Clearwater utilities, so gas, water, and sewer coordination all run through city government.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 44, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://alliancepermitting.com/guides/florida/clearwater-building-permit"],
      codes: ["https://www.myclearwater.com/Business-Development/Permits-and-Inspections/Get-a-Permit"],
      amendments: ["https://www.enschoutdoorliving.com/florida/clearwater/"],
      utilities: ["https://legistar2.granicus.com/clearwater/attachments/ea98a116-5613-44d3-ac77-b721cc678c0e.pdf"],
      climate: ["https://pinellas.gov/wp-content/uploads/2022/06/2022_All_Hazards_Guide_English_Text-Only.pdf"],
      market: ["https://www.enschoutdoorliving.com/florida/clearwater/"],
    },
  },
};
