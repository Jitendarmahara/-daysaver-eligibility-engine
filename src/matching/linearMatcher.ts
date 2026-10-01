import type { Condition } from "../types.ts";
import type { Matcher } from "./matcher.ts";
export class LinearMatcher implements Matcher {
  match(conditions: Condition[], value: number): Condition[] {
    const matched: Condition[] = [];
    for (const condition of conditions) {
      if (value >= condition.min && value <= condition.max) {
        matched.push(condition);
      }
    }
    return matched;
  }
}
