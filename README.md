# Tenant Eligibility Engine

A config-driven engine that, given an applicant's attribute values, finds which configured
conditions match, resolves overlaps, and computes the final discount multiplier and
discounted price.

## Requirements

- Node.js 22+ (runs TypeScript directly, no build step)

## Setup

```bash
npm install
```

## Run the demo

```bash
npm run demo
```

### Sample input

```json
{
  "fico_score": 675,
  "property_price": 380000,
  "tenure_years": 3
}
```

### Sample output

```json
{
  "matches": {
    "fico": ["F1", "F2"],
    "price": ["P1", "P2"],
    "tenure": ["T2"]
  },
  "final_multiplier": 0.97,
  "original_price": 380000,
  "discounted_price": 368600
}
```

To try other inputs, edit the applicant values in `src/index.ts` and re-run.

## Project layout

```
config/conditions.json   all business rules (add a new attribute here, no code change)
src/
  types.ts               shared types
  config/configStore.ts  holds rules, supports safe live updates
  matching/              Matcher interface + linear and interval-tree implementations
  strategy/              tie-break and combine rules
  engine.ts              orchestrates the pipeline
  index.ts               demo entry point
```

## Rules live in config

Conditions are defined in `config/conditions.json`. Each attribute declares its output
name, the applicant field it reads, an optional base-price flag, and its ranges. Adding a
new attribute such as number of pets is a config change only.
