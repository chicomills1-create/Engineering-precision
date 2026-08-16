import type { Industry } from "./types";

export const CLUSTER6_INDUSTRIES: Industry[] = [
  {
    slug: "parking-structure-engineering",
    name: "Parking Structures",
    cluster: 6,
    title: "Parking Structure Engineering | Post-Tensioned Systems",
    meta: "Engineering services for multi-level parking assets. Post-tensioned structural framing, carbon monoxide exhaust automation, and EV routing.",
    h1: "Multi-Level Parking Garage & Deck Engineering Services",
    h2: "Long-Span, Durable Structural Design Combined with Modern Vehicle Charging",
    cardBlurb:
      "Durable, long-span parking structures engineered for decades of service — post-tensioned framing, code-driven CO ventilation, and EV-ready power distribution.",
    intro: [
      "Parking structures are among the most exposed and heavily loaded buildings we engineer, subjected to concentrated wheel loads, thermal cycling, chloride-laden runoff, and constant vibration. Efficient bay layouts demand long clear spans that keep sightlines open and stall counts high while resisting deflection and cracking. Our teams balance structural depth, durability detailing, and drainage against tight vertical clearances and aggressive construction budgets, producing decks that perform through their full service life.",
      "Delivering a parking asset means coordinating structural framing, mechanical ventilation, life-safety systems, lighting, drainage, and increasingly EV charging within a single integrated model. As a multi-discipline firm, we resolve slope-to-drain, conduit routing, ramp geometry, and ventilation zoning before permit, avoiding the field conflicts that plague garages designed in silos. The result is a coordinated, permit-ready package that satisfies IBC, ASCE 7, ACI, and mechanical code requirements simultaneously.",
    ],
    specialties: [
      {
        heading: "Post-Tensioned Cast-in-Place & Precast Concrete Structural Analysis",
        body: "We design cast-in-place post-tensioned and precast concrete framing to ACI 318 and ACI 362, optimizing tendon profiles, effective prestress, and slab thickness for long spans with minimal columns. Analysis covers flexural and shear demand, punching shear at columns, long-term creep and shrinkage losses, restraint-to-shortening effects, and deflection under sustained and live loads per ASCE 7 vehicle loading. For precast double-tee systems we detail bearing pads, connections, and topping composite action, while cast-in-place designs address stressing sequences and slab-band geometry. Durability detailing follows ACI 362 corrosion-protection guidance with encapsulated tendons, cover requirements, sealers, and expansion-joint layout to resist chloride intrusion and freeze-thaw damage.",
      },
      {
        heading: "Mechanized Ventilation, Air Changes, and Carbon Monoxide Exhaust Monitoring",
        body: "Enclosed and partially enclosed garages require mechanical ventilation designed to the International Mechanical Code, which sets a base ventilation rate and permits demand-controlled operation using CO and NO2 sensors. We size supply and exhaust fans, calculate required air changes, and lay out sensor grids and control sequences that ramp fans only when contaminant thresholds are approached, cutting energy use. Designs address jet-fan versus ducted strategies, makeup air, stratification, and stairwell pressurization where required by IBC. We coordinate electrical loads, VFDs, and building automation integration, and provide emergency exhaust logic and alarm reporting so the system meets both ventilation and life-safety obligations.",
      },
      {
        heading: "Scalable, EV-Ready Electrical Infrastructure & Charging Distribution Paths",
        body: "We engineer electrical infrastructure that supports current charging demand and future buildout without costly retrofits. Load studies follow NEC Article 625 for EV supply equipment, including 125-percent continuous-load sizing, energy management systems that allow oversubscribed circuits, and demand factors for large charger banks. We size service entrances, transformers, panelboards, and feeders; lay out spare conduit, cable tray, and stub-ups to designated stalls; and coordinate metering and load-shedding controls. Designs address branch-circuit protection, grounding, GFCI requirements, and physical protection of equipment, and align with local jurisdiction EV-readiness ordinances so owners can scale charging capacity in phases as fleet adoption grows.",
      },
    ],
    disciplines: [
      {
        name: "Structural Engineering",
        href: "/services/structural",
        body: [
          "Structural engineering is the core discipline for parking assets. We design post-tensioned and precast concrete decks, steel or composite ramps, foundation systems, and lateral force-resisting systems to IBC, ASCE 7, and ACI 318. Our models address vehicle live loads, long-span deflection control, punching shear, restraint-to-shortening, and durability detailing for a corrosive service environment.",
        ],
        highlights: [
          "Post-tensioned and precast concrete deck design to ACI 318 / ACI 362",
          "Long-span framing optimized for stall count and clear sightlines",
          "Lateral system design for wind and seismic per ASCE 7",
          "Expansion joints, sealers, and corrosion-protection detailing",
          "Foundation design coordinated with geotechnical recommendations",
        ],
      },
      {
        name: "MEP Engineering",
        href: "/services/mep",
        body: [
          "Our MEP scope covers demand-controlled CO/NO2 ventilation, energy-efficient LED lighting with photometric verification, power distribution, fire alarm, and EV charging infrastructure. We coordinate fan and duct routing against structural depth and clearances, and integrate controls with the building automation system for automated exhaust response and load management.",
        ],
        highlights: [
          "Mechanical garage ventilation per IMC with CO/NO2 demand control",
          "LED lighting design with IES uniformity and glare analysis",
          "EV charging load studies and distribution per NEC Article 625",
          "Fire alarm, standpipe coordination, and emergency systems",
          "Power distribution, metering, and load-management controls",
        ],
      },
      {
        name: "Civil Engineering",
        href: "/services/civil",
        body: [
          "Civil engineering addresses site access, ramp grading, stormwater management, and utility connections. We design surface drainage, slotted drains, and oil/water separators to handle vehicle runoff, and coordinate entry/exit geometry, turning radii, and sight distance with the surrounding road network and ADA accessible routes.",
        ],
        highlights: [
          "Site grading, ramp geometry, and vehicular circulation design",
          "Stormwater management and detention to local jurisdiction standards",
          "Oil/water separators and pollution-control measures for runoff",
          "Utility connections and franchise coordination",
          "ADA accessible routes and van-accessible stall layout",
        ],
      },
      {
        name: "Geotechnical Engineering",
        body: [
          "Geotechnical input governs foundation type and settlement performance for heavily loaded parking structures. We interpret subsurface data to recommend spread footings, mats, or deep foundations, and provide bearing capacity, lateral earth pressures for below-grade walls, and settlement estimates that inform the structural design.",
        ],
        highlights: [
          "Subsurface investigation and foundation-type recommendations",
          "Allowable bearing capacity and settlement analysis",
          "Lateral earth pressures for below-grade and ramp walls",
          "Seismic site classification per ASCE 7",
          "Groundwater and dewatering considerations for below-grade decks",
        ],
      },
    ],
    facilityTypes: [
      "Standalone multi-level parking garages",
      "Below-grade structured parking",
      "Mixed-use podium and above-grade decks",
      "Precast concrete parking structures",
      "Airport and transit parking facilities",
      "Hospital and campus parking decks",
      "Stadium and event parking structures",
      "Automated and mechanical parking systems",
    ],
    projectTypes: [
      "New parking structure construction",
      "Structural restoration and repair",
      "Deck expansion and vertical addition",
      "EV charging retrofit and electrical upgrade",
      "Condition assessment and rehabilitation design",
    ],
    deliverables: [
      "Permit-ready sealed structural drawings",
      "Post-tensioning and precast calculation packages",
      "Vehicle and gravity load studies",
      "Mechanical ventilation and CO control drawings",
      "Electrical one-line diagrams and EV load studies",
      "Photometric lighting plans",
      "Durability and restoration specifications",
      "RFI responses and construction administration support",
    ],
    compliance: [
      {
        code: "IBC / ASCE 7",
        desc: "Governs occupancy classification, structural loads, and wind and seismic design criteria that we apply to the parking structure and its components.",
      },
      {
        code: "ACI 318",
        desc: "The building code requirements for structural concrete we follow for reinforced and post-tensioned deck flexure, shear, and detailing.",
      },
      {
        code: "ACI 362",
        desc: "Provides parking-structure design and durability guidance addressing corrosion protection, joints, and service-life detailing for exposed decks.",
      },
      {
        code: "IMC",
        desc: "The International Mechanical Code sets enclosed-garage ventilation rates and permits demand-controlled CO/NO2 exhaust operation we design to.",
      },
      {
        code: "NEC Article 625",
        desc: "Governs EV supply equipment load calculations, energy-management systems, and branch-circuit protection for charging distribution.",
      },
      {
        code: "PTI / ACI 362.2",
        desc: "Post-Tensioning Institute recommendations for design, installation, and corrosion protection of unbonded tendons in parking decks.",
      },
    ],
    cta: "Upload your parking structure drawings or program requirements and our team will return a coordinated multi-discipline scope and fee proposal.",
  },
  {
    slug: "aviation-hangar-engineering",
    name: "Aviation & Hangars",
    cluster: 6,
    title: "Aviation Hangar Engineering | Long-Span Structural Design",
    meta: "Engineering expertise for aviation assets. Long-span structural framing, high-hazard deluge suppression, and apron drainage design.",
    h1: "Aviation Infrastructure, Hangar & Apron Engineering Services",
    h2: "Heavy Industrial Infrastructure Engineered for Large-Aircraft Constraints",
    cardBlurb:
      "Clear-span hangars and aviation infrastructure engineered for large-aircraft loads — NFPA 409 fire suppression, hazardous electrical zoning, and high-volume apron drainage.",
    intro: [
      "Aircraft hangars present a distinctive combination of very long clear spans, enormous door openings, and high-hazard fire-protection requirements. A single maintenance bay may need a column-free footprint exceeding two hundred feet with roof and crane loads that drive deep steel trusses or girders. Layered on top are jet-fuel fire risks, classified electrical zones, and aprons that must shed both stormwater and fuel spills. These constraints require engineering that treats structure, fire protection, and civil design as one interdependent system.",
      "As an integrated firm, we align the structural frame, deluge foam suppression, hazardous-location electrical, and apron drainage from the outset, resolving the conflicts that arise when hangar systems are designed independently. We coordinate with FAA airspace and design standards, applicable Unified Facilities Criteria on defense projects, and NFPA fire codes, delivering permit-ready packages that satisfy demanding aviation authorities while keeping construction feasible and cost-controlled.",
    ],
    specialties: [
      {
        heading: "Clear-Span Structural Steel Framing for Massive Clear-Opening Hangar Bays",
        body: "We engineer long-span steel roof systems — trusses, plate girders, and space frames — to achieve column-free bays that accommodate wingspan and tail clearances for the intended aircraft. Designs follow AISC 360 and IBC/ASCE 7 for gravity, snow, wind, and seismic loading, with special attention to large door openings that interrupt the lateral system and require reinforced jambs and header trusses. We analyze deflection and vibration under crane loads, size bridge and monorail crane runways, and detail moment frames or braced bays for lateral stability. Connection design, drift limits, and door-track support are coordinated so the structure remains serviceable across full door operation and combined load cases.",
      },
      {
        heading: "NFPA 409 High-Hazard Foam Deluge Fire Suppression System Engineering",
        body: "Aircraft hangars are classified by NFPA 409 into groups that dictate the level of fire protection, from overhead foam-water deluge to low-level, high-expansion foam, or AFFF systems based on hangar size and aircraft value. We determine the applicable group, design the deluge system hydraulics, foam-concentrate proportioning, and discharge density, and coordinate detection and activation with releasing panels per NFPA 72. Structural support for large-diameter piping, drainage of discharged foam, and containment to prevent environmental release are integrated into the design. We also size fire pumps and water supply to NFPA 20 and 22 and confirm coordination with the airport authority's emergency response requirements.",
      },
      {
        heading: "Classified Hazardous Electrical Zoning & High-Volume Apron Drainage Designs",
        body: "Fueling and maintenance operations create classified hazardous locations that we design to NEC Article 500 and NFPA 407 for aircraft fuel servicing. We establish Class I, Division 1 and 2 boundaries around fuel handling and pits, specify explosion-proof or intrinsically safe wiring methods, bonding and grounding for static control, and sealing fittings at classification boundaries. On the civil side, aprons and hangar floors must convey both stormwater and potential fuel spills, so we design trench drains, oil/water separators, and containment sized for spill scenarios, with slopes tuned to aircraft movement. Pavement design follows FAA advisory circulars for the anticipated gear loads and traffic.",
      },
    ],
    disciplines: [
      {
        name: "Structural Engineering",
        href: "/services/structural",
        body: [
          "Structural engineering delivers the long-span steel systems, large door framing, and crane support that define hangar construction. We design to AISC 360, IBC, and ASCE 7, addressing wind on tall doors, snow, seismic drift, and crane fatigue, and detail foundations for the concentrated column and door-jamb reactions.",
        ],
        highlights: [
          "Clear-span steel trusses, girders, and space frames",
          "Large door opening framing and lateral system coordination",
          "Bridge and monorail crane runway design",
          "Wind loading on tall doors and building envelope per ASCE 7",
          "Heavy foundations and slab-on-grade for aircraft floor loads",
        ],
      },
      {
        name: "MEP Engineering",
        href: "/services/mep",
        body: [
          "MEP scope integrates NFPA 409 foam deluge suppression, hazardous-location electrical, high-bay lighting, radiant or unit heating, and ventilation for fuel vapors and maintenance operations. We coordinate fire pumps, detection, releasing controls, and classified wiring methods with the structure and civil containment systems.",
        ],
        highlights: [
          "NFPA 409 foam-water deluge and detection design",
          "Class I hazardous-location electrical per NEC Article 500 / NFPA 407",
          "High-bay LED lighting and power distribution",
          "High-volume ventilation and radiant/unit heating systems",
          "Fire pump and water supply design per NFPA 20 / 22",
        ],
      },
      {
        name: "Civil Engineering",
        href: "/services/civil",
        body: [
          "Civil engineering covers apron pavement, hangar floor slabs, spill containment, and stormwater conveyance for large impervious areas. We design trench drains, oil/water separators, and detention, coordinate taxilane geometry and grading, and follow FAA advisory circulars for pavement subject to aircraft gear loads.",
        ],
        highlights: [
          "Apron and taxilane pavement design to FAA advisory circulars",
          "Trench drains, oil/water separators, and fuel-spill containment",
          "Stormwater detention and conveyance for large impervious areas",
          "Grading, taxilane geometry, and access coordination",
          "Utility and fuel-line corridor coordination",
        ],
      },
      {
        name: "Geotechnical Engineering",
        body: [
          "Geotechnical analysis supports the heavy foundations and pavement sections aviation projects demand. We provide subgrade characterization, bearing capacity, settlement estimates for large column loads, and pavement subgrade recommendations, along with seismic site class and any ground-improvement measures needed for weak soils.",
        ],
        highlights: [
          "Subsurface investigation for foundations and pavement subgrade",
          "Bearing capacity and settlement for heavy column loads",
          "Pavement subgrade support and improvement recommendations",
          "Seismic site classification per ASCE 7",
          "Groundwater and drainage subgrade considerations",
        ],
      },
    ],
    facilityTypes: [
      "Aircraft maintenance and MRO hangars",
      "T-hangars and box hangars for general aviation",
      "Corporate and business jet hangars",
      "Military and defense hangars",
      "Fixed-base operator (FBO) facilities",
      "Fuel farms and aircraft fueling infrastructure",
      "Aprons, taxilanes, and ramp pavement",
      "Airport support and ground equipment buildings",
    ],
    projectTypes: [
      "New hangar and aviation facility construction",
      "Hangar expansion and additional bays",
      "Fire suppression and MEP renovation",
      "Apron and pavement rehabilitation",
      "Adaptive reuse of existing hangar structures",
    ],
    deliverables: [
      "Permit-ready sealed structural drawings",
      "Long-span framing and crane load calculations",
      "NFPA 409 fire suppression design and hydraulic calculations",
      "Electrical one-line diagrams and hazardous-area classification drawings",
      "Apron drainage and containment plans",
      "Pavement design reports and specifications",
      "RFI responses and construction administration support",
    ],
    compliance: [
      {
        code: "NFPA 409",
        desc: "The standard on aircraft hangars that establishes fire-protection groups and dictates the foam or deluge suppression system we design.",
      },
      {
        code: "NFPA 407",
        desc: "Governs aircraft fuel servicing and defines hazardous-area classifications, bonding, and grounding we apply to fueling operations.",
      },
      {
        code: "IBC / ASCE 7",
        desc: "Establishes occupancy, structural loads, and wind and seismic criteria applied to hangar framing and large door systems.",
      },
      {
        code: "AISC 360",
        desc: "The specification for structural steel buildings we follow for long-span trusses, girders, connections, and crane runway design.",
      },
      {
        code: "NEC Article 500",
        desc: "Governs classified hazardous locations, requiring explosion-proof or intrinsically safe methods within fuel-handling zones.",
      },
      {
        code: "FAA Advisory Circulars",
        desc: "FAA design standards for airfield pavement, geometry, and airspace clearances that govern apron and taxilane design.",
      },
    ],
    cta: "Share your hangar or aviation facility program and drawings, and we will prepare a coordinated structural, MEP, and civil scope and fee proposal.",
  },
  {
    slug: "fitness-recreation-engineering",
    name: "Fitness & Recreation",
    cluster: 6,
    title: "Fitness & Recreation Center Engineering | HVAC Dehumidification",
    meta: "Engineering solutions for multi-sport athletic assets. Long-span structural systems, high-volume natatorium ventilation, and vibration-attenuated floors.",
    h1: "Community Recreation Centers & High-Output Fitness Club Engineering",
    h2: "Highly Ventilated Facilities Configured for Heavy Human Activity",
    cardBlurb:
      "Recreation and fitness facilities engineered for heavy activity — clear-span gymnasiums, natatorium dehumidification, and vibration-controlled weight-room floors.",
    intro: [
      "Fitness and recreation facilities combine large open volumes, high occupant density, and unusual mechanical loads that ordinary commercial buildings never face. Gymnasiums and fieldhouses demand long clear spans with tight deflection control for hung equipment and scoreboards, while natatoriums generate warm, chlorinated, humid air that will corrode a poorly designed envelope and mechanical system. Weight and free-weight zones impose dynamic impact loads that transmit vibration through the structure. Each of these programs carries distinct engineering criteria under one roof.",
      "Delivering these buildings well requires structural, mechanical, plumbing, and electrical engineering that is coordinated from concept. We size long-span roof systems, design dedicated natatorium dehumidification and code-compliant ventilation, isolate impact-loaded slabs, and provide the power and lighting a high-activity facility needs. Our integrated approach resolves the envelope, corrosion, acoustic, and load interactions that determine whether a recreation center performs comfortably and durably for its community.",
    ],
    specialties: [
      {
        heading: "Clear-Span Structural Systems for Gymnasiums, Fieldhouses & Arenas",
        body: "Large athletic spaces require column-free roofs spanning gymnasiums, courts, and fieldhouses, which we design using steel joists, trusses, or long-span girders to AISC 360 and IBC/ASCE 7. Roof framing must accommodate suspended loads — basketball backstops, scoreboards, gymnastics rigging, and catwalks — so we analyze concentrated point loads, deflection limits tighter than typical roofs, and vibration serviceability. Snow drift, wind uplift on large low-slope roofs, and seismic bracing of the roof diaphragm and tall walls are addressed explicitly. We coordinate lateral systems around wide door and window openings and detail connections and bracing that keep the frame stable while preserving the open volume architects and athletic programming require.",
      },
      {
        heading: "Advanced Indoor Air Quality Controls & Natatorium Pool Dehumidification",
        body: "Natatoriums are among the most demanding HVAC environments in any building. We design dedicated dehumidification systems that maintain space humidity and temperature, control condensation on the envelope, and exhaust chloramines to protect occupant respiratory health, following ASHRAE guidance for natatorium design and the applicable mechanical code ventilation rates. Designs address envelope vapor barriers, positive or negative space pressurization, pool-water heating, and corrosion-resistant materials for ductwork and coils. For fitness floors and gymnasiums we design ventilation to ASHRAE 62.1 for the elevated occupant density and CO2 loads, using demand-controlled ventilation, energy recovery, and high-volume air distribution to maintain comfort during peak activity while controlling operating cost.",
      },
      {
        heading: "Vibration-Absorbing Concrete Slab & Floor Systems for Heavy Weight Zones",
        body: "Free-weight and functional-training areas generate repeated impact loads when heavy weights are dropped, transmitting objectionable vibration and noise to adjacent occupancies. We design floor systems that attenuate these dynamic loads, evaluating the structure against vibration serviceability criteria and detailing isolation strategies such as floating slabs, resilient underlayments, and mass-tuned assemblies. On elevated floors we assess natural frequency and response to impact and rhythmic loading, since group-exercise and aerobics activity can excite structural resonance. Slab thickness, reinforcement, and joint layout are coordinated with the isolation approach, and we align the structural and acoustic designs so weight zones, studios, and quiet spaces coexist without disruptive vibration or flanking sound transmission.",
      },
    ],
    disciplines: [
      {
        name: "Structural Engineering",
        href: "/services/structural",
        body: [
          "Structural engineering provides the clear-span roofs, suspended-load framing, and vibration-controlled floors these facilities demand. We design to AISC 360, ACI 318, IBC, and ASCE 7, addressing tight deflection limits, snow drift, uplift on large roofs, and the dynamic impact loads generated in weight and activity zones.",
        ],
        highlights: [
          "Long-span steel roof systems for gyms and fieldhouses",
          "Suspended load design for backstops, rigging, and catwalks",
          "Vibration serviceability analysis for floors and elevated slabs",
          "Isolated slab and floating-floor detailing for weight zones",
          "Lateral system design for tall walls and large openings",
        ],
      },
      {
        name: "MEP Engineering",
        href: "/services/mep",
        body: [
          "MEP scope centers on high-volume ventilation, natatorium dehumidification, pool heating, plumbing, and power for high-activity spaces. We design to ASHRAE 62.1 and applicable mechanical codes, integrate energy recovery and demand-controlled ventilation, and specify corrosion-resistant equipment for humid pool environments.",
        ],
        highlights: [
          "Dedicated natatorium dehumidification and chloramine exhaust",
          "High-density ventilation and energy recovery to ASHRAE 62.1",
          "Pool water heating, filtration, and mechanical coordination",
          "Plumbing for locker rooms, showers, and pool systems",
          "Power distribution and sports/LED lighting design",
        ],
      },
      {
        name: "Civil Engineering",
        href: "/services/civil",
        body: [
          "Civil engineering supports site development for recreation campuses, including parking for peak event demand, athletic field grading, stormwater management, and accessible routes. We coordinate utility service, drainage of outdoor courts and pools, and pedestrian and vehicular circulation.",
        ],
        highlights: [
          "Site grading and athletic field drainage design",
          "Parking layout sized for peak event and program demand",
          "Stormwater management and detention to local standards",
          "Utility connections and service coordination",
          "ADA accessible routes and site accessibility",
        ],
      },
      {
        name: "Geotechnical Engineering",
        body: [
          "Geotechnical input guides foundations for large athletic buildings and pool structures. We provide bearing capacity, settlement analysis, and slab-on-grade subgrade recommendations, and address groundwater and uplift considerations that affect below-grade pool basins and foundation performance.",
        ],
        highlights: [
          "Subsurface investigation and foundation recommendations",
          "Bearing capacity and settlement for large-column loads",
          "Slab-on-grade and subgrade preparation guidance",
          "Groundwater and uplift analysis for pool structures",
          "Seismic site classification per ASCE 7",
        ],
      },
    ],
    facilityTypes: [
      "Community recreation and wellness centers",
      "Commercial fitness clubs and gyms",
      "Gymnasiums and multi-court fieldhouses",
      "Natatoriums and indoor aquatic centers",
      "Ice rinks and indoor arenas",
      "University and campus athletic facilities",
      "Indoor tennis, pickleball, and racquet clubs",
      "Group-exercise and functional-training studios",
    ],
    projectTypes: [
      "New recreation and fitness facility construction",
      "Gymnasium or aquatic center addition",
      "Fitness club tenant improvement and fit-out",
      "Natatorium HVAC and dehumidification renovation",
      "Adaptive reuse of retail or industrial space",
    ],
    deliverables: [
      "Permit-ready sealed structural drawings",
      "Long-span roof and suspended-load calculations",
      "Vibration and floor-serviceability analysis",
      "Natatorium dehumidification and HVAC design drawings",
      "Plumbing and pool mechanical drawings",
      "Electrical one-line diagrams and lighting plans",
      "Specifications and RFI/construction administration support",
    ],
    compliance: [
      {
        code: "IBC / ASCE 7",
        desc: "Establishes assembly occupancy classification, structural loads, and wind and seismic criteria for large recreation buildings.",
      },
      {
        code: "AISC 360",
        desc: "The steel specification we follow for long-span roof trusses, joists, and connections supporting suspended athletic equipment.",
      },
      {
        code: "ASHRAE 62.1",
        desc: "Sets minimum ventilation rates for the high occupant density of fitness and assembly spaces we design to for indoor air quality.",
      },
      {
        code: "ASHRAE Natatorium Guidance",
        desc: "ASHRAE Applications guidance for natatorium design governing humidity control, air distribution, and corrosion mitigation.",
      },
      {
        code: "IMC / IPC",
        desc: "The International Mechanical and Plumbing Codes govern ventilation, exhaust, and plumbing for locker, shower, and pool areas.",
      },
      {
        code: "IECC / ASHRAE 90.1",
        desc: "Energy code and standard that drive envelope, HVAC efficiency, and energy-recovery requirements for these high-load facilities.",
      },
    ],
    cta: "Send us your recreation or fitness facility program and drawings, and we will return a coordinated structural, MEP, and civil scope and fee proposal.",
  },
  {
    slug: "brewery-beverage-facility-engineering",
    name: "Breweries & Beverage",
    cluster: 6,
    title: "Brewery & Beverage Facility Engineering | Process Piping Design",
    meta: "Specialized engineering for craft breweries and beverage plants. Heavy tank foundation loading, process utilities, and gas tracking.",
    h1: "Craft Brewery, Distillery & Production Beverage Engineering",
    h2: "Heavy Process Utility Networks Coordinated with Hospitality Conversions",
    cardBlurb:
      "Breweries and beverage plants engineered for heavy tank loads and process utilities — structural slabs, sanitary process piping, and CO2 safety monitoring.",
    intro: [
      "Breweries, distilleries, and beverage production plants merge heavy industrial process loads with, increasingly, public taproom and hospitality space in the same building. Fermentation and brite tanks impose large concentrated loads on slabs and foundations, process piping must meet food-grade sanitary standards, and the fermentation process itself releases carbon dioxide that poses a real asphyxiation hazard without proper monitoring and exhaust. These facilities also carry demanding utility loads for steam, glycol cooling, compressed air, and high-volume water and drainage.",
      "Engineering a beverage facility well means coordinating structural, mechanical, plumbing, process, and electrical systems that are far more industrial than the hospitality finishes suggest. As an integrated firm, we design tank foundations, sanitary process piping and drainage, CO2 and refrigerant safety systems, and the utility infrastructure together, while accommodating taproom assembly occupancy and its life-safety requirements. The result is a permit-ready package that satisfies both the process demands and the public-facing side of a modern production brewery.",
    ],
    specialties: [
      {
        heading: "Heavy Structural Foundation Slabs for Massive Fermentation Vessel Loadings",
        body: "Full fermentation and brite tanks concentrate very large loads on small footprints, so we design slabs-on-grade and foundations to ACI 318 for both the static weight of liquid-filled vessels and the dynamic effects of agitation and seismic sloshing. Analysis covers punching shear and bearing at tank pads, slab thickness and reinforcement for concentrated loads, and differential settlement that could misalign piping. We coordinate housekeeping pads, equipment anchorage and seismic restraint per ASCE 7, and floor slopes required for sanitary drainage. Where tanks bear on elevated floors or mezzanines we evaluate deflection and vibration, and we detail flatness and levelness tolerances so tall vessels remain plumb and stable.",
      },
      {
        heading: "Food-Grade Stainless Process Piping, Clean-in-Place (CIP), and Drain Layouts",
        body: "Beverage process piping must be sanitary, cleanable, and durable, so we design stainless steel product lines with sanitary fittings, appropriate slopes for drainability, and clean-in-place circuits that recirculate caustic and acid solutions through vessels and lines. We lay out utility piping for glycol cooling, steam and condensate, compressed air, and CO2, and coordinate high-volume trench and floor drains sized for wash-down and CIP discharge under the International Plumbing Code. Backflow prevention, indirect waste, and pretreatment for high-strength brewery effluent are addressed for local sewer requirements. Materials, insulation, and support spacing are specified to keep the process infrastructure hygienic, code-compliant, and maintainable.",
      },
      {
        heading: "Ambient Carbon Dioxide Safety Monitoring & Specialized Mechanical Exhausts",
        body: "Fermentation and packaging release carbon dioxide, and bulk CO2 and nitrogen storage add an asphyxiation risk that must be engineered out. We design continuous CO2 monitoring with sensors placed at breathing and low-lying zones, alarm thresholds aligned with recognized occupational exposure limits, and interlocked mechanical exhaust that activates on elevated readings. Cellar and packaging ventilation is sized to dilute and remove accumulated gas, and we address make-up air, refrigerant leak detection for glycol chiller and ammonia systems per ASHRAE 15 and IMC requirements, and confined-space considerations. Electrical classification and equipment selection are coordinated where flammable atmospheres exist, such as certain distillation spaces, so the ventilation and safety systems form a coherent, code-compliant whole.",
      },
    ],
    disciplines: [
      {
        name: "Structural Engineering",
        href: "/services/structural",
        body: [
          "Structural engineering handles heavy tank foundations, slabs designed for concentrated vessel loads, mezzanines, and equipment anchorage. We design to ACI 318, AISC 360, IBC, and ASCE 7, addressing seismic restraint of tall vessels, punching shear at tank pads, and floor slopes and tolerances for sanitary operation.",
        ],
        highlights: [
          "Slab-on-grade and foundation design for full fermentation tanks",
          "Seismic anchorage and restraint of tanks and equipment per ASCE 7",
          "Mezzanine and platform framing for process and packaging",
          "Punching shear and bearing analysis at concentrated loads",
          "Floor slope, flatness, and tolerance coordination for drainage",
        ],
      },
      {
        name: "MEP Engineering",
        href: "/services/mep",
        body: [
          "MEP scope covers process utilities, sanitary and utility piping, CO2 and refrigerant safety, ventilation, and power for high-load equipment. We design glycol, steam, and compressed-air systems, CIP-capable plumbing and drainage, and gas-detection interlocked exhaust, while serving taproom HVAC and assembly life-safety needs.",
        ],
        highlights: [
          "Glycol cooling, steam, and compressed-air utility design",
          "Sanitary stainless process piping and CIP circuits",
          "CO2 monitoring with interlocked mechanical exhaust",
          "Refrigerant leak detection per ASHRAE 15 / IMC",
          "Power distribution and taproom HVAC coordination",
        ],
      },
      {
        name: "Civil Engineering",
        href: "/services/civil",
        body: [
          "Civil engineering supports site development, high-volume water service, and high-strength wastewater management. We coordinate sanitary pretreatment for brewery effluent, stormwater management, truck access and loading for grain and packaging, and parking for taproom occupancy.",
        ],
        highlights: [
          "Water service sizing for high process demand",
          "Sanitary sewer and pretreatment for high-strength effluent",
          "Stormwater management and detention design",
          "Truck access, loading dock, and circulation layout",
          "Parking and ADA accessible routes for taproom use",
        ],
      },
      {
        name: "Geotechnical Engineering",
        body: [
          "Geotechnical input governs foundation and slab design under heavy, concentrated tank loads. We provide bearing capacity, settlement analysis, and subgrade improvement recommendations to control differential settlement that could stress process piping or tilt tall vessels.",
        ],
        highlights: [
          "Subsurface investigation and foundation recommendations",
          "Bearing capacity and settlement under concentrated tank loads",
          "Subgrade preparation and ground-improvement guidance",
          "Differential settlement control for process alignment",
          "Seismic site classification per ASCE 7",
        ],
      },
    ],
    facilityTypes: [
      "Craft breweries and brewpubs",
      "Distilleries and spirits production",
      "Wineries and cideries",
      "Non-alcoholic beverage production plants",
      "Packaging, canning, and bottling lines",
      "Taprooms and hospitality/assembly spaces",
      "Cold rooms and refrigerated cellars",
      "Warehousing and distribution areas",
    ],
    projectTypes: [
      "New production facility construction",
      "Adaptive reuse of industrial or retail buildings",
      "Production expansion and added tank capacity",
      "Taproom tenant improvement and fit-out",
      "Process utility and drainage upgrade",
    ],
    deliverables: [
      "Permit-ready sealed structural drawings",
      "Tank foundation and slab load calculations",
      "Process and utility piping design drawings",
      "Plumbing and sanitary drainage plans",
      "CO2 monitoring and mechanical exhaust design",
      "Electrical one-line diagrams and power distribution plans",
      "Specifications and RFI/construction administration support",
    ],
    compliance: [
      {
        code: "IBC / ASCE 7",
        desc: "Governs mixed-occupancy classification, structural loads, and seismic anchorage criteria for process equipment and tanks.",
      },
      {
        code: "ACI 318",
        desc: "The concrete code we apply to slabs and foundations carrying concentrated fermentation and brite-tank loads.",
      },
      {
        code: "IPC",
        desc: "The International Plumbing Code governing sanitary drainage, indirect waste, backflow prevention, and process wash-down layouts.",
      },
      {
        code: "IMC",
        desc: "The International Mechanical Code governing ventilation, exhaust, and refrigerant machinery-room requirements for cellars and process areas.",
      },
      {
        code: "ASHRAE 15",
        desc: "The safety standard for refrigeration systems governing leak detection and ventilation for glycol chiller and ammonia equipment.",
      },
      {
        code: "NFPA 55",
        desc: "Governs the storage, use, and handling of compressed gases such as bulk CO2 and nitrogen, informing our safety and exhaust design.",
      },
    ],
    cta: "Upload your brewery or beverage facility program and equipment layout, and we will prepare a coordinated multi-discipline scope and fee proposal.",
  },
  {
    slug: "religious-worship-facility-engineering",
    name: "Religious & Worship Facilities",
    cluster: 6,
    title: "Church & Worship Facility Engineering | Long-Span Structural Design",
    meta: "Comprehensive engineering for faith-based structures. Long-span columns-free sanctuaries, low-decibel HVAC acoustics, and high-occupancy parking design.",
    h1: "Churches, Temples & Assembly Occupancy Worship Facility Engineering",
    h2: "Inspiring, Long-Span Architectural Spaces Paired with Ultra-Quiet Systems",
    cardBlurb:
      "Worship facilities engineered for inspiring, column-free sanctuaries — long-span structure, whisper-quiet HVAC, and event-day parking and site design.",
    intro: [
      "Worship facilities pair architecturally expressive, column-free sanctuaries with the practical demands of high-occupancy assembly buildings. Congregations expect soaring, unobstructed spaces that require long-span structural systems and careful lateral design, yet those same spaces must be acoustically pristine so that spoken word, music, and audio recording are not marred by mechanical noise. Overlay large peak-attendance parking and site loads that occur in concentrated bursts, and the engineering challenge becomes as much about coordination and acoustics as it is about spanning distance.",
      "As an integrated firm, we align structural, mechanical, electrical, plumbing, and civil design around the worship experience and the assembly life-safety code. We engineer column-free framing for the sanctuary, ultra-quiet HVAC tuned to strict noise criteria, redundant egress and life-safety systems for large occupant loads, and site infrastructure that handles event-day surges. Coordinating these disciplines from the start keeps the sanctuary quiet, safe, comfortable, and buildable without compromising the architectural vision.",
    ],
    specialties: [
      {
        heading: "Long-Span, Column-Free Structural Engineering for Assembly Sanctuaries",
        body: "Sanctuaries and worship halls demand wide, column-free volumes that we achieve with long-span steel trusses, glulam timber, or engineered girder systems designed to AISC 360, the NDS for wood, IBC, and ASCE 7. As assembly occupancies, these spaces carry higher live loads and require robust lateral systems for wind and seismic, which we detail around tall walls, clerestory glazing, and balcony structures. We control deflection for suspended loads such as lighting, projection, and acoustic clouds, and analyze roof diaphragms and bracing that preserve the open architecture. Balcony and mezzanine framing, exposed structural aesthetics, and connection detailing are coordinated so the structure both performs and complements the sanctuary design.",
      },
      {
        heading: "Acoustic-Isolated Low-Decibel HVAC Systems Configured for Audio Recording",
        body: "Worship spaces are among the most acoustically sensitive rooms we engineer because mechanical noise directly competes with speech, music, and broadcast recording. We design HVAC to meet stringent noise criteria (NC/RC) in the sanctuary by selecting low-velocity air distribution, oversized ductwork, lined plenums and sound attenuators, and vibration isolation of fans and equipment. Air-handling units are located remotely and mechanical rooms acoustically treated to prevent noise breakout and structure-borne transmission. Ventilation still meets ASHRAE 62.1 for the high assembly occupant density, using large low-velocity displacement or overhead distribution that avoids drafts and noise. We coordinate duct routing and isolation with the structural and architectural acoustics so quiet performance is achieved without visible mechanical intrusion.",
      },
      {
        heading: "Civil Engineering Site Work, Retention Basins, and Event-Day Parking Distribution",
        body: "Worship campuses experience concentrated peak demand during services and events, driving parking and traffic loads that far exceed typical daily use. We design site circulation, parking counts, and drop-off geometry for these surges, coordinating queuing, accessible parking per ADA, and safe pedestrian routes from lots to entrances. Large impervious parking areas require stormwater management, so we design detention and retention basins, water-quality treatment, and conveyance to meet local jurisdiction and NPDES requirements. Grading, utility service sizing for occupant loads and any commercial kitchen, and fire-apparatus access are coordinated with the building design, producing a site that handles event-day volume safely while satisfying stormwater and accessibility regulations.",
      },
    ],
    disciplines: [
      {
        name: "Structural Engineering",
        href: "/services/structural",
        body: [
          "Structural engineering delivers the long-span, column-free sanctuary framing, balconies, and towers worship facilities require. We design in steel, wood, or concrete to AISC 360, the NDS, ACI 318, IBC, and ASCE 7, addressing assembly live loads, suspended systems, tall-wall lateral bracing, and exposed structural aesthetics.",
        ],
        highlights: [
          "Long-span column-free sanctuary roof framing",
          "Balcony, mezzanine, and tower/steeple structural design",
          "Assembly live loads and lateral systems per ASCE 7",
          "Deflection control for suspended lighting and AV systems",
          "Exposed steel or glulam detailing for architectural intent",
        ],
      },
      {
        name: "MEP Engineering",
        href: "/services/mep",
        body: [
          "MEP scope centers on ultra-quiet HVAC for acoustically sensitive worship spaces, high-density assembly ventilation, AV power and lighting, and life-safety systems. We design to ASHRAE 62.1 and applicable codes, using vibration isolation, sound attenuation, and low-velocity distribution to meet strict noise criteria.",
        ],
        highlights: [
          "Low-noise HVAC meeting sanctuary NC/RC criteria",
          "Assembly ventilation to ASHRAE 62.1 for high occupancy",
          "Vibration isolation and acoustic treatment of equipment",
          "AV, dimming, and architectural lighting power design",
          "Fire alarm, emergency lighting, and life-safety systems",
        ],
      },
      {
        name: "Civil Engineering",
        href: "/services/civil",
        body: [
          "Civil engineering addresses event-day parking, site circulation, stormwater management, and utility service. We size parking and drop-off for peak attendance, design detention and retention for large impervious areas, and coordinate fire access and accessible routes throughout the campus.",
        ],
        highlights: [
          "Peak-attendance parking and drop-off/queuing design",
          "Stormwater detention, retention, and water-quality treatment",
          "Site grading and accessible pedestrian circulation",
          "Fire-apparatus access and utility service coordination",
          "ADA accessible parking and route compliance",
        ],
      },
      {
        name: "Geotechnical Engineering",
        body: [
          "Geotechnical input supports foundations for large sanctuaries, towers, and slab-on-grade assembly floors. We provide bearing capacity, settlement analysis, and subgrade recommendations, and address seismic site class and any special foundation needs for tall steeples or expansive soils.",
        ],
        highlights: [
          "Subsurface investigation and foundation recommendations",
          "Bearing capacity and settlement for sanctuary and tower loads",
          "Slab-on-grade subgrade preparation guidance",
          "Seismic site classification per ASCE 7",
          "Expansive-soil and groundwater considerations",
        ],
      },
    ],
    facilityTypes: [
      "Churches and sanctuaries",
      "Temples, mosques, and synagogues",
      "Multipurpose worship and event centers",
      "Fellowship halls and gathering spaces",
      "Religious education and classroom wings",
      "Chapels and prayer halls",
      "Steeples, towers, and bell structures",
      "Campus administration and support buildings",
    ],
    projectTypes: [
      "New worship facility construction",
      "Sanctuary or education-wing expansion",
      "Renovation and acoustic/HVAC upgrade",
      "Adaptive reuse of commercial buildings for worship",
      "Tenant improvement for leased worship space",
    ],
    deliverables: [
      "Permit-ready sealed structural drawings",
      "Long-span framing and suspended-load calculations",
      "Low-noise HVAC design and acoustic coordination drawings",
      "Electrical one-line diagrams and AV/lighting plans",
      "Civil site, grading, and stormwater plans",
      "Parking and circulation layouts",
      "Specifications and RFI/construction administration support",
    ],
    compliance: [
      {
        code: "IBC / ASCE 7",
        desc: "Governs assembly occupancy classification, egress, structural loads, and wind and seismic criteria for worship buildings.",
      },
      {
        code: "AISC 360 / NDS",
        desc: "The steel specification and National Design Specification for wood we apply to long-span sanctuary framing systems.",
      },
      {
        code: "ASHRAE 62.1",
        desc: "Sets ventilation rates for the high occupant density of assembly worship spaces to maintain indoor air quality.",
      },
      {
        code: "NFPA 101",
        desc: "The Life Safety Code informing egress capacity, travel distance, and occupant-load provisions for large assembly occupancies.",
      },
      {
        code: "IECC / ASHRAE 90.1",
        desc: "Energy code and standard governing envelope and HVAC efficiency for intermittently occupied worship facilities.",
      },
      {
        code: "ADA / ICC A117.1",
        desc: "Accessibility standards governing accessible seating, routes, restrooms, and parking throughout the worship campus.",
      },
    ],
    cta: "Share your worship facility program and drawings, and our team will return a coordinated structural, MEP, and civil scope and fee proposal.",
  },
];
