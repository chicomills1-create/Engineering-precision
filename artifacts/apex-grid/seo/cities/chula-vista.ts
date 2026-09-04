import type { CityData } from "../types";

export const chulaVista: CityData = {
  slug: "chula-vista",
  name: "Chula Vista",
  stateSlug: "california",
  county: "San Diego County",
  ahj: {
    office: "City of Chula Vista Development Services Department, Building Division",
    process:
      "The Building Division accepts permit applications and construction documents through the City’s online permitting services and coordinates plan review and inspections. Commercial work can be routed to building, fire, planning, engineering, and other reviewers; discretionary land-use, coastal, hillside, or environmental approvals remain separate from a building permit.",
  },
  codes: {
    building:
      "2022 California Building Code and City of Chula Vista local amendments",
    energy:
      "2022 California Energy Code (Title 24, Part 6), with 2022 CALGreen requirements",
    amendments:
      "Chula Vista adopts the California code cycle with local amendments in its Municipal Code. Projects must account for the city’s adopted building, fire, and green-building provisions and any parcel-specific planning, environmental, wildfire, or coastal-overlay conditions; Title 24 compliance uses California-approved methods rather than COMcheck.",
  },
  utilities: {
    electric: "San Diego Gas & Electric (SDG&E) provides electric service",
    notes:
      "SDG&E new-service and distributed-energy-resource interconnection requirements should be started early for electrified buildings, PV, storage, or major load additions. Water service is provided by Sweetwater Authority or Otay Water District depending on the parcel, and the City provides wastewater collection; exact service territory and capacity should be confirmed before utility layouts are fixed.",
  },
  climateNotes:
    "Chula Vista’s coastal and western areas have a mild marine climate while eastern neighborhoods become warmer and drier; California climate zone 7 conditions are common near the bay. Seismic design, local liquefaction or expansive-soil conditions, wildfire exposure toward the eastern edge, and short-duration storm runoff all require parcel-specific investigation.",
  marketNotes:
    "Chula Vista’s market includes multifamily and mixed-use growth, health care, education, retail, and industrial or logistics activity tied to the South Bay and cross-border economy. Large master-planned growth areas and infill near transit make utility extensions, environmental approvals, stormwater treatment, and mobility improvements important site-development considerations.",
  narratives: {
    mep:
      "Chula Vista MEP concepts take advantage of a mild coastal climate where economizer operation and right-sized cooling can be valuable, while accounting for warmer inland microclimates and marine corrosion near the bay. The 2022 Title 24 energy path, CALGreen measures, and SDG&E’s service and DER interconnection process are developed together for heat pumps, PV, storage, and high-load occupancies. Water availability must be checked with Sweetwater Authority or Otay Water District for the specific parcel, rather than assumed citywide.",
    structural:
      "Structural design in Chula Vista is governed by California seismic practice: the 2022 CBC requires a site-specific understanding of seismic parameters, soil class, liquefaction potential, and slope or fault-related constraints where applicable. Coastal soils and fill, expansive soils inland, and wildfire-interface terrain can change foundation and retaining concepts substantially. We coordinate the geotechnical recommendations, lateral system, nonstructural anchorage, and special-inspection requirements with the Building Division plan-review package.",
    civil:
      "Chula Vista civil engineering must reserve space for stormwater treatment and hydromodification controls while navigating existing utilities and varied topography from bayfront to eastern uplands. The City’s stormwater requirements and regional MS4 framework require project-specific BMP planning; infiltration feasibility depends on soils, groundwater, and contamination screening. We coordinate grading, water territory, sewer collection, frontage improvements, and any planning or environmental conditions with Development Services before the site plan loses flexibility.",
    energy:
      "Energy compliance in Chula Vista is a 2022 Title 24 Part 6 exercise, supported by California-approved compliance software and coordinated with 2022 CALGreen—not an IECC COMcheck submission. Mild coastal conditions reward well-controlled glazing, daylighting, efficient lighting, ventilation controls, and correctly sized heat-pump systems, while warmer eastern exposures need stronger solar-gain management. We evaluate the compliance model alongside SDG&E rates, electrification loads, PV, storage, and the actual water-heating and process profile.",
  },
  faqs: [
    {
      q: "Which codes govern a Chula Vista commercial building permit?",
      a: "Chula Vista enforces the 2022 California Building Code cycle with local amendments, including the 2022 California Energy Code and CALGreen. The City’s current municipal amendments and parcel-specific planning or fire conditions must be checked with the base Title 24 codes.",
    },
    {
      q: "Which utilities serve a Chula Vista project?",
      a: "SDG&E provides electric service. Water territory is parcel-specific: Sweetwater Authority or Otay Water District may serve the site, while the City provides wastewater collection. Confirming territory, capacity, and extension requirements early avoids designing a utility layout on an assumption.",
    },
    {
      q: "Does Chula Vista use COMcheck for energy compliance?",
      a: "No. California commercial energy compliance follows Title 24 Part 6 using California-approved compliance methods and software. The analysis addresses envelope, HVAC, lighting, controls, and applicable solar or battery provisions within the 2022 Energy Code framework.",
    },
  ],
};