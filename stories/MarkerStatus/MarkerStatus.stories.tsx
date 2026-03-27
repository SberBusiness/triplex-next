import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, ArgTypes, Heading, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { MarkerStatus, EMarkerStatus, EComponentSize } from "@sberbusiness/triplex-next";
import {
    DefaultExample,
    DefaultExampleSource,
    StatusesExample,
    StatusesExampleSource,
    SizesExample,
    SizesExampleSource,
} from "./examples";

const meta = {
    title: "Components/MarkerStatus",
    component: MarkerStatus,
    parameters: {
        docs: {
            description: {
                component: "Компонент иконки статуса подписи.",
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={MarkerStatus} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
    tags: ["autodocs"],
} satisfies Meta<typeof MarkerStatus>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    tags: ["!autodocs"],
    args: {
        status: EMarkerStatus.SUCCESS,
        size: EComponentSize.MD,
        description: "Description",
        children: "Status text",
    },
    argTypes: {
        status: {
            control: { type: "select" },
            options: Object.values(EMarkerStatus),
            description: "Статус",
            table: {
                type: { summary: "EMarkerStatus" },
            },
        },
        size: {
            control: { type: "select" },
            options: [EComponentSize.MD, EComponentSize.LG],
            description: "Размер",
            table: {
                type: { summary: "EComponentSize.MD | EComponentSize.LG" },
                defaultValue: { summary: "EComponentSize.MD" },
            },
        },
        description: {
            control: { type: "text" },
            description: "Дополнительное описание под наименованием статуса",
            table: {
                type: { summary: "React.ReactNode" },
            },
        },
        children: {
            control: { type: "text" },
            description: "Заголовок статуса",
            table: {
                type: { summary: "React.ReactNode" },
            },
        },
    },
    render: (args) => <MarkerStatus {...args} />,
    parameters: {
        testRunner: { skip: true },
        docs: {
            canvas: { sourceState: "none" },
        },
    },
};

export const Default: Story = {
    name: "Default",
    render: DefaultExample,
    parameters: {
        testRunner: { skip: true },
        docs: {
            controls: { disable: true },
            source: {
                code: DefaultExampleSource,
                language: "tsx",
            },
        },
    },
};

export const Statuses: Story = {
    name: "Statuses",
    render: StatusesExample,
    parameters: {
        docs: {
            controls: { disable: true },
            source: {
                code: StatusesExampleSource,
                language: "tsx",
            },
        },
    },
};

export const Sizes: Story = {
    name: "Sizes",
    render: SizesExample,
    parameters: {
        docs: {
            controls: { disable: true },
            source: {
                code: SizesExampleSource,
                language: "tsx",
            },
        },
    },
};
