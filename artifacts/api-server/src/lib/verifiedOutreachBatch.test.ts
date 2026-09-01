import assert from "node:assert/strict";
import { test } from "node:test";
import {
  approvedOutreachBody,
  approvedOutreachFollowUpMessages,
  VERIFIED_OUTREACH_CONTACTS,
} from "./verifiedOutreachBatch";
import { VERIFIED_OUTREACH_CONTACTS_AUG_30 } from "./verifiedOutreachContactsAug30";
import { VERIFIED_OUTREACH_CONTACTS_AUG_31 } from "./verifiedOutreachContactsAug31";
import {
  assertOutreachContactData,
  assertVerifiedOutreachBatch,
  isUsableBusinessEmail,
} from "./outreachContactValidation";

test("the verified legacy outreach library contains exactly 313 unique, valid contacts", () => {
  const domains = VERIFIED_OUTREACH_CONTACTS.map((contact) =>
    new URL(contact.website).hostname.replace(/^www\./, "").toLowerCase()
  );
  assert.equal(VERIFIED_OUTREACH_CONTACTS.length, 313);
  assert.equal(new Set(VERIFIED_OUTREACH_CONTACTS.map((contact) => contact.contactEmail)).size, VERIFIED_OUTREACH_CONTACTS.length);
  assert.equal(new Set(domains).size, VERIFIED_OUTREACH_CONTACTS.length);
  assert.ok(VERIFIED_OUTREACH_CONTACTS.some((contact) => contact.audience === "architect"));
  assert.ok(VERIFIED_OUTREACH_CONTACTS.some((contact) => contact.audience === "builder"));
  assert.ok(VERIFIED_OUTREACH_CONTACTS.every((contact) =>
    contact.contactSourceUrl.startsWith("https://")
    && contact.sourceUrl.startsWith("https://")
    && contact.contactEmail.includes("@")
  ));
  assert.doesNotThrow(() => assertVerifiedOutreachBatch(VERIFIED_OUTREACH_CONTACTS, 313));
});

test("the August 30 backfill pool can supply exactly 150 distinct contacts", () => {
  assert.ok(VERIFIED_OUTREACH_CONTACTS_AUG_30.length > 150);
  assert.equal(
    new Set(VERIFIED_OUTREACH_CONTACTS_AUG_30.map((contact) => contact.contactEmail)).size,
    VERIFIED_OUTREACH_CONTACTS_AUG_30.length,
  );
  assert.equal(
    new Set(VERIFIED_OUTREACH_CONTACTS_AUG_30.map((contact) =>
      new URL(contact.website).hostname.replace(/^www\./, "").toLowerCase()
    )).size,
    VERIFIED_OUTREACH_CONTACTS_AUG_30.length,
  );
  assert.doesNotThrow(() => assertVerifiedOutreachBatch(VERIFIED_OUTREACH_CONTACTS_AUG_30));
});

test("the August 31 reserve contains exactly 150 verified distinct contacts", () => {
  assert.equal(VERIFIED_OUTREACH_CONTACTS_AUG_31.length, 150);
  assert.equal(
    new Set(VERIFIED_OUTREACH_CONTACTS_AUG_31.map((contact) => contact.contactEmail)).size,
    150,
  );
  assert.equal(
    new Set(VERIFIED_OUTREACH_CONTACTS_AUG_31.map((contact) =>
      new URL(contact.website).hostname.replace(/^www\./, "").toLowerCase()
    )).size,
    150,
  );
  assert.doesNotThrow(() => assertVerifiedOutreachBatch(VERIFIED_OUTREACH_CONTACTS_AUG_31, 150));
});

test("the enabled seed uses committed contacts without a private-storage prerequisite", async () => {
  const source = await import("node:fs/promises")
    .then((fs) => fs.readFile(new URL("./verifiedOutreachBatch.ts", import.meta.url), "utf8"));
  assert.doesNotMatch(source, /ObjectStorageService|STAGED_BATCH_OBJECT|loadStagedVerifiedContacts/);
  assert.match(source, /VERIFIED_OUTREACH_CONTACTS_AUG_30/);
  assert.match(source, /VERIFIED_OUTREACH_CONTACTS_AUG_31/);
  assert.match(source, /for \(const batch of datedBatches\)/);
});

test("the legacy verified pool leaves daily scheduling to the 150-slot preparation service", async () => {
  const source = await import("node:fs/promises")
    .then((fs) => fs.readFile(new URL("./verifiedOutreachBatch.ts", import.meta.url), "utf8"));
  assert.doesNotMatch(source, /outreachMessagesTable|status:\s*"approved",\s*scheduledAt/);
  assert.match(source, /preparation service owns all\s*\n\s*\/\/ message creation/);
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
  assert.match(body, /Click the URL to visit our page: https:\/\/apexgrideng\.com\./);
  assert.match(body, /Do you have any current projects in your pipeline that you would like us to review\?$/);
  assert.doesNotMatch(body, /15.?minute|15 min|schedule|book.*call/i);
  assert.doesNotMatch(body, /plan-review comment|field condition|waiting on engineering answers/i);
});

test("approved follow-ups are concise, scheduled later, and contain no call CTA", () => {
  const followUps = approvedOutreachFollowUpMessages("Alex Rivera");
  assert.deepEqual(followUps.map((followUp) => followUp.sequenceNumber), [2, 3, 4]);
  assert.ok(followUps.every((followUp) =>
    followUp.body.includes("Click the URL to visit our page: https://apexgrideng.com.")
    && !/15.?minute|15 min|schedule|book.*call/i.test(followUp.body)
  ));
});
