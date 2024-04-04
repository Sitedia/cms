/* eslint-disable unicorn/prefer-module */
import { ApplicationLogger } from '@sitedia/nestjs-common';
import {  HttpStatus, INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
// @ts-expect-error implicit import
import { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
// @ts-expect-error implicit import
import * as yaml from 'js-yaml';
import * as fs from 'node:fs';
import { AppModule } from './app.module';
import { ApplicationOptions, ConfigurationOptions } from './configuration.interface';

const TITLE = 'Todo list API';
const DESCRIPTION = 'API to manage a list of tasks';

export enum ApplicationMode {
  SERVER = 'SERVER', // start and listen on a port
  TEST = 'TEST', // init without listening on a port
  SWAGGER = 'SWAGGER', // start, generate the OpenAPI specification and stop
}

export const configureSwagger = (application: INestApplication, applicationUrl: string): OpenAPIObject => {
  // Load the configuration
  const configService = application.get(ConfigService);
  const configuration = configService.getOrThrow<ApplicationOptions>(ConfigurationOptions.APPLICATION);

  // Prepare the configuration
  const documentBuilder = new DocumentBuilder()
    .setTitle(TITLE)
    .setDescription(DESCRIPTION)
    .setVersion(configuration.version)
    .addTag('probes')
    .addServer(applicationUrl);

  // Generate the OpenAPI specification
  const config = documentBuilder.build();
  const document = SwaggerModule.createDocument(application, config);

  // Set up Swagger
  const basePath = configuration.basePath;
  SwaggerModule.setup(`/${basePath}/swagger-ui.html`, application, document, {
    jsonDocumentUrl: `/${basePath}/specifications/openapi.json`,
    yamlDocumentUrl: `/${basePath}/specifications/openapi.yml`,
  });

  return document;
};

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

export const bootstrap = async (mode: ApplicationMode): Promise<INestApplication> => {
  // Load HTTPs configuration
  const enableHTTPs = process.env['APP_TLS_ENABLED'] === 'true';
  const httpsOptions = {
    cert: process.env['APP_TLS_CERTIFICATE']?.replaceAll('\\n', '\n'),
    key: process.env['APP_TLS_KEY']?.replaceAll('\\n', '\n'),
  };

  // Create the NestJS application
  const application = await NestFactory.create(AppModule, {
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
  const applicationUrl = `${enableHTTPs ? 'https' : 'http'}://localhost:${configuration.port}`;
  const document = configureSwagger(application, applicationUrl);

  // Start the application in the requested mode
  if (mode === ApplicationMode.TEST) {
    await application.init();
  } else if (mode === ApplicationMode.SWAGGER) {
    await application.init();
    const specification = yaml.dump(document);
    fs.writeFileSync(__dirname + '/../openapi.yaml', specification);
  } else {
    await application.listen(configuration.port);
    const basePath = configuration.basePath;
    applicationlogger.log(`Application is listening on ${applicationUrl}/${basePath}`, 'Express');
  }

  return application;
};
