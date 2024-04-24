import preset from '../../eslint.config.js';

export default [
  ...preset,
  { languageOptions: { parserOptions: { project: './tsconfig.json', tsconfigRootDir: import.meta.dirname } } },
];
