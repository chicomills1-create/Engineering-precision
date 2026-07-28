import type { StateData } from "../types";

export const michigan: StateData = {
  slug: "michigan",
  name: "Michigan",
  abbrev: "MI",
  buildingCode: {
    name: "Michigan Building Code (2015 edition, based on the 2015 IBC)",
    baseCode: "2015 IBC with Michigan amendments",
    notes:
      "Michigan enforces a statewide, mandatory commercial building code adopted by the Bureau of Construction Codes under LARA. The state has historically run a cycle or two behind the model code — the commercial building code is based on the 2015 IBC — so designers should confirm the current adopted edition and any pending updates with the AHJ.",
  },
  energyCode: {
    commercial: "Michigan Uniform Energy Code based on the 2015 IECC (with ASHRAE 90.1-2013 as an alternate path)",
    notes:
      "The commercial energy code is adopted statewide through the Michigan Uniform Energy Code and tracks the 2015 IECC vintage, meaning it is less stringent than the newest model codes. Compliance is uniform statewide, but the older baseline should be verified against any recent updates.",
  },
  climate: {
    zones: "5A across the Lower Peninsula and 6A/7 across the Upper Peninsula",
    drivers: [
      "Severe lake-effect snow along the western and northern shorelines",
      "Very cold winters, with the U.P. reaching climate zones 6A and 7",
      "Long heating seasons that dominate mechanical energy use",
      "Humid summers requiring dehumidification and condensation control",
    ],
  },
  structural: {
    seismic: "Low seismicity statewide — predominantly Seismic Design Category A; seismic rarely governs",
    wind: "Basic wind speeds generally around 105–115 mph (Risk Category II); shoreline exposure can raise design pressures",
    snow: "Ground snow loads are among the highest in the Midwest — commonly 30–50+ psf, with lake-effect belts and the U.P. running higher and requiring drift and unbalanced-load analysis",
    other: "Deep frost penetration (often 42+ inches in the north) governs footing depth; expansive and soft soils appear regionally",
  },
  licensure: {
    board: "Michigan Board of Professional Engineers (LARA, Bureau of Professional Licensing)",
    notes: "Michigan grants licensure by comity for NCEES-record engineers; electronic seals and digital signatures are accepted for permit submittals under board rules.",
  },
  metros: ["Detroit", "Grand Rapids", "Ann Arbor", "Lansing", "Warren", "Kalamazoo"],
  permitting:
    "Michigan's Bureau of Construction Codes sets the statewide baseline, while local building departments and, in some areas, state plan review handle commercial permits. Detroit and Grand Rapids run structured commercial review; because the state code edition lags the model cycle, aligning submittals to the actual adopted edition avoids comment cycles.",
  marketNotes:
    "Michigan's construction economy remains anchored by automotive and EV/battery manufacturing, with major plant investments reshaping industrial demand across the state. Grand Rapids and the west side show strong healthcare, life-science, and mixed-use growth, while Detroit continues large-scale redevelopment and mobility-sector construction.",
  narratives: {
    mep:
      "In Michigan, the heating season dictates mechanical strategy. Most of the Lower Peninsula sits in climate zone 5A, but the Upper Peninsula pushes into zones 6A and 7, so we design heating plants and cold-climate heat pumps for genuinely severe conditions and detail freeze protection for anything exposed to Michigan winters. Humid summers still demand real dehumidification, and we size ventilation and controls to manage latent loads without over-cooling. Because the energy provisions are adopted statewide through the Michigan Uniform Energy Code — currently on a 2015 IECC vintage — our compliance documentation is uniform across jurisdictions, though we design toward better-than-code envelopes given the long heating season. Electrically, the EV and battery-manufacturing wave has raised expectations for service capacity, power quality, and utility coordination with providers like DTE Energy and Consumers Energy, and we size distribution with that industrial load growth in mind.",
    structural:
      "Snow is the defining structural challenge in Michigan. Ground snow loads are among the heaviest in the Midwest, and the lake-effect belts along the western shoreline and throughout the Upper Peninsula demand careful drift and unbalanced-load analysis on roofs — an under-designed roof here is a real failure risk, not a code technicality. Frost penetration runs deep, often past 42 inches in the north, so we set footings accordingly to prevent heave. Seismic demand is minimal (SDC A dominates), which lets lateral design focus on wind, with shoreline exposure raising pressures on tall or exposed structures. We design gravity and lateral systems to the statewide Michigan Building Code based on the 2015 IBC, confirm the governing edition with the AHJ since Michigan lags the model cycle, and coordinate foundations with geotechnical findings where soft or expansive soils appear.",
    civil:
      "Site engineering in Michigan is shaped by water — abundant surface water, high groundwater, and a strong soil-erosion regulatory tradition. Michigan's Part 91 Soil Erosion and Sedimentation Control program requires local permits for earth-disturbing activities near water or over an acre, and NPDES construction stormwater coverage applies to larger sites, so we build erosion control and a SWPPP into the plans from the start. Snowmelt and freeze-thaw drive grading and pavement decisions, and deep frost affects utility burial depths. We design detention and water-quality practices to local and county drain-commission standards, coordinating with county drain offices that have real authority over outfalls and regional conveyance. Resolving discharge points and drain-commission requirements early keeps Michigan site projects from stalling in review.",
    energy:
      "Michigan's commercial energy code is adopted statewide through the Michigan Uniform Energy Code and currently tracks the 2015 IECC, with ASHRAE 90.1-2013 as an alternate path — an older, less stringent baseline than the newest model codes. We document compliance via COMcheck or energy modeling against that adopted edition, but we routinely recommend designing above the minimum, because in a heating-dominated climate (zones 5A to 7) envelope performance pays back fast. Continuous insulation, air-barrier continuity, and infiltration control are the highest-value measures here, followed by efficient heating plants and daylight-responsive lighting. We also map utility incentive programs from DTE and Consumers Energy that reward exceeding code, which can materially offset first cost on Michigan's long-heating-season buildings.",
  },
  faqs: [
    {
      q: "Which building and energy codes does Michigan enforce?",
      a: "Michigan enforces a statewide Michigan Building Code based on the 2015 IBC and the Michigan Uniform Energy Code based on the 2015 IECC. The state tends to run behind the newest model cycles, so we confirm the current adopted edition with the AHJ before design.",
    },
    {
      q: "How much snow load do Michigan roofs need to carry?",
      a: "A lot — Michigan has some of the Midwest's highest ground snow loads, commonly 30–50+ psf, with lake-effect belts and the Upper Peninsula running higher. We perform drift and unbalanced-load analysis, since snow, not seismic, typically governs Michigan roof framing.",
    },
    {
      q: "What erosion and stormwater permits apply to Michigan sites?",
      a: "Michigan's Part 91 Soil Erosion and Sedimentation Control program requires local permits for earth-disturbing work near water or over an acre, and NPDES construction stormwater coverage applies to larger sites. County drain commissions also have authority over outfalls, so we coordinate discharge points early.",
    },
    {
      q: "Is seismic design a concern in Michigan?",
      a: "Rarely. Michigan is low-seismicity and predominantly Seismic Design Category A, so wind and especially snow govern lateral and roof design. We still verify SDC per site, but structural effort focuses on gravity, snow drift, and deep-frost foundations.",
    },
  ],
};
