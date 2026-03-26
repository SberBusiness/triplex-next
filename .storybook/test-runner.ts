import { toMatchImageSnapshot } from "jest-image-snapshot";
import type { TestRunnerConfig } from "@storybook/test-runner";
import { waitForPageReady, getStoryContext } from "@storybook/test-runner";

const viewports = [
    { name: "xs", width: 575 },
    { name: "xl", width: 1200 },
] as const;

const config: TestRunnerConfig = {
    setup() {
        expect.extend({ toMatchImageSnapshot });
    },

    async postVisit(page, context) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await page.waitForFunction(() => typeof (globalThis as any).__getContext === "function", { timeout: 10000 });
        const storyContext = await getStoryContext(page, context);

        if (storyContext.parameters?.testRunner?.skip) {
            return;
        }

        await page.addStyleTag({
            content: "* { caret-color: transparent !important; }",
        });

        for (const viewport of viewports) {
            await page.setViewportSize({ width: viewport.width, height: 768 });
            await waitForPageReady(page);

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
