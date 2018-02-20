module.exports = {
    globals: {
        'ts-jest': {
            tsConfigFile: './tsconfig.json',
            useBabelrc: true,
        },
    },
    testPathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/node_modules/'],
    testMatch: ['**/*.spec.ts?(x)'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    collectCoverageFrom: ['src/**/*.{ts,tsx}'],
    transform: {
        '.(js|ts|tsx)': 'ts-jest/preprocessor.js',
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
}
