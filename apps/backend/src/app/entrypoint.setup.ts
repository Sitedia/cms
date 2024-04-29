import { ApplicationLogger } from '#libs/common';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import { ApplicationModuleOptions } from './configuration.interface.js';

export const secureEntrypoint = (app: INestApplication) => {
  const configuration = app.get(ConfigService).getOrThrow<ApplicationModuleOptions>('application');

  // Configure Express
  app.setGlobalPrefix(configuration.basePath);
  app.use(helmet());
  app.enableCors({ origin: configuration.origin });

  // Log all incoming requests
  const applicationlogger = app.get(ApplicationLogger);
  app.use((request: Request, response: Response, next: NextFunction) => {
    applicationlogger.debug(`${request.method} ${request.url}`, 'secureEntrypoint');
    next();
    response.on('finish', () => {
      const status = response.statusCode as HttpStatus;
      if (status >= HttpStatus.INTERNAL_SERVER_ERROR) {
        applicationlogger.error(`${request.method} ${request.url} ${response.statusCode}`, 'secureEntrypoint');
      } else if (status >= HttpStatus.BAD_REQUEST) {
        applicationlogger.warn(`${request.method} ${request.url} ${response.statusCode}`, 'secureEntrypoint');
      } else {
        applicationlogger.verbose(`${request.method} ${request.url} ${response.statusCode}`, 'secureEntrypoint');
      }
    });
  });
};
