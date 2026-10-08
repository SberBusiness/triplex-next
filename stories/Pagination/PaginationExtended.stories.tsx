import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Description, Stories, Title } from "@storybook/addon-docs/blocks";
import { PaginationExtended } from "@sberbusiness/triplex-next";
import {
    Default as DefaultRender,
    DefaultSource,
    Example as ExampleRender,
    ExampleSource,
} from "./examples/PaginationExtended";

const meta = {
    title: "Components/Pagination/PaginationExtended",
    component: PaginationExtended,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "Контейнер для кастомной пагинации. Центрирует дочерние элементы по горизонтали и вертикали; состав элементов, состояние страниц и дополнительную компоновку задаёт потребитель.",
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
} satisfies Meta<typeof PaginationExtended>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
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

export const Example: Story = {
    render: ExampleRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Кастомная компоновка с диапазоном записей и выбором размера страницы. Состояние хранится в примере; при смене размера страницы навигация возвращается на первую страницу. Перенос элементов задаётся через стандартный style контейнера.",
            },
            source: {
                code: ExampleSource,
                language: "tsx",
            },
        },
    },
};
