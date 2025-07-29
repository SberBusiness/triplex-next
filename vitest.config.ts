import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default defineConfig({
    plugins: [react()],
    test: {
        coverage: {
            provider: "v8",
            reportsDirectory: "./coverage",
            reporter: ["text", "html", "lcov"],
        },
        include: ["src/**/*.test.tsx"],
        environment: "jsdom",
        globals: true,
    },
    resolve: {
        alias: {
            "triplex-next": resolve(__dirname, "./src"),
        },
    },
});
