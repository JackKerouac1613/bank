//eslint-disable-next-line no-undef
module.exports = {
    env: {
        browser: true,
        es2021: true,
        "cypress/globals": true,
    },
    plugins: ['prettier', 'cypress'],
    extends: ['eslint:recommended', 'plugin:cypress/recommended', 'prettier'],
    overrides: [],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    rules: {
        'no-var': 'error',
        'prettier/prettier': ['error', { endOfLine: 'auto' }],
    },
};
