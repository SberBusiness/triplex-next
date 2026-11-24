import { resolve } from "node:path";
import { chromium, expect } from "@playwright/test";
import { build } from "vite";

const [directory, major] = process.argv.slice(2);
const [bundle] = await build({
    root: directory,
    configFile: false,
    esbuild: { jsx: "automatic" },
    define: { "process.env.NODE_ENV": JSON.stringify("production") },
    build: {
        lib: { entry: resolve(directory, "react-consumer.tsx"), name: "Consumer", formats: ["iife"] },
        write: false,
    },
});

const browser = await chromium.launch();
try {
    const page = await browser.newPage();
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.setContent("<!doctype html><html><body></body></html>");
    await page.addScriptTag({ content: bundle.output[0].code });
    await page.getByRole("button", { name: "Open" }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.getByRole("button", { name: "Close" }).click();
    await expect(page.getByRole("dialog")).toHaveCount(0);

    for (const component of ["modal", "picker", "button"]) {
        await expect(page.locator("body")).toHaveAttribute(
            "data-" + component + "-ref",
            major === "19" ? "attach cleanup " : "attach null ",
        );
    }
    expect(errors).toEqual([]);
} finally {
    await browser.close();
}
