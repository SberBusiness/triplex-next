import { Page } from "@playwright/test";
import { test, expect } from "../fixtures";

async function getButtons(page: Page, url: string) {
    await page.goto(url);
    const buttons = page.getByRole("button");
    return buttons;
}

test.describe("Button", () => {
    test("should be clickable when enabled", async ({ page }) => {
        const button = await getButtons(
            page,
            "http://localhost:6006/iframe.html?id=components-buttons-button--default",
        );

        await expect(button).toBeEnabled();
        await expect(button).toHaveRole("button");
        await button.click();
        await expect(button).toBeEnabled();
    });

    test("should block Enter and Space on a focused loading button", async ({ page }) => {
        await page.goto("/iframe.html?id=components-buttons-button--playground&args=loading:!true");
        const button = page.getByRole("button");
        await expect(button).toHaveClass(/loading/);
        await button.evaluate((element) => {
            const form = document.createElement("form");
            form.id = "loading-button-form";
            form.addEventListener("submit", (event) => {
                event.preventDefault();
                element.setAttribute("data-submitted", "true");
            });
            document.body.append(form);
            element.setAttribute("form", form.id);
            element.setAttribute("type", "submit");
            window.addEventListener("click", (event) => {
                if (event.target === element) {
                    element.setAttribute("data-clicked", "true");
                }
            });
        });

        await button.focus();
        await page.keyboard.press("Enter");
        await page.keyboard.press("Space");

        await expect(button).toBeFocused();
        await expect(button).not.toHaveAttribute("data-clicked");
        await expect(button).not.toHaveAttribute("data-submitted");
    });

    test("should change background color on hover", async ({ page }) => {
        const button = await getButtons(
            page,
            "http://localhost:6006/iframe.html?id=components-buttons-button--default",
        );

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
            "http://localhost:6006/iframe.html?id=components-buttons-button--different-themes",
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
            "http://localhost:6006/iframe.html?id=components-buttons-button--loading",
        );

        const count = await buttons.count();

        for (let i = 0; i < count; i++) {
            const currentButton = buttons.nth(i);
            await expect(currentButton).toBeVisible();
            await expect(currentButton).toHaveCSS("pointer-events", "none");
            await expect(currentButton).toHaveClass(/loading/);

            const loadingDots = currentButton.locator("div");
            await expect(loadingDots).toHaveClass(/loader/);
            await expect(loadingDots).toBeVisible();
        }
    });

    test("should take full width when block prop is set", async ({ page }) => {
        const buttons = await getButtons(
            page,
            "http://localhost:6006/iframe.html?id=components-buttons-button--block-mode",
        );

        const count = await buttons.count();

        for (let i = 0; i < count; i++) {
            const currentButton = buttons.nth(i);
            await expect(currentButton).toBeVisible();
            await expect(currentButton).toHaveCSS("display", "block");
        }
    });
});
