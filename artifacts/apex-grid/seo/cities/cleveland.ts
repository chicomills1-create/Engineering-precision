import type { CityData } from "../types";

export const cleveland: CityData = {
  slug: "cleveland",
  name: "Cleveland",
  stateSlug: "ohio",
  county: "Cuyahoga County",
  ahj: {
    office: "City of Cleveland Department of Building and Housing",
    process:
      "The Department of Building and Housing administers construction permits and plan review through the City’s online permitting services. Commercial projects can need building, zoning, fire, landmark, health, utility, and right-of-way coordination; site work is also reviewed in the context of the Northeast Ohio Regional Sewer District requirements.",
  },
  codes: {
    building: "Ohio Building Code, 2024 edition (based on the 2021 IBC), enforced by the City of Cleveland",
    energy: "Ohio Building Code commercial energy provisions based on the 2021 IECC; ASHRAE 90.1 is an alternate compliance path",
    amendments:
      "Cleveland enforces Ohio's mandatory statewide commercial code through its certified building department. Local zoning, fire, landmark, utility, and sewer-district requirements are separate design constraints, especially for downtown, lakefront, and adaptive-reuse work.",
  },
  utilities: {
    electric: "Cleveland Public Power serves municipal electric customers; The Illuminating Company serves other parts of the city",
    notes:
      "The serving electric utility should be confirmed by parcel, and new load, service upgrades, and distributed generation require its review. Cleveland Division of Water supplies water; wastewater and regional stormwater compliance involve the Northeast Ohio Regional Sewer District.",
  },
  climateNotes:
    "Cleveland is in ASHRAE climate zone 5A, but Lake Erie produces lake-effect snow, cold wind, freeze-thaw cycles, and humid summers. Lakefront flood and wave conditions, low-lying drainage areas, soft lacustrine soils, fill, and aging combined sewers are material site and foundation considerations.",
  marketNotes:
    "Cleveland's construction work includes healthcare and research anchored by Cleveland Clinic and University Hospitals, advanced manufacturing, logistics, downtown and waterfront redevelopment, and institutional renovation. Many opportunities are reuse or brownfield projects where existing structure, utilities, environmental conditions, and sewer capacity are more consequential than greenfield grading.",
  narratives: {
    mep:
      "Cleveland MEP design is heating- and snow-climate focused, but Lake Erie humidity and summer ventilation still require deliberate latent control. The statewide Ohio Building Code uses 2021-IECC commercial provisions, while Cleveland’s existing industrial and institutional stock often requires careful verification of electrical service, steam or hydronic infrastructure, risers, and equipment access. Cleveland Public Power or The Illuminating Company must be identified by parcel before service assumptions are made; capacity and interconnection discussions are early work for medical, research, and manufacturing loads. Water service from Cleveland Division of Water and sewer coordination with NEORSD should proceed in parallel with plumbing and site design.",
    structural:
      "In Cleveland, lake-effect snow, drifting, wind exposure, frost, and durability normally control ahead of seismic demand. The 2024 Ohio Building Code supplies the structural baseline, but roof geometry and adjacent taller structures can amplify drift loads, and Lake Erie exposures intensify wind-driven rain and corrosion concerns. Urban sites may include uncontrolled fill, old foundations, variable lacustrine soils, and groundwater, making geotechnical and existing-condition investigation central to foundation, slab, shoring, and reuse decisions. For lakefront or flood-prone parcels, flood and wave screening belongs before structural elevations and material choices are fixed.",
    civil:
      "Cleveland civil engineering should start with the actual sewer tributary, NEORSD requirements, and available discharge capacity. The region's combined-sewer legacy, Lake Erie receiving waters, snowmelt, flat grades, and older utilities can limit conventional drainage assumptions. Ohio EPA construction-stormwater coverage applies to qualifying disturbance, while City and sewer-district review guide stormwater, water, sanitary, and right-of-way work. We identify flood exposure, utility conflicts, environmental constraints, and space for detention or green infrastructure early, especially on redevelopment parcels where an old connection or undocumented fill can drive the feasible site plan.",
    energy:
      "Cleveland commercial energy documentation follows the Ohio Building Code’s 2021-IECC provisions or its ASHRAE 90.1 alternate path. In cold-humid zone 5A, continuous insulation, airtightness, high-performing fenestration, heating efficiency, and moisture-safe enclosure transitions reduce both energy use and freeze-thaw risk. Lake-effect weather makes roof and façade details particularly consequential. For hospitals, laboratories, and conversions, energy design integrates real ventilation, resiliency, and process loads with the envelope instead of relying on a nominal prescriptive tradeoff; the serving utility’s service capacity informs how electrification options are evaluated.",
  },
  faqs: [
    {
      q: "What codes apply to commercial construction in Cleveland?",
      a: "Cleveland enforces Ohio's mandatory 2024 Ohio Building Code, based on the 2021 IBC. Commercial energy provisions are based on the 2021 IECC, with ASHRAE 90.1 available as an alternate compliance path.",
    },
    {
      q: "Which electric and water utilities serve Cleveland?",
      a: "Cleveland Public Power serves municipal electric customers and The Illuminating Company serves other areas, so service territory should be confirmed for the parcel. Cleveland Division of Water provides water, and NEORSD is central to wastewater and regional stormwater coordination.",
    },
    {
      q: "Why are snow and sewer conditions important in Cleveland?",
      a: "Lake-effect snow and drifting can govern roof design, while frost, lacustrine soils, fill, and Lake Erie exposure affect foundations and durability. Cleveland's combined-sewer legacy and NEORSD requirements should be evaluated before committing to a drainage and utility layout.",
    },
  ],
};