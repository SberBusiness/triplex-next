import type { StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { CheckboxTree } from "../src/components/CheckboxTree/CheckboxTree";
import { ICheckboxTreeCheckboxData } from "../src/components/CheckboxTree/types";
import { Title, Description, Primary, Controls, Stories, ArgTypes, Heading } from "@storybook/addon-docs/blocks";
import { EComponentSize } from "../src/enums/EComponentSize";
import { Col } from "../src/components/Col/Col";
import { Row } from "../src/components/Row/Row";

export default {
    title: "Components/CheckboxTree",
    component: CheckboxTree,
    tags: ["autodocs"],
    parameters: {
        testRunner: { skip: true },
        layout: "padded",
        docs: {
            description: {
                component: `
Дерево чекбоксов. Является оберткой над CheckboxTreeExtended.
                `,
            },
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
    render: (args) => {
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

        const [checkboxes, setCheckboxes] = useState<ICheckboxTreeCheckboxData[]>(sampleCheckboxes);

        const handleChange = (updatedCheckboxes: ICheckboxTreeCheckboxData[]) => {
            setCheckboxes(updatedCheckboxes);
        };

        return <CheckboxTree {...args} checkboxes={checkboxes} onChange={handleChange} />;
    },
};

export const Default: StoryObj<typeof CheckboxTree> = {
    parameters: {
        controls: { disable: true },
    },
    render: () => {
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

        const [checkboxes, setCheckboxes] = useState<ICheckboxTreeCheckboxData[]>(sampleCheckboxes);

        const handleChange = (updatedCheckboxes: ICheckboxTreeCheckboxData[]) => {
            setCheckboxes(updatedCheckboxes);
        };

        return <CheckboxTree checkboxes={checkboxes} onChange={handleChange} />;
    },
};

export const Sizes: StoryObj<typeof CheckboxTree> = {
    parameters: {
        controls: { disable: true },
    },
    render: () => {
        const createSampleCheckboxes = (): ICheckboxTreeCheckboxData[] => [
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

        const [checkboxesMD, setCheckboxesMD] = useState<ICheckboxTreeCheckboxData[]>(createSampleCheckboxes());
        const [checkboxesSM, setCheckboxesSM] = useState<ICheckboxTreeCheckboxData[]>(createSampleCheckboxes());
        const [checkboxesLG, setCheckboxesLG] = useState<ICheckboxTreeCheckboxData[]>(createSampleCheckboxes());

        const handleChangeSM = (updatedCheckboxes: ICheckboxTreeCheckboxData[]) => {
            setCheckboxesSM(updatedCheckboxes);
        };

        const handleChangeMD = (updatedCheckboxes: ICheckboxTreeCheckboxData[]) => {
            setCheckboxesMD(updatedCheckboxes);
        };

        const handleChangeLG = (updatedCheckboxes: ICheckboxTreeCheckboxData[]) => {
            setCheckboxesLG(updatedCheckboxes);
        };
        return (
            <Row>
                <Col size={4}>
                    <CheckboxTree checkboxes={checkboxesSM} onChange={handleChangeSM} size={EComponentSize.SM} />
                </Col>
                <Col size={4}>
                    <CheckboxTree checkboxes={checkboxesMD} onChange={handleChangeMD} />
                </Col>
                <Col size={4}>
                    <CheckboxTree checkboxes={checkboxesLG} onChange={handleChangeLG} size={EComponentSize.LG} />
                </Col>
            </Row>
        );
    },
};
