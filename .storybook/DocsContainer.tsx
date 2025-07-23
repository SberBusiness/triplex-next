import React from "react";
import { DocsContainer as BaseContainer, DocsContainerProps } from "@storybook/addon-docs/blocks";
import { themes } from "storybook/theming";

const DocsContainer = (props: DocsContainerProps) => {
    const isDark = props.context.store.userGlobals.globals.theme === "dark";
    const selectedTheme = isDark ? themes.dark : themes.light;

    return <BaseContainer {...props} theme={selectedTheme} />;
};

export default DocsContainer;