import { StorybookConfig } from "@storybook/react-vite";
import { version } from "../package.json";

const config: StorybookConfig = {
    stories: ["../stories/**/*.stories.@(ts|tsx)"],
    addons: [
        "@storybook/addon-themes",
        "@storybook/addon-docs",
    ],
    framework: {
        name: "@storybook/react-vite",
        options: {},
    },
    core: {
        disableTelemetry: true,
    },
    viteFinal: async (viteConfig) => {
        viteConfig.define = {
            "process.env.npm_package_version": JSON.stringify(version),
        };
        return viteConfig;
    },
};

export default config;
