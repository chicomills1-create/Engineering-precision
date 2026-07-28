import type { StateData } from "../types";

export const nevada: StateData = {
  slug: "nevada",
  name: "Nevada",
  abbrev: "NV",
  lastVerified: "2026-07-28",
  buildingCode: {
    name: "Local adoption of the International Building Code (most jurisdictions on 2018 IBC)",
    baseCode: "IBC with local amendments; no single statewide mandatory building code",
    notes:
      "Nevada delegates building-code adoption to local governments. Clark County (Las Vegas) and the City of Reno/Washoe County adopt their own editions and amendments, so the governing IBC cycle must be confirmed with the specific building department before design.",
  },
  energyCode: {
    commercial: "2018 IECC (adopted by Clark County and the Southern Nevada jurisdictions; northern Nevada varies)",
    notes:
      "Nevada's State Office of Energy adopts a statewide baseline, but enforcement and the exact edition run through local building departments. Commercial COMcheck documentation must target the edition the permitting jurisdiction actually enforces.",
    beyondCode: "Southern Nevada jurisdictions coordinate energy provisions through the Southern Nevada Building Officials amendments; utility rebate programs from NV Energy reward above-code performance.",
  },
  climate: {
    zones: "3B (hot-dry) in Las Vegas, 5B across Reno and northern Nevada, colder at elevation",
    drivers: [
      "108°F+ summer design temperatures in the Las Vegas Valley",
      "Very low humidity favoring evaporative and economizer cooling",
      "Large diurnal temperature swings statewide",
      "High solar radiation driving envelope and glazing decisions",
    ],
  },
  structural: {
    seismic: "Moderate to high — Reno and western Nevada sit in an active seismic belt (SDC D common); Las Vegas is lower but not negligible",
    wind: "Basic wind speeds generally 105–115 mph (Risk Category II); exposed high-desert sites see gust attention",
    snow: "Negligible in Las Vegas; Reno-area and Sierra-front ground snow loads climb with elevation and govern mountain roofs",
    other: "Collapsible and gypsiferous soils in southern Nevada; caliche layers complicate excavation and foundation design",
  },
  licensure: {
    board: "Nevada State Board of Professional Engineers and Land Surveyors (NSBPELS)",
    notes: "Nevada offers licensure by comity for qualified out-of-state PEs and accepts electronic seals for digital submittals. Discipline-specific registration applies.",
  },
  metros: ["Las Vegas", "Henderson", "Reno", "North Las Vegas", "Sparks", "Carson City"],
  permitting:
    "Clark County and the City of Las Vegas dominate southern Nevada permitting and enforce aggressively on drainage and dust in a fast-growth environment; Reno and Washoe County govern the north with added seismic scrutiny. Regional flood-control districts (notably the Clark County Regional Flood Control District) impose their own hydrology criteria on site design.",
  marketNotes:
    "Nevada's construction market is anchored by the massive warehouse, logistics, and data-center corridor around the Reno-Sparks Tahoe-Reno Industrial Center, alongside continued gaming, hospitality, and healthcare expansion in Las Vegas. Advanced manufacturing near Reno and Southern Nevada population growth keep demand for MEP and site engineering strong.",
  narratives: {
    mep:
      "Nevada MEP design splits sharply between the hot-dry Las Vegas Valley and the higher, colder north around Reno. In the south we design to 108°F-plus summer design days, applying high-ambient equipment derates that out-of-state engineers frequently overlook, and we exploit the desert's very low humidity through economizer and evaporative strategies that meaningfully cut cooling energy on warehouses and industrial shells. Northern Nevada projects carry real heating loads and greater diurnal swing, shifting the balance toward heat recovery and freeze protection. Across the state we design around NV Energy's rate structure — demand charges reward right-sized services and load management — and we coordinate the enormous electrical services that the Reno data-center and logistics corridor now demands, where utility capacity and interconnection timelines can drive the project schedule as much as the building itself.",
    structural:
      "Structural priorities in Nevada shift with latitude. Western Nevada around Reno lies in an active seismic belt where SDC D is common, so we detail ductile lateral systems and coordinate site response with the geotechnical engineer, while southern Nevada's lower-but-not-trivial seismicity still requires proper detailing on essential facilities. Southern Nevada's real challenge is often below grade: collapsible and gypsiferous soils plus hard caliche layers complicate excavation and foundation design, and mitigation such as overexcavation, moisture conditioning, or deepened footings is driven by the geotechnical report. Mountain-front and Sierra-adjacent projects add ground snow loads that grow with elevation, so we confirm the governing IBC edition per jurisdiction and combine snow, seismic, and wind demands appropriately.",
    civil:
      "Civil engineering in the Las Vegas Valley is dominated by flash-flood hydrology: the Clark County Regional Flood Control District imposes its own drainage criteria, and the valley's intense, short-duration desert storms mean detention, conveyance, and floodplain compliance must be resolved early. Dust-control permitting through the Clark County Department of Environment and Sustainability applies to nearly any meaningful disturbance. In the north, Truckee Meadows and Washoe County drainage standards, along with steeper terrain, drive grading and erosion control. We design retention and detention facilities, storm-drain systems, and ADA-compliant grading to each jurisdiction's published standards, and we place drainage infrastructure during preliminary layout because in tight desert sites it directly consumes developable area.",
    energy:
      "Nevada energy compliance is a jurisdiction-mapping exercise: Clark County and the southern jurisdictions enforce a version of the 2018 IECC, while northern Nevada editions vary, so we run COMcheck against the exact edition the permitting building department enforces. In the hot-dry climate zones that cover most of the state, the highest-leverage measures are envelope and glazing driven — low-SHGC glass, cool roofs, and right-sized cooling plants return far more than added wall mass, given the intense solar load and cooling-dominated profile. We also model economizer and, where suited, evaporative cooling to capture the dry-climate advantage, and we help clients align designs with NV Energy commercial rebate programs so above-code envelope and equipment choices pay back through incentives as well as reduced demand charges.",
  },
  faqs: [
    {
      q: "Which building code applies to my Nevada project?",
      a: "It depends on the jurisdiction. Nevada has no single statewide mandatory building code — Clark County/Las Vegas and Reno/Washoe County each adopt their own IBC edition and amendments. We confirm the governing code cycle with the local building department at project kickoff.",
    },
    {
      q: "Does Nevada require commercial energy code compliance?",
      a: "Yes, through local adoption. Clark County and the southern Nevada jurisdictions enforce a version of the 2018 IECC; northern Nevada editions vary. Compliance is typically documented with COMcheck matched to the specific edition your permitting jurisdiction enforces.",
    },
    {
      q: "Is seismic design a concern in Nevada?",
      a: "Yes, especially in the north. Reno and western Nevada sit in an active seismic belt where Seismic Design Category D is common and ductile lateral detailing is required. Southern Nevada seismicity is lower but still governs detailing on essential and taller structures.",
    },
    {
      q: "How does stormwater work in the Las Vegas Valley?",
      a: "Site drainage must comply with Clark County Regional Flood Control District criteria, which address the valley's flash-flood hydrology through detention, conveyance, and floodplain rules. Drainage facilities should be sized during preliminary site layout, and dust-control permitting applies to most earth-disturbing work.",
    },
  ],
};
