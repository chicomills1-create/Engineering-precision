/** Official evidence register for licensing and business-identity claims. */
export const OFFICIAL_EVIDENCE_REVIEW_INTERVAL_DAYS = 90;

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

type OfficialCapture = {
  sourceUrl: string;
  capturedAt: string;
  capturePath: string | null;
};

export type ArizonaIdentityReview = {
  reviewedAt: string;
  supersededAt: string | null;
  reviewer: string;
  corporationCommission: {
    searchedNames: readonly string[];
    matchingEntityCaptured: boolean;
    officialEntityName: string | null;
    entityId: string | null;
    entityType: string | null;
    status: string | null;
    statusDate: string | null;
    knownPlaceOfBusiness: string | null;
    statutoryAgent: string | null;
    latestFilingType: string | null;
    latestFilingDate: string | null;
    filings: readonly {
      type: string;
      filedAt: string;
      capture: OfficialCapture;
    }[];
    capture: OfficialCapture | null;
  };
  boardOfTechnicalRegistration: {
    searchedNames: readonly string[];
    matchingBusinessRegistrationCaptured: boolean;
    businessRegistration: {
      registrationNumber: string;
      registeredName: string;
      status: string;
      statusDate: string | null;
      expirationDate: string | null;
      disciplines: readonly string[];
    } | null;
    responsibleProfessional: {
      name: string;
      licenseNumber: string;
      profession: string;
      discipline: string;
      status: string;
      expirationDate: string | null;
    } | null;
    businessCapture: OfficialCapture | null;
    responsibleProfessionalCapture: OfficialCapture | null;
  };
};

/**
 * Append each manual review and retain its official capture paths. Never replace
 * a prior entry: mark it superseded when a later review is recorded.
 *
 * A search with no matching detail record is a negative finding, not proof that
 * no registration exists. capturePath must point to a preserved official PDF,
 * image, or HTML export before an identity field can be published.
 */
export const ARIZONA_IDENTITY_REVIEW_HISTORY: readonly ArizonaIdentityReview[] = [
  {
    reviewedAt: "2026-09-11",
    supersededAt: null,
    reviewer: "Replit Agent",
    corporationCommission: {
      searchedNames: ["Apex Grid", "Apex Grid Engineering", "Jeremy Mills"],
      matchingEntityCaptured: false,
      officialEntityName: null,
      entityId: null,
      entityType: null,
      status: null,
      statusDate: null,
      knownPlaceOfBusiness: null,
      statutoryAgent: null,
      latestFilingType: null,
      latestFilingDate: null,
      filings: [],
      capture: null,
    },
    boardOfTechnicalRegistration: {
      searchedNames: ["Apex Grid", "Apex Grid Engineering", "Jeremy Mills"],
      matchingBusinessRegistrationCaptured: false,
      businessRegistration: null,
      responsibleProfessional: null,
      businessCapture: null,
      responsibleProfessionalCapture: null,
    },
  },
] as const;

export const ARIZONA_IDENTITY_REVIEW =
  ARIZONA_IDENTITY_REVIEW_HISTORY[ARIZONA_IDENTITY_REVIEW_HISTORY.length - 1];
export const OFFICIAL_EVIDENCE_REVIEW_DATE = ARIZONA_IDENTITY_REVIEW.reviewedAt;

const ACTIVE_OFFICIAL_STATUSES = new Set(["active", "current", "good standing"]);

function addUtcDays(isoDate: string, days: number) {
  const date = new Date(`${isoDate}T00:00:00.000Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date;
}

function isUnexpired(isoDate: string | null, asOf: Date) {
  if (isoDate === null) return false;
  const expiration = new Date(`${isoDate}T00:00:00.000Z`);
  return !Number.isNaN(expiration.getTime()) && asOf < expiration;
}

export function evaluateArizonaIdentityReview(
  review: ArizonaIdentityReview,
  asOf: Date,
) {
  const reviewIsCurrent =
    review.supersededAt === null &&
    asOf < addUtcDays(review.reviewedAt, OFFICIAL_EVIDENCE_REVIEW_INTERVAL_DAYS);
  const acc = review.corporationCommission;
  const btr = review.boardOfTechnicalRegistration;
  const accIsPublishable =
    reviewIsCurrent &&
    acc.matchingEntityCaptured &&
    acc.capture?.capturePath != null &&
    acc.officialEntityName != null &&
    acc.entityId != null &&
    acc.status != null &&
    ACTIVE_OFFICIAL_STATUSES.has(acc.status.toLowerCase());
  const businessStatus = btr.businessRegistration?.status;
  const professionalStatus = btr.responsibleProfessional?.status;
  const btrIsPublishable =
    reviewIsCurrent &&
    btr.matchingBusinessRegistrationCaptured &&
    btr.businessCapture?.capturePath != null &&
    btr.responsibleProfessionalCapture?.capturePath != null &&
    businessStatus != null &&
    professionalStatus != null &&
    ACTIVE_OFFICIAL_STATUSES.has(businessStatus.toLowerCase()) &&
    ACTIVE_OFFICIAL_STATUSES.has(professionalStatus.toLowerCase()) &&
    isUnexpired(btr.businessRegistration?.expirationDate ?? null, asOf) &&
    isUnexpired(btr.responsibleProfessional?.expirationDate ?? null, asOf);

  return {
    reviewIsCurrent,
    nextReviewDueAt: addUtcDays(
      review.reviewedAt,
      OFFICIAL_EVIDENCE_REVIEW_INTERVAL_DAYS,
    )
      .toISOString()
      .slice(0, 10),
    corporationCommission: accIsPublishable ? acc : null,
    boardOfTechnicalRegistration: btrIsPublishable ? btr : null,
  };
}

export function getPublishableArizonaIdentity(asOf = new Date()) {
  return evaluateArizonaIdentityReview(ARIZONA_IDENTITY_REVIEW, asOf);
}

export const LICENSING_CLAIM =
  "Apex Grid Engineering is licensed in 49 states — every U.S. state except Alaska. Engineering stamping and licensure are confirmed for each project jurisdiction.";

export const EVIDENCE_LIMITATION =
  "Official sources explain regulator and process requirements; no matching ACC entity detail or Arizona BTR business/responsible-professional record was captured for Apex Grid. The review therefore does not independently verify a legal entity name, entity ID or status, relevant filings, Arizona firm registration, named-license mapping, street address, phone, coordinates, claimed state count, architect credentials, SDVOSB certification, or SAM.gov registration.";
