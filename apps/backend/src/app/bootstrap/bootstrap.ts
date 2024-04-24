import { ApplicationLogger } from '#libs/common';
import { INestApplication } from '@nestjs/common';
import { HttpsOptions } from '@nestjs/common/interfaces/external/https-options.interface.js';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from '../app.module.js';
import { ApplicationModuleOptions } from '../configuration/configuration.interface.js';
import { configuration as config } from '../configuration/configuration.js';
import { secureEntrypoint } from '../setup/entrypoint.setup.js';
import { configureSwagger } from '../setup/swagger.setup.js';

/** NestJS application launcher */
export const bootstrap = async (): Promise<INestApplication> => {
  // Load HTTPs configuration
  const enableHTTPs = process.env.APP_TLS_ENABLED === 'true';
  const httpsOptions: HttpsOptions = {
    cert: process.env.APP_TLS_CERTIFICATE?.replaceAll('\\n', '\n'),
    key: process.env.APP_TLS_KEY?.replaceAll('\\n', '\n'),
    ciphers: process.env.APP_TLS_ALLOWED_CIPHERS,
    honorCipherOrder: true,
  };

  // Create the NestJS application
  const app: INestApplication<ExpressAdapter> = await NestFactory.create(AppModule, {
    bufferLogs: true, // buffer the first logs until out custom logger is set (see below)
    httpsOptions: enableHTTPs ? httpsOptions : undefined,
  });

  // Set our custom logger (https://docs.nestjs.com/techniques/logger)
  const logger = app.get(ApplicationLogger);
  app.useLogger(logger);

  // Load the configuration
  const configService = app.get(ConfigService);
  const configuration = configService.getOrThrow<ApplicationModuleOptions>('application');

  // Log the configuration. !! Hide sensitive values
  /* istanbul ignore next */
  if (logger.isEnabled('verbose')) {
    logger.verbose(`Using configuration ${JSON.stringify(config())}`, 'bootstrap');
  }

  // Secure the entry point
  secureEntrypoint(app);

  // Configure Swagger
  configureSwagger(app);

  // Start the application
  await app.listen(configuration.port);
  const applicationUrl = `${enableHTTPs ? 'https' : 'http'}://localhost:${configuration.port}/${configuration.basePath}`;
  logger.log(`Application is listening on ${applicationUrl}`, 'bootstrap');

  return app;
};
