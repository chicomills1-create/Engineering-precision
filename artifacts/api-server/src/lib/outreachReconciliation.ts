import { ReplitConnectors } from "@replit/connectors-sdk";
import { and, asc, desc, eq, inArray, or } from "drizzle-orm";
import {
  db,
  outreachDeliveryEventsTable,
  outreachMessagesTable,
  outreachMonthlySendReservationsTable,
  outreachSendReservationsTable,
  outreachSequenceSendClaimsTable,
  prospectsTable,
  type OutreachDeliveryEvent,
  type OutreachMessage,
} from "@workspace/db";
import { suppressOutreachEmail } from "./outreachSuppression";

const ACCEPTED_EVENT_TYPES = new Set(["processed", "deferred", "delivered"]);
const REJECTED_EVENT_TYPES = new Set(["bounce", "blocked", "dropped"]);
const RETRY_RELEASE_EVENT_TYPE = "reconciliation_retry_released";
const DEFAULT_REVIEW_AFTER_MS = 15 * 60 * 1000;
const DEFAULT_MAX_LOOKUPS = 5;
const SENDGRID_ACTIVITY_TIMEOUT_MS = 10_000;

type SendGridActivityMessage = {
  msg_id?: string;
  status?: string;
  last_event_time?: string;
  events?: Array<string | { event_name?: string; event?: string; reason?: string; response?: string }>;
};
type SendGridActivityEvent = NonNullable<SendGridActivityMessage["events"]>[number];

type SendGridActivityResponse = {
  messages?: SendGridActivityMessage[];
};

export type ProviderActivityOutcome =
  | {
      state: "accepted";
      providerMessageId: string | null;
      occurredAt: Date;
      delivered: boolean;
      reason: string;
    }
  | {
      state: "not_accepted";
      providerMessageId: string | null;
      occurredAt: Date;
      reason: string;
    }
  | {
      state: "terminal_failure";
      providerMessageId: string | null;
      occurredAt: Date;
      eventType: "bounce" | "blocked" | "dropped";
      reason: string;
    }
  | {
      state: "ambiguous";
      reason: string;
    };

export type SendGridActivityLookup = (
  reconciliationKey: string,
) => Promise<ProviderActivityOutcome>;

export type OutreachReconciliationSummary = {
  checked: number;
  accepted: number;
  retryReleased: number;
  failed: number;
  ambiguous: number;
  waiting: number;
};

function eventName(event: SendGridActivityEvent): string {
  return (typeof event === "string" ? event : event.event_name ?? event.event ?? "")
    .trim()
    .toLowerCase();
}

function eventReason(event: SendGridActivityEvent): string | null {
  if (typeof event === "string") return null;
  return (event.reason ?? event.response ?? "").trim() || null;
}

function parseOccurredAt(value: string | undefined): Date {
  const parsed = value ? new Date(value) : new Date();
  return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
}

export function classifySendGridActivity(
  activity: SendGridActivityResponse,
): ProviderActivityOutcome {
  const messages = activity.messages ?? [];
  if (messages.length === 0) {
    return {
      state: "ambiguous",
      reason: "SendGrid activity has no matching record yet",
    };
  }

  const latest = [...messages].sort((left, right) =>
    parseOccurredAt(right.last_event_time).getTime() - parseOccurredAt(left.last_event_time).getTime()
  )[0]!;
  const status = latest.status?.trim().toLowerCase() ?? "";
  const events = latest.events ?? [];
  const names = events.map(eventName);
  const occurredAt = parseOccurredAt(latest.last_event_time);
  const providerMessageId = latest.msg_id?.trim() || null;

  if (status === "not_delivered" || names.some((name) => REJECTED_EVENT_TYPES.has(name))) {
    const rejection = events.find((event) => REJECTED_EVENT_TYPES.has(eventName(event)));
    const rejectionType = rejection ? eventName(rejection) : "dropped";
    return {
      state: "terminal_failure",
      providerMessageId,
      occurredAt,
      eventType: REJECTED_EVENT_TYPES.has(rejectionType)
        ? rejectionType as "bounce" | "blocked" | "dropped"
        : "dropped",
      reason: rejection
        ? eventReason(rejection) ?? "SendGrid activity confirms non-delivery"
        : "SendGrid activity confirms non-delivery",
    };
  }
  if (status === "delivered" || names.includes("delivered")) {
    return {
      state: "accepted",
      providerMessageId,
      occurredAt,
      delivered: true,
      reason: "SendGrid activity confirms delivery",
    };
  }
  if (
    ["processed", "processing"].includes(status)
    || names.some((name) => ACCEPTED_EVENT_TYPES.has(name))
  ) {
    return {
      state: "accepted",
      providerMessageId,
      occurredAt,
      delivered: false,
      reason: "SendGrid activity confirms provider acceptance",
    };
  }
  return {
    state: "ambiguous",
    reason: `SendGrid activity returned unresolved status "${status || "unknown"}"`,
  };
}

