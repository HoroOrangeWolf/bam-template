module.exports = {
    root: true,
    env: {browser: true, es2020: true, node: true},
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:import/recommended",
        "plugin:import/typescript",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "airbnb"
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    plugins: ['react-refresh', 'react', 'react-hooks'],
    rules: {
        "no-restricted-imports": ["error", {
            "patterns": [".*"]
        }],
        "react/react-in-jsx-scope": "off",
        "import/no-unresolved": "off",
        "react/jsx-filename-extension": ["off"],
        "react/function-component-definition": [
            2,
            {
                namedComponents: "arrow-function",
                unnamedComponents: "arrow-function"
            }
        ]
    }
}
