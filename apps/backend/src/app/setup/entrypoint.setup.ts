/* eslint-disable unicorn/prefer-module */
import { ApplicationLogger } from '@my-events/nestjs-common';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import { ApplicationOptions } from '../configuration/configuration.interface';

export const secureEntrypoint = (app: INestApplication, applicationOptions: ApplicationOptions) => {
  const applicationlogger = app.get(ApplicationLogger);

  // Configure Express
  app.setGlobalPrefix(applicationOptions.basePath);
  app.use(helmet());
  app.enableCors({ origin: applicationOptions.origin });

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
