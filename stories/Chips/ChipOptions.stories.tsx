import React, { useState } from "react";
import { StoryObj } from "@storybook/react";
import { ChipOptions } from "../../src/components/Chip/ChipOptions";
import { EComponentSize } from "../../src/enums/EComponentSize";
import { Title, Description, Controls, Stories } from "@storybook/addon-docs/blocks";

export default {
    title: "Components/Chips/ChipOptions",
    component: ChipOptions,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Chip с иконкой выбора опций.
                `,
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Controls of={Default} />
                    <Stories />
                </>
            ),
        },
    },
};

export const Playground: StoryObj<typeof ChipOptions> = {
    render: (args) => {
        const [count, setCount] = useState(0);

        return (
            <ChipOptions
                {...args}
                selected={count > 0}
                onClick={() => setCount((c) => c + 1)}
                clearSelected={() => setCount(0)}
            >
                {count > 0 ? count : undefined}
            </ChipOptions>
        );
    },
    args: {
        size: EComponentSize.MD,
        disabled: false,
    },
    argTypes: {
        size: { control: { type: "inline-radio" }, options: Object.values(EComponentSize) },
        disabled: { control: { type: "boolean" } },
    },
    parameters: {
        controls: {
            include: ["size", "disabled"],
        },
    },
};

export const Default: StoryObj<typeof ChipOptions> = {
    parameters: {
        controls: { disable: true },
    },
    render: () => {
        const [count, setCount] = useState(0);

        return (
            <ChipOptions selected={count > 0} onClick={() => setCount((c) => c + 1)} clearSelected={() => setCount(0)}>
                {count > 0 ? count : undefined}
            </ChipOptions>
        );
    },
};

export const Sizes: StoryObj<typeof ChipOptions> = {
    parameters: {
        controls: { disable: true },
    },
    render: () => {
        const [countSM, setCountSM] = useState(0);
        const [countMD, setCountMD] = useState(0);
        const [countLG, setCountLG] = useState(0);

        return (
            <div style={{ display: "flex", gap: 12 }}>
                <ChipOptions
                    size={EComponentSize.SM}
                    selected={countSM > 0}
                    onClick={() => setCountSM((c) => c + 1)}
                    clearSelected={() => setCountSM(0)}
                >
                    {countSM > 0 ? countSM : undefined}
                </ChipOptions>
                <ChipOptions
                    size={EComponentSize.MD}
                    selected={countMD > 0}
                    onClick={() => setCountMD((c) => c + 1)}
                    clearSelected={() => setCountMD(0)}
                >
                    {countMD > 0 ? countMD : undefined}
                </ChipOptions>
                <ChipOptions
                    size={EComponentSize.LG}
                    selected={countLG > 0}
                    onClick={() => setCountLG((c) => c + 1)}
                    clearSelected={() => setCountLG(0)}
                >
                    {countLG > 0 ? countLG : undefined}
                </ChipOptions>
            </div>
        );
    },
};
