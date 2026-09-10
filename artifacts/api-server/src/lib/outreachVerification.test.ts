import assert from "node:assert/strict";
import test from "node:test";
import {
  isCompanyEmail,
  isPublicInboxEmail,
  normalizeDomain,
  parseOfficialLeaderEvidence,
  validatePublicInboxEvidence,
} from "./outreachVerification";

test("official evidence requires a visible named leader and exact role", () => {
  const evidence = parseOfficialLeaderEvidence(
    "<html><body><h2>Jordan Lee — President</h2><p>jordan@example.com</p></body></html>",
    "https://example.com/team",
  );
  assert.equal(evidence?.name, "Jordan Lee");
  assert.equal(evidence?.title, "President");
  assert.equal(evidence?.sourceUrl, "https://example.com/team");
  assert.equal(parseOfficialLeaderEvidence("<script>Jordan Lee — President</script>", "https://example.com"), undefined);
});

test("company-domain and public inbox checks never infer an address", () => {
  assert.equal(normalizeDomain("https://www.Example.com/about"), "example.com");
  assert.equal(isCompanyEmail("info@example.com", "https://www.example.com"), true);
  assert.equal(isCompanyEmail("info@other.com", "https://www.example.com"), false);
  assert.equal(isPublicInboxEmail("contact@example.com"), true);
  assert.equal(isPublicInboxEmail("jordan@example.com"), false);
  const evidence = {
    name: "Jordan Lee",
    title: "President",
    sourceUrl: "https://example.com/team",
    email: "info@example.com",
    emailSourceUrl: "https://example.com/team",
  };
  assert.equal(validatePublicInboxEvidence("info@example.com", evidence, "https://example.com"), true);
  assert.equal(validatePublicInboxEvidence("sales@example.com", evidence, "https://example.com"), false);
});

test("subdomains and lookalike domains are not treated as the company domain", () => {
  assert.equal(isCompanyEmail("info@sub.example.com", "https://example.com"), false);
  assert.equal(isCompanyEmail("info@example.co", "https://example.com"), false);
  assert.equal(isCompanyEmail("info@example.com.evil.test", "https://example.com"), false);
});