import type { StateData } from "../types";

export const massachusetts: StateData = {
  slug: "massachusetts",
  name: "Massachusetts",
  abbrev: "MA",
  lastVerified: "2026-07-28",
  buildingCode: {
    name: "Massachusetts State Building Code, 9th Edition (780 CMR) — statewide, based on the 2015 IBC",
    baseCode: "2015 IBC with extensive Massachusetts amendments (780 CMR)",
    notes:
      "Massachusetts enforces a single statewide building code (780 CMR) administered by the Board of Building Regulations and Standards; the current 9th Edition is based on the 2015 IBC with substantial state amendments. Because the code is uniform statewide, the edition is consistent everywhere, but Boston and other larger cities have well-defined local review processes.",
  },
  energyCode: {
    commercial: "Massachusetts commercial energy code (based on the IECC / ASHRAE 90.1 as adopted in 780 CMR 13/115)",
    notes:
      "The base energy code is set statewide through 780 CMR. Massachusetts also maintains a mandatory Stretch Energy Code that the large majority of municipalities have adopted, so most projects face above-base requirements.",
    beyondCode:
      "The Stretch Energy Code is adopted by most MA municipalities, and the newer Specialized (Opt-in) Stretch Code adds net-zero-ready and electrification-forward requirements in participating cities and towns (including Boston). BERDO 2.0 imposes carbon limits on large Boston buildings.",
  },
  climate: {
    zones: "5A across most of the state; 4A in the far southeast, Cape Cod, and the Islands",
    drivers: [
      "Cold, humid winters with high heating loads",
      "Coastal nor'easters and wind exposure on the Cape and Islands",
      "Humid summers requiring dehumidification",
      "Aggressive freeze-thaw and continuous-insulation detailing",
    ],
  },
  structural: {
    seismic: "Seismic Design Category B, edging to C on soft soils — the highest seismic attention in New England, and detailing matters for taller and essential buildings around Boston",
    wind: "Basic wind speeds around 120–135+ mph on Cape Cod and the Islands (Risk Category II), tapering to ~110–120 mph inland",
    snow: "Ground snow loads generally 30–50 psf, with higher values (55+ psf) in the Berkshires and worcester-area highlands",
    other: "Frost depth ~4 ft; Boston's filled land and soft Boston Blue Clay drive deep foundations; coastal VE/AE flood zones on the Cape and South Shore",
  },
  licensure: {
    board: "Massachusetts Board of Registration of Professional Engineers and Land Surveyors",
    notes:
      "Massachusetts grants licensure by comity and accepts NCEES records; digital signatures/seals are permitted for electronic submissions. A registered design professional must stamp construction documents for permit.",
  },
  metros: ["Boston", "Worcester", "Springfield", "Cambridge", "Lowell", "New Bedford"],
  permitting:
    "Local building departments enforce the uniform 780 CMR, so the code itself is consistent statewide, but review depth varies from small towns to Boston's Inspectional Services Department, which coordinates with BPDA (formerly BRA) large-project review. Coastal and wetlands work triggers Conservation Commission review under the Wetlands Protection Act, and MEPA environmental review can gate large projects. Boston's Article 37 green-building and BERDO requirements add city-specific obligations.",
  marketNotes:
    "Massachusetts is a national leader in life sciences and lab/GMP construction, concentrated in Cambridge, the Seaport, and the 128/495 suburbs, alongside strong healthcare, higher-education, and multifamily demand. High land and construction costs, an aggressive decarbonization agenda, and lab-conversion activity keep engineering demand for high-performance, electrified, and heavily serviced buildings elevated.",
  narratives: {
    mep:
      "Massachusetts MEP work is defined by two forces: a cold, humid Zone 5A climate and the most aggressive decarbonization framework in New England. Beyond the base 780 CMR energy code, most municipalities enforce the Stretch Energy Code, and a growing set — including Boston — have opted into the Specialized Stretch Code, which pushes new commercial buildings toward net-zero-ready, electrification-forward design. We design heating plants and envelopes to real Zone 5A/4A winter loads, favor high-efficiency heat pumps and heat/energy recovery to meet stretch and specialized-code targets, and manage the humidity of both winter and summer. The state's life-science market layers on demanding lab and GMP ventilation, once-through air, and redundancy requirements. Eversource and National Grid demand charges, plus Boston's BERDO carbon limits on large buildings, make energy and utility modeling a design input from schematic on, not an afterthought.",
    structural:
      "Massachusetts carries the highest seismic attention in New England — mostly SDC B but pushing toward C on the soft soils around Boston — so lateral detailing genuinely matters for taller and essential buildings, unlike much of the region. Boston's filled land and the notorious Boston Blue Clay routinely drive deep foundations (driven piles, drilled elements) and careful settlement control, which we coordinate tightly with the geotechnical engineer. Snow governs many roofs at 30–50 psf, rising to 55+ psf in the Berkshires, with drift and rain-on-snow to design for; coastal wind on Cape Cod and the Islands reaches 120–135+ mph and combines with VE/AE flood elevation requirements. We design under the 9th Edition (780 CMR / 2015 IBC as amended) with ~4 ft frost footings, and for the state's lab and GMP buildings we address stringent vibration criteria that gravity design alone won't satisfy.",
    civil:
      "Civil and site engineering in Massachusetts is shaped by the Wetlands Protection Act and dense, constrained sites. Nearly any work near wetlands, coastal resources, or the 100-foot buffer triggers a local Conservation Commission Order of Conditions, and stormwater must meet the MassDEP Stormwater Standards, which prioritize recharge and water-quality treatment. Large projects also face MEPA review and, in Boston, BPDA large-project and Article 37 requirements. We design grading, storm systems, and utilities to municipal and MassDEP standards, manage the state's ~4 ft frost depth and high groundwater, and on redevelopment sites coordinate with MCP-driven remediation and Licensed Site Professional oversight. Tight urban parcels in Cambridge and the Seaport make underground stormwater storage, green infrastructure, and utility coordination the defining site challenges.",
    energy:
      "Energy compliance in Massachusetts almost always means more than the base code. The statewide 780 CMR sets the floor, but the overwhelming majority of municipalities have adopted the mandatory Stretch Energy Code, and a growing list — Boston among them — enforce the Specialized (Opt-in) Stretch Code with net-zero-ready and electrification requirements. We confirm which code a municipality enforces before setting the compliance strategy, then document via performance modeling (typically needed for stretch/specialized paths) rather than simple prescriptive checks. In Zone 5A, continuous insulation, air-tightness, and high-performance glazing carry the envelope, while heat pumps and energy recovery increasingly define the compliant mechanical approach. For large Boston buildings we also model the BERDO 2.0 carbon-limit trajectory, since it governs long after occupancy.",
  },
  faqs: [
    {
      q: "What building code does Massachusetts use?",
      a: "Massachusetts enforces a statewide code, the 9th Edition of the Massachusetts State Building Code (780 CMR), based on the 2015 IBC with substantial state amendments. It is uniform statewide, so the edition is consistent everywhere, though Boston and larger cities have more involved local review processes.",
    },
    {
      q: "Which energy code applies to my Massachusetts project?",
      a: "It depends on the municipality. The base energy code is set in 780 CMR, but most cities and towns have adopted the mandatory Stretch Energy Code, and a growing number — including Boston — enforce the Specialized Stretch Code with net-zero-ready and electrification requirements. We confirm the local code before choosing a compliance path.",
    },
    {
      q: "What foundation challenges are common around Boston?",
      a: "Boston has extensive filled land and soft Boston Blue Clay, which routinely require deep foundations and careful settlement control. Seismic detailing matters more here than elsewhere in New England (SDC B trending to C on soft soils), and coastal sites add flood-elevation requirements. We coordinate foundations closely with the geotechnical report.",
    },
    {
      q: "What permits affect Massachusetts site development?",
      a: "Beyond the building permit, work near wetlands or coastal resources triggers Conservation Commission review under the Wetlands Protection Act, and stormwater must meet MassDEP Standards emphasizing recharge and water quality. Large projects face MEPA review, and Boston adds BPDA and Article 37 green-building requirements.",
    },
  ],
};
