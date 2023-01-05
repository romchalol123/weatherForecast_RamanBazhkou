module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  jest: {
    globals: true,
  },
  rules: {
    'prettier/prettier': 'error',
    'import/prefer-default-export': 'off', 
    'no-param-reassign': 'off',
    'class-methods-use-this': 'off',
    'no-shadow': 'off',
    'no-alert': 'off',
    'radix': 'off',
  },
};
