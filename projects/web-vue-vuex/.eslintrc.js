const tsconfig = require('./tsconfig.json');

module.exports = {
  root: true,
  extends: ['plugin:@clux/recommended/vue'],
  env: {
    browser: false,
    node: true,
  },
  parserOptions: {
    project: `${__dirname}/tsconfig.json`,
  },
  ignorePatterns: tsconfig.exclude,
};
