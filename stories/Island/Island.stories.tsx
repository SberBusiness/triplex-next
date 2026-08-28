import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Title, Description, Primary, Controls, Stories, ArgTypes, Heading } from "@storybook/addon-docs/blocks";
import { Island, EIslandType, EComponentSize } from "@sberbusiness/triplex-next";
import {
    DefaultExample,
    DefaultExampleSource,
    TypesExample,
    TypesExampleSource,
    SizesExample,
    SizesExampleSource,
    Loading as LoadingRender,
    LoadingSource,
    WithoutPaddings as WithoutPaddingsRender,
    WithoutPaddingsSource,
} from "./examples";

interface IIslandPlaygroundProps extends React.ComponentProps<typeof Island> {
    headerText?: string;
    bodyText?: string;
    footerText?: string;
    showHeader?: boolean;
    showBody?: boolean;
    showFooter?: boolean;
}

const meta = {
    title: "Components/Island",
    component: Island,
    globals: {
        backgrounds: { value: "gray" },
    },
    parameters: {
        docs: {
            description: {
                component:
                    "Контейнерный компонент с визуальными вариациями: тип, скругление и внутренние отступы.\n\n- **Типы**: type1, type2, type3\n- **Размеры**: SM, MD, LG. От размера зависит скругление и внутренние отступы.\n- **Загрузка**: `loading` показывает `LoaderScreen` поверх контента карточки.\n- **Без отступов**: `withoutPaddings` убирает внутренние отступы карточки, скругление сохраняется.\n\n**Состав:** Header, Body, Footer",
            },
            page: () => (
                <>
                    <Title />
                    <Description />
                    <Heading>Props</Heading>
                    <ArgTypes of={Island} />
                    <Heading>Playground</Heading>
                    <Primary />
                    <Controls of={Playground} />
                    <Stories />
                </>
            ),
        },
    },
    tags: ["autodocs"],
} satisfies Meta<typeof Island>;

export default meta;

export const Playground: StoryObj<IIslandPlaygroundProps> = {
    tags: ["!autodocs"],
    args: {
        type: EIslandType.TYPE_1,
        size: EComponentSize.MD,
        loading: false,
        headerText: "Island Header",
        bodyText: "Island Body",
        footerText: "Island Footer",
        showHeader: true,
        showBody: true,
        showFooter: true,
        withoutPaddings: false,
    },
    argTypes: {
        type: {
            control: { type: "select" },
            options: Object.values(EIslandType),
            description: "Тип визуального оформления острова",
            table: {
                type: { summary: "EIslandType" },
                defaultValue: { summary: "EIslandType.TYPE_1" },
            },
        },
        size: {
            control: { type: "select" },
            options: Object.values(EComponentSize),
            description: "Размер острова",
            table: {
                type: { summary: "EComponentSize" },
                defaultValue: { summary: "EComponentSize.MD" },
            },
        },
        loading: {
            control: { type: "boolean" },
            description: "Показывать LoaderScreen поверх контента",
            table: {
                type: { summary: "boolean" },
                defaultValue: { summary: "false" },
            },
        },
        withoutPaddings: {
            control: { type: "boolean" },
            description: "Отключить padding",
            table: {
                type: { summary: "boolean" },
                defaultValue: { summary: "false" },
            },
        },
        headerText: {
            control: { type: "text" },
            description: "Текст в шапке",
            table: { category: "Settings", type: { summary: "string" } },
        },
        bodyText: {
            control: { type: "text" },
            description: "Текст в теле",
            table: { category: "Settings", type: { summary: "string" } },
        },
        footerText: {
            control: { type: "text" },
            description: "Текст в футере",
            table: { category: "Settings", type: { summary: "string" } },
        },
        showHeader: {
            control: { type: "boolean" },
            description: "Показывать шапку",
            table: { category: "Settings", type: { summary: "boolean" } },
        },
        showBody: {
            control: { type: "boolean" },
            description: "Показывать тело",
            table: { category: "Settings", type: { summary: "boolean" } },
        },
        showFooter: {
            control: { type: "boolean" },
            description: "Показывать футер",
            table: { category: "Settings", type: { summary: "boolean" } },
        },
    },
    parameters: {
        testRunner: { skip: true },
        controls: {
            include: [
                "type",
                "size",
                "loading",
                "headerText",
                "bodyText",
                "footerText",
                "showHeader",
                "showBody",
                "showFooter",
                "withoutPaddings",
            ],
        },
        docs: {
            canvas: { sourceState: "none" },
            codePanel: false,
        },
    },
    render: (args) => {
        const { showHeader, showBody, showFooter, headerText, bodyText, footerText, ...rest } = args;

        return (
            <div style={{ maxWidth: 360 }}>
                <Island {...rest}>
                    {showHeader && <Island.Header>{headerText}</Island.Header>}
                    {showBody && <Island.Body>{bodyText}</Island.Body>}
                    {showFooter && <Island.Footer>{footerText}</Island.Footer>}
                </Island>
            </div>
        );
    },
};

export const Default: StoryObj<typeof Island> = {
    name: "Default",
    render: DefaultExample,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: DefaultExampleSource,
                language: "tsx",
            },
        },
    },
};

export const Types: StoryObj<typeof Island> = {
    name: "Types",
    render: TypesExample,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: TypesExampleSource,
                language: "tsx",
            },
        },
    },
};

export const Sizes: StoryObj<typeof Island> = {
    name: "Sizes",
    render: SizesExample,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: SizesExampleSource,
                language: "tsx",
            },
        },
    },
};

export const Loading: StoryObj<typeof Island> = {
    name: "Loading",
    render: LoadingRender,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: LoadingSource,
                language: "tsx",
            },
        },
    },
};

export const WithoutPaddings: StoryObj<typeof Island> = {
    name: "WithoutPaddings",
    render: WithoutPaddingsRender,
    parameters: {
        controls: { disable: true },
        docs: {
            source: {
                code: WithoutPaddingsSource,
                language: "tsx",
            },
        },
    },
};
