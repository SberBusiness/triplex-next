import React, { useState } from "react";
import { StoryObj } from "@storybook/react";
import { Chip } from "../../src/components/Chip/Chip";
import { ChipGroup } from "../../src/components/ChipGroup/ChipGroup";
import { EChipSize } from "../../src/components/Chip/enums";

export default {
    title: "Components/Chips/ChipGroup",
    component: ChipGroup,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "Контейнер для Chip. Поддерживает перенос по строкам (multiLine) и однострочный режим (oneLine) со скроллом.",
            },
        },
    },
};

export const Playground: StoryObj<typeof ChipGroup> = {
    render: (args) => {
        const [selected, setSelected] = useState<number | null>(null);
        const chips = ["Alpha", "Beta", "Gamma", "Delta", "Epsilon", "Zeta", "Eta", "Theta"];

        return (
            <ChipGroup {...args} style={{ maxWidth: 360 }}>
                {chips.map((label, index) => (
                    <Chip
                        key={label}
                        size={EChipSize.MD}
                        selected={selected === index}
                        onClick={() => setSelected(index)}
                        style={{ marginRight: 8, marginBottom: 8 }}
                    >
                        {label}
                    </Chip>
                ))}
            </ChipGroup>
        );
    },
    args: { oneLine: false },
    argTypes: {
        oneLine: { control: { type: "boolean" } },
        className: { control: { type: "text" } },
    },
};

export const OneLineScrollable: StoryObj<typeof ChipGroup> = {
    render: () => {
        const [selected, setSelected] = useState<number | null>(null);
        const chips = Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`);
        return (
            <ChipGroup oneLine style={{ maxWidth: 360, whiteSpace: "nowrap", overflowX: "auto" }}>
                {chips.map((label, index) => (
                    <Chip
                        key={label}
                        size={EChipSize.MD}
                        selected={selected === index}
                        onClick={() => setSelected(index)}
                        style={{ marginRight: 8 }}
                    >
                        {label}
                    </Chip>
                ))}
            </ChipGroup>
        );
    },
};
