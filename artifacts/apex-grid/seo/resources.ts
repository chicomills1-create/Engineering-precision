/** Knowledge Center — resource articles for high-intent question-based searches.
 * Body HTML is embedded directly (same pattern as blog posts).
 */

import { STRUCTURAL_RESOURCE_ARTICLES } from "./resources/structural";
import { MEP_RESOURCE_ARTICLES } from "./resources/mep";
import { CIVIL_RESOURCE_ARTICLES } from "./resources/civil";
import { GEOTECHNICAL_RESOURCE_ARTICLES } from "./resources/geotechnical";
import { PERMIT_RESOURCE_ARTICLES } from "./resources/permit";

export interface ResourceArticle {
  slug: string;
  title: string;
  description: string;
  h1: string;
  tag: string;
  minutes: number;
  html: string;
}

/** Resource-center discipline categories. Articles map to a category via their `tag`. */
export interface ResourceDiscipline {
  slug: string;
  tag: string;
  name: string;
  blurb: string;
}

export const RESOURCE_DISCIPLINES: ResourceDiscipline[] = [
  { slug: "structural", tag: "Structural Engineering", name: "Structural", blurb: "Load paths, retrofits, existing buildings, and when a structural PE is required." },
  { slug: "mep", tag: "MEP Engineering", name: "MEP", blurb: "Mechanical, electrical, and plumbing design — load calcs, permits, and coordination." },
  { slug: "civil", tag: "Civil Engineering", name: "Civil", blurb: "Site development, grading, drainage, stormwater, utilities, and parking." },
  { slug: "geotechnical", tag: "Geotechnical Engineering", name: "Geotechnical", blurb: "Soils, borings, bearing capacity, settlement, and geotechnical reports." },
  { slug: "permit", tag: "Permit Engineering", name: "Permit & PE", blurb: "PE stamps, responsible charge, plan check, and permit-ready packages." },
];

export function disciplineOf(article: ResourceArticle): ResourceDiscipline {
  const d = RESOURCE_DISCIPLINES.find((x) => x.tag === article.tag);
  if (!d) throw new Error(`No resource discipline for tag: ${article.tag} (${article.slug})`);
  return d;
}

export const ROOT_CANONICAL_RESOURCE_SLUGS = new Set([
  "ashrae-90-1-vs-iecc-commercial-energy-code",
  "commercial-building-permit-process-what-engineers-deliver",
  "how-much-does-mep-engineering-cost",
  "title-24-energy-compliance-commercial-buildings",
  "vrf-vs-rooftop-unit-commercial-hvac",
  "what-does-a-structural-engineer-do-that-an-architect-doesnt",
]);

/** Canonical URL path for a resource article. */
export function resourceUrl(article: ResourceArticle): string {
  if (ROOT_CANONICAL_RESOURCE_SLUGS.has(article.slug)) {
    return `/resources/${article.slug}/`;
  }
  return `/resources/${disciplineOf(article).slug}/${article.slug}/`;
}

