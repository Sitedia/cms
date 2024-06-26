import eslintPlugin from '@eslint/js';
import nxEslintPlugin from '@nx/eslint-plugin';
import jestEslintPlugin from 'eslint-plugin-jest';
import unicornEslintPlugin from 'eslint-plugin-unicorn';
import jsoncParser from 'jsonc-eslint-parser';
import typescriptEslint from 'typescript-eslint';

export default [
  {
    ignores: ['node_modules', 'dist', 'coverage', 'tmp'],
  },

  {
    plugins: { '@typescript-eslint': typescriptEslint.plugin, '@nx': nxEslintPlugin },
  },

  // Parser for Typescript files
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: typescriptEslint.parser,
      parserOptions: { project: './tsconfig.json', tsconfigRootDir: import.meta.dirname },
    },
  },

  // Parser for JSON files
  {
    files: ['**/*.json'],
    languageOptions: {
      parser: jsoncParser,
    },
  },

  // Recommended Eslint configurations
  eslintPlugin.configs.recommended,

  // Strict Typescript configurations
  ...typescriptEslint.configs.strictTypeChecked.map((config) => ({ files: ['**/*.ts'], ...config })),

  // All Jest configurations
  {
    files: ['**/*.spec.ts'],
    ...jestEslintPlugin.configs['flat/all'],
  },

  // All Unicorn configurations
  unicornEslintPlugin.configs['flat/all'],

  // Custom configurations for Typescript files
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
      'no-console': 'error',
      'no-implicit-coercion': 'error',
      'no-else-return': ['error', { allowElseIf: false }],
      'object-shorthand': ['error', 'always'],
      'no-magic-numbers': ['error', { ignore: [0, 1] }],
      'unicorn/prefer-string-raw': 'off',
      'unicorn/prevent-abbreviations': ['error', { ignore: ['app', 'e2e', 'props', 'moduleRef'] }],
      '@typescript-eslint/no-extraneous-class': ['error', { allowEmpty: true }],
      '@typescript-eslint/restrict-template-expressions': ['error', { allowNumber: true }],
      '@nx/enforce-module-boundaries': [
        'error',
        {
          depConstraints: [
            { sourceTag: 'apps/backend', onlyDependOnLibsWithTags: ['libs/common', 'libs/cms'] },
            { sourceTag: 'libs/cms', onlyDependOnLibsWithTags: ['libs/common'] },
          ],
        },
      ],
    },
  },

  // Custom configurations for Javascript files
  {
    files: ['**/*.js'],
    rules: {
      'unicorn/prefer-string-raw': 'off',
    },
  },

  // Allow magic numbers in some files
  {
    files: ['**/*.spec.ts', '**/*.dto.ts', '**/*.entity.ts'],
    rules: { 'no-magic-numbers': 'off' },
  },

  // Check dependencies in package.json files for the buildable projects
  {
    files: ['apps/**/package.json', 'libs/**/package.json'],
    rules: {
      '@nx/dependency-checks': [
        'error',
        { ignoredFiles: ['**/*.spec.ts', '*.config.js'], includeTransitiveDependencies: true },
      ],
    },
  },
];
