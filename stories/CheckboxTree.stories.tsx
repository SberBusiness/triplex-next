import type { StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { CheckboxTree, ICheckboxTreeProps } from "../src/components/CheckboxTree/CheckboxTree";
import { ICheckboxTreeCheckboxData } from "../src/components/CheckboxTree/types";
import { Title, Description, Primary, Controls, Stories, ArgTypes } from "@storybook/addon-docs/blocks";
import { EComponentSize } from "../src/enums/EComponentSize";
import { Col } from "../src/components/Col/Col";
import { Row } from "../src/components/Row/Row";

export default {
    title: "Components/CheckboxTree",
    component: CheckboxTree,
    tags: ["autodocs"],
    parameters: {
        layout: "padded",
        docs: {
            description: {
                component: `
Дерево чекбоксов. Является оберткой над CheckboxTreeExtended.

## Особенности

- **Размеры**: SM, MD, LG.
                `,
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <h2>Props</h2>
                    <ArgTypes of={CheckboxTree} />
                    <h2>Playground</h2>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
};

// Sample data for CheckboxTree with "группа 1", "группа 2", "Значение 3"
const sampleCheckboxes: ICheckboxTreeCheckboxData[] = [
    {
        id: "1",
        label: "Группа 1",
        checked: false,
        children: [
            {
                id: "1-1",
                label: "Значение 1-1",
                checked: false,
                children: [
                    {
                        id: "1-1-1",
                        label: "Значение 1-1-1",
                        checked: false,
                    },
                    {
                        id: "1-1-2",
                        label: "Значение 1-1-2",
                        checked: false,
                    },
                    {
                        id: "1-1-3",
                        label: "Значение 1-1-3",
                        checked: false,
                    },
                ],
            },
            {
                id: "1-2",
                label: "Значение 1-2",
                checked: false,
            },
        ],
    },
    {
        id: "2",
        label: "Группа 2",
        checked: false,
        children: [
            {
                id: "2-1",
                label: "Значение 2-1",
                checked: false,
            },
            {
                id: "2-2",
                label: "Значение 2-2",
                checked: false,
            },
        ],
    },
    {
        id: "3",
        label: "Значение 3",
        checked: false,
    },
];

// Interactive wrapper component
const InteractiveCheckboxTree = (args: ICheckboxTreeProps) => {
    const [checkboxes, setCheckboxes] = useState<ICheckboxTreeCheckboxData[]>(args.checkboxes);

    const handleChange = (updatedCheckboxes: ICheckboxTreeCheckboxData[]) => {
        setCheckboxes(updatedCheckboxes);
        args.onChange?.(updatedCheckboxes);
    };

    return <CheckboxTree {...args} checkboxes={checkboxes} onChange={handleChange} />;
};

export const Playground: StoryObj<typeof CheckboxTree> = {
    tags: ["!autodocs"],
    parameters: {
        controls: {
            include: ["size"],
        },
        docs: {
            canvas: {
                sourceState: "none",
            },
            codePanel: false,
        },
    },
    args: {
        checkboxes: sampleCheckboxes,
        size: EComponentSize.MD,
    },
    argTypes: {
        size: {
            control: { type: "select" },
            options: Object.values(EComponentSize),
            description: "Размер компонента",
            table: {
                type: { summary: "EComponentSize" },
                defaultValue: { summary: EComponentSize.MD },
            },
        },
    },
    render: (args) => <InteractiveCheckboxTree {...args} />,
};

export const Default: StoryObj<typeof CheckboxTree> = {
    parameters: {
        controls: { disable: true },
    },
    render: (args) => <InteractiveCheckboxTree {...args} />,
    args: {
        checkboxes: sampleCheckboxes,
    },
};

export const DifferentSizes: StoryObj<typeof CheckboxTree> = {
    parameters: {
        controls: { disable: true },
    },
    args: {
        checkboxes: sampleCheckboxes,
    },
    render: (args) => (
        <Row>
            <Col size={4}>
                <InteractiveCheckboxTree {...args} size={EComponentSize.SM} />
            </Col>
            <Col size={4}>
                <InteractiveCheckboxTree {...args} />
            </Col>
            <Col size={4}>
                <InteractiveCheckboxTree {...args} size={EComponentSize.LG} />
            </Col>
        </Row>
    ),
};
