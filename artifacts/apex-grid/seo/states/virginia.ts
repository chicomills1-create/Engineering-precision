import type { StateData } from "../types";

export const virginia: StateData = {
  slug: "virginia",
  name: "Virginia",
  abbrev: "VA",
  buildingCode: {
    name: "Virginia Uniform Statewide Building Code (USBC), 2021 edition",
    baseCode: "2021 IBC with Virginia amendments",
    notes:
      "Virginia enforces a single statewide code — the USBC — that every local building department must apply uniformly, and localities are barred from adopting their own more- or less-stringent amendments. The 2021 USBC (based on the 2021 I-Codes) took effect statewide, though the state runs on a rolling update cycle, so late-stage projects should confirm the effective edition with the Department of Housing and Community Development (DHCD).",
  },
  energyCode: {
    commercial:
      "Virginia Energy Conservation Code (part of the 2021 USBC), based on 2021 IECC with amendments; ASHRAE 90.1-2019 available as an alternate compliance path",
    notes:
      "Because energy provisions live inside the statewide USBC, commercial compliance is consistent across every Virginia jurisdiction. Projects may follow the IECC prescriptive/performance path or demonstrate compliance through ASHRAE 90.1.",
    beyondCode:
      "There is no statewide stretch code, but public buildings pursue high-performance targets through Executive Order energy goals, and some institutional and federal work in Northern Virginia layers LEED or Energy Star requirements on top of code.",
  },
  climate: {
    zones: "4A across most of the Commonwealth including the Tidewater, Piedmont, and Northern Virginia; 5A in the western mountains and 3A in the far southeast coastal edge",
    drivers: [
      "Humid mixed climate with meaningful cooling and heating seasons",
      "Coastal humidity and hurricane-remnant rainfall along the Tidewater",
      "Cold mountain winters in the Blue Ridge and Appalachians",
      "Dehumidification and envelope moisture control across a 4A climate",
    ],
  },
  structural: {
    seismic:
      "Generally Seismic Design Category B, rising to C on soft soils and near the Central Virginia Seismic Zone — the 2011 Mineral earthquake was a reminder that eastern seismic detailing is not academic",
    wind: "Basic wind speeds around 115–120 mph in the Hampton Roads/Tidewater hurricane exposure, tapering to ~110 mph inland (Risk Category II)",
    snow: "Ground snow loads run roughly 20–25 psf across the coastal plain and Piedmont, climbing to 30–40+ psf in the western mountains",
    other: "Coastal flood zones and recurrent tidal flooding govern low-lying Hampton Roads foundations; expansive marine clays appear in parts of the Tidewater",
  },
  licensure: {
    board: "Virginia Board for Architects, Professional Engineers, Land Surveyors, Certified Interior Designers and Landscape Architects (APELSCIDLA)",
    notes:
      "Virginia grants comity licensure to NCEES-record engineers and accepts digital signatures and seals on electronically submitted documents that meet the board's authentication requirements.",
  },
  metros: ["Virginia Beach", "Norfolk", "Richmond", "Arlington", "Alexandria", "Chesapeake", "Roanoke"],
  permitting:
    "Because the USBC is uniform statewide, plan-review expectations are broadly consistent, but review speed varies sharply between the fast-moving Northern Virginia counties (Fairfax, Loudoun, Prince William) and smaller Tidewater and Southwest localities. Chesapeake Bay Preservation Act requirements add an environmental review layer for sites in the eastern Tidewater watershed.",
  marketNotes:
    "Northern Virginia is the largest data-center market on the planet, and Loudoun County's 'Data Center Alley' continues to drive enormous MEP and site-power demand. Hampton Roads carries steady defense, port, and shipbuilding-related construction, while Richmond sees healthcare and mixed-use growth.",
  narratives: {
    mep:
      "Virginia's mixed-humid 4A climate makes latent load — not just sensible cooling — the quiet governor of MEP design, and we size systems for dehumidification through long shoulder seasons where a unit that only chases dry-bulb temperature will leave a building clammy and mold-prone. Because the Energy Conservation Code sits inside the statewide USBC, commercial mechanical and electrical documentation is consistent from Bristol to Virginia Beach, which lets us standardize our COMcheck and ASHRAE 90.1 workflow across the Commonwealth. Northern Virginia deserves special mention: the Loudoun/Prince William data-center corridor drives electrical service capacity, redundancy, and cooling design at a scale few markets see, and Dominion Energy's rate and interconnection realities shape how we stage electrical infrastructure. We design ventilation and filtration for humid coastal air in Hampton Roads and for tight, heating-dominated envelopes in the western mountains.",
    structural:
      "Structural engineering in Virginia carries a seismic footnote that many out-of-state teams overlook — the 2011 magnitude-5.8 Mineral earthquake originated in the Central Virginia Seismic Zone, and while most sites remain Seismic Design Category B, soft soils and essential facilities can push detailing into Category C. Along the Tidewater and Hampton Roads, hurricane-driven wind speeds near 115–120 mph and coastal flood zones govern both the lateral system and foundation elevation, and recurrent tidal flooding is a real design constraint on low-lying sites. In the Blue Ridge and Appalachians, ground snow loads climbing toward 30–40+ psf take over as the controlling roof load. We design to the uniform 2021 USBC statewide, coordinate foundations against expansive marine clays where the geotechnical report flags them, and treat flood elevation as a first-order decision on the coast.",
    civil:
      "Site engineering in Virginia is defined by water: the Commonwealth's stormwater program (VSMP) enforces quantity and quality standards administered through DEQ and local authorities, and any site in the eastern watershed must also satisfy the Chesapeake Bay Preservation Act, which restricts land disturbance near Resource Protection Areas and drives buffer, infiltration, and nutrient-reduction design. We plan stormwater management facilities — bioretention, infiltration, and detention — early, because Bay Act buffers and phosphorus-load limits can reshape a site plan and shrink developable area. In Northern Virginia, county erosion-and-sediment control review and dense-urban grading standards demand precise plans, while Hampton Roads sites require careful coordination of tidal flooding and sea-level considerations into finished grades and outfall design.",
    energy:
      "Virginia's commercial energy code is the Virginia Energy Conservation Code embedded in the statewide 2021 USBC, based on the 2021 IECC with a permitted ASHRAE 90.1-2019 alternate path — and because it is statewide, we do not have to remap compliance jurisdiction by jurisdiction as we would in a home-rule state. In this 4A mixed climate, envelope strategy balances heating and cooling: continuous insulation and air-barrier continuity pay off, but so does dehumidification-aware equipment selection, since humidity control drives comfort and mold risk more than raw temperature. We run COMcheck or 90.1 modeling depending on the project's trade-offs, and for the data centers and institutional work concentrated in Northern Virginia, we integrate above-code and LEED targets that owners and federal tenants frequently require.",
  },
  faqs: [
    {
      q: "Does Virginia have a statewide building code, or does it vary by locality?",
      a: "Virginia enforces one statewide code — the Virginia Uniform Statewide Building Code (USBC), currently the 2021 edition based on the 2021 IBC. Localities must apply it uniformly and cannot adopt their own stricter or looser amendments, so code requirements are consistent across the Commonwealth. We confirm the effective edition with DHCD for late-cycle projects.",
    },
    {
      q: "What energy code applies to commercial buildings in Virginia?",
      a: "The Virginia Energy Conservation Code, which is part of the statewide USBC and based on the 2021 IECC, with ASHRAE 90.1-2019 available as an alternate compliance path. Because it is statewide, the same requirements apply everywhere. We typically document compliance with COMcheck or a 90.1 energy model depending on the project.",
    },
    {
      q: "Do I need to worry about seismic design in Virginia?",
      a: "For most sites you'll be in Seismic Design Category B, but the Central Virginia Seismic Zone is real — the 2011 Mineral earthquake proved it. Soft soils and essential facilities can push a project into Category C, so we evaluate the site class and occupancy category rather than assuming eastern projects are seismically trivial.",
    },
    {
      q: "How does stormwater and the Chesapeake Bay Act affect my Virginia site?",
      a: "Virginia's stormwater program (VSMP) sets both water-quantity and water-quality (phosphorus reduction) requirements, and sites in the eastern watershed must also meet the Chesapeake Bay Preservation Act, which imposes buffers and land-disturbance limits near Resource Protection Areas. These constraints affect developable area, so we resolve stormwater and buffer layout during preliminary site design.",
    },
  ],
};
