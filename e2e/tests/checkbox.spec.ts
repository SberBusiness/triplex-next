import { test, expect } from "@playwright/test";

test.describe("Checkbox", () => {
    test.describe("Playground", () => {
        test.beforeEach(async ({ page }) => {
            await page.goto("http://localhost:6006/iframe.html?id=components-checkbox--playground");
        });

        test("should toggle checked state when clicked", async ({ page }) => {
            const checkbox = page.getByRole("checkbox");

            await expect(checkbox).not.toBeChecked();

            await checkbox.click();
            await expect(checkbox).toBeChecked();

            await checkbox.click();
            await expect(checkbox).not.toBeChecked();
        });

        test("should toggle when label is clicked", async ({ page }) => {
            const checkbox = page.getByRole("checkbox");
            const label = page.getByText("Checkbox label");

            await expect(checkbox).not.toBeChecked();

            await label.click();
            await expect(checkbox).toBeChecked();

            await label.click();
            await expect(checkbox).not.toBeChecked();
        });

        test("should handle keyboard navigation", async ({ page }) => {
            const checkbox = page.getByRole("checkbox");

            await checkbox.focus();
            await expect(checkbox).toBeFocused();

            await page.keyboard.press("Space");
            await expect(checkbox).toBeChecked();
        });

        test("should handle onChange events", async ({ page }) => {
            const checkbox = page.getByRole("checkbox");

            await expect(checkbox).not.toBeChecked();

            await checkbox.evaluate((el: HTMLInputElement) => {
                el.checked = true;
                el.dispatchEvent(new Event("change", { bubbles: true }));
            });

            await expect(checkbox).toBeChecked();
        });
    });

    test.describe("Default", () => {
        test.beforeEach(async ({ page }) => {
            await page.goto("http://localhost:6006/iframe.html?id=components-checkbox--default");
        });

        test("should allow independent selection of different sizes", async ({ page }) => {
            const checkboxes = page.getByRole("checkbox");

            await checkboxes.nth(0).click();
            await expect(checkboxes.nth(0)).toBeChecked();
            await expect(checkboxes.nth(1)).not.toBeChecked();

            await checkboxes.nth(1).click();
            await expect(checkboxes.nth(0)).toBeChecked();
            await expect(checkboxes.nth(1)).toBeChecked();

            await checkboxes.nth(0).click();
            await expect(checkboxes.nth(0)).not.toBeChecked();
            await expect(checkboxes.nth(1)).toBeChecked();
        });
    });

    test.describe("X Group", () => {
        test.beforeEach(async ({ page }) => {
            await page.goto("http://localhost:6006/iframe.html?id=components-checkbox--x-group");
        });

        test("should allow multiple selections in groups", async ({ page }) => {
            const checkboxes = page.getByRole("checkbox");

            await checkboxes.nth(0).click();
            await expect(checkboxes.nth(0)).toBeChecked();
            await expect(checkboxes.nth(1)).not.toBeChecked();
            await expect(checkboxes.nth(2)).not.toBeChecked();

            await checkboxes.nth(1).click();
            await expect(checkboxes.nth(0)).toBeChecked();
            await expect(checkboxes.nth(1)).toBeChecked();
            await expect(checkboxes.nth(2)).not.toBeChecked();

            await checkboxes.nth(3).click();
            await expect(checkboxes.nth(3)).toBeChecked();
            await expect(checkboxes.nth(4)).not.toBeChecked();
            await expect(checkboxes.nth(5)).not.toBeChecked();
        });
    });

    test.describe("Y Group", () => {
        test.beforeEach(async ({ page }) => {
            await page.goto("http://localhost:6006/iframe.html?id=components-checkbox--y-group");
        });

        test("should allow multiple selections in groups", async ({ page }) => {
            const checkboxes = page.getByRole("checkbox");

            await checkboxes.nth(0).click();
            await expect(checkboxes.nth(0)).toBeChecked();
            await expect(checkboxes.nth(1)).not.toBeChecked();
            await expect(checkboxes.nth(2)).not.toBeChecked();
            await expect(checkboxes.nth(3)).not.toBeChecked();

            await checkboxes.nth(1).click();
            await expect(checkboxes.nth(0)).toBeChecked();
            await expect(checkboxes.nth(1)).toBeChecked();
            await expect(checkboxes.nth(2)).not.toBeChecked();
            await expect(checkboxes.nth(3)).not.toBeChecked();

            await checkboxes.nth(4).click();
            await expect(checkboxes.nth(4)).toBeChecked();
            await expect(checkboxes.nth(5)).not.toBeChecked();
            await expect(checkboxes.nth(6)).not.toBeChecked();
            await expect(checkboxes.nth(7)).not.toBeChecked();
        });
    });
});
