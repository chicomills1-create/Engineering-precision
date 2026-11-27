import type { CityData } from "../types";

export const amarillo: CityData = {
  slug: "amarillo",
  name: "Amarillo",
  stateSlug: "texas",
  county: "Potter and Randall Counties",
  ahj: {
    office: "City of Amarillo Building Safety Department",
    process:
      "Amarillo's Building Safety Department reviews plans and issues permits for work inside the city — which spans both Potter and Randall counties — under the city's adopted I-code editions with local amendments, while the counties handle unincorporated Panhandle areas with far lighter programs. Commercial submittals coordinate building, fire, and health reviews locally, and Texas-licensed professional seals are required on commercial drawings under state law.",
  },
  codes: {
    building: "International Building Code as adopted by the City of Amarillo with local amendments (Texas has no statewide commercial building code; editions are municipal)",
    energy: "International Energy Conservation Code as adopted by the City of Amarillo, subject to Texas state energy code requirements for commercial construction",
    amendments:
      "Amarillo's local amendments respond to High Plains conditions: elevation around 3,600 feet, extreme wind exposure on open prairie, and hail. The practical amendment layer is wind and roof practice — uplift, hail-resistant roofing expectations from insurers, and dust and snow-drift detailing — applied to a city-adopted code edition that must be confirmed with Building Safety rather than borrowed from Dallas or Lubbock practice.",
  },
  utilities: {
    electric: "Xcel Energy (through its Southwestern Public Service Company subsidiary) provides electric service in Amarillo",
    notes:
      "Xcel Energy's Southwestern Public Service operation serves Amarillo and much of the Texas Panhandle, in one of the nation's premier wind-generation regions — Xcel's regional system integrates very large West Texas and New Mexico wind fleets, and transmission capacity and interconnection for large loads are coordinated with SPS planning. Natural gas is Atmos Energy, and water is the City of Amarillo, whose Ogallala Aquifer supply planning shapes long-range development.",
  },
  climateNotes:
    "ASHRAE climate zone 4B (mixed-dry) at roughly 3,600 feet on the Llano Estacado: hot summers, cold windy winters, low humidity, huge diurnal swings, and the Panhandle's signature hazards — extreme straight-line wind, hail, blizzards, and dust storms. Snow loads are moderate but drifting is severe in open exposure.",
  marketNotes:
    "Amarillo's construction market runs on food processing (Tyson Foods' major beef plant, Cacique, and Hilmar Cheese), the Pantex Plant — the nation's nuclear weapons assembly/disassembly facility, east of the city — wind energy operations and transmission, Bell's helicopter plant, and the Baptist St. Anthony's and Northwest Texas healthcare systems, plus I-40 logistics at a historic Route 66 crossroads.",
  narratives: {
    mep:
      "MEP design in Amarillo is documented to the city's adopted I-codes and Texas energy requirements, in zone 4B where high-altitude dry air, big diurnal swings, and dust change equipment selection versus humid Texas practice. Xcel Energy (Southwestern Public Service) service coordination serves food-processing and industrial loads with heavy refrigeration and motor demand, and wind-driven infiltration and hail protection reach into every exterior system detail.",
    structural:
      "Amarillo structural design is wind engineering: open-prairie exposure produces high design wind pressures and uplift, and hail exposure drives roofing and cladding specification, while snow drift in extreme wind is a real roof case despite moderate base loads. Seismic demand is negligible, foundations sit in caliche and playa-influenced soils, and the industrial stock adds heavy process and crane loads.",
    civil:
      "Civil design in Amarillo works on the flat Llano Estacado, where drainage means playa lakes — closed basins that pond stormwater across the city — and city stormwater rules manage discharge between playas and the Prairie Dog Town Fork of the Red River. Ogallala Aquifer water supply and Xcel transmission corridors shape the largest industrial sites, and wind erosion and dust control are construction-phase requirements, not afterthoughts.",
    energy:
      "Energy compliance in Amarillo is documented to the IECC as adopted by the city under Texas state energy requirements. Zone 4B's diurnal swing makes economizers and thermal mass genuinely effective here, and the region's wind-generation abundance and Xcel programs color the operating-cost conversation for the food-processing loads that run around the clock.",
  },
  faqs: [
    {
      q: "Who provides electric service in Amarillo?",
      a: "Xcel Energy, through Southwestern Public Service Company, provides electric service in Amarillo and the Texas Panhandle — a region where Xcel integrates some of the largest wind generation in the country.",
    },
    {
      q: "What building code applies in Amarillo?",
      a: "The IBC and IECC editions adopted by the City of Amarillo with local amendments. Texas has no statewide commercial building code, so the city's adopted editions — confirmed with Building Safety — govern.",
    },
    {
      q: "What climate hazards shape Amarillo design?",
      a: "Wind above all: open-prairie exposure, hail, dust storms, and drifting snow at 3,600 feet in climate zone 4B, with playa-lake drainage governing site civil design.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 60, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.amarillo.gov"],
      codes: ["https://www.amarillo.gov"],
      amendments: ["https://www.amarillo.gov"],
      utilities: ["https://tx.xcelenergy.com"],
      climate: ["https://www.weather.gov/ama/"],
      market: ["https://www.amarillo.gov"],
    },
  },
};
