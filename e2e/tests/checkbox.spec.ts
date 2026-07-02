import { test, expect } from "../fixtures";

test.describe("Checkbox", () => {
    test.describe("Playground", () => {
        test.beforeEach(async ({ page }) => {
            await page.goto("http://localhost:6006/iframe.html?id=components-checkboxes-checkbox--playground");
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

    test.describe("Sizes", () => {
        test.beforeEach(async ({ page }) => {
            await page.goto("http://localhost:6006/iframe.html?id=components-checkboxes-checkbox--sizes");
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
            await page.goto("http://localhost:6006/iframe.html?id=components-checkboxes-checkboxxgroup--default");
        });

        test("should allow multiple selections in group", async ({ page }) => {
            const checkboxes = page.getByRole("checkbox");

            await checkboxes.nth(0).click();
            await expect(checkboxes.nth(0)).toBeChecked();
            await expect(checkboxes.nth(1)).not.toBeChecked();
            await expect(checkboxes.nth(2)).not.toBeChecked();

            await checkboxes.nth(1).click();
            await expect(checkboxes.nth(0)).toBeChecked();
            await expect(checkboxes.nth(1)).toBeChecked();
            await expect(checkboxes.nth(2)).not.toBeChecked();

            await checkboxes.nth(0).click();
            await expect(checkboxes.nth(0)).not.toBeChecked();
            await expect(checkboxes.nth(1)).toBeChecked();
        });
    });

    test.describe("Y Group", () => {
        test.beforeEach(async ({ page }) => {
            await page.goto("http://localhost:6006/iframe.html?id=components-checkboxes-checkboxygroup--default");
        });

        test("should allow multiple selections in group", async ({ page }) => {
            const checkboxes = page.getByRole("checkbox");

            await checkboxes.nth(0).click();
            await expect(checkboxes.nth(0)).toBeChecked();
            await expect(checkboxes.nth(1)).not.toBeChecked();
            await expect(checkboxes.nth(2)).not.toBeChecked();

            await checkboxes.nth(1).click();
            await expect(checkboxes.nth(0)).toBeChecked();
            await expect(checkboxes.nth(1)).toBeChecked();
            await expect(checkboxes.nth(2)).not.toBeChecked();

            await checkboxes.nth(0).click();
            await expect(checkboxes.nth(0)).not.toBeChecked();
            await expect(checkboxes.nth(1)).toBeChecked();
        });
    });
});
