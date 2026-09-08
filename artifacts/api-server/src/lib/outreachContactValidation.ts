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

export type OutreachPreflightProspect = {
  companyName: string;
  contactEmail: string | null;
  website: string | null;
  dedupeKey?: string | null;
  contactStatus?: string | null;
};

export type OutreachPreflightConflict = {
  companyName: string;
  contactEmail: string;
  domain: string;
  conflicts: Array<"email" | "domain" | "suppression">;
  conflictingCompanies: string[];
};

export type OutreachPreflightReport = {
  label: string;
  target: number;
  total: number;
  usableCount: number;
  replacementsNeeded: number;
  conflicts: OutreachPreflightConflict[];
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

export function evaluateVerifiedOutreachPreflight(options: {
  label: string;
  target: number;
  contacts: readonly VerifiedBatchContactValidationInput[];
  activeProspects: readonly OutreachPreflightProspect[];
  suppressedEmails: readonly string[];
}): OutreachPreflightReport {
  const prospectEmails = new Map<string, OutreachPreflightProspect[]>();
  const prospectDomains = new Map<string, OutreachPreflightProspect[]>();
  for (const prospect of options.activeProspects) {
    const email = normalizedText(prospect.contactEmail).toLowerCase();
    if (email) prospectEmails.set(email, [...(prospectEmails.get(email) ?? []), prospect]);
    if (prospect.website && isPublicHttpUrl(prospect.website)) {
      const domain = hostname(prospect.website);
      prospectDomains.set(domain, [...(prospectDomains.get(domain) ?? []), prospect]);
    }
  }
  const suppressions = new Set(options.suppressedEmails.map((email) => normalizedText(email).toLowerCase()));
  const conflicts: OutreachPreflightConflict[] = [];

  for (const contact of options.contacts) {
    const contactEmail = normalizedText(contact.contactEmail).toLowerCase();
    const domain = hostname(normalizedText(contact.website));
    const dedupeKey = normalizedText(contact.dedupeKey).toLowerCase();
    const emailMatches = (prospectEmails.get(contactEmail) ?? []).filter(
      (prospect) => normalizedText(prospect.dedupeKey).toLowerCase() !== dedupeKey,
    );
    const domainMatches = (prospectDomains.get(domain) ?? []).filter(
      (prospect) => normalizedText(prospect.dedupeKey).toLowerCase() !== dedupeKey,
    );
    const kinds: OutreachPreflightConflict["conflicts"] = [];
    const conflictingCompanies = new Set<string>();
    for (const prospect of emailMatches) conflictingCompanies.add(prospect.companyName);
    for (const prospect of domainMatches) conflictingCompanies.add(prospect.companyName);
    if (emailMatches.length > 0) kinds.push("email");
    if (domainMatches.length > 0) kinds.push("domain");
    if (suppressions.has(contactEmail)) kinds.push("suppression");
    if (kinds.length > 0) {
      conflicts.push({
        companyName: normalizedText(contact.companyName),
        contactEmail,
        domain,
        conflicts: kinds,
        conflictingCompanies: [...conflictingCompanies].sort(),
      });
    }
  }

  const usableCount = options.contacts.length - conflicts.length;
  return {
    label: options.label,
    target: options.target,
    total: options.contacts.length,
    usableCount,
    replacementsNeeded: Math.max(0, options.target - usableCount),
    conflicts,
  };
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
