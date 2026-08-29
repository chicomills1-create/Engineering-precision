import assert from "node:assert/strict";
import { test } from "node:test";
import {
  approvedOutreachBody,
  VERIFIED_OUTREACH_CONTACTS,
} from "./verifiedOutreachBatch";
import {
  assertOutreachContactData,
  assertVerifiedOutreachBatch,
  isUsableBusinessEmail,
} from "./outreachContactValidation";

test("the verified morning batch contains exactly 167 unique, valid contacts", () => {
  const domains = VERIFIED_OUTREACH_CONTACTS.map((contact) =>
    new URL(contact.website).hostname.replace(/^www\./, "").toLowerCase()
  );
  assert.equal(VERIFIED_OUTREACH_CONTACTS.length, 167);
  assert.equal(new Set(VERIFIED_OUTREACH_CONTACTS.map((contact) => contact.contactEmail)).size, VERIFIED_OUTREACH_CONTACTS.length);
  assert.equal(new Set(domains).size, VERIFIED_OUTREACH_CONTACTS.length);
  assert.ok(VERIFIED_OUTREACH_CONTACTS.some((contact) => contact.audience === "architect"));
  assert.ok(VERIFIED_OUTREACH_CONTACTS.some((contact) => contact.audience === "builder"));
  assert.ok(VERIFIED_OUTREACH_CONTACTS.every((contact) =>
    contact.contactSourceUrl.startsWith("https://")
    && contact.sourceUrl.startsWith("https://")
    && contact.contactEmail.includes("@")
  ));
  assert.doesNotThrow(() => assertVerifiedOutreachBatch(VERIFIED_OUTREACH_CONTACTS));
});

test("legacy placeholders cannot enter seed or approval paths", () => {
  assert.equal(isUsableBusinessEmail("null"), false);
  assert.equal(isUsableBusinessEmail("info@company.com"), false);
  assert.throws(
    () => assertOutreachContactData({
      companyName: "[object Object]",
      contactEmail: "info@company.com",
      sourceUrl: "",
    }),
    /usable company name, real business email, public source URL/,
  );
});

test("the seed validator quarantines duplicate identities before database writes", () => {
  const contact = VERIFIED_OUTREACH_CONTACTS[0]!;
  const duplicateBatch = [
    ...VERIFIED_OUTREACH_CONTACTS.slice(0, -1),
    { ...contact, dedupeKey: `${contact.dedupeKey}-copy` },
  ];
  assert.throws(
    () => assertVerifiedOutreachBatch(duplicateBatch),
    /duplicate email/,
  );
});

test("the approved body uses only the approved pipeline closing", () => {
  const body = approvedOutreachBody("Alex Rivera");
  assert.match(body, /^Hi Alex,/);
  assert.match(body, /Do you have any current projects in your pipeline that you would like us to review\?$/);
  assert.doesNotMatch(body, /plan-review comment|field condition|waiting on engineering answers/i);
});