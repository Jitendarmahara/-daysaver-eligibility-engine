import type { Condition } from "../types.ts";

export interface Combiner {
  combine(selected: Condition[]): number;
}