function escapeSendGridQueryValue(value: string): string {
  return value.replaceAll("\\", "\\\\").replaceAll('"', '\\"');
}

async function requestSendGridActivity(path: string): Promise<Response> {
  const dedicatedSendGridKey = process.env.SENDGRID_ISOLATION_VERIFIED === "true"
    ? process.env.SENDGRID_DEDICATED_API_KEY?.trim()
    : undefined;
  const sendgridSubuser = process.env.SENDGRID_SUBUSER_USERNAME?.trim();
  if (dedicatedSendGridKey) {
    return fetch(`https://api.sendgrid.com${path}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${dedicatedSendGridKey}` },
      signal: AbortSignal.timeout(SENDGRID_ACTIVITY_TIMEOUT_MS),
    });
  }
  return new ReplitConnectors().proxy("sendgrid", path, {
    method: "GET",
    headers: sendgridSubuser ? { "on-behalf-of": sendgridSubuser } : undefined,
  });
}

export const lookupSendGridActivity: SendGridActivityLookup = async (reconciliationKey) => {
  const query = `(unique_args['outreach_reconciliation_key']="${escapeSendGridQueryValue(reconciliationKey)}")`;
  const path = `/v3/messages?limit=10&query=${encodeURIComponent(query)}`;
  let response: Response;
  try {
    response = await Promise.race([
      requestSendGridActivity(path),
      new Promise<never>((_resolve, reject) => {
        const timer = setTimeout(
          () => reject(new Error("request timed out")),
          SENDGRID_ACTIVITY_TIMEOUT_MS,
        );
        timer.unref();
      }),
    ]);
  } catch (error) {
    const detail = error instanceof Error ? error.message : "request failed";
    return {
      state: "ambiguous",
      reason: `SendGrid activity lookup timed out or failed: ${detail}`,
    };
  }
  if (!response.ok) {
    return {
      state: "ambiguous",
      reason: `SendGrid activity lookup returned status ${response.status}`,
    };
  }
  try {
    return classifySendGridActivity(await response.json() as SendGridActivityResponse);
  } catch {
    return {
      state: "ambiguous",
      reason: "SendGrid activity lookup returned an invalid response",
    };
  }
};

function classifyRecordedEvents(
  events: OutreachDeliveryEvent[],
): ProviderActivityOutcome | null {
  const rejected = events.find((event) => REJECTED_EVENT_TYPES.has(event.eventType));
  if (rejected) {
    return {
      state: "terminal_failure",
      providerMessageId: rejected.providerMessageId,
      occurredAt: rejected.occurredAt,
      eventType: rejected.eventType as "bounce" | "blocked" | "dropped",
      reason: rejected.reason ?? "Recorded SendGrid event confirms non-delivery",
    };
  }
  const delivered = events.find((event) => event.eventType === "delivered");
  if (delivered) {
    return {
      state: "accepted",
      providerMessageId: delivered.providerMessageId,
      occurredAt: delivered.occurredAt,
      delivered: true,
      reason: "Recorded SendGrid event confirms delivery",
    };
  }
  const accepted = events.find((event) => ACCEPTED_EVENT_TYPES.has(event.eventType));
  if (accepted) {
    return {
      state: "accepted",
      providerMessageId: accepted.providerMessageId,
      occurredAt: accepted.occurredAt,
      delivered: false,
      reason: "Recorded SendGrid event confirms provider acceptance",
    };
  }
  return null;
}

