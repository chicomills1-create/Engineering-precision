import type { CityData } from "../types";

export const littleRock: CityData = {
  slug: "little-rock",
  name: "Little Rock",
  stateSlug: "arkansas",
  county: "Pulaski County",
  ahj: {
    office: "City of Little Rock Planning and Development Department — Building Codes Division",
    process:
      "Little Rock's Building Codes Division reviews commercial plans and issues permits under the Arkansas Fire Prevention Code framework, coordinating with Little Rock Fire and the city's engineering reviewers. Arkansas administers its commercial code statewide through the State Fire Marshal's adopted code while larger cities like Little Rock run their own building departments and plan review within that framework — so the reviewing path is the city's, but the code text is the state's.",
  },
  codes: {
    building: "Arkansas Fire Prevention Code, Volume II (based on the 2021 IBC with Arkansas amendments), enforced statewide and administered locally in Little Rock",
    energy: "Arkansas Energy Code for commercial buildings (based on the IECC / ASHRAE 90.1, 2021 IECC base in the current state adoption)",
    amendments:
      "Arkansas's code is adopted at the state level through the Fire Prevention Code, so Little Rock does not write local technical amendments; the local layer is the city's zoning, site plan, and Board of Adjustment processes plus Mississippi River / Arkansas River floodplain administration. Tornado-safe-room expectations for schools and public assembly follow the state's post-storm practice under the same code family.",
  },
  utilities: {
    electric: "Entergy Arkansas provides electric service in Little Rock",
    notes:
      "Entergy Arkansas handles new commercial services and interconnections in the capital city, including distributed solar under Arkansas's net-metering framework as amended by the state's Solar Access Act, which changed compensation structures for newer systems. Natural gas is Summit Utilities (CenterPoint Energy's successor in Arkansas), and water is Central Arkansas Water — a regional utility whose watershed-protection rules affect development in the Lake Maumelle watershed west of the city.",
  },
  climateNotes:
    "ASHRAE climate zone 3A (warm-humid) on the Arkansas River at the Ouachita foothills edge: hot humid summers, mild winters with occasional ice storms, and significant tornado exposure. The river and Fourche Creek floodplains cross the city, and the 2019 Arkansas River flood is the recent high-water benchmark.",
  marketNotes:
    "Little Rock is Arkansas's capital and economic center: state government, UAMS (the state's academic medical center) and Arkansas Children's and Baptist Health systems, banking (Simmons Bank headquarters, Bank OZK nearby), the Port of Little Rock industrial district on the Arkansas River, and Dassault Falcon Jet's completion center at Clinton National Airport drive the commercial market.",
  narratives: {
    mep:
      "MEP design in Little Rock is documented to the Arkansas Fire Prevention Code, Volume II (2021 IBC base) and the Arkansas Energy Code, with Entergy Arkansas service and interconnection coordination — including Solar Access Act net-metering structures for rooftop PV. Zone 3A humidity and cooling loads size systems for the medical and government campuses that anchor demand, and Central Arkansas Water's watershed rules reach into site-adjacent mechanical and plumbing scopes in the western growth area.",
    structural:
      "Little Rock structural design follows the state Fire Prevention Code with moderate seismic influence from the New Madrid zone to the northeast — felt in Pulaski County design categories — plus tornado-aware detailing and Arkansas River flood loads in the low districts. Soils range from Ouachita foothill rock on the west to river alluvium downtown, changing foundation practice across the city.",
    civil:
      "Civil design in Little Rock works through city site-plan review with drainage to the Arkansas River and Fourche Creek systems, where floodplain management and the 2019 flood record set the bar for finished-floor and detention decisions. The Port of Little Rock adds industrial riverfront sites with federal navigation interests, and Lake Maumelle watershed protection rules constrain development patterns on the western edge.",
    energy:
      "Energy compliance in Little Rock is documented under the Arkansas Energy Code for commercial buildings, based on the IECC/ASHRAE 90.1 framework in the state's current adoption. Entergy Arkansas efficiency programs support beyond-code measures, and in zone 3A the compliance story is cooling efficiency and envelope performance for the healthcare and government loads that dominate new construction.",
  },
  faqs: [
    {
      q: "Who provides electric service in Little Rock?",
      a: "Entergy Arkansas provides electric service, including new commercial connections and solar interconnection under the state's Solar Access Act framework. Gas is Summit Utilities; water is Central Arkansas Water.",
    },
    {
      q: "What building code applies in Little Rock?",
      a: "The Arkansas Fire Prevention Code, Volume II — built on the 2021 IBC with state amendments — enforced statewide and administered locally by the city's Building Codes Division, with the Arkansas Energy Code for commercial energy compliance.",
    },
    {
      q: "What drives Little Rock's construction market?",
      a: "State government, the UAMS and children's hospital medical complex, banking headquarters, the Port of Little Rock, and Dassault Falcon Jet's airport completion center — a government, healthcare, and logistics mix.",
    },
  ],
  research: {
    lastVerified: "2026-11-27", reviewStatus: "approved", reviewedBy: "Apex Grid editorial review",
    supportedServiceSlugs: ["mep-engineering", "structural-engineering", "civil-engineering", "energy-compliance"],
    priority: { commercialOpportunity: 65, searchConsoleImpressions: 0, searchConsolePeriod: "unavailable" },
    sources: {
      ahj: ["https://www.littlerock.gov"],
      codes: ["https://www.littlerock.gov"],
      amendments: ["https://www.littlerock.gov"],
      utilities: ["https://www.entergy-arkansas.com"],
      climate: ["https://www.weather.gov/lzk/"],
      market: ["https://www.littlerock.gov"],
    },
  },
};
