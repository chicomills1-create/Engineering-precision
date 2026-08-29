import consolidated from "../../../../.agents/outputs/final-consolidated-new-leads.json";
import finalRecovery from "../../../../.agents/outputs/targeted-email-results-5.json";
import finalTwo from "../../../../.agents/outputs/targeted-email-results-6.json";
import duplicateReplacement from "../../../../.agents/outputs/targeted-email-results-7.json";
import domainReplacement from "../../../../.agents/outputs/targeted-email-results-8.json";

type RawContact = {
  audience?: string;
  city?: string;
  company?: string;
  companyName?: string;
  domain?: string;
  email?: string;
  name?: string;
  title?: string;
  providerJobTitle?: string;
  sourceUrl?: string;
  officialUrl?: string;
  companySourceUrl?: string;
  personSourceUrl?: string;
  needSignals?: string;
  companyEvidence?: string;
  fitSignal?: string;
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

function normalizeContact(raw: RawContact) {
  const companyName = raw.companyName ?? raw.company ?? "";
  const contactName = raw.name ?? "";
  const contactTitle = raw.title ?? raw.providerJobTitle ?? "";
  const contactEmail = raw.email?.trim().toLowerCase() ?? "";
  const domain = raw.domain ?? contactEmail.split("@")[1] ?? "";
  const sourceUrl = secureUrl(
    raw.sourceUrl ?? raw.personSourceUrl ?? raw.officialUrl ?? `https://${domain}`,
  );
  const website = `https://${domain}`;
  const needSignals = (
    raw.needSignals
    ?? raw.companyEvidence
    ?? raw.fitSignal
    ?? "Public evidence shows active commercial architecture or general contracting work."
  ).replace(/\s*\[L\d+(?:-L?\d+)?(?:,\s*L?\d+)*\]\.?/g, ".");

  return {
    dedupeKey: `verified-2026-08-29-${slug(companyName)}-${slug(contactName)}`,
    companyName,
    website,
    city: raw.city ?? "Unknown",
    audience: /architect/i.test(raw.audience ?? "") ? "architect" : "builder",
    contactName,
    contactTitle,
    contactEmail,
    contactSourceUrl: sourceUrl,
    sourceUrl,
    needSignals,
  } as const;
}

const rawContacts: RawContact[] = [
  ...consolidated.leads,
  ...finalRecovery.results,
  ...finalTwo.results,
  ...duplicateReplacement.results,
  ...domainReplacement.results,
].filter((contact) => {
  const email = contact.email?.toLowerCase();
  return email !== "jill@triarcdesign.com" && email !== "breed@armays.com";
});

export const VERIFIED_OUTREACH_CONTACTS_AUG_29 = rawContacts.map(normalizeContact);