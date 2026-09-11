import type { CityData } from "../types";

export const wilmingtonDelaware: CityData = {
  slug: "wilmington", name: "Wilmington", stateSlug: "delaware", county: "New Castle County",
  ahj: {
    office: "City of Wilmington Department of Licenses and Inspections",
    process: "Commercial permit applications are routed through Wilmington's permit and plan-review process, with building, zoning, fire, accessibility, and trade reviews coordinated as applicable. New Castle County and Delaware State Fire Marshal reviews can be separate from the City permit, so the parcel and occupancy should be confirmed with each reviewing authority before submission.",
  },
  codes: {
    building: "2018 International Building Code with City of Wilmington amendments",
    energy: "2018 IECC / ASHRAE 90.1-2016 under Delaware's statewide commercial energy code",
    amendments: "Wilmington's zoning, flood-damage-prevention, stormwater, historic-district, and public-works requirements supplement the locally adopted IBC. State Fire Marshal life-safety review may add a separate approval path for commercial work.",
  },
  utilities: {
    electric: "Delmarva Power",
    notes: "Delmarva Power coordinates commercial service, transformer capacity, demand, and interconnection. Artesian Water supplies much of the city water system and New Castle County provides wastewater services; available capacity, fire flow, and connection conditions are site-specific.",
  },
  climateNotes: "Wilmington is a humid 4A climate with hot summers, winter heating, intense rainfall, and occasional coastal flooding along the Christina and Delaware rivers. Soft Coastal Plain soils, high groundwater, freeze-thaw, and moderate snow require early geotechnical and drainage coordination.",
  marketNotes: "The city market combines financial and corporate offices, healthcare, higher education, government, adaptive reuse, and residential-to-mixed-use redevelopment. Riverfront and I-95 corridor investment keeps utility, flood, transportation, and constrained urban-site coordination important.",
  narratives: {
    mep: "Wilmington MEP design balances humid 4A cooling and dehumidification with winter heating and older urban-building constraints. We coordinate Delmarva Power service and demand assumptions, Artesian water and New Castle County sewer connections, fire-flow needs, and equipment access before finalizing plant rooms. City permit review, State Fire Marshal life-safety review, and the statewide 2018 IECC/ASHRAE 90.1 path should be carried together in the design package.",
    structural: "Wilmington structural design addresses low-to-moderate seismic demand, coastal-plain soils, river flooding, wind, and freeze-thaw rather than mountain snow. Geotechnical information may drive settlement mitigation, deep foundations, or dewatering, while flood elevations and corrosion protection affect riverfront work. Existing masonry and mill buildings also require careful investigation before adding new occupancy or vertical loads.",
    civil: "Urban Wilmington civil work must reconcile tight parcels, aging utilities, impervious-area limits, and stormwater requirements with New Castle County and City review. River and creek floodplains, high groundwater, and clayey or fill soils can limit infiltration and alter finished-floor and outfall decisions. We coordinate grading, erosion control, fire access, Delmarva/Artesian service, and sewer capacity before committing the site layout.",
    energy: "Commercial projects use Delaware's statewide 2018 IECC or ASHRAE 90.1-2016 path, documented with COMcheck or modeling, while Wilmington reviews local building and site requirements separately. In 4A, air sealing, solar control, efficient cooling, dehumidification, heat recovery, and lighting controls must work together. Delmarva demand and Energize Delaware opportunities should be tested against the modeled load rather than assumed.",
  },
  faqs: [
    { q: "Who reviews a commercial permit in Wilmington, Delaware?", a: "The City of Wilmington Department of Licenses and Inspections is the primary municipal building authority, but zoning, fire, flood, utilities, New Castle County, and State Fire Marshal reviews may be separate. Confirm the parcel's exact review path before filing." },
    { q: "What energy code applies to Wilmington commercial work?", a: "Delaware's statewide commercial energy code is based on the 2018 IECC with ASHRAE 90.1-2016 as an alternative path. The building code and local site requirements remain jurisdiction-specific." },
    { q: "What site issues are common in Wilmington?", a: "River flooding, high groundwater, soft or filled Coastal Plain soils, aging utilities, and constrained urban drainage are common early design issues. Geotechnical findings and City/County stormwater criteria can change foundations, grading, and finished elevations." },
  ],
  research: { lastVerified: "2026-09-11", reviewStatus: "approved", reviewedBy: "Apex Grid evidence review", supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-code-compliance"], priority: { commercialOpportunity: 78, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" }, sources: { ahj: ["https://www.wilmingtonde.gov/government/city-departments/licenses-inspections"], codes: ["https://www.wilmingtonde.gov/government/city-departments/licenses-inspections"], amendments: ["https://www.wilmingtonde.gov/government/city-departments/planning-development"], utilities: ["https://www.delmarva.com/Business", "https://www.artesianwater.com/", "https://www.nccde.org/"], climate: ["https://www.weather.gov/phi/"], market: ["https://www.wilmingtonde.gov/government/city-departments/economic-development"] } },
};