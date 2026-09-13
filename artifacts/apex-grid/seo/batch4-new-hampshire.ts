import type { Batch2StateExpansion } from "./batch2-core-service-types";

const newHampshireBatch4: Batch2StateExpansion = {
  stateSlug: "new-hampshire",
  stateName: "New Hampshire",
  stateAbbrev: "NH",
  hub: {
    title: "New Hampshire Engineering for Local Permit Review",
    description: "Site-specific structural, MEP, civil, energy, and professional engineering coordination for New Hampshire permits.",
    h1: "Engineering for New Hampshire Buildings and Sites",
    kicker: "State code, local review, and field conditions",
    lede: "New Hampshire uses a statewide building-code framework, while each municipality and utility applies its own intake, zoning, site, and connection requirements. A useful permit record starts with the address, existing conditions, and the agencies that actually review the work.",
    sections: [
      {
        heading: "State code does not replace municipal review",
        body: "The New Hampshire State Building Code provides the statewide baseline, but the local building official still determines the permit path for a particular occupancy and alteration. Planning, zoning, fire, historic, health, public works, and utility reviews may be separate from the building permit.",
      },
      {
        heading: "Granite, frost, rivers, and the coast change the design",
        body: "Ledge, glacial soils, frost, snow, river floodplains, tidal influence, wetlands, and older masonry vary substantially between parcels. Survey, geotechnical, flood, wetlands, septic, and utility evidence should inform foundations, drainage, HVAC, envelope, and finished-floor decisions.",
      },
      {
        heading: "DES and local agencies run parallel processes",
        body: "New Hampshire DES may regulate alteration of terrain, wetlands, shoreland, septic, and water-quality impacts in addition to municipal review. Public works departments and electric, gas, water, and sewer providers separately control frontage, capacity, connection, and shutdown requirements.",
      },
      {
        heading: "Additions and ADUs remain coordinated projects",
        body: "An addition or ADU can change egress, fire separation, frost foundations, service loads, sewer or septic demand, drainage, parking, and energy documentation. Carry each correction through the architectural, structural, civil, MEP, and energy sheets instead of treating a small footprint as a shortcut.",
      },
      {
        heading: "Driveway and state-road review is a separate handoff",
        body: "A parcel reached from a New Hampshire state highway may need a New Hampshire Department of Transportation driveway permit or access determination alongside municipal building and planning review. Confirm the roadway owner before designing frontage, sight distance, drainage, sidewalk, utility crossings, or temporary traffic control. A municipal approval does not establish permission to alter the state right-of-way, and an NHDOT condition does not resolve wetlands, septic, zoning, or flood questions. Preserve the agency correspondence with the survey and civil set so a revised entrance or addition remains consistent with the accepted access arrangement.",
      },
    ],
    faqs: [
      {
        question: "Is one New Hampshire office responsible for every permit?",
        answer: "No. The municipal building official handles the building-code route, while zoning, planning, fire, historic, flood, wetlands, health, public works, environmental, and utility authorities may have separate jurisdiction.",
      },
      {
        question: "What should be verified before engineering begins?",
        answer: "Verify the address and AHJ, adopted code editions, survey and property constraints, soil and ledge, frost and snow criteria, flood and wetlands status, septic or sewer route, utility territory, occupancy, and alteration category.",
      },
      {
        question: "Does a professional seal guarantee a New Hampshire approval?",
        answer: "No. A professional seal identifies responsibility for a defined scope of work. The local authority retains approval authority and can request separate site, fire, environmental, health, or utility documentation.",
      },
    ],
    sources: [
      { label: "New Hampshire State Building Code", url: "https://www.nh.gov/safety/divisions/firesafety/buildingcode/" },
      { label: "New Hampshire DES Alteration of Terrain", url: "https://www.des.nh.gov/business-and-community/permits-permit-by-rule/alteration-terrain" },
      { label: "New Hampshire floodplain management", url: "https://www.nh.gov/osi/planning/services/floodplain-management/" },
      { label: "New Hampshire Board of Professional Engineers", url: "https://www.oplc.nh.gov/board-professional-engineers" },
    ],
  },
  metros: [
    {
      slug: "manchester",
      name: "Manchester",
      county: "Hillsborough County",
      services: [
        {
          serviceSlug: "structural-engineering",
          title: "Manchester Structural Engineering for Mill Buildings and Additions",
          description: "Structural analysis and permit documents for Manchester framing, foundations, snow, flood, and adaptive-reuse conditions.",
          h1: "Structural Engineering for Manchester, New Hampshire",
          kicker: "Load paths for mills, neighborhoods, and river sites",
          lede: "Manchester structural work starts with observed framing, foundation evidence, and the City review path. Mill masonry, compact lots, Merrimack flood elevations, frost, and snow can make a seemingly small opening or addition a consequential structural change.",
          permitAuthority: "The City of Manchester Building Department is the local building authority for this address. Zoning, planning, fire, historic, engineering, flood, and public-works reviews can be separate; confirm the applicable route before relying on a building permit.",
          codeContext: "Use the New Hampshire State Building Code and the city’s current submission requirements for the occupancy and alteration. Confirm the code edition, snow and wind criteria, floodplain provisions, and any historic or zoning conditions with Manchester for the parcel.",
          localConditions: "Merrimack River and tributary floodplains, former mill foundations, glacial soils, ledge, freeze-thaw, and heavy snow can affect load paths, foundations, lateral connections, and construction sequencing.",
          projectTypes: "Common scopes include mill rehabilitation, urban infill, multifamily conversion, tenant work, ADUs, and older-home additions. An ADU or addition still requires review of egress, fire separation, foundation loads, service penetrations, and existing alterations.",
          sections: [
            {
              heading: "Existing Manchester framing and masonry",
              body: "Older mill floors, brick bearing walls, timber framing, and undocumented openings should be field-observed before a new beam, stair, rooftop unit, or change of occupancy is designed. Permit history and selective exposure can distinguish original construction from later work.",
            },
            {
              heading: "River elevations, frost, and foundations",
              body: "Merrimack flood information, frost movement, ledge, variable fill, and snow drift can change footing elevations, retaining details, anchorage, and flood-resistant construction. Coordinate survey and geotechnical recommendations with the structural criteria rather than borrowing details from a nearby parcel.",
            },
            {
              heading: "Manchester plan-check corrections",
              body: "A correction response should identify the city comment, revised calculation, affected sheet, and any changed architectural or MEP opening. Keep shoring, special-inspection, connection, and field-condition decisions in the dated record so the permitted load path remains clear.",
            },
          ],
          permitSteps: [
            "Confirm the Manchester jurisdiction, occupancy, current New Hampshire code edition, snow and wind criteria, flood status, zoning, and historic triggers with the Building Department.",
            "Obtain survey control, foundation and framing observations, ledge or soil recommendations, flood information, roof loads, and the proposed construction sequence before sizing members.",
            "Coordinate foundations, collectors, anchors, beam pockets, shoring, special inspections, and MEP penetrations with the architectural and civil permit drawings.",
            "Answer every plan-check item in a dated matrix, cloud revised sheets, update connected calculations, and have the responsible professional review technical changes before resubmittal.",
          ],
          faqs: [
            {
              question: "When does a Manchester addition need existing-structure investigation?",
              answer: "Investigation is appropriate when new loads, openings, altered occupancy, uncertain foundations, prior unpermitted work, or city comments make the existing load path material to the design. The observed record should control the scope.",
            },
            {
              question: "How can Merrimack flooding affect structural documents?",
              answer: "Flood elevation and local requirements can affect finished floors, foundation configuration, materials, utilities, and the connection between civil and structural drawings. Confirm parcel-specific information instead of inferring it from the river’s general location.",
            },
            {
              question: "Who accepts a structural correction in Manchester?",
              answer: "The City of Manchester reviewer determines whether a correction is resolved. The responsible professional documents the technical response, but neither a calculation nor a seal substitutes for the city’s approval.",
            },
          ],
          sources: [
            { label: "City of Manchester Building Department", url: "https://www.manchesternh.gov/Departments/Planning-and-Community-Development/Building" },
            { label: "City of Manchester Planning and Community Development", url: "https://www.manchesternh.gov/Departments/Planning-and-Community-Development" },
            { label: "Manchester Public Works", url: "https://www.manchesternh.gov/Departments/Public-Works" },
            { label: "New Hampshire State Building Code", url: "https://www.nh.gov/safety/divisions/firesafety/buildingcode/" },
            { label: "New Hampshire floodplain management", url: "https://www.nh.gov/osi/planning/services/floodplain-management/" },
          ],
        },
        {
          serviceSlug: "mep-engineering",
          title: "Manchester MEP Engineering for Cold-Climate Retrofits",
          description: "Manchester mechanical, electrical, and plumbing coordination for mills, additions, ADUs, utilities, ventilation, and winter conditions.",
          h1: "MEP Engineering for Manchester, New Hampshire",
          kicker: "Heating, service capacity, and building-system coordination",
          lede: "Manchester MEP design must connect the actual occupancy to heating, ventilation, service capacity, and municipal utility conditions. Older mills and homes can conceal undersized panels, mixed fuel systems, limited shafts, and drainage constraints.",
          permitAuthority: "The City of Manchester Building Department coordinates the building permit path, while fire, zoning, health, public works, and utility providers may review related systems. Confirm the local checklist and the service territories for the address.",
          codeContext: "Confirm the New Hampshire mechanical, plumbing, electrical, energy, and fire requirements currently accepted by Manchester. The selected systems, alteration category, occupancy, and existing conditions determine which calculations, schedules, and inspection notes belong in the set.",
          localConditions: "Cold winters, snow, freeze protection, older compact buildings, Merrimack-area flooding, and dense utility corridors affect combustion air, ventilation, condensate, equipment access, panels, and sanitary routing.",
          projectTypes: "Scopes include mill tenant improvements, multifamily conversions, commercial fit-outs, ADUs, and residential additions. New rooms can change panel load, sewer demand, domestic-water pressure, ventilation, fire separation, and energy forms at once.",
          sections: [
            {
              heading: "Manchester equipment and existing-system evidence",
              body: "Field-trace boilers, furnaces, panels, risers, shafts, water services, and sanitary connections before finalizing schedules. A mill or older home may have abandoned equipment or shared services that are not apparent from a floor plan.",
            },
            {
              heading: "Winter performance and utility interfaces",
              body: "Heating loads, combustion safety, outdoor-air control, freeze protection, snow clearance, condensate, and maintenance access should reflect the building’s exposure. Manchester Water Works, public works, electric, and gas information should support—not replace—project load calculations.",
            },
            {
              heading: "Coordinating MEP corrections",
              body: "A plan-check request for panel capacity, ventilation, fire dampers, or sanitary flow can change structure, energy documents, and architectural clearances. Revise the risers, schedules, calculations, and related sheets together and identify each dependency.",
            },
          ],
          permitSteps: [
            "Confirm Manchester’s AHJ, occupancy, current mechanical, plumbing, electrical, energy, and fire requirements, and identify the applicable utility providers.",
            "Field-trace existing equipment and request service, pressure, sewer, and fire-flow information; establish heating, ventilation, domestic-water, sanitary, and electrical loads.",
            "Coordinate equipment clearances, shafts, combustion air, condensate, freeze protection, controls, accessibility, fire separation, and energy documentation.",
            "Respond to each correction with the cited issue, revised schedule or riser, updated calculation, and cross-reference to every affected architectural, structural, and energy sheet.",
          ],
          faqs: [
            {
              question: "What utility information affects a Manchester MEP design?",
              answer: "Available electric service, gas conditions, water pressure and meter requirements, sewer connection information, and applicable fire-flow data can affect equipment and distribution. Obtain address-specific provider information and verify existing conditions in the field.",
            },
            {
              question: "What does a Manchester ADU change in an MEP package?",
              answer: "An ADU may add heating and ventilation zones, panel demand, domestic-water and sanitary flow, fire-separation interfaces, and energy documentation. The local checklist and actual shared-service configuration determine the required drawings.",
            },
            {
              question: "Can a Manchester MEP correction be answered in a narrative only?",
              answer: "Not when the comment changes a load, riser, equipment schedule, clearance, or control. Update the affected drawing and calculation so the approved record and field installation describe the same system.",
            },
          ],
          sources: [
            { label: "City of Manchester Building Department", url: "https://www.manchesternh.gov/Departments/Planning-and-Community-Development/Building" },
            { label: "Manchester Water Works", url: "https://www.manchesternh.gov/Departments/Water-Works" },
            { label: "Manchester Public Works", url: "https://www.manchesternh.gov/Departments/Public-Works" },
            { label: "New Hampshire State Building Code", url: "https://www.nh.gov/safety/divisions/firesafety/buildingcode/" },
            { label: "New Hampshire energy code resources", url: "https://www.nh.gov/safety/divisions/firesafety/buildingcode/energy-code.htm" },
          ],
        },
        {
          serviceSlug: "civil-engineering",
          title: "Manchester Civil Engineering for Riverfront and Urban Sites",
          description: "Survey-based Manchester grading, drainage, utilities, access, flood, and erosion coordination for development and additions.",
          h1: "Civil Engineering for Manchester, New Hampshire",
          kicker: "Survey, drainage, utilities, and river-area review",
          lede: "Manchester civil plans should connect the building footprint to public frontage, stormwater, fire access, utilities, and receiving drainage. Dense lots, former industrial ground, Merrimack flood areas, and frost make a survey-based plan more useful than a generic site sketch.",
          permitAuthority: "The City of Manchester Building Department is one part of the approval path. Planning, zoning, engineering, public works, fire, flood, wetlands, health, and New Hampshire DES review may apply according to the parcel and disturbance.",
          codeContext: "Confirm Manchester’s current site, zoning, driveway, drainage, floodplain, and right-of-way requirements and any New Hampshire DES threshold. The building permit does not replace environmental, utility, septic, or public-works approvals.",
          localConditions: "Merrimack and tributary floodplains, glacial till, ledge, former industrial fill, steep neighborhood streets, snow storage, and intense runoff can control grading, infiltration, retaining, and finished-floor decisions.",
          projectTypes: "Relevant work includes mill redevelopment, urban infill, multifamily additions, ADUs, commercial frontage changes, and older-home expansions. Even a small addition can alter roof runoff, sewer demand, fire access, easements, and accessible routes.",
          sections: [
            {
              heading: "Manchester survey and public-frontage record",
              body: "Show boundaries, easements, contours, rights-of-way, existing inlets, sidewalks, hydrants, utilities, fire access, and receiving drainage from current survey control. Former industrial parcels need utility and subsurface assumptions stated rather than hidden.",
            },
            {
              heading: "Flood, frost, and disturbed-ground interfaces",
              body: "Merrimack flood information, frost, snowmelt, ledge, variable fill, and compact urban outfalls can affect finished floors, infiltration, retaining, erosion protection, and pipe profiles. Coordinate with the applicable flood and DES process before fixing the grading solution.",
            },
            {
              heading: "Correction-ready civil documents",
              body: "A correction response should show changed contours, drainage areas, profiles, outlet protection, fire access, and maintenance responsibilities. Tie every revision to the building footprint and utility plan so a changed foundation or ADU does not leave an obsolete flow path.",
            },
          ],
          permitSteps: [
            "Confirm Manchester planning, zoning, engineering, public-works, floodplain, fire-access, right-of-way, and New Hampshire DES triggers for the address.",
            "Verify survey datum, easements, utilities, outfall ownership, receiving drainage, finished-floor elevation, soil infiltration, and any septic or sewer connection constraints.",
            "Prepare coordinated grading, drainage, erosion, utility, accessible-route, fire-access, snow-storage, and maintenance plans with the architectural and structural set.",
            "Log each agency comment, revise contours and calculations, and preserve accepted conditions and maintenance responsibilities in the resubmittal record.",
          ],
          faqs: [
            {
              question: "Why can a Manchester addition need civil engineering?",
              answer: "A footprint change can redirect roof water, affect a sewer connection, narrow fire access, cross an easement, alter finished-floor elevation, or trigger flood and site review. The address and changed site conditions determine the necessary level of civil documentation.",
            },
            {
              question: "Who reviews Manchester stormwater and flood issues?",
              answer: "Municipal planning, engineering, public works, and the building or flood reviewer may each address different parts of the plan; New Hampshire DES or another environmental authority can also apply. Confirm the route for the parcel rather than assigning every issue to one office.",
            },
            {
              question: "What should a civil correction response contain?",
              answer: "Identify the comment, revised contour or profile, updated drainage calculation, changed detail, receiving-system assumption, and responsible maintenance party. Cross-reference the affected architectural, structural, utility, and flood documents.",
            },
          ],
          sources: [
            { label: "City of Manchester Building Department", url: "https://www.manchesternh.gov/Departments/Planning-and-Community-Development/Building" },
            { label: "Manchester Planning and Community Development", url: "https://www.manchesternh.gov/Departments/Planning-and-Community-Development" },
            { label: "Manchester Public Works", url: "https://www.manchesternh.gov/Departments/Public-Works" },
            { label: "New Hampshire DES Alteration of Terrain", url: "https://www.des.nh.gov/business-and-community/permits-permit-by-rule/alteration-terrain" },
            { label: "New Hampshire floodplain management", url: "https://www.nh.gov/osi/planning/services/floodplain-management/" },
          ],
        },
        {
          serviceSlug: "energy-compliance",
          title: "Manchester Energy Compliance for Cold-Climate Alterations",
          description: "Manchester energy documentation for envelope, heating, ventilation, lighting, and addition or ADU permit coordination.",
          h1: "Energy Compliance for Manchester, New Hampshire",
          kicker: "Envelope and equipment documentation for winter conditions",
          lede: "Manchester energy compliance is a coordinated record of assemblies, windows, heating, ventilation, lighting, service water, and controls under the applicable New Hampshire path. Ice-dam exposure, cold basements, snow, and older construction make the built details important to the analysis.",
          permitAuthority: "The City of Manchester Building Department confirms the permit intake and accepted energy documentation for the address. Fire, zoning, historic, utility, and public-works reviews remain separate where the scope triggers them.",
          codeContext: "Confirm the current New Hampshire energy-code edition, climate inputs, alteration category, forms, and local submission sequence before selecting a compliance method. The energy record must agree with the architectural and MEP permit set.",
          localConditions: "Cold winters, heating degree days, ice dams, snow, damp basements, dense older envelopes, river humidity, and freeze-thaw can affect air sealing, insulation continuity, thermal bridges, ventilation, and condensate.",
          projectTypes: "Manchester scopes include mill conversions, tenant improvements, older-home additions, ADUs, and multifamily rehabilitation. Classify the alteration before assuming that an existing wall, service, or heating plant can remain outside the documentation.",
          sections: [
            {
              heading: "Manchester envelope evidence",
              body: "Document wall, roof, foundation, window, air-barrier, insulation, and thermal-bridge conditions that actually match the drawings. Older masonry and basement interfaces need moisture and continuity decisions rather than a copied assembly label.",
            },
            {
              heading: "Heating, ventilation, and controls",
              body: "Heating loads, heat-pump or combustion equipment, outdoor air, filtration, lighting controls, domestic hot water, and condensate should be coordinated with winter exposure and the MEP schedules. Utility incentives, if any, are separate from code compliance.",
            },
            {
              heading: "Energy plan-check corrections",
              body: "When Manchester requests a revised value or form, cite the applicable provision, update the input, and revise the affected detail and equipment schedule. A standalone worksheet cannot resolve a changed window, wall, HVAC system, or control sequence.",
            },
          ],
          permitSteps: [
            "Ask Manchester Building Department to confirm the current New Hampshire energy path, climate data, alteration category, forms, and review sequence for the project.",
            "Collect verified envelope assemblies, glazing, shading, heating and cooling equipment, ventilation, lighting, controls, service-water, and utility inputs.",
            "Cross-check the compliance analysis against architectural details, structural penetrations, MEP schedules, fire separations, and field installation responsibilities.",
            "Answer every energy correction with its cited requirement, revised form or model input, drawing reference, and coordinated change to the permit set.",
          ],
          faqs: [
            {
              question: "What determines the energy path for a Manchester addition?",
              answer: "The current New Hampshire code, occupancy, alteration category, area and system scope, existing conditions, and Manchester’s intake instructions determine the path. Confirm those facts before assuming a renovation exemption.",
            },
            {
              question: "How do Manchester winters affect energy documentation?",
              answer: "Cold-weather heating, air leakage, thermal bridges, ice-dam risk, basement moisture, ventilation, and equipment controls can all affect the selected assemblies and systems. Use project-specific climate and construction information rather than a generic regional promise.",
            },
            {
              question: "Can an energy correction be submitted without drawing changes?",
              answer: "Only if the correction truly changes no physical assembly, equipment, control, or installation note. Otherwise update the forms and every affected architectural and MEP reference together.",
            },
          ],
          sources: [
            { label: "City of Manchester Building Department", url: "https://www.manchesternh.gov/Departments/Planning-and-Community-Development/Building" },
            { label: "Manchester Planning and Community Development", url: "https://www.manchesternh.gov/Departments/Planning-and-Community-Development" },
            { label: "New Hampshire State Building Code", url: "https://www.nh.gov/safety/divisions/firesafety/buildingcode/" },
            { label: "New Hampshire energy code resources", url: "https://www.nh.gov/safety/divisions/firesafety/buildingcode/energy-code.htm" },
            { label: "New Hampshire Board of Professional Engineers", url: "https://www.oplc.nh.gov/board-professional-engineers" },
          ],
        },
        {
          serviceSlug: "pe-stamped-drawings",
          title: "Manchester PE-Stamped Drawings for Coordinated Permits",
          description: "Manchester professional engineering documents with defined scope, verified conditions, code criteria, and correction tracking.",
          h1: "PE-Stamped Drawings for Manchester, New Hampshire",
          kicker: "Responsible scope, evidence, and resubmittal control",
          lede: "A Manchester sealed engineering set should make its parcel, discipline, design criteria, calculations, and limitations legible to the reviewer. A seal identifies professional responsibility for a defined scope; it does not promise approval or replace a city, flood, utility, or environmental review.",
          permitAuthority: "The City of Manchester Building Department administers the local building review, with planning, zoning, fire, historic, public works, flood, health, and utility authorities potentially involved. Confirm which sheets require professional responsibility for this address and scope.",
          codeContext: "Identify the current New Hampshire code editions and Manchester submission requirements in the design record. State assumptions for occupancy, snow, wind, flood, soils, existing construction, utilities, and consultant boundaries before sealing.",
          localConditions: "Merrimack flood exposure, mill masonry, granite and glacial soils, frost, snow, dense utilities, and older alterations can require survey, geotechnical, flood, utility, or specialty information before a professional accepts responsibility.",
          projectTypes: "The record may support mill rehabilitation, commercial fit-outs, multifamily conversions, ADUs, additions, and site-linked structural work. Define whether the sealed scope includes calculations, civil interfaces, MEP coordination, field changes, or only identified sheets.",
          sections: [
            {
              heading: "Defining a Manchester professional scope",
              body: "List the parcel, occupancy, code basis, existing-condition evidence, calculations, drawing index, assumptions, exclusions, and interfaces with survey, geotechnical, architecture, fire, and utilities. This makes the seal meaningful without implying a broader identity or authorization.",
            },
            {
              heading: "Local evidence before sealing",
              body: "Flood elevations, ledge, frost, mill construction, utility capacity, fire access, and public-frontage constraints may alter the design. Obtain appropriate records and identify unresolved field conditions instead of presenting an unverified condition as fact.",
            },
            {
              heading: "Manchester correction and revision record",
              body: "Use a dated matrix for city comments, substitutions, RFIs, and field observations. Cloud changed sheets, update calculations and schedules, and record the responsible professional’s review whenever a change affects sealed work.",
            },
          ],
          permitSteps: [
            "Identify Manchester’s enforcing authority, occupancy, current code editions, discipline boundary, checklist, and required seal format for the actual permit scope.",
            "Assemble survey, field observations, soils, flood information, utility correspondence, design criteria, calculations, and consultant responsibilities before final review.",
            "Have the responsible professional review coordinated notes, details, schedules, calculations, and referenced architectural, civil, and MEP interfaces.",
            "Route every plan-check change, substitution, RFI, and field condition through the responsible professional and issue revised sealed sheets only where the defined scope changes.",
          ],
          faqs: [
            {
              question: "What does a Manchester PE seal cover?",
              answer: "It covers the professional’s defined discipline and scope on the identified project documents, subject to the professional’s stated assumptions and limitations. It does not cover unrelated architectural, utility, environmental, or construction decisions.",
            },
            {
              question: "Does a sealed Manchester set guarantee approval?",
              answer: "No. Manchester reviews the permit and can request corrections or separate approvals. The seal documents professional responsibility; it is not a promise that the city, utility, fire, or environmental reviewer will accept every item.",
            },
            {
              question: "How should sealed revisions be documented after plan check?",
              answer: "Use a dated response matrix, revision clouds, updated calculations and sheets, and a recorded professional review for affected scope. Preserve the prior issue and explain whether a field change requires a permit revision.",
            },
          ],
          sources: [
            { label: "City of Manchester Building Department", url: "https://www.manchesternh.gov/Departments/Planning-and-Community-Development/Building" },
            { label: "Manchester Planning and Community Development", url: "https://www.manchesternh.gov/Departments/Planning-and-Community-Development" },
            { label: "Manchester Public Works", url: "https://www.manchesternh.gov/Departments/Public-Works" },
            { label: "New Hampshire State Building Code", url: "https://www.nh.gov/safety/divisions/firesafety/buildingcode/" },
            { label: "New Hampshire Board of Professional Engineers", url: "https://www.oplc.nh.gov/board-professional-engineers" },
          ],
        },
      ],
    },
    {
      slug: "nashua",
      name: "Nashua",
      county: "Hillsborough County",
      services: [
        {
          serviceSlug: "structural-engineering",
          title: "Nashua Structural Engineering for Mill Reuse and Infill",
          description: "Nashua structural permit support for mill reuse, additions, snow, flood, frost, and mixed-age building stock.",
          h1: "Structural Engineering for Nashua, New Hampshire",
          kicker: "Load paths between mills, infill, and suburban additions",
          lede: "Nashua structural design begins with field evidence and the City’s Building Safety and Construction review. Older mill framing, Merrimack and Nashua river corridors, glacial soils, ledge, and snow can change the answer from one block or neighborhood to the next.",
          permitAuthority: "Nashua Building Safety and Construction is the local building authority, while planning, zoning, fire, engineering, watershed, flood, and utility reviews can proceed separately. Confirm the parcel’s actual intake path before finalizing structural documents.",
          codeContext: "Use the New Hampshire State Building Code and Nashua’s current permit requirements for the occupancy and alteration. Confirm snow, wind, floodplain, frost, historic, zoning, and any change-of-use criteria with the reviewing authority.",
          localConditions: "Merrimack and Nashua river corridors, glacial till, ledge, winter snow, frost, older mill construction, and suburban infill affect foundations, diaphragms, connections, flood interfaces, and construction access.",
          projectTypes: "Nashua scopes include mill reuse, technology and office fit-outs, multifamily rehabilitation, subdivisions, ADUs, and older-home additions. A residential addition still requires an integrated check of egress, foundations, openings, fire separation, and utilities.",
          sections: [
            {
              heading: "Nashua existing buildings and adaptive reuse",
              body: "Mill timber, masonry bearing walls, prior tenant penetrations, and altered trusses need observation before a new opening or rooftop load is accepted. Record what is measured, what is inferred, and what remains concealed in the permit calculations.",
            },
            {
              heading: "Glacial soils, river corridors, and snow",
              body: "Ledge, variable till, frost, snow drift, and river flood information can influence footing depth, retaining, lateral resistance, finished floors, and material choices. Coordinate structural assumptions with survey, geotechnical, and civil information for the specific parcel.",
            },
            {
              heading: "Nashua correction responses",
              body: "Respond to Building Safety comments with a marked calculation, connection detail, and sheet reference. If an MEP shaft, fire separation, grading change, or ADU layout affects the load path, revise the connected drawings instead of answering only in prose.",
            },
          ],
          permitSteps: [
            "Confirm Nashua jurisdiction, occupancy, current New Hampshire code, snow and wind criteria, flood status, zoning, and any change-of-use or historic review.",
            "Collect survey, geotechnical recommendations, ledge and frost information, framing observations, foundation evidence, flood data, roof loads, and construction sequence.",
            "Coordinate foundations, lateral connections, openings, shoring, special inspections, fire separations, and MEP penetrations with the full permit set.",
            "Return a dated response to every Nashua correction, cloud affected sheets, update linked calculations, and obtain responsible-professional review before resubmitting.",
          ],
          faqs: [
            {
              question: "Does Nashua mill reuse require more than a new beam detail?",
              answer: "Often it requires investigation of existing framing, masonry, foundations, prior alterations, occupancy, fire separations, and construction sequence. The actual building evidence and Nashua checklist determine the required scope.",
            },
            {
              question: "How do Nashua soils affect an addition?",
              answer: "Glacial till, ledge, fill, frost, and local drainage can change bearing, footing depth, retaining, and excavation details. Use parcel-specific survey and geotechnical information rather than assuming a subdivision-wide condition.",
            },
            {
              question: "What makes a Nashua structural correction complete?",
              answer: "The response should cite the comment, show the changed calculation or detail, identify every affected sheet, and explain any field or consultant dependency. Nashua decides acceptance after reviewing that record.",
            },
          ],
          sources: [
            { label: "City of Nashua Building Safety and Construction", url: "https://www.nashuanh.gov/278/Building-Safety-Construction" },
            { label: "Nashua Planning Department", url: "https://www.nashuanh.gov/434/Planning" },
            { label: "Nashua Public Works", url: "https://www.nashuanh.gov/436/Public-Works" },
            { label: "New Hampshire State Building Code", url: "https://www.nh.gov/safety/divisions/firesafety/buildingcode/" },
            { label: "New Hampshire floodplain management", url: "https://www.nh.gov/osi/planning/services/floodplain-management/" },
          ],
        },
        {
          serviceSlug: "mep-engineering",
          title: "Nashua MEP Engineering for Winter and Utility Constraints",
          description: "Nashua MEP design for mill conversions, additions, ADUs, service capacity, heating, ventilation, and water or sewer coordination.",
          h1: "MEP Engineering for Nashua, New Hampshire",
          kicker: "Systems coordination for mills and suburban infill",
          lede: "Nashua MEP engineering links the occupancy and existing systems to heating, ventilation, electrical service, plumbing, and the city’s permit review. Mill shafts, older panels, river-area constraints, and additions can make a small change affect several disciplines.",
          permitAuthority: "Nashua Building Safety and Construction administers the local building review. Fire, zoning, planning, public works, water, sewer, and electric or gas providers may have separate requirements for the address and project scope.",
          codeContext: "Confirm the currently accepted New Hampshire mechanical, plumbing, electrical, energy, and fire provisions with Nashua. Equipment schedules, risers, load calculations, and energy forms should all use the same occupancy, alteration, and existing-system assumptions.",
          localConditions: "Cold winters, snow and freeze protection, older industrial shafts, compact utility corridors, Merrimack-area flooding, and suburban well or sewer interfaces can affect equipment, condensate, panels, and sanitary routing.",
          projectTypes: "Typical scopes include office and technology fit-outs, mill reuse, multifamily work, ADUs, and residential additions. New loads can affect panel capacity, water pressure, sewer flow, fire separation, ventilation, and equipment access.",
          sections: [
            {
              heading: "Nashua field verification before schedules",
              body: "Trace existing panels, feeders, boilers, furnaces, shafts, water services, sanitary routes, and controls before selecting replacement or added equipment. In converted industrial space, abandoned services and shared risers should be identified explicitly.",
            },
            {
              heading: "Cold-climate systems and providers",
              body: "Heating, outdoor air, combustion, filtration, freeze protection, snow clearance, condensate, and service access should reflect the actual building. Pennichuck, Nashua Public Works, and electric or gas providers supply address-specific information that must be reconciled with engineering loads.",
            },
            {
              heading: "MEP corrections across the permit set",
              body: "A panel, ventilation, sprinkler interface, or sanitary comment can change energy inputs, shafts, clearances, and structure. Revise all connected schedules, risers, calculations, and architectural details and identify the correction dependency.",
            },
          ],
          permitSteps: [
            "Confirm Nashua AHJ, occupancy, current mechanical, plumbing, electrical, energy, and fire provisions, and identify the water, sewer, electric, and gas providers.",
            "Field-trace existing systems and obtain service, pressure, sewer, and fire-flow information; calculate heating, ventilation, domestic-water, sanitary, and electrical demand.",
            "Coordinate equipment, shafts, combustion air, condensate, freeze protection, controls, service clearances, fire separations, and energy documentation.",
            "Answer each Nashua correction with the cited issue, revised riser or schedule, updated calculation, provider record, and references to all changed sheets.",
          ],
          faqs: [
            {
              question: "Which Nashua utility facts belong in MEP design?",
              answer: "Electric service and gas information, Pennichuck water conditions, sewer connection data, pressure, and applicable fire-flow information can affect sizing and routing. Confirm them for the address and verify the existing installation in the field.",
            },
            {
              question: "How can a Nashua ADU affect existing services?",
              answer: "It can add heating zones, panel demand, water use, sanitary flow, ventilation, and fire-separation interfaces. Whether shared services remain adequate depends on the measured system and local provider or AHJ requirements.",
            },
            {
              question: "What is a useful Nashua MEP correction log?",
              answer: "Track the reviewer’s citation, load or equipment change, revised sheet and calculation, utility dependency, and responsible review. That record prevents a corrected schedule from contradicting an unchanged riser or energy form.",
            },
          ],
          sources: [
            { label: "City of Nashua Building Safety and Construction", url: "https://www.nashuanh.gov/278/Building-Safety-Construction" },
            { label: "Pennichuck Water Works", url: "https://www.pennichuck.com/" },
            { label: "Nashua Public Works", url: "https://www.nashuanh.gov/436/Public-Works" },
            { label: "New Hampshire State Building Code", url: "https://www.nh.gov/safety/divisions/firesafety/buildingcode/" },
            { label: "New Hampshire energy code resources", url: "https://www.nh.gov/safety/divisions/firesafety/buildingcode/energy-code.htm" },
          ],
        },
        {
          serviceSlug: "civil-engineering",
          title: "Nashua Civil Engineering for River Corridors and Infill",
          description: "Nashua civil plans for grading, drainage, utilities, access, flood, erosion, and additions across urban and suburban sites.",
          h1: "Civil Engineering for Nashua, New Hampshire",
          kicker: "Drainage, frontage, and utility plans for changing sites",
          lede: "Nashua civil engineering ties a building footprint to survey control, public frontage, stormwater, utilities, fire access, and receiving systems. River corridors, glacial ground, ledge, and suburban drainage make address-specific evidence essential.",
          permitAuthority: "Nashua Building Safety and Construction is not the only possible reviewer. Planning, zoning, engineering, public works, fire, flood, wetlands, health, and New Hampshire DES authorities may each have a role based on disturbance, frontage, and receiving waters.",
          codeContext: "Confirm Nashua’s current zoning, site, driveway, drainage, floodplain, right-of-way, and construction requirements and whether New Hampshire DES review applies. A building permit does not authorize an unreviewed utility, wetland, septic, or stormwater change.",
          localConditions: "Merrimack and Nashua river corridors, glacial till, ledge, compact industrial parcels, wooded suburban slopes, frost, snowmelt, and intense rainfall can govern infiltration, retaining, pipe profiles, and finished grades.",
          projectTypes: "Relevant work includes subdivisions, mill reuse, office and multifamily infill, ADUs, additions, and commercial access changes. Even a small residential scope can alter roof runoff, fire access, sewer capacity, easements, and parking.",
          sections: [
            {
              heading: "Nashua survey, frontage, and utilities",
              body: "A useful plan shows parcel limits, easements, contours, rights-of-way, sidewalks, hydrants, inlets, fire routes, utility crossings, and outfalls using current survey control. Existing industrial services should be verified before a new connection is drawn.",
            },
            {
              heading: "River, ledge, and stormwater decisions",
              body: "Flood information, glacial soils, ledge, snowmelt, and variable fill influence finished floors, infiltration, retaining, erosion protection, and outlet design. Coordinate with Nashua engineering and any DES or flood process before committing to a receiving system.",
            },
            {
              heading: "Small-site corrections in Nashua",
              body: "When a correction changes contours, a driveway, pipe profile, or finished floor, revise the building and utility interfaces too. ADUs and additions should show the changed impervious area, drainage path, sewer demand, fire access, and maintenance responsibility.",
            },
          ],
          permitSteps: [
            "Confirm Nashua planning, zoning, engineering, public-works, flood, fire-access, right-of-way, and New Hampshire DES review triggers for the parcel.",
            "Verify survey datum, easements, utility ownership, outfall and receiving drainage, finished-floor elevation, soil infiltration, and septic or sewer constraints.",
            "Prepare coordinated grading, drainage, erosion, utility, accessible-route, fire-access, snow-storage, and maintenance plans with the building drawings.",
            "Respond to every Nashua comment with revised contours, profiles, calculations, details, and a clear record of changed assumptions and maintenance duties.",
          ],
          faqs: [
            {
              question: "Why can a Nashua infill project need civil engineering?",
              answer: "Tight frontage, old utilities, drainage connections, flood exposure, fire access, easements, and changed impervious area can make civil information necessary even without a large subdivision. The local checklist and site evidence control the scope.",
            },
            {
              question: "Does a Nashua addition always need a new stormwater permit?",
              answer: "Not necessarily. The applicable disturbance, drainage, zoning, flood, and environmental thresholds determine the review, and municipal or DES authorities should confirm them for the parcel rather than relying on a project-size assumption.",
            },
            {
              question: "How should Nashua civil comments be answered?",
              answer: "Identify the comment, revised grade or profile, drainage calculation, outfall assumption, detail, and maintenance party. Cross-reference the building, structural, utility, flood, and erosion documents that changed with the site plan.",
            },
          ],
          sources: [
            { label: "City of Nashua Building Safety and Construction", url: "https://www.nashuanh.gov/278/Building-Safety-Construction" },
            { label: "Nashua Planning Department", url: "https://www.nashuanh.gov/434/Planning" },
            { label: "Nashua Public Works", url: "https://www.nashuanh.gov/436/Public-Works" },
            { label: "New Hampshire DES Alteration of Terrain", url: "https://www.des.nh.gov/business-and-community/permits-permit-by-rule/alteration-terrain" },
            { label: "New Hampshire floodplain management", url: "https://www.nh.gov/osi/planning/services/floodplain-management/" },
          ],
        },
        {
          serviceSlug: "energy-compliance",
          title: "Nashua Energy Compliance for Mills, Homes, and ADUs",
          description: "Nashua energy documentation for cold-climate envelopes, heating, ventilation, controls, and coordinated alteration permits.",
          h1: "Energy Compliance for Nashua, New Hampshire",
          kicker: "Code documentation for mill reuse and residential change",
          lede: "Nashua energy compliance connects the adopted New Hampshire path to actual assemblies, glazing, heating, ventilation, lighting, service water, and controls. Converted mills and older homes need an evidence-based alteration classification rather than a default assumption.",
          permitAuthority: "Nashua Building Safety and Construction confirms the local intake and accepted energy documents. Planning, zoning, fire, historic, utility, and public-works review can remain separate where the address or scope triggers it.",
          codeContext: "Confirm the current New Hampshire energy-code edition, climate inputs, occupancy, alteration category, accepted forms, and review sequence with Nashua. Model inputs and field notes must agree with the architectural and MEP permit documents.",
          localConditions: "Cold winters, snow, ice dams, damp basements, older masonry, compact mill envelopes, and freeze-thaw can affect thermal continuity, air sealing, moisture control, heat pumps, ventilation, and condensate.",
          projectTypes: "Nashua work includes mill conversions, office fit-outs, multifamily rehabilitation, ADUs, and additions. A changed window, wall, HVAC system, or service-water route can alter the compliance record even when most of the building remains.",
          sections: [
            {
              heading: "Nashua assemblies and existing conditions",
              body: "Document the actual wall, roof, basement, window, air-barrier, insulation, and thermal-bridge conditions for the portion being altered. Mill masonry and older residential layers should be checked for moisture and constructability before they are entered as idealized assemblies.",
            },
            {
              heading: "Equipment and control coordination",
              body: "Heating, ventilation, filtration, heat-pump or combustion equipment, lighting controls, domestic hot water, and condensate details should match MEP schedules and winter conditions. Utility programs are separate from the code compliance determination.",
            },
            {
              heading: "Nashua energy corrections",
              body: "When a reviewer changes a modeled value or requires a missing form, cite the provision and update the corresponding detail, schedule, and calculation. Keep the corrected energy record synchronized with structure, fire separation, and architectural notes.",
            },
          ],
          permitSteps: [
            "Ask Nashua Building Safety and Construction to confirm the current New Hampshire energy path, climate inputs, alteration category, forms, and submission sequence.",
            "Collect verified assemblies, glazing, shading, heating and cooling, ventilation, lighting, controls, service-water, and utility inputs from the coordinated design.",
            "Cross-check every modeled input against architectural details, structural penetrations, MEP equipment, fire separations, and field installation notes.",
            "Answer plan-check corrections with the cited requirement, revised form or input, updated assembly or equipment detail, and references to changed permit sheets.",
          ],
          faqs: [
            {
              question: "How is a Nashua addition classified for energy review?",
              answer: "The current code, occupancy, alteration scope, affected assemblies and systems, and Nashua’s accepted submission path determine the documentation. Confirm the classification before assuming the existing dwelling controls the entire project.",
            },
            {
              question: "What do Nashua winter conditions change in the design?",
              answer: "Cold-weather heating, air leakage, ice-dam exposure, basement moisture, ventilation, thermal bridges, and equipment controls can affect both modeled inputs and buildable details. Use verified conditions and current climate data.",
            },
            {
              question: "What if an energy correction changes an HVAC selection?",
              answer: "Update the compliance inputs, equipment schedule, loads, controls, clearances, and affected architectural details, then identify the change in the response matrix. A corrected form alone would leave the permit record inconsistent.",
            },
          ],
          sources: [
            { label: "City of Nashua Building Safety and Construction", url: "https://www.nashuanh.gov/278/Building-Safety-Construction" },
            { label: "Nashua Planning Department", url: "https://www.nashuanh.gov/434/Planning" },
            { label: "New Hampshire State Building Code", url: "https://www.nh.gov/safety/divisions/firesafety/buildingcode/" },
            { label: "New Hampshire energy code resources", url: "https://www.nh.gov/safety/divisions/firesafety/buildingcode/energy-code.htm" },
            { label: "New Hampshire Board of Professional Engineers", url: "https://www.oplc.nh.gov/board-professional-engineers" },
          ],
        },
        {
          serviceSlug: "pe-stamped-drawings",
          title: "Nashua PE-Stamped Drawings for Building Review",
          description: "Nashua sealed engineering documents defining scope, existing-condition evidence, code criteria, and correction responsibilities.",
          h1: "PE-Stamped Drawings for Nashua, New Hampshire",
          kicker: "A defined professional record for local review",
          lede: "A Nashua PE-stamped package should identify the parcel, discipline, design criteria, calculations, assumptions, and limitations that the responsible professional actually reviewed. It should support Building Safety review without implying a permit guarantee or a broader professional identity.",
          permitAuthority: "Nashua Building Safety and Construction is the local building reviewer, with planning, zoning, fire, public works, flood, health, environmental, and utility authorities potentially reviewing related work. Confirm the sheets and discipline boundaries for this project.",
          codeContext: "State the applicable New Hampshire code editions and Nashua submission requirements in the design record. Snow, wind, flood, frost, soil, existing construction, utility, and occupancy assumptions should be traceable to source information.",
          localConditions: "River corridors, glacial till, ledge, snow, frost, mill structures, compact utilities, and suburban drainage can require survey, geotechnical, flood, utility, or specialty information before a professional accepts responsibility.",
          projectTypes: "The defined scope may involve mill conversion, tenant improvement, multifamily work, ADUs, additions, and site-linked structural or MEP documentation. State whether civil interfaces, calculations, field observations, or construction changes are included or excluded.",
          sections: [
            {
              heading: "Nashua scope and seal boundaries",
              body: "Identify the address, occupancy, code path, drawing index, calculations, assumptions, exclusions, existing-condition evidence, and interfaces with architecture, survey, geotechnical, civil, fire, and utilities. This prevents a seal from being read as coverage of work not reviewed.",
            },
            {
              heading: "Evidence for river and mill projects",
              body: "Flood information, ledge, frost, snow, masonry condition, service capacity, and fire access may control the design. Record the sources and limitations, and do not convert an unverified field or utility condition into a stated fact.",
            },
            {
              heading: "Nashua plan-check accountability",
              body: "Maintain a dated correction matrix, revision clouds, linked calculations, and a record of responsible-professional review for substitutions, RFIs, and field changes. A changed ADU layout or addition foundation can affect more than one sealed discipline.",
            },
          ],
          permitSteps: [
            "Identify Nashua’s enforcing authority, occupancy, current code editions, checklist, discipline boundary, and seal format for the actual permit.",
            "Assemble survey, soil, flood, utility, field, calculation, design-criteria, and consultant-boundary records before the responsible professional completes review.",
            "Review coordinated notes, details, schedules, calculations, and architectural, civil, MEP, fire, and energy interfaces under the defined scope.",
            "Route each Nashua correction, substitution, RFI, and field condition through the responsible professional and issue revised sealed sheets only when required by the scope change.",
          ],
          faqs: [
            {
              question: "What does a Nashua PE seal communicate?",
              answer: "It communicates responsibility for the identified professional scope and documents, subject to the stated assumptions and limitations. It does not certify unrelated work or eliminate Nashua’s independent permit review.",
            },
            {
              question: "Can a sealed Nashua drawing guarantee approval?",
              answer: "No. Nashua may request corrections or separate building, fire, zoning, flood, utility, and environmental documentation. A seal is evidence of professional review, not an outcome promise.",
            },
            {
              question: "How are Nashua post-review changes handled?",
              answer: "Track the comment or field condition, revise affected calculations and sheets, cloud the change, and record responsible-professional review. Determine with Nashua whether the change also requires a permit revision.",
            },
          ],
          sources: [
            { label: "City of Nashua Building Safety and Construction", url: "https://www.nashuanh.gov/278/Building-Safety-Construction" },
            { label: "Nashua Planning Department", url: "https://www.nashuanh.gov/434/Planning" },
            { label: "Nashua Public Works", url: "https://www.nashuanh.gov/436/Public-Works" },
            { label: "New Hampshire State Building Code", url: "https://www.nh.gov/safety/divisions/firesafety/buildingcode/" },
            { label: "New Hampshire Board of Professional Engineers", url: "https://www.oplc.nh.gov/board-professional-engineers" },
          ],
        },
      ],
    },
    {
      slug: "concord",
      name: "Concord",
      county: "Merrimack County",
      services: [
        {
          serviceSlug: "structural-engineering",
          title: "Concord Structural Engineering for River-Valley Buildings",
          description: "Concord structural design for downtown rehabilitation, additions, snow, flood, granite, and older building conditions.",
          h1: "Structural Engineering for Concord, New Hampshire",
          kicker: "Foundations and load paths for capital-area projects",
          lede: "Concord structural engineering begins with the City’s building and permitting process and evidence from the actual building. Merrimack and Contoocook flood areas, older downtown construction, ledge, frost, and snow can shape an addition or rehabilitation in different ways.",
          permitAuthority: "The City of Concord Building and Permitting office is the local building authority for city parcels. Planning, zoning, engineering, fire, historic, flood, public works, and utility reviews may run in parallel and should be confirmed by address.",
          codeContext: "Confirm the New Hampshire State Building Code edition and Concord’s current submittal requirements for occupancy, alteration, snow, wind, flood, frost, and historic conditions. A structural set should identify the criteria and existing-condition limitations.",
          localConditions: "Merrimack and Contoocook river floodplains, granite, glacial soils, wooded slopes, heavy snow, frost, and older downtown masonry affect foundations, lateral systems, roof loads, flood interfaces, and construction sequencing.",
          projectTypes: "Concord work includes downtown rehabilitation, state-capital-area offices, commercial interiors, river-valley work, ADUs, and residential additions. Changes to occupancy or egress can make existing framing and fire interfaces as important as the new member.",
          sections: [
            {
              heading: "Concord older-building investigation",
              body: "Downtown masonry, timber floors, prior openings, and concealed alterations should be observed before relying on an existing wall, diaphragm, or foundation. Document the limits of access and distinguish field measurements from assumptions in the calculation package.",
            },
            {
              heading: "River, granite, and snow criteria",
              body: "Flood elevations, ledge, glacial soils, frost, snow drift, and wooded slopes can control footing, retaining, roof, connection, and finished-floor details. Coordinate survey, geotechnical, and civil criteria with the structural load path for the address.",
            },
            {
              heading: "Concord correction record",
              body: "Respond to Building and Permitting comments with a cited calculation and sheet-specific detail. Keep openings, shoring, fire separation, MEP penetrations, and any addition or ADU foundation changes synchronized across the permit package.",
            },
          ],
          permitSteps: [
            "Confirm Concord jurisdiction, occupancy, current New Hampshire code, snow and wind criteria, flood status, zoning, historic review, and any change-of-use triggers.",
            "Obtain survey, framing and foundation observations, ledge or soil recommendations, flood information, roof loads, and proposed sequencing before final member design.",
            "Coordinate foundations, lateral connections, beam pockets, shoring, special inspections, fire separation, and MEP penetrations with the complete permit set.",
            "Answer each Concord correction in a dated matrix, cloud revised sheets, update linked calculations, and obtain responsible-professional review before resubmission.",
          ],
          faqs: [
            {
              question: "When should a Concord older building be probed?",
              answer: "Probe or otherwise verify conditions when new loads, openings, occupancy, uncertain foundations, concealed masonry, prior alterations, or reviewer comments make existing capacity important. The scope should follow the evidence needed for the proposed work.",
            },
            {
              question: "How do Concord flood elevations affect a structure?",
              answer: "They can affect finished floors, foundations, materials, utilities, and the civil-structural interface. Confirm the parcel’s flood information and applicable review rather than using a generalized river elevation.",
            },
            {
              question: "What belongs in a Concord structural resubmittal?",
              answer: "Include the comment citation, revised calculation or detail, sheet reference, changed assumption, and cross-discipline impacts. Concord determines acceptance after reviewing the complete technical response.",
            },
          ],
          sources: [
            { label: "City of Concord Building and Permitting", url: "https://www.concordnh.gov/496/Building-Permits" },
            { label: "Concord Planning Department", url: "https://www.concordnh.gov/planning" },
            { label: "Concord General Services and Public Works", url: "https://www.concordnh.gov/491/General-Services-Public-Works" },
            { label: "New Hampshire State Building Code", url: "https://www.nh.gov/safety/divisions/firesafety/buildingcode/" },
            { label: "New Hampshire floodplain management", url: "https://www.nh.gov/osi/planning/services/floodplain-management/" },
          ],
        },
        {
          serviceSlug: "mep-engineering",
          title: "Concord MEP Engineering for Offices, Homes, and Additions",
          description: "Concord MEP coordination for heating, ventilation, service loads, water, sewer, and winter building-system reviews.",
          h1: "MEP Engineering for Concord, New Hampshire",
          kicker: "Building systems for downtown and river-valley conditions",
          lede: "Concord MEP design must reconcile the occupancy, existing service, winter climate, and City review path. Downtown buildings, state-area offices, and residential additions can have different access, shaft, panel, and utility constraints.",
          permitAuthority: "Concord Building and Permitting coordinates the local building review; fire, planning, zoning, historic, public works, water, sewer, and electric or gas providers may have independent requirements. Confirm the authorities and current checklist for the address.",
          codeContext: "Confirm the New Hampshire mechanical, plumbing, electrical, energy, and fire provisions currently accepted by Concord. The equipment, riser, load, and energy records must use consistent occupancy, alteration, and field-verified existing-system information.",
          localConditions: "Cold winters, snow, frost, older downtown shafts, river flooding, wooded lots, and compact utility routes affect heating, ventilation, condensate, freeze protection, panels, sanitary routing, and maintenance access.",
          projectTypes: "Relevant scopes include offices, commercial interiors, downtown rehabilitation, ADUs, residential additions, and public-facing renovations. A changed room count or occupancy can affect ventilation, egress interfaces, service load, water demand, and energy documentation.",
          sections: [
            {
              heading: "Concord field-traced systems",
              body: "Verify panels, feeders, boilers, furnaces, shafts, water services, sanitary routes, controls, and equipment clearances before issuing final schedules. Older downtown buildings may have shared or abandoned systems that are absent from legacy drawings.",
            },
            {
              heading: "Winter systems and Concord utilities",
              body: "Heating, outdoor air, combustion, filtration, freeze protection, snow clearance, condensate, and service access should reflect the actual envelope and exposure. Coordinate City water and sewer information and provider service data with—not instead of—engineering calculations.",
            },
            {
              heading: "Concord MEP plan-check corrections",
              body: "Panel capacity, ventilation, fire damper, equipment, or sanitary comments may affect structure, energy forms, and clearances. Revise all linked schedules, risers, calculations, and details and show the correction dependency in the response.",
            },
          ],
          permitSteps: [
            "Confirm Concord AHJ, occupancy, accepted mechanical, plumbing, electrical, energy, and fire provisions, and identify water, sewer, electric, and gas providers.",
            "Field-trace existing systems and request service, pressure, sewer, and fire-flow information; establish heating, ventilation, domestic-water, sanitary, and electrical loads.",
            "Coordinate equipment, shafts, combustion air, condensate, freeze protection, controls, accessibility, fire separation, and energy documentation.",
            "Answer each Concord correction with the cited issue, revised schedule or riser, updated calculation, provider information, and references to every changed sheet.",
          ],
          faqs: [
            {
              question: "What Concord utility data affects an MEP package?",
              answer: "Electric and gas service information, municipal water pressure and connection conditions, sewer capacity or connection requirements, and applicable fire-flow information can change equipment and distribution. Verify them for the actual address.",
            },
            {
              question: "How can a Concord addition affect plumbing?",
              answer: "A new kitchen, bath, or dwelling unit may change domestic-water demand, sanitary flow, venting, service capacity, and fire or energy interfaces. Existing shared services should be field-verified and reviewed against local requirements.",
            },
            {
              question: "How should a Concord MEP correction be closed?",
              answer: "Identify the reviewer’s issue, update the affected load, schedule, riser, detail, and calculation, and cross-reference connected sheets. A narrative alone is insufficient when the physical system or permitted design changes.",
            },
          ],
          sources: [
            { label: "City of Concord Building and Permitting", url: "https://www.concordnh.gov/496/Building-Permits" },
            { label: "Concord Water Services", url: "https://www.concordnh.gov/water" },
            { label: "Concord General Services and Public Works", url: "https://www.concordnh.gov/491/General-Services-Public-Works" },
            { label: "New Hampshire State Building Code", url: "https://www.nh.gov/safety/divisions/firesafety/buildingcode/" },
            { label: "New Hampshire energy code resources", url: "https://www.nh.gov/safety/divisions/firesafety/buildingcode/energy-code.htm" },
          ],
        },
        {
          serviceSlug: "civil-engineering",
          title: "Concord Civil Engineering for Floodplain and Granite Sites",
          description: "Concord civil plans for grading, drainage, utilities, access, river flood, erosion, and downtown or residential development.",
          h1: "Civil Engineering for Concord, New Hampshire",
          kicker: "Survey-based grading from downtown to river valley",
          lede: "Concord civil engineering connects a building to survey control, city frontage, stormwater, utilities, fire access, and receiving drainage. River valleys, granite, wooded slopes, snowmelt, and older utility corridors require more than a generic lot diagram.",
          permitAuthority: "Concord Building and Permitting is one part of the review. Planning, zoning, engineering, public works, fire, flood, wetlands, health, historic, and New Hampshire DES authorities may apply according to parcel conditions and disturbance.",
          codeContext: "Confirm Concord’s current zoning, site, driveway, drainage, floodplain, right-of-way, erosion, and construction requirements and whether DES review is triggered. A building permit does not independently authorize site, wetland, septic, or utility work.",
          localConditions: "Merrimack and Contoocook floodplains, granite, glacial soils, wooded slopes, frost, snow storage, and intense rainfall affect infiltration, retaining, outlet protection, finished floors, and public-frontage design.",
          projectTypes: "Concord work includes downtown rehabilitation, offices, river-valley commercial projects, ADUs, additions, and residential access changes. Small scopes can still alter roof runoff, sewer connections, fire routes, easements, parking, and accessible paths.",
          sections: [
            {
              heading: "Concord survey and receiving drainage",
              body: "Show parcel limits, contours, easements, public frontage, sidewalks, inlets, hydrants, utilities, fire access, flood information, and the actual outfall from current survey control. State assumptions where older mapping or buried services are uncertain.",
            },
            {
              heading: "River flood, granite, and snowmelt",
              body: "Flood elevations, ledge, variable till, spring runoff, snow storage, and wooded grades can affect finished floors, infiltration, retaining, erosion, and pipe profiles. Coordinate the solution with Concord reviewers and any DES or floodplain process.",
            },
            {
              heading: "Civil corrections tied to building changes",
              body: "If plan check changes a footprint, entrance, foundation, or ADU, update contours, drainage areas, utility profiles, fire access, and maintenance notes. Keep the civil and structural finished-floor assumptions identical.",
            },
          ],
          permitSteps: [
            "Confirm Concord planning, zoning, engineering, public-works, floodplain, fire-access, right-of-way, historic, and New Hampshire DES triggers for the site.",
            "Verify survey datum, easements, utility ownership, outfall and receiving drainage, finished-floor elevation, soil infiltration, and sewer or septic constraints.",
            "Prepare coordinated grading, drainage, erosion, utility, accessible-route, fire-access, snow-storage, and maintenance plans with the permit drawings.",
            "Respond to each Concord comment with revised contours, profiles, calculations, details, and a clear record of changed assumptions and accepted maintenance duties.",
          ],
          faqs: [
            {
              question: "Can a Concord residential addition avoid civil review?",
              answer: "It may have a limited route, but changed grades, roof runoff, flood exposure, sewer or septic demand, access, easements, or impervious area can require site documentation. Confirm the address-specific checklist before deciding.",
            },
            {
              question: "What does the Concord floodplain review affect?",
              answer: "It can affect finished-floor elevation, grading, drainage, foundations, utilities, materials, and the relationship to public or receiving systems. Use parcel-specific flood information and identify which authority reviews each item.",
            },
            {
              question: "What evidence supports a Concord drainage correction?",
              answer: "Provide revised survey-based contours, drainage areas, profiles, calculations, outfall ownership, protection details, and maintenance responsibilities. Cross-reference the building and utility sheets changed by the same correction.",
            },
          ],
          sources: [
            { label: "City of Concord Building and Permitting", url: "https://www.concordnh.gov/496/Building-Permits" },
            { label: "Concord Planning Department", url: "https://www.concordnh.gov/planning" },
            { label: "Concord General Services and Public Works", url: "https://www.concordnh.gov/491/General-Services-Public-Works" },
            { label: "New Hampshire DES Alteration of Terrain", url: "https://www.des.nh.gov/business-and-community/permits-permit-by-rule/alteration-terrain" },
            { label: "New Hampshire floodplain management", url: "https://www.nh.gov/osi/planning/services/floodplain-management/" },
          ],
        },
        {
          serviceSlug: "energy-compliance",
          title: "Concord Energy Compliance for Historic and Modernized Buildings",
          description: "Concord energy documentation for older envelopes, cold-climate systems, offices, homes, additions, and coordinated permit review.",
          h1: "Energy Compliance for Concord, New Hampshire",
          kicker: "Cold-climate documentation for rehabilitation and additions",
          lede: "Concord energy compliance ties the adopted New Hampshire path to the actual envelope, heating, ventilation, lighting, service-water, and control design. Downtown masonry, older homes, snow, and damp basements make constructable details as important as the calculation.",
          permitAuthority: "Concord Building and Permitting confirms the local energy submittal route. Planning, zoning, historic, fire, public works, utility, and flood reviews remain separate when triggered by the address or alteration.",
          codeContext: "Confirm the current New Hampshire energy-code edition, occupancy, climate inputs, alteration category, accepted forms, and review sequence with Concord. Ensure the analysis, architectural details, MEP schedules, and field notes describe the same assemblies and systems.",
          localConditions: "Cold winters, ice dams, snow, damp basements, older masonry, river-valley humidity, wooded exposures, and freeze-thaw affect air sealing, moisture safety, thermal bridges, heat pumps, ventilation, and controls.",
          projectTypes: "Concord scopes include historic or downtown rehabilitation, offices, multifamily work, ADUs, and residential additions. A new window, wall, HVAC system, or occupancy can change compliance even when most of an existing structure remains.",
          sections: [
            {
              heading: "Concord envelope and historic interfaces",
              body: "Document the actual masonry, wood, roof, foundation, glazing, air barrier, and insulation conditions in the affected area. Where historic fabric or existing layers constrain work, state the selected assembly and moisture approach instead of using an idealized label.",
            },
            {
              heading: "Systems, controls, and winter operation",
              body: "Heating, heat pumps, ventilation, filtration, lighting controls, service water, and condensate should be coordinated with cold-weather exposure and the MEP set. A utility incentive or operating target is not a substitute for the adopted code analysis.",
            },
            {
              heading: "Concord correction documentation",
              body: "Cite the requested code provision or input, update the form or model, and revise the affected envelope detail, equipment schedule, and architectural note. Preserve a single coordinated record when plan check changes a window, wall, or HVAC system.",
            },
          ],
          permitSteps: [
            "Ask Concord Building and Permitting to confirm the current New Hampshire energy path, climate inputs, alteration category, historic coordination, forms, and submission order.",
            "Collect verified assemblies, glazing, shading, heating and cooling, ventilation, lighting, controls, service-water, and utility inputs from the design team.",
            "Cross-check modeled values against architectural details, structural penetrations, MEP equipment, fire separations, historic constraints, and field installation notes.",
            "Answer each energy correction with its citation, revised form or input, updated detail, and coordinated references to all changed permit sheets.",
          ],
          faqs: [
            {
              question: "How does a Concord historic alteration affect energy review?",
              answer: "The applicable code path and local historic requirements may constrain assemblies, windows, or exterior work while still requiring a documented energy approach. Concord should confirm the route for the specific building and proposed alteration.",
            },
            {
              question: "What should a Concord ADU energy record include?",
              answer: "It should classify the alteration and show the affected envelope, glazing, heating, ventilation, lighting, service water, and controls, coordinated with the existing dwelling. Shared-system assumptions need field and load verification.",
            },
            {
              question: "Can a Concord model stand alone after plan check?",
              answer: "No when a reviewer changes a physical assembly or system. Update the model or forms and the architectural and MEP documents so the permitted design remains buildable and traceable.",
            },
          ],
          sources: [
            { label: "City of Concord Building and Permitting", url: "https://www.concordnh.gov/496/Building-Permits" },
            { label: "Concord Planning Department", url: "https://www.concordnh.gov/planning" },
            { label: "New Hampshire State Building Code", url: "https://www.nh.gov/safety/divisions/firesafety/buildingcode/" },
            { label: "New Hampshire energy code resources", url: "https://www.nh.gov/safety/divisions/firesafety/buildingcode/energy-code.htm" },
            { label: "New Hampshire Board of Professional Engineers", url: "https://www.oplc.nh.gov/board-professional-engineers" },
          ],
        },
        {
          serviceSlug: "pe-stamped-drawings",
          title: "Concord PE-Stamped Drawings for Capital-Area Projects",
          description: "Concord sealed engineering packages with defined scope, site evidence, code criteria, and review-ready correction records.",
          h1: "PE-Stamped Drawings for Concord, New Hampshire",
          kicker: "Professional scope for local building and site review",
          lede: "A Concord PE-stamped package should identify the project, discipline, code basis, design criteria, calculations, existing-condition evidence, and limitations actually reviewed. It supports a permit record without claiming approval, legal identity, or responsibility beyond the defined scope.",
          permitAuthority: "Concord Building and Permitting is the building reviewer, while planning, zoning, fire, historic, public works, flood, health, environmental, and utility authorities may separately review the work. Establish the discipline and sheets that require professional responsibility.",
          codeContext: "State the current New Hampshire code editions and Concord submission requirements, along with assumptions for occupancy, snow, wind, flood, frost, soils, historic fabric, utilities, and existing construction. A professional seal should follow that documented review.",
          localConditions: "River floodplains, granite, glacial soils, wooded slopes, snow, frost, downtown masonry, and older utilities may require survey, geotechnical, flood, utility, historic, or specialty information before sealing.",
          projectTypes: "The defined record may support capital-area offices, downtown rehabilitation, commercial interiors, ADUs, additions, and river-valley site work. Identify interfaces with civil, architecture, fire, energy, MEP, survey, and geotechnical professionals.",
          sections: [
            {
              heading: "Concord responsibility and limitations",
              body: "List the address, occupancy, code path, drawings, calculations, field observations, assumptions, exclusions, and consultant interfaces. State unresolved conditions so the seal is not read as confirmation of unobserved construction or unrelated disciplines.",
            },
            {
              heading: "Evidence for river and downtown work",
              body: "Flood elevations, ledge, frost, snow, masonry condition, utility capacity, historic constraints, and public access can change the design. Cite the information relied on and identify the professional boundary for each outside recommendation.",
            },
            {
              heading: "Concord revision control",
              body: "Use a dated response matrix, revision clouds, changed calculations, and responsible-professional review for plan-check comments, substitutions, RFIs, and field conditions. An addition or ADU change should be traced through all affected sealed sheets.",
            },
          ],
          permitSteps: [
            "Identify Concord’s enforcing authority, occupancy, current code editions, checklist, discipline boundary, historic or flood interfaces, and seal format.",
            "Assemble survey, field, geotechnical, flood, utility, historic, calculation, design-criteria, and consultant-boundary information for the actual project.",
            "Have the responsible professional review coordinated notes, details, schedules, calculations, and architectural, civil, MEP, fire, and energy interfaces.",
            "Route each Concord correction, substitution, RFI, and field observation through that professional and issue revised sealed sheets only when the defined scope changes.",
          ],
          faqs: [
            {
              question: "What does a Concord PE seal not cover?",
              answer: "It does not automatically cover architecture, land surveying, geotechnical opinions, utilities, environmental approvals, historic decisions, construction means, or disciplines outside the identified scope. The drawing index and limitations should say what was reviewed.",
            },
            {
              question: "Does a sealed Concord package guarantee a permit?",
              answer: "No. Concord and other authorities can request corrections and separate approvals. A seal records professional responsibility for defined documents, while acceptance remains a governmental review decision.",
            },
            {
              question: "How should a Concord field change be handled?",
              answer: "Record the condition, compare it with the sealed design, evaluate the affected calculation and sheets, and document responsible-professional review. Ask Concord whether the change requires a permit revision before treating it as resolved.",
            },
          ],
          sources: [
            { label: "City of Concord Building and Permitting", url: "https://www.concordnh.gov/496/Building-Permits" },
            { label: "Concord Planning Department", url: "https://www.concordnh.gov/planning" },
            { label: "Concord General Services and Public Works", url: "https://www.concordnh.gov/491/General-Services-Public-Works" },
            { label: "New Hampshire State Building Code", url: "https://www.nh.gov/safety/divisions/firesafety/buildingcode/" },
            { label: "New Hampshire Board of Professional Engineers", url: "https://www.oplc.nh.gov/board-professional-engineers" },
          ],
        },
      ],
    },
    {
      slug: "portsmouth",
      name: "Portsmouth",
      county: "Rockingham County",
      services: [
        {
          serviceSlug: "structural-engineering",
          title: "Portsmouth Structural Engineering for Historic Coastal Buildings",
          description: "Portsmouth structural permit support for historic rehabilitation, coastal additions, salt exposure, flooding, and constrained urban sites.",
          h1: "Structural Engineering for Portsmouth, New Hampshire",
          kicker: "Load paths for historic fabric and coastal exposure",
          lede: "Portsmouth structural design must reconcile the City’s building and historic review with the actual framing and coastal site evidence. Salt air, tidal flooding, old masonry and wood, narrow rights-of-way, and snow can make preservation and structural safety inseparable.",
          permitAuthority: "Portsmouth Building Inspection administers the building review, while Planning, zoning, historic-district, flood, public works, coastal, and utility reviews may be separate. Confirm the property’s district, flood status, and applicable authority before issuing the set.",
          codeContext: "Confirm the New Hampshire State Building Code and Portsmouth’s current requirements for occupancy, alteration, historic work, coastal exposure, floodplain, snow, wind, and egress. Existing conditions and preservation constraints should be stated in the structural criteria.",
          localConditions: "Atlantic wind and salt, tidal flooding, low-lying fill, wetlands, old masonry and wood framing, snow, narrow streets, and constrained utility corridors affect foundations, connections, materials, and construction sequence.",
          projectTypes: "Portsmouth scopes include historic rehabilitation, waterfront tenant improvements, mixed-use infill, coastal additions, ADUs, and accessibility upgrades. An addition or ADU can change egress, fire separation, foundation loads, and MEP penetrations within protected fabric.",
          sections: [
            {
              heading: "Portsmouth historic framing evidence",
              body: "Old brick, timber, plaster, joists, and prior alterations should be observed with the preservation scope in mind before designing openings or reinforcements. Document concealed-condition limits and coordinate reversible or minimally invasive details with the architectural record.",
            },
            {
              heading: "Coastal flood, salt, and foundation criteria",
              body: "Tidal elevations, low fill, corrosion exposure, wind, frost, and snow can affect finished floors, foundations, connections, material selection, and flood-resistant detailing. Use parcel-specific survey and flood information and coordinate the structural-civil interface.",
            },
            {
              heading: "Portsmouth correction coordination",
              body: "Answer Building Inspection or historic comments with the revised calculation, detail, and sheet reference while identifying changes to preservation, fire, MEP, and civil work. Do not leave a field condition or substitution unresolved because it appears visually minor.",
            },
          ],
          permitSteps: [
            "Confirm Portsmouth jurisdiction, occupancy, current New Hampshire code, historic-district status, flood and coastal criteria, snow and wind, and zoning triggers.",
            "Obtain survey, framing and masonry observations, foundation evidence, flood information, corrosion exposure, geotechnical recommendations, roof loads, and construction sequencing.",
            "Coordinate foundations, connections, openings, shoring, special inspections, fire separations, flood-resistant details, and MEP penetrations with the preservation set.",
            "Answer every Portsmouth correction in a dated matrix, cloud changes, update linked calculations, and obtain responsible-professional review before resubmission.",
          ],
          faqs: [
            {
              question: "How does Portsmouth historic review affect structural work?",
              answer: "The historic district may influence visibility, removals, materials, and reversible detailing while the building review still requires a safe load path. Coordinate both records for the actual property rather than treating preservation as a finish-only issue.",
            },
            {
              question: "What coastal information belongs in a Portsmouth foundation design?",
              answer: "Parcel flood elevations, fill and soil evidence, frost, corrosion exposure, finished-floor criteria, drainage, and the proposed construction sequence can all matter. Confirm sources and required review with the city and appropriate specialists.",
            },
            {
              question: "Who accepts a Portsmouth structural correction?",
              answer: "Portsmouth’s applicable building or historic reviewer decides the correction within that authority’s scope. The responsible professional documents technical changes, but neither a seal nor a preservation recommendation guarantees approval.",
            },
          ],
          sources: [
            { label: "City of Portsmouth Building Inspection", url: "https://www.portsmouthnh.gov/inspection" },
            { label: "Portsmouth Planning and Historic Preservation", url: "https://www.portsmouthnh.gov/historic-district-commission" },
            { label: "Portsmouth Public Works", url: "https://www.portsmouthnh.gov/publicworks" },
            { label: "New Hampshire State Building Code", url: "https://www.nh.gov/safety/divisions/firesafety/buildingcode/" },
            { label: "New Hampshire floodplain management", url: "https://www.nh.gov/osi/planning/services/floodplain-management/" },
          ],
        },
        {
          serviceSlug: "mep-engineering",
          title: "Portsmouth MEP Engineering for Coastal and Historic Interiors",
          description: "Portsmouth mechanical, electrical, and plumbing coordination for historic interiors, coastal additions, utilities, and winter systems.",
          h1: "MEP Engineering for Portsmouth, New Hampshire",
          kicker: "Modern systems within coastal and historic constraints",
          lede: "Portsmouth MEP engineering must fit heating, ventilation, service capacity, plumbing, and controls into historic fabric and constrained coastal infrastructure. Salt, tidal exposure, narrow rights-of-way, and older shared systems make field verification and coordination essential.",
          permitAuthority: "Portsmouth Building Inspection reviews the building path, while Planning, historic-district, fire, zoning, public works, water, sewer, and electric or gas providers may have separate requirements. Establish the address-specific review sequence before final system selection.",
          codeContext: "Confirm the New Hampshire mechanical, plumbing, electrical, energy, and fire provisions accepted by Portsmouth and identify historic or flood-related conditions. Equipment, risers, loads, controls, and energy forms must describe the same installation.",
          localConditions: "Coastal salt, tidal flooding, low-lying sites, old masonry, narrow shafts, snow, winter freeze, and constrained utility corridors affect equipment placement, corrosion, ventilation, condensate, panels, and sanitary routing.",
          projectTypes: "Portsmouth scopes include historic tenant improvements, waterfront interiors, mixed-use infill, coastal additions, ADUs, and accessibility upgrades. A new dwelling or bath can change fire separation, ventilation, water, sewer, panel, and energy requirements.",
          sections: [
            {
              heading: "Portsmouth historic-system investigation",
              body: "Trace existing panels, feeders, boilers, shafts, water services, sanitary routes, controls, and equipment clearances before routing new work through protected interiors. Identify shared or abandoned systems and document access limitations.",
            },
            {
              heading: "Coastal MEP durability and utilities",
              body: "Salt, flood exposure, winter freeze, ventilation, combustion, filtration, condensate, and service access should inform equipment and materials. Portsmouth water and sewer, public works, and utility-provider information should be reconciled with project loads and flood details.",
            },
            {
              heading: "Portsmouth correction record",
              body: "A comment about an equipment location, fire damper, panel, ventilation rate, or sanitary route can affect historic trim, structure, energy, and accessibility. Revise the coordinated drawings and explain the preservation and flood interfaces in the response.",
            },
          ],
          permitSteps: [
            "Confirm Portsmouth AHJ, occupancy, current mechanical, plumbing, electrical, energy, fire, flood, and historic requirements and identify each utility provider.",
            "Field-trace existing equipment and services; obtain electric, gas, water, sewer, and fire-flow information and establish loads, ventilation, freeze, and corrosion criteria.",
            "Coordinate equipment, shafts, combustion air, condensate, flood protection, controls, clearances, accessibility, fire separation, and preservation details.",
            "Answer each Portsmouth correction with the cited issue, revised schedule or riser, updated calculation, historic or utility record, and references to all changed sheets.",
          ],
          faqs: [
            {
              question: "How can a Portsmouth historic interior affect MEP routing?",
              answer: "Protected finishes, old shafts, limited access, fire separations, and preservation conditions can constrain equipment and distribution. The design should document field evidence and coordinate any visible or penetrative work with the applicable city review.",
            },
            {
              question: "What does a Portsmouth coastal addition change in MEP design?",
              answer: "Flood exposure, corrosion, winter freeze, service capacity, water and sewer routing, ventilation, fire separation, and energy documentation may all change. Use the parcel’s flood and utility information rather than treating it as an ordinary interior addition.",
            },
            {
              question: "Can Portsmouth utility correspondence replace MEP calculations?",
              answer: "No. Provider information establishes available service or connection conditions; the engineering record still needs project loads, equipment, distribution, controls, clearances, and coordinated code documentation.",
            },
          ],
          sources: [
            { label: "City of Portsmouth Building Inspection", url: "https://www.portsmouthnh.gov/inspection" },
            { label: "Portsmouth Water Division", url: "https://www.portsmouthnh.gov/publicworks/water" },
            { label: "Portsmouth Public Works", url: "https://www.portsmouthnh.gov/publicworks" },
            { label: "New Hampshire State Building Code", url: "https://www.nh.gov/safety/divisions/firesafety/buildingcode/" },
            { label: "New Hampshire energy code resources", url: "https://www.nh.gov/safety/divisions/firesafety/buildingcode/energy-code.htm" },
          ],
        },
        {
          serviceSlug: "civil-engineering",
          title: "Portsmouth Civil Engineering for Tidal and Historic Sites",
          description: "Portsmouth civil engineering for coastal drainage, flood, utilities, access, wetlands, grading, and constrained historic parcels.",
          h1: "Civil Engineering for Portsmouth, New Hampshire",
          kicker: "Tidal elevations, drainage, utilities, and public frontage",
          lede: "Portsmouth civil plans must connect a building to tidal flood information, public frontage, drainage, utilities, fire access, and historic site constraints. Low fill, wetlands, narrow rights-of-way, and coastal rainfall make parcel-specific survey and agency coordination essential.",
          permitAuthority: "Portsmouth Building Inspection is one reviewing authority. Planning, zoning, historic preservation, public works, flood, wetlands, health, fire, and New Hampshire DES may each review a site or disturbance according to the address.",
          codeContext: "Confirm Portsmouth’s current site, zoning, driveway, drainage, floodplain, coastal, right-of-way, erosion, and historic requirements and any DES threshold. Building approval does not authorize unreviewed shoreland, wetland, septic, utility, or public-frontage work.",
          localConditions: "Tidal flooding, low-lying fill, coastal wetlands, salt, old drainage, narrow streets, snow, constrained utilities, and intense rainfall affect finished floors, infiltration, outfalls, erosion, and accessible routes.",
          projectTypes: "Portsmouth work includes waterfront interiors, historic rehabilitation, mixed-use infill, coastal additions, ADUs, and accessibility projects. Small changes can alter roof runoff, flood elevation, fire access, sewer connections, parking, easements, and historic site features.",
          sections: [
            {
              heading: "Portsmouth coastal survey and frontage",
              body: "Show boundaries, easements, tidal and flood information, contours, rights-of-way, sidewalks, utilities, hydrants, inlets, fire access, historic site features, and the receiving system from current survey control. State limitations where buried infrastructure or low-relief grades are uncertain.",
            },
            {
              heading: "Tidal flood, wetlands, and drainage",
              body: "Tidal elevations, fill, groundwater, wetlands, salt exposure, snowmelt, and intense rain can control finished floors, grading, infiltration, erosion, pipe profiles, and outlet protection. Coordinate municipal, DES, flood, and utility requirements before fixing the site solution.",
            },
            {
              heading: "Portsmouth small-site corrections",
              body: "If a footprint, entrance, addition, or ADU changes, update drainage areas, finished floors, utility profiles, accessible routes, fire access, and maintenance notes. Keep historic and coastal constraints visible in the response rather than hiding them in a general note.",
            },
          ],
          permitSteps: [
            "Confirm Portsmouth planning, zoning, public-works, flood, wetlands, fire-access, right-of-way, historic, coastal, and New Hampshire DES triggers for the address.",
            "Verify survey datum, tidal and flood information, easements, utility ownership, outfall and receiving drainage, finished-floor elevation, infiltration, and sewer or septic constraints.",
            "Prepare coordinated grading, drainage, erosion, utility, accessible-route, fire-access, snow-storage, flood, and maintenance plans with the building and historic set.",
            "Respond to every Portsmouth comment with revised contours, profiles, calculations, details, and a record of changed flood, historic, utility, and maintenance assumptions.",
          ],
          faqs: [
            {
              question: "Why can a Portsmouth ADU need civil documentation?",
              answer: "A new dwelling can change flood exposure, finished floor, roof runoff, sewer demand, fire access, parking, utilities, easements, and historic site conditions. The city and applicable environmental authorities determine the required scope for the parcel.",
            },
            {
              question: "Who reviews Portsmouth tidal or wetland issues?",
              answer: "Portsmouth planning, public works, building, flood, and historic reviewers may address different site issues, while New Hampshire DES or another environmental authority can have separate jurisdiction. Confirm the actual route instead of assigning every issue to one office.",
            },
            {
              question: "What should a Portsmouth drainage correction show?",
              answer: "Show the changed survey-based grades, flood or tidal reference, drainage areas, profiles, outfall, erosion protection, utility interfaces, and maintenance responsibility. Cross-reference the building, accessibility, historic, and flood documents affected.",
            },
          ],
          sources: [
            { label: "City of Portsmouth Building Inspection", url: "https://www.portsmouthnh.gov/inspection" },
            { label: "Portsmouth Planning and Historic Preservation", url: "https://www.portsmouthnh.gov/historic-district-commission" },
            { label: "Portsmouth Public Works", url: "https://www.portsmouthnh.gov/publicworks" },
            { label: "New Hampshire DES Alteration of Terrain", url: "https://www.des.nh.gov/business-and-community/permits-permit-by-rule/alteration-terrain" },
            { label: "New Hampshire floodplain management", url: "https://www.nh.gov/osi/planning/services/floodplain-management/" },
          ],
        },
        {
          serviceSlug: "energy-compliance",
          title: "Portsmouth Energy Compliance for Coastal Historic Renovations",
          description: "Portsmouth energy documentation for historic envelopes, coastal exposure, winter systems, additions, ADUs, and permit coordination.",
          h1: "Energy Compliance for Portsmouth, New Hampshire",
          kicker: "Cold-climate and coastal envelope documentation",
          lede: "Portsmouth energy compliance must align the adopted New Hampshire path with historic envelope constraints, coastal exposure, windows, heating, ventilation, lighting, service water, and controls. Moisture, salt, wind, and winter conditions make the selected detail as important as the modeled value.",
          permitAuthority: "Portsmouth Building Inspection confirms the energy submittal path, while Planning, historic preservation, fire, zoning, flood, utility, and public-works review may apply separately. Confirm the address-specific alteration route and preservation limits.",
          codeContext: "Confirm the current New Hampshire energy-code edition, climate inputs, occupancy, alteration category, historic coordination, forms, and local review sequence with Portsmouth. The energy record must match the architectural and MEP permit documents.",
          localConditions: "Coastal wind and salt, tidal exposure, snow, ice dams, old masonry and wood, damp basements, and narrow assemblies affect air sealing, thermal bridges, moisture safety, heat pumps, ventilation, and controls.",
          projectTypes: "Portsmouth scopes include historic rehabilitation, waterfront tenant improvements, coastal additions, ADUs, and mixed-use infill. A new window, wall, HVAC unit, or dwelling unit may alter compliance even when preservation limits the visible work.",
          sections: [
            {
              heading: "Portsmouth historic envelope choices",
              body: "Document existing masonry, wood framing, glazing, roofs, foundations, air barriers, and insulation in the affected areas. Coordinate window, insulation, vapor, and air-sealing decisions with the historic record and a moisture-safe construction detail.",
            },
            {
              heading: "Coastal equipment and controls",
              body: "Heating, ventilation, filtration, corrosion exposure, flood or condensate routing, lighting controls, service water, and equipment access should reflect the actual site. Incentives and projected savings are separate from the code compliance record.",
            },
            {
              heading: "Portsmouth energy corrections",
              body: "When a reviewer changes an assembly or equipment input, cite the requirement, update the form or model, and revise the visible architectural and MEP details. Keep historic, flood, fire, and accessibility interfaces in the same correction response.",
            },
          ],
          permitSteps: [
            "Ask Portsmouth Building Inspection to confirm the current New Hampshire energy path, climate inputs, alteration category, historic coordination, forms, and submission order.",
            "Collect verified assemblies, glazing, shading, heating and cooling, ventilation, lighting, controls, service-water, flood, and utility inputs.",
            "Cross-check modeled values against architectural and historic details, structural penetrations, MEP equipment, fire separations, moisture strategy, and field installation notes.",
            "Answer each energy correction with its citation, revised form or input, updated assembly or equipment detail, and references to all changed permit sheets.",
          ],
          faqs: [
            {
              question: "How does Portsmouth historic preservation affect energy compliance?",
              answer: "Preservation requirements may constrain windows, exterior insulation, visible equipment, or penetrations while the applicable energy path still needs documentation. Coordinate the accepted approach with both Portsmouth reviewers for the specific building.",
            },
            {
              question: "What energy issues are common in a Portsmouth coastal addition?",
              answer: "The design may need to coordinate wind, salt, moisture, flood or condensate routing, cold-weather heating, ventilation, glazing, fire separation, and shared services. Use parcel and assembly evidence rather than a generic coastal detail.",
            },
            {
              question: "Can a Portsmouth energy form resolve a historic detail comment?",
              answer: "No. The form documents the selected compliance inputs; a historic or construction-detail comment requires coordinated drawings and notes that show the approved, buildable assembly.",
            },
          ],
          sources: [
            { label: "City of Portsmouth Building Inspection", url: "https://www.portsmouthnh.gov/inspection" },
            { label: "Portsmouth Planning and Historic Preservation", url: "https://www.portsmouthnh.gov/historic-district-commission" },
            { label: "New Hampshire State Building Code", url: "https://www.nh.gov/safety/divisions/firesafety/buildingcode/" },
            { label: "New Hampshire energy code resources", url: "https://www.nh.gov/safety/divisions/firesafety/buildingcode/energy-code.htm" },
            { label: "New Hampshire Board of Professional Engineers", url: "https://www.oplc.nh.gov/board-professional-engineers" },
          ],
        },
        {
          serviceSlug: "pe-stamped-drawings",
          title: "Portsmouth PE-Stamped Drawings for Coastal Review",
          description: "Portsmouth sealed engineering packages defining professional scope, coastal evidence, preservation interfaces, and corrections.",
          h1: "PE-Stamped Drawings for Portsmouth, New Hampshire",
          kicker: "Defined responsibility for historic and coastal permits",
          lede: "A Portsmouth PE-stamped set should state the parcel, discipline, code basis, coastal and historic inputs, calculations, assumptions, and limitations actually reviewed. It supports a transparent permit record without suggesting approval, legal identity, or responsibility outside the defined scope.",
          permitAuthority: "Portsmouth Building Inspection reviews the building permit, while Planning, historic preservation, zoning, fire, public works, flood, wetlands, health, environmental, and utility authorities may separately review the work. Determine the required discipline and seal for each sheet.",
          codeContext: "Identify current New Hampshire code editions and Portsmouth submission requirements, including occupancy, snow, wind, flood, frost, historic, coastal, soil, and utility assumptions. Preserve the source and limitation of each design criterion.",
          localConditions: "Tidal flooding, low fill, salt, old masonry, historic finishes, narrow rights-of-way, snow, wetlands, and constrained utilities may require survey, geotechnical, flood, utility, historic, or specialty records before sealing.",
          projectTypes: "The defined scope may support historic rehabilitation, waterfront interiors, mixed-use infill, coastal additions, ADUs, and accessibility work. Identify interfaces with civil, architecture, historic, MEP, fire, survey, geotechnical, and environmental professionals.",
          sections: [
            {
              heading: "Portsmouth seal scope and evidence",
              body: "List the property, occupancy, code path, drawing index, calculations, field observations, flood and coastal criteria, assumptions, exclusions, and consultant boundaries. Do not treat a seal as confirmation of concealed framing, utility capacity, or an unreviewed historic decision.",
            },
            {
              heading: "Historic and coastal interfaces",
              body: "Flood elevations, salt, wind, frost, old masonry, preservation requirements, public access, and utility constraints can change the design. Record what each source supports and identify which authority must decide a separate approval.",
            },
            {
              heading: "Portsmouth revision accountability",
              body: "Use a dated matrix for building, historic, flood, utility, and plan-check comments, then cloud sheets and update calculations. Record responsible-professional review for substitutions, RFIs, and field changes affecting sealed work.",
            },
          ],
          permitSteps: [
            "Identify Portsmouth’s enforcing authority, occupancy, current code editions, historic and flood interfaces, checklist, discipline boundary, and seal format.",
            "Assemble survey, field, soil, flood, tidal, utility, historic, calculation, design-criteria, and consultant-boundary records for the actual scope.",
            "Have the responsible professional review coordinated notes, details, schedules, calculations, and architecture, civil, MEP, fire, energy, and preservation interfaces.",
            "Route every Portsmouth correction, substitution, RFI, and field condition through the responsible professional and issue revised sealed sheets only when the defined scope changes.",
          ],
          faqs: [
            {
              question: "What does a Portsmouth PE seal cover?",
              answer: "It covers the identified professional discipline and documents after the responsible professional’s review, subject to stated assumptions and limitations. It does not replace historic, flood, utility, environmental, surveying, or construction approvals.",
            },
            {
              question: "Does a Portsmouth seal guarantee historic or building approval?",
              answer: "No. Building Inspection and other city authorities retain their own review decisions and may request corrections. The seal records professional responsibility for defined work, not an approval outcome.",
            },
            {
              question: "How should Portsmouth coastal field changes be documented?",
              answer: "Record the observed condition, flood or preservation implication, affected calculation and drawing, revision cloud, and responsible-professional decision. Confirm with Portsmouth whether the change requires a revised permit or separate historic review.",
            },
          ],
          sources: [
            { label: "City of Portsmouth Building Inspection", url: "https://www.portsmouthnh.gov/inspection" },
            { label: "Portsmouth Planning and Historic Preservation", url: "https://www.portsmouthnh.gov/historic-district-commission" },
            { label: "Portsmouth Public Works", url: "https://www.portsmouthnh.gov/publicworks" },
            { label: "New Hampshire State Building Code", url: "https://www.nh.gov/safety/divisions/firesafety/buildingcode/" },
            { label: "New Hampshire Board of Professional Engineers", url: "https://www.oplc.nh.gov/board-professional-engineers" },
          ],
        },
      ],
    },
    {
      slug: "dover",
      name: "Dover",
      county: "Strafford County",
      services: [
        {
          serviceSlug: "structural-engineering",
          title: "Dover Structural Engineering for Mill and River Sites",
          description: "Dover structural permit support for mill conversion, river areas, additions, snow, frost, and mixed-age buildings.",
          h1: "Structural Engineering for Dover, New Hampshire",
          kicker: "Foundations and framing for Cocheco-area projects",
          lede: "Dover structural engineering starts with Inspection Services, the actual building, and parcel-specific river and soil evidence. Cocheco and Bellamy flood areas, old mills, glacial soils, granite, frost, and snow can change the required load path and construction sequence.",
          permitAuthority: "Dover Inspection Services is the local building authority, with planning, zoning, fire, engineering, flood, public works, and utility reviews potentially separate. Confirm the address-specific route and current submittal requirements before final structural design.",
          codeContext: "Confirm the New Hampshire State Building Code and Dover’s current requirements for occupancy, alteration, snow, wind, flood, frost, zoning, and any historic or change-of-use condition. State the design criteria and existing-condition limitations in the set.",
          localConditions: "Cocheco and Bellamy river floodplains, glacial soils, granite, coastal-influenced rainfall, snow, freeze-thaw, older mill neighborhoods, and constrained utility corridors affect foundations, lateral systems, connections, and access.",
          projectTypes: "Dover work includes mill conversion, downtown infill, river-area additions, ADUs, multifamily rehabilitation, and suburban commercial renovations. An addition or ADU can change egress, fire separation, foundation loads, service penetrations, and drainage interfaces.",
          sections: [
            {
              heading: "Dover mill and existing-condition evidence",
              body: "Old timber, masonry, prior industrial openings, altered trusses, and uncertain foundations should be observed before relying on existing capacity. Identify measured conditions, concealed areas, and assumptions in the calculations and drawings.",
            },
            {
              heading: "Cocheco flood, granite, and snow",
              body: "River elevations, flood-resistant construction, ledge, glacial fill, frost, snow drift, and freeze-thaw can affect footings, retaining, finished floors, connections, and materials. Coordinate flood, geotechnical, survey, and structural information for the actual parcel.",
            },
            {
              heading: "Dover plan-check corrections",
              body: "Respond to Inspection Services with a comment citation, revised calculation, detail, and sheet reference. Keep additions, ADUs, MEP openings, fire separations, shoring, and civil finished-floor changes synchronized through the response.",
            },
          ],
          permitSteps: [
            "Confirm Dover jurisdiction, occupancy, current New Hampshire code, snow and wind criteria, flood status, zoning, historic triggers, and the Inspection Services checklist.",
            "Obtain survey, framing and foundation observations, ledge or soil recommendations, flood information, roof loads, retaining geometry, and construction sequencing.",
            "Coordinate foundations, lateral connections, openings, shoring, special inspections, fire separations, flood details, and MEP penetrations with the permit set.",
            "Answer each Dover correction in a dated matrix, cloud revised sheets, update linked calculations, and obtain responsible-professional review before resubmission.",
          ],
          faqs: [
            {
              question: "What should be investigated before a Dover mill addition?",
              answer: "Existing framing, masonry, foundations, prior openings, occupancy, fire separation, flood exposure, and construction sequencing should be evaluated to the extent they affect the proposed loads and permit scope. Nearby mill details are not evidence for this building.",
            },
            {
              question: "How can Cocheco flooding affect Dover structural design?",
              answer: "Parcel flood information can affect finished floors, foundations, materials, utilities, and coordination with civil grading. Confirm the applicable floodplain requirements and do not substitute a general river map for address-specific data.",
            },
            {
              question: "Who accepts Dover structural corrections?",
              answer: "Dover Inspection Services or the applicable reviewing authority determines whether comments are resolved. The responsible professional supplies the technical record and does not guarantee acceptance.",
            },
          ],
          sources: [
            { label: "City of Dover Inspection Services", url: "https://www.dover.nh.gov/government/city-operations/planning/inspection-services/" },
            { label: "Dover Planning Department", url: "https://www.dover.nh.gov/government/city-operations/planning/" },
            { label: "Dover stormwater and engineering", url: "https://www.dover.nh.gov/government/city-operations/community-services/engineering/environmental/stormwater-management/" },
            { label: "New Hampshire State Building Code", url: "https://www.nh.gov/safety/divisions/firesafety/buildingcode/" },
            { label: "New Hampshire floodplain management", url: "https://www.nh.gov/osi/planning/services/floodplain-management/" },
          ],
        },
        {
          serviceSlug: "mep-engineering",
          title: "Dover MEP Engineering for River-Area and Winter Buildings",
          description: "Dover MEP design for mill conversions, additions, ADUs, service capacity, heating, ventilation, water, and sewer coordination.",
          h1: "MEP Engineering for Dover, New Hampshire",
          kicker: "Heating and utility coordination for mixed-age buildings",
          lede: "Dover MEP engineering connects the occupancy, existing services, winter climate, and local permit route. Mill shafts, river-area flood exposure, older panels, and suburban additions can make equipment, distribution, and fire interfaces interdependent.",
          permitAuthority: "Dover Inspection Services handles the local building review, while planning, zoning, fire, public works, water, sewer, and electric or gas providers may impose separate requirements. Confirm the responsible authorities and service territories for the address.",
          codeContext: "Confirm the New Hampshire mechanical, plumbing, electrical, energy, and fire provisions currently accepted by Dover. Use one set of assumptions across load calculations, risers, equipment schedules, energy documents, and fire or flood details.",
          localConditions: "Cold winters, snow, freeze protection, Cocheco and Bellamy flood areas, older industrial shafts, coastal-influenced rainfall, and constrained utility corridors affect heating, ventilation, panels, condensate, sanitary routing, and equipment access.",
          projectTypes: "Dover work includes mill conversions, downtown infill, commercial renovations, multifamily rehabilitation, ADUs, and river-area additions. New dwelling or tenant areas may change panel capacity, water and sewer demand, fire separation, and ventilation.",
          sections: [
            {
              heading: "Dover field verification",
              body: "Trace panels, feeders, boilers, furnaces, shafts, water services, sanitary routes, equipment clearances, and controls before final design. Converted mills often contain shared or abandoned systems that should be identified before a new connection is shown.",
            },
            {
              heading: "Winter, flood, and utility interfaces",
              body: "Heating, outdoor air, combustion, filtration, freeze protection, snow clearance, condensate, flood protection, and service access should reflect the building and site. Dover water and sewer and public works information must be coordinated with provider and project load data.",
            },
            {
              heading: "Dover correction coordination",
              body: "A comment on equipment, panel capacity, ventilation, fire dampers, or sanitary flow can affect energy inputs, structure, flood details, and clearances. Revise the connected schedules, risers, calculations, and drawings and identify each dependency.",
            },
          ],
          permitSteps: [
            "Confirm Dover AHJ, occupancy, accepted mechanical, plumbing, electrical, energy, fire, and flood provisions, and identify water, sewer, electric, and gas providers.",
            "Field-trace existing systems and obtain service, pressure, sewer, and fire-flow information; establish heating, ventilation, domestic-water, sanitary, and electrical loads.",
            "Coordinate equipment, shafts, combustion air, condensate, freeze and flood protection, controls, clearances, accessibility, fire separation, and energy forms.",
            "Answer each Dover correction with the cited issue, revised schedule or riser, updated calculation, provider correspondence, and references to every changed sheet.",
          ],
          faqs: [
            {
              question: "What Dover utility information should precede MEP sizing?",
              answer: "Electric and gas service data, municipal water and sewer connection information, pressure, fire-flow conditions, and existing-system observations should inform the design. Availability from a provider does not by itself prove capacity for the project.",
            },
            {
              question: "How can a Dover addition affect shared systems?",
              answer: "It may increase heating, panel, water, sewer, ventilation, fire-separation, and controls demand. The design should field-verify shared equipment and document whether the existing distribution remains adequate.",
            },
            {
              question: "What belongs in a Dover MEP resubmittal?",
              answer: "Include the reviewer’s citation, changed load or equipment, updated schedule or riser, calculation, utility record, and cross-references to architectural, structural, fire, energy, and flood sheets.",
            },
          ],
          sources: [
            { label: "City of Dover Inspection Services", url: "https://www.dover.nh.gov/government/city-operations/planning/inspection-services/" },
            { label: "Dover wastewater and water quality", url: "https://www.dover.nh.gov/government/city-operations/community-services/engineering/environmental/wastewater/" },
            { label: "Dover stormwater and engineering", url: "https://www.dover.nh.gov/government/city-operations/community-services/engineering/environmental/stormwater-management/" },
            { label: "New Hampshire State Building Code", url: "https://www.nh.gov/safety/divisions/firesafety/buildingcode/" },
            { label: "New Hampshire energy code resources", url: "https://www.nh.gov/safety/divisions/firesafety/buildingcode/energy-code.htm" },
          ],
        },
        {
          serviceSlug: "civil-engineering",
          title: "Dover Civil Engineering for Cocheco and Bellamy Corridors",
          description: "Dover civil plans for river flood, grading, drainage, utilities, access, erosion, and additions across urban and suburban sites.",
          h1: "Civil Engineering for Dover, New Hampshire",
          kicker: "River elevations, drainage, utilities, and site access",
          lede: "Dover civil plans should show how a building, driveway, fire route, utilities, and finished floors connect to public infrastructure and receiving drainage. Cocheco and Bellamy flood areas, glacial ground, granite, snowmelt, and older utility corridors make the site record address-specific.",
          permitAuthority: "Dover Inspection Services is one part of the approval route. Planning, zoning, engineering, public works, fire, flood, wetlands, health, and New Hampshire DES review may apply based on disturbance, frontage, receiving waters, and site conditions.",
          codeContext: "Confirm Dover’s current site, zoning, driveway, drainage, floodplain, right-of-way, erosion, and construction requirements and whether DES review is triggered. A building permit does not replace public-works, environmental, utility, septic, or flood approvals.",
          localConditions: "Cocheco and Bellamy river floodplains, glacial soils, granite, freeze-thaw, snow storage, coastal-influenced rainfall, older drainage, and constrained rights-of-way affect grades, infiltration, retaining, outlets, and finished floors.",
          projectTypes: "Dover scopes include mill conversions, downtown infill, river-area additions, ADUs, multifamily work, and commercial access renovations. A small addition can alter roof runoff, sewer demand, fire access, parking, easements, and accessible routes.",
          sections: [
            {
              heading: "Dover survey and public systems",
              body: "Show parcel boundaries, easements, contours, rights-of-way, sidewalks, hydrants, inlets, utilities, fire access, flood information, and outfalls using current survey control. Industrial or mill sites need explicit assumptions for buried utilities and receiving systems.",
            },
            {
              heading: "River flood, snowmelt, and site grades",
              body: "Flood elevations, glacial till, ledge, snow storage, spring runoff, and intense rain can control finished floors, infiltration, retaining, erosion, pipe profiles, and accessible slopes. Coordinate municipal and DES thresholds before selecting the outlet or grading strategy.",
            },
            {
              heading: "Dover site correction practice",
              body: "If a footprint, foundation, entrance, or ADU changes, update drainage areas, contours, finished floors, utility profiles, fire access, and maintenance notes. A dated response should show how the revised site remains coordinated with structure and building systems.",
            },
          ],
          permitSteps: [
            "Confirm Dover planning, zoning, engineering, public-works, floodplain, wetlands, fire-access, right-of-way, and New Hampshire DES triggers for the address.",
            "Verify survey datum, flood information, easements, utility ownership, outfall and receiving drainage, finished-floor elevation, soil infiltration, and sewer or septic constraints.",
            "Prepare coordinated grading, drainage, erosion, utility, accessible-route, fire-access, snow-storage, flood, and maintenance plans with the building set.",
            "Respond to every Dover comment with revised contours, profiles, calculations, details, and a record of changed flood, utility, access, and maintenance assumptions.",
          ],
          faqs: [
            {
              question: "Why can a Dover addition need a civil plan?",
              answer: "A changed roof, foundation, driveway, or dwelling unit can affect runoff, flood exposure, sewer demand, fire access, easements, parking, and finished floors. The local checklist and parcel evidence determine the necessary documentation.",
            },
            {
              question: "Which Dover authority reviews river or stormwater work?",
              answer: "Dover planning, engineering, public works, building, and flood reviewers may address different portions, while New Hampshire DES or another environmental authority can have separate jurisdiction. Confirm the route for the specific disturbance and receiving system.",
            },
            {
              question: "What should a Dover civil correction include?",
              answer: "Include revised survey-based contours, drainage areas, profiles, calculations, outfall ownership, outlet protection, utility interfaces, fire access, and maintenance responsibility. Cross-reference every building or structural sheet changed by the site correction.",
            },
          ],
          sources: [
            { label: "City of Dover Inspection Services", url: "https://www.dover.nh.gov/government/city-operations/planning/inspection-services/" },
            { label: "Dover Planning Department", url: "https://www.dover.nh.gov/government/city-operations/planning/" },
            { label: "Dover stormwater and engineering", url: "https://www.dover.nh.gov/government/city-operations/community-services/engineering/environmental/stormwater-management/" },
            { label: "New Hampshire DES Alteration of Terrain", url: "https://www.des.nh.gov/business-and-community/permits-permit-by-rule/alteration-terrain" },
            { label: "New Hampshire floodplain management", url: "https://www.nh.gov/osi/planning/services/floodplain-management/" },
          ],
        },
        {
          serviceSlug: "energy-compliance",
          title: "Dover Energy Compliance for Mills and Additions",
          description: "Dover energy documentation for winter envelopes, mill rehabilitation, heating, ventilation, controls, ADUs, and permit review.",
          h1: "Energy Compliance for Dover, New Hampshire",
          kicker: "Cold-climate documentation for river-area buildings",
          lede: "Dover energy compliance aligns the current New Hampshire path with real assemblies, windows, heating, ventilation, lighting, service water, and controls. Mill envelopes, older homes, snow, moisture, and river-area exposure make field evidence and coordinated details essential.",
          permitAuthority: "Dover Inspection Services confirms the local energy submission path. Planning, zoning, fire, flood, historic, utility, and public-works review can be separate when the address or alteration requires it.",
          codeContext: "Confirm the current New Hampshire energy-code edition, occupancy, climate inputs, alteration category, accepted forms, and Dover review sequence. The analysis, architectural details, MEP schedules, and field notes should all describe the same design.",
          localConditions: "Cold winters, ice dams, snow, damp basements, old masonry, mill air leakage, freeze-thaw, and river-area moisture affect insulation continuity, air sealing, thermal bridges, ventilation, heat pumps, and controls.",
          projectTypes: "Dover work includes mill rehabilitation, downtown interiors, commercial renovations, multifamily work, ADUs, and additions. A new dwelling, window, wall, or HVAC system may change compliance even where existing systems remain.",
          sections: [
            {
              heading: "Dover mill and residential envelope evidence",
              body: "Document the actual masonry, wood, roof, foundation, glazing, air barrier, insulation, and thermal-bridge conditions in the affected scope. Existing layers and moisture risks should be reconciled with the selected assembly and field installation sequence.",
            },
            {
              heading: "Winter systems and controls",
              body: "Heating, heat pumps, ventilation, filtration, combustion, lighting controls, service water, condensate, and equipment access should match the building’s exposure and MEP record. Code documentation should remain distinct from utility incentives or operating projections.",
            },
            {
              heading: "Dover energy correction record",
              body: "When a reviewer changes an input or requests a form, cite the provision, update the model or worksheet, and revise the affected assembly, equipment schedule, and detail. Preserve flood, fire, structural, and MEP dependencies in the same response.",
            },
          ],
          permitSteps: [
            "Ask Dover Inspection Services to confirm the current New Hampshire energy path, climate inputs, alteration category, forms, flood or historic coordination, and submission sequence.",
            "Collect verified assemblies, glazing, shading, heating and cooling, ventilation, lighting, controls, service-water, and utility inputs from the coordinated design.",
            "Cross-check modeled values against architectural details, structural penetrations, MEP equipment, fire separations, flood constraints, and field installation notes.",
            "Answer each energy correction with its citation, revised form or input, updated detail or schedule, and references to every changed permit sheet.",
          ],
          faqs: [
            {
              question: "How is a Dover mill alteration classified for energy review?",
              answer: "The current code, occupancy, affected assemblies and systems, alteration category, existing conditions, and Dover’s accepted route determine the documentation. Confirm the classification rather than assuming a mill conversion follows a residential addition path.",
            },
            {
              question: "What should a Dover ADU energy review consider?",
              answer: "Review the addition or ADU’s envelope, glazing, heating, ventilation, lighting, service water, controls, shared systems, and fire interfaces under the applicable alteration route. Field and load evidence should support any shared-service assumption.",
            },
            {
              question: "What if a Dover equipment substitution is proposed?",
              answer: "Recheck the energy inputs, loads, controls, clearances, MEP schedules, and architectural details, then document the revision for Inspection Services. A procurement change should not silently invalidate the permitted compliance record.",
            },
          ],
          sources: [
            { label: "City of Dover Inspection Services", url: "https://www.dover.nh.gov/government/city-operations/planning/inspection-services/" },
            { label: "Dover Planning Department", url: "https://www.dover.nh.gov/government/city-operations/planning/" },
            { label: "New Hampshire State Building Code", url: "https://www.nh.gov/safety/divisions/firesafety/buildingcode/" },
            { label: "New Hampshire energy code resources", url: "https://www.nh.gov/safety/divisions/firesafety/buildingcode/energy-code.htm" },
            { label: "New Hampshire Board of Professional Engineers", url: "https://www.oplc.nh.gov/board-professional-engineers" },
          ],
        },
        {
          serviceSlug: "pe-stamped-drawings",
          title: "Dover PE-Stamped Drawings for Local Permit Coordination",
          description: "Dover sealed engineering documents with defined professional scope, river and soil evidence, code criteria, and correction tracking.",
          h1: "PE-Stamped Drawings for Dover, New Hampshire",
          kicker: "Responsible scope for river, mill, and residential work",
          lede: "A Dover PE-stamped package should identify the parcel, discipline, code basis, calculations, existing-condition evidence, assumptions, and limitations that were actually reviewed. It supports Inspection Services without promising acceptance or extending responsibility beyond the defined professional scope.",
          permitAuthority: "Dover Inspection Services reviews the building permit, while planning, zoning, fire, public works, flood, wetlands, health, environmental, and utility authorities may separately review related work. Confirm the discipline, sheets, and seal requirements for the address.",
          codeContext: "State the current New Hampshire code editions and Dover submission requirements, including occupancy, snow, wind, flood, frost, soils, utilities, and existing construction. Preserve a traceable source for each design criterion.",
          localConditions: "Cocheco and Bellamy flood areas, glacial soils, granite, snow, freeze-thaw, old mills, constrained utilities, and coastal-influenced rainfall may require survey, geotechnical, flood, utility, environmental, or specialty information before sealing.",
          projectTypes: "The defined record may support mill conversions, downtown infill, river-area additions, ADUs, multifamily rehabilitation, and commercial renovations. Identify interfaces with civil, architecture, fire, energy, MEP, survey, geotechnical, and public works professionals.",
          sections: [
            {
              heading: "Dover professional scope and limitations",
              body: "List the address, occupancy, code path, drawing index, calculations, field observations, assumptions, exclusions, and consultant interfaces. State whether the scope includes civil, MEP, construction-phase, substitution, or field-condition review.",
            },
            {
              heading: "River and mill evidence",
              body: "Flood elevations, ledge, frost, snow, masonry condition, service capacity, fire access, and public frontage can change the design. Cite the evidence and identify unresolved conditions rather than presenting an unobserved site or utility fact as confirmed.",
            },
            {
              heading: "Dover correction accountability",
              body: "Use a dated matrix for Inspection Services, planning, flood, utility, and public-works comments, then cloud revisions and update linked calculations. Record responsible-professional review for any substitution, RFI, or field change affecting sealed work.",
            },
          ],
          permitSteps: [
            "Identify Dover’s enforcing authority, occupancy, current code editions, checklist, river or flood interfaces, discipline boundary, and seal format.",
            "Assemble survey, field, soil, flood, utility, calculation, design-criteria, construction-sequence, and consultant-boundary information for the actual scope.",
            "Have the responsible professional review coordinated notes, details, schedules, calculations, and architecture, civil, MEP, fire, energy, and public-works interfaces.",
            "Route every Dover correction, substitution, RFI, and field condition through that professional and issue revised sealed sheets only when the defined scope changes.",
          ],
          faqs: [
            {
              question: "What does a Dover PE seal communicate?",
              answer: "It communicates professional responsibility for the identified discipline and documents, subject to the recorded assumptions and limitations. It does not cover unrelated design, surveying, geotechnical, environmental, utility, or construction decisions.",
            },
            {
              question: "Does a Dover seal guarantee Inspection Services approval?",
              answer: "No. Dover may request corrections and other authorities may require separate permits or records. The seal documents professional review for a defined scope; approval remains the authority’s decision.",
            },
            {
              question: "How should Dover plan-check revisions be issued?",
              answer: "Track each comment, revise affected calculations and sheets, cloud the change, preserve the prior issue, and record responsible-professional review. Ask Dover whether a material field or scope change also requires permit revision.",
            },
          ],
          sources: [
            { label: "City of Dover Inspection Services", url: "https://www.dover.nh.gov/government/city-operations/planning/inspection-services/" },
            { label: "Dover Planning Department", url: "https://www.dover.nh.gov/government/city-operations/planning/" },
            { label: "Dover stormwater and engineering", url: "https://www.dover.nh.gov/government/city-operations/community-services/engineering/environmental/stormwater-management/" },
            { label: "New Hampshire State Building Code", url: "https://www.nh.gov/safety/divisions/firesafety/buildingcode/" },
            { label: "New Hampshire Board of Professional Engineers", url: "https://www.oplc.nh.gov/board-professional-engineers" },
          ],
        },
      ],
    },
  ],
};

export { newHampshireBatch4 };
export default newHampshireBatch4;