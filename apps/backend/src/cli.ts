/* eslint-disable jest/require-hook */
import { CommandFactory } from 'nest-commander';
import { CliModule } from './cli/cli.module';

const bootstrap = async () => {
  await CommandFactory.run(CliModule);
};

bootstrap();
