import assert from "node:assert/strict";
import test from "node:test";
import { checkEvidenceTarget, formatReport, isExpectedDomain, type EvidenceTarget } from "./check-city-evidence-links.ts";

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
  const result = await checkEvidenceTarget(reviewedTarget, {
    fetchImpl: mockFetch([{ status: 403 }]),
    now: new Date("2026-12-10T00:00:00Z"),
  });
  assert.equal(result.status, "off-domain-redirect");
});

test("reports redirects that collapse evidence to a generic landing page", async () => {
  const result = await checkEvidenceTarget(reviewedTarget, {
    fetchImpl: mockFetch([{ status: 403 }]),
    now: new Date("2026-12-10T00:00:00Z"),
  });
  assert.equal(result.status, "off-domain-redirect");
});

test("reports redirects that collapse evidence to a generic landing page", async () => {
  const result = await checkEvidenceTarget(reviewedTarget, {
    fetchImpl: mockFetch([{ status: 403 }]),
    now: new Date("2026-12-10T00:00:00Z"),
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

test("accepts only the reviewed failure class for an explicit exception", async () => {
  const reviewedTarget: EvidenceTarget = {
    url: "https://msc.fema.gov/portal/home",
    expectedDomains: ["msc.fema.gov"],
    references: [{ city: "Example, state", category: "climate" }],
  };

  const expectedBlock = await checkEvidenceTarget(reviewedTarget, {
    fetchImpl: mockFetch([{ status: 403 }]),
    now: new Date("2026-12-09T23:59:59Z"),
  });
  assert.equal(expectedBlock.status, "reviewed-exception");
  assert.match(expectedBlock.detail ?? "", /reviewed 2026-09-11/);

  const unexpectedRedirect = await checkEvidenceTarget(reviewedTarget, {
    fetchImpl: mockFetch([{ status: 302, location: "https://example.com/" }]),
  });
  assert.equal(unexpectedRedirect.status, "off-domain-redirect");

  for (const status of [404, 410, 500, 503]) {
    const newlyStale = await checkEvidenceTarget(reviewedTarget, {
      fetchImpl: mockFetch([{ status }]),
    });
    assert.equal(newlyStale.status, "http-error", `${status} must not match a reviewed 403 exception`);
    assert.equal(newlyStale.statusCode, status);
  }
});

test("fails a reviewed exception once its review interval expires", async () => {
  const reviewedTarget: EvidenceTarget = {
    url: "https://msc.fema.gov/portal/home",
    expectedDomains: ["msc.fema.gov"],
    references: [{ city: "Example, state", category: "climate" }],
  };

  function fetchFailure(code: string): typeof fetch {
    return (async () => {
      const cause = Object.assign(new Error("network operation failed"), { code });
      throw new TypeError("fetch failed", { cause });
    }) as typeof fetch;
  }

  const expectedReset = await checkEvidenceTarget(reviewedTarget, {
    fetchImpl: fetchFailure("ECONNRESET"),
    now: new Date("2026-09-11T00:00:00Z"),
  });
  assert.equal(expectedReset.status, "reviewed-exception");
  assert.equal(expectedReset.networkErrorCode, "ECONNRESET");

  for (const code of ["ENOTFOUND", "CERT_HAS_EXPIRED", "ETIMEDOUT", "ECONNREFUSED"]) {
    const differentCause = await checkEvidenceTarget(reviewedTarget, {
      fetchImpl: fetchFailure(code),
    });
    assert.equal(differentCause.status, "inaccessible", `${code} must not match a reviewed ECONNRESET exception`);
    assert.equal(differentCause.networkErrorCode, code);
  }

  const timeout = await checkEvidenceTarget(reviewedTarget, {
    fetchImpl: (async () => {
      throw new DOMException("operation timed out", "TimeoutError");
    }) as typeof fetch,
  });
  assert.equal(timeout.status, "inaccessible");
  assert.equal(timeout.networkErrorCode, "TimeoutError");
});

test("formats categorized failures with their city references", () => {
  const report = formatReport([{
    ...target,
    status: "http-error",
    statusCode: 404,
    finalUrl: target.url,
    detail: "Not Found",
  }]);
  assert.match(report, /0\/1 healthy; 0 reviewed exception\(s\); 1 issue/);
  assert.match(report, /\[http-error\]/);
  assert.match(report, /HTTP: 404/);
  assert.match(report, /Example, state \(codes\)/);
});
