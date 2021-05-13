/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const tsconfig = require('./tsconfig.json');

module.exports = {
  root: true,
  extends: ['plugin:@clux/recommended/common'],
  env: {
    browser: false,
    node: true,
  },
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {},
  ignorePatterns: tsconfig.exclude,
};
