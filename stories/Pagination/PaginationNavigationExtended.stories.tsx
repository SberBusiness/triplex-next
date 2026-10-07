import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Description, Stories, Title } from "@storybook/addon-docs/blocks";
import { PaginationNavigationExtended } from "@sberbusiness/triplex-next";
import {
    Default as DefaultRender,
    DefaultSource,
    Example as ExampleRender,
    ExampleSource,
    VisualTests as VisualTestsRender,
} from "./examples/PaginationNavigationExtended";

const meta = {
    title: "Components/Pagination/PaginationNavigationExtended",
    component: PaginationNavigationExtended,
    tags: ["autodocs"],
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                component:
                    "Список для компоновки кастомной навигации пагинации. Рендерит ul с горизонтальным расположением элементов и промежутком 4px. Элементы li передаются через children; стандартные HTML-атрибуты и ref относятся к ul. Текущая страница, многоточия и disabled задаются вложенными компонентами.",
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
} satisfies Meta<typeof PaginationNavigationExtended>;

export default meta;

type TStory = StoryObj<typeof meta>;

export const Default: TStory = {
    render: DefaultRender,
    parameters: {
        docs: {
            description: { story: "Минимальное наполнение списка через PaginationNavigationExtendedItem." },
            source: {
                code: DefaultSource,
                language: "tsx",
            },
        },
    },
};

export const Example: TStory = {
    render: ExampleRender,
    parameters: {
        docs: {
            description: {
                story: "Кастомная навигация с кнопками страниц, многоточием и заблокированной кнопкой «Назад» на первой странице. Контейнер задаёт раскладку; состояния кнопок и состав списка задаёт потребитель.",
            },
            source: {
                code: ExampleSource,
                language: "tsx",
            },
        },
    },
};

export const VisualTests: TStory = {
    tags: ["!autodocs", "!dev"],
    render: VisualTestsRender,
    parameters: {
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
    },
};
