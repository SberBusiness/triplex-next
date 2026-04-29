import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { ArgTypes, Controls, Description, Heading, Primary, Stories, Title } from "@storybook/addon-docs/blocks";
import { List } from "@sberbusiness/triplex-next";
import {
    DefaultExample,
    DefaultExampleSource,
    EmptyStateExample,
    EmptyStateExampleSource,
    LoadingExample,
    LoadingExampleSource,
    PlaygroundArgs,
    PlaygroundExample,
    SortableExample,
    SortableExampleSource,
    SortableWithInteractiveElementsExample,
    SortableWithInteractiveElementsExampleSource,
    VirtualizedExample,
    VirtualizedExampleSource,
} from "./examples/List";

const meta = {
    title: "Components/List/List",
    component: List,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Компонент List — контейнер для набора элементов. Поддерживает состояние загрузки, пустого списка, выбор элементов и сортировку (drag-and-drop).
                `,
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={List} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof List>;

export default meta;

const PLAYGROUND_ARGS: PlaygroundArgs = {
    loading: false,
};

export const Playground: StoryObj<PlaygroundArgs> = {
    tags: ["!autodocs"],
    args: PLAYGROUND_ARGS,
    argTypes: {
        loading: {
            control: { type: "boolean" },
            description: "Состояние загрузки",
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
    render: PlaygroundExample,
};

export const Default: StoryObj<typeof List> = {
    render: DefaultExample,
    parameters: {
        controls: { disable: true },
        docs: {
            description: { story: "Базовый список." },
            source: {
                code: DefaultExampleSource,
                language: "tsx",
            },
        },
    },
};

export const Loading: StoryObj<typeof List> = {
    render: LoadingExample,
    parameters: {
        controls: { disable: true },
        docs: {
            description: { story: "Список в состоянии загрузки." },
            source: {
                code: LoadingExampleSource,
                language: "tsx",
            },
        },
    },
};

export const EmptyState: StoryObj<typeof List> = {
    render: EmptyStateExample,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Используется, если нет данных для отображения хотя бы одного элемента списка.",
            },
            source: {
                code: EmptyStateExampleSource,
                language: "tsx",
            },
        },
    },
};

export const Virtualized: StoryObj<typeof List> = {
    render: VirtualizedExample,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Список с виртуализацией для работы с большими наборами данных. Рендерится только видимая область.",
            },
            source: {
                code: VirtualizedExampleSource,
                language: "tsx",
            },
        },
    },
};

export const Sortable: StoryObj<typeof List> = {
    render: SortableExample,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Список с возможностью сортировки элементов.",
            },
            source: {
                code: SortableExampleSource,
                language: "tsx",
            },
        },
    },
};

export const SortableWithInteractiveElements: StoryObj<typeof List> = {
    render: SortableWithInteractiveElementsExample,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Список с возможностью сортировки интерактивных элементов.",
            },
            source: {
                code: SortableWithInteractiveElementsExampleSource,
                language: "tsx",
            },
        },
    },
};
