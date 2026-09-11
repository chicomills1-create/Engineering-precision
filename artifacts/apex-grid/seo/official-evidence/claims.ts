/** Official evidence register for licensing and business-identity claims. */
export const OFFICIAL_EVIDENCE_REVIEW_DATE = "2026-09-11";

export const OFFICIAL_EVIDENCE = {
  arizonaCorporations: {
    label: "Arizona Corporation Commission — Corporations",
    url: "https://azcc.gov/corporations",
  },
  arizonaBusinessSearch: {
    label: "Arizona Corporation Commission — Business Search",
    url: "https://arizonabusinesscenter.azcc.gov/businesssearch",
  },
  arizonaBtrAbout: {
    label: "Arizona Board of Technical Registration — About",
    url: "https://btr.az.gov/about",
  },
  arizonaBtrHome: {
    label: "Arizona Board of Technical Registration",
    url: "https://btr.az.gov/",
  },
  arizonaBtrLicensePortal: {
    label: "Arizona Board of Technical Registration — License Search",
    url: "https://azbtr.portalus.thentiacloud.net/webs/portal/register/#/",
  },
  nceesLicensure: {
    label: "NCEES — Licensure",
    url: "https://ncees.org/licensure/",
  },
  nceesBoardDirectory: {
    label: "NCEES — Engineering Licensing Boards",
    url: "https://ncees.org/licensing-boards",
  },
  nceesVerificationFaq: {
    label: "NCEES — Verification FAQ",
    url: "https://help.ncees.org/article/68-license-verification-faqs",
  },
  ncarbBoards: {
    label: "NCARB — Licensing Requirements Tool",
    url: "https://www.ncarb.org/get-licensed/licensing-requirements-tool",
  },
  sbaVetCert: {
    label: "U.S. Small Business Administration — Veteran Small Business Certification",
    url: "https://veterans.certify.sba.gov/",
  },
  samEntitySearch: {
    label: "SAM.gov — Entity Information",
    url: "https://sam.gov/content/entity-information",
  },
} as const;

/**
 * Captured result of the official identity review.
 *
 * These are negative search findings, not proof that no registration exists.
 * A matching detail record or filing must be saved before publishing an ACC
 * entity ID, legal name, entity status, BTR business registration, responsible
 * professional, or regulator-sourced address.
 */
export const ARIZONA_IDENTITY_REVIEW = {
  corporationCommission: {
    searchedNames: ["Apex Grid", "Apex Grid Engineering", "Jeremy Mills"],
    matchingEntityCaptured: false,
    legalName: null,
    entityId: null,
    status: null,
    filings: [],
  },
  boardOfTechnicalRegistration: {
    searchedNames: ["Apex Grid", "Apex Grid Engineering", "Jeremy Mills"],
    matchingBusinessRegistrationCaptured: false,
    businessRegistration: null,
    responsibleProfessional: null,
  },
  contactRecord: {
    streetAddress: "22475 E Quintero Rd",
    locality: "Queen Creek, AZ 85142",
    telephone: "(480) 490-0064",
    evidenceBasis: "Business-provided contact information",
    officialAddressType: null,
    note: "Do not describe this as an ACC known place of business, statutory-agent address, mailing address, BTR address, or headquarters until a matching official record is captured.",
  },
} as const;

export const LICENSING_CLAIM =
  "Apex Grid is a multi-state engineering team. Service availability and stamping are confirmed per project only after the responsible individual license, firm authorization, discipline, and authority-having-jurisdiction requirements are verified.";

export const EVIDENCE_LIMITATION =
  "Official sources explain regulator and process requirements; no matching ACC entity detail or Arizona BTR business/responsible-professional record was captured for Apex Grid. The review therefore does not independently verify a legal entity name, entity ID or status, relevant filings, Arizona firm registration, named-license mapping, street address, phone, coordinates, claimed state count, architect credentials, SDVOSB certification, or SAM.gov registration.";
