import { existsSync, readdirSync, readFileSync } from "fs";
import { VISUAL_TEST_VIEWPORTS } from "../.storybook/visualTestViewports";

const SCREENSHOTS_DIR = "__screenshots__";
const INDEX_PATH = "storybook-static/index.json";

type StoryEntry = {
    type: string;
    id: string;
    parameters?: { testRunner?: { skip?: boolean } };
};

function getExpectedSnapshots(entries: Record<string, StoryEntry>): Set<string> {
    const expected = new Set<string>();

    for (const entry of Object.values(entries)) {
        if (entry.type !== "story") continue;
        if (entry.parameters?.testRunner?.skip) continue;

        const snapshotId = entry.id.replace(/^components-/, "");

        for (const viewport of VISUAL_TEST_VIEWPORTS) {
            expected.add(`${snapshotId}--${viewport.name}.png`);
        }
    }

    return expected;
}
function getOrphanScreenshots(): string[] {
    if (!existsSync(INDEX_PATH)) {
        console.error(`❌ ${INDEX_PATH} not found. Run "npm run storybook:build" first.`);
        process.exit(1);
    }

    const index = JSON.parse(readFileSync(INDEX_PATH, "utf8")) as {
        entries: Record<string, StoryEntry>;
    };

    const expected = getExpectedSnapshots(index.entries);

    return readdirSync(SCREENSHOTS_DIR)
        .filter((file) => file.endsWith(".png"))
        .filter((file) => !expected.has(file));
}

const orphans = getOrphanScreenshots();

if (orphans.length === 0) {
    console.log("✅ No orphan screenshots found.");
    process.exit(0);
}

console.error(`❌ Found ${orphans.length} orphan screenshot(s) in ${SCREENSHOTS_DIR}/:\n`);

for (const file of orphans.sort()) {
    console.error(`  - ${file}`);
}

process.exit(1);
