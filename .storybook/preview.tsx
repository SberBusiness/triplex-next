import type { Preview } from "@storybook/react";
import { ThemeProvider, ETriplexNextTheme } from "../src/components/ThemeProvider";
import { ThemeProvider as ThemeProviderIcons, EIconsTheme } from "@sberbusiness/icons-next";
import React from "react";
import { withThemeByClassName } from "@storybook/addon-themes";
import DocsContainer from "./DocsContainer";
import "../src/styles/style.less";
import "@sberbusiness/icons-next/styles/icons.css";
import "./storybook.css";

const customViewports = {
    XS: {
        name: "XS",
        styles: {
            width: "575px",
            height: "100%",
        },
    },
    SM: {
        name: "SM",
        styles: {
            width: "576px",
            height: "100%",
        },
    },
    MD: {
        name: "MD",
        styles: {
            width: "768px",
            height: "100%",
        },
    },
    LG: {
        name: "LG",
        styles: {
            width: "992px",
            height: "100%",
        },
    },
    XL: {
        name: "XL",
        styles: {
            width: "1200px",
            height: "100%",
        },
    },
};

const preview: Preview = {
    parameters: {
        backgrounds: {
            options: {
                white: { name: "white", value: "#FFFFFF" },
                // Совпадает с фоном LightBox.
                gray: { name: "gray", value: "#EAEDF1" },
                black: { name: "black", value: "#000000" },
            },
        },
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
