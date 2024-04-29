import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ApplicationModuleOptions } from './configuration.interface.js';

export const configureSwagger = (app: INestApplication) => {
  const configuration = app.get(ConfigService).getOrThrow<ApplicationModuleOptions>('application');

  const config = new DocumentBuilder()
    .setTitle(configuration.name)
    .setDescription(configuration.description)
    .setVersion(configuration.version)
    .addServer(configuration.apiUrl)
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(`/${configuration.basePath}/swagger-ui.html`, app, document);
};
