import qualified from "../../../../.agents/outputs/sep05-regular-final-verified.json";

type RawContact = {
  audience: string;
  city: string;
  companyName: string;
  contactEmail: string;
  contactName: string;
  contactSourceUrl: string;
  contactTitle: string;
  needSignals: string;
  sourceUrl: string;
  state: string;
  website: string;
};

function slug(value: string): string {
  return value.toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 54);
}

export const VERIFIED_OUTREACH_CONTACTS_SEP_05 = (qualified as RawContact[])
  .map((raw) => ({
    dedupeKey: `verified-2026-09-05-${slug(raw.companyName)}-${slug(raw.contactName)}`,
    companyName: raw.companyName.trim(),
    website: raw.website,
    city: raw.city.trim(),
    state: raw.state.trim().toUpperCase(),
    audience: raw.audience === "architect" ? "architect" : "builder",
    contactName: raw.contactName.trim(),
    contactTitle: raw.contactTitle.trim(),
    contactEmail: raw.contactEmail.trim().toLowerCase(),
    contactSourceUrl: raw.contactSourceUrl,
    sourceUrl: raw.sourceUrl,
    needSignals: raw.needSignals.trim(),
    emailLane: "personal",
    emailEvidence: "FindyMail verified name/domain lookup",
    approvalStatus: "approved",
  }) as const);