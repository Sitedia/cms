import { LogFormat } from '#libs/common';
import { LogLevel } from '@nestjs/common';
import { Configuration } from './configuration.interface.js';

/* istanbul ignore next */
export const configuration = (): Configuration => ({
  application: {
    name: 'CMS API',
    description: 'Application to manage the content of a website',
    version: process.env.APP_VERSION ?? 'local',
    port: Number.parseInt(process.env.PORT ?? '3000', 10),
    basePath: process.env.APP_BASE_PATH ?? 'api',
    origin: process.env.APP_CORS_ORIGIN ?? undefined,
    apiUrl: process.env.APP_API_URL ?? 'http://localhost:3000',
  },
  common: {
    logsEnabled: process.env.APP_LOG_ENABLED ? process.env.APP_LOG_ENABLED !== 'false' : true,
    logLevel: process.env.APP_LOG_LEVEL ? (process.env.APP_LOG_LEVEL as LogLevel) : 'log',
    logFormat: process.env.APP_LOG_FORMAT === 'JSON' ? LogFormat.JSON : LogFormat.CONSOLE,
    healthStorageThresholdPercent: Number.parseFloat(process.env.APP_STORAGE_THRESHOLD ?? '1.0'),
    rateLimit: [
      {
        ttl: Number.parseInt(process.env.APP_RATE_LIMIT_TTL ?? '1000', 10),
        limit: Number.parseInt(process.env.APP_RATE_LIMIT_LIMIT ?? '100', 10),
      },
    ],
  },
});
