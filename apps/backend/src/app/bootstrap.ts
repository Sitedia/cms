import { Logger } from '#libs/common';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ServerObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface.js';
import { Request, Response } from 'express';
import helmet from 'helmet';
import { AppModule } from './app.module.js';
import { BackendModuleOptions } from './options.interface.js';

interface SwaggerServer extends ServerObject {
  'x-internal'?: boolean;
}

export const bootstrap = async (): Promise<INestApplication> => {
  /* istanbul ignore next */
  const httpsOptions = process.env.APP_TLS_CERTIFICATE
    ? {
        cert: process.env.APP_TLS_CERTIFICATE.replaceAll('\\n', '\n'),
        key: process.env.APP_TLS_KEY?.replaceAll('\\n', '\n'),
      }
    : undefined;

  // Create the application
  const app: INestApplication<ExpressAdapter> = await NestFactory.create(AppModule, { bufferLogs: true, httpsOptions });

  // Retrieve the logger and the configuration
  const logger = app.get(Logger);
  const options = app.get(ConfigService).getOrThrow<BackendModuleOptions>('backend');
  const { port, version, corsOrigin, basePath } = options;

  // Configuration the Nest application
  app.useLogger(logger);
  app.setGlobalPrefix(basePath);
  app.use(helmet());
  app.enableCors({ origin: corsOrigin });
  app.enableShutdownHooks();
  app.useGlobalPipes(
    new ValidationPipe({ forbidUnknownValues: true, forbidNonWhitelisted: true, stopAtFirstError: true }),
  );

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
    .addTag('probes', 'Probes')
    .addServer(`/`, 'localhost')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  const server = document.servers ? (document.servers[0] as SwaggerServer) : undefined;
  if (server) {
    server['x-internal'] = false;
  }

  SwaggerModule.setup(`/${basePath}/swagger-ui.html`, app, document, { yamlDocumentUrl: `/${basePath}/openapi.yaml` });

  await app.listen(port);
  logger.log(`Application listening http://localhost:${port}/${basePath}`, 'bootstrap');

  return app;
};
