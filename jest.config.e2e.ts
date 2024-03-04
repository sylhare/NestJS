import type {Config} from '@jest/types';

const e2eConfig: Config.InitialOptions = {
    moduleFileExtensions: ["js", "json", "ts"],
    rootDir: "./tests/e2e",
    testEnvironment: "node",
    testRegex: ".e2e-spec.ts$",
    transform: {
        "^.+\\.(t|j)s$": "ts-jest"
    }
};

export default e2eConfig;