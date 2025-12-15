import React, { useState } from "react";
import { StoryObj } from "@storybook/react";
import { ChipIcon } from "../../src/components/Chip/ChipIcon";
import { EComponentSize } from "../../src/enums/EComponentSize";
import { DefaulticonStrokePrdIcon24 } from "@sberbusiness/icons-next";
import { Title, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";

export default {
    title: "Components/Chips/ChipIcon",
    component: ChipIcon,
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

export const Playground: StoryObj<typeof ChipIcon> = {
    name: "Playground",
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
    },
    parameters: {
        controls: {
            include: ["size", "disabled"],
        },
    },
};

export const Default: StoryObj<typeof ChipIcon> = {
    name: "Default",
    parameters: {
        controls: { disable: true },
    },
    render: () => {
        const [selected, setSelected] = useState(false);
        return (
            <ChipIcon selected={selected} onClick={() => setSelected((s) => !s)}>
                <DefaulticonStrokePrdIcon24 paletteIndex={selected ? 6 : 5} />
            </ChipIcon>
        );
    },
};
