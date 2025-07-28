import React from "react";
import { Gap } from "../src";
import { StoryObj } from "@storybook/react";

export default {
    title: "Components/Gap",
    component: Gap,
    tags: ["autodocs"],
    argTypes: {
        size: {
            control: { type: "select" },
            options: [4, 8, 12, 16, 24, 32, 64, 128],
        },
    },
};

export const Default: StoryObj<typeof Gap> = {
    name: "Default",
    args: {
        size: 4,
    },
    render: (args) => (
        <div>
            <div style={{ backgroundColor: "#e0e0e0" }}>
                Sample Text Above
            </div>
            <Gap size={args.size} />
            <div style={{ backgroundColor: "#e0e0e0" }}>
                Sample Text Below
            </div>
        </div>
    ),
};
