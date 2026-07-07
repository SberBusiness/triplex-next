import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, Primary, Controls, Stories, ArgTypes, Heading } from "@storybook/addon-docs/blocks";
import { Page, EHeaderPageType, EComponentSize } from "@sberbusiness/triplex-next";
import {
    Playground as PlaygroundRender,
    Default as DefaultRender,
    DefaultSource,
    Types as TypesRender,
    TypesSource,
    ExampleWithTabs as ExampleWithTabsRender,
    ExampleWithTabsSource,
} from "./examples";

const meta = {
    title: "Components/Page/HeaderPage",
    component: Page.Header,
    globals: {
        backgrounds: { value: "gray" },
    },
    parameters: {
        docs: {
            description: {
                component:
                    "HeaderPage — заголовок страницы Page (доступен как `Page.Header`). Верхний блок страницы с " +
                    "заголовком, табами и подзаголовком через `Page.Header.Title`, `Page.Header.Tabs`, " +
                    "`Page.Header.Subhead` и `Page.Header.LayoutSidebar`. Тип `FIRST` оборачивает заголовок в Island " +
                    "(карточку) и поддерживает прилипание (`sticky`) внутри LightBox, тип `SECOND` рендерит заголовок без карточки.",
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={Page.Header} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
    tags: ["autodocs"],
} satisfies Meta<typeof Page.Header>;

export default meta;

interface IPlaygroundArgs {
    type: EHeaderPageType;
    size?: EComponentSize;
}

export const Playground: StoryObj<IPlaygroundArgs> = {
    tags: ["!autodocs"],
    args: {
        type: EHeaderPageType.FIRST,
        size: EComponentSize.MD,
    },
    render: PlaygroundRender,
    argTypes: {
        type: {
            control: { type: "select" },
            options: Object.values(EHeaderPageType),
            description: "Тип компонента HeaderPage.",
            table: {
                type: { summary: "EHeaderPageType" },
                defaultValue: { summary: "EHeaderPageType.FIRST" },
            },
        },
        size: {
            control: { type: "select" },
            options: Object.values(EComponentSize),
            description: "Размер острова (Island). Доступен только для типа FIRST.",
            if: { arg: "type", eq: EHeaderPageType.FIRST },
            table: {
                type: { summary: "EComponentSize" },
                defaultValue: { summary: "EComponentSize.MD" },
            },
        },
    },
    parameters: {
        controls: {
            include: ["type", "size"],
        },
        testRunner: { skip: true },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
    },
};

export const Default: StoryObj<typeof Page.Header> = {
    render: DefaultRender,
    parameters: {
        controls: { disable: true },
        testRunner: { skip: true },
        docs: {
            source: {
                code: DefaultSource,
                language: "tsx",
            },
        },
    },
};

export const Types: StoryObj<typeof Page.Header> = {
    render: TypesRender,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: TypesSource,
                language: "tsx",
            },
        },
    },
};

export const Example: StoryObj<typeof Page.Header> = {
    name: "Example: with tabs",
    render: ExampleWithTabsRender,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: ExampleWithTabsSource,
                language: "tsx",
            },
        },
    },
};
