import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import nxEslintPlugin from '@nx/eslint-plugin';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
});

export default [
  { plugins: { '@nx': nxEslintPlugin } },
  ...compat
    .config({
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended-type-checked',
        'plugin:@typescript-eslint/stylistic-type-checked',
        'plugin:@nx/typescript',
        'plugin:jest/all',
        'plugin:unicorn/all',
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
  ...compat.config({ parser: 'jsonc-eslint-parser' }).map((config) => ({
    ...config,
    files: ['**/*.json'],
    rules: {
      '@nx/dependency-checks': [
        'error',
        {
          ignoredFiles: ['**/*.spec.ts'],
          ignoredDependencies: ['dotenv'],
          includeTransitiveDependencies: true,
        },
      ],
    },
  })),
  { ignores: ['dist', 'coverage', 'jest.config.js', 'dotenv.config.js'] },
];
