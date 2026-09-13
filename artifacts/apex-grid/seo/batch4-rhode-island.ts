import type { Batch2StateExpansion } from "./batch2-core-service-types";

const rhodeIslandBatch4: Batch2StateExpansion = {
  stateSlug: "rhode-island",
  stateName: "Rhode Island",
  stateAbbrev: "RI",
  hub: {
    title: "Rhode Island Engineering Services | Apex Grid",
    description: "Permit-focused structural, MEP, civil, energy, and sealed-drawing support for Rhode Island buildings and sites.",
    h1: "Engineering for Rhode Island Buildings and Sites",
    kicker: "Rhode Island permit coordination",
    lede: "A Rhode Island project can involve municipal building and zoning review alongside fire, historic, floodplain, coastal, wetlands, stormwater, right-of-way, and utility approvals. Engineering starts with the address, the applicable code path, and verified existing conditions.",
    sections: [
      {
        heading: "Municipal review under the Rhode Island code framework",
        body: "The Rhode Island Building Code Commission publishes the state code framework, while each municipality administers local building and development review. The responsible team should confirm the local checklist, adopted editions, amendments, occupancy, alteration category, and any separate fire or zoning submission before drawings are finalized.",
      },
      {
        heading: "Coast, rivers, soils, and older construction",
        body: "Narragansett Bay exposure, river floodplains, salt, snow, freeze-thaw, ledge, fill, groundwater, and historic masonry or wood can change the design evidence needed. Survey, geotechnical information, flood data, utility records, and field observations should support assumptions rather than relying on a statewide template.",
      },
      {
        heading: "Additions, ADUs, and coordinated corrections",
        body: "An addition or ADU may affect load paths, egress, fire separation, heating, ventilation, electrical service, water and sewer demand, grading, impervious area, and energy documentation. When a reviewer changes one assumption, the response should update the affected architectural, civil, structural, MEP, and energy documents together.",
      },
      {
        heading: "Environmental and utility handoffs",
        body: "RIDEM stormwater or wetlands review, municipal floodplain and coastal rules, FEMA mapping, historic review, public-works permits, and utility requirements can remain separate from building approval. A building permit does not by itself authorize wetland alteration, coastal work, floodplain fill, a new outfall, or utility relocation.",
      },
      {
        heading: "Street, driveway, and transportation handoffs",
        body: "A Rhode Island project that changes a driveway, sidewalk, curb, drainage inlet, street opening, or utility crossing may need a municipal public-works or right-of-way approval separate from building review. The road owner can set frontage, sight-distance, accessible-route, pavement-restoration, snow, traffic-control, and construction-staging conditions. Work affecting a state route may require coordination with the Rhode Island Department of Transportation rather than relying on a city permit. Confirm ownership and the applicable access or street-opening process before finalizing civil grades, fire access, or utility alignments; a building approval does not authorize permanent work in public right-of-way.",
      },
    ],
    faqs: [
      {
        question: "Does one Rhode Island office approve every part of a project?",
        answer: "No. The municipality handles its building and local development process, while fire, zoning, historic, floodplain, coastal, wetlands, stormwater, right-of-way, health, and utility authorities may have separate reviews.",
      },
      {
        question: "What should be verified before Rhode Island engineering begins?",
        answer: "Confirm the jurisdiction, occupancy and alteration scope, current code path, survey, soils and groundwater, ledge or fill, flood and coastal status, wetlands, drainage, utilities, historic constraints, and any ADU or addition effects.",
      },
      {
        question: "How should a Rhode Island plan-check response be prepared?",
        answer: "Use a dated matrix that identifies each comment, the applicable requirement, the response, revised sheets or calculations, and unresolved field or agency dependencies. A response documents design work; it does not guarantee approval.",
      },
    ],
    sources: [
      { label: "Rhode Island Building Code Commission", url: "https://ribcc.ri.gov/" },
      { label: "Rhode Island DEM construction stormwater permitting", url: "https://dem.ri.gov/environmental-protection-bureau/water-resources/permitting/stormwater-permitting/construction" },
      { label: "Rhode Island DEM water resources", url: "https://dem.ri.gov/environmental-protection-bureau/water-resources" },
      { label: "FEMA Flood Map Service Center", url: "https://msc.fema.gov/portal/home" },
    ],
  },
  metros: [
    {
      slug: "providence",
      name: "Providence",
      county: "Providence County",
      services: [
        {
          serviceSlug: "structural-engineering",
          title: "Providence structural engineering for urban alterations",
          description: "Structural design for Providence openings, additions, adaptive reuse, and existing-building connections.",
          h1: "Structural Engineering for Providence, Rhode Island",
          kicker: "Urban load paths and existing-building evidence",
          lede: "Providence structural work begins with the actual framing or masonry condition, the proposed load change, and the City of Providence review path. Historic fabric, river corridors, urban fill, and rooftop equipment can make a small alteration an investigation rather than a standard detail.",
          permitAuthority: "The City of Providence Department of Inspection and Standards is the local building review authority for the city. Providence zoning, historic, fire, floodplain, public-works, and utility reviews may be separate and should be confirmed for the parcel.",
          codeContext: "Use the Rhode Island Building Code Commission’s current adopted code information and the City of Providence checklist for occupancy, alteration, wind, snow, seismic, accessibility, and special-inspection requirements. Verify the edition and local review triggers before sealing a set.",
          localConditions: "Dense masonry and wood construction, undocumented renovations, urban fill, high groundwater, Woonasquatucket and Providence River flooding, snow, and coastal storm exposure can affect foundations, lateral connections, and finished-floor decisions.",
          projectTypes: "Typical scopes include mill or warehouse reuse, downtown tenant improvements, historic additions, multifamily rehabilitation, residential additions, and ADUs. Each can change diaphragms, fire separations, egress, utilities, or the existing foundation.",
          sections: [
            {
              heading: "Field evidence for Providence masonry and wood",
              body: "A new opening, rooftop unit, addition, or change of occupancy should be tied to probes, dimensions, prior permits, and observed connections. Old brick bearing walls, timber framing, infill, and repaired members cannot be assigned capacity from age or appearance alone.",
            },
            {
              heading: "Flood, fill, and city interfaces",
              body: "Flood elevations, groundwater, urban fill, and river-side exposure may influence foundation details, equipment supports, corrosion protection, and the civil-structural boundary. Coordinate with Providence zoning and public works, FEMA mapping, utilities, and any historic review instead of treating the building permit as the whole approval.",
            },
            {
              heading: "Providence correction responses",
              body: "A useful response names the Inspection and Standards comment, cites the governing provision or checklist item, and shows the revised calculation, connection, detail, or inspection note. An ADU or addition should remain coordinated with egress, fire separation, MEP penetrations, energy details, and civil grades.",
            },
          ],
          permitSteps: [
            "Confirm the Providence parcel, occupancy, alteration category, current Rhode Island code edition, zoning or historic triggers, and structural checklist with Inspection and Standards.",
            "Collect survey information, permit history, framing or masonry observations, soil and flood data, roof equipment loads, and any existing foundation evidence.",
            "Coordinate load paths, openings, collectors, anchors, shoring, special inspections, fire separations, and MEP penetrations with the complete permit set.",
            "Return each Providence comment in a dated matrix, cloud changed details, update calculations, and route field-dependent revisions through the responsible engineer.",
          ],
          faqs: [
            {
              question: "When does a Providence addition need investigation of the existing structure?",
              answer: "When the addition changes loads, lateral resistance, foundations, openings, occupancy, or connections, the responsible engineer needs enough field and record evidence to evaluate the affected structure. A small footprint does not automatically mean a small structural scope.",
            },
            {
              question: "Can urban fill be assumed to support a Providence footing?",
              answer: "No. Fill composition, settlement history, groundwater, and the proposed load should be addressed with available geotechnical and field information. The design should identify assumptions and any required inspection or underpinning contingency.",
            },
            {
              question: "What belongs in a Providence structural correction response?",
              answer: "Identify the reviewer comment, code or checklist basis, revised sheet and calculation, changed detail, and remaining survey, soil, utility, or inspection dependency. The city reviewer retains authority over acceptance.",
            },
          ],
          sources: [
            { label: "Providence Department of Inspection and Standards", url: "https://www.providenceri.gov/inspection-standards/" },
            { label: "Providence planning", url: "https://www.providenceri.gov/planning/" },
            { label: "Providence Public Works", url: "https://www.providenceri.gov/public-works/" },
            { label: "Providence Water", url: "https://www.providenceri.gov/sustainability/water/" },
            { label: "Rhode Island Building Code Commission", url: "https://ribcc.ri.gov/" },
            { label: "FEMA Flood Map Service Center", url: "https://msc.fema.gov/portal/home" },
          ],
        },
        {
          serviceSlug: "mep-engineering",
          title: "Providence MEP engineering for dense buildings",
          description: "Providence mechanical, electrical, and plumbing coordination for reuse, additions, multifamily, and tenant work.",
          h1: "MEP Engineering for Providence, Rhode Island",
          kicker: "Heating, ventilation, service, and utility coordination",
          lede: "Providence MEP design must fit winter heating, summer humidity, aging urban services, and the actual occupancy into existing shafts, ceilings, and utility connections. Historic, multifamily, restaurant, and mill work each create different ventilation and life-safety questions.",
          permitAuthority: "Providence Department of Inspection and Standards reviews the local building permit, while fire, zoning, health, historic, public-works, Providence Water, Narragansett Bay Commission, and electric or gas providers may control related approvals.",
          codeContext: "Confirm the Rhode Island adopted mechanical, plumbing, electrical, energy, fire, accessibility, and building provisions with Providence before selecting the review path. Schedules and risers should use the current local forms and reflect the actual occupancy and alteration category.",
          localConditions: "Cold winters, humid summers, coastal air, flood-prone basements, aging services, dense party-wall construction, limited equipment access, and older sewer or water infrastructure affect ventilation, condensate, electrical capacity, and equipment location.",
          projectTypes: "The scope may involve historic tenant improvements, restaurant exhaust, multifamily rehabilitation, ADUs, residential additions, healthcare or commercial interiors, and mill conversions. Existing service capacity and fire separation should be verified rather than presumed.",
          sections: [
            {
              heading: "Providence equipment and distribution constraints",
              body: "Document heating and cooling loads, outdoor air, exhaust, filtration, condensate, access, and controls in the context of the actual building. Existing shafts, masonry penetrations, flood-prone mechanical rooms, and rooftop routes often control more than nominal equipment capacity.",
            },
            {
              heading: "Water, sewer, and electrical interfaces",
              body: "Providence Water and the Narragansett Bay Commission provide local utility interfaces that should be reconciled with fixture counts, pressure, sewer flow, backflow protection, and service changes. Rhode Island Energy information and field tracing should support panel, transformer, gas, and emergency-power decisions.",
            },
            {
              heading: "Coordinated MEP plan-check revisions",
              body: "If a reviewer changes ventilation, service, fire protection, accessibility, or energy assumptions, update the affected riser, schedule, load calculation, architectural penetration, and fire-rated detail together. An ADU or addition is not isolated from the existing service or egress record.",
            },
          ],
          permitSteps: [
            "Confirm Providence occupancy, current mechanical, plumbing, electrical, energy, and fire provisions, utility territory, and the local permit checklist.",
            "Field-trace service equipment and request available electric, gas, water, sewer, and fire-flow information before finalizing loads and equipment.",
            "Coordinate equipment clearances, shafts, exhaust, condensate, controls, panel schedules, fire stopping, accessibility, and construction shutdowns.",
            "Answer each comment with revised calculations, risers, schedules, details, and utility correspondence in a dated Providence response matrix.",
          ],
          faqs: [
            {
              question: "Which utility facts affect Providence MEP drawings?",
              answer: "Service voltage and capacity, gas availability, water pressure, sewer connection conditions, fire-flow information, and ownership or access restrictions can change the design. Written provider information should be distinguished from field assumptions.",
            },
            {
              question: "How should a Providence basement affect MEP planning?",
              answer: "Check flood exposure, equipment elevation, condensate and drain routing, backflow protection, access, and shutdown or maintenance needs. The selected arrangement should be coordinated with floodplain information and the building’s actual elevation.",
            },
            {
              question: "How should Providence MEP corrections be recorded?",
              answer: "Number each comment, cite the applicable requirement, identify revised sheets and calculations, and list utility or field items that remain open. If equipment or loads change, revise the schedules and linked energy or architectural documents too.",
            },
          ],
          sources: [
            { label: "Providence Department of Inspection and Standards", url: "https://www.providenceri.gov/inspection-standards/" },
            { label: "Providence Water", url: "https://www.providenceri.gov/sustainability/water/" },
            { label: "Providence Public Works", url: "https://www.providenceri.gov/public-works/" },
            { label: "Rhode Island Building Code Commission", url: "https://ribcc.ri.gov/" },
            { label: "Narragansett Bay Commission", url: "https://narrabay.com/" },
            { label: "Rhode Island Energy", url: "https://www.rienergy.com/" },
          ],
        },
        {
          serviceSlug: "civil-engineering",
          title: "Providence civil engineering for infill and river corridors",
          description: "Providence civil plans for grading, drainage, utilities, access, flood interfaces, and constrained urban parcels.",
          h1: "Civil Engineering for Providence, Rhode Island",
          kicker: "Urban drainage, frontage, and utility plans",
          lede: "A Providence civil package connects a building pad, accessible route, fire access, utilities, frontage, and stormwater to the actual street and receiving system. River corridors, compact lots, and redevelopment history make survey and outfall ownership especially important.",
          permitAuthority: "Providence Inspection and Standards handles building review, while Providence Planning, Public Works, Providence Water, Narragansett Bay Commission, RIDEM, and flood or right-of-way authorities may review site work separately.",
          codeContext: "Confirm Providence zoning, site-plan, stormwater, floodplain, erosion, accessibility, public right-of-way, utility, and building requirements with the applicable departments. State construction-stormwater and wetlands obligations are not replaced by a municipal building permit.",
          localConditions: "Woonasquatucket and Providence River flood exposure, intense rainfall, urban fill, high groundwater, compact frontage, impervious redevelopment, snowmelt, and aging drainage infrastructure can affect grades, finished floors, infiltration, and outfalls.",
          projectTypes: "Relevant scopes include mill reuse, downtown infill, multifamily rehabilitation, residential additions, ADUs, parking or access changes, and commercial redevelopment. Even a small addition may alter roof runoff, sewer demand, fire access, or an easement.",
          sections: [
            {
              heading: "Survey-led Providence site decisions",
              body: "The civil base should show boundaries, easements, spot grades, utilities, curb and sidewalk, inlets, accessible routes, fire access, flood information, and the receiving drainage system. Record research should identify whether an outfall or frontage element is public, private, or shared.",
            },
            {
              heading: "Urban runoff and river elevation",
              body: "Short intense storms, high groundwater, fill, and river elevations can make infiltration or basement drainage assumptions unreliable. Compare finished floors, pipe profiles, storage, water-quality treatment, erosion protection, and maintenance access with Providence and applicable RIDEM or FEMA information.",
            },
            {
              heading: "ADU and addition site effects",
              body: "An ADU, addition, or new driveway can redirect roof water, consume access, increase fixture demand, or change impervious area without appearing to be a major development. Show those changes and coordinate civil, structural, MEP, zoning, and public-works responses.",
            },
          ],
          permitSteps: [
            "Confirm Providence zoning, site-plan, floodplain, right-of-way, stormwater, utility, and building review thresholds for the address.",
            "Verify survey control, easements, existing utilities, outfall ownership, finished-floor elevations, groundwater or soil information, and flood data.",
            "Coordinate grading, drainage, accessible routes, fire access, utility profiles, erosion controls, maintenance responsibilities, and building entrances.",
            "Return each agency correction with revised contours, profiles, calculations, details, and a clear list of remaining utility or environmental dependencies.",
          ],
          faqs: [
            {
              question: "Why can a Providence infill parcel need flood analysis?",
              answer: "River proximity, mapped flood zones, finished-floor elevation, drainage connections, and proposed fill or equipment can affect the site even in a previously developed block. FEMA and local information should be checked for the actual parcel.",
            },
            {
              question: "How is a Providence ADU included in civil review?",
              answer: "Evaluate its roof and paving runoff, access, utilities, sewer demand, fire route, setbacks, easements, and any flood or zoning trigger. The local checklist determines which drawings and approvals are required.",
            },
            {
              question: "Can a Providence building permit authorize a new outfall?",
              answer: "Not necessarily. Public-works, utility, RIDEM stormwater, wetlands, or property-right approvals may be separate. Ownership and receiving-system acceptance should be documented before construction.",
            },
          ],
          sources: [
            { label: "Providence Planning", url: "https://www.providenceri.gov/planning/" },
            { label: "Providence Public Works", url: "https://www.providenceri.gov/public-works/" },
            { label: "Providence Department of Inspection and Standards", url: "https://www.providenceri.gov/inspection-standards/" },
            { label: "Providence Water", url: "https://www.providenceri.gov/sustainability/water/" },
            { label: "Rhode Island DEM construction stormwater permitting", url: "https://dem.ri.gov/environmental-protection-bureau/water-resources/permitting/stormwater-permitting/construction" },
            { label: "FEMA Flood Map Service Center", url: "https://msc.fema.gov/portal/home" },
          ],
        },
        {
          serviceSlug: "energy-compliance",
          title: "Providence energy compliance for existing-building work",
          description: "Providence energy documentation for additions, renovations, tenant improvements, envelopes, HVAC, and lighting.",
          h1: "Energy Compliance for Providence, Rhode Island",
          kicker: "Cold-climate envelope and system documentation",
          lede: "Providence energy compliance is a coordinated record of envelope, fenestration, HVAC, ventilation, lighting, service water, and controls. The correct path depends on Rhode Island’s adopted provisions and the project’s occupancy, alteration, and historic context.",
          permitAuthority: "Providence Inspection and Standards receives local permit documentation, while the Rhode Island Building Code Commission establishes the adopted state code framework. Historic or zoning review may affect envelope and window work independently.",
          codeContext: "Confirm the current Rhode Island energy provisions, climate inputs, residential or commercial method, alteration category, forms, and local checklist before modeling. The report must agree with architectural assemblies and MEP schedules rather than serve as a separate worksheet.",
          localConditions: "Heating-dominated winters, humid summers, wind-driven rain, coastal exposure, historic windows, masonry walls, air leakage, snow, and flood-prone equipment locations affect the feasible envelope and systems package.",
          projectTypes: "Additions, ADUs, historic renovations, multifamily rehabilitation, commercial tenant improvements, mill conversions, and equipment replacements may each have different documentation. An existing building does not automatically remove energy review.",
          sections: [
            {
              heading: "Providence assemblies and historic constraints",
              body: "Document insulation continuity, air control, vapor or moisture strategy, windows, roof transitions, thermal bridges, and penetrations as they will be built. Historic review or existing masonry can constrain replacement details, so the modeled assembly should match the approved design.",
            },
            {
              heading: "HVAC, ventilation, and flood-aware equipment",
              body: "Heating capacity, cooling and humidity control, outdoor air, exhaust, filtration, service water, controls, condensate, and equipment elevation should agree with the MEP set. Flood exposure and limited urban service space may change the system arrangement without changing the compliance objective.",
            },
            {
              heading: "Correction-ready energy records",
              body: "When Providence review changes a window, insulation layer, HVAC system, lighting control, or ventilation rate, update the report or forms, architectural detail, MEP schedule, and relevant construction note together. ADU and addition inputs should be traceable to the existing building interface.",
            },
          ],
          permitSteps: [
            "Confirm the current Rhode Island energy provisions, occupancy, alteration route, historic or zoning constraints, climate inputs, and Providence forms.",
            "Collect verified envelope, window, HVAC, ventilation, lighting, service-water, control, and equipment-elevation inputs from the coordinated design.",
            "Cross-check modeled assemblies and efficiencies against architectural details, structural penetrations, MEP schedules, and field conditions.",
            "Answer each energy comment with the cited requirement, revised input or form, affected sheet, and a dated coordination record.",
          ],
          faqs: [
            {
              question: "Which energy route applies to a Providence addition?",
              answer: "The occupancy, size and scope of the addition, relationship to the existing building, alteration category, and current Rhode Island provisions control. Providence and the applicable code documents should confirm the route before submission.",
            },
            {
              question: "Do historic Providence windows avoid energy documentation?",
              answer: "Historic constraints may influence the permitted assembly, but they do not automatically answer the energy review. Document the selected compliance method, existing conditions, proposed work, and any locally required review.",
            },
            {
              question: "Does an energy report guarantee lower utility bills?",
              answer: "No. It documents the selected code-compliance method and design inputs. Occupancy, weather, controls, commissioning, maintenance, and utility rates affect actual operation.",
            },
          ],
          sources: [
            { label: "Rhode Island Building Code Commission", url: "https://ribcc.ri.gov/" },
            { label: "Providence Department of Inspection and Standards", url: "https://www.providenceri.gov/inspection-standards/" },
            { label: "Providence Planning", url: "https://www.providenceri.gov/planning/" },
            { label: "Rhode Island Energy", url: "https://www.rienergy.com/" },
            { label: "Rhode Island DEM water resources", url: "https://dem.ri.gov/environmental-protection-bureau/water-resources" },
            { label: "FEMA Flood Map Service Center", url: "https://msc.fema.gov/portal/home" },
          ],
        },
        {
          serviceSlug: "pe-stamped-drawings",
          title: "Providence PE-stamped drawings for defined scopes",
          description: "Providence sealed engineering documents built from verified conditions and coordinated local review.",
          h1: "PE-Stamped Drawings for Providence, Rhode Island",
          kicker: "Defined scope, responsible review, and corrections",
          lede: "A Providence sealed package should identify the discipline, parcel evidence, design criteria, calculations, exclusions, and professional scope. A seal does not replace city, historic, fire, utility, flood, or environmental approvals.",
          permitAuthority: "Providence Inspection and Standards is the local building authority, but the city’s planning, historic, public-works, fire, utility, and flood-related reviewers may retain separate responsibilities. The Rhode Island Board of Registration for Professional Engineers is the state registration authority; the registered PE responsible for the defined scope should confirm current registration, signature, and seal requirements before issuing engineering documents.",
          codeContext: "The drawing set should identify the current Rhode Island adopted code path, Providence checklist, occupancy, alteration category, design criteria, and applicable discipline requirements. Do not present unverified survey, soil, utility, or existing-condition information as confirmed.",
          localConditions: "Historic masonry and wood, urban fill, high groundwater, river flooding, salt and snow exposure, constrained access, aging utilities, and dense neighboring construction can require investigation before the registered professional engineer responsible for the scope can complete a seal.",
          projectTypes: "Defined scopes may include structural alterations, MEP tenant improvements, civil site work, energy documents, additions, ADUs, mill conversions, and multifamily rehabilitation. Architecture, survey, geotechnical, fire, and utility scopes remain distinct where applicable.",
          sections: [
            {
              heading: "What a Providence sealed set should identify",
              body: "State the address and jurisdiction, design criteria, code edition, existing-condition evidence, calculations, drawings, assumptions, exclusions, and interfaces with other professionals. A clear index lets the reviewer distinguish an engineering responsibility from an owner, survey, contractor, or utility item.",
            },
            {
              heading: "Investigating urban and flood interfaces",
              body: "The registered professional engineer responsible for the scope may need survey, geotechnical, flood, utility, historic, and field information before sealing work involving a river-adjacent foundation, party wall, rooftop unit, service change, drainage connection, or addition. The package should preserve limitations instead of implying certainty.",
            },
            {
              heading: "Revisions after Providence review",
              body: "Use a dated comment matrix for each city correction, substitution, RFI, and field observation. The registered professional engineer responsible for the scope decides whether the sealed scope changes, then issues identified revised sheets and calculations coordinated with architecture, civil, MEP, energy, and inspection notes.",
            },
          ],
          permitSteps: [
            "Identify Providence’s enforcing authority, occupancy, code path, checklist, discipline boundary, and required seal or submission format.",
            "Assemble Providence survey, field observations, existing drawings, soil and flood information, utility records, calculations, and consultant boundaries.",
            "Have the registered Rhode Island professional engineer responsible for the scope review Providence’s coordinated drawings, details, notes, schedules, and calculations before submission.",
            "Route Providence comments and construction RFIs back through the registered professional engineer responsible for the scope and issue revised sealed sheets only when the defined scope requires them.",
          ],
          faqs: [
            {
              question: "Does a PE seal require Providence to approve the package?",
              answer: "No. A seal identifies the registered professional engineer’s responsibility for a defined scope; Inspection and Standards and other applicable authorities retain review and approval authority.",
            },
            {
              question: "Can Providence existing framing be sealed from photographs alone?",
              answer: "The registered professional engineer responsible for the scope must decide whether the available evidence supports independent judgment. Photographs may be useful, but concealed connections, dimensions, deterioration, and prior alterations can require additional investigation.",
            },
            {
              question: "How should a Providence sealed revision be issued?",
              answer: "Identify the comment or change, revise affected calculations and sheets, preserve the revision date and scope, and coordinate the package before resubmission. Contractor substitutions are not automatically included in an earlier seal.",
            },
          ],
          sources: [
            { label: "Providence Department of Inspection and Standards", url: "https://www.providenceri.gov/inspection-standards/" },
            { label: "Rhode Island Board of Registration for Professional Engineers (DBR)", url: "https://dbr.ri.gov/board-commissions" },
            { label: "Providence Planning", url: "https://www.providenceri.gov/planning/" },
            { label: "Providence Public Works", url: "https://www.providenceri.gov/public-works/" },
            { label: "Rhode Island Building Code Commission", url: "https://ribcc.ri.gov/" },
            { label: "Rhode Island DEM water resources", url: "https://dem.ri.gov/environmental-protection-bureau/water-resources" },
            { label: "FEMA Flood Map Service Center", url: "https://msc.fema.gov/portal/home" },
          ],
        },
      ],
    },
    {
      slug: "warwick",
      name: "Warwick",
      county: "Kent County",
      services: [
        {
          serviceSlug: "structural-engineering",
          title: "Warwick structural engineering for coastal additions",
          description: "Warwick structural design for homes, commercial work, and additions exposed to coastal wind, flood, and varied soils.",
          h1: "Structural Engineering for Warwick, Rhode Island",
          kicker: "Coastal load paths and existing foundations",
          lede: "Warwick structural design changes between inland neighborhoods, Greenwich Bay edges, airport-area commercial buildings, and waterfront parcels. The proposed load path should be based on observed framing, current flood information, soil evidence, and the city’s actual review requirements.",
          permitAuthority: "The City of Warwick Building Department is the local building authority. Warwick planning, engineering, zoning, fire, coastal or wetlands, public works, and utility reviews may be separate. The Rhode Island Board of Registration for Professional Engineers is the state registration authority; the registered PE responsible for the defined scope should confirm current registration, signature, and seal requirements before issuing engineering documents.",
          codeContext: "Confirm Warwick’s current building, residential, wind, snow, flood, fire, accessibility, and special-inspection requirements with the local department and the Rhode Island Building Code Commission. Check whether the parcel requires zoning or environmental review before finalizing structural assumptions.",
          localConditions: "Narragansett Bay and Greenwich Bay exposure, coastal flooding, salt, wind, glacial soils, ledge, wetland pockets, snow, and suburban drainage can affect foundations, connectors, equipment supports, and finished-floor choices.",
          projectTypes: "Scopes include coastal additions, airport-area commercial work, residential infill, ADUs, neighborhood renovations, waterfront rehabilitation, and small industrial buildings. Existing framing and foundation records vary widely across Warwick.",
          sections: [
            {
              heading: "Warwick additions and coastal framing",
              body: "A new story, porch, opening, roof load, or detached ADU should be traced through the existing foundation and lateral system. Field dimensions, probes, prior permits, and connection observations are more reliable than a neighboring house or a generic coastal detail.",
            },
            {
              heading: "Wind, flood, and soil evidence",
              body: "Coastal wind and surge, salt exposure, ledge, glacial deposits, fill, and groundwater can change anchors, corrosion protection, bearing, uplift, and equipment elevations. Coordinate the structural record with Warwick engineering, FEMA mapping, floodplain information, and any RIDEM or wetlands path.",
            },
            {
              heading: "Warwick correction coordination",
              body: "Respond to a Warwick Building Department comment with the cited requirement, revised connection or calculation, and affected architectural, civil, MEP, or energy sheet. Residential additions and ADUs still require a coordinated record for egress, fire separation, utilities, and access.",
            },
          ],
          permitSteps: [
            "Confirm the Warwick parcel, occupancy, current code, flood and coastal status, zoning triggers, wind and snow criteria, and local structural checklist.",
            "Obtain survey, framing observations, foundation evidence, soil or ledge information, flood elevations, roof loads, and existing utility or equipment records.",
            "Coordinate Warwick foundations, uplift and lateral connections, openings, shoring, special inspections, corrosion protection, and MEP penetrations.",
            "Track each Warwick correction, revise calculations and details, and have the responsible engineer review field-dependent changes before resubmission.",
          ],
          faqs: [
            {
              question: "How can Warwick coastal conditions change an addition?",
              answer: "Wind, flood elevation, salt, corrosion, foundation exposure, and access can affect the load path and material details. The parcel’s mapping, survey, soil information, and existing construction should control rather than a broad coastal assumption.",
            },
            {
              question: "Does every Warwick ADU need a new foundation design?",
              answer: "The answer depends on whether it is attached or detached, its loads and foundation, soil and flood conditions, and the local checklist. Existing capacity should be evaluated where the project changes loads or connections.",
            },
            {
              question: "Who accepts a Warwick structural correction?",
              answer: "The city reviewer determines acceptance for the building permit. The responsible engineer documents the technical response and revised work but does not promise approval.",
            },
          ],
          sources: [
            { label: "Warwick Building Department", url: "https://www.warwickri.gov/187/Building-Department" },
            { label: "Warwick Public Works", url: "https://www.warwickri.gov/391/Public-Works" },
            { label: "Warwick Planning Department", url: "https://www.warwickri.gov/376/Planning-Department" },
            { label: "Kent County Water Authority", url: "https://www.kentcountywater.org/" },
            { label: "Rhode Island Building Code Commission", url: "https://ribcc.ri.gov/" },
            { label: "FEMA Flood Map Service Center", url: "https://msc.fema.gov/portal/home" },
          ],
        },
        {
          serviceSlug: "mep-engineering",
          title: "Warwick MEP engineering for coastal and suburban buildings",
          description: "Warwick MEP coordination for heating, cooling, utility service, ventilation, and flood-aware equipment placement.",
          h1: "MEP Engineering for Warwick, Rhode Island",
          kicker: "Coastal systems and utility capacity",
          lede: "Warwick MEP design combines winter heating, humid summers, salt and wind, flood exposure, and the actual utility territory. A coastal home, airport-area tenant improvement, restaurant, and small industrial building do not share the same equipment or review assumptions.",
          permitAuthority: "Warwick Building Department reviews building systems, with engineering, fire, zoning, public works, Kent County Water Authority, sewer or onsite wastewater authorities, and electric or gas providers involved where their facilities or approvals are affected.",
          codeContext: "Verify Warwick’s current mechanical, plumbing, electrical, energy, fire, accessibility, and flood-related requirements with the local department and Rhode Island Building Code Commission. The design should reflect the adopted code path and the actual occupancy.",
          localConditions: "Coastal salt and wind, humid summers, cold winters, storm surge, freeze risk, aging suburban utilities, wetland pockets, and flood-prone low levels affect equipment elevation, corrosion, ventilation, condensate, and service capacity.",
          projectTypes: "Relevant work includes coastal additions, ADUs, airport-area commercial interiors, restaurants, waterfront rehabilitation, multifamily work, and small industrial improvements. Utility and wastewater assumptions should be verified for each address.",
          sections: [
            {
              heading: "Warwick heating, ventilation, and corrosion details",
              body: "Schedules should document heating and cooling loads, outdoor air, exhaust, filtration, condensate, equipment clearances, controls, and corrosion-resistant selections. Salt air and flood exposure may affect where equipment is placed and how it is accessed and maintained.",
            },
            {
              heading: "Service and wastewater coordination",
              body: "Check electric and gas service, water pressure, fire flow, sewer or onsite wastewater capacity, and existing panel and mechanical-room conditions before fixing equipment. Kent County Water Authority information and local engineering records should be reconciled with field evidence.",
            },
            {
              heading: "Warwick plan-check changes",
              body: "A comment about service, ventilation, flood elevation, fire separation, or energy can change several sheets at once. Revise risers, schedules, load calculations, equipment details, architectural penetrations, and ADU or addition interfaces together.",
            },
          ],
          permitSteps: [
            "Confirm Warwick occupancy, current mechanical, plumbing, electrical, energy, fire, and flood requirements, utility territory, and wastewater review path.",
            "Field-trace existing systems and request provider data for electric, gas, water, sewer or onsite wastewater, and fire-flow conditions.",
            "Coordinate equipment elevation, corrosion protection, clearances, exhaust, condensate, panel schedules, controls, fire stopping, and maintenance access.",
            "Return numbered Warwick comments with revised load calculations, risers, schedules, details, and utility or environmental correspondence.",
          ],
          faqs: [
            {
              question: "Which utility facts affect a Warwick addition?",
              answer: "Available electric or gas service, water pressure, fire flow, sewer or onsite wastewater capacity, connection ownership, and flood-related service constraints may affect the equipment and distribution design.",
            },
            {
              question: "How should coastal salt affect Warwick MEP equipment?",
              answer: "The design should address location, materials, coatings, intake and exhaust placement, drainage, access, and manufacturer requirements. It should state assumptions without promising a service life or operating result.",
            },
            {
              question: "Does a Warwick ADU automatically use the existing services?",
              answer: "No. Added electrical, water, sewer, ventilation, fire, and energy demands should be checked against the existing service and the local utility or AHJ requirements.",
            },
          ],
          sources: [
            { label: "Warwick Building Department", url: "https://www.warwickri.gov/187/Building-Department" },
            { label: "Warwick Public Works", url: "https://www.warwickri.gov/391/Public-Works" },
            { label: "Kent County Water Authority", url: "https://www.kentcountywater.org/" },
            { label: "Rhode Island Building Code Commission", url: "https://ribcc.ri.gov/" },
            { label: "Rhode Island DEM water resources", url: "https://dem.ri.gov/environmental-protection-bureau/water-resources" },
            { label: "FEMA Flood Map Service Center", url: "https://msc.fema.gov/portal/home" },
          ],
        },
        {
          serviceSlug: "civil-engineering",
          title: "Warwick civil engineering for coastal drainage",
          description: "Warwick civil site plans for grading, drainage, utilities, access, floodplain, wetlands, and frontage coordination.",
          h1: "Civil Engineering for Warwick, Rhode Island",
          kicker: "Coastal drainage, frontage, and utilities",
          lede: "A Warwick civil package must connect the proposed building and access to suburban drainage, coastal or wetland constraints, public frontage, and the actual water or wastewater system. Small additions can still redirect runoff or change finished-floor and flood decisions.",
          permitAuthority: "Warwick Public Works and the Building Department coordinate local site and building review, while Planning, Kent County Water Authority, wastewater authorities, RIDEM, and floodplain or coastal reviewers may control separate elements.",
          codeContext: "Confirm Warwick zoning, site-plan, stormwater, floodplain, coastal, wetlands, right-of-way, erosion, accessibility, utility, and building thresholds for the parcel. State stormwater or wetlands approvals remain separate from the local building permit.",
          localConditions: "Narragansett Bay and Greenwich Bay surge, wetland pockets, short intense rain, glacial soils, ledge, suburban drainage, high groundwater, snowmelt, and compact coastal lots can affect infiltration, outfalls, finished floors, and access.",
          projectTypes: "Scopes include coastal additions, ADUs, airport-area redevelopment, waterfront rehabilitation, neighborhood infill, commercial parking or access work, and small industrial sites. Civil decisions should account for fire access and utility ownership as well as building footprint.",
          sections: [
            {
              heading: "Warwick survey and coastal parcel evidence",
              body: "Show boundaries, easements, contours, wetlands indicators, coastal or flood information, curb and sidewalk, utilities, access, fire routes, existing drainage, and the receiving system. Confirm whether the frontage, outfall, or utility is public or private before designing a connection.",
            },
            {
              heading: "Runoff, ledge, and finished-floor choices",
              body: "Ledge, fill, groundwater, coastal surge, and intense rainfall can limit infiltration and alter storage or outlet design. Coordinate finished floors, pipe profiles, erosion protection, water quality, maintenance, and flood resilience with Warwick Public Works and applicable RIDEM or FEMA information.",
            },
            {
              heading: "ADU and addition site coordination",
              body: "An ADU, porch, addition, or parking change can alter roof runoff, impervious area, fire access, utility demand, setbacks, and drainage easements. Show the change on the civil plan and coordinate it with zoning, structural, MEP, and building review.",
            },
          ],
          permitSteps: [
            "Confirm Warwick zoning, engineering, floodplain, coastal, wetlands, right-of-way, stormwater, utility, and building thresholds for the address.",
            "Verify survey control, wetlands or flood information, easements, finished-floor elevations, soil and ledge evidence, outfall ownership, and utility locations.",
            "Coordinate Warwick grading, drainage, fire access, accessible routes, frontage, utility profiles, erosion controls, and maintenance responsibilities.",
            "Revise contours, profiles, calculations, details, and agency response notes for every Warwick comment before resubmittal.",
          ],
          faqs: [
            {
              question: "Why can a Warwick addition need drainage review?",
              answer: "New roof, paving, grading, access, or finished-floor work can change runoff and flood exposure even when the parcel is already developed. The city threshold and applicable environmental or coastal rules control the required documents.",
            },
            {
              question: "How should a Warwick site be screened for wetlands?",
              answer: "Start with the parcel survey and current state and local information, then determine whether proposed grading, drainage, access, or utilities affect a regulated resource. A building permit alone does not authorize wetland alteration.",
            },
            {
              question: "Can an existing Warwick drainage connection be reused?",
              answer: "Only after ownership, condition, capacity, downstream acceptance, and applicable public-works or stormwater requirements are verified. The civil plan should identify the evidence and any unresolved condition.",
            },
          ],
          sources: [
            { label: "Warwick Public Works", url: "https://www.warwickri.gov/391/Public-Works" },
            { label: "Warwick Planning Department", url: "https://www.warwickri.gov/376/Planning-Department" },
            { label: "Warwick Building Department", url: "https://www.warwickri.gov/187/Building-Department" },
            { label: "Kent County Water Authority", url: "https://www.kentcountywater.org/" },
            { label: "Rhode Island DEM construction stormwater permitting", url: "https://dem.ri.gov/environmental-protection-bureau/water-resources/permitting/stormwater-permitting/construction" },
            { label: "FEMA Flood Map Service Center", url: "https://msc.fema.gov/portal/home" },
          ],
        },
        {
          serviceSlug: "energy-compliance",
          title: "Warwick energy compliance for coastal renovations",
          description: "Warwick energy documentation for cold-climate envelopes, HVAC, additions, ADUs, lighting, and flood-aware equipment.",
          h1: "Energy Compliance for Warwick, Rhode Island",
          kicker: "Cold-climate and coastal envelope coordination",
          lede: "Warwick energy documentation must align the adopted Rhode Island path with the actual envelope, HVAC, ventilation, lighting, water-heating, and control design. Coastal moisture, salt, wind-driven rain, historic work, and flood exposure can affect constructability without changing the need for traceable inputs.",
          permitAuthority: "Warwick Building Department receives local permit documents, while the Rhode Island Building Code Commission provides the state code framework. Planning, historic, flood, coastal, and zoning review can affect windows, insulation, equipment, or exterior work separately.",
          codeContext: "Confirm the current Rhode Island energy provisions, climate data, occupancy, residential or commercial method, alteration category, forms, and Warwick checklist before analysis. Model inputs must match the architectural and MEP documents.",
          localConditions: "Cold heating seasons, humid summers, coastal salt, wind-driven rain, snow, freeze protection, wet basements, historic envelopes, and flood-prone equipment areas influence assemblies and system choices.",
          projectTypes: "Coastal renovations, additions, ADUs, airport-area commercial work, multifamily improvements, waterfront rehabilitation, and equipment replacements can follow different compliance routes. Existing construction and local review should determine the documentation.",
          sections: [
            {
              heading: "Warwick envelope and moisture interfaces",
              body: "Document insulation, air control, water management, windows, roof transitions, thermal bridges, penetrations, and any coastal or historic constraints. The reported assembly should be the one shown in the permit details and capable of being inspected.",
            },
            {
              heading: "Systems, controls, and equipment elevation",
              body: "Heating and cooling, ventilation, exhaust, filtration, lighting controls, service water, condensate, and flood-aware equipment placement must agree across the energy and MEP sets. Coastal exposure should inform materials and maintenance without unsupported performance claims.",
            },
            {
              heading: "Warwick correction-ready documentation",
              body: "If review changes an assembly, window, HVAC schedule, lighting control, or ventilation input, revise the compliance report or forms and every affected architectural or MEP sheet. An ADU or addition should show its connection to existing systems and envelope.",
            },
          ],
          permitSteps: [
            "Confirm Rhode Island’s current energy provisions, Warwick occupancy and alteration path, coastal or historic constraints, climate inputs, and local forms.",
            "Collect verified Warwick envelope, fenestration, HVAC, ventilation, lighting, service-water, controls, and coastal equipment-location inputs.",
            "Check modeled inputs against architectural details, structural penetrations, MEP schedules, flood-related elevations, and field conditions.",
            "Respond to each energy comment with the requirement, revised input or form, affected drawing reference, and dated coordination record.",
          ],
          faqs: [
            {
              question: "Does a Warwick coastal addition use a special energy code?",
              answer: "The applicable Rhode Island provisions and project category control the energy path; coastal or historic rules may affect the chosen assemblies and equipment. Warwick should confirm the required submission for the address.",
            },
            {
              question: "Can an existing Warwick house make an ADU energy-exempt?",
              answer: "No automatic exemption follows from the existing building. The scope, connected systems, alteration category, and current local requirements determine what must be documented.",
            },
            {
              question: "What if a Warwick HVAC unit changes after review?",
              answer: "Recheck the energy inputs, equipment schedules, ventilation, controls, electrical loads, and affected details, then issue a coordinated revision through the local permit process.",
            },
          ],
          sources: [
            { label: "Rhode Island Building Code Commission", url: "https://ribcc.ri.gov/" },
            { label: "Warwick Building Department", url: "https://www.warwickri.gov/187/Building-Department" },
            { label: "Warwick Planning Department", url: "https://www.warwickri.gov/376/Planning-Department" },
            { label: "Rhode Island Energy", url: "https://www.rienergy.com/" },
            { label: "Rhode Island DEM water resources", url: "https://dem.ri.gov/environmental-protection-bureau/water-resources" },
            { label: "FEMA Flood Map Service Center", url: "https://msc.fema.gov/portal/home" },
          ],
        },
        {
          serviceSlug: "pe-stamped-drawings",
          title: "Warwick PE-stamped drawings for coastal review",
          description: "Warwick sealed engineering packages with defined scope, site evidence, and coordinated correction responses.",
          h1: "PE-Stamped Drawings for Warwick, Rhode Island",
          kicker: "Responsible scope for coastal permit work",
          lede: "A Warwick sealed package should make its professional scope, design criteria, site evidence, assumptions, and exclusions clear. A PE seal addresses a defined engineering responsibility; it does not replace Warwick, utility, flood, coastal, wetlands, fire, or zoning review.",
          permitAuthority: "Warwick Building Department is the local building authority. Warwick Planning, Public Works, fire, utilities, wastewater authorities, and state environmental reviewers may have independent jurisdiction over portions of the work. The Rhode Island Board of Registration for Professional Engineers is the state registration authority; the registered PE responsible for the defined scope should confirm current registration, signature, and seal requirements before issuing engineering documents.",
          codeContext: "Identify the current Rhode Island code path, Warwick checklist, occupancy, alteration category, coastal and flood criteria, and discipline boundary in the set. Verified survey, soil, utility, and existing-condition information should be distinguished from assumptions.",
          localConditions: "Coastal wind and flooding, salt, wetland pockets, ledge, glacial soils, snow, aging services, and limited access can require additional investigation before sealing an addition, ADU, waterfront alteration, or utility-related scope.",
          projectTypes: "Defined scopes may include structural additions, MEP renovations, civil drainage, energy documentation, airport-area tenant work, residential ADUs, and coastal rehabilitation. Survey, architecture, geotechnical, utility, and fire responsibilities should remain explicit.",
          sections: [
            {
              heading: "Defining a Warwick engineering seal",
              body: "The record should identify the parcel, jurisdiction, code criteria, calculations, drawings, existing-condition evidence, assumptions, exclusions, and interfaces with other professionals. A concise responsibility matrix helps reviewers see what the seal does and does not cover.",
            },
            {
              heading: "Coastal, soil, and utility evidence",
              body: "The registered professional engineer responsible for the scope may need survey, flood, soil, ledge, utility, wetlands, and field information before sealing work. An equipment support, foundation, drainage connection, or addition near the coast should not be represented as verified from an unconfirmed map or photograph.",
            },
            {
              heading: "Warwick revisions and field changes",
              body: "Track each reviewer comment, substitution, RFI, and field observation with a date and affected sheet. The registered professional engineer responsible for the scope determines whether the sealed scope changes and issues revised calculations or sheets coordinated with the city response.",
            },
          ],
          permitSteps: [
            "Identify Warwick’s enforcing authority, occupancy, current code, coastal and flood criteria, discipline limits, checklist, and seal format.",
            "Assemble survey, field observations, existing plans, soil and flood information, utility records, calculations, and consultant boundaries.",
            "Have the registered Rhode Island professional engineer responsible for the scope review Warwick’s complete coordinated set, details, notes, schedules, calculations, and exclusions.",
            "Route Warwick corrections and construction RFIs back through the registered professional engineer responsible for the scope and issue dated revised sealed sheets only for changed scope.",
          ],
          faqs: [
            {
              question: "Does a Warwick PE seal replace coastal or wetlands approval?",
              answer: "No. A seal addresses a defined professional scope. Warwick, RIDEM, utility, floodplain, coastal, wetlands, fire, and other authorities retain their own review responsibilities.",
            },
            {
              question: "Can a Warwick PE seal drawings with unknown soil conditions?",
              answer: "The registered professional engineer responsible for the scope must decide whether the available evidence supports the scope and should identify limitations, assumptions, and required geotechnical or field verification.",
            },
            {
              question: "How should a Warwick correction be added to a sealed set?",
              answer: "Identify the comment and design change, update affected calculations and drawings, preserve revision control, and coordinate the complete response before resubmission. A contractor substitution needs its own professional review when it affects sealed work.",
            },
          ],
          sources: [
            { label: "Warwick Building Department", url: "https://www.warwickri.gov/187/Building-Department" },
            { label: "Rhode Island Board of Registration for Professional Engineers (DBR)", url: "https://dbr.ri.gov/board-commissions" },
            { label: "Warwick Public Works", url: "https://www.warwickri.gov/391/Public-Works" },
            { label: "Warwick Planning Department", url: "https://www.warwickri.gov/376/Planning-Department" },
            { label: "Rhode Island Building Code Commission", url: "https://ribcc.ri.gov/" },
            { label: "Rhode Island DEM water resources", url: "https://dem.ri.gov/environmental-protection-bureau/water-resources" },
            { label: "FEMA Flood Map Service Center", url: "https://msc.fema.gov/portal/home" },
          ],
        },
      ],
    },
    {
      slug: "cranston",
      name: "Cranston",
      county: "Providence County",
      services: [
        {
          serviceSlug: "structural-engineering",
          title: "Cranston structural engineering for river and neighborhood work",
          description: "Cranston structural design for additions, rehabilitation, commercial conversions, and existing framing near varied terrain.",
          h1: "Structural Engineering for Cranston, Rhode Island",
          kicker: "Existing homes, river corridors, and additions",
          lede: "Cranston structural work ranges from older housing and commercial corridors to Pawtuxet-area buildings and industrial infill. New loads, openings, retaining conditions, and roof equipment should be connected to observed construction and parcel-specific soil and flood evidence.",
          permitAuthority: "The City of Cranston Building Inspection Division is the local building authority. Cranston Planning, Public Works, zoning, wetlands or floodplain reviewers, fire, Providence Water, Narragansett Bay Commission, and utilities may review related work.",
          codeContext: "Confirm the Rhode Island adopted building, residential, wind, snow, seismic, fire, accessibility, and special-inspection provisions with Cranston before design. The local checklist and occupancy or alteration category determine the submittal.",
          localConditions: "Pawtuxet River flood exposure, urban and suburban drainage, glacial till, fill, ledge, coastal influence, snow, freeze-thaw, and older housing can affect foundations, lateral systems, openings, and equipment supports.",
          projectTypes: "Cranston scopes include residential additions, ADUs, Pawtuxet-area rehabilitation, commercial conversions, multifamily work, industrial infill, and roof or equipment alterations. Prior alterations should be investigated rather than assumed to be code-compliant.",
          sections: [
            {
              heading: "Cranston existing framing and additions",
              body: "Field observations and permit records should establish framing direction, bearing walls, connections, foundation type, and prior openings before a new beam, story, porch, or ADU is designed. A tract-house appearance does not prove a uniform existing condition.",
            },
            {
              heading: "Pawtuxet, ledge, and drainage interfaces",
              body: "River flood information, groundwater, fill, ledge, and freeze-thaw can affect foundations, retaining, finished floors, corrosion, and equipment supports. Coordinate structural decisions with Cranston Public Works, planning, flood information, and any environmental or utility constraints.",
            },
            {
              heading: "Cranston plan-check corrections",
              body: "A correction response should cite the Building Inspection comment and show the revised calculation, detail, connection, or inspection note. Residential additions and ADUs should be checked with egress, fire separation, MEP penetrations, energy details, civil grades, and access.",
            },
          ],
          permitSteps: [
            "Confirm the Cranston parcel, occupancy, current code, zoning or flood triggers, wind and snow criteria, and Building Inspection checklist.",
            "Collect survey, framing and foundation observations, permit history, soil or ledge information, flood data, roof loads, and relevant utility or equipment records.",
            "Coordinate foundations, lateral and uplift connections, openings, shoring, special inspections, fire-rated penetrations, and civil interfaces.",
            "Log every Cranston correction, revise calculations and details, and obtain responsible-engineer review of field-dependent changes before resubmission.",
          ],
          faqs: [
            {
              question: "When should a Cranston addition include existing-foundation review?",
              answer: "When new loads, openings, lateral resistance, foundation geometry, or connections affect the existing building. The scope follows the proposed load path and available evidence, not simply the addition’s floor area.",
            },
            {
              question: "Does Pawtuxet-area work always need flood-resistant structure?",
              answer: "Flood mapping, elevation, proposed work, and local requirements determine the applicable measures. The parcel should be checked with current FEMA and local information rather than assumed from its neighborhood name.",
            },
            {
              question: "How should a Cranston structural comment be answered?",
              answer: "Name the comment, cite its basis, provide revised calculations or details, identify changed sheets, and list remaining soil, survey, utility, or inspection dependencies. Building Inspection decides whether the response is sufficient.",
            },
          ],
          sources: [
            { label: "Cranston Building Inspection Division", url: "https://www.cranstonri.gov/departments/building-and-public-works/building-inspection/" },
            { label: "Cranston Planning", url: "https://www.cranstonri.gov/departments/planning/" },
            { label: "Cranston Public Works", url: "https://www.cranstonri.gov/departments/public-works/" },
            { label: "Providence Water", url: "https://www.providenceri.gov/sustainability/water/" },
            { label: "Rhode Island Building Code Commission", url: "https://ribcc.ri.gov/" },
            { label: "FEMA Flood Map Service Center", url: "https://msc.fema.gov/portal/home" },
          ],
        },
        {
          serviceSlug: "mep-engineering",
          title: "Cranston MEP engineering for homes and conversions",
          description: "Cranston MEP design for additions, ADUs, multifamily, commercial conversions, and older utility systems.",
          h1: "MEP Engineering for Cranston, Rhode Island",
          kicker: "Service capacity, ventilation, and existing-system coordination",
          lede: "Cranston MEP design must reconcile cold-weather heating, humid summers, older homes, commercial conversions, and the actual electric, water, and sewer interfaces. A Pawtuxet-area or suburban project may have different flood and equipment-location constraints.",
          permitAuthority: "Cranston Building Inspection reviews local building systems. Planning, Public Works, fire, Providence Water, Narragansett Bay Commission, Rhode Island Energy, and other utilities or health reviewers may control connected work.",
          codeContext: "Verify Cranston’s current mechanical, plumbing, electrical, energy, fire, accessibility, and building requirements with the local department and Rhode Island Building Code Commission. Use the occupancy and alteration category to select the applicable forms and details.",
          localConditions: "Cold winters, humid summers, Pawtuxet flood exposure, aging service equipment, dense older housing, suburban drainage, freeze risk, and limited mechanical-room space affect heating, ventilation, condensate, electrical capacity, and flood-aware equipment placement.",
          projectTypes: "Typical scopes include residential additions, ADUs, multifamily rehabilitation, commercial conversions, restaurant or retail interiors, and industrial infill. Existing panels, boilers, water service, sewer connections, and fire separations should be verified.",
          sections: [
            {
              heading: "Cranston existing-system investigation",
              body: "Trace panel capacity, service entrances, heating equipment, shafts, water and sewer connections, exhaust paths, and fire-rated penetrations before setting final schedules. Older alterations may not match record drawings or the current occupancy.",
            },
            {
              heading: "Flood and utility coordination",
              body: "Pawtuxet and low-lying areas can affect equipment elevation, condensate, backflow protection, and electrical or mechanical room locations. Providence Water and Narragansett Bay Commission information should be reconciled with field conditions and Cranston Public Works interfaces.",
            },
            {
              heading: "Cranston MEP correction control",
              body: "When review changes a panel, fixture count, ventilation rate, fire separation, or energy input, update loads, risers, schedules, details, and linked architectural sheets in the same response. An ADU may share systems, but its incremental demand remains part of the analysis.",
            },
          ],
          permitSteps: [
            "Confirm Cranston occupancy, current mechanical, plumbing, electrical, energy, fire, and flood provisions, utility territory, and local checklist.",
            "Field-verify service equipment and obtain electric, gas, water, sewer, and fire-flow information before finalizing loads or equipment.",
            "Coordinate risers, equipment clearances, ventilation, condensate, controls, panel schedules, fire stopping, access, and shutdown phases.",
            "Return each Cranston comment with revised calculations, schedules, risers, details, and provider correspondence in a dated matrix.",
          ],
          faqs: [
            {
              question: "Can a Cranston addition rely on the existing electrical panel?",
              answer: "Only after available capacity, service rating, demand calculations, grounding, space, and local utility or AHJ requirements are checked. A panel’s physical room does not prove service capacity.",
            },
            {
              question: "What does a Cranston ADU change in MEP design?",
              answer: "It can add heating and ventilation zones, fixtures, sewer and water demand, electrical loads, fire separation, and energy documentation. The attached or detached arrangement and existing service determine the details.",
            },
            {
              question: "How should a Cranston plan-check revision be coordinated?",
              answer: "Tie each comment to a revised calculation, riser, schedule, detail, and sheet reference, and identify open utility or field items. Changes affecting energy, fire, accessibility, or structure should be carried into those documents too.",
            },
          ],
          sources: [
            { label: "Cranston Building Inspection Division", url: "https://www.cranstonri.gov/departments/building-and-public-works/building-inspection/" },
            { label: "Cranston Public Works", url: "https://www.cranstonri.gov/departments/public-works/" },
            { label: "Cranston Planning", url: "https://www.cranstonri.gov/departments/planning/" },
            { label: "Providence Water", url: "https://www.providenceri.gov/water/" },
            { label: "Narragansett Bay Commission", url: "https://narrabay.com/" },
            { label: "Rhode Island Building Code Commission", url: "https://ribcc.ri.gov/" },
          ],
        },
        {
          serviceSlug: "civil-engineering",
          title: "Cranston civil engineering for drainage and infill",
          description: "Cranston civil plans for grading, stormwater, access, utilities, flood interfaces, and neighborhood additions.",
          h1: "Civil Engineering for Cranston, Rhode Island",
          kicker: "Pawtuxet drainage and neighborhood site plans",
          lede: "Cranston civil design joins survey, grading, accessible routes, fire access, frontage, utilities, and stormwater to the actual receiving system. A residential addition and an industrial infill site can trigger different drainage, flood, right-of-way, and utility questions.",
          permitAuthority: "Cranston Public Works and Planning coordinate local site and development review, while Building Inspection, Providence Water, Narragansett Bay Commission, RIDEM, floodplain or wetlands authorities, and utilities may review connected work.",
          codeContext: "Confirm Cranston zoning, site-plan, stormwater, floodplain, wetlands, right-of-way, erosion, accessibility, utility, and building requirements for the address. State construction-stormwater or wetlands obligations are separate from a local building permit.",
          localConditions: "Pawtuxet River floodplain, urban and suburban drainage, glacial till, fill, ledge, coastal influence, high groundwater, snowmelt, and intense rainfall can affect infiltration, finished floors, outfalls, and accessible grades.",
          projectTypes: "Scopes include Pawtuxet-area rehabilitation, residential additions, ADUs, multifamily work, commercial conversions, industrial infill, driveway changes, and drainage improvements. Site changes should be measured against fire access and utility capacity as well as building area.",
          sections: [
            {
              heading: "Cranston survey and public-works connection",
              body: "Show boundaries, easements, contours, curb and sidewalk, utilities, inlets, flood information, accessible paths, fire access, impervious areas, and downstream ownership. Existing drainage should be traced to a documented receiving point instead of assumed from a nearby inlet.",
            },
            {
              heading: "Pawtuxet flood and suburban runoff",
              body: "Flood elevations, high groundwater, fill, ledge, snowmelt, and intense storms can affect detention, infiltration, finished floors, pipe profiles, and outlet protection. Coordinate site choices with Cranston Public Works, FEMA information, and RIDEM requirements where applicable.",
            },
            {
              heading: "Small additions and ADUs",
              body: "An addition, ADU, patio, driveway, or detached structure may redirect roof water, reduce parking or fire access, add utility demand, or change impervious area. The civil plan should show these effects and keep grading, building entrances, structure, and MEP work aligned.",
            },
          ],
          permitSteps: [
            "Confirm Cranston zoning, planning, Public Works, floodplain, wetlands, right-of-way, stormwater, utility, and building thresholds.",
            "Verify survey datum, flood and wetland information, easements, utilities, outfall ownership, finished floors, soil or ledge evidence, and access.",
            "Show Cranston roof drainage, lot grading, fire access, accessible routes, frontage, utility profiles, erosion controls, and maintenance responsibilities.",
            "Respond to every Cranston correction with revised contours, profiles, calculations, details, and agency or utility dependency notes.",
          ],
          faqs: [
            {
              question: "Why can Cranston infill need a stormwater review?",
              answer: "New impervious area, altered grades, an outfall, flood exposure, or a connection to public drainage can trigger review even on a developed parcel. Cranston and state thresholds should be checked for the actual scope.",
            },
            {
              question: "How does a Cranston ADU affect civil plans?",
              answer: "Review roof runoff, paving, finished floor, access, fire route, water and sewer connections, setbacks, easements, and flood or wetland interfaces. The local review path determines the required plan detail.",
            },
            {
              question: "Can a Cranston site drain to a neighboring ditch?",
              answer: "Not without confirming ownership, legal rights, downstream capacity, maintenance, and applicable public-works or environmental approval. The receiving system must be documented rather than inferred.",
            },
          ],
          sources: [
            { label: "Cranston Public Works", url: "https://www.cranstonri.gov/departments/public-works/" },
            { label: "Cranston Planning", url: "https://www.cranstonri.gov/departments/planning/" },
            { label: "Cranston Building Inspection Division", url: "https://www.cranstonri.gov/departments/building-and-public-works/building-inspection/" },
            { label: "Providence Water", url: "https://www.providenceri.gov/water/" },
            { label: "Rhode Island DEM construction stormwater permitting", url: "https://dem.ri.gov/environmental-protection-bureau/water-resources/permitting/stormwater-permitting/construction" },
            { label: "FEMA Flood Map Service Center", url: "https://msc.fema.gov/portal/home" },
          ],
        },
        {
          serviceSlug: "energy-compliance",
          title: "Cranston energy compliance for additions and reuse",
          description: "Cranston energy documentation for residential additions, ADUs, commercial conversion, HVAC, envelope, and lighting work.",
          h1: "Energy Compliance for Cranston, Rhode Island",
          kicker: "Cold-climate documentation for existing buildings",
          lede: "Cranston energy compliance should connect Rhode Island’s adopted path to the actual envelope, HVAC, ventilation, lighting, water-heating, and controls package. Residential additions, ADUs, older homes, and commercial conversions can trigger different documentation.",
          permitAuthority: "Cranston Building Inspection receives local permit submissions, while the Rhode Island Building Code Commission establishes the state framework. Planning, zoning, historic, flood, and utility conditions may affect the design independently.",
          codeContext: "Confirm the current Rhode Island energy provisions, occupancy, alteration category, climate inputs, residential or commercial method, forms, and Cranston checklist. The report, drawings, equipment schedules, and field assumptions should agree.",
          localConditions: "Heating-dominated winters, humid summers, Pawtuxet flood exposure, older masonry and wood, wind-driven rain, snow, freeze-thaw, and limited retrofit space influence envelope and system choices.",
          projectTypes: "Cranston work may include additions, ADUs, commercial conversions, multifamily rehabilitation, industrial offices, window replacements, and HVAC or lighting changes. Existing construction and the scope of alteration determine the compliance route.",
          sections: [
            {
              heading: "Cranston retrofit assemblies",
              body: "Document insulation continuity, air sealing, moisture control, windows, roof transitions, thermal bridges, and penetrations in a way that matches the proposed construction. Existing masonry, irregular framing, and limited cavity depth should be represented honestly in the selected method.",
            },
            {
              heading: "Systems and flood-aware equipment",
              body: "Heating, cooling, ventilation, exhaust, filtration, lighting controls, service water, condensate, and equipment elevations belong in the same coordinated record. Pawtuxet or low-lying conditions may change equipment placement and MEP details.",
            },
            {
              heading: "Cranston energy corrections",
              body: "If plan check changes an assembly, fenestration, HVAC, lighting control, or ventilation input, update the report or forms and affected architectural and MEP sheets. An ADU or addition should identify its incremental loads and connection to the existing system.",
            },
          ],
          permitSteps: [
            "Confirm Rhode Island’s current energy provisions, Cranston occupancy and alteration route, zoning or flood interfaces, climate data, and local forms.",
            "Collect verified envelope, window, HVAC, ventilation, lighting, service-water, controls, and equipment-location inputs.",
            "Cross-check modeled inputs against architectural details, structural penetrations, MEP schedules, existing conditions, and flood-related elevations.",
            "Answer each Cranston comment with its requirement, revised input or form, affected sheet, and dated coordination record.",
          ],
          faqs: [
            {
              question: "Does a Cranston residential addition automatically use the existing energy documentation?",
              answer: "No. The addition size and scope, relationship to the existing building, alteration category, connected systems, and current code path determine what must be submitted.",
            },
            {
              question: "Can an older Cranston envelope be modeled as a standard wall?",
              answer: "Only when the construction evidence supports that assembly. Probes, records, and conservative documented assumptions are preferable to assigning an unverified modern wall to older masonry or wood.",
            },
            {
              question: "What should change when Cranston HVAC equipment is substituted?",
              answer: "Recheck efficiency, capacity, controls, ventilation, electrical load, condensate, and energy inputs, then coordinate the equipment schedule, details, forms, and permit revision.",
            },
          ],
          sources: [
            { label: "Rhode Island Building Code Commission", url: "https://ribcc.ri.gov/" },
            { label: "Cranston Building Inspection Division", url: "https://www.cranstonri.gov/departments/building-and-public-works/building-inspection/" },
            { label: "Cranston Planning", url: "https://www.cranstonri.gov/departments/planning/" },
            { label: "Rhode Island Energy", url: "https://www.rienergy.com/" },
            { label: "Rhode Island DEM water resources", url: "https://dem.ri.gov/environmental-protection-bureau/water-resources" },
            { label: "FEMA Flood Map Service Center", url: "https://msc.fema.gov/portal/home" },
          ],
        },
        {
          serviceSlug: "pe-stamped-drawings",
          title: "Cranston PE-stamped drawings for permit coordination",
          description: "Cranston sealed engineering documents with documented site evidence, defined scope, and correction control.",
          h1: "PE-Stamped Drawings for Cranston, Rhode Island",
          kicker: "Defined professional scope for local review",
          lede: "A Cranston sealed set should identify the project scope, design criteria, existing-condition evidence, assumptions, exclusions, and linked disciplines. A seal does not stand in for Building Inspection, planning, fire, utility, flood, wetlands, or public-works approval.",
          permitAuthority: "Cranston Building Inspection is the local building authority. Cranston Planning, Public Works, fire, utilities, floodplain or wetlands reviewers, and the Narragansett Bay Commission may have separate jurisdiction. The Rhode Island Board of Registration for Professional Engineers is the state registration authority; the registered PE responsible for the defined scope should confirm current registration, signature, and seal requirements before issuing engineering documents.",
          codeContext: "Identify the Rhode Island adopted code path, Cranston checklist, occupancy, alteration category, design criteria, and discipline boundary. Survey, soil, utility, and existing-condition evidence should be labeled and sufficient for the registered professional engineer responsible for the scope to exercise independent judgment.",
          localConditions: "Pawtuxet flood exposure, glacial till, fill, ledge, older construction, snow, freeze-thaw, dense neighborhoods, and aging utilities may require investigation before sealing an addition, ADU, conversion, site, or system.",
          projectTypes: "Defined scopes may include structural alterations, MEP systems, civil drainage, energy documentation, residential additions, ADUs, multifamily work, and commercial or industrial conversions. The seal should not imply responsibility for excluded architecture, survey, or geotechnical work.",
          sections: [
            {
              heading: "Cranston scope and evidence record",
              body: "List the address, jurisdiction, code edition, criteria, calculations, sheets, existing-condition evidence, assumptions, exclusions, and consultant interfaces. This makes the registered professional engineer’s responsibility legible to Building Inspection and avoids treating an unverified condition as a design fact.",
            },
            {
              heading: "Pawtuxet and existing-building interfaces",
              body: "Flood data, soil and ledge information, foundation observations, utility records, and field measurements may be needed for work near the river, on fill, or in an older building. The registered professional engineer responsible for the scope should preserve limitations and request additional evidence where the scope depends on it.",
            },
            {
              heading: "Cranston revision record",
              body: "Track each reviewer comment, substitution, RFI, and field condition with a date and sheet reference. The registered professional engineer responsible for the scope decides whether a sealed calculation or drawing changes, then issues coordinated revisions across structure, MEP, civil, energy, and architecture.",
            },
          ],
          permitSteps: [
            "Identify Cranston’s enforcing authority, occupancy, current code, flood or zoning triggers, discipline scope, checklist, and seal format.",
            "For Cranston, assemble field observations, existing drawings, soil and flood information, utility records, calculations, and consultant boundaries from the actual parcel survey.",
            "Have the registered Rhode Island professional engineer responsible for the scope review Cranston’s structural, MEP, civil, and energy sheets plus the associated calculations and exclusions.",
            "Route Cranston comments and construction changes through the registered professional engineer responsible for the scope and issue dated revised sealed sheets when the scope changes.",
          ],
          faqs: [
            {
              question: "Does a Cranston PE seal cover the whole permit set?",
              answer: "No. It applies to the registered professional engineer’s defined engineering scope. Architecture, survey, geotechnical, fire, utility, planning, flood, and environmental responsibilities remain separate where applicable.",
            },
            {
              question: "Can a Cranston PE rely on a homeowner’s existing-condition sketch?",
              answer: "The registered professional engineer responsible for the scope must decide whether it is enough for independent judgment and should identify limitations. Concealed framing, foundation, service, or drainage conditions may need field verification.",
            },
            {
              question: "What is a good Cranston sealed correction process?",
              answer: "Identify the comment, requirement, response, changed calculation or drawing, revision date, and open dependency. Route substitutions and RFIs affecting sealed work back to the registered professional engineer responsible for the scope before construction.",
            },
          ],
          sources: [
            { label: "Cranston Building Inspection Division", url: "https://www.cranstonri.gov/departments/building-and-public-works/building-inspection/" },
            { label: "Rhode Island Board of Registration for Professional Engineers (DBR)", url: "https://dbr.ri.gov/board-commissions" },
            { label: "Cranston Planning", url: "https://www.cranstonri.gov/departments/planning/" },
            { label: "Cranston Public Works", url: "https://www.cranstonri.gov/departments/public-works/" },
            { label: "Rhode Island Building Code Commission", url: "https://ribcc.ri.gov/" },
            { label: "Rhode Island DEM water resources", url: "https://dem.ri.gov/environmental-protection-bureau/water-resources" },
            { label: "FEMA Flood Map Service Center", url: "https://msc.fema.gov/portal/home" },
          ],
        },
      ],
    },
    {
      slug: "pawtucket",
      name: "Pawtucket",
      county: "Providence County",
      services: [
        {
          serviceSlug: "structural-engineering",
          title: "Pawtucket structural engineering for mill reuse",
          description: "Pawtucket structural design for historic mills, mixed-use conversions, additions, and Blackstone River conditions.",
          h1: "Structural Engineering for Pawtucket, Rhode Island",
          kicker: "Mill masonry, adaptive reuse, and river exposure",
          lede: "Pawtucket structural work often joins historic mill masonry, timber or steel framing, mixed-use occupancy, and Blackstone River flood considerations. A reliable design separates observed capacity from assumptions and carries new openings, equipment, and occupancy changes through the existing load path.",
          permitAuthority: "Pawtucket Planning and Redevelopment and the city building-permit process provide the local review path. Historic, zoning, fire, public works, floodplain, utility, and redevelopment reviews may be separate.",
          codeContext: "Confirm the Rhode Island adopted building, existing-building, fire, accessibility, wind, snow, seismic, and special-inspection provisions with Pawtucket before design. Occupancy change and historic or redevelopment status can materially alter the submittal.",
          localConditions: "Blackstone River flood exposure, historic mill masonry, timber and steel, urban fill, high groundwater, compact lots, snow, intense rainfall, and long industrial alteration histories affect load paths and foundations.",
          projectTypes: "Work includes Blackstone mill conversion, downtown rehabilitation, mixed-use infill, historic additions, ADUs, multifamily rehabilitation, commercial tenant improvements, and industrial reuse. Each may introduce new occupancy, egress, vibration, or equipment demands.",
          sections: [
            {
              heading: "Pawtucket mill evidence and load paths",
              body: "Mill walls, timber floors, steel framing, infill, past cuts, and repairs should be documented through records and field observations before assigning new loads. A tenant conversion may need more than member sizing because diaphragms, fire separation, vibration, and egress also change.",
            },
            {
              heading: "Blackstone flood and urban-fill interfaces",
              body: "Flood elevations, groundwater, fill, intense rainfall, and limited access can affect foundations, equipment, corrosion protection, and lower-level finishes. Coordinate structural work with Pawtucket public works, planning, FEMA information, utilities, and any historic or environmental review.",
            },
            {
              heading: "Pawtucket correction responses",
              body: "Answer each comment with its code or checklist basis, revised calculation, detail, and affected occupancy or fire document. ADUs and additions should be checked for their impact on existing foundations, egress, MEP penetrations, energy, and civil drainage.",
            },
          ],
          permitSteps: [
            "Confirm Pawtucket jurisdiction, occupancy or change of use, historic or redevelopment review, current code, flood criteria, and building checklist.",
            "Collect mill or building records, survey, framing and masonry observations, foundation and soil evidence, flood data, equipment loads, and prior alteration information.",
            "Coordinate load paths, diaphragm and connection work, openings, shoring, vibration, special inspections, fire-rated penetrations, and MEP routes.",
            "Log Pawtucket corrections, update calculations and details, and obtain responsible-engineer review of substitutions or concealed-condition changes.",
          ],
          faqs: [
            {
              question: "Why does a Pawtucket mill conversion need existing-structure investigation?",
              answer: "Historic masonry, timber or steel framing, prior openings, repairs, and new occupancy loads can change the available load path and fire or vibration requirements. Records and field observations should support the defined scope.",
            },
            {
              question: "How can the Blackstone River affect Pawtucket structure?",
              answer: "Flood elevation and site conditions can influence foundations, lower-level materials, equipment supports, finished floors, and civil-structural coordination. Current parcel-specific flood information should control.",
            },
            {
              question: "What does a Pawtucket structural correction matrix include?",
              answer: "List the reviewer comment, code or checklist basis, response, revised sheet and calculation, affected discipline, and remaining field or agency item. Acceptance remains with the city and other applicable reviewers.",
            },
          ],
          sources: [
            { label: "Pawtucket Zoning Department", url: "https://pawtucketri.gov/zoning-department/" },
            { label: "Pawtucket Planning and Redevelopment", url: "https://pawtucketri.gov/planning-and-redevelopment/" },
            { label: "Pawtucket Public Works", url: "https://pawtucketri.gov/public-works-department/" },
            { label: "Pawtucket Public Works Engineering Division", url: "https://pawtucketri.gov/public-works-department/engineering-division/" },
            { label: "Rhode Island Building Code Commission", url: "https://ribcc.ri.gov/" },
            { label: "FEMA Flood Map Service Center", url: "https://msc.fema.gov/portal/home" },
          ],
        },
        {
          serviceSlug: "mep-engineering",
          title: "Pawtucket MEP engineering for adaptive reuse",
          description: "Pawtucket MEP coordination for mill conversions, mixed-use buildings, tenant work, additions, and utility service.",
          h1: "MEP Engineering for Pawtucket, Rhode Island",
          kicker: "Historic systems, occupancy change, and utilities",
          lede: "Pawtucket MEP work must reconcile older mill infrastructure, mixed-use occupancy, winter heating, ventilation, fire and life safety, and the actual water, sewer, electric, and gas interfaces. A new tenant or ADU can expose capacity and distribution limits hidden by prior use.",
          permitAuthority: "Pawtucket’s planning and building-permit process handles local review, while fire, historic, public works, water supply, Narragansett Bay Commission, utilities, and health authorities may review connected systems.",
          codeContext: "Confirm Pawtucket’s current mechanical, plumbing, electrical, energy, fire, accessibility, existing-building, and occupancy-change requirements with the local authority and Rhode Island Building Code Commission. Use the actual use and construction type in the design record.",
          localConditions: "Historic mills, high ceilings, limited shafts, aging boilers and panels, Blackstone flood exposure, cold winters, humid summers, high groundwater, and compact access affect equipment, ventilation, service, and maintenance.",
          projectTypes: "Scopes include mill conversion, mixed-use infill, downtown tenant improvements, multifamily rehabilitation, restaurants, commercial interiors, ADUs, and historic additions. Existing utilities and fire-rated construction should be investigated before routing new systems.",
          sections: [
            {
              heading: "Pawtucket adaptive-reuse systems",
              body: "Existing boilers, panels, water and sewer connections, shafts, exhaust paths, and fire separations should be field-traced before equipment and distribution are fixed. High-bay spaces and historic envelopes may need a different ventilation and controls strategy than the prior industrial use.",
            },
            {
              heading: "Water, sewer, and flood-aware equipment",
              body: "Pawtucket Public Works water-service information and the Narragansett Bay Commission should inform pressure, fixture, backflow, sewer, and connection assumptions. Blackstone flood exposure and basement conditions can also affect equipment elevation, condensate, electrical rooms, and access.",
            },
            {
              heading: "Pawtucket review and correction record",
              body: "Occupancy or fire comments can change ventilation, loads, shafts, fire stopping, egress, and energy inputs simultaneously. Update risers, schedules, calculations, controls, penetrations, and ADU or addition interfaces in one coordinated response.",
            },
          ],
          permitSteps: [
            "Confirm Pawtucket use or occupancy, current mechanical, plumbing, electrical, energy, fire, accessibility, historic, and flood requirements.",
            "Trace existing equipment and request electric, gas, water, sewer, and fire-flow information from the relevant providers and authorities.",
            "Coordinate shafts, equipment clearances, exhaust, ventilation, controls, panel schedules, fire stopping, flood-aware placement, and shutdown phases.",
            "Return every Pawtucket comment with revised schedules, risers, load calculations, details, and utility or historic-review correspondence.",
          ],
          faqs: [
            {
              question: "What makes Pawtucket mill MEP work different?",
              answer: "Existing service capacity, high spaces, limited shafts, industrial exhaust, fire-rated construction, occupancy change, and historic constraints can all affect the system. Field evidence and the proposed use should govern the scope.",
            },
            {
              question: "Can a Pawtucket mixed-use project reuse its mill water service?",
              answer: "Only after pressure, fixture demand, backflow, connection ownership, water quality requirements, and fire-flow or utility conditions are verified for the new occupancy.",
            },
            {
              question: "How should a Pawtucket MEP correction be documented?",
              answer: "Tie each comment to the applicable provision, revised calculation, riser, schedule, detail, and sheet. Identify open fire, historic, utility, flood, or field dependencies rather than leaving them in narrative only.",
            },
          ],
          sources: [
            { label: "Pawtucket Zoning Department", url: "https://pawtucketri.gov/zoning-department/" },
            { label: "Pawtucket Planning and Redevelopment", url: "https://pawtucketri.gov/planning-and-redevelopment/" },
            { label: "Pawtucket Public Works Engineering Division", url: "https://pawtucketri.gov/public-works-department/engineering-division/" },
            { label: "Pawtucket Public Works", url: "https://pawtucketri.gov/public-works-department/" },
            { label: "Narragansett Bay Commission", url: "https://narrabay.com/" },
            { label: "Rhode Island Building Code Commission", url: "https://ribcc.ri.gov/" },
          ],
        },
        {
          serviceSlug: "civil-engineering",
          title: "Pawtucket civil engineering for riverfront redevelopment",
          description: "Pawtucket civil plans for mill sites, grading, drainage, utilities, access, floodplain, and compact urban parcels.",
          h1: "Civil Engineering for Pawtucket, Rhode Island",
          kicker: "Blackstone River, mill sites, and urban drainage",
          lede: "Pawtucket civil work must connect a reused mill or infill building to compact streets, utilities, fire access, accessible routes, and Blackstone River drainage conditions. A credible plan documents frontage, outfall ownership, flood elevation, and existing industrial site constraints.",
          permitAuthority: "Pawtucket Planning and Redevelopment and Public Works coordinate local development and infrastructure review, with building, water supply, Narragansett Bay Commission, RIDEM, floodplain, historic, and utility authorities involved as applicable.",
          codeContext: "Confirm Pawtucket zoning, redevelopment, site-plan, stormwater, floodplain, wetlands, erosion, right-of-way, accessibility, utility, and building thresholds for the parcel. Environmental or public-works authorization may be separate from the building permit.",
          localConditions: "Blackstone River floodplain, mill-site fill, high groundwater, compact frontage, intense rain, aging drainage, snowmelt, historic streets, and industrial utility remnants affect grading, infiltration, outfalls, and finished floors.",
          projectTypes: "Work includes mill conversion, downtown rehabilitation, mixed-use infill, historic additions, ADUs, multifamily sites, commercial improvements, and industrial redevelopment. Civil design should account for construction access, fire routes, and public-way impacts.",
          sections: [
            {
              heading: "Pawtucket mill-site survey",
              body: "The base plan should document boundaries, easements, historic structures, contours, retaining, utilities, curb and sidewalk, loading or fire access, existing inlets, flood data, and downstream ownership. Industrial records and field evidence often reveal connections absent from current maps.",
            },
            {
              heading: "Blackstone flood and urban drainage",
              body: "Flood elevations, fill, groundwater, short intense storms, snowmelt, and limited outfall capacity can affect finished floors, storage, pipe profiles, outlet protection, and maintenance. Coordinate with Pawtucket Public Works, FEMA, RIDEM, and water or sewer authorities.",
            },
            {
              heading: "Residential additions in a dense city",
              body: "An ADU, addition, patio, or access change can alter impervious area, fire routes, utilities, and runoff even on a small lot. Show the change and coordinate building entrances, sewer demand, grading, structural work, and any historic or zoning condition.",
            },
          ],
          permitSteps: [
            "Confirm Pawtucket planning, public-works, zoning, floodplain, historic, stormwater, right-of-way, utility, and building thresholds.",
            "Verify survey datum, mill or site records, flood information, easements, utilities, outfall ownership, finished floors, soils or fill, and access.",
            "Coordinate Pawtucket mill-site grading, drainage, accessible routes, fire access, frontage, utility profiles, erosion controls, construction access, and maintenance.",
            "Respond to each Pawtucket correction with revised contours, profiles, calculations, details, and clearly assigned agency or utility dependencies.",
          ],
          faqs: [
            {
              question: "Why does a Pawtucket mill site need more than a building footprint?",
              answer: "Flood elevation, existing fill, public frontage, utilities, fire access, drainage, loading, and downstream ownership can control site feasibility. The plan should connect the building to its real public and private interfaces.",
            },
            {
              question: "How should a Pawtucket ADU be screened for civil issues?",
              answer: "Check its roof and paving runoff, access, utility and sewer demand, fire route, setbacks, easements, impervious area, and flood condition. The local checklist determines the required level of plan detail.",
            },
            {
              question: "Does Pawtucket building approval authorize work in the Blackstone floodplain?",
              answer: "No. Floodplain, public-works, environmental, right-of-way, and utility permissions may be separate. Current mapping and the responsible local authority should determine the path.",
            },
          ],
          sources: [
            { label: "Pawtucket Planning and Redevelopment", url: "https://pawtucketri.gov/planning-and-redevelopment/" },
            { label: "Pawtucket Public Works", url: "https://pawtucketri.gov/public-works-department/" },
            { label: "Pawtucket Zoning Department", url: "https://pawtucketri.gov/zoning-department/" },
            { label: "Pawtucket Public Works Engineering Division", url: "https://pawtucketri.gov/public-works-department/engineering-division/" },
            { label: "Rhode Island DEM construction stormwater permitting", url: "https://dem.ri.gov/environmental-protection-bureau/water-resources/permitting/stormwater-permitting/construction" },
            { label: "FEMA Flood Map Service Center", url: "https://msc.fema.gov/portal/home" },
          ],
        },
        {
          serviceSlug: "energy-compliance",
          title: "Pawtucket energy compliance for mill conversion",
          description: "Pawtucket energy documentation for adaptive reuse, historic envelopes, mixed-use work, additions, and efficient systems.",
          h1: "Energy Compliance for Pawtucket, Rhode Island",
          kicker: "Adaptive-reuse envelopes and systems",
          lede: "Pawtucket energy work must reconcile the adopted Rhode Island path with high-bay or historic envelopes, new occupancy, HVAC distribution, ventilation, lighting, and service water. A mill conversion requires a traceable set of assumptions rather than a generic residential model.",
          permitAuthority: "Pawtucket’s building-permit process receives local energy documentation, while the Rhode Island Building Code Commission establishes the state framework. Historic, zoning, fire, flood, and utility reviews can constrain the selected assemblies or systems.",
          codeContext: "Confirm the current Rhode Island energy provisions, occupancy and change-of-use category, alteration method, commercial or residential forms, climate inputs, and Pawtucket checklist. The report should agree with the architectural, fire, structural, and MEP set.",
          localConditions: "Historic masonry, high-bay spaces, thermal bridges, cold winters, humid summers, river flood exposure, old windows, limited shafts, and equipment access affect envelope and system documentation.",
          projectTypes: "Mill conversion, mixed-use infill, historic rehabilitation, tenant improvements, multifamily work, ADUs, additions, and industrial office improvements may follow different paths. Existing construction and proposed occupancy should be established first.",
          sections: [
            {
              heading: "Pawtucket mill envelope evidence",
              body: "Document masonry, windows, roof assemblies, air control, insulation continuity, thermal bridges, penetrations, and moisture management as they will be built. Historic constraints and high-bay geometry should be reflected in details and selected compliance inputs.",
            },
            {
              heading: "Occupancy, HVAC, and lighting changes",
              body: "New ventilation, heating and cooling zones, exhaust, lighting controls, service water, and equipment access may be driven by occupancy rather than the former industrial use. Coordinate the energy inputs with fire separation, shafts, flood-aware equipment, and utility capacity.",
            },
            {
              heading: "Pawtucket energy correction record",
              body: "When plan check changes a window, envelope layer, HVAC selection, ventilation rate, or lighting control, revise the forms or report and affected construction documents together. An ADU or addition should show its energy and service relationship to the existing building.",
            },
          ],
          permitSteps: [
            "Confirm the Rhode Island energy provisions, Pawtucket occupancy or change-of-use route, historic constraints, climate data, applicable forms, and local checklist.",
            "Collect verified envelope, fenestration, HVAC, ventilation, lighting, service-water, controls, equipment, and occupancy inputs.",
            "Cross-check modeled inputs against mill or building details, fire and structural penetrations, MEP schedules, and flood-related equipment conditions.",
            "For Pawtucket mill or mixed-use review, answer each energy comment with its requirement, revised input or form, affected sheet, and dated coordination record.",
          ],
          faqs: [
            {
              question: "Does Pawtucket mill reuse use a residential energy path?",
              answer: "Not automatically. The proposed occupancy, construction scope, alteration or change-of-use category, and current Rhode Island provisions determine the method and documents.",
            },
            {
              question: "How should a historic Pawtucket envelope be modeled?",
              answer: "Use available probes, records, and documented assumptions to represent the existing and proposed assemblies. Historic review may constrain options, but the compliance record should still identify the selected method and limitations.",
            },
            {
              question: "What happens if Pawtucket review changes the HVAC zoning?",
              answer: "Recheck loads, equipment efficiency, ventilation, controls, electrical service, energy inputs, and affected details, then issue a coordinated revision rather than changing only the report.",
            },
          ],
          sources: [
            { label: "Rhode Island Building Code Commission", url: "https://ribcc.ri.gov/" },
            { label: "Pawtucket Zoning Department", url: "https://pawtucketri.gov/zoning-department/" },
            { label: "Pawtucket Planning and Redevelopment", url: "https://pawtucketri.gov/planning-and-redevelopment/" },
            { label: "Rhode Island Energy", url: "https://www.rienergy.com/" },
            { label: "Rhode Island DEM water resources", url: "https://dem.ri.gov/environmental-protection-bureau/water-resources" },
            { label: "FEMA Flood Map Service Center", url: "https://msc.fema.gov/portal/home" },
          ],
        },
        {
          serviceSlug: "pe-stamped-drawings",
          title: "Pawtucket PE-stamped drawings for adaptive reuse",
          description: "Pawtucket sealed engineering documents for mill, mixed-use, residential, and site work with defined responsibilities.",
          h1: "PE-Stamped Drawings for Pawtucket, Rhode Island",
          kicker: "Sealed scope for historic and redevelopment review",
          lede: "A Pawtucket sealed package should define the engineering scope, existing-building evidence, code and occupancy criteria, calculations, exclusions, and coordination boundaries. A seal does not replace historic, fire, flood, public-works, utility, or building review.",
          permitAuthority: "Pawtucket’s Planning and Redevelopment and building-permit process provide the local path, with public works, water supply, fire, historic, utilities, floodplain, and environmental authorities involved where applicable. The Rhode Island Board of Registration for Professional Engineers is the state registration authority; the registered PE responsible for the defined scope should confirm current registration, signature, and seal requirements before issuing engineering documents.",
          codeContext: "Identify the Rhode Island adopted code path, Pawtucket checklist, occupancy or change of use, design criteria, flood or historic interfaces, and discipline boundary. The registered professional engineer responsible for the scope should not present undocumented mill conditions or utility capacity as verified.",
          localConditions: "Historic masonry and steel, timber floors, industrial alterations, Blackstone flood exposure, urban fill, high groundwater, compact access, aging utilities, snow, and mixed-use occupancy may require investigation before sealing.",
          projectTypes: "Defined scopes may include mill structural work, MEP conversion, civil redevelopment, energy documents, mixed-use infill, historic additions, ADUs, and multifamily rehabilitation. Other professional scopes should remain explicitly identified.",
          sections: [
            {
              heading: "Pawtucket seal and responsibility matrix",
              body: "Identify the address, jurisdiction, code and occupancy criteria, existing-condition evidence, calculations, drawing index, assumptions, exclusions, and consultant interfaces. This helps distinguish a sealed engineering responsibility from architecture, survey, geotechnical, fire, or contractor work.",
            },
            {
              heading: "Evidence for mill and flood interfaces",
              body: "Existing framing, masonry, foundations, utility service, flood elevation, soils, and site drainage may need records and field verification before the registered professional engineer responsible for the scope can rely on them. The set should state limitations and required inspections rather than imply universal knowledge of the building.",
            },
            {
              heading: "Pawtucket corrections and substitutions",
              body: "Track each city or agency comment, substitution, RFI, and field observation with its date, response, calculation, and sheet. The registered professional engineer responsible for the scope decides whether the sealed scope changes and issues coordinated revisions for the affected disciplines.",
            },
          ],
          permitSteps: [
            "Identify Pawtucket’s enforcing authority, occupancy or change of use, current code, historic and flood interfaces, discipline scope, checklist, and seal format.",
            "Assemble survey, mill records, field observations, soil and flood information, utility records, calculations, and consultant boundaries.",
            "Have the registered Rhode Island professional engineer responsible for the scope review Pawtucket’s coordinated drawings, details, notes, schedules, calculations, exclusions, and mill inspection plan.",
            "Route Pawtucket corrections and construction changes through the registered professional engineer responsible for the scope and issue dated revised sealed sheets where the defined scope changes.",
          ],
          faqs: [
            {
              question: "Does a Pawtucket PE seal cover a historic mill’s full conversion?",
              answer: "No. It covers only the defined professional scope. Architecture, code, fire, historic, survey, geotechnical, civil, utility, and building responsibilities may remain separate.",
            },
            {
              question: "Can a Pawtucket engineer seal concealed mill framing without probes?",
              answer: "The registered professional engineer responsible for the scope must decide whether available evidence supports independent judgment. Concealed deterioration, connections, prior cuts, and capacity may require probes, testing, or explicit limitations.",
            },
            {
              question: "How should a Pawtucket sealed revision be controlled?",
              answer: "Tie the revision to the comment or field change, update affected calculations and sheets, identify the date and scope, and coordinate the complete package before resubmission or construction.",
            },
          ],
          sources: [
            { label: "Pawtucket Zoning Department", url: "https://pawtucketri.gov/zoning-department/" },
            { label: "Rhode Island Board of Registration for Professional Engineers (DBR)", url: "https://dbr.ri.gov/board-commissions" },
            { label: "Pawtucket Planning and Redevelopment", url: "https://pawtucketri.gov/planning-and-redevelopment/" },
            { label: "Pawtucket Public Works", url: "https://pawtucketri.gov/public-works-department/" },
            { label: "Pawtucket Public Works Engineering Division", url: "https://pawtucketri.gov/public-works-department/engineering-division/" },
            { label: "Rhode Island Building Code Commission", url: "https://ribcc.ri.gov/" },
            { label: "FEMA Flood Map Service Center", url: "https://msc.fema.gov/portal/home" },
          ],
        },
      ],
    },
    {
      slug: "newport",
      name: "Newport",
      county: "Newport County",
      services: [
        {
          serviceSlug: "structural-engineering",
          title: "Newport structural engineering for historic coastal buildings",
          description: "Newport structural design for historic renovations, waterfront additions, hospitality work, and coastal resilience.",
          h1: "Structural Engineering for Newport, Rhode Island",
          kicker: "Historic fabric, coastal wind, and salt exposure",
          lede: "Newport structural work must respect historic masonry and wood while addressing Narragansett Bay and Atlantic surge, wind, salt, shallow ledge, and compact lots. New openings, additions, equipment, and resilience measures need a documented existing load path and a coordinated historic review.",
          permitAuthority: "The City of Newport Department of Zoning and Inspections handles local building and zoning review. Historic preservation, planning, public works, fire, floodplain, coastal, wetlands, and Newport utilities may have separate authority.",
          codeContext: "Confirm the Rhode Island adopted building, existing-building, residential, wind, snow, flood, fire, accessibility, and special-inspection provisions with Newport. Historic and zoning approvals may affect the structural solution and should be identified before sealing.",
          localConditions: "Narragansett Bay and Atlantic surge, salt and wind, historic masonry and wood, shallow ledge, coastal wetlands, compact lots, snow, high groundwater, and limited construction access affect foundations, connections, and durability.",
          projectTypes: "Scopes include historic renovations, waterfront additions, hospitality work, ADUs where allowed, coastal resilience, small commercial fit-outs, and residential rehabilitation. Existing alterations and preservation conditions should be verified at the parcel.",
          sections: [
            {
              heading: "Newport historic structure investigation",
              body: "Document masonry, timber, framing connections, foundations, prior alterations, and concealed conditions before sizing openings, additions, or resilience work. Historic appearance is not proof of current capacity, and a repair should preserve both load path and approved character.",
            },
            {
              heading: "Coastal wind, salt, and ledge",
              body: "Wind uplift, surge, salt corrosion, shallow ledge, groundwater, and compact access can affect anchors, foundation geometry, material selection, finished floors, and equipment supports. Coordinate structural decisions with Newport planning, public works, historic review, FEMA, and environmental information.",
            },
            {
              heading: "Newport correction and preservation record",
              body: "Answer each reviewer comment with the cited requirement, revised calculation or detail, and affected historic, architectural, civil, MEP, or energy sheet. An ADU or addition should be evaluated for egress, fire separation, utilities, drainage, and preservation impacts.",
            },
          ],
          permitSteps: [
            "Confirm Newport zoning and inspections jurisdiction, occupancy, historic review, current code, flood and coastal status, wind and snow criteria, and checklist.",
            "Collect survey, historic records, framing and masonry observations, foundation and ledge information, flood data, equipment loads, and access constraints.",
            "Coordinate Newport foundations, coastal uplift and lateral connections, corrosion protection, openings, shoring, special inspections, fire separation, and MEP penetrations.",
            "Track Newport corrections and preservation comments, revise calculations and details, and route field changes through the responsible engineer.",
          ],
          faqs: [
            {
              question: "How do Newport historic requirements affect structural design?",
              answer: "They may constrain visible alterations, repair methods, window or wall changes, and attachment locations while the engineer still documents capacity and code requirements. The structural and preservation records should be coordinated.",
            },
            {
              question: "Does shallow Newport ledge simplify a foundation?",
              answer: "Not automatically. Ledge depth and continuity, groundwater, frost, excavation, drainage, and the proposed load must be verified for the parcel and construction method.",
            },
            {
              question: "What should a Newport correction response show?",
              answer: "Identify the city or preservation comment, cite its basis, show revised calculations or details and affected sheets, and list remaining survey, ledge, flood, utility, or inspection dependencies.",
            },
          ],
          sources: [
            { label: "Newport Zoning and Inspections", url: "https://www.cityofnewport.com/en-us/city-hall/departments/zoning-inspections" },
            { label: "Newport Planning Department", url: "https://www.cityofnewport.com/en-us/city-hall/departments/planning" },
            { label: "Newport Public Services Engineering Division", url: "https://www.cityofnewport.com/en-us/city-hall/departments/public-services/engineering-division" },
            { label: "Newport Utilities", url: "https://utilities.newportri.gov/" },
            { label: "Rhode Island Building Code Commission", url: "https://ribcc.ri.gov/" },
            { label: "FEMA Flood Map Service Center", url: "https://msc.fema.gov/portal/home" },
          ],
        },
        {
          serviceSlug: "mep-engineering",
          title: "Newport MEP engineering for coastal hospitality",
          description: "Newport MEP coordination for historic buildings, hospitality, waterfront work, additions, and coastal equipment.",
          h1: "MEP Engineering for Newport, Rhode Island",
          kicker: "Historic systems, hospitality, and coastal durability",
          lede: "Newport MEP design balances hospitality or residential occupancy, historic fabric, winter heating, summer humidity, coastal salt, flood exposure, and limited service routes. Equipment, ventilation, plumbing, and electrical changes should be documented without assuming an older building has spare capacity.",
          permitAuthority: "Newport Zoning and Inspections handles local building review. Planning, historic preservation, fire, public works, Newport Water, sewer authorities, and electric or gas providers may review related systems.",
          codeContext: "Confirm Newport’s current mechanical, plumbing, electrical, energy, fire, accessibility, existing-building, and flood-related requirements with the city and Rhode Island Building Code Commission. Historic and occupancy review can affect shafts, penetrations, and equipment placement.",
          localConditions: "Coastal salt and wind, humid summers, cold winters, surge, freeze risk, historic walls and ceilings, shallow basements, high groundwater, and compact access affect ventilation, condensate, corrosion, service, and maintenance.",
          projectTypes: "Work includes historic renovations, hotels and hospitality, waterfront additions, restaurants, small commercial fit-outs, ADUs where allowed, and residential rehabilitation. Existing service, fire separation, and preservation constraints should be field-verified.",
          sections: [
            {
              heading: "Newport equipment in historic spaces",
              body: "Trace existing electrical, water, sewer, heating, exhaust, shafts, and fire-rated construction before selecting new equipment. Low-clearance basements, historic finishes, limited roof access, and guest or residential comfort needs may all control routing and maintenance.",
            },
            {
              heading: "Coastal service and equipment protection",
              body: "Newport Water information, sewer records, electric and gas service, and fire-flow needs should support fixture, load, and equipment decisions. Salt, surge, condensate, corrosion, and equipment elevation should be addressed with manufacturer and flood information.",
            },
            {
              heading: "Newport coordinated review changes",
              body: "A historic or fire comment can move a shaft, change ventilation, alter electrical load, or affect energy and structural details. Revise risers, schedules, calculations, penetrations, controls, and preservation notes together; an addition or ADU remains tied to existing systems.",
            },
          ],
          permitSteps: [
            "Confirm Newport occupancy, historic and zoning review, current mechanical, plumbing, electrical, energy, fire, accessibility, and flood requirements.",
            "Field-trace existing systems and request electric, gas, water, sewer, and fire-flow information before finalizing loads, equipment, or connections.",
            "Coordinate shafts, equipment clearances, exhaust, ventilation, condensate, corrosion protection, controls, fire stopping, access, and shutdowns.",
            "Return Newport and preservation comments with revised calculations, schedules, risers, details, and utility correspondence in a dated matrix.",
          ],
          faqs: [
            {
              question: "What makes Newport hospitality MEP work site-specific?",
              answer: "Occupancy, kitchen or laundry loads, ventilation, historic penetrations, utility capacity, coastal exposure, guest comfort, and equipment access all affect the design. A prior hotel or residential system is not proof of current capacity.",
            },
            {
              question: "Can Newport equipment be placed in a lower level near the coast?",
              answer: "The location should be evaluated for flood elevation, drainage, access, corrosion, serviceability, electrical safety, and applicable local requirements. The design should document the evidence and any required protection.",
            },
            {
              question: "How should a Newport historic MEP correction be handled?",
              answer: "Identify the city or preservation comment, revise the affected riser, schedule, calculation, penetration, and detail, and coordinate the response with structure, energy, fire, and architecture before resubmission.",
            },
          ],
          sources: [
            { label: "Newport Zoning and Inspections", url: "https://www.cityofnewport.com/en-us/city-hall/departments/zoning-inspections" },
            { label: "Newport Planning Department", url: "https://www.cityofnewport.com/en-us/city-hall/departments/planning" },
            { label: "Newport Public Services Engineering Division", url: "https://www.cityofnewport.com/en-us/city-hall/departments/public-services/engineering-division" },
            { label: "Newport Utilities", url: "https://utilities.newportri.gov/" },
            { label: "Rhode Island Building Code Commission", url: "https://ribcc.ri.gov/" },
            { label: "Rhode Island Energy", url: "https://www.rienergy.com/" },
          ],
        },
        {
          serviceSlug: "civil-engineering",
          title: "Newport civil engineering for waterfront and historic sites",
          description: "Newport civil plans for coastal drainage, historic lots, access, utilities, floodplain, wetlands, and public frontage.",
          h1: "Civil Engineering for Newport, Rhode Island",
          kicker: "Waterfront drainage and compact historic parcels",
          lede: "Newport civil design connects historic buildings and coastal additions to compact streets, public frontage, utilities, fire access, accessible routes, and receiving waters. Flood elevation, wetlands, ledge, and preservation constraints should be established before grading or drainage is fixed.",
          permitAuthority: "Newport Planning, Zoning and Inspections, and Public Works coordinate local site and building review. Historic preservation, Newport Water, sewer authorities, RIDEM, coastal or wetlands reviewers, fire, and utilities may have separate jurisdiction.",
          codeContext: "Confirm Newport zoning, historic, site-plan, stormwater, floodplain, coastal, wetlands, right-of-way, erosion, accessibility, utility, and building thresholds. State environmental permissions and public-works approvals are not automatically included in a building permit.",
          localConditions: "Narragansett Bay and Atlantic surge, coastal wetlands, salt, shallow ledge, high groundwater, compact lots, historic streets, intense rain, snowmelt, and limited staging affect grades, infiltration, outfalls, finished floors, and access.",
          projectTypes: "Scopes include waterfront additions, historic renovations, hospitality sites, ADUs where allowed, coastal resilience, small commercial fit-outs, and residential infill. The site plan should show both historic context and practical construction or maintenance access.",
          sections: [
            {
              heading: "Newport survey and preservation context",
              body: "Document boundaries, easements, historic features, contours, ledge indicators, wetlands or flood information, curb and sidewalk, utilities, access, fire routes, existing drainage, and outfall ownership. A proposed grade should not conflict with a protected feature or public frontage.",
            },
            {
              heading: "Coastal runoff and ledge",
              body: "Surge, groundwater, ledge, salt, and intense rain can limit infiltration and alter storage, outlet protection, pipe profiles, finished floors, and maintenance. Coordinate the civil record with Newport Public Services Engineering Division, FEMA, RIDEM, historic review, and utility authorities.",
            },
            {
              heading: "Newport additions and ADUs",
              body: "An addition, ADU, terrace, parking change, or resilience measure can redirect runoff, consume access, affect impervious area, and change utility or flood conditions. Show the effect and coordinate grading with structure, MEP, zoning, preservation, and building entrances.",
            },
          ],
          permitSteps: [
            "Confirm Newport planning, zoning, historic, public-works, floodplain, coastal, wetlands, stormwater, right-of-way, utility, and building thresholds.",
            "Verify survey datum, historic and environmental information, flood elevations, ledge or groundwater evidence, easements, utilities, outfall ownership, and finished floors.",
            "Tie Newport coastal contours to drainage, accessible routes, fire access, frontage, utility profiles, erosion controls, maintenance, and construction staging.",
            "Respond to every Newport comment with revised contours, profiles, calculations, details, and assigned historic, utility, or environmental dependencies.",
          ],
          faqs: [
            {
              question: "Why can a Newport waterfront addition need wetlands review?",
              answer: "Grading, drainage, access, shoreline proximity, fill, and utility work can affect regulated resources even when the building footprint is modest. Current local and RIDEM information should determine the review path.",
            },
            {
              question: "How does shallow ledge affect a Newport civil plan?",
              answer: "It can constrain infiltration, pipe depth, foundations, drainage storage, excavation, and outlet design. The plan should use parcel-specific survey and subsurface evidence rather than a generalized island condition.",
            },
            {
              question: "Can a Newport building permit authorize shoreline drainage work?",
              answer: "No. Coastal, wetlands, floodplain, public-works, utility, or environmental approvals may be separate. Confirm authority and receiving-system acceptance before construction.",
            },
          ],
          sources: [
            { label: "Newport Planning Department", url: "https://www.cityofnewport.com/en-us/city-hall/departments/planning" },
            { label: "Newport Zoning and Inspections", url: "https://www.cityofnewport.com/en-us/city-hall/departments/zoning-inspections" },
            { label: "Newport Public Services Engineering Division", url: "https://www.cityofnewport.com/en-us/city-hall/departments/public-services/engineering-division" },
            { label: "Newport Utilities", url: "https://utilities.newportri.gov/" },
            { label: "Rhode Island DEM construction stormwater permitting", url: "https://dem.ri.gov/environmental-protection-bureau/water-resources/permitting/stormwater-permitting/construction" },
            { label: "FEMA Flood Map Service Center", url: "https://msc.fema.gov/portal/home" },
          ],
        },
        {
          serviceSlug: "energy-compliance",
          title: "Newport energy compliance for historic coastal work",
          description: "Newport energy documentation for historic envelopes, coastal additions, hospitality, HVAC, lighting, and controls.",
          h1: "Energy Compliance for Newport, Rhode Island",
          kicker: "Historic envelope and coastal systems documentation",
          lede: "Newport energy compliance must align Rhode Island’s adopted method with historic assemblies, coastal moisture, heating and cooling, ventilation, lighting, service water, and controls. Historic preservation may constrain the visible solution, but the documentation still needs traceable inputs.",
          permitAuthority: "Newport Zoning and Inspections receives local permit documents, while the Rhode Island Building Code Commission establishes the state framework. Planning, historic, flood, coastal, and utility review can affect windows, envelope layers, and equipment independently.",
          codeContext: "Confirm the current Rhode Island energy provisions, occupancy, alteration category, residential or commercial method, climate inputs, forms, and Newport checklist. The report must match the approved architectural and MEP details.",
          localConditions: "Cold winters, humid summers, coastal salt and wind-driven rain, historic masonry and windows, shallow basements, snow, flood exposure, and limited equipment routes influence assemblies and system choices.",
          projectTypes: "Historic renovations, waterfront additions, hospitality work, ADUs where allowed, small commercial fit-outs, and residential rehabilitation may follow different paths. Existing conditions and preservation decisions should be documented before selecting inputs.",
          sections: [
            {
              heading: "Newport historic envelope evidence",
              body: "Document walls, roofs, windows, air control, insulation, moisture management, thermal bridges, and penetrations as they will be built. Historic approvals may limit replacement or exterior changes, so the chosen compliance method should state existing conditions and constraints.",
            },
            {
              heading: "Coastal HVAC and service water",
              body: "Heating, cooling, ventilation, exhaust, filtration, lighting, service water, controls, condensate, and equipment elevation should agree with the MEP set. Salt, surge, access, and maintenance concerns can change the system details without supporting unsupported savings claims.",
            },
            {
              heading: "Newport energy correction coordination",
              body: "When review changes a window, envelope layer, HVAC schedule, ventilation rate, lighting control, or preservation detail, revise the forms or report and affected drawings together. An addition or ADU should identify its incremental loads and existing-system interface.",
            },
          ],
          permitSteps: [
            "Confirm Rhode Island’s current energy provisions, Newport occupancy and alteration route, historic or coastal constraints, climate inputs, forms, and checklist.",
            "Document Newport’s approved window and envelope assemblies alongside HVAC, ventilation, lighting, service-water, controls, and equipment-location inputs.",
            "Cross-check modeled inputs against preservation-approved details, structural penetrations, MEP schedules, flood-related elevations, and field conditions.",
            "Answer each Newport comment with its requirement, revised input or form, affected drawing reference, and dated coordination record.",
          ],
          faqs: [
            {
              question: "Does Newport historic review eliminate energy documentation?",
              answer: "No. Preservation may constrain the selected assembly or window, but the applicable Rhode Island energy path and local submission still need to be established and documented.",
            },
            {
              question: "How should a Newport addition address coastal moisture in energy work?",
              answer: "Coordinate water management, air control, insulation, windows, penetrations, equipment placement, and ventilation with the architectural and MEP design. The record should identify assumptions and inspection-sensitive details.",
            },
            {
              question: "Does Newport energy compliance guarantee hotel operating savings?",
              answer: "No. It documents code compliance under the selected method. Weather, occupancy, controls, commissioning, maintenance, equipment operation, and utility rates determine actual performance.",
            },
          ],
          sources: [
            { label: "Rhode Island Building Code Commission", url: "https://ribcc.ri.gov/" },
            { label: "Newport Zoning and Inspections", url: "https://www.cityofnewport.com/en-us/city-hall/departments/zoning-inspections" },
            { label: "Newport Planning Department", url: "https://www.cityofnewport.com/en-us/city-hall/departments/planning" },
            { label: "Rhode Island Energy", url: "https://www.rienergy.com/" },
            { label: "Rhode Island DEM water resources", url: "https://dem.ri.gov/environmental-protection-bureau/water-resources" },
            { label: "FEMA Flood Map Service Center", url: "https://msc.fema.gov/portal/home" },
          ],
        },
        {
          serviceSlug: "pe-stamped-drawings",
          title: "Newport PE-stamped drawings for historic coastal permits",
          description: "Newport sealed engineering documents with defined scope, preservation coordination, and site-specific evidence.",
          h1: "PE-Stamped Drawings for Newport, Rhode Island",
          kicker: "Responsible scope for historic coastal work",
          lede: "A Newport sealed package should identify its professional discipline, design criteria, historic and coastal interfaces, existing-condition evidence, assumptions, calculations, and exclusions. A seal does not replace Newport zoning, preservation, flood, coastal, wetlands, utility, fire, or building approval.",
          permitAuthority: "Newport Zoning and Inspections is the local building and zoning authority, while Planning, historic preservation, Public Works, fire, Newport Water, sewer authorities, and state environmental reviewers may have separate roles. The Rhode Island Board of Registration for Professional Engineers is the state registration authority; the registered PE responsible for the defined scope should confirm current registration, signature, and seal requirements before issuing engineering documents.",
          codeContext: "Identify the Rhode Island adopted code path, Newport checklist, occupancy, alteration category, historic or coastal criteria, discipline boundary, and seal format. The set should distinguish verified facts from survey, soil, flood, utility, or existing-condition assumptions and allow the registered professional engineer responsible for the scope to confirm the board’s current signature and seal requirements.",
          localConditions: "Historic masonry and wood, coastal wind and surge, salt, shallow ledge, wetlands, high groundwater, compact lots, snow, limited access, and aging utilities may require investigation before sealing structural, MEP, civil, or energy work.",
          projectTypes: "Defined scopes may include historic structural repair, MEP hospitality work, civil waterfront improvements, energy documents, additions, ADUs where allowed, resilience measures, and small commercial fit-outs. Excluded architecture, survey, preservation, and geotechnical roles should remain explicit.",
          sections: [
            {
              heading: "Newport seal and preservation boundaries",
              body: "State the parcel, jurisdiction, code and preservation criteria, existing-condition evidence, calculations, sheets, assumptions, exclusions, and interfaces with the architect, surveyor, preservation consultant, and contractor. The seal should be legible as a defined responsibility rather than an approval claim.",
            },
            {
              heading: "Coastal and historic evidence before sealing",
              body: "Flood information, ledge, groundwater, masonry and timber conditions, utility records, access, and approved historic details may control the scope. The registered professional engineer responsible for the scope should request enough evidence for independent judgment and state limitations where conditions remain concealed.",
            },
            {
              heading: "Newport correction and field-change control",
              body: "Track city, preservation, utility, and environmental comments along with substitutions, RFIs, and field observations. Update affected calculations and sheets, preserve revision dates and scope, and coordinate the complete response before issuing a revised sealed package.",
            },
          ],
          permitSteps: [
            "Identify Newport’s enforcing authority, occupancy, current code, historic and coastal review path, discipline scope, checklist, and seal format.",
            "Assemble survey, historic approvals, field observations, soil and flood information, utility records, calculations, and consultant boundaries.",
            "Have the registered Rhode Island professional engineer responsible for the scope review Newport’s coordinated drawings, details, notes, schedules, calculations, preservation exclusions, and inspection record.",
            "Route Newport and preservation corrections or construction RFIs through the registered professional engineer responsible for the scope and issue dated revised sealed sheets when scope changes.",
          ],
          faqs: [
            {
              question: "Does a Newport PE seal approve a historic alteration?",
              answer: "No. The seal addresses the defined engineering scope. Newport and its preservation, zoning, building, fire, coastal, wetlands, utility, and other reviewers retain their own authority.",
            },
            {
              question: "Can a Newport PE seal a waterfront foundation without flood evidence?",
              answer: "The registered professional engineer responsible for the scope should obtain sufficient parcel-specific survey, flood, soil, and existing-condition information or clearly state limitations and required verification. A general coastal assumption is not a substitute for evidence.",
            },
            {
              question: "How should a Newport sealed revision preserve accountability?",
              answer: "Tie it to the comment or field change, show revised calculations and sheets, identify the date and scope, and coordinate preservation, architecture, civil, MEP, energy, and inspection impacts before resubmission.",
            },
          ],
          sources: [
            { label: "Newport Zoning and Inspections", url: "https://www.cityofnewport.com/en-us/city-hall/departments/zoning-inspections" },
            { label: "Rhode Island Board of Registration for Professional Engineers (DBR)", url: "https://dbr.ri.gov/board-commissions" },
            { label: "Newport Planning Department", url: "https://www.cityofnewport.com/en-us/city-hall/departments/planning" },
            { label: "Newport Public Services Engineering Division", url: "https://www.cityofnewport.com/en-us/city-hall/departments/public-services/engineering-division" },
            { label: "Newport Utilities", url: "https://utilities.newportri.gov/" },
            { label: "Rhode Island Building Code Commission", url: "https://ribcc.ri.gov/" },
            { label: "FEMA Flood Map Service Center", url: "https://msc.fema.gov/portal/home" },
          ],
        },
      ],
    },
  ],
};

export { rhodeIslandBatch4 };
export default rhodeIslandBatch4;