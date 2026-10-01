import type { Condition } from "../types.ts";
export interface Matcher {
  match(conditions: Condition[], value: number): Condition[];
}