const BASE_RESOURCE_ARTICLES: ResourceArticle[] = [
  // ─── STRUCTURAL KNOWLEDGE CENTER ───────────────────────────────────────────

  {
    slug: "when-do-you-need-a-structural-engineer",
    title: "When Do You Need a Structural Engineer? | Apex Grid Engineering",
    description: "Not every project requires a structural engineer — but many do. Here's how to know when to call one and what happens if you don't.",
    h1: "When Do You Need a Structural Engineer?",
    tag: "Structural Engineering",
    minutes: 6,
    html: `
<h2>The Short Answer</h2>
<p>You need a structural engineer whenever a project affects a building's load-carrying system, requires a PE-stamped set for permit, or involves conditions that could put people or property at risk. That's a broad definition — and intentionally so, because the consequences of structural failure are irreversible.</p>

<h2>Common Situations That Require Structural Engineering</h2>
<h3>Removing or Modifying Load-Bearing Walls</h3>
<p>Any wall that carries loads from above — floor joists, roof framing, or upper-story walls — is load-bearing. Removing it without engineering can cause progressive collapse. A structural engineer determines whether the wall is load-bearing, sizes the replacement beam, designs the post and footing below it, and stamps the drawings for permit. This applies to residential remodels, commercial tenant improvements, and restaurant build-outs alike.</p>

<h3>Additions and New Construction</h3>
<p>Any new structure that will be occupied requires structural engineering under virtually every building code in the US. Foundations, framing systems, lateral resistance (shear walls, braced frames), and connections all need to be designed and documented by a licensed professional engineer.</p>

<h3>Seismic Retrofits and Upgrades</h3>
<p>Older buildings — particularly those built before modern seismic codes — often have soft stories, inadequate connections, or unreinforced masonry that creates risk in an earthquake. Retrofits require a structural engineer to evaluate existing conditions and design the strengthening measures. California, Washington, Oregon, Nevada, Utah, and other high-seismic states have mandatory retrofit programs for certain building types.</p>

<h3>Equipment Installation on Roofs or Floors</h3>
<p>Replacing an HVAC unit, adding a generator, installing solar panels, or mounting heavy equipment on a roof or mezzanine all impose loads on the structure. If those loads weren't accounted for in the original design, you need a structural engineer to verify capacity or design reinforcement. Many cities require PE-stamped structural calculations for rooftop mechanical permits.</p>

<h3>Tenant Improvements with Structural Scope</h3>
<p>Commercial TIs often involve new wall openings, ceiling support for heavy equipment, RTU replacement, kitchen equipment mounting, or modifications to the structural frame. When structural elements are touched, permit authorities require engineering documents.</p>

<h3>Signs of Structural Distress</h3>
<p>Diagonal cracks at window or door corners, stair-step cracking in masonry, sagging floors or ceilings, doors and windows that no longer operate correctly, or foundation movement are all signs that a structural engineer should evaluate the building. These symptoms don't always indicate danger, but they need professional assessment to determine cause and appropriate response.</p>

<h3>Change of Occupancy</h3>
<p>Moving from a warehouse to a fitness center, an office to a medical clinic, or a restaurant to an assembly use changes the live load design requirements. A structural engineer reviews whether the existing structure can support the new occupancy loads — and if not, designs the necessary upgrades.</p>

<h3>When a Permit Requires It</h3>
<p>Even if you're not sure whether your project has structural implications, the permitting authority may require structural documents. Most jurisdictions require PE-stamped structural drawings and calculations for any scope that touches the building's structural system. When in doubt, check with the local building department before starting.</p>

<h2>What Happens If You Skip It?</h2>
<p>Unpermitted structural work creates multiple risks: the work may be unsafe, the building may not pass inspection, the property may fail sale due diligence, insurance claims related to the work may be denied, and liability for any resulting injury falls to the owner. In some jurisdictions, unpermitted work must be demolished and redone.</p>

<h2>How to Work With a Structural Engineer</h2>
<p>The process starts with a scope description and, ideally, existing architectural drawings. The engineer will review what you have, identify what additional information is needed (field measurements, photos, geotechnical data), and provide a fee proposal. Most firms can turn around a proposal within 24–48 hours of receiving project information.</p>
    `,
  },

  {
    slug: "structural-engineering-cost",
    title: "How Much Does Structural Engineering Cost? | Apex Grid Engineering",
    description: "Structural engineering fees depend on scope, complexity, site conditions, and deliverables. Here's how to understand what drives cost — and what to expect.",
    h1: "How Much Does Structural Engineering Cost?",
    tag: "Structural Engineering",
    minutes: 5,
    html: `
<h2>Why There's No Simple Answer</h2>
<p>Every structural engineering project is different. Publishing a universal price would either mislead you or cause us to miss something your project actually needs. Instead, here's a breakdown of every factor that drives structural engineering fees — so you can understand a proposal when you receive one.</p>

<h2>Key Cost Factors</h2>
<h3>Project Type and Scope</h3>
<p>A single beam design for a residential wall opening is an entirely different scope than structural engineering for a new 50,000-square-foot healthcare facility. The number of structural elements to design, the number of drawings to produce, and the complexity of the load path all scale the fee. Simple residential scopes — wall removal, small addition, deck — are typically smaller fees. New commercial construction, complex renovations, or full MEP-structural coordination packages are larger.</p>

<h3>New Construction vs. Existing Buildings</h3>
<p>Existing building engineering often costs more per square foot than new construction, because the engineer must first understand what's already there before designing anything new. If drawings don't exist, field verification, measurements, and photo documentation add time. Exploratory openings (removing drywall to expose framing) are sometimes needed. New construction starts from a clean slate.</p>

<h3>Site Visit Requirement</h3>
<p>Some projects can be engineered remotely with good photos, dimensions, and contractor-provided field information. Others require a licensed engineer to visit the site — particularly complex existing conditions, structural distress evaluation, or projects where the as-built configuration is uncertain. Site visits add cost: travel, time on-site, and report preparation. When a site visit is necessary, it's not optional — it protects both the client and the engineer.</p>

<h3>Calculations Depth</h3>
<p>Structural calculations range from straightforward member checks (beam sizing under gravity loads) to full lateral system analysis across multiple load combinations. Seismic design in high-seismic zones, complex foundation design, or specialty systems (moment frames, post-tensioned concrete) require more engineering hours.</p>

<h3>Drawing Set Size and Complexity</h3>
<p>A typical residential beam replacement might require a one-page detail sheet. A full commercial structural package includes a structural general notes sheet, foundation plan, framing plans for each level, structural details, and connection schedules. The number of drawing sheets, the level of detail required by the AHJ, and the number of revision cycles all affect the fee.</p>

<h3>Schedule and Turnaround</h3>
<p>Standard turnaround is typically two to four weeks depending on project size. Rush requests — permit submittals within days, bid-deadline support, emergency repairs — carry premium fees for the resources required to prioritize them.</p>

<h3>Location and Jurisdiction</h3>
<p>California projects typically require more engineering depth than those in lower-seismic states. High-wind coastal projects have different demands than inland low-hazard sites. Some jurisdictions require specific calculations formats, third-party review, or additional documentation that increases scope.</p>

<h2>The Right Way to Get a Price</h2>
<p>Send us your architectural drawings, a project description, the address, and your timeline. We'll review the scope and send you a clear proposal within 24 hours — deliverables, timeline, and a fixed fee. No hidden hourly billing after the fact.</p>
    `,
  },

  {
    slug: "what-does-a-structural-engineer-need",
    title: "What Does a Structural Engineer Need to Start? | Apex Grid Engineering",
    description: "The right documents from the start saves everyone time. Here's exactly what to send when you request structural engineering services.",
    h1: "What Does a Structural Engineer Need to Start a Project?",
    tag: "Structural Engineering",
    minutes: 4,
    html: `
<h2>The Basics Every Project Needs</h2>
<p>Getting engineering started quickly depends on sending the right information upfront. Missing information leads to follow-up questions and delays. Here's what a structural engineer typically needs before beginning work.</p>

<h2>Project Description</h2>
<p>A plain-language description of what you're trying to do. Not engineering terminology — just what the project is: "We're removing the wall between the kitchen and living room and need a beam," or "We're adding a 2,000 SF second floor to an existing single-story office building." Include the occupancy type, the size, and any known constraints or special requirements.</p>

<h2>Site Address</h2>
<p>The project address is used to look up seismic design parameters, wind speed, snow load, climate zone, flood zone, and any applicable state-specific requirements. This takes two minutes but is essential to start the structural design.</p>

<h2>Existing Architectural Drawings</h2>
<p>If the building has existing drawings — permitted plans, as-builts, or shop drawings — send them. Structural engineers use architectural plans to understand the floor plan, wall locations, roof geometry, and existing structural conditions. If no drawings exist, we'll discuss how to document existing conditions (see our article on engineering without existing plans).</p>

<h2>Proposed Architectural or Design Plans</h2>
<p>For projects involving changes to the building, send whatever design documents you have — even if they're not final. Schematic floor plans, sketches, or architectural drawings help the structural engineer understand the scope and begin sizing structural elements. Final engineering is coordinated with the final architectural set.</p>

<h2>Photographs of Existing Conditions</h2>
<p>For existing building projects, photos are essential. Photograph the areas where structural work is proposed: exposed framing if accessible, foundation conditions, wall framing, roof framing, and any areas showing cracking or distress. More photos is always better. Annotated photos (labeled with directions, room names, or dimensions) are especially helpful.</p>

<h2>Geotechnical Report (If Available)</h2>
<p>For projects involving new foundations, building additions, or retaining walls, a geotechnical report provides soil bearing capacity, expansion potential, groundwater information, and foundation recommendations. If you have one, send it. If not, we'll advise whether one is needed for your project.</p>

<h2>Project Timeline</h2>
<p>Let us know your permit submittal target date or construction start date. If there's a hard deadline (bid date, city comment response deadline, construction schedule milestone), tell us upfront. This allows us to allocate resources appropriately and flag any timeline concerns early.</p>

<h2>What If You Don't Have Everything?</h2>
<p>Don't wait until you have every document to reach out. Send what you have with a description of what's missing. We'll review the available information, identify what we need, and let you know how to get it. Getting the project scope defined early is almost always better than waiting for a complete package.</p>
    `,
  },

  {
    slug: "structural-engineer-vs-architect",
    title: "Structural Engineer vs. Architect: Who Do You Need? | Apex Grid",
    description: "Architects design how buildings look and function. Structural engineers design how buildings stand up. Most projects need both — here's how they work together.",
    h1: "Structural Engineer vs. Architect: Who Do You Need?",
    tag: "Structural Engineering",
    minutes: 5,
    html: `
<h2>Different Roles, Same Building</h2>
<p>Architects and structural engineers both work on buildings, but they're solving different problems. Understanding the difference helps you know who to call first — and when you need both.</p>

<h2>What an Architect Does</h2>
<p>Architects are responsible for the design of the building as a whole: how it functions, how it looks, how people move through it, how it meets the client's program requirements, and how it complies with zoning, accessibility, and life safety codes. Architects produce the floor plans, elevations, sections, interior layouts, material specifications, and construction documents that tell contractors what to build.</p>
<p>In most states, a licensed architect must sign and seal drawings for new commercial buildings, significant renovations, and projects above certain thresholds. Architecture is about the total built environment — form, function, and code compliance.</p>

<h2>What a Structural Engineer Does</h2>
<p>Structural engineers are responsible for the building's load-carrying system: the foundations, framing, connections, and lateral resistance that keep the building standing under gravity, wind, seismic, and other forces. Structural engineers produce structural drawings and calculations that document the sizes, materials, and configurations of all structural elements.</p>
<p>A structural engineer's stamp is typically required separately from the architect's stamp on any project with meaningful structural scope. The structural engineer takes professional responsibility for the structural system's safety and code compliance.</p>

<h2>How They Work Together</h2>
<p>On most commercial projects, the architect leads the design process and coordinates a team of engineers. The structural engineer works from the architect's floor plans and building geometry to design a structural system that fits the architecture. As the design develops, the structural engineer and architect coordinate continuously — column locations affect floor plan layouts, shear wall placement affects openings, foundation depth affects site design.</p>
<p>This coordination is why integrated firms — those with both architecture and engineering in-house — often deliver faster, more coordinated documents. Fewer handoffs, faster responses to design changes, and a single point of accountability.</p>

<h2>When You Need Only One</h2>
<p>Some projects only need structural engineering: an existing building inspection, a beam replacement in a permitted renovation, equipment anchorage, or a structural report for due diligence. If the architectural scope is already defined and permitted, and you're only making structural modifications, a structural engineer alone may be sufficient.</p>
<p>Some projects may only need architectural services at a given phase — space planning, schematic design, or permit drawing production for interior-only scope. However, as soon as structural elements are affected, a structural engineer's involvement is required.</p>

<h2>Projects That Need Both</h2>
<p>New construction, additions, full renovations, adaptive reuse, and any project that changes the building's footprint, height, or structural system will need both an architect and a structural engineer. They may come from the same firm or be contracted separately — but they must coordinate their work before the drawings go to permit.</p>
    `,
  },

  {
    slug: "original-structural-plans-unavailable",
    title: "Structural Engineering Without Original Building Plans | Apex Grid",
    description: "No existing drawings? Engineers can still work. Here's how structural engineering is completed when original plans are unavailable — and what information helps most.",
    h1: "Can Structural Engineering Be Completed Without Original Building Plans?",
    tag: "Structural Engineering",
    minutes: 6,
    html: `
<h2>Yes — But It Takes More Information</h2>
<p>A large percentage of existing building projects have no drawings on file. Plans get lost, buildings change hands, records are incomplete, or the original construction predates modern drawing standards. Structural engineers work through this regularly. The key is gathering enough verified information about the existing structure to make engineering decisions responsibly.</p>

<h2>Sources of Existing Building Information</h2>
<h3>Field Photographs</h3>
<p>High-quality photos are the most accessible starting point. Photos of exposed framing, foundation conditions, connection details, existing members, and areas of concern give the structural engineer visual confirmation of what's actually in the building. More is better. Annotate photos with directions, locations, and notes about what you're seeing.</p>

<h3>Contractor or Owner Measurements</h3>
<p>Floor plans and key dimensions (bay sizes, wall-to-wall spans, floor-to-floor heights, member depths where accessible) can often be provided by a contractor or building owner. These measurements should be taken carefully — engineering calculations depend on accurate dimensions. Where accessibility allows, framing member sizes (beam depth, flange width, joist spacing) should be included.</p>

<h3>Exploratory Openings</h3>
<p>When framing is concealed behind drywall, stucco, or ceiling finishes, the structural engineer may require exploratory openings — small areas where finishes are removed to expose and photograph the structural framing. A skilled contractor can make and patch these openings with minimal disruption. The structural engineer specifies where openings are needed based on what information is critical to the design.</p>

<h3>City Records</h3>
<p>Many building departments retain permit records, original drawings, and inspection cards for older buildings. The age of available records varies by jurisdiction — some cities have documents going back decades; others have incomplete archives. It's always worth requesting records from the local building department before assuming none exist.</p>

<h3>Existing Architectural Drawings</h3>
<p>Even if original structural drawings aren't available, existing architectural plans (floor plans, roof plans, exterior elevations) are extremely valuable. They establish the building geometry and layout from which structural analysis begins.</p>

<h3>Matterport Scans and Point Clouds</h3>
<p>For larger projects, 3D scanning technology (Matterport or laser scanning) can produce accurate as-built models. These aren't a substitute for engineering judgment but provide a reliable geometric starting point when manual measurements would be time-consuming or inaccessible.</p>

<h2>When a Site Visit Is Required</h2>
<p>For some projects — particularly those involving structural distress, complex existing conditions, or significant structural modifications — a licensed engineer needs to visit the site directly. Remote engineering based on photos and measurements has limits. When the engineer needs to see connections, probe member conditions, assess visible damage, or make judgments that photos can't support, a site visit is necessary.</p>
<p>We'll tell you early in the process whether a site visit is required for your project. Site visits are scheduled efficiently and add value proportional to what they reveal.</p>

<h2>What This Means for Your Project</h2>
<p>Working without existing drawings adds time and sometimes cost — but it doesn't make a project impossible. The key is providing thorough, accurate field information and allowing the engineer enough time to properly document and verify existing conditions before beginning design. Rushing this phase creates risk downstream.</p>
<p>Send us what you have. We'll review it, tell you what additional information is needed, and give you a clear scope and fee proposal.</p>
    `,
  },

  {
    slug: "structural-site-visit",
    title: "When Does a Structural Engineer Need to Visit the Site? | Apex Grid",
    description: "Many projects can be engineered remotely. Some can't. Here's how to know whether your project requires an engineer site visit — and why it matters.",
    h1: "When Does a Structural Engineer Need to Visit the Site?",
    tag: "Structural Engineering",
    minutes: 5,
    html: `
<h2>Remote Engineering Is Common — With the Right Information</h2>
<p>Advances in digital documentation have made remote structural engineering practical for a wide range of projects. Good photos, accurate measurements, existing drawings, and detailed contractor-provided field information can support engineering decisions for many project types without the engineer setting foot on-site.</p>
<p>That said, some conditions require eyes on the structure. Knowing the difference protects the project — and the people who will occupy the building.</p>

<h2>Projects That Often Don't Require a Site Visit</h2>
<ul>
  <li>Residential beam replacements or wall removals with clear framing documentation</li>
  <li>RTU replacements or new rooftop equipment where structural framing is documented and accessible</li>
  <li>New construction engineering coordinated from architectural drawings</li>
  <li>Tenant improvements where the existing structural system is documented and the scope is clearly bounded</li>
  <li>Equipment anchorage design where equipment data sheets and anchor locations are known</li>
</ul>
<p>In these cases, good documentation — especially contractor-provided photos, field measurements, and framing photos through exploratory openings if needed — supports engineering without a site visit.</p>

<h2>Situations That Typically Require a Site Visit</h2>
<h3>Structural Distress Evaluation</h3>
<p>When a building shows cracks, settlement, deflection, or other signs of structural problems, an engineer needs to observe the conditions directly. Photos help, but assessing the severity and cause of structural distress requires professional judgment on-site — sounding walls, probing damage, and evaluating the pattern and extent of cracking in context.</p>

<h3>Complex Existing Conditions Without Documentation</h3>
<p>When a building has no drawings, its structural system is unusual or unclear, and contractor-provided information is insufficient, the engineer may need to visit to make reliable assessments. This is especially common in older buildings with non-standard construction.</p>

<h3>Forensic Engineering or Legal Proceedings</h3>
<p>When engineering is tied to an insurance claim, construction dispute, or legal proceeding, direct site observation and a formal report with firsthand engineer observations are typically required.</p>

<h3>High-Risk or High-Consequence Projects</h3>
<p>Projects involving significant structural modifications, change of occupancy, or building systems that affect life safety may warrant direct engineer observation, particularly if there's uncertainty about existing conditions that can't be resolved through documentation alone.</p>

<h2>How to Prepare for a Site Visit</h2>
<p>Ensure safe access to all areas the engineer needs to see. Coordinate with contractors for any exploratory openings. Have any available drawings, photos, or records on hand. The more organized the site visit, the more information can be captured efficiently — and the better the resulting engineering.</p>
    `,
  },

  {
    slug: "field-verification-for-engineering",
    title: "What Field Information Does a Structural Engineer Need? | Apex Grid",
    description: "Good field documentation makes remote engineering possible. Here's exactly what information helps most — and how to collect it correctly.",
    h1: "What Field Information Does a Structural Engineer Need?",
    tag: "Structural Engineering",
    minutes: 5,
    html: `
<h2>Why Field Information Matters</h2>
<p>Structural engineers design based on what's actually in the building. When drawings aren't available or conditions have changed from original design, field-collected information fills the gap. The quality of that information directly affects the accuracy and reliability of the engineering.</p>

<h2>Essential Field Information</h2>
<h3>Photographs</h3>
<p>Photographs are the most powerful documentation tool. For structural purposes, photos should capture:</p>
<ul>
  <li>Exposed framing members (beams, joists, columns, studs) with measurements when possible</li>
  <li>Connection details — how members attach to each other and to the structure</li>
  <li>Foundation walls or footings where visible</li>
  <li>Any areas of cracking, damage, deflection, or distress</li>
  <li>Overall room dimensions and ceiling heights</li>
  <li>Roof framing and existing HVAC curb or penetration locations</li>
</ul>
<p>Label photos with compass direction, room name, and description. Include a measuring tape in framing photos for scale. Photograph in good lighting — use supplemental lighting if needed.</p>

<h3>Framing Member Dimensions</h3>
<p>When framing is accessible, measure and record member sizes. For steel members, note the section depth (beam height), flange width, and web thickness. For wood members, note actual dimensions (not nominal), spacing, and span. For concrete, note wall or slab thickness and rebar spacing if visible.</p>

<h3>Floor Plan Dimensions</h3>
<p>Measure wall-to-wall dimensions for every room, hallway, and opening in the project area. Include door and window opening sizes and locations. Note column or post locations and any existing steel beams or headers visible in the ceiling or at openings.</p>

<h3>Story Heights</h3>
<p>Record floor-to-ceiling heights, floor-to-underside-of-framing heights, and total floor-to-floor heights where multi-story. These drive the structural system sizing for columns, walls, and lateral elements.</p>

<h3>Equipment Information</h3>
<p>For projects involving equipment installation, provide the equipment manufacturer's data sheets showing weight, dimensions, center of gravity, and required mounting pattern. For RTUs, also note existing curb size and location relative to roof framing.</p>

<h2>How Contractors Help</h2>
<p>On most existing building projects, the general contractor or a skilled subcontractor collects field information in coordination with the structural engineer. The engineer specifies what's needed; the contractor provides the access, measurements, and photos. This is a well-established workflow on TI, renovation, and equipment replacement projects.</p>
<p>The key is clarity upfront about what information is needed — and confirmation that the contractor has collected it completely before engineering begins in earnest.</p>
    `,
  },

  {
    slug: "load-bearing-wall-engineering",
    title: "Do You Need a Structural Engineer to Remove a Load-Bearing Wall?",
    description: "Yes — every time. Here's why load-bearing wall removal always requires structural engineering, what the process looks like, and what to expect.",
    h1: "Do You Need a Structural Engineer to Remove a Load-Bearing Wall?",
    tag: "Structural Engineering",
    minutes: 5,
    html: `
<h2>Yes — Every Time</h2>
<p>Removing a load-bearing wall without structural engineering is one of the most dangerous things you can do in a renovation — and one of the most commonly permitted violations found during real estate transactions. The wall is there for a reason. Before removing it, a structural engineer needs to verify the loads, design the replacement beam, and confirm that the structure below can handle the concentrated loads that result.</p>

<h2>How Structural Engineers Determine Load-Bearing Conditions</h2>
<p>The first step is verifying whether the wall actually carries loads from above. Structural engineers look at:</p>
<ul>
  <li>The direction of floor or roof joists relative to the wall — members typically bear perpendicular to load-bearing walls</li>
  <li>The position of the wall relative to the structural system above and below</li>
  <li>Whether posts, columns, or concentrated supports are located at the wall in the story above</li>
  <li>Existing drawings, if available, showing the original structural system</li>
</ul>
<p>In the absence of drawings, field verification through exploratory openings (removing small sections of drywall or ceiling) allows the engineer to see the framing directly. Assumptions are never made when direct verification is possible.</p>

<h2>What the Engineer Designs</h2>
<h3>The Replacement Beam</h3>
<p>The beam must carry all the loads previously distributed along the wall length. The engineer calculates the tributary area, the dead and live loads, and sizes the beam in the appropriate material — LVL, steel, or glulam are common choices based on span, load, and available depth.</p>

<h3>Posts and Bearing Points</h3>
<p>The beam must transfer its loads down to the foundation at its endpoints. The engineer sizes the posts (or verifies existing posts) and checks that the loads can be transferred through the structure below — through each floor level and into the foundation without overstressing members along the way.</p>

<h3>Footing Modifications</h3>
<p>When the concentrated load at the post location exceeds what the existing footing can carry, the engineer designs a footing modification or new footing. This is common — walls distribute loads; posts concentrate them. A foundation upgrade is sometimes the most significant cost in a wall removal project.</p>

<h2>Permit and Inspection Requirements</h2>
<p>Load-bearing wall removal requires a building permit in virtually every jurisdiction. The permit requires PE-stamped structural drawings and calculations. The work is then inspected before finishes are closed — the inspector verifies that the beam, posts, and connections were installed per the approved plans. Unpermitted wall removal is a liability that follows the property through every future sale.</p>
    `,
  },

  {
    slug: "rooftop-hvac-structural-review",
    title: "Does New Rooftop HVAC Equipment Require Structural Review? | Apex Grid",
    description: "In most cases, yes. Here's when rooftop RTU replacement or new mechanical equipment triggers a structural engineering requirement — and what that review covers.",
    h1: "Does New Rooftop HVAC Equipment Require Structural Review?",
    tag: "Structural Engineering",
    minutes: 4,
    html: `
<h2>Why Rooftop Equipment and Structural Engineering Go Together</h2>
<p>Rooftop mechanical units are heavy — commercial RTUs commonly weigh 800 to 4,000 pounds. When that weight is concentrated on a roof curb, it imposes point loads on the roof framing that may or may not have been anticipated in the original structural design. Adding, replacing, or relocating RTUs without a structural review means assuming the roof can handle loads it may never have been designed for.</p>

<h2>When Structural Review Is Required</h2>
<h3>New Equipment Larger or Heavier Than What It Replaces</h3>
<p>If you're replacing an RTU with a newer unit of similar size and weight at the same curb location, the structural impact is likely unchanged. But if the new unit is heavier, larger, or being placed at a new curb location, the structural engineer needs to evaluate whether the existing framing can support it.</p>

<h3>Permit Requirements</h3>
<p>Many jurisdictions require PE-stamped structural calculations and details for rooftop mechanical permits, regardless of whether the equipment is new or a replacement. The requirement is often triggered by the mechanical permit itself. Check with the permitting authority or ask your mechanical contractor — structural documentation is commonly part of the mechanical permit submittal package.</p>

<h3>New Curb Locations</h3>
<p>Relocating an RTU to a new position on the roof almost always requires structural engineering. The structural framing below the new location may be entirely different from the original curb location — and needs to be evaluated for the new loads.</p>

<h3>Older Buildings With Unknown Structural Capacity</h3>
<p>Older commercial buildings — pre-1990 construction especially — were often designed to code standards with lower equipment load allowances than modern units require. A structural review verifies that the existing framing is adequate or identifies the reinforcement needed.</p>

<h2>What the Structural Review Includes</h2>
<p>The structural engineer reviews the existing roof framing (beams, joists, connections) in the vicinity of the RTU location, calculates the imposed loads from the new unit, checks the capacity of the existing members and their connections, and either clears the installation or designs reinforcement. The deliverable is typically a one- to three-page structural calculation package and a detail drawing showing the curb framing and any required reinforcement.</p>

<h2>Coordinating With the Mechanical Engineer</h2>
<p>The mechanical engineer selects the equipment and determines the curb location and size. The structural engineer uses that information to evaluate the roof framing. Both sets of documents should be coordinated before the permit submittal — a mismatch between the mechanical and structural drawings creates comment responses that delay the permit.</p>
    `,
  },

  {
    slug: "building-cracks-structural-engineer",
    title: "When Should Building Cracks Be Evaluated by a Structural Engineer?",
    description: "Not all cracks are structural emergencies — but some are. Here's how to tell the difference and when to call a structural engineer.",
    h1: "When Should Building Cracks Be Evaluated by a Structural Engineer?",
    tag: "Structural Engineering",
    minutes: 5,
    html: `
<h2>Cracks Are Common — But Not All Are Equal</h2>
<p>Nearly every building develops some cracking over time. The question isn't whether cracks exist — it's whether any particular crack indicates a structural problem. Understanding crack patterns, locations, and characteristics helps determine urgency.</p>

<h2>Cracks That Warrant Immediate Evaluation</h2>
<ul>
  <li><strong>Large diagonal cracks at window or door corners</strong> — particularly if they're wide (more than 1/4 inch) or if the opening is racking (doors or windows no longer operating correctly)</li>
  <li><strong>Stair-step cracking in masonry or brick</strong> — this pattern typically indicates differential settlement or lateral movement of the foundation or wall</li>
  <li><strong>Horizontal cracks in foundation walls</strong> — especially in basement or retaining walls, where horizontal cracking may indicate soil pressure causing flexural failure</li>
  <li><strong>Cracks accompanied by visible deflection or movement</strong> — if the building feels like it's moving, sagging, or leaning in association with cracks, treat it as urgent</li>
  <li><strong>Sudden cracks following an earthquake, nearby excavation, or heavy construction vibration</strong></li>
</ul>

<h2>Cracks That Are Likely Cosmetic (But Worth Monitoring)</h2>
<ul>
  <li>Hairline cracks in drywall at corners — typically shrinkage or thermal movement, not structural</li>
  <li>Fine cracks running along drywall seams or at ceiling-wall junctions — common in newer construction during initial settlement</li>
  <li>Surface cracks in concrete slabs that don't show vertical offset between the two sides</li>
</ul>
<p>Even cosmetic-appearing cracks can mask deeper problems. If you're uncertain, a structural evaluation is worth the cost — especially in older buildings, before a property sale, or after any event that could have stressed the structure.</p>

<h2>What a Structural Crack Evaluation Includes</h2>
<p>The structural engineer observes the cracks directly — their location, pattern, width, depth, and any associated building distress. The evaluation looks for cause (settlement, lateral movement, shrinkage, impact, overload) and assesses whether the cracking indicates a structural deficiency that requires repair or a cosmetic condition that requires only monitoring. The output is a written report with findings, conclusions, and recommendations.</p>

<h2>Before You Call a Contractor</h2>
<p>Get a structural assessment before patching or repairing cracks that concern you. Patching over a crack that results from ongoing structural movement doesn't solve the underlying problem — and makes it harder to monitor whether the condition is progressing.</p>
    `,
  },

  {
    slug: "structural-permit-plans",
    title: "When Are Structural Plans Required for a Building Permit? | Apex Grid",
    description: "Most projects that touch structural elements require PE-stamped structural drawings for the building permit. Here's what triggers the requirement.",
    h1: "When Are Structural Plans Required for a Building Permit?",
    tag: "Structural Engineering",
    minutes: 4,
    html: `
<h2>The General Rule</h2>
<p>Any project that affects the structural system of a building — or that involves new construction — requires structural drawings and calculations as part of the permit submittal. These documents must typically be signed and sealed by a licensed professional engineer (PE). "Structural system" includes foundations, framing members, lateral systems (shear walls, braced frames), and any element that carries loads from the building to the ground.</p>

<h2>Common Permit Triggers</h2>
<ul>
  <li><strong>Load-bearing wall removal</strong> — always requires structural engineering</li>
  <li><strong>New beams or headers</strong> — any beam added or modified in a permitted scope</li>
  <li><strong>Building additions</strong> — new foundations, floor framing, roof framing, and lateral system design</li>
  <li><strong>Rooftop equipment</strong> — RTUs, generators, solar, and heavy mechanical units often require structural calculation</li>
  <li><strong>Mezzanines and platforms</strong> — new elevated platforms or mezzanines within existing buildings</li>
  <li><strong>Retaining walls above a threshold height</strong> (typically 4 feet in most jurisdictions)</li>
  <li><strong>Decks above grade</strong> — typically any elevated deck requires structural documentation</li>
  <li><strong>Seismic retrofits</strong> — the entire point of the permit is to document the structural work</li>
  <li><strong>Change of occupancy</strong> — when the new use requires higher design loads</li>
</ul>

<h2>How Jurisdictions Vary</h2>
<p>Building codes are adopted and amended at the state and local level. Permit requirements — and the specific format of structural documents required — vary by jurisdiction. Some cities have prescriptive standards that allow simple projects without full engineering (conventional light-frame construction in low-hazard areas, for example). Others require PE stamps for a broader range of work. When in doubt, ask the building department or reach out to a structural engineer with the project address and scope — we'll tell you what the jurisdiction requires.</p>

<h2>Why Getting It Right Matters</h2>
<p>Pulling permits with the required structural documentation protects you legally, ensures the work is inspected, and creates a permanent record that the work was done correctly. Unpermitted structural work creates problems at sale (due diligence flags unpermitted work), may not be covered by insurance, and creates liability for any resulting injury or damage.</p>
    `,
  },

  // ─── MEP KNOWLEDGE CENTER ─────────────────────────────────────────────────

  {
    slug: "what-is-mep-engineering",
    title: "What Is MEP Engineering? | Apex Grid Engineering",
    description: "MEP stands for Mechanical, Electrical, and Plumbing — the three building systems engineering disciplines that make a building function. Here's what each discipline covers.",
    h1: "What Is MEP Engineering?",
    tag: "MEP Engineering",
    minutes: 5,
    html: `
<h2>The Building Systems That Make a Building Work</h2>
<p>MEP engineering covers the three building systems disciplines — Mechanical, Electrical, and Plumbing — that make buildings habitable, functional, and code-compliant. While structural engineers keep the building standing and civil engineers handle the site, MEP engineers design everything that flows through the building: air, electricity, water, and gas.</p>

<h2>Mechanical Engineering</h2>
<p>Mechanical engineering covers heating, ventilation, and air conditioning (HVAC) systems. This includes equipment selection (RTUs, chillers, air handlers, fan coil units, split systems, VRF systems), ductwork design, ventilation calculations (outside air, exhaust), load calculations to size equipment correctly, and energy compliance (ASHRAE 90.1, Title 24, IECC). Mechanical engineers also design specialty exhaust systems — commercial kitchen exhaust and make-up air, laboratory fume hoods, industrial process exhaust, and healthcare pressure relationship systems.</p>

<h2>Electrical Engineering</h2>
<p>Electrical engineering covers power distribution from the utility service entrance through the building's panels, feeders, and branch circuits. This includes electrical load calculations, service sizing, panel schedules, one-line diagrams, lighting design, emergency power systems (generators, transfer switches, UPS), EV charging infrastructure, solar PV interconnection, and battery energy storage. Electrical engineers ensure the building has adequate power capacity, proper protection, and code-compliant wiring design for all connected loads.</p>

<h2>Plumbing Engineering</h2>
<p>Plumbing engineering covers domestic cold and hot water distribution, sanitary waste and vent systems, storm drainage, gas piping, and specialty systems like medical gas, laboratory gas, or commercial kitchen utilities. Plumbing engineers size piping systems, verify code-required fixture counts, coordinate roof drain locations with structural, and design specialty systems to applicable standards.</p>

<h2>Why Integrated MEP Matters</h2>
<p>Mechanical, electrical, and plumbing systems share the same space inside a building — above ceilings, in walls, in mechanical rooms and electrical rooms. When these systems are coordinated by a single MEP engineering team (or a tightly coordinated set of disciplines), conflicts are caught on paper instead of in the field. Our guide to <a href="/answers/mep-engineering-scope-of-work/">MEP engineering scope and deliverables</a> explains how those responsibilities should be defined.</p>

<p>Project teams comparing roles can review <a href="/answers/mep-engineer-vs-mechanical-engineer/">MEP engineers versus mechanical engineers</a>. Specialized facilities should define their criteria early; see the requirements for <a href="/answers/cleanroom-mep-engineering-requirements/">cleanroom MEP engineering</a> and <a href="/answers/medical-office-mep-requirements/">medical office MEP engineering</a>.</p>

<h2>When Do You Need MEP Engineering?</h2>
<p>Projects that modify building systems may require MEP engineering for permit, depending on scope and jurisdiction. Commercial renovations, tenant improvements, restaurants, clinics, multifamily work, industrial changes, and equipment upgrades commonly need coordinated documents. Review <a href="/answers/mep-permit-drawings-requirements/">what MEP permit drawings may need to include</a> before setting the submission scope.</p>
    `,
  },

  {
    slug: "mep-engineering-cost",
    title: "How Much Does MEP Engineering Cost? | Apex Grid Engineering",
    description: "MEP engineering fees depend on project size, systems complexity, number of disciplines, and deliverables. Here's what drives the cost.",
    h1: "How Much Does MEP Engineering Cost?",
    tag: "MEP Engineering",
    minutes: 5,
    html: `
<h2>No Universal Price — But Here's How It Works</h2>
<p>MEP engineering fees scale with the complexity and scope of the work. A single-discipline scope (mechanical only for a restaurant TI) costs less than a full MEP package for a new healthcare clinic. Here are the primary variables that drive MEP fees.</p>

<h2>Number of Disciplines</h2>
<p>MEP can mean all three disciplines together, or just one or two. A commercial kitchen renovation might need mechanical (exhaust and make-up air) and plumbing (grease interceptor, floor drains, utility rough-ins) but not full electrical if the existing service is adequate. A lighting upgrade might need electrical only. Each discipline adds scope and cost — but a single integrated team is almost always more cost-effective than three separate firms.</p>

<h2>Project Size</h2>
<p>Square footage is a rough proxy for MEP scope — more space means more equipment, more ducting, more circuits, more fixtures. A 1,000 SF coffee shop TI is fundamentally different from a 20,000 SF medical office. Fees scale accordingly.</p>

<h2>Systems Complexity</h2>
<p>A straightforward office TI with a standard VAV HVAC system and basic lighting is less complex than a healthcare outpatient clinic with pressure relationship requirements, isolation rooms, specialized medical gas, and emergency power for critical equipment. Complexity multiplies engineering hours regardless of square footage.</p>

<h2>New Construction vs. Existing Buildings</h2>
<p>TI and renovation projects often require MEP engineers to assess existing systems before designing changes. Understanding what's already installed, what's at capacity, and what can be reused adds scope that new construction doesn't have. Existing building MEP often requires field coordination that adds time.</p>

<h2>Energy Compliance Documentation</h2>
<p>Projects in California (Title 24), Washington, Massachusetts, and other states with strict energy codes require additional compliance documentation — energy calculations, certificate of compliance forms, Title 24 reports. This is a scope add that's required by the AHJ, not optional.</p>

<h2>Permit Package vs. Schematic</h2>
<p>Full permit-ready MEP construction documents cost more than schematic-level or design development documents. If you need stamped permit drawings, equipment schedules, and full calculations, budget accordingly. If you're in early design and need preliminary sizing, that's a different (smaller) scope.</p>

<h2>Getting a Quote</h2>
<p>Send us the architectural drawings, project address, occupancy type, and a description of the mechanical and electrical systems involved. We'll review the scope and send a clear fixed-fee proposal within 24 hours — deliverables, timeline, and a fee that doesn't change unless your scope does.</p>
    `,
  },

  {
    slug: "mep-permit-plans",
    title: "When Are MEP Plans Required for a Building Permit? | Apex Grid",
    description: "Virtually every commercial project requires MEP engineering documents for a permit. Here's what triggers the requirement and what the permit package includes.",
    h1: "When Are MEP Plans Required for a Building Permit?",
    tag: "MEP Engineering",
    minutes: 4,
    html: `
<h2>The Short Answer: Most Commercial Projects</h2>
<p>Any project that modifies or installs mechanical, electrical, or plumbing systems in a commercial building requires MEP engineering documents for the building permit. These documents — signed and sealed by licensed professional engineers — tell the plan reviewer and building inspector exactly what systems are being installed and how they comply with the applicable codes.</p>

<h2>What Triggers MEP Plan Requirements</h2>
<h3>Mechanical (M Permit)</h3>
<ul>
  <li>HVAC system installation or replacement</li>
  <li>Ductwork modifications or new duct systems</li>
  <li>Commercial kitchen exhaust and make-up air</li>
  <li>Ventilation systems</li>
  <li>Rooftop equipment installation</li>
</ul>

<h3>Electrical (E Permit)</h3>
<ul>
  <li>New or expanded electrical service</li>
  <li>Panel additions or replacements</li>
  <li>Lighting systems</li>
  <li>EV charging infrastructure</li>
  <li>Generator and emergency power systems</li>
  <li>Solar PV systems</li>
</ul>

<h3>Plumbing (P Permit)</h3>
<ul>
  <li>New or modified water service</li>
  <li>Plumbing fixture additions or relocations</li>
  <li>Gas piping modifications</li>
  <li>Grease interceptors</li>
  <li>Sewer line work</li>
</ul>

<h2>What's in a Permit-Ready MEP Set</h2>
<p>A complete MEP permit package includes: plans showing equipment locations, duct and pipe routing, and fixture layouts; schedules listing equipment sizes and specifications; one-line diagrams for electrical; calculations demonstrating code compliance (load calculations, ventilation calculations, energy compliance); and PE stamps from the engineer of record for each discipline. Some jurisdictions also require a separate energy compliance package (Title 24, IECC compliance forms).</p>

<h2>Tenant Improvements Are the Most Common Trigger</h2>
<p>Commercial tenant improvement projects are the most frequent driver of MEP permits. Even "simple" TIs — a new coffee shop, a medical suite, an office renovation — typically touch all three MEP disciplines and require a full engineering package. Starting the engineering process as soon as the architectural design is underway keeps permitting on schedule.</p>
    `,
  },

  {
    slug: "restaurant-mep-plans",
    title: "What MEP Plans Does a Restaurant Need? | Apex Grid Engineering",
    description: "Restaurants are one of the most MEP-intensive building types. Here's a complete breakdown of what mechanical, electrical, and plumbing engineering a restaurant permit requires.",
    h1: "What MEP Plans Does a Restaurant Need?",
    tag: "MEP Engineering",
    minutes: 6,
    html: `
<h2>Restaurants Are Complex MEP Projects</h2>
<p>A restaurant tenant improvement has some of the most demanding MEP requirements of any commercial use. Commercial kitchen exhaust, make-up air, gas, grease interceptors, high electrical loads from cooking equipment, and ventilation for dining areas all need to be engineered, coordinated, and permitted. Here's a complete breakdown by discipline.</p>

<h2>Mechanical Engineering</h2>
<h3>Kitchen Exhaust (Type I Hood)</h3>
<p>Any commercial cooking equipment that produces grease-laden vapors — fryers, griddles, charbroilers, ovens — requires a Type I hood with a grease exhaust system. The mechanical engineer designs the exhaust rate (CFM), duct sizing and routing, fan selection, and grease management. The exhaust duct must be constructed of 16-gauge steel, continuously welded, and routed to an approved termination point.</p>

<h3>Make-Up Air</h3>
<p>Every CFM exhausted from the kitchen must be replaced — either from the building's HVAC system or a dedicated make-up air unit (MAU). Insufficient make-up air creates negative pressure that causes backdrafting, odor migration to the dining room, and equipment performance problems. The mechanical engineer sizes and locates the MAU in coordination with the exhaust system and kitchen layout.</p>

<h3>HVAC for Dining and Support Areas</h3>
<p>The dining room, bar, restrooms, storage, and office areas require HVAC engineering: load calculations, equipment selection (typically rooftop units or split systems), ductwork design, and thermostat zoning. Ventilation calculations verify minimum outside air rates for occupancy.</p>

<h2>Electrical Engineering</h2>
<p>Restaurants have high electrical demands: commercial cooking equipment, refrigeration, lighting, HVAC, exhaust fans, and POS systems all need power. The electrical engineer calculates total connected and demand loads, sizes the service (often 400A or 800A for full-service restaurants), designs the panel schedule, and lays out circuits for equipment. Kitchen equipment typically requires a dedicated circuit per appliance — the electrical engineer coordinates with the kitchen equipment plan.</p>

<h2>Plumbing Engineering</h2>
<h3>Grease Interceptor</h3>
<p>Nearly every commercial kitchen is required to have a grease interceptor (grease trap) — either an indoor hydromechanical interceptor or a larger below-grade gravity interceptor. The local sewer authority specifies the minimum size. The plumbing engineer designs the interceptor sizing, location, and connection to the sanitary system.</p>

<h3>Kitchen Plumbing</h3>
<p>Commercial dishwashers, prep sinks, three-compartment sinks, mop sinks, and other kitchen fixtures are all plumbing scope. Floor drains in the kitchen and at dish areas, hot water for high-temp dishwashers, and pre-rinse spray valves all need to be engineered and coordinated with kitchen equipment layouts.</p>

<h3>Gas Piping</h3>
<p>Natural gas for cooking equipment requires a gas piping design: pipe sizing, BTU demands for each appliance, pressure drops, and emergency shutoff requirements. The plumbing engineer sizes the gas service from the meter and designs the branch piping to each appliance.</p>

<h2>Coordination Is Critical</h2>
<p>Restaurant MEP is highly interdependent. The kitchen exhaust location drives the structural opening through the roof. The make-up air unit connects to the exhaust and needs rooftop structural clearance. The gas appliance locations drive both gas piping and the exhaust hood. Starting MEP engineering early — with a coordinated kitchen equipment plan — avoids expensive redesign later.</p>
    `,
  },

  {
    slug: "mep-engineering-timeline",
    title: "How Long Does MEP Engineering Take? | Apex Grid Engineering",
    description: "MEP engineering timelines depend on scope and project type. Here's what to expect — and how to keep your schedule on track.",
    h1: "How Long Does MEP Engineering Take?",
    tag: "MEP Engineering",
    minutes: 4,
    html: `
<h2>Typical MEP Engineering Timelines</h2>
<p>MEP engineering timelines depend heavily on project size, system complexity, how complete the architectural documents are, and whether existing conditions need to be verified. Here are general benchmarks.</p>

<h2>Small TI Projects (Under 5,000 SF)</h2>
<p>A simple commercial tenant improvement — office fit-out, small retail, straightforward restaurant TI — typically takes two to four weeks from final architectural documents to permit-ready MEP drawings. Projects with rushed permit schedules can sometimes be accelerated, though schedule changes usually have cost implications.</p>

<h2>Mid-Size Projects (5,000–20,000 SF)</h2>
<p>Medical office fit-outs, multi-tenant retail, larger restaurant projects, and industrial TIs in this size range typically take three to six weeks for MEP engineering. Projects with complex systems (healthcare pressure relationships, extensive electrical loads, specialty exhaust) trend toward the longer end.</p>

<h2>Large or Complex Projects</h2>
<p>New construction, full building MEP systems design, data centers, hospitals, or multifamily buildings are eight to twelve weeks or longer depending on scale. These projects go through design development phases before the permit set — schematic design, design development, and then construction documents.</p>

<h2>What Slows Engineering Down</h2>
<ul>
  <li>Architectural drawings that aren't complete or finalized when MEP starts</li>
  <li>Equipment selections not made — MEP engineers need to know what equipment is being installed</li>
  <li>Existing conditions that need field verification before design can begin</li>
  <li>Plan check comment responses — jurisdiction review times vary; some cities take 4–8 weeks for first review</li>
  <li>Design changes during engineering — scope changes restart portions of the work</li>
</ul>

<h2>How to Keep MEP on Schedule</h2>
<p>Start MEP engineering as early as possible — ideally when architectural design development is 50–75% complete. Final architectural documents aren't required to begin MEP; preliminary layouts and confirmed equipment selections are enough to start. Late engagement of MEP engineers is the most common cause of schedule delays in commercial construction.</p>
    `,
  },

  {
    slug: "hvac-load-calculation",
    title: "What Is an HVAC Load Calculation? | Apex Grid Engineering",
    description: "HVAC load calculations determine how much heating and cooling a building needs. Here's what they include, why they matter, and when they're required.",
    h1: "What Is an HVAC Load Calculation?",
    tag: "MEP Engineering",
    minutes: 4,
    html: `
<h2>The Foundation of HVAC Design</h2>
<p>An HVAC load calculation is the process of determining how much heat enters or leaves a building (or a zone within a building) under design conditions — the hottest summer day or coldest winter night. The result drives equipment sizing: the mechanical engineer uses the calculated heating and cooling loads to select the right HVAC system and size the equipment appropriately.</p>

<h2>What Load Calculations Include</h2>
<h3>Cooling Loads</h3>
<p>Cooling load calculations account for every source of heat gain in the building during peak cooling conditions:</p>
<ul>
  <li>Solar heat gain through windows and walls (driven by orientation, glazing type, and shading)</li>
  <li>Conduction through walls, roofs, and slabs</li>
  <li>Internal gains from occupants (people generate significant heat)</li>
  <li>Internal gains from lighting and equipment (computers, kitchen equipment, servers)</li>
  <li>Ventilation — outside air brought in for occupancy requirements carries outdoor heat</li>
</ul>

<h3>Heating Loads</h3>
<p>Heating load calculations determine how much heat must be added to maintain comfortable indoor temperatures during design winter conditions:</p>
<ul>
  <li>Conduction losses through walls, roofs, windows, and slabs</li>
  <li>Infiltration (air leaking into the building)</li>
  <li>Ventilation (cold outside air brought in mechanically)</li>
</ul>

<h2>Why Proper Sizing Matters</h2>
<p>Oversized HVAC equipment short-cycles — it satisfies the thermostat before adequately dehumidifying the air, leaving spaces that feel clammy even when the temperature is met. It also wastes energy and wears equipment faster. Undersized equipment can't maintain design conditions on peak days. Properly sized equipment runs efficiently, controls humidity, and provides consistent comfort over its full service life.</p>

<h2>When Load Calculations Are Required</h2>
<p>Load calculations are required for virtually every commercial HVAC permit. Energy codes (ASHRAE 90.1, Title 24, IECC) require equipment to be properly sized — and permit authorities increasingly verify this through the submitted mechanical documentation. The mechanical engineer includes the load calculations as part of the permit package.</p>
    `,
  },

  {
    slug: "electrical-load-calculation",
    title: "What Is an Electrical Load Calculation? | Apex Grid Engineering",
    description: "Electrical load calculations determine the total power demand of a building and drive service sizing. Here's what they include and why they matter for your project.",
    h1: "What Is an Electrical Load Calculation?",
    tag: "MEP Engineering",
    minutes: 4,
    html: `
<h2>The Basis for Electrical Service Sizing</h2>
<p>An electrical load calculation is the process of totaling all the electrical loads in a building — every circuit, appliance, system, and piece of equipment — and determining the total demand that the electrical service must be sized to handle. The result drives the service entrance size (100A, 200A, 400A, 800A, etc.), the main panel capacity, and the feeder sizes throughout the building.</p>

<h2>What Goes Into the Calculation</h2>
<p>Load calculations follow the National Electrical Code (NEC), which defines standard demand factors for different load types. The calculation includes:</p>
<ul>
  <li><strong>Lighting loads</strong> — calculated at a per-square-foot basis by occupancy type, plus actual connected load from the lighting schedule</li>
  <li><strong>Receptacle loads</strong> — general purpose outlets and dedicated equipment circuits</li>
  <li><strong>HVAC equipment</strong> — air handlers, condensing units, exhaust fans, and associated controls</li>
  <li><strong>Kitchen and cooking equipment</strong> — ovens, fryers, dishwashers, refrigeration compressors</li>
  <li><strong>Special loads</strong> — EV chargers, welding equipment, medical equipment, data center loads, elevator motors</li>
  <li><strong>Demand factors</strong> — the NEC allows diversity factors for certain load categories (not all loads run simultaneously at full rated value)</li>
</ul>

<h2>Why Getting It Right Matters</h2>
<p>An undersized electrical service creates immediate problems: breakers trip, equipment doesn't start, and the building can't support its intended use. An oversized service costs more to install and sets up a higher utility demand charge. Accurate load calculations — done by a licensed electrical engineer who understands both the NEC requirements and the building's actual usage patterns — result in a service that's right-sized for the project.</p>

<h2>Load Calculations and Utility Coordination</h2>
<p>The utility provider reviews the electrical load calculation when approving service upgrades. If you're increasing electrical service to a building, the utility needs to know the requested service size and the basis for it. An electrical engineer's load calculation provides this documentation in a format the utility can act on.</p>
    `,
  },

  // ─── PROCESS / PERMIT KNOWLEDGE CENTER ───────────────────────────────────

  {
    slug: "what-is-a-pe-stamp",
    title: "What Does a PE Stamp Mean? | Apex Grid Engineering",
    description: "A PE stamp is a professional engineer's seal and signature — it means a licensed engineer reviewed and takes professional responsibility for the work. Here's what it means and when you need it.",
    h1: "What Does a PE Stamp Mean?",
    tag: "Permit Engineering",
    minutes: 4,
    html: `
<h2>What a PE Stamp Represents</h2>
<p>A PE stamp — the embossed or printed seal of a licensed Professional Engineer — is a statement of professional responsibility. When an engineer stamps drawings or calculations, they are certifying that the documents were prepared or reviewed under their supervision and that, to the best of their professional knowledge and judgment, the work complies with applicable codes and standards and is technically sound.</p>
<p>This isn't a rubber stamp — it's professional liability. Engineers who stamp work incorrectly face disciplinary action from their state licensing board, civil liability, and potential loss of their license.</p>

<h2>What a PE Stamp Is Not</h2>
<p>A PE stamp is not a guarantee of perfection — engineering involves judgment, and engineering documents are based on the information available at the time. It is also not simply a service that can be purchased. Engineers are legally prohibited from stamping work they didn't prepare or adequately review. Any firm that offers to "provide stamps" for work they haven't engineered should be avoided — this practice is both illegal and dangerous.</p>

<h2>When PE-Stamped Documents Are Required</h2>
<p>Most jurisdictions require PE-stamped structural, mechanical, electrical, and plumbing engineering documents for commercial projects above certain thresholds. The specific requirements vary by state and locality — some states have stricter exemption thresholds than others. Generally speaking, any commercial project with structural scope, complex building systems, or new construction requires PE-stamped engineering documents as part of the permit submittal.</p>

<h2>Which PE for Which Scope</h2>
<p>Engineers are licensed by discipline — a structural PE is licensed for structural work, a mechanical PE for mechanical, an electrical PE for electrical, and so on. The same engineer can hold licenses in multiple disciplines, but the stamp must be from a PE licensed in the discipline being covered. State licensure is also specific — an Arizona PE must be licensed in California to stamp California projects. Most engineering firms carry multi-state licensure for the markets they serve.</p>
    `,
  },

  {
    slug: "mep-tenant-improvement",
    title: "What MEP Engineering Is Required for a Tenant Improvement? | Apex Grid",
    description: "Tenant improvements almost always require MEP engineering. Here's what disciplines are typically involved, what documents are needed, and how to keep the permit on schedule.",
    h1: "What MEP Engineering Is Required for a Tenant Improvement?",
    tag: "MEP Engineering",
    minutes: 5,
    html: `
<h2>TIs Are the Most Common MEP Project Type</h2>
<p>Commercial tenant improvement projects — new tenants moving into existing space, business expansions, building renovations — represent the most common category of commercial construction. And nearly all of them require MEP engineering. Here's how to understand what's needed for your TI.</p>

<h2>Mechanical Engineering for TIs</h2>
<p>The mechanical scope depends on what's changing. Common TI mechanical scope includes:</p>
<ul>
  <li>HVAC modifications or additions — new zones, relocated equipment, rebalancing</li>
  <li>Exhaust systems for new occupancies (restaurants, medical, lab, industrial)</li>
  <li>Outside air calculations for new occupancy loads</li>
  <li>Title 24 or ASHRAE 90.1 energy compliance for altered systems</li>
</ul>
<p>If the existing HVAC is being reused and the occupancy load doesn't change significantly, the mechanical scope may be limited. If the space is being changed to a higher-ventilation use (dining, clinic, gym), a full mechanical redesign may be required.</p>

<h2>Electrical Engineering for TIs</h2>
<p>Electrical TI scope typically includes:</p>
<ul>
  <li>Load calculations confirming the existing service is adequate (or designing an upgrade)</li>
  <li>Panel schedule updates for new or relocated circuits</li>
  <li>Lighting design for remodeled spaces</li>
  <li>Dedicated circuits for new equipment</li>
  <li>EV charging, if required by the local code for new TIs</li>
</ul>

<h2>Plumbing Engineering for TIs</h2>
<p>Plumbing scope is driven by fixture changes and occupancy type:</p>
<ul>
  <li>New restrooms or relocated fixtures</li>
  <li>Kitchen or break room additions</li>
  <li>Gas piping modifications</li>
  <li>Specialty systems (grease interceptors, medical gas, lab plumbing)</li>
</ul>

<h2>When to Start MEP Engineering</h2>
<p>Start MEP engineering as early as the architectural layout is established — you don't need final drawings to begin. Waiting until architectural documents are complete before engaging MEP engineers is the most common cause of permit delays on TI projects. Early engagement allows the MEP engineers to identify conflicts, flag equipment room requirements, and coordinate systems before the architectural layout is locked.</p>
    `,
  },
];

