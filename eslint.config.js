import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import { defineConfig } from "eslint/config";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default defineConfig([
    js.configs.recommended,
    {
        ignores: [
            "**/node_modules/**",
            "**/dist/**",
            "**/build/**",
            "**/examples/**",
            "**/coverage/**",
            "**/tests/**",
        ],
    },

    {
        files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module",
                ecmaFeatures: {
                    jsx: true,
                },
            },
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        plugins: {
            "@typescript-eslint": tseslint.plugin,
            react: pluginReact,
            "react-hooks": pluginReactHooks,
        },
        settings: {
            react: {
                version: "detect",
            },
        },
    },

    ...tseslint.configs.recommended,

    pluginReact.configs.flat.recommended,
    {
        rules: {
            "no-console": ["error", { allow: ["warn", "error"] }],
            "no-unused-vars": "off",
            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    vars: "all",
                    args: "after-used",
                    varsIgnorePattern: "^_",
                    argsIgnorePattern: "^_",
                },
            ],

            "react-hooks/rules-of-hooks": "error",
            "react-hooks/exhaustive-deps": "warn",
            "react/react-in-jsx-scope": "off",
        },
    },
    eslintPluginPrettierRecommended,
]);
