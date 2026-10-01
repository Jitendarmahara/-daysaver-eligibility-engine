import { ConfigStore } from "./config/configStore.ts";
import { LibraryIntervalTreeMatcher } from "./matching/libraryIntervalTreeMatcher.ts";
import { HighestMultiplierTieBreaker } from "./strategy/highestMultiplier.ts";
import { MultiplyCombiner } from "./strategy/multiplyCombiner.ts";
import { Engine } from "./engine.ts";
import type { Applicant } from "./types.ts";

const engine = new Engine(
  ConfigStore.fromFile("./config/conditions.json"),
  new LibraryIntervalTreeMatcher(),
  new HighestMultiplierTieBreaker(),
  new MultiplyCombiner(),
);

const applicant: Applicant = {
  fico_score: 675,
  property_price: 380000,
  tenure_years: 3,
};

const result = engine.evaluate(applicant);

console.log("Input:");
console.log(JSON.stringify(applicant, null, 2));
console.log("\nOutput:");
console.log(JSON.stringify(result, null, 2));
