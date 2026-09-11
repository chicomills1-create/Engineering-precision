import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { ReplitConnectors } from "@replit/connectors-sdk";
import type { CityData } from "./types.ts";

const SOURCE_CATEGORIES = ["ahj", "codes", "amendments", "utilities", "climate", "market"] as const;
const DEFAULT_TIMEOUT_MS = 10_000;
const DEFAULT_CONCURRENCY = 6;
const MAX_REDIRECTS = 5;

const EXCEPTION_REVIEW_INTERVAL_DAYS = 90;
const LOCK_MAX_AGE_MS = 60 * 60_000;
const LOCK_PATH = path.join(os.tmpdir(), "apex-grid-city-evidence-check.lock");
type SourceCategory = typeof SOURCE_CATEGORIES[number];

export interface EvidenceReference {
  city: string;
  category: SourceCategory;
}

export interface EvidenceTarget {
  url: string;
  expectedDomains: string[];
  references: EvidenceReference[];
}

export type LinkStatus = "ok" | "reviewed-exception" | "expired-exception" | "http-error" | "inaccessible" | "off-domain-redirect" | "generic-redirect";

interface ReviewedException {
  reviewedOn: string;
  reviewIntervalDays: number;
  reason: string;
  expectedStatus: Exclude<LinkStatus, "ok" | "reviewed-exception" | "expired-exception">;
  expectedStatusCode?: number;
  expectedNetworkErrorCode?: string;
}

