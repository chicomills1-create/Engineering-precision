import type { StateData } from "../types";

export const oklahoma: StateData = {
  slug: "oklahoma",
  name: "Oklahoma",
  abbrev: "OK",
  lastVerified: "2026-07-28",
  buildingCode: {
    name: "2018 International Building Code adopted statewide by the Oklahoma Uniform Building Code Commission",
    baseCode: "2018 IBC with Oklahoma amendments",
    notes:
      "Oklahoma is one of the states with a genuine statewide minimum: the Uniform Building Code Commission (UBCC) adopts the base codes, currently the 2018 IBC, and local jurisdictions may adopt the same or a more recent edition but not a weaker one. Municipalities still administer their own plan review and amendments.",
  },
  energyCode: {
    commercial: "2018 IECC (adopted with the 2018 code package by the Uniform Building Code Commission); ASHRAE 90.1-2016 as an alternate path",
    notes:
      "The commercial energy code tracks the state-adopted 2018 IECC. Enforcement is administered locally, and stringency is moderate relative to leading-edge states; ASHRAE 90.1 remains an accepted compliance route.",
  },
  climate: {
    zones: "3A in the southeast, 3B/4B across the central and Panhandle regions",
    drivers: [
      "Severe convective storms and extreme wind/hail in Tornado Alley",
      "Wide seasonal temperature swings between hot summers and cold snaps",
      "Elevated tornado shelter and safe-room demand",
      "Induced seismicity from wastewater injection in central Oklahoma",
    ],
  },
  structural: {
    seismic: "Historically low, but induced seismicity from oil-and-gas wastewater injection has raised hazard in central Oklahoma — some sites warrant elevated seismic attention beyond the traditional SDC A–B baseline",
    wind: "Basic wind speeds around 105–115 mph (Risk Category II), with strong demand for ICC 500 storm shelters and safe rooms in tornado-exposed markets",
    snow: "Low ground snow loads, generally 5–15 psf increasing modestly to the north and Panhandle",
    other: "Expansive clay soils across central Oklahoma affect foundation design; hail exposure drives roof and cladding durability choices",
  },
  licensure: {
    board: "Oklahoma State Board of Licensure for Professional Engineers and Land Surveyors (OSBELS)",
    notes: "Oklahoma offers licensure by comity for NCEES-record engineers and requires a Certificate of Authorization for firms. Digital seals are accepted per board rules.",
  },
  metros: ["Oklahoma City", "Tulsa", "Norman", "Broken Arrow", "Edmond", "Lawton"],
  permitting:
    "Because the state adopts a uniform base code, the governing edition is more predictable than in home-rule states, but Oklahoma City and Tulsa administer their own plan review, amendments, and inspection programs. Storm-shelter and safe-room review has become a routine part of commercial and institutional permitting in tornado-prone jurisdictions.",
  marketNotes:
    "Oklahoma's construction market is anchored by energy-sector facilities, aerospace and defense around Oklahoma City and Tulsa, healthcare expansion, and a growing logistics and data-center presence. Public-sector and education construction remains steady, with storm-resilience features increasingly specified.",
  narratives: {
    mep:
      "MEP engineering in Oklahoma has to respect a climate that swings hard in both directions — hot, humid summers give way to sharp winter cold snaps, so we size heating and cooling for a wide design-temperature band rather than a single dominant season. In climate zones 3A through 4B, that means balanced equipment selection, freeze protection on exposed piping, and controls that transition cleanly between modes. Because Oklahoma adopts the 2018 IECC statewide, our HVAC, lighting, and service designs are documented to that edition, with ASHRAE 90.1-2016 available as an alternate path. Storm resilience shapes the electrical scope more than in calmer states: we frequently coordinate standby power and hardened distribution for facilities that double as shelter or must stay operational through severe-weather events. Hail exposure also pushes us toward protected or elevated equipment locations on rooftop mechanical layouts.",
    structural:
      "Structural design in Oklahoma is increasingly a two-hazard problem. Wind is the historic driver — Tornado Alley demand means many commercial, school, and institutional projects incorporate ICC 500 storm shelters or safe rooms, and we detail those to resist debris impact and extreme pressures well beyond the base 110-ish mph design wind. The newer variable is seismic: induced seismicity from wastewater injection has measurably raised earthquake hazard in central Oklahoma, so we no longer assume the old low-seismic default and instead check site-specific parameters that can push a project above the traditional SDC A–B baseline. Foundations contend with expansive central-Oklahoma clays, which the geotechnical report governs. The result is a design that hedges against both a rare violent wind event and a more frequent moderate ground motion — a combination unique to this state.",
    civil:
      "Civil and site work in Oklahoma balances stormwater performance against a climate of intense, short-duration convective rainfall. We design detention and conveyance for the high-intensity storms typical of the southern plains, following Oklahoma City's and Tulsa's local drainage criteria rather than a generic standard. Sites over an acre require Oklahoma DEQ construction stormwater (OKR10) coverage and a SWPPP, and erosion control has to hold up under the wind and downpour bursts that come with severe-weather season. Expansive clays complicate pavement sections and utility trench backfill, so we coordinate subgrade treatment with the geotechnical recommendations. Because the state adopts a uniform base code, our grading and site-utility packages can lean on predictable structural and accessibility requirements while we tune the drainage design to each city's published manual.",
    energy:
      "Oklahoma provides a clear statewide energy baseline: the 2018 IECC adopted through the Uniform Building Code Commission, with ASHRAE 90.1-2016 as an accepted alternate path. That statewide floor removes much of the guesswork found in home-rule states, though cities administer review and inspection locally. In Oklahoma's mixed climate (zones 3A–4B), the compliance sweet spot balances envelope investment against mechanical efficiency — meaningful wall and roof insulation earns its keep here because winter heating loads are real, unlike in hot-dry states where cooling dominates. We run COMcheck or whole-building modeling against the adopted 2018 IECC and coordinate lighting power density, envelope U-factors, and equipment efficiencies as a package. Where a project pursues incentives or above-code performance, we quantify the payback rather than treating energy compliance as paperwork.",
  },
  faqs: [
    {
      q: "Does Oklahoma have a statewide building code?",
      a: "Yes. The Oklahoma Uniform Building Code Commission adopts a statewide minimum — currently the 2018 IBC and 2018 IECC. Local jurisdictions may match or exceed the state edition but cannot enforce a weaker one, and they administer their own plan review and amendments.",
    },
    {
      q: "Do Oklahoma projects need storm shelters or safe rooms?",
      a: "Many do. In tornado-exposed markets, schools, institutional buildings, and some commercial projects incorporate ICC 500 storm shelters or FEMA safe rooms, which we design to resist extreme wind pressures and windborne-debris impact well beyond the base design wind speed.",
    },
    {
      q: "Is seismic design a concern in Oklahoma?",
      a: "Increasingly, yes. Induced seismicity from wastewater injection has raised earthquake hazard in central Oklahoma, so we evaluate site-specific seismic parameters rather than assuming the traditional low-seismic default, and some sites warrant elevated seismic detailing.",
    },
    {
      q: "What stormwater permitting applies to Oklahoma construction?",
      a: "Sites disturbing one acre or more require Oklahoma DEQ construction stormwater (OKR10) permit coverage with a SWPPP. Detention and conveyance are designed to the local city drainage criteria, sized for the high-intensity convective storms typical of the region.",
    },
  ],
};
