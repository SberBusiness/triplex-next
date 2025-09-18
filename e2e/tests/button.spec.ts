import { test, expect, Page } from "@playwright/test";

async function getButtons(page: Page, url: string) {
    await page.goto(url);
    const buttons = page.getByRole("button");
    await expect(buttons.first()).toBeVisible({ timeout: 5000 });
    return buttons;
}

test.describe("Button", () => {
    test("should be clickable when enabled", async ({ page }) => {
        const button = await getButtons(page, "http://localhost:6006/iframe.html?id=components-button-button--default");

        await expect(button).toBeEnabled();
        await expect(button).toHaveRole("button");
        await button.click();
        await expect(button).toBeEnabled();
    });

    test("should change background color on hover", async ({ page }) => {
        const button = await getButtons(page, "http://localhost:6006/iframe.html?id=components-button-button--default");

        const before = await button.evaluate((el) => getComputedStyle(el).backgroundColor);
        await button.hover();
        await page.waitForTimeout(100);
        const after = await button.evaluate((el) => getComputedStyle(el).backgroundColor);

        expect(before).not.toBe(after);
    });

    test("should be disabled when prop is set", async ({ page }) => {
        const buttons = await getButtons(
            page,
            "http://localhost:6006/iframe.html?id=components-buttons-button--disabled",
        );
        const count = await buttons.count();

        for (let i = 0; i < count; i++) {
            const currentButton = buttons.nth(i);
            await expect(currentButton).toBeDisabled();
        }
    });

    test("should change box-shadow on focus", async ({ page }) => {
        const buttons = await getButtons(
            page,
            "http://localhost:6006/iframe.html?id=components-button-button--different-themes",
        );

        const count = await buttons.count();

        for (let i = 0; i < count; i++) {
            const currentButton = buttons.nth(i);
            await expect(currentButton).toBeVisible();
            await currentButton.focus();
            const focusShadow = await currentButton.evaluate((el) => getComputedStyle(el).boxShadow);
            expect(focusShadow).not.toBe("none");
        }
    });

    test("should be disabled when loading", async ({ page }) => {
        const buttons = await getButtons(
            page,
            "http://localhost:6006/iframe.html?id=components-button-button--loading",
        );

        const count = await buttons.count();

        for (let i = 0; i < count; i++) {
            const currentButton = buttons.nth(i);
            await expect(currentButton).toBeVisible();
            await expect(currentButton).toHaveCSS("pointer-events", "none");
            await expect(currentButton).toHaveClass(/loading/);

            const loadingDots = currentButton.locator("div");
            await expect(loadingDots).toHaveClass(/loadingDots/);
            await expect(loadingDots).toBeVisible();
        }
    });

    test("should take full width when block prop is set", async ({ page }) => {
        const buttons = await getButtons(
            page,
            "http://localhost:6006/iframe.html?id=components-button-button--block-mode",
        );

        const count = await buttons.count();

        for (let i = 0; i < count; i++) {
            const currentButton = buttons.nth(i);
            await expect(currentButton).toBeVisible();
            await expect(currentButton).toHaveCSS("display", "block");
        }
    });

    test("should be focused when tab is pressed", async ({ page }) => {
        const button = await getButtons(page, "http://localhost:6006/iframe.html?id=components-button-button--default");

        await page.keyboard.press("Tab");
        const isButtonFocused = await button.evaluate((el) => el === document.activeElement);
        expect(isButtonFocused).toBe(true);
        await page.waitForTimeout(300);
        const focusShadow = await button.evaluate((el) => getComputedStyle(el).boxShadow);
        expect(focusShadow).toBe("rgb(255, 209, 105) 0px 0px 0px 1px inset");
    });
});
