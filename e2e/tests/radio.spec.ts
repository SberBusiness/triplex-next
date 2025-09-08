import { test, expect } from "@playwright/test";

test.describe("Radio", () => {
    test.describe("Default Radio", () => {
        test.beforeEach(async ({ page }) => {
            await page.goto("http://localhost:6006/iframe.html?id=components-radio--default");
        });

        test("should render with default props", async ({ page }) => {
            const radio = page.getByRole("radio");
            const label = page.getByText("Radio text");

            await expect(radio).toBeVisible();
            await expect(label).toBeVisible();
            await expect(radio).toHaveAttribute("type", "radio");
            await expect(radio).not.toBeChecked();
            await expect(radio).not.toBeDisabled();
        });

        test("should be clickable and toggle checked state", async ({ page }) => {
            const radio = page.getByRole("radio");

            await expect(radio).not.toBeChecked();

            await radio.click();
            await expect(radio).toBeChecked();

            await radio.click();
            await expect(radio).toBeChecked(); // Radio buttons stay checked when clicked again
        });

        test("should show focus visible state on keyboard focus", async ({ page }) => {
            const radio = page.getByRole("radio");

            await radio.focus();
            await expect(radio).toHaveAttribute("data-focus-visible", "");
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