const REVIEWED_EXCEPTIONS: Readonly<Record<string, ReviewedException>> = {
  "https://codes.iccsafe.org/content/AZTEMPEBC2018P1": {
    reviewedOn: "2026-09-11",
    reviewIntervalDays: EXCEPTION_REVIEW_INTERVAL_DAYS,
    reason: "Official ICC code text remains available to browsers but rejects this safe automated health check.",
    expectedStatus: "http-error",
    expectedStatusCode: 403,
  },
  "https://codes.iccsafe.org/content/IBC2024V2.0": {
    reviewedOn: "2026-09-11",
    reviewIntervalDays: EXCEPTION_REVIEW_INTERVAL_DAYS,
    reason: "Official ICC code text remains available to browsers but rejects this safe automated health check.",
    expectedStatus: "http-error",
    expectedStatusCode: 403,
  },
  "https://codes.iccsafe.org/content/IECC2024": {
    reviewedOn: "2026-09-11",
    reviewIntervalDays: EXCEPTION_REVIEW_INTERVAL_DAYS,
    reason: "Official ICC code text remains available to browsers but rejects this safe automated health check.",
    expectedStatus: "http-error",
    expectedStatusCode: 403,
  },
  "https://codes.iccsafe.org/content/IMC2024V2.0": {
    reviewedOn: "2026-09-11",
    reviewIntervalDays: EXCEPTION_REVIEW_INTERVAL_DAYS,
    reason: "Official ICC code text remains available to browsers but rejects this safe automated health check.",
    expectedStatus: "http-error",
    expectedStatusCode: 403,
  },
  "https://codes.iccsafe.org/content/IPC2024V2.0": {
    reviewedOn: "2026-09-11",
    reviewIntervalDays: EXCEPTION_REVIEW_INTERVAL_DAYS,
    reason: "Official ICC code text remains available to browsers but rejects this safe automated health check.",
    expectedStatus: "http-error",
    expectedStatusCode: 403,
  },
  "https://novusplace.com/": {
    reviewedOn: "2026-09-11",
    reviewIntervalDays: EXCEPTION_REVIEW_INTERVAL_DAYS,
    reason: "Official Novus Innovation Corridor project site is intermittently unavailable to automated clients.",
    expectedStatus: "inaccessible",
    expectedNetworkErrorCode: "ERR_SSL_SSL/TLS_ALERT_HANDSHAKE_FAILURE",
  },
  "https://msc.fema.gov/portal/home": {
    reviewedOn: "2026-09-11",
    reviewIntervalDays: EXCEPTION_REVIEW_INTERVAL_DAYS,
    reason: "Official FEMA flood-map portal consistently rejects or drops safe automated checks; retain for its interactive authoritative map.",
    expectedStatus: "inaccessible",
    expectedNetworkErrorCode: "ECONNRESET",
  },
  "https://hazards.fema.gov/femaportal/wps/portal/NFHLW": {
    reviewedOn: "2026-09-11",
    reviewIntervalDays: EXCEPTION_REVIEW_INTERVAL_DAYS,
    reason: "Official FEMA National Flood Hazard Layer portal consistently rejects or drops safe automated checks.",
    expectedStatus: "inaccessible",
    expectedNetworkErrorCode: "ECONNRESET",
  },
  "https://www.atlantaga.gov/government/departments/city-planning/ordinances-regulations/construction-codes": {
    reviewedOn: "2026-09-11",
    reviewIntervalDays: EXCEPTION_REVIEW_INTERVAL_DAYS,
    reason: "Official City of Atlanta source returns 403 to automated clients.",
    expectedStatus: "http-error",
    expectedStatusCode: 403,
  },
  "https://www.atlantaga.gov/i-want-to/obtain-a-building-permit": {
    reviewedOn: "2026-09-11",
    reviewIntervalDays: EXCEPTION_REVIEW_INTERVAL_DAYS,
    reason: "Official City of Atlanta source returns 403 to automated clients.",
    expectedStatus: "http-error",
    expectedStatusCode: 403,
  },
  "https://www.duke-energy.com/business": {
    reviewedOn: "2026-09-11",
    reviewIntervalDays: EXCEPTION_REVIEW_INTERVAL_DAYS,
    reason: "Official Duke Energy business source returns 403 to automated clients.",
    expectedStatus: "http-error",
    expectedStatusCode: 403,
  },
  "https://ewdd.lacity.gov/": {
    reviewedOn: "2026-09-11",
    reviewIntervalDays: EXCEPTION_REVIEW_INTERVAL_DAYS,
    reason: "Official Los Angeles Economic and Workforce Development source returns 403 to automated clients.",
    expectedStatus: "http-error",
    expectedStatusCode: 403,
  },
  "https://www.oncor.com/content/oncorwww/us/en/home/about-us/service-area-map.html": {
    reviewedOn: "2026-09-11",
    reviewIntervalDays: EXCEPTION_REVIEW_INTERVAL_DAYS,
    reason: "Official Oncor service-area map consistently times out for automated clients.",
    expectedStatus: "inaccessible",
    expectedNetworkErrorCode: "TimeoutError",
  },
  "https://www.srpnet.com/about/service-area-territory": {
    reviewedOn: "2026-09-11",
    reviewIntervalDays: EXCEPTION_REVIEW_INTERVAL_DAYS,
    reason: "Official SRP service-territory source returns 403 to automated clients.",
    expectedStatus: "http-error",
    expectedStatusCode: 403,
  },
  "https://www.tempe.gov/businesses/building-code": {
    reviewedOn: "2026-09-11",
    reviewIntervalDays: EXCEPTION_REVIEW_INTERVAL_DAYS,
    reason: "Official City of Tempe source returns 403 to automated clients.",
    expectedStatus: "http-error",
    expectedStatusCode: 403,
  },
  "https://www.tempe.gov/businesses/development-services": {
    reviewedOn: "2026-09-11",
    reviewIntervalDays: EXCEPTION_REVIEW_INTERVAL_DAYS,
    reason: "Official City of Tempe source returns 403 to automated clients.",
    expectedStatus: "http-error",
    expectedStatusCode: 403,
  },
  "https://www.tempe.gov/businesses/economic-development": {
    reviewedOn: "2026-09-11",
    reviewIntervalDays: EXCEPTION_REVIEW_INTERVAL_DAYS,
    reason: "Official City of Tempe source returns 403 to automated clients.",
    expectedStatus: "http-error",
    expectedStatusCode: 403,
  },
  "https://www.tempe.gov/government/municipal-utilities/water": {
    reviewedOn: "2026-09-11",
    reviewIntervalDays: EXCEPTION_REVIEW_INTERVAL_DAYS,
    reason: "Official City of Tempe source returns 403 to automated clients.",
    expectedStatus: "http-error",
    expectedStatusCode: 403,
  },
};

export interface LinkResult extends EvidenceTarget {
  status: LinkStatus;
  statusCode?: number;
  networkErrorCode?: string;
  finalUrl?: string;
  detail?: string;
}

