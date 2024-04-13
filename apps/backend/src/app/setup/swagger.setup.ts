import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { ApplicationModuleOptions } from '../configuration/configuration.interface.js';

const TITLE = 'My Events API';
const DESCRIPTION = 'API to manage a list of events';

export const configureSwagger = (app: INestApplication): OpenAPIObject => {
  // Load the configuration
  const configService = app.get(ConfigService);
  const configuration = configService.getOrThrow<ApplicationModuleOptions>('application');

  // Prepare the configuration
  const documentBuilder = new DocumentBuilder()
    .setTitle(TITLE)
    .setDescription(DESCRIPTION)
    .setVersion(configuration.version)
    .addTag('probes')
    .addServer(configuration.apiUrl);

  // Generate the OpenAPI specification
  const config = documentBuilder.build();
  const document = SwaggerModule.createDocument(app, config);

  // Set up Swagger
  SwaggerModule.setup(`/${configuration.basePath}/swagger-ui.html`, app, document, {
    jsonDocumentUrl: `/${configuration.basePath}/specifications/openapi.json`,
    yamlDocumentUrl: `/${configuration.basePath}/specifications/openapi.yaml`,
  });

  return document;
};
