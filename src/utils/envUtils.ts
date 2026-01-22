import { ENV_CONFIG } from '../config/env.config';

type EnvKey = keyof typeof ENV_CONFIG;

export class EnvUtils {
    static getBaseUrl(): string {
        const env = (process.env.TEST_ENV || 'demo_tras') as EnvKey;
        return ENV_CONFIG[env].baseUrl;
    }
}
