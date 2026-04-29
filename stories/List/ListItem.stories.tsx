import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Description, Stories, Title } from "@storybook/addon-docs/blocks";
import { ListItem } from "@sberbusiness/triplex-next";
import {
    Default as DefaultRender,
    DefaultSource,
    Loading as LoadingRender,
    LoadingSource,
    Selectable as SelectableRender,
    SelectableSource,
    Swipeable as SwipeableRender,
    SwipeableSource,
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
    render: DefaultRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: { story: "Базовый элемент списка с контентом." },
            source: {
                code: DefaultSource,
                language: "tsx",
            },
        },
    },
};

export const Loading: StoryObj<typeof ListItem> = {
    render: LoadingRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Элемент списка, отображающий подгрузку данных. Отображается последним, при доскролле до него загружаются новые элементы.",
            },
            source: {
                code: LoadingSource,
                language: "tsx",
            },
        },
    },
};

export const Selectable: StoryObj<typeof ListItem> = {
    render: SelectableRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: { story: "Элемент списка с возможностью выбора." },
            source: {
                code: SelectableSource,
                language: "tsx",
            },
        },
    },
};

export const Swipeable: StoryObj<typeof ListItem> = {
    render: SwipeableRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: { story: "Эмуляция свайпа" },
            source: {
                code: SwipeableSource,
                language: "tsx",
            },
        },
    },
};
