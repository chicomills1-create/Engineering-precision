import type { StateData } from "../types";

export const montana: StateData = {
  slug: "montana",
  name: "Montana",
  abbrev: "MT",
  lastVerified: "2026-07-28",
  buildingCode: {
    name: "Montana state-adopted International Building Code (administered by the Department of Labor & Industry)",
    baseCode: "IBC with Montana amendments (recent cycles based on the 2021 IBC)",
    notes:
      "Montana adopts a statewide building code through the Building Codes Bureau of the Department of Labor & Industry. Certified local jurisdictions administer enforcement, but many rural areas rely on the state program; the governing edition should be confirmed with the applicable authority.",
  },
  energyCode: {
    commercial: "IECC-based Montana commercial energy code (recent cycles referencing the 2021 IECC with amendments)",
    notes:
      "Montana adopts the commercial energy code statewide with amendments; adoption has generally tracked recent IECC editions with a modest lag. COMcheck documentation should target the adopted edition and Montana amendments.",
    beyondCode: "NorthWestern Energy and Montana-Dakota Utilities offer commercial efficiency programs; stretch-code activity is limited under the statewide framework.",
  },
  climate: {
    zones: "6B across much of the state (Billings, Missoula, Bozeman, Great Falls); 7 at higher elevations and in the coldest valleys",
    drivers: [
      "Severe cold winters with dominant heating loads and design temperatures well below zero",
      "Large diurnal swings and low humidity",
      "High winds across the plains and Rocky Mountain Front",
      "Short, dry summers with modest cooling loads",
    ],
  },
  structural: {
    seismic: "Variable — western Montana (Bozeman, Missoula, and the Intermountain Seismic Belt) carries moderate seismicity (SDC C+), while the eastern plains are lower",
    wind: "High along the Rocky Mountain Front and open plains — basic wind speeds often 105–120+ mph with strong chinook wind events",
    snow: "Substantial statewide and severe in the mountains — ground snow loads range widely and mountain/resort loads (Big Sky, Whitefish) can far exceed 100 psf",
    other: "Deep frost penetration drives foundation embedment; expansive/bentonite soils occur across parts of eastern and central Montana",
  },
  licensure: {
    board: "Montana Board of Professional Engineers and Professional Land Surveyors (within the Department of Labor & Industry)",
    notes: "Montana offers comity licensure for qualified out-of-state PEs and accepts electronic seals for digital plan submittals.",
  },
  metros: ["Billings", "Missoula", "Bozeman", "Great Falls", "Kalispell", "Helena"],
  permitting:
    "Montana permitting mixes certified local jurisdictions with state-administered enforcement in areas without local programs, so the reviewing authority varies by location. Fast-growing Bozeman, Missoula, and the Flathead Valley run active review with snow, wind, and floodplain scrutiny, and many sites rely on on-site septic and well systems requiring state health-department coordination.",
  marketNotes:
    "Montana's construction market is driven by rapid growth in the Bozeman/Gallatin Valley and Flathead Valley (resort, healthcare, and residential), energy and agriculture in the east around Billings, and steady institutional and higher-education work. In-migration and tourism have pushed sustained demand for commercial and site engineering.",
  narratives: {
    mep:
      "Montana MEP design is heating-dominated to a degree few states match — design temperatures well below zero across much of the state make robust heating capacity, freeze protection, and reliable redundancy the central mechanical concerns, and we design accordingly rather than treating cooling as the driver. The dry climate and short, mild summers keep cooling loads modest, so economizers and, where suitable, evaporative cooling handle much of the summer need. At the high elevations common in western Montana and the resort valleys we apply altitude corrections to combustion and equipment. We coordinate with NorthWestern Energy and Montana-Dakota Utilities on service capacity and commercial efficiency incentives, and given the extreme cold we pay particular attention to snow-melt loads on services, vent freeze-up, and building pressurization. Mechanical and lighting compliance is documented to Montana's statewide-adopted energy code and confirmed against the reviewing authority.",
    structural:
      "Montana structural engineering is defined by snow and wind, with seismic significant in the west. Ground snow loads are substantial statewide and severe in the mountains — Big Sky, Whitefish, and other resort roofs can carry well over 100 psf — so snow frequently governs roof framing and we detail for drift and unbalanced loading. High winds along the Rocky Mountain Front and the open plains, including powerful chinook events, push basic wind speeds up and demand careful roof-uplift and lateral detailing. Western Montana sits within the Intermountain Seismic Belt, giving Bozeman and Missoula moderate seismic demand (SDC C and up) that we detail to the site hazard, while the eastern plains are lower. Deep frost penetration drives foundation embedment, and bentonite/expansive soils in parts of the state require geotechnically driven foundation systems.",
    civil:
      "Civil and site engineering in Montana blends severe-cold construction realities with sensitive-terrain and water-resource constraints. Deep frost penetration governs utility burial depth and foundation embedment, and freeze-thaw shapes pavement design. Many sites — especially in fast-growing but less-densely-served valleys — rely on on-site septic and private wells, requiring coordination with state and county health departments in addition to standard land-use review. Floodplain constraints along the state's rivers and streams, plus wildfire-interface concerns in the mountains, factor into siting and grading. We design detention and water-quality facilities, grading, utility connections, and ADA-compliant paving to each jurisdiction's standards and manage SWPPP documentation under Montana's construction stormwater permit, tailoring the drainage approach to the specific valley or plains hydrology.",
    energy:
      "Montana adopts commercial energy provisions statewide with amendments, generally tracking recent IECC editions with a modest lag, so we run COMcheck against the exact adopted edition and Montana amendments the reviewing authority enforces. In Montana's cold climate zones (largely 6B with 7 at elevation), the compliance economics are heating-driven: envelope insulation, aggressive air-sealing, and high-performance glazing return more here than almost anywhere in the lower 48, and efficient heating equipment with heat recovery drives the mechanical side. Economizers capture the dry-climate cooling advantage during shoulder seasons. We help clients pair compliance with NorthWestern Energy and Montana-Dakota Utilities commercial incentives so above-code envelope and equipment investments recover cost through both rebates and dramatically reduced winter heating expense.",
  },
  faqs: [
    {
      q: "Which building code applies to my Montana project?",
      a: "Montana adopts a statewide building code (recent cycles based on the 2021 IBC with amendments) through the Department of Labor & Industry Building Codes Bureau. Certified local jurisdictions administer enforcement while other areas use the state program, so we confirm the reviewing authority and governing edition at project kickoff.",
    },
    {
      q: "What energy code does Montana enforce for commercial buildings?",
      a: "Montana adopts the commercial IECC statewide with amendments, generally tracking recent editions with a modest lag. We document compliance with COMcheck against the exact adopted edition and Montana amendments, and can align the design with NorthWestern Energy or Montana-Dakota Utilities commercial incentives.",
    },
    {
      q: "What loads usually govern structural design in Montana?",
      a: "Snow and wind most often govern. Ground snow loads are substantial statewide and can exceed 100 psf in mountain and resort areas, while high plains and Rocky Mountain Front winds — including chinook events — drive uplift and lateral design. Western Montana also carries moderate seismic demand within the Intermountain Seismic Belt.",
    },
    {
      q: "How does Montana's cold climate affect site and foundation design?",
      a: "Deep frost penetration drives both foundation embedment and utility burial depth, and freeze-thaw shapes pavement design. Many sites also rely on on-site septic and private wells, requiring coordination with state and county health departments in addition to standard land-use and drainage review.",
    },
  ],
};
