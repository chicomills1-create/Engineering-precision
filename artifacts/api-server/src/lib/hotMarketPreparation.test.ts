import assert from "node:assert/strict";
import test from "node:test";
import {
  countHotMarketMessages,
  getHotMarketRemainingCapacity,
} from "./hotMarketPreparation";
import {
  HOT_MARKET_RECURRING_SOURCE_TYPE,
  HOT_MARKET_SOURCE_TYPE,
} from "./hotMarketOutreachBatch";

test("hot-market preparation never exceeds the 50-message daily lane", () => {
  assert.equal(getHotMarketRemainingCapacity(0), 50);
  assert.equal(getHotMarketRemainingCapacity(40), 10);
  assert.equal(getHotMarketRemainingCapacity(50), 0);
  assert.equal(getHotMarketRemainingCapacity(60), 0);
});

test("recurring research messages consume the same next-day Hot Market capacity", () => {
  const existing = countHotMarketMessages([
    ...Array.from({ length: 50 }, () => HOT_MARKET_RECURRING_SOURCE_TYPE),
    HOT_MARKET_SOURCE_TYPE,
    "regular",
    null,
  ]);
  assert.equal(existing, 51);
  assert.equal(getHotMarketRemainingCapacity(existing), 0);
});