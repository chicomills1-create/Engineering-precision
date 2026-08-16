import { test } from "node:test";
import assert from "node:assert/strict";
import { mapIndexVerdict } from "./gscInspection";

test("PASS maps to indexed", () => {
  assert.equal(mapIndexVerdict("PASS"), "indexed");
});

test("PARTIAL maps to indexed (indexed with issues, still on Google)", () => {
  assert.equal(mapIndexVerdict("PARTIAL"), "indexed");
});

test("NEUTRAL maps to not_indexed (excluded / not on Google)", () => {
  assert.equal(mapIndexVerdict("NEUTRAL"), "not_indexed");
});

test("FAIL maps to not_indexed", () => {
  assert.equal(mapIndexVerdict("FAIL"), "not_indexed");
});

test("missing verdict maps to unknown", () => {
  assert.equal(mapIndexVerdict(undefined), "unknown");
});

test("VERDICT_UNSPECIFIED maps to unknown", () => {
  assert.equal(mapIndexVerdict("VERDICT_UNSPECIFIED"), "unknown");
});
