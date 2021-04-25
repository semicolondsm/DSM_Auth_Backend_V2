import "dotenv/config";
import { Injectable } from "@nestjs/common";

export interface EnvironmentConfig {
  [key: string]: string;
}

@Injectable()
export class EnvironmentConfigService {
  private environmentConfig: EnvironmentConfig;

  constructor() {
    this.environmentConfig = process.env;
  }

  public get(key: string): string {
    return this.environmentConfig[key];
  }
}
