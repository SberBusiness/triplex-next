import { test, expect } from "@playwright/test";

test.describe("Input", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("http://localhost:6006/iframe.html?id=components-input--default");
    });

    test("should accept user input", async ({ page }) => {
        const input = page.getByPlaceholder("Введите текст");
        await input.fill("Тест");
        await expect(input).toHaveValue("Тест");
    });

    test("should be disabled when prop is set", async ({ page }) => {
        await page.goto("http://localhost:6006/iframe.html?id=components-input--disabled");
        const input = page.getByRole("textbox");
        await expect(input).toBeDisabled();
    });
});
