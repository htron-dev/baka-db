module.exports = {
    env: {
        es2021: true,
        node: true
    },
    extends: ['standard', 'plugin:json/recommended', 'prettier'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module'
    },
    plugins: ['@typescript-eslint'],
    rules: {
        indent: ['error', 4]
    }
}
