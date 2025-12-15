import React from "react";
import type { StoryObj } from "@storybook/react";
import { Controls, Description, Primary, Stories, Subtitle, Title } from "@storybook/addon-docs/blocks";
import { DesignTokensVisualizer } from "./utils/DesignTokensVisualizer";

export default {
    title: "Design Tokens/Core",
    component: DesignTokensVisualizer,
    parameters: {
        docs: {
            page: () => (
                <>
                    <Title />
                    <Subtitle />
                    <Description />
                    <Primary />
                    <Controls of={Color} />
                    <Stories />
                </>
            ),
        },
    },
};

export const Color: StoryObj<typeof DesignTokensVisualizer> = {
    name: "Color",
    render: () => <DesignTokensVisualizer />,
    parameters: {
        controls: { disable: true },
    },
};
