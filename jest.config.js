const config = {
    preset: "ts-jest",
    testEnvironment: "node",
    roots: [/*"<rootDir>/test", */ "<rootDir>/src"],
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
    },
};
export default config;
