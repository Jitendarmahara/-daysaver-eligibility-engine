import type { Condition } from "../types.ts";
import type { Combiner } from "./combiner.ts";

export class MultiplyCombiner implements Combiner {
  combine(selected: Condition[]): number {
    let multiplier = 1.0;
    for (const condition of selected) {
      if (typeof condition.multiplier === "number") {
        multiplier *= condition.multiplier;
      }
    }
    return multiplier;
  }
}
