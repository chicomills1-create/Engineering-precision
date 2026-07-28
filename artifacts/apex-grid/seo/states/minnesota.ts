import type { StateData } from "../types";

export const minnesota: StateData = {
  slug: "minnesota",
  name: "Minnesota",
  abbrev: "MN",
  buildingCode: {
    name: "Minnesota State Building Code (2020 edition, based on the 2018 IBC with amendments)",
    baseCode: "2018 IBC with Minnesota amendments",
    notes:
      "Minnesota enforces a mandatory statewide building code administered by the Department of Labor and Industry, with amendments that reflect the state's severe cold climate. The code applies uniformly statewide, though some municipalities have limited local administration authority. The current adopted IBC edition should be confirmed with DLI, which updates on a defined cycle.",
  },
  energyCode: {
    commercial: "Minnesota Commercial Energy Code based on ASHRAE 90.1-2016 / 2018 IECC with state amendments",
    notes:
      "Minnesota adopts a stringent statewide commercial energy code aligned to a recent ASHRAE 90.1 / IECC vintage with cold-climate amendments. Compliance is uniform statewide and reflects one of the more demanding cold-climate energy baselines in the country.",
    beyondCode: "Minneapolis and St. Paul have building energy benchmarking and disclosure ordinances; the state has explored stretch-code and Sustainable Building 2030 goals for public buildings.",
  },
  climate: {
    zones: "6A across most of the state; 7 across the northern third",
    drivers: [
      "Extreme cold winters with very long heating seasons (zones 6A–7)",
      "Heavy snow and deep frost penetration",
      "Large diurnal and seasonal temperature swings",
      "Humid summers requiring dehumidification and condensation control",
    ],
  },
  structural: {
    seismic: "Very low seismicity statewide — Seismic Design Category A; seismic effectively never governs",
    wind: "Basic wind speeds generally around 105–115 mph (Risk Category II); open-prairie exposure raises design pressures",
    snow: "Ground snow loads are high — commonly 35–50+ psf, higher in the north, with drift and unbalanced loading frequently governing roofs",
    other: "Very deep frost (often 60+ inches in the north) governs foundations; frost heave, expansive clays, and organic soils require careful geotechnical design",
  },
  licensure: {
    board: "Minnesota Board of Architecture, Engineering, Land Surveying, Landscape Architecture, Geoscience, and Interior Design (AELSLAGID)",
    notes: "Minnesota grants licensure by comity for NCEES-record engineers; electronic signatures and seals are accepted for plan submittals under board rules.",
  },
  metros: ["Minneapolis", "St. Paul", "Rochester", "Duluth", "Bloomington", "St. Cloud"],
  permitting:
    "Minnesota's statewide code creates consistency, with local building officials and, in some cases, the state administering plan review and inspections. The Twin Cities run structured commercial review, and Rochester's healthcare-driven market (anchored by Mayo Clinic expansion) is active. The uniform code baseline keeps requirements consistent even as review timelines vary by jurisdiction.",
  marketNotes:
    "Minnesota's construction market is diverse and stable, anchored by healthcare (led by the Mayo Clinic Destination Medical Center in Rochester), corporate headquarters and life science in the Twin Cities, and food and agricultural processing statewide. Cold-climate expertise is a genuine differentiator for engineering delivered here.",
  narratives: {
    mep:
      "Minnesota is one of the most demanding cold-climate states in the country to engineer mechanical systems for — zones 6A and 7 with extreme winter design temperatures — so heating capacity, freeze protection, and envelope-driven load reduction dominate every project. We size condensing boilers, VRF, and cold-climate heat pumps for severe design conditions, detail heat tracing and freeze protection exhaustively, and manage ventilation to recover heat aggressively through energy-recovery ventilators, which pay off quickly given the long heating season. Humid summers still require dehumidification and condensation control, especially in healthcare and lab environments common in the Rochester and Twin Cities markets. Because Minnesota's energy code is stringent and adopted statewide, our mechanical and lighting designs meet a consistent, high bar everywhere. Electrically, we coordinate with Xcel Energy and other utilities on service capacity, standby power for critical healthcare loads, and demand management, sizing distribution for the reliability these facilities require.",
    structural:
      "Structural design in Minnesota is defined by snow and frost. Seismic demand is negligible (SDC A statewide), so wind governs lateral design, elevated by open-prairie exposure — but the loads that truly shape Minnesota structures are snow and frost. Ground snow loads run high, commonly 35–50+ psf and greater in the north, and drift and unbalanced loading frequently control roof framing, so we analyze these conditions carefully rather than relying on flat design values. Frost penetration is extreme, often exceeding 60 inches in the north, so foundations are set deep or frost-protected, and we design for frost heave in expansive clays and organic soils that appear across the state. We design gravity and lateral systems to the statewide Minnesota State Building Code based on the 2018 IBC and confirm the current adopted edition with the Department of Labor and Industry. Cold-climate detailing — thermal breaks, condensation control at structural penetrations — is part of doing structural work right here.",
    civil:
      "Site engineering in Minnesota operates under a robust water framework. The MPCA administers the NPDES/SDS Construction Stormwater General Permit for sites disturbing an acre or more, with permanent stormwater management requiring volume reduction and water-quality treatment, and the Minimal Impact Design Standards (MIDS) push infiltration and green-infrastructure practices in many communities. Watershed districts and watershed management organizations across the metro hold real regulatory authority and add their own rules, so we identify the governing watershed district early. Minnesota's deep frost, tight clay soils, and high groundwater limit cold-season infiltration and complicate basin design, so we plan grading, detention, and infiltration practices with those constraints in mind. Snow storage and snowmelt drainage are practical site considerations we account for that engineers from milder climates often overlook.",
    energy:
      "Minnesota enforces a stringent statewide commercial energy code aligned to a recent ASHRAE 90.1 / IECC vintage with cold-climate amendments — one of the most demanding energy baselines in the nation. We document compliance via COMcheck or whole-building energy modeling, and because the code is already aggressive, the design conversation shifts quickly to how far above it we should go. In zones 6A and 7, envelope performance is everything: continuous insulation, meticulous air-barrier continuity, thermal-bridge mitigation, and high-performance glazing drive the largest reductions, followed by energy-recovery ventilation and efficient heating plants. In Minneapolis and St. Paul we account for benchmarking and disclosure ordinances that extend compliance past permit day. We also map Xcel Energy and Conservation Improvement Program incentives that reward above-code performance, helping justify the high-performance envelopes that make sense in Minnesota's climate.",
  },
  faqs: [
    {
      q: "What building code applies to Minnesota commercial projects?",
      a: "The Minnesota State Building Code, currently the 2020 edition based on the 2018 IBC with cold-climate amendments, applies statewide. It's administered by the Department of Labor and Industry with local building officials handling review and inspections, giving a uniform baseline across the state.",
    },
    {
      q: "How stringent is Minnesota's commercial energy code?",
      a: "Very — Minnesota adopts a statewide energy code aligned to a recent ASHRAE 90.1/IECC vintage with cold-climate amendments, among the most demanding in the country. We document compliance with COMcheck or energy modeling and focus on envelope performance and heat recovery, which pay back fast in zones 6A–7.",
    },
    {
      q: "What structural loads govern in Minnesota?",
      a: "Snow and frost. Ground snow loads commonly run 35–50+ psf with drift and unbalanced loading often governing roofs, and frost can exceed 60 inches in the north, driving deep or frost-protected foundations. Seismic is negligible (SDC A), so wind handles lateral design.",
    },
    {
      q: "What stormwater rules apply to Minnesota site development?",
      a: "The MPCA Construction Stormwater General Permit covers sites disturbing an acre or more, permanent stormwater must provide volume reduction and treatment (often via MIDS), and metro watershed districts add their own rules. We identify the governing watershed district early and design around deep frost and tight soils that limit infiltration.",
    },
  ],
};
