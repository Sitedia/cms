import { LogLevel } from '@nestjs/common';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Options } from './options.interface.js';

/* istanbul ignore next */
export const options = (): Options => ({
  backend: {
    version: process.env.APP_VERSION ?? 'local',
    port: Number.parseInt(process.env.PORT ?? '3000', 10),
    basePath: process.env.APP_BASE_PATH ?? 'api',
    corsOrigin: process.env.APP_CORS_ORIGIN ?? 'http://localhost:3000',
  },
  logger: {
    level: process.env.APP_LOG_LEVEL ? (process.env.APP_LOG_LEVEL as LogLevel) : 'log',
    json: process.env.APP_LOG_JSON === 'true',
  },
  throttler: [
    {
      ttl: Number.parseInt(process.env.APP_THROTTLER_TTL ?? '1000', 10),
      limit: Number.parseInt(process.env.APP_THROTTLER_LIMIT ?? '1', 10),
    },
  ],
  typeorm: {
    type: 'postgres',
    ssl: process.env.APP_POSTGRES_SSL === 'true',
    extra: process.env.APP_POSTGRES_SSL ? { ssl: { rejectUnauthorized: false } } : undefined,
    host: process.env.APP_POSTGRES_HOSTNAME ?? 'postgres',
    port: Number.parseInt(process.env.PORT ?? '5432', 10),
    database: process.env.APP_POSTGRES_DATABASE ?? 'local',
    username: process.env.APP_POSTGRES_USERNAME ?? 'postgres',
    password: process.env.APP_POSTGRES_PASSWORD ?? 'postgres',
    schema: process.env.APP_POSTGRES_SCHEMA ?? 'cms',
    autoLoadEntities: true,
    synchronize: false,
    namingStrategy: new SnakeNamingStrategy(),
    logging: false,
  },
});
