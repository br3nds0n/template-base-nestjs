import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

export default {
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
  testRegex: '.*\\..*spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: [
    '**/*.(t|j)s',
    '!**/node_modules/**',
    '!**/dist/**',
    '!**/coverage/**',
    '!**/*.module.ts',
    '!**/*.eslintrc.js',
    '!**/*global-config.ts',
    '!**/*main.ts',
    '!**/*index.ts',
    '!**/migrations/**',
    '!**/*.entity-schema.ts',
    '!**/*jest.config.ts',
  ],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
};
