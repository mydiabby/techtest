// jest.config.js
module.exports = {
  rootDir: '',
  roots: ['<rootDir>/src'],
  globals: {
    fetch: global.fetch,
  },
  moduleFileExtensions: ['js', 'json', 'ts'],
  modulePaths: ['<rootDir>/src/modules.'],
  setupFiles: ['<rootDir>/jest/dotenv-config.js'],
  //   globalSetup: '<rootDir>/test/global-setup.ts',
  //   globalTeardown: '<rootDir>/test/global-teardown.ts',
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '@/(.*)$': '<rootDir>/src/$1',
  },
  testRegex: '.*\\.(test|spec)\\.ts$',
  preset: 'ts-jest',
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.json',
      },
    ],
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
};
