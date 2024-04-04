/* eslint-disable jest/require-hook */
import { ApplicationMode, bootstrap } from './app/bootstrap';

// Launch the application
bootstrap(process.env.APP_MODE as ApplicationMode);
