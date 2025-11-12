import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import prettierRecommended from "eslint-plugin-prettier/recommended";

export default tseslint.config(
    // ESLint recommended configuration
    eslint.configs.recommended,
    // TypeScript-ESLint recommended configuration
    tseslint.configs.recommended,
    // TypeScript-specific adds/overrides
    {
        files: ["**/*.{ts,tsx,mts,cts}"],
        rules: {
            "@typescript-eslint/no-empty-object-type": [
                "error",
                {
                    allowInterfaces: "with-single-extends",
                },
            ],
            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    ignoreRestSiblings: true,
                },
            ],
        },
    },
    // React recommended configuration
    {
        files: ["**/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts}"],
        ...react.configs.flat.recommended,
        rules: {
            "react/prop-types": "off",
        },
    },
    // React-specific adds/overrides
    {
        files: ["**/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts}"],
        rules: {
            ...react.configs["jsx-runtime"].rules, // For React 17+ JSX transform
        },
        settings: {
            react: {
                version: "detect", // Auto-detect React version
            },
        },
    },
    // React hooks recommended configuration
    reactHooks.configs.flat["recommended-latest"],
    // Enviroment-specific adds/overrides
    {
        files: ["src/**/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts}", "stories/**/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts}"],
        languageOptions: {
            globals: globals.browser,
        },
    },
    // Stories-specific overrides
    {
        files: ["stories/**/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts}"],
        rules: {
            "react-hooks/rules-of-hooks": "off", // Disable hooks rules for stories
        },
    },
    {
        files: ["scripts/**/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts}"],
        languageOptions: {
            globals: globals.node,
        },
    },
    // Global ignores (e.g., build output)
    {
        ignores: ["dist", "storybook-static"],
    },
    // Prettier recommended configuration
    prettierRecommended,
);
