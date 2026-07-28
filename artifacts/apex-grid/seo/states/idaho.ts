import type { StateData } from "../types";

export const idaho: StateData = {
  slug: "idaho",
  name: "Idaho",
  abbrev: "ID",
  lastVerified: "2026-07-28",
  buildingCode: {
    name: "Idaho state-adopted International Building Code (2018 IBC with Idaho amendments)",
    baseCode: "2018 IBC with Idaho amendments",
    notes:
      "Idaho adopts a statewide building code through the Division of Occupational and Professional Licenses / Idaho Building Code Board; the base edition is set at the state level, with local jurisdictions administering enforcement. The governing edition should be confirmed with the local building department.",
  },
  energyCode: {
    commercial: "2018 IECC (Idaho-adopted, with state amendments)",
    notes:
      "Idaho adopts the commercial energy provisions statewide but has historically stayed a cycle or two behind the newest IECC, and the legislature reviews amendments closely. COMcheck documentation should target the adopted edition and Idaho amendments.",
    beyondCode: "Idaho Power and other utilities offer commercial energy-efficiency incentives; there is limited stretch-code activity given the statewide adoption framework.",
  },
  climate: {
    zones: "5B across the Treasure Valley (Boise, Nampa) and much of the state; 6B at higher elevations and in the mountains",
    drivers: [
      "Cold winters with significant heating loads statewide",
      "Hot-dry summers with large diurnal swings favoring economizers",
      "High-elevation mountain climates in the central and eastern regions",
      "Low humidity enabling evaporative and night-flush cooling strategies",
    ],
  },
  structural: {
    seismic: "Variable — generally moderate (SDC C) in the Treasure Valley, but central and eastern Idaho sit near active faults (e.g., the Lost River Fault, source of the 1983 Borah Peak earthquake) with higher demand",
    wind: "Basic wind speeds generally 105–115 mph (Risk Category II); exposed high terrain sees higher local gusts",
    snow: "Substantial and elevation-driven — valley loads are meaningful and mountain/resort-town loads (Sun Valley, McCall, Idaho Panhandle) can exceed 100+ psf",
    other: "Frost depth and freeze-thaw drive foundation depth statewide; expansive and collapsible soils occur in parts of the Snake River Plain",
  },
  licensure: {
    board: "Idaho Board of Licensure of Professional Engineers and Professional Land Surveyors (IPELS)",
    notes: "Idaho offers comity licensure for qualified out-of-state PEs and accepts electronic seals for digital plan submittals.",
  },
  metros: ["Boise", "Nampa", "Meridian", "Idaho Falls", "Coeur d'Alene", "Pocatello"],
  permitting:
    "The fast-growing Treasure Valley (Boise, Meridian, Nampa) runs active plan review with strong growth pressure on drainage, traffic, and infrastructure; Ada County Highway District (ACHD) uniquely controls roads and much of the drainage in the Boise metro. Mountain and resort jurisdictions add snow-load and wildfire-interface scrutiny.",
  marketNotes:
    "Idaho has been one of the fastest-growing states in the nation, led by the Treasure Valley's population boom, semiconductor expansion (Micron in Boise), warehouse and manufacturing growth, and resort development around Sun Valley and the Panhandle. This growth sustains strong demand for MEP, structural, and civil engineering.",
  narratives: {
    mep:
      "Idaho MEP design contends with a true four-season, cold-winter/hot-dry-summer climate, so our mechanical systems deliver robust heating with freeze protection while managing significant summer cooling and the large diurnal swings that make economizer operation productive for much of the year. The low humidity across the Snake River Plain also makes evaporative and night-flush cooling viable on the right building types. At elevation in the central mountains and the Panhandle we apply altitude corrections to combustion and equipment capacity. The Treasure Valley's rapid growth — anchored by Micron's semiconductor expansion — drives large, reliable electrical services, and we coordinate with Idaho Power on capacity and commercial efficiency incentives. Mechanical and lighting compliance is documented to Idaho's statewide-adopted energy code, confirming the exact edition and state amendments the permitting jurisdiction enforces.",
    structural:
      "Idaho structural engineering has to respect a seismic landscape that surprises many: while the Treasure Valley is moderate (roughly SDC C), central and eastern Idaho sit near active faults — the Lost River Fault produced the 1983 Borah Peak earthquake, one of the largest in the intermountain West — so seismic demand can be significant on projects there, and we detail lateral systems to the site-specific hazard. Snow is often the governing load: valley loads are meaningful and mountain and resort-town roofs at Sun Valley, McCall, and the Panhandle can exceed 100 psf, so we combine high snow with the applicable seismic demand. Frost depth and freeze-thaw drive foundation embedment statewide, and expansive or collapsible soils in parts of the Snake River Plain require geotechnically driven foundation design. We confirm the governing IBC edition with the local jurisdiction under Idaho's statewide adoption.",
    civil:
      "Civil engineering in the Treasure Valley carries a distinctive wrinkle: the Ada County Highway District controls roads and much of the public drainage across the Boise metro, so site design must satisfy ACHD standards in addition to city land-use requirements — an agency structure out-of-state teams often overlook. Irrigation and pressurized-irrigation systems tied to the region's agricultural water rights add utility coordination unfamiliar elsewhere. Snowmelt, freeze-thaw, and the valley's growth-driven capacity pressures shape grading, detention, and storm-drain design. We design detention and water-quality facilities, utility connections, and ADA-compliant grading to each jurisdiction's standards and manage SWPPP documentation under Idaho's construction stormwater permit. In mountain and resort areas, steep terrain, wildfire interface, and heavy snowmelt reshape drainage strategy, so we tailor the approach regionally.",
    energy:
      "Idaho adopts commercial energy provisions statewide, giving a consistent baseline, though the state has historically tracked a cycle or two behind the newest IECC and the legislature scrutinizes amendments closely. We run COMcheck against the exact adopted edition and Idaho amendments the permitting jurisdiction enforces. In Idaho's cold, dry climate zones (largely 5B and 6B), envelope insulation, air-tightness, and high-performance glazing pay back strongly against winter heating, while efficient heating equipment and heat recovery drive mechanical compliance and economizers capture the dry-climate cooling advantage. We help clients pair compliance with Idaho Power and other utility commercial incentives so above-code envelope and equipment choices recover cost through rebates as well as reduced operating expense.",
  },
  faqs: [
    {
      q: "Which building code applies to my Idaho project?",
      a: "Idaho adopts a statewide building code (based on the 2018 IBC with Idaho amendments) through the state building code board, with local jurisdictions administering enforcement. We confirm the governing edition and any local specifics with the permitting building department at project kickoff.",
    },
    {
      q: "What energy code does Idaho enforce for commercial buildings?",
      a: "Idaho adopts the commercial IECC statewide with state amendments, historically staying a cycle or two behind the newest edition. We document compliance with COMcheck against the exact adopted edition and Idaho amendments, and can align the design with Idaho Power commercial efficiency incentives.",
    },
    {
      q: "Is seismic design a concern in Idaho?",
      a: "It depends on location. The Treasure Valley is moderate (around Seismic Design Category C), but central and eastern Idaho sit near active faults — the Lost River Fault caused the large 1983 Borah Peak earthquake — so seismic demand can be significant and must be detailed to the site-specific hazard.",
    },
    {
      q: "Who controls drainage and roads for Boise-area site design?",
      a: "In the Boise metro, the Ada County Highway District (ACHD) uniquely controls roads and much of the public drainage, so site design must satisfy ACHD standards alongside city land-use requirements. Pressurized-irrigation systems tied to regional water rights also require early utility coordination.",
    },
  ],
};
