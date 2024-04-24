import jsoncParser from 'jsonc-eslint-parser';
import tseslint from 'typescript-eslint';
import preset from '../../eslint.base.js';

export default [
  ...preset,
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
    rules: {
      'jest/unbound-method': 'off',
      '@nx/dependency-checks': [
        'error',
        {
          ignoredFiles: ['**/*.spec.ts', '**/*.js'],
          includeTransitiveDependencies: true,
        },
      ],
    },
  },
];
