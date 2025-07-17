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
    },
    decorators: [
        (Story) => {
			const scopeRef = React.useRef<HTMLDivElement>(null);

            return (
				<div ref={scopeRef}>
					<ThemeProvider theme={useDarkMode() ? ETriplexNextTheme.DARK : ETriplexNextTheme.LIGHT} scopeRef={scopeRef}>
						<Story />
					</ThemeProvider>
				</div>
            );
        },
    ],
};

export default preview;
