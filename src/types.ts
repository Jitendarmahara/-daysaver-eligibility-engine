
export interface Condition {
  id: string;
  min: number;
  max: number;
  multiplier?: number;
  [key: string]: unknown;
}
export interface AttributeConfig {

  name: string;
 
  input: string;

  isBasePrice?: boolean;

  conditions: Condition[];
}


export interface EngineConfig {
  attributes: AttributeConfig[];
}

export type Applicant = Record<string, number>;

export interface EvaluationResult {
  matches: Record<string, string[]>;
  final_multiplier: number;
  original_price: number;
  discounted_price: number;
}
