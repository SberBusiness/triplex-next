import React, { useState } from "react";
import { StoryObj } from "@storybook/react";
import { Chip } from "../../src/components/Chip/Chip";
import { EComponentSize } from "../../src/enums/EComponentSize";

export default {
    title: "Components/Chips/Chip",
    component: Chip,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: "Клик‑чип с поддержкой состояний selected/disabled, префикса и постфикса.",
            },
        },
    },
};

export const Playground: StoryObj<typeof Chip> = {
    render: (args) => {
        const [selected, setSelected] = useState(false);
        const handleClick = () => setSelected((s) => !s);
        return (
            <Chip {...args} selected={selected} onClick={handleClick}>
                Chip text
            </Chip>
        );
    },
    args: {
        size: EComponentSize.MD,
        disabled: false,
        prefix: undefined,
        postfix: undefined,
    },
    argTypes: {
        size: { control: { type: "inline-radio" }, options: Object.values(EComponentSize) },
        disabled: { control: { type: "boolean" } },
        prefix: { control: { type: "text" } },
        postfix: { control: { type: "text" } },
        selected: { control: false },
        className: { control: { type: "text" } },
    },
};

export const Sizes: StoryObj<typeof Chip> = {
    render: () => {
        const [selected, setSelected] = useState(false);
        const handleClick = () => setSelected((s) => !s);
        return (
            <div style={{ display: "flex", gap: 12 }}>
                <Chip size={EComponentSize.SM} selected={selected} onClick={handleClick}>
                    SM
                </Chip>
                <Chip size={EComponentSize.MD} selected={selected} onClick={handleClick}>
                    MD
                </Chip>
                <Chip size={EComponentSize.LG} selected={selected} onClick={handleClick}>
                    LG
                </Chip>
            </div>
        );
    },
};

export const States: StoryObj<typeof Chip> = {
    render: () => (
        <div style={{ display: "flex", gap: 12 }}>
            <Chip>Default</Chip>
            <Chip selected>Selected</Chip>
            <Chip disabled>Disabled</Chip>
        </div>
    ),
};
