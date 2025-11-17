import React, { useState } from "react";
import { StoryObj } from "@storybook/react";
import { Chip } from "../../src/components/Chip/Chip";
import { ChipGroup } from "../../src/components/ChipGroup/ChipGroup";
import { EComponentSize } from "../../src/enums/EComponentSize";

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
                    <Chip key={label} size={args.size} selected={selected === index} onClick={() => setSelected(index)}>
                        {label}
                    </Chip>
                ))}
            </ChipGroup>
        );
    },
    args: { oneLine: false, size: EComponentSize.MD },
    argTypes: {
        oneLine: { control: { type: "boolean" } },
        className: { control: { type: "text" } },
        size: { control: { type: "inline-radio" }, options: Object.values(EComponentSize) },
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
                        size={EComponentSize.MD}
                        selected={selected === index}
                        onClick={() => setSelected(index)}
                    >
                        {label}
                    </Chip>
                ))}
            </ChipGroup>
        );
    },
};
