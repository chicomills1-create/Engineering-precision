import assert from "node:assert/strict";
import { test } from "node:test";
import {
  APPROVED_HOT_MARKET_INVENTORY_SIZE,
  HOT_MARKET_OUTREACH_CONTACTS,
  HOT_MARKET_DAILY_TARGET,
  HOT_MARKET_RECURRING_SOURCE_TYPE,
  getHotMarketScheduledAt,
  getOneTimeHotMarketScheduledAt,
  hotMarketOutreachBody,
  hotMarketOutreachSubject,
  isHotMarketSourceType,
} from "./hotMarketOutreachBatch";
import {
  assertVerifiedHotMarketContact,
  assertVerifiedOutreachBatch,
  isCompanyDomainEmail,
} from "./outreachContactValidation";

test("the one-time hot-market batch contains every currently verified new contact", () => {
  assert.equal(HOT_MARKET_DAILY_TARGET, 100);
  assert.equal(
    HOT_MARKET_OUTREACH_CONTACTS.length,
    APPROVED_HOT_MARKET_INVENTORY_SIZE,
  );
  assert.equal(
    new Set(HOT_MARKET_OUTREACH_CONTACTS.map((contact) => contact.contactEmail)).size,
    APPROVED_HOT_MARKET_INVENTORY_SIZE,
  );
  assert.equal(
    new Set(HOT_MARKET_OUTREACH_CONTACTS.map(
      (contact) => new URL(contact.website).hostname.replace(/^www\./, "").toLowerCase(),
    )).size,
    APPROVED_HOT_MARKET_INVENTORY_SIZE,
  );
  assert.ok(HOT_MARKET_OUTREACH_CONTACTS.every((contact) =>
    contact.approvalStatus === "approved"
    && /^[A-Z]{2}$/.test(contact.state)
    && contact.emailEvidence.startsWith("https://")
    && contact.personalization.length > 20
  ));
  assert.ok(!HOT_MARKET_OUTREACH_CONTACTS.some((contact) =>
    ["alston@alstonco.com", "frank.dascanio@weitz.com"].includes(contact.contactEmail)
  ));
  assert.doesNotThrow(() =>
    assertVerifiedOutreachBatch(
      HOT_MARKET_OUTREACH_CONTACTS,
      APPROVED_HOT_MARKET_INVENTORY_SIZE,
    )
  );
});

test("the national expansion preserves at least 50 verified contacts across both copy lanes", () => {
  const expansion = HOT_MARKET_OUTREACH_CONTACTS.filter((contact) => contact.state !== "AZ");
  assert.ok(expansion.length >= 50);
  assert.ok(expansion.filter((contact) => contact.audience === "builder").length >= 35);
  assert.ok(expansion.filter((contact) => contact.audience === "architect").length >= 15);
});

test("the approved hot-market copy leads with the builder value proposition", () => {
  const builder = HOT_MARKET_OUTREACH_CONTACTS.find(
    (contact) => contact.audience === "builder",
  )!;
  const body = hotMarketOutreachBody(builder);
  assert.equal(
    hotMarketOutreachSubject(),
    "Fast engineering support for active projects",
  );
  assert.match(body, /structural change, site issue, MEP coordination item, or permit response/i);
  assert.match(body, /clear competitive pricing/i);
  assert.match(body, /12–24 hours/i);
});

test("hot-market referral partners use relationship-focused copy", () => {
  const partner = HOT_MARKET_OUTREACH_CONTACTS.find(
    (contact) => contact.audience === "architect",
  )!;
  const body = hotMarketOutreachBody(partner);
  assert.equal(
    hotMarketOutreachSubject(partner.audience),
    "A reliable engineering partner for active projects",
  );
  assert.match(body, /work alongside architects and design teams/i);
  assert.match(body, /without taking over the client relationship/i);
  assert.doesNotMatch(body, /waiting on engineering can slow the job down/i);
});

test("builder hot-market contacts use their approved direct-client subject nationally", () => {
  assert.equal(
    hotMarketOutreachSubject("builder", "AZ"),
    "Fast engineering support for active projects",
  );
  assert.equal(
    hotMarketOutreachSubject("builder", "CA"),
    "Fast engineering support for active projects",
  );
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

test("one-time hot-market messages dynamically wait until after the regular 8 PM Phoenix batch", () => {
  assert.equal(
    getHotMarketScheduledAt(new Date("2026-09-04T15:00:00.000Z")).toISOString(),
    "2026-09-04T15:10:00.000Z",
  );
  assert.equal(
    getOneTimeHotMarketScheduledAt(new Date("2026-09-04T15:01:00.000Z")).toISOString(),
    "2026-09-05T03:10:00.000Z",
  );
  assert.equal(
    getOneTimeHotMarketScheduledAt(new Date("2027-02-10T14:59:00.000Z")).toISOString(),
    "2027-02-11T03:10:00.000Z",
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