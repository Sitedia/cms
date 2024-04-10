/* eslint-disable unicorn/prefer-module */
import { ApplicationLogger } from '@my-events/nestjs-common';
import { INestApplication } from '@nestjs/common';
import { HttpsOptions } from '@nestjs/common/interfaces/external/https-options.interface.js';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from '../app.module.js';
import { ApplicationOptions, ConfigurationOptions } from '../configuration/configuration.interface.js';
import { secureEntrypoint } from '../setup/entrypoint.setup.js';
import { configureSwagger } from '../setup/swagger.setup.js';

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
  const application: INestApplication<ExpressAdapter> = await NestFactory.create(AppModule, {
    bufferLogs: true, // buffer the first logs until out custom logger is set (see below)
    httpsOptions: enableHTTPs ? httpsOptions : undefined,
  });

  // Set our custom logger (https://docs.nestjs.com/techniques/logger)
  const applicationlogger = application.get(ApplicationLogger);
  application.useLogger(applicationlogger);

  // Load the configuration
  const configService = application.get(ConfigService);
  const configuration = configService.getOrThrow<ApplicationOptions>(ConfigurationOptions.APPLICATION);

  // Secure the entry point
  secureEntrypoint(application, configuration);

  // Configure Swagger
  configureSwagger(application, configuration.apiUrl);

  // Start the application
  await application.listen(configuration.port);
  const basePath = configuration.basePath;
  const applicationUrl = `${enableHTTPs ? 'https' : 'http'}://localhost:${configuration.port}`;
  applicationlogger.log(`Application is listening on ${applicationUrl}/${basePath}`, 'Express');

  return application;
};
