import { defineConfig } from "@playwright/test";

export default defineConfig({
    testDir: "./e2e/tests",
    timeout: 30000, // глобальный таймаут для одного теста (30 сек)
    expect: {
        timeout: 15000, // таймаут для всех expect (15 сек)
    },
    use: {
        baseURL: "http://localhost:6006",
        browserName: "chromium",
        headless: true,
        viewport: { width: 1280, height: 800 },
    },
    webServer: {
        command: "npm run storybook",
        port: 6006,
        reuseExistingServer: !process.env.CI,
        timeout: 120 * 1000,
    },
});
