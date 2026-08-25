import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, Stories } from "@storybook/addon-docs/blocks";
import { Footer } from "@sberbusiness/triplex-next";
import {
    Default as DefaultRender,
    DefaultSource,
    Layouts as LayoutsRender,
    LayoutsSource,
    Example as ExampleRender,
    ExampleSource,
} from "./examples";

const meta = {
    title: "Components/Footer",
    component: Footer,
    parameters: {
        layout: "padded",
        docs: {
            description: {
                component:
                    "Footer — контейнер нижнего блока с контентом и управляющими элементами. Собственных props нет: " +
                    "принимает `children` и стандартные HTML-атрибуты div. Наполнение строится составным " +
                    "`Footer.Description` с областями `Footer.Description.Content` (контент, занимает свободное место) " +
                    "и `Footer.Description.Controls` (кнопки действий, прижаты вправо). На ширине экрана до 767px " +
                    "кнопки переносятся строкой ниже контента.",
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
    tags: ["autodocs"],
} satisfies Meta<typeof Footer>;

export default meta;

export const Default: StoryObj<typeof Footer> = {
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

export const Layouts: StoryObj<typeof Footer> = {
    render: LayoutsRender,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: LayoutsSource,
                language: "tsx",
            },
        },
    },
};

export const Example: StoryObj<typeof Footer> = {
    render: ExampleRender,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: ExampleSource,
                language: "tsx",
            },
        },
    },
};
