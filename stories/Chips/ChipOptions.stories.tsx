import React, { useState } from "react";
import { StoryObj } from "@storybook/react";
import { ChipOptions } from "../../src/components/Chip/ChipOptions";
import { EComponentSize } from "../../src/enums/EComponentSize";

export default {
    title: "Components/Chips/ChipOptions",
    component: ChipOptions,
    tags: ["autodocs"],
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
        className: { control: { type: "text" } },
        clearSelected: { control: false },
        children: { control: { type: "text" } },
    },
};
