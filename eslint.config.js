import eslintPlugin from '@eslint/js';
import nxEslintPlugin from '@nx/eslint-plugin';
import jestEslintPlugin from 'eslint-plugin-jest';
import unicornEslintPlugin from 'eslint-plugin-unicorn';
import jsoncParser from 'jsonc-eslint-parser';
import typescriptEslint from 'typescript-eslint';

export default typescriptEslint.config(
  {
    ignores: ['**/dist', '**/coverage'],
  },
  {
    plugins: { '@nx': nxEslintPlugin, '@typescript-eslint': typescriptEslint.plugin },
  },

  // Parser for *.ts files
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: typescriptEslint.parser,
      parserOptions: { project: './tsconfig.json', tsconfigRootDir: import.meta.dirname },
    },
  },

  // Parser for *.json files
  {
    files: ['**/*.json'],
    languageOptions: { parser: jsoncParser },
  },

  // Configurations for *.ts files
  ...[
    eslintPlugin.configs.recommended,
    ...typescriptEslint.configs.strictTypeChecked,
    ...typescriptEslint.configs.stylisticTypeChecked,
    unicornEslintPlugin.configs['flat/all'],
  ].map((configs) => ({
    files: ['**/*.ts'],
    ...configs,
  })),

  // Rules customization for *.ts files
  {
    files: ['**/*.ts'],
    rules: {
      camelcase: 'error',
      curly: 'error',
      eqeqeq: 'error',
      radix: 'error',
      complexity: ['error', 20],
      'max-depth': ['error', 4],
      'max-params': ['error', 8],
      'no-console': 'warn',
      'object-shorthand': ['error', 'always'],
      'prefer-destructuring': ['error', { object: true }],
      'no-magic-numbers': ['error', { ignore: [0, 1] }],
      'unicorn/prevent-abbreviations': ['error', { ignore: ['app', 'e2e', 'props', 'moduleRef'] }],
      '@typescript-eslint/no-extraneous-class': ['error', { allowEmpty: true }],
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@nx/enforce-module-boundaries': [
        'error',
        {
          depConstraints: [{ sourceTag: 'apps/backend', onlyDependOnLibsWithTags: ['libs/common'] }],
        },
      ],
    },
  },

  // Configuration for test files
  ...[jestEslintPlugin.configs['flat/all']].map((configs) => ({
    files: ['**/*.spec.ts'],
    ...configs,
  })),

  // Adjustments for specific files
  {
    files: ['**/*.spec.ts', '**/*.dto.ts', '**/*.entity.ts'],
    rules: { 'no-magic-numbers': 'off' },
  },

  // Specific rules for package.json files
  {
    files: ['**/package.json'],
    rules: {
      '@nx/dependency-checks': [
        'error',
        { ignoredFiles: ['**/*.spec.ts', '**/*.js'], includeTransitiveDependencies: true },
      ],
    },
  },
);
