import { toMatchImageSnapshot } from "jest-image-snapshot";
import type { TestRunnerConfig } from "@storybook/test-runner";
import { waitForPageReady, getStoryContext } from "@storybook/test-runner";

const viewports = [
    { name: "xs", width: 575 },
    { name: "xl", width: 1200 },
] as const;

const selectedViewport = process.env.TEST_RUNNER_VIEWPORT ?? "xs";
const viewport = viewports.find((v) => v.name === selectedViewport) ?? viewports[0];

const config: TestRunnerConfig = {
    setup() {
        expect.extend({ toMatchImageSnapshot });
    },

    async preVisit(page) {
        await page.setViewportSize({ width: viewport.width, height: 768 });
    },

    async postVisit(page, context) {
        const storyContext = await getStoryContext(page, context);

        if (storyContext.parameters?.testRunner?.skip) {
            return;
        }

        await waitForPageReady(page);

        const screenshot = await page.screenshot();

        expect(screenshot).toMatchImageSnapshot({
            customSnapshotIdentifier: `${context.id}--${viewport.name}`,
            customSnapshotsDir: "__screenshots__",
            customDiffDir: "__screenshots__/__diff__",
            failureThreshold: 10,
            failureThresholdType: "pixel",
        });
    },
};

export default config;
