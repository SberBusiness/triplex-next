import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, Primary, Controls, Stories, ArgTypes, Heading } from "@storybook/addon-docs/blocks";
import { Page, EBodyPageType, EBodyPageVerticalMargin, Text, ETextSize, EFontType } from "@sberbusiness/triplex-next";
import {
    Playground as PlaygroundRender,
    Default as DefaultRender,
    DefaultSource,
    Types as TypesRender,
    TypesSource,
    VerticalMargins as VerticalMarginsRender,
    VerticalMarginsSource,
} from "./examples";

const meta = {
    title: "Components/Page/BodyPage",
    component: Page.Body,
    globals: {
        backgrounds: { value: "gray" },
    },
    parameters: {
        docs: {
            description: {
                component:
                    "BodyPage — тело страницы Page (доступен как `Page.Body`). Контейнер для основного контента. " +
                    "Тип `FIRST` оборачивает контент в Island (карточку), тип `SECOND` рендерит контент без карточки. " +
                    "Поддерживает вертикальные отступы через `verticalMargin`.",
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={Page.Body} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
    tags: ["autodocs"],
} satisfies Meta<typeof Page.Body>;

export default meta;

interface IPlaygroundArgs {
    type: EBodyPageType;
    verticalMargin: EBodyPageVerticalMargin;
}

export const Playground: StoryObj<IPlaygroundArgs> = {
    tags: ["!autodocs"],
    args: {
        type: EBodyPageType.FIRST,
        verticalMargin: EBodyPageVerticalMargin.LARGE,
    },
    render: PlaygroundRender,
    argTypes: {
        type: {
            control: { type: "select" },
            options: Object.values(EBodyPageType),
            description: "Тип компонента BodyPage.",
            table: {
                type: { summary: "EBodyPageType" },
                defaultValue: { summary: "EBodyPageType.FIRST" },
            },
        },
        verticalMargin: {
            control: { type: "select" },
            options: Object.values(EBodyPageVerticalMargin),
            description: "Вертикальные отступы сверху и снизу.",
            table: {
                type: { summary: "EBodyPageVerticalMargin" },
                defaultValue: { summary: "EBodyPageVerticalMargin.LARGE" },
            },
        },
    },
    parameters: {
        controls: {
            include: ["type", "verticalMargin"],
        },
        testRunner: { skip: true },
        docs: {
            canvas: { sourceState: "none" },
        },
    },
};

export const Default: StoryObj<typeof Page.Body> = {
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

export const Types: StoryObj<typeof Page.Body> = {
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

export const VerticalMargins: StoryObj<typeof Page.Body> = {
    render: VerticalMarginsRender,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: VerticalMarginsSource,
                language: "tsx",
            },
        },
    },
};

export const VisualTests: StoryObj<typeof Page.Body> = {
    tags: ["!autodocs"],
    parameters: {
        controls: { disable: true },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
    },
    render: () => (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <Page.Body type={EBodyPageType.FIRST} verticalMargin={EBodyPageVerticalMargin.LARGE}>
                <Text tag="div" size={ETextSize.B2} type={EFontType.PRIMARY}>
                    FIRST + LARGE (24px) — контент в карточке.
                </Text>
            </Page.Body>
            <Page.Body type={EBodyPageType.FIRST} verticalMargin={EBodyPageVerticalMargin.SMALL}>
                <Text tag="div" size={ETextSize.B2} type={EFontType.PRIMARY}>
                    FIRST + SMALL (16px) — контент в карточке.
                </Text>
            </Page.Body>
            <Page.Body type={EBodyPageType.SECOND} verticalMargin={EBodyPageVerticalMargin.LARGE}>
                <Text tag="div" size={ETextSize.B2} type={EFontType.PRIMARY}>
                    SECOND + LARGE (24px) — контент без карточки.
                </Text>
            </Page.Body>
            <Page.Body type={EBodyPageType.SECOND} verticalMargin={EBodyPageVerticalMargin.SMALL}>
                <Text tag="div" size={ETextSize.B2} type={EFontType.PRIMARY}>
                    SECOND + SMALL (16px) — контент без карточки.
                </Text>
            </Page.Body>
        </div>
    ),
};
