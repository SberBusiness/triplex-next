import { defineConfig } from "vite";
import { resolve, relative, extname } from "node:path";
import { globSync } from "glob";
import { fileURLToPath } from "node:url";
import generateScopedName from "./scripts/generate-scoped-name";
import replaceDesignTokenVersionPlugin from "./scripts/replaceDesignTokenVersion";
import writeCommonCssBundlesPlugin from "./scripts/writeCommonCssBundles";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, "src/index.ts"),
            formats: ["es"],
        },
        rollupOptions: {
            input: Object.fromEntries(
                globSync("src/**/*.{ts,tsx}", {
                    ignore: ["src/**/*.d.ts", "src/**/*.test.{ts,tsx}"],
                }).map((file) => [
                    // This removes `src/` as well as the file extension from each
                    // file, so e.g. src/nested/foo.js becomes nested/foo
                    relative("src", file.slice(0, file.length - extname(file).length)),
                    // This expands the relative paths to absolute paths, so e.g.
                    // src/nested/foo becomes /project/src/nested/foo.js
                    fileURLToPath(new URL(file, import.meta.url)),
                ]),
            ),
            output: {
                assetFileNames: "assets/[name][extname]",
                entryFileNames: "[name].js",
            },
            external: ["clsx", "lodash", "react", "react/jsx-runtime", "react-dom", "rc-util"],
            plugins: [writeCommonCssBundlesPlugin()],
        },
    },
    css: {
        modules: {
            generateScopedName,
        },
    },
    resolve: {
        alias: {
            "triplex-next": resolve(__dirname, "src/index.ts"),
        },
    },
    plugins: [react(), dts({ entryRoot: "src", exclude: "**/*.test.{ts,tsx}" }), replaceDesignTokenVersionPlugin()],
});
