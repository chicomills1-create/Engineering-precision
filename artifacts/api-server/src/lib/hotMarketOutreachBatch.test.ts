import assert from "node:assert/strict";
import { test } from "node:test";
import {
  HOT_MARKET_OUTREACH_CONTACTS,
  HOT_MARKET_SEND_AT,
  hotMarketOutreachBody,
  hotMarketOutreachSubject,
} from "./hotMarketOutreachBatch";
import { assertVerifiedOutreachBatch } from "./outreachContactValidation";

test("the one-time Arizona hot-market batch contains every currently verified new contact", () => {
  assert.equal(HOT_MARKET_OUTREACH_CONTACTS.length, 19);
  assert.equal(
    new Set(HOT_MARKET_OUTREACH_CONTACTS.map((contact) => contact.contactEmail)).size,
    19,
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
    assertVerifiedOutreachBatch(HOT_MARKET_OUTREACH_CONTACTS, 19)
  );
});

test("the approved hot-market copy leads with the builder value proposition", () => {
  const body = hotMarketOutreachBody(HOT_MARKET_OUTREACH_CONTACTS[0]!);
  assert.equal(hotMarketOutreachSubject(), "Fast engineering support for active projects");
  assert.match(body, /veteran-owned, PE-led/);
  assert.match(body, /Civil, Structural, MEP, permit-response, and drafting support/);
  assert.match(body, /consistent work/);
  assert.match(body, /clear competitive pricing/);
  assert.match(body, /12–24 hours/);
  assert.match(body, /current projects in your pipeline/);
  assert.doesNotMatch(body, /amazing price|military-backed/i);
});

test("the hot-market messages wait until after the regular 8 AM Phoenix batch", () => {
  assert.equal(HOT_MARKET_SEND_AT.toISOString(), "2026-09-03T15:10:00.000Z");
});