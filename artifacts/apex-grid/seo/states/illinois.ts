import type { StateData } from "../types";

export const illinois: StateData = {
  slug: "illinois",
  name: "Illinois",
  abbrev: "IL",
  lastVerified: "2026-07-28",
  buildingCode: {
    name: "No single statewide commercial building code — local adoption of the IBC (Chicago runs its own code)",
    baseCode: "IBC with local amendments; Chicago Construction Codes are a customized IBC-based system",
    notes:
      "Illinois is a home-rule state with no comprehensive statewide commercial building code; municipalities adopt their own IBC editions. Chicago enforces the Chicago Construction Codes, a heavily customized code aligned to a recent IBC. The governing code and edition must be confirmed with the specific jurisdiction, which can differ sharply between Chicago, suburban Cook County towns, and downstate cities.",
  },
  energyCode: {
    commercial: "Illinois Energy Conservation Code — statewide, currently based on the 2021 IECC",
    notes:
      "Unlike its building code, Illinois does adopt a statewide, mandatory commercial energy code (the Illinois Energy Conservation Code), updated on a regular cycle and currently aligned to the 2021 IECC. This is one of the more stringent Midwest energy baselines and applies even where building-code adoption varies locally.",
    beyondCode: "Chicago has building energy benchmarking and disclosure ordinances, and the state has moved toward stretch-code authority for local governments.",
  },
  climate: {
    zones: "5A across most of the state, transitioning to 4A in the far south",
    drivers: [
      "Cold, windy winters with substantial heating loads (Chicago lakefront wind exposure)",
      "Humid summers requiring dehumidification and latent-load control",
      "Lake-effect and wind-driven snow near Lake Michigan",
      "Tornado and severe-storm exposure across the state",
    ],
  },
  structural: {
    seismic: "Low in the north (SDC A–B), but far-southern Illinois near the New Madrid and Wabash Valley seismic zones can reach SDC D — among the highest in the Midwest — requiring rigorous seismic design",
    wind: "Basic wind speeds around 105–115 mph (Risk Category II); Chicago's lakefront exposure raises design pressures on tall buildings",
    snow: "Ground snow loads commonly around 20–25 psf, higher near Lake Michigan with drift considerations",
    other: "Frost depths near 42 inches in the Chicago area govern footings; soft lacustrine and organic soils near the lake require deep foundations",
  },
  licensure: {
    board: "Illinois Department of Financial and Professional Regulation (IDFPR) — Board of Professional Engineers",
    notes: "Illinois licenses engineers by endorsement for those with an NCEES record; electronic seals and digital signatures are accepted for plan submittals under IDFPR rules.",
  },
  metros: ["Chicago", "Aurora", "Naperville", "Joliet", "Rockford", "Springfield"],
  permitting:
    "Permitting in Illinois is highly localized. Chicago runs a rigorous, self-certification-eligible review under the Chicago Construction Codes, while suburban municipalities and downstate cities each set their own review processes and adopted editions. There is no statewide building permit, so early AHJ confirmation is essential — but the statewide energy code applies regardless of jurisdiction.",
  marketNotes:
    "Chicagoland anchors one of the nation's largest logistics and industrial markets, with heavy warehouse and data-center development in the outer suburbs and Joliet/I-80 corridor. Downtown Chicago sustains high-rise, healthcare, and institutional work, while downstate activity centers on manufacturing, agriculture-adjacent processing, and higher education.",
  narratives: {
    mep:
      "Illinois MEP design is a study in contrasts: a cold, wind-exposed Chicago lakefront on one end and humid downstate summers on the other, all within climate zone 5A (4A in the far south). Heating loads dominate energy use, so we evaluate high-efficiency boilers, VRF, and cold-climate heat pumps and detail freeze protection for Chicago winters, while sizing dehumidification for muggy summers. A distinguishing feature of Illinois is the statewide energy code based on the 2021 IECC — one of the stricter Midwest baselines — so even where building-code adoption varies by town, our mechanical and lighting designs must meet a consistent, relatively aggressive energy standard. Electrically, the region's massive logistics and data-center buildout in the suburbs and the Joliet corridor drives large service sizing and utility coordination with ComEd and Ameren, and Chicago high-rise work brings its own emergency-power and life-safety demands under the Chicago Construction Codes.",
    structural:
      "The structural story in Illinois splits north to south. In and around Chicago, low seismicity (SDC A–B) means wind and snow govern, with the lakefront raising wind pressures on tall buildings and soft lacustrine/organic soils near the lake often requiring caissons or deep foundations to bedrock. Frost depths near 42 inches set footing depth. Head to far-southern Illinois, though, and the New Madrid and Wabash Valley seismic zones can push design into SDC D — among the most demanding in the Midwest — where ductile detailing and careful lateral design are non-negotiable. Ground snow loads are moderate but require drift analysis near the lake. Because Illinois has no unified statewide building code, we confirm the governing IBC edition (or the distinct Chicago Construction Codes) with the specific jurisdiction and design the gravity and lateral systems to that basis.",
    civil:
      "Site engineering in Illinois is shaped by strong stormwater regulation, especially in the Chicago region. Cook County and the collar counties enforce a Watershed Management Ordinance with demanding detention, volume-control, and water-quality requirements that often exceed the statewide baseline, and NPDES construction stormwater coverage (ILR10) applies to sites disturbing an acre or more. We design detention and volume-control practices to the applicable county watershed ordinance, which can consume significant site area, so we resolve it during preliminary layout. Flat terrain, tight clay soils, and high groundwater near the lake complicate infiltration-based practices, and combined-sewer areas in Chicago add release-rate constraints. For the large warehouse and data-center sites driving the market, we plan grading and detention to handle expansive impervious areas while meeting each jurisdiction's water-quality volume.",
    energy:
      "Illinois is unusual in the Midwest: it enforces a statewide, regularly updated commercial energy code — currently the 2021 IECC — that applies even where local building-code adoption varies. That makes energy compliance one of the most consistent aspects of designing in Illinois, and one of the more stringent. We document compliance via COMcheck or whole-building energy modeling against the 2021 IECC, and in Chicago we account for building benchmarking and disclosure ordinances that carry compliance beyond permit day. In climate zone 5A the highest-value measures are envelope-driven — continuous insulation, air tightness, and high-performance glazing — followed by efficient heating and daylight-responsive lighting. We also map ComEd and Ameren incentive programs that reward exceeding code, which helps offset the cost of the state's relatively aggressive baseline.",
  },
  faqs: [
    {
      q: "Does Illinois have a statewide building code?",
      a: "No comprehensive statewide commercial building code — municipalities adopt their own IBC editions, and Chicago enforces its own Chicago Construction Codes. We confirm the governing code and edition with each jurisdiction. Illinois does, however, have a statewide energy code that applies everywhere.",
    },
    {
      q: "Which energy code applies to Illinois commercial buildings?",
      a: "The statewide Illinois Energy Conservation Code, currently based on the 2021 IECC, applies to commercial construction across the state regardless of local building-code adoption. It is one of the stricter Midwest baselines, and Chicago adds benchmarking and disclosure requirements.",
    },
    {
      q: "Is seismic design required in Illinois?",
      a: "In the Chicago area, seismic demand is low (SDC A–B) and wind/snow govern. But far-southern Illinois near the New Madrid and Wabash Valley zones can reach SDC D, among the highest in the Midwest, requiring rigorous ductile seismic detailing. We evaluate SDC by site.",
    },
    {
      q: "What stormwater requirements apply in the Chicago region?",
      a: "Cook County and the collar counties enforce Watershed Management Ordinances with demanding detention, volume-control, and water-quality standards, on top of the NPDES ILR10 construction permit for sites disturbing an acre or more. We size detention early because it can heavily affect developable area.",
    },
  ],
};
