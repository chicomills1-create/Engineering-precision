import qualified from "../../../../.agents/outputs/task146-qualified-preverify.json";
import arizonaPublic from "../../../../.agents/outputs/task146-public-az-commercial-builders.json";
import californiaPublic from "../../../../.agents/outputs/task146-public-ca-commercial-builders.json";

type RawContact = {
  audience: string;
  city: string;
  companyName: string;
  contactEmail: string;
  contactName: string;
  contactSourceUrl: string;
  contactTitle: string;
  domain?: string;
  emailEvidenceUrl?: string;
  emailLane?: string;
  needSignals: string | string[];
  sourceUrl: string;
  state?: string;
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

function domainOf(contact: RawContact): string {
  return (contact.domain ?? new URL(contact.website).hostname)
    .replace(/^www\./, "")
    .toLowerCase();
}

function normalizeContact(raw: RawContact) {
  const state = raw.state === "CA" ? "CA" : "AZ";
  const website = secureUrl(raw.website);
  return {
    dedupeKey: `verified-2026-08-30-${slug(raw.companyName)}-${slug(raw.contactName)}`,
    companyName: raw.companyName.trim(),
    website,
    city: raw.city.trim(),
    state,
    audience: raw.audience === "architect" ? "architect" : "builder",
    contactName: raw.contactName.trim(),
    contactTitle: raw.contactTitle.trim(),
    contactEmail: raw.contactEmail.trim().toLowerCase(),
    contactSourceUrl: secureUrl(raw.contactSourceUrl),
    sourceUrl: secureUrl(raw.sourceUrl),
    needSignals: (Array.isArray(raw.needSignals)
      ? raw.needSignals.join("; ")
      : raw.needSignals).trim(),
    emailLane: raw.emailLane === "personal" ? "personal" : "public",
    emailEvidence: raw.emailLane === "personal"
      ? "FindyMail verified name/domain lookup"
      : secureUrl(raw.emailEvidenceUrl ?? raw.sourceUrl),
    approvalStatus: "approved",
  } as const;
}

const candidates = [
  ...(qualified as RawContact[]),
  ...(arizonaPublic as RawContact[]).map((contact) => ({ ...contact, emailLane: "public" })),
  ...(californiaPublic as RawContact[]).map((contact) => ({ ...contact, emailLane: "public" })),
];

const emails = new Set<string>();
const domains = new Set<string>();
const unique = candidates.filter((contact) => {
  const email = contact.contactEmail.trim().toLowerCase();
  const domain = domainOf(contact);
  if (emails.has(email) || domains.has(domain)) return false;
  emails.add(email);
  domains.add(domain);
  return true;
});

unique.sort((left, right) => {
  const state = Number((left.state ?? "AZ") !== "AZ") - Number((right.state ?? "AZ") !== "AZ");
  if (state !== 0) return state;
  return Number(left.emailLane !== "personal") - Number(right.emailLane !== "personal");
});

export const VERIFIED_OUTREACH_CONTACTS_AUG_30 = unique
  .map(normalizeContact);