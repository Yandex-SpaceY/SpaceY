export default {
  verbose: true,
  collectCoverageFrom: ['src/components/**/*.{ts,tsx}'],
  roots: ['<rootDir>/src'],
  testMatch: [ '**/__tests__/**/*.+(ts|tsx|js|jsx)', '**/?(*.)+(spec|test).+(ts|tsx|js|jsx)' ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  snapshotSerializers: ['enzyme-to-json/serializer'],
  setupFilesAfterEnv: ['<rootDir>/setupEnzyme.ts'],
  moduleNameMapper: {
    '\\.(css|less|scss)$': '<rootDir>/styleMock.js',
    '^constants/(.*)$': '<rootDir>/src/constants/$1',
    '^components': '<rootDir>/src/components',
    '^utils': '<rootDir>/src/utils',
    '^api/(.*)$': '<rootDir>/src/api/$1',
    '^types': '<rootDir>/src/types',
  },
};
