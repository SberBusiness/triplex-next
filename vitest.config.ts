import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default defineConfig({
    plugins: [react()],
    test: {
        coverage: {
            reporter: ["text", "html", "lcov"],
            include: ["src/**/*.{js,ts,jsx,tsx}"],
            exclude: ["src/components/DesignTokens/*", "src/generated/*"],
        },
        include: ["src/**/*.test.tsx"],
        environment: "jsdom",
        globals: true,
        setupFiles: "vitest.setup.ts",
        css: {
            modules: {
                classNameStrategy: "non-scoped",
            },
        },
    },
    resolve: {
        alias: {
            "@sberbusiness/triplex-next": resolve(__dirname, "./src"),
        },
    },
});
