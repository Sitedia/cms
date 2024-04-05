/* eslint-disable unicorn/prefer-module */
import { ApplicationLogger } from '@my-events/nestjs-common';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import 'tslib';
import { ApplicationOptions } from '../configuration/configuration.interface';

export const secureEntrypoint = (application: INestApplication, applicationOptions: ApplicationOptions) => {
  const applicationlogger = application.get(ApplicationLogger);

  // Configure Express
  application.setGlobalPrefix(applicationOptions.basePath);
  application.use(helmet());
  application.enableCors({ origin: applicationOptions.origin });
  application.enableVersioning();

  // Log all incoming requests
  application.use((request: Request, response: Response, next: NextFunction) => {
    applicationlogger.debug(`${request.method} ${request.url}`, 'Express');
    next();
    response.on('finish', () => {
      const status = response.statusCode;
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
