import IntervalTree from "@flatten-js/interval-tree";
import type { Condition } from "../types.ts";
import type { Matcher } from "./matcher.ts";

export class LibraryIntervalTreeMatcher implements Matcher {
  private readonly cache = new WeakMap<Condition[], IntervalTree<Condition>>();

  match(conditions: Condition[], value: number): Condition[] {
    let tree = this.cache.get(conditions);
    if (!tree) {
      tree = new IntervalTree<Condition>();
      for (const condition of conditions) {
        tree.insert([condition.min, condition.max], condition);
      }
      this.cache.set(conditions, tree);
    }
    return tree.search([value, value]) as Condition[];
  }
}
