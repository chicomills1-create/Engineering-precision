import type { CityData } from "../types";

export const allen: CityData = {
  slug: "allen",
  name: "Allen",
  stateSlug: "texas",
  county: "Collin County",
  ahj: {
    office: "City of Allen Community Development Department, Building and Permitting Division (305 Century Parkway)",
    process:
      "Allen receives and processes all permit applications through its Citizen Self-Service (CSS) portal — applications, plan review, and inspection scheduling all run through CSS, with inspection time windows confirmed by phone on the morning of the inspection. The Building and Permitting Division monitors compliance through permitting, construction plan review, and inspections, while fire permits and life-safety plan review run separately through the Allen Fire Marshal's Office and health permits for food establishments and pools through the Environmental Health Division. Contractors in the state-licensed trades must also complete the city's own registration before pulling permits.",
  },
  codes: {
    building: "2024 International Building Code, as adopted by the City of Allen (Ordinance No. 4230-7-26, approved July 28, 2026, effective September 26, 2026) with local amendments in Article III of the Allen Land Development Code",
    energy: "2024 International Energy Conservation Code, as adopted by the City of Allen with local amendments; Texas state energy requirements via SECO also apply",
    amendments:
      "Allen adopts each I-code cycle with local amendments developed through the NCTCOG Regional Codes Coordinating Committee process and codified in Article III of the Allen Land Development Code. The 2024 adoption (Ordinance No. 4230-7-26) carries an amended climatic design table — 105 mph design wind speed (3-second gust, Exposure C), a 6-inch frost line, very heavy termite risk, and moderate weathering — and replaces the residential permit-exemption list, which no longer carries a general fence-height exemption.",
  },
  utilities: {
    electric: "Oncor Electric Delivery serves most of Allen in the deregulated ERCOT market; CoServ Electric and Grayson-Collin Electric Cooperative serve portions of the city",
    notes:
      "Most Allen addresses sit on Oncor's wires, so a new commercial service means Oncor delivery coordination plus a retail electric provider contract in the ERCOT market — but parts of the city are in CoServ Electric or Grayson-Collin Electric Cooperative territory, where the co-op sells power directly with no retail choice, so the serving utility has to be confirmed by address before service design starts. Water and wastewater are City of Allen utilities supplied through the North Texas Municipal Water District system, keeping water capacity review inside city hall.",
  },
  climateNotes:
    "ASHRAE climate zone 3A (hot-humid) in North Texas: severe cooling seasons, hail and severe-thunderstorm exposure, and episodic hard freezes. Allen's amended design table sets a 105 mph design wind speed and a 6-inch frost line, and expansive Blackland Prairie clays underlie much of the city — foundation movement, not snow or seismic load, is the standing structural climate problem.",
  marketNotes:
    "Allen is a mature, affluent Collin County suburb built around the US-75 and SH-121 corridors: the Allen Premium Outlets, The Village at Allen, and Watters Creek mixed-use district anchor retail, Experian's Allen campus anchors office employment, and Texas Health Presbyterian Hospital Allen anchors medical work. With the city largely built out, commercial work concentrates on retail and restaurant re-tenanting, medical and office build-out, and redevelopment of aging corridor properties rather than greenfield development.",
  narratives: {
    mep:
      "MEP design in Allen starts with the code cycle: applications received on or after September 26, 2026 are reviewed to the 2024 I-codes with the 2023 NEC and Allen's Article III amendments — a full cycle newer than most Texas cities. Service design has a second local wrinkle: most addresses are Oncor delivery with retail choice, but CoServ and Grayson-Collin co-op pockets sell power directly, so the electrical service path depends on which side of a territory line the site sits on.",
    structural:
      "Structural design in Allen is governed by expansive Blackland Prairie clay: foundations follow the geotechnical report with drilled piers or post-tension systems to ride seasonal moisture movement, while the city's amended design table sets 105 mph wind and a 6-inch frost line under the 2024 IBC. Seismic demand is minimal, so gravity, uplift, hail-resistant roofing assemblies, and soil movement control the design of the city's retail and tilt-wall stock.",
    civil:
      "Civil design in Allen works within a built-out city under the Allen Land Development Code: drainage and detention tie into established systems draining toward Cottonwood and Rowlett creeks, and water and wastewater are city utilities on the North Texas Municipal Water District wholesale system, so capacity review stays inside the city's process. Redevelopment sites carry the usual mature-suburb burden — verifying existing utility locations and easements matters more than extending new infrastructure.",
    energy:
      "Energy compliance in Allen is documented to the 2024 IECC as locally amended, a cycle ahead of most of Texas, with COMcheck documentation the standard commercial path and SECO's state requirements layered on top. In zone 3A the compliance margin is won on cooling efficiency, envelope solar control, and lighting controls, and the 2024 edition's tightened lighting and additional efficiency package requirements catch teams still detailing to a 2021-edition checklist.",
  },
  faqs: [
    {
      q: "What building code edition does Allen enforce?",
      a: "Allen adopted the 2024 ICC codes — 2024 IBC, IECC, IMC, IPC, IFGC, IFC, and IRC — by Ordinance No. 4230-7-26, effective September 26, 2026, with the 2023 National Electrical Code. Applications received on or after that date are reviewed to the 2024 editions with Allen's local amendments in Article III of the Land Development Code.",
    },
    {
      q: "How are permits filed in Allen, TX?",
      a: "All permit applications are received and processed through the city's Citizen Self-Service (CSS) portal, which also handles inspection scheduling. Fire permits run through the Allen Fire Marshal's Office and food and pool health permits through the Environmental Health Division, separate from the Building and Permitting Division.",
    },
    {
      q: "Who provides electric service in Allen?",
      a: "Oncor Electric Delivery serves most of Allen, with power sold by retail providers in the ERCOT market. Portions of the city are served by CoServ Electric or Grayson-Collin Electric Cooperative, which sell power directly — confirm the serving utility by address before starting service design. Water and wastewater are City of Allen utilities.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 42, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.allentx.gov/departments/community_development/building_and_permitting/index.php"],
      codes: ["https://www.cityofallen.org/departments/community_development/building_and_permitting/adopted_building_codes.php"],
      amendments: ["https://library.municode.com/tx/allen/codes/land_development_code?nodeId=LADECO_ARTIIIBURE_S3.11AMINSWPOSPCO2021ED"],
      utilities: ["https://www.cityofallen.org/community/severe_weather_center/index.php"],
      climate: ["https://garthallenfencebuilders.com/blog/allen-2024-building-code-fences/"],
      market: ["https://www.nichelleboyland.com/relocation/north-dfw/allen"],
    },
  },
};
