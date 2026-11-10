import { Page } from "@playwright/test";
import { test, expect } from "../fixtures";

/** Открывает story ButtonDropdown и фокусирует кнопку-триггер. */
async function focusButtonDropdown(page: Page, story: string) {
    await page.goto(`http://localhost:6006/iframe.html?id=components-buttons-buttondropdown--${story}`);

    const button = page.locator("button[aria-haspopup]");
    await button.focus();

    return button;
}

/**
 * Клавиатура выпадающих списков в настоящем браузере. В jsdom эти сценарии не воспроизводятся:
 * браузер выполняет микротаски между обработчиками одного события, и React 18 успевает закоммитить
 * открытие списка, пока keydown ещё всплывает.
 */
test.describe("Dropdown keyboard", () => {
    test.describe("ButtonDropdown", () => {
        test("Space on the closed button opens the list without selecting an option", async ({ page }) => {
            const button = await focusButtonDropdown(page, "default");
            await page.keyboard.press("Space");

            await expect(page.getByRole("listbox")).toBeVisible();
            await expect(button).toHaveAttribute("aria-expanded", "true");
            await expect(button).toHaveAttribute("aria-activedescendant", "opt-1");
        });

        test("ArrowDown on the closed button opens the list with the first option active", async ({ page }) => {
            const button = await focusButtonDropdown(page, "default");
            await page.keyboard.press("ArrowDown");

            await expect(page.getByRole("listbox")).toBeVisible();
            await expect(button).toHaveAttribute("aria-activedescendant", "opt-1");
        });

        test("arrows and Enter select an option in the opened list", async ({ page }) => {
            const button = await focusButtonDropdown(page, "with-selected-option");
            await page.keyboard.press("Space");
            await expect(button).toHaveAttribute("aria-activedescendant", "opt-2");

            await page.keyboard.press("ArrowDown");
            await expect(button).toHaveAttribute("aria-activedescendant", "opt-3");

            await page.keyboard.press("Enter");
            await expect(page.getByRole("listbox")).toBeHidden();

            await page.keyboard.press("Space");
            await expect(button).toHaveAttribute("aria-activedescendant", "opt-3");
        });
    });

    test.describe("SelectField", () => {
        test("Space opens the list without selecting, arrows and Enter select", async ({ page }) => {
            await page.goto("http://localhost:6006/iframe.html?id=components-selectfield--default");

            const field = page.getByRole("combobox");
            // Tab до отрисовки story увёл бы фокус мимо поля.
            await expect(field).toBeVisible();
            await page.keyboard.press("Tab");
            await page.keyboard.press("Space");

            await expect(page.getByRole("listbox")).toBeVisible();
            await expect(field).toContainText("Не выбрано");

            await page.keyboard.press("ArrowDown");
            await page.keyboard.press("Enter");

            await expect(page.getByRole("listbox")).toBeHidden();
            await expect(field).toContainText("Вторая опция");
        });
    });
});
