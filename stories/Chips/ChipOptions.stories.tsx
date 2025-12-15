import React, { useState } from "react";
import { StoryObj } from "@storybook/react";
import { ChipOptions } from "../../src/components/Chip/ChipOptions";
import { EComponentSize } from "../../src/enums/EComponentSize";
import { Title, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";

export default {
    title: "Components/Chips/ChipOptions",
    component: ChipOptions,
    tags: ["autodocs"],
    parameters: {
        docs: {
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Controls of={Default} />
                    <Primary />
                    <Stories />
                </>
            ),
        },
    },
};

export const Playground: StoryObj<typeof ChipOptions> = {
    name: "Playground",
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
    name: "Default",
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
