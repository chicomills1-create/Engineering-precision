import { getPublishableArizonaIdentity } from "../../seo/official-evidence/claims";

export const APEX_GRID_SITE_URL = "https://apexgrideng.com";

const verifiedArizonaIdentity = getPublishableArizonaIdentity();
const verifiedCorporation = verifiedArizonaIdentity.corporationCommission;
const verifiedBtr = verifiedArizonaIdentity.boardOfTechnicalRegistration;

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
 * Organization is intentional: this is not a claim that Apex Grid maintains
 * a local ProfessionalService office in every areaServed entry.
 */
export const APEX_GRID_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${APEX_GRID_SITE_URL}/#business`,
  name: "Apex Grid Engineering",
  alternateName: "Apex Grid",
  ...(verifiedCorporation
    ? {
        legalName: verifiedCorporation.officialEntityName, // claims-audit: evidence-gated
        identifier: {
          "@type": "PropertyValue",
          propertyID: "Arizona Corporation Commission entity ID",
          value: verifiedCorporation.entityId,
        },
      }
    : {}),
  url: `${APEX_GRID_SITE_URL}/`,
  logo: `${APEX_GRID_SITE_URL}/favicon.svg`,
  description:
    "Multi-discipline professional engineering firm providing project-specific structural, MEP, civil, geotechnical, building-assessment, energy-compliance, and municipal plan-check support. areaServed describes service availability and request coverage, not local offices or guaranteed licensure.",
  email: "info@apexgrideng.com",
  priceRange: "$$",
  currenciesAccepted: "USD",
  areaServed: serviceAreas,
  additionalProperty: [
    {
      "@type": "PropertyValue",
      name: "Coverage basis",
      value: "Service availability and request coverage; confirm individual license, firm authorization, discipline, and AHJ requirements per project.",
    },
    ...(verifiedBtr
      ? [
          {
            "@type": "PropertyValue",
            name: "Arizona BTR business registration",
            value: verifiedBtr.businessRegistration!.registrationNumber,
          },
          {
            "@type": "PropertyValue",
            name: "Arizona responsible professional",
            value: `${verifiedBtr.responsibleProfessional!.name} — ${verifiedBtr.responsibleProfessional!.profession}, ${verifiedBtr.responsibleProfessional!.discipline}, license ${verifiedBtr.responsibleProfessional!.licenseNumber}`,
          },
        ]
      : []),
  ],
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