import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import yaml from 'js-yaml';
import { Command, CommandRunner } from 'nest-commander';
import 'tslib';
import { AppModule } from '../app/app.module';
import { configureSwagger } from '../app/bootstrap';

const DEFAULT_URL = 'http://localhost';

@Command({ name: 'swagger', description: 'Generate the OpenAPI file' })
export class SwaggerCommand extends CommandRunner {
  async run(): Promise<void> {
    // Generate the specification
    const application: INestApplication<ExpressAdapter> = await NestFactory.create(AppModule);
    const document = configureSwagger(application, DEFAULT_URL);
    const specification = yaml.dump(document);

    // eslint-disable-next-line no-console
    console.log(specification);
  }
}
