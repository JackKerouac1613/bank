// eslint-disable-next-line no-undef
module.exports = {
    transform: {
        '^.+\\.[t|j]sx?$': 'babel-jest',
    },
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '\\.(css|less)$': 'identity-obj-proxy',
    },
};
