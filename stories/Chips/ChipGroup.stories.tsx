import React, { useState } from "react";
import { StoryObj } from "@storybook/react";
import { Chip } from "../../src/components/Chip/Chip";
import { ChipGroup } from "../../src/components/ChipGroup/ChipGroup";
import { EComponentSize } from "../../src/enums/EComponentSize";
import { Title, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";

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

export const Playground: StoryObj<typeof ChipGroup> = {
    name: "Playground",
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
        size: { control: { type: "inline-radio" }, options: Object.values(EComponentSize) },
    },
    parameters: {
        controls: {
            include: ["oneLine", "size"],
        },
    },
};

export const Default: StoryObj<typeof ChipGroup> = {
    name: "Default",
    parameters: {
        controls: { disable: true },
    },
    render: () => {
        const [selected, setSelected] = useState<number | null>(null);
        const chips = ["Alpha", "Beta", "Gamma", "Delta"];

        return (
            <ChipGroup style={{ maxWidth: 360 }}>
                {chips.map((label, index) => (
                    <Chip key={label} selected={selected === index} onClick={() => setSelected(index)}>
                        {label}
                    </Chip>
                ))}
            </ChipGroup>
        );
    },
};

export const OneLineScrollable: StoryObj<typeof ChipGroup> = {
    name: "One Line Scrollable",
    parameters: {
        controls: { disable: true },
    },
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
