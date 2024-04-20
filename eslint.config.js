'use strict';
// @ts-check
import eslint from '@eslint/js';
import eslintPluginJest from 'eslint-plugin-jest';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  {
    ignores: ['dist/**', 'coverage/**', '*.config.js'],
  },
  {
    rules: {
      'no-unused-vars': 'warn',
      camelcase: 'error',
      curly: 'error',
      eqeqeq: 'error',
      complexity: ['error', 20],
      'max-depth': ['error', 4],
      'max-params': ['error', 8],
      'no-console': 'warn',
      'no-magic-numbers': ['error', { ignore: [0, 1] }],
      radix: 'error',
    },
  },
  eslintPluginJest.configs['flat/all'],
  {
    files: ['**/*.spec.ts'],
    rules: {
      'no-magic-numbers': 'off',
      'jest/unbound-method': 'off',
      'jest/require-hook': ['error'],
    },
  },
  {
    files: ['*.dto.ts', '*.entity.ts'],
    rules: {
      'no-magic-numbers': 'off',
    },
  },
  eslintPluginUnicorn.configs['flat/all'],
  {
    rules: {
      'unicorn/prevent-abbreviations': ['error', { ignore: ['app', 'e2e', 'props', 'moduleRef'] }],
    },
  },
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylistic,
  {
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
);
