export type OutreachContactValidationInput = {
  companyName: unknown;
  contactEmail: unknown;
  sourceUrl: unknown;
};

export type VerifiedBatchContactValidationInput = OutreachContactValidationInput & {
  dedupeKey: unknown;
  website: unknown;
  contactName: unknown;
  contactTitle: unknown;
  contactSourceUrl: unknown;
};

export type VerifiedHotMarketContactValidationInput =
  VerifiedBatchContactValidationInput & {
    emailSourceUrl: unknown;
    projectEvidenceUrl?: unknown;
  };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const INVALID_TEXT_VALUES = new Set([
  "[object object]",
  "null",
  "undefined",
  "none",
  "n/a",
  "na",
]);
const PLACEHOLDER_EMAILS = new Set([
  "info@company.com",
  "info@example.com",
  "test@example.com",
  "example@example.com",
]);

function normalizedText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function isUsableText(value: unknown): boolean {
  const normalized = normalizedText(value).toLowerCase();
  return Boolean(normalized) && !INVALID_TEXT_VALUES.has(normalized);
}

function isPublicHttpUrl(value: unknown): boolean {
  const normalized = normalizedText(value);
  if (!normalized) return false;
  try {
    const url = new URL(normalized);
    return ["http:", "https:"].includes(url.protocol)
      && Boolean(url.hostname)
      && !url.username
      && !url.password;
  } catch {
    return false;
  }
}

function hostname(value: string): string {
  return new URL(value).hostname.replace(/^www\./, "").toLowerCase();
}

export function isCompanyDomainEmail(emailValue: unknown, websiteValue: unknown): boolean {
  if (!isUsableBusinessEmail(emailValue) || !isPublicHttpUrl(websiteValue)) return false;
  try {
    const emailDomain = normalizedText(emailValue).toLowerCase().split("@")[1] ?? "";
    const siteDomain = hostname(normalizedText(websiteValue));
    return emailDomain === siteDomain || emailDomain.endsWith(`.${siteDomain}`);
  } catch {
    return false;
  }
}

export function isUsableBusinessEmail(value: unknown): boolean {
  const email = normalizedText(value).toLowerCase();
  if (!EMAIL_PATTERN.test(email) || INVALID_TEXT_VALUES.has(email)) return false;
  return !PLACEHOLDER_EMAILS.has(email);
}

export function findOutreachContactValidationIssues(
  contact: OutreachContactValidationInput,
): string[] {
  const issues: string[] = [];
  if (!isUsableText(contact.companyName)) issues.push("usable company name");
  if (!isUsableBusinessEmail(contact.contactEmail)) issues.push("real business email");
  if (!isPublicHttpUrl(contact.sourceUrl)) issues.push("public source URL");
  return issues;
}

export function assertOutreachContactData(
  contact: OutreachContactValidationInput,
): void {
  const issues = findOutreachContactValidationIssues(contact);
  if (issues.length > 0) {
    throw new Error(`Prospect requires ${issues.join(", ")}`);
  }
}

export function assertVerifiedOutreachBatch(
  contacts: readonly VerifiedBatchContactValidationInput[],
  expectedCount = contacts.length,
): void {
  if (contacts.length !== expectedCount) {
    throw new Error(`Verified library requires exactly ${expectedCount} contacts; found ${contacts.length}`);
  }
  const emails = new Set<string>();
  const dedupeKeys = new Set<string>();
  const websites = new Set<string>();

  for (const contact of contacts) {
    assertOutreachContactData(contact);
    if (!isUsableText(contact.contactName)) throw new Error("Verified batch contact requires a named contact");
    if (!isUsableText(contact.contactTitle)) throw new Error("Verified batch contact requires a contact title");
    if (!isPublicHttpUrl(contact.website)) throw new Error("Verified batch contact requires a website");
    if (!isPublicHttpUrl(contact.contactSourceUrl)) {
      throw new Error("Verified batch contact requires a public contact source URL");
    }
    if (!isUsableText(contact.dedupeKey)) throw new Error("Verified batch contact requires a dedupe key");

    const email = normalizedText(contact.contactEmail).toLowerCase();
    const dedupeKey = normalizedText(contact.dedupeKey).toLowerCase();
    const website = new URL(normalizedText(contact.website)).hostname.replace(/^www\./, "").toLowerCase();
    if (emails.has(email)) throw new Error(`Verified batch contains duplicate email ${email}`);
    if (dedupeKeys.has(dedupeKey)) throw new Error(`Verified batch contains duplicate key ${dedupeKey}`);
    if (websites.has(website)) throw new Error(`Verified batch contains duplicate company website ${website}`);
    emails.add(email);
    dedupeKeys.add(dedupeKey);
    websites.add(website);
  }
}

export function assertVerifiedHotMarketContact(
  contact: VerifiedHotMarketContactValidationInput,
): void {
  assertVerifiedOutreachBatch([contact], 1);
  if (!isPublicHttpUrl(contact.emailSourceUrl)) {
    throw new Error("Hot-market contact requires a public email evidence URL");
  }
  if (contact.projectEvidenceUrl !== undefined && !isPublicHttpUrl(contact.projectEvidenceUrl)) {
    throw new Error("Hot-market contact requires a public project evidence URL");
  }
  if (!isCompanyDomainEmail(contact.contactEmail, contact.website)) {
    throw new Error("Hot-market contact requires a company-domain email");
  }
}
