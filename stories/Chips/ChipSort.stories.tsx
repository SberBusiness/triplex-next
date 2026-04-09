import React, { useEffect, useRef, useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, Primary, Controls, Stories, Heading, ArgTypes } from "@storybook/addon-docs/blocks";
import { ChipSort, EComponentSize } from "@sberbusiness/triplex-next";
import { ISelectFieldOption } from "../../src/components/SelectField/SelectField";
import { DefaultExample, DefaultExampleSource, SizesExample, SizesExampleSource } from "./examples/ChipSort";

const meta = {
    title: "Components/Chips/ChipSort",
    component: ChipSort,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
ChipSelect с иконкой выбора сортировки.
                `,
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={ChipSort} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof ChipSort>;

export default meta;
type Story = StoryObj<typeof ChipSort>;
type PlaygroundStory = StoryObj<
    Omit<React.ComponentProps<typeof ChipSort>, "defaultValue"> & {
        defaultValue: number;
    }
>;

export const Playground: PlaygroundStory = {
    tags: ["!autodocs"],
    args: {
        size: EComponentSize.MD,
        disabled: false,
        defaultValue: 0,
    },
    argTypes: {
        size: {
            control: { type: "select" },
            options: Object.values(EComponentSize),
        },
        disabled: { control: { type: "boolean" } },
        defaultValue: {
            control: { type: "select" },
            options: [0, 1, 2],
            description: "Дефолтное значение",
        },
    },
    parameters: {
        controls: {
            include: ["size", "disabled", "defaultValue"],
        },
        docs: {
            canvas: {
                sourceState: "none",
            },
            codePanel: false,
        },
        testRunner: { skip: true },
    },
    render: (args) => {
        const options: ISelectFieldOption[] = [
            { id: "chip-sort-1", label: "По дате", value: "i1" },
            { id: "chip-sort-2", label: "По времени", value: "i2" },
            { id: "chip-sort-3", label: "По названию", value: "i3" },
        ];

        const [value, setValue] = useState<ISelectFieldOption>(options[0]);

        const defaultValue =
            args.defaultValue !== undefined && args.defaultValue !== null ? options[args.defaultValue] : undefined;

        return <ChipSort {...args} defaultValue={defaultValue} value={value} options={options} onChange={setValue} />;
    },
};

export const Default: Story = {
    render: DefaultExample,
    parameters: {
        controls: { disable: true },
        docs: { source: { code: DefaultExampleSource, language: "tsx" } },
    },
};

export const Sizes: Story = {
    render: SizesExample,
    parameters: {
        controls: { disable: true },
        docs: { source: { code: SizesExampleSource, language: "tsx" } },
    },
};

export const VisualTests: Story = {
    tags: ["!autodocs"],
    parameters: {
        controls: { disable: true },
        docs: {
            canvas: {
                sourceState: "none",
            },
            codePanel: false,
        },
    },
    render: () => {
        const options: ISelectFieldOption[] = [
            { id: "chip-sort-1", label: "По дате", value: "i1" },
            { id: "chip-sort-2", label: "По времени", value: "i2" },
            { id: "chip-sort-3", label: "По названию", value: "i3" },
        ];
        const [valueSM, setValueSM] = useState<ISelectFieldOption>(options[0]);
        const [valueMD, setValueMD] = useState<ISelectFieldOption>(options[0]);
        const [valueLG, setValueLG] = useState<ISelectFieldOption>(options[0]);
        const rootRef = useRef<HTMLDivElement>(null);

        useEffect(() => {
            const targets = rootRef.current?.querySelectorAll<HTMLElement>('[role="combobox"]');
            targets?.forEach((el) => el.click());
        }, []);

        return (
            <div
                ref={rootRef}
                style={{ display: "flex", maxWidth: 600, alignItems: "flex-start", justifyContent: "space-between" }}
            >
                <ChipSort
                    defaultValue={options[0]}
                    size={EComponentSize.SM}
                    value={valueSM}
                    options={options}
                    onChange={setValueSM}
                />
                <ChipSort
                    defaultValue={options[0]}
                    size={EComponentSize.MD}
                    value={valueMD}
                    options={options}
                    onChange={setValueMD}
                />
                <ChipSort
                    defaultValue={options[0]}
                    size={EComponentSize.LG}
                    value={valueLG}
                    options={options}
                    onChange={setValueLG}
                />
            </div>
        );
    },
};
