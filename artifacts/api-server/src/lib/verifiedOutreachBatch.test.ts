import assert from "node:assert/strict";
import { test } from "node:test";
import {
  approvedOutreachBody,
  VERIFIED_OUTREACH_CONTACTS,
} from "./verifiedOutreachBatch";

test("the verified morning batch contains unique, sourced contacts", () => {
  const domains = VERIFIED_OUTREACH_CONTACTS.map((contact) =>
    new URL(contact.website).hostname.replace(/^www\./, "").toLowerCase()
  );
  assert.ok(VERIFIED_OUTREACH_CONTACTS.length > 0);
  assert.equal(new Set(VERIFIED_OUTREACH_CONTACTS.map((contact) => contact.contactEmail)).size, VERIFIED_OUTREACH_CONTACTS.length);
  assert.equal(new Set(domains).size, VERIFIED_OUTREACH_CONTACTS.length);
  assert.ok(VERIFIED_OUTREACH_CONTACTS.some((contact) => contact.audience === "architect"));
  assert.ok(VERIFIED_OUTREACH_CONTACTS.some((contact) => contact.audience === "builder"));
  assert.ok(VERIFIED_OUTREACH_CONTACTS.every((contact) =>
    contact.contactSourceUrl.startsWith("https://")
    && contact.sourceUrl.startsWith("https://")
    && contact.contactEmail.includes("@")
  ));
});

test("the approved body uses only the approved pipeline closing", () => {
  const body = approvedOutreachBody("Alex Rivera");
  assert.match(body, /^Hi Alex,/);
  assert.match(body, /Do you have any current projects in your pipeline that you would like us to review\?$/);
  assert.doesNotMatch(body, /plan-review comment|field condition|waiting on engineering answers/i);
});