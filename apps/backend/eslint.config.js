import jsoncParser from 'jsonc-eslint-parser';
import tseslint from 'typescript-eslint';
import preset from '../../eslint.base.js';

export default [
  {
    files: ['**/*.ts'],
    languageOptions: {
      globals: { process: true },
      parser: tseslint.parser,
      parserOptions: { sourceType: 'module', project: './tsconfig.json', tsconfigRootDir: import.meta.dirname },
    },
  },
  {
    files: ['**/*.json'],
    languageOptions: {
      parser: jsoncParser,
      parserOptions: {
        sourceType: 'module',
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
        extraFileExtensions: ['.json'],
      },
    },
  },
  ...preset,
];