/** Legacy root-level resource articles that pre-date the discipline subdirectory structure.
 * Added here so the generator owns and regenerates them under the correct discipline paths. */
const LEGACY_RESOURCE_ARTICLES: ResourceArticle[] = [
  {
    slug: "ashrae-90-1-vs-iecc-commercial-energy-code",
    title: "ASHRAE 90.1 vs. IECC: Which Commercial Energy Code Applies? | Apex Grid",
    tag: "Permit Engineering",
    h1: "ASHRAE 90.1 vs. IECC: Which Commercial Energy Code Applies to Your Project?",
    description: "Understand the difference between ASHRAE 90.1 and the International Energy Conservation Code, and how to determine which one your jurisdiction enforces.",
    minutes: 8,
    html: `
<p>Two energy codes dominate commercial construction in the United States: ASHRAE Standard 90.1 and the International Energy Conservation Code (IECC). They cover similar ground — building envelope, lighting, HVAC, and service water heating — but they are different documents, maintained by different organizations, and adopted differently by states and municipalities. Knowing which one governs your project determines your compliance obligations before design begins.</p>

<h2>What Is ASHRAE 90.1?</h2>
<p>ASHRAE Standard 90.1, <em>Energy Standard for Sites and Buildings Except Low-Rise Residential Buildings</em>, is published by the American Society of Heating, Refrigerating and Air-Conditioning Engineers. It is a consensus standard, not a building code — but it is adopted by reference in the IECC and directly by many states as the commercial energy compliance path. ASHRAE 90.1 is updated on a roughly three-year cycle; current widely-adopted editions include 2019 and 2022.</p>

<h2>What Is the IECC?</h2>
<p>The International Energy Conservation Code is published by the International Code Council (ICC) — the same body that produces the IBC and IPC. The IECC has two distinct parts: a residential section and a commercial section. For commercial buildings, the IECC's commercial provisions are technically equivalent to ASHRAE 90.1 in most editions — the IECC often simply adopts 90.1 by reference for commercial projects, or runs a parallel prescriptive path that achieves the same energy targets.</p>

<h2>How Are They Related?</h2>
<p>The short answer: they are closely aligned but not identical. The IECC commercial provisions and ASHRAE 90.1 have been explicitly coordinated since the 2015 cycle so that compliance with one generally satisfies the other. However, differences exist in specific table values, mandatory measures, and how climate zones are defined. When a state adopts the IECC with local amendments, those amendments may further diverge from ASHRAE 90.1.</p>

<h2>Which Code Applies to My Project?</h2>
<p>The answer depends on your jurisdiction:</p>
<ul>
  <li><strong>State adoption</strong> — each state adopts a base energy code (either ASHRAE 90.1, the IECC commercial provisions, or a state-specific code like California's Title 24) and may amend it.</li>
  <li><strong>Federal projects</strong> — federally owned or leased buildings must comply with 10 CFR Part 433, which references ASHRAE 90.1 at the edition specified by the Department of Energy.</li>
  <li><strong>HUD and USDA programs</strong> — projects receiving federal housing funding often have energy code requirements tied to specific IECC or ASHRAE editions.</li>
  <li><strong>Utility incentive programs</strong> — programs offering rebates for above-code performance typically reference ASHRAE 90.1 as the baseline.</li>
</ul>

<h2>ASHRAE 90.1 Climate Zones vs. IECC Climate Zones</h2>
<p>Both standards use the same eight-zone climate classification system (Zones 1–8, with moisture designations A/B/C). The county-level zone assignments are largely consistent between them, though differences exist in a handful of locations. Your MEP engineer or energy modeler will confirm the correct zone assignment for your building address before beginning compliance analysis.</p>

<h2>Prescriptive vs. Performance in Each Code</h2>
<p>Both ASHRAE 90.1 and the IECC offer prescriptive and performance compliance paths:</p>
<ul>
  <li><strong>Prescriptive</strong> — each system must individually meet minimum requirements; no trade-offs between systems</li>
  <li><strong>Performance (Energy Cost Budget in 90.1; Total Building Performance in IECC)</strong> — energy modeling demonstrates that the proposed building's energy cost or use equals or beats a code-compliant baseline</li>
  <li><strong>ASHRAE 90.1 Appendix G</strong> — the LEED energy credit baseline; used for above-code certifications, not for permit compliance</li>
</ul>

<h2>What Your Engineer Needs to Know</h2>
<p>When you engage an MEP engineer for a commercial project, they need to confirm: (1) the adopted code and edition in your jurisdiction, (2) any local amendments that modify the base code, (3) whether the project qualifies for any exceptions, and (4) the compliance path best suited to the project design.</p>

<h2>Bottom Line</h2>
<p>For most commercial projects outside California, you're working with either ASHRAE 90.1 or the IECC commercial provisions — and in many states they're functionally equivalent. What matters is knowing which edition your jurisdiction has adopted and what local amendments are in effect. Your MEP engineer should make this determination at project kickoff, not at permit submission.</p>
    `,
  },
  {
    slug: "commercial-building-permit-process-what-engineers-deliver",
    title: "The Commercial Building Permit Process: What Engineers Deliver | Apex Grid",
    tag: "Permit Engineering",
    h1: "The Commercial Building Permit Process: What Engineers Deliver",
    description: "A step-by-step look at how commercial building permits work, what engineering documents are required, and how MEP and structural engineers support the process.",
    minutes: 8,
    html: `
<p>Pulling a commercial building permit is not a single transaction — it's a multi-stage process involving multiple consultants, plan check reviewers across several city departments, and (for larger projects) third-party special inspectors. Engineers don't just "stamp drawings." They produce specific deliverables at each stage that the building department uses to verify code compliance.</p>

<h2>The Sequence of a Commercial Permit</h2>
<h3>1. Pre-Application / Pre-Design</h3>
<p>Before drawings are produced, many jurisdictions offer pre-application meetings where the design team can ask the building department about code interpretation, zoning issues, or process requirements. An early structural or MEP consultation can surface constraints that affect the architectural design.</p>
<h3>2. Design and Document Preparation</h3>
<p>The design team prepares construction documents — the complete set of drawings and specifications that describe the project. Engineering documents in the permit set typically include structural drawings, mechanical drawings, electrical drawings (panel schedules, one-line diagrams, lighting plans, load calculations), plumbing drawings, and civil drawings covering site grading, drainage, and utility connections.</p>
<h3>3. Permit Submission</h3>
<p>The completed document set is submitted to the building department. Most jurisdictions now accept digital submissions through an online portal. The submittal package includes the permit application, full drawing set stamped by licensed engineers and architect, energy compliance reports, soils report, and a special inspection program if required.</p>
<h3>4. Plan Check (Plan Review)</h3>
<p>Building department plan checkers review submitted drawings for compliance with the IBC (or CBC in California), mechanical, electrical, and plumbing codes, fire code, and energy code. Plan check may be conducted by city staff or a third-party firm. Large projects undergo parallel reviews across Building, Fire, Planning/Zoning, Public Works, and Environmental Health.</p>
<h3>5. Plan Check Comments and Responses</h3>
<p>Plan checkers rarely approve a set on first submission. They issue a corrections list identifying non-compliant or unclear elements. Engineers respond by revising drawings or providing written justification. This back-and-forth may happen one to several rounds before approval.</p>
<h3>6. Permit Issuance and Inspections</h3>
<p>Once all corrections are resolved, the permit is issued. The building department requires inspections at defined milestones: foundation before concrete pour, framing before insulation and drywall, rough-in MEP before walls are closed, and final inspection before occupancy.</p>

<h2>Common Engineering Deliverables Required for Permit</h2>
<table>
  <thead>
    <tr><th>Discipline</th><th>Key Permit Deliverables</th></tr>
  </thead>
  <tbody>
    <tr><td>Structural</td><td>Foundation plan, framing plans, connection details, structural calculations, geotechnical report response</td></tr>
    <tr><td>Mechanical</td><td>HVAC plans, equipment schedules, energy compliance forms, exhaust calculations</td></tr>
    <tr><td>Electrical</td><td>Panel schedules, one-line diagram, lighting plans, load calculations</td></tr>
    <tr><td>Plumbing</td><td>Fixture plans, riser diagrams, gas sizing calculations</td></tr>
    <tr><td>Civil</td><td>Grading and drainage plan, utility laterals, erosion control plan</td></tr>
  </tbody>
</table>

<h2>Accelerating the Permit Process</h2>
<p>The fastest path through permitting is a complete, well-coordinated first submittal. Projects that go in with incomplete drawings, missing energy compliance documents, or unresolved coordination conflicts between disciplines generate long correction lists and multiple resubmittals. Engaging all disciplines early and running coordination before the first submittal is the most reliable way to compress permit timelines.</p>
    `,
  },
  {
    slug: "how-much-does-mep-engineering-cost",
    title: "How Much Does MEP Engineering Cost? A Commercial Guide | Apex Grid",
    tag: "MEP Engineering",
    h1: "How Much Does MEP Engineering Cost? A Commercial Guide",
    description: "Realistic fee ranges for mechanical, electrical, and plumbing engineering on commercial projects, and the factors that drive costs up or down.",
    minutes: 7,
    html: `
<p>MEP engineering fees are one of the most opaque line items in a commercial construction budget. Owners often receive a lump-sum number with little explanation of how it was derived. This guide breaks down how MEP engineers price their services, what factors move the number, and what realistic ranges look like for common project types.</p>

<h2>How MEP Engineers Structure Their Fees</h2>
<p>Most commercial MEP firms price projects one of three ways:</p>
<ul>
  <li><strong>Percentage of construction cost</strong> — the most common method for new construction. MEP fees typically run 2–5% of the total construction cost, depending on complexity.</li>
  <li><strong>Lump sum / fixed fee</strong> — common for well-defined scopes like tenant improvements or single-system replacements.</li>
  <li><strong>Hourly / time and materials</strong> — used for feasibility studies, due diligence, or projects with unclear scope. Rates for licensed engineers typically range $150–$250/hr.</li>
</ul>

<h2>Typical Fee Ranges by Project Type</h2>
<h3>Office Tenant Improvements (5,000–50,000 SF)</h3>
<p>MEP fees for office TIs typically run $1.50–$4.00 per square foot for full mechanical, electrical, and plumbing design. A 10,000 SF office TI might carry $20,000–$40,000 in MEP fees.</p>
<h3>Retail / Restaurant</h3>
<p>Restaurant MEP is among the most expensive per-square-foot because of hood exhaust, makeup air, grease interceptors, high-draw electrical, and commercial kitchen coordination. Fees of $4–$8 per square foot are common for full-service restaurants. Retail without food service runs $1.50–$3.00/SF.</p>
<h3>Healthcare / Medical Office</h3>
<p>Medical and clinical projects carry MEP premiums due to infection control ventilation, medical gas systems, redundant power, and code requirements from NFPA 99 and FGI Guidelines. Expect 4–7% of construction cost, or $5–$12/SF depending on acuity level.</p>
<h3>New Ground-Up Commercial (Multistory)</h3>
<p>Full-service MEP engineering for new multistory office, mixed-use, or hospitality typically runs 3–5% of construction cost.</p>

<h2>What Drives Fees Higher</h2>
<ul>
  <li><strong>System complexity</strong> — VRF systems, central plant chilled water, or complex electrical distribution cost more to engineer than simple packaged rooftop systems</li>
  <li><strong>Tight schedule</strong> — accelerated design timelines require more staff hours in fewer calendar weeks</li>
  <li><strong>Existing building conditions</strong> — renovation work requires field investigation, as-built documentation, and coordination with unknown existing conditions</li>
  <li><strong>Permit jurisdiction complexity</strong> — projects in jurisdictions with lengthy plan check processes or energy compliance requirements require more documentation</li>
  <li><strong>Construction administration</strong> — RFI responses, submittal reviews, and site observation add to the fee</li>
</ul>

<h2>What Drives Fees Lower</h2>
<ul>
  <li><strong>Repeat project type</strong> — prototype retail, franchise restaurant, or repeat tenant improvement for a known client allows reuse of prior design work</li>
  <li><strong>Simple occupancy</strong> — a warehouse with basic utilities and minimal HVAC is straightforward to engineer</li>
</ul>

<h2>How to Get an Accurate Quote</h2>
<p>To receive a meaningful fee proposal, provide the MEP firm with: project address and jurisdiction, gross square footage and number of stories, occupancy type, anticipated HVAC system type, existing conditions and as-built drawings (for renovations), and target permit submission date. A reputable MEP firm will return a fee proposal within a week.</p>

<p>Use project-specific cost guidance for <a href="/answers/vrf-vs-traditional-hvac-cost/">VRF versus traditional HVAC</a>, <a href="/answers/cleanroom-mep-engineering-requirements/">cleanroom systems</a>, and <a href="/answers/medical-office-mep-requirements/">medical office MEP</a>. When the wider site scope is still being assembled, review <a href="/answers/geotechnical-engineering-cost/">geotechnical fees and investigation scope</a> and <a href="/answers/civil-engineering-cost-commercial-project/">commercial civil engineering costs</a> separately.</p>
    `,
  },
  {
    slug: "title-24-energy-compliance-commercial-buildings",
    title: "Title 24 Energy Compliance for Commercial Buildings | Apex Grid",
    tag: "Permit Engineering",
    h1: "Title 24 Energy Compliance: A Complete Guide for Commercial Buildings",
    description: "Everything engineers and owners need to know about California's Title 24 energy code for commercial construction and major renovations.",
    minutes: 10,
    html: `
<p>Title 24, Part 6 is California's Building Energy Efficiency Standards — among the most stringent commercial energy codes in the United States. If you're building, expanding, or significantly renovating a commercial building in California, you'll need a compliant energy design before the building department issues a permit.</p>

<h2>What Is Title 24, Part 6?</h2>
<p>Title 24 is the California Code of Regulations governing building standards. Part 6 covers energy efficiency for both residential and nonresidential buildings. The California Energy Commission (CEC) updates the standards on an approximately three-year cycle. The 2022 Standards (effective January 2023) are currently enforced and include expanded requirements for solar-ready construction, heat pump readiness, and EV charging infrastructure.</p>

<h2>When Does Title 24 Apply?</h2>
<p>Title 24 energy compliance is required for: new construction (all new nonresidential buildings), additions (new conditioned floor area), alterations (work that modifies HVAC, lighting, or envelope systems beyond prescriptive thresholds), and change of occupancy when more restrictive energy requirements are triggered.</p>

<h2>Prescriptive vs. Performance Compliance</h2>
<h3>Prescriptive Path</h3>
<p>The prescriptive path requires that each building system (envelope, lighting, HVAC) individually meet minimum efficiency requirements listed in the standards. It is straightforward but inflexible — you can't trade efficiency gains in one system against deficiencies in another.</p>
<h3>Performance Path</h3>
<p>The performance path uses CEC-approved energy modeling software (typically EnergyPro or CBECC-Com) to demonstrate that the proposed building's total energy use is equal to or less than a code-compliant reference building. This path allows trade-offs and is used by most large or complex projects.</p>

<h2>Key Systems Covered</h2>
<h3>Building Envelope</h3>
<p>Roof insulation, wall insulation, fenestration (windows and skylights), and air sealing are all regulated. Climate zone determines the minimum R-values and maximum U-factors and solar heat gain coefficients (SHGC) for glazing.</p>
<h3>Lighting</h3>
<p>Indoor and outdoor lighting must meet power density limits (watts per square foot by space type) and include occupancy controls, daylight controls, and demand response capability in many applications.</p>
<h3>HVAC</h3>
<p>Equipment efficiency (EER, COP, IEER) must meet minimum values. Controls including economizers, demand-controlled ventilation (DCV), and setback thermostats are often required. The 2022 Standards push harder toward heat pump technology and refrigerant transition.</p>

<h2>What the Compliance Package Includes</h2>
<ul>
  <li>CF-1N forms (project overview and compliance summary)</li>
  <li>Envelope compliance forms (roof, walls, fenestration schedules)</li>
  <li>Lighting compliance forms (indoor and outdoor power allowance calculations)</li>
  <li>Mechanical compliance forms (equipment schedules and controls)</li>
  <li>Energy model output if using the performance path</li>
  <li>Certificate of Compliance posted at the job site</li>
</ul>

<h2>Climate Zone Impact</h2>
<p>California has 16 climate zones, and Title 24 requirements vary significantly by zone. Zone 6 (coastal Los Angeles) has very different envelope and HVAC requirements than Zone 14 (high desert). Your energy engineer must use the correct climate zone data — misidentification is a common error that causes plan check rejections.</p>

<h2>Common Compliance Pitfalls</h2>
<ul>
  <li><strong>Starting too late</strong> — energy analysis informs architectural decisions; beginning after design is finalized often forces expensive redesigns</li>
  <li><strong>Wrong climate zone</strong> — building location must be assigned to the correct CEC climate zone</li>
  <li><strong>Missing mandatory measures</strong> — some requirements apply regardless of compliance path and cannot be traded away</li>
  <li><strong>Outdated software</strong> — compliance software must match the active code cycle</li>
</ul>

<h2>Title 24 and LEED</h2>
<p>Title 24 compliance is a prerequisite for all California projects, not a substitute for LEED. LEED's energy credit measures improvement above a baseline that must already meet Title 24. In high-performance projects, the Title 24 performance compliance path and the LEED energy model are often run in parallel by the MEP engineer.</p>

<h2>Next Steps</h2>
<p>Engage your MEP engineer as early as schematic design. Compliance analysis that begins at design development or later limits your options and increases the risk of plan check delays.</p>
    `,
  },
  {
    slug: "vrf-vs-rooftop-unit-commercial-hvac",
    title: "VRF vs. Rooftop Unit: Choosing the Right Commercial HVAC System | Apex Grid",
    tag: "MEP Engineering",
    h1: "VRF vs. Rooftop Unit: Choosing the Right Commercial HVAC System",
    description: "A side-by-side comparison of VRF and packaged rooftop units for commercial buildings — efficiency, cost, space requirements, and when each system makes sense.",
    minutes: 8,
    html: `
<p>The choice between Variable Refrigerant Flow (VRF) and packaged rooftop units (RTUs) is one of the most consequential HVAC decisions made early in commercial design. Both systems are proven in the field and capable of meeting energy codes — but they serve different building types and performance goals.</p>

<h2>What Is a Rooftop Unit (RTU)?</h2>
<p>A packaged rooftop unit is a self-contained HVAC system — compressor, condenser, evaporator coil, air handling section, and often the gas heat exchanger housed in a single cabinet on the roof. Conditioned air is distributed through ductwork. RTUs are the workhorses of low-rise commercial construction: retail, restaurants, single-story office, light industrial. They are straightforward to install, service, and replace, and most HVAC technicians are familiar with them.</p>

<h2>What Is a VRF System?</h2>
<p>Variable Refrigerant Flow systems use refrigerant as the heat transfer medium, distributed from outdoor condensing units through refrigerant piping to multiple indoor fan coil units (FCUs). Each FCU conditions a separate zone independently. VRF heat recovery systems can simultaneously cool and heat different zones from the same outdoor unit — the defining advantage for mixed-use and multistory applications.</p>

<h2>Efficiency</h2>
<p>VRF systems typically have higher part-load efficiency than RTUs. VRF compressors modulate continuously to match demand, minimizing cycling losses. Modern RTUs with variable-speed compressors have narrowed the gap, but VRF heat recovery systems that reclaim heat from interior zones to heat perimeter spaces can achieve very high overall system efficiency.</p>

<h2>First Cost</h2>
<p>RTUs have lower first cost in almost every scenario. A 5-ton RTU with installation runs roughly $8,000–$15,000 per unit. VRF systems typically cost 20–40% more than equivalent RTU capacity on first install. For simple low-rise applications, the VRF premium rarely pays back through energy savings within a reasonable period.</p>

<h2>Space Requirements</h2>
<p>RTUs require roof penetrations for ductwork, significant roof area, and structural support. VRF indoor units are typically compact fan coils mounted in the ceiling, connected by refrigerant lines smaller in diameter than ductwork — making VRF attractive where ceiling height is constrained or the owner wants zone flexibility without major ductwork demolition.</p>

<h2>Maintenance</h2>
<p>RTUs are simpler to service: familiar to every commercial HVAC technician, with widely available replacement parts. VRF systems require technicians trained in VRF refrigerant circuit diagnostics; manufacturer service contracts are common for VRF installations.</p>

<h2>Decision Framework</h2>
<table>
  <thead>
    <tr><th>Scenario</th><th>Likely Better Fit</th></tr>
  </thead>
  <tbody>
    <tr><td>Single-story retail or restaurant</td><td>RTU</td></tr>
    <tr><td>Low-rise office with open floor plate</td><td>RTU with VAV, or VRF</td></tr>
    <tr><td>Multistory mixed-use with diverse zone loads</td><td>VRF heat recovery</td></tr>
    <tr><td>Budget-constrained project</td><td>RTU</td></tr>
    <tr><td>High-end TI with limited ceiling height</td><td>VRF</td></tr>
    <tr><td>Building with interior heat sources (data rooms, dense retail)</td><td>VRF heat recovery</td></tr>
  </tbody>
</table>

<h2>The Engineer's Role</h2>
<p>System selection should be driven by a mechanical engineer who has modeled the building loads, reviewed the architectural program, and evaluated the life-cycle cost of each option. Owners who commit to a system type before engaging mechanical engineering sometimes find it doesn't fit the building — either physically or thermally. Early mechanical engineering engagement avoids these surprises.</p>
    `,
  },
  {
    slug: "what-does-a-structural-engineer-do-that-an-architect-doesnt",
    title: "What Does a Structural Engineer Do That an Architect Doesn't? | Apex Grid",
    tag: "Structural Engineering",
    h1: "What Does a Structural Engineer Do That an Architect Doesn't?",
    description: "A clear explanation of how structural engineers and architects divide responsibility on commercial projects, and why you need both.",
    minutes: 6,
    html: `
<p>Owners new to commercial construction sometimes ask why they need both an architect and a structural engineer. The short answer: architects and structural engineers have different training, different licenses, and legally distinct scopes of responsibility.</p>

<h2>What Architects Are Trained and Licensed to Do</h2>
<p>Architects are trained in building design: space planning, code compliance for life safety and accessibility, material selection, aesthetics, and the coordination of all consultants (structural, MEP, civil, landscape). The architect is typically the prime professional on a commercial project. Architectural licensure does not authorize the practice of structural engineering — an architect cannot stamp structural calculations or structural drawings in most U.S. states.</p>

<h2>What Structural Engineers Are Trained and Licensed to Do</h2>
<p>Structural engineers are trained in the analysis and design of load-carrying systems: how forces move through a building, what size members resist those forces, and how connections transfer load from one element to another. The structural engineer of record designs and takes legal responsibility for the structural system — the foundation, framing, connections, and lateral force-resisting system that keeps the building standing in wind and seismic events.</p>

<h2>The Formal Division of Responsibility</h2>
<p>On a commercial building permit set, architectural sheets (A-series) are signed by the architect and cover floor plans, elevations, sections, details, finish schedules, and code analysis. Structural sheets (S-series) are signed by the structural engineer and cover foundation plans, framing plans, connection details, and structural notes.</p>

<h2>Specific Things Only a Structural Engineer Delivers</h2>
<ul>
  <li><strong>Gravity load design</strong> — sizing beams, columns, and slabs to carry dead and live loads to the foundation</li>
  <li><strong>Lateral system design</strong> — designing shear walls, moment frames, or braced frames that resist wind and seismic forces</li>
  <li><strong>Foundation design</strong> — selecting and sizing spread footings, grade beams, piles, or mat slabs based on soil conditions and structural loads</li>
  <li><strong>Structural calculations</strong> — the engineering analysis that backs up every structural member size on the drawings</li>
  <li><strong>Connection details</strong> — specifying how beams connect to columns, how shear walls anchor to foundations</li>
  <li><strong>Geotechnical coordination</strong> — incorporating allowable bearing capacities, liquefaction risk, and expansive soil data into the foundation design</li>
  <li><strong>Special inspection program</strong> — defining which work during construction requires special inspection</li>
</ul>

<h2>Where the Two Disciplines Overlap</h2>
<p>The two disciplines must be tightly coordinated because architectural decisions drive structural requirements and vice versa. Column locations, floor-to-floor height, shear wall placement, large openings, and rooftop equipment loads all require negotiation between architect and structural engineer early in design.</p>

<h2>Can the Architect Be the Structural Engineer?</h2>
<p>In a few states, architects with additional credentials can stamp certain structural drawings for simple residential construction. For commercial buildings, this is not permitted — you need a separately licensed structural engineer or civil engineer practicing structural engineering to stamp and sign the structural documents. Building departments will reject commercial structural drawings stamped only by an architect.</p>

<h2>The Bottom Line</h2>
<p>The architect designs the building; the structural engineer ensures it stands up. These are complementary but legally distinct roles, each backed by a separate professional license and separate legal accountability. On any permitted commercial project, you need both — and the earlier they coordinate, the fewer expensive surprises appear in plan check or during construction.</p>
    `,
  },
];

export const RESOURCE_ARTICLES: ResourceArticle[] = [
  ...BASE_RESOURCE_ARTICLES,
  ...STRUCTURAL_RESOURCE_ARTICLES,
  ...MEP_RESOURCE_ARTICLES,
  ...CIVIL_RESOURCE_ARTICLES,
  ...GEOTECHNICAL_RESOURCE_ARTICLES,
  ...PERMIT_RESOURCE_ARTICLES,
  ...LEGACY_RESOURCE_ARTICLES,
];

// Guard against duplicate slugs across files.
{
  const seen = new Set<string>();
  for (const a of RESOURCE_ARTICLES) {
    if (seen.has(a.slug)) throw new Error(`Duplicate resource article slug: ${a.slug}`);
    seen.add(a.slug);
  }
}
