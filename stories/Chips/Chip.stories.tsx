import React, { useState } from "react";
import { StoryObj } from "@storybook/react";
import { Chip } from "../../src/components/Chip/Chip";
import { EComponentSize } from "../../src/enums/EComponentSize";
import { Title, Description, Controls, Stories, ArgTypes, Heading, Primary } from "@storybook/addon-docs/blocks";
import { SortStrokeSrvIcon20 } from "@sberbusiness/icons-next";

export default {
    title: "Components/Chips/Chip",
    component: Chip,
    tags: ["autodocs"],
    parameters: {
        testRunner: { skip: true },
        docs: {
            description: {
                component: `
Компонент предоставляет возможность произвести действие по нажатию, а также отображает выбранное состояние.

## Особенности:

- prefix и postfix можно передать через одноименные свойства.
                `,
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={Chip} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
};

export const Playground: StoryObj<typeof Chip> = {
    tags: ["!autodocs"],
    render: (args) => {
        const [selected, setSelected] = useState(false);
        const handleClick = () => setSelected((s) => !s);
        return (
            <Chip {...args} selected={selected} onClick={handleClick}>
                Value
            </Chip>
        );
    },
    args: {
        size: EComponentSize.MD,
        disabled: false,
    },
    argTypes: {
        size: { control: { type: "select" }, options: Object.values(EComponentSize) },
        disabled: { control: { type: "boolean" } },
    },
    parameters: {
        controls: {
            include: ["size", "disabled"],
        },
        docs: {
            canvas: {
                sourceState: "none",
            },
            codePanel: false,
        },
    },
};

export const Default: StoryObj<typeof Chip> = {
    parameters: {
        controls: { disable: true },
    },
    render: () => {
        const [selected, setSelected] = useState(false);
        return (
            <Chip selected={selected} onClick={() => setSelected((s) => !s)}>
                Value
            </Chip>
        );
    },
};

export const Sizes: StoryObj<typeof Chip> = {
    parameters: {
        controls: { disable: true },
    },
    render: () => {
        const [selectedSM, setSelectedSM] = useState(false);
        const [selectedMD, setSelectedMD] = useState(false);
        const [selectedLG, setSelectedLG] = useState(false);
        const handleClickSM = () => setSelectedSM((s) => !s);
        const handleClickMD = () => setSelectedMD((s) => !s);
        const handleClickLG = () => setSelectedLG((s) => !s);

        return (
            <div style={{ display: "flex", gap: 12 }}>
                <Chip size={EComponentSize.SM} selected={selectedSM} onClick={handleClickSM}>
                    SM
                </Chip>
                <Chip size={EComponentSize.MD} selected={selectedMD} onClick={handleClickMD}>
                    MD
                </Chip>
                <Chip size={EComponentSize.LG} selected={selectedLG} onClick={handleClickLG}>
                    LG
                </Chip>
            </div>
        );
    },
};

export const States: StoryObj<typeof Chip> = {
    parameters: {
        controls: { disable: true },
    },
    render: () => (
        <div style={{ display: "flex", gap: 12 }}>
            <Chip selected>Selected</Chip>
            <Chip disabled>Disabled</Chip>
        </div>
    ),
};

export const WithPrefixAndPostfix: StoryObj<typeof Chip> = {
    parameters: {
        controls: { disable: true },
    },
    render: () => (
        <Chip prefix={<SortStrokeSrvIcon20 paletteIndex={5} />} postfix={<SortStrokeSrvIcon20 paletteIndex={5} />}>
            Value
        </Chip>
    ),
};