async function applyAcceptedOutcome(
  message: OutreachMessage,
  outcome: Extract<ProviderActivityOutcome, { state: "accepted" }>,
): Promise<boolean> {
  const [updated] = await db.update(outreachMessagesTable)
    .set({
      status: outcome.delivered ? "delivered" : "sent",
      sentAt: outcome.occurredAt,
      providerMessageId: outcome.providerMessageId ?? undefined,
      error: null,
    })
    .where(and(
      eq(outreachMessagesTable.id, message.id),
      inArray(outreachMessagesTable.status, ["sending", "needs_review"]),
    ))
    .returning({ id: outreachMessagesTable.id });
  return Boolean(updated);
}

async function applyRejectedOutcome(
  message: OutreachMessage,
  email: string,
  outcome: Extract<ProviderActivityOutcome, { state: "not_accepted" }>,
): Promise<"retry_released" | "failed" | "unchanged"> {
  return db.transaction(async (tx) => {
    const [current] = await tx.select({ status: outreachMessagesTable.status })
      .from(outreachMessagesTable)
      .where(eq(outreachMessagesTable.id, message.id))
      .for("update");
    if (!current || !["sending", "needs_review"].includes(current.status)) return "unchanged";

    const [priorRetry] = await tx.select({ id: outreachDeliveryEventsTable.id })
      .from(outreachDeliveryEventsTable)
      .where(and(
        eq(outreachDeliveryEventsTable.outreachMessageId, message.id),
        eq(outreachDeliveryEventsTable.eventType, RETRY_RELEASE_EVENT_TYPE),
      ))
      .limit(1);

    await Promise.all([
      tx.delete(outreachSendReservationsTable)
        .where(eq(outreachSendReservationsTable.messageId, message.id)),
      tx.delete(outreachMonthlySendReservationsTable)
        .where(eq(outreachMonthlySendReservationsTable.messageId, message.id)),
      tx.delete(outreachSequenceSendClaimsTable)
        .where(eq(outreachSequenceSendClaimsTable.messageId, message.id)),
    ]);

    if (priorRetry) {
      await tx.update(outreachMessagesTable)
        .set({
          status: "failed",
          providerMessageId: outcome.providerMessageId ?? undefined,
          error: `SendGrid confirmed non-delivery after the one automatic retry: ${outcome.reason}`,
        })
        .where(eq(outreachMessagesTable.id, message.id));
      return "failed";
    }

    await tx.insert(outreachDeliveryEventsTable).values({
      providerMessageId: outcome.providerMessageId,
      email,
      eventType: RETRY_RELEASE_EVENT_TYPE,
      reason: outcome.reason,
      occurredAt: outcome.occurredAt,
      outreachMessageId: message.id,
      reconciliationKey: message.providerReconciliationKey,
    });
    await tx.update(outreachMessagesTable)
      .set({
        status: "approved",
        scheduledAt: new Date(),
        providerMessageId: null,
        error: `SendGrid confirmed non-delivery; released for one automatic retry: ${outcome.reason}`,
      })
      .where(eq(outreachMessagesTable.id, message.id));
    return "retry_released";
  });
}

async function applyTerminalFailure(
  message: OutreachMessage,
  email: string,
  outcome: Extract<ProviderActivityOutcome, { state: "terminal_failure" }>,
): Promise<boolean> {
  await suppressOutreachEmail(email, outcome.eventType, {
    pendingStatus: "bounced",
    pendingError: outcome.reason,
    emailStatus: "invalid",
  });
  const [updated] = await db.update(outreachMessagesTable)
    .set({
      status: "bounced",
      providerMessageId: outcome.providerMessageId ?? undefined,
      error: outcome.reason,
    })
    .where(and(
      eq(outreachMessagesTable.id, message.id),
      inArray(outreachMessagesTable.status, ["sending", "needs_review", "bounced"]),
    ))
    .returning({ id: outreachMessagesTable.id });
  return Boolean(updated);
}

