import { StorybookConfig } from "@storybook/react-vite";
import { version } from "../package.json";
import { resolve } from "node:path";
import generateScopedName from "../scripts/generate-scoped-name";

const config: StorybookConfig = {
    stories: ["../stories/**/*.stories.@(ts|tsx|mdx)", "../stories/**/*.mdx"],
    addons: ["@storybook/addon-themes", "@storybook/addon-docs"],
    framework: {
        name: "@storybook/react-vite",
        options: {},
    },
    core: {
        disableTelemetry: true,
    },
    viteFinal: async (viteConfig) => {
        // Настройки CSS модулей для Storybook
        viteConfig.css = {
            modules: {
                generateScopedName,
            },
        };

        // Алиас для разрешения импортов
        viteConfig.resolve = {
            ...viteConfig.resolve,
            alias: {
                ...viteConfig.resolve?.alias,
                "@sberbusiness/triplex-next": resolve(__dirname, "../src/index.ts"),
            },
        };

        viteConfig.define = {
            "process.env.npm_package_version": JSON.stringify(version),
        };

        return viteConfig;
    },
    staticDirs: ["../public"],
};

export default config;
