import { themes } from "@storybook/theming";
import type { Preview } from "@storybook/react";
import { ThemeProvider, ETriplexNextTheme } from "../src/components/ThemeProvider";
import { useDarkMode } from "storybook-dark-mode";
import DocsContainer from "./DocsContainer";
import React from "react";

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
        options: {
            storySort: (a, b) => a.title.localeCompare(b.title),
        },
    },
    decorators: [
        (Story) => {
			const scopeRef = React.useRef<HTMLDivElement>(null);

            return (
				// По этому селектору будет искаться элемент для скриншота, поэтому inline-block, чтобы был скриншот по ширине дочернего элемента.
				// color считается в js, так как css переменные не отрабатывают при смене темы. Значения цветов взяты из цветов storybook.
				<span ref={scopeRef} style={{ color: useDarkMode() ? 'rgb(201, 205, 207)' : 'rgb(46, 52, 56)', display: "inline-block" }}>
					<ThemeProvider theme={useDarkMode() ? ETriplexNextTheme.DARK : ETriplexNextTheme.LIGHT} scopeRef={scopeRef}>
						<Story />
					</ThemeProvider>
				</span>
            );
        },
    ],
};

export default preview;
