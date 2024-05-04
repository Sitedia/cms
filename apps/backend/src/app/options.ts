import { LogFormat } from '#libs/common';
import { LogLevel } from '@nestjs/common';
import { Options } from './options.interface.js';

/* istanbul ignore next */
export const options = (): Options => ({
  backend: {
    version: process.env.APP_VERSION ?? 'local',
    port: Number.parseInt(process.env.PORT ?? '3000', 10),
    basePath: process.env.APP_BASE_PATH ?? 'api',
    corsOrigin: process.env.APP_CORS_ORIGIN ?? 'http://localhost:3000',
  },
  rateLimit: [
    {
      ttl: Number.parseInt(process.env.APP_RATE_LIMIT_TTL ?? '1000', 10),
      limit: Number.parseInt(process.env.APP_RATE_LIMIT_LIMIT ?? '100', 10),
    },
  ],
  logger: {
    enabled: !process.env.APP_LOG_ENABLED || process.env.APP_LOG_ENABLED === 'true',
    level: process.env.APP_LOG_LEVEL ? (process.env.APP_LOG_LEVEL as LogLevel) : 'log',
    format: process.env.APP_LOG_FORMAT === 'JSON' ? LogFormat.JSON : LogFormat.CONSOLE,
  },
});