export interface CheckOptions {
  concurrency?: number;
  timeoutMs?: number;
  fetchImpl?: typeof fetch;
  now?: Date;
}

function normalizedHost(host: string): string {
  return host.toLowerCase().replace(/^www\./, "");
}

export function isExpectedDomain(host: string, expectedDomains: string[]): boolean {
  const candidate = normalizedHost(host);
  return expectedDomains.some((domain) => {
    const expected = normalizedHost(domain);
    return candidate === expected || candidate.endsWith(`.${expected}`);
  });
}

function isGenericRedirect(originalUrl: URL, finalUrl: URL): boolean {
  if (originalUrl.href === finalUrl.href) return false;
  const finalPath = finalUrl.pathname.replace(/\/+$/, "") || "/";
  if (finalPath === "/") return true;

  const originalSegments = originalUrl.pathname.split("/").filter(Boolean);
  const finalSegments = finalUrl.pathname.split("/").filter(Boolean);
  return originalSegments.length >= 2 && finalSegments.length === 1;
}

function sourceDetails(source: string): { url: string; expectedDomains: string[] } {
  const parsed = new URL(source);
  return { url: parsed.href, expectedDomains: [parsed.hostname] };
}

export function collectApprovedEvidence(cities: CityData[]): EvidenceTarget[] {
  const targets = new Map<string, EvidenceTarget>();
  for (const city of cities) {
    if (city.research?.reviewStatus !== "approved") continue;
    for (const category of SOURCE_CATEGORIES) {
      for (const source of city.research.sources[category]) {
        const details = sourceDetails(source);
        const key = `${details.url}\0${details.expectedDomains.sort().join(",")}`;
        const existing = targets.get(key);
        const reference = { city: `${city.name}, ${city.stateSlug}`, category };
        if (existing) existing.references.push(reference);
        else targets.set(key, { ...details, references: [reference] });
      }
    }
  }
  return [...targets.values()].sort((a, b) => a.url.localeCompare(b.url));
}

async function request(
  url: string,
  method: "HEAD" | "GET",
  timeoutMs: number,
  fetchImpl: typeof fetch,
): Promise<Response> {
  return fetchImpl(url, {
    method,
    redirect: "manual",
    signal: AbortSignal.timeout(timeoutMs),
    headers: {
      "user-agent": "ApexGrid-CityEvidenceHealth/1.0 (+https://apexgridengineering.com)",
      ...(method === "GET" ? { range: "bytes=0-1023" } : {}),
    },
  });
}

export async function checkEvidenceTarget(target: EvidenceTarget, options: CheckOptions = {}): Promise<LinkResult> {
  const fetchImpl = options.fetchImpl ?? fetch;
  const timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  let current = new URL(target.url);

  try {
    for (let redirectCount = 0; redirectCount <= MAX_REDIRECTS; redirectCount += 1) {
      let response = await request(current.href, "HEAD", timeoutMs, fetchImpl);
      if (response.status === 405 || response.status === 501) {
        response = await request(current.href, "GET", timeoutMs, fetchImpl);
      }

      if (response.status >= 300 && response.status < 400) {
        const location = response.headers.get("location");
        if (!location) {
          return { ...target, status: "http-error", statusCode: response.status, finalUrl: current.href, detail: "redirect has no Location header" };
        }
        if (redirectCount === MAX_REDIRECTS) {
          return { ...target, status: "inaccessible", finalUrl: current.href, detail: `more than ${MAX_REDIRECTS} redirects` };
        }
        const next = new URL(location, current);
        if (!["http:", "https:"].includes(next.protocol)) {
          return { ...target, status: "off-domain-redirect", finalUrl: next.href, detail: `unsupported redirect protocol ${next.protocol}` };
        }
        if (!isExpectedDomain(next.hostname, target.expectedDomains)) {
          return { ...target, status: "off-domain-redirect", statusCode: response.status, finalUrl: next.href, detail: `expected ${target.expectedDomains.join(" or ")}` };
        }
        current = next;
        continue;
      }

      if (!response.ok) {
        const failure: LinkResult = { ...target, status: "http-error", statusCode: response.status, finalUrl: current.href, detail: response.statusText || "HTTP failure" };
        return applyReviewedException(failure, options.now);
      }
      if (isGenericRedirect(new URL(target.url), current)) {
        return { ...target, status: "generic-redirect", statusCode: response.status, finalUrl: current.href, detail: "redirect ended at a generic landing page" };
      }
      return { ...target, status: "ok", statusCode: response.status, finalUrl: current.href };
    }
  } catch (error) {
    const { detail, networkErrorCode } = describeNetworkError(error);
    return applyReviewedException({ ...target, status: "inaccessible", finalUrl: current.href, detail, networkErrorCode }, options.now);
  }
  return { ...target, status: "inaccessible", finalUrl: current.href, detail: "unexpected checker state" };
}

