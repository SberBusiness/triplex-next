import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { Title, Description, Primary, Controls, Stories, ArgTypes, Heading } from "@storybook/addon-docs/blocks";
import { CheckboxTree, EComponentSize, ICheckboxTreeCheckboxData } from "@sberbusiness/triplex-next";
import { DefaultExample, DefaultExampleSource, SizesExample, SizesExampleSource } from "./examples";

const SAMPLE_CHECKBOXES: ICheckboxTreeCheckboxData[] = [
    {
        id: "1",
        label: "Группа 1",
        checked: false,
        children: [
            { id: "1-1", label: "Значение 1-1", checked: false },
            { id: "1-2", label: "Значение 1-2", checked: false },
        ],
    },
    {
        id: "2",
        label: "Группа 2",
        checked: false,
        children: [
            { id: "2-1", label: "Значение 2-1", checked: false },
            { id: "2-2", label: "Значение 2-2", checked: false },
        ],
    },
    { id: "3", label: "Значение 3", checked: false },
];

const meta = {
    title: "Components/CheckboxTree",
    component: CheckboxTree,
    tags: ["autodocs"],
    parameters: {
        layout: "padded",
        docs: {
            description: { component: "Дерево чекбоксов. Является оберткой над CheckboxTreeExtended." },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={CheckboxTree} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof CheckboxTree>;

export default meta;
type Story = StoryObj<typeof CheckboxTree>;

export const Playground: Story = {
    tags: ["!autodocs"],
    parameters: {
        controls: { include: ["size"] },
        testRunner: { skip: true },
        docs: { canvas: { sourceState: "none" }, codePanel: false },
    },
    args: { size: EComponentSize.MD },
    argTypes: {
        size: {
            control: { type: "select" },
            options: Object.values(EComponentSize),
            description: "Размер компонента",
            table: { type: { summary: "EComponentSize" }, defaultValue: { summary: EComponentSize.MD } },
        },
    },
    render: (args) => {
        const [checkboxes, setCheckboxes] = useState<ICheckboxTreeCheckboxData[]>(SAMPLE_CHECKBOXES);
        return <CheckboxTree {...args} checkboxes={checkboxes} onChange={setCheckboxes} />;
    },
};

export const Default: Story = {
    render: DefaultExample,
    parameters: { controls: { disable: true }, docs: { source: { code: DefaultExampleSource, language: "tsx" } } },
};

export const Sizes: Story = {
    render: SizesExample,
    parameters: { controls: { disable: true }, docs: { source: { code: SizesExampleSource, language: "tsx" } } },
};
