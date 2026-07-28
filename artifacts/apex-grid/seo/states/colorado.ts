import type { StateData } from "../types";

export const colorado: StateData = {
  slug: "colorado",
  name: "Colorado",
  abbrev: "CO",
  lastVerified: "2026-07-28",
  buildingCode: {
    name: "Local adoption of the International Building Code (most Front Range jurisdictions on 2018 or 2021 IBC)",
    baseCode: "IBC with local amendments; no statewide mandatory commercial building code",
    notes:
      "Colorado is a home-rule state with no statewide building code — each municipality and county adopts and amends its own IBC edition. Denver, Boulder, Colorado Springs, and Fort Collins run different editions and amendments, so the governing code must be confirmed with the specific AHJ.",
  },
  energyCode: {
    commercial: "2021 IECC (state law now requires jurisdictions to adopt a recent energy code; many Front Range cities enforce the 2021 IECC)",
    notes:
      "Colorado enacted legislation (HB21-1286 / HB22-1362) requiring local governments that adopt building codes to update to specified recent energy code editions, moving the state toward the 2021 IECC and beyond. The exact edition and amendments still run through local building departments.",
    beyondCode: "Denver's Energize Denver benchmarking and building-performance ordinance, Boulder's SmartRegs and reach codes, and Xcel Energy commercial efficiency programs push well beyond baseline code.",
  },
  climate: {
    zones: "5B across the Front Range (Denver, Colorado Springs, Fort Collins); 6B–7 in the mountains and 4B on the eastern plains/western slope",
    drivers: [
      "Cold, sunny winters with strong solar gain and high heating loads",
      "High altitude affecting combustion, equipment capacity, and pressurization",
      "Large diurnal temperature swings favoring economizers",
      "Intense mountain snow loads and freeze-thaw at elevation",
    ],
  },
  structural: {
    seismic: "Generally low to moderate — SDC B common on the Front Range, though wind and snow typically govern lateral and roof design",
    wind: "Basic wind speeds elevated along the Front Range and foothills (commonly 115–150+ mph in downslope wind zones near Boulder and the foothills)",
    snow: "Substantial and elevation-driven — Front Range ground snow around 30 psf, climbing to 100+ psf in the high country and mountain towns",
    other: "Expansive and swelling soils (bentonite/claystone) are a defining Front Range hazard, requiring specialized foundation design and slab systems",
  },
  licensure: {
    board: "Colorado State Board of Licensure for Architects, Professional Engineers, and Professional Land Surveyors",
    notes: "Colorado licenses PEs by endorsement for qualified out-of-state applicants and accepts electronic seals for digital submittals.",
  },
  metros: ["Denver", "Colorado Springs", "Aurora", "Fort Collins", "Boulder", "Grand Junction"],
  permitting:
    "Front Range permitting varies by home-rule municipality: Denver and Boulder maintain rigorous, sustainability-focused review, while suburban and plains jurisdictions can move faster. Expansive-soils documentation and geotechnical reports are standard, and Denver's Energize Denver program adds performance-tracking obligations for larger existing buildings.",
  marketNotes:
    "Colorado's construction market spans the Denver metro's data-center, life-science, and warehouse growth, aerospace and defense in Colorado Springs, and steady expansion in Fort Collins and the northern Front Range. Aggressive municipal decarbonization and electrification policies are reshaping commercial MEP and energy design.",
  narratives: {
    mep:
      "MEP engineering in Colorado has to account for altitude before anything else — at Denver's mile-high elevation and higher in the mountains, air density drops, so combustion equipment, cooling capacity, fan systems, and pressurization all require altitude corrections that flatland engineers routinely miss. The climate is cold and sunny with big diurnal swings, so we lean heavily on economizers and design robust heating with attention to the strong passive solar gain through south glazing. Denver's Energize Denver benchmarking ordinance and Boulder's reach codes push electrification and heat-pump adoption, so we increasingly design heat-pump and hybrid systems and coordinate with Xcel Energy's commercial efficiency programs. Because Colorado has no statewide code, we confirm each jurisdiction's adopted mechanical and energy editions up front and document compliance to the exact edition the permitting city enforces.",
    structural:
      "Colorado structural design is governed less by seismic — much of the Front Range is only SDC B — and more by wind, snow, and soil. Downslope windstorm zones near the Boulder foothills drive basic wind speeds well above the regional norm, and mountain snow loads climbing past 100 psf govern roof framing at elevation. The defining Colorado hazard, though, is underfoot: expansive, swelling bentonite and claystone soils across the Front Range can heave and destroy conventional slabs, so we coordinate closely with geotechnical engineers on drilled-pier foundations, structural (void-form) floor slabs, and moisture-control detailing. We confirm the governing IBC edition per home-rule jurisdiction and tailor lateral and gravity systems to the specific wind, snow, and soil conditions of each site.",
    civil:
      "Civil and site engineering in Colorado combines steep-terrain hydrology with strict water-quality expectations, particularly along the Front Range where the Urban Drainage (Mile High Flood District) criteria heavily influence detention and water-quality design. Snowmelt, cloudburst thunderstorms, and the region's swelling soils all factor into grading and drainage, and expansive soils require careful subgrade and pavement design as well as foundation work. We design detention and water-quality facilities, storm-drain systems, utility connections, and ADA-compliant grading to each municipality's published standards, and manage erosion control and SWPPP documentation under Colorado's construction stormwater permit. On the western slope and mountain sites, floodplain and steep-slope constraints reshape site layout, so we resolve drainage strategy during preliminary design.",
    energy:
      "Colorado has moved aggressively on energy code: state legislation now requires jurisdictions that adopt building codes to update to recent editions, pushing the Front Range toward the 2021 IECC and beyond, while Denver's Energize Denver ordinance sets performance targets for larger existing buildings. Because adoption still runs through home-rule cities, we run COMcheck against the exact edition and amendments the permitting jurisdiction enforces. In the cold, sunny, high-altitude climate, envelope air-tightness and insulation pay back strongly against heating loads, and we exploit economizer potential and passive solar orientation. We also help clients align with Xcel Energy commercial rebates and evaluate electrification and heat-pump strategies that satisfy both increasingly strict codes and municipal decarbonization mandates.",
  },
  faqs: [
    {
      q: "Which building code applies to my Colorado project?",
      a: "It depends on the municipality — Colorado is a home-rule state with no statewide commercial building code. Denver, Boulder, Colorado Springs, and Fort Collins each adopt and amend their own IBC edition, so we confirm the governing code cycle with the specific building department before design.",
    },
    {
      q: "What energy code does Colorado enforce for commercial buildings?",
      a: "State law now requires code-adopting jurisdictions to update to recent energy code editions, moving much of the Front Range to the 2021 IECC and beyond. The exact edition still varies locally, and Denver adds the Energize Denver benchmarking and performance ordinance for larger buildings, so we document compliance to the specific jurisdiction's requirements.",
    },
    {
      q: "Why do Colorado foundations need special design?",
      a: "Much of the Front Range sits on expansive, swelling bentonite and claystone soils that can heave and damage conventional foundations and slabs. We coordinate with geotechnical engineers to design drilled-pier foundations, structural void-form slabs, and moisture control tailored to the soil report.",
    },
    {
      q: "Do I need to account for altitude in Colorado MEP design?",
      a: "Yes. At Denver's elevation and higher, reduced air density requires altitude corrections for combustion equipment, cooling capacity, fan systems, and building pressurization. Ignoring these corrections leads to undersized or improperly derated equipment.",
    },
  ],
};
