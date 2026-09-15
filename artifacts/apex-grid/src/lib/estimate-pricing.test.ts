import assert from "node:assert/strict";
import test from "node:test";

import {
  calculateEstimate,
  ESTIMATE_PROJECT_TYPES,
  getStateMultiplier,
} from "./estimate-pricing";

test("exposes the nine owner-specified project types", () => {
  assert.equal(ESTIMATE_PROJECT_TYPES.length, 9);
  assert.deepEqual(ESTIMATE_PROJECT_TYPES, [
    "New commercial building (office/retail/mixed-use)",
    "Tenant improvement / remodel",
    "Industrial / warehouse",
    "Restaurant / food service",
    "Healthcare / medical",
    "ADU / residential",
    "PE stamp & plan review only",
    "Title 24 energy compliance only",
    "Plan-check corrections",
  ]);
});

test("applies state multipliers only where calculation logic requests them", () => {
  assert.equal(getStateMultiplier("CA"), 1.3);
  assert.equal(getStateMultiplier("NY"), 1.2);
  assert.equal(getStateMultiplier("WA"), 1.2);
  assert.equal(getStateMultiplier("HI"), 1.2);
  assert.equal(getStateMultiplier("AZ"), 1);
});

test("calculates the commercial headline and range with the California multiplier", () => {
  const result = calculateEstimate({
    projectType: "New commercial building (office/retail/mixed-use)",
    squareFootage: 10_000,
    state: "CA",
  });

  assert.equal(result.type, "sqft");
  assert.equal(result.headline, 29_250);
  assert.equal(result.low, 22_750);
  assert.equal(result.high, 42_250);
});

test("clamps every square-foot calculation endpoint to the $1,500 minimum", () => {
  const result = calculateEstimate({
    projectType: "Industrial / warehouse",
    squareFootage: 100,
    state: "AZ",
  });

  assert.equal(result.headline, 1_500);
  assert.equal(result.low, 1_500);
  assert.equal(result.high, 1_500);
});

test("uses flat figures without a state multiplier", () => {
  const result = calculateEstimate({
    projectType: "ADU / residential",
    squareFootage: 10_000,
    state: "CA",
  });

  assert.equal(result.type, "flat");
  assert.equal(result.headline, 5_000);
  assert.equal(result.low, 3_500);
  assert.equal(result.high, 8_000);
  assert.match(result.assumptions, /state multiplier are not applied/i);
});

test("matches the owner's PE stamp worked example", () => {
  const result = calculateEstimate({
    projectType: "PE stamp & plan review only",
    peBasis: "New commercial building (office/retail/mixed-use)",
    squareFootage: 10_000,
    state: "AZ",
  });

  assert.equal(result.type, "pe");
  assert.equal(result.headline, 2_700);
  assert.equal(result.low, 2_250);
  assert.equal(result.high, 4_500);
  assert.match(result.calcBreakdown, /Reference fee: \$22,500/);
});

test("applies the $500 PE stamp floor after the reference fee calculation", () => {
  const result = calculateEstimate({
    projectType: "PE stamp & plan review only",
    peBasis: "Industrial / warehouse",
    squareFootage: 100,
    state: "AZ",
  });

  assert.equal(result.headline, 500);
  assert.equal(result.low, 500);
  assert.equal(result.high, 500);
});

test("returns the owner-specified custom plan-check result", () => {
  const result = calculateEstimate({
    projectType: "Plan-check corrections",
    squareFootage: 10_000,
    state: "CA",
  });

  assert.equal(result.type, "custom");
  assert.equal(result.message, "Custom quote — typical $1,500–$5,000");
});