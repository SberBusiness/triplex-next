import { test, expect } from "../fixtures";

test.describe("ImageGallery", () => {
    test.describe("Default (desktop)", () => {
        test.beforeEach(async ({ page }) => {
            await page.goto("http://localhost:6006/iframe.html?id=components-imagegallery--default");
        });

        test("click on a thumbnail switches the main image", async ({ page }) => {
            const mainImage = page.getByTestId("image-gallery-main-image");
            const thumbs = page.getByTestId("image-gallery-thumb");

            await expect(mainImage).toHaveAttribute("alt", "Photo 1");

            await thumbs.nth(4).click();
            await expect(mainImage).toHaveAttribute("alt", "Photo 5");
            await expect(thumbs.nth(4)).toHaveAttribute("aria-selected", "true");
        });

        test("ArrowRight on the focused container switches the main image", async ({ page }) => {
            const mainImage = page.getByTestId("image-gallery-main-image");
            await expect(mainImage).toHaveAttribute("alt", "Photo 1");

            await page.getByTestId("image-gallery-root").focus();
            await page.keyboard.press("ArrowRight");

            await expect(mainImage).toHaveAttribute("alt", "Photo 2");
        });

        test("click on next/prev arrows switches the main image", async ({ page }) => {
            const mainImage = page.getByTestId("image-gallery-main-image");

            await page.getByTestId("image-gallery-arrow-next").click();
            await expect(mainImage).toHaveAttribute("alt", "Photo 2");

            await page.getByTestId("image-gallery-arrow-prev").click();
            await expect(mainImage).toHaveAttribute("alt", "Photo 1");
        });
    });

    test.describe("Mobile viewport", () => {
        test.use({ viewport: { width: 375, height: 667 }, hasTouch: true });

        test.beforeEach(async ({ page }) => {
            await page.goto("http://localhost:6006/iframe.html?id=components-imagegallery--default");
        });

        test("prev/next arrows are hidden by media-query", async ({ page }) => {
            const prev = page.getByTestId("image-gallery-arrow-prev");
            const next = page.getByTestId("image-gallery-arrow-next");

            await expect(prev).toBeHidden();
            await expect(next).toBeHidden();
        });

        test("dots row is visible and click on a tick switches the main image", async ({ page }) => {
            const mainImage = page.getByTestId("image-gallery-main-image");
            const dots = page.getByTestId("image-gallery-dot");

            await expect(dots).toHaveCount(4);
            await expect(mainImage).toHaveAttribute("alt", "Photo 1");

            // 9 items, bucketSize=2: тик 2 → index 4 → Photo 5
            await dots.nth(2).click();
            await expect(mainImage).toHaveAttribute("alt", "Photo 5");
            await expect(dots.nth(2)).toHaveAttribute("aria-selected", "true");
        });
    });
});
