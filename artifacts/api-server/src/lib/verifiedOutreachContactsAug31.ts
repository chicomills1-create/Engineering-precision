import qualified from "../../../../.agents/outputs/aug31-qualified-preverify.json";

type RawContact = {
  audience: string;
  city: string;
  companyName: string;
  contactEmail: string;
  contactName: string;
  contactSourceUrl: string;
  contactTitle: string;
  emailLane?: string;
  needSignals: string | string[];
  sourceUrl: string;
  state: string;
  website: string;
};

function secureUrl(value: string): string {
  return value.replace(/^http:\/\//i, "https://");
}

function slug(value: string): string {
  return value.toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 54);
}

export const VERIFIED_OUTREACH_CONTACTS_AUG_31 = (qualified as RawContact[])
  .map((raw) => ({
    dedupeKey: `verified-2026-08-31-${slug(raw.companyName)}-${slug(raw.contactName)}`,
    companyName: raw.companyName.trim(),
    website: secureUrl(raw.website),
    city: raw.city.trim(),
    state: raw.state === "CA" ? "CA" : "AZ",
    audience: raw.audience === "architect" ? "architect" : "builder",
    contactName: raw.contactName.trim(),
    contactTitle: raw.contactTitle.trim(),
    contactEmail: raw.contactEmail.trim().toLowerCase(),
    contactSourceUrl: secureUrl(raw.contactSourceUrl),
    sourceUrl: secureUrl(raw.sourceUrl),
    needSignals: (Array.isArray(raw.needSignals)
      ? raw.needSignals.join("; ")
      : raw.needSignals).trim(),
    emailLane: "personal",
    emailEvidence: "FindyMail verified name/domain lookup",
    approvalStatus: "approved",
  }) as const);