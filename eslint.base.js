import { FlatCompat } from '@eslint/eslintrc';
import nxEslintPlugin from '@nx/eslint-plugin';

import eslint from '@eslint/js';
import jestPlugin from 'eslint-plugin-jest';
import unicornPlugin from 'eslint-plugin-unicorn';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: eslint.configs.recommended,
});

export default [
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
  ...compat
    .config({
      extends: [
        'plugin:@typescript-eslint/recommended-type-checked',
        'plugin:@typescript-eslint/stylistic-type-checked',
      ],
    })
    .map((config) => ({
      ...config,
      files: ['**/*.ts'],
      rules: {},
    })),
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
