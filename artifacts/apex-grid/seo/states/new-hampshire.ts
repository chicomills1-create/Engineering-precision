import type { StateData } from "../types";

export const newHampshire: StateData = {
  slug: "new-hampshire",
  name: "New Hampshire",
  abbrev: "NH",
  buildingCode: {
    name: "New Hampshire State Building Code (RSA 155-A) — statewide, referencing the 2018 I-Codes",
    baseCode: "2018 IBC with New Hampshire amendments (per the State Building Code Review Board)",
    notes:
      "New Hampshire adopts a statewide building code by reference under RSA 155-A, currently based on the 2018 I-Codes with state amendments set by the State Building Code Review Board. Enforcement, however, is local: towns that lack a building department may have limited inspection, so who reviews a project depends heavily on the municipality even though the code itself is statewide.",
  },
  energyCode: {
    commercial: "2018 IECC / ASHRAE 90.1-2016 (adopted as part of the New Hampshire State Building Code / State Energy Code)",
    notes:
      "Adopted statewide alongside the building code, the commercial energy code tracks the 2018 IECC, with ASHRAE 90.1-2016 available as an alternative compliance path. Projects demonstrate compliance with a COMcheck report or a whole-building energy model.",
    beyondCode:
      "NHSaves utility efficiency programs offer incentives for above-code performance; New Hampshire generally takes a lighter-touch regulatory posture than its southern New England neighbors, with fewer stretch-code or benchmarking mandates.",
  },
  climate: {
    zones: "6A across most of the state; 5A in the far southeast near the seacoast; approaching 7 in the White Mountains",
    drivers: [
      "Long, cold winters with very high heating loads",
      "Heavy mountain snow in the White Mountains",
      "Deep frost and hard-freeze detailing",
      "Short, humid summers — heating and envelope dominate",
    ],
  },
  structural: {
    seismic: "Seismic Design Category B — low-to-moderate, with basic detailing on soft soils and essential facilities",
    wind: "Basic wind speeds generally 110–120 mph, higher on the short seacoast; the White Mountains produce extreme local wind exposure (Mount Washington is a notable outlier)",
    snow: "Ground snow loads commonly 50–70+ psf in populated areas and well above 100 psf at mountain elevations; snow typically governs roof design",
    other: "Deep frost (4–5+ ft); granite bedrock (the 'Granite State') is often shallow, driving rock excavation and blasting; small seacoast flood zone on the Atlantic",
  },
  licensure: {
    board: "New Hampshire Board of Professional Engineers (Joint Board of Licensure and Certification)",
    notes:
      "New Hampshire offers comity licensure and recognizes NCEES records, and authenticated digital seals are permitted on electronic filings. A New-Hampshire-licensed PE must seal commercial construction documents.",
  },
  metros: ["Manchester", "Nashua", "Concord", "Portsmouth", "Dover", "Salem"],
  permitting:
    "The building code is statewide, but enforcement is local and uneven — larger towns and cities (Manchester, Nashua, Portsmouth) have full building departments, while many small towns have limited or no local inspection. Shoreland and wetlands work triggers NHDES permits (the Shoreland Water Quality Protection Act and wetlands rules), and NHDES also administers the state's Alteration of Terrain (stormwater) permit for larger disturbances.",
  marketNotes:
    "New Hampshire's construction market is anchored by advanced manufacturing and defense along the I-93/Route 3 tech corridor, healthcare, higher education (Dartmouth, UNH), Portsmouth seacoast growth, and tourism/ski development in the north. The state's no-sales-tax, no-income-tax environment and proximity to Boston support steady commercial, industrial, and multifamily activity, especially in the southern tier.",
  narratives: {
    mep:
      "New Hampshire MEP design starts from a hard winter: with Zone 6A conditions statewide (nudging toward 7 in the White Mountains), the heating plant, freeze safeguards, and a tight thermal shell set the whole mechanical direction, and cooling rides along as a lesser concern. The statewide 2018 IECC / ASHRAE 90.1-2016 sets the bar, and we reach for NHSaves utility incentives to make the case for high-efficiency boilers or furnaces, heat recovery, and — where an owner is willing — cold-climate heat pumps. At New Hampshire design temperatures, protecting outdoor-air paths, hydronic loops, and sprinkler piping from freezing is non-negotiable. Southern-tier advanced-manufacturing and defense clients need clean process ventilation and stable power quality, while hospitals and campuses demand real redundancy. Because Eversource and Unitil service areas — and thin rural feeders — govern how much electrical capacity is realistically available, we size services and plan renewables around them, and since code enforcement is a local matter here, we pin down each AHJ's process before the documents are final.",
    structural:
      "New Hampshire structural work is a snow-frost-and-granite regime. Snow is the usual governing case for roofs: loads of 50–70+ psf in the populated valleys climb past 100 psf up in the White Mountains, which forces a close look at drifting, snow sliding off pitched roofs, and rain falling onto an existing snowpack. Deep frost (4–5+ ft) drives footing depth. Living up to its 'Granite State' name, shallow bedrock is common, which cuts both ways — excellent bearing but costly rock excavation and blasting that we flag early through the geotechnical report. Seismic is low (SDC B), and wind is moderate except for extreme, terrain-driven exposure in the mountains. We work under the 2018 IBC as amended by the State Building Code Review Board, and where a project reuses the state's older mill or downtown buildings, we verify what the existing masonry and heavy-timber framing can actually take before any new load is introduced.",
    civil:
      "Civil and site engineering in New Hampshire runs primarily through NHDES. Larger earth disturbances require an Alteration of Terrain permit (the state's stormwater review), and work near lakes, rivers, and the coast triggers the Shoreland Water Quality Protection Act and wetlands permitting — often the critical-path approvals for waterfront and lakeside projects. Stormwater design follows the NHDES stormwater manual with an emphasis on infiltration and water-quality treatment, tempered by the state's shallow granite bedrock, which limits infiltration feasibility and requires geotechnical vetting. Grading, drainage, and utility layouts have to account for deep frost cover and boulder-strewn, ledge-prone ground, and on rural parcels we fold in on-site well and septic design. Because building enforcement is local and variable, we coordinate the site permitting with whatever municipal review the specific town provides.",
    energy:
      "For New Hampshire energy compliance we work to the statewide 2018 IECC (or ASHRAE 90.1-2016), proving it out with a COMcheck report or a full building energy model. The state takes a lighter regulatory touch than southern New England — no widespread stretch code or benchmarking mandates — so the compliance path is straightforward, but the climate does the heavy lifting: in Zone 6A (near 7 up in the mountains), it is the shell — unbroken insulation, a genuinely tight air barrier, thermal breaks at the details, and strong glazing — that ultimately decides operating cost. We use NHSaves incentives to push efficient heating, heat recovery, and heat pumps beyond minimum where the economics work, and for institutional and manufacturing clients we model above code to reduce operating cost. Getting the envelope and heating plant right up front is far cheaper than paying for New Hampshire winters over a building's life.",
  },
  faqs: [
    {
      q: "Does New Hampshire have a statewide building code?",
      a: "Yes. New Hampshire adopts a statewide building code by reference under RSA 155-A, currently based on the 2018 I-Codes with state amendments. Enforcement, though, is a local matter — larger cities staff full building departments while many small towns provide limited or no inspection — so we identify which authority will review each project up front.",
    },
    {
      q: "Which energy code do New Hampshire commercial buildings follow?",
      a: "The statewide code tracks the 2018 IECC, with ASHRAE 90.1-2016 as an alternative path, shown through a COMcheck report or an energy model. New Hampshire has fewer above-code mandates than southern New England, but NHSaves incentives support high-efficiency, heat-pump-forward design.",
    },
    {
      q: "How does snow affect structural design in New Hampshire?",
      a: "Snow typically governs roof design: populated-area ground snow loads run 50–70+ psf and exceed 100 psf at mountain elevations, with drift and sliding snow to analyze. We also design deep (4–5+ ft) frost footings and account for shallow granite bedrock that can make excavation costly.",
    },
    {
      q: "What state permits affect New Hampshire site development?",
      a: "NHDES administers the Alteration of Terrain permit for larger earth disturbances, plus Shoreland Water Quality Protection Act and wetlands permits near water bodies — often the critical-path approvals for lakeside and coastal sites. Shallow bedrock limits infiltration-based stormwater, which we vet geotechnically.",
    },
  ],
};
