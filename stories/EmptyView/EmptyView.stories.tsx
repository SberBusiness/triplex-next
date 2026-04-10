import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, Primary, Controls, Stories, ArgTypes, Heading } from "@storybook/addon-docs/blocks";
import { EmptyView, EEmptyViewSize } from "@sberbusiness/triplex-next";
import {
    DefaultExample,
    DefaultExampleSource,
    SizesExample,
    SizesExampleSource,
    WithoutTitleExample,
    WithoutTitleExampleSource,
    WithButtonsExample,
    WithButtonsExampleSource,
    PlaygroundExample,
    PlaygroundArgs,
} from "./examples";

const meta = {
    title: "Components/EmptyView",
    component: EmptyView,
    parameters: {
        docs: {
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={EmptyView} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
    tags: ["autodocs"],
} satisfies Meta<typeof EmptyView>;

export default meta;

export const Playground: StoryObj<PlaygroundArgs> = {
    tags: ["!autodocs"],
    args: {
        size: EEmptyViewSize.SM,
        title: "Title text",
        description: "This message provides additional context or highlights important information to note.",
        caption: "Caption",
        withButtons: true,
        iconType: "Status",
    },
    argTypes: {
        size: {
            control: { type: "select" },
            options: Object.values(EEmptyViewSize),
            description: "Размер компонента.",
            table: {
                type: { summary: "EEmptyViewSize" },
                defaultValue: { summary: "EEmptyViewSize.SM" },
            },
        },
        title: {
            control: { type: "text" },
            description: "Заголовок.",
        },
        description: {
            control: { type: "text" },
            description: "Описание.",
        },
        caption: {
            control: { type: "text" },
            description: "Подпись.",
        },
        withButtons: {
            control: "boolean",
            description: "С кнопками.",
            table: { category: "Settings" },
        },
        iconType: {
            control: { type: "select" },
            options: ["Status", "System", "Marketing", "None"],
            description: "Тип иконки.",
            table: { category: "Settings" },
        },
    },
    render: (args) => <PlaygroundExample {...args} />,
    parameters: {
        testRunner: { skip: true },
        docs: {
            canvas: { sourceState: "none" },
        },
    },
};

export const Default: StoryObj<typeof EmptyView> = {
    name: "Default",
    render: DefaultExample,
    parameters: {
        docs: {
            controls: { disable: true },
            source: {
                code: DefaultExampleSource,
                language: "tsx",
            },
        },
    },
};

export const Sizes: StoryObj<typeof EmptyView> = {
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

export const WithoutTitle: StoryObj<typeof EmptyView> = {
    name: "WithoutTitle",
    render: WithoutTitleExample,
    parameters: {
        docs: {
            controls: { disable: true },
            source: {
                code: WithoutTitleExampleSource,
                language: "tsx",
            },
        },
    },
};

export const WithButtons: StoryObj<typeof EmptyView> = {
    name: "WithButtons",
    render: WithButtonsExample,
    parameters: {
        docs: {
            controls: { disable: true },
            source: {
                code: WithButtonsExampleSource,
                language: "tsx",
            },
        },
    },
};
