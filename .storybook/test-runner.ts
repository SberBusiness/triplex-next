import { TestRunnerConfig, waitForPageReady } from "@storybook/test-runner";
import { toMatchImageSnapshot } from "jest-image-snapshot";

const customSnapshotsDir = `${process.cwd()}/__snapshots__`;

const config: TestRunnerConfig = {
    setup() {
        expect.extend({ toMatchImageSnapshot });
    },
    async preVisit(page) {
        page.setDefaultTimeout(60000);
    },
    async postVisit(page, context) {
        // Waits for the page to be ready before taking a screenshot to ensure consistent results
        await waitForPageReady(page);

        const image = await page.screenshot();
        expect(image).toMatchImageSnapshot({
            customSnapshotsDir,
            customSnapshotIdentifier: context.id,
            blur: 1, // Игнорировать анти-алиасинг
        });
    },
};

export default config;
