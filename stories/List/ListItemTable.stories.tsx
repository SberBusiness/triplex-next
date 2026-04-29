import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { ArgTypes, Controls, Description, Heading, Primary, Stories, Title } from "@storybook/addon-docs/blocks";
import { ListItemTable } from "@sberbusiness/triplex-next";
import {
    Default as DefaultRender,
    DefaultSource,
    Playground as PlaygroundRender,
    PlaygroundArgs,
    Selectable as SelectableRender,
    SelectableSource,
    WithSwipeEmulation as WithSwipeEmulationRender,
    WithSwipeEmulationSource,
} from "./examples/ListItemTable";

const meta = {
    title: "Components/List/ListItemTable",
    component: ListItemTable,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Элемент списка для отображения табличных данных на мобильных устройствах. Поддерживает кнопки действий, клик по карточке, выбор и эмуляцию свайпа через ref.
                `,
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={ListItemTable} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof ListItemTable>;

export default meta;

const PLAYGROUND_ARGS: PlaygroundArgs = {
    selected: false,
};

export const Playground: StoryObj<PlaygroundArgs> = {
    tags: ["!autodocs"],
    args: PLAYGROUND_ARGS,
    argTypes: {
        selected: {
            control: { type: "boolean" },
            description: "Флаг состояния selected.",
            table: {
                type: { summary: "boolean" },
                defaultValue: { summary: "false" },
            },
        },
    },
    parameters: {
        controls: { include: Object.keys(PLAYGROUND_ARGS) },
        testRunner: { skip: true },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
    },
    render: PlaygroundRender,
};

export const Default: StoryObj<typeof ListItemTable> = {
    render: DefaultRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Элемент списка для отображения табличных данных на мобильных устройствах.",
            },
            source: {
                code: DefaultSource,
                language: "tsx",
            },
        },
    },
};

export const Selectable: StoryObj<typeof ListItemTable> = {
    render: SelectableRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Элемент списка с возможностью выбора (props selected/onSelect).",
            },
            source: {
                code: SelectableSource,
                language: "tsx",
            },
        },
    },
};

export const WithSwipeEmulation: StoryObj<typeof ListItemTable> = {
    render: WithSwipeEmulationRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Эмуляция свайпа через swipeableAreaRef.",
            },
            source: {
                code: WithSwipeEmulationSource,
                language: "tsx",
            },
        },
    },
};
