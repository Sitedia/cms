import eslintPlugin from '@eslint/js';
import nxEslintPlugin from '@nx/eslint-plugin';
import jestEslintPlugin from 'eslint-plugin-jest';
import unicornEslintPlugin from 'eslint-plugin-unicorn';
import jsoncParser from 'jsonc-eslint-parser';
import typescriptEslintPlugin from 'typescript-eslint';

export default typescriptEslintPlugin.config(
  { plugins: { '@nx': nxEslintPlugin } },
  ...[
    eslintPlugin.configs.recommended,
    jestEslintPlugin.configs['flat/all'],
    unicornEslintPlugin.configs['flat/all'],
    ...typescriptEslintPlugin.configs.recommendedTypeChecked,
    ...typescriptEslintPlugin.configs.stylisticTypeChecked,
  ].map((configs) => ({
    ...configs,
    languageOptions: {
      parser: typescriptEslintPlugin.parser,
      parserOptions: { project: true, tsconfigRootDir: import.meta.dirname },
    },
    files: ['**/*.ts'],
    rules: {
      ...configs.rules,
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
