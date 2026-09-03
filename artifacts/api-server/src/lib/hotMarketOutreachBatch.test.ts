import assert from "node:assert/strict";
import { test } from "node:test";
import {
  HOT_MARKET_OUTREACH_CONTACTS,
  HOT_MARKET_DAILY_TARGET,
  HOT_MARKET_RECURRING_SOURCE_TYPE,
  HOT_MARKET_SEND_AT,
  getHotMarketScheduledAt,
  hotMarketOutreachBody,
  hotMarketOutreachSubject,
  isHotMarketSourceType,
} from "./hotMarketOutreachBatch";
import {
  assertVerifiedHotMarketContact,
  assertVerifiedOutreachBatch,
  isCompanyDomainEmail,
} from "./outreachContactValidation";
import { approvedOutreachBody } from "./verifiedOutreachBatch";

test("the one-time Arizona hot-market batch contains every currently verified new contact", () => {
  assert.equal(HOT_MARKET_DAILY_TARGET, 50);
  assert.equal(HOT_MARKET_OUTREACH_CONTACTS.length, 23);
  assert.equal(
    new Set(HOT_MARKET_OUTREACH_CONTACTS.map((contact) => contact.contactEmail)).size,
    23,
  );
  assert.ok(HOT_MARKET_OUTREACH_CONTACTS.every((contact) =>
    contact.approvalStatus === "approved"
    && contact.state === "AZ"
    && contact.emailEvidence.startsWith("https://")
    && contact.personalization.length > 20
  ));
  assert.ok(!HOT_MARKET_OUTREACH_CONTACTS.some((contact) =>
    ["alston@alstonco.com", "frank.dascanio@weitz.com"].includes(contact.contactEmail)
  ));
  assert.doesNotThrow(() =>
    assertVerifiedOutreachBatch(HOT_MARKET_OUTREACH_CONTACTS, 23)
  );
});

test("the approved hot-market copy leads with the builder value proposition", () => {
  const builder = HOT_MARKET_OUTREACH_CONTACTS.find(
    (contact) => contact.audience === "builder",
  )!;
  const body = hotMarketOutreachBody(builder);
  assert.equal(hotMarketOutreachSubject(), "Fast engineering support for active projects");
  assert.equal(body, approvedOutreachBody(builder.contactName));
  assert.doesNotMatch(body, /drainage|utility|site issue|project-specific/i);
});

test("hot-market referral partners use the same approved shared copy", () => {
  const partner = HOT_MARKET_OUTREACH_CONTACTS.find(
    (contact) => contact.audience === "architect",
  )!;
  const body = hotMarketOutreachBody(partner);
  assert.equal(
    hotMarketOutreachSubject(partner.audience),
    "A reliable engineering partner for active projects",
  );
  assert.equal(body, approvedOutreachBody(partner.contactName));
});

test("hot-market personalization does not narrow the firm to Scottsdale", () => {
  for (const contact of HOT_MARKET_OUTREACH_CONTACTS) {
    assert.doesNotMatch(
      hotMarketOutreachBody(contact),
      /Scottsdale/i,
      contact.companyName,
    );
    assert.doesNotMatch(
      hotMarketOutreachBody(contact),
      /Alaska/i,
      contact.companyName,
    );
  }
});

test("the hot-market messages wait until after the regular 8 AM Phoenix batch", () => {
  assert.equal(HOT_MARKET_SEND_AT.toISOString(), "2026-09-03T15:10:00.000Z");
  assert.equal(
    getHotMarketScheduledAt(new Date("2026-09-04T15:00:00.000Z")).toISOString(),
    "2026-09-04T15:10:00.000Z",
  );
});

test("recurring and legacy hot-market messages share one quota lane", () => {
  assert.equal(isHotMarketSourceType("hot_market_one_time"), true);
  assert.equal(isHotMarketSourceType(HOT_MARKET_RECURRING_SOURCE_TYPE), true);
  assert.equal(isHotMarketSourceType(null), false);
  assert.equal(isHotMarketSourceType("regular"), false);
});

test("verified hot-market contacts require public evidence and company-domain email", () => {
  const contact = {
    dedupeKey: "verified-hot-market-example",
    companyName: "Example Builders",
    website: "https://example.com",
    contactName: "Alex Rivera",
    contactTitle: "President",
    contactEmail: "alex@example.com",
    sourceUrl: "https://permits.example.gov/project/123",
    projectEvidenceUrl: "https://permits.example.gov/project/123",
    contactSourceUrl: "https://example.com/team",
    emailSourceUrl: "https://example.com/contact",
  };
  assert.equal(isCompanyDomainEmail(contact.contactEmail, contact.website), true);
  assert.equal(isCompanyDomainEmail("alex@gmail.com", contact.website), false);
  assert.doesNotThrow(() => assertVerifiedHotMarketContact(contact));
  assert.throws(
    () => assertVerifiedHotMarketContact({ ...contact, contactEmail: "alex@gmail.com" }),
    /company-domain email/,
  );
});