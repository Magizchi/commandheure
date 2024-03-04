// eslint-disable-next-line no-undef
module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ["prettier","eslint:recommended", "plugin:react/recommended", "plugin:@typescript-eslint/recommended"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: "module",
    },
    plugins: ["react", "@typescript-eslint"],
    rules: {
        semi: ["error", "always"],
        quotes: ["error", "double"],
        "react/prop-types": "off",
        "no-console": ["warn"],
        "linebreak-style": 0,
        "react/self-closing-comp": [
            "error",
            {
                component: true,
                html: true,
            },
        ],
        "@typescript-eslint/no-empty-function": 0,
        "@typescript-eslint/no-unused-vars": ["warn"],
    },
};
