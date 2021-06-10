const tsconfig = require('./tsconfig.json');

module.exports = {
  root: true,
  extends: ['plugin:@clux/recommended/react'],
  env: {
    browser: false,
    node: true,
  },
  parserOptions: {
    project: `${__dirname}/tsconfig.json`,
  },
  rules: {},
  ignorePatterns: tsconfig.exclude,
};
