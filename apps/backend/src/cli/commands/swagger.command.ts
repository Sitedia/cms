import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import yaml from 'js-yaml';
import { Command, CommandRunner } from 'nest-commander';
import { AppModule } from '../../app/app.module';
import { configureSwagger } from '../../app/setup/swagger.setup';

const DEFAULT_URL = 'http://localhost';

@Command({ name: 'swagger', description: 'Generate the OpenAPI file' })
export class SwaggerCommand extends CommandRunner {
  async run(): Promise<void> {
    // Generate the OpenAPI specification
    const application: INestApplication<ExpressAdapter> = await NestFactory.create(AppModule);
    const document = configureSwagger(application, DEFAULT_URL);
    const specification = yaml.dump(document);

    // Display the specification in stdout
    // eslint-disable-next-line no-console
    console.log(specification);
  }
}
