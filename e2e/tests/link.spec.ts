import { test, expect } from "@playwright/test";

test.describe("Link", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("http://localhost:6006/iframe.html?id=components-link--default");
    });

    test("should be clickable and navigate to href", async ({ page }) => {
        const link = page.getByRole("link");

        await expect(link).toBeVisible();
        await expect(link).toHaveAttribute("href", "#");

        await link.click();

        await expect(link).toBeVisible();
    });

    test("should change box-shadow on focus", async ({ page }) => {
        const link = page.getByRole("link");

        await link.focus();
        await expect(link).toBeFocused();
        const focusShadow = await link.evaluate((el) => getComputedStyle(el).boxShadow);
        expect(focusShadow).not.toBe("none");
    });
});
