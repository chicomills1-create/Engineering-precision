import type { StateData } from "../types";

export const kentucky: StateData = {
  slug: "kentucky",
  name: "Kentucky",
  abbrev: "KY",
  buildingCode: {
    name: "Kentucky Building Code (based on the International Building Code) enforced statewide as a mandatory minimum",
    baseCode: "IBC with Kentucky amendments (2015 IBC base in the current Kentucky Building Code, adopted statewide)",
    notes:
      "Kentucky is a mini/maxi code state: the Kentucky Building Code is a mandatory statewide code that local jurisdictions may not weaken or exceed except as the state permits. The Department of Housing, Buildings and Construction administers it, giving Kentucky an unusually uniform commercial code baseline.",
  },
  energyCode: {
    commercial: "Kentucky's commercial energy provisions follow the IECC / ASHRAE 90.1 edition incorporated into the Kentucky Building Code",
    notes:
      "Because Kentucky enforces a uniform statewide code, the commercial energy baseline is consistent across jurisdictions, tracking the IECC edition adopted into the Kentucky Building Code with ASHRAE 90.1 as an alternate path.",
  },
  climate: {
    zones: "4A statewide",
    drivers: [
      "Genuine four-season climate with substantial heating and cooling loads",
      "Humid summers requiring latent-load management",
      "Freeze-thaw cycles and winter design considerations",
      "New Madrid seismic influence in far western Kentucky",
    ],
  },
  structural: {
    seismic: "Elevated in the far west — the New Madrid Seismic Zone drives Seismic Design Category C–D in the Jackson Purchase region near the Mississippi, dropping toward SDC B across central and eastern Kentucky",
    wind: "Basic wind speeds around 105–115 mph (Risk Category II); tornado and severe-storm exposure statewide",
    snow: "Moderate ground snow loads, generally 10–20 psf",
    other: "Extensive karst terrain and sinkholes across central Kentucky; frost depth and freeze-thaw detailing; river-corridor flood exposure along the Ohio and Mississippi",
  },
  licensure: {
    board: "Kentucky State Board of Licensure for Professional Engineers and Land Surveyors",
    notes: "Kentucky offers licensure by comity for NCEES-record engineers and requires a Certificate of Authorization for firms. Electronic seals are accepted per board rules.",
  },
  metros: ["Louisville", "Lexington", "Bowling Green", "Owensboro", "Covington", "Florence"],
  permitting:
    "Kentucky's mandatory statewide code makes the governing edition predictable, and the state administers plan review for many project types alongside local building departments in Louisville, Lexington, and the northern-Kentucky cities within the Cincinnati metro. Karst and floodplain considerations frequently shape site review in central and river-corridor jurisdictions.",
  marketNotes:
    "Kentucky's construction market is anchored by logistics (the UPS Worldport hub in Louisville), automotive and EV-battery manufacturing, bourbon-industry expansion, and healthcare. Northern Kentucky benefits from Cincinnati-metro growth, and Bowling Green's automotive sector adds steady industrial demand.",
  narratives: {
    mep:
      "MEP engineering in Kentucky serves a solidly four-season, zone 4A climate where heating and cooling loads are both substantial — designs that shortchange either season fail here. We size mechanical systems for humid summers and cold, freeze-prone winters alike, detailing freeze protection, combustion or heat-pump heating, and controls that transition cleanly between modes. Louisville's logistics engine and the statewide automotive/EV-battery wave mean much of our work is large industrial and distribution space, where efficient large-volume HVAC, right-sized electrical service, and process-power coordination dominate the design. Because Kentucky enforces a uniform statewide code, our HVAC, lighting, and plumbing documentation targets the IECC edition incorporated into the Kentucky Building Code with ASHRAE 90.1 as an alternate path — and that statewide consistency simplifies compliance planning across projects in different cities. Balanced seasonal performance and industrial-scale efficiency define Kentucky MEP work.",
    structural:
      "Kentucky structural design is shaped by two features that pull in different directions: New Madrid seismicity in the far west and karst geology through the center of the state. In the Jackson Purchase region near the Mississippi, seismic demand climbs to Seismic Design Category C–D, so ductile detailing and drift control govern — a stark contrast to the SDC B baseline in central and eastern Kentucky. We evaluate site-specific seismic parameters before committing to a lateral system. Central Kentucky's extensive karst means sinkholes and subsurface voids frequently dictate deep or grouted foundations and careful geotechnical coordination. Moderate snow loads and freeze-thaw cycles add winter detailing that Southern states skip, and tornado exposure supports storm-shelter demand for institutional projects. Because the Kentucky Building Code is a uniform statewide standard, the code basis is predictable even as the seismic and geotechnical realities shift sharply from west to east.",
    civil:
      "Civil and site engineering in Kentucky must contend with karst terrain more than almost any state — central Kentucky's limestone geology produces sinkholes, sinking streams, and subsurface drainage that can upend conventional detention and infiltration design. We coordinate closely with geotechnical findings to keep stormwater from being concentrated over potential voids, and design detention and conveyance to each jurisdiction's local criteria sized for the region's rainfall. River-corridor flood exposure along the Ohio and Mississippi drives floodplain compliance on affected sites. Sites disturbing an acre or more require Kentucky Division of Water construction stormwater (KYR10) permit coverage and a SWPPP, with erosion measures adapted to rolling grades and repeated freeze-thaw. Frost depth governs foundation and utility burial depths. The defining civil challenge is managing water responsibly across karst geology where the subsurface behaves unpredictably.",
    energy:
      "Because the Kentucky Building Code is mandatory statewide, commercial energy compliance starts from one fixed reference — the IECC edition folded into that code, with ASHRAE 90.1 accepted as an alternate — no matter which city issues the permit. A zone 4A climate makes this a two-sided problem: the winters are cold enough to reward serious insulation and air-tightness, yet the muggy summers still put cooling efficiency and latent control on the table, so neither side of the envelope-versus-equipment ledger can be neglected. Documentation follows the project's complexity — a prescriptive COMcheck run for simpler shells, a whole-building simulation where trade-offs earn it — and we reconcile envelope, lighting, and mechanical numbers before submitting rather than after. On the sprawling logistics and manufacturing floors that dominate Kentucky construction, sealing enormous envelopes tight and matching HVAC capacity to actual load do the heaviest lifting; when an owner wants to push past code, we put a payback figure on it first.",
  },
  faqs: [
    {
      q: "Does Kentucky have a statewide building code?",
      a: "Yes. The Kentucky Building Code is a mandatory statewide code administered by the Department of Housing, Buildings and Construction. As a mini/maxi code state, local jurisdictions generally cannot weaken or exceed it except as the state permits, giving Kentucky an unusually uniform commercial baseline.",
    },
    {
      q: "Is seismic design required in Kentucky?",
      a: "In far western Kentucky, yes. Proximity to the New Madrid fault pushes the Jackson Purchase region into Seismic Design Category C–D, where ductile detailing and drift limits govern the lateral system. Central and eastern Kentucky sit much lower at roughly SDC B, so we pin down the site-specific seismic parameters at the outset rather than assuming a default.",
    },
    {
      q: "How does karst terrain affect Kentucky site design?",
      a: "Substantially. Central Kentucky's limestone karst produces sinkholes and subsurface voids that can complicate detention, infiltration, and foundations. We coordinate civil and structural design with geotechnical findings to avoid concentrating stormwater over potential voids and to select appropriate foundation systems.",
    },
    {
      q: "Which energy code applies to Kentucky commercial buildings?",
      a: "Kentucky's commercial energy requirements ride on the IECC edition built into the statewide Kentucky Building Code, and ASHRAE 90.1 is accepted as a substitute route. Because that code applies uniformly, the energy target does not change from one jurisdiction to the next, and our documentation is keyed to the adopted edition.",
    },
  ],
};
