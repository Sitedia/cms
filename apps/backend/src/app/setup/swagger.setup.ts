/* eslint-disable unicorn/prefer-module */
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import 'tslib';
import { ApplicationOptions, ConfigurationOptions } from '../configuration/configuration.interface';

const TITLE = 'Todo list API';
const DESCRIPTION = 'API to manage a list of tasks';

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
    yamlDocumentUrl: `/${basePath}/specifications/openapi.yaml`,
  });

  return document;
};
