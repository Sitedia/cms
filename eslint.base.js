import eslint from '@eslint/js';
import nxEslintPlugin from '@nx/eslint-plugin';
import jestPlugin from 'eslint-plugin-jest';
import unicornPlugin from 'eslint-plugin-unicorn';
import jsoncParser from 'jsonc-eslint-parser';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { plugins: { '@nx': nxEslintPlugin } },
  { ignores: ['**/dist/', '**/coverage/'] },
  ...[
    eslint.configs.recommended,
    jestPlugin.configs['flat/all'],
    unicornPlugin.configs['flat/all'],
    ...tseslint.configs.recommendedTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
  ].map((configurations) => ({
    files: ['**/*.ts'],
    ...configurations,
    languageOptions: { parser: tseslint.parser, parserOptions: { project: true } },
    rules: {
      ...configurations.rules,
      camelcase: 'error',
      curly: 'error',
      eqeqeq: 'error',
      radix: 'error',
      complexity: ['error', 20],
      'max-depth': ['error', 4],
      'max-params': ['error', 8],
      'no-console': 'warn',
      'no-magic-numbers': ['error', { ignore: [0, 1] }],
      '@nx/enforce-module-boundaries': ['error'],
      'unicorn/prevent-abbreviations': ['error', { ignore: ['app', 'e2e', 'props', 'moduleRef'] }],
      'jest/require-hook': 'off',
      'jest/unbound-method': 'off',
    },
  })),
  {
    files: ['**/*.spec.ts'],
    rules: { 'jest/require-hook': 'error' },
  },
  {
    files: ['**/*.spec.ts', '**/*.dto.ts', '**/*.entity.ts'],
    rules: { 'no-magic-numbers': 'off' },
  },
  {
    files: ['**/*.json'],
    languageOptions: { parser: jsoncParser },
    rules: {
      '@nx/dependency-checks': [
        'error',
        { ignoredFiles: ['**/*.spec.ts', '**/*.js'], includeTransitiveDependencies: true },
      ],
    },
  },
);
