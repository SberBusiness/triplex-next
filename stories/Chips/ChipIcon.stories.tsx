import React, { useState } from "react";
import { StoryObj } from "@storybook/react";
import { ChipIcon } from "../../src/components/Chip/ChipIcon";
import { EChipSize } from "../../src/components/Chip/enums";
import { DefaulticonStrokePrdIcon24 } from "@sberbusiness/icons-next";

export default {
    title: "Components/Chips/ChipIcon",
    component: ChipIcon,
    tags: ["autodocs"],
};

export const Playground: StoryObj<typeof ChipIcon> = {
    render: (args) => {
        const [selected, setSelected] = useState(false);
        return (
            <ChipIcon {...args} selected={selected} onClick={() => setSelected((s) => !s)}>
                <DefaulticonStrokePrdIcon24 paletteIndex={selected ? 6 : 5} />
            </ChipIcon>
        );
    },
    args: {
        size: EChipSize.MD,
        disabled: false,
    },
    argTypes: {
        size: { control: { type: "inline-radio" }, options: Object.values(EChipSize) },
        disabled: { control: { type: "boolean" } },
        selected: { control: false },
        className: { control: { type: "text" } },
        children: { control: false },
    },
};
