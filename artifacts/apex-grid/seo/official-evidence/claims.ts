/** Official evidence register for licensing and business-identity claims. */
export const OFFICIAL_EVIDENCE_REVIEW_DATE = "2026-09-10";

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

export const LICENSING_CLAIM =
  "Apex Grid is a multi-state engineering team. Service availability and stamping are confirmed per project only after the responsible individual license, firm authorization, discipline, and authority-having-jurisdiction requirements are verified.";

export const EVIDENCE_LIMITATION =
  "Official sources explain regulator and process requirements; the records reviewed do not independently verify Apex Grid's claimed state count, project-specific direct licensure, firm registrations, named-license mappings, architect credentials, SDVOSB certification, SAM.gov registration, street address, phone, or coordinates.";
