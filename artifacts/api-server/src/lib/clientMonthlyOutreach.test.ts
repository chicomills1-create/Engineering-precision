import assert from "node:assert/strict";
import test from "node:test";
import { clientMonthlyPeriodKey, deriveClientMonthlySafeList } from "./clientMonthlyOutreach";

const archivedAt = new Date("2026-08-01T00:00:00Z");
const optedAt = new Date("2026-08-02T00:00:00Z");

function job(overrides: Partial<Parameters<typeof deriveClientMonthlySafeList>[0][number]> = {}) {
  return {
    id: 1,
    submitterName: "Client One",
    submitterEmail: "Client@Example.com",
    companyName: "Example Co",
    archivedAt,
    monthlyEmailOptIn: true,
    monthlyEmailOptedAt: optedAt,
    ...overrides,
  };
}

test("safe list requires archive state and explicit opt-in", () => {
  const contacts = deriveClientMonthlySafeList([
    job(),
    job({ id: 2, submitterEmail: "active@example.com", archivedAt: null }),
    job({ id: 3, submitterEmail: "not-opted@example.com", monthlyEmailOptIn: false }),
    job({ id: 4, submitterEmail: "invalid" }),
  ], []);
  assert.deepEqual(contacts.map((contact) => contact.email), ["client@example.com"]);
});

test("safe list removes suppressed addresses and deduplicates by normalized email", () => {
  const contacts = deriveClientMonthlySafeList([
    job(),
    job({
      id: 2,
      submitterName: "Newest Client",
      submitterEmail: " client@example.com ",
      archivedAt: new Date("2026-08-10T00:00:00Z"),
    }),
    job({ id: 3, submitterEmail: "blocked@example.com" }),
  ], ["BLOCKED@example.com"]);
  assert.equal(contacts.length, 1);
  assert.equal(contacts[0]?.jobId, 2);
  assert.equal(contacts[0]?.name, "Newest Client");
});

test("monthly claim period follows Phoenix calendar time", () => {
  assert.equal(clientMonthlyPeriodKey(new Date("2026-09-01T06:30:00Z")), "2026-08");
  assert.equal(clientMonthlyPeriodKey(new Date("2026-09-01T07:30:00Z")), "2026-09");
});