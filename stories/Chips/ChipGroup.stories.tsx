import React, { useState } from "react";
import { StoryObj } from "@storybook/react";
import { Chip } from "../../src/components/Chip/Chip";
import { ChipGroup } from "../../src/components/ChipGroup/ChipGroup";
import { EComponentSize } from "../../src/enums/EComponentSize";
import { Title, Description, Controls, Stories } from "@storybook/addon-docs/blocks";

export default {
    title: "Components/Chips/ChipGroup",
    component: ChipGroup,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `Контейнер для группировки нескольких компонентов Chip.

## Особенности:
- **Режим отображения**: oneLine (однострочный с горизонтальным скроллом), multiLine (перенос по строкам)
- **Размеры**: sm, md, lg
                    `,
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Controls of={Default} />
                    <Stories />
                </>
            ),
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
        size: { control: { type: "inline-radio" }, options: Object.values(EComponentSize) },
    },
    parameters: {
        controls: {
            include: ["oneLine", "size"],
        },
    },
};

export const Default: StoryObj<typeof ChipGroup> = {
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

export const Sizes: StoryObj<typeof ChipGroup> = {
    parameters: {
        controls: { disable: true },
    },
    render: () => {
        const [selectedSM, setSelectedSM] = useState<number | null>(null);
        const [selectedMD, setSelectedMD] = useState<number | null>(null);
        const [selectedLG, setSelectedLG] = useState<number | null>(null);

        const chips = ["Alpha", "Beta", "Gamma", "Delta"];

        return (
            <div style={{ display: "flex", gap: 12, flexDirection: "column" }}>
                <ChipGroup size={EComponentSize.SM} style={{ maxWidth: 360 }}>
                    {chips.map((label, index) => (
                        <Chip
                            key={label}
                            size={EComponentSize.SM}
                            selected={selectedSM === index}
                            onClick={() => setSelectedSM(index)}
                        >
                            {label}
                        </Chip>
                    ))}
                </ChipGroup>
                <ChipGroup size={EComponentSize.MD} style={{ maxWidth: 360 }}>
                    {chips.map((label, index) => (
                        <Chip
                            key={label}
                            size={EComponentSize.MD}
                            selected={selectedMD === index}
                            onClick={() => setSelectedMD(index)}
                        >
                            {label}
                        </Chip>
                    ))}
                </ChipGroup>
                <ChipGroup size={EComponentSize.LG} style={{ maxWidth: 360 }}>
                    {chips.map((label, index) => (
                        <Chip
                            key={label}
                            size={EComponentSize.LG}
                            selected={selectedLG === index}
                            onClick={() => setSelectedLG(index)}
                        >
                            {label}
                        </Chip>
                    ))}
                </ChipGroup>
            </div>
        );
    },
};

export const OneLineScrollable: StoryObj<typeof ChipGroup> = {
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
