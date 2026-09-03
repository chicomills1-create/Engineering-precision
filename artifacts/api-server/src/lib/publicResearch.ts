import { createHash } from "node:crypto";
import { openai } from "@workspace/integrations-openai-ai-server";

export type ResearchAudience = "architect" | "builder";
export const RESEARCH_STATE_ORDER = [
  "AZ", "CA", "TX", "CO", "NV", "NM", "UT", "WA", "OR", "ID", "MT", "WY",
  "OK", "KS", "NE", "SD", "ND", "MN", "IA", "MO", "AR", "LA", "WI", "IL",
  "IN", "MI", "OH", "KY", "TN", "MS", "AL", "GA", "FL", "SC", "NC", "VA",
  "WV", "PA", "MD", "DE", "NJ", "NY", "CT", "RI", "MA", "VT", "NH", "ME",
  "HI",
] as const;
export type ResearchState = typeof RESEARCH_STATE_ORDER[number];

export type DiscoveredProspect = {
  companyName: string;
  website: string;
  city: string;
  state: ResearchState;
  audience: ResearchAudience;
  sourceUrl: string;
  researchNotes: string;
  fitScore: number;
  needScore: number;
  needSignals: string;
  dedupeKey: string;
};

export type DiscoveredHotMarketProspect = DiscoveredProspect & {
  contactName: string;
  contactTitle: string;
  contactEmail: string;
  contactSourceUrl: string;
  emailSourceUrl: string;
  projectEvidenceUrl: string;
};

type SearchResult = {
  title: string;
  url: string;
  snippet: string;
};

const STATE_NAMES: Record<ResearchState, string> = {
  AZ: "Arizona", CA: "California", TX: "Texas", CO: "Colorado", NV: "Nevada",
  NM: "New Mexico", UT: "Utah", WA: "Washington", OR: "Oregon", ID: "Idaho",
  MT: "Montana", WY: "Wyoming", OK: "Oklahoma", KS: "Kansas", NE: "Nebraska",
  SD: "South Dakota", ND: "North Dakota", MN: "Minnesota", IA: "Iowa",
  MO: "Missouri", AR: "Arkansas", LA: "Louisiana", WI: "Wisconsin", IL: "Illinois",
  IN: "Indiana", MI: "Michigan", OH: "Ohio", KY: "Kentucky", TN: "Tennessee",
  MS: "Mississippi", AL: "Alabama", GA: "Georgia", FL: "Florida", SC: "South Carolina",
  NC: "North Carolina", VA: "Virginia", WV: "West Virginia", PA: "Pennsylvania",
  MD: "Maryland", DE: "Delaware", NJ: "New Jersey", NY: "New York",
  CT: "Connecticut", RI: "Rhode Island", MA: "Massachusetts", VT: "Vermont",
  NH: "New Hampshire", ME: "Maine", HI: "Hawaii",
};

function decodeHtml(value: string): string {
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, "\"")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function unwrapDuckDuckGoUrl(rawUrl: string): string {
  const decoded = decodeHtml(rawUrl);
  try {
    const parsed = new URL(decoded, "https://duckduckgo.com");
    const target = parsed.searchParams.get("uddg");
    return target ? decodeURIComponent(target) : parsed.toString();
  } catch {
    return decoded;
  }
}

function parseSearchResults(html: string): SearchResult[] {
  const linkPattern = /<a[^>]+class="[^"]*result__a[^"]*"[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi;
  const snippetPattern = /<a[^>]+class="[^"]*result__snippet[^"]*"[^>]*>([\s\S]*?)<\/a>/gi;
  const links = [...html.matchAll(linkPattern)];
  const snippets = [...html.matchAll(snippetPattern)];
  return links.slice(0, 12).map((match, index) => ({
    title: decodeHtml(match[2] ?? ""),
    url: unwrapDuckDuckGoUrl(match[1] ?? ""),
    snippet: decodeHtml(snippets[index]?.[1] ?? ""),
  })).filter((result) => result.title && result.url.startsWith("http"));
}

function buildSearchQuery(state: ResearchState, audience: ResearchAudience, extra?: string): string {
  const business = audience === "architect"
    ? "\"commercial architecture firm\""
    : "\"commercial general contractor\"";
  const intent = audience === "architect"
    ? "(\"request for qualifications\" OR \"seeking consultants\" OR hiring OR \"new project\")"
    : "(bidding OR preconstruction OR \"design-build\" OR hiring OR \"new project\")";
  return [business, intent, STATE_NAMES[state], extra?.trim()].filter(Boolean).join(" ");
}

function buildHotMarketSearchQuery(
  state: ResearchState,
  audience: ResearchAudience,
): string {
  const business = audience === "architect"
    ? "\"commercial architecture firm\""
    : "\"commercial general contractor\"";
  const trigger = "(permitting OR \"active project\" OR construction OR expansion OR infrastructure OR bidding OR RFQ OR RFP)";
  const contact = "(principal OR partner OR president OR preconstruction OR \"project executive\")";
  return [business, trigger, contact, STATE_NAMES[state], "-directory -yelp"].join(" ");
}

async function searchPublicWeb(query: string): Promise<SearchResult[]> {
  const response = await fetch("https://html.duckduckgo.com/html/", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": "Mozilla/5.0 (compatible; ApexGridResearch/1.0; +https://apexgrideng.com)",
    },
    body: new URLSearchParams({ q: query }).toString(),
    signal: AbortSignal.timeout(15_000),
  });
  if (!response.ok) throw new Error(`Public search returned ${response.status}`);
  return parseSearchResults(await response.text());
}

