import type { Preview } from "@storybook/react";
import { ThemeProvider, ETriplexNextTheme } from "../src/components/ThemeProvider";
import React from "react";
import { withThemeByClassName } from "@storybook/addon-themes";
import "./storybook.css";
import DocsContainer from "./DocsContainer";

const preview: Preview = {
    parameters: {
        backgrounds: { disabled: true },
        docs: {
            container: DocsContainer,
        },
        options: {
            storySort: (a, b) => a.title.localeCompare(b.title),
        },
    },
    decorators: [
        (Story, context) => {
            const scopeRef = React.useRef<HTMLDivElement>(null);

            const isDark = context.globals.theme === "dark";

            return (
                <span
                    ref={scopeRef}
                    style={{
                        display: "inline-block",
                    }}
                >
                    <ThemeProvider
                        theme={isDark ? ETriplexNextTheme.DARK : ETriplexNextTheme.LIGHT}
                        scopeRef={scopeRef}
                    >
                        <Story />
                    </ThemeProvider>
                </span>
            );
        },
        withThemeByClassName({
            themes: {
                light: "theme-light",
                dark: "theme-dark",
            },
            defaultTheme: "light",
        }),
    ],
};

export default preview;