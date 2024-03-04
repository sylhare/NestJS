import type {Config} from '@jest/types';

const config: Config.InitialOptions = {
    preset: "ts-jest",
    testRegex: "\\.(test|spec|e2e-spec)\\.ts$",
    moduleFileExtensions: ["ts", "js", "json"],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
    setupFilesAfterEnv: [],
    testEnvironment: "node",
    collectCoverage: true,
    collectCoverageFrom: ["src/**/*.ts", "!src/index.ts"],
    coveragePathIgnorePatterns: [],
    coverageReporters: ["text", "text-summary", "lcov"],
    coverageThreshold: {
        "global": {
            "branches": 85,
            "lines": 85
        }
    },
};

export default config;