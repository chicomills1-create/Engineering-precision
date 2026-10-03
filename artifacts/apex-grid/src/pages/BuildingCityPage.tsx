import { useParams } from "wouter";
import { useMemo } from "react";

/**
 * Dynamic building type × city page: /buildings/:building/:city/:state/
 *
 * Serves all building type × city combinations dynamically.
 * Example: /buildings/hospital/austin/texas/
 *
 * 28 building types × 19,355 cities = 541,940 URLs
 */

interface BuildingInfo {
  name: string;
  title: string;
  description: string;
  edge: string;
  services: string[];
}

const BUILDINGS: Record<string, BuildingInfo> = {
  "data-center-building": {
    name: "Data Center Building",
    title: "Data Center Building Engineering",
    description:
      "Structural and base-building MEP engineering for data center shells and core-and-shell delivery. Long-span structural framing for column-free white space, roof loading for cooling equipment, and slab design for heavy electrical gear. Base-building power and cooling infrastructure sized for phased tenant fit-out, shell permitting packages, and landlord/tenant demarcation engineering — stamped for 49-state construction.",
    edge:
      "The building is the easy part; the building that accepts any tenant's fit-out is the hard part. We engineer data center shells with oversized structure, spare electrical capacity, and flexible cooling connections so your asset leases to anyone.",
    services: [
      "Structural: long-span framing, roof equipment loads, and slab design for switchgear and UPS",
      "Base-building electrical: service entrance, main-tie-main switchgear, and tenant distribution",
      "Shell HVAC: ventilation, pressurization, and cooling connections for future white-space buildout",
      "Fire protection: shell sprinkler, fire alarm backbone, and smoke control for high-bay spaces",
      "Site and civil: grading, stormwater, generator yards, and fuel storage coordination",
    ],
  },
  "hospital": {
    name: "Hospital",
    title: "Hospital Engineering",
    description:
      "MEP and structural engineering for acute-care hospitals — new towers, bed expansions, and occupied renovations. OSHPD/HCAI-style seismic and plan-review rigor applied in every state, medical gas systems (oxygen, medical air, vacuum, WAGD), emergency power per NEC Articles 700/701/702, and infection-control HVAC with airborne isolation rooms. OR and imaging suite engineering, nurse-call and code-blue infrastructure, all stamped by licensed PEs in 49 states.",
    edge:
      "Hospitals never close, so we engineer like it. Our phased renovation packages keep ORs, EDs, and ICUs fully operational while construction happens overhead — with ICRA barriers and interim life-safety measures built into every drawing set.",
    services: [
      "Medical gas: oxygen, medical air, vacuum, nitrous, and WAGD distribution with zone valves and alarms",
      "Emergency power: generator plants, automatic transfer, and branch circuiting per NEC 700/701",
      "HVAC: OR laminar flow, isolation rooms, pharmacy compounding, and airborne infection control",
      "Structural: seismic design, equipment anchorage, and vibration control for sensitive imaging",
      "Life safety: fire alarm, voice evacuation, smoke control, and defend-in-place egress strategies",
    ],
  },
  "healthcare-facility": {
    name: "Healthcare Facility",
    title: "Healthcare Facility Engineering",
    description:
      "Engineering for outpatient healthcare — medical office buildings, ambulatory surgery centers, imaging centers, and specialty clinics. Procedure-room HVAC, medical gas for surgery suites, lead-lined and RF-shielded imaging rooms, and exam-room MEP designed for patient throughput. ADA and FGI Guidelines compliance, dental and veterinary variants, and fast-turn tenant improvements — PE-stamped in all 49 states.",
    edge:
      "Outpatient margins depend on throughput and uptime. We design clinic MEP for fast room turnover, quiet operation, and minimal maintenance disruption — the infrastructure behind a schedule that actually runs on time.",
    services: [
      "Surgery and procedure suites: HVAC, medical gas, and electrical for ASCs and procedure rooms",
      "Imaging: MRI RF shielding coordination, CT/X-ray lead lining, and chilled water for equipment",
      "Exam and treatment: plumbing, HVAC, and power layouts optimized for patient flow",
      "Dental and specialty: compressed air, vacuum, and water systems for dental operatories",
      "Tenant improvement: fast-track clinic buildouts with minimal disruption to operating practices",
    ],
  },
  "university-building": {
    name: "University Building",
    title: "University Building Engineering",
    description:
      "Engineering for higher-education facilities — classroom buildings, teaching labs, residence halls, and student life centers. Lecture-hall acoustics and AV-integrated MEP, residence-hall plumbing and fire protection, research-lab ventilation, and central-plant connections. Phased construction around academic calendars, ADA and Title IX facility compliance, and capital-project engineering that survives value-engineering — stamped in 49 states.",
    edge:
      "Universities build on academic calendars, not construction calendars. We sequence design and permitting around semester breaks and summer windows, so buildings open when students arrive — not a semester late.",
    services: [
      "Classroom and lecture: HVAC for high occupant density, acoustics, and AV power/data integration",
      "Residence halls: dwelling-unit plumbing, fire protection, laundry, and common-area MEP",
      "Teaching labs: fume hoods, lab gases, and flexible bench utilities for STEM programs",
      "Central utilities: chilled water, steam, and electrical connections to campus plants",
      "Phased delivery: occupied-renovation sequencing, swing space, and summer-window construction",
    ],
  },
  "industrial-facility": {
    name: "Industrial Facility",
    title: "Industrial Facility Engineering",
    description:
      "Engineering for heavy industrial facilities — process plants, fabrication shops, and heavy manufacturing. Crane-served high-bay structures, heavy floor slabs for process equipment, and dust collection and process ventilation. Hazardous-materials storage and handling, explosion-protected electrical areas, compressed air and process utilities, and rail/truck dock infrastructure — stamped for industrial AHJs in 49 states.",
    edge:
      "Industrial buildings take abuse that would destroy a commercial structure. We design for the real loads — impact, vibration, chemical exposure, and 24/7 thermal cycling — so the facility outlasts the process it houses.",
    services: [
      "Heavy structures: crane girders, braced frames, equipment mezzanines, and machinery foundations",
      "Process utilities: compressed air, process water, steam, natural gas, and dust collection",
      "Hazardous areas: classified electrical, ventilation, spill containment, and fire protection",
      "High-bay MEP: heating, ventilation, high-bay lighting, and make-up air for process exhaust",
      "Site: truck courts, rail spurs, heavy-duty paving, and industrial stormwater",
    ],
  },
  "manufacturing-facility": {
    name: "Manufacturing Facility",
    title: "Manufacturing Facility Engineering",
    description:
      "Engineering for light and mid-size manufacturing — production lines, assembly plants, food processing, and packaging operations. Production-floor MEP with process power, compressed air loops, and process cooling. Food-grade washdown areas, USDA/FDA-adjacent design, clean packaging rooms, and office/warehouse integration. Flexible utility distribution for line reconfiguration — PE-stamped in all 49 states.",
    edge:
      "Production lines change; the building shouldn't have to. We distribute power, air, and process utilities on modular grids with spare capacity, so retooling a line is a weekend project, not a capital project.",
    services: [
      "Production MEP: process power, compressed air, process cooling, and exhaust for lines",
      "Food processing: washdown-rated electrical, floor drains, and sanitary design details",
      "Clean packaging: controlled environments, dust control, and product-protection HVAC",
      "Office and support: break rooms, QA labs, and shipping/receiving integrated with production",
      "Reconfigurable utilities: overhead busway, quick-connect air drops, and spare panel capacity",
    ],
  },
  "warehouse": {
    name: "Warehouse",
    title: "Warehouse and Distribution Engineering",
    description:
      "Engineering for warehouses and distribution centers — from last-mile infill to million-square-foot logistics hubs. ESFR sprinkler design, high-bay LED lighting with controls, and dock-door MEP including levelers and seals. Racking structural coordination, superflat floor slabs, cross-dock material handling power, and office-to-warehouse ratios tuned for labor — stamped in 49 states.",
    edge:
      "Distribution buildings are machines for moving boxes, and the engineering has to keep up with the automation. We coordinate structure, sprinklers, and power around your racking and conveyor layouts from day one — not as an afterthought.",
    services: [
      "Fire protection: ESFR sprinklers, fire pump design, and rack-storage commodity classification",
      "High-bay systems: LED lighting with daylight and occupancy controls, and destratification fans",
      "Dock infrastructure: door equipment power, dock seals, levelers, and trailer restraint circuits",
      "Structural: racking coordination, slab design for rack loads, and tilt-up panel engineering",
      "Office and amenity: break rooms, restrooms, and office HVAC integrated with the warehouse",
    ],
  },
  "multifamily-building": {
    name: "Multifamily Building",
    title: "Multifamily Building Engineering",
    description:
      "Engineering for multifamily residential — condominiums, townhomes, and mixed-use podium developments. Dwelling-unit MEP with individual metering, acoustic separation between units, and fire-rated assemblies. Podium structural design, parking-garage ventilation, amenity-space engineering, and envelope coordination for durability. For-sale product expertise including HOA turnover documentation — stamped in 49 states.",
    edge:
      "For-sale multifamily gets scrutinized by HOAs, attorneys, and warranty inspectors for years after turnover. We engineer with defensible details — proper waterproofing, acoustic assemblies, and documented systems — that hold up long after the last unit sells.",
    services: [
      "Dwelling units: plumbing, HVAC, electrical, and individual metering for condos and townhomes",
      "Podium and parking: post-tensioned podiums, garage ventilation, and waterproofing details",
      "Acoustics and fire: STC-rated assemblies, fire separation, and sprinkler design",
      "Amenities: clubhouses, pools, fitness, and outdoor MEP for resident spaces",
      "Mixed-use: retail base building with residential above, including separate metering and egress",
    ],
  },
  "apartment-building": {
    name: "Apartment Building",
    title: "Apartment Building Engineering",
    description:
      "Engineering for rental apartment communities — garden-style, mid-rise, and wrap developments. Unit MEP standardized for repeatability, central vs. individual HVAC strategies, and domestic hot water systems sized for morning peaks. Leasing-office and amenity engineering, site lighting and security power, and value-engineered systems that protect NOI — PE-stamped across 49 states.",
    edge:
      "Rental developers live on cost per unit and speed to lease-up. We standardize unit MEP into repeatable packages that cut design time, simplify bidding, and keep the per-door budget exactly where your pro forma needs it.",
    services: [
      "Unit systems: standardized HVAC, plumbing, and electrical packages for repeatable construction",
      "Hot water: central plant vs. individual heaters, recirculation, and peak-demand sizing",
      "Garden and mid-rise: breezeway, wrap, and podium configurations with efficient MEP routing",
      "Amenities and leasing: clubhouse, pool equipment, fitness, and model-unit engineering",
      "Site: lighting photometrics, security power, irrigation, and EV-ready parking",
    ],
  },
  "hotel-building": {
    name: "Hotel Building",
    title: "Hotel Building Engineering",
    description:
      "Engineering for hotels and hospitality — select-service, full-service, and resorts. Guestroom MEP with VRF or PTAC systems, stacked plumbing risers, and acoustic separation. Fire alarm with voice evacuation, commercial kitchen and laundry MEP, pool and spa systems, and brand-standard compliance for major flags. Fast-track delivery for PIP renovations and new builds — stamped in 49 states.",
    edge:
      "Hotel brands reject drawings that miss their standards, and every rejection costs weeks. We design to Marriott, Hilton, Hyatt, and IHG brand requirements from the first submittal — so approvals come back clean.",
    services: [
      "Guestrooms: VRF/PTAC HVAC, stacked risers, low-flow plumbing, and acoustic assemblies",
      "Life safety: fire alarm, voice evacuation, sprinklers, and smoke control for high-rise",
      "Food and beverage: commercial kitchen MEP, grease waste, and bar/restaurant support",
      "Pool and spa: dehumidification, pool equipment, and sauna/steam systems",
      "Brand compliance: engineering to major-flag standards, PIP renovations, and prototype adaptation",
    ],
  },
  "office-building": {
    name: "Office Building",
    title: "Office Building Engineering",
    description:
      "MEP and structural engineering for office buildings — low-rise, mid-rise, and high-rise commercial office. Floor-plate MEP with flexible HVAC zoning for tenant churn, raised-floor and underfloor air options, and base-building systems sized for dense occupancy. Lobby and amenity engineering, parking structure integration, and energy performance that keeps the building competitive — PE-stamped in 49 states.",
    edge:
      "Office buildings compete on operating costs and tenant experience. We engineer efficient central plants, flexible floor systems that absorb tenant changes without base-building work, and lobbies that lease space — the engineering behind full occupancy.",
    services: [
      "HVAC: VAV and underfloor air distribution with flexible tenant zoning",
      "Electrical: base-building service, tenant metering, and emergency power",
      "Structural: steel and concrete framing, long-span floors, and lateral design",
      "Plumbing: core restrooms, tenant rough-in, and water-efficient fixtures",
      "Amenity: lobbies, fitness centers, conference facilities, and rooftop decks",
    ],
  },
  "retail-building": {
    name: "Retail Building",
    title: "Retail Building Engineering",
    description:
      "Engineering for retail buildings — shopping centers, power centers, grocery-anchored developments, and standalone stores. Storefront structural design, rooftop-unit HVAC with tenant zoning, and parking-lot lighting and civil design. Grocery refrigeration coordination, restaurant-tenant grease and gas rough-in, and fast-track delivery for retail opening dates — PE-stamped in 49 states.",
    edge:
      "Retail runs on opening dates — a missed holiday season is a lost year. We engineer retail shells with tenant-ready infrastructure (power, gas, grease rough-in) and deliver permit sets on retail timelines, so stores open when the lease says they open.",
    services: [
      "Shell structure: long-span framing, storefront support, and canopy design",
      "HVAC: rooftop units, tenant zoning, and makeup air for food tenants",
      "Site: parking lots, lighting photometrics, signage power, and drainage",
      "Tenant infrastructure: grease waste, gas, and power rough-in for restaurant pads",
      "Grocery: refrigeration heat rejection, dock coordination, and backup power",
    ],
  },
  "restaurant-building": {
    name: "Restaurant Building",
    title: "Restaurant Building Engineering",
    description:
      "Engineering for standalone restaurants and food-service buildings — quick-service, fast-casual, and full-service dining. Commercial kitchen MEP: Type I grease exhaust with makeup air, gas distribution, and grease interceptors. Dining-room HVAC and acoustics, drive-thru stacking and site design, walk-in refrigeration, and health-department-compliant plumbing — PE-stamped in 49 states.",
    edge:
      "Restaurants are MEP-intensive buildings wearing a hospitality costume — the kitchen is an industrial process. We engineer the exhaust, gas, grease, and refrigeration backbone that health inspectors approve and kitchen crews can actually work in.",
    services: [
      "Kitchen exhaust: Type I hoods, grease duct, makeup air, and pollution control",
      "Gas and plumbing: distribution, interceptors, and health-code compliance",
      "Refrigeration: walk-ins, remote condensing units, and heat rejection",
      "Dining HVAC: comfort, acoustics, and odor control between kitchen and dining",
      "Site: drive-thru lanes, stacking, patio utilities, and grease-trap access",
    ],
  },
  "school-building": {
    name: "School Building",
    title: "School Building Engineering",
    description:
      "Engineering for K-12 school buildings — elementary, middle, and high school facilities. Classroom HVAC with CO2-based demand ventilation, acoustic design for learning environments, and security vestibules with electronic access. Gymnasiums, cafeterias with commercial kitchens, science labs, and storm-shelter design — with PE stamps in 49 states.",
    edge:
      "Schools get one construction window: summer. We engineer for the academic calendar — permit packages timed to board approvals, summer-only utility cutovers, and systems simple enough for district maintenance staff to run for 30 years.",
    services: [
      "Classroom HVAC: ventilation, acoustics, and energy-efficient system design",
      "Electrical: classroom power, lighting, emergency egress, and technology",
      "Gym and cafeteria: long-span structures, kitchen MEP, and bleacher support",
      "Security: vestibules, access control, camera rough-in, and mass notification",
      "Storm shelters: ICC 500 safe-room design and structural hardening",
    ],
  },
  "church-building": {
    name: "Church Building",
    title: "Church Building Engineering",
    description:
      "Engineering for churches and worship facilities — sanctuaries, fellowship halls, education wings, and multi-purpose worship centers. Sanctuary acoustics and HVAC designed for variable occupancy (50 on Wednesday, 500 on Sunday), theatrical lighting and AVL infrastructure, and commercial kitchens for fellowship dining. Phased construction for growing congregations — PE-stamped in 49 states.",
    edge:
      "Churches are built by volunteers' donations and operated by volunteers — every dollar matters twice. We engineer systems that are efficient to run, simple to maintain, and phased to match capital campaigns, so the building serves the mission instead of consuming it.",
    services: [
      "Sanctuary HVAC: variable-occupancy design, quiet operation, and zoned control",
      "Acoustics and AVL: sound reinforcement, theatrical lighting, and broadcast rough-in",
      "Structural: clear-span sanctuaries, balcony framing, and steeple engineering",
      "Fellowship: commercial kitchens, multi-purpose halls, and education wings",
      "Phasing: master-planned expansions timed to congregation growth",
    ],
  },
  "library-building": {
    name: "Library Building",
    title: "Library Building Engineering",
    description:
      "Engineering for public and academic libraries — reading rooms, stacks, children's areas, and community meeting spaces. Preservation-grade HVAC for archives and special collections, quiet systems for reading environments, and lighting designed for long study sessions. High-density stack structural loading, public computing infrastructure, and flexible community spaces — PE-stamped in 49 states.",
    edge:
      "Libraries are civic living rooms — they have to be comfortable for hours, quiet enough to think, and tough enough for thousands of daily visitors. We engineer the invisible comfort (air quality, acoustics, light) that makes a library feel like the best room in town.",
    services: [
      "HVAC: quiet systems, preservation environments for archives, and zoned control",
      "Structural: high-density stack loading and long-span reading rooms",
      "Lighting: circadian-friendly design for study areas and display lighting",
      "Electrical: public computing power, device charging, and emergency systems",
      "Community: meeting rooms, maker spaces, and children's area engineering",
    ],
  },
  "museum-building": {
    name: "Museum Building",
    title: "Museum Building Engineering",
    description:
      "Engineering for museums and galleries — collection galleries, archives, and public exhibit spaces. Museum-grade climate control (tight temperature and humidity tolerances for collections), low-UV exhibition lighting, and security infrastructure. Vibration control for sensitive artifacts, loading-dock and crate-handling logistics, and public assembly egress — PE-stamped in 49 states.",
    edge:
      "Museums protect irreplaceable objects while welcoming the public — two missions that fight each other. We engineer gallery environments that hold preservation tolerances through 10,000-visitor days, with security and lighting systems worthy of what's on the walls.",
    services: [
      "Climate control: tight-tolerance HVAC for galleries, archives, and storage",
      "Lighting: low-UV exhibition lighting, track systems, and daylight control",
      "Security: intrusion, access control, and camera infrastructure coordination",
      "Structural: vibration control, heavy-object support, and seismic artifact protection",
      "Logistics: loading docks, crate handling, and registrar workspace engineering",
    ],
  },
  "theater-building": {
    name: "Theater Building",
    title: "Theater Building Engineering",
    description:
      "Engineering for theaters and performing-arts venues — proscenium houses, black boxes, and concert halls. Performance HVAC (silent systems for 1,000-seat houses), theatrical rigging structural support, and stage lighting power distribution. Acoustic isolation between performance and lobby spaces, orchestra pit ventilation, and fly-tower structures — PE-stamped in 49 states.",
    edge:
      "A theater's engineering has one job: disappear. Silent air, invisible structure holding tons of rigging, lighting power that never flickers — we engineer the infrastructure that lets the audience forget the building exists and remember the performance.",
    services: [
      "Performance HVAC: ultra-quiet systems, displacement ventilation, and pit conditioning",
      "Rigging structure: fly towers, gridirons, and point-load support for theatrical rigging",
      "Electrical: dimming, stage lighting power, and show-power distribution",
      "Acoustics: isolation detailing, HVAC noise control, and room-shaping coordination",
      "Life safety: assembly egress, smoke control, and emergency systems for large crowds",
    ],
  },
  "stadium-building": {
    name: "Stadium Building",
    title: "Stadium and Arena Engineering",
    description:
      "Engineering for stadiums, arenas, and large sports venues — bowl structures, concourses, suites, and support facilities. Long-span roof structures, crowd-loading structural design, and concession MEP (kitchens, beer systems, high-volume restrooms). Broadcast infrastructure, field lighting power, and mass-egress life safety for 50,000+ occupants — PE-stamped in 49 states.",
    edge:
      "Stadiums are small cities that fill in an hour and empty in twenty minutes. We engineer the structure for crowd dynamics, the MEP for peak-event loads, and the egress for the worst-case scenario — because 50,000 people trust the building with their Saturday.",
    services: [
      "Bowl structure: rakers, long-span roofs, and crowd-dynamic loading design",
      "Concourse MEP: concessions, kitchens, restrooms, and beer-system rough-in",
      "Broadcast: camera platforms, cabling infrastructure, and production power",
      "Field systems: sports lighting power, turf drainage, and irrigation",
      "Life safety: mass egress, smoke control, and emergency planning for large crowds",
    ],
  },
  "airport-terminal": {
    name: "Airport Terminal",
    title: "Airport Terminal Engineering",
    description:
      "Engineering for airport terminals and aviation facilities — holdrooms, concourses, baggage systems, and concessions. High-bay structural design, baggage-handling power and controls, and passenger-flow HVAC for peak travel days. Security checkpoint infrastructure, jet-bridge power, and FAA/TSA coordination — PE-stamped in 49 states.",
    edge:
      "Terminals never close and never forgive downtime — a failed baggage system makes the evening news. We engineer redundant systems, maintainable equipment layouts, and construction phasing that keeps flights moving while the building gets built around them.",
    services: [
      "Baggage systems: power, controls, and structural support for handling equipment",
      "Concourse MEP: high-bay HVAC, lighting, and passenger-comfort systems",
      "Security: checkpoint power, screening-equipment infrastructure, and TSA coordination",
      "Apron systems: jet-bridge power, ground-support electrical, and fueling coordination",
      "Phasing: occupied-terminal construction sequencing and interim operations",
    ],
  },
  "parking-structure": {
    name: "Parking Structure",
    title: "Parking Structure Engineering",
    description:
      "Structural and MEP engineering for parking garages — cast-in-place, precast, and steel structures from 100 to 3,000 stalls. Post-tensioned and precast design, vehicle-loading analysis, and durability detailing for deicing exposure. Garage ventilation and CO monitoring, EV charging infrastructure, lighting and security systems, and ADA-accessible parking design — PE-stamped in 49 states.",
    edge:
      "Parking structures live the hardest life of any building — deicing salts, thermal movement, and 4,000-pound dynamic loads, every day for 50 years. We engineer durability first: proper drainage, protected reinforcement, and ventilation that keeps the structure (and its users) healthy.",
    services: [
      "Structural: post-tensioned, precast, and steel garage design with durability detailing",
      "Ventilation: garage exhaust, CO monitoring, and code-compliant air changes",
      "EV charging: infrastructure, load management, and future-ready distribution",
      "Lighting and security: photometric design, emergency egress, and camera systems",
      "Waterproofing: deck coatings, drainage, and expansion-joint detailing",
    ],
  },
  "medical-office": {
    name: "Medical Office",
    title: "Medical Office Building Engineering",
    description:
      "Engineering for medical office buildings — multi-specialty clinics, outpatient surgery centers, and diagnostic imaging. Exam-room HVAC with privacy acoustics, procedure-room ventilation, and medical gas rough-in. Imaging suite structural and shielding coordination (MRI, CT, X-ray), emergency power for critical loads, and patient-flow MEP zoning — PE-stamped in 49 states.",
    edge:
      "Medical offices are clinical spaces patients judge like hospitality — comfort, quiet, and confidence. We engineer exam-room acoustics for privacy, procedure ventilation for safety, and the shielding and structural coordination that imaging equipment demands.",
    services: [
      "Exam and procedure: HVAC, medical gases, and privacy-acoustic design",
      "Imaging: structural support, RF shielding, and cooling for MRI/CT/X-ray",
      "Surgery centers: OR-grade ventilation, emergency power, and sterile processing",
      "Electrical: critical-branch power, lighting, and nurse-call infrastructure",
      "Patient experience: quiet systems, wayfinding lighting, and comfort zoning",
    ],
  },
  "dental-office": {
    name: "Dental Office",
    title: "Dental Office Engineering",
    description:
      "Engineering for dental practices — general dentistry, orthodontics, oral surgery, and multi-operatory clinics. Operatory HVAC with quiet operation, dental vacuum and compressed-air systems, and nitrous oxide distribution with scavenging. X-ray and CBCT shielding, sterilization-center plumbing, and chair-side utility rough-in — PE-stamped in 49 states.",
    edge:
      "Dental operatories are compact clinical factories — every chair needs vacuum, air, water, and power in a 10-foot square. We engineer the utility matrix behind the walls so equipment installs cleanly, operates quietly, and passes inspection the first time.",
    services: [
      "Operatory utilities: dental vacuum, compressed air, and water distribution",
      "Nitrous oxide: distribution, scavenging, and room ventilation for sedation",
      "Imaging: X-ray and CBCT shielding calculations and room design",
      "Sterilization: plumbing, ventilation, and equipment support for sterile processing",
      "HVAC: quiet systems, odor control, and procedure-room ventilation",
    ],
  },
  "veterinary-clinic": {
    name: "Veterinary Clinic",
    title: "Veterinary Clinic Engineering",
    description:
      "Engineering for veterinary clinics and animal hospitals — exam rooms, surgery suites, kennels, and grooming. Surgery-suite ventilation and medical gas, kennel HVAC with odor control and noise management, and wet-table plumbing with hair and solids handling. X-ray shielding, isolation wards for infectious cases, and durable finishes — PE-stamped in 49 states.",
    edge:
      "Vet clinics combine surgery-suite precision with kennel-level durability — and odors that will clear a waiting room. We engineer the ventilation zoning, acoustic separation, and washdown-rated systems that keep the clinic smelling clean and running quiet.",
    services: [
      "Surgery: ventilation, medical gases, and sterile-procedure support",
      "Kennel HVAC: odor control, noise management, and disease-control zoning",
      "Plumbing: wet tables, grooming, trench drains, and solids handling",
      "Imaging: X-ray shielding and equipment-room engineering",
      "Isolation: infectious-disease wards with dedicated ventilation",
    ],
  },
  "bank-building": {
    name: "Bank Building",
    title: "Bank Building Engineering",
    description:
      "Engineering for bank branches and financial buildings — lobbies, teller lines, offices, and operations centers. Vault structural design and anchorage, drive-thru teller lanes and pneumatic tube systems, and ATM vestibule security. Cash-handling HVAC and access control, night-deposit and safe-deposit areas, and corporate office MEP — PE-stamped in 49 states.",
    edge:
      "Bank branches are security buildings that have to feel welcoming — the engineering tension is real. We design vault structures and cash-handling security into welcoming lobbies, with the access control and surveillance infrastructure that keeps everyone safe.",
    services: [
      "Vault: structural design, anchorage, and UL-rated construction coordination",
      "Drive-thru: teller lanes, pneumatic tubes, and canopy engineering",
      "Security: access control, camera rough-in, and alarm infrastructure",
      "Cash handling: HVAC, lighting, and secure-room design for operations",
      "Branch MEP: lobby comfort, office systems, and ATM vestibule conditioning",
    ],
  },
  "courthouse-building": {
    name: "Courthouse Building",
    title: "Courthouse Engineering",
    description:
      "Engineering for courthouses and justice facilities — courtrooms, chambers, holding areas, and clerk offices. Courtroom acoustics and HVAC for formal proceedings, secure circulation separating public, staff, and in-custody movement, and holding-cell ventilation and plumbing. Blast-resistant design considerations, sally-port engineering, and the security infrastructure justice facilities demand — PE-stamped in 49 states.",
    edge:
      "Courthouses run three separate buildings in one — public, staff, and secure — that can never mix. We engineer the circulation, the acoustic privacy, and the security systems that keep proceedings dignified and everyone safe.",
    services: [
      "Courtroom: acoustics, HVAC, and AV infrastructure for proceedings",
      "Secure circulation: separated public/staff/in-custody paths and sally ports",
      "Holding: cell ventilation, plumbing, and security-electronics rough-in",
      "Structural: blast considerations, progressive-collapse review, and secure framing",
      "Security: access control, duress, camera, and screening infrastructure",
    ],
  },
  "fire-station": {
    name: "Fire Station",
    title: "Fire Station Engineering",
    description:
      "Engineering for fire stations — apparatus bays, living quarters, training facilities, and admin. Bay exhaust extraction and decontamination (carcinogen control), rapid-response alerting infrastructure, and turnout-gear storage ventilation. Essential-facility seismic design, backup power for full station operation, and drive-through bay site design — PE-stamped in 49 states.",
    edge:
      "Fire stations are essential facilities — they have to function through the disaster everyone else is fleeing. We engineer seismic resilience, full backup power, and decontamination systems that protect firefighters from the carcinogens their gear carries home.",
    services: [
      "Apparatus bays: exhaust extraction, decontamination, and gear-storage ventilation",
      "Alerting: station alerting infrastructure, lighting, and rapid-response systems",
      "Essential facility: seismic design, backup power, and disaster resilience",
      "Living quarters: quiet HVAC, kitchen, and dormitory comfort systems",
      "Site: drive-through bays, apron design, and emergency vehicle circulation",
    ],
  },
  "police-station": {
    name: "Police Station",
    title: "Police Station Engineering",
    description:
      "Engineering for police stations and law-enforcement facilities — patrol operations, investigations, holding, and evidence. Secure evidence storage HVAC and access control, interview-room recording infrastructure, and holding-cell ventilation and plumbing. 24/7 operations-center power and cooling, sally-port design, and the security hardening these facilities require — PE-stamped in 49 states.",
    edge:
      "Police stations operate 24/7/365 with zero tolerance for system failure — dispatch can't go dark. We engineer redundant power and cooling for operations centers, secure evidence environments, and the hardened infrastructure that keeps the facility running through anything.",
    services: [
      "Operations: redundant power, cooling, and communications for 24/7 dispatch",
      "Evidence: secure storage HVAC, access control, and chain-of-custody design",
      "Holding: cell ventilation, plumbing, and security-electronics coordination",
      "Interview: recording infrastructure, acoustics, and observation-room design",
      "Hardening: secure entries, sally ports, and blast-resistant considerations",
    ],
  },
};

