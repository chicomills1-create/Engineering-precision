import type { CityData } from "../types";

export const phoenix: CityData = {
  slug: "phoenix",
  name: "Phoenix",
  stateSlug: "arizona",
  county: "Maricopa County",
  ahj: {
    office: "City of Phoenix Planning & Development Department",
    process:
      "Plan review runs through the SHAPE PHX online portal, and Phoenix offers a self-certification program that lets pre-approved registered professionals bypass standard plan review for qualifying projects — often cutting weeks off permitting. Standard commercial review targets published turnaround tiers, with expedited paid options available.",
  },
  codes: {
    building: "2018 IBC, adopted as the Phoenix Building Construction Code (PBCC) with city amendments",
    energy: "2018 IECC with Phoenix amendments",
    amendments:
      "Phoenix amendments touch pool barriers, shade-structure provisions, and administrative chapters; the city also enforces its own electrical, mechanical, and plumbing administrative amendments within the PBCC. Confirm the amendment package — it differs from neighboring Mesa, Chandler, and Scottsdale even on the same base year.",
  },
  utilities: {
    electric: "APS and SRP — the territory line runs through the metro, and which utility serves the parcel changes rate structures and interconnection paths",
    notes:
      "Both utilities apply significant commercial demand charges that reward load-shifting and right-sized services; new large services (especially data-center-adjacent loads) can carry long transformer lead times. Water and sewer are City of Phoenix services inside city limits.",
  },
  climateNotes:
    "ASHRAE climate zone 2B with 115°F+ design cooling days and monsoon dust seasons; the urban heat island pushes Phoenix nighttime temperatures well above the surrounding desert, which erodes night-flush and economizer hours compared to outlying cities.",
  marketNotes:
    "Phoenix is one of the country's most active commercial construction markets, anchored by the TSMC semiconductor campus in north Phoenix and its supplier ecosystem, plus sustained industrial, healthcare, and multifamily pipelines. Plan-review volume is correspondingly heavy, which is exactly why the self-certification path matters for schedule-driven projects.",
  narratives: {
    mep:
      "MEP design in Phoenix starts with the 0.4% design condition — roughly 110–116°F depending on station — and the urban heat island that keeps summer nights hot enough to erase free-cooling hours other 2B cities still get. We select equipment with high-ambient derates, specify condenser approach temperatures honestly, and design filtration for monsoon dust (MERV upgrades and pre-filters on outside air). Electrically, the APS/SRP territory split matters early: demand-charge structures and interconnection queues differ, so we confirm the serving utility at schematic design and size services against realistic transformer lead times rather than optimistic ones.",
    structural:
      "Phoenix structural work is governed less by lateral loads (SDC B–C across most of the city) and more by what the geotechnical report says about the site: expansive and collapsible soils are common across the Valley floor, and the PBCC requires foundations designed to the project geotech. Monsoon microbursts drive roof-uplift and rooftop-equipment anchorage attention, and the 2018 IBC basis with Phoenix administrative amendments means special-inspection programs must be set up through the city's own forms — not generic county paperwork.",
    civil:
      "Site work in Phoenix means retention, not detention: the city's stormwater policy requires on-site retention of the 100-year, 2-hour storm, which directly consumes developable area and should be blocked out in the first site plan pass. Maricopa County Rule 310 dust-control permits apply to virtually any disturbance, and grading and drainage plans route through SHAPE PHX alongside the building package. We design to the City of Phoenix supplements to MAG standard specifications and coordinate water/sewer capacity and development-impact requirements with the city early.",
    energy:
      "Phoenix enforces the 2018 IECC with city amendments, so COMcheck documentation must target that exact edition — not the 2021 cycle some Valley neighbors are moving toward. In climate zone 2B, compliance economics favor cool roofs, low-SHGC glazing, and right-sized cooling plants over added wall insulation, and the heat island makes economizer credit less valuable than the climate file suggests. We coordinate envelope, mechanical, and lighting compliance as one package and resolve plan-check comments directly through the SHAPE PHX workflow.",
  },
  faqs: [
    {
      q: "What building code does the City of Phoenix enforce?",
      a: "Phoenix enforces the Phoenix Building Construction Code, based on the 2018 IBC with city amendments. Neighboring cities adopt their own packages, so a project a mile away in Tempe or Scottsdale can be under a different amendment set even on the same base code year.",
    },
    {
      q: "How does Phoenix self-certification permitting work?",
      a: "Phoenix allows pre-approved registered professionals to self-certify qualifying projects, bypassing standard plan review. It doesn't waive code compliance — the city audits submittals — but for eligible commercial work it can compress the permitting schedule by weeks.",
    },
    {
      q: "Will my Phoenix project be served by APS or SRP?",
      a: "It depends on the parcel — the APS/SRP territory boundary runs through the metro. The answer affects rate structures, demand charges, and interconnection timelines, so we confirm the serving utility during schematic design, before sizing the electrical service.",
    },
  ],
  research: {
    lastVerified: "2026-09-11", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 94, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.phoenix.gov/administration/departments/pdd.html"],
      codes: ["https://www.phoenix.gov/pdd/devcode/buildingcode"],
      amendments: ["https://www.phoenix.gov/pdd/devcode/buildingcode"],
      utilities: ["https://www.aps.com/en/Business"],
      climate: ["https://www.weather.gov/psr/"],
      market: ["https://www.investinphoenix.com/"],
    },
  },
};
