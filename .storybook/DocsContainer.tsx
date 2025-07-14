import React, { useEffect, useState } from "react";
import { DocsContainer as BaseContainer, DocsContainerProps } from "@storybook/addon-docs/blocks";
import { themes } from "@storybook/theming";
import { DARK_MODE_EVENT_NAME } from "storybook-dark-mode";
import { addons } from "@storybook/preview-api";

const channel = addons.getChannel();

const DocsContainer = (props: DocsContainerProps) => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        channel.on(DARK_MODE_EVENT_NAME, setDarkMode);
    }, []);

    return <BaseContainer {...props} theme={darkMode ? themes.dark : themes.light} />;
};

export default DocsContainer;
