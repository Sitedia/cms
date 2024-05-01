import { ApplicationLogger } from '#libs/common';
import { INestApplication, NestApplicationOptions } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module.js';
import { ApplicationModuleOptions } from './configuration.interface.js';

export const bootstrap = async (): Promise<INestApplication> => {
  // Create the application
  const options: NestApplicationOptions = { bufferLogs: true };
  const app: INestApplication<ExpressAdapter> = await NestFactory.create(AppModule, options);

  // Retrieve the logger and the configuration
  const logger = app.get(ApplicationLogger);
  const configuration = app.get(ConfigService).getOrThrow<ApplicationModuleOptions>('application');

  // Configuration the Nest applicatio
  app.useLogger(logger);
  app.setGlobalPrefix(configuration.basePath);
  app.use(helmet());
  app.enableCors({ origin: configuration.origin });

  // Configure Swagger
  const config = new DocumentBuilder()
    .setTitle(configuration.name)
    .setDescription(configuration.description)
    .setVersion(configuration.version)
    .addServer(configuration.apiUrl)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`/${configuration.basePath}/swagger-ui.html`, app, document);

  await app.listen(configuration.port);
  logger.log(`Application listening http://localhost:${configuration.port}/${configuration.basePath}`, 'bootstrap');

  return app;
};
