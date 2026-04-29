import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Description, Stories, Title } from "@storybook/addon-docs/blocks";
import { ListItem } from "@sberbusiness/triplex-next";
import {
    DefaultExample,
    DefaultExampleSource,
    ListItemForTableExample,
    ListItemForTableExampleSource,
    ListItemForTableWithSelectableExample,
    ListItemForTableWithSelectableExampleSource,
    ListItemForTableWithSwipeEmulationExample,
    ListItemForTableWithSwipeEmulationExampleSource,
    LoadingExample,
    LoadingExampleSource,
    SelectableExample,
    SelectableExampleSource,
    SwipeableExample,
    SwipeableExampleSource,
} from "./examples/ListItem";

const meta = {
    title: "Components/List/ListItem",
    component: ListItem,
    globals: {
        backgrounds: { value: "gray" },
    },
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: `
Элемент списка.
                `,
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof ListItem>;

export default meta;

export const Default: StoryObj<typeof ListItem> = {
    render: DefaultExample,
    parameters: {
        controls: { disable: true },
        docs: {
            description: { story: "Базовый элемент списка с контентом." },
            source: {
                code: DefaultExampleSource,
                language: "tsx",
            },
        },
    },
};

export const Loading: StoryObj<typeof ListItem> = {
    render: LoadingExample,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Элемент списка, отображающий подгрузку данных. Отображается последним, при доскролле до него загружаются новые элементы.",
            },
            source: {
                code: LoadingExampleSource,
                language: "tsx",
            },
        },
    },
};

export const Selectable: StoryObj<typeof ListItem> = {
    render: SelectableExample,
    parameters: {
        controls: { disable: true },
        docs: {
            description: { story: "Элемент списка с возможностью выбора." },
            source: {
                code: SelectableExampleSource,
                language: "tsx",
            },
        },
    },
};

export const Swipeable: StoryObj<typeof ListItem> = {
    render: SwipeableExample,
    parameters: {
        controls: { disable: true },
        docs: {
            description: { story: "Эмуляция свайпа" },
            source: {
                code: SwipeableExampleSource,
                language: "tsx",
            },
        },
    },
};

export const ListItemForTable: StoryObj<typeof ListItem> = {
    render: ListItemForTableExample,
    parameters: {
        controls: { disable: true },
        docs: {
            description: { story: "Элемент списка для отображения табличных данных на мобильных устройствах." },
            source: {
                code: ListItemForTableExampleSource,
                language: "tsx",
            },
        },
    },
};

export const ListItemForTableWithSwipeEmulation: StoryObj<typeof ListItem> = {
    render: ListItemForTableWithSwipeEmulationExample,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Элемент списка для отображения табличных данных на мобильных устройствах с эмуляцией свайпа.",
            },
            source: {
                code: ListItemForTableWithSwipeEmulationExampleSource,
                language: "tsx",
            },
        },
    },
};

export const ListItemForTableWithSelectable: StoryObj<typeof ListItem> = {
    render: ListItemForTableWithSelectableExample,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Элемент списка для отображения табличных данных на мобильных устройствах с возможностью выбора элемента.",
            },
            source: {
                code: ListItemForTableWithSelectableExampleSource,
                language: "tsx",
            },
        },
    },
};
