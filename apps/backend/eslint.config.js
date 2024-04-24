import jsoncParser from 'jsonc-eslint-parser';
import tseslint from 'typescript-eslint';
import preset from '../../eslint.base.js';

export default [
  {
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: { sourceType: 'module', project: './tsconfig.json', tsconfigRootDir: import.meta.dirname },
    },
  },
  {
    files: ['**/*.json'],
    languageOptions: {
      parser: jsoncParser,
      parserOptions: {
        extraFileExtensions: ['.json'],
      },
    },
  },
  ...preset,
];
