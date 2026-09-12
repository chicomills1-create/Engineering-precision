import type { Batch2StateExpansion } from "./batch2-core-service-types";

const illinoisCodes = "Illinois adopts a statewide building-code baseline through the Capital Development Board; the applicable edition and locally adopted amendments must be checked with the AHJ at intake. Energy work follows the Illinois Commercial and Residential Building Standards Act and its Illinois commercial standard.";

const localCodeUrl = (permitUrl: string) => {
  if (permitUrl.includes("chicago.gov")) return { label: "Chicago Municipal Code Title 14B", url: "https://codelibrary.amlegal.com/codes/chicago/latest/chicago_il/0-0-0-1" };
  if (permitUrl.includes("rockfordil.gov")) return { label: "Rockford municipal code", url: "https://codelibrary.amlegal.com/codes/rockford/latest/rockford_il/0-0-0-1" };
  if (permitUrl.includes("peoriagov.org")) return { label: "Peoria Code of Ordinances", url: "https://library.municode.com/il/peoria/codes/code_of_ordinances" };
  if (permitUrl.includes("springfield.il.us")) {
    return { label: "Springfield OPED building-safety requirements", url: "https://www.springfield.il.us/Departments/OPED/BuildingSafety.aspx" };
  }
  return { label: "Champaign municipal permit and code resources", url: "https://champaignil.gov/public-works/permits-inspections/" };
};

const sources = (city: string, utility: string, flood: string) => [
  { label: "Illinois Capital Development Board codes", url: "https://cdb.illinois.gov/codes/codes.html" },
  { label: city.includes("champaignil.gov") ? "City of Champaign permit authority" : "Local permit office", url: city },
  localCodeUrl(city),
  ...(city.includes("champaignil.gov")
    ? [{ label: "City of Urbana Building Safety", url: "https://www.urbanail.gov/189/Building-Safety" }]
    : []),
  { label: "FEMA flood mapping service", url: "https://msc.fema.gov/portal/home" },
  { label: "Serving utility information", url: utility },
  { label: "Illinois State Water Survey", url: flood },
];

