import { LogFormat, LogLevel } from '@my-events/nestjs-common';
import { Configuration } from './configuration.interface.js';

const DEFAULT_PORT = '3000';
const DEFAULT_STORAGE_THRESHOLD = '0.0';

/* istanbul ignore next */
export const configuration = (): Configuration => ({
  application: {
    version: process.env.APP_VERSION ?? 'local',
    port: Number.parseInt(process.env.PORT ?? DEFAULT_PORT, 10),
    basePath: process.env.APP_BASE_PATH ?? 'api',
    origin: process.env.APP_CORS_ORIGIN ?? '',
    apiUrl: process.env.APP_API_URL ?? 'http://localhost:3000',
  },
  logger: {
    logLevel: (process.env.APP_LOG_LEVEL as LogLevel) || LogLevel.LOG,
    logFormat: process.env.APP_LOG_FORMAT === 'JSON' ? LogFormat.JSON : LogFormat.CONSOLE,
  },
  health: {
    storageThresholdPercent: Number.parseFloat(process.env.APP_STORAGE_THRESHOLD ?? DEFAULT_STORAGE_THRESHOLD),
  },
  rateLimit: [
    {
      ttl: Number.parseInt(process.env.APP_RATE_LIMIT_TTL ?? '', 10),
      limit: Number.parseInt(process.env.APP_RATE_LIMIT_LIMIT ?? '', 10),
    },
  ],
});
