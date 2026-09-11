/**
 * Extended structural engineering subpages — spec pages 007, 008, 009, 010, 012, 016, 020, 021, 022, 023, 025.
 * These supplement the structural hub subpages in discipline-pages.ts with slugs the spec
 * explicitly calls out that are not covered by existing discipline-pages entries.
 */

export interface StructuralExtendedPage {
  slug: string;
  title: string;
  description: string;
  h1: string;
  kicker: string;
  lede: string;
  topics: string[];
  ctaText: string;
}

export const STRUCTURAL_EXTENDED_PAGES: StructuralExtendedPage[] = [
  {
    slug: "seismic-retrofit",
    title: "Seismic Retrofit Engineering | Existing Buildings | Apex Grid",
    description:
      "Seismic retrofit structural engineering for existing commercial, multifamily, and public buildings. PE-stamped strengthening plans in multi-state coverage, subject to project-specific credential verification.",
    h1: "Seismic Retrofit Engineering for Existing Buildings",
    kicker: "Structural Engineering",
    lede:
      "Apex Grid provides seismic retrofit engineering for existing buildings — evaluating vulnerabilities, designing strengthening systems, and producing PE-stamped permit drawings accepted by California, Arizona, Nevada, and other seismically active jurisdictions.",
    topics: [
      "Existing condition review and seismic vulnerability assessment",
      "Wall bracing and shear wall additions",
      "Foundation upgrades and anchorage",
      "Diaphragm strengthening and chord continuity",
      "Connection improvements and holdowns",
      "Soft-story and open-front conditions",
      "Historic and older structural systems",
      "Commercial, multifamily, and public buildings",
      "Permit-ready retrofit drawings and calculations",
      "Coordination with architectural and MEP engineers",
    ],
    ctaText: "Send Us Your Existing Building Plans",
  },
  {
    slug: "structural-repairs",
    title: "Structural Repair Engineering | Apex Grid Engineering",
    description:
      "Structural repair engineering for damaged or deteriorated commercial and residential buildings. PE-stamped repair plans and calculations.",
    h1: "Structural Repair Engineering",
    kicker: "Structural Engineering",
    lede:
      "When a building shows signs of structural distress — cracked foundations, wood rot, corroded steel, damaged masonry, or settlement — Apex Grid evaluates the condition and designs engineered repairs. We provide PE-stamped repair drawings and calculations for permit submittal.",
    topics: [
      "Concrete cracking and spalling repair design",
      "Foundation crack evaluation and repair",
      "Wood framing damage and rot repair",
      "Steel corrosion and section loss evaluation",
      "Masonry damage and crack repair",
      "Floor and roof framing repair",
      "Localized structural reinforcement",
      "Repair details and permit drawings",
      "Field photo and measurement review",
      "Post-repair structural certification",
    ],
    ctaText: "Describe the Structural Damage",
  },
  {
    slug: "existing-buildings",
    title: "Existing Building Structural Engineering | Apex Grid",
    description:
      "Structural engineering for existing buildings — renovations, additions, wall openings, equipment changes, and seismic upgrades. PE-stamped documents.",
    h1: "Structural Engineering for Existing Buildings",
    kicker: "Structural Engineering",
    lede:
      "Most of the work Apex Grid does is on buildings that already exist. Whether you're opening a wall, adding a second story, installing heavy equipment, changing occupancy, or dealing with structural damage — we evaluate the existing structure and design what's needed.",
    topics: [
      "Existing condition assessments and field review",
      "Structural renovations and additions",
      "Wall and ceiling openings",
      "Roof framing modifications",
      "Equipment installation and anchorage",
      "Floor load changes and capacity evaluation",
      "Change of occupancy structural review",
      "Adaptive reuse and building conversions",
      "Structural repairs and reinforcement",
      "Engineering when original drawings aren't available",
    ],
    ctaText: "Tell Us About Your Existing Building Project",
  },
  {
    slug: "load-bearing-wall-removal",
    title: "Load-Bearing Wall Removal Engineering | Apex Grid",
    description:
      "Structural engineering for load-bearing wall removal. Beam design, post and footing sizing, permit drawings, and PE-stamped calculations.",
    h1: "Structural Engineering for Load-Bearing Wall Removal",
    kicker: "Structural Engineering",
    lede:
      "Removing a load-bearing wall requires a structural engineer — not just a contractor's opinion. Apex Grid verifies the existing load path, designs the replacement beam, posts, and footings, and produces PE-stamped permit drawings your building department accepts.",
    topics: [
      "Load path analysis and existing condition verification",
      "Field photo and measurement review",
      "Beam and header design",
      "Post and column sizing",
      "Footing and foundation modifications",
      "Connection and bearing details",
      "Residential and commercial wall removals",
      "Permit-ready structural drawings",
      "Calculation package for plan check",
      "RFI support during construction",
    ],
    ctaText: "Send Photos and Dimensions",
  },
  {
    slug: "condition-assessments",
    title: "Structural Condition Assessment Services | Apex Grid",
    description:
      "Structural condition assessments for commercial buildings, multifamily properties, and industrial facilities. PE-stamped engineering reports.",
    h1: "Structural Condition Assessments",
    kicker: "Structural Engineering",
    lede:
      "Apex Grid performs structural condition assessments for property owners, developers, investors, and facility managers — documenting existing structural systems, identifying deficiencies, prioritizing repairs, and producing engineering reports that support capital planning and due diligence.",
    topics: [
      "Visual structural assessment and documentation",
      "Existing structural system review",
      "Observed deficiencies and damage assessment",
      "Repair priority recommendations",
      "Capital planning support",
      "Engineering condition report with findings",
      "Follow-up repair design as needed",
      "Due diligence support for acquisitions",
      "Phase I assessment coordination",
      "Third-party peer review",
    ],
    ctaText: "Request a Structural Condition Assessment",
  },
  {
    slug: "tenant-improvements",
    title: "Tenant Improvement Structural Engineering | Apex Grid",
    description:
      "Structural engineering for tenant improvements — wall openings, RTUs, equipment, interior modifications, and fast permit turnaround.",
    h1: "Structural Engineering for Tenant Improvements",
    kicker: "Structural Engineering",
    lede:
      "Tenant improvements often require structural engineering — whether it's a new RTU on the roof, a partition wall removed, kitchen equipment added, or a mezzanine installed. Apex Grid delivers PE-stamped structural drawings quickly, designed around your TI schedule.",
    topics: [
      "New wall and ceiling openings",
      "Rooftop unit additions and replacements",
      "Kitchen equipment support",
      "Mezzanine and platform additions",
      "Interior partition modifications",
      "Structural framing changes",
      "Existing condition field review",
      "Fast permit turnaround for retail and restaurant TIs",
      "Coordination with MEP and architectural engineers",
      "Plan check response support",
    ],
    ctaText: "Send Your TI Plans",
  },
  {
    slug: "masonry-design",
    title: "Masonry Structural Engineering | Apex Grid",
    description:
      "Masonry structural engineering for CMU, brick, and reinforced masonry walls — new construction, openings, retrofits, and existing-building evaluation.",
    h1: "Masonry Structural Engineering",
    kicker: "Structural Engineering",
    lede:
      "Apex Grid provides structural engineering for masonry construction — new CMU and brick walls, lintels, reinforcement, bond beams, and wall openings. We also evaluate and retrofit existing masonry for seismic performance, repairs, and remodel-driven modifications.",
    topics: [
      "CMU (concrete masonry unit) wall design",
      "Brick and reinforced masonry",
      "Lintel and beam design",
      "Reinforcement and grouting specifications",
      "Bond beams and tie courses",
      "Masonry wall openings and lintels",
      "Existing masonry evaluation",
      "Seismic retrofit of unreinforced masonry",
      "Masonry crack and damage assessment",
      "Permit drawings and structural calculations",
    ],
    ctaText: "Send Your Masonry Project Details",
  },
  {
    slug: "equipment-support",
    title: "Structural Equipment Support & Anchorage | Apex Grid",
    description:
      "Structural engineering for mechanical, electrical, and industrial equipment support — pads, frames, anchorage, and rooftop equipment structural review.",
    h1: "Structural Engineering for Equipment Support",
    kicker: "Structural Engineering",
    lede:
      "Equipment installations — RTUs, generators, transformers, battery systems, industrial machinery, and telecom equipment — require structural engineering for code-compliant support and anchorage. Apex Grid provides PE-stamped equipment support designs for permit and construction.",
    topics: [
      "Rooftop HVAC unit (RTU) structural support",
      "Generator pad and structural frame design",
      "Transformer pad and enclosure support",
      "Battery energy storage (BESS) structural anchorage",
      "Industrial equipment pads and frames",
      "Telecom and data center equipment mounting",
      "Solar panel and inverter anchorage",
      "Equipment anchorage calculations (seismic and wind)",
      "Mezzanine and platform structural design",
      "PE-stamped drawings for permit and installation",
    ],
    ctaText: "Send Equipment Specifications",
  },
  {
    slug: "rooftop-equipment",
    title: "Structural Engineering for Rooftop Equipment | Apex Grid",
    description:
      "Structural review and design for rooftop HVAC, RTU replacements, solar, generators, and other rooftop equipment. PE-stamped drawings.",
    h1: "Structural Engineering for Rooftop Equipment",
    kicker: "Structural Engineering",
    lede:
      "Adding or replacing rooftop equipment requires structural engineering to verify the existing roof framing can handle new loads — and to design curbs, supports, and anchorage that meet code. Apex Grid delivers fast, PE-stamped rooftop equipment structural reviews.",
    topics: [
      "Existing roof framing capacity evaluation",
      "RTU replacement structural review",
      "New RTU structural support design",
      "Rooftop curb and support framing",
      "Load path verification through deck and joists",
      "Rooftop solar structural analysis",
      "Generator and transformer structural review",
      "Rooftop communication equipment mounting",
      "Seismic and wind anchorage calculations",
      "Permit-ready structural drawings",
    ],
    ctaText: "Send Existing Roof Plans and Equipment Specs",
  },
  {
    slug: "canopies",
    title: "Structural Engineering for Canopies | Apex Grid Engineering",
    description:
      "Structural engineering for parking canopies, solar carports, pedestrian canopies, fuel station canopies, and commercial entry canopies. PE-stamped.",
    h1: "Structural Engineering for Canopies",
    kicker: "Structural Engineering",
    lede:
      "Canopies require complete structural engineering — foundations, columns, framing, and connections designed for wind, snow, seismic, and dead loads. Apex Grid provides PE-stamped canopy structural drawings for parking, solar, fuel stations, pedestrian entries, and military applications.",
    topics: [
      "Parking lot and garage entry canopies",
      "Solar carport canopy structural design",
      "Fuel station and car wash canopies",
      "Pedestrian walkway and entry canopies",
      "Commercial and retail entry structures",
      "Military base and government facility canopies",
      "Foundation and footing design",
      "Steel frame and connection design",
      "Wind and seismic load analysis",
      "Permit drawings and structural calculations",
    ],
    ctaText: "Send Your Canopy Project Details",
  },
  {
    slug: "retaining-walls",
    title: "Retaining Wall Structural Engineering | Apex Grid",
    description:
      "Structural engineering for concrete, CMU, and cantilever retaining walls — site development, parking lots, grade changes, and drainage coordination.",
    h1: "Retaining Wall Structural Engineering",
    kicker: "Structural Engineering",
    lede:
      "Retaining walls — whether concrete, CMU, cantilever, or segmental — require structural engineering for safe design and permit approval. Apex Grid designs retaining walls for site development, parking lots, grade changes, and building perimeters with coordination with civil and geotechnical engineers.",
    topics: [
      "Concrete cantilever retaining wall design",
      "CMU (masonry) retaining wall design",
      "Gravity and semi-gravity retaining walls",
      "Site grading and level change applications",
      "Parking lot edge and slope retaining",
      "Building perimeter retaining structures",
      "Drainage coordination and surcharge loads",
      "Geotechnical parameter integration",
      "Seismic retaining wall analysis",
      "Permit drawings and structural calculations",
    ],
    ctaText: "Send Your Retaining Wall Project",
  },
];
