import eslintPlugin from '@eslint/js';
import nxEslintPlugin from '@nx/eslint-plugin';
import jestEslintPlugin from 'eslint-plugin-jest';
import unicornEslintPlugin from 'eslint-plugin-unicorn';
import jsoncParser from 'jsonc-eslint-parser';
import typescriptEslint from 'typescript-eslint';

export default typescriptEslint.config(
  { ignores: ['**/dist', '**/coverage'] },
  {
    plugins: {
      '@nx': nxEslintPlugin,
      '@typescript-eslint': typescriptEslint.plugin,
    },
  },
  ...[
    eslintPlugin.configs.recommended,
    ...typescriptEslint.configs.strictTypeChecked,
    ...typescriptEslint.configs.stylisticTypeChecked,
    unicornEslintPlugin.configs['flat/all'],
    jestEslintPlugin.configs['flat/all'],
  ].map((configs) => ({
    ...configs,
    files: ['**/*.ts'],
  })),
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: typescriptEslint.parser,
      parserOptions: { project: './tsconfig.json', tsconfigRootDir: import.meta.dirname },
    },
    rules: {
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
      '@typescript-eslint/no-extraneous-class': ['error', { allowEmpty: true }],
      '@typescript-eslint/restrict-template-expressions': 'off',
    },
  },
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
