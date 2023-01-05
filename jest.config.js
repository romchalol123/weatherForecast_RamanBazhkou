/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  collectCoverageFrom: [
    'src/**/*.{js}',
    '!**/node_modules/**',
    '!**/js/index.js',
    '!dist',
    '!coverage',
  ],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.(css|scss|png|jpg|svg)$': 'jest-transform-stub',
  },
  moduleFileExtentions: ['js'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
};
