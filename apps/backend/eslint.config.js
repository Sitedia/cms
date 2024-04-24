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
  { plugins: { '@nx': nxEslintPlugin } },
  {
    ignores: ['dist', 'coverage', '*.config.js'],
  },
  eslint.configs.recommended,
  jestPlugin.configs['flat/all'],
  unicornPlugin.configs['flat/all'],
  {
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
  ...tseslint.configs.recommendedTypeChecked.map((conf) => ({ ...conf, files: ['**/*.ts'] })),
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
