import { test, expect } from "@playwright/test";

test.describe("Button", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("http://localhost:6006/iframe.html?id=components-button--default");
    });

    test("should be disabled when prop is set", async ({ page }) => {
        await page.goto("http://localhost:6006/iframe.html?id=components-buttons-button--disabled");
        const button = page.getByRole("button").first();
        await expect(button).toBeDisabled();
    });
});
