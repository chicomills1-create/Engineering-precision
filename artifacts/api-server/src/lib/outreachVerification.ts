import { ReplitConnectors } from "@replit/connectors-sdk";
import { and, eq, inArray, sql } from "drizzle-orm";
import {
  db,
  outreachSuppressionsTable,
  prospectsTable,
  campaignsTable,
  type Prospect,
} from "@workspace/db";

export const DEFAULT_VERIFICATION_BATCH_SIZE = 150;

export type CompanyEvidence = {
  name: string;
  title: string;
  sourceUrl: string;
  email?: string;
  emailSourceUrl?: string;
};

export function normalizeDomain(value: string): string {
  try {
    return new URL(value.includes("://") ? value : `https://${value}`)
      .hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return "";
  }
}

export function emailDomain(email: string): string {
  return email.trim().toLowerCase().split("@")[1] ?? "";
}

export function isCompanyEmail(email: string, website: string): boolean {
  const expected = normalizeDomain(website);
  const actual = emailDomain(email).replace(/^www\./, "");
  return Boolean(expected && actual === expected);
}

export function isPublicInboxEmail(email: string): boolean {
  const local = email.trim().toLowerCase().split("@")[0] ?? "";
  return new Set(["admin", "contact", "hello", "help", "info", "inquiries", "office", "sales", "support", "team"]).has(local);
}

/** Extracts a named leader and exact role only when both occur in visible page text. */
export function parseOfficialLeaderEvidence(html: string, sourceUrl: string): CompanyEvidence | undefined {
  const visible = html
    .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const emailMatch = visible.match(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i);
  const roleText = visible.replace(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi, " ");
  const pattern = /\b([A-Z][a-z]+(?:\s+[A-Z][a-z.'-]+){1,3})\s*(?:[|,—:-]\s*|\()((?:chief|president|principal|partner|owner|founder|director|vice president|vp|managing|executive)[^|,—:;)]{2,80})/i;
  const match = roleText.match(pattern);
  if (!match?.[1] || !match[2]) return undefined;
  return {
    name: match[1].trim(),
    title: match[2].trim().replace(/\s+/g, " "),
    sourceUrl,
    ...(emailMatch ? { email: emailMatch[0].toLowerCase(), emailSourceUrl: sourceUrl } : {}),
  };
}

export function validatePublicInboxEvidence(
  email: string,
  evidence: CompanyEvidence,
  website: string,
): boolean {
  return Boolean(
    isPublicInboxEmail(email)
    && isCompanyEmail(email, website)
    && evidence.email === email.toLowerCase()
    && evidence.emailSourceUrl === evidence.sourceUrl,
  );
}

type FindyMailResult = {
  email?: string;
  contact?: { email?: string };
  data?: { email?: string };
  results?: Array<{ email?: string }>;
} | Array<{ email?: string }>;

async function findyMail(name: string, domain: string): Promise<string | undefined> {
  const response = await new ReplitConnectors().proxy("findymail", "/api/search/name", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, domain }),
  });
  if ([401, 403, 402, 429].includes(response.status)) {
    throw new Error(`FindyMail connector authorization/credit error (${response.status})`);
  }
  if (!response.ok) return undefined;
  const value = await response.json() as FindyMailResult;
  if (Array.isArray(value)) return value[0]?.email;
  return value.contact?.email ?? value.email ?? value.data?.email ?? value.results?.[0]?.email;
}

async function fetchOfficialEvidence(website: string): Promise<CompanyEvidence | undefined> {
  const root = website.endsWith("/") ? website.slice(0, -1) : website;
  for (const path of ["", "/about", "/team", "/leadership", "/contact"]) {
    try {
      const url = `${root}${path}`;
      const response = await fetch(url, { signal: AbortSignal.timeout(10_000) });
      if (!response.ok) continue;
      if (normalizeDomain(response.url) !== normalizeDomain(website)) continue;
      const evidence = parseOfficialLeaderEvidence(await response.text(), response.url);
      if (evidence) return evidence;
    } catch {
      // An unavailable company page is a no-result, not permission to infer.
    }
  }
  return undefined;
}

