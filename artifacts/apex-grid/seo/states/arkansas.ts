import type { StateData } from "../types";

export const arkansas: StateData = {
  slug: "arkansas",
  name: "Arkansas",
  abbrev: "AR",
  lastVerified: "2026-07-28",
  buildingCode: {
    name: "Arkansas Fire Prevention Code, Volume II (based on the International Building Code) enforced statewide",
    baseCode: "IBC via the Arkansas Fire Prevention Code (2021 IBC base in the current edition) with state amendments",
    notes:
      "Arkansas enforces commercial construction through the Arkansas Fire Prevention Code administered by the State Fire Marshal / Division of Arkansas State Police, which incorporates the IBC. This provides a statewide commercial baseline, though larger cities like Little Rock and Fayetteville run their own building departments and plan review.",
  },
  energyCode: {
    commercial: "Arkansas Energy Code for commercial buildings, based on the IECC / ASHRAE 90.1 (2021 IECC base in the current adoption)",
    notes:
      "The commercial energy code is adopted at the state level and tracks a recent IECC edition with ASHRAE 90.1 as an alternate path. Enforcement is administered locally alongside the building code.",
  },
  climate: {
    zones: "3A across most of the state, with 4A in the northern Ozark highlands",
    drivers: [
      "Hot-humid summers with substantial latent cooling loads",
      "Real winter heating loads, more pronounced in the north",
      "Severe convective storms, tornadoes, and heavy rainfall events",
      "New Madrid seismic influence in the northeast corner",
    ],
  },
  structural: {
    seismic: "Elevated in the northeast — the New Madrid Seismic Zone drives Seismic Design Category C–D near the Mississippi River corner, dropping toward SDC A–B in the west and south",
    wind: "Basic wind speeds around 105–115 mph (Risk Category II); tornado and straight-line wind exposure supports storm-shelter demand",
    snow: "Low ground snow loads, generally 5–15 psf, higher in the northern highlands",
    other: "Expansive soils in parts of the state and flood exposure along the Mississippi, Arkansas, and White River corridors",
  },
  licensure: {
    board: "Arkansas State Board of Licensure for Professional Engineers and Professional Surveyors (PELS)",
    notes: "Arkansas offers licensure by comity for NCEES-record engineers and requires a Certificate of Authorization for firms. Electronic seals are accepted per board rules.",
  },
  metros: ["Little Rock", "Fayetteville", "Fort Smith", "Springdale", "Jonesboro", "Bentonville"],
  permitting:
    "Statewide enforcement through the Fire Prevention Code gives Arkansas a consistent commercial baseline, but Little Rock and the fast-growing Northwest Arkansas cities (Fayetteville, Springdale, Bentonville) administer their own building departments. Northwest Arkansas review is busy given the Walmart/Tyson/J.B. Hunt corporate corridor, and Mississippi-corridor projects add floodplain and seismic scrutiny.",
  marketNotes:
    "Arkansas construction is concentrated in the Northwest Arkansas boom — corporate headquarters, logistics, healthcare, and higher education fueled by Walmart, Tyson, and J.B. Hunt — plus steady public and institutional work in Central Arkansas. Distribution and manufacturing facilities are a persistent driver statewide.",
  narratives: {
    mep:
      "MEP engineering in Arkansas serves a genuinely mixed climate: hot, humid summers in climate zone 3A demand real dehumidification, while winters — especially up in the 4A Ozark highlands — impose heating loads that hot-Southern states never see. We size equipment for that two-season reality rather than optimizing for cooling alone, and we detail freeze protection and combustion or heat-pump heating appropriate to the northern markets. Northwest Arkansas's explosive growth means a lot of our work is distribution, manufacturing, and corporate build-out, where right-sized electrical service, efficient large-volume HVAC, and lighting controls drive both cost and code compliance. Because the state adopts a recent IECC edition for commercial energy, our HVAC, lighting, and plumbing documentation is matched to the enforced edition with ASHRAE 90.1 available as an alternate. Severe-weather resilience — standby power and hardened distribution — is a frequent add for facilities that must stay operational.",
    structural:
      "Arkansas structural design carries a hazard that surprises engineers used to the calm Mid-South: the New Madrid Seismic Zone. In the northeast corner near the Mississippi River, seismic demand climbs into Seismic Design Category C–D, so ductile detailing, drift control, and anchorage become governing considerations — a stark contrast to the SDC A–B baseline in the state's west and south. We evaluate site-specific seismic parameters early because they change the lateral system entirely. Wind and tornado exposure add storm-shelter demand for schools and institutional projects, detailed to ICC 500 where required. Foundations respond to expansive soils in some regions and to flood/scour exposure along the major river corridors, always driven by the geotechnical report. The upshot is that where a project sits in Arkansas — northeast versus northwest — can completely reset its structural design basis.",
    civil:
      "Civil and site engineering in Arkansas contends with intense convective rainfall and significant river-corridor flooding along the Mississippi, Arkansas, and White Rivers. We design detention and conveyance to local drainage criteria sized for the region's heavy storm events, and integrate FEMA floodplain requirements where sites sit in mapped flood zones. Northwest Arkansas's rapid development has pushed cities like Fayetteville, Springdale, and Bentonville to tighten stormwater-quality and low-impact-development expectations, so our grading and drainage packages reflect those local standards. Sites disturbing an acre or more require ADEQ construction stormwater permit coverage and a SWPPP. Expansive soils in some areas shape pavement sections and utility trenching, coordinated with the geotechnical recommendations. The consistent theme is designing site drainage that performs under both the region's downpours and its river-flood exposure.",
    energy:
      "Arkansas adopts a state-level commercial energy code tracking a recent IECC edition, with ASHRAE 90.1 as an accepted alternate path, giving projects a consistent statewide baseline. In Arkansas's mixed-humid climate (zones 3A–4A), the compliance calculus balances cooling-season humidity control against real winter heating loads — meaningful envelope insulation earns its place here, unlike in hot-dry climates where cooling dominates. We prepare COMcheck or whole-building energy modeling against the enforced edition and coordinate envelope U-factors, lighting power density, and mechanical efficiencies as an integrated package. For the large distribution and manufacturing buildings common in Northwest Arkansas, envelope air-tightness and efficient, right-sized HVAC over enormous volumes are the highest-leverage moves. Where owners pursue above-code performance or incentives, we quantify the return rather than treating energy compliance as a checkbox exercise.",
  },
  faqs: [
    {
      q: "What building code does Arkansas enforce?",
      a: "Commercial construction is governed by the Arkansas Fire Prevention Code, administered by the State Fire Marshal, which incorporates the IBC with state amendments. This gives Arkansas a statewide baseline, though Little Rock and the Northwest Arkansas cities run their own building departments and plan review.",
    },
    {
      q: "Is seismic design required in Arkansas?",
      a: "In the northeast, yes. The New Madrid Seismic Zone raises seismic demand to Seismic Design Category C–D near the Mississippi River corner, requiring ductile detailing and drift control. The west and south of the state fall to a much lower SDC A–B baseline, so we evaluate site-specific parameters up front.",
    },
    {
      q: "Which energy code applies to Arkansas commercial buildings?",
      a: "Arkansas adopts a state-level commercial energy code tracking a recent IECC edition, with ASHRAE 90.1 as an alternate compliance path. We prepare COMcheck or energy-model documentation matched to the enforced edition and coordinate envelope, lighting, and mechanical compliance together.",
    },
    {
      q: "What stormwater permitting applies to Arkansas construction?",
      a: "Sites disturbing one acre or more require ADEQ construction stormwater permit coverage with a SWPPP. Detention and conveyance are designed to local city drainage criteria, and floodplain requirements apply along the Mississippi, Arkansas, and White River corridors.",
    },
  ],
};
