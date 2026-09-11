export const APPROVED_PUBLIC_INBOX_LOCAL_PARTS = new Set([
  "info", "estimating", "bids", "proposals", "procurement", "preconstruction",
  "businessdevelopment", "development", "construction", "projects", "contact", "office", "admin",
]);

/** Public only when evidence identifies an official published role mailbox. */
export function isEvidenceBackedPublicInbox(email: string | null, contactName: string | null, evidenceType?: string | null): boolean {
  const local = email?.trim().toLowerCase().split("@")[0] ?? "";
  if (!APPROVED_PUBLIC_INBOX_LOCAL_PARTS.has(local) || evidenceType !== "official_publication") return false;
  const name = contactName?.trim().toLowerCase().replace(/[^a-z]/g, "") ?? "";
  return !name || name === local.replace(/[^a-z]/g, "") || /(?:office|desk|inquiries)$/.test(name);
}