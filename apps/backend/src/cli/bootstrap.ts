import { CommandFactory } from 'nest-commander';
import { CliModule } from './cli.module';

export const bootstrap = async () => {
  await CommandFactory.run(CliModule);
};
