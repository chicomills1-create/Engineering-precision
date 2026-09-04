import type { CityData } from "../types";

export const baltimore: CityData = {
  slug: "baltimore",
  name: "Baltimore",
  stateSlug: "maryland",
  county: "Baltimore City",
  ahj: {
    office: "Baltimore City Department of Housing & Community Development (DHCD), Office of Permits and Building Inspections",
    process: "Baltimore accepts permit applications and electronic plans through the ePermits system, with DHCD coordinating building review and routing projects to zoning, fire, health, public works, and other agencies when applicable. Applicants can use pre-development meetings for complex projects; historic districts, waterfront work, and public-right-of-way improvements carry parallel approvals.",
  },
  codes: {
    building: "Baltimore City Building, Fire and Related Codes, based on the 2021 International Building Code with Baltimore City amendments",
    energy: "2021 International Energy Conservation Code (IECC), as adopted in the Baltimore City Building, Fire and Related Codes",
    amendments: "Baltimore's local code amendments supplement Maryland's Building Performance Standards and are administered through the City Code. The city's existing-building energy rules, including the Building Energy Performance Standard (BEPS) for covered buildings, are separate continuing obligations rather than a substitute for permit-time energy compliance.",
  },
  utilities: {
    electric: "Baltimore Gas and Electric (BGE)",
    notes: "BGE handles electric new service and generation interconnection; gas availability and electrical capacity should be confirmed for electrification or lab and healthcare loads. Baltimore City Department of Public Works supplies water and operates sewer and stormwater systems, with utility work in dense streets requiring city coordination.",
  },
  climateNotes: "Baltimore is a humid mixed 4A market: hot, humid summers require deliberate latent-load control and winters still impose heating and freeze-protection loads. Harbor and low-lying parcels add tidal flooding, storm surge, and sea-level-rise resilience concerns; soft Coastal Plain and urban fill conditions are common.",
  marketNotes: "Baltimore's active sectors include Johns Hopkins–related healthcare and research, university and institutional modernization, Port of Baltimore logistics and industrial facilities, multifamily redevelopment, and adaptive reuse of historic warehouse and masonry stock. Those sectors repeatedly combine occupied construction, constrained utilities, environmental remediation, and existing-building analysis.",
  narratives: {
    mep: "Baltimore MEP work has to control humidity as deliberately as temperature in a 4A climate, particularly for healthcare, research, and adaptive-reuse projects with limited shaft and plant space. We document the 2021 IECC package for DHCD while coordinating electric capacity and interconnection with BGE and water/sewer with DPW. For a covered building, equipment replacement also deserves a BEPS emissions trajectory check, because a permit-compliant plant is not necessarily a durable operational-carbon strategy.",
    structural: "Baltimore structural design often starts with the building that is already there: historic masonry, timber, early steel, rooftop additions, and changing occupancy loads need field verification and an existing-building-code path before strengthening is scoped. New and waterfront work also responds to soft Coastal Plain deposits, fill, high groundwater, tidal flood elevation, and hurricane-remnant wind rather than high seismic demand. We coordinate excavation support, adjacent foundations, and special inspections around DHCD's ePermits review.",
    civil: "Baltimore civil design must make urban drainage, combined infrastructure, and harbor resilience work on tight parcels. DPW water, sewer, and stormwater review is coordinated with grading and utility conflicts, while Maryland environmental site design and erosion-and-sediment-control requirements drive treatment from early layout. Waterfront and low-lying sites require flood and tidal-resilience analysis; brownfield redevelopment and right-of-way work can add environmental and agency approvals beyond the building permit.",
    energy: "Baltimore commercial permits use the locally adopted 2021 IECC, but energy planning should not stop at the plan-check forms. In mixed-humid 4A, continuous insulation, air sealing, solar control, energy recovery, and dehumidification-aware heat-pump selection need to operate together. Baltimore's BEPS applies to covered buildings over time, so we model electrification and envelope decisions against both the permit path and the building's future emissions limits, then coordinate electrical implications with BGE early.",
  },
  faqs: [
    { q: "Which office issues commercial building permits in Baltimore?", a: "Baltimore City DHCD's Office of Permits and Building Inspections administers building permits through ePermits and coordinates the required reviews. Zoning, fire, DPW, historic-district, waterfront, and right-of-way approvals may run alongside the building review depending on the site and scope." },
    { q: "What energy code applies to Baltimore commercial projects?", a: "Baltimore enforces the 2021 IECC through its Building, Fire and Related Codes. Covered larger buildings may also face Baltimore's Building Energy Performance Standard after occupancy, which is an operational-emissions obligation in addition to permit-time energy-code documentation." },
    { q: "Why are Baltimore waterfront and reuse projects different?", a: "Harbor and low-lying sites need tidal-flood and storm-surge resilience analysis, while many reuse projects involve historic masonry, timber, early steel, urban fill, and constrained utilities. Existing-condition investigation, flood elevation, excavation support, and DPW utility coordination can govern the design sequence." },
  ],
};