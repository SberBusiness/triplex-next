import { test, expect } from "@playwright/test";

test.describe("Checkbox", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("http://localhost:6006/iframe.html?id=components-checkbox--default");
    });

    test("should render with default state", async ({ page }) => {
        const checkbox = page.getByRole("checkbox");
        await expect(checkbox).toBeVisible();
        await expect(checkbox).not.toBeChecked();
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

    test("should be disabled when disabled prop is set", async ({ page }) => {
        await page.goto("http://localhost:6006/iframe.html?id=components-checkbox--playground&args=disabled:true");

        const checkbox = page.getByRole("checkbox");
        await expect(checkbox).toBeDisabled();
        await expect(checkbox).not.toBeChecked();

        await checkbox.click({ force: true });
        await expect(checkbox).not.toBeChecked();
    });

    test("should show focus visible state when focused via keyboard", async ({ page }) => {
        const checkbox = page.getByRole("checkbox");

        await checkbox.focus();
        await expect(checkbox).toBeFocused();

        await expect(checkbox).toHaveAttribute("data-focus-visible", "");
    });

    test("should work with XGroup layout", async ({ page }) => {
        await page.goto("http://localhost:6006/iframe.html?id=components-checkbox--x-group");

        const checkboxes = page.getByRole("checkbox");
        await expect(checkboxes).toHaveCount(3);

        await checkboxes.first().click();
        await expect(checkboxes.first()).toBeChecked();

        await checkboxes.nth(1).click();
        await expect(checkboxes.nth(1)).toBeChecked();

        await expect(checkboxes.first()).toBeChecked();
        await expect(checkboxes.nth(1)).toBeChecked();
        await expect(checkboxes.nth(2)).not.toBeChecked();
    });

    test("should work with YGroup layout", async ({ page }) => {
        await page.goto("http://localhost:6006/iframe.html?id=components-checkbox--y-group");

        const checkboxes = page.getByRole("checkbox");
        await expect(checkboxes).toHaveCount(4);

        for (let i = 0; i < 4; i++) {
            await checkboxes.nth(i).click();
            await expect(checkboxes.nth(i)).toBeChecked();
        }

        for (let i = 0; i < 4; i++) {
            await expect(checkboxes.nth(i)).toBeChecked();
        }
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
