import { test as base } from "@playwright/test";

/**
 * Кастомная fixture для e2e-тестов.
 * Переопределяет page.goto, чтобы по умолчанию использовать waitUntil: "networkidle".
 * Это необходимо, потому что Storybook рендерит компоненты асинхронно,
 * и на CI стандартного события "load" недостаточно для ожидания готовности контента.
 */
/* eslint-disable react-hooks/rules-of-hooks -- `use` здесь — callback Playwright, а не React-хук */
export const test = base.extend({
    page: async ({ page }, use) => {
        const originalGoto = page.goto.bind(page);
        page.goto = (url, options) => originalGoto(url, { waitUntil: "networkidle", ...options });
        await use(page);
    },
});

export { expect } from "@playwright/test";
