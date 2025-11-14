import React, { useState } from "react";
import { StoryObj } from "@storybook/react";
import { ChipIcon } from "../../src/components/Chip/ChipIcon";
import { EComponentSize } from "../../src/enums/EComponentSize";
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
        size: EComponentSize.MD,
        disabled: false,
    },
    argTypes: {
        size: { control: { type: "inline-radio" }, options: Object.values(EComponentSize) },
        disabled: { control: { type: "boolean" } },
        selected: { control: false },
        className: { control: { type: "text" } },
        children: { control: false },
    },
};
