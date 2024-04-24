import tseslint from 'typescript-eslint';
import preset from '../../eslint.base.js';

export default [
  ...preset,
  {
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: { project: './tsconfig.json', tsconfigRootDir: import.meta.dirname },
    },
  },
];
