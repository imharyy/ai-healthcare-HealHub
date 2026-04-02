module.exports = {
  rootDir: '..',
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.js'],
  setupFilesAfterEnv: ['<rootDir>/tests/setupTests.js'],
  collectCoverageFrom: [
    'server/**/*.js',
    '!server/seed.js'
  ],
  coverageDirectory: '<rootDir>/tests/coverage'
};
