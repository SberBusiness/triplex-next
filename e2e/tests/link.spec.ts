import { test, expect } from "@playwright/test";

test.describe("Link", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("http://localhost:6006/iframe.html?id=components-link--default");
    });

    test("should render with default props", async ({ page }) => {
        const link = page.getByRole("link");

        await expect(link).toBeVisible();
        await expect(link).toContainText("Link text");
        await expect(link).toHaveAttribute("role", "link");
    });

    test("should be clickable and navigate to href", async ({ page }) => {
        const link = page.getByRole("link");

        await expect(link).toBeVisible();
        await expect(link).toHaveAttribute("href", "#");

        await link.click();

        await expect(link).toBeVisible();
    });

    test("should support keyboard navigation", async ({ page }) => {
        const link = page.getByRole("link");

        await link.focus();
        await expect(link).toBeFocused();

        await link.press("Enter");
        await expect(link).toBeVisible();

        await link.press(" ");
        await expect(link).toBeVisible();
    });

    test("should render external link with contentAfter", async ({ page }) => {
        await page.goto("http://localhost:6006/iframe.html?id=components-link--external-link");

        const externalLinkWithAfter = page.getByRole("link").first();
        await expect(externalLinkWithAfter).toBeVisible();

        const svgIcon = externalLinkWithAfter.locator("svg");
        await expect(svgIcon).toBeVisible();
    });

    test("should render external link with contentBefore", async ({ page }) => {
        await page.goto("http://localhost:6006/iframe.html?id=components-link--external-link");

        const externalLinkWithBefore = page.getByRole("link").nth(1);
        await expect(externalLinkWithBefore).toBeVisible();

        const svgIcon = externalLinkWithBefore.locator("svg");
        await expect(svgIcon).toBeVisible();
    });
});
