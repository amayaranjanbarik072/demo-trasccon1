import { ENV_CONFIG, type EnvName } from '../config/env.config';

type EnvConfig = (typeof ENV_CONFIG)[EnvName];


export class EnvUtils {
  // Get env name
  static getEnv(): EnvName {
    return (process.env.TEST_ENV || 'demo_tras') as EnvName;
  }

  // Get full config for the env 
  static getEnvConfig(): EnvConfig {
    return ENV_CONFIG[this.getEnv()];
  }

  // Get base URL
  static getBaseUrl(): string {
    return this.getEnvConfig().baseUrl;
  }

  // Get login credentials
  static getCredentials() {
    return this.getEnvConfig().credentials;
  }
}
