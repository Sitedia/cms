import { ApplicationLogger } from '#libs/common';
import { INestApplication, NestApplicationOptions } from '@nestjs/common';
import { HttpsOptions } from '@nestjs/common/interfaces/external/https-options.interface.js';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module.js';
import { ApplicationModuleOptions } from './configuration.interface.js';
import { secureEntrypoint } from './entrypoint.setup.js';
import { configureSwagger } from './swagger.setup.js';

export const bootstrap = async (): Promise<INestApplication> => {
  // Load HTTPs configuration
  const enableHTTPs = process.env.APP_TLS_ENABLED === 'true';
  const httpsOptions: HttpsOptions = {
    cert: process.env.APP_TLS_CERTIFICATE?.replaceAll('\\n', '\n'),
    key: process.env.APP_TLS_KEY?.replaceAll('\\n', '\n'),
    ciphers: process.env.APP_TLS_ALLOWED_CIPHERS,
    honorCipherOrder: true,
  };

  // Create the application
  const options: NestApplicationOptions = { bufferLogs: true, httpsOptions: enableHTTPs ? httpsOptions : undefined };
  const app: INestApplication<ExpressAdapter> = await NestFactory.create(AppModule, options);

  // Retrieve the logger and the configuration
  const logger = app.get(ApplicationLogger);
  const configuration = app.get(ConfigService).getOrThrow<ApplicationModuleOptions>('application');

  // Set our custom logger (https://docs.nestjs.com/techniques/logger)
  app.useLogger(logger);

  // Secure the entrypoint
  secureEntrypoint(app);

  // Configure Swagger
  configureSwagger(app);

  await app.listen(configuration.port);
  logger.log(`Application listening http://localhost:${configuration.port}/${configuration.basePath}`, 'bootstrap');

  return app;
};
