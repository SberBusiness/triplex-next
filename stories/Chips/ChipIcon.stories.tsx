import React, { useState } from "react";
import { StoryObj } from "@storybook/react";
import { ChipIcon } from "../../src/components/Chip/ChipIcon";
import { EComponentSize } from "../../src/enums/EComponentSize";
import { DefaulticonStrokePrdIcon24 } from "@sberbusiness/icons-next";
import { Title, Description, Controls, Stories } from "@storybook/addon-docs/blocks";

export default {
    title: "Components/Chips/ChipIcon",
    component: ChipIcon,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `Chip с иконкой.

## Особенности:
- **Размеры**: sm, md, lg
                    `,
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
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
    },
    parameters: {
        controls: {
            include: ["size", "disabled"],
        },
    },
};

export const Default: StoryObj<typeof ChipIcon> = {
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

export const Sizes: StoryObj<typeof ChipIcon> = {
    parameters: {
        controls: { disable: true },
    },
    render: () => {
        const [selectedSM, setSelectedSM] = useState(0);
        const [selectedMD, setSelectedMD] = useState(0);
        const [selectedLG, setSelectedLG] = useState(0);

        return (
            <div style={{ display: "flex", gap: 12 }}>
                <ChipIcon size={EComponentSize.SM} selected={selectedSM} onClick={() => setSelectedSM((s) => !s)}>
                    <DefaulticonStrokePrdIcon24 paletteIndex={selectedSM ? 6 : 5} />
                </ChipIcon>
                <ChipIcon size={EComponentSize.MD} selected={selectedMD} onClick={() => setSelectedMD((s) => !s)}>
                    <DefaulticonStrokePrdIcon24 paletteIndex={selectedMD ? 6 : 5} />
                </ChipIcon>
                <ChipIcon size={EComponentSize.LG} selected={selectedLG} onClick={() => setSelectedLG((s) => !s)}>
                    <DefaulticonStrokePrdIcon24 paletteIndex={selectedLG ? 6 : 5} />
                </ChipIcon>
            </div>
        );
    },
};
