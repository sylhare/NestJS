import type {Config} from '@jest/types';

const unitConfig: Config.InitialOptions = {
    preset: "ts-jest",
    testRegex: "\\.(test|spec)\\.ts$",
    moduleFileExtensions: ["ts", "js", "json"],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
    setupFilesAfterEnv: [],
    testEnvironment: "node",
};

export default unitConfig;