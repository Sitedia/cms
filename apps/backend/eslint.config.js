import typescriptEslint from 'typescript-eslint';
import preset from '../../eslint.config.js';

export default [
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: typescriptEslint.parser,
      parserOptions: { project: './tsconfig.json' },
    },
  },
  ...preset,
];
