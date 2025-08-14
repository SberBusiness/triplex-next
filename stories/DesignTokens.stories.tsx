import React from "react";
import type { StoryObj } from "@storybook/react";
import { DesignTokensVisualizer } from "./utils/DesignTokensVisualizer";

export default {
    title: "Design Tokens/Core",
    component: DesignTokensVisualizer,
};

export const Color: StoryObj<typeof DesignTokensVisualizer> = {
    name: "Color",
    render: () => <DesignTokensVisualizer />,
};
