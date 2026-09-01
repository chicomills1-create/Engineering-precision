import publicFallbacks from "../../../../.agents/outputs/sep02-public-fallback-contacts.json";

type RawPublicContact = {
  audience: string;
  city: string;
  companyName: string;
  contactEmail: string;
  contactName: string;
  contactSourceUrl: string;
  contactTitle: string;
  emailEvidenceUrl: string;
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

export const VERIFIED_OUTREACH_CONTACTS_SEP_02_PUBLIC = (
  publicFallbacks as RawPublicContact[]
).map((raw) => ({
  dedupeKey: `public-verified-2026-09-02-${slug(raw.companyName)}`,
  companyName: raw.companyName.trim(),
  website: secureUrl(raw.website),
  city: raw.city.trim(),
  state: raw.state === "AZ" ? "AZ" : "CA",
  audience: raw.audience === "architect" ? "architect" : "builder",
  contactName: raw.contactName.trim(),
  contactTitle: raw.contactTitle.trim(),
  contactEmail: raw.contactEmail.trim().toLowerCase(),
  contactSourceUrl: secureUrl(raw.contactSourceUrl),
  sourceUrl: secureUrl(raw.sourceUrl),
  needSignals: (Array.isArray(raw.needSignals)
    ? raw.needSignals.join("; ")
    : raw.needSignals).trim(),
  emailLane: "public",
  emailEvidence: secureUrl(raw.emailEvidenceUrl),
  approvalStatus: "approved",
}) as const);