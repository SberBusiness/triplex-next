import { test, expect } from "@playwright/test";

test.describe("Radio", () => {
    test.describe("Playground", () => {
        test.beforeEach(async ({ page }) => {
            await page.goto("http://localhost:6006/iframe.html?id=components-radio--playground");
        });

        test("should be clickable and toggle checked state", async ({ page }) => {
            const radio = page.getByRole("radio");

            await expect(radio).not.toBeChecked();

            await radio.click();
            await expect(radio).toBeChecked();

            await radio.click();
            await expect(radio).toBeChecked();
        });

        test("should handle keyboard navigation", async ({ page }) => {
            const radio = page.getByRole("radio");

            await radio.focus();
            await expect(radio).toBeFocused();

            await page.keyboard.press("Space");
            await expect(radio).toBeChecked();
        });
    });
});
