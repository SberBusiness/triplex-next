import { resolve } from "path";
import type { StorybookConfig } from "@storybook/react-vite";
import { withoutVitePlugins } from "@storybook/builder-vite";
import { version } from "../package.json";
import generateScopedName from "../scripts/generate-scoped-name";

const config: StorybookConfig = {
    stories: ["../stories/**/*.stories.@(ts|tsx|mdx)", "../stories/**/*.mdx"],
    addons: ["@storybook/addon-docs", "@storybook/addon-themes"],
    framework: {
        name: "@storybook/react-vite",
        options: {},
    },
    build: {
        test: {
            disableBlocks: true,
            disableDocgen: true,
        },
    },
    core: {
        disableTelemetry: true,
        disableWhatsNewNotifications: true,
    },
    staticDirs: ["../public"],
    viteFinal: async (viteConfig) => {
        // Настройка CSS модулей для стабильных classNames
        viteConfig.css = {
            modules: {
                generateScopedName,
            },
        };

        // Алиас для разрешения импортов из исходников библиотеки
        viteConfig.resolve = {
            ...viteConfig.resolve,
            alias: {
                ...viteConfig.resolve?.alias,
                "@sberbusiness/triplex-next": resolve(__dirname, "../src"),
            },
        };

        // Версия пакета для доков/демо
        viteConfig.define = {
            ...viteConfig.define,
            "process.env.npm_package_version": JSON.stringify(version),
        };

        // Убираем генерацию типов
        viteConfig.plugins = await withoutVitePlugins(viteConfig.plugins, ["vite:dts"]);

        return viteConfig;
    },
};

export default config;