function slugToCity(slug: string): string {
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function slugToState(slug: string): string {
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

export default function BuildingCityPage() {
  const params = useParams();
  const buildingSlug = params.building as string;
  const citySlug = params.city as string;
  const stateSlug = params.state as string;

  const building = BUILDINGS[buildingSlug];
  const city = useMemo(() => slugToCity(citySlug || ''), [citySlug]);
  const state = useMemo(() => slugToState(stateSlug || ''), [stateSlug]);

  if (!building || !city || !state) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
          <p>The requested building engineering page could not be found.</p>
        </div>
      </div>
    );
  }

  const pageTitle = `${building.title} in ${city}, ${state} | Apex Grid`;
  const metaDescription = `${building.description} ${building.name} engineering services in ${city}, ${state} with 49-state PE licensure and 24-hour quotes.`;

  return (
    <div className="min-h-screen bg-white">
      {/* SEO meta would be handled by react-helmet or similar */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <nav className="text-sm text-gray-500 mb-6">
          <a href="/" className="hover:underline">Home</a> {' > '}
          <a href="/services" className="hover:underline">Services</a> {' > '}
          <span>{building.name}</span> {' > '}
          <span>{city}, {state}</span>
        </nav>

        <h1 className="text-4xl font-bold mb-6">
          {building.title} in {city}, {state}
        </h1>

        <p className="text-lg text-gray-700 mb-8">
          {metaDescription}
        </p>

        <div className="prose max-w-none mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            {building.name} Engineering Services in {city}
          </h2>
          <p className="mb-4">
            Apex Grid Engineering delivers {building.name.toLowerCase()} engineering services
            in {city}, {state} for owners, developers, architects, and general contractors.
            From ground-up construction to complex renovations, our 49-state PE licensure
            covers your project wherever your portfolio takes you.
          </p>
          <p className="mb-4">
            {building.description}
          </p>
          <p className="mb-4">
            {building.edge}
          </p>

          <h2 className="text-2xl font-semibold mb-4 mt-8">
            Why Owners Choose Apex Grid for {building.name} Projects
          </h2>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>49-State Licensure:</strong> One engineering partner for your entire {building.name.toLowerCase()} portfolio, in every market.</li>
            <li><strong>24-Hour Quotes:</strong> Engineering pricing in 12-24 hours — keep your acquisition and development timelines moving.</li>
            <li><strong>Building-Type Fluency:</strong> We know the systems, codes, and details that make {building.name.toLowerCase()} projects work — and the traps that sink them.</li>
            <li><strong>Permit-Ready Drawings:</strong> Stamped plan sets coordinated for {city}'s building department and {state} amendments.</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4 mt-8">
            {building.name} Engineering in {city}, {state}: What We Deliver
          </h2>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            {building.services.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
            <h3 className="text-xl font-semibold mb-3">Get Your {city} {building.name} Project Engineered</h3>
            <p className="mb-4">
              Send us your project address and drawings or concept plans. We'll have a
              quote back in 24 hours and permit-ready engineering on your schedule.
            </p>
            <a
              href="/estimate"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
            >
              Send Us Your Project
            </a>
          </div>
        </div>

        <div className="border-t pt-8 mt-12">
          <p className="text-sm text-gray-500">
            Apex Grid Engineering PLLC is licensed in 49 states, including {state}.
            Professional engineering services for {building.name.toLowerCase()} projects
            in {city} and surrounding areas.
          </p>
        </div>
      </main>
    </div>
  );
}