function describeNetworkError(error: unknown): { detail: string; networkErrorCode: string } {
  const parts: string[] = [];
  let current: unknown = error;
  let networkErrorCode: string | undefined;
  while (current instanceof Error) {
    const code = "code" in current && typeof current.code === "string" ? current.code : undefined;
    parts.push(`${current.name}${code ? ` [${code}]` : ""}: ${current.message}`);
    networkErrorCode ??= code;
    current = current.cause;
  }
  const root = error instanceof Error ? error : undefined;
  return {
    detail: parts.length > 0 ? parts.join(" <- ") : String(error),
    networkErrorCode: networkErrorCode ?? root?.name ?? "UnknownNetworkError",
  };
}

function applyReviewedException(result: LinkResult, now = new Date()): LinkResult {
  const exception = REVIEWED_EXCEPTIONS[result.url];
  if (!exception || result.status !== exception.expectedStatus) return result;
  if (exception.expectedStatusCode !== undefined && result.statusCode !== exception.expectedStatusCode) return result;
  if (exception.expectedNetworkErrorCode !== undefined && result.networkErrorCode !== exception.expectedNetworkErrorCode) return result;
  const reviewedAt = Date.parse(`${exception.reviewedOn}T00:00:00Z`);
  const expiresAt = reviewedAt + exception.reviewIntervalDays * 24 * 60 * 60 * 1000;
  if (!Number.isFinite(reviewedAt) || now.getTime() >= expiresAt) {
    return {
      ...result,
      status: "expired-exception",
      detail: `${result.detail ?? result.status}; exception review past due (previously reviewed ${exception.reviewedOn}, interval ${exception.reviewIntervalDays} days): ${exception.reason}`,
    };
  }
  return {
    ...result,
    status: "reviewed-exception",
    detail: `${result.detail ?? result.status}; reviewed ${exception.reviewedOn}: ${exception.reason}`,
  };
}

export async function checkEvidenceTargets(targets: EvidenceTarget[], options: CheckOptions = {}): Promise<LinkResult[]> {
  const concurrency = Math.max(1, Math.floor(options.concurrency ?? DEFAULT_CONCURRENCY));
  const results = new Array<LinkResult>(targets.length);
  let nextIndex = 0;
  async function worker(): Promise<void> {
    while (nextIndex < targets.length) {
      const index = nextIndex++;
      results[index] = await checkEvidenceTarget(targets[index], options);
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, targets.length) }, () => worker()));
  return results;
}

async function loadCities(): Promise<CityData[]> {
  const directory = path.join(path.dirname(fileURLToPath(import.meta.url)), "cities");
  const cities: CityData[] = [];
  for (const filename of fs.readdirSync(directory).filter((name) => name.endsWith(".ts")).sort()) {
    const module = await import(path.join(directory, filename));
    cities.push(Object.values(module)[0] as CityData);
  }
  return cities;
}

function parsePositiveInteger(flag: string, fallback: number): number {
  const argument = process.argv.find((value) => value.startsWith(`${flag}=`));
  if (!argument) return fallback;
  const value = Number(argument.slice(flag.length + 1));
  if (!Number.isInteger(value) || value < 1) throw new Error(`${flag} must be a positive integer`);
  return value;
}

