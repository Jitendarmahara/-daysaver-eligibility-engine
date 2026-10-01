import type { Condition } from "../types.ts";

export interface TieBreaker {
  select(matched: Condition[]): Condition[];
}
