import { StorybookConfig } from "@storybook/react-vite";
import { version } from "../package.json";

const config: StorybookConfig = {
    stories: ["../stories/**/*.stories.@(ts|tsx|mdx)", "../stories/**/*.mdx"],
    addons: [
        "@storybook/addon-actions",
        "@storybook/addon-outline",
        "@storybook/addon-viewport",
        "@storybook/addon-controls",
        "@storybook/addon-docs",
        "@storybook/addon-measure",
        "storybook-dark-mode",
    ],
    framework: {
        name: "@storybook/react-vite",
        options: {},
    },
    docs: {
        autodocs: "tag",
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
