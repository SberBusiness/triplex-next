import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, ArgTypes, Heading, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { OrderedList } from "@sberbusiness/triplex-next";
import {
    PlaygroundRender,
    type IPlaygroundArgs,
    DefaultRender,
    DefaultSource,
    WithLongContentRender,
    WithLongContentSource,
    StartRender,
    StartSource,
} from "./examples";

const meta = {
    title: "Components/OrderedList",
    component: OrderedList,
    parameters: {
        docs: {
            description: {
                component: "Нумерованный список. Свойство `start` задаёт начальный номер; по умолчанию — 1.",
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={OrderedList} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
    tags: ["autodocs"],
} satisfies Meta<typeof OrderedList>;

export default meta;

const PLAYGROUND_ARGS: IPlaygroundArgs = {
    // Props
    start: 1,
};

type Story = StoryObj<typeof meta>;

export const Playground: StoryObj<IPlaygroundArgs> = {
    tags: ["!autodocs"],
    args: PLAYGROUND_ARGS,
    argTypes: {
        // Props
        start: {
            control: "number",
            description: "Начальный номер списка.",
            table: {
                category: "Props",
                type: { summary: "number" },
                defaultValue: { summary: "1" },
            },
        },
    },
    parameters: {
        controls: { include: Object.keys(PLAYGROUND_ARGS) },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
        testRunner: { skip: true },
    },
    render: PlaygroundRender,
};

export const Default: Story = {
    name: "Default",
    render: DefaultRender,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: DefaultSource,
                language: "tsx",
            },
        },
    },
};

export const WithLongContent: Story = {
    name: "WithLongContent",
    render: WithLongContentRender,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: WithLongContentSource,
                language: "tsx",
            },
        },
    },
};

export const Start: Story = {
    render: StartRender,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: StartSource,
                language: "tsx",
            },
        },
    },
};
