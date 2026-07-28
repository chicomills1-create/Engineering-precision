import type { CityData } from "../types";

export const saltLakeCity: CityData = {
  slug: "salt-lake-city",
  name: "Salt Lake City",
  stateSlug: "utah",
  county: "Salt Lake County",
  ahj: {
    office: "Salt Lake City Building Services Division (within the Department of Community & Neighborhoods)",
    process:
      "Plan review runs through Salt Lake City's online permitting system with published commercial review timelines; the city has offered expedited and, for qualifying projects, over-the-counter or self-certification-style paths to compress schedules. Because Utah adopts building codes at the state level, the base code is uniform statewide, but Salt Lake City layers its own zoning, sustainability, and administrative requirements that shape a full submittal.",
  },
  codes: {
    building: "2021 IBC as adopted statewide under the Utah State Construction Code (with Utah amendments)",
    energy: "2021 IECC with Utah amendments (adopted statewide)",
    amendments:
      "Utah adopts and amends the I-codes at the state level through the Utah State Construction and Fire Codes Act, so Salt Lake City enforces the state-adopted 2021 IBC/IECC rather than a wholly local code. The city adds local overlays — sustainability, historic-district, and zoning requirements — and its energy and electrification goals influence how new commercial buildings are designed even where the base code is set by the state.",
  },
  utilities: {
    electric: "Rocky Mountain Power (a PacifiCorp company) serves Salt Lake City",
    notes:
      "Rocky Mountain Power applies commercial demand charges and offers time-of-use and demand-response options; large new services can carry notable transformer and interconnection lead times. Natural gas is provided by Dominion Energy Utah, and water/sewer are Salt Lake City Public Utilities services inside the city.",
  },
  climateNotes:
    "ASHRAE climate zone 5B, cold and dry, at roughly 4,300 ft elevation: cold winters with meaningful ground snow load, hot dry summers, and winter temperature inversions that trap air pollution in the valley — a persistent regional air-quality concern that shapes combustion and ventilation choices.",
  marketNotes:
    "Salt Lake City's market is driven by a strong tech and 'Silicon Slopes' office sector, healthcare and University of Utah expansion, data centers along the Wasatch Front, industrial and logistics growth, and downtown mixed-use and multifamily development. The airport reconstruction and transit-oriented projects have added sustained institutional and infrastructure work.",
  narratives: {
    mep:
      "MEP design in Salt Lake City is a heating-and-cooling balance rather than a cooling-dominated one: climate zone 5B brings cold, dry winters that drive freeze protection, heating plant sizing, and snow-melt loads alongside hot, dry summers with strong economizer potential. Winter inversions and the valley's air-quality history push electrification and low-emission combustion choices, aligning with the city's sustainability goals. Because Utah sets the base code at the state level, MEP compliance targets the state-adopted 2021 IECC, and Rocky Mountain Power demand charges reward load-shifting. We confirm transformer availability early, since large tech and data-center services can face long lead times along the Wasatch Front.",
    structural:
      "Salt Lake City sits on the Wasatch Fault, one of the most significant seismic hazards in the interior West, so structural design is firmly in the higher seismic categories — commonly SDC D, with site-specific analysis where soft valley soils amplify shaking. Liquefaction-prone lake-bed soils near the valley floor frequently drive deep foundations or ground improvement, so the geotechnical report is central. Ground snow load must be carried on roofs, with drift and unbalanced cases detailed carefully, and special-inspection programs run under the state-adopted 2021 IBC through Salt Lake City Building Services. Seismic bracing of nonstructural and MEP components gets real scrutiny here.",
    civil:
      "Civil work in Salt Lake City addresses a cold-climate, snow-load environment with frost-depth foundations, snow storage, and de-icing considerations built into site design. Stormwater management is governed by the city's MS4 permit and low-impact-development expectations, and grading must account for the valley's shallow groundwater and liquefaction-prone soils near the lake bed. Water and sewer coordination runs through Salt Lake City Public Utilities, and because Utah's construction code is state-adopted while zoning and sustainability overlays are local, we align the civil package with both. Detention and water-quality features get blocked out in the first site-plan pass.",
    energy:
      "Salt Lake City enforces the state-adopted 2021 IECC, so COMcheck documentation targets that edition — a more stringent cycle than the 2018 codes still used in parts of the Southwest. In cold-dry climate zone 5B, the high-value moves are a tight, well-insulated envelope, high-performance glazing, and heat recovery, while abundant dry summer air makes economizers and evaporative pre-cooling genuinely valuable. The city's sustainability and electrification goals, plus winter air-quality concerns, favor heat pumps and low-emission systems, so we coordinate envelope, mechanical, and lighting compliance as one package aligned with Rocky Mountain Power incentives.",
  },
  faqs: [
    {
      q: "Which building and energy codes apply in Salt Lake City?",
      a: "Utah adopts and amends the I-codes at the state level, so Salt Lake City enforces the state-adopted 2021 IBC and 2021 IECC with Utah amendments. The base code is uniform statewide, while the city layers its own zoning, historic-district, and sustainability requirements on top.",
    },
    {
      q: "How does the Wasatch Fault affect structural design here?",
      a: "Salt Lake City lies along the Wasatch Fault, putting most projects in the higher seismic design categories, commonly SDC D. Soft, liquefaction-prone lake-bed soils near the valley floor often require deep foundations or ground improvement and site-specific analysis, so the geotechnical report drives early structural decisions.",
    },
    {
      q: "What climate factors most influence MEP design in Salt Lake City?",
      a: "The 5B cold-dry climate makes it a heating-and-cooling balance: winters bring freeze protection, snow loads, and snow-melt needs, while dry summers favor economizers. Winter inversions and valley air quality push electrification and low-emission systems, aligning with the city's sustainability goals.",
    },
  ],
};
