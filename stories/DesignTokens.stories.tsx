import React from "react";
import type { StoryObj } from "@storybook/react";
import { DesignTokensVisualizer } from "../src/components/DesignTokens/DesignTokensVisualizer";

export default {
    title: "Design Tokens/Colors",
    component: DesignTokensVisualizer,
};

export const Colors: StoryObj<typeof DesignTokensVisualizer> = {
    render: () => <DesignTokensVisualizer />,
};
