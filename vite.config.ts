import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { resolve, relative, extname } from "node:path";
import { fileURLToPath } from "node:url";
import { globSync } from "glob";
import generateScopedName from "./scripts/generate-scoped-name";
import replaceDesignTokenVersionPlugin from "./scripts/replaceDesignTokenVersion";
import writeCommonCssBundlesPlugin from "./scripts/writeCommonCssBundles";
import { version } from "./package.json";

const PEERS = [/^react(\/.*)?$/, /^react-dom(\/.*)?$/, /^react\/jsx-runtime$/, /^@sberbusiness\/icons-next(\/.*)?$/];

export default defineConfig({
    plugins: [
        react(),
        dts({
            entryRoot: "src",
            outDir: "dist",
            rollupTypes: true,
            exclude: ["**/*.test.{ts,tsx}"],
        }),
        replaceDesignTokenVersionPlugin(),
    ],

    css: {
        modules: {
            generateScopedName,
        },
    },

    resolve: {
        alias: {
            // только для времени сборки
            "@sberbusiness/triplex-next": resolve(__dirname, "src"),
        },
    },

    define: {
        "process.env.npm_package_version": JSON.stringify(version),
        // Защита от случайных process.env.* (чтобы не вшивать весь объект окружения)
        "process.env": {},
    },

    build: {
        lib: {
            entry: resolve(__dirname, "src/index.ts"),
            formats: ["es"],
        },
        sourcemap: true,

        rollupOptions: {
            // делаем entry для всех исходников, кроме .d.ts и тестов
            input: Object.fromEntries(
                globSync("src/**/*.{ts,tsx}", {
                    ignore: ["src/**/*.d.ts", "src/**/*.test.{ts,tsx}"],
                }).map((file) => [
                    // src/foo/bar.tsx -> foo/bar
                    relative("src", file.slice(0, file.length - extname(file).length)),
                    fileURLToPath(new URL(file, import.meta.url)),
                ]),
            ),

            // НЕ бандлим peer deps
            external: PEERS,

            output: {
                format: "es",
                // собираем (не preserveModules), чтобы можно было шарить vendor
                // общий JS из node_modules в один чанк "vendor"
                manualChunks(id) {
                    if (id.includes("node_modules")) return "vendor";
                },
                // имена файлов
                entryFileNames: "[name].js",
                chunkFileNames: "chunks/[name]-[hash].js",
                assetFileNames: (assetInfo) => {
                    const name = assetInfo.name ?? "";
                    if (name.endsWith(".css")) return "styles/[name][extname]";
                    return "assets/[name]-[hash][extname]";
                },
            },

            // пусть Rollup нормальненько трясёт дерево — это уменьшит вес
            treeshake: {
                moduleSideEffects: "no-external",
            },

            plugins: [writeCommonCssBundlesPlugin()],
        },
    },
});
