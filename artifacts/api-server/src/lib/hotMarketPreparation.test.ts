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

test("hot-market preparation never exceeds the 100-message daily lane", () => {
  assert.equal(getHotMarketRemainingCapacity(0), 100);
  assert.equal(getHotMarketRemainingCapacity(40), 60);
  assert.equal(getHotMarketRemainingCapacity(100), 0);
  assert.equal(getHotMarketRemainingCapacity(160), 0);
});

test("recurring research messages consume the same next-day Hot Market capacity", () => {
  const existing = countHotMarketMessages([
    ...Array.from({ length: 100 }, () => HOT_MARKET_RECURRING_SOURCE_TYPE),
    HOT_MARKET_SOURCE_TYPE,
    "regular",
    null,
  ]);
  assert.equal(existing, 101);
  assert.equal(getHotMarketRemainingCapacity(existing), 0);
});