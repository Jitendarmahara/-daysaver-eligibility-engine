import { readFileSync } from "node:fs";
import type { EngineConfig } from "../types.ts";

export class ConfigStore {
  private current: EngineConfig;

  constructor(initial: EngineConfig) {
    this.current = initial;
  }

  getSnapshot(): EngineConfig {
    return this.current;
  }

  update(next: EngineConfig): void {
    this.current = next;
  }

  static fromFile(path: string): ConfigStore {
    return new ConfigStore(ConfigStore.readConfig(path));
  }

  reloadFromFile(path: string): void {
    this.update(ConfigStore.readConfig(path));
  }

  private static readConfig(path: string): EngineConfig {
    return JSON.parse(readFileSync(path, "utf8")) as EngineConfig;
  }
}
