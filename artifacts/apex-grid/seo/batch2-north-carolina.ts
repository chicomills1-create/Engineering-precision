import type {
  Batch2CoreServicePage,
  Batch2StateExpansion,
} from "./batch2-core-service-types";

const ncSources = [
  { label: "NC Office of State Fire Marshal building codes", url: "https://www.ncosfm.gov/codes" },
  { label: "NC Board of Examiners rules and licensure", url: "https://www.ncbels.org/general-info/rules-laws/" },
  { label: "FEMA Flood Map Service Center", url: "https://msc.fema.gov/portal/home" },
  { label: "North Carolina stormwater program", url: "https://www.deq.nc.gov/about/divisions/energy-mineral-land-resources/stormwater" },
];

const service = (page: Batch2CoreServicePage): Batch2CoreServicePage => page;

export const northCarolinaBatch2: Batch2StateExpansion = {
  stateSlug: "north-carolina",
  stateName: "North Carolina",
  stateAbbrev: "NC",
  hub: {
    title: "North Carolina Engineering Services for Permits, Plans, and Existing Buildings",
    description:
      "Engineering support for North Carolina commercial, industrial, multifamily, and residential projects, with permit-aware structural, MEP, civil, energy-compliance, and PE-stamped drawing workflows.",
    h1: "North Carolina Engineering Services",
    kicker: "Permit-aware engineering across the Tar Heel State",
    lede:
      "North Carolina projects move through different city, county, utility, and state review lanes. Apex Grid Engineering helps project teams organize the technical record while the responsible PE, design team, and authority having jurisdiction confirm the applicable scope.",
    sections: [
      {
        heading: "One state code, many local review desks",
        body:
          "The North Carolina Building Code is administered through the state code program, while plan intake and site, zoning, utility, and flood reviews are often handled by the city or county. A Charlotte commercial alteration therefore has a different review path from a Wilmington coastal addition even when the same state code chapters apply.",
      },
      {
        heading: "Conditions change from coast to mountains",
        body:
          "Hurricane wind and storm surge shape coastal work; Piedmont sites bring intense rainfall, red clay, karst or residual soils, and urban drainage interfaces; western sites add steep slopes, rock, localized landslide exposure, and occasional mountain snow. North Carolina’s seismic demand is generally low to moderate but remains site- and code-parameter-specific. Early site and existing-condition verification keeps a code narrative from hiding a constructability risk.",
      },
      {
        heading: "A practical record for the AHJ",
        body:
          "A useful submittal identifies the permit authority, occupancy and construction type, code edition used, utility assumptions, flood or stormwater trigger, and the PE responsible for each regulated discipline. Code editions, local amendments, and utility requirements are confirmed for the project rather than treated as permanent statewide facts.",
      },
    ],
    faqs: [
      {
        question: "Does North Carolina use one building code everywhere?",
        answer:
          "The state building code establishes the baseline, but each project still goes to its local building department and may require local zoning, stormwater, floodplain, utility, fire, or watershed review. Confirm the adopted edition and any currently effective amendments with the AHJ.",
      },
      {
        question: "Who may seal engineering drawings in North Carolina?",
        answer:
          "The North Carolina Board of Examiners for Engineers and Surveyors governs engineering licensure and sealing. The responsible PE must evaluate the work, hold the appropriate authorization, and follow current Board rules; an online service page is not a promise that a particular project can be sealed.",
      },
      {
        question: "Are coastal and mountain projects reviewed differently?",
        answer:
          "They can be. Coastal projects may involve flood maps, wind, stormwater, CAMA or local shoreline controls, while mountain projects can require slope, drainage, rock, and erosion analysis. The permit set should identify the actual site triggers instead of assuming a generic statewide checklist.",
      },
    ],
    sources: [
      ...ncSources,
      { label: "NC Department of Environmental Quality", url: "https://www.deq.nc.gov/" },
      { label: "North Carolina flood risk information", url: "https://www.ncdps.gov/our-organization/emergency-management/hazard-mitigation/flood-risk-information" },
    ],
  },
  metros: [
    {
      slug: "charlotte",
      name: "Charlotte",
      county: "Mecklenburg County",
      services: [
        service({
          serviceSlug: "structural-engineering",
          title: "Charlotte Structural Engineering for Commercial and Residential Permits",
          description:
            "Charlotte structural engineering for tenant improvements, additions, renovations, and new buildings, coordinated with Charlotte-Mecklenburg permitting, Piedmont soils, wind, and flood review.",
          h1: "Structural Engineering in Charlotte, NC",
          kicker: "Piedmont structures with a clear permit record",
          lede:
            "Charlotte’s fast-changing building stock ranges from uptown towers to suburban retail and older mill conversions. Structural design starts with what is actually present, then documents gravity, lateral, foundation, and construction-phase constraints for the applicable Mecklenburg review path.",
          permitAuthority:
            "The City of Charlotte’s Development Services / Land Development Services coordinates building and site permits within city jurisdiction, while Mecklenburg County handles unincorporated locations and some county functions. Charlotte Water, Mecklenburg County floodplain staff, and the local fire authority can add separate reviews; the project address determines the AHJ.",
          codeContext:
            "North Carolina’s currently effective statewide building code and state amendments govern the building permit, with the City of Charlotte’s published permitting and zoning requirements controlling intake and local site coordination. The designer should verify the edition, existing-building provisions, special inspections, and any locally applicable floodplain or urban zoning conditions at submittal.",
          localConditions:
            "Charlotte’s Piedmont sites commonly involve residual red clay, variable fill, intense summer rainfall, and urban stormwater constraints. Wind design is important even though the city is inland; floodplain proximity along creeks and redevelopment around dense utilities can control foundation and framing decisions.",
          projectTypes:
            "Office and multifamily fit-outs, adaptive reuse of textile and warehouse buildings, distribution facilities near the airport and interstates, retail additions, rooftop equipment supports, and residential additions are common Charlotte applications.",
          sections: [
            {
              heading: "Charlotte electronic review starts with the existing frame",
              body:
                "Charlotte Development Services receives many alteration sets electronically, but a portal upload cannot verify an omitted beam or removed wall. Field measurements, selective openings, and an existing-versus-new load-path plan give the city reviewer usable evidence.",
            },
            {
              heading: "Foundations, fill, and creek corridors",
              body:
                "A geotechnical report or targeted exploration helps distinguish competent residual soil from undocumented fill on redevelopment parcels. When a site approaches a FEMA-mapped creek, structural design should be coordinated with elevation certificates, floodplain limits, and the civil drainage concept before foundation details are finalized.",
            },
            {
              heading: "Charlotte construction coordination",
              body:
                "Large mechanical replacements, rooftop solar, and tenant signage can impose concentrated loads on existing roofs. The permit narrative should separate new demand, existing capacity, temporary shoring, and special-inspection responsibilities so the contractor and Charlotte reviewer can follow the load path.",
            },
          ],
          permitSteps: [
            "Start in Charlotte Development Services’ permit system for a city address; route an unincorporated Mecklenburg parcel through County Code Enforcement and flag any zoning case before structural review.",
            "Pair the measured frame and geotechnical recommendations with Mecklenburg floodplain staff’s current elevation information when a creek corridor or FEMA zone touches the parcel.",
            "Carry roof, foundation, fire-separation, and special-inspection sheets through the city electronic plan-review set, while Charlotte Water and Land Development Services resolve site interfaces separately.",
            "Answer structural comments by revision cloud and calculation reference, then return rooftop, shoring, or field-discovered changes to the responsible PE before city or county re-review.",
          ],
          faqs: [
            {
              question: "What does Charlotte’s permit record need for rooftop equipment?",
              answer:
                "Show existing framing, new reactions, curb or dunnage, anchorage, access, and any special inspection. Charlotte Development Services decides the building scope; Mecklenburg floodplain or site review can add separate conditions.",
            },
            {
              question: "How does a Mecklenburg floodplain affect structure?",
              answer:
                "A mapped floodplain can change finished-floor, foundation, enclosure, utility, and certification requirements. The engineer should coordinate with Mecklenburg floodplain staff and the civil survey rather than relying only on a generalized FEMA map view.",
            },
            {
              question: "Can an older Charlotte warehouse be altered without original drawings?",
              answer:
                "An alteration may still be feasible, but the team must verify existing framing and the code path for the change. Limited destructive investigation, measured drawings, and a documented assumption log help define what can responsibly be designed.",
            },
          ],
          sources: [
            { label: "Charlotte Development Services", url: "https://www.charlottenc.gov/Growth-and-Development/Getting-Started/Permits" },
            { label: "Mecklenburg County floodplain information", url: "https://www.mecknc.gov/LUESA/CodeEnforcement/FloodplainManagement/Pages/default.aspx" },
            { label: "Charlotte-Mecklenburg stormwater", url: "https://stormwater.charmeck.org/" },
            ...ncSources,
          ],
        }),
        service({
          serviceSlug: "mep-engineering",
          title: "Charlotte MEP Engineering for Uptown Fit-Outs and New Facilities",
          description:
            "Charlotte MEP engineering for offices, multifamily, retail, healthcare, and industrial projects, with coordinated HVAC, electrical, plumbing, utility, and permit documentation.",
          h1: "MEP Engineering in Charlotte, NC",
          kicker: "Building systems for a growing Piedmont market",
          lede:
            "A Charlotte MEP set must reconcile tenant loads, Duke Energy service conditions, older shells, and the review expectations of Charlotte-Mecklenburg. The work begins with a load and existing-system survey rather than a generic equipment schedule.",
          permitAuthority:
            "The City of Charlotte Development Services permit process is the primary building review route inside city limits; Mecklenburg County and neighboring municipalities have separate authorities. Charlotte Water, Duke Energy Carolinas, Mecklenburg County Environmental Health, and fire review may each control part of the systems scope.",
          codeContext:
            "Mechanical, electrical, plumbing, fuel-gas, accessibility, and energy provisions come from the North Carolina code framework and currently adopted amendments, with utility standards and Charlotte’s permit submittal rules layered on top. Verify the applicable energy compliance path, service voltage, emergency power, and fire alarm or sprinkler interfaces for the occupancy.",
          localConditions:
            "Hot, humid summers drive cooling and condensate design, while shoulder-season humidity affects ventilation and controls. Dense redevelopment can limit transformer, generator, grease interceptor, storm connection, and rooftop-equipment locations; Duke Energy service availability and lead times should be confirmed early.",
          projectTypes:
            "Uptown office interiors, South End restaurant and apartment work, airport-area warehouses, medical suites, data and technology spaces, and suburban retail repositioning are typical Charlotte MEP assignments.",
          sections: [
            {
              heading: "Charlotte Water and Duke service are design inputs",
              body:
                "Duke Energy Carolinas service letters and Charlotte Water tap or backflow conditions can change an electrical room, riser, or restaurant layout before Charlotte reviews the building permit. Pair those agency responses with a field inventory of panels, feeders, domestic water, and exhaust routes.",
            },
            {
              heading: "Humidity, ventilation, and comfort",
              body:
                "Summer latent loads and outdoor-air requirements can make a nominal tonnage comparison misleading. Sequence narratives should address economizer limits, condensate management, outside-air measurement, filtration, and zoning so a new fit-out is both code-responsive and serviceable.",
            },
            {
              heading: "Utility coordination before equipment selection",
              body:
                "Duke Energy availability, transformer placement, metering, and demand characteristics can change the electrical room and site plan. Coordinate utility correspondence, fire pump or emergency power needs, and Charlotte Water backflow or tap requirements before locking equipment schedules.",
            },
          ],
          permitSteps: [
            "Open the City of Charlotte building-system intake for an in-city fit-out, or Mecklenburg County’s process outside city limits; ask Charlotte Water and Duke Energy for service conditions before equipment selection.",
            "Translate the tenant schedule into cooling, latent, ventilation, panel, domestic-water, sanitary, and lighting loads, including South End restaurant exhaust or airport-warehouse door operation.",
            "Place shafts, roof penetrations, backflow, fire-protection interfaces, and energy forms on the coordinated city set while utility agreements remain tracked as separate correspondence.",
            "Use the portal comment log to reconcile each MEP discipline; equipment substitutions, service changes, and controls revisions return to the design professionals before inspection release.",
          ],
          faqs: [
            {
              question: "When does Charlotte Water enter an MEP permit workflow?",
              answer:
                "A new or altered tap, backflow assembly, fire service, grease connection, or capacity question can trigger Charlotte Water review alongside the building permit. The city building reviewer and utility provider make separate determinations.",
            },
            {
              question: "When should Duke Energy be contacted?",
              answer:
                "As soon as a service increase, new transformer, generator, or major electrification load is plausible. Utility feasibility is separate from city permit approval and can affect electrical-room geometry and schedule.",
            },
            {
              question: "Who reviews plumbing connections in Charlotte?",
              answer:
                "The building permit authority reviews the code scope, while Charlotte Water controls its service, tap, backflow, and utility standards within its system. Confirm whether county environmental-health or grease-waste review also applies to the use.",
            },
          ],
          sources: [
            { label: "Charlotte permits and inspections", url: "https://www.charlottenc.gov/Growth-and-Development/Getting-Started/Permits" },
            { label: "Duke Energy Carolinas builder services", url: "https://www.duke-energy.com/our-company/about-us/for-your-business/builders" },
            { label: "Charlotte Water development services", url: "https://www.charlottenc.gov/Water/Development-Services" },
            { label: "NC energy code resources", url: "https://www.ncosfm.gov/codes/code-enforcement/energy-conservation-code" },
          ],
        }),
        service({
          serviceSlug: "civil-engineering",
          title: "Charlotte Civil Engineering for Piedmont Sites and Stormwater",
          description:
            "Charlotte civil engineering for grading, drainage, utilities, erosion control, and site permits, coordinated with Charlotte-Mecklenburg stormwater and North Carolina DEQ requirements.",
          h1: "Civil Engineering in Charlotte, NC",
          kicker: "Site plans that respect Piedmont water and urban infrastructure",
          lede:
            "Charlotte’s redevelopment parcels often have tight boundaries, aging pipes, and drainage paths that are not obvious from a concept plan. Civil design ties survey, grading, stormwater, utilities, floodplain, and construction sequencing to the actual city or county review lane.",
          permitAuthority:
            "Charlotte-Mecklenburg Storm Water Services reviews many city and county stormwater matters, while the City of Charlotte Land Development Services handles applicable site and building coordination. North Carolina DEQ may regulate erosion and sedimentation or post-construction stormwater; Mecklenburg County and Charlotte Water requirements vary by jurisdiction and service connection.",
          codeContext:
            "The state erosion and sedimentation program, North Carolina stormwater rules, Charlotte-Mecklenburg ordinance and design guidance, floodplain provisions, and Charlotte Water standards can all apply. Verify whether a project needs a delegated erosion permit, post-construction permit, watershed buffer review, or separate utility approval.",
          localConditions:
            "Piedmont red clay erodes quickly, intense thunderstorms concentrate runoff, and creek corridors create mapped floodplain and buffer constraints. Urban infill may have undocumented storm drains, shallow utilities, poor soils, and limited detention footprint, making survey and utility research central to the design.",
          projectTypes:
            "Mixed-use infill, industrial pads, multifamily parking and access drives, medical campuses, restaurant sites, warehouse expansions, and redevelopment with Charlotte Water connections are frequent civil applications.",
          sections: [
            {
              heading: "Charlotte-Mecklenburg’s stormwater sequence controls infill",
              body:
                "Charlotte-Mecklenburg Storm Water Services reviews the post-construction control while Land Development Services reviews the site arrangement. On a small infill parcel, that sequence exposes conflicts among detention, tree save, fire access, Charlotte Water easements, and overflow before grading is locked.",
            },
            {
              heading: "Erosion control in red clay",
              body:
                "Bare Piedmont clay can send sediment to streets and creeks during a single storm. Phasing, stabilized construction entrances, inlet protection, diversion, and final stabilization should be shown as buildable measures rather than left as boilerplate notes.",
            },
            {
              heading: "Water and sewer reality",
              body:
                "Charlotte Water capacity, tap locations, backflow, fire-flow, and easement constraints can move a building footprint. Existing utility records should be supplemented by field locating and coordination because redevelopment plans frequently encounter abandoned or poorly documented lines.",
            },
          ],
          permitSteps: [
            "Run the address through Charlotte Land Development Services and Charlotte-Mecklenburg Storm Water Services first; an unincorporated parcel follows County review even when Charlotte Water serves it.",
            "Use the survey to check FEMA floodplain, watershed buffers, and NCDEQ erosion/post-construction thresholds before choosing underground detention, a pond, or an outfall.",
            "Send erosion sequencing to the NCDEQ delegated process, stormwater calculations to Charlotte-Mecklenburg, and water/sewer profiles to Charlotte Water rather than treating one portal as approval for all three.",
            "Log comments by agency and revise grades, overflow, fire access, and utility easements together; the civil PE evaluates the issued construction set and maintenance record.",
          ],
          faqs: [
            {
              question: "How do Charlotte and NCDEQ stormwater reviews differ?",
              answer:
                "Charlotte-Mecklenburg reviews its local stormwater ordinance and maintenance obligations, while NCDEQ controls applicable erosion and state post-construction permits. A city or county approval does not replace the other agency’s decision.",
            },
            {
              question: "Is a city stormwater approval the same as a DEQ permit?",
              answer:
                "No. Charlotte-Mecklenburg review and state erosion or post-construction permits are related but distinct approvals. The design team should list each trigger and agency rather than treating one approval as coverage for all others.",
            },
            {
              question: "What survey is useful for a Charlotte redevelopment site?",
              answer:
                "A current boundary and topographic survey with visible utilities, structures, easements, trees where required, and nearby drainage features is the starting point. Utility locates, record research, and field verification may be needed where the proposed work is dense.",
            },
          ],
          sources: [
            { label: "Charlotte-Mecklenburg Storm Water Services", url: "https://stormwater.charmeck.org/" },
            { label: "Charlotte Land Development Services", url: "https://www.charlottenc.gov/Growth-and-Development/Land-Development" },
            { label: "NC DEQ erosion and sediment control", url: "https://www.deq.nc.gov/about/divisions/energy-mineral-land-resources/erosion-sediment-control" },
            { label: "Charlotte Water development services", url: "https://www.charlottenc.gov/Water/Development-Services" },
          ],
        }),
        service({
          serviceSlug: "energy-compliance",
          title: "Charlotte Energy-Compliance Engineering for Commercial Alterations",
          description:
            "Energy-compliance support for Charlotte buildings using the applicable North Carolina energy-code path, with envelope, lighting, HVAC, controls, and documentation coordinated to the permit set.",
          h1: "Energy Compliance in Charlotte, NC",
          kicker: "Practical North Carolina energy documentation",
          lede:
            "Charlotte energy compliance follows the North Carolina Energy Conservation Code and the project’s accepted building-scope route. The right path depends on the building scope, trade-off method, existing-building allowances, and the evidence Charlotte’s reviewer requests.",
          permitAuthority:
            "Charlotte Development Services receives the building permit package inside city limits, while the state code program establishes the applicable energy provisions. The local AHJ determines acceptable forms and review sequencing; utilities, owners, and voluntary programs may impose additional performance requirements that are separate from code compliance.",
          codeContext:
            "Use the currently effective North Carolina Energy Conservation Code and its adopted compliance paths, together with applicable ASHRAE or IECC references identified by the state code. Confirm edition and transition rules with the Office of State Fire Marshal and Charlotte reviewer; keep voluntary high-performance targets separate from the permit analysis.",
          localConditions:
            "Charlotte’s humid cooling season makes envelope air leakage, solar gain, latent control, and ventilation important, while winter heating and reheat still affect annual energy. Duke Energy rate structure and demand may influence an owner’s efficiency choices but do not replace the code analysis.",
          projectTypes:
            "Office fit-outs, multifamily common areas, warehouse shell and tenant work, schools and institutional renovations, retail conversions, and electrification upgrades commonly need Charlotte energy documentation.",
          sections: [
            {
              heading: "Charlotte’s permit scope determines the energy route",
              body:
                "Charlotte Development Services treats a shell, office alteration, and lighting-only tenant change as different records. Identifying conditioned area, existing systems, and trade-offs at intake prevents a Duke incentive model from being mistaken for the city’s North Carolina code documentation.",
            },
            {
              heading: "Humidity belongs in the energy story",
              body:
                "Charlotte’s long cooling season rewards coordinated envelope, ventilation, and controls decisions rather than an equipment-only approach. The compliance record should identify glazing, insulation continuity, economizer limits, setpoints, and outside-air assumptions that the MEP drawings can actually implement.",
            },
            {
              heading: "Code versus owner performance goals",
              body:
                "EnergyStar, utility incentives, electrification, and high-performance targets may be valuable owner goals, but they are not automatically the adopted code. Keeping those scopes labeled separately prevents a voluntary target from being represented as a permit guarantee.",
            },
          ],
          permitSteps: [
            "Use Charlotte Development Services’ commercial permit intake to establish whether the work is a shell, whole-building alteration, or lighting-only change and identify the state energy-code edition.",
            "Read envelope, lighting, HVAC, controls, and Duke Energy demand assumptions from the actual architectural and MEP sheets; the reviewer should not receive an uncross-checked model.",
            "Tie prescriptive or performance worksheets to room schedules, equipment tags, and control sequences, keeping Duke incentive documentation in its own utility track.",
            "Return energy comments through the Charlotte plan-review record and document approved equipment changes or field verification with the responsible design team.",
          ],
          faqs: [
            {
              question: "Where does Duke Energy fit in Charlotte energy compliance?",
              answer:
                "Duke can review service demand or incentive applications, while Charlotte Development Services reviews the North Carolina energy-code forms with the building permit. Those records can share inputs but remain separate approvals.",
            },
            {
              question: "Can Duke Energy incentives replace code compliance?",
              answer:
                "No. An incentive application and a building-permit energy analysis serve different purposes. They can share data, but each program’s eligibility and the AHJ’s code documentation must be addressed independently.",
            },
            {
              question: "What changes when an office project keeps existing HVAC?",
              answer:
                "The alteration scope, equipment replacement, controls, ventilation, envelope work, and applicable existing-building allowances determine the analysis. Keeping a unit does not automatically exempt new lighting, envelope, or controls work.",
            },
          ],
          sources: [
            { label: "NC OSFM energy conservation code", url: "https://www.ncosfm.gov/codes/code-enforcement/energy-conservation-code" },
            { label: "Charlotte building permits", url: "https://www.charlottenc.gov/Growth-and-Development/Getting-Started/Permits" },
            { label: "Duke Energy business efficiency", url: "https://www.duke-energy.com/business/products/smart-saver" },
            { label: "ASHRAE standards", url: "https://www.ashrae.org/technical-resources/standards-and-guidelines" },
          ],
        }),
        service({
          serviceSlug: "pe-stamped-drawings",
          title: "Charlotte PE-Stamped Drawings for Permit-Ready Building Work",
          description:
            "Permit drawing coordination for Charlotte projects that require responsible North Carolina PE review, with discipline boundaries, existing conditions, and AHJ submittal requirements made explicit.",
          h1: "PE-Stamped Drawings in Charlotte, NC",
          kicker: "Responsible review before a regulated submittal",
          lede:
            "A seal is the conclusion of responsible professional practice, not a rubber stamp. Charlotte project teams need a coordinated record of scope, field information, calculations, code path, and AHJ comments before the appropriate North Carolina PE can decide what to sign.",
          permitAuthority:
            "Charlotte Development Services receives building permit documents within the city, while Mecklenburg County or another municipality may be the AHJ outside city limits. The permit desk, fire authority, Charlotte Water, stormwater reviewers, and utility providers may each require distinct documents; the responsible PE confirms which sheets fall within professional responsibility.",
          codeContext:
            "Sealed work must comply with the North Carolina Building Code, applicable energy and accessibility provisions, local development requirements, and current North Carolina Board of Examiners rules. Edition, alteration, special-inspection, floodplain, and deferred-submittal decisions are confirmed for the project rather than promised from a generic service description.",
          localConditions:
            "Charlotte’s mix of high-rise construction, suburban redevelopment, Piedmont soils, creek floodplains, and aging commercial shells makes a one-size drawing package risky. Utility coordination, survey quality, and scope boundaries often matter as much as the title block.",
          projectTypes:
            "Commercial tenant improvements, rooftop equipment supports, multifamily renovations, industrial expansions, small additions, site utility packages, and owner-driven corrective work are common reasons Charlotte teams seek PE drawing coordination.",
          sections: [
            {
              heading: "Charlotte’s city/county boundary belongs on the cover sheet",
              body:
                "Charlotte Development Services and Mecklenburg County Code Enforcement do not share one permit record. The cover sheet should name the actual AHJ, identify Charlotte Water or stormwater documents, and give the NC PE enough verified information for independent judgment.",
            },
            {
              heading: "Charlotte jurisdiction and sheet boundaries",
              body:
                "City, county, and neighboring municipal boundaries can change intake, zoning, stormwater, and utility requirements. A cover sheet should identify the actual AHJ and clearly distinguish structural, MEP, civil, delegated, and deferred work so no discipline is implied to be covered accidentally.",
            },
            {
              heading: "Corrections and construction changes",
              body:
                "Plan-review comments, substitutions, and field discoveries should return to the responsible design professional. Maintaining a revision log and comparing approved drawings with shop or field changes helps protect the integrity of the sealed record through construction.",
            },
          ],
          permitSteps: [
            "Read the address against Charlotte Development Services, Mecklenburg County Code Enforcement, or a neighboring municipality, then define which structural, civil, or MEP sheets the NC PE is responsible for.",
            "Build the record from survey, field openings, geotechnical data, Charlotte Water or Duke correspondence, and the owner’s architectural background rather than a contractor sketch alone.",
            "Resolve Charlotte-Mecklenburg sheet boundaries, calculations, and special-inspection notes; the responsible PE reviews, seals, and dates only work within that professional responsibility.",
            "Use the AHJ comment log for revisions and return Charlotte-Mecklenburg, utility, or field changes to the responsible professional before issuing a clarification.",
          ],
          faqs: [
            {
              question: "What must a Charlotte PE record distinguish?",
              answer:
                "It should distinguish the city or county building set from Charlotte-Mecklenburg stormwater, Charlotte Water, fire, utility, delegated, and deferred work. A seal communicates responsibility for its defined scope, not another agency’s approval.",
            },
            {
              question: "Can a contractor’s sketch be sealed as submitted?",
              answer:
                "Not automatically. The responsible PE must obtain sufficient information, perform the design and review required by Board rules, and accept professional responsibility. Missing survey, load, code, or coordination information may require redesign.",
            },
            {
              question: "Does a North Carolina PE cover every project in Charlotte?",
              answer:
                "Licensure and any required authorization must be confirmed for the specific practice and project. Responsible licensure, seal format, and scope are checked under current Board rules; this page does not promise coverage or stamping.",
            },
          ],
          sources: [
            { label: "NC Board of Examiners rules and licensure", url: "https://www.ncbels.org/general-info/rules-laws/" },
            { label: "Charlotte permits", url: "https://www.charlottenc.gov/Growth-and-Development/Getting-Started/Permits" },
            { label: "NC building code", url: "https://www.ncosfm.gov/codes" },
            { label: "Mecklenburg County development services", url: "https://www.mecknc.gov/LUESA/CodeEnforcement/Pages/default.aspx" },
          ],
        }),
      ],
    },
    {
      slug: "raleigh",
      name: "Raleigh",
      county: "Wake County",
      services: [
        service({
          serviceSlug: "structural-engineering",
          title: "Raleigh Structural Engineering for Research, Retail, and Renovation",
          description:
            "Raleigh structural engineering for additions, tenant improvements, laboratories, multifamily, and public work, coordinated with the City of Raleigh, Wake County conditions, and North Carolina code.",
          h1: "Structural Engineering in Raleigh, NC",
          kicker: "Triangle growth backed by verifiable load paths",
          lede:
            "Raleigh’s research, government, residential, and industrial growth puts new loads on both modern frames and older buildings. Structural decisions are grounded in field verification, Wake County site conditions, and the permit route selected by the City or county.",
          permitAuthority:
            "The City of Raleigh Planning and Development Department handles building and site review within city limits; Wake County or another municipality is the authority elsewhere. Raleigh stormwater, watershed, fire, utility, and zoning reviews may be separate from the building permit.",
          codeContext:
            "The North Carolina statewide building code and amendments govern structural design, with Raleigh development rules and current AHJ procedures affecting submittal. Confirm existing-building, seismic, wind, special-inspection, and floodplain provisions for the address and code edition.",
          localConditions:
            "Raleigh sits in the Piedmont, where residual soils, variable fill, intense thunderstorms, and rolling sites create foundation and drainage questions. Falls Lake and Neuse River watershed protections can affect grading and redevelopment; hurricane remnants still produce high wind and rain inland.",
          projectTypes:
            "Research and life-science fit-outs, downtown adaptive reuse, apartment additions, schools, technology offices, and suburban commercial renovations make up common Raleigh structural scopes.",
          sections: [
            { heading: "Raleigh lab review starts with equipment criteria", body: "City of Raleigh or Wake County reviewers need vibration criteria, manufacturer reactions, rooftop support, and special-inspection boundaries tied to the lab layout. Existing drawings and field observation should be reconciled before a permit upload fixes room geometry." },
            { heading: "Watershed-aware foundations", body: "Raleigh grading and watershed controls can compress a foundation footprint or redirect drainage around a building. Coordinate civil contours, finished-floor elevations, retaining conditions, and geotechnical recommendations so a structural detail does not create a site permit conflict." },
            { heading: "Downtown alterations", body: "Older Raleigh buildings may contain infill walls, legacy strengthening, and undocumented roof cuts. A measured investigation and clearly labeled existing-versus-new plans help the reviewer and contractor understand where load path changes actually occur." },
          ],
          permitSteps: [
            "Open Raleigh’s permit intake for a city address or Wake County’s planning-and-inspections route outside the city; flag Falls Lake or Neuse watershed review before fixing occupancy and construction type.",
            "Use the field frame survey, geotechnical recommendations, equipment reactions, and any Duke or campus criteria to document the assumptions Raleigh’s reviewer will see.",
            "Thread vibration details, roof penetrations, special inspections, and civil finished-floor elevations through the building set while Planning and watershed documents remain identifiable.",
            "Answer City of Raleigh or Wake County comments by sheet and calculation, sending laboratory equipment substitutions or field discoveries back to the responsible PE.",
          ],
          faqs: [
            { question: "What does Raleigh expect for research equipment support?", answer: "The permit record should tie manufacturer reactions and vibration criteria to the structural frame, anchorage, rooftop support, and special-inspection notes. City or Wake County review remains independent of campus acceptance." },
            { question: "Does Falls Lake affect structural design?", answer: "Its watershed protections primarily influence site and stormwater decisions, but those decisions can change finished floors, retaining walls, foundations, and access. Raleigh or Wake County reviewers should confirm the applicable watershed path." },
            { question: "Can Raleigh renovations use an existing-building code path?", answer: "Possibly, depending on the work and the AHJ’s accepted compliance method. The team must document the selected path, triggers, accessibility and life-safety impacts, and any required upgrades." },
          ],
          sources: [
            { label: "Raleigh permits and inspections", url: "https://raleighnc.gov/permits" },
            { label: "Raleigh stormwater", url: "https://raleighnc.gov/stormwater" },
            { label: "Wake County permits", url: "https://www.wake.gov/departments-government/planning-development-inspections" },
            ...ncSources,
          ],
        }),
        service({
          serviceSlug: "mep-engineering",
          title: "Raleigh MEP Engineering for Triangle Offices and Laboratories",
          description:
            "Raleigh MEP engineering for laboratories, offices, multifamily, healthcare, and advanced manufacturing, coordinated with City of Raleigh permitting and Duke Energy service requirements.",
          h1: "MEP Engineering in Raleigh, NC",
          kicker: "Systems designed for Triangle growth",
          lede:
            "Raleigh MEP design must balance laboratory ventilation, high-density technology loads, residential comfort, and an evolving utility network. A useful package connects equipment schedules and controls to the actual occupancy and Raleigh permit review.",
          permitAuthority:
            "The City of Raleigh Planning and Development Department reviews building systems within city limits; Wake County and other municipalities have separate intake. Raleigh Water, Duke Energy, fire review, and environmental-health agencies may issue independent conditions for service, emergency power, medical, food, or laboratory uses.",
          codeContext:
            "North Carolina mechanical, electrical, plumbing, fuel-gas, accessibility, fire, and energy requirements apply through the current state code and amendments. Confirm Raleigh’s submittal requirements, utility design criteria, special systems, and any research or hazardous-material review with the responsible AHJs.",
          localConditions:
            "Hot humid summers, winter heating, pollen, thunderstorms, and dense utility corridors shape HVAC and electrical design. Duke Energy service, demand, transformer location, backup power, and campus distribution should be coordinated before equipment procurement.",
          projectTypes:
            "Research Triangle laboratories, downtown office conversions, student and multifamily housing, outpatient clinics, biotech manufacturing, and restaurant or retail interiors are recurring Raleigh MEP applications.",
          sections: [
            { heading: "Raleigh lab systems follow the process and the portal", body: "The City of Raleigh building record needs an occupancy and process inventory before exhaust, makeup air, pressure, gases, controls, and emergency power are selected. Fire and hazardous-material review remains a separate Triangle workflow." },
            { heading: "Duke service and campus interfaces", body: "A service increase or electrification project can require utility studies, transformer space, metering changes, and long-lead switchgear. Early correspondence prevents a permit set from showing equipment that cannot be served at the proposed location." },
            { heading: "Comfort in a humid climate", body: "Cooling capacity alone does not resolve Raleigh’s latent load. Outdoor air, filtration, condensate, economizer operation, and controls should be documented in a sequence that an operator can commission and maintain." },
          ],
          permitSteps: [
            "Use Raleigh Planning and Development for an in-city laboratory or office, or Wake County’s intake outside the boundary; start Duke Energy and Raleigh Water conversations before choosing service equipment.",
            "Turn the lab process schedule into exhaust, makeup air, pressure, cooling, plumbing, emergency-power, lighting, and controls loads rather than an office allowance.",
            "Show shafts, equipment pads, fire and hazardous-material interfaces, energy forms, and Duke service assumptions in the coordinated building set.",
            "Keep Raleigh, Wake County, fire, utility, and owner-campus comments in their own logs; route deferred equipment and substitutions through professional review.",
          ],
          faqs: [
            { question: "Which Raleigh review lane handles laboratory exhaust?", answer: "The building MEP set goes through Raleigh or Wake County, while fire, owner/campus, and any hazardous-material reviewers evaluate their own criteria. Hood exhaust and pressure assumptions should be visible in each coordinated record." },
            { question: "Does Duke Energy approve Raleigh building permits?", answer: "No. Duke handles utility service and interconnection matters, while Raleigh or another AHJ handles the building permit. Both tracks must be coordinated because service feasibility can affect the approved design." },
            { question: "Can an existing Raleigh office keep its rooftop units?", answer: "Possibly, after checking capacity, condition, ventilation, controls, refrigerant, structure, and code scope. Retaining equipment does not eliminate the need to document new distribution or altered controls." },
          ],
          sources: [
            { label: "Raleigh building permits", url: "https://raleighnc.gov/permits" },
            { label: "Duke Energy builder services", url: "https://www.duke-energy.com/our-company/about-us/for-your-business/builders" },
            { label: "Raleigh Water development", url: "https://raleighnc.gov/water" },
            { label: "NC energy code", url: "https://www.ncosfm.gov/codes/code-enforcement/energy-conservation-code" },
          ],
        }),
        service({
          serviceSlug: "civil-engineering",
          title: "Raleigh Civil Engineering for Neuse and Falls Lake Sites",
          description:
            "Raleigh civil engineering for site plans, grading, utilities, erosion control, and stormwater, with watershed-sensitive coordination for city and Wake County approvals.",
          h1: "Civil Engineering in Raleigh, NC",
          kicker: "Triangle site design with watershed discipline",
          lede:
            "Raleigh site work often succeeds or fails at the watershed and utility interface. Civil documents connect survey, grading, detention, erosion control, sewer and water, and access requirements to the City of Raleigh or Wake County review path.",
          permitAuthority:
            "The City of Raleigh reviews development and stormwater within its jurisdiction; Wake County and municipalities such as Cary or Garner have their own authorities. North Carolina DEQ may administer erosion and sedimentation or post-construction permits, while Raleigh Water controls public utility connections in its service area.",
          codeContext:
            "The applicable North Carolina stormwater, erosion and sedimentation, watershed, stream-buffer, floodplain, zoning, and utility requirements must be screened separately. Raleigh’s stormwater design guidance and current ordinance should be checked at the project date because permit thresholds and accepted controls can change.",
          localConditions:
            "The Neuse and Falls Lake watersheds, rolling Piedmont topography, red clay, intense rain, and aging drainage infrastructure make runoff volume and water quality central issues. Urban sites also encounter shallow utilities, narrow rights-of-way, and limited maintenance access.",
          projectTypes:
            "Research campuses, apartment communities, office parks, infill retail, school improvements, industrial sites, and redevelopment near Raleigh’s creek and watershed corridors are common civil assignments.",
          sections: [
            { heading: "Raleigh watershed intake precedes the grading set", body: "Raleigh Planning and stormwater reviewers can change impervious coverage, runoff volume, nutrient strategy, and lot layout under Falls Lake or Neuse rules. A concept drainage screen should precede a building footprint or Raleigh Water request." },
            { heading: "Utility profiles in a growing city", body: "New development may need Raleigh Water capacity, extensions, easements, fire-flow coordination, and separation from existing lines. Profiles and crossing details should be based on survey and utility responses, not a colored concept map." },
            { heading: "Construction sequencing matters", body: "Raleigh’s heavy rain and erodible soils make phase boundaries, inlet protection, stabilized access, and final stabilization operational requirements. The erosion set should show how a contractor can keep exposed areas and downstream systems protected." },
          ],
          permitSteps: [
            "Run the site through Raleigh Planning and stormwater intake, or Wake County and the host municipality outside Raleigh; map Falls Lake/Neuse, stream-buffer, and floodplain triggers first.",
            "Use survey, soil testing, utility responses, and Raleigh Water capacity information to test runoff volume, nutrient, fire-flow, access, and outfall options.",
            "Route erosion and sedimentation materials through NCDEQ, local stormwater calculations through Raleigh or the county, and water/sewer profiles through the utility authority.",
            "Maintain an agency comment matrix for watershed, NCDOT, fire, utility, and stormwater changes before the civil PE releases grading and maintenance documents.",
          ],
          faqs: [
            { question: "Which Raleigh submission carries Falls Lake information?", answer: "The local site/stormwater record identifies watershed and nutrient controls; NCDEQ erosion or post-construction documents may be separate. Raleigh or Wake County confirms the current package for the parcel." },
            { question: "Does Raleigh civil approval include erosion control?", answer: "Not necessarily. City stormwater or site review and the state erosion and sedimentation process are distinct tracks with different documents and authorities." },
            { question: "Can underground detention work on an urban Raleigh parcel?", answer: "It can be considered where an approved design fits soils, groundwater, utilities, access, maintenance, and overflow requirements. It is not automatically acceptable; the AHJ must review the proposed control." },
          ],
          sources: [
            { label: "Raleigh stormwater", url: "https://raleighnc.gov/stormwater" },
            { label: "Raleigh development services", url: "https://raleighnc.gov/planning" },
            { label: "NC DEQ stormwater", url: "https://www.deq.nc.gov/about/divisions/energy-mineral-land-resources/stormwater" },
            { label: "Raleigh Water", url: "https://raleighnc.gov/water" },
          ],
        }),
        service({
          serviceSlug: "energy-compliance",
          title: "Raleigh Energy-Compliance Engineering for Offices and Labs",
          description:
            "Raleigh energy-compliance documentation under North Carolina’s applicable code path, integrating envelope, lighting, HVAC, controls, and laboratory ventilation into the permit record.",
          h1: "Energy Compliance in Raleigh, NC",
          kicker: "Code documentation for efficient Triangle buildings",
          lede:
            "Raleigh projects use North Carolina energy-code requirements. The compliance record should match the actual shell, occupancy, laboratory process, equipment, and alteration scope accepted by the City of Raleigh or Wake County.",
          permitAuthority:
            "The local building department receives the permit and determines how energy documents are reviewed, while North Carolina OSFM maintains the state code framework. Owner sustainability targets, Duke Energy incentives, and campus standards are additional layers rather than substitutes for the AHJ’s code determination.",
          codeContext:
            "Verify the effective North Carolina Energy Conservation Code edition, transition rules, and prescriptive or performance path with OSFM and the local reviewer. Document envelope, lighting, mechanical, controls, and process-energy assumptions in the state’s accepted format.",
          localConditions:
            "Raleigh’s humid summer conditions make latent control and ventilation important, while pollen and shoulder seasons influence filtration and economizer operation. Research buildings can carry process loads that must be separated from regulated comfort-system assumptions.",
          projectTypes:
            "Biotech laboratories, government offices, multifamily, school renovations, shell buildings, and downtown tenant improvements frequently need Raleigh energy analysis.",
          sections: [
            { heading: "Raleigh energy review separates lab process from code", body: "Fume hoods, clean areas, refrigeration, and 24-hour equipment can dominate the model. Raleigh’s permit record should identify regulated systems and exclusions while campus or Duke targets remain a separate performance track." },
            { heading: "Envelope and moisture together", body: "Glazing, solar exposure, air barrier continuity, insulation, and humidity control are linked in Raleigh’s climate. Drawings and calculations should use assemblies that can be detailed and inspected rather than relying on an unverified product value." },
            { heading: "Existing-building flexibility needs evidence", body: "An alteration may qualify for provisions different from new construction, but that conclusion follows from scope and code analysis. Retain the existing-system inventory and explain why each exception or trade-off is being used." },
          ],
          permitSteps: [
            "Use the Raleigh building-permit record or Wake County’s review path to establish the laboratory, office, shell, or alteration scope and the North Carolina energy edition.",
            "Read assemblies, lighting, HVAC, exhaust, controls, Duke demand, and owner-performance data from coordinated sheets instead of a generic model.",
            "Tie the selected compliance forms to room schedules and equipment tags, separating campus or Duke incentive calculations from the permit evidence.",
            "Return energy comments through the city or county reviewer and preserve approved substitutions, commissioning assumptions, and field verification with the design record.",
          ],
          faqs: [
            { question: "Which Raleigh agency confirms an energy-code transition date?", answer: "The City of Raleigh reviewer applies the permit path while the North Carolina Office of State Fire Marshal maintains the state code framework. Confirm the edition and transition date with both records before modeling." },
            { question: "How should Raleigh document fume-hood energy?", answer: "State the process classification, operating schedule, controls, exhaust, makeup air, and regulated boundary in the North Carolina compliance record. The lab owner and AHJ should resolve any disputed treatment." },
            { question: "Do utility rebates prove a design is code compliant?", answer: "No. Rebates have their own eligibility rules. They may support an efficiency decision, but the permit record must independently satisfy the applicable state and local code route." },
          ],
          sources: [
            { label: "NC OSFM energy code", url: "https://www.ncosfm.gov/codes/code-enforcement/energy-conservation-code" },
            { label: "Raleigh permits", url: "https://raleighnc.gov/permits" },
            { label: "Duke Energy Smart $aver", url: "https://www.duke-energy.com/business/products/smart-saver" },
            { label: "US DOE commercial energy codes", url: "https://www.energycodes.gov/state-portal/north-carolina" },
          ],
        }),
        service({
          serviceSlug: "pe-stamped-drawings",
          title: "Raleigh PE-Stamped Drawings for Complex Permit Submittals",
          description:
            "North Carolina PE drawing coordination for Raleigh laboratories, offices, additions, and site work, with clear responsibility, code assumptions, and AHJ-specific submittal records.",
          h1: "PE-Stamped Drawings in Raleigh, NC",
          kicker: "Independent professional responsibility for Triangle projects",
          lede:
            "Raleigh’s multi-agency projects need more than a seal graphic. The responsible PE must evaluate the actual design, site evidence, code path, utility assumptions, and coordination before deciding whether a drawing is within professional responsibility.",
          permitAuthority:
            "The City of Raleigh is the building and development AHJ for city addresses, while Wake County or another municipality controls locations outside that boundary. Raleigh stormwater, Raleigh Water, fire, utility, and state agencies may require separate submissions and do not receive automatic approval from a building permit seal.",
          codeContext:
            "The current North Carolina Building Code, energy provisions, local development rules, and NC Board of Examiners requirements govern the work. The applicable edition, special inspections, existing-building provisions, flood or watershed conditions, and seal format must be verified rather than promised.",
          localConditions:
            "Research campuses, dense infill, watershed-sensitive grading, residual soil, and humid climate systems produce unusually interdependent Raleigh scopes. Responsible review therefore includes coordination between structural, MEP, civil, architectural, utility, and laboratory documents.",
          projectTypes:
            "Lab renovations, data-intensive offices, apartment additions, rooftop equipment, public facilities, site utility extensions, and commercial corrective work often require PE-reviewed drawing packages in Raleigh.",
          sections: [
            { heading: "Raleigh’s seal follows an agency record", body: "The NC PE record should include reliable backgrounds, calculations, equipment, field observations, watershed or utility assumptions, and code narrative. Incomplete campus, survey, or site information may require investigation before responsibility is accepted." },
            { heading: "Separating Raleigh approvals", body: "Building, stormwater, utility, fire, and watershed approvals are distinct. A coordinated cover sheet and responsibility matrix keep the PE’s seal from being read as a promise that another agency has accepted an unrelated scope." },
            { heading: "Maintaining the record", body: "Raleigh comments, addenda, substitutions, and construction clarifications should be tracked against the sealed set. The responsible professional evaluates changes before they become an issued instruction or as-built condition." },
          ],
          permitSteps: [
            "Name City of Raleigh or Wake County on the cover sheet, then identify Planning, watershed, Raleigh Water, fire, campus, and PE discipline boundaries before design review.",
            "Build the professional record from survey, geotechnical, equipment, utility, laboratory, and field information sufficient for independent judgment.",
            "Resolve Raleigh sheet boundaries, calculations, watershed notes, and special-inspection responsibilities; the responsible PE reviews and seals only work within actual responsibility.",
            "Upload the coordinated set through Raleigh’s permit process, log City or Wake County comments separately, and obtain professional review of each revision, substitution, deferred design, or field change.",
          ],
          faqs: [
            { question: "How should a Raleigh team separate building and watershed review?", answer: "The PE seal addresses defined engineering work; City of Raleigh or Wake County building review, Planning, watershed, fire, utility, and state authorities retain their own review decisions." },
            { question: "Can one Raleigh PE cover campus and city sheets?", answer: "Only when qualified, authorized, and actually responsible for each defined discipline. Raleigh, Wake County, campus, utility, and watershed sheets should not be implied to share one seal." },
            { question: "Are electronic seals accepted in North Carolina?", answer: "The responsible professional must follow current NC Board rules and the receiving AHJ’s electronic-submittal requirements. Confirm the format and authentication method before upload." },
          ],
          sources: [
            { label: "NC Board of Examiners rules and licensure", url: "https://www.ncbels.org/general-info/rules-laws/" },
            { label: "Raleigh permits", url: "https://raleighnc.gov/permits" },
            { label: "Raleigh development services", url: "https://raleighnc.gov/planning" },
            { label: "NC OSFM codes", url: "https://www.ncosfm.gov/codes" },
          ],
        }),
      ],
    },
    {
      slug: "greensboro",
      name: "Greensboro",
      county: "Guilford County",
      services: [
        service({
          serviceSlug: "structural-engineering",
          title: "Greensboro Structural Engineering for Triad Industrial and Commercial Work",
          description:
            "Structural engineering for Greensboro warehouses, manufacturing, healthcare, offices, and additions, addressing Piedmont soil, wind, existing-frame, and Guilford County permit conditions.",
          h1: "Structural Engineering in Greensboro, NC",
          kicker: "Piedmont Triad load paths for working buildings",
          lede:
            "Greensboro’s industrial and logistics market often adapts existing buildings while adding heavy equipment, docks, mezzanines, and rooftop systems. Structural design connects field evidence and geotechnical information to the City of Greensboro or Guilford County permit path.",
          permitAuthority:
            "The City of Greensboro Inspections Department handles building permits inside city limits; Guilford County and other municipalities serve their own jurisdictions. Site, fire, floodplain, utility, and stormwater reviews can be separate from the building permit.",
          codeContext:
            "North Carolina’s statewide building code and amendments apply, with local intake and development requirements controlling the submittal. Verify construction type, occupancy, existing-building provisions, wind and seismic parameters, special inspections, and current code edition with the AHJ.",
          localConditions:
            "Greensboro’s Piedmont sites include residual clay, undocumented industrial fill, rolling terrain, intense rain, and creek corridors. Inland hurricane winds and large roof areas matter for warehouses, while equipment vibration and forklift impact can govern industrial details.",
          projectTypes:
            "Triad distribution centers, manufacturing retrofits, airport-area warehouses, healthcare additions, downtown reuse, school work, and retail redevelopment are common structural scopes.",
          sections: [
            { heading: "Greensboro Inspections needs the industrial frame story", body: "A Greensboro warehouse record may omit openings, racks, mezzanines, repairs, or dock changes. Tie bay measurements, slab probes, roof framing, and equipment reactions to the electronic Inspections set before changing occupancy." },
            { heading: "Triad soils and foundations", body: "Variable fill and residual soil can produce differential movement across a reused industrial parcel. Geotechnical recommendations, slab joints, new footings, and stormwater grading should be treated as one coordinated foundation question." },
            { heading: "Wind on broad roofs", body: "Large low-rise roofs need clear attention to uplift zones, edge conditions, rooftop units, solar arrays, and cladding attachments. The permit drawings should make the load path and any required inspection visible to the contractor." },
          ],
          permitSteps: [
            "Open Greensboro Inspections for a city parcel or Guilford County Planning and Inspections outside the boundary; identify the industrial occupancy, current code, and special-inspection lane.",
            "Use the warehouse frame survey, slab probes, geotechnical report, equipment reactions, and floodplain map before setting a mezzanine, dock, or foundation alteration.",
            "Thread structural calculations, fire separations, civil elevations, and NCDEQ or utility site interfaces into the electronic building record.",
            "Answer Greensboro or county comments by detail and calculation, returning rack, crane, rooftop, or field discoveries to the responsible PE before release.",
          ],
          faqs: [
            { question: "What does Greensboro Inspections need for a mezzanine?", answer: "The set should address existing frame and slab, egress, fire protection, occupancy, foundations, and equipment loads. Guilford County uses a separate route outside city limits." },
            { question: "Are Greensboro industrial slabs always adequate for equipment?", answer: "No. Slab thickness, reinforcement, joints, soil support, point loads, vibration, and anchorage vary widely. Manufacturer reactions and field verification are needed." },
            { question: "Does a floodplain affect a structural addition?", answer: "It can alter elevation, foundations, enclosures, utilities, and certification requirements. Check current FEMA and local floodplain information with the city or county." },
          ],
          sources: [
            { label: "Greensboro Inspections", url: "https://www.greensboro-nc.gov/departments/inspections" },
            { label: "Guilford County planning", url: "https://www.guilfordcountync.gov/our-county/planning-development" },
            { label: "NC codes", url: "https://www.ncosfm.gov/codes" },
            { label: "FEMA maps", url: "https://msc.fema.gov/portal/home" },
          ],
        }),
        service({
          serviceSlug: "mep-engineering",
          title: "Greensboro MEP Engineering for Manufacturing and Logistics",
          description:
            "Greensboro MEP engineering for manufacturing, warehouses, healthcare, offices, and retail, coordinated with City of Greensboro inspections, utility capacity, and North Carolina code.",
          h1: "MEP Engineering in Greensboro, NC",
          kicker: "Reliable systems for Piedmont Triad operations",
          lede:
            "Greensboro facilities often combine production, storage, offices, and heavy utility demand under one roof. MEP design begins with the process and service inventory, then documents HVAC, electrical, plumbing, controls, and fire interfaces for the actual AHJ.",
          permitAuthority:
            "Greensboro Inspections is the building review authority inside the city; Guilford County or another municipality governs elsewhere. Duke Energy, the City of Greensboro water resources system, fire officials, and environmental or health agencies may control separate system approvals.",
          codeContext:
            "Current North Carolina mechanical, electrical, plumbing, fuel-gas, energy, accessibility, and fire provisions apply with local permit procedures and utility standards. Manufacturing hazards, dust collection, compressed gases, process exhaust, and emergency power need an AHJ-specific review rather than a conventional office template.",
          localConditions:
            "Greensboro’s humid summers, winter heating, pollen, thunderstorms, and industrial utility corridors affect equipment selection and controls. Duke Energy service and demand, natural gas availability, water pressure, and wastewater characteristics should be checked before layout.",
          projectTypes:
            "Aerospace and advanced manufacturing, distribution centers, food and beverage, medical offices, retail conversions, and office renovations are frequent Triad MEP projects.",
          sections: [
            { heading: "Greensboro process systems cross utility and permit lanes", body: "Production equipment, dust collection, compressed air, cooling, and exhaust can overwhelm a tenant assumption. Tie the process owner’s schedule to Greensboro Inspections, Duke service, water resources, fire, and any NCDEQ or health review." },
            { heading: "Warehouse comfort and smoke control", body: "High-bay spaces have stratification, large door openings, and different comfort zones from offices. HVAC, destratification, ventilation, fire protection, and energy documentation must be coordinated with the storage commodity and occupancy." },
            { heading: "Utility capacity is a design input", body: "A service increase or new production line may require Duke studies, transformer work, metering, or generator coordination. Greensboro water and sewer capacity and pretreatment questions can likewise move the equipment room and site plan." },
          ],
          permitSteps: [
            "Use Greensboro Inspections for city building systems or Guilford County’s process outside city limits; start Duke Energy and Greensboro water-resource service conversations with the production schedule.",
            "Translate dust collection, compressed air, process cooling, gas, ventilation, lighting, wastewater, and emergency-power needs into equipment loads.",
            "Show hazardous-material, fire, energy, equipment-clearance, and utility-service interfaces in the permit set while NCDEQ or health review remains separately tracked.",
            "Keep production-line substitutions and commissioning changes tied to the Greensboro or county comment record and the responsible design professional.",
          ],
          faqs: [
            { question: "Which Greensboro manufacturing reviews sit outside Inspections?", answer: "Duke Energy, Greensboro water resources, fire, NCDEQ erosion or environmental programs, health, and process authorities can have separate decisions. A building permit does not combine those tracks." },
            { question: "Can a warehouse HVAC system serve the office area?", answer: "It may, but zoning, ventilation, humidity, filtration, smoke, operating schedules, and controls must be evaluated. A shared system is not automatically appropriate." },
            { question: "When should Duke Energy be contacted for a Triad expansion?", answer: "Before finalizing service equipment whenever load increases, production electrifies, or backup power is contemplated. Utility feasibility and city permitting are separate tracks." },
          ],
          sources: [
            { label: "Greensboro inspections", url: "https://www.greensboro-nc.gov/departments/inspections" },
            { label: "Duke Energy builders", url: "https://www.duke-energy.com/our-company/about-us/for-your-business/builders" },
            { label: "City of Greensboro water resources", url: "https://www.greensboro-nc.gov/departments/water-resources" },
            { label: "NC energy code", url: "https://www.ncosfm.gov/codes/code-enforcement/energy-conservation-code" },
          ],
        }),
        service({
          serviceSlug: "civil-engineering",
          title: "Greensboro Civil Engineering for Industrial Sites and Triad Logistics",
          description:
            "Greensboro civil engineering for grading, drainage, erosion control, utilities, and industrial site permits, coordinated with city, Guilford County, and North Carolina requirements.",
          h1: "Civil Engineering in Greensboro, NC",
          kicker: "Buildable Triad sites with defensible drainage",
          lede:
            "Greensboro’s logistics and manufacturing sites depend on truck geometry, reliable utilities, and drainage that survives Piedmont storms. Civil documents translate survey, soils, grading, stormwater, erosion control, and agency conditions into a constructible plan.",
          permitAuthority:
            "The City of Greensboro reviews development and inspections within city limits, while Guilford County handles county jurisdiction. North Carolina DEQ, Greensboro water resources, fire officials, NCDOT, and watershed or floodplain authorities may have separate roles.",
          codeContext:
            "Screen the current North Carolina erosion and sedimentation, post-construction stormwater, stream-buffer, floodplain, zoning, access, and utility rules along with Greensboro development standards. Permit thresholds and delegated review responsibilities should be verified at the time of submission.",
          localConditions:
            "Piedmont clay, rolling grades, large impervious roofs, intense rainfall, and creek corridors challenge industrial pads and truck yards. Airport-area and highway sites also require careful access, drainage outfalls, utility easements, and fire-flow coordination.",
          projectTypes:
            "Distribution centers, manufacturing campuses, truck courts, retail centers, school sites, multifamily developments, and brownfield or infill redevelopment are common Greensboro civil projects.",
          sections: [
            { heading: "Greensboro truck courts follow access and DEQ sequence", body: "Turning templates, pavement, docks, fire access, detention, and utility corridors compete on Triad parcels. Greensboro Engineering, Guilford County, NCDOT, and NCDEQ constraints should be tested before grading is fixed." },
            { heading: "Large roofs amplify runoff", body: "Triad storms can quickly overwhelm an undersized outlet or construction-phase control. Storage, overflow, emergency routing, maintenance access, and downstream capacity should be demonstrated in the drainage concept." },
            { heading: "Industrial utility coordination", body: "Water, sanitary, fire service, gas, electrical, and process discharges can cross easements and rights-of-way. Record research and utility responses are essential where old industrial mapping is incomplete." },
          ],
          permitSteps: [
            "Run a truck-court address through Greensboro Engineering and Inspections or Guilford County Planning; establish NCDOT access, floodplain, utility, and city-limit boundaries before grading.",
            "Use survey and soil information to screen NCDEQ erosion/post-construction, stream-buffer, stormwater, fire-flow, and Greensboro water-resource triggers.",
            "Route erosion phasing to NCDEQ, drainage and maintenance material to the local stormwater reviewer, and water/sewer profiles to Greensboro Water Resources or the county utility.",
            "Maintain separate Greensboro, Guilford County, NCDOT, DEQ, and utility comment logs before the civil PE issues truck circulation and grading sheets.",
          ],
          faqs: [
            { question: "Who handles erosion on a Greensboro warehouse site?", answer: "NCDEQ’s erosion and sedimentation program or its delegated local process controls land-disturbance review; Greensboro or Guilford County handles local development separately. Thresholds must be checked for the parcel." },
            { question: "How do truck courts affect civil design?", answer: "They drive grades, pavement, drainage inlets, fire access, turning, loading, and utility conflicts. A civil plan should test real vehicle geometry and operations, not just parking counts." },
            { question: "Are Greensboro outfalls always available?", answer: "No. Capacity, ownership, easements, downstream conditions, and maintenance responsibility must be confirmed. An apparent ditch or pipe on a survey is not proof of an approved connection." },
          ],
          sources: [
            { label: "Greensboro development services", url: "https://www.greensboro-nc.gov/departments/engineering-inspection" },
            { label: "NC DEQ stormwater", url: "https://www.deq.nc.gov/about/divisions/energy-mineral-land-resources/stormwater" },
            { label: "Greensboro water resources", url: "https://www.greensboro-nc.gov/departments/water-resources" },
            { label: "NCDOT driveways and encroachments", url: "https://www.ncdot.gov/projects/right-of-way/Pages/encroachment-agreements.aspx" },
          ],
        }),
        service({
          serviceSlug: "energy-compliance",
          title: "Greensboro Energy-Compliance Engineering for Industrial Buildings",
          description:
            "North Carolina energy-compliance documentation for Greensboro warehouses, manufacturing, offices, and tenant work, with process loads separated from regulated building systems.",
          h1: "Energy Compliance in Greensboro, NC",
          kicker: "Triad energy documentation tied to actual operations",
          lede:
            "Greensboro energy compliance follows North Carolina’s applicable energy code. Industrial process schedules, high-bay envelopes, office areas, HVAC, lighting, and controls need a coordinated route accepted by the local reviewer.",
          permitAuthority:
            "Greensboro Inspections reviews the building permit while the state code program defines the energy framework. Duke Energy programs, owner sustainability goals, and industrial operating standards may add requirements but are not substitutes for the permit energy analysis.",
          codeContext:
            "Confirm the current North Carolina Energy Conservation Code edition, transition rules, existing-building provisions, and prescriptive or performance path with OSFM and Greensboro. Identify process energy, regulated comfort systems, lighting, envelope, and controls in the forms accepted by the state and city.",
          localConditions:
            "Humid summers, winter heating, large roof areas, frequent door openings, and variable industrial schedules shape Greensboro energy use. Demand, compressed air, process cooling, and ventilation can be significant owner concerns beyond the code boundary.",
          projectTypes:
            "Distribution shells, manufacturing expansions, food facilities, offices, medical buildings, retail conversions, and warehouse lighting retrofits commonly need energy-compliance work.",
          sections: [
            { heading: "Greensboro energy forms separate plant process from shell", body: "A compressor or production line may operate unlike the comfort systems around it. Greensboro’s permit record should identify exclusions, schedules, controls, and assumptions while Duke or owner analysis remains separate." },
            { heading: "High-bay envelope and doors", body: "Insulation continuity, air leakage, dock doors, skylights, and rooftop equipment can dominate warehouse performance. Details should show how the selected assemblies and controls will be built and commissioned." },
            { heading: "Duke programs are a second track", body: "Utility incentives may reward efficient lighting, motors, or HVAC, but eligibility and measurement rules differ from North Carolina code. Keep incentive calculations and permit forms clearly cross-referenced but independent." },
          ],
          permitSteps: [
            "Use Greensboro Inspections’ building record, or Guilford County’s review outside city limits, to establish conditioned area, process classification, alteration scope, and energy-code edition.",
            "Read high-bay envelope, dock-door, lighting, HVAC, controls, process, operating-hour, and Duke demand assumptions from the coordinated design.",
            "Tie North Carolina compliance forms to equipment tags and architectural assemblies, keeping Duke efficiency incentives and owner targets in a separate evidence set.",
            "Return energy corrections through the Greensboro or county reviewer and record approved substitutions and field verification with the permit documents.",
          ],
          faqs: [
            { question: "What energy evidence does Greensboro need for a warehouse shell?", answer: "The package should identify conditioned areas, envelope assemblies, lighting, HVAC, controls, and any process boundary using the current North Carolina compliance route. Greensboro Inspections confirms the permit submittal format." },
            { question: "How should Greensboro document an unconditioned production bay?", answer: "State the envelope, occupancy, ventilation, equipment, process classification, and selected North Carolina code path. Greensboro Inspections determines the accepted documentation, not an incentive administrator." },
            { question: "Can Duke incentives pay for required efficiency?", answer: "An incentive may apply to a code-required measure, but that does not remove code documentation or guarantee incentive eligibility. The utility program and AHJ each make their own determination." },
          ],
          sources: [
            { label: "Greensboro inspections", url: "https://www.greensboro-nc.gov/departments/inspections" },
            { label: "NC OSFM energy code", url: "https://www.ncosfm.gov/codes/code-enforcement/energy-conservation-code" },
            { label: "Duke Energy business efficiency", url: "https://www.duke-energy.com/business/products/smart-saver" },
            { label: "DOE North Carolina energy codes", url: "https://www.energycodes.gov/state-portal/north-carolina" },
          ],
        }),
        service({
          serviceSlug: "pe-stamped-drawings",
          title: "Greensboro PE-Stamped Drawings for Manufacturing and Site Permits",
          description:
            "Responsible North Carolina PE drawing coordination for Greensboro industrial, commercial, and site projects, with discipline scope, AHJ conditions, and existing information documented.",
          h1: "PE-Stamped Drawings in Greensboro, NC",
          kicker: "A defensible seal for Triad construction documents",
          lede:
            "Greensboro industrial work often combines building, process, utility, site, and fire decisions. A PE seal is appropriate only after the responsible professional evaluates the actual information and accepts responsibility for the defined discipline scope.",
          permitAuthority:
            "Greensboro Inspections is the city building AHJ; Guilford County or another municipality governs other addresses. DEQ, water resources, NCDOT, fire officials, Duke Energy, and utility providers may require independent approvals that a sealed drawing does not guarantee.",
          codeContext:
            "The current North Carolina codes, local development requirements, and NC Board of Examiners rules control the drawing and seal. Verify occupancy, industrial hazards, energy, special inspections, erosion, utility, and current electronic-submittal requirements for the project.",
          localConditions:
            "Large roofs, industrial machinery, residual soils, truck traffic, and utility corridors make Greensboro projects especially sensitive to incomplete backgrounds. The drawing index should distinguish building, process, civil, structural, MEP, and delegated work.",
          projectTypes:
            "Manufacturing line expansions, warehouses, site utilities, commercial alterations, rooftop equipment, plant offices, and corrective permits commonly need responsible PE review.",
          sections: [
            { heading: "Greensboro’s process record precedes a seal", body: "Equipment reactions, temperature, exhaust, compressed air, hazards, and maintenance clearances can change a plant drawing. The NC PE needs owner and manufacturer data before separating Inspections, DEQ, fire, utility, and delegated scopes." },
            { heading: "Existing conditions are part of responsibility", body: "An industrial drawing assembled from an old PDF may miss modifications and repairs. Field measurement, selective investigation, and assumptions clearly marked for confirmation help prevent an unsupported seal." },
            { heading: "One seal does not combine agencies", body: "Greensboro building review, DEQ, utility, fire, and NCDOT tracks remain distinct. A responsibility matrix and permit register clarify exactly what the signed set addresses." },
          ],
          permitSteps: [
            "Name Greensboro Inspections or Guilford County Planning and Inspections on the cover sheet, then define process, civil, fire, utility, and NC PE boundaries.",
            "Build the record from field measurements, geotechnical data, manufacturer reactions, Duke or water-resource correspondence, and reliable architectural backgrounds.",
            "Resolve Greensboro Inspections sheet boundaries, industrial equipment notes, and special-inspection responsibilities; the responsible PE signs only work within competence and responsibility.",
            "File the City of Greensboro or Guilford County set, keep DEQ, utility, fire, and NCDOT comments in separate tracks, and obtain professional evaluation before issuing revisions.",
          ],
          faqs: [
            { question: "Can a Greensboro building seal include process equipment?", answer: "Only when the qualified responsible PE expressly reviews and accepts that scope. Manufacturing, utility, fire, civil, and delegated systems must not be implied to share the building seal." },
            { question: "How should an industrial Greensboro seal identify process scope?", answer: "The drawing index should distinguish building work from machinery, process utilities, civil, fire, and delegated design. The AHJ and responsible PE determine what is within the signed scope." },
            { question: "Can an out-of-state engineer seal Greensboro drawings?", answer: "Responsible North Carolina licensure and any applicable authorization must be confirmed under current NC Board rules. This service description does not promise licensure, comity, or stamping." },
          ],
          sources: [
            { label: "NC Board of Examiners rules and licensure", url: "https://www.ncbels.org/general-info/rules-laws/" },
            { label: "Greensboro inspections", url: "https://www.greensboro-nc.gov/departments/inspections" },
            { label: "NC codes", url: "https://www.ncosfm.gov/codes" },
            { label: "Guilford County planning", url: "https://www.guilfordcountync.gov/our-county/planning-development" },
          ],
        }),
      ],
    },
    {
      slug: "winston-salem",
      name: "Winston-Salem",
      county: "Forsyth County",
      services: [
        service({
          serviceSlug: "structural-engineering",
          title: "Winston-Salem Structural Engineering for Adaptive Reuse and Industry",
          description:
            "Winston-Salem structural engineering for adaptive reuse, healthcare, manufacturing, and additions, coordinated with Forsyth County conditions and City-County Inspections.",
          h1: "Structural Engineering in Winston-Salem, NC",
          kicker: "Historic shells and new industry, carefully connected",
          lede:
            "Winston-Salem projects frequently reuse tobacco, warehouse, institutional, and industrial buildings while adding modern occupancy and equipment. Structural engineering verifies the real frame and links it to the applicable City-County Inspections path.",
          permitAuthority:
            "Winston-Salem/Forsyth County Inspections provides building permit services for the jurisdiction, with zoning, fire, stormwater, floodplain, and utility reviews potentially separate. Confirm the address and review lane before relying on a city process description.",
          codeContext:
            "North Carolina’s statewide building code and amendments govern, with existing-building, historic, occupancy, wind, seismic, and special-inspection provisions selected for the project. City-County requirements and current code edition should be verified at intake.",
          localConditions:
            "Piedmont residual soil, rolling terrain, intense storms, creek floodplains, and older masonry or timber shells define much of the market. Adaptive reuse also brings unknown foundations, infill, corrosion, and vibration from new uses.",
          projectTypes:
            "Tobacco-district reuse, healthcare and life-science renovation, manufacturing, multifamily conversions, school additions, and suburban commercial work are common.",
          sections: [
            { heading: "City-County review needs a forensic reuse record", body: "Historic and industrial records can conflict with observed framing in Winston-Salem’s tobacco district. Field measurements, selective openings, masonry assessment, and clearly labeled assumptions support the City-County Inspections alteration file." },
            { heading: "New loads in old neighborhoods", body: "Rooftop units, elevators, accessible routes, new stairs, and tenant partitions can change gravity and lateral paths. Detail the interface between new steel or concrete and existing masonry rather than burying it in general notes." },
            { heading: "Drainage affects foundations", body: "Forsyth County slopes and creek corridors can expose old footings to water or create retaining conditions during an addition. Coordinate civil grades, waterproofing, foundation drains, and geotechnical recommendations." },
          ],
          permitSteps: [
            "Open Winston-Salem/Forsyth County Inspections for the address, then route historic, zoning, floodplain, and site questions to the appropriate city or county desk before choosing the alteration path.",
            "Use measured tobacco-district framing, masonry openings, geotechnical data, photographs, and new occupancy or equipment loads to establish what the old record can support.",
            "Carry existing/new framing, special inspections, civil elevations, fire separation, and historic-review notes in the City-County electronic plan set.",
            "Answer City-County comments by existing-condition assumption, and return discovered infill, roof cuts, or field changes to the responsible PE.",
          ],
          faqs: [
            { question: "What does City-County Inspections need for a tobacco conversion?", answer: "The alteration set should document existing framing, occupancy, life safety, accessibility, historic constraints, and any Forsyth County site or flood review. Feasibility depends on verified conditions, not a historic designation alone." },
            { question: "Do Winston-Salem slopes create structural risk?", answer: "They can affect retaining, foundations, drainage, erosion, and access. Geotechnical and civil information should be coordinated with the structural design." },
            { question: "Are masonry walls in older buildings assumed sound?", answer: "No. Age, moisture, alterations, cracking, and load history need evaluation. Selective investigation may be necessary before adding floors or equipment." },
          ],
          sources: [
            { label: "Winston-Salem inspections", url: "https://www.cityofws.org/114/Inspections" },
            { label: "Forsyth County planning", url: "https://www.forsythcountync.gov/Departments/Planning" },
            { label: "NC OSFM codes", url: "https://www.ncosfm.gov/codes" },
            { label: "FEMA flood maps", url: "https://msc.fema.gov/portal/home" },
          ],
        }),
        service({
          serviceSlug: "mep-engineering",
          title: "Winston-Salem MEP Engineering for Healthcare and Reuse",
          description:
            "Winston-Salem MEP engineering for healthcare, adaptive reuse, manufacturing, offices, and multifamily, coordinated with City-County Inspections and local utility requirements.",
          h1: "MEP Engineering in Winston-Salem, NC",
          kicker: "Modern building systems for an evolving Triad city",
          lede:
            "Winston-Salem MEP work spans medical campuses, reused tobacco buildings, manufacturing, and neighborhood development. System design begins with occupancy, existing capacity, utility service, and the review authorities that control the address.",
          permitAuthority:
            "Winston-Salem/Forsyth County Inspections reviews building systems, while fire, health, utility, water, and state agencies may review specialized work. Duke Energy and Winston-Salem/Forsyth County Utility Commission requirements should be coordinated separately from permit approval.",
          codeContext:
            "Current North Carolina mechanical, plumbing, electrical, energy, accessibility, and fire requirements apply. Healthcare, laboratory, food, industrial process, emergency power, and hazardous-material scopes can invoke additional standards; confirm the accepted code path with the project AHJs.",
          localConditions:
            "Humid summers, winter heating, pollen, thunderstorms, older utility infrastructure, and reused shells shape equipment and controls. Downtown floor-to-floor heights and historic envelopes often restrict shafts, ducts, condensate, and service routing.",
          projectTypes:
            "Healthcare improvements, medical offices, tobacco-district conversions, manufacturing, restaurants, multifamily, and office renovations are recurring MEP projects.",
          sections: [
            { heading: "Winston-Salem clinic systems cross health and City-County review", body: "Clinical rooms, infection-control ventilation, medical gases, emergency power, and life safety must track owner criteria plus health, fire, utility, and City-County Inspections review. A generic office system is not an appropriate starting point." },
            { heading: "Reuse and limited shafts", body: "Older Winston-Salem buildings can have shallow floors and protected façades. A field survey and early routing study can expose where new risers, exhaust, electrical distribution, and condensate need architectural compromise." },
            { heading: "Utility service in phases", body: "A campus or phased redevelopment may need temporary service, new meters, generator coordination, and water or sewer capacity checks. The permit drawings should show the permanent operating condition and identify temporary work clearly." },
          ],
          permitSteps: [
            "Use City-County Inspections for the building set and separately identify Forsyth health, fire, utility, and state review for a clinic, tobacco reuse, or manufacturing process.",
            "Translate clinical rooms, medical gases, infection-control ventilation, phased service, HVAC, plumbing, emergency power, and controls into the operating plan.",
            "Show shafts, firestopping, protected façades, equipment access, Winston-Salem/Forsyth County Utility Commission service, and energy documentation together.",
            "Keep health, fire, utility, and City-County comments separate; commissioning substitutions return to the responsible designer before inspection.",
          ],
          faqs: [
            { question: "Which Winston-Salem clinic approvals are separate from Inspections?", answer: "Health, fire, utility, and any state facility review can sit alongside City-County Inspections. The owner and agencies determine the actual scope; a building permit does not combine those decisions." },
            { question: "Can reused tobacco buildings support modern HVAC?", answer: "They may, but floor heights, structure, envelope, shafts, electrical service, and condensate routes must be surveyed. The best solution may combine zones and carefully located new risers." },
            { question: "Who controls water utility conditions?", answer: "The applicable Winston-Salem/Forsyth County utility authority sets service and connection requirements, while the building AHJ reviews plumbing code. Confirm both tracks for the address." },
          ],
          sources: [
            { label: "Winston-Salem inspections", url: "https://www.cityofws.org/114/Inspections" },
            { label: "Winston-Salem/Forsyth County utilities", url: "https://www.cityofws.org/104/Utilities" },
            { label: "Duke Energy builders", url: "https://www.duke-energy.com/our-company/about-us/for-your-business/builders" },
            { label: "NC energy code", url: "https://www.ncosfm.gov/codes/code-enforcement/energy-conservation-code" },
          ],
        }),
        service({
          serviceSlug: "civil-engineering",
          title: "Winston-Salem Civil Engineering for Sloped Piedmont Sites",
          description:
            "Winston-Salem civil engineering for grading, drainage, erosion, utilities, and redevelopment, with Forsyth County slope, creek, and stormwater constraints documented.",
          h1: "Civil Engineering in Winston-Salem, NC",
          kicker: "Site plans for slopes, streets, and stormwater",
          lede:
            "Winston-Salem’s rolling terrain and redevelopment history demand more than a generic grading sheet. Civil design coordinates survey, retaining, stormwater, erosion, utilities, access, and City-County review into a plan contractors can build.",
          permitAuthority:
            "Winston-Salem/Forsyth County reviews development and inspections through the applicable local departments; North Carolina DEQ, utilities, fire, NCDOT, and floodplain staff may have separate authority. Verify whether the parcel is inside city limits, county jurisdiction, or another municipality.",
          codeContext:
            "Current North Carolina erosion, stormwater, stream-buffer, floodplain, zoning, access, and utility rules apply alongside local development standards. Thresholds, delegated reviews, and ordinance requirements must be checked for the actual site and submission date.",
          localConditions:
            "Rolling Piedmont grades, clay soils, intense rain, creek corridors, and older underground utilities create cut/fill, retaining, and drainage risk. Redevelopment parcels can have buried foundations, abandoned lines, and outfalls with uncertain ownership.",
          projectTypes:
            "Medical campuses, multifamily on slopes, tobacco-district reuse, industrial pads, neighborhood retail, schools, and roadway or utility extensions are common civil assignments.",
          sections: [
            { heading: "Forsyth slopes need a construction sequence", body: "A Winston-Salem parcel may require walls, temporary cuts, accessible routes, and stormwater controls in a precise order. City-County Planning, NCDEQ, NCDOT, and the utility authority should see how access and stabilization reach the final grade." },
            { heading: "Creeks and old outfalls", body: "Floodplain mapping and visible drainage do not prove a legal or adequate discharge point. Research easements, downstream ownership, capacity, buffers, and maintenance responsibilities before setting finished floors." },
            { heading: "Utility corridors through reuse", body: "Former industrial sites can contain abandoned water, sewer, fuel, or private lines. Locate and verify utilities before designing a new service alignment or promising a simple tie-in." },
          ],
          permitSteps: [
            "Run the slope parcel through Winston-Salem/Forsyth County Planning and Inspections, then identify NCDOT, floodplain, fire, and utility jurisdiction from the survey and address.",
            "Use topography, geotechnical recommendations, creek mapping, and utility locating to screen NCDEQ land disturbance, stream buffers, outfalls, and retaining needs.",
            "Route erosion material to NCDEQ, drainage and site work to the local reviewer, and water/sewer profiles to the Winston-Salem/Forsyth County utility authority.",
            "Track city, county, DEQ, NCDOT, fire, and utility comments against the grading sequence before the civil PE issues the construction package.",
          ],
          faqs: [
            { question: "Who reviews a Winston-Salem retaining and drainage sequence?", answer: "City-County Planning or the county route handles local development, while NCDEQ, NCDOT, fire, floodplain, and utility authorities may review separate triggers. Geotechnical and drainage evidence should accompany the civil record." },
            { question: "Does a visible ditch count as an approved outfall?", answer: "No. Capacity, ownership, easements, downstream impacts, and agency acceptance must be confirmed." },
            { question: "Can a former industrial parcel use existing utilities?", answer: "Possibly, after locating, sizing, testing, and confirming ownership and capacity. Record drawings alone are often incomplete on older sites." },
          ],
          sources: [
            { label: "Winston-Salem inspections", url: "https://www.cityofws.org/114/Inspections" },
            { label: "Forsyth County planning", url: "https://www.forsythcountync.gov/Departments/Planning" },
            { label: "NC DEQ stormwater", url: "https://www.deq.nc.gov/about/divisions/energy-mineral-land-resources/stormwater" },
            { label: "NC flood risk information", url: "https://www.ncdps.gov/our-organization/emergency-management/hazard-mitigation/flood-risk-information" },
          ],
        }),
        service({
          serviceSlug: "energy-compliance",
          title: "Winston-Salem Energy-Compliance Engineering for Reused Buildings",
          description:
            "Energy-compliance support for Winston-Salem adaptive reuse, healthcare, industrial, and commercial projects under North Carolina’s applicable energy-code route.",
          h1: "Energy Compliance in Winston-Salem, NC",
          kicker: "Evidence-based energy documentation for existing buildings",
          lede:
            "Winston-Salem adaptive reuse can expose envelope and mechanical conditions that do not fit a new-construction worksheet. Energy compliance uses North Carolina requirements and a documented alteration path accepted by City-County Inspections.",
          permitAuthority:
            "Winston-Salem/Forsyth County Inspections receives the building permit; OSFM maintains the state code framework. Historic, healthcare, utility, owner, or incentive requirements may be additional and should not be represented as the building-code approval.",
          codeContext:
            "Confirm the effective North Carolina Energy Conservation Code edition, alteration provisions, and accepted prescriptive or performance method. Envelope, lighting, HVAC, controls, and process-energy assumptions must match the state route and the existing Winston-Salem building.",
          localConditions:
            "Humid summers and winter heating combine with old masonry, tall windows, air leakage, limited shafts, and irregular floor plates. Healthcare and industrial schedules can also create 24-hour loads beyond ordinary office assumptions.",
          projectTypes:
            "Historic tobacco conversions, clinics, offices, warehouses, multifamily retrofits, restaurants, and school renovations are common Winston-Salem energy scopes.",
          sections: [
            { heading: "City-County energy review needs existing envelope evidence", body: "Brick walls, historic windows, roof additions, and unrecorded insulation can make default assumptions unreliable. Field observation and an alteration narrative help Winston-Salem Inspections understand the proposed North Carolina path." },
            { heading: "Lighting and controls in reuse", body: "Tenant lighting can be a substantial improvement even where the shell remains. Controls, daylight zones, occupancy schedules, and emergency circuits should be coordinated with the actual historic or clinical layout." },
            { heading: "Separate owner goals", body: "Utility incentives, preservation goals, electrification, and carbon targets may shape the project, but each has a different verification method. The permit record should identify what is code-required and what is voluntary." },
          ],
          permitSteps: [
            "Use City-County Inspections’ permit record to classify a historic, healthcare, industrial, or commercial alteration and verify the North Carolina energy-code edition.",
            "Read brick, window, roof, lighting, equipment, controls, schedules, Duke demand, and owner-preservation constraints from the actual building.",
            "Tie accepted energy forms to architectural and MEP sheets, keeping Duke incentives, preservation goals, and electrification studies separate from code evidence.",
            "Return comments through City-County review and preserve approved substitutions, existing-assembly exceptions, and field verification in the alteration file.",
          ],
          faqs: [
            { question: "How does City-County Inspections handle an energy-code alteration?", answer: "The reviewer evaluates the documented North Carolina alteration path, existing assemblies, and new systems submitted with the building permit. Confirm the current edition and accepted local documentation before finalizing the set." },
            { question: "How should Winston-Salem document historic envelope exceptions?", answer: "Record real assemblies, alteration provisions, historic constraints, and the selected state compliance path in the City-County permit set. Owner preservation goals and Duke incentives remain separate evidence." },
            { question: "Do energy incentives approve a permit?", answer: "No. Incentive administrators and building officials make separate decisions. Shared calculations still need to be labeled and checked for each purpose." },
          ],
          sources: [
            { label: "Winston-Salem inspections", url: "https://www.cityofws.org/114/Inspections" },
            { label: "NC OSFM energy code", url: "https://www.ncosfm.gov/codes/code-enforcement/energy-conservation-code" },
            { label: "Duke Energy efficiency", url: "https://www.duke-energy.com/business/products/smart-saver" },
            { label: "DOE North Carolina portal", url: "https://www.energycodes.gov/state-portal/north-carolina" },
          ],
        }),
        service({
          serviceSlug: "pe-stamped-drawings",
          title: "Winston-Salem PE-Stamped Drawings for Reuse and Healthcare",
          description:
            "North Carolina PE-stamped drawing coordination for Winston-Salem adaptive reuse, healthcare, industrial, and site projects, with City-County review responsibilities defined.",
          h1: "PE-Stamped Drawings in Winston-Salem, NC",
          kicker: "Professional review for complex Triad alterations",
          lede:
            "A Winston-Salem seal should represent independent review of the real building or site, not a name added after drafting. The responsible North Carolina PE confirms the scope, information, code path, and AHJ requirements before accepting responsibility.",
          permitAuthority:
            "Winston-Salem/Forsyth County Inspections handles the local building route, while fire, health, utilities, DEQ, NCDOT, and floodplain authorities may review related work. A sealed package does not guarantee acceptance by any of those separate agencies.",
          codeContext:
            "Current North Carolina codes, local development requirements, and NC Board rules govern seals and permit drawings. Existing-building, historic, healthcare, industrial, energy, floodplain, special-inspection, and electronic-submittal requirements are confirmed project by project.",
          localConditions:
            "Older masonry and timber, sloped sites, reused utilities, humid systems, and healthcare operations create interdependent design responsibility. A drawing index and responsibility matrix are especially important when many consultants contribute.",
          projectTypes:
            "Tobacco-district conversions, clinic renovations, industrial equipment, rooftop units, multifamily additions, site utilities, and correction permits are common requests.",
          sections: [
            { heading: "Winston-Salem responsibility begins with agency boundaries", body: "Measured conditions, equipment data, survey, geotechnical recommendations, code analysis, and City-County, health, fire, utility, or DEQ boundaries are prerequisites for informed NC PE judgment." },
            { heading: "Health and fire interfaces", body: "A PE drawing can support a permit while health or fire authorities review separate requirements. The project register should identify those lanes and avoid implying the seal covers clinical operations or fire acceptance." },
            { heading: "Revisions stay accountable", body: "City-County comments, contractor substitutions, and discovered conditions can change the design. Each revision should return to the responsible PE for evaluation before it is issued as part of the sealed work." },
          ],
          permitSteps: [
            "Name Winston-Salem/Forsyth County Inspections and any city historic, health, fire, utility, or DEQ reviewer on the responsibility matrix before defining the NC PE scope.",
            "Build the professional record from measured reuse conditions, geotechnical recommendations, medical or process data, utility information, and owner criteria.",
            "Reconcile City-County Inspections sheets with health, fire, utility, and historic-reuse notes; the responsible PE seals only work within competence and accepted responsibility.",
            "Track City-County, health, utility, and fire comments as separate Winston-Salem review lanes, then obtain professional evaluation of revisions and field changes.",
          ],
          faqs: [
            { question: "What should a Winston-Salem reuse set document before sealing?", answer: "Measured conditions, historic or owner criteria, the alteration code path, structural or MEP investigation, and each agency’s scope should be recorded before the responsible PE accepts responsibility." },
            { question: "Can photographs alone support a Winston-Salem reuse seal?", answer: "They may support a survey but usually cannot replace measurements, openings, geotechnical data, or agency criteria needed for judgment. The responsible PE decides what additional investigation is necessary." },
            { question: "Does North Carolina licensure need to be confirmed per project?", answer: "Yes. Responsible licensure, scope, competence, and any applicable authorization are confirmed under current NC Board requirements; stamping or coverage is never promised by this page." },
          ],
          sources: [
            { label: "NC Board of Examiners rules and licensure", url: "https://www.ncbels.org/general-info/rules-laws/" },
            { label: "Winston-Salem inspections", url: "https://www.cityofws.org/114/Inspections" },
            { label: "NC building codes", url: "https://www.ncosfm.gov/codes" },
            { label: "Forsyth County planning", url: "https://www.forsythcountync.gov/Departments/Planning" },
          ],
        }),
      ],
    },
    {
      slug: "durham",
      name: "Durham",
      county: "Durham County",
      services: [
        service({
          serviceSlug: "structural-engineering",
          title: "Durham Structural Engineering for Life-Science and Urban Projects",
          description:
            "Durham structural engineering for laboratories, adaptive reuse, multifamily, institutional, and commercial projects, coordinated with Durham City-County Inspections, Planning, and Piedmont site conditions.",
          h1: "Structural Engineering in Durham, NC",
          kicker: "Research, reuse, and resilient Piedmont structures",
          lede:
            "Durham’s life-science and adaptive-reuse market places new vibration, equipment, and occupancy demands on varied existing frames. Structural work begins with field evidence and a permit strategy grounded in Durham’s actual jurisdiction and site.",
          permitAuthority:
            "The Durham City-County Inspections Department administers building permits and plan review; Durham Planning applies the Unified Development Ordinance and site-development process. Durham stormwater, watershed, fire, utility, and floodplain functions can be separate tracks, and county or municipal boundaries should be confirmed before submittal.",
          codeContext:
            "North Carolina’s current building code and amendments apply, with Durham development standards and existing-building provisions affecting review. Verify occupancy, construction type, wind, seismic, special inspection, floodplain, and research-use requirements for each project.",
          localConditions:
            "Durham has Piedmont residual clay, intense rainfall, rolling sites, urban infill, creek corridors, and occasional karst or rock conditions in the wider Triangle. Laboratory vibration and rooftop equipment often govern more than ordinary office gravity loads.",
          projectTypes:
            "Life-science laboratories, Duke-area healthcare, historic tobacco reuse, multifamily, university support buildings, and retail or office conversions are common.",
          sections: [
            { heading: "Durham lab vibration belongs in the Inspections record", body: "Research equipment and imaging spaces need criteria based on instruments, floor spans, neighboring Duke or private operations, and building services. City-County Inspections should receive a traceable support and vibration record, not an office live-load shortcut." },
            { heading: "Adaptive reuse and hidden alterations", body: "Durham’s older industrial buildings may contain infill and prior openings that are absent from records. Field investigation and a carefully bounded alteration strategy help separate original capacity from later modifications." },
            { heading: "Urban site-to-foundation coordination", body: "Stormwater, retaining, utility, and finished-floor decisions can change foundation elevations and lateral soil conditions. Coordinate structural and civil plans before a tight infill site reaches permit review." },
          ],
          permitSteps: [
            "Check whether the address is inside Durham city limits or unincorporated Durham County, then confirm City-County Inspections, Planning, watershed, and floodplain review for the research use.",
            "Use measured lab floors, geotechnical recommendations, equipment vibration criteria, Duke or campus standards, and floodplain elevations to define the design assumptions.",
            "Place framing, foundations, lab penetrations, special inspections, and civil finished floors in the coordinated set while Planning and stormwater documents remain distinct.",
            "Resolve City-County comments by calculation and sheet, returning imaging equipment, rooftop, or field changes to the responsible PE before resubmittal.",
          ],
          faqs: [
            { question: "What should a Durham lab send with vibration-sensitive equipment?", answer: "Tie instrument criteria and floor response to the framing, anchorage, neighboring operations, and special-inspection notes in the City-County Inspections set; campus review may add separate criteria." },
            { question: "Can a Durham tobacco building support apartment loads?", answer: "The existing frame, walls, foundations, fire and egress changes, and selected code path determine feasibility. Investigation is required before relying on historical drawings." },
            { question: "Do Durham stormwater rules affect foundations?", answer: "They can through finished-floor, retaining, drainage, and floodplain decisions. Structural and civil teams should coordinate the permitted site concept." },
          ],
          sources: [
            { label: "Durham City-County Inspections", url: "https://www.durhamnc.gov/484/Inspections" },
            { label: "Durham City-County Planning and Development", url: "https://www.durhamnc.gov/145/Planning" },
            { label: "Durham Unified Development Ordinance", url: "https://udo.durhamnc.gov/udo" },
            { label: "Durham stormwater", url: "https://www.durhamnc.gov/1009/Stormwater-Services" },
            { label: "Duke University facilities", url: "https://facilities.duke.edu/" },
            ...ncSources,
          ],
        }),
        service({
          serviceSlug: "mep-engineering",
          title: "Durham MEP Engineering for Laboratories and Healthcare",
          description:
            "Durham MEP engineering for research, healthcare, adaptive reuse, multifamily, and technology facilities, coordinated with local development review and utility conditions.",
          h1: "MEP Engineering in Durham, NC",
          kicker: "Research-ready systems for the Bull City",
          lede:
            "Durham MEP work must reconcile laboratory ventilation, clinical reliability, reused shells, and utility capacity. Design documents turn owner process criteria into coordinated systems for Durham City-County Inspections, Planning, and other reviewing authorities.",
          permitAuthority:
            "Durham City-County Inspections reviews building systems, while Durham Planning, fire, health, utility, and state agencies may review specialized scopes. Durham Water Management, Duke Energy, and institutional owners may impose separate service or campus requirements.",
          codeContext:
            "North Carolina mechanical, electrical, plumbing, energy, accessibility, and fire provisions apply with current amendments and local procedures. Research, healthcare, hazardous materials, medical gases, emergency power, and high-containment features need specific AHJ coordination.",
          localConditions:
            "Durham’s humid cooling season, pollen, thunderstorms, dense campuses, and older industrial shells affect ventilation, filtration, condensate, routing, and electrical service. Equipment lead times and utility studies should inform the design schedule.",
          projectTypes:
            "Biotech laboratories, Duke and community healthcare, downtown conversions, multifamily, university support, restaurant, and office projects are common MEP scopes.",
          sections: [
            { heading: "Durham MEP review follows the lab program", body: "Room pressure, air changes, hood diversity, gases, exhaust discharge, redundancy, and emergency power should be established with the research owner before City-County Inspections, fire, campus, and utility coordination." },
            { heading: "Reuse requires field truth", body: "Existing shafts, panels, roofs, plumbing, and controls in Durham’s converted buildings can differ from records. A measured MEP survey prevents a new system from depending on inaccessible or overloaded infrastructure." },
            { heading: "Campus and public utilities", body: "Duke, Durham Water Management, and other providers may have service, metering, backflow, and shutdown requirements that are separate from building code. Coordinate them before equipment rooms and site connections are fixed." },
          ],
          permitSteps: [
            "Map the Durham City-County Inspections route against Planning, fire, health, Durham Water Management, Duke Energy, campus, and state reviews before collecting process and service data.",
            "Translate the Durham lab or clinical program into hood exhaust, pressure, gases, cooling, emergency power, plumbing, lighting, and controls loads with the owner and campus reviewer.",
            "Place room criteria, shafts, firestopping, energy evidence, Durham Water Management service, Duke capacity, and commissioning responsibilities on the coordinated set.",
            "Keep City-County Inspections, Planning, fire, health, campus, utility, and state comments in separate logs; route substitutions through responsible review.",
          ],
          faqs: [
            { question: "Which Durham agency sees laboratory MEP information?", answer: "City-County Inspections reviews the building set; Planning, fire, health, campus, Durham Water Management, Duke Energy, and state reviewers can have separate criteria for process systems." },
            { question: "Does Durham Water Management approve the building permit?", answer: "No. It controls applicable utility service and connection requirements; the building authority separately reviews plumbing and building code." },
            { question: "Can an adaptive-reuse project reuse its old electrical service?", answer: "Only after capacity, condition, fault duty, metering, clearances, and new loads are evaluated. A new lab or healthcare use may require a different service strategy." },
          ],
          sources: [
            { label: "Durham City-County Inspections", url: "https://www.durhamnc.gov/484/Inspections" },
            { label: "Durham City-County Planning and Development", url: "https://www.durhamnc.gov/145/Planning" },
            { label: "Durham Unified Development Ordinance", url: "https://udo.durhamnc.gov/udo" },
            { label: "Durham Water Management", url: "https://www.durhamnc.gov/1008/Water-Management" },
            { label: "Duke Energy builders", url: "https://www.duke-energy.com/our-company/about-us/for-your-business/builders" },
            { label: "NC energy code", url: "https://www.ncosfm.gov/codes/code-enforcement/energy-conservation-code" },
          ],
        }),
        service({
          serviceSlug: "civil-engineering",
          title: "Durham Civil Engineering for Watershed-Sensitive Development",
          description:
            "Durham civil engineering for grading, stormwater, erosion control, utilities, and site permits, with watershed and urban-infill constraints addressed for local review.",
          h1: "Civil Engineering in Durham, NC",
          kicker: "Site design for research growth and watershed care",
          lede:
            "Durham development often fits new density into parcels with creeks, utilities, and limited storage. Civil design documents the real watershed, grading, utility, access, erosion, and maintenance obligations instead of treating stormwater as a final overlay.",
          permitAuthority:
            "Durham Planning and Durham City-County Inspections handle separate development and building tracks; North Carolina DEQ, Durham stormwater, Durham Water Management, fire, floodplain, and NCDOT may have separate authority. Confirm the applicable city, county, and state submission sequence.",
          codeContext:
            "Current North Carolina stormwater, erosion and sedimentation, stream-buffer, floodplain, zoning, watershed, access, and utility rules apply alongside Durham’s development standards. Thresholds and accepted practices should be checked against current ordinances and permit guidance.",
          localConditions:
            "Piedmont clay, rolling grades, intense rainfall, creek corridors, Falls Lake and Jordan Lake watershed concerns in the region, and dense infill create difficult drainage and utility geometry. Former industrial sites may include buried infrastructure and contaminated-soil considerations.",
          projectTypes:
            "Laboratory campuses, multifamily infill, downtown reuse, healthcare, office parks, industrial redevelopment, and neighborhood commercial sites are frequent Durham civil projects.",
          sections: [
            { heading: "Durham Planning sees infill storage before the footprint", body: "A dense Bull City site must reserve detention, conveyance, emergency overflow, access, and maintenance while meeting UDO, building, and fire setbacks. Planning and stormwater constraints should be tested before a City-County permit footprint is fixed." },
            { heading: "Buffers and creek corridors", body: "Mapped features and regulated buffers may affect disturbance, crossings, outfalls, and finished elevations. Field verification and current agency mapping should precede the grading plan." },
            { heading: "Utilities in former industry", body: "Abandoned lines, easements, private mains, and legacy fuel or process systems can complicate Durham redevelopment. Utility locating and records research belong in early due diligence." },
          ],
          permitSteps: [
            "Determine city-limit versus county jurisdiction, then obtain the survey, title and easement data, utility records, Durham Planning watershed mapping, and floodplain research.",
            "Use Durham Planning’s UDO and stormwater record to screen Falls Lake/Jordan watershed, stream-buffer, floodplain, NCDEQ erosion, NCDOT access, and fire triggers.",
            "Route grading and drainage to Durham stormwater, erosion phases to NCDEQ, and water/sewer profiles to Durham Water Management; retain utility easement and maintenance evidence.",
            "Track Planning, City-County Inspections, DEQ, stormwater, utility, campus, and floodplain comments before the civil PE issues the infill plan.",
          ],
          faqs: [
            { question: "What does Durham’s UDO review add to stormwater?", answer: "Planning and the UDO can affect buffers, impervious area, drainage, disturbance, storage, and outfalls before Inspections sees the building. Durham stormwater and NCDEQ remain separate technical tracks." },
            { question: "Can a downtown Durham parcel use a conventional pond?", answer: "Often the footprint is constrained, so underground or distributed controls may be explored. The AHJ must review soil, access, maintenance, overflow, and performance." },
            { question: "Does Durham site approval include utility approval?", answer: "No. Durham Water Management and other utilities maintain separate connection and capacity requirements." },
          ],
          sources: [
            { label: "Durham stormwater services", url: "https://www.durhamnc.gov/1009/Stormwater-Services" },
            { label: "Durham City-County Inspections", url: "https://www.durhamnc.gov/484/Inspections" },
            { label: "Durham City-County Planning and Development", url: "https://www.durhamnc.gov/145/Planning" },
            { label: "Durham Unified Development Ordinance", url: "https://udo.durhamnc.gov/udo" },
            { label: "NC DEQ stormwater", url: "https://www.deq.nc.gov/about/divisions/energy-mineral-land-resources/stormwater" },
            { label: "Durham Water Management", url: "https://www.durhamnc.gov/1008/Water-Management" },
          ],
        }),
        service({
          serviceSlug: "energy-compliance",
          title: "Durham Energy-Compliance Engineering for Research Buildings",
          description:
            "Durham energy-compliance engineering for laboratories, healthcare, offices, and adaptive reuse under North Carolina’s current energy-code route, with process loads clearly documented.",
          h1: "Energy Compliance in Durham, NC",
          kicker: "North Carolina code documentation for high-performance research",
          lede:
            "Durham’s research buildings can have energy profiles dominated by ventilation and process equipment. Compliance still follows the applicable North Carolina energy code and accepted AHJ path, with owner performance targets kept distinct.",
          permitAuthority:
            "Durham City-County Inspections receives the building permit while Durham Planning may control the associated development record and OSFM establishes the state code framework. Duke, university, healthcare, or owner standards and incentive programs can add requirements, but none automatically replaces Durham’s permit review.",
          codeContext:
            "Confirm the effective North Carolina Energy Conservation Code, alteration provisions, transition rules, and prescriptive or performance method. Laboratory process energy, envelope, lighting, HVAC, and controls should be labeled according to the adopted North Carolina framework.",
          localConditions:
            "Durham’s humid cooling season and pollen affect latent control, ventilation, filtration, and economizer decisions. Labs may operate continuously and require exhaust or pressure control that must be modeled and coordinated with actual process criteria.",
          projectTypes:
            "Life-science laboratories, clinical buildings, university facilities, office conversions, multifamily, retail, and historic industrial reuse are common.",
          sections: [
            { heading: "Durham’s permit model needs a lab process boundary", body: "Fume hoods, clean zones, refrigeration, and process equipment should be inventoried before the North Carolina form or model is selected. City-County Inspections needs regulated, excluded, and owner-driven loads identified." },
            { heading: "Air and moisture in the Triangle", body: "High outside-air rates can create humidity and reheat consequences. Envelope continuity, heat recovery where appropriate, controls, and commissioning assumptions should agree between calculations and MEP drawings." },
            { heading: "Owner standards are not code", body: "Duke or institutional energy targets can be more ambitious than code and may be worthwhile. Keep their metrics and verification separate from the permit forms so neither is overstated." },
          ],
          permitSteps: [
            "Use City-County Inspections for the Durham building record and Planning/UDO for associated development work, identifying the lab, healthcare, or reuse scope and state energy edition.",
            "Read envelope, lighting, exhaust, HVAC, process, controls, Duke demand, campus standard, and operating schedule information from the coordinated design.",
            "Tie the accepted state energy forms to architectural and MEP sheets, keeping Duke or university performance metrics separate from code evidence.",
            "Return comments through the Inspections record and retain approved substitutions, commissioning assumptions, and field verification with the Durham permit file.",
          ],
          faqs: [
            { question: "How does Durham separate a lab energy model from campus goals?", answer: "City-County Inspections reviews regulated systems, process boundary, exhaust, envelope, lighting, controls, schedules, and state forms; Duke or university performance goals are separately verified." },
            { question: "Are fume hoods automatically excluded from energy analysis?", answer: "Their treatment depends on the code path, process, controls, operating schedule, and applicable definitions. Document the basis rather than assuming an exclusion." },
            { question: "Can a university sustainability standard be used as the permit code?", answer: "It can be an additional owner requirement, but the permit still needs the applicable North Carolina documentation accepted by the AHJ." },
          ],
          sources: [
            { label: "Durham City-County Inspections", url: "https://www.durhamnc.gov/484/Inspections" },
            { label: "Durham City-County Planning and Development", url: "https://www.durhamnc.gov/145/Planning" },
            { label: "Durham Unified Development Ordinance", url: "https://udo.durhamnc.gov/udo" },
            { label: "NC OSFM energy code", url: "https://www.ncosfm.gov/codes/code-enforcement/energy-conservation-code" },
            { label: "Duke University sustainability", url: "https://sustainability.duke.edu/" },
            { label: "DOE North Carolina energy codes", url: "https://www.energycodes.gov/state-portal/north-carolina" },
          ],
        }),
        service({
          serviceSlug: "pe-stamped-drawings",
          title: "Durham PE-Stamped Drawings for Research and Infill Projects",
          description:
            "PE-stamped drawing coordination for Durham laboratories, healthcare, adaptive reuse, and infill sites, with responsible North Carolina licensure and agency boundaries confirmed per project.",
          h1: "PE-Stamped Drawings in Durham, NC",
          kicker: "Responsible design review for Bull City projects",
          lede:
            "Durham’s research and infill projects cross building, stormwater, utility, fire, and sometimes health review. A responsible PE seal follows independent evaluation of the actual design and does not promise approval, licensure coverage, or a particular timeline.",
          permitAuthority:
            "Durham City-County Inspections is the local building route, while Durham Planning handles applicable development and UDO matters; county, university, utility, fire, DEQ, and floodplain agencies may have distinct authority. The permit register should identify which documents each agency receives.",
          codeContext:
            "Current North Carolina codes, Durham development requirements, and Board of Examiners rules govern the drawing set. Verify code edition, laboratory or healthcare criteria, watershed and flood triggers, electronic seal rules, special inspections, and discipline responsibility.",
          localConditions:
            "Dense sites, lab equipment, older industrial shells, Piedmont soils, and stormwater constraints make coordinated backgrounds essential. A complete record may require survey, geotechnical work, field openings, utility correspondence, and owner process information.",
          projectTypes:
            "Research renovations, clinic work, apartment infill, rooftop systems, industrial reuse, campus utilities, and commercial correction sets commonly need PE review.",
          sections: [
            { heading: "Durham’s agency register supports independent judgment", body: "The responsible PE evaluates loads, code, constructability, existing conditions, equipment, and coordination across City-County Inspections, Planning, campus, stormwater, fire, and utility records. A client sketch is an input, not a design conclusion." },
            { heading: "Research agency boundaries", body: "Durham building review does not subsume university, health, fire, utility, stormwater, or state review. Clearly labeled sheets and a responsibility matrix reduce accidental overstatement of the seal." },
            { heading: "Comment and change control", body: "A sealed set remains a living project record through review and construction. The responsible professional evaluates corrections, delegated systems, substitutions, and field conditions before they are incorporated." },
          ],
          permitSteps: [
            "Name Durham City-County Inspections for building work and Durham Planning/UDO for development work, distinguishing city limits from county jurisdiction and campus or utility review.",
            "Build the NC PE record from survey, geotechnical, lab process, equipment, floodplain, utility, and owner criteria sufficient for independent judgment.",
            "Reconcile Durham City-County Inspections sheets with Planning, watershed, campus, fire, and utility responsibilities; the responsible PE seals only work within competence and responsibility.",
            "Route the building set to Durham City-County Inspections while tracking Planning, stormwater, campus, fire, and utility comments separately; the responsible PE reviews changes before issue.",
          ],
          faqs: [
            { question: "How should a Durham laboratory set divide agency responsibility?", answer: "Identify City-County Inspections, Planning, campus or health, fire, stormwater, utility, and state documents separately. The responsible PE seals only the defined engineering scope." },
            { question: "Can a Durham PE seal a lab set without a campus process brief?", answer: "The responsible PE decides whether available information supports independent judgment. Missing process, equipment, hazardous-material, or utility criteria may require investigation before the Inspections set is sealed." },
            { question: "Is PE licensure coverage automatic for every Durham project?", answer: "No. Responsible licensure, competence, scope, and any authorization are confirmed for the project under current Board rules." },
          ],
          sources: [
            { label: "NC Board of Examiners rules and licensure", url: "https://www.ncbels.org/general-info/rules-laws/" },
            { label: "Durham City-County Inspections", url: "https://www.durhamnc.gov/484/Inspections" },
            { label: "Durham City-County Planning and Development", url: "https://www.durhamnc.gov/145/Planning" },
            { label: "Durham Unified Development Ordinance", url: "https://udo.durhamnc.gov/udo" },
            { label: "Durham Water Management", url: "https://www.durhamnc.gov/1008/Water-Management" },
            { label: "NC building code", url: "https://www.ncosfm.gov/codes" },
          ],
        }),
      ],
    },
    {
      slug: "fayetteville",
      name: "Fayetteville",
      county: "Cumberland County",
      services: [
        service({
          serviceSlug: "structural-engineering",
          title: "Fayetteville Structural Engineering for Military and Industrial Projects",
          description:
            "Fayetteville structural engineering for military-adjacent, industrial, commercial, and residential work, addressing Cumberland County soils, wind, flood, and permit coordination.",
          h1: "Structural Engineering in Fayetteville, NC",
          kicker: "Structures for a military-connected market",
          lede:
            "Fayetteville’s projects range from Fort Liberty-area support facilities to retail, housing, and industrial work. Structural design considers actual existing conditions, sandy or variable soils, hurricane-influenced wind, and the local permit authority.",
          permitAuthority:
            "The City of Fayetteville Development Services Department handles city building permits, while Cumberland County and Fort Liberty have separate authorities and access requirements. Fire, floodplain, utility, and federal reviews may be independent of a city permit.",
          codeContext:
            "North Carolina’s statewide building code and amendments govern city and county building work, while federal installations can apply their own criteria and review chain. Confirm occupancy, wind, flood, special inspection, security, and current code edition for the specific owner and site.",
          localConditions:
            "The Sandhills bring sandy, variable soils, high summer heat, intense rainfall, and hurricane remnants; Cape Fear tributaries create floodplain concerns. Military and industrial projects can add blast, controlled-access, equipment, or continuity criteria defined by the owner.",
          projectTypes:
            "Military support facilities, warehouses, barracks-area commercial work, multifamily, schools, healthcare, retail, and industrial additions are typical.",
          sections: [
            { heading: "Fayetteville structural review separates Fort Liberty criteria", body: "Federal or defense-adjacent facilities may have security, progressive-collapse, blast, redundancy, or mission requirements beyond Fayetteville Development Services’ public permit code. The installation owner must issue those criteria separately." },
            { heading: "Sandhills foundations", body: "Sandy soils can drain readily but still vary with fill, groundwater, erosion, and local bearing conditions. Geotechnical recommendations and construction observation should inform footings, slabs, anchors, and site drainage." },
            { heading: "Wind and flood together", body: "Fayetteville is inland but exposed to strong winds and heavy rain from tropical systems. Roof attachments, openings, foundations, finished floors, and floodplain enclosures need coordinated review." },
          ],
          permitSteps: [
            "Read the address against Fayetteville Development Services, Cumberland County Planning and Inspections, or Fort Liberty’s federal authority before selecting the civilian or installation code path.",
            "Use Sandhills geotechnical data, flood information, owner security criteria, equipment reactions, and measured framing to establish the foundation and continuity assumptions.",
            "Carry blast or mission criteria, wind/flood details, special inspections, civil elevations, and city or federal sheet boundaries into the responsible drawing set.",
            "Keep Fayetteville, county, utility, fire, and installation comments separate; the responsible PE evaluates substitutions, access changes, and field discoveries before issue.",
          ],
          faqs: [
            { question: "Which permit record controls a Fort Liberty structural project?", answer: "Installation property can follow federal owner, security, and access procedures rather than Fayetteville Development Services. Establish the installation authority before using a municipal checklist." },
            { question: "Are Fayetteville sites always easy to found because of sand?", answer: "No. Fill, groundwater, density, erosion, and variable strata still require site-specific geotechnical evaluation." },
            { question: "Can a floodplain change a Fayetteville foundation?", answer: "Yes. Flood elevation, enclosure, utility, anchorage, and certification requirements may affect the structural and civil concept." },
          ],
          sources: [
            { label: "Fayetteville Development Services", url: "https://www.fayettevillenc.gov/government/city-departments/operations-services/development-services" },
            { label: "Cumberland County planning", url: "https://www.cumberlandcountync.gov/departments/planning-group/planning-and-inspections" },
            { label: "FEMA maps", url: "https://msc.fema.gov/portal/home" },
            { label: "NC codes", url: "https://www.ncosfm.gov/codes" },
          ],
        }),
        service({
          serviceSlug: "mep-engineering",
          title: "Fayetteville MEP Engineering for Defense Support and Community Growth",
          description:
            "Fayetteville MEP engineering for military-support, industrial, healthcare, multifamily, and retail projects, coordinated with city, county, owner, and utility requirements.",
          h1: "MEP Engineering in Fayetteville, NC",
          kicker: "Reliable systems for Sandhills operations",
          lede:
            "Fayetteville MEP projects may serve civilian occupants, industrial processes, or mission-sensitive owners. Design starts by identifying the actual authority, operating profile, utility service, emergency-power expectation, and North Carolina code path.",
          permitAuthority:
            "Fayetteville Development Services reviews city building work; Cumberland County and Fort Liberty have separate jurisdictions and procedures. PWC, Duke Energy Progress, fire, health, and federal owner reviewers may add independent requirements.",
          codeContext:
            "Current North Carolina mechanical, electrical, plumbing, fuel-gas, energy, accessibility, and fire requirements apply to municipal work. Federal or military work can layer UFC or owner criteria; the project team confirms which documents control rather than assuming city approval is sufficient.",
          localConditions:
            "Hot humid summers, winter heating, sandy soils, heavy rain, tropical-storm outages, and long utility runs influence HVAC, drainage, service, and backup power. Fayetteville PWC and Duke Energy service conditions should be documented early.",
          projectTypes:
            "Military-support offices, warehouses, barracks-adjacent work, clinics, schools, restaurants, multifamily, and industrial facilities are common MEP scopes.",
          sections: [
            { heading: "Fayetteville MEP work splits PWC, Duke, and mission review", body: "A mission-support building may need redundancy, secure communications, emergency power, or owner controls beyond municipal code. Separate Fort Liberty criteria from Fayetteville PWC, Duke Energy Progress, fire, and Development Services records." },
            { heading: "Heat, humidity, and outages", body: "Cooling and dehumidification, standby power, generator ventilation, fuel storage, and controls should reflect Fayetteville’s climate and tropical-storm risk. Equipment placement also needs flood and maintenance review." },
            { heading: "Service and water coordination", body: "PWC water and sewer, Duke electrical service, fire flow, backflow, and utility easements can affect the site and equipment rooms. Utility correspondence is part of early MEP due diligence." },
          ],
          permitSteps: [
            "Name Fayetteville Development Services, Cumberland County, or Fort Liberty’s design authority first; open PWC and Duke Energy Progress service discussions before the MEP layout.",
            "Translate the mission or civilian use into HVAC, ventilation, plumbing, electrical, fuel, lighting, emergency-power, process, and secure-controls loads.",
            "Show flood-elevated equipment, fire/security interfaces, energy evidence, PWC water/sewer, Duke service, and generator ventilation in the coordinated set.",
            "Track municipal, federal, PWC, Duke, fire, and health comments independently, sending substitutions and commissioning changes back through responsible review.",
          ],
          faqs: [
            { question: "Where do PWC and Duke fit in Fayetteville MEP review?", answer: "PWC controls applicable water/sewer service and Duke controls electric service, while Fayetteville or Cumberland County reviews building systems; Fort Liberty can impose a separate federal process." },
            { question: "Who provides Fayetteville electric service?", answer: "Service depends on the site and provider territory, commonly Fayetteville PWC or Duke Energy Progress. Confirm the address, service capacity, and utility requirements." },
            { question: "Does an emergency generator automatically satisfy continuity needs?", answer: "No. Load priority, fuel, transfer, ventilation, fire, emissions, security, and owner mission criteria must be designed and reviewed." },
          ],
          sources: [
            { label: "Fayetteville Development Services", url: "https://www.fayettevillenc.gov/government/city-departments/operations-services/development-services" },
            { label: "Fayetteville PWC development", url: "https://www.faypwc.com/development/" },
            { label: "Duke Energy Progress builders", url: "https://www.duke-energy.com/our-company/about-us/for-your-business/builders" },
            { label: "NC energy code", url: "https://www.ncosfm.gov/codes/code-enforcement/energy-conservation-code" },
          ],
        }),
        service({
          serviceSlug: "civil-engineering",
          title: "Fayetteville Civil Engineering for Sandhills Sites and Fort Liberty Support",
          description:
            "Fayetteville civil engineering for grading, drainage, erosion, utilities, access, and site permits, coordinated with City, Cumberland County, military, and North Carolina authorities.",
          h1: "Civil Engineering in Fayetteville, NC",
          kicker: "Sandhills grading and infrastructure with clear jurisdiction",
          lede:
            "Fayetteville civil work must distinguish a municipal parcel from Cumberland County or Fort Liberty land. Site plans address sandy soils, stormwater, military or NCDOT access, utilities, erosion, and the actual approval chain.",
          permitAuthority:
            "Fayetteville Development Services reviews city sites, Cumberland County handles county jurisdiction, and Fort Liberty controls its installation property. NC DEQ, PWC, NCDOT, fire, floodplain, and federal agencies can each have separate authority.",
          codeContext:
            "Apply current North Carolina stormwater, erosion, stream-buffer, floodplain, access, utility, and local development requirements, with federal or installation criteria where applicable. Confirm delegated review and permit thresholds for the parcel.",
          localConditions:
            "Sandy or disturbed soils, heat, intense thunderstorms, tropical-storm rainfall, flat-to-rolling terrain, and Cape Fear tributaries shape drainage and erosion control. Large secure sites may require controlled access, utility setbacks, and emergency routes.",
          projectTypes:
            "Military-support facilities, warehouses, subdivisions, multifamily, schools, retail, industrial yards, and roadway or utility extensions are common civil projects.",
          sections: [
            { heading: "Fayetteville grading starts with the installation boundary", body: "A concept near Fort Liberty can cross city, Cumberland County, installation, NCDOT, PWC, and NCDEQ boundaries. The civil permit matrix must precede grading so a Fayetteville drawing is not mistaken for federal site approval." },
            { heading: "Sandy soils still need erosion control", body: "Loose soils can move quickly during heavy rain even where infiltration is good. Phased clearing, stabilized access, inlet protection, slope treatment, and final stabilization should be designed for actual construction." },
            { heading: "Drainage and security geometry", body: "Secure perimeters, emergency access, gates, standoff, drainage easements, and utility routes can conflict on defense-adjacent sites. Civil and owner-security criteria should be coordinated before setting grades." },
          ],
          permitSteps: [
            "Run the parcel through Fayetteville Development Services or Cumberland County, then establish Fort Liberty, NCDOT, PWC, DEQ, floodplain, and security jurisdiction from the access plan.",
            "Use Sandhills soil tests and Cape Fear tributary mapping to screen NCDEQ erosion/stormwater, flood, stream-buffer, fire-flow, and installation drainage triggers.",
            "Route PWC water/sewer profiles, NCDOT encroachment, NCDEQ erosion, municipal stormwater, and federal security documents as distinct packages.",
            "Maintain the agency comment matrix through grading, secure access, emergency routes, and maintenance revisions before the civil PE releases the site plan.",
          ],
          faqs: [
            { question: "Which agency receives a site plan near Fort Liberty?", answer: "The address and property owner decide whether Fayetteville, Cumberland County, Fort Liberty, NCDOT, PWC, or NCDEQ receives the controlling package. Installation property commonly follows federal procedures." },
            { question: "Are sandy Fayetteville sites exempt from stormwater controls?", answer: "No. Infiltration and runoff must be evaluated under the applicable state and local rules; sandy soil does not remove permitting triggers." },
            { question: "Who approves access near a state road?", answer: "NCDOT may control driveway or encroachment work on its right-of-way, separate from city or county site approval." },
          ],
          sources: [
            { label: "Fayetteville Development Services", url: "https://www.fayettevillenc.gov/government/city-departments/operations-services/development-services" },
            { label: "Cumberland County planning and inspections", url: "https://www.cumberlandcountync.gov/departments/planning-group/planning-and-inspections" },
            { label: "Fayetteville PWC development", url: "https://www.faypwc.com/development/" },
            { label: "NC DEQ stormwater", url: "https://www.deq.nc.gov/about/divisions/energy-mineral-land-resources/stormwater" },
          ],
        }),
        service({
          serviceSlug: "energy-compliance",
          title: "Fayetteville Energy-Compliance Engineering for Heat, Humidity, and Mission Use",
          description:
            "Fayetteville energy-compliance engineering under North Carolina’s applicable code path for military-support, industrial, multifamily, healthcare, and commercial buildings.",
          h1: "Energy Compliance in Fayetteville, NC",
          kicker: "North Carolina code analysis for Sandhills buildings",
          lede:
            "Fayetteville energy compliance uses North Carolina requirements. The analysis must distinguish municipal code, federal or owner criteria, process loads, and the hot-humid operating conditions that shape real system performance.",
          permitAuthority:
            "Fayetteville Development Services receives city building permits; Cumberland County or Fort Liberty may control other locations. OSFM sets the state code framework, while utilities and federal owners can impose independent efficiency or resilience requirements.",
          codeContext:
            "Confirm the effective North Carolina Energy Conservation Code edition, existing-building rules, and accepted prescriptive or performance method with the AHJ. Federal projects may have additional energy criteria; do not represent those or a utility program as the municipal code route.",
          localConditions:
            "Fayetteville’s hot, humid summers, intense rain, tropical-storm outages, and long cooling season affect latent control, envelope, ventilation, generator operation, and peak demand. Sand and dust can also influence filtration and maintenance.",
          projectTypes:
            "Military-support offices, warehouses, barracks-adjacent work, schools, clinics, multifamily, retail, and industrial buildings are common.",
          sections: [
            { heading: "Fayetteville energy review separates code from mission resilience", body: "Air leakage, solar gain, roof insulation, outside air, condensate, and controls matter in the Sandhills. Development Services or the federal owner receives its own evidence; Duke incentive and resilience calculations are separate." },
            { heading: "Mission criteria are separate", body: "A federal owner may require resilience, energy security, or high-performance metrics beyond state code. Keep those criteria visible but separate from the city or county permit documentation." },
            { heading: "Process and warehouse loads", body: "High-bay doors, ventilation, compressors, refrigeration, and irregular military or industrial schedules can skew an ordinary model. Define the regulated building systems and process boundary with the owner." },
          ],
          permitSteps: [
            "Use Fayetteville Development Services for the municipal energy record, Cumberland County outside city limits, or the installation’s federal energy process for Fort Liberty work.",
            "Read hot-humid envelope, lighting, HVAC, generator, process, controls, Duke/PWC demand, and owner resilience criteria from the actual design.",
            "Tie North Carolina forms to architectural and MEP sheets while keeping federal mission metrics, Duke incentives, and resilience studies separate.",
            "Return energy corrections through the controlling city, county, or federal reviewer and preserve approved substitutions and field verification in that record.",
          ],
          faqs: [
            { question: "How does Fayetteville handle a federal energy target?", answer: "Fayetteville Development Services reviews the North Carolina code record for municipal work; Fort Liberty may apply federal owner criteria. Duke incentives and resilience studies do not replace either authority’s review." },
            { question: "Do military energy requirements replace North Carolina code?", answer: "They may supplement or govern federal design under the project’s authority, but the team must identify the actual controlling review chain rather than assume one route." },
            { question: "Does keeping an existing unit avoid analysis?", answer: "Not automatically. Alteration scope, controls, ventilation, lighting, envelope, and equipment replacement determine what must be documented." },
          ],
          sources: [
            { label: "Fayetteville Development Services", url: "https://www.fayettevillenc.gov/government/city-departments/operations-services/development-services" },
            { label: "NC OSFM energy code", url: "https://www.ncosfm.gov/codes/code-enforcement/energy-conservation-code" },
            { label: "DOE North Carolina portal", url: "https://www.energycodes.gov/state-portal/north-carolina" },
            { label: "Duke Energy Progress business", url: "https://www.duke-energy.com/business/products/smart-saver" },
          ],
        }),
        service({
          serviceSlug: "pe-stamped-drawings",
          title: "Fayetteville PE-Stamped Drawings for City, County, and Military Work",
          description:
            "Responsible North Carolina PE drawing coordination for Fayetteville commercial, industrial, and support projects, with city, county, utility, and federal boundaries distinguished.",
          h1: "PE-Stamped Drawings in Fayetteville, NC",
          kicker: "A project-specific seal, never an approval promise",
          lede:
            "Fayetteville’s jurisdiction can change from one parcel to the next, especially near Fort Liberty. The responsible PE verifies authority, criteria, existing information, and discipline scope before deciding whether a North Carolina seal is appropriate.",
          permitAuthority:
            "Fayetteville Development Services, Cumberland County, Fort Liberty, PWC, NCDOT, fire, DEQ, and federal owner reviewers may each control a piece of the work. A municipal submittal does not automatically satisfy installation or utility requirements.",
          codeContext:
            "Current North Carolina codes and NC Board rules apply to applicable civilian work; federal facilities can add UFC or owner criteria. Confirm code edition, security, flood, energy, special inspection, electronic seal, and responsibility requirements per project.",
          localConditions:
            "Military owner criteria, sandy soils, high heat, tropical-storm rain, utility corridors, and floodplain tributaries make complete backgrounds important. The drawing index should disclose what the PE has and has not reviewed.",
          projectTypes:
            "Military-support buildings, commercial fit-outs, industrial equipment, warehouses, multifamily, schools, site utilities, and corrective permit packages are common.",
          sections: [
            { heading: "Fayetteville’s permit register names the owner first", body: "The address and owner determine whether Development Services, Cumberland County, Fort Liberty, PWC, NCDOT, DEQ, or fire controls a document. Establish those responsibilities before preparing an NC PE seal block." },
            { heading: "Criteria and competence", body: "A PE needs owner criteria, site information, loads, equipment, code assumptions, and coordination sufficient for independent judgment. Federal or mission criteria should be provided directly by the responsible owner." },
            { heading: "Review through construction", body: "Comments, security changes, substitutions, and field discoveries can alter the sealed design. A controlled revision record keeps the responsible professional involved without promising approval or schedule." },
          ],
          permitSteps: [
            "Name Fayetteville Development Services, Cumberland County, Fort Liberty, PWC, NCDOT, and the owner’s security authority on the responsibility matrix before defining the NC PE scope.",
            "Build the professional record from Sandhills geotechnical and flood data, survey, equipment, security, utility, and owner criteria sufficient for independent evaluation.",
            "Reconcile Fayetteville Development Services sheets with Cumberland County, Fort Liberty, utility, and security criteria; the responsible PE seals only competent work within actual responsibility.",
            "Keep Fayetteville or Cumberland County comments separate from Fort Liberty, utility, fire, and owner-security reviews, and return substitutions or field changes to the responsible professional.",
          ],
          faqs: [
            { question: "What does a PE seal say on a Fort Liberty-adjacent set?", answer: "It communicates professional responsibility only for the defined, reviewed scope. Federal, security, utility, fire, county, and Fayetteville authorities independently decide their requirements." },
            { question: "Can a city permit seal cover county or utility work?", answer: "Not automatically. Each authority’s scope and document requirements must be confirmed." },
            { question: "Is North Carolina PE coverage promised for every Fayetteville job?", answer: "No. Responsible licensure, competence, authorization, and scope are confirmed per project under current Board rules." },
          ],
          sources: [
            { label: "NC Board of Examiners rules and licensure", url: "https://www.ncbels.org/general-info/rules-laws/" },
            { label: "Fayetteville Development Services", url: "https://www.fayettevillenc.gov/government/city-departments/operations-services/development-services" },
            { label: "Cumberland County inspections", url: "https://www.cumberlandcountync.gov/departments/planning-group/planning-and-inspections" },
            { label: "NC codes", url: "https://www.ncosfm.gov/codes" },
          ],
        }),
      ],
    },
    {
      slug: "wilmington",
      name: "Wilmington",
      county: "New Hanover County",
      services: [
        service({
          serviceSlug: "structural-engineering",
          title: "Wilmington Structural Engineering for Coastal Wind and Flood Exposure",
          description:
            "Wilmington structural engineering for coastal commercial, residential, marine, and renovation projects, addressing wind, flood, corrosion, soils, and New Hanover review.",
          h1: "Structural Engineering in Wilmington, NC",
          kicker: "Coastal structures designed around real exposure",
          lede:
            "Wilmington structures face hurricane wind, salt air, flood mapping, storm surge, high groundwater, and rapid growth. Structural design documents the coastal load path and the local permit conditions without assuming one generic beach detail fits every parcel.",
          permitAuthority:
            "The City of Wilmington Development Services Department reviews city building work; New Hanover County and coastal municipalities have separate authorities. Floodplain, CAMA, stormwater, fire, utility, and state coastal reviews may be independent.",
          codeContext:
            "North Carolina’s statewide building code and coastal wind and flood provisions apply with local review and any applicable CAMA or floodplain requirements. Verify wind speed, exposure, flood design elevation, enclosure, corrosion, special inspections, and code edition for the address.",
          localConditions:
            "Wilmington’s coastal hurricane exposure, storm surge, high groundwater, sandy soils, salt-laden air, and intense rainfall drive foundation, anchorage, enclosure, corrosion, and drainage choices. FEMA map panels and local flood information can materially affect finished-floor decisions.",
          projectTypes:
            "Coastal residential, restaurants, hotels, marine facilities, multifamily, office additions, retail, and industrial waterfront work are typical.",
          sections: [
            { heading: "Wilmington’s coastal permit record follows the wind path", body: "Roof coverings, diaphragms, connections, openings, foundations, equipment, and cladding all participate in coastal wind resistance. Wilmington or New Hanover County review should see edge zones, anchors, flood elevation, and corrosion-resistant components together." },
            { heading: "Flood elevation changes the structure", body: "A mapped flood zone can affect foundation type, enclosures, utilities, breakaway elements, and certification. Coordinate survey, floodplain staff, civil grades, and structural details before setting the finished floor." },
            { heading: "Coastal durability", body: "Salt air and wet-dry cycling accelerate corrosion at connectors, supports, fasteners, and exposed equipment. Material and inspection notes should match the exposure and maintenance plan." },
          ],
          permitSteps: [
            "Open Wilmington Development Services for a city parcel or New Hanover County’s planning/building route outside city limits; identify CAMA, floodplain, and coastal wind parameters before framing design.",
            "Use the elevation certificate, FEMA panel, geotechnical report, groundwater information, site observations, and equipment reactions to establish the coastal foundation record.",
            "Carry wind, flood, corrosion, breakaway/enclosure, special-inspection, and civil finished-floor details through the building set while CAMA and county reviews remain distinct.",
            "Answer city, county, CAMA, floodplain, and fire comments by sheet, returning corrosion products, elevation changes, and substitutions to the responsible PE.",
          ],
          faqs: [
            { question: "Which Wilmington reviewer uses the elevation certificate?", answer: "The local floodplain administrator uses elevation evidence for flood-related requirements, while Wilmington Development Services or New Hanover County reviews the building. CAMA and coastal agencies may have separate records." },
            { question: "Are coastal wind requirements only for beachfront buildings?", answer: "No. Inland Wilmington-area sites can still have significant hurricane wind design requirements. The address and current code determine the parameters." },
            { question: "How should salt exposure affect structural details?", answer: "Exposure affects connectors, fasteners, coatings, supports, inspections, and maintenance. The responsible design team should select materials based on actual location and exposure." },
          ],
          sources: [
            { label: "Wilmington Development Services", url: "https://www.wilmingtonnc.gov/departments/planning-development-services" },
            { label: "New Hanover County planning", url: "https://www.nhcgov.com/311/Planning-Land-Use" },
            { label: "NC coastal management", url: "https://www.deq.nc.gov/about/divisions/coastal-management" },
            { label: "FEMA flood maps", url: "https://msc.fema.gov/portal/home" },
          ],
        }),
        service({
          serviceSlug: "mep-engineering",
          title: "Wilmington MEP Engineering for Coastal Hospitality and Resilience",
          description:
            "Wilmington MEP engineering for hotels, restaurants, multifamily, marine, healthcare, and commercial projects, coordinated with coastal flood, utility, and permit conditions.",
          h1: "MEP Engineering in Wilmington, NC",
          kicker: "Coastal systems with flood and outage awareness",
          lede:
            "Wilmington MEP systems must keep humidity, corrosion, flood exposure, salt air, and outage resilience in view. Design coordinates the owner’s operating needs with city or county permits, CFPUA requirements, and utility service.",
          permitAuthority:
            "Wilmington Development Services handles city building permits; New Hanover County or another municipality controls other parcels. Cape Fear Public Utility Authority, Duke Energy Progress, fire, floodplain, health, and CAMA-related agencies may review separate aspects.",
          codeContext:
            "North Carolina mechanical, electrical, plumbing, energy, accessibility, flood, and fire requirements apply through the current code and amendments. Coastal flood elevations, equipment placement, emergency power, corrosion, and CAMA or utility conditions must be confirmed per site.",
          localConditions:
            "Hot humid air, salt aerosol, storm surge, high groundwater, heavy rain, and hurricane outages influence HVAC, condensate, controls, service, and equipment elevation. CFPUA water and sewer standards and Duke service availability should be checked early.",
          projectTypes:
            "Hotels, restaurants, beach-area multifamily, medical offices, marine buildings, retail, office, and resilience upgrades are common Wilmington MEP scopes.",
          sections: [
            { heading: "Wilmington MEP review pairs CFPUA and flood elevation", body: "Latent load, filtration, condensate, coil coatings, and equipment access matter in salt air. Pair CFPUA and Duke service correspondence with flood-elevated electrical, generator, and HVAC decisions in the city or county set." },
            { heading: "Elevating critical systems", body: "Flood design can affect electrical rooms, generators, controls, water heaters, pumps, and service entrances. Coordinate flood elevation, access, fire, and maintenance before architectural rooms are fixed." },
            { heading: "Storm resilience is not automatic", body: "Generators, transfer switches, fuel, communications, and refrigeration require an owner-defined continuity plan. A code-compliant service does not promise post-storm operation without a designed and maintained resilience strategy." },
          ],
          permitSteps: [
            "Use Wilmington Development Services or New Hanover County for the building route, then start CFPUA and Duke Energy Progress coordination with the floodplain and resilience criteria.",
            "Translate hotel, restaurant, marine, or multifamily schedules into latent HVAC, ventilation, plumbing, electrical, emergency-power, fuel, and corrosion-protection loads.",
            "Show elevated electrical rooms, generators, condensate, CFPUA connections, Duke service, fire protection, and energy evidence in the coastal permit set.",
            "Keep CFPUA, Duke, floodplain, fire, CAMA, and building comments in separate logs before responsible professionals approve field substitutions.",
          ],
          faqs: [
            { question: "How does CFPUA enter a Wilmington MEP workflow?", answer: "CFPUA controls applicable water and sewer service, tap, backflow, and capacity conditions; Wilmington or New Hanover County reviews plumbing and building code. Floodplain and CAMA review can remain separate." },
            { question: "Does coastal air change HVAC equipment selection?", answer: "It can affect corrosion protection, coil materials, filtration, controls, and maintenance. Actual exposure and manufacturer suitability should be evaluated." },
            { question: "Who handles water and sewer connections in Wilmington?", answer: "Cape Fear Public Utility Authority controls its service and connection requirements, while the building AHJ reviews plumbing code. Both tracks need coordination." },
          ],
          sources: [
            { label: "Wilmington Development Services", url: "https://www.wilmingtonnc.gov/departments/planning-development-services" },
            { label: "Cape Fear Public Utility Authority", url: "https://www.cfpua.org/" },
            { label: "Duke Energy Progress builders", url: "https://www.duke-energy.com/our-company/about-us/for-your-business/builders" },
            { label: "NC coastal management", url: "https://www.deq.nc.gov/about/divisions/coastal-management" },
          ],
        }),
        service({
          serviceSlug: "civil-engineering",
          title: "Wilmington Civil Engineering for Coastal Stormwater and CAMA Sites",
          description:
            "Wilmington civil engineering for grading, drainage, utilities, erosion, floodplain, and coastal site permits, coordinated with New Hanover County, CFPUA, and state agencies.",
          h1: "Civil Engineering in Wilmington, NC",
          kicker: "Coastal site plans built around water",
          lede:
            "Wilmington civil design is a water-management exercise: rainfall, groundwater, tide, floodplain, storm surge, sandy soils, and coastal permits all meet at the site plan. The engineer identifies each authority before committing to grading or outfalls.",
          permitAuthority:
            "The City of Wilmington reviews city development; New Hanover County and coastal towns have separate processes. NC DEQ, CAMA, CFPUA, FEMA floodplain administrators, NCDOT, and fire officials may each control a portion of the work.",
          codeContext:
            "Screen current North Carolina stormwater, erosion, floodplain, coastal, CAMA, stream or buffer, access, and utility requirements along with local development standards. Coastal thresholds and maps can change, so verify them at the project date.",
          localConditions:
            "Flat coastal terrain, sandy soils, high groundwater, tidal backwater, storm surge, intense rain, and limited outfall capacity constrain Wilmington sites. A pond concept may conflict with groundwater, flood elevation, maintenance access, or coastal buffers.",
          projectTypes:
            "Hotels, restaurants, multifamily, marine facilities, waterfront redevelopment, retail, schools, and industrial or port-adjacent sites are common civil assignments.",
          sections: [
            { heading: "Wilmington stormwater follows groundwater and CAMA screening", body: "Infiltration and underground storage need groundwater, soil, buoyancy, maintenance, and overflow analysis. NCDEQ, Wilmington or New Hanover County, CAMA, CFPUA, and floodplain records must be screened before assuming a sandy parcel can absorb runoff." },
            { heading: "Coastal permits are separate lanes", body: "CAMA, local development, DEQ stormwater, erosion, floodplain, and utility reviews can overlap without replacing one another. A permit matrix and current map screening help prevent an incomplete submission." },
            { heading: "Outfalls and tide", body: "Downstream tailwater, tidal influence, ownership, and capacity can control grades and storage. Confirm the receiving system and maintenance obligations before placing a building or parking field." },
          ],
          permitSteps: [
            "Run the waterfront address through Wilmington Planning and Development or New Hanover County, then identify CAMA, FEMA floodplain, CFPUA, NCDOT, and coastal-town jurisdiction.",
            "Use high-groundwater testing, tidal tailwater, sandy soils, and current coastal maps to screen NCDEQ stormwater/erosion, CAMA, buffers, access, and outfall triggers.",
            "Route CAMA, NCDEQ, local stormwater, CFPUA utility, NCDOT access, and floodplain evidence as separate packages with shared elevations.",
            "Maintain a coastal agency comment matrix through grading, emergency overflow, utility easements, and maintenance revisions before civil issue.",
          ],
          faqs: [
            { question: "What sequence applies to a Wilmington waterfront outfall?", answer: "Screen Wilmington or county development, NCDEQ stormwater/erosion, CAMA, floodplain, CFPUA, and any NCDOT or fire conditions. Each authority decides its own trigger and acceptance." },
            { question: "Can infiltration solve Wilmington stormwater?", answer: "High groundwater, flood elevation, soils, groundwater protection, and maintenance may limit it. Site-specific testing and AHJ acceptance are required." },
            { question: "Does CFPUA approve site drainage?", answer: "CFPUA controls its water and sewer service; local stormwater and state agencies control drainage and environmental review. They are separate approvals." },
          ],
          sources: [
            { label: "Wilmington planning and development", url: "https://www.wilmingtonnc.gov/departments/planning-development-services" },
            { label: "NC Coastal Management", url: "https://www.deq.nc.gov/about/divisions/coastal-management" },
            { label: "NC DEQ stormwater", url: "https://www.deq.nc.gov/about/divisions/energy-mineral-land-resources/stormwater" },
            { label: "CFPUA development", url: "https://www.cfpua.org/" },
          ],
        }),
        service({
          serviceSlug: "energy-compliance",
          title: "Wilmington Energy-Compliance Engineering for Coastal Buildings",
          description:
            "Energy-compliance engineering for Wilmington hotels, multifamily, restaurants, offices, and renovations using North Carolina’s applicable route and coastal humidity realities.",
          h1: "Energy Compliance in Wilmington, NC",
          kicker: "North Carolina energy code for hot-humid coastal buildings",
          lede:
            "Wilmington energy compliance follows North Carolina’s applicable energy code. Envelope, humidity control, lighting, HVAC, controls, coastal corrosion, and flood-elevated equipment must be documented for the actual local permit scope.",
          permitAuthority:
            "Wilmington Development Services receives city building permits while OSFM establishes the state energy framework. New Hanover County, owner standards, Duke incentives, and resilience goals can impose additional requirements but do not replace the building-code determination.",
          codeContext:
            "Verify the effective North Carolina Energy Conservation Code edition, alteration rules, and accepted prescriptive or performance path. Use North Carolina forms and terminology, and confirm any coastal or flood-related equipment implications with the local AHJ.",
          localConditions:
            "Wilmington’s long cooling season, high humidity, salt air, high groundwater, and storm exposure affect latent loads, air sealing, corrosion, condensate, and equipment location. Annual energy analysis should reflect actual hospitality or residential schedules.",
          projectTypes:
            "Hotels, vacation and multifamily buildings, restaurants, marine offices, retail, healthcare, and adaptive-reuse projects commonly need energy documentation.",
          sections: [
            { heading: "Wilmington energy forms must reflect coastal equipment", body: "Envelope leakage, ventilation, coil selection, reheat, controls, condensate, and flood-elevated distribution affect coastal performance. Wilmington Development Services or New Hanover County needs inputs that match the MEP sequence." },
            { heading: "Flood and efficiency coordination", body: "Elevating equipment may change distribution length, pumping energy, service space, and controls. Flood resilience should be evaluated alongside—not hidden inside—the energy compliance narrative." },
            { heading: "Hospitality schedules matter", body: "Hotels and restaurants have different occupancy, kitchen, laundry, domestic hot-water, and ventilation profiles from offices. Use actual operating assumptions and identify process energy separately." },
          ],
          permitSteps: [
            "Use Wilmington Development Services or New Hanover County’s permit record to classify hotel, restaurant, multifamily, marine, or alteration scope and the current state energy edition.",
            "Read coastal envelope, lighting, HVAC, hot-water, kitchen process, controls, flood elevation, CFPUA, and Duke demand assumptions from coordinated sheets.",
            "Tie North Carolina compliance forms to the MEP and architectural record while keeping resilience, CAMA, and utility incentive evidence separate.",
            "Return energy corrections through the city or county reviewer and preserve flood-related equipment substitutions and field verification with the permit file.",
          ],
          faqs: [
            { question: "Where do coastal resilience targets sit in Wilmington energy review?", answer: "The city or county reviews the North Carolina energy record; floodplain, CAMA, CFPUA, Duke, and owner resilience targets may add separate conditions. Keep those calculations labeled by authority." },
            { question: "Do flood-elevated systems change the energy analysis?", answer: "They can change distribution, pumps, controls, and equipment selections. The impact should be included where it affects regulated systems." },
            { question: "Are hotel kitchen loads treated like office loads?", answer: "No. Kitchen ventilation, refrigeration, hot water, and schedules require a use-specific analysis and may involve process-energy boundaries." },
          ],
          sources: [
            { label: "Wilmington Development Services", url: "https://www.wilmingtonnc.gov/departments/planning-development-services" },
            { label: "NC OSFM energy code", url: "https://www.ncosfm.gov/codes/code-enforcement/energy-conservation-code" },
            { label: "Duke Energy business efficiency", url: "https://www.duke-energy.com/business/products/smart-saver" },
            { label: "DOE North Carolina energy codes", url: "https://www.energycodes.gov/state-portal/north-carolina" },
          ],
        }),
        service({
          serviceSlug: "pe-stamped-drawings",
          title: "Wilmington PE-Stamped Drawings for Coastal Permit Work",
          description:
            "Responsible North Carolina PE drawing coordination for Wilmington coastal, floodplain, commercial, marine, and renovation projects, with agency boundaries made explicit.",
          h1: "PE-Stamped Drawings in Wilmington, NC",
          kicker: "Coastal professional review without approval promises",
          lede:
            "Wilmington permit drawings must account for local jurisdiction, flood and coastal requirements, and the real condition of the site or building. The responsible PE independently evaluates the work before deciding what can be sealed.",
          permitAuthority:
            "Wilmington Development Services, New Hanover County, CAMA, DEQ, CFPUA, floodplain staff, NCDOT, fire officials, and utilities may each review different documents. A PE seal is not a substitute for any separate approval.",
          codeContext:
            "Current North Carolina codes, coastal and flood requirements, local development rules, and NC Board standards govern applicable sealed work. Confirm wind, flood, corrosion, energy, CAMA, electronic-seal, and special-inspection requirements per project.",
          localConditions:
            "Salt air, hurricane wind, surge, high groundwater, sandy soils, and tidal drainage make Wilmington backgrounds unusually important. Survey, elevation, geotechnical, utility, and coastal map evidence should be assembled before final review.",
          projectTypes:
            "Waterfront renovations, hotels, multifamily, restaurants, marine structures, rooftop systems, commercial additions, and site utility packages commonly need PE coordination.",
          sections: [
            { heading: "Wilmington sealing requires the coastal agency register", body: "Wind parameters, flood elevations, survey, soils, corrosion, anchorage, and utility elevations should support the NC PE’s judgment. Wilmington, New Hanover County, CAMA, floodplain, CFPUA, and NCDOT documents must not be collapsed into one seal." },
            { heading: "Agencies remain independent", body: "CAMA, floodplain, DEQ, CFPUA, city, county, fire, and NCDOT review different questions. The permit register should state which signed documents address which authority." },
            { heading: "Construction changes in a storm-prone market", body: "Substitutions, elevation changes, corrosion products, and field discoveries can alter the design. The responsible PE should evaluate them before revised or as-built documents are issued." },
          ],
          permitSteps: [
            "Name Wilmington Development Services or New Hanover County on the cover sheet, then distinguish CAMA, floodplain, CFPUA, NCDOT, fire, and NC PE responsibilities.",
            "Build the professional record from elevation, geotechnical, coastal map, corrosion, utility, equipment, and owner information sufficient for independent evaluation.",
            "Reconcile Wilmington Development Services sheets with New Hanover County, CAMA, floodplain, CFPUA, and NCDOT responsibilities; the responsible PE seals only competent work within professional responsibility.",
            "Track Wilmington, New Hanover County, CAMA, floodplain, utility, and NCDOT comments separately, then route coastal substitutions and field changes through responsible review.",
          ],
          faqs: [
            { question: "What does a Wilmington PE seal not cover?", answer: "It does not substitute for CAMA, floodplain, CFPUA, NCDOT, fire, city, county, or DEQ decisions. It communicates responsibility only for the reviewed engineering scope." },
            { question: "Can a PE stamp drawings before the flood elevation is confirmed?", answer: "The responsible PE decides whether the available information supports design judgment; an unresolved elevation can materially change the design and require further information." },
            { question: "Does this page promise North Carolina licensure coverage?", answer: "No. Responsible PE licensure, scope, competence, and any required authorization are confirmed per project under current Board rules." },
          ],
          sources: [
            { label: "NC Board of Examiners rules and licensure", url: "https://www.ncbels.org/general-info/rules-laws/" },
            { label: "Wilmington Development Services", url: "https://www.wilmingtonnc.gov/departments/planning-development-services" },
            { label: "NC Coastal Management", url: "https://www.deq.nc.gov/about/divisions/coastal-management" },
            { label: "New Hanover County planning", url: "https://www.nhcgov.com/311/Planning-Land-Use" },
          ],
        }),
      ],
    },
    {
      slug: "asheville",
      name: "Asheville",
      county: "Buncombe County",
      services: [
        service({
          serviceSlug: "structural-engineering",
          title: "Asheville Structural Engineering for Mountain Slopes and Reuse",
          description:
            "Asheville structural engineering for steep sites, adaptive reuse, multifamily, hospitality, and commercial additions, addressing mountain soils, rainfall, wind, and local review.",
          h1: "Structural Engineering in Asheville, NC",
          kicker: "Mountain structures grounded in site reality",
          lede:
            "Asheville projects contend with steep grades, rock, retaining, intense rainfall, landslide concerns, and older downtown buildings. Structural engineering connects geotechnical and survey evidence to the City of Asheville or Buncombe County permit route.",
          permitAuthority:
            "The City of Asheville Development Services Department reviews city building and development work; Buncombe County and mountain municipalities have separate jurisdictions. Floodplain, stormwater, erosion, fire, steep-slope, and utility reviews may be separate.",
          codeContext:
            "North Carolina’s statewide building code and amendments govern, with local steep-slope, floodplain, zoning, historic, and development rules affecting the project. Confirm occupancy, construction type, wind, seismic, foundation, retaining, and current code edition.",
          localConditions:
            "Blue Ridge topography creates steep cuts, shallow rock, variable residual soils, high rainfall, creek floodplains, and localized landslide or debris-flow risk. Snow is generally modest in the city but mountain elevation can affect roof and access assumptions on regional sites.",
          projectTypes:
            "Hotels, breweries and adaptive reuse, hillside multifamily, healthcare, mountain cabins, commercial additions, retaining work, and institutional projects are common.",
          sections: [
            { heading: "Asheville Development Services needs the slope record first", body: "A building foundation can interact with cut slopes, retaining walls, groundwater, and neighboring property. City or Buncombe County review should receive geotechnical, drainage, access, and temporary-support evidence before a footing detail is fixed." },
            { heading: "Rain and mountain drainage", body: "Short, intense storms can saturate fills and erode exposed slopes. Foundation drains, wall waterproofing, roof discharge, and civil outfalls need a continuous path away from the structure." },
            { heading: "Downtown reuse", body: "Asheville’s older masonry, timber, and industrial buildings often contain undocumented changes. Measured investigation and careful connection details support new occupancy without hiding uncertainty." },
          ],
          permitSteps: [
            "Open Asheville Development Services for a city parcel or Buncombe County’s planning/building route outside city limits; identify steep-slope, floodplain, historic, and municipal boundaries before structural review.",
            "Use slope survey, rock and groundwater observations, geotechnical recommendations, drainage information, and measured downtown framing to set foundation assumptions.",
            "Carry retaining, lateral, snow-at-elevation, special-inspection, civil-grade, and historic-interface details through the local electronic plan record.",
            "Answer Asheville or county comments by detail and geotechnical assumption, returning rock, shoring, roof, or field changes to the responsible PE.",
          ],
          faqs: [
            { question: "What does Asheville review on a hillside foundation?", answer: "The city or county may need slope, geotechnical, drainage, retaining, flood, and access information; the exact trigger depends on site and ordinance. A steep or disturbed parcel commonly needs geotechnical input." },
            { question: "Does Asheville snow govern every roof?", answer: "Snow parameters vary with location and elevation; the current code and site should determine design values rather than a citywide assumption." },
            { question: "Can a retaining wall be designed separately from a building?", answer: "It may be separately permitted, but wall movement, drainage, surcharge, access, and foundation interaction should be coordinated." },
          ],
          sources: [
            { label: "Asheville Development Services", url: "https://www.ashevillenc.gov/department/development-services/permit/" },
            { label: "Buncombe County planning", url: "https://www.buncombecounty.org/governing/departments/planning/" },
            { label: "NC codes", url: "https://www.ncosfm.gov/codes" },
            { label: "FEMA maps", url: "https://msc.fema.gov/portal/home" },
          ],
        }),
        service({
          serviceSlug: "mep-engineering",
          title: "Asheville MEP Engineering for Hospitality, Brewing, and Mountain Sites",
          description:
            "Asheville MEP engineering for hotels, breweries, healthcare, adaptive reuse, multifamily, and mountain commercial projects, coordinated with local utility and permit authorities.",
          h1: "MEP Engineering in Asheville, NC",
          kicker: "Efficient, maintainable systems for mountain buildings",
          lede:
            "Asheville MEP systems must fit steep sites, older shells, hospitality schedules, and process uses such as brewing and food service. Design starts with field conditions and the City or county review path, not an inland generic equipment schedule.",
          permitAuthority:
            "Asheville Development Services reviews city building work; Buncombe County and other municipalities have separate processes. Asheville Water, Duke Energy, MSD, fire, health, floodplain, and environmental agencies may control separate system or utility conditions.",
          codeContext:
            "Current North Carolina mechanical, plumbing, electrical, energy, accessibility, fuel-gas, and fire provisions apply. Brewing, kitchens, medical uses, emergency power, compressed gases, and steep-site utility work need specific AHJ coordination.",
          localConditions:
            "Mountain rain, humidity, winter temperature swings, elevation, limited mechanical space, and variable utility pressure affect HVAC, condensate, ventilation, and plumbing. Downtown reuse can constrain shafts, duct routes, and equipment access.",
          projectTypes:
            "Hotels, breweries, restaurants, clinics, mountain multifamily, arts venues, adaptive reuse, and small industrial facilities are recurring MEP scopes.",
          sections: [
            { heading: "Asheville brewery MEP work crosses MSD and building review", body: "Steam, hot water, refrigeration, CO2, makeup air, drains, exhaust, and wastewater can dominate a brewery. Asheville Development Services, MSD, Water Resources, health, and fire criteria should be mapped before selecting systems." },
            { heading: "Mountain access affects equipment", body: "Rooftop units, generators, fuel, and replacement paths are harder on steep parcels and older buildings. Service clearances, crane access, roof structure, and utility routing belong in early coordination." },
            { heading: "Comfort across elevation", body: "Shoulder seasons and rapid weather changes make controls, ventilation, humidity, and zoning important for Asheville hospitality buildings. A simple oversized unit can create comfort and condensate problems." },
          ],
          permitSteps: [
            "Use Asheville Development Services or Buncombe County for the building route, then open Asheville Water, MSD, Duke Energy, fire, health, flood, and environmental tracks for the address.",
            "Translate brewery, kitchen, hotel, clinic, or reuse operations into HVAC, ventilation, CO2, hot-water, gas, wastewater, lighting, emergency-power, and controls loads.",
            "Show steep-site access, shafts, equipment anchorage, energy evidence, Asheville Water/MSD connections, Duke service, and fire interfaces together.",
            "Keep city, county, MSD, utility, health, and fire comments distinct; route equipment substitutions and commissioning changes through the responsible designer.",
          ],
          faqs: [
            { question: "Who reviews an Asheville brewery’s wastewater and MEP scope?", answer: "MSD controls applicable wastewater requirements, Asheville Water Resources handles public service, and Development Services reviews building plumbing and systems; health and fire agencies may add process criteria." },
            { question: "Does elevation change Asheville HVAC design?", answer: "It can affect equipment performance, combustion, ventilation, controls, and weather assumptions. Confirm manufacturer and code requirements for the actual elevation." },
            { question: "Who reviews sewer discharge from a brewery?", answer: "The applicable wastewater utility or MSD controls discharge requirements, while the building AHJ reviews plumbing code. Coordinate both with the process owner." },
          ],
          sources: [
            { label: "Asheville Development Services", url: "https://www.ashevillenc.gov/department/development-services/permit/" },
            { label: "Asheville Water Resources", url: "https://www.ashevillenc.gov/department/water-resources/" },
            { label: "Metropolitan Sewerage District of Buncombe County (official)", url: "https://www.msdbc.org/" },
            { label: "NC energy code", url: "https://www.ncosfm.gov/codes/code-enforcement/energy-conservation-code" },
          ],
        }),
        service({
          serviceSlug: "civil-engineering",
          title: "Asheville Civil Engineering for Mountain Grading and Stormwater",
          description:
            "Asheville civil engineering for steep-site grading, drainage, erosion, utilities, retaining, and floodplain work, coordinated with city, Buncombe County, and North Carolina agencies.",
          h1: "Civil Engineering in Asheville, NC",
          kicker: "Mountain site plans that manage slope and water",
          lede:
            "Asheville civil design is inseparable from slope, drainage, access, and constructability. The plan identifies the actual city, county, utility, flood, and state authorities before grading or outfall assumptions become commitments.",
          permitAuthority:
            "Asheville Development Services reviews city development; Buncombe County and surrounding municipalities have separate authorities. NC DEQ, Asheville stormwater, MSD, NCDOT, FEMA floodplain staff, and fire officials can each control part of a site.",
          codeContext:
            "Current North Carolina erosion, stormwater, stream-buffer, floodplain, steep-slope, access, and utility rules apply along with local ordinances and watershed requirements. Confirm thresholds, delegated review, and current map information for the parcel.",
          localConditions:
            "Steep slopes, shallow rock, high rainfall, saturated fills, narrow roads, creek corridors, and landslide or debris-flow concerns shape Asheville site design. Retaining, emergency access, erosion phasing, and maintenance may govern the layout.",
          projectTypes:
            "Hotels, hillside multifamily, breweries, medical campuses, mountain homes, commercial additions, trail or park improvements, and utility extensions are common.",
          sections: [
            { heading: "Asheville grading follows slope, DEQ, and NCDOT lanes", body: "Moving soil on a steep site changes wall loads, drainage, access, and stability. Asheville or Buncombe County, NCDEQ, NCDOT, MSD, and floodplain reviewers should see alternatives before grading is committed." },
            { heading: "Erosion through intense storms", body: "Mountain rainfall can overwhelm a weak construction sequence. Diversions, slope stabilization, check structures, stabilized access, and final drainage should be shown in phases a contractor can execute." },
            { heading: "Creek and floodplain interfaces", body: "A creek crossing or outfall can invoke floodplain, buffer, stream, and utility review. Field verification and current agency mapping matter where topography changes quickly." },
          ],
          permitSteps: [
            "Run the slope address through Asheville Development Services or Buncombe County, then map NCDOT, MSD, Asheville stormwater, floodplain, fire, and utility authority.",
            "Use geotechnical slope data, rock/groundwater observations, creek mapping, and topography to screen NCDEQ erosion/stormwater, buffers, steep-slope, and flood triggers.",
            "Route erosion material to NCDEQ, drainage to Asheville or county stormwater, water/sewer to Asheville Water or MSD, and driveway work to NCDOT as separate packages.",
            "Track mountain-agency comments through retaining, emergency access, overflow, stabilization, and maintenance revisions before the civil PE releases grading.",
          ],
          faqs: [
            { question: "Which Asheville agencies review steep-site drainage?", answer: "Local development and stormwater staff, NCDEQ erosion/stormwater, NCDOT access, MSD or Water Resources, floodplain staff, and fire officials can have separate triggers. The site-specific solution needs their applicable acceptance." },
            { question: "Does Asheville grading automatically include landslide review?", answer: "The slope, disturbance, local ordinance, geotechnical conditions, and project type determine requirements. Screen early rather than assuming either review or exemption." },
            { question: "Who controls a driveway on a mountain state road?", answer: "NCDOT may control access on its right-of-way, separately from city or county development approval." },
          ],
          sources: [
            { label: "Asheville Development Services", url: "https://www.ashevillenc.gov/department/development-services/permit/" },
            { label: "Buncombe County planning", url: "https://www.buncombecounty.org/governing/departments/planning/" },
            { label: "NC DEQ stormwater", url: "https://www.deq.nc.gov/about/divisions/energy-mineral-land-resources/stormwater" },
            { label: "Asheville stormwater", url: "https://www.ashevillenc.gov/department/stormwater-services/" },
          ],
        }),
        service({
          serviceSlug: "energy-compliance",
          title: "Asheville Energy-Compliance Engineering for Mountain Hospitality",
          description:
            "Asheville energy-compliance engineering for hotels, breweries, multifamily, offices, and reuse under North Carolina’s applicable energy code, with elevation and climate conditions addressed.",
          h1: "Energy Compliance in Asheville, NC",
          kicker: "North Carolina energy code for mountain comfort",
          lede:
            "Asheville energy compliance follows North Carolina requirements. Mountain temperature swings, humidity, hospitality schedules, reused envelopes, and equipment access all belong in a project-specific code record.",
          permitAuthority:
            "Asheville Development Services receives city building permits while OSFM establishes the state energy framework. Buncombe County, owner sustainability targets, Duke programs, and utility requirements can add separate conditions.",
          codeContext:
            "Verify the effective North Carolina Energy Conservation Code edition, climate or elevation assumptions, alteration provisions, and accepted prescriptive or performance route. Use the North Carolina compliance materials and confirm local review expectations.",
          localConditions:
            "Asheville’s elevation, cool nights, humid summers, winter heating, shoulder seasons, steep roofs, and older masonry affect envelope, heat pumps, ventilation, controls, and moisture. Hospitality and brewery process loads can run beyond ordinary schedules.",
          projectTypes:
            "Hotels, restaurants, breweries, multifamily, arts buildings, mountain offices, healthcare, and adaptive reuse are common energy scopes.",
          sections: [
            { heading: "Asheville energy review follows elevation and use", body: "Insulation, air control, vapor strategy, glazing, heat pumps, ventilation, and moisture need mountain assumptions. Development Services or Buncombe County should see a North Carolina energy record tied to the actual hotel, brewery, or reuse use." },
            { heading: "Hospitality operating schedules", body: "Guest rooms, kitchens, laundry, common spaces, and unoccupied periods create diverse loads. The compliance assumptions should match controls and equipment schedules that operators can maintain." },
            { heading: "Process energy belongs in the boundary map", body: "Brewing, refrigeration, kitchen exhaust, and hot water may dominate owner energy use. Identify regulated systems and process loads clearly, then keep incentives or owner targets separate from code claims." },
          ],
          permitSteps: [
            "Use Asheville Development Services or Buncombe County’s permit record to classify hotel, brewery, multifamily, office, or reuse scope and confirm the state energy edition.",
            "Read elevation, mountain envelope, lighting, heat-pump, process, hot-water, controls, Duke demand, and operating schedules from coordinated drawings.",
            "Tie North Carolina compliance forms to assemblies and equipment while keeping Duke incentives, owner targets, and brewery process studies separate.",
            "Return energy corrections through the city or county reviewer and preserve approved substitutions, commissioning assumptions, and field verification in the permit file.",
          ],
          faqs: [
            { question: "How does Asheville handle Duke efficiency goals in a permit?", answer: "Development Services or Buncombe County reviews the North Carolina energy forms; Duke programs and owner goals are separate evidence. Assemblies, equipment, controls, and elevation assumptions should remain coordinated." },
            { question: "Why do mountain temperature swings matter?", answer: "They influence heat-pump performance, controls, ventilation, condensation, and operating schedules. The design assumptions should reflect site elevation and actual systems." },
            { question: "Can brewery energy use be ignored as process load?", answer: "Not without analysis. The code path and definitions determine treatment; owner energy planning should still account for the real process." },
          ],
          sources: [
            { label: "Asheville permits", url: "https://www.ashevillenc.gov/department/development-services/permit/" },
            { label: "NC OSFM energy code", url: "https://www.ncosfm.gov/codes/code-enforcement/energy-conservation-code" },
            { label: "DOE North Carolina energy codes", url: "https://www.energycodes.gov/state-portal/north-carolina" },
            { label: "Duke Energy business efficiency", url: "https://www.duke-energy.com/business/products/smart-saver" },
          ],
        }),
        service({
          serviceSlug: "pe-stamped-drawings",
          title: "Asheville PE-Stamped Drawings for Slopes, Reuse, and Hospitality",
          description:
            "Responsible North Carolina PE drawing coordination for Asheville mountain, hospitality, brewery, adaptive-reuse, and commercial work, with slope and permit boundaries identified.",
          h1: "PE-Stamped Drawings in Asheville, NC",
          kicker: "Professional responsibility for mountain construction",
          lede:
            "A mountain project needs more than a seal block: survey, geotechnical, drainage, access, existing conditions, and agency boundaries must support the responsible PE’s independent judgment. Licensure, scope, and AHJ requirements are confirmed per project.",
          permitAuthority:
            "Asheville Development Services, Buncombe County, NC DEQ, NCDOT, MSD, utilities, floodplain, fire, and neighboring municipalities may review different aspects. A city permit package is not a promise of county, state, utility, or environmental approval.",
          codeContext:
            "Current North Carolina codes, local steep-slope and floodplain rules, energy provisions, and NC Board requirements govern applicable sealed work. Verify geotechnical, retaining, stormwater, historic, electronic-seal, and special-inspection criteria for the actual site.",
          localConditions:
            "Steep grades, shallow rock, high rainfall, saturated fills, historic masonry, constrained access, and mountain weather make reliable backgrounds essential. Field investigation and geotechnical coordination can be prerequisites to a responsible seal.",
          projectTypes:
            "Hotels, breweries, hillside apartments, retaining and foundation work, adaptive reuse, medical facilities, commercial additions, and utility improvements commonly require PE review.",
          sections: [
            { heading: "Asheville’s PE register follows the mountain agencies", body: "The NC PE needs survey, geotechnical recommendations, drainage, retaining interaction, access, foundation information, and the city/county, DEQ, MSD, NCDOT, and fire boundaries to evaluate a mountain design." },
            { heading: "Reuse and historic constraints", body: "Older Asheville buildings may require measured investigation and coordination with preservation or owner criteria. The sealed scope should distinguish verified existing work from assumptions requiring field confirmation." },
            { heading: "Changes under mountain conditions", body: "Contractor discoveries, rock, groundwater, substitutions, and access changes can materially alter design. The responsible professional evaluates revisions before they are represented as part of the sealed work." },
          ],
          permitSteps: [
            "Name Asheville Development Services or Buncombe County on the cover sheet, then distinguish steep-slope, DEQ, MSD, NCDOT, flood, fire, utility, and NC PE responsibilities.",
            "Build the professional record from slope survey, geotechnical recommendations, rock/groundwater data, drainage, equipment, utility, and owner criteria sufficient for independent evaluation.",
            "Reconcile Asheville Development Services sheets with Buncombe County, steep-slope, DEQ, MSD, fire, and utility responsibilities; the responsible PE seals only competent work within actual professional responsibility.",
            "Track Asheville, Buncombe County, DEQ, MSD, fire, and utility comments separately, then route rock, groundwater, slope, substitution, and field changes through professional review.",
          ],
          faqs: [
            { question: "What does an Asheville PE seal say about a steep slope?", answer: "It communicates responsibility only for the defined engineering scope after review; Development Services, Buncombe County, DEQ, NCDOT, MSD, utility, and fire authorities independently decide their requirements." },
            { question: "Can a PE seal a mountain foundation without geotechnical information?", answer: "The responsible PE decides whether the available information permits independent judgment. Steep, filled, or rocky sites may require geotechnical investigation before sealing." },
            { question: "Does this service promise North Carolina stamping coverage?", answer: "No. Responsible licensure, competence, scope, and authorization are confirmed for each project under current Board rules." },
          ],
          sources: [
            { label: "NC Board of Examiners rules and licensure", url: "https://www.ncbels.org/general-info/rules-laws/" },
            { label: "Asheville Development Services", url: "https://www.ashevillenc.gov/department/development-services/permit/" },
            { label: "Buncombe County planning", url: "https://www.buncombecounty.org/governing/departments/planning/" },
            { label: "NC codes", url: "https://www.ncosfm.gov/codes" },
          ],
        }),
      ],
    },
  ],
};

export default northCarolinaBatch2;