const illinoisBatch2: Batch2StateExpansion = {
  stateSlug: "illinois",
  stateName: "Illinois",
  stateAbbrev: "IL",
  hub: {
    title: "Illinois Engineering Services for Permits, Renovation, and New Construction",
    description: "Local structural, MEP, civil, energy-compliance, and PE-stamped-drawing guidance for Illinois projects, with AHJ-specific research for Chicago, Rockford, Peoria, Springfield, and Champaign-Urbana.",
    h1: "Illinois Engineering Services by Metro",
    kicker: "Illinois permitting and design coordination",
    lede: "Illinois projects move through a mix of state code requirements, municipal plan review, utility criteria, and site-specific flood, soil, wind, and winter constraints. Apex Grid Engineering can help organize the technical record; the responsible Illinois PE and the authority having jurisdiction confirm project-specific licensure, sealing, and submission requirements.",
    sections: [
      {
        heading: "One state baseline, five very different review environments",
        body: "The Capital Development Board maintains Illinois code resources, but Chicago has its own municipal construction-code administration and each downstate community controls its permit intake and local amendments. A warehouse in Rockford, a hospital addition in Peoria, and a tenant build-out in Chicago therefore need different AHJ conversations even when the same statewide provisions are relevant."
      },
      {
        heading: "Climate, water, and ground conditions belong in the first scoping call",
        body: "Freeze-thaw cycles, frost-sensitive soils, intense summer storms, river and lake floodplains, and wind-driven winter weather affect details well before a drawing set is sealed. A site investigation, FEMA and local floodplain review, utility capacity check, and confirmation of design criteria help keep an Illinois concept from relying on generic national assumptions."
      },
      {
        heading: "The right evidence makes a permit package reviewable",
        body: "A useful submission identifies the parcel, occupancy, construction type, existing conditions, energy path, utility interfaces, and responsible design professionals. Permit authority, code edition, fire or accessibility reviews, and any state-agency overlays should be documented rather than implied. No page can promise approval, a seal, a timeline, or a particular coverage outcome."
      }
    ],
    faqs: [
      {
        question: "Does Illinois use one building code everywhere?",
        answer: "Illinois has a statewide code framework administered through state law, while municipal authorities administer permits and may impose local requirements. Chicago's code and local processes are especially distinct. Confirm the currently effective edition, amendments, and authority for the parcel before design."
      },
      {
        question: "Who can seal engineering documents in Illinois?",
        answer: "The responsible professional must hold the appropriate Illinois PE authorization and meet the project and AHJ requirements. A project team should confirm responsible-charge, discipline, electronic-seal, and any reciprocity questions with the Illinois licensing authority and the reviewing office."
      },
      {
        question: "Are flood and winter conditions relevant outside the Chicago area?",
        answer: "Yes. Illinois river corridors, lake-influenced areas, drainage districts, and intense rainfall create location-specific flood questions, while frost, snow, and freeze-thaw affect foundations and utilities statewide. FEMA maps are a starting point, not a substitute for local floodplain and geotechnical review."
      }
    ],
    sources: [
      { label: "Illinois Capital Development Board", url: "https://cdb.illinois.gov/codes/codes.html" },
      { label: "Illinois Building Commission", url: "https://www.illinois.gov/cdb/Pages/default.aspx" },
      { label: "Illinois Department of Professional and Financial Regulation", url: "https://idfpr.illinois.gov/profs/pe.html" },
      { label: "FEMA National Flood Hazard Layer", url: "https://msc.fema.gov/portal/home" },
      { label: "Illinois State Water Survey", url: "https://www.isws.illinois.edu/" }
    ]
  },
  metros: [
    {
      slug: "chicago",
      name: "Chicago",
      county: "Cook County",
      services: [
        {
          serviceSlug: "structural-engineering",
          title: "Chicago Structural Engineering for Alterations, New Buildings, and Permit Review",
          description: "Chicago structural engineering for adaptive reuse, tenant improvements, rooftop equipment, and new construction, coordinated with the City of Chicago Department of Buildings and project-specific Illinois PE requirements.",
          h1: "Structural Engineering for Chicago Buildings",
          kicker: "Chicago structural design and existing-building analysis",
          lede: "Chicago's dense building stock turns a seemingly simple opening, rooftop unit, or change of occupancy into a question about load paths, neighboring construction, and the city's permit record. We develop an evidence-based structural scope for the responsible design professional to review and seal when required.",
          permitAuthority: "The City of Chicago Department of Buildings (DOB) is the principal building-permit authority; Chicago Department of Water Management, Fire Prevention, and other agencies can enter the review depending on scope. State-owned or specially regulated work may involve the Illinois Capital Development Board, and the project team must verify the actual AHJ and Illinois PE requirements. Start with the DOB work description and existing permit record, then identify separate landmark, public-way, fire, or adjacent-property reviews before setting the structural package.",
          codeContext: illinoisCodes + " Chicago's Municipal Code Title 14B and DOB submission rules control the municipal path; the currently effective Chicago provisions, zoning review, landmark overlays, and any project-specific amendments should be confirmed before calculations are finalized.",
          localConditions: "Lake Michigan exposure, freeze-thaw, wind on tall façades, deep urban excavation, and irregular masonry party walls are common design drivers. Chicago sites may also encounter filled ground, aging foundations, alley utilities, and limited laydown space.",
          projectTypes: "Loop office-to-residential conversions, two- and three-flat renovations, Fulton Market tenant improvements, rooftop mechanical screens, warehouse repositioning, and infill mixed-use buildings.",
          sections: [
            { heading: "Existing masonry is a field-verification problem", body: "Chicago's prewar masonry, timber, and early steel buildings rarely match an as-built drawing perfectly. Probe locations, selective demolition, crack mapping, and a clear distinction between observed and assumed conditions help evaluate new openings, lintel changes, and floor loading without hiding uncertainty." },
            { heading: "Rooftops need more than a unit weight", body: "Packaged units, screens, snow drift, maintenance access, vibration, and dunnage reactions must be traced into the existing roof framing. In the lakefront wind environment, anchorage and edge conditions deserve a separate check; the DOB package should show how equipment work avoids an unexamined load path." },
            { heading: "Tight sites change construction sequencing", body: "Party-wall protection, underpinning triggers, excavation movement, and temporary shoring can matter as much as the final member sizes. A Chicago structural narrative should coordinate the geotechnical report, adjacent-owner notifications, contractor means and methods, and the city's applicable excavation or public-way requirements." }
            ,{ heading: "Chicago permit history is design evidence", body: "The Chicago DOB permit-history record, landmark review, alley access, and prior alterations should be reconciled before a new beam or opening is drawn. The final package should identify which conditions were observed in the Loop, lakefront, or neighborhood building and which remain subject to field confirmation." }
          ],
          permitSteps: [
            "Open the Chicago DOB Permit Program record and confirm the work description, occupancy, zoning path, and whether Fire Prevention, landmark, or public-way review runs in parallel.",
            "Attach probes, adjacent-condition photographs, geotechnical information, and proposed load-path changes to the DOB calculation set; resolve missing records before relying on assumptions.",
            "Coordinate architectural, MEP, fire, accessibility, and construction-sequence sheets so structural notes and details agree across the Chicago submission.",
            "Have the responsible Illinois PE confirm professional responsibility, seal requirements, and the electronic submission format before filing with the applicable authority.",
            "Respond to DOB and agency comments with a dated revision narrative; field changes remain subject to the responsible professional and AHJ.",
            "Upload the structural revision through the Chicago DOB Permit Program, and reconcile the accepted building-permit set with any landmark or public-way comment before a rooftop or party-wall change reaches the field."
          ],
          faqs: [
            { question: "Can a Chicago rooftop unit be added from a manufacturer cut sheet alone?", answer: "Usually not. The cut sheet supplies reactions, but the existing roof framing, dunnage, drift, vibration, access, and anchorage must be checked. The responsible PE and DOB determine the required documentation for the particular building." },
            { question: "Do Chicago party walls require a different structural investigation?", answer: "They can. Shared masonry, historic alterations, and constrained excavation make ownership and temporary-condition questions important. Survey and probe work should precede design, with adjacent-property and public-way requirements coordinated with the permit team." },
            { question: "Does a Chicago interior opening always need a permit?", answer: "Not every repair has the same path, but an opening that changes a bearing or fire-rated assembly can affect permit scope. Confirm the current DOB work classification and have the responsible design professional evaluate the structure and life-safety implications." },
            { question: "What should a Chicago owner retain after a structural alteration?", answer: "Keep the Chicago DOB-approved set, Permit Program receipt, probes or survey, calculations, special-inspection records, and any party-wall or landmark conditions. Those records help the next engineer distinguish verified framing from assumptions." }
          ],
          sources: sources("https://www.chicago.gov/city/en/depts/bldgs/provdrs/permits.html", "https://www.comed.com/MyAccount/MyBillUsage/Pages/default.aspx", "https://www.isws.illinois.edu/statecli/"),
        },
        {
          serviceSlug: "mep-engineering",
          title: "Chicago MEP Engineering for Tenant Build-Outs and Building Systems",
          description: "Chicago MEP engineering for commercial interiors, multifamily rehabilitation, laboratory and restaurant systems, utility coordination, and permit documentation tailored to the City of Chicago review path.",
          h1: "MEP Engineering for Chicago Projects",
          kicker: "Mechanical, electrical, and plumbing coordination in Chicago",
          lede: "A Chicago build-out has to fit real risers, constrained ceiling zones, ComEd service limitations, and a building department record that may span many renovations. Our MEP scope starts with field conditions and operational loads so each discipline can be coordinated by the responsible Illinois professionals.",
          permitAuthority: "Chicago DOB receives the building permit package, while the Chicago Department of Buildings, Department of Water Management, Fire Prevention Bureau, and utility providers can govern separate portions of the work. Confirm whether a trade permit, fire alarm review, backflow requirement, or utility approval is triggered by the actual scope. A landlord riser approval and ComEd service conversation should be tracked separately from DOB plan review.",
          codeContext: illinoisCodes + " Chicago's local mechanical, electrical, plumbing, energy, and fire provisions in the Municipal Code may amend or supplement the state baseline. Verify the current Chicago code, trade-permit and submission checklist, and any high-rise or fire-review overlay rather than treating an Illinois-wide reference as a complete permit basis.",
          localConditions: "Winter heating capacity, summer latent loads, lakefront humidity, older electrical services, combined-sewer constraints, and narrow riser shafts commonly shape Chicago MEP decisions. Restaurants and laboratories add exhaust, makeup air, grease, process, or specialty-gas coordination.",
          projectTypes: "River North office fit-outs, West Loop restaurants, high-rise condominium common areas, neighborhood medical clinics, data-room upgrades, and adaptive reuse of industrial lofts.",
          sections: [
            { heading: "The riser and service survey comes first", body: "A high-rise tenant plan is not a blank rectangle: electrical rooms, plumbing stacks, ventilation shafts, smoke-control interfaces, and landlord metering rules define the feasible layout. Verify available fault current, panel capacity, water pressure, sanitary elevations, and shaft firestopping before selecting equipment." },
            { heading: "ComEd coordination affects the electrical concept", body: "A service upgrade or distributed generation concept needs a utility conversation, not only a load calculation. Demand, transformer location, switchgear clearances, emergency systems, and tenant-versus-base-building ownership should be shown in an electrical narrative that the Chicago reviewers and utility can follow." },
            { heading: "Restaurant ventilation is a neighborhood issue", body: "Kitchen exhaust routes must reconcile grease duct clearances, makeup air, roof penetrations, odor and noise, fire suppression interfaces, and the building's existing structure. In dense Chicago blocks, a routing that appears short on plan may create a major façade, shaft, or roof coordination issue." }
            ,{ heading: "Chicago risers have an ownership boundary", body: "A landlord's base-building controls, a tenant's meter, and a utility's service equipment are not interchangeable. Tie each item to the Chicago DOB trade-permit package, ComEd service correspondence, and building-engineer approval before a final ceiling plan." }
          ],
          permitSteps: [
            "Use the Chicago DOB trade-permit checklist with the landlord to mark occupancy, fire-alarm triggers, backflow, ComEd service, and each base-building tie-in before layout.",
            "Walk the risers with the building engineer and record panels, meters, shafts, plumbing, roof penetrations, landlord criteria, and unavailable ComEd or water capacity in the trade-permit exhibit.",
            "Develop coordinated mechanical, electrical, plumbing, energy, controls, and fire-protection information with architectural clearances and structural penetrations.",
            "Obtain responsible Illinois PE review and seal decisions, utility studies, and any water, backflow, or fire-agency documents required for this project.",
            "Submit through the applicable Chicago process, track agency comments by discipline, and keep construction substitutions under professional review.",
            "Attach the ComEd service letter and Chicago DOB trade-permit revision to the MEP closeout record, then log special-inspection and concealed-condition decisions by system."
          ],
          faqs: [
            { question: "Will ComEd approve a Chicago service increase automatically?", answer: "No. Service capacity, transformer and meter arrangements, protection, easements, and utility construction requirements are project-specific. The electrical engineer should coordinate a load letter and utility discussion early, without promising capacity or a connection date." },
            { question: "What makes a Chicago restaurant MEP package different?", answer: "Grease exhaust, makeup air, odor, fire suppression, gas, refrigeration, sanitation, acoustics, and roof routing interact with occupancy and neighboring tenants. DOB, Fire Prevention, the utility, and the building owner may each have requirements." },
            { question: "Can existing Chicago drawings be trusted for an office renovation?", answer: "They are useful evidence but not proof of current conditions. Field verification is particularly important for concealed risers, panel schedules, dampers, abandoned piping, and prior unrecorded work." },
            { question: "Who owns a Chicago tenant tie-in?", answer: "The lease, Chicago DOB trade-permit package, base-building rules, ComEd correspondence, and utility tariff may assign different portions to the landlord, tenant, or utility. Put the disconnect, meter, riser, controls, and maintenance boundary in writing." }
          ],
          sources: sources("https://www.chicago.gov/city/en/depts/bldgs/provdrs/permits.html", "https://www.comed.com/BusinessCustomers/ServiceRequests/Pages/default.aspx", "https://www.isws.illinois.edu/statecli/"),
        },
        {
          serviceSlug: "civil-engineering",
          title: "Chicago Civil Engineering for Urban Sites, Stormwater, and Utility Work",
          description: "Chicago civil engineering for infill development, site utilities, stormwater, public-way coordination, and flood-aware grading, with a permit strategy tied to the parcel and responsible professionals.",
          h1: "Civil Engineering for Chicago Sites",
          kicker: "Urban civil design, drainage, and utility coordination",
          lede: "Chicago civil work is shaped by nearly built-out parcels, alleys, combined sewers, basement elevations, and public-way interfaces. We turn survey and utility evidence into a site plan that distinguishes private work from Chicago Department of Transportation, Water Management, and other agency approvals.",
          permitAuthority: "The Chicago Department of Buildings coordinates the building permit, while the Department of Transportation controls many public-way and access matters and the Department of Water Management reviews relevant sewer and water work. MWRD, the Metropolitan Water Reclamation District of Greater Chicago, and utility owners may also have jurisdiction; the parcel-specific path must be confirmed. Treat CDOT, Water Management, and MWRD transmittals as distinct approvals rather than assuming a DOB permit covers the street or sewer.",
          codeContext: illinoisCodes + " Chicago stormwater, sewer, grading, zoning, landscape, and public-way requirements are local and can be triggered by impervious-area changes or connections. Check current Chicago and MWRD criteria, including any threshold or release requirement, against the survey, watershed, and proposed disturbance.",
          localConditions: "Flat grades, high groundwater, clay and fill, combined sewer capacity, intense cloudbursts, and basement or foundation elevations create Chicago-specific drainage risk. Lakefront and river-adjacent parcels require floodplain and outfall checks rather than a generic detention detail.",
          projectTypes: "West Side industrial infill, parking-lot reconstruction, townhouse developments, schoolyard improvements, loading-court reconfiguration, and mixed-use sites with limited stormwater storage.",
          sections: [
            { heading: "A Chicago site plan must show the public edge", body: "Driveways, sidewalk vaults, alley aprons, curb cuts, hydrants, street trees, and protected infrastructure can constrain a site before grading begins. A topographic survey should identify the public-way interface and the civil narrative should assign each improvement to the correct agency or owner." },
            { heading: "Combined sewers make assumptions expensive", body: "A proposed connection needs invert, capacity, backwater, and approval information. Where detention or controlled release is required, the concept should account for MWRD and Chicago criteria, maintenance access, overflow routing, and the possibility that a basement elevation changes the feasible gravity path." },
            { heading: "Urban flood resilience is a design coordination task", body: "Cloudburst runoff can reach a low loading dock or basement from neighboring pavement even when the parcel itself is outside a mapped flood zone. Grading, emergency overflow, foundation drainage, backflow protection, and landscape storage should be coordinated with architecture and waterproofing." }
            ,{ heading: "Chicago public-way restoration needs a separate ledger", body: "A curb cut, vault, alley patch, sidewalk opening, and sewer connection can each carry a different owner and restoration obligation. Track the CDOT public-way permit and Water Management/MWRD disposition separately from private grading so the civil set does not imply that DOB authorizes street work." }
          ],
          permitSteps: [
            "Obtain a current boundary and topographic survey, title and easement information, utility locate data, and the applicable FEMA and local floodplain records.",
            "Read the parcel's Chicago DOB, CDOT public-way, Water Management, and MWRD intake requirements against the survey, assigning each curb, sewer, water, excavation, and street item to its reviewing agency.",
            "Prepare the CDOT/Water Management civil exhibits with grading, utility, stormwater, erosion-control, access, restoration, existing and proposed inverts, and named maintenance parties.",
            "Coordinate the civil set with structural foundations, landscape, plumbing, fire access, and geotechnical recommendations before the responsible PE seals where required.",
            "Submit agency applications separately when necessary and revise connection, detention, or public-way details in response to written comments.",
            "Obtain the applicable CDOT public-way permit and Water Management/MWRD sewer disposition, then carry those artifact numbers into the civil release; a DOB approval alone does not authorize street or sewer work."
          ],
          faqs: [
            { question: "Is a FEMA map enough to design Chicago stormwater?", answer: "No. FEMA mapping addresses mapped flood hazards, while cloudburst runoff, combined sewer behavior, local drainage, and basement vulnerability require additional site and agency information. MWRD and Chicago criteria should be checked for the project." },
            { question: "Who approves a new Chicago curb cut?", answer: "The applicable Chicago public-way authority, often CDOT, controls the curb-cut or public-way portion, while DOB and other departments may review the overall development. The owner should not treat a building permit as authorization for every street improvement." },
            { question: "Can an infill site discharge directly to the sewer?", answer: "That depends on available capacity, connection details, stormwater requirements, and agency approval. The civil engineer should verify invert and release assumptions; no discharge approval or capacity should be promised before review." },
            { question: "Why separate Chicago public-way and private-site plans?", answer: "CDOT, Water Management, MWRD, and DOB can review different portions of the work. The CDOT public-way permit, sewer disposition, alley restoration, and private grading should each identify the authority and maintenance obligation." }
          ],
          sources: sources("https://www.chicago.gov/city/en/depts/cdot/provdrs/permits.html", "https://www.comed.com/MyAccount/MyBillUsage/Pages/default.aspx", "https://mwrd.org/stormwater-management"),
        },
        {
          serviceSlug: "energy-compliance",
          title: "Chicago Energy Compliance for Commercial Buildings and Renovations",
          description: "Chicago energy-compliance support for envelope, HVAC, lighting, controls, and alterations, using the applicable Illinois and Chicago energy-code route.",
          h1: "Energy Compliance for Chicago Projects",
          kicker: "Illinois and Chicago energy-code documentation",
          lede: "Energy compliance in Chicago is a documented code path: identify the applicable edition, scope of alteration, envelope conditions, equipment efficiencies, lighting controls, and owner decisions. We organize the calculations and narratives for responsible professional review without promising an approval or a particular performance result.",
          permitAuthority: "Chicago DOB is the principal building-review authority for most private work, with the building owner, utility, and potentially state or federal programs adding separate requirements. Confirm whether the project follows Chicago's current energy provisions, the Illinois commercial energy standard, a prescriptive path, or an approved performance approach. Record the DOB alteration area and the building owner's energy documentation route before modeling.",
          codeContext: illinoisCodes + " Chicago may apply local energy and building provisions through its Municipal Code, while Illinois law establishes the statewide commercial energy standard. Verify the code edition, alteration exception, commissioning, lighting, and documentation path with DOB at intake.",
          localConditions: "Heating-dominated winters, humid summers, lakefront wind, high-rise envelope leakage, steam or hydronic legacy systems, and ComEd demand charges influence Chicago energy decisions. Existing masonry and landmark constraints can limit envelope improvements and increase the importance of controls and sequencing.",
          projectTypes: "High-rise office modernization, multifamily common-area upgrades, retail fit-outs, institutional renovations, warehouse lighting replacements, and electrification studies for older apartment buildings.",
          sections: [
            { heading: "Alteration scope determines the compliance conversation", body: "Replacing a rooftop unit, reroofing, changing windows, or renovating a tenant floor does not create the same documentation burden. Establish what is new, what is untouched, and what is triggered by the current Chicago and Illinois provisions before choosing prescriptive tables or a performance model." },
            { heading: "Chicago's tall-building envelope needs an operations lens", body: "Air leakage, vestibules, curtain-wall spandrels, perimeter heating, and tenant controls can dominate actual consumption. A useful compliance package links modeled assumptions to details, sequences, and owner responsibilities so a code calculation does not become disconnected from the building's operating reality." },
            { heading: "Electrification requires service and winter checks", body: "Heat-pump concepts should be tested against Chicago winter design conditions, defrost and supplemental heat, roof loading, acoustics, refrigerant routing, and ComEd service impacts. The energy path should be coordinated with MEP and structural disciplines, not selected from efficiency data alone." }
            ,{ heading: "Chicago energy records must explain alteration boundaries", body: "A partial-floor renovation, façade repair, or central-plant change can touch different code triggers. Tie every Chicago DOB energy-compliance worksheet to the rooms and assemblies actually in scope, and preserve the owner's decision record for exclusions and future phases." }
          ],
          permitSteps: [
            "Record the Chicago DOB alteration area, project date, occupancy, energy route, owner target, and required energy worksheet before choosing prescriptive tables or a model.",
            "Populate the Chicago energy worksheet with envelope assemblies, existing equipment, schedules, lighting, controls, utility data, and field evidence; label every assumption affecting the compliance method.",
            "Select and document the applicable prescriptive or performance path, including HVAC, service-water heating, lighting controls, envelope, and commissioning obligations.",
            "Coordinate energy forms and notes with the architectural, MEP, fire, and structural set, then obtain responsible professional review and sealing where required.",
            "Submit the energy documentation with the Chicago permit package and track revisions so substitutions and field changes remain evaluated.",
            "Keep the Chicago DOB energy-compliance worksheet, envelope details, equipment schedules, and controls narrative synchronized through plan review and procurement."
          ],
          faqs: [
            { question: "Which energy standard governs a Chicago alteration?", answer: "Illinois and Chicago projects use the applicable Illinois and local commercial energy requirements. The edition, scope exceptions, and documentation route must be confirmed with the current AHJ before design is finalized." },
            { question: "Can a Chicago window replacement be treated as maintenance?", answer: "Not automatically. The scope, occupancy, façade, historic status, and applicable alteration provisions determine what documentation is needed. The owner should have the current DOB path and envelope requirements confirmed before ordering units." },
            { question: "Do ComEd bills prove code compliance?", answer: "No. Utility bills help calibrate an existing-building analysis but do not replace code calculations, equipment documentation, controls sequences, or inspection evidence. They also reflect occupancy and operations outside the engineer's control." },
            { question: "What makes a Chicago high-rise energy alteration difficult?", answer: "Curtain-wall interfaces, perimeter heat, tenant controls, landlord systems, landmark limits, and vertical risers can each set the feasible scope. Tie the Chicago DOB energy worksheet to the alteration area and the building operator's actual sequences." }
          ],
          sources: sources("https://www.chicago.gov/city/en/depts/bldgs/provdrs/permits.html", "https://www.comed.com/SmartEnergy/MyAccount/Pages/Energy-Usage.aspx", "https://www.energy.gov/eere/buildings/building-energy-codes-program"),
        },
        {
          serviceSlug: "pe-stamped-drawings",
          title: "PE-Stamped Drawings for Chicago Permit and Construction Packages",
          description: "Chicago PE-stamped-drawing coordination for structural, MEP, civil, and energy documents, with a disciplined review of responsible charge, city submission rules, and project-specific Illinois authorization.",
          h1: "PE-Stamped Drawings for Chicago Projects",
          kicker: "Professional engineering document coordination",
          lede: "A seal is the conclusion of responsible professional review, not a product added to an incomplete plan set. For Chicago work, we help assemble the survey, calculations, drawings, specifications, and agency evidence needed for the Illinois PE and Chicago DOB to evaluate the actual project.",
          permitAuthority: "Chicago DOB governs most private building submissions, with CDOT, Water Management, Fire Prevention, utilities, and state agencies involved as scope dictates. The responsible Illinois PE must confirm discipline, responsible charge, seal format, and whether another jurisdiction or owner requires an additional review. The cover sheet should identify the DOB application, separate agency packages, and the exact sheets within professional responsibility.",
          codeContext: illinoisCodes + " Chicago Municipal Code Title 14B and current e-permit and drawing conventions apply to the municipal package. A stamp does not waive zoning, fire, accessibility, utility, or floodplain requirements and does not guarantee Chicago approval.",
          localConditions: "Chicago's high-rise wind, lakefront weather, old masonry, constrained public ways, combined sewers, and dense utility corridors create coordination risks that a signature cannot cure. Existing-condition evidence and cross-discipline consistency are especially important.",
          projectTypes: "Permit-ready restaurant alterations, condominium mechanical replacements, loft conversions, rooftop equipment packages, infill site improvements, and public-sector renovation bid documents.",
          sections: [
            { heading: "Responsible charge starts with a scope boundary", body: "A Chicago drawing index should say which sheets and calculations were reviewed, which facts came from surveys or contractors, and which disciplines remain under another professional. This protects the integrity of the package and gives DOB a clear route to questions." },
            { heading: "A complete record is more useful than a decorative seal", body: "Load paths, equipment schedules, utility letters, stormwater assumptions, code analyses, details, and specifications need to agree. Conflicting panel schedules, uncoordinated penetrations, or a civil plan that ignores a structural foundation can prompt comments despite a validly formatted seal." },
            { heading: "Construction administration keeps the seal meaningful", body: "Substitutions, concealed conditions, RFIs, and field changes can alter the basis of design. The responsible PE should define what requires review and document revisions; neither a contractor nor an owner should assume that the original seal covers unreviewed changes." }
            ,{ heading: "Chicago's e-submittal record should be internally consistent", body: "Sheet numbers, revision clouds, calculation references, and DOB application descriptions should tell the same story. A coordination checklist should cross-reference the DOB e-permit receipt, CDOT application, and utility correspondence when documents use different Chicago review lanes." }
          ],
          permitSteps: [
            "Build the Chicago DOB application index first: name the owner, scope, discipline boundaries, CDOT or utility companion filings, and every sheet within professional responsibility.",
            "Bind surveys, existing drawings, calculations, geotechnical and utility records, manufacturer data, and architectural backgrounds to the DOB application index; flag unverifiable assumptions.",
            "Coordinate the drawing set, code analysis, specifications, calculations, and forms, then have the responsible Illinois PE perform the substantive review.",
            "Apply the seal and signature only in the manner permitted for the responsible professional and accepted by the current Chicago submission system.",
            "Submit to DOB and related authorities, answer comments through the responsible team, and log any construction revision that changes the sealed basis.",
            "Archive the Chicago DOB e-permit receipt, accepted revision set, calculation index, and separate CDOT or utility correspondence for the owner and construction administrator."
          ],
          faqs: [
            { question: "Does a PE stamp guarantee a Chicago permit?", answer: "No. A seal documents professional responsibility for the engineer's work; DOB and other authorities independently review zoning, building, fire, accessibility, utilities, and other requirements. Approval and timing cannot be guaranteed." },
            { question: "Can one Illinois PE seal every discipline on a Chicago project?", answer: "Only if that professional is qualified, responsible, and authorized for each discipline and actually performs the required review. The project should identify separate responsible professionals when scope exceeds one person's competence or charge." },
            { question: "Are contractor shop drawings covered by the permit stamp?", answer: "Not automatically. Shop drawings and substitutions need the review defined by the contract and the responsible professional. A field change that alters design assumptions may require revised calculations, drawings, and AHJ coordination." },
            { question: "How should a Chicago sealed package address several review lanes?", answer: "Index the DOB e-permit receipt, fire, CDOT public-way permit, Water Management/MWRD disposition, utility, and any state documents separately, then cross-reference common calculations. A seal does not merge approvals." }
          ],
          sources: sources("https://www.chicago.gov/city/en/depts/bldgs/provdrs/permits.html", "https://www.comed.com/BusinessCustomers/ServiceRequests/Pages/default.aspx", "https://idfpr.illinois.gov/profs/pe.html"),
        }
      ]
    },
    {
      slug: "rockford",
      name: "Rockford",
      county: "Winnebago County",
      services: [
        {
          serviceSlug: "structural-engineering",
          title: "Rockford Structural Engineering for Industrial, Commercial, and Residential Work",
          description: "Rockford structural engineering for manufacturing facilities, warehouse conversions, commercial renovations, and new buildings coordinated with the City of Rockford Community and Economic Development permit process.",
          h1: "Structural Engineering for Rockford Buildings",
          kicker: "Rockford industrial and existing-building structural design",
          lede: "Rockford's industrial legacy leaves owners with large-span frames, additions from different eras, and foundations that must be understood before a new tenant or production line is approved. We develop locally grounded structural evaluations for review and sealing by the responsible Illinois PE.",
          permitAuthority: "The City of Rockford Community and Economic Development Department handles municipal building-permit intake and plan review for city parcels; Winnebago County and neighboring municipalities have separate authorities. Fire, floodplain, state-facility, and utility reviews may be concurrent, so the address and project scope control the path. For an industrial alteration, establish the city occupancy and permit classification before relying on an older factory approval or county record.",
          codeContext: illinoisCodes + " Rockford's adopted municipal code, zoning, existing-building provisions, and current permit checklists should be checked with the city. The applicable code edition should be stated on drawings rather than inferred from an older industrial permit.",
          localConditions: "Cold winters, frost depth, freeze-thaw, severe thunderstorms, snow drift on broad roofs, and glacial soils shape Rockford structural decisions. Rock River and low-lying industrial areas also warrant floodplain, groundwater, and foundation drainage review.",
          projectTypes: "Machining and aerospace supplier plants, I-90 distribution warehouses, downtown loft conversions, church additions, retail canopies, and heavy-equipment maintenance buildings.",
          sections: [
            { heading: "Industrial floors need load-history research", body: "A production slab or mezzanine may have supported changing equipment, patching, and undocumented penetrations for decades. Pair record review with crack mapping, cores or probes where warranted, survey of equipment reactions, and a clear distinction between uniform storage and concentrated machine loads." },
            { heading: "Wide roofs amplify snow-drift questions", body: "Rockford warehouses often have large roof areas, parapets, adjacent additions, and rooftop units that change drift patterns. The design should document drift zones, rain-on-snow or ponding considerations where applicable, diaphragm continuity, and the maintenance assumptions behind the load model." },
            { heading: "River-adjacent foundations need a site story", body: "A structural recommendation should read the geotechnical report alongside floodplain and groundwater evidence. Buoyancy, saturated soils, settlement, frost, and construction access can affect foundation selection; a standard footing detail is not a substitute for Rockford-area site investigation." }
            ,{ heading: "Rockford additions need a clean separation line", body: "Factory expansions often join frames built decades apart. Show the joint, differential movement strategy, fire separation, and construction sequence explicitly in the Rockford CED plan-review set so a new loading dock or production bay does not quietly transfer demand into an unverified older frame." }
          ],
          permitSteps: [
            "Use the Rockford Community and Economic Development intake record to confirm the address, occupancy, zoning, floodplain status, and whether county or state review supplements city intake.",
            "Pair original industrial drawings and equipment layouts with survey and geotechnical information, then log Rockford CED field-verification probes for framing and foundations.",
            "Prepare calculations and drawings for the new loads, openings, frames, connections, temporary conditions, and required fire or accessibility coordination.",
            "Have the responsible Illinois PE confirm the analysis, professional responsibility, and current city sealing and submission requirements.",
            "File through the applicable Rockford process and answer comments with an indexed response; document changes from existing conditions during construction.",
            "For an I-90 or manufacturing site, attach the Rockford Community and Economic Development plan-review comment response with equipment reactions, snow drift zones, fire access, and floodplain notes."
          ],
          faqs: [
            { question: "Can a Rockford warehouse floor take a new automated rack system?", answer: "It requires a site-specific check of slab thickness, reinforcement, soil support, rack reactions, aisles, impacts, and any structural frame above. Existing load history and manufacturer data should be reviewed before a responsible PE reaches a conclusion." },
            { question: "Does proximity to the Rock River change structural permitting?", answer: "It can add floodplain, groundwater, foundation, and site-review questions, even though the building permit remains a city or county matter. FEMA mapping and local floodplain administration should be coordinated with geotechnical and structural design." },
            { question: "Are snow loads the same for every Rockford roof?", answer: "No. Code ground snow criteria, exposure, roof geometry, drift, adjacent construction, thermal conditions, and equipment all affect design roof loads. The engineer should document the project-specific criteria." },
            { question: "What should a Rockford addition show at an old factory frame?", answer: "Identify the separation joint, existing load evidence, temporary bracing, fire boundary, and differential movement strategy in the Rockford CED plan-review response. An I-90-area expansion should not silently rely on an undocumented older column or foundation." }
          ],
          sources: sources("https://rockfordil.gov/departments/community-and-economic-development/building-permits/", "https://www.comed.com/BusinessCustomers/ServiceRequests/Pages/default.aspx", "https://www.isws.illinois.edu/statecli/"),
        },
        {
          serviceSlug: "mep-engineering",
          title: "Rockford MEP Engineering for Manufacturing and Commercial Facilities",
          description: "Rockford MEP engineering for factories, distribution buildings, healthcare, restaurants, and commercial renovations, with utility and city-permit coordination for the actual facility.",
          h1: "MEP Engineering for Rockford Facilities",
          kicker: "Industrial utilities and building systems in Rockford",
          lede: "Rockford facilities frequently combine office, warehouse, process, and shipping functions under one roof. MEP design has to separate production loads from building loads, understand ComEd service and water capacity, and coordinate with the city's permit reviewers and fire authorities.",
          permitAuthority: "Rockford Community and Economic Development is the municipal permit contact for city projects, with Fire Department review, water and sewer coordination, and utility approvals depending on work. County, township, airport, and state authorities may apply outside city limits or for special occupancies. Process hazards, high-piled storage, and utility cutovers should be mapped to the city and fire review before equipment is ordered.",
          codeContext: illinoisCodes + " Rockford's current municipal mechanical, electrical, plumbing, energy, and fire requirements should be confirmed at scoping through the city's code and permit resources. Process systems, high-piled storage, and hazardous materials may trigger review beyond a conventional commercial alteration.",
          localConditions: "Heating-dominated weather, cold-start operations, summer humidity, aging industrial services, high-bay destratification, and river-basin storm events affect system sizing. ComEd demand and transformer capacity can matter when motors, compressors, or electrified process equipment are added.",
          projectTypes: "Aerospace machining shops, food and beverage production, distribution centers, outpatient clinics, downtown office renovations, and cold-storage expansions.",
          sections: [
            { heading: "Separate process and comfort systems", body: "A Rockford manufacturer may need compressed air, process exhaust, make-up air, cooling water, dust collection, and welding ventilation alongside ordinary office HVAC. A useful basis of design identifies ownership, operating schedules, emissions or fire interfaces, and the controls boundary for each system." },
            { heading: "Cold weather is an operational reliability issue", body: "Freeze protection, vestibules, unit-heater placement, boiler redundancy, pipe routing, and low-occupancy weekend modes should be considered with the owner. A system sized only for peak load may still fail when a loading door remains open during a January production shift." },
            { heading: "Utility coordination protects the production schedule", body: "Service transformer space, gas pressure, water flow, fire-flow data, and sewer discharge limits should be verified before final equipment selection. Rockford's industrial parcels can have legacy utilities whose maps do not reflect every later addition." }
            ,{ heading: "Rockford process rooms need maintainable distribution", body: "Keep valves, filters, disconnects, drains, and access paths reachable around machine cells and high-bay storage. Show those checkpoints in the Rockford CED building-permit review set; a plan that fits equipment but blocks maintenance creates a production risk." }
          ],
          permitSteps: [
            "Start with Rockford CED's building-permit classification and the facility's process-hazard and fire-review notes; then assign ComEd, Nicor, water, and owner utility responsibilities.",
            "Walk panels, transformers, gas and water services, fire protection, roof equipment, exhaust paths, and process connections with the operator; put actual operating data in the CED review packet.",
            "Develop coordinated MEP, controls, energy, plumbing, process, and fire-protection documents with structural and architectural clearances.",
            "Secure utility confirmations and responsible Illinois PE review or sealing when the scope and AHJ require professional documents.",
            "Submit the city and utility packages, track comments by system, and recheck sequences and capacities when equipment substitutions occur.",
            "Give Rockford operations a shutdown and restart matrix keyed to the CED building-permit review comments and ComEd or Nicor utility coordination for each process connection."
          ],
          faqs: [
            { question: "Does a Rockford factory expansion need a new electrical service?", answer: "Not necessarily. A load study, available fault current, transformer and feeder capacity, protection, and utility review determine the feasible path. The design team should not promise capacity from a panel schedule alone." },
            { question: "How should process exhaust be shown in a permit set?", answer: "Show source, capture, duct routing, discharge, makeup air, controls, fire and hazardous-material interfaces, access, and structural support at a level the AHJ can review. The exact documentation depends on the process and Rockford's current requirements." },
            { question: "Is a warehouse HVAC design just heating and cooling tonnage?", answer: "No. Infiltration, door cycles, storage height, destratification, ventilation, freeze protection, smoke control, and controls affect performance and code documentation." },
            { question: "How should a Rockford manufacturer plan a utility shutdown?", answer: "List production, comfort, fire, controls, and emergency loads separately; verify the CED review comments plus ComEd, Nicor, water, and process-owner requirements; then sequence isolation and restart testing." }
          ],
          sources: sources("https://rockfordil.gov/departments/community-and-economic-development/building-permits/", "https://www.comed.com/BusinessCustomers/ServiceRequests/Pages/default.aspx", "https://www.energy.gov/eere/buildings/building-energy-codes-program"),
        },
        {
          serviceSlug: "civil-engineering",
          title: "Rockford Civil Engineering for Industrial Sites and River-Basin Drainage",
          description: "Rockford civil engineering for warehouse sites, industrial expansions, access drives, stormwater, and public utilities coordinated with city, county, and local watershed requirements.",
          h1: "Civil Engineering for Rockford Sites",
          kicker: "Rockford grading, stormwater, and utility design",
          lede: "Rockford development often has room to build but not room to ignore drainage, truck geometry, soil, and public-utility constraints. Our civil work ties survey, geotechnical information, floodplain records, and utility capacity to a reviewable plan for the correct local authority.",
          permitAuthority: "The City of Rockford Community and Economic Development Department reviews city development permits; Winnebago County and municipalities administer separate processes. Rock River floodplain officials, Illinois EPA or IEPA programs, watershed requirements, and utility owners may control portions of a site package. Assign each access, outfall, drainage, and utility item to Rockford, the county, or the owner before a civil plan implies one approval.",
          codeContext: illinoisCodes + " Rockford's current zoning, subdivision, stormwater, erosion-control, access, and utility standards should be confirmed with the city or county code resources. State and local requirements can diverge by jurisdiction even within the metro, particularly at a county or township frontage.",
          localConditions: "Flat to gently rolling glacial terrain, clayey soils, freeze-thaw, intense thunderstorm runoff, and Rock River tributaries influence grading and stormwater. Industrial yards also create large impervious areas, heavy axle loads, snow storage, and spill-control questions.",
          projectTypes: "I-90 logistics yards, industrial parking expansions, river-corridor redevelopment, suburban retail pads, manufacturing truck courts, and municipal streetscape improvements.",
          sections: [
            { heading: "Truck courts need a durable drainage geometry", body: "Turning templates, dock aprons, pavement sections, catch-basin protection, snow storage, and emergency access should be resolved together. A low point that works for passenger cars may pond beneath trailers or become inaccessible after a Rockford freeze." },
            { heading: "Floodplain lines are not the whole site risk", body: "A parcel can be outside the mapped floodway and still receive tributary, ditch, or overland runoff. Match FEMA records to survey elevations and local drainage evidence, then provide overflow routing and maintenance access that the owner can actually operate." },
            { heading: "Industrial utilities require record reconciliation", body: "Older plats, private mains, easements, and later service additions can conflict with utility maps. Test-pit or locate information, fire-flow verification, sewer invert data, and a clear abandonment plan are valuable before a new warehouse foundation or pavement locks in the layout." }
            ,{ heading: "Rockford truck circulation is part of the drainage plan", body: "Dock grades, trailer swing, snow piles, fire lanes, and catch-basin protection need one operating diagram for the Rockford CED site-plan review. Separate employee parking from heavy-axle pavement and show how maintenance reaches inlets without crossing an active loading path." }
          ],
          permitSteps: [
            "Match the Rockford CED site-plan intake to the parcel zoning, Rock River watershed and floodplain status, access points, and responsible water, sewer, and electric utilities.",
            "Commission current survey and geotechnical work and collect utility records, easements, drainage complaints, fire-flow data, and existing outfall information.",
            "Prepare the Rockford CED site-plan exhibits for grading, stormwater, erosion, utility, access, pavement, landscape, snow storage, building, and fire access.",
            "Confirm whether city, county, state, watershed, or utility approvals and an Illinois PE seal are required for each improvement.",
            "Submit the civil and utility applications, answer comments, and provide construction observation or record information within the agreed professional scope.",
            "Tie the final Rockford grading release to the CED site-plan review, Winnebago County or city outfall comments, truck-turning, snow-storage, and fire-flow maintenance diagrams."
          ],
          faqs: [
            { question: "Does every Rockford warehouse need detention?", answer: "The answer depends on site disturbance, local stormwater rules, watershed conditions, existing release, and the authority. A storage volume should not be assumed from a national template; verify current city or county requirements." },
            { question: "Can a Rockford site use its existing ditch as an outfall?", answer: "Only after ownership, capacity, easement, floodplain, erosion, and agency requirements are checked. An apparent ditch connection is not proof of legal or hydraulic acceptance." },
            { question: "Why does winter matter to a Rockford grading plan?", answer: "Freeze-thaw, snow piles, frozen inlets, spring melt, and frost-sensitive subgrades can turn a small grade error into ponding or pavement failure. Drainage and pavement design should use local geotechnical and maintenance information." },
            { question: "How should a Rockford truck court be documented?", answer: "Show trailer paths, dock grades, heavy-axle pavement, fire access, snow storage, inlet protection, and the operator's maintenance route in the CED site-plan review. A drainage plan that omits truck circulation is not operational." }
          ],
          sources: sources("https://rockfordil.gov/departments/community-and-economic-development/building-permits/", "https://www.nicor.com/business/", "https://www.isws.illinois.edu/statecli/"),
        },
        {
          serviceSlug: "energy-compliance",
          title: "Rockford Energy Compliance for Industrial and Commercial Buildings",
          description: "Rockford energy-compliance documentation for warehouses, factories, offices, and renovations using applicable Illinois and local energy requirements, with attention to cold-weather operation and industrial schedules.",
          h1: "Energy Compliance for Rockford Buildings",
          kicker: "Cold-climate energy-code coordination",
          lede: "Rockford energy compliance must reflect large-volume spaces, loading-door infiltration, process schedules, and winter reliability rather than only a nominal equipment efficiency. We document the selected Illinois energy-code path for review by the responsible professional and local authority.",
          permitAuthority: "The City of Rockford Community and Economic Development Department is the main municipal permit contact for city buildings; state, utility, and fire reviews can add requirements. Confirm the current Illinois commercial energy standard, Rockford amendments, alteration scope, and any incentive documentation separately. An industrial energy file should identify what Rockford reviews as building work and what remains a process-owner decision.",
          codeContext: illinoisCodes + " Illinois commercial energy provisions and Rockford's currently adopted local code control the route. Verify edition, envelope exceptions, process-load treatment, lighting controls, and performance-model documentation with the city before filing; do not infer an edition from an older factory permit.",
          localConditions: "Cold winters, shoulder-season swings, high-bay stratification, large overhead doors, snow cover, and ComEd demand charges influence Rockford energy models. Industrial process energy may be outside or adjacent to building-code scope, so boundaries should be explicit.",
          projectTypes: "LED and controls retrofits in factories, insulated warehouse additions, office renovations, cold-storage projects, municipal facilities, and electrification studies for older industrial buildings.",
          sections: [
            { heading: "High-bay infiltration can dominate the result", body: "Dock doors, vehicle entrances, pressure relationships, destratification, vestibules, and air curtains should be represented in the design narrative. Controls that respond to schedules and door activity may matter more than selecting a marginally higher equipment rating." },
            { heading: "Process energy needs a clear boundary", body: "Compressed air, ovens, dust collection, refrigeration, and machine loads affect the facility's bills but may be treated differently in code documentation. Separate regulated building systems from process loads, identify interactions, and preserve the owner's operational assumptions." },
            { heading: "Envelope work should respect wet and frozen seasons", body: "Roof replacement, wall insulation, dock additions, and air sealing need constructability and moisture review in a climate with freeze-thaw and summer humidity. A compliance calculation should align with details, thermal bridges, and sequencing that can be built." }
            ,{ heading: "Rockford compliance should distinguish building and process energy", body: "A machining line, compressor, oven, or dust collector may dominate the utility bill without being a regulated envelope load. Preserve that boundary in the Rockford building-permit energy worksheet while documenting heat recovery, ventilation, and controls that interact with the building." }
          ],
          permitSteps: [
            "Open the Rockford building-permit energy worksheet with the current edition, occupancy, alteration triggers, process boundary, utility data, and owner performance objective recorded.",
            "Inventory envelope assemblies, doors, lighting, HVAC, controls, schedules, process equipment, and measured energy in the Rockford energy worksheet; label uncertain field assumptions.",
            "Select the prescriptive or performance route and document thermal values, efficiencies, controls, ventilation, service water, and commissioning obligations.",
            "Coordinate forms and notes with architectural and MEP documents and obtain responsible Illinois PE review or sealing when required.",
            "Submit with the Rockford building package, answer code comments, and reassess compliance when equipment or envelope substitutions change the basis.",
            "Retain the Rockford building-permit energy worksheet with separate schedules for regulated building loads and manufacturing process loads so a compressor or oven substitution is reviewable."
          ],
          faqs: [
            { question: "Does a Rockford energy model include factory machines?", answer: "It depends on the applicable code method and whether a load is regulated building energy or process energy. The boundary should be stated and interactions such as heat recovery or ventilation documented rather than silently omitted." },
            { question: "Can LED replacement alone satisfy a Rockford renovation?", answer: "It may address part of a lighting scope, but controls, power density, emergency lighting, occupancy, and other triggered work still need review. The current local and Illinois alteration provisions govern." },
            { question: "Are utility rebates the same as energy-code compliance?", answer: "No. A ComEd or other program has its own eligibility and verification rules, while code compliance is an AHJ requirement. One submission may support the other but cannot substitute for it." },
            { question: "How should a Rockford energy model treat a compressor or oven?", answer: "State whether it is a regulated building load or process load in the Rockford building-permit energy worksheet, then document heat, exhaust, ventilation, schedule, and recovery interactions. Do not hide it in an office baseline." }
          ],
          sources: sources("https://rockfordil.gov/departments/community-and-economic-development/building-permits/", "https://www.comed.com/SmartEnergy/MyAccount/Pages/Energy-Usage.aspx", "https://www.energy.gov/eere/buildings/building-energy-codes-program"),
        },
        {
          serviceSlug: "pe-stamped-drawings",
          title: "PE-Stamped Drawings for Rockford Industrial and Commercial Permits",
          description: "Rockford PE-stamped-drawing coordination for building, utility, industrial, and renovation packages, with professional-responsibility checks for city, county, and state review.",
          h1: "PE-Stamped Drawings for Rockford Projects",
          kicker: "Industrial permit documents and professional review",
          lede: "Rockford permit reviewers need a coherent record of existing conditions, industrial loads, site utilities, and code decisions—not a signature detached from the work. We organize that record for the responsible Illinois PE to evaluate, seal when required, and submit through the correct jurisdiction.",
          permitAuthority: "Rockford Community and Economic Development handles city permit review, while county officials, fire authorities, utilities, floodplain administrators, and state agencies can control related approvals. The responsible PE must confirm the appropriate Illinois authorization, discipline, seal format, and scope of charge. Identify the bay, occupancy phase, utility cutover, and authority-specific package on the index before sealing.",
          codeContext: illinoisCodes + " The drawing set should state the currently applicable Rockford code and energy path, as confirmed with the city or county, and should not imply that a PE seal overrides zoning, stormwater, fire, utility, or floodplain review.",
          localConditions: "Large industrial footprints, snow and frost, Rock River drainage, old service records, heavy truck pavement, and phased occupancy make Rockford packages especially dependent on accurate bases of design and construction sequencing.",
          projectTypes: "Manufacturing line additions, warehouse tenant packages, commercial site improvements, municipal renovations, multifamily rehabilitation, and restaurant or retail conversions.",
          sections: [
            { heading: "Jurisdiction should be printed on the cover sheet", body: "Rockford, Winnebago County, and nearby municipalities do not share one permit counter. The cover should identify the parcel, occupancy, work description, reviewing authorities, code editions, and discipline responsibility so a reviewer does not have to infer the submission path." },
            { heading: "Industrial revisions need traceable calculations", body: "Equipment reactions, service loads, process exhaust, slab cuts, fire-flow assumptions, and drainage changes can move during procurement. A revision log tied to calculations and drawings helps the responsible PE determine whether a substitution is within the original basis." },
            { heading: "Field verification protects existing-building work", body: "A stamped plan cannot validate hidden conditions that were never investigated. For Rockford factories and older commercial buildings, photographs, probes, utility locates, survey control, and owner interviews should be archived with the design record." }
            ,{ heading: "Rockford's phased occupancy needs a drawing index", body: "A warehouse conversion may open one bay while another remains under construction. Identify each release, fire separation, utility cutover, and temporary condition on the CED permit index so the city and contractor can distinguish the approved scope from later work." }
          ],
          permitSteps: [
            "Put the Rockford parcel jurisdiction, CED permit classification, agency list, code editions, bay release, and discipline responsibilities on the sealed-set cover.",
            "Bind survey, geotechnical, existing-building, utility, process, manufacturer, and fire-protection evidence to the CED bay-release index and identify assumptions requiring field confirmation.",
            "Coordinate drawings, calculations, specifications, energy documents, and site plans across architecture, MEP, structural, civil, and fire scopes.",
            "Have the responsible Illinois PE perform substantive review and determine professional sealing and electronic-submission requirements.",
            "File with the relevant authority, answer comments transparently, and issue controlled revisions when construction information changes the design.",
            "Issue the Rockford release by building bay or occupancy phase, cross-referencing the CED permit comments, fire inspection checkpoint, utility cutover, and occupancy package for each construction release."
          ],
          faqs: [
            { question: "Will a PE stamp replace a Rockford site-plan approval?", answer: "No. A seal addresses the professional's work and responsibility; zoning, access, stormwater, utilities, fire, and floodplain authorities retain their own review. Approval is not guaranteed by stamping." },
            { question: "Can a PE stamp drawings prepared by a contractor?", answer: "Only after the responsible professional has enough information and performs the review required for responsible charge. Contractor-originated details, calculations, and substitutions should be clearly identified and independently evaluated." },
            { question: "When should a Rockford package be sealed?", answer: "After the scope, evidence, calculations, coordination, and responsible-professional review are sufficiently complete for the applicable AHJ. The exact seal and submission requirements should be confirmed before filing." },
            { question: "Can one Rockford drawing set cover every nearby municipality?", answer: "Not automatically. Rockford CED, Winnebago County, and neighboring communities can have different counters, amendments, and file rules. Put the parcel jurisdiction and authority-specific deliverables on the cover." }
          ],
          sources: sources("https://rockfordil.gov/departments/community-and-economic-development/building-permits/", "https://www.comed.com/BusinessCustomers/ServiceRequests/Pages/default.aspx", "https://idfpr.illinois.gov/profs/pe.html"),
        }
      ]
    },
    {
      slug: "peoria",
      name: "Peoria",
      county: "Peoria County",
      services: [
        {
          serviceSlug: "structural-engineering",
          title: "Peoria Structural Engineering for River-City Buildings and Renovations",
          description: "Peoria structural engineering for medical, industrial, commercial, and residential projects, with attention to bluff soils, river flood exposure, older masonry, and City of Peoria permit review.",
          h1: "Structural Engineering for Peoria Buildings",
          kicker: "Peoria structural evaluation and design",
          lede: "Peoria's river valley, bluff-top development, and manufacturing history create sharply different structural conditions within one metro. We pair record research and field observation with project-specific analysis for the responsible Illinois PE and the correct Peoria-area AHJ.",
          permitAuthority: "The City of Peoria Development Services Department administers city building permits; Peoria County and surrounding municipalities have separate processes. Floodplain, fire, state-facility, and utility authorities may participate based on site and occupancy, and the project team must confirm the actual reviewing agencies. Bluff excavation, river proximity, and historic status should be flagged in the first Development Services inquiry rather than added after structural sheets are complete.",
          codeContext: illinoisCodes + " Peoria's municipal building, zoning, existing-building, and local permit requirements should be checked at intake against the currently effective Illinois baseline and city code resources. Riverfront, bluff, historic, institutional, and special-occupancy projects may have additional review.",
          localConditions: "Illinois River and local tributary flooding, bluff and loess soils, erosion, freeze-thaw, severe storms, and snow on older roofs affect Peoria structural work. Differential settlement between additions and original masonry is a recurring existing-building question.",
          projectTypes: "Medical-campus additions, warehouse and distribution facilities, riverfront redevelopment, Caterpillar-area industrial work, historic downtown conversions, and steep-site multifamily construction.",
          sections: [
            { heading: "Peoria's elevation changes belong in the foundation model", body: "Bluff cuts, fill transitions, retaining walls, and weathered soils can change bearing and lateral conditions across one parcel. Structural design should reconcile geotechnical recommendations with survey grades, excavation limits, drainage, and the sequence for supporting existing slopes or walls." },
            { heading: "Older masonry needs movement diagnostics", body: "Historic commercial façades and industrial walls may show settlement, repointing, past openings, or ties that are not visible on plans. Crack patterns, level surveys, probes, and a careful distinction between cosmetic and structural movement help define the correct repair rather than overbuilding blindly." },
            { heading: "Flood exposure extends beyond the foundation", body: "River and tributary conditions can affect access, equipment elevation, buoyancy, scour, and the durability of structural materials. Floodplain review should be coordinated with site and building design early, particularly where a new addition connects to an older low floor." }
            ,{ heading: "Peoria connections must respect the bluff-to-valley transition", body: "A project that crosses a grade break may need stepped foundations, retaining coordination, and protected egress between elevations. Show those decisions in the Peoria Development Services plan-review response rather than treating the upper and lower parcels as one uniform soil profile." }
          ],
          permitSteps: [
            "Start with the Peoria Development Services intake and identify city or county jurisdiction, occupancy, historic status, floodplain, and any state or institutional review.",
            "Pair survey, geotechnical, floodplain, existing-building, and structural records with targeted field verification; attach the foundation and framing evidence to the Peoria Development Services review.",
            "Develop the structural basis, calculations, details, temporary conditions, and cross-discipline penetrations for the proposed work.",
            "Have the responsible Illinois PE review and determine sealing, special inspection, and submission requirements for the Peoria AHJ.",
            "Submit through the applicable portal or counter, respond to comments, and maintain a field-change record for the construction team.",
            "For a Peoria bluff or river-valley project, attach the Development Services plan-review comment response and floodplain determination to the release with geotechnical observation, foundation-step, and temporary-slope decisions."
          ],
          faqs: [
            { question: "Are Peoria bluff sites always unsuitable for new construction?", answer: "No. Suitability depends on geology, slope stability, drainage, foundation type, grading, and the project footprint. A geotechnical investigation and local review are needed; no generic foundation conclusion should be assumed." },
            { question: "How does Illinois River flooding affect structural drawings?", answer: "It can affect elevations, flood-resistant materials, utilities, access, buoyancy, and connection to existing structures. FEMA mapping and local floodplain requirements should be coordinated with the structural and civil basis." },
            { question: "Can a Peoria historic façade be retained during interior renovation?", answer: "Often retention is a design objective, but the wall, anchors, openings, temporary bracing, and adjacent excavation must be investigated. Historic review and the building AHJ may add requirements beyond structural calculations." },
            { question: "What should a Peoria bluff project show before excavation?", answer: "Show the geotechnical basis, stepped foundation or retaining strategy, drainage route, temporary slope support, and protected access in the Development Services plan-review response. The city permit does not replace field observation." }
          ],
          sources: sources("https://www.peoriagov.org/171/Permits-Inspections", "https://www.ameren.com/illinois/business", "https://www.isws.illinois.edu/statecli/"),
        },
        {
          serviceSlug: "mep-engineering",
          title: "Peoria MEP Engineering for Healthcare, Industry, and Commercial Renovation",
          description: "Peoria MEP engineering for hospitals, manufacturing, restaurants, offices, and mixed-use buildings, coordinated with Development Services, Ameren, and occupancy-specific requirements.",
          h1: "MEP Engineering for Peoria Facilities",
          kicker: "Peoria building systems and utility coordination",
          lede: "Peoria's medical and manufacturing economy asks MEP teams to coordinate reliability, process loads, infection-control concerns, and older building infrastructure. We establish a field-based basis of design for responsible professional review and the applicable local permitting path.",
          permitAuthority: "The City of Peoria Development Services Department is the city building-permit authority; fire, health, water, sewer, Ameren, and state or institutional reviewers may have separate roles. Peoria County and neighboring communities use their own AHJs, so the project address controls the process. A hospital, factory, and restaurant should each carry a different shutdown and specialty-review matrix into the city submission.",
          codeContext: illinoisCodes + " Current Peoria mechanical, electrical, plumbing, fire, energy, and occupancy requirements must be confirmed with Development Services and the city code resources. Healthcare, laboratory, industrial, and hazardous-process work can involve standards and agencies beyond ordinary tenant improvement review.",
          localConditions: "Cold winters, humid summers, river-valley air, flood-sensitive mechanical rooms, older steam or hydronic systems, and industrial process loads shape Peoria MEP design. Ameren service and gas capacity should be confirmed before electrification or major equipment additions.",
          projectTypes: "Hospital renovations, life-science and medical offices, Caterpillar supplier plants, food service spaces, downtown office conversions, and riverfront hospitality projects.",
          sections: [
            { heading: "Healthcare phasing is a systems design problem", body: "A Peoria clinical renovation may need temporary air, infection-control pressure, emergency power, medical gases, shutdown planning, and above-ceiling coordination while the facility remains occupied. MEP drawings should identify phasing and owner operational constraints, not only final equipment." },
            { heading: "Industrial ventilation must follow the process", body: "Welding, machining, coatings, dust, and heat loads require capture and exhaust strategies that fit fire protection, makeup air, noise, roof structure, and emissions questions. A generic office ventilation rate cannot describe a Peoria production floor." },
            { heading: "Flood-aware equipment placement protects continuity", body: "River-adjacent or low-grade facilities should evaluate electrical gear, controls, pumps, air handlers, and fuel systems against flood and groundwater information. Resilience decisions belong in the owner discussion before a room layout fixes vulnerable equipment at the lowest elevation." }
            ,{ heading: "Peoria clinical and industrial systems have different failure modes", body: "A hospital air-handling shutdown, a Caterpillar-area process interruption, and a restaurant outage are not interchangeable design cases. Tie the emergency sequence to Development Services, Fire Department, Ameren, or health-facility checkpoints around the owner's critical loads and restart procedure." }
          ],
          permitSteps: [
            "Use the Peoria Development Services specialty-review matrix to distinguish facility operations, Fire, health, Ameren, utility territories, and any state or institutional checkpoint.",
            "Walk equipment, panels, risers, emergency systems, medical or process services, roof penetrations, and Ameren capacity with the facility operator; record the specialty-review evidence.",
            "Coordinate MEP, energy, controls, plumbing, fire protection, structural supports, architectural clearances, and phasing or infection-control notes.",
            "Obtain utility confirmations and responsible Illinois PE review or seal where required by scope and AHJ.",
            "Submit city, utility, fire, and specialty reviews as applicable and manage comments and substitutions through controlled revisions.",
            "Give the Peoria facility operator a shutdown sequence keyed to Development Services, Fire Department, Ameren, and any health-facility review checkpoints, distinguishing clinical air, process, emergency power, and tenant loads."
          ],
          faqs: [
            { question: "Does a Peoria hospital renovation need more than a building permit?", answer: "Potentially. Fire, health, facility, utility, infection-control, and state or institutional processes may apply based on the work. The owner and design team should map every approval rather than assume the city permit is the only review." },
            { question: "How should Ameren service be checked for Peoria electrification?", answer: "Prepare a load and operating profile, verify service and transformer conditions, coordinate protection and metering, and ask Ameren about the project-specific connection. Capacity and schedule should not be promised before utility review." },
            { question: "Can existing steam serve a Peoria conversion?", answer: "Possibly, but pressure, capacity, traps, controls, insulation, condensate return, asbestos, and future operating goals need investigation. A new tenant's loads and ventilation may require a different system even when steam is available." },
            { question: "How should a Peoria hospital and factory differ in MEP phasing?", answer: "A hospital plan must protect clinical air, pressure, emergency power, and patient operations; a factory plan may prioritize process restart and production utilities. Align each sequence with Development Services, Fire, Ameren, or health-facility checkpoints." }
          ],
          sources: sources("https://www.peoriagov.org/171/Permits-Inspections", "https://www.ameren.com/illinois/business", "https://www.energy.gov/eere/buildings/building-energy-codes-program"),
        },
        {
          serviceSlug: "civil-engineering",
          title: "Peoria Civil Engineering for Riverfront, Bluff, and Industrial Sites",
          description: "Peoria civil engineering for grading, stormwater, access, utilities, and flood-aware site development coordinated with the City of Peoria and relevant watershed and utility authorities.",
          h1: "Civil Engineering for Peoria Sites",
          kicker: "River-valley site and infrastructure design",
          lede: "Peoria site design has to move water across bluff grades, river terraces, industrial yards, and older urban streets without losing access or utility constructability. Our civil scope connects survey, geotechnical and flood information to a reviewable plan for the right jurisdiction.",
          permitAuthority: "City of Peoria Development Services reviews city development and building-related site work; Peoria County and nearby municipalities administer separate rules. Illinois EPA, floodplain officials, watershed authorities, public works, and utilities may each control specific connections or disturbances. Riverfront elevation, bluff stability, discharge, and utility records should be assigned to the correct reviewer before grading is fixed.",
          codeContext: illinoisCodes + " Peoria zoning, stormwater, subdivision, erosion, floodplain, access, and public-improvement standards are local and should be confirmed for the parcel through Development Services and current city or county code resources. State permits may be needed for disturbance, discharge, or water-related work.",
          localConditions: "Steep bluff grades, loess and fill, Illinois River floodplain, intense rainfall, freeze-thaw, sink or erosion concerns, and aging combined or separate utilities shape Peoria civil design. Industrial sites add heavy truck pavement and spill-response needs.",
          projectTypes: "Riverfront mixed-use parcels, medical-campus circulation, hillside subdivisions, industrial yard additions, downtown streetscape work, and warehouse access improvements.",
          sections: [
            { heading: "Bluff grading must preserve the slope story", body: "Cut and fill volumes alone do not explain a Peoria site. Surface drainage, retaining structures, erosion, groundwater, access for maintenance, and construction staging should be considered with the geotechnical recommendations so a new drive does not redirect water onto a lower parcel." },
            { heading: "Riverfront sites need elevation discipline", body: "Survey datum, FEMA elevations, finished floors, utility entrances, and emergency access should be reconciled early. Flood-resistant grading, overflow paths, and protected equipment areas can be coordinated only when civil, architectural, structural, and MEP teams use the same vertical basis." },
            { heading: "Utility age changes the feasibility check", body: "Downtown Peoria records may show a main without proving capacity, invert, easement, or condition. Verify water pressure, fire flow, sewer elevations, manholes, and abandoned lines before placing foundations, retaining walls, or deep pavement sections." }
            ,{ heading: "Peoria riverfront plans need an elevation register", body: "List existing grade, flood reference, finished floor, utility entrance, accessible route, and overflow elevations in one register attached to the Peoria Development Services site-plan review. That record lets floodplain reviewers see both ordinary drainage and a river event." }
          ],
          permitSteps: [
            "Read the Peoria Development Services site-plan intake against the zoning, floodplain, watershed, disturbance limits, access points, and utility ownership before grading.",
            "Obtain a current survey, geotechnical report, FEMA and local floodplain information, utility records, and relevant drainage or erosion history.",
            "Prepare Development Services site-plan exhibits for grading, stormwater, erosion, utility, access, pavement, landscape, flood resilience, building, and fire access.",
            "Identify state, local, watershed, utility, and Illinois PE requirements and submit supporting calculations and maintenance responsibilities.",
            "Respond to each agency's comments separately and verify construction changes against drainage, slope, and utility assumptions.",
            "Close the Peoria civil review with the Development Services site-plan comments, floodplain determination, and an elevation register that the floodplain official, owner, and contractor can use during observation."
          ],
          faqs: [
            { question: "Can a Peoria riverfront parcel be filled above the flood elevation?", answer: "Fill, compensatory storage, floodway, access, and local floodplain rules may all be relevant. FEMA maps alone do not authorize fill; confirm the current local and state path before grading." },
            { question: "Why is a geotechnical report important for Peoria civil work?", answer: "Bluffs, loess, fill, groundwater, and variable river-terrace soils can affect slopes, pavements, retaining structures, infiltration, and foundations. Civil grades should use site-specific recommendations rather than a generic soil assumption." },
            { question: "Does city approval include an Ameren utility relocation?", answer: "No. Utility owners retain their own design, easement, clearance, and construction decisions. Coordinate the site plan with Ameren and other owners and do not assume a city permit authorizes private utility work." },
            { question: "What elevation record helps a Peoria riverfront review?", answer: "List survey datum, flood reference, existing and proposed floors, utility entrances, accessible routes, and overflow points in the Development Services site-plan and floodplain review. Reviewers need that chain beyond a colored grading plan." }
          ],
          sources: sources("https://www.peoriagov.org/171/Permits-Inspections", "https://www.ameren.com/illinois/business", "https://www.isws.illinois.edu/statecli/"),
        },
        {
          serviceSlug: "energy-compliance",
          title: "Peoria Energy Compliance for Healthcare, Industry, and Existing Buildings",
          description: "Peoria energy-compliance services for commercial alterations, medical buildings, manufacturing, and new construction using Illinois and local energy-code requirements.",
          h1: "Energy Compliance for Peoria Projects",
          kicker: "Peoria energy-code and operational analysis",
          lede: "Peoria energy documentation should reflect cold winters, river-valley humidity, healthcare schedules, and industrial process boundaries. We identify the applicable Illinois and municipal route and prepare coordinated evidence for responsible professional review without promising an AHJ result.",
          permitAuthority: "Peoria Development Services is the city building-review authority, with state, fire, health, facility, and utility programs potentially adding requirements. Confirm the applicable code edition and whether an alteration, addition, or special occupancy follows a local or statewide energy path. Keep clinical, process, and ordinary commercial operating assumptions separate in the energy transmittal.",
          codeContext: illinoisCodes + " Illinois commercial energy requirements and the current Peoria adoption control the compliance route. Verify the edition, prescriptive exceptions, performance modeling, commissioning, and documentation with Development Services at project intake.",
          localConditions: "Heating-dominated weather, humid summers, river fog and moisture, older steam systems, hospital redundancy, process exhaust, and Ameren demand charges influence Peoria energy choices. Flood exposure may also affect equipment elevation and resilience decisions.",
          projectTypes: "Medical office HVAC replacements, manufacturing lighting retrofits, downtown office rehabilitation, riverfront hospitality, school additions, and warehouse envelope upgrades.",
          sections: [
            { heading: "Healthcare energy work must preserve clinical operation", body: "Ventilation, pressure relationships, filtration, redundancy, schedules, and emergency power cannot be traded casually for a modeled savings number. The compliance narrative should identify clinical constraints and confirm that efficiency measures remain compatible with infection-control and owner requirements." },
            { heading: "Industrial baselines need honest operating data", body: "A Peoria plant's process exhaust, shifts, compressed air, and equipment heat can overwhelm an office-style model. Separate regulated loads, process assumptions, and recoverable heat so the selected code path is transparent and useful to the owner." },
            { heading: "Flood resilience and energy decisions intersect", body: "A high-efficiency heat pump or controls upgrade does not help if a flood-prone mechanical room loses power or controls. Equipment elevation, drainage, emergency power, and access should be coordinated with the energy and MEP documents." }
            ,{ heading: "Peoria energy files should carry a clinical operations appendix", body: "For a medical project, attach isolation rooms, pressure modes, filtration, emergency-power zones, and no-setback hours to the Peoria Development Services energy review. For a factory or office, use a different schedule and boundary rather than recycling hospital assumptions." }
          ],
          permitSteps: [
            "Record Peoria Development Services' current energy-review route alongside occupancy, alteration scope, clinical or process constraints, Ameren territory, and owner performance target.",
            "Populate the Peoria energy submission with envelope, HVAC, lighting, controls, service-water, process, schedule, utility, and field-uncertainty data.",
            "Select the prescriptive or performance method and document regulated boundaries, efficiencies, thermal values, controls, ventilation, and commissioning.",
            "Coordinate energy forms and notes with architecture, MEP, fire, structural, and flood-resilience drawings and obtain responsible PE review when required.",
            "Submit to the applicable Peoria authority and revise the compliance record when substitutions or operating assumptions change.",
            "Keep the Peoria energy submission and Development Services review comments with the clinical schedule, process-load boundary, emergency-power zones, and equipment-elevation decisions."
          ],
          faqs: [
            { question: "Which energy path should a Peoria project document?", answer: "Peoria projects use applicable Illinois commercial energy requirements and current local adoption. Development Services should confirm the exact code edition, alteration scope, and whether prescriptive or performance documentation is required." },
            { question: "How are hospital energy upgrades modeled in Peoria?", answer: "The model and documentation should reflect ventilation, pressure, redundancy, schedules, medical loads, and clinical constraints. Utility savings and code compliance are separate questions and neither should be promised before field and owner data are reviewed." },
            { question: "Can a utility incentive replace Peoria code forms?", answer: "No. Incentives have program rules, while the building authority requires its own compliance evidence. One project may pursue both, but an incentive application does not waive code documentation." },
            { question: "How should Peoria energy work handle flood-prone equipment?", answer: "Coordinate equipment elevation, emergency power, drainage, controls, and access with the Development Services energy review and civil/MEP teams. Efficiency documentation should not assume a mechanical room remains operable during a river event." }
          ],
          sources: sources("https://www.peoriagov.org/171/Permits-Inspections", "https://www.ameren.com/illinois/business", "https://www.energy.gov/eere/buildings/building-energy-codes-program"),
        },
        {
          serviceSlug: "pe-stamped-drawings",
          title: "PE-Stamped Drawings for Peoria Building and Site Projects",
          description: "Peoria PE-stamped-drawing coordination for structural, MEP, civil, and energy packages, with documented responsibility for city, county, utility, floodplain, and specialty reviews.",
          h1: "PE-Stamped Drawings for Peoria Projects",
          kicker: "Professional engineering documents for Peoria permits",
          lede: "In Peoria, a useful sealed package connects bluff or river conditions, existing facilities, utility evidence, calculations, and construction details. We prepare an organized record for the responsible Illinois PE to review and seal when the project and AHJ require it.",
          permitAuthority: "Peoria Development Services handles city building permits; Peoria County, fire, floodplain, utilities, health or institutional authorities may review separate aspects. The responsible professional confirms Illinois authorization, discipline, responsible charge, and the format accepted by each authority. The sealed index should cross-reference river elevations, geotechnical evidence, utility approvals, and any clinical or institutional review.",
          codeContext: illinoisCodes + " Current Peoria code and permit requirements, as confirmed through Development Services and city code resources, govern the municipal package. A PE seal does not replace zoning, floodplain, fire, health, energy, utility, or state approvals and cannot promise approval or schedule.",
          localConditions: "Peoria's bluffs, river flood exposure, older masonry, industrial loads, freeze-thaw, and variable underground utilities make coordination and field evidence central to any sealed set.",
          projectTypes: "Medical additions, riverfront development, industrial process changes, hillside retaining work, downtown adaptive reuse, and municipal infrastructure improvements.",
          sections: [
            { heading: "The cover sheet should name every reviewing lane", body: "A Peoria project can involve city building review, fire, floodplain, utilities, health or institutional reviewers, and state requirements. Identify each lane and the discipline responsible so a sealed drawing does not imply that every external approval has been obtained." },
            { heading: "Vertical information is part of the sealed record", body: "For river and bluff work, survey datum, flood elevations, finished floors, drainage inverts, retaining walls, and foundation steps must agree across sheets. A small mismatch can change both constructability and agency review." },
            { heading: "Existing conditions should remain traceable", body: "Photographs, probes, utility locates, equipment schedules, and survey control provide the evidence behind a renovation. The responsible PE can then state what was verified, what remains a field condition, and what requires review during construction." }
            ,{ heading: "Peoria sealed sheets should identify flood-related decisions", body: "Where a project is near the Illinois River or a tributary, show the source of elevations, equipment-protection assumptions, and civil interface on the index submitted with the Peoria permit and floodplain review. A reviewer should follow each decision from calculation to detail." }
          ],
          permitSteps: [
            "Set up the Peoria Development Services permit index with project scope, facility and floodplain overlays, reviewing agencies, and each discipline's responsible charge.",
            "Bind existing drawings, survey, geotechnical and flood evidence, utility records, owner criteria, and manufacturer data to the Peoria permit index; log assumptions for the responsible PE.",
            "Coordinate calculations, drawings, specifications, energy and site documents so sections, elevations, loads, and utilities agree.",
            "Have the responsible Illinois PE complete substantive review and confirm sealing, electronic signature, special inspection, and submittal requirements.",
            "Submit to each applicable authority, respond to comments, and control revisions when field conditions or procurement change the design.",
            "Archive the Peoria Development Services permit receipt, floodplain decision, utility correspondence, and geotechnical references with the sealed sheets so a riverfront or bluff decision remains traceable."
          ],
          faqs: [
            { question: "Does a Peoria PE stamp satisfy floodplain approval?", answer: "No. Floodplain administration and other agencies retain their own requirements. The engineer's sealed work can support review but does not waive local, state, or federal floodplain decisions." },
            { question: "Can a preliminary Peoria set be sealed for pricing?", answer: "Sealing depends on completeness, intended use, responsible charge, and applicable law and AHJ requirements. A pricing set should be clearly labeled and not represented as an approved construction or permit set." },
            { question: "Who owns revisions after Peoria permit comments?", answer: "The project team should assign revision responsibility, while the responsible PE evaluates changes within their discipline and charge. No one should assume an original seal automatically covers later comments or substitutions." },
            { question: "How should a Peoria sealed set document river conditions?", answer: "Cross-reference flood elevations, geotechnical recommendations, utility protection, and civil details in the calculation index submitted with Development Services and floodplain review. A seal supports review but is not floodplain approval." }
          ],
          sources: sources("https://www.peoriagov.org/171/Permits-Inspections", "https://www.ameren.com/illinois/business", "https://idfpr.illinois.gov/profs/pe.html"),
        }
      ]
    },
    {
      slug: "springfield",
      name: "Springfield",
      county: "Sangamon County",
      services: [
        {
          serviceSlug: "structural-engineering",
          title: "Springfield Structural Engineering for Government, Commercial, and Residential Projects",
          description: "Springfield structural engineering for public-sector renovations, commercial buildings, industrial sites, and housing, coordinated with the City of Springfield Office of Planning and Economic Development.",
          h1: "Structural Engineering for Springfield Buildings",
          kicker: "Capital-city structural design and evaluation",
          lede: "Springfield's state-government, healthcare, neighborhood, and industrial buildings often combine occupied operations with older construction. We investigate load paths and constraints for the responsible Illinois PE while coordinating the city, state-facility, and owner review paths.",
          permitAuthority: "The City of Springfield Office of Planning and Economic Development and its building-safety functions administer city permits; Sangamon County and surrounding jurisdictions have separate authorities. State-owned work may route through the Illinois Capital Development Board, and fire, floodplain, and utility reviews depend on scope. Establish ownership, funding, delegated authority, and occupied-circulation constraints before deciding whether a state-office alteration follows city or CDB review.",
          codeContext: illinoisCodes + " Springfield's adopted building, zoning, property-maintenance, and permit requirements should be checked with OPED city code resources, while state-owned projects may have CDB procedures. Drawings should identify the applicable edition and any project-specific state agency standards.",
          localConditions: "Sangamon County has freeze-thaw, severe thunderstorms, snow and wind exposure, variable glacial and alluvial soils, and low-lying creek and Sangamon River areas. Older civic and residential buildings may have masonry movement and incremental additions.",
          projectTypes: "State-office renovations, hospital and clinic additions, downtown historic rehabilitation, school work, neighborhood multifamily buildings, and light-industrial improvements near the logistics corridor.",
          sections: [
            { heading: "Occupied civic buildings require staged structure", body: "A Springfield public or institutional renovation may need temporary egress, swing space, vibration limits, and carefully sequenced demolition. Structural notes should distinguish contractor means and methods from design requirements and identify conditions that need engineer observation." },
            { heading: "Flat sites still have foundation variability", body: "Alluvial deposits, fill, abandoned utilities, and changing groundwater can affect settlement and underpinning even where the site appears level. Correlate borings, survey elevations, existing cracks, and drainage before extending a foundation or adding a heavy rooftop system." },
            { heading: "Wind and weather affect low-rise attachments", body: "Canopies, façade panels, rooftop screens, and solar arrays need anchorage and load-path checks for Springfield wind, snow, ice, and maintenance conditions. A detail copied from a warmer market may omit the winter combinations that control." }
            ,{ heading: "Springfield civic work must protect occupied circulation", body: "State-office and courthouse alterations can require temporary corridors, security checkpoints, and protected egress while beams or stairs change. Put those interfaces in the OPED building-safety or CDB plan-review artifact and coordinate with the facility operator before demolition." }
          ],
          permitSteps: [
            "Use the Springfield OPED building-safety intake or CDB project checkpoint to establish ownership, occupancy, procurement constraints, floodplain, and permit type.",
            "Pair existing drawings, survey, geotechnical information, facility operations, and targeted field observations with the OPED/CDB structural review record for framing, foundations, and attachments.",
            "Prepare calculations, drawings, specifications, temporary-condition notes, and coordination with architecture, MEP, fire, accessibility, and civil work.",
            "Have the responsible Illinois PE verify professional responsibility, sealing, special inspection, and the submission format accepted by the relevant authority.",
            "Submit through the city, CDB, or other applicable process and track comments and construction changes under controlled revision.",
            "For an occupied Springfield civic building, attach the OPED building-safety plan-review comments or CDB project checkpoint to the release with temporary egress, security, phasing, and operator decisions."
          ],
          faqs: [
            { question: "Does state ownership change a Springfield structural permit?", answer: "It can. CDB or another state process may apply in addition to or instead of a city path, depending on the property and work. Confirm ownership, funding, and delegated authority before selecting the permit route." },
            { question: "Are Springfield roof attachments affected by snow?", answer: "Yes. Roof geometry, drift, equipment, maintenance access, exposure, and existing framing all matter. A responsible PE should check the actual roof and attachment rather than use a generic attachment schedule." },
            { question: "What should an occupied Springfield renovation show about temporary work?", answer: "The design should identify structural effects and required protection or sequence, while the contractor remains responsible for means and methods unless otherwise contracted. Owner operations, egress, and safety constraints should be coordinated early." },
            { question: "How should a Springfield civic building phase a beam or stair change?", answer: "Map temporary corridors, security checkpoints, egress, swing space, vibration limits, and facility observation points in the OPED building-safety or CDB plan-review artifact instead of leaving occupied circulation to demolition." }
          ],
          sources: sources("https://www.springfield.il.us/Departments/OPED/BuildingSafety.aspx", "https://www.ameren.com/illinois/business", "https://www.isws.illinois.edu/statecli/"),
        },
        {
          serviceSlug: "mep-engineering",
          title: "Springfield MEP Engineering for State Offices, Healthcare, and Industry",
          description: "Springfield MEP engineering for government offices, healthcare, education, industrial, and commercial projects, with Ameren and local permit coordination.",
          h1: "MEP Engineering for Springfield Facilities",
          kicker: "Capital-city building systems coordination",
          lede: "Springfield MEP work often has to keep public, clinical, or production spaces operating while systems are renewed. We document existing utilities, phasing, emergency systems, and energy choices for the responsible professionals and the correct city or state review.",
          permitAuthority: "The City of Springfield Office of Planning and Economic Development is the city permit contact; CDB, fire, health, institutional owners, water, sewer, and Ameren may review other portions. County or neighboring municipal rules apply outside city limits. For occupied civic or clinical buildings, put shutdown ownership, emergency power, and after-hours work in the agency matrix.",
          codeContext: illinoisCodes + " Confirm current Springfield mechanical, electrical, plumbing, fire, energy, and accessibility provisions through OPED, along with any CDB or agency standards. Special occupancies and public facilities may require more than an ordinary commercial plan review.",
          localConditions: "Cold winters, humid summers, severe storms, older steam and hydronic systems, government occupancy schedules, and Ameren service constraints shape Springfield MEP decisions. Low areas may require flood-aware placement for electrical and mechanical equipment.",
          projectTypes: "State-office fit-outs, hospital renovations, courthouse systems, school additions, downtown restaurants, and light-industrial production upgrades.",
          sections: [
            { heading: "Public-building phasing starts with the utility map", body: "A Springfield state-office renovation can contain multiple meters, emergency feeders, central plants, and controls networks behind a simple floor plan. Verify shutdown ownership, temporary power, fire alarm interfaces, and after-hours work before committing to a ceiling plan." },
            { heading: "Healthcare systems need a clinical basis", body: "Air changes, pressure relationships, filtration, redundancy, medical gases, infection control, and emergency power should be set by the facility's program and applicable standards. A general office MEP template is not suitable for a Springfield patient-care area." },
            { heading: "Storm resilience includes controls and communications", body: "Severe thunderstorms and outages can expose weaknesses in generators, transfer switches, pumps, BAS networks, and remote alarms. Resilience choices should be coordinated with Ameren service, owner emergency procedures, and the physical location of critical equipment." }
            ,{ heading: "Springfield MEP documents need agency ownership labels", body: "A CDB central plant, an Ameren service, a city water connection, and a tenant panel may each have a different maintainer. Label those boundaries in the OPED or CDB MEP review package so an occupied public building does not rely on an unassigned shutdown." }
          ],
          permitSteps: [
            "Map the Springfield OPED/CDB review lane with the facility operator, then assign institutional, fire, utility, health, and occupied-operational constraints.",
            "Walk existing panels, emergency power, boilers, air handlers, controls, risers, medical or process systems, and Ameren service capacity with the facility operator; issue the OPED/CDB utility exhibit.",
            "Develop coordinated MEP, controls, energy, plumbing, fire, structural-support, and phasing documents for the selected code route.",
            "Coordinate Ameren and other utility requirements and obtain responsible Illinois PE review or sealing when required.",
            "Submit to each applicable reviewer, answer comments by discipline, and control field changes and equipment substitutions.",
            "Give Springfield facility staff a labeled shutdown, generator, BAS, and restart sequence keyed to the OPED building-safety review, CDB owner review where applicable, and Ameren service correspondence."
          ],
          faqs: [
            { question: "Does a Springfield state-office project use the city permit process?", answer: "It depends on ownership, funding, delegation, and project scope. CDB or another state authority may control review, while city, fire, utility, or local approvals can still be relevant. Confirm the actual path with the owner." },
            { question: "Can Springfield facilities rely on an existing central plant?", answer: "Only after capacity, redundancy, controls, distribution, water treatment, and operational availability are checked. A central plant's nameplate rating does not prove that a renovation can connect without affecting existing occupants." },
            { question: "What does Ameren need for a major Springfield electrical change?", answer: "Utility requirements vary by service, load, equipment, protection, metering, and site. Provide project-specific load and one-line information and coordinate directly; do not promise capacity or energization timing." },
            { question: "How should Springfield public-building MEP ownership be shown?", answer: "Label CDB or owner central plants, Ameren service equipment, city water, emergency generators, BAS, and tenant panels by maintainer in the OPED/CDB MEP review artifact. A shutdown sequence should identify each isolation authority." }
          ],
          sources: sources("https://www.springfield.il.us/Departments/OPED/BuildingSafety.aspx", "https://www.ameren.com/illinois/business", "https://www.energy.gov/eere/buildings/building-energy-codes-program"),
        },
        {
          serviceSlug: "civil-engineering",
          title: "Springfield Civil Engineering for Public, Commercial, and Industrial Sites",
          description: "Springfield civil engineering for drainage, access, site utilities, roadway interfaces, and development plans coordinated with city, county, CDB, and utility requirements.",
          h1: "Civil Engineering for Springfield Sites",
          kicker: "Springfield site, drainage, and utility design",
          lede: "Springfield sites can look uncomplicated while hiding aging utilities, creek drainage, state right-of-way interfaces, and flat grades that leave little room for error. We build a civil basis from current survey, soils, flood information, and the authority responsible for each improvement.",
          permitAuthority: "The City of Springfield Office of Planning and Economic Development reviews city development and building-related site work; Sangamon County and IDOT may control other locations or roadway interfaces. Public works, water, sewer, floodplain, CDB, and utilities can have separate approvals. Identify the road owner and frontage permit before treating a city site plan as access authorization.",
          codeContext: illinoisCodes + " Springfield zoning, subdivision, stormwater, access, erosion, and utility standards are local or agency-specific. Confirm current OPED, Public Works, county, CDB, and roadway requirements before finalizing grading and connections.",
          localConditions: "Flat and gently rolling terrain, clay and fill, creek and Sangamon River flood exposure, intense thunderstorms, freeze-thaw, and snow storage shape Springfield civil work. Government and commercial sites also need accessible routes, emergency access, and reliable utility records.",
          projectTypes: "State-campus circulation, hospital parking and drainage, suburban retail, industrial expansions, school sites, downtown streetscape, and multifamily infill.",
          sections: [
            { heading: "Public sites need an accessible route that survives weather", body: "Grades, cross-slopes, crossings, snow storage, curb ramps, drainage inlets, and emergency access should be coordinated rather than designed in isolation. Springfield winters can turn a nominally compliant low point into an icy path if runoff and maintenance are ignored." },
            { heading: "Creek and river records need field correlation", body: "FEMA lines, local drainage complaints, survey elevations, culvert sizes, and outfall conditions tell different parts of the story. Use one vertical datum and document overflow routes before placing a building or parking expansion near a low area." },
            { heading: "State and local road edges are different", body: "A driveway or frontage improvement can involve city public works, Sangamon County, or IDOT depending on the road. Access geometry, permits, sight distance, drainage, and restoration responsibility should be assigned before a site plan promises an entrance." }
            ,{ heading: "Springfield public sites need a snow-and-event plan", body: "State-campus events, school arrivals, snow piles, accessible routes, emergency staging, and stormwater inlets compete for the same pavement. Show the operating sequence in the OPED/Public Works site-plan review and name the maintenance owner." }
          ],
          permitSteps: [
            "Check the Springfield OPED/Public Works site-plan intake and identify county or city jurisdiction, road owner, zoning, floodplain, watershed, access, and utility responsibilities.",
            "Assemble current survey, geotechnical and flood information, utility locates, easements, fire-flow data, and drainage records for the Springfield OPED/Public Works site-plan checkpoint.",
            "Prepare grading, stormwater, erosion, utility, pavement, access, landscape, and maintenance plans coordinated with building and emergency access.",
            "Confirm city, county, IDOT, CDB, state, utility, and Illinois PE requirements and submit the applicable calculations and forms.",
            "Answer agency comments and document any field change that affects grades, outfalls, access, or utility capacity.",
            "Attach the Springfield OPED or Public Works site-plan review response and, where frontage is a state route, the IDOT access-permit checkpoint to the civil release."
          ],
          faqs: [
            { question: "Who controls a Springfield project entrance on a state route?", answer: "IDOT may control the route and access permit, while the city or county may review the development. Determine road ownership and frontage jurisdiction before relying on a city site-plan approval." },
            { question: "Does a Springfield parcel outside a FEMA zone have no drainage risk?", answer: "No. Local creeks, overland runoff, undersized culverts, and intense storms can affect property outside mapped special flood hazard areas. Survey, local records, and site drainage analysis remain important." },
            { question: "Why coordinate snow storage with civil drawings?", answer: "Snow piles can block accessible routes, loading, fire access, and inlets and can send meltwater across pavement. A Springfield plan should designate storage and drainage responsibilities that the owner can maintain." },
            { question: "Who controls an entrance from a Springfield state route?", answer: "IDOT may control the route and access permit, while OPED or the county reviews the development. Confirm frontage ownership, drainage, sight distance, restoration, and maintenance before placing an entrance in the site-plan and IDOT access review." }
          ],
          sources: sources("https://www.springfield.il.us/Departments/OPED/BuildingSafety.aspx", "https://www.ameren.com/illinois/business", "https://idot.illinois.gov/transportation-system/permits.html"),
        },
        {
          serviceSlug: "energy-compliance",
          title: "Springfield Energy Compliance for Public and Commercial Buildings",
          description: "Springfield energy-compliance support for government, healthcare, education, industrial, and commercial projects using the applicable Illinois and local energy-code route.",
          h1: "Energy Compliance for Springfield Projects",
          kicker: "Illinois energy-code documentation for the capital region",
          lede: "Springfield energy work must balance long operating hours, public-building schedules, winter heating, storm resilience, and existing systems. We identify the current Illinois and local compliance path and coordinate evidence for the responsible professional and AHJ.",
          permitAuthority: "The City of Springfield Office of Planning and Economic Development reviews city building work; CDB, institutional owners, fire, utilities, and state agencies may add requirements. Confirm the authority and code edition for the parcel and funding path before selecting the compliance method. The energy submittal should follow the owner, procurement, commissioning, and turnover route as well as the code worksheet.",
          codeContext: illinoisCodes + " The Illinois commercial energy standard and current Springfield or CDB requirements control. Verify edition, alterations, commissioning, performance options, and state-agency forms through the reviewing office because adoption and administrative guidance can change.",
          localConditions: "Cold winters, humid summers, public occupancy schedules, older boilers and steam, storm-related outages, and Ameren demand charges shape Springfield energy analysis. Envelope and control measures may be more practical than wholesale replacement in occupied civic buildings.",
          projectTypes: "State-office renovations, schools, courthouse upgrades, hospital systems, downtown historic buildings, and municipal lighting or HVAC projects.",
          sections: [
            { heading: "Public operations change the baseline", body: "A state or municipal building can have extended hours, security loads, archive rooms, public meeting peaks, and weekend setbacks that a generic office schedule misses. The energy record should use owner data and state clearly which operational assumptions are design inputs." },
            { heading: "Historic envelopes require a moisture-aware strategy", body: "Springfield masonry and older windows may be constrained by preservation, condensation, and detailing. Pair code compliance with hygrothermal reasoning, air-sealing details, controls, and maintainable upgrades rather than assuming interior insulation or replacement glazing is harmless." },
            { heading: "Resilience belongs in the energy conversation", body: "High-efficiency equipment still needs reliable power, controls, pumps, and communications during a storm. Evaluate emergency generation, transfer strategy, critical-zone operation, and equipment location with the owner instead of treating resilience as an afterthought." }
            ,{ heading: "Springfield public-building compliance needs a procurement trail", body: "CDB or municipal work may specify approved equipment, commissioning evidence, and turnover documents beyond the permit worksheet. Keep the model, OPED or CDB energy-review artifact, controls sequence, and owner acceptance criteria connected through closeout." }
          ],
          permitSteps: [
            "Record the Springfield OPED or CDB energy-review route, current provisions, occupancy, alteration scope, operating schedules, and owner goals before modeling.",
            "Populate the Springfield OPED or CDB energy-review record with envelope, equipment, lighting, controls, service-water, utility, and operating data; identify unknown conditions.",
            "Select prescriptive or performance compliance and document thermal values, efficiencies, ventilation, controls, commissioning, and regulated-load boundaries.",
            "Coordinate energy forms and notes with architecture, MEP, structural, fire, and resilience drawings and obtain responsible PE review as applicable.",
            "Submit and answer comments, then reevaluate the compliance record when procurement or operational assumptions change.",
            "Retain the Springfield energy worksheet, OPED or CDB review artifact, procurement schedule, commissioning evidence, controls sequence, and municipal acceptance items together."
          ],
          faqs: [
            { question: "Which energy documents does Springfield require?", answer: "Illinois projects follow applicable Illinois commercial energy requirements and local or state-agency adoption. Verify the currently effective Springfield or CDB route, edition, forms, and alteration scope with the reviewing authority." },
            { question: "How can a historic Springfield building improve energy performance?", answer: "Start with documented envelope and HVAC conditions, moisture risk, controls, schedules, and preservation constraints. A responsible team can compare measures without promising that one retrofit will satisfy every code or owner goal." },
            { question: "Are state energy forms different from city forms?", answer: "They can be. Ownership, funding, agency delegation, and project type determine the paperwork and review. Confirm the required forms with the reviewing authority rather than submitting a municipal template by assumption." },
            { question: "What should a Springfield energy closeout include?", answer: "Keep the approved calculation path, OPED or CDB energy-review artifact, procurement schedule, controls sequences, commissioning evidence, and municipal acceptance items together. Utility savings are not proof of code compliance." }
          ],
          sources: sources("https://www.springfield.il.us/Departments/OPED/BuildingSafety.aspx", "https://www.ameren.com/illinois/business", "https://www.energy.gov/eere/buildings/building-energy-codes-program"),
        },
        {
          serviceSlug: "pe-stamped-drawings",
          title: "PE-Stamped Drawings for Springfield Public and Private Projects",
          description: "Springfield PE-stamped-drawing coordination for structural, MEP, civil, and energy packages, distinguishing city, CDB, county, utility, and state responsibilities.",
          h1: "PE-Stamped Drawings for Springfield Projects",
          kicker: "Capital-region engineering documents and review",
          lede: "Springfield's public and private projects can have different owners, procurement rules, and reviewing authorities. We organize technical evidence and discipline boundaries so the responsible Illinois PE can determine what is ready for sealing and the correct submission path.",
          permitAuthority: "City of Springfield OPED handles city permits, while CDB may govern state-owned work; Sangamon County, fire, floodplain, IDOT, utilities, and institutional owners may review separate components. The project team must verify responsible charge, Illinois authorization, seal format, and each agency's requirements. Use separate authority-specific covers and transmittals when a technical calculation serves both CDB and a municipal or roadway review.",
          codeContext: illinoisCodes + " Current Springfield city or CDB code, energy, accessibility, and permit conventions should be identified on the cover and in the design analysis. A PE seal does not stand in for CDB, IDOT, zoning, fire, floodplain, utility, or procurement approval.",
          localConditions: "Occupied government facilities, aging civic construction, flat drainage, severe storms, freeze-thaw, variable soils, and state-campus infrastructure demand unusually clear phasing and record coordination.",
          projectTypes: "CDB renovations, state-office fit-outs, school and hospital work, downtown adaptive reuse, industrial improvements, and public-site utility packages.",
          sections: [
            { heading: "Ownership determines the document route", body: "Before sealing, identify whether Springfield work is city, county, state, institutional, or private and whether an IDOT or utility permit is separate. A familiar title block cannot establish jurisdiction or substitute for the owner's procurement and review requirements." },
            { heading: "A public project needs auditable assumptions", body: "Existing-condition photos, survey control, utility letters, energy calculations, accessibility coordination, and revision logs help an agency reviewer understand decisions. The record should identify items delegated to the contractor and items retained by the responsible PE." },
            { heading: "Sealing is not the end of coordination", body: "State comments, owner standards, bid alternates, substitutions, and construction administration can change the basis after initial filing. Establish a revision protocol so the responsible professional can evaluate changes rather than letting an old seal be treated as blanket coverage." }
            ,{ heading: "Springfield packages should separate CDB and city deliverables", body: "A state-owned office and a private downtown alteration may share technical calculations but not cover sheets, file rules, or review contacts. Keep the CDB project checkpoint and OPED permit transmittal separate so the wrong reviewer is not asked to accept the wrong package." }
          ],
          permitSteps: [
            "Build the Springfield transmittal split first: identify CDB or OPED ownership, funding, jurisdiction, agency list, occupancy, code editions, and discipline responsibility.",
            "Bind surveys, existing documents, geotechnical and utility records, owner standards, CDB or IDOT criteria, and manufacturer information to the correct Springfield transmittal.",
            "Coordinate calculations, drawings, specifications, schedules, energy records, and phasing notes across all disciplines.",
            "Have the responsible Illinois PE conduct the substantive review and confirm seal, electronic signature, special inspection, and agency submission rules.",
            "Submit through the city, CDB, county, utility, or other applicable paths and maintain controlled responses and revisions.",
            "Separate the Springfield CDB, OPED, IDOT, and utility transmittals so each reviewer receives its own cover sheet, code path, review artifact, and revision record."
          ],
          faqs: [
            { question: "Does a Springfield PE stamp mean CDB has approved the set?", answer: "No. CDB or another state authority conducts its own review when applicable. A seal establishes professional responsibility for the engineer's work and cannot promise agency approval or procurement acceptance." },
            { question: "Can city and state Springfield projects share one title block?", answer: "They may share design information, but title-block, forms, code, file, and review requirements can differ. Confirm the owner's and authority's current standards before issuing a sealed package." },
            { question: "What happens when a Springfield contractor finds a hidden condition?", answer: "The field condition should be documented and routed to the responsible professional. The PE evaluates whether calculations, drawings, or agency submissions need revision; the original seal does not automatically cover an unreviewed change." },
            { question: "How should a Springfield sealed set distinguish CDB from city work?", answer: "Use authority-specific covers, code paths, file instructions, transmittals, and revision logs for the CDB project checkpoint and OPED permit submission. A PE seal does not combine CDB, city, IDOT, or utility approvals." }
          ],
          sources: sources("https://www.springfield.il.us/Departments/OPED/BuildingSafety.aspx", "https://www.ameren.com/illinois/business", "https://idfpr.illinois.gov/profs/pe.html"),
        }
      ]
    },
    {
      slug: "champaign-urbana",
      name: "Champaign-Urbana",
      county: "Champaign County",
      services: [
        {
          serviceSlug: "structural-engineering",
          title: "Champaign-Urbana Structural Engineering for Research, Housing, and Commercial Work",
          description: "Champaign-Urbana structural engineering for University of Illinois-adjacent research, multifamily, agricultural, and commercial projects, coordinated with the correct Champaign, Urbana, county, or campus authority.",
          h1: "Structural Engineering for Champaign-Urbana Buildings",
          kicker: "Twin-city structural design and evaluation",
          lede: "Champaign-Urbana mixes university research, student housing, flat agricultural terrain, and fast-changing commercial corridors. We distinguish campus, city, and county requirements while investigating existing framing and foundations for responsible Illinois PE review.",
          permitAuthority: "The City of Champaign Planning and Development Department and the City of Urbana Community Development Services administer their respective permits; Champaign County and the University of Illinois have separate authorities. Fire, utility, stormwater, and campus standards may run in parallel, so the address and owner determine the path. Put the municipality, campus ownership, lab or housing program, and vibration criteria on the first review request.",
          codeContext: illinoisCodes + " Champaign and Urbana separately administer local building and zoning requirements, and campus work follows University of Illinois standards and review. Confirm the current municipal or campus code edition, energy route, and amendments through the relevant local code resource before structural design.",
          localConditions: "Flat prairie terrain, compressible or variable soils, high groundwater in places, severe thunderstorms, winter snow and freeze-thaw, and wind exposure across open land affect the twin-city area. Student-housing additions and lab equipment can create concentrated loads.",
          projectTypes: "University research and teaching buildings, student apartments, downtown Champaign infill, Urbana historic homes, agricultural technology facilities, and retail or office conversions.",
          sections: [
            { heading: "Research equipment creates concentrated demand", body: "Vibration-sensitive instruments, shielding, lab casework, rooftop exhaust, and heavy mechanical systems can control both structure and floor layout. A Champaign-Urbana evaluation should coordinate equipment reactions and vibration criteria with the campus or owner program before finalizing framing." },
            { heading: "Flat prairie sites still settle differently", body: "Fill, soft soils, buried infrastructure, and additions constructed at different times can produce differential movement on apparently easy sites. Borings, survey control, existing crack patterns, and foundation probes are valuable for student housing and research-building alterations." },
            { heading: "Open exposure changes roof attachment design", body: "Campus and fringe sites can experience unobstructed wind, drifting snow, rooftop equipment, and maintenance traffic. Screens, solar arrays, and lab exhaust need an explicit load path into the existing roof and coordination with waterproofing and vibration controls." }
            ,{ heading: "Champaign-Urbana research additions need equipment hold points", body: "Lab instruments and process skids may arrive after the building permit. Reserve verified reactions, housekeeping pads, penetrations, and vibration criteria in the University of Illinois Facilities and Services review package without pretending that an unselected instrument has a known load." }
          ],
          permitSteps: [
            "Check the Champaign permit authority, Urbana Building Safety authority, Champaign County boundary, or University of Illinois Facilities and Services checkpoint before assigning occupancy and campus standards.",
            "Pair survey, geotechnical, existing-building, equipment, vibration, and utility information with the University of Illinois Facilities and Services checkpoint or the applicable city permit record; verify critical framing and foundations.",
            "Coordinate structural calculations and drawings with architecture, laboratory or housing programming, MEP supports, fire, accessibility, and civil conditions.",
            "Have the responsible Illinois PE determine professional responsibility, sealing, special-inspection, and municipal or campus submission requirements.",
            "Submit to each applicable authority and control responses, substitutions, and field changes through the responsible professional.",
            "For a campus lab or student residence, carry the University of Illinois Facilities and Services project checkpoint, municipality-specific permit comments, equipment hold points, vibration criteria, and semester shutdown plan into the construction release."
          ],
          faqs: [
            { question: "Does a University of Illinois project use Champaign or Urbana permits?", answer: "Campus ownership and project governance can create a separate review path, while city or utility requirements may still apply depending on location and scope. Confirm the university and municipal authorities with the owner." },
            { question: "How should lab vibration be addressed in Champaign-Urbana?", answer: "Start with instrument criteria, equipment reactions, floor spans, isolation, mechanical sources, and construction sequencing. A general office live-load check does not establish vibration suitability." },
            { question: "Are student-housing additions structurally simple?", answer: "Not necessarily. Existing foundations, repetitive framing, fire and egress changes, rooftop equipment, density, and phased occupancy can make an addition substantially more complex than its footprint suggests." },
            { question: "What should a Champaign-Urbana lab addition reserve for future equipment?", answer: "Identify instrument reactions, vibration criteria, housekeeping pads, penetrations, and utility hold points separately from unknown future equipment in the University of Illinois Facilities and Services checkpoint. Do not invent loads for an unselected instrument." }
          ],
          sources: sources("https://champaignil.gov/public-works/permits-inspections/", "https://www.ameren.com/illinois/business", "https://www.isws.illinois.edu/statecli/"),
        },
        {
          serviceSlug: "mep-engineering",
          title: "Champaign-Urbana MEP Engineering for Campus, Labs, and Housing",
          description: "Champaign-Urbana MEP engineering for research facilities, student housing, healthcare, restaurants, and commercial buildings, coordinated with city, campus, and Ameren requirements.",
          h1: "MEP Engineering for Champaign-Urbana Facilities",
          kicker: "Campus and community building-systems design",
          lede: "Champaign-Urbana MEP work often crosses campus utility standards, student occupancy, laboratory exhaust, and older neighborhood buildings. We survey the real system, coordinate utility and controls interfaces, and prepare a project-specific basis for responsible professional review.",
          permitAuthority: "Champaign and Urbana each have their own building and development-review offices; the University of Illinois Facilities and Services governs campus standards and approvals. Fire, public health, water, sewer, Ameren, and county authorities may have separate roles. A campus central-utility tie-in and a private apartment service should be documented as different ownership and shutdown workflows.",
          codeContext: illinoisCodes + " Verify whether the project follows Champaign, Urbana, county, or University of Illinois codes and standards, including mechanical, plumbing, electrical, fire, energy, and laboratory criteria, using the relevant local code resources. A campus standard is not automatically the municipal permit code.",
          localConditions: "Cold winters, humid summers, flat-site drainage, open prairie wind, high student-density schedules, research exhaust, and legacy steam or chilled-water systems shape local MEP design. Ameren service and campus utility capacity should be checked early.",
          projectTypes: "Campus laboratories, student residence halls, biotech and agricultural research spaces, downtown restaurants, medical offices, and neighborhood multifamily renovations.",
          sections: [
            { heading: "Campus utilities have an owner interface", body: "A research building may connect to central steam, chilled water, power, controls, and emergency systems under University of Illinois standards rather than ordinary utility assumptions. Confirm ownership, metering, redundancy, shutdown windows, and commissioning responsibilities before laying out equipment." },
            { heading: "Lab exhaust affects every discipline", body: "Fume hoods, hazardous exhaust, makeup air, pressure control, roof fans, plume dispersion, acoustics, and structural supports need one coordinated basis. The MEP package should explain normal and emergency modes and distinguish laboratory requirements from office ventilation." },
            { heading: "Student housing rewards maintainable systems", body: "High occupancy, summer vacancy, domestic hot-water peaks, kitchen exhaust, tampering, and access for maintenance influence equipment selection and controls. A design that works only under an ideal schedule will perform poorly during move-in, breaks, and partial occupancy." }
            ,{ heading: "Campus MEP cutovers follow an academic calendar", body: "A summer shutdown, a semester occupancy, and a laboratory campaign impose different risk tolerances. Put isolation points, temporary service, controls ownership, and restart testing in the University of Illinois Facilities and Services checkpoint rather than relying on a generic sequence." }
          ],
          permitSteps: [
            "Use the University of Illinois Facilities and Services intake or the applicable Champaign/Urbana permit checklist to assign campus, fire, health, water, sewer, Ameren, and occupancy responsibilities.",
            "Walk central-plant interfaces, panels, shafts, controls, domestic systems, exhaust, and Ameren capacity with Facilities and Services or the municipal reviewer; record ownership in the campus utility exhibit.",
            "Coordinate MEP, laboratory or housing criteria, energy, fire, structural supports, architectural clearances, controls, and commissioning.",
            "Obtain campus or utility criteria and responsible Illinois PE review or sealing where the scope or AHJ requires it.",
            "Submit municipal and campus packages as applicable and track comments, commissioning evidence, and equipment changes.",
            "Give the Champaign-Urbana facilities operator a cutover matrix keyed to University of Illinois Facilities and Services review, central steam, chilled water, Ameren service, controls, and academic-calendar restrictions."
          ],
          faqs: [
            { question: "Can a campus building connect to Ameren like a private commercial building?", answer: "The campus may use central utilities, special metering, or separate service arrangements. Confirm the University of Illinois and Ameren interface for the parcel; do not assume ordinary service capacity or ownership." },
            { question: "What is unusual about Champaign-Urbana lab ventilation?", answer: "Exhaust, makeup air, pressure cascades, emergency modes, plume, energy use, vibration, acoustics, and structural support interact. The final criteria should come from the lab program and applicable authorities, not a generic office schedule." },
            { question: "Does a student apartment renovation need domestic hot-water modeling?", answer: "It should evaluate occupancy, fixture count, diversity, recirculation, peak events, energy requirements, and existing plant capacity. The correct method depends on the project and code path." },
            { question: "How should a campus MEP shutdown be scheduled?", answer: "Coordinate isolation points, temporary service, controls ownership, restart testing, and laboratory or residence-hall occupancy in the University of Illinois Facilities and Services review. A summer window and an academic-semester window carry different risks." }
          ],
          sources: sources("https://champaignil.gov/public-works/permits-inspections/", "https://www.ameren.com/illinois/business", "https://www.energy.gov/eere/buildings/building-energy-codes-program"),
        },
        {
          serviceSlug: "civil-engineering",
          title: "Champaign-Urbana Civil Engineering for Campus and Prairie Sites",
          description: "Champaign-Urbana civil engineering for campus additions, student housing, commercial infill, agricultural facilities, stormwater, and utilities coordinated with municipal and university authorities.",
          h1: "Civil Engineering for Champaign-Urbana Sites",
          kicker: "Prairie drainage, access, and utility coordination",
          lede: "Champaign-Urbana's flat terrain leaves little fall for stormwater while campus and commercial sites compete for safe pedestrian routes, utilities, and construction access. We use current survey and drainage evidence to separate city, county, and University of Illinois responsibilities.",
          permitAuthority: "Champaign and Urbana public-works or development offices review their own sites; Champaign County governs unincorporated locations and University of Illinois Facilities and Services reviews campus work. Drainage districts, IEPA, fire, IDOT, and utilities may control additional pieces. Flat-site detention, bicycle routes, and utility corridors should be assigned to the city, county, campus, or drainage district before grading is approved.",
          codeContext: illinoisCodes + " Local stormwater, zoning, subdivision, access, erosion, and utility standards differ between Champaign, Urbana, county, and campus. Verify the applicable city or county manual, drainage-district conditions, maintenance obligations, and review thresholds before selecting detention or infiltration.",
          localConditions: "Very flat prairie grades, clay and silt soils, high groundwater in some areas, intense thunderstorms, freeze-thaw, open-field wind, and drainage-district infrastructure shape civil design. Campus sites add dense utilities and pedestrian safety.",
          projectTypes: "University research additions, student-housing courtyards, downtown infill, agricultural research plots, logistics and food facilities, and neighborhood street or sidewalk work.",
          sections: [
            { heading: "Flat sites need a deliberate overflow route", body: "When there is little grade, a minor obstruction can send water toward a residence hall, basement, or lab entrance. Establish finished floors, inlet capacity, detention overflow, accessible routes, and emergency access together and show what happens during an exceedance." },
            { heading: "Campus utilities are a survey challenge", body: "Multiple generations of steam, chilled water, electric, data, water, and sanitary service can cross a proposed building area. Utility locates, campus record coordination, potholing, and a protected corridor should precede final grading and foundation placement." },
            { heading: "Pedestrians and construction vehicles share narrow margins", body: "Student routes, bicycles, delivery trucks, fire lanes, snow storage, and temporary fencing need a phaseable site plan. A civil package should identify safe connections and maintenance responsibility rather than treating the sidewalk as leftover pavement." }
            ,{ heading: "Champaign-Urbana drainage must preserve campus movement", body: "A detention basin, curb ramp, bicycle path, and service drive can all occupy a narrow flat corridor. Show winter maintenance, accessible detours, emergency overflow, and the party responsible for each inlet in the Champaign or Urbana public-works/site-plan review." }
          ],
          permitSteps: [
            "Plot the parcel against Champaign or Urbana public-works/site-plan intake, county and drainage-district limits, IDOT frontage, fire, utility, and environmental jurisdiction.",
            "Assemble survey, utility locates, drainage and flood records, geotechnical information, easements, fire-flow data, and campus utility maps for the Champaign or Urbana public-works/site-plan checkpoint.",
            "Prepare grading, stormwater, erosion, utilities, access, pavement, pedestrian, landscape, and construction-phase plans.",
            "Confirm applicable standards, maintenance ownership, state or local permits, and Illinois PE sealing requirements.",
            "Submit separate city, campus, county, utility, or drainage applications as needed and answer comments with coordinated revisions.",
            "Close the Champaign-Urbana site file with the Champaign or Urbana public-works/site-plan comment response, pedestrian detours, bicycle routes, snow storage, detention overflow, and drainage-district maintenance responsibilities."
          ],
          faqs: [
            { question: "Why is detention difficult on a flat Champaign-Urbana parcel?", answer: "There may be little elevation difference between the site and outfall, high groundwater, limited storage depth, and existing drainage-district or sewer constraints. Survey, soils, and authority criteria should drive the solution." },
            { question: "Does University of Illinois approval replace city stormwater review?", answer: "Not automatically. Campus and municipal responsibilities depend on ownership, agreements, location, and work. Map both paths with the owner before assuming one approval covers the other." },
            { question: "Can infiltration always be used in prairie soils?", answer: "No. Soil permeability, groundwater, contamination, seasonal saturation, setbacks, maintenance, and local requirements determine feasibility. Testing and agency review are needed before relying on infiltration." },
            { question: "What belongs in a Champaign-Urbana campus drainage plan?", answer: "Show detention overflow, flat-site grades, bicycle and pedestrian detours, snow maintenance, service access, utility corridors, and drainage-district responsibilities in the University review plus Champaign or Urbana public-works/site-plan checkpoint. Campus acceptance does not replace municipal review." }
          ],
          sources: sources("https://champaignil.gov/public-works/permits-inspections/", "https://www.ameren.com/illinois/business", "https://www.isws.illinois.edu/statecli/"),
        },
        {
          serviceSlug: "energy-compliance",
          title: "Champaign-Urbana Energy Compliance for Campus and Commercial Buildings",
          description: "Champaign-Urbana energy-compliance documentation for laboratories, student housing, offices, and commercial work using applicable Illinois, municipal, or University of Illinois standards.",
          h1: "Energy Compliance for Champaign-Urbana Projects",
          kicker: "Energy-code and campus-standard coordination",
          lede: "Champaign-Urbana energy work must reconcile Illinois requirements with campus standards, research ventilation, student schedules, and older buildings. We define the applicable route and document assumptions for responsible professional review.",
          permitAuthority: "Champaign and Urbana building authorities review municipal work; University of Illinois Facilities and Services reviews campus projects, with fire, utilities, and owner programs adding requirements. Confirm which authority accepts the energy documents and which standard governs the project. Distinguish campus central steam, Ameren-served housing, and laboratory process energy in the initial compliance scope.",
          codeContext: illinoisCodes + " Illinois commercial energy requirements, municipal adoption, and University of Illinois standards may overlap or differ. Verify edition, alteration scope, laboratory process treatment, performance modeling, commissioning, and required forms with the municipality or campus reviewer at intake.",
          localConditions: "Cold winters, humid summers, laboratory 24/7 ventilation, student occupancy swings, flat-site flood sensitivity, legacy campus steam, and Ameren demand considerations drive Champaign-Urbana energy analysis.",
          projectTypes: "Research-lab additions, residence-hall retrofits, campus central-plant work, downtown offices, agricultural facilities, and retail or restaurant renovations.",
          sections: [
            { heading: "Laboratory ventilation changes the energy baseline", body: "Air-change rates, exhaust, heat recovery, pressure control, hood diversity, and emergency modes can dominate a research building. The compliance record should clearly separate regulated systems from process and research assumptions and explain why safety criteria remain intact." },
            { heading: "Campus standards may reach beyond minimum code", body: "University of Illinois owners can have utility, metering, controls, commissioning, and performance requirements in addition to municipal code. Establish the hierarchy and responsibility for each requirement instead of assuming a city energy form captures campus acceptance." },
            { heading: "Housing schedules are seasonal and uneven", body: "Residence halls swing between move-in peaks, academic occupancy, breaks, and summer work. Domestic hot water, ventilation setbacks, controls access, and envelope improvements should be evaluated against those real schedules and maintenance capabilities." }
            ,{ heading: "Campus energy documentation should name the utility owner", body: "A lab connected to central steam and a private apartment using Ameren gas require different meters, baselines, and commissioning evidence. Keep those systems separate in the University of Illinois or municipal energy review so a campus target is not mistaken for a city calculation." }
          ],
          permitSteps: [
            "Select the Champaign, Urbana, or University of Illinois energy reviewer and record its current Illinois route, owner standard, occupancy, alteration scope, and lab or housing schedule.",
            "Populate the University or municipal energy-review record with envelope, equipment, lighting, controls, lab or housing schedules, utility data, central-plant interfaces, and field conditions.",
            "Select and document prescriptive or performance compliance, regulated boundaries, laboratory assumptions, efficiencies, controls, and commissioning.",
            "Coordinate forms with architecture, MEP, structural, fire, and campus standards and obtain responsible Illinois PE review as required.",
            "Submit to the correct municipal or campus reviewer and update the record for substitutions, revised schedules, or equipment changes.",
            "Keep the municipal or University of Illinois energy-review artifact with laboratory exhaust assumptions, residence-hall schedules, campus utility ownership, and the selected Illinois compliance path."
          ],
          faqs: [
            { question: "Which energy authority governs a Champaign-Urbana project?", answer: "The project follows applicable Illinois commercial energy requirements plus current Champaign, Urbana, or University of Illinois requirements. Confirm the responsible reviewer, code edition, and forms with the owner and AHJ." },
            { question: "Can lab heat recovery be assumed in a Champaign project?", answer: "It requires compatibility with exhaust contaminants, controls, pressure relationships, maintenance, and emergency operation. Evaluate the actual lab program and authority criteria before assigning savings or code credit." },
            { question: "Are campus sustainability goals the same as permit compliance?", answer: "No. Campus goals or standards can exceed the minimum municipal or Illinois code, while the AHJ still requires its own documentation. Coordinate both tracks explicitly." },
            { question: "How should lab energy documentation separate campus and private utilities?", answer: "A central-steam laboratory and an Ameren-served apartment need different meters, baselines, controls, and commissioning evidence in the University or municipal energy-review artifact. State the owner and utility boundary before assigning credit." }
          ],
          sources: sources("https://champaignil.gov/public-works/permits-inspections/", "https://www.ameren.com/illinois/business", "https://www.energy.gov/eere/buildings/building-energy-codes-program"),
        },
        {
          serviceSlug: "pe-stamped-drawings",
          title: "PE-Stamped Drawings for Champaign-Urbana and Campus Projects",
          description: "Champaign-Urbana PE-stamped-drawing coordination for structural, MEP, civil, and energy packages, distinguishing municipal, county, utility, and University of Illinois responsibilities.",
          h1: "PE-Stamped Drawings for Champaign-Urbana Projects",
          kicker: "Professional engineering documents for twin-city review",
          lede: "A Champaign-Urbana seal must sit on a coordinated record of campus or municipal standards, prairie-site conditions, utility interfaces, and project-specific calculations. We prepare that record for the responsible Illinois PE to review and seal when required.",
          permitAuthority: "Champaign and Urbana administer separate municipal reviews; Champaign County, University of Illinois Facilities and Services, fire, drainage districts, utilities, and IDOT may control related work. The responsible PE confirms Illinois authorization, discipline, responsible charge, electronic seal, and each authority's submission rules. The parcel, municipality, campus status, and utility owner belong in the title block before any seal is applied.",
          codeContext: illinoisCodes + " The applicable Champaign, Urbana, county, or campus code, energy path, and document standards should be stated clearly. A PE stamp does not substitute for university acceptance, zoning, fire, stormwater, utility, or county approval and never guarantees an outcome.",
          localConditions: "Flat grades, variable prairie soils, dense campus utilities, research loads, winter weather, severe storms, and student or public occupancy make consistent vertical, utility, and phasing information especially important.",
          projectTypes: "Campus lab packages, student-housing renovations, municipal streets and utilities, commercial infill, agricultural research facilities, and neighborhood adaptive reuse.",
          sections: [
            { heading: "Identify the campus-city boundary before sealing", body: "A project near the University of Illinois may have city, county, campus, fire, utility, and drainage reviews. The cover and transmittal should assign each responsibility so a sealed set does not imply that a single authority has accepted all work." },
            { heading: "Utility evidence is part of professional judgment", body: "Campus records, potholes, surveys, utility letters, central-plant criteria, and service studies should support the design assumptions. If a line or capacity remains uncertain, show the contingency and required field verification rather than hiding it beneath a seal." },
            { heading: "The handoff must survive academic and construction phasing", body: "Lab equipment, residence-hall occupancy, semester shutdowns, bid alternates, and substitutions can change loads and sequences. A controlled revision log gives the responsible PE and owner a way to evaluate changes without treating the initial stamp as unlimited coverage." }
            ,{ heading: "Twin-city submissions need the parcel on every sheet", body: "Champaign and Urbana are adjacent but maintain separate review lanes. Put the municipality, campus status, utility owners, and applicable code path in the title block and calculation cover, with the Champaign permit or Urbana Building Safety checkpoint, so a package is not routed by metro name alone." }
          ],
          permitSteps: [
            "Put the municipality (Champaign or Urbana), campus status, drainage and roadway jurisdiction, utilities, fire reviewer, and discipline responsibilities on the sealed-set cover before review.",
            "Bind survey, geotechnical, existing-building, campus utility, owner-standard, equipment, and energy information to the University checkpoint or city permit index; flag unresolved assumptions.",
            "Coordinate calculations, drawings, specifications, code analysis, campus standards, and phasing across structural, MEP, civil, and architectural disciplines.",
            "Have the responsible Illinois PE complete substantive review and confirm seal, electronic signature, special-inspection, and submission requirements.",
            "Submit to each applicable authority, respond through the responsible team, and issue controlled revisions for field and procurement changes.",
            "Archive the Champaign or Urbana permit receipt, University of Illinois campus acceptance where applicable, utility correspondence, and calculation index so a twin-city project is not routed by the metro name alone."
          ],
          faqs: [
            { question: "Does a University of Illinois stamp guarantee municipal acceptance?", answer: "No. Campus review and municipal or county AHJ review are distinct unless an agreement says otherwise. The responsible professional's seal does not promise acceptance, timing, or approval." },
            { question: "Can one sealed set cover both Champaign and Urbana?", answer: "Only where the actual project and authorities accept that arrangement. The cities have separate processes and local requirements; determine the jurisdiction by parcel and scope rather than using a metro label as authority." },
            { question: "What should happen when campus equipment changes after sealing?", answer: "Route the revised reactions, utility loads, controls, and clearances to the responsible professional. The PE determines whether a revised calculation, drawing, seal, or authority submission is needed." },
            { question: "How should a twin-city sealed package identify its authority?", answer: "Put Champaign or Urbana, campus status, parcel, utility owners, code path, and review contacts on the cover and calculation index, then attach the Champaign permit or Urbana Building Safety checkpoint. A metro label alone cannot establish acceptance." }
          ],
          sources: sources("https://champaignil.gov/public-works/permits-inspections/", "https://www.ameren.com/illinois/business", "https://idfpr.illinois.gov/profs/pe.html"),
        }
      ]
    }
  ]
};

export { illinoisBatch2 };
export const ILLINOIS_BATCH2 = illinoisBatch2;
export const ILLINOIS_BATCH2_STATE_EXPANSION = illinoisBatch2;
export default illinoisBatch2;