import type { CityData } from "../types";

export const alexandria: CityData = {
  slug: "alexandria",
  name: "Alexandria",
  stateSlug: "virginia",
  county: "Independent City (no county)",
  ahj: {
    office: "City of Alexandria Department of Code Administration — Alexandria Permit Center",
    process:
      "Alexandria's Department of Code Administration runs all building permits through the APEX (Alexandria Permit and Land Use Management System) online portal and the Permit Center at 4850 Mark Center Drive, with plan review, inspections, and certificates handled by Code Administration and Fire Department reviewers in the same system. The fee structure is published by council resolution and layers an administrative fee, permit center fee, IT fee, and the state training levy on top of base permit fees — budget roughly 30 percent in surcharges over base fees. Two local gates survive Virginia's statewide code preemption: Board of Architectural Review approval for exterior work in the Old and Historic and Parker-Gray districts, and floodplain review along the Potomac and its tributaries; confirm the parcel is inside the independent city, since Fairfax County neighborhoods with Alexandria mailing addresses permit through the county instead.",
  },
  codes: {
    building: "2021 Virginia Uniform Statewide Building Code (USBC), based on the 2021 IBC with Virginia amendments, effective statewide January 18, 2024; localities may not amend it (Va. Code Section 36-98)",
    energy: "2021 Virginia Energy Conservation Code (part of the 2021 USBC, based on the 2021 IECC with Virginia amendments); ASHRAE 90.1-2019 is an available alternate commercial compliance path",
    amendments:
      "Virginia law bars local building code amendments, so Alexandria's local layer is administrative and land-use rather than technical: City Code Section 8-1-2 adopts the USBC including future statewide editions, Section 8-1-22 adds a distinctly local permit trigger — replacement windows and more than 100 square feet of replacement siding or roofing on buildings in historic districts or designated buildings over 100 years old require a permit and inspections — and Section 8-1-11 requires at least 24 hours' notice for inspection requests. Historic district review by the Board of Architectural Review and floodplain regulation are exercised under separate state authority, not as code amendments.",
  },
  utilities: {
    electric: "Dominion Energy Virginia provides electric service throughout the City of Alexandria",
    notes:
      "Alexandria operates no municipal utilities, which simplifies coordination to private providers: Dominion Energy for electric service, interconnection, and most street lighting; Virginia American Water for potable water; Washington Gas for natural gas; and AlexRenew for wastewater treatment, with the city owning the sewer collection lines that feed it. New commercial electric service and capacity requests go directly to Dominion Energy Virginia, and water and sewer capacity confirmations split between Virginia American Water and AlexRenew rather than a single city utility desk.",
  },
  climateNotes:
    "ASHRAE climate zone 4A (mixed-humid) on the Potomac River: hot humid summers requiring real latent-load control, cold winters, and hurricane-remnant and nor'easter rainfall. Tidal and riverine flooding along the Potomac, Four Mile Run, and Cameron Run — including chronic Old Town waterfront flooding — is the city's defining design hazard.",
  marketNotes:
    "Alexandria is a federal-economy city inside the Washington metro: the U.S. Patent and Trademark Office headquarters campus at Carlyle, the Department of Defense presence at Mark Center, and the National Science Foundation headquarters anchor office demand, with Inova Alexandria Hospital, the city government, and Alexandria City Public Schools among the largest employers. Commercial work concentrates in federal and association office fit-outs in Carlyle, Eisenhower, and Mark Center, Old Town retail and hospitality in historic structures, Potomac Yard redevelopment, and multifamily across the West End — much of it in existing buildings where historic or floodplain review applies.",
  narratives: {
    mep:
      "MEP design in Alexandria follows the 2021 Virginia USBC — 2021 IMC and IPC with Virginia amendments and the 2020 NEC — so the technical rulebook is identical across Virginia and the local variables are review routing and utilities. Permits run through the APEX portal with Code Administration and Fire reviewers in one system, electric service is Dominion Energy Virginia, gas is Washington Gas, and in mixed-humid zone 4A latent-load control through long shoulder seasons sizes the mechanical design as much as peak cooling.",
    structural:
      "Structural design in Alexandria follows the 2021 IBC as amended by the USBC, with Potomac-side conditions doing the local work: soft riverine soils and high water tables near the waterfront, flood design for parcels along the Potomac, Four Mile Run, and Cameron Run, and a large stock of 18th and 19th century masonry in Old Town evaluated under the existing building provisions. Because Virginia bars local amendments, structural surprises here come from site and existing conditions, not from a local code twist.",
    civil:
      "Civil design in Alexandria is dominated by water: tidal Potomac flooding in Old Town, floodplain regulation along Four Mile Run and Cameron Run, and combined older drainage infrastructure in the historic core. Utility coordination splits three ways — Virginia American Water for water, AlexRenew for wastewater treatment over city-owned collection lines, and Dominion Energy for power — and parcels in the Old and Historic or Parker-Gray districts need Board of Architectural Review clearance for exterior work before the permit path is clear.",
    energy:
      "Energy compliance in Alexandria is documented to the 2021 Virginia Energy Conservation Code inside the USBC — the 2021 IECC with Virginia amendments, which relax certain model provisions such as air leakage — with ASHRAE 90.1-2019 available as the alternate commercial path and COMcheck accepted. Because the code is uniform statewide with no local stretch code, the Alexandria-specific energy work is incentive and program layering for federal, institutional, and Old Town retrofit projects rather than a different compliance target.",
  },
  faqs: [
    {
      q: "What building code does Alexandria, VA enforce?",
      a: "The 2021 Virginia Uniform Statewide Building Code, based on the 2021 IBC with Virginia amendments, effective January 18, 2024. Virginia law prohibits local amendments, so the technical code is the same statewide; Alexandria enforces it through its Department of Code Administration and the APEX permit portal.",
    },
    {
      q: "Who provides utilities in Alexandria, VA?",
      a: "The city operates no utilities. Dominion Energy Virginia provides electricity, Virginia American Water provides drinking water, Washington Gas provides natural gas, and AlexRenew treats wastewater delivered through city-owned sewer lines.",
    },
    {
      q: "What local reviews apply beyond the building permit in Alexandria?",
      a: "Board of Architectural Review approval for exterior work in the Old and Historic and Parker-Gray districts, floodplain review along the Potomac and its tributaries, and a local permit trigger for replacement windows and over 100 square feet of siding or roofing on historic-district or designated 100-year-old buildings (City Code 8-1-22).",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 55, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://alexandriava.gov/sites/default/files/2024-07/fee_schedule_rev_2024_0.pdf"],
      codes: ["https://www.dhcd.virginia.gov/index.php/codes"],
      amendments: ["https://cityrulelookup.com/building-safety/plumbing-permits/alexandria-va"],
      utilities: ["https://www.alexandriava.gov/Utilities"],
      climate: ["https://energycodes.gov/status/states/virginia"],
      market: ["https://www.donnysamsonteam.com/cities/alexandria-real-estate"],
    },
  },
};