async function hydrateSearchResult(result: SearchResult): Promise<SearchResult> {
  try {
    const response = await fetch(result.url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; ApexGridResearch/1.0; +https://apexgrideng.com)",
      },
      signal: AbortSignal.timeout(10_000),
    });
    const contentType = response.headers.get("content-type")?.toLowerCase() ?? "";
    if (!response.ok || (!contentType.includes("text/html") && !contentType.includes("text/plain"))) {
      return result;
    }
    const pageText = decodeHtml((await response.text()).slice(0, 60_000)).slice(0, 6_000);
    return {
      ...result,
      snippet: `${result.snippet} Public page content: ${pageText}`.trim(),
    };
  } catch {
    return result;
  }
}

async function hydrateSearchResults(results: SearchResult[]): Promise<SearchResult[]> {
  return Promise.all(results.map(hydrateSearchResult));
}

function isCandidate(value: unknown): value is Omit<DiscoveredProspect, "dedupeKey"> {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Record<string, unknown>;
  return typeof candidate.companyName === "string"
    && typeof candidate.website === "string"
    && typeof candidate.city === "string"
    && ["AZ", "CA", "TX"].includes(String(candidate.state))
    && ["architect", "builder"].includes(String(candidate.audience))
    && typeof candidate.sourceUrl === "string"
    && typeof candidate.researchNotes === "string"
    && typeof candidate.fitScore === "number"
    && typeof candidate.needScore === "number"
    && typeof candidate.needSignals === "string";
}

function isHotMarketCandidate(value: unknown): value is Omit<DiscoveredHotMarketProspect, "dedupeKey"> {
  if (!isCandidate(value) || typeof value !== "object" || value === null) return false;
  const candidate = value as Record<string, unknown>;
  return typeof candidate.contactName === "string"
    && typeof candidate.contactTitle === "string"
    && typeof candidate.contactEmail === "string"
    && typeof candidate.contactSourceUrl === "string"
    && typeof candidate.emailSourceUrl === "string"
    && typeof candidate.projectEvidenceUrl === "string";
}

function evidenceAppearsAtUrl(
  value: string,
  sourceUrl: string,
  results: SearchResult[],
): boolean {
  const result = results.find((candidate) => candidate.url === sourceUrl);
  if (!result) return false;
  return `${result.title} ${result.snippet}`.toLowerCase().includes(value.trim().toLowerCase());
}

function emailAppearsInResults(
  email: string,
  sourceUrl: string,
  results: SearchResult[],
): boolean {
  const normalized = email.trim().toLowerCase();
  return evidenceAppearsAtUrl(normalized, sourceUrl, results);
}

function sameCompanyDomain(website: string, sourceUrl: string): boolean {
  try {
    const companyDomain = new URL(website).hostname.replace(/^www\./, "").toLowerCase();
    const sourceDomain = new URL(sourceUrl).hostname.replace(/^www\./, "").toLowerCase();
    return sourceDomain === companyDomain || sourceDomain.endsWith(`.${companyDomain}`);
  } catch {
    return false;
  }
}

function makeDedupeKey(companyName: string, website: string): string {
  let host = website.toLowerCase();
  try {
    host = new URL(website).hostname.replace(/^www\./, "");
  } catch {
    // The validated AI result still retains a normalized company-name fallback.
  }
  return createHash("sha256")
    .update(`${host}:${companyName.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-")}`)
    .digest("hex");
}

