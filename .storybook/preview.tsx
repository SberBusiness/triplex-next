import { themes } from "@storybook/theming";
import type { Preview } from "@storybook/react";
import { ThemeProvider, ETriplexNextTheme } from "../src/components/ThemeProvider";
import { useDarkMode } from "storybook-dark-mode";
import DocsContainer from "./DocsContainer";

const preview: Preview = {
    parameters: {
        darkMode: {
            dark: { ...themes.dark, appContentBg: "#181819" },
            light: { ...themes.normal, appContentBg: "#FFFFFF" },
        },
        backgrounds: { disabled: true },
        docs: {
            container: DocsContainer,
        },
    },
    decorators: [
        (Story) => {
            return (
                <ThemeProvider theme={useDarkMode() ? ETriplexNextTheme.DARK : ETriplexNextTheme.LIGHT}>
                    <Story />
                </ThemeProvider>
            );
        },
    ],
};

export default preview;
