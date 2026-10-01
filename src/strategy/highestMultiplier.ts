import type { Condition } from "../types.ts";
import type { TieBreaker } from "./tieBreaker.ts";

export class HighestMultiplierTieBreaker implements TieBreaker {
  select(matched: Condition[]): Condition[] {
    const withMultiplier = matched.filter(
      (c) => typeof c.multiplier === "number",
    );

    if (withMultiplier.length === 0) {
      return matched;
    }
    let winner = withMultiplier[0];
    for (const c of withMultiplier) {
      if ((c.multiplier as number) > (winner.multiplier as number)) {
        winner = c;
      }
    }
    return [winner];
  }
}
