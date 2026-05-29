import { test, expect } from "../fixtures";

test.describe("ImageGallery", () => {
    test.describe("Default (desktop)", () => {
        test.beforeEach(async ({ page }) => {
            await page.goto("http://localhost:6006/iframe.html?id=components-imagegallery--default");
        });

        test("click on a thumbnail switches the main image", async ({ page }) => {
            // Крупная картинка — единственный <img> с alt; миниатюры рендерятся с alt="".
            const mainImage = page.getByRole("img");
            // Миниатюры — кнопки с aria-label вида "Photo N" (на десктопе вместо тиков).
            const thumbs = page.getByRole("button", { name: /^Photo \d+$/ });

            await expect(mainImage).toHaveAttribute("alt", "Photo 1");

            await thumbs.nth(4).click();
            await expect(mainImage).toHaveAttribute("alt", "Photo 5");
            await expect(thumbs.nth(4)).toHaveAttribute("aria-current", "true");
        });

        test("ArrowRight on the focused container switches the main image", async ({ page }) => {
            const mainImage = page.getByRole("img");
            await expect(mainImage).toHaveAttribute("alt", "Photo 1");

            // Корневой контейнер галереи — ближайший фокусируемый предок крупной картинки.
            await mainImage.locator('xpath=ancestor::*[@tabindex="0"]').focus();
            await page.keyboard.press("ArrowRight");

            await expect(mainImage).toHaveAttribute("alt", "Photo 2");
        });

        test("click on next/prev arrows switches the main image", async ({ page }) => {
            const mainImage = page.getByRole("img");
            // Стрелки prev/next — кнопки с aria-label, заданным потребителем (см. story Default).
            const prevArrow = page.getByRole("button", { name: "Предыдущее изображение" });
            const nextArrow = page.getByRole("button", { name: "Следующее изображение" });

            await nextArrow.click();
            await expect(mainImage).toHaveAttribute("alt", "Photo 2");

            await prevArrow.click();
            await expect(mainImage).toHaveAttribute("alt", "Photo 1");
        });
    });

    test.describe("Mobile viewport", () => {
        test.use({ viewport: { width: 375, height: 667 }, hasTouch: true });

        test.beforeEach(async ({ page }) => {
            await page.goto("http://localhost:6006/iframe.html?id=components-imagegallery--default");
        });

        test("prev/next arrows are hidden by media-query", async ({ page }) => {
            const arrows = page.getByRole("img").locator("xpath=..").locator("button");

            await expect(arrows.nth(0)).toBeHidden();
            await expect(arrows.nth(1)).toBeHidden();
        });

        test("dots row is visible and click on a tick switches the main image", async ({ page }) => {
            // Тики-индикаторы — кнопки с aria-label вида "Photo N" (на мобильном вместо миниатюр).
            const dots = page.getByRole("button", { name: /^Photo \d+$/ });

            await expect(dots).toHaveCount(4);
            // На мобильном Main — карусельная лента: в DOM окно соседних слайдов (prev/current/next),
            // поэтому активную картинку определяем по её попаданию во вьюпорт (соседи клипаются .main).
            await expect(page.getByRole("img", { name: "Photo 1" })).toBeInViewport();

            // 9 items, bucketSize=2: тик 2 → index 4 → Photo 5
            await dots.nth(2).click();
            await expect(page.getByRole("img", { name: "Photo 5" })).toBeInViewport();
            await expect(dots.nth(2)).toHaveAttribute("aria-current", "true");
        });
    });
});
