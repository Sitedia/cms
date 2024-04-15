import { ApplicationLogger } from '#my-events/nestjs-common';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import { ApplicationModuleOptions } from '../configuration/configuration.interface.js';

export const secureEntrypoint = (app: INestApplication) => {
  // Load the logger
  const applicationlogger = app.get(ApplicationLogger);

  // Load the configuration
  const configService = app.get(ConfigService);
  const configuration = configService.getOrThrow<ApplicationModuleOptions>('application');

  // Configure Express
  app.setGlobalPrefix(configuration.basePath);
  app.use(helmet());
  app.enableCors({ origin: configuration.origin });

  // Log all incoming requests
  app.use((request: Request, response: Response, next: NextFunction) => {
    applicationlogger.debug(`${request.method} ${request.url}`, 'Express');
    next();
    response.on('finish', () => {
      const status = response.statusCode as HttpStatus;
      if (status >= HttpStatus.INTERNAL_SERVER_ERROR) {
        applicationlogger.error(`${request.method} ${request.url} ${response.statusCode}`, 'Express');
      } else if (status >= HttpStatus.BAD_REQUEST) {
        applicationlogger.warn(`${request.method} ${request.url} ${response.statusCode}`, 'Express');
      } else {
        applicationlogger.verbose(`${request.method} ${request.url} ${response.statusCode}`, 'Express');
      }
    });
  });

  return this;
};