export async function discoverPublicProspects(input: {
  state: ResearchState;
  audience: ResearchAudience;
  query?: string;
}): Promise<{ query: string; prospects: DiscoveredProspect[] }> {
  const query = buildSearchQuery(input.state, input.audience, input.query);
  const results = await searchPublicWeb(query);
  if (results.length === 0) return { query, prospects: [] };

  const completion = await openai.chat.completions.create({
    model: "gpt-5.6-luna",
    max_completion_tokens: 8192,
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: [
          "Return strict JSON only: {\"prospects\":[...]}.",
          "Select only commercial architecture firms or builders that match the requested state and audience.",
          "The purpose is to identify companies with credible current need for outsourced structural, MEP, civil, PE-stamping, Title 24, plan-check, or related design support.",
          "Require a need signal in the supplied title/snippet, such as active projects, bidding, RFQ/RFP, consultant demand, preconstruction activity, rapid growth, or a relevant staffing gap.",
          "Exclude directories, aggregators, residential-only firms, vendors, competitors offering the same multidisciplinary engineering services, and companies with no evidence of current need.",
          "Use only URLs and facts present in the supplied search results. Never invent a company, contact, project, location, email, or claim.",
          "Do not return personal contacts or email addresses.",
          "Each item must contain companyName, website, city, state, audience, sourceUrl, researchNotes, fitScore, needScore, needSignals.",
           "Scores are integers from 0 to 100. Return only candidates with needScore >= 60 and fitScore >= 60. Return at most 10.",
        ].join(" "),
      },
      {
        role: "user",
        content: JSON.stringify({
          requestedState: input.state,
          requestedAudience: input.audience,
          searchResults: results,
        }),
      },
    ],
  });

  const parsed = JSON.parse(completion.choices[0]?.message.content ?? "{}") as { prospects?: unknown[] };
  const allowedUrls = new Set(results.map((result) => result.url));
  const prospects = (parsed.prospects ?? [])
    .filter(isCandidate)
    .filter((candidate) => candidate.state === input.state && candidate.audience === input.audience)
    .filter((candidate) => candidate.needScore >= 60 && candidate.fitScore >= 60)
    .filter((candidate) => allowedUrls.has(candidate.sourceUrl))
     .slice(0, 10)
    .map((candidate) => ({
      ...candidate,
      fitScore: Math.max(0, Math.min(100, Math.round(candidate.fitScore))),
      needScore: Math.max(0, Math.min(100, Math.round(candidate.needScore))),
      dedupeKey: makeDedupeKey(candidate.companyName, candidate.website),
    }));

  return { query, prospects };
}

export async function discoverPublicHotMarketProspects(input: {
  state: ResearchState;
  audience: ResearchAudience;
}): Promise<{ query: string; prospects: DiscoveredHotMarketProspect[] }> {
  const query = buildHotMarketSearchQuery(input.state, input.audience);
  const searchResults = await searchPublicWeb(query);
  if (searchResults.length === 0) return { query, prospects: [] };
  const results = await hydrateSearchResults(searchResults);

  const completion = await openai.chat.completions.create({
    model: "gpt-5.6-luna",
    max_completion_tokens: 8192,
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: [
          "Return strict JSON only: {\"prospects\":[...]}.",
          "Select only commercial architecture firms or builders in the requested state and audience.",
          "Require a specific current project, permit, expansion, infrastructure, construction, bid, RFQ, RFP, or other active need signal in the supplied results.",
          "Require a named current decision-maker or relevant leader, their exact role, and a business email visibly published in the supplied public search result text.",
          "The email must use the target company's own domain. Never guess an address, infer an address from a naming pattern, use a directory/publisher/vendor email, or call paid enrichment.",
          "Use only URLs, names, roles, email addresses, and facts present in the supplied search results. Never invent or fill missing fields.",
          "Return public evidence URLs separately: sourceUrl/projectEvidenceUrl for the need signal, contactSourceUrl for the named role, and emailSourceUrl for the published email. Each URL must be one of the supplied result URLs.",
          "Exclude directories, aggregators, residential-only firms, vendors, competitors offering the same multidisciplinary engineering services, and ambiguous records.",
          "Each item must contain companyName, website, city, state, audience, sourceUrl, projectEvidenceUrl, researchNotes, fitScore, needScore, needSignals, contactName, contactTitle, contactEmail, contactSourceUrl, emailSourceUrl.",
          "Scores are integers from 0 to 100. Return only candidates with needScore >= 75 and fitScore >= 70. Return at most 10.",
        ].join(" "),
      },
      {
        role: "user",
        content: JSON.stringify({
          requestedState: input.state,
          requestedAudience: input.audience,
          searchResults: results,
        }),
      },
    ],
  });

  const parsed = JSON.parse(completion.choices[0]?.message.content ?? "{}") as {
    prospects?: unknown[];
  };
  const allowedUrls = new Set(results.map((result) => result.url));
  const prospects = (parsed.prospects ?? [])
    .filter(isHotMarketCandidate)
    .filter((candidate) =>
      candidate.state === input.state
      && candidate.audience === input.audience
      && candidate.needScore >= 75
      && candidate.fitScore >= 70
    )
    .filter((candidate) =>
      allowedUrls.has(candidate.sourceUrl)
      && allowedUrls.has(candidate.projectEvidenceUrl)
      && allowedUrls.has(candidate.contactSourceUrl)
      && allowedUrls.has(candidate.emailSourceUrl)
    )
    .filter((candidate) =>
      sameCompanyDomain(candidate.website, candidate.contactSourceUrl)
      && sameCompanyDomain(candidate.website, candidate.emailSourceUrl)
    )
    .filter((candidate) =>
      emailAppearsInResults(candidate.contactEmail, candidate.emailSourceUrl, results)
      && evidenceAppearsAtUrl(candidate.contactName, candidate.contactSourceUrl, results)
      && evidenceAppearsAtUrl(candidate.contactTitle, candidate.contactSourceUrl, results)
    )
    .slice(0, 10)
    .map((candidate) => ({
      ...candidate,
      fitScore: Math.max(0, Math.min(100, Math.round(candidate.fitScore))),
      needScore: Math.max(0, Math.min(100, Math.round(candidate.needScore))),
      dedupeKey: makeDedupeKey(candidate.companyName, candidate.website),
    }));

  return { query, prospects };
}