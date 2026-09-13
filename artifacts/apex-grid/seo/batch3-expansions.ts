import type { Batch2StateExpansion } from "./batch2-core-service-types";
import alabamaBatch3 from "./batch3-alabama";
import arkansasBatch3 from "./batch3-arkansas";
import coloradoBatch3 from "./batch3-colorado";
import connecticutBatch3 from "./batch3-connecticut";
import delawareBatch3 from "./batch3-delaware";
import hawaiiBatch3 from "./batch3-hawaii";
import idahoBatch3 from "./batch3-idaho";
import indianaBatch3 from "./batch3-indiana";
import iowaBatch3 from "./batch3-iowa";
import kansasBatch3 from "./batch3-kansas";
import kentuckyBatch3 from "./batch3-kentucky";
import louisianaBatch3 from "./batch3-louisiana";
import maineBatch3 from "./batch3-maine";
import marylandBatch3 from "./batch3-maryland";
import massachusettsBatch3 from "./batch3-massachusetts";
import minnesotaBatch3 from "./batch3-minnesota";

export const BATCH3_EXPANSIONS: Batch2StateExpansion[] = [
  alabamaBatch3,
  arkansasBatch3,
  coloradoBatch3,
  connecticutBatch3,
  delawareBatch3,
  hawaiiBatch3,
  idahoBatch3,
  indianaBatch3,
  iowaBatch3,
  kansasBatch3,
  kentuckyBatch3,
  louisianaBatch3,
  maineBatch3,
  marylandBatch3,
  massachusettsBatch3,
  minnesotaBatch3,
];

export const BATCH3_EXPECTED_STATE_SLUGS = new Set([
  "alabama",
  "arkansas",
  "colorado",
  "connecticut",
  "delaware",
  "hawaii",
  "idaho",
  "indiana",
  "iowa",
  "kansas",
  "kentucky",
  "louisiana",
  "maine",
  "maryland",
  "massachusetts",
  "minnesota",
]);