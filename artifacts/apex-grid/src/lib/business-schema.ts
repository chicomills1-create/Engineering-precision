export const APEX_GRID_SITE_URL = "https://apexgrideng.com";

const serviceAreas = [
  { "@type": "State", name: "Arizona" },
  { "@type": "State", name: "California" },
  { "@type": "State", name: "New Mexico" },
  { "@type": "City", name: "Phoenix, Arizona" },
  { "@type": "City", name: "Scottsdale, Arizona" },
  { "@type": "City", name: "Mesa, Arizona" },
  { "@type": "City", name: "Chandler, Arizona" },
  { "@type": "City", name: "Tempe, Arizona" },
  { "@type": "City", name: "Queen Creek, Arizona" },
  { "@type": "City", name: "Tucson, Arizona" },
  { "@type": "City", name: "Albuquerque, New Mexico" },
  { "@type": "City", name: "Santa Fe, New Mexico" },
  { "@type": "City", name: "Los Angeles, California" },
  { "@type": "City", name: "San Diego, California" },
] as const;

const knowledgeAreas = [
  "MEP Engineering",
  "Structural Engineering",
  "Civil Engineering",
  "Geotechnical Engineering",
  "Building Assessments",
  "PE Stamping",
  "Municipal Plan-Check Navigation",
  "Commercial MEP Design in Arizona",
  "California Title 24 Energy Compliance",
  "Seismic Retrofit Engineering",
  "Permit-Ready Construction Documents",
] as const;

const services = [
  "MEP Engineering",
  "Structural Engineering",
  "Civil Engineering",
  "Geotechnical Engineering",
  "Building Assessments",
  "PE Stamping and Sealing",
  "Municipal Plan-Check Navigation",
  "Title 24 Energy Compliance",
] as const;

/**
 * Canonical entity used by the React app and generated static pages.
 * ProfessionalService is a Schema.org LocalBusiness subtype and is more
 * specific than a generic Organization node.
 */
export const APEX_GRID_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${APEX_GRID_SITE_URL}/#business`,
  name: "Apex Grid Engineering",
  alternateName: "Apex Grid",
  legalName: "Apex Grid Engineering",
  url: `${APEX_GRID_SITE_URL}/`,
  logo: `${APEX_GRID_SITE_URL}/favicon.svg`,
  description:
    "Multi-discipline professional engineering firm providing PE-stamped structural, MEP, civil, geotechnical, building-assessment, energy-compliance, and municipal plan-check support.",
  email: "info@apexgrideng.com",
  telephone: "+1-480-490-0064",
  priceRange: "$$",
  currenciesAccepted: "USD",
  address: {
    "@type": "PostalAddress",
    streetAddress: "22475 E Quintero Rd",
    addressLocality: "Queen Creek",
    addressRegion: "AZ",
    postalCode: "85142",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 33.2519632,
    longitude: -111.5985155,
  },
  areaServed: serviceAreas,
  founder: {
    "@type": "Person",
    "@id": `${APEX_GRID_SITE_URL}/jeremy-mills/#person`,
    name: "Jeremy Mills",
    alternateName: "Chico Mills",
    url: `${APEX_GRID_SITE_URL}/jeremy-mills/`,
  },
  knowsAbout: knowledgeAreas,
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Professional Engineering Services",
    itemListElement: services.map((name) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name,
        provider: { "@id": `${APEX_GRID_SITE_URL}/#business` },
      },
    })),
  },
  sameAs: ["https://www.linkedin.com/company/apex-grid-engineering"],
} as const;