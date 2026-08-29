import assert from "node:assert/strict";
import test from "node:test";
import {
  assertLinkedinAttributionConsistency,
  canonicalDomain,
  CONTENT_PUBLISH_QUOTA_LOCK,
  isPostgresUniqueViolation,
  LINKEDIN_SUPPRESSION_LOCK,
  linkedinSuppressionTargetKeys,
  normalizeLinkedinName,
  PERSON_ACTION_QUOTA_LOCK,
} from "./linkedin/policy";
import { normalizeLinkedinUrl } from "./linkedin/url";

test("LinkedIn duplicate keys normalize domain, name, and URL", () => {
  assert.equal(canonicalDomain("https://www.Example.com/team"), "example.com");
  assert.equal(normalizeLinkedinName("  Apex   Grid "), "apex grid");
  assert.equal(normalizeLinkedinUrl("https://linkedin.com/company/apex/?x=1"), "https://www.linkedin.com/company/apex");
});

test("LinkedIn unique conflicts are recognized for deterministic 409 responses", () => {
  assert.equal(isPostgresUniqueViolation({ code: "23505" }), true);
  assert.equal(isPostgresUniqueViolation({ code: "23503" }), false);
});

test("LinkedIn attribution rejects mismatched person/company and content/campaign pairs", () => {
  assert.throws(
    () => assertLinkedinAttributionConsistency(
      { personId: 1, companyId: 2 },
      { person: { companyId: 3 } },
    ),
    /person and company/,
  );
  assert.throws(
    () => assertLinkedinAttributionConsistency(
      { contentItemId: 1, campaignId: 2 },
      { content: { campaignId: 3 } },
    ),
    /content and campaign/,
  );
  assert.doesNotThrow(() => assertLinkedinAttributionConsistency(
    { personId: 1, companyId: 2, contentItemId: 3, campaignId: 4 },
    { person: { companyId: 2 }, content: { campaignId: 4 } },
  ));
});

test("LinkedIn suppression keys include the full person, company, and profile chain", () => {
  assert.deepEqual(
    linkedinSuppressionTargetKeys({
      personId: 7,
      companyId: 9,
      profileUrls: [
        "https://linkedin.com/in/example?tracking=1",
        "https://www.linkedin.com/company/example/",
      ],
    }),
    [
      "person:7",
      "company:9",
      "profile:https://www.linkedin.com/in/example",
      "profile:https://www.linkedin.com/company/example",
    ],
  );
});

test("LinkedIn suppression uses a dedicated global serialization lock", () => {
  assert.notEqual(LINKEDIN_SUPPRESSION_LOCK, PERSON_ACTION_QUOTA_LOCK);
  assert.notEqual(LINKEDIN_SUPPRESSION_LOCK, CONTENT_PUBLISH_QUOTA_LOCK);
});