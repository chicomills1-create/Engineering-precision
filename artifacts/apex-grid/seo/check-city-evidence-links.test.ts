import assert from "node:assert/strict";
import test from "node:test";
import { checkEvidenceTarget, isExpectedDomain, type EvidenceTarget } from "./check-city-evidence-links.ts";

const target: EvidenceTarget = {
  url: "https://city.example.gov/departments/building/codes",
  expectedDomains: ["city.example.gov"],
  references: [{ city: "Example, state", category: "codes" }],
};

function mockFetch(responses: Array<{ status: number; location?: string }>): typeof fetch {
  let index = 0;
  return (async () => {
    const response = responses[index++];
    return new Response(null, {
      status: response.status,
      headers: response.location ? { location: response.location } : undefined,
    });
  }) as typeof fetch;
}

test("accepts the expected host and its subdomains but not lookalike domains", () => {
  assert.equal(isExpectedDomain("www.city.example.gov", ["city.example.gov"]), true);
  assert.equal(isExpectedDomain("permits.city.example.gov", ["city.example.gov"]), true);
  assert.equal(isExpectedDomain("city.example.gov.attacker.test", ["city.example.gov"]), false);
});

test("accepts an authoritative redirect to a specific page", async () => {
  const result = await checkEvidenceTarget(target, {
    fetchImpl: mockFetch([
      { status: 301, location: "https://permits.city.example.gov/resources/codes/current" },
      { status: 200 },
    ]),
  });
  assert.equal(result.status, "ok");
});

test("rejects redirects away from the expected authority", async () => {
  const result = await checkEvidenceTarget(target, {
    fetchImpl: mockFetch([{ status: 302, location: "https://example.com/codes" }]),
  });
  assert.equal(result.status, "off-domain-redirect");
});

test("reports redirects that collapse evidence to a generic landing page", async () => {
  const result = await checkEvidenceTarget(target, {
    fetchImpl: mockFetch([
      { status: 301, location: "https://city.example.gov/" },
      { status: 200 },
    ]),
  });
  assert.equal(result.status, "generic-redirect");
});

test("reports HTTP and network failures distinctly", async () => {
  const httpResult = await checkEvidenceTarget(target, { fetchImpl: mockFetch([{ status: 404 }]) });
  assert.equal(httpResult.status, "http-error");
  assert.equal(httpResult.statusCode, 404);

  const inaccessible = await checkEvidenceTarget(target, {
    fetchImpl: (async () => { throw new Error("connection refused"); }) as typeof fetch,
  });
  assert.equal(inaccessible.status, "inaccessible");
});