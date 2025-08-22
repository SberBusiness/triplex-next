import type { Preview } from "@storybook/react";
import { ThemeProvider, ETriplexNextTheme } from "../src/components/ThemeProvider";
import { ThemeProvider as ThemeProviderIcons, EIconsTheme } from "@sberbusiness/icons-next";
import React from "react";
import { withThemeByClassName } from "@storybook/addon-themes";
import "./storybook.css";
import DocsContainer from "./DocsContainer";
import "../src/styles/style.less";
import "@sberbusiness/icons-next/styles/icons.css";

const customViewports = {
    XS: {
        name: "XS",
        styles: {
            width: "575px",
            height: "1024px",
        },
    },
    SM: {
        name: "SM",
        styles: {
            width: "576px",
            height: "1024px",
        },
    },
    MD: {
        name: "MD",
        styles: {
            width: "768px",
            height: "1024px",
        },
    },
    LG: {
        name: "LG",
        styles: {
            width: "992px",
            height: "1024px",
        },
    },
    XL: {
        name: "XL",
        styles: {
            width: "1200px",
            height: "1024px",
        },
    },
};

const preview: Preview = {
    parameters: {
        backgrounds: { disabled: true },
        docs: {
            container: DocsContainer,
        },
        options: {
            storySort: (a, b) => a.title.localeCompare(b.title),
            showPanel: true,
        },
        viewport: {
            options: {
                ...customViewports,
            },
        },
    },
    decorators: [
        (Story, context) => {
            const scopeRef = React.useRef<HTMLDivElement>(null);

            const isDark = context.globals.theme === "dark";

            return (
                <div ref={scopeRef}>
                    <ThemeProvider
                        theme={isDark ? ETriplexNextTheme.DARK : ETriplexNextTheme.LIGHT}
                        scopeRef={scopeRef}
                    >
                        {/* @ts-ignore */}
                        <ThemeProviderIcons theme={isDark ? EIconsTheme.DARK : EIconsTheme.LIGHT}>
                            <Story />
                        </ThemeProviderIcons>
                    </ThemeProvider>
                </div>
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
