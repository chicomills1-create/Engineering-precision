import assert from "node:assert/strict";
import { test } from "node:test";
import {
  approvedOutreachBody,
  approvedOutreachFollowUpMessages,
  approvedOutreachSubject,
  hotLeadFollowUpMessages,
  preflightVerifiedOutreachBatch,
  VERIFIED_OUTREACH_CONTACTS,
} from "./verifiedOutreachBatch";
import { VERIFIED_OUTREACH_CONTACTS_AUG_30 } from "./verifiedOutreachContactsAug30";
import { VERIFIED_OUTREACH_CONTACTS_AUG_31 } from "./verifiedOutreachContactsAug31";
import { VERIFIED_OUTREACH_CONTACTS_SEP_02 } from "./verifiedOutreachContactsSep02";
import { VERIFIED_OUTREACH_CONTACTS_SEP_02_PUBLIC } from "./verifiedOutreachContactsSep02Public";
import { VERIFIED_OUTREACH_CONTACTS_SEP_05 } from "./verifiedOutreachContactsSep05";
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

test("the September 2 fill contains exactly 145 verified distinct contacts", () => {
  assert.equal(VERIFIED_OUTREACH_CONTACTS_SEP_02.length, 145);
  assert.equal(
    new Set(VERIFIED_OUTREACH_CONTACTS_SEP_02.map((contact) => contact.contactEmail)).size,
    145,
  );
  assert.equal(
    new Set(VERIFIED_OUTREACH_CONTACTS_SEP_02.map((contact) =>
      new URL(contact.website).hostname.replace(/^www\./, "").toLowerCase()
    )).size,
    145,
  );
  assert.equal(
    VERIFIED_OUTREACH_CONTACTS_SEP_02.filter((contact) => contact.state === "AZ").length,
    43,
  );
  assert.doesNotThrow(() => assertVerifiedOutreachBatch(VERIFIED_OUTREACH_CONTACTS_SEP_02, 145));
});

test("the September 2 Public fallback library contains 41 official-site contacts", () => {
  assert.equal(VERIFIED_OUTREACH_CONTACTS_SEP_02_PUBLIC.length, 41);
  assert.equal(
    new Set(VERIFIED_OUTREACH_CONTACTS_SEP_02_PUBLIC.map((contact) =>
      contact.contactEmail
    )).size,
    41,
  );
  assert.equal(
    new Set(VERIFIED_OUTREACH_CONTACTS_SEP_02_PUBLIC.map((contact) =>
      new URL(contact.website).hostname.replace(/^www\./, "").toLowerCase()
    )).size,
    41,
  );
  assert.ok(VERIFIED_OUTREACH_CONTACTS_SEP_02_PUBLIC.every((contact) =>
    contact.emailLane === "public"
    && contact.emailEvidence.startsWith("https://")
  ));
  assert.doesNotThrow(() =>
    assertVerifiedOutreachBatch(VERIFIED_OUTREACH_CONTACTS_SEP_02_PUBLIC, 41)
  );
});

test("the September 5 Public top-up contains exactly 50 distinct official-site contacts", () => {
  assert.equal(VERIFIED_OUTREACH_CONTACTS_SEP_05.length, 50);
  assert.equal(
    new Set(VERIFIED_OUTREACH_CONTACTS_SEP_05.map((contact) => contact.contactEmail)).size,
    50,
  );
  assert.equal(
    new Set(VERIFIED_OUTREACH_CONTACTS_SEP_05.map((contact) =>
      new URL(contact.website).hostname.replace(/^www\./, "").toLowerCase()
    )).size,
    50,
  );
  assert.ok(VERIFIED_OUTREACH_CONTACTS_SEP_05.every((contact) =>
    contact.emailLane === "public"
    && contact.contactSourceUrl.startsWith("https://")
    && contact.sourceUrl.startsWith("https://")
  ));
  assert.doesNotThrow(() =>
    assertVerifiedOutreachBatch(VERIFIED_OUTREACH_CONTACTS_SEP_05, 50)
  );
});

test("the dated inventory preflight reports exact production conflicts without writes", async () => {
  const contacts = VERIFIED_OUTREACH_CONTACTS_SEP_05.slice(0, 4);
  const emailConflict = contacts[0]!;
  const domainConflict = contacts[1]!;
  const suppressed = contacts[2]!;
  const report = await preflightVerifiedOutreachBatch({
    label: "September 5 Public",
    target: 4,
    contacts,
    snapshot: {
      activeProspects: [
        {
          companyName: "Existing Email Company",
          contactEmail: emailConflict.contactEmail.toUpperCase(),
          website: "https://unrelated-existing.example",
        },
        {
          companyName: "Existing Domain Company",
          contactEmail: "other@unrelated.example",
          website: domainConflict.website,
        },
      ],
      suppressedEmails: [suppressed.contactEmail.toUpperCase()],
    },
  });

  assert.equal(report.usableCount, 1);
  assert.equal(report.replacementsNeeded, 3);
  assert.deepEqual(
    report.conflicts.map(({ companyName, conflicts }) => ({ companyName, conflicts })),
    [
      { companyName: emailConflict.companyName, conflicts: ["email"] },
      { companyName: domainConflict.companyName, conflicts: ["domain"] },
      { companyName: suppressed.companyName, conflicts: ["suppression"] },
    ],
  );
  assert.deepEqual(report.conflicts[0]?.conflictingCompanies, ["Existing Email Company"]);
  assert.deepEqual(report.conflicts[1]?.conflictingCompanies, ["Existing Domain Company"]);
});

