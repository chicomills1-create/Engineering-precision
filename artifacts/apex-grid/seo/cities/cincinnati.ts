import type { CityData } from "../types";

export const cincinnati: CityData = {
  slug: "cincinnati",
  name: "Cincinnati",
  stateSlug: "ohio",
  county: "Hamilton County",
  ahj: {
    office: "City of Cincinnati Buildings and Inspections Department",
    process: "The Buildings and Inspections Department administers commercial building permits under the Ohio Building Code through the City's online permitting tools. Zoning, fire, historic-conservation, right-of-way, and Metropolitan Sewer District reviews are separate approvals that can run alongside the building permit, particularly on downtown, riverfront, and hillside sites.",
  },
  codes: {
    building: "Ohio Building Code, 2024 edition (based on the 2021 IBC), enforced by the City of Cincinnati",
    energy: "Ohio Building Code commercial energy provisions based on the 2021 IECC; ASHRAE 90.1 is an alternate compliance path",
    amendments: "Cincinnati enforces Ohio's mandatory statewide building code through its certified department; zoning, historic conservation, fire, sewer, and public-right-of-way requirements remain local and scope-specific. The Cincinnati Zoning Code and MSD stormwater/sewer requirements do not replace OBC technical compliance.",
  },
  utilities: {
    electric: "Duke Energy Ohio",
    notes: "Duke Energy Ohio coordinates electric service, gas service, and distributed-generation interconnection. Greater Cincinnati Water Works supplies water, while the Metropolitan Sewer District of Greater Cincinnati administers public sewer and stormwater infrastructure; capacity, separation, and connection requirements merit early review on redevelopment sites.",
  },
  climateNotes: "Cincinnati's 5A cold-humid climate brings humid summers, winter freeze-thaw, thunderstorms, and occasional Ohio River flooding. Steep hillsides, loess and residual soils, and older combined-sewer neighborhoods make geotechnical investigation, drainage, and utility routing site-specific exercises.",
  marketNotes: "Cincinnati's market combines major healthcare and university investment with corporate, consumer-products, advanced-manufacturing, logistics, and riverfront redevelopment work. Dense Over-the-Rhine and downtown rehabilitation, brownfield reuse, and hillside parcels create a different engineering profile from greenfield development along the I-71/I-75 corridors.",
  narratives: {
    mep: "Cincinnati MEP design balances 5A winter heating and pipe-freeze protection with humid-summer ventilation and dehumidification. Duke Energy Ohio service capacity, gas decisions, and any distributed-generation interconnection are coordinated before large health-care, manufacturing, or logistics loads are committed; GCWW and MSD connections are parallel infrastructure decisions. The 2024 Ohio Building Code supplies the permit baseline, but existing downtown buildings often require field verification of electrical rooms, shafts, steam or hydronic systems, and sewer elevations before replacement equipment can be reliably phased.",
    structural: "Cincinnati structural design follows the 2024 Ohio Building Code, with wind, snow, frost, and gravity loads typically more consequential than seismic demand. The city's hillsides and variable fill demand a geotechnical basis for retaining, foundations, and slope stability; near the Ohio River, floodplain elevation and existing waterfront conditions can shape the first-floor strategy. On dense urban rehabilitation work, verified existing masonry, timber, steel, and foundation conditions are as important as code load calculations, while adjacent-property protection and construction sequencing must fit constrained sites.",
    civil: "Cincinnati civil design starts with the City's zoning and site approvals and MSD's sewer and stormwater requirements, not simply a detention calculation. Older combined-sewer areas, steep grades, and the Ohio River floodplain can limit discharge points and make separation, sanitary capacity, and construction sequencing central to feasibility. We coordinate GCWW water service, MSD connections, erosion control, and any public right-of-way work early, then use site-specific soils and slopes to test whether infiltration, bioretention, or conventional detention is practical.",
    energy: "Commercial energy compliance in Cincinnati uses the Ohio Building Code's 2021-IECC provisions or the permitted ASHRAE 90.1 alternate path. In a cold-humid 5A climate, continuous insulation, air-barrier continuity, efficient heating, and controlled outside air reduce winter loss without overlooking summer latent load. We reconcile those measures with Duke Energy Ohio electric service, gas choices, lighting controls, and the constraints of existing façades, documenting the selected path as a permit deliverable rather than treating utility incentives as code compliance.",
  },
  faqs: [
    { q: "Which commercial building code applies in Cincinnati?", a: "Cincinnati enforces Ohio's mandatory 2024 Ohio Building Code, based on the 2021 IBC. Commercial energy provisions are based on the 2021 IECC, with ASHRAE 90.1 available as an alternate path; local zoning, fire, sewer, and right-of-way reviews remain separate." },
    { q: "Who provides utility service in Cincinnati?", a: "Duke Energy Ohio provides electric service and coordinates gas and distributed-generation requests. Greater Cincinnati Water Works provides water, and the Metropolitan Sewer District of Greater Cincinnati administers public sewer and stormwater infrastructure." },
    { q: "What site conditions matter most in Cincinnati?", a: "Hillsides, variable soils and fill, combined sewers in older neighborhoods, and Ohio River floodplain exposure can materially affect foundations, grading, stormwater, and utility connections. Geotechnical and MSD coordination should begin during layout rather than after building design." },
  ],
};