import { LogFormat } from '#libs/common';
import { LogLevel } from '@nestjs/common';
import { program } from 'commander';
import { Options } from './options.interface.js';

/* istanbul ignore next */
export const options = (): Options => {
  const version = program.option('--version <char>', 'local').parse().opts().version as string;

  return {
    backend: {
      version,
      port: Number.parseInt(process.env.PORT ?? '3000', 10),
      basePath: 'api',
      corsOrigin: process.env.APP_CORS_ORIGIN ?? 'http://localhost:3000',
    },
    rateLimit: [
      {
        ttl: Number.parseInt(process.env.APP_RATE_LIMIT_TTL ?? '1000', 10),
        limit: Number.parseInt(process.env.APP_RATE_LIMIT_LIMIT ?? '100', 10),
      },
    ],
    logger: {
      level: (process.env.APP_LOG_LEVEL as LogLevel) ?? 'log',
      format: process.env.APP_LOG_FORMAT === 'JSON' ? LogFormat.JSON : LogFormat.CONSOLE,
    },
  };
};
