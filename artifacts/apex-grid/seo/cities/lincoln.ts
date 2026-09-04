import type { CityData } from "../types";

export const lincoln: CityData = {
  slug: "lincoln",
  name: "Lincoln",
  stateSlug: "nebraska",
  county: "Lancaster County",
  ahj: {
    office: "City of Lincoln Building and Safety Department",
    process:
      "Lincoln Building and Safety accepts commercial building permit applications and plans through its online permitting services and coordinates review with fire, planning, and other city divisions as applicable. Site plans, public improvements, floodplain work, and utility extensions can require separate City of Lincoln review before construction can proceed.",
  },
  codes: {
    building: "2018 International Building Code, adopted by the City of Lincoln with local amendments",
    energy: "2018 International Energy Conservation Code, commercial provisions, adopted by the City of Lincoln",
    amendments:
      "Lincoln administers its locally adopted 2018 International Code package and published amendments. Building permit review does not replace the city's separate engineering, floodplain, access, grading, and utility requirements.",
  },
  utilities: {
    electric: "Lincoln Electric System (LES) provides electric service; Lincoln Water System provides water and wastewater service",
    notes:
      "LES should confirm service capacity, voltage, transformer location, and distributed-generation interconnection for the specific parcel. Water-main, sanitary-sewer, fire-flow, pressure, and extension needs are early coordination items with Lincoln Water System and the city.",
  },
  climateNotes:
    "Lincoln is in IECC climate zone 5A, with cold winters, hot humid summers, hail and severe thunderstorms, tornado exposure, and repeated freeze-thaw cycles. Salt Creek floodplain and tributary drainage, loess-derived soils, and winter frost conditions make geotechnical and drainage investigations site-specific.",
  marketNotes:
    "Lincoln's construction market is supported by the University of Nebraska–Lincoln, state government, healthcare, insurance and financial services, food processing, and I-80-connected distribution. East and northeast industrial development can combine substantial electrical loads with public-infrastructure and drainage coordination.",
  narratives: {
    mep:
      "Lincoln MEP systems must operate through a 5A winter as well as humid summer cooling and severe-weather interruptions. Freeze protection, dependable heating distribution, moisture control, and protected outdoor equipment are coordinated with the locally amended 2018 code package. LES capacity, service routing, and transformer siting are established during schematic design rather than assumed from a nearby feeder; Lincoln Water System fire-flow, pressure, and gas-service decisions likewise affect mechanical and fire-protection layouts.",
    structural:
      "Lincoln structural design is governed principally by plains wind, snow, hail, frost, and the site's soil report rather than high seismic demand. The city's 2018 IBC review basis requires project-specific wind exposure, roof-zone pressures, cladding attachment, and rooftop-equipment anchorage; a code-compliant building is distinct from an owner-selected tornado refuge. Variable loess and alluvial conditions, drainage-induced moisture changes, and slope stability can govern foundations, retaining walls, and pavements, so they are resolved with the geotechnical investigation.",
    civil:
      "Lincoln civil engineering starts with the Salt Creek watershed and the direction concentrated storm runoff leaves the parcel. We coordinate grading, detention, access, water and sanitary connections, and any public improvements with the city's engineering process, then test finished floors and outfalls against applicable FEMA flood mapping. Nebraska construction-stormwater permit coverage and a SWPPP apply to qualifying land disturbance; erosion controls need to work through both intense summer storms and freeze-thaw seasons.",
    energy:
      "Commercial energy documentation in Lincoln targets the locally adopted 2018 IECC. In climate zone 5A, a continuous air barrier, insulation continuity, high-performing glazing, heating efficiency, and cooling/dehumidification controls are evaluated as one envelope-and-systems package, using the selected compliance path. For laboratories, campus buildings, or large industrial loads, LES service capacity and distribution losses are assessed alongside the model, not after the permit drawings are complete.",
  },
  faqs: [
    { q: "What commercial code does Lincoln enforce?", a: "Lincoln enforces a locally adopted 2018 International Code package, including the 2018 IBC and commercial 2018 IECC, with city amendments. The Building and Safety Department administers building review; engineering, floodplain, and utility approvals can be separate tracks." },
    { q: "Who provides electric and water service in Lincoln?", a: "Lincoln Electric System provides electricity, and Lincoln Water System provides water and wastewater service. Confirm parcel-specific capacity, service routing, pressure, fire flow, and extension obligations early." },
    { q: "What conditions should a Lincoln site study address?", a: "A Lincoln site study should address Salt Creek or tributary flood hazards where mapped, concentrated storm runoff, variable soils, frost, wind, hail, and tornado exposure. A geotechnical report and early drainage/outfall analysis are especially important on sloped or floodplain-adjacent sites." },
  ],
};