import type { StorybookConfig } from "@storybook/react-vite";
import { version } from "../package.json";
import { withoutVitePlugins } from "@storybook/builder-vite";
import generateScopedName from "../scripts/generate-scoped-name";

const config: StorybookConfig = {
    addons: ["@storybook/addon-docs", "@storybook/addon-themes"],
    framework: {
        name: "@storybook/react-vite",
        options: {},
    },
    stories: ["../stories/**/*.stories.@(ts|tsx|mdx)", "../stories/**/*.mdx"],
    typescript: {
        reactDocgen: "react-docgen-typescript",
        reactDocgenTypescriptOptions: {
            shouldExtractLiteralValuesFromEnum: false,
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
        };

        // Версия пакета для доков/демо
        viteConfig.define = {
            ...(viteConfig.define ?? {}),
            "process.env.npm_package_version": JSON.stringify(version),
        };

        viteConfig.plugins = await withoutVitePlugins(viteConfig.plugins, ["vite:dts"]);

        return viteConfig;
    },
};

export default config;
