import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, Primary, Controls, Stories, ArgTypes, Heading } from "@storybook/addon-docs/blocks";
import { Page, EFooterPageType, EComponentSize } from "@sberbusiness/triplex-next";
import {
    Playground as PlaygroundRender,
    Default as DefaultRender,
    DefaultSource,
    Types as TypesRender,
    TypesSource,
} from "./examples";

const meta = {
    title: "Components/Page/FooterPage",
    component: Page.Footer,
    globals: {
        backgrounds: { value: "gray" },
    },
    parameters: {
        docs: {
            description: {
                component:
                    "FooterPage — футер страницы Page (доступен как `Page.Footer`). Нижний блок с контентом и " +
                    "управляющими элементами через `Page.Footer.Description`. Тип `FIRST` оборачивает футер в Island " +
                    "(карточку) и поддерживает прилипание (`sticky`) внутри LightBox, тип `SECOND` рендерит футер без карточки.",
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={Page.Footer} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
    tags: ["autodocs"],
} satisfies Meta<typeof Page.Footer>;

export default meta;

interface IPlaygroundArgs {
    type: EFooterPageType;
    size?: EComponentSize;
}

export const Playground: StoryObj<IPlaygroundArgs> = {
    tags: ["!autodocs"],
    args: {
        type: EFooterPageType.FIRST,
        size: EComponentSize.MD,
    },
    render: PlaygroundRender,
    argTypes: {
        type: {
            control: { type: "select" },
            options: Object.values(EFooterPageType),
            description: "Тип компонента FooterPage.",
            table: {
                type: { summary: "EFooterPageType" },
                defaultValue: { summary: "EFooterPageType.FIRST" },
            },
        },
        size: {
            control: { type: "select" },
            options: Object.values(EComponentSize),
            description: "Размер острова (Island). Доступен только для типа FIRST.",
            if: { arg: "type", eq: EFooterPageType.FIRST },
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

export const Default: StoryObj<typeof Page.Footer> = {
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

export const Types: StoryObj<typeof Page.Footer> = {
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
