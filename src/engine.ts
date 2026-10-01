import type { Applicant, Condition, EvaluationResult } from "./types.ts";
import type { ConfigStore } from "./config/configStore.ts";
import type { Matcher } from "./matching/matcher.ts";
import type { TieBreaker } from "./strategy/tieBreaker.ts";
import type { Combiner } from "./strategy/combiner.ts";

export class Engine {
  private readonly store: ConfigStore;
  private readonly matcher: Matcher;
  private readonly tieBreaker: TieBreaker;
  private readonly combiner: Combiner;

  constructor(
    store: ConfigStore,
    matcher: Matcher,
    tieBreaker: TieBreaker,
    combiner: Combiner,
  ) {
    this.store = store;
    this.matcher = matcher;
    this.tieBreaker = tieBreaker;
    this.combiner = combiner;
  }

  evaluate(applicant: Applicant): EvaluationResult {
    
    const config = this.store.getSnapshot();

    const matches: Record<string, string[]> = {};
    const winners: Condition[] = [];
    let originalPrice = 0;

    for (const attribute of config.attributes) {
      const value = applicant[attribute.input];
      if (typeof value !== "number") {
        continue; 
      }
      const matched = this.matcher.match(attribute.conditions, value);
      const selected = this.tieBreaker.select(matched);

      matches[attribute.name] = selected.map((c) => c.id);
      winners.push(...selected);
      if (attribute.isBasePrice) {
        originalPrice = value;
      }
    }

    const finalMultiplier = this.combiner.combine(winners);
    const discountedPrice = Math.round(originalPrice * finalMultiplier * 100) / 100;

    return {
      matches,
      final_multiplier: finalMultiplier,
      original_price: originalPrice,
      discounted_price: discountedPrice,
    };
  }
}
