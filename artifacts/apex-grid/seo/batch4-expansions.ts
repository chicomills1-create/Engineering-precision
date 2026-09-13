import type { Batch2StateExpansion } from "./batch2-core-service-types";
import mississippiBatch4 from "./batch4-mississippi";
import missouriBatch4 from "./batch4-missouri";
import montanaBatch4 from "./batch4-montana";
import nebraskaBatch4 from "./batch4-nebraska";
import nevadaBatch4 from "./batch4-nevada";
import newHampshireBatch4 from "./batch4-new-hampshire";
import newJerseyBatch4 from "./batch4-new-jersey";
import newMexicoBatch4 from "./batch4-new-mexico";
import northDakotaBatch4 from "./batch4-north-dakota";
import oklahomaBatch4 from "./batch4-oklahoma";
import oregonBatch4 from "./batch4-oregon";
import rhodeIslandBatch4 from "./batch4-rhode-island";
import southCarolinaBatch4 from "./batch4-south-carolina";
import southDakotaBatch4 from "./batch4-south-dakota";
import tennesseeBatch4 from "./batch4-tennessee";

export const BATCH4_EXPANSIONS: Batch2StateExpansion[] = [
  mississippiBatch4,
  missouriBatch4,
  montanaBatch4,
  nebraskaBatch4,
  nevadaBatch4,
  newHampshireBatch4,
  newJerseyBatch4,
  newMexicoBatch4,
  northDakotaBatch4,
  oklahomaBatch4,
  oregonBatch4,
  rhodeIslandBatch4,
  southCarolinaBatch4,
  southDakotaBatch4,
  tennesseeBatch4,
];

export const BATCH4_EXPECTED_STATE_SLUGS = new Set([
  "mississippi",
  "missouri",
  "montana",
  "nebraska",
  "nevada",
  "new-hampshire",
  "new-jersey",
  "new-mexico",
  "north-dakota",
  "oklahoma",
  "oregon",
  "rhode-island",
  "south-carolina",
  "south-dakota",
  "tennessee",
]);