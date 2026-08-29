import type { Campaign, OutreachMessage, Prospect } from "@workspace/db";
import { assertOutreachContactData } from "./outreachContactValidation";

const EXCLUDED_OUTREACH_CONTACTS = new Map([
  ["atmosphere architects", new Set(["tim boyle", "mike hudson"])],
]);

function normalizeIdentity(value: string): string {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

export function isOutreachContactExcluded(
  prospect: Pick<Prospect, "companyName" | "contactName">,
): boolean {
  const company = normalizeIdentity(prospect.companyName);
  const contact = prospect.contactName ? normalizeIdentity(prospect.contactName) : "";
  for (const [excludedCompany, excludedContacts] of EXCLUDED_OUTREACH_CONTACTS) {
    if (company.includes(excludedCompany) && excludedContacts.has(contact)) return true;
  }
  return false;
}

export function assertOutreachEligibilityBase(
  message: OutreachMessage,
  prospect: Prospect,
  campaign: Campaign | undefined,
  options: {
    requireApprovedMessage?: boolean;
    requireApprovedProspect?: boolean;
  } = {},
): string {
  if (isOutreachContactExcluded(prospect)) {
    throw new Error("Contact is excluded from outreach per client relationship");
  }
  if (prospect.contactStatus !== "active") {
    throw new Error("Contact has reply, availability, or replacement evidence requiring review");
  }
  assertOutreachContactData(prospect);
  if (options.requireApprovedMessage !== false && message.status !== "approved") {
    throw new Error("Message must be approved before sending");
  }
  if (options.requireApprovedProspect !== false && !["approved", "contacted"].includes(prospect.status)) {
    throw new Error("Prospect must be approved before sending");
  }
  if (prospect.fitScore < 60 || prospect.needScore < 60 || !prospect.needSignals?.trim()) {
    throw new Error("Prospect does not have enough evidence of current need");
  }
  if (!prospect.contactName?.trim() || !prospect.contactTitle?.trim() || prospect.contactConfidence !== "high") {
    throw new Error("A high-confidence named decision-maker is required");
  }
  if (!prospect.contactSourceUrl?.trim()) throw new Error("A public source for the named contact is required");
  if (prospect.emailStatus !== "verified") throw new Error("Prospect email must be verified before sending");
  if (campaign) {
    if (campaign.status !== "active") throw new Error("Campaign must be active before sending");
    if (
      (campaign.audience !== "mixed" && campaign.audience !== prospect.audience)
      || !campaign.states.includes(prospect.state)
    ) {
      throw new Error("Campaign targeting does not match the prospect");
    }
  }
  return prospect.contactEmail!.trim().toLowerCase();
}

export function assertSequenceDeliveryReady(sequenceNumber: number, previousStatus?: string): void {
  if (sequenceNumber > 1 && previousStatus !== "delivered") {
    throw new Error("Previous sequence message must be delivered before this follow-up can send");
  }
}

export function assertScheduledTimeReady(
  sequenceNumber: number,
  scheduledAt: Date | null,
  now = new Date(),
): void {
  if (sequenceNumber > 1) {
    if (!scheduledAt) throw new Error("Follow-up must have a scheduled send time");
    if (scheduledAt.getTime() > now.getTime()) {
      throw new Error("Follow-up cannot send before its scheduled time");
    }
  }
}

const FOLLOW_UP_DELAY_DAYS: Record<number, number> = { 2: 3, 3: 8, 4: 15 };

export function getFollowUpScheduledAt(sequenceNumber: number, baseDate = new Date()): Date | null {
  const days = FOLLOW_UP_DELAY_DAYS[sequenceNumber];
  return days ? new Date(baseDate.getTime() + days * 24 * 60 * 60 * 1000) : null;
}

export function getNextPhoenixEightAm(now = new Date()): Date {
  const dateParts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Phoenix",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const values = Object.fromEntries(dateParts.map((part) => [part.type, part.value]));
  const todayAtEight = new Date(`${values.year}-${values.month}-${values.day}T08:00:00-07:00`);
  return todayAtEight.getTime() > now.getTime()
    ? todayAtEight
    : new Date(todayAtEight.getTime() + 24 * 60 * 60 * 1000);
}

export function getPhoenixCalendarDayStart(now = new Date()): Date {
  const dateParts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Phoenix",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const values = Object.fromEntries(dateParts.map((part) => [part.type, part.value]));
  return new Date(`${values.year}-${values.month}-${values.day}T00:00:00-07:00`);
}