export async function reconcileUncertainOutreachMessages(options: {
  now?: Date;
  reviewAfterMs?: number;
  maxLookups?: number;
  lookupActivity?: SendGridActivityLookup;
} = {}): Promise<OutreachReconciliationSummary> {
  const now = options.now ?? new Date();
  const reviewAfterMs = options.reviewAfterMs ?? DEFAULT_REVIEW_AFTER_MS;
  const maxLookups = options.maxLookups ?? DEFAULT_MAX_LOOKUPS;
  const lookupActivity = options.lookupActivity ?? lookupSendGridActivity;
  const summary: OutreachReconciliationSummary = {
    checked: 0,
    accepted: 0,
    retryReleased: 0,
    failed: 0,
    ambiguous: 0,
    waiting: 0,
  };
  const messages = await db.select({
    message: outreachMessagesTable,
    email: prospectsTable.contactEmail,
  })
    .from(outreachMessagesTable)
    .innerJoin(prospectsTable, eq(outreachMessagesTable.prospectId, prospectsTable.id))
    .where(inArray(outreachMessagesTable.status, ["sending", "needs_review"]))
    .orderBy(asc(outreachMessagesTable.updatedAt));

  let lookupCount = 0;
  for (const { message, email } of messages) {
    const events = await db.select().from(outreachDeliveryEventsTable)
      .where(or(
        eq(outreachDeliveryEventsTable.outreachMessageId, message.id),
        ...(message.providerReconciliationKey
          ? [eq(outreachDeliveryEventsTable.reconciliationKey, message.providerReconciliationKey)]
          : []),
      ))
      .orderBy(desc(outreachDeliveryEventsTable.occurredAt));
    let outcome = classifyRecordedEvents(events);

    if (!outcome) {
      if (
        message.status === "sending"
        && now.getTime() - message.updatedAt.getTime() < reviewAfterMs
      ) {
        summary.waiting += 1;
        continue;
      }
      summary.checked += 1;
      if (!message.providerReconciliationKey) {
        outcome = {
          state: "ambiguous",
          reason: "No stable SendGrid reconciliation key is stored; review provider activity manually",
        };
      } else if (lookupCount >= maxLookups) {
        summary.waiting += 1;
        summary.checked -= 1;
        continue;
      } else {
        lookupCount += 1;
        outcome = await lookupActivity(message.providerReconciliationKey);
      }
    } else {
      summary.checked += 1;
    }

    if (outcome.state === "accepted") {
      if (await applyAcceptedOutcome(message, outcome)) summary.accepted += 1;
      continue;
    }
    if (outcome.state === "terminal_failure") {
      if (await applyTerminalFailure(
        message,
        email?.trim().toLowerCase() || "unknown@example.invalid",
        outcome,
      )) {
        summary.failed += 1;
      }
      continue;
    }
    if (outcome.state === "not_accepted") {
      const applied = await applyRejectedOutcome(
        message,
        email?.trim().toLowerCase() || "unknown@example.invalid",
        outcome,
      );
      if (applied === "retry_released") summary.retryReleased += 1;
      if (applied === "failed") summary.failed += 1;
      continue;
    }

    const [updated] = await db.update(outreachMessagesTable)
      .set({
        status: "needs_review",
        error: `${outcome.reason}; retry remains blocked pending clear provider evidence`,
      })
      .where(and(
        eq(outreachMessagesTable.id, message.id),
        inArray(outreachMessagesTable.status, ["sending", "needs_review"]),
      ))
      .returning({ id: outreachMessagesTable.id });
    if (updated) summary.ambiguous += 1;
  }
  return summary;
}