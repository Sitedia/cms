import { ApplicationLogger } from '#libs/common';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Request, Response } from 'express';
import helmet from 'helmet';
import { AppModule } from './app.module.js';
import { BackendModuleOptions } from './options.interface.js';

export const bootstrap = async (): Promise<INestApplication> => {
  // Create the application
  const app: INestApplication<ExpressAdapter> = await NestFactory.create(AppModule, { bufferLogs: true });

  // Retrieve the logger and the configuration
  const logger = app.get(ApplicationLogger);
  const options = app.get(ConfigService).getOrThrow<BackendModuleOptions>('backend');
  const { port, version, corsOrigin, basePath } = options;

  // Configuration the Nest application
  app.useLogger(logger);
  app.setGlobalPrefix(basePath);
  app.use(helmet());
  app.enableCors({ origin: corsOrigin });

  // Add redirection to Swagger UI
  const httpAdapter = app.getHttpAdapter();
  httpAdapter.get('/', function (request: Request, response: Response) {
    response.redirect(HttpStatus.TEMPORARY_REDIRECT, '/api/swagger-ui.html');
  });

  // Configure Swagger
  const config = new DocumentBuilder()
    .setTitle('CMS API')
    .setDescription('Backend to manage the content of a website')
    .setVersion(version)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`/${basePath}/swagger-ui.html`, app, document);

  await app.listen(port);
  logger.log(`Application listening http://localhost:${port}/${basePath}`, 'bootstrap');

  return app;
};
