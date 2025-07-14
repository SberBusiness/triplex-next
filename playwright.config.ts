import { defineConfig } from "@playwright/test";

export default defineConfig({
    testDir: "./e2e/tests",
    use: {
        baseURL: "http://localhost:6006",
        browserName: "chromium",
        headless: false,
        viewport: { width: 1280, height: 800 },
    },
    webServer: {
        command: "npm run storybook",
        port: 6006,
        reuseExistingServer: !process.env.CI,
        timeout: 120 * 1000,
    },
});
