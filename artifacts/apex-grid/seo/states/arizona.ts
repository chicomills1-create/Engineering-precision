import type { StateData } from "../types";

export const arizona: StateData = {
  slug: "arizona",
  name: "Arizona",
  abbrev: "AZ",
  lastVerified: "2026-07-28",
  buildingCode: {
    name: "Local adoption of the International Building Code (most jurisdictions on 2018 IBC)",
    baseCode: "IBC with local amendments; no statewide mandatory building code",
    notes:
      "Arizona is a home-rule state: each city and county adopts its own code cycle. Phoenix and Mesa run the 2018 IBC with local amendments, while some rural counties still enforce older editions — the governing edition must be confirmed with the specific AHJ before design starts.",
  },
  energyCode: {
    commercial: "Varies by jurisdiction — Phoenix enforces the 2018 IECC; Tucson has adopted the 2018 IECC with local amendments",
    notes:
      "With no statewide energy code, commercial energy compliance in Arizona is a city-by-city question. COMcheck runs must target the exact IECC edition of the permitting jurisdiction.",
    beyondCode: "Tucson has committed to advanced energy-code adoption cycles; several Valley cities offer expedited permitting for above-code projects.",
  },
  climate: {
    zones: "2B (hot-dry) across Phoenix/Tucson; 4B–5B in Flagstaff and the high country",
    drivers: [
      "115°F+ design cooling temperatures in the Valley",
      "Monsoon dust and haboob-driven filtration requirements",
      "70°F+ diurnal swings favoring economizer strategies",
      "Flagstaff heating loads comparable to the Midwest",
    ],
  },
  structural: {
    seismic: "Predominantly Seismic Design Category B–C — lower than California, but seismic detailing still governs some essential facilities",
    wind: "Basic wind speeds around 105–115 mph (Risk Category II); monsoon microbursts drive roof-uplift attention",
    snow: "Negligible in the Valley; Flagstaff ground snow loads run 55–90+ psf and govern high-country roof design",
    other: "Expansive and collapsible soils across the Valley make geotechnical coordination critical for foundations",
  },
  licensure: {
    board: "Arizona State Board of Technical Registration (BTR)",
    notes: "Arizona grants licensure by comity for NCEES-record engineers; electronic seals are accepted for digital plan submittals.",
  },
  metros: ["Phoenix", "Tucson", "Mesa", "Chandler", "Queen Creek", "Scottsdale", "Flagstaff"],
  permitting:
    "The Phoenix metro's fast-growth cities (Queen Creek, Buckeye, Casa Grande) run comparatively fast plan review but enforce aggressively on drainage and dust control. Maricopa County handles unincorporated land; Phoenix offers a self-certification program for qualifying professionals that can cut weeks off permitting.",
  marketNotes:
    "Arizona is one of the fastest-growing industrial markets in the country, anchored by semiconductor fabs in north Phoenix and the data-center corridor in Mesa and Goodyear. Advanced manufacturing, healthcare expansion, and Southeast Valley residential growth keep MEP and site-engineering demand high.",
  narratives: {
    mep:
      "Mechanical design in Arizona is dominated by the cooling load: Valley projects see 115°F+ design days, so equipment selections carry high-ambient derates that out-of-state engineers routinely miss — a rooftop unit that meets load in Denver can fall 10–15% short in Phoenix in July. We size for ASHRAE 0.4% design conditions with ambient derating, specify MERV upgrades for monsoon dust seasons, and lean on the desert's dry air for evaporative and economizer strategies that cut energy cost on warehouses and data-adjacent shells. Arizona utility realities also matter: SRP and APS demand-charge structures reward load-shifting and right-sized electrical services.",
    structural:
      "Arizona structural work is less about seismic and more about what's under the slab: large areas of the Valley sit on expansive or collapsible soils, and foundation systems (post-tensioned slabs, deepened footings, overexcavation) are driven by the geotechnical report as much as by the frame above. Roof design must respect monsoon microburst uplift, and any project in the Flagstaff area shifts into a different regime entirely — 55–90+ psf ground snow loads with hard-freeze detailing. We coordinate SDC B–C seismic detailing where it applies and confirm the governing IBC edition per jurisdiction, since Arizona has no statewide code.",
    civil:
      "Site engineering in the Phoenix metro lives and dies by drainage: most Valley jurisdictions require first-flush retention (commonly the 100-year, 2-hour storm volume) rather than detention-and-release, which shapes grading plans and eats site area if not planned early. Dust control permits (Maricopa County Rule 310) apply to virtually any disturbance over one-tenth of an acre. Our civil team designs retention basins, storm drain systems, and ADA-compliant grading tuned to each city's engineering standards — Queen Creek, Mesa, and Gilbert each publish their own supplement to MAG specifications.",
    energy:
      "Arizona has no statewide energy code, which makes commercial energy compliance a jurisdiction-mapping exercise: Phoenix enforces the 2018 IECC, Tucson its amended 2018 IECC, and some outlying jurisdictions have no adopted energy code at all. We run COMcheck against the exact edition the AHJ enforces and flag the trap of designing to the wrong cycle. In climate zone 2B, envelope trade-offs work differently than most of the country — cool roofs and low-SHGC glazing return more than added wall insulation, and right-sizing cooling plants is the single biggest compliance-and-cost lever.",
  },
  faqs: [
    {
      q: "Which building code applies to my Arizona project?",
      a: "It depends on the city or county issuing the permit. Arizona has no statewide mandatory building code — Phoenix and most Valley cities enforce the 2018 IBC with local amendments, but editions vary by jurisdiction. We confirm the governing code cycle with the AHJ at project kickoff.",
    },
    {
      q: "Does Arizona require energy code compliance for commercial buildings?",
      a: "Only where the local jurisdiction has adopted an energy code. Phoenix and Tucson enforce versions of the 2018 IECC; some rural jurisdictions have none. Compliance documentation (typically COMcheck) must match the specific edition your permitting city enforces.",
    },
    {
      q: "Do I need special foundation engineering in the Phoenix area?",
      a: "Often, yes. Much of the Valley has expansive or collapsible soils, and cities require foundation design to follow the project geotechnical report. Post-tensioned slabs and overexcavation/recompaction are common mitigation approaches.",
    },
    {
      q: "How does stormwater retention work in Maricopa County?",
      a: "Most Valley jurisdictions require on-site retention of the 100-year, 2-hour storm volume rather than simple detention. Retention basin sizing and location should be resolved during preliminary site layout because it directly affects developable area.",
    },
  ],
};
