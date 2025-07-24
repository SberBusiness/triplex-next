import React from "react";
import type { StoryObj } from "@storybook/react";
import { DesignTokensVisualizer } from "./utils/DesignTokensVisualizer";

export default {
    title: "Design Tokens",
    component: DesignTokensVisualizer,
};

export const Core: StoryObj<typeof DesignTokensVisualizer> = {
    render: () => <DesignTokensVisualizer />,
};
