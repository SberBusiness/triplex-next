import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, Primary, Controls, Stories } from "@storybook/addon-docs/blocks";
import { Page, EHeaderPageType, EFooterPageType, EBodyPageVerticalMargin } from "@sberbusiness/triplex-next";
import {
    Playground as PlaygroundRender,
    Default as DefaultRender,
    DefaultSource,
    WithIslands as WithIslandsRender,
    WithIslandsSource,
    WithoutIslands as WithoutIslandsRender,
    WithoutIslandsSource,
} from "./examples";

const meta = {
    title: "Components/Page",
    component: Page,
    globals: {
        backgrounds: { value: "gray" },
    },
    parameters: {
        // Page — каркас-композиция; визуальная регрессия покрывается скриншот-тестами
        // его частей (BodyPage, FooterPage) и HeaderPage. Сам Page из скриншотов исключён.
        testRunner: { skip: true },
        docs: {
            description: {
                component:
                    "Page — каркас страницы. Вертикальный flex-контейнер, в который вкладываются только " +
                    "составные части `Page.Header`, `Page.Body` и `Page.Footer`. Каждая часть бывает двух типов: " +
                    "`FIRST` (на основе Island — карточки) и `SECOND` (без фона). Типичное место использования — `LightBox`.",
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
    tags: ["autodocs"],
} satisfies Meta<typeof Page>;

export default meta;

interface IPlaygroundArgs {
    headerType: EHeaderPageType;
    footerType: EFooterPageType;
    verticalMargin: EBodyPageVerticalMargin;
}

export const Playground: StoryObj<IPlaygroundArgs> = {
    tags: ["!autodocs"],
    args: {
        headerType: EHeaderPageType.FIRST,
        footerType: EFooterPageType.FIRST,
        verticalMargin: EBodyPageVerticalMargin.LARGE,
    },
    render: PlaygroundRender,
    argTypes: {
        headerType: {
            control: { type: "select" },
            options: Object.values(EHeaderPageType),
            description: "Тип заголовка страницы (Page.Header).",
            table: {
                category: "Settings",
                type: { summary: "EHeaderPageType" },
                defaultValue: { summary: "EHeaderPageType.FIRST" },
            },
        },
        footerType: {
            control: { type: "select" },
            options: Object.values(EFooterPageType),
            description: "Тип футера страницы (Page.Footer).",
            table: {
                category: "Settings",
                type: { summary: "EFooterPageType" },
                defaultValue: { summary: "EFooterPageType.FIRST" },
            },
        },
        verticalMargin: {
            control: { type: "select" },
            options: Object.values(EBodyPageVerticalMargin),
            description: "Вертикальные отступы тела страницы (Page.Body).",
            table: {
                category: "Settings",
                type: { summary: "EBodyPageVerticalMargin" },
                defaultValue: { summary: "EBodyPageVerticalMargin.LARGE" },
            },
        },
    },
    parameters: {
        controls: {
            include: ["headerType", "footerType", "verticalMargin"],
        },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
    },
};

export const Default: StoryObj<typeof Page> = {
    render: DefaultRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story:
                    "Базовая страница с заголовком, контентом и футером — дефолтная Page для использования в LightBox. " +
                    "Если контента мало, используй Page.Body типа FIRST, чтобы не было пустого пространства.",
            },
            source: {
                code: DefaultSource,
                language: "tsx",
            },
        },
    },
};

export const WithIslands: StoryObj<typeof Page> = {
    render: WithIslandsRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Header, Body и Footer типа FIRST — каждый блок является островом (карточкой). Используется в LightBox.",
            },
            source: {
                code: WithIslandsSource,
                language: "tsx",
            },
        },
    },
};

export const WithoutIslands: StoryObj<typeof Page> = {
    render: WithoutIslandsRender,
    parameters: {
        controls: { disable: true },
        docs: {
            description: {
                story: "Header, Body и Footer типа SECOND — без островов. Используется в layout, а не в LightBox.",
            },
            source: {
                code: WithoutIslandsSource,
                language: "tsx",
            },
        },
    },
};
