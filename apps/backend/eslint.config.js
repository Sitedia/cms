import eslint from '@eslint/js';
import nxEslintPlugin from '@nx/eslint-plugin';
import jestPlugin from 'eslint-plugin-jest';
import unicornPlugin from 'eslint-plugin-unicorn';
import jsoncParser from 'jsonc-eslint-parser';
import tseslint from 'typescript-eslint';

export default [
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: { project: true },
    },
  },
  { plugins: { '@nx': nxEslintPlugin } },
  { ignores: ['dist', 'coverage', '*.config.js'] },
  eslint.configs.recommended,
  jestPlugin.configs['flat/all'],
  unicornPlugin.configs['flat/all'],
  ...tseslint.configs.recommendedTypeChecked.map((conf) => ({ ...conf, files: ['**/*.ts'] })),
  ...tseslint.configs.stylisticTypeChecked.map((conf) => ({ ...conf, files: ['**/*.ts'] })),
  {
    files: ['**/*.ts', '**/*.json'],
    rules: {
      camelcase: 'error',
      curly: 'error',
      eqeqeq: 'error',
      complexity: ['error', 20],
      'max-depth': ['error', 4],
      'max-params': ['error', 8],
      'no-console': 'warn',
      'no-magic-numbers': ['error', { ignore: [0, 1] }],
      radix: 'error',
      '@nx/enforce-module-boundaries': ['error'],
      'unicorn/prevent-abbreviations': ['error', { ignore: ['app', 'e2e', 'props', 'moduleRef'] }],
      'jest/require-hook': 'off',
      'jest/unbound-method': 'off',
    },
  },
  {
    files: ['**/*.spec.ts'],
    rules: { 'jest/require-hook': ['error'] },
  },
  {
    files: ['**/*.spec.ts', '**/*.dto.ts', '**/*.entity.ts'],
    rules: { 'no-magic-numbers': 'off' },
  },
  {
    files: ['**/*.json'],
    languageOptions: {
      parser: jsoncParser,
    },
    rules: {
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
