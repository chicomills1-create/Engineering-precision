/** Projects/portfolio hub and discipline-specific project experience pages. Spec pages 190–200. */

export interface ProjectCategoryPage {
  slug: string;
  title: string;
  description: string;
  h1: string;
  kicker: string;
  lede: string;
  projectTypes: string[];
  disciplines: string[];
  note?: string; // Optional disclaimer for sensitive categories
}

export const PROJECTS_HUB = {
  title: "Engineering Projects & Experience | Apex Grid Engineering",
  description:
    "Apex Grid Engineering project experience across structural, MEP, civil, geotechnical, healthcare, multifamily, industrial, government, and military sectors.",
  h1: "Engineering Project Experience",
  kicker: "Our Work",
  lede:
    "Apex Grid Engineering is licensed in 49 states — every U.S. state except Alaska. Engineering stamping and licensure are confirmed for each project jurisdiction. Below is an overview of project experience organized by discipline and industry.",
  intro:
    "We are a multi-discipline firm. Our engineers have worked on everything from small commercial remodels to large-scale government and healthcare facilities. While we cannot publish confidential project details, the categories below represent types of projects we actively support.",
};

export const PROJECT_CATEGORY_PAGES: ProjectCategoryPage[] = [
  {
    slug: "structural",
    title: "Structural Engineering Projects | Apex Grid Engineering",
    description:
      "Structural engineering project experience across commercial, multifamily, industrial, healthcare, and government sectors.",
    h1: "Structural Engineering Projects",
    kicker: "Project Experience",
    lede:
      "Apex Grid's structural engineers have completed projects ranging from load-bearing wall removals in single-story commercial buildings to full structural systems for new multifamily and industrial construction.",
    projectTypes: [
      "New commercial construction structural systems",
      "Multifamily wood-frame and podium structures",
      "Industrial warehouse and manufacturing structural",
      "Tenant improvement structural modifications",
      "Existing building structural assessments and repairs",
      "Seismic retrofit for existing buildings",
      "Equipment support and anchorage",
      "Rooftop HVAC structural review",
      "Foundation design for varied soil conditions",
      "Structural peer review",
    ],
    disciplines: ["Structural Engineering"],
  },
  {
    slug: "mep",
    title: "MEP Engineering Projects | Apex Grid Engineering",
    description:
      "MEP engineering project experience across commercial, restaurant, healthcare, multifamily, and industrial sectors.",
    h1: "MEP Engineering Projects",
    kicker: "Project Experience",
    lede:
      "Apex Grid's MEP engineers have completed integrated mechanical, electrical, and plumbing projects across a wide range of commercial and institutional building types — from small restaurant TIs to large multifamily and healthcare facilities.",
    projectTypes: [
      "Commercial tenant improvement MEP",
      "Restaurant and food service MEP systems",
      "Healthcare and medical facility MEP",
      "Multifamily MEP infrastructure",
      "Industrial and warehouse MEP",
      "HVAC system replacements and upgrades",
      "Electrical service upgrades and EV charging",
      "Emergency and standby power systems",
      "Kitchen exhaust and make-up air systems",
      "Plumbing and gas systems",
    ],
    disciplines: ["Mechanical Engineering", "Electrical Engineering", "Plumbing Engineering"],
  },
  {
    slug: "civil",
    title: "Civil Engineering Projects | Apex Grid Engineering",
    description:
      "Civil engineering project experience including site development, grading, drainage, parking lots, and utility coordination.",
    h1: "Civil Engineering Projects",
    kicker: "Project Experience",
    lede:
      "Apex Grid's civil engineers have supported site development across commercial, industrial, and government applications — from small parking lot improvements to full site development packages for new construction.",
    projectTypes: [
      "Commercial site development packages",
      "Grading and drainage plans",
      "Parking lot design and expansion",
      "Stormwater management systems",
      "Civil utility design and coordination",
      "ADA site accessibility improvements",
      "Turn lane and roadway improvements",
      "Site expansion and redevelopment",
      "Industrial site civil engineering",
      "Federal and government site improvements",
    ],
    disciplines: ["Civil Engineering"],
  },
  {
    slug: "geotechnical",
    title: "Geotechnical Engineering Projects | Apex Grid Engineering",
    description:
      "Geotechnical engineering project experience including soil borings, geotechnical reports, foundation recommendations, and pavement design.",
    h1: "Geotechnical Engineering Projects",
    kicker: "Project Experience",
    lede:
      "Apex Grid's geotechnical engineers have supported projects requiring subsurface investigation, foundation recommendations, pavement design, and settlement analysis across commercial, multifamily, and government sectors.",
    projectTypes: [
      "Commercial building geotechnical investigations",
      "Multifamily development geotechnical reports",
      "Parking lot and pavement geotechnical analysis",
      "Retaining wall geotechnical parameters",
      "Expansive soil evaluation and mitigation",
      "Settlement analysis for existing structures",
      "Foundation recommendations for new construction",
      "Earthwork and compaction specifications",
      "Government and federal facility geotechnical",
      "Site characterization for adaptive reuse",
    ],
    disciplines: ["Geotechnical Engineering"],
  },
  {
    slug: "multifamily",
    title: "Multifamily Engineering Projects | Apex Grid Engineering",
    description:
      "Multifamily engineering project experience — structural, MEP, and civil engineering for apartments, townhomes, and mixed-use residential.",
    h1: "Multifamily Engineering Projects",
    kicker: "Project Experience",
    lede:
      "Apex Grid provides full multi-discipline engineering for multifamily developments — structural framing, MEP systems, civil site development, and geotechnical investigations — as a coordinated package or as individual disciplines.",
    projectTypes: [
      "Garden-style apartment structural and MEP",
      "Podium building structural systems",
      "Wood-frame multifamily structural engineering",
      "Multifamily MEP infrastructure",
      "Townhome structural engineering",
      "Multifamily civil site development",
      "Multifamily electrical service and EV charging",
      "Domestic water and plumbing systems",
      "HVAC and ventilation for units and common areas",
      "Adaptive reuse to multifamily",
    ],
    disciplines: ["Structural Engineering", "MEP Engineering", "Civil Engineering"],
  },
  {
    slug: "commercial",
    title: "Commercial Engineering Projects | Apex Grid Engineering",
    description:
      "Commercial engineering project experience — structural, MEP, and civil for office, retail, restaurant, hospitality, and industrial projects.",
    h1: "Commercial Engineering Projects",
    kicker: "Project Experience",
    lede:
      "Apex Grid's commercial engineering experience spans office, retail, restaurant, hospitality, fitness, and industrial projects — from single-space tenant improvements to full building engineering packages.",
    projectTypes: [
      "Office building structural and MEP engineering",
      "Retail and shopping center structural",
      "Restaurant MEP and structural engineering",
      "Hotel and hospitality MEP systems",
      "Fitness and recreation facility engineering",
      "Industrial and warehouse structural",
      "Data center structural and MEP",
      "Commercial tenant improvement structural and MEP",
      "Mixed-use development engineering",
      "Brewery and specialty commercial facility engineering",
    ],
    disciplines: ["Structural Engineering", "MEP Engineering", "Civil Engineering"],
  },
  {
    slug: "government",
    title: "Government Engineering Experience | Apex Grid Engineering",
    description:
      "Government facility engineering experience — structural, MEP, and civil engineering for federal agencies, GSA projects, and public facilities.",
    h1: "Government Engineering Experience",
    kicker: "Project Experience",
    lede:
      "Apex Grid supports government contractors and federal agencies on facility renovation, site improvement, and MEP upgrade projects. Any socioeconomic certification, size status, or set-aside eligibility must be confirmed from current SBA and SAM.gov records for the pursuit.",
    projectTypes: [
      "Federal facility structural renovations",
      "Government building MEP upgrades",
      "Federal site civil improvements",
      "GSA and public building engineering",
      "Emergency power and generator installations",
      "Electrical switchgear replacement engineering",
      "Parking lot and site improvement engineering",
      "HVAC and mechanical system replacements",
      "Plumbing upgrades and infrastructure",
      "Geotechnical support for federal construction",
    ],
    disciplines: ["Structural Engineering", "MEP Engineering", "Civil Engineering", "Geotechnical Engineering"],
    note: "Apex Grid does not publish project-specific federal facility details without client authorization.",
  },
  {
    slug: "military",
    title: "Military Engineering Experience | Apex Grid Engineering",
    description:
      "Military and defense facility engineering experience — structural, MEP, civil, and geotechnical for DoD projects and base facility renovations.",
    h1: "Military and Defense Engineering Experience",
    kicker: "Project Experience",
    lede:
      "Apex Grid supports prime contractors and design-build teams working on military facility renovations, site improvements, and MEP upgrades. Current professional credentials and any procurement classifications must be confirmed from official records for the pursuit.",
    projectTypes: [
      "Dormitory and barracks renovation engineering",
      "Facility structural renovation and repair",
      "MEP upgrades and system replacements",
      "Site and parking improvement civil engineering",
      "Geotechnical investigations for base expansion",
      "Electrical service upgrades and switchgear replacement",
      "HVAC and mechanical system engineering",
      "Structural assessments of aging military facilities",
      "Recreation area and site improvement engineering",
      "UFC-compliant structural and MEP design",
    ],
    disciplines: ["Structural Engineering", "MEP Engineering", "Civil Engineering", "Geotechnical Engineering"],
    note: "We publish only project information authorized for public disclosure. Project-specific military details are not included here.",
  },
  {
    slug: "healthcare",
    title: "Healthcare Engineering Projects | Apex Grid Engineering",
    description:
      "Healthcare facility engineering project experience — structural, MEP, mechanical, and electrical for hospitals, clinics, medical offices, and outpatient facilities.",
    h1: "Healthcare Engineering Projects",
    kicker: "Project Experience",
    lede:
      "Healthcare facilities require engineering that accounts for infection control, equipment loads, emergency power, ventilation pressure relationships, and high-reliability systems. Apex Grid provides structural and MEP engineering for a range of healthcare facility types.",
    projectTypes: [
      "Medical office building structural and MEP",
      "Outpatient clinic MEP systems",
      "Urgent care facility engineering",
      "Dental office MEP engineering",
      "Behavioral health facility structural and MEP",
      "Hospital equipment structural support",
      "Healthcare HVAC ventilation design",
      "Emergency power and generator systems",
      "Medical gas coordination",
      "Healthcare tenant improvement structural and MEP",
    ],
    disciplines: ["Structural Engineering", "MEP Engineering"],
  },
  {
    slug: "industrial",
    title: "Industrial Engineering Projects | Apex Grid Engineering",
    description:
      "Industrial engineering project experience — structural, MEP, and civil for warehouses, manufacturing, distribution, and specialty industrial facilities.",
    h1: "Industrial Engineering Projects",
    kicker: "Project Experience",
    lede:
      "Industrial facilities demand engineering that handles heavy equipment loads, process ventilation, high-bay structural systems, and specialized utilities. Apex Grid supports warehouse, manufacturing, distribution, and specialty industrial clients where project-specific credentials and authorization are verified.",
    projectTypes: [
      "Warehouse structural engineering",
      "Manufacturing facility structural design",
      "Mezzanine and equipment platform engineering",
      "Industrial HVAC and ventilation design",
      "Process exhaust and make-up air systems",
      "High-bay lighting electrical engineering",
      "Industrial electrical load studies",
      "Equipment anchorage and support",
      "Industrial civil site development",
      "Distribution center engineering",
    ],
    disciplines: ["Structural Engineering", "MEP Engineering", "Civil Engineering"],
  },
];