async function verifyProspect(prospect: Prospect): Promise<CompanyEvidence & { email: string; evidenceType: string } | undefined> {
  if (!prospect.website) return undefined;
  const domain = normalizeDomain(prospect.website);
  if (!domain) return undefined;
  const evidence = await fetchOfficialEvidence(prospect.website);
  if (!evidence) return undefined;
  if (evidence.email && validatePublicInboxEvidence(evidence.email, evidence, prospect.website)) {
    return { ...evidence, email: evidence.email, evidenceType: "official_publication" };
  }
  const email = await findyMail(evidence.name, domain);
  if (!email || !isCompanyEmail(email, prospect.website)) return undefined;
  return { ...evidence, email: email.trim().toLowerCase(), evidenceType: "findymail_verified" };
}

export async function verifyNewOutreachProspects(
  batchSize = DEFAULT_VERIFICATION_BATCH_SIZE,
): Promise<{ checked: number; promoted: number }> {
  const capped = Math.max(1, Math.min(batchSize, DEFAULT_VERIFICATION_BATCH_SIZE));
  const candidates = await db.select({ prospect: prospectsTable })
    .from(prospectsTable)
    .innerJoin(campaignsTable, eq(prospectsTable.campaignId, campaignsTable.id))
    .where(and(
      eq(prospectsTable.status, "review"),
      eq(prospectsTable.emailStatus, "unverified"),
      eq(prospectsTable.contactConfidence, "unknown"),
      eq(campaignsTable.status, "active"),
    ))
    .limit(capped);
  let promoted = 0;
  for (const { prospect } of candidates) {
    const verified = await verifyProspect(prospect);
    if (!verified) continue;
    await db.transaction(async (tx) => {
      await tx.execute(sql`select pg_advisory_xact_lock(hashtextextended(${"outreach-verify:" + prospect.id}, 0))`);
      const [suppressed] = await tx.select({ id: outreachSuppressionsTable.id })
        .from(outreachSuppressionsTable)
        .where(eq(outreachSuppressionsTable.email, verified.email))
        .limit(1);
      if (suppressed) return;
      const duplicate = await tx.select({ id: prospectsTable.id, email: prospectsTable.contactEmail, website: prospectsTable.website })
        .from(prospectsTable)
        .where(inArray(prospectsTable.emailStatus, ["verified"]))
        .then((rows) => rows.some((row) => row.id !== prospect.id
          && (row.email?.trim().toLowerCase() === verified.email
            || normalizeDomain(row.website ?? "") === normalizeDomain(prospect.website ?? ""))));
      if (duplicate) return;
      const [updated] = await tx.update(prospectsTable).set({
        contactName: verified.name,
        contactTitle: verified.title,
        contactEmail: verified.email,
        contactConfidence: "high",
        emailStatus: "verified",
        status: "approved",
        contactEvidenceType: verified.evidenceType,
        contactEvidence: `${verified.name} — ${verified.title}; ${verified.sourceUrl}`,
        contactSourceUrl: verified.sourceUrl,
        contactEvidenceAt: new Date(),
      }).where(and(
        eq(prospectsTable.id, prospect.id),
        eq(prospectsTable.status, "review"),
        eq(prospectsTable.emailStatus, "unverified"),
        eq(prospectsTable.contactConfidence, "unknown"),
        sql`exists (
          select 1 from ${campaignsTable}
          where ${campaignsTable.id} = ${prospectsTable.campaignId}
            and ${campaignsTable.status} = 'active'
        )`,
      )).returning({ id: prospectsTable.id });
      if (updated) promoted += 1;
    });
  }
  return { checked: candidates.length, promoted };
}