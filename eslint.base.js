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
  jestPlugin.configs['flat/all'],
  unicornPlugin.configs['flat/all'],
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
        'unicorn/prevent-abbreviations': ['error', { ignore: ['app', 'e2e', 'props', 'moduleRef'] }],
        '@nx/enforce-module-boundaries': ['error'],
        'jest/require-hook': 'off',
        'jest/unbound-method': 'off',
      },
    })),
  {
    files: ['**/*.spec.ts'],
    rules: { 'jest/require-hook': ['error'] },
  },
  {
    files: ['**/*.spec.ts', '**/*.dto.ts', '**/*.entity.ts'],
    rules: { 'no-magic-numbers': 'off' },
  },
];