export function formatReport(results: LinkResult[]): string {
  const healthy = results.filter((result) => result.status === "ok");
  const exceptions = results.filter((result) => result.status === "reviewed-exception");
  const failures = results.filter((result) => result.status !== "ok" && result.status !== "reviewed-exception");
  const lines = [
    `City evidence link health: ${healthy.length}/${results.length} healthy; ${exceptions.length} reviewed exception(s); ${failures.length} issue(s).`,
  ];
  for (const result of exceptions) {
    lines.push("", `[${result.status}] ${result.url}`);
    if (result.detail) lines.push(`  detail: ${result.detail}`);
    lines.push(`  used by: ${result.references.map(({ city, category }) => `${city} (${category})`).join(", ")}`);
  }
  for (const result of failures) {
    lines.push("", `[${result.status}] ${result.url}`);
    if (result.finalUrl && result.finalUrl !== result.url) lines.push(`  final: ${result.finalUrl}`);
    if (result.statusCode) lines.push(`  HTTP: ${result.statusCode}`);
    if (result.detail) lines.push(`  detail: ${result.detail}`);
    lines.push(`  used by: ${result.references.map(({ city, category }) => `${city} (${category})`).join(", ")}`);
  }
  return lines.join("\n");
}

async function main(): Promise<void> {
  const releaseLock = acquireLock();
  try {
    const concurrency = parsePositiveInteger("--concurrency", DEFAULT_CONCURRENCY);
    const timeoutMs = parsePositiveInteger("--timeout-ms", DEFAULT_TIMEOUT_MS);
    const targets = collectApprovedEvidence(await loadCities());
    console.log(`Checking ${targets.length} unique approved city evidence URLs (concurrency ${concurrency}, timeout ${timeoutMs}ms)...`);
    const results = await checkEvidenceTargets(targets, { concurrency, timeoutMs });
    const report = formatReport(results);
    const failures = results.filter((result) => result.status !== "ok" && result.status !== "reviewed-exception");
    if (failures.length === 0) {
      console.log(report);
      return;
    }
    console.error(report);
    if (process.argv.includes("--notify-failures")) {
      await notifyFailures(report, failures.length);
      console.log(`City evidence alert sent for ${failures.length} issue(s).`);
      return;
    }
    process.exitCode = 1;
  } finally {
    releaseLock();
  }
}

const isCli = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isCli) await main();

function acquireLock(): () => void {
  try {
    const stat = fs.statSync(LOCK_PATH);
    if (Date.now() - stat.mtimeMs > LOCK_MAX_AGE_MS) fs.unlinkSync(LOCK_PATH);
  } catch (error) {
    if (!(error instanceof Error && "code" in error && error.code === "ENOENT")) throw error;
  }
  let descriptor: number;
  try {
    descriptor = fs.openSync(LOCK_PATH, "wx");
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "EEXIST") {
      throw new Error("A city evidence check is already running");
    }
    throw error;
  }
  fs.writeFileSync(descriptor, `${process.pid}\n${new Date().toISOString()}\n`);
  return () => {
    fs.closeSync(descriptor);
    fs.rmSync(LOCK_PATH, { force: true });
  };
}

async function notifyFailures(report: string, failureCount: number): Promise<void> {
  const recipients = (
    process.env.CITY_EVIDENCE_NOTIFY_EMAIL
    || process.env.REVIEW_NOTIFY_EMAIL
    || process.env.LEAD_NOTIFY_EMAIL
    || process.env.ADMIN_EMAILS
    || ""
  ).split(",").map((email) => email.trim()).filter(Boolean);
  const from = process.env.CITY_EVIDENCE_NOTIFY_FROM_EMAIL
    || process.env.REVIEW_NOTIFY_FROM_EMAIL
    || process.env.LEAD_NOTIFY_FROM_EMAIL
    || recipients[0];
  if (recipients.length === 0 || !from) {
    throw new Error("City evidence alert recipient/sender is not configured");
  }

  const response = await new ReplitConnectors().proxy("sendgrid", "/v3/mail/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      personalizations: [{ to: recipients.map((email) => ({ email })) }],
      from: { email: from, name: "Apex Grid City Evidence Monitor" },
      subject: `[Action required] ${failureCount} city evidence link issue${failureCount === 1 ? "" : "s"}`,
      content: [{
        type: "text/plain",
        value: [
          "The scheduled city evidence check found links that need team review.",
          "No SEO pages were regenerated.",
          "",
          report,
        ].join("\n"),
      }],
    }),
  });
  if (!response.ok) {
    throw new Error(`SendGrid responded ${response.status}: ${await response.text().catch(() => "")}`);
  }
}
