import preset from '../../eslint.base.js';

export default [
  ...preset,
  { languageOptions: { parserOptions: { project: './tsconfig.json', tsconfigRootDir: import.meta.dirname } } },
];
