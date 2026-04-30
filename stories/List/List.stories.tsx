import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { ArgTypes, Controls, Description, Heading, Primary, Stories, Title } from "@storybook/addon-docs/blocks";
import { List } from "@sberbusiness/triplex-next";
import {
    Default as DefaultRender,
    DefaultSource,
    EmptyState as EmptyStateRender,
    EmptyStateSource,
    Loading as LoadingRender,
    LoadingSource,
    Playground as PlaygroundRender,
    PlaygroundArgs,
    Sortable as SortableRender,
    SortableSource,
    SortableWithInteractiveElements as SortableWithInteractiveElementsRender,
    SortableWithInteractiveElementsSource,
    Virtualized as VirtualizedRender,
    VirtualizedSource,
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
    render: PlaygroundRender,
};

export const Default: StoryObj<typeof List> = {
    render: DefaultRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: { story: "Базовый список." },
            source: {
                code: DefaultSource,
                language: "tsx",
            },
        },
    },
};

export const Loading: StoryObj<typeof List> = {
    render: LoadingRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: { story: "Список в состоянии загрузки." },
            source: {
                code: LoadingSource,
                language: "tsx",
            },
        },
    },
};

export const EmptyState: StoryObj<typeof List> = {
    render: EmptyStateRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Используется, если нет данных для отображения хотя бы одного элемента списка.",
            },
            source: {
                code: EmptyStateSource,
                language: "tsx",
            },
        },
    },
};

export const Virtualized: StoryObj<typeof List> = {
    render: VirtualizedRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Список с виртуализацией для работы с большими наборами данных. Рендерится только видимая область.",
            },
            source: {
                code: VirtualizedSource,
                language: "tsx",
            },
        },
    },
};

export const Sortable: StoryObj<typeof List> = {
    render: SortableRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Список с возможностью сортировки элементов.",
            },
            source: {
                code: SortableSource,
                language: "tsx",
            },
        },
    },
};

export const SortableWithInteractiveElements: StoryObj<typeof List> = {
    render: SortableWithInteractiveElementsRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Список с возможностью сортировки интерактивных элементов.",
            },
            source: {
                code: SortableWithInteractiveElementsSource,
                language: "tsx",
            },
        },
    },
};
