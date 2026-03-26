import { toMatchImageSnapshot } from "jest-image-snapshot";
import type { TestRunnerConfig } from "@storybook/test-runner";
import type { Page } from "playwright";
import { getStoryContext } from "@storybook/test-runner";

/**
 * Viewport'ы для визуальных скриншотов.
 * Каждая стори снимается на двух размерах — мобильном (XS) и десктопном (XL).
 */
const viewports = [
    { name: "xs", width: 575 },
    { name: "xl", width: 1200 },
] as const;

/**
 * Перемонтирует стори через внутренний канал Storybook и ждёт стабилизации DOM.
 *
 * Зачем: после смены viewport через setViewportSize() событие resize закрывает
 * dropdown'ы и popup'ы, открытые play-функцией. Простой page.reload() не подходит —
 * он уничтожает контекст test-runner'а (__test). forceRemount перемонтирует
 * компонент внутри iframe без перезагрузки страницы: play-функция выполняется
 * заново, а контекст test-runner'а сохраняется.
 *
 * Порядок:
 * 1. Emit "forceRemount" → Storybook перемонтирует компонент
 * 2. Ждём "storyRendered" → компонент отрисован, play-функция начала выполнение
 * 3. MutationObserver ждёт 500ms тишины DOM → play-функция завершена, анимации отыграли
 * 4. Fallback 10s на случай если storyRendered не придёт
 */
const remountAndSettle = async (page: Page, storyId: string) => {
    await page.evaluate((id: string) => {
        return new Promise<void>((resolve) => {
            const fallback = setTimeout(resolve, 10000);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const channel = (window as any).__STORYBOOK_ADDONS_CHANNEL__;

            channel.once("storyRendered", () => {
                let settled: ReturnType<typeof setTimeout>;

                const done = () => {
                    clearTimeout(fallback);
                    observer.disconnect();
                    resolve();
                };

                const observer = new MutationObserver(() => {
                    clearTimeout(settled);
                    settled = setTimeout(done, 500);
                });

                observer.observe(document.body, {
                    childList: true,
                    subtree: true,
                    attributes: true,
                });

                settled = setTimeout(done, 500);
            });

            channel.emit("forceRemount", { storyId: id });
        });
    }, storyId);
};

const config: TestRunnerConfig = {
    setup() {
        expect.extend({ toMatchImageSnapshot });
    },

    /**
     * Хук вызывается после того, как test-runner отрисовал стори и выполнил play-функцию.
     * Для каждого viewport: перемонтирует стори → ждёт стабилизации → делает скриншот.
     */
    async postVisit(page, context) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await page.waitForFunction(() => typeof (globalThis as any).__getContext === "function", { timeout: 10000 });
        const storyContext = await getStoryContext(page, context);

        if (storyContext.parameters?.testRunner?.skip) {
            return;
        }

        for (const viewport of viewports) {
            await page.setViewportSize({ width: viewport.width, height: 768 });
            await remountAndSettle(page, context.id);

            // Скрываем каретку в input'ах — мигающий курсор делает скриншоты нестабильными.
            // addStyleTag вызывается в каждой итерации, т.к. forceRemount сбрасывает injected-стили.
            await page.addStyleTag({
                content: "* { caret-color: transparent !important; }",
            });

            const screenshot = await page.screenshot();

            // Storybook prefixes story IDs with "components-" (e.g. "components-daterange--playground"), strip it for cleaner filenames
            const snapshotId = context.id.replace(/^components-/, "");

            expect(screenshot).toMatchImageSnapshot({
                customSnapshotIdentifier: `${snapshotId}--${viewport.name}`,
                customSnapshotsDir: "__screenshots__",
                customDiffDir: "__screenshots__/__diff__",
                failureThreshold: 10,
                failureThresholdType: "pixel",
            });
        }
    },
};

export default config;
