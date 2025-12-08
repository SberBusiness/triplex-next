import React, { useState } from "react";
import { StoryObj } from "@storybook/react";
import { ChipMultiselect } from "../../src/components/Chip/ChipMultiselect";
import { EChipSize } from "../../src/components/Chip/enums";

export default {
    title: "Components/Chips/ChipMultiselect",
    component: ChipMultiselect,
    tags: ["autodocs"],
};

export const Playground: StoryObj<typeof ChipMultiselect> = {
    render: (args) => {
        const [count, setCount] = useState(0);

        return (
            <ChipMultiselect
                {...args}
                selected={count > 0}
                onClick={() => setCount((c) => c + 1)}
                clearSelected={() => setCount(0)}
            >
                {count > 0 ? count : undefined}
            </ChipMultiselect>
        );
    },
    args: {
        size: EChipSize.MD,
        disabled: false,
    },
    argTypes: {
        size: { control: { type: "inline-radio" }, options: Object.values(EChipSize) },
        disabled: { control: { type: "boolean" } },
        className: { control: { type: "text" } },
        clearSelected: { control: false },
        children: { control: { type: "text" } },
    },
};
