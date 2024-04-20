import eslint from '@eslint/js';
import nxPlugin from '@nx/eslint-plugin';
import jestPlugin from 'eslint-plugin-jest';
import unicornPlugin from 'eslint-plugin-unicorn';
import typescriptPlugin from 'typescript-eslint';

export default typescriptPlugin.config(
  eslint.configs.recommended,
  jestPlugin.configs['flat/all'],
  unicornPlugin.configs['flat/all'],
  { ignores: ['dist/**', 'coverage/**', '*.config.js'] },
  { plugins: { '@nx': nxPlugin } },
  {
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
      'unicorn/prevent-abbreviations': ['error', { ignore: ['app', 'e2e', 'props', 'moduleRef'] }],
    },
  },
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
  ...typescriptPlugin.configs.recommendedTypeChecked,
  ...typescriptPlugin.configs.stylistic,
  // {
  //   rules: {
  //     '@nx/dependency-checks': [
  //       'error',
  //       { ignoredFiles: ['**/*.spec.ts'], ignoredDependencies: ['dotenv'], includeTransitiveDependencies: true },
  //     ],
  //   },
  // },
);
