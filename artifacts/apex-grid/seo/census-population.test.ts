import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import {
  parseAcsPopulations,
  parsePepPopulations,
  populationAllowsIndexing,
  resolvePopulation,
} from "./census-population";

const fixtures = path.join(import.meta.dirname, "fixtures/census");
const acs = parseAcsPopulations(fs.readFileSync(path.join(fixtures, "acs-population.dat"), "utf8"));
const pep = parsePepPopulations(fs.readFileSync(path.join(fixtures, "pep-population.csv"), "utf8"));

test("uses positive ACS values and records verified status", () => {
  assert.deepEqual(resolvePopulation("0401000", acs, pep), {
    pop: 12500,
    populationDataset: "ACS 5-year",
    populationStatus: "verified-positive",
  });
});

test("falls back to positive Population Estimates values", () => {
  assert.deepEqual(resolvePopulation("0403000", acs, pep), {
    pop: 2400,
    populationDataset: "Population Estimates Program",
    populationStatus: "verified-positive",
  });
});

test("records confirmed zero without allowing indexation", () => {
  const result = resolvePopulation("0402000", acs, pep);
  assert.equal(result.populationStatus, "confirmed-zero");
  assert.equal(result.pop, 0);
  assert.equal(populationAllowsIndexing(result.populationStatus), false);
});

test("records unavailable new places without allowing indexation", () => {
  const result = resolvePopulation("0499999", acs, pep);
  assert.equal(result.populationStatus, "unavailable");
  assert.equal(populationAllowsIndexing(result.populationStatus), false);
});

test("uses only an explicit geography crosswalk for replacement identifiers", () => {
  const result = resolvePopulation("4251794", acs, pep, {
    pepGeoid: "4251696",
    note: "Explicit fixture crosswalk.",
  });
  assert.equal(result.pop, 34075);
  assert.equal(result.populationStatus, "verified-positive");
  assert.equal(result.populationEvidenceNote, "Explicit fixture crosswalk.");
  assert.equal(resolvePopulation("4251794", acs, pep).populationStatus, "unavailable");
});

test("rejects changed required Census columns", () => {
  assert.throws(() => parseAcsPopulations("GEO_ID|B01003_CHANGED\n1600000US0401000|1"), /Unexpected Census ACS population columns/);
  assert.throws(() => parsePepPopulations("SUMLEV,STATE,PLACE,COUSUB,NAME,POP_CHANGED\n162,04,01000,00000,City,1"), /Unexpected Census Population Estimates columns/);
});

test("ignores unsupported Census summary levels", () => {
  assert.equal(acs.has("04013"), false);
  assert.equal(pep.size, 4);
  assert.equal(pep.has("0400000"), false);
});

test("indexation is granted only by recorded verified-positive status", () => {
  assert.equal(populationAllowsIndexing("verified-positive"), true);
  assert.equal(populationAllowsIndexing("confirmed-zero"), false);
  assert.equal(populationAllowsIndexing("unavailable"), false);
  assert.equal(populationAllowsIndexing(undefined), false);
});