test("an enforced dated inventory preflight fails with blocked companies and usable count", async () => {
  const contacts = VERIFIED_OUTREACH_CONTACTS_SEP_05.slice(0, 2);
  await assert.rejects(
    preflightVerifiedOutreachBatch({
      label: "September 5 Public",
      target: 2,
      contacts,
      enforceTarget: true,
      snapshot: {
        activeProspects: [{
          companyName: "Already Active",
          contactEmail: contacts[0]!.contactEmail,
          website: contacts[0]!.website,
        }],
        suppressedEmails: [],
      },
    }),
    new RegExp(
      `September 5 Public preflight requires 2 usable contacts; found 1, replacements needed 1\\. `
      + `Blocked companies: ${contacts[0]!.companyName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")} \\(email, domain\\)`,
    ),
  );
});

test("the preflight blocks historical non-active prospects just like the production seed", async () => {
  const contacts = VERIFIED_OUTREACH_CONTACTS_SEP_05.slice(0, 2);
  const historicalConflict = contacts[0]!;
  await assert.rejects(
    preflightVerifiedOutreachBatch({
      label: "September 5 Public",
      target: 2,
      contacts,
      enforceTarget: true,
      snapshot: {
        activeProspects: [{
          companyName: "Historical Prospect",
          contactEmail: "different@historical.example",
          website: historicalConflict.website,
          contactStatus: "departed",
        }],
        suppressedEmails: [],
      },
    }),
    /found 1, replacements needed 1.*Blocked companies: .+ \(domain\)/,
  );
});

test("the enabled seed uses committed contacts without a private-storage prerequisite", async () => {
  const source = await import("node:fs/promises")
    .then((fs) => fs.readFile(new URL("./verifiedOutreachBatch.ts", import.meta.url), "utf8"));
  assert.doesNotMatch(source, /ObjectStorageService|STAGED_BATCH_OBJECT|loadStagedVerifiedContacts/);
  assert.match(source, /VERIFIED_OUTREACH_CONTACTS_AUG_30/);
  assert.match(source, /VERIFIED_OUTREACH_CONTACTS_AUG_31/);
  assert.match(source, /VERIFIED_OUTREACH_CONTACTS_SEP_02/);
  assert.match(source, /VERIFIED_OUTREACH_CONTACTS_SEP_02_PUBLIC/);
  assert.match(source, /for \(const batch of datedBatches\)/);
});

test("the legacy verified pool leaves daily scheduling to the shared preparation service", async () => {
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
  assert.equal(
    approvedOutreachSubject(),
    "A reliable engineering partner for active projects",
  );
  const body = approvedOutreachBody("Alex Rivera");
  assert.equal(
    body,
    `Hi Alex,


Apex Grid is a veteran-owned engineering organization providing full-discipline support — Civil, Structural, MEP, drainage, utility, permit-response, and drafting.


We’re licensed in 49 states, and we work fast: focused reviews typically turn around in 12–24 hours.


Do you have an active project in your pipeline that you would like us to review?`,
  );
  assert.doesNotMatch(body, /Click the URL|https:\/\/apexgrideng\.com/i);
  assert.doesNotMatch(body, /15.?minute|15 min|schedule|book.*call/i);
  assert.doesNotMatch(body, /plan-review comment|field condition|waiting on engineering answers/i);
});

test("the approved opener follow-up is one concise reply-first touch", () => {
  const followUps = approvedOutreachFollowUpMessages("Alex Rivera");
  assert.deepEqual(followUps.map((followUp) => followUp.sequenceNumber), [2]);
  assert.equal(followUps[0]?.subject, "Ready for us to review an active project?");
  assert.match(followUps[0]?.body ?? "", /Thanks for taking a look at my earlier note/);
  assert.match(followUps[0]?.body ?? "", /Reply with the project location and the drawings or scope you have available/);
  assert.match(followUps[0]?.body ?? "", /right-sized path forward and clear pricing before work begins/);
  assert.ok(followUps.every((followUp) =>
    !/Click the URL|https:\/\/apexgrideng\.com/i.test(followUp.body)
    && !/15.?minute|15 min|schedule|book.*call/i.test(followUp.body)
    && /reply|project location|drawings or scope/i.test(followUp.body)
  ));
});

test("the hot-lead sequence uses its single dedicated follow-up template", () => {
  const followUps = hotLeadFollowUpMessages("Alex Rivera");
  assert.deepEqual(followUps, [{
    sequenceNumber: 2,
    subject: "Following up, Alex",
    body: "Hi Alex, Saw you stopped by our site — figured I'd follow up personally. We're a veteran-owned engineering firm (MEP, structural, civil) licensed in 49 states. Most of our developer and builder clients call us when plan-check is threatening their timeline. We clear corrections fast and stamp what needs stamping. If you've got an active project, reply with the address — I'll have a quote back to you within 24 hours. Jeremy Mills / CEO · USAF Veteran / Apex Grid Engineering PLLC / 22475 E Quintero Rd, Queen Creek, AZ 85142",
  }]);
});
